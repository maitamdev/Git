import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-architecture",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "04-git-architecture",
    "title": "Git hoạt động như thế nào? Snapshot và Diff",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "03-git-la-gi"
    ],
    "objectives": [
      "Giải thích commit ghi nhận trạng thái dự án tại một thời điểm.",
      "Phân biệt Snapshot là trạng thái đã lưu với Diff là phần khác nhau.",
      "So sánh hai phiên bản mẫu để chỉ ra thay đổi cụ thể."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "snapshot",
      "diff",
      "commit",
      "project history"
    ],
    "commands": []
  },
  "content": "# Git hoạt động như thế nào? Snapshot và Diff\n\n---\n\n## 🎯 Mục tiêu\n- Khám phá mô hình dữ liệu cốt lõi giúp Git đạt tốc độ vượt trội: Dòng chảy các Snapshot (Stream of Snapshots).\n- Phân biệt bản chất giữa Snapshot (ảnh chụp trạng thái toàn diện) và Diff (sai biệt được tính toán giữa hai mốc).\n- Giải mã cơ chế tái sử dụng dữ liệu thông minh giúp Git lưu trữ hàng triệu phiên bản mà không tốn dung lượng ổ đĩa.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Snapshot — Ảnh chụp trạng thái toàn cảnh\n- **Nói dễ hiểu:** Bản ghi lại trọn vẹn diện mạo và nội dung của toàn bộ dự án tại thời khắc bạn bấm nút tạo commit.\n- **Ví dụ:** Sau khi hoàn thiện chức năng thanh toán, commit của bạn lưu giữ một Snapshot phản ánh chính xác trạng thái chạy mượt của toàn bộ mã nguồn.\n- **Đừng nhầm:** Git không hề nhân bản mù quáng cả thư mục ra một chỗ khác; tệp nào không đổi sẽ được Git trỏ link tới dữ liệu cũ để tối ưu bộ nhớ.\n\n### Diff (Delta) — Sai biệt giữa hai phiên bản\n- **Nói dễ hiểu:** Bản báo cáo so sánh chỉ ra chính xác từng dòng code nào được thêm mới, bị xóa bỏ hay chỉnh sửa giữa hai mốc Snapshot.\n- **Ví dụ:** Git chỉ ra bạn vừa thêm dòng mã giảm giá mới và xóa đi hàm tính thuế lỗi thời.\n- **Đừng nhầm:** Git không lưu trữ dự án dưới dạng cộng dồn các mẩu Diff rời rạc như các hệ thống cổ điển; Diff là phép tính so sánh động được tạo ra khi bạn yêu cầu.\n\n### Commit — Mốc lịch sử đóng băng\n- **Nói dễ hiểu:** Điểm nút lịch sử chứa con trỏ dẫn tới Snapshot của dự án cùng thông tin về tác giả, thời gian và lý do sửa đổi.\n- **Ví dụ:** Commit \"Fix lỗi tràn bộ nhớ khi tải ảnh\" đóng băng mã nguồn sau khi đã vá lỗi xong.\n- **Đừng nhầm:** Việc bạn tiếp tục gõ code trên máy sau khi commit hoàn toàn không làm suy suyển hay thay đổi Snapshot đã được đóng băng trước đó.\n\n---\n\n## 🤔 Tại sao cần?\nCác hệ thống VCS cổ xưa lưu trữ mã nguồn dưới dạng danh sách thay đổi (Delta). Muốn tái hiện phiên bản thứ năm mươi, hệ thống phải cộng dồn năm mươi mẩu thay đổi lại với nhau, cực kỳ chậm chạp và dễ lỗi. Linus Torvalds đã đảo ngược hoàn toàn tư duy này: Git coi dữ liệu như một chuỗi các Snapshot nhỏ gọn. Nhờ vậy, thao tác chuyển đổi qua lại giữa các phiên bản diễn ra tức thì trong chớp mắt. Hiểu được cơ chế Snapshot giúp bạn tự tin làm chủ các thao tác phân nhánh và gộp code phức tạp sau này.\n\n---\n\n## 📖 Định nghĩa\nSnapshot là bức ảnh chụp toàn vẹn trạng thái của toàn bộ hệ thống tệp tin trong dự án tại thời điểm tạo commit. Diff là phần chênh lệch (thêm, sửa, xóa) được tính toán khi đặt hai Snapshot cạnh nhau. Git lưu trữ theo mô hình Snapshot kèm con trỏ thông minh giúp tối ưu hóa dung lượng ổ đĩa.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn chụp hai bức ảnh kỷ yếu tập thể: một tấm chụp vào ngày khai giảng và một tấm chụp ngày bế giảng. Mỗi bức ảnh chính là một Snapshot toàn vẹn. Khi đặt hai bức ảnh cạnh nhau để tìm xem bạn nào đổi kiểu tóc hay bạn nào chuyển trường, cái nhìn so sánh đó chính là Diff!\n\n---\n\n## 🖼 Sơ đồ\n```text\nSnapshot A (Commit 1): File App.js có dòng \"Version 1.0\"\nSnapshot B (Commit 2): File App.js có dòng \"Version 2.0\"\n\nDiff tính toán động:  - Version 1.0\n                      + Version 2.0\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một dự án thực tế, bạn sửa một dòng code trong file cấu hình `config.json` giữa hàng ngàn file mã nguồn khác. Git ghi nhận một Snapshot mới cho toàn dự án: file cấu hình được lưu nội dung mới, còn hàng ngàn file không thay đổi sẽ được Git tạo liên kết trỏ thẳng về dữ liệu cũ. Kết quả là Snapshot được tạo trong một phần nghìn giây và chỉ tốn vài chục byte dung lượng.\n\n---\n\n## 💻 Command\nBài học nền tảng này giúp bạn thấu hiểu tư duy thiết kế hệ thống bên dưới của Git; các lệnh so sánh sai biệt trực quan sẽ được hướng dẫn ở bài kế tiếp.\n\n---\n\n## 🔍 Giải thích command\nTrong các bài học tới, bạn sẽ được học lệnh `git diff` để tận mắt soi từng dòng code sai biệt trên màn hình đen terminal. Trước tiên, hãy chắc chắn bạn đã thấm nhuần sự khác nhau giữa trạng thái được chụp và phép toán so sánh.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đánh đồng Diff với cách lưu trữ của Git:** Git không lưu dồn từng mẩu Diff như SVN mà quản lý các Snapshot toàn cảnh để đạt tốc độ tối đa.\n2. **Lo sợ Git sẽ làm đầy ổ cứng khi dự án có hàng nghìn commit:** Nhờ cơ chế trỏ liên kết các tệp tin không đổi, dung lượng một repo Git thường nhỏ hơn rất nhiều so với bạn tưởng tượng.\n3. **Tưởng rằng sửa file là commit tự cập nhật:** Snapshot của một commit là bất biến vĩnh viễn; mọi chỉnh sửa mới chỉ nằm trong không gian làm việc của bạn cho đến khi tạo commit tiếp theo.\n\n---\n\n## 🧪 Lab\nGiảng viên đưa cho bạn hai đoạn mã cấu hình máy chủ:\n\n**Mốc 1 (Snapshot 1):**\n```text\nPORT=3000\nDATABASE_URL=localhost:5432\nDEBUG=true\n```\n\n**Mốc 2 (Snapshot 2):**\n```text\nPORT=8080\nDATABASE_URL=localhost:5432\nDEBUG=false\n```\n\n1. Hãy chỉ ra những dòng cấu hình giữ nguyên vẹn giữa hai Snapshot.\n2. Trình bày phần Diff (sai biệt) cụ thể giữa Mốc 1 và Mốc 2.\n3. Giả sử bạn gõ thêm dòng `SECRET_KEY=123` nhưng chưa tạo commit, Snapshot 2 có bị ảnh hưởng gì không? Vì sao?\n\n---\n\n## 💡 Hint\nHãy nhớ nguyên tắc vàng: \"Snapshot là trạng thái tĩnh đã đóng băng, còn Diff là phép trừ giữa hai trạng thái.\"\n\n---\n\n## ✅ Validation\n- Trình bày được sự khác biệt mấu chốt giữa mô hình Delta-based truyền thống và Snapshot-based của Git.\n- Phân tích được cách Git tối ưu dung lượng thông qua việc chia sẻ con trỏ dữ liệu giữa các Snapshot.\n- Chỉ ra chính xác phần Diff từ hai phiên bản tệp tin mẫu trong bài thực hành.\n\n---\n\n## ❓ Quiz\nTham gia bài trắc nghiệm dưới đây để đánh giá độ thấu hiểu về kiến trúc Snapshot và Diff. Đọc kỹ phần giải thích sư phạm để nắm trọn vẹn bản chất.\n\n---\n\n## 🔥 Challenge\nHãy giải thích cho đồng đội trong nhóm vì sao Git có thể chuyển đổi giữa các nhánh mã nguồn cực nhanh chỉ trong vài phần nghìn giây dựa trên cơ chế con trỏ Snapshot.\n\n---\n\n## 📚 Tổng kết\n- Git quản lý mã nguồn theo mô hình chuỗi các Snapshot độc lập, mang lại tốc độ truy xuất và chuyển đổi phiên bản siêu phàm.\n- Diff là kết quả so sánh động giữa hai mốc Snapshot, giúp lập trình viên kiểm soát chính xác từng thay đổi nhỏ nhất.\n- Dữ liệu không đổi giữa các commit được tái sử dụng bằng cơ chế con trỏ liên kết, giúp kho Git luôn nhỏ gọn và tối ưu.\n\n",
  "quiz": {
    "id": "quiz-04-git-architecture",
    "title": "Trắc nghiệm: Snapshot và Diff",
    "questions": [
      {
        "id": "q1",
        "question": "Một commit giúp bạn hình dung điều gì trong lịch sử dự án?",
        "type": "single",
        "options": [
          {
            "text": "Trạng thái các tệp trong dự án tại lúc commit được lưu",
            "correct": true
          },
          {
            "text": "Chỉ những dòng khác nhau giữa hai phiên bản",
            "correct": false
          },
          {
            "text": "Danh sách lệnh đã chạy trong terminal",
            "correct": false
          },
          {
            "text": "Bản sao thư mục được Git tạo bên cạnh dự án",
            "correct": false
          }
        ],
        "explanation": "Commit đại diện cho trạng thái dự án tại một thời điểm. Phần khác nhau giữa các trạng thái gọi là Diff."
      },
      {
        "id": "q2",
        "question": "Diff giúp bạn trả lời câu hỏi nào?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung nào đã thay đổi giữa hai phiên bản",
            "correct": true
          },
          {
            "text": "Commit mới nhất được tự động tạo lúc nào",
            "correct": false
          },
          {
            "text": "Git đã được cài vào máy bằng cách nào",
            "correct": false
          },
          {
            "text": "Tên nào phải đặt cho nhánh ban đầu",
            "correct": false
          }
        ],
        "explanation": "Diff trình bày phần khác nhau giữa hai phiên bản để bạn xem. Bản thân Diff không tạo commit hoặc cài đặt Git."
      },
      {
        "id": "q3",
        "question": "Bạn đã lưu commit rồi sửa tiếp một dòng nhưng chưa tạo commit mới. Điều nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Commit cũ vẫn ghi trạng thái lúc nó được lưu",
            "correct": true
          },
          {
            "text": "Git tự viết lại commit cũ khi tệp thay đổi",
            "correct": false
          },
          {
            "text": "Phần sửa mới tự biến thành Diff trong lịch sử",
            "correct": false
          },
          {
            "text": "Git xóa commit cũ để tránh hai phiên bản trùng nhau",
            "correct": false
          }
        ],
        "explanation": "Commit cũ tiếp tục đại diện cho trạng thái đã lưu lúc trước. Thay đổi mới cần một commit riêng để trở thành mốc lịch sử."
      },
      {
        "id": "q4",
        "question": "README đổi từ `Lịch sinh hoạt: Thứ Sáu` thành `Lịch sinh hoạt: Thứ Bảy`. Diff là gì?",
        "type": "single",
        "options": [
          {
            "text": "Phần cho thấy `Thứ Sáu` được thay bằng `Thứ Bảy`",
            "correct": true
          },
          {
            "text": "Toàn bộ nội dung README ở cả hai phiên bản",
            "correct": false
          },
          {
            "text": "Một commit mới tự lưu thay đổi đó",
            "correct": false
          },
          {
            "text": "Tên thư mục đang chứa README",
            "correct": false
          }
        ],
        "explanation": "Diff chỉ ra dòng hoặc nội dung khác nhau giữa hai phiên bản. Nó mô tả thay đổi, không phải toàn bộ Snapshot."
      },
      {
        "id": "q5",
        "question": "Câu nào mô tả đúng mối quan hệ giữa Snapshot và Diff?",
        "type": "single",
        "options": [
          {
            "text": "Snapshot là trạng thái đã lưu; Diff là phần khác nhau khi so sánh",
            "correct": true
          },
          {
            "text": "Snapshot chỉ chứa dòng mới; Diff chứa toàn bộ dự án",
            "correct": false
          },
          {
            "text": "Snapshot và Diff đều là lệnh để lưu commit",
            "correct": false
          },
          {
            "text": "Diff thay thế Snapshot sau mỗi lần sửa tệp",
            "correct": false
          }
        ],
        "explanation": "Snapshot mô tả trạng thái dự án tại mốc đã lưu. Diff chỉ ra phần khác nhau giữa hai trạng thái mà bạn đang so sánh."
      }
    ]
  }
};
export default lesson;
