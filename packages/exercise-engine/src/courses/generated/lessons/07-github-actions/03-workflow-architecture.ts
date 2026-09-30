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
  "content": "# Kiến trúc Workflow: Events, Jobs, Steps và Runners\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm rõ cấu trúc phân tầng 4 cấp bậc của một Workflow: Event -> Jobs -> Steps -> Actions/Commands.\n- Hiểu bản chất chạy song song (Parallel) mặc định của các Job và chạy tuần tự (Sequential) của các Step.\n- Nắm vững vai trò của Runner như một môi trường máy ảo cách ly độc lập chứa toàn bộ phiên làm việc.\n\n---\n\n## 📖 Định nghĩa\n> Kiến trúc nền tảng của hệ thống GitHub Actions được xây dựng dựa trên bốn thành phần cơ bản có tính tổ chức chặt chẽ và nhất quán: Sự kiện (Event) kích hoạt Luồng công việc (Workflow); mỗi Workflow bao gồm một hoặc nhiều Tác vụ (Job); mỗi Job được thực thi hoàn toàn độc lập trên một Máy chạy (Runner) ảo hóa riêng biệt; và bên trong mỗi Job chứa một danh sách các Bước (Step) thực thi tuần tự lần lượt từ trên xuống dưới.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu sai kiến trúc phân tầng sẽ dẫn đến những lỗi nghiêm trọng như: cố gắng chia sẻ biến nhớ hoặc tệp tin cục bộ giữa hai Job độc lập mà không dùng Artifact, hoặc kỳ vọng các Step chạy song song để tiết kiệm thời gian. Nắm vững ranh giới giữa Job (chạy song song trên các máy ảo khác nhau) và Step (chạy tuần tự trên cùng một máy ảo) là chìa khóa để thiết kế các pipeline tối ưu và chuẩn xác.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng một nhà hàng phục vụ tiệc cưới. Event là tiếng chuông báo có đoàn khách mới đến. Workflow là toàn bộ thực đơn tiệc cưới được kích hoạt. Các Job là các quầy bếp độc lập: Quầy bếp khai vị, Quầy bếp món chính và Quầy làm bánh tráng miệng (chúng hoạt động song song ở các khu vực tách biệt). Mỗi quầy bếp có một đầu bếp chính (Runner). Bên trong mỗi quầy bếp, đầu bếp làm từng thao tác tuần tự (Steps): rửa rau, thái thịt, nấu sốt.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\n[Event: push]\n      │\n      ▼\n[Workflow: CI Pipeline]\n      ├───────────────┬───────────────┐\n      ▼               ▼               ▼\n[Job 1: Lint]   [Job 2: Test]   [Job 3: Build]  <── Chạy SONG SONG trên 3 Runners riêng biệt\n(Runner Ubuntu) (Runner Ubuntu) (Runner Ubuntu)\n      │               │\n      ├─ Step 1       ├─ Step 1 (Checkout)\n      ├─ Step 2       ├─ Step 2 (Setup Node)\n      └─ Step 3       └─ Step 3 (Run test)     <── Các Step chạy TUẦN TỰ trên cùng 1 Runner\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một dự án xây dựng ứng dụng di động Flutter, nhóm phát triển cấu hình một Workflow CI. Khi sự kiện tạo Pull Request diễn ra, Workflow khởi chạy hai Job cùng lúc: Job thứ nhất chạy trên Runner Linux để kiểm tra định dạng mã nguồn và phân tích tĩnh linter; Job thứ hai chạy trên Runner macOS để biên dịch gói ứng dụng iOS. Mỗi Job tự khởi động máy ảo sạch của riêng mình, chạy lần lượt các Step cài đặt Flutter SDK, tải dependencies và tiến hành biên dịch. Hai Job không hề giẫm chân lên nhau, giúp nhóm tận dụng tối đa sức mạnh tính toán song song.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ncat .github/workflows/ci.yml\ntree .github\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh tree .github hiển thị cây thư mục nơi chứa các tệp workflow, và cat in ra nội dung khai báo các khối kiến trúc name, on, jobs, steps để kiểm tra tính toàn vẹn của kịch bản một cách rõ ràng và chuẩn xác.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cho rằng tệp tin tạo ra ở Job 1 sẽ tự động có mặt ở Job 2**:  Mỗi Job chạy trên máy ảo khác nhau, muốn chia sẻ dữ liệu bắt buộc phải dùng upload/download artifact.\n2. **Tạo quá nhiều Job nhỏ chỉ chứa một câu lệnh đơn giản**:  Gây lãng phí thời gian khởi động máy ảo và tải image của Runner.\n3. **Nhầm lẫn thứ tự thực thi của các Step bên trong một Job**:  Các Step luôn luôn chạy tuần tự theo thứ tự khai báo từ trên xuống dưới.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Xem xét sơ đồ phân cấp giữa Event, Job, Step và Runner trên bảng vẽ tư duy.\n2. Xác định xem hai tác vụ Lint và Unit Test nên đặt trong cùng một Job hay chia làm hai Job song song.\n3. Kiểm tra cấu trúc thư mục quy chuẩn `.github/workflows/` trong dự án thực hành.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Ghi nhớ quy tắc vàng: Các Step trong một Job dùng chung hệ thống tệp tin, các Job khác nhau hoàn toàn cách ly.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nPhân biệt chính xác phạm vi chia sẻ dữ liệu giữa cấp độ Job và cấp độ Step.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra khả năng phân tích kiến trúc phân tầng của bạn qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nNếu bạn có 100 bài kiểm thử mất 20 phút để chạy trên một máy, bạn sẽ tái cấu trúc các Job như thế nào để giảm thời gian hoàn thành xuống còn 5 phút?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Workflow được kích hoạt bởi Event và chứa một tập hợp các Jobs.\n- Jobs mặc định thực thi song song trên các máy ảo Runner hoàn toàn độc lập.\n- Steps bên trong một Job luôn thực thi tuần tự và chia sẻ chung hệ thống tệp tin của Runner đó.\n",
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
      }
    ]
  }
};
export default lesson;
