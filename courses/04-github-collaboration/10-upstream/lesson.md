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
- **Đừng nhầm**: `origin` và `upstream` chỉ là tên thường dùng. Git không giới hạn lệnh theo tên; hãy chọn đúng URL và quyền trước khi fetch hoặc push.

---

## 📖 Định nghĩa
Trong quy trình fork, nhóm thường đặt `origin` cho fork cá nhân và `upstream` cho kho gốc. Đây là quy ước tên, không phải từ khóa đặc biệt của Git. Trước khi chạy lệnh, kiểm tra `git remote -v` để biết mỗi bí danh thực sự trỏ tới đâu.

---

## 💡 Tại sao cần
Kho gốc có thể tiếp tục nhận thay đổi sau khi bạn fork. Fetch từ kho gốc giúp bạn xem các cập nhật mới; khi cần, tích hợp chúng vào nhánh làm việc theo quy định của dự án. Đồng bộ giảm nguy cơ làm việc trên lịch sử cũ nhưng không đảm bảo loại bỏ mọi conflict.

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
1. Trong một fork thật mà bạn đã clone, chạy `git remote -v` và xác nhận URL của `origin` trước khi tiếp tục.
2. Thêm URL kho gốc thật bằng `git remote add upstream <url-kho-goc>`; đừng dùng URL ví dụ chưa tồn tại.
3. Chạy `git fetch upstream`, rồi `git branch -r` để xem tên nhánh remote-tracking đã tải về.
4. Nếu nhánh gốc tên `main`, chuyển sang local `main` sau khi bảo đảm không có thay đổi chưa commit: `git switch main`.
5. Chạy `git merge upstream/main` chỉ khi chính sách dự án cho phép đồng bộ theo cách này. Nếu thành công và muốn cập nhật fork, dùng `git push origin main` khi có quyền ghi.

---

## 💡 Hint & mẹo
> Trong quy trình fork phổ biến, thường fetch từ `upstream` và push lên `origin`. Trước mỗi lần push, xác nhận URL đích và quyền của bạn.

---

## ✅ Validation & Kết quả mong đợi
- Danh sách `git remote -v` hiển thị đầy đủ cả hai remote origin và upstream.
- Nếu merge thành công, local `main` chứa cập nhật đã fetch từ upstream; nhánh có thể vẫn khác nếu dự án có commit riêng.

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
