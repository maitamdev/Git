# Kiểm tra trạng thái với git status

---

## 🎯 Mục tiêu
- Đọc và phân tích thành thạo toàn bộ các phần thông tin hiển thị bởi lệnh `git status`.
- Phân biệt rõ ràng giữa Changes to be committed, Changes not staged for commit, và Untracked files.
- Sử dụng định dạng ngắn gọn `git status -s` để quan sát trạng thái nhanh chóng.

---

## 📖 Định nghĩa
> `git status` là câu lệnh được sử dụng với tần suất cao nhất trong Git, có nhiệm vụ hiển thị bức tranh toàn cảnh về sự khác biệt giữa ba khu vực: Working Tree, Staging Area và con trỏ HEAD của Repository. Lệnh này phân loại rõ ràng các tệp tin theo từng nhóm trạng thái màu sắc trực quan: tệp đã được đưa vào Staging Area sẵn sàng commit, tệp đã theo dõi nhưng bị chỉnh sửa mà chưa stage, và các tệp mới hoàn toàn chưa từng được Git quản lý.

---

## 🤔 Tại sao cần?
Việc chạy `git status` trước và sau mỗi thao tác Git là thói quen sống còn của mọi kỹ sư phần mềm chuyên nghiệp. Nó giúp bạn tránh được những tai nạn ngớ ngẩn như commit nhầm file rác, quên chưa stage các thay đổi quan trọng, hoặc vô tình đang đứng sai nhánh mà không hay biết. Có thể nói, `git status` giống như bảng đồng hồ tốc độ và cảm biến an toàn trên chiếc xe ô tô mà bạn lái mỗi ngày.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git status` giống như một người bác sĩ chụp X-quang toàn thân cho dự án phần mềm của bạn. Mỗi khi bạn bước vào phòng khám (mở terminal), người bác sĩ sẽ quét một lượt từ đầu đến chân và đưa ra một bản chẩn đoán rõ ràng: bộ phận nào đang khỏe mạnh ổn định (Unmodified), bộ phận nào đang có biểu hiện viêm nhiễm cần xử lý (Modified), và có dị vật nào mới xuất hiện trong cơ thể hay không (Untracked).

---

## 🖼 Sơ đồ
```text
Bản chẩn đoán trạng thái git status:
┌─────────────────────────────────────────────────────────────┐
│ On branch main                                              │
│                                                             │
│ Changes to be committed:          <── (Màu xanh lá - Staged)│
│   (use "git restore --staged <file>" to unstage)            │
│         new file:   index.html                              │
│                                                             │
│ Changes not staged for commit:    <── (Màu đỏ - Modified)   │
│   (use "git add <file>" to update what will be committed)   │
│         modified:   styles.css                              │
│                                                             │
│ Untracked files:                  <── (Màu đỏ - Untracked)  │
│         notes.txt                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư mở máy tính vào sáng thứ Hai sau kỳ nghỉ cuối tuần. Không nhớ rõ thứ Sáu tuần trước mình đã làm dở những gì, kỹ sư mở terminal tại dự án và gõ ngay lệnh git status. Màn hình thông báo nhánh hiện tại là feature-login, có hai tệp auth.js và login.html đã nằm trong Staging Area, cùng một tệp test.log đang ở mục Untracked. Nhờ thông tin rõ ràng đó, kỹ sư lập tức nắm bắt lại ngữ cảnh làm việc và tiếp tục công việc một cách tự tin, đồng thời chủ động loại bỏ tệp log rác trước khi tiến hành đóng gói commit hoàn thiện.

---

## 💻 Command
```bash
git status
git status -s
git status --short
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị báo cáo trạng thái chi tiết kèm theo các chỉ dẫn và câu lệnh gợi ý hoàn tác hữu ích.
- `git status -s` (hoặc `--short`): Hiển thị trạng thái dưới định dạng hai ký tự ngắn gọn gọn gàng và dễ nhìn hơn.

---

## ⚠️ Sai lầm phổ biến
1. **Gõ lệnh mù quáng mà không kiểm tra git status trước**:  Dẫn đến việc add hoặc commit nhầm các file không mong muốn.
2. **Bỏ qua thông báo tệp Untracked**:  Tưởng rằng code đã được lưu an toàn nhưng thực tế file mới tạo chưa hề được đưa vào Git.
3. **Hiểu sai định dạng git status -s**:  Nhầm lẫn giữa cột ký tự bên trái (Staging Area) và cột bên phải (Working Tree).

---

## 🧪 Lab
1. Chạy lệnh `git status` trong kho lưu trữ để làm quen với giao diện kết quả mặc định.
2. Tạo một tệp mới và chạy `git status` để quan sát nhóm Untracked files.
3. Thử nghiệm cờ rút gọn bằng câu lệnh `git status -s`.

---

## 💡 Hint
> Hãy tạo phản xạ gõ `git status` trước bất kỳ lệnh add, commit hay chuyển nhánh nào.

---

## ✅ Validation
- Thực thi thành công `git status` và nhận diện đúng các khu vực trạng thái.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu lệnh git status.

---

## 🔥 Challenge
Giải thích ý nghĩa của hai ký tự `M ` (M ở cột 1) và ` M` (M ở cột 2) trong `git status -s`.

---

## 📚 Tổng kết
- `git status` là công cụ chẩn đoán quan trọng nhất để xem tình trạng 3 khu vực của Git.
- Phân tách rõ ràng: Changes to be committed (xanh), Not staged (đỏ), và Untracked (đỏ).
- Nên sử dụng thường xuyên để kiểm soát tuyệt đối các tệp tin trước khi đóng gói commit.
