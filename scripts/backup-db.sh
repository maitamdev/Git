#!/bin/bash
# ====================================================================
# Git Academy Vietnam — PostgreSQL Production/Staging Backup Script
# Usage: ./scripts/backup-db.sh [BACKUP_DIR]
# ====================================================================

set -eo pipefail

BACKUP_DIR="${1:-./backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/gitacademy_db_${TIMESTAMP}.sql.gz"

# Find container name for postgres
CONTAINER_NAME=$(docker ps --filter "name=postgres" --format "{{.Names}}" | head -n 1)

if [ -z "${CONTAINER_NAME}" ]; then
  echo "❌ Lỗi: Không tìm thấy container PostgreSQL đang chạy."
  exit 1
fi

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] 📦 Bắt đầu sao lưu cơ sở dữ liệu từ container '${CONTAINER_NAME}'..."

docker exec "${CONTAINER_NAME}" pg_dump \
  -U "${DB_USER:-gitacademy}" \
  -d "${DB_NAME:-gitacademy_db}" \
  --format=plain \
  --no-owner \
  --no-privileges | gzip > "${BACKUP_FILE}"

FILE_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
echo "✅ [$(date)] Sao lưu hoàn tất thành công!"
echo "   Tệp: ${BACKUP_FILE}"
echo "   Kích thước: ${FILE_SIZE}"

# Cleanup backups older than 30 days
find "${BACKUP_DIR}" -name "gitacademy_db_*.sql.gz" -type f -mtime +30 -delete 2>/dev/null || true
echo "🧹 Đã dọn dẹp các tệp sao lưu cũ hơn 30 ngày."
