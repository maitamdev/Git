import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-git-la-gi",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "03-git-la-gi",
    "title": "Git là gì? Kiến trúc phân tán",
    "level": "beginner",
    "duration": 25,
    "xp": 60,
    "prerequisites": [
      "02-vcs-types"
    ],
    "objectives": [
      "Nắm bắt nguồn gốc ra đời của Git do Linus Torvalds khởi xướng vào năm 2005.",
      "Hiểu rõ các triết lý thiết kế cơ bản: tốc độ, an toàn dữ liệu, hỗ trợ phân nhánh phi tuyến tính.",
      "Xác định được vai trò trung tâm của Git trong quy trình CI/CD và văn hóa DevOps hiện đại."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git la gi",
      "linus torvalds",
      "dvcs",
      "lich su git",
      "dac diem"
    ],
    "commands": [
      "git --help",
      "git --version"
    ]
  },
  "content": "# Git là gì? Kiến trúc phân tán\n\n---\n\n## 🎯 Mục tiêu\n- Nắm bắt nguồn gốc ra đời của Git do Linus Torvalds khởi xướng vào năm 2005.\n- Hiểu rõ các triết lý thiết kế cơ bản: tốc độ, an toàn dữ liệu, hỗ trợ phân nhánh phi tuyến tính.\n- Xác định được vai trò trung tâm của Git trong quy trình CI/CD và văn hóa DevOps hiện đại.\n\n---\n\n## 📖 Định nghĩa\n> Git là một hệ thống quản lý phiên bản phân tán mã nguồn mở, được Linus Torvalds tạo ra vào năm 2005 nhằm phục vụ quá trình phát triển nhân hệ điều hành Linux. Git được thiết kế với mục tiêu tối thượng là tốc độ xử lý vượt bậc, cấu trúc dữ liệu đơn giản nhưng toàn vẹn, khả năng xử lý các dự án có quy mô khổng lồ và hỗ trợ mạnh mẽ quy trình làm việc phi tuyến tính với hàng ngàn nhánh làm việc song song. Mọi dữ liệu trong Git đều được đảm bảo tính toàn vẹn bằng thuật toán băm mật mã học.\n\n---\n\n## 🤔 Tại sao cần?\nHơn 95% các kỹ sư phần mềm trên toàn cầu hiện nay sử dụng Git làm công cụ quản lý mã nguồn mặc định trong công việc hàng ngày. Nắm vững Git không chỉ là một kỹ năng phụ trợ mà là yêu cầu bắt buộc tối thiểu đối với bất kỳ ai theo đuổi sự nghiệp kỹ nghệ phần mềm. Thiếu kỹ năng Git, bạn sẽ không thể tham gia vào bất kỳ dự án thực tế nào tại doanh nghiệp, không thể đóng góp vào cộng đồng mã nguồn mở và gặp vô vàn rào cản khi ứng tuyển công việc.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng Git giống như một cuốn hộ chiếu điện tử được tích hợp chip sinh trắc học bảo mật tối cao. Mỗi trang visa được đóng dấu thị thực trong cuốn hộ chiếu đó tương ứng với một mốc commit trong lịch sử. Dấu mộc không chỉ ghi ngày giờ và địa điểm mà còn được mã hóa bằng một chuỗi chữ số mật mã học duy nhất. Bất kỳ sự tẩy xóa hay thay đổi dù chỉ một nét mực nhỏ nhất trên trang giấy cũng sẽ lập tức làm sai lệch chữ ký số và bị hệ thống từ chối.\n\n---\n\n## 🖼 Sơ đồ\n```text\nDòng thời gian Git (Directed Acyclic Graph):\nCommit A (Hash: 4a2f8b)\n    │\n    ▼\nCommit B (Hash: 9e1c3d) ──► Nhánh tính năng [feature]\n    │\n    ▼\nCommit C (Hash: f7d02a) ──► Nhánh chính [main] (HEAD)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhi hàng chục ngàn kỹ sư phần mềm tại các tập đoàn công nghệ hàng đầu như Google, Microsoft, Meta hay các dự án mã nguồn mở như nhân Linux, thư viện React và Vue cùng làm việc trên hàng triệu dòng code mỗi ngày, Git chính là sợi dây liên kết bảo đảm rằng code của mọi người được tích hợp trơn tru, không xảy ra thất thoát và có thể kiểm toán minh bạch từng dòng thay đổi. Nhờ có kiến trúc phân tán phi tập trung, mỗi kỹ sư có thể tự do thử nghiệm các tính năng mới trên các nhánh riêng mà không sợ làm gián đoạn nhánh chính, sau đó dễ dàng gộp lại khi đã kiểm thử kỹ lưỡng.\n\n---\n\n## 💻 Command\n```bash\ngit --help\ngit --version\n```\n\n---\n\n## 🔍 Giải thích command\n- `git --help`: Mở trang tra cứu hướng dẫn nhanh danh sách các lệnh Git phổ biến nhất cùng mô tả chức năng chi tiết cho từng nhóm tác vụ hàng ngày.\n- `git --version`: In ra phiên bản hiện tại của phần mềm Git trên máy tính giúp xác định các tính năng mới đã được hỗ trợ hay chưa.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ Git chỉ dành cho lập trình viên kỳ cựu**:  Git là kỹ năng nền tảng cơ bản mà sinh viên CNTT cần học ngay từ năm nhất.\n2. **Sử dụng Git mà không hiểu bản chất con trỏ**:  Cố gắng học vẹt các câu lệnh mà không hiểu đồ thị liên kết commit ngầm bên dưới.\n3. **Gõ lệnh một cách mù quáng**:  Gõ các lệnh copy từ mạng mà không đọc kỹ hướng dẫn cảnh báo an toàn dữ liệu.\n\n---\n\n## 🧪 Lab\n1. Mở terminal và gõ `git --help` để xem bảng tổng hợp các nhóm lệnh chính.\n2. Tìm kiếm các nhóm lệnh: start a working area, work on the current change, examine the history.\n3. Nhận biết giao diện trợ giúp chuyên nghiệp được tích hợp sẵn trong Git.\n\n---\n\n## 💡 Hint\n> Gõ `git <command> --help` bất cứ khi nào bạn muốn xem cẩm nang hướng dẫn của một lệnh cụ thể.\n\n---\n\n## ✅ Validation\n- Thực thi thành công lệnh trợ giúp và giải thích được triết lý thiết kế của Git.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để củng cố sự hiểu biết về bản chất phần mềm Git.\n\n---\n\n## 🔥 Challenge\nNêu 3 lý do vì sao Git lại chiếm lĩnh hoàn toàn thị phần của SVN trong vòng một thập kỷ qua.\n\n---\n\n## 📚 Tổng kết\n- Git được Linus Torvalds sáng tạo năm 2005 để quản lý mã nguồn nhân Linux.\n- Git chú trọng tối đa vào tốc độ, sự an toàn dữ liệu và mô hình phân nhánh linh hoạt.\n- Hơn 95% ngành công nghiệp phần mềm toàn cầu hiện nay sử dụng Git làm tiêu chuẩn bắt buộc.\n",
  "quiz": {
    "id": "quiz-03-git-la-gi",
    "title": "Trắc nghiệm: Nguồn gốc và bản chất của Git",
    "questions": [
      {
        "id": "q1",
        "question": "Ai là người đã sáng tạo ra hệ thống quản lý phiên bản Git vào năm 2005?",
        "type": "single",
        "options": [
          {
            "text": "Linus Torvalds (tác giả nhân Linux)",
            "correct": true
          },
          {
            "text": "Bill Gates (người sáng lập Microsoft)",
            "correct": false
          },
          {
            "text": "Mark Zuckerberg (người sáng lập Facebook)",
            "correct": false
          },
          {
            "text": "Guido van Rossum (tác giả ngôn ngữ Python)",
            "correct": false
          }
        ],
        "explanation": "Linus Torvalds đã viết nên Git vào năm 2005 để phục vụ việc quản lý mã nguồn dự án nhân hệ điều hành Linux."
      },
      {
        "id": "q2",
        "question": "Cơ chế nào giúp Git đảm bảo rằng nội dung tệp tin trong lịch sử không bao giờ bị can thiệp âm thầm?",
        "type": "single",
        "options": [
          {
            "text": "Sử dụng mã băm mật mã học (Cryptographic Hash) để định danh mọi đối tượng dữ liệu",
            "correct": true
          },
          {
            "text": "Khóa tệp tin bằng mật khẩu quản trị viên hệ điều hành",
            "correct": false
          },
          {
            "text": "Gửi mã nguồn lên máy chủ cảnh sát mạng để xác thực định kỳ",
            "correct": false
          },
          {
            "text": "In mã nguồn ra giấy và cất vào két sắt công ty",
            "correct": false
          }
        ],
        "explanation": "Mọi đối tượng commit, tree và blob trong Git đều được băm bằng thuật toán SHA để bảo vệ tính toàn vẹn dữ liệu."
      },
      {
        "id": "q3",
        "question": "Đặc điểm nào dưới đây KHÔNG PHẢI là mục tiêu thiết kế ban đầu của Git?",
        "type": "single",
        "options": [
          {
            "text": "Phụ thuộc chặt chẽ vào một máy chủ trung tâm duy nhất để hoạt động",
            "correct": true
          },
          {
            "text": "Tốc độ xử lý cực nhanh ngay cả với dự án khổng lồ",
            "correct": false
          },
          {
            "text": "Hỗ trợ mô hình phân nhánh song song phi tuyến tính",
            "correct": false
          },
          {
            "text": "Khả năng vận hành offline trơn tru không cần kết nối mạng liên tục",
            "correct": false
          }
        ],
        "explanation": "Git được thiết kế để phân tán phi tập trung, xóa bỏ sự phụ thuộc vào máy chủ trung tâm duy nhất."
      },
      {
        "id": "q4",
        "question": "Lệnh nào hiển thị tài liệu hướng dẫn tra cứu chi tiết của lệnh `git commit`?",
        "type": "single",
        "options": [
          {
            "text": "git commit --help",
            "correct": true
          },
          {
            "text": "git commit --manual-search",
            "correct": false
          },
          {
            "text": "git find commit documentation",
            "correct": false
          },
          {
            "text": "git help-me commit",
            "correct": false
          }
        ],
        "explanation": "Cú pháp `git <command> --help` mở trang hướng dẫn tra cứu chi tiết (man page) của lệnh đó."
      }
    ]
  }
};
export default lesson;
