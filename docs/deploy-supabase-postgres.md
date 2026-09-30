# Deploying Managed PostgreSQL with Supabase

Tài liệu này hướng dẫn thiết lập cơ sở dữ liệu PostgreSQL được quản lý (Managed PostgreSQL) trên Supabase cho Git Academy Vietnam mà không cần cài đặt hoặc quản trị bất kỳ Linux VPS hay Docker container nào.

---

## 1. Tạo dự án Supabase

1. Truy cập [database.new](https://database.new) hoặc [supabase.com](https://supabase.com) và đăng nhập.
2. Nhấn **New Project**.
3. Điền thông tin:
   - **Name**: `git-academy-db`
   - **Database Password**: Chọn mật khẩu mạnh và lưu lại an toàn.
   - **Region**: Chọn khu vực gần Việt Nam nhất (ví dụ: `Singapore (ap-southeast-1)`).
4. Nhấn **Create new project** và đợi Supabase khởi tạo hoàn tất (~1-2 phút).

---

## 2. Lấy Connection String (DATABASE_URL)

1. Vào mục **Project Settings** (biểu tượng bánh răng) -> **Database**.
2. Cuộn xuống phần **Connection string**.
3. Chọn tab **URI**:
   - Nếu kết nối trực tiếp (Direct Connection):
     ```text
     postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres
     ```
   - Nếu dùng Connection Pooling (Session mode):
     ```text
     postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
     ```
4. Thay thế `[YOUR-PASSWORD]` bằng mật khẩu database bạn đã thiết lập ở Bước 1.

> **Lưu ý**: Node.js client (`pg`) của Git Academy hỗ trợ cả SSL (`ssl: { rejectUnauthorized: false }`) tự động khi chạy trên cloud.

---

## 3. Chạy Database Migrations

Từ máy tính cá nhân hoặc trong CI/CD, chạy migration để tạo toàn bộ 10 bảng của Git Academy LMS:

```bash
# Thiết lập DATABASE_URL (PowerShell / Windows)
$env:DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres"

# Hoặc Bash / macOS / Linux:
# export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres"

# Thực thi migration
pnpm db:migrate
```

Kết quả sẽ xác nhận tạo thành công 10 bảng:
- `users`
- `classes`
- `class_enrollments`
- `student_progress`
- `assignments`
- `assignment_submissions`
- `sync_audit_logs`
- `user_sessions`
- `schema_migrations`
- `system_settings`

---

## 4. Khởi tạo tài khoản Root Admin

Tạo tài khoản quản trị viên đầu tiên trực tiếp trên Supabase PostgreSQL:

```bash
$env:ADMIN_EMAIL="admin@gitacademy.vn"
$env:ADMIN_PASSWORD="SecureAdminPassword123!"
$env:ADMIN_NAME="System Administrator"

pnpm bootstrap:admin
```

Script sẽ tự động mã hóa mật khẩu bằng bcrypt (cost factor 10) và lưu vào bảng `users` với role `admin`.

---

## 5. Kiểm tra kết nối và biến môi trường

Chạy script kiểm tra để xác nhận cấu hình đã chuẩn bị sẵn sàng cho production:

```bash
pnpm verify:production-env
```

Script sẽ kiểm tra:
- `DATABASE_URL` kết nối được tới PostgreSQL.
- Định dạng chuỗi kết nối hợp lệ.
- SSL được kích hoạt.
- Toàn bộ 10 bảng LMS tồn tại và sẵn sàng hoạt động.
