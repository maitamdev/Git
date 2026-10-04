import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-status",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "04-git-status",
    "title": "Kiểm tra trạng thái với git status",
    "level": "beginner",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-head-snapshot"
    ],
    "objectives": [
      "Chạy git status để biết tệp mới, đã sửa hoặc đã staged.",
      "Phân biệt nhóm staged, chưa staged và untracked.",
      "Đọc hai cột trạng thái cơ bản trong git status -s."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "track-file"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git status",
      "trang thai",
      "kiem tra",
      "short format"
    ],
    "commands": [
      "git status",
      "git status -s"
    ]
  },
  "content": "# Kiểm tra trạng thái với git status\n\n---\n\n## 🎯 Mục tiêu\n- Thành thạo sử dụng `git status` để kiểm soát mọi thay đổi trong kho mã nguồn.\n- Phân biệt rõ rệt ba trạng thái tệp: Untracked (chưa theo dõi), Staged (đã chuẩn bị) và Unstaged (chưa chuẩn bị).\n- Đọc hiểu thành thạo định dạng rút gọn `git status -s` với cơ chế hai cột trạng thái Index và Working Tree.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git status` — xem tình trạng tệp\n- **Nói dễ hiểu:** Mắt thần giám sát, báo cáo chi tiết mọi sự biến động giữa thư mục làm việc, vùng đệm và commit gần nhất.\n- **Ví dụ:** Gõ `git status` trước khi add để rà soát chính xác những file nào vừa được bạn hoặc công cụ chỉnh sửa.\n- **Đừng nhầm:** Lệnh chỉ đóng vai trò quan sát báo cáo, hoàn toàn không sửa đổi hay xóa bất kỳ dòng code nào.\n\n### Untracked — chưa được theo dõi\n- **Nói dễ hiểu:** Tệp tin mới tinh xuất hiện trong thư mục làm việc mà Git chưa từng lưu dấu vào lịch sử phiên bản.\n- **Ví dụ:** Bạn vừa tạo tệp `secret.env`, Git lập tức liệt kê tệp này trong danh sách Untracked files.\n- **Đừng nhầm:** Untracked không có nghĩa file bị lỗi, mà là Git đang chờ lệnh xem bạn có muốn quản lý nó hay không.\n\n### Staged — đã chuẩn bị cho commit\n- **Nói dễ hiểu:** Những thay đổi đã được bạn tuyển chọn vào Staging Area, sẵn sàng đóng gói vào commit tiếp theo.\n- **Ví dụ:** Sau khi chạy `git add index.html`, tệp này nằm trang trọng trong mục Changes to be committed.\n- **Đừng nhầm:** Staged chỉ mới là hàng xếp vào thùng carton, chưa dán băng keo niêm phong thành commit chính thức.\n\n### Unstaged — chưa chuẩn bị cho commit\n- **Nói dễ hiểu:** Tệp đã được Git theo dõi từ trước và vừa có sửa đổi mới, nhưng bạn chưa đưa phần mới đó vào vùng đệm.\n- **Ví dụ:** Bạn sửa tiếp logic trong `app.js` sau khi đã add; phần chỉnh sửa sau đó sẽ nằm ở mục Changes not staged.\n- **Đừng nhầm:** Tệp vẫn an toàn trên ổ đĩa; chỉ là phần code mới gõ thêm chưa được nạp vào khay chuẩn bị commit.\n\n---\n\n## 📖 Định nghĩa\n`git status` là lệnh thanh tra toàn diện tình trạng hiện tại của kho mã nguồn. Lệnh đối chiếu sự khác biệt giữa ba vùng: Working Tree (nơi bạn gõ code), Staging Area (vùng đệm chuẩn bị) và HEAD commit gần nhất. Nhờ đó, bạn lập tức nắm rõ tệp nào mới tạo, tệp nào vừa chỉnh sửa và tệp nào đã sẵn sàng để niêm phong snapshot.\n\n---\n\n## 🤔 Tại sao cần?\nNếu lập trình mà không gõ `git status`, bạn chẳng khác nào lái xe tốc độ cao trong sương mù dày đặc. Lệnh này giúp bạn kiểm soát hoàn toàn những gì sắp đi vào lịch sử dự án: phát hiện kịp thời các tệp rác, ngăn chặn việc commit nhầm khóa bảo mật hay tệp cấu hình mật, và đảm bảo mọi thay đổi quan trọng đều được chọn lọc cẩn thận trước khi tạo mốc lưu trữ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem `git status` như chiếc bảng đồng hồ điều khiển trên xe ô tô hiển thị tức thời kim xăng, nhiệt độ và cảnh báo áp suất lốp. Trước khi nhấn ga commit hay chuyển nhánh, bạn nhìn vào bảng đồng hồ để kiểm tra: hành lý nào đã xếp vào cốp (Staged), đồ đạc nào còn vương vãi trên ghế sau (Unstaged), và gói bưu kiện lạ nào vừa mang lên xe (Untracked).\n\n---\n\n## 🖼 Sơ đồ\n```text\n┌─────────────────────────────────────────────────────────────┐\n│ BẢNG ĐIỀU KHIỂN GIT STATUS (FULL REPORT)                    │\n│                                                             │\n│ Changes to be committed: (STAGED - Sẵn sàng đóng gói)       │\n│         new file:   index.html                              │\n│                                                             │\n│ Changes not staged for commit: (UNSTAGED - Đã sửa chưa add) │\n│         modified:   style.css                               │\n│                                                             │\n│ Untracked files: (UNTRACKED - File mới tinh Git chưa biết)  │\n│         notes.txt                                           │\n└─────────────────────────────────────────────────────────────┘\n  Cú pháp rút gọn: git status -s\n  XY  Path\n  │└── Y: Trạng thái Working Tree (Unstaged)\n  └─── X: Trạng thái Staging Area (Staged)\n  Ví dụ: \" M style.css\" (chưa add), \"M  style.css\" (đã add), \"?? notes.txt\"\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn vừa hoàn thành tính năng đăng nhập bằng cách cập nhật file `auth.js` và tạo file nháp `test-account.txt`. Gõ `git status`, terminal lập tức tách bạch: `auth.js` nằm trong danh sách sửa đổi cần cân nhắc, còn `test-account.txt` ở mục untracked cảnh báo bạn không được vội vàng đưa dữ liệu nháp vào kho mã nguồn chung của cả đội ngũ.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit status -s\ngit status -uno\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị báo cáo chi tiết nhất kèm theo các chỉ dẫn thao tác ngữ cảnh (như lệnh gợi ý unstage hoặc discard).\n- `git status -s` (hoặc `--short`): Định dạng hiển thị hai cột siêu gọn dành cho lập trình viên chuyên nghiệp: Cột 1 là trạng thái Staging Area, Cột 2 là trạng thái Working Tree.\n- `git status -uno`: Bỏ qua việc quét các tệp Untracked, rất hữu ích khi làm việc trong dự án khổng lồ giúp tăng tốc độ phản hồi terminal.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Commit mù quáng không kiểm tra status**: Tạo commit mà không gõ `git status` dẫn tới việc lọt file nháp, file rác build hoặc lộ secret API keys vào lịch sử Git vĩnh viễn.\n2. **Bỏ qua phần Untracked files**: Nghĩ rằng tệp mới tạo tự động vào commit, đến khi đồng nghiệp pull code về mới phát hiện dự án sập vì thiếu file quan trọng.\n3. **Hiểu nhầm hai cột của `git status -s`**: Nhầm lẫn giữa cột bên trái X (Staging Area) và cột bên phải Y (Working Tree), dẫn đến phán đoán sai việc thay đổi đã được add hay chưa.\n\n---\n\n## 🧪 Lab\n1. Chạy `git status` trong kho lưu trữ để quan sát trạng thái sạch ban đầu.\n2. Tạo hai tệp mới: `index.html` và `notes.txt`.\n3. Chạy `git status` để thấy cả hai tệp đều đang nằm trong nhóm Untracked files.\n4. Chạy `git add index.html`, sau đó chạy lại `git status` để thấy `index.html` chuyển sang mục \"Changes to be committed\".\n5. Chạy `git status -s` và đối chiếu kết quả: nhận ra `A  index.html` (đã stage) và `?? notes.txt` (chưa theo dõi).\n\n---\n\n## 💡 Hint\n> Hãy biến việc gõ `git status` thành phản xạ vô điều kiện trước và sau bất kỳ lệnh `git add`, `git commit` hay chuyển đổi branch nào.\n\n---\n\n## ✅ Validation\n- Chạy `git status` hiển thị chính xác các khu vực trạng thái Staged, Unstaged và Untracked.\n- Đọc hiểu chính xác ký hiệu hai cột của lệnh `git status -s`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu và phân tích báo cáo trạng thái Git trong các tình huống thực tế.\n\n---\n\n## 🔥 Challenge\nTạo file `app.js`, chạy `git add app.js`. Sau đó mở file `app.js` ra sửa thêm một dòng mới mà KHÔNG gõ add lại. Chạy `git status -s`, quan sát ký hiệu `MM app.js` và giải thích tại sao cùng một file lại có thể vừa Staged vừa Unstaged cùng lúc!\n\n---\n\n## 📚 Tổng kết\n- `git status` là bảng điều khiển trung tâm giúp bạn giám sát và làm chủ mọi thay đổi trong repository.\n- Ba trạng thái sống còn của tệp: Untracked (chưa quản lý), Staged (đã lên khay chờ commit) và Unstaged (đã sửa nhưng chưa nạp vào khay).\n- Sử dụng `git status -s` để đọc nhanh hai cột trạng thái chuẩn kỹ sư thực chiến.\n",
  "quiz": {
    "id": "quiz-02-04-git-status",
    "title": "Trắc nghiệm: Kiểm tra trạng thái với git status",
    "questions": [
      {
        "id": "q1",
        "question": "Mục \"Changes to be committed\" trong kết quả lệnh git status cho biết điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Danh sách các thay đổi đã nằm trong Staging Area và sẽ được đưa vào commit kế tiếp",
            "correct": true
          },
          {
            "text": "Các commit đã được đẩy thành công lên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Các tệp tin bị lỗi chính tả cần sửa lại ngay",
            "correct": false
          },
          {
            "text": "Các tệp tin bị xóa vĩnh viễn khỏi ổ đĩa máy tính",
            "correct": false
          }
        ],
        "explanation": "`Changes to be committed` đại diện cho các thay đổi đã được staged bằng lệnh git add và sẵn sàng commit."
      },
      {
        "id": "q2",
        "question": "Trong định dạng ngắn gọn `git status -s`, ký hiệu `??` biểu thị trạng thái nào?",
        "type": "single",
        "options": [
          {
            "text": "Tệp tin Untracked (chưa từng được Git theo dõi trong lịch sử)",
            "correct": true
          },
          {
            "text": "Tệp tin bị xung đột merge nghiêm trọng không thể sửa",
            "correct": false
          },
          {
            "text": "Git đang bị mất kết nối mạng Internet",
            "correct": false
          },
          {
            "text": "Tệp tin có virus bị hệ điều hành cách ly",
            "correct": false
          }
        ],
        "explanation": "Ký hiệu `??` là quy ước quốc tế trong định dạng short của git status để chỉ các tệp Untracked."
      },
      {
        "id": "q3",
        "question": "Mục \"Changes not staged for commit\" có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp tin đã được Git theo dõi từ trước, hiện đang có sửa đổi mới trong Working Tree nhưng chưa chạy git add",
            "correct": true
          },
          {
            "text": "Các tệp tin bị hỏng dữ liệu không thể mở được bằng VS Code",
            "correct": false
          },
          {
            "text": "Các tệp tin đã được đưa vào Staging Area thành công",
            "correct": false
          },
          {
            "text": "Các commit cũ đã được xóa bỏ khỏi kho chứa",
            "correct": false
          }
        ],
        "explanation": "Đây là những thay đổi trên tệp Tracked đang nằm ở Working Directory mà bạn chưa đưa vào Staging Area."
      },
      {
        "id": "q4",
        "question": "Lợi ích lớn nhất của việc chạy git status thường xuyên là gì?",
        "type": "single",
        "options": [
          {
            "text": "Giúp lập trình viên nắm rõ ngữ cảnh, tránh commit nhầm file rác và phát hiện tệp chưa được lưu vết",
            "correct": true
          },
          {
            "text": "Tự động tăng tốc độ xử lý của card màn hình máy tính",
            "correct": false
          },
          {
            "text": "Tự động viết mã nguồn hoàn chỉnh cho tính năng",
            "correct": false
          },
          {
            "text": "Thay thế hoàn toàn sự cần thiết của việc viết kiểm thử",
            "correct": false
          }
        ],
        "explanation": "Kiểm tra trạng thái cho biết những gì đang chờ commit để bạn rà lại trước khi lưu."
      },
      {
        "id": "q5",
        "question": "Trong `git status -s`, hai cột trạng thái lần lượt nói về khu vực nào?",
        "type": "single",
        "options": [
          {
            "text": "Cột trái là Staging Area; cột phải là Working Tree",
            "correct": true
          },
          {
            "text": "Cột trái là GitHub; cột phải là máy tính cá nhân",
            "correct": false
          },
          {
            "text": "Cột trái là tên nhánh; cột phải là tên người commit",
            "correct": false
          },
          {
            "text": "Cả hai cột đều là màu hiển thị, không mang ý nghĩa",
            "correct": false
          }
        ],
        "explanation": "Ký tự bên trái biểu thị trạng thái trong Index; ký tự bên phải biểu thị thay đổi trong Working Tree."
      }
    ]
  }
};
export default lesson;
