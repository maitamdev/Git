# Ba kiểu quản lý phiên bản: cục bộ, tập trung, phân tán

---

## 🎯 Mục tiêu
- Phân biệt nơi giữ lịch sử trong Local VCS, CVCS và DVCS.
- Nhận ra Git là DVCS và SVN thường được dùng theo mô hình CVCS.
- Chọn được việc có thể làm khi máy không kết nối với nơi chia sẻ.

---

## 🧩 Từ khóa hôm nay

### Local VCS — quản lý phiên bản cục bộ
- **Nói dễ hiểu:** Lịch sử thay đổi được giữ trên một máy tính.
- **Ví dụ:** Một người dùng công cụ VCS lưu các mốc bài tập trên laptop của mình.
- **Đừng nhầm:** Lịch sử nằm trên máy cá nhân không tự trở thành lịch sử dùng chung của nhóm.

### CVCS (Centralized VCS) — quản lý phiên bản tập trung
- **Nói dễ hiểu:** Một máy chủ trung tâm giữ lịch sử dùng chung; thành viên lấy tệp về máy mình để làm việc.
- **Ví dụ:** SVN thường được dùng theo mô hình tập trung.
- **Đừng nhầm:** Máy cá nhân có thể còn tệp đang sửa, nhưng việc lưu phiên bản mới vào lịch sử chung cần máy chủ.

### DVCS (Distributed VCS) — quản lý phiên bản phân tán
- **Nói dễ hiểu:** Mỗi bản sao Git đầy đủ thông thường có lịch sử riêng trên máy, nên vẫn có thể làm nhiều việc khi offline.
- **Ví dụ:** Sau khi sao chép đầy đủ một dự án Git, bạn có thể xem lịch sử đã có và lưu commit mới trên laptop.
- **Đừng nhầm:** Mỗi bản sao không tự đồng bộ với các bản khác. Bạn chủ động gửi (push) hoặc lấy (pull) thay đổi khi có kết nối.

### Clone — sao chép một kho Git
- **Nói dễ hiểu:** Tạo một bản sao của kho Git để làm việc trên máy mình.
- **Ví dụ:** Clone một dự án Git về laptop để xem tệp và lịch sử của dự án.
- **Đừng nhầm:** Clone Git thông thường gồm lịch sử dự án; tải tệp ZIP thường không mang theo kho lịch sử Git.

---

## 🤔 Tại sao cần?
Hãy tưởng tượng máy chủ chia sẻ của nhóm tạm thời không truy cập được. Với CVCS, nhóm vẫn có thể sửa tệp trên máy, nhưng không thể lưu phiên bản mới vào lịch sử chung cho tới khi máy chủ hoạt động lại. Với một bản clone Git đầy đủ thông thường, bạn vẫn có thể xem lịch sử đã tải về và lưu commit trên máy mình. Việc gửi hoặc lấy thay đổi từ nơi chia sẻ phải đợi kết nối.

Git không tự đồng bộ các máy và một bản Git chỉ có trên laptop vẫn có thể mất nếu laptop hỏng. Nhóm cần chủ động chia sẻ và sao lưu dữ liệu theo cách phù hợp.

---

## 📖 Định nghĩa
Ba mô hình khác nhau chủ yếu ở nơi giữ lịch sử. Local VCS giữ lịch sử trên một máy. CVCS giữ lịch sử chung trên máy chủ trung tâm. DVCS như Git thường sao chép cả kho và lịch sử về máy thành viên, để mỗi bản sao có thể làm việc độc lập.

---

## 🧠 Mental Model (Mô hình tư duy)
- **Local:** Một người giữ cuốn sổ lịch sử trên máy cá nhân.
- **Centralized:** Cả nhóm dùng một cuốn sổ chung trên máy chủ.
- **Distributed:** Mỗi thành viên có một cuốn sổ riêng; khi kết nối lại, họ chọn gửi hoặc lấy các mốc cần chia sẻ.

---

## 🖼 Sơ đồ
```text
CVCS — ví dụ: SVN                 DVCS — ví dụ: Git
[Máy chủ: lịch sử chung]         [Nơi chia sẻ, nếu nhóm dùng]
       ▲       ▲                         ▲       ▲
       │       │                    gửi / lấy khi có mạng
 [Máy A]     [Máy B]              [Bản A + lịch sử] [Bản B + lịch sử]
  tệp làm việc                       mỗi bản có thể làm việc riêng
```

---

## 🌎 Ví dụ thực tế
Bạn clone đầy đủ bài tập Git trước khi đi học ở nơi Wi-Fi yếu. Bạn vẫn xem được lịch sử đã có và lưu commit mới trên laptop. Khi mạng hoạt động lại, bạn gửi commit để nhóm cùng nhận. Git không tự gửi commit, và nhóm vẫn cần xử lý nếu nhiều người sửa cùng một phần nội dung.

---

## 💻 Command
Bài này dùng tình huống để so sánh ba mô hình; chưa cần chạy lệnh Git.

---

## 🔍 Giải thích command
Phần thực hành tập trung vào nơi lịch sử được giữ và việc nào cần kết nối. Các lệnh xem lịch sử và trạng thái sẽ được học ở những bài sau.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ Git cần mạng cho mọi thao tác:** Nhiều việc trên bản Git đã có ở máy vẫn làm được offline.
2. **Nghĩ DVCS tự đồng bộ:** Bạn vẫn phải chủ động gửi hoặc lấy thay đổi khi có kết nối.
3. **Coi một bản Git cục bộ là bản sao lưu an toàn:** Nếu thiết bị hỏng và không có bản nào khác, lịch sử có thể mất.

---

## 🧪 Lab
Giả sử bạn đã clone đầy đủ một dự án Git rồi mất kết nối. Phân loại từng việc thành **làm được ngay trên máy** hoặc **phải đợi kết nối**:
1. Xem lịch sử đã có trong bản clone.
2. Sửa tệp và lưu một commit mới trên máy.
3. Gửi commit mới để thành viên khác nhận được.
4. Lấy thay đổi mới nhất từ máy chủ chia sẻ.

---

## 💡 Hint
Hãy hỏi: “Thao tác này chỉ đọc hoặc ghi bản Git đang ở trên máy, hay cần trao đổi dữ liệu với máy khác?”

---

## ✅ Validation
- Xác định đúng nơi lịch sử được giữ trong cả ba mô hình.
- Nêu được vì sao bản clone Git đầy đủ vẫn có thể làm việc offline.
- Phân biệt việc lưu commit cục bộ với gửi hoặc lấy thay đổi qua mạng.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Khi sai, đọc phần giải thích rồi thử lại.

---

## 🔥 Challenge
Vẽ ba hình nhỏ cho Local VCS, CVCS và DVCS. Đánh dấu bản nào giữ lịch sử và lúc nào cần kết nối mạng.

---

## 📚 Tổng kết
- Local VCS giữ lịch sử trên một máy; CVCS giữ lịch sử chung trên máy chủ.
- Bản clone Git đầy đủ thông thường có cả lịch sử cục bộ để làm việc offline.
- Gửi hoặc lấy thay đổi giữa các máy cần kết nối và thao tác chủ động.
