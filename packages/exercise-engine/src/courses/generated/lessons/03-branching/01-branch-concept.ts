import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-branch-concept",
  "moduleId": "03-branching",
  "metadata": {
    "id": "01-branch-concept",
    "title": "Khái niệm Branch trong Git",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "06-git-commit"
    ],
    "objectives": [
      "Hiểu rõ bản chất kỹ thuật nhẹ nhàng của Branch trong Git như một con trỏ di động 41 byte.",
      "So sánh sự vượt trội của Git Branching so với các hệ thống quản lý phiên bản truyền thống.",
      "Nắm bắt vòng đời của nhánh từ khi tạo mới, phân kỳ, tới khi hợp nhất vào nhánh chính.",
      "Giải thích được cấu trúc đồ thị luồng phát triển song song trong thực tế."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "create-branch"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch",
      "nhanh git",
      "con tro commit",
      "dag",
      "phan nhanh"
    ],
    "commands": [
      "git branch",
      "git branch <tên-nhánh>",
      "git branch -v",
      "git branch -d <tên-nhánh>"
    ]
  },
  "content": "# Khái niệm Branch trong Git\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích được Branch là một con trỏ có tên, trỏ tới một commit cụ thể.\n- Nhận ra lợi ích của việc tạo nhánh riêng để thử nghiệm thay vì sửa trực tiếp trên `main`.\n- Dùng lệnh `git branch` để xem danh sách nhánh và nhận biết nhánh đang làm việc.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Branch — nhánh làm việc\n- **Nói dễ hiểu:** Một con trỏ có tên trỏ trực tiếp tới một commit cụ thể trong lịch sử dự án.\n- **Ví dụ:** Tạo nhánh `feature-cart` để viết trang giỏ hàng mà không ảnh hưởng mã nguồn đang chạy.\n- **Đừng nhầm:** Nhánh trong Git không phải là một bản sao chép toàn bộ thư mục dự án sang chỗ khác.\n\n### main — nhánh chính mặc định\n- **Nói dễ hiểu:** Nhánh chứa mã nguồn ổn định nhất của dự án, dùng làm mốc chuẩn cho cả nhóm.\n- **Ví dụ:** Sản phẩm đang chạy cho khách hàng sử dụng được lấy từ commit trên nhánh `main`.\n- **Đừng nhầm:** `main` không có đặc quyền kỹ thuật khác biệt; đây là quy ước chuẩn để mọi người cùng thống nhất.\n\n### Pointer — con trỏ di động\n- **Nói dễ hiểu:** Một nhãn lưu vị trí commit; khi có commit mới trên nhánh đó, nhãn tự trượt lên commit mới.\n- **Ví dụ:** Khi bạn commit thêm ảnh đại diện, nhánh `feature-avatar` tự trỏ vào commit ảnh vừa tạo.\n- **Đừng nhầm:** Bạn không cần đổi vị trí nhánh thủ công sau mỗi lần commit; Git tự động cập nhật.\n\n---\n\n## 📖 Định nghĩa\nBranch (nhánh) trong Git là một con trỏ có thể di chuyển, trỏ vào một commit snapshot cụ thể. Khi bạn tạo commit mới trên nhánh, con trỏ đó tự động tiến lên phía trước để luôn giữ vị trí commit mới nhất.\n\n---\n\n## 🤔 Tại sao cần?\nKhi làm việc nhóm hoặc thử nghiệm ý tưởng mới, bạn không nên sửa trực tiếp trên mã nguồn đang chạy ổn định. Nhánh cho phép bạn tạo một không gian riêng: bạn thoải mái sửa, commit thử và xóa bỏ nếu không đạt, mà không làm hỏng công việc của đồng đội trên nhánh chính.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung lịch sử dự án như một thân cây. Nhánh `main` là thân chính vững chắc. Khi muốn làm tính năng mới, bạn tạo một nhánh con rẽ ra. Bạn làm việc trên nhánh con đó. Nếu tính năng chạy tốt, bạn ghép nhánh vào thân chính. Nếu tính năng thử nghiệm thất bại, bạn cắt bỏ nhánh con mà thân cây vẫn an toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCommit C1 ───> Commit C2 ───> Commit C3 (main)\n                                ▲\n                                └─── Commit C4 (feature-login)\n```\nNhánh `feature-login` tách ra từ commit C3 để phát triển riêng, trong khi nhánh `main` vẫn giữ nguyên mốc ổn định.\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhóm sinh viên đang làm web trường. Nhánh `main` chứa bản nộp bài giữa kỳ đang chạy. Bạn An được giao làm tính năng chat trực tuyến; An tạo nhánh `feature-chat` từ `main`. Trong khi An viết code chat suốt 3 ngày, bạn Bình vẫn có thể sửa lỗi chính tả trên `main` mà không bị lẫn code chat chưa hoàn thiện của An.\n\n---\n\n## 💻 Command\n```bash\ngit branch\ngit branch <tên-nhánh>\ngit branch -v\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch`: Liệt kê tất cả các nhánh trong kho lưu trữ của bạn. Nhánh bạn đang đứng được đánh dấu bằng dấu sao `*`.\n- `git branch <tên-nhánh>`: Tạo một con trỏ nhánh mới trỏ vào commit hiện tại nhưng chưa chuyển sang nhánh đó.\n- `git branch -v`: Liệt kê danh sách nhánh kèm mã commit ngắn và thông điệp commit mới nhất của từng nhánh.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ tạo nhánh là nhân đôi toàn bộ thư mục:** Git chỉ tạo một con trỏ nhẹ, diễn ra gần như tức thì và tốn rất ít dung lượng.\n2. **Sửa mọi thứ trực tiếp trên main:** Thói quen này dễ khiến mã nguồn chính bị lỗi khi bạn đang code dở.\n3. **Đặt tên nhánh chung chung như `test` hoặc `fix`:** Tên nhánh nên thể hiện rõ nội dung công việc như `feature-cart` hoặc `fix-login-button`.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Chạy lệnh `git branch` để kiểm tra danh sách nhánh hiện có và xác định nhánh đang đứng (có dấu `*`).\n2. Tạo nhánh mới cho tính năng giỏ hàng bằng lệnh `git branch feature-cart`.\n3. Chạy `git branch` lần nữa để xác nhận nhánh `feature-cart` đã xuất hiện trong danh sách.\n\n---\n\n## 💡 Hint\nLệnh `git branch <tên-nhánh>` chỉ tạo con trỏ nhánh mới chứ chưa tự động chuyển bạn sang nhánh đó.\n\n---\n\n## ✅ Validation\n- Danh sách `git branch` hiển thị cả `main` và nhánh mới `feature-cart`.\n- Nhánh `main` vẫn có dấu `*` ở phía trước.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để kiểm tra mức độ hiểu về bản chất con trỏ nhánh trong Git.\n\n---\n\n## 🔥 Challenge\nChạy lệnh `git branch -v` để so sánh mã commit của nhánh vừa tạo với nhánh `main`. Nhận xét xem hai nhánh có đang trỏ vào cùng một commit hay không.\n\n---\n\n## 📚 Tổng kết\n- Branch là một con trỏ có tên, trỏ vào commit đỉnh của một luồng công việc.\n- Tạo nhánh giúp tách biệt công việc thử nghiệm khỏi mã nguồn ổn định trên nhánh chính.\n- Lệnh `git branch` dùng để xem danh sách nhánh và tạo nhánh mới an toàn.\n",
  "quiz": {
    "id": "quiz-03-01-branch-concept",
    "title": "Trắc nghiệm: Bản chất của Branch trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Về mặt bản chất kỹ thuật lưu trữ bên trong Git, một Branch thực chất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Một con trỏ di động 41 byte trỏ trực tiếp vào một commit snapshot cụ thể",
            "correct": true
          },
          {
            "text": "Một bản sao chép đầy đủ toàn bộ thư mục mã nguồn sang ổ đĩa khác",
            "correct": false
          },
          {
            "text": "Một tệp tin nén zip chứa lịch sử của tháng trước",
            "correct": false
          },
          {
            "text": "Một tài khoản người dùng độc lập trên máy chủ GitHub",
            "correct": false
          }
        ],
        "explanation": "Git Branch chỉ là một con trỏ lưu trong tệp văn bản 41 byte tại .git/refs/heads/<tên-nhánh>."
      },
      {
        "id": "q2",
        "question": "Lệnh nào dưới đây chỉ tạo một nhánh mới mà KHÔNG chuyển sang nhánh đó ngay lập tức?",
        "type": "single",
        "options": [
          {
            "text": "git branch <tên-nhánh>",
            "correct": true
          },
          {
            "text": "git switch -c <tên-nhánh>",
            "correct": false
          },
          {
            "text": "git checkout -b <tên-nhánh>",
            "correct": false
          },
          {
            "text": "git jump <tên-nhánh>",
            "correct": false
          }
        ],
        "explanation": "`git branch <name>` tạo con trỏ nhánh mới; để vừa tạo vừa chuyển sang nhánh mới phải dùng `switch -c` hoặc `checkout -b`."
      },
      {
        "id": "q3",
        "question": "Tại sao việc tạo nhánh trong Git lại nhanh hơn gấp nhiều lần so với các hệ thống VCS tập trung như SVN?",
        "type": "single",
        "options": [
          {
            "text": "Vì Git chỉ ghi 40 ký tự hash vào một tệp nhỏ thay vì sao chép toàn bộ cây mã nguồn",
            "correct": true
          },
          {
            "text": "Vì Git sử dụng trí tuệ nhân tạo để đoán trước tương lai của dự án",
            "correct": false
          },
          {
            "text": "Vì Git bắt buộc máy tính phải có card đồ họa chuyên dụng cao cấp",
            "correct": false
          },
          {
            "text": "Vì Git bỏ qua hoàn toàn các bài kiểm tra an toàn dữ liệu",
            "correct": false
          }
        ],
        "explanation": "Tạo branch trong Git chỉ mất thao tác ghi 41 byte vào đĩa, bất kể dự án nặng hàng gigabyte."
      },
      {
        "id": "q4",
        "question": "Ký tự nào đứng trước tên nhánh trong kết quả lệnh `git branch` để chỉ ra nhánh hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "Dấu sao (*)",
            "correct": true
          },
          {
            "text": "Dấu thăng (#)",
            "correct": false
          },
          {
            "text": "Dấu chấm than (!)",
            "correct": false
          },
          {
            "text": "Dấu ngã (~)",
            "correct": false
          }
        ],
        "explanation": "Dấu sao `*` màu xanh lục đánh dấu nhánh mà con trỏ HEAD đang gắn vào."
      },
      {
        "id": "q5",
        "question": "Tên quy ước chuẩn quốc tế phổ biến cho nhánh chứa mã nguồn sẵn sàng đưa vào vận hành thực tế là gì?",
        "type": "single",
        "options": [
          {
            "text": "main (hoặc master trong các dự án cũ)",
            "correct": true
          },
          {
            "text": "draft-temp",
            "correct": false
          },
          {
            "text": "scratchpad",
            "correct": false
          },
          {
            "text": "junk-box",
            "correct": false
          }
        ],
        "explanation": "`main` là tên nhánh chính mặc định hiện đại theo chuẩn quốc tế của Git và GitHub."
      },
      {
        "id": "q6",
        "question": "Khi bạn tạo một commit mới trên nhánh hiện tại, điều gì sẽ xảy ra với con trỏ của nhánh đó?",
        "type": "single",
        "options": [
          {
            "text": "Con trỏ nhánh tự động di chuyển tiến lên chỉ vào commit snapshot mới vừa tạo",
            "correct": true
          },
          {
            "text": "Con trỏ nhánh đứng yên ở vị trí commit ban đầu",
            "correct": false
          },
          {
            "text": "Con trỏ nhánh bị xóa bỏ và bạn phải gõ lệnh tạo lại",
            "correct": false
          },
          {
            "text": "Con trỏ nhánh sẽ nhảy lùi về commit đầu tiên của dự án",
            "correct": false
          }
        ],
        "explanation": "Mỗi khi commit sinh ra, con trỏ nhánh hiện tại tự động cập nhật mã hash của commit mới đó."
      }
    ]
  }
};
export default lesson;
