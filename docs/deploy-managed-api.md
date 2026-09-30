# Deploying Managed Node.js API (Render / Railway)

Tài liệu này hướng dẫn triển khai backend API (`apps/api`) của Git Academy Vietnam lên dịch vụ điện toán đám mây được quản lý như **Render** hoặc **Railway**. Không cần Dockerfile, không cần cấu hình Nginx, không cần truy cập SSH server.

---

## 1. Triển khai trên Render

### Cách 1: Sử dụng Render Blueprint (`render.yaml`)

Repo đã bao gồm tệp cấu hình [render.yaml](file:///c:/Users/Asus/git-study/render.yaml):
1. Đăng nhập vào [dashboard.render.com](https://dashboard.render.com).
2. Nhấn **New +** -> **Blueprint**.
3. Chọn GitHub repository của Git Academy.
4. Render sẽ tự động nhận diện cấu hình từ `render.yaml`.
5. Điền giá trị cho các biến môi trường được yêu cầu:
   - `DATABASE_URL`: URI từ Supabase / PostgreSQL.
   - `AUTH_SECRET`: Chuỗi ký tự ngẫu nhiên tối thiểu 32 ký tự (Render có thể tự sinh tự động).
   - `CORS_ORIGIN`: URL frontend trên Vercel (ví dụ: `https://git-academy-xxx.vercel.app`).
   - `APP_URL`: URL frontend trên Vercel.
6. Nhấn **Apply**.

---

### Cách 2: Tạo Web Service thủ công trên Render

1. Vào Dashboard -> Nhấn **New +** -> **Web Service**.
2. Kết nối tới GitHub repo của bạn.
3. Cấu hình dịch vụ:
   - **Name**: `git-academy-api`
   - **Region**: Singapore
   - **Branch**: `main`
   - **Root Directory**: Để trống (chạy từ thư mục gốc của monorepo)
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     pnpm install && pnpm --filter @git-academy/shared build && pnpm --filter @git-academy/gradebook build && pnpm --filter @git-academy/auth build && pnpm --filter @git-academy/api build
     ```
   - **Start Command**:
     ```bash
     node apps/api/dist/server.js
     ```
4. Cuộn xuống phần **Environment Variables** và thêm:
   | Key | Value ví dụ | Mô tả |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Bật chế độ production |
   | `DATABASE_URL` | `postgresql://postgres:[pass]@...` | Kết nối Supabase PostgreSQL |
   | `AUTH_SECRET` | `th1s_is_a_very_s3cur3_32_ch4r_secret_key!` | Khóa ký JWT |
   | `CORS_ORIGIN` | `https://git-academy.vercel.app` | Domain frontend được phép gọi API |
   | `APP_URL` | `https://git-academy.vercel.app` | Domain ứng dụng chính |
5. Nhấn **Deploy Web Service**.

> Render tự động cung cấp biến môi trường `PORT` (mặc định 10000). Server Node.js của Git Academy tự động đọc `process.env.PORT` và lắng nghe trên `0.0.0.0`.

---

## 2. Triển khai trên Railway

1. Đăng nhập [railway.app](https://railway.app) -> **New Project** -> **Deploy from GitHub repo**.
2. Chọn repository Git Academy.
3. Trong phần **Settings** của Service:
   - **Build Command**:
     ```bash
     pnpm install && pnpm --filter @git-academy/shared build && pnpm --filter @git-academy/gradebook build && pnpm --filter @git-academy/auth build && pnpm --filter @git-academy/api build
     ```
   - **Start Command**:
     ```bash
     node apps/api/dist/server.js
     ```
4. Trong tab **Variables**, thêm:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Connection string Supabase.
   - `AUTH_SECRET`: Khóa bảo mật JWT.
   - `CORS_ORIGIN`: URL frontend Vercel.
   - `APP_URL`: URL frontend Vercel.
5. Railway sẽ tự động cung cấp domain công khai (ví dụ: `https://git-academy-api.up.railway.app`).

---

## 3. Kiểm tra hoạt động của API

Sau khi deploy hoàn tất, mở trình duyệt hoặc dùng cURL kiểm tra endpoint `/health`:

```bash
curl https://git-academy-api.onrender.com/health
```

Phản hồi chuẩn:
```json
{
  "status": "ok",
  "service": "git-academy-api",
  "timestamp": "2026-10-01T02:00:00.000Z"
}
```
