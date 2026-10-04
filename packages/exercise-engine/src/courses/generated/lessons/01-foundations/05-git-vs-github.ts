import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-vs-github",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "05-git-vs-github",
    "title": "Phân biệt Git và GitHub",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [
      "04-git-architecture"
    ],
    "objectives": [
      "Nói được Git là công cụ quản lý lịch sử trên máy còn GitHub là dịch vụ trực tuyến.",
      "Phân biệt commit cục bộ với commit đã chia sẻ lên GitHub.",
      "Nêu được khi nào `push` và `pull` cần mạng."
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
      "git remote -v"
    ]
  },
  "content": "# Phân biệt Git với GitHub: Cỗ máy cục bộ và Bãi đỗ xe đám mây\n\n---\n\n## 🎯 Mục tiêu\n- Xóa bỏ hoàn toàn sự nhầm lẫn kinh điển giữa công cụ cục bộ (Git) và nền tảng dịch vụ đám mây (GitHub).\n- Nắm vững chu trình vận chuyển mã nguồn từ máy cá nhân lên kho chứa trên mây thông qua `push` và `pull`.\n- Sử dụng lệnh `git remote -v` để kiểm tra các đường link kết nối máy chủ của dự án.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git — Động cơ quản lý phiên bản\n- **Nói dễ hiểu:** Phần mềm cốt lõi cài trên máy tính cá nhân để theo dõi, quản lý và bảo vệ lịch sử mã nguồn của bạn.\n- **Ví dụ:** Bạn gõ lệnh tạo commit lưu trạng thái code bài tập lớn trên chiếc laptop của mình hoàn toàn offline.\n- **Đừng nhầm:** Git là phần mềm độc lập, không cần tài khoản, không phải là một website hay mạng xã hội.\n\n### GitHub — Nền tảng lưu trữ và cộng tác trên mây\n- **Nói dễ hiểu:** Dịch vụ trực tuyến cung cấp máy chủ lưu trữ kho Git, giúp các kỹ sư chia sẻ code, review sản phẩm và làm việc nhóm xuyên biên giới.\n- **Ví dụ:** Nhóm bạn đưa dự án lên GitHub để người làm giao diện và người làm cơ sở dữ liệu cùng phối hợp nhịp nhàng.\n- **Đừng nhầm:** GitHub không thay thế Git; nó chỉ là nơi chứa các repo Git trên Internet (tương tự như GitLab hay Bitbucket).\n\n### Remote — Cầu nối liên kết từ xa\n- **Nói dễ hiểu:** Địa chỉ đường dẫn lưu trong repo máy bạn trỏ thẳng tới kho lưu trữ tương ứng trên máy chủ GitHub.\n- **Ví dụ:** Biệt danh `origin` đại diện cho đường dẫn kho GitHub của nhóm bạn.\n- **Đừng nhầm:** Thiết lập remote chỉ là lưu địa chỉ liên lạc; Git không tự động bắn code đi nếu bạn chưa ra lệnh.\n\n### Push — Đẩy mã nguồn lên máy chủ\n- **Nói dễ hiểu:** Hành động vận chuyển toàn bộ các commit bạn đã đóng gói ở máy cá nhân lên kho lưu trữ trên GitHub.\n- **Ví dụ:** Sau một ngày code xong và commit an toàn trên máy, bạn chạy lệnh push để đồng đội có thể nhận được code mới.\n- **Đừng nhầm:** Push không tạo ra commit; lệnh này chỉ chuyển phát các commit đã có sẵn trên máy bạn lên mạng.\n\n### Pull — Kéo và tích hợp mã nguồn về máy\n- **Nói dễ hiểu:** Thao tác tải các commit mới nhất từ GitHub về và tự động gộp vào nhánh code bạn đang làm việc trên máy.\n- **Ví dụ:** Trước khi bắt đầu một ngày làm việc mới, bạn pull về để cập nhật phần code trưởng nhóm vừa duyệt tối qua.\n- **Đừng nhầm:** Pull không đơn thuần là tải file nén; nó chủ động tích hợp lịch sử và có thể yêu cầu bạn xử lý xung đột nếu có.\n\n---\n\n## 🤔 Tại sao cần?\nCó đến chín mươi phần trăm sinh viên mới học nhầm lẫn Git và GitHub là một. Sự ngộ nhận này cực kỳ nguy hiểm: bạn tưởng rằng cứ commit trên máy là đồng đội hay giảng viên đã xem được bài tập! Git là công cụ quản lý trên máy tính của bạn, còn GitHub là máy chủ trung gian để cả nhóm nhìn thấy công việc của nhau. Hiểu rõ sự phân tách này giúp bạn kiểm soát hoàn toàn quy trình: khi nào code an toàn trong máy, và khi nào code chính thức được công khai cho thế giới.\n\n---\n\n## 📖 Định nghĩa\nGit là phần mềm mã nguồn mở chạy cục bộ để quản lý lịch sử tệp tin. GitHub là dịch vụ điện toán đám mây cung cấp không gian lưu trữ và công cụ cộng tác cho các kho Git. Hai nền tảng kết nối với nhau thông qua cấu hình remote cùng các thao tác push và pull.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy liên tưởng đến chiếc điện thoại của bạn: Git giống như ứng dụng Camera dùng để chụp và lưu ảnh vào bộ nhớ máy; còn GitHub giống như mạng xã hội Instagram. Bạn chụp ảnh (commit) thì ảnh mới chỉ nằm trên máy bạn. Muốn bạn bè chiêm ngưỡng và thả tim, bạn bắt buộc phải ấn nút Đăng ảnh (push) lên mạng!\n\n---\n\n## 🖼 Sơ đồ\n```text\nMáy tính của bạn (Cục bộ)                Nền tảng GitHub (Đám mây)\n┌─────────────────────────┐               ┌─────────────────────────┐\n│ [Commit vừa tạo ở máy]  │ ─── push ───► │ [Kho lưu trữ chung]     │\n│                         │               │  └── Đồng đội tải về    │\n│ [Mã nguồn đang làm việc]│ ◄── pull ──── │ [Thay đổi nhóm vừa đưa] │\n└─────────────────────────┘               └─────────────────────────┘\nLưu ý: Commit tạo ở máy KHÔNG BAO GIỜ tự bay lên GitHub nếu chưa push!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nHạn nộp bài tập lớn là nửa đêm. Bạn Hùng hoàn thành code lúc 23h50 và hí hửng commit trên máy tính cá nhân rồi đi ngủ. Sáng hôm sau tỉnh dậy, giảng viên chấm điểm không vì kho GitHub của bạn hoàn toàn trống trơn! Hùng đã mắc lỗi kinh điển: quên gõ lệnh push để vận chuyển các commit từ laptop lên đám mây trước hạn chót.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\n```\n\n---\n\n## 🔍 Giải thích command\n`git remote -v` là câu lệnh giúp bạn tra cứu danh bạ kết nối máy chủ của kho chứa. Lệnh này hiển thị tên viết tắt (thường là `origin`) kèm theo địa chỉ đường dẫn đầy đủ mà bạn dùng để gửi (push) hoặc nhận (pull) mã nguồn với GitHub. Nếu câu lệnh không in ra kết quả nào, nghĩa là dự án hiện tại của bạn hoàn toàn cô lập và chưa được kết nối với bất kỳ dịch vụ đám mây nào.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Ảo tưởng rằng tạo commit trên máy là GitHub tự cập nhật:** Bạn bắt buộc phải thực thi lệnh push thì các commit cục bộ mới xuất hiện trên trang web GitHub.\n2. **Đăng ký tài khoản GitHub nhưng máy chưa cài Git:** GitHub chỉ là trang web; máy tính bạn bắt buộc phải cài đặt phần mềm Git thì mới có thể chạy các câu lệnh từ terminal.\n3. **Nhầm lẫn giữa tải file ZIP và lệnh `git pull`:** Tải file ZIP làm mất sạch lịch sử liên kết và không thể gộp code thông minh như lệnh pull chuyên dụng của Git.\n\n---\n\n## 🧪 Lab\n1. Gõ lệnh `git remote -v` trên cửa sổ dòng lệnh mô phỏng để kiểm tra liên kết máy chủ.\n2. Nếu hệ thống không trả về kết quả, hãy giải thích trạng thái hiện tại của kho chứa.\n3. Phân biệt rõ sự khác nhau về mặt vật lý giữa commit nằm ở máy bạn và commit nằm trên máy chủ GitHub.\n\n---\n\n## 💡 Hint\nHãy ghi nhớ câu châm ngôn: \"Commit là lưu vào máy, Push là gửi lên mây.\" Luôn chạy `git remote -v` để biết chắc chắn code của mình sẽ được bắn về địa chỉ nào.\n\n---\n\n## ✅ Validation\n- Phân biệt chuẩn xác bản chất và chức năng giữa Git (công cụ) và GitHub (nền tảng đám mây).\n- Giải thích được tại sao commit trên máy cá nhân chưa thể hiển thị trên giao diện web GitHub.\n- Sử dụng thành thạo `git remote -v` để kiểm tra cấu hình kết nối từ xa của repository.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để khắc sâu sự phân biệt giữa Git và GitHub. Đọc kỹ phân tích của giảng viên sau mỗi câu hỏi.\n\n---\n\n## 🔥 Challenge\nHãy đóng vai một kỹ sư hướng dẫn giải thích cho một bạn thực tập sinh mới vào công ty hiểu vì sao công ty có thể dùng Git chung với GitLab hoặc Bitbucket mà không nhất thiết phải dùng GitHub.\n\n---\n\n## 📚 Tổng kết\n- Git là phần mềm quản lý phiên bản chạy trực tiếp trên máy tính cá nhân của bạn.\n- GitHub là dịch vụ lưu trữ kho Git trên đám mây, phục vụ mục đích chia sẻ và cộng tác nhóm.\n- Luôn chủ động thực hiện lệnh push để đưa các mốc commit an toàn từ máy tính lên máy chủ dùng chung.\n\n",
  "quiz": {
    "id": "quiz-05-git-vs-github",
    "title": "Trắc nghiệm: Phân biệt Git và GitHub",
    "questions": [
      {
        "id": "q1",
        "question": "Mô tả nào phân biệt Git với GitHub chính xác nhất?",
        "type": "single",
        "options": [
          {
            "text": "Git quản lý lịch sử trên máy; GitHub là dịch vụ trực tuyến để chia sẻ repository",
            "correct": true
          },
          {
            "text": "Git là một tài khoản; GitHub là lệnh dùng để tạo commit",
            "correct": false
          },
          {
            "text": "Git chỉ có thể chạy bên trong trang GitHub",
            "correct": false
          },
          {
            "text": "GitHub thay thế hoàn toàn Git và lưu mọi thay đổi tự động",
            "correct": false
          }
        ],
        "explanation": "Git là phần mềm quản lý phiên bản; GitHub là dịch vụ trực tuyến. Bạn có thể dùng Git trên máy mà không mở trang GitHub."
      },
      {
        "id": "q2",
        "question": "Một nhóm dùng GitHub. GitHub giúp nhóm làm việc gì?",
        "type": "single",
        "options": [
          {
            "text": "Chia sẻ repository Git trực tuyến và cùng xem xét công việc",
            "correct": true
          },
          {
            "text": "Tạo mọi commit cục bộ mà không cần Git trên máy",
            "correct": false
          },
          {
            "text": "Thay Git thành một hệ điều hành chuyên dụng cho lập trình",
            "correct": false
          },
          {
            "text": "Bảo đảm mọi thay đổi được tự động đồng bộ tức thì",
            "correct": false
          }
        ],
        "explanation": "GitHub lưu repository Git trực tuyến và có công cụ cộng tác. Thành viên vẫn cần gửi hoặc lấy thay đổi để trao đổi commit."
      },
      {
        "id": "q3",
        "question": "Repository đã được tạo và cấu hình đầy đủ. Bạn đang offline; thao tác nào vẫn làm được?",
        "type": "single",
        "options": [
          {
            "text": "Tạo commit mới trong repository trên máy",
            "correct": true
          },
          {
            "text": "Push commit mới lên GitHub ngay lập tức",
            "correct": false
          },
          {
            "text": "Pull thay đổi mới nhất từ GitHub",
            "correct": false
          },
          {
            "text": "Cập nhật repository trên laptop của thành viên khác",
            "correct": false
          }
        ],
        "explanation": "Tạo commit là thao tác trên repository cục bộ nên không cần mạng. Push và pull trao đổi với GitHub nên cần kết nối."
      },
      {
        "id": "q4",
        "question": "Lệnh nào gửi các commit đã lưu trên máy lên remote tên `origin`?",
        "type": "single",
        "options": [
          {
            "text": "`git push origin main`",
            "correct": true
          },
          {
            "text": "`git pull origin main`",
            "correct": false
          },
          {
            "text": "`git remote -v`",
            "correct": false
          },
          {
            "text": "`git status`",
            "correct": false
          }
        ],
        "explanation": "`git push origin main` gửi commit từ nhánh `main` lên remote `origin`. Lệnh cần remote đã cấu hình và quyền truy cập phù hợp."
      },
      {
        "id": "q5",
        "question": "`git remote -v` cho bạn biết điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Các remote đã cấu hình cùng tên và địa chỉ của chúng",
            "correct": true
          },
          {
            "text": "Mọi commit trên máy đã được gửi hay chưa trong mọi trường hợp",
            "correct": false
          },
          {
            "text": "Tên và email tác giả của commit mới nhất",
            "correct": false
          },
          {
            "text": "Các tệp sẽ bị xóa khi bạn chạy pull",
            "correct": false
          }
        ],
        "explanation": "`git remote -v` hiển thị các nơi repository đã kết nối tới. Nó không thay cho trạng thái tệp hay cho biết đầy đủ lịch sử commit."
      }
    ]
  }
};
export default lesson;
