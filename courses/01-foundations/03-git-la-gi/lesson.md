# Git là gì?

---

## 🎯 Mục tiêu
- Giải thích Git là một hệ thống quản lý phiên bản phân tán.
- Phân biệt Git (công cụ) với GitHub (dịch vụ lưu trữ và cộng tác).
- Nói được việc nào Git làm trên máy và việc nào cần kết nối Internet.

---

## 🧩 Từ khóa hôm nay

### Git — công cụ quản lý phiên bản
- **Nói dễ hiểu:** Phần mềm ghi lại các mốc thay đổi của dự án để bạn xem, so sánh và làm việc trên nhiều nhánh.
- **Ví dụ:** Dùng Git để lưu các bước làm bài nhóm rồi xem lại ai đã thay đổi gì trong từng mốc.
- **Đừng nhầm:** Git là công cụ chạy trên máy của bạn; không đồng nghĩa với GitHub.

### Repository (repo) — kho Git của dự án
- **Nói dễ hiểu:** Nơi Git quản lý tệp và lưu lịch sử của một dự án. Thư mục `.git` là phần dữ liệu Git dùng để làm việc đó.
- **Ví dụ:** Sau khi khởi tạo hoặc clone, thư mục dự án có thể trở thành một repository.
- **Đừng nhầm:** Repository không nhất thiết nằm trên Internet; nó có thể ở trên máy tính của bạn.

### GitHub — dịch vụ cộng tác trực tuyến
- **Nói dễ hiểu:** Một dịch vụ lưu kho Git trên Internet và cung cấp công cụ để nhóm chia sẻ, xem xét và quản lý công việc.
- **Ví dụ:** Nhóm push các commit lên GitHub để cùng xem và mở Pull Request.
- **Đừng nhầm:** GitHub không phải Git; Git có thể dùng trên máy mà không cần GitHub.

### Commit — một mốc đã lưu
- **Nói dễ hiểu:** Bản ghi có lời nhắn, đại diện cho trạng thái dự án mà bạn đã chọn lưu trong Git.
- **Ví dụ:** Commit “Tạo trang giới thiệu” giúp nhóm nhận ra mốc nào thêm trang đó.
- **Đừng nhầm:** Commit chỉ tồn tại trong kho nơi bạn tạo nó cho đến khi bạn chia sẻ lên remote.

---

## 🤔 Tại sao cần?
Git giúp bạn làm việc với lịch sử dự án ngay trên máy: lưu commit, xem lịch sử và tạo nhánh. GitHub thường được dùng để chia sẻ kho và cộng tác với người khác. Vì vậy, khi không có Internet, bạn vẫn có thể làm nhiều việc trong Git cục bộ nhưng chưa thể trao đổi commit với GitHub.

---

## 📖 Định nghĩa
Git là một hệ thống quản lý phiên bản phân tán (DVCS). Nó giúp lưu và đọc lại lịch sử dự án trong kho cục bộ. Git được tạo ra năm 2005 để hỗ trợ phát triển Linux. GitHub là một dịch vụ trực tuyến có thể lưu kho Git và hỗ trợ cộng tác.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tách thành hai phần: **Git** là bộ dụng cụ quản lý lịch sử; **GitHub** là một nơi trực tuyến để chia sẻ kho và phối hợp với nhóm. Bạn có thể dùng bộ dụng cụ trên máy trước, rồi kết nối với nơi chia sẻ khi cần.

---

## 🖼 Sơ đồ
```text
Trên máy bạn                         Trên Internet
[Git + kho cục bộ]  ── push ──►  [Kho trên GitHub]
[Git + kho cục bộ]  ◄─ pull ───  [Kho trên GitHub]

Lưu commit cục bộ: thường không cần Internet.
Gửi/nhận commit từ GitHub: cần kết nối và quyền truy cập phù hợp.
```

---

## 🌎 Ví dụ thực tế
Bạn làm bài nhóm trên laptop. Git lưu các mốc bạn tạo trong kho cục bộ. Khi có mạng, bạn gửi các mốc đó lên GitHub; bạn cùng nhóm lấy chúng về để xem hoặc tiếp tục làm. Nếu chưa gửi lên nơi khác, lịch sử vẫn chỉ nằm trên laptop này.

---

## 💻 Command
```bash
git --version
git status
```

---

## 🔍 Giải thích command
- `git --version`: xác nhận công cụ Git đã cài và xem số phiên bản.
- `git status`: đọc trạng thái của kho Git hiện tại trên máy. Lệnh cần được chạy bên trong một repository.

---

## ⚠️ Sai lầm phổ biến
1. **Gọi GitHub là Git:** Git là công cụ; GitHub là một dịch vụ trực tuyến có dùng Git.
2. **Cho rằng commit tự động xuất hiện trên GitHub:** Cần gửi commit lên remote bằng lệnh phù hợp.
3. **Tin rằng commit là bản sao lưu không thể mất:** Hãy đẩy dữ liệu quan trọng lên nơi khác và dùng quy trình sao lưu của nhóm.

---

## 🧪 Lab
Xếp bốn thẻ sau vào hai cột **Git trên máy** và **GitHub qua mạng**: tạo commit, xem lịch sử đã clone, push commit, mở Pull Request. Giải thích một lựa chọn của bạn.

---

## 💡 Hint
Nếu thao tác chỉ cần kho đã có trên máy, thường có thể làm offline. Nếu thao tác gửi/nhận dữ liệu hoặc mở trang cộng tác, cần kết nối.

---

## ✅ Validation
- Nói được Git là công cụ, GitHub là dịch vụ trực tuyến.
- Phân loại đúng commit cục bộ và thao tác trao đổi qua mạng.

---

## ❓ Quiz
Trả lời các câu hỏi sau; đọc giải thích nếu cần phân biệt Git với GitHub.

---

## 🔥 Challenge
Giải thích cho bạn học: “Tôi đã commit rồi nhưng bạn tôi chưa thấy trên GitHub” có thể là vì sao?

---

## 📚 Tổng kết
- Git quản lý lịch sử phiên bản trong repository trên máy và hỗ trợ làm việc phân tán.
- GitHub là một dịch vụ để lưu kho từ xa và cộng tác; nó không phải tên khác của Git.
- Commit cục bộ chưa tự xuất hiện trên GitHub; bạn cần gửi nó lên remote.
