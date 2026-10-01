# Tải dự án về máy với git clone

---

## 🎯 Mục tiêu
- Sử dụng câu lệnh `git clone` để tải toàn bộ một dự án từ GitHub về máy tính cá nhân.
- Hiểu rõ các hành động ngầm mà Git tự động thực hiện trong quá trình clone: khởi tạo, liên kết remote, fetch dữ liệu và checkout nhánh mặc định.
- Tùy chỉnh tên thư mục đích khi clone dự án về ổ đĩa.
- Sử dụng cờ `--depth 1` (shallow clone) để tải nhanh các dự án có kích thước khổng lồ.

---

## 🧩 Từ khóa hôm nay

### git clone
- **Nói dễ hiểu**: Lệnh tải toàn bộ dự án từ máy chủ về máy tính, bao gồm mọi file, lịch sử commit và nhánh.
- **Ví dụ**: `git clone https://github.com/facebook/react.git` tải toàn bộ mã nguồn React về máy.
- **Đừng nhầm**: Không chỉ tải mỗi file code nén dạng ZIP; lệnh mang về cả kho dữ liệu `.git` hoàn chỉnh.

### shallow clone
- **Nói dễ hiểu**: Kỹ thuật chỉ tải về một số lượng commit gần nhất thay vì toàn bộ lịch sử từ đầu dự án.
- **Ví dụ**: `git clone --depth 1 https://github.com/org/huge-repo.git` để tải cực nhanh trong CI/CD.
- **Đừng nhầm**: Bản sao nông này thiếu lịch sử commit cũ; không thích hợp nếu bạn cần điều tra commit cũ bằng git log hay git blame.

### nested repository
- **Nói dễ hiểu**: Lỗi vô tình clone một kho Git vào bên trong một thư mục đã là kho Git khác.
- **Ví dụ**: Đang đứng ở thư mục dự án của bạn rồi lại gõ `git clone` một thư viện khác vào đó.
- **Đừng nhầm**: Không biến thành submodule tự động; Git sẽ cảnh báo hoặc bỏ qua thư mục con này khiến bạn mất code.

---

## 📖 Định nghĩa
`git clone` là lệnh tạo bản sao cục bộ hoàn chỉnh của một kho lưu trữ từ xa trên máy tính của bạn. Quá trình clone tải về toàn bộ lịch sử commit, các nhánh, thẻ tag và tự động tạo sẵn liên kết remote `origin` trỏ về máy chủ ban đầu.

---

## 💡 Tại sao cần
Khi bắt đầu dự án mới trong công ty hoặc đóng góp vào kho mã nguồn mở, `git clone` là bước xuất phát đầu tiên. Hiểu rõ lệnh này giúp bạn bắt nhịp công việc nhanh, tùy biến thư mục tải về và biết cách tối ưu tốc độ cho các dự án dung lượng lớn.

---

## 🧠 Mental Model
Hãy hình dung `git clone` như việc bạn đến thư viện và đưa toàn bộ cuốn sổ tay dự án qua máy photocopy 3D. Bạn nhận được bản sao giống 100% bản gốc kèm đường dây điện thoại nối thẳng về bàn thủ thư để sẵn sàng cập nhật thông tin mới.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Ngày đầu đi làm, kỹ sư Minh nhận đường link kho mã nguồn `https://github.com/company/mobile-app.git`. Minh mở terminal và gõ `git clone https://github.com/company/mobile-app.git`. Git tự động tạo thư mục mobile-app, tải đầy đủ 500 commit trước đó và cấu hình sẵn remote origin. Minh chỉ việc mở thư mục trong editor và bắt tay vào code ngay.

---

## 💻 Command & Cú pháp
```bash
git clone <url-kho-chứa>
git clone <url-kho-chứa> <tên-thư-mục-mới>
git clone --depth 1 <url-kho-chứa>
git clone --branch <tên-nhánh> <url-kho-chứa>
```

---

## 🔍 Giải thích command
- `git clone <url>`: Sao chép toàn bộ kho từ xa về thư mục mang tên mặc định của dự án.
- `git clone <url> <tên-thư-mục>`: Tải dự án về và đổi tên thư mục theo ý muốn cá nhân.
- `git clone --depth 1 <url>`: Chỉ tải commit mới nhất, giảm tối đa dung lượng tải về khi chỉ muốn đọc code.
- `git clone --branch <nhánh> <url>`: Tải về và tự động checkout sẵn ngay vào nhánh chỉ định thay vì nhánh mặc định.

---

## ⚠️ Sai lầm phổ biến
1. **Clone vào bên trong một kho Git khác đang tồn tại**: Tạo ra lỗi lồng kho chứa (nested repo) khiến Git không theo dõi được file con.
2. **Quên kiểm tra quyền truy cập kho private**: Khi clone kho riêng tư mà chưa cấu hình tài khoản hoặc SSH key, lệnh sẽ báo lỗi `Permission denied`.
3. **Tải file ZIP thay vì git clone**: Tải ZIP không có thư mục `.git`, làm mất toàn bộ lịch sử commit và không thể push hay pull.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành clone một dự án mẫu và kiểm tra thư mục kết quả.
1. Clone kho lưu trữ mẫu bằng lệnh `git clone https://github.com/git-academy/sample-demo.git`.
2. Di chuyển vào thư mục dự án vừa tải về bằng `cd sample-demo`.
3. Kiểm tra liên kết remote tự động sinh ra bằng `git remote -v`.
4. Xem lại lịch sử commit đã tải về trọn vẹn bằng `git log --oneline`.

---

## 💡 Hint & mẹo
> Tuyệt đối không chạy lệnh `git clone` khi bạn đang đứng bên trong một thư mục đã có file `.git`. Luôn kiểm tra bằng `git status` trước.

---

## ✅ Validation & Kết quả mong đợi
- Thư mục dự án mới xuất hiện trên ổ đĩa với đầy đủ tệp mã nguồn và thư mục ẩn `.git`.
- Lệnh `git remote -v` hiển thị đúng `origin` trỏ về địa chỉ kho mẫu.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về thao tác git clone.

---

## 🚀 Thử thách nâng cao
Thử dùng tùy chọn `--depth 1` để clone một dự án mã nguồn mở lớn và so sánh thời gian tải về so với lệnh clone thông thường.

---

## 📝 Tổng kết
- `git clone` sao chép toàn bộ mã nguồn, lịch sử commit và các nhánh về máy tính.
- Tự động thiết lập sẵn remote `origin` trỏ về kho máy chủ ban đầu.
- Sử dụng `--depth 1` khi muốn tải nhanh mã nguồn mà không cần tải toàn bộ lịch sử quá khứ.
