# Merge commit là gì?

---

## 🎯 Mục tiêu
- Phân biệt commit thường với merge commit qua số lượng commit cha.
- Giải thích điều mà merge commit lưu lại và điều mà nó không chứng minh.
- Dùng `git show` và `git log` để xem merge commit trong lịch sử.

---

## 🧩 Từ khóa hôm nay

### Merge commit — commit hợp nhất
- **Nói dễ hiểu:** Commit ghi lại kết quả kết hợp hai nhánh có lịch sử riêng.
- **Ví dụ:** Bạn phát triển giỏ hàng trên `feature-cart`, đồng đội cập nhật trang chủ trên `main`, sau đó hai nhánh được merge.
- **Đừng nhầm:** Merge commit chỉ được tạo khi Git cần nối hai lịch sử; merge kiểu fast-forward không tạo commit này.

### Parent commit — commit cha
- **Nói dễ hiểu:** Commit đứng trước commit hiện tại trong lịch sử.
- **Ví dụ:** Merge commit thường có hai cha: đầu nhánh nhận và đầu nhánh được gộp.
- **Đừng nhầm:** Commit đầu tiên của kho không có cha; commit thường về sau thường có một cha.

### `git log --merges` — lọc merge commit
- **Nói dễ hiểu:** Chỉ xem các commit có nhiều hơn một commit cha.
- **Ví dụ:** Dùng `git log --merges --oneline` để tìm các lần hợp nhất.
- **Đừng nhầm:** `--no-merges` chỉ lọc khỏi màn hình; nó không xóa commit.

---

## 📖 Định nghĩa
Merge commit là một commit có từ hai commit cha trở lên. Nó lưu trạng thái tệp sau khi hợp nhất và nối lịch sử của nhánh hiện tại với nhánh được gộp. Commit này ghi nhận việc tích hợp; tự nó không chứng minh thay đổi đã được duyệt hay kiểm thử.

---

## 🤔 Tại sao cần?
Khi đọc lịch sử nhóm, merge commit giúp nhận ra lúc hai luồng công việc được nối với nhau. Nếu dự án dùng fast-forward, rebase hoặc squash, lịch sử có thể không có merge commit; đó là các cách tổ chức lịch sử khác nhau, không phải lỗi.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai lối đi tách từ một ngã rẽ. Một merge commit là điểm nối ghi nhận cả hai lối đã gặp lại. Điểm nối cho biết lịch sử được kết hợp, nhưng không nói nhóm đã kiểm thử tốt đến đâu.

---

## 🖼 Sơ đồ
```text
                 F1 ── F2  feature-cart
                /        \
Base ── M1 ─────            ── Merge M2  main
       main

M2 có hai commit cha: M1 và F2.
```

---

## 🌎 Ví dụ thực tế
Nhóm thêm trang giỏ hàng trên nhánh tính năng trong lúc nhánh `main` nhận một cập nhật khác. Khi hai nhánh đã có commit riêng, merge có thể tạo một commit mới. Người đọc lịch sử có thể thấy thời điểm tích hợp và lần theo cả hai nhánh.

---

## 💻 Command
```bash
git log --merges --oneline
git show HEAD
git log --no-merges --oneline
```

---

## 🔍 Giải thích command
- `git log --merges --oneline`: Liệt kê merge commit, mỗi commit trên một dòng.
- `git show HEAD`: Xem commit hiện tại; với merge commit, tìm dòng `Merge:` để thấy hai mã commit cha.
- `git log --no-merges --oneline`: Liệt kê các commit không phải merge commit.
- Nếu chưa có merge commit, lệnh đầu không in kết quả; hãy làm bài lab trước rồi chạy lại.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ merge commit chứng minh code đã được duyệt:** Việc duyệt thường nằm ở quy trình review hoặc nền tảng cộng tác, không nằm trong số cha của commit.
2. **Nghĩ mọi lần merge đều tạo merge commit:** Fast-forward chỉ di chuyển con trỏ nhánh.
3. **Cho rằng `--no-merges` chỉ hiện commit viết code:** Nó hiện các commit không phải merge; chúng có thể chứa nhiều loại thay đổi.

---

## 🧪 Lab
Dùng repository từ bài trước. Nếu chưa có merge commit, tạo một lần hợp nhất không xung đột:
1. Trên `main`, tạo tệp `history-main.txt`, ghi một dòng, rồi chạy `git add history-main.txt` và `git commit -m "docs: add main note"`.
2. Chạy `git switch -c feature-history`, tạo `history-feature.txt`, ghi một dòng, rồi add và commit tệp đó.
3. Chạy `git switch main`, sau đó `git merge feature-history`.
4. Chạy lần lượt ba lệnh trong phần Command. Ở kết quả `git show HEAD`, tìm dòng `Merge:` và đếm hai mã cha.

---

## 💡 Hint
Nếu `git show HEAD` không có dòng `Merge:`, có thể HEAD là commit thường. Kiểm tra lại bằng `git log --merges --oneline` và chuyển về `main` trước khi merge.

---

## ✅ Validation
- `git log --merges --oneline` liệt kê merge commit vừa tạo.
- `git show HEAD` có dòng `Merge:` với hai mã cha.
- `git log --no-merges --oneline` không liệt kê merge commit đó.

---

## ❓ Quiz
Trả lời câu hỏi để kiểm tra cách nhận diện merge commit và đọc hai commit cha.

---

## 🔥 Challenge
Giải thích vì sao hai lệnh `git log --merges` và `git log --no-merges` cho kết quả khác nhau. Nêu một thông tin mà merge commit không thể tự chứng minh.

---

## 📚 Tổng kết
- Merge commit có ít nhất hai commit cha; commit gốc có không cha, commit thường về sau thường có một cha.
- Nó ghi nhận lúc hai luồng lịch sử được nối, nhưng không thay cho review hoặc kiểm thử.
- Dùng `git log --merges` để tìm merge commit và `git show` để xem hai cha.
