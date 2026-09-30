# Kiến trúc Workflow: Events, Jobs, Steps và Runners

---

## 🎯 Mục tiêu bài học
- Nắm rõ cấu trúc phân tầng 4 cấp bậc của một Workflow: Event -> Jobs -> Steps -> Actions/Commands.
- Hiểu bản chất chạy song song (Parallel) mặc định của các Job và chạy tuần tự (Sequential) của các Step.
- Nắm vững vai trò của Runner như một môi trường máy ảo cách ly độc lập chứa toàn bộ phiên làm việc.

---

## 📖 Định nghĩa
> Kiến trúc nền tảng của hệ thống GitHub Actions được xây dựng dựa trên bốn thành phần cơ bản có tính tổ chức chặt chẽ và nhất quán: Sự kiện (Event) kích hoạt Luồng công việc (Workflow); mỗi Workflow bao gồm một hoặc nhiều Tác vụ (Job); mỗi Job được thực thi hoàn toàn độc lập trên một Máy chạy (Runner) ảo hóa riêng biệt; và bên trong mỗi Job chứa một danh sách các Bước (Step) thực thi tuần tự lần lượt từ trên xuống dưới.

---

## 🤔 Tại sao cần?
Hiểu sai kiến trúc phân tầng sẽ dẫn đến những lỗi nghiêm trọng như: cố gắng chia sẻ biến nhớ hoặc tệp tin cục bộ giữa hai Job độc lập mà không dùng Artifact, hoặc kỳ vọng các Step chạy song song để tiết kiệm thời gian. Nắm vững ranh giới giữa Job (chạy song song trên các máy ảo khác nhau) và Step (chạy tuần tự trên cùng một máy ảo) là chìa khóa để thiết kế các pipeline tối ưu và chuẩn xác.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng một nhà hàng phục vụ tiệc cưới. Event là tiếng chuông báo có đoàn khách mới đến. Workflow là toàn bộ thực đơn tiệc cưới được kích hoạt. Các Job là các quầy bếp độc lập: Quầy bếp khai vị, Quầy bếp món chính và Quầy làm bánh tráng miệng (chúng hoạt động song song ở các khu vực tách biệt). Mỗi quầy bếp có một đầu bếp chính (Runner). Bên trong mỗi quầy bếp, đầu bếp làm từng thao tác tuần tự (Steps): rửa rau, thái thịt, nấu sốt.

---

## 🖼️ Sơ đồ minh họa
```text
[Event: push]
      │
      ▼
[Workflow: CI Pipeline]
      ├───────────────┬───────────────┐
      ▼               ▼               ▼
[Job 1: Lint]   [Job 2: Test]   [Job 3: Build]  <── Chạy SONG SONG trên 3 Runners riêng biệt
(Runner Ubuntu) (Runner Ubuntu) (Runner Ubuntu)
      │               │
      ├─ Step 1       ├─ Step 1 (Checkout)
      ├─ Step 2       ├─ Step 2 (Setup Node)
      └─ Step 3       └─ Step 3 (Run test)     <── Các Step chạy TUẦN TỰ trên cùng 1 Runner
```

---

## 🌎 Ví dụ thực tế
Trong một dự án xây dựng ứng dụng di động Flutter, nhóm phát triển cấu hình một Workflow CI. Khi sự kiện tạo Pull Request diễn ra, Workflow khởi chạy hai Job cùng lúc: Job thứ nhất chạy trên Runner Linux để kiểm tra định dạng mã nguồn và phân tích tĩnh linter; Job thứ hai chạy trên Runner macOS để biên dịch gói ứng dụng iOS. Mỗi Job tự khởi động máy ảo sạch của riêng mình, chạy lần lượt các Step cài đặt Flutter SDK, tải dependencies và tiến hành biên dịch. Hai Job không hề giẫm chân lên nhau, giúp nhóm tận dụng tối đa sức mạnh tính toán song song.

---

## 💻 Command & Lệnh thao tác
```bash
cat .github/workflows/ci.yml
tree .github
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh tree .github hiển thị cây thư mục nơi chứa các tệp workflow, và cat in ra nội dung khai báo các khối kiến trúc name, on, jobs, steps để kiểm tra tính toàn vẹn của kịch bản một cách rõ ràng và chuẩn xác.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cho rằng tệp tin tạo ra ở Job 1 sẽ tự động có mặt ở Job 2**:  Mỗi Job chạy trên máy ảo khác nhau, muốn chia sẻ dữ liệu bắt buộc phải dùng upload/download artifact.
2. **Tạo quá nhiều Job nhỏ chỉ chứa một câu lệnh đơn giản**:  Gây lãng phí thời gian khởi động máy ảo và tải image của Runner.
3. **Nhầm lẫn thứ tự thực thi của các Step bên trong một Job**:  Các Step luôn luôn chạy tuần tự theo thứ tự khai báo từ trên xuống dưới.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Xem xét sơ đồ phân cấp giữa Event, Job, Step và Runner trên bảng vẽ tư duy.
2. Xác định xem hai tác vụ Lint và Unit Test nên đặt trong cùng một Job hay chia làm hai Job song song.
3. Kiểm tra cấu trúc thư mục quy chuẩn `.github/workflows/` trong dự án thực hành.

---

## 💡 Gợi ý thực hiện (Hint)
> Ghi nhớ quy tắc vàng: Các Step trong một Job dùng chung hệ thống tệp tin, các Job khác nhau hoàn toàn cách ly.

---

## ✅ Kiểm tra kết quả (Validation)
Phân biệt chính xác phạm vi chia sẻ dữ liệu giữa cấp độ Job và cấp độ Step.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra khả năng phân tích kiến trúc phân tầng của bạn qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Nếu bạn có 100 bài kiểm thử mất 20 phút để chạy trên một máy, bạn sẽ tái cấu trúc các Job như thế nào để giảm thời gian hoàn thành xuống còn 5 phút?

---

## 📚 Tổng kết kiến thức
- Workflow được kích hoạt bởi Event và chứa một tập hợp các Jobs.
- Jobs mặc định thực thi song song trên các máy ảo Runner hoàn toàn độc lập.
- Steps bên trong một Job luôn thực thi tuần tự và chia sẻ chung hệ thống tệp tin của Runner đó.
