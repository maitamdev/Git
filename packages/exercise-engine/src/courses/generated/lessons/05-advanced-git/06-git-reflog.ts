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
      "Hiểu reflog ghi lại các lần cập nhật HEAD, nhánh và một số ref cục bộ khác.",
      "Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).",
      "Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.",
      "Biết reflog không lưu file chưa commit và các entry có thể hết hạn theo cấu hình."
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
      "git status"
    ]
  },
  "content": "# git reflog\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu reflog là nhật ký ghi lại các lần cập nhật `HEAD`, nhánh và một số tham chiếu cục bộ khác.\n- Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).\n- Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.\n- Biết giới hạn của reflog: hữu ích để tìm commit đã từng được tham chiếu, nhưng không lưu nội dung sửa đổi chưa commit.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git reflog\n- **Nói dễ hiểu**: Nhật ký các lần Git cập nhật `HEAD` hoặc một tham chiếu cục bộ như nhánh.\n- **Ví dụ**: Gõ `git reflog` để tìm lại mã hash của một commit vừa lỡ tay xóa bằng `git reset --hard`.\n- **Đừng nhầm**: Reflog không được gửi lên remote qua `git push`; mỗi bản clone có nhật ký cục bộ riêng.\n\n### HEAD@{n}\n- **Nói dễ hiểu**: Ký hiệu tra một entry cũ trong reflog của `HEAD`.\n- **Ví dụ**: `HEAD@{1}` là entry đứng trước entry mới nhất trong reflog của `HEAD`.\n- **Đừng nhầm**: Không phải số thứ tự commit hoặc lệnh terminal; reflog chỉ ghi các lần ref được cập nhật.\n\n### Reflog entry\n- **Nói dễ hiểu**: Một dòng ghi nhận ref cũ và mới khi Git cập nhật tham chiếu.\n- **Ví dụ**: Sau `git reset`, entry có thể giúp bạn tìm hash mà `HEAD` vừa rời khỏi.\n- **Đừng nhầm**: Entry giúp tìm commit; nó không chứa bản sao các chỉnh sửa file chưa commit.\n\n---\n\n## 📖 Định nghĩa\n`git reflog` (Reference Logs - nhật ký tham chiếu) hiển thị các lần cập nhật tham chiếu trong kho cục bộ. `git log` xem các commit đi theo lịch sử của một nhánh; reflog còn có thể giúp tìm commit mà nhánh đã rời khỏi. Reflog không ghi mọi lệnh Git và không lưu file chưa commit.\n\n---\n\n## 🤔 Tại sao cần?\nNếu lỡ tay reset hoặc xóa nhánh, reflog có thể giúp tìm commit đã từng được tham chiếu. Khả năng khôi phục phụ thuộc vào việc entry còn tồn tại và commit object chưa bị dọn. Reflog không lưu các thay đổi chưa commit.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git log` như danh sách commit có thể đi tới từ nhánh hiện tại. Reflog giống sổ ghi những lần các tham chiếu cục bộ được cập nhật. Đây là nhật ký giới hạn thời gian, không ghi mọi lệnh và không bảo đảm mọi commit vẫn còn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSự khác biệt giữa git log và git reflog:\ngit log:    Chỉ nhìn thấy các commit còn kết nối trong nhánh hiện tại.\n            C1 ──► C2 (mất dấu C3 vì đã lỡ reset --hard về C2)\n\ngit reflog: Ví dụ các entry cập nhật HEAD:\n            HEAD@{0}: reset: moving to HEAD~1\n            HEAD@{1}: commit: feat: awesome feature (vị trí trước đó)\n            HEAD@{2}: commit: fix: minor bug (C2)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Huy lỡ tay chạy `git reset --hard HEAD~5`, khiến các commit gần đây không còn trên nhánh hiện tại. Huy dừng lại, kiểm tra `git status` và `git reflog`, rồi chép hash của commit cần giữ. Sau khi xác minh hash, Huy tạo nhánh cứu hộ bằng `git branch rescue-payment <hash>`. Cách này giữ commit mà không di chuyển nhánh hiện tại; thay đổi chưa commit đã bị reset thì reflog không khôi phục được.\n\n---\n\n## 💻 Command\n```bash\ngit reflog\n```\n\nGit thật còn hỗ trợ `git reflog show <nhánh>` và `git reflog --date=relative`; simulator chỉ hiển thị reflog cơ bản của `HEAD`.\n\n---\n\n## 🔍 Giải thích command\n- `git reflog`: Hiển thị các entry của HEAD; khi đọc entry, đối chiếu hash với `git show` hoặc `git log`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng reflog tồn tại vĩnh viễn**: mặc định Git thường đặt thời hạn 90 ngày cho entry còn reachable và 30 ngày cho entry unreachable; cấu hình và garbage collection có thể làm thời hạn khác đi.\n2. **Tìm reflog trên GitHub sau khi push**: `git push` cập nhật ref từ xa, không đồng bộ reflog của máy bạn.\n3. **Nghĩ rằng file chưa commit có thể cứu bằng reflog**: Chỉ những gì đã từng commit thành snapshot mới có dấu vết trong reflog.\n\n---\n\n## 🧪 Lab\nHãy cùng tôi mở cuốn \"hộp đen\" git reflog và thực hành truy vết từng chuyển động của con trỏ HEAD:\n1. Tạo 2 commit mới liên tiếp trong kho chứa bài tập.\n2. Chạy lệnh `git reflog` và quan sát các dòng ghi nhận sự kiện commit kèm thông điệp.\n3. Thử chuyển sang một nhánh khác rồi quay lại, sau đó chạy lại `git reflog`.\n4. Quan sát các sự kiện chuyển đổi nhánh checkout được ghi lại chi tiết.\n\n---\n\n## 💡 Hint\n> Khi nghi mất commit, trước tiên dừng các thao tác ghi, kiểm tra trạng thái repo, rồi đọc `git reflog` để tìm hash cần giữ.\n\n---\n\n## ✅ Validation\n- Lệnh `git reflog` hiển thị các lần cập nhật ref gần đây cùng mã commit.\n- Xác định được commit cũ khi entry còn trong reflog và object vẫn còn trong kho.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ cứu hộ git reflog.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cơ chế dọn rác tự động của Git thông qua lệnh `git gc` và cách Git quản lý thời gian hết hạn của các bản ghi reflog.\n\n---\n\n## 📚 Tổng kết\n- `git reflog` ghi lại một số lần cập nhật ref cục bộ như `HEAD` và nhánh; nó không ghi mọi lệnh.\n- Dữ liệu reflog mang tính cục bộ riêng tư trên máy cá nhân, không chia sẻ qua remote.\n- Là nền tảng cốt lõi để khôi phục các commit bị mất do reset, checkout hoặc xóa nhánh.\n",
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
            "text": "git log duyệt lịch sử commit; reflog ghi các lần cập nhật ref cục bộ như HEAD hoặc nhánh",
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
        "explanation": "`reflog` ghi các lần cập nhật ref cục bộ, không phải mọi lệnh Git. Nó có thể giúp tìm commit mà nhánh đã rời khỏi."
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
            "text": "Không, reflog không được đẩy lên remote; mỗi clone có reflog cục bộ riêng",
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
        "explanation": "Push gửi ref và đối tượng cần thiết, không đồng bộ nhật ký reflog. Clone khác có reflog riêng."
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
            "text": "Mặc định thường là 90 ngày với entry còn truy cập được và 30 ngày với entry không còn truy cập được; cấu hình có thể đổi",
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
        "explanation": "Git mặc định đặt thời hạn khác nhau cho entry reachable và unreachable; cấu hình repo, người dùng hoặc garbage collection có thể làm thay đổi thời gian thực tế."
      }
    ]
  }
};
export default lesson;
