# Nhánh theo dõi Tracking Branch

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và cơ chế hoạt động của Tracking Branch (Nhánh theo dõi) trong Git.
- Phân biệt rõ ràng giữa 3 loại nhánh: Nhánh cục bộ, Nhánh theo dõi từ xa (`origin/main`), và Nhánh thực tế trên server.
- Đọc hiểu và giải thích ý nghĩa các trạng thái so sánh: `ahead`, `behind`, và `diverged`.
- Thiết lập hoặc thay đổi quan hệ upstream tracking cho một nhánh cục bộ bất kỳ.

---

## 🧩 Từ khóa hôm nay

### upstream — nhánh được theo dõi
- **Nói dễ hiểu**: Cấu hình liên kết một nhánh local với nhánh mà Git dùng làm mặc định cho lệnh như `status`, `pull` và `push`.
- **Ví dụ**: Local `main` có upstream `origin/main`.
- **Đừng nhầm**: Remote-tracking branch `origin/main` là một ref cục bộ phản ánh lần fetch gần nhất; upstream là quan hệ cấu hình của nhánh local.

### ahead commit
- **Nói dễ hiểu**: Số lượng commit bạn đã tạo trên máy tính cá nhân nhưng chưa đẩy lên máy chủ GitHub.
- **Ví dụ**: `Your branch is ahead of 'origin/main' by 1 commit` nhắc bạn cần chạy `git push`.
- **Đừng nhầm**: Không có nghĩa là server bị lỗi; chỉ là máy chủ chưa nhận được commit mới của bạn.

### diverged branch
- **Nói dễ hiểu**: Trạng thái nhánh bị phân kỳ khi cả bạn và server đều có những commit mới độc lập nhau.
- **Ví dụ**: Bạn đi trước 1 commit (ahead 1) đồng thời server cũng có 2 commit mới của đồng nghiệp (behind 2).
- **Đừng nhầm**: Không thể push thông thường ngay được; bạn phải chạy git pull để gộp hoặc rebase trước.

---

## 📖 Định nghĩa
Một nhánh local có thể được cấu hình để theo dõi một remote-tracking branch, thường gọi là upstream. `git status` và `git branch -vv` dùng quan hệ này để báo ahead/behind so với thông tin đã fetch gần nhất. Đây không phải phép kiểm tra trực tiếp máy chủ.

---

## 💡 Tại sao cần
Upstream giúp lệnh `git status` so sánh hai đầu và cho phép rút gọn `git push`/`git pull`. Không có upstream, bạn vẫn có thể làm việc; chỉ cần chỉ rõ remote và nhánh khi đồng bộ.

---

## 🧠 Mental Model
Hãy hình dung hai vận động viên chạy trên hai làn song song. Trên tay bạn có đồng hồ GPS liên tục báo: "Bạn đang chạy trước 2 bước" (ahead 2), hoặc "Bạn đang chạy sau 3 bước" (behind 3). Chiếc đồng hồ đó chính là cơ chế Tracking Branch giúp bạn luôn biết mình cần đẩy hay kéo code.

---

## 📊 Sơ đồ minh họa
```text
Các trạng thái so sánh Tracking Branch:
Trạng thái Up to date:
Local:   C1 ──► C2 ──► C3 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

Trạng thái Ahead 1 (Bạn đi trước 1 commit):
Local:   C1 ──► C2 ──► C3 ──► C4 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

Trạng thái Behind 1 (Server đi trước 1 commit):
Local:   C1 ──► C2 ──► C3 (main)
Remote:  C1 ──► C2 ──► C3 ──► C5 (origin/main)
```

---

## 🏢 Ví dụ thực tế
Lập trình viên Hà tạo commit mới trên nhánh main sau khi sửa xong giao diện. Gõ `git status`, terminal hiển thị rõ: "Your branch is ahead of 'origin/main' by 1 commit". Nhờ có liên kết tracking, Hà biết mình có commit chưa xuất bản và chỉ cần gõ `git push` ngắn gọn để đồng bộ hóa mã nguồn tức thì lên GitHub.

---

## 💻 Command & Cú pháp
```bash
git status
git branch -vv
git branch -u origin/<tên-nhánh>
git branch --unset-upstream
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị trạng thái so sánh chi tiết giữa nhánh hiện tại và nhánh upstream (ahead/behind).
- `git branch -vv`: Liệt kê tất cả các nhánh cục bộ kèm tên nhánh upstream và độ lệch ahead/behind.
- `git branch -u origin/<nhánh>`: Thiết lập hoặc đổi liên kết upstream cho nhánh hiện tại.
- `git branch --unset-upstream`: Gỡ bỏ mối quan hệ theo dõi upstream của nhánh hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Bối rối khi thấy thông báo behind**: Chỉ cần chạy `git pull` để lấy các commit mới của đồng nghiệp về máy.
2. **Nhánh bị phân kỳ diverged**: Cả bạn và server đều có commit mới; cần pull về xử lý merge hoặc rebase trước khi push.
3. **Nghĩ rằng git status tự động kết nối mạng**: Trạng thái so sánh dựa trên lần fetch gần nhất; hãy chạy `git fetch` trước để thông tin chuẩn xác nhất.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tạo commit và đối chiếu thông tin so sánh nhánh.
1. Chạy `git branch -vv`. Nếu nhánh hiện tại chưa có upstream, Git sẽ không hiển thị tên nhánh upstream trong ngoặc vuông; đó là bình thường.
2. Nếu kho mới chưa có commit, tạo commit đầu tiên trước bằng `git add README.md` rồi `git commit -m "docs: start tracking practice"`.
3. Tạo nhánh `tracking-practice` bằng `git switch -c tracking-practice`, sửa một dòng README, rồi add và commit.
4. Trong simulator, tạo remote giả `git remote add tracking-demo https://example.com/training/tracking-demo.git`, sau đó chạy `git push -u tracking-demo tracking-practice`. Với GitHub thật, chỉ dùng remote của kho thử nghiệm bạn có quyền ghi.
5. Chạy `git branch -vv`, `git status`, rồi `git push` và xem lại `git status`. Trong simulator, remote này chỉ là dữ liệu giả lập.

---

## 💡 Hint & mẹo
> Chạy `git fetch` trước khi cần so sánh với trạng thái mới nhất mà remote cung cấp. `git status` một mình không kết nối mạng.

---

## ✅ Validation & Kết quả mong đợi
- Nếu upstream đã được thiết lập, `git branch -vv` hiển thị tên upstream; nếu chưa có, trường này để trống.
- Hiểu và phân biệt chính xác ý nghĩa của các thông báo `ahead`, `behind` và `up to date`.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố kiến thức về Tracking Branch.

---

## 🚀 Thử thách nâng cao
Mở file `.git/config` và xem các dòng `[branch "main"]` có cấu hình `remote = origin` và `merge = refs/heads/main` để thấy cách Git ghi nhớ liên kết ngầm.

---

## 📝 Tổng kết
- Tracking Branch liên kết nhánh cục bộ với nhánh remote-tracking tương ứng.
- Cung cấp thông tin so sánh quý giá: `ahead` (cần push) và `behind` (cần pull).
- Cho phép sử dụng các cú pháp rút gọn `git push` và `git pull` tiện lợi và an toàn.
