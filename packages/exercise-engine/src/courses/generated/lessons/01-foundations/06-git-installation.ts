import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-installation",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "06-git-installation",
    "title": "Cài đặt Git và chọn terminal",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [
      "05-git-vs-github"
    ],
    "objectives": [
      "Cài Git cho hệ điều hành của mình theo hướng dẫn của lớp.",
      "Mở terminal và kiểm tra cài đặt bằng `git --version`.",
      "Trên Windows, chọn dùng PowerShell hoặc Git Bash."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "cai dat git",
      "git bash",
      "terminal",
      "cli",
      "moi truong"
    ],
    "commands": [
      "git --version"
    ]
  },
  "content": "# Cài đặt Git và chọn terminal: Thiết lập vũ khí cho lập trình viên\n\n---\n\n## 🎯 Mục tiêu\n- Tự tay thiết lập môi trường Git chuẩn chỉ trên các hệ điều hành phổ biến (Windows, macOS, Linux).\n- Hiểu rõ cơ chế biến môi trường PATH giúp terminal triệu hồi lệnh `git` từ bất kỳ đâu.\n- Sử dụng lệnh `git --version` để nghiệm thu quá trình cài đặt thành công trên máy thật.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Terminal — Cửa sổ dòng lệnh\n- **Nói dễ hiểu:** Môi trường giao tiếp trực tiếp bằng văn bản với hệ điều hành, nơi bạn nhập các câu lệnh để ra lệnh cho máy tính.\n- **Ví dụ:** Ứng dụng PowerShell trên Windows hoặc Terminal trên máy Mac.\n- **Đừng nhầm:** Terminal chỉ là cái vỏ giao diện nhận lệnh; Git là chương trình thực thi được gọi từ bên trong cái vỏ đó.\n\n### CLI (Command-Line Interface) — Giao diện dòng lệnh\n- **Nói dễ hiểu:** Phương thức làm việc của lập trình viên chuyên nghiệp bằng cách gõ lệnh chuẩn xác thay vì dùng chuột bấm trên giao diện đồ họa.\n- **Ví dụ:** Bạn gõ `git --version` để kiểm tra phiên bản thay vì tìm một biểu tượng ứng dụng để nhấn chuột.\n- **Đừng nhầm:** CLI đòi hỏi bạn phải nhớ cú pháp và hiểu bản chất, nhưng mang lại quyền năng tự động hóa và tốc độ vượt trội.\n\n### Git Bash — Cửa sổ lệnh Unix cho Windows\n- **Nói dễ hiểu:** Trình giả lập môi trường dòng lệnh Linux kèm theo bộ cài Git for Windows, giúp bạn gõ các lệnh Unix quen thuộc trên Windows.\n- **Ví dụ:** Bạn mở Git Bash để vừa gõ lệnh Git vừa dùng được các tiện ích dòng lệnh như liệt kê tệp hay tìm kiếm văn bản.\n- **Đừng nhầm:** Bạn không bắt buộc phải dùng Git Bash; PowerShell hay Command Prompt đều chạy được Git nếu cấu hình PATH chuẩn.\n\n### PATH — Biến môi trường định vị chương trình\n- **Nói dễ hiểu:** Cuốn danh bạ ghi các đường dẫn thư mục mà hệ điều hành sẽ tự động lục tìm mỗi khi bạn gõ tên một câu lệnh.\n- **Ví dụ:** Khi bạn gõ `git`, máy tính tra trong biến PATH để biết file thực thi `git.exe` đang nằm ở thư mục nào.\n- **Đừng nhầm:** PATH là thiết lập của hệ điều hành máy tính, hoàn toàn tách biệt với các tệp mã nguồn trong dự án của bạn.\n\n---\n\n## 🤔 Tại sao cần?\nCài đặt công cụ là bài kiểm tra nhập môn đầu tiên của mọi kỹ sư. Nhiều bạn tải bộ cài về, bấm Next liên tục trong vô thức rồi hoang mang không hiểu tại sao terminal báo lỗi không nhận lệnh. Khi nắm vững kiến thức cài đặt và biến môi trường PATH, bạn không chỉ tự tin cấu hình Git trên chiếc laptop cá nhân mà còn sẵn sàng thiết lập môi trường làm việc trên các máy chủ đám mây từ xa chạy Linux mà không hề bỡ ngỡ.\n\n---\n\n## 📖 Định nghĩa\nCài đặt Git là quá trình đưa tệp thực thi của Git vào hệ điều hành và bổ sung đường dẫn vào biến môi trường PATH. Nhờ đó, bất kỳ cửa sổ dòng lệnh nào cũng có thể nhận diện và thực thi câu lệnh `git`. Bạn có thể tải bộ cài chuẩn tại trang chủ git-scm.com.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy coi Git là một cuốn từ điển bách khoa toàn thư vừa được bạn mua về nhà. Biến môi trường PATH giống như việc bạn dán một tờ giấy hướng dẫn ở phòng khách ghi rõ: \"Từ điển để ở giá sách tầng hai\". Bất kỳ ai trong nhà (PowerShell hay Git Bash) chỉ cần nhìn vào tờ giấy đó là tìm thấy từ điển ngay!\n\n---\n\n## 🖼 Sơ đồ\n```text\nBạn gõ \"git --version\" vào Terminal\n               │\n               ▼\nHệ điều hành tra cứu biến PATH: C:\\Program Files\\Git\\cmd\n               │\n               ▼\nKhởi chạy git.exe và trả về kết quả: git version 2.44.0\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột bạn sinh viên vừa cài xong Git for Windows trên máy tính, quay lại cửa sổ PowerShell đang mở sẵn gõ `git --version` thì nhận ngay thông báo lỗi đỏ rực. Bạn tưởng cài hỏng nên tính xóa đi cài lại. Thực ra, cửa sổ terminal cũ chưa kịp nhận biến PATH mới; chỉ cần tắt đi mở lại một cửa sổ PowerShell mới tinh là lệnh chạy mượt mà ngay lập tức.\n\n---\n\n## 💻 Command\n```bash\ngit --version\n```\n\n---\n\n## 🔍 Giải thích command\n`git --version` là câu lệnh đầu tiên mà mọi kỹ sư chạy để chào sân môi trường mới. Lệnh này yêu cầu Git in ra mã số phiên bản hiện tại đang được cài đặt trên hệ điều hành. Nếu màn hình in ra kết quả dạng phiên bản cụ thể, cỗ máy Git đã sẵn sàng phục vụ bạn trong mọi dự án.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên khởi động lại terminal sau khi cài đặt:** Cửa sổ terminal mở từ trước sẽ không thể nhận diện được các biến môi trường PATH mới thêm vào.\n2. **Ảo tưởng rằng học trên web thì không cần cài Git vào máy thật:** Trình giả lập web chỉ để luyện tập nhanh; khi đi làm dự án thực tế, bạn bắt buộc phải có Git thật trên máy.\n3. **Nhắm mắt bấm Next mà không chú ý tùy chọn cài đặt:** Trên Windows, việc chọn cấu hình dòng lệnh và ký tự xuống dòng phù hợp sẽ giúp tránh lỗi hiển thị khi làm việc nhóm đa nền tảng.\n\n---\n\n## 🧪 Lab\n1. Tải bộ cài Git chuẩn từ trang chủ git-scm.com phù hợp với hệ điều hành của bạn.\n2. Tiến hành cài đặt và đặc biệt chú ý bước cho phép Git chạy từ command line của bên thứ ba.\n3. Mở một cửa sổ dòng lệnh mới tinh (PowerShell hoặc Terminal trên macOS) và gõ `git --version`.\n4. Ghi lại chính xác phiên bản Git vừa được cài đặt thành công trên máy của bạn.\n\n---\n\n## 💡 Hint\nNếu gặp lỗi không nhận diện lệnh sau khi cài, hãy bình tĩnh làm theo hai bước: tắt hẳn cửa sổ dòng lệnh cũ rồi mở lại cái mới; nếu vẫn chưa được, hãy kiểm tra lại biến môi trường PATH trong cài đặt hệ thống.\n\n---\n\n## ✅ Validation\n- Cửa sổ terminal trên máy tính thật in ra đúng định dạng phiên bản Git mà không phát sinh lỗi.\n- Phân biệt rõ sự khác nhau giữa Terminal (cửa sổ nhập lệnh), Shell (trình thông dịch) và Git (phần mềm ứng dụng).\n- Giải thích được nguyên lý vận hành của biến môi trường PATH.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về cài đặt môi trường và terminal. Đọc kỹ phần giải thích của giảng viên sau mỗi lựa chọn.\n\n---\n\n## 🔥 Challenge\nNếu dùng Windows, hãy thử mở song song hai cửa sổ: một bên là PowerShell và một bên là Git Bash; chạy lệnh `git --version` ở cả hai và so sánh trải nghiệm hiển thị của hai môi trường này.\n\n---\n\n## 📚 Tổng kết\n- Luôn tải bản cài đặt Git chính thức từ trang chủ git-scm.com để đảm bảo an toàn và cập nhật tính năng mới nhất.\n- Biến môi trường PATH là cầu nối giúp hệ điều hành tìm thấy và thực thi chương trình Git từ mọi thư mục.\n- Lệnh `git --version` là thước đo tiêu chuẩn để xác nhận môi trường phát triển đã sẵn sàng tác chiến.\n\n",
  "quiz": {
    "id": "quiz-06-git-installation",
    "title": "Trắc nghiệm: Cài đặt Git và môi trường terminal",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào in ra phiên bản Git mà terminal đang gọi?",
        "type": "single",
        "options": [
          {
            "text": "`git --version`",
            "correct": true
          },
          {
            "text": "`git status`",
            "correct": false
          },
          {
            "text": "`git add`",
            "correct": false
          },
          {
            "text": "`git config --list`",
            "correct": false
          }
        ],
        "explanation": "`git --version` in số phiên bản của chương trình Git đang chạy. Lệnh này không xem trạng thái tệp hay cấu hình repository."
      },
      {
        "id": "q2",
        "question": "Trên Windows, điều nào đúng về Git Bash và PowerShell?",
        "type": "single",
        "options": [
          {
            "text": "Cả hai có thể chạy Git nếu Git đã được cài và terminal tìm thấy chương trình",
            "correct": true
          },
          {
            "text": "Git chỉ chạy được trong Git Bash",
            "correct": false
          },
          {
            "text": "PowerShell chỉ chạy GitHub, không thể gọi Git",
            "correct": false
          },
          {
            "text": "Cài Git for Windows sẽ vô hiệu hóa PowerShell",
            "correct": false
          }
        ],
        "explanation": "Git Bash đi kèm Git for Windows, nhưng PowerShell cũng chạy Git khi cài đặt đã cấu hình PATH phù hợp."
      },
      {
        "id": "q3",
        "question": "Terminal mới báo không nhận diện `git`. Bước kiểm tra nào hợp lý trước?",
        "type": "single",
        "options": [
          {
            "text": "Xác nhận đã cài Git, rồi mở terminal mới và kiểm tra PATH",
            "correct": true
          },
          {
            "text": "Xóa thư mục dự án để Git xuất hiện",
            "correct": false
          },
          {
            "text": "Tạo tài khoản GitHub mới trước khi cài Git",
            "correct": false
          },
          {
            "text": "Đổi tên tệp README để hệ điều hành tìm thấy lệnh",
            "correct": false
          }
        ],
        "explanation": "Terminal không tìm thấy chương trình có thể do Git chưa cài hoặc PATH chưa cập nhật; mở terminal mới sau khi cài là bước an toàn đầu tiên."
      },
      {
        "id": "q4",
        "question": "Bạn chạy `git --version` trong terminal mô phỏng của Git Academy. Kết quả nói lên điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Phiên bản mô phỏng, không xác nhận Git đã cài trên máy cá nhân",
            "correct": true
          },
          {
            "text": "Git đã được cài vào Windows hoặc macOS của bạn",
            "correct": false
          },
          {
            "text": "Máy cá nhân đã kết nối với GitHub",
            "correct": false
          },
          {
            "text": "Repository hiện tại đã có commit đầu tiên",
            "correct": false
          }
        ],
        "explanation": "Terminal trong khóa học chạy trong trình duyệt và mô phỏng Git. Muốn kiểm tra máy thật, chạy lệnh trong terminal của máy đó."
      },
      {
        "id": "q5",
        "question": "Bạn nên tìm hướng dẫn cài Git cho máy của mình ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Trang cài đặt chính thức `git-scm.com/install`",
            "correct": true
          },
          {
            "text": "Một bản cài đặt bất kỳ được gửi trong tin nhắn lạ",
            "correct": false
          },
          {
            "text": "Trang GitHub của một dự án không liên quan",
            "correct": false
          },
          {
            "text": "Bên trong thư mục `.git` của bài tập",
            "correct": false
          }
        ],
        "explanation": "Trang chính thức cung cấp hướng dẫn theo Windows, macOS và Linux. Chọn đúng hệ điều hành để tránh tải nhầm gói cài đặt."
      }
    ]
  }
};
export default lesson;
