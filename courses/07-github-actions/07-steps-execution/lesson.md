# Các bước thực thi (Steps): name, id và thứ tự tuần tự

---

## 🎯 Mục tiêu bài học
- Nắm vững cấu trúc danh sách steps trong Job và tính chất thực thi tuần tự nghiêm ngặt.
- Hiểu rõ công dụng của thuộc tính name (mô tả trực quan) và thuộc tính id (định danh để tham chiếu output).
- Nắm được cơ chế dừng khẩn cấp khi một Step thất bại và cách tiếp tục với continue-on-error.

---

## 📖 Định nghĩa
> Steps (Các bước) là một mảng tuần tự các tác vụ cụ thể cần thực hiện bên trong một Job. Một Step có thể là một câu lệnh shell đơn giản (dùng từ khóa run) hoặc một hành động được đóng gói sẵn (dùng từ khóa uses). Các Step trong cùng một Job luôn luôn thực thi tuần tự từ trên xuống dưới trên cùng một máy ảo Runner, dùng chung hệ thống tệp tin và các biến môi trường được thiết lập trước đó trong suốt phiên làm việc.

---

## 🤔 Tại sao cần?
Hiểu rõ cơ chế của Step giúp bạn kiểm soát hoàn toàn quy trình xử lý mã nguồn: từ việc tải mã nguồn về đĩa, cài đặt đúng phiên bản ngôn ngữ, chạy kiểm thử cho đến khi dọn dẹp môi trường. Nếu một Step bị lỗi (mã thoát khác 0), mặc định toàn bộ các Step phía sau sẽ bị hủy bỏ ngay lập tức, ngăn ngừa việc tiếp tục xây dựng hoặc phát hành một sản phẩm hỏng.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng các Step như một công thức làm bánh ngọt từng bước trong sách nấu ăn: Bước 1: Đập trứng vào bát; Bước 2: Đánh tan trứng; Bước 3: Cho đường và sữa; Bước 4: Nướng bánh trong lò. Bạn không thể nướng bánh trước khi đập trứng (tính tuần tự). Và nếu ở Bước 1 quả trứng bị ung thối (Step 1 Failed), bạn phải dừng lại ngay lập tức chứ không được phép tiếp tục đổ sữa và nướng.

---

## 🖼️ Sơ đồ minh họa
```text
Job Runner Container
┌────────────────────────────────────────────────────────┐
│ Step 1: actions/checkout@v4       ──► [Thành công ✓]   │
│       │ (Dữ liệu repo ghi vào ổ đĩa workspace)          │
│       ▼                                                │
│ Step 2: npm install               ──► [Thành công ✓]   │
│       │ (Thư mục node_modules sẵn sàng)                │
│       ▼                                                │
│ Step 3: npm test                  ──► [Thất bại ✗]     │
│       │ (Phát hiện lỗi kiểm thử)                       │
│       ▼                                                │
│ Step 4: npm run build             ──► [Bị hủy bỏ 🚫]   │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư cấu hình Job chạy kiểm thử cho ứng dụng Python: Step 1 tải mã nguồn về; Step 2 cài đặt thư viện kiểm thử pytest; Step 3 chạy lệnh pytest tests/ với định danh id: test_run; Step 4 in ra thông báo chúc mừng. Trong lần chạy thử nghiệm, Step 3 phát hiện một lỗi chia cho số 0 và thoát với mã lỗi 1. Toàn bộ Job lập tức chuyển sang trạng thái thất bại màu đỏ và Step 4 hoàn toàn không được gọi. Nhờ cơ chế an toàn này, hệ thống không bao giờ lãng phí thời gian chạy tiếp các bước sau khi lỗi đã xuất hiện.

---

## 💻 Command & Lệnh thao tác
```bash
echo "Hello Step"
gh run view --log
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh echo minh họa một lệnh shell cơ bản bên trong thuộc tính run của step, và gh run view --log hiển thị chi tiết dòng log xuất ra của từng Step trong phiên chạy để kỹ sư theo dõi diễn biến từng dòng lệnh được thực thi.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cho rằng mỗi Step chạy trong một thư mục khác nhau**:  Toàn bộ các Step trong một Job đều chạy trong thư mục mặc định github.workspace.
2. **Thiếu thuộc tính name khiến log hiển thị các dòng lệnh run dài ngoằng rất khó quan sát và chẩn đoán lỗi.**: 
3. **Không đặt thuộc tính id khi cần lấy dữ liệu đầu ra (outputs) của Step đó để sử dụng ở các Step tiếp theo.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Khai báo danh sách `steps` gồm ít nhất 3 bước với tên mô tả `name` rõ ràng bằng tiếng Việt.
2. Gán thuộc tính `id: step_one` cho bước đầu tiên để làm quen với việc định danh.
3. Chạy thử nghiệm một lệnh thoát lỗi `exit 1` ở bước 2 để quan sát bước 3 tự động bị bỏ qua.

---

## 💡 Gợi ý thực hiện (Hint)
> Luôn đặt tên `name` mô tả hành động (ví dụ: "Cài đặt dependencies", "Biên dịch mã nguồn") thay vì để trống.

---

## ✅ Kiểm tra kết quả (Validation)
Các Step thực thi đúng theo thứ tự khai báo và ghi lại log riêng biệt cho từng bước.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng kiểm tra hiểu biết của bạn về cơ chế thực thi của các Step qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để cấu hình một Step vẫn luôn luôn được thực thi (ví dụ: gửi thông báo báo cáo lỗi) kể cả khi các Step trước đó bị thất bại?

---

## 📚 Tổng kết kiến thức
- Các Step trong Job luôn thực thi tuần tự từ trên xuống dưới trên cùng một Runner.
- Nếu một Step gặp lỗi (exit code khác 0), mặc định các Step tiếp theo sẽ bị hủy bỏ ngay lập tức.
- Mỗi Step có thể gán `name` để hiển thị trực quan và `id` để tham chiếu dữ liệu đầu ra.
