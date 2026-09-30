import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-reflog",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "06-git-reflog",
    "title": "git reflog",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "04-git-reset-hard"
    ],
    "objectives": [
      "Hiểu rõ bản chất của Reference Logs (`reflog`) như nhật ký ghi lại mọi chuyển động của con trỏ HEAD.",
      "Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).",
      "Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.",
      "Nhận thức tầm quan trọng của reflog như chiếc lưới an toàn tối hậu giúp khôi phục mọi sai lầm trong Git."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git reflog",
      "reference logs",
      "nhat ky tham chieu",
      "cuu ho git",
      "head history",
      "safety net"
    ],
    "commands": [
      "git reflog",
      "git reflog show HEAD",
      "git reflog show <tên-nhánh>",
      "git reflog --date=relative"
    ]
  },
  "content": "# git reflog\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất của Reference Logs (`reflog`) như nhật ký ghi lại mọi chuyển động của con trỏ HEAD.\n- Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).\n- Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.\n- Nhận thức tầm quan trọng của reflog như chiếc lưới an toàn tối hậu giúp khôi phục mọi sai lầm trong Git.\n\n---\n\n## 📖 Định nghĩa\n> `git reflog` (viết tắt của Reference Logs - Nhật ký tham chiếu) là một cơ chế ghi chép nội bộ cực kỳ mạnh mẽ của Git trên máy tính cá nhân của bạn. Trong khi `git log` chỉ hiển thị cây gia phả commit của nhánh hiện tại, `git reflog` hoạt động như một cuốn \"hộp đen máy bay\" ghi lại không sót một hành động nào làm dịch chuyển các con trỏ tham chiếu (HEAD, branches), bao gồm commit, chuyển nhánh (checkout/switch), reset, rebase, merge và cherry-pick.\n\n---\n\n## 🤔 Tại sao cần?\nHầu như mọi lập trình viên đều có ít nhất một lần hoảng loạn tột độ khi lỡ tay gõ `git reset --hard` nhầm hoặc xóa nhầm một nhánh tính năng quan trọng và nghĩ rằng toàn bộ công sức của mình đã tan thành mây khói. `git reflog` chính là phép màu cứu rỗi: trong Git, dữ liệu hiếm khi bị xóa ngay lập tức. Miễn là bạn đã từng commit, mã hash của commit đó chắc chắn vẫn được lưu lại trong reflog, sẵn sàng để bạn hồi sinh.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung cuốn nhật ký hành trình của một nhà thám hiểm. `git log` giống như cuốn sách lịch sử chính thức chỉ in lại những cột mốc vinh quang lớn (các commit còn nằm trên nhánh). Còn `git reflog` giống như thiết bị định vị GPS cá nhân gắn trên người nhà thám hiểm: nó ghi lại từng bước chân lùi, bước chân tiến, bước rẽ trái, rẽ phải, thậm chí cả lúc nhà thám hiểm lỡ bước chân xuống hố rồi trèo lên. Bất kể bạn đã đi đâu, GPS đều lưu lại tọa độ chính xác.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSự khác biệt giữa git log và git reflog:\ngit log:    Chỉ nhìn thấy các commit còn kết nối trong nhánh hiện tại.\n            C1 ──► C2 (mất dấu C3 vì đã lỡ reset --hard về C2)\n\ngit reflog: Ghi nhận mọi sự kiện di chuyển của HEAD:\n            HEAD@{0}: reset: moving to HEAD~1\n            HEAD@{1}: commit: feat: awesome feature (C3 - Tọa độ còn nguyên!)\n            HEAD@{2}: commit: fix: minor bug (C2)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Huy sau một đêm thức trắng đã lỡ tay gõ câu lệnh tai họa: `git reset --hard HEAD~5` khiến 5 commit quan trọng vừa làm suốt cả buổi tối biến mất hoàn toàn khỏi màn hình hiển thị của lệnh `git log`. Huy toát mồ hôi lạnh nhưng nhanh chóng nhớ đến chiếc hộp đen vạn năng của Git. Huy mở terminal và gõ: `git reflog`. Dòng thứ hai của kết quả in rõ ràng: `7a8b9c0 HEAD@{1}: commit: feat: payment integration`. Huy reo lên vui sướng vì tọa độ commit đỉnh vẫn còn nguyên vẹn trong cơ sở dữ liệu ngầm. Huy chỉ việc gõ `git reset --hard HEAD@{1}` và toàn bộ 5 commit cùng mã nguồn lập tức sống dậy trọn vẹn như chưa từng có sự cố.\n\n---\n\n## 💻 Command\n```bash\ngit reflog\ngit reflog show HEAD\ngit reflog show <tên-nhánh>\ngit reflog --date=relative\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog`: Hiển thị danh sách các lần dịch chuyển gần nhất của con trỏ HEAD kèm theo chỉ số index.\n- `git reflog show HEAD`: Cú pháp tường minh tương đương với lệnh reflog cơ bản.\n- `git reflog show <nhánh>`: Xem lịch sử dịch chuyển con trỏ của một nhánh cụ thể thay vì HEAD.\n- `git reflog --date=relative`: Hiển thị mốc thời gian tương đối như mười phút trước hoặc hai giờ trước.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng reflog tồn tại vĩnh viễn**:  Reflog có hạn sử dụng (mặc định 90 ngày cho commit tiếp cận được và 30 ngày cho commit mồ côi) trước khi bị dọn dẹp bởi git gc.\n2. **Tìm kiếm reflog trên GitHub**:  Reflog là dữ liệu cục bộ riêng tư trên máy của bạn, không bao giờ được push lên server.\n3. **Không biết rằng tệp chưa commit thì không thể cứu bằng reflog**:  Chỉ những gì đã từng commit mới có dấu vết trong reflog.\n\n---\n\n## 🧪 Lab\n1. Tạo 2 commit mới liên tiếp trong kho chứa bài tập.\n2. Chạy lệnh `git reflog` và quan sát các dòng ghi nhận sự kiện commit kèm thông điệp.\n3. Thử chuyển sang một nhánh khác rồi quay lại, sau đó chạy lại `git reflog`.\n4. Quan sát các sự kiện chuyển đổi nhánh checkout moving from branch to branch được ghi lại chi tiết.\n\n---\n\n## 💡 Hint\n> Mỗi khi làm mất commit, câu lệnh đầu tiên bạn phải nghĩ đến luôn luôn là `git reflog`.\n\n---\n\n## ✅ Validation\n- Đọc hiểu tường tận các thông số trong bảng reflog và xác định đúng mã hash commit cần tìm.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ cứu hộ git reflog.\n\n---\n\n## 🔥 Challenge\nCơ chế Garbage Collection (`git gc`) dọn dẹp các commit mồ côi (dangling commits) trong reflog sau thời gian bao lâu?\n\n---\n\n## 📚 Tổng kết\n- `git reflog` là hộp đen ghi lại mọi sự kiện dịch chuyển của HEAD và các nhánh.\n- Dữ liệu reflog mang tính cục bộ riêng tư trên máy cá nhân, không chia sẻ qua remote.\n- Là nền tảng cốt lõi để khôi phục các commit bị mất do reset, checkout hoặc xóa nhánh.\n",
  "quiz": {
    "id": "quiz-05-06-git-reflog",
    "title": "Trắc nghiệm: git reflog",
    "questions": [
      {
        "id": "q1",
        "question": "Điểm khác biệt căn bản nhất giữa `git log` và `git reflog` là gì?",
        "type": "single",
        "options": [
          {
            "text": "git log hiển thị lịch sử commit của nhánh, còn reflog ghi lại mọi hành động di chuyển của con trỏ HEAD trên máy cục bộ",
            "correct": true
          },
          {
            "text": "git log dùng cho máy Mac, còn reflog dùng cho máy Windows",
            "correct": false
          },
          {
            "text": "reflog tự động đồng bộ lên GitHub, còn log chỉ lưu trên máy cá nhân",
            "correct": false
          },
          {
            "text": "git log chỉ xem được tệp ảnh, reflog xem được tệp văn bản",
            "correct": false
          }
        ],
        "explanation": "`reflog` ghi nhận mọi thao tác cục bộ làm đổi vị trí HEAD (commit, checkout, reset...), kể cả các commit đã bị tách rời khỏi nhánh."
      },
      {
        "id": "q2",
        "question": "Cú pháp `HEAD@{1}` trong kết quả xuất ra của `git reflog` có ý nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Vị trí của con trỏ HEAD ở trạng thái ngay trước thao tác dịch chuyển gần đây nhất",
            "correct": true
          },
          {
            "text": "Nhánh số 1 trên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Commit đầu tiên trong lịch sử dự án",
            "correct": false
          },
          {
            "text": "Một lỗi cú pháp của Git",
            "correct": false
          }
        ],
        "explanation": "`HEAD@{n}` đại diện cho vị trí của con trỏ HEAD cách đây `n` bước di chuyển."
      },
      {
        "id": "q3",
        "question": "Nhật ký `reflog` có được đẩy lên máy chủ từ xa khi bạn chạy `git push` hay không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không, reflog chỉ là dữ liệu nội bộ riêng tư tồn tại duy nhất trên máy tính cá nhân của bạn",
            "correct": true
          },
          {
            "text": "Có, reflog được công khai cho tất cả mọi người trên mạng",
            "correct": false
          },
          {
            "text": "Chỉ đẩy lên nếu bạn có tài khoản GitHub trả phí",
            "correct": false
          },
          {
            "text": "Chỉ đẩy lên khi sử dụng cờ --force",
            "correct": false
          }
        ],
        "explanation": "Reflog là nhật ký nội bộ của client Git cá nhân, không thuộc cấu trúc chia sẻ của giao thức remote."
      },
      {
        "id": "q4",
        "question": "Trường hợp nào sau đây KHÔNG THỂ cứu lại được bằng `git reflog`?",
        "type": "single",
        "options": [
          {
            "text": "Các thay đổi trong tệp tin mới tạo chưa từng được gõ lệnh `git commit` bao giờ",
            "correct": true
          },
          {
            "text": "Một commit bị mất do lỡ tay gõ `git reset --hard`",
            "correct": false
          },
          {
            "text": "Một nhánh đã bị xóa bằng `git branch -D`",
            "correct": false
          },
          {
            "text": "Một commit bị ghi đè do rebase thất bại",
            "correct": false
          }
        ],
        "explanation": "Git chỉ có thể bảo vệ và ghi vết những gì đã từng được đóng dấu commit; tệp chưa commit không nằm trong cơ sở dữ liệu Git."
      }
    ]
  }
};
export default lesson;
