import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "17-pull-request-ci",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "17-pull-request-ci",
    "title": "Thiết lập CI Pipeline tự động kiểm thử trên Pull Request",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "16-secrets-and-variables"
    ],
    "objectives": [
      "Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.",
      "Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).",
      "Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "pull request ci",
      "pr automation",
      "status checks",
      "branch protection",
      "code quality gate"
    ],
    "commands": [
      "gh pr create --title \"feat: new login\"",
      "gh pr checks",
      "gh pr merge --auto"
    ]
  },
  "content": "# Thiết lập CI Pipeline tự động kiểm thử trên Pull Request\n\n---\n\n## 🎯 Mục tiêu bài học\n- Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.\n- Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).\n- Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh.\n\n---\n\n## 📖 Định nghĩa\n> Pull Request CI là mô hình kiểm chuẩn tự động bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp. Khi một lập trình viên tạo hoặc đẩy thêm mã nguồn vào một Pull Request, GitHub Actions tự động tạo ra một nhánh ảo hợp nhất thử nghiệm (merge commit tạm thời) và thực thi toàn bộ chuỗi kiểm tra (Linter, Unit Test, Type Check). Kết quả thành công hay thất bại được gắn trực tiếp vào báo cáo trạng thái (Status Check) của PR.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có CI gác cổng trên Pull Request, nhánh chính (main) sẽ liên tục bị vỡ hoặc suy giảm hiệu năng do những lỗi bất cẩn, xung đột thư viện của lập trình viên. Đợi đến khi code đã được merge vào main mới phát hiện lỗi thì đã quá muộn và tốn rất nhiều công sức để tìm kiếm commit lỗi và phục hồi hệ thống. PR CI đóng vai trò như một bộ lọc sạch tự động: mọi đoạn mã kém chất lượng đều bị chặn đứng ngay trước cửa ngõ của nhánh chính, bảo vệ sự ổn định tối cao của sản phẩm.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung trạm kiểm dịch hải quan tại sân bay quốc tế. Hành khách (các commit trong PR) muốn nhập cảnh vào quốc gia (nhánh main) bắt buộc phải đi qua máy quét an ninh và cổng soi chiếu sinh học (CI Pipeline). Nếu hành lý chứa chất cấm hoặc có triệu chứng nhiễm virus nguy hiểm (bài test bị lỗi hoặc linter phát hiện sai chuẩn), cánh cửa hải quan sẽ khóa chặt và hành khách bị chặn lại để xử lý trước khi có thể đặt chân vào nội địa.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nTích hợp bảo vệ nhánh với PR CI Status Checks:\nDeveloper tạo PR ──► [Kích hoạt CI Workflow]\n                          │\n                          ▼\n                     [Chạy Tests]\n                          │\n           ┌──────────────┴──────────────┐\n           ▼                             ▼\n      [Tests PASS ✓]               [Tests FAIL ✗]\n           │                             │\n           ▼                             ▼\nStatus Check: Xanh (Success)   Status Check: Đỏ (Failure)\n           │                             │\n           ▼                             ▼\n[NÚT MERGE ĐƯỢC MỞ KHÓA]      [NÚT MERGE BỊ KHÓA CHẶT 🚫]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một dự án tài chính, nhánh `main` được bảo vệ bởi quy tắc Branch Protection Rules với yêu cầu bắt buộc: bài kiểm tra `ci/test` phải đạt trạng thái thành công. Khi lập trình viên Nam mở một PR thêm tính năng chuyển tiền nhanh, Nam vô tình sửa đổi một hàm mà quên cập nhật bài kiểm thử tương ứng. Đường ống Actions chạy trong 2 phút và báo lỗi đỏ ở bài test đơn vị. Trên giao diện PR của Nam, nút \"Merge pull request\" bị vô hiệu hóa với thông báo màu đỏ: \"Required statuses must pass before merging\". Nam kiểm tra log, sửa lại đoạn mã, commit và push lên nhánh của mình. CI tự động chạy lại, báo tích xanh và nút Merge lập tức sáng lên cho phép trưởng nhóm phê duyệt.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngh pr create --title \"feat: new login\"\ngh pr checks\ngh pr merge --auto\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác lệnh GitHub CLI trên cho phép tạo PR từ dòng lệnh, kiểm tra trạng thái của các bài kiểm tra tự động với gh pr checks, và bật chế độ tự động hợp nhất ngay khi các bài test chuyển sang màu xanh.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Kích hoạt cả hai sự kiện `push` và `pull_request` trên cùng một nhánh khiến workflow bị chạy lặp lại 2 lần một cách lãng phí.**: \n2. **Cấu hình tên Job kiểm tra trong Branch Protection Rule không khớp chính xác từng chữ cái với tên Job trong tệp YAML.**: \n3. **Bỏ qua việc kiểm tra các commit được đẩy bổ sung vào PR sau khi người review đã phê duyệt ban đầu.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một tệp workflow cấu hình kích hoạt trên sự kiện `on: pull_request: branches: [main]`.\n2. Định nghĩa Job kiểm tra `test` chạy các lệnh kiểm thử và kiểm tra cú pháp.\n3. Mở một Pull Request thử nghiệm và quan sát biểu tượng đồng hồ cát đang chạy, sau đó chuyển sang dấu tích xanh.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Sự kiện `pull_request` theo mặc định lắng nghe các loại hoạt động: `opened`, `synchronize` (khi push code mới), và `reopened`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nPull Request hiển thị trạng thái Status Check tích hợp chính xác và ngăn cản việc merge khi bài test bị lỗi.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra kiến thức về thiết lập đường ống CI cho Pull Request qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao khi chạy CI trên sự kiện pull_request, GitHub Actions lại kiểm thử trên một commit hợp nhất ảo (refs/pull/:id/merge) thay vì commit trên nhánh của tác giả?\n\n---\n\n## 📚 Tổng kết kiến thức\n- PR CI tự động kiểm tra chất lượng mã nguồn mỗi khi có yêu cầu hợp nhất mới hoặc có commit đẩy thêm.\n- Kết hợp với Branch Protection Rules tạo thành cổng kiểm soát chất lượng tuyệt đối (Quality Gate).\n- Ngăn chặn 100% nguy cơ mã nguồn vỡ build hoặc lỗi logic lọt vào nhánh chính.\n",
  "quiz": {
    "id": "quiz-07-github-actions-17-pull-request-ci",
    "title": "Trắc nghiệm: Thiết lập CI Pipeline tự động kiểm thử trên Pull Request",
    "questions": [
      {
        "id": "q1",
        "question": "Sự kiện nào trong GitHub Actions được kích hoạt khi một nhà phát triển tạo hoặc đẩy thêm mã vào một Pull Request?",
        "type": "single",
        "options": [
          {
            "text": "pull_request",
            "correct": true
          },
          {
            "text": "merge_request",
            "correct": false
          },
          {
            "text": "code_review",
            "correct": false
          },
          {
            "text": "pr_create",
            "correct": false
          }
        ],
        "explanation": "Sự kiện `pull_request` lắng nghe mọi biến động liên quan đến vòng đời của Pull Request trong kho lưu trữ."
      },
      {
        "id": "q2",
        "question": "Khi tính năng \"Require status checks to pass before merging\" được bật, điều gì sẽ xảy ra nếu bài test CI bị thất bại?",
        "type": "single",
        "options": [
          {
            "text": "Nút Merge bị khóa chặt và không ai có thể hợp nhất mã nguồn bị lỗi vào nhánh chính",
            "correct": true
          },
          {
            "text": "Nhánh chính tự động bị xóa",
            "correct": false
          },
          {
            "text": "Mã nguồn tự động được hợp nhất nhưng có cảnh báo màu vàng",
            "correct": false
          },
          {
            "text": "Lập trình viên bị trừ tiền lương tự động",
            "correct": false
          }
        ],
        "explanation": "Quy tắc bảo vệ nhánh sẽ cưỡng chế việc chặn nút Merge cho đến khi tất cả các bài kiểm thử bắt buộc đều đạt kết quả xanh."
      },
      {
        "id": "q3",
        "question": "Tại sao không nên cấu hình workflow chạy đồng thời trên `on: [push, pull_request]` cho cùng một nhánh nội bộ?",
        "type": "single",
        "options": [
          {
            "text": "Vì khi lập trình viên đẩy commit lên nhánh của PR, workflow sẽ bị kích hoạt trùng lặp 2 lần cùng lúc",
            "correct": true
          },
          {
            "text": "Vì làm máy chủ của GitHub bị nổ tung",
            "correct": false
          },
          {
            "text": "Vì GitHub cấm khai báo nhiều sự kiện",
            "correct": false
          },
          {
            "text": "Vì kết quả của hai lần chạy sẽ triệt tiêu lẫn nhau",
            "correct": false
          }
        ],
        "explanation": "Việc kích hoạt cả hai sự kiện trên cùng một nhánh khiến GitHub Actions chạy hai phiên làm việc giống hệt nhau, làm tăng gấp đôi chi phí thời gian."
      },
      {
        "id": "q4",
        "question": "Lệnh GitHub CLI nào cho phép lập trình viên theo dõi tiến độ các bài kiểm tra Status Checks của PR hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "gh pr checks",
            "correct": true
          },
          {
            "text": "gh test status",
            "correct": false
          },
          {
            "text": "gh ci view",
            "correct": false
          },
          {
            "text": "gh run inspect",
            "correct": false
          }
        ],
        "explanation": "`gh pr checks` liệt kê chi tiết từng bài kiểm tra trạng thái đang chờ, thành công hoặc thất bại gắn liền với PR hiện tại."
      },
      {
        "id": "q5",
        "question": "Tham chiếu Git nào được GitHub Actions tự động kiểm thử khi sự kiện pull_request được kích hoạt?",
        "type": "single",
        "options": [
          {
            "text": "refs/pull/:number/merge",
            "correct": true
          },
          {
            "text": "refs/heads/:feature_branch",
            "correct": false
          },
          {
            "text": "refs/tags/:release_tag",
            "correct": false
          },
          {
            "text": "refs/remotes/upstream/head",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions tự động tạo một merge commit thử nghiệm tại `refs/pull/:number/merge` để kiểm tra xung đột và tính toàn vẹn của mã sau khi hợp nhất."
      },
      {
        "id": "q6",
        "question": "Trong quy trình CI Pull Request, trạng thái nào sau đây của Status Check biểu thị rằng bài kiểm tra đang được chạy?",
        "type": "single",
        "options": [
          {
            "text": "pending",
            "correct": true
          },
          {
            "text": "success",
            "correct": false
          },
          {
            "text": "failure",
            "correct": false
          },
          {
            "text": "cancelled",
            "correct": false
          }
        ],
        "explanation": "Trạng thái `pending` cho biết workflow hoặc job kiểm thử đang trong quá trình thực thi trên runner và chưa có kết luận cuối cùng."
      }
    ]
  }
};
export default lesson;
