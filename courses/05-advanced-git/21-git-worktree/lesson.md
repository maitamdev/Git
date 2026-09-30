# git worktree

---

## 🎯 Mục tiêu
- Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.
- Khắc phục triệt để hạn chế của quy trình truyền thống: không cần phải stash hay commit dở để chuyển nhánh.
- Sử dụng `git worktree add` để mở một không gian làm việc song song chỉ trong vài giây.
- Quản lý danh sách và dọn dẹp an toàn các worktree bằng `git worktree list` và `git worktree remove`.

---

## 📖 Định nghĩa
> `git worktree` là tính năng quản lý đa thư mục làm việc mạnh mẽ trong Git, cho phép một kho lưu trữ duy nhất (cùng chia sẻ chung một thư mục `.git`) có thể liên kết và mở đồng thời nhiều thư mục làm việc (Working Trees) độc lập tại các đường dẫn khác nhau trên ổ đĩa. Mỗi thư mục worktree được gắn với một nhánh riêng biệt, cho phép bạn mở nhiều cửa sổ lập trình song song mà không cần clone lại dự án.

---

## 🤔 Tại sao cần?
Quy trình làm việc truyền thống rất bất tiện: bạn đang chạy dev server trên nhánh A với hàng trăm file đang sửa dở, có việc gấp cần sang nhánh B bạn phải tắt server, gõ `git stash`, chuyển nhánh, cài lại dependencies. Với `git worktree`, bạn chỉ cần mở thêm một thư mục bên cạnh: nhánh B chạy độc lập ở thư mục B, nhánh A vẫn chạy ở thư mục A với dev server đang chạy mượt mà. Không cần stash, không sợ mất code, tăng năng suất làm việc lên gấp bội.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn là một kiến trúc sư đang thiết kế một tòa nhà. Thay vì chỉ có một chiếc bàn vẽ duy nhất mà mỗi lần đổi bản vẽ bạn phải cuộn bản vẽ cũ cất đi rồi trải bản vẽ mới ra bàn, bạn sở hữu một căn phòng rộng thênh thang với nhiều chiếc bàn vẽ đặt cạnh nhau (`git worktree`). Bàn số 1 bạn đang vẽ mặt tiền tòa nhà (nhánh feature), bàn số 2 bạn đang mở bản vẽ hệ thống cấp thoát nước (nhánh hotfix). Bạn có thể bước qua bước lại giữa hai chiếc bàn bất cứ lúc nào.

---

## 🖼 Sơ đồ
```text
Kiến trúc chia sẻ một kho chứa .git của Worktree:
                   ┌──► Thư mục chính: /project (nhánh: main)
Kho chứa gốc:     │
/project/.git ─────┼──► Thư mục phụ 1: /project-hotfix (nhánh: hotfix-login)
(Chung dữ liệu!)   │
                   └──► Thư mục phụ 2: /project-feature (nhánh: feat-ai)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Cường đang lập trình tính năng thanh toán trên nhánh `feat/checkout` ở thư mục `my-app`. Ứng dụng đang biên dịch dở dang thì đồng nghiệp nhờ Cường review gấp nhánh `review-pr-45`. Thay vì stash làm gián đoạn tiến trình biên dịch, Cường gõ câu lệnh: `git worktree add ../my-app-pr review-pr-45`. Ngay lập tức, thư mục `my-app-pr` xuất hiện bên cạnh với đầy đủ mã nguồn của nhánh đó. Cường mở cửa sổ VS Code thứ hai tại thư mục mới, chạy thử và review xong cho bạn, rồi xóa thư mục đó bằng `git worktree remove ../my-app-pr`. Không gian làm việc chính của Cường hoàn toàn không bị ảnh hưởng.

---

## 💻 Command
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
1. **Cố gắng mở hai worktree trên cùng một nhánh**:  Git sẽ chặn lại ngay lập tức để ngăn ngừa xung đột dữ liệu.
2. **Tự ý dùng lệnh xóa thư mục của hệ điều hành (rmdir / rm -rf) thay vì dùng `git worktree remove`**:  Dẫn đến dữ liệu quản trị trong `.git/worktrees` bị thừa thãi (cần chạy `git worktree prune` để dọn).
3. **Nhầm lẫn giữa worktree và clone mới**:  Worktree dùng chung cơ sở dữ liệu `.git`, tiết kiệm dung lượng ổ cứng gấp nhiều lần.

---

## 🧪 Lab
1. Liệt kê danh sách worktree hiện tại bằng `git worktree list`.
2. Tạo một worktree mới cho nhánh `demo-worktree` bằng lệnh `git worktree add ../temp-worktree -b demo-worktree`.
3. Chạy `git worktree list` và quan sát hai đường dẫn thư mục cùng tồn tại.
4. Dọn dẹp bằng lệnh `git worktree remove ../temp-worktree`.

---

## 💡 Hint
> Mỗi nhánh chỉ được phép gắn với duy nhất một thư mục worktree tại một thời điểm.

---

## ✅ Validation
- Tạo, quản lý và dọn dẹp thành công các không gian làm việc song song bằng git worktree.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng đa thư mục git worktree.

---

## 🔥 Challenge
So sánh chi tiết về dung lượng ổ đĩa và tốc độ tạo lập giữa việc dùng `git worktree add` và `git clone` lại dự án sang thư mục mới.

---

## 📚 Tổng kết
- `git worktree` cho phép mở nhiều thư mục làm việc đồng thời trên nhiều nhánh khác nhau.
- Dùng chung một cơ sở dữ liệu `.git`, cực kỳ nhẹ và không tốn dung lượng ổ đĩa.
- Giải quyết dứt điểm nhu cầu chuyển nhánh khẩn cấp mà không cần stash hay ngắt dev server.
