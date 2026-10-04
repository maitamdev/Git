# Hợp nhất khi hai nhánh đã phân kỳ (3-way merge)

---

## 🎯 Mục tiêu
- Thấu suốt thuật toán 3-Way Merge và vai trò cốt lõi của điểm mốc Tổ tiên chung (Common Ancestor).
- Nhận diện chính xác tình huống lịch sử phân kỳ bắt buộc phải tạo commit hợp nhất (Merge Commit).
- Thực hành quy trình gộp hai luồng công việc độc lập một cách an toàn và tự tin.

---

## 🧩 Từ khóa hôm nay

### 3-way merge — hợp nhất ba chiều
- **Nói dễ hiểu:** Thuật toán tự động đối chiếu 3 điểm: tổ tiên chung, đỉnh nhánh hiện tại và đỉnh nhánh cần gộp để tích hợp mã nguồn.
- **Ví dụ:** Nhánh `main` sửa file giới thiệu, nhánh `feature` thêm trang liên hệ; Git dùng 3-way merge để gộp cả hai.
- **Đừng nhầm:** 3-way merge hoàn toàn không đồng nghĩa với xung đột (conflict); đa phần các trường hợp Git tự động xử lý êm đẹp.

### Common ancestor — tổ tiên chung
- **Nói dễ hiểu:** Mốc commit gần nhất trong quá khứ mà cả hai nhánh cùng chia sẻ chung trước thời điểm rẽ nhánh.
- **Ví dụ:** Cả nhánh `main` và nhánh tính năng đều xuất phát từ commit C2; commit C2 chính là tổ tiên chung.
- **Đừng nhầm:** Thuật toán Git tự động truy tìm mốc tổ tiên này theo đồ thị DAG, bạn không cần phải tính toán thủ công.

### Merge commit — commit hợp nhất
- **Nói dễ hiểu:** Một commit đặc biệt đóng vai trò điểm giao thoa lịch sử, sở hữu tới 2 commit cha (parents) thay vì 1 cha như bình thường.
- **Ví dụ:** Khi gộp nhánh tính năng vào nhánh chính có phân kỳ, Git tự sinh commit có thông điệp `Merge branch 'feature-contact'`.
- **Đừng nhầm:** Trong trường hợp Fast-forward merge, Git sẽ không tạo ra commit hợp nhất này.

---

## 📖 Định nghĩa
3-Way Merge (hợp nhất 3 chiều) là thuật toán gộp thông minh của Git khi hai nhánh đã rẽ nhánh phân kỳ và cùng sở hữu những commit độc lập. Thay vì chỉ đối chiếu hai đỉnh nhánh, Git tìm lại điểm nút rẽ nhánh trong quá khứ gọi là tổ tiên chung (Common Ancestor). Bằng cách so sánh 3 trạng thái: Tổ tiên chung, Nhánh hiện tại và Nhánh nguồn, Git tự động kết hợp những thay đổi không giao thoa và tạo ra một Merge Commit đặc biệt có hai commit cha.

---

## 🤔 Tại sao cần?
Trong môi trường làm việc nhóm thực tế, nhánh `main` không bao giờ đứng yên chờ bạn: trong 3 ngày bạn viết tính năng mới, đồng đội đã kịp hoàn thành và gộp 5 tính năng khác vào `main`. 3-Way Merge là phép màu giúp bạn tích hợp công sức của mình vào dòng chảy chính mà không ghi đè hay làm mất bất kỳ dòng code nào của đồng đội, miễn là các bạn không sửa đổi cùng một dòng code.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn và người bạn cùng mang một bản hợp đồng gốc (Tổ tiên chung) về nhà chỉnh sửa. Bạn bổ sung điều khoản bảo hành ở trang 2; người bạn bổ sung điều khoản thanh toán ở trang 5. Khi hai bạn ngồi lại đối chiếu với bản gốc, cả hai điều khoản mới đều được ghép trọn vẹn vào bản hợp đồng cuối cùng (Merge Commit) mà không hề có bất kỳ tranh chấp nào.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ THUẬT TOÁN 3-WAY MERGE:

                   ┌─── (C3: main sửa about.html) ───────┐
(C2: Tổ tiên chung)                                      ▼
                   └─── (C4: feature thêm contact.html) ─► [M5: Merge Commit]
                                                           (Có 2 cha: C3 & C4)
```

---

## 🌎 Ví dụ thực tế
Bạn tạo nhánh `feature-contact` để thêm tệp `contact.html`. Cùng lúc đó, đồng đội đẩy một commit lên `main` để sửa nội dung tệp `about.html`. Khi bạn đứng ở `main` gõ `git merge feature-contact`, Git lập tức đối chiếu 3 mốc: vì thay đổi nằm ở hai file tách biệt, Git tự động gộp mượt mà và tạo ra một Merge Commit lưu giữ cả hai thành quả.

---

## 💻 Command
```bash
git switch main
git merge feature-contact
git status
git log --oneline --graph
```

---

## 🔍 Giải thích command
- `git switch main`: Luôn đứng tại nhánh nhận mã nguồn trước khi khởi động tiến trình hợp nhất.
- `git merge <tên-nhánh>`: Kích hoạt thuật toán 3-way merge nếu Git phát hiện lịch sử hai nhánh đã bị phân kỳ.
- `git status`: Xác nhận quá trình merge đã kết thúc trọn vẹn mà không bị vướng mắc conflict dở dang.
- `git log --oneline --graph`: Vẽ lại sơ đồ hợp nhất trực quan hiển thị hai nhánh chập lại thành một điểm nút.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng 3-way merge luôn gây ra xung đột**: Phần lớn các trường hợp Git giải quyết tự động hoàn hảo nếu hai người sửa ở các file hoặc dòng code khác nhau.
2. **Đứng nhầm ở nhánh tính năng để gộp**: Sẽ vô tình đưa mã nguồn của nhánh chính vào nhánh tính năng thay vì ngược lại.
3. **Chủ quan không chạy kiểm thử sau khi merge**: Dù Git tự động ghép code không báo lỗi cú pháp, nhưng sự kết hợp logic giữa hai nhánh vẫn có thể gây bug nghiệp vụ.

---

## 🧪 Lab
1. Chạy `git switch main` rồi tạo nhánh mới: `git switch -c feature-contact`.
2. Tạo file `contact.html` với nội dung bất kỳ, chạy `git add contact.html` và `git commit -m "feat: add contact page"`.
3. Chạy `git switch main` để trở về nhánh chính.
4. Tạo file `about.html` với nội dung mới, chạy `git add about.html` và `git commit -m "docs: add about page"`.
5. Đang ở `main`, chạy: `git merge feature-contact`.
6. Chạy `git status` và `git log --oneline --graph` để tận mắt chiêm ngưỡng Merge Commit vừa xuất hiện!

---

## 💡 Hint
> Khi hai nhánh sửa đổi ở các file khác nhau hoặc các dòng cách xa nhau, Git sẽ tự động tạo commit hợp nhất mà không làm phiền bạn!

---

## ✅ Validation
- Cả hai file `about.html` và `contact.html` cùng xuất hiện đồng thời trong thư mục của nhánh `main`.
- Lệnh `git log --oneline` hiển thị một commit hợp nhất mới nối liền hai nhánh.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra mức độ thấu hiểu của bạn về thuật toán 3-way merge và cách Git tìm tổ tiên chung.

---

## 🔥 Challenge
Hãy gõ lệnh `git show HEAD` ngay sau khi tạo merge commit thành công. Quan sát dòng `Merge: <cha-1> <cha-2>` ở đầu kết quả và giải thích ý nghĩa của hai mã commit hash được liệt kê tại đó!

---

## 📚 Tổng kết
- 3-Way Merge là thuật toán hợp nhất thông minh đối chiếu ba điểm: Tổ tiên chung và hai đỉnh nhánh.
- Merge Commit là mốc snapshot đặc biệt sở hữu hai commit cha đại diện cho hai luồng lịch sử giao nhau.
- Luôn kiểm thử lại toàn bộ ứng dụng sau khi thực hiện hợp nhất để đảm bảo tính toàn vẹn logic.
