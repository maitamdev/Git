import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-branching-challenge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "14-branching-challenge",
    "title": "Thử thách cuối Level 3: tạo nhánh, xử lý conflict và merge",
    "level": "intermediate",
    "duration": 40,
    "xp": 150,
    "prerequisites": [
      "12-merge-abort",
      "13-delete-rename-branch"
    ],
    "objectives": [
      "Tạo hai nhánh có commit riêng và gây conflict có chủ đích.",
      "Giải quyết conflict, tạo merge commit và xác nhận hai commit cha.",
      "Xóa an toàn nhánh đã merge."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "branching-challenge"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "challenge",
      "branching master",
      "tong hop",
      "conflict resolution",
      "workflow"
    ],
    "commands": [
      "git switch -c feature-challenge",
      "git switch main",
      "git merge feature-challenge",
      "git status",
      "git add challenge.txt",
      "git commit -m \"merge: combine challenge changes\"",
      "git show HEAD",
      "git branch -d feature-challenge"
    ]
  },
  "content": "# Thử thách cuối Level 3: tạo nhánh, xử lý conflict và merge\n\n---\n\n## 🎯 Mục tiêu\n- Tự tạo hai nhánh có thay đổi riêng từ một commit chung.\n- Gây conflict có chủ đích, đọc và giải quyết conflict.\n- Tạo merge commit, kiểm tra kết quả rồi xóa nhánh đã merge an toàn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Feature branch — nhánh tính năng\n- **Nói dễ hiểu:** Nhánh riêng để phát triển một thay đổi mà chưa đưa thẳng vào nhánh chính.\n- **Ví dụ:** Làm phần giỏ hàng trên `feature-challenge`.\n- **Đừng nhầm:** Tách nhánh giúp cô lập lịch sử; nó không tự kiểm thử hay phê duyệt code.\n\n### Resolve conflict — giải quyết xung đột\n- **Nói dễ hiểu:** Chọn nội dung cuối cùng khi Git không thể tự kết hợp hai thay đổi.\n- **Ví dụ:** Giữ được cả nội dung nhánh tính năng lẫn cập nhật của `main` trong một câu hợp lý.\n- **Đừng nhầm:** Không chọn máy móc Current hoặc Incoming; hiểu yêu cầu trước khi sửa.\n\n### Merge commit — commit hợp nhất\n- **Nói dễ hiểu:** Commit nối nhánh hiện tại với nhánh được merge vào.\n- **Ví dụ:** Sau khi merge `feature-challenge` vào `main`, commit mới có hai commit cha.\n- **Đừng nhầm:** Lệnh merge cập nhật nhánh bạn đang đứng; vì vậy phải đứng trên `main` để nhận tính năng.\n\n---\n\n## 📖 Định nghĩa\nThử thách này mô phỏng một công việc thực tế theo thứ tự: tạo commit gốc, tách nhánh, commit thay đổi riêng ở mỗi nhánh, hợp nhất trên nhánh nhận, giải quyết conflict, xác nhận kết quả rồi dọn nhánh đã merge.\n\n---\n\n## 🤔 Tại sao cần?\nNgười học chỉ biết lệnh khi có thể tự chuẩn bị đúng trạng thái, hiểu kết quả của từng bước và biết cách kiểm tra mình đã làm xong. Bài này ghép các thao tác Level 3 thành một quy trình hoàn chỉnh.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nTạo một bản gốc, để hai nhánh sửa cùng một câu theo hai mục đích khác nhau, rồi đứng ở nhánh nhận để kết hợp thành câu cuối. Cuối cùng mới cất nhánh công việc đã được nhập.\n\n---\n\n## 🖼 Sơ đồ\n```text\n                         F1 ── feature-challenge\n                        /                       \\\nBase ──────────────────                           M1 ── main\n                        \\                       /\n                         M0 ── cập nhật riêng trên main\n\nM1 là merge commit sau khi giải quyết conflict.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhánh tính năng cập nhật thông báo để nói rằng cửa hàng có ưu đãi. Trong lúc đó, `main` thay thông báo để nói cửa hàng đang bảo trì. Khi merge, bạn cần viết nội dung cuối vừa đúng tình trạng bảo trì vừa không làm mất thông tin ưu đãi cho thời điểm cửa hàng mở lại.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c feature-challenge\ngit switch main\ngit merge feature-challenge\ngit status\ngit add challenge.txt\ngit commit -m \"merge: combine challenge changes\"\ngit show HEAD\ngit branch -d feature-challenge\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c feature-challenge`: Tạo nhánh mới và chuyển sang đó.\n- `git switch main`: Quay về nhánh nhận trước khi merge.\n- `git merge feature-challenge`: Đưa nhánh tính năng vào nhánh hiện tại; ở đây là `main`.\n- `git status`: Tìm tệp conflict hoặc xác nhận tệp đã được stage.\n- `git add challenge.txt`: Báo với Git rằng nội dung conflict trong tệp đã được giải quyết.\n- `git commit -m \"merge: combine challenge changes\"`: Ghi merge commit sau khi tệp đã sạch marker và được stage.\n- `git show HEAD`: Xác nhận commit mới có hai commit cha.\n- `git branch -d feature-challenge`: Xóa nhánh sau khi công việc đã merge.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Merge khi đang đứng trên nhánh tính năng:** Khi đó kết quả được đưa vào nhánh tính năng, không phải `main`.\n2. **Quên commit hai phía trước khi merge:** Không có hai thay đổi đã commit thì không tạo được tình huống conflict như bài tập.\n3. **Xóa branch trước khi merge hoặc trước khi rời branch đó:** `-d` sẽ chặn việc xóa commit chưa gộp và không xóa nhánh đang được checkout.\n\n---\n\n## 🧪 Lab\nTrong simulator, nhánh nhận của Level 3 là `main`. Nếu làm trên repository thật, dùng tên nhánh chính của dự án. Bắt đầu từ working tree sạch và repository có ít nhất một commit. Nếu `challenge.txt` đã tồn tại, chọn một tên tệp khác và thay tên đó trong các lệnh.\n1. Trên `main`, tạo `challenge.txt` với dòng `Thông báo: phiên bản đầu`; chạy `git add challenge.txt` và `git commit -m \"docs: add challenge note\"`.\n2. Chạy `git switch -c feature-challenge`. Đổi dòng thành `Thông báo: có ưu đãi`; add và commit với `git commit -m \"feat: announce offer\"`.\n3. Chạy `git switch main`. Đổi cùng dòng thành `Thông báo: cửa hàng đang bảo trì`; add và commit với `git commit -m \"docs: announce maintenance\"`.\n4. Chạy `git merge feature-challenge`. Xác nhận `git status` báo conflict trong `challenge.txt`.\n5. Mở tệp. Thay toàn bộ vùng có markers bằng nội dung cuối: `Thông báo: cửa hàng đang bảo trì; ưu đãi áp dụng khi mở cửa trở lại.` Lưu tệp.\n6. Chạy `git status`; xác nhận tệp còn cần được stage. Chạy `git add challenge.txt`, rồi `git status` lần nữa.\n7. Chạy `git commit -m \"merge: combine challenge changes\"`.\n8. Chạy `git status` và `git show HEAD`. Xác nhận working tree sạch, merge commit có hai cha, nội dung cuối vẫn trong tệp.\n9. Khi đang ở `main`, chạy `git branch -d feature-challenge` rồi `git branch` để xác nhận nhánh phụ được dọn sau merge.\n\n---\n\n## 💡 Hint\nGiải quyết theo ý nghĩa nghiệp vụ: thông báo nói cửa hàng đang bảo trì, còn ưu đãi sẽ áp dụng sau khi mở lại. Xóa đủ cả ba loại marker trước khi chạy `git add`.\n\n---\n\n## ✅ Validation\n- Trước merge, `main` và `feature-challenge` có các commit riêng sau commit gốc.\n- Merge tạo conflict; sau khi sửa, `git status` không còn `Unmerged paths`.\n- Merge commit có hai commit cha và chứa câu đã kết hợp.\n- `git branch -d feature-challenge` thành công sau khi đứng trên `main`.\n\n---\n\n## ❓ Quiz\nTrả lời câu hỏi để kiểm tra hướng merge, quy trình giải quyết conflict và dọn nhánh.\n\n---\n\n## 🔥 Challenge\nTự làm lại quy trình trên với một tệp và thông báo khác. Trước mỗi lệnh, dự đoán nhánh hiện tại, tệp nào sẽ đổi và điều `git status` sẽ báo.\n\n---\n\n## 📚 Tổng kết\n- Tạo commit trên cả hai nhánh trước khi merge để có lịch sử phân kỳ.\n- Đứng trên nhánh nhận, hiểu conflict, sửa tệp, stage rồi commit.\n- Kiểm tra kết quả và chỉ xóa nhánh sau khi đã merge.\n",
  "quiz": {
    "id": "quiz-03-14-branching-challenge",
    "title": "Trắc nghiệm tổng kết: Branching và merge",
    "questions": [
      {
        "id": "q1",
        "question": "Trước khi chạy `git merge feature` để đưa tính năng vào `main`, bạn nên đứng trên nhánh nào?",
        "type": "single",
        "options": [
          {
            "text": "`main`, vì lệnh merge cập nhật nhánh hiện tại",
            "correct": true
          },
          {
            "text": "`feature`, vì đó là nhánh có thay đổi",
            "correct": false
          },
          {
            "text": "Nhánh không liên quan",
            "correct": false
          },
          {
            "text": "Detached HEAD",
            "correct": false
          }
        ],
        "explanation": "Nhánh đang checkout nhận kết quả merge, nên cần chuyển sang main trước."
      },
      {
        "id": "q2",
        "question": "Khi tệp có hai khối conflict, bước nào nên làm trước khi chọn nội dung?",
        "type": "single",
        "options": [
          {
            "text": "Đọc cả hai phiên bản và hiểu yêu cầu của thay đổi",
            "correct": true
          },
          {
            "text": "Luôn giữ Current mà không đọc",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ tệp",
            "correct": false
          },
          {
            "text": "Chạy git branch -D",
            "correct": false
          }
        ],
        "explanation": "Chọn dựa trên yêu cầu nghiệp vụ giúp giữ logic cần thiết thay vì bỏ thay đổi một cách ngẫu nhiên."
      },
      {
        "id": "q3",
        "question": "Sau khi sửa tệp conflict và xóa markers, lệnh nào báo cho Git rằng tệp đã được giải quyết?",
        "type": "single",
        "options": [
          {
            "text": "git add <tên-tệp>",
            "correct": true
          },
          {
            "text": "git status",
            "correct": false
          },
          {
            "text": "git branch",
            "correct": false
          },
          {
            "text": "git switch",
            "correct": false
          }
        ],
        "explanation": "`git add` đưa phiên bản đã sửa vào staging area để chuẩn bị hoàn tất merge commit."
      },
      {
        "id": "q4",
        "question": "Sau khi merge hoàn tất, lệnh nào cho biết HEAD là merge commit và hiện hai commit cha?",
        "type": "single",
        "options": [
          {
            "text": "git show HEAD",
            "correct": true
          },
          {
            "text": "git init",
            "correct": false
          },
          {
            "text": "git status --remote",
            "correct": false
          },
          {
            "text": "git list-parents",
            "correct": false
          }
        ],
        "explanation": "Với merge commit, `git show` trình bày dòng Merge chứa mã của hai commit cha."
      },
      {
        "id": "q5",
        "question": "Khi nào nên chạy `git branch -d feature`?",
        "type": "single",
        "options": [
          {
            "text": "Sau khi xác nhận công việc đã được merge vào nhánh nhận và đã chuyển khỏi feature",
            "correct": true
          },
          {
            "text": "Trước khi tạo commit tính năng",
            "correct": false
          },
          {
            "text": "Khi Git đang báo conflict",
            "correct": false
          },
          {
            "text": "Bất cứ khi nào muốn bỏ qua kiểm tra của Git",
            "correct": false
          }
        ],
        "explanation": "Xóa nhánh sau merge giữ lịch sử trong nhánh nhận và tránh mất đường dẫn tới commit chưa tích hợp."
      },
      {
        "id": "q6",
        "question": "Nếu `git status` còn báo `Unmerged paths`, điều đó có nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Còn tệp conflict cần được sửa và đánh dấu đã giải quyết",
            "correct": true
          },
          {
            "text": "Merge đã hoàn tất và working tree chắc chắn sạch",
            "correct": false
          },
          {
            "text": "Repository chưa được khởi tạo",
            "correct": false
          },
          {
            "text": "Tất cả các nhánh đã bị xóa",
            "correct": false
          }
        ],
        "explanation": "Các đường dẫn unmerged cho biết merge chưa được xử lý xong và chưa thể kết luận thành công."
      }
    ]
  }
};
export default lesson;
