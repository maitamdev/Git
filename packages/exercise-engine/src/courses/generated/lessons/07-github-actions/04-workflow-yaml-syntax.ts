import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-workflow-yaml-syntax",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "04-workflow-yaml-syntax",
    "title": ".github/workflows và cú pháp YAML chuẩn",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "03-workflow-architecture"
    ],
    "objectives": [
      "Nắm vững vị trí bắt buộc của tệp workflow: thư mục .github/workflows/ với phần mở rộng .yml hoặc .yaml.",
      "Làm chủ các quy tắc định dạng YAML: thụt lề bằng 2 dấu cách, danh sách gạch đầu dòng, cặp key-value.",
      "Nhận biết và khắc phục các lỗi cú pháp thụt lề YAML phổ biến làm workflow bị từ chối biên dịch."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "yaml syntax",
      "workflow file",
      "indentation",
      "github workflows directory"
    ],
    "commands": [
      "mkdir -p .github/workflows",
      "touch .github/workflows/ci.yml",
      "yamllint .github/workflows/ci.yml"
    ]
  },
  "content": "# .github/workflows và cú pháp YAML chuẩn\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững vị trí bắt buộc của tệp workflow: thư mục .github/workflows/ với phần mở rộng .yml hoặc .yaml.\n- Làm chủ các quy tắc định dạng YAML: thụt lề bằng 2 dấu cách, danh sách gạch đầu dòng, cặp key-value.\n- Nhận biết và khắc phục các lỗi cú pháp thụt lề YAML phổ biến làm workflow bị từ chối biên dịch.\n\n---\n\n## 📖 Định nghĩa\n> Trong GitHub Actions, toàn bộ định nghĩa luồng công việc phải được lưu trữ dưới dạng các tệp văn bản định dạng YAML nằm chính xác tại thư mục .github/workflows/ trong nhánh gốc của kho lưu trữ. Cú pháp YAML (YAML Ain't Markup Language) là định dạng dữ liệu có cấu trúc dựa trên thụt lề khoảng trắng (indentation) nghiêm ngặt để biểu diễn quan hệ cha con giữa các khối dữ liệu, danh sách và ánh xạ từ khóa một cách mạch lạc và chuẩn mực.\n\n---\n\n## 🤔 Tại sao cần?\nHơn 80% sự cố ban đầu của các kỹ sư mới làm quen với CI/CD bắt nguồn từ việc vi phạm quy tắc thụt dòng trong tệp YAML, chẳng hạn như dùng phím Tab thay vì dấu cách Space, thụt dòng sai cấp độ giữa steps và jobs, hoặc đặt sai vị trí thư mục khiến GitHub hoàn toàn không nhận diện được workflow. Việc thành thạo cấu trúc YAML chuẩn giúp bạn viết kịch bản sạch sẽ, dễ đọc và loại bỏ hoàn toàn các lỗi cú pháp ngớ ngẩn gây gián đoạn đường ống.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung tệp YAML như một bản vẽ sơ đồ tổ chức phòng ban trong một tập đoàn. Mỗi cấp bậc quản lý được biểu diễn bằng một khoảng thụt lề thụt vào trong 2 bước chân (2 spaces). Nếu một nhân viên thực thi (step) đứng ngang hàng với giám đốc bộ phận (job), toàn bộ cấu trúc quyền lực sẽ bị xáo trộn và máy quét kiểm duyệt tự động sẽ từ chối phê duyệt văn bản ngay lập tức.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nThư mục kho lưu trữ (Repo Root)\n└── .github/\n    └── workflows/\n        ├── ci.yml          <── Tệp cấu hình chuẩn (.yml hoặc .yaml)\n        └── release.yml\n\nQuy tắc 2 Spaces Indentation:\nname: CI Pipeline           # Cấp 0 (Không thụt lề)\non: push                    # Cấp 0\njobs:                       # Cấp 0\n  test:                     # Cấp 1 (Thụt vào 2 spaces: Tên Job)\n    runs-on: ubuntu-latest  # Cấp 2 (Thụt vào 4 spaces: Thuộc tính Job)\n    steps:                  # Cấp 2\n      - name: Checkout      # Cấp 3 (Thụt vào 6 spaces: Danh sách Step)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm tạo tệp cấu hình .github/workflows/ci.yml cho dự án Node.js. Ban đầu, kỹ sư này vô tình dùng phím Tab trên bàn phím để thụt dòng mục steps. Khi đẩy lên GitHub, tab Actions hiển thị thông báo lỗi màu đỏ đậm: \"Invalid workflow file: mapping values are not allowed in this context\". Kỹ sư mở trình soạn thảo, kích hoạt chế độ hiển thị ký tự ẩn (Show Invisibles), thay thế toàn bộ ký tự Tab bằng 2 dấu cách Space và đẩy lại commit. GitHub lập tức nhận diện thành công và huy hiệu build chuyển sang màu vàng đang chạy.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\nmkdir -p .github/workflows\ntouch .github/workflows/ci.yml\nyamllint .github/workflows/ci.yml\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh mkdir -p tạo cây thư mục chuẩn .github/workflows, touch tạo tệp cấu hình mới, và yamllint kiểm tra tính hợp lệ về thụt lề và cú pháp của tệp YAML trước khi đưa vào hệ thống kiểm soát phiên bản để ngăn chặn lỗi sớm.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Sử dụng phím Tab thay vì dấu cách Space**:  YAML tiêu chuẩn nghiêm cấm tuyệt đối ký tự Tab để thụt dòng.\n2. **Đặt tệp sai đường dẫn như `.github/workflow/` (thiếu chữ s) khiến GitHub hoàn toàn bỏ qua tệp.**: \n3. **Viết sai phần mở rộng tệp thành `.json` hoặc `.txt` thay vì `.yml` hoặc `.yaml`.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo cấu trúc thư mục `.github/workflows/` trong kho lưu trữ thử nghiệm.\n2. Khởi tạo tệp tin `ci.yml` và nhập cấu hình mẫu tối thiểu gồm name, on, jobs.\n3. Kiểm tra định dạng và đảm bảo toàn bộ tệp chỉ sử dụng 2 dấu cách cho mỗi cấp độ thụt lề.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Hãy cấu hình trình soạn thảo VS Code với thuộc tính `\"editor.tabSize\": 2` và `\"editor.insertSpaces\": true`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nTệp YAML được phân tích cú pháp hợp lệ mà không có bất kỳ lỗi linter nào.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nKiểm tra kiến thức về quy tắc định dạng YAML và cấu trúc tệp workflow qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nGiải thích tại sao định dạng YAML lại được chọn cho GitHub Actions thay vì JSON hay XML, và ưu thế của nó về khả năng đọc hiểu của con người là gì?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Tệp Workflow bắt buộc phải nằm trong thư mục `.github/workflows/` với đuôi `.yml` hoặc `.yaml`.\n- YAML sử dụng thụt dòng bằng 2 dấu cách Space để phân cấp dữ liệu, cấm dùng phím Tab.\n- Cấu trúc tối thiểu của một workflow luôn cần có các khóa: `name`, `on`, và `jobs`.\n",
  "quiz": {
    "id": "quiz-07-github-actions-04-workflow-yaml-syntax",
    "title": "Trắc nghiệm: .github/workflows và cú pháp YAML chuẩn",
    "questions": [
      {
        "id": "q1",
        "question": "Tệp workflow của GitHub Actions bắt buộc phải được đặt ở đường dẫn nào trong kho lưu trữ?",
        "type": "single",
        "options": [
          {
            "text": ".github/workflows/",
            "correct": true
          },
          {
            "text": ".github/actions/",
            "correct": false
          },
          {
            "text": "workflows/github/",
            "correct": false
          },
          {
            "text": ".ci/workflows/",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions chỉ quét và kích hoạt các workflow nằm chính xác trong thư mục `.github/workflows/` ở nhánh mặc định hoặc nhánh đang xét."
      },
      {
        "id": "q2",
        "question": "Ký tự nào sau đây bị cấm dùng để thụt lề trong tệp cấu hình YAML chuẩn?",
        "type": "single",
        "options": [
          {
            "text": "Ký tự Tab (\t)",
            "correct": true
          },
          {
            "text": "Dấu cách Space",
            "correct": false
          },
          {
            "text": "Dấu hai chấm (:)",
            "correct": false
          },
          {
            "text": "Dấu gạch ngang (-)",
            "correct": false
          }
        ],
        "explanation": "Quy chuẩn YAML cấm tuyệt đối việc sử dụng phím Tab để thụt dòng vì độ rộng của Tab có thể khác nhau giữa các hệ điều hành."
      },
      {
        "id": "q3",
        "question": "Quy ước số lượng dấu cách (Spaces) tiêu chuẩn cho mỗi cấp độ thụt lề trong YAML là bao nhiêu?",
        "type": "single",
        "options": [
          {
            "text": "2 dấu cách (2 spaces)",
            "correct": true
          },
          {
            "text": "1 dấu cách",
            "correct": false
          },
          {
            "text": "5 dấu cách",
            "correct": false
          },
          {
            "text": "8 dấu cách",
            "correct": false
          }
        ],
        "explanation": "Quy ước chuẩn của GitHub Actions và cộng đồng phát triển phần mềm là sử dụng đúng 2 dấu cách cho mỗi tầng thụt lề."
      },
      {
        "id": "q4",
        "question": "Phần mở rộng nào sau đây là hợp lệ cho một tệp workflow GitHub Actions?",
        "type": "single",
        "options": [
          {
            "text": ".yml hoặc .yaml",
            "correct": true
          },
          {
            "text": ".json hoặc .xml",
            "correct": false
          },
          {
            "text": ".config hoặc .ini",
            "correct": false
          },
          {
            "text": ".sh hoặc .bash",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions chấp nhận cả hai định dạng phần mở rộng là `.yml` và `.yaml`."
      }
    ]
  }
};
export default lesson;
