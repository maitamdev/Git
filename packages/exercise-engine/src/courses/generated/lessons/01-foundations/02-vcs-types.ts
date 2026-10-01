import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-vcs-types",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "02-vcs-types",
    "title": "Ba kiểu quản lý phiên bản: cục bộ, tập trung, phân tán",
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
    "commands": []
  },
  "content": "# Ba kiểu quản lý phiên bản: cục bộ, tập trung, phân tán\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt nơi giữ lịch sử trong Local VCS, CVCS và DVCS.\n- Nhận ra Git là DVCS và SVN thường được dùng theo mô hình CVCS.\n- Chọn được việc có thể làm khi máy không kết nối với nơi chia sẻ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Local VCS — quản lý phiên bản cục bộ\n- **Nói dễ hiểu:** Lịch sử thay đổi được giữ trên một máy tính.\n- **Ví dụ:** Một người dùng công cụ VCS lưu các mốc bài tập trên laptop của mình.\n- **Đừng nhầm:** Lịch sử nằm trên máy cá nhân không tự trở thành lịch sử dùng chung của nhóm.\n\n### CVCS (Centralized VCS) — quản lý phiên bản tập trung\n- **Nói dễ hiểu:** Một máy chủ trung tâm giữ lịch sử dùng chung; thành viên lấy tệp về máy mình để làm việc.\n- **Ví dụ:** SVN thường được dùng theo mô hình tập trung.\n- **Đừng nhầm:** Máy cá nhân có thể còn tệp đang sửa, nhưng việc lưu phiên bản mới vào lịch sử chung cần máy chủ.\n\n### DVCS (Distributed VCS) — quản lý phiên bản phân tán\n- **Nói dễ hiểu:** Mỗi bản sao Git đầy đủ thông thường có lịch sử riêng trên máy, nên vẫn có thể làm nhiều việc khi offline.\n- **Ví dụ:** Sau khi sao chép đầy đủ một dự án Git, bạn có thể xem lịch sử đã có và lưu commit mới trên laptop.\n- **Đừng nhầm:** Mỗi bản sao không tự đồng bộ với các bản khác. Bạn chủ động gửi (push) hoặc lấy (pull) thay đổi khi có kết nối.\n\n### Clone — sao chép một kho Git\n- **Nói dễ hiểu:** Tạo một bản sao của kho Git để làm việc trên máy mình.\n- **Ví dụ:** Clone một dự án Git về laptop để xem tệp và lịch sử của dự án.\n- **Đừng nhầm:** Clone Git thông thường gồm lịch sử dự án; tải tệp ZIP thường không mang theo kho lịch sử Git.\n\n---\n\n## 🤔 Tại sao cần?\nHãy tưởng tượng máy chủ chia sẻ của nhóm tạm thời không truy cập được. Với CVCS, nhóm vẫn có thể sửa tệp trên máy, nhưng không thể lưu phiên bản mới vào lịch sử chung cho tới khi máy chủ hoạt động lại. Với một bản clone Git đầy đủ thông thường, bạn vẫn có thể xem lịch sử đã tải về và lưu commit trên máy mình. Việc gửi hoặc lấy thay đổi từ nơi chia sẻ phải đợi kết nối.\n\nGit không tự đồng bộ các máy và một bản Git chỉ có trên laptop vẫn có thể mất nếu laptop hỏng. Nhóm cần chủ động chia sẻ và sao lưu dữ liệu theo cách phù hợp.\n\n---\n\n## 📖 Định nghĩa\nBa mô hình khác nhau chủ yếu ở nơi giữ lịch sử. Local VCS giữ lịch sử trên một máy. CVCS giữ lịch sử chung trên máy chủ trung tâm. DVCS như Git thường sao chép cả kho và lịch sử về máy thành viên, để mỗi bản sao có thể làm việc độc lập.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\n- **Local:** Một người giữ cuốn sổ lịch sử trên máy cá nhân.\n- **Centralized:** Cả nhóm dùng một cuốn sổ chung trên máy chủ.\n- **Distributed:** Mỗi thành viên có một cuốn sổ riêng; khi kết nối lại, họ chọn gửi hoặc lấy các mốc cần chia sẻ.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCVCS — ví dụ: SVN                 DVCS — ví dụ: Git\n[Máy chủ: lịch sử chung]         [Nơi chia sẻ, nếu nhóm dùng]\n       ▲       ▲                         ▲       ▲\n       │       │                    gửi / lấy khi có mạng\n [Máy A]     [Máy B]              [Bản A + lịch sử] [Bản B + lịch sử]\n  tệp làm việc                       mỗi bản có thể làm việc riêng\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn clone đầy đủ bài tập Git trước khi đi học ở nơi Wi-Fi yếu. Bạn vẫn xem được lịch sử đã có và lưu commit mới trên laptop. Khi mạng hoạt động lại, bạn gửi commit để nhóm cùng nhận. Git không tự gửi commit, và nhóm vẫn cần xử lý nếu nhiều người sửa cùng một phần nội dung.\n\n---\n\n## 💻 Command\nBài này dùng tình huống để so sánh ba mô hình; chưa cần chạy lệnh Git.\n\n---\n\n## 🔍 Giải thích command\nPhần thực hành tập trung vào nơi lịch sử được giữ và việc nào cần kết nối. Các lệnh xem lịch sử và trạng thái sẽ được học ở những bài sau.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ Git cần mạng cho mọi thao tác:** Nhiều việc trên bản Git đã có ở máy vẫn làm được offline.\n2. **Nghĩ DVCS tự đồng bộ:** Bạn vẫn phải chủ động gửi hoặc lấy thay đổi khi có kết nối.\n3. **Coi một bản Git cục bộ là bản sao lưu an toàn:** Nếu thiết bị hỏng và không có bản nào khác, lịch sử có thể mất.\n\n---\n\n## 🧪 Lab\nGiả sử bạn đã clone đầy đủ một dự án Git rồi mất kết nối. Phân loại từng việc thành **làm được ngay trên máy** hoặc **phải đợi kết nối**:\n1. Xem lịch sử đã có trong bản clone.\n2. Sửa tệp và lưu một commit mới trên máy.\n3. Gửi commit mới để thành viên khác nhận được.\n4. Lấy thay đổi mới nhất từ máy chủ chia sẻ.\n\n---\n\n## 💡 Hint\nHãy hỏi: “Thao tác này chỉ đọc hoặc ghi bản Git đang ở trên máy, hay cần trao đổi dữ liệu với máy khác?”\n\n---\n\n## ✅ Validation\n- Xác định đúng nơi lịch sử được giữ trong cả ba mô hình.\n- Nêu được vì sao bản clone Git đầy đủ vẫn có thể làm việc offline.\n- Phân biệt việc lưu commit cục bộ với gửi hoặc lấy thay đổi qua mạng.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Khi sai, đọc phần giải thích rồi thử lại.\n\n---\n\n## 🔥 Challenge\nVẽ ba hình nhỏ cho Local VCS, CVCS và DVCS. Đánh dấu bản nào giữ lịch sử và lúc nào cần kết nối mạng.\n\n---\n\n## 📚 Tổng kết\n- Local VCS giữ lịch sử trên một máy; CVCS giữ lịch sử chung trên máy chủ.\n- Bản clone Git đầy đủ thông thường có cả lịch sử cục bộ để làm việc offline.\n- Gửi hoặc lấy thay đổi giữa các máy cần kết nối và thao tác chủ động.\n",
  "quiz": {
    "id": "quiz-02-vcs-types",
    "title": "Trắc nghiệm: Phân biệt Local VCS, CVCS và DVCS",
    "questions": [
      {
        "id": "q1",
        "question": "Điểm khác nhau chính giữa CVCS và DVCS là gì?",
        "type": "single",
        "options": [
          {
            "text": "CVCS giữ lịch sử chung trên máy chủ; bản clone DVCS thường có lịch sử cục bộ",
            "correct": true
          },
          {
            "text": "CVCS chỉ dùng được với tệp văn bản; DVCS chỉ dùng được với mã nguồn",
            "correct": false
          },
          {
            "text": "CVCS luôn miễn phí; DVCS luôn yêu cầu phí hằng tháng",
            "correct": false
          },
          {
            "text": "CVCS tự tạo lịch sử; DVCS yêu cầu người dùng sao chép thư mục thủ công",
            "correct": false
          }
        ],
        "explanation": "CVCS dựa vào máy chủ trung tâm để giữ lịch sử chung. Một bản clone Git đầy đủ thông thường cũng mang lịch sử về máy để làm việc cục bộ."
      },
      {
        "id": "q2",
        "question": "Bạn đã clone đầy đủ một dự án Git rồi mất Internet. Việc nào vẫn làm được trên máy?",
        "type": "single",
        "options": [
          {
            "text": "Xem lịch sử đã có và lưu một commit mới trên máy",
            "correct": true
          },
          {
            "text": "Gửi commit mới lên máy chủ chia sẻ để nhóm nhận ngay",
            "correct": false
          },
          {
            "text": "Tải những commit mới nhất từ máy chủ về",
            "correct": false
          },
          {
            "text": "Tự động làm cho thành viên khác nhìn thấy thay đổi của bạn",
            "correct": false
          }
        ],
        "explanation": "Bản clone đầy đủ có lịch sử cục bộ nên bạn vẫn có thể đọc và lưu commit. Gửi hoặc nhận dữ liệu từ máy chủ cần kết nối mạng."
      },
      {
        "id": "q3",
        "question": "Nếu máy chủ của một CVCS tạm ngừng hoạt động, mô tả nào đúng nhất?",
        "type": "single",
        "options": [
          {
            "text": "Thành viên có thể còn tệp trên máy nhưng chưa lưu phiên bản mới vào lịch sử chung",
            "correct": true
          },
          {
            "text": "Tất cả tệp trên máy thành viên tự động bị xóa",
            "correct": false
          },
          {
            "text": "Mỗi máy thành viên luôn có toàn bộ lịch sử để commit offline như Git",
            "correct": false
          },
          {
            "text": "Lịch sử chung tự chuyển sang máy của một thành viên bất kỳ",
            "correct": false
          }
        ],
        "explanation": "Trong CVCS, máy chủ giữ lịch sử chung. Mất kết nối có thể chặn việc lưu phiên bản mới vào đó, dù tệp đang làm trên máy vẫn còn."
      },
      {
        "id": "q4",
        "question": "Cặp nào ghép đúng công cụ với mô hình quản lý phiên bản thường dùng?",
        "type": "single",
        "options": [
          {
            "text": "Git — DVCS; Subversion (SVN) — CVCS",
            "correct": true
          },
          {
            "text": "Git — CVCS; Subversion (SVN) — DVCS",
            "correct": false
          },
          {
            "text": "Git và SVN đều là Local VCS chỉ dành cho một máy",
            "correct": false
          },
          {
            "text": "Git — Local VCS; Subversion (SVN) — CVCS",
            "correct": false
          }
        ],
        "explanation": "Git là DVCS với lịch sử trong bản clone cục bộ. SVN thường được triển khai theo mô hình CVCS có máy chủ giữ lịch sử chung."
      },
      {
        "id": "q5",
        "question": "Khác biệt nào thường đúng giữa clone Git đầy đủ và tải dự án dưới dạng ZIP?",
        "type": "single",
        "options": [
          {
            "text": "Clone Git thường giữ dữ liệu kho và lịch sử; ZIP thường chỉ chứa các tệp ở một trạng thái",
            "correct": true
          },
          {
            "text": "ZIP luôn có toàn bộ lịch sử, còn clone Git chỉ tải tệp mới nhất",
            "correct": false
          },
          {
            "text": "Clone Git tự gửi thay đổi lên máy chủ; ZIP tự đồng bộ giữa các máy",
            "correct": false
          },
          {
            "text": "Không có khác biệt nào; hai cách luôn tạo ra cùng một loại dữ liệu",
            "correct": false
          }
        ],
        "explanation": "Clone Git thông thường tạo bản kho có lịch sử để Git tiếp tục làm việc. ZIP tải các tệp hiện có nhưng thường không mang dữ liệu lịch sử Git."
      }
    ]
  }
};
export default lesson;
