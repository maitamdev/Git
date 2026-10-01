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
  "content": "# CI/CD là gì? Tự động hóa tích hợp & chuyển giao liên tục\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất cốt lõi của Continuous Integration (CI) và Continuous Delivery/Deployment (CD).\n- Hiểu rõ sự khác biệt giữa quy trình kiểm thử thủ công rủi ro và đường ống tự động hóa.\n- Nhận thức các lợi ích then chốt: giảm thiểu lỗi hồi quy, phát hành phiên bản nhanh và phản hồi sớm.\n\n## 🧩 Từ khóa hôm nay\n### Continuous Integration\n- **Nói dễ hiểu**: Quy trình tự động kiểm tra cú pháp, biên dịch và chạy test ngay khi lập trình viên vừa đẩy code lên.\n- **Ví dụ**: Hệ thống tự động chạy `npm test` mỗi khi bạn tạo Pull Request vào nhánh `main`.\n- **Đừng nhầm**: Không chỉ là gộp code vào chung một nhánh, mà bắt buộc phải có bước kiểm thử tự động xác nhận code không bị lỗi.\n\n### Continuous Delivery\n- **Nói dễ hiểu**: Tự động đóng gói phần mềm sẵn sàng phát hành lên máy chủ, chỉ đợi một nút bấm phê duyệt từ con người.\n- **Ví dụ**: Sau khi qua bài test, mã nguồn được build thành file Docker image sẵn sàng đưa lên môi trường staging.\n- **Đừng nhầm**: Khác với Continuous Deployment (triển khai tự động 100% thẳng lên production mà không cần con người bấm nút).\n\n### Integration Hell\n- **Nói dễ hiểu**: Cơn ác mộng xung đột khi các lập trình viên làm việc riêng lẻ quá lâu rồi mới dồn code vào gộp một lần.\n- **Ví dụ**: Hai tháng không merge code khiến khi gộp nhánh phát sinh hàng trăm xung đột mã nguồn không thể gỡ nổi.\n- **Đừng nhầm**: Không phải lỗi do Git hay máy chủ hỏng, mà là hệ quả của thói quen trì hoãn tích hợp thường xuyên.\n\n## 📖 Định nghĩa\nCI/CD là phương pháp luận kỹ thuật phần mềm tự động hóa toàn bộ hành trình từ khi viết mã đến khi đưa ứng dụng lên máy chủ. Continuous Integration tự động kiểm thử và tích hợp mã nguồn liên tục, trong khi Continuous Delivery và Deployment tự động hóa việc đóng gói và chuyển giao phần mềm tới tay người dùng.\n\n## 💡 Tại sao cần\nTrước đây, việc tích hợp mã nguồn thủ công sau nhiều tuần làm việc độc lập thường gây ra thảm họa Integration Hell với hàng tá xung đột và lỗi tiềm ẩn. CI/CD loại bỏ rủi ro này bằng cách kiểm tra tự động từng thay đổi nhỏ ngay tức thì, giúp đội ngũ phát hiện và sửa lỗi chỉ trong vài phút thay vì vài tuần.\n\n## 🧠 Mental Model\nHãy hình dung dây chuyền lắp ráp ô tô tự động. Thay vì chờ lắp xong toàn bộ chiếc xe mới thử phanh, mỗi linh kiện khi vừa được lắp vào khung gầm đều đi qua cảm biến quang học quét kiểm tra chất lượng tự động ngay tại chỗ. Nếu phát hiện một ốc vít chưa siết chặt, đèn đỏ cảnh báo bật sáng và băng chuyền dừng lại ngay.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart LR\n    Dev[Dev Push Code] --> CI[Continuous Integration: Lint & Test]\n    CI --> CDeliv[Continuous Delivery: Build & Package]\n    CDeliv --> Deploy[Continuous Deployment: Triển khai Production]\n```\n\n## 🏢 Ví dụ thực tế\nMột trang thương mại điện tử lớn áp dụng CI/CD cho toàn bộ dự án. Khi kỹ sư mở Pull Request bổ sung mã giảm giá, hệ thống đám mây tự động tạo môi trường tạm thời và chạy hơn một nghìn bài unit test. Khi có một bài test tính tiền bị sai lệch, hệ thống báo đỏ và khóa nút merge. Nhờ đó, công ty tự tin cập nhật phần mềm 20 lần mỗi ngày mà không lo sập dịch vụ thanh toán.\n\n## 💻 Command & Cú pháp\n```bash\n# Chạy kiểm thử tự động tại máy cá nhân\nnpm test\n\n# Biên dịch mã nguồn và kiểm tra lỗi kiểu dữ liệu\nnpm run build\n\n# Đẩy mã nguồn lên kho lưu trữ để kích hoạt đường ống CI\ngit push origin main\n```\n\n## 🔍 Giải thích command\n- `npm test`: Thực thi toàn bộ bộ bài kiểm thử đơn vị để bảo đảm tính đúng đắn của logic nghiệp vụ trước khi chia sẻ code.\n- `npm run build`: Kiểm tra tính hợp lệ của cú pháp và cấu trúc mã nguồn thông qua quá trình biên dịch thử nghiệm.\n- `git push origin main`: Đưa các commit đã được xác thực lên máy chủ trung tâm để kích hoạt luồng CI/CD tự động trên GitHub.\n\n## ⚠️ Sai lầm phổ biến\n- Coi CI/CD chỉ là việc cài đặt công cụ mà bỏ qua việc xây dựng các bài kiểm thử tự động chất lượng cao.\n- Viết các bài kiểm thử chạy quá chậm kéo dài hàng giờ khiến thời gian phản hồi bị kéo dài.\n- Bỏ qua các bài kiểm thử chập chờn (flaky test) khiến các lập trình viên mất niềm tin vào kết quả của đường ống CI.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Mở terminal trong thư mục dự án và chạy lệnh kiểm thử cục bộ `npm test`.\n2. Quan sát kết quả hiển thị của các bài test xem toàn bộ có báo trạng thái Passed màu xanh hay không.\n3. Thử sửa một hàm nhỏ để kiểm thử trả về kết quả sai, sau đó chạy lại lệnh để nhận biết cách hệ thống phát hiện lỗi.\n4. Sửa lại code cho đúng và chạy lệnh `npm run build` để kiểm tra quá trình biên dịch hoàn tất sạch sẽ.\n\n## 💡 Hint & mẹo\n- Tinh thần cốt lõi của CI là phản hồi siêu nhanh, hãy thiết kế các bài kiểm thử cơ bản chạy dưới 5 phút.\n- Luôn chạy test và build thử trên máy cá nhân trước khi thực hiện commit và đẩy code lên máy chủ.\n\n## ✅ Validation & Kết quả mong đợi\n- Toàn bộ các bài kiểm thử tự động báo Passed và mã nguồn biên dịch thành công không có cảnh báo nghiêm trọng.\n- Hiểu rõ sự khác biệt giữa Continuous Delivery (cần duyệt thủ công) và Continuous Deployment (tự động hóa 100%).\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững các khái niệm và nguyên lý hoạt động của CI/CD.\n\n## 🚀 Thử thách nâng cao\nPhân tích những rủi ro an ninh và điều kiện tiên quyết cần có trong dự án trước khi một công ty dám áp dụng Continuous Deployment thẳng lên máy chủ sản xuất.\n\n## 📝 Tổng kết\n- Continuous Integration tự động hóa việc kiểm tra, biên dịch và kiểm thử mã nguồn liên tục mỗi khi có thay đổi.\n- Continuous Delivery và Deployment tự động hóa việc đóng gói và chuyển giao phần mềm tới các môi trường triển khai.\n- CI/CD rút ngắn chu kỳ phản hồi, giảm thiểu xung đột và bảo đảm chất lượng ổn định cho sản phẩm phần mềm.\n",
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
            "text": "Continuous Delivery yêu cầu sự phê duyệt thủ công trước khi đẩy lên production, trong khi Continuous Deployment tự động hóa 100%",
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
        "explanation": "Continuous Delivery tạo ra sản phẩm sẵn sàng triển khai nhưng cần một nút bấm xác nhận từ con người, còn Continuous Deployment tự động triển khai thẳng lên production nếu qua hết test."
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
