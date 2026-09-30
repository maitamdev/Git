# So sánh khác biệt với git diff

---

## 🎯 Mục tiêu
- Đọc hiểu cú pháp hiển thị khác biệt theo từng dòng code của `git diff`.
- Phân biệt rõ ràng giữa so sánh Working Tree (`git diff`) và so sánh Staging Area (`git diff --staged`).
- So sánh sự khác biệt giữa hai commit hoặc hai nhánh bất kỳ.

---

## 📖 Định nghĩa
> `git diff` là câu lệnh chuyên dụng để tính toán và hiển thị trực quan sự khác biệt chi tiết theo từng dòng code giữa các vùng làm việc của Git. Định dạng hiển thị của diff tuân theo chuẩn Unified Diff: các dòng bị xóa bắt đầu bằng dấu trừ màu đỏ (`-`), các dòng được thêm mới bắt đầu bằng dấu cộng màu xanh lá (`+`), và các dòng giữ nguyên không đổi xung quanh đóng vai trò ngữ cảnh định vị vị trí sửa đổi trong tệp.

---

## 🤔 Tại sao cần?
Trước khi đưa code vào Staging Area hoặc tạo commit, việc rà soát kỹ lưỡng từng dòng code bạn vừa thay đổi là thói quen sống còn để loại bỏ các lỗi sơ đẳng như in log rác, biến thử nghiệm chưa xóa, hoặc vô tình sửa nhầm dòng code của tính năng khác. `git diff` chính là chiếc gương soi giúp bạn tự kiểm duyệt (Self-review) chất lượng sản phẩm của chính mình trước khi công khai nó cho đồng nghiệp xem.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng git diff giống như tính năng So sánh văn bản (Track Changes) trong Microsoft Word hoặc tính năng so màu ảnh cũ và ảnh mới của một bức danh họa sau khi hoàn tất công đoạn trùng tu tỉ mỉ. Hai bức tranh được xếp chồng lên nhau dưới ánh sáng laser đặc biệt: những nét vẽ cũ đã bị cạo đi hoặc thay thế sẽ phát sáng màu đỏ rực rỡ, còn những nét vẽ mới vừa được người phục chế thêm vào sẽ phát sáng màu xanh lá cây tươi sáng. Nhờ đó, người thẩm định có thể nhìn thấy từng nét cọ sai lệch mà không bỏ sót bất kỳ chi tiết nhỏ nào.

---

## 🖼 Sơ đồ
```text
Cấu trúc hiển thị Unified Diff:
diff --git a/app.js b/app.js
--- a/app.js  (Phiên bản cũ trước khi sửa)
+++ b/app.js  (Phiên bản mới đang sửa)
@@ -1,3 +1,4 @@
 function calculateTotal(price) {
-    return price * 0.1;       <── Dòng cũ bị xóa bỏ (màu đỏ)
+    const tax = 0.08;         <── Dòng mới được thêm vào (màu xanh lá)
+    return price * (1 + tax); <── Dòng mới được thêm vào (màu xanh lá)
 }
```

---

## 🌎 Ví dụ thực tế
Kỹ sư đang sửa lỗi tính sai thuế giá trị gia tăng trong tệp thanh toán invoice.js của cổng thanh toán trực tuyến. Sau khi gõ code xong trong trình soạn thảo VS Code, kỹ sư mở cửa sổ dòng lệnh terminal và gõ ngay lệnh `git diff` để tự kiểm tra lại. Màn hình hiển thị rõ ràng dòng tính thuế cũ mười phần trăm bị gạch đỏ có dấu trừ ở đầu, và dòng tính thuế mới tám phần trăm có dấu cộng màu xanh lá. Sau khi đối chiếu cẩn thận và chắc chắn không có bất kỳ dòng log thử nghiệm nào bị bỏ quên, kỹ sư mới an tâm thực hiện lệnh `git add invoice.js` để đóng gói commit an toàn.

---

## 💻 Command
```bash
git diff
git diff --staged
git diff HEAD
git diff <commit1> <commit2>
```

---

## 🔍 Giải thích command
- `git diff`: So sánh sự khác biệt giữa Working Directory và Staging Area (những thay đổi chưa được add).
- `git diff --staged` (hoặc `--cached`): So sánh sự khác biệt giữa Staging Area và commit gần nhất tại HEAD (những thay đổi chuẩn bị commit).
- `git diff HEAD`: So sánh toàn bộ thay đổi trong thư mục làm việc so với commit gần nhất tại HEAD.
- `git diff <commit1> <commit2>`: So sánh sự khác biệt tổng thể giữa hai mốc commit bất kỳ trong lịch sử.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy git diff sau khi đã git add và tưởng code bị mất**:  Khi đã add vào Staging Area, bạn phải dùng `git diff --staged` mới xem được khác biệt.
2. **Sợ hãi các ký hiệu @@ trong kết quả diff**:  Không hiểu rằng `@@ -a,b +c,d @@` chỉ là tọa độ số dòng code trong tệp tin.
3. **Không đọc diff trước khi commit**:  Thói quen xấu dẫn đến việc commit cả mật khẩu hoặc các câu lệnh console.log thử nghiệm.

---

## 🧪 Lab
1. Chỉnh sửa một dòng code trong tệp `app.js` và lưu lại.
2. Chạy lệnh `git diff` để quan sát dòng code cũ màu đỏ và dòng code mới màu xanh.
3. Chạy `git add app.js`, sau đó chạy lại `git diff` (kết quả sẽ rỗng).
4. Chạy `git diff --staged` để thấy lại các dòng thay đổi đang nằm trong vùng chuẩn bị.

---

## 💡 Hint
> Nhớ quy tắc: `git diff` xem tệp chưa add; `git diff --staged` xem tệp đã add.

---

## ✅ Validation
- Đọc hiểu chính xác các dòng cộng trừ trong kết quả hiển thị của git diff.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm sau về cách sử dụng câu lệnh so sánh git diff.

---

## 🔥 Challenge
Giải thích ý nghĩa của dòng tọa độ hunk header `@@ -15,7 +15,9 @@` trong kết quả diff.

---

## 📚 Tổng kết
- `git diff` so sánh Working Directory với Staging Area (code chưa staged).
- `git diff --staged` so sánh Staging Area với HEAD (code chuẩn bị commit).
- Dấu trừ màu đỏ thể hiện dòng bị xóa; dấu cộng màu xanh thể hiện dòng được thêm mới.
