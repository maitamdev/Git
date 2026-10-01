# Đối tượng Tree: Lưu trữ cấu trúc thư mục và quyền tệp

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất của đối tượng Tree như người quản lý cấu trúc thư mục phân cấp trong Git.
- Nắm vững định dạng từng dòng mục (Tree Entry): chế độ quyền tệp (mode), loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.
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
- **Nói dễ hiểu**: Cây đồ thị băm trong đó mã băm của nút cha được tính toán dựa trên mã băm của tất cả các nút con bên dưới.
- **Ví dụ**: Nếu bạn sửa 1 tệp trong `src/utils/math.ts`, mã băm của `utils/`, mã băm của `src/`, và mã băm của Root Tree đều tự động thay đổi theo chuỗi.
- **Đừng nhầm**: Không cần quét lại toàn bộ ổ đĩa; Git chỉ cần so sánh mã băm của hai Root Tree là biết ngay hai phiên bản có giống nhau hay không.

---

## 📖 Định nghĩa
Đối tượng Tree (Cây thư mục) trong Git giải quyết bài toán biểu diễn cấu trúc hệ thống tệp tin phân cấp. Một đối tượng Tree đại diện cho một thư mục, bên trong chứa danh sách các bản ghi (entries). Mỗi bản ghi bao gồm 4 thông tin cốt lõi: chế độ quyền tệp (File Mode, ví dụ: 100644 cho tệp thường, 100755 cho tệp thực thi, 040000 cho thư mục con), loại đối tượng (blob hoặc tree), mã băm SHA-1 của đối tượng đó, và tên gọi của tệp hoặc thư mục.

---

## 💡 Tại sao cần
Nếu kiến trúc Git chỉ lưu trữ các đối tượng Blob, chúng ta sẽ chỉ sở hữu một kho dữ liệu nội dung thô rời rạc mà không thể biết tệp nào mang tên là gì, nằm trong đường dẫn thư mục nào, hoặc tệp nào được gán quyền thực thi kịch bản hệ điều hành. Đối tượng Tree chính là chất keo kết nối các Blob đơn lẻ lại thành một cây thư mục phân cấp hoàn chỉnh, mô phỏng chính xác 100% trạng thái không gian làm việc của dự án tại thời điểm chụp ảnh nhanh (snapshot), giúp tái tạo lại toàn bộ dự án nguyên vẹn.

---

## 🧠 Mental Model
Hãy tưởng tượng đối tượng Tree như một cuốn sổ mục lục danh bạ thư mục. Mỗi trang sổ đại diện cho một ngăn tủ (Tree). Mở trang sổ ra, bạn thấy từng dòng ghi chú rõ ràng: "Ngăn nhỏ số 1 (040000 tree abc12): thư mục src", "Tài liệu số 2 (100644 blob def34): tệp README.md". Khi bạn muốn tìm tệp `src/app.ts`, bạn lần theo mục lục từ trang sổ gốc (Root Tree) đi vào trang sổ con (Sub-tree src) rồi mới chạm tới bức thư tay (Blob app.ts).

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Một kỹ sư muốn khám phá cây thư mục của commit mới nhất trong dự án. Kỹ sư chạy lệnh `git cat-file -p HEAD` để lấy mã băm của đối tượng Tree gốc từ thông tin commit. Sau đó, kỹ sư chạy lệnh `git ls-tree <tree-hash>` và thấy hai dòng bản ghi: dòng thứ nhất hiển thị `100644 blob e69de29b package.json`, dòng thứ hai hiển thị `040000 tree a8b7c6df src`. Kỹ sư tiếp tục chạy `git ls-tree a8b7c6df` để xem nội dung thư mục con `src` và thấy danh sách các tệp mã nguồn bên trong gồm `app.ts` và `utils.ts`. Cấu trúc lồng nhau dạng Merkle Tree này chứng minh Git có thể quản lý cả cây thư mục sâu hàng chục tầng một cách ngăn nắp, tốc độ cao và cực kỳ nhẹ nhàng.

---

## 💻 Command & Cú pháp
```bash
# Xem danh sách cấu trúc cây thư mục của commit hiện tại
git ls-tree HEAD

# Đệ quy xem toàn bộ tệp trong các thư mục con
git ls-tree -r HEAD

# Xem nội dung thô dạng bảng của một đối tượng Tree qua mã băm
git cat-file -p 4b825dc642cb6eb9a060e54bf8d69288fbee4904

# Đóng gói Staging Area thành đối tượng Tree và in ra mã băm
git write-tree
```

---

## 🔍 Giải thích command
- `git ls-tree HEAD`: Liệt kê các bản ghi cấp cao nhất trong cây thư mục của commit hiện tại.
- Cờ `-r` (recursive): Đệ quy đi vào mọi thư mục con để in danh sách toàn bộ các blob.
- `git cat-file -p <tree-hash>`: In ra cấu trúc văn bản thô gồm mode, type, SHA-1 và filename của đối tượng Tree.
- `git write-tree`: Lệnh Plumbing chuyển trạng thái của file `.git/index` thành một đối tượng Tree mới trong cơ sở dữ liệu.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng thư mục rỗng sẽ tạo ra Tree**: Git không bao giờ theo dõi thư mục trống nếu bên trong không có ít nhất một file (đó là lý do các nhóm hay tạo file `.gitkeep`).
2. **Nhầm lẫn giữa quyền hạn Linux và Git Mode**: Git không lưu quyền đọc hay ghi chi tiết; chỉ phân biệt quyền thực thi (`100755`) và không thực thi (`100644`).
3. **Sắp xếp entry trong Tree sai thứ tự**: Chuẩn định dạng nhị phân của Git yêu cầu các mục trong Tree phải được sắp xếp nghiêm ngặt theo thứ tự mã byte ASCII.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một thư mục con `src` chứa tệp `index.js`, và một tệp `README.md` ở thư mục gốc.
2. **Bước 2**: Đưa toàn bộ vào staging bằng lệnh `git add .`.
3. **Bước 3**: Chạy lệnh plumbing `git write-tree` để sinh ra mã băm của đối tượng Root Tree.
4. **Bước 4**: Chạy lệnh `git ls-tree <mã_tree_vừa_tạo>` để thấy hai dòng: một dòng kiểu `blob` cho `README.md` và một dòng kiểu `tree` cho thư mục `src`.

---

## 💡 Hint & mẹo
> Mã quyền `100755` biểu thị tệp tin có cờ thực thi (executable script), trong khi `100644` là tệp văn bản hoặc nhị phân thông thường. Khi bạn chạy `git update-index --chmod=+x script.sh`, Git sẽ cập nhật mode trong Tree mà không cần sửa nội dung tệp.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git ls-tree` hiển thị bảng danh mục chuẩn với 4 cột: Mode, Type, Hash, Path.
- Thư mục con `src` hiển thị loại đối tượng là `tree` và có mã SHA-1 riêng biệt.

---

## ❓ Quiz nhanh
Hãy kiểm tra khả năng phân tích đối tượng Tree qua bài trắc nghiệm trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Tại sao Git từ chối theo dõi một thư mục hoàn toàn trống rỗng nếu không có tệp tin nào bên trong? Về mặt cấu trúc đối tượng, điều gì ngăn cản việc lưu trữ một thư mục không có con?

---

## 📝 Tổng kết
- Đối tượng Tree đại diện cho một thư mục, liên kết các tên tệp với các đối tượng Blob và Tree con.
- Mỗi bản ghi trong Tree gồm: File Mode, loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.
- Mô hình cây Merkle Tree giúp Git phát hiện sự thay đổi ở bất kỳ nhánh con nào một cách tức thì.
- Thư mục rỗng không có đối tượng con nên không thể sinh ra Tree, cần dùng tệp giữ chỗ như `.gitkeep`.
