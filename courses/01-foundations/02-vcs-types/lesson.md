# Ba kiểu quản lý phiên bản: Cục bộ, Tập trung và Phân tán

---

## 🎯 Mục tiêu
- Phân tích sự tiến hóa kiến trúc từ Local VCS, Centralized VCS (CVCS) đến Distributed VCS (DVCS).
- Hiểu rõ vì sao SVN phụ thuộc máy chủ trung tâm còn Git cho phép lập trình viên làm việc độc lập toàn diện.
- Nắm vững ranh giới giữa các thao tác chạy offline siêu tốc trên máy với các thao tác đòi hỏi kết nối mạng.

---

## 🧩 Từ khóa hôm nay

### Local VCS — Quản lý phiên bản cục bộ
- **Nói dễ hiểu:** Mô hình lưu trữ sơ khai, toàn bộ lịch sử tệp tin chỉ nằm co cụm trên một máy tính cá nhân duy nhất.
- **Ví dụ:** Bạn dùng công cụ RCS thời xưa để lưu các phiên bản mã nguồn bài tập lớn trên chiếc laptop của mình.
- **Đừng nhầm:** Lịch sử cục bộ chỉ bảo vệ bạn khỏi việc sửa sai trên máy đó; nếu ổ cứng hỏng hoặc cần làm việc nhóm thì mô hình này hoàn toàn bất lực.

### CVCS (Centralized VCS) — Quản lý phiên bản tập trung
- **Nói dễ hiểu:** Toàn bộ lịch sử dự án được cất giữ trên một máy chủ trung tâm duy nhất; máy lập trình viên chỉ tải về phiên bản đang làm việc.
- **Ví dụ:** Hệ thống SVN (Subversion) bắt buộc lập trình viên phải kết nối tới máy chủ công ty mỗi khi muốn ghi nhận một phiên bản mới.
- **Đừng nhầm:** Máy cá nhân trong CVCS không hề chứa lịch sử; khi máy chủ trung tâm gặp sự cố, cả đội ngũ phát triển đều bị đình trệ.

### DVCS (Distributed VCS) — Quản lý phiên bản phân tán
- **Nói dễ hiểu:** Mô hình hiện đại mà mỗi thành viên khi tải dự án về sẽ sở hữu toàn bộ bản sao lịch sử đầy đủ của cả kho mã nguồn.
- **Ví dụ:** Với Git, bạn ngồi trên máy bay không có mạng vẫn có thể duyệt lịch sử, tạo nhánh mới và ghi commit mượt mà.
- **Đừng nhầm:** Có bản sao phân tán không có nghĩa là code tự bay sang máy đồng nghiệp; bạn vẫn phải chủ động đẩy hoặc kéo dữ liệu khi có mạng.

### Clone — Nhân bản trọn vẹn kho mã nguồn
- **Nói dễ hiểu:** Thao tác tải toàn bộ mã nguồn cùng toàn bộ cuốn biên niên sử của dự án từ xa về máy cá nhân của bạn.
- **Ví dụ:** Thầy đưa đường dẫn dự án mẫu, bạn dùng lệnh clone để mang nguyên vẹn cả kho Git về máy thực hành.
- **Đừng nhầm:** Clone khác hoàn toàn việc tải file ZIP trên mạng; tải file nén chỉ cho bạn phần vỏ code hiện tại, còn clone mang về cả cỗ máy thời gian Git.

---

## 🤔 Tại sao cần?
Hãy hình dung bạn đang làm dự án tại một công ty dùng CVCS và đột nhiên đường truyền mạng nội bộ bị đứt. Toàn bộ lập trình viên không thể ghi nhận phiên bản, không thể xem lại lịch sử code cũ; cả dự án tê liệt hoàn toàn vì điểm nghẽn máy chủ trung tâm! DVCS như Git ra đời để giải phóng sức mạnh cho kỹ sư: mỗi chiếc laptop trở thành một máy chủ độc lập đầy đủ tính năng. Bạn làm việc với tốc độ ổ cứng cục bộ, không phụ thuộc đường truyền, và rủi ro mất dữ liệu gần như bằng không.

---

## 📖 Định nghĩa
Ba mô hình VCS phân hóa chủ yếu dựa trên vị trí lưu trữ lịch sử dự án. Local VCS giữ lịch sử trên một máy tính cá nhân. CVCS lưu toàn bộ lịch sử tập trung tại một máy chủ duy nhất. DVCS (tiêu biểu là Git) phân phối toàn bộ kho lưu trữ kèm toàn bộ lịch sử về máy của từng lập trình viên.

---

## 🧠 Mental Model (Mô hình tư duy)
- **Local VCS:** Bạn viết nhật ký vào một cuốn sổ tay cá nhân; mất sổ là mất tích.
- **CVCS:** Cả làng phải xếp hàng đến ủy ban xã để viết chung vào một cuốn sổ cái; ủy ban đóng cửa là cả làng nghỉ viết.
- **DVCS:** Mỗi người dân đều được in riêng một bản sao hoàn chỉnh của cuốn sổ cái; tha hồ ghi chép tại nhà rồi hẹn ngày đối chiếu đồng bộ sau.

---

## 🖼 Sơ đồ
```text
Mô hình CVCS (Ví dụ: SVN)               Mô hình DVCS (Ví dụ: Git)
 [Server trung tâm: Giữ lịch sử]         [Kho trung tâm chia sẻ]
       ▲             ▲                         ▲             ▲
  bắt buộc nối mạng                        đồng bộ khi có mạng
       │             │                         │             │
   [Máy A]        [Máy B]               [Máy A: Full lịch sử] [Máy B: Full lịch sử]
(Chỉ có file)   (Chỉ có file)          (Làm việc độc lập 100%) (Làm việc độc lập 100%)
```

---

## 🌎 Ví dụ thực tế
Một lập trình viên mang laptop về quê nghỉ cuối tuần nơi sóng mạng chập chờn. Nhờ Git là hệ thống phân tán, anh ta vẫn ung dung mở máy, xem lại từng dòng code đã sửa trong quá khứ, chia nhánh tính năng và commit liên tục cả chục lần mà không cần kết nối Internet. Khi trở lại văn phòng có mạng, anh ta chỉ việc đẩy toàn bộ các commit đó lên kho chung cho cả đội.

---

## 💻 Command
Bài học so sánh kiến trúc này giúp bạn hiểu tường tận bản chất vận hành của Git; bạn chưa cần gõ lệnh Git nào trong bài này.

---

## 🔍 Giải thích command
Phần thực hành tập trung vào việc rèn luyện tư duy phân biệt giữa các thao tác thực thi nội bộ trên ổ đĩa và các thao tác đồng bộ mạng lưới. Cú pháp cụ thể sẽ được giảng dạy ở bài kế tiếp.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Git bắt buộc phải có kết nối Internet mới hoạt động:** Đa số thao tác trong Git (như xem log, commit, tạo nhánh, kiểm tra diff) diễn ra hoàn toàn offline trên máy tính của bạn.
2. **Ngộ nhận rằng DVCS tự động đồng bộ code giữa các thành viên:** Git phân tán độc lập, nên sau khi code xong offline, bạn bắt buộc phải chủ động đẩy dữ liệu lên kho chung khi có mạng.
3. **Tưởng rằng clone về máy chỉ giống như tải một file ZIP:** Tải ZIP chỉ lấy được phần ngọn mã nguồn hiện tại, trong khi clone tải về toàn bộ cơ sở dữ liệu lịch sử của dự án.

---

## 🧪 Lab
Giả sử bạn vừa nhân bản (clone) một dự án Git về laptop và sau đó lên xe đò về quê (hoàn toàn không có mạng Internet). Hãy phân loại các tác vụ sau thành **Thực hiện được ngay lập tức** hoặc **Bắt buộc phải đợi có mạng**:
1. Xem lại danh sách các commit và tác giả đã làm dự án trong 6 tháng qua.
2. Viết thêm tính năng mới và đóng dấu mốc commit vào lịch sử.
3. Gửi các commit vừa tạo lên kho chung trên mạng để đồng nghiệp tích hợp.
4. Cập nhật những thay đổi mới nhất mà trưởng nhóm vừa tải lên vào sáng nay.

---

## 💡 Hint
Để phân biệt chính xác, người kỹ sư luôn tự hỏi: "Tác vụ này chỉ đọc ghi dữ liệu trên kho lưu trữ tại ổ cứng của mình, hay cần bắt tay gửi nhận gói tin với máy tính của người khác?"

---

## ✅ Validation
- Trình bày được ưu điểm vượt trội của mô hình phân tán (DVCS) so với mô hình tập trung (CVCS).
- Giải thích được tại sao điểm nghẽn máy chủ (Single Point of Failure) trong CVCS có thể làm tê liệt cả doanh nghiệp.
- Phân loại chuẩn xác các thao tác Git thực hiện offline và các thao tác cần kết nối Internet.

---

## ❓ Quiz
Trả lời các câu hỏi kiểm tra kiến thức kiến trúc bên dưới. Đọc kỹ phần đối chiếu của giảng viên để hiểu rõ từng phương án.

---

## 🔥 Challenge
Hãy vẽ lại sơ đồ tư duy so sánh ba mô hình Local, Centralized và Distributed trên giấy nháp; chỉ ra điểm chết hệ thống (Single Point of Failure) nằm ở đâu trong mô hình tập trung.

---

## 📚 Tổng kết
- Centralized VCS (CVCS) phụ thuộc hoàn toàn vào máy chủ trung tâm; máy chủ ngưng hoạt động thì công việc đình trệ.
- Git thuộc mô hình Distributed VCS (DVCS); mỗi máy lập trình viên là một kho chứa độc lập sở hữu trọn vẹn toàn bộ lịch sử.
- Làm việc với Git diễn ra cục bộ với tốc độ cực nhanh; kết nối mạng chỉ cần thiết khi bạn có nhu cầu đồng bộ với đồng đội.

