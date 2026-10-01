import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-origin-concept",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "03-origin-concept",
    "title": "origin trong Git là gì?",
    "level": "intermediate",
    "duration": 20,
    "xp": 70,
    "prerequisites": [
      "02-git-remote"
    ],
    "objectives": [
      "Giải thích bản chất tên gọi `origin` trong Git như một quy ước đặt tên mặc định.",
      "Hiểu vì sao khi clone một dự án, Git tự động đặt tên remote chính là `origin`.",
      "Biết rằng `origin` hoàn toàn có thể đổi thành bất kỳ tên nào khác tùy thích.",
      "Phân biệt rõ ràng giữa tên gọi `origin` và các từ khóa kỹ thuật bắt buộc của hệ thống."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "origin",
      "default remote",
      "ten mac dinh",
      "quy uoc git",
      "remote name"
    ],
    "commands": [
      "git remote -v",
      "git remote rename origin my-server",
      "git remote rename my-server origin"
    ]
  },
  "content": "# origin trong Git là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích bản chất tên gọi `origin` trong Git như một quy ước đặt tên mặc định.\n- Hiểu vì sao khi clone một dự án, Git tự động đặt tên remote chính là `origin`.\n- Biết rằng `origin` hoàn toàn có thể đổi thành bất kỳ tên nào khác tùy thích.\n- Phân biệt rõ ràng giữa tên gọi `origin` và các từ khóa kỹ thuật bắt buộc của hệ thống.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### origin\n- **Nói dễ hiểu**: Tên bí danh mặc định mà Git gán cho kho lưu trữ từ xa khi clone dự án về máy.\n- **Ví dụ**: Khi gõ `git push origin main`, origin trỏ đến URL máy chủ lưu trữ dự án.\n- **Đừng nhầm**: Không phải lệnh của Git hay từ khóa bắt buộc của hệ thống; đây chỉ là tên quy ước.\n\n### default remote alias\n- **Nói dễ hiểu**: Tên gọi đại diện được quy ước ngầm định sẵn để mọi người và công cụ tự động hóa cùng hiểu.\n- **Ví dụ**: Đa số tài liệu và quy trình CI/CD đều mặc định tìm máy chủ có tên `origin`.\n- **Đừng nhầm**: Không có nghĩa là Git cấm đổi tên; bạn vẫn có quyền đặt tên khác nếu thực sự cần.\n\n### git remote rename\n- **Nói dễ hiểu**: Câu lệnh cho phép bạn đổi tên bí danh của kho từ xa từ tên cũ sang tên mới.\n- **Ví dụ**: `git remote rename origin central-repo` để đổi tên bí danh sang central-repo.\n- **Đừng nhầm**: Không làm thay đổi địa chỉ URL hay xóa code trên máy chủ; lệnh chỉ đổi tên gọi cục bộ.\n\n---\n\n## 📖 Định nghĩa\n`origin` là tên bí danh quy ước mặc định mà Git tự động gán cho kho lưu trữ từ xa khi bạn clone dự án. Về bản chất, `origin` chỉ là một tên gọi thay thế cho chuỗi URL dài, giúp các thao tác như fetch, pull, push trở nên ngắn gọn và đồng nhất.\n\n---\n\n## 💡 Tại sao cần\nHiểu rõ bản chất của `origin` giúp người học không coi đây là một câu lệnh huyền bí hay điều bắt buộc cứng nhắc. Điều này tạo nền tảng vững chắc khi làm việc trong các dự án nhiều remote như mô hình mã nguồn mở gồm cả origin và upstream.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung `origin` như số gọi nhanh số 1 trên điện thoại của bạn, được gán nhãn là \"Nhà\". Bạn có thể đổi tên danh bạ thành bất kỳ chữ nào khác, nhưng giữ chữ \"Nhà\" giúp mọi người và các ứng dụng khẩn cấp đều hiểu ngay số đó kết nối tới đâu.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBản chất quy ước của tên gọi origin:\nLệnh gõ: git push origin main\n                  │\n                  ▼\n         (Bí danh quy ước)\n         [origin] ──► https://github.com/acme/project.git\n         (Có thể đổi thành 'my-cloud' mà hệ thống vẫn chạy chuẩn)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nLập trình viên muốn thử nghiệm tính linh hoạt của Git nên chạy `git remote rename origin central-hub`. Từ đó, lệnh đẩy code trở thành `git push central-hub main` và dự án vẫn chạy bình thường. Tuy nhiên, để đồng bộ với đồng nghiệp và hệ thống CI/CD, bạn đổi lại tên thành `origin` theo chuẩn mực chung.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit remote -v\ngit remote rename origin my-server\ngit remote rename my-server origin\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Quan sát tên bí danh hiện tại đang liên kết với URL nào của dự án.\n- `git remote rename origin <tên-mới>`: Đổi tên quy ước mặc định origin sang một tên bất kỳ tùy thích theo nhu cầu dự án.\n- `git remote rename <tên-mới> origin`: Đưa tên bí danh trở lại chuẩn mực chung của cộng đồng lập trình viên toàn cầu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ origin là một lệnh đặc biệt**: Lầm tưởng origin có chức năng riêng mà không biết nó chỉ là tên gọi đại diện cho URL.\n2. **Đặt tên remote tùy tiện trong dự án nhóm**: Gây khó khăn cho đồng nghiệp và các script tự động hóa CI/CD vốn mặc định tìm tên origin.\n3. **Hoang mang khi gặp dự án có nhiều remote**: Khi gặp cả origin và upstream, chỉ cần nhớ mỗi tên là một đích đến độc lập.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác đổi tên remote trên terminal và đối chiếu kết quả.\n1. Chạy lệnh `git remote` và xác nhận kết quả in ra là `origin`.\n2. Đổi tên thử nghiệm bằng `git remote rename origin central-hub`.\n3. Chạy `git remote -v` để thấy bí danh mới hoạt động bình thường.\n4. Đổi lại tên chuẩn bằng `git remote rename central-hub origin`.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn giữ tên `origin` cho remote chính trong dự án để các tài liệu hướng dẫn và pipeline CI/CD hoạt động trơn tru.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git remote -v` hiển thị đúng bí danh `origin` sau khi kiểm tra.\n- Hiểu rõ `origin` chỉ là nhãn đại diện cho URL máy chủ từ xa.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố kiến thức về khái niệm origin trong Git.\n\n---\n\n## 🚀 Thử thách nâng cao\nMở file `.git/config` và tìm dòng `[remote \"origin\"]` để thấy trực tiếp mối quan hệ giữa tên gọi `origin` và URL của máy chủ.\n\n---\n\n## 📝 Tổng kết\n- `origin` là tên quy ước mặc định do Git tự động đặt khi clone dự án.\n- Bản chất `origin` chỉ là bí danh trỏ tới URL của máy chủ từ xa.\n- Giữ nguyên tên `origin` giúp tương thích tốt nhất với đồng nghiệp và các hệ thống tự động.\n",
  "quiz": {
    "id": "quiz-04-03-origin-concept",
    "title": "Trắc nghiệm: Bản chất origin trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Từ ngữ `origin` trong câu lệnh `git push origin main` có bản chất thực sự là gì?",
        "type": "single",
        "options": [
          {
            "text": "Là tên định danh (bí danh alias) quy ước đại diện cho địa chỉ URL của kho lưu trữ từ xa",
            "correct": true
          },
          {
            "text": "Là một câu lệnh bắt buộc của nhân hệ điều hành Linux",
            "correct": false
          },
          {
            "text": "Là tên tài khoản người sáng lập ra hệ thống Git",
            "correct": false
          },
          {
            "text": "Là giao thức truyền file bí mật qua Internet",
            "correct": false
          }
        ],
        "explanation": "`origin` chỉ là bí danh đặt tên cho URL của server từ xa, hoàn toàn có thể đổi sang tên khác nếu muốn."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh `git clone <url>`, tên remote mặc định mà Git tự động tạo cho kho vừa tải về là gì?",
        "type": "single",
        "options": [
          {
            "text": "origin",
            "correct": true
          },
          {
            "text": "master",
            "correct": false
          },
          {
            "text": "github",
            "correct": false
          },
          {
            "text": "remote-server",
            "correct": false
          }
        ],
        "explanation": "Git clone tự động đặt tên cho remote kết nối tới nguồn gốc là `origin`."
      },
      {
        "id": "q3",
        "question": "Bạn có thể đổi tên `origin` thành một tên khác như `my-github` được hay không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn được, bằng câu lệnh `git remote rename origin my-github`",
            "correct": true
          },
          {
            "text": "Không bao giờ được, Git sẽ báo lỗi hỏng kho chứa ngay",
            "correct": false
          },
          {
            "text": "Chỉ được đổi khi trả phí bản quyền cho GitHub",
            "correct": false
          },
          {
            "text": "Chỉ được đổi trên máy tính chạy macOS",
            "correct": false
          }
        ],
        "explanation": "Bạn có toàn quyền đổi tên remote bằng lệnh `git remote rename`."
      },
      {
        "id": "q4",
        "question": "Tại sao các kỹ sư phần mềm trên thế giới hầu như đều giữ nguyên tên `origin` thay vì đổi tên khác?",
        "type": "single",
        "options": [
          {
            "text": "Để tuân thủ chuẩn mực quy ước toàn cầu, giúp tài liệu, đồng nghiệp và công cụ CI/CD hoạt động thống nhất",
            "correct": true
          },
          {
            "text": "Vì nếu đổi tên thì dung lượng dự án sẽ tăng gấp mười lần",
            "correct": false
          },
          {
            "text": "Vì luật pháp quốc tế bắt buộc phải dùng chữ origin",
            "correct": false
          },
          {
            "text": "Vì bàn phím máy tính không gõ được chữ khác",
            "correct": false
          }
        ],
        "explanation": "Quy ước chung giúp tiết kiệm thời gian giải thích và tránh lỗi cấu hình trong các quy trình tự động."
      },
      {
        "id": "q5",
        "question": "Khi bạn thực hiện câu lệnh `git push origin feature-login`, Git hiểu mục tiêu của lệnh này là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đẩy các commit từ nhánh feature-login cục bộ lên nhánh feature-login trên máy chủ được gán bí danh origin",
            "correct": true
          },
          {
            "text": "Tự động xóa nhánh feature-login trên máy tính để dọn dẹp bộ nhớ",
            "correct": false
          },
          {
            "text": "Gộp thẳng nhánh feature-login vào nhánh main trên GitHub mà không cần kiểm tra",
            "correct": false
          },
          {
            "text": "Kéo toàn bộ mã nguồn từ origin về đè lên Working Directory hiện tại",
            "correct": false
          }
        ],
        "explanation": "Lệnh push kèm theo remote và branch sẽ gửi chính xác lịch sử commit của nhánh cục bộ lên remote tương ứng."
      }
    ]
  }
};
export default lesson;
