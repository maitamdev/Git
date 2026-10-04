# Hủy merge đang dở bằng `git merge --abort`

---

## 🎯 Mục tiêu
- Nhận biết chính xác trạng thái kho mã nguồn khi một tiến trình hợp nhất đang bị nghẽn (Merge in progress).
- Sử dụng thành thạo phanh khẩn cấp `git merge --abort` để rút lui an toàn khỏi các xung đột ngoài ý muốn.
- Thấu hiểu tầm quan trọng của việc giữ sạch thư mục làm việc trước khi thực hiện bất kỳ lệnh merge nào.

---

## 🧩 Từ khóa hôm nay

### `git merge --abort` — hủy merge
- **Nói dễ hiểu:** Nút phanh khẩn cấp giúp hủy bỏ hoàn toàn lần gộp nhánh đang dở dang và đưa thư mục làm việc về vị trí trước khi merge.
- **Ví dụ:** Vừa chạy `git merge` thấy conflict quá nhiều, gõ ngay `git merge --abort` để quay xe an toàn.
- **Đừng nhầm:** Lệnh chỉ có hiệu lực khi tiến trình merge đang diễn ra dở dang; nếu bạn đã commit xong mốc merge thì lệnh này vô tác dụng.

### Merge in progress — merge đang diễn ra
- **Nói dễ hiểu:** Trạng thái lơ lửng của kho mã nguồn khi Git đã bắt đầu ghép nhánh nhưng dừng lại chờ người xử lý conflict.
- **Ví dụ:** Khi `git status` hiển thị dòng thông báo `You have unmerged paths. (fix conflicts and run "git commit")`.
- **Đừng nhầm:** Bạn không thể chuyển nhánh hay thực hiện các thao tác git thông thường khác chừng nào chưa giải quyết xong hoặc abort trạng thái này.

### Pre-merge changes — thay đổi có trước merge
- **Nói dễ hiểu:** Những dòng code bạn sửa dở dang ở thư mục làm việc mà chưa kịp add hoặc commit trước khi bấm lệnh merge.
- **Ví dụ:** Bạn đang sửa dở file `notes.txt` chưa commit mà đã vội vàng chạy lệnh `git merge`.
- **Đừng nhầm:** Git có thể không khôi phục được các thay đổi dở dang này khi abort; vì vậy luôn commit hoặc stash sạch sẽ trước khi merge.

---

## 📖 Định nghĩa
`git merge --abort` là phanh khẩn cấp trong Git, cho phép bạn lập tức chấm dứt một tiến trình hợp nhất đang bị nghẽn do xung đột và hoàn nguyên toàn bộ thư mục làm việc trở về trạng thái sạch sẽ ngay trước khoảnh khắc bạn gõ lệnh merge. Lệnh này cứu bạn thoát khỏi những tình huống gộp nhầm nhánh hoặc khi xung đột quá phức tạp cần tạm dừng để trao đổi.

---

## 🤔 Tại sao cần?
Trong thực tế, không phải lúc nào bạn cũng sẵn sàng gỡ conflict ngay lập tức: bạn phát hiện mình vừa merge nhầm nhánh thử nghiệm của một thực tập sinh thay vì nhánh phát hành, hoặc conflict xuất hiện trên cả trăm tệp tin phức tạp vượt ngoài tầm kiểm soát cá nhân. Thay vì loay hoay sửa bừa làm hỏng mã nguồn, `git merge --abort` đưa bạn về vị trí xuất phát an toàn trong một giây.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang chuẩn bị ghép hai mảnh ghép hình lại với nhau nhưng phát hiện các rãnh khớp bị cấn nghiêm trọng (conflict). Thay vì dùng búa đập gãy các mấu để ép chúng dính vào nhau, bạn chỉ cần buông tay đặt hai mảnh ghép trở lại vị trí ban đầu trên bàn. Đó chính xác là nút bấm 'Ctrl+Z tối cao' mang tên `git merge --abort`.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ RÚT LUI AN TOÀN CỦA GIT MERGE --ABORT:

Trạng thái ban đầu: Nhánh main sạch sẽ, ổn định
        │
        ▼  Chạy lệnh: `git merge feature-nhầm`
Bị kẹt giữa chừng: Merge in progress (Xung đột markers chèn vào file)
        │
        ▼  Chạy lệnh: `git merge --abort`
Hoàn nguyên 100%:  Trở về chính xác trạng thái sạch sẽ của main trước merge!
```

---

## 🌎 Ví dụ thực tế
Đang đứng ở `main`, bạn định merge `feature/payment-v2` nhưng gõ nhầm thành `experiment/blockchain-test`. Git lập tức báo lỗi conflict ở 15 tệp tin. Bạn giật mình nhận ra đã chọn nhầm nhánh. Không cần hoảng loạn, bạn chỉ việc gõ `git merge --abort`: mọi vết tích xung đột biến mất và `main` trở lại nguyên vẹn như cũ.

---

## 💻 Command
```bash
git status
git merge --abort
git status
```

---

## 🔍 Giải thích command
- `git status` (trước khi abort): Giúp bạn xác nhận chắc chắn rằng repo đang ở trạng thái merge dở dang.
- `git merge --abort`: Hủy bỏ giao dịch hợp nhất, dọn sạch toàn bộ các tệp unmerged và xóa các marker xung đột.
- `git status` (sau khi abort): Kiểm chứng lại kết quả; terminal phải thông báo thư mục làm việc đã sạch sẽ hoàn toàn.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy abort khi không có merge nào đang diễn ra**: Git sẽ báo lỗi "fatal: There is no merge to abort".
2. **Lầm tưởng abort sẽ xóa bỏ nhánh tính năng**: Lệnh chỉ dừng thao tác gộp; nhánh tính năng và các commit của nó vẫn an toàn 100%.
3. **Chủ quan để code chưa commit trước khi merge**: Git có thể không cứu lại được các dòng code nháp bạn gõ trước khi chạy merge.

---

## 🧪 Lab
1. Tạo tệp `abort-demo.txt` trên `main` với nội dung `Trạng thái: ban đầu`, rồi add và commit.
2. Tạo nhánh mới `git switch -c feature-abort`, sửa dòng đó thành `Trạng thái: tính năng`, rồi add và commit.
3. Quay về `git switch main`, sửa cùng dòng thành `Trạng thái: bản chính`, rồi add và commit.
4. Chạy `git merge feature-abort` để cố ý kích hoạt xung đột.
5. Kiểm tra `git status` thấy đang có merge dở dang, sau đó gõ: `git merge --abort`.
6. Chạy lại `git status` và mở file `abort-demo.txt` để kiểm chứng nội dung đã trở về nguyên trạng `Trạng thái: bản chính`.

---

## 💡 Hint
> Khi gặp xung đột mà bạn chưa nắm rõ logic của đồng đội, hãy gõ `git merge --abort` để quay về điểm an toàn trước khi trao đổi trực tiếp!

---

## ✅ Validation
- Lệnh `git merge --abort` khôi phục thư mục làm việc về trạng thái sạch sẽ ban đầu.
- Tệp `abort-demo.txt` không còn bất kỳ dấu vết nào của conflict markers.
- Nhánh `feature-abort` vẫn tồn tại nguyên vẹn trong danh sách `git branch`.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về thời điểm sử dụng và phạm vi phục hồi của lệnh git merge --abort.

---

## 🔥 Challenge
Giả sử bạn đã lỡ tay gỡ xung đột, chạy `git add` và đã gõ `git commit` hoàn tất mốc merge commit rồi. Lúc này lệnh `git merge --abort` còn có tác dụng không? Nếu không, bạn phải dùng vũ khí nào để quay ngược lại thời điểm trước merge?

---

## 📚 Tổng kết
- `git merge --abort` là công cụ cứu cánh giúp hủy bỏ tiến trình gộp nhánh đang bị tắc nghẽn.
- Đưa mã nguồn trở lại chính xác trạng thái trước khi thực hiện merge.
- Luôn giữ thói quen commit sạch sẽ trước khi merge để đảm bảo không bị thất lạc dữ liệu.
