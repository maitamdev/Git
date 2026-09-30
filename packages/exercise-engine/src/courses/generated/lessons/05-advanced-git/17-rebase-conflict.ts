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
  "content": "# Rebase Conflict\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ nguyên nhân và bản chất phát sinh xung đột (Conflict) trong tiến trình Git Rebase.\n- Nắm vững máy trạng thái tạm dừng (Paused State Machine) của Rebase khi xảy ra xung đột.\n- Vận hành chuẩn xác chuỗi 3 bước xử lý: Mở tệp giải quyết xung đột -> `git add` -> `git rebase --continue`.\n- Phân biệt rõ ràng chức năng và mức độ an toàn của `--continue`, `--abort`, và `--skip`.\n\n---\n\n## 📖 Định nghĩa\n> Rebase Conflict (Xung đột trong quá trình Rebase) là trạng thái Git tạm dừng tiến trình tái cơ sở khi một commit trong danh sách rebase cố gắng áp dụng thay đổi lên một vùng mã nguồn đã bị sửa đổi trái ngược trên nhánh đích. Khác với Merge Conflict chỉ xuất hiện duy nhất một lần ở cuối quá trình, Rebase Conflict có thể xuất hiện nhiều lần liên tiếp ứng với từng commit được áp dụng, đòi hỏi lập trình viên phải giải quyết dứt điểm từng bước một.\n\n---\n\n## 🤔 Tại sao cần?\nRất nhiều lập trình viên cảm thấy sợ hãi Git Rebase chỉ vì từng gặp phải xung đột và không biết cách thoát ra hoặc giải quyết. Hiểu rõ cơ chế tạm dừng của Rebase sẽ biến nỗi sợ hãi thành sự tự tin làm chủ: bạn biết chính xác commit nào đang gặp mâu thuẫn, sửa chữa xung đột một cách chuẩn xác, và nắm trong tay câu lệnh cứu cánh `git rebase --abort` để quay về điểm an toàn bất cứ lúc nào bạn muốn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang phát lại một cuốn băng ghi hình từng hành động sửa chữa ngôi nhà. Ở hành động số 1 (commit 1), bạn muốn sơn bức tường màu vàng, nhưng trên nhánh main người khác đã đập bỏ bức tường đó xây thành cửa sổ. Cuốn băng tạm dừng lại (Rebase paused). Bạn phải bước vào phòng, quyết định xem nên giữ cửa sổ hay sơn lại tường (Resolve Conflict), đánh dấu đã quyết định xong (`git add`), rồi bấm nút Play cho cuốn băng chạy tiếp hành động số 2 (`git rebase --continue`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nMáy trạng thái xử lý Rebase Conflict:\n[Chạy git rebase main] ──► Phát hiện Conflict tại commit C_i\n                                    │\n                                    ▼ (Git tạm dừng tiến trình)\n       ┌────────────────────────────┴────────────────────────────┐\n       ▼                                                         ▼\n[git rebase --abort]                                [Mở tệp sửa conflict]\n(Hủy bỏ, về trạng thái ban đầu)                                  │\n                                                                 ▼\n                                                            [git add <file>]\n                                                                 │\n                                                                 ▼\n                                                    [git rebase --continue]\n                                                    (Chạy tiếp commit tiếp theo!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Khoa đang rebase nhánh `feat/api-v2` lên nhánh chính `main` thì terminal dừng lại đột ngột và in ra thông báo cảnh báo: \"CONFLICT (content): Merge conflict in server.js. error: could not apply [4a5b6c] feat: change port. Resolve all conflicts manually\". Khoa rất bình tĩnh mở tệp `server.js` trong VS Code, quan sát các điểm mốc đánh dấu xung đột và nhận thấy cổng kết nối đang bị mâu thuẫn trực tiếp giữa 3000 và 8080. Khoa thảo luận nhanh với nhóm và quyết định chọn cổng 8080, xóa các dòng phân cách rồi lưu tệp lại. Khoa gõ `git add server.js` rồi thực thi câu lệnh: `git rebase --continue`. Git lập tức áp dụng xong commit đó và tiếp tục chạy mượt mà đến commit cuối cùng mà không gặp thêm bất kỳ trở ngại nào.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <tên-tệp-đã-sửa>\ngit rebase --continue\ngit rebase --abort\ngit rebase --skip\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị danh sách các tệp tin đang bị xung đột cần giải quyết trong phiên rebase.\n- `git add <tệp>`: Đánh dấu tệp tin đã được giải quyết xung đột thành công (không được gõ git commit!).\n- `git rebase --continue`: Tiếp tục áp dụng các commit còn lại sau khi đã add tệp resolved.\n- `git rebase --abort`: Hủy bỏ hoàn toàn tiến trình rebase và đưa nhánh quay về trạng thái ban đầu trước khi gõ lệnh.\n- `git rebase --skip`: Bỏ qua hoàn toàn commit hiện tại (vứt bỏ thay đổi của commit này và làm tiếp commit sau).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gõ lệnh `git commit` sau khi sửa conflict trong rebase**:  Đây là sai lầm phổ biến nhất! Trong rebase bạn BẮT BUỘC phải dùng `git rebase --continue` chứ không dùng git commit.\n2. **Lạm dụng lệnh `git rebase --skip`**:  Có thể vô tình xóa bỏ toàn bộ công sức của commit đang bị xung đột.\n3. **Hoảng loạn xóa thư mục dự án khi gặp conflict thay vì chỉ cần gõ nhẹ nhàng `git rebase --abort`.**: Hoảng loạn xóa thư mục dự án khi gặp conflict thay vì chỉ cần gõ nhẹ nhàng `git rebase --abort`.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh `conflict-demo` từ main, sửa dòng 1 của tệp `app.js` và commit.\n2. Chuyển về `main`, sửa cùng dòng 1 của tệp `app.js` với nội dung khác và commit.\n3. Chuyển lại sang `conflict-demo` và chạy `git rebase main` để chủ động tạo conflict.\n4. Mở `app.js`, chọn nội dung phù hợp, xóa các vạch ngăn cách conflict và lưu lại.\n5. Chạy `git add app.js` rồi gõ `git rebase --continue` để hoàn tất rebase thành công.\n\n---\n\n## 💡 Hint\n> Sau khi giải quyết xong conflict và `git add`, câu lệnh tiếp theo LUÔN LUÔN là `git rebase --continue`.\n\n---\n\n## ✅ Validation\n- Giải quyết thành thạo xung đột trong quá trình rebase bằng git add và git rebase --continue.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về xử lý xung đột trong Git Rebase.\n\n---\n\n## 🔥 Challenge\nTại sao trong quá trình rebase một nhánh gồm 5 commit, bạn có thể phải giải quyết conflict tới 5 lần riêng biệt?\n\n---\n\n## 📚 Tổng kết\n- Rebase Conflict xảy ra khi một commit trong danh sách rebase xung đột với các commit trước đó.\n- Quy trình chuẩn: Mở tệp sửa code -> `git add` -> `git rebase --continue`.\n- Tuyệt đối không gõ `git commit` khi rebase đang tạm dừng; dùng `--abort` nếu muốn quay về an toàn.\n",
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
        "explanation": "Trong quy trình rebase, sau khi add tệp resolved bạn BẮT BUỘC dùng `git rebase --continue` để Git tự động tạo commit tiếp."
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
        "explanation": "Gõ `git commit` thủ công sẽ phá vỡ tiến trình máy trạng thái của rebase và tạo ra commit thừa không mong muốn."
      }
    ]
  }
};
export default lesson;
