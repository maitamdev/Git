import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-head-snapshot",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "03-head-snapshot",
    "title": "Repository & HEAD Snapshot",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "02-staging-area"
    ],
    "objectives": [
      "Hiểu rõ khu vực thứ ba trong kiến trúc Git: Repository và cơ sở dữ liệu đối tượng.",
      "Nắm bắt khái niệm con trỏ HEAD và cách nó trỏ tới commit hiện tại của nhánh làm việc.",
      "Phân biệt snapshot bất biến trong Repository với các tệp tin khả biến trong Working Tree."
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
    "commands": [
      "git log --oneline",
      "git show HEAD",
      "cat .git/HEAD"
    ]
  },
  "content": "# Repository & HEAD Snapshot\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khu vực thứ ba trong kiến trúc Git: Repository và cơ sở dữ liệu đối tượng.\n- Nắm bắt khái niệm con trỏ HEAD và cách nó trỏ tới commit hiện tại của nhánh làm việc.\n- Phân biệt snapshot bất biến trong Repository với các tệp tin khả biến trong Working Tree.\n\n---\n\n## 📖 Định nghĩa\n> Repository (Kho lưu trữ cục bộ) là khu vực lưu trữ vĩnh viễn và bất biến của Git, nơi chứa toàn bộ cơ sở dữ liệu đối tượng commit, cây thư mục và nội dung tệp tin lịch sử dưới mã băm mật mã học. Trong Repository, con trỏ đặc biệt mang tên `HEAD` đóng vai trò là một chiếc kim đọc đĩa hát chỉ định vị trí commit hiện tại mà thư mục làm việc của bạn đang dựa vào. Khi bạn thực hiện một commit mới, Git ghi nhận một snapshot vĩnh cửu và tự động di chuyển con trỏ `HEAD` tiến lên nút mới đó.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu sâu về HEAD và cơ chế lưu trữ snapshot trong Repository là chìa khóa then chốt để bạn làm chủ toàn bộ các thao tác nâng cao như di chuyển lịch sử, checkout, reset và hoàn tác. Rất nhiều người dùng Git thường xuyên sợ hãi việc mất code khi gặp lỗi, nhưng khi đã hiểu rằng dữ liệu một khi đã đi vào Repository sẽ trở thành bất biến và được bảo vệ nghiêm ngặt bằng mã băm SHA, bạn sẽ hoàn toàn yên tâm thực nghiệm và tự tin kiểm soát dự án.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng Repository giống như kho lưu trữ bảo tàng lịch sử quốc gia với các phòng triển lãm tranh được khóa kính chống đạn. Mỗi bức tranh sơn dầu trong phòng triển lãm chính là một commit snapshot đại diện trọn vẹn cho một thời kỳ đã qua. Con trỏ `HEAD` giống như một ngọn đèn rọi di động từ trên trần nhà. Bạn di chuyển ngọn đèn rọi chiếu vào bức tranh nào thì mắt bạn (Working Tree) sẽ nhìn thấy rõ toàn cảnh thời kỳ đó.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMô hình con trỏ HEAD trong Repository:\n[Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [main]\n                                                ▲\n                                                │\n                                              [HEAD] (Đang trỏ vào nhánh main tại Commit C)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một dự án xây dựng ứng dụng di động, nhóm phát triển đã tạo được 20 commit mốc tính năng. Khi một lập trình viên muốn xem lại ứng dụng hoạt động ra sao tại mốc phát hành phiên bản 1.0 (ở commit số 10), lập trình viên có thể chuyển con trỏ HEAD về vị trí commit đó. Ngay lập tức, toàn bộ các tệp tin trong Working Directory trên máy tính sẽ được hoán đổi trở về đúng trạng thái lịch sử của commit số 10 mà không hề làm mất đi các commit mới hơn ở phía trước.\n\n---\n\n## 💻 Command\n```bash\ngit log --oneline\ngit show HEAD\ncat .git/HEAD\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log --oneline`: Hiển thị danh sách các commit trong Repository kèm vị trí hiện tại của con trỏ HEAD.\n- `git show HEAD`: Xem chi tiết thông tin tác giả, ngày giờ và nội dung thay đổi của commit mà HEAD đang trỏ vào.\n- `cat .git/HEAD`: In ra nội dung tham chiếu thực tế của tệp HEAD trong thư mục ẩn .git.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ HEAD là một nhánh độc lập**:  HEAD chỉ là một con trỏ tham chiếu, thông thường nó trỏ vào tên một nhánh như `refs/heads/main`.\n2. **Lo lắng commit cũ sẽ bị sửa đè khi tạo commit mới**:  Mỗi commit mới chỉ trỏ ngược về commit cha, commit cũ hoàn toàn bất biến trong lịch sử.\n3. **Sợ rằng việc di chuyển HEAD sẽ làm mất dữ liệu**:  Dữ liệu đã commit luôn nằm an toàn trong cơ sở dữ liệu đối tượng của kho lưu trữ.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git log --oneline` để quan sát vị trí xuất hiện của nhãn `HEAD -> main`.\n2. Chạy lệnh `git show HEAD` để xem chi tiết snapshot commit mới nhất.\n3. Nhận biết rằng HEAD luôn chỉ định trạng thái phiên bản mà bạn đang nhìn thấy.\n\n---\n\n## 💡 Hint\n> HEAD là con trỏ chỉ vị trí làm việc hiện tại của bạn trong đồ thị commit.\n\n---\n\n## ✅ Validation\n- Xác định được commit mà HEAD đang trỏ tới thông qua git log.\n\n---\n\n## ❓ Quiz\nLàm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD.\n\n---\n\n## 🔥 Challenge\nNêu sự khác nhau giữa con trỏ nhánh bình thường và con trỏ HEAD trong Git.\n\n---\n\n## 📚 Tổng kết\n- Repository là khu vực lưu trữ bất biến chứa toàn bộ snapshot lịch sử của dự án.\n- HEAD là con trỏ đặc biệt chỉ định commit hoặc nhánh bạn đang đứng tại thời điểm hiện tại.\n- Mỗi commit mới sẽ bổ sung một nút vào đồ thị DAG và kéo con trỏ HEAD tiến về phía trước.\n",
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
        "explanation": "HEAD luôn là con trỏ trỏ tới vị trí làm việc hiện tại của Working Tree trong đồ thị lịch sử commit."
      },
      {
        "id": "q2",
        "question": "Khi bạn tạo một commit mới trong trạng thái bình thường, điều gì sẽ xảy ra với HEAD?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh hiện tại và HEAD sẽ tự động di chuyển tiến lên chỉ vào commit mới vừa tạo",
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
        "explanation": "Khi commit mới sinh ra, nhánh hiện tại nhận commit đó làm đỉnh mới và HEAD tự động di chuyển theo."
      },
      {
        "id": "q3",
        "question": "Snapshot trong Repository của Git có đặc tính cốt lõi nào dưới đây?",
        "type": "single",
        "options": [
          {
            "text": "Tính bất biến (Immutable), không thể bị thay đổi âm thầm nhờ mã băm bảo mật SHA",
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
        "explanation": "Cơ sở dữ liệu commit của Git là bất biến; bất kỳ thay đổi nào cũng sẽ sinh ra một mã hash hoàn toàn mới."
      },
      {
        "id": "q4",
        "question": "Lệnh nào cho phép bạn xem nội dung chi tiết của commit mà HEAD đang trỏ vào?",
        "type": "single",
        "options": [
          {
            "text": "git show HEAD",
            "correct": true
          },
          {
            "text": "git delete HEAD",
            "correct": false
          },
          {
            "text": "git clear HEAD",
            "correct": false
          },
          {
            "text": "git push HEAD --now",
            "correct": false
          }
        ],
        "explanation": "`git show HEAD` in ra toàn bộ siêu dữ liệu và diff chi tiết của commit hiện tại."
      }
    ]
  }
};
export default lesson;
