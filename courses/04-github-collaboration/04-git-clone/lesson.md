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
- **Nói dễ hiểu**: Lệnh tạo một thư mục kho Git mới từ địa chỉ máy chủ, tải dữ liệu cần thiết và thiết lập remote theo dõi nguồn.
- **Ví dụ**: `git clone https://github.com/facebook/react.git` tải toàn bộ mã nguồn React về máy.
- **Đừng nhầm**: Không chỉ tải mỗi file code nén dạng ZIP; lệnh mang về cả kho dữ liệu `.git` hoàn chỉnh.

### shallow clone
- **Nói dễ hiểu**: Kỹ thuật chỉ tải về một số lượng commit gần nhất thay vì toàn bộ lịch sử từ đầu dự án.
- **Ví dụ**: `git clone --depth 1 https://github.com/org/huge-repo.git` để tải cực nhanh trong CI/CD.
- **Đừng nhầm**: Bản sao nông này thiếu lịch sử commit cũ; không thích hợp nếu bạn cần điều tra commit cũ bằng git log hay git blame.

### nested repository — kho lồng bên trong kho khác
- **Nói dễ hiểu**: Một thư mục Git được đặt bên trong thư mục của kho khác.
- **Ví dụ**: Clone một dự án con vào thư mục dự án cha.
- **Đừng nhầm**: Git không tự biến kho con thành submodule. Nếu muốn quản lý quan hệ giữa hai kho, cần chọn giải pháp phù hợp như submodule hoặc subtree.

---

## 📖 Định nghĩa
`git clone <url>` tạo một thư mục mới chứa kho cục bộ, tải lịch sử theo chế độ clone đã chọn, thiết lập remote `origin` và checkout nhánh mặc định (nếu kho có nhánh). Clone thông thường tải lịch sử đầy đủ; tùy chọn như `--depth 1` chỉ lấy lịch sử nông. Lệnh cần mạng và quyền đọc kho.

---

## 💡 Tại sao cần
Khi tham gia một dự án có sẵn, clone tạo thư mục làm việc riêng trên máy bạn. Trước khi chạy, hãy biết thư mục hiện tại ở đâu và tránh clone đè vào thư mục dự án khác.

---

## 🧠 Mental Model
Hãy hình dung clone như lấy một bản làm việc mới từ kho chung và ghi sẵn địa chỉ kho chung vào danh bạ. Sau đó `fetch` cập nhật thông tin mới, còn `pull` đưa thay đổi vào nhánh đang làm.

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
**Bài này làm trong PowerShell thật, không chạy `git clone` ở terminal mô phỏng của khóa học.** Simulator chỉ giữ một kho làm việc; clone tại đó sẽ bị chặn để bảo vệ bài đang học.
1. Tạo thư mục luyện tập riêng và đi vào đó: `New-Item -ItemType Directory -Path "$env:USERPROFILE\Documents\git-clone-practice" -Force` rồi `Set-Location "$env:USERPROFILE\Documents\git-clone-practice"`.
2. Clone dự án mẫu vào thư mục con mới: `git clone https://github.com/octocat/Hello-World.git git-clone-demo`.
3. Chạy `cd git-clone-demo` để vào thư mục vừa tạo.
4. Chạy `git remote -v`; xác nhận `origin` trỏ tới URL đã clone.
5. Chạy `git log --oneline -n 5` để xem các commit đã tải về.
6. Kết thúc bằng `cd ..`. Đừng xóa thư mục nếu muốn xem lại bài; đây là một kho riêng, tách khỏi dự án khóa học.

---

## 💡 Hint & mẹo
> Trước khi clone, kiểm tra `pwd` (hoặc `Get-Location` trong PowerShell). Chọn một thư mục cha riêng để Git tạo thư mục dự án con.

---

## ✅ Validation & Kết quả mong đợi
- Thư mục `git-clone-demo` có file dự án và thư mục `.git`.
- Lệnh `git remote -v` hiển thị đúng `origin` trỏ về địa chỉ kho mẫu.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về thao tác git clone.

---

## 🚀 Thử thách nâng cao
Thử dùng tùy chọn `--depth 1` để clone một dự án mã nguồn mở lớn và so sánh thời gian tải về so với lệnh clone thông thường.

---

## 📝 Tổng kết
- Clone tạo kho cục bộ mới và thường thiết lập remote tên `origin`.
- Clone mặc định lấy lịch sử đầy đủ; shallow clone như `--depth 1` chỉ lấy một phần lịch sử.
- Clone vào thư mục riêng. Lệnh này cần mạng và quyền đọc kho nguồn.
