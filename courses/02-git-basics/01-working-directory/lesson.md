# Working Directory (Thư mục làm việc)

---

## 🎯 Mục tiêu
- Chỉ ra nơi bạn mở và sửa tệp của dự án.
- Phân biệt một tệp Git đã biết với tệp mới chưa được theo dõi.
- Dùng `git status` để xem trạng thái của các tệp.

---

## 🧩 Từ khóa hôm nay

### Working Directory — thư mục làm việc
- **Nói dễ hiểu:** Các tệp dự án trên máy mà bạn mở và sửa.
- **Ví dụ:** Tệp `index.html` đang mở trong trình soạn thảo thuộc thư mục làm việc.
- **Đừng nhầm:** Sửa tệp ở đây chưa tự tạo một commit trong lịch sử.

### Tracked — đã được Git theo dõi
- **Nói dễ hiểu:** Tệp Git đã được yêu cầu quản lý và sẽ báo khi nội dung thay đổi.
- **Ví dụ:** README đã được lưu trong một commit trước đó là tracked.
- **Đừng nhầm:** Tracked không có nghĩa mọi lần sửa mới đã được lưu thành commit.

### Modified — đã sửa
- **Nói dễ hiểu:** Tệp tracked có nội dung khác với mốc đã lưu gần nhất.
- **Ví dụ:** Bạn sửa README đã có trong commit; `git status` báo tệp là modified.
- **Đừng nhầm:** Modified cho biết nội dung đang đổi, không có nghĩa đã tạo commit mới.

### Untracked — chưa được Git theo dõi
- **Nói dễ hiểu:** Tệp đang có trong thư mục dự án nhưng Git chưa được yêu cầu quản lý.
- **Ví dụ:** Bạn tạo `note.txt` mới rồi chạy `git status`; Git báo tệp chưa được theo dõi.
- **Đừng nhầm:** Untracked không có nghĩa tệp bị xóa; tệp vẫn nằm trong thư mục dự án.

---

## 🤔 Tại sao cần?
Khi làm dự án, bạn thường tạo tệp mới hoặc sửa tệp có sẵn. Trước khi học cách chọn và lưu thay đổi, hãy dùng `git status` để biết Git đang nhận diện các tệp đó ra sao. Nhờ vậy, bạn không nhầm một tệp chưa được theo dõi với tệp đã mất.

---

## 📖 Định nghĩa
Working Directory, còn gọi là Working Tree, là các tệp dự án bạn đang mở và sửa. `git status` báo tình trạng các tệp trong thư mục đó. Tệp mới chưa được Git biết thường hiện là Untracked; nội dung của nó vẫn còn trên máy.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem Working Directory như chiếc bàn bạn đang làm bài. Một tệp mới vẫn nằm trên bàn dù Git chưa theo dõi nó. `git status` giống như danh sách kiểm tra cho biết tệp nào đang mới hoặc đã sửa.

---

## 🖼 Sơ đồ
```text
Thư mục dự án — Working Directory
├── README.md   Git đã biết tệp này; nếu vừa sửa thì Modified
└── note.txt    Tệp mới, Git chưa theo dõi (Untracked)

git status chỉ báo tình trạng; lệnh không thêm tệp hay tạo commit.
```

---

## 🌎 Ví dụ thực tế
Bạn tạo `note.txt` để ghi ý tưởng cho dự án. Tệp đã có trong thư mục dù chưa nằm trong lịch sử Git. Chạy `git status` để thấy Git báo tệp mới là Untracked.

---

## 💻 Command
```bash
git status
```

---

## 🔍 Giải thích command
`git status` cho biết tệp nào mới hoặc đã sửa trong repository hiện tại. Lệnh chỉ đọc trạng thái; nó không thay đổi tệp và không tạo commit.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ lưu trong trình soạn thảo là đã tạo commit:** Lưu tệp cập nhật Working Directory, không tự ghi mốc vào lịch sử.
2. **Nghĩ Untracked có nghĩa tệp bị mất:** Tệp vẫn nằm trong thư mục; Git chỉ chưa được yêu cầu theo dõi.
3. **Nghĩ `git status` tự sửa trạng thái:** Lệnh chỉ báo tình trạng hiện tại, không thêm hoặc lưu tệp.

---

## 🧪 Lab
1. Trong bảng tệp của terminal mô phỏng, tạo tệp mới tên `note.txt` và nhập một dòng ghi chú.
2. Chạy `git status`.
3. Tìm `note.txt` dưới mục Untracked files và xác nhận tệp vẫn còn trong bảng tệp.

---

## 💡 Hint
Nếu vừa tạo tệp mới, hãy tìm mục **Untracked files** trong kết quả `git status`.

---

## ✅ Validation
- Tạo được `note.txt` trong dự án.
- `git status` báo tệp mới là Untracked.
- Giải thích được tệp vẫn còn trong Working Directory dù Git chưa theo dõi.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Khi sai, đọc lời giải thích rồi thử lại.

---

## 🔥 Challenge
Tạo thêm `todo.txt`. Trước khi chạy `git status`, dự đoán tệp sẽ xuất hiện ở mục nào rồi kiểm tra dự đoán.

---

## 📚 Tổng kết
- Working Directory là các tệp dự án bạn mở và sửa.
- Tệp mới chưa được theo dõi thường hiện là Untracked.
- `git status` báo tình trạng, không tự lưu commit.
