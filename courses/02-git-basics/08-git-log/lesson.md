# Tra cứu lịch sử với git log

---

## 🎯 Mục tiêu
- Dùng `git log` để xem các commit trong lịch sử của nhánh hiện tại.
- Rút gọn hoặc vẽ lịch sử bằng `--oneline` và `--graph`.
- Giới hạn số commit hiển thị bằng `-n`.

---

## 🧩 Từ khóa hôm nay

### `git log` — xem lịch sử commit
- **Nói dễ hiểu:** Liệt kê các commit đã lưu trong nhánh hiện tại.
- **Ví dụ:** Chạy `git log` sau khi đã tạo vài commit.
- **Đừng nhầm:** Lệnh không hiển thị sửa đổi chưa commit như một mốc mới.

### Commit hash — mã nhận diện commit
- **Nói dễ hiểu:** Chuỗi ký tự Git dùng để phân biệt một commit.
- **Ví dụ:** Mã ngắn xuất hiện cạnh message trong `git log --oneline`.
- **Đừng nhầm:** Đây không phải số thứ tự do người dùng đặt.

### `--oneline` — dạng lịch sử gọn
- **Nói dễ hiểu:** Tùy chọn hiện mỗi commit trên một dòng ngắn.
- **Ví dụ:** `git log --oneline`.
- **Đừng nhầm:** Dạng gọn ẩn bớt chi tiết; có thể chạy `git log` để xem đầy đủ.

### `--graph` — vẽ nhánh lịch sử
- **Nói dễ hiểu:** Thêm ký hiệu giúp nhìn các đường nhánh và commit nối nhau.
- **Ví dụ:** `git log --oneline --graph`.
- **Đừng nhầm:** Ký hiệu chỉ trình bày lịch sử, không thay đổi repository.

### `-n` — giới hạn số commit
- **Nói dễ hiểu:** Chỉ hiện một số lượng commit gần đây do bạn chọn.
- **Ví dụ:** `git log -n 3` hiện tối đa ba commit.
- **Đừng nhầm:** Tùy chọn này chỉ rút gọn kết quả, không xóa lịch sử.

---

## 📖 Định nghĩa
`git log` liệt kê các commit có thể đi tới từ nhánh hiện tại, bắt đầu từ commit mới nhất. Mỗi mục cho biết commit và lời nhắn; dạng đầy đủ có thêm thông tin khác. Mã commit là mã nhận diện, không phải số thứ tự.

---

## 🤔 Tại sao cần?
Khi quên mình đã lưu những mốc nào, `git log` giúp bạn xem lại lịch sử. Dạng gọn giúp lướt nhanh; `-n` giới hạn kết quả để terminal dễ đọc.

---

## 🧠 Mental Model (Mô hình tư duy)
`git log` giống như danh sách các mốc đã lưu: mốc mới nhất hiện trước, mỗi mốc có mã nhận diện và message.

---

## 🖼 Sơ đồ
```text
Tùy biến hiển thị git log --graph --oneline:
* f7d02a1 (HEAD -> main) feat(payment): add momo e-wallet support
* 9e1c3d4 feat(cart): calculate discount coupon code
* 4a2f8b9 fix(auth): prevent sql injection in login query
* 1b8e4f2 feat: initialize project repository
```

---

## 🌎 Ví dụ thực tế
Bạn muốn biết mình vừa lưu những mốc nào. Chạy `git log --oneline -n 3` để xem tối đa ba commit gần nhất, mỗi commit trên một dòng.

---

## 💻 Command
```bash
git log
git log --oneline
git log --graph --oneline
git log -n 5
```

---

## 🔍 Giải thích command
- `git log`: Hiển thị lịch sử commit mà nhánh hiện tại có thể đi tới.
- `git log --oneline`: Hiện mỗi commit trên một dòng ngắn; độ dài mã nhận diện có thể thay đổi.
- `git log --graph --oneline`: Thêm ký hiệu để xem đường đi giữa các commit.
- `git log -n 5`: Hiển thị tối đa 5 commit có thể đi tới từ nhánh hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Không biết thoát kết quả phân trang**: Nếu Git mở trang xem log, nhấn `q` để quay lại terminal.
2. **Chỉ dùng git log mặc định dài dòng**:  Không biết sử dụng `--oneline` khiến màn hình bị tràn ngập thông tin khó theo dõi.
3. **Nghĩ `-n 5` sẽ luôn hiện đúng năm mốc**: Nếu lịch sử ngắn hơn, Git hiện ít hơn.

---

## 🧪 Lab
1. Chạy `git log` trong dự án để xem lịch sử.
2. Nếu Git mở kết quả dạng phân trang, nhấn `q` để thoát.
3. Chạy `git log --oneline` để xem mỗi commit trên một dòng.
4. Thử `git log -n 2` để xem tối đa hai commit gần nhất.

---

## 💡 Hint
> Nếu kết quả được mở dạng phân trang, nhấn `q` để quay lại terminal.

---

## ✅ Validation
- Đọc được ít nhất một lời nhắn commit từ `git log --oneline`.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây về các kỹ năng tra cứu lịch sử với git log.

---

## 🔥 Challenge
Dùng `git log --oneline -n 3`, rồi giải thích mã nhận diện và message ở một dòng.

---

## 📚 Tổng kết
- `git log` hiển thị các commit có thể đi tới từ nhánh hiện tại, mới nhất trước.
- Cờ `--oneline` giúp rút gọn mỗi commit thành một dòng trực quan dễ theo dõi.
- Nhấn phím `q` trên bàn phím để thoát khỏi chế độ xem phân trang của git log.
