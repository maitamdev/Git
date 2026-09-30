import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "19-reflog-internals",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "19-reflog-internals",
    "title": "Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "18-refspec-and-remotes"
    ],
    "objectives": [
      "Giải mã cấu trúc bên trong thư mục nhật ký .git/logs/ (gồm logs/HEAD và logs/refs/heads/).",
      "Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.",
      "Sử dụng kiến thức Reflog Internals để giải cứu mã nguồn khi mọi lệnh Porcelain đều từ chối hoạt động."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "reflog internals",
      "git logs directory",
      "history of heads",
      "recovery safety net",
      "commit salvage"
    ],
    "commands": [
      "cat .git/logs/HEAD",
      "git reflog",
      "git log -g"
    ]
  },
  "content": "# Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Giải mã cấu trúc bên trong thư mục nhật ký .git/logs/ (gồm logs/HEAD và logs/refs/heads/).\n- Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.\n- Sử dụng kiến thức Reflog Internals để giải cứu mã nguồn khi mọi lệnh Porcelain đều từ chối hoạt động.\n\n---\n\n## 📖 Định nghĩa\n> Reflog (viết tắt của Reference Log - Nhật ký tham chiếu) là một hệ thống tệp tin nhật ký tuần tự nằm bên trong thư mục .git/logs/. Khác với git log ghi lại lịch sử tiến hóa của các commit trong dự án, Reflog ghi lại toàn bộ lịch sử di chuyển của các con trỏ tham chiếu (đặc biệt là con trỏ HEAD và các nhánh cục bộ) trên chính máy tính của bạn. Mỗi khi con trỏ HEAD thay đổi tọa độ (do commit, checkout, switch, rebase, merge hay reset), một dòng văn bản mới sẽ được nối thêm vào tệp .git/logs/HEAD.\n\n---\n\n## 🤔 Tại sao cần?\nReflog là tấm lưới bảo hiểm an toàn tối thượng của Git. Khi một lập trình viên vô tình gõ `git reset --hard` hay lỡ tay rebase làm mất các commit quan trọng, lịch sử thông thường (`git log`) sẽ không còn hiển thị những commit đó nữa. Nhưng vì con trỏ HEAD từng đi qua commit đó trong quá khứ, tọa độ mã băm SHA-1 của nó vẫn được ghi lại sắc nét bên trong tệp nhật ký `.git/logs/HEAD`. Nhờ Reflog, hầu như không có gì có thể thực sự biến mất khỏi Git trong vòng 30 đến 90 ngày.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng hộp đen ghi lại hành trình bay chuyên dụng của một chiếc máy bay trực thăng hiện đại. Chiếc trực thăng (HEAD) bay qua ngọn đồi A, đáp xuống đỉnh núi B rồi quay về trạm sân bay C. Dù bạn có xóa sạch lộ trình trên tấm bản đồ du lịch thông thường (git log), thì chiếc hộp đen (.git/logs/HEAD) vẫn ghi lại chính xác từng giây từng phút chiếc trực thăng đã ở tọa độ nào, xuất phát từ đâu và vì lý do cụ thể gì.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nGiải phẫu cấu trúc tệp nhật ký .git/logs/HEAD:\n[Old SHA-1 (40B)] [New SHA-1 (40B)] [Committer Name <Email> Timestamp TZ] [Action / Message]\n\nVí dụ một dòng thực tế bên trong tệp .git/logs/HEAD:\n0000000000000000000000000000000000000000 7a8b9c4d Nam <nam@dev.com> 1727654400 +0700 commit (initial): init\n7a8b9c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b c5d4e3f2 Nam <nam@dev.com> 1727654500 +0700 commit: add login\nc5d4e3f2a1b09876543210fedcba9876543210fe 7a8b9c4d Nam <nam@dev.com> 1727654600 +0700 reset: moving to HEAD~1\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư trong lúc xử lý xung đột rebase đã bấm nhầm phím và làm mất toàn bộ nhánh tính năng của hai tuần làm việc. Lệnh git log chỉ hiển thị nhánh main cũ kỹ. Kỹ sư không hề nao núng, mở terminal và sử dụng lệnh đọc trực tiếp: `cat .git/logs/HEAD`. Trước mắt kỹ sư hiện ra danh sách toàn bộ các thao tác gần nhất kèm theo lý do rõ ràng. Dòng thứ 3 từ dưới lên ghi rõ: `7a8b9c4d 3b18e5a1 checkout: moving from feature to main`. Kỹ sư lập tức sao chép mã băm `3b18e5a1` và gõ lệnh: `git switch -c rescued-feature 3b18e5a1`. Nhánh tính năng được phục sinh hoàn hảo từng dòng code trong sự thán phục của toàn bộ đồng nghiệp trong phòng.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ncat .git/logs/HEAD\ngit reflog\ngit log -g\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh cat .git/logs/HEAD cho phép xem trực tiếp cấu trúc tệp nhật ký thô được lưu trữ bên dưới đĩa cứng, git reflog hiển thị danh sách thân thiện với con người, và git log -g duyệt toàn bộ lịch sử commit dựa trên các mục trong reflog thay vì cây commit thông thường.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nghĩ rằng Reflog được đồng bộ lên remote GitHub**:  Reflog là dữ liệu hoàn toàn CỤC BỘ trên máy bạn, không bao giờ được gửi qua lệnh push.\n2. **Để quá thời hạn hết hạn (expire) của Reflog**:  Mặc định Git sẽ dọn dẹp các mục reflog không thể tiếp cận sau 30 ngày (unreachable) và 90 ngày (reachable).\n3. **Xóa thủ công thư mục `.git/logs/` khiến bạn mất đi chiếc phao cứu sinh duy nhất khi gặp sự cố.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Sử dụng lệnh `cat .git/logs/HEAD` để xem nội dung nhật ký chuyển dịch thô của con trỏ HEAD.\n2. Thực hiện một vài thao tác chuyển nhánh `git switch` và tạo commit mới, sau đó kiểm tra lại tệp log.\n3. Sử dụng cú pháp reflog đặc biệt `HEAD@{1}` để xem trạng thái ngay trước thao tác gần nhất.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Mỗi nhánh cục bộ đều có tệp nhật ký riêng trong thư mục `.git/logs/refs/heads/<branch-name>`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nĐọc và đối chiếu được từng trường dữ liệu trong dòng nhật ký thô của tệp .git/logs/HEAD.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra kiến thức về cấu trúc và sức mạnh cứu hộ của Reflog qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để cấu hình thời gian sống của các mục Reflog lâu hơn mặc định thông qua thuộc tính gc.reflogExpire trong tệp .git/config?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Reflog là tệp nhật ký cục bộ ghi lại mọi sự di chuyển của con trỏ HEAD và các nhánh.\n- Lưu trữ trong `.git/logs/HEAD` dưới dạng các dòng văn bản thuần ghi nhận old-hash, new-hash và hành động.\n- Là công cụ cứu hộ dữ liệu mạnh mẽ nhất của Git, giúp phục hồi mọi commit bị mất trong vòng 30 đến 90 ngày.\n",
  "quiz": {
    "id": "quiz-08-git-internals-19-reflog-internals",
    "title": "Trắc nghiệm: Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)",
    "questions": [
      {
        "id": "q1",
        "question": "Dữ liệu Reflog được lưu trữ vật lý trong thư mục nào của kho lưu trữ?",
        "type": "single",
        "options": [
          {
            "text": ".git/logs/",
            "correct": true
          },
          {
            "text": ".git/history/",
            "correct": false
          },
          {
            "text": ".git/records/",
            "correct": false
          },
          {
            "text": ".git/backups/",
            "correct": false
          }
        ],
        "explanation": "Toàn bộ các tệp nhật ký tham chiếu được lưu trữ ngăn nắp trong thư mục `.git/logs/`."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh `git push origin main`, dữ liệu Reflog của bạn có được đẩy lên GitHub không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không, Reflog là dữ liệu riêng tư cục bộ 100% trên máy tính của bạn",
            "correct": true
          },
          {
            "text": "Có, toàn bộ lịch sử reflog được đồng bộ lên server",
            "correct": false
          },
          {
            "text": "Chỉ các mục reflog của ngày hôm nay mới được gửi",
            "correct": false
          },
          {
            "text": "Chỉ đẩy lên nếu có cờ --force",
            "correct": false
          }
        ],
        "explanation": "Reflog chỉ ghi lại hành vi di chuyển con trỏ trên máy cá nhân, không thuộc về lịch sử chung của dự án nên không bao giờ được push."
      },
      {
        "id": "q3",
        "question": "Mỗi dòng bản ghi trong tệp `.git/logs/HEAD` chứa những trường thông tin chính nào?",
        "type": "single",
        "options": [
          {
            "text": "Old SHA-1, New SHA-1, Thông tin người thực hiện, Dấu thời gian, và Lý do hành động",
            "correct": true
          },
          {
            "text": "Toàn bộ nội dung các tệp tin mã nguồn",
            "correct": false
          },
          {
            "text": "Mật khẩu đăng nhập máy tính",
            "correct": false
          },
          {
            "text": "Địa chỉ IP của người dùng",
            "correct": false
          }
        ],
        "explanation": "Cấu trúc tệp nhật ký ghi rõ mã băm trước và sau khi di chuyển, ai làm, vào lúc nào và hành động là gì (commit, checkout, rebase v.v.)."
      },
      {
        "id": "q4",
        "question": "Thời gian lưu trữ mặc định của các mục Reflog không thể tiếp cận (unreachable) trước khi bị dọn rác là bao lâu?",
        "type": "single",
        "options": [
          {
            "text": "30 ngày",
            "correct": true
          },
          {
            "text": "1 ngày",
            "correct": false
          },
          {
            "text": "365 ngày",
            "correct": false
          },
          {
            "text": "Vĩnh viễn không bao giờ xóa",
            "correct": false
          }
        ],
        "explanation": "Git cấu hình mặc định thời gian hết hạn cho các mục không thể tiếp cận là 30 ngày (`gc.reflogExpireUnreachable`)."
      }
    ]
  }
};
export default lesson;
