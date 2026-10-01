# Merge conflict là gì?

---

## 🎯 Mục tiêu
- Giải thích vì sao Git dừng khi không thể kết hợp hai thay đổi an toàn.
- Đọc các dấu mốc trong tệp conflict và xác định nội dung của mỗi nhánh.
- Dùng `git status` để tìm tệp cần xử lý.

---

## 🧩 Từ khóa hôm nay

### Merge conflict — xung đột khi hợp nhất
- **Nói dễ hiểu:** Hai nhánh thay đổi cùng một vùng theo cách Git không thể tự kết hợp.
- **Ví dụ:** Một nhánh đổi dòng `màu = xanh`, nhánh kia đổi chính dòng đó thành `màu = đỏ`.
- **Đừng nhầm:** Cùng sửa một tệp chưa chắc gây conflict; thay đổi ở các phần độc lập thường được Git kết hợp tự động.

### Conflict markers — dấu đánh dấu vùng xung đột
- **Nói dễ hiểu:** Các dòng Git chèn vào để đặt hai phiên bản cạnh nhau cho người dùng xem.
- **Ví dụ:** `<<<<<<< HEAD` bắt đầu phần hiện tại; `=======` ngăn hai phần; `>>>>>>> feature-conflict` kết thúc phần nhánh nguồn.
- **Đừng nhầm:** Dấu này không phải cú pháp của chương trình. Cần sửa nội dung và xóa dấu trước khi đánh dấu conflict đã giải quyết.

### Unmerged path — tệp chưa giải quyết
- **Nói dễ hiểu:** Tệp mà hai phiên bản chưa được kết hợp xong.
- **Ví dụ:** `git status` báo `both modified: conflict.txt`.
- **Đừng nhầm:** Chỉ lưu tệp trong editor chưa báo cho Git biết conflict đã được giải quyết.

---

## 📖 Định nghĩa
Merge conflict xảy ra khi Git không thể tự ghép một hay nhiều thay đổi từ hai nhánh. Một trường hợp phổ biến là cả hai nhánh cùng sửa một vùng của cùng tệp. Git tạm dừng merge, cho biết tệp cần xem xét và thường đặt hai phiên bản vào tệp với conflict markers.

---

## 🤔 Tại sao cần?
Git không thể biết ý định của người viết. Khi nội dung mâu thuẫn, nó dừng để bạn chọn hoặc kết hợp đúng theo yêu cầu của chương trình, thay vì âm thầm bỏ một thay đổi.

---

## 🧠 Mental Model (Mô hình tư duy)
Hai người sửa cùng một câu trong tài liệu theo hai cách khác nhau. Git đặt cả hai phiên bản cạnh nhau và hỏi bạn nên viết câu nào trong bản cuối.

---

## 🖼 Sơ đồ
```text
|<<<<<<< HEAD
Phiên bản của nhánh hiện tại
=======
Phiên bản của nhánh được merge vào
|>>>>>>> feature-conflict
```

Hai dấu `|` ở đầu chỉ là vạch phân cách trong sơ đồ; nội dung marker thật bắt đầu từ `<<<<<<<` và `>>>>>>>`.

---

## 🌎 Ví dụ thực tế
Một nhánh cập nhật địa chỉ API, nhánh khác cũng đổi địa chỉ đó. Khi hợp nhất, nhóm cần xác nhận địa chỉ nào đúng hoặc kết hợp thay đổi theo cấu hình thực tế; không nên chọn một bên chỉ vì tên nhánh nghe mới hơn.

---

## 💻 Command
```bash
git status
git merge feature-conflict
```

---

## 🔍 Giải thích command
- `git status`: Báo tên tệp chưa giải quyết dưới mục `Unmerged paths`.
- `git merge feature-conflict`: Thử đưa nhánh `feature-conflict` vào nhánh hiện tại. Bài lab bên dưới cố ý tạo thay đổi mâu thuẫn để lệnh này dừng ở conflict.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng mọi conflict là lỗi Git:** Git đang bảo vệ nội dung vì chưa biết lựa chọn nào đúng.
2. **Chọn “Current” hoặc “Incoming” mà không đọc code:** Cả hai lựa chọn đều có thể bỏ nghiệp vụ cần thiết.
3. **Commit khi chưa gỡ dấu conflict:** Marker còn lại có thể làm hỏng cú pháp hoặc lộ văn bản conflict vào sản phẩm.

---

## 🧪 Lab
Yêu cầu: repository đã có ít nhất một commit, nhánh `main` tồn tại và working tree sạch. Dùng editor của lab để sửa đúng một dòng trong `conflict.txt`:
1. Đứng trên `main`. Tạo `conflict.txt` với nội dung `Màu nền: trắng`, rồi chạy `git add conflict.txt` và `git commit -m "docs: add conflict example"`.
2. Chạy `git switch -c feature-conflict`. Đổi dòng trong tệp thành `Màu nền: xanh`, rồi add và commit với thông điệp `feat: use blue background`.
3. Chạy `git switch main`. Đổi cùng dòng thành `Màu nền: đỏ`, rồi add và commit với thông điệp `feat: use red background`.
4. Chạy `git merge feature-conflict`. Merge sẽ dừng vì hai nhánh đổi cùng một dòng.
5. Chạy `git status`, mở `conflict.txt` và chỉ ra phần hiện tại, dấu phân cách và phần từ nhánh nguồn. Bài sau sẽ hướng dẫn giải quyết.

---

## 💡 Hint
Phần sau `<<<<<<< HEAD` thuộc nhánh đang đứng; phần sau `=======` thuộc nhánh nguồn được merge vào.

---

## ✅ Validation
- `git status` nêu `conflict.txt` trong `Unmerged paths`.
- Tệp có đủ ba dấu `<<<<<<<`, `=======`, `>>>>>>>` và có nội dung từ cả hai nhánh.
- Chưa chạy `git add` hay `git commit`; giữ nguyên conflict để làm bài tiếp theo.

---

## ❓ Quiz
Trả lời câu hỏi để kiểm tra cách nhận biết một conflict và đọc nội dung hai phía.

---

## 🔥 Challenge
Giải thích vì sao sửa hai tệp khác nhau thường không conflict, còn hai thay đổi cùng vùng có thể khiến Git phải dừng.

---

## 📚 Tổng kết
- Conflict có nghĩa Git cần bạn quyết định cách kết hợp; không phải repository bị hỏng.
- Đọc cả hai phía và hiểu logic trước khi chọn hoặc viết nội dung kết quả.
- Dùng `git status` tìm tệp chưa giải quyết; chưa vội add hoặc commit.
