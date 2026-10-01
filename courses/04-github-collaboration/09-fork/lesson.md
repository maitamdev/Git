# Cơ chế Fork trên GitHub

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất cơ chế Fork trên máy chủ GitHub như một bản sao phía server.
- Phân biệt rõ ràng giữa thao tác Fork (trên GitHub) và thao tác Clone (về máy cá nhân).
- Nắm bắt quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình Fork & Pull Request.
- Quản lý và đồng bộ kho fork cá nhân với kho gốc của dự án.

---

## 🧩 Từ khóa hôm nay

### fork
- **Nói dễ hiểu**: Tạo một repository thuộc tài khoản hoặc tổ chức của bạn, dựa trên repository khác.
- **Ví dụ**: Bấm nút "Fork" trên repo `facebook/react` để có một bản `your-username/react`.
- **Đừng nhầm**: Fork không cấp quyền ghi vào kho gốc; chính sách tổ chức có thể giới hạn việc fork.

### server-side clone
- **Nói dễ hiểu**: Quá trình nhân bản diễn ra hoàn toàn giữa các máy chủ đám mây của GitHub mà không qua máy bạn.
- **Ví dụ**: GitHub sao chép repo gốc sang tài khoản của bạn chỉ trong vài giây trên máy chủ.
- **Đừng nhầm**: Khác với `git clone` vốn tải toàn bộ dữ liệu từ đám mây về ổ đĩa máy tính cá nhân.

### open source contribution
- **Nói dễ hiểu**: Quy trình đóng góp code cho các dự án cộng đồng bằng cách fork, sửa code và gửi Pull Request.
- **Ví dụ**: Sửa một lỗi trong thư viện nguồn mở và gửi PR mời tác giả tích hợp vào dự án chính.
- **Đừng nhầm**: Bạn không cần xin quyền truy cập ghi trực tiếp vào kho của tác giả để bắt đầu đóng góp.

---

## 📖 Định nghĩa
Fork tạo một repository thuộc tài khoản của bạn dựa trên repository gốc. Bạn có quyền làm việc trong fork theo quyền của tài khoản mình, nhưng quyền và cài đặt kho gốc vẫn do chủ sở hữu quản lý. Trên GitHub, các repository trong cùng fork network có thể chia sẻ dữ liệu Git; fork không đồng nghĩa với một bản độc lập hoàn toàn.

---

## 💡 Tại sao cần
Trong các dự án mã nguồn mở, bạn không có quyền push trực tiếp vào kho nguồn vì lý do an toàn. Cơ chế Fork giúp bất kỳ ai cũng có thể tham gia cải tiến mã nguồn, thử nghiệm ý tưởng mới và gửi thành quả lại cho tác giả ban đầu thông qua Pull Request.

---

## 🧠 Mental Model
Hãy hình dung công thức phở gia truyền niêm yết trong tủ kính nhà hàng (dự án gốc). Bạn không thể mở tủ kính lấy bút viết thêm vào công thức. Nhà hàng cho phép bạn chụp lại toàn bộ công thức mang về bếp nhà mình (Fork). Tại bếp nhà, bạn tự do nêm nếm và nếu ngon có thể gửi thư mời bếp trưởng nếm thử (Pull Request).

---

## 📊 Sơ đồ minh họa
```text
Quy trình Fork trên GitHub:
[Kho gốc: upstream] (facebook/react)
        │
        ▼ (Thao tác Fork trên GitHub web)
[Kho cá nhân: origin] (your-account/react)
        │
        ▼ (git clone về máy cá nhân)
[Máy tính của bạn: Local] (lập trình, commit & push lên your-account/react)
```

---

## 🏢 Ví dụ thực tế
Lập trình viên Bình phát hiện lỗi chính tả trong tài liệu của một thư viện nổi tiếng. Vì không có quyền commit trực tiếp, Bình bấm nút "Fork" trên GitHub để tạo bản sao `github.com/binh-dev/famous-lib`. Bình clone kho fork về máy, sửa lỗi, commit rồi push lên fork cá nhân và mở Pull Request gửi về cho ban quản trị dự án phê duyệt.

---

## 💻 Command & Cú pháp
```bash
git clone <url-kho-fork-cua-ban>
git remote -v
git remote add upstream <url-kho-goc>
```

---

## 🔍 Giải thích command
- `git clone <url-kho-fork>`: Tải bản sao từ tài khoản cá nhân của bạn về máy tính để lập trình.
- `git remote -v`: Kiểm tra liên kết remote origin trỏ về kho fork cá nhân.
- `git remote add upstream <url-kho-goc>`: Thiết lập thêm liên kết tới kho gốc của tác giả để đồng bộ các cập nhật mới sau này.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Fork là lệnh trong terminal**: Fork là tính năng trên giao diện nền tảng web như GitHub hoặc GitLab, không phải lệnh CLI.
2. **Clone trực tiếp kho gốc rồi push**: Sẽ bị lỗi `Permission denied` vì bạn không có quyền ghi vào kho của người khác.
3. **Để kho fork bị lỗi thời lâu ngày**: Quên đồng bộ với kho gốc khiến các Pull Request gửi đi sau này dễ bị xung đột phức tạp.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành thao tác fork trên giao diện GitHub và clone về máy cá nhân.
1. Dùng tài khoản GitHub của bạn để mở một repository công khai cho phép fork; nếu nút Fork không có, chính sách kho hoặc tổ chức có thể không cho phép.
2. Tạo fork từ giao diện GitHub và kiểm tra chủ sở hữu/URL của fork.
3. Clone URL của fork vào thư mục riêng trên máy thật; không clone trong terminal mô phỏng của khóa học.
4. Chạy `git remote -v` để kiểm tra `origin` trỏ tới fork của bạn. Fork/clone cần tài khoản hoặc quyền phù hợp với repository.

---

## 💡 Hint & mẹo
> Ghi nhớ quy trình 5 bước: Fork trên web -> Clone về máy -> Code & commit -> Push lên fork -> Mở Pull Request.

---

## ✅ Validation & Kết quả mong đợi
- Repository fork xuất hiện dưới tài khoản của bạn nếu thao tác được phép.
- Kho trên máy tính có remote origin trỏ về kho fork cá nhân.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về cơ chế Fork trên GitHub.

---

## 🚀 Thử thách nâng cao
Khám phá tính năng "Sync fork" ngay trên giao diện web của GitHub để cập nhật các commit mới từ kho gốc về fork cá nhân chỉ với một cú nhấp chuột.

---

## 📝 Tổng kết
- Fork tạo repository mới dựa trên kho gốc trong fork network của GitHub.
- Bạn làm việc trên fork theo quyền của mình; việc đó không tự cấp quyền sửa kho gốc.
- Là nền tảng cốt lõi của quy trình đóng góp mã nguồn mở trên toàn cầu.
