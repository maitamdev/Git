import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-steps-execution",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "07-steps-execution",
    "title": "Các bước thực thi (Steps): name, id và thứ tự tuần tự",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "06-jobs-configuration"
    ],
    "objectives": [
      "Nắm vững cấu trúc danh sách steps trong Job và tính chất thực thi tuần tự nghiêm ngặt.",
      "Hiểu rõ công dụng của thuộc tính name (mô tả trực quan) và thuộc tính id (định danh để tham chiếu output).",
      "Nắm được cơ chế dừng khẩn cấp khi một Step thất bại và cách tiếp tục với continue-on-error."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "steps execution",
      "step id",
      "sequential",
      "step name",
      "working directory"
    ],
    "commands": [
      "echo \"Hello Step\"",
      "gh run view --log"
    ]
  },
  "content": "# Các bước thực thi (Steps): name, id và thứ tự tuần tự\n\n## 🎯 Mục tiêu\n- Nắm vững cấu trúc danh sách steps trong Job và tính chất thực thi tuần tự nghiêm ngặt.\n- Hiểu rõ công dụng của thuộc tính `name` (mô tả trực quan) và thuộc tính `id` (định danh để tham chiếu output).\n- Nắm được cơ chế dừng khẩn cấp khi một Step thất bại và cách tiếp tục với `continue-on-error`.\n\n## 🧩 Từ khóa hôm nay\n### Sequential Steps\n- **Nói dễ hiểu**: Các bước bên trong cùng một Job luôn chạy tuần tự từng bước một từ trên xuống dưới trên cùng máy ảo.\n- **Ví dụ**: Bước 1 tải code về đĩa, bước 2 cài thư viện, bước 3 chạy test; không thể chạy lẫn lộn.\n- **Đừng nhầm**: Các Step trong cùng một Job không chạy song song; chỉ các Job khác nhau mới chạy song song.\n\n### Fail-fast Mechanism\n- **Nói dễ hiểu**: Khi một bước bị lỗi (mã thoát khác 0), toàn bộ các bước phía sau tự động dừng lại ngay lập tức.\n- **Ví dụ**: Nếu lệnh `npm test` ở bước 3 trả mã lỗi, bước 4 thường bị bỏ qua theo điều kiện mặc định.\n- **Đừng nhầm**: Step có `if` riêng như `failure()` vẫn có thể chạy; `continue-on-error: true` cho phép tiếp tục nhưng có thể khiến kết quả Job vẫn xanh.\n\n### Step Outputs\n- **Nói dễ hiểu**: Dữ liệu do một bước tạo ra và xuất ra để các bước tiếp theo trong cùng Job có thể đọc lại.\n- **Ví dụ**: Bước 1 tính ra mã hash phiên bản và gán vào output để bước 3 dùng gắn thẻ tag.\n- **Đừng nhầm**: Bắt buộc phải đặt thuộc tính `id` cho bước đó thì các bước sau mới có thể tham chiếu giá trị output.\n\n## 📖 Định nghĩa\nSteps (Các bước) là danh sách tác vụ trong một Job. Mỗi Step dùng `run` để chạy lệnh shell hoặc `uses` để gọi Action. Steps được xét theo thứ tự khai báo và dùng chung workspace; sau lỗi, các step sau mặc định bị bỏ qua trừ khi điều kiện hoặc `continue-on-error` thay đổi hành vi.\n\n## 💡 Tại sao cần\nHiểu cơ chế Step giúp bạn kiểm soát chu trình xử lý mã nguồn. Mặc định, bước sau không chạy sau lỗi; điều kiện riêng vẫn có thể cho bước khác chạy, nên hãy đặt phụ thuộc phát hành rõ ràng.\n\n## 🧠 Mental Model\nHãy tưởng tượng các Step như công thức làm bánh ngọt từng bước: Bước 1: Đập trứng; Bước 2: Đánh tan trứng; Bước 3: Cho đường và sữa; Bước 4: Nướng bánh trong lò. Bạn không thể nướng bánh trước khi đập trứng. Và nếu ở Bước 1 quả trứng bị hỏng (`Step 1 Failed`), bạn phải dừng lại ngay lập tức chứ không được tiếp tục đổ sữa và nướng.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    S1[Step 1: actions/checkout@v7 - Thành công] --> S2[Step 2: npm install - Thành công]\n    S2 --> S3{Step 3: npm test}\n    S3 -- Thành công --> S4[Step 4: npm run build]\n    S3 -- Thất bại --> Skip[Step 4 mặc định bị bỏ qua]\n    S3 -- Thất bại, if riêng --> Rescue[Step có if: failure() vẫn có thể chạy]\n```\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư cấu hình Job chạy kiểm thử cho ứng dụng Python: Step 1 tải mã nguồn về; Step 2 cài đặt thư viện pytest; Step 3 chạy lệnh `pytest tests/` với định danh `id: test_run`; Step 4 gửi thông báo thành công. Trong một lần chạy, Step 3 phát hiện lỗi chia cho số 0 và trả về mã lỗi 1. Toàn bộ Job lập tức chuyển sang màu đỏ và Step 4 hoàn toàn không được gọi, giúp tiết kiệm thời gian chạy vô ích.\n\n## 💻 Command & Cú pháp\n```bash\n# In ra một thông báo kiểm tra trong thuộc tính run của step\necho \"Hello Step\"\n\n# Xem chi tiết nhật ký log của từng step trong lần chạy gần nhất\ngh run view --log\n```\n\n## 🔍 Giải thích command\n- `echo \"Hello Step\"`: Ví dụ về một câu lệnh shell đơn giản được thực thi trực tiếp bên trong từ khóa `run` của step.\n- `gh run view --log`: Hiển thị log của workflow run; cần cài GitHub CLI và quyền đọc repo.\n\n## ⚠️ Sai lầm phổ biến\n- Cho rằng mỗi Step chạy trong một thư mục riêng biệt (thực tế toàn bộ các Step dùng chung `github.workspace`).\n- Thiếu thuộc tính `name` khiến giao diện hiển thị các câu lệnh shell dài dòng rất khó đọc và khó tra cứu lỗi.\n- Quên đặt thuộc tính `id` khi muốn trích xuất dữ liệu đầu ra (`outputs`) của Step đó cho các bước tiếp theo sử dụng.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Khai báo danh sách `steps` gồm ít nhất 3 bước với tên mô tả `name` rõ ràng:\n   ```yaml\n   name: Steps Sequence Demo\n   on: [push]\n   jobs:\n     demo:\n       runs-on: ubuntu-latest\n       steps:\n         - name: Bước 1 - Kiểm tra môi trường\n           run: uname -a\n         - name: Bước 2 - Thiết lập biến\n           id: setup\n           run: echo \"status=ready\" >> $GITHUB_OUTPUT\n         - name: Bước 3 - Đọc biến đầu ra\n           run: echo \"Trạng thái là ${{ steps.setup.outputs.status }}\"\n   ```\n2. Đẩy file lên GitHub và theo dõi tab Actions để xem các bước chạy tuần tự lần lượt.\n3. Thử cố tình chèn lệnh `exit 1` vào bước 2 để quan sát bước 3 tự động bị chuyển sang trạng thái Skipped.\n\n## 💡 Hint & mẹo\n- Luôn đặt tên `name` mô tả rõ hành động (ví dụ: \"Cài đặt dependencies\", \"Chạy unit test\") thay vì để trống.\n- Với bước dọn dẹp ngắn sau thành công hoặc lỗi, cân nhắc `if: ${{ !cancelled() }}`; chỉ dùng `always()` khi cần thử chạy cả sau khi bị hủy và bước đó kết thúc nhanh.\n\n## ✅ Validation & Kết quả mong đợi\n- Các Step thực thi đúng theo thứ tự khai báo từ trên xuống dưới trên cùng một Runner.\n- Sau lỗi, step sau mặc định bị bỏ qua; điều kiện riêng và `continue-on-error` có thể làm thay đổi luồng chạy.\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ hiểu biết của bạn về cơ chế thực thi của các Step trong Job.\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách sử dụng hàm điều kiện `if: failure()` để chỉ kích hoạt một bước gửi thông báo cảnh báo lỗi tới Discord hoặc Slack khi có bước trước đó bị thất bại.\n\n## 📝 Tổng kết\n- Các Step trong Job luôn thực thi tuần tự từ trên xuống dưới trên cùng một Runner.\n- Nếu một Step lỗi, các Step tiếp theo mặc định bị bỏ qua; có thể chạy bước xử lý lỗi bằng `if: failure()`.\n- Đặt `id` cho Step cho phép chia sẻ dữ liệu đầu ra giữa các bước một cách mạch lạc.\n",
  "quiz": {
    "id": "quiz-07-github-actions-07-steps-execution",
    "title": "Trắc nghiệm: Các bước thực thi (Steps): name, id và thứ tự tuần tự",
    "questions": [
      {
        "id": "q1",
        "question": "Thứ tự thực thi của các Step bên trong một Job được quyết định như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Tuần tự lần lượt từ trên xuống dưới theo thứ tự khai báo trong tệp YAML",
            "correct": true
          },
          {
            "text": "Chạy song song cùng lúc",
            "correct": false
          },
          {
            "text": "Theo thứ tự bảng chữ cái của tên Step",
            "correct": false
          },
          {
            "text": "Ngẫu nhiên tùy theo tải của máy chủ",
            "correct": false
          }
        ],
        "explanation": "Các Step trong một Job luôn tuân thủ nguyên tắc thực thi tuần tự từ trên xuống dưới."
      },
      {
        "id": "q2",
        "question": "Điều gì xảy ra với các Step phía sau nếu một Step bị lỗi (exit code khác 0)?",
        "type": "single",
        "options": [
          {
            "text": "Mặc định các Step sau bị bỏ qua và Job thất bại, trừ khi điều kiện hoặc continue-on-error thay đổi hành vi",
            "correct": true
          },
          {
            "text": "Hệ thống tự động khởi động lại máy tính của lập trình viên",
            "correct": false
          },
          {
            "text": "Các Step phía sau vẫn chạy bình thường như không có gì xảy ra",
            "correct": false
          },
          {
            "text": "Toàn bộ kho lưu trữ GitHub bị khóa tạm thời",
            "correct": false
          }
        ],
        "explanation": "Mặc định các step sau chỉ chạy khi trước đó thành công; điều kiện trạng thái hoặc continue-on-error có thể thay đổi quy tắc này."
      },
      {
        "id": "q3",
        "question": "Thuộc tính nào giúp một Step vẫn tiếp tục chạy mà không làm dừng Job kể cả khi lệnh bên trong bị lỗi?",
        "type": "single",
        "options": [
          {
            "text": "continue-on-error: true",
            "correct": true
          },
          {
            "text": "ignore-failure: true",
            "correct": false
          },
          {
            "text": "allow-crash: true",
            "correct": false
          },
          {
            "text": "force-run: true",
            "correct": false
          }
        ],
        "explanation": "`continue-on-error: true` cho phép bước tiếp tục sau lỗi; hãy cân nhắc vì Job có thể được báo thành công dù step đó lỗi."
      },
      {
        "id": "q4",
        "question": "Mục đích chính của thuộc tính `id` trong một Step là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đặt tên định danh để các Step sau có thể truy cập biến đầu ra (outputs) của Step này",
            "correct": true
          },
          {
            "text": "Để GitHub trừ tiền vào tài khoản người dùng",
            "correct": false
          },
          {
            "text": "Để mã hóa tệp tin chứa mã nguồn",
            "correct": false
          },
          {
            "text": "Bắt buộc phải có thì Step mới chạy được",
            "correct": false
          }
        ],
        "explanation": "Gán `id` cho Step giúp bạn có thể tham chiếu các giá trị output qua cú pháp `${{ steps.my_id.outputs.my_var }}`."
      },
      {
        "id": "q5",
        "question": "Mỗi Step bên trong một Job thường thực hiện công việc qua từ khóa nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Chạy câu lệnh shell bằng `run` hoặc gọi Action đóng gói sẵn bằng `uses`",
            "correct": true
          },
          {
            "text": "Bắt buộc phải kết hợp cả hai từ khóa `run` và `uses` trong cùng một Step",
            "correct": false
          },
          {
            "text": "Chỉ có thể gửi email chứ không thể chạy bất kỳ dòng lệnh nào",
            "correct": false
          },
          {
            "text": "Tự động khởi động lại máy chủ mỗi khi chạy xong một lệnh",
            "correct": false
          }
        ],
        "explanation": "Một Step thường hoặc là thực thi lệnh shell qua `run`, hoặc tái sử dụng một action có sẵn qua `uses`."
      }
    ]
  }
};
export default lesson;
