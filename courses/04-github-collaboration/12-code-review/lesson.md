# Văn hóa và kỹ năng Code Review trên GitHub

---

## 🎯 Mục tiêu
- Hiểu rõ mục đích và tầm quan trọng sống còn của hoạt động Code Review đối với sự phát triển của đội ngũ.
- Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa code (Suggested Changes), và phê duyệt (Approve).
- Xây dựng văn hóa nhận xét mang tính xây dựng, tôn trọng và đồng cảm (Empathy in Code Review).
- Phân biệt rõ ràng giữa 3 trạng thái phản hồi: Comment, Approve, và Request Changes.

---

## 🧩 Từ khóa hôm nay

### code review
- **Nói dễ hiểu**: Hoạt động đồng nghiệp đọc và phản biện code của nhau trước khi cho phép gộp vào nhánh chính.
- **Ví dụ**: Đọc các file thay đổi trên tab "Files changed" của PR để tìm lỗi logic và bảo mật.
- **Đừng nhầm**: Không phải công cụ soi xét chỉ trích cá nhân; đây là quy trình học hỏi và nâng cao chất lượng chung.

### suggested changes
- **Nói dễ hiểu**: Tính năng viết sẵn đoạn code sửa lỗi ngay trong bình luận để tác giả PR bấm áp dụng trực tiếp.
- **Ví dụ**: Chèn khối code gợi ý thay thế hàm cũ bằng hàm mới an toàn hơn.
- **Đừng nhầm**: Người review không tự động ghi đè code; tác giả PR vẫn là người bấm duyệt áp dụng commit.

### request changes
- **Nói dễ hiểu**: Trạng thái phản hồi chặn không cho merge PR cho đến khi các lỗi nghiêm trọng được khắc phục xong.
- **Ví dụ**: Phát hiện lỗ hổng SQL Injection hoặc lộ secret key và yêu cầu sửa trước khi đưa vào main.
- **Đừng nhầm**: Không dùng cho những góp ý nhỏ về cách đặt tên hay sở thích cá nhân; chỉ dùng khi có rủi ro kỹ thuật thật sự.

---

## 📖 Định nghĩa
Code Review là quy trình kiểm tra chất lượng mã nguồn bắt buộc trong nhóm kỹ thuật, nơi các thành viên cùng đọc, phân tích và phản biện code trong Pull Request trước khi gộp vào nhánh chính, giúp phát hiện sớm lỗ hổng bảo mật, lỗi logic và sai lệch kiến trúc.

---

## 💡 Tại sao cần
Không ai có thể viết code hoàn hảo mọi lúc mà không mắc lỗi. Code Review biến việc đảm bảo chất lượng từ gánh nặng cá nhân thành sức mạnh tập thể. Đây cũng là kênh đào tạo nội bộ tốt nhất giúp kỹ sư trẻ học hỏi tư duy thiết kế từ đồng nghiệp đi trước.

---

## 🧠 Mental Model
Hãy hình dung Code Review như quy trình biên tập viên đọc bản thảo của tác giả trước khi đem in sách. Người biên tập không nhằm chê bai mà cùng tác giả rà soát từng lỗi chính tả, câu chữ lủng củng và chi tiết vô lý để cuốn sách xuất bản đạt chất lượng hoàn hảo nhất.

---

## 📊 Sơ đồ minh họa
```text
3 mức độ phản hồi khi kết thúc Code Review trên GitHub:
┌────────────────────────────────────────────────────────┐
│  [Comment]         ──► Chỉ để lại câu hỏi hoặc góp ý nhẹ│
│  [Approve]         ──► Đồng ý hoàn toàn, sẵn sàng merge │
│  [Request Changes] ──► Bắt buộc phải sửa lỗi trước      │
└────────────────────────────────────────────────────────┘
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Senior Tuấn review PR đăng ký tài khoản của bạn thực tập sinh. Thấy mật khẩu lưu dạng văn bản chưa mã hóa, Tuấn bấm vào dòng code trên GitHub diff, giải thích rủi ro theo chuẩn OWASP và dùng tính năng Insert suggestion để gợi ý băm mật khẩu bằng bcrypt. Tác giả cảm ơn và bấm nút áp dụng gợi ý để cập nhật commit ngay.

---

## 💻 Command & Cú pháp
```bash
gh pr checkout <pr-number>
git log -p
```

---

## 🔍 Giải thích command
- `gh pr checkout <number>`: Lệnh của GitHub CLI cho phép tải nhánh của PR về máy tính cá nhân để chạy thử nghiệm thực tế.
- `git log -p`: Xem chi tiết từng dòng thay đổi (diff) của các commit trong nhánh ngay tại terminal máy bạn.

---

## ⚠️ Sai lầm phổ biến
1. **Công kích cá nhân thay vì tập trung vào đoạn code**: Dùng lời lẽ gay gắt làm ảnh hưởng tiêu cực tới tinh thần đồng đội.
2. **Duyệt hời hợt mà không đọc code**: Bấm approve bừa bãi khiến lỗi nghiêm trọng lọt vào môi trường chạy thật.
3. **Tranh cãi gay gắt về sở thích cá nhân**: Tranh luận về dấu cách hay tab thay vì cấu hình công cụ tự động như Prettier và ESLint.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành xem diff và thử để lại nhận xét trên giao diện GitHub PR.
1. Mở tab `Files changed` trong một Pull Request trên GitHub.
2. Rê chuột vào một dòng code và nhấn vào biểu tượng dấu cộng xanh để mở ô bình luận.
3. Sử dụng cú pháp gợi ý sửa code để đề xuất dòng thay thế.
4. Nhấn `Review changes` và phân biệt giữa ba lựa chọn `Comment`, `Approve`, `Request changes`.

---

## 💡 Hint & mẹo
> Luôn bình luận về dòng mã nguồn và giải pháp kỹ thuật, tuyệt đối không bình luận về con người lập trình viên.

---

## ✅ Validation & Kết quả mong đợi
- Để lại nhận xét mang tính xây dựng và sử dụng thành thạo tính năng gợi ý sửa code trên GitHub.
- Hiểu rõ khi nào nên Approve và khi nào cần Request changes.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về văn hóa và kỹ năng Code Review.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách cấu hình quy tắc Branch Protection Rules trên GitHub để yêu cầu tối thiểu 1 hoặc 2 lượt Approve trước khi nút Merge được mở khóa.

---

## 📝 Tổng kết
- Code Review là hoạt động tập thể nhằm nâng cao chất lượng mã nguồn và chia sẻ kiến thức.
- Sử dụng tính năng Suggested Changes để đồng nghiệp có thể áp dụng sửa đổi chỉ với một cú click.
- Luôn giữ thái độ tôn trọng, tích cực và tập trung vào giải pháp kỹ thuật.
