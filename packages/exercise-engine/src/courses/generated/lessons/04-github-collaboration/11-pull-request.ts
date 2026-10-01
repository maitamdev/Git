import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-pull-request",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "11-pull-request",
    "title": "Khái niệm và quy trình tạo Pull Request (PR)",
    "level": "intermediate",
    "duration": 30,
    "xp": 100,
    "prerequisites": [
      "09-fork"
    ],
    "objectives": [
      "Nắm vững khái niệm và ý nghĩa cốt lõi của Pull Request (PR) trong phát triển phần mềm hiện đại.",
      "Hiểu rõ thuật ngữ: Vì sao lại gọi là \"Pull Request\" (yêu cầu người khác kéo code của mình về gộp).",
      "Thực hiện quy trình tạo một Pull Request hoàn chỉnh trên giao diện web của GitHub.",
      "Viết mô tả PR (PR Description) rõ ràng, súc tích tuân thủ theo biểu mẫu chuẩn (PR Template)."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "create-pr"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "pull request",
      "pr",
      "yeu cau gop code",
      "code contribution",
      "feature branch",
      "github pr"
    ],
    "commands": [
      "git switch -c feat/my-feature",
      "git push -u origin feat/my-feature"
    ]
  },
  "content": "# Khái niệm và quy trình tạo Pull Request (PR)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm và ý nghĩa cốt lõi của Pull Request (PR) trong phát triển phần mềm hiện đại.\n- Hiểu rõ thuật ngữ: Vì sao lại gọi là \"Pull Request\" (yêu cầu người khác kéo code của mình về gộp).\n- Thực hiện quy trình tạo một Pull Request hoàn chỉnh trên giao diện web của GitHub.\n- Viết mô tả PR (PR Description) rõ ràng, súc tích tuân thủ theo biểu mẫu chuẩn (PR Template).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### pull request (PR)\n- **Nói dễ hiểu**: Lời đề nghị chính thức gửi tới nhóm đề nghị xem xét và kéo (pull) code từ nhánh của bạn vào nhánh chính.\n- **Ví dụ**: Mở PR đề xuất gộp nhánh `feat/cart` vào nhánh `main` của dự án.\n- **Đừng nhầm**: Không phải lệnh của Git trên máy tính; đây là cơ chế tương tác và quản lý code trên GitHub hoặc GitLab.\n\n### reviewers\n- **Nói dễ hiểu**: Những đồng nghiệp được chỉ định vào PR để đọc, kiểm tra chất lượng code và phê duyệt trước khi gộp.\n- **Ví dụ**: Tag tên trưởng nhóm hoặc bạn cùng dự án vào mục Reviewers trên trang PR.\n- **Đừng nhầm**: Không chỉ để phê bình; reviewers giúp phát hiện lỗi sớm và đảm bảo tính nhất quán của kiến trúc.\n\n### base and compare branch\n- **Nói dễ hiểu**: Cặp nhánh xác định chiều gộp code: `base` là nhánh đích nhận code, `compare` là nhánh tính năng của bạn.\n- **Ví dụ**: `base: main` ◄── `compare: feat/login` thể hiện code sẽ đi từ feat/login vào main.\n- **Đừng nhầm**: Đừng chọn nhầm base branch sang một nhánh tính năng khác khi mục tiêu thực sự là đưa vào main.\n\n---\n\n## 📖 Định nghĩa\nPull Request (viết tắt là PR, trong GitLab gọi là Merge Request) là cơ chế cộng tác trên nền tảng Git lưu trữ, cho phép lập trình viên thông báo và yêu cầu đội ngũ bảo trì kiểm tra, thảo luận và gộp code từ một nhánh tính năng vào nhánh chính của dự án kèm giao diện so sánh diff trực quan.\n\n---\n\n## 💡 Tại sao cần\nĐẩy code trực tiếp lên nhánh chính mà không qua ai kiểm duyệt rất dễ làm hỏng hệ thống production. Pull Request giúp ngăn ngừa lỗi tiềm ẩn, tạo không gian chia sẻ kiến thức giữa các thành viên, chạy kiểm thử tự động CI và lưu lại lý do kỹ thuật cho từng quyết định thay đổi.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn là kiến trúc sư nội thất được thuê trang trí phòng khách. Bạn không tự ý mở cửa nhà khách rồi đập phá tường khi chưa ai đồng ý. Bạn vẽ bản thiết kế 3D hoàn chỉnh kèm dự toán chi phí, gửi cho gia chủ và lịch sự nói: \"Tôi đã hoàn thành thiết kế phòng khách, xin mời anh chị xem xét và chấp thuận\" (Pull Request).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nVòng đời của một Pull Request:\n[Tạo nhánh feature] ──► [Commit & Push] ──► [Mở Pull Request trên GitHub]\n                                                    │\n                                                    ▼\n[Chấp thuận & Merge vào main] ◄── [Thảo luận & Code Review & Chạy CI]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Phương hoàn thành bộ lọc giá sản phẩm trên nhánh `feat/price-filter` và đẩy lên GitHub. Phương vào trang dự án bấm \"Compare & pull request\", đặt tiêu đề chuẩn `feat: add price range filter component`, mô tả cơ chế hoạt động, đính kèm ảnh chụp màn hình kiểm thử và gắn hai đồng nghiệp senior vào mục Reviewers để cùng đánh giá mã nguồn.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch -c feat/my-feature\ngit push -u origin feat/my-feature\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <tên-nhánh>`: Tạo một nhánh riêng biệt cô lập cho tính năng mới trước khi viết code.\n- `git push -u origin <nhánh>`: Đẩy nhánh tính năng lên GitHub và thiết lập tracking để sẵn sàng tạo Pull Request trên web.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tạo PR trực tiếp từ nhánh main cá nhân**: Gây khó khăn khi muốn sửa nhiều tính năng cùng lúc; luôn tạo nhánh feature riêng.\n2. **Tiêu đề và mô tả PR sơ sài**: Khiến người review không hiểu mục đích thay đổi và trì hoãn phê duyệt.\n3. **Mở một PR quá khổng lồ chứa nhiều tính năng không liên quan**: Làm quá tải người kiểm tra và dễ bỏ sót lỗi nghiêm trọng.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo nhánh tính năng, đẩy lên remote và mở PR trên giao diện web.\n1. Tạo nhánh tính năng mới `feat-login-button` và commit một chỉnh sửa nhỏ.\n2. Đẩy nhánh tính năng lên GitHub bằng `git push -u origin feat-login-button`.\n3. Mở trang repository trên GitHub và nhấn nút `Compare & pull request`.\n4. Điền tiêu đề, tóm tắt lý do thay đổi và nhấn `Create pull request`.\n\n---\n\n## 💡 Hint & mẹo\n> Một Pull Request lý tưởng nên nhỏ gọn, tập trung giải quyết trọn vẹn một vấn đề duy nhất để đồng nghiệp review nhanh chóng.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Pull Request được tạo thành công trên GitHub với đầy đủ tiêu đề và nội dung giải trình.\n- Giao diện \"Files changed\" hiển thị đúng các dòng code bạn đã thay đổi.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về quy trình tạo Pull Request.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách cấu hình file `.github/pull_request_template.md` để tự động hiển thị danh sách kiểm tra (checklist) cho mọi PR mới trong dự án.\n\n---\n\n## 📝 Tổng kết\n- Pull Request là yêu cầu chính thức đề nghị gộp code từ nhánh tính năng vào nhánh chính.\n- Cung cấp môi trường thảo luận, xem diff, bình luận code và chạy kiểm thử tự động CI.\n- Luôn tạo nhánh riêng biệt và viết mô tả rõ ràng cho từng Pull Request.\n",
  "quiz": {
    "id": "quiz-04-11-pull-request",
    "title": "Trắc nghiệm: Quy trình tạo Pull Request (PR)",
    "questions": [
      {
        "id": "q1",
        "question": "Vì sao cơ chế này lại được đặt tên là \"Pull Request\" mà không phải là \"Push Request\"?",
        "type": "single",
        "options": [
          {
            "text": "Vì bạn đang lịch sự gửi yêu cầu đề nghị người bảo trì kho đích hãy kéo (PULL) mã nguồn từ nhánh của bạn về gộp vào kho của họ",
            "correct": true
          },
          {
            "text": "Vì từ \"Pull\" gõ trên bàn phím nhanh hơn từ \"Push\"",
            "correct": false
          },
          {
            "text": "Vì người sáng lập Git thích tập môn thể thao kéo xà đơn (Pull-up)",
            "correct": false
          },
          {
            "text": "Vì đây là lỗi đánh máy từ những năm 2008 của lập trình viên GitHub",
            "correct": false
          }
        ],
        "explanation": "Bạn đề nghị người quản trị: \"Xin hãy PULL các commit của tôi vào nhánh chính của bạn\"."
      },
      {
        "id": "q2",
        "question": "Thực hành nào sau đây được coi là chuẩn mực vàng khi tạo Pull Request trong các công ty chuyên nghiệp?",
        "type": "single",
        "options": [
          {
            "text": "Mỗi PR chỉ giải quyết duy nhất một vấn đề cụ thể, có dung lượng vừa phải kèm mô tả rõ ràng và ảnh minh họa",
            "correct": true
          },
          {
            "text": "Gộp toàn bộ công việc của cả tháng vào một PR khổng lồ chứa hơn 10.000 dòng code",
            "correct": false
          },
          {
            "text": "Không cần viết bất kỳ dòng mô tả nào để đồng nghiệp tự đoán ý đồ",
            "correct": false
          },
          {
            "text": "Luôn luôn tạo PR trực tiếp từ nhánh main của máy cá nhân",
            "correct": false
          }
        ],
        "explanation": "PR nhỏ gọn (Small PRs) giúp việc review diễn ra nhanh chóng, kỹ lưỡng và giảm thiểu rủi ro lỗi ngầm."
      },
      {
        "id": "q3",
        "question": "Thao tác tạo Pull Request được thực hiện chủ yếu ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Trên giao diện web của các nền tảng lưu trữ như GitHub, GitLab hoặc qua công cụ GitHub CLI (`gh pr create`)",
            "correct": true
          },
          {
            "text": "Gõ lệnh `git pull-request` trong terminal Git cơ bản",
            "correct": false
          },
          {
            "text": "Gửi tin nhắn thoại qua ứng dụng Zalo",
            "correct": false
          },
          {
            "text": "Gửi bản in giấy mã nguồn qua bưu điện",
            "correct": false
          }
        ],
        "explanation": "Pull Request là tính năng của nền tảng cộng tác (GitHub/GitLab/Bitbucket), không phải lệnh có sẵn của core Git."
      },
      {
        "id": "q4",
        "question": "Trong giao diện tạo Pull Request trên GitHub, hai thuật ngữ \"base branch\" và \"compare branch\" có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Base là nhánh đích muốn gộp vào (ví dụ main), Compare là nhánh nguồn chứa tính năng mới của bạn",
            "correct": true
          },
          {
            "text": "Base là nhánh của máy tính người review, Compare là nhánh của sếp",
            "correct": false
          },
          {
            "text": "Base là nhánh chứa virus, Compare là nhánh an toàn",
            "correct": false
          },
          {
            "text": "Hai khái niệm này hoàn toàn đảo ngược nhau",
            "correct": false
          }
        ],
        "explanation": "Cú pháp: `base: main` ◄── `compare: feature-branch`. Mã nguồn sẽ đi từ compare vào base."
      },
      {
        "id": "q5",
        "question": "Khi bạn tiếp tục commit và push thêm code lên nhánh tính năng sau khi đã mở Pull Request, điều gì sẽ xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Các commit mới sẽ tự động được bổ sung vào Pull Request đang mở mà không cần bạn phải tạo lại PR mới",
            "correct": true
          },
          {
            "text": "Pull Request hiện tại sẽ bị tự động hủy bỏ ngay lập tức",
            "correct": false
          },
          {
            "text": "Bạn phải đóng PR cũ và tạo một PR hoàn toàn mới từ đầu",
            "correct": false
          },
          {
            "text": "GitHub sẽ gửi thông báo cảnh báo vi phạm bản quyền",
            "correct": false
          }
        ],
        "explanation": "PR theo dõi con trỏ nhánh; mọi commit mới push lên nhánh đó đều tự động xuất hiện trong danh sách commit của PR."
      },
      {
        "id": "q6",
        "question": "Hệ thống CI/CD (Continuous Integration) thường làm nhiệm vụ tự động gì khi một Pull Request được mở ra?",
        "type": "single",
        "options": [
          {
            "text": "Tự động chạy bộ kiểm thử đơn vị (Unit Tests), kiểm tra quy chuẩn mã nguồn (Linter) và biên dịch thử dự án",
            "correct": true
          },
          {
            "text": "Tự động chuyển tiền lương vào tài khoản ngân hàng của tác giả PR",
            "correct": false
          },
          {
            "text": "Tự động tắt nguồn máy chủ của công ty",
            "correct": false
          },
          {
            "text": "Tự động duyệt và merge PR mà không cần con người xem xét",
            "correct": false
          }
        ],
        "explanation": "CI đóng vai trò người gác cổng tự động bảo đảm mã nguồn mới đáp ứng các tiêu chuẩn kỹ thuật trước khi merge."
      }
    ]
  }
};
export default lesson;
