# Bỏ qua tệp tin với .gitignore

---

## 🎯 Mục tiêu
- Hiểu rõ mục đích và tầm quan trọng của tệp tin cấu hình `.gitignore`.
- Nắm bắt các quy tắc mẫu (glob patterns) phổ biến: đuôi tệp, thư mục, ngoại lệ phủ định.
- Biết cách xử lý tình huống tệp tin đã vô tình bị theo dõi trước khi thêm vào .gitignore.

---

## 🧩 Từ khóa hôm nay

### `.gitignore` — danh sách mẫu bỏ qua
- **Nói dễ hiểu:** Tệp ghi tên hoặc mẫu tệp chưa được theo dõi mà Git nên bỏ qua.
- **Ví dụ:** Thêm `node_modules/` để bỏ qua thư mục thư viện sinh tự động.
- **Đừng nhầm:** Mẫu này không làm Git ngừng theo dõi tệp đã tracked.

### Pattern — mẫu tên cần khớp
- **Nói dễ hiểu:** Quy tắc tên dùng để nhận diện một nhóm tệp.
- **Ví dụ:** `*.log` khớp các tệp có đuôi `.log`.
- **Đừng nhầm:** Mẫu được xét theo vị trí của tệp `.gitignore`.

### Tracked file — tệp đã được theo dõi
- **Nói dễ hiểu:** Tệp Git đã bắt đầu quản lý từ trước.
- **Ví dụ:** Tệp đã commit vẫn hiện khi thêm tên của nó vào `.gitignore`.
- **Đừng nhầm:** Muốn bỏ theo dõi cần thao tác riêng; chỉ thêm mẫu là chưa đủ.

### `!` — ngoại lệ trong mẫu bỏ qua
- **Nói dễ hiểu:** Dấu này có thể đưa một tệp trở lại sau mẫu bỏ qua.
- **Ví dụ:** Bỏ qua `*.log` nhưng giữ lại `important.log` bằng `!important.log`.
- **Đừng nhầm:** Quy tắc ở thư mục cha có thể ảnh hưởng kết quả.

---

## 📖 Định nghĩa
`.gitignore` là tệp văn bản chứa các mẫu để Git bỏ qua đường dẫn chưa được theo dõi khi liệt kê hoặc thêm thay đổi thông thường. Nó không xóa tệp và không ảnh hưởng tệp đã tracked. Thường dùng để bỏ qua tệp sinh tự động, thư mục phụ thuộc hoặc cấu hình cục bộ.

---

## 🤔 Tại sao cần?
`.gitignore` giúp giảm tệp tạm không cần thiết trong lịch sử dự án. Tệp chứa mật khẩu cần được bảo vệ riêng; `.gitignore` chỉ giúp tránh thêm nhầm tệp chưa tracked và không xóa bí mật đã commit trước đó.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ `.gitignore` như danh sách nhắc Git bỏ qua một số tệp mới trong thư mục. Danh sách này không xóa tệp trên máy và không thay đổi những tệp Git đã theo dõi.

---

## 🖼 Sơ đồ
```text
Hoạt động của màng lọc .gitignore:
Working Directory:                   Màng lọc .gitignore:             Staging Area:
├── app.js            ─────────────► [Cho qua]          ────────────► [app.js]
├── package.json      ─────────────► [Cho qua]          ────────────► [package.json]
├── .env (untracked)  ─────────────► [bỏ qua theo mẫu]  ────────────► (không stage tự động)
├── node_modules/     ─────────────► [bỏ qua theo mẫu]  ────────────► (không stage tự động)
└── .env (tracked)    ─────────────► [mẫu không áp dụng] ──────────► (vẫn được theo dõi)
```

---

## 🌎 Ví dụ thực tế
Trong bài tập web, `node_modules/` chứa thư viện được cài tự động và `.env` có thể chứa cấu hình riêng. Thêm chúng vào `.gitignore` giúp Git bỏ qua chúng khi chưa được theo dõi. Kiểm tra `git status` trước khi commit; nếu bí mật đã từng commit, hãy báo người phụ trách và thay bí mật đó.

---

## 💻 Command
```bash
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
git check-ignore -v <file>
git rm --cached <file>
```

---

## 🔍 Giải thích command
- `echo "pattern" >> .gitignore`: Ghi thêm một quy tắc mẫu đường dẫn loại trừ vào cuối tệp tin cấu hình .gitignore một cách nhanh chóng ngay trên terminal.
- `git check-ignore -v <file>`: Lệnh chẩn đoán chuyên sâu giúp bạn kiểm tra chi tiết xem một tệp tin cụ thể đang bị quy tắc nào, ở dòng số mấy trong .gitignore chặn lại, vô cùng hữu ích khi gỡ lỗi.
- `git rm --cached <file>`: Bỏ tệp đã tracked khỏi Index để các commit sau ngừng theo dõi; bản tệp trên máy vẫn còn.

---

## ⚠️ Sai lầm phổ biến
1. **Thêm tệp vào .gitignore sau khi đã commit**:  .gitignore chỉ có tác dụng với tệp Untracked; nếu tệp đã được commit trước đó, bạn phải dùng `git rm --cached` để gỡ bỏ theo dõi.
2. **Viết sai đường dẫn hoặc thiếu dấu gạch chéo**:  Gõ `build` thay vì `build/` có thể vô tình chặn cả tệp mã nguồn mang tên build.js.
3. **Tưởng xóa khỏi lịch sử khi thêm ignore**: `git rm --cached <file>` ngừng theo dõi cho các commit sau nhưng không xóa commit cũ. Nếu đã lộ mật khẩu, hãy đổi mật khẩu đó.

---

## 🧪 Lab
1. Tạo tệp mới `secret.env` và dùng `git status` để thấy tệp trong nhóm Untracked.
2. Tạo tệp `.gitignore` và thêm dòng `*.env` vào bên trong.
3. Chạy `git status` để xác nhận tệp không còn hiện trong nhóm Untracked; chạy `git check-ignore -v secret.env` để xem quy tắc khớp.

---

## 💡 Hint
> Chỉ tệp `.gitignore` đã được commit mới chia sẻ quy tắc với nhóm.

---

## ✅ Validation
- Tệp mới khớp mẫu không còn hiện trong mục Untracked; tệp tracked vẫn có thể hiện.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về cách sử dụng tệp .gitignore.

---

## 🔥 Challenge
Nêu cú pháp dùng dấu chấm than `!` trong .gitignore để tạo quy tắc ngoại lệ bỏ qua.

---

## 📚 Tổng kết
- `.gitignore` giúp Git bỏ qua các đường dẫn chưa được theo dõi.
- Nó không ảnh hưởng tệp tracked và không xóa bí mật đã commit.
- Commit `.gitignore` để chia sẻ quy tắc với nhóm.
