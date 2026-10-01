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
  "content": "# Phân biệt Git với GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Nói được Git là công cụ cục bộ, còn GitHub là dịch vụ trực tuyến.\n- Phân biệt commit trên máy với commit đã chia sẻ lên GitHub.\n- Nêu được khi nào `push` và `pull` cần mạng.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git — công cụ quản lý phiên bản\n- **Nói dễ hiểu:** Phần mềm trên máy giúp bạn quản lý và xem lịch sử dự án.\n- **Ví dụ:** Bạn tạo commit bằng Git trong repository trên laptop.\n- **Đừng nhầm:** Git không phải tài khoản hay trang web.\n\n### GitHub — dịch vụ cộng tác trực tuyến\n- **Nói dễ hiểu:** Dịch vụ trên Internet để lưu repository Git và giúp mọi người chia sẻ, xem xét công việc.\n- **Ví dụ:** Nhóm đưa repository lên GitHub để các thành viên cùng xem và góp ý.\n- **Đừng nhầm:** GitHub là một dịch vụ dùng Git; GitLab và các dịch vụ khác cũng có thể lưu repository Git.\n\n### Remote — tên kết nối tới kho Git khác\n- **Nói dễ hiểu:** Một tên trong repository cục bộ trỏ tới kho Git ở nơi khác để Git biết nơi gửi hoặc lấy dữ liệu.\n- **Ví dụ:** `origin` thường là tên remote trỏ tới repository nhóm trên GitHub.\n- **Đừng nhầm:** Có remote không làm Git tự đồng bộ; bạn vẫn phải yêu cầu gửi hoặc lấy dữ liệu.\n\n### Push — gửi commit lên kho khác\n- **Nói dễ hiểu:** Gửi các commit đã lưu trong repository trên máy tới remote.\n- **Ví dụ:** Push commit lên GitHub để thành viên khác có thể lấy về.\n- **Đừng nhầm:** Push cần có remote, mạng và quyền truy cập phù hợp; lệnh không tạo commit thay bạn.\n\n### Pull — lấy và tích hợp thay đổi\n- **Nói dễ hiểu:** Lấy thay đổi từ remote về rồi tích hợp chúng vào nhánh bạn đang làm.\n- **Ví dụ:** Pull thay đổi mới mà nhóm đã gửi lên GitHub trước khi bạn tiếp tục làm.\n- **Đừng nhầm:** Pull có thể cần xử lý xung đột; nó không đơn giản chỉ tải một tệp ZIP.\n\n---\n\n## 🤔 Tại sao cần?\nGit lưu lịch sử trong repository trên máy; GitHub là một nơi trực tuyến để chia sẻ repository với nhóm. Bạn có thể làm nhiều việc cục bộ khi offline. Muốn đồng nghiệp nhận commit của bạn hoặc muốn lấy commit họ đã chia sẻ, bạn cần kết nối và dùng push hoặc pull.\n\n---\n\n## 📖 Định nghĩa\nGit là công cụ quản lý phiên bản chạy trên máy bạn. GitHub là một dịch vụ trực tuyến để lưu repository Git và hỗ trợ cộng tác. Một commit mới tạo trong repository cục bộ chưa tự có trên GitHub; push gửi commit đi, còn pull lấy và tích hợp thay đổi từ kho đã kết nối.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ repository trên laptop là cuốn sổ lịch sử của bạn. GitHub là một cuốn sổ khác mà nhóm cùng truy cập. Push gửi mốc từ sổ của bạn sang sổ nhóm; pull lấy mốc từ sổ nhóm về để tiếp tục làm.\n\n---\n\n## 🖼 Sơ đồ\n```text\nRepository trên máy bạn                 Repository trên GitHub\n       [commit cục bộ] ─── push ───► [commit nhóm có thể nhận]\n       [các tệp hiện tại] ◄── pull ─ [thay đổi nhóm đã chia sẻ]\n\nCommit được tạo trên máy chưa tự xuất hiện ở phía GitHub.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đang đi học và mất mạng. Bạn vẫn mở dự án và tạo commit trong repository trên laptop. Khi mạng có lại, bạn push commit lên GitHub để nhóm nhận. Nếu một thành viên đã gửi thay đổi trước đó, bạn pull chúng về trước khi tiếp tục. Push/pull chỉ chạy được khi remote đã cấu hình và bạn có quyền truy cập.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\n```\n\n---\n\n## 🔍 Giải thích command\n`git remote -v` liệt kê tên và địa chỉ các remote đã cấu hình. `git push origin main` gửi commit lên remote tên `origin`; `git pull origin main` lấy và tích hợp thay đổi từ đó. Hai lệnh sau chỉ chạy khi remote, nhánh và quyền truy cập đã sẵn sàng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gọi GitHub là Git:** Git quản lý lịch sử; GitHub là dịch vụ trực tuyến dùng để chia sẻ repository.\n2. **Tưởng commit tự xuất hiện trên GitHub:** Cần push commit lên remote để người khác nhận được.\n3. **Pull nghĩa là chỉ tải tệp:** Pull còn tích hợp thay đổi vào nhánh hiện tại và đôi khi cần xử lý xung đột.\n\n---\n\n## 🧪 Lab\n1. Chạy `git remote -v` trong terminal mô phỏng.\n2. Nếu chưa có kết quả, ghi “repository này chưa cấu hình nơi chia sẻ”; đừng chạy push hoặc pull.\n3. Phân loại bốn việc: tạo commit, xem tệp trên máy, push commit, pull thay đổi.\n4. Giải thích vì sao một commit vừa tạo trên máy chưa chắc đã hiện trên GitHub.\n\n---\n\n## 💡 Hint\nCommit được lưu cục bộ trước. Push gửi commit đi; pull nhận thay đổi về. Nếu `git remote -v` trống, máy chưa biết nơi trao đổi dữ liệu.\n\n---\n\n## ✅ Validation\n- Phân biệt đúng Git, GitHub và remote.\n- Nói được push gửi commit, pull lấy và tích hợp thay đổi.\n- Nhận ra commit cục bộ chưa tự xuất hiện trên GitHub.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Khi sai, đọc giải thích rồi thử lại.\n\n---\n\n## 🔥 Challenge\nGiải thích tình huống: “Tôi đã tạo commit nhưng bạn cùng nhóm chưa thấy trên GitHub.” Nêu bước còn thiếu và điều kiện để bước đó chạy được.\n\n---\n\n## 📚 Tổng kết\n- Git lưu lịch sử trong repository trên máy; GitHub là dịch vụ để chia sẻ repository.\n- Remote lưu tên kết nối tới một kho Git khác.\n- Push gửi commit đi; pull lấy và tích hợp thay đổi về.\n",
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
