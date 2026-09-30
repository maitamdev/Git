# Bỏ qua tệp tin với .gitignore

---

## 🎯 Mục tiêu
- Hiểu rõ mục đích và tầm quan trọng của tệp tin cấu hình `.gitignore`.
- Nắm bắt các quy tắc mẫu (glob patterns) phổ biến: đuôi tệp, thư mục, ngoại lệ phủ định.
- Biết cách xử lý tình huống tệp tin đã vô tình bị theo dõi trước khi thêm vào .gitignore.

---

## 📖 Định nghĩa
> `.gitignore` là một tệp văn bản thuần túy đặt tại thư mục gốc (hoặc các thư mục con) của kho lưu trữ, chứa danh sách các mẫu quy tắc khớp đường dẫn (glob patterns) chỉ định cho Git biết những tệp tin hoặc thư mục nào cần phải bỏ qua hoàn toàn, không hiển thị trong mục Untracked files và không bao giờ được đưa vào commit. Các tệp này thường bao gồm các tệp biên dịch trung gian, thư viện phụ thuộc (`node_modules`), tệp môi trường chứa mật khẩu bí mật (`.env`), và tệp tạm thời của hệ điều hành.

---

## 🤔 Tại sao cần?
Không sử dụng `.gitignore` hoặc cấu hình sơ sài là nguyên nhân hàng đầu gây ra các thảm họa bảo mật và phình to kho chứa trong thực tế. Đã có vô số trường hợp lập trình viên vô tình commit tệp `.env` chứa mật khẩu cơ sở dữ liệu và khóa bí mật AWS lên GitHub công khai, dẫn đến việc bị tin tặc chiếm quyền điều khiển tài nguyên đám mây và gây thiệt hại hàng chục ngàn đô-la chỉ sau vài phút. Ngoài ra, việc commit hàng trăm nghìn tệp trong `node_modules` sẽ làm đơ nghẽn mạng và lãng phí dung lượng vô ích.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung tệp `.gitignore` giống như một danh sách đen (Blacklist) được trao cho người bảo vệ an ninh đứng gác tại cổng ra vào tòa nhà kho lưu trữ. Người bảo vệ có nhiệm vụ chặn đứng tất cả những ai hoặc những món hàng nào nằm trong danh sách đen này: không cho phép rác thải công nghiệp (build artifacts), người lạ không có thẻ (tệp nháp tạm thời) hay đồ vật nguy hiểm cháy nổ (khóa bí mật mật khẩu) được bước chân vào kho hàng.

---

## 🖼 Sơ đồ
```text
Hoạt động của màng lọc .gitignore:
Working Directory:                   Màng lọc .gitignore:             Staging Area:
├── app.js            ─────────────► [Cho qua]          ────────────► [app.js]
├── package.json      ─────────────► [Cho qua]          ────────────► [package.json]
├── .env              ─────────────► [CHẶN: .env]       ────────────► (Bị bỏ qua)
└── node_modules/     ─────────────► [CHẶN: node_modules/] ─────────► (Bị bỏ qua)
```

---

## 🌎 Ví dụ thực tế
Một nhóm lập trình viên phát triển ứng dụng web Node.js và React chuyên nghiệp cho khách hàng doanh nghiệp. Trong cấu trúc dự án, thư mục node_modules chứa hơn bốn mươi lăm nghìn tệp tin thư viện với dung lượng lên đến nửa gigabyte, và tệp .env chứa toàn bộ chuỗi kết nối cơ sở dữ liệu MongoDB kèm mật khẩu bí mật của môi trường phát triển. Trưởng nhóm tạo ngay một tệp .gitignore tại thư mục gốc dự án và khai báo các dòng quy tắc loại trừ bao gồm node_modules/, *.log, và .env. Kể từ giây phút đó, Git hoàn toàn bỏ qua các mục này trong mọi báo cáo trạng thái, bảo vệ kho mã nguồn luôn nhẹ nhàng và an toàn.

---

## 💻 Command
```bash
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
git check-ignore -v <file>
```

---

## 🔍 Giải thích command
- `echo "pattern" >> .gitignore`: Ghi thêm một quy tắc mẫu đường dẫn loại trừ vào cuối tệp tin cấu hình .gitignore một cách nhanh chóng ngay trên terminal.
- `git check-ignore -v <file>`: Lệnh chẩn đoán chuyên sâu giúp bạn kiểm tra chi tiết xem một tệp tin cụ thể đang bị quy tắc nào, ở dòng số mấy trong .gitignore chặn lại, vô cùng hữu ích khi gỡ lỗi.

---

## ⚠️ Sai lầm phổ biến
1. **Thêm tệp vào .gitignore sau khi đã commit**:  .gitignore chỉ có tác dụng với tệp Untracked; nếu tệp đã được commit trước đó, bạn phải dùng `git rm --cached` để gỡ bỏ theo dõi.
2. **Viết sai đường dẫn hoặc thiếu dấu gạch chéo**:  Gõ `build` thay vì `build/` có thể vô tình chặn cả tệp mã nguồn mang tên build.js.
3. **Quên không commit chính tệp .gitignore**:  Khiến đồng nghiệp trong nhóm không nhận được danh sách bỏ qua và tiếp tục commit nhầm file rác.

---

## 🧪 Lab
1. Tạo một tệp tạm thời mang tên `secret.env` và quan sát nó xuất hiện trong `git status` màu đỏ.
2. Tạo tệp `.gitignore` và thêm dòng `*.env` vào bên trong.
3. Chạy lại lệnh `git status` và xác nhận tệp `secret.env` đã hoàn toàn biến mất khỏi danh sách theo dõi.

---

## 💡 Hint
> Tệp .gitignore cũng cần phải được `git add` và `git commit` để chia sẻ cho cả nhóm.

---

## ✅ Validation
- Kiểm tra `git status` không còn liệt kê các tệp đã được khai báo trong .gitignore.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về cách sử dụng tệp .gitignore.

---

## 🔥 Challenge
Nêu cú pháp dùng dấu chấm than `!` trong .gitignore để tạo quy tắc ngoại lệ bỏ qua.

---

## 📚 Tổng kết
- `.gitignore` ngăn chặn Git theo dõi các tệp tin rác, tệp biên dịch và thông tin bí mật.
- Chỉ áp dụng tự động cho các tệp Untracked; tệp đã tracked cần chạy `git rm --cached`.
- Bắt buộc phải commit `.gitignore` vào kho chứa để đồng bộ quy tắc cho toàn bộ thành viên nhóm.
