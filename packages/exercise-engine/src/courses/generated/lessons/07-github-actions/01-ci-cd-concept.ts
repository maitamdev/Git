import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-ci-cd-concept",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "01-ci-cd-concept",
    "title": "CI/CD là gì? Tự động hóa tích hợp & chuyển giao liên tục",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "15-professional-team-project"
    ],
    "objectives": [
      "Nắm vững bản chất cốt lõi của Continuous Integration (CI) và Continuous Delivery/Deployment (CD).",
      "Hiểu rõ sự khác biệt giữa quy trình kiểm thử thủ công rủi ro và đường ống tự động hóa.",
      "Nhận thức các lợi ích then chốt: giảm thiểu lỗi hồi quy, phát hành phiên bản nhanh và phản hồi sớm."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "ci cd",
      "continuous integration",
      "continuous delivery",
      "automation",
      "pipeline"
    ],
    "commands": [
      "npm test",
      "npm run build",
      "git push origin main"
    ]
  },
  "content": "# CI/CD là gì? Tự động hóa tích hợp & chuyển giao liên tục\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất cốt lõi của Continuous Integration (CI) và Continuous Delivery/Deployment (CD).\n- Hiểu rõ sự khác biệt giữa quy trình kiểm thử thủ công rủi ro và đường ống tự động hóa.\n- Nhận thức các lợi ích then chốt: giảm thiểu lỗi hồi quy, phát hành phiên bản nhanh và phản hồi sớm.\n\n## 🧩 Từ khóa hôm nay\n### Continuous Integration\n- **Nói dễ hiểu**: Thói quen tích hợp thay đổi nhỏ, thường xuyên vào nhánh chung và dùng build/test tự động để nhận phản hồi sớm.\n- **Ví dụ**: Hệ thống tự động chạy `npm test` mỗi khi bạn tạo Pull Request vào nhánh `main`.\n- **Đừng nhầm**: CI không tự gộp code và cũng không chứng minh code chắc chắn đúng; nhóm chọn các bước kiểm tra phù hợp.\n\n### Continuous Delivery\n- **Nói dễ hiểu**: Duy trì phần mềm ở trạng thái có thể phát hành; quyết định phát hành có thể được thực hiện thủ công theo quy trình của nhóm.\n- **Ví dụ**: Sau khi qua bài test, mã nguồn được build thành file Docker image sẵn sàng đưa lên môi trường staging.\n- **Đừng nhầm**: Continuous Delivery không bắt buộc mọi nhóm phải có nút duyệt giống nhau; Continuous Deployment tự động phát hành các thay đổi đạt điều kiện đã đặt ra.\n\n### Integration Hell\n- **Nói dễ hiểu**: Cơn ác mộng xung đột khi các lập trình viên làm việc riêng lẻ quá lâu rồi mới dồn code vào gộp một lần.\n- **Ví dụ**: Hai tháng không merge code khiến khi gộp nhánh phát sinh hàng trăm xung đột mã nguồn không thể gỡ nổi.\n- **Đừng nhầm**: Không phải lỗi do Git hay máy chủ hỏng, mà là hệ quả của thói quen trì hoãn tích hợp thường xuyên.\n\n## 📖 Định nghĩa\nCI/CD là nhóm thực hành giúp tích hợp thay đổi thường xuyên, kiểm tra và chuẩn bị phần mềm để phát hành. CI nhấn mạnh việc tích hợp sớm kèm phản hồi tự động; Continuous Delivery giữ phiên bản ở trạng thái sẵn sàng phát hành; Continuous Deployment tự động phát hành thay đổi đạt các điều kiện của nhóm.\n\n## 🤔 Tại sao cần?\nKhi các nhánh làm việc riêng quá lâu, việc tích hợp có thể phát sinh nhiều xung đột và lỗi khó tìm. CI/CD giúp phát hiện một số vấn đề sớm hơn nhờ tích hợp thường xuyên và kiểm tra tự động; nó không loại bỏ mọi lỗi hay rủi ro phát hành.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung dây chuyền lắp ráp ô tô tự động. Thay vì chờ lắp xong toàn bộ chiếc xe mới thử phanh, mỗi linh kiện khi vừa được lắp vào khung gầm đều đi qua cảm biến quang học quét kiểm tra chất lượng tự động ngay tại chỗ. Nếu phát hiện một ốc vít chưa siết chặt, đèn đỏ cảnh báo bật sáng và băng chuyền dừng lại ngay.\n\n## 🖼 Sơ đồ\n```mermaid\nflowchart LR\n    Dev[Dev Push Code] --> CI[Continuous Integration: Lint & Test]\n    CI --> CDeliv[Continuous Delivery: luôn sẵn sàng phát hành]\n    CDeliv --> Decision{Quy trình phát hành}\n    Decision -->|Duyệt theo chính sách| Release[Phát hành]\n    Decision -->|Tự động khi đạt điều kiện| Deploy[Continuous Deployment]\n```\n\n## 🌎 Ví dụ thực tế\nTrong môi trường phát triển dự án thực tế: một nhóm bán hàng trực tuyến chạy test tính tiền trên mỗi Pull Request. Nếu quản trị viên đã đặt test đó thành required status check, kết quả thất bại sẽ chặn merge theo chính sách repo. CI giúp nhóm phát hiện lỗi trước phát hành nhưng vẫn cần review, giám sát và phương án khôi phục.\n\n## 💻 Command\n```bash\n# Các lệnh dưới đây chỉ dùng nếu package.json của dự án có khai báo scripts tương ứng\nnpm test\n\n# Biên dịch mã nguồn và kiểm tra lỗi kiểu dữ liệu\nnpm run build\n\n# Đẩy mã nguồn lên kho lưu trữ để kích hoạt đường ống CI\ngit push origin main\n```\n\n## 🔍 Giải thích command\n- `npm test`: Chạy script `test` được khai báo trong `package.json`; script có thể chạy một loại test hoặc nhiều bước.\n- `npm run build`: Chạy script `build` nếu dự án có khai báo; build thành công không thay thế cho kiểm thử.\n- `git push origin main`: Đẩy commit lên remote; workflow chỉ chạy nếu repo có workflow phù hợp và bộ lọc sự kiện khớp.\n\n## ⚠️ Sai lầm phổ biến\n- Coi CI/CD chỉ là việc cài đặt công cụ mà bỏ qua việc xây dựng các bài kiểm thử tự động chất lượng cao.\n- Viết các bài kiểm thử chạy quá chậm kéo dài hàng giờ khiến thời gian phản hồi bị kéo dài.\n- Bỏ qua các bài kiểm thử chập chờn (flaky test) khiến các lập trình viên mất niềm tin vào kết quả của đường ống CI.\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Mở `package.json`, kiểm tra dự án có scripts `test` và `build` không; nếu không có, hãy dùng một dự án mẫu có sẵn các scripts đó.\n2. Chạy `npm test` và ghi lại số test thành công/thất bại; kết quả xanh chỉ nói các test hiện có đã qua.\n3. Nếu dự án có test mẫu, tạo một thay đổi nhỏ có thể hoàn tác để làm một test thất bại; không sửa chức năng thật khi chưa hiểu tác động.\n4. Hoàn tác thay đổi thử nghiệm, chạy lại test và chạy `npm run build` nếu dự án có script này.\n\n## 💡 Hint\n- Nhóm nên đặt mục tiêu thời gian phản hồi dựa trên dự án; không có ngưỡng chung bắt buộc cho mọi bộ test.\n- Luôn chạy test và build thử trên máy cá nhân trước khi thực hiện commit và đẩy code lên máy chủ.\n\n## ✅ Validation\n- Toàn bộ các bài kiểm thử tự động báo Passed và mã nguồn biên dịch thành công không có cảnh báo nghiêm trọng.\n- Phân biệt Delivery (giữ phần mềm sẵn sàng phát hành) với Deployment (tự động phát hành theo điều kiện đã cấu hình).\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững các khái niệm và nguyên lý hoạt động của CI/CD.\n\n## 🔥 Challenge\nPhân tích những rủi ro an ninh và điều kiện tiên quyết cần có trong dự án trước khi một công ty dám áp dụng Continuous Deployment thẳng lên máy chủ sản xuất.\n\n## 📚 Tổng kết\n- Continuous Integration tự động hóa việc kiểm tra, biên dịch và kiểm thử mã nguồn liên tục mỗi khi có thay đổi.\n- Continuous Delivery và Deployment tự động hóa việc đóng gói và chuyển giao phần mềm tới các môi trường triển khai.\n- CI/CD rút ngắn chu kỳ phản hồi, giảm thiểu xung đột và bảo đảm chất lượng ổn định cho sản phẩm phần mềm.\n",
  "quiz": {
    "id": "quiz-07-github-actions-01-ci-cd-concept",
    "title": "Trắc nghiệm: CI/CD là gì? Tự động hóa tích hợp & chuyển giao liên tục",
    "questions": [
      {
        "id": "q1",
        "question": "Chữ cái CI trong cụm từ CI/CD là viết tắt của thuật ngữ nào?",
        "type": "single",
        "options": [
          {
            "text": "Continuous Integration",
            "correct": true
          },
          {
            "text": "Code Inspection",
            "correct": false
          },
          {
            "text": "Centralized Information",
            "correct": false
          },
          {
            "text": "Cloud Infrastructure",
            "correct": false
          }
        ],
        "explanation": "CI là viết tắt của Continuous Integration, nghĩa là quá trình tích hợp liên tục mã nguồn của các lập trình viên vào kho lưu trữ chung."
      },
      {
        "id": "q2",
        "question": "Lợi ích lớn nhất mà Continuous Integration mang lại cho nhóm phát triển là gì?",
        "type": "single",
        "options": [
          {
            "text": "Phát hiện sớm lỗi hồi quy và xung đột tích hợp ngay khi mã nguồn vừa được đẩy lên",
            "correct": true
          },
          {
            "text": "Giúp máy tính của lập trình viên chạy nhanh hơn gấp đôi",
            "correct": false
          },
          {
            "text": "Tự động viết toàn bộ mã nguồn thay cho con người",
            "correct": false
          },
          {
            "text": "Xóa bỏ hoàn toàn nhu cầu về hệ thống kiểm soát phiên bản",
            "correct": false
          }
        ],
        "explanation": "Nhờ tự động kiểm thử và biên dịch mỗi khi có commit mới, CI giúp nhóm phát hiện lỗi ngay từ trứng nước thay vì đợi đến ngày phát hành."
      },
      {
        "id": "q3",
        "question": "Điểm khác nhau cốt lõi giữa Continuous Delivery và Continuous Deployment là gì?",
        "type": "single",
        "options": [
          {
            "text": "Continuous Delivery giữ phần mềm sẵn sàng phát hành; Continuous Deployment tự động phát hành thay đổi đạt điều kiện đã cấu hình",
            "correct": true
          },
          {
            "text": "Continuous Delivery chỉ áp dụng cho ngôn ngữ Python, còn Deployment cho JavaScript",
            "correct": false
          },
          {
            "text": "Continuous Delivery không bao gồm công đoạn kiểm thử tự động",
            "correct": false
          },
          {
            "text": "Hai khái niệm này hoàn toàn đồng nghĩa và không có bất kỳ khác biệt nào",
            "correct": false
          }
        ],
        "explanation": "Delivery tập trung giữ phiên bản có thể phát hành; Deployment tự động đưa thay đổi đạt điều kiện đã đặt ra tới môi trường phát hành."
      },
      {
        "id": "q4",
        "question": "Hiện tượng Integration Hell trong phát triển phần mềm thường bắt nguồn từ nguyên nhân nào?",
        "type": "single",
        "options": [
          {
            "text": "Các nhánh làm việc riêng lẻ quá lâu mà không tích hợp thường xuyên vào nhánh chính",
            "correct": true
          },
          {
            "text": "Do máy chủ GitHub bị mất kết nối mạng Internet",
            "correct": false
          },
          {
            "text": "Do cài đặt quá nhiều tiện ích mở rộng trên trình soạn thảo code",
            "correct": false
          },
          {
            "text": "Do sử dụng bàn phím cơ thay vì bàn phím thông thường",
            "correct": false
          }
        ],
        "explanation": "Khi các nhánh phát triển độc lập trong nhiều tuần hoặc tháng, các thay đổi tích tụ sẽ gây ra vô số xung đột phức tạp khi gộp lại."
      },
      {
        "id": "q5",
        "question": "Trong chu trình phát triển CI/CD hoàn chỉnh, khái niệm Pipeline biểu thị điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Chuỗi các công đoạn tự động hóa từ kiểm thử mã nguồn, đóng gói cho đến triển khai lên máy chủ",
            "correct": true
          },
          {
            "text": "Hệ thống đường ống dẫn cáp quang mạng nội bộ của công ty",
            "correct": false
          },
          {
            "text": "Phương thức gõ phím đặc biệt chỉ dành cho các kỹ sư cấp cao",
            "correct": false
          },
          {
            "text": "Tên gọi của một giao thức mạng thay thế hoàn toàn HTTP",
            "correct": false
          }
        ],
        "explanation": "CI/CD Pipeline là chuỗi các bước tự động liên kết chặt chẽ với nhau, bảo đảm mã nguồn được kiểm duyệt kỹ càng trước khi phát hành tới người dùng."
      }
    ]
  }
};
export default lesson;
