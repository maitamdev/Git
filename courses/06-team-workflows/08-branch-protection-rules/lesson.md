# Branch Protection Rules

---

## 🎯 Mục tiêu
- Làm chủ toàn diện các tùy chọn chi tiết trong bộ quy tắc Branch Protection Rules trên GitHub.
- Thiết lập yêu cầu bắt buộc kiểm duyệt mã nguồn: số lượng người phê duyệt tối thiểu (Require approvals) và tự động vô hiệu hóa duyệt khi có commit mới.
- Cấu hình cổng kiểm tra trạng thái bắt buộc (Require status checks to pass) tích hợp chặt chẽ với CI/CD.
- Áp dụng quy tắc lịch sử tuyến tính (Require linear history) và chữ ký bảo mật (Require signed commits).

---

## 📖 Định nghĩa
> Branch Protection Rules (Các quy tắc bảo vệ nhánh chuyên sâu) là bộ công cụ thiết lập chính sách chi tiết trên các nền tảng Git hiện đại, cho phép người quản trị định nghĩa chính xác những điều kiện tiên quyết bắt buộc phải được thỏa mãn trước khi một Pull Request được phép hợp nhất vào nhánh được bảo vệ. Các điều kiện này bao gồm: số lượng kỹ sư bắt buộc phải bấm Approve, các bài kiểm thử tự động (CI Status Checks) phải báo xanh, toàn bộ các luồng thảo luận phản hồi phải được giải quyết xong, và các commit phải có chữ ký số GPG hợp lệ.

---

## 🤔 Tại sao cần?
Chỉ nói "hãy review code nhé" dựa trên sự tự giác là chưa đủ trong các môi trường doanh nghiệp quy mô lớn. Con người có thể quên, vội vã hoặc chủ quan bấm merge khi đoạn mã còn lỗi nghiêm trọng. Branch Protection Rules đóng vai trò như một người gác cổng cơ học tự động hóa 100%: nếu thiếu dù chỉ một chữ ký duyệt hoặc có một ca kiểm thử thất bại, nút Merge sẽ bị khóa chặt với màu xám, bảo đảm không một đoạn code kém chất lượng nào có thể lọt vào nhánh chính.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung quy trình cất cánh của một máy bay chở khách thương mại. Trước khi máy bay được phép rời mặt đất, cơ trưởng phải hoàn thành một Danh sách kiểm tra an toàn (Safety Checklist) bắt buộc. Kỹ sư động cơ phải ký xác nhận động cơ hoàn hảo (`Status Checks pass`), cơ phó phải đối soát lộ trình bay (`Require 1 approval`), tiếp viên trưởng xác nhận cửa đã đóng kín (`Conversations resolved`). Nếu thiếu bất kỳ một dấu tích kiểm tra nào trên bảng điện tử, trạm kiểm soát không lưu sẽ khóa quyền cất cánh.

---

## 🖼 Sơ đồ
```text
Cổng kiểm soát đa tầng của Branch Protection Rules:
Pull Request ──► [Layer 1: Phải có >= 1 Approval từ đồng nghiệp] ──► ❌ (Thiếu chữ ký -> Khóa)
                 │
                 ▼ (Đạt)
                 [Layer 2: CI Test & Linting phải PASS 100%]     ──► ❌ (Test đỏ -> Khóa)
                 │
                 ▼ (Đạt)
                 [Layer 3: Mọi bình luận phải được Resolve]      ──► ❌ (Chưa xong thảo luận -> Khóa)
                 │
                 ▼ (Đạt)
                 [Nút Merge bật xanh - Cho phép tích hợp!]
```

---

## 🌎 Ví dụ thực tế
Nhóm phát triển cổng thanh toán trực tuyến cấu hình một quy tắc bảo vệ nhánh nghiêm ngặt cho `main`: yêu cầu tối thiểu 2 lượt phê duyệt từ các kỹ sư cao cấp, bắt buộc luồng CI `build-and-test` phải hoàn thành thành công trong vòng 5 phút, và yêu cầu xóa nhánh sau khi gộp. Khi lập trình viên Bình mở Pull Request thêm phương thức thanh toán ví điện tử, dù đã có một đồng nghiệp bấm Approve nhưng nút Merge trên GitHub vẫn hiển thị trạng thái "Merging is blocked". Bình kiên nhẫn chờ bài test CI tự động chạy xong và nhận thêm một lượt Approve từ kỹ sư trưởng bảo mật. Khi tất cả các biểu tượng chuyển sang dấu tích xanh lá cây, hệ thống mới mở khóa cho phép Bình nhấn nút hợp nhất an toàn.

---

## 💻 Command
```bash
gh pr checks
gh pr status
git log --oneline --show-signature
```

---

## 🔍 Giải thích command
- `gh pr checks`: Kiểm tra danh sách các bài test tự động bắt buộc và trạng thái Pass/Fail của chúng.
- `gh pr status`: Xem tổng quan trạng thái phê duyệt của Pull Request hiện tại trực tiếp từ dòng lệnh.
- `git log --show-signature`: Kiểm tra tính hợp lệ của chữ ký số GPG gắn trên từng commit.

---

## ⚠️ Sai lầm phổ biến
1. **Đặt số lượng reviewer bắt buộc quá cao (ví dụ >= 4) trong nhóm nhỏ**:  Gây tắc nghẽn công việc nghiêm trọng.
2. **Không tích chọn "Dismiss stale pull request approvals when new commits are pushed"**:  Khiến code mới sửa sau review bị lọt mà không được xem lại.
3. **Thiết lập status checks với những bài test không ổn định (flaky tests)**:  Khiến PR bị chặn oan uổng do lỗi môi trường mạng.

---

## 🧪 Lab
1. Cấu hình quy tắc yêu cầu ít nhất 1 lượt review approval cho nhánh `main` trong repository thử nghiệm.
2. Thử mở một PR và quan sát trạng thái khóa của nút Merge cho đến khi có tài khoản khác bấm Approve.

---

## 💡 Hint
> Luôn bật tùy chọn tự động hủy phê duyệt cũ khi có commit mới được đẩy thêm vào Pull Request.

---

## ✅ Validation
- Nút Merge trên GitHub chỉ có thể bấm được khi tất cả các bài kiểm tra đều đạt và đủ lượt phê duyệt.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về các quy tắc Branch Protection Rules chuyên sâu.

---

## 🔥 Challenge
Giải thích tác động của quy tắc "Require linear history" đối với lịch sử commit của nhánh chính.

---

## 📚 Tổng kết
- Branch Protection Rules cung cấp các cổng kiểm soát kỹ thuật tự động hóa trước khi hợp nhất.
- Kết hợp chặt chẽ giữa sự thẩm định của con người (Code Review) và sự chính xác của máy móc (CI Checks).
- Là tiêu chuẩn bảo mật và kiểm soát chất lượng bắt buộc trong mọi dự án công nghệ chuyên nghiệp.
