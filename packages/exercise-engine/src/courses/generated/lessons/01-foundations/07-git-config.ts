import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-git-config",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "07-git-config",
    "title": "Cấu hình danh tính Git Config",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "06-git-installation"
    ],
    "objectives": [
      "Sử dụng thành thạo lệnh `git config` để thiết lập danh tính lập trình viên: user.name và user.email.",
      "Phân biệt rõ 3 cấp độ cấu hình: --system, --global, và --local.",
      "Hiểu tầm quan trọng của việc dùng đúng email đồng bộ với tài khoản GitHub để hiển thị đóng góp (contribution)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git config",
      "user.name",
      "user.email",
      "danh tinh",
      "author"
    ],
    "commands": [
      "git config --global user.name \"Nguyen Van A\"",
      "git config --global user.email \"vana@example.com\"",
      "git config --list"
    ]
  },
  "content": "# Cấu hình danh tính Git Config\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo lệnh `git config` để thiết lập danh tính lập trình viên: user.name và user.email.\n- Phân biệt rõ 3 cấp độ cấu hình: --system, --global, và --local.\n- Hiểu tầm quan trọng của việc dùng đúng email đồng bộ với tài khoản GitHub để hiển thị đóng góp (contribution).\n\n---\n\n## 📖 Định nghĩa\n> `git config` là câu lệnh thiết lập và truy vấn các biến cấu hình điều khiển giao diện và hành vi hoạt động của Git. Hai tham số quan trọng nhất bắt buộc phải cấu hình đầu tiên trên mọi máy tính mới là `user.name` (họ tên lập trình viên) và `user.email` (địa chỉ thư điện tử). Các thông tin này sẽ được gắn cố định vào mọi commit mà bạn tạo ra để xác định danh tính tác giả (author). Git hỗ trợ ba cấp độ cấu hình có độ ưu tiên tăng dần: system (toàn máy), global (toàn tài khoản người dùng), và local (riêng cho từng kho chứa cụ thể).\n\n---\n\n## 🤔 Tại sao cần?\nNếu không cấu hình `user.name` và `user.email`, Git sẽ từ chối không cho phép bạn tạo commit, hoặc sẽ tự động lấy tên tài khoản đăng nhập máy tính kèm địa chỉ hostname cục bộ kỳ quặc. Nghiêm trọng hơn, nếu bạn dùng email không khớp với tài khoản GitHub, toàn bộ commit bạn dày công đóng góp cho dự án sẽ không được ghi nhận biểu đồ đóng góp (xanh ô contribution graph) trên trang cá nhân GitHub của bạn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc thiết lập `git config` giống như việc bạn khắc một con dấu mộc chữ ký cá nhân bằng đồng. Mỗi khi bạn ký kết một hợp đồng kinh tế (tạo một commit), bạn sẽ đóng con dấu mộc có tên và email của mình lên góc dưới văn bản. Mọi đối tác và thành viên trong dự án khi nhìn vào văn bản đó đều biết chính xác ai là người chịu trách nhiệm cho các điều khoản và thay đổi vừa thực hiện.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCác cấp độ cấu hình Git (Ưu tiên từ dưới lên trên):\n┌───────────────────────────────────────────────┐\n│ --system: Cấu hình cho mọi người dùng trên PC │\n└───────────────────────────────────────────────┘\n                       ▲\n┌───────────────────────────────────────────────┐\n│ --global: Cấu hình cho tài khoản người dùng   │\n└───────────────────────────────────────────────┘\n                       ▲\n┌───────────────────────────────────────────────┐\n│ --local: Cấu hình riêng cho 1 repository này  │ (Độ ưu tiên cao nhất)\n└───────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Nguyễn Văn A sử dụng máy tính xách tay cá nhân để vừa làm việc cho công ty vừa tham gia dự án mã nguồn mở ngoài giờ. Ở cấp độ toàn cục (`--global`), kỹ sư thiết lập email cá nhân `anguyen@gmail.com`. Nhưng khi làm việc trong thư mục dự án của công ty, kỹ sư mở terminal tại kho chứa đó và cấu hình cục bộ (`--local`): `git config user.email \"a.nguyen@company.vn\"`. Khi đó, các commit trong dự án công ty sẽ mang danh tính email doanh nghiệp được xác thực, còn các dự án cá nhân khác trên cùng máy tính vẫn dùng email riêng tư mà không hề bị xung đột hay rò rỉ thông tin.\n\n---\n\n## 💻 Command\n```bash\ngit config --global user.name \"Nguyen Van A\"\ngit config --global user.email \"vana@example.com\"\ngit config --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git config --global user.name \"Tên Tác Giả\"`: Thiết lập họ tên hiển thị của bạn cho toàn bộ các repository trên máy tính cá nhân.\n- `git config --global user.email \"email@domain.com\"`: Thiết lập địa chỉ thư điện tử gắn chặt vào siêu dữ liệu của từng commit.\n- `git config --list`: Liệt kê toàn bộ danh sách các thông số cấu hình Git đang có hiệu lực trên hệ thống.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gõ sai địa chỉ email**:  Dùng email phụ hoặc sai chính tả khiến GitHub không nhận diện được tác giả và không tích điểm xanh trên trang cá nhân.\n2. **Nghĩ git config là mật khẩu đăng nhập**:  `user.name` và `user.email` chỉ là chữ ký nhãn thông tin, không phải thông tin bảo mật hay mật khẩu tài khoản.\n3. **Quên kiểm tra lại sau khi cấu hình**:  Không chạy `git config --list` để xác nhận lại thông tin đã lưu chính xác hay chưa.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git config user.name \"Student Name\"` để cấu hình danh tính của bạn.\n2. Chạy lệnh `git config user.email \"student@git.academy\"` để thiết lập địa chỉ thư điện tử.\n3. Sử dụng `git config --list` để kiểm tra danh sách cấu hình và xác nhận kết quả.\n\n---\n\n## 💡 Hint\n> Sử dụng cờ `--global` khi muốn áp dụng cấu hình cho mọi dự án trên máy.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git config user.name` và `user.email` trả về đúng chuỗi đã thiết lập.\n\n---\n\n## ❓ Quiz\nHãy thực hiện bài trắc nghiệm sau về cách sử dụng lệnh git config.\n\n---\n\n## 🔥 Challenge\nNêu thứ tự ưu tiên ghi đè giữa 3 cấp độ: --system, --global và --local.\n\n---\n\n## 📚 Tổng kết\n- `git config` là câu lệnh thiết lập danh tính tác giả và hành vi của Git.\n- `user.name` và `user.email` được nhúng vĩnh viễn vào siêu dữ liệu của mỗi commit.\n- Thứ tự ưu tiên cấu hình tăng dần: System -> Global -> Local (Local ghi đè Global).\n",
  "quiz": {
    "id": "quiz-07-git-config",
    "title": "Trắc nghiệm: Cấu hình danh tính với git config",
    "questions": [
      {
        "id": "q1",
        "question": "Hai thông số cấu hình tối thiểu bắt buộc phải thiết lập trước khi tạo commit đầu tiên là gì?",
        "type": "single",
        "options": [
          {
            "text": "user.name và user.email",
            "correct": true
          },
          {
            "text": "user.password và user.token",
            "correct": false
          },
          {
            "text": "system.port và network.ip",
            "correct": false
          },
          {
            "text": "github.username và github.apikey",
            "correct": false
          }
        ],
        "explanation": "Git yêu cầu tên tác giả (user.name) và email (user.email) để nhúng vào thông tin commit."
      },
      {
        "id": "q2",
        "question": "Cấp độ cấu hình nào có độ ưu tiên cao nhất trong Git?",
        "type": "single",
        "options": [
          {
            "text": "--local (Cấu hình riêng trong repository hiện tại)",
            "correct": true
          },
          {
            "text": "--global (Cấu hình cho toàn bộ tài khoản người dùng)",
            "correct": false
          },
          {
            "text": "--system (Cấu hình cho toàn bộ máy tính)",
            "correct": false
          },
          {
            "text": "Tất cả các cấp độ đều có độ ưu tiên ngang nhau",
            "correct": false
          }
        ],
        "explanation": "Cấu hình `--local` ghi trong `.git/config` có độ ưu tiên cao nhất, đè lên `--global` và `--system`."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để xem tất cả các thiết lập cấu hình Git đang có hiệu lực?",
        "type": "single",
        "options": [
          {
            "text": "git config --list",
            "correct": true
          },
          {
            "text": "git show-config-all",
            "correct": false
          },
          {
            "text": "git config --print-screen",
            "correct": false
          },
          {
            "text": "git status --config",
            "correct": false
          }
        ],
        "explanation": "`git config --list` hoặc `git config -l` in ra toàn bộ các cặp key=value đang có hiệu lực."
      },
      {
        "id": "q4",
        "question": "Thông tin `user.email` trong git config có vai trò gì trên GitHub?",
        "type": "single",
        "options": [
          {
            "text": "Dùng để ánh xạ commit vào tài khoản GitHub tương ứng và tính điểm đóng góp",
            "correct": true
          },
          {
            "text": "Dùng làm mật khẩu để đăng nhập vào trang web GitHub",
            "correct": false
          },
          {
            "text": "Dùng để gửi email thông báo mã nguồn bị lỗi cú pháp",
            "correct": false
          },
          {
            "text": "Dùng để thanh toán hóa đơn lưu trữ đám mây hàng tháng",
            "correct": false
          }
        ],
        "explanation": "GitHub đối chiếu email trong tác giả commit với email trong tài khoản để hiển thị avatar và biểu đồ đóng góp."
      }
    ]
  }
};
export default lesson;
