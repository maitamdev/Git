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
      "Giải mã tường tận hiện tượng Detached HEAD dưới góc nhìn nhị phân: khi HEAD trỏ trực tiếp vào commit SHA-1."
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
      "cat .git/HEAD",
      "git symbolic-ref HEAD",
      "git checkout --detach HEAD"
    ]
  },
  "content": "# Con trỏ HEAD & Symbolic References trong .git/HEAD\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững bản chất của con trỏ HEAD như chiếc la bàn chỉ định vị trí làm việc hiện tại của bạn trong Git.\n- Hiểu rõ khái niệm Tham chiếu biểu tượng (Symbolic Reference): HEAD trỏ tới một nhánh chứ không trỏ thẳng vào commit.\n- Giải mã tường tận hiện tượng Detached HEAD dưới góc nhìn nhị phân: khi HEAD trỏ trực tiếp vào commit SHA-1.\n\n---\n\n## 📖 Định nghĩa\n> HEAD là một con trỏ đặc biệt xác định vị trí hiện tại của không gian làm việc của bạn trong lịch sử Git. Trong trạng thái bình thường, HEAD là một Tham chiếu biểu tượng (Symbolic Reference) — nghĩa là nó không trỏ trực tiếp vào một mã băm commit, mà trỏ vào một con trỏ tham chiếu khác (thường là một nhánh, ví dụ: ref: refs/heads/main). Khi bạn thực hiện một commit mới, Git sẽ kiểm tra HEAD đang trỏ vào nhánh nào, và tự động cập nhật con trỏ nhánh đó tiến lên commit mới.\n\n---\n\n## 🤔 Tại sao cần?\nNhiều lập trình viên cảm thấy sợ hãi hiện tượng Detached HEAD (HEAD bị tách rời) vì không hiểu bản chất cấu trúc dữ liệu của nó. Dưới góc độ Git Internals, Detached HEAD đơn giản là khi tệp văn bản .git/HEAD chứa trực tiếp một chuỗi mã băm SHA-1 40 ký tự thay vì chứa dòng chữ `ref: refs/heads/branch_name`. Khi hiểu rõ điều này, bạn hoàn toàn có thể tự tin du hành thời gian và khám phá bất kỳ commit nào trong quá khứ mà không lo sợ làm hỏng kho lưu trữ của dự án.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng con trỏ HEAD như chiếc biển tên \"BẠN ĐANG Ở ĐÂY\" (You are here) trên bản đồ trung tâm thương mại. Bình thường, chiếc biển tên này được móc vào một chiếc xe buýt đang di chuyển (nhánh main): xe buýt chạy đến đâu (commit mới), biển tên tự động đi theo đến đó. Nhưng khi bạn nhảy xuống xe buýt và đứng một mình giữa ngã tư đường (Detached HEAD), bạn vẫn đứng vững tại tọa độ đó, chỉ có điều chiếc xe buýt đã chạy đi mất và không ai tự động chở bạn đi tiếp.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nHai trạng thái của con trỏ HEAD:\n1. Trạng thái bình thường (Symbolic Reference):\n   .git/HEAD ──► \"ref: refs/heads/main\" ──► .git/refs/heads/main ──► [Commit C3]\n   (Khi commit, nhánh main tự động tiến lên C4, HEAD tự động đi theo)\n\n2. Trạng thái Detached HEAD:\n   .git/HEAD ──► \"7a8b9c4d3e2f\" (Chứa trực tiếp Commit Hash C2)\n   (Không gắn vào nhánh nào, commit mới sẽ trở thành commit mồ côi nếu đổi nhánh)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư muốn kiểm tra một phiên bản cũ của ứng dụng để tìm nguyên nhân phát sinh lỗi. Kỹ sư chạy lệnh: `git checkout 9f8a7b6`. Terminal hiển thị một thông báo dài cảnh báo: \"You are in 'detached HEAD' state\". Tò mò mở tệp `.git/HEAD` ra xem bằng lệnh cat, kỹ sư thấy nội dung tệp bây giờ chỉ là một dòng chữ duy nhất: `9f8a7b6c5d4e3f2a1b09876543210fedcba98765`. Kỹ sư nhận ra rằng từ \"detached\" ở đây có nghĩa là HEAD đã bị \"tháo chốt\" khỏi tệp tham chiếu nhánh trong thư mục refs/heads/. Khi kỹ sư gõ `git switch main`, tệp `.git/HEAD` lập tức đổi lại thành `ref: refs/heads/main` và mọi thứ trở lại trạng thái gắn kết bình thường.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ncat .git/HEAD\ngit symbolic-ref HEAD\ngit checkout --detach HEAD\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh cat .git/HEAD in ra nội dung con trỏ hiện tại, git symbolic-ref HEAD trả về đường dẫn tham chiếu đầy đủ nếu HEAD đang gắn vào nhánh, và cờ --detach chủ động đưa HEAD về trạng thái tách rời để thực nghiệm.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Thực hiện các commit quan trọng khi đang ở trạng thái Detached HEAD rồi chuyển nhánh khác**:  Các commit mới sẽ không có nhánh nào trỏ tới và dễ bị coi là commit mồ côi.\n2. **Sử dụng trình soạn thảo sửa tệp .git/HEAD thành một đường dẫn nhánh không tồn tại khiến mọi lệnh Git bị tê liệt.**: \n3. **Nghĩ rằng Detached HEAD là một lỗi phần mềm nghiêm trọng của Git (thực chất đó là tính năng có chủ đích để kiểm tra mã nguồn cũ).**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Xem nội dung tệp `.git/HEAD` khi đang ở trên nhánh chính.\n2. Sử dụng lệnh `git checkout --detach HEAD` để chủ động đưa repository vào trạng thái Detached HEAD.\n3. Xem lại nội dung `.git/HEAD` để xác nhận nó đã chuyển từ đường dẫn ref sang mã băm trực tiếp.\n4. Chuyển lại về nhánh chính bằng `git switch -` và quan sát tệp HEAD được phục hồi.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Lệnh plumbing `git symbolic-ref HEAD` sẽ trả về lỗi exit code khác 0 nếu bạn đang ở trong trạng thái Detached HEAD.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nGiải thích được sự biến đổi nội dung của tệp `.git/HEAD` giữa hai trạng thái gắn nhánh và tách rời.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng kiểm tra sự thấu hiểu của bạn về con trỏ HEAD và Symbolic References.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để tạo một con trỏ nhánh mới cứu hộ các commit vừa tạo trong trạng thái Detached HEAD trước khi bạn chuyển về nhánh main?\n\n---\n\n## 📚 Tổng kết kiến thức\n- HEAD là con trỏ chỉ định vị trí không gian làm việc hiện tại của bạn trong Git.\n- Trạng thái bình thường: HEAD là Symbolic Ref trỏ tới một nhánh (`ref: refs/heads/main`).\n- Trạng thái Detached HEAD: HEAD chứa trực tiếp mã băm 40 ký tự của một commit cụ thể.\n",
  "quiz": {
    "id": "quiz-08-git-internals-13-symbolic-refs-head",
    "title": "Trắc nghiệm: Con trỏ HEAD & Symbolic References trong .git/HEAD",
    "questions": [
      {
        "id": "q1",
        "question": "Bản chất của tệp tin `.git/HEAD` trong trạng thái hoạt động bình thường là gì?",
        "type": "single",
        "options": [
          {
            "text": "Một tham chiếu biểu tượng (Symbolic Reference) trỏ tới một tệp nhánh, ví dụ `ref: refs/heads/main`",
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
        "explanation": "HEAD đóng vai trò là con trỏ gián tiếp (Symbolic Ref), trỏ tới con trỏ nhánh đang hoạt động."
      },
      {
        "id": "q2",
        "question": "Dưới góc nhìn Git Internals, trạng thái \"Detached HEAD\" thể hiện qua nội dung tệp .git/HEAD như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Tệp .git/HEAD chứa trực tiếp chuỗi băm SHA-1 (40 ký tự) thay vì tiền tố ref: refs/heads/...",
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
        "explanation": "Khi detached, Git ghi trực tiếp mã SHA-1 của commit vào .git/HEAD thay vì lưu dạng symbolic reference trỏ tới một nhánh."
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
        "explanation": "`git symbolic-ref` là lệnh plumbing chuẩn để đọc hoặc ghi các tham chiếu biểu tượng như HEAD."
      },
      {
        "id": "q4",
        "question": "Nếu bạn vô tình tạo 3 commit mới khi đang ở trạng thái Detached HEAD, làm sao để giữ lại chúng an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Chạy lệnh `git branch <tên-nhánh-mới>` ngay tại vị trí hiện tại trước khi chuyển đi nơi khác",
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
        "explanation": "Tạo một nhánh mới trỏ vào commit hiện tại sẽ gắn một con trỏ tham chiếu vĩnh viễn vào chuỗi commit đó."
      }
    ]
  }
};
export default lesson;
