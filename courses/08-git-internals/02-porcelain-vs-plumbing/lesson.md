# Phân biệt Porcelain Commands vs Plumbing Commands

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).
- Hiểu cách các lệnh Porcelain thân thiện (`git add`, `git commit`) phối hợp nhiều lệnh Plumbing bên dưới.
- Làm quen với các lệnh Plumbing cơ bản: `git hash-object`, `git cat-file`, `git update-index`, `git write-tree`, `git commit-tree`.
- Biết vì sao lệnh Plumbing thường hữu ích trong script, đồng thời kiểm tra output có định dạng dành cho máy khi dùng lệnh Porcelain.

---

## 🧩 Từ khóa hôm nay

### Porcelain Commands
- **Nói dễ hiểu**: Nhóm lệnh giao diện bậc cao, thân thiện và dễ nhớ dành cho người dùng thao tác hàng ngày.
- **Ví dụ**: Các lệnh quen thuộc như `git add`, `git commit`, `git checkout`, `git branch`, `git status`.
- **Đừng nhầm**: Không trực tiếp thao tác nguyên tử với ổ đĩa; đây là lớp vỏ bọc tổng hợp nhiều bước xử lý tầng thấp lại với nhau.

### Plumbing Commands
- **Nói dễ hiểu**: Nhóm lệnh bậc thấp hoạt động trực tiếp với cơ sở dữ liệu đối tượng và con trỏ bên trong thư mục `.git`.
- **Ví dụ**: Các lệnh kỹ thuật như `git hash-object`, `git cat-file`, `git write-tree`, `git commit-tree`.
- **Đừng nhầm**: Không dùng cho công việc commit code hàng ngày của lập trình viên; chủ yếu phục vụ viết script, plugin hoặc xử lý cứu hộ chuyên sâu.

### Lệnh cấp thấp (plumbing)
- **Nói dễ hiểu**: Các lệnh chuyên biệt cho thao tác hoặc truy vấn một phần của mô hình nội bộ Git.
- **Ví dụ**: `git cat-file` đọc object; `git write-tree` tạo tree từ index; `git update-ref` cập nhật ref.
- **Đừng nhầm**: “Plumbing” mô tả vai trò cấp thấp, không có nghĩa mọi lệnh đều chỉ ghi trực tiếp xuống đĩa hoặc đều là một giao dịch nguyên tử.

---

## 📖 Định nghĩa
Trong thuật ngữ Git, Porcelain là nhóm lệnh hướng tới trải nghiệm người dùng như `git commit`, `git switch`, `git pull`; Plumbing là nhóm lệnh cấp thấp, thường phù hợp để script truy vấn hoặc thao tác object, index và refs. Ranh giới không có nghĩa mọi porcelain chỉ là “lớp vỏ” gọi đúng một chuỗi lệnh plumbing có thể thay thế y hệt.

---

## 💡 Tại sao cần
Lệnh cấp thấp hữu ích khi bạn cần đọc object, tạo tree hoặc thao tác refs trong script. Tuy vậy, với script dùng lệnh quen thuộc như `git status`, hãy yêu cầu định dạng ổn định dành cho máy bằng `--porcelain`; đừng phân tích output mặc định được thiết kế để người dùng đọc.

---

## 🧠 Mental Model
Hãy tưởng tượng hệ thống cấp thoát nước trong một căn biệt thự sang trọng. Các thiết bị vệ sinh bằng sứ trắng muốt cao cấp như bồn rửa tay, vòi hoa sen tự động và bồn tắm massage chính là Porcelain: người sử dụng chỉ cần nhấn nút nhẹ nhàng để xả nước. Nhưng bên dưới sàn nhà là mạng lưới chằng chịt các đường ống dẫn nước bằng đồng, van áp suất và bơm thủy lực (Plumbing): chỉ có những người thợ sửa ống nước lành nghề mới can thiệp vào đây khi cần khắc phục rò rỉ.

---

## 📊 Sơ đồ minh họa
```text
Hai tầng câu lệnh trong Git:
┌────────────────────────────────────────────────────────┐
│ PORCELAIN (Giao diện bậc cao - Thân thiện người dùng)  │
│ git add | git commit | git branch | git merge | git log │
└───────────────────────────┬────────────────────────────┘
                            │ Phối hợp bên dưới
                            ▼
┌────────────────────────────────────────────────────────┐
│ PLUMBING (Lệnh cấp thấp - truy vấn/thao tác mô hình Git)│
│ git hash-object | git cat-file | git update-index      │
│ git write-tree  | git commit-tree | git rev-parse      │
└───────────────────────────┬────────────────────────────┘
                            │ Ghi trực tiếp
                            ▼
             [.git/objects/ và .git/refs/]
```

---

## 🏢 Ví dụ thực tế
Một cách học mô hình commit là quan sát các việc cần xảy ra: index được chuyển thành tree, commit mới trỏ tới tree và commit cha, rồi branch ref được cập nhật. Các lệnh plumbing như `git write-tree`, `git commit-tree` và `git update-ref` cho thấy những thành phần này, nhưng không nên khẳng định `git commit` luôn chạy đúng chuỗi tiến trình đó ở mọi phiên bản Git.

---

## 💻 Command & Cú pháp
```bash
# Lệnh Porcelain thông thường
git commit -m "feat: login"

# Xem tree mà index hiện tại tạo ra; lệnh này ghi một object nhưng không tạo commit
git write-tree

# Đọc loại object vừa tạo bằng mã được in ở lệnh trên
git cat-file -t <tree-object-id>
```
Không chạy `git update-ref` trên nhánh đang làm việc chỉ để thử nghiệm: lệnh đó có thể di chuyển ref. Bài này chỉ quan sát tree; bài capstone sẽ thực hành tạo commit trong repository tạm.

---

## 🔍 Giải thích command
- `git commit -m "feat: login"`: Lệnh Porcelain tạo commit từ nội dung đã stage, thường gồm tree, metadata commit và cập nhật branch ref.
- `git write-tree`: Lệnh Plumbing chuyển toàn bộ trạng thái trong `.git/index` thành một đối tượng Tree trong `.git/objects/` và trả về mã băm.
- `git commit-tree`: Lệnh Plumbing tạo đối tượng Commit với metadata tác giả, ngày giờ, thông điệp và trỏ tới tree cùng commit cha.
- `git update-ref`: Lệnh Plumbing cập nhật tham chiếu ref an toàn, tránh xung đột file đồng thời.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng mọi output Porcelain làm dữ liệu cho script**: Output mặc định thường dành cho người đọc; dùng tùy chọn định dạng máy như `git status --porcelain` hoặc lệnh phù hợp.
2. **Nghĩ rằng Plumbing commands là tiện ích cài ngoài**: Toàn bộ các lệnh này đều là thành phần cốt lõi có sẵn trong mọi bản cài đặt Git chính thức.
3. **Quên truyền cờ `-p` khi chạy `git commit-tree`**: Nếu quên truyền commit cha, commit mới sẽ trở thành một root commit mồ côi không có lịch sử trước đó.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Mở terminal và chạy lệnh `git help -a` để xem danh sách toàn bộ câu lệnh của Git.
2. **Bước 2**: Cuộn xuống phần "Low-level Commands / Plumbing" để nhận diện các nhóm lệnh: Manipulators, Interrogators, Synching.
3. **Bước 3**: Thử tạo một tệp tin `test.txt` với nội dung bất kỳ, chạy lệnh `git hash-object test.txt` và ghi lại mã băm hiển thị trên màn hình.
4. **Bước 4**: Chạy `git cat-file -p <mã-băm>` để kiểm chứng Git có thể đọc trực tiếp nội dung đối tượng qua lệnh Plumbing hay không.

---

## 💡 Hint & mẹo
> Plumbing cung cấp các lệnh cấp thấp có ích cho script và chẩn đoán. Công cụ giao diện có thể dùng Git CLI, thư viện Git hoặc giao thức khác; không nên giả định mọi thao tác Porcelain có thể thay thế y hệt bằng một chuỗi lệnh plumbing.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git hash-object` in ra object ID; repo SHA-1 thường có 40 ký tự hexa, repo SHA-256 có 64.
- Lệnh `git cat-file -p` in ra chính xác nội dung văn bản nguyên thủy của tệp tin.

---

## ❓ Quiz nhanh
Cùng làm bài kiểm tra về sự khác biệt giữa hai tầng câu lệnh Porcelain và Plumbing trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Hãy nêu một tác vụ phù hợp với Porcelain và một tác vụ phù hợp với Plumbing. Với script cần đọc trạng thái thay đổi, giải thích vì sao `git status --porcelain` an toàn hơn việc phân tích output mặc định.

---

## 📝 Tổng kết
- Porcelain là tầng lệnh bậc cao phục vụ trải nghiệm người dùng (`git add`, `git commit`, `git checkout`).
- Plumbing là tầng lệnh bậc thấp thao tác nguyên tử với dữ liệu (`git hash-object`, `git write-tree`, `git cat-file`).
- Porcelain và Plumbing là các lớp giao diện khác nhau; không phải mọi porcelain đều chỉ là chuỗi plumbing có thể thay thế chính xác.
- Hiểu Plumbing giúp làm chủ các kỹ thuật automation, viết hook và sửa lỗi hệ thống cấp sâu.
