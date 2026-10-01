# Hợp nhất khi hai nhánh đã phân kỳ (3-way merge)

---

## 🎯 Mục tiêu
- Giải thích vai trò của tổ tiên chung, nhánh hiện tại và nhánh nguồn.
- Nhận biết khi hai nhánh có commit riêng thì cần hợp nhất ba chiều.
- Tạo merge commit và xác nhận thay đổi của cả hai nhánh được giữ lại.

---

## 🧩 Từ khóa hôm nay

### 3-way merge — hợp nhất ba chiều
- **Nói dễ hiểu:** Git so sánh mốc chung với hai phiên bản nhánh để kết hợp thay đổi.
- **Ví dụ:** `main` sửa `about.html`, `feature` thêm `contact.html`.
- **Đừng nhầm:** 3-way merge không đồng nghĩa với conflict.

### Common ancestor — tổ tiên chung
- **Nói dễ hiểu:** Mốc commit gần nhất mà hai nhánh cùng có trước khi tách.
- **Ví dụ:** Hai nhánh đều xuất phát từ Commit C2.
- **Đừng nhầm:** Git tự tìm mốc này; thường bạn không phải tự chọn.

### Merge commit — commit hợp nhất
- **Nói dễ hiểu:** Commit nối lịch sử của hai nhánh và có hai commit cha.
- **Ví dụ:** Git tạo mốc mới sau khi kết hợp `main` và `feature-contact`.
- **Đừng nhầm:** Fast-forward không cần tạo merge commit.

---

## 📖 Định nghĩa
Khi nhánh hiện tại và nhánh nguồn đều có commit riêng sau tổ tiên chung, Git không thể chỉ tua con trỏ. Git so sánh ba trạng thái: tổ tiên chung, nhánh hiện tại và nhánh nguồn. Nếu các thay đổi có thể kết hợp, Git tạo một merge commit có hai commit cha. Nếu cùng một phần nội dung bị sửa theo cách không tương thích, sẽ có conflict; cách xử lý học ở bài sau.

---

## 🤔 Tại sao cần?
Trong nhóm, `main` có thể tiếp tục nhận thay đổi trong lúc bạn làm tính năng. 3-way merge giúp Git kết hợp công việc của hai nhánh thay vì bỏ một bên. Biết ba mốc so sánh giúp bạn hiểu vì sao Git tự gộp được hai tệp khác nhau nhưng có thể cần bạn giải quyết khi sửa cùng một dòng.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng hai người cùng sửa một tài liệu từ một bản gốc. Người thứ nhất thêm mục giới thiệu; người thứ hai thêm mục liên hệ. Khi đối chiếu bản gốc với hai bản mới, có thể ghép cả hai phần mà không phải chọn bỏ nội dung của ai.

---

## 🖼 Sơ đồ
```text
                  C3  main (Ours)
                 /   \
Base C2 ────────       M5  main sau merge
                 \   /
                  C4  feature (Theirs)

M5 có hai commit cha: C3 và C4.
```

---

## 🌎 Ví dụ thực tế
Huy tạo `feature-contact` từ `main` và thêm `contact.html`. Trong lúc đó, Mai tạo một commit trên `main` để sửa `about.html`. Khi đứng trên `main` và merge `feature-contact`, Git so sánh mốc chung cùng hai nhánh. Vì thay đổi nằm ở hai tệp khác nhau, Git có thể giữ cả hai và tạo merge commit.

---

## 💻 Command
```bash
git switch main
git merge feature-contact
git status
git log --oneline
```

---

## 🔍 Giải thích command
- `git switch main`: Chuyển sang nhánh sẽ nhận thay đổi.
- `git merge feature-contact`: Kết hợp lịch sử nhánh nguồn vào nhánh hiện tại.
- `git status`: Kiểm tra kết quả và xác nhận không còn thao tác dở.
- `git log --oneline`: Xem lời nhắn của merge commit trong lịch sử hiện tại.
- Simulator tự hoàn tất merge commit và dùng lời nhắn mặc định; trong terminal Git thật, editor có thể mở tùy cấu hình.

---

## ⚠️ Sai lầm phổ biến
1. **Tưởng 3-way merge luôn gây conflict:** Thay đổi độc lập thường được kết hợp tự động.
2. **Đứng trên nhánh nguồn thay vì nhánh nhận:** `git merge` cập nhật nhánh hiện tại.
3. **Cho rằng merge thành công nghĩa ứng dụng chắc chắn chạy đúng:** Chạy kiểm thử hoặc mở ứng dụng sau khi hợp nhất.

---

## 🧪 Lab
Yêu cầu: repository có ít nhất một commit và thư mục làm việc sạch. Nếu chưa có commit, hoàn thành bài tạo commit ở Level 2 trước.
1. Chạy `git switch main` rồi `git switch -c feature-contact`.
2. Tạo `contact.html`, thêm nội dung, rồi chạy `git add contact.html` và `git commit -m "feat: add contact page"`.
3. Chạy `git switch main`.
4. Tạo `about.html`, thêm nội dung, rồi chạy `git add about.html` và `git commit -m "docs: add about page"`.
5. Chạy `git merge feature-contact`.
6. Kiểm tra `git status`, rồi dùng `git log --oneline` để thấy merge commit.

---

## 💡 Hint
> Nếu mỗi nhánh sửa một tệp khác nhau, Git thường có thể gộp tự động.

---

## ✅ Validation
- `about.html` và `contact.html` đều còn trên `main` sau merge.
- `git log --oneline` có một merge commit mới.
- `git status` không báo merge đang dở.

---

## ❓ Quiz
Trả lời các câu hỏi để kiểm tra ba mốc Git dùng khi hợp nhất lịch sử đã phân kỳ.

---

## 🔥 Challenge
Dựa vào sơ đồ và kết quả `git show HEAD`, chỉ ra commit nào là tổ tiên chung, nhánh hiện tại, nhánh nguồn và merge commit. Nêu hai commit cha của merge commit.

---

## 📚 Tổng kết
- 3-way merge so sánh tổ tiên chung với hai nhánh.
- Khi thay đổi kết hợp được, Git tạo merge commit có hai commit cha.
- Thay đổi cùng dòng có thể cần giải quyết conflict ở bài tiếp theo.
