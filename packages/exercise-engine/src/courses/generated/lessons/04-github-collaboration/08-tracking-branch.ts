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
  "content": "# Nhánh theo dõi Tracking Branch\n\n---\n\n## 🎯 Mục tiêu\n- Thấu suốt khái niệm và cơ chế vận hành ngầm của Tracking Branch (nhánh theo dõi) trong Git.\n- Phân biệt rõ ràng giữa 3 thực thể nhánh: nhánh cục bộ, nhánh theo dõi từ xa (`origin/main`) và nhánh vật lý trên máy chủ.\n- Đọc hiểu tường tận các chỉ số so sánh độ lệch trạng thái: `ahead`, `behind` và phân kỳ (`diverged`).\n- Thành thạo các thao tác thiết lập, kiểm tra bằng `git branch -vv` và hủy liên kết upstream tracking khi cần thiết.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### tracking branch — nhánh theo dõi\n- **Nói dễ hiểu:** Mối liên kết trực tiếp giữa một nhánh trên máy tính cá nhân của bạn với nhánh tương ứng trên máy chủ GitHub.\n- **Ví dụ:** Nhánh `main` cục bộ được thiết lập để theo dõi sát sao nhánh `origin/main` trên máy chủ từ xa.\n- **Đừng nhầm:** Tracking branch không phải là một nhánh mới; nó là mối quan hệ cấu hình định tuyến giữa hai nhánh đã có.\n\n### upstream — nhánh thượng nguồn\n- **Nói dễ hiểu:** Nhánh đích trên máy chủ từ xa được nhánh cục bộ chọn làm chuẩn mực để so sánh và đồng bộ dữ liệu.\n- **Ví dụ:** Trong cặp liên kết `main -> origin/main`, thì `origin/main` chính là upstream của nhánh `main` cục bộ.\n- **Đừng nhầm:** Khái niệm upstream vừa dùng để chỉ nhánh theo dõi từ xa, vừa dùng để chỉ remote nguồn gốc trong mô hình Forking.\n\n### ahead / behind — độ lệch commit\n- **Nói dễ hiểu:** Thước đo so sánh số lượng commit chênh lệch giữa nhánh trên máy của bạn và nhánh trên máy chủ.\n- **Ví dụ:** `ahead 1` nghĩa là máy bạn có 1 commit chưa đẩy lên; `behind 2` nghĩa là máy chủ có 2 commit mới bạn chưa kéo về.\n- **Đừng nhầm:** Các chỉ số này được tính toán dựa trên lần chạy `git fetch` gần nhất; Git không tự động kết nối mạng khi bạn gõ `git status`.\n\n---\n\n## 📖 Định nghĩa\nTracking Branch (nhánh theo dõi) là cơ chế liên kết định tuyến trong Git giữa một nhánh cục bộ trên máy tính của bạn với một nhánh theo dõi từ xa (thường là `origin/<tên-nhánh>`), cho phép Git tự động tính toán độ lệch commit (ahead và behind) và định hướng luồng dữ liệu cho các câu lệnh rút gọn như `git status`, `git push` và `git pull`.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có cơ chế Tracking Branch, mỗi lần muốn kéo hay đẩy code bạn đều phải gõ tường minh đầy đủ tên remote và tên nhánh một cách rườm rà. Quan trọng hơn, tracking branch đóng vai trò như chiếc la bàn định vị: chỉ cần gõ `git status`, bạn sẽ lập tức biết mình đang đi trước server bao nhiêu bước hoặc bị tụt lại phía sau bao nhiêu commit để chủ động điều phối.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn và một người bạn đang cùng chạy bộ trên hai làn đường đua song song. Bạn đeo một chiếc đồng hồ định vị GPS thông minh liên tục hiển thị: \"Bạn đang chạy trước bạn mình 2 bước\" (ahead 2) hoặc \"Bạn đang chạy sau 3 bước\" (behind 3). Chiếc đồng hồ GPS đo khoảng cách thời gian thực đó chính là cơ chế Tracking Branch trong Git.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCÁC TRẠNG THÁI SO SÁNH TRÊN TRACKING BRANCH:\n\n1. Trạng thái Up to date (Đồng bộ tuyệt đối):\nLocal:   C1 ──► C2 ──► C3 (main)\nRemote:  C1 ──► C2 ──► C3 (origin/main)\n\n2. Trạng thái Ahead 1 (Bạn đi trước 1 commit - cần push):\nLocal:   C1 ──► C2 ──► C3 ──► C4 (main)\nRemote:  C1 ──► C2 ──► C3 (origin/main)\n\n3. Trạng thái Behind 1 (Máy chủ có commit mới - cần pull):\nLocal:   C1 ──► C2 ──► C3 (main)\nRemote:  C1 ──► C2 ──► C3 ──► C5 (origin/main)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau một buổi chiều lập trình tập trung, bạn tạo được 2 commit hoàn thiện chức năng thanh toán trên nhánh `feature-checkout`. Khi gõ lệnh kiểm tra `git status`, Git lập tức thông báo: \"Your branch is ahead of origin/feature-checkout by 2 commits\". Nhờ mối quan hệ tracking đã cấu hình sẵn, bạn chỉ cần gõ `git push` ngắn gọn mà không cần suy nghĩ về tên remote hay nhánh đích.\n\n---\n\n## 💻 Command\n```bash\ngit branch -vv\ngit status\ngit branch -u origin/main\ngit branch --unset-upstream\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch -vv`: Bảng thanh tra toàn diện, liệt kê mọi nhánh cục bộ kèm tên nhánh upstream và độ lệch ahead/behind chi tiết.\n- `git status`: Hiển thị tình trạng đồng bộ hóa hiện tại của nhánh đang làm việc so với nhánh upstream tương ứng.\n- `git branch -u origin/main`: Thiết lập hoặc gắn lại liên kết upstream cho nhánh hiện tại trỏ tới `origin/main`.\n- `git branch --unset-upstream`: Gỡ bỏ hoàn toàn mối quan hệ theo dõi upstream của nhánh hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng `git status` luôn nói sự thật mới nhất trên GitHub**: Lệnh chỉ so sánh với dữ liệu cache đã nạp; bạn phải chạy `git fetch` trước thì chỉ số ahead/behind mới phản ánh thời gian thực.\n2. **Hoang mang khi rơi vào trạng thái phân kỳ (diverged)**: Cả bạn và máy chủ đều có commit riêng rẽ (`ahead 1, behind 2`); giải pháp là bình tĩnh chạy `git pull` để xử lý gộp mã.\n3. **Quên cấu hình tracking cho nhánh mới**: Dẫn đến việc gõ `git push` hay `git pull` bị Git nhắc nhở phải gõ kèm `--set-upstream`.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh: `git branch -vv` để soi chiếu toàn bộ danh sách các nhánh và cấu hình upstream hiện tại.\n2. Tạo một commit mới trên nhánh của bạn bằng lệnh: `git commit --allow-empty -m \"docs: test ahead status\"`.\n3. Chạy lệnh: `git status` để trực tiếp quan sát thông báo `ahead by 1 commit`.\n4. Khám phá cấu hình ngầm bằng cách đọc tệp `.git/config` để thấy các trường `remote` và `merge` được Git lưu trữ.\n\n---\n\n## 💡 Hint\n> Lệnh `git branch -vv` (hai chữ v viết liền) là câu lệnh thần thánh của mọi Tech Lead khi cần chẩn đoán nhanh tình trạng lệch nhánh của các thành viên trong nhóm. Hãy chạy nó thường xuyên để kiểm soát cục diện!\n\n---\n\n## ✅ Validation\n- Đọc hiểu chuẩn xác bảng thông tin do lệnh `git branch -vv` cung cấp.\n- Giải thích thành thạo ý nghĩa bản chất của các trạng thái `ahead`, `behind` và `up to date`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để củng cố và nâng cao trình độ phân tích trạng thái Tracking Branch trong Git.\n\n---\n\n## 🔥 Challenge\nHãy phân tích cơ chế phân kỳ (diverged) xảy ra khi nào trong quá trình phát triển nhóm? Trong tình huống nhánh vừa ahead vừa behind, việc chọn giữa `git pull --rebase` và `git pull --no-rebase` sẽ tạo ra đồ thị lịch sử commit khác nhau như thế nào?\n\n---\n\n## 📚 Tổng kết\n- Tracking Branch tạo sợi dây liên kết giữa nhánh máy tính và nhánh máy chủ.\n- Giúp theo dõi chính xác độ lệch commit qua các chỉ báo `ahead` và `behind`.\n- Hỗ trợ rút gọn các thao tác `git push` và `git pull` thành lệnh 1 từ duy nhất.\n",
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
