# Nhánh theo dõi Tracking Branch

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và cơ chế hoạt động của Tracking Branch (Nhánh theo dõi) trong Git.
- Phân biệt rõ ràng giữa 3 loại nhánh: Nhánh cục bộ, Nhánh theo dõi từ xa (`origin/main`), và Nhánh thực tế trên server.
- Đọc hiểu và giải thích ý nghĩa các trạng thái so sánh: `ahead`, `behind`, và `diverged`.
- Thiết lập hoặc thay đổi quan hệ upstream tracking cho một nhánh cục bộ bất kỳ.

---

## 📖 Định nghĩa
> Tracking Branch (Nhánh theo dõi cục bộ, còn gọi là Upstream Branch) là một nhánh cục bộ có mối liên kết trực tiếp một-một với một nhánh theo dõi từ xa (Remote-tracking branch, ví dụ `origin/main`). Khi một nhánh cục bộ được cấu hình tracking, Git sẽ liên tục theo dõi vị trí tương đối giữa hai nhánh và tự động thông báo cho bạn biết bạn đang đi trước máy chủ bao nhiêu commit (ahead) hoặc đang bị tụt lại phía sau bao nhiêu commit (behind).

---

## 🤔 Tại sao cần?
Nếu không có tính năng Tracking Branch, mỗi lần bạn gõ câu lệnh `git status`, bạn sẽ hoàn toàn rơi vào trạng thái mù mịt thông tin vì không biết mã nguồn trên máy tính của mình đã được xuất bản đồng bộ lên GitHub hay chưa, hoặc có đồng nghiệp nào vừa đẩy thêm các commit mới lên hay không. Tính năng tracking mang lại sự tiện lợi và tự động hóa tuyệt vời: bạn chỉ cần gõ `git push` hoặc `git pull` ngắn gọn mà không phải gõ kèm tên remote và tên branch dài dòng, đồng thời hạn chế tối đa nguy cơ vô tình đẩy nhầm nhánh vào sai địa chỉ đích.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai vận động viên điền kinh Nam (nhánh cục bộ) và Bình (nhánh trên server) cùng thi đấu trên hai làn chạy song song. Trên cổ tay của Nam có đeo một chiếc đồng hồ thông minh kết nối GPS (Tracking Branch). Chiếc đồng hồ liên tục hiển thị: "Bạn đang chạy trước Bình 2 bước" (ahead 2), hoặc "Bạn đang chạy sau Bình 3 bước" (behind 3), hoặc "Hai bạn đang chạy ngang nhau" (up to date). Nhờ chiếc đồng hồ đó, Nam luôn biết mình cần tăng tốc hay giữ nhịp.

---

## 🖼 Sơ đồ
```text
Các trạng thái so sánh Tracking Branch:
Trạng thái Up to date:
Local:   C1 ──► C2 ──► C3 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

Trạng thái Ahead 1 (Bạn đi trước 1 commit):
Local:   C1 ──► C2 ──► C3 ──► C4 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

Trạng thái Behind 1 (Server đi trước 1 commit):
Local:   C1 ──► C2 ──► C3 ──► C5 (origin/main)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Hà tạo một commit mới trên nhánh main của máy tính cá nhân sau khi sửa xong giao diện đăng nhập. Khi Hà gõ lệnh `git status`, màn hình console lập tức in ra thông báo màu xanh lá vô cùng rõ ràng: "Your branch is ahead of 'origin/main' by 1 commit. (use 'git push' to publish your local commits)". Nhờ có mối quan hệ tracking branch được thiết lập từ trước, Hà biết chính xác mình đang có một commit chưa được đẩy lên đám mây và chỉ việc gõ câu lệnh `git push` ngắn gọn để đồng bộ hóa mã nguồn tức thì lên GitHub cho toàn bộ đội ngũ kỹ thuật cùng tiếp cận, giúp dự án luôn ở trạng thái cập nhật nhất mà không gặp phải bất kỳ sai sót nào.

---

## 💻 Command
```bash
git status
git branch -vv
git branch -u origin/<tên-nhánh>
git branch --unset-upstream
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị trạng thái so sánh chi tiết giữa nhánh hiện tại và nhánh upstream (ahead/behind).
- `git branch -vv`: Liệt kê tất cả các nhánh cục bộ kèm theo tên nhánh upstream và trạng thái ahead/behind của từng nhánh.
- `git branch -u origin/<nhánh>`: Thiết lập hoặc đổi liên kết upstream cho nhánh hiện tại.
- `git branch --unset-upstream`: Gỡ bỏ mối quan hệ theo dõi upstream của nhánh hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Bối rối khi thấy thông báo "Your branch is behind"**:  Cần chạy `git pull` để kéo commit mới về máy.
2. **Nhánh bị phân kỳ "Your branch and origin/main have diverged"**:  Cả bạn và server đều có commit mới độc lập; cần pull về giải quyết merge/rebase.
3. **Nghĩ rằng git status tự động kết nối mạng**:  Thông báo ahead/behind dựa trên dữ liệu fetch lần cuối, hãy chạy `git fetch` trước để thông tin chuẩn xác nhất.

---

## 🧪 Lab
1. Chạy lệnh `git branch -vv` và quan sát cột hiển thị upstream trong ngoặc vuông `[origin/main]`.
2. Tạo một commit mới và chạy `git status` để quan sát thông báo `ahead by 1 commit`.
3. Đẩy commit lên server bằng lệnh ngắn gọn `git push`.
4. Chạy lại `git status` để xác nhận thông báo `Your branch is up to date with origin/main`.

---

## 💡 Hint
> Nhớ chạy `git fetch` trước khi xem `git status` để trạng thái ahead/behind phản ánh đúng thực tế trên server.

---

## ✅ Validation
- Đọc hiểu chính xác trạng thái ahead và behind thông qua `git status` và `git branch -vv`.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về nhánh theo dõi Tracking Branch.

---

## 🔥 Challenge
Mô tả cấu trúc tệp `.git/config` khi một nhánh được cấu hình upstream tracking.

---

## 📚 Tổng kết
- Tracking Branch liên kết nhánh cục bộ với nhánh remote-tracking tương ứng.
- Cung cấp thông tin so sánh quý giá: `ahead` (cần push) và `behind` (cần pull).
- Cho phép sử dụng các cú pháp rút gọn `git push` và `git pull` tiện lợi.
