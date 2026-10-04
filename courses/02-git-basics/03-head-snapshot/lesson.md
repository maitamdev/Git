# Repository, commit và vị trí HEAD: Chiếc la bàn định vị của Git

---

## 🎯 Mục tiêu
- Thấu hiểu cơ chế định vị không gian của Git thông qua con trỏ đặc biệt `HEAD`.
- Phân biệt mối quan hệ ba tầng: Commit Snapshot (nội dung), Branch (nhãn nhánh) và `HEAD` (vị trí bạn đang đứng).
- Giải thích hiện tượng nhánh thai nghén khi repo vừa khởi tạo chưa có commit đầu tiên.

---

## 🧩 Từ khóa hôm nay

### HEAD — vị trí Git đang đứng
- **Nói dễ hiểu:** Chiếc kẹp sách đánh dấu vị trí làm việc hiện tại của bạn trên dòng thời gian lịch sử dự án.
- **Ví dụ:** Khi bạn đang làm việc bình thường trên nhánh `main`, `HEAD` sẽ bám chặt vào nhánh `main`.
- **Đừng nhầm:** `HEAD` không phải là một file code hay một nhánh mới; nó là con trỏ chỉ đường của Git.

### Commit snapshot — trạng thái đã lưu
- **Nói dễ hiểu:** Bản đóng băng nguyên vẹn diện mạo dự án tại một thời khắc lịch sử cụ thể.
- **Ví dụ:** Commit “Tạo trang chủ” lưu giữ toàn bộ mã nguồn website lúc vừa dựng xong giao diện.
- **Đừng nhầm:** Mốc Snapshot là bất biến vĩnh viễn; việc bạn gõ code sửa đổi sau này không bao giờ làm thay đổi mốc đã lưu.

### Branch — nhánh lịch sử
- **Nói dễ hiểu:** Một nhãn dán di động luôn tự động trỏ vào mốc commit mới nhất của một nhánh phát triển.
- **Ví dụ:** Nhánh `main` là dòng chảy chính của dự án, tự động nhảy cóc tới commit mới mỗi khi bạn lưu mốc.
- **Đừng nhầm:** Nhánh trong Git cực kỳ nhẹ, nó chỉ là một con trỏ nhỏ chứ không phải bản sao chép cả thư mục nặng nề.

---

## 🤔 Tại sao cần?
Một dự án phần mềm có thể có hàng trăm commit và nhiều nhánh phát triển song song. Nếu không có cơ chế định vị chuẩn xác, Git sẽ không biết bạn đang muốn xem code ở mốc thời gian nào và commit tiếp theo sẽ được nối vào đâu. Con trỏ `HEAD` chính là chiếc la bàn nội bộ giúp Git luôn trả lời được câu hỏi cốt tử: "Tôi đang đứng ở đâu trong không gian lịch sử này?"

---

## 📖 Định nghĩa
`HEAD` là con trỏ tham chiếu đặc biệt trong Git xác định vị trí làm việc hiện tại của bạn. Thông thường, `HEAD` trỏ vào một nhánh (như `main`), và nhánh đó lại trỏ tới commit mới nhất. Mỗi khi bạn tạo commit mới, nhánh và `HEAD` sẽ cùng tịnh tiến về phía trước.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng lịch sử dự án như một đoàn tàu hỏa gồm nhiều toa (các Commit) nối đuôi nhau. Nhánh `main` là tấm biển treo ở toa tàu cuối cùng. Còn `HEAD` chính là vị trí của bạn: bạn đang đứng ở toa cuối cùng nhìn về phía trước và sẵn sàng móc thêm một toa tàu mới vào đoàn!

---

## 🖼 Sơ đồ
```text
Mô hình con trỏ HEAD trong Repository:
[Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [main]
                                                ▲
                                                │
                                              [HEAD] (Bạn đang đứng tại Commit C trên nhánh main)
```

---

## 🌎 Ví dụ thực tế
Dự án của bạn đã có ba commit. Khi bạn gõ code và chuẩn bị tạo commit thứ tư, Git nhìn vào `HEAD` để biết bạn đang ở nhánh `main`. Khi commit thành công, toa tàu thứ tư được móc vào, nhãn `main` dịch chuyển sang toa thứ tư và `HEAD` cũng tự động di chuyển theo để tiếp tục đón nhận những thay đổi tiếp theo của bạn.

---

## 💻 Command
Bài học kiến trúc này giúp bạn dựng mô hình tư duy chuẩn xác trong đầu trước khi chạm tay vào bàn phím ở các bài thực hành lệnh tiếp theo.

---

## 🔍 Giải thích command
Đây là bài học nền tảng về cơ chế định vị của Git. Trong kho chứa chưa có commit đầu tiên, lịch sử vẫn đang rỗng nên các lệnh truy vấn lịch sử như `git log` hay `git show HEAD` sẽ chưa thể hoạt động.

---

## ⚠️ Sai lầm phổ biến
1. **Nhầm lẫn giữa `HEAD` và tên nhánh:** `main` là tên của nhánh phát triển; còn `HEAD` là con trỏ chỉ vị trí bạn đang đứng để thao tác.
2. **Hoang mang khi repo mới không xem được `git log`:** Một repository vừa khởi tạo chưa có commit nào thì con trỏ `HEAD` chưa có điểm tựa để hiển thị lịch sử; đó là trạng thái bình thường.
3. **Tưởng rằng nhánh là một bản sao chép nặng nề:** Nhánh trong Git thực chất chỉ là một con trỏ siêu nhẹ lưu mã định danh của commit.

---

## 🧪 Lab
Quan sát kỹ sơ đồ mô hình đoàn tàu ở trên và trả lời các câu hỏi sau:
1. Trong sơ đồ, commit nào đang đại diện cho trạng thái mã nguồn mới nhất của dự án?
2. Nhánh `main` hiện đang gắn liền với commit nào?
3. Mối quan hệ giữa con trỏ `HEAD` và nhánh `main` được thể hiện ra sao?
4. Nếu bây giờ bạn tạo thêm Commit D, con trỏ nào sẽ tự động di chuyển sang Commit D?

---

## 💡 Hint
Hãy nhớ quy tắc: "Commit mới sinh ra, nhánh tiến lên phía trước, và `HEAD` luôn đồng hành cùng nhánh bạn đang đứng."

---

## ✅ Validation
- Trình bày được bản chất của con trỏ `HEAD` và mối quan hệ với nhánh `main`.
- Giải thích được vì sao repository mới tinh chưa thể thực thi các lệnh xem lịch sử.
- Phân tích được mô hình đoàn tàu nối đuôi nhau của các mốc Commit.

---

## ❓ Quiz
Làm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD. Đọc kỹ phân tích sư phạm của giảng viên.

---

## 🔥 Challenge
Hãy thử giải thích hiện tượng HEAD bị tách rời (Detached HEAD) cho một người bạn: Điều gì sẽ xảy ra nếu `HEAD` trỏ thẳng vào một commit trong quá khứ thay vì bám vào một nhánh?

---

## 📚 Tổng kết
- `HEAD` là chiếc kẹp sách định vị vị trí làm việc hiện tại của bạn trong kho lưu trữ Git.
- Mỗi commit mới sinh ra sẽ tự động làm tịnh tiến nhánh làm việc và con trỏ `HEAD` về phía trước.
- Nhánh và `HEAD` chỉ là những con trỏ siêu nhẹ giúp bạn du hành thời gian mượt mà trong lịch sử dự án.

