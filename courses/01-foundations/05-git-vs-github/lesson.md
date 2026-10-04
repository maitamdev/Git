# Phân biệt Git với GitHub: Cỗ máy cục bộ và Bãi đỗ xe đám mây

---

## 🎯 Mục tiêu
- Xóa bỏ hoàn toàn sự nhầm lẫn kinh điển giữa công cụ cục bộ (Git) và nền tảng dịch vụ đám mây (GitHub).
- Nắm vững chu trình vận chuyển mã nguồn từ máy cá nhân lên kho chứa trên mây thông qua `push` và `pull`.
- Sử dụng lệnh `git remote -v` để kiểm tra các đường link kết nối máy chủ của dự án.

---

## 🧩 Từ khóa hôm nay

### Git — Động cơ quản lý phiên bản
- **Nói dễ hiểu:** Phần mềm cốt lõi cài trên máy tính cá nhân để theo dõi, quản lý và bảo vệ lịch sử mã nguồn của bạn.
- **Ví dụ:** Bạn gõ lệnh tạo commit lưu trạng thái code bài tập lớn trên chiếc laptop của mình hoàn toàn offline.
- **Đừng nhầm:** Git là phần mềm độc lập, không cần tài khoản, không phải là một website hay mạng xã hội.

### GitHub — Nền tảng lưu trữ và cộng tác trên mây
- **Nói dễ hiểu:** Dịch vụ trực tuyến cung cấp máy chủ lưu trữ kho Git, giúp các kỹ sư chia sẻ code, review sản phẩm và làm việc nhóm xuyên biên giới.
- **Ví dụ:** Nhóm bạn đưa dự án lên GitHub để người làm giao diện và người làm cơ sở dữ liệu cùng phối hợp nhịp nhàng.
- **Đừng nhầm:** GitHub không thay thế Git; nó chỉ là nơi chứa các repo Git trên Internet (tương tự như GitLab hay Bitbucket).

### Remote — Cầu nối liên kết từ xa
- **Nói dễ hiểu:** Địa chỉ đường dẫn lưu trong repo máy bạn trỏ thẳng tới kho lưu trữ tương ứng trên máy chủ GitHub.
- **Ví dụ:** Biệt danh `origin` đại diện cho đường dẫn kho GitHub của nhóm bạn.
- **Đừng nhầm:** Thiết lập remote chỉ là lưu địa chỉ liên lạc; Git không tự động bắn code đi nếu bạn chưa ra lệnh.

### Push — Đẩy mã nguồn lên máy chủ
- **Nói dễ hiểu:** Hành động vận chuyển toàn bộ các commit bạn đã đóng gói ở máy cá nhân lên kho lưu trữ trên GitHub.
- **Ví dụ:** Sau một ngày code xong và commit an toàn trên máy, bạn chạy lệnh push để đồng đội có thể nhận được code mới.
- **Đừng nhầm:** Push không tạo ra commit; lệnh này chỉ chuyển phát các commit đã có sẵn trên máy bạn lên mạng.

### Pull — Kéo và tích hợp mã nguồn về máy
- **Nói dễ hiểu:** Thao tác tải các commit mới nhất từ GitHub về và tự động gộp vào nhánh code bạn đang làm việc trên máy.
- **Ví dụ:** Trước khi bắt đầu một ngày làm việc mới, bạn pull về để cập nhật phần code trưởng nhóm vừa duyệt tối qua.
- **Đừng nhầm:** Pull không đơn thuần là tải file nén; nó chủ động tích hợp lịch sử và có thể yêu cầu bạn xử lý xung đột nếu có.

---

## 🤔 Tại sao cần?
Có đến chín mươi phần trăm sinh viên mới học nhầm lẫn Git và GitHub là một. Sự ngộ nhận này cực kỳ nguy hiểm: bạn tưởng rằng cứ commit trên máy là đồng đội hay giảng viên đã xem được bài tập! Git là công cụ quản lý trên máy tính của bạn, còn GitHub là máy chủ trung gian để cả nhóm nhìn thấy công việc của nhau. Hiểu rõ sự phân tách này giúp bạn kiểm soát hoàn toàn quy trình: khi nào code an toàn trong máy, và khi nào code chính thức được công khai cho thế giới.

---

## 📖 Định nghĩa
Git là phần mềm mã nguồn mở chạy cục bộ để quản lý lịch sử tệp tin. GitHub là dịch vụ điện toán đám mây cung cấp không gian lưu trữ và công cụ cộng tác cho các kho Git. Hai nền tảng kết nối với nhau thông qua cấu hình remote cùng các thao tác push và pull.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy liên tưởng đến chiếc điện thoại của bạn: Git giống như ứng dụng Camera dùng để chụp và lưu ảnh vào bộ nhớ máy; còn GitHub giống như mạng xã hội Instagram. Bạn chụp ảnh (commit) thì ảnh mới chỉ nằm trên máy bạn. Muốn bạn bè chiêm ngưỡng và thả tim, bạn bắt buộc phải ấn nút Đăng ảnh (push) lên mạng!

---

## 🖼 Sơ đồ
```text
Máy tính của bạn (Cục bộ)                Nền tảng GitHub (Đám mây)
┌─────────────────────────┐               ┌─────────────────────────┐
│ [Commit vừa tạo ở máy]  │ ─── push ───► │ [Kho lưu trữ chung]     │
│                         │               │  └── Đồng đội tải về    │
│ [Mã nguồn đang làm việc]│ ◄── pull ──── │ [Thay đổi nhóm vừa đưa] │
└─────────────────────────┘               └─────────────────────────┘
Lưu ý: Commit tạo ở máy KHÔNG BAO GIỜ tự bay lên GitHub nếu chưa push!
```

---

## 🌎 Ví dụ thực tế
Hạn nộp bài tập lớn là nửa đêm. Bạn Hùng hoàn thành code lúc 23h50 và hí hửng commit trên máy tính cá nhân rồi đi ngủ. Sáng hôm sau tỉnh dậy, giảng viên chấm điểm không vì kho GitHub của bạn hoàn toàn trống trơn! Hùng đã mắc lỗi kinh điển: quên gõ lệnh push để vận chuyển các commit từ laptop lên đám mây trước hạn chót.

---

## 💻 Command
```bash
git remote -v
```

---

## 🔍 Giải thích command
`git remote -v` là câu lệnh giúp bạn tra cứu danh bạ kết nối máy chủ của kho chứa. Lệnh này hiển thị tên viết tắt (thường là `origin`) kèm theo địa chỉ đường dẫn đầy đủ mà bạn dùng để gửi (push) hoặc nhận (pull) mã nguồn với GitHub. Nếu câu lệnh không in ra kết quả nào, nghĩa là dự án hiện tại của bạn hoàn toàn cô lập và chưa được kết nối với bất kỳ dịch vụ đám mây nào.

---

## ⚠️ Sai lầm phổ biến
1. **Ảo tưởng rằng tạo commit trên máy là GitHub tự cập nhật:** Bạn bắt buộc phải thực thi lệnh push thì các commit cục bộ mới xuất hiện trên trang web GitHub.
2. **Đăng ký tài khoản GitHub nhưng máy chưa cài Git:** GitHub chỉ là trang web; máy tính bạn bắt buộc phải cài đặt phần mềm Git thì mới có thể chạy các câu lệnh từ terminal.
3. **Nhầm lẫn giữa tải file ZIP và lệnh `git pull`:** Tải file ZIP làm mất sạch lịch sử liên kết và không thể gộp code thông minh như lệnh pull chuyên dụng của Git.

---

## 🧪 Lab
1. Gõ lệnh `git remote -v` trên cửa sổ dòng lệnh mô phỏng để kiểm tra liên kết máy chủ.
2. Nếu hệ thống không trả về kết quả, hãy giải thích trạng thái hiện tại của kho chứa.
3. Phân biệt rõ sự khác nhau về mặt vật lý giữa commit nằm ở máy bạn và commit nằm trên máy chủ GitHub.

---

## 💡 Hint
Hãy ghi nhớ câu châm ngôn: "Commit là lưu vào máy, Push là gửi lên mây." Luôn chạy `git remote -v` để biết chắc chắn code của mình sẽ được bắn về địa chỉ nào.

---

## ✅ Validation
- Phân biệt chuẩn xác bản chất và chức năng giữa Git (công cụ) và GitHub (nền tảng đám mây).
- Giải thích được tại sao commit trên máy cá nhân chưa thể hiển thị trên giao diện web GitHub.
- Sử dụng thành thạo `git remote -v` để kiểm tra cấu hình kết nối từ xa của repository.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để khắc sâu sự phân biệt giữa Git và GitHub. Đọc kỹ phân tích của giảng viên sau mỗi câu hỏi.

---

## 🔥 Challenge
Hãy đóng vai một kỹ sư hướng dẫn giải thích cho một bạn thực tập sinh mới vào công ty hiểu vì sao công ty có thể dùng Git chung với GitLab hoặc Bitbucket mà không nhất thiết phải dùng GitHub.

---

## 📚 Tổng kết
- Git là phần mềm quản lý phiên bản chạy trực tiếp trên máy tính cá nhân của bạn.
- GitHub là dịch vụ lưu trữ kho Git trên đám mây, phục vụ mục đích chia sẻ và cộng tác nhóm.
- Luôn chủ động thực hiện lệnh push để đưa các mốc commit an toàn từ máy tính lên máy chủ dùng chung.

