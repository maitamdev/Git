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
- **Nói dễ hiểu**: Nhánh độc lập được rẽ từ nhánh main để phát triển duy nhất một tính năng hoặc sửa một lỗi cụ thể.
- **Ví dụ**: Tạo nhánh `feat/google-auth` để thêm đăng nhập Google mà không đụng chạm đến code của đồng nghiệp.
- **Đừng nhầm**: Không gom nhiều tính năng khác nhau vào một nhánh duy nhất vì sẽ khiến Pull Request quá lớn và khó kiểm duyệt.

### Branch Naming Convention
- **Nói dễ hiểu**: Quy ước đặt tên nhánh rõ ràng có tiền tố mục đích (feat/, fix/, chore/, docs/) theo dạng kebab-case.
- **Ví dụ**: Đặt tên `feat/shopping-cart` cho tính năng mới hoặc `fix/payment-timeout` cho bản sửa lỗi.
- **Đừng nhầm**: Tránh đặt tên tùy tiện như `test`, `branch-moi`, `nam-dev` khiến người khác không biết nhánh làm nhiệm vụ gì.

### Short-lived Branch
- **Nói dễ hiểu**: Nhánh có vòng đời ngắn (chỉ kéo dài vài giờ đến 2-3 ngày) rồi hợp nhất ngay vào nhánh chính và xóa đi.
- **Ví dụ**: Hoàn thành form đổi mật khẩu trong 1 ngày, mở PR merge vào main rồi xóa nhánh để dọn dẹp kho lưu trữ.
- **Đừng nhầm**: Giữ nhánh tính năng quá lâu (vài tuần hoặc vài tháng) sẽ gây ra xung đột mã nguồn khổng lồ khi merge.

---

## 📖 Định nghĩa
Feature Branch Workflow là mô hình cộng tác Git trong đó mọi tính năng hoặc bản sửa lỗi đều được cô lập trên một nhánh rẽ riêng biệt. Nhánh chính chỉ chứa mã nguồn ổn định và chỉ nhận code sau khi vượt qua bài kiểm thử và được phê duyệt qua Pull Request.

---

## 💡 Tại sao cần
Nếu nhiều người cùng làm trên một nhánh, code dở dang của người này sẽ làm hỏng môi trường của người khác. Feature Branch Workflow mang lại khả năng cô lập tuyệt đối, giúp mọi người làm việc song song mà không giẫm chân lên nhau.

---

## 🧠 Mental Model
Hãy hình dung nhà máy lắp ráp ô tô. Dây chuyền chính liên tục cho ra đời những chiếc xe hoàn chỉnh. Khi cần thử nghiệm hệ thống phanh mới, các kỹ sư mở một xưởng nghiên cứu phụ bên cạnh. Họ thỏa sức tháo lắp mà không làm gián đoạn dây chuyền lớn, chỉ đưa vào khi đã kiểm định an toàn.

---

## 📊 Sơ đồ minh họa
```text
Quy trình Feature Branch Workflow khép kín:
main:        C1 ────────────────────────────── C4 (Merge Commit / Fast-Forward)
              │                                ▲
              └─► [Tạo nhánh feat/auth]        │ (Sau khi Review & Pass CI)
                        │                      │
feat/auth:              C2 ───────► C3 ────────┘
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Trang làm chức năng đăng nhập Google. Trang cập nhật `main` mới nhất rồi tạo nhánh `feat/google-auth`. Sau khi hoàn thiện và đẩy lên GitHub, Trang tạo Pull Request. Đồng nghiệp review code, hệ thống kiểm tra tự động báo xanh và nhánh được gộp an toàn vào nhánh `main`.

---

## 💻 Command & Cú pháp
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
1. **Quên pull main trước khi tạo nhánh**: Khiến nhánh tính năng bắt đầu từ nền tảng code cũ, dễ gặp conflict khi hợp nhất.
2. **Đặt tên nhánh tùy tiện**: Đặt tên tối nghĩa như `my-branch`, `test` khiến người khác không hiểu nội dung tính năng.
3. **Gộp quá nhiều việc vào một nhánh**: Biến PR thành một khối khổng lồ làm đồng nghiệp quá tải khi review.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Đảm bảo nhánh main được cập nhật mới nhất bằng lệnh `git switch main && git pull origin main`.
2. Tạo một nhánh tính năng mới theo quy ước chuẩn: `git switch -c feat/user-profile`.
3. Thực hiện một commit mẫu, sau đó đẩy nhánh lên remote bằng `git push -u origin feat/user-profile`.
4. Quan sát liên kết theo dõi nhánh trên máy chủ.

---

## 💡 Hint & mẹo
> Mỗi nhánh tính năng chỉ nên phục vụ một mục đích duy nhất và có vòng đời ngắn từ vài giờ đến vài ngày để giảm thiểu xung đột.

---

## ✅ Validation & Kết quả mong đợi
- Nhánh main luôn giữ được trạng thái có thể build và chạy thành công ở mọi thời điểm.
- Nắm vững chu trình 5 bước từ rẽ nhánh, commit, push, review PR đến merge an toàn.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây về mô hình Feature Branch Workflow tiêu chuẩn.

---

## 🚀 Thử thách nâng cao
Trình bày cách xử lý nếu nhánh tính năng của bạn bị tụt hậu nhiều commit so với main trong thời gian bạn phát triển.

---

## 📝 Tổng kết
- Feature Branch Workflow cô lập toàn bộ công việc mới trên các nhánh rẽ riêng biệt.
- Nhánh main luôn được bảo vệ nghiêm ngặt và chỉ chứa mã nguồn đã kiểm thử ổn định.
- Pull Request là cầu nối trung tâm để thảo luận, duyệt code và tích hợp nhánh tính năng vào main.
