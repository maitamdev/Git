# Repository là gì? Cấu trúc .git

---

## 🎯 Mục tiêu
- Phân biệt các tệp dự án đang làm với dữ liệu Git quản lý bên trong `.git`.
- Nhận ra `HEAD` giúp Git biết bạn đang ở nhánh hoặc commit nào.
- Biết không nên tự sửa các tệp nội bộ của `.git`.

---

## 🧩 Từ khóa hôm nay

### Repository (repo) — kho Git của dự án
- **Nói dễ hiểu:** Thư mục dự án được Git quản lý, gồm tệp bạn làm và dữ liệu lịch sử của Git.
- **Ví dụ:** Sau khi khởi tạo Git trong thư mục bài tập, thư mục đó trở thành repository.
- **Đừng nhầm:** Repository không đồng nghĩa với máy chủ; nó có thể nằm trên máy của bạn.

### Working Tree — cây làm việc
- **Nói dễ hiểu:** Các tệp dự án bạn đang xem và sửa trực tiếp.
- **Ví dụ:** `README.md` đang mở trong trình soạn thảo thuộc Working Tree.
- **Đừng nhầm:** Sửa tệp ở đây chưa tự tạo commit.

### `.git` — thư mục dữ liệu nội bộ
- **Nói dễ hiểu:** Thư mục Git tạo ra để lưu cấu hình và thông tin cần cho lịch sử của repository.
- **Ví dụ:** Khi chạy `git init`, Git thường tạo `.git` trong thư mục hiện tại.
- **Đừng nhầm:** `.git` không phải chỗ để bạn viết nội dung README hay mã nguồn.

### `HEAD` — dấu chỉ vị trí hiện tại
- **Nói dễ hiểu:** Dấu để Git biết vị trí hiện tại, thường là nhánh đang được chọn.
- **Ví dụ:** Nếu bạn đang ở nhánh `main`, `HEAD` thường trỏ tới nhánh đó.
- **Đừng nhầm:** `HEAD` không phải tên của một tệp dự án; trường hợp nó trỏ thẳng vào commit sẽ học sâu hơn sau này.

---

## 📖 Định nghĩa
Repository là thư mục dự án Git đang quản lý. Bạn làm việc với các tệp trong Working Tree; Git giữ cấu hình và dữ liệu lịch sử trong `.git`. `HEAD` giúp Git xác định vị trí hiện tại. Người mới nên dùng lệnh Git để xem và thay đổi dữ liệu, không tự sửa tệp nội bộ.

---

## 🤔 Tại sao cần?
Biết tệp dự án nằm đâu và dữ liệu Git nằm đâu giúp bạn không xóa nhầm lịch sử. Bạn làm việc với các tệp thường; Git tự quản lý dữ liệu bên trong `.git`.

---

## 🧠 Mental Model (Mô hình tư duy)
Thư mục dự án có hai phần dễ nhớ: tệp bạn mở và sửa là Working Tree; thư mục ẩn `.git` là nơi Git cất dữ liệu quản lý.

---

## 🖼 Sơ đồ
```text
Thư mục dự án:
my-project/
├── .git/       ← Git quản lý dữ liệu nội bộ
│   └── HEAD    ← Git dùng để nhận biết vị trí hiện tại
├── README.md   ← Working Tree: tệp bạn có thể sửa
└── app.js      ← Working Tree: tệp bạn có thể sửa
```

---

## 🌎 Ví dụ thực tế
Bạn thấy `.git` khi bật hiển thị tệp ẩn. Nếu xóa thư mục này, các tệp như `README.md` vẫn còn, nhưng Git không còn lịch sử cục bộ. Nếu có bản sao từ xa hoặc bản sao lưu, bạn có thể khôi phục từ đó.

---

## 💻 Command
```bash
ls -la
git status
```

---

## 🔍 Giải thích command
- `ls -la`: Liệt kê tệp ẩn trên macOS/Linux và trong terminal mô phỏng. Trong PowerShell dùng `Get-ChildItem -Force`; trong Command Prompt dùng `dir /a`.
- `git status`: Cho biết Git có nhận ra repository tại thư mục này và các tệp nào đang đổi.

---

## ⚠️ Sai lầm phổ biến
1. **Xóa `.git` vì tưởng là tệp thừa**: Việc này có thể làm mất lịch sử chỉ có trên máy.
2. **Sửa nội dung trong `.git` bằng tay**: Hãy dùng lệnh Git để quản lý repository.
3. **Nhầm tệp dự án với dữ liệu nội bộ**: Mã nguồn thường nằm cạnh `.git`, không nằm trong đó.

---

## 🧪 Lab
1. Trong terminal mô phỏng, chạy `ls -la`. Trên PowerShell máy thật, dùng `Get-ChildItem -Force`; trên Command Prompt, dùng `dir /a`.
2. Tìm `.git` nhưng không thay đổi hoặc xóa nội dung bên trong.
3. Chạy `git status` trong repository và xác định một tệp đang thuộc Working Tree.

---

## 💡 Hint
> Các tệp bạn sửa nằm trong dự án; hãy để Git quản lý `.git` bằng các lệnh. Terminal mô phỏng chỉ hiển thị cấu trúc minh họa.

---

## ✅ Validation
- Phân biệt được tệp dự án với dữ liệu Git trong `.git`.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm sau về bản chất của Repository và thư mục .git.

---

## 🔥 Challenge
Giải thích bằng lời của bạn: nếu xóa `.git`, điều gì còn lại và điều gì có thể mất?

---

## 📚 Tổng kết
- Repository gồm tệp dự án và dữ liệu Git mà `.git` quản lý.
- Working Tree là phần tệp bạn mở và sửa.
- Xóa `.git` có thể làm mất lịch sử Git chỉ có trên máy đó.
