import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-fetch",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "05-git-fetch",
    "title": "Cập nhật dữ liệu từ xa với git fetch",
    "level": "intermediate",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "04-git-clone"
    ],
    "objectives": [
      "Hiểu rõ cơ chế hoạt động an toàn tuyệt đối của câu lệnh `git fetch`.",
      "Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).",
      "Nắm bắt lý do vì sao `git fetch` không bao giờ làm thay đổi hay ghi đè lên Working Directory của bạn.",
      "Sử dụng `git log` và `git diff` để kiểm tra mã nguồn mới tải về trước khi quyết định hợp nhất."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "fetch-remote"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git fetch",
      "remote-tracking branch",
      "origin/main",
      "cap nhat du lieu",
      "an toan"
    ],
    "commands": [
      "git fetch",
      "git fetch origin",
      "git fetch --all",
      "git log HEAD..origin/main --oneline",
      "git diff HEAD..origin/main"
    ]
  },
  "content": "# Cập nhật dữ liệu từ xa với git fetch\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cơ chế hoạt động an toàn tuyệt đối của câu lệnh `git fetch`.\n- Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).\n- Nắm bắt lý do vì sao `git fetch` không bao giờ làm thay đổi hay ghi đè lên Working Directory của bạn.\n- Sử dụng `git log` và `git diff` để kiểm tra mã nguồn mới tải về trước khi quyết định hợp nhất.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git fetch\n- **Nói dễ hiểu**: Lệnh tải về các commit và nhánh mới từ máy chủ về kho ngầm mà không làm thay đổi file đang soạn thảo.\n- **Ví dụ**: `git fetch origin` để kiểm tra xem đồng nghiệp đã đẩy commit mới nào lên chưa.\n- **Đừng nhầm**: Không gộp code vào nhánh bạn đang đứng; lệnh chỉ cập nhật nhánh theo dõi từ xa như `origin/main`.\n\n### remote-tracking branch\n- **Nói dễ hiểu**: Con trỏ nhánh cục bộ phản chiếu trạng thái gần nhất của nhánh tương ứng trên máy chủ từ xa.\n- **Ví dụ**: `origin/main` là con trỏ cho biết nhánh `main` trên máy chủ `origin` đang đứng ở commit nào.\n- **Đừng nhầm**: Bạn không thể trực tiếp gõ lệnh chuyển vào nhánh này để commit; Git tự động quản lý nó.\n\n### behind commit\n- **Nói dễ hiểu**: Trạng thái nhánh cục bộ của bạn đang bị thiếu các commit mà trên máy chủ đã có.\n- **Ví dụ**: `Your branch is behind 'origin/main' by 2 commits` nghĩa là server đang có 2 commit mới hơn máy bạn.\n- **Đừng nhầm**: Không có nghĩa là code của bạn bị lỗi; chỉ cần gộp (merge/pull) để đưa 2 commit đó vào nhánh cá nhân.\n\n---\n\n## 📖 Định nghĩa\n`git fetch` là câu lệnh đồng bộ an toàn của Git, có nhiệm vụ liên hệ với kho từ xa và tải về toàn bộ các commit, nhánh mới mà máy cục bộ chưa có. Điểm then chốt: `git fetch` chỉ cập nhật các con trỏ nhánh theo dõi từ xa (như `origin/main`) mà không bao giờ tự ý sửa đổi file trong Working Directory.\n\n---\n\n## 💡 Tại sao cần\nTrong làm việc nhóm, bạn không nên gộp ngay code của người khác vào không gian làm việc của mình khi chưa biết họ thay đổi gì. `git fetch` giúp bạn xem trước các thay đổi mới, đọc commit log và phân tích xung đột một cách an toàn trước khi tích hợp.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung `git fetch` như nhân viên bưu tá đặt kiện hàng mới vào hòm thư trước cửa nhà bạn. Người giao hàng không tự mở cửa bước vào phòng khách hay xáo trộn bàn làm việc của bạn. Bạn có thể thong thả kiểm tra bưu kiện trong hòm thư rồi mới mang vào nhà.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế an toàn của git fetch:\nKho trên GitHub:              Máy tính của bạn (Local):\nCommit C4 mới trên main ──► Tải về lưu vào: origin/main (C4)\n                             Nhánh cục bộ:   main (vẫn ở C3)\n                             Working Tree:   Hoàn toàn giữ nguyên!\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nLập trình viên Lan đang viết dở tính năng đặt hàng trên nhánh main tại commit C3. Lan chạy `git fetch origin` để kiểm tra cập nhật. Git tải về các commit mới và cập nhật con trỏ `origin/main` lên C4. Lan kiểm tra bằng `git log main..origin/main --oneline`, thấy đồng nghiệp chỉ sửa file cấu hình khác nên an tâm tiếp tục công việc mà không sợ xung đột.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit fetch\ngit fetch origin\ngit fetch --all\ngit log HEAD..origin/main --oneline\ngit diff HEAD..origin/main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git fetch`: Tải về các thay đổi mới từ remote mặc định gắn với nhánh hiện tại.\n- `git fetch origin`: Chỉ định rõ ràng tải về từ máy chủ remote mang tên origin.\n- `git fetch --all`: Tải về dữ liệu mới từ tất cả các remote đang được cấu hình trong dự án.\n- `git log HEAD..origin/main`: Liệt kê các commit mới trên server mà máy cục bộ của bạn chưa có.\n- `git diff HEAD..origin/main`: So sánh chi tiết từng dòng code khác biệt giữa mã nguồn của bạn và mã nguồn trên server.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ chạy git fetch xong là file trong editor tự đổi**: Fetch chỉ tải dữ liệu về kho ngầm `.git`, cần gộp vào nhánh mới thấy thay đổi trong editor.\n2. **Lo sợ git fetch làm mất code đang sửa**: Fetch không bao giờ ghi đè lên Working Directory, hoàn toàn an toàn khi đang code dở.\n3. **Bỏ qua bước so sánh diff trước khi gộp**: Không kiểm tra `git diff HEAD..origin/main` khiến bạn bị bất ngờ khi xảy ra xung đột mã nguồn.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tải dữ liệu từ remote và đối chiếu con trỏ theo dõi từ xa.\n1. Chạy lệnh `git fetch origin` để đồng bộ dữ liệu mới nhất từ remote.\n2. Quan sát thông báo cập nhật các nhánh `origin/*`.\n3. Dùng lệnh `git log origin/main --oneline -n 5` để xem các commit mới nhất trên server.\n4. Chạy `git status` để xem thông tin nhánh của bạn đang behind bao nhiêu commit so với remote.\n\n---\n\n## 💡 Hint & mẹo\n> Ghi nhớ quy tắc: `git fetch` = Tải dữ liệu về kho nhưng chưa gộp; an toàn tuyệt đối 100%.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Nhánh `origin/main` trỏ tới commit mới nhất trên remote.\n- Toàn bộ file và thay đổi chưa commit trong Working Directory được giữ nguyên vẹn.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố hiểu biết về cơ chế hoạt động của git fetch.\n\n---\n\n## 🚀 Thử thách nâng cao\nSử dụng câu lệnh `git diff HEAD..origin/main` để xem chi tiết từng dòng code sắp được tích hợp vào dự án của bạn.\n\n---\n\n## 📝 Tổng kết\n- `git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ.\n- Chỉ cập nhật nhánh theo dõi từ xa `origin/main`, không chạm vào Working Directory.\n- Là thao tác an toàn tuyệt đối để xem trước thay đổi trước khi quyết định tích hợp.\n",
  "quiz": {
    "id": "quiz-04-05-git-fetch",
    "title": "Trắc nghiệm: Cập nhật dữ liệu với git fetch",
    "questions": [
      {
        "id": "q1",
        "question": "Điều gì xảy ra với các tệp tin trong Working Directory của bạn khi bạn chạy lệnh `git fetch origin`?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không có bất kỳ tệp tin nào bị thay đổi hay ghi đè, Working Directory được giữ nguyên vẹn 100%",
            "correct": true
          },
          {
            "text": "Các tệp tin tự động được cập nhật theo phiên bản mới nhất trên GitHub",
            "correct": false
          },
          {
            "text": "Toàn bộ các tệp tin chưa commit sẽ bị xóa sạch",
            "correct": false
          },
          {
            "text": "Các tệp tin bị khóa lại và chuyển sang chế độ chỉ đọc",
            "correct": false
          }
        ],
        "explanation": "`git fetch` chỉ tải dữ liệu về kho ngầm và cập nhật con trỏ `origin/*`, tuyệt đối không tác động lên Working Tree."
      },
      {
        "id": "q2",
        "question": "Con trỏ tham chiếu `origin/main` trong Git đại diện cho điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh theo dõi từ xa (Remote-tracking branch) phản ánh vị trí commit đỉnh của nhánh main trên server ở lần fetch gần nhất",
            "correct": true
          },
          {
            "text": "Nhánh làm việc chính của riêng máy tính cá nhân bạn",
            "correct": false
          },
          {
            "text": "Một tệp tin văn bản chứa mật khẩu của GitHub",
            "correct": false
          },
          {
            "text": "Một nhánh thử nghiệm do AI tự động tạo ra",
            "correct": false
          }
        ],
        "explanation": "`origin/main` là con trỏ chỉ đọc (read-only) ghi nhận trạng thái của nhánh main trên máy chủ remote."
      },
      {
        "id": "q3",
        "question": "Lệnh nào cho phép bạn xem danh sách các commit mà đồng nghiệp đã đẩy lên `origin/main` nhưng máy bạn chưa có?",
        "type": "single",
        "options": [
          {
            "text": "git log HEAD..origin/main --oneline",
            "correct": true
          },
          {
            "text": "git show --cloud-commits",
            "correct": false
          },
          {
            "text": "git view server-log",
            "correct": false
          },
          {
            "text": "git diff --names-only",
            "correct": false
          }
        ],
        "explanation": "`HEAD..origin/main` lọc ra toàn bộ các commit có trên remote tracking branch nhưng chưa nằm trong nhánh hiện tại."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy lệnh `git fetch`, để đưa các thay đổi từ `origin/main` vào nhánh `main` hiện tại của bạn, bạn cần chạy tiếp lệnh gì?",
        "type": "single",
        "options": [
          {
            "text": "git merge origin/main",
            "correct": true
          },
          {
            "text": "git finish fetch",
            "correct": false
          },
          {
            "text": "git update local",
            "correct": false
          },
          {
            "text": "git copy origin/main",
            "correct": false
          }
        ],
        "explanation": "Sau khi fetch, bạn dùng lệnh merge để tích hợp con trỏ remote-tracking vào nhánh cục bộ."
      },
      {
        "id": "q5",
        "question": "Lợi ích lớn nhất của việc chạy `git fetch` trước khi thực hiện merge là gì?",
        "type": "single",
        "options": [
          {
            "text": "Cho phép bạn kiểm tra mã nguồn, đọc diff và đánh giá nguy cơ xung đột một cách hoàn toàn chủ động và an toàn",
            "correct": true
          },
          {
            "text": "Giúp máy tính tiết kiệm 50% điện năng tiêu thụ",
            "correct": false
          },
          {
            "text": "Tự động sửa các lỗi chính tả trong thông điệp commit",
            "correct": false
          },
          {
            "text": "Tự động gửi email thông báo cho toàn công ty",
            "correct": false
          }
        ],
        "explanation": "Fetch cho phép kiểm toán và đánh giá an toàn trước khi thay đổi trạng thái không gian làm việc."
      },
      {
        "id": "q6",
        "question": "Lệnh `git fetch --all` thực hiện hành vi nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Liên hệ và tải toàn bộ dữ liệu mới từ tất cả các remote đang được cấu hình trong dự án (ví dụ origin, upstream)",
            "correct": true
          },
          {
            "text": "Tải toàn bộ Internet về ổ cứng máy tính",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các nhánh cục bộ cũ",
            "correct": false
          },
          {
            "text": "Đẩy tất cả các nhánh lên máy chủ",
            "correct": false
          }
        ],
        "explanation": "`--all` yêu cầu Git duyệt qua tất cả các remote đã khai báo và fetch dữ liệu mới từ từng remote đó."
      }
    ]
  }
};
export default lesson;
