# Cấu trúc tệp nhị phân .git/index (Staging Area Internals)

---

## 🎯 Mục tiêu
- Giải phẫu cấu trúc nhị phân của tệp `.git/index` (DIRC - Directory Cache).
- Nhận biết các trường thường có trong index: metadata của tệp, object ID, stage và đường dẫn.
- Sử dụng lệnh plumbing `git ls-files --stage` để xem bảng thông tin Staging Area nội bộ.
- Nắm vững ý nghĩa của các Stage Number (0, 1, 2, 3) trong quá trình giải quyết xung đột 3-way merge.

---

## 🧩 Từ khóa hôm nay

### Git index (Staging Area)
- **Nói dễ hiểu**: Bản ghi nhị phân Git dùng để biết nội dung nào sẽ đi vào commit kế tiếp.
- **Ví dụ**: `git add file.txt` cập nhật đường dẫn và object ID trong index.
- **Đừng nhầm**: `.git/index` là vị trí thông thường; Git directory có thể nằm nơi khác, index có thể dùng split-index, và index không lưu nguyên bản nội dung tệp.

### Stage Numbers (0, 1, 2, 3)
- **Nói dễ hiểu**: Chỉ số phân đoạn trong index: `0` là trạng thái bình thường; `1` là bản gốc tổ tiên (base), `2` là bản của ta (ours), `3` là bản của đối phương (theirs) khi có xung đột.
- **Ví dụ**: Khi gặp merge conflict, `git ls-files -u` hiển thị cùng lúc 3 stage 1, 2, 3 cho tệp bị xung đột.
- **Đừng nhầm**: Sau khi sửa xong xung đột và gõ `git add`, cả 3 stage sẽ được thu về một stage 0 duy nhất.

### Stat cache
- **Nói dễ hiểu**: Index lưu một số metadata như thời gian sửa và kích thước để Git kiểm tra tệp nhanh hơn.
- **Ví dụ**: `git status` dùng metadata để nhận ra nhiều tệp không đổi mà không phải đọc lại nội dung từng tệp.
- **Đừng nhầm**: Đây là cách tối ưu, không phải bằng chứng tuyệt đối. Git có thể đọc và so sánh nội dung khi metadata thay đổi hoặc không đủ tin cậy.

---

## 📖 Định nghĩa
Git index (còn gọi là Staging Area hoặc dircache) là bản ghi nhị phân dùng để chuẩn bị nội dung cho commit kế tiếp. Trong cấu trúc index phổ biến, phần đầu có chữ ký `DIRC`, số phiên bản và số mục; sau đó là các mục cùng phần mở rộng. Một mục thường ghi metadata của tệp, mode, object ID theo định dạng hash của repository, stage và đường dẫn. Git thường lưu index ở `.git/index`, nhưng vị trí Git directory có thể khác và split-index có thể lưu phần lớn mục ở tệp dùng chung riêng.

---

## 💡 Tại sao cần
`git status` cần so sánh index với working tree và commit hiện tại. Metadata như thời gian sửa, kích thước và inode giúp Git bỏ qua nhiều lần đọc tệp không cần thiết. Nếu metadata báo có thay đổi, hoặc Git không thể tin chắc dữ liệu cache (ví dụ có thể gặp tình huống racy timestamp), Git có thể kiểm tra nội dung để xác định trạng thái. Vì vậy stat cache giúp tăng tốc nhưng không bảo đảm rằng chỉ nhìn thời gian là luôn đủ.

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
│ - object ID: (độ dài tùy hash format của repo)        │
│ - stage: 0 (Normal) | 1 (Base) | 2 (Ours) | 3 (Theirs) │
│ - path: "src/app.ts" (Đường dẫn tệp)                   │
├────────────────────────────────────────────────────────┤
│ ENTRY 2: [mode, object ID, stage, path]                │
└────────────────────────────────────────────────────────┘
```

---

## 🏢 Ví dụ thực tế
Sau khi chạy `git add`, người học dùng `git ls-files --stage` để xem các mục trong index. Mỗi dòng thường có dạng `100644 <object-id> 0 README.md`: mode, object ID, stage và đường dẫn. Stage `0` là mục bình thường. Trong một số xung đột, cùng đường dẫn có thể có các mục stage `1` (base), `2` (ours) và `3` (theirs). Độ dài object ID tùy định dạng hash của repository.

---

## 💻 Command & Cú pháp
```bash
# Xem danh sách toàn bộ các mục trong Index kèm Stage Number
git ls-files --stage

# Chỉ xem các tệp tin đang bị xung đột merge (stage 1, 2, 3)
git ls-files --unmerged

# Kiểm tra trực tiếp trạng thái index với định dạng porcelain v2
git status --porcelain=v2

# Xem đường dẫn Git dùng cho index trong repository hiện tại
git rev-parse --git-path index
```

---

## 🔍 Giải thích command
- `git ls-files --stage`: In ra các mục trong index gồm mode, object ID, stage number và path.
- `git ls-files --unmerged`: Bộ lọc tiện lợi chỉ hiển thị các tệp đang có stage khác 0 khi bị conflict.
- `git status --porcelain=v2`: Định dạng đầu ra ổn định cho script phân tích cú pháp trạng thái index.
- `git rev-parse --git-path index`: Trả về đường dẫn index thực tế mà repository này sử dụng.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ mọi repository luôn có một tệp index ở đúng `.git/index`**: Đây là vị trí thường gặp, nhưng linked worktree và split-index có thể dùng vị trí hoặc cấu trúc khác.
2. **Không hiểu ý nghĩa Stage Number**: Dẫn đến lúng túng khi xử lý xung đột 3-way merge ở mức độ sâu.
3. **Nghĩ mỗi lần `git add` luôn tạo một tệp Blob mới**: Git lưu object theo nội dung; nội dung đã có có thể được dùng lại và object có thể được lưu loose hoặc trong pack.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một tệp mới `hello.txt` và thêm vào Staging Area bằng lệnh `git add hello.txt`.
2. **Bước 2**: Sử dụng lệnh plumbing `git ls-files --stage` để kiểm tra bảng dữ liệu nội bộ của Index.
3. **Bước 3**: Quan sát mode, object ID, stage (`0`) và đường dẫn. Object ID có thể dài khác nhau tùy repository.
4. **Bước 4**: Dùng `git cat-file -p <object-id>` với ID ở cột thứ hai để đọc nội dung đã được đưa vào index.

---

## 💡 Hint & mẹo
> Số `0` trong đầu ra của `git ls-files --stage` biểu thị tệp tin không có xung đột; trong khi các số 1, 2, 3 xuất hiện khi đang giải quyết merge conflict.

---

## ✅ Validation & Kết quả mong đợi
- `git ls-files --stage` hiển thị tệp với stage `0`.
- `git cat-file -p <object-id>` in nội dung đã stage; không cần tìm tệp vật lý trong `.git/objects/` vì object có thể đã được pack.

---

## ❓ Quiz nhanh
Cùng làm bài trắc nghiệm về kiến trúc nhị phân và hoạt động của tệp .git/index trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào mà thông số stat cache bên trong tệp `.git/index` giúp Git tối ưu hóa tốc độ của lệnh `git status` khi làm việc với các kho mã nguồn khổng lồ như Linux Kernel?

---

## 📝 Tổng kết
- Git index là bản ghi nhị phân đại diện cho Staging Area; `.git/index` là vị trí phổ biến nhưng không phải giả định an toàn cho mọi repository.
- Các mục chứa stat cache, mode, object ID, stage và đường dẫn; metadata giúp tăng tốc nhưng không thay thế mọi lần kiểm tra nội dung.
- Sử dụng `git ls-files --stage` để xem chi tiết các mục đang nằm trong Index.
- `git add` cập nhật index và bảo đảm nội dung được Git nhận diện; cùng nội dung có thể dùng chung object.
