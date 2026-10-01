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
      "Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.",
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
      "git revert HEAD~2..HEAD",
      "git revert --no-commit <commit-hash>"
    ]
  },
  "content": "# git revert\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).\n- Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).\n- Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.\n- Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git revert\n- **Nói dễ hiểu**: Lệnh hoàn tác an toàn bằng cách tạo thêm một commit mới có nội dung đảo ngược lại commit lỗi.\n- **Ví dụ**: `git revert HEAD` để hủy bỏ tác động của commit gần nhất mà không xóa lịch sử.\n- **Đừng nhầm**: Không xóa commit cũ khỏi git log; cả commit lỗi ban đầu và commit revert đều tồn tại minh bạch.\n\n### forward-moving undo\n- **Nói dễ hiểu**: Cơ chế hoàn tác tiến về phía trước trong tương lai thay vì lùi về quá khứ để viết lại lịch sử.\n- **Ví dụ**: Lịch sử có commit C1, C2 (lỗi), C3 thì revert sẽ tạo thêm commit C4 để đảo ngược C2.\n- **Đừng nhầm**: Khác với reset lùi con trỏ về quá khứ; phương pháp này an toàn tuyệt đối cho các nhánh dùng chung.\n\n### revert commit\n- **Nói dễ hiểu**: Một snapshot commit mới được Git tự động sinh ra chứa các dòng diff đảo ngược.\n- **Ví dụ**: Commit cũ thêm một hàm thì commit revert sẽ xóa đúng hàm đó ra khỏi mã nguồn.\n- **Đừng nhầm**: Nếu có các commit sau đó sửa đè lên cùng file, bạn sẽ phải xử lý conflict tương tự như khi merge.\n\n---\n\n## 📖 Định nghĩa\n`git revert <commit-target>` là câu lệnh hoàn tác an toàn nhất trong Git, hoạt động theo nguyên lý tạo ra một commit snapshot mới mang nội dung đối nghịch chính xác với những gì commit mục tiêu đã thực hiện. Thay vì xóa bỏ commit cũ, `git revert` bảo tồn trọn vẹn chuỗi lịch sử và bổ sung commit mới để vô hiệu hóa lỗi.\n\n---\n\n## 💡 Tại sao cần\nTrên nhánh `main` hoặc `production`, việc viết lại lịch sử bằng reset bị cấm hoàn toàn vì sẽ phá vỡ đồng bộ của các thành viên và vi phạm quy chuẩn kiểm toán phần mềm. `git revert` là giải pháp tiêu chuẩn vàng giúp khắc phục lỗi tức thì mà vẫn giữ lại lịch sử minh bạch để cả nhóm cùng đối chiếu.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung sổ cái kế toán ngân hàng. Khi phát hiện lỡ ghi nhầm một khoản chuyển tiền hôm qua, kế toán viên không được dùng bút xóa hay xé trang sổ đi (reset). Kế toán viên phải ghi thêm một dòng mới vào hôm nay: \"Thu hồi khoản chi nhầm hôm qua\" (revert). Số dư chuẩn xác và sổ sách vẫn hoàn toàn minh bạch.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế hoàn tác tiến lên của git revert:\nLịch sử ban đầu:\nC1 ──► C2 (Gây lỗi thanh toán!) ──► C3 (HEAD -> main)\n\nSau khi chạy git revert C2:\nC1 ──► C2 ──► C3 ──► C4 [Revert \"C2\"] (HEAD -> main)\n(C2 vẫn tồn tại trong lịch sử, nhưng C4 đã đảo ngược toàn bộ thay đổi của C2!)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nHệ thống thương mại điện tử triển khai lên production thì phát hiện commit `e7f8a9b` làm lỗi mã giảm giá. Không hoảng loạn dùng reset, kỹ sư trưởng gõ `git revert e7f8a9b`. Git tự động tính toán diff đối nghịch và mở trình soạn thảo commit message. Kỹ sư lưu lại, đẩy lên server và hệ thống CI/CD tự động cập nhật bản vá. Lỗi được giải quyết triệt để chỉ sau 2 phút.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit revert <commit-hash>\ngit revert HEAD\ngit revert HEAD~2..HEAD\ngit revert --no-commit <commit-hash>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git revert <hash>`: Tạo commit mới đảo ngược các thay đổi do commit chỉ định tạo ra.\n- `git revert HEAD`: Hoàn tác commit gần đây nhất trên nhánh hiện tại.\n- `git revert HEAD~2..HEAD`: Hoàn tác liên tiếp một dải các commit gần nhất.\n- `git revert --no-commit <hash>`: Đảo ngược thay đổi đưa vào Staging nhưng chưa tự động tạo commit mới.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng revert sẽ xóa commit cũ khỏi git log**: Revert bảo tồn toàn bộ lịch sử và chỉ tạo thêm commit mới trên đỉnh nhánh.\n2. **Bối rối khi gặp xung đột conflict lúc revert**: Xung đột xảy ra khi các commit sau đó cùng sửa đổi dòng code; chỉ cần resolve conflict và chạy `git revert --continue`.\n3. **Lạm dụng reset thay vì revert trên nhánh chung**: Khiến máy chủ từ chối push và phá vỡ quy trình làm việc của toàn bộ đồng nghiệp.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo commit revert và đối chiếu lịch sử commit trên terminal.\n1. Tạo một tệp `feature.txt` có nội dung thử nghiệm và thực hiện commit.\n2. Chạy lệnh `git revert HEAD` để hoàn tác commit vừa tạo.\n3. Quan sát Git mở cửa sổ soạn thảo thông điệp commit revert tự động.\n4. Lưu lại và kiểm tra `git log --oneline` để thấy commit revert mới xuất hiện trên đỉnh.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn sử dụng `git revert` khi cần thu hồi tính năng hoặc sửa lỗi trên các nhánh dùng chung và nhánh production.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Commit mới mang thông điệp `Revert \"<tên-commit>\"` xuất hiện trên đỉnh nhật ký `git log`.\n- Nội dung file bị đảo ngược chính xác về trạng thái trước khi commit lỗi diễn ra.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh an toàn git revert.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách sử dụng cờ `-m 1` khi revert một Merge Commit (`git revert -m 1 <merge-commit-hash>`) để chỉ định nhánh chính được giữ lại.\n\n---\n\n## 📝 Tổng kết\n- `git revert` tạo ra một commit mới để đảo ngược lại các thay đổi của commit cũ.\n- Là phương thức hoàn tác an toàn tuyệt đối trên các nhánh dùng chung và production.\n- Bảo tồn nguyên vẹn 100% lịch sử và tính toàn vẹn của chuỗi commit.\n",
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
        "question": "Tại sao `git revert` lại là phương pháp hoàn tác bắt buộc trên nhánh `main` của các dự án chuyên nghiệp?",
        "type": "single",
        "options": [
          {
            "text": "Vì nó không viết lại lịch sử, tránh gây xung đột cho các thành viên khác và phục vụ tốt việc kiểm toán mã nguồn",
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
        "explanation": "Tính bảo tồn lịch sử giúp mọi thành viên kéo code về mà không bị lỗi phân kỳ lịch sử do viết lại cây commit."
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
