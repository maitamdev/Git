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
  "content": "# Thử thách tổng hợp Branching Master\n\n---\n\n## 🎯 Mục tiêu\n- Áp dụng tổng hợp toàn bộ kỹ năng Level 3 vào một kịch bản phát triển phần mềm đa nhánh thực chiến.\n- Thực hiện tạo nhánh tính năng, chuyển nhánh, tạo commit độc lập, và phát hiện xung đột.\n- Giải quyết thành công xung đột Merge Conflict và tạo Merge Commit chuẩn hóa.\n- Dọn dẹp hệ thống nhánh sạch sẽ sau khi hoàn thành nhiệm vụ.\n\n---\n\n## 📖 Định nghĩa\n> Thử thách tổng hợp Branching Master là bài kiểm tra năng lực toàn diện của Level 3, mô phỏng một kịch bản làm việc thực tế trong một nhóm phát triển phần mềm: bạn sẽ đóng vai trò một kỹ sư phụ trách tích hợp hai tính năng rẽ nhánh song song, chủ động đối mặt với tình huống xung đột code gay cấn, vận dụng thành thạo các công cụ chẩn đoán và hoàn tất quy trình hợp nhất mã nguồn sạch sẽ.\n\n---\n\n## 🤔 Tại sao cần?\nHọc lý thuyết về Branching và Merging chỉ là bước khởi đầu. Khả năng bình tĩnh xử lý các tình huống phân kỳ lịch sử, đọc hiểu các khối conflict markers phức tạp và tự tin đưa ra quyết định hợp nhất trong thực tế mới là thước đo năng lực thật sự của một kỹ sư Git chuyên nghiệp. Vượt qua thử thách này khẳng định bạn đã hoàn toàn làm chủ kỹ năng rẽ nhánh và hợp nhất.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung thử thách này giống như một bài thi sát hạch lái xe sa hình thực tế trên đường trường. Bạn đã học kỹ lý thuyết về chân phanh, chân ga và gương chiếu hậu (branch, switch, merge). Giờ là lúc bạn trực tiếp ngồi sau vô lăng, lái xe vượt qua những khúc cua ngoạn mục (phân kỳ lịch sử) và xử lý chướng ngại vật bất ngờ (xung đột conflict) để đưa chiếc xe về đích an toàn tuyệt đối.\n\n---\n\n## 🖼 Sơ đồ\n```text\nKịch bản thử thách Branching Master:\n               Commit C2 ──► Commit C3 (feature-a)\n              /                                    \\\nCommit C1 ───                                       ──► Commit C5 (Resolved Merge)\n              \\                                    /\n               Commit C4 (main - both modified) ──┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong kịch bản thử thách thực chiến, bạn nhận được nhiệm vụ phát triển ứng dụng bán vé xem phim trực tuyến cho một chuỗi rạp chiếu lớn. Nhánh main vừa cập nhật chính sách giá vé cuối tuần trong tệp ticket.js, trong khi nhánh feature-discount đang sửa logic giảm giá cho học sinh và sinh viên cũng trong đúng tệp ticket.js đó. Bạn tiến hành merge nhánh tính năng vào main, bình tĩnh đối mặt khi Git thông báo xung đột, sử dụng thành thạo kỹ thuật 4 bước để kết hợp cả hai chính sách giá vé vào hàm tính toán chung, chạy kiểm thử thành công, commit hoàn tất và xóa nhánh tính năng an toàn. Kết quả toàn bộ quy trình hợp nhất diễn ra trơn tru mà không làm gián đoạn hệ thống bán vé.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c feature-challenge\ngit merge main\ngit status\ngit add <resolved-file>\ngit commit\ngit branch -d feature-challenge\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <nhánh>`: Tạo nhánh giải quyết thử thách.\n- `git merge main`: Bắt đầu quá trình hợp nhất kích hoạt kịch bản thử thách.\n- `git status`: Chẩn đoán trạng thái các tệp unmerged.\n- `git add <resolved-file>`: Đánh dấu hoàn tất việc gỡ xung đột.\n- `git commit`: Đóng gói Merge Commit ghi dấu chiến thắng thử thách.\n- `git branch -d <nhánh>`: Dọn dẹp nhánh sau khi hoàn thành xuất sắc.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Vội vã commit khi chưa xóa hết các vạch markers**:  Khiến bài kiểm tra tự động đánh giá thất bại.\n2. **Sử dụng git merge --abort giữa chừng**:  Sẽ làm hủy bỏ toàn bộ bài thi và bạn phải làm lại từ đầu.\n3. **Quên xóa nhánh sau khi hoàn thành**:  Không đạt điểm tối đa ở phần dọn dẹp vệ sinh kho chứa.\n\n---\n\n## 🧪 Lab\n1. Khởi động kịch bản thử thách tổng hợp multi-branch-challenge trong terminal.\n2. Kiểm tra đồ thị nhánh hiện tại bằng `git log --graph --oneline --all`.\n3. Thực hiện hợp nhất nhánh tính năng vào nhánh chính.\n4. Mở tệp xung đột, phân tích và giải quyết mâu thuẫn theo yêu cầu nghiệp vụ.\n5. Đánh dấu hoàn tất bằng `git add` và kết thúc bằng `git commit`.\n6. Xóa nhánh tính năng để hoàn tất 100% thử thách.\n\n---\n\n## 💡 Hint\n> Bình tĩnh đọc kỹ yêu cầu nghiệp vụ trong đề bài để giữ lại cả hai logic giảm giá và phụ thu.\n\n---\n\n## ✅ Validation\n- Hệ thống chấm điểm tự động xác nhận kho chứa có đồ thị hợp nhất chuẩn và không còn conflict.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm tổng kết để củng cố toàn bộ kiến thức của Level 3: Branching & Merging.\n\n---\n\n## 🔥 Challenge\nMô phỏng lại toàn bộ kịch bản này trên máy tính cá nhân của bạn và giải quyết không cần xem tài liệu.\n\n---\n\n## 📚 Tổng kết\n- Nắm vững toàn diện: tạo nhánh, chuyển nhánh, 3-way merge và resolve conflict.\n- Bình tĩnh phân tích conflict markers và trao đổi logic trước khi đưa ra quyết định.\n- Luôn dọn dẹp các nhánh đã hoàn thành để duy trì kho lưu trữ chuyên nghiệp.\n",
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
