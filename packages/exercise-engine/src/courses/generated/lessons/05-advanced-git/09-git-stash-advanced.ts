import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-git-stash-advanced",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "09-git-stash-advanced",
    "title": "git stash nâng cao",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "08-commit-amend"
    ],
    "objectives": [
      "Làm chủ toàn diện hệ thống ngăn kéo tạm thời với các câu lệnh nâng cao của `git stash`.",
      "Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).",
      "Sử dụng các cờ quan trọng: `-u` (`--include-untracked`) và `-a` (`--all`) để lưu cả tệp mới và tệp bị bỏ qua.",
      "Đặt tên mô tả tường minh cho từng mẩu stash và tạo nhánh mới trực tiếp từ một mẩu stash."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git stash",
      "stash pop",
      "stash apply",
      "stash branch",
      "stash untracked",
      "ngan ke tam thoi"
    ],
    "commands": [
      "git stash push -u -m \"<ghi-chú-mô-tả>\"",
      "git stash list",
      "git stash apply stash@{n}",
      "git stash pop",
      "git stash drop stash@{n}",
      "git stash branch <nhánh-mới> stash@{n}"
    ]
  },
  "content": "# git stash nâng cao\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ toàn diện hệ thống ngăn kéo tạm thời với các câu lệnh nâng cao của `git stash`.\n- Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).\n- Sử dụng các cờ quan trọng: `-u` (`--include-untracked`) và `-a` (`--all`) để lưu cả tệp mới và tệp bị bỏ qua.\n- Đặt tên mô tả tường minh cho từng mẩu stash và tạo nhánh mới trực tiếp từ một mẩu stash.\n\n---\n\n## 📖 Định nghĩa\n> `git stash` nâng cao là bộ công cụ quản lý ngăn kéo lưu trữ tạm thời chuyên sâu trong Git, cho phép lập trình viên dọn dẹp Working Directory sạch sẽ ngay lập tức bằng cách cất giữ toàn bộ trạng thái dở dang (cả tệp đã staged, tệp chưa staged và tệp chưa được theo dõi untracked) vào một ngăn xếp (Stash Stack) có tổ chức, để bạn có thể tự do chuyển nhánh làm việc khẩn cấp mà không cần phải tạo commit rác.\n\n---\n\n## 🤔 Tại sao cần?\nTình huống kinh điển của nghề lập trình: bạn đang viết dở một tính năng phức tạp với hàng tá dòng code dở dang chưa thể chạy được, thì sếp gọi điện thông báo có một lỗi nghiêm trọng trên production cần bạn sửa gấp trong 15 phút. Bạn không thể commit code dở vì sẽ làm hỏng lịch sử, cũng không thể chuyển nhánh vì Git sẽ chặn do xung đột tệp. `git stash` nâng cao là giải pháp cứu tinh: cất toàn bộ code dở vào ngăn kéo trong 1 giây, sang sửa bug, rồi quay lại lấy ra tiếp tục lập trình như chưa hề có cuộc chia ly.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bàn làm việc của bạn đang bày bừa đủ loại cọ vẽ, bảng màu và bức tranh đang vẽ dở (Working Tree bừa bộn). Bỗng nhiên có vị khách quý bước vào phòng cần bạn ký gấp một bản hợp đồng. Bạn không vứt bức tranh vào sọt rác, mà nhẹ nhàng bê toàn bộ tranh, cọ và bảng màu cất vào một chiếc ngăn kéo có khóa dưới bàn (`git stash push -u -m \"bức tranh hoàng hôn\"`). Mặt bàn sạch bong, bạn ký hợp đồng xong xuôi, tiễn khách rồi mở ngăn kéo bê lại mọi thứ ra bàn tiếp tục vẽ (`git stash pop`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ cấu hoạt động của ngăn xếp Stash (LIFO - Last In, First Out):\nstash@{0}: \"WIP: refactor auth module\" (Mới nhất)\nstash@{1}: \"WIP: improve cart css\"\nstash@{2}: \"WIP: experiment with graphql\" (Cũ nhất)\n\nThao tác pop:   Lấy stash@{0} ra áp dụng vào Working Tree và XÓA khỏi danh sách.\nThao tác apply: Lấy stash@{0} ra áp dụng nhưng VẪN GIỮ lại trong danh sách.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Trang đang thêm 3 tệp mới và sửa đổi 2 tệp cho tính năng thanh toán QR code của ứng dụng bán hàng. Bất ngờ có yêu cầu khẩn cấp chuyển sang kiểm tra nhánh `hotfix-login`. Thay vì gõ lệnh stash thông thường có thể bỏ quên tệp mới, Trang gõ câu lệnh nâng cao: `git stash push -u -m \"WIP: QR payment integration\"`. Cờ `-u` đảm bảo cả 3 tệp mới chưa tracked cũng được cất gọn gàng vào ngăn kéo. Trang chuyển sang nhánh hotfix xử lý xong xuôi, quay về nhánh cũ và gõ `git stash list` để thấy rõ mẩu stash có tên mô tả rõ ràng. Trang gõ `git stash pop` và toàn bộ không gian làm việc sống động trở lại nguyên vẹn không thiếu một dòng code.\n\n---\n\n## 💻 Command\n```bash\ngit stash push -u -m \"<ghi-chú-mô-tả>\"\ngit stash list\ngit stash apply stash@{n}\ngit stash pop\ngit stash drop stash@{n}\ngit stash branch <nhánh-mới> stash@{n}\n```\n\n---\n\n## 🔍 Giải thích command\n- `git stash push -u -m \"<msg>\"`: Lưu tạm kèm thông điệp mô tả và bao gồm cả các tệp untracked.\n- `git stash list`: Liệt kê toàn bộ các mẩu stash đang được lưu trữ trong ngăn xếp.\n- `git stash pop`: Áp dụng mẩu stash gần nhất vào thư mục làm việc và tự động xóa nó khỏi ngăn kéo.\n- `git stash apply stash@{n}`: Áp dụng mẩu stash chỉ định nhưng vẫn bảo lưu nó trong ngăn kéo.\n- `git stash branch <tên>`: Tạo một nhánh mới tinh xuất phát từ mốc commit ban đầu và áp dụng stash vào đó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ -u (`--include-untracked`)**:  Khiến các tệp mới tạo chưa từng commit bị bỏ sót lại trên Working Tree và gây lỗi khi chuyển nhánh.\n2. **Lạm dụng stash mà không đặt tên mô tả**:  Dẫn đến danh sách stash chứa hàng chục mục vô danh không biết mục nào chứa code gì.\n3. **Quên dọn dẹp các stash cũ không còn sử dụng bằng lệnh `git stash drop` hoặc `git stash clear`.**: Quên dọn dẹp các stash cũ không còn sử dụng bằng lệnh `git stash drop` hoặc `git stash clear`.\n\n---\n\n## 🧪 Lab\n1. Tạo một tệp mới `new-feature.txt` và chỉnh sửa một tệp có sẵn.\n2. Chạy lệnh `git stash push -u -m \"demo stash untracked\"` để cất toàn bộ.\n3. Gõ `git status` xác nhận Working Tree sạch sẽ.\n4. Chạy `git stash list` để xem thông điệp mô tả trong danh sách.\n5. Chạy `git stash pop` để hồi phục lại đầy đủ cả tệp mới và tệp sửa đổi.\n\n---\n\n## 💡 Hint\n> Luôn thêm cờ `-u` khi stash để không bỏ sót các tệp tin mới tạo chưa được Git theo dõi.\n\n---\n\n## ✅ Validation\n- Sử dụng thành thạo các kỹ thuật stash nâng cao có thông điệp mô tả và xử lý tệp untracked.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ git stash nâng cao.\n\n---\n\n## 🔥 Challenge\nKhi nào bạn nên sử dụng `git stash branch <tên-nhánh>` thay vì `git stash pop` thông thường?\n\n---\n\n## 📚 Tổng kết\n- `git stash push -u -m` giúp lưu trữ cả tệp untracked kèm thông điệp mô tả rõ ràng.\n- Phân biệt `pop` (áp dụng và xóa) với `apply` (áp dụng và giữ lại dự phòng).\n- `git stash branch` giải quyết xung đột bằng cách tạo nhánh mới an toàn từ mốc stash ban đầu.\n",
  "quiz": {
    "id": "quiz-05-09-git-stash-advanced",
    "title": "Trắc nghiệm: git stash nâng cao",
    "questions": [
      {
        "id": "q1",
        "question": "Tại sao câu lệnh `git stash` cơ bản có thể bỏ quên các tệp tin mới tạo của bạn?",
        "type": "single",
        "options": [
          {
            "text": "Vì theo mặc định git stash chỉ lưu các tệp đã được theo dõi (tracked), cần thêm cờ `-u` để bao gồm cả tệp untracked",
            "correct": true
          },
          {
            "text": "Vì các tệp mới tạo có dung lượng quá lớn",
            "correct": false
          },
          {
            "text": "Vì tệp mới tạo chưa được đặt tên bằng tiếng Anh",
            "correct": false
          },
          {
            "text": "Vì Git không cho phép lưu quá 3 tệp cùng lúc",
            "correct": false
          }
        ],
        "explanation": "Mặc định Git stash bỏ qua untracked files; cờ `-u` (`--include-untracked`) bắt buộc Git phải lưu cả tệp mới."
      },
      {
        "id": "q2",
        "question": "Sự khác biệt cốt lõi giữa `git stash pop` và `git stash apply` là gì?",
        "type": "single",
        "options": [
          {
            "text": "pop khôi phục xong sẽ tự động xóa mẩu stash đó khỏi danh sách, còn apply giữ nguyên mẩu stash trong danh sách",
            "correct": true
          },
          {
            "text": "pop chỉ dùng cho nhánh main, còn apply dùng cho mọi nhánh",
            "correct": false
          },
          {
            "text": "apply xóa toàn bộ kho chứa, còn pop giữ lại",
            "correct": false
          },
          {
            "text": "Hai câu lệnh này hoàn toàn đồng nghĩa không khác gì nhau",
            "correct": false
          }
        ],
        "explanation": "`pop` = `apply` + `drop`. Dùng apply nếu bạn muốn thử nghiệm trên nhiều nhánh mà không làm mất stash."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để tạo một nhánh mới và áp dụng ngay mẩu stash vào nhánh đó, tránh xung đột với nhánh hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git stash branch <tên-nhánh-mới>",
            "correct": true
          },
          {
            "text": "git branch --stash <tên-nhánh>",
            "correct": false
          },
          {
            "text": "git checkout stash -b <tên-nhánh>",
            "correct": false
          },
          {
            "text": "git pop --branch <tên-nhánh>",
            "correct": false
          }
        ],
        "explanation": "`git stash branch <nhánh>` tạo nhánh từ commit gốc nơi stash được tạo ra và áp dụng thay đổi, ngăn ngừa xung đột hoàn hảo."
      },
      {
        "id": "q4",
        "question": "Để xóa vĩnh viễn toàn bộ các mẩu stash đang lưu trữ trong ngăn kéo mà không khôi phục, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git stash clear",
            "correct": true
          },
          {
            "text": "git stash drop --all-force",
            "correct": false
          },
          {
            "text": "git reset --stash",
            "correct": false
          },
          {
            "text": "git remove --stashes",
            "correct": false
          }
        ],
        "explanation": "`git stash clear` dọn sạch 100% tất cả các mẩu stash đang có trong kho lưu trữ cục bộ."
      }
    ]
  }
};
export default lesson;
