import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-git-cherry-pick",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "10-git-cherry-pick",
    "title": "git cherry-pick",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "07-reflog-recovery"
    ],
    "objectives": [
      "Hiểu rõ bản chất hoạt động của `git cherry-pick`: sao chép một commit cụ thể từ nhánh này sang nhánh khác.",
      "Sử dụng cherry-pick để đưa các bản vá lỗi cấp bách (hotfix) từ nhánh thử nghiệm sang nhánh production.",
      "Phân biệt rõ ràng giữa việc merge toàn bộ nhánh và việc chọn lọc từng commit đơn lẻ.",
      "Xử lý mâu thuẫn xung đột (conflict) phát sinh trong quá trình cherry-pick commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "cherry pick",
      "git cherry-pick",
      "nhat commit",
      "boc commit",
      "hotfix porting",
      "selective commit"
    ],
    "commands": [
      "git cherry-pick <commit-hash>",
      "git cherry-pick <hash-1> <hash-2>",
      "git cherry-pick <hash-start>..<hash-end>",
      "git cherry-pick -n <commit-hash>",
      "git cherry-pick --continue",
      "git cherry-pick --abort"
    ]
  },
  "content": "# git cherry-pick\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất hoạt động của `git cherry-pick`: sao chép một commit cụ thể từ nhánh này sang nhánh khác.\n- Sử dụng cherry-pick để đưa các bản vá lỗi cấp bách (hotfix) từ nhánh thử nghiệm sang nhánh production.\n- Phân biệt rõ ràng giữa việc merge toàn bộ nhánh và việc chọn lọc từng commit đơn lẻ.\n- Xử lý mâu thuẫn xung đột (conflict) phát sinh trong quá trình cherry-pick commit.\n\n---\n\n## 📖 Định nghĩa\n> `git cherry-pick <commit-hash>` là câu lệnh trích xuất và sao chép chọn lọc vô cùng linh hoạt trong Git, cho phép bạn lựa chọn duy nhất một (hoặc một dải) commit cụ thể từ một nhánh bất kỳ trong lịch sử và sao chép chính xác những thay đổi của commit đó để áp dụng thành một commit mới trên đỉnh của nhánh hiện tại bạn đang đứng. Đây là phương thức phẫu thuật mã nguồn tinh vi mà không cần phải gộp (merge) toàn bộ cả nhánh dở dang.\n\n---\n\n## 🤔 Tại sao cần?\nHãy tưởng tượng bạn đang phát triển một nhánh tính năng lớn gồm 20 commit dở dang và chưa sẵn sàng phát hành. Đột nhiên bạn phát hiện ra trong 20 commit đó có commit số 5 chứa một bản sửa lỗi bảo mật cực kỳ xuất sắc mà môi trường production đang rất cần ngay lập tức. Bạn không thể merge cả nhánh vì sẽ kéo theo 19 commit lỗi chưa hoàn thiện. `git cherry-pick` chính là chiếc gắp y tế: bạn chỉ việc gắp đúng commit số 5 đó đưa sang nhánh main để phát hành ngay.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một chiếc bánh gato lớn phủ đầy những quả cherry ngọt ngào và các lớp kem đang làm dở. Bạn không muốn ăn cả chiếc bánh chưa nướng chín. Bạn chỉ dùng chiếc nĩa cẩn thận gắp đúng một quả cherry ngon lành nhất trên mặt bánh đưa sang chiếc đĩa ăn tráng miệng của bạn (`git cherry-pick`). Chiếc đĩa của bạn có thêm một quả cherry tuyệt ngon, trong khi chiếc bánh lớn vẫn ở nguyên vị trí của nó.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế gắp commit của git cherry-pick:\nNhánh feature:   C1 ──► C2 ──► C3 (Bản vá quan trọng!) ──► C4\nNhánh main:      M1 ──► M2\n\nĐứng tại main và chạy: git cherry-pick C3\nNhánh main:      M1 ──► M2 ──► C3' (Commit mới chứa nội dung của C3)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Long đang làm việc trên nhánh `experimental-auth` và tạo commit `b4c5d6e` sửa lỗi rò rỉ bộ nhớ nghiêm trọng của máy chủ. Trong khi đó, nhánh chính `main` đang chuẩn bị đóng gói phát hành phiên bản mới cho khách hàng. Long chuyển sang nhánh main bằng câu lệnh `git switch main`, sau đó thực thi lệnh: `git cherry-pick b4c5d6e`. Git lập tức đọc diff của commit đó, áp dụng vào mã nguồn của nhánh main và tự động tạo commit mới mang cùng thông điệp. Đội ngũ kiểm thử xác nhận lỗi bộ nhớ được khắc phục hoàn toàn trên main mà không hề bị kéo theo bất kỳ đoạn mã thử nghiệm chưa hoàn thiện nào.\n\n---\n\n## 💻 Command\n```bash\ngit cherry-pick <commit-hash>\ngit cherry-pick <hash-1> <hash-2>\ngit cherry-pick <hash-start>..<hash-end>\ngit cherry-pick -n <commit-hash>\ngit cherry-pick --continue\ngit cherry-pick --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git cherry-pick <hash>`: Sao chép commit chỉ định và tạo commit mới trên nhánh hiện tại.\n- `git cherry-pick <h1..h2>`: Sao chép một dải các commit liên tiếp sang nhánh hiện tại.\n- `git cherry-pick -n <hash>`: Gắp thay đổi vào Staging/Working Tree mà chưa tự động commit (`--no-commit`).\n- `git cherry-pick --continue`: Tiếp tục quá trình gắp commit sau khi đã giải quyết xong xung đột.\n- `git cherry-pick --abort`: Hủy bỏ hoàn toàn thao tác gắp commit và đưa nhánh về trạng thái ban đầu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cherry-pick bừa bãi quá nhiều commit**:  Dẫn đến tình trạng trùng lặp commit (duplicate commits) gây rắc rối khi merge nhánh sau này.\n2. **Quên rằng cherry-pick tạo ra mã SHA-1 mới**:  Dù nội dung giống nhau nhưng commit mới trên nhánh hiện tại có mã hash khác với commit gốc.\n3. **Bối rối khi gặp conflict**:  Tương tự như merge, cần mở file giải quyết xung đột, `git add` và gõ `git cherry-pick --continue`.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh `feature-patch` và commit một bản sửa lỗi nhỏ.\n2. Chuyển về nhánh `main` và lấy mã hash của commit vừa tạo.\n3. Thực hiện `git cherry-pick <commit-hash>` trên nhánh `main`.\n4. Kiểm tra `git log --oneline` trên main để xác nhận commit đã được sao chép thành công.\n\n---\n\n## 💡 Hint\n> Nếu gặp xung đột khi cherry-pick, giải quyết xong thì dùng `git cherry-pick --continue` chứ không dùng git commit.\n\n---\n\n## ✅ Validation\n- Sao chép thành công một commit chỉ định sang nhánh khác bằng câu lệnh git cherry-pick.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh chọn lọc git cherry-pick.\n\n---\n\n## 🔥 Challenge\nNêu những hệ quả tiêu cực tiềm ẩn đối với lịch sử Git nếu một nhóm lập trình viên lạm dụng cherry-pick thay vì merge.\n\n---\n\n## 📚 Tổng kết\n- `git cherry-pick` sao chép một commit cụ thể từ nhánh khác và áp dụng lên nhánh hiện tại.\n- Tạo ra commit mới có nội dung tương tự nhưng mã băm SHA-1 khác biệt.\n- Cực kỳ hữu ích để đưa các bản vá khẩn cấp (hotfix) sang nhánh release hoặc main.\n",
  "quiz": {
    "id": "quiz-05-10-git-cherry-pick",
    "title": "Trắc nghiệm: git cherry-pick",
    "questions": [
      {
        "id": "q1",
        "question": "Chức năng cốt lõi của câu lệnh `git cherry-pick <commit-hash>` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Sao chép duy nhất thay đổi của commit chỉ định từ một nhánh khác để tạo commit mới trên nhánh hiện tại",
            "correct": true
          },
          {
            "text": "Gộp toàn bộ tất cả các commit của nhánh đó vào nhánh hiện tại",
            "correct": false
          },
          {
            "text": "Xóa vĩnh viễn commit đó khỏi lịch sử kho chứa",
            "correct": false
          },
          {
            "text": "Đổi tên tác giả của commit đó thành tên của bạn",
            "correct": false
          }
        ],
        "explanation": "`git cherry-pick` cho phép nhặt chọn lọc một commit đơn lẻ mà không cần merge toàn bộ nhánh."
      },
      {
        "id": "q2",
        "question": "Sau khi cherry-pick thành công, commit mới trên nhánh hiện tại có mối quan hệ thế nào với commit gốc?",
        "type": "single",
        "options": [
          {
            "text": "Có nội dung và thông điệp giống nhau nhưng mang mã băm SHA-1 mới hoàn toàn",
            "correct": true
          },
          {
            "text": "Có mã băm SHA-1 giống hệt 100% không đổi",
            "correct": false
          },
          {
            "text": "Commit gốc sẽ tự động bị xóa sổ biến mất",
            "correct": false
          },
          {
            "text": "Hai commit tự động kết nối thành một commit duy nhất",
            "correct": false
          }
        ],
        "explanation": "Vì commit mới có commit cha (parent) khác và thời gian tạo khác nên mã SHA-1 được tính toán lại mới hoàn toàn."
      },
      {
        "id": "q3",
        "question": "Nếu trong quá trình cherry-pick phát sinh xung đột (conflict) dòng mã, lệnh nào dùng để tiếp tục sau khi đã sửa xong và add?",
        "type": "single",
        "options": [
          {
            "text": "git cherry-pick --continue",
            "correct": true
          },
          {
            "text": "git cherry-pick --proceed",
            "correct": false
          },
          {
            "text": "git merge --continue",
            "correct": false
          },
          {
            "text": "git commit --amend",
            "correct": false
          }
        ],
        "explanation": "`git cherry-pick --continue` hoàn tất quá trình áp dụng commit sau khi bạn đã đánh dấu resolved bằng `git add`."
      },
      {
        "id": "q4",
        "question": "Tùy chọn `-n` (hoặc `--no-commit`) trong câu lệnh `git cherry-pick -n <hash>` có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Áp dụng các thay đổi của commit vào thư mục làm việc và Staging Area nhưng không tự động tạo commit mới",
            "correct": true
          },
          {
            "text": "Không kiểm tra quyền truy cập mạng Internet",
            "correct": false
          },
          {
            "text": "Không cho phép người khác nhìn thấy mã nguồn",
            "correct": false
          },
          {
            "text": "Bỏ qua toàn bộ các kiểm thử tự động",
            "correct": false
          }
        ],
        "explanation": "`--no-commit` cho phép bạn nhặt nhiều thay đổi về Staging Area để kiểm tra hoặc gộp chung trước khi commit."
      }
    ]
  }
};
export default lesson;
