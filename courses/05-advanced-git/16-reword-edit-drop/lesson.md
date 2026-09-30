# Reword / Edit / Drop Commit

---

## 🎯 Mục tiêu
- Làm chủ 3 chỉ thị quyền năng còn lại của Interactive Rebase: `reword` (sửa thông điệp), `edit` (sửa nội dung) và `drop` (xóa commit).
- Sử dụng `reword` (hoặc `r`) để chuẩn hóa các commit message cũ sâu trong quá khứ.
- Sử dụng `edit` (hoặc `e`) để tạm dừng tiến trình rebase, bổ sung thêm file hoặc chia nhỏ commit đó.
- Sử dụng `drop` (hoặc `d`) để loại bỏ hoàn toàn các commit thử nghiệm không còn giá trị.

---

## 📖 Định nghĩa
> `reword`, `edit` và `drop` là bộ ba công cụ can thiệp chuyên sâu vào từng lát cắt lịch sử trong Interactive Rebase của Git. Chỉ thị `reword` (hoặc `r`) cho phép sửa đổi thông điệp của một commit bất kỳ trong quá khứ mà giữ nguyên mã nguồn. Chỉ thị `edit` (hoặc `e`) tạm dừng cỗ máy thời gian ngay tại thời điểm commit đó được sinh ra để bạn tự do sửa đổi tệp tin hoặc chia nhỏ commit. Còn chỉ thị `drop` (hoặc `d`) xóa bỏ vĩnh viễn commit đó khỏi chuỗi lịch sử.

---

## 🤔 Tại sao cần?
Trong thực tế, bạn không chỉ muốn gộp commit mà còn cần gọt giũa chi tiết: một commit cách đây 5 bước bị viết sai mã vé Jira, một commit khác lỡ tay thêm tệp log nặng hàng chục megabyte cần phải xóa bỏ, hay một commit làm quá nhiều việc cần được dừng lại để bóc tách thành hai. Bộ ba reword, edit và drop trao cho bạn khả năng kiểm soát phẫu thuật chính xác đến từng nguyên tử đối với bất kỳ điểm nào trong dòng thời gian Git.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn sở hữu cỗ máy thời gian quay về quá khứ của một cuốn phim tài liệu. Lệnh `reword` giống như việc bạn chỉ cần thu âm lại lời bình của thuyết minh viên cho một đoạn phim mà không đổi cảnh quay. Lệnh `edit` giống như việc bạn bước hẳn vào trường quay của ngày hôm đó, bảo các diễn viên dừng hình, bạn thêm một đạo cụ vào tay diễn viên rồi mới cho máy quay chạy tiếp (`git rebase --continue`). Còn lệnh `drop` giống như việc bạn dùng kéo cắt đứt đoạn phim đó vứt vào sọt rác.

---

## 🖼 Sơ đồ
```text
3 hành động phẫu thuật commit:
[pick C1]  ──► Giữ nguyên không đổi
[reword C2]──► Dừng lại để mở editor sửa commit message của C2
[edit C3]  ──► Dừng cỗ máy thời gian tại C3! (Cho phép git add/commit thêm)
[drop C4]  ──► Xóa sổ hoàn toàn C4!
[pick C5]  ──► Áp dụng tiếp bình thường
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Đức kiểm tra nhánh trước khi bàn giao và phát hiện 3 vấn đề: commit 1 ghi nhầm số issue #101 thành #102, commit 2 vô tình commit nhầm file mật khẩu `secret.env`, commit 3 thiếu tệp test. Đức chạy lệnh `git rebase -i HEAD~3`. Trong Todo List, Đức đánh dấu: dòng 1 là `reword`, dòng 2 là `drop`, dòng 3 là `edit`. Khi lưu lại, Git dừng ở commit 1 để Đức sửa lại thành #101. Tiếp theo Git xóa phăng commit 2 chứa file mật khẩu. Cuối cùng Git dừng lại ở commit 3, Đức thêm file test, gõ `git add` và `git rebase --continue`. Toàn bộ nhánh được dọn dẹp sạch bong và tuyệt đối an toàn.

---

## 💻 Command
```bash
r <commit-hash> (hoặc reword)
e <commit-hash> (hoặc edit)
d <commit-hash> (hoặc drop)
git rebase --continue
git reset HEAD~1 (trong lúc edit)
```

---

## 🔍 Giải thích command
- `reword <hash>`: Giữ nguyên mã nguồn của commit nhưng mở editor để sửa đổi tiêu đề và mô tả commit.
- `edit <hash>`: Tạm dừng tiến trình rebase tại commit này, cho phép bạn chỉnh sửa tệp tin, commit amend hoặc chia tách commit.
- `drop <hash>`: Xóa bỏ hoàn toàn commit này (tương đương với việc xóa dòng đó khỏi Todo List).
- `git rebase --continue`: Báo cho Git biết bạn đã hoàn tất chỉnh sửa ở bước edit và tiếp tục tiến trình.

---

## ⚠️ Sai lầm phổ biến
1. **Quên gõ `git rebase --continue` sau khi edit**:  Khiến Git bị treo mãi ở trạng thái rebase dở dang.
2. **Sử dụng `drop` nhầm commit quan trọng chứa mã nguồn cần giữ lại.**: Sử dụng `drop` nhầm commit quan trọng chứa mã nguồn cần giữ lại.
3. **Lúng túng khi đang ở trạng thái edit**:  Chỉ cần nhớ bạn đang đứng tại đúng thời điểm của commit đó, sửa xong thì `git add` và `git commit --amend` rồi `--continue`.

---

## 🧪 Lab
1. Tạo 3 commit liên tiếp, trong đó commit 2 có thông điệp `sai thong diep`.
2. Chạy `git rebase -i HEAD~3`.
3. Đổi từ khóa dòng 2 từ `pick` thành `reword`.
4. Lưu và đóng editor; nhập thông điệp mới `thong diep chuan` khi Git yêu cầu.
5. Kiểm tra lại `git log --oneline` để xác nhận thông điệp đã được sửa thành công.

---

## 💡 Hint
> Khi ở trạng thái `edit`, bạn có thể chạy `git reset HEAD~1` để bóc tách một commit lớn thành nhiều commit nhỏ.

---

## ✅ Validation
- Sử dụng thành thạo reword để đổi thông điệp, edit để sửa code và drop để loại bỏ commit.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về các chỉ thị reword, edit và drop.

---

## 🔥 Challenge
Mô tả quy trình từng bước sử dụng chỉ thị `edit` để chia một commit lớn thành 2 commit nhỏ riêng biệt.

---

## 📚 Tổng kết
- `reword` (r) sửa đổi thông điệp của commit trong quá khứ mà giữ nguyên mã nguồn.
- `edit` (e) tạm dừng tiến trình để bổ sung thay đổi hoặc chia nhỏ commit.
- `drop` (d) loại bỏ vĩnh viễn commit thừa ra khỏi chuỗi lịch sử.
