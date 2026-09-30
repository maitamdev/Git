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
  "content": "# Cấu hình Jobs: runs-on, phân tách độc lập và môi trường\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững cú pháp khai báo Job và thuộc tính bắt buộc runs-on để chỉ định môi trường điều hành.\n- Hiểu rõ nguyên lý cô lập hoàn toàn giữa các Job về hệ thống tệp tin, biến môi trường và tiến trình.\n- Biết cách đặt tên định danh cho Job (job id) và hiển thị tên thân thiện (name) trên giao diện.\n\n---\n\n## 📖 Định nghĩa\n> Một Job là một tập hợp các bước (steps) được thực thi trên cùng một máy ảo hoặc bộ chứa (container) cụ thể. Thuộc tính bắt buộc hàng đầu của mỗi Job là runs-on, chỉ định hệ điều hành của máy ảo Runner mà GitHub sẽ cấp phát (ví dụ: ubuntu-latest, windows-latest, macos-latest). Mỗi Job trong một workflow có mã định danh duy nhất (job_id), chạy độc lập và không chia sẻ bộ nhớ hay tệp tin với các Job khác trong cùng một phiên chạy.\n\n---\n\n## 🤔 Tại sao cần?\nPhân tách các công việc thành các Job riêng biệt giúp khai thác triệt để khả năng xử lý song song, rút ngắn thời gian phản hồi của pipeline từ vài chục phút xuống chỉ còn vài phút. Hơn nữa, việc này cho phép bạn chỉ định các môi trường chạy phù hợp cho từng loại tác vụ, ví dụ: kiểm tra linter nhanh trên Ubuntu giá rẻ, nhưng biên dịch ứng dụng iOS bắt buộc phải chạy trên Runner macOS đắt tiền hơn.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung bạn đang điều phối một cuộc thi nấu ăn quốc tế. Bạn có 3 phòng bếp riêng biệt: một phòng cho đầu bếp làm bánh (Job 1 trên Runner Ubuntu), một phòng cho đầu bếp làm món nướng (Job 2 trên Runner Windows), và một phòng cho chuyên gia pha chế (Job 3 trên Runner macOS). Mỗi người có một căn phòng sạch sẽ với đầy đủ dụng cụ riêng biệt, họ làm việc cùng lúc mà không lo người này làm đổ bột mì sang chảo dầu của người kia.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nWorkflow Execution:\n┌─────────────────────────────────────────────────────────────┐\n│ jobs:                                                       │\n│   lint:                     test:                 build:    │\n│     runs-on: ubuntu-latest    runs-on: ubuntu-22    runs-on: │\n│     [Clean Virtual VM]        [Clean Virtual VM]    macos   │\n│     steps:                    steps:                steps:  │\n│       - step 1                  - step 1              - step│\n└─────────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhóm phát triển phần mềm kế toán thiết kế workflow chứa 3 Jobs: Job 1 kiểm tra phong cách lập trình linter (runs-on: ubuntu-latest, hoàn thành trong 30 giây); Job 2 thực thi các bài kiểm thử cơ sở dữ liệu (runs-on: ubuntu-latest, hoàn thành trong 3 phút); Job 3 kiểm tra tương thích giao diện trên trình duyệt Safari (runs-on: macos-latest, hoàn thành trong 5 phút). Vì ba Job được cấp phát 3 máy ảo riêng và chạy đồng thời, tổng thời gian toàn bộ pipeline hoàn thành chỉ là 5 phút thay vì phải chờ 8 phút 30 giây nếu chạy tuần tự.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ncat .github/workflows/multi-job.yml\ngh run view\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh cat xem cấu hình đa Job trong tệp YAML và gh run view cho phép xem tiến độ thực thi thực tế của từng Job đang chạy song song trên các Runner để đánh giá thời lượng và hiệu suất hoàn thành.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Quên khai báo thuộc tính bắt buộc runs-on khiến hệ thống báo lỗi cú pháp YAML và từ chối chạy Job.**: \n2. **Sử dụng Runner macOS hoặc Windows cho các tác vụ đơn giản chỉ cần Linux, làm tiêu tốn gấp 2 đến 10 lần thời lượng hạn ngạch miễn phí.**: \n3. **Đặt tên job_id chứa ký tự đặc biệt hoặc dấu cách không hợp lệ.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Khai báo khối `jobs` với 2 Job riêng biệt: `code-quality` và `unit-testing`.\n2. Chỉ định `runs-on: ubuntu-latest` cho cả hai tác vụ.\n3. Đặt thuộc tính `name` trực quan bằng tiếng Việt cho từng Job để hiển thị đẹp mắt trên giao diện.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Luôn ưu tiên chọn `ubuntu-latest` trừ khi dự án của bạn bắt buộc phải có môi trường Windows hoặc macOS.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nHai Job được khởi chạy đồng thời trên hai máy ảo Runner độc lập.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng kiểm tra kiến thức về cấu hình Job và thuộc tính runs-on qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao GitHub tính phí phút chạy máy ảo macOS đắt gấp 10 lần so với máy ảo Linux Ubuntu, và kỹ sư nên tối ưu hóa điều này như thế nào?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Mỗi Job đại diện cho một tác vụ độc lập chạy trên một máy ảo Runner được cấp phát riêng.\n- Thuộc tính `runs-on` là bắt buộc để chỉ định hệ điều hành (`ubuntu-latest`, `windows-latest`, `macos-latest`).\n- Các Job mặc định chạy song song hoàn toàn, giúp tối ưu hóa tối đa thời gian thực thi của đường ống.\n",
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
            "text": "Máy ảo Runner bị hủy hoàn toàn cùng toàn bộ dữ liệu tạm thời trên ổ đĩa",
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
        "explanation": "Các Runner do GitHub lưu trữ (GitHub-hosted) hoạt động theo mô hình phi trạng thái (ephemeral), máy ảo bị xóa sạch ngay sau khi Job kết thúc."
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
      }
    ]
  }
};
export default lesson;
