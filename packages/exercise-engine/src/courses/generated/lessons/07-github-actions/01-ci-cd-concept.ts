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
  "content": "# CI/CD là gì? Tự động hóa tích hợp & chuyển giao liên tục\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững bản chất cốt lõi của Continuous Integration (CI) và Continuous Delivery/Deployment (CD).\n- Hiểu rõ sự khác biệt giữa quy trình kiểm thử thủ công rủi ro và đường ống tự động hóa.\n- Nhận thức các lợi ích then chốt: giảm thiểu lỗi hồi quy, phát hành phiên bản nhanh và phản hồi sớm.\n\n---\n\n## 📖 Định nghĩa\n> CI/CD viết tắt của Continuous Integration (Tích hợp liên tục) và Continuous Delivery/Deployment (Chuyển giao hoặc Triển khai liên tục). Đây là phương pháp luận kỹ thuật phần mềm hiện đại và văn hóa DevOps cốt lõi nhằm tự động hóa hoàn toàn các giai đoạn từ khi lập trình viên hoàn thành một đoạn mã nguồn mới, đẩy lên kho lưu trữ Git trung tâm, cho đến khi mã nguồn đó được kiểm tra phân tích cú pháp, biên dịch thành công, vượt qua toàn bộ các bài kiểm thử tự động đa tầng và sẵn sàng chuyển giao lên các môi trường thử nghiệm hoặc máy chủ sản xuất thực tế phục vụ người dùng cuối.\n\n---\n\n## 🤔 Tại sao cần?\nTrong mô hình phát triển phần mềm truyền thống, các nhóm kỹ sư thường làm việc trên các nhánh riêng biệt trong nhiều tuần và chỉ tích hợp mã nguồn vào giai đoạn cuối kỳ phát hành. Hậu quả trực tiếp là hiện tượng ác mộng tích hợp (Integration Hell) bùng nổ với hàng trăm xung đột mã nguồn và lỗi logic tiềm ẩn không thể kiểm soát. CI/CD giải quyết triệt để vấn đề này bằng cách ép buộc mọi thay đổi nhỏ phải được tích hợp liên tục vào nhánh chung, sau đó kích hoạt ngay lập tức chu trình kiểm thử tự động, giúp kỹ sư phát hiện và khắc phục sự cố chỉ trong vài phút sau khi viết mã.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung dây chuyền sản xuất lắp ráp ô tô tự động hóa hiện đại bậc nhất. Thay vì để một chiếc xe hoàn thiện toàn bộ khung vỏ động cơ rồi mới bắt đầu kiểm tra phanh và hệ thống lái, mỗi chi tiết linh kiện khi vừa được cánh tay robot lắp ráp vào khung gầm đều lập tức đi qua các cảm biến quang học quét kiểm tra chất lượng tự động ngay tại chỗ. Nếu phát hiện một con ốc chưa đủ độ siết hoặc có vết nứt nhỏ, dây chuyền lập tức dừng lại và phát đèn đỏ cảnh báo, đảm bảo không có bất kỳ sản phẩm lỗi nào được đi tiếp tới công đoạn bàn giao khách hàng.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nDeveloper push code ──► [Continuous Integration] ──► [Continuous Delivery] ──► [Production Deploy]\n                             │                               │\n                             ├─ Chạy Linter                   ├─ Đóng gói Docker Image\n                             ├─ Biên dịch TypeScript         ├─ Đẩy lên Staging Server\n                             └─ Chạy Unit/E2E Tests          └─ Chờ phê duyệt tự động\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty thương mại điện tử phục vụ hàng triệu người mua sắm trực tuyến áp dụng đường ống CI/CD chuẩn mực. Mỗi khi một kỹ sư tạo Pull Request bổ sung chức năng mã giảm giá mới, hệ thống tự động khởi tạo máy ảo, kéo toàn bộ mã nguồn về, cài đặt các thư viện phụ thuộc và chạy hơn một nghìn bài kiểm thử đơn vị. Nếu có một hàm tính toán tiền tệ bị sai lệch một chữ số thập phân, bài test lập tức báo đỏ và khóa chức năng merge. Nhờ vậy, nhóm phát triển có thể tự tin phát hành hơn hai mươi bản cập nhật phần mềm mỗi ngày mà hệ thống máy chủ thanh toán vẫn hoạt động ổn định tuyệt đối và không phát sinh sự cố ngừng trệ.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\nnpm test\nnpm run build\ngit push origin main\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh trên mô phỏng ba bước nền tảng của quy trình tích hợp: chạy kiểm thử cục bộ với npm test để phát hiện lỗi logic, biên dịch mã nguồn với npm run build để kiểm tra lỗi kiểu dữ liệu và cú pháp, cuối cùng là đẩy mã nguồn lên GitHub để kích hoạt đường ống CI trên đám mây hoạt động hoàn toàn tự động.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Coi CI/CD chỉ là việc cài đặt công cụ**:  Công cụ chỉ phát huy hiệu quả khi văn hóa kiểm thử tự động trong nhóm đã được xây dựng vững vàng.\n2. **Viết bài kiểm thử quá chậm kéo dài hàng giờ**:  Khiến vòng phản hồi bị đình trệ và lập trình viên có xu hướng né tránh chạy kiểm thử.\n3. **Bỏ qua cảnh báo kiểm thử không ổn định (flaky test)**:  Dẫn đến việc các thành viên mất niềm tin vào kết quả báo cáo của đường ống CI.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Xem xét dự án mẫu chứa các bài kiểm thử Jest và cấu hình script trong tệp package.json.\n2. Chạy thử nghiệm lệnh npm test cục bộ và quan sát kết quả kiểm thử đạt chuẩn.\n3. Thử cố tình sửa sai một giá trị kỳ vọng trong bài test để quan sát mã lỗi trả về.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Bản chất của CI là phản hồi cực nhanh, hãy giữ cho các bài kiểm thử cơ bản chạy dưới 5 phút.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nToàn bộ các bài kiểm thử tự động báo trạng thái Passed và mã nguồn biên dịch không lỗi.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra mức độ thấu hiểu của bạn về khái niệm và triết lý CI/CD qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nPhân tích sự khác biệt cốt lõi giữa Continuous Delivery (chuyển giao liên tục) và Continuous Deployment (triển khai liên tục) đối với cổng phê duyệt thủ công của con người.\n\n---\n\n## 📚 Tổng kết kiến thức\n- CI là thực hành tự động tích hợp, biên dịch và kiểm thử mã nguồn liên tục mỗi khi có thay đổi mới.\n- CD mở rộng CI bằng cách tự động hóa quá trình đóng gói và triển khai sản phẩm lên các môi trường thử nghiệm hoặc sản xuất.\n- Đường ống CI/CD mang lại vòng phản hồi ngắn, giảm rủi ro phát hành và nâng cao chất lượng phần mềm.\n",
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
      }
    ]
  }
};
export default lesson;
