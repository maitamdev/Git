import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-checkout",
  "moduleId": "03-branching",
  "metadata": {
    "id": "05-git-checkout",
    "title": "Lệnh git checkout và lịch sử",
    "level": "intermediate",
    "duration": 20,
    "xp": 70,
    "prerequisites": [
      "04-git-switch"
    ],
    "objectives": [
      "Hiểu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.",
      "Phân biệt rõ ràng các trường hợp sử dụng của `git checkout`: chuyển nhánh, xem commit cũ, và hoàn tác tệp.",
      "Nắm bắt lý do chuyển dịch sang bộ đôi lệnh hiện đại `git switch` và `git restore`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git checkout",
      "lich su git",
      "switch vs checkout",
      "da nang",
      "legacy command"
    ],
    "commands": [
      "git checkout <tên-nhánh>",
      "git checkout -b <tên-nhánh-mới>",
      "git checkout <commit-hash>",
      "git checkout -- <tên-tệp>"
    ]
  },
  "content": "# Lệnh git checkout và lịch sử\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.\n- Phân biệt rõ ràng các trường hợp sử dụng của `git checkout`: chuyển nhánh, xem commit cũ, và hoàn tác tệp.\n- Nắm bắt lý do chuyển dịch sang bộ đôi lệnh hiện đại `git switch` và `git restore`.\n\n---\n\n## 📖 Định nghĩa\n> `git checkout` là một trong những câu lệnh lâu đời, nổi tiếng và đa năng bậc nhất trong lịch sử phát triển của Git. Trước phiên bản 2.23, `git checkout` đảm nhận đồng thời hai nhiệm vụ hoàn toàn khác nhau: thao tác trên nhánh/commit (chuyển nhánh, tạo nhánh mới, vào Detached HEAD) và thao tác trên tệp tin (hoàn tác tệp đã sửa, phục hồi tệp từ một commit cụ thể). Dù hiện nay các lệnh chuyên trách đã ra đời, `git checkout` vẫn xuất hiện rất nhiều trong các tài liệu và dự án cũ.\n\n---\n\n## 🤔 Tại sao cần?\nKhi tham gia vào các dự án phần mềm thực tế hoặc tìm kiếm câu trả lời trên Stack Overflow, bạn sẽ bắt gặp hàng ngàn ví dụ và hướng dẫn sử dụng lệnh `git checkout`. Hiểu rõ cú pháp và hành vi của lệnh này giúp bạn dễ dàng đọc hiểu các tài liệu kỹ thuật cũ, cấu hình các script CI/CD tự động hóa có sẵn, đồng thời trân trọng hơn sự ra đời của các lệnh hiện đại như `git switch` và `git restore`.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git checkout` giống như một chiếc dao đa năng Thụy Sĩ cổ điển tích hợp hàng chục lưỡi dao, tua-vít và kéo cắt trên cùng một thân dao nhỏ. Chiếc dao này làm được mọi việc nhưng khi bạn muốn cắt một mẩu giấy nhỏ, bạn rất dễ vô ý mở nhầm lưỡi cưa sắc nhọn và làm đứt tay. Bộ đôi lệnh mới `git switch` và `git restore` giống như hai dụng cụ chuyên dụng riêng biệt: một chiếc kéo cắt giấy chuyên nghiệp và một chiếc tua-vít chuẩn mực.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSự phân tách nhiệm vụ của git checkout:\n                  ┌──► Thao tác trên Branch/Commit ──► [git switch]\n[git checkout] ──┤\n                  └──► Thao tác trên Tệp tin (File) ──► [git restore]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư mới vào công ty đọc tài liệu hướng dẫn triển khai hệ thống viết từ năm 2018. Trong tài liệu có dòng lệnh: `git checkout -b release-v1.0`. Kỹ sư lập tức nhận ra đây chính là thao tác tạo và chuyển sang nhánh mới, hoàn toàn tương đương với lệnh hiện đại `git switch -c release-v1.0` mà mình đã được học trong các khóa đào tạo chuẩn hóa. Nhờ hiểu sâu sắc cả hai thế hệ câu lệnh, kỹ sư tự tin thực thi hướng dẫn mà không gặp bất kỳ trở ngại nào. Kỹ sư còn giải thích lại cho các bạn thực tập sinh khác trong nhóm hiểu lý do tại sao tài liệu cũ lại dùng checkout và khi nào thì nên chuyển đổi sang các lệnh chuyên biệt.\n\n---\n\n## 💻 Command\n```bash\ngit checkout <tên-nhánh>\ngit checkout -b <tên-nhánh-mới>\ngit checkout <commit-hash>\ngit checkout -- <tên-tệp>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git checkout <tên-nhánh>`: Chuyển sang một nhánh khác (tương đương `git switch <tên-nhánh>`).\n- `git checkout -b <tên-nhánh-mới>`: Vừa tạo vừa chuyển sang nhánh mới (tương đương `git switch -c <tên-nhánh-mới>`).\n- `git checkout <commit-hash>`: Đưa con trỏ HEAD về commit trong quá khứ ở trạng thái Detached HEAD.\n- `git checkout -- <tên-tệp>`: Hủy bỏ các thay đổi dở dang trên tệp trong Working Tree (tương đương `git restore <tên-tệp>`).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên dấu hai gạch ngang `--` khi checkout file**:  Nếu có một nhánh trùng tên với tên tệp tin, Git sẽ ưu tiên chuyển nhánh thay vì phục hồi tệp.\n2. **Sử dụng lệnh checkout cho người mới học**:  Dễ gây hoang mang và nhầm lẫn khái niệm giữa thao tác nhánh và thao tác tệp.\n3. **Nhầm lẫn giữa việc hủy bỏ thay đổi tệp và chuyển nhánh**:  Có thể vô tình làm mất dữ liệu tệp tin khi gõ thiếu tham số.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git checkout -b legacy-demo` để tạo và chuyển nhánh theo cách truyền thống.\n2. Chạy `git checkout main` để quay trở về nhánh chính.\n3. Xóa nhánh thử nghiệm bằng `git branch -d legacy-demo`.\n\n---\n\n## 💡 Hint\n> Trong các dự án mới, hãy ưu tiên dùng `git switch` và `git restore`.\n\n---\n\n## ✅ Validation\n- Nắm vững sự tương đồng giữa các cú pháp cũ và mới.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về lệnh truyền thống git checkout.\n\n---\n\n## 🔥 Challenge\nGiải thích vì sao cú pháp `git checkout -- <file>` bắt buộc phải có dấu `--` khi tên tệp trùng với tên một nhánh.\n\n---\n\n## 📚 Tổng kết\n- `git checkout` là lệnh truyền thống đa năng cho cả nhánh và tệp tin.\n- `git checkout -b` tương đương với lệnh hiện đại `git switch -c`.\n- Hiện nay khuyến nghị sử dụng `git switch` và `git restore` để tăng tính rõ nghĩa và an toàn.\n",
  "quiz": {
    "id": "quiz-03-05-git-checkout",
    "title": "Trắc nghiệm: Lệnh truyền thống git checkout",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh truyền thống `git checkout -b feature` tương đương với lệnh hiện đại nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "git switch -c feature",
            "correct": true
          },
          {
            "text": "git restore --branch feature",
            "correct": false
          },
          {
            "text": "git branch --create-jump feature",
            "correct": false
          },
          {
            "text": "git commit -b feature",
            "correct": false
          }
        ],
        "explanation": "Lệnh truyền thống `git checkout -b <name>` thực hiện chính xác hành động vừa tạo nhánh mới vừa chuyển nhánh tương đương hoàn toàn với `git switch -c <name>` hiện đại."
      },
      {
        "id": "q2",
        "question": "Lệnh `git checkout -- index.html` thực hiện thao tác gì trên dự án?",
        "type": "single",
        "options": [
          {
            "text": "Hủy bỏ các sửa đổi chưa staged trong tệp index.html (tương đương git restore index.html)",
            "correct": true
          },
          {
            "text": "Tạo một nhánh mới có tên là index.html",
            "correct": false
          },
          {
            "text": "Đẩy tệp index.html lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Biên dịch tệp index.html thành ứng dụng di động",
            "correct": false
          }
        ],
        "explanation": "`git checkout -- <file>` là cú pháp cũ dùng để hủy bỏ sửa đổi trên tệp trong Working Tree."
      },
      {
        "id": "q3",
        "question": "Dấu hai gạch ngang `--` trong lệnh `git checkout -- <file>` đóng vai trò gì?",
        "type": "single",
        "options": [
          {
            "text": "Phân tách rõ ràng giữa danh sách tùy chọn/nhánh và danh sách đường dẫn tệp tin để tránh trùng lặp tên",
            "correct": true
          },
          {
            "text": "Là cú pháp bắt buộc của ngôn ngữ lập trình C++",
            "correct": false
          },
          {
            "text": "Tự động kích hoạt tính năng nén tệp tin tốc độ cao",
            "correct": false
          },
          {
            "text": "Tự động kiểm tra lỗi chính tả trong mã nguồn",
            "correct": false
          }
        ],
        "explanation": "Dấu `--` báo cho Git biết mọi đối số phía sau chắc chắn là đường dẫn tệp tin, không phải tên nhánh."
      },
      {
        "id": "q4",
        "question": "Lời khuyên tốt nhất dành cho các kỹ sư phần mềm khi viết mã nguồn và dự án mới hiện nay là gì?",
        "type": "single",
        "options": [
          {
            "text": "Sử dụng git switch cho nhánh và git restore cho tệp tin để mã lệnh an toàn và rõ nghĩa",
            "correct": true
          },
          {
            "text": "Chỉ được dùng git checkout và cấm dùng git switch",
            "correct": false
          },
          {
            "text": "Không được tạo bất kỳ nhánh nào trong suốt vòng đời dự án",
            "correct": false
          },
          {
            "text": "Chỉ commit code vào ngày cuối cùng của tháng",
            "correct": false
          }
        ],
        "explanation": "Các lệnh mới chuyên biệt giúp quy trình rõ ràng và loại bỏ hoàn toàn các lỗi thao tác nhầm lẫn."
      }
    ]
  }
};
export default lesson;
