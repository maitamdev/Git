# Chuyển nhánh bằng `git switch`

---

## 🎯 Mục tiêu
- Thành thạo lệnh hiện đại `git switch <tên-nhánh>` để chuyển đổi mượt mà giữa các nhánh.
- Sử dụng cú pháp thần tốc `git switch -c <tên-nhánh>` để vừa tạo vừa chuyển nhánh trong một nốt nhạc.
- Hiểu sâu cơ chế bảo vệ an toàn dữ liệu của Git khi có thay đổi chưa commit lúc chuyển nhánh.

---

## 🧩 Từ khóa hôm nay

### `git switch` — chuyển nhánh
- **Nói dễ hiểu:** Thao tác di dời con trỏ HEAD và chuyển toàn bộ môi trường làm việc sang một nhánh mục tiêu đã có sẵn.
- **Ví dụ:** Gõ `git switch main` để trở về nhánh chính của dự án.
- **Đừng nhầm:** Lệnh chuyển nhánh chỉ đổi không gian làm việc; nó hoàn toàn không tự động commit code đang sửa dở của bạn.

### `-c` — tạo rồi chuyển
- **Nói dễ hiểu:** Cờ tùy chọn thần tốc (viết tắt của `--create`) giúp bạn vừa khai sinh nhánh mới vừa lập tức nhảy sang đó trong một lệnh duy nhất.
- **Ví dụ:** `git switch -c feature/user-profile` tạo nhánh profile và đưa bạn sang đó ngay lập tức.
- **Đừng nhầm:** Đây là cú pháp hiện đại thay thế cho câu lệnh cổ điển `git checkout -b <tên-nhánh>` ngày trước.

### Thư mục làm việc
- **Nói dễ hiểu:** Toàn bộ các file và thư mục thực tế đang hiện hữu trên ổ đĩa máy tính mà bạn mở bằng trình soạn thảo mã nguồn.
- **Ví dụ:** Khi bạn switch nhánh, Git tự động thay thế, xóa hoặc thêm các file trong thư mục này để khớp với snapshot của nhánh mới.
- **Đừng nhầm:** Nếu bạn có file chưa commit bị xung đột với nhánh đích, Git sẽ chặn việc chuyển nhánh để bảo vệ dữ liệu của bạn.

---

## 📖 Định nghĩa
`git switch` là lệnh hiện đại được Git giới thiệu (từ phiên bản 2.23) chuyên biệt hóa hoàn toàn cho tác vụ chuyển đổi giữa các nhánh. Lệnh này gắn con trỏ HEAD vào nhánh mục tiêu và tự động cập nhật toàn bộ thư mục làm việc (Working Tree) khớp với snapshot mới nhất của nhánh đó, thay thế cho lệnh `git checkout` vốn ôm đồm quá nhiều chức năng gây nhầm lẫn.

---

## 🤔 Tại sao cần?
Trong một ngày làm việc, bạn phải liên tục di chuyển giữa các luồng công việc: đang làm dở tính năng thì có cuộc gọi khẩn cấp yêu cầu quay về nhánh `main` để kiểm tra lỗi nóng. `git switch` giúp bạn dịch chuyển tức thời và an toàn giữa các nhánh. Đặc biệt, Git sở hữu cơ chế bảo vệ thông minh: nếu việc chuyển nhánh có nguy cơ ghi đè làm mất code chưa commit của bạn, Git sẽ lập tức từ chối chuyển để bảo toàn dữ liệu.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng mỗi nhánh là một bộ phim trên các kênh truyền hình khác nhau. Lệnh `git switch` chính là chiếc remote điều khiển TV giúp bạn bấm chuyển kênh. Khi bạn bấm chuyển từ kênh VTV1 (`main`) sang HBO (`feature`), màn hình TV (thư mục làm việc của bạn) lập tức chuyển cảnh chiếu trọn vẹn nội dung của kênh mới.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ ĐIỀU HƯỚNG CỦA GIT SWITCH:

Trước khi chuyển:
  HEAD ──────► [main] ─────────► [Commit C3]
               [feature-user] ──► [Commit C3]

Chạy lệnh: `git switch feature-user`

Sau khi chuyển:
               [main] ─────────► [Commit C3]
  HEAD ──────► [feature-user] ──► [Commit C3]
  (Thư mục làm việc được cập nhật đồng bộ với nhánh feature-user!)
```

---

## 🌎 Ví dụ thực tế
Bạn đang phát triển tính năng lọc sản phẩm trên nhánh `feature/filters`. Nhận được yêu cầu xem lại nhánh `main`, bạn gõ `git switch main`: thư mục mã nguồn lập tức biến đổi về trạng thái ổn định của nhánh chính. Sau khi xem xong, bạn gõ `git switch feature/filters` để trở lại đúng bàn làm việc với tính năng lọc dở dang mà không mất một dòng code nào.

---

## 💻 Command
```bash
git status
git switch <tên-nhánh>
git switch -c <tên-nhánh-mới>
git switch -
```

---

## 🔍 Giải thích command
- `git status`: Thao tác kiểm tra an toàn trước khi chuyển nhánh để biết thư mục làm việc có sạch sẽ hay không.
- `git switch <tên-nhánh>`: Di chuyển HEAD sang một nhánh mục tiêu đã tồn tại sẵn.
- `git switch -c <tên-nhánh>`: Lối tắt siêu tốc tương đương với việc gõ kết hợp `git branch <tên>` rồi `git switch <tên>`.
- `git switch -`: Cú pháp tiện ích nhảy nhanh qua lại giữa hai nhánh gần nhất vừa làm việc.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ `-c` khi muốn tạo nhánh mới**: Gõ `git switch new-feature` khi nhánh chưa tồn tại sẽ bị lỗi "invalid reference: new-feature".
2. **Ép buộc chuyển nhánh khi có conflict dở dang**: Cố tình ép chuyển nhánh mà không stash hoặc commit khiến các thay đổi cục bộ bị mất sạch.
3. **Nhầm lẫn với lệnh git restore**: Dùng nhầm lệnh switch để hoàn tác file; hãy nhớ `switch` chỉ dành riêng cho việc chuyển nhánh!

---

## 🧪 Lab
1. Chạy `git switch -c feature-user` để tạo và bước chân sang nhánh tính năng mới ngay lập tức.
2. Chạy `git status` và xác nhận dòng đầu tiên hiển thị tự hào: `On branch feature-user`.
3. Chạy `git switch main` để lùi lại nhánh chính, kiểm tra lại bằng `git status`.
4. Chạy `git switch feature-user` để trở lại nhánh tính năng làm việc tiếp.

---

## 💡 Hint
> Hãy dùng `git switch -c <tên-nhánh>` như thói quen mặc định mỗi khi bắt đầu một đầu việc mới!

---

## ✅ Validation
- Nhánh `feature-user` xuất hiện trong danh sách khi gõ `git branch`.
- Terminal xác nhận chính xác sự chuyển dịch giữa `feature-user` và `main`.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để nắm vững quy trình chuyển đổi nhánh an toàn và hiệu quả với git switch.

---

## 🔥 Challenge
Hãy thử tạo một file mới trên nhánh `feature-user`, commit nó lại. Sau đó gõ `git switch main` và mở thư mục ra xem file đó có còn xuất hiện không. Tiếp tục gõ `git switch feature-user` và giải thích cơ chế kỳ diệu mà Git đã thực hiện trên ổ cứng của bạn!

---

## 📚 Tổng kết
- `git switch` là lệnh chuẩn mực, an toàn và trực quan để di chuyển giữa các nhánh.
- Cờ `-c` giúp bạn kết hợp việc tạo nhánh và kích hoạt nhánh trong một thao tác duy nhất.
- Luôn giữ thư mục làm việc sạch sẽ (clean working tree) trước khi chuyển đổi qua lại giữa các luồng việc.
