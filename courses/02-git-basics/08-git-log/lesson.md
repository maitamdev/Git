# Tra cứu lịch sử với git log

---

## 🎯 Mục tiêu
- Sử dụng thành thạo `git log` để duyệt ngược dòng thời gian các mốc commit trong dự án.
- Tối ưu hóa tầm nhìn bằng cờ `--oneline` và giới hạn phạm vi hiển thị bằng tham số `-n`.
- Hiểu rõ ý nghĩa của mã băm Commit Hash và con trỏ điều hướng `HEAD`.

---

## 🧩 Từ khóa hôm nay

### `git log` — xem lịch sử commit
- **Nói dễ hiểu:** Cuốn nhật ký hành trình liệt kê toàn bộ các mốc commit đã được lưu lại trong lịch sử dự án.
- **Ví dụ:** Chạy `git log` để rà soát toàn bộ các mốc thay đổi từ ngày khởi tạo dự án tới nay.
- **Đừng nhầm:** Lệnh chỉ hiển thị những thay đổi đã được commit; các chỉnh sửa dở dang ở Working Tree sẽ không xuất hiện.

### Commit hash — mã nhận diện commit
- **Nói dễ hiểu:** Chuỗi băm ký tự độc nhất vô nhị (SHA-1 dài 40 ký tự) đóng vai trò như số căn cước công dân của commit.
- **Ví dụ:** Mã băm ngắn `7a3f1b2` hiển thị cạnh lời nhắn trong lệnh `git log --oneline`.
- **Đừng nhầm:** Đây là mã băm mã hóa tính toán tự động từ nội dung, không phải số thứ tự tăng dần do con người đặt.

### `--oneline` — dạng lịch sử gọn
- **Nói dễ hiểu:** Cờ tùy chọn cô đọng mỗi commit thành đúng một dòng duy nhất gồm mã hash ngắn và thông điệp.
- **Ví dụ:** `git log --oneline` giúp bạn lướt nhanh 20 commit trên một màn hình mà không bị cuộn mỏi tay.
- **Đừng nhầm:** Định dạng này ẩn đi thông tin tác giả và ngày giờ; khi cần điều tra chi tiết hãy dùng `git log` đầy đủ.

### `-n` — giới hạn số commit
- **Nói dễ hiểu:** Tham số chỉ định số lượng commit gần nhất mà bạn muốn màn hình hiển thị ra.
- **Ví dụ:** `git log -n 5` chỉ xuất ra đúng 5 commit mới nhất thay vì in ra hàng nghìn commit làm đơ terminal.
- **Đừng nhầm:** Lệnh chỉ cắt bớt số lượng hiển thị trên màn hình hiện tại, tuyệt đối không làm mất mát lịch sử repo.

### HEAD — mốc Git đang đứng tại
- **Nói dễ hiểu:** Con trỏ đặc biệt đánh dấu vị trí snapshot hiện tại mà thư mục làm việc của bạn đang neo vào.
- **Ví dụ:** Nhìn thấy `(HEAD -> main)` trong log nghĩa là bạn đang đứng ở commit mới nhất của nhánh `main`.
- **Đừng nhầm:** HEAD là một con trỏ động di chuyển liên tục theo mỗi commit mới, không phải là tên của một commit cố định.

---

## 📖 Định nghĩa
`git log` là cỗ máy thời gian của Git, cho phép bạn truy xuất toàn bộ biên niên sử các commit có thể đi tới từ vị trí hiện tại. Lệnh hiển thị danh sách đảo ngược theo thời gian (mới nhất lên đầu), bao gồm mã băm định danh duy nhất (commit hash), tác giả, mốc thời gian và thông điệp chi tiết của từng snapshot.

---

## 🤔 Tại sao cần?
Lập trình mà không đọc được log cũng giống như điều tra vụ án mà không có hồ sơ hiện trường. `git log` là công cụ sống còn giúp bạn nắm bắt tiến độ dự án, hiểu được ai đã thay đổi tính năng gì và tại sao. Khi phần mềm gặp sự cố hoặc xảy ra lỗi hồi quy (regression), `git log` chính là chiếc la bàn dẫn lối giúp bạn truy ngược lại đúng commit đã gây ra lỗi để khắc phục kịp thời.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng dự án của bạn là một cuốn biên niên sử dài kỳ. Mỗi commit là một trang nhật ký đã đóng bìa cứng không thể tẩy xóa. Lệnh `git log` lật giở từng trang nhật ký từ hiện tại ngược dần về quá khứ, giúp bạn theo dõi từng bước trưởng thành của hệ thống phần mềm.

---

## 🖼 Sơ đồ
```text
CẤU TRÚC HIỂN THỊ CỦA GIT LOG --ONELINE:
  1a2b3c4 (HEAD -> main) feat(auth): add google login   <── Commit mới nhất
  5d6e7f8 fix(payment): resolve total rounding bug      <── Commit liền trước
  9a0b1c2 docs(readme): initialize project guidelines   <── Commit khởi tạo
     │           │                    │
     │           │                    └── Commit Message (Nội dung thay đổi)
     │           └─────────────────────── Con trỏ HEAD và Branch hiện tại
     └─────────────────────────────────── Mã Commit Hash rút gọn (7 ký tự)
```

---

## 🌎 Ví dụ thực tế
Sáng thứ Hai đến công ty sau kỳ nghỉ cuối tuần, bạn muốn nắm nhanh những gì đồng đội đã hoàn thành. Thay vì phải đi hỏi từng người, bạn mở terminal gõ `git log --oneline -n 5`. Chỉ mất 3 giây, bạn thấy ngay 5 commit gần nhất: từ thêm API thanh toán, sửa lỗi giao diện cho đến cập nhật tài liệu hướng dẫn.

---

## 💻 Command
```bash
git log
git log --oneline
git log -n 5
git log --oneline --graph --all
```

---

## 🔍 Giải thích command
- `git log`: Hiển thị chi tiết toàn bộ lịch sử (Hash đầy đủ, Tác giả, Ngày giờ, Message). Kết quả thường chạy qua pager (Less/More).
- `git log --oneline`: Định dạng một dòng tối giản, hiển thị mã hash 7 ký tự đầu và dòng đầu của commit message.
- `git log -n <số>`: Giới hạn số lượng commit xuất ra, ngăn chặn tình trạng tràn màn hình trong các dự án có hàng vạn commit.
- Nhấn phím `q` để thoát chế độ xem phân trang bất cứ lúc nào.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng loạn khi bị kẹt trong màn hình log**: Git tự động mở chương trình phân trang `less`; nhiều bạn mới không biết cách thoát và tắt ngang terminal. Hãy nhớ nhấn phím `q` (quit) để thoát an toàn!
2. **Chỉ dùng mỗi lệnh `git log` mặc định**: Khiến màn hình cuộn dài bất tận, khó quan sát tổng thể; hãy tạo thói quen dùng `git log --oneline`.
3. **Hiểu nhầm commit hash là ngẫu nhiên**: Mã hash được sinh ra từ thuật toán băm nội dung; chỉ cần một dấu cách thay đổi, mã hash sẽ biến đổi hoàn toàn.

---

## 🧪 Lab
1. Chạy `git log` trong kho lưu trữ để kiểm tra toàn bộ lịch sử hiện có.
2. Nếu màn hình dừng lại ở dấu hai chấm `:`, hãy nhấn phím `q` trên bàn phím để trở về dòng lệnh terminal.
3. Chạy `git log --oneline` để ngắm nhìn lịch sử được trình bày gọn gàng theo từng dòng.
4. Chạy `git log -n 2` để chỉ hiển thị đúng hai commit gần nhất.

---

## 💡 Hint
> Khi terminal hiển thị dấu `:` ở góc dưới cùng lúc chạy `git log`, đừng gõ lệnh mới, hãy nhấn phím `q` trên bàn phím để thoát ngay!

---

## ✅ Validation
- Nhận diện và đọc hiểu được mã Hash rút gọn cùng Commit Message từ lệnh `git log --oneline`.
- Thoát khỏi chế độ xem phân trang một cách thuần thục với phím `q`.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để củng cố kỹ năng tra cứu và phân tích lịch sử commit bằng `git log`.

---

## 🔥 Challenge
Hãy chạy lệnh `git log --oneline -n 3` trong một kho mã nguồn thực tế. Chọn ra commit ở giữa và giải thích chi tiết: mã hash đại diện cho điều gì và thông điệp commit đã giúp ích gì cho việc hiểu lịch sử dự án?

---

## 📚 Tổng kết
- `git log` là công cụ truy vết lịch sử commit theo thứ tự thời gian đảo ngược.
- Cờ `--oneline` giúp tối ưu hóa không gian hiển thị, hỗ trợ bao quát tiến độ dự án chỉ trong một ánh nhìn.
- Nhớ quy tắc sinh tồn: luôn nhấn phím `q` để thoát khỏi màn hình phân trang của `git log`.
