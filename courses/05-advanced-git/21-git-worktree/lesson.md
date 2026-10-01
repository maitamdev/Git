# git worktree

---

## 🎯 Mục tiêu
- Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.
- Khắc phục triệt để hạn chế của quy trình truyền thống: không cần phải stash hay commit dở để chuyển nhánh.
- Sử dụng `git worktree add` để mở một không gian làm việc song song chỉ trong vài giây.
- Quản lý danh sách và dọn dẹp an toàn các worktree bằng `git worktree list` và `git worktree remove`.

---

## 🧩 Từ khóa hôm nay

### Git Worktree
- **Nói dễ hiểu**: Tính năng mở đồng thời nhiều thư mục làm việc trên đĩa cứng gắn với các nhánh khác nhau mà dùng chung một kho `.git`.
- **Ví dụ**: Dùng `git worktree add ../hotfix-folder hotfix-branch` để mở nhanh một nhánh hotfix ở thư mục riêng mà không cần stash code dở.
- **Đừng nhầm**: Không phải là tạo clone mới tốn dung lượng; các worktree chia sẻ chung toàn bộ commit history và object trong `.git`.

### Worktree List (git worktree list)
- **Nói dễ hiểu**: Lệnh xem danh sách toàn bộ các thư mục worktree đang hoạt động kèm tên nhánh tương ứng trên máy tính.
- **Ví dụ**: Chạy `git worktree list` để kiểm tra đường dẫn các thư mục phụ trợ trước khi dọn dẹp.
- **Đừng nhầm**: Không được mở hai worktree cùng trỏ vào một nhánh duy nhất tại cùng một thời điểm.

### Worktree Remove (git worktree remove)
- **Nói dễ hiểu**: Lệnh chuẩn mực để xóa một thư mục worktree và dọn sạch siêu dữ liệu quản lý liên kết trong Git.
- **Ví dụ**: Gõ `git worktree remove ../hotfix-folder` sau khi đã hoàn thành và merge nhánh hotfix.
- **Đừng nhầm**: Tránh dùng lệnh xóa file thủ công của hệ điều hành vì sẽ để lại siêu dữ liệu rác đòi hỏi phải chạy `git worktree prune`.

---

## 📖 Định nghĩa
`git worktree` là tính năng cho phép một kho lưu trữ Git duy nhất mở đồng thời nhiều thư mục làm việc độc lập trên ổ đĩa, mỗi thư mục gắn với một nhánh riêng mà không cần clone lại toàn bộ dự án.

---

## 💡 Tại sao cần
Khi đang chạy dev server với nhiều file sửa dở mà cần xử lý gấp một nhánh khác, quy trình cũ bắt bạn phải tắt server, stash và chuyển nhánh. Với `git worktree`, bạn mở thêm một thư mục bên cạnh để làm song song mà không gián đoạn công việc hiện tại.

---

## 🧠 Mental Model
Hãy hình dung bạn là kiến trúc sư trong căn phòng lớn có nhiều chiếc bàn vẽ cạnh nhau. Bàn số 1 bạn đang vẽ mặt tiền tòa nhà (nhánh feature), bàn số 2 bạn mở bản vẽ ống nước (nhánh hotfix). Bạn có thể bước qua lại giữa hai bàn bất cứ lúc nào mà không cần thu dọn bản vẽ.

---

## 📊 Sơ đồ minh họa
```text
Kiến trúc chia sẻ một kho chứa .git của Worktree:
                   ┌──► Thư mục chính: /project (nhánh: main)
Kho chứa gốc:     │
/project/.git ─────┼──► Thư mục phụ 1: /project-hotfix (nhánh: hotfix-login)
(Chung dữ liệu!)   │
                   └──► Thư mục phụ 2: /project-feature (nhánh: feat-ai)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Cường đang chạy thử tính năng thanh toán ở thư mục `my-app` thì được nhờ review gấp nhánh `review-pr-45`. Cường gõ `git worktree add ../pr-test review-pr-45`. Một thư mục mới xuất hiện ngay cạnh. Cường mở cửa sổ editor thứ hai để test, review xong thì xóa thư mục phụ mà không ảnh hưởng tới tiến trình đang chạy.

---

## 💻 Command & Cú pháp
```bash
git worktree add <đường-dẫn-thư-mục> <tên-nhánh>
git worktree add -b <nhánh-mới> <đường-dẫn>
git worktree list
git worktree remove <đường-dẫn-thư-mục>
git worktree prune
```

---

## 🔍 Giải thích command
- `git worktree add <path> <branch>`: Mở một thư mục làm việc mới tại đường dẫn chỉ định liên kết với một nhánh có sẵn.
- `git worktree add -b <new-branch> <path>`: Tạo luôn một nhánh mới và mở worktree tại thư mục chỉ định.
- `git worktree list`: Liệt kê danh sách tất cả các thư mục worktree đang hoạt động kèm tên nhánh tương ứng.
- `git worktree remove <path>`: Dọn dẹp và xóa bỏ an toàn một thư mục worktree sau khi sử dụng xong.
- `git worktree prune`: Dọn dẹp thông tin rác của các worktree đã bị xóa thủ công trên đĩa.

---

## ⚠️ Sai lầm phổ biến
1. **Mở hai worktree trên cùng một nhánh**: Git sẽ ngăn chặn ngay lập tức để tránh làm hỏng lịch sử commit của nhánh đó.
2. **Xóa thư mục bằng lệnh hệ điều hành**: Tự ý xóa thư mục bằng lệnh xóa file ngoài shell sẽ để lại tệp rác trong `.git/worktrees`, cần chạy `git worktree prune` để dọn.
3. **Nhầm lẫn với clone mới**: Worktree dùng chung cơ sở dữ liệu `.git`, tiết kiệm dung lượng ổ cứng gấp nhiều lần so với việc clone lại cả dự án.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Liệt kê danh sách worktree hiện tại bằng `git worktree list`.
2. Tạo một worktree mới cho nhánh `demo-worktree` bằng lệnh `git worktree add ../temp-worktree -b demo-worktree`.
3. Chạy `git worktree list` và quan sát hai đường dẫn thư mục cùng tồn tại trên máy.
4. Dọn dẹp không gian thử nghiệm bằng lệnh `git worktree remove ../temp-worktree`.

---

## 💡 Hint & mẹo
> Mỗi nhánh chỉ được phép gắn với duy nhất một thư mục worktree tại một thời điểm để bảo đảm an toàn dữ liệu.

---

## ✅ Validation & Kết quả mong đợi
- Tạo, quản lý và dọn dẹp thành công các không gian làm việc song song bằng `git worktree`.
- Hiểu rõ lợi thế về hiệu năng và dung lượng đĩa của worktree so với việc clone nhiều lần.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng đa thư mục git worktree.

---

## 🚀 Thử thách nâng cao
So sánh chi tiết về dung lượng ổ đĩa và tốc độ tạo lập giữa việc dùng `git worktree add` và `git clone` lại dự án sang thư mục mới.

---

## 📝 Tổng kết
- `git worktree` cho phép đa nhiệm mở nhiều nhánh cùng lúc ở các thư mục khác nhau.
- Chia sẻ chung kho `.git`, tiết kiệm thời gian clone và dung lượng đĩa cứng.
- Dọn dẹp an toàn bằng `git worktree remove <path>`.
