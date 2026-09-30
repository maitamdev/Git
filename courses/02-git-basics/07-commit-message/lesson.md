# Chuẩn quy ước Commit Message

---

## 🎯 Mục tiêu
- Nắm vững cấu trúc chuẩn của quy ước Conventional Commits quốc tế.
- Sử dụng thành thạo các tiền tố tiêu chuẩn: feat, fix, docs, style, refactor, test, chore.
- Hiểu tầm quan trọng của việc viết thông điệp commit rõ ràng phục vụ việc sinh tự động Changelog.

---

## 📖 Định nghĩa
> Quy ước Commit Message (tiêu biểu nhất là chuẩn Conventional Commits) là một tập hợp các nguyên tắc định dạng thông điệp commit có cấu trúc rõ ràng và chặt chẽ, giúp con người và các công cụ tự động hóa dễ dàng đọc hiểu bản chất thay đổi trong lịch sử phát triển dự án. Cấu trúc chuẩn bao gồm: tiền tố loại thay đổi (`type`), phạm vi module tùy chọn (`scope`), dấu hai chấm và mô tả ngắn gọn súc tích (`description`). Ví dụ tiêu biểu: `feat(auth): add google oauth2 login`. Quy ước này loại bỏ sự tùy tiện và nâng cao tính chuyên nghiệp của toàn đội ngũ.

---

## 🤔 Tại sao cần?
Một dự án phần mềm chuyên nghiệp có thể kéo dài nhiều năm với sự tham gia của hàng trăm kỹ sư. Nếu mọi người đều viết commit vô tội vạ như "fix bug", "done", "test", lịch sử dự án sẽ trở thành một mớ bòng bong không thể kiểm toán. Áp dụng chuẩn Conventional Commits giúp toàn bộ đội ngũ nắm bắt được tiến độ tính năng mới (feat) hay sửa lỗi (fix), đồng thời cho phép các công cụ CI/CD tự động tính toán số phiên bản Semantic Versioning và xuất file nhật ký thay đổi CHANGELOG.md tức thì.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung commit message giống như tiêu đề của một bài báo tin tức trên trang nhất nhật báo buổi sáng. Người biên tập báo không bao giờ giật tít mơ hồ là "Hôm nay có việc xảy ra". Thay vào đó, tít báo luôn có chuyên mục và hành động rõ ràng: "[Kinh tế] Giá vàng lập đỉnh mới sáng nay" hoặc "[Giao thông] Khởi công tuyến đường vành đai 4". Nhờ đó, độc giả chỉ cần lướt qua mục lục là nắm trọn vẹn tình hình trong ngày.

---

## 🖼 Sơ đồ
```text
Cấu trúc chuẩn Conventional Commits:
┌───────────────┬───────────┬───────────────────────────────────────────┐
│ Type (Loại)   │ Scope     │ Description (Mô tả súc tích)              │
├───────────────┼───────────┼───────────────────────────────────────────┤
│ feat          │ (auth)    │ add jwt token refresh mechanism           │
│ fix           │ (payment) │ handle stripe webhook timeout exception   │
│ docs          │ (readme)  │ update installation commands for windows  │
│ refactor      │ (api)     │ simplify user profile data serializer     │
└───────────────┴───────────┴───────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Khi phát triển tính năng lọc sản phẩm theo mức giá trên trang thương mại điện tử, kỹ sư viết commit: `feat(product): add price range filter component`. Khi sửa một lỗi hiển thị tiền tệ bị lệch số 0 trên hóa đơn, kỹ sư viết: `fix(billing): format currency display for vietnam dong`. Khi đọc lại lịch sử qua git log, bất kỳ ai trong nhóm cũng biết chính xác chức năng nào được thêm mới và lỗi nào vừa được khắc phục. Hệ thống CI/CD cũng nhờ đó mà tự động nhận diện bản phát hành tiếp theo là bản cập nhật tính năng hay chỉ là bản vá lỗi nhỏ.

---

## 💻 Command
```bash
git commit -m "feat(scope): short description"
git commit -m "fix: resolve memory leak in worker"
```

---

## 🔍 Giải thích command
- `git commit -m "feat: <mô-tả>"`: Tạo commit thêm mới một tính năng người dùng trong hệ thống phần mềm, kích hoạt nâng số phiên bản MINOR trong Semantic Versioning.
- `git commit -m "fix: <mô-tả>"`: Tạo commit sửa chữa một lỗi phần mềm đã được phát hiện trong mã nguồn, kích hoạt nâng số phiên bản PATCH.

---

## ⚠️ Sai lầm phổ biến
1. **Viết thông điệp quá dài dòng ở dòng tiêu đề đầu tiên**:  Dòng đầu tiên chỉ nên gói gọn dưới 50 đến 72 ký tự.
2. **Sử dụng thì quá khứ thay vì thể mệnh lệnh hiện tại**:  Nên viết "add feature" thay vì "added feature".
3. **Lẫn lộn giữa feat và fix**:  Dùng nhãn fix cho một tính năng hoàn toàn mới hoặc ngược lại.

---

## 🧪 Lab
1. Tạo một tệp `auth.js` và đưa vào Staging Area.
2. Thực hiện commit với tiền tố chuẩn: `git commit -m "feat(auth): create basic login structure"`.
3. Quan sát commit hiển thị trong `git log --oneline`.

---

## 💡 Hint
> Sử dụng các tiền tố: feat, fix, docs, refactor, test, chore.

---

## ✅ Validation
- Kiểm tra commit message tuân thủ định dạng Conventional Commits.

---

## ❓ Quiz
Hãy trả lời các câu hỏi sau về quy ước viết commit message chuyên nghiệp.

---

## 🔥 Challenge
Nêu ý nghĩa của dấu chấm than `feat!:` trong quy ước Conventional Commits.

---

## 📚 Tổng kết
- Conventional Commits cung cấp định dạng chuẩn: type(scope): description.
- Các loại type phổ biến nhất gồm: feat (tính năng mới), fix (sửa lỗi), docs (tài liệu), chore (bảo trì).
- Giúp tự động hóa việc tính toán phiên bản SemVer và sinh CHANGELOG.
