#!/bin/bash
# ====================================================================
# Git Academy Vietnam — PostgreSQL Disaster Recovery & Restore Script
# Usage: ./scripts/restore-db.sh <PATH_TO_BACKUP_FILE.sql.gz>
# ====================================================================

set -eo pipefail

BACKUP_FILE="$1"

if [ -z "${BACKUP_FILE}" ] || [ ! -f "${BACKUP_FILE}" ]; then
  echo "❌ Lỗi: Cần truyền đường dẫn đến tệp sao lưu (.sql hoặc .sql.gz)"
  echo "Cách dùng: $0 ./backups/gitacademy_db_YYYYMMDD_HHMMSS.sql.gz"
  exit 1
fi

CONTAINER_NAME=$(docker ps --filter "name=postgres" --format "{{.Names}}" | head -n 1)

if [ -z "${CONTAINER_NAME}" ]; then
  echo "❌ Lỗi: Không tìm thấy container PostgreSQL đang chạy."
  exit 1
fi

echo "⚠️  CẢNH BÁO: Thao tác này sẽ ghi đè dữ liệu trên cơ sở dữ liệu hiện hành!"
echo "   Tệp phục hồi: ${BACKUP_FILE}"
echo "   Container đích: ${CONTAINER_NAME}"
echo "   Database: ${DB_NAME:-gitacademy_db}"

# Stop write-heavy containers temporarily
echo "⏸️  Tạm dừng API server để tránh xung đột dữ liệu..."
docker compose stop api 2>/dev/null || true

echo "🔄 Đang phục hồi dữ liệu vào PostgreSQL..."

if [[ "${BACKUP_FILE}" == *.gz ]]; then
  gunzip -c "${BACKUP_FILE}" | docker exec -i "${CONTAINER_NAME}" psql -U "${DB_USER:-gitacademy}" -d "${DB_NAME:-gitacademy_db}"
else
  cat "${BACKUP_FILE}" | docker exec -i "${CONTAINER_NAME}" psql -U "${DB_USER:-gitacademy}" -d "${DB_NAME:-gitacademy_db}"
fi

echo "▶️  Khởi động lại API server..."
docker compose start api 2>/dev/null || true

echo "✅ [$(date)] Phục hồi dữ liệu hoàn tất thành công!"
echo "🔍 Kiểm tra số lượng bản ghi sau phục hồi:"
docker exec -i "${CONTAINER_NAME}" psql -U "${DB_USER:-gitacademy}" -d "${DB_NAME:-gitacademy_db}" -c "
  SELECT 'users' AS table_name, count(*) AS total FROM users
  UNION ALL
  SELECT 'classes', count(*) FROM classes
  UNION ALL
  SELECT 'enrollments', count(*) FROM enrollments
  UNION ALL
  SELECT 'lesson_progress', count(*) FROM lesson_progress
  UNION ALL
  SELECT 'assignments', count(*) FROM assignments;
"
