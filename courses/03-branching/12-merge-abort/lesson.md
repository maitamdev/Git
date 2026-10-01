# Hủy bỏ quá trình merge với git merge --abort

---

## 🎯 Mục tiêu
- Hiểu rõ cơ chế hoạt động của lệnh cứu hộ `git merge --abort`.
- Nhận biết các tình huống nên chủ động hủy bỏ quá trình gộp nhánh.
- Khôi phục thư mục làm việc và con trỏ HEAD về chính xác trạng thái an toàn trước khi merge.

---

## 🧩 Từ khóa hôm nay

### git merge --abort — phanh khẩn cấp khi merge
- **Nói dễ hiểu:** Câu lệnh hủy ngay quá trình gộp nhánh đang dở dang và đưa dự án về trạng thái an toàn ban đầu.
- **Ví dụ:** Bạn lỡ gộp nhầm nhánh hoặc thấy có quá nhiều xung đột phức tạp, gõ `git merge --abort` để quay lại.
- **Đừng nhầm:** Lệnh này chỉ chạy được khi đang có xung đột merge dở; bình thường gõ sẽ báo không có merge nào để hủy.

### MERGE_HEAD — tệp đánh dấu đang gộp nhánh
- **Nói dễ hiểu:** Tệp nội bộ do Git tự sinh ra trong `.git/` để ghi nhớ commit của nhánh đang được gộp vào.
- **Ví dụ:** Khi đang gặp conflict, sự tồn tại của tệp này giúp Git biết tiến trình hợp nhất chưa kết thúc.
- **Đừng nhầm:** Bạn không cần đụng vào tệp này; Git tự tạo khi bắt đầu merge và tự xóa khi bạn hoàn tất hoặc abort.

### Working Tree Clean — trạng thái sạch sẽ
- **Nói dễ hiểu:** Trạng thái thư mục làm việc không còn tệp nào sửa dở, không còn vạch xung đột và sẵn sàng làm việc tiếp.
- **Ví dụ:** Sau khi chạy `git merge --abort`, `git status` báo `nothing to commit, working tree clean`.
- **Đừng nhầm:** Sạch sẽ ở đây có nghĩa là không có thay đổi chưa lưu, không hề làm mất các commit cũ của bạn.

---

## 📖 Định nghĩa
`git merge --abort` là lệnh cứu hộ trong Git cho phép bạn lập tức hủy bỏ quá trình hợp nhất đang diễn ra dở dang khi gặp xung đột. Lệnh này sẽ tự động xóa sạch các vạch đánh dấu xung đột và khôi phục toàn bộ thư mục làm việc trở về đúng trạng thái trước khi bạn chạy lệnh merge.

---

## 🤔 Tại sao cần?
Đôi khi bạn gõ nhầm tên nhánh, hoặc khi mở tệp xung đột ra thì thấy quá nhiều dòng code lạ mà mình không nắm rõ. Thay vì sửa bừa làm hỏng code của cả nhóm, bạn chỉ cần gõ `git merge --abort` để quay lại vạch xuất phát an toàn, trao đổi với đồng đội rồi mới tiến hành merge lại sau.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git merge --abort` giống như nút bấm "Hủy giao dịch" trên cây ATM. Khi bạn đưa thẻ vào và lỡ bấm nhầm ngôn ngữ hoặc số tiền quá lớn, bạn không cần phải rút phích cắm điện của cây ATM; bạn chỉ việc bấm nút Hủy giao dịch để chiếc máy nhả thẻ ra nguyên vẹn và kết thúc phiên làm việc an toàn.

---

## 🖼 Sơ đồ
```text
Cơ chế quay lui của git merge --abort:
Trạng thái A (Sạch sẽ) ──(git merge)──> Trạng thái Conflict (Dở dang)
        ▲                                          │
        └─────────── git merge --abort ────────────┘
         (Phục hồi nguyên vẹn trạng thái A ban đầu)
```

---

## 🌎 Ví dụ thực tế
Bạn Tuấn định gộp nhánh `fix-button` vào `main`, nhưng gõ nhầm thành `git merge feature-huge-database`. Màn hình lập tức báo xung đột ở hơn 30 tệp tin. Biết mình đã gộp nhầm nhánh thử nghiệm dở dang của đồng nghiệp, Tuấn không hề hoảng sợ mà gõ ngay: `git merge --abort`. Ngay lập tức, toàn bộ các tệp xung đột biến mất, nhánh `main` trở lại sạch sẽ như cũ, sẵn sàng để Tuấn gõ lại lệnh merge nhánh đúng.

---

## 💻 Command
```bash
git merge --abort
git status
```

---

## 🔍 Giải thích command
- `git merge --abort`: Hủy bỏ hoàn toàn tiến trình merge đang dở dang và đưa dự án về trạng thái trước khi merge.
- `git status`: Kiểm tra lại trạng thái để xác nhận kho lưu trữ đã trở về trạng thái sạch sẽ hoàn toàn.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy abort khi không có merge nào đang dở:** Git sẽ báo lỗi `fatal: There is no merge to abort`.
2. **Dùng `git reset --hard` thay vì `git merge --abort`:** Dù có thể cùng dọn sạch nhưng `git merge --abort` an toàn và chuyên trách hơn.
3. **Cố chấp ngồi sửa hàng chục xung đột khi gộp nhầm nhánh:** Hãy abort ngay để tiết kiệm thời gian và tránh đưa nhầm code vào nhánh chính.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Nhận thấy kho lưu trữ đang ở trạng thái xung đột sau lệnh merge.
2. Kiểm tra trạng thái bằng `git status` để thấy thông báo merge dở dang.
3. Chạy câu lệnh cứu hộ `git merge --abort`.
4. Chạy lại `git status` và xác nhận dòng chữ `nothing to commit, working tree clean`.

---

## 💡 Hint
Bất cứ khi nào bạn cảm thấy quá tải hoặc nghi ngờ mình gộp nhầm nhánh, hãy dùng `git merge --abort` để quay lại an toàn.

---

## ✅ Validation
- Trạng thái kho lưu trữ trở về sạch sẽ (`working tree clean`).
- Các vạch đánh dấu xung đột trong tệp hoàn toàn biến mất.

---

## ❓ Quiz
Trả lời các câu hỏi sau để nắm vững cách dùng lệnh cứu hộ `git merge --abort`.

---

## 🔥 Challenge
Giải thích vì sao lệnh `git merge --abort` lại có thể đưa thư mục làm việc về đúng trạng thái ban đầu mà không làm mất commit cũ nào.

---

## 📚 Tổng kết
- `git merge --abort` là chiếc phanh khẩn cấp giúp hủy bỏ quá trình gộp nhánh khi gặp xung đột.
- Khôi phục thư mục làm việc và con trỏ HEAD về mốc an toàn trước khi gõ lệnh merge.
- Giúp bạn tự tin thao tác và thử nghiệm merge mà không sợ làm hỏng dự án.
