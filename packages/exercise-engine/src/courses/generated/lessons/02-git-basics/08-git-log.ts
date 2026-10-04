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
      "Dùng `git log` để xem các commit trong lịch sử nhánh hiện tại.",
      "Dùng `--oneline` để rút gọn và `-n` để giới hạn số commit.",
      "Giới hạn số kết quả bằng `-n`."
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
      "tra cuu commit"
    ],
    "commands": [
      "git log",
      "git log --oneline",
      "git log -n 5"
    ]
  },
  "content": "# Tra cứu lịch sử với git log\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo `git log` để duyệt ngược dòng thời gian các mốc commit trong dự án.\n- Tối ưu hóa tầm nhìn bằng cờ `--oneline` và giới hạn phạm vi hiển thị bằng tham số `-n`.\n- Hiểu rõ ý nghĩa của mã băm Commit Hash và con trỏ điều hướng `HEAD`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git log` — xem lịch sử commit\n- **Nói dễ hiểu:** Cuốn nhật ký hành trình liệt kê toàn bộ các mốc commit đã được lưu lại trong lịch sử dự án.\n- **Ví dụ:** Chạy `git log` để rà soát toàn bộ các mốc thay đổi từ ngày khởi tạo dự án tới nay.\n- **Đừng nhầm:** Lệnh chỉ hiển thị những thay đổi đã được commit; các chỉnh sửa dở dang ở Working Tree sẽ không xuất hiện.\n\n### Commit hash — mã nhận diện commit\n- **Nói dễ hiểu:** Chuỗi băm ký tự độc nhất vô nhị (SHA-1 dài 40 ký tự) đóng vai trò như số căn cước công dân của commit.\n- **Ví dụ:** Mã băm ngắn `7a3f1b2` hiển thị cạnh lời nhắn trong lệnh `git log --oneline`.\n- **Đừng nhầm:** Đây là mã băm mã hóa tính toán tự động từ nội dung, không phải số thứ tự tăng dần do con người đặt.\n\n### `--oneline` — dạng lịch sử gọn\n- **Nói dễ hiểu:** Cờ tùy chọn cô đọng mỗi commit thành đúng một dòng duy nhất gồm mã hash ngắn và thông điệp.\n- **Ví dụ:** `git log --oneline` giúp bạn lướt nhanh 20 commit trên một màn hình mà không bị cuộn mỏi tay.\n- **Đừng nhầm:** Định dạng này ẩn đi thông tin tác giả và ngày giờ; khi cần điều tra chi tiết hãy dùng `git log` đầy đủ.\n\n### `-n` — giới hạn số commit\n- **Nói dễ hiểu:** Tham số chỉ định số lượng commit gần nhất mà bạn muốn màn hình hiển thị ra.\n- **Ví dụ:** `git log -n 5` chỉ xuất ra đúng 5 commit mới nhất thay vì in ra hàng nghìn commit làm đơ terminal.\n- **Đừng nhầm:** Lệnh chỉ cắt bớt số lượng hiển thị trên màn hình hiện tại, tuyệt đối không làm mất mát lịch sử repo.\n\n### HEAD — mốc Git đang đứng tại\n- **Nói dễ hiểu:** Con trỏ đặc biệt đánh dấu vị trí snapshot hiện tại mà thư mục làm việc của bạn đang neo vào.\n- **Ví dụ:** Nhìn thấy `(HEAD -> main)` trong log nghĩa là bạn đang đứng ở commit mới nhất của nhánh `main`.\n- **Đừng nhầm:** HEAD là một con trỏ động di chuyển liên tục theo mỗi commit mới, không phải là tên của một commit cố định.\n\n---\n\n## 📖 Định nghĩa\n`git log` là cỗ máy thời gian của Git, cho phép bạn truy xuất toàn bộ biên niên sử các commit có thể đi tới từ vị trí hiện tại. Lệnh hiển thị danh sách đảo ngược theo thời gian (mới nhất lên đầu), bao gồm mã băm định danh duy nhất (commit hash), tác giả, mốc thời gian và thông điệp chi tiết của từng snapshot.\n\n---\n\n## 🤔 Tại sao cần?\nLập trình mà không đọc được log cũng giống như điều tra vụ án mà không có hồ sơ hiện trường. `git log` là công cụ sống còn giúp bạn nắm bắt tiến độ dự án, hiểu được ai đã thay đổi tính năng gì và tại sao. Khi phần mềm gặp sự cố hoặc xảy ra lỗi hồi quy (regression), `git log` chính là chiếc la bàn dẫn lối giúp bạn truy ngược lại đúng commit đã gây ra lỗi để khắc phục kịp thời.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng dự án của bạn là một cuốn biên niên sử dài kỳ. Mỗi commit là một trang nhật ký đã đóng bìa cứng không thể tẩy xóa. Lệnh `git log` lật giở từng trang nhật ký từ hiện tại ngược dần về quá khứ, giúp bạn theo dõi từng bước trưởng thành của hệ thống phần mềm.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCẤU TRÚC HIỂN THỊ CỦA GIT LOG --ONELINE:\n  1a2b3c4 (HEAD -> main) feat(auth): add google login   <── Commit mới nhất\n  5d6e7f8 fix(payment): resolve total rounding bug      <── Commit liền trước\n  9a0b1c2 docs(readme): initialize project guidelines   <── Commit khởi tạo\n     │           │                    │\n     │           │                    └── Commit Message (Nội dung thay đổi)\n     │           └─────────────────────── Con trỏ HEAD và Branch hiện tại\n     └─────────────────────────────────── Mã Commit Hash rút gọn (7 ký tự)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSáng thứ Hai đến công ty sau kỳ nghỉ cuối tuần, bạn muốn nắm nhanh những gì đồng đội đã hoàn thành. Thay vì phải đi hỏi từng người, bạn mở terminal gõ `git log --oneline -n 5`. Chỉ mất 3 giây, bạn thấy ngay 5 commit gần nhất: từ thêm API thanh toán, sửa lỗi giao diện cho đến cập nhật tài liệu hướng dẫn.\n\n---\n\n## 💻 Command\n```bash\ngit log\ngit log --oneline\ngit log -n 5\ngit log --oneline --graph --all\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log`: Hiển thị chi tiết toàn bộ lịch sử (Hash đầy đủ, Tác giả, Ngày giờ, Message). Kết quả thường chạy qua pager (Less/More).\n- `git log --oneline`: Định dạng một dòng tối giản, hiển thị mã hash 7 ký tự đầu và dòng đầu của commit message.\n- `git log -n <số>`: Giới hạn số lượng commit xuất ra, ngăn chặn tình trạng tràn màn hình trong các dự án có hàng vạn commit.\n- Nhấn phím `q` để thoát chế độ xem phân trang bất cứ lúc nào.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng loạn khi bị kẹt trong màn hình log**: Git tự động mở chương trình phân trang `less`; nhiều bạn mới không biết cách thoát và tắt ngang terminal. Hãy nhớ nhấn phím `q` (quit) để thoát an toàn!\n2. **Chỉ dùng mỗi lệnh `git log` mặc định**: Khiến màn hình cuộn dài bất tận, khó quan sát tổng thể; hãy tạo thói quen dùng `git log --oneline`.\n3. **Hiểu nhầm commit hash là ngẫu nhiên**: Mã hash được sinh ra từ thuật toán băm nội dung; chỉ cần một dấu cách thay đổi, mã hash sẽ biến đổi hoàn toàn.\n\n---\n\n## 🧪 Lab\n1. Chạy `git log` trong kho lưu trữ để kiểm tra toàn bộ lịch sử hiện có.\n2. Nếu màn hình dừng lại ở dấu hai chấm `:`, hãy nhấn phím `q` trên bàn phím để trở về dòng lệnh terminal.\n3. Chạy `git log --oneline` để ngắm nhìn lịch sử được trình bày gọn gàng theo từng dòng.\n4. Chạy `git log -n 2` để chỉ hiển thị đúng hai commit gần nhất.\n\n---\n\n## 💡 Hint\n> Khi terminal hiển thị dấu `:` ở góc dưới cùng lúc chạy `git log`, đừng gõ lệnh mới, hãy nhấn phím `q` trên bàn phím để thoát ngay!\n\n---\n\n## ✅ Validation\n- Nhận diện và đọc hiểu được mã Hash rút gọn cùng Commit Message từ lệnh `git log --oneline`.\n- Thoát khỏi chế độ xem phân trang một cách thuần thục với phím `q`.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để củng cố kỹ năng tra cứu và phân tích lịch sử commit bằng `git log`.\n\n---\n\n## 🔥 Challenge\nHãy chạy lệnh `git log --oneline -n 3` trong một kho mã nguồn thực tế. Chọn ra commit ở giữa và giải thích chi tiết: mã hash đại diện cho điều gì và thông điệp commit đã giúp ích gì cho việc hiểu lịch sử dự án?\n\n---\n\n## 📚 Tổng kết\n- `git log` là công cụ truy vết lịch sử commit theo thứ tự thời gian đảo ngược.\n- Cờ `--oneline` giúp tối ưu hóa không gian hiển thị, hỗ trợ bao quát tiến độ dự án chỉ trong một ánh nhìn.\n- Nhớ quy tắc sinh tồn: luôn nhấn phím `q` để thoát khỏi màn hình phân trang của `git log`.\n",
  "quiz": {
    "id": "quiz-02-08-git-log",
    "title": "Trắc nghiệm: Tra cứu lịch sử với git log",
    "questions": [
      {
        "id": "q1",
        "question": "Nếu Git mở kết quả log theo từng trang, phím nào đưa bạn về terminal?",
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
        "explanation": "Trong trình xem phân trang thường dùng với Git, nhấn `q` để thoát."
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
        "question": "Lệnh nào giới hạn kết quả còn tối đa 3 commit gần nhất?",
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
        "question": "Theo thứ tự mặc định của `git log`, commit nào thường hiện ở đầu danh sách?",
        "type": "single",
        "options": [
          {
            "text": "Commit mới nhất mà nhánh hiện tại có thể đi tới",
            "correct": true
          },
          {
            "text": "Commit cũ nhất trong toàn bộ kho Git",
            "correct": false
          },
          {
            "text": "Commit đang chờ được tạo từ Staging Area",
            "correct": false
          },
          {
            "text": "Commit mới nhất trên GitHub, dù nhánh hiện tại không có commit đó",
            "correct": false
          }
        ],
        "explanation": "`git log` bắt đầu từ vị trí hiện tại và hiển thị commit mới trước các commit cha của nó."
      },
      {
        "id": "q5",
        "question": "Nếu muốn xem lịch sử commit ở dạng gọn, mỗi commit một dòng, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "`git log --oneline`",
            "correct": true
          },
          {
            "text": "`git status --short`",
            "correct": false
          },
          {
            "text": "`git diff --staged`",
            "correct": false
          },
          {
            "text": "`git add --oneline`",
            "correct": false
          }
        ],
        "explanation": "`git log --oneline` hiển thị mỗi commit trên một dòng với mã hash ngắn và thông điệp."
      }
    ]
  }
};
export default lesson;
