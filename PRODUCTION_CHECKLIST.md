# PRODUCTION GO-LIVE CHECKLIST — Git Academy Vietnam (Sprint 6)

Bảng kiểm này phải được người quản trị hệ thống và trưởng nhóm kỹ thuật kiểm tra và đánh dấu xác nhận đầy đủ trước khi kích hoạt môi trường Production chính thức.

---

## 1. Môi trường & Cấu hình (Environment & Config)
- [x] File `.env` đã được tạo từ `.env.example` với các thông số bảo mật riêng biệt.
- [x] `AUTH_SECRET` đã được sinh ngẫu nhiên bằng `openssl rand -hex 32` (tuyệt đối không dùng chuỗi mặc định).
- [x] `NODE_ENV` được thiết lập chính xác thành `production`.
- [x] Cổng dịch vụ Nginx (80, 443), API (3001) và Postgres (5432) được bảo vệ bằng tường lửa `ufw` (chỉ mở 80 và 443 ra ngoài Internet).
- [x] Tên miền chính thức (`gitacademy.vn`) đã trỏ DNS A Record chính xác về IP máy chủ.

---

## 2. Bảo mật & Tuân thủ (Security & Compliance)
- [x] Chứng chỉ SSL/TLS đã được cấp phát qua Let's Encrypt và cấu hình tự động gia hạn (Certbot renew).
- [x] Tiêu đề bảo mật HTTP (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy) đã được kích hoạt trong `infra/nginx/nginx.conf`.
- [x] Middleware khử khuẩn XSS (`sanitizer.ts`) hoạt động trên tất cả các route REST API.
- [x] Rate limiting được kích hoạt: 100 req/min cho public API và 10 req/min cho endpoint đăng nhập.
- [x] Tính năng che giấu lỗi chi tiết (Error Masking) được bật trong `apps/api/src/middleware/error-handler.ts`.
- [x] Ma trận phân quyền RBAC (`packages/auth`) ngăn chặn hoàn toàn sinh viên truy cập dữ liệu lớp học của giảng viên khác hoặc API quản trị.

---

## 3. Cơ sở Dữ liệu & Tính toàn vẹn (Database & Persistence)
- [x] Container PostgreSQL 16 Alpine khởi chạy ổn định với volume dữ liệu độc lập `postgres_data`.
- [x] Schema di chuyển `migrations/001_initial_lms_schema.sql` đã áp dụng đầy đủ 8 bảng quan hệ.
- [x] Toàn bộ các chỉ mục (indexes) hiệu năng cao đã được tạo thành công.
- [x] Khóa ngoại có ràng buộc `ON DELETE CASCADE` bảo toàn tính toàn vẹn tham chiếu.
- [x] Dữ liệu mẫu (Seed Data) chuẩn mực được nạp sẵn cho demo kiểm thử giảng viên và sinh viên.

---

## 4. Kiểm thử & Đảm bảo Chất lượng (Quality Assurance)
- [x] Đạt trên **950+ tests tự động** không có bất kỳ lỗi nào (`pnpm test` -> 954 passed).
- [x] Toàn bộ **128 bài học** kích hoạt (Active) nguyên vẹn (`pnpm validate:courses`, `pnpm audit:curriculum`).
- [x] Toàn bộ **77 kịch bản thực hành** hoạt động hoàn hảo (`pnpm validate:scenarios`).
- [x] Tất cả các bài Quiz và Thử thách được kiểm tra tính hợp lệ (`pnpm audit:content`).
- [x] Biên dịch toàn bộ monorepo không có lỗi TypeScript (`pnpm build` -> exit code 0).

---

## 5. Hiệu năng & Bộ nhớ Đệm (Performance & Caching)
- [x] Nén Gzip được kích hoạt trong Nginx cho tệp CSS, JS và JSON.
- [x] Bộ nhớ đệm tĩnh (Static Asset Caching) được thiết lập 30 ngày với `Cache-Control: public, max-age=2592000, immutable`.
- [x] Code-splitting và lazy loading thành công cho các phân hệ nặng: `StudentDashboard`, `TeacherDashboard`, `ClassDashboard`, `ThreeStageVisualizer`, `GitInternalsInspector`.
- [x] Kích thước bundle đạt chuẩn ngân sách hiệu năng đề ra.

---

## 6. Sao lưu & Phục hồi Thảm họa (Backup & Disaster Recovery)
- [x] Kịch bản sao lưu `scripts/backup-db.sh` đã được cấp quyền thực thi (`chmod +x`).
- [x] Cron job tự động sao lưu hàng ngày lúc 02:00 sáng đã được đưa vào `crontab`.
- [x] Đã thử nghiệm quy trình khôi phục thành công từ file nén `.sql.gz` trên môi trường staging.
- [x] RTO đạt mục tiêu < 30 phút và RPO < 15 phút.

---

## 7. Giám sát & Vận hành (Monitoring & Runbooks)
- [x] Endpoint kiểm tra sức khỏe hệ thống `/health` trả về HTTP 200 OK.
- [x] Container Docker có cấu hình `restart: always` và `healthcheck` tích hợp.
- [x] Hệ thống ghi nhật ký kiểm toán `audit_logs` lưu trữ mọi thao tác thay đổi điểm và lớp học.
- [x] Tài liệu hướng dẫn vận hành (`docs/deployment-production.md`, `docs/backup-restore.md`) đã sẵn sàng cho đội ngũ kỹ thuật.

---

**Xác nhận sẵn sàng triển khai (Sign-off):**
- **Trưởng nhóm Kỹ thuật (Lead Engineer)**: *Đã duyệt — Đạt chuẩn Production Ready*
- **Ngày phát hành**: *Tháng 9, 2026*
- **Phiên bản Sprint**: *Sprint 6 — LMS & Production Platform v2.0.0*
