import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-vcs-types",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "02-vcs-types",
    "title": "Local / Centralized / Distributed VCS",
    "level": "beginner",
    "duration": 25,
    "xp": 60,
    "prerequisites": [
      "01-version-control"
    ],
    "objectives": [
      "Phân biệt Local VCS, CVCS và DVCS theo nơi lưu lịch sử.",
      "Nói được Git và SVN thường thuộc mô hình nào.",
      "Biết việc nào cần mạng và việc nào làm được trên kho Git cục bộ."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "cvcs",
      "dvcs",
      "local vcs",
      "centralized",
      "distributed",
      "kien truc"
    ],
    "commands": [
      "git log",
      "git status"
    ]
  },
  "content": "# Local, Centralized và Distributed VCS\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt nơi lưu lịch sử trong ba kiểu VCS: Local, Centralized và Distributed.\n- Nói được Git và SVN thường thuộc kiểu nào.\n- Biết thao tác nào vẫn làm được khi mất kết nối với máy chủ chia sẻ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Local VCS — VCS cục bộ\n- **Nói dễ hiểu:** Lịch sử thay đổi được quản lý trên một máy tính.\n- **Ví dụ:** Bạn tự lưu các mốc bài tập trên laptop bằng một công cụ VCS cài ở đó.\n- **Đừng nhầm:** “Cục bộ” mô tả nơi có lịch sử chính; tự nó không giúp nhóm chia sẻ lịch sử.\n\n### CVCS (Centralized VCS) — VCS tập trung\n- **Nói dễ hiểu:** Máy chủ trung tâm giữ lịch sử dùng chung; mỗi người làm việc với một bản làm việc trên máy mình.\n- **Ví dụ:** SVN là một công cụ thuộc mô hình này.\n- **Đừng nhầm:** Khi máy chủ hoặc mạng gặp sự cố, máy bạn vẫn có thể còn tệp đang sửa, nhưng các thao tác cần máy chủ như gửi thay đổi mới sẽ bị ảnh hưởng.\n\n### DVCS (Distributed VCS) — VCS phân tán\n- **Nói dễ hiểu:** Với một bản clone đầy đủ thông thường, mỗi người có kho Git cục bộ kèm lịch sử để làm việc riêng.\n- **Ví dụ:** Git là DVCS; bạn có thể tạo commit mới trên máy rồi chia sẻ sau khi có mạng.\n- **Đừng nhầm:** “Phân tán” không có nghĩa là máy tự đồng bộ mọi thay đổi. Để chia sẻ, vẫn cần thao tác như push và pull.\n\n### Clone — tạo bản sao kho lưu trữ\n- **Nói dễ hiểu:** Tải một kho từ nơi chia sẻ về máy để bắt đầu làm việc.\n- **Ví dụ:** Clone một dự án GitHub về laptop để xem mã nguồn và lịch sử.\n- **Đừng nhầm:** Clone khác tải một tệp ZIP: một bản clone Git thông thường còn dùng được các lệnh và lịch sử Git.\n\n---\n\n## 🤔 Tại sao cần?\nGiả sử cả nhóm cần tiếp tục làm bài khi máy chủ chia sẻ tạm thời không truy cập được. Với VCS tập trung, việc ghi thay đổi lên lịch sử dùng chung phải chờ máy chủ hoạt động. Với bản clone Git đầy đủ thông thường, mỗi người vẫn có thể xem lịch sử và lưu commit trên máy mình; việc chia sẻ những commit mới sẽ chờ đến khi kết nối lại.\n\nĐiều đó không làm Git thành hệ thống sao lưu hoàn hảo: nhóm vẫn cần đẩy dữ liệu lên nơi chia sẻ và có kế hoạch sao lưu phù hợp.\n\n---\n\n## 📖 Định nghĩa\nBa kiểu VCS khác nhau chủ yếu ở nơi lưu lịch sử. Local VCS giữ lịch sử trên một máy. Centralized VCS giữ lịch sử dùng chung trên máy chủ trung tâm. Distributed VCS như Git cho mỗi bản clone đầy đủ thông thường một kho cục bộ có thể làm việc độc lập.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\n- **Local:** Một người giữ cuốn sổ lịch sử trên máy của mình.\n- **Centralized:** Nhóm cùng ghi vào một cuốn sổ ở máy chủ; các bản làm việc của thành viên ở máy riêng.\n- **Distributed:** Mỗi người có một cuốn sổ lịch sử riêng; khi có mạng, họ trao đổi các mốc cần chia sẻ.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCVCS (ví dụ: SVN)                 DVCS (ví dụ: Git)\n[Máy chủ giữ lịch sử]             [Nơi chia sẻ]\n     ▲       ▲                      ▲       ▲\n     │       │                      │       │\n  [Máy A] [Máy B]                [Repo A] [Repo B]\n  bản làm việc                    mỗi clone có lịch sử cục bộ\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm bạn clone dự án Git trước khi đi học ở nơi Wi-Fi chập chờn. Bạn có thể xem lịch sử và lưu commit ở máy. Khi mạng ổn định, bạn push commit lên nơi chia sẻ để các bạn khác lấy về. Git không tự đẩy dữ liệu và cũng không bảo đảm các bạn sửa cùng một dòng sẽ tự hòa hợp.\n\n---\n\n## 💻 Command\n```bash\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n`git status` cho biết tình trạng tệp trong kho Git hiện tại, ví dụ tệp nào đang được sửa hoặc chưa được Git theo dõi. Đây là thao tác đọc thông tin cục bộ; nó không gửi thay đổi lên máy chủ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ Git cần Internet cho mọi việc:** Nhiều thao tác trên kho cục bộ vẫn làm được khi offline; trao đổi với remote thì cần kết nối phù hợp.\n2. **Nghĩ distributed nghĩa là tự đồng bộ:** Bạn vẫn cần chủ động lấy hoặc gửi thay đổi.\n3. **Coi một kho cục bộ là bản sao lưu đủ an toàn:** Máy bị hỏng có thể làm mất bản đó; hãy chia sẻ và sao lưu theo quy trình của nhóm.\n\n---\n\n## 🧪 Lab\nTưởng tượng Wi-Fi vừa mất sau khi bạn clone dự án. Phân loại từng việc thành **làm được ngay trên Git cục bộ** hoặc **phải chờ kết nối**:\n- Xem lịch sử đã có trong clone.\n- Tạo một commit mới trên máy.\n- Gửi commit lên GitHub.\n- Nhận thay đổi mới từ GitHub.\n\n---\n\n## 💡 Hint\nHãy hỏi: “Lệnh này chỉ đọc/ghi kho đang ở trên máy mình, hay cần trao đổi với máy chủ?”\n\n---\n\n## ✅ Validation\n- Phân biệt đúng Local VCS, CVCS và DVCS theo nơi có lịch sử.\n- Nêu được Git có thể lưu commit cục bộ khi offline nhưng không thể push/pull khi mất kết nối.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau và đọc lời giải thích sau mỗi câu.\n\n---\n\n## 🔥 Challenge\nVẽ ba hình nhỏ chỉ ra lịch sử được giữ ở đâu trong Local VCS, CVCS và một bản clone Git đầy đủ thông thường.\n\n---\n\n## 📚 Tổng kết\n- Local VCS giữ lịch sử trên máy cục bộ; CVCS dựa vào lịch sử ở máy chủ trung tâm.\n- DVCS như Git cho một bản clone đầy đủ thông thường lịch sử cục bộ để làm việc offline.\n- Offline vẫn có giới hạn: gửi và nhận thay đổi từ nơi chia sẻ phải chờ kết nối.\r\n",
  "quiz": {
    "id": "quiz-02-vcs-types",
    "title": "Trắc nghiệm: Phân loại kiến trúc VCS",
    "questions": [
      {
        "id": "q1",
        "question": "Điểm khác biệt căn bản nhất giữa Distributed VCS (như Git) và Centralized VCS (như SVN) là gì?",
        "type": "single",
        "options": [
          {
            "text": "Một bản clone Git đầy đủ thông thường có kho cục bộ kèm lịch sử dự án",
            "correct": true
          },
          {
            "text": "DVCS chỉ hoạt động trên hệ điều hành Linux còn CVCS chỉ chạy trên Windows",
            "correct": false
          },
          {
            "text": "CVCS lưu code trên đám mây còn DVCS lưu code trên thẻ nhớ rời",
            "correct": false
          },
          {
            "text": "DVCS yêu cầu phải trả phí bản quyền hàng tháng còn CVCS hoàn toàn miễn phí",
            "correct": false
          }
        ],
        "explanation": "Với một bản clone đầy đủ thông thường, Git có dữ liệu và lịch sử cục bộ để bạn làm nhiều thao tác mà không cần hỏi máy chủ. Một số chế độ clone rút gọn là chủ đề nâng cao."
      },
      {
        "id": "q2",
        "question": "Nếu máy chủ trung tâm bị mất kết nối mạng Internet, lập trình viên sử dụng Git có thể làm những gì?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn có thể commit, tạo nhánh, xem khác biệt và lịch sử đã có trên máy",
            "correct": true
          },
          {
            "text": "Không thể làm bất cứ thao tác gì vì Git sẽ bị khóa hoàn toàn",
            "correct": false
          },
          {
            "text": "Mọi dữ liệu trên máy tính sẽ tự động bị xóa sạch",
            "correct": false
          },
          {
            "text": "Chỉ có thể đọc code chứ không được phép chỉnh sửa tệp tin",
            "correct": false
          }
        ],
        "explanation": "Git xử lý các thao tác trên kho cục bộ mà không cần Internet. Gửi commit lên server hoặc lấy thay đổi mới từ server thì cần kết nối."
      },
      {
        "id": "q3",
        "question": "Khái niệm \"Single Point of Failure\" (Điểm nghẽn đơn độc) phản ánh nhược điểm nguy hiểm của mô hình nào?",
        "type": "single",
        "options": [
          {
            "text": "Centralized VCS (Hệ thống quản lý phiên bản tập trung)",
            "correct": true
          },
          {
            "text": "Distributed VCS (Hệ thống quản lý phiên bản phân tán)",
            "correct": false
          },
          {
            "text": "Cả hai mô hình đều không bị ảnh hưởng",
            "correct": false
          },
          {
            "text": "Mô hình điện toán đám mây hiện đại",
            "correct": false
          }
        ],
        "explanation": "CVCS phụ thuộc vào máy chủ trung tâm cho các thao tác chia sẻ lịch sử. Nếu máy chủ gặp sự cố, nhóm bị ảnh hưởng; mất dữ liệu lâu dài còn phụ thuộc vào bản sao lưu."
      },
      {
        "id": "q4",
        "question": "Đại diện tiêu biểu nhất của hệ thống quản lý phiên bản phân tán hiện nay là phần mềm nào?",
        "type": "single",
        "options": [
          {
            "text": "Git",
            "correct": true
          },
          {
            "text": "Subversion (SVN)",
            "correct": false
          },
          {
            "text": "CVS",
            "correct": false
          },
          {
            "text": "Microsoft Word Track Changes",
            "correct": false
          }
        ],
        "explanation": "Git do Linus Torvalds sáng lập năm 2005 là đại diện tiêu biểu và phổ biến nhất của kiến trúc DVCS."
      }
    ]
  }
};
export default lesson;
