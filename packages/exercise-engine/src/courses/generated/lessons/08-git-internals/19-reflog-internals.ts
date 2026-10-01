import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "19-reflog-internals",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "19-reflog-internals",
    "title": "Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "18-refspec-and-remotes"
    ],
    "objectives": [
      "Giải mã cấu trúc bên trong thư mục nhật ký .git/logs/ (gồm logs/HEAD và logs/refs/heads/).",
      "Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.",
      "Sử dụng kiến thức Reflog Internals để giải cứu mã nguồn khi mọi lệnh Porcelain đều từ chối hoạt động."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "reflog internals",
      "git logs directory",
      "history of heads",
      "recovery safety net",
      "commit salvage"
    ],
    "commands": [
      "cat .git/logs/HEAD",
      "git reflog",
      "git log -g"
    ]
  },
  "content": "# Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)\n\n---\n\n## 🎯 Mục tiêu\n- Giải mã cấu trúc bên trong thư mục nhật ký `.git/logs/` (gồm `logs/HEAD` và `logs/refs/heads/`).\n- Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.\n- Sử dụng kiến thức Reflog Internals để giải cứu mã nguồn khi mọi lệnh Porcelain đều từ chối hoạt động.\n- Nắm vững chu kỳ sống (retention period) và cơ chế dọn dẹp của Reflog.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Reference Log (.git/logs/HEAD)\n- **Nói dễ hiểu**: Tệp nhật ký văn bản tuần tự ghi lại mọi bước dịch chuyển của con trỏ HEAD trên máy tính cục bộ của bạn.\n- **Ví dụ**: Mỗi khi bạn gõ `git commit`, `git checkout`, `git switch`, `git reset`, một dòng mới được nối thêm vào tệp này.\n- **Đừng nhầm**: Không bao giờ được đẩy (push) lên GitHub; đây là nhật ký riêng tư 100% của máy tính cá nhân bạn.\n\n### Reflog Retention Period (gc.reflogExpire)\n- **Nói dễ hiểu**: Thời hạn Git lưu giữ các bản ghi nhật ký trước khi tiến trình thu gom rác tự động dọn dẹp.\n- **Ví dụ**: Mặc định lưu 90 ngày cho các commit còn tiếp cận được và 30 ngày cho các commit mồ côi (unreachable).\n- **Đừng nhầm**: Không phải vĩnh viễn; sau 30 ngày commit mồ côi không có nhánh nào neo giữ có thể bị xóa vĩnh viễn bởi `git gc`.\n\n### Local Safety Net\n- **Nói dễ hiểu**: Tấm lưới bảo hiểm an toàn tối thượng giúp phục hồi các commit tưởng như đã bị xóa vĩnh viễn sau khi lỡ tay reset hard.\n- **Ví dụ**: Dùng cú pháp `HEAD@{1}` hoặc mã băm ghi trong reflog để tạo nhánh cứu hộ.\n- **Đừng nhầm**: Chỉ cứu được những gì bạn ĐÃ TỪNG COMMIT; các tệp chưa commit nằm trong working directory nếu bị xóa sẽ không có trong reflog.\n\n---\n\n## 📖 Định nghĩa\nReflog (viết tắt của Reference Log - Nhật ký tham chiếu) là một hệ thống tệp tin nhật ký tuần tự nằm bên trong thư mục `.git/logs/`. Khác với `git log` ghi lại lịch sử tiến hóa của các commit trong dự án, Reflog ghi lại toàn bộ lịch sử di chuyển của các con trỏ tham chiếu (đặc biệt là con trỏ HEAD và các nhánh cục bộ) trên chính máy tính của bạn. Mỗi khi con trỏ HEAD thay đổi tọa độ (do commit, checkout, switch, rebase, merge hay reset), một dòng văn bản mới sẽ được nối thêm vào tệp `.git/logs/HEAD`.\n\n---\n\n## 💡 Tại sao cần\nReflog là tấm lưới bảo hiểm an toàn tối thượng của Git. Khi một lập trình viên vô tình gõ `git reset --hard` hay lỡ tay rebase làm mất các commit quan trọng, lịch sử thông thường (`git log`) sẽ không còn hiển thị những commit đó nữa. Nhưng vì con trỏ HEAD từng đi qua commit đó trong quá khứ, tọa độ mã băm SHA-1 của nó vẫn được ghi lại sắc nét bên trong tệp nhật ký `.git/logs/HEAD`. Nhờ Reflog, hầu như không có gì có thể thực sự biến mất khỏi Git trong vòng 30 đến 90 ngày.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng hộp đen ghi lại hành trình bay chuyên dụng của một chiếc máy bay trực thăng hiện đại. Chiếc trực thăng (HEAD) bay qua ngọn đồi A, đáp xuống đỉnh núi B rồi quay về trạm sân bay C. Dù bạn có xóa sạch lộ trình trên tấm bản đồ du lịch thông thường (`git log`), thì chiếc hộp đen (`.git/logs/HEAD`) vẫn ghi lại chính xác từng giây từng phút chiếc trực thăng đã ở tọa độ nào, xuất phát từ đâu và vì lý do cụ thể gì.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nGiải phẫu cấu trúc tệp nhật ký .git/logs/HEAD:\n[Old SHA-1 (40B)] [New SHA-1 (40B)] [Committer Name <Email> Timestamp TZ] [Action / Message]\n\nVí dụ một dòng thực tế bên trong tệp .git/logs/HEAD:\n0000000000000000000000000000000000000000 7a8b9c4d Nam <nam@dev.com> 1727654400 +0700 commit (initial): init\n7a8b9c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b c5d4e3f2 Nam <nam@dev.com> 1727654500 +0700 commit: add login\nc5d4e3f2a1b09876543210fedcba9876543210fe 7a8b9c4d Nam <nam@dev.com> 1727654600 +0700 reset: moving to HEAD~1\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư trong lúc xử lý xung đột rebase đã bấm nhầm phím và làm mất toàn bộ nhánh tính năng của hai tuần làm việc. Lệnh `git log` chỉ hiển thị nhánh main cũ kỹ. Kỹ sư không hề nao núng, mở terminal và sử dụng lệnh đọc trực tiếp: `cat .git/logs/HEAD`. Trước mắt kỹ sư hiện ra danh sách toàn bộ các thao tác gần nhất kèm theo lý do rõ ràng. Dòng thứ 3 từ dưới lên ghi rõ: `7a8b9c4d 3b18e5a1 checkout: moving from feature to main`. Kỹ sư lập tức sao chép mã băm `3b18e5a1` và gõ lệnh: `git switch -c rescued-feature 3b18e5a1`. Nhánh tính năng được phục sinh hoàn hảo từng dòng code trong sự thán phục của toàn bộ đồng nghiệp trong phòng.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Đọc trực tiếp tệp nhật ký thô của con trỏ HEAD\ncat .git/logs/HEAD\n\n# Xem danh sách reflog định dạng thân thiện\ngit reflog\n\n# Xem nhật ký chuyển dịch riêng của nhánh main\ncat .git/logs/refs/heads/main\n\n# Khôi phục trạng thái ngay trước thao tác gần nhất\ngit reset --hard HEAD@{1}\n```\n\n---\n\n## 🔍 Giải thích command\n- `cat .git/logs/HEAD`: Hiển thị từng dòng bản ghi nhật ký gồm old-sha, new-sha, committer, timestamp và action description.\n- `git reflog`: Giao diện dòng lệnh thân thiện đánh số các mục dạng `HEAD@{0}`, `HEAD@{1}` để dễ thao tác.\n- `cat .git/logs/refs/heads/main`: Tệp nhật ký riêng chỉ ghi nhận những lần nhánh `main` được cập nhật commit.\n- `git reset --hard HEAD@{1}`: Quay ngược con trỏ về vị trí ngay trước bước vừa thực hiện.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Reflog được push lên GitHub**: Reflog là dữ liệu cục bộ 100% trên máy tính cá nhân của bạn, không bao giờ được đồng bộ qua remote server.\n2. **Để quá thời hạn lưu trữ**: Sau 30 ngày các commit mồ côi không có nhánh nào trỏ tới sẽ bị tiến trình `git gc` dọn dẹp vĩnh viễn.\n3. **Tự ý xóa thư mục `.git/logs/`**: Việc này làm mất đi chiếc phao cứu sinh duy nhất khi bạn lỡ tay thực hiện sai lệnh reset hay rebase.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Mở terminal và chạy lệnh `cat .git/logs/HEAD` để xem nội dung nhật ký chuyển dịch thô của con trỏ HEAD.\n2. **Bước 2**: Thực hiện chuyển nhánh `git switch -c temp-branch` rồi tạo một commit mới.\n3. **Bước 3**: Chạy lại `cat .git/logs/HEAD` để quan sát 2 dòng mới xuất hiện ghi lại hành vi checkout và commit.\n4. **Bước 4**: Chạy `git reflog` và đối chiếu định dạng hiển thị với nội dung tệp thô trong thư mục logs.\n\n---\n\n## 💡 Hint & mẹo\n> Mỗi nhánh cục bộ đều có tệp nhật ký riêng trong thư mục `.git/logs/refs/heads/<branch-name>`. Bạn có thể đọc trực tiếp các tệp này để theo dõi tiến độ công việc của từng nhánh.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tệp `.git/logs/HEAD` ghi nhận chi tiết chuỗi hành vi với định dạng chuẩn gồm mã băm cũ, mã băm mới và mô tả hành động.\n- Lệnh `git reflog` phản ánh chính xác các bước chuyển đổi tương ứng.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về cấu trúc và sức mạnh cứu hộ của Reflog qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để cấu hình thời gian sống của các mục Reflog lâu hơn mặc định thông qua thuộc tính `gc.reflogExpire` và `gc.reflogExpireUnreachable` trong tệp `.git/config`?\n\n---\n\n## 📝 Tổng kết\n- Reflog là tệp nhật ký cục bộ ghi lại mọi sự di chuyển của con trỏ HEAD và các nhánh.\n- Lưu trữ trong `.git/logs/HEAD` dưới dạng các dòng văn bản thuần ghi nhận old-hash, new-hash và hành động.\n- Là công cụ cứu hộ dữ liệu mạnh mẽ nhất của Git, giúp phục hồi mọi commit bị mất trong vòng 30 đến 90 ngày.\n- Reflog hoàn toàn mang tính cục bộ và không bao giờ bị lộ ra ngoài khi chia sẻ qua remote.\n",
  "quiz": {
    "id": "quiz-08-git-internals-19-reflog-internals",
    "title": "Trắc nghiệm: Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)",
    "questions": [
      {
        "id": "q1",
        "question": "Dữ liệu Reflog được lưu trữ vật lý trong thư mục nào của kho lưu trữ?",
        "type": "single",
        "options": [
          {
            "text": ".git/logs/",
            "correct": true
          },
          {
            "text": ".git/history/",
            "correct": false
          },
          {
            "text": ".git/records/",
            "correct": false
          },
          {
            "text": ".git/backups/",
            "correct": false
          }
        ],
        "explanation": "Toàn bộ các tệp nhật ký tham chiếu được lưu trữ ngăn nắp trong thư mục .git/logs/."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh git push origin main, dữ liệu Reflog của bạn có được đẩy lên GitHub không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không, Reflog là dữ liệu riêng tư cục bộ 100% trên máy tính của bạn",
            "correct": true
          },
          {
            "text": "Có, toàn bộ lịch sử reflog được đồng bộ lên server",
            "correct": false
          },
          {
            "text": "Chỉ các mục reflog của ngày hôm nay mới được gửi",
            "correct": false
          },
          {
            "text": "Chỉ đẩy lên nếu có cờ --force",
            "correct": false
          }
        ],
        "explanation": "Reflog chỉ ghi lại hành vi di chuyển con trỏ trên máy cá nhân, không thuộc về lịch sử chung của dự án nên không bao giờ được push."
      },
      {
        "id": "q3",
        "question": "Mỗi dòng bản ghi trong tệp .git/logs/HEAD chứa những trường thông tin chính nào?",
        "type": "single",
        "options": [
          {
            "text": "Old SHA-1, New SHA-1, Thông tin người thực hiện, Dấu thời gian, và Lý do hành động",
            "correct": true
          },
          {
            "text": "Toàn bộ nội dung các tệp tin mã nguồn",
            "correct": false
          },
          {
            "text": "Mật khẩu đăng nhập máy tính",
            "correct": false
          },
          {
            "text": "Địa chỉ IP của người dùng",
            "correct": false
          }
        ],
        "explanation": "Cấu trúc tệp nhật ký ghi rõ mã băm trước và sau khi di chuyển, ai làm, vào lúc nào và hành động là gì (commit, checkout, rebase v.v.)."
      },
      {
        "id": "q4",
        "question": "Thời gian lưu trữ mặc định của các mục Reflog không thể tiếp cận (unreachable) trước khi bị dọn rác là bao lâu?",
        "type": "single",
        "options": [
          {
            "text": "30 ngày",
            "correct": true
          },
          {
            "text": "1 ngày",
            "correct": false
          },
          {
            "text": "365 ngày",
            "correct": false
          },
          {
            "text": "Vĩnh viễn không bao giờ xóa",
            "correct": false
          }
        ],
        "explanation": "Git cấu hình mặc định thời gian hết hạn cho các mục không thể tiếp cận là 30 ngày (gc.reflogExpireUnreachable)."
      },
      {
        "id": "q5",
        "question": "Tệp tin nhật ký .git/logs/HEAD khác gì so với các tệp tin trong .git/logs/refs/heads/?",
        "type": "single",
        "options": [
          {
            "text": ".git/logs/HEAD ghi lại mọi sự di chuyển của con trỏ HEAD (kể cả checkout giữa các nhánh), còn logs/refs/heads chỉ ghi khi nhánh đó có commit mới",
            "correct": true
          },
          {
            "text": ".git/logs/HEAD chỉ lưu trữ lỗi hệ thống",
            "correct": false
          },
          {
            "text": ".git/logs/HEAD tự động xóa mỗi khi tắt máy",
            "correct": false
          },
          {
            "text": "Hai nơi này chứa dữ liệu hoàn toàn giống hệt nhau",
            "correct": false
          }
        ],
        "explanation": "Tệp .git/logs/HEAD là cuốn nhật ký tổng thể ghi nhận mọi bước chân của bạn trong repo, trong khi từng tệp nhánh con chỉ ghi lại các cập nhật riêng của nhánh đó."
      }
    ]
  }
};
export default lesson;
