# Thử thách tổng hợp Branching Master

---

## 🎯 Mục tiêu
- Áp dụng tổng hợp toàn bộ kỹ năng của Level 3 vào một tình huống phát triển phần mềm đa nhánh.
- Thực hiện quy trình chuẩn: tách nhánh tính năng, chuyển nhánh, commit độc lập và xử lý xung đột.
- Giải quyết thành công xung đột Merge Conflict và dọn dẹp nhánh sau khi hoàn thành.

---

## 🧩 Từ khóa hôm nay

### Feature Branch Workflow — quy trình nhánh tính năng
- **Nói dễ hiểu:** Quy trình chuẩn: tách nhánh làm việc riêng, kiểm thử xong mới gộp vào nhánh chính và xóa nhánh con.
- **Ví dụ:** Tạo nhánh `feature-cart`, viết code trong 2 ngày, merge vào `main` rồi xóa nhánh `feature-cart`.
- **Đừng nhầm:** Không bao giờ viết code tính năng mới trực tiếp trên nhánh `main` dùng chung của cả nhóm.

### Merge Conflict Resolution — giải quyết trọn vẹn xung đột
- **Nói dễ hiểu:** Khả năng đọc hiểu cả hai đoạn code mâu thuẫn, chọn lọc giải pháp tối ưu và đưa mã nguồn về trạng thái chạy tốt.
- **Ví dụ:** Giữ lại cả chính sách giá vé cuối tuần và giảm giá cho học sinh trong tệp bán vé mà không để sót vạch đánh dấu.
- **Đừng nhầm:** Giải quyết xung đột không phải là xóa bừa code của ai đó; đó là sự tích hợp có trách nhiệm.

### Branch Cleanup — dọn dẹp nhánh sau khi hoàn thành
- **Nói dễ hiểu:** Thao tác xóa các nhánh con sau khi đã gộp xong vào nhánh chính để giữ danh sách nhánh luôn ngắn gọn.
- **Ví dụ:** Chạy `git branch -d feature-cart` để kết thúc trọn vẹn một chu kỳ phát triển tính năng.
- **Đừng nhầm:** Xóa nhánh không làm mất commit hay lịch sử vì toàn bộ code đã nằm an toàn trong nhánh chính.

---

## 📖 Định nghĩa
Thử thách tổng hợp Branching Master là bài thực hành toàn diện của Level 3, mô phỏng quy trình làm việc nhóm thực tế: bạn sẽ tạo nhánh tính năng, thực hiện gộp nhánh với lịch sử phân kỳ, tự tay xử lý xung đột phát sinh và hoàn tất việc dọn dẹp kho lưu trữ.

---

## 🤔 Tại sao cần?
Hiểu lý thuyết về nhánh và gộp nhánh mới chỉ là một nửa chặng đường. Khả năng bình tĩnh xử lý các tình huống xung đột code và hoàn tất quy trình hợp nhất trong thực tế mới là thước đo năng lực thật sự của một lập trình viên khi làm việc trong các công ty phần mềm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung thử thách này giống như bài thi sát hạch lái xe sa hình. Bạn đã học lý thuyết về vô lăng, chân ga và chân phanh (`branch`, `switch`, `merge`). Giờ là lúc bạn trực tiếp ngồi vào ghế lái, điều khiển xe vượt qua đoạn đường phân kỳ và xử lý chướng ngại vật xung đột để đưa chiếc xe về đích an toàn.

---

## 🖼 Sơ đồ
```text
Kịch bản thử thách tổng hợp Level 3:
               Commit C2 ───> Commit C3 (feature-a)
              /                                    \
Commit C1 ───                                       ───> Commit C5 (Resolved Merge)
              \                                    /
               Commit C4 (main - both modified) ──┘
```

---

## 🌎 Ví dụ thực tế
Trong kịch bản ứng dụng bán vé xem phim, nhánh `main` vừa cập nhật giá vé cuối tuần trong tệp `ticket.js`, trong khi nhánh `feature-discount` sửa logic giảm giá cho học sinh cũng tại tệp đó. Bạn tiến hành merge, bình tĩnh mở tệp xung đột ra kết hợp cả hai chính sách giá vé, xóa sạch các vạch đánh dấu, chạy `git add`, `git commit` và xóa nhánh tính năng an toàn.

---

## 💻 Command
```bash
git switch -c feature-challenge
git merge main
git status
git add <tên-tệp-đã-sửa>
git commit
git branch -d feature-challenge
```

---

## 🔍 Giải thích command
- `git switch -c <nhánh>`: Tạo nhánh giải quyết thử thách.
- `git merge main`: Thực hiện hợp nhất và kích hoạt tình huống thử thách.
- `git status`: Chẩn đoán danh sách các tệp đang chờ gỡ xung đột.
- `git add <tên-tệp>`: Đánh dấu đã giải quyết xong xung đột cho tệp.
- `git commit`: Hoàn tất tạo Merge Commit.
- `git branch -d <nhánh>`: Dọn dẹp nhánh tính năng sau khi hoàn tất xuất sắc.

---

## ⚠️ Sai lầm phổ biến
1. **Commit khi chưa xóa hết vạch markers:** Khiến chương trình bị lỗi cú pháp và bài kiểm tra tự động đánh giá không đạt.
2. **Dùng `git merge --abort` giữa chừng:** Lệnh này sẽ hủy bỏ bài làm và bạn phải thực hiện lại từ đầu.
3. **Quên xóa nhánh sau khi gộp xong:** Để lại nhánh thừa không cần thiết trong danh sách nhánh của dự án.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Kiểm tra đồ thị nhánh hiện tại bằng lệnh `git log --graph --oneline --all`.
2. Thực hiện hợp nhất nhánh tính năng vào nhánh chính.
3. Mở tệp xung đột, phân tích và giải quyết mâu thuẫn theo yêu cầu nghiệp vụ.
4. Đánh dấu hoàn tất bằng `git add` và kết thúc bằng `git commit`.
5. Xóa nhánh tính năng bằng lệnh `git branch -d` để hoàn tất thử thách.

---

## 💡 Hint
Hãy đọc kỹ cả hai đoạn code để kết hợp hài hòa cả hai logic tính toán thay vì chỉ giữ một bên.

---

## ✅ Validation
- Đồ thị commit thể hiện rõ nút giao hợp nhất thành công.
- Không còn bất kỳ tệp xung đột nào trong `git status`.
- Nhánh phụ được dọn dẹp sạch sẽ sau khi merge.

---

## ❓ Quiz
Trả lời các câu hỏi tổng kết sau để củng cố toàn bộ kiến thức về Branching & Merging trong Level 3.

---

## 🔥 Challenge
Tự mình tái hiện lại toàn bộ kịch bản tạo nhánh, gây xung đột và giải quyết xung đột trên một kho Git mới trên máy tính của bạn mà không cần nhìn tài liệu.

---

## 📚 Tổng kết
- Nắm vững toàn bộ chu trình: tạo nhánh, chuyển nhánh, 3-way merge và gỡ xung đột.
- Luôn bình tĩnh phân tích các vạch đánh dấu xung đột và trao đổi khi cần thiết.
- Tạo thói quen dọn dẹp các nhánh đã hoàn thành để giữ kho lưu trữ luôn sạch sẽ và chuyên nghiệp.
