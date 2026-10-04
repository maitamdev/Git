# Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)

---

## 🎯 Mục tiêu
- Hiểu reflog ghi lại một số lần di chuyển của HEAD và cập nhật ref ở local.
- Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.
- Dùng `git reflog` để tìm commit cũ và neo lại bằng nhánh sau khi kiểm tra.
- Hiểu thời hạn mặc định và lý do reflog không phải bản sao lưu.

---

## 🧩 Từ khóa hôm nay

### Reflog
- **Nói dễ hiểu**: Nhật ký local ghi nhận các lần ref được cập nhật; reflog `HEAD` cũng ghi nhận HEAD chuyển giữa các vị trí.
- **Ví dụ**: `git reflog` hiển thị các lần cập nhật gần đây dưới tên như `HEAD@{0}` và `HEAD@{1}`.
- **Đừng nhầm**: Reflog không phải một phần của lịch sử commit gửi bằng push. Nó chỉ có tác dụng ở repository đang giữ nhật ký đó; reflog có thể không được bật ở mọi repo.

### Reflog expiration
- **Nói dễ hiểu**: Quy tắc xác định khi nào bản ghi cũ có thể được xóa khỏi reflog.
- **Ví dụ**: Git mặc định đặt thời hạn 90 ngày cho entry thông thường và 30 ngày cho entry unreachable; cấu hình có thể thay đổi các mốc này.
- **Đừng nhầm**: Hết hạn reflog không đồng nghĩa object bị xóa đúng ngày đó. Garbage collection có thể dọn object unreachable sau đó; đừng dựa vào reflog làm backup.

### Reflog entry selector
- **Nói dễ hiểu**: Cú pháp như `HEAD@{1}` chọn một vị trí trong nhật ký HEAD.
- **Ví dụ**: Sau khi xác định đúng commit trong `git reflog`, tạo nhánh bằng `git branch rescue 'HEAD@{1}'`.
- **Đừng nhầm**: Entry mới nhất không nhất thiết là commit muốn tìm. Hãy đọc log và kiểm tra commit trước khi tạo nhánh hoặc reset.

---

## 📖 Định nghĩa
Reflog là nhật ký local về các lần cập nhật ref. `git log` đi theo lịch sử commit trong đồ thị; `git reflog` cho biết một ref như HEAD đã từng trỏ tới đâu trong repository này. Khi reflog được bật, Git thường ghi entry cho các cập nhật như commit, switch/checkout, merge, rebase hoặc reset. Đường dẫn vật lý được quyết định bởi Git directory; có thể xem bằng `git rev-parse --git-path logs/HEAD`.

---

## 🤔 Tại sao cần?
Nếu lỡ di chuyển một nhánh, reflog có thể giúp tìm commit trước đó dù commit ấy không còn xuất hiện trong `git log --all`. Cách an toàn là đọc `git reflog`, kiểm tra commit bằng `git show <object-id>`, rồi tạo nhánh cứu hộ. Mặc định Git dùng thời hạn 90 ngày cho entry thông thường và 30 ngày cho entry unreachable, nhưng cấu hình có thể khác và object có thể được garbage collection thu hồi. Reflog không bảo vệ thay đổi chưa commit và không thay thế backup.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng hộp đen ghi lại hành trình bay chuyên dụng của một chiếc máy bay trực thăng hiện đại. Chiếc trực thăng (HEAD) bay qua ngọn đồi A, đáp xuống đỉnh núi B rồi quay về trạm sân bay C. Dù bạn có xóa sạch lộ trình trên tấm bản đồ du lịch thông thường (`git log`), thì chiếc hộp đen (`.git/logs/HEAD`) vẫn ghi lại chính xác từng giây từng phút chiếc trực thăng đã ở tọa độ nào, xuất phát từ đâu và vì lý do cụ thể gì.

---

## 🖼 Sơ đồ
```text
Giản lược một dòng reflog:
[old object ID] [new object ID] [committer identity + timestamp + timezone] TAB [action / message]

Ví dụ một dòng thực tế bên trong tệp .git/logs/HEAD:
<old-id> <new-id> Nam <nam@dev.com> 1727654400 +0700<TAB>commit (initial): init
<old-id> <new-id> Nam <nam@dev.com> 1727654500 +0700<TAB>commit: add login
<old-id> <new-id> Nam <nam@dev.com> 1727654600 +0700<TAB>reset: moving to HEAD~1
```

---

## 🌎 Ví dụ thực tế
Một người học lỡ chuyển nhánh khỏi commit cần giữ. Họ chạy `git reflog`, tìm entry có message chuyển nhánh phù hợp, rồi kiểm tra ID bằng `git show <object-id>`. Khi đã xác nhận đúng nội dung, họ dùng `git branch rescued-feature <object-id>` để giữ commit. Cách này tạo một ref mới mà không ghi đè nhánh hiện tại.

---

## 💻 Command
```bash
# Xem nhật ký gần đây của HEAD
git reflog

# Kiểm tra một commit trước khi cứu hộ
git show <object-id>

# Giữ commit bằng một nhánh mới sau khi đã xác nhận đúng
git branch rescue <object-id>

# Xem đường dẫn Git dùng cho reflog HEAD
git rev-parse --git-path logs/HEAD
```

---

## 🔍 Giải thích command
- `git reflog`: Hiển thị entry của HEAD theo thứ tự mới nhất trước, thường gồm selector, object ID và mô tả hành động.
- `git show <object-id>`: Kiểm tra commit và nội dung trước khi quyết định phục hồi.
- `git branch rescue <object-id>`: Tạo nhánh mới trỏ tới commit đã chọn, giữ nó reachable.
- `git rev-parse --git-path logs/HEAD`: In ra đường dẫn reflog thực tế nếu reflog được tạo.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ reflog là lịch sử được chia sẻ**: Push/fetch chia sẻ commit và refs theo yêu cầu, không chia sẻ nhật ký reflog local.
2. **Xem thời hạn mặc định như bảo đảm**: Config có thể khác; reflog hết hạn và object pruning là các việc liên quan nhưng không xảy ra theo một đồng hồ cố định duy nhất.
3. **Chạy `reset --hard` theo selector chưa kiểm tra**: Trước hết xem entry, kiểm tra commit, rồi ưu tiên tạo nhánh cứu hộ để tránh ghi đè trạng thái hiện tại.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. **Bước 1**: Tạo repository thử nghiệm riêng và hai commit như lệnh dưới đây; đừng chạy reset trong repo dự án.
   ```bash
   mkdir git-reflog-lab
   cd git-reflog-lab
   git init
   git config user.name "Git Learner"
   git config user.email "learner@example.com"
   printf "first version\n" > note.txt
   git add note.txt
   git commit -m "first test commit"
   printf "second version\n" >> note.txt
   git add note.txt
   git commit -m "second test commit"
   git reset --hard HEAD~1
   ```
2. **Bước 2**: Chạy `git reflog` và xác định entry trước reset (thường là `HEAD@{1}`); kiểm tra bằng `git show 'HEAD@{1}'`.
3. **Bước 3**: Nếu đó là commit cần giữ, chạy `git branch rescue 'HEAD@{1}'`.
4. **Bước 4**: Xác nhận bằng `git log rescue -1`. Những lệnh reset chỉ dùng trong repository lab mới.

---

## 💡 Hint
> Khi reflog được bật, từng ref có thể có log riêng. `git reflog show <ref>` là cách xem thuận tiện; đường dẫn vật lý có thể khác giữa loại repository và worktree.

---

## ✅ Validation
- `git reflog` hiển thị những entry còn tồn tại của HEAD; danh sách phụ thuộc reflog có được bật và chưa hết hạn hay không.
- Đã kiểm tra commit mục tiêu bằng `git show` trước khi neo bằng nhánh cứu hộ.

---

## ❓ Quiz
Hãy kiểm tra kiến thức về cấu trúc và sức mạnh cứu hộ của Reflog qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Làm thế nào để cấu hình thời gian sống của các mục Reflog lâu hơn mặc định thông qua thuộc tính `gc.reflogExpire` và `gc.reflogExpireUnreachable` trong tệp `.git/config`?

---

## 📚 Tổng kết
- Reflog là nhật ký local của các lần cập nhật ref; `git reflog` giúp xem lịch sử HEAD.
- Entry thô ghi old/new object ID cùng danh tính, thời gian và message; object ID không cố định độ dài.
- Có thể dùng reflog để tìm commit cũ, nhưng thời hạn phụ thuộc config và reflog không phải backup.
- Push/fetch không truyền reflog như một phần của lịch sử dự án.
