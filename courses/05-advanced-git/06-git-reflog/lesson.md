# git reflog

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất của Reference Logs (`reflog`) như nhật ký ghi lại mọi chuyển động của con trỏ HEAD.
- Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).
- Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.
- Nhận thức tầm quan trọng của reflog như chiếc lưới an toàn tối hậu giúp khôi phục mọi sai lầm trong Git.

---

## 🧩 Từ khóa hôm nay

### git reflog
- **Nói dễ hiểu**: Cuốn sổ tay ghi lại mọi hành động di chuyển của con trỏ HEAD trên máy tính cá nhân của bạn.
- **Ví dụ**: Gõ `git reflog` để tìm lại mã hash của một commit vừa lỡ tay xóa bằng `git reset --hard`.
- **Đừng nhầm**: Không đồng bộ lên GitHub; đây là dữ liệu riêng tư 100% nằm trong thư mục `.git/logs/` trên máy bạn.

### HEAD@{n}
- **Nói dễ hiểu**: Ký hiệu định vị vị trí của HEAD cách đây `n` lần thao tác di chuyển.
- **Ví dụ**: `HEAD@{1}` là trạng thái của HEAD ngay trước câu lệnh vừa thực thi gần nhất.
- **Đừng nhầm**: Không phải chỉ số commit trên nhánh; đây là thứ tự các hành động lệnh bạn đã gõ trên máy.

### orphan commit
- **Nói dễ hiểu**: Commit bị tách rời khỏi nhánh và không còn nhánh nào trỏ tới sau khi bị reset hoặc xóa nhánh.
- **Ví dụ**: Commit C3 sau khi chạy `git reset --hard HEAD~1` bị mất dấu trong git log.
- **Đừng nhầm**: Chưa bị xóa vĩnh viễn ngay; Git vẫn giữ commit này trong kho ngầm ít nhất 30 ngày để bạn cứu lại.

---

## 📖 Định nghĩa
`git reflog` (Reference Logs - Nhật ký tham chiếu) là cơ chế ghi chép nội bộ cực kỳ mạnh mẽ của Git trên máy tính cá nhân. Trong khi `git log` chỉ hiển thị cây gia phả commit còn liên kết trên nhánh, `git reflog` hoạt động như một chiếc hộp đen ghi lại không sót bất kỳ hành động nào làm dịch chuyển con trỏ HEAD.

---

## 💡 Tại sao cần
Nhiều lập trình viên từng hoảng loạn khi lỡ tay gõ `git reset --hard` hoặc xóa nhầm nhánh tính năng và nghĩ rằng code đã mất vĩnh viễn. Trong Git, dữ liệu hiếm khi bị xóa ngay lập tức. Miễn là bạn đã từng tạo commit, mã hash của commit đó chắc chắn vẫn được lưu trong reflog, sẵn sàng để bạn hồi sinh.

---

## 🧠 Mental Model
Hãy hình dung `git log` như cuốn sử ký chính thức chỉ ghi lại các cột mốc vinh quang lớn (commit trên nhánh). Còn `git reflog` giống như thiết bị định vị GPS cá nhân gắn trên người bạn: nó ghi lại từng bước lùi, bước tiến, bước rẽ trái, thậm chí cả lúc bạn lỡ thụt chân xuống hố rồi trèo lên. Tọa độ bước chân luôn được lưu lại chính xác.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Kỹ sư Huy thức trắng đêm và lỡ tay gõ `git reset --hard HEAD~5`, khiến 5 commit vừa làm biến mất hoàn toàn khỏi `git log`. Nhớ đến chiếc hộp đen reflog, Huy gõ `git reflog`. Dòng thứ hai in rõ ràng: `7a8b9c0 HEAD@{1}: commit: feat: payment`. Huy gõ ngay `git reset --hard HEAD@{1}` và toàn bộ 5 commit cùng mã nguồn lập tức sống dậy nguyên vẹn như chưa từng có sự cố.

---

## 💻 Command & Cú pháp
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
1. **Nghĩ rằng reflog tồn tại vĩnh viễn**: Reflog có hạn sử dụng (mặc định 90 ngày cho commit tiếp cận được và 30 ngày cho commit mồ côi) trước khi bị dọn dẹp bởi git gc.
2. **Tìm kiếm reflog trên GitHub**: Reflog là dữ liệu cục bộ riêng tư trên máy của bạn, không bao giờ được push lên server.
3. **Nghĩ rằng file chưa commit có thể cứu bằng reflog**: Chỉ những gì đã từng commit thành snapshot mới có dấu vết trong reflog.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tra cứu nhật ký reflog trên terminal.
1. Tạo 2 commit mới liên tiếp trong kho chứa bài tập.
2. Chạy lệnh `git reflog` và quan sát các dòng ghi nhận sự kiện commit kèm thông điệp.
3. Thử chuyển sang một nhánh khác rồi quay lại, sau đó chạy lại `git reflog`.
4. Quan sát các sự kiện chuyển đổi nhánh checkout được ghi lại chi tiết.

---

## 💡 Hint & mẹo
> Mỗi khi lỡ tay làm mất commit hoặc nhánh, câu lệnh đầu tiên bạn phải nghĩ đến luôn luôn là `git reflog`.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git reflog` hiển thị danh sách các thao tác gần đây với mã SHA và vị trí `HEAD@{n}`.
- Xác định được mã hash của commit đã bị tách rời để chuẩn bị phục hồi.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ cứu hộ git reflog.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cơ chế dọn rác tự động của Git thông qua lệnh `git gc` và cách Git quản lý thời gian hết hạn của các bản ghi reflog.

---

## 📝 Tổng kết
- `git reflog` là hộp đen ghi lại mọi sự kiện dịch chuyển của HEAD và các nhánh.
- Dữ liệu reflog mang tính cục bộ riêng tư trên máy cá nhân, không chia sẻ qua remote.
- Là nền tảng cốt lõi để khôi phục các commit bị mất do reset, checkout hoặc xóa nhánh.
