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
  "content": "# Git hoạt động như thế nào? Snapshot và Diff\n\n---\n\n## 🎯 Mục tiêu\n- Giải thích commit ghi nhận trạng thái dự án tại một thời điểm.\n- Phân biệt Snapshot (trạng thái đã lưu) với Diff (phần khác nhau).\n- So sánh hai phiên bản mẫu để chỉ ra thay đổi cụ thể.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Snapshot — ảnh chụp trạng thái\n- **Nói dễ hiểu:** Cách hình dung trạng thái các tệp trong dự án tại lúc bạn lưu một commit.\n- **Ví dụ:** Sau khi trang giới thiệu chạy đúng, commit ghi nhận dự án ở trạng thái đó.\n- **Đừng nhầm:** Đây là mô hình để hiểu kết quả; Git không tạo một thư mục sao chép riêng cho mỗi commit.\n\n### Diff — phần khác nhau\n- **Nói dễ hiểu:** Bản so sánh chỉ ra nội dung thay đổi giữa hai phiên bản.\n- **Ví dụ:** Nếu dòng cũ là “Xin chào” và dòng mới là “Xin chào Git”, phần thêm là từ “Git”.\n- **Đừng nhầm:** Diff giúp nhìn thấy thay đổi; nó không tự lưu một commit mới.\n\n### Commit — mốc đã lưu\n- **Nói dễ hiểu:** Bản ghi trong lịch sử Git đại diện cho trạng thái dự án bạn chọn lưu.\n- **Ví dụ:** Commit “Thêm lời chào” ghi nhận phiên bản có dòng “Xin chào Git”.\n- **Đừng nhầm:** Sửa tệp sau khi commit không tự cập nhật mốc đã lưu.\n\n---\n\n## 🤔 Tại sao cần?\nChỉ biết dự án hiện tại có những tệp nào chưa đủ để hiểu điều gì vừa đổi. Snapshot giúp bạn gọi tên trạng thái đã lưu ở mỗi commit. Diff giúp bạn so sánh hai trạng thái để tìm phần được thêm, xóa hoặc sửa.\n\n---\n\n## 📖 Định nghĩa\nỞ mức khái niệm, một commit cho biết trạng thái các tệp trong dự án tại thời điểm bạn lưu nó; đó là Snapshot. Diff là phần khác nhau khi so sánh hai phiên bản. Git có thể dùng lại dữ liệu không đổi để tiết kiệm chỗ, nên Snapshot không có nghĩa là tạo một bản sao thư mục mới cho mỗi commit.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn chụp hai bức ảnh bàn học: một ảnh trước khi sắp xếp và một ảnh sau đó. Mỗi ảnh là một Snapshot. Đặt hai ảnh cạnh nhau để chỉ ra đồ vật được chuyển đi chính là Diff.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSnapshot A: README có dòng “Xin chào”\nSnapshot B: README có dòng “Xin chào Git”\n\nDiff: thêm từ “Git” vào cuối dòng\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrước khi sửa README, bạn đã lưu commit có dòng “Xin chào”. Sau đó bạn sửa thành “Xin chào Git”. Nếu lưu commit mới, lịch sử sẽ có hai trạng thái. So sánh hai trạng thái cho thấy chính xác từ nào được thêm. Cách xem khác biệt bằng lệnh sẽ được học sau khi các bước lưu tệp đã được giới thiệu.\n\n---\n\n## 💻 Command\nBài này dùng hai phiên bản văn bản mẫu để luyện phân biệt Snapshot và Diff; chưa cần chạy lệnh.\n\n---\n\n## 🔍 Giải thích command\nGit có lệnh để so sánh phiên bản, nhưng bài này chưa yêu cầu dùng lệnh đó. Trước tiên hãy chắc rằng bạn phân biệt được trạng thái đã lưu với phần nội dung thay đổi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gọi phần khác nhau là Snapshot:** Snapshot mô tả trạng thái; Diff mô tả phần thay đổi giữa hai trạng thái.\n2. **Nghĩ lưu tệp đồng nghĩa với tạo commit:** Commit là mốc lịch sử riêng; sửa hoặc lưu tệp không tự tạo mốc.\n3. **Nghĩ Git chép cả thư mục thành nhiều bản:** Snapshot mô tả trạng thái dự án; Git có thể dùng lại dữ liệu không đổi.\n\n---\n\n## 🧪 Lab\nSo sánh hai phiên bản README sau:\n\n**Phiên bản A**\n```text\nTên câu lạc bộ: Sao Mai\nLịch sinh hoạt: Thứ Sáu\n```\n\n**Phiên bản B**\n```text\nTên câu lạc bộ: Sao Mai\nLịch sinh hoạt: Thứ Bảy\n```\n\n1. Nêu dòng không thay đổi.\n2. Viết phần Diff bằng lời: điều gì đã được sửa?\n3. Nếu bạn sửa tiếp nhưng chưa tạo commit, phiên bản B đã lưu có tự đổi không?\n\n---\n\n## 💡 Hint\nĐọc từng dòng: dòng nào giống nhau, dòng nào đổi? Diff chỉ mô tả phần khác; Snapshot là toàn bộ trạng thái tại một mốc.\n\n---\n\n## ✅ Validation\n- Chỉ ra được dòng không đổi và dòng thay đổi giữa hai phiên bản.\n- Giải thích được Snapshot là trạng thái đã lưu, còn Diff là phần khác nhau.\n- Nói đúng rằng sửa tệp chưa tự cập nhật commit cũ.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau. Khi sai, dùng ví dụ trong Lab để tự kiểm tra lại.\n\n---\n\n## 🔥 Challenge\nTự viết hai phiên bản ngắn của một thông báo. Gạch chân phần Diff và mô tả mỗi phiên bản là một Snapshot riêng.\n\n---\n\n## 📚 Tổng kết\n- Snapshot mô tả trạng thái dự án tại một mốc đã lưu.\n- Diff chỉ ra phần khác nhau giữa hai phiên bản.\n- Sửa tệp sau khi tạo commit không tự thay đổi Snapshot đã lưu.\n",
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
