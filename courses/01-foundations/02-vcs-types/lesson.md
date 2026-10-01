# Local, Centralized và Distributed VCS

---

## 🎯 Mục tiêu
- Phân biệt nơi lưu lịch sử trong ba kiểu VCS: Local, Centralized và Distributed.
- Nói được Git và SVN thường thuộc kiểu nào.
- Biết thao tác nào vẫn làm được khi mất kết nối với máy chủ chia sẻ.

---

## 🧩 Từ khóa hôm nay

### Local VCS — VCS cục bộ
- **Nói dễ hiểu:** Lịch sử thay đổi được quản lý trên một máy tính.
- **Ví dụ:** Bạn tự lưu các mốc bài tập trên laptop bằng một công cụ VCS cài ở đó.
- **Đừng nhầm:** “Cục bộ” mô tả nơi có lịch sử chính; tự nó không giúp nhóm chia sẻ lịch sử.

### CVCS (Centralized VCS) — VCS tập trung
- **Nói dễ hiểu:** Máy chủ trung tâm giữ lịch sử dùng chung; mỗi người làm việc với một bản làm việc trên máy mình.
- **Ví dụ:** SVN là một công cụ thuộc mô hình này.
- **Đừng nhầm:** Khi máy chủ hoặc mạng gặp sự cố, máy bạn vẫn có thể còn tệp đang sửa, nhưng các thao tác cần máy chủ như gửi thay đổi mới sẽ bị ảnh hưởng.

### DVCS (Distributed VCS) — VCS phân tán
- **Nói dễ hiểu:** Với một bản clone đầy đủ thông thường, mỗi người có kho Git cục bộ kèm lịch sử để làm việc riêng.
- **Ví dụ:** Git là DVCS; bạn có thể tạo commit mới trên máy rồi chia sẻ sau khi có mạng.
- **Đừng nhầm:** “Phân tán” không có nghĩa là máy tự đồng bộ mọi thay đổi. Để chia sẻ, vẫn cần thao tác như push và pull.

### Clone — tạo bản sao kho lưu trữ
- **Nói dễ hiểu:** Tải một kho từ nơi chia sẻ về máy để bắt đầu làm việc.
- **Ví dụ:** Clone một dự án GitHub về laptop để xem mã nguồn và lịch sử.
- **Đừng nhầm:** Clone khác tải một tệp ZIP: một bản clone Git thông thường còn dùng được các lệnh và lịch sử Git.

---

## 🤔 Tại sao cần?
Giả sử cả nhóm cần tiếp tục làm bài khi máy chủ chia sẻ tạm thời không truy cập được. Với VCS tập trung, việc ghi thay đổi lên lịch sử dùng chung phải chờ máy chủ hoạt động. Với bản clone Git đầy đủ thông thường, mỗi người vẫn có thể xem lịch sử và lưu commit trên máy mình; việc chia sẻ những commit mới sẽ chờ đến khi kết nối lại.

Điều đó không làm Git thành hệ thống sao lưu hoàn hảo: nhóm vẫn cần đẩy dữ liệu lên nơi chia sẻ và có kế hoạch sao lưu phù hợp.

---

## 📖 Định nghĩa
Ba kiểu VCS khác nhau chủ yếu ở nơi lưu lịch sử. Local VCS giữ lịch sử trên một máy. Centralized VCS giữ lịch sử dùng chung trên máy chủ trung tâm. Distributed VCS như Git cho mỗi bản clone đầy đủ thông thường một kho cục bộ có thể làm việc độc lập.

---

## 🧠 Mental Model (Mô hình tư duy)
- **Local:** Một người giữ cuốn sổ lịch sử trên máy của mình.
- **Centralized:** Nhóm cùng ghi vào một cuốn sổ ở máy chủ; các bản làm việc của thành viên ở máy riêng.
- **Distributed:** Mỗi người có một cuốn sổ lịch sử riêng; khi có mạng, họ trao đổi các mốc cần chia sẻ.

---

## 🖼 Sơ đồ
```text
CVCS (ví dụ: SVN)                 DVCS (ví dụ: Git)
[Máy chủ giữ lịch sử]             [Nơi chia sẻ]
     ▲       ▲                      ▲       ▲
     │       │                      │       │
  [Máy A] [Máy B]                [Repo A] [Repo B]
  bản làm việc                    mỗi clone có lịch sử cục bộ
```

---

## 🌎 Ví dụ thực tế
Nhóm bạn clone dự án Git trước khi đi học ở nơi Wi-Fi chập chờn. Bạn có thể xem lịch sử và lưu commit ở máy. Khi mạng ổn định, bạn push commit lên nơi chia sẻ để các bạn khác lấy về. Git không tự đẩy dữ liệu và cũng không bảo đảm các bạn sửa cùng một dòng sẽ tự hòa hợp.

---

## 💻 Command
```bash
git status
```

---

## 🔍 Giải thích command
`git status` cho biết tình trạng tệp trong kho Git hiện tại, ví dụ tệp nào đang được sửa hoặc chưa được Git theo dõi. Đây là thao tác đọc thông tin cục bộ; nó không gửi thay đổi lên máy chủ.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ Git cần Internet cho mọi việc:** Nhiều thao tác trên kho cục bộ vẫn làm được khi offline; trao đổi với remote thì cần kết nối phù hợp.
2. **Nghĩ distributed nghĩa là tự đồng bộ:** Bạn vẫn cần chủ động lấy hoặc gửi thay đổi.
3. **Coi một kho cục bộ là bản sao lưu đủ an toàn:** Máy bị hỏng có thể làm mất bản đó; hãy chia sẻ và sao lưu theo quy trình của nhóm.

---

## 🧪 Lab
Tưởng tượng Wi-Fi vừa mất sau khi bạn clone dự án. Phân loại từng việc thành **làm được ngay trên Git cục bộ** hoặc **phải chờ kết nối**:
- Xem lịch sử đã có trong clone.
- Tạo một commit mới trên máy.
- Gửi commit lên GitHub.
- Nhận thay đổi mới từ GitHub.

---

## 💡 Hint
Hãy hỏi: “Lệnh này chỉ đọc/ghi kho đang ở trên máy mình, hay cần trao đổi với máy chủ?”

---

## ✅ Validation
- Phân biệt đúng Local VCS, CVCS và DVCS theo nơi có lịch sử.
- Nêu được Git có thể lưu commit cục bộ khi offline nhưng không thể push/pull khi mất kết nối.

---

## ❓ Quiz
Trả lời các câu hỏi sau và đọc lời giải thích sau mỗi câu.

---

## 🔥 Challenge
Vẽ ba hình nhỏ chỉ ra lịch sử được giữ ở đâu trong Local VCS, CVCS và một bản clone Git đầy đủ thông thường.

---

## 📚 Tổng kết
- Local VCS giữ lịch sử trên máy cục bộ; CVCS dựa vào lịch sử ở máy chủ trung tâm.
- DVCS như Git cho một bản clone đầy đủ thông thường lịch sử cục bộ để làm việc offline.
- Offline vẫn có giới hạn: gửi và nhận thay đổi từ nơi chia sẻ phải chờ kết nối.
