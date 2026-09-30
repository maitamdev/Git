import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-vs-github",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "05-git-vs-github",
    "title": "Phân biệt Git vs GitHub",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [
      "04-git-architecture"
    ],
    "objectives": [
      "Phân biệt rạch ròi giữa công cụ dòng lệnh Git và dịch vụ nền tảng lưu trữ đám mây GitHub.",
      "Kể tên các dịch vụ tương đương với GitHub như GitLab, Bitbucket.",
      "Hiểu cách Git và GitHub phối hợp để tạo nên quy trình làm việc nhóm chuyên nghiệp."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git vs github",
      "phan biet",
      "cloud",
      "hosting",
      "collaboration"
    ],
    "commands": [
      "git remote -v",
      "git push",
      "git pull"
    ]
  },
  "content": "# Phân biệt Git vs GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rạch ròi giữa công cụ dòng lệnh Git và dịch vụ nền tảng lưu trữ đám mây GitHub.\n- Kể tên các dịch vụ tương đương với GitHub như GitLab, Bitbucket.\n- Hiểu cách Git và GitHub phối hợp để tạo nên quy trình làm việc nhóm chuyên nghiệp.\n\n---\n\n## 📖 Định nghĩa\n> Git và GitHub là hai khái niệm hoàn toàn khác biệt nhưng bổ trợ chặt chẽ cho nhau. Git là phần mềm quản lý phiên bản mã nguồn mở chạy trực tiếp trên máy tính cá nhân cục bộ của bạn, chịu trách nhiệm lưu vết và kiểm soát lịch sử code. Trong khi đó, GitHub là một dịch vụ nền tảng đám mây trực tuyến thuộc sở hữu của tập đoàn Microsoft, cung cấp máy chủ lưu trữ từ xa cho các kho mã nguồn Git, bổ sung giao diện đồ họa trực quan và các tính năng cộng tác nhóm cao cấp như Pull Request, Code Review, Issue Tracking và GitHub Actions.\n\n---\n\n## 🤔 Tại sao cần?\nRất nhiều bạn sinh viên mới tiếp xúc với ngành công nghệ thông tin thường đánh đồng Git và GitHub là một. Sự ngộ nhận này dẫn đến việc không hiểu rõ tại sao máy tính không có mạng vẫn dùng được Git, hoặc lúng túng khi doanh nghiệp sử dụng GitLab hoặc Bitbucket thay vì GitHub. Phân biệt rõ hai khái niệm này giúp bạn có cái nhìn chuẩn xác về kiến trúc hạ tầng và tự tin làm việc trong bất kỳ môi trường công nghệ nào.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng mối quan hệ giữa Git và GitHub giống như mối quan hệ giữa động cơ xe hơi và bãi đỗ xe thông minh. Git chính là cỗ động cơ mạnh mẽ được lắp đặt ngay bên trong chiếc xe của bạn, cho phép bạn khởi động, lái xe, chuyển số và phanh dừng bất cứ lúc nào. Còn GitHub chính là một tòa nhà bãi đỗ xe trung tâm hiện đại, nơi bạn có thể gửi chiếc xe của mình lên đó để chia sẻ cho bạn bè cùng mượn, cùng chiêm ngưỡng và bảo trì.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMáy tính cá nhân (Local):            Đám mây (Remote Cloud):\n┌───────────────────────────┐         ┌───────────────────────────┐\n│ Git Engine (Dòng lệnh)    │ ──push─►│ GitHub / GitLab           │\n│ - Lưu snapshot cục bộ     │ ◄─pull──│ - Lưu trữ kho mã nguồn    │\n│ - Hoạt động hoàn toàn     │         │ - Pull Request, Review    │\n│   offline trên ổ đĩa      │         │ - Issue Tracking, Actions │\n└───────────────────────────┘         └───────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn ngồi trên một chuyến tàu hỏa vùng cao hoàn toàn không có sóng điện thoại hay Wi-Fi. Bạn vẫn có thể mở máy tính xách tay, sử dụng Git để tạo các nhánh tính năng, viết code và thực hiện hàng chục commit liên tiếp. Khi chuyến tàu về đến ga trung tâm và máy tính bắt sóng Wi-Fi trở lại, bạn chỉ cần gõ lệnh `git push` để đẩy toàn bộ các commit bạn đã làm trên tàu lên kho chứa của công ty trên GitHub để đồng nghiệp tại văn phòng có thể review. Điều này chứng minh sức mạnh độc lập tuyệt đối của công cụ Git cục bộ mà không hề bị phụ thuộc thời gian thực vào các dịch vụ lưu trữ đám mây như GitHub.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\ngit push\ngit pull\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Liệt kê danh sách các đường dẫn URL của kho lưu trữ từ xa đang liên kết với máy bạn kèm quyền đọc ghi fetch và push.\n- `git push`: Đẩy các commit snapshot từ máy tính cục bộ lên nhánh tương ứng trên máy chủ đám mây GitHub.\n- `git pull`: Tải về và tự động gộp các thay đổi mới nhất từ kho chứa GitHub về thư mục làm việc trên máy tính cục bộ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ Git và GitHub là cùng một sản phẩm**:  Git là công cụ phần mềm cục bộ, GitHub là website dịch vụ đám mây.\n2. **Nghĩ không có GitHub thì không học được Git**:  Bạn hoàn toàn có thể thực hành thành thạo mọi câu lệnh Git căn bản mà không cần tạo tài khoản GitHub.\n3. **Bối rối khi công ty dùng GitLab**:  Bản chất câu lệnh Git ở máy bạn vẫn giống nhau 100%, chỉ khác địa chỉ máy chủ lưu trữ từ xa.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git remote -v` trong terminal để kiểm tra xem repository hiện tại đã kết nối với máy chủ từ xa nào chưa.\n2. Quan sát rằng nếu chưa cấu hình remote, lệnh sẽ không in ra địa chỉ URL nào.\n3. Xác nhận rằng kho chứa Git cục bộ hoàn toàn độc lập với dịch vụ GitHub.\n\n---\n\n## 💡 Hint\n> Git chạy trên máy bạn; GitHub chạy trên máy chủ đám mây của Microsoft.\n\n---\n\n## ✅ Validation\n- Phân biệt chính xác vai trò của Git cục bộ và nền tảng đám mây GitHub.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm sau để xác thực sự phân biệt giữa Git và GitHub.\n\n---\n\n## 🔥 Challenge\nKể tên 3 nền tảng lưu trữ mã nguồn đám mây phổ biến trên thế giới ngoài GitHub.\n\n---\n\n## 📚 Tổng kết\n- Git là công cụ quản lý phiên bản dòng lệnh chạy cục bộ trên máy tính cá nhân.\n- GitHub là dịch vụ web lưu trữ kho mã nguồn Git trên đám mây kèm công cụ cộng tác nhóm.\n- Ngoài GitHub còn có nhiều giải pháp lưu trữ Git uy tín khác như GitLab, Bitbucket, Gitea.\n",
  "quiz": {
    "id": "quiz-05-git-vs-github",
    "title": "Trắc nghiệm: Phân biệt Git và GitHub",
    "questions": [
      {
        "id": "q1",
        "question": "Phát biểu nào sau đây miêu tả chính xác nhất bản chất của Git?",
        "type": "single",
        "options": [
          {
            "text": "Là công cụ phần mềm quản lý phiên bản phân tán chạy trực tiếp trên máy tính cá nhân",
            "correct": true
          },
          {
            "text": "Là một mạng xã hội dành cho các lập trình viên đăng ảnh bài viết",
            "correct": false
          },
          {
            "text": "Là một ngôn ngữ lập trình mới dùng để thay thế JavaScript",
            "correct": false
          },
          {
            "text": "Là một trang web tuyển dụng việc làm công nghệ thông tin",
            "correct": false
          }
        ],
        "explanation": "Git là phần mềm mã nguồn mở chạy cục bộ để quản lý phiên bản mã nguồn."
      },
      {
        "id": "q2",
        "question": "GitHub đóng vai trò gì trong hệ sinh thái phát triển phần mềm?",
        "type": "single",
        "options": [
          {
            "text": "Là dịch vụ đám mây lưu trữ các kho Git từ xa và hỗ trợ cộng tác nhóm chuyên nghiệp",
            "correct": true
          },
          {
            "text": "Là hệ điều hành dùng để cài đặt lên máy chủ thay thế Linux",
            "correct": false
          },
          {
            "text": "Là trình duyệt web tốc độ cao cạnh tranh với Google Chrome",
            "correct": false
          },
          {
            "text": "Là phần mềm diệt virus bảo vệ mã nguồn máy tính",
            "correct": false
          }
        ],
        "explanation": "GitHub là nền tảng máy chủ đám mây lưu trữ repo Git và bổ sung tính năng cộng tác nhóm."
      },
      {
        "id": "q3",
        "question": "Nếu bạn làm việc tại một công ty bảo mật không cho phép đưa code lên mạng Internet, bạn sẽ làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn sử dụng Git bình thường và có thể lưu trữ trên máy chủ nội bộ GitLab riêng của công ty",
            "correct": true
          },
          {
            "text": "Bắt buộc phải bỏ dùng Git và quay về cách copy paste thủ công",
            "correct": false
          },
          {
            "text": "Không thể lập trình được vì Git bắt buộc phải kết nối Internet",
            "correct": false
          },
          {
            "text": "Phải xin phép ban quản trị GitHub để mở kênh bí mật",
            "correct": false
          }
        ],
        "explanation": "Git hoạt động độc lập và hoàn toàn có thể tự dựng máy chủ nội bộ (on-premises) bằng GitLab hoặc Gitea."
      },
      {
        "id": "q4",
        "question": "Dịch vụ nào dưới đây có tính năng tương đương với GitHub?",
        "type": "single",
        "options": [
          {
            "text": "GitLab và Bitbucket",
            "correct": true
          },
          {
            "text": "Photoshop và Illustrator",
            "correct": false
          },
          {
            "text": "VLC Media Player",
            "correct": false
          },
          {
            "text": "Microsoft Excel",
            "correct": false
          }
        ],
        "explanation": "GitLab và Bitbucket là hai nền tảng lưu trữ và cộng tác mã nguồn Git tương đương với GitHub."
      }
    ]
  }
};
export default lesson;
