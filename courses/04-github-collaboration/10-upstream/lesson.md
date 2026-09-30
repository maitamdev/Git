# Cấu hình Upstream cho dự án mã nguồn mở

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và quy ước đặt tên remote `upstream` trong quy trình làm việc với kho fork.
- Cấu hình thêm remote `upstream` trỏ về kho gốc của tác giả bằng câu lệnh `git remote add`.
- Đồng bộ hóa mã nguồn mới nhất từ kho gốc về máy cá nhân và cập nhật lên kho fork.
- Ngăn ngừa tình trạng kho fork bị phân kỳ quá xa so với tiến độ phát triển của dự án chính.

---

## 📖 Định nghĩa
> `upstream` trong ngữ cảnh làm việc với các kho fork là tên bí danh quy ước chuẩn quốc tế được dùng để định danh cho kho lưu trữ từ xa gốc (Original Repository) của tác giả hoặc tổ chức sáng lập dự án. Trong khi `origin` trỏ về bản sao fork trên tài khoản cá nhân của bạn, thì `upstream` trỏ thẳng về nguồn cội ban đầu của mã nguồn, cho phép bạn liên tục theo dõi và kéo các cải tiến mới nhất từ dự án gốc về máy.

---

## 🤔 Tại sao cần?
Trong các dự án mã nguồn mở năng động, mỗi ngày có thể có hàng chục commit và bản vá lỗi mới được các chuyên gia đưa vào kho gốc. Nếu kho fork của bạn không được cấu hình `upstream` để cập nhật thường xuyên, mã nguồn của bạn sẽ nhanh chóng bị lạc hậu sau vài tuần. Khi bạn muốn đóng góp tính năng mới, Pull Request của bạn sẽ bị xung đột nặng nề và bị từ chối duyệt. Cấu hình upstream là kỹ năng sống còn của mọi kỹ sư mã nguồn mở.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung kho gốc của dự án giống như dòng sông Mẹ thượng nguồn (Upstream) liên tục cuộn trào dòng nước mát lành và phù sa màu mỡ. Kho fork cá nhân của bạn giống như một con kênh nhỏ bạn đào rẽ nhánh từ bờ sông về cánh đồng nhà mình (Origin). Để con kênh không bị khô cạn và ứ đọng rác bẩn, bạn phải mở một cửa cống đón nước (cấu hình remote upstream) để định kỳ dẫn dòng nước mới nhất từ sông Mẹ vào kênh của mình.

---

## 🖼 Sơ đồ
```text
Mô hình 2 remote: origin và upstream:
[Kho gốc của tác giả] ◄──────────────────┐ (Định kỳ fetch cập nhật)
(upstream)                                │
                                          │
[Kho fork của bạn] ◄────┐ (git push)      │ (git fetch upstream)
(origin)                │                 │
                        │                 │
[Máy tính của bạn] ─────┴─────────────────┘
(Local Repository)
```

---

## 🌎 Ví dụ thực tế
Sau một tháng miệt mài phát triển tính năng mới trên kho fork cá nhân, kỹ sư An chuẩn bị gửi đóng góp mã nguồn cho dự án Vue.js gốc của cộng đồng quốc tế. Để đảm bảo đoạn mã của mình hoàn toàn tương thích và không bị xung đột với phiên bản mới nhất, An cấu hình thêm remote gốc bằng câu lệnh: `git remote add upstream https://github.com/vuejs/core.git`. Sau đó An chạy tiếp `git fetch upstream` và `git merge upstream/main`. Toàn bộ các cải tiến và bản vá lỗi mới nhất của hàng trăm kỹ sư hàng đầu thế giới được tích hợp mượt mà vào máy tính của An. An tự tin đẩy code lên origin và tạo một Pull Request hoàn hảo gửi tới ban quản trị.

---

## 💻 Command
```bash
git remote add upstream <url-kho-goc>
git remote -v
git fetch upstream
git merge upstream/main
git push origin main
```

---

## 🔍 Giải thích command
- `git remote add upstream <url>`: Thiết lập liên kết remote upstream trỏ trực tiếp tới kho gốc của dự án.
- `git remote -v`: Xác nhận cấu hình có đủ 2 remote: origin (kho của bạn) và upstream (kho gốc).
- `git fetch upstream`: Tải về toàn bộ commit và nhánh mới nhất từ kho gốc.
- `git merge upstream/main`: Gộp các cập nhật mới nhất của kho gốc vào nhánh main cục bộ trên máy bạn.
- `git push origin main`: Đẩy các cập nhật vừa gộp lên kho fork cá nhân trên GitHub để đồng bộ.

---

## ⚠️ Sai lầm phổ biến
1. **Nhầm lẫn giữa origin và upstream**:  Push nhầm vào upstream (sẽ bị lỗi từ chối vì bạn không có quyền ghi vào kho gốc).
2. **Quên cập nhật upstream trước khi tạo nhánh mới**:  Bắt đầu viết tính năng trên nền tảng code cũ kỹ đã bị lỗi thời.
3. **Cố tình sửa đổi nhánh main cục bộ**:  Tốt nhất nên giữ main luôn sạch sẽ để chỉ đồng bộ với upstream/main, mọi tính năng đều viết trên branch riêng.

---

## 🧪 Lab
1. Thêm remote upstream trỏ tới kho mẫu bằng `git remote add upstream https://github.com/git-academy/original-project.git`.
2. Kiểm tra danh sách bằng `git remote -v` và xác nhận có cả origin và upstream.
3. Chạy `git fetch upstream` để tải các commit mới nhất từ kho gốc.
4. Gộp cập nhật vào nhánh main bằng `git merge upstream/main`.

---

## 💡 Hint
> Nhớ nguyên tắc: Luôn kéo từ `upstream` về, và chỉ đẩy lên `origin` của chính bạn.

---

## ✅ Validation
- Cấu hình thành công 2 remote origin và upstream và đồng bộ trơn tru.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về cấu hình remote upstream.

---

## 🔥 Challenge
Nêu sự khác biệt giữa việc bấm nút "Sync fork" trên giao diện GitHub web và việc gõ lệnh đồng bộ qua remote upstream trong terminal.

---

## 📚 Tổng kết
- `upstream` là tên quy ước trỏ về kho lưu trữ gốc của tác giả ban đầu.
- Dùng để định kỳ kéo các bản cập nhật mới nhất về máy tính cá nhân.
- Giúp kho fork cá nhân luôn bắt kịp tiến độ và tránh xung đột khi tạo PR.
