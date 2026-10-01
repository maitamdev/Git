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
  "content": "# git reflog\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất của Reference Logs (`reflog`) như nhật ký ghi lại mọi chuyển động của con trỏ HEAD.\n- Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).\n- Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.\n- Nhận thức tầm quan trọng của reflog như chiếc lưới an toàn tối hậu giúp khôi phục mọi sai lầm trong Git.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git reflog\n- **Nói dễ hiểu**: Cuốn sổ tay ghi lại mọi hành động di chuyển của con trỏ HEAD trên máy tính cá nhân của bạn.\n- **Ví dụ**: Gõ `git reflog` để tìm lại mã hash của một commit vừa lỡ tay xóa bằng `git reset --hard`.\n- **Đừng nhầm**: Không đồng bộ lên GitHub; đây là dữ liệu riêng tư 100% nằm trong thư mục `.git/logs/` trên máy bạn.\n\n### HEAD@{n}\n- **Nói dễ hiểu**: Ký hiệu định vị vị trí của HEAD cách đây `n` lần thao tác di chuyển.\n- **Ví dụ**: `HEAD@{1}` là trạng thái của HEAD ngay trước câu lệnh vừa thực thi gần nhất.\n- **Đừng nhầm**: Không phải chỉ số commit trên nhánh; đây là thứ tự các hành động lệnh bạn đã gõ trên máy.\n\n### orphan commit\n- **Nói dễ hiểu**: Commit bị tách rời khỏi nhánh và không còn nhánh nào trỏ tới sau khi bị reset hoặc xóa nhánh.\n- **Ví dụ**: Commit C3 sau khi chạy `git reset --hard HEAD~1` bị mất dấu trong git log.\n- **Đừng nhầm**: Chưa bị xóa vĩnh viễn ngay; Git vẫn giữ commit này trong kho ngầm ít nhất 30 ngày để bạn cứu lại.\n\n---\n\n## 📖 Định nghĩa\n`git reflog` (Reference Logs - Nhật ký tham chiếu) là cơ chế ghi chép nội bộ cực kỳ mạnh mẽ của Git trên máy tính cá nhân. Trong khi `git log` chỉ hiển thị cây gia phả commit còn liên kết trên nhánh, `git reflog` hoạt động như một chiếc hộp đen ghi lại không sót bất kỳ hành động nào làm dịch chuyển con trỏ HEAD.\n\n---\n\n## 💡 Tại sao cần\nNhiều lập trình viên từng hoảng loạn khi lỡ tay gõ `git reset --hard` hoặc xóa nhầm nhánh tính năng và nghĩ rằng code đã mất vĩnh viễn. Trong Git, dữ liệu hiếm khi bị xóa ngay lập tức. Miễn là bạn đã từng tạo commit, mã hash của commit đó chắc chắn vẫn được lưu trong reflog, sẵn sàng để bạn hồi sinh.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung `git log` như cuốn sử ký chính thức chỉ ghi lại các cột mốc vinh quang lớn (commit trên nhánh). Còn `git reflog` giống như thiết bị định vị GPS cá nhân gắn trên người bạn: nó ghi lại từng bước lùi, bước tiến, bước rẽ trái, thậm chí cả lúc bạn lỡ thụt chân xuống hố rồi trèo lên. Tọa độ bước chân luôn được lưu lại chính xác.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nSự khác biệt giữa git log và git reflog:\ngit log:    Chỉ nhìn thấy các commit còn kết nối trong nhánh hiện tại.\n            C1 ──► C2 (mất dấu C3 vì đã lỡ reset --hard về C2)\n\ngit reflog: Ghi nhận mọi sự kiện di chuyển của HEAD:\n            HEAD@{0}: reset: moving to HEAD~1\n            HEAD@{1}: commit: feat: awesome feature (C3 - Tọa độ còn nguyên!)\n            HEAD@{2}: commit: fix: minor bug (C2)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Huy thức trắng đêm và lỡ tay gõ `git reset --hard HEAD~5`, khiến 5 commit vừa làm biến mất hoàn toàn khỏi `git log`. Nhớ đến chiếc hộp đen reflog, Huy gõ `git reflog`. Dòng thứ hai in rõ ràng: `7a8b9c0 HEAD@{1}: commit: feat: payment`. Huy gõ ngay `git reset --hard HEAD@{1}` và toàn bộ 5 commit cùng mã nguồn lập tức sống dậy nguyên vẹn như chưa từng có sự cố.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit reflog\ngit reflog show HEAD\ngit reflog show <tên-nhánh>\ngit reflog --date=relative\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog`: Hiển thị danh sách các lần dịch chuyển gần nhất của con trỏ HEAD kèm theo chỉ số index.\n- `git reflog show HEAD`: Cú pháp tường minh tương đương với lệnh reflog cơ bản.\n- `git reflog show <nhánh>`: Xem lịch sử dịch chuyển con trỏ của một nhánh cụ thể thay vì HEAD.\n- `git reflog --date=relative`: Hiển thị mốc thời gian tương đối như mười phút trước hoặc hai giờ trước.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng reflog tồn tại vĩnh viễn**: Reflog có hạn sử dụng (mặc định 90 ngày cho commit tiếp cận được và 30 ngày cho commit mồ côi) trước khi bị dọn dẹp bởi git gc.\n2. **Tìm kiếm reflog trên GitHub**: Reflog là dữ liệu cục bộ riêng tư trên máy của bạn, không bao giờ được push lên server.\n3. **Nghĩ rằng file chưa commit có thể cứu bằng reflog**: Chỉ những gì đã từng commit thành snapshot mới có dấu vết trong reflog.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tra cứu nhật ký reflog trên terminal.\n1. Tạo 2 commit mới liên tiếp trong kho chứa bài tập.\n2. Chạy lệnh `git reflog` và quan sát các dòng ghi nhận sự kiện commit kèm thông điệp.\n3. Thử chuyển sang một nhánh khác rồi quay lại, sau đó chạy lại `git reflog`.\n4. Quan sát các sự kiện chuyển đổi nhánh checkout được ghi lại chi tiết.\n\n---\n\n## 💡 Hint & mẹo\n> Mỗi khi lỡ tay làm mất commit hoặc nhánh, câu lệnh đầu tiên bạn phải nghĩ đến luôn luôn là `git reflog`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git reflog` hiển thị danh sách các thao tác gần đây với mã SHA và vị trí `HEAD@{n}`.\n- Xác định được mã hash của commit đã bị tách rời để chuẩn bị phục hồi.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ cứu hộ git reflog.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cơ chế dọn rác tự động của Git thông qua lệnh `git gc` và cách Git quản lý thời gian hết hạn của các bản ghi reflog.\n\n---\n\n## 📝 Tổng kết\n- `git reflog` là hộp đen ghi lại mọi sự kiện dịch chuyển của HEAD và các nhánh.\n- Dữ liệu reflog mang tính cục bộ riêng tư trên máy cá nhân, không chia sẻ qua remote.\n- Là nền tảng cốt lõi để khôi phục các commit bị mất do reset, checkout hoặc xóa nhánh.\n",
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
      },
      {
        "id": "q5",
        "question": "Theo cấu hình mặc định của Git, các bản ghi nhật ký trong `git reflog` được lưu trữ trong khoảng thời gian bao lâu trước khi bị dọn dẹp?",
        "type": "single",
        "options": [
          {
            "text": "Từ 30 đến 90 ngày (90 ngày cho commit có thể chạm tới và 30 ngày cho commit mồ côi)",
            "correct": true
          },
          {
            "text": "Chỉ duy nhất 24 giờ sau khi thực hiện thao tác",
            "correct": false
          },
          {
            "text": "Lưu trữ vĩnh viễn suốt đời và không bao giờ bị xóa",
            "correct": false
          },
          {
            "text": "Bị xóa sạch sẽ ngay sau khi bạn đóng cửa sổ terminal",
            "correct": false
          }
        ],
        "explanation": "Mặc định Git cấu hình gc.reflogExpire là 90 ngày và gc.reflogExpireUnreachable là 30 ngày, mang lại thời gian cứu nguy rất thoải mái."
      }
    ]
  }
};
export default lesson;
