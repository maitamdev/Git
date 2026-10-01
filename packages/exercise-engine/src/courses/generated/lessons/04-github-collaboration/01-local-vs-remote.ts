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
      "Nhận biết nhiều thao tác cục bộ của Git vẫn hoạt động khi mất Internet."
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
  "content": "# Local vs Remote Repository\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự khác biệt giữa kho lưu trữ trên máy cá nhân (Local) và kho lưu trữ từ xa (Remote).\n- Nắm bắt vai trò của máy chủ đám mây như GitHub trong việc làm việc nhóm và lưu trữ dự phòng.\n- Phân biệt các thao tác làm việc ngoại tuyến (commit) với các thao tác cần mạng (push, pull).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Local Repository — kho lưu trữ trên máy\n- **Nói dễ hiểu:** Kho Git nằm trên máy bạn. Nó lưu các commit và dữ liệu Git đã tải về; bản clone nông có thể chỉ chứa một phần lịch sử.\n- **Ví dụ:** Khi bạn mất kết nối mạng Internet, bạn vẫn có thể tạo commit an toàn vào Local Repository.\n- **Đừng nhầm:** Commit trên máy chưa tự bay lên mạng; dữ liệu lúc này chỉ mới nằm trên ổ cứng của bạn.\n\n### Remote Repository — kho lưu trữ từ xa\n- **Nói dễ hiểu:** Kho Git trên một máy chủ mà bạn kết nối qua mạng; GitHub là một dịch vụ lưu trữ phổ biến.\n- **Ví dụ:** Địa chỉ `https://github.com/nhom-hoc-tap/web-app.git` là một Remote Repository trên GitHub.\n- **Đừng nhầm:** Kho trên máy và kho từ xa hoàn toàn độc lập; chúng chỉ cập nhật cho nhau khi bạn ra lệnh.\n\n### Push & Pull — đẩy lên và kéo về\n- **Nói dễ hiểu:** `push` gửi commit từ máy lên remote. `pull` tải thay đổi về rồi tích hợp chúng vào nhánh hiện tại.\n- **Ví dụ:** Sau khi làm xong bài tập, bạn `push` lên GitHub để bạn cùng nhóm `pull` về máy của bạn ấy.\n- **Đừng nhầm:** Không có mạng thì không thể `push` hay `pull`, nhưng mọi thao tác viết code và commit trên máy vẫn chạy bình thường.\n\n---\n\n## 📖 Định nghĩa\nGit lưu kho cục bộ trên máy và có thể trao đổi commit với một hoặc nhiều kho từ xa qua mạng. Bạn có thể tạo commit ngoại tuyến. Remote có thể nằm trên GitHub hoặc một máy chủ Git khác. Sau khi `fetch`, máy bạn biết trạng thái remote ở lần tải gần nhất; Git không tự hỏi máy chủ mỗi khi bạn xem nhánh.\n\n---\n\n## 🤔 Tại sao cần?\nBạn có thể sửa file, tạo nhánh, xem lịch sử và commit mà không có mạng. Khi muốn chia sẻ commit hoặc nhận thay đổi từ người khác, bạn cần kết nối tới remote. Remote hữu ích cho cộng tác và lưu bản sao, nhưng không thay thế chiến lược sao lưu riêng của tổ chức.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Local Repository như cuốn sổ nhật ký cá nhân để trong ngăn bàn. Bạn thoải mái viết nháp, sửa chữa mỗi ngày mà không ai nhìn thấy. Remote Repository trên GitHub giống như chiếc bảng tin ở lớp học. Khi đã viết xong bài phân tích sạch đẹp trong sổ, bạn photo một bản dán lên bảng tin để các bạn cùng đọc và nhận xét.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMô hình Local vs Remote Repository:\nMáy tính cá nhân (Local):       Máy chủ GitHub (Remote):\n┌─────────────────────────┐     ┌─────────────────────────┐\n│ Working Directory       │     │                         │\n│ Staging Area            │     │  Remote Repository      │\n│ Local Repo (.git)       │◄───►│  (origin/main)          │\n│ (commit offline)        │     │  (lưu trữ đám mây)      │\n└─────────────────────────┘     └─────────────────────────┘\n        ▲                                    ▲\n        └──────── push / fetch / pull ───────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn có thể tạo ba commit trên máy khi ngoại tuyến. Khi có mạng, `git push` gửi chúng tới remote nếu bạn có quyền ghi và lịch sử cho phép cập nhật. Đồng nghiệp cần `git fetch` hoặc `git pull` để nhận các commit đó.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\ngit status\ngit branch -a\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Xem danh sách và địa chỉ đường dẫn của các kho lưu trữ từ xa đang liên kết với máy bạn.\n- `git status`: Hiển thị thay đổi cục bộ. Thông tin ahead/behind chỉ hiện nếu nhánh có upstream và dựa trên lần fetch gần nhất.\n- `git branch -a`: Liệt kê nhánh cục bộ và các nhánh theo dõi từ xa đã biết sau những lần fetch trước.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ commit là tự động lên GitHub:** Commit chỉ lưu trên máy cá nhân; bạn phải chạy `git push` thì mã nguồn mới lên GitHub.\n2. **Sợ mất mạng thì không dùng được Git:** Git hoạt động hoàn toàn không cần mạng; bạn chỉ cần Internet khi gửi hoặc nhận dữ liệu.\n3. **Nhầm lẫn giữa Git và GitHub:** Git là công cụ quản lý phiên bản; GitHub là dịch vụ trang web lưu trữ kho Git trên mạng.\n\n---\n\n## 🧪 Lab\nBài học này là bài tự kiểm tra cấu hình liên kết từ xa trên máy tính của bạn:\n1. Chạy `git remote -v`. Nếu không có kết quả, kho này chưa khai báo remote; đó là trạng thái bình thường.\n2. Nếu có remote, chạy `git fetch <tên-remote>` (thường là `origin`) để cập nhật thông tin nhánh từ xa.\n3. Chạy `git branch -a` để xem nhánh cục bộ và nhánh từ xa đã biết. Nếu chưa fetch hoặc remote chưa có nhánh, danh sách có thể trống.\n4. Chạy `git status`. Chỉ đọc số ahead/behind nếu Git cho biết nhánh đang theo dõi một upstream.\n\n---\n\n## 💡 Hint\nNhớ khẩu quyết: Commit là cục bộ trên máy, Push mới là đưa dữ liệu lên máy chủ từ xa.\n\n---\n\n## ✅ Validation\n- Nhận biết rõ ràng vị trí lưu trữ của Local Repository trên máy và Remote Repository trên GitHub.\n- Phân biệt được sự khác nhau giữa commit ngoại tuyến và lệnh đồng bộ qua mạng.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để kiểm tra sự hiểu biết về mô hình Local và Remote Repository trong Git.\n\n---\n\n## 🔥 Challenge\nGiải thích vì sao mô hình phân tán của Git vẫn an toàn ngay cả khi máy chủ GitHub gặp sự cố mất điện trong vài giờ.\n\n---\n\n## 📚 Tổng kết\n- Kho cục bộ cho phép bạn làm việc và commit ngoại tuyến; lịch sử có thể không đầy đủ nếu clone nông.\n- Remote là kho trên máy chủ, chẳng hạn GitHub, để chia sẻ và phối hợp.\n- `fetch` cập nhật thông tin remote; `pull` còn tích hợp thay đổi vào nhánh hiện tại; `push` gửi commit lên remote.\n",
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
        "question": "Nếu bạn đã có một clone local đầy đủ và máy chủ tạm ngừng hoạt động, bạn vẫn làm được gì?",
        "type": "single",
        "options": [
          {
            "text": "Tiếp tục sửa file, tạo nhánh và commit trong kho local; thao tác cần remote sẽ chưa dùng được",
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
        "explanation": "Clone đầy đủ có lịch sử local để tiếp tục công việc; thao tác trao đổi với remote cần máy chủ hoạt động."
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
