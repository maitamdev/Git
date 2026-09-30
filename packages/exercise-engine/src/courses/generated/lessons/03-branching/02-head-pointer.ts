import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-head-pointer",
  "moduleId": "03-branching",
  "metadata": {
    "id": "02-head-pointer",
    "title": "Con trỏ HEAD & Detached HEAD",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-branch-concept"
    ],
    "objectives": [
      "Hiểu rõ cơ chế hoạt động của Symbolic Reference HEAD trong việc định vị không gian làm việc.",
      "Giải thích hiện tượng Detached HEAD state và nguyên nhân kích hoạt trạng thái này.",
      "Biết cách thoát khỏi Detached HEAD an toàn mà không làm thất lạc các commit thử nghiệm.",
      "Sử dụng lệnh git checkout hoặc git switch để điều hướng con trỏ HEAD chính xác."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "head",
      "detached head",
      "con tro head",
      "checkout commit",
      "symbolic ref"
    ],
    "commands": [
      "git status",
      "git checkout <commit-hash>",
      "git switch <tên-nhánh>",
      "git switch -c <nhánh-mới>"
    ]
  },
  "content": "# Con trỏ HEAD & Detached HEAD\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ cơ chế hoạt động của Symbolic Reference HEAD trong việc định vị không gian làm việc.\n- Giải thích hiện tượng Detached HEAD state và nguyên nhân kích hoạt trạng thái này.\n- Biết cách thoát khỏi Detached HEAD an toàn mà không làm thất lạc các commit thử nghiệm.\n- Sử dụng lệnh git checkout hoặc git switch để điều hướng con trỏ HEAD chính xác.\n\n---\n\n## 📖 Định nghĩa\n> HEAD trong Git là một con trỏ đặc biệt (symbolic reference) chỉ định vị trí làm việc hiện tại của Working Tree trong đồ thị lịch sử. Trong điều kiện bình thường, HEAD không trỏ trực tiếp vào commit mà trỏ gián tiếp thông qua một con trỏ nhánh (ví dụ: `HEAD -> refs/heads/main`). Tuy nhiên, khi bạn checkout trực tiếp tới một mã băm commit cụ thể thay vì một nhánh, Git sẽ rơi vào trạng thái Detached HEAD: lúc này HEAD trỏ thẳng vào commit đó mà không có bất kỳ con trỏ nhánh nào đi kèm.\n\n---\n\n## 🤔 Tại sao cần?\nTrạng thái Detached HEAD là một trong những khái niệm khiến người mới học bối rối và hoảng loạn nhất khi terminal cảnh báo dữ liệu có thể bị mất. Hiểu rõ bản chất của HEAD giúp bạn tự tin quay ngược thời gian để kiểm tra lại một phiên bản cũ của ứng dụng, chạy thử nghiệm các đoạn code lịch sử, hoặc gỡ lỗi sự cố mà không sợ làm hỏng nhánh chính. Bạn cũng sẽ biết cách tạo nhánh mới để giữ lại các commit quý giá sinh ra trong trạng thái này.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung con trỏ HEAD giống như chiếc kim đọc đĩa trên một đầu phát đĩa than cổ điển, hoặc mắt đọc laser của đầu đĩa DVD. Đĩa than chứa nhiều rãnh nhạc khác nhau (các nhánh). Chiếc kim đọc đĩa (HEAD) đặt vào rãnh nhạc nào thì loa sẽ phát ra giai điệu của bài hát đó (Working Tree hiển thị code của nhánh đó). Khi bạn nhấc chiếc kim đọc đĩa ra và đặt tự do vào chính giữa đĩa ở một bài hát cũ (Detached HEAD), bạn vẫn nghe được nhạc, nhưng nếu bạn muốn ghi âm bài mới thì bạn cần cắm một chiếc cờ đánh dấu rãnh mới.\n\n---\n\n## 🖼 Sơ đồ\n```text\nHEAD bình thường vs Detached HEAD:\nTrạng thái bình thường:        Trạng thái Detached HEAD:\nHEAD ──► main ──► Commit C3    HEAD ──────────► Commit C2\n                               main ──────────► Commit C3\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm muốn kiểm tra xem lỗi mất kết nối cơ sở dữ liệu đã từng xuất hiện ở bản phát hành v1.2 cách đây ba tháng hay chưa. Kỹ sư gõ lệnh `git checkout a4f91b2` để đưa HEAD về đúng commit của bản phát hành đó. Terminal hiển thị cảnh báo You are in detached HEAD state. Kỹ sư chạy thử ứng dụng và phát hiện lỗi chưa có ở thời điểm này. Sau khi xác minh xong, kỹ sư chỉ việc gõ `git switch main` để đưa HEAD quay trở lại đỉnh nhánh chính một cách an toàn và nhẹ nhàng.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit checkout <commit-hash>\ngit switch <tên-nhánh>\ngit switch -c <nhánh-mới>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị rõ ràng HEAD đang gắn với nhánh nào hoặc đang ở trạng thái Detached HEAD tại commit nào.\n- `git checkout <commit-hash>`: Di chuyển trực tiếp con trỏ HEAD tới một commit trong quá khứ, kích hoạt trạng thái Detached HEAD.\n- `git switch <tên-nhánh>`: Đưa con trỏ HEAD gắn trở lại vào một nhánh an toàn, thoát khỏi Detached HEAD.\n- `git switch -c <nhánh-mới>`: Tạo nhánh mới ngay tại vị trí commit hiện tại để giữ lại các commit thử nghiệm.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng sợ khi thấy thông báo Detached HEAD**:  Đây là tính năng xem lại quá khứ hoàn toàn bình thường của Git chứ không phải lỗi hỏng kho chứa.\n2. **Commit nhiều việc trên Detached HEAD rồi chuyển nhánh mà không tạo branch**:  Các commit đó sẽ trở thành commit mồ côi (dangling commits) và có thể bị dọn rác sau này.\n3. **Dùng git checkout nhầm lẫn giữa tệp và nhánh**:  Nên dùng `git switch` để chuyển nhánh và `git restore` để phục hồi tệp.\n\n---\n\n## 🧪 Lab\n1. Xem mã hash của commit trước đó bằng `git log --oneline`.\n2. Thực hiện checkout về commit cũ đó để trải nghiệm trạng thái Detached HEAD.\n3. Chạy `git status` để quan sát thông điệp cảnh báo hữu ích của Git.\n4. Chạy lệnh `git switch main` để quay trở lại nhánh chính an toàn.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc: Nếu tạo commit trong Detached HEAD, hãy dùng `git switch -c <tên>` để giữ lại.\n\n---\n\n## ✅ Validation\n- Đưa HEAD quay trở lại an toàn trên nhánh chính và kiểm tra `git status`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây về con trỏ HEAD và trạng thái Detached HEAD.\n\n---\n\n## 🔥 Challenge\nMở tệp `.git/HEAD` bằng lệnh `cat` trong hai trường hợp: bình thường và detached HEAD để so sánh nội dung.\n\n---\n\n## 📚 Tổng kết\n- HEAD là con trỏ chỉ vị trí làm việc hiện tại của Working Tree trong đồ thị Git.\n- Detached HEAD xảy ra khi HEAD trỏ trực tiếp vào commit thay vì qua một nhánh.\n- Thoát khỏi Detached HEAD bằng lệnh `git switch <nhánh>` hoặc tạo nhánh mới với `git switch -c`.\n",
  "quiz": {
    "id": "quiz-03-02-head-pointer",
    "title": "Trắc nghiệm: Con trỏ HEAD và Detached HEAD",
    "questions": [
      {
        "id": "q1",
        "question": "Trong trạng thái làm việc bình thường, tệp tin `.git/HEAD` chứa thông tin gì?",
        "type": "single",
        "options": [
          {
            "text": "Đường dẫn tham chiếu tượng trưng tới nhánh hiện tại (ví dụ: ref: refs/heads/main)",
            "correct": true
          },
          {
            "text": "Mật khẩu mã hóa của toàn bộ kho lưu trữ Git",
            "correct": false
          },
          {
            "text": "Danh sách các lập trình viên bị cấm truy cập dự án",
            "correct": false
          },
          {
            "text": "Toàn bộ mã nguồn của trang chủ website",
            "correct": false
          }
        ],
        "explanation": "Tệp .git/HEAD chứa dòng `ref: refs/heads/<nhánh>` chỉ định nhánh hiện tại đang được kích hoạt."
      },
      {
        "id": "q2",
        "question": "Hiện tượng \"Detached HEAD\" xảy ra khi nào?",
        "type": "single",
        "options": [
          {
            "text": "Khi con trỏ HEAD trỏ trực tiếp vào một mã băm commit cụ thể thay vì trỏ vào một nhánh",
            "correct": true
          },
          {
            "text": "Khi máy tính bị mất kết nối mạng cáp quang quốc tế",
            "correct": false
          },
          {
            "text": "Khi ổ cứng máy tính bị đầy dung lượng không thể ghi thêm",
            "correct": false
          },
          {
            "text": "Khi bạn gõ sai mật khẩu đăng nhập vào máy tính",
            "correct": false
          }
        ],
        "explanation": "Detached HEAD xuất hiện khi bạn checkout trực tiếp tới một commit hoặc tag thay vì một branch."
      },
      {
        "id": "q3",
        "question": "Nếu bạn lỡ tạo một số commit quan trọng trong trạng thái Detached HEAD, làm thế nào để lưu giữ chúng an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Chạy lệnh `git switch -c <tên-nhánh-mới>` để tạo ngay một nhánh mới giữ lấy commit đó",
            "correct": true
          },
          {
            "text": "Tắt máy tính và khởi động lại ngay lập tức",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ thư mục dự án và tải lại từ đầu",
            "correct": false
          },
          {
            "text": "Bấm tổ hợp phím Ctrl + Z trên bàn phím mười lần",
            "correct": false
          }
        ],
        "explanation": "`git switch -c <name>` gắn một con trỏ nhánh mới vào commit hiện tại, cứu commit không bị mồ côi."
      },
      {
        "id": "q4",
        "question": "Lệnh nào là cách hiện đại và an toàn nhất để đưa HEAD thoát khỏi Detached HEAD quay về nhánh main?",
        "type": "single",
        "options": [
          {
            "text": "git switch main",
            "correct": true
          },
          {
            "text": "git delete head",
            "correct": false
          },
          {
            "text": "git reset --everything",
            "correct": false
          },
          {
            "text": "git close-all",
            "correct": false
          }
        ],
        "explanation": "`git switch main` là câu lệnh hiện đại (từ Git 2.23) chuyên trách chuyển về nhánh chỉ định."
      }
    ]
  }
};
export default lesson;
