import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-version-control",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "01-version-control",
    "title": "Version Control là gì?",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [],
    "objectives": [
      "Giải thích được VCS giúp lưu và xem lại các mốc thay đổi.",
      "Nhận ra rủi ro khi chỉ tạo nhiều bản sao thư mục thủ công.",
      "Phân biệt mốc đã lưu với tệp đang sửa dở."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "vcs",
      "version control",
      "quan ly phien ban",
      "lich su",
      "source code"
    ],
    "commands": [
      "git --version"
    ]
  },
  "content": "# Vì sao cần lưu phiên bản?\n\n---\n\n## 🎯 Mục tiêu\n- Nói được bằng lời của mình hệ thống quản lý phiên bản giúp giải quyết việc gì.\n- Nhận ra vì sao các bản `final`, `final-2`, `final-moi-nhat` dễ gây nhầm.\n- Phân biệt mốc đã lưu trong Git với tệp đang sửa dở.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Version Control — quản lý phiên bản\n- **Nói dễ hiểu:** Cách lưu lại các mốc thay đổi để sau này xem lại, so sánh hoặc quay về một mốc đã lưu.\n- **Ví dụ:** Trước khi sửa bài thuyết trình, bạn lưu một mốc “bản đã được giảng viên duyệt”. Nếu lần sửa sau làm hỏng bố cục, bạn có thể đối chiếu với mốc đó.\n- **Đừng nhầm:** Git không tự chụp mọi lần bạn gõ phím. Bạn phải chủ động yêu cầu Git lưu một mốc.\n\n### VCS (Version Control System) — hệ thống quản lý phiên bản\n- **Nói dễ hiểu:** Tên gọi chung cho phần mềm giúp lưu và xem lịch sử thay đổi của tệp. Git là một VCS.\n- **Ví dụ:** Git có thể theo dõi mã nguồn; một VCS khác cũng có thể theo dõi tài liệu hoặc hình ảnh.\n- **Đừng nhầm:** VCS không tự sửa lỗi chương trình và không thay thế bản sao lưu cho mọi tình huống.\n\n### History — lịch sử thay đổi\n- **Nói dễ hiểu:** Danh sách các mốc mà bạn đã yêu cầu Git lưu, thường kèm người lưu, thời điểm và lời nhắn.\n- **Ví dụ:** “Tạo trang giới thiệu” → “Sửa lỗi nút gửi” là hai mốc có thể đọc lại.\n- **Đừng nhầm:** Tệp bạn mới sửa nhưng chưa lưu thành mốc chưa xuất hiện như một commit trong lịch sử.\n\n---\n\n## 🤔 Tại sao cần?\nBạn và một bạn cùng làm bài tập web. Hôm qua trang chạy tốt. Hôm nay bạn sửa phần đăng nhập rồi trang lỗi. Nếu chỉ có một thư mục, bạn khó biết chính xác phần nào đã đổi và bản chạy tốt nằm ở đâu. Đặt thêm tên `final-v2` cũng không nói rõ bản nào là bản tốt.\n\nGit giúp bạn lưu các mốc có lời nhắn, xem khác biệt giữa hai mốc và chọn lại nội dung cũ khi cần. Bạn vẫn phải chủ động lưu mốc; Git không tự quyết định thay bạn.\n\n---\n\n## 📖 Định nghĩa\nVersion Control là cách ghi lại các phiên bản đã chọn của tệp theo thời gian. Phần mềm thực hiện việc đó được gọi là Version Control System (VCS). Git là một VCS thường dùng trong phát triển phần mềm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy nghĩ về các mốc như những bản lưu riêng trong một cuốn sổ tiến độ. Mỗi khi hoàn thành một phần có ý nghĩa, bạn ghi lại một mốc và đặt tên cho nó. Nếu lần sau có lỗi, bạn có thể mở mốc cũ để so sánh hoặc khôi phục phần cần thiết.\n\nĐiểm cần nhớ: cuốn sổ chỉ có những mốc bạn đã chủ động ghi; nó không tự lưu từng thao tác gõ phím.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBạn chủ động lưu:   [Bản chạy được] ──> [Thêm trang giới thiệu] ──> [Sửa nút gửi]\n                       mốc 1                 mốc 2                  mốc 3\n```\nMỗi mốc ghi lại một trạng thái bạn muốn giữ. Git không tự tạo mốc khi bạn chỉ sửa tệp.\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhóm sinh viên làm chung trang giới thiệu câu lạc bộ. Sau khi phần đầu trang chạy đúng, nhóm lưu mốc “Tạo phần đầu trang”. Hôm sau một thay đổi làm lệch giao diện, nhóm so sánh với mốc trước để tìm đoạn vừa đổi. Các bạn vẫn cần lưu mốc và viết lời nhắn rõ ràng; Git không tự biết thay đổi nào là tốt.\n\n---\n\n## 💻 Command\n```bash\ngit --version\n```\n\n---\n\n## 🔍 Giải thích command\n`git --version` chỉ kiểm tra Git đã được cài và in số phiên bản. Lệnh này chưa tạo kho lưu trữ và chưa lưu thay đổi nào.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tin rằng Git tự lưu mọi lần gõ:** Git chỉ đưa thay đổi vào lịch sử sau khi bạn thực hiện các bước lưu mốc.\n2. **Đặt tên thư mục `final`, `final2`, `final-mới`:** Tên không giải thích nội dung nào đã đổi hoặc bản nào còn đúng.\n3. **Coi Git như bản sao lưu duy nhất:** Nếu máy hỏng trước khi bạn đẩy dữ liệu lên nơi khác, bản trên máy vẫn có thể mất.\n\n---\n\n## 🧪 Lab\nChọn một tình huống làm bạn dễ mất công nhất: không biết bản nào chạy được, không biết ai sửa phần nào, hay lỡ tay ghi đè bài của bạn cùng nhóm. Sau đó giải thích bằng một câu mốc lưu nào của Version Control sẽ giúp bạn xử lý tình huống đó.\n\n---\n\n## 💡 Hint\nHãy kể theo thứ tự: “Trước khi lỗi xảy ra, tôi muốn lưu lại ___; khi lỗi xảy ra, tôi sẽ so sánh với ___.”\n\n---\n\n## ✅ Validation\n- Giải thích được VCS giúp lưu và xem lại các mốc thay đổi.\n- Nhắc được rằng Git không tự lưu mọi lần gõ phím.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Khi sai, đọc phần giải thích rồi thử lại.\n\n---\n\n## 🔥 Challenge\nNói cho một bạn chưa dùng Git hiểu vì sao đặt tên thư mục `bai-final-2` không đáng tin bằng việc lưu một mốc có lời nhắn.\n\n---\n\n## 📚 Tổng kết\n- **Version Control** là cách lưu và xem lại các phiên bản đã chọn.\n- **VCS** là phần mềm giúp quản lý lịch sử thay đổi; Git là một VCS.\n- Mốc chỉ xuất hiện khi bạn chủ động lưu; Git không tự lưu từng lần gõ.\r\n",
  "quiz": {
    "id": "quiz-01-version-control",
    "title": "Trắc nghiệm: Version Control là gì?",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích cốt lõi nhất của một hệ thống quản lý phiên bản (VCS) là gì?",
        "type": "single",
        "options": [
          {
            "text": "Lưu, theo dõi và xem lại những phiên bản bạn chủ động ghi nhận",
            "correct": true
          },
          {
            "text": "Biên dịch mã nguồn JavaScript sang mã máy để tăng tốc độ chạy ứng dụng",
            "correct": false
          },
          {
            "text": "Tự động sửa lỗi cú pháp trong các tệp tin HTML và CSS",
            "correct": false
          },
          {
            "text": "Chạy quét virus và tường lửa ngăn chặn hacker tấn công máy tính",
            "correct": false
          }
        ],
        "explanation": "VCS giúp lưu các mốc thay đổi để so sánh hoặc xem lại sau này. Git không tự lưu mọi lần gõ phím; người dùng cần chủ động tạo mốc."
      },
      {
        "id": "q2",
        "question": "Bạn đã lưu một commit khi dự án còn chạy tốt, sau đó một thay đổi làm phát sinh lỗi. VCS giúp gì trong tình huống này?",
        "type": "single",
        "options": [
          {
            "text": "Bạn phải xóa bỏ toàn bộ dự án và viết lại mã nguồn từ đầu",
            "correct": false
          },
          {
            "text": "Bạn có thể xem lại hoặc khôi phục từ mốc đã lưu trước khi lỗi xảy ra",
            "correct": true
          },
          {
            "text": "Máy tính sẽ tự động định dạng lại ổ cứng để xóa sạch các lỗi phát sinh",
            "correct": false
          },
          {
            "text": "Bạn phải liên hệ với quản trị viên mạng để mở khóa tệp tin",
            "correct": false
          }
        ],
        "explanation": "VCS cho phép xem lại những mốc bạn đã lưu. Thay đổi chưa được lưu thành commit không tự xuất hiện trong lịch sử và vẫn cần được bảo vệ riêng."
      },
      {
        "id": "q3",
        "question": "Vì sao việc đặt tên thư mục kiểu \"project_v1\", \"project_final\" lại bị coi là sai lầm trong kỹ nghệ phần mềm?",
        "type": "single",
        "options": [
          {
            "text": "Vì hệ điều hành không cho phép đặt tên thư mục có dấu gạch dưới",
            "correct": false
          },
          {
            "text": "Vì gây lãng phí dung lượng, dễ nhầm lẫn và không hỗ trợ làm việc nhóm an toàn",
            "correct": true
          },
          {
            "text": "Vì Git sẽ từ chối quản lý các thư mục có từ \"final\"",
            "correct": false
          },
          {
            "text": "Vì tệp tin sẽ tự động bị mã hóa và không thể mở lại được",
            "correct": false
          }
        ],
        "explanation": "Quản lý phiên bản thủ công bằng cách copy thư mục gây tốn dung lượng ổ đĩa, dễ nhầm lẫn tệp tin mới/cũ và không thể so sánh chi tiết từng dòng code thay đổi."
      },
      {
        "id": "q4",
        "question": "Lệnh nào cho phép xem phiên bản phần mềm Git đang chạy trên máy tính?",
        "type": "single",
        "options": [
          {
            "text": "git --version",
            "correct": true
          },
          {
            "text": "git check-system",
            "correct": false
          },
          {
            "text": "git show-update",
            "correct": false
          },
          {
            "text": "git status --all",
            "correct": false
          }
        ],
        "explanation": "`git --version` là câu lệnh chuẩn trong giao diện dòng lệnh để in ra phiên bản cài đặt của công cụ Git."
      }
    ]
  }
};
export default lesson;
