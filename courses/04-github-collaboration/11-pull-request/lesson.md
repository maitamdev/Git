# Khái niệm và quy trình tạo Pull Request (PR)

---

## 🎯 Mục tiêu
- Nắm vững khái niệm và ý nghĩa cốt lõi của Pull Request (PR) trong phát triển phần mềm hiện đại.
- Hiểu rõ thuật ngữ: Vì sao lại gọi là "Pull Request" (yêu cầu người khác kéo code của mình về gộp).
- Thực hiện quy trình tạo một Pull Request hoàn chỉnh trên giao diện web của GitHub.
- Viết mô tả PR (PR Description) rõ ràng, súc tích tuân thủ theo biểu mẫu chuẩn (PR Template).

---

## 🧩 Từ khóa hôm nay

### pull request (PR)
- **Nói dễ hiểu**: Yêu cầu nền tảng xem xét các thay đổi từ nhánh nguồn và tích hợp chúng vào nhánh đích nếu nhóm chấp thuận.
- **Ví dụ**: Mở PR đề xuất gộp nhánh `feat/cart` vào nhánh `main` của dự án.
- **Đừng nhầm**: Không phải lệnh của Git trên máy tính; đây là cơ chế tương tác và quản lý code trên GitHub hoặc GitLab.

### reviewers
- **Nói dễ hiểu**: Những đồng nghiệp được chỉ định vào PR để đọc, kiểm tra chất lượng code và phê duyệt trước khi gộp.
- **Ví dụ**: Tag tên trưởng nhóm hoặc bạn cùng dự án vào mục Reviewers trên trang PR.
- **Đừng nhầm**: Không chỉ để phê bình; reviewers giúp phát hiện lỗi sớm và đảm bảo tính nhất quán của kiến trúc.

### base and compare branch
- **Nói dễ hiểu**: Cặp nhánh xác định chiều gộp code: `base` là nhánh đích nhận code, `compare` là nhánh tính năng của bạn.
- **Ví dụ**: `base: main` ◄── `compare: feat/login` thể hiện code sẽ đi từ feat/login vào main.
- **Đừng nhầm**: `base` là nhánh đích, không phải lúc nào cũng là `main`; kiểm tra đúng repository và hướng so sánh trước khi tạo PR.

---

## 📖 Định nghĩa
Pull Request (PR; GitLab thường gọi là Merge Request) là yêu cầu trên nền tảng cộng tác để xem xét các thay đổi từ nhánh nguồn vào nhánh đích. Nền tảng hiển thị diff và hỗ trợ thảo luận, kiểm tra tự động, review và tích hợp theo quyền/cấu hình của repository.

---

## 💡 Tại sao cần
PR tạo nơi để nhóm xem thay đổi, thảo luận và chạy kiểm tra trước khi tích hợp. Quy trình review hoặc yêu cầu CI phụ thuộc cài đặt dự án; PR tự nó không đảm bảo đã có người duyệt hay mọi kiểm tra đều chạy.

---

## 🧠 Mental Model
Hãy hình dung bạn là kiến trúc sư nội thất được thuê trang trí phòng khách. Bạn không tự ý mở cửa nhà khách rồi đập phá tường khi chưa ai đồng ý. Bạn vẽ bản thiết kế 3D hoàn chỉnh kèm dự toán chi phí, gửi cho gia chủ và lịch sự nói: "Tôi đã hoàn thành thiết kế phòng khách, xin mời anh chị xem xét và chấp thuận" (Pull Request).

---

## 📊 Sơ đồ minh họa
```text
Vòng đời của một Pull Request:
[Tạo nhánh feature] ──► [Commit & Push] ──► [Mở Pull Request trên GitHub]
                                                    │
                                                    ▼
[Chấp thuận & Merge vào main] ◄── [Thảo luận & Code Review & Chạy CI]
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Phương hoàn thành bộ lọc giá sản phẩm trên nhánh `feat/price-filter` và đẩy lên GitHub. Phương vào trang dự án bấm "Compare & pull request", đặt tiêu đề chuẩn `feat: add price range filter component`, mô tả cơ chế hoạt động, đính kèm ảnh chụp màn hình kiểm thử và gắn hai đồng nghiệp senior vào mục Reviewers để cùng đánh giá mã nguồn.

---

## 💻 Command & Cú pháp
```bash
git switch -c feat/my-feature
git push -u origin feat/my-feature
```

---

## 🔍 Giải thích command
- `git switch -c <tên-nhánh>`: Tạo một nhánh riêng biệt cô lập cho tính năng mới trước khi viết code.
- `git push -u origin <nhánh>`: Đẩy nhánh tính năng lên GitHub và thiết lập tracking để sẵn sàng tạo Pull Request trên web.

---

## ⚠️ Sai lầm phổ biến
1. **Tạo PR trực tiếp từ nhánh main cá nhân**: Gây khó khăn khi muốn sửa nhiều tính năng cùng lúc; luôn tạo nhánh feature riêng.
2. **Tiêu đề và mô tả PR sơ sài**: Khiến người review không hiểu mục đích thay đổi và trì hoãn phê duyệt.
3. **Mở một PR quá khổng lồ chứa nhiều tính năng không liên quan**: Làm quá tải người kiểm tra và dễ bỏ sót lỗi nghiêm trọng.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tạo nhánh tính năng, đẩy lên remote và mở PR trên giao diện web.
1. Dùng một repository thử nghiệm trên GitHub mà bạn có quyền push, tạo nhánh `feat-login-button` và commit một chỉnh sửa nhỏ.
2. Chạy `git push -u origin feat-login-button`. Nếu đang học trong simulator, bước này chỉ cập nhật remote giả lập; không thể tạo PR trên GitHub từ đó.
3. Trên GitHub thật, mở repository, chọn tạo PR và kiểm tra đúng `base` (nhánh đích) cùng `compare` (nhánh nguồn).
4. Viết tiêu đề và mô tả gồm mục tiêu, thay đổi chính, cách kiểm tra; tạo PR nếu có quyền.

---

## 💡 Hint & mẹo
> Một Pull Request lý tưởng nên nhỏ gọn, tập trung giải quyết trọn vẹn một vấn đề duy nhất để đồng nghiệp review nhanh chóng.

---

## ✅ Validation & Kết quả mong đợi
- Pull Request được tạo thành công trên GitHub với đầy đủ tiêu đề và nội dung giải trình.
- Giao diện "Files changed" hiển thị đúng các dòng code bạn đã thay đổi.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về quy trình tạo Pull Request.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách cấu hình file `.github/pull_request_template.md` để tự động hiển thị danh sách kiểm tra (checklist) cho mọi PR mới trong dự án.

---

## 📝 Tổng kết
- Pull Request đề nghị tích hợp thay đổi từ nhánh nguồn vào nhánh đích trên nền tảng cộng tác.
- Kiểm tra repository, hai nhánh, diff và các quy tắc của nhóm trước khi tạo.
- PR hỗ trợ review và kiểm tra; quyền merge phụ thuộc vào quyền truy cập và cấu hình repository.
