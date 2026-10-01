# Git là gì? VCS phân tán trên máy bạn

---

## 🎯 Mục tiêu
- Nói được Git là phần mềm quản lý phiên bản theo mô hình phân tán.
- Giải thích repository Git trên máy giữ những gì ở mức cơ bản.
- Dùng `git status` để xem trạng thái repository hiện tại.

---

## 🧩 Từ khóa hôm nay

### Git — công cụ quản lý phiên bản
- **Nói dễ hiểu:** Phần mềm ghi lại các mốc dự án bạn chọn để xem và so sánh về sau.
- **Ví dụ:** Bạn dùng Git trên laptop để quản lý lịch sử một bài tập.
- **Đừng nhầm:** Git là công cụ chạy trên máy; nó không tự tạo hoặc gửi commit nếu bạn chưa yêu cầu.

### DVCS — hệ thống quản lý phiên bản phân tán
- **Nói dễ hiểu:** Mô hình mà mỗi bản sao đầy đủ của kho thường mang theo lịch sử để làm việc độc lập.
- **Ví dụ:** Git cho phép bạn đọc lịch sử đã có và tạo commit trên máy khi offline.
- **Đừng nhầm:** Có lịch sử cục bộ không có nghĩa là các máy tự đồng bộ với nhau.

### Repository (repo) — kho Git của dự án
- **Nói dễ hiểu:** Dữ liệu Git gắn với dự án, gồm lịch sử phiên bản và thông tin để Git quản lý các tệp.
- **Ví dụ:** Sau khi tạo hoặc clone một dự án, Git có một repository trên máy để làm việc.
- **Đừng nhầm:** Repository Git có thể nằm trên máy bạn; không bắt buộc phải ở trên Internet.

---

## 🤔 Tại sao cần?
Git giữ lịch sử ngay trong repository trên máy. Vì vậy, sau khi có một bản sao đầy đủ của dự án, bạn có thể xem lịch sử đã tải về và lưu commit cục bộ mà không cần kết nối liên tục. Điều này hữu ích khi mạng chập chờn hoặc bạn muốn làm việc một mình trước khi chia sẻ.

---

## 📖 Định nghĩa
Git là một hệ thống quản lý phiên bản phân tán (DVCS). Nó dùng repository để quản lý tệp và lịch sử của dự án. Một repository Git đầy đủ thông thường có thể lưu và xem các commit trên máy mà không cần máy chủ trực tuyến.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng Git là người quản lý cuốn sổ lịch sử trên máy bạn. Repository là dữ liệu dự án đi cùng cuốn sổ đó. Bạn chọn lúc nào lưu một trạng thái; các máy khác chỉ nhận được commit sau khi bạn chủ động chia sẻ bằng cách sẽ học ở bài sau.

---

## 🖼 Sơ đồ
```text
Laptop của bạn
┌─────────────────────────────────────┐
│ Git                                 │
│  └── Repository của dự án           │
│       ├── các tệp dự án             │
│       └── lịch sử các commit đã lưu │
└─────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Bạn clone đầy đủ bài tập về laptop trước khi lên xe buýt. Không có mạng, bạn vẫn mở tệp và xem lịch sử đã có trong repository. Nếu cần lưu một mốc mới, Git ghi commit trong repository cục bộ; việc gửi mốc đó cho người khác là một bước riêng.

---

## 💻 Command
```bash
git status
```

---

## 🔍 Giải thích command
`git status` đọc repository hiện tại và cho biết tệp nào mới hoặc đã sửa. Lệnh này không tạo commit và không gửi dữ liệu qua mạng.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ Git chỉ chạy khi có mạng:** Nhiều thao tác trên repository đầy đủ đang ở máy vẫn thực hiện được offline.
2. **Nghĩ Git tự lưu mọi lần sửa tệp:** Bạn phải chủ động tạo commit để lưu một mốc vào lịch sử.
3. **Nghĩ mỗi repository Git đều nằm trên máy chủ:** Kho Git có thể chỉ nằm trên máy cá nhân.

---

## 🧪 Lab
1. Chạy `git status` trong terminal mô phỏng.
2. Ghi lại một thông tin lệnh cho biết về tệp trong repository.
3. Trả lời: lệnh vừa chạy có lưu commit hoặc gửi dữ liệu qua mạng không? Vì sao?

---

## 💡 Hint
`git status` chỉ báo tình trạng hiện tại; nó không ghi mốc mới và không trao đổi với máy chủ.

---

## ✅ Validation
- Nêu được Git là DVCS và repository có thể nằm trên máy cá nhân.
- Giải thích được `git status` chỉ đọc trạng thái, không tạo commit.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Khi sai, đọc lời giải thích rồi thử lại.

---

## 🔥 Challenge
Giải thích bằng một ví dụ vì sao Git vẫn hữu ích khi laptop tạm thời không có Internet.

---

## 📚 Tổng kết
- Git là công cụ quản lý phiên bản theo mô hình phân tán.
- Repository Git đầy đủ thông thường có thể lưu lịch sử trên máy.
- `git status` xem trạng thái hiện tại, không tạo commit.
