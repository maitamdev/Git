import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-git-log",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "08-git-log",
    "title": "Tra cứu lịch sử với git log",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "06-git-commit"
    ],
    "objectives": [
      "Sử dụng thành thạo câu lệnh `git log` để tra cứu lịch sử commit của kho lưu trữ.",
      "Tùy biến hiển thị lịch sử với các cờ mạnh mẽ: `--oneline`, `--graph`, `-n <số-lượng>`, `--author`.",
      "Đọc hiểu mã băm commit, tác giả, ngày giờ và mối liên kết phân nhánh trực quan."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "inspect-history"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git log",
      "lich su",
      "oneline",
      "graph",
      "tra cuu commit"
    ],
    "commands": [
      "git log",
      "git log --oneline",
      "git log --graph --oneline --all",
      "git log -n 5"
    ]
  },
  "content": "# Tra cứu lịch sử với git log\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git log` để tra cứu lịch sử commit của kho lưu trữ.\n- Tùy biến hiển thị lịch sử với các cờ mạnh mẽ: `--oneline`, `--graph`, `-n <số-lượng>`, `--author`.\n- Đọc hiểu mã băm commit, tác giả, ngày giờ và mối liên kết phân nhánh trực quan.\n\n---\n\n## 📖 Định nghĩa\n> `git log` là công cụ tra cứu lịch sử cốt lõi của Git, cho phép bạn duyệt lại toàn bộ các commit snapshot đã được ghi nhận trong kho lưu trữ từ quá khứ cho tới hiện tại. Mỗi mục nhật ký commit hiển thị đầy đủ mã băm SHA-1 (hoặc SHA-256) gồm 40 ký tự định danh duy nhất, tên tác giả, địa chỉ email, mốc thời gian commit và toàn bộ thông điệp mô tả thay đổi. Git cung cấp hàng chục tùy chọn bộ lọc và định dạng để bạn tìm kiếm chính xác những gì mình cần.\n\n---\n\n## 🤔 Tại sao cần?\nKhả năng tra cứu lịch sử một cách nhanh chóng và chính xác là một trong những sức mạnh lớn nhất của hệ thống quản lý phiên bản. Khi một lỗi nghiêm trọng phát sinh trên môi trường production, bạn cần biết chính xác commit nào đã đưa đoạn code lỗi đó vào hệ thống, ai là người tạo commit và lý do thực hiện thay đổi là gì. Sử dụng thành thạo các bộ lọc của `git log` giúp bạn làm chủ thời gian và giải quyết sự cố thần tốc.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git log` giống như cuốn nhật ký hành trình của một con tàu thám hiểm đại dương. Mỗi khi con tàu đi qua một hòn đảo hoặc gặp một cơn bão lớn, thuyền trưởng sẽ mở nhật ký hàng hải ra ghi lại tọa độ kinh độ vĩ độ (mã hash commit), thời gian gió bão (timestamp) và ghi chú nhật ký hành trình (commit message). Khi hậu thế muốn nghiên cứu lại hải trình của chuyến đi, họ chỉ cần lật từng trang nhật ký đó ra để đối chiếu.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTùy biến hiển thị git log --graph --oneline:\n* f7d02a1 (HEAD -> main) feat(payment): add momo e-wallet support\n* 9e1c3d4 feat(cart): calculate discount coupon code\n* 4a2f8b9 fix(auth): prevent sql injection in login query\n* 1b8e4f2 feat: initialize project repository\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư bảo mật cần điều tra một lỗ hổng an ninh vừa được cảnh báo trên thư viện mã nguồn của hệ thống thương mại điện tử. Kỹ sư chạy lệnh `git log --author=\"Alice\" --since=\"2 weeks ago\" --oneline` để lọc ra toàn bộ các commit do lập trình viên Alice thực hiện trong vòng hai tuần vừa qua. Nhờ kết quả hiển thị cô đọng trên từng dòng với mã hash ngắn và thông điệp súc tích, kỹ sư nhanh chóng khoanh vùng được commit cụ thể đã chỉnh sửa tệp cấu hình bảo mật. Kỹ sư mở tiếp chi tiết commit đó bằng lệnh `git show` để đọc từng dòng code sửa đổi và tiến hành phát hành bản vá khẩn cấp ngay trong buổi sáng cùng ngày.\n\n---\n\n## 💻 Command\n```bash\ngit log\ngit log --oneline\ngit log --graph --oneline --all\ngit log -n 5\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log`: Hiển thị lịch sử commit đầy đủ chi tiết theo thứ tự thời gian đảo ngược.\n- `git log --oneline`: Rút gọn mỗi commit thành một dòng duy nhất gồm mã hash ngắn 7 ký tự và thông điệp commit.\n- `git log --graph --oneline --all`: Vẽ đồ thị nhánh ASCII trực quan biểu diễn tất cả các nhánh và mốc rẽ nhánh.\n- `git log -n 5`: Giới hạn kết quả chỉ hiển thị 5 commit gần đây nhất.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Bị kẹt trong giao diện phân trang pager (Less)**:  Khi danh sách log dài, terminal mở công cụ less và người dùng không biết bấm phím `q` để thoát ra.\n2. **Chỉ dùng git log mặc định dài dòng**:  Không biết sử dụng `--oneline` khiến màn hình bị tràn ngập thông tin khó theo dõi.\n3. **Không biết cách lọc theo thời gian hoặc tác giả**:  Phải cuộn chuột thủ công qua hàng ngàn commit thay vì dùng cờ `--author` hoặc `--since`.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh `git log` trong dự án để xem định dạng hiển thị đầy đủ mặc định.\n2. Nhấn phím `q` trên bàn phím để thoát khỏi màn hình xem log nếu danh sách dài.\n3. Chạy lệnh `git log --oneline` để quan sát định dạng tóm tắt thanh lịch.\n4. Thử nghiệm lệnh `git log -n 2` để chỉ hiển thị đúng 2 commit gần nhất.\n\n---\n\n## 💡 Hint\n> Nhấn phím `q` bất cứ khi nào bạn muốn thoát khỏi giao diện xem git log.\n\n---\n\n## ✅ Validation\n- Thực thi thành công `git log --oneline` và đọc được các mã băm commit.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây về các kỹ năng tra cứu lịch sử với git log.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cách sử dụng lệnh `git log -S \"tên_hàm\"` để truy vết commit đã thêm hoặc xóa một đoạn code cụ thể.\n\n---\n\n## 📚 Tổng kết\n- `git log` hiển thị toàn bộ lịch sử commit theo thứ tự từ mới nhất đến cũ nhất.\n- Cờ `--oneline` giúp rút gọn mỗi commit thành một dòng trực quan dễ theo dõi.\n- Nhấn phím `q` trên bàn phím để thoát khỏi chế độ xem phân trang của git log.\n",
  "quiz": {
    "id": "quiz-02-08-git-log",
    "title": "Trắc nghiệm: Tra cứu lịch sử với git log",
    "questions": [
      {
        "id": "q1",
        "question": "Phím nào trên bàn phím dùng để thoát khỏi màn hình hiển thị danh sách git log dài?",
        "type": "single",
        "options": [
          {
            "text": "Phím q (quit)",
            "correct": true
          },
          {
            "text": "Phím Esc",
            "correct": false
          },
          {
            "text": "Phím Ctrl + C",
            "correct": false
          },
          {
            "text": "Phím Enter",
            "correct": false
          }
        ],
        "explanation": "Git log sử dụng trình xem văn bản `less` của Unix, nhấn phím `q` để thoát ra dòng lệnh."
      },
      {
        "id": "q2",
        "question": "Cờ tùy chọn `--oneline` trong lệnh git log mang lại tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Rút gọn mỗi commit thành một dòng duy nhất gồm mã hash ngắn và thông điệp commit",
            "correct": true
          },
          {
            "text": "Chỉ hiển thị dòng code đầu tiên của tệp tin index.html",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các commit chỉ giữ lại một commit duy nhất",
            "correct": false
          },
          {
            "text": "Kết nối mạng Internet để kiểm tra trạng thái online",
            "correct": false
          }
        ],
        "explanation": "`--oneline` là tùy chọn cực kỳ phổ biến giúp hiển thị lịch sử cô đọng, dễ đọc lướt nhanh."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây chỉ hiển thị đúng 3 commit gần đây nhất trong lịch sử?",
        "type": "single",
        "options": [
          {
            "text": "git log -n 3 hoặc git log -3",
            "correct": true
          },
          {
            "text": "git log --limit-top-3",
            "correct": false
          },
          {
            "text": "git log --first 3",
            "correct": false
          },
          {
            "text": "git show -3 commits",
            "correct": false
          }
        ],
        "explanation": "Cú pháp `-n <số>` hoặc `-<số>` giới hạn số lượng commit được hiển thị trong kết quả log."
      },
      {
        "id": "q4",
        "question": "Để xem đồ thị phân nhánh trực quan bằng các ký tự ASCII trong terminal, bạn dùng cờ nào?",
        "type": "single",
        "options": [
          {
            "text": "--graph",
            "correct": true
          },
          {
            "text": "--tree-view",
            "correct": false
          },
          {
            "text": "--draw-diagram",
            "correct": false
          },
          {
            "text": "--ascii-art",
            "correct": false
          }
        ],
        "explanation": "`--graph` vẽ các đường nhánh và mốc hợp nhất commit bằng đồ thị ký tự trực quan ngay trong terminal."
      }
    ]
  }
};
export default lesson;
