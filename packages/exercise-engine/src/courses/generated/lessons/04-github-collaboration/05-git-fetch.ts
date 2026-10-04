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
      "Hiểu `git fetch` tải dữ liệu và cập nhật remote-tracking refs mà không tích hợp vào nhánh hiện tại.",
      "Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).",
      "Phân biệt dữ liệu đã fetch với các file trong Working Directory.",
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
      "git log HEAD..origin/main --oneline",
      "git diff HEAD..origin/main"
    ]
  },
  "content": "# Cập nhật dữ liệu từ xa với git fetch\n\n---\n\n## 🎯 Mục tiêu\n- Thấu hiểu bản chất an toàn của `git fetch`: tải dữ liệu máy chủ về kho ngầm mà không làm biến động thư mục làm việc.\n- Phân biệt rạch ròi giữa nhánh cục bộ (`main`) và nhánh theo dõi từ xa (`origin/main`).\n- Thành thạo kỹ năng soi chiếu lịch sử commit và diff dữ liệu mới tải về bằng `git log` và `git diff`.\n- Nhận thức chuẩn xác trạng thái lệch commit (`behind`) được tính toán dựa trên lần fetch gần nhất.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git fetch\n- **Nói dễ hiểu:** Lệnh tải các commit và thông tin nhánh mới nhất từ máy chủ GitHub về máy nhưng không tự ý gộp vào file đang viết.\n- **Ví dụ:** Bạn chạy `git fetch origin` để kiểm tra xem cả ngày hôm nay đồng đội đã đẩy những tính năng mới nào lên máy chủ.\n- **Đừng nhầm:** Khác với `pull`, `fetch` không bao giờ chạm vào thư mục làm việc hay làm biến đổi các tệp mã nguồn bạn đang mở.\n\n### remote-tracking branch — nhánh theo dõi từ xa\n- **Nói dễ hiểu:** Con trỏ nhánh cục bộ đặc biệt (như `origin/main`) đóng vai trò như một tấm gương phản chiếu vị trí commit trên máy chủ.\n- **Ví dụ:** Con trỏ `origin/main` trên máy bạn cho biết nhánh `main` trên GitHub đang dừng lại ở mốc commit nào trong lần đồng bộ gần nhất.\n- **Đừng nhầm:** Bạn không thể trực tiếp chuyển vào (checkout) để commit lên nhánh này; Git tự động quản lý và cập nhật nó sau mỗi lần fetch.\n\n### behind — trạng thái đi sau remote\n- **Nói dễ hiểu:** Tình trạng nhánh cục bộ trên máy tính của bạn bị thiếu một số commit mới mà trên máy chủ từ xa đã có.\n- **Ví dụ:** Thông báo `Your branch is behind 'origin/main' by 2 commits` cho biết bạn đang chậm hơn máy chủ 2 mốc snapshot.\n- **Đừng nhầm:** Đây là trạng thái bình thường trong làm việc nhóm; không phải lỗi hệ thống và chỉ cần thực hiện gộp mã nguồn để cập nhật.\n\n---\n\n## 📖 Định nghĩa\n`git fetch` là lệnh giao tiếp mạng an toàn của Git, có nhiệm vụ tải toàn bộ các commit, nhánh mới và dữ liệu đối tượng từ máy chủ từ xa về kho cục bộ, đồng thời cập nhật các nhánh theo dõi từ xa (như `origin/main`) mà tuyệt đối không can thiệp hay làm thay đổi mã nguồn trong thư mục làm việc hiện tại của bạn.\n\n---\n\n## 🤔 Tại sao cần?\nTrong môi trường làm việc nhóm chuyên nghiệp, việc gộp ngay mã nguồn của đồng nghiệp vào máy mà chưa rõ nội dung thay đổi là một rủi ro lớn. Lệnh `git fetch` đóng vai trò như một trinh sát tiền trạm: giúp bạn kiểm tra mã mới, đọc lịch sử commit và rà soát nguy cơ xung đột tiềm ẩn trước khi quyết định hợp nhất an toàn vào nhánh của mình.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git fetch` giống như nhân viên bưu tá đặt các kiện hàng mới vào hòm thư trước cổng nhà bạn. Người giao hàng không tự ý mở cửa xông vào phòng khách hay xáo trộn bàn làm việc của bạn. Bạn hoàn toàn chủ động ra kiểm tra hòm thư, xem xét nhãn mác kiện hàng rồi mới quyết định thời điểm thích hợp mang vào nhà sử dụng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ HOẠT ĐỘNG AN TOÀN TUYỆT ĐỐI CỦA GIT FETCH:\n\nMáy chủ GitHub:              Máy tính của bạn (Local):\n[Commit C4 mới trên main] ──► Tải về cập nhật: origin/main (C4)\n                             Nhánh cục bộ:    main (vẫn ở C3)\n                             Working Tree:    Hoàn toàn giữ nguyên!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đang tập trung viết logic đăng nhập trên nhánh `main` ở commit C3. Trước khi chuẩn bị kết thúc ngày làm việc, bạn chạy `git fetch origin`. Git âm thầm tải 2 commit mới của đồng nghiệp về và cập nhật con trỏ `origin/main` lên C5. Thư mục làm việc của bạn vẫn giữ nguyên ở C3, giúp bạn dễ dàng chạy lệnh kiểm tra khác biệt mà không lo dở dang công việc.\n\n---\n\n## 💻 Command\n```bash\ngit fetch\ngit fetch origin\ngit log HEAD..origin/main --oneline\ngit diff HEAD..origin/main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git fetch`: Tải về các thay đổi mới nhất từ remote mặc định gắn với nhánh đang làm việc.\n- `git fetch origin`: Chỉ định rõ ràng máy chủ remote cần truy vấn thông tin là `origin`.\n- `git log HEAD..origin/main --oneline`: Xem danh sách tiêu đề các commit mới có trên server mà máy bạn chưa tích hợp.\n- `git diff HEAD..origin/main`: So sánh chi tiết từng dòng code sai khác giữa phiên bản hiện tại của bạn và phiên bản trên server.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng chạy `git fetch` xong là file trong VS Code tự thay đổi**: Fetch chỉ nạp dữ liệu vào cơ sở dữ liệu ngầm `.git`; bạn phải chủ động tích hợp mới thấy code mới.\n2. **Nhầm lẫn tai hại giữa `fetch` và `pull`**: Dùng `pull` khi đang có việc dở dang khiến code bị gộp đột ngột và sinh ra xung đột khó gỡ.\n3. **Bỏ qua bước xem trước bằng `git diff`**: Không soi chiếu các thay đổi sau khi fetch khiến bạn bị động khi hợp nhất mã nguồn vào dự án.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh: `git fetch origin` để liên lạc với remote và tải về toàn bộ các nhánh theo dõi từ xa mới nhất.\n2. Kiểm tra các commit mới trên server chưa có ở nhánh hiện tại bằng lệnh: `git log HEAD..origin/main --oneline`.\n3. So sánh trực quan sự khác biệt mã nguồn bằng: `git diff HEAD..origin/main`.\n4. Chạy `git status` để quan sát thông báo độ lệch commit giữa nhánh cá nhân và `origin/main`.\n\n---\n\n## 💡 Hint\n> Hãy biến thao tác `git fetch` thành phản xạ đầu ngày mỗi khi bạn ngồi vào bàn làm việc. Chỉ mất 2 giây chạy lệnh, bạn sẽ nắm trọn bức tranh toàn cảnh về tiến độ của cả đội ngũ mà không làm xáo trộn bất kỳ dòng code nào trên máy!\n\n---\n\n## ✅ Validation\n- Nhận thức chuẩn xác rằng `git fetch` không làm thay đổi Working Directory.\n- Sử dụng thành thạo cú pháp `git log` và `git diff` kết hợp với `origin/main` để kiểm tra mã nguồn từ xa.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để đánh giá độ thấu hiểu của bạn về cơ chế vận hành của lệnh `git fetch`.\n\n---\n\n## 🔥 Challenge\nĐiều gì sẽ xảy ra nếu một thành viên trong nhóm xóa một nhánh trên GitHub, nhưng khi bạn gõ `git fetch` thì nhánh theo dõi đó vẫn tồn tại trên máy bạn? Hãy tìm hiểu công dụng của tùy chọn `git fetch --prune` để giải quyết vấn đề này.\n\n---\n\n## 📚 Tổng kết\n- `git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ an toàn.\n- Cập nhật nhánh theo dõi từ xa `origin/main`, giữ nguyên thư mục làm việc.\n- Là bước kiểm tra trinh sát tối quan trọng trước khi quyết định gộp mã nguồn.\n",
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
            "text": "Fetch cập nhật dữ liệu Git và remote-tracking refs nhưng không tích hợp các commit vào nhánh đang checkout",
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
        "explanation": "Fetch cập nhật thông tin remote để bạn kiểm tra; việc tích hợp vào nhánh hiện tại là bước riêng."
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
