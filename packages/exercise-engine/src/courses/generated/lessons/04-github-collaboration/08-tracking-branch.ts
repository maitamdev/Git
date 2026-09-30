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
      "Hiểu rõ khái niệm và cơ chế hoạt động của Tracking Branch (Nhánh theo dõi) trong Git.",
      "Phân biệt rõ ràng giữa 3 loại nhánh: Nhánh cục bộ, Nhánh theo dõi từ xa (`origin/main`), và Nhánh thực tế trên server.",
      "Đọc hiểu và giải thích ý nghĩa các trạng thái so sánh: `ahead`, `behind`, và `diverged`.",
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
  "content": "# Nhánh theo dõi Tracking Branch\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và cơ chế hoạt động của Tracking Branch (Nhánh theo dõi) trong Git.\n- Phân biệt rõ ràng giữa 3 loại nhánh: Nhánh cục bộ, Nhánh theo dõi từ xa (`origin/main`), và Nhánh thực tế trên server.\n- Đọc hiểu và giải thích ý nghĩa các trạng thái so sánh: `ahead`, `behind`, và `diverged`.\n- Thiết lập hoặc thay đổi quan hệ upstream tracking cho một nhánh cục bộ bất kỳ.\n\n---\n\n## 📖 Định nghĩa\n> Tracking Branch (Nhánh theo dõi cục bộ, còn gọi là Upstream Branch) là một nhánh cục bộ có mối liên kết trực tiếp một-một với một nhánh theo dõi từ xa (Remote-tracking branch, ví dụ `origin/main`). Khi một nhánh cục bộ được cấu hình tracking, Git sẽ liên tục theo dõi vị trí tương đối giữa hai nhánh và tự động thông báo cho bạn biết bạn đang đi trước máy chủ bao nhiêu commit (ahead) hoặc đang bị tụt lại phía sau bao nhiêu commit (behind).\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có tính năng Tracking Branch, mỗi lần bạn gõ câu lệnh `git status`, bạn sẽ hoàn toàn rơi vào trạng thái mù mịt thông tin vì không biết mã nguồn trên máy tính của mình đã được xuất bản đồng bộ lên GitHub hay chưa, hoặc có đồng nghiệp nào vừa đẩy thêm các commit mới lên hay không. Tính năng tracking mang lại sự tiện lợi và tự động hóa tuyệt vời: bạn chỉ cần gõ `git push` hoặc `git pull` ngắn gọn mà không phải gõ kèm tên remote và tên branch dài dòng, đồng thời hạn chế tối đa nguy cơ vô tình đẩy nhầm nhánh vào sai địa chỉ đích.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai vận động viên điền kinh Nam (nhánh cục bộ) và Bình (nhánh trên server) cùng thi đấu trên hai làn chạy song song. Trên cổ tay của Nam có đeo một chiếc đồng hồ thông minh kết nối GPS (Tracking Branch). Chiếc đồng hồ liên tục hiển thị: \"Bạn đang chạy trước Bình 2 bước\" (ahead 2), hoặc \"Bạn đang chạy sau Bình 3 bước\" (behind 3), hoặc \"Hai bạn đang chạy ngang nhau\" (up to date). Nhờ chiếc đồng hồ đó, Nam luôn biết mình cần tăng tốc hay giữ nhịp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCác trạng thái so sánh Tracking Branch:\nTrạng thái Up to date:\nLocal:   C1 ──► C2 ──► C3 (main)\nRemote:  C1 ──► C2 ──► C3 (origin/main)\n\nTrạng thái Ahead 1 (Bạn đi trước 1 commit):\nLocal:   C1 ──► C2 ──► C3 ──► C4 (main)\nRemote:  C1 ──► C2 ──► C3 (origin/main)\n\nTrạng thái Behind 1 (Server đi trước 1 commit):\nLocal:   C1 ──► C2 ──► C3 ──► C5 (origin/main)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Hà tạo một commit mới trên nhánh main của máy tính cá nhân sau khi sửa xong giao diện đăng nhập. Khi Hà gõ lệnh `git status`, màn hình console lập tức in ra thông báo màu xanh lá vô cùng rõ ràng: \"Your branch is ahead of 'origin/main' by 1 commit. (use 'git push' to publish your local commits)\". Nhờ có mối quan hệ tracking branch được thiết lập từ trước, Hà biết chính xác mình đang có một commit chưa được đẩy lên đám mây và chỉ việc gõ câu lệnh `git push` ngắn gọn để đồng bộ hóa mã nguồn tức thì lên GitHub cho toàn bộ đội ngũ kỹ thuật cùng tiếp cận, giúp dự án luôn ở trạng thái cập nhật nhất mà không gặp phải bất kỳ sai sót nào.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit branch -vv\ngit branch -u origin/<tên-nhánh>\ngit branch --unset-upstream\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị trạng thái so sánh chi tiết giữa nhánh hiện tại và nhánh upstream (ahead/behind).\n- `git branch -vv`: Liệt kê tất cả các nhánh cục bộ kèm theo tên nhánh upstream và trạng thái ahead/behind của từng nhánh.\n- `git branch -u origin/<nhánh>`: Thiết lập hoặc đổi liên kết upstream cho nhánh hiện tại.\n- `git branch --unset-upstream`: Gỡ bỏ mối quan hệ theo dõi upstream của nhánh hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Bối rối khi thấy thông báo \"Your branch is behind\"**:  Cần chạy `git pull` để kéo commit mới về máy.\n2. **Nhánh bị phân kỳ \"Your branch and origin/main have diverged\"**:  Cả bạn và server đều có commit mới độc lập; cần pull về giải quyết merge/rebase.\n3. **Nghĩ rằng git status tự động kết nối mạng**:  Thông báo ahead/behind dựa trên dữ liệu fetch lần cuối, hãy chạy `git fetch` trước để thông tin chuẩn xác nhất.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git branch -vv` và quan sát cột hiển thị upstream trong ngoặc vuông `[origin/main]`.\n2. Tạo một commit mới và chạy `git status` để quan sát thông báo `ahead by 1 commit`.\n3. Đẩy commit lên server bằng lệnh ngắn gọn `git push`.\n4. Chạy lại `git status` để xác nhận thông báo `Your branch is up to date with origin/main`.\n\n---\n\n## 💡 Hint\n> Nhớ chạy `git fetch` trước khi xem `git status` để trạng thái ahead/behind phản ánh đúng thực tế trên server.\n\n---\n\n## ✅ Validation\n- Đọc hiểu chính xác trạng thái ahead và behind thông qua `git status` và `git branch -vv`.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về nhánh theo dõi Tracking Branch.\n\n---\n\n## 🔥 Challenge\nMô tả cấu trúc tệp `.git/config` khi một nhánh được cấu hình upstream tracking.\n\n---\n\n## 📚 Tổng kết\n- Tracking Branch liên kết nhánh cục bộ với nhánh remote-tracking tương ứng.\n- Cung cấp thông tin so sánh quý giá: `ahead` (cần push) và `behind` (cần pull).\n- Cho phép sử dụng các cú pháp rút gọn `git push` và `git pull` tiện lợi.\n",
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
