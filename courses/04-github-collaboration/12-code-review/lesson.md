# Văn hóa và kỹ năng Code Review trên GitHub

---

## 🎯 Mục tiêu
- Hiểu rõ mục đích và tầm quan trọng sống còn của hoạt động Code Review đối với sự phát triển của đội ngũ.
- Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa code (Suggested Changes), và phê duyệt (Approve).
- Xây dựng văn hóa nhận xét mang tính xây dựng, tôn trọng và đồng cảm (Empathy in Code Review).
- Phân biệt rõ ràng giữa 3 trạng thái phản hồi: Comment, Approve, và Request Changes.

---

## 📖 Định nghĩa
> Code Review (Đánh giá mã nguồn) là một quy trình kỹ thuật bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp, nơi các thành viên trong đội ngũ cùng nhau đọc, phân tích và phản biện mã nguồn trong một Pull Request trước khi nó được phép hợp nhất vào nhánh chính. Code Review giúp phát hiện sớm các lỗ hổng bảo mật, lỗi logic ngầm, vấn đề hiệu năng và bảo đảm phong cách lập trình tuân thủ đúng các quy chuẩn kiến trúc của dự án.

---

## 🤔 Tại sao cần?
Không một cá nhân nào có thể viết code hoàn hảo 100% mọi lúc. Hoạt động Code Review biến việc đảm bảo chất lượng từ trách nhiệm cá nhân đơn độc thành sức mạnh tập thể. Đây cũng là kênh đào tạo nội bộ hiệu quả nhất: các kỹ sư trẻ học hỏi được tư duy kiến trúc sắc bén từ các chuyên gia tiền bối, trong khi các chuyên gia senior liên tục nắm bắt được những thay đổi chi tiết đang diễn ra trên toàn bộ hệ thống.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung Code Review giống như quy trình phản biện bài báo khoa học (Peer Review) của các nhà nghiên cứu, hoặc người biên tập viên đọc bản thảo của tác giả trước khi đem in sách. Người biên tập không nhằm mục đích chỉ trích hay hạ thấp danh dự tác giả, mà cùng tác giả soi từng lỗi chính tả, câu chữ lủng củng và các tình tiết vô lý để khi cuốn sách ra đời, nó là một tác phẩm hoàn hảo nhất có thể phục vụ độc giả.

---

## 🖼 Sơ đồ
```text
3 mức độ phản hồi khi kết thúc Code Review trên GitHub:
┌────────────────────────────────────────────────────────┐
│  [Comment]         ──► Chỉ để lại câu hỏi hoặc góp ý nhẹ│
│  [Approve]         ──► Đồng ý hoàn toàn, sẵn sàng merge │
│  [Request Changes] ──► Bắt buộc phải sửa lỗi trước      │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Senior Tuấn nhận được yêu cầu review Pull Request của bạn thực tập sinh Nam về chức năng đăng ký tài khoản. Đọc qua tệp auth.js, Tuấn nhận thấy mật khẩu người dùng đang được lưu dưới dạng văn bản thuần túy chưa mã hóa. Tuấn không hề chê bai mà nhẹ nhàng bấm vào dòng code đó trên GitHub diff, viết bình luận giải thích rủi ro bảo mật theo tiêu chuẩn OWASP và sử dụng tính năng "Insert suggestion" để gợi ý đoạn mã băm mật khẩu bằng thư viện bcrypt. Nam cảm ơn Tuấn, bấm nút chấp nhận gợi ý và cập nhật PR ngay lập tức.

---

## 💻 Command
```bash
gh pr checkout <pr-number>
git log -p
```

---

## 🔍 Giải thích command
- `gh pr checkout <number>`: Lệnh của GitHub CLI cho phép tải nhanh toàn bộ nhánh của PR về máy tính cá nhân để chạy thử nghiệm và kiểm tra thực tế.
- `git log -p`: Xem chi tiết từng dòng diff thay đổi của các commit trong PR ngay trong terminal.

---

## ⚠️ Sai lầm phổ biến
1. **Công kích cá nhân thay vì tập trung vào đoạn code**:  Dùng lời lẽ gay gắt làm tổn thương đồng nghiệp.
2. **Duyệt code mù quáng (LGTM - Looks Good To Me mà không thèm đọc)**:  Đẩy rủi ro lỗi nghiêm trọng lên môi trường production.
3. **Tranh cãi gay gắt về sở thích cá nhân**:  Ví dụ tranh cãi về dấu cách hay tab thay vì để công cụ tự động (Prettier/ESLint) xử lý.

---

## 🧪 Lab
1. Mở tab `Files changed` trong một Pull Request trên GitHub.
2. Rê chuột vào một dòng code và nhấn vào biểu tượng dấu cộng màu xanh để để lại bình luận.
3. Sử dụng cú pháp gợi ý sửa code ````suggestion` để đề xuất đoạn code mới.
4. Nhấn `Review changes` và chọn trạng thái `Approve` hoặc `Request changes`.

---

## 💡 Hint
> Hãy luôn bình luận về mã nguồn, không bao giờ bình luận về con người lập trình viên.

---

## ✅ Validation
- Để lại nhận xét mang tính xây dựng và sử dụng thành thạo các tính năng review trên GitHub.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về văn hóa và kỹ năng Code Review.

---

## 🔥 Challenge
Nêu lợi ích của việc cấu hình Branch Protection Rule yêu cầu tối thiểu 2 approvals trước khi merge.

---

## 📚 Tổng kết
- Code Review là hoạt động tập thể nhằm nâng cao chất lượng mã nguồn và chia sẻ kiến thức.
- Sử dụng tính năng Suggested Changes để đồng nghiệp có thể áp dụng sửa đổi chỉ với một cú click.
- Luôn giữ thái độ tôn trọng, tích cực và tập trung vào giải pháp kỹ thuật.
