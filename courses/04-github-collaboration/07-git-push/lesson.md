# Đẩy commit lên server với git push

---

## 🎯 Mục tiêu
- Sử dụng câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub.
- Hiểu rõ ý nghĩa của cờ `-u` (`--set-upstream`) trong lần push đầu tiên của một nhánh mới.
- Chẩn đoán và xử lý tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).
- Nhận thức rõ mức độ nguy hiểm và quy tắc cấm kỵ đối với cờ cưỡng chế `--force` trên các nhánh dùng chung.

---

## 🧩 Từ khóa hôm nay

### git push
- **Nói dễ hiểu**: Lệnh tải toàn bộ commit mới từ máy tính của bạn lên máy chủ lưu trữ chung của dự án.
- **Ví dụ**: `git push origin main` để đưa các commit cá nhân lên máy chủ GitHub.
- **Đừng nhầm**: Không tải code của người khác về máy; lệnh chỉ gửi dữ liệu theo chiều từ máy bạn lên đám mây.

### -u (set upstream)
- **Nói dễ hiểu**: Tùy chọn ghi nhớ nhánh tương ứng trên máy chủ, giúp những lần sau chỉ cần gõ `git push`.
- **Ví dụ**: `git push -u origin feature-auth` trong lần đẩy nhánh đầu tiên.
- **Đừng nhầm**: Chỉ cần gõ một lần duy nhất khi tạo nhánh mới trên server; các lần sau không cần lặp lại cờ `-u`.

### rejected non-fast-forward
- **Nói dễ hiểu**: Lỗi máy chủ từ chối nhận code vì trên server có commit mới mà máy bạn chưa tải về.
- **Ví dụ**: Đồng nghiệp vừa push trước bạn vài phút, bạn push sẽ nhận thông báo bị từ chối non-fast-forward.
- **Đừng nhầm**: Đừng vội gõ `--force` để ép ghi đè; giải pháp đúng là chạy `git pull` để gộp code trước rồi push lại.

---

## 📖 Định nghĩa
`git push` là lệnh xuất bản mã nguồn trong Git, truyền tải các commit snapshot từ máy tính cá nhân lên kho lưu trữ từ xa trên GitHub và cập nhật con trỏ nhánh trên máy chủ. Đây là bước quan trọng để chia sẻ kết quả lập trình cá nhân với toàn thể đội ngũ.

---

## 💡 Tại sao cần
Dù bạn viết code hay đến đâu trên máy cá nhân, nếu chưa đẩy lên máy chủ thì đồng nghiệp và hệ thống kiểm thử CI/CD vẫn không thể tiếp cận. Nắm vững `git push` giúp bạn công bố tính năng an toàn, xử lý nhanh khi bị từ chối do xung đột và tránh ghi đè dữ liệu của nhóm.

---

## 🧠 Mental Model
Hãy hình dung viết commit trên máy tính như nhà văn viết một chương truyện mới tại phòng riêng. `git push` là hành động gửi chương truyện đó tới tòa soạn báo để xuất bản. Nếu tòa soạn báo cho biết đã có chương truyện khác vừa xuất bản trước đó, bạn cần nhận bản mới về đọc rồi mới gửi tiếp.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế hoạt động của git push:
Máy tính cá nhân (Local):       Máy chủ GitHub (Remote origin):
Nhánh main: C1 ──► C2 ──► C3    Nhánh main: C1 ──► C2
            │                               │
            └──────── git push origin main ─┘
            (Đẩy C3 lên, cập nhật con trỏ remote main lên C3)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Tuấn hoàn thành chức năng tìm kiếm trên nhánh feature-search với 3 commit mới. Tuấn gõ lệnh `git push -u origin feature-search`. Git kết nối bảo mật tới GitHub, tạo nhánh mới trên server và đồng bộ commit. Terminal cung cấp sẵn đường dẫn trực tiếp để Tuấn tạo Pull Request trên giao diện web cho đồng nghiệp cùng review.

---

## 💻 Command & Cú pháp
```bash
git push
git push origin <tên-nhánh>
git push -u origin <tên-nhánh>
git push origin --all
git push origin --delete <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git push`: Đẩy commit lên remote và nhánh mặc định đã được thiết lập tracking.
- `git push origin <tên-nhánh>`: Đẩy nhánh chỉ định lên remote mang tên origin.
- `git push -u origin <nhánh>`: Đẩy lên và ghi nhớ mối quan hệ upstream tracking để rút gọn lệnh sau này.
- `git push origin --all`: Đẩy toàn bộ các nhánh cục bộ hiện có lên máy chủ cùng lúc.
- `git push origin --delete <nhánh>`: Xóa bỏ một con trỏ nhánh trên máy chủ từ xa GitHub.

---

## ⚠️ Sai lầm phổ biến
1. **Lạm dụng cờ --force khi bị từ chối non-fast-forward**: Sẽ xóa mất các commit mà đồng nghiệp vừa đẩy lên máy chủ.
2. **Quên cờ -u trong lần push đầu tiên của nhánh mới**: Khiến Git yêu cầu chỉ định rõ remote và branch ở những lần push tiếp theo.
3. **Vô tình đẩy file chứa mật khẩu hoặc mã khóa bí mật**: Dễ làm lộ thông tin nhạy cảm lên GitHub công khai; cần kiểm tra kỹ trước khi push.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác đẩy nhánh lên remote và kiểm tra liên kết upstream.
1. Tạo một nhánh mới `demo-push` và tạo một commit mới trên nhánh này.
2. Chạy lệnh `git push -u origin demo-push` để đưa nhánh lên remote.
3. Quan sát thông điệp phản hồi từ máy chủ GitHub xác nhận nhánh đã được tạo.
4. Xóa nhánh trên remote để dọn dẹp bằng `git push origin --delete demo-push`.

---

## 💡 Hint & mẹo
> Khi bị lỗi rejected non-fast-forward, hãy bình tĩnh chạy `git pull` trước để tích hợp code mới nhất từ đồng nghiệp, sau đó mới push lại.

---

## ✅ Validation & Kết quả mong đợi
- Commit xuất hiện đầy đủ trên nhánh tương ứng tại máy chủ GitHub.
- Lệnh `git status` báo nhánh cục bộ đã đồng bộ hoàn toàn với `origin/<nhánh>`.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về câu lệnh git push.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cơ chế bảo vệ nhánh (Branch Protection Rules) trên GitHub để hiểu vì sao các nhánh chính như `main` thường bị cấm push trực tiếp hoặc cấm push force.

---

## 📝 Tổng kết
- `git push` đưa các commit từ kho cục bộ lên máy chủ từ xa GitHub.
- Dùng cờ `-u` ở lần push đầu tiên để thiết lập liên kết theo dõi upstream.
- Tuyệt đối không dùng cờ `--force` bừa bãi trên các nhánh dùng chung của nhóm.
