# Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands

---

## 🎯 Mục tiêu
- Trong một repository thử nghiệm mới, tạo một root commit bằng các lệnh plumbing mà không dùng `git add` hay `git commit`.
- Làm theo chuỗi Blob -> Index -> Tree -> Commit -> Ref và kiểm tra kết quả ở từng bước.
- Giải thích vai trò riêng của mỗi object và ref trong commit vừa tạo.

---

## 🧩 Từ khóa hôm nay

### Plumbing pipeline
- **Nói dễ hiểu**: Một chuỗi lệnh cấp thấp cho phép quan sát object và ref mà lệnh `git commit` thường phối hợp giúp bạn.
- **Ví dụ**: `hash-object` tạo blob; `write-tree` tạo tree từ index; `commit-tree` tạo commit; `update-ref` neo commit vào ref.
- **Đừng nhầm**: Đây là bài học để hiểu mô hình dữ liệu; khi làm việc thường ngày, dùng `git add` và `git commit` an toàn, dễ kiểm tra hơn.

### git update-index --cacheinfo
- **Nói dễ hiểu**: Lệnh plumbing cho phép đăng ký trực tiếp một mã băm Blob đã có trong database vào Staging Area mà không cần đọc từ file hệ thống.
- **Ví dụ**: `git update-index --add --cacheinfo 100644 <blob-sha> sample.txt`.
- **Đừng nhầm**: Cần object blob hợp lệ có sẵn. Lệnh cập nhật index không tự đọc nội dung đường dẫn để tạo blob.

### git commit-tree Command
- **Nói dễ hiểu**: Lệnh plumbing nhận mã băm của một đối tượng Tree và danh sách các commit cha để đúc ra một đối tượng Commit hoàn chỉnh.
- **Ví dụ**: `git commit-tree <tree-id> -m "feat: init"` in object ID của commit mới.
- **Đừng nhầm**: Lệnh này chỉ tạo đối tượng commit trong `.git/objects/`, chưa di chuyển nhánh hay cập nhật con trỏ HEAD.

---

## 📖 Định nghĩa
Capstone này dùng một repository mới chỉ để thực hành. Bạn tạo blob từ một tệp, đăng ký blob vào index, tạo tree từ index, tạo commit trỏ tới tree, rồi cập nhật một ref riêng tên `capstone`. Không chạy các lệnh cập nhật ref của bài trong repository dự án: `git update-ref` thay đổi ref được chỉ định. Bài tạo root commit nên không truyền parent; commit tiếp theo mới cần `-p <parent-id>`.

---

## 💡 Tại sao cần
Làm capstone giúp bạn nối các khái niệm đã học: nội dung tệp trở thành blob, index chọn blob và đường dẫn, tree ghi cấu trúc thư mục, commit ghi tree cùng thông tin lịch sử, ref giữ commit để Git có thể tìm tới. Bạn không cần dùng plumbing trong công việc hằng ngày để hiểu luồng đó.

---

## 🧠 Mental Model
Hãy tưởng tượng bạn là một nghệ nhân chế tác đồng hồ Thụy Sĩ cổ điển. Người bình thường chỉ mua chiếc đồng hồ đã đóng vỏ hoàn chỉnh về đeo lên tay và xem giờ (Porcelain). Nhưng bạn tự tay gắp từng chiếc bánh răng bánh lắc siêu nhỏ (Blob), tra dầu vào trục quay (Index), lắp ráp thành bộ máy cơ khí tinh vi (Tree), đóng vào khung vỏ thép không gỉ khắc số seri (Commit), và gắn kim đồng hồ chỉ đúng giờ hiện tại (Branch Ref).

---

## 📊 Sơ đồ minh họa
```text
Quy trình 5 bước tạo Commit hoàn chỉnh bằng Plumbing Commands:
┌────────────────────────────────────────────────────────────────────────┐
│ Bước 1: Tạo Blob từ tệp tin                                           │
│ BLOB_ID=$(git hash-object -w manual.txt)                               │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 2: Đưa vào Staging Area (Cập nhật tệp .git/index)                 │
│ git update-index --add --cacheinfo 100644 $BLOB_ID manual.txt         │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 3: Đóng gói cây thư mục thành đối tượng Tree                     │
│ TREE_ID=$(git write-tree)                                              │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 4: Đúc đối tượng Commit từ Tree                                  │
│ COMMIT_ID=$(git commit-tree $TREE_ID -m "feat: manual plumbing")       │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 5: Cập nhật con trỏ nhánh                                         │
│ git update-ref refs/heads/capstone $COMMIT_ID                          │
└────────────────────────────────────────────────────────────────────────┘
──► KẾT QUẢ: HEAD trỏ tới `capstone`; `git log -1` hiển thị commit vừa tạo.
```

---

## 🏢 Ví dụ thực tế
Trong repo capstone mới, người học ghi một blob, đưa object ID của nó vào index, lấy tree ID bằng `git write-tree`, rồi tạo root commit bằng `git commit-tree <tree-id> -m "manual plumbing"`. Cuối cùng họ tạo ref `refs/heads/capstone` cho commit và kiểm tra bằng `git log -1`. Vì đây là repo tạm, không có nhánh dự án nào bị ghi đè.

---

## 💻 Command & Cú pháp
```bash
# Tạo một repository mới dành riêng cho bài capstone
mkdir git-capstone-lab
cd git-capstone-lab
git init
git config user.name "Git Learner"
git config user.email "learner@example.com"
git symbolic-ref HEAD refs/heads/capstone

# Tạo tệp thử nghiệm rồi ghi Blob vào object database
printf "Thuc hanh plumbing\n" > manual.txt
BLOB_ID=$(git hash-object -w manual.txt)

# Đăng ký blob vào index (không dùng git add)
git update-index --add --cacheinfo 100644 "$BLOB_ID" manual.txt

# Tạo Tree từ index
TREE_ID=$(git write-tree)

# Tạo root commit: repository thử nghiệm chưa có commit cha
COMMIT_ID=$(git commit-tree "$TREE_ID" -m "feat: manual plumbing capstone")

# Neo commit vào ref capstone; HEAD đã được trỏ tới ref này ở trên
git update-ref refs/heads/capstone "$COMMIT_ID"
git log -1 --oneline
```

---

## 🔍 Giải thích command
- `git hash-object -w`: Đóng gói dữ liệu tệp thành đối tượng nhị phân Blob trong `.git/objects/`.
- `git update-index --add --cacheinfo`: Ghi bản ghi gồm file mode, hash và đường dẫn vào tệp `.git/index`.
- `git write-tree`: Quét toàn bộ bảng index và ghi ra đối tượng Tree phân cấp.
- `git commit-tree`: Tạo commit với thông điệp và thông tin tác giả; `-p` thêm parent nếu commit không phải root.
- `git update-ref`: Cập nhật ref được chỉ định. Lệnh này không tự tạo nhánh an toàn mới nếu tên ref đã tồn tại; trong lab, repo tạm bảo đảm ref `capstone` chưa có.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ `--add` hoặc `--cacheinfo` trong `git update-index`**: Khiến tệp không được thêm vào index như dự định.
2. **Không lưu lại object ID trả về giữa các bước**: Mỗi bước sau cần ID của object từ bước trước.
3. **Bỏ qua `-p` khi cần nối tiếp lịch sử**: Lab này cố ý tạo root commit trong repo rỗng nên không có parent; khi tạo commit sau, truyền `-p <parent-id>`.
4. **Chạy `git update-ref refs/heads/main <object-id-moi>` trong repo dự án**: Lệnh có thể di chuyển nhánh main và làm thay đổi lịch sử đang làm việc. Chỉ chạy trong repository dùng riêng cho lab.

---

## 🧪 Lab thực hành
Làm toàn bộ lab trong repository mới, không phải repository chứa khóa học hoặc dự án cá nhân. Khối lệnh phía trên tạo một root commit trên ref `capstone`.

1. **Bước 1**: Chạy các lệnh tạo thư mục, `git init`, cấu hình danh tính local và trỏ HEAD tới `refs/heads/capstone` như khối lệnh trên.
2. **Bước 2**: Tạo `manual.txt`, chạy `git hash-object -w manual.txt` và lưu object ID.
3. **Bước 3**: Dùng `git update-index --add --cacheinfo 100644 <blob-id> manual.txt`; kiểm tra mục bằng `git ls-files --stage`.
4. **Bước 4**: Chạy `git write-tree`; kiểm tra tree bằng `git cat-file -p <tree-id>`.
5. **Bước 5**: Chạy `git commit-tree <tree-id> -m "feat: manual capstone commit"` để tạo root commit.
6. **Bước 6**: Cập nhật ref mới bằng `git update-ref refs/heads/capstone <commit-id>`, rồi kiểm tra `git log -1` và `git status --short`.

---

## 💡 Hint & mẹo
> Luồng ở bài này là Blob -> Index -> Tree -> Commit -> Ref. HEAD là symbolic ref trỏ tới nhánh đang chọn; nó không phải bước tạo object.

---

## ✅ Validation & Kết quả mong đợi
- `git log -1` hiển thị root commit mới trên nhánh `capstone`.
- `git cat-file -p HEAD` cho thấy commit trỏ tới tree; `git status --short` không báo nội dung `manual.txt` là chưa stage.

---

## ❓ Quiz nhanh
Hãy hoàn thành bài kiểm tra danh dự tổng kết đỉnh cao của Level 8 Git Internals trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Repo lab hiện chỉ có một root commit. Tạo commit thứ hai trên cùng tree hoặc tree mới bằng `git commit-tree <tree-id> -p <parent-id>`, rồi cập nhật ref bằng old-value guard để bảo đảm ref chưa bị người khác di chuyển: `git update-ref refs/heads/capstone <new-id> <old-id>`. Quan sát parent mới bằng `git cat-file -p <new-id>`.

---

## 📝 Tổng kết
- Có thể giải thích Blob, Index, Tree, Commit và Ref trong quy trình tạo commit.
- Có thể kiểm tra object bằng `git cat-file` và xác nhận ref bằng `git log`.
- Bài lab dùng root commit trong repo tạm; tạo commit nối lịch sử cần khai báo parent.
