# Hợp nhất rẽ nhánh 3-way merge

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý hoạt động của thuật toán hợp nhất ba chiều (Three-way merge).
- Nhận diện 3 điểm cốt lõi: Tổ tiên chung (Base), đỉnh nhánh hiện tại (Ours) và đỉnh nhánh được gộp (Theirs).
- Hiểu được Merge Commit là commit đặc biệt có 2 commit cha để nối liền hai luồng lịch sử.

---

## 🧩 Từ khóa hôm nay

### 3-way Merge — hợp nhất ba chiều
- **Nói dễ hiểu:** Thuật toán gộp hai nhánh dựa trên 3 điểm: tổ tiên chung, đỉnh nhánh hiện tại và đỉnh nhánh cần gộp.
- **Ví dụ:** Khi cả `main` và `feature` đều có commit mới độc lập, Git tự động kích hoạt 3-way merge.
- **Đừng nhầm:** 3-way merge không có nghĩa là bị lỗi xung đột; nếu sửa khác tệp hoặc khác dòng, Git tự gộp hoàn toàn tự động.

### Common Ancestor (Merge Base) — mốc tổ tiên chung
- **Nói dễ hiểu:** Commit cuối cùng mà cả hai nhánh cùng chia sẻ trước khi rẽ sang hai hướng phát triển riêng.
- **Ví dụ:** Commit C2 là điểm rẽ nhánh; Git dùng C2 làm thước đo để biết mỗi bên đã sửa những dòng nào.
- **Đừng nhầm:** Bạn không phải tự tìm commit này bằng mắt; Git tự động tính toán mốc tổ tiên chung gần nhất.

### Merge Commit — commit hợp nhất
- **Nói dễ hiểu:** Một commit đặc biệt nối hai nhánh lại với nhau và có hai commit cha ở phía trước.
- **Ví dụ:** Commit có thông điệp mặc định `Merge branch 'feature-search' into main`.
- **Đừng nhầm:** Hợp nhất kiểu Fast-forward không tạo ra commit này; chỉ 3-way merge mới sinh ra commit hợp nhất có 2 cha.

---

## 📖 Định nghĩa
Three-way merge (hợp nhất 3 chiều) là thuật toán chuẩn của Git khi hai nhánh đã bị phân kỳ (mỗi nhánh đều có commit mới kể từ mốc rẽ nhánh). Git đối chiếu 3 mốc: tổ tiên chung, nhánh hiện tại và nhánh cần gộp. Nếu các thay đổi không đá nhau trên cùng dòng, Git tự động kết hợp và tạo ra một Merge Commit mới.

---

## 🤔 Tại sao cần?
Trong thực tế làm việc nhóm, nhánh `main` hiếm khi đứng yên chờ một mình bạn. Đồng nghiệp liên tục đưa các tính năng khác vào `main`. Thuật toán 3-way merge cho phép bạn tích hợp nhánh của mình vào nhánh chính đã có thay đổi mới mà không làm mất công sức của bất kỳ ai.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai bạn cùng dịch tiếp một cuốn sách từ chương 5 (tổ tiên chung). Bạn A dịch các chương đầu (nhánh `main`), bạn B dịch phần phụ lục cuối sách (nhánh `feature`). Khi nộp bài, người biên tập cầm bản gốc chương 5 ra đối chiếu với bản của A và B. Thấy hai người dịch ở hai phần riêng biệt, người biên tập gom cả hai lại đóng thành một cuốn sách xuất bản hoàn chỉnh (Merge Commit).

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
Bạn Huy tạo nhánh `feature-search` từ commit C2 của `main` để làm tệp `search.js`. Cùng lúc đó trên `main`, bạn Mai sửa giao diện trong tệp `styles.css`. Khi Huy chạy lệnh gộp nhánh `feature-search` vào `main`, Git nhận thấy hai bạn sửa ở hai tệp hoàn toàn khác nhau. Git tự động gộp cả hai tệp vào một commit hợp nhất mới C5 mà không phát sinh xung đột nào.

---

## 💻 Command
```bash
git switch main
git merge <tên-nhánh-tính-năng>
git log --oneline --graph
```

---

## 🔍 Giải thích command
- `git switch main`: Chuyển về nhánh đích đón nhận kết quả hợp nhất.
- `git merge <tên-nhánh>`: Thực thi thuật toán 3-way merge và mở trình soạn thảo để xác nhận thông điệp commit hợp nhất.
- `git log --oneline --graph`: Vẽ đồ thị kiểm tra nút giao hợp nhất có hai đường dẫn về hai nhánh cha.

---

## ⚠️ Sai lầm phổ biến
1. **Bất ngờ khi trình soạn thảo tự động mở lên:** Khi tạo Merge Commit, Git yêu cầu xác nhận thông điệp; bạn chỉ cần lưu và đóng trình soạn thảo lại.
2. **Nghĩ 3-way merge luôn gây ra xung đột:** Nếu hai nhánh sửa khác tệp hoặc khác dòng, Git tự động gộp êm đẹp 100%.
3. **Quên kiểm tra lại ứng dụng sau khi merge:** Dù Git gộp văn bản thành công, bạn vẫn nên chạy thử chương trình để đảm bảo tính năng hoạt động tương thích.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Tạo nhánh `feature-contact` và sửa tệp `contact.html`.
2. Chuyển về nhánh `main` và sửa tệp `about.html` để tạo ra lịch sử phân kỳ.
3. Chạy lệnh `git merge feature-contact` từ nhánh `main`.
4. Quan sát Git tự động hoàn tất 3-way merge và tạo ra commit hợp nhất mới.

---

## 💡 Hint
Khi hai nhánh sửa hai tệp khác nhau, Git sẽ tự động gộp mà không cần bạn phải can thiệp thủ công.

---

## ✅ Validation
- Lệnh `git log --graph --oneline` hiển thị rõ hai nhánh gộp lại tại một commit hợp nhất.
- Cả hai tệp `contact.html` và `about.html` đều có mặt với nội dung đầy đủ trên nhánh `main`.

---

## ❓ Quiz
Trả lời các câu hỏi sau để nắm vững nguyên lý hoạt động của thuật toán Three-way merge.

---

## 🔥 Challenge
Chạy lệnh `git merge-base main feature-contact` để xem Git in ra chính xác mã hash của commit tổ tiên chung giữa hai nhánh.

---

## 📚 Tổng kết
- Three-way merge dùng 3 snapshot: Tổ tiên chung, nhánh hiện tại và nhánh cần gộp.
- Tự động kích hoạt khi hai nhánh đã có sự phân kỳ độc lập trong lịch sử.
- Tự động tạo ra một Merge Commit mới có hai commit cha khi không có xung đột dòng.
