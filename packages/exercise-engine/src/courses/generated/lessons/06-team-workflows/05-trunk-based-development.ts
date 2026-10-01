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
  "content": "# Trunk-Based Development\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững triết lý và thực tiễn của mô hình Trunk-Based Development được các gã khổng lồ công nghệ áp dụng.\n- Hiểu rõ khái niệm nhánh cực ngắn hạn (Short-lived branches) với tuổi thọ dưới 1 hoặc 2 ngày.\n- Làm chủ kỹ thuật Cờ tính năng (Feature Flags) để tách biệt giữa việc đưa mã nguồn lên main (Deploy) và kích hoạt tính năng (Release).\n- Nhận biết các điều kiện tiên quyết để vận hành Trunk-Based Development thành công: kiểm thử tự động toàn diện và văn hóa review thần tốc.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Trunk\n- **Nói dễ hiểu**: Nhánh chính trung tâm (thường là main), nơi toàn bộ kỹ sư tích hợp các mẩu code nhỏ mỗi ngày.\n- **Ví dụ**: Thay vì để code trên nhánh phụ suốt 2 tuần, kỹ sư merge các phần nhỏ vào Trunk mỗi vài tiếng.\n- **Đừng nhầm**: Trunk chính là nhánh main; thuật ngữ bắt nguồn từ hình tượng thân cây trong các hệ thống VCS trước đây.\n\n### Short-Lived Branches (< 1-2 Days)\n- **Nói dễ hiểu**: Các nhánh rẽ có tuổi thọ siêu ngắn chỉ kéo dài vài giờ đến tối đa 1-2 ngày rồi hợp nhất ngay.\n- **Ví dụ**: Tạo nhánh nhỏ chỉ chứa 50 dòng code để sửa một hàm, mở PR review xong merge vào Trunk trong ngày.\n- **Đừng nhầm**: Khác với nhánh feature truyền thống kéo dài hàng tuần hoặc suốt cả kỳ sprint.\n\n### Feature Flags (Cờ tính năng)\n- **Nói dễ hiểu**: Công tắc logic trong code cho phép đưa code lên production nhưng ẩn đi, chỉ bật cho người dùng khi đã sẵn sàng.\n- **Ví dụ**: Đặt điều kiện `if (features.enableNewRanking)` để code mới chạy ngầm an toàn mà không ảnh hưởng giao diện cũ.\n- **Đừng nhầm**: Feature flag là logic điều khiển trong mã nguồn hoặc cấu hình, không phải là một nhánh của Git.\n\n---\n\n## 📖 Định nghĩa\nTrunk-Based Development là chiến lược phân nhánh trong đó toàn bộ kỹ sư liên tục hợp nhất các thay đổi nhỏ trực tiếp vào một nhánh chính duy nhất gọi là \"Trunk\" (main). Các nhánh rẽ có tuổi thọ cực ngắn, kết hợp chặt chẽ với kiểm thử tự động CI và cờ tính năng Feature Flags.\n\n---\n\n## 💡 Tại sao cần\nCác công ty công nghệ hàng đầu như Google và Meta ưa chuộng mô hình này vì nó triệt tiêu hoàn toàn \"Địa ngục hợp nhất\" (Merge Hell). Tích hợp mã nguồn nhiều lần trong ngày giúp phát hiện xung đột sớm và thúc đẩy văn hóa phản hồi tức thì.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung con sông lớn là Trunk. Thay vì đào những con kênh dài chạy song song suốt nhiều tháng rồi đục thông gây ngập lụt kinh hoàng, các kỹ sư chỉ đào những rãnh nước rất ngắn, xả nước vào dòng sông từng gáo nhỏ mỗi giờ. Dòng sông luôn cuộn chảy ổn định, không bao giờ ngập lụt.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình Trunk-Based Development với các nhánh cực ngắn:\nTrunk (main): ──●────●────●────●────●────●────●────●────● (Tích hợp liên tục nhiều lần/ngày)\n                │   ▲    │   ▲    │   ▲\n                └───┘    └───┘    └───┘\n              (Nhánh siêu ngắn < 1-2 ngày, commit nhỏ gọn)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Dũng làm thuật toán xếp hạng mới dự kiến 3 tuần. Thay vì giữ nhánh 3 tuần, Dũng dùng Feature Flag ẩn code mới. Mỗi ngày Dũng mở PR nhỏ 50 dòng gộp thẳng vào Trunk. Code lên production liên tục nhưng vẫn an toàn tuyệt đối, không lo lệch nhánh với đồng nghiệp.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch main && git pull --rebase origin main\ngit switch -c short-feat/add-rating-model\ngit push origin short-feat/add-rating-model\n```\n\n---\n\n## 🔍 Giải thích command\n- `git pull --rebase`: Đồng bộ nhánh Trunk mới nhất giữ lịch sử thẳng hàng.\n- `git switch -c short-feat/<tên-nhánh>`: Tạo nhánh cực ngắn hạn chỉ giải quyết một phần việc nhỏ trong ngày.\n- Tích hợp liên tục: Đẩy code và mở PR nhỏ gọn giúp đồng nghiệp review xong chỉ trong 15 phút.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Giữ nhánh quá lâu**: Giữ nhánh nhiều tuần biến mô hình thành Feature Branch truyền thống và tích tụ conflict lớn.\n2. **Không dùng Feature Flag**: Đưa code dở dang lên Trunk mà không che chắn khiến người dùng gặp lỗi logic.\n3. **Thiếu hệ thống CI tự động**: Không có bộ kiểm thử tự động nhanh và chuẩn sẽ dễ khiến nhánh Trunk bị vỡ.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Chia nhỏ một bài toán lớn thành 3 đầu việc nhỏ có thể hoàn thành trong 1 ngày làm việc.\n2. Tạo nhánh siêu ngắn hạn `short-feat/demo-flag` từ main.\n3. Viết mã nguồn kết hợp điều kiện if-else mô phỏng cơ chế Feature Flag bảo vệ tính năng mới.\n4. Mở PR nhỏ gọn và kiểm tra việc tích hợp nhanh chóng vào nhánh chính.\n\n---\n\n## 💡 Hint & mẹo\n> Trunk-Based Development chỉ thực sự phát huy sức mạnh khi đi đôi với bộ kiểm thử tự động vững chắc và văn hóa review code nhanh.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Hiểu rõ sự khác biệt giữa thời điểm đưa mã nguồn lên máy chủ (Deployment) và thời điểm mở tính năng cho người dùng (Release).\n- Nắm vững cách chia nhỏ công việc thành các nhánh siêu ngắn dưới 2 ngày.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây về mô hình Trunk-Based Development.\n\n---\n\n## 🚀 Thử thách nâng cao\nPhân tích cơ chế hoạt động của Feature Flags trong việc giảm thiểu rủi ro khi triển khai code liên tục vào Trunk.\n\n---\n\n## 📝 Tổng kết\n- Trunk-Based Development tập trung hợp nhất các thay đổi nhỏ vào một nhánh chính duy nhất thường xuyên.\n- Tuổi thọ của các nhánh tính năng cực ngắn, thường không vượt quá một đến hai ngày làm việc.\n- Kết hợp với Feature Flags để tách biệt việc đưa code lên hệ thống và kích hoạt tính năng cho người dùng.\n",
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
            "text": "Tuổi thọ cực kỳ ngắn hạn, thường chỉ kéo dài vài giờ đến tối đa một hoặc hai ngày",
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
        "explanation": "Nhánh siêu ngắn hạn giúp các lập trình viên tích hợp mã nguồn liên tục, loại bỏ hoàn toàn nguy cơ xung đột lớn khi sáp nhập."
      },
      {
        "id": "q2",
        "question": "Kỹ thuật nào là \"bạn đồng hành\" không thể thiếu giúp Trunk-Based Development an toàn khi code chưa hoàn thiện 100%?",
        "type": "single",
        "options": [
          {
            "text": "Feature Flags (Cờ tính năng) cho phép ẩn đoạn mã mới khỏi người dùng trên môi trường thực tế",
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
        "explanation": "Feature Flags cho phép đưa code lên production an toàn và chỉ kích hoạt khi tính năng đã hoàn thiện và sẵn sàng phục vụ khách hàng."
      },
      {
        "id": "q3",
        "question": "Tại sao các tập đoàn công nghệ khổng lồ như Google và Meta lại ưa chuộng Trunk-Based Development?",
        "type": "single",
        "options": [
          {
            "text": "Vì nó loại bỏ \"Địa ngục hợp nhất\" (Merge Hell) và thúc đẩy tốc độ tích hợp liên tục ở quy mô hàng ngàn kỹ sư",
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
        "explanation": "Ở quy mô lớn, việc duy trì các nhánh dài hạn là bất khả thi; mô hình Trunk-Based giữ cho codebase chung luôn tươi mới và được kiểm định liên tục từng phút."
      },
      {
        "id": "q4",
        "question": "Yêu cầu kỹ thuật bắt buộc phải có để một tổ chức có thể áp dụng thành công Trunk-Based Development là gì?",
        "type": "single",
        "options": [
          {
            "text": "Hệ thống CI tự động chạy kiểm thử nhanh chóng và toàn diện để bảo vệ chất lượng nhánh Trunk",
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
        "explanation": "Nếu không có CI kiểm tra tự động vững chắc, các commit liên tục vào Trunk có thể dễ dàng làm vỡ bản build và gây tê liệt cả nhóm."
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
