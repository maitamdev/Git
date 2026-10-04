# So sánh khác biệt với git diff

---

## 🎯 Mục tiêu
- Nắm vững cách đọc hiểu ký hiệu `-` (xóa/cũ) và `+` (thêm/mới) trong kết quả so sánh diff.
- Phân biệt triệt để phạm vi kiểm tra giữa `git diff` (so sánh Working Tree) và `git diff --staged` (so sánh Staging Area).
- Đọc hiểu cấu trúc một Hunk và tiêu đề định vị `@@` trong bản đối chiếu mã nguồn.

---

## 🧩 Từ khóa hôm nay

### Diff — phần thay đổi giữa hai phiên bản
- **Nói dễ hiểu:** Bản báo cáo trực quan so sánh chi tiết từng dòng code sai khác giữa hai mốc thời gian hoặc hai khu vực của Git.
- **Ví dụ:** Bản diff chỉ ra dòng `timeout = 5000` cũ bị xóa và thay thế bằng dòng `timeout = 10000` mới.
- **Đừng nhầm:** Diff chỉ đóng vai trò phân tích và hiển thị sự khác biệt; bản thân việc xem diff không tạo ra bất kỳ commit hay nhánh nào.

### `git diff` — so sánh bản đang sửa
- **Nói dễ hiểu:** Lệnh mặc định giúp bạn soi sự khác biệt giữa thư mục làm việc (Working Tree) và vùng đệm (Staging Area).
- **Ví dụ:** Vừa sửa xong 5 dòng trong `user.service.ts`, gõ ngay `git diff` để kiểm tra lại trước khi gõ `git add`.
- **Đừng nhầm:** Khi bạn đã đưa file vào Staging Area bằng `git add`, lệnh `git diff` mặc định sẽ không còn hiển thị những thay đổi đó nữa.

### `--staged` — xem phần đã chuẩn bị
- **Nói dễ hiểu:** Cờ tùy chọn (tương đương `--cached`) cho phép soi sự khác biệt giữa Staging Area và commit gần nhất ở `HEAD`.
- **Ví dụ:** Sau khi chạy `git add`, bạn gõ `git diff --staged` để rà soát lần cuối toàn bộ nội dung sắp sửa được niêm phong vào commit.
- **Đừng nhầm:** Cờ `--staged` chỉ dùng để đọc và kiểm tra nội dung trong vùng đệm, không có tác dụng đưa thêm file vào Staging Area.

### Hunk — một nhóm dòng thay đổi
- **Nói dễ hiểu:** Một khối thay đổi cục bộ gồm vài dòng code lân cận nhau được gom lại, bắt đầu bằng header vị trí có dạng `@@ -a,b +c,d @@`.
- **Ví dụ:** Nếu bạn sửa dòng 10 và sửa tiếp dòng 200 trong cùng một file dài, kết quả diff sẽ được chia thành hai hunk tách biệt.
- **Đừng nhầm:** Dòng header chứa ký hiệu `@@` là siêu dữ liệu định vị dòng của Git, tuyệt đối không phải là nội dung code trong file của bạn.

---

## 📖 Định nghĩa
`git diff` là kính hiển vi của kỹ sư phần mềm, hiển thị chi tiết từng ký tự và từng dòng code sai biệt giữa hai trạng thái trong Git. Kết quả diff phân định rõ ràng bằng quy ước màu và ký tự: dấu trừ `-` (thường màu đỏ) đánh dấu dòng bị xóa hoặc thay thế, dấu cộng `+` (thường màu xanh) đánh dấu dòng mới được bổ sung.

---

## 🤔 Tại sao cần?
Gõ `git commit` mà không đọc diff trước đó chẳng khác nào ký vào một hợp đồng kinh tế mà không thèm đọc các điều khoản nhỏ. `git diff` giúp bạn soi rõ từng biến đổi: kịp thời xóa bỏ những câu lệnh `console.log` nháp, các đoạn code thử nghiệm thừa thãi, phát hiện lỗi chính tả ngớ ngẩn và ngăn chặn nguy cơ rò rỉ mật khẩu hay token bảo mật trước khi chúng trở thành một phần của lịch sử dự án vĩnh viễn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem `git diff` như chức năng 'Track Changes' (theo dõi sửa đổi) trong Microsoft Word hay tính năng so sánh tài liệu pháp lý. Bên trái là bản gốc trong quá khứ, bên phải là bản hiện tại bạn vừa gõ. Bất kỳ ký tự nào bị gạch đỏ gỡ bỏ hay được tô xanh thêm vào đều hiện hình minh bạch dưới ánh đèn soi của diff.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ SOI KHÁC BIỆT CỦA HAI LỆNH DIFF:

Working Tree ──────── git diff ────────► Staging Area ─── git diff --staged ───► HEAD Commit
 (Đang gõ code)                         (Đã git add)                              (Lịch sử lưu)

ĐỌC HIỂU ĐỊNH DẠNG DIFF CHUẨN:
diff --git a/app.js b/app.js
--- a/app.js                       <── a/ là phiên bản cũ
+++ b/app.js                       <── b/ là phiên bản mới
@@ -1,3 +1,3 @@                    <── Header Hunk: bắt đầu từ dòng 1
 const title = "Project";
-const port = 3000;                <── Dấu trừ (-): dòng cũ bị loại bỏ
+const port = 8080;                <── Dấu cộng (+): dòng mới được thêm vào
 const host = "localhost";
```

---

## 🌎 Ví dụ thực tế
Bạn vừa sửa hàm tính thuế trong `tax.js`. Trước khi commit, bạn chạy `git diff` và giật mình phát hiện ngoài việc sửa tỷ lệ thuế VAT từ 10% thành 8%, bạn còn vô tình gõ nhầm một ký tự lạ ở dòng 45 và quên xóa câu lệnh `debugger;`. Nhờ đọc diff, bạn lập tức dọn sạch mã nguồn trước khi đẩy lên cho cả nhóm.

---

## 💻 Command
```bash
git diff
git diff --staged
git diff HEAD
git diff app.js
```

---

## 🔍 Giải thích command
- `git diff`: So sánh những thay đổi chưa được add (Working Tree vs Staging Area).
- `git diff --staged` (hoặc `--cached`): So sánh những thay đổi đã được add và chuẩn bị commit (Staging Area vs HEAD).
- `git diff HEAD`: So sánh toàn bộ thay đổi cả đã add lẫn chưa add so với commit gần nhất.
- `git diff <tên-tệp>`: Giới hạn phạm vi so sánh chỉ trên một tệp duy nhất để dễ tập trung theo dõi.

---

## ⚠️ Sai lầm phổ biến
1. **Hoang mang khi `git diff` trống trơn sau khi `git add`**: Nghĩ rằng code bị mất tích; thực chất khi code đã vào Staging Area, bạn bắt buộc phải dùng `git diff --staged`.
2. **Nhầm lẫn tiêu đề hunk `@@ -a,b +c,d @@` là code**: Tưởng nhầm dòng siêu dữ liệu định vị dòng của Git là code bị lỗi sinh ra.
3. **Bỏ qua bước đọc diff trước khi commit**: Thói quen cẩu thả dẫn đến việc commit cả mật khẩu bí mật, token cá nhân hoặc code nháp vào repository.

---

## 🧪 Lab
1. Mở tệp `app.js`, chỉnh sửa một dòng bất kỳ và lưu lại file.
2. Chạy lệnh `git diff`; quan sát kỹ dòng cũ bị xóa mang dấu `-` đỏ và dòng mới thêm mang dấu `+` xanh.
3. Chạy `git add app.js`, rồi chạy lại `git diff` (lúc này kết quả trống trơn vì thay đổi đã vào Staging Area).
4. Chạy `git diff --staged` để thấy lại toàn bộ khối thay đổi sẵn sàng được commit.

---

## 💡 Hint
> Nhớ câu khẩu quyết kỹ sư: "Chưa add thì gõ `git diff`, đã add thì gõ `git diff --staged`!"

---

## ✅ Validation
- Nhận diện chính xác dòng bị xóa (`-`) và dòng thêm mới (`+`).
- Phân biệt thành thạo kết quả trả về của `git diff` và `git diff --staged`.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để rèn luyện kỹ năng phân tích và đọc hiểu các định dạng diff trong Git.

---

## 🔥 Challenge
Chỉnh sửa hai dòng tại hai vị trí cách nhau hơn 50 dòng trong cùng một tệp code. Chạy `git diff` và giải thích tại sao Git lại tách kết quả thành hai Hunk riêng biệt thay vì in toàn bộ tệp từ đầu đến cuối?

---

## 📚 Tổng kết
- `git diff` giúp rà soát chi tiết từng dòng code trước khi tạo snapshot vĩnh viễn.
- Dấu `-` đại diện cho phiên bản cũ bị loại bỏ; dấu `+` đại diện cho phiên bản mới được đưa vào.
- Luôn kiểm tra `git diff --staged` như bước tổng duyệt cuối cùng trước khi bấm lệnh commit.
