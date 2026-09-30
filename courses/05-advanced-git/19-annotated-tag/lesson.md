# Annotated Tag

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).
- Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.
- Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.
- Hiểu rõ vì sao các bản phát hành sản phẩm chính thức (Production Releases) luôn bắt buộc dùng Annotated Tag.

---

## 📖 Định nghĩa
> Annotated Tag (Thẻ chú giải) là một đối tượng hoàn chỉnh độc lập trong cơ sở dữ liệu của Git (bên cạnh blob, tree và commit). Không giống như Lightweight Tag chỉ đơn thuần là một con trỏ bí danh lưu mã commit hash, Annotated Tag được lưu trữ với đầy đủ siêu dữ liệu (metadata): tên người gắn thẻ, email, thời gian tạo thẻ, thông điệp phát hành (Release Note) chi tiết và có thể được ký số bảo mật bằng khóa GPG (GNU Privacy Guard).

---

## 🤔 Tại sao cần?
Khi phát hành một phiên bản phần mềm ra thị trường thương mại, tính minh bạch và khả năng xác thực nguồn gốc là yêu cầu pháp lý và an ninh tối quan trọng. Annotated Tag cung cấp chữ ký chứng nhận không thể chối cãi: ai là người đã phê duyệt phát hành phiên bản này, vào thời khắc nào và bản phát hành đó bao gồm những tính năng gì. Mọi công cụ CI/CD hiện đại như GitHub Releases đều sử dụng Annotated Tag để tự động tạo trang phát hành chuyên nghiệp.

---

## 🧠 Mental Model (Mô hình tư duy)
Nếu Lightweight Tag giống như một chiếc mẩu giấy ghi chú Post-it nhỏ bạn dán tạm lên bìa tài liệu với dòng chữ "v1.0", thì Annotated Tag giống như một tấm Bằng chứng nhận có công chứng của Nhà nước. Trên tấm bằng đó có in tên người có thẩm quyền ký duyệt, con dấu đỏ pháp lý, ngày tháng cấp bằng và một bản tuyên cáo long trọng ghi rõ nội dung của chứng chỉ. Không ai có thể nghi ngờ tính hợp pháp của tấm bằng đó.

---

## 🖼 Sơ đồ
```text
Cấu trúc đối tượng của Annotated Tag trong Git:
┌────────────────────────────────────────────────────────┐
│ Tag Object (Mã băm SHA-1 riêng biệt)                   │
│ Tagger: Nguyen Van A <a@company.com>                   │
│ Date:   Wed Sep 30 14:00:00 2026                       │
│ Message: Release version 2.0.0 with AI chatbot engine  │
│ GPG Signature: (Chữ ký số chống giả mạo nếu có)        │
│ Object trỏ tới: Commit C10 (hash 8f9e0a)              │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Trước thời điểm đưa cổng thanh toán quốc tế lên hoạt động chính thức trên môi trường production, kỹ sư trưởng An tạo một thẻ chú giải long trọng bằng lệnh: `git tag -a v2.0.0 -m "Release v2.0.0: Full integration with Stripe and PayPal with PCI-DSS compliance"`. Khi một kỹ sư bảo mật khác trong nhóm muốn kiểm tra thẩm định thông tin của bản phát hành quan trọng này, kỹ sư đó gõ câu lệnh: `git show v2.0.0`. Toàn bộ thông tin định danh tác giả An, địa chỉ email, ngày giờ ký duyệt chính xác đến từng giây và bản thông cáo phát hành tính năng hiển thị rõ ràng, tạo niềm tin và sự bảo đảm tuyệt đối cho toàn bộ ban giám đốc dự án.

---

## 💻 Command
```bash
git tag -a <tên-thẻ> -m "<thông-điệp-phát-hành>"
git tag -s <tên-thẻ> -m "<thông-điệp>"
git show <tên-thẻ>
```

---

## 🔍 Giải thích command
- `git tag -a <tên> -m "<msg>"`: Tạo thẻ chú giải với thông điệp phát hành trực tiếp trên dòng lệnh.
- `git tag -s <tên> -m "<msg>"`: Tạo thẻ chú giải có ký số bảo mật bằng khóa GPG bí mật của lập trình viên.
- `git show <tên-thẻ>`: Hiển thị toàn bộ siêu dữ liệu của thẻ cùng với diff của commit mà thẻ đang trỏ tới.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng thẻ nhẹ Lightweight tag cho các bản phát hành chính thức**:  Khiến thiếu thông tin tác giả và mô tả release.
2. **Quên cờ `-m` khi gõ `git tag -a`**:  Khiến Git tự động bật trình soạn thảo văn bản mặc định (Vim/Nano).
3. **Nghĩ rằng Annotated tag làm chậm dự án**:  Tag chỉ là một đối tượng nhỏ vài trăm bytes trong thư mục `.git`.

---

## 🧪 Lab
1. Tạo một Annotated tag với thông điệp đầy đủ bằng `git tag -a v1.0.0 -m "Bản phát hành chính thức v1.0.0"`.
2. Chạy lệnh `git show v1.0.0` và quan sát thông tin Tagger, Date và Message.
3. So sánh kết quả hiển thị của `git show` giữa thẻ nhẹ và thẻ chú giải.
4. Đẩy thẻ lên GitHub bằng `git push origin v1.0.0`.

---

## 💡 Hint
> Luôn luôn sử dụng cờ `-a` (Annotated) cho các mốc phát hành chính thức trong môi trường doanh nghiệp.

---

## ✅ Validation
- Tạo thành công Annotated tag có đầy đủ metadata và kiểm tra chi tiết bằng git show.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về thẻ chú giải Annotated Tag.

---

## 🔥 Challenge
Nêu sự khác biệt sâu bên trong thư mục `.git/refs/tags/` và `.git/objects/` giữa một Lightweight tag và một Annotated tag.

---

## 📚 Tổng kết
- Annotated Tag là một đối tượng Git thực thụ chứa đầy đủ metadata và thông điệp.
- Cung cấp thông tin tác giả, thời gian tạo và hỗ trợ chữ ký số mã hóa GPG.
- Là chuẩn mực bắt buộc cho mọi bản phát hành phần mềm chính thức trong doanh nghiệp.
