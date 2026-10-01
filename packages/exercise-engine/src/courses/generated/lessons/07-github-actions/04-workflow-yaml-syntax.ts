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
  "content": "# .github/workflows và cú pháp YAML chuẩn\n\n## 🎯 Mục tiêu\n- Nắm vững vị trí bắt buộc của tệp workflow: thư mục `.github/workflows/` với phần mở rộng `.yml` hoặc `.yaml`.\n- Làm chủ các quy tắc định dạng YAML: thụt lề bằng 2 dấu cách, danh sách gạch đầu dòng, cặp key-value.\n- Nhận biết và khắc phục các lỗi cú pháp thụt lề YAML phổ biến làm workflow bị từ chối biên dịch.\n\n## 🧩 Từ khóa hôm nay\n### YAML Indentation\n- **Nói dễ hiểu**: Quy tắc bắt buộc dùng dấu cách Space để thụt đầu dòng thể hiện quan hệ cha con giữa các khối dữ liệu.\n- **Ví dụ**: Dùng đúng 2 dấu cách cho mỗi cấp độ phân cấp; `steps` thụt vào 4 khoảng trắng dưới `jobs`.\n- **Đừng nhầm**: Nghiêm cấm dùng phím Tab; dùng Tab sẽ khiến trình phân tích YAML báo lỗi ngay lập tức.\n\n### .github/workflows\n- **Nói dễ hiểu**: Thư mục quy ước duy nhất nơi GitHub tự động quét tìm và kích hoạt các tệp kịch bản Actions.\n- **Ví dụ**: Đặt tệp `.github/workflows/ci.yml` ở thư mục gốc của repository.\n- **Đừng nhầm**: Chú ý chữ `workflows` có chữ `s` ở cuối; nếu đặt ở `.github/workflow/` thì hệ thống sẽ bỏ qua hoàn toàn.\n\n### Key-Value Mapping\n- **Nói dễ hiểu**: Cặp khóa - giá trị phân tách bởi dấu hai chấm và khoảng trắng biểu diễn dữ liệu trong YAML.\n- **Ví dụ**: Cặp `runs-on: ubuntu-latest` gán giá trị hệ điều hành cho thuộc tính của Job.\n- **Đừng nhầm**: Bắt buộc phải có một khoảng trắng sau dấu hai chấm (`name: Build` chứ không được viết liền `name:Build`).\n\n## 📖 Định nghĩa\nTrong GitHub Actions, toàn bộ kịch bản tự động hóa bắt buộc phải được lưu trữ dưới dạng các tệp văn bản YAML nằm chính xác tại thư mục `.github/workflows/` trong nhánh của kho lưu trữ. Cú pháp YAML dựa trên thụt lề khoảng trắng nghiêm ngặt để biểu diễn phân cấp giữa workflow, job, step và các tham số cấu hình.\n\n## 💡 Tại sao cần\nHơn 80% sự cố ban đầu của kỹ sư mới làm quen với GitHub Actions bắt nguồn từ việc vi phạm cú pháp YAML: dùng phím Tab thay vì dấu cách Space, thụt dòng sai cấp độ giữa steps và jobs, hoặc viết sai đường dẫn thư mục. Nắm vững cú pháp YAML chuẩn giúp bạn viết kịch bản sạch sẽ, dễ bảo trì và loại bỏ lỗi ngớ ngẩn.\n\n## 🧠 Mental Model\nHãy hình dung tệp YAML như sơ đồ tổ chức phòng ban của công ty. Mỗi cấp bậc quản lý được biểu diễn bằng khoảng thụt lề 2 bước chân (2 spaces). Nếu một nhân viên thực thi (`step`) đứng ngang hàng với trưởng phòng (`job`), toàn bộ trật tự quản lý sẽ bị xáo trộn và hệ thống quét tự động sẽ từ chối phê duyệt ngay.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Root[Thư mục gốc Repository] --> DotGithub[Thư mục: .github/]\n    DotGithub --> Workflows[Thư mục: workflows/ - có chữ s]\n    Workflows --> File1[ci.yml - Kịch bản kiểm thử]\n    Workflows --> File2[deploy.yml - Kịch bản phát hành]\n```\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư tạo tệp `.github/workflows/ci.yml` cho dự án Node.js. Ban đầu, kỹ sư vô tình dùng phím Tab trên bàn phím để thụt dòng mục steps. Khi đẩy lên GitHub, thẻ Actions báo lỗi đỏ: \"Invalid workflow file: mapping values are not allowed in this context\". Kỹ sư mở VS Code, bật hiển thị ký tự ẩn, thay toàn bộ ký tự Tab bằng 2 dấu cách Space và đẩy lại. GitHub lập tức nhận diện thành công và hiển thị tiến trình đang chạy màu vàng.\n\n## 💻 Command & Cú pháp\n```bash\n# Tạo thư mục chuẩn workflows\nmkdir -p .github/workflows\n\n# Tạo tệp cấu hình kịch bản tự động\ntouch .github/workflows/ci.yml\n\n# Kiểm tra cú pháp YAML bằng công cụ dòng lệnh nếu có\nyamllint .github/workflows/ci.yml\n```\n\n## 🔍 Giải thích command\n- `mkdir -p .github/workflows`: Tạo cấu trúc thư mục quy chuẩn theo đúng đặc tả của GitHub Actions.\n- `touch .github/workflows/ci.yml`: Khởi tạo tệp cấu hình mới với phần mở rộng `.yml` hợp lệ.\n- `yamllint`: Kiểm tra tính hợp lệ về thụt lề và quy tắc định dạng của tệp trước khi đẩy lên máy chủ.\n\n## ⚠️ Sai lầm phổ biến\n- Dùng phím Tab thay vì dấu cách Space để thụt lề (YAML cấm tuyệt đối ký tự Tab).\n- Đặt tệp sai đường dẫn như `.github/workflow/` (thiếu chữ s) khiến GitHub hoàn toàn bỏ qua kịch bản.\n- Viết sai phần mở rộng tệp thành `.json` hoặc `.txt` thay vì `.yml` hoặc `.yaml`.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Mở terminal và tạo thư mục `.github/workflows/` bằng lệnh `mkdir -p .github/workflows`.\n2. Tạo tệp `ci.yml` trong thư mục vừa tạo với nội dung mẫu:\n   ```yaml\n   name: CI Pipeline\n   on: [push]\n   jobs:\n     test:\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Hello GitHub Actions\"\n   ```\n3. Kiểm tra xem mỗi tầng thụt lề có dùng đúng 2 dấu cách Space hay không.\n4. Đẩy commit lên GitHub và vào tab Actions để quan sát workflow đầu tiên được thực thi.\n\n## 💡 Hint & mẹo\n- Trong trình soạn thảo VS Code, bạn nên cài đặt `\"editor.tabSize\": 2` và `\"editor.insertSpaces\": true` để khi gõ phím Tab hệ thống tự động đổi thành 2 dấu cách.\n- Cài tiện ích mở rộng GitHub Actions trên VS Code để được gợi ý cú pháp và bắt lỗi YAML ngay khi gõ.\n\n## ✅ Validation & Kết quả mong đợi\n- Tệp YAML được phân tích cú pháp hợp lệ mà không có lỗi thụt lề hoặc lỗi mapping.\n- Tab Actions trên GitHub nhận diện được workflow và tự động kích hoạt khi có commit mới.\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững quy tắc định dạng YAML và vị trí tệp workflow.\n\n## 🚀 Thử thách nâng cao\nGiải thích tại sao định dạng YAML lại được chọn cho GitHub Actions thay vì JSON hay XML, và ưu thế của nó về tính trực quan đối với con người là gì?\n\n## 📝 Tổng kết\n- Tệp workflow bắt buộc phải đặt tại `.github/workflows/` với phần mở rộng `.yml` hoặc `.yaml`.\n- Luôn sử dụng 2 dấu cách Space cho mỗi cấp độ thụt lề và không bao giờ dùng phím Tab.\n- Cú pháp YAML phân cấp rõ ràng giúp kịch bản tự động hóa dễ đọc và dễ bảo trì.\n",
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
            "text": "Ký tự Tab",
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
      },
      {
        "id": "q5",
        "question": "Ký hiệu dấu gạch ngang theo sau bởi khoảng trắng (`- `) trong tệp YAML biểu thị cấu trúc dữ liệu nào?",
        "type": "single",
        "options": [
          {
            "text": "Một phần tử trong danh sách hoặc mảng (Array / List item)",
            "correct": true
          },
          {
            "text": "Một phép trừ toán học giữa hai giá trị số",
            "correct": false
          },
          {
            "text": "Một dòng chú thích ghi chú cần được trình phân tích bỏ qua",
            "correct": false
          },
          {
            "text": "Một giá trị boolean mang nghĩa phủ định false",
            "correct": false
          }
        ],
        "explanation": "Trong YAML, ký hiệu gạch ngang kèm khoảng trắng định nghĩa một phần tử thuộc danh sách mảng, ví dụ như danh sách các bước steps trong Job."
      }
    ]
  }
};
export default lesson;
