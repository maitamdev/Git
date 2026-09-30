# Version Control là gì?

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất và lý do ra đời của hệ thống quản lý phiên bản (Version Control System - VCS).
- Phân tích được các rủi ro nghiêm trọng khi phát triển phần mềm mà không có công cụ theo dõi lịch sử.
- Nắm bắt bức tranh tổng quan về cách các kỹ sư phần mềm chuyên nghiệp lưu vết mã nguồn.

---

## 📖 Định nghĩa
> Hệ thống quản lý phiên bản (Version Control System - viết tắt là VCS) là một tập hợp các công cụ phần mềm chuyên dụng được thiết kế nhằm mục đích ghi nhận, theo dõi và quản lý mọi sự thay đổi trên các tệp tin mã nguồn theo dòng thời gian. Khi sử dụng VCS, lập trình viên có khả năng tra cứu lại toàn bộ lịch sử phát triển của dự án, xem ai đã chỉnh sửa những dòng code nào vào thời điểm nào, đối chiếu các bản sửa đổi với nhau và khôi phục lại trạng thái hoạt động ổn định trước đó bất cứ khi nào phát sinh lỗi bất ngờ.

---

## 🤔 Tại sao cần?
Trong thực tế phát triển phần mềm, việc lập trình viên chỉnh sửa code dẫn đến lỗi ngoài ý muốn là điều diễn ra hàng ngày. Nếu không sử dụng Version Control, lập trình viên thường phải đối mặt với nguy cơ mất trắng dữ liệu hoặc phải duy trì hàng loạt thư mục đặt tên thủ công như project_final, project_final_v2, project_that_su_final. Cách làm này vừa tốn dung lượng ổ đĩa, vừa gây nhầm lẫn trầm trọng khi làm việc nhóm, không thể biết tệp tin nào chứa code mới nhất và hoàn toàn bất lực khi cần truy cứu trách nhiệm hoặc tái hiện lại lỗi.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hệ thống Version Control giống như một cỗ máy thời gian kết hợp cùng chiếc camera an ninh ghi hình liên tục trong một xưởng chế tác nghệ thuật. Mỗi khi người nghệ nhân hoàn thành một công đoạn ưng ý, cỗ máy sẽ chụp lại một tấm ảnh lưu niệm với độ phân giải siêu nét và đánh dấu số thứ tự vào sổ nhật ký lưu trữ. Nếu công đoạn điêu khắc tiếp theo gặp sự cố làm nứt vỡ tác phẩm, người nghệ nhân chỉ cần bấm nút quay ngược thời gian để đưa khối gỗ trở về nguyên trạng thời điểm tấm ảnh đẹp nhất được ghi nhận.

---

## 🖼 Sơ đồ
```text
Thời gian ─────────────────────────────────────────────────────────►
[Bản thảo sơ khai] ──> [Bổ sung giao diện] ──> [Sửa lỗi đăng nhập]
     (Ảnh chụp 1)           (Ảnh chụp 2)            (Ảnh chụp 3 - HEAD)
          │                                              │
          └─────────── Có thể du hành quay lại ──────────┘
```

---

## 🌎 Ví dụ thực tế
Hãy tưởng tượng một công ty công nghệ tài chính FinTech gồm năm kỹ sư lập trình cùng phát triển một ứng dụng ngân hàng số trực tuyến. Một kỹ sư phụ trách module xác thực vân tay, một người khác xây dựng tính năng chuyển tiền nhanh qua mã QR. Nếu cả hai người cùng mở một tệp xử lý giao dịch chung và sửa đổi mà không có hệ thống quản lý phiên bản điều phối, mã nguồn của người này sẽ ghi đè lên công sức của người kia khi lưu tệp. Nhờ có Version Control, mọi thay đổi của từng kỹ sư đều được ghi nhận riêng biệt thành các mốc rõ ràng, cho phép tích hợp an toàn mà không làm gián đoạn hệ thống thanh toán cốt lõi của ngân hàng.

---

## 💻 Command
```bash
git --version
git help
```

---

## 🔍 Giải thích command
- `git --version`: Lệnh dùng để kiểm tra phiên bản Git hiện đang được cài đặt trong hệ điều hành máy tính của bạn.
- `git help`: Lệnh hiển thị tài liệu hướng dẫn tra cứu chi tiết danh mục các câu lệnh cơ bản của Git.

---

## ⚠️ Sai lầm phổ biến
1. **Sao chép thư mục thủ công**:  Nhiều người mới bắt đầu học lập trình có thói quen copy-paste cả thư mục dự án ra Desktop rồi đổi tên theo ngày tháng, dẫn đến việc rối loạn phiên bản và làm đầy bộ nhớ máy tính.
2. **Sợ hãi khi gặp lỗi**:  Không lưu vết thường xuyên vì sợ code chưa hoàn hảo, khiến cho đến cuối ngày khi phần mềm bị crash thì không còn bất kỳ điểm phục hồi nào để quay lui an toàn.
3. **Chia sẻ mã nguồn qua tin nhắn**:  Gửi các tệp code rời rạc qua Zalo, Messenger hoặc Email thay vì đẩy lên kho lưu trữ tập trung, khiến các thành viên khác trong nhóm tích hợp sai lệch phiên bản.

---

## 🧪 Lab
1. Mở terminal và gõ lệnh `git --version` để xác nhận Git đã sẵn sàng hoạt động trên hệ thống.
2. Chạy lệnh `git help` để làm quen với danh sách các câu lệnh trợ giúp mặc định.
3. Quan sát các thông điệp phản hồi từ giao diện dòng lệnh.

---

## 💡 Hint
> Luôn kiểm tra kỹ câu lệnh trước khi bấm Enter để tránh gõ sai chính tả.

---

## ✅ Validation
- Hệ thống hiển thị đúng thông tin phiên bản Git và thoát mã 0.

---

## ❓ Quiz
Hãy hoàn thành bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt khái niệm Version Control.

---

## 🔥 Challenge
Giải thích cho một người bạn chưa biết lập trình hiểu vì sao lập trình viên không nên lưu file theo kiểu copy-paste thủ công.

---

## 📚 Tổng kết
- Version Control System (VCS) là nền tảng sống còn giúp ghi nhận toàn bộ lịch sử chỉnh sửa mã nguồn của dự án.
- VCS loại bỏ hoàn toàn phương pháp quản lý file thủ công nguy hiểm như sao chép thư mục và gửi tệp qua chat.
- Cung cấp khả năng du hành thời gian, giúp lập trình viên tự tin thử nghiệm các giải pháp kiến trúc mới mà không sợ phá hỏng code cũ.
