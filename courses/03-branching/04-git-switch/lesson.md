# Chuyển nhánh với git switch

---

## 🎯 Mục tiêu
- Nắm vững câu lệnh chuyên trách `git switch` để di chuyển giữa các nhánh an toàn.
- Sử dụng thành thạo phím tắt vừa tạo vừa chuyển nhánh: `git switch -c <tên-nhánh>`.
- Hiểu cách Git tự động cập nhật thư mục làm việc khi bạn chuyển đổi giữa các nhánh.

---

## 🧩 Từ khóa hôm nay

### git switch — chuyển nhánh hiện đại
- **Nói dễ hiểu:** Câu lệnh chuyên trách để chuyển đổi không gian làm việc sang một nhánh khác.
- **Ví dụ:** Chạy `git switch main` để đưa toàn bộ dự án quay trở lại nhánh chính.
- **Đừng nhầm:** `git switch` chỉ đổi nhánh; việc khôi phục nội dung tệp đã được tách sang lệnh `git restore`.

### git switch -c — vừa tạo vừa chuyển nhánh
- **Nói dễ hiểu:** Phím tắt tạo một nhánh mới và lập tức chuyển bạn sang nhánh đó trong một bước.
- **Ví dụ:** Chạy `git switch -c feature-search` để bắt đầu làm tính năng tìm kiếm mới.
- **Đừng nhầm:** Bạn không cần gõ `git branch` rồi mới `git switch`; cờ `-c` kết hợp cả hai thao tác.

### git switch - — quay lại nhánh trước
- **Nói dễ hiểu:** Lệnh đưa bạn quay trở về nhánh mà bạn vừa đứng ngay trước đó.
- **Ví dụ:** Đang ở `feature-login`, bạn chuyển sang `main` xem code, rồi gõ `git switch -` để quay lại `feature-login`.
- **Đừng nhầm:** Dấu gạch ngang `-` chỉ nhớ một nhánh gần nhất bạn vừa rời đi.

---

## 📖 Định nghĩa
`git switch` là lệnh chuyên trách từ phiên bản Git 2.23 dùng để chuyển đổi giữa các nhánh. Khi bạn chuyển nhánh, Git sẽ gắn con trỏ HEAD vào nhánh đích và cập nhật các tệp trong thư mục làm việc khớp với commit mới nhất của nhánh đó.

---

## 🤔 Tại sao cần?
Trước đây, lệnh cũ `git checkout` vừa dùng để chuyển nhánh vừa dùng để phục hồi tệp tin, khiến người mới học rất dễ gõ nhầm và làm mất các thay đổi đang viết dở. `git switch` ra đời với mục đích duy nhất là chuyển nhánh, giúp thao tác an toàn và rõ ràng hơn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung chuyển nhánh giống như đổi kênh trên tivi. Mỗi nhánh là một kênh truyền hình. Khi bạn chuyển kênh (`git switch`), toàn bộ màn hình trước mắt lập tức hiển thị nội dung của kênh mới, trong khi kênh cũ vẫn được lưu trữ nguyên vẹn ở phía sau mà không hề bị xáo trộn.

---

## 🖼 Sơ đồ
```text
Trước khi switch:
HEAD ───> main (Thư mục làm việc đang hiển thị code của main)
          feature-cart

Sau lệnh: git switch feature-cart
          main
HEAD ───> feature-cart (Thư mục làm việc tự cập nhật khớp với feature-cart)
```

---

## 🌎 Ví dụ thực tế
Bạn Trang đang ở nhánh `main` thì được giao làm giao diện giỏ hàng mới. Trang mở terminal và gõ: `git switch -c feature-cart`. Lệnh này tạo nhánh `feature-cart` và đưa Trang sang nhánh mới ngay lập tức. Sau khi viết xong vài hàm, Trang gõ `git switch main` để xem lại mã nguồn chính, rồi gõ `git switch -` để quay lại tiếp tục công việc giỏ hàng.

---

## 💻 Command
```bash
git switch <tên-nhánh>
git switch -c <tên-nhánh-mới>
git switch -
```

---

## 🔍 Giải thích command
- `git switch <tên-nhánh>`: Chuyển sang một nhánh đã tồn tại trong dự án.
- `git switch -c <tên-nhánh-mới>`: Tạo mới một nhánh và chuyển sang nhánh đó ngay lập tức.
- `git switch -`: Phím tắt quay lại nhánh bạn vừa đứng trước đó.

---

## ⚠️ Sai lầm phổ biến
1. **Chuyển nhánh khi có tệp đang sửa xung đột với nhánh đích:** Git sẽ dừng lại và báo lỗi để bảo vệ code của bạn không bị ghi đè.
2. **Quên dấu cờ `-c` khi muốn tạo nhánh mới:** Nếu gõ `git switch new-branch` khi nhánh chưa tồn tại, Git sẽ báo không tìm thấy nhánh.
3. **Vẫn dùng lệnh cũ `git checkout`:** Dù vẫn chạy được, nhưng dùng `git switch` sẽ an toàn hơn và tránh nhầm lẫn với thao tác tệp.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Tạo và chuyển sang nhánh mới bằng lệnh `git switch -c feature-user`.
2. Chạy `git status` để xác nhận dòng thông báo `On branch feature-user`.
3. Chuyển quay lại nhánh chính bằng lệnh `git switch main`.
4. Dùng phím tắt `git switch -` để quay trở lại nhánh `feature-user`.

---

## 💡 Hint
Hãy dùng `git switch -` bất cứ khi nào bạn cần qua lại nhanh giữa hai nhánh mà không cần gõ lại tên nhánh dài dòng.

---

## ✅ Validation
- Nhánh `feature-user` được tạo thành công.
- Lệnh `git switch main` đưa HEAD về nhánh `main`.
- Lệnh `git switch -` đưa HEAD quay lại đúng nhánh `feature-user`.

---

## ❓ Quiz
Trả lời các câu hỏi sau để kiểm tra mức độ thành thạo về lệnh chuyển nhánh `git switch`.

---

## 🔥 Challenge
Hãy thử tạo một tệp mới trên nhánh `feature-user`, commit lại, rồi switch về `main` để quan sát xem tệp đó có biến mất khỏi thư mục làm việc hay không.

---

## 📚 Tổng kết
- `git switch` là lệnh hiện đại chuyên trách chuyển nhánh an toàn trong Git.
- Cờ `-c` cho phép vừa tạo vừa chuyển sang nhánh mới trong một thao tác.
- Dùng `git switch -` để nhảy nhanh về nhánh bạn vừa làm việc trước đó.
