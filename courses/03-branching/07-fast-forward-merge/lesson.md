# Hợp nhất nhanh Fast-forward merge

---

## 🎯 Mục tiêu
- Hiểu rõ điều kiện cần và đủ để Git kích hoạt cơ chế hợp nhất Fast-forward merge.
- Thực hiện câu lệnh `git merge <tên-nhánh>` trên nhánh đích một cách chuẩn xác.
- Giải thích vì sao Fast-forward không sinh ra commit hợp nhất mới (merge commit).
- Sử dụng cờ `--no-ff` để chủ động tạo merge commit khi muốn lưu vết lịch sử nhánh tính năng.

---

## 📖 Định nghĩa
> Fast-forward merge là hình thức hợp nhất đơn giản và mượt mà nhất trong Git, xảy ra khi nhánh đích (thường là `main`) không có bất kỳ commit mới nào kể từ thời điểm nhánh tính năng được tách ra. Trong tình huống này, lịch sử phát triển là hoàn toàn tuyến tính (linear): Git không cần phải thực hiện thuật toán so sánh ba chiều phức tạp và không tạo ra commit hợp nhất mới, mà chỉ đơn thuần dịch chuyển con trỏ nhánh đích tiến thẳng về phía trước để trỏ cùng vị trí với commit đỉnh của nhánh tính năng.

---

## 🤔 Tại sao cần?
Fast-forward merge tạo ra một lịch sử commit thẳng thớm, gọn gàng và cực kỳ dễ theo dõi vì không xuất hiện các nút giao rẽ nhánh chằng chịt trong cây lịch sử. Đối với các tác vụ sửa lỗi nhỏ hoặc các nhánh tính năng ngắn hạn mà nhánh main chưa hề bị ai chỉnh sửa, Fast-forward giúp tích hợp mã nguồn tức thì mà không làm phát sinh thêm các commit merge thừa thãi trong nhật ký dự án. Điều này giúp các lập trình viên dễ dàng đọc lại lịch sử mã nguồn, đơn giản hóa việc truy vết lỗi bằng git bisect và giữ cho đồ thị tổng quan luôn sáng rõ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai người bạn Nam và Bình cùng nhau đi bộ trên một con đường mòn thẳng tắp. Khi đi đến cột mốc số 3, Bình xin phép Nam tạm dừng chân nghỉ ngơi, còn Nam tiếp tục đi thẳng về phía trước thêm 2 cột mốc nữa đến cột mốc số 5. Lát sau, khi Bình nghỉ ngơi xong, Bình chỉ việc đứng dậy bước nhanh về phía trước (Fast-forward) để đứng ngang hàng với Nam tại cột mốc số 5 mà không cần phải đi vòng vèo qua bất kỳ con đường tắt nào.

---

## 🖼 Sơ đồ
```text
Cơ chế Fast-forward merge:
Trước khi merge:
main:               C1 ──► C2 ──► C3 (HEAD -> main)
                                   feature:                            └──► C4 ──► C5 (feature)

Sau khi chạy lệnh: git merge feature
main & feature:     C1 ──► C2 ──► C3 ──► C4 ──► C5 (HEAD -> main, feature)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Đức tạo nhánh fix-typo từ nhánh main tại commit C3 để sửa một lỗi chính tả trên thanh menu điều hướng của trang chủ. Đức tạo hai commit C4 và C5 trên nhánh này để hoàn thiện nội dung. Trong suốt thời gian đó, không có bất kỳ ai commit thêm gì vào nhánh main. Khi hoàn thành kiểm thử, Đức chuyển về nhánh main bằng lệnh `git switch main` rồi gõ lệnh `git merge fix-typo`. Màn hình hiển thị dòng chữ thông báo: "Fast-forward". Con trỏ nhánh main lập tức nhảy vọt lên commit C5, hoàn tất việc gộp code trong nháy mắt mà không cần sinh thêm commit trung gian nào.

---

## 💻 Command
```bash
git switch main
git merge <tên-nhánh>
git merge --no-ff <tên-nhánh>
git merge --ff-only <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git switch main`: Bắt buộc phải chuyển về nhánh đích trước khi thực hiện hợp nhất nhánh khác vào.
- `git merge <tên-nhánh>`: Hợp nhất nhánh chỉ định vào nhánh hiện tại (tự động dùng Fast-forward nếu thỏa mãn điều kiện).
- `git merge --no-ff <nhánh>`: Ép buộc Git tạo một Merge Commit mới ngay cả khi đủ điều kiện Fast-forward để lưu vết mốc tích hợp tính năng.
- `git merge --ff-only <nhánh>`: Chỉ cho phép hợp nhất nếu là Fast-forward, từ chối merge nếu phải giải quyết 3-way.

---

## ⚠️ Sai lầm phổ biến
1. **Đứng ở nhánh tính năng rồi gõ git merge main**:  Thao tác ngược làm kéo code của main vào feature thay vì đưa feature vào main.
2. **Bối rối khi thấy không có commit merge mới**:  Đây là bản chất tự nhiên của Fast-forward vì con trỏ chỉ việc di chuyển tiến lên.
3. **Lẫn lộn giữa Fast-forward và 3-way merge**:  Không nắm được điều kiện khi nào Git được phép tua nhanh con trỏ.

---

## 🧪 Lab
1. Tạo nhánh `ff-demo` và commit một tệp mới `feature.js`.
2. Chuyển về nhánh `main` bằng `git switch main`.
3. Chạy lệnh `git merge ff-demo` và quan sát thông báo `Fast-forward`.
4. Chạy `git log --oneline` để thấy lịch sử thẳng tắp không có commit rẽ nhánh.

---

## 💡 Hint
> Nhớ nguyên tắc: Luôn đứng ở nhánh nhận code (main) trước khi gõ lệnh `git merge`.

---

## ✅ Validation
- Kiểm tra `git log` thấy con trỏ main và con trỏ nhánh con cùng trỏ vào một commit.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế Fast-forward merge.

---

## 🔥 Challenge
Nêu lợi ích và nhược điểm của việc sử dụng cờ `--no-ff` trong quy trình làm việc Git Flow của doanh nghiệp.

---

## 📚 Tổng kết
- Fast-forward xảy ra khi nhánh đích không có commit mới kể từ mốc rẽ nhánh.
- Git chỉ dịch chuyển con trỏ nhánh đích tiến lên mà không tạo thêm commit mới.
- Sử dụng `--no-ff` khi bạn muốn ghi dấu rõ ràng một nhánh tính năng đã được hợp nhất.
