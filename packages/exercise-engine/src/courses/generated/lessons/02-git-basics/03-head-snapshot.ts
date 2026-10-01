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
  "content": "# Repository, commit và vị trí HEAD\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Nhận biết `HEAD` là vị trí hiện tại trong lịch sử Git.\r\n- Phân biệt tệp đang sửa với trạng thái đã lưu trong commit.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### HEAD — vị trí Git đang đứng\r\n- **Nói dễ hiểu:** Tên giúp Git biết commit hoặc nhánh hiện đang được chọn.\r\n- **Ví dụ:** Khi đang làm trên `main`, HEAD thường theo nhánh `main`.\r\n- **Đừng nhầm:** HEAD không phải tên của tệp hoặc commit message.\r\n\r\n### Commit snapshot — trạng thái đã lưu\r\n- **Nói dễ hiểu:** Một commit ghi nhận trạng thái dự án tại một mốc.\r\n- **Ví dụ:** Commit “Tạo trang chủ” là một mốc có thể xem lại.\r\n- **Đừng nhầm:** Snapshot không tự đổi khi bạn sửa tệp về sau.\r\n\r\n### Branch — nhánh lịch sử\r\n- **Nói dễ hiểu:** Tên dễ nhớ cho commit hiện tại của một dòng phát triển.\r\n- **Ví dụ:** `main` thường là tên nhánh ban đầu của dự án.\r\n- **Đừng nhầm:** Nhánh không phải bản sao đầy đủ riêng của mọi tệp.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nRepository là nơi Git giữ các commit đã tạo. `HEAD` cho Git biết bạn đang ở nhánh hoặc commit nào. Khi tạo commit mới trên một nhánh, nhánh đó sẽ trỏ tới commit mới.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nBiết `HEAD` giúp bạn hiểu Git đang làm việc trên nhánh nào và commit mới sẽ nối vào đâu. Nếu repository chưa có commit đầu tiên, lịch sử vẫn rỗng và chưa có commit để HEAD trỏ tới; bạn sẽ tạo mốc đầu tiên ở bài 6.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy xem HEAD như nhãn “đang ở đây”: nó chỉ nhánh hoặc commit đang được chọn.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nMô hình con trỏ HEAD trong Repository:\r\n[Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [main]\r\n                                                ▲\r\n                                                │\r\n                                              [HEAD] (Đang trỏ vào nhánh main tại Commit C)\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nGiả sử dự án đã có ba commit. Nhánh `main` trỏ tới commit mới nhất; khi bạn đang làm trên nhánh này, HEAD theo `main`. Nếu đây là dự án mới chưa có commit, chưa có snapshot nào để xem — đó là trạng thái bình thường.\r\n\r\n---\r\n\r\n## 💻 Command\r\nBài này chỉ xây mô hình bằng sơ đồ, chưa cần chạy lệnh. Sau khi tạo commit đầu tiên ở bài 6, bạn sẽ dùng `git log` và `git show` để quan sát lịch sử thật.\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\nChưa có lệnh thực hành ở bài này. Không chạy `git log` hoặc `git show HEAD` trong repository chưa có commit: Git chưa có lịch sử để hiển thị.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Nhầm HEAD với tên nhánh**:  `main` là tên nhánh; HEAD chỉ vị trí đang được chọn.\r\n2. **Tưởng repository mới đã có commit để xem**:  Lịch sử chỉ bắt đầu sau khi tạo commit đầu tiên.\r\n3. **Tự chuyển HEAD về commit cũ khi chưa học cách quay lại**:  Hãy chỉ xem commit cũ trong bài này.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\nĐọc sơ đồ ở trên và trả lời:\r\n1. Commit nào là mốc mới nhất trong ví dụ?\r\n2. Nhánh `main` đang trỏ tới commit nào?\r\n3. HEAD đang theo nhánh hay trỏ thẳng vào commit?\r\n4. Nếu repository chưa có commit nào, bạn có thể xem `git show HEAD` chưa? Vì sao?\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> HEAD là con trỏ chỉ vị trí làm việc hiện tại của bạn trong đồ thị commit.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Bạn xác định được HEAD theo `main` và nhánh `main` trỏ tới Commit C trong ví dụ.\r\n- Bạn giải thích được repository mới chưa có commit để hiển thị bằng `git show HEAD`.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nLàm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nNêu sự khác nhau giữa con trỏ nhánh bình thường và con trỏ HEAD trong Git.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- HEAD cho biết nhánh hoặc commit đang được chọn.\r\n- Repository chưa có commit thì chưa có snapshot nào để xem.\r\n- Commit mới trên nhánh làm nhánh đó chuyển sang commit mới.\r\n",
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
