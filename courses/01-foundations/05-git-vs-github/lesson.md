# Phân biệt Git vs GitHub

---

## 🎯 Mục tiêu
- Phân biệt rạch ròi giữa công cụ dòng lệnh Git và dịch vụ nền tảng lưu trữ đám mây GitHub.
- Kể tên các dịch vụ tương đương với GitHub như GitLab, Bitbucket.
- Hiểu cách Git và GitHub phối hợp để tạo nên quy trình làm việc nhóm chuyên nghiệp.

---

## 📖 Định nghĩa
> Git và GitHub là hai khái niệm hoàn toàn khác biệt nhưng bổ trợ chặt chẽ cho nhau. Git là phần mềm quản lý phiên bản mã nguồn mở chạy trực tiếp trên máy tính cá nhân cục bộ của bạn, chịu trách nhiệm lưu vết và kiểm soát lịch sử code. Trong khi đó, GitHub là một dịch vụ nền tảng đám mây trực tuyến thuộc sở hữu của tập đoàn Microsoft, cung cấp máy chủ lưu trữ từ xa cho các kho mã nguồn Git, bổ sung giao diện đồ họa trực quan và các tính năng cộng tác nhóm cao cấp như Pull Request, Code Review, Issue Tracking và GitHub Actions.

---

## 🤔 Tại sao cần?
Rất nhiều bạn sinh viên mới tiếp xúc với ngành công nghệ thông tin thường đánh đồng Git và GitHub là một. Sự ngộ nhận này dẫn đến việc không hiểu rõ tại sao máy tính không có mạng vẫn dùng được Git, hoặc lúng túng khi doanh nghiệp sử dụng GitLab hoặc Bitbucket thay vì GitHub. Phân biệt rõ hai khái niệm này giúp bạn có cái nhìn chuẩn xác về kiến trúc hạ tầng và tự tin làm việc trong bất kỳ môi trường công nghệ nào.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng mối quan hệ giữa Git và GitHub giống như mối quan hệ giữa động cơ xe hơi và bãi đỗ xe thông minh. Git chính là cỗ động cơ mạnh mẽ được lắp đặt ngay bên trong chiếc xe của bạn, cho phép bạn khởi động, lái xe, chuyển số và phanh dừng bất cứ lúc nào. Còn GitHub chính là một tòa nhà bãi đỗ xe trung tâm hiện đại, nơi bạn có thể gửi chiếc xe của mình lên đó để chia sẻ cho bạn bè cùng mượn, cùng chiêm ngưỡng và bảo trì.

---

## 🖼 Sơ đồ
```text
Máy tính cá nhân (Local):            Đám mây (Remote Cloud):
┌───────────────────────────┐         ┌───────────────────────────┐
│ Git Engine (Dòng lệnh)    │ ──push─►│ GitHub / GitLab           │
│ - Lưu snapshot cục bộ     │ ◄─pull──│ - Lưu trữ kho mã nguồn    │
│ - Hoạt động hoàn toàn     │         │ - Pull Request, Review    │
│   offline trên ổ đĩa      │         │ - Issue Tracking, Actions │
└───────────────────────────┘         └───────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Bạn ngồi trên một chuyến tàu hỏa vùng cao hoàn toàn không có sóng điện thoại hay Wi-Fi. Bạn vẫn có thể mở máy tính xách tay, sử dụng Git để tạo các nhánh tính năng, viết code và thực hiện hàng chục commit liên tiếp. Khi chuyến tàu về đến ga trung tâm và máy tính bắt sóng Wi-Fi trở lại, bạn chỉ cần gõ lệnh `git push` để đẩy toàn bộ các commit bạn đã làm trên tàu lên kho chứa của công ty trên GitHub để đồng nghiệp tại văn phòng có thể review. Điều này chứng minh sức mạnh độc lập tuyệt đối của công cụ Git cục bộ mà không hề bị phụ thuộc thời gian thực vào các dịch vụ lưu trữ đám mây như GitHub.

---

## 💻 Command
```bash
git remote -v
git push
git pull
```

---

## 🔍 Giải thích command
- `git remote -v`: Liệt kê danh sách các đường dẫn URL của kho lưu trữ từ xa đang liên kết với máy bạn kèm quyền đọc ghi fetch và push.
- `git push`: Đẩy các commit snapshot từ máy tính cục bộ lên nhánh tương ứng trên máy chủ đám mây GitHub.
- `git pull`: Tải về và tự động gộp các thay đổi mới nhất từ kho chứa GitHub về thư mục làm việc trên máy tính cục bộ.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ Git và GitHub là cùng một sản phẩm**:  Git là công cụ phần mềm cục bộ, GitHub là website dịch vụ đám mây.
2. **Nghĩ không có GitHub thì không học được Git**:  Bạn hoàn toàn có thể thực hành thành thạo mọi câu lệnh Git căn bản mà không cần tạo tài khoản GitHub.
3. **Bối rối khi công ty dùng GitLab**:  Bản chất câu lệnh Git ở máy bạn vẫn giống nhau 100%, chỉ khác địa chỉ máy chủ lưu trữ từ xa.

---

## 🧪 Lab
1. Chạy lệnh `git remote -v` trong terminal để kiểm tra xem repository hiện tại đã kết nối với máy chủ từ xa nào chưa.
2. Quan sát rằng nếu chưa cấu hình remote, lệnh sẽ không in ra địa chỉ URL nào.
3. Xác nhận rằng kho chứa Git cục bộ hoàn toàn độc lập với dịch vụ GitHub.

---

## 💡 Hint
> Git chạy trên máy bạn; GitHub chạy trên máy chủ đám mây của Microsoft.

---

## ✅ Validation
- Phân biệt chính xác vai trò của Git cục bộ và nền tảng đám mây GitHub.

---

## ❓ Quiz
Làm bài trắc nghiệm sau để xác thực sự phân biệt giữa Git và GitHub.

---

## 🔥 Challenge
Kể tên 3 nền tảng lưu trữ mã nguồn đám mây phổ biến trên thế giới ngoài GitHub.

---

## 📚 Tổng kết
- Git là công cụ quản lý phiên bản dòng lệnh chạy cục bộ trên máy tính cá nhân.
- GitHub là dịch vụ web lưu trữ kho mã nguồn Git trên đám mây kèm công cụ cộng tác nhóm.
- Ngoài GitHub còn có nhiều giải pháp lưu trữ Git uy tín khác như GitLab, Bitbucket, Gitea.
