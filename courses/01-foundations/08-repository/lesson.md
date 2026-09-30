# Repository là gì? Cấu trúc .git

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất kỹ thuật của Repository (Kho lưu trữ) trong Git.
- Khám phá cấu trúc bên trong của thư mục ẩn `.git` (objects, refs, HEAD, config, index).
- Nắm được nguyên tắc không chỉnh sửa thủ công các tệp tin bên trong thư mục `.git`.

---

## 📖 Định nghĩa
> Repository (thường gọi tắt là Repo hoặc Kho lưu trữ) là một cấu trúc dữ liệu lưu trữ toàn bộ các tệp tin, thư mục cùng toàn bộ lịch sử thay đổi của dự án phần mềm. Trái tim của mọi Git repository chính là thư mục ẩn mang tên `.git` nằm ở gốc của dự án. Thư mục này chứa cơ sở dữ liệu đối tượng (`objects/`), các con trỏ nhánh và tag (`refs/`), con trỏ vị trí hiện tại (`HEAD`), tệp cấu hình riêng (`config`), và tệp chỉ mục vùng chuẩn bị (`index`). Toàn bộ điều kỳ diệu của Git đều diễn ra bên trong thư mục ẩn này.

---

## 🤔 Tại sao cần?
Hiểu được vai trò của thư mục `.git` giúp bạn không còn cảm thấy Git là một "hộp đen" huyền bí. Bạn sẽ hiểu rằng việc xóa thư mục `.git` sẽ biến dự án của bạn trở lại thành một thư mục file thông thường không còn lịch sử, và ngược lại chỉ cần sao chép thư mục `.git` sang máy khác là bạn đã mang trọn vẹn 100% lịch sử dự án đi theo. Kiến thức này cũng giúp bạn tránh sai lầm chết người là can thiệp sửa file thủ công làm hỏng cấu trúc dữ liệu của Git.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung thư mục dự án của bạn giống như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu giấy tờ bạn nhìn thấy trước mắt chính là Working Tree. Còn thư mục ẩn `.git` giống như một căn phòng kho bảo mật được khóa kín ở góc văn phòng. Trong căn phòng kho đó có một chiếc máy photocopy công nghiệp siêu tốc, một kho lưu trữ hồ sơ bằng sắt chống cháy và một cuốn sổ cái ghi chép chi tiết từng ngày từng giờ ai đã mang tài liệu nào ra vào văn phòng.

---

## 🖼 Sơ đồ
```text
Thư mục dự án:
my-project/
├── .git/                      <── Trái tim của Repository!
│   ├── HEAD                   (Con trỏ vị trí nhánh đang đứng)
│   ├── config                 (Cấu hình riêng của repo này)
│   ├── index                  (Vùng chuẩn bị Staging Area)
│   ├── objects/               (Cơ sở dữ liệu Blob, Tree, Commit)
│   └── refs/                  (Con trỏ nhánh: refs/heads/main)
├── index.html                 (Working Tree - Tệp bạn đang sửa)
└── app.js                     (Working Tree - Tệp bạn đang sửa)
```

---

## 🌎 Ví dụ thực tế
Một sinh viên vô tình chọn hiển thị tệp ẩn trên Windows và thấy thư mục `.git` nặng vài chục megabyte trong dự án môn học. Sinh viên này nghĩ rằng đây là rác hệ thống nên bấm nút Shift+Delete xóa vĩnh viễn thư mục `.git`. Ngay lập tức, khi mở lại VS Code, toàn bộ lịch sử 50 commit suốt hai tháng làm việc biến mất hoàn toàn, VS Code không còn nhận diện đây là một Git repository nữa. May mắn thay, nếu bạn đã từng đẩy code lên GitHub trước đó, bạn chỉ cần clone lại là khôi phục được toàn bộ thư mục `.git`.

---

## 💻 Command
```bash
ls -la
git status
```

---

## 🔍 Giải thích command
- `ls -la`: Liệt kê tất cả các tệp tin và thư mục bao gồm cả các thư mục ẩn bắt đầu bằng dấu chấm như `.git`.
- `git status`: Kiểm tra sự tồn tại và tính toàn vẹn của kho chứa Git trong thư mục hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Chỉnh sửa hoặc xóa thủ công tệp bên trong `.git`**:  Hành động này có thể phá hủy cơ sở dữ liệu đối tượng và làm hỏng toàn bộ repository.
2. **Khởi tạo repository lồng nhau vô ý**:  Chạy `git init` bên trong một thư mục con của một repository khác mà không dùng submodule.
3. **Commit nhầm thư mục `.git` của dự án khác**:  Gây ra lỗi submodule rỗng không thể tải trên GitHub.

---

## 🧪 Lab
1. Chạy lệnh `ls -la` hoặc `dir /a` để kiểm tra sự tồn tại của thư mục ẩn `.git`.
2. Quan sát các thành phần con cốt lõi của `.git`: HEAD, config, objects, refs.
3. Nhận biết rằng khi `.git` tồn tại, các câu lệnh Git mới có thể hoạt động.

---

## 💡 Hint
> Tuyệt đối không chỉnh sửa thủ công các tệp trong `.git` trừ khi bạn là chuyên gia.

---

## ✅ Validation
- Hiểu cấu trúc và vai trò của thư mục `.git` trong một kho lưu trữ Git.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm sau về bản chất của Repository và thư mục .git.

---

## 🔥 Challenge
Nêu vai trò của 3 thành phần con bên trong thư mục .git: HEAD, objects/ và refs/.

---

## 📚 Tổng kết
- Repository là cơ sở dữ liệu lưu toàn bộ mã nguồn và lịch sử phiên bản của dự án.
- Mọi dữ liệu lịch sử của Git được gói gọn hoàn toàn trong thư mục ẩn `.git`.
- Xóa thư mục `.git` đồng nghĩa với việc xóa bỏ vĩnh viễn toàn bộ lịch sử commit cục bộ.
