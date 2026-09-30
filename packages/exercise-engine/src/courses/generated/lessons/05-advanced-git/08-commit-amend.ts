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
  "content": "# git commit --amend\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cơ chế hoạt động của cờ `--amend` trong câu lệnh `git commit`.\n- Sử dụng `--amend` để sửa đổi thông điệp của commit gần nhất một cách nhanh chóng.\n- Bổ sung các tệp tin hoặc dòng code bị bỏ quên vào commit gần nhất mà không sinh ra commit mới.\n- Nhận thức rõ bản chất: `--amend` tạo ra một commit hash mới thay thế commit cũ (viết lại lịch sử).\n\n---\n\n## 📖 Định nghĩa\n> `git commit --amend` là câu lệnh tiện ích chuyên dụng trong Git cho phép bạn chỉnh sửa và cập nhật trực tiếp vào commit snapshot gần đây nhất trên nhánh hiện tại. Khi thực thi câu lệnh này, Git sẽ kết hợp toàn bộ các thay đổi đang nằm trong Staging Area với nội dung của commit trước đó, mở trình soạn thảo để bạn cập nhật lại thông điệp commit (nếu muốn) và tạo ra một commit mới hoàn toàn thay thế cho commit cũ.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thực tế, tình huống bạn vừa ấn commit xong thì mới sực nhớ ra mình quên chưa lưu một tệp định dạng, hoặc phát hiện tiêu đề commit bị gõ sai chính tả xảy ra gần như hàng ngày. Nếu tạo thêm một commit con chỉ để sửa lỗi chính tả hay thêm một dòng code, cây lịch sử của bạn sẽ trở nên nhếch nhác và nghiệp dư. `git commit --amend` giúp bạn giữ cho lịch sử dự án luôn sạch sẽ, sắc nét và chuyên nghiệp nhất.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn vừa chụp một bức ảnh kỷ yếu tập thể và in ra một bức ảnh mẫu (commit). Khi nhìn kỹ bức ảnh, bạn phát hiện một bạn ở góc áo bị lệch vạt. Thay vì dán thêm một bức ảnh nhỏ xíu chụp riêng vạt áo đè lên trên cuốn album, bạn mời bạn đó chỉnh lại áo ngay ngắn và chụp đè lại một bức ảnh hoàn hảo khác thay thế tấm ảnh lỗi vào đúng trang album đó (`git commit --amend`). Người xem album chỉ thấy duy nhất một bức ảnh hoàn mỹ.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBản chất của git commit --amend:\nTrước khi amend:\nC1 ──► C2 (Commit có thông điệp sai hoặc thiếu tệp) [HEAD]\n\nSau khi sửa tệp, git add và git commit --amend:\nC1 ──► C3 (Commit mới hoàn hảo, thay thế hoàn toàn C2) [HEAD]\n(C2 bị tách rời và sẽ được dọn rác)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Trung vừa thực hiện commit tính năng đăng nhập với thông điệp: \"feat: logn system\" (bị gõ sai chính tả chữ login) và quên chưa thêm tệp icon `favicon.ico` vào dự án. Trung không hề bối rối tạo commit mới gây rác lịch sử. Trung đưa tệp icon vào staging bằng lệnh `git add favicon.ico`, sau đó gõ câu lệnh: `git commit --amend -m \"feat: login system\"`. Git lập tức gom tệp icon vào cùng với các tệp trước đó, sửa lại tiêu đề commit cho chuẩn xác và thay thế commit cũ bằng một commit mới tinh gọn, giữ cho cây lịch sử của nhánh luôn ở trạng thái sạch sẽ và chuyên nghiệp nhất.\n\n---\n\n## 💻 Command\n```bash\ngit commit --amend\ngit commit --amend -m \"<thông-điệp-mới>\"\ngit commit --amend --no-edit\n```\n\n---\n\n## 🔍 Giải thích command\n- `git commit --amend`: Mở trình soạn thảo văn bản để bạn cập nhật thông điệp hoặc gộp các tệp đã staged vào commit gần nhất.\n- `git commit --amend -m \"<msg>\"`: Sửa trực tiếp thông điệp commit ngay trên dòng lệnh mà không cần mở editor.\n- `git commit --amend --no-edit`: Thêm các tệp đã staged vào commit gần nhất mà giữ nguyên thông điệp cũ không thay đổi.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy commit amend sau khi đã push commit đó lên GitHub**:  Khiến commit trên máy và commit trên server có mã hash khác nhau, dẫn đến bị từ chối push.\n2. **Tưởng rằng amend sửa trực tiếp trên commit cũ**:  Thực chất Git tạo ra commit mới với mã SHA-1 mới hoàn toàn.\n3. **Quên git add tệp cần bổ sung trước khi chạy `git commit --amend --no-edit`.**: Quên git add tệp cần bổ sung trước khi chạy `git commit --amend --no-edit`.\n\n---\n\n## 🧪 Lab\n1. Tạo một commit với thông điệp sai chính tả `initail commit`.\n2. Chạy lệnh `git commit --amend -m \"initial commit\"` để sửa lỗi chính tả.\n3. Tạo một tệp mới `extra.txt`, chạy `git add extra.txt`.\n4. Chạy `git commit --amend --no-edit` để gộp tệp vào commit đó mà không đổi thông điệp.\n5. Dùng `git log -n 1 --stat` để kiểm tra kết quả hoàn hảo.\n\n---\n\n## 💡 Hint\n> Dùng cờ `--no-edit` khi bạn chỉ muốn bổ sung tệp vào commit gần nhất mà không muốn đổi thông điệp.\n\n---\n\n## ✅ Validation\n- Sửa đổi thành công thông điệp và bổ sung tệp vào commit gần nhất bằng cờ --amend.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh tiện ích git commit --amend.\n\n---\n\n## 🔥 Challenge\nTại sao mã hash của commit luôn luôn bị thay đổi sau khi bạn chạy lệnh `git commit --amend`?\n\n---\n\n## 📚 Tổng kết\n- `git commit --amend` cập nhật commit gần nhất bằng cách gộp các tệp đã staged hoặc sửa message.\n- Cờ `--no-edit` giúp bổ sung tệp mà không làm thay đổi thông điệp commit sẵn có.\n- Chỉ nên sử dụng amend cho các commit cục bộ cá nhân chưa từng push lên nhánh dùng chung.\n",
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
