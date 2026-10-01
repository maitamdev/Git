# Phân biệt Git vs GitHub

---

## 🎯 Mục tiêu
- Nói được Git là công cụ còn GitHub là dịch vụ trực tuyến.
- Phân biệt việc lưu trên máy với việc chia sẻ qua mạng.
- Biết GitHub không phải nơi duy nhất có thể lưu repository từ xa.

---

## 🧩 Từ khóa hôm nay

### Git — công cụ quản lý phiên bản
- **Nói dễ hiểu:** Phần mềm trên máy giúp bạn lưu mốc và xem lịch sử của dự án.
- **Ví dụ:** Bạn dùng lệnh Git để lưu thay đổi trong bài tập của mình.
- **Đừng nhầm:** Git không phải một trang web; nhiều thao tác của Git chạy ngay trên máy.

### GitHub — dịch vụ cộng tác trực tuyến
- **Nói dễ hiểu:** Một dịch vụ trên Internet để lưu repository Git và phối hợp với người khác.
- **Ví dụ:** Nhóm có thể đưa repository lên GitHub để cùng xem và góp ý.
- **Đừng nhầm:** GitHub không phải tên khác của Git; còn có dịch vụ khác như GitLab.

### Remote — kho lưu trữ từ xa
- **Nói dễ hiểu:** Repository ở một nơi khác mà kho Git trên máy có thể trao đổi dữ liệu với.
- **Ví dụ:** Nhóm đặt một remote trỏ tới repository trên GitHub.
- **Đừng nhầm:** Có remote không làm Git tự đồng bộ; bạn vẫn cần gửi hoặc lấy thay đổi.

### Push — gửi commit lên remote
- **Nói dễ hiểu:** Thao tác chuyển commit từ kho trên máy lên nơi chia sẻ.
- **Ví dụ:** Push commit sau khi hoàn thành một phần bài tập để bạn cùng nhóm xem.
- **Đừng nhầm:** Commit chưa tự xuất hiện trên GitHub nếu bạn chưa push.

---

## 📖 Định nghĩa
Git là công cụ quản lý lịch sử trên máy tính của bạn. GitHub là một dịch vụ trực tuyến có thể lưu repository Git và giúp nhóm cộng tác. Bạn có thể tạo commit khi offline; để gửi commit lên GitHub thì cần kết nối mạng và quyền truy cập phù hợp.

---

## 🤔 Tại sao cần?
Người mới thường tưởng Git chỉ dùng được khi mở GitHub. Thực ra Git lưu lịch sử trên máy; GitHub là một nơi trực tuyến để chia sẻ repository. Phân biệt hai việc này giúp bạn biết khi nào cần Internet.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ Git là cuốn sổ lịch sử nằm trên máy bạn. GitHub là một bản repository đặt trên mạng để bạn gửi commit lên hoặc lấy thay đổi về.

---

## 🖼 Sơ đồ
```text
Máy của bạn                         Dịch vụ trực tuyến
┌─────────────────────┐   push    ┌─────────────────────┐
│ Git                 │ ────────► │ GitHub              │
│ commit được lưu đây │ ◄──────── │ repository được lưu │
└─────────────────────┘   pull    └─────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Bạn đang đi học và mất mạng. Bạn vẫn có thể sửa bài và tạo commit bằng Git trên máy. Khi có mạng lại, bạn dùng `git push` để gửi commit lên GitHub. Việc push còn cần remote đã được cấu hình và quyền truy cập phù hợp.

---

## 💻 Command
```bash
git remote -v
git push
git pull
```

---

## 🔍 Giải thích command
- `git remote -v`: Xem nơi repository trên máy đang kết nối tới, nếu có.
- `git push`: Gửi commit từ máy lên remote.
- `git pull`: Lấy thay đổi từ remote về và tích hợp vào nhánh hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Gọi GitHub là Git**: Git là công cụ; GitHub là một dịch vụ có dùng Git.
2. **Tưởng commit tự xuất hiện trên GitHub**: Commit trên máy chưa được gửi đi cho tới khi push.
3. **Tưởng luôn cần Internet**: Nhiều thao tác Git cục bộ vẫn dùng được offline.

---

## 🧪 Lab
1. Chạy `git remote -v` để kiểm tra repository đã có remote chưa.
2. Nếu kết quả trống, ghi lại: “Chưa có nơi từ xa được cấu hình”.
3. Giải thích khi nào bạn cần mạng: lúc muốn trao đổi commit với remote.

---

## 💡 Hint
> Git lưu lịch sử trên máy; push và pull trao đổi thay đổi với remote.

---

## ✅ Validation
- Phân biệt chính xác vai trò của Git cục bộ và nền tảng đám mây GitHub.

---

## ❓ Quiz
Làm bài trắc nghiệm sau để xác thực sự phân biệt giữa Git và GitHub.

---

## 🔥 Challenge
Viết hai câu mô tả khác nhau: một câu cho Git và một câu cho GitHub.

---

## 📚 Tổng kết
- Git giúp lưu và xem lịch sử dự án trên máy.
- GitHub là một dịch vụ trực tuyến để lưu repository Git và cộng tác.
- Push gửi commit lên remote; pull lấy thay đổi từ remote về.
