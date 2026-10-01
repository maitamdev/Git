# Local vs Remote Repository

---

## 🎯 Mục tiêu
- Hiểu rõ sự khác biệt giữa kho lưu trữ trên máy cá nhân (Local) và kho lưu trữ từ xa (Remote).
- Nắm bắt vai trò của máy chủ đám mây như GitHub trong việc làm việc nhóm và lưu trữ dự phòng.
- Phân biệt các thao tác làm việc ngoại tuyến (commit) với các thao tác cần mạng (push, pull).

---

## 🧩 Từ khóa hôm nay

### Local Repository — kho lưu trữ trên máy
- **Nói dễ hiểu:** Lịch sử phiên bản hoàn chỉnh của dự án nằm ngay trong thư mục ẩn `.git` trên máy tính của bạn.
- **Ví dụ:** Khi bạn mất kết nối mạng Internet, bạn vẫn có thể tạo commit an toàn vào Local Repository.
- **Đừng nhầm:** Commit trên máy chưa tự bay lên mạng; dữ liệu lúc này chỉ mới nằm trên ổ cứng của bạn.

### Remote Repository — kho lưu trữ từ xa
- **Nói dễ hiểu:** Kho chứa dự án được đặt trên một máy chủ đám mây (như GitHub) để cả nhóm cùng chia sẻ.
- **Ví dụ:** Địa chỉ `https://github.com/nhom-hoc-tap/web-app.git` là một Remote Repository trên GitHub.
- **Đừng nhầm:** Kho trên máy và kho từ xa hoàn toàn độc lập; chúng chỉ cập nhật cho nhau khi bạn ra lệnh.

### Push & Pull — đẩy lên và kéo về
- **Nói dễ hiểu:** Hai thao tác đồng bộ: `push` đưa commit từ máy lên GitHub; `pull` tải commit mới từ GitHub về máy.
- **Ví dụ:** Sau khi làm xong bài tập, bạn `push` lên GitHub để bạn cùng nhóm `pull` về máy của bạn ấy.
- **Đừng nhầm:** Không có mạng thì không thể `push` hay `pull`, nhưng mọi thao tác viết code và commit trên máy vẫn chạy bình thường.

---

## 📖 Định nghĩa
Trong mô hình phân tán của Git, Local Repository là kho chứa nằm trên ổ đĩa máy tính của bạn, cho phép bạn làm việc độc lập. Remote Repository là kho chứa đặt trên máy chủ đám mây như GitHub. Hai kho này tồn tại tách biệt và chỉ trao đổi dữ liệu qua mạng khi bạn dùng các lệnh đồng bộ.

---

## 🤔 Tại sao cần?
Một mình bạn làm việc trên máy tính thì không cần mạng. Nhưng để làm việc nhóm, chia sẻ mã nguồn với đồng nghiệp hoặc tạo bản sao lưu an toàn phòng khi máy hỏng, bạn bắt buộc phải kết nối kho trên máy với một kho từ xa trên GitHub.

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
Bạn ngồi trên xe bus không có mạng Wi-Fi nhưng vẫn mở máy tính ra viết code và tạo 3 commit mới trên Local Repository. Tối về đến nhà có mạng, bạn gõ lệnh `git push` để đưa toàn bộ 3 commit đó lên kho GitHub của nhóm. Bạn cùng nhóm mở máy ra tải về xem mà không gặp bất kỳ trở ngại nào.

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
- `git status`: Hiển thị nhánh hiện tại đang đi trước (ahead) hay đi sau (behind) nhánh từ xa bao nhiêu commit.
- `git branch -a`: Liệt kê tất cả các nhánh, bao gồm cả các nhánh cục bộ và nhánh theo dõi từ xa.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ commit là tự động lên GitHub:** Commit chỉ lưu trên máy cá nhân; bạn phải chạy `git push` thì mã nguồn mới lên GitHub.
2. **Sợ mất mạng thì không dùng được Git:** Git hoạt động hoàn toàn không cần mạng; bạn chỉ cần Internet khi gửi hoặc nhận dữ liệu.
3. **Nhầm lẫn giữa Git và GitHub:** Git là công cụ quản lý phiên bản; GitHub là dịch vụ trang web lưu trữ kho Git trên mạng.

---

## 🧪 Lab
Bài học này là bài tự kiểm tra cấu hình liên kết từ xa trên máy tính của bạn:
1. Chạy lệnh `git remote -v` để kiểm tra kho lưu trữ hiện tại có liên kết từ xa nào không.
2. Chạy `git branch -a` để quan sát danh sách các nhánh, chú ý các nhánh có tiền tố `remotes/origin/`.
3. Chạy `git status` để đọc thông báo so sánh giữa nhánh trên máy và nhánh từ xa.

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
- Local Repo nằm hoàn chỉnh trên máy tính cá nhân, hỗ trợ làm việc ngoại tuyến 100%.
- Remote Repo nằm trên máy chủ GitHub dùng để chia sẻ, sao lưu và làm việc nhóm.
- Hai kho hoàn toàn độc lập, chỉ trao đổi dữ liệu khi bạn chủ động chạy `push` hoặc `pull`.
