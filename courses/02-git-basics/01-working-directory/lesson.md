# Working Directory (Thư mục làm việc)

---

## 🎯 Mục tiêu
- Chỉ ra thư mục làm việc và biết nơi mình sửa tệp.
- Phân biệt tệp Git đã theo dõi với tệp mới chưa được theo dõi.
- Dùng `git status` để xem những tệp đó.

---

## 🧩 Từ khóa hôm nay

### Working Directory — thư mục làm việc
- **Nói dễ hiểu:** Các tệp dự án trên máy mà bạn mở và sửa.
- **Ví dụ:** Tệp `index.html` đang mở trong trình soạn thảo nằm ở đây.
- **Đừng nhầm:** Sửa ở đây chưa tự đưa thay đổi vào commit.

### Tracked — đã được Git theo dõi
- **Nói dễ hiểu:** Tệp Git đã biết và có thể so sánh với trạng thái đã lưu.
- **Ví dụ:** README sau khi được thêm vào lịch sử sẽ là tracked.
- **Đừng nhầm:** Tracked không có nghĩa sửa đổi mới đã được commit.

### Untracked — chưa được Git theo dõi
- **Nói dễ hiểu:** Tệp mới nằm trong thư mục nhưng Git chưa được yêu cầu theo dõi.
- **Ví dụ:** Tạo `note.txt` mới rồi chạy `git status`.
- **Đừng nhầm:** Tệp vẫn nằm trên máy; chỉ là chưa được chọn vào Git.

---

## 📖 Định nghĩa
Working Directory (còn gọi là Working Tree trong nhiều hướng dẫn) là các tệp dự án bạn mở và sửa trên máy. Tạo tệp mới chưa tự đưa tệp vào Git; `git status` sẽ báo tệp là untracked cho tới khi bạn chọn theo dõi.

---

## 🤔 Tại sao cần?
Lưu tệp trong trình soạn thảo chỉ cập nhật tệp trên máy. Git chưa đưa thay đổi đó vào lịch sử; việc này cần các bước `git add` và `git commit`.

---

## 🧠 Mental Model (Mô hình tư duy)
Working Directory là bản dự án bạn đang nhìn và sửa trên máy; commit là mốc đã lưu riêng trong lịch sử.

---

## 🖼 Sơ đồ
```text
Kiến trúc 3 khu vực của Git:
┌──────────────────────┐     git add      ┌──────────────────────┐    git commit    ┌──────────────────────┐
│  Working Directory   │ ───────────────► │     Staging Area     │ ───────────────► │      Repository      │
│ (Thư mục làm việc)   │                  │   (Vùng chuẩn bị)    │                  │  (các commit đã lưu) │
│  - Chỉnh sửa tệp     │                  │  - Chọn thay đổi     │                  │  - Lưu các commit     │
└──────────────────────┘                  └──────────────────────┘                  └──────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Tạo `payment.js`, rồi chạy `git status`. Git báo tệp là Untracked: tệp có trên máy nhưng chưa được chọn để theo dõi.

---

## 💻 Command
```bash
git status
```

---

## 🔍 Giải thích command
- `git status`: Báo tệp nào đã sửa, đã staged hoặc chưa được theo dõi.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ lưu tệp là Git đã tạo mốc**:  Lưu trong trình soạn thảo chưa tạo commit.
2. **Nhầm Working Directory với Staging Area**:  Tệp đang sửa chưa chắc đã được chọn cho commit.
3. **Nhầm lẫn Working Directory với Staging Area**:  Không phân biệt được tệp đang sửa với tệp đã sẵn sàng để commit.

---

## 🧪 Lab
1. Mở terminal tại thư mục dự án và tạo một tệp tin mới bằng lệnh `echo "console.log(1);" > script.js`.
2. Chạy `git status` để thấy `script.js` trong mục Untracked files.
3. Nhận biết rằng tệp tin này đang nằm trong Working Directory nhưng chưa hề được đưa vào Staging Area.

---

## 💡 Hint
> Mọi tệp tin bạn nhìn thấy và sửa đổi trong VS Code đều nằm trong Working Directory.

---

## ✅ Validation
- Tạo tệp thành công và `git status` nhận diện tệp là untracked trong working tree.

---

## ❓ Quiz
Hãy hoàn thành bài kiểm tra trắc nghiệm dưới đây về Working Directory trong Git.

---

## 🔥 Challenge
Mô tả điều gì sẽ xảy ra với các tệp trong Working Directory nếu bạn chuyển sang một nhánh hoàn toàn khác.

---

## 📚 Tổng kết
- Working Directory là dự án bạn đang mở và sửa trên máy.
- Tệp mới chưa được chọn sẽ hiện là Untracked.
- Lưu tệp chưa tạo commit; dùng `git status` để kiểm tra trạng thái.
