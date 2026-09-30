# Hướng Dẫn Phát Triển & Vận Hành (Development Guide)

## 1. Yêu cầu môi trường
- **Node.js**: >= 20.x (đã kiểm thử trên v22)
- **pnpm**: >= 9.x / 11.x
- **Docker & Docker Compose** (tùy chọn cho Moodle stack)

## 2. Cài đặt ban đầu
```bash
# Cài đặt toàn bộ dependencies trong monorepo
pnpm install
```

## 3. Khởi chạy môi trường phát triển (Playground)
```bash
# Khởi chạy Vite dev server cho phòng thực hành tương tác
pnpm dev
```
Truy cập: `http://localhost:3000`

## 4. Chạy Unit Tests
```bash
# Chạy toàn bộ test suites của Git Engine, Exercise Engine, Scenarios
pnpm test
```

## 5. Build dự án
```bash
pnpm build
```

## 6. Kiểm tra tính hợp lệ của bài học & Scenarios
```bash
# Kiểm tra định dạng 15 mục bài học
pnpm validate:courses

# Kiểm tra cú pháp kịch bản YAML
pnpm validate:scenarios
```

## 7. Khởi chạy hệ sinh thái Moodle LMS với Docker
```bash
docker compose up -d
```
Truy cập:
- Moodle: `http://localhost/`
- Course Studio: `http://localhost/course`
