# Thử thách tổng hợp Branching Master

---

## 🎯 Mục tiêu
- Áp dụng tổng hợp toàn bộ kỹ năng Level 3 vào một kịch bản phát triển phần mềm đa nhánh thực chiến.
- Thực hiện tạo nhánh tính năng, chuyển nhánh, tạo commit độc lập, và phát hiện xung đột.
- Giải quyết thành công xung đột Merge Conflict và tạo Merge Commit chuẩn hóa.
- Dọn dẹp hệ thống nhánh sạch sẽ sau khi hoàn thành nhiệm vụ.

---

## 📖 Định nghĩa
> Thử thách tổng hợp Branching Master là bài kiểm tra năng lực toàn diện của Level 3, mô phỏng một kịch bản làm việc thực tế trong một nhóm phát triển phần mềm: bạn sẽ đóng vai trò một kỹ sư phụ trách tích hợp hai tính năng rẽ nhánh song song, chủ động đối mặt với tình huống xung đột code gay cấn, vận dụng thành thạo các công cụ chẩn đoán và hoàn tất quy trình hợp nhất mã nguồn sạch sẽ.

---

## 🤔 Tại sao cần?
Học lý thuyết về Branching và Merging chỉ là bước khởi đầu. Khả năng bình tĩnh xử lý các tình huống phân kỳ lịch sử, đọc hiểu các khối conflict markers phức tạp và tự tin đưa ra quyết định hợp nhất trong thực tế mới là thước đo năng lực thật sự của một kỹ sư Git chuyên nghiệp. Vượt qua thử thách này khẳng định bạn đã hoàn toàn làm chủ kỹ năng rẽ nhánh và hợp nhất.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung thử thách này giống như một bài thi sát hạch lái xe sa hình thực tế trên đường trường. Bạn đã học kỹ lý thuyết về chân phanh, chân ga và gương chiếu hậu (branch, switch, merge). Giờ là lúc bạn trực tiếp ngồi sau vô lăng, lái xe vượt qua những khúc cua ngoạn mục (phân kỳ lịch sử) và xử lý chướng ngại vật bất ngờ (xung đột conflict) để đưa chiếc xe về đích an toàn tuyệt đối.

---

## 🖼 Sơ đồ
```text
Kịch bản thử thách Branching Master:
               Commit C2 ──► Commit C3 (feature-a)
              /                                    \
Commit C1 ───                                       ──► Commit C5 (Resolved Merge)
              \                                    /
               Commit C4 (main - both modified) ──┘
```

---

## 🌎 Ví dụ thực tế
Trong kịch bản thử thách thực chiến, bạn nhận được nhiệm vụ phát triển ứng dụng bán vé xem phim trực tuyến cho một chuỗi rạp chiếu lớn. Nhánh main vừa cập nhật chính sách giá vé cuối tuần trong tệp ticket.js, trong khi nhánh feature-discount đang sửa logic giảm giá cho học sinh và sinh viên cũng trong đúng tệp ticket.js đó. Bạn tiến hành merge nhánh tính năng vào main, bình tĩnh đối mặt khi Git thông báo xung đột, sử dụng thành thạo kỹ thuật 4 bước để kết hợp cả hai chính sách giá vé vào hàm tính toán chung, chạy kiểm thử thành công, commit hoàn tất và xóa nhánh tính năng an toàn. Kết quả toàn bộ quy trình hợp nhất diễn ra trơn tru mà không làm gián đoạn hệ thống bán vé.

---

## 💻 Command
```bash
git switch -c feature-challenge
git merge main
git status
git add <resolved-file>
git commit
git branch -d feature-challenge
```

---

## 🔍 Giải thích command
- `git switch -c <nhánh>`: Tạo nhánh giải quyết thử thách.
- `git merge main`: Bắt đầu quá trình hợp nhất kích hoạt kịch bản thử thách.
- `git status`: Chẩn đoán trạng thái các tệp unmerged.
- `git add <resolved-file>`: Đánh dấu hoàn tất việc gỡ xung đột.
- `git commit`: Đóng gói Merge Commit ghi dấu chiến thắng thử thách.
- `git branch -d <nhánh>`: Dọn dẹp nhánh sau khi hoàn thành xuất sắc.

---

## ⚠️ Sai lầm phổ biến
1. **Vội vã commit khi chưa xóa hết các vạch markers**:  Khiến bài kiểm tra tự động đánh giá thất bại.
2. **Sử dụng git merge --abort giữa chừng**:  Sẽ làm hủy bỏ toàn bộ bài thi và bạn phải làm lại từ đầu.
3. **Quên xóa nhánh sau khi hoàn thành**:  Không đạt điểm tối đa ở phần dọn dẹp vệ sinh kho chứa.

---

## 🧪 Lab
1. Khởi động kịch bản thử thách tổng hợp multi-branch-challenge trong terminal.
2. Kiểm tra đồ thị nhánh hiện tại bằng `git log --graph --oneline --all`.
3. Thực hiện hợp nhất nhánh tính năng vào nhánh chính.
4. Mở tệp xung đột, phân tích và giải quyết mâu thuẫn theo yêu cầu nghiệp vụ.
5. Đánh dấu hoàn tất bằng `git add` và kết thúc bằng `git commit`.
6. Xóa nhánh tính năng để hoàn tất 100% thử thách.

---

## 💡 Hint
> Bình tĩnh đọc kỹ yêu cầu nghiệp vụ trong đề bài để giữ lại cả hai logic giảm giá và phụ thu.

---

## ✅ Validation
- Hệ thống chấm điểm tự động xác nhận kho chứa có đồ thị hợp nhất chuẩn và không còn conflict.

---

## ❓ Quiz
Làm bài trắc nghiệm tổng kết để củng cố toàn bộ kiến thức của Level 3: Branching & Merging.

---

## 🔥 Challenge
Mô phỏng lại toàn bộ kịch bản này trên máy tính cá nhân của bạn và giải quyết không cần xem tài liệu.

---

## 📚 Tổng kết
- Nắm vững toàn diện: tạo nhánh, chuyển nhánh, 3-way merge và resolve conflict.
- Bình tĩnh phân tích conflict markers và trao đổi logic trước khi đưa ra quyết định.
- Luôn dọn dẹp các nhánh đã hoàn thành để duy trì kho lưu trữ chuyên nghiệp.
