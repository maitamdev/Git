# Working Directory (Thư mục làm việc): Bàn làm việc của lập trình viên

---

## 🎯 Mục tiêu
- Khám phá vùng đất đầu tiên trong Tam Giác Vàng của Git: Thư mục làm việc (Working Directory).
- Phân loại rạch ròi hai trạng thái căn bản của tệp tin: Tracked (đã vào tầm ngắm) và Untracked (chưa ai quản lý).
- Hình thành phản xạ dùng `git status` để theo dõi những biến động trực tiếp trên bàn làm việc của bạn.

---

## 🧩 Từ khóa hôm nay

### Working Directory — thư mục làm việc
- **Nói dễ hiểu:** Toàn bộ không gian thư mục dự án trên ổ cứng, nơi bạn mở trình soạn thảo, viết code, sửa file và lưu tệp hàng ngày.
- **Ví dụ:** Tệp `index.html` đang mở trong trình soạn thảo để bạn gõ thêm một tiêu đề chính là thuộc thư mục làm việc.
- **Đừng nhầm:** Lưu file ở đây mới chỉ ghi đè lên ổ đĩa của bạn; Git chưa hề đóng gói mốc lịch sử nào cả.

### Tracked — đã được Git theo dõi
- **Nói dễ hiểu:** Những tệp tin đã từng xuất hiện trong mốc commit trước đó, được Git chủ động ghi nhận và canh chừng mọi thay đổi.
- **Ví dụ:** Tệp `README.md` đã có trong dự án từ hôm qua; hôm nay chỉ cần bạn sửa một dấu chấm thì Git cũng phát hiện ra ngay.
- **Đừng nhầm:** Được Git theo dõi không có nghĩa là code bạn vừa gõ đã an toàn trong lịch sử; bạn vẫn phải đóng gói và commit.

### Modified — đã sửa
- **Nói dễ hiểu:** Trạng thái của một tệp Tracked khi nội dung hiện tại trên máy bạn đã khác so với mốc commit gần nhất.
- **Ví dụ:** Bạn sửa màu nền trong file `style.css`; `git status` lập tức đánh dấu file này là Modified.
- **Đừng nhầm:** Modified chỉ là lời cảnh báo có sự biến động dữ liệu; nó hoàn toàn chưa được lưu thành mốc phiên bản mới.

### Untracked — chưa được Git theo dõi
- **Nói dễ hiểu:** Tệp tin hoàn toàn mới vừa được bạn tạo ra trong thư mục nhưng chưa từng được khai báo cho Git quản lý.
- **Ví dụ:** Bạn vừa tạo file `note.txt` để ghi chú; Git xem nó như một người lạ và xếp vào danh sách Untracked.
- **Đừng nhầm:** Untracked không làm mất file của bạn; file vẫn nằm trên ổ cứng, chỉ là cỗ máy Git đang làm ngơ nó đi.

---

## 🤔 Tại sao cần?
Thầy thường dặn các bạn: Trước khi biết cách đóng gói sản phẩm, bạn phải biết bàn làm việc của mình đang bày biện những gì. Trong một ngày làm việc, bạn tạo ra hàng chục file nháp, sửa chữa hàng trăm dòng code. Nếu không hiểu khái niệm Working Directory và trạng thái Tracked hay Untracked, bạn sẽ dễ rơi vào cảnh hoảng loạn tưởng mất file, hoặc tai hại hơn là đưa nhầm file rác vào kho lưu trữ chung của công ty.

---

## 📖 Định nghĩa
Working Directory (còn gọi là Working Tree) là thư mục vật lý chứa mã nguồn dự án trên máy tính nơi bạn trực tiếp thao tác. Git giám sát không gian này và chia tệp thành hai nhóm: Tracked (tệp đã được theo dõi) và Untracked (tệp mới chưa được khai báo với Git).

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy coi Working Directory như chiếc bàn vẽ của kiến trúc sư. Trên bàn có những bản vẽ chính thức đã đăng ký với văn phòng (Tracked), có những nét vẽ bạn vừa tẩy xóa thêm bớt (Modified), và có cả tờ giấy nháp bạn vừa lôi ra ghi chép (Untracked). Bàn vẽ là nơi bạn tự do sáng tạo!

---

## 🖼 Sơ đồ
```text
Thư mục dự án — Working Directory (Bàn làm việc của bạn)
├── README.md   (Đã theo dõi — Đang sửa đổi dở dang: Modified)
├── app.js      (Đã theo dõi — Giữ nguyên như cũ: Unmodified)
└── note.txt    (Tệp mới tạo — Git chưa biết mặt: Untracked)

Lưu ý: "git status" chỉ quan sát bàn làm việc, hoàn toàn không sửa đổi file của bạn.
```

---

## 🌎 Ví dụ thực tế
Bạn tạo `note.txt` để ghi ý tưởng cho dự án. Tệp đã có trong thư mục dù chưa nằm trong lịch sử Git. Chạy `git status` để thấy Git báo tệp mới là Untracked. Lập trình viên luôn kiểm tra kỹ bàn làm việc trước khi quyết định đưa linh kiện nào vào quy trình đóng gói chính thức.

---

## 💻 Command
```bash
git status
```

---

## 🔍 Giải thích command
`git status` là câu lệnh soi chiếu tình trạng của toàn bộ Working Directory. Lệnh này phân loại tệp tin theo màu sắc và đầu mục: tệp nào đang bị sửa đổi (Modified) và tệp nào mới tinh chưa được theo dõi (Untracked), giúp bạn nắm quyền kiểm soát tuyệt đối trước khi ra quyết định tiếp theo.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng tạo file mới trên máy là Git tự động lưu:** File mới tạo luôn ở trạng thái Untracked; nếu bạn không ra lệnh theo dõi thì Git sẽ không bao giờ bảo vệ nó.
2. **Nhầm lẫn giữa lưu file thông thường với tạo commit trong Git:** Lưu file chỉ ghi đè lên ổ cứng vật lý tại Working Directory, hoàn toàn chưa tạo ra điểm phục hồi nào trong lịch sử.
3. **Hoang mang khi thấy file bị đánh dấu trong `git status`:** Thông báo đó chỉ là Git báo cáo trạng thái bình thường của các file đang sửa dở hoặc mới tạo, không phải là lỗi chương trình.

---

## 🧪 Lab
1. Trong bảng tệp của terminal mô phỏng, tạo tệp mới tên `note.txt` và nhập một dòng ghi chú.
2. Chạy `git status`.
3. Tìm `note.txt` dưới mục Untracked files và xác nhận tệp vẫn còn trong bảng tệp.

---

## 💡 Hint
Nếu vừa tạo tệp mới, hãy tìm mục **Untracked files** trong kết quả `git status`. Bàn làm việc luôn chứa mọi tệp tin vật lý của bạn.

---

## ✅ Validation
- Tạo được `note.txt` trong dự án.
- `git status` báo tệp mới là Untracked.
- Giải thích được tệp vẫn còn trong Working Directory dù Git chưa theo dõi.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để đánh giá mức độ thấu hiểu về không gian Working Directory. Đọc kỹ phân tích từ giảng viên sau mỗi câu hỏi.

---

## 🔥 Challenge
Tạo thêm `todo.txt`. Trước khi chạy `git status`, dự đoán tệp sẽ xuất hiện ở mục nào rồi kiểm tra dự đoán.

---

## 📚 Tổng kết
- Working Directory là không gian làm việc vật lý nơi bạn trực tiếp viết và chỉnh sửa mã nguồn.
- Tệp tin trong dự án luôn thuộc một trong hai nhóm: Tracked (Git đã biết) hoặc Untracked (tệp mới Git chưa quản lý).
- Luôn sử dụng `git status` như thói quen quét dọn và kiểm tra bàn làm việc trước khi thực hiện các bước đóng gói tiếp theo.

