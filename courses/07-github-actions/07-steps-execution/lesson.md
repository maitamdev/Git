# Các bước thực thi (Steps): name, id và thứ tự tuần tự

## 🎯 Mục tiêu
- Nắm vững cấu trúc danh sách steps trong Job và tính chất thực thi tuần tự nghiêm ngặt.
- Hiểu rõ công dụng của thuộc tính `name` (mô tả trực quan) và thuộc tính `id` (định danh để tham chiếu output).
- Nắm được cơ chế dừng khẩn cấp khi một Step thất bại và cách tiếp tục với `continue-on-error`.

## 🧩 Từ khóa hôm nay
### Sequential Steps
- **Nói dễ hiểu**: Các bước bên trong cùng một Job luôn chạy tuần tự từng bước một từ trên xuống dưới trên cùng máy ảo.
- **Ví dụ**: Bước 1 tải code về đĩa, bước 2 cài thư viện, bước 3 chạy test; không thể chạy lẫn lộn.
- **Đừng nhầm**: Các Step trong cùng một Job không chạy song song; chỉ các Job khác nhau mới chạy song song.

### Fail-fast Mechanism
- **Nói dễ hiểu**: Khi một bước bị lỗi (mã thoát khác 0), toàn bộ các bước phía sau tự động dừng lại ngay lập tức.
- **Ví dụ**: Nếu lệnh `npm test` ở bước 3 trả mã lỗi, bước 4 thường bị bỏ qua theo điều kiện mặc định.
- **Đừng nhầm**: Step có `if` riêng như `failure()` vẫn có thể chạy; `continue-on-error: true` cho phép tiếp tục nhưng có thể khiến kết quả Job vẫn xanh.

### Step Outputs
- **Nói dễ hiểu**: Dữ liệu do một bước tạo ra và xuất ra để các bước tiếp theo trong cùng Job có thể đọc lại.
- **Ví dụ**: Bước 1 tính ra mã hash phiên bản và gán vào output để bước 3 dùng gắn thẻ tag.
- **Đừng nhầm**: Bắt buộc phải đặt thuộc tính `id` cho bước đó thì các bước sau mới có thể tham chiếu giá trị output.

## 📖 Định nghĩa
Steps (Các bước) là danh sách tác vụ trong một Job. Mỗi Step dùng `run` để chạy lệnh shell hoặc `uses` để gọi Action. Steps được xét theo thứ tự khai báo và dùng chung workspace; sau lỗi, các step sau mặc định bị bỏ qua trừ khi điều kiện hoặc `continue-on-error` thay đổi hành vi.

## 🤔 Tại sao cần?
Hiểu cơ chế Step giúp bạn kiểm soát chu trình xử lý mã nguồn. Mặc định, bước sau không chạy sau lỗi; điều kiện riêng vẫn có thể cho bước khác chạy, nên hãy đặt phụ thuộc phát hành rõ ràng.

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng các Step như công thức làm bánh ngọt từng bước: Bước 1: Đập trứng; Bước 2: Đánh tan trứng; Bước 3: Cho đường và sữa; Bước 4: Nướng bánh trong lò. Bạn không thể nướng bánh trước khi đập trứng. Và nếu ở Bước 1 quả trứng bị hỏng (`Step 1 Failed`), bạn phải dừng lại ngay lập tức chứ không được tiếp tục đổ sữa và nướng.

## 🖼 Sơ đồ
```mermaid
flowchart TD
    S1[Step 1: actions/checkout@v7 - Thành công] --> S2[Step 2: npm install - Thành công]
    S2 --> S3{Step 3: npm test}
    S3 -- Thành công --> S4[Step 4: npm run build]
    S3 -- Thất bại --> Skip[Step 4 mặc định bị bỏ qua]
    S3 -- Thất bại, if riêng --> Rescue[Step có if: failure() vẫn có thể chạy]
```

## 🌎 Ví dụ thực tế
Một kỹ sư cấu hình Job chạy kiểm thử cho ứng dụng Python: Step 1 tải mã nguồn về; Step 2 cài đặt thư viện pytest; Step 3 chạy lệnh `pytest tests/` với định danh `id: test_run`; Step 4 gửi thông báo thành công. Trong một lần chạy, Step 3 phát hiện lỗi chia cho số 0 và trả về mã lỗi 1. Toàn bộ Job lập tức chuyển sang màu đỏ và Step 4 hoàn toàn không được gọi, giúp tiết kiệm thời gian chạy vô ích.

## 💻 Command
```bash
# In ra một thông báo kiểm tra trong thuộc tính run của step
echo "Hello Step"

# Xem chi tiết nhật ký log của từng step trong lần chạy gần nhất
gh run view --log
```

## 🔍 Giải thích command
- `echo "Hello Step"`: Ví dụ về một câu lệnh shell đơn giản được thực thi trực tiếp bên trong từ khóa `run` của step.
- `gh run view --log`: Hiển thị log của workflow run; cần cài GitHub CLI và quyền đọc repo.

## ⚠️ Sai lầm phổ biến
- Cho rằng mỗi Step chạy trong một thư mục riêng biệt (thực tế toàn bộ các Step dùng chung `github.workspace`).
- Thiếu thuộc tính `name` khiến giao diện hiển thị các câu lệnh shell dài dòng rất khó đọc và khó tra cứu lỗi.
- Quên đặt thuộc tính `id` khi muốn trích xuất dữ liệu đầu ra (`outputs`) của Step đó cho các bước tiếp theo sử dụng.

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Khai báo danh sách `steps` gồm ít nhất 3 bước với tên mô tả `name` rõ ràng:
   ```yaml
   name: Steps Sequence Demo
   on: [push]
   jobs:
     demo:
       runs-on: ubuntu-latest
       steps:
         - name: Bước 1 - Kiểm tra môi trường
           run: uname -a
         - name: Bước 2 - Thiết lập biến
           id: setup
           run: echo "status=ready" >> $GITHUB_OUTPUT
         - name: Bước 3 - Đọc biến đầu ra
           run: echo "Trạng thái là ${{ steps.setup.outputs.status }}"
   ```
2. Đẩy file lên GitHub và theo dõi tab Actions để xem các bước chạy tuần tự lần lượt.
3. Thử cố tình chèn lệnh `exit 1` vào bước 2 để quan sát bước 3 tự động bị chuyển sang trạng thái Skipped.

## 💡 Hint
- Luôn đặt tên `name` mô tả rõ hành động (ví dụ: "Cài đặt dependencies", "Chạy unit test") thay vì để trống.
- Với bước dọn dẹp ngắn sau thành công hoặc lỗi, cân nhắc `if: ${{ !cancelled() }}`; chỉ dùng `always()` khi cần thử chạy cả sau khi bị hủy và bước đó kết thúc nhanh.

## ✅ Validation
- Các Step thực thi đúng theo thứ tự khai báo từ trên xuống dưới trên cùng một Runner.
- Sau lỗi, step sau mặc định bị bỏ qua; điều kiện riêng và `continue-on-error` có thể làm thay đổi luồng chạy.

## ❓ Quiz
Hãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ hiểu biết của bạn về cơ chế thực thi của các Step trong Job.

## 🔥 Challenge
Tìm hiểu cách sử dụng hàm điều kiện `if: failure()` để chỉ kích hoạt một bước gửi thông báo cảnh báo lỗi tới Discord hoặc Slack khi có bước trước đó bị thất bại.

## 📚 Tổng kết
- Các Step trong Job luôn thực thi tuần tự từ trên xuống dưới trên cùng một Runner.
- Nếu một Step lỗi, các Step tiếp theo mặc định bị bỏ qua; có thể chạy bước xử lý lỗi bằng `if: failure()`.
- Đặt `id` cho Step cho phép chia sẻ dữ liệu đầu ra giữa các bước một cách mạch lạc.
