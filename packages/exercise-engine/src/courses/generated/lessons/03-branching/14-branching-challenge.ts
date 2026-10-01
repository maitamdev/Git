import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-branching-challenge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "14-branching-challenge",
    "title": "Thử thách tổng hợp Branching Master",
    "level": "intermediate",
    "duration": 40,
    "xp": 150,
    "prerequisites": [
      "11-resolve-conflict"
    ],
    "objectives": [
      "Áp dụng tổng hợp toàn bộ kỹ năng Level 3 vào một kịch bản phát triển phần mềm đa nhánh thực chiến.",
      "Thực hiện tạo nhánh tính năng, chuyển nhánh, tạo commit độc lập, và phát hiện xung đột.",
      "Giải quyết thành công xung đột Merge Conflict và tạo Merge Commit chuẩn hóa.",
      "Dọn dẹp hệ thống nhánh sạch sẽ sau khi hoàn thành nhiệm vụ."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "branching-challenge"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "challenge",
      "branching master",
      "tong hop",
      "conflict resolution",
      "workflow"
    ],
    "commands": [
      "git switch -c feature-challenge",
      "git merge main",
      "git status",
      "git add <resolved-file>",
      "git commit",
      "git branch -d feature-challenge"
    ]
  },
  "content": "# Thử thách tổng hợp Branching Master\n\n---\n\n## 🎯 Mục tiêu\n- Áp dụng tổng hợp toàn bộ kỹ năng của Level 3 vào một tình huống phát triển phần mềm đa nhánh.\n- Thực hiện quy trình chuẩn: tách nhánh tính năng, chuyển nhánh, commit độc lập và xử lý xung đột.\n- Giải quyết thành công xung đột Merge Conflict và dọn dẹp nhánh sau khi hoàn thành.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Feature Branch Workflow — quy trình nhánh tính năng\n- **Nói dễ hiểu:** Quy trình chuẩn: tách nhánh làm việc riêng, kiểm thử xong mới gộp vào nhánh chính và xóa nhánh con.\n- **Ví dụ:** Tạo nhánh `feature-cart`, viết code trong 2 ngày, merge vào `main` rồi xóa nhánh `feature-cart`.\n- **Đừng nhầm:** Không bao giờ viết code tính năng mới trực tiếp trên nhánh `main` dùng chung của cả nhóm.\n\n### Merge Conflict Resolution — giải quyết trọn vẹn xung đột\n- **Nói dễ hiểu:** Khả năng đọc hiểu cả hai đoạn code mâu thuẫn, chọn lọc giải pháp tối ưu và đưa mã nguồn về trạng thái chạy tốt.\n- **Ví dụ:** Giữ lại cả chính sách giá vé cuối tuần và giảm giá cho học sinh trong tệp bán vé mà không để sót vạch đánh dấu.\n- **Đừng nhầm:** Giải quyết xung đột không phải là xóa bừa code của ai đó; đó là sự tích hợp có trách nhiệm.\n\n### Branch Cleanup — dọn dẹp nhánh sau khi hoàn thành\n- **Nói dễ hiểu:** Thao tác xóa các nhánh con sau khi đã gộp xong vào nhánh chính để giữ danh sách nhánh luôn ngắn gọn.\n- **Ví dụ:** Chạy `git branch -d feature-cart` để kết thúc trọn vẹn một chu kỳ phát triển tính năng.\n- **Đừng nhầm:** Xóa nhánh không làm mất commit hay lịch sử vì toàn bộ code đã nằm an toàn trong nhánh chính.\n\n---\n\n## 📖 Định nghĩa\nThử thách tổng hợp Branching Master là bài thực hành toàn diện của Level 3, mô phỏng quy trình làm việc nhóm thực tế: bạn sẽ tạo nhánh tính năng, thực hiện gộp nhánh với lịch sử phân kỳ, tự tay xử lý xung đột phát sinh và hoàn tất việc dọn dẹp kho lưu trữ.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu lý thuyết về nhánh và gộp nhánh mới chỉ là một nửa chặng đường. Khả năng bình tĩnh xử lý các tình huống xung đột code và hoàn tất quy trình hợp nhất trong thực tế mới là thước đo năng lực thật sự của một lập trình viên khi làm việc trong các công ty phần mềm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung thử thách này giống như bài thi sát hạch lái xe sa hình. Bạn đã học lý thuyết về vô lăng, chân ga và chân phanh (`branch`, `switch`, `merge`). Giờ là lúc bạn trực tiếp ngồi vào ghế lái, điều khiển xe vượt qua đoạn đường phân kỳ và xử lý chướng ngại vật xung đột để đưa chiếc xe về đích an toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nKịch bản thử thách tổng hợp Level 3:\n               Commit C2 ───> Commit C3 (feature-a)\n              /                                    \\\nCommit C1 ───                                       ───> Commit C5 (Resolved Merge)\n              \\                                    /\n               Commit C4 (main - both modified) ──┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong kịch bản ứng dụng bán vé xem phim, nhánh `main` vừa cập nhật giá vé cuối tuần trong tệp `ticket.js`, trong khi nhánh `feature-discount` sửa logic giảm giá cho học sinh cũng tại tệp đó. Bạn tiến hành merge, bình tĩnh mở tệp xung đột ra kết hợp cả hai chính sách giá vé, xóa sạch các vạch đánh dấu, chạy `git add`, `git commit` và xóa nhánh tính năng an toàn.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c feature-challenge\ngit merge main\ngit status\ngit add <tên-tệp-đã-sửa>\ngit commit\ngit branch -d feature-challenge\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <nhánh>`: Tạo nhánh giải quyết thử thách.\n- `git merge main`: Thực hiện hợp nhất và kích hoạt tình huống thử thách.\n- `git status`: Chẩn đoán danh sách các tệp đang chờ gỡ xung đột.\n- `git add <tên-tệp>`: Đánh dấu đã giải quyết xong xung đột cho tệp.\n- `git commit`: Hoàn tất tạo Merge Commit.\n- `git branch -d <nhánh>`: Dọn dẹp nhánh tính năng sau khi hoàn tất xuất sắc.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Commit khi chưa xóa hết vạch markers:** Khiến chương trình bị lỗi cú pháp và bài kiểm tra tự động đánh giá không đạt.\n2. **Dùng `git merge --abort` giữa chừng:** Lệnh này sẽ hủy bỏ bài làm và bạn phải thực hiện lại từ đầu.\n3. **Quên xóa nhánh sau khi gộp xong:** Để lại nhánh thừa không cần thiết trong danh sách nhánh của dự án.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Kiểm tra đồ thị nhánh hiện tại bằng lệnh `git log --graph --oneline --all`.\n2. Thực hiện hợp nhất nhánh tính năng vào nhánh chính.\n3. Mở tệp xung đột, phân tích và giải quyết mâu thuẫn theo yêu cầu nghiệp vụ.\n4. Đánh dấu hoàn tất bằng `git add` và kết thúc bằng `git commit`.\n5. Xóa nhánh tính năng bằng lệnh `git branch -d` để hoàn tất thử thách.\n\n---\n\n## 💡 Hint\nHãy đọc kỹ cả hai đoạn code để kết hợp hài hòa cả hai logic tính toán thay vì chỉ giữ một bên.\n\n---\n\n## ✅ Validation\n- Đồ thị commit thể hiện rõ nút giao hợp nhất thành công.\n- Không còn bất kỳ tệp xung đột nào trong `git status`.\n- Nhánh phụ được dọn dẹp sạch sẽ sau khi merge.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi tổng kết sau để củng cố toàn bộ kiến thức về Branching & Merging trong Level 3.\n\n---\n\n## 🔥 Challenge\nTự mình tái hiện lại toàn bộ kịch bản tạo nhánh, gây xung đột và giải quyết xung đột trên một kho Git mới trên máy tính của bạn mà không cần nhìn tài liệu.\n\n---\n\n## 📚 Tổng kết\n- Nắm vững toàn bộ chu trình: tạo nhánh, chuyển nhánh, 3-way merge và gỡ xung đột.\n- Luôn bình tĩnh phân tích các vạch đánh dấu xung đột và trao đổi khi cần thiết.\n- Tạo thói quen dọn dẹp các nhánh đã hoàn thành để giữ kho lưu trữ luôn sạch sẽ và chuyên nghiệp.\n",
  "quiz": {
    "id": "quiz-03-14-branching-challenge",
    "title": "Trắc nghiệm tổng kết: Master Branching & Merging",
    "questions": [
      {
        "id": "q1",
        "question": "Quy trình chuẩn mực nhất để phát triển một tính năng mới trong nhóm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo nhánh riêng từ main -> Code và commit -> Kiểm thử -> Merge vào main -> Xóa nhánh tính năng",
            "correct": true
          },
          {
            "text": "Code trực tiếp mọi thứ trên nhánh main của công ty",
            "correct": false
          },
          {
            "text": "Tạo nhánh mới rồi không bao giờ merge vào main",
            "correct": false
          },
          {
            "text": "Gửi code qua Zalo cho đồng nghiệp copy vào máy",
            "correct": false
          }
        ],
        "explanation": "Feature Branch Workflow: tách nhánh, phát triển độc lập, kiểm thử, merge và dọn dẹp là chuẩn quốc tế."
      },
      {
        "id": "q2",
        "question": "Khi gặp Merge Conflict, hành động nào sau đây là SAI LẦM và nghiệp dư nhất?",
        "type": "single",
        "options": [
          {
            "text": "Tự ý xóa code của đồng nghiệp mà không hiểu chức năng rồi commit bừa",
            "correct": true
          },
          {
            "text": "Chạy git status để kiểm tra danh sách tệp bị ảnh hưởng",
            "correct": false
          },
          {
            "text": "Mở tệp ra xem xét kỹ lưỡng cả hai khối code",
            "correct": false
          },
          {
            "text": "Trao đổi với tác giả của nhánh kia để thống nhất giải pháp",
            "correct": false
          }
        ],
        "explanation": "Xóa bừa code của người khác thể hiện sự thiếu chuyên nghiệp và gây ra các lỗi ngầm nghiêm trọng."
      },
      {
        "id": "q3",
        "question": "Thao tác nào sau đây biến một tệp tin từ trạng thái Unmerged sang Staged trong quá trình giải quyết conflict?",
        "type": "single",
        "options": [
          {
            "text": "git add <tên-tệp>",
            "correct": true
          },
          {
            "text": "git status",
            "correct": false
          },
          {
            "text": "git diff",
            "correct": false
          },
          {
            "text": "git branch",
            "correct": false
          }
        ],
        "explanation": "`git add` là lệnh báo cho Git biết tệp đó đã được con người giải quyết mâu thuẫn xong."
      },
      {
        "id": "q4",
        "question": "Lệnh nào giúp bạn kiểm tra toàn diện đồ thị phân nhánh của tất cả các nhánh trong dự án?",
        "type": "single",
        "options": [
          {
            "text": "git log --graph --oneline --all",
            "correct": true
          },
          {
            "text": "git branch --list-only",
            "correct": false
          },
          {
            "text": "git show --branches",
            "correct": false
          },
          {
            "text": "git tree --full",
            "correct": false
          }
        ],
        "explanation": "`git log --graph --oneline --all` là câu lệnh vàng để quan sát toàn bộ đồ thị DAG của Git."
      },
      {
        "id": "q5",
        "question": "Khi giải quyết xung đột, nếu hai phần logic của cả hai nhánh đều cần thiết thì lựa chọn phù hợp nhất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Kết hợp cả hai logic, kiểm thử kỹ lưỡng rồi mới hoàn tất merge commit",
            "correct": true
          },
          {
            "text": "Chỉ chọn code của bản thân và xóa hết code người khác",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ tệp tin để không ai có lỗi",
            "correct": false
          },
          {
            "text": "Bỏ qua và không chạy kiểm thử tự động",
            "correct": false
          }
        ],
        "explanation": "Nhiều trường hợp đòi hỏi tích hợp hài hòa cả hai nghiệp vụ để đảm bảo ứng dụng chạy đúng toàn diện."
      },
      {
        "id": "q6",
        "question": "Tại sao việc dọn dẹp các nhánh đã hoàn thành và đã merge lại là một thực hành tốt trong kỹ thuật phần mềm?",
        "type": "single",
        "options": [
          {
            "text": "Giúp kho lưu trữ luôn tinh gọn, giảm nguy cơ thao tác nhầm trên nhánh cũ và giúp đồng nghiệp dễ theo dõi",
            "correct": true
          },
          {
            "text": "Để giải phóng hàng trăm gigabyte dung lượng ổ cứng",
            "correct": false
          },
          {
            "text": "Để tránh việc GitHub tính thêm tiền phí lưu trữ nhánh",
            "correct": false
          },
          {
            "text": "Vì Git tự động khóa kho chứa nếu có quá mười nhánh",
            "correct": false
          }
        ],
        "explanation": "Dọn dẹp các nhánh cũ đã merge là thói quen vệ sinh mã nguồn chuyên nghiệp của mọi kỹ sư Git."
      }
    ]
  }
};
export default lesson;
