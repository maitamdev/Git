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
  "content": "# Xóa và đổi tên nhánh an toàn\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững kỹ thuật dọn dẹp và bảo trì hệ thống nhánh sau khi hoàn tất tính năng.\n- Sử dụng thành thạo cú pháp đổi tên nhánh bằng cờ `-m`.\n- Phân biệt rõ ràng giữa xóa an toàn với cờ `-d` và xóa cưỡng chế với cờ `-D`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git branch -m — đổi tên nhánh\n- **Nói dễ hiểu:** Lệnh thay đổi tên nhánh sang tên mới rõ nghĩa và đúng quy ước của nhóm hơn.\n- **Ví dụ:** Chạy `git branch -m feat-cart feature-cart` để chuẩn hóa tên nhánh trước khi nộp bài.\n- **Đừng nhầm:** Đổi tên nhánh chỉ đổi nhãn con trỏ; toàn bộ commit và lịch sử bên trong nhánh vẫn giữ nguyên vẹn.\n\n### git branch -d vs -D — xóa an toàn và cưỡng chế\n- **Nói dễ hiểu:** Cờ `-d` chỉ cho phép xóa khi nhánh đã được gộp; cờ `-D` ép xóa ngay cả khi code chưa gộp.\n- **Ví dụ:** Dùng `-d` để dọn nhánh đã merge vào `main`; dùng `-D` để vứt bỏ hoàn toàn nhánh thử nghiệm hỏng.\n- **Đừng nhầm:** Xóa một nhánh đã gộp bằng `-d` không làm mất code; toàn bộ commit đã nằm chắc chắn trong nhánh chính.\n\n### git push origin --delete — xóa nhánh trên máy chủ\n- **Nói dễ hiểu:** Lệnh gửi yêu cầu lên GitHub để xóa con trỏ nhánh tương ứng trên kho chứa từ xa.\n- **Ví dụ:** Sau khi tính năng được merge trên GitHub, chạy `git push origin --delete feature-cart` để dọn dẹp.\n- **Đừng nhầm:** Xóa nhánh ở máy tính cá nhân không tự làm mất nhánh trên GitHub; bạn phải chạy thêm lệnh này.\n\n---\n\n## 📖 Định nghĩa\nXóa và đổi tên nhánh là các thao tác bảo trì cần thiết để giữ kho lưu trữ Git luôn gọn gàng và dễ theo dõi. Thao tác xóa nhánh trong Git chỉ đơn thuần là gỡ bỏ một nhãn con trỏ có tên, trong khi các commit đã được gộp vẫn nằm an toàn trong lịch sử nhánh chính.\n\n---\n\n## 🤔 Tại sao cần?\nKhi làm việc lâu dài, việc đặt nhầm tên nhánh hoặc gõ sai chính tả rất thường xảy ra. Đổi tên nhánh giúp chuẩn hóa tên trước khi gửi cho đồng đội. Đồng thời, chủ động xóa các nhánh đã hoàn thành giúp danh sách nhánh luôn ngắn gọn, tránh việc chọn nhầm các nhánh cũ đã lỗi thời.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung các con trỏ nhánh giống như những chiếc thẻ đánh dấu trang kẹp vào cuốn sách. Khi bạn đọc xong một chương và đã hiểu hết nội dung (đã merge), bạn rút chiếc thẻ đánh dấu đó ra cất đi (xóa nhánh) để cuốn sách không bị vướng víu. Các trang sách và nội dung chữ (các commit) vẫn nằm nguyên vẹn trong gáy cuốn sách.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế gỡ bỏ nhãn con trỏ (Xóa nhánh):\nTrước khi xóa:\nmain ───────────> Commit C3\nfeature-cart ───> Commit C3 (Trỏ cùng commit C3)\n\nSau khi chạy: git branch -d feature-cart\nmain ───────────> Commit C3\n(Chỉ có con trỏ feature-cart bị gỡ bỏ, Commit C3 vẫn an toàn 100%)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn Long hoàn tất việc gộp nhánh `feature-auth` vào nhánh `main` của dự án công ty. Khi gõ `git branch`, Long thấy nhánh cũ vẫn còn hiển thị. Long chuyển về `main` bằng `git switch main` rồi chạy `git branch -d feature-auth`. Git kiểm tra thấy toàn bộ commit đã nằm trong `main` nên báo xóa thành công. Danh sách nhánh của Long giờ chỉ còn lại `main` sạch sẽ.\n\n---\n\n## 💻 Command\n```bash\ngit branch -m <tên-mới>\ngit branch -m <tên-cũ> <tên-mới>\ngit branch -d <tên-nhánh>\ngit branch -D <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch -m <tên-mới>`: Đổi tên nhánh hiện tại bạn đang đứng sang tên mới.\n- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên một nhánh bất kỳ mà không cần phải chuyển sang nhánh đó.\n- `git branch -d <tên-nhánh>`: Xóa nhánh có kiểm tra an toàn (chỉ xóa nếu nhánh đã được merge).\n- `git branch -D <tên-nhánh>`: Ép buộc xóa nhánh ngay lập tức, bỏ qua kiểm tra an toàn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố xóa nhánh mình đang đứng:** Git sẽ từ chối; bạn phải chuyển sang nhánh khác như `main` rồi mới xóa được.\n2. **Sợ mất code khi xóa nhánh đã merge:** Toàn bộ commit đã nằm trong nhánh chính, việc xóa nhánh con không làm mất dòng code nào.\n3. **Đổi tên ở máy cá nhân nhưng quên cập nhật trên GitHub:** Dễ khiến nhánh trên máy và nhánh trên máy chủ bị lệch tên nhau.\n\n---\n\n## 🧪 Lab\nBài học này là bài tự kiểm tra thao tác đổi tên và xóa nhánh trên máy của bạn:\n1. Tạo một nhánh tạm bằng lệnh `git branch temp-name`.\n2. Đổi tên nhánh thành `proper-feature` bằng `git branch -m temp-name proper-feature`.\n3. Kiểm tra lại bằng `git branch` để thấy tên mới xuất hiện.\n4. Xóa nhánh đó bằng lệnh `git branch -d proper-feature`.\n\n---\n\n## 💡 Hint\nNhớ quy tắc chữ cái: `-d` là xóa an toàn (delete), `-m` là đổi tên (move/rename).\n\n---\n\n## ✅ Validation\n- Nhánh tạm được đổi tên và sau đó xóa thành công.\n- Lệnh `git branch` xác nhận nhánh phụ đã được dọn sạch khỏi danh sách.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để nắm vững các kỹ thuật đổi tên và xóa nhánh an toàn trong Git.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cách khôi phục lại một commit bị xóa nhầm bằng cờ `-D` thông qua việc tra cứu lịch sử đầu đọc bằng lệnh `git reflog`.\n\n---\n\n## 📚 Tổng kết\n- Xóa nhánh chỉ là gỡ bỏ nhãn con trỏ; các commit đã merge luôn nằm an toàn trong nhánh chính.\n- Dùng cờ `-m` để đổi tên nhánh và cờ `-d` để xóa nhánh an toàn sau khi hoàn tất công việc.\n- Thường xuyên dọn dẹp các nhánh cũ giúp kho lưu trữ luôn sạch sẽ và chuyên nghiệp.\n",
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
