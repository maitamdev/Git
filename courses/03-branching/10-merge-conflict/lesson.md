# Merge conflict là gì?

---

## 🎯 Mục tiêu
- Hiểu thấu bản chất của Merge Conflict là cơ chế bảo vệ dữ liệu văn minh của Git, không phải lỗi hỏng kho mã nguồn.
- Đọc vị và giải mã chuẩn xác cấu trúc của các dấu mốc xung đột (Conflict Markers).
- Sử dụng thành thạo `git status` để định vị toàn bộ các tệp tin chưa được giải quyết (Unmerged Paths).

---

## 🧩 Từ khóa hôm nay

### Merge conflict — xung đột khi hợp nhất
- **Nói dễ hiểu:** Sự bất đồng xảy ra khi hai nhánh cùng can thiệp vào cùng một vị trí trong tệp tin mà Git không thể tự phán đoán.
- **Ví dụ:** Nhánh `main` đổi dòng 10 thành `const color = 'red'`, còn nhánh `feature` đổi thành `const color = 'blue'`.
- **Đừng nhầm:** Cùng sửa một tệp không đồng nghĩa với xung đột; nếu hai người sửa ở các hàm hoặc các dòng khác nhau, Git sẽ tự động gộp êm đẹp.

### Conflict markers — dấu đánh dấu vùng xung đột
- **Nói dễ hiểu:** Các dòng ký tự đặc biệt do Git tự động chèn vào tệp tin để bao bọc và đối chiếu hai phiên bản code bất đồng.
- **Ví dụ:** Cụm ký hiệu kinh điển gồm `<<<<<<< HEAD` (nhánh hiện tại), `=======` (vách ngăn) và `>>>>>>> branch-name` (nhánh nguồn).
- **Đừng nhầm:** Đây là các ký hiệu chú thích tạm thời của Git, tuyệt đối không phải là mã nguồn hợp lệ của chương trình.

### Unmerged path — tệp chưa giải quyết
- **Nói dễ hiểu:** Danh sách các tệp tin đang bị kẹt ở trạng thái xung đột dở dang chưa được lập trình viên xử lý xong.
- **Ví dụ:** Trong `git status`, tệp xuất hiện dưới mục cảnh báo đỏ rực: `both modified: config.json`.
- **Đừng nhầm:** Chỉ chỉnh sửa và lưu file bằng phím tắt trong trình soạn thảo là chưa đủ; bạn phải chạy `git add` thì Git mới công nhận tệp đã hết xung đột.

---

## 📖 Định nghĩa
Merge Conflict (xung đột khi hợp nhất) là tình huống Git chủ động dừng tiến trình gộp nhánh khi phát hiện hai nhánh cùng chỉnh sửa một dòng code hoặc cùng một khối nội dung theo những cách trái ngược nhau. Khi không thể suy đoán được ý định chủ quan của con người, Git từ chối tự động ghép mã nguồn nhằm bảo vệ an toàn dữ liệu và yêu cầu lập trình viên trực tiếp can thiệp.

---

## 🤔 Tại sao cần?
Nhiều bạn mới học coi xung đột là tai họa hoặc lỗi phần mềm, nhưng đối với kỹ sư thực chiến, xung đột là cơ chế bảo vệ tối thượng của Git. Nếu Git tự ý chọn bừa một bên hoặc xóa bên kia, hệ thống của bạn sẽ sụp đổ âm thầm mà không ai hay biết. Git dừng lại, cắm các biển báo xung đột rõ ràng để bạn và đồng đội cùng ngồi lại thống nhất giải pháp tối ưu nhất cho sản phẩm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn và đồng đội cùng chỉnh sửa một bức tranh phong cảnh. Đến góc dưới bên phải, bạn vẽ một ngọn hải đăng, còn đồng đội vẽ một cối xay gió. Git nhìn thấy hai nét vẽ đè lên nhau tại cùng một tọa độ canvas. Thay vì tự ý xóa hải đăng hay cối xay gió, Git đặt cọ vẽ xuống, khoanh vùng màu đỏ và hỏi hai họa sĩ: 'Bây giờ chỗ này vẽ gì?'.

---

## 🖼 Sơ đồ
```text
CẤU TRÚC GIẢI PHẪU DẤU MỐC XUNG ĐỘT (CONFLICT MARKERS):

<<<<<<< HEAD
const apiUrl = "https://api.v1.prod.com";  <── Bản của bạn (nhánh hiện tại)
=======
const apiUrl = "https://api.v2.beta.com";  <── Bản của đồng đội (nhánh nguồn)
>>>>>>> feature-conflict

- Vùng từ `<<<<<<< HEAD` đến `=======`: Code của nhánh bạn đang đứng.
- Vùng từ `=======` đến `>>>>>>>`: Code của nhánh đang được gộp vào.
```

---

## 🌎 Ví dụ thực tế
Trong tệp cấu hình `env.js`, nhánh `main` vừa nâng cấp cổng máy chủ lên `PORT = 8080`, trong khi nhánh `feature-api` của bạn lại đổi thành `PORT = 9000`. Khi gộp nhánh, Git không thể biết cổng nào là đúng. Git dừng lại, đánh dấu tệp ở trạng thái conflict và chèn các ký hiệu `<<<<<<<`, `=======`, `>>>>>>>` để bạn quyết định cổng chính thức.

---

## 💻 Command
```bash
git status
git merge feature-conflict
git diff
```

---

## 🔍 Giải thích command
- `git merge <tên-nhánh>`: Khởi động quá trình hợp nhất; nếu có xung đột, terminal sẽ in thông báo đỏ: `Automatic merge failed; fix conflicts and then commit the result`.
- `git status`: Hiển thị rõ ràng danh sách các tệp bị xung đột dưới tiêu đề `Unmerged paths: both modified`.
- `git diff`: Soi nhanh các vùng xung đột ngay trên màn hình terminal mà chưa cần mở file code.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng loạn xóa kho mã nguồn khi thấy conflict**: Tưởng Git bị hỏng; thực chất đây là bước làm việc hoàn toàn bình thường hàng ngày của mọi Senior Developer.
2. **Bấm chọn bừa "Accept Current" hoặc "Accept Incoming"**: Không thèm đọc code mà chọn đại một bên, dẫn tới việc xóa mất tính năng quan trọng của đồng đội.
3. **Để quên ký hiệu `<<<<<<<` hoặc `=======` rồi commit**: Khiến mã nguồn bị lỗi cú pháp nghiêm trọng (syntax error) ngay khi đưa lên môi trường chạy thử.

---

## 🧪 Lab
1. Đang ở `main`, tạo file `conflict.txt` với dòng chữ: `Màu nền: trắng`, rồi add và commit.
2. Chạy `git switch -c feature-conflict`, sửa dòng đó thành: `Màu nền: xanh`, rồi add và commit.
3. Chạy `git switch main`, sửa cùng dòng đó thành: `Màu nền: đỏ`, rồi add và commit.
4. Chạy lệnh: `git merge feature-conflict`. Git lập tức dừng lại và thông báo xung đột.
5. Chạy `git status` và mở file `conflict.txt` ra để quan sát trọn vẹn 3 vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`. (Giữ nguyên tệp để làm tiếp bài sau).

---

## 💡 Hint
> Đoạn code nằm giữa `<<<<<<< HEAD` và `=======` là của bạn; đoạn code nằm giữa `=======` và `>>>>>>>` là của nhánh được gộp vào!

---

## ✅ Validation
- Terminal báo cáo trạng thái `Automatic merge failed; fix conflicts and then commit the result`.
- Lệnh `git status` liệt kê `conflict.txt` trong danh sách `Unmerged paths`.
- Tệp tin chứa đầy đủ các dấu mốc xung đột sẵn sàng cho bước gỡ lỗi.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để rèn luyện kỹ năng nhận diện và phân tích giải phẫu vùng xung đột trong Git.

---

## 🔥 Challenge
Hãy giải thích tại sao hai người cùng sửa vào hai hàm khác nhau trong cùng một tệp dài 500 dòng code thì Git lại có thể tự động gộp mượt mà mà không hề sinh ra xung đột? Git dựa vào cơ chế chia nhỏ nào để làm được điều đó?

---

## 📚 Tổng kết
- Merge Conflict là tính năng bảo vệ an toàn dữ liệu, không phải là lỗi hỏng Git.
- Cấu trúc conflict gồm 3 vạch: `<<<<<<< HEAD`, vách ngăn `=======` và `>>>>>>> branch`.
- Luôn giữ bình tĩnh, mở tệp kiểm tra kỹ lưỡng trước khi đưa ra quyết định hợp nhất.
