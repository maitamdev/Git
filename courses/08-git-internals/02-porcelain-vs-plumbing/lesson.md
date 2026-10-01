# Phân biệt Porcelain Commands vs Plumbing Commands

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).
- Hiểu cách các lệnh Porcelain thân thiện (`git add`, `git commit`) phối hợp nhiều lệnh Plumbing bên dưới.
- Làm quen với các lệnh Plumbing cơ bản: `git hash-object`, `git cat-file`, `git update-index`, `git write-tree`, `git commit-tree`.
- Hiểu tại sao các công cụ tự động hóa và script luôn chọn Plumbing commands để đảm bảo tính ổn định.

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

### Atomic Git Operations
- **Nói dễ hiểu**: Các thao tác nguyên tử đơn lẻ mà mỗi lệnh Plumbing thực thi (ví dụ: chỉ ghi một blob, chỉ tạo một tree, hoặc chỉ trỏ lại một ref).
- **Ví dụ**: Lệnh `git write-tree` chỉ làm đúng một việc duy nhất là biến staging area thành một đối tượng tree.
- **Đừng nhầm**: Khác với lệnh Porcelain như `git commit` vừa kiểm tra index, vừa tạo tree, vừa tạo commit object, vừa cập nhật nhánh.

---

## 📖 Định nghĩa
Trong thuật ngữ của Git, Porcelain (nghĩa đen là đồ sứ tráng men cao cấp) là nhóm các lệnh giao diện bậc cao, thân thiện và công thái học dành cho người dùng hàng ngày như `git commit`, `git checkout`, `git pull`. Ngược lại, Plumbing (nghĩa đen là hệ thống đường ống nước ngầm) là nhóm các lệnh bậc thấp được thiết kế để thực hiện các thao tác nguyên tử trực tiếp với cơ sở dữ liệu đối tượng của Git (như `git hash-object`, `git cat-file`, `git write-tree`).

---

## 💡 Tại sao cần
Các lệnh Porcelain được thiết kế để thuận tiện cho con người, nhưng chúng ẩn giấu toàn bộ các bước xử lý nội bộ tinh vi. Khi bạn cần xây dựng các công cụ tự động hóa tùy biến, viết script tích hợp sâu, hoặc thực hiện các ca cứu hộ mã nguồn phức tạp mà lệnh bề mặt từ chối thực hiện, các lệnh Plumbing cung cấp cho bạn quyền kiểm soát phẫu thuật chính xác tới từng byte dữ liệu.

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
│ PLUMBING (Giao diện bậc thấp - Thao tác trực tiếp đĩa) │
│ git hash-object | git cat-file | git update-index      │
│ git write-tree  | git commit-tree | git rev-parse      │
└───────────────────────────┬────────────────────────────┘
                            │ Ghi trực tiếp
                            ▼
             [.git/objects/ và .git/refs/]
```

---

## 🏢 Ví dụ thực tế
Khi một lập trình viên gõ lệnh Porcelain quen thuộc: `git commit -m "feat: login"`, Git không thực hiện một hành động đơn nhất. Dưới nắp ca-pô, Git âm thầm kích hoạt một chuỗi các lệnh Plumbing: trước hết gọi `git write-tree` để quét toàn bộ Staging Area và đóng gói thành một đối tượng Tree; sau đó gọi `git commit-tree <tree-hash> -p <parent-hash> -m "feat: login"` để tạo ra đối tượng Commit; và cuối cùng gọi `git update-ref refs/heads/main <commit-hash>` để di chuyển con trỏ nhánh chính tới commit mới. Hiểu được chuỗi phối hợp này giúp kỹ sư có thể tự tay tạo ra commit mà không cần dùng đến `git add` hay `git commit`.

---

## 💻 Command & Cú pháp
```bash
# Lệnh Porcelain thông thường
git commit -m "feat: login"

# Chuỗi các lệnh Plumbing tương đương bên dưới:
# 1. Ghi cấu trúc Staging thành Tree object
TREE_SHA=$(git write-tree)

# 2. Tạo đối tượng Commit với thông điệp và commit cha
COMMIT_SHA=$(echo "feat: login" | git commit-tree $TREE_SHA -p HEAD)

# 3. Cập nhật con trỏ nhánh hiện tại trỏ tới Commit mới
git update-ref HEAD $COMMIT_SHA
```

---

## 🔍 Giải thích command
- `git commit -m "feat: login"`: Lệnh Porcelain tiện dụng gộp cả 3 bước phân tích, đóng gói và di chuyển nhánh.
- `git write-tree`: Lệnh Plumbing chuyển toàn bộ trạng thái trong `.git/index` thành một đối tượng Tree trong `.git/objects/` và trả về mã băm.
- `git commit-tree`: Lệnh Plumbing tạo đối tượng Commit với metadata tác giả, ngày giờ, thông điệp và trỏ tới tree cùng commit cha.
- `git update-ref`: Lệnh Plumbing cập nhật tham chiếu ref an toàn, tránh xung đột file đồng thời.

---

## ⚠️ Sai lầm phổ biến
1. **Cố gắng dùng Plumbing commands cho công việc thường ngày**: Lệnh Plumbing không có các kiểm tra cảnh báo an toàn và đòi hỏi gõ mã băm SHA-1 thủ công rất dễ nhầm lẫn.
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
> Bất kỳ thao tác nào bạn thực hiện bằng lệnh Porcelain đều có thể được tái hiện chính xác bằng cách xâu chuỗi các lệnh Plumbing. Đây là bí quyết các công cụ như VS Code hay GitKraken xây dựng tính năng Git tích hợp.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git hash-object` in ra chuỗi SHA-1 gồm 40 ký tự hexa.
- Lệnh `git cat-file -p` in ra chính xác nội dung văn bản nguyên thủy của tệp tin.

---

## ❓ Quiz nhanh
Cùng làm bài kiểm tra về sự khác biệt giữa hai tầng câu lệnh Porcelain và Plumbing trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Tại sao Linus Torvalds lại thiết kế tầng Plumbing trước khi xây dựng tầng Porcelain trong những ngày đầu phát triển Git năm 2005? Điều này phản ánh triết lý Unix nào?

---

## 📝 Tổng kết
- Porcelain là tầng lệnh bậc cao phục vụ trải nghiệm người dùng (`git add`, `git commit`, `git checkout`).
- Plumbing là tầng lệnh bậc thấp thao tác nguyên tử với dữ liệu (`git hash-object`, `git write-tree`, `git cat-file`).
- Mọi lệnh Porcelain thực chất là kịch bản phối hợp nhiều lệnh Plumbing bên dưới.
- Hiểu Plumbing giúp làm chủ các kỹ thuật automation, viết hook và sửa lỗi hệ thống cấp sâu.
