# Đồng bộ và gộp code với git pull

---

## 🎯 Mục tiêu
- Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.
- Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.
- Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.
- Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull.

---

## 🧩 Từ khóa hôm nay

### git pull
- **Nói dễ hiểu**: Lệnh tải mã nguồn mới từ máy chủ về và tự động gộp ngay vào nhánh bạn đang đứng.
- **Ví dụ**: `git pull origin main` để lấy toàn bộ commit mới của đồng nghiệp trên GitHub về máy.
- **Đừng nhầm**: Không phải một lệnh nguyên tử đơn lẻ; bản chất lệnh là chạy `git fetch` rồi đến `git merge`.

### git pull --rebase
- **Nói dễ hiểu**: Chiến lược gộp code bằng cách đưa các commit riêng của bạn lên trên đỉnh các commit mới kéo về.
- **Ví dụ**: `git pull --rebase origin main` giúp tránh sinh commit gộp rác và giữ nhánh thẳng tắp.
- **Đừng nhầm**: Không xóa code của bạn; Git chỉ tạm thời gỡ commit cá nhân ra và đắp lại sau.

### pull conflict
- **Nói dễ hiểu**: Xung đột xảy ra khi bạn và đồng nghiệp cùng sửa trên cùng một dòng code trong cùng một file.
- **Ví dụ**: Đồng nghiệp sửa hàm login trên server, bạn cũng sửa hàm login ở máy và chạy git pull.
- **Đừng nhầm**: Không phải lỗi làm hỏng dự án; Git chỉ dừng lại yêu cầu bạn xác nhận giữ phiên bản nào.

---

## 📖 Định nghĩa
`git pull` là câu lệnh tổng hợp trong Git, kết hợp hai thao tác liên tiếp: đầu tiên thực hiện `git fetch` để tải các commit mới nhất từ máy chủ, sau đó chạy `git merge` để tự động gộp những commit đó vào nhánh hiện tại trong Working Directory.

---

## 💡 Tại sao cần
Khi làm việc nhóm, các thành viên liên tục đẩy code mới lên máy chủ chung. Lệnh `git pull` giúp bạn cập nhật tiến độ dự án mỗi ngày, đảm bảo bạn đang phát triển tính năng mới dựa trên phiên bản mới nhất và giảm thiểu nguy cơ xung đột lớn về sau.

---

## 🧠 Mental Model
Nếu `git fetch` là nhân viên bưu tá đặt kiện hàng vào hòm thư trước cổng, thì `git pull` là bạn tự ra mở hòm thư, mang gói hàng vào phòng khách và bày lên bàn làm việc. Nếu trong gói hàng có món đồ trùng vị trí trên bàn, bạn sẽ dừng lại sắp xếp cho ngăn nắp.

---

## 📊 Sơ đồ minh họa
```text
Bản chất hai pha của câu lệnh git pull:
┌────────────────────────────────────────────────────────┐
│                      git pull                          │
│  ┌───────────────────────┐   ┌───────────────────────┐  │
│  │ 1. git fetch origin   │ + │ 2. git merge FETCH_HEAD│  │
│  └───────────────────────┘   └───────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 🏢 Ví dụ thực tế
Sáng thứ Hai, kỹ sư Hoàng mở dự án trên máy cá nhân. Nhánh main của Hoàng đang ở commit C2, trong khi đồng nghiệp đã đẩy C3, C4 lên GitHub. Hoàng chạy `git pull origin main`. Git lập tức tải C3, C4 về và tua nhanh con trỏ nhánh lên C4. Toàn bộ tính năng mới xuất hiện trong editor của Hoàng chỉ sau 2 giây mà không cần thao tác thủ công.

---

## 💻 Command & Cú pháp
```bash
git pull
git pull origin <tên-nhánh>
git pull --rebase
git pull --ff-only
```

---

## 🔍 Giải thích command
- `git pull`: Kéo và gộp dữ liệu từ nhánh theo dõi mặc định trên remote vào nhánh hiện tại.
- `git pull origin <nhánh>`: Chỉ định cụ thể tên remote và tên nhánh cần kéo về gộp.
- `git pull --rebase`: Gộp code theo chiến lược rebase, đặt commit cục bộ lên đỉnh lịch sử mới tải về.
- `git pull --ff-only`: Chỉ cho phép kéo về nếu có thể tua nhanh (Fast-forward), từ chối gộp nếu có phân kỳ lịch sử.

---

## ⚠️ Sai lầm phổ biến
1. **Pull khi Working Directory còn thay đổi dở dang**: Git có thể từ chối gộp đè lên file chưa commit; nên commit hoặc cất vào stash trước khi pull.
2. **Quên rằng pull là fetch cộng merge**: Dẫn đến bối rối khi thấy xuất hiện merge commit ngoài ý muốn hoặc gặp conflict.
3. **Kéo nhầm nhánh khác vào nhánh đang đứng**: Gõ `git pull origin develop` khi đang đứng ở `main` sẽ làm gộp mã nguồn develop vào main.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác kéo cập nhật từ remote và kiểm tra lịch sử commit.
1. Đứng tại nhánh `main` và kiểm tra trạng thái sạch sẽ bằng `git status`.
2. Thực hiện câu lệnh `git pull origin main` để cập nhật mã nguồn mới nhất.
3. Quan sát thông báo Git tự động thực hiện hai bước fetch và merge.
4. Kiểm tra lại nhật ký lịch sử bằng `git log --oneline -n 3` để xác nhận commit mới đã tích hợp.

---

## 💡 Hint & mẹo
> Tập thói quen chạy `git pull` vào đầu mỗi buổi làm việc trước khi bắt tay vào viết dòng code mới.

---

## ✅ Validation & Kết quả mong đợi
- Lịch sử commit trên nhánh cục bộ bắt kịp commit mới nhất trên remote.
- Trạng thái `git status` báo `Your branch is up to date with 'origin/main'`.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về bản chất hai pha của git pull.

---

## 🚀 Thử thách nâng cao
Cấu hình Git tự động rebase mỗi khi pull bằng lệnh `git config --global pull.rebase true` và quan sát cây lịch sử commit sau khi thực hiện.

---

## 📝 Tổng kết
- `git pull` = `git fetch` (tải về) kết hợp với `git merge` (gộp vào).
- Giúp đồng bộ mã nguồn mới nhất từ máy chủ vào thẳng Working Directory.
- Sử dụng `--rebase` khi muốn giữ lịch sử commit dạng một đường thẳng tinh gọn.
