# Feature Branch Workflow

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý cốt lõi của mô hình Feature Branch Workflow: cô lập hoàn toàn từng tính năng trên một nhánh riêng.
- Thực hiện chuẩn xác quy trình 5 bước: tạo nhánh -> phát triển -> push remote -> mở Pull Request -> hợp nhất.
- Áp dụng quy ước đặt tên nhánh tính năng chuyên nghiệp (feat/user-auth, fix/cart-total).
- Giải thích được vì sao mô hình này là nền tảng cơ sở của tất cả các mô hình workflow phức tạp khác.

---

## 📖 Định nghĩa
> Feature Branch Workflow (Quy trình làm việc với nhánh tính năng) là mô hình cộng tác Git cơ bản và phổ biến nhất trong ngành công nghệ hiện đại. Quy tắc vàng bất di bất dịch của mô hình này là: nhánh chính (`main` hoặc `master`) chỉ chứa mã nguồn ổn định sẵn sàng hoạt động, và toàn bộ công việc phát triển tính năng mới hoặc sửa lỗi đều phải được thực hiện trên một nhánh rẽ độc lập chuyên biệt (Feature Branch). Nhánh này chỉ được hợp nhất quay trở lại nhánh chính sau khi đã vượt qua các bài kiểm thử tự động và được đồng nghiệp phê duyệt qua Pull Request.

---

## 🤔 Tại sao cần?
Nếu không sử dụng nhánh tính năng, nhiều lập trình viên cùng làm việc trên một nhánh sẽ liên tục giẫm chân lên nhau: mã nguồn dở dang của người này làm hỏng môi trường biên dịch của người khác, và không thể phát hành tính năng A đã xong nếu tính năng B đang bị lỗi kẹt lại. Feature Branch Workflow mang lại khả năng cô lập tuyệt đối: từng tính năng được phát triển, kiểm thử, thảo luận và hoàn thiện một cách độc lập hoàn toàn mà không làm ảnh hưởng đến nhánh chính cũng như các đồng nghiệp khác.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một nhà máy lắp ráp ô tô cao cấp. Dây chuyền trung tâm (`main`) liên tục lăn bánh những chiếc xe hoàn chỉnh, không tì vết. Mỗi khi cần thiết kế một hệ thống mới như phanh tự động hay định vị vệ tinh, đội kỹ sư sẽ mở một xưởng nghiên cứu phụ bên cạnh (`feat/brake-system`). Họ thỏa sức thử nghiệm, hàn gắn, tháo lắp mà không hề làm nghẽn dây chuyền chính. Chỉ khi hệ thống phanh hoạt động hoàn hảo và vượt qua kiểm định an toàn nghiêm ngặt, xưởng phụ mới chuyển giao cụm linh kiện đó để tích hợp vào dây chuyền lớn.

---

## 🖼 Sơ đồ
```text
Quy trình Feature Branch Workflow khép kín:
main:        C1 ────────────────────────────── C4 (Merge Commit / Fast-Forward)
              │                                ▲
              └─► [Tạo nhánh feat/auth]        │ (Sau khi Review & Pass CI)
                        │                      │
feat/auth:              C2 ───────► C3 ────────┘
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Trang được giao nhiệm vụ xây dựng chức năng đăng nhập bằng tài khoản Google. Đầu tiên, Trang chuyển về nhánh chính mới nhất bằng lệnh `git switch main` rồi cập nhật code qua `git pull origin main`. Sau đó, Trang tạo một nhánh mới theo quy ước: `git switch -c feat/google-auth`. Trong hai ngày tiếp theo, Trang thực hiện 4 commit hoàn thiện tính năng trên nhánh này. Sau khi kiểm thử cục bộ thành công, Trang đẩy nhánh lên máy chủ bằng `git push -u origin feat/google-auth` và tạo một Pull Request trên GitHub. Sau khi đồng nghiệp duyệt mã nguồn và hệ thống kiểm tra tự động báo xanh, nhánh được gộp an toàn vào nhánh `main`.

---

## 💻 Command
```bash
git switch -c feat/<ten-tinh-nang>
git push -u origin feat/<ten-tinh-nang>
git switch main && git pull origin main
git branch -d feat/<ten-tinh-nang>
```

---

## 🔍 Giải thích command
- `git switch -c feat/<name>`: Vừa tạo vừa chuyển sang nhánh tính năng mới bắt đầu từ vị trí hiện tại.
- `git push -u origin <name>`: Đẩy nhánh lên máy chủ và thiết lập liên kết theo dõi (upstream tracking).
- `git switch main && git pull`: Quay về nhánh chính và đồng bộ mã nguồn mới nhất từ remote server.
- `git branch -d feat/<name>`: Xóa nhánh tính năng cục bộ một cách an toàn sau khi đã hợp nhất thành công.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cập nhật nhánh main trước khi rẽ nhánh mới**:  Khiến nhánh tính năng bắt đầu từ nền tảng mã nguồn đã lỗi thời.
2. **Đặt tên nhánh chung chung, tối nghĩa như `my-branch`, `test`, `temp` khiến đồng nghiệp không hiểu mục đích.**: Đặt tên nhánh chung chung, tối nghĩa như `my-branch`, `test`, `temp` khiến đồng nghiệp không hiểu mục đích.
3. **Gộp quá nhiều tính năng không liên quan vào cùng một nhánh**:  Khiến Pull Request trở nên khổng lồ và khó review.

---

## 🧪 Lab
1. Đảm bảo nhánh main được cập nhật mới nhất bằng lệnh `git switch main && git pull origin main`.
2. Tạo một nhánh tính năng mới theo quy ước chuẩn: `git switch -c feat/user-profile`.
3. Thực hiện một commit mẫu, sau đó đẩy nhánh lên GitHub bằng `git push -u origin feat/user-profile`.

---

## 💡 Hint
> Mỗi nhánh tính năng chỉ nên phục vụ một mục đích duy nhất và có vòng đời ngắn từ vài giờ đến vài ngày.

---

## ✅ Validation
- Nhánh main luôn giữ được trạng thái có thể build và chạy thành công ở mọi thời điểm.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về mô hình Feature Branch Workflow tiêu chuẩn.

---

## 🔥 Challenge
Trình bày cách xử lý nếu nhánh tính năng của bạn bị tụt hậu nhiều commit so với main trong thời gian bạn phát triển.

---

## 📚 Tổng kết
- Feature Branch Workflow cô lập toàn bộ công việc mới trên các nhánh rẽ riêng biệt.
- Nhánh main luôn được bảo vệ nghiêm ngặt và chỉ chứa mã nguồn đã kiểm thử ổn định.
- Pull Request là cầu nối trung tâm để thảo luận, duyệt code và tích hợp nhánh tính năng vào main.
