# Cấu hình Jobs: runs-on, phân tách độc lập và môi trường

---

## 🎯 Mục tiêu bài học
- Nắm vững cú pháp khai báo Job và thuộc tính bắt buộc runs-on để chỉ định môi trường điều hành.
- Hiểu rõ nguyên lý cô lập hoàn toàn giữa các Job về hệ thống tệp tin, biến môi trường và tiến trình.
- Biết cách đặt tên định danh cho Job (job id) và hiển thị tên thân thiện (name) trên giao diện.

---

## 📖 Định nghĩa
> Một Job là một tập hợp các bước (steps) được thực thi trên cùng một máy ảo hoặc bộ chứa (container) cụ thể. Thuộc tính bắt buộc hàng đầu của mỗi Job là runs-on, chỉ định hệ điều hành của máy ảo Runner mà GitHub sẽ cấp phát (ví dụ: ubuntu-latest, windows-latest, macos-latest). Mỗi Job trong một workflow có mã định danh duy nhất (job_id), chạy độc lập và không chia sẻ bộ nhớ hay tệp tin với các Job khác trong cùng một phiên chạy.

---

## 🤔 Tại sao cần?
Phân tách các công việc thành các Job riêng biệt giúp khai thác triệt để khả năng xử lý song song, rút ngắn thời gian phản hồi của pipeline từ vài chục phút xuống chỉ còn vài phút. Hơn nữa, việc này cho phép bạn chỉ định các môi trường chạy phù hợp cho từng loại tác vụ, ví dụ: kiểm tra linter nhanh trên Ubuntu giá rẻ, nhưng biên dịch ứng dụng iOS bắt buộc phải chạy trên Runner macOS đắt tiền hơn.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung bạn đang điều phối một cuộc thi nấu ăn quốc tế. Bạn có 3 phòng bếp riêng biệt: một phòng cho đầu bếp làm bánh (Job 1 trên Runner Ubuntu), một phòng cho đầu bếp làm món nướng (Job 2 trên Runner Windows), và một phòng cho chuyên gia pha chế (Job 3 trên Runner macOS). Mỗi người có một căn phòng sạch sẽ với đầy đủ dụng cụ riêng biệt, họ làm việc cùng lúc mà không lo người này làm đổ bột mì sang chảo dầu của người kia.

---

## 🖼️ Sơ đồ minh họa
```text
Workflow Execution:
┌─────────────────────────────────────────────────────────────┐
│ jobs:                                                       │
│   lint:                     test:                 build:    │
│     runs-on: ubuntu-latest    runs-on: ubuntu-22    runs-on: │
│     [Clean Virtual VM]        [Clean Virtual VM]    macos   │
│     steps:                    steps:                steps:  │
│       - step 1                  - step 1              - step│
└─────────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một nhóm phát triển phần mềm kế toán thiết kế workflow chứa 3 Jobs: Job 1 kiểm tra phong cách lập trình linter (runs-on: ubuntu-latest, hoàn thành trong 30 giây); Job 2 thực thi các bài kiểm thử cơ sở dữ liệu (runs-on: ubuntu-latest, hoàn thành trong 3 phút); Job 3 kiểm tra tương thích giao diện trên trình duyệt Safari (runs-on: macos-latest, hoàn thành trong 5 phút). Vì ba Job được cấp phát 3 máy ảo riêng và chạy đồng thời, tổng thời gian toàn bộ pipeline hoàn thành chỉ là 5 phút thay vì phải chờ 8 phút 30 giây nếu chạy tuần tự.

---

## 💻 Command & Lệnh thao tác
```bash
cat .github/workflows/multi-job.yml
gh run view
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh cat xem cấu hình đa Job trong tệp YAML và gh run view cho phép xem tiến độ thực thi thực tế của từng Job đang chạy song song trên các Runner để đánh giá thời lượng và hiệu suất hoàn thành.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Quên khai báo thuộc tính bắt buộc runs-on khiến hệ thống báo lỗi cú pháp YAML và từ chối chạy Job.**: 
2. **Sử dụng Runner macOS hoặc Windows cho các tác vụ đơn giản chỉ cần Linux, làm tiêu tốn gấp 2 đến 10 lần thời lượng hạn ngạch miễn phí.**: 
3. **Đặt tên job_id chứa ký tự đặc biệt hoặc dấu cách không hợp lệ.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Khai báo khối `jobs` với 2 Job riêng biệt: `code-quality` và `unit-testing`.
2. Chỉ định `runs-on: ubuntu-latest` cho cả hai tác vụ.
3. Đặt thuộc tính `name` trực quan bằng tiếng Việt cho từng Job để hiển thị đẹp mắt trên giao diện.

---

## 💡 Gợi ý thực hiện (Hint)
> Luôn ưu tiên chọn `ubuntu-latest` trừ khi dự án của bạn bắt buộc phải có môi trường Windows hoặc macOS.

---

## ✅ Kiểm tra kết quả (Validation)
Hai Job được khởi chạy đồng thời trên hai máy ảo Runner độc lập.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng kiểm tra kiến thức về cấu hình Job và thuộc tính runs-on qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao GitHub tính phí phút chạy máy ảo macOS đắt gấp 10 lần so với máy ảo Linux Ubuntu, và kỹ sư nên tối ưu hóa điều này như thế nào?

---

## 📚 Tổng kết kiến thức
- Mỗi Job đại diện cho một tác vụ độc lập chạy trên một máy ảo Runner được cấp phát riêng.
- Thuộc tính `runs-on` là bắt buộc để chỉ định hệ điều hành (`ubuntu-latest`, `windows-latest`, `macos-latest`).
- Các Job mặc định chạy song song hoàn toàn, giúp tối ưu hóa tối đa thời gian thực thi của đường ống.
