# Interactive Rebase

---

## 🎯 Mục tiêu
- Hiểu rõ sức mạnh vượt trội của Interactive Rebase (`git rebase -i`) như một công cụ biên tập lịch sử tối thượng.
- Đọc hiểu và sử dụng thành thạo danh sách lệnh Todo của Interactive Rebase: pick, reword, edit, squash, fixup, drop.
- Sắp xếp lại thứ tự xuất hiện của các commit trong chuỗi lịch sử cục bộ.
- Chuẩn bị một chuỗi commit chuyên nghiệp, sắc nét trước khi mở Pull Request.

---

## 🧩 Từ khóa hôm nay

### Interactive Rebase (git rebase -i)
- **Nói dễ hiểu**: Trình biên tập tương tác cho phép sửa, gộp, xóa hoặc đổi thứ tự các commit cũ trong quá khứ.
- **Ví dụ**: Dùng `git rebase -i HEAD~3` để dọn dẹp 3 commit lộn xộn gần nhất trước khi mở Pull Request.
- **Đừng nhầm**: Không dùng rebase tương tác trên nhánh chung đã push lên remote vì nó viết lại lịch sử commit.

### Rebase Todo List
- **Nói dễ hiểu**: Bảng danh sách hành động (pick, squash, reword, drop) mà Git mở ra trong trình soạn thảo để bạn ra lệnh xử lý từng commit.
- **Ví dụ**: Đổi từ `pick` sang `reword` ở một dòng để đổi tên commit message khi Git chạy qua.
- **Đừng nhầm**: Thứ tự commit trong Todo List là từ trên xuống dưới (từ commit cũ nhất đến commit mới nhất), ngược với git log.

### Rebase Actions (pick/reword/drop)
- **Nói dễ hiểu**: Các động từ chỉ thị cho Git biết phải làm gì với từng commit cụ thể trong danh sách biên tập.
- **Ví dụ**: Giữ `pick` để dùng nguyên commit, chọn `drop` (hoặc xóa dòng) để loại bỏ hoàn toàn commit đó khỏi lịch sử.
- **Đừng nhầm**: `reword` chỉ sửa message commit, còn `edit` sẽ dừng tiến trình lại để bạn sửa cả code lẫn commit.

---

## 📖 Định nghĩa
Interactive Rebase (`git rebase -i`) là công cụ biên tập tương tác cho phép xem lại danh sách commit cũ và chọn hành động cụ thể cho từng commit: giữ nguyên, đổi tên, sửa nội dung, gộp lại hoặc xóa bỏ hoàn toàn.

---

## 💡 Tại sao cần
Khi lập trình, chúng ta thường tạo nhiều commit vụn vặt và tạm bợ. Interactive Rebase giúp bạn dọn dẹp, sắp xếp lại chuỗi lịch sử cục bộ cho mạch lạc, sạch sẽ và chuyên nghiệp trước khi gửi Pull Request cho đồng nghiệp review.

---

## 🧠 Mental Model
Hãy tưởng tượng bạn là đạo diễn phim đang ngồi trong phòng dựng phim. Bạn có các đoạn quay nháp, quay hỏng hay trùng lặp. Interactive Rebase chính là chiếc bàn dựng phim giúp bạn cắt bỏ cảnh hỏng, ghép các cảnh rời rạc thành một bộ phim liền mạch hoàn chỉnh.

---

## 📊 Sơ đồ minh họa
```text
Quy trình Interactive Rebase (git rebase -i HEAD~3):
Git mở Todo List trong editor:
pick a1b2c3d feat: add shopping cart UI
pick e4f5a6b fix typo in cart
pick 7c8d9e0 add unit tests for cart

Bạn sửa Todo List:
pick a1b2c3d feat: add shopping cart UI
fixup e4f5a6b fix typo in cart          (Gộp vào commit trên, bỏ message thừa)
pick 7c8d9e0 test: add unit tests for cart (Đổi tên message cho chuẩn)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Tuấn làm tính năng giỏ hàng và có 3 commit vụn: "tạo nút", "sửa css nút", "fix typo". Trước khi mở PR, Tuấn chạy `git rebase -i HEAD~3`, đổi 2 commit sau thành fixup để gộp vào commit đầu. Kết quả là nhánh chỉ còn 1 commit duy nhất chuẩn chỉ và rõ ràng.

---

## 💻 Command & Cú pháp
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
- `git rebase --continue`: Tiếp tục tiến trình sau khi đã hoàn thành một chỉ thị sửa đổi (ví dụ sau khi edit hoặc giải quyết xung đột).
- `git rebase --abort`: Hủy bỏ hoàn toàn phiên biên tập và khôi phục trạng thái nhánh về nguyên vẹn như trước khi rebase.

---

## ⚠️ Sai lầm phổ biến
1. **Xóa dòng trong file Todo List**: Trong interactive rebase, xóa một dòng commit đồng nghĩa với việc Git sẽ loại bỏ hoàn toàn (drop) commit đó khỏi lịch sử.
2. **Rebase trên nhánh chung đã push**: Thay đổi lịch sử của nhánh chung công khai sẽ gây xung đột và rối loạn cho toàn bộ nhóm làm việc.
3. **Hoảng sợ khi editor mở ra**: Bình tĩnh đọc kỹ phần hướng dẫn giải thích ý nghĩa các lệnh ở nửa dưới của tệp todo list do Git tạo ra.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Tạo liên tiếp 3 commit thử nghiệm nhỏ trong kho chứa bài tập cá nhân.
2. Chạy lệnh `git rebase -i HEAD~3` để mở trình soạn thảo Todo List.
3. Đổi từ `pick` ở dòng thứ 2 thành `reword` để đổi tên thông điệp commit.
4. Lưu và đóng file lại, sau đó nhập thông điệp mới theo yêu cầu của Git.
5. Kiểm tra lại `git log --oneline` để chiêm ngưỡng kết quả lịch sử đã được cập nhật.

---

## 💡 Hint & mẹo
> Nếu lỡ tay làm hỏng Todo List trong khi soạn thảo, chỉ cần xóa sạch nội dung file hoặc đóng lại mà không lưu rồi gõ `git rebase --abort` để quay về an toàn.

---

## ✅ Validation & Kết quả mong đợi
- Làm chủ giao diện Todo List của Interactive Rebase và thực hiện thành thạo các chỉ thị biên tập cơ bản.
- Biết cách sử dụng `git rebase --abort` và `git rebase --continue` một cách tự tin.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ Interactive Rebase.

---

## 🚀 Thử thách nâng cao
Nêu sự khác biệt trong thứ tự hiển thị commit giữa `git log` (từ mới nhất đến cũ nhất) và Todo List của `git rebase -i` (từ cũ nhất đến mới nhất theo thứ tự áp dụng).

---

## 📝 Tổng kết
- `git rebase -i` mở ra Todo List cho phép toàn quyền biên tập chuỗi commit cục bộ.
- Cung cấp các lệnh quyền năng: pick, reword, edit, squash, fixup, drop.
- Là bước chuẩn bị quan trọng bậc nhất để xây dựng văn hóa commit chuyên nghiệp trước khi mở PR.
