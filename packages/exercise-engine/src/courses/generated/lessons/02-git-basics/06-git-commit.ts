import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-commit",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "06-git-commit",
    "title": "Lưu snapshot với git commit",
    "level": "beginner",
    "duration": 30,
    "xp": 100,
    "prerequisites": [
      "05-git-add"
    ],
    "objectives": [
      "Nắm vững bản chất kỹ thuật của Commit trong Git như một snapshot toàn vẹn của cây thư mục.",
      "Sử dụng thành thạo các câu lệnh `git commit -m \"<thông-điệp>\"` và `git commit -am \"<thông-điệp>`.",
      "Hiểu cách Git liên kết các commit qua cấu trúc Directed Acyclic Graph (DAG) và mã băm SHA.",
      "Tuân thủ quy ước viết thông điệp commit rõ ràng và súc tích."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "first-commit"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git commit",
      "snapshot",
      "commit message",
      "checkpoint",
      "save point",
      "sha-1"
    ],
    "commands": [
      "git commit -m \"feat: your commit message\"",
      "git commit -am \"fix: quick fix\"",
      "git commit --amend"
    ]
  },
  "content": "# Lưu snapshot với git commit\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất kỹ thuật của Commit trong Git như một snapshot toàn vẹn của cây thư mục.\n- Sử dụng thành thạo các câu lệnh `git commit -m \"<thông-điệp>\"` và `git commit -am \"<thông-điệp>`.\n- Hiểu cách Git liên kết các commit qua cấu trúc Directed Acyclic Graph (DAG) và mã băm SHA.\n- Tuân thủ quy ước viết thông điệp commit rõ ràng và súc tích.\n\n---\n\n## 📖 Định nghĩa\n> `git commit` là câu lệnh cốt lõi dùng để ghi lại một điểm kiểm tra (checkpoint / snapshot) vĩnh viễn trong lịch sử của kho mã nguồn (Repository). Mỗi commit bao gồm một ảnh chụp cây thư mục hoàn chỉnh tại thời điểm đó, thông tin định danh tác giả (author name và email), mốc thời gian (timestamp), thông điệp mô tả thay đổi (commit message), và con trỏ trỏ tới một hoặc nhiều commit cha (parent commits). Khác với các hệ thống VCS cũ lưu sự khác biệt dòng code (deltas), Git lưu toàn bộ cây thư mục dưới dạng Snapshot tối ưu.\n\n---\n\n## 🤔 Tại sao cần?\nCommit chính là đơn vị tiền tệ cơ bản của hệ thống Git. Nếu không có commit, toàn bộ công sức bạn viết code suốt nhiều tuần có thể biến mất bất kỳ lúc nào nếu máy tính gặp sự cố phần cứng. Tạo commit thường xuyên với kích thước vừa phải và thông điệp chuẩn mực giúp bạn sở hữu một cỗ máy thời gian hoàn hảo: bạn có thể tự do thử nghiệm các giải pháp táo bạo, và khi gặp ngõ cụt thì chỉ mất một giây để quay lui về mốc an toàn gần nhất.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc chạy lệnh `git commit` giống như thao tác bấm nút Lưu game (Save Point) trong một tựa game nhập vai phiêu lưu mạo hiểm. Trước khi bước vào căn phòng đánh trùm nguy hiểm, bạn luôn tìm điểm save game để ghi lại toàn bộ chỉ số máu, trang bị và vị trí của nhân vật. Nếu bạn bị hạ gục trong trận chiến, bạn chỉ việc tải lại điểm save game đó để thử lại chiến thuật mới mà không phải chơi lại từ đầu màn một.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc liên kết Commit trong đồ thị DAG:\nCommit #1 (Initial)          Commit #2 (Feature)          Commit #3 (Bugfix - HEAD)\n┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐\n│ Tree: 8a4c10         │ ◄── │ Tree: 9f2e30         │ ◄── │ Tree: 7c1b50         │\n│ Author: Nam Nguyen   │     │ Author: Nam Nguyen   │     │ Author: Nam Nguyen   │\n│ Parent: (none)       │     │ Parent: Commit #1    │     │ Parent: Commit #2    │\n│ Msg: init project    │     │ Msg: add login page  │     │ Msg: fix login button│\n└──────────────────────┘     └──────────────────────┘     └──────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm hoàn thành xong chức năng đặt lại mật khẩu qua email cho người dùng. Kỹ sư chạy lệnh git add để đưa các tệp liên quan vào Staging Area, sau đó thực hiện lệnh: `git commit -m \"feat(auth): implement password reset via email token\"`. Ngay lập tức, Git tạo ra một commit object mới mang mã băm c9a4f21 trỏ về commit trước đó, ghi nhận thời gian chính xác và dịch chuyển con trỏ HEAD của nhánh main tiến lên mốc mới này. Toàn bộ ảnh chụp trạng thái code lúc này đã được lưu vĩnh viễn trong cơ sở dữ liệu của dự án, sẵn sàng để đồng nghiệp tải về kiểm thử bất cứ lúc nào.\n\n---\n\n## 💻 Command\n```bash\ngit commit -m \"feat: your commit message\"\ngit commit -am \"fix: quick fix\"\ngit commit --amend\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit -m \"<thông-điệp>\"`: Tạo một commit mới từ các tệp tin đã nằm trong Staging Area kèm thông điệp mô tả tóm tắt ngắn gọn.\n- `git commit -am \"<thông-điệp>\"`: Phím tắt tự động stage tất cả các tệp Modified và tạo commit mà không cần chạy git add trước (không áp dụng cho tệp Untracked).\n- `git commit --amend`: Chỉnh sửa commit gần nhất trên đỉnh HEAD (thêm tệp sót hoặc viết lại thông điệp commit).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Thông điệp commit vô nghĩa**:  Viết những câu như \"fix\", \"update\", \"asdfgh\" khiến đồng nghiệp và chính bạn sau này không thể hiểu commit đó làm gì.\n2. **Commit quá lớn (Mega-commit)**:  Gom công việc của cả tuần với hàng trăm thay đổi không liên quan vào một commit duy nhất khiến việc review và tìm lỗi bất khả thi.\n3. **Nghĩ commit là đã đẩy lên mạng**:  Commit chỉ lưu trên kho chứa máy tính cá nhân cục bộ, phải chạy lệnh git push thì code mới lên GitHub.\n\n---\n\n## 🧪 Lab\n1. Tạo hoặc chỉnh sửa tệp `main.js` với nội dung mới.\n2. Đưa tệp vào Staging Area bằng lệnh `git add main.js`.\n3. Tạo commit đầu tiên bằng câu lệnh `git commit -m \"feat: initialize main app\"`.\n4. Kiểm tra lại bằng `git log --oneline` để thấy commit mới sinh ra.\n\n---\n\n## 💡 Hint\n> Một commit tốt nên tập trung vào một nhiệm vụ duy nhất và có thông điệp rõ ràng.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git log` có xuất hiện commit với đúng thông điệp đã nhập.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết sâu sắc về câu lệnh git commit.\n\n---\n\n## 🔥 Challenge\nNêu sự khác nhau giữa commit trong Git và commit trong cơ sở dữ liệu quan hệ SQL.\n\n---\n\n## 📚 Tổng kết\n- Git Commit là mốc snapshot vĩnh viễn ghi nhận toàn bộ trạng thái dự án tại một thời điểm.\n- Mỗi commit gồm cây thư mục, tác giả, ngày giờ, thông điệp và liên kết trỏ về commit cha.\n- Sử dụng quy ước Conventional Commits giúp lịch sử dự án chuyên nghiệp và dễ bảo trì.\n",
  "quiz": {
    "id": "quiz-02-06-git-commit",
    "title": "Trắc nghiệm chuyên sâu: Bản chất lệnh git commit",
    "questions": [
      {
        "id": "q1",
        "question": "Bản chất kỹ thuật của một commit trong Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "Một ảnh chụp toàn diện (Snapshot) của toàn bộ cây thư mục tại một thời điểm cụ thể",
            "correct": true
          },
          {
            "text": "Một bản ghi chứa các dòng code bị xóa khỏi ổ cứng",
            "correct": false
          },
          {
            "text": "Một lệnh gửi email tự động tới ban giám đốc công ty",
            "correct": false
          },
          {
            "text": "Một tệp sao lưu nén định dạng zip đặt ngoài màn hình Desktop",
            "correct": false
          }
        ],
        "explanation": "Git lưu trữ commit dưới dạng một snapshot toàn vẹn của cây thư mục, tái sử dụng các tệp không đổi qua con trỏ."
      },
      {
        "id": "q2",
        "question": "Lệnh nào dưới đây tạo commit mới với thông điệp ngắn gọn mà không cần mở trình soạn thảo văn bản?",
        "type": "single",
        "options": [
          {
            "text": "git commit -m \"thông điệp\"",
            "correct": true
          },
          {
            "text": "git commit --text \"thông điệp\"",
            "correct": false
          },
          {
            "text": "git commit -s \"thông điệp\"",
            "correct": false
          },
          {
            "text": "git save \"thông điệp\"",
            "correct": false
          }
        ],
        "explanation": "Cờ `-m` viết tắt của `--message` cho phép truyền thông điệp commit trực tiếp trên dòng lệnh."
      },
      {
        "id": "q3",
        "question": "Lệnh `git commit -am \"fix bug\"` có hạn chế quan trọng nào mà lập trình viên cần lưu ý?",
        "type": "single",
        "options": [
          {
            "text": "Không tự động stage được các tệp tin mới tạo ở trạng thái Untracked",
            "correct": true
          },
          {
            "text": "Lệnh này chỉ chạy được trên hệ điều hành macOS",
            "correct": false
          },
          {
            "text": "Lệnh này xóa sạch toàn bộ lịch sử commit trước đó",
            "correct": false
          },
          {
            "text": "Lệnh này bắt buộc phải có kết nối Internet mới chạy được",
            "correct": false
          }
        ],
        "explanation": "Cờ `-a` chỉ tự động stage các tệp Modified đã được theo dõi, hoàn toàn bỏ qua các tệp Untracked."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy lệnh git commit trên máy cá nhân, mã nguồn của bạn đã nằm ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Nằm an toàn trong kho lưu trữ Git cục bộ trên ổ cứng máy bạn",
            "correct": true
          },
          {
            "text": "Đã tự động xuất hiện trên trang web GitHub của cả nhóm",
            "correct": false
          },
          {
            "text": "Đã được gửi tới kho lưu trữ trung tâm của Google",
            "correct": false
          },
          {
            "text": "Đã bị mã hóa và gửi vào hòm thư điện tử",
            "correct": false
          }
        ],
        "explanation": "Git commit chỉ ghi nhận dữ liệu vào cơ sở dữ liệu cục bộ; cần dùng lệnh `git push` để đẩy lên máy chủ GitHub."
      },
      {
        "id": "q5",
        "question": "Mỗi đối tượng commit trong Git bắt buộc phải chứa thông tin nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Con trỏ tới cây thư mục (Tree), thông tin tác giả, mốc thời gian và thông điệp commit",
            "correct": true
          },
          {
            "text": "Số chứng minh nhân dân hoặc căn cước của lập trình viên",
            "correct": false
          },
          {
            "text": "Mật khẩu thẻ tín dụng dùng để thanh toán phí bản quyền",
            "correct": false
          },
          {
            "text": "Địa chỉ nhà riêng và số điện thoại của tác giả",
            "correct": false
          }
        ],
        "explanation": "Một commit object chuẩn của Git gồm mã hash cây thư mục, commit cha, tác giả (author/committer), timestamp và message."
      },
      {
        "id": "q6",
        "question": "Lệnh `git commit --amend` thường được sử dụng trong trường hợp nào?",
        "type": "single",
        "options": [
          {
            "text": "Bổ sung tệp tin bị bỏ sót hoặc sửa lại thông điệp của commit gần nhất",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ kho lưu trữ Git để làm lại từ đầu",
            "correct": false
          },
          {
            "text": "Tạo một nhánh mới có tên là amend",
            "correct": false
          },
          {
            "text": "Khóa kho chứa để không ai được phép commit nữa",
            "correct": false
          }
        ],
        "explanation": "`--amend` cho phép sửa đổi snapshot hoặc message của commit ngay trên đỉnh HEAD mà không tạo thêm commit rác."
      }
    ]
  }
};
export default lesson;
