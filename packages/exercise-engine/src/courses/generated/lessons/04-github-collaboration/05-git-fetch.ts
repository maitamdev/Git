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
  "content": "# Cập nhật dữ liệu từ xa với git fetch\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cơ chế hoạt động an toàn tuyệt đối của câu lệnh `git fetch`.\n- Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).\n- Nắm bắt lý do vì sao `git fetch` không bao giờ làm thay đổi hay ghi đè lên Working Directory của bạn.\n- Sử dụng `git log` và `git diff` để kiểm tra mã nguồn mới tải về trước khi quyết định hợp nhất.\n\n---\n\n## 📖 Định nghĩa\n> `git fetch` là câu lệnh đồng bộ an toàn của Git, có nhiệm vụ liên hệ với kho lưu trữ từ xa trên mạng, kiểm tra xem có những commit, nhánh hoặc thẻ tag mới nào mà máy cục bộ chưa có hay không, rồi tải toàn bộ dữ liệu mới đó về lưu trữ trong cơ sở dữ liệu của bạn. Điểm đặc biệt quan trọng nhất: `git fetch` chỉ cập nhật các con trỏ nhánh theo dõi từ xa (Remote-tracking branches như `origin/main`) mà KHÔNG BAO GIỜ tự ý gộp code hay chạm vào các tệp tin trong Working Directory của bạn.\n\n---\n\n## 🤔 Tại sao cần?\nTrong môi trường làm việc nhóm chuyên nghiệp, bạn không bao giờ nên mù quáng gộp code của người khác vào không gian làm việc của mình khi chưa biết họ đã thay đổi những gì. `git fetch` cho phép bạn xem trước những gì đồng nghiệp vừa đưa lên máy chủ: bạn có thể đọc diff, xem log và đánh giá nguy cơ xung đột một cách hoàn toàn an toàn và chủ động trước khi đưa ra quyết định hợp nhất.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git fetch` giống như nhân viên bưu tá giao các kiện hàng mới của đồng nghiệp gửi về để vào chiếc hộp thư trước cửa nhà bạn (cập nhật Remote-tracking branches). Bưu tá chỉ đặt kiện hàng vào hộp thư an toàn chứ không tự ý mở cửa bước vào phòng khách của bạn và không tự ý xáo trộn đồ đạc trên bàn làm việc của bạn (Working Directory giữ nguyên 100%). Bạn có thể ra mở hộp thư ngắm nghía kiện hàng trước khi quyết định mang vào nhà.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế an toàn của git fetch:\nKho trên GitHub:              Máy tính của bạn (Local):\nCommit C4 mới trên main ──► Tải về lưu vào: origin/main (C4)\n                             Nhánh cục bộ:   main (vẫn ở C3)\n                             Working Tree:   Hoàn toàn giữ nguyên!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Lan đang viết dở tính năng đặt hàng trên nhánh main tại commit C3. Lan muốn biết đồng nghiệp Hùng có đưa bản sửa lỗi thanh toán nào lên server hay chưa. Lan chạy câu lệnh: `git fetch origin`. Git thông báo đã tải về các đối tượng mới và cập nhật con trỏ `origin/main` lên commit C4. Lan chạy lệnh `git log main..origin/main --oneline` để đọc qua thông điệp commit của Hùng. Thấy Hùng sửa ở một module hoàn toàn khác, Lan yên tâm tiếp tục công việc của mình mà không sợ bị xung đột hay mất mát dữ liệu đang soạn thảo.\n\n---\n\n## 💻 Command\n```bash\ngit fetch\ngit fetch origin\ngit fetch --all\ngit log HEAD..origin/main --oneline\ngit diff HEAD..origin/main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git fetch`: Tải về các thay đổi mới từ remote mặc định gắn với nhánh hiện tại.\n- `git fetch origin`: Chỉ định rõ ràng tải về từ máy chủ remote mang tên origin.\n- `git fetch --all`: Tải về dữ liệu mới từ tất cả các remote đang được cấu hình trong dự án.\n- `git log HEAD..origin/main`: Liệt kê các commit mới trên server mà máy cục bộ của bạn chưa có.\n- `git diff HEAD..origin/main`: So sánh chi tiết từng dòng code khác biệt giữa mã nguồn của bạn và mã nguồn trên server.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tưởng chạy git fetch xong là code trong editor sẽ tự cập nhật**:  Fetch chỉ tải về cơ sở dữ liệu ngầm, bạn phải merge thì code mới vào Working Tree.\n2. **Sợ hãi git fetch sẽ làm mất code đang gõ dở**:  Fetch là lệnh an toàn nhất trong Git, không bao giờ ghi đè lên file đang sửa.\n3. **Quên kiểm tra diff trước khi merge**:  Bỏ lỡ cơ hội đánh giá xung đột tiềm ẩn.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git fetch origin` để đồng bộ dữ liệu mới nhất từ remote.\n2. Quan sát thông báo cập nhật các nhánh `origin/*`.\n3. Sử dụng lệnh `git log origin/main --oneline -n 5` để xem các commit mới trên remote.\n4. Chạy `git status` để kiểm tra thông báo nhánh của bạn đang bị tụt lại (behind) bao nhiêu commit.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc: `git fetch` = Tải dữ liệu về nhưng chưa gộp; an toàn tuyệt đối 100%.\n\n---\n\n## ✅ Validation\n- Cập nhật thành công nhánh remote-tracking mà không làm thay đổi Working Directory.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế an toàn của git fetch.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa hai con trỏ `main` và `origin/main` sau khi chạy lệnh `git fetch`.\n\n---\n\n## 📚 Tổng kết\n- `git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ.\n- Chỉ cập nhật nhánh theo dõi từ xa `origin/main`, không chạm vào Working Directory.\n- Là thao tác an toàn tuyệt đối để xem trước thay đổi trước khi quyết định tích hợp.\n",
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
