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
- **Nói dễ hiểu**: Trạng thái review cho biết người review yêu cầu tác giả xử lý một số vấn đề trước khi tích hợp.
- **Ví dụ**: Phát hiện lỗ hổng SQL Injection hoặc lộ secret key và yêu cầu sửa trước khi đưa vào main.
- **Đừng nhầm**: `Request changes` không phải lúc nào cũng tự chặn merge; tác dụng chặn phụ thuộc quy tắc bảo vệ nhánh và quyền trong repository.

---

## 📖 Định nghĩa
Code Review là hoạt động để người khác đọc các thay đổi, kiểm tra rủi ro và chia sẻ kiến thức. Nhiều nhóm yêu cầu review trước khi merge, nhưng quy định cụ thể tùy repository và nhóm.

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
│  [Approve]         ──► Người review chấp thuận thay đổi  │
│  [Request Changes] ──► Người review đề nghị sửa trước   │
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
1. Mở một PR thử nghiệm mà bạn có quyền xem trên GitHub. Nếu chưa dùng GitHub, hãy review thay đổi mẫu sau: `- const finalPrice = price + discount;` / `+ const finalPrice = price - discount;`.
2. Với PR thật, trong tab `Files changed`, chọn một dòng thay đổi và để lại một câu hỏi hoặc gợi ý cụ thể, giải thích lý do. Với ví dụ mẫu, viết nhận xét: công thức nào sai và ảnh hưởng tới giá cuối cùng là gì?
3. Nếu phù hợp, tạo Suggested Change. Tác giả PR sẽ xem xét và quyết định có áp dụng hay không.
4. Trên PR thật, chọn `Review changes` và đọc ý nghĩa của `Comment`, `Approve`, `Request changes`; chỉ gửi trạng thái thể hiện đúng đánh giá thật của bạn.
5. Viết một nhận xét mẫu theo cấu trúc “Vấn đề quan sát được → ảnh hưởng → đề xuất kiểm tra/sửa”. Không cần gửi nhận xét lên repository thật để hoàn thành bài này.

---

## 💡 Hint & mẹo
> Luôn bình luận về dòng mã nguồn và giải pháp kỹ thuật, tuyệt đối không bình luận về con người lập trình viên.

---

## ✅ Validation & Kết quả mong đợi
- Nhận xét nêu cụ thể vị trí, tác động và hướng xử lý; không công kích người viết.
- Biết `Request changes` có thể chặn merge theo quy tắc repository, không phải trong mọi cấu hình.

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
