# Khởi tạo kho chứa với git init

---

## 🎯 Mục tiêu
- Sử dụng thành thạo câu lệnh `git init` để biến một thư mục thông thường thành một Git repository.
- Hiểu các hành vi ngầm của Git khi khởi tạo: tạo thư mục `.git`, thiết lập nhánh mặc định.
- Biết cách khởi tạo kho chứa với tên nhánh mặc định tùy chỉnh như `main`.

---

## 📖 Định nghĩa
> `git init` là câu lệnh nền tảng đầu tiên được sử dụng để khởi tạo một Git repository mới hoàn toàn trống, hoặc chuyển đổi một thư mục mã nguồn hiện có thành một kho lưu trữ được Git quản lý. Khi thực thi lệnh này, Git sẽ tự động tạo ra thư mục ẩn `.git` tại vị trí thư mục hiện tại cùng đầy đủ cấu trúc tệp tin nội bộ và đặt con trỏ `HEAD` trỏ vào nhánh mặc định (thường là `main` hoặc `master`). Lệnh này an toàn tuyệt đối và không làm thay đổi hay xóa bỏ bất kỳ tệp tin có sẵn nào của bạn.

---

## 🤔 Tại sao cần?
Mọi dự án phần mềm sử dụng Git đều phải bắt đầu từ hành động khởi tạo với `git init` (hoặc nhân bản từ xa về bằng `git clone`). Nắm vững lệnh này giúp bạn tự tin biến bất kỳ thư mục bài tập, dự án cá nhân hay sản phẩm khởi nghiệp nào thành một không gian làm việc an toàn, nơi mọi dòng code bạn viết ra từ giây phút đó trở đi đều có thể được bảo vệ và theo dõi lịch sử chặt chẽ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc chạy lệnh `git init` giống như lễ bấm chuông khai trương chính thức mở một cửa hiệu kinh doanh. Ngôi nhà và các kệ hàng trước đó vốn chỉ là một căn phòng trống không có quy củ. Nhưng ngay khi tiếng chuông khai trương vang lên (chạy `git init`), một nhân viên kế toán tận tụy bước vào phòng, mở cuốn sổ nhật ký thu chi trang trọng và tuyên bố: "Kể từ thời khắc này, mọi tài sản và giao dịch ra vào cửa tiệm đều được ghi chép sổ sách minh bạch!".

---

## 🖼 Sơ đồ
```text
Trước khi chạy git init:                Sau khi chạy git init:
my-project/                              my-project/
├── app.js                               ├── .git/  <── (Vừa được tạo ra!)
└── style.css                            ├── app.js
(Thư mục tệp tin thường)                 └── style.css
                                         (Kho lưu trữ Git chính thức)
```

---

## 🌎 Ví dụ thực tế
Bạn vừa tạo một thư mục mới trên máy tính có tên `ecommerce-website` để làm đồ án tốt nghiệp cuối khóa. Bạn mở terminal tại thư mục đó và gõ `git init`. Terminal lập tức thông báo: `Initialized empty Git repository in /workspace/ecommerce-website/.git/`. Kể từ thời điểm này, bạn có thể tự do tạo các tệp HTML, CSS, JavaScript và sử dụng toàn bộ sức mạnh của Git để ghi nhớ từng bước tiến độ thực hiện đồ án của mình. Bất cứ khi nào bạn thử nghiệm một tính năng thanh toán mới hay thay đổi giao diện trang chủ mà gặp lỗi, bạn đều có thể an tâm quay ngược thời gian về mốc an toàn trước đó mà không sợ mất mát dữ liệu.

---

## 💻 Command
```bash
git init
git init -b main
git status
```

---

## 🔍 Giải thích command
- `git init`: Khởi tạo một kho lưu trữ Git rỗng mới hoàn toàn trong thư mục hiện tại của bạn.
- `git init -b main`: Khởi tạo kho Git và chỉ định rõ tên nhánh ban đầu là `main` theo đúng tiêu chuẩn hiện đại.
- `git status`: Xác nhận rằng kho chứa đã được khởi tạo thành công và đang ở trạng thái sẵn sàng đón nhận commit.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy git init ở thư mục gốc người dùng**:  Khởi tạo Git nhầm ở `C
2. **Chạy git init nhiều lần trong các thư mục con**:  Gây ra xung đột repository lồng nhau không mong muốn.
3. **Lo lắng git init sẽ xóa code**:  Lệnh này hoàn toàn an toàn, chỉ tạo thêm thư mục `.git` chứ không tác động đến code hiện có.

---

## 🧪 Lab
1. Kiểm tra trạng thái ban đầu bằng lệnh `git status` (nếu chưa init sẽ báo lỗi fatal).
2. Chạy lệnh `git init` để khởi tạo kho lưu trữ Git mới.
3. Chạy lại lệnh `git status` để xác nhận thông báo: `On branch main / No commits yet`.

---

## 💡 Hint
> Chỉ cần gõ `git init` một lần duy nhất cho mỗi dự án mới.

---

## ✅ Validation
- Hệ thống tạo thành công thư mục `.git` và `git status` trả về mã 0.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về lệnh git init.

---

## 🔥 Challenge
Tự tạo một thư mục mới trong máy tính, khởi tạo Git và kiểm tra cấu trúc thư mục .git vừa sinh ra.

---

## 📚 Tổng kết
- `git init` tạo ra một kho chứa Git mới bằng cách sinh ra thư mục ẩn `.git`.
- Là câu lệnh bắt buộc đầu tiên để bắt đầu quản lý phiên bản cho một dự án mới.
- An toàn tuyệt đối, không làm mất mát hay sửa đổi nội dung các tệp tin sẵn có trong thư mục.
