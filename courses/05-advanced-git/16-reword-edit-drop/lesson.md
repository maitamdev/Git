# Reword / Edit / Drop Commit

---

## 🎯 Mục tiêu
- Làm chủ 3 chỉ thị quyền năng còn lại của Interactive Rebase: `reword` (sửa thông điệp), `edit` (sửa nội dung) và `drop` (xóa commit).
- Sử dụng `reword` (hoặc `r`) để chuẩn hóa các commit message cũ sâu trong quá khứ.
- Sử dụng `edit` (hoặc `e`) để tạm dừng tiến trình rebase, bổ sung thêm file hoặc chia nhỏ commit đó.
- Sử dụng `drop` (hoặc `d`) để không phát lại commit thử nghiệm vào lịch sử mới.

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
- **Nói dễ hiểu**: Lệnh bỏ commit khỏi lịch sử mới mà rebase đang tạo.
- **Ví dụ**: Đổi dòng commit thử nghiệm thành `drop` để không phát lại thay đổi đó vào lịch sử mới.
- **Đừng nhầm**: Commit cũ có thể còn tìm thấy trong reflog một thời gian; drop không xóa ngay object khỏi kho.

---

## 📖 Định nghĩa
`reword`, `edit` và `drop` là các chỉ thị của Interactive Rebase: `reword` đổi thông điệp, `edit` dừng để bạn sửa commit, còn `drop` không phát lại commit đó vào lịch sử mới. Rebase tạo lại lịch sử; commit cũ có thể còn tìm được qua reflog trong một thời gian.

---

## 🤔 Tại sao cần?
Trong thực tế, bạn thường cần sửa mã vé Jira ghi sai, loại bỏ commit chứa tệp rác thừa, hoặc tách một commit quá lớn thành hai. Bộ ba chỉ thị này trao cho bạn khả năng kiểm soát phẫu thuật chính xác đến từng điểm trong lịch sử Git.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn có cỗ máy thời gian quay về từng cảnh quay trong phim. Lệnh `reword` giống như lồng tiếng lại lời bình. Lệnh `edit` giống như dừng trường quay lại để bạn đưa thêm đạo cụ vào tay diễn viên rồi mới bấm máy tiếp. Còn lệnh `drop` là cắt bỏ phân cảnh đó vứt vào sọt rác.

---

## 🖼 Sơ đồ
```text
3 hành động phẫu thuật commit trong Interactive Rebase:
[pick C1]   ──► Giữ nguyên không đổi
[reword C2] ──► Dừng lại để mở editor sửa commit message của C2
[edit C3]   ──► Tạm dừng tại C3! Cho phép sửa code, git add/amend
[drop C4]   ──► Xóa sổ hoàn toàn C4 khỏi lịch sử!
[pick C5]   ──► Áp dụng tiếp bình thường
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Đức cần sửa ba commit chưa chia sẻ: đổi thông điệp commit đầu, bỏ một commit debug không cần nữa, và thêm test vào commit thứ ba. Đức dùng `rebase -i` trên nhánh thử nghiệm, rồi kiểm tra cả nội dung lẫn lịch sử mới. Nếu commit có credential đã lỡ chia sẻ, Đức thu hồi credential trước; `drop` không vô hiệu hóa secret.

---

## 💻 Command
```bash
r <commit-hash> (hoặc reword)
e <commit-hash> (hoặc edit)
d <commit-hash> (hoặc drop)
git rebase --continue
git commit --amend (khi đang tạm dừng ở trạng thái edit)
```

---

## 🔍 Giải thích command
- `reword <hash>`: Giữ nguyên mã nguồn của commit nhưng mở editor để sửa đổi tiêu đề và mô tả commit.
- `edit <hash>`: Tạm dừng tiến trình rebase tại commit này, cho phép bạn chỉnh sửa tệp tin, commit amend hoặc chia tách commit.
- `drop <hash>`: Không phát lại commit này vào lịch sử mới (có thể xóa dòng đó khỏi todo list).
- `git rebase --continue`: Báo cho Git biết bạn đã hoàn tất chỉnh sửa ở bước edit và tiếp tục tiến trình.

---

## ⚠️ Sai lầm phổ biến
1. **Quên gõ `git rebase --continue` sau khi edit**: Khiến Git bị treo mãi ở trạng thái rebase dở dang trong terminal.
2. **Dùng `drop` nhầm commit quan trọng**: Thay đổi đó không được phát lại. Có thể cần tìm commit cũ qua reflog nếu entry và object còn đó.
3. **Lúng túng khi đang ở trạng thái edit**: Nhớ rằng bạn đang đứng ở snapshot quá khứ, sửa xong chỉ cần `git add`, `git commit --amend` rồi `--continue`.

---

## 🧪 Lab
Luyện bằng Git thật trong kho thử nghiệm riêng; simulator hiện chưa nhận chỉnh sửa todo list qua editor.
1. Tạo commit nền, rồi ba commit riêng: `add heading`, `add debug log`, `add test`.
2. Chạy `git rebase -i HEAD~3`. Đổi dòng `add heading` thành `reword`, dòng `add debug log` thành `drop`, và dòng `add test` thành `edit`.
3. Lưu todo list. Khi được hỏi, đổi thông điệp commit đầu thành `docs: add heading`.
4. Khi rebase dừng ở commit `edit`, sửa `test.txt`, chạy `git add test.txt`, `git commit --amend --no-edit`, rồi `git rebase --continue`.
5. Kiểm tra `git log --oneline -4` và `git status`; commit debug không còn trong nhánh mới, hai commit còn lại có nội dung mong muốn.

---

## 💡 Hint
> Khi Git dừng ở `edit`, sửa file, stage phần muốn giữ, rồi `git commit --amend` và `git rebase --continue`. Nếu commit có secret đã lỡ chia sẻ, hãy thu hồi hoặc đổi secret trước; chỉ drop commit không làm credential mất hiệu lực và không xóa bản sao đã có.

---

## ✅ Validation
- Thực hiện được `reword`, `edit` và `drop` trong kho thử nghiệm, rồi kiểm tra lịch sử mới.
- Biết `drop` không phải cách xử lý bảo mật cho secret đã bị lộ.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về các chỉ thị reword, edit và drop.

---

## 🔥 Challenge
Mô tả quy trình từng bước sử dụng chỉ thị `edit` để chia một commit lớn thành 2 commit nhỏ riêng biệt.

---

## 📚 Tổng kết
- `reword` giúp chuẩn hóa thông điệp mà không đụng chạm đến mã nguồn.
- `edit` trao quyền can thiệp vào mã nguồn của commit trong quá khứ.
- `drop` (hoặc xóa dòng) loại bỏ commit thừa một cách dứt khoát.
