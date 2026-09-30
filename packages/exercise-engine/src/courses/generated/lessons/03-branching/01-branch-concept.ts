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
  "content": "# Khái niệm Branch trong Git\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất kỹ thuật nhẹ nhàng của Branch trong Git như một con trỏ di động 41 byte.\n- So sánh sự vượt trội của Git Branching so với các hệ thống quản lý phiên bản truyền thống.\n- Nắm bắt vòng đời của nhánh từ khi tạo mới, phân kỳ, tới khi hợp nhất vào nhánh chính.\n- Giải thích được cấu trúc đồ thị luồng phát triển song song trong thực tế.\n\n---\n\n## 📖 Định nghĩa\n> Branch (Nhánh) trong Git về bản chất kỹ thuật là một con trỏ có thể di chuyển (movable pointer), trỏ trực tiếp tới một commit snapshot cụ thể trong đồ thị Directed Acyclic Graph (DAG). Khác với các hệ thống VCS tập trung cũ vốn sao chép toàn bộ thư mục tệp tin rất nặng nề và chậm chạp, một nhánh trong Git chỉ là một tệp văn bản nhỏ gọn 41 byte chứa đúng chuỗi mã băm SHA-1 của commit đỉnh. Khi bạn tạo commit mới trên nhánh đó, con trỏ nhánh sẽ tự động tiến về phía trước để trỏ vào commit mới nhất.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quy trình phát triển phần mềm hiện đại, nhiều lập trình viên phải cùng nhau xây dựng các tính năng độc lập, sửa lỗi khẩn cấp hoặc thử nghiệm ý tưởng mới mà không được làm gián đoạn mã nguồn đang chạy trên môi trường production. Branch cung cấp không gian làm việc hoàn toàn cách ly: bạn có thể thoải mái sửa đổi, thử nghiệm và xóa bỏ mà không ảnh hưởng tới đồng nghiệp. Tạo nhánh trong Git chỉ mất vài phần nghìn giây, giúp bạn tự tin chia nhỏ dự án thành các luồng phát triển an toàn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung lịch sử dự án như một thân cây cổ thụ vững chắc mọc thẳng lên trời. Mỗi khi bạn muốn phát triển một tính năng mới, bạn cho thân cây mọc ra một cành cây nhỏ rẽ sang một bên. Bạn có thể trèo lên cành cây đó để hái quả, tỉa lá hoặc trang trí đèn mà không làm lung lay thân cây chính. Nếu cành cây phát triển xanh tốt và đơm hoa kết trái ngọt ngào, bạn sẽ ghép cành đó trở lại thân cây chính. Còn nếu cành cây bị sâu bệnh hỏng hóc, bạn chỉ việc cắt bỏ cành đó đi mà thân cây vẫn sừng sững an toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế con trỏ nhánh trong đồ thị commit:\nCommit C1 ◄── Commit C2 ◄── Commit C3 (main)\n                              ▲\n                              └── Commit C4 (feature-login)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty phần mềm đang vận hành trang thương mại điện tử với nhánh main chứa phiên bản ổn định cho khách hàng mua sắm. Khi được giao nhiệm vụ tích hợp cổng thanh toán mới, lập trình viên Minh tạo ngay một nhánh riêng biệt mang tên feature-payment tách ra từ main. Suốt hai tuần làm việc, Minh tạo hàng chục commit thử nghiệm trên nhánh feature-payment. Trong thời gian đó, các đồng nghiệp khác vẫn sửa lỗi giao diện và cập nhật giá sản phẩm trên nhánh main mà hai bên hoàn toàn không hề giẫm chân lên nhau.\n\n---\n\n## 💻 Command\n```bash\ngit branch\ngit branch <tên-nhánh>\ngit branch -v\ngit branch -d <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ và đánh dấu nhánh hiện tại bằng dấu sao màu xanh.\n- `git branch <tên-nhánh>`: Tạo một con trỏ nhánh mới trỏ vào commit hiện tại mà không tự động chuyển sang nhánh đó.\n- `git branch -v`: Hiển thị danh sách các nhánh kèm mã hash commit và tiêu đề commit mới nhất của từng nhánh.\n- `git branch -d <tên-nhánh>`: Xóa nhánh đã được hợp nhất an toàn khỏi kho lưu trữ cục bộ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ tạo nhánh là copy toàn bộ mã nguồn**:  Git chỉ tạo một con trỏ 41 byte, thao tác gần như tức thì và tốn cực ít dung lượng.\n2. **Code trực tiếp mọi thứ trên nhánh main**:  Thói quen nguy hiểm làm mất tính ổn định của mã nguồn đưa lên production.\n3. **Đặt tên nhánh mơ hồ**:  Đặt tên như test, abc khiến đồng nghiệp không thể biết mục đích của nhánh đó là gì.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git branch` để xem nhánh mặc định hiện tại.\n2. Tạo nhánh mới bằng lệnh `git branch feature-cart`.\n3. Chạy `git branch -v` để thấy cả hai nhánh cùng trỏ vào một commit hash.\n4. Quan sát dấu sao định vị nhánh làm việc hiện tại.\n\n---\n\n## 💡 Hint\n> Nhánh chỉ là một con trỏ nhẹ; hãy tạo nhánh tự do cho từng tính năng.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git branch` liệt kê đầy đủ nhánh vừa tạo.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và bản chất của Branch.\n\n---\n\n## 🔥 Challenge\nMở tệp `.git/refs/heads/main` bằng lệnh `cat` để tự mình nhìn thấy chuỗi hash 40 ký tự bên trong.\n\n---\n\n## 📚 Tổng kết\n- Branch trong Git là con trỏ di động trỏ vào commit đỉnh của một luồng lịch sử.\n- Tạo nhánh cực nhanh và tốn rất ít tài nguyên vì chỉ sinh ra một tệp 41 byte.\n- Luôn chia nhỏ công việc thành các nhánh tính năng để bảo vệ sự ổn định của nhánh chính.\n",
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
