import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-symbolic-refs-head",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "13-symbolic-refs-head",
    "title": "Con trỏ HEAD & Symbolic References trong .git/HEAD",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "12-references-and-heads"
    ],
    "objectives": [
      "Nắm vững bản chất của con trỏ HEAD như chiếc la bàn chỉ định vị trí làm việc hiện tại của bạn trong Git.",
      "Hiểu rõ khái niệm Tham chiếu biểu tượng (Symbolic Reference): HEAD trỏ tới một nhánh chứ không trỏ thẳng vào commit.",
      "Giải thích Detached HEAD khi HEAD trỏ trực tiếp tới object ID của commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "HEAD pointer",
      "symbolic ref",
      "detached head",
      "git symbolic-ref",
      "active branch"
    ],
    "commands": [
      "git rev-parse --git-path HEAD",
      "git symbolic-ref HEAD",
      "git checkout --detach HEAD"
    ]
  },
  "content": "# Con trỏ HEAD & Symbolic References trong .git/HEAD\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất của con trỏ HEAD như chiếc la bàn chỉ định vị trí làm việc hiện tại của bạn trong Git.\n- Hiểu rõ khái niệm Tham chiếu biểu tượng (Symbolic Reference): HEAD trỏ tới một nhánh chứ không trỏ thẳng vào commit.\n- Giải thích Detached HEAD: HEAD trỏ trực tiếp tới object ID của commit thay vì tên branch.\n- Biết cách dùng lệnh `git symbolic-ref` để thao tác và kiểm tra trạng thái của con trỏ HEAD.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Symbolic reference\n- **Nói dễ hiểu**: Ref gián tiếp chứa tên một ref khác thay vì trực tiếp chứa object ID.\n- **Ví dụ**: HEAD thường chỉ tới `refs/heads/main` khi bạn đang làm việc trên nhánh `main`.\n- **Đừng nhầm**: Git cập nhật ref nhánh đang được HEAD trỏ tới; vị trí vật lý của các ref không nhất thiết là những tệp riêng trong `.git/refs/`.\n\n### Detached HEAD State\n- **Nói dễ hiểu**: Trạng thái con trỏ HEAD bị tháo rời khỏi nhánh và trỏ trực tiếp vào một mã băm commit cụ thể.\n- **Ví dụ**: Khi checkout một commit, `git rev-parse HEAD` in object ID; HEAD không còn trỏ tới branch.\n- **Đừng nhầm**: Không phải là lỗi phần mềm hay hỏng repo; đây là tính năng hữu ích cho phép bạn xem lại hoặc thử nghiệm code tại bất kỳ commit nào trong quá khứ.\n\n### git symbolic-ref Command\n- **Nói dễ hiểu**: Lệnh plumbing chuyên dụng dùng để đọc hoặc thiết lập đường dẫn cho các tham chiếu biểu tượng.\n- **Ví dụ**: Chạy `git symbolic-ref HEAD` sẽ in ra đường dẫn `refs/heads/main`.\n- **Đừng nhầm**: Nếu bạn đang ở trạng thái Detached HEAD, lệnh này sẽ trả về lỗi exit code khác 0 vì HEAD không trỏ vào ref nào.\n\n---\n\n## 📖 Định nghĩa\nHEAD xác định commit hiện được checkout. Thông thường, HEAD là symbolic ref tới branch, chẳng hạn `refs/heads/main`; commit mới sẽ cập nhật branch đó. Ở trạng thái detached, HEAD trỏ trực tiếp tới commit object. Trong linked worktree, Git directory của HEAD có thể khác đường dẫn `.git` bạn nhìn thấy ở gốc worktree; dùng lệnh Git để tra cứu.\n\n---\n\n## 🤔 Tại sao cần?\nDetached HEAD là trạng thái hợp lệ để xem hoặc thử nghiệm một commit cũ. Nếu tạo commit mới khi detached rồi checkout sang nơi khác, commit đó có thể không còn được giữ bởi branch; hãy tạo branch cứu hộ nếu muốn giữ nó. Object ID có độ dài phụ thuộc hash format.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng con trỏ HEAD như chiếc biển tên \"BẠN ĐANG Ở ĐÂY\" (You are here) trên bản đồ trung tâm thương mại. Bình thường, chiếc biển tên này được móc vào một chiếc xe buýt đang di chuyển (nhánh main): xe buýt chạy đến đâu (commit mới), biển tên tự động đi theo đến đó. Nhưng khi bạn nhảy xuống xe buýt và đứng một mình giữa ngã tư đường (Detached HEAD), bạn vẫn đứng vững tại tọa độ đó, chỉ có điều chiếc xe buýt đã chạy đi mất và không ai tự động chở bạn đi tiếp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nHai trạng thái của con trỏ HEAD (tên hiển thị là logic, đường dẫn vật lý có thể khác):\n1. Trạng thái bình thường (Symbolic Reference):\n   HEAD ──► refs/heads/main ──► [Commit C3]\n   (Khi commit, ref main tiến lên C4; HEAD vẫn trỏ tới ref main)\n\n2. Trạng thái Detached HEAD:\n   HEAD ──► <commit-object-id> (Trỏ trực tiếp tới commit C2)\n   (Không gắn vào branch; tạo branch cứu hộ nếu cần giữ commit mới)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư muốn kiểm tra phiên bản cũ chạy `git switch --detach <commit>` rồi `git symbolic-ref -q HEAD` (lệnh không in branch ở trạng thái detached) và `git rev-parse HEAD` để xem object ID hiện tại. Chuyển lại bằng `git switch main` nếu `main` là branch cần dùng. Nếu đã tạo commit mới ở detached state và cần giữ nó, trước khi chuyển đi hãy chạy `git branch rescue-detached-work`.\n\n---\n\n## 💻 Command\n```bash\n# Xem Git directory đang dùng cho HEAD (hữu ích với linked worktree)\ngit rev-parse --git-path HEAD\n\n# Đọc symbolic reference an toàn qua lệnh plumbing\ngit symbolic-ref -q HEAD\n\n# In object ID của commit hiện tại, kể cả khi HEAD detached\ngit rev-parse HEAD\n\n# Chủ động chuyển sang trạng thái Detached HEAD để kiểm tra commit hiện tại\ngit switch --detach HEAD\n\n# Đưa HEAD trở lại gắn kết với nhánh chính\ngit switch main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rev-parse --git-path HEAD`: Hỏi Git đường dẫn thực tế của HEAD cho worktree hiện tại.\n- `git symbolic-ref -q HEAD`: In tên symbolic ref nếu HEAD đang gắn với branch; ở trạng thái detached lệnh trả mã lỗi.\n- `git rev-parse HEAD`: In object ID của commit hiện tại dù HEAD đang gắn branch hay detached.\n- `git switch --detach HEAD`: Chuyển sang detached HEAD tại commit hiện tại mà không di chuyển ref nhánh.\n- `git switch main`: Gắn lại HEAD vào nhánh local `main` nếu nhánh đó tồn tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tạo commit quan trọng khi đang Detached HEAD rồi chuyển nhánh**: Commit có thể không còn được branch nào giữ; tạo branch cứu hộ trước khi chuyển đi.\n2. **Sửa tệp `.git/HEAD` thành đường dẫn nhánh không tồn tại**: Khiến cho Git không thể khởi động bất kỳ thao tác nào vì mất dấu con trỏ hiện tại.\n3. **Coi Detached HEAD là lỗi hỏng Git**: Đây là trạng thái hợp lệ để xem commit; nếu tạo commit muốn giữ lại, hãy tạo branch trước khi rời commit đó.\n\n---\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Ghi lại branch hiện tại bằng `git branch --show-current`.\n2. Chạy `git switch --detach HEAD` để vào detached state.\n3. Xác nhận `git symbolic-ref -q HEAD` không in branch, còn `git rev-parse HEAD` vẫn in object ID.\n4. Chạy `git switch <tên-branch-đã-ghi>` để quay lại. Không tạo commit thử nếu chưa tạo branch cứu hộ.\n\n---\n\n## 💡 Hint\n> `git symbolic-ref -q HEAD` trả exit code khác 0 nếu HEAD detached. Kết hợp với `git rev-parse HEAD` để xem commit hiện tại.\n\n---\n\n## ✅ Validation\n- `git symbolic-ref -q HEAD` in tên branch khi đang gắn branch và không in tên khi detached.\n- `git rev-parse HEAD` in object ID ở cả hai trạng thái; độ dài ID tùy hash format.\n\n---\n\n## ❓ Quiz\nCùng kiểm tra sự thấu hiểu của bạn về con trỏ HEAD và Symbolic References trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🔥 Challenge\nLàm thế nào để tạo một con trỏ nhánh mới cứu hộ các commit vừa tạo trong trạng thái Detached HEAD trước khi bạn chuyển về nhánh main? (Gợi ý: `git branch <ten-nhanh-cuu-ho>`).\n\n---\n\n## 📚 Tổng kết\n- HEAD là con trỏ chỉ định vị trí không gian làm việc hiện tại của bạn trong Git.\n- Trạng thái bình thường: HEAD là Symbolic Ref trỏ tới một nhánh (`ref: refs/heads/main`).\n- Trạng thái Detached HEAD: HEAD trỏ trực tiếp tới object ID của một commit.\n- Nếu muốn giữ commit tạo ra khi detached, hãy neo nó bằng branch trước khi chuyển đi.\n",
  "quiz": {
    "id": "quiz-08-git-internals-13-symbolic-refs-head",
    "title": "Trắc nghiệm: Con trỏ HEAD & Symbolic References trong .git/HEAD",
    "questions": [
      {
        "id": "q1",
        "question": "HEAD thường hoạt động như thế nào khi bạn đang ở một nhánh local?",
        "type": "single",
        "options": [
          {
            "text": "Một symbolic ref trỏ tới tên ref của nhánh, ví dụ refs/heads/main",
            "correct": true
          },
          {
            "text": "Một tệp ảnh chụp toàn bộ khuôn mặt người dùng",
            "correct": false
          },
          {
            "text": "Một chương trình thực thi nhị phân",
            "correct": false
          },
          {
            "text": "Một cơ sở dữ liệu chứa toàn bộ commit",
            "correct": false
          }
        ],
        "explanation": "Khi ở trên nhánh, HEAD thường là symbolic ref tới ref nhánh; đường dẫn Git directory có thể khác giữa các loại repository."
      },
      {
        "id": "q2",
        "question": "Dưới góc nhìn Git Internals, trạng thái Detached HEAD thể hiện qua nội dung tệp .git/HEAD như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "HEAD trỏ trực tiếp tới object ID của commit thay vì symbolic ref tới branch",
            "correct": true
          },
          {
            "text": "Tệp .git/HEAD hoàn toàn trống rỗng không có byte nào",
            "correct": false
          },
          {
            "text": "Tệp .git/HEAD bị xóa khỏi ổ đĩa",
            "correct": false
          },
          {
            "text": "Tệp .git/HEAD chứa đường dẫn URL tới GitHub",
            "correct": false
          }
        ],
        "explanation": "Detached HEAD trỏ trực tiếp tới commit, còn độ dài object ID phụ thuộc hash format của repository."
      },
      {
        "id": "q3",
        "question": "Lệnh Plumbing nào sau đây cho phép kiểm tra hoặc thiết lập an toàn một Symbolic Reference?",
        "type": "single",
        "options": [
          {
            "text": "git symbolic-ref",
            "correct": true
          },
          {
            "text": "git check-head",
            "correct": false
          },
          {
            "text": "git ref-pointer",
            "correct": false
          },
          {
            "text": "git link-branch",
            "correct": false
          }
        ],
        "explanation": "git symbolic-ref là lệnh plumbing chuẩn để đọc hoặc ghi các tham chiếu biểu tượng như HEAD."
      },
      {
        "id": "q4",
        "question": "Nếu bạn vô tình tạo 3 commit mới khi đang ở trạng thái Detached HEAD, làm sao để giữ lại chúng an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Chạy git branch <tên-nhánh-mới> ở vị trí commit hiện tại trước khi chuyển đi nơi khác",
            "correct": true
          },
          {
            "text": "Khởi động lại máy tính",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ thư mục .git",
            "correct": false
          },
          {
            "text": "Không thể cứu vãn được, chúng sẽ bị xóa ngay lập tức",
            "correct": false
          }
        ],
        "explanation": "Branch mới giữ commit hiện tại reachable; vẫn có thể xóa branch sau này, nên không nên gọi ref là vĩnh viễn."
      },
      {
        "id": "q5",
        "question": "Lệnh nào sau đây đọc trực tiếp giá trị của symbolic reference HEAD mà không cần mở tệp bằng cat?",
        "type": "single",
        "options": [
          {
            "text": "git symbolic-ref HEAD",
            "correct": true
          },
          {
            "text": "git head-check",
            "correct": false
          },
          {
            "text": "git get-branch-name",
            "correct": false
          },
          {
            "text": "git branch --current-only",
            "correct": false
          }
        ],
        "explanation": "Lệnh git symbolic-ref HEAD in ra đường dẫn tham chiếu đầy đủ (như refs/heads/main) mà con trỏ HEAD đang liên kết tới."
      }
    ]
  }
};
export default lesson;
