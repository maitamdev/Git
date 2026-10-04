# Chuẩn quy ước Commit Message

---

## 🎯 Mục tiêu
- Nắm vững cấu trúc tiêu chuẩn toàn cầu `type(scope): description` của Conventional Commits.
- Thành thạo phân biệt và lựa chọn chính xác các tiền tố cốt lõi: `feat`, `fix`, `docs`, `refactor`, `chore`.
- Rèn luyện kỹ năng viết thông điệp commit chuẩn mực, truyền tải trọn vẹn ngữ cảnh kỹ thuật cho đồng đội.

---

## 🧩 Từ khóa hôm nay

### Commit message — lời nhắn cho commit
- **Nói dễ hiểu:** Bản tóm lược cô đọng giải thích lý do tại sao thay đổi này ra đời và nó giải quyết bài toán gì.
- **Ví dụ:** `feat(auth): support login with Google OAuth2` giải thích trọn vẹn giá trị mang lại cho hệ thống.
- **Đừng nhầm:** Message phục vụ cho con người đọc và tra cứu; không nên dùng nó để chép lại toàn bộ từng dòng code.

### Conventional Commits — quy ước viết message
- **Nói dễ hiểu:** Bộ quy chuẩn thống nhất toàn cầu giúp cấu trúc hóa thông điệp commit theo định dạng máy và người đều hiểu.
- **Ví dụ:** Tuân thủ cú pháp các tiền tố như `feat:`, `fix:`, `docs:` trong toàn bộ repository của công ty.
- **Đừng nhầm:** Git không ép buộc bạn dùng chuẩn này; đây là kỷ luật kỹ thuật do các kỹ sư chuyên nghiệp tự giác áp dụng.

### Type — loại thay đổi
- **Nói dễ hiểu:** Tiền tố đứng đầu message định nghĩa chính xác bản chất hành động: tính năng mới (`feat`), vá lỗi (`fix`), tài liệu (`docs`).
- **Ví dụ:** Dùng `feat` khi thêm màn hình mới; dùng `fix` khi sửa xong lỗi crash ứng dụng.
- **Đừng nhầm:** Ghi đúng type không bảo đảm code của bạn hết lỗi; type chỉ phản ánh mục đích của lần commit.

### Scope — phần bị ảnh hưởng
- **Nói dễ hiểu:** Từ khóa tùy chọn đặt trong dấu ngoặc đơn nhằm khoanh vùng mô-đun hoặc khu vực mã nguồn chịu tác động.
- **Ví dụ:** Trong `feat(payment): integrate VNPay gateway`, từ `payment` chính là scope chỉ rõ khu vực thanh toán.
- **Đừng nhầm:** Scope không nhất thiết phải là tên file hay thư mục; hãy chọn danh xưng mô-đun ngắn gọn và nhất quán.

### Description — phần tóm tắt thay đổi
- **Nói dễ hiểu:** Câu mô tả súc tích đứng sau dấu hai chấm, thể hiện mệnh lệnh hành động giải thích việc commit này thực hiện.
- **Ví dụ:** Trong `fix(cart): prevent negative quantity on item decrement`, phần mô tả là `prevent negative quantity on item decrement`.
- **Đừng nhầm:** Luôn dùng câu chủ động, không viết hoa chữ đầu, không kết thúc bằng dấu chấm và tránh câu sáo rỗng.

---

## 📖 Định nghĩa
Conventional Commits là chuẩn quy ước quốc tế về định dạng thông điệp commit theo cấu trúc `type(scope): description`. Quy ước này biến nhật ký commit của dự án từ những dòng chữ lộn xộn trở thành dữ liệu có cấu trúc rõ ràng, giúp con người dễ đọc hiểu và tạo tiền đề để các công cụ CI/CD tự động phân tích phiên bản (Semantic Versioning) và tự sinh changelog.

---

## 🤔 Tại sao cần?
Hãy tưởng tượng bạn phải rà soát lịch sử 500 commit toàn những câu như 'fix bug', 'update', 'done'. Bạn sẽ hoàn toàn mất phương hướng! Khi cả đội ngũ thống nhất chuẩn Conventional Commits, bất kỳ ai lướt qua `git log` cũng nhận diện ngay commit nào thêm tính năng mới (`feat`), commit nào vá lỗi (`fix`), phạm vi ảnh hưởng ở đâu (`scope`) và mục đích là gì. Đây là thước đo phân biệt đội ngũ chuyên nghiệp với tay mơ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem mỗi commit message như một dòng tóm tắt trong sổ tay bệnh án của bác sĩ: đầu tiên ghi loại chẩn đoán (`type`), tiếp theo là bộ phận cơ thể cần điều trị trong ngoặc (`scope`), và sau dấu hai chấm là chỉ định phác đồ cụ thể (`description`). Nhìn vào tiêu đề, y tá hay bác sĩ ca sau đều nắm bắt chính xác tình hình chỉ trong một giây.

---

## 🖼 Sơ đồ
```text
CẤU TRÚC CHUẨN CONVENTIONAL COMMITS:
  type(scope): description
  │    │       │
  │    │       └── Mô tả hành động ngắn gọn (thể mệnh lệnh, viết thường)
  │    └────────── Phạm vi mô-đun bị tác động (tùy chọn)
  └─────────────── Phân loại: feat | fix | docs | style | refactor | test | chore

BẢNG TRA CỨU TIỀN TỐ PHỔ BIẾN:
┌───────────┬───────────────────────────────────────────┬───────────────────────────────┐
│ Tiền tố   │ Ý nghĩa kỹ thuật                          │ Ví dụ thực tế                 │
├───────────┼───────────────────────────────────────────┼───────────────────────────────┤
│ feat      │ Thêm tính năng mới cho người dùng         │ feat(search): add fuzzy query │
│ fix       │ Vá lỗi trong hệ thống                     │ fix(auth): resolve token leak │
│ docs      │ Cập nhật tài liệu hướng dẫn               │ docs(api): update swagger spec│
│ refactor  │ Tối ưu mã nguồn nhưng không đổi tính năng │ refactor: extract helper func │
│ chore     │ Công việc phụ trợ build, tools, thư viện  │ chore: bump vite to v5.2.0    │
└───────────┴───────────────────────────────────────────┴───────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Trong một dự án thương mại điện tử lớn, bạn vừa sửa lỗi tính sai phí vận chuyển cho khu vực ngoại ô. Bạn không viết cụt ngủn 'fix fee' mà đặt chuẩn mực: `fix(shipping): correct suburban delivery fee calculation`. Khi Tech Lead duyệt Pull Request hoặc rà soát lỗi hồi quy, họ biết chính xác mô-đun bị tác động và an tâm phê duyệt mã nguồn.

---

## 💻 Command
```bash
git commit -m "feat(auth): create basic login structure"
git commit -m "fix(payment): resolve currency rounding issue"
git commit -m "docs(readme): add installation guide for docker"
```

---

## 🔍 Giải thích command
- `feat(auth): <mô-tả>`: Báo hiệu rõ ràng một tính năng mới thuộc mô-đun xác thực (`auth`) được bổ sung.
- `fix(payment): <mô-tả>`: Xác định một bản vá lỗi trong hệ thống xử lý giao dịch thanh toán.
- `docs(readme): <mô-tả>`: Thể hiện thay đổi chỉ thuần túy liên quan tới tài liệu tài liệu hóa dự án, không tác động vào logic code.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng các từ vô nghĩa, cẩu thả**: Viết message kiểu "update code", "asdf", "done task" khiến đồng nghiệp ức chế và phá hủy hoàn toàn khả năng truy vết lịch sử.
2. **Lạm dụng tiền tố `feat` cho lỗi**: Sửa bug nhưng gắn mác `feat` khiến hệ thống tự động sinh phiên bản nâng sai số Minor thay vì số Patch theo Semantic Versioning.
3. **Mô tả lan man nhiều việc cùng lúc**: Một commit vừa sửa auth vừa đổi CSS vừa cập nhật database; hãy tách nhỏ thành các commit nguyên tử riêng biệt.

---

## 🧪 Lab
1. Tạo một tệp `auth.js` và đưa vào Staging Area bằng lệnh `git add auth.js`.
2. Thực hiện commit tuân thủ nghiêm ngặt định dạng: `git commit -m "feat(auth): create basic login structure"`.
3. Chạy `git log --oneline` để chiêm ngưỡng thông điệp commit chuyên nghiệp xuất hiện trong lịch sử.

---

## 💡 Hint
> Hãy tự hỏi: "Nếu áp dụng commit này, nó sẽ làm gì cho dự án?". Câu trả lời chính là phần description của bạn!

---

## ✅ Validation
- Thông điệp commit tuân thủ chính xác mẫu `type(scope): description`.
- Lệnh `git log --oneline` hiển thị thông điệp rõ ràng, đúng chính tả kỹ thuật.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra mức độ am hiểu và phản xạ chuẩn mực với quy ước Conventional Commits.

---

## 🔥 Challenge
Bạn hãy phân loại 3 tình huống sau sang đúng cú pháp Conventional Commits: (1) Thêm nút tải file PDF báo cáo, (2) Sửa lỗi tràn số khi tính tổng giỏ hàng, (3) Cập nhật hướng dẫn cài đặt trong README. Hãy viết message hoàn chỉnh cho từng tình huống!

---

## 📚 Tổng kết
- Conventional Commits chuẩn hóa giao tiếp kỹ thuật thông qua công thức `type(scope): description`.
- `feat` đại diện cho tính năng mới, `fix` đại diện cho bản vá lỗi, `docs` cho tài liệu.
- Viết commit message chuyên nghiệp là kỹ năng nền tảng nâng tầm giá trị của kỹ sư phần mềm.
