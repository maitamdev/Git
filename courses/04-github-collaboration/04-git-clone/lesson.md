# Tải dự án về máy với git clone

---

## 🎯 Mục tiêu
- Sử dụng câu lệnh `git clone` để tải toàn bộ một dự án từ GitHub về máy tính cá nhân.
- Hiểu rõ các hành động ngầm mà Git tự động thực hiện trong quá trình clone: khởi tạo, liên kết remote, fetch dữ liệu và checkout nhánh mặc định.
- Tùy chỉnh tên thư mục đích khi clone dự án về ổ đĩa.
- Sử dụng cờ `--depth 1` (shallow clone) để tải nhanh các dự án có kích thước khổng lồ.

---

## 📖 Định nghĩa
> `git clone` là câu lệnh mạnh mẽ bậc nhất giúp bạn tạo ra một bản sao cục bộ hoàn chỉnh (exact local copy) của một kho lưu trữ từ xa trên máy tính của bạn. Quá trình clone không chỉ tải về các tệp tin mã nguồn hiện tại, mà còn sao chép toàn bộ cơ sở dữ liệu lịch sử commit, tất cả các nhánh, các thẻ tag và cấu hình của dự án, đồng thời tự động thiết lập liên kết remote `origin` trỏ về kho máy chủ ban đầu.

---

## 🤔 Tại sao cần?
Khi bạn gia nhập một công ty mới, tham gia vào một dự án mã nguồn mở hoặc chuyển sang làm việc trên một chiếc máy tính cá nhân mới, `git clone` luôn là câu lệnh đầu tiên bạn phải gõ. Nắm vững cơ chế hoạt động của clone giúp bạn bắt đầu công việc nhanh chóng, tự tin tải các dự án mẫu về học tập và biết cách tối ưu thời gian tải dữ liệu đối với những kho chứa có dung lượng lớn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc clone một kho lưu trữ giống như bạn bước vào một thư viện quốc gia lớn, tìm thấy một cuốn bách khoa toàn thư quý hiếm dày 1000 trang, và đưa toàn bộ cuốn sách qua một chiếc máy photocopy 3D siêu tốc. Bạn mang về nhà một cuốn sách mới tinh giống hệt 100% bản gốc từ trang bìa, nội dung đến từng trang nhật ký chỉnh sửa của tác giả, kèm theo một sợi dây liên lạc trực tiếp tới thư viện.

---

## 🖼 Sơ đồ
```text
Quy trình tự động bên trong lệnh git clone:
git clone https://github.com/user/project.git
                      │
   ┌──────────────────┼──────────────────┐
   ▼                  ▼                  ▼
[1. git init]  [2. remote add origin] [3. git fetch]
   │
   ▼
[4. git checkout main (tạo Working Tree hoàn chỉnh)]
```

---

## 🌎 Ví dụ thực tế
Ngày đầu tiên đi làm tại công ty công nghệ, kỹ sư Minh nhận được đường dẫn kho mã nguồn của dự án ứng dụng di động: `https://github.com/company/mobile-app.git`. Minh mở terminal trên máy tính mới và gõ lệnh: `git clone https://github.com/company/mobile-app.git`. Git tự động tạo thư mục mobile-app, tải về toàn bộ lịch sử 500 commit từ trước tới nay, liên kết sẵn remote origin và đưa mã nguồn ra màn hình. Minh chỉ việc mở thư mục bằng VS Code và bắt đầu làm việc ngay lập tức mà không cần bất kỳ thao tác cấu hình thủ công phức tạp nào khác.

---

## 💻 Command
```bash
git clone <url-kho-chứa>
git clone <url-kho-chứa> <tên-thư-mục-mới>
git clone --depth 1 <url-kho-chứa>
git clone --branch <tên-nhánh> <url-kho-chứa>
```

---

## 🔍 Giải thích command
- `git clone <url>`: Sao chép toàn bộ kho từ xa về thư mục mang tên mặc định của dự án.
- `git clone <url> <tên-thư-mục>`: Tải dự án về và đặt tên thư mục theo ý muốn cá nhân.
- `git clone --depth 1 <url>`: Shallow clone: Chỉ tải commit mới nhất, giảm tối đa dung lượng tải về khi chỉ muốn đọc code.
- `git clone --branch <nhánh> <url>`: Tải về và tự động checkout sẵn ngay vào nhánh chỉ định thay vì nhánh mặc định.

---

## ⚠️ Sai lầm phổ biến
1. **Clone một kho chứa Git vào bên trong một kho chứa Git khác đang tồn tại**:  Tạo ra cấu trúc lồng nhau lỗi (nested repository).
2. **Quên kiểm tra quyền truy cập**:  Clone kho riêng tư (private repo) mà chưa đăng nhập tài khoản có quyền đọc sẽ bị báo lỗi Permission denied.
3. **Tải về dạng file ZIP từ GitHub thay vì dùng git clone**:  Bạn sẽ bị mất hoàn toàn toàn bộ lịch sử commit và không thể git push được.

---

## 🧪 Lab
1. Thực hiện clone một kho lưu trữ mẫu bằng `git clone https://github.com/git-academy/sample-demo.git`.
2. Di chuyển vào thư mục vừa clone bằng `cd sample-demo`.
3. Kiểm tra cấu hình remote tự sinh bằng `git remote -v`.
4. Kiểm tra lịch sử commit đã tải về trọn vẹn bằng `git log --oneline`.

---

## 💡 Hint
> Tuyệt đối không chạy lệnh `git clone` khi bạn đang đứng bên trong một thư mục đã có file `.git`.

---

## ✅ Validation
- Kho lưu trữ được clone hoàn chỉnh về máy tính với remote origin trỏ đúng URL.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git clone.

---

## 🔥 Challenge
So sánh sự khác nhau về thời gian và dung lượng đĩa giữa full clone và shallow clone (`--depth 1`).

---

## 📚 Tổng kết
- `git clone` sao chép toàn bộ mã nguồn, lịch sử commit và các nhánh về máy tính.
- Tự động thiết lập sẵn remote `origin` trỏ về kho máy chủ ban đầu.
- Sử dụng `--depth 1` khi muốn tải nhanh mã nguồn mà không cần tải toàn bộ lịch sử quá khứ.
