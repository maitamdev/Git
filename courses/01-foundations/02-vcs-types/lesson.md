# Local / Centralized / Distributed VCS

---

## 🎯 Mục tiêu
- Phân biệt rõ 3 thế hệ kiến trúc VCS: Cục bộ (Local), Tập trung (Centralized), và Phân tán (Distributed).
- Đánh giá được ưu nhược điểm cốt lõi của SVN so với Git.
- Hiểu vì sao mô hình phân tán (DVCS) trở thành tiêu chuẩn thống trị ngành công nghiệp phần mềm hiện đại.

---

## 📖 Định nghĩa
> Hệ thống quản lý phiên bản trải qua ba thế hệ tiến hóa kiến trúc then chốt: Local VCS (quản lý lịch sử cục bộ trên cùng một máy đơn lẻ), Centralized VCS - CVCS (lưu trữ toàn bộ lịch sử trên một máy chủ trung tâm duy nhất, ví dụ SVN, CVS), và Distributed VCS - DVCS (mọi máy tính thành viên đều sao chép toàn bộ cơ sở dữ liệu lịch sử dự án về máy cục bộ, ví dụ Git, Mercurial). Trong DVCS, mỗi lập trình viên đều sở hữu một bản sao hoàn chỉnh của kho lưu trữ, cho phép làm việc độc lập hoàn toàn mà không phụ thuộc vào kết nối mạng liên tục.

---

## 🤔 Tại sao cần?
Hiểu rõ sự khác biệt giữa Centralized VCS và Distributed VCS giúp bạn nắm được lý do tại sao Git lại có tốc độ xử lý vượt trội và độ an toàn dữ liệu cao đến vậy. Với CVCS truyền thống, nếu máy chủ trung tâm bị mất mạng hoặc hỏng ổ cứng, toàn bộ đội ngũ lập trình viên sẽ bị ngưng trệ công việc, không thể commit hay xem lại lịch sử. Ngược lại, DVCS loại bỏ hoàn toàn điểm nghẽn đơn độc (Single Point of Failure), bảo đảm an toàn dữ liệu tuyệt đối.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy so sánh CVCS giống như một cuốn sổ cái duy nhất đặt tại thư viện thành phố, ai muốn ghi chép hay tra cứu đều phải đến tận nơi xếp hàng. Nếu tòa nhà thư viện bị cháy hoặc mất điện đóng cửa, không ai có thể làm việc được nữa. Trong khi đó, DVCS giống như việc mỗi thành viên trong hội nghiên cứu đều sở hữu một máy in 3D công nghệ cao, tự động đồng bộ và in ra một cuốn sổ cái hoàn chỉnh ngay tại phòng làm việc riêng của mình.

---

## 🖼 Sơ đồ
```text
Mô hình CVCS (SVN):                 Mô hình DVCS (Git):
   [Máy chủ trung tâm]                  [Server chia sẻ]
       ▲        ▲                           ▲        ▲
       │        │                           ▼        ▼
[Máy Client A] [Máy Client B]       [Repo Client A] [Repo Client B]
(Chỉ có Working Copy)               (Có đủ 100% lịch sử và commit)
```

---

## 🌎 Ví dụ thực tế
Một công ty phần mềm đa quốc gia với các chi nhánh tại Hà Nội, Tokyo và San Francisco cùng phát triển một nền tảng thương mại điện tử. Nếu sử dụng hệ thống SVN kiểu cũ, mỗi khi kỹ sư tại Hà Nội muốn tạo commit hoặc xem lịch sử code, lệnh phải gửi qua đường truyền Internet xuyên đại dương đến máy chủ đặt tại Mỹ, gây ra độ trễ hàng chục giây. Khi chuyển đổi sang Git, toàn bộ thao tác commit, tạo nhánh hay xem lịch sử diễn ra ngay tức thì trên ổ cứng máy tính tại Hà Nội, chỉ mất vài mili-giây mà không hề cần kết nối Internet.

---

## 💻 Command
```bash
git log
git status
```

---

## 🔍 Giải thích command
- `git log`: Hiển thị danh sách lịch sử toàn bộ các commit đã được ghi nhận trong kho lưu trữ cục bộ của bạn, bao gồm mã băm SHA tác giả ngày giờ và thông điệp mô tả thay đổi chi tiết.
- `git status`: Lệnh kiểm tra tình trạng hiện tại của các tệp tin trong thư mục làm việc so với kho chứa, giúp phát hiện tệp nào đang sửa hoặc chưa đưa vào diện theo dõi.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Git cần kết nối Internet để commit**:  Nhiều bạn lầm tưởng không có Wi-Fi thì không dùng được Git, thực chất Git hoạt động hoàn toàn offline trên máy tính của bạn.
2. **Nhầm lẫn giữa Git và SVN**:  Áp đặt tư duy khóa tệp (file locking) của SVN vào mô hình phân tán của Git.
3. **Không sao lưu kho chứa lên máy chủ từ xa**:  Ỷ lại vào máy cá nhân mà không đẩy dữ liệu lên GitHub để dự phòng rủi ro phần cứng hỏng hóc.

---

## 🧪 Lab
1. Kiểm tra khả năng hoạt động offline của Git bằng cách ngắt kết nối mạng hoặc thử chạy lệnh trong terminal cục bộ.
2. Sử dụng lệnh `git status` để xem phản hồi trạng thái từ cơ sở dữ liệu nội bộ.
3. Nhận biết rằng Git đọc dữ liệu trực tiếp từ ổ đĩa cục bộ chứ không gửi truy vấn HTTP nào ra ngoài.

---

## 💡 Hint
> Mọi thao tác commit và tạo nhánh trong Git đều diễn ra tức thì trên máy của bạn.

---

## ✅ Validation
- Hiểu bản chất phân tán của Git và phân biệt được với hệ thống tập trung.

---

## ❓ Quiz
Kiểm tra kiến thức về các mô hình kiến trúc quản lý phiên bản qua các câu hỏi sau.

---

## 🔥 Challenge
Phân tích tình huống rủi ro khi máy chủ lưu trữ chính bị hỏng trong mô hình SVN so với mô hình Git.

---

## 📚 Tổng kết
- Local VCS chỉ lưu trên một máy đơn lẻ; CVCS lưu tập trung trên một server trung tâm.
- Distributed VCS (Git) lưu đầy đủ toàn bộ cơ sở dữ liệu lịch sử trên mọi máy tính thành viên.
- Mô hình phân tán mang lại tốc độ cực nhanh, khả năng làm việc offline hoàn hảo và độ an toàn dữ liệu cao nhất.
