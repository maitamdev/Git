import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-local-vs-remote",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "01-local-vs-remote",
    "title": "Local vs Remote Repository",
    "level": "intermediate",
    "duration": 25,
    "xp": 75,
    "prerequisites": [
      "06-git-commit"
    ],
    "objectives": [
      "Hiểu rõ sự khác biệt bản chất giữa kho lưu trữ cục bộ (Local Repository) và kho từ xa (Remote Repository).",
      "Nắm bắt vai trò của máy chủ trung tâm (như GitHub, GitLab) trong mô hình kiểm soát phiên bản phân tán.",
      "Giải thích cơ chế đồng bộ hóa dữ liệu hai chiều thông qua các giao thức mạng bảo mật.",
      "Nhận biết lý do vì sao Git vẫn hoạt động 100% công năng ngay cả khi hoàn toàn mất kết nối Internet."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "local repo",
      "remote repo",
      "kho cuc bo",
      "kho tu xa",
      "github cloud",
      "phan tan"
    ],
    "commands": [
      "git remote -v",
      "git status",
      "git branch -a"
    ]
  },
  "content": "# Local vs Remote Repository\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự khác biệt bản chất giữa kho lưu trữ cục bộ (Local Repository) và kho từ xa (Remote Repository).\n- Nắm bắt vai trò của máy chủ trung tâm (như GitHub, GitLab) trong mô hình kiểm soát phiên bản phân tán.\n- Giải thích cơ chế đồng bộ hóa dữ liệu hai chiều thông qua các giao thức mạng bảo mật.\n- Nhận biết lý do vì sao Git vẫn hoạt động 100% công năng ngay cả khi hoàn toàn mất kết nối Internet.\n\n---\n\n## 📖 Định nghĩa\n> Trong kiến trúc phân tán của Git, Local Repository (kho lưu trữ cục bộ) là toàn bộ cơ sở dữ liệu lịch sử hoàn chỉnh được lưu trữ ngay trên ổ đĩa cứng máy tính cá nhân của lập trình viên (trong thư mục ẩn `.git`). Ngược lại, Remote Repository (kho lưu trữ từ xa) là một phiên bản kho chứa được lưu trữ trên một máy chủ chuyên dụng đặt trên mạng nội bộ hoặc trên nền tảng đám mây (tiêu biểu như GitHub, GitLab, Bitbucket). Hai kho chứa này tồn tại hoàn toàn độc lập với nhau và chỉ trao đổi dữ liệu khi bạn chủ động thực hiện các lệnh đồng bộ hóa mạng.\n\n---\n\n## 🤔 Tại sao cần?\nLập trình viên làm việc độc lập trên máy cá nhân có thể commit mã nguồn hàng trăm lần mà không cần kết nối mạng. Tuy nhiên, để làm việc nhóm, chia sẻ mã nguồn với đồng nghiệp, lưu trữ bản sao dự phòng an toàn và kích hoạt các quy trình kiểm thử tự động CI/CD, bạn bắt buộc phải kết nối kho cục bộ với một kho từ xa trên GitHub. Hiểu đúng mối quan hệ độc lập nhưng liên kết này giúp bạn tránh tâm lý sợ hãi làm hỏng server từ xa khi mới làm quen với Git.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Local Repository giống như cuốn sổ tay nhật ký cá nhân mà bạn để trong ngăn kéo bàn làm việc tại nhà riêng. Bạn có thể thoải mái viết nháp, tẩy xóa và vẽ biểu đồ vào sổ bất cứ lúc nào mà không ai nhìn thấy. Remote Repository trên GitHub giống như chiếc bảng tin công cộng đặt tại sảnh trung tâm của công ty. Thỉnh thoảng, khi đã viết xong một bài phân tích hoàn chỉnh trong sổ tay, bạn đem photo một bản sạch đẹp rồi dán lên bảng tin công ty để tất cả đồng nghiệp cùng đọc và góp ý.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMô hình Local vs Remote Repository:\nMáy tính cá nhân (Local):       Máy chủ GitHub (Remote):\n┌─────────────────────────┐     ┌─────────────────────────┐\n│ Working Directory       │     │                         │\n│ Staging Area            │     │  Remote Repository      │\n│ Local Repo (.git)       │◄───►│  (origin/main)          │\n│ (commit offline)        │     │  (đám mây lưu trữ)      │\n└─────────────────────────┘     └─────────────────────────┘\n        ▲                                    ▲\n        └──────── push / fetch / pull ───────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm đang ngồi trên chuyến bay đường dài từ Hà Nội vào Thành phố Hồ Chí Minh và hoàn toàn không có sóng Wi-Fi Internet. Kỹ sư vẫn mở máy tính xách tay, khởi động dự án và tạo 6 commit mới trên Local Repository để hoàn thiện chức năng xuất hóa đơn điện tử. Khi máy bay hạ cánh và điện thoại bắt sóng 4G, kỹ sư kết nối mạng và thực thi một lệnh duy nhất để đẩy toàn bộ 6 commit này lên Remote Repository trên GitHub cho đồng nghiệp kiểm duyệt một cách thuận lợi và an toàn.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\ngit status\ngit branch -a\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Liệt kê tất cả các liên kết kho lưu trữ từ xa kèm URL chi tiết phục vụ việc fetch và push.\n- `git status`: Hiển thị vị trí tương đối giữa nhánh cục bộ và nhánh theo dõi từ xa (ahead / behind).\n- `git branch -a`: Liệt kê tất cả các nhánh bao gồm cả nhánh cục bộ và các nhánh remote-tracking màu đỏ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng commit trên máy tính cá nhân sẽ tự động bay lên GitHub**:  Bạn bắt buộc phải chạy lệnh git push thì dữ liệu mới lên máy chủ.\n2. **Sợ rằng mất mạng Internet sẽ không làm việc được với Git**:  Git hoàn toàn offline; bạn chỉ cần mạng khi gửi hoặc nhận dữ liệu.\n3. **Nhầm lẫn giữa Git (phần mềm quản lý phiên bản) và GitHub (dịch vụ máy chủ lưu trữ đám mây).**: Nhầm lẫn giữa Git (phần mềm quản lý phiên bản) và GitHub (dịch vụ máy chủ lưu trữ đám mây).\n\n---\n\n## 🧪 Lab\n1. Kiểm tra cấu hình liên kết từ xa hiện tại bằng lệnh `git remote -v`.\n2. Quan sát danh sách toàn bộ các nhánh cục bộ và nhánh từ xa bằng `git branch -a`.\n3. Chạy `git status` để xem nhánh hiện tại có đang theo dõi nhánh từ xa nào không.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc: Commit là cục bộ (Local), Push mới là đưa lên máy chủ từ xa (Remote).\n\n---\n\n## ✅ Validation\n- Hiểu rõ vị trí lưu trữ của Local Repository và Remote Repository trên GitHub.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về mô hình Local vs Remote Repository.\n\n---\n\n## 🔥 Challenge\nNêu ưu điểm vượt trội của mô hình phân tán Git so với mô hình tập trung SVN khi xảy ra sự cố sập máy chủ.\n\n---\n\n## 📚 Tổng kết\n- Local Repo nằm hoàn chỉnh trên máy tính cá nhân, cho phép làm việc offline 100%.\n- Remote Repo nằm trên máy chủ (GitHub) dùng để chia sẻ, sao lưu và cộng tác nhóm.\n- Hai kho độc lập hoàn toàn, chỉ trao đổi dữ liệu khi chạy push, fetch, hoặc pull.\n",
  "quiz": {
    "id": "quiz-04-01-local-vs-remote",
    "title": "Trắc nghiệm: Local vs Remote Repository",
    "questions": [
      {
        "id": "q1",
        "question": "Khi bạn chạy lệnh `git commit -m \"feat: add payment\"` trên máy tính cá nhân, snapshot commit mới được lưu ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ lưu trong Local Repository nằm trong thư mục .git trên ổ cứng máy tính cá nhân của bạn",
            "correct": true
          },
          {
            "text": "Tự động gửi ngay lập tức lên máy chủ GitHub qua đường truyền Internet",
            "correct": false
          },
          {
            "text": "Tự động tải lên trang chủ của tổ chức Git quốc tế",
            "correct": false
          },
          {
            "text": "Lưu vào bộ nhớ đám mây Google Drive của bạn",
            "correct": false
          }
        ],
        "explanation": "Git là hệ thống phân tán: commit chỉ lưu cục bộ vào thư mục .git trên máy cá nhân cho đến khi bạn push."
      },
      {
        "id": "q2",
        "question": "Khi máy tính của bạn hoàn toàn bị mất kết nối mạng Internet, bạn CÓ THỂ làm được thao tác nào sau đây với Git?",
        "type": "single",
        "options": [
          {
            "text": "Tạo nhánh mới, chuyển nhánh, xem lịch sử git log, tạo commit và giải quyết conflict trên máy cục bộ",
            "correct": true
          },
          {
            "text": "Đẩy code lên GitHub bằng git push",
            "correct": false
          },
          {
            "text": "Kéo code mới nhất của đồng nghiệp về máy bằng git pull",
            "correct": false
          },
          {
            "text": "Tạo Pull Request trên giao diện web của GitHub",
            "correct": false
          }
        ],
        "explanation": "Mọi tính năng quản lý lịch sử (branch, commit, log, merge) đều hoạt động offline 100% trên Local Repo."
      },
      {
        "id": "q3",
        "question": "Vai trò cốt lõi của Remote Repository đặt trên GitHub trong một dự án phần mềm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đóng vai trò điểm tập kết trung tâm để các thành viên chia sẻ mã nguồn, sao lưu và kích hoạt CI/CD",
            "correct": true
          },
          {
            "text": "Tự động sửa lỗi cú pháp trong mã nguồn của lập trình viên",
            "correct": false
          },
          {
            "text": "Cung cấp kết nối mạng Internet tốc độ cao miễn phí cho máy tính",
            "correct": false
          },
          {
            "text": "Thay thế hoàn toàn hệ điều hành trên máy tính của bạn",
            "correct": false
          }
        ],
        "explanation": "Remote Repo là cầu nối trung gian giúp các lập trình viên đồng bộ công việc và tự động hóa quy trình."
      },
      {
        "id": "q4",
        "question": "Lệnh nào cho phép bạn kiểm tra danh sách các máy chủ từ xa đang được cấu hình liên kết với kho cục bộ?",
        "type": "single",
        "options": [
          {
            "text": "git remote -v",
            "correct": true
          },
          {
            "text": "git check-network",
            "correct": false
          },
          {
            "text": "git view-cloud",
            "correct": false
          },
          {
            "text": "git server-list",
            "correct": false
          }
        ],
        "explanation": "`git remote -v` hiển thị tên định danh remote (như origin) kèm theo URL fetch và push cụ thể."
      },
      {
        "id": "q5",
        "question": "Điều gì xảy ra nếu máy chủ từ xa trên GitHub bị mất điện hoặc ngừng hoạt động tạm thời?",
        "type": "single",
        "options": [
          {
            "text": "Bạn vẫn tiếp tục lập trình, tạo nhánh và commit bình thường trên máy cá nhân không hề bị gián đoạn",
            "correct": true
          },
          {
            "text": "Toàn bộ mã nguồn trên máy tính của bạn sẽ bị tự động khóa lại",
            "correct": false
          },
          {
            "text": "Bạn phải cài đặt lại hệ điều hành từ đầu",
            "correct": false
          },
          {
            "text": "Mọi commit trước đó trên máy cá nhân sẽ bị xóa sạch",
            "correct": false
          }
        ],
        "explanation": "Nhờ kiến trúc phân tán, mỗi máy cá nhân là một bản sao trọn vẹn, không phụ thuộc vào tình trạng máy chủ."
      },
      {
        "id": "q6",
        "question": "Thao tác nào bắt buộc phải có kết nối mạng Internet để thực hiện thành công?",
        "type": "single",
        "options": [
          {
            "text": "Đồng bộ hóa dữ liệu với máy chủ từ xa thông qua lệnh `git push` hoặc `git pull`",
            "correct": true
          },
          {
            "text": "Xem lại nhật ký các commit bằng lệnh `git log`",
            "correct": false
          },
          {
            "text": "Tạo một nhánh mới bằng lệnh `git branch`",
            "correct": false
          },
          {
            "text": "Kiểm tra trạng thái tệp tin bằng lệnh `git status`",
            "correct": false
          }
        ],
        "explanation": "Chỉ các lệnh trao đổi qua giao thức mạng (push, fetch, pull, clone) mới cần kết nối Internet."
      }
    ]
  }
};
export default lesson;
