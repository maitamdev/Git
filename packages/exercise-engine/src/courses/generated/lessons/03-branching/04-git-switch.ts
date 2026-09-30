import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-switch",
  "moduleId": "03-branching",
  "metadata": {
    "id": "04-git-switch",
    "title": "Chuyển nhánh với git switch",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-git-branch"
    ],
    "objectives": [
      "Nắm vững câu lệnh chuyên trách hiện đại `git switch` được giới thiệu từ Git 2.23.",
      "Sử dụng thành thạo phím tắt vừa tạo vừa chuyển nhánh: `git switch -c <tên-nhánh>`.",
      "Hiểu cách Git cập nhật Working Directory khi bạn chuyển dịch qua lại giữa các nhánh.",
      "Xử lý tình huống không chuyển được nhánh do có thay đổi cục bộ chưa commit."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "switch-branch"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git switch",
      "chuyen nhanh",
      "switch branch",
      "tao nhanh moi",
      "working tree update"
    ],
    "commands": [
      "git switch <tên-nhánh>",
      "git switch -c <tên-nhánh-mới>",
      "git switch -",
      "git switch -d <commit-hash>"
    ]
  },
  "content": "# Chuyển nhánh với git switch\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững câu lệnh chuyên trách hiện đại `git switch` được giới thiệu từ Git 2.23.\n- Sử dụng thành thạo phím tắt vừa tạo vừa chuyển nhánh: `git switch -c <tên-nhánh>`.\n- Hiểu cách Git cập nhật Working Directory khi bạn chuyển dịch qua lại giữa các nhánh.\n- Xử lý tình huống không chuyển được nhánh do có thay đổi cục bộ chưa commit.\n\n---\n\n## 📖 Định nghĩa\n> `git switch` là câu lệnh chuyên trách hiện đại được bổ sung vào bộ công cụ Git từ phiên bản 2.23, với mục tiêu duy nhất và rõ ràng là chuyển đổi không gian làm việc giữa các nhánh khác nhau trong kho lưu trữ. Khi bạn thực hiện lệnh switch, Git sẽ dịch chuyển con trỏ HEAD gắn vào nhánh đích và đồng thời cập nhật toàn bộ các tệp tin trong Working Directory sao cho khớp 100% với snapshot commit đỉnh của nhánh mới đó.\n\n---\n\n## 🤔 Tại sao cần?\nTrước khi `git switch` ra đời, cộng đồng lập trình viên phải sử dụng câu lệnh `git checkout` cho quá nhiều mục đích khác nhau: vừa chuyển nhánh, vừa phục hồi tệp tin, vừa tạo nhánh mới, dẫn đến rất nhiều tai nạn mất code đáng tiếc do gõ nhầm cú pháp. Sử dụng `git switch` mang lại sự an toàn và tường minh tuyệt đối: bạn hoàn toàn yên tâm rằng lệnh này chỉ tác động đến con trỏ nhánh mà không bao giờ vô tình ghi đè làm mất các tệp tin bạn đang gõ dở.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc chuyển nhánh giống như thao tác chuyển đổi tài khoản người dùng trên màn hình khóa máy tính, hoặc đổi kênh truyền hình trên chiếc TV thông minh. Khi bạn bấm chuyển từ kênh phim hoạt hình sang kênh thời sự thể thao (git switch), toàn bộ màn hình trước mắt bạn (Working Directory) lập tức biến đổi nội dung tương ứng với kênh mới, trong khi kênh cũ vẫn tiếp tục phát sóng ngầm độc lập ở hậu trường mà không hề bị xáo trộn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế chuyển nhánh của git switch:\nTrước khi switch:\nHEAD ──► main (Working Tree đang hiển thị code của main)\n         feature-cart\n\nSau lệnh: git switch feature-cart\n         main\nHEAD ──► feature-cart (Working Tree tự động cập nhật khớp với feature-cart)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Trang đang làm việc trên nhánh main thì nhận được yêu cầu khẩn cấp từ ban giám đốc phải nhanh chóng xây dựng giao diện giỏ hàng mới cho khách hàng. Trang mở cửa sổ terminal và gõ ngay câu lệnh: `git switch -c feature-cart`. Lệnh này lập tức tạo ra nhánh feature-cart tách từ commit hiện tại của main và chuyển con trỏ HEAD sang nhánh mới này trong chớp mắt. Trang mở trình soạn thảo VS Code và thấy toàn bộ tệp tin đã sẵn sàng để viết code cho tính năng giỏ hàng mà không làm ảnh hưởng tới nhánh main ban đầu. Sau khi hoàn thành xong một số chỉnh sửa, Trang dùng lệnh `git switch -` để quay ngược trở lại nhánh main kiểm tra tiến độ dự án chung.\n\n---\n\n## 💻 Command\n```bash\ngit switch <tên-nhánh>\ngit switch -c <tên-nhánh-mới>\ngit switch -\ngit switch -d <commit-hash>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch <tên-nhánh>`: Chuyển sang một nhánh cục bộ đã tồn tại từ trước.\n- `git switch -c <tên-nhánh-mới>`: Tạo mới một nhánh và chuyển sang nhánh đó ngay lập tức (thay thế cho `git checkout -b`).\n- `git switch -`: Phím tắt cực kỳ tiện lợi để quay trở lại nhánh bạn vừa đứng trước đó.\n- `git switch -d <commit-hash>`: Chuyển tới một commit cụ thể ở chế độ Detached HEAD có chủ đích rõ ràng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chuyển nhánh khi có thay đổi chưa commit xung đột với nhánh đích**:  Git sẽ ngăn chặn thao tác để bảo vệ code của bạn; bạn cần commit hoặc stash thay đổi trước.\n2. **Vẫn giữ thói quen dùng lệnh cũ dễ gây nhầm lẫn**:  Tiếp tục dùng `git checkout` thay vì cú pháp hiện đại an toàn `git switch`.\n3. **Quên dấu -c khi muốn tạo nhánh mới**:  Gõ `git switch new-feature` khi nhánh chưa tồn tại sẽ bị Git báo lỗi không tìm thấy nhánh.\n\n---\n\n## 🧪 Lab\n1. Tạo và chuyển sang nhánh mới bằng lệnh `git switch -c feature-user`.\n2. Chạy `git status` để xác nhận thông báo `On branch feature-user`.\n3. Chuyển quay lại nhánh chính bằng câu lệnh `git switch main`.\n4. Sử dụng phím tắt `git switch -` để quay ngược lại nhánh `feature-user`.\n\n---\n\n## 💡 Hint\n> Sử dụng `git switch -` để nhảy qua lại giữa hai nhánh gần nhất cực kỳ tiện lợi.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git branch` thấy dấu sao định vị đúng nhánh mong muốn.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về câu lệnh chuyển nhánh git switch.\n\n---\n\n## 🔥 Challenge\nMô tả cơ chế bảo vệ của Git khi bạn cố gắng chuyển nhánh trong lúc Working Tree đang có tệp Modified.\n\n---\n\n## 📚 Tổng kết\n- `git switch` là lệnh hiện đại chuyên trách chuyển nhánh an toàn từ Git 2.23.\n- Cờ `-c` cho phép vừa tạo vừa chuyển sang nhánh mới một cách nhanh chóng.\n- Cú pháp `git switch -` giúp nhảy nhanh về nhánh làm việc trước đó.\n",
  "quiz": {
    "id": "quiz-03-04-git-switch",
    "title": "Trắc nghiệm: Chuyển nhánh với git switch",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào dưới đây vừa tạo một nhánh mới có tên `feature-login` vừa chuyển sang nhánh đó ngay lập tức?",
        "type": "single",
        "options": [
          {
            "text": "git switch -c feature-login",
            "correct": true
          },
          {
            "text": "git switch --make feature-login",
            "correct": false
          },
          {
            "text": "git switch feature-login --new",
            "correct": false
          },
          {
            "text": "git switch -a feature-login",
            "correct": false
          }
        ],
        "explanation": "Cờ `-c` (viết tắt của create) vừa tạo nhánh mới vừa chuyển HEAD sang nhánh đó ngay."
      },
      {
        "id": "q2",
        "question": "Cú pháp phím tắt tiện lợi `git switch -` (dấu gạch nối ở cuối) thực hiện hành động gì?",
        "type": "single",
        "options": [
          {
            "text": "Chuyển quay trở lại nhánh mà bạn vừa đứng ngay trước đó",
            "correct": true
          },
          {
            "text": "Xóa nhánh hiện tại ngay lập tức",
            "correct": false
          },
          {
            "text": "Tắt kết nối mạng của Git",
            "correct": false
          },
          {
            "text": "Đảo ngược thứ tự các commit trong lịch sử",
            "correct": false
          }
        ],
        "explanation": "Dấu gạch nối `-` đại diện cho nhánh trước đó (tương tự `cd -` trong terminal shell Unix)."
      },
      {
        "id": "q3",
        "question": "Tại sao tổ chức phát triển Git lại giới thiệu lệnh `git switch` tách riêng khỏi lệnh cũ `git checkout`?",
        "type": "single",
        "options": [
          {
            "text": "Để phân tách rõ ràng trách nhiệm chuyển nhánh ra khỏi phục hồi tệp tin, tránh tai nạn mất code do gõ nhầm",
            "correct": true
          },
          {
            "text": "Vì lệnh git checkout bị công ty đối thủ mua lại bản quyền thương hiệu",
            "correct": false
          },
          {
            "text": "Vì lệnh git switch giúp tăng tốc độ mạng Internet lên gấp mười lần",
            "correct": false
          },
          {
            "text": "Vì lệnh git checkout không chạy được trên hệ điều hành Linux",
            "correct": false
          }
        ],
        "explanation": "Git 2.23 chia checkout thành `git switch` (cho branch) và `git restore` (cho file) để tránh nhầm lẫn."
      },
      {
        "id": "q4",
        "question": "Khi bạn chuyển từ nhánh A sang nhánh B, các tệp tin trong Working Directory trên ổ đĩa sẽ như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Git tự động cập nhật nội dung các tệp trên đĩa khớp hoàn toàn với commit đỉnh của nhánh B",
            "correct": true
          },
          {
            "text": "Các tệp tin bị xóa sạch hoàn toàn và bạn phải gõ lại code từ đầu",
            "correct": false
          },
          {
            "text": "Nội dung các tệp vẫn giữ nguyên 100% của nhánh A mà không có thay đổi nào",
            "correct": false
          },
          {
            "text": "Git tự động sao lưu tất cả tệp ra ngoài màn hình Desktop",
            "correct": false
          }
        ],
        "explanation": "Git thay đổi trạng thái Working Directory để phản ánh chính xác snapshot của nhánh bạn vừa chuyển tới."
      }
    ]
  }
};
export default lesson;
