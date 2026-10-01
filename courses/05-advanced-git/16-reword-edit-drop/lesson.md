# Reword / Edit / Drop Commit

---

## 🎯 Mục tiêu
- Làm chủ 3 chỉ thị quyền năng còn lại của Interactive Rebase: `reword` (sửa thông điệp), `edit` (sửa nội dung) và `drop` (xóa commit).
- Sử dụng `reword` (hoặc `r`) để chuẩn hóa các commit message cũ sâu trong quá khứ.
- Sử dụng `edit` (hoặc `e`) để tạm dừng tiến trình rebase, bổ sung thêm file hoặc chia nhỏ commit đó.
- Sử dụng `drop` (hoặc `d`) để loại bỏ hoàn toàn các commit thử nghiệm không còn giá trị.

---

## 🧩 Từ khóa hôm nay

### Reword (reword / r)
- **Nói dễ hiểu**: Lệnh trong Todo List mở trình soạn thảo để bạn viết lại câu thông điệp của commit cũ mà không đụng chạm đến code.
- **Ví dụ**: Đổi `pick` thành `reword` cho commit `a1b2c3d` để sửa lỗi chính tả trong commit message.
- **Đừng nhầm**: `reword` vẫn tạo ra một commit hash mới vì SHA-1 tính cả nội dung câu mô tả commit.

### Edit (edit / e)
- **Nói dễ hiểu**: Lệnh tạm dừng tiến trình rebase tại đúng commit được chỉ định để bạn sửa file, bổ sung code hoặc tách commit.
- **Ví dụ**: Đổi thành `edit` ở một commit cũ để thêm một file bị sót bằng `git add` và `git commit --amend`, sau đó gõ `git rebase --continue`.
- **Đừng nhầm**: Sau khi hoàn thành thao tác sửa đổi, bạn phải chạy `git rebase --continue` để Git tiếp tục áp dụng các commit kế tiếp.

### Drop (drop / d)
- **Nói dễ hiểu**: Lệnh xóa bỏ hoàn toàn một commit khỏi dòng lịch sử của nhánh hiện tại.
- **Ví dụ**: Đổi dòng commit thử nghiệm thành `drop` (hoặc xóa cả dòng đó khỏi Todo List) để loại bỏ nó vĩnh viễn.
- **Đừng nhầm**: Khi đã drop một commit và hoàn thành rebase, các thay đổi trong commit đó sẽ biến mất khỏi cây thư mục làm việc.

---

## 📖 Định nghĩa
`reword`, `edit` và `drop` là bộ ba chỉ thị can thiệp sâu trong Interactive Rebase: `reword` sửa đổi thông điệp commit, `edit` dừng tiến trình để bạn sửa mã nguồn hoặc tách commit, còn `drop` xóa bỏ hoàn toàn commit khỏi lịch sử.

---

## 💡 Tại sao cần
Trong thực tế, bạn thường cần sửa mã vé Jira ghi sai, loại bỏ commit chứa tệp rác thừa, hoặc tách một commit quá lớn thành hai. Bộ ba chỉ thị này trao cho bạn khả năng kiểm soát phẫu thuật chính xác đến từng điểm trong lịch sử Git.

---

## 🧠 Mental Model
Hãy hình dung bạn có cỗ máy thời gian quay về từng cảnh quay trong phim. Lệnh `reword` giống như lồng tiếng lại lời bình. Lệnh `edit` giống như dừng trường quay lại để bạn đưa thêm đạo cụ vào tay diễn viên rồi mới bấm máy tiếp. Còn lệnh `drop` là cắt bỏ phân cảnh đó vứt vào sọt rác.

---

## 📊 Sơ đồ minh họa
```text
3 hành động phẫu thuật commit trong Interactive Rebase:
[pick C1]   ──► Giữ nguyên không đổi
[reword C2] ──► Dừng lại để mở editor sửa commit message của C2
[edit C3]   ──► Tạm dừng tại C3! Cho phép sửa code, git add/amend
[drop C4]   ──► Xóa sổ hoàn toàn C4 khỏi lịch sử!
[pick C5]   ──► Áp dụng tiếp bình thường
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Đức cần sửa 3 commit: commit 1 ghi nhầm số issue #101 thành #102, commit 2 chứa file mật khẩu cần xóa, commit 3 thiếu file test. Đức chạy `git rebase -i HEAD~3`, đặt dòng 1 là `reword`, dòng 2 là `drop`, dòng 3 là `edit`. Sau vài thao tác đơn giản, toàn bộ nhánh được dọn dẹp sạch bong và an toàn tuyệt đối.

---

## 💻 Command & Cú pháp
```bash
r <commit-hash> (hoặc reword)
e <commit-hash> (hoặc edit)
d <commit-hash> (hoặc drop)
git rebase --continue
git reset HEAD~1 (khi đang tạm dừng ở trạng thái edit)
```

---

## 🔍 Giải thích command
- `reword <hash>`: Giữ nguyên mã nguồn của commit nhưng mở editor để sửa đổi tiêu đề và mô tả commit.
- `edit <hash>`: Tạm dừng tiến trình rebase tại commit này, cho phép bạn chỉnh sửa tệp tin, commit amend hoặc chia tách commit.
- `drop <hash>`: Xóa bỏ hoàn toàn commit này (tương đương với việc xóa dòng đó khỏi Todo List).
- `git rebase --continue`: Báo cho Git biết bạn đã hoàn tất chỉnh sửa ở bước edit và tiếp tục tiến trình.

---

## ⚠️ Sai lầm phổ biến
1. **Quên gõ `git rebase --continue` sau khi edit**: Khiến Git bị treo mãi ở trạng thái rebase dở dang trong terminal.
2. **Sử dụng `drop` nhầm commit quan trọng**: Vô tình xóa mất mã nguồn cần giữ lại; cần dùng `git reflog` để khôi phục nếu lỡ tay.
3. **Lúng túng khi đang ở trạng thái edit**: Nhớ rằng bạn đang đứng ở snapshot quá khứ, sửa xong chỉ cần `git add`, `git commit --amend` rồi `--continue`.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Tạo 3 commit liên tiếp, trong đó commit 2 có thông điệp `sai thong diep`.
2. Chạy `git rebase -i HEAD~3` trên terminal.
3. Đổi từ khóa dòng 2 từ `pick` thành `reword`.
4. Lưu và đóng editor; nhập thông điệp mới `thong diep chuan` khi Git yêu cầu.
5. Kiểm tra lại `git log --oneline` để xác nhận thông điệp đã được sửa thành công.

---

## 💡 Hint & mẹo
> Khi ở trạng thái `edit`, bạn có thể chạy `git reset HEAD~1` để đưa toàn bộ thay đổi ra Staging Area và bóc tách thành nhiều commit nhỏ hơn.

---

## ✅ Validation & Kết quả mong đợi
- Sử dụng thành thạo reword để đổi thông điệp, edit để sửa code và drop để loại bỏ commit.
- Nắm vững chu trình thao tác với `git rebase --continue` khi xử lý lệnh edit.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về các chỉ thị reword, edit và drop.

---

## 🚀 Thử thách nâng cao
Mô tả quy trình từng bước sử dụng chỉ thị `edit` để chia một commit lớn thành 2 commit nhỏ riêng biệt.

---

## 📝 Tổng kết
- `reword` giúp chuẩn hóa thông điệp mà không đụng chạm đến mã nguồn.
- `edit` trao quyền can thiệp vào mã nguồn của commit trong quá khứ.
- `drop` (hoặc xóa dòng) loại bỏ commit thừa một cách dứt khoát.
