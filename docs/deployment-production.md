# Hướng dẫn triển khai Full Stack tùy chọn — Git Academy Vietnam

> **Đối với khóa tự học public không cần đăng nhập:** không cần API, database hay Docker. Dùng [hướng dẫn deploy frontend lên Vercel](deploy-vercel.md). Tài liệu bên dưới là bản phác thảo hạ tầng LMS full stack của Sprint 6, chưa được xác nhận là quy trình production hiện hành; các lệnh, URL mẫu và placeholder phải được đối chiếu trước khi dùng.

Tài liệu này cung cấp quy trình chi tiết chuẩn hóa để triển khai nền tảng Git Academy Vietnam lên môi trường Production (Ubuntu 22.04 LTS / 24.04 LTS, Docker & Docker Compose).

---

## 1. Yêu cầu Hệ thống (System Requirements)

### Cấu hình Tối thiểu (Minimum - Dưới 500 sinh viên đồng thời):
- **CPU**: 2 vCPU
- **RAM**: 4 GB
- **Disk**: 40 GB SSD (NVMe khuyến nghị)
- **Hệ điều hành**: Linux (Ubuntu 22.04 / 24.04 LTS hoặc Debian 12)

### Cấu hình Tiêu chuẩn (Standard - 1,000–3,000 sinh viên đồng thời):
- **CPU**: 4 vCPU
- **RAM**: 8 GB - 16 GB
- **Disk**: 100 GB NVMe SSD
- **Network**: Băng thông 1 Gbps, IP tĩnh công cộng

---

## 2. Kiến trúc Mạng & Container (Architecture Overview)

```
[ Internet / Clients ]
         │ (Port 80 / 443 HTTPS)
         ▼
 ┌───────────────┐
 │  Nginx Proxy  │  (SSL Termination, Gzip, Security Headers, Rate Limiting)
 └───────┬───────┘
         │
         ├───► /api/*, /health ──► [ api:3001 ] (Node.js REST API Server)
         │                               │
         │                               ▼
         │                       [ postgres:5432 ] (PostgreSQL 16 Alpine + Persistent Volume)
         │
         └───► /*, /assets/*   ──► [ playground:3000 ] (Vite Static SPA Frontend)
```

---

## 3. Các bước Triển khai Chi tiết

### Bước 1: Chuẩn bị Máy chủ & Cài đặt Docker
```bash
# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài đặt Docker Engine & Docker Compose V2
sudo apt install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Khởi động dịch vụ Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### Bước 2: Clone Repository & Cấu hình Biến Môi trường
```bash
git clone https://github.com/git-academy/git-study.git /opt/git-academy
cd /opt/git-academy

# Sao chép file cấu hình mẫu
cp .env.example .env
```

Chỉnh sửa `.env` với các giá trị bí mật an toàn:
```bash
nano .env
```
Các thông số quan trọng cần thay đổi:
- `DB_PASSWORD`: Đặt mật khẩu mạnh (tối thiểu 24 ký tự ngẫu nhiên).
- `AUTH_SECRET`: Tạo khóa bí mật bằng lệnh:
  ```bash
  openssl rand -hex 32
  ```
- `APP_URL`: Đặt tên miền chính thức, ví dụ: `https://gitacademy.vn`.
- `CORS_ORIGIN`: Giới hạn các domain được phép truy cập API.

### Bước 3: Khởi chạy Nền tảng với Docker Compose
```bash
# Xây dựng và khởi chạy các dịch vụ ở chế độ chạy nền
docker compose up -d --build

# Kiểm tra trạng thái các container
docker compose ps
```

Kết quả mong đợi:
```
NAME                    IMAGE                   COMMAND                  SERVICE      STATUS
gitacademy-api          gitacademy-api          "node apps/api/dist/…"   api          running (healthy)
gitacademy-nginx        nginx:alpine            "/docker-entrypoint.…"   nginx        running
gitacademy-playground   gitacademy-playground   "serve -s dist -l 30…"   playground   running
gitacademy-postgres     postgres:16-alpine      "docker-entrypoint.s…"   postgres     running (healthy)
```

---

## 4. Thiết lập Chứng chỉ SSL / HTTPS Miễn phí với Let's Encrypt (Certbot)

Để bảo mật toàn bộ lưu lượng dữ liệu sinh viên và giảng viên:

```bash
# Cài đặt Certbot
sudo apt install -y certbot python3-certbot-nginx

# Tạm dừng Nginx container để cấp phát chứng chỉ độc lập hoặc cấu hình qua Nginx host
sudo certbot certonly --standalone -d gitacademy.vn -d api.gitacademy.vn

# Tạo thư mục gắn volume SSL cho Nginx
mkdir -p /opt/git-academy/infra/ssl
cp /etc/letsencrypt/live/gitacademy.vn/fullchain.pem /opt/git-academy/infra/ssl/
cp /etc/letsencrypt/live/gitacademy.vn/privkey.pem /opt/git-academy/infra/ssl/
```

Thêm cấu hình SSL trong `infra/nginx/nginx.conf`:
```nginx
server {
    listen 443 ssl http2;
    server_name gitacademy.vn;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ...
}
```

---

## 5. Kiểm tra Tình trạng Hệ thống (Health Checks)

Hệ thống cung cấp sẵn endpoint kiểm tra tình trạng phục vụ Load Balancer:
```bash
# Kiểm tra HTTP Health endpoint
curl -i http://localhost/health
```

Phản hồi thành công:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "ok",
  "service": "git-academy-api",
  "timestamp": "2026-09-30T10:15:00.000Z",
  "database": "connected",
  "version": "2.0.0"
}
```

---

## 6. Quy trình Cập nhật Phiên bản Mới (Zero-Downtime Rolling Update)

Khi có bản phát hành Sprint mới:
```bash
cd /opt/git-academy

# Kéo mã nguồn mới nhất
git pull origin main

# Chạy kiểm tra tự động trước khi deploy
pnpm audit:curriculum
pnpm test

# Rebuild và cập nhật container không gián đoạn
docker compose build api playground
docker compose up -d --no-deps api playground
```
