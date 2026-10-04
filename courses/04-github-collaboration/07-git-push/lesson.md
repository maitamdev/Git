# Đẩy commit lên server với git push

---

## 🎯 Mục tiêu
- Sử dụng thành thạo câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub an toàn.
- Nắm vững vai trò và ý nghĩa của cờ `-u` (`--set-upstream`) khi thiết lập nhánh mới lần đầu tiên.
- Nhận diện và xử lý chuẩn xác tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).
- Thấu hiểu rủi ro nghiêm trọng của cờ cưỡng chế `--force` và quy tắc vàng bảo vệ các nhánh dùng chung.

---

## 🧩 Từ khóa hôm nay

### git push
- **Nói dễ hiểu:** Lệnh tải toàn bộ các commit mới từ máy tính của bạn lên máy chủ lưu trữ GitHub của dự án.
- **Ví dụ:** Lệnh `git push origin main` đưa các commit bạn vừa tạo lên nhánh chính trên máy chủ từ xa.
- **Đừng nhầm:** Lệnh chỉ đẩy các commit đã lưu trong kho cục bộ lên mây; những thay đổi chưa commit trong file sẽ không được gửi đi.

### -u / --set-upstream — thiết lập theo dõi
- **Nói dễ hiểu:** Tùy chọn giúp Git ghi nhớ nhánh trên máy chủ làm đích đến mặc định cho nhánh cục bộ hiện tại.
- **Ví dụ:** Bạn gõ `git push -u origin feature-cart` ở lần đầu; từ những lần sau bạn chỉ cần gõ vắn tắt `git push`.
- **Đừng nhầm:** Bạn chỉ cần truyền cờ `-u` duy nhất một lần khi xuất bản nhánh mới; không cần gõ lặp lại ở các lần push kế tiếp.

### rejected non-fast-forward — từ chối đẩy code
- **Nói dễ hiểu:** Lỗi máy chủ từ chối nhận code vì trên GitHub đang có commit mới của đồng đội mà máy bạn chưa kéo về.
- **Ví dụ:** Đồng đội vừa push commit lên nhánh `main`, bạn chưa kịp pull mà bấm push thì Git sẽ lập tức chặn lại để bảo vệ dữ liệu.
- **Đừng nhầm:** Tuyệt đối không dùng cờ `--force` để ép ghi đè xóa mất code của đồng đội; giải pháp chuẩn là `git pull` về gộp rồi mới push lại.

---

## 📖 Định nghĩa
`git push` là lệnh xuất bản mã nguồn trong Git, có nhiệm vụ truyền tải các commit mới từ kho lưu trữ cục bộ trên máy tính cá nhân lên kho lưu trữ từ xa trên máy chủ GitHub và cập nhật con trỏ nhánh tương ứng, giúp toàn bộ đội ngũ có thể tiếp cận và sử dụng thành quả làm việc của bạn.

---

## 🤔 Tại sao cần?
Dù bạn có viết ra những dòng mã nguồn xuất sắc đến đâu trên máy tính cá nhân, dự án vẫn không thể hoàn thành nếu các commit đó bị cô lập ở ổ cứng của bạn. Lệnh `git push` là cầu nối công khai thành quả, kích hoạt các pipeline kiểm thử tự động CI/CD và mở đường cho quy trình phản biện mã nguồn (Code Review) chuyên nghiệp trước khi đưa tính năng lên môi trường Production.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc viết commit trên máy tính như một tác giả đang viết bản thảo từng chương sách trong phòng kín. Câu lệnh `git push` chính là hành động đem các chương bản thảo hoàn thiện đó nộp lên nhà xuất bản để in ấn và phát hành ra công chúng. Nếu nhà xuất bản thông báo đã có tác giả khác vừa nộp bản chỉnh sửa trước, bạn bắt buộc phải nhận về đối chiếu trước khi gửi tiếp.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ XUẤT BẢN COMMIT CỦA LỆNH GIT PUSH:

Máy tính cá nhân (Local):       Máy chủ GitHub (Remote origin):
Nhánh main: C1 ──► C2 ──► C3    Nhánh main: C1 ──► C2
            │                               │
            └──────── git push origin main ─┘
            (Đẩy C3 lên, cập nhật con trỏ remote main lên C3)
```

---

## 🌎 Ví dụ thực tế
Sau khi hoàn thiện chức năng bộ lọc tìm kiếm sản phẩm với 3 commit trau chuốt, bạn gõ lệnh `git push -u origin feature-search`. Git lập tức truyền các commit lên GitHub, tạo nhánh mới trên máy chủ và thiết lập liên kết theo dõi. Terminal phản hồi một đường dẫn tiện lợi giúp bạn bấm vào để mở Pull Request mời đồng đội thẩm định mã nguồn ngay lập tức.

---

## 💻 Command
```bash
git push
git push origin main
git push -u origin feature-login
git push origin --delete old-feature
```

---

## 🔍 Giải thích command
- `git push`: Đẩy các commit lên remote và nhánh mặc định đã được cấu hình tracking từ trước.
- `git push origin main`: Đẩy nhánh cục bộ `main` lên máy chủ remote mang tên `origin`.
- `git push -u origin feature-login`: Xuất bản nhánh mới lên server kèm thiết lập upstream tracking để các lần sau chỉ cần gõ `git push`.
- `git push origin --delete old-feature`: Gửi lệnh yêu cầu máy chủ GitHub xóa bỏ hoàn toàn nhánh `old-feature` từ xa sau khi đã hoàn thành tích hợp.

---

## ⚠️ Sai lầm phổ biến
1. **Lạm dụng cờ ép buộc `--force` khi bị từ chối**: Xóa vĩnh viễn commit của các thành viên khác trên máy chủ trung tâm, gây tê liệt cả đội dự án.
2. **Quên cờ `-u` ở lần đẩy nhánh mới đầu tiên**: Khiến Git liên tục yêu cầu bạn phải gõ đầy đủ tên remote và tên branch ở mọi lần đẩy tiếp theo.
3. **Vô tình push nhầm file chứa mã khóa bí mật hoặc mật khẩu**: Gây rò rỉ an ninh nghiêm trọng khi đưa tệp cấu hình chứa API key lên GitHub công khai.

---

## 🧪 Lab
1. Chạy lệnh: `git status` để kiểm tra số lượng commit mới đang nằm chờ đẩy lên máy chủ.
2. Tạo một nhánh tính năng mới: `git switch -c feature-demo-push`.
3. Tạo một commit nhỏ để thử nghiệm: `git commit --allow-empty -m "feat: test push command"`.
4. Xuất bản nhánh tính năng lên remote kèm theo cờ theo dõi: `git push -u origin feature-demo-push`.
5. Kiểm tra thông tin liên kết vừa thiết lập bằng lệnh: `git branch -vv`.

---

## 💡 Hint
> Hãy ghi nhớ lời răn vàng của các kỹ sư Git lão luyện: "Khi bị máy chủ từ chối vì non-fast-forward, hãy xem đó là món quà cứu nguy chứ không phải chướng ngại. Đừng bao giờ gõ force push mà hãy pull về gộp trước!"

---

## ✅ Validation
- Nhận thức chuẩn xác vai trò của cờ `-u` trong lần đầu xuất bản nhánh lên máy chủ.
- Hiểu rõ nguyên nhân và hướng xử lý chuẩn tắc khi bị từ chối với lỗi non-fast-forward.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để rà soát kiến thức về các câu lệnh và tùy chọn của `git push`.

---

## 🔥 Challenge
Trong thực tế, khi nào lập trình viên được phép sử dụng cờ `--force-with-lease` thay vì `--force` thông thường? Tại sao các chuyên gia DevOps lại coi `--force-with-lease` là giải pháp thay thế an toàn hơn rất nhiều?

---

## 📚 Tổng kết
- `git push` truyền tải các commit từ kho cục bộ lên máy chủ đám mây GitHub.
- Sử dụng `-u` (`--set-upstream`) để gắn kết nhánh cục bộ với nhánh trên server.
- Tuyệt đối tôn trọng quy tắc an toàn dữ liệu, không bao giờ dùng `--force` bừa bãi lên nhánh chung.
