import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-workflow-architecture",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "03-workflow-architecture",
    "title": "Kiến trúc Workflow: Events, Jobs, Steps và Runners",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "02-github-actions-intro"
    ],
    "objectives": [
      "Hiểu Event có thể kích hoạt Workflow; Workflow chứa Jobs, mỗi Job chạy trên Runner và có các Steps.",
      "Phân biệt Step gọi Action bằng uses với Step chạy lệnh shell bằng run.",
      "Hiểu các Job không phụ thuộc có thể chạy song song, còn các Step trong một Job chạy theo thứ tự."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "workflow architecture",
      "event",
      "job",
      "step",
      "runner",
      "dag"
    ],
    "commands": [
      "cat .github/workflows/ci.yml",
      "tree .github"
    ]
  },
  "content": "# Kiến trúc Workflow: Events, Jobs, Steps và Runners\n\n## 🎯 Mục tiêu\n- Hiểu luồng từ Event kích hoạt Workflow; Workflow chứa Jobs, mỗi Job chạy trên Runner và gồm các Steps.\n- Hiểu các Job độc lập có thể chạy song song mặc định và các Step trong một Job chạy tuần tự.\n- Phân biệt runner do GitHub quản lý với runner tự quản lý; không phải runner nào cũng là máy ảo sạch.\n\n## 🧩 Từ khóa hôm nay\n### Event\n- **Nói dễ hiểu**: Sự kiện kích hoạt khiến GitHub Actions khởi động luồng công việc tự động.\n- **Ví dụ**: Hành động đẩy commit lên nhánh `main` hoặc tạo một Pull Request mới.\n- **Đừng nhầm**: Không chỉ giới hạn trong thao tác Git; sự kiện có thể là tạo nhãn, mở issue hay chạy định kỳ theo giờ.\n\n### Job\n- **Nói dễ hiểu**: Một khối công việc trong workflow, có thể chạy song song với Job khác nếu không khai báo phụ thuộc.\n- **Ví dụ**: Job `build` và Job `lint` chạy cùng lúc trên hai máy ảo Ubuntu khác nhau.\n- **Đừng nhầm**: Các Job không dùng chung ổ cứng; file tạo ra ở Job này không tự xuất hiện ở Job khác trừ khi dùng Artifact.\n\n### Runner\n- **Nói dễ hiểu**: Máy hoặc môi trường chạy GitHub Actions Runner để thực thi một Job.\n- **Ví dụ**: Máy ảo chạy hệ điều hành Ubuntu mới nhất (`runs-on: ubuntu-latest`).\n- **Đừng nhầm**: Runner GitHub-hosted thường được làm mới sau Job; self-hosted có thể là máy lâu dài và giữ lại trạng thái.\n\n## 📖 Định nghĩa\nEvent có thể kích hoạt một Workflow. Workflow khai báo một hay nhiều Job; mỗi Job chọn Runner bằng `runs-on` và chứa các Step. Step có thể gọi Action bằng `uses` hoặc chạy lệnh shell bằng `run`. Các Job không phụ thuộc có thể chạy song song; `needs` tạo thứ tự phụ thuộc. Các Step trong Job chạy theo thứ tự khai báo và dùng chung workspace của Job đó.\n\n## 🤔 Tại sao cần?\nHiểu ranh giới giữa Job và Step giúp bạn biết file nào có thể dùng lại. Workspace được chia sẻ giữa các Step trong Job; Job khác thường có runner riêng, nên cần Artifact, cache hoặc truyền dữ liệu qua outputs phù hợp.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng một nhà hàng tiệc cưới. Event là tiếng chuông báo khách đã vào sảnh. Workflow là toàn bộ thực đơn tiệc. Các Job là các quầy bếp riêng: Quầy khai vị, Quầy món chính và Quầy tráng miệng hoạt động song song ở các góc bếp riêng (`Runners`). Bên trong mỗi quầy, đầu bếp làm từng thao tác tuần tự (`Steps`): rửa rau, thái thịt, nấu sốt.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart TD\n    Event[Event: push code] --> Workflow[Workflow: CI Pipeline]\n    Workflow --> Job1[Job 1: Lint trên Ubuntu Runner]\n    Workflow --> Job2[Job 2: Test trên Ubuntu Runner]\n    Job2 --> Step1[Step 1: actions/checkout]\n    Step1 --> Step2[Step 2: actions/setup-node]\n    Step2 --> Step3[Step 3: npm test]\n```\n\n## 🌎 Ví dụ thực tế\nTrong dự án ứng dụng di động Flutter, khi có Pull Request, Workflow có thể kích hoạt hai Job: một Job chạy linter trên Linux, Job kia biên dịch iOS trên macOS. Mỗi Job chọn một Runner riêng theo cấu hình. Runner GitHub-hosted thường là môi trường mới cho mỗi Job; self-hosted có thể giữ trạng thái từ lần chạy trước.\n\n## 💻 Command\n```bash\n# Kiểm tra cấu trúc thư mục chứa các workflow\nls -la .github/workflows/\n\n# Xem nội dung chi tiết của tệp workflow\ncat .github/workflows/ci.yml\n```\n\n## 🔍 Giải thích command\n- `ls -la .github/workflows/`: Liệt kê tất cả các tệp YAML định nghĩa quy trình tự động hóa trong repository.\n- `cat .github/workflows/ci.yml`: Đọc nội dung khai báo các khối kiến trúc `on`, `jobs` và `steps` để kiểm tra cú pháp kịch bản.\n\n## ⚠️ Sai lầm phổ biến\n- Cho rằng tệp tin tạo ra ở Job 1 sẽ tự động có mặt ở Job 2 trên ổ đĩa cục bộ.\n- Tạo quá nhiều Job nhỏ chỉ chứa một dòng lệnh đơn giản gây lãng phí thời gian khởi động máy ảo Runner.\n- Nhầm lẫn thứ tự thực thi của các Step bên trong một Job (các Step luôn chạy tuần tự từ trên xuống).\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Xem xét sơ đồ phân cấp giữa Event, Job, Step và Runner để nắm chắc quy luật chia sẻ dữ liệu.\n2. Xác định xem hai tác vụ Lint và Unit Test nên đặt trong cùng một Job hay chia làm hai Job chạy song song.\n3. Tạo thư mục quy chuẩn `.github/workflows` trong dự án thực hành nếu chưa có.\n4. Mở tệp `.github/workflows/ci.yml` và phân biệt rõ các cấp bậc thụt đầu dòng giữa `jobs` và `steps`.\n\n## 💡 Hint\n- Ghi nhớ quy tắc vàng: Các Step trong một Job dùng chung hệ thống tệp tin, các Job khác nhau hoàn toàn cách ly về bộ nhớ và ổ đĩa.\n- Hãy dùng `needs` khi bạn muốn một Job phải chờ một Job khác hoàn thành trước khi bắt đầu.\n\n## ✅ Validation\n- Phân biệt chính xác phạm vi chia sẻ dữ liệu giữa cấp độ Job và cấp độ Step.\n- Cấu trúc thư mục `.github/workflows/` được đặt chính xác ở thư mục gốc của repository.\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra khả năng phân tích kiến trúc phân tầng trong GitHub Actions.\n\n## 🔥 Challenge\nNếu bạn có 100 bài kiểm thử mất 20 phút để chạy trên một máy ảo, bạn sẽ tái cấu trúc các Job như thế nào để giảm thời gian hoàn thành xuống còn 5 phút?\n\n## 📚 Tổng kết\n- Workflow được kích hoạt bởi Event và chứa một tập hợp các Jobs.\n- Các Job không phụ thuộc có thể chạy song song; `needs` tạo thứ tự phụ thuộc.\n- Các Step trong một Job chạy theo thứ tự và dùng chung workspace của Job đó.\n",
  "quiz": {
    "id": "quiz-07-github-actions-03-workflow-architecture",
    "title": "Trắc nghiệm: Kiến trúc Workflow: Events, Jobs, Steps và Runners",
    "questions": [
      {
        "id": "q1",
        "question": "Mặc định, các Job trong cùng một Workflow của GitHub Actions sẽ thực thi như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Job không phụ thuộc thường có thể chạy song song trên các runner đã chọn",
            "correct": true
          },
          {
            "text": "Thực thi tuần tự từng Job một theo thứ tự từ trên xuống dưới",
            "correct": false
          },
          {
            "text": "Chỉ thực thi ngẫu nhiên một Job duy nhất rồi dừng lại",
            "correct": false
          },
          {
            "text": "Chờ người quản trị bấm kích hoạt từng Job một cách thủ công",
            "correct": false
          }
        ],
        "explanation": "Các Job không phụ thuộc có thể bắt đầu song song; runner khả dụng và giới hạn concurrency có thể ảnh hưởng thời điểm chạy."
      },
      {
        "id": "q2",
        "question": "Các Step bên trong cùng một Job có đặc điểm thực thi như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Thực thi tuần tự lần lượt từ trên xuống dưới trên cùng một máy ảo Runner",
            "correct": true
          },
          {
            "text": "Mỗi Step được cấp một máy ảo riêng biệt và chạy song song",
            "correct": false
          },
          {
            "text": "Thực thi đảo ngược từ dưới lên trên",
            "correct": false
          },
          {
            "text": "Chỉ Step nào có từ khóa async mới được thực thi",
            "correct": false
          }
        ],
        "explanation": "Các Step trong một Job chạy tuần tự và có thể đọc, ghi chung các tệp tin trong thư mục làm việc của Runner đó."
      },
      {
        "id": "q3",
        "question": "Nếu Job A tạo ra một tệp tin build/app.js, Job B có thể truy cập trực tiếp tệp tin đó từ ổ đĩa không?",
        "type": "single",
        "options": [
          {
            "text": "Không nên giả định có thể truy cập; hãy dùng Artifact hoặc cơ chế truyền dữ liệu giữa Job",
            "correct": true
          },
          {
            "text": "Có, toàn bộ các Job luôn dùng chung một ổ đĩa cứng vật lý",
            "correct": false
          },
          {
            "text": "Có, chỉ cần ghi đúng đường dẫn tương đối",
            "correct": false
          },
          {
            "text": "Có, nếu hai Job cùng chạy hệ điều hành Ubuntu",
            "correct": false
          }
        ],
        "explanation": "Mỗi Job có môi trường thực thi riêng; truyền tệp rõ ràng bằng Artifact để không phụ thuộc vào runner dùng chung."
      },
      {
        "id": "q4",
        "question": "Thành phần nào sau đây đóng vai trò là môi trường máy ảo thực tế thực hiện công việc?",
        "type": "single",
        "options": [
          {
            "text": "Runner",
            "correct": true
          },
          {
            "text": "Event",
            "correct": false
          },
          {
            "text": "Workflow",
            "correct": false
          },
          {
            "text": "Context",
            "correct": false
          }
        ],
        "explanation": "Runner là máy hoặc môi trường thực thi do GitHub quản lý hoặc do tổ chức tự quản lý để chạy Job."
      },
      {
        "id": "q5",
        "question": "Trong kiến trúc của GitHub Actions, thứ tự phân cấp từ cao nhất đến thấp nhất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Workflow -> Job -> Step -> Action / Shell command",
            "correct": true
          },
          {
            "text": "Step -> Job -> Workflow -> Runner",
            "correct": false
          },
          {
            "text": "Action -> Workflow -> Job -> Step",
            "correct": false
          },
          {
            "text": "Runner -> Step -> Job -> Workflow",
            "correct": false
          }
        ],
        "explanation": "Một Workflow chứa một hoặc nhiều Jobs; mỗi Job chạy trên một Runner và gồm nhiều Steps tuần tự; mỗi Step gọi Action hoặc chạy lệnh shell."
      }
    ]
  }
};
export default lesson;
