import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-vs-github",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "05-git-vs-github",
    "title": "Phân biệt Git vs GitHub",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [
      "04-git-architecture"
    ],
    "objectives": [
      "Nói được Git là công cụ quản lý lịch sử trên máy còn GitHub là dịch vụ trực tuyến.",
      "Tạo commit cục bộ mà không cần Internet.",
      "Giải thích được `push` dùng để gửi commit lên remote."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git vs github",
      "phan biet",
      "cloud",
      "hosting",
      "collaboration"
    ],
    "commands": [
      "git remote -v",
      "git push",
      "git pull"
    ]
  },
  "content": "# Phân biệt Git vs GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Nói được Git là công cụ còn GitHub là dịch vụ trực tuyến.\n- Phân biệt việc lưu trên máy với việc chia sẻ qua mạng.\n- Biết GitHub không phải nơi duy nhất có thể lưu repository từ xa.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git — công cụ quản lý phiên bản\n- **Nói dễ hiểu:** Phần mềm trên máy giúp bạn lưu mốc và xem lịch sử của dự án.\n- **Ví dụ:** Bạn dùng lệnh Git để lưu thay đổi trong bài tập của mình.\n- **Đừng nhầm:** Git không phải một trang web; nhiều thao tác của Git chạy ngay trên máy.\n\n### GitHub — dịch vụ cộng tác trực tuyến\n- **Nói dễ hiểu:** Một dịch vụ trên Internet để lưu repository Git và phối hợp với người khác.\n- **Ví dụ:** Nhóm có thể đưa repository lên GitHub để cùng xem và góp ý.\n- **Đừng nhầm:** GitHub không phải tên khác của Git; còn có dịch vụ khác như GitLab.\n\n### Remote — kho lưu trữ từ xa\n- **Nói dễ hiểu:** Repository ở một nơi khác mà kho Git trên máy có thể trao đổi dữ liệu với.\n- **Ví dụ:** Nhóm đặt một remote trỏ tới repository trên GitHub.\n- **Đừng nhầm:** Có remote không làm Git tự đồng bộ; bạn vẫn cần gửi hoặc lấy thay đổi.\n\n### Push — gửi commit lên remote\n- **Nói dễ hiểu:** Thao tác chuyển commit từ kho trên máy lên nơi chia sẻ.\n- **Ví dụ:** Push commit sau khi hoàn thành một phần bài tập để bạn cùng nhóm xem.\n- **Đừng nhầm:** Commit chưa tự xuất hiện trên GitHub nếu bạn chưa push.\n\n---\n\n## 📖 Định nghĩa\nGit là công cụ quản lý lịch sử trên máy tính của bạn. GitHub là một dịch vụ trực tuyến có thể lưu repository Git và giúp nhóm cộng tác. Bạn có thể tạo commit khi offline; để gửi commit lên GitHub thì cần kết nối mạng và quyền truy cập phù hợp.\n\n---\n\n## 🤔 Tại sao cần?\nNgười mới thường tưởng Git chỉ dùng được khi mở GitHub. Thực ra Git lưu lịch sử trên máy; GitHub là một nơi trực tuyến để chia sẻ repository. Phân biệt hai việc này giúp bạn biết khi nào cần Internet.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ Git là cuốn sổ lịch sử nằm trên máy bạn. GitHub là một bản repository đặt trên mạng để bạn gửi commit lên hoặc lấy thay đổi về.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMáy của bạn                         Dịch vụ trực tuyến\n┌─────────────────────┐   push    ┌─────────────────────┐\n│ Git                 │ ────────► │ GitHub              │\n│ commit được lưu đây │ ◄──────── │ repository được lưu │\n└─────────────────────┘   pull    └─────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đang đi học và mất mạng. Bạn vẫn có thể sửa bài và tạo commit bằng Git trên máy. Khi có mạng lại, bạn dùng `git push` để gửi commit lên GitHub. Việc push còn cần remote đã được cấu hình và quyền truy cập phù hợp.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\ngit push\ngit pull\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Xem nơi repository trên máy đang kết nối tới, nếu có.\n- `git push`: Gửi commit từ máy lên remote.\n- `git pull`: Lấy thay đổi từ remote về và tích hợp vào nhánh hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gọi GitHub là Git**: Git là công cụ; GitHub là một dịch vụ có dùng Git.\n2. **Tưởng commit tự xuất hiện trên GitHub**: Commit trên máy chưa được gửi đi cho tới khi push.\n3. **Tưởng luôn cần Internet**: Nhiều thao tác Git cục bộ vẫn dùng được offline.\n\n---\n\n## 🧪 Lab\n1. Chạy `git remote -v` để kiểm tra repository đã có remote chưa.\n2. Nếu kết quả trống, ghi lại: “Chưa có nơi từ xa được cấu hình”.\n3. Giải thích khi nào bạn cần mạng: lúc muốn trao đổi commit với remote.\n\n---\n\n## 💡 Hint\n> Git lưu lịch sử trên máy; push và pull trao đổi thay đổi với remote.\n\n---\n\n## ✅ Validation\n- Phân biệt chính xác vai trò của Git cục bộ và nền tảng đám mây GitHub.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm sau để xác thực sự phân biệt giữa Git và GitHub.\n\n---\n\n## 🔥 Challenge\nViết hai câu mô tả khác nhau: một câu cho Git và một câu cho GitHub.\n\n---\n\n## 📚 Tổng kết\n- Git giúp lưu và xem lịch sử dự án trên máy.\n- GitHub là một dịch vụ trực tuyến để lưu repository Git và cộng tác.\n- Push gửi commit lên remote; pull lấy thay đổi từ remote về.\n",
  "quiz": {
    "id": "quiz-05-git-vs-github",
    "title": "Trắc nghiệm: Phân biệt Git và GitHub",
    "questions": [
      {
        "id": "q1",
        "question": "Git và GitHub khác nhau thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Git là công cụ trên máy; GitHub là dịch vụ trực tuyến để lưu và cộng tác",
            "correct": true
          },
          {
            "text": "Git và GitHub đều là một loại tài khoản đăng nhập",
            "correct": false
          },
          {
            "text": "Git chỉ chạy trên GitHub",
            "correct": false
          },
          {
            "text": "GitHub là phần mềm cài để thay thế Git",
            "correct": false
          }
        ],
        "explanation": "Git có thể lưu lịch sử ngay trên máy; GitHub là dịch vụ riêng trên Internet."
      },
      {
        "id": "q2",
        "question": "GitHub đóng vai trò gì trong hệ sinh thái phát triển phần mềm?",
        "type": "single",
        "options": [
          {
            "text": "Là dịch vụ đám mây lưu trữ các kho Git từ xa và hỗ trợ cộng tác nhóm chuyên nghiệp",
            "correct": true
          },
          {
            "text": "Là hệ điều hành dùng để cài đặt lên máy chủ thay thế Linux",
            "correct": false
          },
          {
            "text": "Là trình duyệt web tốc độ cao cạnh tranh với Google Chrome",
            "correct": false
          },
          {
            "text": "Là phần mềm diệt virus bảo vệ mã nguồn máy tính",
            "correct": false
          }
        ],
        "explanation": "GitHub lưu repository Git trực tuyến và cung cấp công cụ để nhóm cộng tác."
      },
      {
        "id": "q3",
        "question": "Bạn có thể tạo commit bằng Git khi máy đang offline không?",
        "type": "single",
        "options": [
          {
            "text": "Có, commit được lưu trong repository trên máy",
            "correct": true
          },
          {
            "text": "Không, mọi lệnh Git đều cần Internet",
            "correct": false
          },
          {
            "text": "Chỉ khi đăng nhập GitHub trước",
            "correct": false
          },
          {
            "text": "Chỉ khi máy kết nối cùng mạng Wi-Fi với GitHub",
            "correct": false
          }
        ],
        "explanation": "Tạo commit là thao tác cục bộ; Internet cần thiết khi trao đổi với remote."
      },
      {
        "id": "q4",
        "question": "Lệnh `git push` làm gì khi đã cấu hình remote?",
        "type": "single",
        "options": [
          {
            "text": "Gửi commit từ máy lên repository từ xa",
            "correct": true
          },
          {
            "text": "Tạo commit mới mà không cần bạn yêu cầu",
            "correct": false
          },
          {
            "text": "Xóa repository trên máy",
            "correct": false
          },
          {
            "text": "Cài đặt GitHub vào máy",
            "correct": false
          }
        ],
        "explanation": "Push gửi những commit đã tạo trên máy tới nơi lưu trữ từ xa đã cấu hình."
      }
    ]
  }
};
export default lesson;
