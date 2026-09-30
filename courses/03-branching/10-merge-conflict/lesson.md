# Xung đột Merge Conflict là gì?

---

## 🎯 Mục tiêu
- Hiểu rõ nguyên nhân căn bản phát sinh xung đột Merge Conflict trong quá trình làm việc nhóm.
- Nhận diện và phân tích cấu trúc của các vạch đánh dấu xung đột (Conflict Markers): `<<<<<<<`, `=======`, `>>>>>>>`.
- Phân biệt rõ ràng giữa xung đột nội dung dòng code (Content conflict) và xung đột tệp tin (File rename/delete conflict).
- Giữ bình tĩnh và thực hiện quy trình chẩn đoán trạng thái conflict một cách bài bản.

---

## 📖 Định nghĩa
> Merge Conflict (Xung đột hợp nhất) là tình huống xảy ra khi thuật toán Three-way merge của Git phát hiện hai nhánh cùng sửa đổi các dòng code giống nhau trong cùng một tệp tin (hoặc một bên sửa nội dung trong khi bên kia xóa tệp tin) kể từ commit tổ tiên chung. Do Git là một hệ thống quản lý phiên bản trung lập không thể tự ý suy đoán ý đồ kinh doanh của lập trình viên, Git sẽ tạm dừng tiến trình merge, bảo vệ mã nguồn nguyên vẹn và chèn các vạch đánh dấu xung đột (Conflict Markers) trực tiếp vào tệp tin để con người tự quyết định.

---

## 🤔 Tại sao cần?
Xung đột mã nguồn là một phần tất yếu và không thể tránh khỏi trong bất kỳ dự án phần mềm chuyên nghiệp nào có nhiều người cùng tham gia đóng góp. Người mới học thường rất sợ hãi và coi conflict là một tai họa hỏng hóc nghiêm trọng. Tuy nhiên, các kỹ sư phần mềm kỳ cựu hiểu rằng conflict thực chất là một cơ chế an toàn tuyệt vời của Git để ngăn chặn việc một người vô tình ghi đè và làm biến mất công sức lập trình của người khác mà không có sự đồng thuận.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai kiến trúc sư cùng chỉnh sửa bản vẽ thiết kế mặt bằng của một căn biệt thự. Kiến trúc sư A quyết định đặt một lò sưởi ấm cúng bằng đá cẩm thạch tại góc phòng khách, trong khi Kiến trúc sư B lại quyết định đặt một bể cá cảnh biển nhiệt đới đúng ngay tại tọa độ góc phòng khách đó. Khi thợ xây (Git) cầm hai bản thiết kế lại gần nhau, thợ xây không thể tự ý quyết định nên xây lò sưởi hay đặt bể cá, nên sẽ gọi cả hai kiến trúc sư ra công trường ngồi lại với nhau để thống nhất giải pháp cuối cùng.

---

## 🖼 Sơ đồ
```text
Cấu trúc các vạch đánh dấu xung đột Conflict Markers:
<<<<<<< HEAD (Nhánh hiện tại bạn đang đứng - ví dụ: main)
const apiUrl = "https://api.production.vn/v1";
=======
const apiUrl = "https://api.staging.vn/v2";
>>>>>>> feature-api (Nhánh bạn đang gộp vào - ví dụ: feature-api)
```

---

## 🌎 Ví dụ thực tế
Trong tệp cấu hình config.js của dự án backend, lập trình viên An sửa cổng máy chủ thành `port = 8080` trên nhánh main, trong khi lập trình viên Bình sửa thành `port = 9000` trên nhánh feature-server phục vụ môi trường kiểm thử. Khi An chạy câu lệnh `git merge feature-server` vào main, Git lập tức phát hiện cả hai người cùng sửa đổi đúng dòng số 12 của tệp config.js. Git dừng tiến trình merge và thông báo rõ ràng: "CONFLICT (content): Merge conflict in config.js. Automatic merge failed; fix conflicts and then commit the result." An bình tĩnh mở tệp ra và thấy Git đã chèn các vạch đánh dấu xung đột để chờ hai lập trình viên thảo luận giải pháp giữ cổng phù hợp.

---

## 💻 Command
```bash
git status
git diff
git merge --abort
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị rõ danh sách các tệp tin đang bị xung đột ở mục "Unmerged paths" bằng màu đỏ rực rỡ.
- `git diff`: So sánh và in ra chi tiết các khối xung đột giữa hai bên ngay trên màn hình dòng lệnh.
- `git merge --abort`: Chiếc phanh khẩn cấp giúp bạn hủy bỏ toàn bộ quá trình merge và quay về trạng thái sạch sẽ trước khi gõ lệnh merge.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng sợ xóa toàn bộ thư mục dự án khi gặp conflict**:  Conflict là chuyện hết sức bình thường, chỉ cần mở tệp ra chọn code giữ lại.
2. **Commit tệp tin khi chưa xóa các vạch đánh dấu `<<<<<<<`, `=======`**:  Sẽ làm vỡ mã nguồn và khiến dự án bị lỗi biên dịch cú pháp nghiêm trọng.
3. **Tự ý xóa code của đồng nghiệp mà không trao đổi**:  Có thể làm hỏng tính năng mà đồng nghiệp đã tốn cả tuần để xây dựng.

---

## 🧪 Lab
1. Tạo xung đột cố ý bằng cách sửa cùng một dòng trong `app.js` trên hai nhánh `main` và `conflict-branch`.
2. Thực hiện `git merge conflict-branch` từ nhánh `main` để kích hoạt xung đột.
3. Chạy `git status` và quan sát mục `Unmerged paths: both modified: app.js`.
4. Mở tệp `app.js` để tận mắt nhìn thấy các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`.

---

## 💡 Hint
> Phần giữa `<<<<<<< HEAD` và `=======` là code của bạn; phần giữa `=======` và `>>>>>>>` là code của nhánh kia.

---

## ✅ Validation
- Nhận diện đúng khối conflict markers trong tệp tin bị xung đột.

---

## ❓ Quiz
Hãy hoàn thành bài trắc nghiệm dưới đây về nguyên nhân và cấu trúc của Merge Conflict.

---

## 🔥 Challenge
Giải thích sự khác nhau giữa Content Conflict và Binary Conflict (ví dụ xung đột trên tệp ảnh PNG).

---

## 📚 Tổng kết
- Merge Conflict xảy ra khi hai nhánh cùng sửa đổi cùng một dòng code kể từ điểm rẽ nhánh.
- Git chèn các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>` để con người tự quyết định.
- Conflict là cơ chế an toàn bảo vệ dữ liệu, không phải là lỗi hỏng hóc của hệ thống Git.
