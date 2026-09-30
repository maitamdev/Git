# Đồng bộ và gộp code với git pull

---

## 🎯 Mục tiêu
- Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.
- Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.
- Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.
- Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull.

---

## 📖 Định nghĩa
> `git pull` là câu lệnh tiện ích tổng hợp trong Git, kết hợp hai thao tác liên tiếp vào trong một bước duy nhất: đầu tiên nó thực thi `git fetch` để tải về toàn bộ các commit mới nhất từ máy chủ từ xa, sau đó ngay lập tức thực thi `git merge` để tự động gộp các commit mới đó vào nhánh cục bộ mà bạn đang đứng làm việc. Nếu hai bên cùng sửa các dòng code mâu thuẫn, quá trình pull sẽ dừng lại và yêu cầu giải quyết conflict.

---

## 🤔 Tại sao cần?
Trong quy trình làm việc hàng ngày, `git pull` là câu lệnh đầu tiên bạn gõ mỗi sáng khi mở máy tính bắt đầu ngày làm việc mới, nhằm bảo đảm mã nguồn trên máy cá nhân luôn bắt kịp tiến độ mới nhất của toàn đội ngũ. Nắm vững bản chất hai pha (fetch + merge) của lệnh pull giúp bạn tự tin xử lý mọi xung đột phát sinh và biết cách cấu hình pull rebase để giữ lịch sử dự án luôn thẳng thớm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung nếu `git fetch` là việc nhân viên bưu tá đem gói bưu phẩm đặt vào chiếc hộp thư trước cửa nhà bạn, thì `git pull` là việc bạn tự động cầm chìa khóa ra mở hộp thư, bưng gói bưu phẩm vào phòng khách và mở toang bưu phẩm ra trộn chung vào bàn làm việc của bạn. Hành động này rất tiện lợi và nhanh chóng, nhưng nếu trong bưu phẩm có đồ vật trùng lặp với thứ bạn đang cầm trên tay, bạn sẽ phải dừng lại sắp xếp.

---

## 🖼 Sơ đồ
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

## 🌎 Ví dụ thực tế
Đầu giờ sáng thứ Hai, kỹ sư Hoàng mở dự án phần mềm trên máy tính cá nhân. Nhánh main của Hoàng đang ở commit C2. Trong hai ngày cuối tuần, các đồng nghiệp đã hoàn thành tính năng thông báo và đẩy các commit C3, C4 lên GitHub. Hoàng gõ lệnh: `git pull origin main`. Git lập tức tải hai commit C3, C4 về và tự động thực hiện Fast-forward merge đưa con trỏ nhánh main của Hoàng lên mốc C4. Toàn bộ mã nguồn mới nhất xuất hiện ngay trong VS Code của Hoàng chỉ sau 2 giây mà không phát sinh thêm bất kỳ thao tác thủ công nào.

---

## 💻 Command
```bash
git pull
git pull origin <tên-nhánh>
git pull --rebase
git pull --ff-only
```

---

## 🔍 Giải thích command
- `git pull`: Kéo và gộp dữ liệu từ nhánh upstream tương ứng được cấu hình mặc định.
- `git pull origin <nhánh>`: Chỉ định rõ ràng remote và tên nhánh cần kéo về gộp vào nhánh hiện tại.
- `git pull --rebase`: Thay vì tạo Merge Commit, Git sẽ rebase các commit cục bộ của bạn lên trên đỉnh của commit mới kéo về, giữ lịch sử tuyến tính.
- `git pull --ff-only`: Chỉ cho phép pull nếu có thể tua nhanh (Fast-forward), từ chối pull nếu phát sinh phân kỳ lịch sử.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy git pull khi Working Directory đang có nhiều thay đổi dở dang chưa commit**:  Có thể bị Git từ chối hoặc gây xung đột phức tạp; nên commit hoặc stash trước.
2. **Mù quáng dùng git pull mà không hiểu nó là fetch + merge**:  Gây bối rối khi bỗng nhiên thấy xuất hiện một Merge Commit lạ hoặc bị dính conflict.
3. **Kéo nhầm nhánh khác vào nhánh hiện tại**:  Gõ `git pull origin develop` khi đang đứng ở `main` sẽ làm gộp develop vào main.

---

## 🧪 Lab
1. Đứng tại nhánh `main` và kiểm tra trạng thái bằng `git status`.
2. Thực hiện câu lệnh `git pull origin main` để cập nhật mã nguồn mới nhất.
3. Quan sát Git thực hiện tự động fetch và merge.
4. Kiểm tra lại nhật ký lịch sử bằng `git log --oneline -n 3` để xác nhận commit mới đã tích hợp.

---

## 💡 Hint
> Luôn giữ thói quen `git pull` đầu ngày làm việc trước khi bắt tay vào viết dòng code mới.

---

## ✅ Validation
- Nhánh cục bộ đồng bộ thành công với nhánh remote và Working Tree cập nhật sạch sẽ.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git pull.

---

## 🔥 Challenge
Nêu ưu điểm của cấu hình `git config --global pull.rebase true` đối với việc giữ lịch sử dự án tinh gọn.

---

## 📚 Tổng kết
- `git pull` = `git fetch` (tải về) + `git merge` (gộp vào).
- Đồng bộ mã nguồn từ GitHub vào thẳng Working Directory của bạn.
- Sử dụng `--rebase` để giữ lịch sử là một đường thẳng đẹp mắt.
