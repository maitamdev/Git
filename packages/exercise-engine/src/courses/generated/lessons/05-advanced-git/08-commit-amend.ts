import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-commit-amend",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "08-commit-amend",
    "title": "git commit --amend",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-undo-restore-reset-revert"
    ],
    "objectives": [
      "Hiểu rõ cơ chế hoạt động của cờ `--amend` trong câu lệnh `git commit`.",
      "Sử dụng `--amend` để sửa đổi thông điệp của commit gần nhất một cách nhanh chóng.",
      "Bổ sung các tệp tin hoặc dòng code bị bỏ quên vào commit gần nhất mà không sinh ra commit mới.",
      "Nhận thức rõ bản chất: `--amend` tạo ra một commit hash mới thay thế commit cũ (viết lại lịch sử)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "commit amend",
      "amend commit",
      "sua commit gan nhat",
      "bo sung commit",
      "sua message",
      "replace commit"
    ],
    "commands": [
      "git commit --amend",
      "git commit --amend -m \"<thông-điệp-mới>\"",
      "git commit --amend --no-edit"
    ]
  },
  "content": "# git commit --amend\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cơ chế hoạt động của cờ `--amend` trong câu lệnh `git commit`.\n- Sử dụng `--amend` để sửa đổi thông điệp của commit gần nhất một cách nhanh chóng.\n- Bổ sung các tệp tin hoặc dòng code bị bỏ quên vào commit gần nhất mà không sinh ra commit mới.\n- Nhận thức rõ bản chất: `--amend` tạo ra một commit hash mới thay thế commit cũ (viết lại lịch sử).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git commit --amend\n- **Nói dễ hiểu**: Lệnh sửa lại commit gần nhất bằng cách gộp thêm các file trong Staging hoặc đổi thông điệp commit.\n- **Ví dụ**: `git commit --amend -m \"feat: login system\"` để sửa lại lỗi chính tả của commit vừa tạo.\n- **Đừng nhầm**: Không chỉnh sửa trực tiếp trên commit cũ; Git tạo ra một commit mới tinh có mã hash mới thay thế commit cũ.\n\n### --no-edit\n- **Nói dễ hiểu**: Tùy chọn đi kèm amend để bổ sung file mới vào commit gần nhất mà giữ nguyên thông điệp cũ.\n- **Ví dụ**: `git add icon.png && git commit --amend --no-edit` để kẹp thêm file ảnh vào commit vừa tạo.\n- **Đừng nhầm**: Vẫn tạo ra commit hash mới dù nội dung thông điệp không hề thay đổi.\n\n### rewriting recent commit\n- **Nói dễ hiểu**: Thao tác viết lại lịch sử commit gần nhất của bạn trên máy tính cá nhân.\n- **Ví dụ**: Đổi tên tác giả, ngày giờ, thông điệp hoặc nội dung file của commit đỉnh nhánh.\n- **Đừng nhầm**: Chỉ thực hiện trên commit cục bộ chưa push; nếu đã push lên server sẽ bị từ chối khi push tiếp theo.\n\n---\n\n## 📖 Định nghĩa\n`git commit --amend` là câu lệnh tiện ích chuyên dụng trong Git cho phép bạn chỉnh sửa và cập nhật trực tiếp vào commit gần đây nhất trên nhánh hiện tại. Khi chạy, Git kết hợp toàn bộ các thay đổi trong Staging Area với nội dung của commit trước đó, cho phép cập nhật thông điệp và tạo một commit mới thay thế commit cũ.\n\n---\n\n## 🤔 Tại sao cần?\nKhi vừa commit xong, bạn thường sực nhớ ra quên lưu một file cấu hình hoặc thấy commit message bị sai chính tả. Nếu tạo thêm một commit chỉ để sửa lỗi chính tả hay thêm một dòng code, cây lịch sử sẽ bị vụn vặt và thiếu chuyên nghiệp. `git commit --amend` giúp lịch sử dự án luôn sạch sẽ và chỉn chu.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn vừa in một tấm ảnh kỷ yếu tập thể (commit). Khi nhìn kỹ, bạn phát hiện một người bị lệch vạt áo. Thay vì chụp thêm bức ảnh nhỏ xíu riêng vạt áo dán đè lên album, bạn mời người đó chỉnh lại áo rồi chụp một tấm ảnh hoàn hảo mới thay thế tấm cũ vào đúng trang album đó (`--amend`). Người xem chỉ thấy một bức ảnh hoàn mỹ.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBản chất của git commit --amend:\nTrước khi amend:\nC1 ──► C2 (Commit có thông điệp sai hoặc thiếu tệp) [HEAD]\n\nSau khi sửa tệp, git add và git commit --amend:\nC1 ──► C3 (Commit mới hoàn hảo, thay thế hoàn toàn C2) [HEAD]\n(C2 bị tách rời và sẽ được dọn rác)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Trung vừa commit tính năng đăng nhập với thông điệp sai chính tả: \"feat: logn system\" và quên chưa thêm file `favicon.ico`. Trung không tạo commit vá vụn vặt mà đưa icon vào staging bằng `git add favicon.ico`, rồi gõ `git commit --amend -m \"feat: login system\"`. Git gom file icon vào chung và cập nhật tiêu đề chuẩn xác, giữ cho cây lịch sử nhánh luôn tinh gọn.\n\n---\n\n## 💻 Command\n```bash\ngit commit --amend\ngit commit --amend -m \"<thông-điệp-mới>\"\ngit commit --amend --no-edit\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit --amend`: Mở trình soạn thảo văn bản để bạn cập nhật thông điệp hoặc gộp các tệp đã staged vào commit gần nhất.\n- `git commit --amend -m \"<msg>\"`: Sửa trực tiếp thông điệp commit ngay trên dòng lệnh mà không cần mở editor.\n- `git commit --amend --no-edit`: Thêm các tệp đã staged vào commit gần nhất mà giữ nguyên thông điệp cũ không thay đổi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Amend commit mà người khác đã dựa vào**: `amend` tạo commit mới; remote có thể từ chối lần push thường vì lịch sử đã khác. Hãy phối hợp với nhóm trước khi cập nhật nhánh từ xa.\n2. **Nghĩ rằng amend sửa trực tiếp trên commit cũ**: Thực chất Git tạo ra một commit snapshot mới với mã SHA hoàn toàn mới.\n3. **Quên git add file cần bổ sung trước khi amend**: Khiến commit mới tạo ra vẫn thiếu file mà bạn mong muốn kẹp thêm vào.\n\n---\n\n## 🧪 Lab\nCùng tôi thực hành kỹ thuật sửa sai nhanh cho commit gần nhất bằng cờ --amend mà không làm rác lịch sử:\n1. Tạo một commit với thông điệp sai chính tả `initail commit`.\n2. Chạy lệnh `git commit --amend -m \"initial commit\"` để sửa lỗi chính tả.\n3. Tạo một tệp mới `extra.txt`, chạy `git add extra.txt`.\n4. Chạy `git commit --amend --no-edit` để gộp tệp vào commit đó mà không đổi thông điệp.\n5. Dùng `git log -n 1 --stat` để kiểm tra kết quả hoàn hảo.\n\n---\n\n## 💡 Hint\n> Dùng cờ `--no-edit` khi bạn chỉ muốn bổ sung tệp vào commit gần nhất mà không muốn đổi thông điệp.\n\n---\n\n## ✅ Validation\n- Mã SHA hash của commit gần nhất được làm mới.\n- Thông điệp commit được cập nhật chuẩn xác và tệp bổ sung nằm trọn vẹn trong commit đó.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh tiện ích git commit --amend.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cách sử dụng cờ `--reset-author` trong lệnh amend khi bạn muốn cập nhật thông tin tác giả và thời gian commit sang mốc hiện tại.\n\n---\n\n## 📚 Tổng kết\n- `git commit --amend` cập nhật commit gần nhất bằng cách gộp các tệp đã staged hoặc sửa message.\n- Cờ `--no-edit` giúp bổ sung tệp mà không làm thay đổi thông điệp commit sẵn có.\n- Chỉ nên sử dụng amend cho các commit cục bộ cá nhân chưa từng push lên nhánh dùng chung.\n",
  "quiz": {
    "id": "quiz-05-08-commit-amend",
    "title": "Trắc nghiệm: git commit --amend",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích chính của câu lệnh `git commit --amend` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉnh sửa thông điệp hoặc bổ sung tệp tin vào commit gần đây nhất trên nhánh hiện tại",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ các commit trong dự án",
            "correct": false
          },
          {
            "text": "Tạo một nhánh mới từ commit đầu tiên",
            "correct": false
          },
          {
            "text": "Đẩy code trực tiếp lên máy chủ mà không cần mạng",
            "correct": false
          }
        ],
        "explanation": "`git commit --amend` cho phép cập nhật commit snapshot gần nhất một cách nhanh chóng."
      },
      {
        "id": "q2",
        "question": "Cờ `--no-edit` trong lệnh `git commit --amend --no-edit` có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Gộp các thay đổi đã staged vào commit gần nhất mà giữ nguyên thông điệp commit cũ, không mở trình soạn thảo",
            "correct": true
          },
          {
            "text": "Cấm không cho phép chỉnh sửa mã nguồn của dự án nữa",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ thông điệp commit trở thành chuỗi rỗng",
            "correct": false
          },
          {
            "text": "Khóa tệp tin ở chế độ chỉ đọc",
            "correct": false
          }
        ],
        "explanation": "`--no-edit` giúp bạn thêm nhanh các tệp bị sót vào commit trước mà không cần nhập lại message."
      },
      {
        "id": "q3",
        "question": "Điều gì xảy ra với mã băm nhận dạng SHA-1 của commit sau khi bạn thực hiện `git commit --amend`?",
        "type": "single",
        "options": [
          {
            "text": "Mã băm SHA-1 luôn luôn bị thay đổi vì nội dung hoặc thông tin commit đã thay đổi (sinh ra commit mới)",
            "correct": true
          },
          {
            "text": "Mã băm SHA-1 được giữ nguyên hoàn toàn 100%",
            "correct": false
          },
          {
            "text": "Mã băm biến thành một chuỗi số 0",
            "correct": false
          },
          {
            "text": "Git không còn sử dụng mã băm nữa",
            "correct": false
          }
        ],
        "explanation": "Vì mã SHA-1 được tính toán từ nội dung và metadata, bất kỳ thay đổi nào cũng tạo ra một mã hash mới."
      },
      {
        "id": "q4",
        "question": "Quy tắc an toàn quan trọng nhất khi sử dụng `git commit --amend` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ nên dùng cho các commit cục bộ chưa push lên nhánh công khai dùng chung của nhóm",
            "correct": true
          },
          {
            "text": "Chỉ được dùng vào các ngày chẵn trong tuần",
            "correct": false
          },
          {
            "text": "Bắt buộc phải tắt máy tính sau khi chạy lệnh",
            "correct": false
          },
          {
            "text": "Không được phép dùng khi dự án có hơn 10 dòng code",
            "correct": false
          }
        ],
        "explanation": "Amend thay đổi mã hash của commit; nếu đã push lên server thì việc amend sẽ dẫn đến xung đột khi push lại."
      },
      {
        "id": "q5",
        "question": "Để bổ sung một tệp tin `style.css` vừa sửa vào commit gần nhất bằng amend, quy trình chuẩn gồm những bước nào?",
        "type": "single",
        "options": [
          {
            "text": "git add style.css -> git commit --amend --no-edit",
            "correct": true
          },
          {
            "text": "git commit --amend style.css -> git push",
            "correct": false
          },
          {
            "text": "git reset style.css -> git commit",
            "correct": false
          },
          {
            "text": "git restore style.css -> git commit --amend",
            "correct": false
          }
        ],
        "explanation": "Bạn phải đưa tệp vào Staging Area trước (`git add`), sau đó mới gọi commit amend để gộp vào."
      },
      {
        "id": "q6",
        "question": "Nếu bạn đã lỡ push một commit lên remote branch và sau đó chạy `git commit --amend` ở local, điều gì sẽ xảy ra ở lần push tiếp theo?",
        "type": "single",
        "options": [
          {
            "text": "Lệnh push bị từ chối [rejected] vì lịch sử đã bị phân kỳ do mã hash thay đổi",
            "correct": true
          },
          {
            "text": "Máy chủ tự động gộp commit cũ và mới một cách êm đẹp",
            "correct": false
          },
          {
            "text": "Toàn bộ máy chủ GitHub sẽ bị xóa trắng",
            "correct": false
          },
          {
            "text": "Tài khoản của bạn tự động được nâng cấp lên VIP",
            "correct": false
          }
        ],
        "explanation": "Commit hash thay đổi khiến nhánh local và remote bị lệch nhau, Git sẽ từ chối push non-fast-forward."
      }
    ]
  }
};
export default lesson;
