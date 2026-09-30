# Chuyển nhánh với git switch

---

## 🎯 Mục tiêu
- Nắm vững câu lệnh chuyên trách hiện đại `git switch` được giới thiệu từ Git 2.23.
- Sử dụng thành thạo phím tắt vừa tạo vừa chuyển nhánh: `git switch -c <tên-nhánh>`.
- Hiểu cách Git cập nhật Working Directory khi bạn chuyển dịch qua lại giữa các nhánh.
- Xử lý tình huống không chuyển được nhánh do có thay đổi cục bộ chưa commit.

---

## 📖 Định nghĩa
> `git switch` là câu lệnh chuyên trách hiện đại được bổ sung vào bộ công cụ Git từ phiên bản 2.23, với mục tiêu duy nhất và rõ ràng là chuyển đổi không gian làm việc giữa các nhánh khác nhau trong kho lưu trữ. Khi bạn thực hiện lệnh switch, Git sẽ dịch chuyển con trỏ HEAD gắn vào nhánh đích và đồng thời cập nhật toàn bộ các tệp tin trong Working Directory sao cho khớp 100% với snapshot commit đỉnh của nhánh mới đó.

---

## 🤔 Tại sao cần?
Trước khi `git switch` ra đời, cộng đồng lập trình viên phải sử dụng câu lệnh `git checkout` cho quá nhiều mục đích khác nhau: vừa chuyển nhánh, vừa phục hồi tệp tin, vừa tạo nhánh mới, dẫn đến rất nhiều tai nạn mất code đáng tiếc do gõ nhầm cú pháp. Sử dụng `git switch` mang lại sự an toàn và tường minh tuyệt đối: bạn hoàn toàn yên tâm rằng lệnh này chỉ tác động đến con trỏ nhánh mà không bao giờ vô tình ghi đè làm mất các tệp tin bạn đang gõ dở.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc chuyển nhánh giống như thao tác chuyển đổi tài khoản người dùng trên màn hình khóa máy tính, hoặc đổi kênh truyền hình trên chiếc TV thông minh. Khi bạn bấm chuyển từ kênh phim hoạt hình sang kênh thời sự thể thao (git switch), toàn bộ màn hình trước mắt bạn (Working Directory) lập tức biến đổi nội dung tương ứng với kênh mới, trong khi kênh cũ vẫn tiếp tục phát sóng ngầm độc lập ở hậu trường mà không hề bị xáo trộn.

---

## 🖼 Sơ đồ
```text
Cơ chế chuyển nhánh của git switch:
Trước khi switch:
HEAD ──► main (Working Tree đang hiển thị code của main)
         feature-cart

Sau lệnh: git switch feature-cart
         main
HEAD ──► feature-cart (Working Tree tự động cập nhật khớp với feature-cart)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Trang đang làm việc trên nhánh main thì nhận được yêu cầu khẩn cấp từ ban giám đốc phải nhanh chóng xây dựng giao diện giỏ hàng mới cho khách hàng. Trang mở cửa sổ terminal và gõ ngay câu lệnh: `git switch -c feature-cart`. Lệnh này lập tức tạo ra nhánh feature-cart tách từ commit hiện tại của main và chuyển con trỏ HEAD sang nhánh mới này trong chớp mắt. Trang mở trình soạn thảo VS Code và thấy toàn bộ tệp tin đã sẵn sàng để viết code cho tính năng giỏ hàng mà không làm ảnh hưởng tới nhánh main ban đầu. Sau khi hoàn thành xong một số chỉnh sửa, Trang dùng lệnh `git switch -` để quay ngược trở lại nhánh main kiểm tra tiến độ dự án chung.

---

## 💻 Command
```bash
git switch <tên-nhánh>
git switch -c <tên-nhánh-mới>
git switch -
git switch -d <commit-hash>
```

---

## 🔍 Giải thích command
- `git switch <tên-nhánh>`: Chuyển sang một nhánh cục bộ đã tồn tại từ trước.
- `git switch -c <tên-nhánh-mới>`: Tạo mới một nhánh và chuyển sang nhánh đó ngay lập tức (thay thế cho `git checkout -b`).
- `git switch -`: Phím tắt cực kỳ tiện lợi để quay trở lại nhánh bạn vừa đứng trước đó.
- `git switch -d <commit-hash>`: Chuyển tới một commit cụ thể ở chế độ Detached HEAD có chủ đích rõ ràng.

---

## ⚠️ Sai lầm phổ biến
1. **Chuyển nhánh khi có thay đổi chưa commit xung đột với nhánh đích**:  Git sẽ ngăn chặn thao tác để bảo vệ code của bạn; bạn cần commit hoặc stash thay đổi trước.
2. **Vẫn giữ thói quen dùng lệnh cũ dễ gây nhầm lẫn**:  Tiếp tục dùng `git checkout` thay vì cú pháp hiện đại an toàn `git switch`.
3. **Quên dấu -c khi muốn tạo nhánh mới**:  Gõ `git switch new-feature` khi nhánh chưa tồn tại sẽ bị Git báo lỗi không tìm thấy nhánh.

---

## 🧪 Lab
1. Tạo và chuyển sang nhánh mới bằng lệnh `git switch -c feature-user`.
2. Chạy `git status` để xác nhận thông báo `On branch feature-user`.
3. Chuyển quay lại nhánh chính bằng câu lệnh `git switch main`.
4. Sử dụng phím tắt `git switch -` để quay ngược lại nhánh `feature-user`.

---

## 💡 Hint
> Sử dụng `git switch -` để nhảy qua lại giữa hai nhánh gần nhất cực kỳ tiện lợi.

---

## ✅ Validation
- Kiểm tra `git branch` thấy dấu sao định vị đúng nhánh mong muốn.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về câu lệnh chuyển nhánh git switch.

---

## 🔥 Challenge
Mô tả cơ chế bảo vệ của Git khi bạn cố gắng chuyển nhánh trong lúc Working Tree đang có tệp Modified.

---

## 📚 Tổng kết
- `git switch` là lệnh hiện đại chuyên trách chuyển nhánh an toàn từ Git 2.23.
- Cờ `-c` cho phép vừa tạo vừa chuyển sang nhánh mới một cách nhanh chóng.
- Cú pháp `git switch -` giúp nhảy nhanh về nhánh làm việc trước đó.
