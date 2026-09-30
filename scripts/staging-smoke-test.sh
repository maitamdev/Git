#!/bin/bash
# ====================================================================
# Git Academy Vietnam — Staging Smoke Test & Security Verification
# Usage: ./scripts/staging-smoke-test.sh <STAGING_BASE_URL>
# Example: ./scripts/staging-smoke-test.sh https://staging.gitacademy.vn
# ====================================================================

set -eo pipefail

BASE_URL="${1:-http://localhost}"
echo "🚀 [Git Academy] Bắt đầu Staging Smoke Test tại: ${BASE_URL}"
echo "===================================================================="

# 1. Health Probe
echo "1️⃣  Kiểm tra API Health Probes..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/api/health")
READY_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/api/health/ready")

if [ "${HEALTH_STATUS}" -eq 200 ] && [ "${READY_STATUS}" -eq 200 ]; then
  echo "   ✅ Health / Liveness (200 OK) & Readiness (200 OK) PASS"
else
  echo "   ❌ FAIL: Health code: ${HEALTH_STATUS}, Ready code: ${READY_STATUS}"
fi

# 2. Security Headers
echo "2️⃣  Kiểm tra Live Security Headers từ Nginx/API..."
HEADERS=$(curl -s -I "${BASE_URL}/")

check_header() {
  local header_name="$1"
  if echo "${HEADERS}" | grep -iq "${header_name}"; then
    echo "   ✅ Header tồn tại: ${header_name}"
  else
    echo "   ⚠️  CẢNH BÁO: Thiếu header ${header_name}"
  fi
}

check_header "X-Content-Type-Options: nosniff"
check_header "X-Frame-Options: DENY"
check_header "Referrer-Policy"
check_header "Content-Security-Policy"

if [[ "${BASE_URL}" == https* ]]; then
  check_header "Strict-Transport-Security"
fi

# 3. RBAC Unauthenticated Protection
echo "3️⃣  Kiểm tra từ chối truy cập trái phép..."
UNAUTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/api/classes")
if [ "${UNAUTH_CODE}" -eq 401 ]; then
  echo "   ✅ GET /api/classes không có Bearer token trả về 401 Unauthorized PASS"
else
  echo "   ❌ FAIL: Kỳ vọng 401, nhận được: ${UNAUTH_CODE}"
fi

# 4. Rate Limiting via Reverse Proxy
echo "4️⃣  Kiểm tra cơ chế chặn Brute-Force Rate Limiting (15 req/min threshold)..."
RECEIVED_429=false

for i in $(seq 1 20); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${BASE_URL}/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"flood@gitacademy.vn","password":"WrongPassword"}')
  
  if [ "${CODE}" -eq 429 ]; then
    RECEIVED_429=true
    echo "   ✅ Nhận HTTP 429 Too Many Requests tại yêu cầu thứ #${i} PASS"
    break
  fi
done

if [ "${RECEIVED_429}" = false ]; then
  echo "   ⚠️  CẢNH BÁO: Chưa kích hoạt mã 429 sau 20 requests liên tiếp."
fi

echo "===================================================================="
echo "🎯 Staging Smoke Test hoàn tất!"
