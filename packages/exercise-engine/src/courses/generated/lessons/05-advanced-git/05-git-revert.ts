import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-revert",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "05-git-revert",
    "title": "git revert",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "04-git-reset-hard"
    ],
    "objectives": [
      "Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).",
      "Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).",
      "Biết khi nào `git revert` phù hợp để hoàn tác commit đã chia sẻ và vì sao cần review kết quả.",
      "Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git revert",
      "revert commit",
      "dao nguoc commit",
      "hoan tac an toan",
      "public undo",
      "non-destructive"
    ],
    "commands": [
      "git revert <commit-hash>",
      "git revert HEAD",
      "git log --oneline"
    ]
  },
  "content": "# git revert\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).\n- Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).\n- Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.\n- Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git revert\n- **Nói dễ hiểu**: Lệnh hoàn tác an toàn bằng cách tạo thêm một commit mới có nội dung đảo ngược lại commit lỗi.\n- **Ví dụ**: `git revert HEAD` để hủy bỏ tác động của commit gần nhất mà không xóa lịch sử.\n- **Đừng nhầm**: Không xóa commit cũ khỏi git log; cả commit lỗi ban đầu và commit revert đều tồn tại minh bạch.\n\n### forward-moving undo\n- **Nói dễ hiểu**: Cơ chế hoàn tác tiến về phía trước trong tương lai thay vì lùi về quá khứ để viết lại lịch sử.\n- **Ví dụ**: Lịch sử có commit C1, C2 (lỗi), C3 thì revert sẽ tạo thêm commit C4 để đảo ngược C2.\n- **Đừng nhầm**: Không di chuyển nhánh lùi như reset. Trên nhánh dùng chung, revert thường ít gây gián đoạn hơn, nhưng vẫn phải xem kết quả.\n\n### revert commit\n- **Nói dễ hiểu**: Một snapshot commit mới được Git tự động sinh ra chứa các dòng diff đảo ngược.\n- **Ví dụ**: Commit cũ thêm một hàm thì commit revert sẽ xóa đúng hàm đó ra khỏi mã nguồn.\n- **Đừng nhầm**: Nếu có các commit sau đó sửa đè lên cùng file, bạn sẽ phải xử lý conflict tương tự như khi merge.\n\n---\n\n## 📖 Định nghĩa\n`git revert <commit-target>` tạo commit mới áp dụng phần thay đổi ngược với commit mục tiêu, nên commit cũ vẫn nằm trong lịch sử. Đây thường là cách phù hợp để hoàn tác commit đã chia sẻ. Nếu các commit sau đã sửa cùng vùng, Git có thể báo conflict hoặc kết quả cần được kiểm tra; revert merge commit còn cần chọn mainline bằng `-m`.\n\n---\n\n## 💡 Tại sao cần\nTrên nhánh đã chia sẻ, reset một commit đã push có thể làm lịch sử của đồng đội lệch nhau. `git revert` thường hợp hơn vì giữ commit cũ và thêm commit đảo thay đổi. Hãy làm theo chính sách của nhóm, xem diff sau khi revert và xử lý conflict nếu Git báo.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung sổ cái kế toán ngân hàng. Khi phát hiện lỡ ghi nhầm một khoản chuyển tiền hôm qua, kế toán viên không được dùng bút xóa hay xé trang sổ đi (reset). Kế toán viên phải ghi thêm một dòng mới vào hôm nay: \"Thu hồi khoản chi nhầm hôm qua\" (revert). Số dư chuẩn xác và sổ sách vẫn hoàn toàn minh bạch.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế hoàn tác tiến lên của git revert:\nLịch sử ban đầu:\nC1 ──► C2 (Gây lỗi thanh toán!) ──► C3 (HEAD -> main)\n\nSau khi chạy git revert C2:\nC1 ──► C2 ──► C3 ──► C4 [Revert \"C2\"] (HEAD -> main)\n(C2 vẫn tồn tại trong lịch sử, nhưng C4 đã đảo ngược toàn bộ thay đổi của C2!)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nHệ thống thương mại điện tử phát hiện commit `e7f8a9b` làm lỗi mã giảm giá. Sau khi xác nhận phạm vi thay đổi, kỹ sư chạy `git revert e7f8a9b`, xem diff đảo ngược, xử lý conflict nếu có, rồi chạy kiểm thử. Nếu nhóm dùng CI/CD, pipeline sẽ chạy theo cấu hình sau khi thay đổi được push.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit revert <commit-hash>\ngit revert HEAD\n```\n\n`git revert <dải-commit>` và `git revert --no-commit` là cú pháp Git thật; simulator hiện chỉ hỗ trợ revert một commit mỗi lần.\n\n---\n\n## 🔍 Giải thích command\n- `git revert <hash>`: Tạo commit mới đảo ngược các thay đổi do commit chỉ định tạo ra.\n- `git revert HEAD`: Hoàn tác commit gần đây nhất trên nhánh hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng revert xóa commit cũ khỏi `git log`**: Lệnh này giữ commit cũ và thêm commit mới.\n2. **Cho rằng revert luôn tự chạy trơn tru**: Thay đổi về sau có thể gây conflict; giải quyết theo thông báo Git rồi kiểm tra diff trước khi tiếp tục.\n3. **Revert merge commit như commit thường**: Cần chọn mainline (`-m`) trong Git thật; quy trình nhóm cũng cần xác định tác động của việc đảo ngược merge.\n\n---\n\n## 🧪 Lab thực hành\nBài này cần có commit cha, vì không thể dùng lệnh revert thông thường để đảo ngược commit gốc duy nhất.\n1. Trong kho thử nghiệm riêng, tạo `base.txt`, stage và commit bằng thông điệp `base`.\n2. Tạo `feature.txt`, stage và commit bằng thông điệp `add feature`.\n3. Chạy `git revert HEAD`. Git thật thường mở editor để xác nhận thông điệp; simulator của khóa học tự tạo thông điệp mặc định.\n4. Chạy `git status`, mở `feature.txt`, rồi chạy `git log --oneline -3`. File đã được gỡ khỏi snapshot mới và log vẫn có cả commit thêm file lẫn commit revert.\n\n---\n\n## 💡 Hint & mẹo\n> Với commit đã chia sẻ, thường ưu tiên cách hoàn tác giữ lịch sử như `git revert`; làm theo quy ước của nhóm và kiểm tra diff trước khi push.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Commit mới mang thông điệp `Revert \"<tên-commit>\"` xuất hiện trên đỉnh nhật ký `git log`.\n- Trong ví dụ không có thay đổi về sau, `feature.txt` không còn trong snapshot mới; với file đã đổi tiếp, hãy review diff và xử lý conflict nếu Git yêu cầu.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh an toàn git revert.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách sử dụng cờ `-m 1` khi revert một Merge Commit (`git revert -m 1 <merge-commit-hash>`) để chỉ định nhánh chính được giữ lại.\n\n---\n\n## 📝 Tổng kết\n- `git revert` tạo ra một commit mới để đảo ngược lại các thay đổi của commit cũ.\n- Thường phù hợp để hoàn tác commit đã chia sẻ vì không xóa commit cũ khỏi lịch sử.\n- Kết quả vẫn cần được review và kiểm thử; Git có thể báo conflict.\n",
  "quiz": {
    "id": "quiz-05-05-git-revert",
    "title": "Trắc nghiệm: git revert",
    "questions": [
      {
        "id": "q1",
        "question": "Bản chất cốt lõi của câu lệnh `git revert <commit-hash>` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo một commit mới đảo ngược lại toàn bộ các thay đổi mà commit chỉ định đã thực hiện",
            "correct": true
          },
          {
            "text": "Xóa bỏ hoàn toàn commit chỉ định khỏi lịch sử vĩnh viễn",
            "correct": false
          },
          {
            "text": "Chuyển đổi commit đó sang một kho lưu trữ khác",
            "correct": false
          },
          {
            "text": "Đổi tên tác giả của commit đó",
            "correct": false
          }
        ],
        "explanation": "`git revert` tiến lên phía trước bằng cách sinh ra commit nghịch đảo chứ không hề xóa bỏ commit trong quá khứ."
      },
      {
        "id": "q2",
        "question": "Vì sao `git revert` thường được chọn để hoàn tác trên nhánh `main` dùng chung?",
        "type": "single",
        "options": [
          {
            "text": "Vì nó thêm commit đảo thay đổi mà không di chuyển nhánh lùi, giúp người khác đồng bộ lịch sử dễ hơn",
            "correct": true
          },
          {
            "text": "Vì lệnh này chạy nhanh hơn tất cả các lệnh khác 100 lần",
            "correct": false
          },
          {
            "text": "Vì GitHub không hỗ trợ bất kỳ câu lệnh nào khác",
            "correct": false
          },
          {
            "text": "Vì nó tự động sửa lỗi logic của lập trình viên",
            "correct": false
          }
        ],
        "explanation": "Revert giữ commit cũ và thêm commit đảo thay đổi. Nhóm vẫn cần review kết quả và xử lý xung đột nếu có."
      },
      {
        "id": "q3",
        "question": "Nếu commit bạn muốn revert đang bị mâu thuẫn dòng code với các commit mới hơn, Git sẽ xử lý thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Git dừng lại và kích hoạt trạng thái xung đột (conflict) để bạn giải quyết thủ công rồi mới tiếp tục",
            "correct": true
          },
          {
            "text": "Git tự động xóa toàn bộ các commit mới hơn để ưu tiên revert",
            "correct": false
          },
          {
            "text": "Git hủy bỏ toàn bộ kho lưu trữ trên máy tính",
            "correct": false
          },
          {
            "text": "Git tự động chọn ngẫu nhiên một phương án",
            "correct": false
          }
        ],
        "explanation": "Revert thực chất là một phép áp dụng diff nghịch đảo, nếu có xung đột bạn phải xử lý conflict tương tự như khi merge."
      },
      {
        "id": "q4",
        "question": "Cờ `--no-commit` (hoặc `-n`) trong lệnh `git revert -n <hash>` có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Áp dụng các thay đổi đảo ngược vào Working Tree và Staging nhưng không tự động tạo commit mới ngay lập tức",
            "correct": true
          },
          {
            "text": "Cấm không bao giờ cho phép commit lại tệp đó nữa",
            "correct": false
          },
          {
            "text": "Xóa commit đó khỏi bộ nhớ cache của CPU",
            "correct": false
          },
          {
            "text": "Ngăn không cho Git ghi log lịch sử",
            "correct": false
          }
        ],
        "explanation": "`--no-commit` cho phép bạn đảo ngược nhiều commit liên tiếp vào Staging rồi mới tự tay gom thành một commit hoàn chỉnh."
      },
      {
        "id": "q5",
        "question": "Khi cần revert một Merge Commit (commit có 2 cha), bạn bắt buộc phải truyền thêm tham số nào?",
        "type": "single",
        "options": [
          {
            "text": "Cờ `-m` (hoặc `--mainline`) kèm số thứ tự nhánh cha (ví dụ `-m 1`) để chỉ định nhánh giữ lại",
            "correct": true
          },
          {
            "text": "Cờ `--force-merge` để ép Git chọn nhánh đầu tiên",
            "correct": false
          },
          {
            "text": "Cờ `--two-parents` để xóa bỏ cả hai nhánh cha cùng lúc",
            "correct": false
          },
          {
            "text": "Không cần cờ nào, Git tự động xóa cả hai nhánh cha",
            "correct": false
          }
        ],
        "explanation": "Vì merge commit có từ hai nhánh cha trở lên, cờ `-m <parent-number>` bắt buộc phải có để báo cho Git biết bên nào là dòng chính cần được giữ lại."
      }
    ]
  }
};
export default lesson;
