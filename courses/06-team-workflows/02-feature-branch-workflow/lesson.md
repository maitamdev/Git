# Feature Branch Workflow

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý cốt lõi của mô hình Feature Branch Workflow: cô lập hoàn toàn từng tính năng trên một nhánh riêng.
- Thực hiện chuẩn xác quy trình 5 bước: tạo nhánh -> phát triển -> push remote -> mở Pull Request -> hợp nhất.
- Áp dụng quy ước đặt tên nhánh tính năng chuyên nghiệp (feat/user-auth, fix/cart-total).
- Giải thích được vì sao mô hình này là nền tảng cơ sở của tất cả các mô hình workflow phức tạp khác.

---

## 🧩 Từ khóa hôm nay

### Feature Branch (Nhánh tính năng)
- **Nói dễ hiểu**: Nhánh tạm thời để phát triển một phần việc; thường rẽ từ nhánh đích như `main`.
- **Ví dụ**: Tạo nhánh `feat/google-auth` để thêm đăng nhập Google mà không đụng chạm đến code của đồng nghiệp.
- **Đừng nhầm**: Một nhánh không tự cô lập thư mục làm việc khỏi nhánh khác; nó giúp tách lịch sử commit. Chia việc thành PR nhỏ thường dễ review hơn.

### Branch Naming Convention
- **Nói dễ hiểu**: Quy ước đặt tên nhánh rõ ràng có tiền tố mục đích (feat/, fix/, chore/, docs/) theo dạng kebab-case.
- **Ví dụ**: Đặt tên `feat/shopping-cart` cho tính năng mới hoặc `fix/payment-timeout` cho bản sửa lỗi.
- **Đừng nhầm**: Tránh đặt tên tùy tiện như `test`, `branch-moi`, `nam-dev` khiến người khác không biết nhánh làm nhiệm vụ gì.

### Short-lived Branch
- **Nói dễ hiểu**: Nhánh được giữ ngắn để tích hợp thay đổi thường xuyên; thời lượng cụ thể phụ thuộc vào cách nhóm chia việc.
- **Ví dụ**: Hoàn thành form đổi mật khẩu trong 1 ngày, mở PR merge vào main rồi xóa nhánh để dọn dẹp kho lưu trữ.
- **Đừng nhầm**: Nhánh sống lâu làm tăng khoảng cách với nhánh đích và có thể khiến tích hợp khó hơn, nhưng conflict không xảy ra trong mọi trường hợp.

---

## 📖 Định nghĩa
Feature Branch Workflow là cách phát triển thay đổi trên nhánh riêng rồi tích hợp vào nhánh đích. Nhóm có thể yêu cầu PR, review hoặc CI trước khi merge; các yêu cầu này do quy trình và cấu hình repo đặt ra.

---

## 🤔 Tại sao cần?
Nhánh riêng giúp lịch sử commit của một thay đổi không trộn ngay vào nhánh đích. Nó không ngăn mọi xung đột: thay đổi vẫn cần được tích hợp và có thể chạm cùng dòng code với nhánh khác.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung nhà máy lắp ráp ô tô. Dây chuyền chính liên tục cho ra đời những chiếc xe hoàn chỉnh. Khi cần thử nghiệm hệ thống phanh mới, các kỹ sư mở một xưởng nghiên cứu phụ bên cạnh. Họ thỏa sức tháo lắp mà không làm gián đoạn dây chuyền lớn, chỉ đưa vào khi đã kiểm định an toàn.

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
Kỹ sư Trang làm chức năng đăng nhập Google. Trang cập nhật `main` mới nhất rồi tạo nhánh `feat/google-auth`. Sau khi hoàn thiện và đẩy lên GitHub, Trang tạo Pull Request. Đồng nghiệp review code, hệ thống kiểm tra tự động báo xanh và nhánh được gộp an toàn vào nhánh `main`.

---

## 💻 Command
```bash
git switch -c feat/<ten-tinh-nang>
git push -u origin feat/<ten-tinh-nang>
git fetch origin
git switch main
git pull --ff-only origin main
git branch -d feat/<ten-tinh-nang>
```

Các lệnh fetch/pull/push cần remote `origin` và quyền truy cập phù hợp. Nếu nhánh mặc định của dự án không phải `main`, hãy dùng đúng tên nhánh đó.

---

## 🔍 Giải thích command
- `git switch -c feat/<name>`: Vừa tạo vừa chuyển sang nhánh tính năng mới bắt đầu từ vị trí hiện tại.
- `git push -u origin <name>`: Đẩy nhánh lên máy chủ và thiết lập liên kết theo dõi (upstream tracking).
- `git fetch origin`: Cập nhật thông tin từ remote mà chưa thay đổi file trong nhánh hiện tại.
- `git pull --ff-only origin main`: Cập nhật `main` nếu có thể tiến thẳng; dừng nếu hai lịch sử đã phân kỳ.
- `git branch -d feat/<name>`: Xóa nhánh tính năng cục bộ một cách an toàn sau khi đã hợp nhất thành công.

---

## ⚠️ Sai lầm phổ biến
1. **Rẽ từ nhánh đích đã cũ**: Kiểm tra hướng dẫn của dự án và cập nhật đúng nhánh nền trước khi tạo nhánh tính năng.
2. **Đặt tên nhánh tùy tiện**: Đặt tên tối nghĩa như `my-branch`, `test` khiến người khác không hiểu nội dung tính năng.
3. **Gộp quá nhiều việc vào một nhánh**: Biến PR thành một khối khổng lồ làm đồng nghiệp quá tải khi review.

---

## 🧪 Lab
Làm trong repo thử nghiệm có remote mà bạn được phép push. Nếu chỉ dùng simulator không kết nối GitHub, làm các bước 1–2 rồi xem bước push/PR như phần đọc thêm.
1. Chạy `git status` để bảo đảm không có thay đổi cần giữ, sau đó chuyển sang nhánh đích và cập nhật nó theo hướng dẫn của repo.
2. Tạo một nhánh tính năng mới theo quy ước chuẩn: `git switch -c feat/user-profile`.
3. Thực hiện một commit mẫu, sau đó đẩy nhánh lên remote bằng `git push -u origin feat/user-profile`.
4. Xác nhận nhánh local và remote tracking bằng `git branch -vv`. Mở PR chỉ khi repo có remote GitHub và bạn có quyền truy cập.

---

## 💡 Hint
> Chia PR đủ nhỏ để review được; tích hợp thường xuyên giúp giảm độ lớn của chênh lệch với nhánh đích.

---

## ✅ Validation
- Tạo được nhánh cho một thay đổi và biết cách kiểm tra trạng thái của nó.
- Nêu được bước nào phụ thuộc remote, quyền truy cập hoặc chính sách PR của dự án.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về mô hình Feature Branch Workflow tiêu chuẩn.

---

## 🔥 Challenge
Trình bày cách xử lý nếu nhánh tính năng của bạn bị tụt hậu nhiều commit so với main trong thời gian bạn phát triển.

---

## 📚 Tổng kết
- Feature Branch Workflow cô lập toàn bộ công việc mới trên các nhánh rẽ riêng biệt.
- Nhánh tính năng tách commit khỏi nhánh đích cho tới khi tích hợp.
- Pull Request là cầu nối trung tâm để thảo luận, duyệt code và tích hợp nhánh tính năng vào main.
