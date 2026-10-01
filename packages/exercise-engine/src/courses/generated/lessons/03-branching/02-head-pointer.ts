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
  "content": "# Con trỏ HEAD & Detached HEAD\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu được con trỏ HEAD dùng để định vị nhánh và commit bạn đang làm việc.\n- Nhận biết trạng thái Detached HEAD khi quay lại xem một commit cũ trong lịch sử.\n- Biết cách dùng `git switch` để quay lại nhánh an toàn mà không làm mất commit thử nghiệm.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### HEAD — con trỏ vị trí hiện tại\n- **Nói dễ hiểu:** Mắt đọc cho biết bạn đang đứng ở nhánh hoặc commit nào trong kho lưu trữ.\n- **Ví dụ:** Khi chạy `git status`, dòng đầu tiên báo `On branch main` vì HEAD đang gắn vào nhánh `main`.\n- **Đừng nhầm:** HEAD không phải là một commit độc lập; nó là nhãn chỉ vào nhánh hoặc commit bạn đang mở.\n\n### Detached HEAD — trạng thái rời nhánh\n- **Nói dễ hiểu:** Tình trạng HEAD trỏ thẳng vào một commit cụ thể thay vì trỏ thông qua một tên nhánh.\n- **Ví dụ:** Chạy `git checkout a1b2c3d` để xem lại mã nguồn của tuần trước sẽ đưa bạn vào Detached HEAD.\n- **Đừng nhầm:** Detached HEAD không phải lỗi hỏng kho lưu trữ; đây là chế độ xem lại lịch sử hoàn toàn bình thường.\n\n### git switch — lệnh chuyển nhánh an toàn\n- **Nói dễ hiểu:** Câu lệnh chuyên trách để chuyển đổi giữa các nhánh hoặc thoát khỏi Detached HEAD.\n- **Ví dụ:** Chạy `git switch main` để đưa không gian làm việc quay trở về đỉnh nhánh chính.\n- **Đừng nhầm:** `git switch` chỉ chuyển nhánh; để khôi phục tệp bị sửa đổi bạn dùng `git restore`.\n\n---\n\n## 📖 Định nghĩa\nHEAD là con trỏ đặc biệt trong Git cho biết vị trí làm việc hiện tại của bạn. Bình thường, HEAD trỏ vào một nhánh (như `main`). Khi bạn chuyển thẳng tới một commit cũ bằng mã hash, HEAD sẽ rời khỏi nhánh và rơi vào trạng thái Detached HEAD.\n\n---\n\n## 🤔 Tại sao cần?\nKhi dự án gặp lỗi mà không rõ nguyên nhân, bạn thường cần quay lại các phiên bản cũ trong quá khứ để chạy thử và kiểm tra. Hiểu cách HEAD hoạt động giúp bạn tự tin xem lại lịch sử mà không sợ làm mất dữ liệu hay làm xáo trộn nhánh chính.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung HEAD giống như chiếc kim đọc đĩa than. Khi kim đặt vào rãnh `main`, loa phát bài hát của nhánh `main`. Khi bạn nhấc kim đặt tự do vào một đoạn cũ giữa đĩa than (Detached HEAD), bạn vẫn nghe được đoạn nhạc cũ đó. Khi muốn nghe lại bài hát chính, bạn chỉ cần gạt kim về lại rãnh `main`.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrạng thái bình thường:\nHEAD ───> main ───> Commit C3\n\nTrạng thái Detached HEAD:\nHEAD ─────────────> Commit C1 (đang xem lại bản cũ)\nmain ─────────────> Commit C3 (vẫn ở đỉnh)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đang làm web bán hàng và khách báo rằng chức năng thanh toán vừa bị lỗi sáng nay. Bạn xem mã commit của ngày hôm qua là `e8a1b2c`. Bạn checkout về commit đó để kiểm tra thử. Sau khi xác nhận hôm qua vẫn thanh toán tốt, bạn dùng lệnh `git switch main` để quay về code mới nhất mà không ảnh hưởng gì đến dự án.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit checkout <commit-hash>\ngit switch main\ngit switch -c <tên-nhánh-mới>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị bạn đang đứng ở nhánh nào hoặc đang ở trạng thái Detached HEAD tại commit nào.\n- `git checkout <commit-hash>`: Đưa HEAD về một commit cụ thể trong quá khứ.\n- `git switch main`: Chuyển HEAD quay trở lại gắn vào nhánh `main`.\n- `git switch -c <tên-nhánh-mới>`: Tạo nhánh mới ngay tại vị trí commit hiện tại để giữ lại các thử nghiệm.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng loạn khi thấy chữ Detached HEAD:** Đây là thông báo trạng thái bình thường của Git khi bạn xem lại commit cũ.\n2. **Commit thử nghiệm khi rời nhánh rồi chuyển đi mà không tạo nhánh:** Các commit này sẽ bị mồ côi vì không có tên nhánh nào trỏ vào.\n3. **Dùng nhầm `git checkout` với tệp:** Nên dùng `git switch` cho nhánh và `git restore` cho tệp để tránh nhầm lẫn.\n\n---\n\n## 🧪 Lab\nBài học này là bài tự kiểm tra hiểu biết trên terminal của bạn:\n1. Chạy `git log --oneline` để lấy mã hash của một commit trước đó.\n2. Chạy `git checkout <mã-hash>` để quan sát thông báo Detached HEAD từ Git.\n3. Chạy `git status` để đọc lời nhắc của Git về vị trí con trỏ hiện tại.\n4. Chạy `git switch main` để đưa HEAD trở lại nhánh `main`.\n\n---\n\n## 💡 Hint\nKhi ở Detached HEAD, nếu bạn tạo commit muốn giữ lại, hãy gõ `git switch -c <nhánh-mới>` trước khi chuyển đi nơi khác.\n\n---\n\n## ✅ Validation\n- Sau khi chạy `git switch main`, lệnh `git status` báo rõ `On branch main`.\n- Thư mục làm việc trở về trạng thái của commit mới nhất trên nhánh chính.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để kiểm tra kiến thức về con trỏ HEAD và trạng thái Detached HEAD.\n\n---\n\n## 🔥 Challenge\nMở tệp `.git/HEAD` bằng trình đọc tệp khi đang ở nhánh `main` và khi đang ở Detached HEAD để so sánh nội dung bên trong.\n\n---\n\n## 📚 Tổng kết\n- HEAD chỉ định vị trí commit mà thư mục làm việc của bạn đang hiển thị.\n- Detached HEAD xuất hiện khi bạn đưa HEAD trỏ thẳng vào commit thay vì qua tên nhánh.\n- Dùng `git switch main` để quay về an toàn, hoặc `git switch -c` nếu muốn giữ lại commit thử nghiệm.\n",
  "quiz": {
    "id": "quiz-03-02-head-pointer",
    "title": "Trắc nghiệm: Con trỏ HEAD và Detached HEAD",
    "questions": [
      {
        "id": "q1",
        "question": "Trong trạng thái làm việc bình thường, con trỏ HEAD trong Git có vai trò gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ định nhánh và commit hiện tại mà thư mục làm việc đang hiển thị",
            "correct": true
          },
          {
            "text": "Mật khẩu bảo mật dùng để đăng nhập vào máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Danh sách các thành viên được cấp quyền ghi vào dự án",
            "correct": false
          },
          {
            "text": "Bản sao lưu dự phòng của toàn bộ mã nguồn trên đám mây",
            "correct": false
          }
        ],
        "explanation": "HEAD là con trỏ đại diện cho vị trí hiện tại bạn đang đứng trong kho lưu trữ Git."
      },
      {
        "id": "q2",
        "question": "Trạng thái Detached HEAD xảy ra khi nào?",
        "type": "single",
        "options": [
          {
            "text": "Khi con trỏ HEAD trỏ trực tiếp vào một commit cụ thể thay vì trỏ qua tên nhánh",
            "correct": true
          },
          {
            "text": "Khi máy tính bị ngắt kết nối mạng Internet hoặc cáp quang",
            "correct": false
          },
          {
            "text": "Khi ổ đĩa của bạn bị đầy dung lượng và không thể lưu tệp",
            "correct": false
          },
          {
            "text": "Khi bạn đặt sai thông tin người dùng trong cấu hình Git",
            "correct": false
          }
        ],
        "explanation": "Detached HEAD xuất hiện khi bạn checkout trực tiếp tới một mã hash commit thay vì một tên nhánh."
      },
      {
        "id": "q3",
        "question": "Nếu bạn đã tạo một số commit thử nghiệm trong trạng thái Detached HEAD, làm sao để giữ lại an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Dùng lệnh `git switch -c <tên-nhánh-mới>` để gắn nhánh mới vào commit hiện tại",
            "correct": true
          },
          {
            "text": "Tắt máy tính và khởi động lại để Git tự khôi phục dữ liệu",
            "correct": false
          },
          {
            "text": "Xóa thư mục dự án và tải lại từ đầu từ máy chủ",
            "correct": false
          },
          {
            "text": "Nhấn tổ hợp phím Ctrl + Z nhiều lần trong trình soạn thảo",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git switch -c <tên>` tạo một nhánh mới ngay tại commit hiện tại, giữ commit không bị mồ côi."
      },
      {
        "id": "q4",
        "question": "Lệnh nào là cách an toàn và rõ ràng nhất để đưa HEAD thoát khỏi Detached HEAD quay về nhánh main?",
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
        "explanation": "Lệnh `git switch main` chuyển vùng làm việc và gắn con trỏ HEAD trở lại nhánh `main`."
      },
      {
        "id": "q5",
        "question": "Khi bạn đang ở trên nhánh main và thực hiện một commit mới, điều gì xảy ra với HEAD?",
        "type": "single",
        "options": [
          {
            "text": "HEAD cùng với con trỏ main tiếp tục trỏ tới commit mới nhất vừa tạo",
            "correct": true
          },
          {
            "text": "HEAD đứng yên ở commit cũ và tự động rơi vào trạng thái Detached HEAD",
            "correct": false
          },
          {
            "text": "HEAD bị xóa khỏi kho lưu trữ và phải gõ lệnh tạo lại thủ công",
            "correct": false
          },
          {
            "text": "HEAD tự động chuyển sang nhánh khác ngẫu nhiên trong dự án",
            "correct": false
          }
        ],
        "explanation": "Ở trạng thái bình thường, HEAD trỏ vào nhánh `main`. Khi `main` tiến lên commit mới, vị trí hiện tại của HEAD cũng tiến theo."
      }
    ]
  }
};
export default lesson;
