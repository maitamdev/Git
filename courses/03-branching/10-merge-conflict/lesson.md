# Xung đột Merge Conflict là gì?

---

## 🎯 Mục tiêu
- Hiểu rõ nguyên nhân phát sinh xung đột hợp nhất (Merge Conflict) khi làm việc nhóm.
- Đọc hiểu cấu trúc các vạch đánh dấu xung đột (Conflict Markers): `<<<<<<<`, `=======`, `>>>>>>>`.
- Sử dụng `git status` để xác định danh sách các tệp bị xung đột và giữ bình tĩnh khi xử lý.

---

## 🧩 Từ khóa hôm nay

### Merge Conflict — xung đột hợp nhất
- **Nói dễ hiểu:** Tình huống hai nhánh cùng sửa đổi tại cùng một dòng code trong cùng một tệp tin.
- **Ví dụ:** Bạn sửa tiêu đề trang web ở dòng 10 thành "Trang chủ", bạn khác lại sửa dòng 10 thành "Home".
- **Đừng nhầm:** Xung đột không phải lỗi hỏng phần mềm; đây là cơ chế bảo vệ để Git không tự ý xóa code của ai.

### Conflict Markers — vạch đánh dấu xung đột
- **Nói dễ hiểu:** Các dòng ký hiệu `<<<<<<<`, `=======`, `>>>>>>>` do Git chèn vào để bao quanh đoạn code tranh chấp.
- **Ví dụ:** Đoạn nằm trên `=======` là code nhánh bạn đang đứng; đoạn nằm dưới là code của nhánh đang gộp vào.
- **Đừng nhầm:** Bạn bắt buộc phải xóa sạch các dòng ký hiệu này trước khi commit, nếu không chương trình sẽ bị lỗi cú pháp.

### Unmerged paths — danh sách tệp chờ xử lý
- **Nói dễ hiểu:** Mục thông báo trong `git status` liệt kê những tệp đang bị xung đột cần bạn mở ra chọn lại nội dung.
- **Ví dụ:** Dòng chữ đỏ `both modified: app.js` cho biết tệp `app.js` đang có xung đột cần được giải quyết.
- **Đừng nhầm:** Git sẽ dừng tiến trình merge và chờ bạn sửa xong toàn bộ các tệp trong danh sách này.

---

## 📖 Định nghĩa
Merge Conflict (xung đột hợp nhất) xảy ra khi hai nhánh cùng sửa đổi cùng một dòng code trong cùng một tệp kể từ commit tổ tiên chung. Vì không thể tự đoán bạn muốn giữ phiên bản nào, Git sẽ tạm dừng tiến trình gộp, giữ nguyên cả hai đoạn code kèm vạch đánh dấu để bạn tự đưa ra quyết định.

---

## 🤔 Tại sao cần?
Khi làm việc nhóm, việc hai người vô tình sửa cùng một dòng là điều bình thường. Thay vì để người gộp sau đè mất code của người gộp trước, Git phát hiện và báo xung đột. Đây là chốt chặn an toàn bảo vệ công sức lập trình của mọi thành viên trong nhóm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai kiến trúc sư cùng vẽ vào một góc phòng khách trên bản thiết kế nhà. Một người muốn đặt lò sưởi, người kia muốn đặt bể cá. Thợ xây (Git) không thể tự ý chọn lò sưởi hay bể cá, nên sẽ đánh dấu khoanh vùng vị trí đó lại và gọi cả hai người đến để cùng thống nhất xem nên giữ cái nào.

---

## 🖼 Sơ đồ
```text
Cấu trúc vạch đánh dấu xung đột trong tệp:
<<<<<<< HEAD (Nhánh bạn đang đứng - ví dụ: main)
const apiUrl = "https://api.production.vn/v1";
=======
const apiUrl = "https://api.staging.vn/v2";
>>>>>>> feature-api (Nhánh bạn đang muốn gộp vào)
```

---

## 🌎 Ví dụ thực tế
Trong tệp `config.js`, bạn An sửa cổng chạy ứng dụng thành `port = 8080` trên nhánh `main`, còn bạn Bình sửa thành `port = 9000` trên nhánh `feature-api`. Khi An chạy lệnh gộp nhánh `feature-api` vào `main`, Git thấy cùng dòng đó có hai giá trị khác nhau. Git dừng lại, báo conflict và chèn các vạch đánh dấu vào `config.js` để An và Bình trao đổi chọn cổng thích hợp.

---

## 💻 Command
```bash
git status
git diff
git merge --abort
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị danh sách các tệp đang bị xung đột ở mục `Unmerged paths`.
- `git diff`: So sánh và in ra các khối xung đột trực tiếp trên cửa sổ dòng lệnh.
- `git merge --abort`: Hủy bỏ quá trình gộp nhánh và đưa dự án quay trở lại trạng thái sạch sẽ trước khi chạy lệnh merge.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng loạn xóa thư mục khi gặp xung đột:** Xung đột là chuyện thường ngày trong lập trình nhóm, chỉ cần mở tệp ra xem xét và chỉnh sửa.
2. **Commit khi chưa xóa các vạch `<<<<<<<` và `=======`:** Sẽ làm hỏng cú pháp chương trình và gây lỗi khi chạy code.
3. **Tự ý xóa code của bạn cùng nhóm mà không trao đổi:** Cần thảo luận để biết giải pháp nào là tối ưu cho cả hai bên.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Nhận thông báo xung đột sau khi thực hiện lệnh gộp nhánh.
2. Chạy `git status` và quan sát mục `Unmerged paths: both modified: app.js`.
3. Mở tệp `app.js` trong trình soạn thảo để nhận diện các vạch `<<<<<<<`, `=======`, `>>>>>>>`.
4. Quan sát hai đoạn code khác nhau ở hai nhánh trước khi quyết định cách sửa.

---

## 💡 Hint
Phần giữa `<<<<<<< HEAD` và `=======` là code hiện tại của bạn; phần giữa `=======` và `>>>>>>>` là code của nhánh được gộp.

---

## ✅ Validation
- Nhận diện đúng tệp tin xung đột qua lệnh `git status`.
- Chỉ ra được đoạn code của nhánh hiện tại và nhánh nguồn trong tệp có vạch đánh dấu.

---

## ❓ Quiz
Trả lời các câu hỏi sau để nắm vững nguyên nhân và cấu trúc của Merge Conflict trong Git.

---

## 🔥 Challenge
Chạy thử lệnh `git merge --abort` để tự mình chứng kiến Git dọn dẹp sạch sẽ trạng thái xung đột và đưa bạn trở về ban đầu như thế nào.

---

## 📚 Tổng kết
- Merge Conflict xuất hiện khi hai nhánh sửa cùng vị trí dòng code kể từ mốc rẽ nhánh.
- Git chèn các vạch `<<<<<<<`, `=======`, `>>>>>>>` để con người tự chọn lựa nội dung.
- Conflict là tính năng an toàn bảo vệ dữ liệu, không phải sự cố hỏng hóc của Git.
