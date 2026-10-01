# Cấu hình Upstream cho dự án mã nguồn mở

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và quy ước đặt tên remote `upstream` trong quy trình làm việc với kho fork.
- Cấu hình thêm remote `upstream` trỏ về kho gốc của tác giả bằng câu lệnh `git remote add`.
- Đồng bộ hóa mã nguồn mới nhất từ kho gốc về máy cá nhân và cập nhật lên kho fork.
- Ngăn ngừa tình trạng kho fork bị phân kỳ quá xa so với tiến độ phát triển của dự án chính.

---

## 🧩 Từ khóa hôm nay

### upstream
- **Nói dễ hiểu**: Tên bí danh quy ước trỏ về kho gốc của tác giả hoặc tổ chức tạo ra dự án ban đầu.
- **Ví dụ**: `git remote add upstream https://github.com/vuejs/core.git` để nối với kho gốc Vue.
- **Đừng nhầm**: Khác với `origin` vốn trỏ vào kho fork riêng của bạn; bạn thường chỉ có quyền đọc từ upstream.

### sync fork
- **Nói dễ hiểu**: Quá trình kéo các commit mới nhất từ kho gốc về kho fork cá nhân để không bị tụt lại phía sau.
- **Ví dụ**: Fetch từ upstream, gộp vào main máy bạn rồi đẩy lên origin.
- **Đừng nhầm**: Không làm mất code riêng của bạn nếu bạn làm việc trên các nhánh tính năng tách biệt.

### two-remote model
- **Nói dễ hiểu**: Mô hình cấu hình đồng thời 2 máy chủ từ xa: origin để đẩy code và upstream để nhận cập nhật.
- **Ví dụ**: `git remote -v` hiển thị cả cặp origin và upstream trong cùng một kho cục bộ.
- **Đừng nhầm**: Hai remote này hoàn toàn độc lập; bạn chỉ đẩy code lên origin và chỉ kéo cập nhật từ upstream.

---

## 📖 Định nghĩa
`upstream` là tên bí danh quy ước quốc tế dùng để chỉ kho lưu trữ từ xa gốc (Original Repository) của dự án. Trong mô hình Forking Workflow, `origin` trỏ về bản sao trên tài khoản cá nhân, còn `upstream` trỏ về nguồn cội ban đầu để bạn liên tục kéo các cập nhật mới về máy.

---

## 💡 Tại sao cần
Trong các dự án mã nguồn mở, kho gốc liên tục đón nhận các bản sửa lỗi và tính năng mới. Nếu kho fork của bạn không cấu hình `upstream` để đồng bộ thường xuyên, mã nguồn sẽ nhanh chóng lỗi thời. Khi tạo Pull Request, bạn sẽ gặp xung đột mã nguồn phức tạp và dễ bị từ chối duyệt.

---

## 🧠 Mental Model
Hãy hình dung kho gốc như dòng sông Mẹ ở thượng nguồn (Upstream). Kho fork cá nhân của bạn là con kênh nhỏ dẫn nước về cánh đồng nhà mình (Origin). Để con kênh không bị tù đọng, bạn cần mở cống đón nước (cấu hình remote upstream) để định kỳ dẫn dòng nước mát mới nhất từ sông Mẹ vào kênh.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Kỹ sư An chuẩn bị đóng góp mã nguồn cho dự án Vue.js gốc. Để đảm bảo tính tương thích với phiên bản mới nhất, An thêm remote gốc: `git remote add upstream https://github.com/vuejs/core.git`. Sau đó An chạy `git fetch upstream` và gộp vào nhánh chính bằng `git merge upstream/main`. Mã nguồn trên máy được cập nhật bản vá mới nhất, giúp An tự tin mở Pull Request mà không lo xung đột.

---

## 💻 Command & Cú pháp
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
- `git remote -v`: Xác nhận cấu hình có đủ 2 remote: origin (kho cá nhân) và upstream (kho gốc).
- `git fetch upstream`: Tải về toàn bộ commit và nhánh mới nhất từ kho gốc của tác giả.
- `git merge upstream/main`: Gộp các cập nhật mới nhất từ upstream vào nhánh main trên máy bạn.
- `git push origin main`: Đẩy các commit vừa cập nhật lên kho fork cá nhân trên GitHub.

---

## ⚠️ Sai lầm phổ biến
1. **Push nhầm vào upstream**: Bị báo lỗi từ chối vì bạn không có quyền ghi trực tiếp vào kho của tác giả.
2. **Quên đồng bộ upstream trước khi tạo nhánh mới**: Khiến bạn viết tính năng mới trên nền tảng code cũ đã lỗi thời.
3. **Sửa trực tiếp trên nhánh main cục bộ**: Nên giữ main luôn sạch sẽ để chỉ đồng bộ với upstream, mọi tính năng đều viết trên branch riêng.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình remote upstream và đối chiếu danh sách remote.
1. Thêm remote upstream trỏ tới kho mẫu bằng `git remote add upstream https://github.com/git-academy/original-project.git`.
2. Kiểm tra danh sách bằng `git remote -v` và xác nhận có cả origin và upstream.
3. Chạy `git fetch upstream` để tải các commit mới nhất từ kho gốc.
4. Gộp cập nhật vào nhánh main bằng `git merge upstream/main`.

---

## 💡 Hint & mẹo
> Ghi nhớ quy tắc vàng: Luôn kéo (pull/fetch) từ `upstream` về máy, và chỉ đẩy (push) lên `origin` của chính bạn.

---

## ✅ Validation & Kết quả mong đợi
- Danh sách `git remote -v` hiển thị đầy đủ cả hai remote origin và upstream.
- Nhánh main cục bộ cập nhật ngang bằng commit mới nhất của `upstream/main`.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về cấu hình remote upstream.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách kết hợp `git fetch upstream` với `git rebase upstream/main` trên nhánh tính năng cá nhân để giữ lịch sử commit luôn thẳng và sạch đẹp.

---

## 📝 Tổng kết
- `upstream` là tên quy ước trỏ về kho lưu trữ gốc của tác giả ban đầu.
- Dùng để định kỳ kéo các bản cập nhật mới nhất về máy tính cá nhân.
- Giúp kho fork cá nhân luôn bắt kịp tiến độ và tránh xung đột khi tạo PR.
