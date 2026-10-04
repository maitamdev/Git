# Đối tượng Tree: Lưu trữ cấu trúc thư mục và quyền tệp

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất của đối tượng Tree như người quản lý cấu trúc thư mục phân cấp trong Git.
- Nắm vững các trường trong Tree Entry: mode, loại, object ID và tên tệp/thư mục.
- Khám phá kiến trúc cây Merkle Tree lồng nhau: một đối tượng Tree có thể chứa các đối tượng Tree con (thư mục con) và Blob (tệp con).
- Sử dụng thành thạo các lệnh plumbing `git ls-tree` và `git write-tree`.

---

## 🧩 Từ khóa hôm nay

### Tree Object
- **Nói dễ hiểu**: Loại đối tượng Git đại diện cho một thư mục, liên kết tên tệp tin với mã băm Blob hoặc Tree con tương ứng.
- **Ví dụ**: Root tree của dự án chứa thông tin ánh xạ `README.md` tới mã băm blob và `src/` tới mã băm tree con.
- **Đừng nhầm**: Không lưu nội dung dữ liệu bên trong tệp; chỉ lưu danh mục ánh xạ tên và quyền hạn.

### File Mode (100644 vs 100755)
- **Nói dễ hiểu**: Mã bát phân quy định thuộc tính của tệp: `100644` là tệp thông thường, `100755` là tệp có quyền thực thi (script), `040000` là thư mục con.
- **Ví dụ**: Tệp shell script `deploy.sh` sau khi cấp cờ `chmod +x` sẽ được Git lưu với mode `100755`.
- **Đừng nhầm**: Git không lưu đầy đủ toàn bộ hệ thống phân quyền phức tạp của Linux (như user ID hay group ID); chỉ theo dõi cờ thực thi.

### Merkle Tree Architecture
- **Nói dễ hiểu**: Cấu trúc mà object ID của tree phụ thuộc nội dung entry, gồm tên, mode và các object ID con.
- **Ví dụ**: Nếu bạn sửa 1 tệp trong `src/utils/math.ts`, mã băm của `utils/`, mã băm của `src/`, và mã băm của Root Tree đều tự động thay đổi theo chuỗi.
- **Đừng nhầm**: Không cần quét lại toàn bộ ổ đĩa; Git chỉ cần so sánh mã băm của hai Root Tree là biết ngay hai phiên bản có giống nhau hay không.

---

## 📖 Định nghĩa
Đối tượng Tree biểu diễn một thư mục bằng các entry gồm mode, loại object, object ID và tên. Ví dụ phổ biến là `100644`/`100755` cho file thường, `040000` cho tree con, `120000` cho symlink và `160000` cho submodule (gitlink tới commit). Object ID dài tùy hash format của repository.

---

## 🤔 Tại sao cần?
Nếu chỉ có blob, Git sẽ biết nội dung nhưng không biết tên, đường dẫn hay mode của tệp. Tree ghi các thông tin đó theo cấu trúc thư mục. Commit ghi lại tree được tạo từ index tại thời điểm commit, nên tree không nhất thiết phản ánh mọi thay đổi đang có trong working tree.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng đối tượng Tree như một cuốn sổ mục lục danh bạ thư mục. Mỗi trang sổ đại diện cho một ngăn tủ (Tree). Mở trang sổ ra, bạn thấy từng dòng ghi chú rõ ràng: "Ngăn nhỏ số 1 (040000 tree abc12): thư mục src", "Tài liệu số 2 (100644 blob def34): tệp README.md". Khi bạn muốn tìm tệp `src/app.ts`, bạn lần theo mục lục từ trang sổ gốc (Root Tree) đi vào trang sổ con (Sub-tree src) rồi mới chạm tới bức thư tay (Blob app.ts).

---

## 🖼 Sơ đồ
```text
Cấu trúc cây Merkle Tree phân tầng:
[Root Tree: a1b2c3d4]
├── 100644 blob e69de29b README.md
└── 040000 tree f4a3b1c2 src/
                          │
                          ▼ [Sub-Tree src: f4a3b1c2]
                          ├── 100644 blob 3b18e5f1 app.ts
                          └── 100755 blob 9a8c7b6d build.sh (Executable)
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư muốn khám phá cây thư mục của commit mới nhất trong dự án. Kỹ sư chạy lệnh `git cat-file -p HEAD` để lấy mã băm của đối tượng Tree gốc từ thông tin commit. Sau đó, kỹ sư chạy lệnh `git ls-tree <tree-hash>` và thấy hai dòng bản ghi: dòng thứ nhất hiển thị `100644 blob e69de29b package.json`, dòng thứ hai hiển thị `040000 tree a8b7c6df src`. Kỹ sư tiếp tục chạy `git ls-tree a8b7c6df` để xem nội dung thư mục con `src` và thấy danh sách các tệp mã nguồn bên trong gồm `app.ts` và `utils.ts`. Cấu trúc lồng nhau dạng Merkle Tree này chứng minh Git có thể quản lý cả cây thư mục sâu hàng chục tầng một cách ngăn nắp, tốc độ cao và cực kỳ nhẹ nhàng.

---

## 💻 Command
```bash
# Xem danh sách cấu trúc cây thư mục của commit hiện tại
git ls-tree HEAD

# Đệ quy xem toàn bộ tệp trong các thư mục con
git ls-tree -r HEAD

# Xem nội dung thô của root tree trong commit hiện tại
git cat-file -p "HEAD^{tree}"

# Đóng gói Staging Area thành đối tượng Tree và in ra mã băm
git write-tree
```

---

## 🔍 Giải thích command
- `git ls-tree HEAD`: Liệt kê các bản ghi cấp cao nhất trong cây thư mục của commit hiện tại.
- Cờ `-r` (recursive): Đệ quy đi vào mọi thư mục con để in danh sách toàn bộ các blob.
- `git cat-file -p "HEAD^{tree}"`: In cấu trúc gồm mode, type, object ID và filename của root Tree trong HEAD.
- `git write-tree`: Lệnh Plumbing chuyển trạng thái của file `.git/index` thành một đối tượng Tree mới trong cơ sở dữ liệu.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng thư mục rỗng sẽ tạo ra Tree**: Git không bao giờ theo dõi thư mục trống nếu bên trong không có ít nhất một file (đó là lý do các nhóm hay tạo file `.gitkeep`).
2. **Nhầm lẫn giữa quyền hạn Linux và Git Mode**: Git không lưu quyền đọc hay ghi chi tiết; chỉ phân biệt quyền thực thi (`100755`) và không thực thi (`100644`).
3. **Sắp xếp entry trong Tree sai thứ tự**: Git có quy tắc sắp xếp entry theo tên với xử lý riêng cho thư mục; không nên tự tạo raw tree bằng cách sắp theo trực giác.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Trong repository thực hành riêng, tạo `src/index.js` và `README.md` ở thư mục gốc.
2. Stage đúng hai đường dẫn bằng `git add README.md src/index.js` để không đưa các thay đổi khác vào index.
3. **Bước 3**: Chạy lệnh plumbing `git write-tree` để sinh ra mã băm của đối tượng Root Tree.
4. **Bước 4**: Chạy lệnh `git ls-tree <mã_tree_vừa_tạo>` để thấy hai dòng: một dòng kiểu `blob` cho `README.md` và một dòng kiểu `tree` cho thư mục `src`.

---

## 💡 Hint
> Mã quyền `100755` biểu thị tệp tin có cờ thực thi (executable script), trong khi `100644` là tệp văn bản hoặc nhị phân thông thường. Khi bạn chạy `git update-index --chmod=+x script.sh`, Git sẽ cập nhật mode trong Tree mà không cần sửa nội dung tệp.

---

## ✅ Validation
- Lệnh `git ls-tree` hiển thị bảng danh mục chuẩn với 4 cột: Mode, Type, Hash, Path.
- Thư mục con `src` hiển thị loại object là `tree` và object ID riêng theo hash format của repo.

---

## ❓ Quiz
Hãy kiểm tra khả năng phân tích đối tượng Tree qua bài trắc nghiệm trong phần bên dưới.

---

## 🔥 Challenge
Tại sao Git từ chối theo dõi một thư mục hoàn toàn trống rỗng nếu không có tệp tin nào bên trong? Về mặt cấu trúc đối tượng, điều gì ngăn cản việc lưu trữ một thư mục không có con?

---

## 📚 Tổng kết
- Đối tượng Tree đại diện cho một thư mục, liên kết các tên tệp với các đối tượng Blob và Tree con.
- Mỗi bản ghi trong Tree gồm: mode, loại object, object ID và tên tệp/thư mục.
- Mô hình cây Merkle Tree giúp Git phát hiện sự thay đổi ở bất kỳ nhánh con nào một cách tức thì.
- Git không lưu một thư mục làm việc rỗng như một mục riêng; muốn giữ thư mục, cần stage một file bên trong, thường dùng file giữ chỗ như `.gitkeep`.
