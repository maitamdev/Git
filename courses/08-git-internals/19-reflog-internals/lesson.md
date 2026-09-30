# Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)

---

## 🎯 Mục tiêu bài học
- Giải mã cấu trúc bên trong thư mục nhật ký .git/logs/ (gồm logs/HEAD và logs/refs/heads/).
- Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.
- Sử dụng kiến thức Reflog Internals để giải cứu mã nguồn khi mọi lệnh Porcelain đều từ chối hoạt động.

---

## 📖 Định nghĩa
> Reflog (viết tắt của Reference Log - Nhật ký tham chiếu) là một hệ thống tệp tin nhật ký tuần tự nằm bên trong thư mục .git/logs/. Khác với git log ghi lại lịch sử tiến hóa của các commit trong dự án, Reflog ghi lại toàn bộ lịch sử di chuyển của các con trỏ tham chiếu (đặc biệt là con trỏ HEAD và các nhánh cục bộ) trên chính máy tính của bạn. Mỗi khi con trỏ HEAD thay đổi tọa độ (do commit, checkout, switch, rebase, merge hay reset), một dòng văn bản mới sẽ được nối thêm vào tệp .git/logs/HEAD.

---

## 🤔 Tại sao cần?
Reflog là tấm lưới bảo hiểm an toàn tối thượng của Git. Khi một lập trình viên vô tình gõ `git reset --hard` hay lỡ tay rebase làm mất các commit quan trọng, lịch sử thông thường (`git log`) sẽ không còn hiển thị những commit đó nữa. Nhưng vì con trỏ HEAD từng đi qua commit đó trong quá khứ, tọa độ mã băm SHA-1 của nó vẫn được ghi lại sắc nét bên trong tệp nhật ký `.git/logs/HEAD`. Nhờ Reflog, hầu như không có gì có thể thực sự biến mất khỏi Git trong vòng 30 đến 90 ngày.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng hộp đen ghi lại hành trình bay chuyên dụng của một chiếc máy bay trực thăng hiện đại. Chiếc trực thăng (HEAD) bay qua ngọn đồi A, đáp xuống đỉnh núi B rồi quay về trạm sân bay C. Dù bạn có xóa sạch lộ trình trên tấm bản đồ du lịch thông thường (git log), thì chiếc hộp đen (.git/logs/HEAD) vẫn ghi lại chính xác từng giây từng phút chiếc trực thăng đã ở tọa độ nào, xuất phát từ đâu và vì lý do cụ thể gì.

---

## 🖼️ Sơ đồ minh họa
```text
Giải phẫu cấu trúc tệp nhật ký .git/logs/HEAD:
[Old SHA-1 (40B)] [New SHA-1 (40B)] [Committer Name <Email> Timestamp TZ] [Action / Message]

Ví dụ một dòng thực tế bên trong tệp .git/logs/HEAD:
0000000000000000000000000000000000000000 7a8b9c4d Nam <nam@dev.com> 1727654400 +0700 commit (initial): init
7a8b9c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b c5d4e3f2 Nam <nam@dev.com> 1727654500 +0700 commit: add login
c5d4e3f2a1b09876543210fedcba9876543210fe 7a8b9c4d Nam <nam@dev.com> 1727654600 +0700 reset: moving to HEAD~1
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư trong lúc xử lý xung đột rebase đã bấm nhầm phím và làm mất toàn bộ nhánh tính năng của hai tuần làm việc. Lệnh git log chỉ hiển thị nhánh main cũ kỹ. Kỹ sư không hề nao núng, mở terminal và sử dụng lệnh đọc trực tiếp: `cat .git/logs/HEAD`. Trước mắt kỹ sư hiện ra danh sách toàn bộ các thao tác gần nhất kèm theo lý do rõ ràng. Dòng thứ 3 từ dưới lên ghi rõ: `7a8b9c4d 3b18e5a1 checkout: moving from feature to main`. Kỹ sư lập tức sao chép mã băm `3b18e5a1` và gõ lệnh: `git switch -c rescued-feature 3b18e5a1`. Nhánh tính năng được phục sinh hoàn hảo từng dòng code trong sự thán phục của toàn bộ đồng nghiệp trong phòng.

---

## 💻 Command & Lệnh thao tác
```bash
cat .git/logs/HEAD
git reflog
git log -g
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh cat .git/logs/HEAD cho phép xem trực tiếp cấu trúc tệp nhật ký thô được lưu trữ bên dưới đĩa cứng, git reflog hiển thị danh sách thân thiện với con người, và git log -g duyệt toàn bộ lịch sử commit dựa trên các mục trong reflog thay vì cây commit thông thường.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nghĩ rằng Reflog được đồng bộ lên remote GitHub**:  Reflog là dữ liệu hoàn toàn CỤC BỘ trên máy bạn, không bao giờ được gửi qua lệnh push.
2. **Để quá thời hạn hết hạn (expire) của Reflog**:  Mặc định Git sẽ dọn dẹp các mục reflog không thể tiếp cận sau 30 ngày (unreachable) và 90 ngày (reachable).
3. **Xóa thủ công thư mục `.git/logs/` khiến bạn mất đi chiếc phao cứu sinh duy nhất khi gặp sự cố.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Sử dụng lệnh `cat .git/logs/HEAD` để xem nội dung nhật ký chuyển dịch thô của con trỏ HEAD.
2. Thực hiện một vài thao tác chuyển nhánh `git switch` và tạo commit mới, sau đó kiểm tra lại tệp log.
3. Sử dụng cú pháp reflog đặc biệt `HEAD@{1}` để xem trạng thái ngay trước thao tác gần nhất.

---

## 💡 Gợi ý thực hiện (Hint)
> Mỗi nhánh cục bộ đều có tệp nhật ký riêng trong thư mục `.git/logs/refs/heads/<branch-name>`.

---

## ✅ Kiểm tra kết quả (Validation)
Đọc và đối chiếu được từng trường dữ liệu trong dòng nhật ký thô của tệp .git/logs/HEAD.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kiến thức về cấu trúc và sức mạnh cứu hộ của Reflog qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để cấu hình thời gian sống của các mục Reflog lâu hơn mặc định thông qua thuộc tính gc.reflogExpire trong tệp .git/config?

---

## 📚 Tổng kết kiến thức
- Reflog là tệp nhật ký cục bộ ghi lại mọi sự di chuyển của con trỏ HEAD và các nhánh.
- Lưu trữ trong `.git/logs/HEAD` dưới dạng các dòng văn bản thuần ghi nhận old-hash, new-hash và hành động.
- Là công cụ cứu hộ dữ liệu mạnh mẽ nhất của Git, giúp phục hồi mọi commit bị mất trong vòng 30 đến 90 ngày.
