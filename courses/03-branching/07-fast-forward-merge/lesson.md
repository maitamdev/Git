# Hợp nhất nhanh Fast-forward merge

---

## 🎯 Mục tiêu
- Hiểu rõ điều kiện để Git thực hiện hợp nhất tua nhanh (Fast-forward merge).
- Thực hiện lệnh `git merge <tên-nhánh>` trên nhánh đích một cách chuẩn xác.
- Giải thích vì sao Fast-forward không tạo ra commit hợp nhất mới và khi nào nên dùng cờ `--no-ff`.

---

## 🧩 Từ khóa hôm nay

### Fast-forward Merge — hợp nhất tua nhanh
- **Nói dễ hiểu:** Cách gộp nhánh khi nhánh chính chưa có commit mới nào kể từ khi rẽ nhánh tính năng.
- **Ví dụ:** Bạn tách nhánh làm nút bấm trong khi `main` đứng yên; khi gộp, con trỏ `main` chỉ việc trượt tới commit của bạn.
- **Đừng nhầm:** Không có commit hợp nhất mới nào được sinh ra; Git chỉ dịch chuyển con trỏ nhánh tiến lên phía trước.

### Linear History — lịch sử tuyến tính
- **Nói dễ hiểu:** Chuỗi các commit nối tiếp nhau thẳng hàng trên một đường duy nhất, không có ngã rẽ.
- **Ví dụ:** Chuỗi commit C1 ──> C2 ──> C3 ──> C4 giúp bạn đọc lại lịch sử dự án rất rõ ràng và mạch lạc.
- **Đừng nhầm:** Lịch sử tuyến tính không cấm tạo nhánh; khi gộp theo kiểu Fast-forward, các commit tự xếp thành một đường thẳng.

### --no-ff — ép tạo commit hợp nhất
- **Nói dễ hiểu:** Tùy chọn buộc Git tạo một commit gộp riêng để lưu lại bằng chứng một nhánh tính năng đã hoàn thành.
- **Ví dụ:** Chạy `git merge --no-ff feature-cart` để giữ lại hình ảnh nhánh con trên cây lịch sử của nhóm.
- **Đừng nhầm:** Dùng cờ này sẽ luôn sinh ra thêm một commit mới ngay cả khi đủ điều kiện tua nhanh con trỏ.

---

## 📖 Định nghĩa
Fast-forward merge là hình thức hợp nhất đơn giản nhất của Git, diễn ra khi nhánh đích (`main`) không có commit mới nào kể từ lúc tách nhánh tính năng. Git không cần giải quyết xung đột mà chỉ dịch chuyển con trỏ `main` tiến thẳng đến commit mới nhất của nhánh tính năng.

---

## 🤔 Tại sao cần?
Khi bạn làm những tính năng nhỏ hoặc sửa lỗi nhanh mà nhánh chính chưa bị ai thay đổi, Fast-forward giúp tích hợp mã nguồn tức thì. Lịch sử commit giữ được sự liền mạch, thẳng thớm và không bị ngập tràn bởi các commit gộp vụn vặt.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai bạn Nam và Bình cùng đi bộ trên một con đường mòn. Đến cột mốc số 3, Bình đứng chờ còn Nam đi tiếp đến cột mốc số 5. Khi Nam gọi điện báo đã tới nơi, Bình chỉ việc bước nhanh về phía trước (Fast-forward) để đứng cùng Nam tại cột mốc số 5 mà không cần mở lối đi mới nào.

---

## 🖼 Sơ đồ
```text
Trước khi merge:
main:               C1 ───> C2 ───> C3 (HEAD -> main)
                                     │
feature:                             └───> C4 ───> C5 (feature)

Sau lệnh: git merge feature
main & feature:     C1 ───> C2 ───> C3 ───> C4 ───> C5 (HEAD -> main, feature)
```

---

## 🌎 Ví dụ thực tế
Bạn Đức tạo nhánh `fix-typo` từ `main` để sửa một chữ sai trên thanh menu. Đức commit hai lần. Trong lúc đó cả nhóm không ai sửa thêm gì vào `main`. Khi xong việc, Đức gõ `git switch main` rồi chạy `git merge fix-typo`. Git thông báo "Fast-forward", con trỏ `main` lập tức nhảy lên commit mới nhất của Đức mà không sinh thêm commit rác nào.

---

## 💻 Command
```bash
git switch main
git merge <tên-nhánh>
git merge --no-ff <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git switch main`: Bắt buộc chuyển về nhánh nhận code trước khi thực hiện thao tác hợp nhất.
- `git merge <tên-nhánh>`: Gộp nhánh chỉ định vào nhánh hiện tại (tự động chọn Fast-forward nếu thỏa mãn điều kiện).
- `git merge --no-ff <tên-nhánh>`: Ép buộc tạo commit hợp nhất mới để lưu vết mốc tích hợp nhánh tính năng.

---

## ⚠️ Sai lầm phổ biến
1. **Đứng ở nhánh tính năng rồi gõ `git merge main`:** Thao tác này kéo code từ `main` vào nhánh con chứ không đưa code vào `main`.
2. **Bối rối vì không thấy commit mới:** Đây là bản chất của Fast-forward vì Git chỉ dời con trỏ chứ không cần sinh commit mới.
3. **Quên chuyển về nhánh chính trước khi merge:** Luôn kiểm tra `git status` xem mình đang đứng ở nhánh đích hay chưa.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Tạo nhánh `ff-demo` bằng lệnh `git switch -c ff-demo`.
2. Tạo tệp `feature.js` và commit với thông điệp `feat: add feature file`.
3. Chuyển về nhánh chính bằng lệnh `git switch main`.
4. Chạy lệnh `git merge ff-demo` và quan sát dòng chữ `Fast-forward` trên terminal.

---

## 💡 Hint
Luôn ghi nhớ quy tắc: đứng tại nhánh muốn nhận code (như `main`) rồi mới gọi tên nhánh cần gộp vào.

---

## ✅ Validation
- Terminal hiển thị thông báo `Fast-forward`.
- Lệnh `git log --oneline` cho thấy commit của nhánh `ff-demo` đã nằm ngay trên đỉnh nhánh `main`.

---

## ❓ Quiz
Trả lời các câu hỏi sau để kiểm tra hiểu biết về cơ chế hợp nhất tua nhanh trong Git.

---

## 🔥 Challenge
Chạy thử lệnh `git merge --no-ff` trên một nhánh thử nghiệm khác và so sánh biểu đồ commit với lần merge Fast-forward vừa rồi.

---

## 📚 Tổng kết
- Fast-forward chỉ xảy ra khi nhánh đích không có commit mới nào kể từ mốc tách nhánh.
- Git chỉ dời nhãn nhánh tiến lên phía trước mà không tạo thêm commit mới.
- Dùng cờ `--no-ff` khi bạn muốn lưu lại vết tích hợp rõ ràng trên đồ thị lịch sử.
