# Giải mã và kiểm tra chi tiết đối tượng với git cat-file

---

## 🎯 Mục tiêu
- Làm chủ lệnh plumbing cứu hộ đa năng: `git cat-file`.
- Sử dụng thành thạo 3 cờ quan sát cốt lõi: `-p` (pretty-print nội dung), `-t` (kiểm tra loại đối tượng), và `-s` (xem kích thước byte).
- Có khả năng kiểm tra bất kỳ đối tượng nhị phân nào trong `.git/objects/` chỉ bằng tiền tố mã băm (hash prefix).
- Nắm vững cách truyền các symbolic refs như `HEAD` trực tiếp vào lệnh kiểm tra.

---

## 🧩 Từ khóa hôm nay

### git cat-file Command
- **Nói dễ hiểu**: Lệnh plumbing chuyên dụng dùng để giải nén zlib và hiển thị thông tin chi tiết của mọi đối tượng trong Git database.
- **Ví dụ**: Dùng `git cat-file -p HEAD` để xem nội dung văn bản gốc của commit mới nhất.
- **Đừng nhầm**: Không phải lệnh `cat` của Linux; đối tượng Git được nén nhị phân nên lệnh `cat` thông thường sẽ in ra ký tự rác.

### Pretty-Print Flag (-p)
- **Nói dễ hiểu**: Tùy chọn yêu cầu Git tự động nhận diện loại đối tượng và định dạng đầu ra thân thiện nhất với mắt người đọc.
- **Ví dụ**: Nếu là blob in ra text, nếu là tree in ra bảng danh mục tệp, nếu là commit in ra thông tin tác giả và message.
- **Đừng nhầm**: Không làm thay đổi dữ liệu của tệp; chỉ hiển thị dữ liệu đã giải nén ra màn hình terminal.

### Object Inspection Flags (-t, -s)
- **Nói dễ hiểu**: Cặp cờ tra cứu nhanh siêu dữ liệu: `-t` (type) cho biết kiểu đối tượng và `-s` (size) cho biết kích thước byte trước khi nén.
- **Ví dụ**: Chạy `git cat-file -t e69de2` in ra chữ `blob`, chạy `git cat-file -s e69de2` in ra số `0`.
- **Đừng nhầm**: Kích thước trả về bởi `-s` là kích thước dữ liệu gốc, không phải kích thước tệp nén trên ổ đĩa.

---

## 📖 Định nghĩa
`git cat-file` là con dao pha của các chuyên gia Git Internals. Vì mọi đối tượng trong thư mục `.git/objects/` đều bị nén bằng thuật toán zlib, bạn không thể sử dụng các lệnh đọc văn bản thông thường như `cat` hay notepad để xem nội dung của chúng. Lệnh `git cat-file` nhận mã băm SHA-1 của một đối tượng, tự động giải nén, phân tích cú pháp tiêu đề và hiển thị thông tin chi tiết ra màn hình tùy theo các cờ tùy chọn được cung cấp.

---

## 💡 Tại sao cần
Khi hệ thống Git gặp sự cố hỏng tệp hoặc khi bạn cần điều tra lịch sử ở mức độ pháp y kỹ thuật số (digital forensics), `git cat-file` là công cụ duy nhất cho phép bạn "chụp X-quang" bên trong cơ sở dữ liệu đối tượng. Bạn có thể xem chính xác một Commit trỏ tới Tree nào, một Tree chứa những tệp gì, hoặc một Blob chứa nội dung thô ra sao mà không làm thay đổi trạng thái của Working Directory.

---

## 🧠 Mental Model
Hãy tưởng tượng các đối tượng trong `.git/objects/` như những viên thuốc con nhộng được niêm phong kín. `git cat-file` chính là chiếc máy quét y tế: cờ `-t` giống như máy quét nhiệt cho biết đây là viên thuốc loại gì (blob, tree hay commit); cờ `-s` là chiếc cân điện tử siêu nhỏ đo khối lượng viên thuốc; và cờ `-p` là chiếc máy soi laser mở nắp con nhộng để bạn nhìn thấy toàn bộ các hạt vi chất bên trong.

---

## 📊 Sơ đồ minh họa
```text
Ba chế độ kiểm tra của git cat-file:
Đối tượng: .git/objects/4b/825dc642cb6eb9a060e54bf8d69288fbee4904
               │
               ├─ git cat-file -t 4b825d ──► "tree"     (Loại đối tượng)
               ├─ git cat-file -s 4b825d ──► "182"      (Kích thước byte)
               └─ git cat-file -p 4b825d ──► Hiển thị nội dung định dạng đẹp
                                             100644 blob e69de2 README.md
                                             040000 tree 8a7b6c src
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư nhận được thông báo lỗi từ đồng nghiệp rằng commit mới nhất bị mất một tệp tin cấu hình quan trọng. Thay vì chuyển nhánh hay reset lung tung làm xáo trộn code, kỹ sư mở terminal và chạy lệnh `git cat-file -p HEAD`. Nhìn vào dòng đầu tiên, kỹ sư thấy mã băm Tree là `e2a4b6`. Kỹ sư tiếp tục chạy `git cat-file -p e2a4b6` để kiểm tra danh mục cây thư mục gốc. Kết quả cho thấy tệp tin cấu hình `config.json` hoàn toàn không có mặt trong danh sách bản ghi của Tree. Kỹ sư kết luận ngay lập tức rằng đồng nghiệp đã quên gõ lệnh `git add` trước khi commit. Việc chẩn đoán diễn ra trong 10 giây mà không cần mở bất kỳ tệp nào trên đĩa.

---

## 💻 Command & Cú pháp
```bash
# Xem nội dung định dạng đẹp của đối tượng
git cat-file -p 4b825dc642

# Kiểm tra loại đối tượng (blob, tree, commit, tag)
git cat-file -t HEAD

# Xem kích thước byte nguyên bản của đối tượng
git cat-file -s HEAD

# Kiểm tra trực tiếp cây thư mục của commit
git cat-file -p HEAD^{tree}
```

---

## 🔍 Giải thích command
- `git cat-file -p <hash>`: Giải nén zlib và in dữ liệu ra terminal ở định dạng dễ đọc nhất.
- `git cat-file -t <hash>`: Đọc byte header và in ra loại đối tượng.
- `git cat-file -s <hash>`: Trả về số byte của nội dung tệp trước khi nén.
- `HEAD^{tree}`: Cú pháp revision mở rộng trỏ trực tiếp tới đối tượng Tree của commit hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng lệnh `cat` của Linux đọc file trong `.git/objects/`**: Gây ra màn hình tràn ngập ký tự nhị phân rác vì tệp đã bị nén zlib.
2. **Truyền nhầm đường dẫn file thay vì mã băm SHA-1**: `git cat-file` chỉ nhận mã SHA-1 hoặc con trỏ ref (`HEAD`), không nhận đường dẫn tệp trên đĩa.
3. **Nghĩ rằng phải gõ đủ 40 ký tự**: Bạn chỉ cần cung cấp từ 4 đến 7 ký tự đầu tiên miễn là tiền tố đó không bị trùng lặp trong kho lưu trữ.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Lấy mã băm của commit gần nhất bằng lệnh `git rev-parse HEAD`.
2. **Bước 2**: Chạy lệnh `git cat-file -t HEAD` để xác nhận loại đối tượng là `commit`.
3. **Bước 3**: Chạy lệnh `git cat-file -p HEAD` và sao chép mã băm ở dòng `tree`.
4. **Bước 4**: Chạy `git cat-file -p <mã_tree>` để xem danh mục tệp, rồi tiếp tục lấy một mã blob và chạy `git cat-file -p <mã_blob>` để xem nội dung tệp.

---

## 💡 Hint & mẹo
> Bạn có thể truyền trực tiếp con trỏ `HEAD` hoặc tên nhánh vào lệnh `git cat-file` thay vì phải copy-paste mã băm thủ công, ví dụ: `git cat-file -p main` hoặc `git cat-file -p HEAD`.

---

## ✅ Validation & Kết quả mong đợi
- Thao tác thành công chuỗi truy vết: từ Commit -> sang Tree -> sang Blob bằng lệnh `git cat-file -p`.
- Hiểu và đối chiếu được nội dung in ra từ lệnh với các file thực tế trong working directory.

---

## ❓ Quiz nhanh
Hãy kiểm tra khả năng giải mã đối tượng bằng git cat-file qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để sử dụng `git cat-file --batch-check` kết hợp với lệnh shell để quét và thống kê top 5 đối tượng tốn nhiều dung lượng nhất trong kho lưu trữ?

---

## 📝 Tổng kết
- `git cat-file` là công cụ giải nén và kiểm tra nội tạng của các đối tượng trong Git Object Store.
- Cờ `-p` in nội dung định dạng đẹp, `-t` in loại đối tượng, `-s` in kích thước byte.
- Hỗ trợ truyền mã băm rút gọn (prefix hash) hoặc các con trỏ tham chiếu như `HEAD`.
- Giúp kỹ sư kiểm tra sâu và điều tra lịch sử mã nguồn ở tầng dữ liệu nhị phân nguyên bản.
