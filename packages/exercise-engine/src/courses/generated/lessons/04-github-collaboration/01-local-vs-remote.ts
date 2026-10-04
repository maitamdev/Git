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
  "content": "# Local vs Remote Repository\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ rệt bản chất kiến trúc giữa Local Repository (kho cục bộ) và Remote Repository (kho từ xa).\n- Nắm vững vai trò trung tâm của máy chủ GitHub trong quy trình cộng tác nhóm và lưu trữ dự phòng.\n- Phân định rạch ròi giữa các thao tác ngoại tuyến độc lập (commit) với các thao tác mạng (push, pull).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Local Repository — kho lưu trữ trên máy\n- **Nói dễ hiểu:** Toàn bộ kho dữ liệu Git hoàn chỉnh nằm gọn trong thư mục ẩn `.git` trên ổ cứng máy tính cá nhân của bạn.\n- **Ví dụ:** Bạn có thể ngắt kết nối mạng hoàn toàn mà vẫn commit, tạo nhánh và xem lịch sử cục bộ bình thường.\n- **Đừng nhầm:** Commit trên máy chỉ mới nằm ở ổ cứng cá nhân; đồng đội sẽ không thể nhìn thấy nếu bạn chưa đẩy lên mạng.\n\n### Remote Repository — kho lưu trữ từ xa\n- **Nói dễ hiểu:** Kho lưu trữ Git được đặt trên một máy chủ đám mây trực tuyến được kết nối qua mạng Internet (như GitHub, GitLab).\n- **Ví dụ:** Đường dẫn `https://github.com/company/project.git` là một Remote Repository dùng chung cho cả công ty.\n- **Đừng nhầm:** Kho trên máy và kho trên đám mây hoạt động hoàn toàn độc lập; chúng không tự động đồng bộ theo thời gian thực như Google Drive.\n\n### Push & Pull — đẩy lên và kéo về\n- **Nói dễ hiểu:** Cặp thao tác đồng bộ mạng cốt lõi: `push` đẩy commit từ máy lên máy chủ, còn `pull` tải commit từ máy chủ về máy mình.\n- **Ví dụ:** Bạn gõ `git push` để nộp code tính năng mới, đồng đội gõ `git pull` để lấy mã nguồn mới nhất về chạy thử.\n- **Đừng nhầm:** Hai lệnh này bắt buộc phải có kết nối Internet và quyền truy cập xác thực tài khoản thì mới thực thi được.\n\n---\n\n## 📖 Định nghĩa\nKiến trúc phân tán của Git phân định rạch ròi hai không gian lưu trữ: Local Repository (kho mã nguồn cục bộ hoàn chỉnh nằm trong thư mục `.git` trên ổ cứng máy bạn) và Remote Repository (kho lưu trữ máy chủ đặt trên đám mây như GitHub, GitLab). Hai kho này hoàn toàn độc lập, chỉ trao đổi dữ liệu thông qua các lệnh mạng có chủ đích.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có Remote Repository, bạn không thể cộng tác nhóm: dự án của bạn sẽ bị cô lập trên một chiếc máy tính cá nhân duy nhất, đối mặt với nguy cơ mất trắng toàn bộ dữ liệu nếu máy hỏng hoặc ổ cứng cháy. Remote Repository trên GitHub vừa là nơi tập hợp thành quả của cả đội ngũ, vừa đóng vai trò như một kho sao lưu dự phòng đám mây vĩnh viễn cho sản phẩm của bạn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Local Repository như cuốn sổ nhật ký cá nhân nằm trong ngăn kéo bàn làm việc của bạn: bạn có thể ghi chép, vẽ nháp, xé bỏ tùy thích mà không cần mạng Internet. Còn Remote Repository trên GitHub giống như bảng thông cáo chung ở sảnh tòa nhà: chỉ khi bạn chọn lọc những bài viết xuất sắc nhất đem ra dán lên bảng tin (`push`), đồng đội mới có thể đọc và sao chép về (`pull`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nKIẾN TRÚC ĐỘC LẬP GIỮA LOCAL VÀ REMOTE REPOSITORY:\n\nMáy tính cá nhân của bạn (Local):           Máy chủ đám mây (GitHub Remote):\n┌─────────────────────────────────┐         ┌─────────────────────────────────┐\n│ Thư mục làm việc (Working Tree) │         │                                 │\n│ Vùng đệm (Staging Area)         │         │   Remote Repository (origin)    │\n│ Kho cục bộ (.git database)      │◄───────►│   (Lưu trữ tập trung đám mây)   │\n│ [Commit ngoại tuyến tự do]      │         │   [Nơi cả đội ngũ hội quân]     │\n└─────────────────────────────────┘         └─────────────────────────────────┘\n                ▲                                            ▲\n                └────────────── push / fetch / pull ─────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn ngồi trên chuyến bay 12 tiếng không có Wi-Fi vẫn có thể tạo 15 commit trên Local Repository để hoàn thiện tính năng giỏ hàng. Ngay khi máy bay hạ cánh và điện thoại kết nối mạng, bạn gõ một lệnh `git push` duy nhất: toàn bộ 15 mốc snapshot tức thì bay lên GitHub để các thành viên khác kéo về tiếp tục tích hợp.\n\n---\n\n## 💻 Command\n```bash\ngit remote -v\ngit status\ngit branch -a\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote -v`: Xem danh sách chi tiết các máy chủ từ xa đang kết nối kèm URL nạp (`fetch`) và đẩy (`push`).\n- `git status`: Hiển thị tình trạng so lệch giữa nhánh cục bộ và nhánh từ xa tương ứng (ahead hoặc behind).\n- `git branch -a`: Liệt kê tất cả các nhánh: nhánh cục bộ màu xanh và các nhánh trên remote màu đỏ (dạng `remotes/origin/<tên-nhánh>`).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng `git commit` là code đã lên GitHub**: Commit chỉ lưu vào kho máy tính cá nhân; bắt buộc phải chạy `git push` thì code mới xuất hiện trên web.\n2. **Lo sợ mất mạng thì không lập trình với Git được**: Git hoạt động ngoại tuyến 100%; bạn chỉ cần Internet khi muốn trao đổi mã nguồn với đồng đội.\n3. **Đánh đồng Git và GitHub là một**: Git là phần mềm mã nguồn mở quản lý phiên bản; GitHub là nền tảng dịch vụ web thương mại lưu trữ các kho Git.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh: `git remote -v` để thanh tra xem kho hiện tại đã có liên kết remote nào hay chưa.\n2. Chạy `git branch -a` để quan sát toàn bộ các nhánh cục bộ lẫn nhánh từ xa được Git ghi nhận.\n3. Chạy `git status` để kiểm tra trạng thái đồng bộ giữa nhánh cục bộ hiện tại và nhánh theo dõi từ xa.\n\n---\n\n## 💡 Hint\n> Ghi nhớ quy tắc vàng: \"Commit là của riêng bạn trên máy tính, Push mới là công khai cho toàn thế giới!\"\n\n---\n\n## ✅ Validation\n- Nhận thức và phân biệt chính xác dữ liệu nằm ở Local Repository và Remote Repository.\n- Thực thi thành công lệnh `git remote -v` để đọc hiểu cấu hình máy chủ.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về mô hình phân tán Local vs Remote Repository trong Git.\n\n---\n\n## 🔥 Challenge\nHãy phân tích lý do tại sao kiến trúc phân tán của Git lại vượt trội hơn hoàn toàn so với mô hình tập trung cũ của SVN (Subversion) khi máy chủ trung tâm bị mất kết nối Internet trong 24 giờ liên tục?\n\n---\n\n## 📚 Tổng kết\n- Local Repository lưu trữ trọn vẹn lịch sử trên máy tính cá nhân, hỗ trợ làm việc ngoại tuyến 100%.\n- Remote Repository trên GitHub là bến đỗ chung giúp kết nối cả đội ngũ lập trình viên.\n- Thao tác `push` đẩy dữ liệu lên mây, `fetch` và `pull` kéo dữ liệu mới về máy.\n",
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
