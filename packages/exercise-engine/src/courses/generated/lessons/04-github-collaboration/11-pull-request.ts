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
      "Hiểu PR là yêu cầu review/integrate thay đổi từ nhánh nguồn vào nhánh đích.",
      "Hiểu rõ thuật ngữ: Vì sao lại gọi là \"Pull Request\" (yêu cầu người khác kéo code của mình về gộp).",
      "Tạo PR thử nghiệm trên GitHub nếu có tài khoản, quyền truy cập và nhánh đã push.",
      "Viết mô tả nêu mục tiêu, thay đổi và cách kiểm tra."
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
  "content": "# Khái niệm và quy trình tạo Pull Request (PR)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm cốt lõi và vai trò trung tâm của Pull Request (PR) trong quy trình phát triển phần mềm hiện đại.\n- Giải mã ý nghĩa tên gọi \"Pull Request\": lời đề nghị chính thức yêu cầu người quản trị kéo mã nguồn về gộp.\n- Thực hiện thuần thục các bước thiết lập một Pull Request hoàn chỉnh trên giao diện GitHub.\n- Viết mô tả PR (PR Description) mạch lạc, súc tích kết hợp danh sách kiểm tra (checklist) đạt chuẩn doanh nghiệp.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### pull request (PR) — đề xuất hợp nhất\n- **Nói dễ hiểu:** Một bản đề xuất trang trọng trên GitHub yêu cầu đội ngũ dự án thẩm định và gộp code từ nhánh của bạn vào nhánh chính.\n- **Ví dụ:** Bạn mở một PR đề nghị gộp nhánh `feat/cart-drawer` vào nhánh `main` sau khi đã hoàn thiện chức năng giỏ hàng.\n- **Đừng nhầm:** PR không phải là lệnh của Git trong terminal; đây là tính năng cộng tác đặc trưng của nền tảng web như GitHub, GitLab.\n\n### reviewers — người thẩm định mã nguồn\n- **Nói dễ hiểu:** Những kỹ sư đồng nghiệp được chỉ định vào PR để trực tiếp đọc code, kiểm tra chất lượng và quyết định bấm duyệt.\n- **Ví dụ:** Bạn gán thẻ Tech Lead và bạn cặp đôi (pair-programming) vào mục Reviewers để họ nhận thông báo vào đánh giá.\n- **Đừng nhầm:** Reviewers không chỉ tìm lỗi mà còn đảm bảo mã nguồn tuân thủ đúng chuẩn kiến trúc và phong cách chung của tổ chức.\n\n### base and compare branch — cặp nhánh đích và nhánh nguồn\n- **Nói dễ hiểu:** Hai nhánh xác định hướng chảy của mã nguồn: `base` là nhánh đích nhận code, `compare` là nhánh tính năng của bạn.\n- **Ví dụ:** Cấu hình `base: main` ◄── `compare: feat/login` biểu thị mã nguồn sẽ được chuyển từ feat/login vào main.\n- **Đừng nhầm:** `base` không nhất thiết luôn là `main`; trong các dự án lớn, `base` có thể là nhánh `develop`, `staging` hoặc nhánh release.\n\n---\n\n## 📖 Định nghĩa\nPull Request (viết tắt là PR) là một cơ chế cộng tác trung tâm trên các nền tảng máy chủ như GitHub, cho phép lập trình viên thông báo và gửi lời đề nghị chính thức tới nhóm dự án nhằm xem xét, thảo luận và gộp các thay đổi từ nhánh tính năng (compare branch) vào nhánh đích chính thức (base branch).\n\n---\n\n## 🤔 Tại sao cần?\nNếu ai cũng tự do đẩy code thẳng vào nhánh chính `main`, dự án sẽ nhanh chóng rơi vào hỗn loạn và đổ vỡ vì mã nguồn chứa lỗi chưa được kiểm soát. Pull Request thiết lập một trạm kiểm soát chất lượng không thể thiếu: tạo không gian thảo luận trực quan, kích hoạt kiểm thử tự động CI và đảm bảo mọi dòng mã đều được đồng nghiệp thẩm định kỹ lưỡng trước khi đưa vào sản phẩm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là kiến trúc sư nội thất được giao thiết kế phòng khách cho một ngôi nhà. Bạn không thể tự ý đập phá tường khi chưa có ai cho phép. Bạn vẽ bản vẽ 3D chi tiết, lập bảng dự toán chi phí rồi gửi tới gia chủ kèm lời nhắn lịch thiệp: \"Tôi đã hoàn thành phương án thiết kế phòng khách, kính mời anh chị xem xét phê duyệt\" (Pull Request).\n\n---\n\n## 🖼 Sơ đồ\n```text\nCHU TRÌNH VẬN HÀNH CỦA MỘT PULL REQUEST (PR):\n\n[Tạo nhánh feature] ──► [Commit & Push] ──► [Mở Pull Request trên GitHub]\n                                                    │\n                                                    ▼\n[Chấp thuận & Merge vào main] ◄── [Thảo luận & Code Review & Chạy CI]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau khi hoàn thiện chức năng thanh toán qua ví điện tử trên nhánh `feat/momo-payment`, bạn đẩy nhánh lên GitHub và bấm nút mở PR. Bạn đặt tiêu đề chuẩn `feat: integrate MoMo payment gateway`, mô tả rõ các trường hợp kiểm thử, đính kèm video chạy thử và gắn thẻ Tech Lead vào mục Reviewers. Toàn đội nhận được thông báo để cùng vào đóng góp ý kiến.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c feat/my-feature\ngit push -u origin feat/my-feature\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c feat/my-feature`: Tạo và chuyển ngay sang một nhánh tính năng biệt lập trước khi viết dòng code đầu tiên.\n- `git push -u origin feat/my-feature`: Xuất bản nhánh tính năng lên GitHub kèm thiết lập upstream để giao diện web hiển thị nút tạo PR.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Mở Pull Request trực tiếp từ nhánh `main` cá nhân**: Gây khó khăn khi muốn sửa nhiều tính năng song song; luôn phải tạo nhánh feature riêng.\n2. **Mô tả PR sơ sài cẩu thả**: Chỉ ghi vài từ cụt lủn khiến người review mất thời gian mò mẫm không hiểu mục đích thay đổi.\n3. **Mở một PR quá đồ sộ gom góp nhiều tính năng**: PR vượt quá 500 dòng code khiến đồng nghiệp ngán ngẩm, review hời hợt và dễ lọt lỗi nghiêm trọng.\n\n---\n\n## 🧪 Lab\n1. Tạo một nhánh tính năng mới trên máy của bạn: `git switch -c feat-demo-pr`.\n2. Tạo một commit sửa đổi tài liệu: `git commit --allow-empty -m \"docs: add api contract\"`.\n3. Đẩy nhánh lên máy chủ GitHub: `git push -u origin feat-demo-pr`.\n4. Mở trang dự án trên GitHub, nhấp vào nút \"Compare & pull request\", điền tiêu đề và kiểm tra kỹ hai nhánh base và compare.\n\n---\n\n## 💡 Hint\n> Một PR chuyên nghiệp luôn gồm 3 yếu tố cốt lõi trong phần mô tả: 1. Vấn đề cần giải quyết là gì? (Why), 2. Giải pháp kỹ thuật đã chọn là gì? (What), 3. Cách thức kiểm thử như thế nào? (How to test kèm ảnh chụp hoặc video minh họa).\n\n---\n\n## ✅ Validation\n- Hiểu rõ bản chất hướng đi của code giữa nhánh base và compare.\n- Nắm vững các tiêu chuẩn viết một bản mô tả PR chuyên nghiệp đạt chuẩn doanh nghiệp.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra mức độ am hiểu của bạn về quy trình tạo và quản trị Pull Request trên GitHub.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cách thiết lập tệp mẫu `.github/pull_request_template.md`. Tại sao tất cả các công ty công nghệ lớn đều bắt buộc áp dụng PR Template cho mọi dự án phát triển phần mềm?\n\n---\n\n## 📚 Tổng kết\n- Pull Request là đề xuất chính thức để gộp mã nguồn từ nhánh tính năng vào nhánh đích.\n- Tạo không gian minh bạch cho thảo luận, chạy kiểm thử tự động và rà soát lỗi.\n- Đảm bảo chất lượng và độ an toàn tuyệt đối cho nhánh chính của sản phẩm.\n",
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
        "question": "Thực hành nào thường giúp người khác review Pull Request dễ hơn?",
        "type": "single",
        "options": [
          {
            "text": "Giữ PR tập trung, mô tả mục tiêu và cách kiểm tra rõ ràng",
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
        "explanation": "Thay đổi tập trung và có mô tả giúp reviewer hiểu bối cảnh và kiểm tra phần liên quan."
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
        "question": "Nếu repository cấu hình CI cho Pull Request, workflow có thể tự động làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Chạy các kiểm tra mà repository đã cấu hình, chẳng hạn test, linter hoặc build",
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
        "explanation": "CI chỉ chạy khi repository cấu hình workflow; kết quả hỗ trợ review nhưng không tự chứng minh mọi thứ đúng."
      }
    ]
  }
};
export default lesson;
