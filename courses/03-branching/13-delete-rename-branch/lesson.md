# Đổi tên và xóa nhánh an toàn

---

## 🎯 Mục tiêu
- Đổi tên một nhánh bằng `git branch -m`.
- Giải thích vì sao `git branch -d` có thể từ chối xóa.
- Chỉ xóa nhánh sau khi xác nhận công việc đã được merge.

---

## 🧩 Từ khóa hôm nay

### `git branch -m` — đổi tên nhánh
- **Nói dễ hiểu:** Đổi tên con trỏ nhánh; commit và nội dung lịch sử vẫn giữ nguyên.
- **Ví dụ:** `git branch -m temp-feature feature-profile` đổi tên nhánh `temp-feature`.
- **Đừng nhầm:** Lệnh không đổi tên nhánh trên GitHub; phần đó cần quy trình remote ở Level 4.

### `git branch -d` — xóa nhánh có kiểm tra
- **Nói dễ hiểu:** Xóa nhánh nếu công việc trên đó đã được nhập vào nhánh hiện tại hoặc nhánh theo dõi.
- **Ví dụ:** Sau khi merge `feature-profile` vào `main`, xóa nhánh phụ bằng `git branch -d feature-profile`.
- **Đừng nhầm:** Nếu nhánh còn commit chưa merge, Git từ chối để tránh làm mất đường dẫn tới công việc đó.

### `git branch -D` — xóa cưỡng chế
- **Nói dễ hiểu:** Cờ viết hoa bỏ qua kiểm tra an toàn của `-d`.
- **Ví dụ:** Git nhắc tới `-D` trong thông báo khi `-d` từ chối.
- **Đừng nhầm:** Bài này không dùng `-D`; chỉ cân nhắc khi bạn đã xác nhận muốn bỏ công việc chưa merge và biết cách khôi phục.

---

## 📖 Định nghĩa
Tên nhánh là nhãn giúp trỏ tới commit. Đổi tên thay đổi nhãn; xóa nhánh gỡ nhãn đó. `git branch -d` chỉ cho xóa khi Git xác nhận nhánh đã được gộp, nhờ vậy giảm nguy cơ bỏ quên commit chưa tích hợp.

---

## 🤔 Tại sao cần?
Nhánh thường được đặt tên tạm khi bắt đầu làm việc. Khi công việc hoàn tất, tên rõ ràng giúp nhóm dễ hiểu hơn; sau khi merge, xóa nhánh cũ giữ danh sách gọn. Kiểm tra an toàn trước khi xóa bảo vệ công việc chưa được nhập.

---

## 🧠 Mental Model (Mô hình tư duy)
Nhánh giống tấm thẻ đánh dấu vị trí trong quyển sổ lịch sử. Đổi tên là viết lại tên trên thẻ. Xóa thẻ không xóa những trang đã được đánh dấu; nhưng nếu thẻ là đường duy nhất tới vài trang chưa chép vào nơi khác, đừng vứt nó đi.

---

## 🖼 Sơ đồ
```text
Trước merge:    main ── C1
                         \
                 feature ─ C2   (chưa merge, -d từ chối)

Sau merge:      main ── C1 ── M/C2
                              \
                 feature ─────┘   (đã nhập, -d có thể xóa nhãn)
```

---

## 🌎 Ví dụ thực tế
Bạn đặt nhánh tạm là `temp-feature`, sau đó đổi thành `feature-profile` cho dễ hiểu. Khi tính năng đã được merge vào `main`, bạn xóa nhánh phụ. Nếu thử xóa trước khi merge, `-d` dừng và báo rằng nhánh chưa được gộp.

---

## 💻 Command
```bash
git branch -m <tên-cũ> <tên-mới>
git branch -d <tên-nhánh>
git branch
```

---

## 🔍 Giải thích command
- `git branch -m <cũ> <mới>`: Đổi tên nhánh bất kỳ; nếu chỉ truyền một tên sau `-m`, Git đổi tên nhánh hiện tại.
- `git branch -d <nhánh>`: Xóa nhánh đã merge; Git từ chối nếu phát hiện commit chưa được gộp.
- `git branch`: Kiểm tra tên nhánh còn lại và nhánh hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Xóa nhánh khi chưa biết đã merge chưa:** Để Git kiểm tra bằng `-d`; không bỏ qua cảnh báo.
2. **Nghĩ xóa nhánh đã merge sẽ xóa commit khỏi `main`:** Commit đã có trong lịch sử `main`; chỉ nhãn nhánh phụ bị gỡ.
3. **Nghĩ đổi tên local sẽ tự đổi tên trên GitHub:** Nhánh remote cần được cập nhật riêng.

---

## 🧪 Lab
Yêu cầu: đang ở `main`, có ít nhất một commit và working tree sạch. Nếu tên `temp-feature` đã có, chọn tên khác.
1. Chạy `git branch temp-feature` để tạo nhánh tại commit hiện tại.
2. Đổi tên bằng `git branch -m temp-feature feature-profile`, rồi chạy `git branch` để xác nhận.
3. Chạy `git switch feature-profile`. Tạo tệp `feature-profile.txt`, ghi một dòng, rồi add và commit.
4. Chạy `git switch main`. Thử `git branch -d feature-profile`; đọc thông báo từ chối vì commit chưa merge.
5. Chạy `git merge feature-profile` để nhập thay đổi vào `main`.
6. Chạy `git branch -d feature-profile`, rồi `git branch` để xác nhận nhánh phụ đã được xóa.

---

## 💡 Hint
Nếu `-d` báo nhánh chưa được merge, dừng lại và kiểm tra `git log --oneline`; đừng đổi sang `-D` để ép xóa.

---

## ✅ Validation
- Tên nhánh được đổi từ `temp-feature` thành `feature-profile`.
- Lần xóa trước merge bị từ chối và nhánh vẫn còn.
- Sau merge, lệnh `git branch -d feature-profile` thành công; tệp vẫn có trên `main`.

---

## ❓ Quiz
Trả lời các câu hỏi để phân biệt đổi tên, xóa an toàn và xóa cưỡng chế.

---

## 🔥 Challenge
Giải thích vì sao Git ngăn `git branch -d` xóa `feature-profile` trước merge, và điều gì thay đổi sau khi merge.

---

## 📚 Tổng kết
- `git branch -m` đổi tên nhánh mà không sửa lịch sử commit.
- `git branch -d` kiểm tra trạng thái merge trước khi xóa.
- Không ép xóa nhánh nếu chưa xác nhận công việc có thể bỏ.
