# Lệnh git checkout và lịch sử

---

## 🎯 Mục tiêu
- Hiểu thấu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.
- Đọc hiểu thành thạo các tài liệu, bài viết kỹ thuật và mã nguồn dự án lâu năm.
- Đối chiếu chuẩn xác sự tương đương giữa cú pháp cũ của checkout với bộ đôi hiện đại `git switch` và `git restore`.

---

## 🧩 Từ khóa hôm nay

### git checkout — lệnh truyền thống đa năng
- **Nói dễ hiểu:** Câu lệnh di sản lừng danh của Git từng gánh vác cả việc chuyển đổi nhánh lẫn khôi phục trạng thái tệp tin.
- **Ví dụ:** Bạn bắt gặp câu lệnh `git checkout main` trong các bài blog kỹ thuật hoặc giáo trình xuất bản trước năm 2020.
- **Đừng nhầm:** Lệnh vẫn chạy tốt trong mọi phiên bản Git hiện đại, nhưng cộng đồng khuyến khích dùng các lệnh chuyên biệt để an toàn hơn.

### git checkout -b — tiền thân của git switch -c
- **Nói dễ hiểu:** Cú pháp quen thuộc trong thế giới Git dùng để tạo một nhánh mới và chuyển ngay sang nhánh đó.
- **Ví dụ:** Lệnh `git checkout -b feature-cart` đem lại kết quả hoàn toàn trùng khớp với `git switch -c feature-cart`.
- **Đừng nhầm:** Cả hai lệnh tạo ra kết quả giống hệt nhau; `switch -c` ra đời nhằm mục đích làm cú pháp tường minh và dễ nhớ hơn cho kỹ sư.

### git checkout -- file — tiền thân của git restore
- **Nói dễ hiểu:** Cú pháp truyền thống dùng để hủy bỏ các sửa đổi chưa commit trên một tệp tin ngoài thư mục làm việc.
- **Ví dụ:** Gõ `git checkout -- index.html` để xóa sạch các đoạn code gõ nháp trong file HTML.
- **Đừng nhầm:** Dấu hai gạch `--` là bắt buộc để ngăn Git hiểu nhầm tên tệp tin với tên một nhánh có thể trùng tên.

---

## 📖 Định nghĩa
`git checkout` là câu lệnh đa năng kinh điển của Git suốt hơn một thập kỷ trước khi Git 2.23 ra đời. Lệnh này mang trên vai hai sứ mệnh hoàn toàn khác biệt: vừa điều hướng các nhánh và commit (thao tác trên kho lưu trữ), vừa khôi phục hoặc xóa bỏ các sửa đổi của tệp tin trong thư mục làm việc.

---

## 🤔 Tại sao cần?
Dù Git hiện đại đã tách biệt các tính năng này thành `git switch` và `git restore` để an toàn hơn, hàng triệu tài liệu kỹ thuật, video hướng dẫn cũ, các câu trả lời trên Stack Overflow và các tập lệnh tự động hóa (CI/CD scripts) trong các doanh nghiệp lớn vẫn đang sử dụng `git checkout`. Hiểu sâu lệnh này giúp bạn tự tin đọc hiểu mọi tài liệu và bảo trì bất kỳ dự án lâu năm nào.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git checkout` như chiếc dao đa năng Thụy Sĩ tích hợp cả dao cắt bánh mì lẫn tua-vít. Dùng dao đa năng rất tiện nhưng lại tiềm ẩn rủi ro bật nhầm lưỡi dao khi đang cần vặn ốc. Việc Git hiện đại phân tách thành `git switch` (chuyên chuyển nhánh) và `git restore` (chuyên phục hồi tệp) giúp kỹ sư thao tác chuẩn xác, triệt tiêu nguy cơ gõ nhầm lệnh làm mất dữ liệu.

---

## 🖼 Sơ đồ
```text
SỰ PHÂN TÁCH NHIỆM VỤ CỦA GIT CHECKOUT TRONG GIT HIỆN ĐẠI:

                   ┌───► Thao tác trên Branch/Commit ───► git switch
[git checkout] ────┤
                   └───► Thao tác trên File/Index ──────► git restore

BẢNG ĐỐI CHIẾU CÚ PHÁP:
┌──────────────────────────────┬──────────────────────────────┬───────────────────────────────┐
│ Cú pháp truyền thống         │ Cú pháp hiện đại (Khuyên dùng)│ Mục đích kỹ thuật             │
├──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ git checkout main            │ git switch main              │ Chuyển sang nhánh có sẵn      │
│ git checkout -b feature-app  │ git switch -c feature-app    │ Tạo mới và chuyển nhánh ngay  │
│ git checkout -- file.js      │ git restore file.js          │ Hủy sửa đổi chưa commit       │
└──────────────────────────────┴──────────────────────────────┴───────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Khi bạn gia nhập một tập đoàn công nghệ lớn và đọc tài liệu hướng dẫn nội bộ viết từ năm 2018, tài liệu ghi: `git checkout -b feature/login`. Bạn lập tức hiểu ngay lệnh này có ý nghĩa tương đương 100% với `git switch -c feature/login`. Bạn có thể gõ cú pháp nào cũng được, Git đều thực thi hoàn hảo.

---

## 💻 Command
```bash
git checkout <tên-nhánh>
git checkout -b <tên-nhánh-mới>
git checkout -- <tên-tệp>
```

---

## 🔍 Giải thích command
- `git checkout <tên-nhánh>`: Di chuyển HEAD sang nhánh được chỉ định (tương đương `git switch <tên-nhánh>`).
- `git checkout -b <tên-nhánh>`: Vừa tạo nhánh mới vừa chuyển sang nhánh đó (tương đương `git switch -c <tên-nhánh>`).
- `git checkout -- <tên-tệp>`: Lấy lại bản snapshot của tệp từ index ghi đè vào thư mục làm việc, hủy sửa đổi chưa lưu.

---

## ⚠️ Sai lầm phổ biến
1. **Quên dấu `--` khi muốn khôi phục tệp**: Nếu vô tình trong dự án có một nhánh trùng tên với tên tệp, Git sẽ thực hiện chuyển nhánh thay vì khôi phục nội dung tệp.
2. **Bối rối lo sợ khi thấy tài liệu cũ dùng checkout**: Đừng lo lắng, Git giữ tính tương thích ngược tuyệt đối; checkout vẫn hoạt động vĩnh viễn.
3. **Lạm dụng checkout cho người mới học**: Khiến người học nhầm lẫn tai hại giữa việc điều hướng nhánh và việc xóa dữ liệu tệp tin.

---

## 🧪 Lab
1. Chạy lệnh truyền thống: `git checkout -b legacy-demo` để tạo và chuyển nhánh.
2. Chạy `git status` để xác minh bạn đang đứng trên nhánh `legacy-demo`.
3. Chạy lệnh: `git checkout main` để quay trở về nhánh chính.
4. Dọn dẹp nhánh thử nghiệm bằng lệnh: `git branch -d legacy-demo`.

---

## 💡 Hint
> Khi viết code trong dự án mới hôm nay, hãy luôn ưu tiên dùng `git switch` cho nhánh và `git restore` cho tệp tin!

---

## ✅ Validation
- Nhánh `legacy-demo` được tạo và chuyển đổi thành công bằng lệnh checkout truyền thống.
- Quay về nhánh `main` và xóa sạch nhánh thử nghiệm sau khi hoàn tất.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để kiểm tra hiểu biết lịch sử và khả năng quy đổi giữa git checkout và các lệnh hiện đại.

---

## 🔥 Challenge
Hãy phân tích lý do sâu xa tại sao đội ngũ phát triển Git Core lại quyết định tách `git checkout` thành hai lệnh riêng biệt `git switch` và `git restore` vào năm 2019? Quyết định này giúp loại trừ những rủi ro thao tác nào?

---

## 📚 Tổng kết
- `git checkout` là lệnh kinh điển đảm nhiệm song song cả thao tác nhánh và thao tác tệp tin.
- `git checkout -b` tương đương hoàn toàn với cú pháp hiện đại `git switch -c`.
- Thành thạo cả hai phong cách giúp bạn làm chủ mọi tài liệu kỹ thuật và tự tin làm việc trong mọi dự án lớn.
