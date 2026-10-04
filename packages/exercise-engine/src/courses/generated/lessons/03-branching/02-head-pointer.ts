import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-head-pointer",
  "moduleId": "03-branching",
  "metadata": {
    "id": "02-head-pointer",
    "title": "HEAD và trạng thái detached HEAD",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-branch-concept"
    ],
    "objectives": [
      "Nhận biết HEAD thường theo nhánh đang chọn.",
      "Nhận ra detached HEAD khi chuyển thẳng tới một commit.",
      "Quay về nhánh an toàn hoặc tạo nhánh để giữ commit thử nghiệm."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "head",
      "detached head",
      "con tro head",
      "git switch --detach"
    ],
    "commands": [
      "git log --oneline",
      "git switch --detach <mã-commit>",
      "git status",
      "git switch <tên-nhánh>",
      "git switch -c <tên-nhánh-mới>"
    ]
  },
  "content": "# HEAD và trạng thái detached HEAD\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu sâu cơ chế trỏ gián tiếp của con trỏ HEAD tới nhánh và commit.\n- Nhận thức đúng đắn và tự tin làm việc với trạng thái Detached HEAD mà không hoảng sợ.\n- Nắm vững thao tác quay về nhánh an toàn hoặc dùng `git switch -c` để bảo tồn các commit thử nghiệm.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### HEAD — vị trí làm việc hiện tại\n- **Nói dễ hiểu:** Chiếc la bàn định vị cho biết bạn đang đứng ở nhánh nào hoặc commit nào trong kho mã nguồn.\n- **Ví dụ:** Khi bạn đang làm việc ở nhánh `main`, file `.git/HEAD` chứa nội dung `ref: refs/heads/main`.\n- **Đừng nhầm:** HEAD không phải là tên một commit cố định; vị trí của nó thay đổi liên tục theo mỗi bước chân bạn di chuyển trong Git.\n\n### Detached HEAD — HEAD không theo tên nhánh\n- **Nói dễ hiểu:** Trạng thái khi con trỏ HEAD tách rời khỏi tên nhánh và trỏ trực diện vào một mã commit độc lập.\n- **Ví dụ:** Khi bạn switch thẳng tới một mã băm commit cụ thể, Git sẽ thông báo bạn đang ở trạng thái Detached HEAD.\n- **Đừng nhầm:** Đây là tính năng hoàn toàn bình thường để soi mã nguồn cũ, tuyệt đối không phải là lỗi hỏng kho mã nguồn.\n\n### `git switch -c` — tạo nhánh tại vị trí hiện tại\n- **Nói dễ hiểu:** Chiếc phao cứu sinh giúp bạn tạo ngay một nhánh mới để gắn chặt các commit thử nghiệm vừa tạo khi đang ở trạng thái detached.\n- **Ví dụ:** Gõ `git switch -c experiment-fix` để giữ lại vĩnh viễn các commit vừa gõ mà không bị trình dọn rác (GC) xóa mất.\n- **Đừng nhầm:** Nếu bạn chuyển về `main` mà không tạo nhánh mới, các commit tạo ra trong lúc detached sẽ bị mồ côi và rất khó tìm lại.\n\n---\n\n## 📖 Định nghĩa\nHEAD là con trỏ tối cao trong Git, định vị chính xác vị trí mà thư mục làm việc của bạn đang gắn kết. Ở trạng thái thông thường, HEAD trỏ gián tiếp tới một nhánh (như `main`), rồi nhánh đó mới trỏ tới commit. Khi bạn nhảy thẳng tới một mã băm commit cụ thể, Git rơi vào trạng thái 'Detached HEAD': con trỏ HEAD tách rời khỏi nhánh và bám trực tiếp vào commit đó.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu về HEAD và Detached HEAD là ranh giới giữa một lập trình viên biết dùng Git và một người làm chủ hoàn toàn Git. Bạn cần nhảy về các commit trong quá khứ để chạy thử nghiệm, tái hiện lỗi người dùng báo hoặc điều tra mã độc mà không sợ làm xáo trộn nhánh chính. Nắm vững cơ chế này giúp bạn tự tin khám phá quá khứ và biết cách cứu lại các commit thử nghiệm trước khi rời đi.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung HEAD như chiếc đầu đọc của máy hát đĩa than cổ điển hoặc mắt đọc laser của ổ đĩa CD. Khi đầu đọc hạ xuống rãnh đĩa mang tên 'Bài 3' (nhánh), nó sẽ phát bài hát đó. Nếu bạn dùng tay nhấc bổng đầu đọc đặt thẳng vào một giây bất kỳ giữa bài hát mà không qua menu (Detached), đầu đọc vẫn phát nhạc bình thường, nhưng nó không còn bị ràng buộc bởi tên bài hát nữa.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTRẠNG THÁI BÌNH THƯỜNG (ATTACHED):\n  HEAD ──────► [main] ──────► Commit (C3)\n  (Khi commit mới C4 xuất hiện: HEAD và main cùng tiến lên C4)\n\nTRẠNG THÁI TÁCH RỜI (DETACHED HEAD):\n  HEAD ──────────────────────► Commit (C1)  <── Đang đứng xem trực tiếp\n  [main] ────────────────────► Commit (C3)  <── Nhánh chính vẫn nằm yên\n  (Nếu commit ở đây mà không tạo nhánh mới, commit sẽ bị mồ côi khi bạn rời đi!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhách hàng báo lỗi ứng dụng bị sập ở phiên bản phát hành 3 ngày trước với mã commit `e4f5a6b`. Bạn lập tức gõ `git switch --detach e4f5a6b` để đưa toàn bộ mã nguồn trên máy trở về đúng khoảnh khắc đó để chạy thử. Sau khi xác định được nguyên nhân, bạn chỉ cần gõ `git switch main` để trở về hiện tại mà không làm hỏng bất kỳ nhánh nào.\n\n---\n\n## 💻 Command\n```bash\ngit log --oneline\ngit switch --detach <mã-commit>\ngit status\ngit switch -c <tên-nhánh-mới>\ngit switch main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch --detach <mã-commit>`: Nhảy thẳng tới một snapshot trong quá khứ mà không di chuyển bất kỳ con trỏ nhánh nào.\n- `git status`: Hiển thị cảnh báo màu vàng giải thích bạn đang ở trạng thái Detached HEAD tại commit nào.\n- `git switch -c <tên-nhánh>`: Tạo nhánh mới ngay tại commit đang đứng để bảo tồn toàn bộ công sức thử nghiệm.\n- `git switch main`: Lệnh an toàn đưa bạn trở lại nhánh chính để tiếp tục công việc bình thường.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng loạn tắt máy khi thấy thông báo Detached HEAD**: Nghĩ rằng repository bị hỏng; thực chất Git chỉ đang giải thích trạng thái bình thường.\n2. **Commit thử nghiệm chán chê rồi gõ `git switch main` ngay**: Khiến các commit vừa tạo bị rơi vào trạng thái \"mồ côi\" (unreachable commit) và sẽ bị Git Garbage Collector dọn dẹp sau này.\n3. **Quên mất mình đang ở detached HEAD**: Cứ thế viết thêm nhiều tính năng lớn mà không gắn nhánh, gây khó khăn cho việc quản lý sau này.\n\n---\n\n## 🧪 Lab\n1. Chạy `git log --oneline` để chọn ra mã băm của commit cũ thứ hai trong danh sách.\n2. Chạy lệnh: `git switch --detach <mã-commit-cũ>`.\n3. Chạy `git status` và quan sát thông báo \"HEAD detached at <mã-commit>\".\n4. Thử nghiệm xong, chạy lệnh `git switch main` để trở về nhánh chính an toàn.\n5. Chạy lại `git status` để xác nhận bạn đã trở lại \"On branch main\".\n\n---\n\n## 💡 Hint\n> Nếu bạn vừa viết code hay và muốn giữ lại khi đang ở trạng thái detached, gõ ngay `git switch -c ten-nhanh-moi` trước khi chuyển đi nơi khác!\n\n---\n\n## ✅ Validation\n- Nhận diện chính xác thông báo HEAD detached khi chuyển tới một commit cụ thể.\n- Quay về nhánh `main` thành công và khôi phục trạng thái làm việc bình thường.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để nắm vững bản chất của HEAD và cách xử trị trạng thái Detached HEAD chuyên nghiệp.\n\n---\n\n## 🔥 Challenge\nGiả sử bạn đang ở trạng thái detached HEAD và vừa commit 2 mốc quan trọng. Đột nhiên bạn gõ nhầm `git switch main`. Làm thế nào để tìm lại 2 commit đó và gắn một nhánh mới cho chúng? (Gợi ý: công cụ gì ghi lại mọi di chuyển của HEAD?).\n\n---\n\n## 📚 Tổng kết\n- HEAD là con trỏ đại diện cho vị trí làm việc hiện thời của bạn trong Git.\n- Detached HEAD xuất hiện khi bạn soi trực tiếp vào commit thay vì bám vào tên nhánh.\n- Luôn tạo nhánh mới bằng `git switch -c` nếu bạn muốn giữ lại các commit sinh ra trong lúc detached.\n",
  "quiz": {
    "id": "quiz-03-02-head-pointer",
    "title": "Trắc nghiệm: HEAD và detached HEAD",
    "questions": [
      {
        "id": "q1",
        "question": "Khi đang ở trạng thái bình thường trên `main`, HEAD thường trỏ tới đâu?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh `main`, nhánh này trỏ tới commit hiện tại",
            "correct": true
          },
          {
            "text": "Tệp `.gitignore`",
            "correct": false
          },
          {
            "text": "Máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Một commit chưa từng được tạo",
            "correct": false
          }
        ],
        "explanation": "Trong trạng thái thông thường, HEAD theo nhánh hiện tại; nhánh đó chỉ tới commit mới nhất của nó."
      },
      {
        "id": "q2",
        "question": "Khi nào HEAD ở trạng thái detached?",
        "type": "single",
        "options": [
          {
            "text": "Khi HEAD trỏ trực tiếp tới commit thay vì theo tên nhánh",
            "correct": true
          },
          {
            "text": "Khi repository mất kết nối Internet",
            "correct": false
          },
          {
            "text": "Khi bạn sửa một tệp chưa staged",
            "correct": false
          },
          {
            "text": "Khi cấu hình email Git chưa đúng",
            "correct": false
          }
        ],
        "explanation": "Detached HEAD mô tả vị trí con trỏ; nó không phụ thuộc kết nối mạng hay nội dung tệp."
      },
      {
        "id": "q3",
        "question": "Bạn muốn xem một commit cũ mà không di chuyển `main`. Nên dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git switch --detach <mã-commit>",
            "correct": true
          },
          {
            "text": "git branch -D main",
            "correct": false
          },
          {
            "text": "git reset --hard main",
            "correct": false
          },
          {
            "text": "git commit --amend",
            "correct": false
          }
        ],
        "explanation": "`git switch --detach` đưa HEAD tới commit để kiểm tra mà không đổi con trỏ nhánh `main`."
      },
      {
        "id": "q4",
        "question": "Nếu tạo commit thử nghiệm khi detached và muốn dễ tìm lại, bạn nên làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo một nhánh tại commit đó trước khi chuyển đi",
            "correct": true
          },
          {
            "text": "Đổi tên tệp thành mã commit",
            "correct": false
          },
          {
            "text": "Chạy `git status` nhiều lần",
            "correct": false
          },
          {
            "text": "Xóa nhánh `main`",
            "correct": false
          }
        ],
        "explanation": "Nhánh đặt một tên ổn định trỏ tới commit thử nghiệm để bạn có thể quay lại sau."
      },
      {
        "id": "q5",
        "question": "Bạn muốn rời detached HEAD và quay về nhánh `main`. Lệnh nào phù hợp?",
        "type": "single",
        "options": [
          {
            "text": "git switch main",
            "correct": true
          },
          {
            "text": "git add main",
            "correct": false
          },
          {
            "text": "git branch main",
            "correct": false
          },
          {
            "text": "git diff main",
            "correct": false
          }
        ],
        "explanation": "`git switch main` gắn HEAD lại với nhánh `main` và cập nhật thư mục làm việc theo nhánh đó."
      }
    ]
  }
};
export default lesson;
