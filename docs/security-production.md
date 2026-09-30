# Tiêu chuẩn Bảo mật Production (Security & OWASP Hardening) — Git Academy Vietnam (Sprint 6)

## 1. Tổng quan Kiến trúc An ninh

Hệ thống Git Academy Vietnam áp dụng nguyên tắc **Bảo mật theo Chiều sâu (Defense-in-Depth)** và tuân thủ chặt chẽ danh mục khuyến nghị an ninh tiêu chuẩn **OWASP Top 10**.

---

## 2. Các Biện pháp Bảo vệ Chi tiết

### 2.1. Chống Tấn công Tiêm mã SQL (SQL Injection Defense)
- **Truy vấn Tham số hóa (Parameterized Queries)**: 100% câu lệnh truy vấn cơ sở dữ liệu được thực thi thông qua tham số ràng buộc (`$1, $2, ...`). Tuyệt đối cấm nối chuỗi văn bản trong SQL.
- **Phân tách Quyền hạn Database**: User ứng dụng (`gitacademy`) chỉ có quyền `SELECT, INSERT, UPDATE, DELETE` trên các bảng ứng dụng, không có quyền `SUPERUSER` hoặc thay đổi cấu trúc hệ thống.

### 2.2. Chống Tấn công XSS (Cross-Site Scripting)
- **Middleware Khử khuẩn Dữ liệu (`sanitizer.ts`)**: Mọi chuỗi đầu vào từ `req.body`, `req.query`, và `req.params` đều được tự động làm sạch:
  - Loại bỏ các thẻ `<script>`, `<iframe>`, `javascript:`, và các thuộc tính sự kiện nguy hiểm (`onerror=`, `onclick=`).
  - Mã hóa các ký tự đặc biệt (`&`, `<`, `>`, `"`, `'`) thành thực thể HTML an toàn.
- **Tiêu đề Bảo mật Content Security Policy (CSP)**: Nginx cấu hình cấm nạp script từ các nguồn không tin cậy.

### 2.3. Chống Tấn công CSRF (Cross-Site Request Forgery)
- Hệ thống sử dụng cơ chế xác thực phi trạng thái (Stateless) dựa trên **JSON Web Token (JWT)** gửi qua tiêu đề HTTP `Authorization: Bearer <token>`.
- Trình duyệt không tự động gửi kèm token khi có yêu cầu chéo miền, triệt tiêu hoàn toàn bề mặt tấn công CSRF.

### 2.4. Giới hạn Tần suất Yêu cầu (Rate Limiting & DoS Protection)
- **Điểm cuối Chung (General API)**: Giới hạn tối đa **100 yêu cầu / phút** trên mỗi địa chỉ IP. Vượt ngưỡng sẽ trả về HTTP `429 Too Many Requests`.
- **Điểm cuối Nhạy cảm (Auth / Login)**: Giới hạn nghiêm ngặt **10 yêu cầu / phút** để ngăn chặn tấn công dò mật khẩu (Brute-force).

### 2.5. Che giấu Lỗi Môi trường Production (Error Masking)
- Middleware xử lý lỗi tập trung (`error-handler.ts`) tự động phát hiện `NODE_ENV === 'production'`.
- Trong môi trường Production: Chi tiết Stack trace và thông điệp lỗi nội bộ cơ sở dữ liệu bị che giấu hoàn toàn khỏi client, chỉ trả về mã lỗi tổng quát và mã định danh theo dõi `requestId`.

### 2.6. Nhật ký Kiểm toán Không thể Thay đổi (Audit Logging)
- Mọi hành vi quản trị viên và giảng viên (thay đổi điểm số, tạo lớp học, xóa sinh viên, cấp quyền) đều tự động ghi lại bản ghi kiểm toán trong bảng `audit_logs` gồm:
  - `user_id` thực hiện
  - `action` hành động
  - `target_type` và `target_id`
  - `details` (dữ liệu trước và sau khi thay đổi)
  - `timestamp` theo giờ chuẩn UTC.
