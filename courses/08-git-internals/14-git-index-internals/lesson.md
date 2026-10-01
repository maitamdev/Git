# Cấu trúc tệp nhị phân .git/index (Staging Area Internals)

---

## 🎯 Mục tiêu
- Giải phẫu cấu trúc nhị phân của tệp `.git/index` (DIRC - Directory Cache).
- Hiểu rõ các trường dữ liệu được lưu cho mỗi tệp: ctime, mtime, file size, permissions, SHA-1, và đường dẫn tệp.
- Sử dụng lệnh plumbing `git ls-files --stage` để xem bảng thông tin Staging Area nội bộ.
- Nắm vững ý nghĩa của các Stage Number (0, 1, 2, 3) trong quá trình giải quyết xung đột 3-way merge.

---

## 🧩 Từ khóa hôm nay

### Directory Cache (.git/index)
- **Nói dễ hiểu**: Tệp nhị phân duy nhất đại diện cho Staging Area, đóng vai trò bản nháp bộ nhớ đệm trung gian trước khi commit.
- **Ví dụ**: Khi gõ `git add file.txt`, Git ghi đường dẫn `file.txt` cùng mã blob vào tệp `.git/index`.
- **Đừng nhầm**: Không phải là một thư mục chứa các bản copy vật lý; nó chỉ là danh bạ nhị phân lưu trữ các con trỏ trỏ tới Blobs.

### Stage Numbers (0, 1, 2, 3)
- **Nói dễ hiểu**: Chỉ số phân đoạn trong index: `0` là trạng thái bình thường; `1` là bản gốc tổ tiên (base), `2` là bản của ta (ours), `3` là bản của đối phương (theirs) khi có xung đột.
- **Ví dụ**: Khi gặp merge conflict, `git ls-files -u` hiển thị cùng lúc 3 stage 1, 2, 3 cho tệp bị xung đột.
- **Đừng nhầm**: Sau khi sửa xong xung đột và gõ `git add`, cả 3 stage sẽ được thu về một stage 0 duy nhất.

### Stat Cache Optimization
- **Nói dễ hiểu**: Cơ chế lưu lại mtime (giờ sửa đổi) và size tệp tin trực tiếp từ hệ điều hành để nhận diện thay đổi trong tích tắc.
- **Ví dụ**: Lệnh `git status` chỉ cần so sánh tem mtime của file trên đĩa với số mtime lưu trong index mà không cần đọc lại toàn bộ nội dung.
- **Đừng nhầm**: Nếu bạn chạm vào file bằng lệnh `touch` (đổi mtime) mà không đổi nội dung, Git sẽ băm lại nội dung để xác minh trước khi báo modified.

---

## 📖 Định nghĩa
Tệp `.git/index` là một tệp nhị phân phức tạp và có hiệu năng cao bậc nhất trong Git, đại diện cho Staging Area (hay còn gọi là Cache hoặc Dircache). Nó đóng vai trò là bản nháp trung gian chuẩn bị cho commit tiếp theo. Cấu trúc nhị phân của tệp index bắt đầu bằng 4 byte chữ ký "DIRC", phiên bản, số lượng mục (entries), và danh sách các tệp được theo dõi. Mỗi mục lưu giữ đầy đủ thông số tem thời gian của hệ điều hành (stat cache), quyền hạn tệp, mã băm SHA-1 của Blob tương ứng, số thứ tự phân đoạn (stage number dùng cho xử lý merge conflict), và đường dẫn tệp.

---

## 💡 Tại sao cần
Tại sao lệnh `git status` có thể quét hàng trăm nghìn tệp tin trong dự án lớn chỉ trong tích tắc nửa giây? Bí quyết nằm ở tệp `.git/index`. Bằng cách lưu lại thông số `mtime` (thời điểm chỉnh sửa tệp) và kích thước tệp trực tiếp từ hệ điều hành, Git chỉ cần gọi hàm hệ thống nhanh `stat()` để so sánh tem thời gian. Nếu tem thời gian không đổi, Git biết chắc 100% nội dung tệp chưa hề bị sửa mà không cần tốn công đọc nội dung tệp từ đĩa.

---

## 🧠 Mental Model
Hãy tưởng tượng tệp `.git/index` như danh sách kiểm kê hàng hóa xuất kho của một nhân viên bưu điện. Trong danh sách có ghi rõ: Tên gói hàng (`path`), Trọng lượng và giờ niêm phong (`stat cache`), Mã vạch nhận diện kiện hàng (`blob hash`), và Cột đánh dấu kiểm định (`stage`). Nhân viên bưu điện chỉ cần nhìn lướt qua danh sách đối chiếu với các gói hàng trên bàn để biết gói nào đã bị bóc tem sửa đổi mà không cần mở từng hộp ra kiểm tra.

---

## 📊 Sơ đồ minh họa
```text
Cấu trúc nhị phân của tệp .git/index:
┌────────────────────────────────────────────────────────┐
│ HEADER: "DIRC" (4 bytes) | Version (4B) | Entries (4B) │
├────────────────────────────────────────────────────────┤
│ ENTRY 1:                                               │
│ - ctime / mtime (Tem thời gian hệ điều hành)          │
│ - file size (Kích thước byte trên đĩa)                │
│ - mode: 100644 (Quyền tệp tin)                         │
│ - sha1: e69de29bb2d1 (Mã băm trỏ tới Blob)            │
│ - stage: 0 (Normal) | 1 (Base) | 2 (Ours) | 3 (Theirs) │
│ - path: "src/app.ts" (Đường dẫn tệp)                   │
├────────────────────────────────────────────────────────┤
│ ENTRY 2: [mode, sha1, path]                            │
└────────────────────────────────────────────────────────┘
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư muốn xem những gì thực sự đang nằm trong Staging Area sau khi gõ `git add`. Kỹ sư chạy lệnh plumbing: `git ls-files --stage`. Màn hình hiển thị danh sách chi tiết: `100644 e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 0 README.md` và `100644 3b18e512db79e4c8300de074a1e281301f6181f0 0 src/index.ts`. Kỹ sư nhận thấy số `0` ở giữa chính là stage number (biểu thị tệp ở trạng thái bình thường, không xung đột). Khi xảy ra xung đột merge conflict, lệnh này sẽ hiển thị 3 dòng cho cùng một tệp ứng với stage 1 (base), stage 2 (ours), và stage 3 (theirs). Hiểu được tệp index giúp kỹ sư giải quyết xung đột ở tầng bản chất nhất.

---

## 💻 Command & Cú pháp
```bash
# Xem danh sách toàn bộ các mục trong Index kèm Stage Number
git ls-files --stage

# Chỉ xem các tệp tin đang bị xung đột merge (stage 1, 2, 3)
git ls-files --unmerged

# Kiểm tra trực tiếp trạng thái index với định dạng porcelain v2
git status --porcelain=v2

# Cập nhật trực tiếp tệp vào index bằng lệnh plumbing
git update-index --add sample.txt
```

---

## 🔍 Giải thích command
- `git ls-files --stage`: In ra bảng dữ liệu nội bộ của index gồm mode, sha-1, stage number và path.
- `git ls-files --unmerged`: Bộ lọc tiện lợi chỉ hiển thị các tệp đang có stage khác 0 khi bị conflict.
- `git status --porcelain=v2`: Định dạng đầu ra ổn định cho script phân tích cú pháp trạng thái index.
- `git update-index --add`: Thao tác trực tiếp với Staging Area mà không cần qua lệnh bề mặt `git add`.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Staging Area là một thư mục ảo**: Thực chất chỉ là một tệp nhị phân duy nhất `.git/index` chứa danh sách con trỏ trỏ tới Blob.
2. **Không hiểu ý nghĩa Stage Number**: Dẫn đến lúng túng khi xử lý xung đột 3-way merge ở mức độ sâu.
3. **Nghĩ rằng `git add` chỉ là đánh dấu nhãn**: Lệnh `git add` thực tế đã tạo ngay đối tượng Blob mới nén zlib vào `.git/objects/` tại thời điểm bạn gõ lệnh.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một tệp mới `hello.txt` và thêm vào Staging Area bằng lệnh `git add hello.txt`.
2. **Bước 2**: Sử dụng lệnh plumbing `git ls-files --stage` để kiểm tra bảng dữ liệu nội bộ của Index.
3. **Bước 3**: Quan sát 4 cột dữ liệu: File Mode (`100644`), Blob SHA-1, Stage Number (`0`), và Đường dẫn tệp.
4. **Bước 4**: Dùng lệnh `git cat-file -p <mã_sha_ở_cột_2>` để xác minh Blob đã được ghi vào database ngay khi `git add`.

---

## 💡 Hint & mẹo
> Số `0` trong đầu ra của `git ls-files --stage` biểu thị tệp tin không có xung đột; trong khi các số 1, 2, 3 xuất hiện khi đang giải quyết merge conflict.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git ls-files --stage` hiển thị chính xác tệp tin với stage number là `0`.
- Đối tượng Blob tương ứng xuất hiện ngay trong thư mục `.git/objects/` ngay cả khi bạn chưa hề gõ lệnh `git commit`.

---

## ❓ Quiz nhanh
Cùng làm bài trắc nghiệm về kiến trúc nhị phân và hoạt động của tệp .git/index trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào mà thông số stat cache bên trong tệp `.git/index` giúp Git tối ưu hóa tốc độ của lệnh `git status` khi làm việc với các kho mã nguồn khổng lồ như Linux Kernel?

---

## 📝 Tổng kết
- Tệp `.git/index` là tệp nhị phân Directory Cache đại diện cho Staging Area.
- Lưu trữ stat cache (mtime, size), quyền hạn tệp, mã băm Blob và stage number.
- Sử dụng `git ls-files --stage` để xem chi tiết các mục đang nằm trong Index.
- Quá trình `git add` thực sự tạo Blob trong database và ghi nhận thông tin vào file `.git/index`.
