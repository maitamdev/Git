# Deploying Frontend to Vercel

Tài liệu này hướng dẫn triển khai ứng dụng web frontend (`apps/playground`) của Git Academy Vietnam lên **Vercel**. Mỗi khi bạn thực hiện `git push` lên GitHub, Vercel sẽ tự động build và triển khai phiên bản mới nhất.

---

## 1. Kết nối Repository với Vercel

1. Đăng nhập vào [vercel.com](https://vercel.com).
2. Nhấn nút **Add New...** -> **Project**.
3. Chọn GitHub repository của Git Academy và nhấn **Import**.

---

## 2. Cấu hình dự án trên Vercel

Trong màn hình cấu hình dự án (**Configure Project**):

1. **Framework Preset**: Chọn `Vite`.
2. **Root Directory**: Nhấn nút *Edit* và chọn thư mục `apps/playground`.
3. **Build and Output Settings**:
   - Nếu bạn chọn Root Directory là `apps/playground`:
     - **Build Command**: `pnpm --filter playground build` (hoặc để mặc định theo Vite)
     - **Output Directory**: `dist`
     - **Install Command**: `pnpm install`
   - Nếu để Root Directory là thư mục gốc repository:
     - **Build Command**: `pnpm --filter playground build`
     - **Output Directory**: `apps/playground/dist`
     - **Install Command**: `pnpm install`
4. **Environment Variables**:
   Thêm biến môi trường trỏ đến URL của Backend API đã triển khai trên Render / Railway:
   | Key | Value ví dụ | Mô tả |
   | :--- | :--- | :--- |
   | `VITE_API_URL` | `https://git-academy-api.onrender.com` | URL của Backend API |

5. Nhấn **Deploy**.

---

## 3. Cấu hình định tuyến SPA & Bảo mật (`vercel.json`)

Git Academy đã chuẩn bị sẵn file cấu hình [apps/playground/vercel.json](file:///c:/Users/Asus/git-study/apps/playground/vercel.json) với:
- **Rewrites SPA**: Chuyển hướng mọi URL (`/(.*)`) về `/index.html` để người dùng tải lại trang không bị lỗi 404 khi đang ở các route như `/classroom`, `/gradebook`, `/assignments`.
- **Security Headers**: Thiết lập `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, và `Referrer-Policy`.
- **Cache Headers**: Cache tối ưu cho các assets tĩnh có hash trong thư mục `/assets/`.

---

## 4. Chế độ Production và Bảo vệ

Khi build trên Vercel (`NODE_ENV=production` hoặc Vite production mode):
1. **Mock Authentication bị vô hiệu hóa**: Ứng dụng không sử dụng tài khoản demo giả lập mà kết nối trực tiếp với Backend API qua `VITE_API_URL`.
2. **Role Switcher bị ẩn**: Giao diện chỉ hiển thị đúng vai trò thực tế của người dùng từ phiên đăng nhập.
3. **Không chứa URL localhost**: Tất cả các yêu cầu mạng đều sử dụng biến môi trường `VITE_API_URL`.
4. **Curriculum & Simulators**: 128 bài học, Git Simulator, GitHub Simulator, Actions Simulator và Git Internals được bundle trực tiếp vào client để đảm bảo tốc độ phản hồi tức thì mà không phụ thuộc vào độ trễ mạng.

---

## 5. Quy trình Kiểm thử sau khi Triển khai

Sau khi Vercel thông báo triển khai thành công, hãy truy cập URL `https://git-academy-xxx.vercel.app` để thực hiện kiểm thử thực địa:
1. **Đăng nhập**: Dùng tài khoản admin đã khởi tạo từ `pnpm bootstrap:admin`.
2. **Tạo lớp học**: Tạo một lớp học mới và lấy mã tham gia (join code).
3. **Học viên tham gia**: Đăng nhập tài khoản học viên, nhập mã lớp để ghi danh.
4. **Học tập & Tiến độ**: Hoàn thành bài học, giải Quiz, thực hành Lab và xác nhận tiến độ được đồng bộ lên Supabase PostgreSQL.
5. **Bài tập & Chấm điểm**: Giảng viên giao bài tập, học viên nộp bài, giảng viên chấm điểm và học viên xem điểm trong Gradebook.
