# Hợp nhất rẽ nhánh 3-way merge

---

## 🎯 Mục tiêu
- Nắm vững thuật toán hợp nhất 3 chiều (Three-way merge) trong Git.
- Nhận diện 3 điểm cốt lõi của thuật toán: Tổ tiên chung (Common Ancestor), đỉnh nhánh hiện tại (HEAD), và đỉnh nhánh được gộp.
- Phân biệt rõ ràng giữa hợp nhất thành công tự động và tình huống phát sinh xung đột (Conflict).
- Đọc hiểu cấu trúc một Merge Commit đặc biệt có hai commit cha.

---

## 📖 Định nghĩa
> Three-way merge (Hợp nhất 3 chiều) là thuật toán hợp nhất tiêu chuẩn của Git được kích hoạt khi lịch sử của hai nhánh đã bị phân kỳ (cả nhánh chính và nhánh tính năng đều có những commit mới độc lập kể từ điểm rẽ nhánh chung). Để hợp nhất hai luồng thay đổi này lại với nhau, Git sử dụng đúng 3 ảnh chụp snapshot: Commit tổ tiên chung gần nhất (Common Ancestor hay Base), commit đỉnh của nhánh hiện tại (`OURS`), và commit đỉnh của nhánh cần gộp (`THEIRS`). Nếu các thay đổi nằm ở các tệp tin hoặc các dòng code khác nhau, Git sẽ tự động hợp nhất thành công và tạo ra một Merge Commit mới.

---

## 🤔 Tại sao cần?
Trong môi trường làm việc nhóm thực tế, gần như không bao giờ có chuyện nhánh main đứng yên chờ bạn hoàn thành tính năng suốt nhiều tuần. Các đồng nghiệp khác liên tục đưa các tính năng mới và các bản sửa lỗi vào nhánh main. Khi bạn hoàn thành công việc của mình, hai nhánh chắc chắn đã bị phân kỳ. Thuật toán 3-way merge chính là phép màu thuật toán giúp tích hợp công sức của nhiều kỹ sư làm việc song song một cách tự động và chính xác.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng hai dịch giả cùng dịch tiếp một cuốn tiểu thuyết kinh điển từ chương 5 (commit tổ tiên chung). Dịch giả A nhận nhiệm vụ dịch các chương tiếp theo ở nửa đầu cuốn sách (nhánh main), còn Dịch giả B nhận nhiệm vụ dịch các phụ lục tra cứu ở cuối sách (nhánh feature). Khi đến ngày xuất bản, tổng biên tập (Git) cầm bản thảo gốc chương 5 ra đối chiếu cùng bản dịch của A và B. Thấy hai người dịch ở hai phần hoàn toàn tách biệt của cuốn sách, tổng biên tập chỉ việc gom hai phần đó lại và đóng thành một cuốn sách xuất bản hoàn chỉnh (Merge Commit).

---

## 🖼 Sơ đồ
```text
Cấu trúc 3 điểm trong thuật toán Three-way merge:
                 (Base - Tổ tiên chung)
                          Commit C2
                         /         \
                        /           \
           Commit C3 (Ours)       Commit C4 (Theirs)
                        \           /
                         \         /
                          Commit C5 (Merge Commit - có 2 cha C3 & C4)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Huy tách nhánh feature-search từ commit C2 của nhánh main. Trong khi Huy viết chức năng tìm kiếm sản phẩm trong tệp search.js (sinh ra commit C4), thì ở nhánh main đồng nghiệp Mai sửa xong lỗi giao diện trong styles.css (sinh ra commit C3). Khi Huy merge feature-search vào main, Git tự động tìm thấy tổ tiên chung C2. Nhận thấy hai người sửa ở hai tệp tin hoàn toàn khác nhau, Git tự động kết hợp cả hai thay đổi và tạo ra một commit hợp nhất mới C5, đưa toàn bộ chức năng tìm kiếm và giao diện mới vào cùng một phiên bản.

---

## 💻 Command
```bash
git switch main
git merge <tên-nhánh-tính-năng>
git log --oneline --graph
```

---

## 🔍 Giải thích command
- `git switch main`: Chuyển về nhánh đón nhận kết quả hợp nhất.
- `git merge <tên-nhánh>`: Thực thi thuật toán Three-way merge tự động kết hợp thay đổi và mở trình soạn thảo để xác nhận thông điệp commit hợp nhất.
- `git log --oneline --graph`: Vẽ đồ thị kiểm tra nhánh đã được gộp lại với nút giao commit có 2 đường liên kết trỏ về 2 cha.

---

## ⚠️ Sai lầm phổ biến
1. **Bất ngờ khi trình soạn thảo văn bản tự động bật lên**:  Khi tạo merge commit, Git yêu cầu xác nhận thông điệp commit (mặc định dạng
2. **Tưởng 3-way merge luôn luôn gây ra conflict**:  Nếu hai nhánh sửa ở các file khác nhau hoặc các dòng cách xa nhau, Git tự động merge 100% trơn tru.
3. **Không kiểm tra lại kết quả chạy thử ứng dụng sau khi merge**:  Dù Git merge tự động không báo lỗi cú pháp nhưng logic hai phần có thể chưa tương thích.

---

## 🧪 Lab
1. Tạo nhánh `feature-contact` và sửa tệp `contact.html`.
2. Chuyển về nhánh `main` và sửa tệp `about.html` để tạo ra sự phân kỳ lịch sử.
3. Chạy lệnh `git merge feature-contact` từ nhánh `main`.
4. Quan sát Git thực hiện 3-way merge tự động thành công và tạo merge commit mới.

---

## 💡 Hint
> Nếu hai người sửa hai tệp khác nhau, Git sẽ tự động tạo Merge Commit mà không phát sinh conflict.

---

## ✅ Validation
- Kiểm tra `git log --graph` thấy hình thái nút giao hợp nhất của hai nhánh.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về thuật toán Three-way merge.

---

## 🔥 Challenge
Nêu cách Git xác định commit tổ tiên chung gần nhất (Merge Base) bằng lệnh `git merge-base`.

---

## 📚 Tổng kết
- Three-way merge sử dụng 3 snapshot: Tổ tiên chung, nhánh hiện tại và nhánh được gộp.
- Kích hoạt khi hai nhánh đã có sự phân kỳ lịch sử độc lập.
- Tự động tạo ra một Merge Commit mới có hai commit cha nếu không có xung đột dòng code.
