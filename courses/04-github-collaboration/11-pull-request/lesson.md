# Khái niệm và quy trình tạo Pull Request (PR)

---

## 🎯 Mục tiêu
- Nắm vững khái niệm và ý nghĩa cốt lõi của Pull Request (PR) trong phát triển phần mềm hiện đại.
- Hiểu rõ thuật ngữ: Vì sao lại gọi là "Pull Request" (yêu cầu người khác kéo code của mình về gộp).
- Thực hiện quy trình tạo một Pull Request hoàn chỉnh trên giao diện web của GitHub.
- Viết mô tả PR (PR Description) rõ ràng, súc tích tuân thủ theo biểu mẫu chuẩn (PR Template).

---

## 📖 Định nghĩa
> Pull Request (thường viết tắt là PR, trong hệ sinh thái GitLab gọi là Merge Request) là một cơ chế cộng tác trung tâm trên GitHub, cho phép một lập trình viên chính thức gửi thông báo và yêu cầu đội ngũ bảo trì hoặc trưởng nhóm kiểm tra, thảo luận và gộp (pull & merge) các commit từ một nhánh tính năng vào nhánh chính của dự án. PR cung cấp không gian tương tác trực quan với giao diện so sánh diff từng dòng, khu vực bình luận và hệ thống kiểm thử tự động CI tích hợp.

---

## 🤔 Tại sao cần?
Thời kỳ các lập trình viên tùy tiện đẩy code trực tiếp lên nhánh chính mà không qua ai kiểm duyệt đã lùi vào dĩ vãng. Pull Request là trái tim của văn hóa kỹ thuật hiện đại: nó ngăn ngừa các lỗi tiềm ẩn xâm nhập vào sản phẩm, tạo cơ hội chia sẻ kiến thức chuyên môn giữa các thành viên, lưu lại tài liệu giải trình kỹ thuật cho từng quyết định kiến trúc và xây dựng tinh thần trách nhiệm tập thể đối với chất lượng mã nguồn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn là một kiến trúc sư nội thất được thuê trang trí phòng khách của một căn nhà sang trọng. Bạn không tự ý mở cửa nhà khách rồi tự tiện sơn tường hay đập phá vách ngăn khi chưa ai cho phép. Thay vào đó, bạn dựng một bản vẽ thiết kế 3D hoàn chỉnh kèm theo báo giá chi tiết, gửi hồ sơ đó tới gia chủ và lịch sự nói: "Tôi đã hoàn thành thiết kế mới cho phòng khách, xin mời anh chị xem xét và chấp thuận để tôi thi công" (Pull Request).

---

## 🖼 Sơ đồ
```text
Vòng đời của một Pull Request:
[Tạo nhánh feature] ──► [Commit & Push] ──► [Mở Pull Request trên GitHub]
                                                    │
                                                    ▼
[Chấp thuận & Merge vào main] ◄── [Thảo luận & Code Review & Chạy CI]
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Phương vừa hoàn thành xong tính năng lọc sản phẩm theo mức giá trên nhánh `feat/price-filter` và đã đẩy toàn bộ mã nguồn lên GitHub. Phương truy cập trang web của dự án trên GitHub và bấm nút xanh "Compare & pull request". Phương đặt tiêu đề chuẩn Conventional Commits: "feat: add price range filter component", điền chi tiết bản mô tả về cách thức hoạt động của component, đính kèm ảnh chụp màn hình giao diện đã chạy thử nghiệm thành công trên trình duyệt, đồng thời chỉ định hai đồng nghiệp senior trong nhóm vào danh sách Reviewers để cùng tham gia thẩm định chất lượng mã nguồn trước khi xuất bản.

---

## 💻 Command
```bash
git switch -c feat/my-feature
git push -u origin feat/my-feature
```

---

## 🔍 Giải thích command
- `git switch -c <tên-nhánh>`: Luôn luôn tạo một nhánh riêng biệt cô lập cho từng tính năng hoặc bản sửa lỗi trước khi bắt đầu viết mã nguồn.
- `git push -u origin <nhánh>`: Đẩy nhánh tính năng lên GitHub và thiết lập tracking để sẵn sàng tạo Pull Request trên giao diện web.

---

## ⚠️ Sai lầm phổ biến
1. **Tạo Pull Request trực tiếp từ nhánh main cá nhân**:  Dễ gây xung đột và khó quản lý nhiều PR cùng lúc; luôn luôn tạo feature branch.
2. **Viết tiêu đề và mô tả PR cẩu thả hoặc để trống**:  Khiến đồng nghiệp không hiểu mục đích thay đổi và từ chối xem xét.
3. **Gộp quá nhiều tính năng không liên quan vào cùng một PR khổng lồ (Mega PR)**:  Gây quá tải cho người review và rất khó phát hiện lỗi.

---

## 🧪 Lab
1. Tạo nhánh tính năng mới `feat-login-button` và commit một chỉnh sửa nhỏ.
2. Đẩy nhánh tính năng lên GitHub bằng `git push -u origin feat-login-button`.
3. Truy cập giao diện web của GitHub và nhấn nút `Compare & pull request`.
4. Điền tiêu đề, mô tả giải thích lý do thay đổi và bấm `Create pull request`.

---

## 💡 Hint
> Một Pull Request lý tưởng nên nhỏ gọn, tập trung giải quyết duy nhất một vấn đề cụ thể.

---

## ✅ Validation
- Tạo thành công Pull Request trên GitHub với đầy đủ thông tin mô tả chi tiết.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và quy trình tạo Pull Request.

---

## 🔥 Challenge
Giải thích cơ chế hoạt động của tệp `.github/pull_request_template.md` trong việc chuẩn hóa nội dung PR.

---

## 📚 Tổng kết
- Pull Request là yêu cầu chính thức đề nghị gộp code từ nhánh tính năng vào nhánh chính.
- Cung cấp môi trường thảo luận, xem diff, bình luận code và chạy kiểm thử tự động CI.
- Luôn tạo nhánh riêng biệt và viết mô tả rõ ràng cho từng Pull Request.
