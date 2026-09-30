# Interactive Rebase

---

## 🎯 Mục tiêu
- Hiểu rõ sức mạnh vượt trội của Interactive Rebase (`git rebase -i`) như một công cụ biên tập lịch sử tối thượng.
- Đọc hiểu và sử dụng thành thạo danh sách lệnh Todo của Interactive Rebase: pick, reword, edit, squash, fixup, drop.
- Sắp xếp lại thứ tự xuất hiện của các commit trong chuỗi lịch sử cục bộ.
- Chuẩn bị một chuỗi commit chuyên nghiệp, sắc nét trước khi mở Pull Request.

---

## 📖 Định nghĩa
> Interactive Rebase (Rebase tương tác, kích hoạt bằng cờ `-i` trong `git rebase -i <commit-base>`) là một trong những tính năng mạnh mẽ và ấn tượng nhất của Git. Khi thực thi, Git sẽ mở một trình soạn thảo văn bản chứa danh sách toàn bộ các commit cần xử lý (gọi là Git Todo List), cho phép lập trình viên toàn quyền chỉ huy số phận của từng commit: đổi tên thông điệp, gộp nhiều commit thành một, chỉnh sửa nội dung bên trong, thay đổi thứ tự thời gian hoặc xóa bỏ hoàn toàn commit thừa.

---

## 🤔 Tại sao cần?
Trong quá trình phát triển tính năng, không ai có thể commit hoàn hảo ngay từ đầu. Bạn thường tạo ra hàng loạt commit vụn vặt như "fix bug", "sửa lỗi chính tả", "thử lại lần nữa", "tạm thời lưu". Việc để nguyên đống commit nham nhở này gửi lên Pull Request thể hiện sự thiếu chuyên nghiệp nghiêm trọng. Interactive Rebase trao cho bạn cây đũa phép của người biên tập viên: bạn gọt giũa, dọn dẹp và đóng gói lại các commit vụn đó thành những khối thay đổi mạch lạc, sáng sủa trước khi trình diện cho đồng nghiệp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn là một đạo diễn phim đang ngồi trong phòng dựng phim với hàng chục cuộn băng quay thô tại phim trường. Có những cảnh quay hỏng (commit rác), có những cảnh quay trùng lặp cần ghép lại (squash/fixup), có những phân cảnh cần đổi tên (reword) hoặc đổi thứ tự trước sau (reorder). Interactive Rebase chính là chiếc bàn dựng phim chuyên nghiệp giúp bạn cắt ghép, biên tập toàn bộ các cảnh quay thô thành một bộ phim điện ảnh bom tấn liền mạch và cuốn hút người xem từ đầu đến cuối.

---

## 🖼 Sơ đồ
```text
Quy trình Interactive Rebase (git rebase -i HEAD~3):
Trình soạn thảo mở ra bảng Todo List:
pick a1b2c3d feat: add shopping cart UI
pick e4f5a6b fix typo in cart
pick 7c8d9e0 add unit tests for cart

Đạo diễn biên tập lại:
pick a1b2c3d feat: add shopping cart UI
fixup e4f5a6b fix typo in cart          (Gộp vào commit trên, bỏ message thừa)
pick 7c8d9e0 test: add unit tests for cart (Đổi pick -> pick nhưng chuẩn hóa)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Tuấn vừa hoàn thành nhánh `feat/payment-gateway` với 4 commit: commit 1 thêm giao diện, commit 2 sửa CSS nút bấm, commit 3 thêm API, commit 4 sửa lỗi logic API. Trước khi mở Pull Request, Tuấn gõ lệnh: `git rebase -i HEAD~4`. Một tệp todo list mở ra trong VS Code. Tuấn giữ nguyên commit 1 và 3 bằng lệnh `pick`, đổi commit 2 và 4 thành `fixup` để gộp vào các commit tương ứng. Tuấn lưu tệp và đóng lại. Git tự động chạy lại lịch sử, biến 4 commit lộn xộn thành đúng 2 commit hoàn chỉnh: một cho giao diện và một cho API. Đồng nghiệp review PR vô cùng hài lòng.

---

## 💻 Command
```bash
git rebase -i HEAD~<số-lượng-commit>
git rebase -i <commit-hash-gốc>
git rebase --continue
git rebase --abort
```

---

## 🔍 Giải thích command
- `git rebase -i HEAD~n`: Mở trình tương tác để biên tập lại n commit gần đây nhất tính từ đỉnh HEAD.
- `git rebase -i <hash>`: Biên tập lại toàn bộ các commit nằm giữa hash chỉ định và HEAD.
- `git rebase --continue`: Tiếp tục tiến trình sau khi đã hoàn thành một chỉ thị sửa đổi (ví dụ sau khi edit).
- `git rebase --abort`: Hủy bỏ hoàn toàn phiên biên tập và khôi phục trạng thái ban đầu.

---

## ⚠️ Sai lầm phổ biến
1. **Xóa dòng trong file Todo List**:  Trong interactive rebase, xóa một dòng commit đồng nghĩa với việc Git sẽ XÓA BỎ VĨNH VIỄN (drop) commit đó.
2. **Sử dụng interactive rebase trên nhánh chung đã push lên GitHub.**: Sử dụng interactive rebase trên nhánh chung đã push lên GitHub.
3. **Hoảng sợ khi editor mở ra**:  Bình tĩnh đọc kỹ phần hướng dẫn (comments) ở nửa dưới của tệp todo list.

---

## 🧪 Lab
1. Tạo liên tiếp 3 commit thử nghiệm nhỏ trong kho chứa bài tập.
2. Chạy lệnh `git rebase -i HEAD~3` để mở trình soạn thảo Todo List.
3. Đổi từ `pick` ở dòng thứ 2 thành `reword` để đổi tên thông điệp.
4. Lưu và đóng file lại, sau đó nhập thông điệp mới theo yêu cầu của Git.
5. Kiểm tra lại `git log --oneline` để chiêm ngưỡng kết quả.

---

## 💡 Hint
> Nếu lỡ tay làm hỏng Todo List trong khi soạn thảo, chỉ cần xóa sạch nội dung file hoặc đóng lại mà không lưu rồi gõ `git rebase --abort`.

---

## ✅ Validation
- Làm chủ giao diện Todo List của Interactive Rebase và thực hiện thành thạo các chỉ thị biên tập cơ bản.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ Interactive Rebase.

---

## 🔥 Challenge
Nêu sự khác biệt trong thứ tự hiển thị commit giữa `git log` (từ mới đến cũ) và Todo List của `git rebase -i` (từ cũ đến mới).

---

## 📚 Tổng kết
- `git rebase -i` mở ra Todo List cho phép toàn quyền biên tập chuỗi commit cục bộ.
- Cung cấp các lệnh quyền năng: pick, reword, edit, squash, fixup, drop.
- Là bước chuẩn bị quan trọng bậc nhất để xây dựng văn hóa commit chuyên nghiệp trước khi mở PR.
