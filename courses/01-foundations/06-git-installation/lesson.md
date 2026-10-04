# Cài đặt Git và chọn terminal: Thiết lập vũ khí cho lập trình viên

---

## 🎯 Mục tiêu
- Tự tay thiết lập môi trường Git chuẩn chỉ trên các hệ điều hành phổ biến (Windows, macOS, Linux).
- Hiểu rõ cơ chế biến môi trường PATH giúp terminal triệu hồi lệnh `git` từ bất kỳ đâu.
- Sử dụng lệnh `git --version` để nghiệm thu quá trình cài đặt thành công trên máy thật.

---

## 🧩 Từ khóa hôm nay

### Terminal — Cửa sổ dòng lệnh
- **Nói dễ hiểu:** Môi trường giao tiếp trực tiếp bằng văn bản với hệ điều hành, nơi bạn nhập các câu lệnh để ra lệnh cho máy tính.
- **Ví dụ:** Ứng dụng PowerShell trên Windows hoặc Terminal trên máy Mac.
- **Đừng nhầm:** Terminal chỉ là cái vỏ giao diện nhận lệnh; Git là chương trình thực thi được gọi từ bên trong cái vỏ đó.

### CLI (Command-Line Interface) — Giao diện dòng lệnh
- **Nói dễ hiểu:** Phương thức làm việc của lập trình viên chuyên nghiệp bằng cách gõ lệnh chuẩn xác thay vì dùng chuột bấm trên giao diện đồ họa.
- **Ví dụ:** Bạn gõ `git --version` để kiểm tra phiên bản thay vì tìm một biểu tượng ứng dụng để nhấn chuột.
- **Đừng nhầm:** CLI đòi hỏi bạn phải nhớ cú pháp và hiểu bản chất, nhưng mang lại quyền năng tự động hóa và tốc độ vượt trội.

### Git Bash — Cửa sổ lệnh Unix cho Windows
- **Nói dễ hiểu:** Trình giả lập môi trường dòng lệnh Linux kèm theo bộ cài Git for Windows, giúp bạn gõ các lệnh Unix quen thuộc trên Windows.
- **Ví dụ:** Bạn mở Git Bash để vừa gõ lệnh Git vừa dùng được các tiện ích dòng lệnh như liệt kê tệp hay tìm kiếm văn bản.
- **Đừng nhầm:** Bạn không bắt buộc phải dùng Git Bash; PowerShell hay Command Prompt đều chạy được Git nếu cấu hình PATH chuẩn.

### PATH — Biến môi trường định vị chương trình
- **Nói dễ hiểu:** Cuốn danh bạ ghi các đường dẫn thư mục mà hệ điều hành sẽ tự động lục tìm mỗi khi bạn gõ tên một câu lệnh.
- **Ví dụ:** Khi bạn gõ `git`, máy tính tra trong biến PATH để biết file thực thi `git.exe` đang nằm ở thư mục nào.
- **Đừng nhầm:** PATH là thiết lập của hệ điều hành máy tính, hoàn toàn tách biệt với các tệp mã nguồn trong dự án của bạn.

---

## 🤔 Tại sao cần?
Cài đặt công cụ là bài kiểm tra nhập môn đầu tiên của mọi kỹ sư. Nhiều bạn tải bộ cài về, bấm Next liên tục trong vô thức rồi hoang mang không hiểu tại sao terminal báo lỗi không nhận lệnh. Khi nắm vững kiến thức cài đặt và biến môi trường PATH, bạn không chỉ tự tin cấu hình Git trên chiếc laptop cá nhân mà còn sẵn sàng thiết lập môi trường làm việc trên các máy chủ đám mây từ xa chạy Linux mà không hề bỡ ngỡ.

---

## 📖 Định nghĩa
Cài đặt Git là quá trình đưa tệp thực thi của Git vào hệ điều hành và bổ sung đường dẫn vào biến môi trường PATH. Nhờ đó, bất kỳ cửa sổ dòng lệnh nào cũng có thể nhận diện và thực thi câu lệnh `git`. Bạn có thể tải bộ cài chuẩn tại trang chủ git-scm.com.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy coi Git là một cuốn từ điển bách khoa toàn thư vừa được bạn mua về nhà. Biến môi trường PATH giống như việc bạn dán một tờ giấy hướng dẫn ở phòng khách ghi rõ: "Từ điển để ở giá sách tầng hai". Bất kỳ ai trong nhà (PowerShell hay Git Bash) chỉ cần nhìn vào tờ giấy đó là tìm thấy từ điển ngay!

---

## 🖼 Sơ đồ
```text
Bạn gõ "git --version" vào Terminal
               │
               ▼
Hệ điều hành tra cứu biến PATH: C:\Program Files\Git\cmd
               │
               ▼
Khởi chạy git.exe và trả về kết quả: git version 2.44.0
```

---

## 🌎 Ví dụ thực tế
Một bạn sinh viên vừa cài xong Git for Windows trên máy tính, quay lại cửa sổ PowerShell đang mở sẵn gõ `git --version` thì nhận ngay thông báo lỗi đỏ rực. Bạn tưởng cài hỏng nên tính xóa đi cài lại. Thực ra, cửa sổ terminal cũ chưa kịp nhận biến PATH mới; chỉ cần tắt đi mở lại một cửa sổ PowerShell mới tinh là lệnh chạy mượt mà ngay lập tức.

---

## 💻 Command
```bash
git --version
```

---

## 🔍 Giải thích command
`git --version` là câu lệnh đầu tiên mà mọi kỹ sư chạy để chào sân môi trường mới. Lệnh này yêu cầu Git in ra mã số phiên bản hiện tại đang được cài đặt trên hệ điều hành. Nếu màn hình in ra kết quả dạng phiên bản cụ thể, cỗ máy Git đã sẵn sàng phục vụ bạn trong mọi dự án.

---

## ⚠️ Sai lầm phổ biến
1. **Quên khởi động lại terminal sau khi cài đặt:** Cửa sổ terminal mở từ trước sẽ không thể nhận diện được các biến môi trường PATH mới thêm vào.
2. **Ảo tưởng rằng học trên web thì không cần cài Git vào máy thật:** Trình giả lập web chỉ để luyện tập nhanh; khi đi làm dự án thực tế, bạn bắt buộc phải có Git thật trên máy.
3. **Nhắm mắt bấm Next mà không chú ý tùy chọn cài đặt:** Trên Windows, việc chọn cấu hình dòng lệnh và ký tự xuống dòng phù hợp sẽ giúp tránh lỗi hiển thị khi làm việc nhóm đa nền tảng.

---

## 🧪 Lab
1. Tải bộ cài Git chuẩn từ trang chủ git-scm.com phù hợp với hệ điều hành của bạn.
2. Tiến hành cài đặt và đặc biệt chú ý bước cho phép Git chạy từ command line của bên thứ ba.
3. Mở một cửa sổ dòng lệnh mới tinh (PowerShell hoặc Terminal trên macOS) và gõ `git --version`.
4. Ghi lại chính xác phiên bản Git vừa được cài đặt thành công trên máy của bạn.

---

## 💡 Hint
Nếu gặp lỗi không nhận diện lệnh sau khi cài, hãy bình tĩnh làm theo hai bước: tắt hẳn cửa sổ dòng lệnh cũ rồi mở lại cái mới; nếu vẫn chưa được, hãy kiểm tra lại biến môi trường PATH trong cài đặt hệ thống.

---

## ✅ Validation
- Cửa sổ terminal trên máy tính thật in ra đúng định dạng phiên bản Git mà không phát sinh lỗi.
- Phân biệt rõ sự khác nhau giữa Terminal (cửa sổ nhập lệnh), Shell (trình thông dịch) và Git (phần mềm ứng dụng).
- Giải thích được nguyên lý vận hành của biến môi trường PATH.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về cài đặt môi trường và terminal. Đọc kỹ phần giải thích của giảng viên sau mỗi lựa chọn.

---

## 🔥 Challenge
Nếu dùng Windows, hãy thử mở song song hai cửa sổ: một bên là PowerShell và một bên là Git Bash; chạy lệnh `git --version` ở cả hai và so sánh trải nghiệm hiển thị của hai môi trường này.

---

## 📚 Tổng kết
- Luôn tải bản cài đặt Git chính thức từ trang chủ git-scm.com để đảm bảo an toàn và cập nhật tính năng mới nhất.
- Biến môi trường PATH là cầu nối giúp hệ điều hành tìm thấy và thực thi chương trình Git từ mọi thư mục.
- Lệnh `git --version` là thước đo tiêu chuẩn để xác nhận môi trường phát triển đã sẵn sàng tác chiến.

