# Xác thực & Phân quyền (Authentication & RBAC) — Git Academy Vietnam (Sprint 6)

## 1. Tổng quan Kiến trúc Xác thực

Trong Sprint 6, phân hệ xác thực được thiết kế thành một package độc lập `@git-academy/auth`, hỗ trợ tách biệt hoàn toàn giữa giao diện người dùng và cơ chế backend.

Package cung cấp hợp đồng (contract) chuẩn thông qua interface `AuthProvider`, cho phép hệ thống hoạt động linh hoạt ở cả hai chế độ:
1. **MockAuthProvider**: Chạy trên trình duyệt không cần backend server hoặc phục vụ môi trường kiểm thử tự động (Unit / E2E Tests).
2. **ApiAuthProvider**: Kết nối trực tiếp với REST API server (`apps/api`), quản lý JWT token và trạng thái phiên làm việc thực tế.

---

## 2. Giao diện AuthProvider (Interface Definition)

```typescript
export interface AuthProvider {
  getCurrentUser(): Promise<User | null>;
  login(credentials: { email?: string; token?: string; password?: string }): Promise<User>;
  logout(): Promise<void>;
  getToken(): string | null;
  isAuthenticated(): boolean;
  hasPermission(permission: Permission): boolean;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}
```

---

## 3. Ma trận Phân quyền theo Vai trò (RBAC Permissions Matrix)

Hệ thống định nghĩa 3 vai trò chính:
- **`student` (Sinh viên)**: Người học tham gia các bài thực hành và lớp học.
- **`teacher` (Giảng viên)**: Giảng viên phụ trách lớp, quản lý sinh viên, chấm điểm và tạo bài tập.
- **`admin` (Quản trị viên)**: Toàn quyền cấu hình hệ thống, quản lý người dùng và xem nhật ký kiểm toán.

### Bảng Phân quyền Chi tiết:

| Quyền hạn (`Permission`) | Sinh viên (`student`) | Giảng viên (`teacher`) | Quản trị (`admin`) |
| :--- | :---: | :---: | :---: |
| `read:curriculum` | ✅ | ✅ | ✅ |
| `submit:exercise` | ✅ | ✅ | ✅ |
| `read:own_progress` | ✅ | ✅ | ✅ |
| `join:class` | ✅ | ❌ | ✅ |
| `create:class` | ❌ | ✅ | ✅ |
| `manage:class` | ❌ | ✅ | ✅ |
| `read:class_roster` | ❌ | ✅ | ✅ |
| `manage:assignments` | ❌ | ✅ | ✅ |
| `grade:submissions` | ❌ | ✅ | ✅ |
| `view:class_analytics` | ❌ | ✅ | ✅ |
| `manage:users` | ❌ | ❌ | ✅ |
| `manage:system` | ❌ | ❌ | ✅ |
| `view:audit_logs` | ❌ | ❌ | ✅ |

---

## 4. Middleware Bảo vệ API (Backend Enforcement)

Mọi yêu cầu đến API được kiểm soát thông qua chuỗi middleware trong `apps/api/src/middleware/auth-middleware.ts`:

1. **`authMiddleware`**:
   - Trích xuất token từ header `Authorization: Bearer <token>`.
   - Xác minh chữ ký JWT và thời hạn còn hiệu lực.
   - Gắn thông tin người dùng đã xác thực vào `req.user`.

2. **`requireRole(...roles: Role[])`**:
   - Chặn đứng các yêu cầu không có vai trò phù hợp, trả về mã lỗi chuẩn `403 Forbidden`:
   ```json
   { "error": "Forbidden: Requires one of roles: teacher, admin" }
   ```

3. **`requirePermission(permission: Permission)`**:
   - Kiểm tra xem quyền của người dùng có nằm trong ma trận quyền hạn cho phép hay không.

---

## 5. Định dạng Token & Bảo mật Phiên (Token Security)

- **Thuật toán**: HMAC-SHA256 (HS256).
- **Thời hạn (TTL)**: 7 ngày đối với sinh viên, 24 giờ đối với quản trị viên.
- **Cơ chế Thu hồi**: Lưu trữ phiên hoạt động và kiểm tra trạng thái tài khoản trong bảng `users` tại thời điểm xác thực.
