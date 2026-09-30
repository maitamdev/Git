# Đóng gói Packfiles và nén sai biệt Delta Compression

---

## 🎯 Mục tiêu bài học
- Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).
- Làm chủ cơ chế nén sai biệt Delta Compression: lưu một phiên bản gốc (base) và các bản vi phân chênh lệch nhỏ.
- Sử dụng các lệnh kiểm tra và tạo gói: git verify-pack và git pack-objects.

---

## 📖 Định nghĩa
> Ban đầu, Git lưu trữ mỗi đối tượng dưới dạng một tệp nén zlib riêng rẽ trong thư mục .git/objects/ (gọi là Loose Objects). Tuy nhiên, nếu bạn chỉnh sửa một tệp 10 MB cả trăm lần, việc lưu 100 tệp 10 MB sẽ chiếm 1 GB ổ đĩa. Để giải quyết vấn đề này, Git áp dụng cơ chế đóng gói Packfiles (.pack) đi kèm tệp chỉ mục (.idx). Trong Packfile, Git sử dụng thuật toán Nén sai biệt (Delta Compression): nó chọn phiên bản mới nhất làm gốc (Base Object), sau đó chỉ lưu phần chênh lệch (Delta) của các phiên bản cũ hơn.

---

## 🤔 Tại sao cần?
Cơ chế đóng gói Packfile chính là lý do cốt lõi tại sao Git có thể truyền tải toàn bộ lịch sử 15 năm của Linux Kernel với hàng triệu commit qua mạng Internet một cách thần tốc. Thay vì truyền hàng triệu tệp tin nhỏ lẻ qua giao thức mạng gây nghẽn I/O, Git đóng gói tất cả vào một tệp Packfile duy nhất nén cực chặt, giúp giảm dung lượng kho lưu trữ từ vài gigabyte xuống chỉ còn vài chục megabyte mà không làm mất đi bất kỳ bit dữ liệu nào.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng bạn đang lưu trữ 100 bản dự thảo của một bộ hợp đồng pháp lý dài 50 trang. Thay vì in ra 100 tập tài liệu dày cộp riêng lẻ (Loose Objects), bạn in tập hợp đồng hoàn chỉnh mới nhất (Base Object). Đối với 99 bản nháp cũ trước đó, bạn chỉ kẹp một mẩu giấy nhỏ ghi chú rõ ràng: "Bản nháp 2 chỉ khác bản mới nhất ở dòng số 15 thay chữ A bằng chữ B" (Delta). Toàn bộ 100 phiên bản hợp đồng được đóng gói gọn gàng vào duy nhất một chiếc vali xách tay an toàn (Packfile).

---

## 🖼️ Sơ đồ minh họa
```text
Chuyển đổi từ Loose Objects sang Packfile với Delta Compression:
Trước khi đóng gói (Loose Objects):
[Blob v1: 10 MB]   [Blob v2: 10 MB]   [Blob v3: 10 MB] ──► Tổng: 30 MB đĩa

Sau khi đóng gói (Packfile + Delta Compression):
┌────────────────────────────────────────────────────────┐
│ PACKFILE (.git/objects/pack/pack-xxx.pack)              │
│ • Blob v3 (Base): [10 MB dữ liệu hoàn chỉnh mới nhất]   │
│ • Blob v2 (Delta): [15 KB vi phân so với v3]            │
│ • Blob v1 (Delta): [12 KB vi phân so với v2]            │
└────────────────────────────────────────────────────────┘
──► Tổng dung lượng giảm từ 30 MB xuống còn ~10.03 MB! (Giảm gần 70%)
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư kiểm tra một dự án lớn vừa clone từ GitHub về và thấy thư mục `.git/objects/` gần như trống rỗng không có các thư mục con 2 ký tự. Nhìn vào thư mục con `.git/objects/pack/`, kỹ sư thấy một cặp tệp tin: `pack-1a2b3c4d.pack` (nặng 45 MB) và `pack-1a2b3c4d.idx` (nặng 1 MB). Kỹ sư chạy lệnh `git verify-pack -v .git/objects/pack/pack-1a2b3c4d.pack`. Màn hình hiển thị danh sách chi tiết hàng chục nghìn đối tượng được nén chặt, trong đó có những dòng ghi rõ chuỗi phụ thuộc delta: đối tượng A là base, đối tượng B là delta của A với kích thước chỉ 120 bytes. Nhờ Packfile, quá trình clone qua đường truyền mạng diễn ra chỉ trong vài giây.

---

## 💻 Command & Lệnh thao tác
```bash
git verify-pack -v .git/objects/pack/*.pack
git count-objects -v
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git count-objects -v báo cáo chi tiết số lượng loose objects và in-pack objects trong kho lưu trữ, trong khi git verify-pack -v phân tích tường tận cấu trúc bên trong tệp packfile nhị phân, hiển thị danh sách các chuỗi delta và tỷ lệ nén tối ưu.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nghĩ rằng Git lưu Delta xuôi từ quá khứ đến hiện tại**:  Trong Packfile, Git lưu phiên bản MỚI NHẤT làm Base đầy đủ và lưu các phiên bản CŨ dưới dạng Delta để tối ưu hóa tốc độ kiểm xuất phiên bản hiện hành.
2. **Tự ý xóa tệp `.idx` trong thư mục pack**:  Tệp index chỉ mục cho phép Git truy xuất ngẫu nhiên bất kỳ đối tượng nào trong tệp pack nhị phân mà không cần đọc tuần tự từ đầu.
3. **Lo sợ rằng việc đóng gói packfile sẽ làm thay đổi mã băm SHA-1 của đối tượng**:  Mã băm SHA-1 của đối tượng là vĩnh cửu và không bao giờ đổi dù nó nằm ở dạng loose hay pack.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Chạy lệnh `git count-objects -v` để xem tỷ lệ giữa Loose Objects và Packed Objects.
2. Sử dụng lệnh `git verify-pack -v .git/objects/pack/*.pack` (nếu có packfile) để quan sát các dòng phân tích delta.
3. Tìm hiểu cách Git tự động kích hoạt tiến trình đóng gói khi số lượng loose objects vượt ngưỡng.

---

## 💡 Gợi ý thực hiện (Hint)
> Bạn có thể chủ động chuyển toàn bộ loose objects vào packfile bất cứ lúc nào bằng lệnh `git gc` hoặc `git repack -d`.

---

## ✅ Kiểm tra kết quả (Validation)
Nhận diện được đối tượng Base và các đối tượng Delta từ đầu ra của lệnh verify-pack.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kiến thức về cơ chế Packfile và nén sai biệt Delta qua bài trắc nghiệm sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao Git lại chọn phiên bản mới nhất của tệp tin làm Base Object nguyên bản thay vì chọn phiên bản đầu tiên của tệp tin khi thực hiện Delta Compression?

---

## 📚 Tổng kết kiến thức
- Loose Objects lưu tệp nén rời rạc; Packfiles gộp nhiều đối tượng vào một tệp nén tối ưu duy nhất.
- Delta Compression lưu phiên bản mới nhất làm Base và các phiên bản cũ hơn làm bản vi phân chênh lệch nhỏ.
- Tệp `.idx` đóng vai trò là bảng mục lục tra cứu nhanh vị trí byte của từng đối tượng trong tệp `.pack`.
