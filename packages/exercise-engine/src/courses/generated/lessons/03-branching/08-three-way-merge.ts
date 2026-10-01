import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-three-way-merge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "08-three-way-merge",
    "title": "Hợp nhất khi hai nhánh đã phân kỳ (3-way merge)",
    "level": "intermediate",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "07-fast-forward-merge"
    ],
    "objectives": [
      "Giải thích vai trò của tổ tiên chung, nhánh hiện tại và nhánh nguồn.",
      "Nhận biết khi hai nhánh có commit riêng thì cần hợp nhất ba chiều.",
      "Tạo merge commit và xác nhận thay đổi của cả hai nhánh được giữ lại."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "three-way-merge"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "3-way merge",
      "merge commit",
      "common ancestor",
      "hop nhat ba chieu",
      "phan ky"
    ],
    "commands": [
      "git switch main",
      "git merge <tên-nhánh-tính-năng>",
      "git status",
      "git log --oneline"
    ]
  },
  "content": "# Hợp nhất khi hai nhánh đã phân kỳ (3-way merge)\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Giải thích vai trò của tổ tiên chung, nhánh hiện tại và nhánh nguồn.\r\n- Nhận biết khi hai nhánh có commit riêng thì cần hợp nhất ba chiều.\r\n- Tạo merge commit và xác nhận thay đổi của cả hai nhánh được giữ lại.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### 3-way merge — hợp nhất ba chiều\r\n- **Nói dễ hiểu:** Git so sánh mốc chung với hai phiên bản nhánh để kết hợp thay đổi.\r\n- **Ví dụ:** `main` sửa `about.html`, `feature` thêm `contact.html`.\r\n- **Đừng nhầm:** 3-way merge không đồng nghĩa với conflict.\r\n\r\n### Common ancestor — tổ tiên chung\r\n- **Nói dễ hiểu:** Mốc commit gần nhất mà hai nhánh cùng có trước khi tách.\r\n- **Ví dụ:** Hai nhánh đều xuất phát từ Commit C2.\r\n- **Đừng nhầm:** Git tự tìm mốc này; thường bạn không phải tự chọn.\r\n\r\n### Merge commit — commit hợp nhất\r\n- **Nói dễ hiểu:** Commit nối lịch sử của hai nhánh và có hai commit cha.\r\n- **Ví dụ:** Git tạo mốc mới sau khi kết hợp `main` và `feature-contact`.\r\n- **Đừng nhầm:** Fast-forward không cần tạo merge commit.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nKhi nhánh hiện tại và nhánh nguồn đều có commit riêng sau tổ tiên chung, Git không thể chỉ tua con trỏ. Git so sánh ba trạng thái: tổ tiên chung, nhánh hiện tại và nhánh nguồn. Nếu các thay đổi có thể kết hợp, Git tạo một merge commit có hai commit cha. Nếu cùng một phần nội dung bị sửa theo cách không tương thích, sẽ có conflict; cách xử lý học ở bài sau.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nTrong nhóm, `main` có thể tiếp tục nhận thay đổi trong lúc bạn làm tính năng. 3-way merge giúp Git kết hợp công việc của hai nhánh thay vì bỏ một bên. Biết ba mốc so sánh giúp bạn hiểu vì sao Git tự gộp được hai tệp khác nhau nhưng có thể cần bạn giải quyết khi sửa cùng một dòng.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy tưởng tượng hai người cùng sửa một tài liệu từ một bản gốc. Người thứ nhất thêm mục giới thiệu; người thứ hai thêm mục liên hệ. Khi đối chiếu bản gốc với hai bản mới, có thể ghép cả hai phần mà không phải chọn bỏ nội dung của ai.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\n                  C3  main (Ours)\n                 /   \\\nBase C2 ────────       M5  main sau merge\n                 \\   /\n                  C4  feature (Theirs)\n\nM5 có hai commit cha: C3 và C4.\n```\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nHuy tạo `feature-contact` từ `main` và thêm `contact.html`. Trong lúc đó, Mai tạo một commit trên `main` để sửa `about.html`. Khi đứng trên `main` và merge `feature-contact`, Git so sánh mốc chung cùng hai nhánh. Vì thay đổi nằm ở hai tệp khác nhau, Git có thể giữ cả hai và tạo merge commit.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit switch main\r\ngit merge feature-contact\r\ngit status\r\ngit log --oneline\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git switch main`: Chuyển sang nhánh sẽ nhận thay đổi.\r\n- `git merge feature-contact`: Kết hợp lịch sử nhánh nguồn vào nhánh hiện tại.\r\n- `git status`: Kiểm tra kết quả và xác nhận không còn thao tác dở.\r\n- `git log --oneline`: Xem lời nhắn của merge commit trong lịch sử hiện tại.\r\n- Simulator tự hoàn tất merge commit và dùng lời nhắn mặc định; trong terminal Git thật, editor có thể mở tùy cấu hình.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Tưởng 3-way merge luôn gây conflict:** Thay đổi độc lập thường được kết hợp tự động.\r\n2. **Đứng trên nhánh nguồn thay vì nhánh nhận:** `git merge` cập nhật nhánh hiện tại.\r\n3. **Cho rằng merge thành công nghĩa ứng dụng chắc chắn chạy đúng:** Chạy kiểm thử hoặc mở ứng dụng sau khi hợp nhất.\r\n\r\n---\r\n\r\n## 🧪 Lab\nYêu cầu: repository có ít nhất một commit và thư mục làm việc sạch. Nếu chưa có commit, hoàn thành bài tạo commit ở Level 2 trước.\n1. Chạy `git switch main` rồi `git switch -c feature-contact`.\n2. Tạo `contact.html`, thêm nội dung, rồi chạy `git add contact.html` và `git commit -m \"feat: add contact page\"`.\r\n3. Chạy `git switch main`.\r\n4. Tạo `about.html`, thêm nội dung, rồi chạy `git add about.html` và `git commit -m \"docs: add about page\"`.\r\n5. Chạy `git merge feature-contact`.\r\n6. Kiểm tra `git status`, rồi dùng `git log --oneline` để thấy merge commit.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Nếu mỗi nhánh sửa một tệp khác nhau, Git thường có thể gộp tự động.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- `about.html` và `contact.html` đều còn trên `main` sau merge.\r\n- `git log --oneline` có một merge commit mới.\r\n- `git status` không báo merge đang dở.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời các câu hỏi để kiểm tra ba mốc Git dùng khi hợp nhất lịch sử đã phân kỳ.\r\n\r\n---\r\n\r\n## 🔥 Challenge\nDựa vào sơ đồ và kết quả `git show HEAD`, chỉ ra commit nào là tổ tiên chung, nhánh hiện tại, nhánh nguồn và merge commit. Nêu hai commit cha của merge commit.\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- 3-way merge so sánh tổ tiên chung với hai nhánh.\r\n- Khi thay đổi kết hợp được, Git tạo merge commit có hai commit cha.\r\n- Thay đổi cùng dòng có thể cần giải quyết conflict ở bài tiếp theo.\r\n",
  "quiz": {
    "id": "quiz-03-08-three-way-merge",
    "title": "Trắc nghiệm: Hợp nhất ba chiều",
    "questions": [
      {
        "id": "q1",
        "question": "Khi hai nhánh đã có commit riêng, Git dựa vào những phiên bản nào để hợp nhất?",
        "type": "single",
        "options": [
          {
            "text": "Tổ tiên chung, phiên bản của nhánh hiện tại và phiên bản của nhánh được gộp",
            "correct": true
          },
          {
            "text": "Ba commit mới nhất bất kỳ trong repository",
            "correct": false
          },
          {
            "text": "Chỉ phiên bản mới nhất của nhánh hiện tại",
            "correct": false
          },
          {
            "text": "Chỉ phiên bản đầu tiên được tạo bằng git init",
            "correct": false
          }
        ],
        "explanation": "Git so sánh Base, Ours và Theirs để biết mỗi nhánh đã thay đổi gì kể từ mốc chung."
      },
      {
        "id": "q2",
        "question": "Tổ tiên chung là gì trong tình huống hai nhánh phân kỳ?",
        "type": "single",
        "options": [
          {
            "text": "Commit gần nhất mà lịch sử của cả hai nhánh cùng có trước khi tách",
            "correct": true
          },
          {
            "text": "Commit mới nhất trên nhánh được gộp",
            "correct": false
          },
          {
            "text": "Tên gọi khác của nhánh main",
            "correct": false
          },
          {
            "text": "Một tệp tạm do người dùng phải tự tạo",
            "correct": false
          }
        ],
        "explanation": "Git dùng tổ tiên chung làm mốc để so sánh hai luồng thay đổi sau khi chúng tách ra."
      },
      {
        "id": "q3",
        "question": "Một nhánh sửa `about.html`, nhánh kia thêm `contact.html`. Thường điều gì xảy ra khi merge?",
        "type": "single",
        "options": [
          {
            "text": "Git có thể kết hợp tự động vì hai thay đổi nằm ở các tệp khác nhau",
            "correct": true
          },
          {
            "text": "Git luôn báo conflict khi có hai nhánh",
            "correct": false
          },
          {
            "text": "Git xóa một tệp để chỉ giữ lại một nhánh",
            "correct": false
          },
          {
            "text": "Git tự tạo thêm một nhánh thứ ba",
            "correct": false
          }
        ],
        "explanation": "Thay đổi độc lập ở các tệp khác nhau thường có thể kết hợp tự động, dù vẫn cần kiểm tra kết quả."
      },
      {
        "id": "q4",
        "question": "Git tạo merge commit có ý nghĩa gì sau khi hai nhánh phân kỳ?",
        "type": "single",
        "options": [
          {
            "text": "Ghi trạng thái kết quả và nối hai lịch sử bằng hai commit cha",
            "correct": true
          },
          {
            "text": "Xóa tổ tiên chung khỏi lịch sử",
            "correct": false
          },
          {
            "text": "Chứng minh rằng toàn bộ kiểm thử của ứng dụng đã thành công",
            "correct": false
          },
          {
            "text": "Đổi tên nhánh được gộp",
            "correct": false
          }
        ],
        "explanation": "Merge commit nối đầu hai nhánh; việc kiểm thử vẫn cần được thực hiện riêng."
      },
      {
        "id": "q5",
        "question": "Trong lệnh `git merge feature-contact`, nếu bạn đang đứng trên `main`, nhánh nào nhận kết quả?",
        "type": "single",
        "options": [
          {
            "text": "`main`, vì merge cập nhật nhánh hiện tại",
            "correct": true
          },
          {
            "text": "`feature-contact`, vì tên nhánh đứng sau lệnh",
            "correct": false
          },
          {
            "text": "Cả hai nhánh đều tự di chuyển đến cùng một commit",
            "correct": false
          },
          {
            "text": "Không nhánh nào; lệnh chỉ xem lịch sử",
            "correct": false
          }
        ],
        "explanation": "Lệnh merge đưa thay đổi của nhánh nguồn vào nhánh hiện tại, nên cần kiểm tra mình đang đứng đúng nhánh."
      },
      {
        "id": "q6",
        "question": "Hai nhánh cùng sửa một đoạn nội dung theo cách không thể kết hợp tự động. Git thường làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạm dừng merge và yêu cầu người dùng giải quyết conflict",
            "correct": true
          },
          {
            "text": "Tự chọn ngẫu nhiên nội dung của một bên",
            "correct": false
          },
          {
            "text": "Xóa cả hai nhánh",
            "correct": false
          },
          {
            "text": "Tạo merge commit và bỏ qua phần nội dung mâu thuẫn",
            "correct": false
          }
        ],
        "explanation": "Khi không thể xác định cách kết hợp an toàn, Git dừng để người dùng chọn nội dung phù hợp."
      }
    ]
  }
};
export default lesson;
