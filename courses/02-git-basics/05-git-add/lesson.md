# Đưa một tệp vào vùng chuẩn bị bằng `git add`

---

## 🎯 Mục tiêu
- Nắm vững cú pháp và bản chất hoạt động của lệnh `git add <tên-tệp>` để đưa thay đổi vào Staging Area.
- Hiểu sâu cơ chế tuyển chọn có chủ đích (Selective Staging) thay vì lạm dụng add bừa bãi.
- Nắm rõ hiện tượng một tệp vừa có trạng thái Staged vừa có trạng thái Unstaged khi chỉnh sửa sau khi add.

---

## 🧩 Từ khóa hôm nay

### `git add` — chọn nội dung cho commit
- **Nói dễ hiểu:** Hành động nhấc trạng thái hiện tại của tệp tin đặt vào vùng đệm Staging Area để chuẩn bị tạo snapshot.
- **Ví dụ:** Chạy `git add README.md` để đưa riêng nội dung tài liệu hướng dẫn vào danh sách chờ commit.
- **Đừng nhầm:** Lệnh `git add` chỉ mới nạp thay đổi vào khay chuẩn bị, hoàn toàn chưa tạo ra mốc commit lịch sử.

### Path — đường dẫn tệp
- **Nói dễ hiểu:** Địa chỉ chính xác của tệp hoặc thư mục trong cấu trúc dự án mà bạn muốn Git xử lý.
- **Ví dụ:** `src/components/Header.jsx` là đường dẫn trỏ thẳng tới một component cụ thể trong cây mã nguồn.
- **Đừng nhầm:** Chỉ định đường dẫn tệp cụ thể giúp bạn kiểm soát chi tiết từng sửa đổi, khác hẳn với việc add bừa bãi toàn bộ thư mục gốc.

### Untracked — tệp Git chưa theo dõi
- **Nói dễ hiểu:** Trạng thái của một tệp tin mới tạo mà Git chưa từng ghi nhận bất kỳ dấu vết nào trong lịch sử kho mã nguồn.
- **Ví dụ:** Bạn gõ lệnh tạo tệp mới, tệp này lập tức xuất hiện trong mục Untracked files của `git status`.
- **Đừng nhầm:** Khi bạn chạy `git add` trên tệp untracked, Git lập tức bắt đầu theo dõi nó và đưa nội dung vào Staging Area.

### Staged — nội dung đã được chọn
- **Nói dễ hiểu:** Phiên bản snapshot cụ thể của tệp đã được đưa vào Staging Area, sẵn sàng niêm phong vào commit kế tiếp.
- **Ví dụ:** Chạy `git add app.js`, rồi mở `app.js` sửa tiếp; lúc này bản đã staged và bản đang sửa ngoài thư mục là hai trạng thái tách biệt.
- **Đừng nhầm:** Chỉnh sửa file sau khi add sẽ không tự động cập nhật bản staged; bạn bắt buộc phải gõ `git add` thêm lần nữa nếu muốn lấy nội dung mới nhất.

---

## 📖 Định nghĩa
`git add <đường-dẫn>` là thao tác chuyển nội dung snapshot hiện tại của tệp từ Working Directory vào Staging Area (chỉ mục Index). Lệnh này báo cho Git biết chính xác những sửa đổi nào được bạn phê duyệt để chuẩn bị đóng gói vào commit tiếp theo, đồng thời biến các tệp mới tinh (Untracked) thành tệp được Git chính thức theo dõi.

---

## 🤔 Tại sao cần?
Trong một buổi làm việc, bạn có thể chỉnh sửa 10 file khác nhau: vừa sửa lỗi đăng nhập, vừa thêm giao diện, vừa ghi chú tài liệu. `git add` trao cho bạn quyền tuyển chọn có chủ đích (Selective Staging): chỉ đưa những file phục vụ đúng một mục đích cụ thể vào vùng đệm để tạo commit gọn gàng, tách bạch, thay vì ném bừa bãi toàn bộ mọi thứ vào một mớ hỗn độn khó kiểm soát.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng bạn đang dọn nhà và có một thùng carton chuẩn bị gửi đi. Bàn làm việc (Working Tree) có đủ loại đồ đạc, nhưng bạn chỉ nhặt đúng quyển sách và chiếc kính đặt vào thùng (Staging Area) thông qua lệnh `git add`. Đồ đạc trên bàn vẫn còn nguyên vẹn; lệnh chỉ lấy một bản sao trạng thái của món đồ đặt vào thùng trước khi dán băng keo niêm phong.

---

## 🖼 Sơ đồ
```text
Thư mục làm việc (Working Tree)               Vùng đệm (Staging Area / Index)
┌───────────────────────────────┐              ┌───────────────────────────────┐
│ app.js (phiên bản đang gõ)    │ --git add->  │ app.js (bản sao snapshot)     │
│ style.css (chưa muốn commit)  │              │ Sẵn sàng cho commit kế tiếp   │
└───────────────────────────────┘              └───────────────────────────────┘
      (File gốc vẫn ở đây)                           (Chỉ mục nhị phân .git/index)
```

---

## 🌎 Ví dụ thực tế
Bạn sửa cả hai file `login.js` và `style.css`. Bạn muốn tạo commit riêng cho logic xử lý lỗi đăng nhập trước, rồi mới commit giao diện sau. Bạn chạy `git add login.js`, kiểm tra bằng `git status` thấy chỉ riêng `login.js` đã staged sẵn sàng đóng gói, trong khi `style.css` vẫn nằm ở trạng thái unstaged chờ đợt đóng gói kế tiếp.

---

## 💻 Command
```bash
git status
git add app.js
git add src/utils/math.js
git status
```

---

## 🔍 Giải thích command
- `git status`: Luôn chạy trước để quan sát chính xác những tệp nào đang có sửa đổi hoặc untracked.
- `git add <tên-tệp>`: Đọc nội dung hiện tại của tệp, tạo đối tượng blob trong `.git/objects` và cập nhật bản ghi vào file `.git/index`.
- `git status` (chạy lần 2): Kiểm tra lại xem tệp mục tiêu đã chính thức chuyển sang màu xanh lá trong mục "Changes to be committed" hay chưa.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng `git add` là đã lưu commit**: Add chỉ mới đưa file vào vùng đệm trung gian; nếu máy sập nguồn hoặc bạn checkout nhánh khác, commit vẫn chưa hề được tạo ra.
2. **Sửa code tiếp nhưng quên add lại**: Sau khi `git add file.js`, bạn sửa thêm 3 dòng code nữa và gõ commit ngay; commit tạo ra sẽ chỉ chứa phiên bản lúc gõ lệnh add chứ không hề có 3 dòng code mới thêm.
3. **Nhập sai đường dẫn tương đối**: Gõ `git add app.js` khi đang đứng ở thư mục con sẽ bị lỗi "pathspec did not match any files".

---

## 🧪 Lab
1. Tạo tệp `app.js` với nội dung `console.log("Git Add Lab");`.
2. Chạy `git status` và nhận ra `app.js` đang nằm ở khu vực Untracked files với màu đỏ hoặc dấu `??`.
3. Chạy lệnh `git add app.js` để nạp tệp vào Staging Area.
4. Chạy lại `git status`; quan sát thấy `app.js` đã chuyển sang màu xanh lá cây trong mục "Changes to be committed".

---

## 💡 Hint
> Khi chạy `git add`, Git chụp lại đúng trạng thái của tệp tại khoảnh khắc bấm Enter. Nếu bạn sửa tiếp tệp đó, hãy nhớ gõ `git add` thêm lần nữa trước khi commit!

---

## ✅ Validation
- Kiểm tra `git status` thấy `app.js` nằm trong danh sách "Changes to be committed".
- Tệp `app.js` vẫn tồn tại nguyên vẹn trên thư mục làm việc của bạn.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để nắm vững cơ chế hoạt động và các tình huống thực tế của lệnh `git add`.

---

## 🔥 Challenge
Tạo hai tệp `note-a.txt` và `note-b.txt`. Chỉ chạy `git add note-a.txt`. Sử dụng `git status -s` để quan sát sự khác biệt giữa hai ký hiệu `A ` và `??`, sau đó phân tích tại sao việc tuyển chọn từng tệp lại là thói quen tốt của Senior Developer.

---

## 📚 Tổng kết
- `git add <tên-tệp>` chụp lại trạng thái hiện tại của tệp và nạp vào vùng đệm Staging Area.
- Thao tác add không di chuyển hay xóa file thật trong thư mục làm việc.
- Luôn kiểm tra lại bằng `git status` để xác nhận những gì đã được chọn trước khi niêm phong commit.
