# git worktree

---

## 🎯 Mục tiêu
- Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.
- Mở một thư mục làm việc khác để xử lý nhánh khác mà không phải chuyển nhánh trong thư mục hiện tại.
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
- **Đừng nhầm**: Mặc định Git từ chối checkout cùng một nhánh trong hai worktree cùng lúc; đừng bỏ qua bảo vệ này nếu chưa hiểu hệ quả.

### Worktree Remove (git worktree remove)
- **Nói dễ hiểu**: Lệnh chuẩn mực để xóa một thư mục worktree và dọn sạch siêu dữ liệu quản lý liên kết trong Git.
- **Ví dụ**: Gõ `git worktree remove ../hotfix-folder` sau khi đã hoàn thành và merge nhánh hotfix.
- **Đừng nhầm**: Tránh dùng lệnh xóa file thủ công của hệ điều hành vì sẽ để lại siêu dữ liệu rác đòi hỏi phải chạy `git worktree prune`.

---

## 📖 Định nghĩa
`git worktree` cho phép một kho Git có nhiều thư mục làm việc gắn với cùng dữ liệu commit. Mỗi worktree có `HEAD` và index riêng; mặc định Git không cho cùng một branch được mở đồng thời ở hai worktree. Simulator chỉ ghi nhận danh sách worktree, không tạo thư mục hay cho sửa từng cây file độc lập.

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
Kỹ sư Cường đang chạy thử tính năng thanh toán ở thư mục `my-app` thì được nhờ review gấp nhánh `review-pr-45`. Trong Git thật, nếu repo đã có commit và nhánh tồn tại, Cường chạy `git worktree add ../pr-test review-pr-45`. Git tạo thư mục làm việc riêng để review; trước khi remove, Cường kiểm tra đã lưu hoặc bỏ các thay đổi cần giữ.

---

## 💻 Command & Cú pháp
```bash
git worktree add <đường-dẫn-thư-mục> <nhánh-đã-có>
git worktree add -b <nhánh-mới> <đường-dẫn-thư-mục>
git worktree list
git worktree remove <đường-dẫn-thư-mục>
```

Trong Git thật, dùng `git worktree prune` để dọn metadata của thư mục worktree đã bị xóa ngoài Git. Lệnh này chưa được mô phỏng trong khóa học.

---

## 🔍 Giải thích command
- `git worktree add <path> <branch>`: Mở worktree cho nhánh đã có.
- `git worktree add -b <new-branch> <path>`: Tạo nhánh mới từ `HEAD` rồi mở worktree ở đường dẫn chỉ định.
- `git worktree list`: Liệt kê danh sách tất cả các thư mục worktree đang hoạt động kèm tên nhánh tương ứng.
- `git worktree remove <path>`: Dọn dẹp và xóa bỏ an toàn một thư mục worktree sau khi sử dụng xong.
- Simulator hiện lưu metadata add/list/remove; để thực sự mở hai thư mục và sửa chúng song song, hãy dùng Git thật trong repo riêng.

---

## ⚠️ Sai lầm phổ biến
1. **Mở hai worktree trên cùng một nhánh**: Mặc định Git từ chối việc này để tránh hai thư mục cùng di chuyển một con trỏ nhánh.
2. **Xóa thư mục bằng lệnh hệ điều hành**: Tự ý xóa thư mục bằng lệnh xóa file ngoài shell sẽ để lại tệp rác trong `.git/worktrees`, cần chạy `git worktree prune` để dọn.
3. **Xóa worktree khi còn thay đổi**: Git thật từ chối remove worktree chưa sạch nếu không có `--force`; kiểm tra hoặc lưu công việc trước khi dọn.

---

## 🧪 Lab thực hành
Trước hết chạy lab trong simulator; lab này kiểm tra danh sách metadata, không mở thư mục thật.
1. Chạy `git worktree list` để xem worktree hiện tại.
2. Chạy `git worktree add -b demo-worktree ../temp-worktree`.
3. Chạy `git worktree list`, xác nhận có nhánh `demo-worktree` và đường dẫn `../temp-worktree`.
4. Chạy `git worktree remove ../temp-worktree`, rồi `git worktree list` để xác nhận mục phụ đã biến mất.
5. Muốn thử thao tác song song thực tế, dùng Git thật trong repo riêng đã có ít nhất một commit. Chạy `git worktree add -b demo-worktree ../temp-worktree`, mở đường dẫn mới ở terminal thứ hai, rồi kiểm tra `git status` riêng ở mỗi thư mục. Dọn worktree phụ khi đã lưu những thay đổi cần giữ.

---

## 💡 Hint & mẹo
> Mặc định mỗi nhánh chỉ được checkout ở một worktree tại một thời điểm; worktree detached là một trường hợp khác.

---

## ✅ Validation & Kết quả mong đợi
- Simulator liệt kê và xóa đúng metadata worktree thử nghiệm.
- Trong Git thật, mỗi worktree có thư mục file riêng nhưng chia sẻ object database của repository; nó không phải clone độc lập.

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
