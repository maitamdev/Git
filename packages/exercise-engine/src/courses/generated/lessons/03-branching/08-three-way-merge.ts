import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-three-way-merge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "08-three-way-merge",
    "title": "Hợp nhất rẽ nhánh 3-way merge",
    "level": "intermediate",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "07-fast-forward-merge"
    ],
    "objectives": [
      "Nắm vững thuật toán hợp nhất 3 chiều (Three-way merge) trong Git.",
      "Nhận diện 3 điểm cốt lõi của thuật toán: Tổ tiên chung (Common Ancestor), đỉnh nhánh hiện tại (HEAD), và đỉnh nhánh được gộp.",
      "Phân biệt rõ ràng giữa hợp nhất thành công tự động và tình huống phát sinh xung đột (Conflict).",
      "Đọc hiểu cấu trúc một Merge Commit đặc biệt có hai commit cha."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "three-way-merge"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "3-way merge",
      "merge commit",
      "common ancestor",
      "hop nhat 3 chieu",
      "phan ky"
    ],
    "commands": [
      "git switch main",
      "git merge <tên-nhánh-tính-năng>",
      "git log --oneline --graph"
    ]
  },
  "content": "# Hợp nhất rẽ nhánh 3-way merge\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý hoạt động của thuật toán hợp nhất ba chiều (Three-way merge).\n- Nhận diện 3 điểm cốt lõi: Tổ tiên chung (Base), đỉnh nhánh hiện tại (Ours) và đỉnh nhánh được gộp (Theirs).\n- Hiểu được Merge Commit là commit đặc biệt có 2 commit cha để nối liền hai luồng lịch sử.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### 3-way Merge — hợp nhất ba chiều\n- **Nói dễ hiểu:** Thuật toán gộp hai nhánh dựa trên 3 điểm: tổ tiên chung, đỉnh nhánh hiện tại và đỉnh nhánh cần gộp.\n- **Ví dụ:** Khi cả `main` và `feature` đều có commit mới độc lập, Git tự động kích hoạt 3-way merge.\n- **Đừng nhầm:** 3-way merge không có nghĩa là bị lỗi xung đột; nếu sửa khác tệp hoặc khác dòng, Git tự gộp hoàn toàn tự động.\n\n### Common Ancestor (Merge Base) — mốc tổ tiên chung\n- **Nói dễ hiểu:** Commit cuối cùng mà cả hai nhánh cùng chia sẻ trước khi rẽ sang hai hướng phát triển riêng.\n- **Ví dụ:** Commit C2 là điểm rẽ nhánh; Git dùng C2 làm thước đo để biết mỗi bên đã sửa những dòng nào.\n- **Đừng nhầm:** Bạn không phải tự tìm commit này bằng mắt; Git tự động tính toán mốc tổ tiên chung gần nhất.\n\n### Merge Commit — commit hợp nhất\n- **Nói dễ hiểu:** Một commit đặc biệt nối hai nhánh lại với nhau và có hai commit cha ở phía trước.\n- **Ví dụ:** Commit có thông điệp mặc định `Merge branch 'feature-search' into main`.\n- **Đừng nhầm:** Hợp nhất kiểu Fast-forward không tạo ra commit này; chỉ 3-way merge mới sinh ra commit hợp nhất có 2 cha.\n\n---\n\n## 📖 Định nghĩa\nThree-way merge (hợp nhất 3 chiều) là thuật toán chuẩn của Git khi hai nhánh đã bị phân kỳ (mỗi nhánh đều có commit mới kể từ mốc rẽ nhánh). Git đối chiếu 3 mốc: tổ tiên chung, nhánh hiện tại và nhánh cần gộp. Nếu các thay đổi không đá nhau trên cùng dòng, Git tự động kết hợp và tạo ra một Merge Commit mới.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thực tế làm việc nhóm, nhánh `main` hiếm khi đứng yên chờ một mình bạn. Đồng nghiệp liên tục đưa các tính năng khác vào `main`. Thuật toán 3-way merge cho phép bạn tích hợp nhánh của mình vào nhánh chính đã có thay đổi mới mà không làm mất công sức của bất kỳ ai.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai bạn cùng dịch tiếp một cuốn sách từ chương 5 (tổ tiên chung). Bạn A dịch các chương đầu (nhánh `main`), bạn B dịch phần phụ lục cuối sách (nhánh `feature`). Khi nộp bài, người biên tập cầm bản gốc chương 5 ra đối chiếu với bản của A và B. Thấy hai người dịch ở hai phần riêng biệt, người biên tập gom cả hai lại đóng thành một cuốn sách xuất bản hoàn chỉnh (Merge Commit).\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc 3 điểm trong thuật toán Three-way merge:\n                 (Base - Tổ tiên chung)\n                          Commit C2\n                         /         \\\n                        /           \\\n           Commit C3 (Ours)       Commit C4 (Theirs)\n                        \\           /\n                         \\         /\n                          Commit C5 (Merge Commit - có 2 cha C3 & C4)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn Huy tạo nhánh `feature-search` từ commit C2 của `main` để làm tệp `search.js`. Cùng lúc đó trên `main`, bạn Mai sửa giao diện trong tệp `styles.css`. Khi Huy chạy lệnh gộp nhánh `feature-search` vào `main`, Git nhận thấy hai bạn sửa ở hai tệp hoàn toàn khác nhau. Git tự động gộp cả hai tệp vào một commit hợp nhất mới C5 mà không phát sinh xung đột nào.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit merge <tên-nhánh-tính-năng>\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Chuyển về nhánh đích đón nhận kết quả hợp nhất.\n- `git merge <tên-nhánh>`: Thực thi thuật toán 3-way merge và mở trình soạn thảo để xác nhận thông điệp commit hợp nhất.\n- `git log --oneline --graph`: Vẽ đồ thị kiểm tra nút giao hợp nhất có hai đường dẫn về hai nhánh cha.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Bất ngờ khi trình soạn thảo tự động mở lên:** Khi tạo Merge Commit, Git yêu cầu xác nhận thông điệp; bạn chỉ cần lưu và đóng trình soạn thảo lại.\n2. **Nghĩ 3-way merge luôn gây ra xung đột:** Nếu hai nhánh sửa khác tệp hoặc khác dòng, Git tự động gộp êm đẹp 100%.\n3. **Quên kiểm tra lại ứng dụng sau khi merge:** Dù Git gộp văn bản thành công, bạn vẫn nên chạy thử chương trình để đảm bảo tính năng hoạt động tương thích.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Tạo nhánh `feature-contact` và sửa tệp `contact.html`.\n2. Chuyển về nhánh `main` và sửa tệp `about.html` để tạo ra lịch sử phân kỳ.\n3. Chạy lệnh `git merge feature-contact` từ nhánh `main`.\n4. Quan sát Git tự động hoàn tất 3-way merge và tạo ra commit hợp nhất mới.\n\n---\n\n## 💡 Hint\nKhi hai nhánh sửa hai tệp khác nhau, Git sẽ tự động gộp mà không cần bạn phải can thiệp thủ công.\n\n---\n\n## ✅ Validation\n- Lệnh `git log --graph --oneline` hiển thị rõ hai nhánh gộp lại tại một commit hợp nhất.\n- Cả hai tệp `contact.html` và `about.html` đều có mặt với nội dung đầy đủ trên nhánh `main`.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để nắm vững nguyên lý hoạt động của thuật toán Three-way merge.\n\n---\n\n## 🔥 Challenge\nChạy lệnh `git merge-base main feature-contact` để xem Git in ra chính xác mã hash của commit tổ tiên chung giữa hai nhánh.\n\n---\n\n## 📚 Tổng kết\n- Three-way merge dùng 3 snapshot: Tổ tiên chung, nhánh hiện tại và nhánh cần gộp.\n- Tự động kích hoạt khi hai nhánh đã có sự phân kỳ độc lập trong lịch sử.\n- Tự động tạo ra một Merge Commit mới có hai commit cha khi không có xung đột dòng.\n",
  "quiz": {
    "id": "quiz-03-08-three-way-merge",
    "title": "Trắc nghiệm: Thuật toán Three-way merge",
    "questions": [
      {
        "id": "q1",
        "question": "Thuật toán Three-way merge của Git sử dụng chính xác 3 mốc snapshot nào dưới đây để đối chiếu?",
        "type": "single",
        "options": [
          {
            "text": "Commit tổ tiên chung gần nhất (Base), đỉnh nhánh hiện tại (Ours), và đỉnh nhánh được gộp (Theirs)",
            "correct": true
          },
          {
            "text": "Ba commit đầu tiên khi dự án vừa được khởi tạo bằng git init",
            "correct": false
          },
          {
            "text": "Ba commit ngẫu nhiên do máy tính tự động chọn từ kho lưu trữ",
            "correct": false
          },
          {
            "text": "Ba nhánh khác nhau của ba lập trình viên khác nhau",
            "correct": false
          }
        ],
        "explanation": "Thuật toán 3 chiều đối chiếu Base, Ours và Theirs để nhận diện chính xác từng bên đã thay đổi những gì."
      },
      {
        "id": "q2",
        "question": "Điểm đặc biệt quan trọng nhất của một Merge Commit sinh ra từ Three-way merge là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nó có hai (hoặc nhiều hơn) commit cha trỏ về đỉnh của các nhánh vừa được hợp nhất",
            "correct": true
          },
          {
            "text": "Nó không có mã băm SHA nào cả",
            "correct": false
          },
          {
            "text": "Nó tự động xóa bỏ toàn bộ mã nguồn của nhánh con",
            "correct": false
          },
          {
            "text": "Nó không chứa bất kỳ dòng thông điệp mô tả nào",
            "correct": false
          }
        ],
        "explanation": "Merge Commit là một nút đặc biệt trong đồ thị DAG có 2 con trỏ cha (parent commits)."
      },
      {
        "id": "q3",
        "question": "Nếu nhánh A sửa tệp `user.js` và nhánh B sửa tệp `product.js` kể từ điểm rẽ nhánh chung, kết quả khi merge B vào A sẽ là gì?",
        "type": "single",
        "options": [
          {
            "text": "Git tự động hợp nhất thành công hoàn toàn và tạo ra một Merge Commit mới mà không có xung đột",
            "correct": true
          },
          {
            "text": "Git sẽ báo lỗi xung đột nghiêm trọng và hủy bỏ toàn bộ thay đổi",
            "correct": false
          },
          {
            "text": "Git sẽ xóa tệp product.js và chỉ giữ lại user.js",
            "correct": false
          },
          {
            "text": "Git bắt buộc lập trình viên phải chọn xóa một trong hai tệp",
            "correct": false
          }
        ],
        "explanation": "Thay đổi trên các tệp tin độc lập hoàn toàn không gây conflict; Git tự động kết hợp cả hai tệp vào snapshot mới."
      },
      {
        "id": "q4",
        "question": "Lệnh nào cho phép bạn tra cứu trực tiếp mã băm của commit tổ tiên chung giữa hai nhánh `main` và `feature`?",
        "type": "single",
        "options": [
          {
            "text": "git merge-base main feature",
            "correct": true
          },
          {
            "text": "git find-ancestor main feature",
            "correct": false
          },
          {
            "text": "git common-root main feature",
            "correct": false
          },
          {
            "text": "git parent-search main feature",
            "correct": false
          }
        ],
        "explanation": "`git merge-base <branch1> <branch2>` in ra mã SHA của commit tổ tiên chung gần nhất."
      },
      {
        "id": "q5",
        "question": "Thông điệp commit mặc định mà Git tự động gợi ý khi tạo một Merge Commit có dạng như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Merge branch 'feature' into main (hoặc tương đương)",
            "correct": true
          },
          {
            "text": "Oops! An error occurred",
            "correct": false
          },
          {
            "text": "Auto backup daily report",
            "correct": false
          },
          {
            "text": "Delete old files",
            "correct": false
          }
        ],
        "explanation": "Git tự động tạo message mặc định nêu rõ tên nhánh nguồn được gộp vào nhánh đích."
      },
      {
        "id": "q6",
        "question": "Khi trình soạn thảo tự động mở ra yêu cầu xác nhận thông điệp của merge commit, bạn cần làm gì để hoàn tất quá trình merge?",
        "type": "single",
        "options": [
          {
            "text": "Lưu tệp tin và đóng trình soạn thảo lại (ví dụ trong Nano bấm Ctrl+O rồi Ctrl+X, hoặc trong Vim gõ :wq)",
            "correct": true
          },
          {
            "text": "Rút phích cắm điện máy tính ngay lập tức",
            "correct": false
          },
          {
            "text": "Bấm phím Delete trên bàn phím liên tục",
            "correct": false
          },
          {
            "text": "Gõ thêm mật khẩu ngân hàng của bạn vào tệp",
            "correct": false
          }
        ],
        "explanation": "Đóng trình soạn thảo sau khi lưu sẽ hoàn tất thao tác tạo Merge Commit trong Git."
      }
    ]
  }
};
export default lesson;
