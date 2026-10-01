# Chuẩn quy ước Commit Message

---

## 🎯 Mục tiêu
- Nhận biết dạng `type(scope): description`; scope có thể bỏ.
- Chọn `feat`, `fix` hoặc `docs` cho ví dụ đơn giản.
- Viết message đủ rõ để người khác hiểu commit nói về gì.

---

## 🧩 Từ khóa hôm nay

### Commit message — lời nhắn cho commit
- **Nói dễ hiểu:** Câu tóm tắt thay đổi để người đọc hiểu commit này làm gì.
- **Ví dụ:** `fix: correct total price`.
- **Đừng nhầm:** Message không thay thế việc xem diff khi cần chi tiết.

### Conventional Commits — quy ước viết message
- **Nói dễ hiểu:** Một cách thống nhất để bắt đầu message bằng loại thay đổi.
- **Ví dụ:** `feat: add search` và `fix: correct typo`.
- **Đừng nhầm:** Git không bắt buộc dự án phải dùng quy ước này.

### Type — loại thay đổi
- **Nói dễ hiểu:** Từ đứng đầu message, thường cho biết loại công việc.
- **Ví dụ:** `feat` thường dùng khi thêm tính năng; `fix` khi sửa lỗi.
- **Đừng nhầm:** Từ loại không tự xác nhận code đã đúng.

### Scope — phần bị ảnh hưởng
- **Nói dễ hiểu:** Nhãn tùy chọn trong ngoặc cho biết commit liên quan tới phần nào.
- **Ví dụ:** `feat(auth): add login` nói thay đổi thuộc phần đăng nhập.
- **Đừng nhầm:** Tên scope do dự án chọn; Git không áp đặt danh sách.

### Breaking Change — thay đổi làm hỏng tương thích
- **Nói dễ hiểu:** Thay đổi khiến cách dùng cũ không còn hoạt động như trước.
- **Ví dụ:** `feat(api)!: remove old endpoint` báo một thay đổi không tương thích.
- **Đừng nhầm:** Dấu `!` ghi nhận thay đổi; nó không tự nâng phiên bản nếu thiếu công cụ cấu hình.

---

## 📖 Định nghĩa
Conventional Commits là quy ước viết message theo dạng `type(scope): description`, trong đó scope là tùy chọn. Ví dụ: `feat(auth): add login`. Git vẫn chấp nhận message khác; đây là thỏa thuận giúp người đọc và các công cụ đã cấu hình hiểu loại thay đổi.

---

## 🤔 Tại sao cần?
Khi message ghi rõ loại và phần bị ảnh hưởng, đồng đội đọc lịch sử dễ hơn. Dự án cũng có thể cấu hình công cụ để tạo changelog hoặc tính phiên bản từ các message này; quy ước tự nó không chạy các công cụ đó.

---

## 🧠 Mental Model (Mô hình tư duy)
Viết loại thay đổi trước, phần bị ảnh hưởng nếu cần, rồi mô tả ngắn: `fix(auth): handle empty password`.

---

## 🖼 Sơ đồ
```text
Cấu trúc chuẩn Conventional Commits:
┌───────────────┬───────────┬───────────────────────────────────────────┐
│ Type (Loại)   │ Scope     │ Description (Mô tả súc tích)              │
├───────────────┼───────────┼───────────────────────────────────────────┤
│ feat          │ (auth)    │ add login form                             │
│ fix           │ (payment) │ correct total                              │
│ docs          │ (readme)  │ explain installation                      │
└───────────────┴───────────┴───────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Thêm trang tìm kiếm? Viết `feat(search): add search page`. Sửa lỗi tổng tiền? Viết `fix(cart): correct total`. Người đọc lịch sử hiểu được loại thay đổi và phần liên quan.

---

## 💻 Command
```bash
git commit -m "feat(scope): short description"
git commit -m "fix: resolve memory leak in worker"
```

---

## 🔍 Giải thích command
- `git commit -m "feat: <mô-tả>"`: Tạo commit có message bắt đầu bằng `feat`.
- `git commit -m "fix: <mô-tả>"`: Tạo commit có message bắt đầu bằng `fix`.

---

## ⚠️ Sai lầm phổ biến
1. **Message quá chung chung**: “update” không cho người đọc biết nội dung thay đổi.
2. **Ghi scope dù không giúp ích**: Chỉ thêm scope khi nó làm rõ phần bị ảnh hưởng.
3. **Nhầm `feat` với `fix`**: `feat` thường chỉ tính năng mới; `fix` chỉ sửa lỗi.

---

## 🧪 Lab
1. Tạo một tệp `auth.js` và đưa vào Staging Area.
2. Thực hiện commit với tiền tố chuẩn: `git commit -m "feat(auth): create basic login structure"`.
3. Quan sát commit hiển thị trong `git log --oneline`.

---

## 💡 Hint
> Bài này dùng ba ví dụ: `feat` thêm tính năng, `fix` sửa lỗi, `docs` sửa tài liệu.

---

## ✅ Validation
- Kiểm tra commit message tuân thủ định dạng Conventional Commits.

---

## ❓ Quiz
Hãy trả lời các câu hỏi sau về quy ước viết commit message chuyên nghiệp.

---

## 🔥 Challenge
Nêu ý nghĩa của dấu chấm than `feat!:` trong quy ước Conventional Commits.

---

## 📚 Tổng kết
- Dạng thường dùng là `type(scope): description`; scope có thể bỏ.
- `feat` thường là tính năng mới; `fix` thường là sửa lỗi.
- Chỉ công cụ được cấu hình mới tự sinh changelog hoặc tính phiên bản.
