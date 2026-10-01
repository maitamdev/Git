# Đóng gói Packfiles và nén sai biệt Delta Compression

---

## 🎯 Mục tiêu
- Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).
- Làm chủ cơ chế nén sai biệt Delta Compression: lưu một phiên bản gốc (base) và các bản vi phân chênh lệch nhỏ.
- Hiểu vai trò của cặp tệp `.pack` (dữ liệu nén) và `.idx` (bảng chỉ mục tìm kiếm nhanh).
- Sử dụng các lệnh kiểm tra và tạo gói: `git verify-pack` và `git gc`.

---

## 🧩 Từ khóa hôm nay

### Packfiles (.pack & .idx)
- **Nói dễ hiểu**: Cơ chế đóng gói gộp hàng ngàn đối tượng rời rạc thành một tệp nhị phân duy nhất (`.pack`) kèm theo tệp chỉ mục tìm kiếm (`.idx`).
- **Ví dụ**: Khi bạn clone một repo từ GitHub, Git nén toàn bộ lịch sử thành 1 packfile tải về máy trong vài giây.
- **Đừng nhầm**: Không làm thay đổi mã băm SHA-1 của đối tượng; mã SHA-1 vẫn giữ nguyên 100% dù đối tượng ở dạng loose hay packed.

### Delta Compression
- **Nói dễ hiểu**: Thuật toán nén thông minh chỉ lưu lại phần chênh lệch (diff vi phân) giữa các phiên bản của cùng một tệp thay vì lưu nguyên vẹn toàn bộ tệp nhiều lần.
- **Ví dụ**: File 10MB sửa 1 dòng sẽ sinh ra bản delta chỉ nặng 200 byte thay vì tốn thêm 10MB nữa.
- **Đừng nhầm**: Git không nén delta ngay khi commit; quá trình commit ban đầu tạo loose object, chỉ khi chạy `git gc` hoặc khi push/pull qua mạng thì delta compression mới được kích hoạt.

### Base vs Delta Objects
- **Nói dễ hiểu**: Base Object là phiên bản đầy đủ trọn vẹn, còn Delta Object là chuỗi các chỉ dẫn sửa đổi dựa trên Base Object đó.
- **Ví dụ**: Git chọn phiên bản MỚI NHẤT làm Base Object để khi checkout ra code hiện tại nhanh nhất, còn các bản cũ được lưu làm delta.
- **Đừng nhầm**: Không lưu bản cổ xưa nhất làm Base; Git luôn ưu tiên tốc độ cho phiên bản mới nhất đang sử dụng hàng ngày.

---

## 📖 Định nghĩa
Ban đầu, Git lưu trữ mỗi đối tượng dưới dạng một tệp nén zlib riêng rẽ trong thư mục `.git/objects/` (gọi là Loose Objects). Tuy nhiên, nếu bạn chỉnh sửa một tệp 10 MB cả trăm lần, việc lưu 100 tệp 10 MB sẽ chiếm 1 GB ổ đĩa. Để giải quyết vấn đề này, Git áp dụng cơ chế đóng gói Packfiles (`.pack`) đi kèm tệp chỉ mục (`.idx`). Trong Packfile, Git sử dụng thuật toán Nén sai biệt (Delta Compression): nó chọn phiên bản mới nhất làm gốc (Base Object), sau đó chỉ lưu phần chênh lệch (Delta) của các phiên bản cũ hơn.

---

## 💡 Tại sao cần
Cơ chế đóng gói Packfile chính là lý do cốt lõi tại sao Git có thể truyền tải toàn bộ lịch sử 15 năm của Linux Kernel với hàng triệu commit qua mạng Internet một cách thần tốc. Thay vì truyền hàng triệu tệp tin nhỏ lẻ qua giao thức mạng gây nghẽn I/O, Git đóng gói tất cả vào một tệp Packfile duy nhất nén cực chặt, giúp giảm dung lượng kho lưu trữ từ vài gigabyte xuống chỉ còn vài chục megabyte mà không làm mất đi bất kỳ bit dữ liệu nào.

---

## 🧠 Mental Model
Hãy tưởng tượng bạn đang lưu trữ 100 bản dự thảo của một bộ hợp đồng pháp lý dài 50 trang. Thay vì in ra 100 tập tài liệu dày cộp riêng lẻ (Loose Objects), bạn in tập hợp đồng hoàn chỉnh mới nhất (Base Object). Đối với 99 bản nháp cũ trước đó, bạn chỉ kẹp một mẩu giấy nhỏ ghi chú rõ ràng: "Bản nháp 2 chỉ khác bản mới nhất ở dòng số 15 thay chữ A bằng chữ B" (Delta). Toàn bộ 100 phiên bản hợp đồng được đóng gói gọn gàng vào duy nhất một chiếc vali xách tay an toàn (Packfile).

---

## 📊 Sơ đồ minh họa
```text
Chuyển đổi từ Loose Objects sang Packfile với Delta Compression:
Trước khi đóng gói (Loose Objects):
[Blob v1: 10 MB]   [Blob v2: 10 MB]   [Blob v3: 10 MB] ──► Tổng: 30 MB đĩa

Sau khi đóng gói (Packfile + Delta Compression):
┌────────────────────────────────────────────────────────┐
│ PACKFILE (.git/objects/pack/pack-xxx.pack)              │
│ - Blob v3 (Base): [10 MB dữ liệu hoàn chỉnh mới nhất]   │
│ - Blob v2 (Delta): [15 KB vi phân so với v3]            │
│ - Blob v1 (Delta): [12 KB vi phân so với v2]            │
└────────────────────────────────────────────────────────┘
──► Tổng dung lượng giảm từ 30 MB xuống còn ~10.03 MB! (Giảm gần 70%)
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư kiểm tra một dự án lớn vừa clone từ GitHub về và thấy thư mục `.git/objects/` gần như trống rỗng không có các thư mục con 2 ký tự. Nhìn vào thư mục con `.git/objects/pack/`, kỹ sư thấy một cặp tệp tin: `pack-1a2b3c4d.pack` (nặng 45 MB) và `pack-1a2b3c4d.idx` (nặng 1 MB). Kỹ sư chạy lệnh `git verify-pack -v .git/objects/pack/pack-1a2b3c4d.pack`. Màn hình hiển thị danh sách chi tiết hàng chục nghìn đối tượng được nén chặt, trong đó có những dòng ghi rõ chuỗi phụ thuộc delta: đối tượng A là base, đối tượng B là delta của A với kích thước chỉ 120 bytes. Nhờ Packfile, quá trình clone qua đường truyền mạng diễn ra chỉ trong vài giây.

---

## 💻 Command & Cú pháp
```bash
# Thống kê số lượng loose objects và packed objects
git count-objects -v

# Chủ động đóng gói toàn bộ loose objects thành Packfile
git gc

# Phân tích chi tiết cấu trúc bên trong tệp Packfile
git verify-pack -v .git/objects/pack/*.pack

# Tái đóng gói và dọn dẹp các đối tượng thừa
git repack -a -d --depth=50 --window=50
```

---

## 🔍 Giải thích command
- `git count-objects -v`: Báo cáo số lượng `count` (loose objects), `size-pack` (dung lượng packfile), và `prune-packable`.
- `git gc`: Tiến trình Garbage Collection tự động tối ưu hóa, dọn dẹp reflog hết hạn và nén packfile.
- `git verify-pack -v`: Lệnh plumbing phân tích cấu trúc chuỗi delta và hiển thị đối tượng base cùng offset byte trong tệp `.pack`.
- `git repack -a -d`: Gom tất cả đối tượng vào một gói mới và xóa bỏ các tệp loose cũ đã được đóng gói.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Git lưu Delta xuôi từ quá khứ tới hiện tại**: Trong Packfile, Git lưu phiên bản MỚI NHẤT làm Base và lưu các phiên bản CŨ dưới dạng Delta để tối ưu hóa tốc độ checkout phiên bản hiện tại.
2. **Tự ý xóa tệp `.idx`**: Tệp index giúp Git tra cứu ngẫu nhiên vị trí byte của đối tượng với độ phức tạp O(log N); nếu mất tệp này, Git phải quét lại từ đầu tệp pack.
3. **Lo sợ Packfile làm đổi mã SHA-1**: Mã SHA-1 được tính trên nội dung giải nén nguyên bản nên hoàn toàn bất biến dù đối tượng ở dạng loose hay packfile.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Chạy lệnh `git count-objects -v` để xem tỷ lệ giữa Loose Objects và Packed Objects trong kho làm việc.
2. **Bước 2**: Chạy lệnh `git gc` để kích hoạt quá trình dọn dẹp và đóng gói kho lưu trữ.
3. **Bước 3**: Chạy lại `git count-objects -v` để chứng kiến chỉ số `count` giảm về 0 và `in-pack` tăng lên.
4. **Bước 4**: Chạy `git verify-pack -v .git/objects/pack/*.pack` để quan sát các dòng hiển thị quan hệ base và delta.

---

## 💡 Hint & mẹo
> Bạn có thể chủ động chuyển toàn bộ loose objects vào packfile bất cứ lúc nào bằng lệnh `git gc` hoặc `git repack -d` để giải phóng dung lượng đĩa và tăng tốc độ đọc của Git.

---

## ✅ Validation & Kết quả mong đợi
- Thư mục `.git/objects/pack/` xuất hiện cặp tệp `.pack` và `.idx`.
- Chỉ số `count` của loose objects trong `git count-objects -v` trở về 0 sau khi hoàn tất đóng gói.

---

## ❓ Quiz nhanh
Hãy kiểm tra kiến thức về cơ chế Packfile và nén sai biệt Delta qua bài trắc nghiệm trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Tại sao Git lại chọn phiên bản mới nhất của tệp tin làm Base Object nguyên bản thay vì chọn phiên bản đầu tiên của tệp tin khi thực hiện Delta Compression? Hãy phân tích sự đánh đổi giữa hiệu năng checkout và hiệu năng xem lịch sử cũ.

---

## 📝 Tổng kết
- Loose Objects lưu tệp nén rời rạc; Packfiles gộp nhiều đối tượng vào một tệp nén tối ưu duy nhất.
- Delta Compression lưu phiên bản mới nhất làm Base và các phiên bản cũ hơn làm bản vi phân chênh lệch nhỏ.
- Tệp `.idx` đóng vai trò là bảng mục lục tra cứu nhanh vị trí byte của từng đối tượng trong tệp `.pack`.
- Nhờ Packfiles, Git có thể truyền tải và đồng bộ hóa các kho mã nguồn khổng lồ qua Internet với tốc độ vượt trội.
