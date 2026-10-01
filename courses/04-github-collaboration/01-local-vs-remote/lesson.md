# Local vs Remote Repository

---

## 🎯 Mục tiêu
- Hiểu rõ sự khác biệt giữa kho lưu trữ trên máy cá nhân (Local) và kho lưu trữ từ xa (Remote).
- Nắm bắt vai trò của máy chủ đám mây như GitHub trong việc làm việc nhóm và lưu trữ dự phòng.
- Phân biệt các thao tác làm việc ngoại tuyến (commit) với các thao tác cần mạng (push, pull).

---

## 🧩 Từ khóa hôm nay

### Local Repository — kho lưu trữ trên máy
- **Nói dễ hiểu:** Kho Git nằm trên máy bạn. Nó lưu các commit và dữ liệu Git đã tải về; bản clone nông có thể chỉ chứa một phần lịch sử.
- **Ví dụ:** Khi bạn mất kết nối mạng Internet, bạn vẫn có thể tạo commit an toàn vào Local Repository.
- **Đừng nhầm:** Commit trên máy chưa tự bay lên mạng; dữ liệu lúc này chỉ mới nằm trên ổ cứng của bạn.

### Remote Repository — kho lưu trữ từ xa
- **Nói dễ hiểu:** Kho Git trên một máy chủ mà bạn kết nối qua mạng; GitHub là một dịch vụ lưu trữ phổ biến.
- **Ví dụ:** Địa chỉ `https://github.com/nhom-hoc-tap/web-app.git` là một Remote Repository trên GitHub.
- **Đừng nhầm:** Kho trên máy và kho từ xa hoàn toàn độc lập; chúng chỉ cập nhật cho nhau khi bạn ra lệnh.

### Push & Pull — đẩy lên và kéo về
- **Nói dễ hiểu:** `push` gửi commit từ máy lên remote. `pull` tải thay đổi về rồi tích hợp chúng vào nhánh hiện tại.
- **Ví dụ:** Sau khi làm xong bài tập, bạn `push` lên GitHub để bạn cùng nhóm `pull` về máy của bạn ấy.
- **Đừng nhầm:** Không có mạng thì không thể `push` hay `pull`, nhưng mọi thao tác viết code và commit trên máy vẫn chạy bình thường.

---

## 📖 Định nghĩa
Git lưu kho cục bộ trên máy và có thể trao đổi commit với một hoặc nhiều kho từ xa qua mạng. Bạn có thể tạo commit ngoại tuyến. Remote có thể nằm trên GitHub hoặc một máy chủ Git khác. Sau khi `fetch`, máy bạn biết trạng thái remote ở lần tải gần nhất; Git không tự hỏi máy chủ mỗi khi bạn xem nhánh.

---

## 🤔 Tại sao cần?
Bạn có thể sửa file, tạo nhánh, xem lịch sử và commit mà không có mạng. Khi muốn chia sẻ commit hoặc nhận thay đổi từ người khác, bạn cần kết nối tới remote. Remote hữu ích cho cộng tác và lưu bản sao, nhưng không thay thế chiến lược sao lưu riêng của tổ chức.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung Local Repository như cuốn sổ nhật ký cá nhân để trong ngăn bàn. Bạn thoải mái viết nháp, sửa chữa mỗi ngày mà không ai nhìn thấy. Remote Repository trên GitHub giống như chiếc bảng tin ở lớp học. Khi đã viết xong bài phân tích sạch đẹp trong sổ, bạn photo một bản dán lên bảng tin để các bạn cùng đọc và nhận xét.

---

## 🖼 Sơ đồ
```text
Mô hình Local vs Remote Repository:
Máy tính cá nhân (Local):       Máy chủ GitHub (Remote):
┌─────────────────────────┐     ┌─────────────────────────┐
│ Working Directory       │     │                         │
│ Staging Area            │     │  Remote Repository      │
│ Local Repo (.git)       │◄───►│  (origin/main)          │
│ (commit offline)        │     │  (lưu trữ đám mây)      │
└─────────────────────────┘     └─────────────────────────┘
        ▲                                    ▲
        └──────── push / fetch / pull ───────┘
```

---

## 🌎 Ví dụ thực tế
Bạn có thể tạo ba commit trên máy khi ngoại tuyến. Khi có mạng, `git push` gửi chúng tới remote nếu bạn có quyền ghi và lịch sử cho phép cập nhật. Đồng nghiệp cần `git fetch` hoặc `git pull` để nhận các commit đó.

---

## 💻 Command
```bash
git remote -v
git status
git branch -a
```

---

## 🔍 Giải thích command
- `git remote -v`: Xem danh sách và địa chỉ đường dẫn của các kho lưu trữ từ xa đang liên kết với máy bạn.
- `git status`: Hiển thị thay đổi cục bộ. Thông tin ahead/behind chỉ hiện nếu nhánh có upstream và dựa trên lần fetch gần nhất.
- `git branch -a`: Liệt kê nhánh cục bộ và các nhánh theo dõi từ xa đã biết sau những lần fetch trước.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ commit là tự động lên GitHub:** Commit chỉ lưu trên máy cá nhân; bạn phải chạy `git push` thì mã nguồn mới lên GitHub.
2. **Sợ mất mạng thì không dùng được Git:** Git hoạt động hoàn toàn không cần mạng; bạn chỉ cần Internet khi gửi hoặc nhận dữ liệu.
3. **Nhầm lẫn giữa Git và GitHub:** Git là công cụ quản lý phiên bản; GitHub là dịch vụ trang web lưu trữ kho Git trên mạng.

---

## 🧪 Lab
Bài học này là bài tự kiểm tra cấu hình liên kết từ xa trên máy tính của bạn:
1. Chạy `git remote -v`. Nếu không có kết quả, kho này chưa khai báo remote; đó là trạng thái bình thường.
2. Nếu có remote, chạy `git fetch <tên-remote>` (thường là `origin`) để cập nhật thông tin nhánh từ xa.
3. Chạy `git branch -a` để xem nhánh cục bộ và nhánh từ xa đã biết. Nếu chưa fetch hoặc remote chưa có nhánh, danh sách có thể trống.
4. Chạy `git status`. Chỉ đọc số ahead/behind nếu Git cho biết nhánh đang theo dõi một upstream.

---

## 💡 Hint
Nhớ khẩu quyết: Commit là cục bộ trên máy, Push mới là đưa dữ liệu lên máy chủ từ xa.

---

## ✅ Validation
- Nhận biết rõ ràng vị trí lưu trữ của Local Repository trên máy và Remote Repository trên GitHub.
- Phân biệt được sự khác nhau giữa commit ngoại tuyến và lệnh đồng bộ qua mạng.

---

## ❓ Quiz
Trả lời các câu hỏi sau để kiểm tra sự hiểu biết về mô hình Local và Remote Repository trong Git.

---

## 🔥 Challenge
Giải thích vì sao mô hình phân tán của Git vẫn an toàn ngay cả khi máy chủ GitHub gặp sự cố mất điện trong vài giờ.

---

## 📚 Tổng kết
- Kho cục bộ cho phép bạn làm việc và commit ngoại tuyến; lịch sử có thể không đầy đủ nếu clone nông.
- Remote là kho trên máy chủ, chẳng hạn GitHub, để chia sẻ và phối hợp.
- `fetch` cập nhật thông tin remote; `pull` còn tích hợp thay đổi vào nhánh hiện tại; `push` gửi commit lên remote.
