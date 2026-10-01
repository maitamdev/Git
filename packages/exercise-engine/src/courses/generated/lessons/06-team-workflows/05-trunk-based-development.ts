import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-trunk-based-development",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "05-trunk-based-development",
    "title": "Trunk-Based Development",
    "level": "advanced",
    "duration": 25,
    "xp": 90,
    "prerequisites": [
      "02-feature-branch-workflow"
    ],
    "objectives": [
      "Nắm vững triết lý và thực tiễn của mô hình Trunk-Based Development được các gã khổng lồ công nghệ áp dụng.",
      "Hiểu rõ khái niệm nhánh cực ngắn hạn (Short-lived branches) với tuổi thọ dưới 1 hoặc 2 ngày.",
      "Làm chủ kỹ thuật Cờ tính năng (Feature Flags) để tách biệt giữa việc đưa mã nguồn lên main (Deploy) và kích hoạt tính năng (Release).",
      "Nhận biết các điều kiện tiên quyết để vận hành Trunk-Based Development thành công: kiểm thử tự động toàn diện và văn hóa review thần tốc."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "trunk-based development",
      "trunk based dev",
      "short-lived branches",
      "feature flags",
      "ci cd pipeline",
      "continuous integration",
      "fast iteration"
    ],
    "commands": [
      "git switch main && git pull --rebase origin main",
      "git switch -c short-feat/add-rating-model",
      "git push origin short-feat/add-rating-model"
    ]
  },
  "content": "# Trunk-Based Development\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu mục tiêu của Trunk-Based Development: tích hợp thay đổi nhỏ vào nhánh chính thường xuyên.\n- Phân biệt tích hợp trực tiếp với nhánh ngắn hạn; thời lượng nhánh là hướng dẫn, không phải giới hạn cứng.\n- Hiểu Feature Flag là một cách kiểm soát tính năng có thể dùng khi triển khai dần.\n- Nêu được vì sao kiểm thử nhanh và phối hợp nhóm quan trọng trong mô hình này.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Trunk\n- **Nói dễ hiểu**: Nhánh chính trung tâm (thường là `main`) nơi nhóm tích hợp thay đổi nhỏ thường xuyên.\n- **Ví dụ**: Nhóm tích hợp thay đổi nhỏ vào nhánh chính nhiều lần trong ngày hoặc theo nhịp làm việc của mình.\n- **Đừng nhầm**: Trunk thường là nhánh chính như `main`, nhưng tên nhánh tùy repo.\n\n### Short-Lived Branches (Nhánh ngắn hạn)\n- **Nói dễ hiểu**: Nhánh tạm để làm một thay đổi nhỏ rồi tích hợp sớm vào nhánh chính.\n- **Ví dụ**: Nhóm tạo nhánh sửa một lỗi nhỏ, mở PR và cố gắng review trong thời gian ngắn.\n- **Đừng nhầm**: Không có số giờ/ngày cố định áp dụng cho mọi nhóm; mục tiêu là giữ thay đổi nhỏ và tích hợp thường xuyên.\n\n### Feature Flags (Cờ tính năng)\n- **Nói dễ hiểu**: Cấu hình hoặc điều kiện trong ứng dụng quyết định người dùng nào được thấy một tính năng.\n- **Ví dụ**: `if (features.enableNewRanking)` có thể bật giao diện mới cho một nhóm thử nghiệm trước.\n- **Đừng nhầm**: Feature flag là logic điều khiển trong mã nguồn hoặc cấu hình, không phải là một nhánh của Git.\n\n---\n\n## 📖 Định nghĩa\nTrunk-Based Development là cách làm trong đó nhóm tích hợp thay đổi nhỏ vào một nhánh chính thường xuyên. Nhóm có thể đẩy trực tiếp hoặc dùng nhánh ngắn hạn; CI nhanh giúp phát hiện lỗi sớm. Feature Flag là một kỹ thuật hỗ trợ khi cần triển khai code trước khi bật tính năng.\n\n---\n\n## 💡 Tại sao cần\nTích hợp thay đổi nhỏ thường xuyên giúp giảm thời gian sống riêng của code và khiến vấn đề tích hợp được phát hiện sớm hơn. Mô hình này không loại bỏ conflict hoặc lỗi; nhóm cần có cách test, review và sửa nhanh khi nhánh chính gặp sự cố.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung nhánh chính như dòng công việc chung. Thay vì giữ một mảng code riêng lâu ngày, nhóm chia thay đổi thành phần nhỏ và ghép vào dòng chung thường xuyên. Dòng chung vẫn có thể lỗi nên cần theo dõi và sửa nhanh.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình Trunk-Based Development:\nTrunk (main): ──●────●────●────●────●────●────●────●────● (tích hợp thường xuyên)\n                │   ▲    │   ▲    │   ▲\n                └───┘    └───┘    └───┘\n              (Có thể dùng nhánh ngắn; thời lượng tùy nhóm)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Dũng làm thuật toán xếp hạng dự kiến mất vài tuần. Nhóm chia công việc thành các phần có thể tích hợp sớm, dùng Feature Flag để giới hạn người dùng được bật tính năng nếu cần. Họ vẫn chạy test và theo dõi ứng dụng sau khi triển khai.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch main\ngit pull --rebase origin main\ngit switch -c short-feat/add-rating-model\ngit push origin short-feat/add-rating-model\n```\n\nĐây là ví dụ dùng remote trong Git thật. Một số nhóm tích hợp trực tiếp lên nhánh chính, số khác dùng PR ngắn hạn; hãy làm theo chính sách repo.\n\n---\n\n## 🔍 Giải thích command\n- `git pull --rebase origin main`: Cập nhật `main` từ remote và phát lại commit cục bộ nếu có; chỉ dùng khi hiểu trạng thái nhánh.\n- `git switch -c short-feat/<tên-nhánh>`: Tạo nhánh tạm từ nhánh đang checkout.\n- Tích hợp liên tục: Gộp các thay đổi nhỏ thường xuyên; thời gian review phụ thuộc vào nhóm.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Để thay đổi sống riêng quá lâu**: Nhánh lệch lâu có thể tăng công sức tích hợp.\n2. **Dùng Feature Flag thiếu kiểm soát**: Cờ sai có thể bật tính năng chưa sẵn sàng; cần test cả trạng thái bật/tắt và dọn cờ cũ.\n3. **Không có phản hồi nhanh khi tích hợp**: CI là một cách phổ biến để phát hiện lỗi sớm; nhóm vẫn cần quy trình khác nếu không dùng CI.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Chia nhỏ một bài toán lớn thành 3 đầu việc nhỏ có thể hoàn thành trong 1 ngày làm việc.\n2. Chia một thay đổi giả định thành hai commit nhỏ và ghi rõ thứ tự tích hợp.\n3. Viết vài dòng pseudocode cho Feature Flag và nêu cách kiểm tra cả trạng thái bật lẫn tắt.\n4. Nếu có repo thử nghiệm, tạo nhánh ngắn, commit từng phần rồi tích hợp theo quy ước của repo.\n\n---\n\n## 💡 Hint & mẹo\n> Kiểm tra tự động nhanh và review theo quy mô thay đổi giúp nhóm tích hợp thường xuyên mà phát hiện lỗi sớm.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Hiểu rõ sự khác biệt giữa thời điểm đưa mã nguồn lên máy chủ (Deployment) và thời điểm mở tính năng cho người dùng (Release).\n- Nêu được cách chia nhỏ một thay đổi và một kiểm tra cần có trước/sau khi tích hợp.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây về mô hình Trunk-Based Development.\n\n---\n\n## 🚀 Thử thách nâng cao\nPhân tích cơ chế hoạt động của Feature Flags trong việc giảm thiểu rủi ro khi triển khai code liên tục vào Trunk.\n\n---\n\n## 📝 Tổng kết\n- Trunk-Based Development tập trung hợp nhất các thay đổi nhỏ vào một nhánh chính duy nhất thường xuyên.\n- Thay đổi nhỏ và tích hợp thường xuyên là mục tiêu; không có giới hạn thời gian cứng cho nhánh.\n- Feature Flags có thể tách thời điểm triển khai code khỏi thời điểm bật tính năng cho người dùng.\n",
  "quiz": {
    "id": "quiz-06-05-trunk-based-development",
    "title": "Trắc nghiệm: Trunk-Based Development",
    "questions": [
      {
        "id": "q1",
        "question": "Đặc điểm nhận diện nổi bật nhất của các nhánh làm việc trong mô hình Trunk-Based Development là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh phụ thường ngắn hạn để thay đổi được tích hợp thường xuyên vào nhánh chính",
            "correct": true
          },
          {
            "text": "Tồn tại ít nhất 6 tháng để kiểm thử thật kỹ lưỡng",
            "correct": false
          },
          {
            "text": "Chỉ được phép merge vào ngày cuối cùng của quý",
            "correct": false
          },
          {
            "text": "Không bao giờ được phép merge vào nhánh main",
            "correct": false
          }
        ],
        "explanation": "Tích hợp thường xuyên giúp giới hạn độ lệch so với nhánh chính, nhưng không loại bỏ mọi xung đột."
      },
      {
        "id": "q2",
        "question": "Kỹ thuật nào thường được dùng để ẩn tính năng chưa sẵn sàng trong khi mã đã được tích hợp?",
        "type": "single",
        "options": [
          {
            "text": "Feature flag có thể bật/tắt tính năng theo cấu hình; cần thiết kế và kiểm tra riêng",
            "correct": true
          },
          {
            "text": "Tắt hoàn toàn máy chủ cơ sở dữ liệu khi có người commit",
            "correct": false
          },
          {
            "text": "Khóa tài khoản của tất cả những ai mở Pull Request",
            "correct": false
          },
          {
            "text": "Chỉ cho phép giám đốc điều hành được quyền gõ bàn phím",
            "correct": false
          }
        ],
        "explanation": "Feature flags là một kỹ thuật phổ biến, không bắt buộc trong mọi nhóm; cờ cần được quản lý để tránh bật nhầm hoặc tồn đọng lâu."
      },
      {
        "id": "q3",
        "question": "Vì sao việc tích hợp thường xuyên có thể hữu ích trong Trunk-Based Development?",
        "type": "single",
        "options": [
          {
            "text": "Vì thay đổi nhỏ được đưa vào nhánh chung thường xuyên, giúp giảm thời gian phát hiện tích hợp lệch nhau",
            "correct": true
          },
          {
            "text": "Vì Trunk-Based Development không yêu cầu viết kiểm thử tự động",
            "correct": false
          },
          {
            "text": "Vì mô hình này tự động tăng gấp đôi lương cho lập trình viên",
            "correct": false
          },
          {
            "text": "Vì nó giúp máy tính của kỹ sư chạy mát hơn mà không cần quạt tản nhiệt",
            "correct": false
          }
        ],
        "explanation": "Nhánh ngắn hạn và tích hợp thường xuyên có thể giảm kích thước chênh lệch; nhóm vẫn cần quan sát build và phối hợp khi có lỗi."
      },
      {
        "id": "q4",
        "question": "Năng lực kỹ thuật nào giúp nhóm nhận phản hồi nhanh khi tích hợp thường xuyên vào nhánh chính?",
        "type": "single",
        "options": [
          {
            "text": "Một vòng kiểm tra nhanh, đáng tin cậy (thường có CI); phạm vi và cách thực thi tùy nhóm",
            "correct": true
          },
          {
            "text": "Một phòng họp thật lớn để tất cả mọi người cùng ngồi làm việc chung",
            "correct": false
          },
          {
            "text": "Quy định cấm lập trình viên làm việc từ xa",
            "correct": false
          },
          {
            "text": "Cài đặt ít nhất 10 hệ điều hành khác nhau trên máy tính",
            "correct": false
          }
        ],
        "explanation": "CI nhanh giúp phát hiện vấn đề sớm; trunk-based development vẫn có thể triển khai với quy trình khác, nhưng cần cách giữ nhánh chung dùng được."
      },
      {
        "id": "q5",
        "question": "Tên gọi \"Trunk\" trong mô hình Trunk-Based Development tương đương với khái niệm nhánh nào trong Git?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh chính trung tâm (thường là main hoặc master)",
            "correct": true
          },
          {
            "text": "Nhánh develop",
            "correct": false
          },
          {
            "text": "Nhánh release",
            "correct": false
          },
          {
            "text": "Nhánh hotfix",
            "correct": false
          }
        ],
        "explanation": "\"Trunk\" là thuật ngữ truyền thống chỉ thân cây chính (tương ứng với nhánh main trong Git), nơi mọi kỹ sư tích hợp code thường xuyên."
      }
    ]
  }
};
export default lesson;
