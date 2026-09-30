# git reflog

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất của Reference Logs (`reflog`) như nhật ký ghi lại mọi chuyển động của con trỏ HEAD.
- Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).
- Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.
- Nhận thức tầm quan trọng của reflog như chiếc lưới an toàn tối hậu giúp khôi phục mọi sai lầm trong Git.

---

## 📖 Định nghĩa
> `git reflog` (viết tắt của Reference Logs - Nhật ký tham chiếu) là một cơ chế ghi chép nội bộ cực kỳ mạnh mẽ của Git trên máy tính cá nhân của bạn. Trong khi `git log` chỉ hiển thị cây gia phả commit của nhánh hiện tại, `git reflog` hoạt động như một cuốn "hộp đen máy bay" ghi lại không sót một hành động nào làm dịch chuyển các con trỏ tham chiếu (HEAD, branches), bao gồm commit, chuyển nhánh (checkout/switch), reset, rebase, merge và cherry-pick.

---

## 🤔 Tại sao cần?
Hầu như mọi lập trình viên đều có ít nhất một lần hoảng loạn tột độ khi lỡ tay gõ `git reset --hard` nhầm hoặc xóa nhầm một nhánh tính năng quan trọng và nghĩ rằng toàn bộ công sức của mình đã tan thành mây khói. `git reflog` chính là phép màu cứu rỗi: trong Git, dữ liệu hiếm khi bị xóa ngay lập tức. Miễn là bạn đã từng commit, mã hash của commit đó chắc chắn vẫn được lưu lại trong reflog, sẵn sàng để bạn hồi sinh.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung cuốn nhật ký hành trình của một nhà thám hiểm. `git log` giống như cuốn sách lịch sử chính thức chỉ in lại những cột mốc vinh quang lớn (các commit còn nằm trên nhánh). Còn `git reflog` giống như thiết bị định vị GPS cá nhân gắn trên người nhà thám hiểm: nó ghi lại từng bước chân lùi, bước chân tiến, bước rẽ trái, rẽ phải, thậm chí cả lúc nhà thám hiểm lỡ bước chân xuống hố rồi trèo lên. Bất kể bạn đã đi đâu, GPS đều lưu lại tọa độ chính xác.

---

## 🖼 Sơ đồ
```text
Sự khác biệt giữa git log và git reflog:
git log:    Chỉ nhìn thấy các commit còn kết nối trong nhánh hiện tại.
            C1 ──► C2 (mất dấu C3 vì đã lỡ reset --hard về C2)

git reflog: Ghi nhận mọi sự kiện di chuyển của HEAD:
            HEAD@{0}: reset: moving to HEAD~1
            HEAD@{1}: commit: feat: awesome feature (C3 - Tọa độ còn nguyên!)
            HEAD@{2}: commit: fix: minor bug (C2)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Huy sau một đêm thức trắng đã lỡ tay gõ câu lệnh tai họa: `git reset --hard HEAD~5` khiến 5 commit quan trọng vừa làm suốt cả buổi tối biến mất hoàn toàn khỏi màn hình hiển thị của lệnh `git log`. Huy toát mồ hôi lạnh nhưng nhanh chóng nhớ đến chiếc hộp đen vạn năng của Git. Huy mở terminal và gõ: `git reflog`. Dòng thứ hai của kết quả in rõ ràng: `7a8b9c0 HEAD@{1}: commit: feat: payment integration`. Huy reo lên vui sướng vì tọa độ commit đỉnh vẫn còn nguyên vẹn trong cơ sở dữ liệu ngầm. Huy chỉ việc gõ `git reset --hard HEAD@{1}` và toàn bộ 5 commit cùng mã nguồn lập tức sống dậy trọn vẹn như chưa từng có sự cố.

---

## 💻 Command
```bash
git reflog
git reflog show HEAD
git reflog show <tên-nhánh>
git reflog --date=relative
```

---

## 🔍 Giải thích command
- `git reflog`: Hiển thị danh sách các lần dịch chuyển gần nhất của con trỏ HEAD kèm theo chỉ số index.
- `git reflog show HEAD`: Cú pháp tường minh tương đương với lệnh reflog cơ bản.
- `git reflog show <nhánh>`: Xem lịch sử dịch chuyển con trỏ của một nhánh cụ thể thay vì HEAD.
- `git reflog --date=relative`: Hiển thị mốc thời gian tương đối như mười phút trước hoặc hai giờ trước.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng reflog tồn tại vĩnh viễn**:  Reflog có hạn sử dụng (mặc định 90 ngày cho commit tiếp cận được và 30 ngày cho commit mồ côi) trước khi bị dọn dẹp bởi git gc.
2. **Tìm kiếm reflog trên GitHub**:  Reflog là dữ liệu cục bộ riêng tư trên máy của bạn, không bao giờ được push lên server.
3. **Không biết rằng tệp chưa commit thì không thể cứu bằng reflog**:  Chỉ những gì đã từng commit mới có dấu vết trong reflog.

---

## 🧪 Lab
1. Tạo 2 commit mới liên tiếp trong kho chứa bài tập.
2. Chạy lệnh `git reflog` và quan sát các dòng ghi nhận sự kiện commit kèm thông điệp.
3. Thử chuyển sang một nhánh khác rồi quay lại, sau đó chạy lại `git reflog`.
4. Quan sát các sự kiện chuyển đổi nhánh checkout moving from branch to branch được ghi lại chi tiết.

---

## 💡 Hint
> Mỗi khi làm mất commit, câu lệnh đầu tiên bạn phải nghĩ đến luôn luôn là `git reflog`.

---

## ✅ Validation
- Đọc hiểu tường tận các thông số trong bảng reflog và xác định đúng mã hash commit cần tìm.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ cứu hộ git reflog.

---

## 🔥 Challenge
Cơ chế Garbage Collection (`git gc`) dọn dẹp các commit mồ côi (dangling commits) trong reflog sau thời gian bao lâu?

---

## 📚 Tổng kết
- `git reflog` là hộp đen ghi lại mọi sự kiện dịch chuyển của HEAD và các nhánh.
- Dữ liệu reflog mang tính cục bộ riêng tư trên máy cá nhân, không chia sẻ qua remote.
- Là nền tảng cốt lõi để khôi phục các commit bị mất do reset, checkout hoặc xóa nhánh.
