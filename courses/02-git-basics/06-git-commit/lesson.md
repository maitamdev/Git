# Lưu snapshot với git commit

---

## 🎯 Mục tiêu
- Nắm vững bản chất kỹ thuật của Commit trong Git như một snapshot toàn vẹn của cây thư mục.
- Sử dụng thành thạo các câu lệnh `git commit -m "<thông-điệp>"` và `git commit -am "<thông-điệp>`.
- Hiểu cách Git liên kết các commit qua cấu trúc Directed Acyclic Graph (DAG) và mã băm SHA.
- Tuân thủ quy ước viết thông điệp commit rõ ràng và súc tích.

---

## 📖 Định nghĩa
> `git commit` là câu lệnh cốt lõi dùng để ghi lại một điểm kiểm tra (checkpoint / snapshot) vĩnh viễn trong lịch sử của kho mã nguồn (Repository). Mỗi commit bao gồm một ảnh chụp cây thư mục hoàn chỉnh tại thời điểm đó, thông tin định danh tác giả (author name và email), mốc thời gian (timestamp), thông điệp mô tả thay đổi (commit message), và con trỏ trỏ tới một hoặc nhiều commit cha (parent commits). Khác với các hệ thống VCS cũ lưu sự khác biệt dòng code (deltas), Git lưu toàn bộ cây thư mục dưới dạng Snapshot tối ưu.

---

## 🤔 Tại sao cần?
Commit chính là đơn vị tiền tệ cơ bản của hệ thống Git. Nếu không có commit, toàn bộ công sức bạn viết code suốt nhiều tuần có thể biến mất bất kỳ lúc nào nếu máy tính gặp sự cố phần cứng. Tạo commit thường xuyên với kích thước vừa phải và thông điệp chuẩn mực giúp bạn sở hữu một cỗ máy thời gian hoàn hảo: bạn có thể tự do thử nghiệm các giải pháp táo bạo, và khi gặp ngõ cụt thì chỉ mất một giây để quay lui về mốc an toàn gần nhất.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc chạy lệnh `git commit` giống như thao tác bấm nút Lưu game (Save Point) trong một tựa game nhập vai phiêu lưu mạo hiểm. Trước khi bước vào căn phòng đánh trùm nguy hiểm, bạn luôn tìm điểm save game để ghi lại toàn bộ chỉ số máu, trang bị và vị trí của nhân vật. Nếu bạn bị hạ gục trong trận chiến, bạn chỉ việc tải lại điểm save game đó để thử lại chiến thuật mới mà không phải chơi lại từ đầu màn một.

---

## 🖼 Sơ đồ
```text
Cấu trúc liên kết Commit trong đồ thị DAG:
Commit #1 (Initial)          Commit #2 (Feature)          Commit #3 (Bugfix - HEAD)
┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│ Tree: 8a4c10         │ ◄── │ Tree: 9f2e30         │ ◄── │ Tree: 7c1b50         │
│ Author: Nam Nguyen   │     │ Author: Nam Nguyen   │     │ Author: Nam Nguyen   │
│ Parent: (none)       │     │ Parent: Commit #1    │     │ Parent: Commit #2    │
│ Msg: init project    │     │ Msg: add login page  │     │ Msg: fix login button│
└──────────────────────┘     └──────────────────────┘     └──────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư phần mềm hoàn thành xong chức năng đặt lại mật khẩu qua email cho người dùng. Kỹ sư chạy lệnh git add để đưa các tệp liên quan vào Staging Area, sau đó thực hiện lệnh: `git commit -m "feat(auth): implement password reset via email token"`. Ngay lập tức, Git tạo ra một commit object mới mang mã băm c9a4f21 trỏ về commit trước đó, ghi nhận thời gian chính xác và dịch chuyển con trỏ HEAD của nhánh main tiến lên mốc mới này. Toàn bộ ảnh chụp trạng thái code lúc này đã được lưu vĩnh viễn trong cơ sở dữ liệu của dự án, sẵn sàng để đồng nghiệp tải về kiểm thử bất cứ lúc nào.

---

## 💻 Command
```bash
git commit -m "feat: your commit message"
git commit -am "fix: quick fix"
git commit --amend
```

---

## 🔍 Giải thích command
- `git commit -m "<thông-điệp>"`: Tạo một commit mới từ các tệp tin đã nằm trong Staging Area kèm thông điệp mô tả tóm tắt ngắn gọn.
- `git commit -am "<thông-điệp>"`: Phím tắt tự động stage tất cả các tệp Modified và tạo commit mà không cần chạy git add trước (không áp dụng cho tệp Untracked).
- `git commit --amend`: Chỉnh sửa commit gần nhất trên đỉnh HEAD (thêm tệp sót hoặc viết lại thông điệp commit).

---

## ⚠️ Sai lầm phổ biến
1. **Thông điệp commit vô nghĩa**:  Viết những câu như "fix", "update", "asdfgh" khiến đồng nghiệp và chính bạn sau này không thể hiểu commit đó làm gì.
2. **Commit quá lớn (Mega-commit)**:  Gom công việc của cả tuần với hàng trăm thay đổi không liên quan vào một commit duy nhất khiến việc review và tìm lỗi bất khả thi.
3. **Nghĩ commit là đã đẩy lên mạng**:  Commit chỉ lưu trên kho chứa máy tính cá nhân cục bộ, phải chạy lệnh git push thì code mới lên GitHub.

---

## 🧪 Lab
1. Tạo hoặc chỉnh sửa tệp `main.js` với nội dung mới.
2. Đưa tệp vào Staging Area bằng lệnh `git add main.js`.
3. Tạo commit đầu tiên bằng câu lệnh `git commit -m "feat: initialize main app"`.
4. Kiểm tra lại bằng `git log --oneline` để thấy commit mới sinh ra.

---

## 💡 Hint
> Một commit tốt nên tập trung vào một nhiệm vụ duy nhất và có thông điệp rõ ràng.

---

## ✅ Validation
- Kiểm tra `git log` có xuất hiện commit với đúng thông điệp đã nhập.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết sâu sắc về câu lệnh git commit.

---

## 🔥 Challenge
Nêu sự khác nhau giữa commit trong Git và commit trong cơ sở dữ liệu quan hệ SQL.

---

## 📚 Tổng kết
- Git Commit là mốc snapshot vĩnh viễn ghi nhận toàn bộ trạng thái dự án tại một thời điểm.
- Mỗi commit gồm cây thư mục, tác giả, ngày giờ, thông điệp và liên kết trỏ về commit cha.
- Sử dụng quy ước Conventional Commits giúp lịch sử dự án chuyên nghiệp và dễ bảo trì.
