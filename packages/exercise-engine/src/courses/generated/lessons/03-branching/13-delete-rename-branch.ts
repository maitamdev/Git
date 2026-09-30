import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-delete-rename-branch",
  "moduleId": "03-branching",
  "metadata": {
    "id": "13-delete-rename-branch",
    "title": "Xóa và đổi tên nhánh an toàn",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-git-branch"
    ],
    "objectives": [
      "Nắm vững kỹ thuật dọn dẹp và bảo trì hệ thống nhánh sau khi hoàn tất tính năng.",
      "Sử dụng thành thạo cú pháp đổi tên nhánh hiện tại và đổi tên nhánh bất kỳ từ xa.",
      "Phân biệt rõ ràng giữa cờ an toàn `-d` và cờ cưỡng chế `-D` khi xóa nhánh.",
      "Hiểu cách xóa nhánh trên máy chủ từ xa thông qua lệnh `git push origin --delete <nhánh>`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "delete branch",
      "rename branch",
      "git branch -d",
      "git branch -m",
      "don dep nhanh"
    ],
    "commands": [
      "git branch -m <tên-mới>",
      "git branch -m <tên-cũ> <tên-mới>",
      "git branch -d <tên-nhánh>",
      "git branch -D <tên-nhánh>",
      "git push origin --delete <tên-nhánh>"
    ]
  },
  "content": "# Xóa và đổi tên nhánh an toàn\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững kỹ thuật dọn dẹp và bảo trì hệ thống nhánh sau khi hoàn tất tính năng.\n- Sử dụng thành thạo cú pháp đổi tên nhánh hiện tại và đổi tên nhánh bất kỳ từ xa.\n- Phân biệt rõ ràng giữa cờ an toàn `-d` và cờ cưỡng chế `-D` khi xóa nhánh.\n- Hiểu cách xóa nhánh trên máy chủ từ xa thông qua lệnh `git push origin --delete <nhánh>`.\n\n---\n\n## 📖 Định nghĩa\n> Xóa và đổi tên nhánh là các thao tác bảo trì thiết yếu trong vòng đời phát triển phần mềm, giúp giữ cho kho lưu trữ Git luôn tinh gọn, dễ quản lý và tuân thủ các quy chuẩn đặt tên của đội ngũ kỹ thuật. Thao tác xóa nhánh trong Git chỉ đơn thuần là xóa bỏ một tệp con trỏ nhỏ 41 byte trong thư mục `.git/refs/heads/`, trong khi các commit object bên dưới vẫn tồn tại an toàn trong cơ sở dữ liệu cho đến khi trình thu gom rác (Garbage Collector) hoạt động.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quá trình phát triển dự án, việc đặt tên nhánh sai chính tả, đặt tên không đúng quy ước (ví dụ: thiếu tiền tố `feature/` hoặc `bugfix/`) xảy ra thường xuyên. Khả năng đổi tên nhánh nhanh chóng giúp bạn chuẩn hóa quy trình trước khi tạo Pull Request. Ngoài ra, việc chủ động xóa các nhánh đã hoàn thành và đã được merge giúp đồng nghiệp không bị bối rối trước một danh sách hàng chục nhánh cũ đã lỗi thời.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung các con trỏ nhánh giống như những chiếc thẻ đánh dấu trang sách (Bookmark) kẹp vào các trang của một cuốn bách khoa toàn thư. Khi bạn đọc xong một chương sách và ghi nhớ trọn vẹn kiến thức (đã merge), bạn rút chiếc thẻ đánh dấu trang đó ra cất đi (xóa nhánh) để cuốn sách gọn gàng. Các trang sách và nội dung chữ bên trong cuốn sách (các commit) hoàn toàn không hề bị rách hay biến mất, chúng vẫn nằm nguyên vẹn trong gáy cuốn sách.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế rút thẻ đánh dấu trang (Xóa nhánh):\nTrước khi xóa:\nmain ──────────► Commit C3\nfeature-cart ──► Commit C3 (Trỏ cùng commit C3)\n\nSau khi chạy: git branch -d feature-cart\nmain ──────────► Commit C3\n(Chỉ có con trỏ feature-cart bị gỡ bỏ, Commit C3 vẫn an toàn 100%)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Long vừa hoàn tất và merge thành công nhánh tính năng feature-auth vào nhánh main của dự án công ty. Khi kiểm tra lại danh sách các nhánh trên máy tính cá nhân, Long thấy nhánh cũ vẫn còn tồn tại và hiển thị trong terminal. Long nhanh chóng chuyển về nhánh main bằng câu lệnh `git switch main` rồi tự tin thực thi lệnh: `git branch -d feature-auth`. Git kiểm tra thấy toàn bộ commit đã được tích hợp an toàn và in ra thông báo: \"Deleted branch feature-auth (was 7a9c1e2).\" Danh sách nhánh của Long giờ đây chỉ còn lại nhánh main sạch sẽ, tinh tươm, giúp Long tập trung cao độ và sẵn sàng nhận nhiệm vụ tiếp theo từ đội ngũ mà không sợ nhầm lẫn.\n\n---\n\n## 💻 Command\n```bash\ngit branch -m <tên-mới>\ngit branch -m <tên-cũ> <tên-mới>\ngit branch -d <tên-nhánh>\ngit branch -D <tên-nhánh>\ngit push origin --delete <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch -m <tên-mới>`: Đổi tên nhánh hiện tại bạn đang đứng sang tên mới.\n- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên một nhánh bất kỳ mà không cần phải chuyển sang nhánh đó.\n- `git branch -d <tên-nhánh>`: Xóa nhánh an toàn (chỉ cho phép xóa nếu nhánh đã được merge vào HEAD).\n- `git branch -D <tên-nhánh>`: Ép buộc xóa nhánh ngay lập tức, hữu ích khi muốn vứt bỏ nhánh code thử nghiệm thất bại.\n- `git push origin --delete <nhánh>`: Xóa con trỏ nhánh tương ứng trên máy chủ từ xa GitHub.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố gắng xóa nhánh hiện tại**:  Phải switch sang nhánh khác trước khi xóa.\n2. **Sợ mất code khi xóa nhánh đã merge**:  Nhánh đã merge thì toàn bộ commit đã nằm trong main, xóa con trỏ nhánh con không làm mất một dòng code nào.\n3. **Đổi tên nhánh cục bộ nhưng quên cập nhật trên GitHub**:  Khiến nhánh trên máy và nhánh trên remote bị lệch tên nhau.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh tạm `temp-name` bằng `git branch temp-name`.\n2. Đổi tên nhánh thành `proper-feature` bằng `git branch -m temp-name proper-feature`.\n3. Kiểm tra lại bằng `git branch` để thấy tên mới.\n4. Xóa nhánh đó bằng `git branch -d proper-feature`.\n\n---\n\n## 💡 Hint\n> Nhớ quy tắc: `-d` là xóa an toàn (delete), `-m` là đổi tên (move).\n\n---\n\n## ✅ Validation\n- Thực hiện đổi tên và xóa nhánh thành công, xác nhận qua `git branch`.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng đổi tên và xóa nhánh an toàn.\n\n---\n\n## 🔥 Challenge\nNêu cách phục hồi một nhánh vô tình bị xóa bằng cờ `-D` thông qua câu lệnh `git reflog`.\n\n---\n\n## 📚 Tổng kết\n- Xóa nhánh chỉ là xóa con trỏ 41 byte, commit đã merge luôn nằm an toàn trong main.\n- Đổi tên nhánh nhanh chóng bằng cờ `-m`, xóa nhánh an toàn bằng cờ `-d`.\n- Dọn dẹp nhánh thường xuyên là thói quen chuyên nghiệp của kỹ sư phần mềm.\n",
  "quiz": {
    "id": "quiz-03-13-delete-rename-branch",
    "title": "Trắc nghiệm: Xóa và đổi tên nhánh an toàn",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào sau đây dùng để đổi tên nhánh bạn đang đứng trực tiếp thành `feat/payment`?",
        "type": "single",
        "options": [
          {
            "text": "git branch -m feat/payment",
            "correct": true
          },
          {
            "text": "git branch --new-id feat/payment",
            "correct": false
          },
          {
            "text": "git rename feat/payment",
            "correct": false
          },
          {
            "text": "git switch --rename feat/payment",
            "correct": false
          }
        ],
        "explanation": "`git branch -m <new-name>` đổi tên nhánh hiện tại sang tên mới."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh `git branch -d feature` trên một nhánh đã được merge vào main, điều gì thực sự bị xóa?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ có tệp con trỏ tham chiếu 41 byte chứa tên nhánh bị xóa, toàn bộ commit vẫn nằm an toàn trong nhánh main",
            "correct": true
          },
          {
            "text": "Toàn bộ các dòng code bạn đã viết trong nhánh feature sẽ bị xóa sạch khỏi ổ cứng",
            "correct": false
          },
          {
            "text": "Nhánh main sẽ bị xóa theo",
            "correct": false
          },
          {
            "text": "Tài khoản GitHub của bạn sẽ bị đóng băng",
            "correct": false
          }
        ],
        "explanation": "Branch chỉ là con trỏ; khi đã merge thì commit đã thuộc về main, xóa branch chỉ gỡ con trỏ phụ."
      },
      {
        "id": "q3",
        "question": "Lệnh nào dùng để xóa một nhánh có tên là `old-feature` trên máy chủ từ xa GitHub?",
        "type": "single",
        "options": [
          {
            "text": "git push origin --delete old-feature",
            "correct": true
          },
          {
            "text": "git remote delete old-feature",
            "correct": false
          },
          {
            "text": "git delete-server old-feature",
            "correct": false
          },
          {
            "text": "git drop remote old-feature",
            "correct": false
          }
        ],
        "explanation": "`git push origin --delete <branch>` gửi chỉ thị xóa con trỏ nhánh trên máy chủ remote."
      },
      {
        "id": "q4",
        "question": "Trong trường hợp nào Git sẽ kiên quyết từ chối lệnh xóa nhánh an toàn `git branch -d`?",
        "type": "single",
        "options": [
          {
            "text": "Khi nhánh đó chứa các commit mới chưa từng được hợp nhất (merge) vào bất kỳ nhánh nào khác",
            "correct": true
          },
          {
            "text": "Khi máy tính bị mất kết nối mạng cáp quang",
            "correct": false
          },
          {
            "text": "Khi tên nhánh có chứa dấu gạch nối",
            "correct": false
          },
          {
            "text": "Khi nhánh đó có dung lượng nhỏ hơn 1 kilobyte",
            "correct": false
          }
        ],
        "explanation": "`-d` có cơ chế bảo vệ ngăn chặn việc vô tình xóa mất commit chưa được hợp nhất."
      },
      {
        "id": "q5",
        "question": "Để đổi tên một nhánh khác (ví dụ: đổi nhánh `dev` thành `develop`) mà không cần switch sang nhánh đó, bạn dùng cú pháp nào?",
        "type": "single",
        "options": [
          {
            "text": "git branch -m dev develop",
            "correct": true
          },
          {
            "text": "git rename-remote dev develop",
            "correct": false
          },
          {
            "text": "git switch --move dev develop",
            "correct": false
          },
          {
            "text": "git checkout dev --rename develop",
            "correct": false
          }
        ],
        "explanation": "`git branch -m <tên-cũ> <tên-mới>` cho phép đổi tên nhánh bất kỳ ngay cả khi không đứng trên nhánh đó."
      },
      {
        "id": "q6",
        "question": "Nếu bạn vô tình xóa nhầm một nhánh chưa merge bằng lệnh `git branch -D`, công cụ nào giúp bạn tìm lại mã SHA của commit để khôi phục?",
        "type": "single",
        "options": [
          {
            "text": "git reflog",
            "correct": true
          },
          {
            "text": "Thùng rác Recycle Bin của hệ điều hành",
            "correct": false
          },
          {
            "text": "Trình duyệt Google Chrome",
            "correct": false
          },
          {
            "text": "Lệnh ping mạng Internet",
            "correct": false
          }
        ],
        "explanation": "`git reflog` ghi lại mọi chuyển dịch của HEAD; bạn có thể tra cứu mã commit đỉnh của nhánh bị xóa để tái tạo lại."
      }
    ]
  }
};
export default lesson;
