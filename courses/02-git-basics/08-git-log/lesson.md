# Tra cứu lịch sử với git log

---

## 🎯 Mục tiêu
- Sử dụng thành thạo câu lệnh `git log` để tra cứu lịch sử commit của kho lưu trữ.
- Tùy biến hiển thị lịch sử với các cờ mạnh mẽ: `--oneline`, `--graph`, `-n <số-lượng>`, `--author`.
- Đọc hiểu mã băm commit, tác giả, ngày giờ và mối liên kết phân nhánh trực quan.

---

## 📖 Định nghĩa
> `git log` là công cụ tra cứu lịch sử cốt lõi của Git, cho phép bạn duyệt lại toàn bộ các commit snapshot đã được ghi nhận trong kho lưu trữ từ quá khứ cho tới hiện tại. Mỗi mục nhật ký commit hiển thị đầy đủ mã băm SHA-1 (hoặc SHA-256) gồm 40 ký tự định danh duy nhất, tên tác giả, địa chỉ email, mốc thời gian commit và toàn bộ thông điệp mô tả thay đổi. Git cung cấp hàng chục tùy chọn bộ lọc và định dạng để bạn tìm kiếm chính xác những gì mình cần.

---

## 🤔 Tại sao cần?
Khả năng tra cứu lịch sử một cách nhanh chóng và chính xác là một trong những sức mạnh lớn nhất của hệ thống quản lý phiên bản. Khi một lỗi nghiêm trọng phát sinh trên môi trường production, bạn cần biết chính xác commit nào đã đưa đoạn code lỗi đó vào hệ thống, ai là người tạo commit và lý do thực hiện thay đổi là gì. Sử dụng thành thạo các bộ lọc của `git log` giúp bạn làm chủ thời gian và giải quyết sự cố thần tốc.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git log` giống như cuốn nhật ký hành trình của một con tàu thám hiểm đại dương. Mỗi khi con tàu đi qua một hòn đảo hoặc gặp một cơn bão lớn, thuyền trưởng sẽ mở nhật ký hàng hải ra ghi lại tọa độ kinh độ vĩ độ (mã hash commit), thời gian gió bão (timestamp) và ghi chú nhật ký hành trình (commit message). Khi hậu thế muốn nghiên cứu lại hải trình của chuyến đi, họ chỉ cần lật từng trang nhật ký đó ra để đối chiếu.

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
Một kỹ sư bảo mật cần điều tra một lỗ hổng an ninh vừa được cảnh báo trên thư viện mã nguồn của hệ thống thương mại điện tử. Kỹ sư chạy lệnh `git log --author="Alice" --since="2 weeks ago" --oneline` để lọc ra toàn bộ các commit do lập trình viên Alice thực hiện trong vòng hai tuần vừa qua. Nhờ kết quả hiển thị cô đọng trên từng dòng với mã hash ngắn và thông điệp súc tích, kỹ sư nhanh chóng khoanh vùng được commit cụ thể đã chỉnh sửa tệp cấu hình bảo mật. Kỹ sư mở tiếp chi tiết commit đó bằng lệnh `git show` để đọc từng dòng code sửa đổi và tiến hành phát hành bản vá khẩn cấp ngay trong buổi sáng cùng ngày.

---

## 💻 Command
```bash
git log
git log --oneline
git log --graph --oneline --all
git log -n 5
```

---

## 🔍 Giải thích command
- `git log`: Hiển thị lịch sử commit đầy đủ chi tiết theo thứ tự thời gian đảo ngược.
- `git log --oneline`: Rút gọn mỗi commit thành một dòng duy nhất gồm mã hash ngắn 7 ký tự và thông điệp commit.
- `git log --graph --oneline --all`: Vẽ đồ thị nhánh ASCII trực quan biểu diễn tất cả các nhánh và mốc rẽ nhánh.
- `git log -n 5`: Giới hạn kết quả chỉ hiển thị 5 commit gần đây nhất.

---

## ⚠️ Sai lầm phổ biến
1. **Bị kẹt trong giao diện phân trang pager (Less)**:  Khi danh sách log dài, terminal mở công cụ less và người dùng không biết bấm phím `q` để thoát ra.
2. **Chỉ dùng git log mặc định dài dòng**:  Không biết sử dụng `--oneline` khiến màn hình bị tràn ngập thông tin khó theo dõi.
3. **Không biết cách lọc theo thời gian hoặc tác giả**:  Phải cuộn chuột thủ công qua hàng ngàn commit thay vì dùng cờ `--author` hoặc `--since`.

---

## 🧪 Lab
1. Chạy lệnh `git log` trong dự án để xem định dạng hiển thị đầy đủ mặc định.
2. Nhấn phím `q` trên bàn phím để thoát khỏi màn hình xem log nếu danh sách dài.
3. Chạy lệnh `git log --oneline` để quan sát định dạng tóm tắt thanh lịch.
4. Thử nghiệm lệnh `git log -n 2` để chỉ hiển thị đúng 2 commit gần nhất.

---

## 💡 Hint
> Nhấn phím `q` bất cứ khi nào bạn muốn thoát khỏi giao diện xem git log.

---

## ✅ Validation
- Thực thi thành công `git log --oneline` và đọc được các mã băm commit.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây về các kỹ năng tra cứu lịch sử với git log.

---

## 🔥 Challenge
Tìm hiểu cách sử dụng lệnh `git log -S "tên_hàm"` để truy vết commit đã thêm hoặc xóa một đoạn code cụ thể.

---

## 📚 Tổng kết
- `git log` hiển thị toàn bộ lịch sử commit theo thứ tự từ mới nhất đến cũ nhất.
- Cờ `--oneline` giúp rút gọn mỗi commit thành một dòng trực quan dễ theo dõi.
- Nhấn phím `q` trên bàn phím để thoát khỏi chế độ xem phân trang của git log.
