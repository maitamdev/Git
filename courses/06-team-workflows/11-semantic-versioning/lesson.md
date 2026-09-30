# Semantic Versioning

---

## 🎯 Mục tiêu
- Nắm vững đặc tả Semantic Versioning 2.0.0 (SemVer) với định dạng chuẩn 3 con số: MAJOR.MINOR.PATCH.
- Áp dụng chính xác quy tắc tăng số: khi nào tăng PATCH (sửa lỗi), khi nào tăng MINOR (tính năng), khi nào tăng MAJOR (phá vỡ tương thích).
- Hiểu rõ ý nghĩa của các hậu tố tiền phát hành (Pre-release) như `-alpha`, `-beta`, `-rc.1` và thông tin bản dựng (Build metadata).
- Tích hợp tư duy SemVer vào quy trình quản lý thẻ Git Tag và phát hành thư viện phần mềm chuyên nghiệp.

---

## 📖 Định nghĩa
> Semantic Versioning (định danh phiên bản theo ngữ nghĩa, viết tắt là SemVer) là một đặc tả kỹ thuật phổ quát định nghĩa quy tắc đánh số phiên bản phần mềm một cách minh bạch và nhất quán. Phiên bản SemVer được biểu diễn dưới dạng ba cụm số nguyên dương phân cách bởi dấu chấm: `MAJOR.MINOR.PATCH` (ví dụ `2.4.1`). Mỗi con số mang một thông điệp kỹ thuật rõ ràng gửi tới cộng đồng người sử dụng về mức độ thay đổi và tính tương thích của mã nguồn bên trong bản phát hành đó.

---

## 🤔 Tại sao cần?
Nếu không có SemVer, người phát triển ứng dụng rơi vào "Địa ngục phụ thuộc" (Dependency Hell): khi nâng cấp một thư viện từ phiên bản 2.0 lên 2.1, bạn không thể biết liệu hệ thống của mình có bị gãy đổ hay không. Với SemVer, bạn hoàn toàn yên tâm: nếu chỉ tăng PATCH hoặc MINOR, bạn chắc chắn rằng mã nguồn của bạn vẫn chạy tương thích 100%; chỉ khi con số MAJOR thay đổi, bạn mới cần đọc kỹ tài liệu nâng cấp để điều chỉnh lại các đoạn mã bị phá vỡ tương thích.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang nâng cấp ổ cắm điện trong nhà. Bản sửa lỗi nhỏ (`PATCH`, từ 1.0.0 lên 1.0.1) giống như việc người thợ vặn chặt lại ốc vít của ổ cắm: hoàn toàn giữ nguyên hình dạng và phích cắm của bạn vẫn cắm vừa vặn. Bản tính năng mới (`MINOR`, từ 1.0.0 lên 1.1.0) giống như việc người thợ gắn thêm một cổng sạc USB bên cạnh: bạn có thêm cổng sạc mới tiện lợi trong khi phích cắm cũ vẫn sử dụng bình thường. Còn bản phá vỡ tương thích (`MAJOR`, từ 1.0.0 lên 2.0.0) giống như việc đổi toàn bộ ổ cắm tròn sang ổ cắm ba chấu dẹt vuông: tất cả phích cắm cũ của bạn đều không thể cắm vừa nữa và bắt buộc phải mua đầu chuyển đổi mới.

---

## 🖼 Sơ đồ
```text
Quy tắc tăng số trong Semantic Versioning (MAJOR.MINOR.PATCH):
  v 2 . 4 . 1
    │   │   │
    │   │   └───► PATCH: Sửa lỗi (Bug fixes) - Tương thích ngược 100%
    │   │
    │   └───────► MINOR: Thêm tính năng mới (New features) - Tương thích ngược 100%
    │
    └───────────► MAJOR: Thay đổi phá vỡ tương thích (Breaking Changes) - Không tương thích ngược!
```

---

## 🌎 Ví dụ thực tế
Nhóm phát triển một thư viện giao diện người dùng mã nguồn mở áp dụng chặt chẽ SemVer. Ban đầu, thư viện phát hành phiên bản `1.0.0`. Khi một kỹ sư sửa lỗi hiển thị nút bấm bị lệch trên trình duyệt Safari, nhóm tăng số và phát hành thẻ tag `v1.0.1` (tăng PATCH). Một tháng sau, nhóm bổ sung thêm một linh kiện Lịch chọn ngày mới mà không làm ảnh hưởng đến các linh kiện cũ, nhóm phát hành `v1.1.0` (tăng MINOR và reset PATCH về 0). Sau một năm, nhóm quyết định loại bỏ hỗ trợ các trình duyệt Internet Explorer cũ và đổi hoàn toàn định dạng thuộc tính props, nhóm phát hành `v2.0.0` (tăng MAJOR và reset MINOR, PATCH về 0) kèm theo tài liệu cảnh báo người dùng cần chuyển đổi mã nguồn.

---

## 💻 Command
```bash
git tag -a v1.0.0 -m "Release v1.0.0 initial stable release"
git tag -a v1.0.1 -m "Release v1.0.1: fix button safari bug"
git tag -a v1.1.0 -m "Release v1.1.0: add datepicker component"
git tag -a v2.0.0 -m "Release v2.0.0: breaking change drop legacy browsers"
```

---

## 🔍 Giải thích command
- `git tag -a v1.0.1`: Đánh dấu bản vá lỗi nhỏ tăng PATCH an toàn tuyệt đối cho người dùng.
- `git tag -a v1.1.0`: Đánh dấu bản phát hành tính năng mới tăng MINOR tương thích ngược.
- `git tag -a v2.0.0`: Đánh dấu phiên bản lớn tăng MAJOR có chứa thay đổi phá vỡ tương thích.

---

## ⚠️ Sai lầm phổ biến
1. **Tăng số MAJOR cho những thay đổi nhỏ chỉ vì thấy phiên bản nghe oai hơn hoặc muốn làm tiếp thị.**: Tăng số MAJOR cho những thay đổi nhỏ chỉ vì thấy phiên bản nghe oai hơn hoặc muốn làm tiếp thị.
2. **Đưa thay đổi gây phá vỡ tương thích ngược vào một bản phát hành chỉ tăng PATCH hoặc MINOR.**: Đưa thay đổi gây phá vỡ tương thích ngược vào một bản phát hành chỉ tăng PATCH hoặc MINOR.
3. **Quên reset các con số phía sau về 0 khi tăng con số phía trước (ví dụ từ 1.2.5 lên 2.0.0 chứ không phải 2.2.5).**: Quên reset các con số phía sau về 0 khi tăng con số phía trước (ví dụ từ 1.2.5 lên 2.0.0 chứ không phải 2.2.5).

---

## 🧪 Lab
1. Xác định loại phiên bản cần phát hành khi: sửa 2 lỗi bảo mật và thêm 1 API mới tương thích ngược.
2. Gắn thẻ Annotated Tag tương ứng theo chuẩn SemVer trong kho lưu trữ Git của bạn.

---

## 💡 Hint
> Nếu phân vân giữa MINOR và MAJOR, câu hỏi quyết định là: code của người dùng hiện tại có bị lỗi khi nâng cấp lên không?

---

## ✅ Validation
- Hiểu rõ tại sao phiên bản 0.y.z được xem là giai đoạn thử nghiệm ban đầu nơi API có thể thay đổi bất cứ lúc nào.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về chuẩn định danh phiên bản Semantic Versioning.

---

## 🔥 Challenge
Phân tích cách các ký tự mũ `^` (caret) và ngã `~` (tilde) trong package.json hoạt động dựa trên các nguyên tắc của SemVer.

---

## 📚 Tổng kết
- SemVer chuẩn hóa định dạng phiên bản theo cấu trúc MAJOR.MINOR.PATCH.
- PATCH tăng khi sửa lỗi, MINOR tăng khi thêm tính năng, MAJOR tăng khi phá vỡ tương thích.
- Cung cấp sự an tâm và khả năng tương thích dự đoán trước được cho toàn bộ hệ sinh thái phần mềm.
