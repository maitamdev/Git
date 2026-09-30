# Hủy bỏ quá trình merge với git merge --abort

---

## 🎯 Mục tiêu
- Hiểu rõ cơ chế hoạt động của lệnh cứu hộ khẩn cấp `git merge --abort`.
- Nhận biết các tình huống thực tế nên chủ động hủy bỏ quá trình merge.
- Khôi phục Working Tree và con trỏ HEAD về chính xác trạng thái sạch sẽ trước khi merge.
- Tự tin xử lý tình huống merge nhầm nhánh mà không làm hỏng dữ liệu.

---

## 📖 Định nghĩa
> `git merge --abort` là câu lệnh cứu hộ chuyên dụng được thiết kế như một chiếc phanh khẩn cấp trong Git, cho phép bạn ngay lập tức hủy bỏ toàn bộ quá trình hợp nhất đang diễn ra dở dang (khi gặp conflict hoặc khi nhận ra mình đã merge nhầm nhánh). Lệnh này sẽ tự động dọn dẹp sạch sẽ tất cả các vạch đánh dấu xung đột, loại bỏ các tệp tin tạm thời và khôi phục toàn bộ trạng thái của Working Tree, Staging Area và con trỏ HEAD trở về chính xác mốc an toàn trước khi bạn gõ lệnh `git merge`.

---

## 🤔 Tại sao cần?
Trong thực tế, không ít lần bạn gõ nhầm lệnh merge một nhánh không liên quan, hoặc khi mở các tệp xung đột ra thì phát hiện có hàng trăm khối conflict phức tạp vượt quá khả năng xử lý tức thời của bạn. Thay vì hoảng loạn chỉnh sửa lung tung làm hỏng thêm mã nguồn, bạn chỉ cần gõ một câu lệnh `git merge --abort` duy nhất để đưa mọi thứ quay trở lại vạch xuất phát an toàn 100% trong một phần nghìn giây.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung lệnh `git merge --abort` giống như nút bấm "Hủy giao dịch" (Cancel Transaction) trên cây rút tiền tự động ATM, hoặc phím Escape (Esc) khẩn cấp trên bàn phím. Khi bạn đưa thẻ vào máy và lỡ bấm nhầm ngôn ngữ hoặc bấm nhầm số tiền rút quá lớn, bạn không cần phải rút phích cắm điện của cây ATM, mà chỉ việc bấm nút Hủy giao dịch để chiếc máy nhả thẻ ra nguyên vẹn và kết thúc phiên làm việc an toàn.

---

## 🖼 Sơ đồ
```text
Cơ chế quay lui của git merge --abort:
Trạng thái A (Sạch sẽ) ──(git merge)──► Trạng thái Conflict (Dở dang)
        ▲                                          │
        └─────────── git merge --abort ────────────┘
         (Phục hồi nguyên vẹn trạng thái A ban đầu)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Tuấn đang đứng ở nhánh main định merge nhánh bugfix-login, nhưng do sơ suất gõ nhầm tên nhánh nên đã gõ nhầm thành lệnh: `git merge feature-huge-refactor`. Màn hình console lập tức tràn ngập thông báo conflict ở hơn 40 tệp tin khác nhau với hàng ngàn dòng code mâu thuẫn phức tạp. Nhận thấy mình đã merge nhầm một nhánh thử nghiệm dở dang của đồng nghiệp vào nhánh ổn định, Tuấn không hề hoảng sợ mà bình tĩnh mở terminal gõ ngay: `git merge --abort`. Ngay lập tức trong một tích tắc, toàn bộ 40 tệp tin bị conflict biến mất hoàn toàn, nhánh main quay trở lại trạng thái sạch sẽ tinh tươm ban đầu, sẵn sàng để Tuấn gõ lại câu lệnh merge chính xác.

---

## 💻 Command
```bash
git merge --abort
git status
git merge --quit
```

---

## 🔍 Giải thích command
- `git merge --abort`: Hủy bỏ hoàn toàn tiến trình merge đang dở dang và phục hồi trạng thái trước khi merge.
- `git status`: Kiểm tra lại để xác nhận trạng thái kho lưu trữ đã trở về `working tree clean` sạch sẽ.
- `git merge --quit`: Hủy bỏ tiến trình merge nhưng giữ lại các thay đổi hiện tại trong Working Directory (ít dùng hơn abort).

---

## ⚠️ Sai lầm phổ biến
1. **Chạy git merge --abort khi không có tiến trình merge nào đang diễn ra**:  Git sẽ báo lỗi `fatal
2. **Sử dụng git reset --hard thay vì git merge --abort**:  Dù cùng khôi phục trạng thái nhưng `git merge --abort` chuyên trách và an toàn hơn nhiều.
3. **Cố chấp giải quyết hàng chục conflict khi merge nhầm nhánh**:  Thay vì tốn hàng giờ sửa nhầm, hãy abort ngay lập tức để quay lại ban đầu.

---

## 🧪 Lab
1. Tạo một xung đột merge có chủ đích giữa hai nhánh.
2. Quan sát thông báo conflict và kiểm tra trạng thái bằng `git status`.
3. Chạy câu lệnh cứu hộ `git merge --abort`.
4. Chạy lại `git status` và xác nhận mọi thứ đã trở về trạng thái sạch sẽ hoàn toàn.

---

## 💡 Hint
> Bất cứ khi nào bạn cảm thấy quá tải trước xung đột, hãy nhớ tới `git merge --abort`.

---

## ✅ Validation
- Khôi phục thành công dự án về trạng thái sạch sẽ trước khi merge.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về lệnh hủy bỏ merge git merge --abort.

---

## 🔥 Challenge
Nêu sự khác biệt giữa `git merge --abort` và `git merge --quit` trong Git.

---

## 📚 Tổng kết
- `git merge --abort` là phanh khẩn cấp để hủy bỏ quá trình merge đang gặp xung đột.
- Khôi phục hoàn toàn Working Tree và HEAD về mốc an toàn trước khi gõ lệnh merge.
- Giúp bạn tự tin thử nghiệm merge mà không sợ làm hỏng kho lưu trữ.
