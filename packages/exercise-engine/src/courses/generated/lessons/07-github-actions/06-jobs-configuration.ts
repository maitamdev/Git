import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-jobs-configuration",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "06-jobs-configuration",
    "title": "Cấu hình Jobs: runs-on, phân tách độc lập và môi trường",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "05-events-and-triggers"
    ],
    "objectives": [
      "Nắm vững cú pháp khai báo Job và thuộc tính bắt buộc runs-on để chỉ định môi trường điều hành.",
      "Hiểu rõ nguyên lý cô lập hoàn toàn giữa các Job về hệ thống tệp tin, biến môi trường và tiến trình.",
      "Biết cách đặt tên định danh cho Job (job id) và hiển thị tên thân thiện (name) trên giao diện."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "job configuration",
      "runs on",
      "ubuntu latest",
      "isolation",
      "concurrency"
    ],
    "commands": [
      "cat .github/workflows/multi-job.yml",
      "gh run view"
    ]
  },
  "content": "# Cấu hình Jobs: runs-on, phân tách độc lập và môi trường\n\n## 🎯 Mục tiêu\n- Nắm vững cú pháp khai báo Job và thuộc tính bắt buộc `runs-on` để chỉ định môi trường điều hành.\n- Hiểu rõ nguyên lý cô lập hoàn toàn giữa các Job về hệ thống tệp tin, biến môi trường và tiến trình.\n- Biết cách đặt tên định danh cho Job (`job_id`) và hiển thị tên thân thiện (`name`) trên giao diện.\n\n## 🧩 Từ khóa hôm nay\n### runs-on\n- **Nói dễ hiểu**: Thuộc tính chọn runner theo nhãn hoặc nhóm; với Job chạy lệnh, giá trị thường là nhãn hệ điều hành hoặc `self-hosted`.\n- **Ví dụ**: Khai báo `runs-on: ubuntu-latest` để chạy Job trên môi trường Linux Ubuntu mới nhất.\n- **Đừng nhầm**: Job chạy trực tiếp trên runner cần `runs-on`; Job gọi reusable workflow dùng `uses` ở cấp Job thay thế.\n\n### Parallel Jobs\n- **Nói dễ hiểu**: Cơ chế mặc định của GitHub Actions chạy tất cả các Job trong cùng workflow song song cùng lúc.\n- **Ví dụ**: Job `lint` và Job `test` khởi động đồng thời trên hai máy ảo khác nhau để rút ngắn thời gian chờ đợi.\n- **Đừng nhầm**: Nếu muốn các Job chạy nối tiếp tuần tự, bạn bắt buộc phải dùng thuộc tính phụ thuộc `needs`.\n\n### Job Isolation\n- **Nói dễ hiểu**: Mỗi Job là một đơn vị thực thi riêng; GitHub-hosted thường cấp môi trường sạch, còn self-hosted có thể giữ trạng thái giữa các lần chạy.\n- **Ví dụ**: Tệp tin tải về ở Job A không tự động xuất hiện ở Job B trừ khi được chia sẻ qua Artifacts.\n- **Đừng nhầm**: Không dựa vào việc hai Job dùng chung ổ đĩa; hãy truyền kết quả bằng Artifact, output hoặc cơ chế lưu trữ phù hợp.\n\n## 📖 Định nghĩa\nMột Job là tập hợp các bước được thực thi trên runner được chọn. Với Job chạy steps, `runs-on` chọn runner theo nhãn, ví dụ `ubuntu-latest` hoặc `self-hosted`; có thể chạy một số Job trong container. Job có mã định danh duy nhất (`job_id`). Không nên dựa vào việc Job khác có cùng máy hay workspace; dùng cách truyền dữ liệu rõ ràng.\n\n## 🤔 Tại sao cần?\nPhân tách quy trình thành các Job riêng biệt giúp tận dụng tối đa khả năng xử lý song song, rút ngắn thời gian phản hồi của pipeline từ hàng chục phút xuống còn vài phút. Ngoài ra, việc này cho phép bạn chỉ định môi trường phù hợp cho từng loại tác vụ: chạy linter trên Linux tiết kiệm chi phí, trong khi build ứng dụng iOS chạy trên macOS.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn điều phối một cuộc thi nấu ăn. Bạn có 3 phòng bếp riêng: một phòng làm bánh (`Job 1` trên Ubuntu), một phòng làm món nướng (`Job 2` trên Windows), và một phòng pha chế (`Job 3` trên macOS). Mỗi người có một căn phòng sạch sẽ với đầy đủ dụng cụ riêng, làm việc đồng thời mà không sợ người này làm đổ bột mì sang chảo dầu của người kia.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart TD\n    Workflow[Workflow Execution] --> Job1[Job: lint trên ubuntu-latest]\n    Workflow --> Job2[Job: test trên ubuntu-latest]\n    Workflow --> Job3[Job: build trên macos-latest]\n    Job1 -. Máy ảo độc lập 1 .-> Clean1[Clean VM 1]\n    Job2 -. Máy ảo độc lập 2 .-> Clean2[Clean VM 2]\n    Job3 -. Máy ảo độc lập 3 .-> Clean3[Clean VM 3]\n```\n\n## 🌎 Ví dụ thực tế\nMột công ty phần mềm tài chính cấu hình workflow gồm 3 Jobs: Job 1 chạy linter (`ubuntu-latest`, mất 30 giây); Job 2 chạy unit tests (`ubuntu-latest`, mất 3 phút); Job 3 kiểm tra giao diện Safari (`macos-latest`, mất 5 phút). Vì ba Job chạy đồng thời trên 3 máy ảo riêng, toàn bộ pipeline hoàn thành chỉ trong 5 phút thay vì phải chờ 8 phút 30 giây nếu chạy tuần tự.\n\n## 💻 Command\n```bash\n# Xem cấu hình các Job trong tệp workflow\ncat .github/workflows/multi-job.yml\n\n# Xem tiến độ thực thi chi tiết của các Job trong lần chạy gần nhất\ngh run view\n```\n\n## 🔍 Giải thích command\n- `cat .github/workflows/multi-job.yml`: Kiểm tra các khối khai báo `jobs`, `runs-on` và `steps` trong tệp cấu hình.\n- `gh run view`: Hiển thị trạng thái hoàn thành và thời gian thực thi của từng Job đang chạy song song trên GitHub Actions.\n\n## ⚠️ Sai lầm phổ biến\n- Quên khai báo thuộc tính bắt buộc `runs-on` khiến GitHub từ chối biên dịch tệp workflow.\n- Chọn hệ điều hành không cần thiết cho tác vụ; mức phí và hạn mức thay đổi theo nền tảng, loại runner và gói dịch vụ.\n- Dùng khoảng trắng hoặc ký tự ngoài chữ/số/gạch nối/gạch dưới cho `job_id`; hãy dùng ID dễ đọc gồm chữ, số, `-` hoặc `_`.\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Mở tệp `.github/workflows/multi-job.yml` và khai báo hai Job độc lập:\n   ```yaml\n   name: Parallel Jobs Demo\n   on: [push]\n   jobs:\n     code-quality:\n       name: Kiểm tra chuẩn mã nguồn\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Linting passed!\"\n     unit-testing:\n       name: Kiểm thử đơn vị\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Unit tests passed!\"\n   ```\n2. Đẩy file lên GitHub và theo dõi tiến trình chạy trong tab Actions.\n3. Quan sát hai Job độc lập; chúng có thể được xếp hàng và bắt đầu gần nhau nhưng không được đảm bảo khởi chạy cùng một lúc.\n\n## 💡 Hint\n- Luôn ưu tiên chọn `ubuntu-latest` trừ khi dự án của bạn bắt buộc phải có môi trường Windows hoặc macOS chuyên biệt.\n- Dùng `timeout-minutes` để giới hạn thời gian Job chạy; mức tiêu thụ và tính phí phụ thuộc chính sách hiện hành của runner/repo.\n\n## ✅ Validation\n- Cả hai Job hiển thị tên tiếng Việt thân thiện trên bảng điều khiển giao diện web của GitHub Actions.\n- Hai Job bắt đầu chạy cùng thời điểm và có biểu tượng dấu tích xanh độc lập khi hoàn tất.\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững cấu hình Job và thuộc tính `runs-on`.\n\n## 🔥 Challenge\nTra cứu bảng phí/hạn mức GitHub Actions hiện hành và so sánh các loại runner; ghi rõ gói repo và loại runner vì đơn giá thay đổi theo thời gian.\n\n## 📚 Tổng kết\n- Mỗi Job chạy trên runner đã chọn; trạng thái giữa các lần chạy phụ thuộc loại runner.\n- `runs-on` chọn runner cho Job chạy steps; có thể dùng nhãn hệ điều hành, nhóm hoặc nhãn self-hosted.\n- Các Job không có phụ thuộc có thể chạy song song, nhưng thời điểm bắt đầu còn tùy tài nguyên và giới hạn concurrency.\n",
  "quiz": {
    "id": "quiz-07-github-actions-06-jobs-configuration",
    "title": "Trắc nghiệm: Cấu hình Jobs: runs-on, phân tách độc lập và môi trường",
    "questions": [
      {
        "id": "q1",
        "question": "Thuộc tính nào là bắt buộc phải có trong mỗi định nghĩa Job của GitHub Actions?",
        "type": "single",
        "options": [
          {
            "text": "runs-on",
            "correct": true
          },
          {
            "text": "timeout",
            "correct": false
          },
          {
            "text": "machine-type",
            "correct": false
          },
          {
            "text": "os-system",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions bắt buộc phải biết máy ảo loại nào được dùng để thực thi Job thông qua từ khóa `runs-on`."
      },
      {
        "id": "q2",
        "question": "Giá trị nào sau đây thường được sử dụng phổ biến và tiết kiệm nhất cho thuộc tính runs-on?",
        "type": "single",
        "options": [
          {
            "text": "ubuntu-latest",
            "correct": true
          },
          {
            "text": "macos-latest",
            "correct": false
          },
          {
            "text": "windows-latest",
            "correct": false
          },
          {
            "text": "solaris-latest",
            "correct": false
          }
        ],
        "explanation": "`ubuntu-latest` là môi trường Linux phổ biến nhất, tốc độ khởi động cực nhanh và có chi phí tài nguyên thấp nhất."
      },
      {
        "id": "q3",
        "question": "Điều gì xảy ra với hệ thống tệp tin sau khi một Job kết thúc phiên chạy của mình?",
        "type": "single",
        "options": [
          {
            "text": "GitHub-hosted runner thường được làm mới; self-hosted có thể giữ lại tệp và trạng thái",
            "correct": true
          },
          {
            "text": "Hệ thống tự động lưu toàn bộ ổ cứng vào tài khoản Google Drive của bạn",
            "correct": false
          },
          {
            "text": "Tệp tin được giữ nguyên vĩnh viễn cho lần chạy tiếp theo",
            "correct": false
          },
          {
            "text": "Dữ liệu tự động chuyển sang máy tính cá nhân của lập trình viên",
            "correct": false
          }
        ],
        "explanation": "GitHub-hosted runners tiêu chuẩn thường dùng môi trường mới cho mỗi Job; self-hosted runners có thể được tái sử dụng và cần tự dọn dẹp."
      },
      {
        "id": "q4",
        "question": "Mục đích của việc đặt trường `name:` bên trong cấu hình Job là gì?",
        "type": "single",
        "options": [
          {
            "text": "Hiển thị tên mô tả thân thiện, dễ đọc trên giao diện web của GitHub Actions",
            "correct": true
          },
          {
            "text": "Đặt tên tài khoản đăng nhập vào máy ảo",
            "correct": false
          },
          {
            "text": "Đặt mật khẩu mã hóa cho tệp cấu hình",
            "correct": false
          },
          {
            "text": "Quy định tên của thư mục chứa mã nguồn",
            "correct": false
          }
        ],
        "explanation": "Trường `name:` giúp người quản trị dễ dàng nhận diện tác vụ trên giao diện trực quan thay vì chỉ nhìn thấy mã định danh `job_id`."
      },
      {
        "id": "q5",
        "question": "Thuộc tính `timeout-minutes` trong cấu hình của một Job có ý nghĩa bảo vệ gì?",
        "type": "single",
        "options": [
          {
            "text": "Tự động hủy Job nếu thời gian chạy vượt quá số phút quy định để tránh lãng phí tài nguyên khi bị treo vô hạn",
            "correct": true
          },
          {
            "text": "Bắt buộc máy ảo phải chờ đủ số phút đó rồi mới bắt đầu chạy",
            "correct": false
          },
          {
            "text": "Đếm ngược thời gian bảo hành phần cứng máy chủ của GitHub",
            "correct": false
          },
          {
            "text": "Tạm dừng kết nối Internet của kho lưu trữ trong một khoảng thời gian",
            "correct": false
          }
        ],
        "explanation": "Giới hạn thời gian giúp dừng Job bị treo; quota và chi phí phụ thuộc loại runner, repo và gói dịch vụ hiện hành."
      }
    ]
  }
};
export default lesson;
