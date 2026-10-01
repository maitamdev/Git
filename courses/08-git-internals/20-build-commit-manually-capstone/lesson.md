# Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands

---

## 🎯 Mục tiêu
- Chinh phục thử thách tối thượng của Level 8: Tự tay tạo ra một Commit hợp lệ mà TUYỆT ĐỐI KHÔNG dùng `git add` hay `git commit`.
- Thực hiện quy trình 5 bước phẫu thuật: Băm Blob -> Cập nhật Index nhị phân -> Đóng gói Tree -> Tạo Commit object -> Cập nhật con trỏ nhánh.
- Quan sát Git Graph và `git log` hiển thị commit do chính bạn lắp ráp thủ công từ các linh kiện cơ bản.
- Hoàn thiện toàn diện bức tranh hiểu biết về Git Internals từ gốc rễ.

---

## 🧩 Từ khóa hôm nay

### Plumbing Assembly Pipeline
- **Nói dễ hiểu**: Chuỗi phối hợp 5 bước nguyên tử bên dưới lớp vỏ bọc Porcelain: Blob -> Index -> Tree -> Commit -> Reference.
- **Ví dụ**: Dùng `git hash-object`, `git update-index`, `git write-tree`, `git commit-tree`, `git update-ref` để tạo commit.
- **Đừng nhầm**: Không chỉ là bài tập lý thuyết; đây là cách các công cụ phát triển phần mềm như libgit2 hay IDE tự động tương tác với Git.

### git update-index --cacheinfo
- **Nói dễ hiểu**: Lệnh plumbing cho phép đăng ký trực tiếp một mã băm Blob đã có trong database vào Staging Area mà không cần đọc từ file hệ thống.
- **Ví dụ**: `git update-index --add --cacheinfo 100644 <blob-sha> sample.txt`.
- **Đừng nhầm**: Không cần file `sample.txt` phải tồn tại trong working directory; Git chỉ ghi ánh xạ vào `.git/index`.

### git commit-tree Command
- **Nói dễ hiểu**: Lệnh plumbing nhận mã băm của một đối tượng Tree và danh sách các commit cha để đúc ra một đối tượng Commit hoàn chỉnh.
- **Ví dụ**: `echo "feat: init" | git commit-tree <tree-sha>` in ra mã băm của commit mới.
- **Đừng nhầm**: Lệnh này chỉ tạo đối tượng commit trong `.git/objects/`, chưa di chuyển nhánh hay cập nhật con trỏ HEAD.

---

## 📖 Định nghĩa
Bài học Capstone này là đỉnh cao danh vọng chứng minh bạn đã hoàn toàn làm chủ bản chất nội tại của Git. Trong thử thách này, các lệnh Porcelain bậc cao (`git add`, `git commit`) bị cấm sử dụng hoàn toàn. Bạn sẽ đóng vai trò như chính bộ máy hạt nhân của Git: tự tay băm dữ liệu thô thành đối tượng Blob, tự tay ghi bản ghi vào tệp nhị phân Staging Area (`.git/index`), tự tay xuất cây thư mục Tree, tự tay kết nối thông tin tác giả để đúc nên đối tượng Commit, và cuối cùng cập nhật con trỏ tham chiếu nhánh.

---

## 💡 Tại sao cần
Mọi lập trình viên trên thế giới đều biết gõ `git add` rồi `git commit` theo thói quen hàng ngày. Nhưng chỉ có top 1% các kỹ sư tinh hoa mới có thể giải thích cặn kẽ và tự tay thực hiện toàn bộ quy trình đó bằng các lệnh nguyên tử bên dưới. Khi bạn tự tay tạo thành công một commit bằng các công cụ plumbing, bạn không còn nhìn Git như một người sử dụng công cụ thụ động nữa; bạn hiểu Git như chính Linus Torvalds khi ông viết nên những dòng mã đầu tiên.

---

## 🧠 Mental Model
Hãy tưởng tượng bạn là một nghệ nhân chế tác đồng hồ Thụy Sĩ cổ điển. Người bình thường chỉ mua chiếc đồng hồ đã đóng vỏ hoàn chỉnh về đeo lên tay và xem giờ (Porcelain). Nhưng bạn tự tay gắp từng chiếc bánh răng bánh lắc siêu nhỏ (Blob), tra dầu vào trục quay (Index), lắp ráp thành bộ máy cơ khí tinh vi (Tree), đóng vào khung vỏ thép không gỉ khắc số seri (Commit), và gắn kim đồng hồ chỉ đúng giờ hiện tại (Branch Ref).

---

## 📊 Sơ đồ minh họa
```text
Quy trình 5 bước tạo Commit hoàn chỉnh bằng Plumbing Commands:
┌────────────────────────────────────────────────────────────────────────┐
│ Bước 1: Tạo Blob từ tệp tin                                           │
│ echo "Hello" > app.txt                                                 │
│ BLOB_ID=$(git hash-object -w app.txt)                                  │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 2: Đưa vào Staging Area (Cập nhật tệp .git/index)                 │
│ git update-index --add --cacheinfo 100644 $BLOB_ID app.txt            │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 3: Đóng gói cây thư mục thành đối tượng Tree                     │
│ TREE_ID=$(git write-tree)                                              │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 4: Đúc đối tượng Commit từ Tree                                  │
│ COMMIT_ID=$(echo "feat: manual plumbing" | git commit-tree $TREE_ID)   │
├────────────────────────────────────────────────────────────────────────┤
│ Bước 5: Cập nhật con trỏ nhánh                                         │
│ git update-ref refs/heads/main $COMMIT_ID                              │
└────────────────────────────────────────────────────────────────────────┘
──► KẾT QUẢ: `git log` và Git Graph hiển thị commit mới mượt mà 100%!
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư trong kỳ thi tuyển chọn Kiến trúc sư trưởng tại một công ty công nghệ đa quốc gia nhận được đề bài: "Tạo một commit hợp lệ trong Git mà không được sử dụng lệnh git add và git commit". Không một giây chần chừ, kỹ sư tạo tệp `README.md`, băm tệp lấy mã Blob bằng `git hash-object -w README.md`. Tiếp đó, kỹ sư gọi `git update-index --add --cacheinfo 100644 <blob-hash> README.md` để lập chỉ mục. Kỹ sư chạy `git write-tree` thu được mã Tree, rồi chuyển tiếp qua `git commit-tree <tree-hash> -m "feat: built with plumbing"`. Cuối cùng, kỹ sư cập nhật con trỏ nhánh bằng `git update-ref refs/heads/main <commit-hash>`. Khi gõ lệnh `git log -1`, toàn bộ hội đồng giám khảo đứng dậy vỗ tay khi thấy commit mới hiển thị hoàn hảo trên đồ thị. Kỹ sư chính thức được tuyển dụng.

---

## 💻 Command & Cú pháp
```bash
# Bước 1: Ghi Blob vào database
BLOB_SHA=$(git hash-object -w file.txt)

# Bước 2: Thêm entry vào Staging Index
git update-index --add --cacheinfo 100644 $BLOB_SHA file.txt

# Bước 3: Xuất Tree object từ Index
TREE_SHA=$(git write-tree)

# Bước 4: Tạo Commit object trỏ tới Tree và parent
COMMIT_SHA=$(echo "feat: built manually with plumbing" | git commit-tree $TREE_SHA -p HEAD)

# Bước 5: Di chuyển con trỏ nhánh tới commit mới
git update-ref refs/heads/main $COMMIT_SHA
```

---

## 🔍 Giải thích command
- `git hash-object -w`: Đóng gói dữ liệu tệp thành đối tượng nhị phân Blob trong `.git/objects/`.
- `git update-index --add --cacheinfo`: Ghi bản ghi gồm file mode, hash và đường dẫn vào tệp `.git/index`.
- `git write-tree`: Quét toàn bộ bảng index và ghi ra đối tượng Tree phân cấp.
- `git commit-tree`: Tạo commit với thông điệp, timestamp và liên kết với commit cha qua cờ `-p`.
- `git update-ref`: Ghi mã băm commit mới vào tệp `.git/refs/heads/main` một cách an toàn.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ `--add` hoặc `--cacheinfo` trong `git update-index`**: Khiến tệp không được nạp vào index đúng chuẩn POSIX.
2. **Không lưu lại mã băm trả về giữa các bước**: Mỗi bước sau đều cần mã SHA-1 của bước trước làm tham số đầu vào.
3. **Quên truyền `-p HEAD` ở bước commit-tree**: Sẽ vô tình tạo ra một root commit mồ côi không có lịch sử nối tiếp với các commit trước.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một tệp tin `manual.txt` chứa nội dung "Thực hành Plumbing Capstone".
2. **Bước 2**: Chạy lệnh `git hash-object -w manual.txt` để lấy mã băm Blob.
3. **Bước 3**: Chạy `git update-index --add --cacheinfo 100644 <blob-hash> manual.txt`.
4. **Bước 4**: Chạy `git write-tree` để sinh mã băm Tree.
5. **Bước 5**: Chạy `git commit-tree <tree-hash> -p HEAD -m "feat: manual capstone commit"` để tạo commit.
6. **Bước 6**: Chạy `git update-ref refs/heads/main <commit-hash>` và chiêm ngưỡng kết quả với `git log -1`.

---

## 💡 Hint & mẹo
> Hãy ghi nhớ công thức dây chuyền chuẩn mực: Blob -> Index -> Tree -> Commit -> Ref -> HEAD. Đây là toàn bộ nguyên lý vận hành cốt lõi của mọi thao tác lưu vết trong Git.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git log -1` hiển thị commit mới nhất mang thông điệp "feat: manual capstone commit".
- Lệnh `git status` báo working tree clean, không còn thay đổi tồn đọng nào.

---

## ❓ Quiz nhanh
Hãy hoàn thành bài kiểm tra danh dự tổng kết đỉnh cao của Level 8 Git Internals trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để tạo một Merge Commit thủ công hoàn toàn bằng lệnh plumbing `git commit-tree` kết hợp truyền hai cờ `-p parent1 -p parent2`?

---

## 📝 Tổng kết
- Chinh phục trọn vẹn quy trình 5 bước xây dựng Commit thủ công từ các hạt nguyên tử cơ bản của Git.
- Thấu hiểu bản chất cơ học thực sự bên dưới các lệnh bề mặt `git add` và `git commit`.
- Làm chủ hoàn toàn 4 loại đối tượng (`blob`, `tree`, `commit`, `tag`) và cấu trúc con trỏ của Git.
- Chính thức tốt nghiệp toàn diện chương trình đào tạo Git Academy từ Zero đến Git Internals Master!
