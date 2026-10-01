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
      "Nhận biết `HEAD` là vị trí hiện tại trong lịch sử Git.",
      "Phân biệt tệp đang sửa với trạng thái đã lưu trong commit.",
      "Dùng `git show HEAD` để xem commit hiện tại."
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
      "git show HEAD"
    ]
  },
  "content": "# Repository & HEAD Snapshot\n\n---\n\n## 🎯 Mục tiêu\n- Nhận biết `HEAD` là vị trí hiện tại trong lịch sử Git.\n- Phân biệt tệp đang sửa với trạng thái đã lưu trong commit.\n- Dùng `git show HEAD` để xem commit hiện tại.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### HEAD — vị trí Git đang đứng\n- **Nói dễ hiểu:** Tên giúp Git biết commit hoặc nhánh hiện đang được chọn.\n- **Ví dụ:** Khi đang làm trên `main`, HEAD thường theo nhánh `main`.\n- **Đừng nhầm:** HEAD không phải tên của tệp hoặc commit message.\n\n### Commit snapshot — trạng thái đã lưu\n- **Nói dễ hiểu:** Một commit ghi nhận trạng thái dự án tại một mốc.\n- **Ví dụ:** Commit “Tạo trang chủ” là một mốc có thể xem lại.\n- **Đừng nhầm:** Snapshot không tự đổi khi bạn sửa tệp về sau.\n\n### Branch — nhánh lịch sử\n- **Nói dễ hiểu:** Tên dễ nhớ cho commit hiện tại của một dòng phát triển.\n- **Ví dụ:** `main` thường là tên nhánh ban đầu của dự án.\n- **Đừng nhầm:** Nhánh không phải bản sao đầy đủ riêng của mọi tệp.\n\n---\n\n## 📖 Định nghĩa\nRepository là nơi Git giữ các commit đã tạo. `HEAD` cho Git biết bạn đang ở nhánh hoặc commit nào. Khi tạo commit mới trên một nhánh, nhánh đó sẽ trỏ tới commit mới.\n\n---\n\n## 🤔 Tại sao cần?\nBiết `HEAD` đang chỉ vào đâu giúp bạn đọc `git status`, `git log` và hiểu commit mới được tạo ở vị trí nào. Hôm nay chỉ cần nhận diện vị trí hiện tại; các cách di chuyển lịch sử sẽ học sau.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem HEAD như nhãn “đang ở đây”: nó chỉ nhánh hoặc commit đang được chọn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMô hình con trỏ HEAD trong Repository:\n[Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [main]\n                                                ▲\n                                                │\n                                              [HEAD] (Đang trỏ vào nhánh main tại Commit C)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau khi tạo commit, chạy `git show HEAD` để xem mốc mới nhất mà nhánh hiện tại đang trỏ tới.\n\n---\n\n## 💻 Command\n```bash\ngit log --oneline\ngit show HEAD\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log --oneline`: Hiển thị lịch sử commit; `HEAD` đánh dấu vị trí hiện tại.\n- `git show HEAD`: Hiển thị thông tin và thay đổi của commit hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nhầm HEAD với tên nhánh**:  `main` là tên nhánh; HEAD chỉ vị trí đang được chọn.\n2. **Nghĩ `git show HEAD` sẽ sửa dự án**:  Lệnh này chỉ hiển thị thông tin.\n3. **Tự chuyển HEAD về commit cũ khi chưa học cách quay lại**:  Hãy chỉ xem commit cũ trong bài này.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git log --oneline` để quan sát vị trí xuất hiện của nhãn `HEAD -> main`.\n2. Chạy lệnh `git show HEAD` để xem chi tiết snapshot commit mới nhất.\n3. Xác định HEAD đang theo nhánh hiện tại trong kết quả.\n\n---\n\n## 💡 Hint\n> HEAD là con trỏ chỉ vị trí làm việc hiện tại của bạn trong đồ thị commit.\n\n---\n\n## ✅ Validation\n- Xác định được commit mà HEAD đang trỏ tới thông qua git log.\n\n---\n\n## ❓ Quiz\nLàm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD.\n\n---\n\n## 🔥 Challenge\nNêu sự khác nhau giữa con trỏ nhánh bình thường và con trỏ HEAD trong Git.\n\n---\n\n## 📚 Tổng kết\n- HEAD cho biết nhánh hoặc commit đang được chọn.\n- `git show HEAD` xem commit hiện tại mà không sửa tệp.\n- Commit mới trên nhánh làm nhánh đó chuyển sang commit mới.\n",
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
