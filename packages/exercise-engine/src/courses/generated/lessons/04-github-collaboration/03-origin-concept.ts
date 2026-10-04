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
  "content": "# origin trong Git là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu thấu đáo bản chất của `origin` trong Git như một quy ước đặt tên bí danh mặc định chứ không phải từ khóa hệ thống.\n- Giải mã cơ chế tự động thiết lập remote `origin` của Git khi thực hiện thao tác clone dự án.\n- Tự tin quản lý và đổi tên remote alias bằng lệnh `git remote rename` khi làm việc trong dự án phức tạp.\n- Nắm vững kiến trúc ánh xạ giữa tên bí danh cục bộ và URL máy chủ trong tệp cấu hình `.git/config`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### origin\n- **Nói dễ hiểu:** Tên bí danh mặc định (alias) mà Git tự động gán cho URL của kho từ xa khi bạn clone dự án về máy.\n- **Ví dụ:** Trong câu lệnh `git push origin main`, từ `origin` đóng vai trò thay thế cho đường dẫn URL dài của máy chủ GitHub.\n- **Đừng nhầm:** `origin` không phải là lệnh Git hay thuộc tính bắt buộc của hệ thống; bạn hoàn toàn có thể đổi nó thành bất kỳ tên nào khác.\n\n### remote alias — bí danh remote\n- **Nói dễ hiểu:** Tên định danh ngắn gọn và dễ nhớ được dùng để đại diện cho một URL kho từ xa dài dòng và phức tạp.\n- **Ví dụ:** Thay vì gõ `git fetch https://github.com/org/repo.git`, bạn chỉ cần gõ lệnh tiện lợi `git fetch origin`.\n- **Đừng nhầm:** Một dự án có thể sở hữu nhiều remote alias khác nhau cùng lúc (như `origin`, `upstream`, `backup`), không giới hạn ở một tên duy nhất.\n\n### git remote rename\n- **Nói dễ hiểu:** Câu lệnh cho phép bạn đổi tên nhãn đại diện của kho từ xa từ tên cũ sang một tên mới rõ nghĩa hơn.\n- **Ví dụ:** Lệnh `git remote rename origin central-hub` sẽ đổi bí danh mặc định thành `central-hub` trên máy của bạn.\n- **Đừng nhầm:** Lệnh này chỉ đổi tên gọi quy ước ở tệp cấu hình cục bộ trên máy bạn; tuyệt đối không làm đổi tên kho hay ảnh hưởng tới máy chủ từ xa.\n\n---\n\n## 📖 Định nghĩa\nTrong Git, `origin` không phải là một câu lệnh hay từ khóa đặc quyền của hệ thống, mà đơn thuần là tên bí danh quy ước ngầm định (alias) trỏ đến URL của kho lưu trữ từ xa mà bạn đã nhân bản (clone) về. Thay vì phải gõ toàn bộ chuỗi URL máy chủ dài ngoằng và phức tạp mỗi lần đồng bộ, bạn chỉ cần gọi tên ngắn gọn `origin`.\n\n---\n\n## 🤔 Tại sao cần?\nRất nhiều bạn mới học xem `origin` như một câu thần chú kỳ bí và gõ lệnh một cách máy móc mà không hiểu bản chất. Hiểu rõ `origin` chỉ là nhãn đại diện có thể đổi tên tùy ý sẽ giúp bạn tự tin làm chủ kiến trúc đa remote chuyên nghiệp, đặc biệt khi làm việc với các dự án mã nguồn mở lớn cần kết nối song song cả kho cá nhân và kho gốc của tổ chức.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng `origin` giống hệt như phím gọi nhanh số 1 trên danh bạ điện thoại của bạn, nơi bạn lưu số của cha mẹ với tên gọi \"Gia Đình\". Bạn hoàn toàn có thể đổi tên liên hệ đó thành bất kỳ chữ nào khác, nhưng việc giữ quy ước \"Gia Đình\" hay `origin` giúp mọi người trong dự án và các công cụ tự động hóa đều hiểu ngay địa chỉ liên lạc chính ở đâu.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBẢN CHẤT QUY ƯỚC CỦA TÊN GỌI ORIGIN TRONG GIT:\n\nCâu lệnh thực thi:   git push origin main\n                            │\n                            ▼\n              ┌───────────────────────────┐\n              │  Bí danh quy ước: origin  │\n              └─────────────┬─────────────┘\n                            │ (Ánh xạ trong .git/config)\n                            ▼\n              ┌───────────────────────────┐\n              │ https://github.com/org/repo.git           │\n              └───────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tham gia dự án thương mại điện tử lớn với URL kho chính là `https://github.com/company/super-ecommerce-core.git`. Nhờ cơ chế quy ước mặc định, thay vì gõ lệnh đẩy code dài dòng `git push https://github.com/company/super-ecommerce-core.git main`, bạn chỉ cần gõ nhẹ nhàng `git push origin main`. Toàn bộ cấu hình liên kết này được Git âm thầm ghi lại trong tệp cấu hình `.git/config` của bạn.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\ngit remote rename origin my-server\ngit remote rename my-server origin\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Hiển thị danh sách tất cả các bí danh remote kèm URL ánh xạ chi tiết cho cả hai chiều nạp (`fetch`) và đẩy (`push`).\n- `git remote rename origin my-server`: Đổi tên bí danh từ `origin` thành `my-server`, chứng minh `origin` hoàn toàn không phải tên cố định bất biến.\n- `git remote rename my-server origin`: Đổi tên bí danh trở lại `origin` để tuân thủ quy ước chuẩn mực quốc tế của cộng đồng lập trình viên.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng `origin` là một câu lệnh của Git**: Cố tình gõ `origin main` và tự hỏi vì sao terminal báo lỗi lệnh không tồn tại.\n2. **Nghĩ rằng Git bắt buộc mọi kho từ xa phải có tên là `origin`**: Git không quan tâm bạn đặt tên là gì, bạn có thể đặt là `central`, `github`, hay `prod`.\n3. **Hoang mang khi gặp dự án có nhiều remote**: Nghĩ rằng chỉ được có một remote duy nhất, trong khi một kho Git cục bộ có thể kết nối đồng thời tới hàng chục remote khác nhau.\n\n---\n\n## 🧪 Lab\n1. Chạy `git remote -v` để kiểm tra danh sách và URL hiện tại của các remote trong dự án.\n2. Tạo một remote thử nghiệm bằng lệnh: `git remote add training-origin https://example.com/team/project.git`.\n3. Đổi tên remote thử nghiệm sang nhãn mới: `git remote rename training-origin my-server`.\n4. Chạy lại `git remote -v` để xác nhận URL vẫn nguyên vẹn và tên bí danh đã được cập nhật thành công.\n5. Dọn dẹp remote thử nghiệm sau khi hoàn thành bài học: `git remote remove my-server`.\n\n---\n\n## 💡 Hint\n> Trong thực tế phát triển phần mềm doanh nghiệp, bạn nên luôn tôn trọng và giữ nguyên tên gọi chuẩn `origin`. Điều này đảm bảo toàn bộ tài liệu hướng dẫn (README), CI/CD pipeline và thói quen làm việc của cả nhóm luôn vận hành ăn khớp và mượt mà.\n\n---\n\n## ✅ Validation\n- Nhận thức sâu sắc rằng `origin` chỉ là tên quy ước đại diện cho URL máy chủ.\n- Thực thi thành thạo lệnh `git remote rename` để đổi tên bí danh mà không làm ảnh hưởng đến dữ liệu dự án.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để củng cố và khắc sâu kiến thức về bản chất của tên gọi `origin` trong Git.\n\n---\n\n## 🔥 Challenge\nHãy mở tệp ẩn `.git/config` trong thư mục dự án của bạn bằng trình soạn thảo văn bản và tìm kiếm khối lệnh `[remote \"origin\"]`. Bạn quan sát thấy Git lưu trữ thông tin URL và cấu hình refspec của `origin` như thế nào dưới nắp ca-pô?\n\n---\n\n## 📚 Tổng kết\n- `origin` là tên bí danh quy ước mặc định mà Git tự động gán cho remote khi clone.\n- Bản chất `origin` chỉ là tên nhãn ngắn thay thế cho đường dẫn URL dài trên máy chủ.\n- Bạn hoàn toàn có thể đổi tên bằng `git remote rename`, nhưng giữ nguyên `origin` là chuẩn mực tốt nhất cho làm việc nhóm.\n",
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
