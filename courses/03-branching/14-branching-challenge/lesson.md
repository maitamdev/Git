# Thử thách cuối Level 3: tạo nhánh, xử lý conflict và merge

---

## 🎯 Mục tiêu
- Tự tạo hai nhánh có thay đổi riêng từ một commit chung.
- Gây conflict có chủ đích, đọc và giải quyết conflict.
- Tạo merge commit, kiểm tra kết quả rồi xóa nhánh đã merge an toàn.

---

## 🧩 Từ khóa hôm nay

### Feature branch — nhánh tính năng
- **Nói dễ hiểu:** Nhánh riêng để phát triển một thay đổi mà chưa đưa thẳng vào nhánh chính.
- **Ví dụ:** Làm phần giỏ hàng trên `feature-challenge`.
- **Đừng nhầm:** Tách nhánh giúp cô lập lịch sử; nó không tự kiểm thử hay phê duyệt code.

### Resolve conflict — giải quyết xung đột
- **Nói dễ hiểu:** Chọn nội dung cuối cùng khi Git không thể tự kết hợp hai thay đổi.
- **Ví dụ:** Giữ được cả nội dung nhánh tính năng lẫn cập nhật của `main` trong một câu hợp lý.
- **Đừng nhầm:** Không chọn máy móc Current hoặc Incoming; hiểu yêu cầu trước khi sửa.

### Merge commit — commit hợp nhất
- **Nói dễ hiểu:** Commit nối nhánh hiện tại với nhánh được merge vào.
- **Ví dụ:** Sau khi merge `feature-challenge` vào `main`, commit mới có hai commit cha.
- **Đừng nhầm:** Lệnh merge cập nhật nhánh bạn đang đứng; vì vậy phải đứng trên `main` để nhận tính năng.

---

## 📖 Định nghĩa
Thử thách này mô phỏng một công việc thực tế theo thứ tự: tạo commit gốc, tách nhánh, commit thay đổi riêng ở mỗi nhánh, hợp nhất trên nhánh nhận, giải quyết conflict, xác nhận kết quả rồi dọn nhánh đã merge.

---

## 🤔 Tại sao cần?
Người học chỉ biết lệnh khi có thể tự chuẩn bị đúng trạng thái, hiểu kết quả của từng bước và biết cách kiểm tra mình đã làm xong. Bài này ghép các thao tác Level 3 thành một quy trình hoàn chỉnh.

---

## 🧠 Mental Model (Mô hình tư duy)
Tạo một bản gốc, để hai nhánh sửa cùng một câu theo hai mục đích khác nhau, rồi đứng ở nhánh nhận để kết hợp thành câu cuối. Cuối cùng mới cất nhánh công việc đã được nhập.

---

## 🖼 Sơ đồ
```text
                         F1 ── feature-challenge
                        /                       \
Base ──────────────────                           M1 ── main
                        \                       /
                         M0 ── cập nhật riêng trên main

M1 là merge commit sau khi giải quyết conflict.
```

---

## 🌎 Ví dụ thực tế
Nhánh tính năng cập nhật thông báo để nói rằng cửa hàng có ưu đãi. Trong lúc đó, `main` thay thông báo để nói cửa hàng đang bảo trì. Khi merge, bạn cần viết nội dung cuối vừa đúng tình trạng bảo trì vừa không làm mất thông tin ưu đãi cho thời điểm cửa hàng mở lại.

---

## 💻 Command
```bash
git switch -c feature-challenge
git switch main
git merge feature-challenge
git status
git add challenge.txt
git commit -m "merge: combine challenge changes"
git show HEAD
git branch -d feature-challenge
```

---

## 🔍 Giải thích command
- `git switch -c feature-challenge`: Tạo nhánh mới và chuyển sang đó.
- `git switch main`: Quay về nhánh nhận trước khi merge.
- `git merge feature-challenge`: Đưa nhánh tính năng vào nhánh hiện tại; ở đây là `main`.
- `git status`: Tìm tệp conflict hoặc xác nhận tệp đã được stage.
- `git add challenge.txt`: Báo với Git rằng nội dung conflict trong tệp đã được giải quyết.
- `git commit -m "merge: combine challenge changes"`: Ghi merge commit sau khi tệp đã sạch marker và được stage.
- `git show HEAD`: Xác nhận commit mới có hai commit cha.
- `git branch -d feature-challenge`: Xóa nhánh sau khi công việc đã merge.

---

## ⚠️ Sai lầm phổ biến
1. **Merge khi đang đứng trên nhánh tính năng:** Khi đó kết quả được đưa vào nhánh tính năng, không phải `main`.
2. **Quên commit hai phía trước khi merge:** Không có hai thay đổi đã commit thì không tạo được tình huống conflict như bài tập.
3. **Xóa branch trước khi merge hoặc trước khi rời branch đó:** `-d` sẽ chặn việc xóa commit chưa gộp và không xóa nhánh đang được checkout.

---

## 🧪 Lab
Trong simulator, nhánh nhận của Level 3 là `main`. Nếu làm trên repository thật, dùng tên nhánh chính của dự án. Bắt đầu từ working tree sạch và repository có ít nhất một commit. Nếu `challenge.txt` đã tồn tại, chọn một tên tệp khác và thay tên đó trong các lệnh.
1. Trên `main`, tạo `challenge.txt` với dòng `Thông báo: phiên bản đầu`; chạy `git add challenge.txt` và `git commit -m "docs: add challenge note"`.
2. Chạy `git switch -c feature-challenge`. Đổi dòng thành `Thông báo: có ưu đãi`; add và commit với `git commit -m "feat: announce offer"`.
3. Chạy `git switch main`. Đổi cùng dòng thành `Thông báo: cửa hàng đang bảo trì`; add và commit với `git commit -m "docs: announce maintenance"`.
4. Chạy `git merge feature-challenge`. Xác nhận `git status` báo conflict trong `challenge.txt`.
5. Mở tệp. Thay toàn bộ vùng có markers bằng nội dung cuối: `Thông báo: cửa hàng đang bảo trì; ưu đãi áp dụng khi mở cửa trở lại.` Lưu tệp.
6. Chạy `git status`; xác nhận tệp còn cần được stage. Chạy `git add challenge.txt`, rồi `git status` lần nữa.
7. Chạy `git commit -m "merge: combine challenge changes"`.
8. Chạy `git status` và `git show HEAD`. Xác nhận working tree sạch, merge commit có hai cha, nội dung cuối vẫn trong tệp.
9. Khi đang ở `main`, chạy `git branch -d feature-challenge` rồi `git branch` để xác nhận nhánh phụ được dọn sau merge.

---

## 💡 Hint
Giải quyết theo ý nghĩa nghiệp vụ: thông báo nói cửa hàng đang bảo trì, còn ưu đãi sẽ áp dụng sau khi mở lại. Xóa đủ cả ba loại marker trước khi chạy `git add`.

---

## ✅ Validation
- Trước merge, `main` và `feature-challenge` có các commit riêng sau commit gốc.
- Merge tạo conflict; sau khi sửa, `git status` không còn `Unmerged paths`.
- Merge commit có hai commit cha và chứa câu đã kết hợp.
- `git branch -d feature-challenge` thành công sau khi đứng trên `main`.

---

## ❓ Quiz
Trả lời câu hỏi để kiểm tra hướng merge, quy trình giải quyết conflict và dọn nhánh.

---

## 🔥 Challenge
Tự làm lại quy trình trên với một tệp và thông báo khác. Trước mỗi lệnh, dự đoán nhánh hiện tại, tệp nào sẽ đổi và điều `git status` sẽ báo.

---

## 📚 Tổng kết
- Tạo commit trên cả hai nhánh trước khi merge để có lịch sử phân kỳ.
- Đứng trên nhánh nhận, hiểu conflict, sửa tệp, stage rồi commit.
- Kiểm tra kết quả và chỉ xóa nhánh sau khi đã merge.
