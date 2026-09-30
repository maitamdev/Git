import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-working-directory",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "01-working-directory",
    "title": "Working Directory (Thư mục làm việc)",
    "level": "beginner",
    "duration": 20,
    "xp": 60,
    "prerequisites": [
      "09-git-init"
    ],
    "objectives": [
      "Hiểu rõ khái niệm và vai trò của Working Directory trong kiến trúc 3 khu vực của Git.",
      "Phân biệt giữa tệp tin được Git theo dõi (Tracked) và tệp tin chưa được theo dõi (Untracked).",
      "Nắm bắt cách các thao tác chỉnh sửa tệp tin bên ngoài terminal ảnh hưởng trực tiếp tới Working Directory."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "working directory",
      "working tree",
      "thu muc lam viec",
      "untracked",
      "khu vuc git"
    ],
    "commands": [
      "git status",
      "ls -la"
    ]
  },
  "content": "# Working Directory (Thư mục làm việc)\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và vai trò của Working Directory trong kiến trúc 3 khu vực của Git.\n- Phân biệt giữa tệp tin được Git theo dõi (Tracked) và tệp tin chưa được theo dõi (Untracked).\n- Nắm bắt cách các thao tác chỉnh sửa tệp tin bên ngoài terminal ảnh hưởng trực tiếp tới Working Directory.\n\n---\n\n## 📖 Định nghĩa\n> Working Directory (hay còn gọi là Working Tree - Thư mục làm việc) là một thư mục vật lý thực tế trên hệ thống tệp tin ổ đĩa máy tính của bạn, nơi chứa toàn bộ mã nguồn, tài nguyên hình ảnh và các tệp cấu hình của dự án mà bạn có thể trực tiếp nhìn thấy, mở bằng trình soạn thảo mã nguồn như VS Code và chỉnh sửa hàng ngày. Khi một kho lưu trữ Git được khởi tạo, mọi tệp tin mới tạo ra trong thư mục này ban đầu đều ở trạng thái chưa được theo dõi (Untracked) cho đến khi bạn chủ động đưa chúng vào khu vực chuẩn bị.\n\n---\n\n## 🤔 Tại sao cần?\nNắm vững bản chất của Working Directory là bước đầu tiên để làm chủ luồng làm việc 3 khu vực nổi tiếng của Git. Nếu không hiểu rõ sự độc lập giữa Working Directory và cơ sở dữ liệu Git, bạn sẽ rất dễ rơi vào bẫy tâm lý lầm tưởng rằng chỉ cần bấm phím lưu tệp trong VS Code là Git đã tự động ghi nhớ phiên bản. Bạn cần hiểu rằng Working Directory chỉ là không gian nháp làm việc tạm thời, mọi thay đổi trong đó chưa hề được bảo vệ an toàn cho đến khi đi qua Staging Area và vào Commit.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Working Directory giống như chiếc bàn làm việc bằng gỗ trong phòng vẽ tranh của một họa sĩ. Trên chiếc bàn này, các hộp màu, cọ vẽ, bút chì và những tờ giấy nháp đang nằm ngổn ngang để bạn thao tác. Chiếc bàn làm việc cho phép bạn tự do tẩy xóa, vẽ thêm nét mực mới hay thậm chí vò nát một bản nháp mà không ảnh hưởng gì tới các tác phẩm hoàn thiện đã được đóng khung treo trang trọng trong phòng trưng bày Repository.\n\n---\n\n## 🖼 Sơ đồ\n```text\nKiến trúc 3 khu vực của Git:\n┌──────────────────────┐     git add      ┌──────────────────────┐    git commit    ┌──────────────────────┐\n│  Working Directory   │ ───────────────► │     Staging Area     │ ───────────────► │      Repository      │\n│ (Thư mục làm việc)   │                  │   (Vùng chuẩn bị)    │                  │  (Kho lưu trữ HEAD)  │\n│  - Chỉnh sửa code    │                  │  - Chọn lọc commit   │                  │  - Lưu snapshot vĩnh │\n└──────────────────────┘                  └──────────────────────┘                  └──────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm mở dự án website bán hàng và tạo thêm một tệp tin mới mang tên payment-gateway.js để lập trình tính năng thanh toán. Khi mở cửa sổ terminal và gõ lệnh git status, Git sẽ liệt kê tệp payment-gateway.js dưới mục màu đỏ mang tên Untracked files. Điều này có nghĩa là tệp tin này đã tồn tại thực tế trên ổ cứng trong Working Directory, nhưng cơ sở dữ liệu của Git hoàn toàn chưa hề để mắt tới nó. Chỉ khi kỹ sư thực hiện lệnh thêm tệp, Git mới bắt đầu theo dõi vòng đời của nó vào dự án.\n\n---\n\n## 💻 Command\n```bash\ngit status\nls -la\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Lệnh kiểm tra trạng thái toàn diện, hiển thị chi tiết các tệp tin trong Working Directory đang bị sửa đổi hoặc chưa được đưa vào diện theo dõi.\n- `ls -la`: Liệt kê tất cả các tệp tin và thư mục thực tế đang có mặt trong thư mục làm việc bao gồm cả các tệp ẩn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ lưu tệp là Git đã ghi nhớ**:  Lưu tệp trong trình soạn thảo chỉ cập nhật dữ liệu trên ổ cứng tại Working Directory, hoàn toàn chưa tạo snapshot trong Git.\n2. **Sợ rằng sửa file trong Working Directory làm hỏng commit cũ**:  Commit cũ được bảo vệ vĩnh viễn trong cơ sở dữ liệu, việc sửa code trên bàn làm việc không làm thay đổi lịch sử đã qua.\n3. **Nhầm lẫn Working Directory với Staging Area**:  Không phân biệt được tệp đang sửa với tệp đã sẵn sàng để commit.\n\n---\n\n## 🧪 Lab\n1. Mở terminal tại thư mục dự án và tạo một tệp tin mới bằng lệnh `echo \"console.log(1);\" > script.js`.\n2. Chạy lệnh `git status` để quan sát tệp `script.js` xuất hiện trong mục Untracked files màu đỏ.\n3. Nhận biết rằng tệp tin này đang nằm trong Working Directory nhưng chưa hề được đưa vào Staging Area.\n\n---\n\n## 💡 Hint\n> Mọi tệp tin bạn nhìn thấy và sửa đổi trong VS Code đều nằm trong Working Directory.\n\n---\n\n## ✅ Validation\n- Tạo tệp thành công và `git status` nhận diện tệp là untracked trong working tree.\n\n---\n\n## ❓ Quiz\nHãy hoàn thành bài kiểm tra trắc nghiệm dưới đây về Working Directory trong Git.\n\n---\n\n## 🔥 Challenge\nMô tả điều gì sẽ xảy ra với các tệp trong Working Directory nếu bạn chuyển sang một nhánh hoàn toàn khác.\n\n---\n\n## 📚 Tổng kết\n- Working Directory (Working Tree) là thư mục vật lý nơi bạn trực tiếp xem và chỉnh sửa tệp tin.\n- Là khu vực đầu tiên trong kiến trúc 3 khu vực của Git: Working Tree -> Staging Area -> Repository.\n- Mọi thay đổi trong Working Directory chỉ mang tính tạm thời cho đến khi được stage và commit.\n",
  "quiz": {
    "id": "quiz-02-01-working-directory",
    "title": "Trắc nghiệm: Working Directory trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Working Directory (hay Working Tree) trong Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "Thư mục vật lý trên ổ cứng chứa các tệp mã nguồn mà bạn trực tiếp mở và chỉnh sửa",
            "correct": true
          },
          {
            "text": "Máy chủ đám mây của GitHub lưu trữ bản sao lưu dự án",
            "correct": false
          },
          {
            "text": "Bộ nhớ RAM tạm thời của vi xử lý máy tính",
            "correct": false
          },
          {
            "text": "Khu vực lưu trữ các commit đã được đóng gói hoàn thiện",
            "correct": false
          }
        ],
        "explanation": "Working Directory là nơi làm việc thực tế ngoài đời của lập trình viên trên hệ thống tệp tin. Đáp án B sai vì đó là Remote Server; C sai vì Git lưu trên ổ cứng; D sai vì đó là Repository."
      },
      {
        "id": "q2",
        "question": "Một tệp mới vừa được tạo trong Working Directory ban đầu sẽ có trạng thái nào đối với Git?",
        "type": "single",
        "options": [
          {
            "text": "Untracked (Chưa được theo dõi)",
            "correct": true
          },
          {
            "text": "Staged (Đã nằm trong vùng chuẩn bị)",
            "correct": false
          },
          {
            "text": "Committed (Đã lưu vào lịch sử vĩnh viễn)",
            "correct": false
          },
          {
            "text": "Ignored (Bị bỏ qua tự động)",
            "correct": false
          }
        ],
        "explanation": "Tệp mới tạo chưa từng được git add sẽ luôn ở trạng thái Untracked. Đáp án B sai vì cần chạy git add; C sai vì cần commit; D sai vì chỉ ignored nếu có trong .gitignore."
      },
      {
        "id": "q3",
        "question": "Khi bạn chỉnh sửa một dòng code trong tệp đã được theo dõi và bấm phím lưu, thay đổi đó nằm ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Nằm trong Working Directory ở trạng thái Modified",
            "correct": true
          },
          {
            "text": "Tự động tạo ra một commit mới trong Repository",
            "correct": false
          },
          {
            "text": "Tự động đẩy thẳng lên máy chủ từ xa GitHub",
            "correct": false
          },
          {
            "text": "Biến mất ngay lập tức khi tắt terminal",
            "correct": false
          }
        ],
        "explanation": "Lưu tệp chỉ cập nhật nội dung trên Working Directory và chuyển trạng thái tệp thành Modified. Các đáp án khác sai vì Git không tự động commit hay push ngầm."
      },
      {
        "id": "q4",
        "question": "Khu vực nào tiếp nhận dữ liệu ngay sau khi tệp tin rời khỏi Working Directory qua lệnh git add?",
        "type": "single",
        "options": [
          {
            "text": "Staging Area (Vùng chuẩn bị)",
            "correct": true
          },
          {
            "text": "Remote Repository trên GitHub",
            "correct": false
          },
          {
            "text": "Thùng rác hệ điều hành Recycle Bin",
            "correct": false
          },
          {
            "text": "Thư mục cấu hình toàn cục Global Config",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git add` chuyển tệp từ Working Directory sang Staging Area (Index). Đáp án B sai vì cần git push; C và D hoàn toàn sai lệch bản chất."
      }
    ]
  }
};
export default lesson;
