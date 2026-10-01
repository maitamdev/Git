# git rebase

---

## 🎯 Mục tiêu
- Thực thi thành thạo câu lệnh `git rebase <upstream>` để đồng bộ nhánh tính năng với nhánh chính.
- Khắc cốt ghi tâm "Quy tắc vàng của Rebase" (The Golden Rule of Rebasing): Không bao giờ rebase trên nhánh công khai.
- Hiểu rõ quy trình xử lý khi cần cập nhật nhánh sau khi đã rebase bằng `git push --force-with-lease`.
- Định hình thói quen giữ lịch sử dự án luôn tinh gọn trước khi tạo Pull Request.

---

## 🧩 Từ khóa hôm nay

### git rebase <base>
- **Nói dễ hiểu**: Lệnh nhấc các commit riêng của nhánh tính năng đặt nối tiếp lên trên đỉnh mới nhất của nhánh đích.
- **Ví dụ**: `git rebase main` khi đang đứng ở nhánh `feature` để đón nhận các commit mới nhất từ main.
- **Đừng nhầm**: Tái tạo lại commit với mã hash mới; không giữ nguyên mã SHA cũ của nhánh tính năng.

### the golden rule of rebase
- **Nói dễ hiểu**: Quy tắc cấm kỵ: Tuyệt đối không bao giờ rebase trên các nhánh công khai dùng chung với người khác.
- **Ví dụ**: Không bao giờ gõ rebase khi đang đứng ở nhánh `main` hay nhánh develop chung của cả nhóm.
- **Đừng nhầm**: Chỉ dùng rebase trên nhánh tính năng cá nhân của riêng bạn trước khi mở Pull Request.

### --force-with-lease
- **Nói dễ hiểu**: Tùy chọn đẩy code cưỡng chế an toàn, chỉ cho phép ghi đè nếu remote chưa có ai khác đẩy commit mới chen ngang.
- **Ví dụ**: `git push --force-with-lease origin feat/login` sau khi vừa rebase nhánh cá nhân xong.
- **Đừng nhầm**: An toàn hơn nhiều so với `--force` mù quáng vốn xóa đè không cần kiểm tra.

---

## 📖 Định nghĩa
`git rebase <base-branch>` là câu lệnh tái cơ sở nhánh trong Git. Khi chạy trên nhánh tính năng, Git tìm commit tổ tiên chung, tạm lưu các commit riêng của tính năng ra bộ nhớ đệm, tua nhánh tính năng về commit mới nhất của nhánh cơ sở (ví dụ `main`), rồi lần lượt áp dụng từng commit lên đỉnh mới thành một chuỗi thẳng tắp.

---

## 💡 Tại sao cần
Nhánh tính năng của bạn liên tục bị tụt lại so với nhánh chính trong quá trình code. Nếu liên tục merge main vào nhánh tính năng, lịch sử sẽ bị ô nhiễm bởi các commit gộp rác. `git rebase` giúp cập nhật toàn bộ thay đổi mới từ main vào nhánh làm việc thanh lịch, giải quyết xung đột sớm và tạo PR sạch đẹp.

---

## 🧠 Mental Model
Hãy hình dung bạn đang xếp hàng thanh toán tại siêu thị với giỏ 3 món hàng (3 commit). Thu ngân mở thêm một quầy ưu tiên mới thông thoáng hơn (nhánh main vừa cập nhật). Bạn nhấc giỏ hàng sang đứng tiếp nối vào cuối dòng người của quầy mới (`git rebase`). Quá trình thanh toán diễn ra trơn tru mà không cản trở ai.

---

## 📊 Sơ đồ minh họa
```text
Quy trình 3 bước của git rebase main:
Bước 1: Tìm tổ tiên chung C và lưu tạm F1, F2 ra bộ đệm.
Bước 2: Dịch chuyển con trỏ feature tới vị trí M2 của main.
Bước 3: Lần lượt áp dụng F1 tạo thành F1', áp dụng F2 tạo thành F2'.

C ──► M1 ──► M2 (main)
                └──► F1' ──► F2' (feature sau khi rebase)
```

---

## 🏢 Ví dụ thực tế
Lập trình viên Thành đang phát triển nhánh `feat/dark-mode`. Nhánh `main` trên kho chứa đã có thêm 4 commit mới từ đồng nghiệp. Thành muốn cập nhật code mới trước khi mở PR nên mở terminal gõ: `git fetch origin`, sau đó chạy: `git rebase origin/main`. Git tự động tua nhánh của Thành đến commit mới nhất của main rồi cấy lần lượt các commit giao diện tối lên đỉnh.

---

## 💻 Command & Cú pháp
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease origin <tên-nhánh>
git rebase --abort
```

---

## 🔍 Giải thích command
- `git fetch origin`: Tải các commit mới nhất trên máy chủ về kho lưu trữ cục bộ.
- `git rebase origin/main`: Dời gốc nhánh hiện tại lên đỉnh của nhánh origin/main.
- `git push --force-with-lease`: Cập nhật nhánh lên server an toàn sau khi rebase (chỉ ghi đè nếu không có ai khác push chen ngang).
- `git rebase --abort`: Hủy bỏ hoàn toàn phiên rebase nếu gặp sự cố phức tạp và trở về trạng thái ban đầu.

---

## ⚠️ Sai lầm phổ biến
1. **Vi phạm Quy tắc vàng của Rebase**: Chạy rebase trên nhánh dùng chung như main hoặc develop khiến lịch sử của cả nhóm bị phá vỡ.
2. **Dùng git push --force bừa bãi**: Có nguy cơ xóa đè commit mới mà đồng nghiệp vừa đẩy lên cùng nhánh.
3. **Hoảng loạn khi Git tạm ngưng**: Git chỉ đang dừng lại chờ bạn xử lý xung đột dòng code nếu có; sửa xong chỉ cần gõ `git rebase --continue`.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành rebase nhánh tính năng lên main trên terminal.
1. Tạo nhánh `feat-rebase-demo` từ main và tạo 2 commit.
2. Chuyển về `main`, tạo 1 commit mới để làm phân kỳ lịch sử.
3. Chuyển lại sang nhánh `feat-rebase-demo`.
4. Chạy lệnh `git rebase main` và kiểm tra lịch sử bằng `git log --oneline --graph`.

---

## 💡 Hint & mẹo
> Ghi nhớ quy tắc vàng: Chỉ rebase trên nhánh cục bộ cá nhân, tuyệt đối không bao giờ rebase trên nhánh công khai dùng chung.

---

## ✅ Validation & Kết quả mong đợi
- Toàn bộ commit của nhánh tính năng được chuyển lên sau commit đỉnh của nhánh main.
- Cây lịch sử hiển thị thành một đường thẳng tuyến tính đẹp mắt.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git rebase và quy tắc vàng.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách cấu hình tự động bảo vệ nhánh trên GitHub để ngăn chặn mọi hành vi push force hoặc rebase lên nhánh `main`.

---

## 📝 Tổng kết
- `git rebase` đưa các commit của nhánh tính năng lên đỉnh mới nhất của nhánh cơ sở.
- Quy tắc vàng: Tuyệt đối không bao giờ rebase trên các nhánh công khai dùng chung.
- Luôn ưu tiên sử dụng `git push --force-with-lease` sau khi rebase nhánh cá nhân lên remote.
