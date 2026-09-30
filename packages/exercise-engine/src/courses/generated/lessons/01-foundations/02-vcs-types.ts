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
      "Phân biệt rõ 3 thế hệ kiến trúc VCS: Cục bộ (Local), Tập trung (Centralized), và Phân tán (Distributed).",
      "Đánh giá được ưu nhược điểm cốt lõi của SVN so với Git.",
      "Hiểu vì sao mô hình phân tán (DVCS) trở thành tiêu chuẩn thống trị ngành công nghiệp phần mềm hiện đại."
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
  "content": "# Local / Centralized / Distributed VCS\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ 3 thế hệ kiến trúc VCS: Cục bộ (Local), Tập trung (Centralized), và Phân tán (Distributed).\n- Đánh giá được ưu nhược điểm cốt lõi của SVN so với Git.\n- Hiểu vì sao mô hình phân tán (DVCS) trở thành tiêu chuẩn thống trị ngành công nghiệp phần mềm hiện đại.\n\n---\n\n## 📖 Định nghĩa\n> Hệ thống quản lý phiên bản trải qua ba thế hệ tiến hóa kiến trúc then chốt: Local VCS (quản lý lịch sử cục bộ trên cùng một máy đơn lẻ), Centralized VCS - CVCS (lưu trữ toàn bộ lịch sử trên một máy chủ trung tâm duy nhất, ví dụ SVN, CVS), và Distributed VCS - DVCS (mọi máy tính thành viên đều sao chép toàn bộ cơ sở dữ liệu lịch sử dự án về máy cục bộ, ví dụ Git, Mercurial). Trong DVCS, mỗi lập trình viên đều sở hữu một bản sao hoàn chỉnh của kho lưu trữ, cho phép làm việc độc lập hoàn toàn mà không phụ thuộc vào kết nối mạng liên tục.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu rõ sự khác biệt giữa Centralized VCS và Distributed VCS giúp bạn nắm được lý do tại sao Git lại có tốc độ xử lý vượt trội và độ an toàn dữ liệu cao đến vậy. Với CVCS truyền thống, nếu máy chủ trung tâm bị mất mạng hoặc hỏng ổ cứng, toàn bộ đội ngũ lập trình viên sẽ bị ngưng trệ công việc, không thể commit hay xem lại lịch sử. Ngược lại, DVCS loại bỏ hoàn toàn điểm nghẽn đơn độc (Single Point of Failure), bảo đảm an toàn dữ liệu tuyệt đối.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy so sánh CVCS giống như một cuốn sổ cái duy nhất đặt tại thư viện thành phố, ai muốn ghi chép hay tra cứu đều phải đến tận nơi xếp hàng. Nếu tòa nhà thư viện bị cháy hoặc mất điện đóng cửa, không ai có thể làm việc được nữa. Trong khi đó, DVCS giống như việc mỗi thành viên trong hội nghiên cứu đều sở hữu một máy in 3D công nghệ cao, tự động đồng bộ và in ra một cuốn sổ cái hoàn chỉnh ngay tại phòng làm việc riêng của mình.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMô hình CVCS (SVN):                 Mô hình DVCS (Git):\n   [Máy chủ trung tâm]                  [Server chia sẻ]\n       ▲        ▲                           ▲        ▲\n       │        │                           ▼        ▼\n[Máy Client A] [Máy Client B]       [Repo Client A] [Repo Client B]\n(Chỉ có Working Copy)               (Có đủ 100% lịch sử và commit)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty phần mềm đa quốc gia với các chi nhánh tại Hà Nội, Tokyo và San Francisco cùng phát triển một nền tảng thương mại điện tử. Nếu sử dụng hệ thống SVN kiểu cũ, mỗi khi kỹ sư tại Hà Nội muốn tạo commit hoặc xem lịch sử code, lệnh phải gửi qua đường truyền Internet xuyên đại dương đến máy chủ đặt tại Mỹ, gây ra độ trễ hàng chục giây. Khi chuyển đổi sang Git, toàn bộ thao tác commit, tạo nhánh hay xem lịch sử diễn ra ngay tức thì trên ổ cứng máy tính tại Hà Nội, chỉ mất vài mili-giây mà không hề cần kết nối Internet.\n\n---\n\n## 💻 Command\n```bash\ngit log\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log`: Hiển thị danh sách lịch sử toàn bộ các commit đã được ghi nhận trong kho lưu trữ cục bộ của bạn, bao gồm mã băm SHA tác giả ngày giờ và thông điệp mô tả thay đổi chi tiết.\n- `git status`: Lệnh kiểm tra tình trạng hiện tại của các tệp tin trong thư mục làm việc so với kho chứa, giúp phát hiện tệp nào đang sửa hoặc chưa đưa vào diện theo dõi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Git cần kết nối Internet để commit**:  Nhiều bạn lầm tưởng không có Wi-Fi thì không dùng được Git, thực chất Git hoạt động hoàn toàn offline trên máy tính của bạn.\n2. **Nhầm lẫn giữa Git và SVN**:  Áp đặt tư duy khóa tệp (file locking) của SVN vào mô hình phân tán của Git.\n3. **Không sao lưu kho chứa lên máy chủ từ xa**:  Ỷ lại vào máy cá nhân mà không đẩy dữ liệu lên GitHub để dự phòng rủi ro phần cứng hỏng hóc.\n\n---\n\n## 🧪 Lab\n1. Kiểm tra khả năng hoạt động offline của Git bằng cách ngắt kết nối mạng hoặc thử chạy lệnh trong terminal cục bộ.\n2. Sử dụng lệnh `git status` để xem phản hồi trạng thái từ cơ sở dữ liệu nội bộ.\n3. Nhận biết rằng Git đọc dữ liệu trực tiếp từ ổ đĩa cục bộ chứ không gửi truy vấn HTTP nào ra ngoài.\n\n---\n\n## 💡 Hint\n> Mọi thao tác commit và tạo nhánh trong Git đều diễn ra tức thì trên máy của bạn.\n\n---\n\n## ✅ Validation\n- Hiểu bản chất phân tán của Git và phân biệt được với hệ thống tập trung.\n\n---\n\n## ❓ Quiz\nKiểm tra kiến thức về các mô hình kiến trúc quản lý phiên bản qua các câu hỏi sau.\n\n---\n\n## 🔥 Challenge\nPhân tích tình huống rủi ro khi máy chủ lưu trữ chính bị hỏng trong mô hình SVN so với mô hình Git.\n\n---\n\n## 📚 Tổng kết\n- Local VCS chỉ lưu trên một máy đơn lẻ; CVCS lưu tập trung trên một server trung tâm.\n- Distributed VCS (Git) lưu đầy đủ toàn bộ cơ sở dữ liệu lịch sử trên mọi máy tính thành viên.\n- Mô hình phân tán mang lại tốc độ cực nhanh, khả năng làm việc offline hoàn hảo và độ an toàn dữ liệu cao nhất.\n",
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
            "text": "Mỗi máy trạm trong DVCS đều có một bản sao đầy đủ của toàn bộ kho lưu trữ và lịch sử dự án",
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
        "explanation": "Trong DVCS, mỗi client clone về một kho chứa đầy đủ 100% lịch sử và đối tượng dữ liệu, không phụ thuộc vào server để thực hiện các thao tác thường ngày."
      },
      {
        "id": "q2",
        "question": "Nếu máy chủ trung tâm bị mất kết nối mạng Internet, lập trình viên sử dụng Git có thể làm những gì?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn có thể commit, tạo nhánh, kiểm tra diff và xem lịch sử bình thường trên máy cục bộ",
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
        "explanation": "Vì sở hữu trọn vẹn bản sao kho lưu trữ cục bộ, lập trình viên có thể thực hiện mọi tác vụ quản lý phiên bản hoàn toàn offline."
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
        "explanation": "Trong CVCS, nếu server trung tâm bị hỏng thì toàn bộ dự án và lịch sử bị tê liệt hoặc biến mất nếu không có backup."
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
