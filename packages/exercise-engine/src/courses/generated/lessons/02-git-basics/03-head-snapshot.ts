import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-head-snapshot",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "03-head-snapshot",
    "title": "Repository, commit và vị trí HEAD",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "02-staging-area"
    ],
    "objectives": [
      "Nhận biết `HEAD` là vị trí hiện tại trong lịch sử Git.",
      "Phân biệt tệp đang sửa với trạng thái đã lưu trong commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "repository",
      "head",
      "snapshot",
      "commit graph",
      "kho luu tru"
    ],
    "commands": []
  },
  "content": "# Repository, commit và vị trí HEAD: Chiếc la bàn định vị của Git\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Thấu hiểu cơ chế định vị không gian của Git thông qua con trỏ đặc biệt `HEAD`.\r\n- Phân biệt mối quan hệ ba tầng: Commit Snapshot (nội dung), Branch (nhãn nhánh) và `HEAD` (vị trí bạn đang đứng).\r\n- Giải thích hiện tượng nhánh thai nghén khi repo vừa khởi tạo chưa có commit đầu tiên.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### HEAD — vị trí Git đang đứng\r\n- **Nói dễ hiểu:** Chiếc kẹp sách đánh dấu vị trí làm việc hiện tại của bạn trên dòng thời gian lịch sử dự án.\r\n- **Ví dụ:** Khi bạn đang làm việc bình thường trên nhánh `main`, `HEAD` sẽ bám chặt vào nhánh `main`.\r\n- **Đừng nhầm:** `HEAD` không phải là một file code hay một nhánh mới; nó là con trỏ chỉ đường của Git.\r\n\r\n### Commit snapshot — trạng thái đã lưu\r\n- **Nói dễ hiểu:** Bản đóng băng nguyên vẹn diện mạo dự án tại một thời khắc lịch sử cụ thể.\r\n- **Ví dụ:** Commit “Tạo trang chủ” lưu giữ toàn bộ mã nguồn website lúc vừa dựng xong giao diện.\r\n- **Đừng nhầm:** Mốc Snapshot là bất biến vĩnh viễn; việc bạn gõ code sửa đổi sau này không bao giờ làm thay đổi mốc đã lưu.\r\n\r\n### Branch — nhánh lịch sử\r\n- **Nói dễ hiểu:** Một nhãn dán di động luôn tự động trỏ vào mốc commit mới nhất của một nhánh phát triển.\r\n- **Ví dụ:** Nhánh `main` là dòng chảy chính của dự án, tự động nhảy cóc tới commit mới mỗi khi bạn lưu mốc.\r\n- **Đừng nhầm:** Nhánh trong Git cực kỳ nhẹ, nó chỉ là một con trỏ nhỏ chứ không phải bản sao chép cả thư mục nặng nề.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nMột dự án phần mềm có thể có hàng trăm commit và nhiều nhánh phát triển song song. Nếu không có cơ chế định vị chuẩn xác, Git sẽ không biết bạn đang muốn xem code ở mốc thời gian nào và commit tiếp theo sẽ được nối vào đâu. Con trỏ `HEAD` chính là chiếc la bàn nội bộ giúp Git luôn trả lời được câu hỏi cốt tử: \"Tôi đang đứng ở đâu trong không gian lịch sử này?\"\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\n`HEAD` là con trỏ tham chiếu đặc biệt trong Git xác định vị trí làm việc hiện tại của bạn. Thông thường, `HEAD` trỏ vào một nhánh (như `main`), và nhánh đó lại trỏ tới commit mới nhất. Mỗi khi bạn tạo commit mới, nhánh và `HEAD` sẽ cùng tịnh tiến về phía trước.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy tưởng tượng lịch sử dự án như một đoàn tàu hỏa gồm nhiều toa (các Commit) nối đuôi nhau. Nhánh `main` là tấm biển treo ở toa tàu cuối cùng. Còn `HEAD` chính là vị trí của bạn: bạn đang đứng ở toa cuối cùng nhìn về phía trước và sẵn sàng móc thêm một toa tàu mới vào đoàn!\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nMô hình con trỏ HEAD trong Repository:\r\n[Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [main]\r\n                                                ▲\r\n                                                │\r\n                                              [HEAD] (Bạn đang đứng tại Commit C trên nhánh main)\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nDự án của bạn đã có ba commit. Khi bạn gõ code và chuẩn bị tạo commit thứ tư, Git nhìn vào `HEAD` để biết bạn đang ở nhánh `main`. Khi commit thành công, toa tàu thứ tư được móc vào, nhãn `main` dịch chuyển sang toa thứ tư và `HEAD` cũng tự động di chuyển theo để tiếp tục đón nhận những thay đổi tiếp theo của bạn.\r\n\r\n---\r\n\r\n## 💻 Command\r\nBài học kiến trúc này giúp bạn dựng mô hình tư duy chuẩn xác trong đầu trước khi chạm tay vào bàn phím ở các bài thực hành lệnh tiếp theo.\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\nĐây là bài học nền tảng về cơ chế định vị của Git. Trong kho chứa chưa có commit đầu tiên, lịch sử vẫn đang rỗng nên các lệnh truy vấn lịch sử như `git log` hay `git show HEAD` sẽ chưa thể hoạt động.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Nhầm lẫn giữa `HEAD` và tên nhánh:** `main` là tên của nhánh phát triển; còn `HEAD` là con trỏ chỉ vị trí bạn đang đứng để thao tác.\r\n2. **Hoang mang khi repo mới không xem được `git log`:** Một repository vừa khởi tạo chưa có commit nào thì con trỏ `HEAD` chưa có điểm tựa để hiển thị lịch sử; đó là trạng thái bình thường.\r\n3. **Tưởng rằng nhánh là một bản sao chép nặng nề:** Nhánh trong Git thực chất chỉ là một con trỏ siêu nhẹ lưu mã định danh của commit.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\nQuan sát kỹ sơ đồ mô hình đoàn tàu ở trên và trả lời các câu hỏi sau:\r\n1. Trong sơ đồ, commit nào đang đại diện cho trạng thái mã nguồn mới nhất của dự án?\r\n2. Nhánh `main` hiện đang gắn liền với commit nào?\r\n3. Mối quan hệ giữa con trỏ `HEAD` và nhánh `main` được thể hiện ra sao?\r\n4. Nếu bây giờ bạn tạo thêm Commit D, con trỏ nào sẽ tự động di chuyển sang Commit D?\r\n\r\n---\r\n\r\n## 💡 Hint\r\nHãy nhớ quy tắc: \"Commit mới sinh ra, nhánh tiến lên phía trước, và `HEAD` luôn đồng hành cùng nhánh bạn đang đứng.\"\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Trình bày được bản chất của con trỏ `HEAD` và mối quan hệ với nhánh `main`.\r\n- Giải thích được vì sao repository mới tinh chưa thể thực thi các lệnh xem lịch sử.\r\n- Phân tích được mô hình đoàn tàu nối đuôi nhau của các mốc Commit.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nLàm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD. Đọc kỹ phân tích sư phạm của giảng viên.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nHãy thử giải thích hiện tượng HEAD bị tách rời (Detached HEAD) cho một người bạn: Điều gì sẽ xảy ra nếu `HEAD` trỏ thẳng vào một commit trong quá khứ thay vì bám vào một nhánh?\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- `HEAD` là chiếc kẹp sách định vị vị trí làm việc hiện tại của bạn trong kho lưu trữ Git.\r\n- Mỗi commit mới sinh ra sẽ tự động làm tịnh tiến nhánh làm việc và con trỏ `HEAD` về phía trước.\r\n- Nhánh và `HEAD` chỉ là những con trỏ siêu nhẹ giúp bạn du hành thời gian mượt mà trong lịch sử dự án.\r\n\r\n",
  "quiz": {
    "id": "quiz-02-03-head-snapshot",
    "title": "Trắc nghiệm: Repository & HEAD Snapshot",
    "questions": [
      {
        "id": "q1",
        "question": "Con trỏ HEAD trong Git đóng vai trò chính là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ định vị trí commit hoặc nhánh mà bạn đang làm việc trực tiếp hiện tại",
            "correct": true
          },
          {
            "text": "Lưu trữ mật khẩu đăng nhập vào máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Là commit đầu tiên khi khởi tạo dự án",
            "correct": false
          },
          {
            "text": "Tự động biên dịch mã nguồn thành file chạy",
            "correct": false
          }
        ],
        "explanation": "HEAD cho biết nhánh hoặc commit hiện được chọn làm vị trí làm việc."
      },
      {
        "id": "q2",
        "question": "Khi bạn tạo một commit mới trong trạng thái bình thường, điều gì sẽ xảy ra với HEAD?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh hiện tại trỏ tới commit mới; HEAD theo nhánh đang chọn",
            "correct": true
          },
          {
            "text": "HEAD sẽ bị xóa bỏ và bạn phải khởi động lại máy tính",
            "correct": false
          },
          {
            "text": "HEAD vẫn đứng yên ở commit đầu tiên của dự án",
            "correct": false
          },
          {
            "text": "HEAD sẽ nhảy sang kho lưu trữ của người khác",
            "correct": false
          }
        ],
        "explanation": "Commit mới trở thành đầu nhánh hiện tại; HEAD tiếp tục chỉ vị trí làm việc đó."
      },
      {
        "id": "q3",
        "question": "Snapshot trong Repository của Git có đặc tính cốt lõi nào dưới đây?",
        "type": "single",
        "options": [
          {
            "text": "Commit đã tạo không bị sửa tại chỗ; thay đổi sau đó tạo commit mới",
            "correct": true
          },
          {
            "text": "Tự động biến mất sau 30 ngày nếu không có kết nối mạng",
            "correct": false
          },
          {
            "text": "Có thể chỉnh sửa trực tiếp nội dung bằng phần mềm Word",
            "correct": false
          },
          {
            "text": "Chỉ lưu lại các tệp tin có dung lượng dưới 1 kilobyte",
            "correct": false
          }
        ],
        "explanation": "Git giữ commit đã tạo; khi lưu thay đổi tiếp theo, Git tạo một commit khác."
      },
      {
        "id": "q4",
        "question": "Bạn vừa khởi tạo repository nhưng chưa tạo commit. Nhận định nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Chưa có snapshot nào để xem trong lịch sử",
            "correct": true
          },
          {
            "text": "`HEAD` tự tạo một commit rỗng",
            "correct": false
          },
          {
            "text": "Repository tự tải lịch sử từ GitHub",
            "correct": false
          },
          {
            "text": "Tệp trong thư mục tự trở thành commit",
            "correct": false
          }
        ],
        "explanation": "`git init` tạo repository nhưng không tạo commit; người dùng cần stage thay đổi rồi commit."
      },
      {
        "id": "q5",
        "question": "Khi ở một nhánh thông thường, HEAD giúp bạn biết điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Vị trí commit hoặc nhánh đang được chọn để làm việc",
            "correct": true
          },
          {
            "text": "Danh sách mọi tệp untracked",
            "correct": false
          },
          {
            "text": "Máy chủ GitHub đang hoạt động hay không",
            "correct": false
          },
          {
            "text": "Lệnh tiếp theo Git sẽ tự chạy",
            "correct": false
          }
        ],
        "explanation": "HEAD đánh dấu vị trí làm việc hiện tại; khi đứng trên nhánh, nó theo nhánh đó."
      }
    ]
  }
};
export default lesson;
