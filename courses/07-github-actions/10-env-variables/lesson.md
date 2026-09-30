# Biến môi trường (Environment Variables) cấp workflow, job và step

---

## 🎯 Mục tiêu bài học
- Làm chủ từ khóa env và cơ chế kế thừa phạm vi (scope): cấp Workflow, cấp Job và cấp Step.
- Sử dụng các biến môi trường mặc định có sẵn của GitHub: GITHUB_SHA, GITHUB_REF, GITHUB_REPOSITORY.
- Biết cách đọc biến môi trường trong câu lệnh shell ($ENV_VAR) và truyền biến giữa các bước.

---

## 📖 Định nghĩa
> Biến môi trường (Environment Variables) trong GitHub Actions cho phép bạn lưu trữ và truyền các thông tin cấu hình tĩnh hoặc động vào các tiến trình thực thi của Runner. Bạn có thể định nghĩa biến môi trường bằng từ khóa env ở ba cấp độ phạm vi khác nhau: toàn bộ Workflow (áp dụng rộng rãi cho mọi Job), một Job cụ thể (áp dụng kế thừa cho mọi Step trong Job đó), hoặc chỉ riêng một Step cá lẻ với sự phân tầng và kế thừa quyền hạn rõ ràng, có tính cục bộ cao.

---

## 🤔 Tại sao cần?
Sử dụng biến môi trường giúp tách biệt hoàn toàn giữa mã nguồn logic và các giá trị cấu hình thay đổi theo môi trường (như NODE_ENV, PORT, API_ENDPOINT). Điều này tuân thủ nguyên tắc 12-Factor App, giúp kịch bản CI/CD linh hoạt, dễ dàng chuyển đổi giữa các môi trường phát triển, kiểm thử và sản xuất mà không cần sửa đổi mã nguồn. Nhờ đó, việc bảo mật các tham số hệ thống và tái cấu hình hạ tầng trở nên vô cùng đơn giản, an toàn, chuẩn hóa và ngăn ngừa triệt để các lỗi cấu hình cứng.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng các tầng không khí trong một tòa nhà chung cư: Biến môi trường cấp Workflow giống như hệ thống điều hòa tổng của toàn tòa nhà (tất cả các căn hộ đều hưởng chung mức nhiệt độ này). Biến cấp Job giống như chiếc điều hòa riêng trong phòng khách của căn hộ (chỉ những người trong căn hộ đó mới thấy). Và biến cấp Step giống như chiếc quạt máy mini cầm tay chỉ thổi mát riêng cho một cá nhân trong tích tắc.

---

## 🖼️ Sơ đồ minh họa
```text
Phạm vi kế thừa của biến môi trường (Scope Inheritance):
┌─────────────────────────────────────────────────────────────┐
│ env: [APP_NAME: "ShopApp"]       <── Áp dụng TOÀN WORKFLOW  │
│                                                             │
│ jobs:                                                       │
│   build:                                                    │
│     env: [STAGE: "staging"]      <── Áp dụng TOÀN BỘ JOB    │
│     steps:                                                  │
│       - name: Run Task                                      │
│         env: [PORT: "8080"]      <── Áp dụng RIÊNG STEP NÀY │
│         run: echo "$APP_NAME on $STAGE at port $PORT"       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư cấu hình đường ống phát hành cho ứng dụng web đa ngôn ngữ. Ở cấp cao nhất của workflow, kỹ sư khai báo env: { APP_ENV: 'test', REGION: 'ap-southeast-1' }. Khi Job chạy, mọi câu lệnh shell trong các Step đều có thể truy cập hai biến này. Ở một Step chạy bài kiểm thử tích hợp đặc thù, kỹ sư bổ sung thêm biến cục bộ env: { DEBUG: 'true', RETRIES: '3' }. Nhờ phân tầng phạm vi thông minh, các bài kiểm thử nhận đúng cấu hình debug chi tiết mà không làm ảnh hưởng đến các tác vụ đóng gói khác.

---

## 💻 Command & Lệnh thao tác
```bash
echo $GITHUB_SHA
echo $NODE_ENV
printenv
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh printenv in ra toàn bộ bảng biến môi trường hiện hành trên máy ảo Runner, giúp lập trình viên kiểm tra danh sách các biến mặc định do GitHub cung cấp cũng như các biến tùy biến do mình thiết lập trong phiên làm việc.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Ghi đè nhầm tên biến ở cấp Step khiến các giá trị quan trọng ở cấp Job bị mất hiệu lực.**: 
2. **Sử dụng biến môi trường để lưu trữ mật khẩu, khóa bí mật hoặc token dưới dạng văn bản rõ.**: 
3. **Nhầm lẫn cú pháp truy cập biến môi trường trong shell (`$MY_VAR`) với cú pháp ngữ cảnh GitHub Actions (`${{ env.MY_VAR }}`).**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Khai báo một biến môi trường `COURSE_NAME: "Git Academy"` ở cấp cao nhất của Workflow.
2. Khai báo biến `NODE_ENV: "production"` ở cấp Job.
3. Tạo một Step in ra giá trị của hai biến trên cùng với biến mặc định `$GITHUB_REF`.

---

## 💡 Gợi ý thực hiện (Hint)
> Biến khai báo ở cấp con (Step) sẽ ghi đè lên biến cùng tên được khai báo ở cấp cha (Job hoặc Workflow).

---

## ✅ Kiểm tra kết quả (Validation)
Log in ra đầy đủ và chính xác giá trị của các biến môi trường từ cả ba cấp độ.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra mức độ am hiểu của bạn về phạm vi và cách dùng biến môi trường qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để xuất một biến môi trường mới từ bên trong câu lệnh của một Step để các Step phía sau có thể đọc được bằng tệp $GITHUB_ENV?

---

## 📚 Tổng kết kiến thức
- Từ khóa `env` cho phép khai báo biến môi trường ở 3 cấp độ: Workflow, Job và Step.
- Cấp con tự động kế thừa các biến từ cấp cha và có quyền ghi đè giá trị nếu cần.
- GitHub cung cấp sẵn nhiều biến môi trường mặc định hữu ích như `GITHUB_SHA`, `GITHUB_REF`, `GITHUB_REPOSITORY`.
