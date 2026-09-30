# Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands

---

## 🎯 Mục tiêu bài học
- Chinh phục thử thách tối thượng của Level 8: Tự tay tạo ra một Commit hợp lệ mà TUYỆT ĐỐI KHÔNG dùng git add hay git commit.
- Thực hiện quy trình 5 bước phẫu thuật: Băm Blob -> Cập nhật Index nhị phân -> Đóng gói Tree -> Tạo Commit object -> Cập nhật con trỏ nhánh.
- Quan sát Git Graph và git log hiển thị commit do chính bạn lắp ráp thủ công từ các linh kiện cơ bản.

---

## 📖 Định nghĩa
> Bài học Capstone này là đỉnh cao danh vọng chứng minh bạn đã hoàn toàn làm chủ bản chất nội tại của Git. Trong thử thách này, các lệnh Porcelain bậc cao (git add, git commit) bị cấm sử dụng hoàn toàn. Bạn sẽ đóng vai trò như chính bộ máy hạt nhân của Git: tự tay băm dữ liệu thô thành đối tượng Blob, tự tay ghi bản ghi vào tệp nhị phân Staging Area (.git/index), tự tay xuất cây thư mục Tree, tự tay kết nối thông tin tác giả để đúc nên đối tượng Commit, và cuối cùng cập nhật con trỏ tham chiếu nhánh.

---

## 🤔 Tại sao cần?
Mọi lập trình viên trên thế giới đều biết gõ git add rồi git commit theo thói quen hàng ngày. Nhưng chỉ có top 1% các kỹ sư tinh hoa mới có thể giải thích cặn kẽ và tự tay thực hiện toàn bộ quy trình đó bằng các lệnh nguyên tử bên dưới. Khi bạn tự tay tạo thành công một commit bằng các công cụ plumbing, bạn không còn nhìn Git như một người sử dụng công cụ thụ động nữa; bạn hiểu Git như chính Linus Torvalds khi ông viết nên những dòng mã đầu tiên.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng bạn là một nghệ nhân chế tác đồng hồ Thụy Sĩ cổ điển. Người bình thường chỉ mua chiếc đồng hồ đã đóng vỏ hoàn chỉnh về đeo lên tay và xem giờ (Porcelain). Nhưng bạn tự tay gắp từng chiếc bánh răng bánh lắc siêu nhỏ (Blob), tra dầu vào trục quay (Index), lắp ráp thành bộ máy cơ khí tinh vi (Tree), đóng vào khung vỏ thép không gỉ khắc số seri (Commit), và gắn kim đồng hồ chỉ đúng giờ hiện tại (Branch Ref).

---

## 🖼️ Sơ đồ minh họa
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

## 🌎 Ví dụ thực tế
Một kỹ sư trong kỳ thi tuyển chọn Kiến trúc sư trưởng tại một công ty công nghệ đa quốc gia nhận được đề bài: "Tạo một commit hợp lệ trong Git mà không được sử dụng lệnh git add và git commit". Không một giây chần chừ, kỹ sư tạo tệp `README.md`, băm tệp lấy mã Blob bằng `git hash-object -w README.md`. Tiếp đó, kỹ sư gọi `git update-index --add --cacheinfo 100644 <blob-hash> README.md` để lập chỉ mục. Kỹ sư chạy `git write-tree` thu được mã Tree, rồi chuyển tiếp qua `git commit-tree <tree-hash> -m "feat: built with plumbing"`. Cuối cùng, kỹ sư cập nhật con trỏ nhánh bằng `git update-ref refs/heads/main <commit-hash>`. Khi gõ lệnh `git log -1`, toàn bộ hội đồng giám khảo đứng dậy vỗ tay khi thấy commit mới hiển thị hoàn hảo trên đồ thị. Kỹ sư chính thức được tuyển dụng.

---

## 💻 Command & Lệnh thao tác
```bash
git hash-object -w <file>
git update-index --add --cacheinfo 100644 <hash> <path>
git write-tree
git commit-tree <tree-hash> -m "Manual commit"
git update-ref refs/heads/main <commit-hash>
```

---

## 🔍 Giải thích chi tiết lệnh
Năm câu lệnh nguyên tử trên tạo thành một chuỗi lắp ráp hoàn chỉnh: hash-object tạo blob, update-index stage tệp vào index, write-tree tạo tree object, commit-tree tạo commit object, và update-ref di chuyển con trỏ nhánh tới commit mới một cách an toàn.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Quên cờ `--add` hoặc `--cacheinfo` trong lệnh `git update-index` khiến tệp không được nạp vào index đúng chuẩn.**: 
2. **Không lưu lại mã băm trả về của từng bước để truyền vào bước tiếp theo (Tree cần Blob, Commit cần Tree, Ref cần Commit).**: 
3. **Quên truyền commit cha `-p HEAD` nếu đây không phải là commit đầu tiên của dự án, làm lịch sử bị đứt gãy thành nhiều root.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một tệp tin `manual.txt` chứa nội dung "Thực hành Plumbing Capstone".
2. Chạy lệnh `git hash-object -w manual.txt` để lấy mã băm Blob.
3. Chạy `git update-index --add --cacheinfo 100644 <blob-hash> manual.txt`.
4. Chạy `git write-tree` để sinh mã băm Tree.
5. Chạy `git commit-tree <tree-hash> -m "feat: manual capstone commit"` để tạo commit.
6. Chạy `git update-ref refs/heads/main <commit-hash>` và chiêm ngưỡng kết quả với `git log`.

---

## 💡 Gợi ý thực hiện (Hint)
> Hãy ghi nhớ công thức dây chuyền: Blob -> Index -> Tree -> Commit -> Ref -> HEAD.

---

## ✅ Kiểm tra kết quả (Validation)
Lệnh git log hiển thị commit mới với đầy đủ tác giả, cây thư mục và thông điệp mà không dùng bất kỳ lệnh porcelain nào.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy hoàn thành bài kiểm tra danh dự tổng kết đỉnh cao của Level 8 Git Internals.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để tạo một Merge Commit thủ công hoàn toàn bằng lệnh plumbing git commit-tree kết hợp truyền hai cờ `-p parent1 -p parent2`?

---

## 📚 Tổng kết kiến thức
- Chinh phục trọn vẹn quy trình 5 bước xây dựng Commit thủ công từ các hạt nguyên tử cơ bản của Git.
- Thấu hiểu bản chất cơ học thực sự bên dưới các lệnh bề mặt `git add` và `git commit`.
- Chính thức tốt nghiệp toàn diện chương trình đào tạo Git Academy từ Zero đến Git Internals Master!
