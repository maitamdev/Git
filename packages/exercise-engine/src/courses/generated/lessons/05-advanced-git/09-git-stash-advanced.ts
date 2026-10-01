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
  "content": "# git stash nâng cao\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ toàn diện hệ thống ngăn kéo tạm thời với các câu lệnh nâng cao của `git stash`.\n- Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).\n- Sử dụng các cờ quan trọng: `-u` (`--include-untracked`) và `-a` (`--all`) để lưu cả tệp mới và tệp bị bỏ qua.\n- Đặt tên mô tả tường minh cho từng mẩu stash và tạo nhánh mới trực tiếp từ một mẩu stash.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git stash push -u\n- **Nói dễ hiểu**: Lệnh cất toàn bộ code dở dang vào ngăn kéo bao gồm cả các file mới tạo chưa từng add vào Git.\n- **Ví dụ**: `git stash push -u -m \"WIP: auth module\"` để cất sạch sẽ mọi thay đổi kèm file mới.\n- **Đừng nhầm**: Mặc định `git stash` bỏ quên file mới tạo; bắt buộc phải có cờ `-u` để không sót file.\n\n### stash pop vs apply\n- **Nói dễ hiểu**: `pop` lấy code ra khỏi ngăn kéo và xóa luôn mục đó; `apply` lấy code ra nhưng vẫn giữ bản sao trong ngăn kéo.\n- **Ví dụ**: Dùng `git stash apply` khi muốn thử nghiệm cùng một mẩu code trên nhiều nhánh khác nhau.\n- **Đừng nhầm**: Nếu dùng `pop` mà bị conflict, Git sẽ giữ lại mẩu stash để bạn không bị mất dữ liệu.\n\n### git stash branch\n- **Nói dễ hiểu**: Lệnh tạo một nhánh mới tinh xuất phát từ đúng mốc commit lúc bạn tạo stash và bung code vào đó.\n- **Ví dụ**: `git stash branch test-feature stash@{0}` để thử nghiệm an toàn tránh xung đột với nhánh hiện tại.\n- **Đừng nhầm**: Không tạo nhánh từ HEAD hiện tại; lệnh quay về commit gốc nơi bạn bắt đầu cất stash.\n\n---\n\n## 📖 Định nghĩa\n`git stash` nâng cao là bộ công cụ quản lý ngăn kéo tạm thời chuyên sâu trong Git, cho phép bạn dọn sạch Working Directory ngay lập tức bằng cách cất giữ toàn bộ trạng thái dở dang (cả tệp đã staged, chưa staged và tệp mới untracked) vào ngăn xếp có tổ chức để tự do chuyển nhánh làm việc mà không cần tạo commit nháp.\n\n---\n\n## 💡 Tại sao cần\nKhi đang viết tính năng phức tạp với code dở dang chưa thể chạy được, bạn bất ngờ nhận yêu cầu sửa lỗi khẩn cấp trên nhánh khác trong 15 phút. Bạn không thể commit code dở vì sẽ làm bẩn lịch sử, cũng không thể chuyển nhánh vì Git sẽ chặn. `git stash` nâng cao giúp bạn cất toàn bộ code vào ngăn kéo trong một giây để chuyển nhánh an toàn.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung mặt bàn làm việc của bạn đang bày bừa cọ vẽ và bức tranh đang vẽ dở (Working Tree). Khách quý bất ngờ bước vào phòng cần ký hợp đồng gấp. Bạn nhẹ nhàng bê toàn bộ tranh và cọ cất vào chiếc ngăn kéo có khóa dưới bàn (`git stash push -u -m \"hoàng hôn\"`). Bàn sạch bóng, bạn tiếp khách xong xuôi rồi mở ngăn kéo mang tranh ra vẽ tiếp (`git stash pop`).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ cấu hoạt động của ngăn xếp Stash (LIFO - Last In, First Out):\nstash@{0}: \"WIP: refactor auth module\" (Mới nhất)\nstash@{1}: \"WIP: improve cart css\"\nstash@{2}: \"WIP: experiment with graphql\" (Cũ nhất)\n\nThao tác pop:   Lấy stash@{0} ra áp dụng vào Working Tree và XÓA khỏi danh sách.\nThao tác apply: Lấy stash@{0} ra áp dụng nhưng VẪN GIỮ lại trong danh sách.\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Trang đang thêm 3 file mới và sửa 2 file tính năng QR code thì nhận cuộc gọi sửa gấp lỗi đăng nhập. Trang chạy: `git stash push -u -m \"WIP: QR payment integration\"`. Cờ `-u` giúp cất gọn cả 3 file mới tạo. Trang chuyển nhánh hotfix sửa xong, quay lại nhánh cũ gõ `git stash pop`. Toàn bộ không gian làm việc sống động trở lại nguyên vẹn không thiếu một dòng code.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit stash push -u -m \"<ghi-chú-mô-tả>\"\ngit stash list\ngit stash apply stash@{n}\ngit stash pop\ngit stash drop stash@{n}\ngit stash branch <nhánh-mới> stash@{n}\n```\n\n---\n\n## 🔍 Giải thích command\n- `git stash push -u -m \"<msg>\"`: Lưu tạm kèm thông điệp mô tả và bao gồm cả các tệp untracked.\n- `git stash list`: Liệt kê toàn bộ các mẩu stash đang được lưu trữ trong ngăn xếp.\n- `git stash pop`: Áp dụng mẩu stash gần nhất vào thư mục làm việc và tự động xóa nó khỏi ngăn kéo.\n- `git stash apply stash@{n}`: Áp dụng mẩu stash chỉ định nhưng vẫn bảo lưu nó trong ngăn kéo.\n- `git stash branch <tên>`: Tạo một nhánh mới tinh xuất phát từ mốc commit ban đầu và áp dụng stash vào đó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ -u khi có file mới tạo**: Khiến các tệp untracked bị bỏ sót lại trên Working Tree và gây lỗi khi chuyển nhánh.\n2. **Không đặt tên mô tả cho stash**: Khiến danh sách stash chứa hàng chục mục vô danh khó phân biệt sau vài ngày.\n3. **Quên dọn dẹp các mẩu stash cũ**: Để tồn đọng quá nhiều stash rác rưởi không còn dùng làm rối danh sách kiểm tra.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cất giữ và khôi phục stash nâng cao trên terminal.\n1. Tạo một tệp mới `new-feature.txt` và chỉnh sửa một tệp có sẵn.\n2. Chạy lệnh `git stash push -u -m \"demo stash untracked\"` để cất toàn bộ.\n3. Gõ `git status` xác nhận Working Tree sạch sẽ.\n4. Chạy `git stash list` để xem thông điệp mô tả trong danh sách.\n5. Chạy `git stash pop` để hồi phục lại đầy đủ cả tệp mới và tệp sửa đổi.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn thêm cờ `-u` khi stash để không bỏ sót các tệp tin mới tạo chưa được Git theo dõi.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Danh sách `git stash list` hiển thị rõ thông điệp mô tả nội dung công việc.\n- Toàn bộ file sửa đổi và file mới được phục hồi đầy đủ vào Working Directory sau khi pop.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ git stash nâng cao.\n\n---\n\n## 🚀 Thử thách nâng cao\nSử dụng `git stash branch test-branch` để bung một mẩu stash cũ vào một nhánh độc lập mà không lo xung đột với các commit mới trên nhánh hiện tại.\n\n---\n\n## 📝 Tổng kết\n- `git stash push -u -m` giúp lưu trữ cả tệp untracked kèm thông điệp mô tả rõ ràng.\n- Phân biệt `pop` (áp dụng và xóa) với `apply` (áp dụng và giữ lại dự phòng).\n- `git stash branch` giải quyết xung đột bằng cách tạo nhánh mới an toàn từ mốc stash ban đầu.\n",
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
      },
      {
        "id": "q5",
        "question": "Cú pháp chuẩn hiện đại nào giúp bạn lưu stash kèm theo thông điệp mô tả rõ ràng để dễ nhận diện trong `git stash list`?",
        "type": "single",
        "options": [
          {
            "text": "git stash push -m \"thông điệp mô tả công việc\"",
            "correct": true
          },
          {
            "text": "git stash commit -m \"thông điệp mô tả\"",
            "correct": false
          },
          {
            "text": "git stash tag \"tên nhãn\"",
            "correct": false
          },
          {
            "text": "git stash label \"tên nhãn\"",
            "correct": false
          }
        ],
        "explanation": "Cú pháp `git stash push -m '<message>'` gắn nhãn ghi chú cho mẩu stash, giúp phân biệt dễ dàng giữa nhiều mẩu lưu tạm."
      }
    ]
  }
};
export default lesson;
