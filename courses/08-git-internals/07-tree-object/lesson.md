# Đối tượng Tree: Lưu trữ cấu trúc thư mục và quyền tệp

---

## 🎯 Mục tiêu bài học
- Hiểu rõ bản chất của đối tượng Tree như người quản lý cấu trúc thư mục phân cấp trong Git.
- Nắm vững định dạng từng dòng mục (Tree Entry): chế độ quyền tệp (mode), loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.
- Khám phá kiến trúc cây Merkle Tree lồng nhau: một đối tượng Tree có thể chứa các đối tượng Tree con (thư mục con) và Blob (tệp con).

---

## 📖 Định nghĩa
> Đối tượng Tree (Cây thư mục) trong Git giải quyết bài toán biểu diễn cấu trúc hệ thống tệp tin phân cấp. Một đối tượng Tree đại diện cho một thư mục, bên trong chứa danh sách các bản ghi (entries). Mỗi bản ghi bao gồm 4 thông tin cốt lõi: chế độ quyền tệp (File Mode, ví dụ: 100644 cho tệp thường, 100755 cho tệp thực thi, 040000 cho thư mục con), loại đối tượng (blob hoặc tree), mã băm SHA-1 của đối tượng đó, và tên gọi của tệp hoặc thư mục.

---

## 🤔 Tại sao cần?
Nếu kiến trúc Git chỉ lưu trữ các đối tượng Blob, chúng ta sẽ chỉ sở hữu một kho dữ liệu nội dung thô rời rạc mà không thể biết tệp nào mang tên là gì, nằm trong đường dẫn thư mục nào, hoặc tệp nào được gán quyền thực thi kịch bản hệ điều hành. Đối tượng Tree chính là chất keo kết nối các Blob đơn lẻ lại thành một cây thư mục phân cấp hoàn chỉnh, mô phỏng chính xác 100% trạng thái không gian làm việc của dự án tại thời điểm chụp ảnh nhanh (snapshot), giúp tái tạo lại toàn bộ dự án nguyên vẹn.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng đối tượng Tree như một cuốn sổ mục lục danh bạ thư mục. Mỗi trang sổ đại diện cho một ngăn tủ (Tree). Mở trang sổ ra, bạn thấy từng dòng ghi chú rõ ràng: "Ngăn nhỏ số 1 (040000 tree abc12): thư mục src", "Tài liệu số 2 (100644 blob def34): tệp README.md". Khi bạn muốn tìm tệp `src/app.ts`, bạn lần theo mục lục từ trang sổ gốc (Root Tree) đi vào trang sổ con (Sub-tree src) rồi mới chạm tới bức thư tay (Blob app.ts).

---

## 🖼️ Sơ đồ minh họa
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

## 💻 Command & Lệnh thao tác
```bash
git cat-file -p <tree-hash>
git ls-tree HEAD
git write-tree
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git ls-tree HEAD in ra danh sách cấu trúc cây thư mục của commit hiện tại, git cat-file -p hiển thị định dạng nội dung thô của đối tượng Tree, và git write-tree đóng gói Staging Area thành đối tượng Tree mới.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cho rằng thư mục trống (Empty Directory) sẽ tạo ra một đối tượng Tree**:  Git không thể theo dõi thư mục trống nếu bên trong không có ít nhất một tệp tin (đó là lý do người ta phải dùng `.gitkeep`).
2. **Nhầm lẫn giữa quyền hạn tệp đầy đủ của Linux với Git File Mode**:  Git chỉ hỗ trợ một số ít chế độ quyền chuẩn (100644, 100755, 120000 cho symlink, 040000 cho directory).
3. **Sắp xếp danh sách entry trong Tree sai thứ tự**:  Chuẩn Git bắt buộc các mục trong Tree phải được sắp xếp theo thứ tự mã byte ASCII của tên tệp.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một dự án nhỏ gồm một tệp ở thư mục gốc và một tệp bên trong thư mục con `src/`.
2. Đưa toàn bộ vào staging bằng lệnh `git add .`.
3. Chạy lệnh plumbing `git write-tree` để tự sinh ra mã băm của đối tượng Root Tree.
4. Sử dụng `git cat-file -p <tree-hash>` để quan sát cấu trúc bảng phân nhánh bên trong.

---

## 💡 Gợi ý thực hiện (Hint)
> Mã quyền `100755` biểu thị tệp tin có cờ thực thi (executable script), trong khi `100644` là tệp văn bản hoặc nhị phân thông thường.

---

## ✅ Kiểm tra kết quả (Validation)
Nhận diện chính xác các dòng blob và tree con bên trong bảng in ra của lệnh ls-tree.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra khả năng phân tích đối tượng Tree qua bài trắc nghiệm dưới đây.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao Git từ chối theo dõi (track) một thư mục hoàn toàn trống rỗng nếu không có tệp tin nào bên trong?

---

## 📚 Tổng kết kiến thức
- Đối tượng Tree đại diện cho một thư mục, liên kết các tên tệp với các đối tượng Blob và Tree con.
- Mỗi bản ghi trong Tree gồm: File Mode, loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.
- Mô hình cây Merkle Tree giúp Git phát hiện sự thay đổi ở bất kỳ nhánh con nào một cách tức thì.
