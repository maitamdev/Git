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
  "content": "# Khái niệm và quy trình tạo Pull Request (PR)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm và ý nghĩa cốt lõi của Pull Request (PR) trong phát triển phần mềm hiện đại.\n- Hiểu rõ thuật ngữ: Vì sao lại gọi là \"Pull Request\" (yêu cầu người khác kéo code của mình về gộp).\n- Thực hiện quy trình tạo một Pull Request hoàn chỉnh trên giao diện web của GitHub.\n- Viết mô tả PR (PR Description) rõ ràng, súc tích tuân thủ theo biểu mẫu chuẩn (PR Template).\n\n---\n\n## 📖 Định nghĩa\n> Pull Request (thường viết tắt là PR, trong hệ sinh thái GitLab gọi là Merge Request) là một cơ chế cộng tác trung tâm trên GitHub, cho phép một lập trình viên chính thức gửi thông báo và yêu cầu đội ngũ bảo trì hoặc trưởng nhóm kiểm tra, thảo luận và gộp (pull & merge) các commit từ một nhánh tính năng vào nhánh chính của dự án. PR cung cấp không gian tương tác trực quan với giao diện so sánh diff từng dòng, khu vực bình luận và hệ thống kiểm thử tự động CI tích hợp.\n\n---\n\n## 🤔 Tại sao cần?\nThời kỳ các lập trình viên tùy tiện đẩy code trực tiếp lên nhánh chính mà không qua ai kiểm duyệt đã lùi vào dĩ vãng. Pull Request là trái tim của văn hóa kỹ thuật hiện đại: nó ngăn ngừa các lỗi tiềm ẩn xâm nhập vào sản phẩm, tạo cơ hội chia sẻ kiến thức chuyên môn giữa các thành viên, lưu lại tài liệu giải trình kỹ thuật cho từng quyết định kiến trúc và xây dựng tinh thần trách nhiệm tập thể đối với chất lượng mã nguồn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là một kiến trúc sư nội thất được thuê trang trí phòng khách của một căn nhà sang trọng. Bạn không tự ý mở cửa nhà khách rồi tự tiện sơn tường hay đập phá vách ngăn khi chưa ai cho phép. Thay vào đó, bạn dựng một bản vẽ thiết kế 3D hoàn chỉnh kèm theo báo giá chi tiết, gửi hồ sơ đó tới gia chủ và lịch sự nói: \"Tôi đã hoàn thành thiết kế mới cho phòng khách, xin mời anh chị xem xét và chấp thuận để tôi thi công\" (Pull Request).\n\n---\n\n## 🖼 Sơ đồ\n```text\nVòng đời của một Pull Request:\n[Tạo nhánh feature] ──► [Commit & Push] ──► [Mở Pull Request trên GitHub]\n                                                    │\n                                                    ▼\n[Chấp thuận & Merge vào main] ◄── [Thảo luận & Code Review & Chạy CI]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Phương vừa hoàn thành xong tính năng lọc sản phẩm theo mức giá trên nhánh `feat/price-filter` và đã đẩy toàn bộ mã nguồn lên GitHub. Phương truy cập trang web của dự án trên GitHub và bấm nút xanh \"Compare & pull request\". Phương đặt tiêu đề chuẩn Conventional Commits: \"feat: add price range filter component\", điền chi tiết bản mô tả về cách thức hoạt động của component, đính kèm ảnh chụp màn hình giao diện đã chạy thử nghiệm thành công trên trình duyệt, đồng thời chỉ định hai đồng nghiệp senior trong nhóm vào danh sách Reviewers để cùng tham gia thẩm định chất lượng mã nguồn trước khi xuất bản.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c feat/my-feature\ngit push -u origin feat/my-feature\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <tên-nhánh>`: Luôn luôn tạo một nhánh riêng biệt cô lập cho từng tính năng hoặc bản sửa lỗi trước khi bắt đầu viết mã nguồn.\n- `git push -u origin <nhánh>`: Đẩy nhánh tính năng lên GitHub và thiết lập tracking để sẵn sàng tạo Pull Request trên giao diện web.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tạo Pull Request trực tiếp từ nhánh main cá nhân**:  Dễ gây xung đột và khó quản lý nhiều PR cùng lúc; luôn luôn tạo feature branch.\n2. **Viết tiêu đề và mô tả PR cẩu thả hoặc để trống**:  Khiến đồng nghiệp không hiểu mục đích thay đổi và từ chối xem xét.\n3. **Gộp quá nhiều tính năng không liên quan vào cùng một PR khổng lồ (Mega PR)**:  Gây quá tải cho người review và rất khó phát hiện lỗi.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh tính năng mới `feat-login-button` và commit một chỉnh sửa nhỏ.\n2. Đẩy nhánh tính năng lên GitHub bằng `git push -u origin feat-login-button`.\n3. Truy cập giao diện web của GitHub và nhấn nút `Compare & pull request`.\n4. Điền tiêu đề, mô tả giải thích lý do thay đổi và bấm `Create pull request`.\n\n---\n\n## 💡 Hint\n> Một Pull Request lý tưởng nên nhỏ gọn, tập trung giải quyết duy nhất một vấn đề cụ thể.\n\n---\n\n## ✅ Validation\n- Tạo thành công Pull Request trên GitHub với đầy đủ thông tin mô tả chi tiết.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và quy trình tạo Pull Request.\n\n---\n\n## 🔥 Challenge\nGiải thích cơ chế hoạt động của tệp `.github/pull_request_template.md` trong việc chuẩn hóa nội dung PR.\n\n---\n\n## 📚 Tổng kết\n- Pull Request là yêu cầu chính thức đề nghị gộp code từ nhánh tính năng vào nhánh chính.\n- Cung cấp môi trường thảo luận, xem diff, bình luận code và chạy kiểm thử tự động CI.\n- Luôn tạo nhánh riêng biệt và viết mô tả rõ ràng cho từng Pull Request.\n",
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
