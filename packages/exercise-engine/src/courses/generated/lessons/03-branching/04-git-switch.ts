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
  "content": "# Chuyển nhánh với git switch\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững câu lệnh chuyên trách `git switch` để di chuyển giữa các nhánh an toàn.\n- Sử dụng thành thạo phím tắt vừa tạo vừa chuyển nhánh: `git switch -c <tên-nhánh>`.\n- Hiểu cách Git tự động cập nhật thư mục làm việc khi bạn chuyển đổi giữa các nhánh.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git switch — chuyển nhánh hiện đại\n- **Nói dễ hiểu:** Câu lệnh chuyên trách để chuyển đổi không gian làm việc sang một nhánh khác.\n- **Ví dụ:** Chạy `git switch main` để đưa toàn bộ dự án quay trở lại nhánh chính.\n- **Đừng nhầm:** `git switch` chỉ đổi nhánh; việc khôi phục nội dung tệp đã được tách sang lệnh `git restore`.\n\n### git switch -c — vừa tạo vừa chuyển nhánh\n- **Nói dễ hiểu:** Phím tắt tạo một nhánh mới và lập tức chuyển bạn sang nhánh đó trong một bước.\n- **Ví dụ:** Chạy `git switch -c feature-search` để bắt đầu làm tính năng tìm kiếm mới.\n- **Đừng nhầm:** Bạn không cần gõ `git branch` rồi mới `git switch`; cờ `-c` kết hợp cả hai thao tác.\n\n### git switch - — quay lại nhánh trước\n- **Nói dễ hiểu:** Lệnh đưa bạn quay trở về nhánh mà bạn vừa đứng ngay trước đó.\n- **Ví dụ:** Đang ở `feature-login`, bạn chuyển sang `main` xem code, rồi gõ `git switch -` để quay lại `feature-login`.\n- **Đừng nhầm:** Dấu gạch ngang `-` chỉ nhớ một nhánh gần nhất bạn vừa rời đi.\n\n---\n\n## 📖 Định nghĩa\n`git switch` là lệnh chuyên trách từ phiên bản Git 2.23 dùng để chuyển đổi giữa các nhánh. Khi bạn chuyển nhánh, Git sẽ gắn con trỏ HEAD vào nhánh đích và cập nhật các tệp trong thư mục làm việc khớp với commit mới nhất của nhánh đó.\n\n---\n\n## 🤔 Tại sao cần?\nTrước đây, lệnh cũ `git checkout` vừa dùng để chuyển nhánh vừa dùng để phục hồi tệp tin, khiến người mới học rất dễ gõ nhầm và làm mất các thay đổi đang viết dở. `git switch` ra đời với mục đích duy nhất là chuyển nhánh, giúp thao tác an toàn và rõ ràng hơn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung chuyển nhánh giống như đổi kênh trên tivi. Mỗi nhánh là một kênh truyền hình. Khi bạn chuyển kênh (`git switch`), toàn bộ màn hình trước mắt lập tức hiển thị nội dung của kênh mới, trong khi kênh cũ vẫn được lưu trữ nguyên vẹn ở phía sau mà không hề bị xáo trộn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrước khi switch:\nHEAD ───> main (Thư mục làm việc đang hiển thị code của main)\n          feature-cart\n\nSau lệnh: git switch feature-cart\n          main\nHEAD ───> feature-cart (Thư mục làm việc tự cập nhật khớp với feature-cart)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn Trang đang ở nhánh `main` thì được giao làm giao diện giỏ hàng mới. Trang mở terminal và gõ: `git switch -c feature-cart`. Lệnh này tạo nhánh `feature-cart` và đưa Trang sang nhánh mới ngay lập tức. Sau khi viết xong vài hàm, Trang gõ `git switch main` để xem lại mã nguồn chính, rồi gõ `git switch -` để quay lại tiếp tục công việc giỏ hàng.\n\n---\n\n## 💻 Command\n```bash\ngit switch <tên-nhánh>\ngit switch -c <tên-nhánh-mới>\ngit switch -\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch <tên-nhánh>`: Chuyển sang một nhánh đã tồn tại trong dự án.\n- `git switch -c <tên-nhánh-mới>`: Tạo mới một nhánh và chuyển sang nhánh đó ngay lập tức.\n- `git switch -`: Phím tắt quay lại nhánh bạn vừa đứng trước đó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chuyển nhánh khi có tệp đang sửa xung đột với nhánh đích:** Git sẽ dừng lại và báo lỗi để bảo vệ code của bạn không bị ghi đè.\n2. **Quên dấu cờ `-c` khi muốn tạo nhánh mới:** Nếu gõ `git switch new-branch` khi nhánh chưa tồn tại, Git sẽ báo không tìm thấy nhánh.\n3. **Vẫn dùng lệnh cũ `git checkout`:** Dù vẫn chạy được, nhưng dùng `git switch` sẽ an toàn hơn và tránh nhầm lẫn với thao tác tệp.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Tạo và chuyển sang nhánh mới bằng lệnh `git switch -c feature-user`.\n2. Chạy `git status` để xác nhận dòng thông báo `On branch feature-user`.\n3. Chuyển quay lại nhánh chính bằng lệnh `git switch main`.\n4. Dùng phím tắt `git switch -` để quay trở lại nhánh `feature-user`.\n\n---\n\n## 💡 Hint\nHãy dùng `git switch -` bất cứ khi nào bạn cần qua lại nhanh giữa hai nhánh mà không cần gõ lại tên nhánh dài dòng.\n\n---\n\n## ✅ Validation\n- Nhánh `feature-user` được tạo thành công.\n- Lệnh `git switch main` đưa HEAD về nhánh `main`.\n- Lệnh `git switch -` đưa HEAD quay lại đúng nhánh `feature-user`.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để kiểm tra mức độ thành thạo về lệnh chuyển nhánh `git switch`.\n\n---\n\n## 🔥 Challenge\nHãy thử tạo một tệp mới trên nhánh `feature-user`, commit lại, rồi switch về `main` để quan sát xem tệp đó có biến mất khỏi thư mục làm việc hay không.\n\n---\n\n## 📚 Tổng kết\n- `git switch` là lệnh hiện đại chuyên trách chuyển nhánh an toàn trong Git.\n- Cờ `-c` cho phép vừa tạo vừa chuyển sang nhánh mới trong một thao tác.\n- Dùng `git switch -` để nhảy nhanh về nhánh bạn vừa làm việc trước đó.\n",
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
        "explanation": "Dấu gạch nối `-` đại diện cho nhánh trước đó mà bạn vừa làm việc trước khi chuyển đi."
      },
      {
        "id": "q3",
        "question": "Tại sao cộng đồng Git lại bổ sung lệnh `git switch` tách riêng khỏi lệnh cũ `git checkout`?",
        "type": "single",
        "options": [
          {
            "text": "Để phân tách rõ ràng trách nhiệm chuyển nhánh ra khỏi phục hồi tệp tin, tránh nguy cơ ghi đè nhầm",
            "correct": true
          },
          {
            "text": "Vì lệnh git checkout bị loại bỏ hoàn toàn khỏi tất cả hệ điều hành",
            "correct": false
          },
          {
            "text": "Vì lệnh git switch giúp tăng tốc độ mạng Internet lên gấp mười lần",
            "correct": false
          },
          {
            "text": "Vì lệnh git checkout không cho phép tạo nhánh mới trên máy tính",
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
      },
      {
        "id": "q5",
        "question": "Điều gì xảy ra nếu bạn cố chạy git switch khi đang có sửa đổi chưa commit xung đột với nhánh đích?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ dừng lại và báo lỗi để bảo vệ các sửa đổi chưa commit không bị ghi đè mất",
            "correct": true
          },
          {
            "text": "Git sẽ âm thầm xóa vĩnh viễn các sửa đổi của bạn mà không thông báo",
            "correct": false
          },
          {
            "text": "Git tự động gom toàn bộ sửa đổi đó commit thẳng vào nhánh đích",
            "correct": false
          },
          {
            "text": "Git tự động tắt cửa sổ dòng lệnh terminal của bạn",
            "correct": false
          }
        ],
        "explanation": "Git luôn từ chối chuyển nhánh nếu các thay đổi chưa lưu có nguy cơ bị ghi đè bởi tệp ở nhánh đích."
      }
    ]
  }
};
export default lesson;
