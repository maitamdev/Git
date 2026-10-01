# Thay đổi đã commit được giữ riêng theo nhánh

---

## 🎯 Mục tiêu
- Giải thích vì sao commit trên nhánh tính năng chưa xuất hiện trên `main`.
- Tạo commit trên nhánh thử nghiệm rồi so sánh với `main`.
- Nhận biết sửa đổi chưa commit có thể còn đi theo khi chuyển nhánh.

---

## 🧩 Từ khóa hôm nay

### Cách ly thay đổi đã commit
- **Nói dễ hiểu:** Commit mới được gắn vào nhánh đang chọn; nhánh khác không tự chuyển theo.
- **Ví dụ:** `feature-chat` có commit thêm `chat.js`, còn `main` vẫn ở mốc cũ.
- **Đừng nhầm:** Tệp sửa dở chưa commit có thể được giữ khi chuyển nhánh.

### Lịch sử phân kỳ
- **Nói dễ hiểu:** Hai nhánh cùng có commit riêng sau một mốc chung.
- **Ví dụ:** `main` sửa trang chủ, `feature-chat` thêm chức năng chat.
- **Đừng nhầm:** Phân kỳ là trạng thái bình thường trước khi chọn cách hợp nhất.

### Hợp nhất (merge)
- **Nói dễ hiểu:** Thao tác đưa lịch sử từ nhánh này vào nhánh khác.
- **Ví dụ:** Hợp nhất `feature-chat` vào `main` sau khi kiểm tra.
- **Đừng nhầm:** Commit không tự xuất hiện trên mọi nhánh.

---

## 📖 Định nghĩa
Khi tạo commit, Git cập nhật nhánh hiện tại để trỏ tới commit mới. Nhánh khác vẫn trỏ tới vị trí riêng của nó cho tới khi bạn chủ động hợp nhất hoặc áp dụng commit bằng một thao tác khác. Như vậy, commit trên nhánh tính năng chưa nằm trong lịch sử của `main`. Các thay đổi chưa commit là chuyện khác: chúng có thể được giữ lại khi chuyển nhánh nếu không gây xung đột.

---

## 🤔 Tại sao cần?
Tách commit theo nhánh cho nhóm thời gian làm và kiểm tra một tính năng trước khi đưa vào nhánh chung. Nếu thử nghiệm không dùng được, `main` vẫn ở mốc cũ. Commit thử vẫn có thể tồn tại trong lịch sử repository; đừng hiểu việc chuyển về `main` là xóa commit đó.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung mỗi nhánh là một dấu trang trên cùng quyển sổ lịch sử. Bạn ghi một trang mới khi đang ở `feature-chat`, nên dấu trang `main` không tự nhảy tới trang đó. Hợp nhất là thao tác chọn cách nối lịch sử lại.

---

## 🖼 Sơ đồ
```text
                 ┌── C4 (feature-chat)
C1 ── C2 ── C3 ──┤
                 └── C5 (main)

Commit C4 chỉ có trên feature-chat cho tới khi được hợp nhất.
```

---

## 🌎 Ví dụ thực tế
An tạo `test-darkmode`, thêm tệp CSS rồi commit. Khi An chuyển về `main`, tệp chỉ có trong commit của nhánh thử nghiệm nên không xuất hiện trong snapshot `main`. Commit đó vẫn còn trong lịch sử nhánh `test-darkmode`; nó không bị xóa chỉ vì An đổi nhánh. Nếu An muốn đưa giao diện tối vào dự án chung, nhóm sẽ review rồi hợp nhất.

---

## 💻 Command
```bash
git switch -c test-isolation
# Tạo tệp secret-test.txt trong trình sửa tệp, rồi lưu nội dung
git add secret-test.txt
git commit -m "test: add isolated file"
git switch main
git status
```

---

## 🔍 Giải thích command
- `git switch -c test-isolation`: Tạo nhánh và chuyển sang đó.
- Tạo tệp mới, rồi dùng `git add` và `git commit` để lưu tệp trên nhánh thử nghiệm.
- `git switch main`: Quay về nhánh chính; tệp chỉ có trong commit thử sẽ không nằm trong snapshot này.
- `git status`: Kiểm tra trạng thái hiện tại; thay đổi chưa commit cần được xem riêng.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ commit nhánh con tự sang `main`:** Cần một thao tác tích hợp có chủ đích.
2. **Nghĩ tệp biến mất khỏi `main` là bị xóa khỏi repository:** Tệp vẫn nằm trong commit của nhánh thử nghiệm.
3. **Nghĩ mọi thay đổi đều được cách ly tuyệt đối:** Sửa đổi chưa commit có thể đi theo khi đổi nhánh nếu an toàn.

---

## 🧪 Lab
1. Chạy `git switch -c test-isolation`.
2. Tạo `secret-test.txt` bằng trình sửa tệp và ghi `Chỉ có trên nhánh thử nghiệm`.
3. Chạy `git add secret-test.txt`, rồi `git commit -m "test: add isolated file"`.
4. Chạy `git switch main`; kiểm tra danh sách tệp và xác nhận `secret-test.txt` không có trong snapshot của `main`.
5. Chạy `git switch test-isolation`; xác nhận tệp vẫn còn trên nhánh thử nghiệm.

---

## 💡 Hint
> Chuyển nhánh chỉ thay đổi commit mà thư mục đang phản ánh; nó không tự gộp lịch sử.

---

## ✅ Validation
- `secret-test.txt` có trên `test-isolation`.
- Tệp không có trên `main` trước khi hợp nhất.
- `git status` sạch sau mỗi lần commit.

---

## ❓ Quiz
Trả lời câu hỏi để kiểm tra sự khác nhau giữa commit nhánh riêng và thay đổi đã hợp nhất.

---

## 🔥 Challenge
Tạo commit khác trên `main`, rồi chuyển qua lại hai nhánh. Ghi lại tệp nào thuộc snapshot mỗi nhánh và nêu thao tác cần có để đưa tệp giữa hai nhánh.

---

## 📚 Tổng kết
- Commit mới được gắn vào nhánh đang chọn.
- Chuyển về `main` không xóa commit ở nhánh khác.
- Sửa đổi chưa commit có thể đi theo khi chuyển nhánh; kiểm tra `git status`.
