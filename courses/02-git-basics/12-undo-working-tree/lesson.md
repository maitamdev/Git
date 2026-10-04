# Hoàn tác thay đổi Working Tree

---

## 🎯 Mục tiêu
- Sử dụng thành thạo lệnh hiện đại `git restore <file>` để loại bỏ nhanh các thử nghiệm hỏng trong Working Tree.
- Nắm vững cú pháp `git restore --staged <file>` để rút tệp khỏi Staging Area mà không làm mất code.
- Nhận thức sâu sắc tính nguy hiểm và không thể đảo ngược khi vứt bỏ (discard) các thay đổi chưa được commit.

---

## 🧩 Từ khóa hôm nay

### `git restore <file>` — bỏ sửa đổi trong tệp
- **Nói dễ hiểu:** Phục hồi tệp trong thư mục làm việc về nội dung sạch sẽ của Staging Area hoặc commit gần nhất.
- **Ví dụ:** Chạy `git restore index.html` để xóa sạch toàn bộ các đoạn code gõ thử nghiệm trong tệp HTML.
- **Đừng nhầm:** Thao tác này vĩnh viễn xóa bỏ các thay đổi chưa được commit trên ổ đĩa, Git sẽ không thể cứu lại được.

### `git restore --staged` — bỏ chọn cho commit
- **Nói dễ hiểu:** Rút tệp ra khỏi Staging Area để không đưa vào commit kế tiếp, nhưng giữ nguyên vẹn nội dung code trên ổ đĩa.
- **Ví dụ:** Lỡ gõ `git add secret.env`, bạn chạy `git restore --staged secret.env` để unstage an toàn.
- **Đừng nhầm:** Lệnh chỉ hủy trạng thái Staged ở vùng đệm; code bạn vừa viết trong file vẫn còn nguyên trong thư mục làm việc.

### Discard — bỏ thay đổi
- **Nói dễ hiểu:** Hành động vứt bỏ triệt để các sửa đổi chưa được lưu lại trong commit lịch sử nào.
- **Ví dụ:** Sử dụng `git restore .` để discard toàn bộ các chỉnh sửa vặt trong tất cả các tệp của thư mục.
- **Đừng nhầm:** Tuyệt đối không discard bừa bãi khi chưa dùng `git diff` kiểm tra xem có dòng code quan trọng nào bị bỏ quên hay không.

---

## 📖 Định nghĩa
`git restore` là bộ công cụ hoàn tác hiện đại (được tách ra từ `git checkout` cồng kềnh ngày trước) chuyên trách việc phục hồi dữ liệu trong thư mục làm việc và vùng đệm. Khi gõ `git restore <file>`, Git ghi đè tệp ở Working Tree bằng bản sao trong Staging Area hoặc HEAD, xóa sạch mọi sửa đổi chưa commit của tệp đó.

---

## 🤔 Tại sao cần?
Trong lập trình, việc thử nghiệm ý tưởng mới và thất bại là chuyện thường ngày. Có những lúc bạn viết cả trăm dòng code thử nghiệm nhưng thuật toán bế tắc và bạn muốn xóa sạch mọi thứ để làm lại từ đầu. Thay vì phải Ctrl+Z mỏi tay hoặc xóa file gõ lại, `git restore` giúp bạn quay ngược thời gian trong một chớp mắt, dọn sạch code rác và đưa file về trạng thái nguyên bản an toàn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem `git restore <file>` như chiếc tẩy thần kỳ xóa sạch nét bút chì vẽ nháp trên bản thiết kế để lộ ra lớp mực in gốc. Còn `git restore --staged <file>` giống như bạn thò tay vào thùng hàng lấy món đồ ra đặt lại trên bàn: món đồ vẫn còn nguyên trước mắt bạn, chỉ là nó không còn nằm trong danh sách gửi bưu điện nữa.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ PHỤC HỒI DỮ LIỆU CỦA GIT RESTORE:

1. git restore <file>:
   Staging Area (hoặc HEAD) ────────── Ghi đè ──────────► Working Tree
                                                         (Code sửa dở bị xóa vĩnh viễn)

2. git restore --staged <file>:
   HEAD ────────────────────────────── Đặt lại ─────────► Staging Area
                                                         (Working Tree giữ nguyên 100%)
```

---

## 🌎 Ví dụ thực tế
Bạn thử nghiệm cấu hình hiệu năng cao trong `database.config.js` nhưng ứng dụng bị treo cứng. Thay vì lo sợ, bạn mở terminal gõ `git restore database.config.js`. Toàn bộ cấu hình lỗi biến mất ngay lập tức và file trở về phiên bản ổn định nhất của commit trước đó. Hệ thống khởi động lại mượt mà như chưa từng có sự cố.

---

## 💻 Command
```bash
git restore <file>
git restore .
git restore --staged <file>
```

---

## 🔍 Giải thích command
- `git restore <file>`: Khôi phục nội dung của tệp tracked về phiên bản lưu gần nhất trong Staging Area hoặc HEAD. Mọi sửa đổi chưa commit sẽ bốc hơi.
- `git restore .`: Hoàn tác hàng loạt toàn bộ tệp tracked đang bị sửa đổi trong thư mục hiện tại.
- `git restore --staged <file>`: Lệnh unstage chuẩn mực đưa tệp từ Staging Area trở lại trạng thái Unstaged, bảo toàn nguyên vẹn code đang gõ trên ổ đĩa.

---

## ⚠️ Sai lầm phổ biến
1. **Lạm dụng `git restore .` khi chưa đọc diff**: Vô tình xóa sổ hàng giờ công sức lập trình vì lười không chỉ định chính xác tên file cần hoàn tác.
2. **Nhầm lẫn tai hại giữa có và không có `--staged`**: Muốn unstage file (`--staged`) nhưng gõ thiếu cờ thành `git restore <file>`, dẫn đến việc xóa sạch toàn bộ code vừa viết.
3. **Ảo tưởng rằng Git có thể cứu lại code chưa commit**: Bất kỳ dòng code nào bị discard bằng `git restore` mà chưa từng được commit sẽ biến mất vĩnh viễn khỏi ổ cứng.

---

## 🧪 Lab
1. Mở tệp `app.js` và gõ thêm một dòng code cố ý gây lỗi cú pháp.
2. Chạy `git status` để xác nhận `app.js` đang nằm trong nhóm "Changes not staged for commit".
3. Chạy `git restore app.js` để loại bỏ dòng code lỗi đó.
4. Mở lại tệp và chạy `git status` để kiểm chứng mã nguồn đã được phục hồi nguyên vẹn và sạch sẽ.

---

## 💡 Hint
> Luôn chạy `git diff <file>` trước khi gõ `git restore <file>` để tận mắt thấy những dòng code nào sắp bị xóa sổ vĩnh viễn!

---

## ✅ Validation
- Tệp tin được phục hồi chính xác về trạng thái của commit gần nhất hoặc bản snapshot trong Staging Area.
- Lệnh `git restore --staged` đưa tệp về trạng thái Unstaged mà không làm mất nội dung code.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để nắm vững sự khác biệt giữa các chế độ hoàn tác của lệnh git restore.

---

## 🔥 Challenge
Hãy so sánh chi tiết: Điều gì sẽ xảy ra với dữ liệu trong 2 kịch bản sau: Kịch bản A chạy `git restore file.txt`, và Kịch bản B chạy `git restore --staged file.txt`? Khi nào bạn dùng Kịch bản A và khi nào bắt buộc phải dùng Kịch bản B?

---

## 📚 Tổng kết
- `git restore <file>` hủy bỏ các sửa đổi dở dang ở Working Tree, đưa file về trạng thái lưu gần nhất.
- `git restore --staged <file>` rút tệp khỏi Staging Area một cách an toàn mà không làm mất code của bạn.
- Hãy cẩn trọng tối đa: các thay đổi chưa được commit khi bị discard sẽ biến mất vĩnh viễn không thể khôi phục.
