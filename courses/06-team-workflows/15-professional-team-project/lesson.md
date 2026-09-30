# Professional Team Project

---

## 🎯 Mục tiêu
- Tổng hợp toàn bộ các kỹ năng và kiến thức đã học trong Level 6 vào một dự án mô phỏng thực chiến quy mô doanh nghiệp.
- Thiết lập hoàn chỉnh cấu trúc dự án chuẩn mực: Protected Branch, Branch Protection Rules, tệp CODEOWNERS và mẫu PR Template.
- Vận hành trơn tru quy trình Feature Branch kết hợp Conventional Commits và Semantic Versioning.
- Xử lý thành công tình huống khẩn cấp Hotfix trên môi trường sản xuất song song với việc phát triển tính năng mới.

---

## 📖 Định nghĩa
> Professional Team Project (Dự án nhóm chuyên nghiệp) là bài tập tổng hợp thực chiến đỉnh cao khép lại Level 6: Team Workflows. Trong thử thách này, bạn sẽ đóng vai trò Kỹ sư trưởng kiêm Trưởng nhóm kỹ thuật (Lead Engineer) của một nền tảng thương mại điện tử hiện đại. Nhiệm vụ của bạn là kiến thiết toàn bộ hạ tầng quy trình cộng tác từ con số không: ban hành quy ước phân nhánh, thiết lập hàng rào bảo vệ nhánh, cấu hình phân quyền tệp CODEOWNERS, chỉ đạo giải quyết xung đột mã nguồn và điều phối phát hành các phiên bản phần mềm theo chuẩn SemVer.

---

## 🤔 Tại sao cần?
Lý thuyết về các quy trình sẽ mãi chỉ là lý thuyết nếu bạn chưa từng tự tay trải nghiệm cảm giác điều phối một luồng công việc đa tầng phức tạp dưới áp lực thời gian thực tế. Bài tập lớn này được thiết kế để rèn luyện bản lĩnh nghề nghiệp, giúp bạn tự tin bước vào bất kỳ tập đoàn công nghệ lớn nào trên thế giới và hòa nhập ngay lập tức vào guồng quay phát triển phần mềm chuẩn mực quốc tế.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn là một vị tổng công trình sư đang điều hành việc xây dựng một tòa nhà chọc trời 80 tầng. Bạn không thể chỉ tự mình cầm bay đi xây từng viên gạch. Bạn phải thiết kế bản vẽ quy hoạch phân khu (`Branching Strategy`), lắp đặt giàn giáo an toàn và lưới bảo vệ chống rơi vãi (`Branch Protection`), chỉ định rõ ràng kỹ sư chịu trách nhiệm từng tầng lầu (`CODEOWNERS`), ban hành quy chuẩn nghiệm thu vật liệu (`Conventional Commits`) và sẵn sàng phương án kích hoạt còi báo động cứu hỏa xử lý sự cố bất ngờ (`Hotfix Workflow`).

---

## 🖼 Sơ đồ
```text
Kiến trúc quy trình tổng hợp của Professional Team Project:
Repository Settings:
├── Protected Branch: main (Require 1 Approval, Require CI Pass, Require Linear History)
├── .github/CODEOWNERS (Phân quyền @frontend, @backend, @devops)
└── .github/PULL_REQUEST_TEMPLATE.md (Chuẩn hóa nội dung review)

Vòng lặp vận hành liên hoàn:
Feature Request ──► feat/* ──► Conventional Commits ──► PR ──► CODEOWNERS Review ──► CI Pass ──► Squash & Merge
                                                                                                        │
Incident Alert  ──► hotfix/* ──► Fast Patch ─────────► Dual Merge (main & develop) ────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Trong bài tập lớn mô phỏng, học viên khởi tạo kho lưu trữ `ecommerce-platform`. Đầu tiên, học viên thiết lập tệp `.github/CODEOWNERS` phân chia quyền sở hữu cho các thư mục `api/` và `web/`. Tiếp theo, học viên cấu hình chính sách bảo vệ nhánh `main`: cấm push trực tiếp, bắt buộc có ít nhất 1 lượt review và bài kiểm tra CI phải báo xanh. Sau đó, học viên tạo nhánh `feat/cart-checkout`, viết các commit theo đúng chuẩn `feat(cart): add payment gateway`, mở PR và đóng vai reviewer để kiểm duyệt. Tiếp đó, hệ thống kích hoạt kịch bản lỗi khẩn cấp trên production, học viên bình tĩnh tạo nhánh `hotfix/v1.0.1`, vá lỗi, thực hiện quy trình hợp nhất kép vào cả `main` lẫn `develop` và gắn thẻ tag `v1.0.1`. Cuối cùng, học viên kích hoạt công cụ tự động sinh tệp `CHANGELOG.md` hoàn chỉnh và kết thúc bài thi với điểm số tuyệt đối.

---

## 💻 Command
```bash
git tag -a v1.0.0 -m "Release v1.0.0 initial baseline"
git switch -c feat/order-service
git commit -m "feat(order): implement order placement logic"
git switch -c hotfix/v1.0.1 main
git commit -m "fix(order): prevent duplicate checkout charges"
```

---

## 🔍 Giải thích command
- `git tag -a v1.0.0`: Tạo cột mốc phiên bản gốc ổn định cho hệ thống thương mại điện tử.
- `feat(order): <mô-tả>`: Commit tính năng mới chuẩn mực theo cú pháp Conventional Commits.
- `hotfix/v1.0.1`: Rẽ nhánh giải cứu sản xuất trực tiếp từ main và vá lỗi khẩn cấp.

---

## ⚠️ Sai lầm phổ biến
1. **Bỏ qua bước cấu hình CODEOWNERS và Branch Protection trước khi cho thành viên vào phát triển.**: Bỏ qua bước cấu hình CODEOWNERS và Branch Protection trước khi cho thành viên vào phát triển.
2. **Viết các commit message không tuân thủ chuẩn Conventional Commits làm hỏng quy trình sinh changelog.**: Viết các commit message không tuân thủ chuẩn Conventional Commits làm hỏng quy trình sinh changelog.
3. **Quên đồng bộ bản vá hotfix về nhánh phát triển khiến nhánh develop bị lạc hậu mã nguồn.**: Quên đồng bộ bản vá hotfix về nhánh phát triển khiến nhánh develop bị lạc hậu mã nguồn.

---

## 🧪 Lab
1. Khởi tạo dự án mẫu hoàn chỉnh với tệp `.github/CODEOWNERS` và quy tắc Branch Protection.
2. Thực hiện toàn bộ chuỗi quy trình từ tạo tính năng mới, mở PR, xử lý một sự cố hotfix giả lập và gắn thẻ phát hành SemVer.

---

## 💡 Hint
> Hãy tưởng tượng bạn đang điều hành một đội ngũ 50 kỹ sư: sự rõ ràng và kỷ luật trong quy trình là chìa khóa duy nhất để dự án không rơi vào hỗn loạn.

---

## ✅ Validation
- Toàn bộ lịch sử commit, các thẻ tag SemVer và cây phân nhánh đều sạch đẹp, không có commit rác hay xung đột tồn đọng.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây để tổng kết toàn diện kiến thức của Level 6.

---

## 🔥 Challenge
Xây dựng một tệp Pull Request Template chuẩn hóa (.github/pull_request_template.md) có danh sách kiểm tra an toàn cho toàn bộ dự án.

---

## 📚 Tổng kết
- Level 6 trang bị toàn diện các tư duy, kỹ năng và quy chuẩn cộng tác nhóm chuyên nghiệp đỉnh cao.
- Sự kết hợp giữa Protected Branch, CODEOWNERS, Conventional Commits và SemVer tạo nên bộ khung kỹ thuật bất khả chiến bại.
- Bạn đã sẵn sàng tự tin đảm nhận vai trò kỹ sư phần mềm chuyên nghiệp trong bất kỳ môi trường công nghệ hiện đại nào.
