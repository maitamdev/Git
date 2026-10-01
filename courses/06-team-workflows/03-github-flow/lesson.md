# GitHub Flow

---

## 🎯 Mục tiêu
- Nắm vững triết lý đơn giản, tinh gọn và hướng tới chuyển giao liên tục (Continuous Delivery) của GitHub Flow.
- Hiểu rõ 6 bước tuần tự của GitHub Flow từ rẽ nhánh đến triển khai tự động lên môi trường Production.
- Xác định được các dự án phù hợp lý tưởng với GitHub Flow: ứng dụng web, microservices và SaaS.
- Phân biệt điểm khác biệt giữa GitHub Flow và các mô hình đa nhánh phức tạp như Git Flow.

---

## 🧩 Từ khóa hôm nay

### GitHub Flow
- **Nói dễ hiểu**: Quy trình phân nhánh tinh gọn xoay quanh nhánh main luôn sẵn sàng deploy và các nhánh feature ngắn hạn mở PR.
- **Ví dụ**: Tạo nhánh `feat/apple-pay` từ main, mở PR test xong merge vào main và deploy tự động ngay trong ngày.
- **Đừng nhầm**: Khác với Git Flow, GitHub Flow không sử dụng nhánh develop hay release trung gian.

### Always Deployable Main
- **Nói dễ hiểu**: Nguyên tắc nhánh main luôn ở trạng thái hoàn hảo, không có lỗi và có thể triển khai lên production bất cứ thời điểm nào.
- **Ví dụ**: Mọi code trước khi vào main đều phải vượt qua CI/CD và review; không bao giờ commit code dở dang lên main.
- **Đừng nhầm**: Không có nghĩa là code nào viết xong cũng push thẳng vào main; phải qua Pull Request kiểm duyệt trước.

### Continuous Delivery (Chuyển giao liên tục)
- **Nói dễ hiểu**: Phương thức phát triển phần mềm trong đó mã nguồn mới được tự động đóng gói, kiểm thử và sẵn sàng phát hành liên tục.
- **Ví dụ**: Khi PR được merge vào main, pipeline tự động chạy kiểm thử và cập nhật lên máy chủ chỉ trong vài phút.
- **Đừng nhầm**: Khác với mô hình phát hành theo kỳ quý hàng tháng; Continuous Delivery phát hành nhiều lần mỗi ngày.

---

## 📖 Định nghĩa
GitHub Flow là quy trình phân nhánh tinh gọn và linh hoạt được thiết kế cho các dự án web và đám mây hiện đại. Trọng tâm của quy trình là nhánh main luôn ở trạng thái sẵn sàng triển khai lên Production, kết hợp với các nhánh tính năng ngắn hạn được tích hợp liên tục qua Pull Request.

---

## 💡 Tại sao cần
Trong kỷ nguyên đám mây và SaaS, các công ty công nghệ cần phát hành bản cập nhật nhiều lần mỗi ngày. Các mô hình đa nhánh cổ điển quá chậm chạp; GitHub Flow loại bỏ rào cản trung gian giúp nhóm đưa tính năng ra thị trường với tốc độ cao nhất.

---

## 🧠 Mental Model
Hãy hình dung tòa soạn báo điện tử cập nhật tin 24/7. Trang chủ chính là nhánh main. Phóng viên viết bản thảo trên nhánh phụ. Biên tập viên đọc duyệt trên Pull Request. Vừa bấm duyệt là bài báo lập tức xuất hiện trên trang chủ cho độc giả đọc ngay mà không cần đợi in ấn định kỳ.

---

## 📊 Sơ đồ minh họa
```text
Vòng tuần hoàn 6 bước chuẩn mực của GitHub Flow:
1. Tạo nhánh từ main (Create branch)
       │
       ▼
2. Thêm các commit rõ nghĩa (Add commits)
       │
       ▼
3. Mở Pull Request thảo luận (Open PR)
       │
       ▼
4. Thảo luận & Review code (Discuss & Review)
       │
       ▼
5. Triển khai thử nghiệm (Deploy & Test)
       │
       ▼
6. Hợp nhất vào main (Merge to main & Deploy Prod)
```

---

## 🏢 Ví dụ thực tế
Tại một công ty SaaS, kỹ sư Nam nâng cấp giao diện thanh toán bằng nhánh `ui/apple-pay` từ `main`. Khi mở PR, hệ thống tự động dựng môi trường xem trước. Sau khi review thử nghiệm thành công, Nam bấm Merge và hệ thống tự động triển khai phiên bản mới lên máy chủ thực tế chỉ sau 3 phút.

---

## 💻 Command & Cú pháp
```bash
git switch -c ui/apple-pay
git commit -m "feat(checkout): add Apple Pay button"
git push -u origin ui/apple-pay
gh pr create --title "feat: add Apple Pay" --body "Tested on Safari"
```

---

## 🔍 Giải thích command
- `git switch -c <name>`: Tạo nhánh tính năng mới tinh gọn bắt đầu từ nhánh main.
- `git commit -m <msg>`: Ghi lại từng bước tiến hóa của tính năng với thông điệp rõ nghĩa.
- `git push -u origin <name>`: Xuất bản nhánh lên GitHub để bắt đầu quy trình thảo luận nhóm.
- `gh pr create`: Lệnh GitHub CLI tiện lợi để mở Pull Request trực tiếp từ dòng lệnh mà không cần mở trình duyệt.

---

## ⚠️ Sai lầm phổ biến
1. **Để nhánh main ở trạng thái lỗi**: Vi phạm nguyên tắc thiêng liêng "main is always deployable", gây gián đoạn hệ thống.
2. **Duy trì nhánh tính năng quá dài ngày**: Nhánh tồn tại vài tuần đến vài tháng sẽ tích lũy sai biệt lớn và gây xung đột nghiêm trọng.
3. **Bỏ qua bước thử nghiệm trước khi merge**: Không xác nhận hoạt động trên môi trường staging trước khi bấm merge vào main.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Tạo một nhánh mới từ main mô tả một tính năng cụ thể.
2. Thực hiện commit thay đổi và đẩy nhánh lên remote.
3. Mở Pull Request trên giao diện GitHub và thêm nhãn mô tả trạng thái.
4. Quan sát quy trình kiểm tra tự động trước khi xác nhận hợp nhất vào nhánh chính.

---

## 💡 Hint & mẹo
> Chìa khóa thành công của GitHub Flow là các nhánh tính năng phải cực kỳ ngắn hạn và hệ thống CI/CD phải được tự động hóa tối đa.

---

## ✅ Validation & Kết quả mong đợi
- Nhánh main có thể triển khai lên môi trường thực tế bất cứ lúc nào trong ngày mà không gặp sự cố.
- Nắm vững 6 bước chuẩn mực trong chu trình vận hành của GitHub Flow.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây về quy trình tinh gọn GitHub Flow.

---

## 🚀 Thử thách nâng cao
Thiết lập một GitHub Actions workflow đơn giản để tự động triển khai bản thử nghiệm mỗi khi có Pull Request được mở.

---

## 📝 Tổng kết
- GitHub Flow chỉ duy trì một nhánh dài hạn duy nhất là `main`.
- Nhánh main luôn luôn sẵn sàng triển khai (Always Deployable).
- Mọi thay đổi đều được tích hợp qua Pull Request ngắn hạn và triển khai tự động.
