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
      "Nắm rõ cấu trúc phân tầng 4 cấp bậc của một Workflow: Event -> Jobs -> Steps -> Actions/Commands.",
      "Hiểu bản chất chạy song song (Parallel) mặc định của các Job và chạy tuần tự (Sequential) của các Step.",
      "Nắm vững vai trò của Runner như một môi trường máy ảo cách ly độc lập chứa toàn bộ phiên làm việc."
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
  "content": "# Kiến trúc Workflow: Events, Jobs, Steps và Runners\n\n## 🎯 Mục tiêu\n- Nắm rõ cấu trúc phân tầng 4 cấp bậc của một Workflow: Event -> Jobs -> Steps -> Actions/Commands.\n- Hiểu bản chất chạy song song (Parallel) mặc định của các Job và chạy tuần tự (Sequential) của các Step.\n- Nắm vững vai trò của Runner như một môi trường máy ảo cách ly độc lập chứa toàn bộ phiên làm việc.\n\n## 🧩 Từ khóa hôm nay\n### Event\n- **Nói dễ hiểu**: Sự kiện kích hoạt khiến GitHub Actions khởi động luồng công việc tự động.\n- **Ví dụ**: Hành động đẩy commit lên nhánh `main` hoặc tạo một Pull Request mới.\n- **Đừng nhầm**: Không chỉ giới hạn trong thao tác Git; sự kiện có thể là tạo nhãn, mở issue hay chạy định kỳ theo giờ.\n\n### Job\n- **Nói dễ hiểu**: Một khối công việc lớn trong workflow, mặc định chạy độc lập và song song trên một máy ảo riêng.\n- **Ví dụ**: Job `build` và Job `lint` chạy cùng lúc trên hai máy ảo Ubuntu khác nhau.\n- **Đừng nhầm**: Các Job không dùng chung ổ cứng; file tạo ra ở Job này không tự xuất hiện ở Job khác trừ khi dùng Artifact.\n\n### Runner\n- **Nói dễ hiểu**: Máy chủ hoặc máy ảo do GitHub cấp phát để trực tiếp thực thi các câu lệnh trong Job.\n- **Ví dụ**: Máy ảo chạy hệ điều hành Ubuntu mới nhất (`runs-on: ubuntu-latest`).\n- **Đừng nhầm**: Không phải một tiến trình chạy nền vĩnh viễn; mỗi Job được cấp một máy ảo sạch và bị hủy sau khi hoàn thành.\n\n## 📖 Định nghĩa\nKiến trúc GitHub Actions được xây dựng theo mô hình phân tầng chặt chẽ: Sự kiện (Event) kích hoạt Luồng công việc (Workflow); mỗi Workflow bao gồm một hoặc nhiều Tác vụ (Job) chạy song song trên các Máy chạy (Runner) ảo hóa độc lập; bên trong mỗi Job là danh sách các Bước (Step) thực thi tuần tự từ trên xuống dưới.\n\n## 💡 Tại sao cần\nHiểu sai kiến trúc phân tầng sẽ dẫn đến những lỗi cơ bản: cố gắng đọc file của Job khác từ ổ cứng mà không qua Artifact, hoặc tưởng nhầm các Step chạy song song. Phân biệt rõ ranh giới giữa Job (chạy song song cách ly) và Step (chạy tuần tự chung máy) là nền tảng để thiết kế pipeline tối ưu và tin cậy.\n\n## 🧠 Mental Model\nHãy tưởng tượng một nhà hàng tiệc cưới. Event là tiếng chuông báo khách đã vào sảnh. Workflow là toàn bộ thực đơn tiệc. Các Job là các quầy bếp riêng: Quầy khai vị, Quầy món chính và Quầy tráng miệng hoạt động song song ở các góc bếp riêng (`Runners`). Bên trong mỗi quầy, đầu bếp làm từng thao tác tuần tự (`Steps`): rửa rau, thái thịt, nấu sốt.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Event[Event: push code] --> Workflow[Workflow: CI Pipeline]\n    Workflow --> Job1[Job 1: Lint trên Ubuntu Runner]\n    Workflow --> Job2[Job 2: Test trên Ubuntu Runner]\n    Workflow --> Job3[Job 3: Build trên macOS Runner]\n    Job2 --> Step1[Step 1: actions/checkout]\n    Step1 --> Step2[Step 2: actions/setup-node]\n    Step2 --> Step3[Step 3: npm test]\n```\n\n## 🏢 Ví dụ thực tế\nTrong dự án ứng dụng di động Flutter, khi có Pull Request, Workflow kích hoạt hai Job cùng lúc: Job thứ nhất chạy trên Runner Linux để kiểm tra định dạng code và chạy linter; Job thứ hai chạy trên Runner macOS để biên dịch gói iOS. Mỗi Job được cấp máy ảo riêng sạch sẽ, thực thi lần lượt các Step cài Flutter SDK, tải thư viện và biên dịch mà không làm ảnh hưởng lẫn nhau.\n\n## 💻 Command & Cú pháp\n```bash\n# Kiểm tra cấu trúc thư mục chứa các workflow\nls -la .github/workflows/\n\n# Xem nội dung chi tiết của tệp workflow\ncat .github/workflows/ci.yml\n```\n\n## 🔍 Giải thích command\n- `ls -la .github/workflows/`: Liệt kê tất cả các tệp YAML định nghĩa quy trình tự động hóa trong repository.\n- `cat .github/workflows/ci.yml`: Đọc nội dung khai báo các khối kiến trúc `on`, `jobs` và `steps` để kiểm tra cú pháp kịch bản.\n\n## ⚠️ Sai lầm phổ biến\n- Cho rằng tệp tin tạo ra ở Job 1 sẽ tự động có mặt ở Job 2 trên ổ đĩa cục bộ.\n- Tạo quá nhiều Job nhỏ chỉ chứa một dòng lệnh đơn giản gây lãng phí thời gian khởi động máy ảo Runner.\n- Nhầm lẫn thứ tự thực thi của các Step bên trong một Job (các Step luôn chạy tuần tự từ trên xuống).\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Xem xét sơ đồ phân cấp giữa Event, Job, Step và Runner để nắm chắc quy luật chia sẻ dữ liệu.\n2. Xác định xem hai tác vụ Lint và Unit Test nên đặt trong cùng một Job hay chia làm hai Job chạy song song.\n3. Tạo thư mục quy chuẩn `.github/workflows` trong dự án thực hành nếu chưa có.\n4. Mở tệp `.github/workflows/ci.yml` và phân biệt rõ các cấp bậc thụt đầu dòng giữa `jobs` và `steps`.\n\n## 💡 Hint & mẹo\n- Ghi nhớ quy tắc vàng: Các Step trong một Job dùng chung hệ thống tệp tin, các Job khác nhau hoàn toàn cách ly về bộ nhớ và ổ đĩa.\n- Hãy dùng `needs` khi bạn muốn một Job phải chờ một Job khác hoàn thành trước khi bắt đầu.\n\n## ✅ Validation & Kết quả mong đợi\n- Phân biệt chính xác phạm vi chia sẻ dữ liệu giữa cấp độ Job và cấp độ Step.\n- Cấu trúc thư mục `.github/workflows/` được đặt chính xác ở thư mục gốc của repository.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra khả năng phân tích kiến trúc phân tầng trong GitHub Actions.\n\n## 🚀 Thử thách nâng cao\nNếu bạn có 100 bài kiểm thử mất 20 phút để chạy trên một máy ảo, bạn sẽ tái cấu trúc các Job như thế nào để giảm thời gian hoàn thành xuống còn 5 phút?\n\n## 📝 Tổng kết\n- Workflow được kích hoạt bởi Event và chứa một tập hợp các Jobs.\n- Jobs mặc định thực thi song song trên các máy ảo Runner hoàn toàn độc lập.\n- Steps bên trong một Job luôn thực thi tuần tự và chia sẻ chung hệ thống tệp tin của Runner đó.\n",
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
            "text": "Thực thi song song (Parallel) cùng lúc trên các Runner riêng biệt",
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
        "explanation": "GitHub Actions tối ưu hóa thời gian thực thi bằng cách khởi chạy tất cả các Job độc lập song song với nhau."
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
            "text": "Không, vì mỗi Job chạy trên một máy ảo hoàn toàn cách ly, cần dùng Artifact để truyền dữ liệu",
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
        "explanation": "Mỗi Job chạy trên một Runner độc lập, bộ nhớ và ổ đĩa của chúng bị cô lập hoàn toàn với nhau."
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
        "explanation": "Runner là máy chủ (máy ảo Ubuntu, Windows, macOS) do GitHub quản lý hoặc tự host để chạy các lệnh trong Job."
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
