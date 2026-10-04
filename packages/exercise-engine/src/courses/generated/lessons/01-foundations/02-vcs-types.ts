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
  "content": "# Ba kiểu quản lý phiên bản: Cục bộ, Tập trung và Phân tán\n\n---\n\n## 🎯 Mục tiêu\n- Phân tích sự tiến hóa kiến trúc từ Local VCS, Centralized VCS (CVCS) đến Distributed VCS (DVCS).\n- Hiểu rõ vì sao SVN phụ thuộc máy chủ trung tâm còn Git cho phép lập trình viên làm việc độc lập toàn diện.\n- Nắm vững ranh giới giữa các thao tác chạy offline siêu tốc trên máy với các thao tác đòi hỏi kết nối mạng.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Local VCS — Quản lý phiên bản cục bộ\n- **Nói dễ hiểu:** Mô hình lưu trữ sơ khai, toàn bộ lịch sử tệp tin chỉ nằm co cụm trên một máy tính cá nhân duy nhất.\n- **Ví dụ:** Bạn dùng công cụ RCS thời xưa để lưu các phiên bản mã nguồn bài tập lớn trên chiếc laptop của mình.\n- **Đừng nhầm:** Lịch sử cục bộ chỉ bảo vệ bạn khỏi việc sửa sai trên máy đó; nếu ổ cứng hỏng hoặc cần làm việc nhóm thì mô hình này hoàn toàn bất lực.\n\n### CVCS (Centralized VCS) — Quản lý phiên bản tập trung\n- **Nói dễ hiểu:** Toàn bộ lịch sử dự án được cất giữ trên một máy chủ trung tâm duy nhất; máy lập trình viên chỉ tải về phiên bản đang làm việc.\n- **Ví dụ:** Hệ thống SVN (Subversion) bắt buộc lập trình viên phải kết nối tới máy chủ công ty mỗi khi muốn ghi nhận một phiên bản mới.\n- **Đừng nhầm:** Máy cá nhân trong CVCS không hề chứa lịch sử; khi máy chủ trung tâm gặp sự cố, cả đội ngũ phát triển đều bị đình trệ.\n\n### DVCS (Distributed VCS) — Quản lý phiên bản phân tán\n- **Nói dễ hiểu:** Mô hình hiện đại mà mỗi thành viên khi tải dự án về sẽ sở hữu toàn bộ bản sao lịch sử đầy đủ của cả kho mã nguồn.\n- **Ví dụ:** Với Git, bạn ngồi trên máy bay không có mạng vẫn có thể duyệt lịch sử, tạo nhánh mới và ghi commit mượt mà.\n- **Đừng nhầm:** Có bản sao phân tán không có nghĩa là code tự bay sang máy đồng nghiệp; bạn vẫn phải chủ động đẩy hoặc kéo dữ liệu khi có mạng.\n\n### Clone — Nhân bản trọn vẹn kho mã nguồn\n- **Nói dễ hiểu:** Thao tác tải toàn bộ mã nguồn cùng toàn bộ cuốn biên niên sử của dự án từ xa về máy cá nhân của bạn.\n- **Ví dụ:** Thầy đưa đường dẫn dự án mẫu, bạn dùng lệnh clone để mang nguyên vẹn cả kho Git về máy thực hành.\n- **Đừng nhầm:** Clone khác hoàn toàn việc tải file ZIP trên mạng; tải file nén chỉ cho bạn phần vỏ code hiện tại, còn clone mang về cả cỗ máy thời gian Git.\n\n---\n\n## 🤔 Tại sao cần?\nHãy hình dung bạn đang làm dự án tại một công ty dùng CVCS và đột nhiên đường truyền mạng nội bộ bị đứt. Toàn bộ lập trình viên không thể ghi nhận phiên bản, không thể xem lại lịch sử code cũ; cả dự án tê liệt hoàn toàn vì điểm nghẽn máy chủ trung tâm! DVCS như Git ra đời để giải phóng sức mạnh cho kỹ sư: mỗi chiếc laptop trở thành một máy chủ độc lập đầy đủ tính năng. Bạn làm việc với tốc độ ổ cứng cục bộ, không phụ thuộc đường truyền, và rủi ro mất dữ liệu gần như bằng không.\n\n---\n\n## 📖 Định nghĩa\nBa mô hình VCS phân hóa chủ yếu dựa trên vị trí lưu trữ lịch sử dự án. Local VCS giữ lịch sử trên một máy tính cá nhân. CVCS lưu toàn bộ lịch sử tập trung tại một máy chủ duy nhất. DVCS (tiêu biểu là Git) phân phối toàn bộ kho lưu trữ kèm toàn bộ lịch sử về máy của từng lập trình viên.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\n- **Local VCS:** Bạn viết nhật ký vào một cuốn sổ tay cá nhân; mất sổ là mất tích.\n- **CVCS:** Cả làng phải xếp hàng đến ủy ban xã để viết chung vào một cuốn sổ cái; ủy ban đóng cửa là cả làng nghỉ viết.\n- **DVCS:** Mỗi người dân đều được in riêng một bản sao hoàn chỉnh của cuốn sổ cái; tha hồ ghi chép tại nhà rồi hẹn ngày đối chiếu đồng bộ sau.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMô hình CVCS (Ví dụ: SVN)               Mô hình DVCS (Ví dụ: Git)\n [Server trung tâm: Giữ lịch sử]         [Kho trung tâm chia sẻ]\n       ▲             ▲                         ▲             ▲\n  bắt buộc nối mạng                        đồng bộ khi có mạng\n       │             │                         │             │\n   [Máy A]        [Máy B]               [Máy A: Full lịch sử] [Máy B: Full lịch sử]\n(Chỉ có file)   (Chỉ có file)          (Làm việc độc lập 100%) (Làm việc độc lập 100%)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột lập trình viên mang laptop về quê nghỉ cuối tuần nơi sóng mạng chập chờn. Nhờ Git là hệ thống phân tán, anh ta vẫn ung dung mở máy, xem lại từng dòng code đã sửa trong quá khứ, chia nhánh tính năng và commit liên tục cả chục lần mà không cần kết nối Internet. Khi trở lại văn phòng có mạng, anh ta chỉ việc đẩy toàn bộ các commit đó lên kho chung cho cả đội.\n\n---\n\n## 💻 Command\nBài học so sánh kiến trúc này giúp bạn hiểu tường tận bản chất vận hành của Git; bạn chưa cần gõ lệnh Git nào trong bài này.\n\n---\n\n## 🔍 Giải thích command\nPhần thực hành tập trung vào việc rèn luyện tư duy phân biệt giữa các thao tác thực thi nội bộ trên ổ đĩa và các thao tác đồng bộ mạng lưới. Cú pháp cụ thể sẽ được giảng dạy ở bài kế tiếp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Git bắt buộc phải có kết nối Internet mới hoạt động:** Đa số thao tác trong Git (như xem log, commit, tạo nhánh, kiểm tra diff) diễn ra hoàn toàn offline trên máy tính của bạn.\n2. **Ngộ nhận rằng DVCS tự động đồng bộ code giữa các thành viên:** Git phân tán độc lập, nên sau khi code xong offline, bạn bắt buộc phải chủ động đẩy dữ liệu lên kho chung khi có mạng.\n3. **Tưởng rằng clone về máy chỉ giống như tải một file ZIP:** Tải ZIP chỉ lấy được phần ngọn mã nguồn hiện tại, trong khi clone tải về toàn bộ cơ sở dữ liệu lịch sử của dự án.\n\n---\n\n## 🧪 Lab\nGiả sử bạn vừa nhân bản (clone) một dự án Git về laptop và sau đó lên xe đò về quê (hoàn toàn không có mạng Internet). Hãy phân loại các tác vụ sau thành **Thực hiện được ngay lập tức** hoặc **Bắt buộc phải đợi có mạng**:\n1. Xem lại danh sách các commit và tác giả đã làm dự án trong 6 tháng qua.\n2. Viết thêm tính năng mới và đóng dấu mốc commit vào lịch sử.\n3. Gửi các commit vừa tạo lên kho chung trên mạng để đồng nghiệp tích hợp.\n4. Cập nhật những thay đổi mới nhất mà trưởng nhóm vừa tải lên vào sáng nay.\n\n---\n\n## 💡 Hint\nĐể phân biệt chính xác, người kỹ sư luôn tự hỏi: \"Tác vụ này chỉ đọc ghi dữ liệu trên kho lưu trữ tại ổ cứng của mình, hay cần bắt tay gửi nhận gói tin với máy tính của người khác?\"\n\n---\n\n## ✅ Validation\n- Trình bày được ưu điểm vượt trội của mô hình phân tán (DVCS) so với mô hình tập trung (CVCS).\n- Giải thích được tại sao điểm nghẽn máy chủ (Single Point of Failure) trong CVCS có thể làm tê liệt cả doanh nghiệp.\n- Phân loại chuẩn xác các thao tác Git thực hiện offline và các thao tác cần kết nối Internet.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi kiểm tra kiến thức kiến trúc bên dưới. Đọc kỹ phần đối chiếu của giảng viên để hiểu rõ từng phương án.\n\n---\n\n## 🔥 Challenge\nHãy vẽ lại sơ đồ tư duy so sánh ba mô hình Local, Centralized và Distributed trên giấy nháp; chỉ ra điểm chết hệ thống (Single Point of Failure) nằm ở đâu trong mô hình tập trung.\n\n---\n\n## 📚 Tổng kết\n- Centralized VCS (CVCS) phụ thuộc hoàn toàn vào máy chủ trung tâm; máy chủ ngưng hoạt động thì công việc đình trệ.\n- Git thuộc mô hình Distributed VCS (DVCS); mỗi máy lập trình viên là một kho chứa độc lập sở hữu trọn vẹn toàn bộ lịch sử.\n- Làm việc với Git diễn ra cục bộ với tốc độ cực nhanh; kết nối mạng chỉ cần thiết khi bạn có nhu cầu đồng bộ với đồng đội.\n\n",
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
