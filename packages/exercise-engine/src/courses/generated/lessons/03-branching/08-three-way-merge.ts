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
  "content": "# Hợp nhất rẽ nhánh 3-way merge\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững thuật toán hợp nhất 3 chiều (Three-way merge) trong Git.\n- Nhận diện 3 điểm cốt lõi của thuật toán: Tổ tiên chung (Common Ancestor), đỉnh nhánh hiện tại (HEAD), và đỉnh nhánh được gộp.\n- Phân biệt rõ ràng giữa hợp nhất thành công tự động và tình huống phát sinh xung đột (Conflict).\n- Đọc hiểu cấu trúc một Merge Commit đặc biệt có hai commit cha.\n\n---\n\n## 📖 Định nghĩa\n> Three-way merge (Hợp nhất 3 chiều) là thuật toán hợp nhất tiêu chuẩn của Git được kích hoạt khi lịch sử của hai nhánh đã bị phân kỳ (cả nhánh chính và nhánh tính năng đều có những commit mới độc lập kể từ điểm rẽ nhánh chung). Để hợp nhất hai luồng thay đổi này lại với nhau, Git sử dụng đúng 3 ảnh chụp snapshot: Commit tổ tiên chung gần nhất (Common Ancestor hay Base), commit đỉnh của nhánh hiện tại (`OURS`), và commit đỉnh của nhánh cần gộp (`THEIRS`). Nếu các thay đổi nằm ở các tệp tin hoặc các dòng code khác nhau, Git sẽ tự động hợp nhất thành công và tạo ra một Merge Commit mới.\n\n---\n\n## 🤔 Tại sao cần?\nTrong môi trường làm việc nhóm thực tế, gần như không bao giờ có chuyện nhánh main đứng yên chờ bạn hoàn thành tính năng suốt nhiều tuần. Các đồng nghiệp khác liên tục đưa các tính năng mới và các bản sửa lỗi vào nhánh main. Khi bạn hoàn thành công việc của mình, hai nhánh chắc chắn đã bị phân kỳ. Thuật toán 3-way merge chính là phép màu thuật toán giúp tích hợp công sức của nhiều kỹ sư làm việc song song một cách tự động và chính xác.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng hai dịch giả cùng dịch tiếp một cuốn tiểu thuyết kinh điển từ chương 5 (commit tổ tiên chung). Dịch giả A nhận nhiệm vụ dịch các chương tiếp theo ở nửa đầu cuốn sách (nhánh main), còn Dịch giả B nhận nhiệm vụ dịch các phụ lục tra cứu ở cuối sách (nhánh feature). Khi đến ngày xuất bản, tổng biên tập (Git) cầm bản thảo gốc chương 5 ra đối chiếu cùng bản dịch của A và B. Thấy hai người dịch ở hai phần hoàn toàn tách biệt của cuốn sách, tổng biên tập chỉ việc gom hai phần đó lại và đóng thành một cuốn sách xuất bản hoàn chỉnh (Merge Commit).\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc 3 điểm trong thuật toán Three-way merge:\n                 (Base - Tổ tiên chung)\n                          Commit C2\n                         /         \\\n                        /           \\\n           Commit C3 (Ours)       Commit C4 (Theirs)\n                        \\           /\n                         \\         /\n                          Commit C5 (Merge Commit - có 2 cha C3 & C4)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Huy tách nhánh feature-search từ commit C2 của nhánh main. Trong khi Huy viết chức năng tìm kiếm sản phẩm trong tệp search.js (sinh ra commit C4), thì ở nhánh main đồng nghiệp Mai sửa xong lỗi giao diện trong styles.css (sinh ra commit C3). Khi Huy merge feature-search vào main, Git tự động tìm thấy tổ tiên chung C2. Nhận thấy hai người sửa ở hai tệp tin hoàn toàn khác nhau, Git tự động kết hợp cả hai thay đổi và tạo ra một commit hợp nhất mới C5, đưa toàn bộ chức năng tìm kiếm và giao diện mới vào cùng một phiên bản.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit merge <tên-nhánh-tính-năng>\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Chuyển về nhánh đón nhận kết quả hợp nhất.\n- `git merge <tên-nhánh>`: Thực thi thuật toán Three-way merge tự động kết hợp thay đổi và mở trình soạn thảo để xác nhận thông điệp commit hợp nhất.\n- `git log --oneline --graph`: Vẽ đồ thị kiểm tra nhánh đã được gộp lại với nút giao commit có 2 đường liên kết trỏ về 2 cha.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Bất ngờ khi trình soạn thảo văn bản tự động bật lên**:  Khi tạo merge commit, Git yêu cầu xác nhận thông điệp commit (mặc định dạng\n2. **Tưởng 3-way merge luôn luôn gây ra conflict**:  Nếu hai nhánh sửa ở các file khác nhau hoặc các dòng cách xa nhau, Git tự động merge 100% trơn tru.\n3. **Không kiểm tra lại kết quả chạy thử ứng dụng sau khi merge**:  Dù Git merge tự động không báo lỗi cú pháp nhưng logic hai phần có thể chưa tương thích.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh `feature-contact` và sửa tệp `contact.html`.\n2. Chuyển về nhánh `main` và sửa tệp `about.html` để tạo ra sự phân kỳ lịch sử.\n3. Chạy lệnh `git merge feature-contact` từ nhánh `main`.\n4. Quan sát Git thực hiện 3-way merge tự động thành công và tạo merge commit mới.\n\n---\n\n## 💡 Hint\n> Nếu hai người sửa hai tệp khác nhau, Git sẽ tự động tạo Merge Commit mà không phát sinh conflict.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git log --graph` thấy hình thái nút giao hợp nhất của hai nhánh.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về thuật toán Three-way merge.\n\n---\n\n## 🔥 Challenge\nNêu cách Git xác định commit tổ tiên chung gần nhất (Merge Base) bằng lệnh `git merge-base`.\n\n---\n\n## 📚 Tổng kết\n- Three-way merge sử dụng 3 snapshot: Tổ tiên chung, nhánh hiện tại và nhánh được gộp.\n- Kích hoạt khi hai nhánh đã có sự phân kỳ lịch sử độc lập.\n- Tự động tạo ra một Merge Commit mới có hai commit cha nếu không có xung đột dòng code.\n",
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
