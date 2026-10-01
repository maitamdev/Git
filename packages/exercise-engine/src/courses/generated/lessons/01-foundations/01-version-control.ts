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
    "commands": []
  },
  "content": "# Version Control là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích bằng ví dụ vấn đề mà quản lý phiên bản giúp giải quyết.\n- Nêu được vì sao đặt nhiều bản sao tên `final` dễ gây nhầm.\n- Phân biệt phần đang sửa với một mốc đã lưu trong lịch sử Git.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Version Control — quản lý phiên bản\n- **Nói dễ hiểu:** Cách ghi lại những phiên bản bạn chọn để sau này xem lại, so sánh hoặc lấy lại nội dung cũ.\n- **Ví dụ:** Trước khi sửa bài thuyết trình, bạn lưu một mốc “bản đã được giảng viên duyệt”. Nếu lần sửa sau làm lệch bố cục, bạn có thể so sánh với mốc đó.\n- **Đừng nhầm:** Git không tự lưu mọi lần bạn gõ phím. Bạn phải chủ động chọn lúc lưu một mốc.\n\n### VCS (Version Control System) — hệ thống quản lý phiên bản\n- **Nói dễ hiểu:** Phần mềm giúp ghi lại và xem lịch sử thay đổi của tệp. Git là một VCS.\n- **Ví dụ:** Git thường được dùng cho mã nguồn, nhưng cũng có thể theo dõi tài liệu hoặc hình ảnh.\n- **Đừng nhầm:** VCS không tự sửa lỗi chương trình và không thay thế bản sao lưu ở nơi khác.\n\n### Commit — mốc đã lưu trong Git\n- **Nói dễ hiểu:** Một bản ghi về trạng thái dự án mà bạn chủ động đưa vào lịch sử Git.\n- **Ví dụ:** Sau khi hoàn thành phần đầu trang, bạn lưu một commit với lời nhắn “Tạo phần đầu trang”.\n- **Đừng nhầm:** Commit không lưu từng lần gõ phím và cũng không tự gửi dữ liệu sang máy khác.\n\n### History — lịch sử thay đổi\n- **Nói dễ hiểu:** Danh sách các commit đã lưu, được xếp theo quan hệ trước sau.\n- **Ví dụ:** Bạn có thể đọc các lời nhắn “Tạo phần đầu trang” rồi “Sửa nút gửi” để biết dự án đã thay đổi ra sao.\n- **Đừng nhầm:** Phần bạn mới sửa nhưng chưa lưu thành commit chưa xuất hiện trong lịch sử Git.\n\n---\n\n## 🤔 Tại sao cần?\nBạn sửa bài tập web và vô tình làm hỏng trang từng chạy tốt. Nếu chỉ còn tệp hiện tại, bạn khó biết phần nào vừa đổi và không có mốc rõ ràng để so sánh. Tạo nhiều bản `final`, `final-2`, `final-moi-nhat` có thể giữ lại vài bản, nhưng tên tệp không cho biết chính xác chúng khác nhau ở đâu hoặc bản nào đã được kiểm tra.\n\nVersion Control ghi lại những mốc bạn chọn. Nhờ vậy, bạn có thể xem khác biệt giữa các mốc và lấy lại nội dung từ một mốc cũ. Công cụ không tự biết bản nào tốt nhất; bạn cần chọn mốc có ý nghĩa và ghi lời nhắn dễ hiểu.\n\n---\n\n## 📖 Định nghĩa\nVersion Control là cách ghi lại các phiên bản đã chọn của một hay nhiều tệp theo thời gian. Phần mềm dùng để quản lý lịch sử đó được gọi là Version Control System (VCS). Trong Git, một trạng thái được lưu vào lịch sử gọi là commit.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung lịch sử Git như một cuốn sổ có các mốc bạn tự chọn. Mỗi commit ghi nhận trạng thái dự án tại một thời điểm; những lần sửa sau vẫn nằm ngoài lịch sử cho đến khi bạn chủ động lưu thành mốc mới.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrong lịch sử:  [Commit 1: trang chạy tốt] ───> [Commit 2: thêm trang giới thiệu]\n                                                     |\nBạn đang sửa:                                        └──> sửa nút gửi, chưa lưu thành commit\n```\nChỉ hai ô `Commit` là mốc đã lưu. Phần sửa nút gửi chưa nằm trong lịch sử.\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm sinh viên hoàn thành phần đầu trang câu lạc bộ và lưu commit “Tạo phần đầu trang”. Hôm sau một lần sửa làm lệch giao diện. Nhóm có thể so sánh phần đang sửa với commit trước đó để tìm thay đổi liên quan, rồi lấy lại nội dung cần thiết. Git cho nhóm lịch sử để tra cứu; các bạn vẫn phải tự kiểm tra và quyết định cách sửa.\n\n---\n\n## 💻 Command\nBài này chưa cần chạy lệnh Git; trước tiên hãy hiểu vấn đề mà lịch sử phiên bản giải quyết.\n\n---\n\n## 🔍 Giải thích command\nĐây là bài nhập môn về ý tưởng quản lý phiên bản, chưa hướng dẫn thao tác bằng lệnh. Bạn sẽ bắt đầu dùng lệnh Git ở các bài tiếp theo.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ Git tự lưu mọi lần gõ:** Chỉ những trạng thái bạn chủ động lưu thành commit mới được ghi vào lịch sử.\n2. **Dùng nhiều bản `final` thay cho lịch sử:** Các bản sao không tự cho biết chính xác từng thay đổi và lý do thay đổi.\n3. **Coi Git trên một máy là bản sao lưu đầy đủ:** Nếu thiết bị hỏng, dữ liệu Git chỉ nằm trên thiết bị đó vẫn có thể mất.\n\n---\n\n## 🧪 Lab\nMột nhóm có ba tệp `bai-final.docx`, `bai-final-2.docx` và `bai-final-moi-nhat.docx`. Một tệp có phần sửa mới nhất, nhưng nhóm không nhớ tệp nào đã được giảng viên duyệt.\n\n1. Viết một câu nêu thông tin mà tên ba tệp chưa cho bạn biết.\n2. Chọn một trạng thái đáng lưu thành commit trước khi sửa tiếp và giải thích vì sao.\n3. Giả sử lần sửa tiếp theo làm hỏng nội dung: nói cách lịch sử phiên bản giúp nhóm tìm phần cần xem lại.\n\n---\n\n## 💡 Hint\nHãy tự hỏi: “Tôi muốn giữ lại trạng thái nào?”, “Tôi cần biết hai trạng thái khác nhau ở đâu?” và “Phần sửa chưa lưu có nằm trong lịch sử chưa?”\n\n---\n\n## ✅ Validation\n- Nêu được VCS ghi lại các phiên bản đã chọn để xem lại hoặc so sánh.\n- Giải thích được commit là một mốc chủ động lưu vào lịch sử Git.\n- Phân biệt được phần đang sửa với phần đã lưu thành commit.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Nếu chọn sai, đọc phần giải thích rồi thử lại.\n\n---\n\n## 🔥 Challenge\nGiải thích cho một bạn chưa dùng Git vì sao lịch sử các mốc có lời nhắn giúp nhóm tìm lại thay đổi dễ hơn những bản sao tên `bai-final-2`.\n\n---\n\n## 📚 Tổng kết\n- Version Control giúp lưu các phiên bản đã chọn để xem lại, so sánh hoặc lấy lại nội dung cũ.\n- Trong Git, commit là một mốc trạng thái được chủ động ghi vào lịch sử.\n- Thay đổi chưa lưu thành commit chưa có trong lịch sử; Git cũng không tự tạo bản sao lưu ở nơi khác.\n",
  "quiz": {
    "id": "quiz-01-version-control",
    "title": "Trắc nghiệm: Version Control là gì?",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích nào mô tả đúng nhất về Version Control?",
        "type": "single",
        "options": [
          {
            "text": "Ghi lại các phiên bản được chọn để xem lại hoặc so sánh về sau",
            "correct": true
          },
          {
            "text": "Tự động lưu mọi ký tự người dùng gõ vào tệp",
            "correct": false
          },
          {
            "text": "Tự gửi tất cả tệp của dự án lên Internet",
            "correct": false
          },
          {
            "text": "Tự tìm và sửa mọi lỗi trong chương trình",
            "correct": false
          }
        ],
        "explanation": "Version Control lưu những mốc người dùng chọn để xem lại và so sánh. Nó không tự lưu từng lần gõ, tải tệp lên mạng hoặc sửa lỗi."
      },
      {
        "id": "q2",
        "question": "Bạn đã lưu một commit khi trang còn chạy tốt, rồi một lần sửa làm trang lỗi. Git giúp gì?",
        "type": "single",
        "options": [
          {
            "text": "Tự nhận ra lỗi và sửa đúng dòng mà không cần bạn kiểm tra",
            "correct": false
          },
          {
            "text": "Cho bạn so sánh thay đổi với commit cũ và lấy lại nội dung cần thiết",
            "correct": true
          },
          {
            "text": "Xóa mọi thay đổi sau commit cũ ngay khi trang báo lỗi",
            "correct": false
          },
          {
            "text": "Chỉ cho xem lịch sử nếu dự án đã được gửi lên Internet",
            "correct": false
          }
        ],
        "explanation": "Commit cũ cho bạn một trạng thái để so sánh hoặc lấy lại nội dung. Git không tự xác định nguyên nhân lỗi hay chọn thay đổi cần khôi phục."
      },
      {
        "id": "q3",
        "question": "Rủi ro nào dễ gặp khi tự tạo nhiều tệp tên `final`, `final-2`, `final-moi-nhat`?",
        "type": "single",
        "options": [
          {
            "text": "Khó biết các tệp khác nhau ở đâu và bản nào đã được kiểm tra",
            "correct": true
          },
          {
            "text": "Hệ điều hành sẽ tự gộp nội dung các tệp thành một bản",
            "correct": false
          },
          {
            "text": "Git sẽ xóa mọi thư mục có chữ `final` trong tên",
            "correct": false
          },
          {
            "text": "Tệp sao chép luôn được lưu thêm trên một thiết bị khác",
            "correct": false
          }
        ],
        "explanation": "Tên tệp chỉ là nhãn do người đặt; chúng không ghi rõ từng khác biệt, người sửa hay lý do thay đổi như một lịch sử có tổ chức."
      },
      {
        "id": "q4",
        "question": "Bạn đã lưu một commit rồi sửa tiếp tệp nhưng chưa lưu mốc mới. Điều nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Lần sửa mới đã tự xuất hiện trong lịch sử Git",
            "correct": false
          },
          {
            "text": "Lịch sử vẫn có commit cũ; lần sửa mới chưa nằm trong một commit",
            "correct": true
          },
          {
            "text": "Git xóa commit cũ để thay bằng phần đang sửa",
            "correct": false
          },
          {
            "text": "Tệp đang sửa chắc chắn đã bị mất",
            "correct": false
          }
        ],
        "explanation": "Commit ghi lại trạng thái tại lúc bạn lưu nó; sửa sau đó không tự viết lại lịch sử và phần sửa vẫn có thể còn trong tệp hiện tại."
      },
      {
        "id": "q5",
        "question": "Dự án chỉ có một bản Git trên laptop. Nếu laptop hỏng, điều gì cần nhớ?",
        "type": "single",
        "options": [
          {
            "text": "Git tự tạo thêm một bản đầy đủ trên Internet",
            "correct": false
          },
          {
            "text": "Lịch sử trên laptop cũng có thể mất; cần có bản sao ở nơi khác",
            "correct": true
          },
          {
            "text": "Mọi commit đã lưu đều tự chuyển sang máy của bạn cùng nhóm",
            "correct": false
          },
          {
            "text": "Không thể dùng Git nếu chưa mua dịch vụ sao lưu",
            "correct": false
          }
        ],
        "explanation": "Repository Git chỉ có trên một thiết bị không bảo vệ khỏi hỏng thiết bị. Muốn có bản dự phòng, bạn cần sao chép dữ liệu sang một nơi khác."
      }
    ]
  }
};
export default lesson;
