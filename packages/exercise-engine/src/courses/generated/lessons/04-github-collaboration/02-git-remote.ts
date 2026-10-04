import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-git-remote",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "02-git-remote",
    "title": "Quản lý remote với git remote",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-local-vs-remote"
    ],
    "objectives": [
      "Sử dụng thành thạo câu lệnh `git remote` để quản trị danh sách các kho lưu trữ từ xa.",
      "Biết cách liên kết một kho cục bộ vừa tạo với kho từ xa trên GitHub bằng `git remote add`.",
      "Đổi tên và thay đổi đường dẫn URL của remote an toàn khi dự án đổi tên miền hoặc tổ chức.",
      "Xóa bỏ các liên kết remote không còn sử dụng bằng lệnh `git remote remove`."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "upstream-setup"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git remote",
      "remote add",
      "remote remove",
      "remote set-url",
      "origin",
      "lien ket kho"
    ],
    "commands": [
      "git remote",
      "git remote -v",
      "git remote add <tên-bí-danh> <url>",
      "git remote rename <tên-cũ> <tên-mới>",
      "git remote set-url <tên-bí-danh> <url-mới>",
      "git remote remove <tên-bí-danh>"
    ]
  },
  "content": "# Quản lý remote với git remote\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo `git remote` để quản trị danh bạ các máy chủ từ xa liên kết với dự án.\n- Thiết lập liên kết kho cục bộ với GitHub bằng lệnh `git remote add`.\n- Cập nhật địa chỉ URL và chuyển đổi giao thức HTTPS/SSH an toàn bằng `git remote set-url`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git remote\n- **Nói dễ hiểu:** Lệnh quản lý danh bạ các máy chủ từ xa mà kho lưu trữ trên máy bạn đang thiết lập kết nối tới.\n- **Ví dụ:** Gõ `git remote -v` để xem danh sách toàn bộ máy chủ kèm đường link URL tương ứng cho hai chiều nạp và đẩy.\n- **Đừng nhầm:** Lệnh chỉ làm việc với file cấu hình danh bạ mạng, hoàn toàn không tải hay đẩy mã nguồn lên mạng ngay lập tức.\n\n### git remote add\n- **Nói dễ hiểu:** Thao tác thêm một địa chỉ kho lưu trữ từ xa mới vào danh bạ và đặt cho nó một bí danh ngắn gọn.\n- **Ví dụ:** `git remote add origin https://github.com/alice/project.git` liên kết kho cục bộ với repo trên GitHub.\n- **Đừng nhầm:** Lệnh chỉ ghi một dòng cấu hình vào file `.git/config`, hoàn toàn chưa đẩy bất kỳ commit nào lên GitHub.\n\n### git remote set-url\n- **Nói dễ hiểu:** Cập nhật lại đường dẫn URL mới cho một bí danh máy chủ đã tồn tại sẵn trong danh bạ.\n- **Ví dụ:** `git remote set-url origin git@github.com:my-org/app.git` khi muốn chuyển từ giao thức HTTPS sang SSH.\n- **Đừng nhầm:** Lệnh chỉ thay đổi địa chỉ kết nối đích, tuyệt đối không làm mất mát hay ảnh hưởng tới lịch sử commit của dự án.\n\n---\n\n## 📖 Định nghĩa\n`git remote` là công cụ chỉ huy danh bạ mạng của Git, quản lý toàn bộ các liên kết tham chiếu giữa kho lưu trữ cục bộ với các máy chủ từ xa. Lệnh giúp bạn gán những bí danh (alias) ngắn gọn như `origin` hay `upstream` cho các chuỗi URL dài dòng, hỗ trợ kiểm tra cấu hình, đổi tên miền và chuyển đổi linh hoạt giữa giao thức HTTPS và SSH.\n\n---\n\n## 🤔 Tại sao cần?\nKhi bạn khởi tạo một dự án bằng `git init`, máy tính của bạn hoàn toàn bị cô lập như một hoang đảo chưa có đường dây liên lạc với thế giới bên ngoài. Lệnh `git remote` chính là cây cầu nối dây điện thoại đầu tiên, cho phép kho mã nguồn của bạn biết chính xác máy chủ GitHub nằm ở đâu để sẵn sàng cho các thao tác đẩy và kéo dữ liệu xuyên suốt dự án.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git remote` như ứng dụng danh bạ trên điện thoại thông minh của bạn. Thay vì mỗi lần muốn gọi điện hay gửi tin nhắn bạn phải bấm một dãy số quốc tế dài ngoằng khó nhớ (`https://github.com/org/repo.git`), bạn lưu số đó vào danh bạ với tên thân thương là `origin`. Khi cần gửi đồ, bạn chỉ việc bảo bưu tá: 'Gửi đến origin!'.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ ÁNH XẠ BÍ DANH CỦA GIT REMOTE:\n\nBí danh ngắn gọn (Alias):      Địa chỉ URL thực tế trên máy chủ đám mây:\n[origin]                 ──►  https://github.com/my-org/my-app.git\n[upstream]               ──►  https://github.com/original-author/my-app.git\n\nLưu trữ vật lý tại: .git/config\n  [remote \"origin\"]\n      url = https://github.com/my-org/my-app.git\n      fetch = +refs/heads/*:refs/remotes/origin/*\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nCông ty bạn chuyển đổi toàn bộ mã nguồn từ GitLab cũ sang GitHub Enterprise mới. Thay vì phải xóa dự án clone lại từ đầu, bạn chỉ cần mở terminal gõ đúng một lệnh: `git remote set-url origin https://github.com/enterprise/project.git`. Ngay lập tức, mọi thao tác `git push` và `git pull` hàng ngày chuyển hướng sang máy chủ mới mượt mà.\n\n---\n\n## 💻 Command\n```bash\ngit remote\ngit remote -v\ngit remote add <tên-bí-danh> <url>\ngit remote set-url <tên-bí-danh> <url-mới>\ngit remote remove <tên-bí-danh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote`: Liệt kê tên các bí danh máy chủ đang lưu trong danh bạ.\n- `git remote -v`: In chi tiết từng bí danh kèm địa chỉ URL cho 2 chiều fetch và push.\n- `git remote add <tên> <url>`: Đăng ký một máy chủ mới vào danh bạ liên kết.\n- `git remote set-url <tên> <url-mới>`: Cập nhật URL mới khi dự án đổi tên miền hoặc đổi giao thức mạng.\n- `git remote remove <tên>`: Xóa sạch cấu hình liên kết máy chủ khỏi máy tính cá nhân.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gõ sai chính tả URL của repo**: Dẫn đến lỗi 404 Not Found hoặc lỗi xác thực khi chạy lệnh push/pull về sau.\n2. **Thêm trùng bí danh origin đã có sẵn**: Git sẽ báo lỗi `fatal: remote origin already exists`; lúc này hãy dùng `set-url` để sửa.\n3. **Hiểu nhầm lệnh remote remove xóa repo trên GitHub**: Lệnh chỉ gỡ dòng cấu hình trong file `.git/config` trên máy bạn; máy chủ GitHub vẫn an toàn 100%.\n\n---\n\n## 🧪 Lab\n1. Chạy `git remote -v` để kiểm tra các liên kết remote hiện có.\n2. Thêm một remote thử nghiệm: `git remote add training-backup https://example.com/team/project.git`.\n3. Chạy `git remote -v` để thấy 2 dòng fetch và push mới xuất hiện.\n4. Cập nhật địa chỉ: `git remote set-url training-backup https://example.com/team/project-v2.git`.\n5. Dọn dẹp cấu hình: `git remote remove training-backup`, rồi chạy lại `git remote -v` để xác nhận danh bạ đã sạch sẽ.\n\n---\n\n## 💡 Hint\n> Khi chuyển từ HTTPS sang SSH để không phải nhập token mật khẩu mỗi lần push, dùng lệnh `git remote set-url origin git@github.com:user/repo.git`!\n\n---\n\n## ✅ Validation\n- Lệnh `git remote -v` phản hồi chính xác địa chỉ URL đã cấu hình.\n- Thao tác cập nhật URL và xóa remote diễn ra chuẩn xác không gây lỗi hệ thống.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để kiểm tra năng lực quản trị liên kết máy chủ từ xa bằng lệnh git remote.\n\n---\n\n## 🔥 Challenge\nHãy mở file `.git/config` trong thư mục dự án và quan sát khối `[remote \"origin\"]`. Hãy phân tích cấu trúc của dòng `fetch = +refs/heads/*:refs/remotes/origin/*` (Refspec) và cho biết nó có ý nghĩa kỹ thuật gì khi bạn chạy `git fetch`?\n\n---\n\n## 📚 Tổng kết\n- `git remote` là trung tâm điều phối danh bạ kết nối máy chủ từ xa của dự án.\n- Sử dụng `git remote add` để liên kết kho cục bộ và `git remote set-url` để đổi URL linh hoạt.\n- Xóa remote chỉ tác động lên file cấu hình nội bộ, hoàn toàn không ảnh hưởng tới dữ liệu trên đám mây.\n",
  "quiz": {
    "id": "quiz-04-02-git-remote",
    "title": "Trắc nghiệm: Quản lý remote với git remote",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào sau đây dùng để liên kết kho lưu trữ cục bộ với một kho trên GitHub có tên bí danh là `origin`?",
        "type": "single",
        "options": [
          {
            "text": "git remote add origin https://github.com/user/repo.git",
            "correct": true
          },
          {
            "text": "git connect github https://github.com/user/repo.git",
            "correct": false
          },
          {
            "text": "git link cloud origin https://github.com/user/repo.git",
            "correct": false
          },
          {
            "text": "git push --set-remote https://github.com/user/repo.git",
            "correct": false
          }
        ],
        "explanation": "`git remote add <tên> <url>` là cú pháp chuẩn để thiết lập liên kết với kho từ xa."
      },
      {
        "id": "q2",
        "question": "Cờ tùy chọn `-v` trong câu lệnh `git remote -v` có ý nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Verbose: Hiển thị chi tiết địa chỉ URL đầy đủ cho cả hai chiều fetch và push",
            "correct": true
          },
          {
            "text": "Verify: Tự động kiểm tra mật khẩu tài khoản người dùng",
            "correct": false
          },
          {
            "text": "Version: Hiển thị phiên bản phần mềm Git đang cài trên máy tính",
            "correct": false
          },
          {
            "text": "Virtual: Tạo một kho lưu trữ ảo trong bộ nhớ RAM",
            "correct": false
          }
        ],
        "explanation": "`-v` (verbose) yêu cầu Git in ra đầy đủ chi tiết đường dẫn URL của từng remote."
      },
      {
        "id": "q3",
        "question": "Nếu công ty của bạn chuyển đổi tên miền máy chủ và bạn cần cập nhật URL mới cho `origin`, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git remote set-url origin <url-mới>",
            "correct": true
          },
          {
            "text": "git remote update-domain origin <url-mới>",
            "correct": false
          },
          {
            "text": "git change origin <url-mới>",
            "correct": false
          },
          {
            "text": "git url reset origin <url-mới>",
            "correct": false
          }
        ],
        "explanation": "`git remote set-url <tên> <url-mới>` thay đổi trực tiếp URL đích mà không cần xóa đi tạo lại."
      },
      {
        "id": "q4",
        "question": "Điều gì thực sự xảy ra khi bạn chạy lệnh `git remote remove origin` trên máy tính cá nhân?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ có dòng cấu hình liên kết origin bị xóa khỏi tệp .git/config cục bộ, kho trên GitHub vẫn an toàn 100%",
            "correct": true
          },
          {
            "text": "Toàn bộ kho chứa của công ty trên GitHub sẽ bị xóa vĩnh viễn",
            "correct": false
          },
          {
            "text": "Mã nguồn trong Working Directory bị biến mất hoàn toàn",
            "correct": false
          },
          {
            "text": "Tài khoản GitHub của bạn bị khóa vĩnh viễn",
            "correct": false
          }
        ],
        "explanation": "Lệnh này chỉ gỡ bỏ cấu hình định danh cục bộ, hoàn toàn không tác động đến dữ liệu trên máy chủ remote."
      },
      {
        "id": "q5",
        "question": "Thông tin cấu hình của các remote được Git lưu trữ nội bộ tại tệp tin nào trong dự án?",
        "type": "single",
        "options": [
          {
            "text": ".git/config",
            "correct": true
          },
          {
            "text": ".git/remotes.json",
            "correct": false
          },
          {
            "text": "package.json",
            "correct": false
          },
          {
            "text": "README.md",
            "correct": false
          }
        ],
        "explanation": "Các khối cấu hình `[remote \"origin\"]` được ghi trực tiếp vào tệp văn bản cấu hình `.git/config`."
      },
      {
        "id": "q6",
        "question": "Một kho lưu trữ Git cục bộ có thể liên kết tới bao nhiêu kho từ xa (remotes) cùng lúc?",
        "type": "single",
        "options": [
          {
            "text": "Không giới hạn, bạn có thể thêm nhiều remote khác nhau như origin, upstream, backup",
            "correct": true
          },
          {
            "text": "Duy nhất chỉ một remote mà thôi",
            "correct": false
          },
          {
            "text": "Tối đa hai remote cho hai lập trình viên",
            "correct": false
          },
          {
            "text": "Tối đa mười remote",
            "correct": false
          }
        ],
        "explanation": "Git hỗ trợ liên kết với bao nhiêu remote tùy ý, cực kỳ phổ biến trong mô hình fork/upstream."
      }
    ]
  }
};
export default lesson;
