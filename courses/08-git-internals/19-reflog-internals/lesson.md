# Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)

---

## 🎯 Mục tiêu
- Giải mã cấu trúc bên trong thư mục nhật ký `.git/logs/` (gồm `logs/HEAD` và `logs/refs/heads/`).
- Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.
- Sử dụng kiến thức Reflog Internals để giải cứu mã nguồn khi mọi lệnh Porcelain đều từ chối hoạt động.
- Nắm vững chu kỳ sống (retention period) và cơ chế dọn dẹp của Reflog.

---

## 🧩 Từ khóa hôm nay

### Reference Log (.git/logs/HEAD)
- **Nói dễ hiểu**: Tệp nhật ký văn bản tuần tự ghi lại mọi bước dịch chuyển của con trỏ HEAD trên máy tính cục bộ của bạn.
- **Ví dụ**: Mỗi khi bạn gõ `git commit`, `git checkout`, `git switch`, `git reset`, một dòng mới được nối thêm vào tệp này.
- **Đừng nhầm**: Không bao giờ được đẩy (push) lên GitHub; đây là nhật ký riêng tư 100% của máy tính cá nhân bạn.

### Reflog Retention Period (gc.reflogExpire)
- **Nói dễ hiểu**: Thời hạn Git lưu giữ các bản ghi nhật ký trước khi tiến trình thu gom rác tự động dọn dẹp.
- **Ví dụ**: Mặc định lưu 90 ngày cho các commit còn tiếp cận được và 30 ngày cho các commit mồ côi (unreachable).
- **Đừng nhầm**: Không phải vĩnh viễn; sau 30 ngày commit mồ côi không có nhánh nào neo giữ có thể bị xóa vĩnh viễn bởi `git gc`.

### Local Safety Net
- **Nói dễ hiểu**: Tấm lưới bảo hiểm an toàn tối thượng giúp phục hồi các commit tưởng như đã bị xóa vĩnh viễn sau khi lỡ tay reset hard.
- **Ví dụ**: Dùng cú pháp `HEAD@{1}` hoặc mã băm ghi trong reflog để tạo nhánh cứu hộ.
- **Đừng nhầm**: Chỉ cứu được những gì bạn ĐÃ TỪNG COMMIT; các tệp chưa commit nằm trong working directory nếu bị xóa sẽ không có trong reflog.

---

## 📖 Định nghĩa
Reflog (viết tắt của Reference Log - Nhật ký tham chiếu) là một hệ thống tệp tin nhật ký tuần tự nằm bên trong thư mục `.git/logs/`. Khác với `git log` ghi lại lịch sử tiến hóa của các commit trong dự án, Reflog ghi lại toàn bộ lịch sử di chuyển của các con trỏ tham chiếu (đặc biệt là con trỏ HEAD và các nhánh cục bộ) trên chính máy tính của bạn. Mỗi khi con trỏ HEAD thay đổi tọa độ (do commit, checkout, switch, rebase, merge hay reset), một dòng văn bản mới sẽ được nối thêm vào tệp `.git/logs/HEAD`.

---

## 💡 Tại sao cần
Reflog là tấm lưới bảo hiểm an toàn tối thượng của Git. Khi một lập trình viên vô tình gõ `git reset --hard` hay lỡ tay rebase làm mất các commit quan trọng, lịch sử thông thường (`git log`) sẽ không còn hiển thị những commit đó nữa. Nhưng vì con trỏ HEAD từng đi qua commit đó trong quá khứ, tọa độ mã băm SHA-1 của nó vẫn được ghi lại sắc nét bên trong tệp nhật ký `.git/logs/HEAD`. Nhờ Reflog, hầu như không có gì có thể thực sự biến mất khỏi Git trong vòng 30 đến 90 ngày.

---

## 🧠 Mental Model
Hãy tưởng tượng hộp đen ghi lại hành trình bay chuyên dụng của một chiếc máy bay trực thăng hiện đại. Chiếc trực thăng (HEAD) bay qua ngọn đồi A, đáp xuống đỉnh núi B rồi quay về trạm sân bay C. Dù bạn có xóa sạch lộ trình trên tấm bản đồ du lịch thông thường (`git log`), thì chiếc hộp đen (`.git/logs/HEAD`) vẫn ghi lại chính xác từng giây từng phút chiếc trực thăng đã ở tọa độ nào, xuất phát từ đâu và vì lý do cụ thể gì.

---

## 📊 Sơ đồ minh họa
```text
Giải phẫu cấu trúc tệp nhật ký .git/logs/HEAD:
[Old SHA-1 (40B)] [New SHA-1 (40B)] [Committer Name <Email> Timestamp TZ] [Action / Message]

Ví dụ một dòng thực tế bên trong tệp .git/logs/HEAD:
0000000000000000000000000000000000000000 7a8b9c4d Nam <nam@dev.com> 1727654400 +0700 commit (initial): init
7a8b9c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b c5d4e3f2 Nam <nam@dev.com> 1727654500 +0700 commit: add login
c5d4e3f2a1b09876543210fedcba9876543210fe 7a8b9c4d Nam <nam@dev.com> 1727654600 +0700 reset: moving to HEAD~1
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư trong lúc xử lý xung đột rebase đã bấm nhầm phím và làm mất toàn bộ nhánh tính năng của hai tuần làm việc. Lệnh `git log` chỉ hiển thị nhánh main cũ kỹ. Kỹ sư không hề nao núng, mở terminal và sử dụng lệnh đọc trực tiếp: `cat .git/logs/HEAD`. Trước mắt kỹ sư hiện ra danh sách toàn bộ các thao tác gần nhất kèm theo lý do rõ ràng. Dòng thứ 3 từ dưới lên ghi rõ: `7a8b9c4d 3b18e5a1 checkout: moving from feature to main`. Kỹ sư lập tức sao chép mã băm `3b18e5a1` và gõ lệnh: `git switch -c rescued-feature 3b18e5a1`. Nhánh tính năng được phục sinh hoàn hảo từng dòng code trong sự thán phục của toàn bộ đồng nghiệp trong phòng.

---

## 💻 Command & Cú pháp
```bash
# Đọc trực tiếp tệp nhật ký thô của con trỏ HEAD
cat .git/logs/HEAD

# Xem danh sách reflog định dạng thân thiện
git reflog

# Xem nhật ký chuyển dịch riêng của nhánh main
cat .git/logs/refs/heads/main

# Khôi phục trạng thái ngay trước thao tác gần nhất
git reset --hard HEAD@{1}
```

---

## 🔍 Giải thích command
- `cat .git/logs/HEAD`: Hiển thị từng dòng bản ghi nhật ký gồm old-sha, new-sha, committer, timestamp và action description.
- `git reflog`: Giao diện dòng lệnh thân thiện đánh số các mục dạng `HEAD@{0}`, `HEAD@{1}` để dễ thao tác.
- `cat .git/logs/refs/heads/main`: Tệp nhật ký riêng chỉ ghi nhận những lần nhánh `main` được cập nhật commit.
- `git reset --hard HEAD@{1}`: Quay ngược con trỏ về vị trí ngay trước bước vừa thực hiện.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Reflog được push lên GitHub**: Reflog là dữ liệu cục bộ 100% trên máy tính cá nhân của bạn, không bao giờ được đồng bộ qua remote server.
2. **Để quá thời hạn lưu trữ**: Sau 30 ngày các commit mồ côi không có nhánh nào trỏ tới sẽ bị tiến trình `git gc` dọn dẹp vĩnh viễn.
3. **Tự ý xóa thư mục `.git/logs/`**: Việc này làm mất đi chiếc phao cứu sinh duy nhất khi bạn lỡ tay thực hiện sai lệnh reset hay rebase.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Mở terminal và chạy lệnh `cat .git/logs/HEAD` để xem nội dung nhật ký chuyển dịch thô của con trỏ HEAD.
2. **Bước 2**: Thực hiện chuyển nhánh `git switch -c temp-branch` rồi tạo một commit mới.
3. **Bước 3**: Chạy lại `cat .git/logs/HEAD` để quan sát 2 dòng mới xuất hiện ghi lại hành vi checkout và commit.
4. **Bước 4**: Chạy `git reflog` và đối chiếu định dạng hiển thị với nội dung tệp thô trong thư mục logs.

---

## 💡 Hint & mẹo
> Mỗi nhánh cục bộ đều có tệp nhật ký riêng trong thư mục `.git/logs/refs/heads/<branch-name>`. Bạn có thể đọc trực tiếp các tệp này để theo dõi tiến độ công việc của từng nhánh.

---

## ✅ Validation & Kết quả mong đợi
- Tệp `.git/logs/HEAD` ghi nhận chi tiết chuỗi hành vi với định dạng chuẩn gồm mã băm cũ, mã băm mới và mô tả hành động.
- Lệnh `git reflog` phản ánh chính xác các bước chuyển đổi tương ứng.

---

## ❓ Quiz nhanh
Hãy kiểm tra kiến thức về cấu trúc và sức mạnh cứu hộ của Reflog qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để cấu hình thời gian sống của các mục Reflog lâu hơn mặc định thông qua thuộc tính `gc.reflogExpire` và `gc.reflogExpireUnreachable` trong tệp `.git/config`?

---

## 📝 Tổng kết
- Reflog là tệp nhật ký cục bộ ghi lại mọi sự di chuyển của con trỏ HEAD và các nhánh.
- Lưu trữ trong `.git/logs/HEAD` dưới dạng các dòng văn bản thuần ghi nhận old-hash, new-hash và hành động.
- Là công cụ cứu hộ dữ liệu mạnh mẽ nhất của Git, giúp phục hồi mọi commit bị mất trong vòng 30 đến 90 ngày.
- Reflog hoàn toàn mang tính cục bộ và không bao giờ bị lộ ra ngoài khi chia sẻ qua remote.
