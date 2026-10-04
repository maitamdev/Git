import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-staging-area",
  "moduleId": "02-git-basics",
  "metadata": {
    "id": "02-staging-area",
    "title": "Staging Area (Vùng chuẩn bị)",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "01-working-directory"
    ],
    "objectives": [
      "Giải thích Staging Area là nơi chọn thay đổi cho commit kế tiếp.",
      "Dùng git add để chọn một tệp.",
      "Dùng git status để xác nhận lựa chọn."
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
      "staging area",
      "index",
      "vung chuan bi",
      "git add"
    ],
    "commands": [
      "git status",
      "git add <file>"
    ]
  },
  "content": "# Staging Area (Vùng chuẩn bị): Hộp đóng gói có chọn lọc của Git\n\n---\n\n## 🎯 Mục tiêu\n- Thấu hiểu vì sao Staging Area là phát minh thiên tài giúp Git phân tách khâu chuẩn bị và khâu đóng gói.\n- Sử dụng lệnh `git add` để chủ động tuyển chọn những thay đổi xuất sắc nhất cho commit kế tiếp.\n- Đọc hiểu trạng thái Staged thông qua `git status` trước khi chính thức niêm phong lịch sử.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Staging Area — vùng chuẩn bị\n- **Nói dễ hiểu:** Vùng đệm trung gian để bạn tuyển chọn và sắp xếp các tệp tin đã sẵn sàng trước khi ghi vào lịch sử.\n- **Ví dụ:** Bạn sửa năm tệp tin nhưng chỉ chọn hai tệp thuộc giao diện để đưa vào Staging Area cho lần commit này.\n- **Đừng nhầm:** Tệp nằm trong Staging Area mới chỉ là xếp hàng chờ; nó chưa hề biến thành commit chính thức.\n\n### Index — tên Git dùng cho vùng chuẩn bị\n- **Nói dễ hiểu:** Tên gọi kỹ thuật mà cỗ máy Git dùng để lưu trữ danh sách các tệp tin đang xếp hàng trong Staging Area.\n- **Ví dụ:** Trong tệp nhị phân `.git/index`, Git ghi nhận chi tiết trạng thái của các tệp bạn vừa chạy lệnh add.\n- **Đừng nhầm:** Index và Staging Area thực chất là hai cách gọi khác nhau của cùng một vùng đệm đóng gói.\n\n### Staged — đã được chọn cho commit\n- **Nói dễ hiểu:** Trạng thái của một thay đổi khi đã được đưa vào danh sách chờ niêm phong của commit tiếp theo.\n- **Ví dụ:** Sau khi chạy `git add README.md`, tệp này chuyển sang màu xanh lá cây trong báo cáo của `git status`.\n- **Đừng nhầm:** Nếu bạn gõ thêm dòng code mới sau khi add, phần mới đó vẫn là Unstaged cho tới khi bạn chạy add lần nữa.\n\n---\n\n## 🤔 Tại sao cần?\nNhiều bạn mới học thường hỏi: Tại sao không commit thẳng mà phải qua bước Staging Area? Thầy trả lời rằng: Trong thực tế, bạn thường cùng lúc sửa lỗi đăng nhập, chỉnh sửa giao diện và viết nháp ghi chú. Nếu không có Staging Area, bạn buộc phải ném toàn bộ mớ hỗn độn đó vào một commit duy nhất. Staging Area cho phép bạn đóng gói có chọn lọc: nhặt riêng phần sửa đăng nhập vào một commit chỉn chu, để lại các phần dở dang cho lần sau.\n\n---\n\n## 📖 Định nghĩa\nStaging Area (trong tài liệu kỹ thuật của Git gọi là Index) là vùng đệm lưu trữ ảnh chụp nhanh của các tệp tin được tuyển chọn để chuẩn bị cho mốc commit tiếp theo. Lệnh `git add` đưa thay đổi vào Staging Area và `git status` dùng để giám sát vùng này.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng Staging Area như chiếc thùng các-tông đóng hàng bưu điện. Bạn chọn những món quà đẹp nhất trên bàn xếp ngay ngắn vào thùng (chạy `git add`). Khi thùng hàng đã đầy đủ và vừa vặn ý muốn, bạn mới dán băng dính và ký tên niêm phong thùng hàng để gửi đi (chạy `git commit`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình đóng gói có chọn lọc của kỹ sư:\n[Bàn làm việc: Working Tree]       [Thùng hàng: Staging Area]         [Kho lưu trữ: Git Repo]\n├── auth.js (Hoàn thành)  ──git add──►  auth.js (Đã Staged)   ──commit──► Commit #1: feat(auth)\n├── api.js  (Đang viết dở) ─────────►  (Để lại trên bàn)\n└── temp.txt (Ghi chú nháp) ─────────►  (Để lại trên bàn)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn đang làm dự án và vừa sửa xong trang giới thiệu, đồng thời đang code dở thanh tìm kiếm. Bạn chỉ gõ `git add about.html` để đưa riêng trang giới thiệu vào Staging Area. Khi commit, lịch sử dự án chỉ ghi nhận một mốc tính năng sạch sẽ, còn thanh tìm kiếm vẫn an toàn trên máy bạn để tiếp tục hoàn thiện sau.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị danh sách các tệp đã được đưa vào Staging Area (sẵn sàng commit) và các tệp còn nằm ở Working Tree.\n- `git add <file>`: Chụp lại nội dung hiện tại của tệp tin chỉ định và đưa nó vào Staging Area để chuẩn bị đóng gói.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng `git add` đã lưu code vào lịch sử:** Lệnh này chỉ mới nhặt đồ bỏ vào thùng; phải gõ `git commit` thì thùng hàng mới được đóng gói và lưu giữ vĩnh viễn.\n2. **Sửa file sau khi đã `git add` mà không add lại:** Git chỉ chụp trạng thái tại thời điểm gõ lệnh add; những dòng code bạn gõ thêm sau đó vẫn nằm ngoài Staging Area.\n3. **Không chạy `git status` để kiểm tra thùng hàng:** Vội vàng commit khi chưa biết chắc mình đã nhặt những tệp tin nào vào Staging Area rất dễ gây sót file.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `app.js` và thêm vào nội dung `console.log(\"Staging lab\");`.\n2. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.\n3. Chạy `git status` và quan sát tệp `app.js` nằm dưới tiêu đề Changes to be committed.\n\n---\n\n## 💡 Hint\nHãy ghi nhớ nguyên tắc: Chỉ những gì nằm trong Staging Area mới có vinh hạnh được xuất hiện trong commit tiếp theo.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` hiển thị tệp tin trong Changes to be committed.\n- Giải thích được vì sao Staging Area giúp chia nhỏ commit một cách khoa học.\n- Nhận biết được hành vi của Git khi file bị sửa đổi tiếp sau lệnh add.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để chứng minh bạn đã làm chủ bản chất của Staging Area. Đọc kỹ phân tích của giảng viên.\n\n---\n\n## 🔥 Challenge\nGiải thích điều gì xảy ra nếu bạn sửa tiếp tệp `app.js` sau khi đã chạy lệnh `git add app.js`, và tại sao `git status` lại hiển thị tệp này ở cả hai mục khác nhau cùng một lúc.\n\n---\n\n## 📚 Tổng kết\n- Staging Area là sân khấu tổng duyệt, nơi lập trình viên tuyển chọn thay đổi trước khi đóng gói thành commit.\n- `git add <file>` đưa trạng thái tệp tin vào vùng chuẩn bị; nếu sửa tiếp, bạn bắt buộc phải add lại.\n- Sử dụng `git status` thường xuyên để kiểm soát tuyệt đối những gì sắp đi vào biên niên sử của dự án.\n\n",
  "quiz": {
    "id": "quiz-02-02-staging-area",
    "title": "Trắc nghiệm: Staging Area trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Staging Area trong Git đóng vai trò kỹ thuật gì?",
        "type": "single",
        "options": [
          {
            "text": "Là nơi chọn thay đổi sẽ được đưa vào commit kế tiếp",
            "correct": true
          },
          {
            "text": "Là nơi sao lưu dự phòng toàn bộ ổ cứng máy tính",
            "correct": false
          },
          {
            "text": "Là máy chủ lưu trữ từ xa trên mạng Internet",
            "correct": false
          },
          {
            "text": "Là thùng rác chứa các tệp đã xóa vĩnh viễn",
            "correct": false
          }
        ],
        "explanation": "Staging Area là khu vực chuẩn bị giúp lập trình viên tạo các commit sạch và có tổ chức. Các đáp án B, C, D đều hiểu sai kiến trúc Git."
      },
      {
        "id": "q2",
        "question": "Tệp tin vật lý nào trong thư mục .git đại diện cho Staging Area?",
        "type": "single",
        "options": [
          {
            "text": ".git/index",
            "correct": true
          },
          {
            "text": ".git/HEAD",
            "correct": false
          },
          {
            "text": ".git/config",
            "correct": false
          },
          {
            "text": ".git/COMMIT_EDITMSG",
            "correct": false
          }
        ],
        "explanation": "Tệp `.git/index` là tệp nhị phân lưu trữ trạng thái của Staging Area. `.git/HEAD` là con trỏ nhánh; `.git/config` là tệp cấu hình."
      },
      {
        "id": "q3",
        "question": "Nếu bạn đã chạy `git add file.txt`, sau đó mở file.txt sửa thêm 3 dòng nhưng chưa add lại, khi commit Git sẽ lưu nội dung nào?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung của file.txt tại thời điểm bạn chạy lệnh git add trước đó",
            "correct": true
          },
          {
            "text": "Nội dung mới nhất bao gồm cả 3 dòng vừa sửa thêm",
            "correct": false
          },
          {
            "text": "Git sẽ báo lỗi cú pháp và hủy bỏ toàn bộ commit",
            "correct": false
          },
          {
            "text": "Tệp file.txt sẽ tự động bị xóa khỏi dự án",
            "correct": false
          }
        ],
        "explanation": "Git lưu snapshot của tệp tại chính thời điểm chạy `git add`. Mọi sửa đổi sau đó cần được `git add` lại để cập nhật vào Index."
      },
      {
        "id": "q4",
        "question": "Lệnh nào dùng để loại bỏ một tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung trong Working Directory?",
        "type": "single",
        "options": [
          {
            "text": "git restore --staged <file>",
            "correct": true
          },
          {
            "text": "git rm -f <file>",
            "correct": false
          },
          {
            "text": "git delete --all",
            "correct": false
          },
          {
            "text": "git push --force",
            "correct": false
          }
        ],
        "explanation": "`git restore --staged <file>` unstage tệp mà không làm mất nội dung code. `git rm -f` xóa hẳn file khỏi ổ đĩa."
      },
      {
        "id": "q5",
        "question": "Thay đổi đã được stage có xuất hiện trong lịch sử commit ngay lập tức không?",
        "type": "single",
        "options": [
          {
            "text": "Không; cần chạy `git commit` để tạo một mốc lịch sử",
            "correct": true
          },
          {
            "text": "Có; `git add` tự tạo commit",
            "correct": false
          },
          {
            "text": "Có; `git status` tự lưu commit",
            "correct": false
          },
          {
            "text": "Không; phải chạy `git push` trước khi commit",
            "correct": false
          }
        ],
        "explanation": "`git add` chỉ chọn nội dung vào Staging Area. `git commit` mới tạo mốc lịch sử cục bộ."
      }
    ]
  }
};
export default lesson;
