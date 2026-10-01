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
      "Hiểu reflog ghi nhận các lần cập nhật ref và xem đường dẫn log bằng Git.",
      "Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.",
      "Dùng git reflog để tìm một commit cũ, kiểm tra nó và neo bằng nhánh mới."
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
      "git reflog",
      "git rev-parse --git-path logs/HEAD",
      "git log -g"
    ]
  },
  "content": "# Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu reflog ghi lại một số lần di chuyển của HEAD và cập nhật ref ở local.\n- Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.\n- Dùng `git reflog` để tìm commit cũ và neo lại bằng nhánh sau khi kiểm tra.\n- Hiểu thời hạn mặc định và lý do reflog không phải bản sao lưu.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Reflog\n- **Nói dễ hiểu**: Nhật ký local ghi nhận các lần ref được cập nhật; reflog `HEAD` cũng ghi nhận HEAD chuyển giữa các vị trí.\n- **Ví dụ**: `git reflog` hiển thị các lần cập nhật gần đây dưới tên như `HEAD@{0}` và `HEAD@{1}`.\n- **Đừng nhầm**: Reflog không phải một phần của lịch sử commit gửi bằng push. Nó chỉ có tác dụng ở repository đang giữ nhật ký đó; reflog có thể không được bật ở mọi repo.\n\n### Reflog expiration\n- **Nói dễ hiểu**: Quy tắc xác định khi nào bản ghi cũ có thể được xóa khỏi reflog.\n- **Ví dụ**: Git mặc định đặt thời hạn 90 ngày cho entry thông thường và 30 ngày cho entry unreachable; cấu hình có thể thay đổi các mốc này.\n- **Đừng nhầm**: Hết hạn reflog không đồng nghĩa object bị xóa đúng ngày đó. Garbage collection có thể dọn object unreachable sau đó; đừng dựa vào reflog làm backup.\n\n### Reflog entry selector\n- **Nói dễ hiểu**: Cú pháp như `HEAD@{1}` chọn một vị trí trong nhật ký HEAD.\n- **Ví dụ**: Sau khi xác định đúng commit trong `git reflog`, tạo nhánh bằng `git branch rescue 'HEAD@{1}'`.\n- **Đừng nhầm**: Entry mới nhất không nhất thiết là commit muốn tìm. Hãy đọc log và kiểm tra commit trước khi tạo nhánh hoặc reset.\n\n---\n\n## 📖 Định nghĩa\nReflog là nhật ký local về các lần cập nhật ref. `git log` đi theo lịch sử commit trong đồ thị; `git reflog` cho biết một ref như HEAD đã từng trỏ tới đâu trong repository này. Khi reflog được bật, Git thường ghi entry cho các cập nhật như commit, switch/checkout, merge, rebase hoặc reset. Đường dẫn vật lý được quyết định bởi Git directory; có thể xem bằng `git rev-parse --git-path logs/HEAD`.\n\n---\n\n## 💡 Tại sao cần\nNếu lỡ di chuyển một nhánh, reflog có thể giúp tìm commit trước đó dù commit ấy không còn xuất hiện trong `git log --all`. Cách an toàn là đọc `git reflog`, kiểm tra commit bằng `git show <object-id>`, rồi tạo nhánh cứu hộ. Mặc định Git dùng thời hạn 90 ngày cho entry thông thường và 30 ngày cho entry unreachable, nhưng cấu hình có thể khác và object có thể được garbage collection thu hồi. Reflog không bảo vệ thay đổi chưa commit và không thay thế backup.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng hộp đen ghi lại hành trình bay chuyên dụng của một chiếc máy bay trực thăng hiện đại. Chiếc trực thăng (HEAD) bay qua ngọn đồi A, đáp xuống đỉnh núi B rồi quay về trạm sân bay C. Dù bạn có xóa sạch lộ trình trên tấm bản đồ du lịch thông thường (`git log`), thì chiếc hộp đen (`.git/logs/HEAD`) vẫn ghi lại chính xác từng giây từng phút chiếc trực thăng đã ở tọa độ nào, xuất phát từ đâu và vì lý do cụ thể gì.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nGiản lược một dòng reflog:\n[old object ID] [new object ID] [committer identity + timestamp + timezone] TAB [action / message]\n\nVí dụ một dòng thực tế bên trong tệp .git/logs/HEAD:\n<old-id> <new-id> Nam <nam@dev.com> 1727654400 +0700<TAB>commit (initial): init\n<old-id> <new-id> Nam <nam@dev.com> 1727654500 +0700<TAB>commit: add login\n<old-id> <new-id> Nam <nam@dev.com> 1727654600 +0700<TAB>reset: moving to HEAD~1\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột người học lỡ chuyển nhánh khỏi commit cần giữ. Họ chạy `git reflog`, tìm entry có message chuyển nhánh phù hợp, rồi kiểm tra ID bằng `git show <object-id>`. Khi đã xác nhận đúng nội dung, họ dùng `git branch rescued-feature <object-id>` để giữ commit. Cách này tạo một ref mới mà không ghi đè nhánh hiện tại.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xem nhật ký gần đây của HEAD\ngit reflog\n\n# Kiểm tra một commit trước khi cứu hộ\ngit show <object-id>\n\n# Giữ commit bằng một nhánh mới sau khi đã xác nhận đúng\ngit branch rescue <object-id>\n\n# Xem đường dẫn Git dùng cho reflog HEAD\ngit rev-parse --git-path logs/HEAD\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog`: Hiển thị entry của HEAD theo thứ tự mới nhất trước, thường gồm selector, object ID và mô tả hành động.\n- `git show <object-id>`: Kiểm tra commit và nội dung trước khi quyết định phục hồi.\n- `git branch rescue <object-id>`: Tạo nhánh mới trỏ tới commit đã chọn, giữ nó reachable.\n- `git rev-parse --git-path logs/HEAD`: In ra đường dẫn reflog thực tế nếu reflog được tạo.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ reflog là lịch sử được chia sẻ**: Push/fetch chia sẻ commit và refs theo yêu cầu, không chia sẻ nhật ký reflog local.\n2. **Xem thời hạn mặc định như bảo đảm**: Config có thể khác; reflog hết hạn và object pruning là các việc liên quan nhưng không xảy ra theo một đồng hồ cố định duy nhất.\n3. **Chạy `reset --hard` theo selector chưa kiểm tra**: Trước hết xem entry, kiểm tra commit, rồi ưu tiên tạo nhánh cứu hộ để tránh ghi đè trạng thái hiện tại.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo repository thử nghiệm riêng và hai commit như lệnh dưới đây; đừng chạy reset trong repo dự án.\n   ```bash\n   mkdir git-reflog-lab\n   cd git-reflog-lab\n   git init\n   git config user.name \"Git Learner\"\n   git config user.email \"learner@example.com\"\n   printf \"first version\\n\" > note.txt\n   git add note.txt\n   git commit -m \"first test commit\"\n   printf \"second version\\n\" >> note.txt\n   git add note.txt\n   git commit -m \"second test commit\"\n   git reset --hard HEAD~1\n   ```\n2. **Bước 2**: Chạy `git reflog` và xác định entry trước reset (thường là `HEAD@{1}`); kiểm tra bằng `git show 'HEAD@{1}'`.\n3. **Bước 3**: Nếu đó là commit cần giữ, chạy `git branch rescue 'HEAD@{1}'`.\n4. **Bước 4**: Xác nhận bằng `git log rescue -1`. Những lệnh reset chỉ dùng trong repository lab mới.\n\n---\n\n## 💡 Hint & mẹo\n> Khi reflog được bật, từng ref có thể có log riêng. `git reflog show <ref>` là cách xem thuận tiện; đường dẫn vật lý có thể khác giữa loại repository và worktree.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- `git reflog` hiển thị những entry còn tồn tại của HEAD; danh sách phụ thuộc reflog có được bật và chưa hết hạn hay không.\n- Đã kiểm tra commit mục tiêu bằng `git show` trước khi neo bằng nhánh cứu hộ.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về cấu trúc và sức mạnh cứu hộ của Reflog qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để cấu hình thời gian sống của các mục Reflog lâu hơn mặc định thông qua thuộc tính `gc.reflogExpire` và `gc.reflogExpireUnreachable` trong tệp `.git/config`?\n\n---\n\n## 📝 Tổng kết\n- Reflog là nhật ký local của các lần cập nhật ref; `git reflog` giúp xem lịch sử HEAD.\n- Entry thô ghi old/new object ID cùng danh tính, thời gian và message; object ID không cố định độ dài.\n- Có thể dùng reflog để tìm commit cũ, nhưng thời hạn phụ thuộc config và reflog không phải backup.\n- Push/fetch không truyền reflog như một phần của lịch sử dự án.\n",
  "quiz": {
    "id": "quiz-08-git-internals-19-reflog-internals",
    "title": "Trắc nghiệm: Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào là cách thông thường để xem các lần cập nhật gần đây của HEAD?",
        "type": "single",
        "options": [
          {
            "text": "git reflog",
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
        "explanation": "`git reflog` đọc reflog của HEAD; vị trí vật lý do Git directory quyết định và có thể xem bằng `git rev-parse --git-path`."
      },
      {
        "id": "q2",
        "question": "Khi bạn chạy lệnh git push origin main, dữ liệu Reflog của bạn có được đẩy lên GitHub không?",
        "type": "single",
        "options": [
          {
            "text": "Không; push không gửi các entry reflog local như một phần của lịch sử dự án",
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
        "explanation": "Push gửi object và ref theo yêu cầu; nhật ký reflog ở repository local không phải dữ liệu được push lên remote."
      },
      {
        "id": "q3",
        "question": "Mỗi dòng bản ghi trong tệp .git/logs/HEAD chứa những trường thông tin chính nào?",
        "type": "single",
        "options": [
          {
            "text": "Old object ID, new object ID, danh tính committer, dấu thời gian và message hành động",
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
        "question": "Mặc định, Git đặt thời hạn cho reflog entry unreachable là bao lâu trước khi entry có thể hết hạn?",
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
        "explanation": "`gc.reflogExpireUnreachable` mặc định là 30 ngày; cấu hình có thể thay đổi và hết hạn entry không đồng nghĩa object bị xóa đúng ngày đó."
      },
      {
        "id": "q5",
        "question": "Tệp tin nhật ký .git/logs/HEAD khác gì so với các tệp tin trong .git/logs/refs/heads/?",
        "type": "single",
        "options": [
          {
            "text": "Reflog HEAD ghi cập nhật của HEAD; reflog một nhánh ghi cập nhật ref nhánh đó, không chỉ commit mới",
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
        "explanation": "HEAD và ref nhánh là các refs riêng nên reflog của chúng có thể ghi nhận các cập nhật khác nhau; reflog phụ thuộc cấu hình và retention."
      }
    ]
  }
};
export default lesson;
