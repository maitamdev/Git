import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "17-rebase-conflict",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "17-rebase-conflict",
    "title": "Rebase Conflict",
    "level": "advanced",
    "duration": 35,
    "xp": 120,
    "prerequisites": [
      "12-git-rebase"
    ],
    "objectives": [
      "Hiểu rõ nguyên nhân và bản chất phát sinh xung đột (Conflict) trong tiến trình Git Rebase.",
      "Nắm vững máy trạng thái tạm dừng (Paused State Machine) của Rebase khi xảy ra xung đột.",
      "Vận hành chuẩn xác chuỗi 3 bước xử lý: Mở tệp giải quyết xung đột -> `git add` -> `git rebase --continue`.",
      "Phân biệt rõ ràng chức năng và mức độ an toàn của `--continue`, `--abort`, và `--skip`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "rebase conflict",
      "xung dot rebase",
      "rebase continue",
      "rebase skip",
      "rebase abort",
      "conflict resolution"
    ],
    "commands": [
      "git status",
      "git add <tên-tệp-đã-sửa>",
      "git rebase --continue",
      "git rebase --abort",
      "git rebase --skip"
    ]
  },
  "content": "# Rebase Conflict\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ nguyên nhân và bản chất phát sinh xung đột (Conflict) trong tiến trình Git Rebase.\n- Nắm vững máy trạng thái tạm dừng (Paused State Machine) của Rebase khi xảy ra xung đột.\n- Vận hành chuẩn xác chuỗi 3 bước xử lý: Mở tệp giải quyết xung đột -> `git add` -> `git rebase --continue`.\n- Phân biệt rõ ràng chức năng và mức độ an toàn của `--continue`, `--abort`, và `--skip`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Rebase Conflict\n- **Nói dễ hiểu**: Trạng thái Git tạm dừng rebase khi một commit đang được áp dụng gặp mâu thuẫn code với nhánh đích.\n- **Ví dụ**: Đang rebase nhánh tính năng lên main thì Git báo xung đột ở file `server.js` vì cả hai nhánh cùng sửa một hàm.\n- **Đừng nhầm**: Rebase conflict có thể xảy ra nhiều lần tương ứng với từng commit được replay, khác với merge conflict chỉ giải quyết một lần duy nhất.\n\n### Rebase State Machine\n- **Nói dễ hiểu**: Chu trình chuyển đổi trạng thái tạm dừng của Git khi rebase: dừng khi gặp lỗi, đợi sửa xong file, rồi chạy tiếp hoặc hủy bỏ.\n- **Ví dụ**: Dùng `git status` khi đang dừng rebase để xem danh sách file conflict, sau đó chọn giải quyết hoặc abort.\n- **Đừng nhầm**: Không gõ `git commit` khi giải quyết xung đột rebase; bạn chỉ cần `git add` và gọi `git rebase --continue`.\n\n### Rebase Abort vs Skip\n- **Nói dễ hiểu**: Hai phương án xử lý sự cố trong rebase: `--abort` hủy toàn bộ quay về an toàn, còn `--skip` vứt bỏ riêng commit đang lỗi để đi tiếp.\n- **Ví dụ**: Gõ `git rebase --abort` nếu conflict quá phức tạp và bạn muốn bình tĩnh bàn bạc lại với đồng nghiệp.\n- **Đừng nhầm**: `--skip` bỏ việc phát lại commit hiện tại trong lần rebase này; commit gốc có thể còn trong reflog. Chỉ dùng nếu xác nhận muốn bỏ phần thay đổi đó.\n\n---\n\n## 📖 Định nghĩa\nRebase Conflict là tình trạng Git tạm dừng áp dụng commit khi phát hiện các dòng mã nguồn bị chỉnh sửa mâu thuẫn giữa commit đang phát lại và nhánh đích, yêu cầu người dùng giải quyết từng commit một.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu rõ cơ chế tạm dừng của Rebase giúp bạn tự tin xử lý xung đột mà không hoảng sợ. Bạn biết cách sửa lỗi dứt điểm từng bước, và luôn có chiếc phao cứu sinh `git rebase --abort` để quay về điểm an toàn bất cứ khi nào.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn đang tua lại cuốn băng sửa chữa căn nhà. Đến phân cảnh sơn tường, bạn thấy người khác đã đập tường xây thành cửa sổ. Băng tạm dừng lại. Bạn bước vào chọn giữ cửa sổ hay sơn lại, dán nhãn đã xong (`git add`), rồi bấm Play tiếp tục (`git rebase --continue`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nMáy trạng thái xử lý Rebase Conflict:\n[Chạy git rebase main] ──► Phát hiện Conflict tại commit C_i\n                                    │\n                                    ▼ (Git tạm dừng tiến trình)\n       ┌────────────────────────────┴────────────────────────────┐\n       ▼                                                         ▼\n[git rebase --abort]                                [Mở tệp sửa conflict]\n(Hủy bỏ, về trạng thái ban đầu)                                  │\n                                                                 ▼\n                                                            [git add <file>]\n                                                                 │\n                                                                 ▼\n                                                    [git rebase --continue]\n                                                    (Chạy tiếp commit kế tiếp!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Khoa rebase nhánh `feat/api` lên `main` và gặp conflict ở file `server.js` do khác cổng kết nối. Khoa mở file, chọn cổng 8080, xóa ký hiệu conflict rồi lưu lại. Sau đó Khoa gõ `git add server.js` và `git rebase --continue`. Git tiếp tục chạy mượt mà đến commit cuối cùng.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <tên-tệp-đã-sửa>\ngit rebase --continue\ngit rebase --abort\ngit rebase --skip\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị danh sách các tệp tin đang bị xung đột cần giải quyết trong phiên rebase.\n- `git add <tệp>`: Đánh dấu tệp tin đã được giải quyết xung đột thành công (không được gõ git commit!).\n- `git rebase --continue`: Tiếp tục áp dụng các commit còn lại sau khi đã add tệp resolved.\n- `git rebase --abort`: Hủy bỏ hoàn toàn tiến trình rebase và đưa nhánh quay về trạng thái ban đầu trước khi gõ lệnh.\n- `git rebase --skip`: Bỏ qua hoàn toàn commit hiện tại (vứt bỏ thay đổi của commit này và làm tiếp commit sau).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên tiếp tục rebase sau khi sửa conflict**: Theo quy trình thông thường, sau khi sửa file và stage phần đã giải quyết, chạy `git rebase --continue`; làm theo hướng dẫn Git nếu có tình huống đặc biệt.\n2. **Dùng `git rebase --skip` để né conflict mà chưa xem diff**: Git sẽ không phát lại thay đổi của commit hiện tại vào nhánh mới.\n3. **Bắt đầu rebase khi còn thay đổi dở**: Nên commit hoặc cất riêng công việc và kiểm tra `git status` trước để dễ hiểu trạng thái nếu cần abort.\n\n---\n\n## 🧪 Lab\nLàm trong kho thử nghiệm riêng, và bắt đầu từ Working Tree sạch.\n1. Trên `main`, tạo `app.js` có dòng `mode=base`, stage và commit.\n2. Chạy `git switch -c conflict-demo`, đổi dòng thành `mode=feature`, rồi commit.\n3. Chạy `git switch main`, đổi cùng dòng thành `mode=main`, rồi commit.\n4. Chạy `git switch conflict-demo` và `git rebase main`. Khi conflict xuất hiện, chạy `git status`, mở `app.js`, chọn nội dung hợp nhất rồi xóa các dấu conflict.\n5. Chạy `git add app.js`, `git rebase --continue`, rồi `git status` và `git log --oneline --graph` để xác nhận rebase hoàn tất.\n\n---\n\n## 💡 Hint\n> Trong quy trình rebase thông thường, sau khi sửa và stage conflict, chạy `git rebase --continue` để Git tiếp tục phát lại commit.\n\n---\n\n## ✅ Validation\n- Sau khi sửa conflict và stage file, `git rebase --continue` hoàn tất việc phát lại commit.\n- `git rebase --abort` hủy phiên đang chạy và đưa nhánh về điểm bắt đầu; kiểm tra lại `git status` sau đó.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về xử lý xung đột trong Git Rebase.\n\n---\n\n## 🔥 Challenge\nGiải thích tại sao tính năng Git `rerere` (Reuse Recorded Resolution) lại đặc biệt hữu ích khi làm việc với các chuỗi rebase dài thường xuyên bị xung đột lặp lại.\n\n---\n\n## 📚 Tổng kết\n- Rebase áp dụng từng commit một, nên conflict có thể xuất hiện nhiều lần liên tiếp.\n- Quy trình chuẩn: Sửa conflict -> `git add <file>` -> `git rebase --continue`.\n- `git rebase --abort` là phao cứu sinh đáng tin cậy để đưa mọi thứ về trạng thái an toàn.\n",
  "quiz": {
    "id": "quiz-05-17-rebase-conflict",
    "title": "Trắc nghiệm: Xử lý Rebase Conflict",
    "questions": [
      {
        "id": "q1",
        "question": "Sau khi mở tệp tin bị xung đột, chỉnh sửa xong xuôi và chạy lệnh `git add <tệp>`, câu lệnh ĐÚNG tiếp theo bạn phải chạy là gì?",
        "type": "single",
        "options": [
          {
            "text": "git rebase --continue",
            "correct": true
          },
          {
            "text": "git commit -m \"fixed conflict\"",
            "correct": false
          },
          {
            "text": "git push origin main",
            "correct": false
          },
          {
            "text": "git merge --continue",
            "correct": false
          }
        ],
        "explanation": "Trong quy trình thông thường, sau khi stage tệp đã giải quyết, `git rebase --continue` yêu cầu Git tiếp tục phát lại chuỗi commit."
      },
      {
        "id": "q2",
        "question": "Điều gì sẽ xảy ra nếu bạn chạy câu lệnh `git rebase --skip` khi đang ở trạng thái xung đột commit?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ bỏ qua hoàn toàn commit đang bị xung đột (vứt bỏ các thay đổi của nó) và nhảy sang commit tiếp theo",
            "correct": true
          },
          {
            "text": "Git sẽ tự động sửa hết lỗi xung đột cho bạn",
            "correct": false
          },
          {
            "text": "Git sẽ hủy bỏ phiên rebase và quay về ban đầu",
            "correct": false
          },
          {
            "text": "Git sẽ xóa toàn bộ nhánh main",
            "correct": false
          }
        ],
        "explanation": "`--skip` bỏ qua commit hiện tại, chỉ dùng khi bạn thực sự muốn vứt bỏ toàn bộ thay đổi của commit đó."
      },
      {
        "id": "q3",
        "question": "Nếu gặp phải một xung đột quá nan giải trong rebase và bạn muốn hủy bỏ toàn bộ để quay về trạng thái an toàn ban đầu, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git rebase --abort",
            "correct": true
          },
          {
            "text": "git rebase --cancel",
            "correct": false
          },
          {
            "text": "git undo --all",
            "correct": false
          },
          {
            "text": "git reset --force",
            "correct": false
          }
        ],
        "explanation": "`git rebase --abort` hủy phiên rebase và hoàn nguyên trạng thái nhánh về y hệt lúc trước khi gõ lệnh."
      },
      {
        "id": "q4",
        "question": "Tại sao Rebase Conflict có thể phải giải quyết nhiều lần liên tiếp, trong khi Merge Conflict thông thường chỉ giải quyết 1 lần?",
        "type": "single",
        "options": [
          {
            "text": "Vì Rebase áp dụng lần lượt từng commit đơn lẻ, mỗi commit đều có khả năng gây xung đột độc lập",
            "correct": true
          },
          {
            "text": "Vì Git bị lỗi vòng lặp vô tận",
            "correct": false
          },
          {
            "text": "Do máy chủ GitHub gửi yêu cầu kiểm tra lại nhiều lần",
            "correct": false
          },
          {
            "text": "Vì rebase làm tăng kích thước tệp tin",
            "correct": false
          }
        ],
        "explanation": "Rebase là chuỗi các thao tác cherry-pick liên tiếp; mỗi commit được replay đều có thể chạm vào vùng code xung đột."
      },
      {
        "id": "q5",
        "question": "Lệnh nào giúp bạn kiểm tra danh sách chính xác các tệp tin đang bị xung đột khi Git đang ở trạng thái tạm dừng rebase?",
        "type": "single",
        "options": [
          {
            "text": "git status",
            "correct": true
          },
          {
            "text": "git show-conflicts",
            "correct": false
          },
          {
            "text": "git list-broken",
            "correct": false
          },
          {
            "text": "git check-files",
            "correct": false
          }
        ],
        "explanation": "`git status` hiển thị chi tiết trạng thái rebase đang tạm dừng tại commit nào và liệt kê các tệp \"both modified\"."
      },
      {
        "id": "q6",
        "question": "Sai lầm tai hại nhất mà lập trình viên mới học hay mắc phải khi giải quyết conflict trong rebase là gì?",
        "type": "single",
        "options": [
          {
            "text": "Gõ lệnh `git commit` thay vì gõ `git rebase --continue`",
            "correct": true
          },
          {
            "text": "Mở tệp tin bằng trình soạn thảo mã nguồn",
            "correct": false
          },
          {
            "text": "Trao đổi với đồng nghiệp viết đoạn code xung đột",
            "correct": false
          },
          {
            "text": "Kiểm tra trạng thái bằng git status",
            "correct": false
          }
        ],
        "explanation": "Khi rebase đang tạm dừng vì conflict, hãy dùng `git rebase --continue` theo hướng dẫn Git để hoàn tất bước hiện tại và phát lại các commit còn lại."
      }
    ]
  }
};
export default lesson;
