import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-tracking-branch",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "08-tracking-branch",
    "title": "Nhánh theo dõi Tracking Branch",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "07-git-push"
    ],
    "objectives": [
      "Hiểu quan hệ upstream giữa nhánh local và remote-tracking branch.",
      "Phân biệt nhánh local, remote-tracking ref và nhánh trên máy chủ.",
      "Đọc trạng thái ahead/behind so với thông tin fetch gần nhất.",
      "Thiết lập hoặc thay đổi quan hệ upstream tracking cho một nhánh cục bộ bất kỳ."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "tracking branch",
      "upstream branch",
      "ahead behind",
      "remote tracking",
      "dong bo nhanh"
    ],
    "commands": [
      "git status",
      "git branch -vv",
      "git branch -u origin/<tên-nhánh>",
      "git branch --unset-upstream"
    ]
  },
  "content": "# Nhánh theo dõi Tracking Branch\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và cơ chế hoạt động của Tracking Branch (Nhánh theo dõi) trong Git.\n- Phân biệt rõ ràng giữa 3 loại nhánh: Nhánh cục bộ, Nhánh theo dõi từ xa (`origin/main`), và Nhánh thực tế trên server.\n- Đọc hiểu và giải thích ý nghĩa các trạng thái so sánh: `ahead`, `behind`, và `diverged`.\n- Thiết lập hoặc thay đổi quan hệ upstream tracking cho một nhánh cục bộ bất kỳ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### upstream — nhánh được theo dõi\n- **Nói dễ hiểu**: Cấu hình liên kết một nhánh local với nhánh mà Git dùng làm mặc định cho lệnh như `status`, `pull` và `push`.\n- **Ví dụ**: Local `main` có upstream `origin/main`.\n- **Đừng nhầm**: Remote-tracking branch `origin/main` là một ref cục bộ phản ánh lần fetch gần nhất; upstream là quan hệ cấu hình của nhánh local.\n\n### ahead commit\n- **Nói dễ hiểu**: Số lượng commit bạn đã tạo trên máy tính cá nhân nhưng chưa đẩy lên máy chủ GitHub.\n- **Ví dụ**: `Your branch is ahead of 'origin/main' by 1 commit` nhắc bạn cần chạy `git push`.\n- **Đừng nhầm**: Không có nghĩa là server bị lỗi; chỉ là máy chủ chưa nhận được commit mới của bạn.\n\n### diverged branch\n- **Nói dễ hiểu**: Trạng thái nhánh bị phân kỳ khi cả bạn và server đều có những commit mới độc lập nhau.\n- **Ví dụ**: Bạn đi trước 1 commit (ahead 1) đồng thời server cũng có 2 commit mới của đồng nghiệp (behind 2).\n- **Đừng nhầm**: Không thể push thông thường ngay được; bạn phải chạy git pull để gộp hoặc rebase trước.\n\n---\n\n## 📖 Định nghĩa\nMột nhánh local có thể được cấu hình để theo dõi một remote-tracking branch, thường gọi là upstream. `git status` và `git branch -vv` dùng quan hệ này để báo ahead/behind so với thông tin đã fetch gần nhất. Đây không phải phép kiểm tra trực tiếp máy chủ.\n\n---\n\n## 💡 Tại sao cần\nUpstream giúp lệnh `git status` so sánh hai đầu và cho phép rút gọn `git push`/`git pull`. Không có upstream, bạn vẫn có thể làm việc; chỉ cần chỉ rõ remote và nhánh khi đồng bộ.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung hai vận động viên chạy trên hai làn song song. Trên tay bạn có đồng hồ GPS liên tục báo: \"Bạn đang chạy trước 2 bước\" (ahead 2), hoặc \"Bạn đang chạy sau 3 bước\" (behind 3). Chiếc đồng hồ đó chính là cơ chế Tracking Branch giúp bạn luôn biết mình cần đẩy hay kéo code.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCác trạng thái so sánh Tracking Branch:\nTrạng thái Up to date:\nLocal:   C1 ──► C2 ──► C3 (main)\nRemote:  C1 ──► C2 ──► C3 (origin/main)\n\nTrạng thái Ahead 1 (Bạn đi trước 1 commit):\nLocal:   C1 ──► C2 ──► C3 ──► C4 (main)\nRemote:  C1 ──► C2 ──► C3 (origin/main)\n\nTrạng thái Behind 1 (Server đi trước 1 commit):\nLocal:   C1 ──► C2 ──► C3 (main)\nRemote:  C1 ──► C2 ──► C3 ──► C5 (origin/main)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nLập trình viên Hà tạo commit mới trên nhánh main sau khi sửa xong giao diện. Gõ `git status`, terminal hiển thị rõ: \"Your branch is ahead of 'origin/main' by 1 commit\". Nhờ có liên kết tracking, Hà biết mình có commit chưa xuất bản và chỉ cần gõ `git push` ngắn gọn để đồng bộ hóa mã nguồn tức thì lên GitHub.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit status\ngit branch -vv\ngit branch -u origin/<tên-nhánh>\ngit branch --unset-upstream\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị trạng thái so sánh chi tiết giữa nhánh hiện tại và nhánh upstream (ahead/behind).\n- `git branch -vv`: Liệt kê tất cả các nhánh cục bộ kèm tên nhánh upstream và độ lệch ahead/behind.\n- `git branch -u origin/<nhánh>`: Thiết lập hoặc đổi liên kết upstream cho nhánh hiện tại.\n- `git branch --unset-upstream`: Gỡ bỏ mối quan hệ theo dõi upstream của nhánh hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Bối rối khi thấy thông báo behind**: Chỉ cần chạy `git pull` để lấy các commit mới của đồng nghiệp về máy.\n2. **Nhánh bị phân kỳ diverged**: Cả bạn và server đều có commit mới; cần pull về xử lý merge hoặc rebase trước khi push.\n3. **Nghĩ rằng git status tự động kết nối mạng**: Trạng thái so sánh dựa trên lần fetch gần nhất; hãy chạy `git fetch` trước để thông tin chuẩn xác nhất.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo commit và đối chiếu thông tin so sánh nhánh.\n1. Chạy `git branch -vv`. Nếu nhánh hiện tại chưa có upstream, Git sẽ không hiển thị tên nhánh upstream trong ngoặc vuông; đó là bình thường.\n2. Nếu kho mới chưa có commit, tạo commit đầu tiên trước bằng `git add README.md` rồi `git commit -m \"docs: start tracking practice\"`.\n3. Tạo nhánh `tracking-practice` bằng `git switch -c tracking-practice`, sửa một dòng README, rồi add và commit.\n4. Trong simulator, tạo remote giả `git remote add tracking-demo https://example.com/training/tracking-demo.git`, sau đó chạy `git push -u tracking-demo tracking-practice`. Với GitHub thật, chỉ dùng remote của kho thử nghiệm bạn có quyền ghi.\n5. Chạy `git branch -vv`, `git status`, rồi `git push` và xem lại `git status`. Trong simulator, remote này chỉ là dữ liệu giả lập.\n\n---\n\n## 💡 Hint & mẹo\n> Chạy `git fetch` trước khi cần so sánh với trạng thái mới nhất mà remote cung cấp. `git status` một mình không kết nối mạng.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Nếu upstream đã được thiết lập, `git branch -vv` hiển thị tên upstream; nếu chưa có, trường này để trống.\n- Hiểu và phân biệt chính xác ý nghĩa của các thông báo `ahead`, `behind` và `up to date`.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố kiến thức về Tracking Branch.\n\n---\n\n## 🚀 Thử thách nâng cao\nMở file `.git/config` và xem các dòng `[branch \"main\"]` có cấu hình `remote = origin` và `merge = refs/heads/main` để thấy cách Git ghi nhớ liên kết ngầm.\n\n---\n\n## 📝 Tổng kết\n- Tracking Branch liên kết nhánh cục bộ với nhánh remote-tracking tương ứng.\n- Cung cấp thông tin so sánh quý giá: `ahead` (cần push) và `behind` (cần pull).\n- Cho phép sử dụng các cú pháp rút gọn `git push` và `git pull` tiện lợi và an toàn.\n",
  "quiz": {
    "id": "quiz-04-08-tracking-branch",
    "title": "Trắc nghiệm: Nhánh theo dõi Tracking Branch",
    "questions": [
      {
        "id": "q1",
        "question": "Khi `git status` thông báo dòng chữ: \"Your branch is ahead of 'origin/main' by 2 commits\", điều đó có nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Bạn đã tạo 2 commit mới trên máy cá nhân mà chưa đẩy (push) lên máy chủ GitHub",
            "correct": true
          },
          {
            "text": "Trên GitHub đang có 2 commit mới mà bạn chưa kéo (pull) về máy",
            "correct": false
          },
          {
            "text": "Máy tính của bạn đang bị virus tấn công 2 lần",
            "correct": false
          },
          {
            "text": "Kho chứa của bạn bị lỗi thừa 2 nhánh",
            "correct": false
          }
        ],
        "explanation": "`ahead by N` nghĩa là nhánh local của bạn đang đi trước nhánh remote N commit; cần chạy `git push` để đẩy lên."
      },
      {
        "id": "q2",
        "question": "Khi `git status` thông báo: \"Your branch is behind 'origin/main' by 3 commits\", hành động bạn nên làm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chạy lệnh `git pull` để kéo 3 commit mới đó từ GitHub về cập nhật vào máy cá nhân",
            "correct": true
          },
          {
            "text": "Chạy lệnh `git push --force` để xóa 3 commit đó trên GitHub",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ thư mục dự án và tải lại từ đầu",
            "correct": false
          },
          {
            "text": "Tắt máy tính đi ngủ",
            "correct": false
          }
        ],
        "explanation": "`behind by N` nghĩa là server đang có N commit mới mà máy bạn chưa có; cần chạy `git pull` để đồng bộ."
      },
      {
        "id": "q3",
        "question": "Lệnh nào giúp bạn kiểm tra nhanh mối quan hệ upstream tracking và trạng thái ahead/behind của TẤT CẢ các nhánh cục bộ?",
        "type": "single",
        "options": [
          {
            "text": "git branch -vv",
            "correct": true
          },
          {
            "text": "git show-all-tracking",
            "correct": false
          },
          {
            "text": "git track --list",
            "correct": false
          },
          {
            "text": "git status --all-branches",
            "correct": false
          }
        ],
        "explanation": "`git branch -vv` hiển thị chi tiết tên từng nhánh, commit hash, commit message và upstream tracking branch kèm ahead/behind."
      },
      {
        "id": "q4",
        "question": "Để thiết lập nhánh `origin/develop` làm upstream cho nhánh cục bộ hiện tại, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git branch -u origin/develop",
            "correct": true
          },
          {
            "text": "git track set origin/develop",
            "correct": false
          },
          {
            "text": "git link-branch origin/develop",
            "correct": false
          },
          {
            "text": "git make-upstream origin/develop",
            "correct": false
          }
        ],
        "explanation": "`git branch -u <remote/branch>` (hoặc `--set-upstream-to`) thiết lập quan hệ tracking cho nhánh hiện tại."
      },
      {
        "id": "q5",
        "question": "Trạng thái \"diverged\" (phân kỳ) xảy ra khi nào giữa nhánh cục bộ và nhánh upstream?",
        "type": "single",
        "options": [
          {
            "text": "Khi cả bạn và máy chủ đều có những commit mới độc lập kể từ điểm commit chung gần nhất",
            "correct": true
          },
          {
            "text": "Khi kho lưu trữ bị mất kết nối mạng cáp quang",
            "correct": false
          },
          {
            "text": "Khi hai lập trình viên dùng hai hệ điều hành khác nhau",
            "correct": false
          },
          {
            "text": "Khi nhánh bị xóa trên máy tính",
            "correct": false
          }
        ],
        "explanation": "Diverged nghĩa là vừa ahead vừa behind; hai luồng commit đã rẽ thành hình chữ Y và cần merge hoặc rebase để hợp nhất."
      },
      {
        "id": "q6",
        "question": "Tại sao thông tin ahead/behind trong lệnh `git status` có thể không phản ánh đúng nếu bạn chưa chạy `git fetch`?",
        "type": "single",
        "options": [
          {
            "text": "Vì Git status chỉ so sánh nhánh local với con trỏ origin/* lưu trên đĩa chứ không tự động kết nối mạng lên server",
            "correct": true
          },
          {
            "text": "Vì Git status luôn tự động xóa bộ nhớ đệm",
            "correct": false
          },
          {
            "text": "Vì GitHub không cho phép lệnh status truy cập",
            "correct": false
          },
          {
            "text": "Vì lệnh git status chỉ dùng cho các tệp ảnh",
            "correct": false
          }
        ],
        "explanation": "`git status` hoạt động offline; nó so sánh với bản lưu `origin/*` của lần fetch cuối cùng, nên cần fetch để cập nhật mới nhất."
      }
    ]
  }
};
export default lesson;
