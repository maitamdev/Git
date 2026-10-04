# Repository là gì? Giải phẫu cấu trúc .git và Working Tree

---

## 🎯 Mục tiêu
- Giải mã cấu trúc giải phẫu của một Git Repository: Phân tách rạch ròi giữa Working Tree và thư mục bí mật `.git`.
- Hiểu rõ vai trò sinh tử của thư mục `.git` như trái tim chứa toàn bộ lịch sử dự án.
- Sử dụng lệnh `ls -la` và `git status` để quan sát cấu trúc ẩn và định vị con trỏ `HEAD`.

---

## 🧩 Từ khóa hôm nay

### Repository (Repo) — Kho lưu trữ Git
- **Nói dễ hiểu:** Thư mục dự án được trao quyền năng của Git, bao gồm mã nguồn bạn thấy và toàn bộ cơ sở dữ liệu lịch sử ngầm.
- **Ví dụ:** Thư mục `web-ban-hang` trên máy tính sau khi được Git quản lý sẽ trở thành một repo chính hiệu.
- **Đừng nhầm:** Repository không chỉ là các tệp code bạn đang viết; linh hồn của nó nằm ở cơ sở dữ liệu lịch sử bên trong.

### Working Tree — Cây làm việc thực tế
- **Nói dễ hiểu:** Toàn bộ các file và thư mục mà bạn nhìn thấy trên màn hình và trực tiếp chỉnh sửa bằng trình soạn thảo mã nguồn.
- **Ví dụ:** File `index.html` hay `style.css` bạn đang mở trong trình soạn thảo chính là một phần của Working Tree.
- **Đừng nhầm:** Mọi thay đổi bạn gõ trong Working Tree chưa được bảo vệ cho đến khi bạn đưa chúng vào commit.

### `.git` — Trái tim và não bộ ngầm
- **Nói dễ hiểu:** Thư mục ẩn đặc biệt chứa toàn bộ lịch sử commit, các nhánh, các con trỏ và thông tin cấu hình của Git.
- **Ví dụ:** Khi bạn mở tùy chọn hiển thị tệp ẩn, bạn sẽ thấy thư mục `.git` nằm ngay ở gốc dự án.
- **Đừng nhầm:** Tuyệt đối không viết code hay tự ý sửa file bên trong thư mục này; hãy để Git tự quản lý nó.

### `HEAD` — Chiếc la bàn chỉ vị trí hiện tại
- **Nói dễ hiểu:** Con trỏ đặc biệt cho Git biết bạn đang đứng ở nhánh nào hoặc đang soi chiếu vào mốc commit nào.
- **Ví dụ:** `HEAD` đang trỏ vào nhánh `main` nghĩa là mọi commit mới bạn tạo ra sẽ nối tiếp vào nhánh `main`.
- **Đừng nhầm:** `HEAD` không phải là file mã nguồn; nó là một chiếc kim chỉ nam định vị tọa độ làm việc của Git.

---

## 🤔 Tại sao cần?
Có rất nhiều bạn sinh viên thấy thư mục lạ `.git` chiếm dung lượng liền bấm phím xóa cho gọn máy. Hậu quả là toàn bộ công sức commit thâu đêm suốt ba tháng bốc hơi chỉ trong một giây! Hiểu rõ giải phẫu của một repository giúp bạn biết đâu là sân khấu làm việc của mình (Working Tree) và đâu là cấm địa bất khả xâm phạm (`.git`). Bạn sẽ biết cách bảo vệ dữ liệu dự án và không bao giờ tự tay phá hoại thành quả lao động của chính mình.

---

## 📖 Định nghĩa
Repository là một không gian dự án hoàn chỉnh do Git quản lý, cấu thành từ hai phần: Working Tree (tập hợp các tệp mã nguồn bạn chỉnh sửa) và thư mục ẩn `.git` (cơ sở dữ liệu lưu trữ toàn bộ lịch sử commit, con trỏ nhánh và cấu hình dự án).

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng dự án của bạn như một sân khấu kịch lớn: Working Tree là sàn diễn phía trước, nơi các diễn viên (tệp code của bạn) xuất hiện trước mắt khán giả; còn thư mục ẩn `.git` là hậu trường phía sau với toàn bộ kịch bản, đạo cụ lưu trữ và hệ thống điều khiển âm thanh ánh sáng. Đừng bao giờ dại dột làm sập hậu trường!

---

## 🖼 Sơ đồ
```text
Thư mục dự án: my-project/
├── .git/               ◄── HẬU TRƯỜNG BÍ MẬT (Chứa toàn bộ lịch sử)
│    ├── objects/       (Nơi cất giữ các Snapshot)
│    ├── refs/          (Danh sách các nhánh)
│    └── HEAD           (Kim chỉ nam vị trí hiện tại)
├── index.html          ◄── SÀN DIỄN WORKING TREE (Code của bạn)
└── app.js              ◄── SÀN DIỄN WORKING TREE (Code của bạn)
```

---

## 🌎 Ví dụ thực tế
Một lập trình viên sơ ý xóa mất thư mục `.git` trong một dự án cá nhân. Khi mở lại trình soạn thảo mã nguồn, các tệp mã nguồn vẫn còn đó nhưng Git thông báo thư mục không còn là repository. Toàn bộ các mốc commit lịch sử, các nhánh tính năng đang làm dở đều tan biến hoàn toàn. May mắn là anh ta có bản sao trên GitHub nên đã kéo về khôi phục lại được.

---

## 💻 Command
```bash
ls -la
git status
```

---

## 🔍 Giải thích command
- `ls -la`: Liệt kê toàn bộ các tệp tin và thư mục, bao gồm cả những thư mục ẩn có dấu chấm ở đầu như `.git`. Trên PowerShell của Windows, bạn có thể dùng lệnh tương đương là `Get-ChildItem -Force`.
- `git status`: Kiểm tra xem thư mục hiện tại có được nhận diện là một Git repository hay không và báo cáo tình trạng các tệp tin trong Working Tree.

---

## ⚠️ Sai lầm phổ biến
1. **Tự ý xóa thư mục `.git` vì tưởng là file rác:** Hành động này phá hủy toàn bộ cỗ máy thời gian, biến repo thành một thư mục tệp tin thông thường và xóa sạch toàn bộ lịch sử.
2. **Dùng trình soạn thảo mở và sửa bậy các file bên trong `.git`:** Cơ sở dữ liệu của Git được mã hóa và liên kết chặt chẽ; sửa tay sẽ làm hỏng toàn bộ cấu trúc dữ liệu của kho chứa.
3. **Tưởng rằng mã nguồn của mình nằm bên trong `.git`:** Mã nguồn bạn viết luôn nằm ở Working Tree bên ngoài; `.git` chỉ lưu giữ thông tin quản lý và các đối tượng lịch sử nén.

---

## 🧪 Lab
1. Chạy lệnh `ls -la` trên terminal để tận mắt tìm thấy sự hiện diện của thư mục ẩn `.git`.
2. Chạy tiếp lệnh `git status` để xem phản hồi của Git về trạng thái của Working Tree.
3. Trả lời câu hỏi: Nếu bạn sao chép toàn bộ thư mục dự án sang một máy tính khác, lịch sử Git có đi theo không? Vì sao?

---

## 💡 Hint
Bí quyết để di chuyển một kho Git trọn vẹn là sao chép cả thư mục cha; chừng nào thư mục `.git` còn nguyên vẹn bên trong thì toàn bộ lịch sử của dự án vẫn được bảo toàn.

---

## ✅ Validation
- Phân biệt chuẩn xác giữa sàn diễn Working Tree và hậu trường lưu trữ `.git`.
- Nêu được hậu quả nghiêm trọng của việc xóa bỏ thư mục `.git`.
- Sử dụng thành thạo `ls -la` hoặc `Get-ChildItem -Force` để kiểm tra thư mục ẩn.

---

## ❓ Quiz
Làm bài kiểm tra trắc nghiệm dưới đây để chứng minh bạn đã làm chủ kiến thức giải phẫu repository. Đọc kỹ lời giải thích chi tiết của giảng viên.

---

## 🔥 Challenge
Hãy giải thích cho một người bạn hiểu tại sao khi gửi code qua email hay nộp bài tập, người ta thường khuyên nên nén cả thư mục dự án (bao gồm `.git`) nếu muốn giảng viên chấm được cả tiến trình commit.

---

## 📚 Tổng kết
- Thư mục `.git` là linh hồn của kho chứa; không có `.git` thì dự án chỉ là một thư mục bình thường.
- Working Tree là nơi bạn trực tiếp viết và chỉnh sửa mã nguồn hàng ngày.
- Tuyệt đối không can thiệp thủ công vào `.git`; mọi tương tác hãy để các câu lệnh Git đảm nhiệm.

