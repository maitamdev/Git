# Hotfix Workflow

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất khẩn cấp và các tiêu chí phân loại một sự cố sản xuất (Production Incident) cần kích hoạt Hotfix.
- Nắm vững quy trình tách nhánh Hotfix trực tiếp từ commit bị lỗi trên nhánh sản phẩm (`main`).
- Thực hiện quy trình hợp nhất kép (Dual-merge) chuẩn xác cho Hotfix vào cả `main` và `develop` để tránh tái phát lỗi.
- Áp dụng quy tắc gắn thẻ phiên bản tăng PATCH (ví dụ v1.0.1) và cập nhật tài liệu khắc phục sự cố (Post-mortem).

---

## 📖 Định nghĩa
> Hotfix Workflow (Quy trình vá lỗi khẩn cấp) là cơ chế xử lý sự cố kỹ thuật đặc biệt trong Git nhằm phản ứng nhanh với các lỗi nghiêm trọng (Critical Bugs) phát sinh đột ngột trên môi trường sản xuất (Production) mà không thể chờ đến chu kỳ phát hành theo kế hoạch tiếp theo. Điểm khác biệt cốt tử của Hotfix là nó được rẽ nhánh trực tiếp từ phiên bản đang chạy lỗi trên nhánh `main`, thực hiện bản vá tối thiểu cần thiết, kiểm thử thần tốc và hợp nhất ngay lập tức vào `main` để deploy giải cứu hệ thống, sau đó được hợp nhất ngược về `develop`.

---

## 🤔 Tại sao cần?
Khi một lỗi nghiêm trọng xảy ra trên production (ví dụ khách hàng không thể bấm nút thanh toán, hoặc rò rỉ dữ liệu người dùng), mỗi phút trôi qua đều gây thiệt hại hàng triệu đồng và đánh mất uy tín doanh nghiệp. Bạn không thể lấy nhánh `develop` để sửa lỗi vì trên đó đang chứa hàng chục tính năng dang dở chưa kiểm thử. Nhánh Hotfix cho phép bạn phẫu thuật nội soi trực tiếp trên đúng commit đang chạy thực tế, chữa lành sự cố trong thời gian ngắn nhất mà không kéo theo bất kỳ đoạn code rủi ro nào khác.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một con tàu ngầm đang làm nhiệm vụ dưới đáy đại dương (`main`). Đột nhiên một đường ống nước biển bị nứt và nước bắt đầu rò rỉ vào khoang máy. Thuyền trưởng không thể kéo con tàu về lại xưởng đóng tàu trên đất liền (`develop`) để chờ đợt đại tu vào tháng sau. Một đội thợ lặn cấp cứu mang theo bộ hàn đặc biệt (`hotfix branch`) tiến thẳng vào khoang máy, hàn kín vết nứt ngay tại chỗ để tàu tiếp tục hoạt động an toàn. Sau đó, họ gửi bản vẽ mối hàn về xưởng đóng tàu để các con tàu đang đóng không mắc lại lỗi tương tự.

---

## 🖼 Sơ đồ
```text
Quy trình phản ứng nhanh của Hotfix Workflow:
main:     v1.0.0 ────────────────────────────────────── v1.0.1 (Deploy Hotfix!)
             │                                            ▲
             └─► hotfix/fix-payment-leak ─► [Fix & Test] ─┤ (Dual-merge)
                                                          ▼
develop:  ──────●────────●────────●───────────────────────● (Nhận bản vá lỗi)
```

---

## 🌎 Ví dụ thực tế
Vào lúc 2 giờ sáng, hệ thống cảnh báo tự động gửi tin nhắn khẩn: khách hàng tại Nhật Bản không thể hoàn tất thanh toán do lỗi múi giờ. Kỹ sư trực ca lập tức chuyển sang nhánh `main` mới nhất và tạo nhánh: `git switch -c hotfix/fix-japan-timezone main`. Kỹ sư sửa đúng 3 dòng mã bị lỗi chuyển đổi giờ UTC trong tệp `payment.js`, kiểm thử vượt qua bài test thanh toán. Kỹ sư đẩy code lên và mở PR khẩn cấp. Trưởng nhóm duyệt ngay, gộp code vào `main`, gắn thẻ tag `v1.0.1` và hệ thống CI tự động deploy bản vá chỉ sau 15 phút từ khi phát hiện. Cuối cùng, kỹ sư chuyển sang `develop` và gộp bản vá vào để bảo đảm phiên bản v1.1.0 sau này không bị lỗi lại.

---

## 💻 Command
```bash
git switch -c hotfix/<ten-loi> main
git commit -m "fix(security): patch sql injection vulnerability"
git switch main && git merge --no-ff hotfix/<ten-loi>
git tag -a v1.0.1 -m "Hotfix v1.0.1: security patch"
git switch develop && git merge --no-ff hotfix/<ten-loi>
git branch -d hotfix/<ten-loi>
```

---

## 🔍 Giải thích command
- `git switch -c hotfix/<tên-lỗi> main`: Bắt buộc rẽ nhánh trực tiếp từ nhánh sản xuất main.
- `git tag -a v1.0.1`: Tăng chỉ số PATCH đánh dấu bản vá lỗi khẩn cấp.
- Hợp nhất kép vào `main` và `develop`: Bảo đảm bản vá được triển khai ngay và không bị mất ở bản phát hành sau.

---

## ⚠️ Sai lầm phổ biến
1. **Rẽ nhánh hotfix từ develop thay vì main**:  Đưa nhầm toàn bộ các tính năng dở dang chưa kiểm thử lên production.
2. **Tiện tay thêm các tính năng không liên quan vào nhánh hotfix**:  Vi phạm nguyên tắc bản vá tối thiểu, tăng rủi ro lỗi mới.
3. **Quên merge ngược hotfix về develop**:  Nguyên nhân phổ biến khiến lỗi cũ vừa sửa xong lại tái phát ở sprint sau.

---

## 🧪 Lab
1. Mô phỏng sự cố khẩn cấp bằng cách tạo nhánh `hotfix/v1.0.1` xuất phát trực tiếp từ `main`.
2. Thực hiện commit sửa lỗi, hợp nhất kép vào cả `main` và `develop`, sau đó gắn thẻ tag `v1.0.1`.

---

## 💡 Hint
> Bản vá Hotfix phải là bản vá nhỏ nhất, an toàn nhất có thể để giải quyết triệt để sự cố mà không tạo tác dụng phụ.

---

## ✅ Validation
- Phiên bản production được khôi phục trạng thái hoạt động bình thường trong thời gian tối thiểu.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về quy trình xử lý lỗi khẩn cấp Hotfix Workflow.

---

## 🔥 Challenge
Trình bày cách xử lý nếu nhánh hotfix khi merge ngược vào develop gặp xung đột mã nguồn lớn do code develop đã bị cấu trúc lại.

---

## 📚 Tổng kết
- Hotfix Workflow là quy trình phản ứng nhanh xử lý sự cố nghiêm trọng trên môi trường sản xuất.
- Luôn luôn rẽ nhánh trực tiếp từ commit đang chạy thực tế trên nhánh main.
- Bắt buộc thực hiện hợp nhất kép vào cả main và develop để ngăn ngừa lỗi tái xuất hiện.
