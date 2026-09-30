# Thiết lập CI Pipeline tự động kiểm thử trên Pull Request

---

## 🎯 Mục tiêu bài học
- Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.
- Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).
- Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh.

---

## 📖 Định nghĩa
> Pull Request CI là mô hình kiểm chuẩn tự động bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp. Khi một lập trình viên tạo hoặc đẩy thêm mã nguồn vào một Pull Request, GitHub Actions tự động tạo ra một nhánh ảo hợp nhất thử nghiệm (merge commit tạm thời) và thực thi toàn bộ chuỗi kiểm tra (Linter, Unit Test, Type Check). Kết quả thành công hay thất bại được gắn trực tiếp vào báo cáo trạng thái (Status Check) của PR.

---

## 🤔 Tại sao cần?
Nếu không có CI gác cổng trên Pull Request, nhánh chính (main) sẽ liên tục bị vỡ hoặc suy giảm hiệu năng do những lỗi bất cẩn, xung đột thư viện của lập trình viên. Đợi đến khi code đã được merge vào main mới phát hiện lỗi thì đã quá muộn và tốn rất nhiều công sức để tìm kiếm commit lỗi và phục hồi hệ thống. PR CI đóng vai trò như một bộ lọc sạch tự động: mọi đoạn mã kém chất lượng đều bị chặn đứng ngay trước cửa ngõ của nhánh chính, bảo vệ sự ổn định tối cao của sản phẩm.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung trạm kiểm dịch hải quan tại sân bay quốc tế. Hành khách (các commit trong PR) muốn nhập cảnh vào quốc gia (nhánh main) bắt buộc phải đi qua máy quét an ninh và cổng soi chiếu sinh học (CI Pipeline). Nếu hành lý chứa chất cấm hoặc có triệu chứng nhiễm virus nguy hiểm (bài test bị lỗi hoặc linter phát hiện sai chuẩn), cánh cửa hải quan sẽ khóa chặt và hành khách bị chặn lại để xử lý trước khi có thể đặt chân vào nội địa.

---

## 🖼️ Sơ đồ minh họa
```text
Tích hợp bảo vệ nhánh với PR CI Status Checks:
Developer tạo PR ──► [Kích hoạt CI Workflow]
                          │
                          ▼
                     [Chạy Tests]
                          │
           ┌──────────────┴──────────────┐
           ▼                             ▼
      [Tests PASS ✓]               [Tests FAIL ✗]
           │                             │
           ▼                             ▼
Status Check: Xanh (Success)   Status Check: Đỏ (Failure)
           │                             │
           ▼                             ▼
[NÚT MERGE ĐƯỢC MỞ KHÓA]      [NÚT MERGE BỊ KHÓA CHẶT 🚫]
```

---

## 🌎 Ví dụ thực tế
Trong một dự án tài chính, nhánh `main` được bảo vệ bởi quy tắc Branch Protection Rules với yêu cầu bắt buộc: bài kiểm tra `ci/test` phải đạt trạng thái thành công. Khi lập trình viên Nam mở một PR thêm tính năng chuyển tiền nhanh, Nam vô tình sửa đổi một hàm mà quên cập nhật bài kiểm thử tương ứng. Đường ống Actions chạy trong 2 phút và báo lỗi đỏ ở bài test đơn vị. Trên giao diện PR của Nam, nút "Merge pull request" bị vô hiệu hóa với thông báo màu đỏ: "Required statuses must pass before merging". Nam kiểm tra log, sửa lại đoạn mã, commit và push lên nhánh của mình. CI tự động chạy lại, báo tích xanh và nút Merge lập tức sáng lên cho phép trưởng nhóm phê duyệt.

---

## 💻 Command & Lệnh thao tác
```bash
gh pr create --title "feat: new login"
gh pr checks
gh pr merge --auto
```

---

## 🔍 Giải thích chi tiết lệnh
Các lệnh GitHub CLI trên cho phép tạo PR từ dòng lệnh, kiểm tra trạng thái của các bài kiểm tra tự động với gh pr checks, và bật chế độ tự động hợp nhất ngay khi các bài test chuyển sang màu xanh.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Kích hoạt cả hai sự kiện `push` và `pull_request` trên cùng một nhánh khiến workflow bị chạy lặp lại 2 lần một cách lãng phí.**: 
2. **Cấu hình tên Job kiểm tra trong Branch Protection Rule không khớp chính xác từng chữ cái với tên Job trong tệp YAML.**: 
3. **Bỏ qua việc kiểm tra các commit được đẩy bổ sung vào PR sau khi người review đã phê duyệt ban đầu.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một tệp workflow cấu hình kích hoạt trên sự kiện `on: pull_request: branches: [main]`.
2. Định nghĩa Job kiểm tra `test` chạy các lệnh kiểm thử và kiểm tra cú pháp.
3. Mở một Pull Request thử nghiệm và quan sát biểu tượng đồng hồ cát đang chạy, sau đó chuyển sang dấu tích xanh.

---

## 💡 Gợi ý thực hiện (Hint)
> Sự kiện `pull_request` theo mặc định lắng nghe các loại hoạt động: `opened`, `synchronize` (khi push code mới), và `reopened`.

---

## ✅ Kiểm tra kết quả (Validation)
Pull Request hiển thị trạng thái Status Check tích hợp chính xác và ngăn cản việc merge khi bài test bị lỗi.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kiến thức về thiết lập đường ống CI cho Pull Request qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao khi chạy CI trên sự kiện pull_request, GitHub Actions lại kiểm thử trên một commit hợp nhất ảo (refs/pull/:id/merge) thay vì commit trên nhánh của tác giả?

---

## 📚 Tổng kết kiến thức
- PR CI tự động kiểm tra chất lượng mã nguồn mỗi khi có yêu cầu hợp nhất mới hoặc có commit đẩy thêm.
- Kết hợp với Branch Protection Rules tạo thành cổng kiểm soát chất lượng tuyệt đối (Quality Gate).
- Ngăn chặn 100% nguy cơ mã nguồn vỡ build hoặc lỗi logic lọt vào nhánh chính.
