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
      "Cất thay đổi tracked và, với `-u`, file untracked bằng `git stash`.",
      "Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).",
      "Đặt lời nhắc stash bằng `-m` và phân biệt `apply` với `pop`.",
      "Biết `-a` gồm file ignored; `stash branch` là tính năng Git thật chưa mô phỏng."
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
      "stash untracked",
      "ngan ke tam thoi"
    ],
    "commands": [
      "git stash push -u -m \"<ghi-chú-mô-tả>\"",
      "git stash list",
      "git stash apply stash@{n}",
      "git stash pop",
      "git stash drop stash@{n}"
    ]
  },
  "content": "# git stash nâng cao\n\n---\n\n## 🎯 Mục tiêu\n- Dùng stash để cất thay đổi tracked; biết cách thêm file untracked bằng `-u`.\n- Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).\n- Đặt ghi chú bằng `-m`, áp dụng stash nhiều lần bằng `apply`, hoặc lấy ra bằng `pop`.\n- Biết `-a` còn đưa file ignored vào stash; `stash branch` là lệnh Git thật, chưa được mô phỏng trong khóa học.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git stash push -u\n- **Nói dễ hiểu**: Lệnh cất toàn bộ code dở dang vào ngăn kéo bao gồm cả các file mới tạo chưa từng add vào Git.\n- **Ví dụ**: `git stash push -u -m \"WIP: auth module\"` để cất sạch sẽ mọi thay đổi kèm file mới.\n- **Đừng nhầm**: Mặc định `git stash` không cất file untracked. Thêm `-u` nếu muốn đưa cả các file mới chưa được theo dõi vào stash.\n\n### stash pop vs apply\n- **Nói dễ hiểu**: `pop` lấy code ra khỏi ngăn kéo và xóa luôn mục đó; `apply` lấy code ra nhưng vẫn giữ bản sao trong ngăn kéo.\n- **Ví dụ**: Dùng `git stash apply` khi muốn thử nghiệm cùng một mẩu code trên nhiều nhánh khác nhau.\n- **Đừng nhầm**: Nếu dùng `pop` mà bị conflict, Git sẽ giữ lại mẩu stash để bạn không bị mất dữ liệu.\n\n### git stash branch\n- **Nói dễ hiểu**: Lệnh tạo một nhánh mới tinh xuất phát từ đúng mốc commit lúc bạn tạo stash và bung code vào đó.\n- **Ví dụ**: `git stash branch test-feature stash@{0}` để thử nghiệm an toàn tránh xung đột với nhánh hiện tại.\n- **Đừng nhầm**: Không tạo nhánh từ HEAD hiện tại; lệnh quay về commit gốc nơi bạn bắt đầu cất stash.\n\n---\n\n## 📖 Định nghĩa\n`git stash` cất thay đổi staged và unstaged trên file tracked để làm sạch phần công việc đó. Mặc định, file untracked không được cất; thêm `-u` để gồm file untracked, hoặc `-a` để gồm cả file ignored. Dùng `-m` để đặt lời nhắc. Nếu áp dụng stash gây conflict, Git thật thường giữ entry lại để bạn xử lý.\n\n---\n\n## 💡 Tại sao cần\nKhi đang sửa một tính năng thì cần chuyển sang nhánh khác, bạn có thể commit tạm, dùng worktree, hoặc cất thay đổi bằng `git stash`. Stash tiện khi chưa muốn tạo commit; lưu ý file untracked cần `-u`, và khi áp dụng lại có thể phát sinh conflict.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung mặt bàn làm việc của bạn đang bày bừa cọ vẽ và bức tranh đang vẽ dở (Working Tree). Khách quý bất ngờ bước vào phòng cần ký hợp đồng gấp. Bạn nhẹ nhàng bê toàn bộ tranh và cọ cất vào chiếc ngăn kéo có khóa dưới bàn (`git stash push -u -m \"hoàng hôn\"`). Bàn sạch bóng, bạn tiếp khách xong xuôi rồi mở ngăn kéo mang tranh ra vẽ tiếp (`git stash pop`).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ cấu hoạt động của ngăn xếp Stash (LIFO - Last In, First Out):\nstash@{0}: \"WIP: refactor auth module\" (Mới nhất)\nstash@{1}: \"WIP: improve cart css\"\nstash@{2}: \"WIP: experiment with graphql\" (Cũ nhất)\n\nThao tác pop:   Lấy stash@{0} ra áp dụng vào Working Tree và XÓA khỏi danh sách.\nThao tác apply: Lấy stash@{0} ra áp dụng nhưng VẪN GIỮ lại trong danh sách.\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Trang đang thêm 3 file mới và sửa 2 file tính năng QR code thì nhận cuộc gọi sửa gấp lỗi đăng nhập. Trang chạy: `git stash push -u -m \"WIP: QR payment integration\"`. Cờ `-u` giúp cất gọn cả 3 file mới tạo. Trang chuyển nhánh hotfix sửa xong, quay lại nhánh cũ gõ `git stash pop`. Toàn bộ không gian làm việc sống động trở lại nguyên vẹn không thiếu một dòng code.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit stash push -u -m \"<ghi-chú-mô-tả>\"\ngit stash list\ngit stash apply stash@{n}\ngit stash pop\ngit stash drop stash@{n}\n```\n\n`git stash branch <nhánh-mới> stash@{n}` cũng có trong Git thật để tạo nhánh từ điểm gốc của stash rồi áp dụng stash; simulator hiện chưa hỗ trợ lệnh này. `git stash -a` và `--index` có thể dùng trong Git thật; simulator hỗ trợ `-a`, còn `--index` chỉ khôi phục staging ở trường hợp đơn giản.\n\n---\n\n## 🔍 Giải thích command\n- `git stash push -u -m \"<msg>\"`: Lưu tạm kèm thông điệp mô tả và bao gồm cả các tệp untracked.\n- `git stash list`: Liệt kê toàn bộ các mẩu stash đang được lưu trữ trong ngăn xếp.\n- `git stash pop`: Áp dụng mẩu stash gần nhất vào thư mục làm việc và tự động xóa nó khỏi ngăn kéo.\n- `git stash apply stash@{n}`: Áp dụng mẩu stash chỉ định nhưng vẫn bảo lưu nó trong ngăn kéo.\n- `git stash branch <tên>`: Tạo một nhánh mới tinh xuất phát từ mốc commit ban đầu và áp dụng stash vào đó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ -u khi có file mới tạo**: Khiến các tệp untracked bị bỏ sót lại trên Working Tree và gây lỗi khi chuyển nhánh.\n2. **Cho rằng `pop` xóa stash dù có conflict**: Nếu Git thật không áp dụng được stash hoàn toàn, entry có thể vẫn còn; kiểm tra bằng `git stash list`.\n3. **Dùng `drop` trước khi kiểm tra**: `drop` xóa entry khỏi danh sách; hãy chắc chắn không cần nội dung đó nữa.\n\n---\n\n## 🧪 Lab thực hành\n1. Tạo commit nền có `tracked.txt` với nội dung `base`: chạy `echo \"base\" > tracked.txt`, `git add tracked.txt`, `git commit -m \"base\"`.\n2. Đổi `tracked.txt` thành `work`, tạo `new-feature.txt`, rồi chạy `git stash push -u -m \"demo stash untracked\"`.\n3. Chạy `git status`: thay đổi tracked đã được cất, file mới cũng được dọn khỏi Working Tree.\n4. Chạy `git stash list` để xem lời nhắc.\n5. Chạy `git stash apply stash@{0}` rồi `git stash list`: thay đổi trở lại nhưng stash vẫn còn.\n6. Sau khi xác nhận file đúng, chạy `git stash pop stash@{0}`. Kiểm tra nội dung hai file và xác nhận entry đã bị gỡ khỏi danh sách.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn thêm cờ `-u` khi stash để không bỏ sót các tệp tin mới tạo chưa được Git theo dõi.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Danh sách `git stash list` hiển thị rõ thông điệp mô tả nội dung công việc.\n- `-u` đã cất cả file mới; `apply` khôi phục mà vẫn giữ entry, còn `pop` khôi phục rồi gỡ entry khi áp dụng thành công.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ git stash nâng cao.\n\n---\n\n## 🚀 Thử thách nâng cao\nSử dụng `git stash branch test-branch` để bung một mẩu stash cũ vào một nhánh độc lập mà không lo xung đột với các commit mới trên nhánh hiện tại.\n\n---\n\n## 📝 Tổng kết\n- `git stash push -u -m` giúp lưu trữ cả tệp untracked kèm thông điệp mô tả rõ ràng.\n- Phân biệt `pop` (áp dụng và xóa) với `apply` (áp dụng và giữ lại dự phòng).\n- `git stash branch` giải quyết xung đột bằng cách tạo nhánh mới an toàn từ mốc stash ban đầu.\n",
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
        "explanation": "Mặc định stash không cất untracked files. Dùng `-u` khi bạn muốn cất cả các file mới chưa được theo dõi."
      },
      {
        "id": "q2",
        "question": "Sự khác biệt cốt lõi giữa `git stash pop` và `git stash apply` là gì?",
        "type": "single",
        "options": [
          {
            "text": "pop xóa entry sau khi áp dụng thành công; apply giữ entry lại",
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
        "explanation": "`pop` gỡ entry sau khi áp dụng thành công; nếu có conflict, entry được giữ lại. `apply` luôn giữ entry để bạn có thể dùng lại."
      },
      {
        "id": "q3",
        "question": "Lệnh nào cất cả thay đổi đã theo dõi lẫn file untracked vào stash?",
        "type": "single",
        "options": [
          {
            "text": "git stash push -u -m \"work in progress\"",
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
        "explanation": "`-u` (hoặc `--include-untracked`) thêm file untracked vào stash. Simulator hỗ trợ tùy chọn này; `stash branch` cần dùng Git thật."
      },
      {
        "id": "q4",
        "question": "Để xóa một entry cụ thể khỏi stash list mà không khôi phục thay đổi, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git stash drop stash@{0}",
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
        "explanation": "`git stash drop stash@{0}` xóa entry đầu tiên khỏi danh sách stash mà không áp dụng các thay đổi của entry đó."
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
