# Giải mã và kiểm tra chi tiết đối tượng với git cat-file

---

## 🎯 Mục tiêu
- Làm chủ lệnh plumbing cứu hộ đa năng: `git cat-file`.
- Sử dụng thành thạo 3 cờ quan sát cốt lõi: `-p` (pretty-print nội dung), `-t` (kiểm tra loại đối tượng), và `-s` (xem kích thước byte).
- Có khả năng kiểm tra object bằng object ID đầy đủ, ref hoặc tiền tố ID ngắn nếu ID đó không mơ hồ.
- Nắm vững cách truyền các symbolic refs như `HEAD` trực tiếp vào lệnh kiểm tra.

---

## 🧩 Từ khóa hôm nay

### git cat-file Command
- **Nói dễ hiểu**: Lệnh plumbing đọc object từ Git database và hiển thị thông tin hoặc nội dung đã giải nén.
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
`git cat-file` đọc object từ object database. Loose object được nén riêng; nhiều object khác có thể nằm trong packfile. Lệnh xử lý cách lưu trữ đó và cho phép xem loại (`-t`), kích thước nội dung (`-s`) hoặc nội dung (`-p`). Bạn có thể đưa vào object ID, ref hoặc revision expression hợp lệ; tiền tố rút gọn chỉ dùng được khi không mơ hồ.

---

## 💡 Tại sao cần
Khi cần tìm hiểu một commit chứa gì, `git cat-file` cho phép đọc object mà không chuyển nhánh hay sửa working tree. Bạn có thể xem commit trỏ tới tree nào, tree chứa entry gì, hoặc blob có nội dung nào. Một số lệnh khác như `git show` cũng trình bày dữ liệu lịch sử ở dạng thân thiện hơn.

---

## 🧠 Mental Model
Hãy tưởng tượng các đối tượng trong `.git/objects/` như những viên thuốc con nhộng được niêm phong kín. `git cat-file` chính là chiếc máy quét y tế: cờ `-t` giống như máy quét nhiệt cho biết đây là viên thuốc loại gì (blob, tree hay commit); cờ `-s` là chiếc cân điện tử siêu nhỏ đo khối lượng viên thuốc; và cờ `-p` là chiếc máy soi laser mở nắp con nhộng để bạn nhìn thấy toàn bộ các hạt vi chất bên trong.

---

## 📊 Sơ đồ minh họa
```text
Ba chế độ kiểm tra của git cat-file:
Đối tượng: <object-id>
               │
               ├─ git cat-file -t <object-id> ──► loại (blob/tree/commit/tag)
               ├─ git cat-file -s <object-id> ──► kích thước payload theo byte
               └─ git cat-file -p <object-id> ──► nội dung theo dạng phù hợp với loại
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư nhận được thông báo lỗi từ đồng nghiệp rằng commit mới nhất bị mất một tệp tin cấu hình quan trọng. Thay vì chuyển nhánh hay reset lung tung làm xáo trộn code, kỹ sư mở terminal và chạy lệnh `git cat-file -p HEAD`. Nhìn vào dòng đầu tiên, kỹ sư thấy mã băm Tree là `e2a4b6`. Kỹ sư tiếp tục chạy `git cat-file -p e2a4b6` để kiểm tra danh mục cây thư mục gốc. Kết quả cho thấy tệp tin cấu hình `config.json` hoàn toàn không có mặt trong danh sách bản ghi của Tree. Kỹ sư kết luận ngay lập tức rằng đồng nghiệp đã quên gõ lệnh `git add` trước khi commit. Việc chẩn đoán diễn ra trong 10 giây mà không cần mở bất kỳ tệp nào trên đĩa.

---

## 💻 Command & Cú pháp
```bash
# Xem nội dung định dạng đẹp của đối tượng
git cat-file -p 'HEAD^{tree}'

# Kiểm tra loại đối tượng (blob, tree, commit, tag)
git cat-file -t HEAD

# Xem kích thước byte nguyên bản của đối tượng
git cat-file -s HEAD

# Kiểm tra trực tiếp cây thư mục của commit
git cat-file -p HEAD^{tree}
```

---

## 🔍 Giải thích command
- `git cat-file -p <object>`: Đọc object và in nội dung phù hợp với loại object; blob nhị phân có thể không đọc được trong terminal.
- `git cat-file -t <hash>`: Đọc byte header và in ra loại đối tượng.
- `git cat-file -s <hash>`: Trả về số byte của nội dung tệp trước khi nén.
- `HEAD^{tree}`: Cú pháp revision mở rộng trỏ trực tiếp tới đối tượng Tree của commit hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng lệnh `cat` của Linux đọc file trong `.git/objects/`**: Gây ra màn hình tràn ngập ký tự nhị phân rác vì tệp đã bị nén zlib.
2. **Truyền nhầm đường dẫn file trên ổ đĩa**: `git cat-file` cần object name hoặc revision expression; để xem file trong commit, dùng biểu thức như `HEAD:path/to/file`.
3. **Nghĩ rằng tiền tố ngắn bất kỳ luôn dùng được**: Tiền tố phải đủ dài để xác định duy nhất một object trong repository; độ dài cần thiết thay đổi theo repo.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Chạy `git rev-parse HEAD` để xem object ID của commit hiện tại.
2. **Bước 2**: Chạy `git cat-file -t HEAD`; kết quả phải là `commit`.
3. **Bước 3**: Chạy `git cat-file -p HEAD` và đọc object ID sau `tree`.
4. **Bước 4**: Chạy `git cat-file -p 'HEAD^{tree}'` để xem tree, rồi `git ls-tree -r HEAD` để chọn một đường dẫn có trong commit.
5. **Bước 5**: Chạy `git cat-file -p HEAD:<path>` với đường dẫn vừa chọn để xem nội dung blob văn bản.

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
- `git cat-file` là công cụ kiểm tra object trong Git Object Store, bất kể chúng được lưu loose hay packed.
- Cờ `-p` in nội dung định dạng đẹp, `-t` in loại đối tượng, `-s` in kích thước byte.
- Hỗ trợ truyền mã băm rút gọn (prefix hash) hoặc các con trỏ tham chiếu như `HEAD`.
- Giúp kỹ sư kiểm tra sâu và điều tra lịch sử mã nguồn ở tầng dữ liệu nhị phân nguyên bản.
