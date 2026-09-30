# Quy trình Sao lưu & Phục hồi Thảm họa (Backup & Disaster Recovery) — Git Academy Vietnam (Sprint 6)

## 1. Mục tiêu Khôi phục (Recovery Objectives)

- **RPO (Recovery Point Objective)**: Tối đa 15 phút mất mát dữ liệu trong trường hợp sự cố phần cứng nghiêm trọng.
- **RTO (Recovery Time Objective)**: Khôi phục toàn bộ hệ thống hoạt động trở lại trong vòng dưới 30 phút.

---

## 2. Kế hoạch Sao lưu Định kỳ (Backup Strategy)

| Tần suất | Loại Sao lưu | Thời gian Lưu trữ (Retention) | Nơi Lưu trữ |
| :---: | :---: | :---: | :---: |
| **Mỗi ngày (Daily)** | Full Database Dump (`pg_dump`) | 30 ngày | Lưu cục bộ + Đẩy lên S3 Offsite |
| **Mỗi tuần (Weekly)** | Full Snapshot + Volume Data | 12 tuần | Cold Storage S3 Glacier |
| **Mỗi tháng (Monthly)** | Archive Snapshot | 1 năm | Cold Storage Archive |

---

## 3. Kịch bản Tự động Sao lưu (Automated Backup Script)

Tạo tệp kịch bản sao lưu tại `/opt/git-academy/scripts/backup-db.sh`:

```bash
#!/bin/bash
set -eo pipefail

BACKUP_DIR="/var/backups/gitacademy"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/gitacademy_db_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Bắt đầu sao lưu cơ sở dữ liệu Git Academy..."

# Thực hiện trích xuất dữ liệu trực tiếp từ Docker container
docker exec gitacademy-postgres pg_dump \
  -U gitacademy \
  -d gitacademy_db \
  --format=plain \
  --no-owner \
  --no-privileges | gzip > "${BACKUP_FILE}"

echo "[$(date)] Sao lưu hoàn tất: ${BACKUP_FILE} ($(du -h "${BACKUP_FILE}" | cut -f1))"

# Tự động dọn dẹp các bản sao lưu cũ hơn 30 ngày
find "${BACKUP_DIR}" -name "gitacademy_db_*.sql.gz" -type f -mtime +30 -delete
echo "[$(date)] Đã dọn dẹp các bản sao lưu cũ."
```

Cấu hình Cron Job chạy tự động lúc 02:00 sáng mỗi ngày:
```bash
sudo crontab -e
# Thêm dòng sau:
0 2 * * * /opt/git-academy/scripts/backup-db.sh >> /var/log/gitacademy-backup.log 2>&1
```

---

## 4. Quy trình Phục hồi Dữ liệu Chi tiết (Restoration Procedure)

Khi cần khôi phục lại dữ liệu từ tệp sao lưu:

### Bước 1: Dừng các dịch vụ đang ghi dữ liệu
```bash
docker compose stop api playground
```

### Bước 2: Khôi phục cơ sở dữ liệu từ file nén
```bash
BACKUP_FILE="/var/backups/gitacademy/gitacademy_db_20260930_020000.sql.gz"

# Giải nén và nạp trực tiếp vào PostgreSQL
gunzip -c "${BACKUP_FILE}" | docker exec -i gitacademy-postgres psql -U gitacademy -d gitacademy_db
```

### Bước 3: Khởi động lại dịch vụ & Kiểm tra toàn vẹn
```bash
docker compose start api playground

# Kiểm tra log API
docker compose logs -f --tail=50 api

# Kiểm tra số lượng bản ghi cơ bản
docker exec -i gitacademy-postgres psql -U gitacademy -d gitacademy_db -c "SELECT count(*) FROM users; SELECT count(*) FROM progress;"
```
