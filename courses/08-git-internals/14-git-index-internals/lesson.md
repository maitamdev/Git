# Cấu trúc tệp nhị phân .git/index (Staging Area Internals)

---

## 🎯 Mục tiêu bài học
- Giải phẫu cấu trúc nhị phân của tệp .git/index (DIRC - Directory Cache).
- Hiểu rõ các trường dữ liệu được lưu cho mỗi tệp: ctime, mtime, file size, permissions, SHA-1, và đường dẫn tệp.
- Sử dụng lệnh plumbing git ls-files --stage để xem bảng thông tin Staging Area nội bộ.

---

## 📖 Định nghĩa
> Tệp .git/index là một tệp nhị phân phức tạp và có hiệu năng cao bậc nhất trong Git, đại diện cho Staging Area (hay còn gọi là Cache hoặc Dircache). Nó đóng vai trò là bản nháp trung gian chuẩn bị cho commit tiếp theo. Cấu trúc nhị phân của tệp index bắt đầu bằng 4 byte chữ ký "DIRC", phiên bản, số lượng mục (entries), và danh sách các tệp được theo dõi. Mỗi mục lưu giữ đầy đủ thông số tem thời gian của hệ điều hành (stat cache), quyền hạn tệp, mã băm SHA-1 của Blob tương ứng, số thứ tự phân đoạn (stage number dùng cho xử lý merge conflict), và đường dẫn tệp.

---

## 🤔 Tại sao cần?
Tại sao lệnh `git status` có thể quét hàng trăm nghìn tệp tin trong dự án lớn chỉ trong tích tắc nửa giây? Bí quyết nằm ở tệp `.git/index`. Bằng cách lưu lại thông số `mtime` (thời điểm chỉnh sửa tệp) và kích thước tệp trực tiếp từ hệ điều hành, Git chỉ cần gọi hàm hệ thống nhanh `stat()` để so sánh tem thời gian. Nếu tem thời gian không đổi, Git biết chắc 100% nội dung tệp chưa hề bị sửa mà không cần tốn công đọc nội dung tệp từ đĩa.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng tệp `.git/index` như danh sách kiểm kê hàng hóa xuất kho của một nhân viên bưu điện. Trong danh sách có ghi rõ: Tên gói hàng (`path`), Trọng lượng và giờ niêm phong (`stat cache`), Mã vạch nhận diện kiện hàng (`blob hash`), và Cột đánh dấu kiểm định (`stage`). Nhân viên bưu điện chỉ cần nhìn lướt qua danh sách đối chiếu với các gói hàng trên bàn để biết gói nào đã bị bóc tem sửa đổi mà không cần mở từng hộp ra kiểm tra.

---

## 🖼️ Sơ đồ minh họa
```text
Cấu trúc nhị phân của tệp .git/index:
┌────────────────────────────────────────────────────────┐
│ HEADER: "DIRC" (4 bytes) | Version (4B) | Entries (4B) │
├────────────────────────────────────────────────────────┤
│ ENTRY 1:                                               │
│ • ctime / mtime (Tem thời gian hệ điều hành)          │
│ • file size (Kích thước byte trên đĩa)                │
│ • mode: 100644 (Quyền tệp tin)                         │
│ • sha1: e69de29bb2d1 (Mã băm trỏ tới Blob)            │
│ • stage: 0 (Normal) | 1 (Base) | 2 (Ours) | 3 (Theirs) │
│ • path: "src/app.ts" (Đường dẫn tệp)                   │
├────────────────────────────────────────────────────────┤
│ ENTRY 2: [mode, sha1, path]                            │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư muốn xem những gì thực sự đang nằm trong Staging Area sau khi gõ `git add`. Kỹ sư chạy lệnh plumbing: `git ls-files --stage`. Màn hình hiển thị danh sách chi tiết: `100644 e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 0 README.md` và `100644 3b18e512db79e4c8300de074a1e281301f6181f0 0 src/index.ts`. Kỹ sư nhận thấy số `0` ở giữa chính là stage number (biểu thị tệp ở trạng thái bình thường, không xung đột). Khi xảy ra xung đột merge conflict, lệnh này sẽ hiển thị 3 dòng cho cùng một tệp ứng với stage 1 (base), stage 2 (ours), và stage 3 (theirs). Hiểu được tệp index giúp kỹ sư giải quyết xung đột ở tầng bản chất nhất.

---

## 💻 Command & Lệnh thao tác
```bash
git ls-files --stage
git status --porcelain=v2
git update-index
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git ls-files --stage in ra danh sách toàn bộ các mục trong index kèm theo mode, sha-1, stage number và path; git status --porcelain=v2 hiển thị trạng thái máy đọc; và git update-index cho phép thao tác trực tiếp với index.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nghĩ rằng Staging Area là một thư mục ảo chứa các bản sao tệp tin**:  Nó thực chất chỉ là một tệp nhị phân duy nhất `.git/index` chứa các con trỏ trỏ tới Blob.
2. **Không hiểu ý nghĩa của Stage Number (0, 1, 2, 3) dẫn đến lúng túng khi xử lý xung đột hợp nhất ở mức độ sâu.**: 
3. **Sử dụng lệnh `git add` mà không nhận ra rằng nó đã âm thầm tạo Blob mới trong `.git/objects/` ngay tại thời điểm add.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Thêm một tệp mới vào Staging Area bằng lệnh `git add`.
2. Sử dụng lệnh plumbing `git ls-files --stage` để kiểm tra bảng dữ liệu nội bộ của Index.
3. Quan sát 4 cột dữ liệu: File Mode, Blob SHA-1, Stage Number, và Đường dẫn tệp.

---

## 💡 Gợi ý thực hiện (Hint)
> Số `0` trong đầu ra của `git ls-files --stage` biểu thị tệp tin không có xung đột; trong khi các số 1, 2, 3 xuất hiện khi đang giải quyết merge conflict.

---

## ✅ Kiểm tra kết quả (Validation)
Liệt kê và giải thích được ý nghĩa của 4 trường dữ liệu trong đầu ra của git ls-files --stage.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng làm bài trắc nghiệm về kiến trúc nhị phân và hoạt động của tệp .git/index.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào mà thông số stat cache bên trong tệp .git/index giúp Git tối ưu hóa tốc độ của lệnh git status khi làm việc với các kho mã nguồn khổng lồ như Linux Kernel?

---

## 📚 Tổng kết kiến thức
- Tệp `.git/index` là tệp nhị phân Directory Cache đại diện cho Staging Area.
- Lưu trữ stat cache (mtime, size), quyền hạn tệp, mã băm Blob và stage number.
- Sử dụng `git ls-files --stage` để xem chi tiết các mục đang nằm trong Index.
