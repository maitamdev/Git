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
      "Nắm vững bản chất kỹ thuật của Staging Area (Index) như một vùng đệm chọn lọc commit.",
      "Hiểu vì sao Git thiết kế Staging Area thay vì commit trực tiếp từ Working Directory như SVN.",
      "Sử dụng git add để đưa các thay đổi mong muốn vào vùng chuẩn bị."
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
      "cache",
      "vung chuan bi",
      "git add"
    ],
    "commands": [
      "git status",
      "git add <file>",
      "git restore --staged <file>"
    ]
  },
  "content": "# Staging Area (Vùng chuẩn bị)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất kỹ thuật của Staging Area (Index) như một vùng đệm chọn lọc commit.\n- Hiểu vì sao Git thiết kế Staging Area thay vì commit trực tiếp từ Working Directory như SVN.\n- Sử dụng git add để đưa các thay đổi mong muốn vào vùng chuẩn bị.\n\n---\n\n## 📖 Định nghĩa\n> Staging Area (hay còn được gọi trong nội bộ mã nguồn Git là Index hoặc Cache) là một vùng trung gian lưu trữ siêu dữ liệu và ảnh chụp chuẩn bị trước cho lần commit kế tiếp. Về mặt kỹ thuật, Staging Area là một tệp nhị phân đơn lẻ mang tên `.git/index` chứa danh sách các tệp tin kèm mã băm SHA tương ứng đại diện chính xác cho trạng thái mà bạn mong muốn đóng gói vào snapshot lịch sử. Staging Area mang lại cho lập trình viên toàn quyền kiểm soát những gì sẽ được ghi nhận vào lịch sử.\n\n---\n\n## 🤔 Tại sao cần?\nSự tồn tại của Staging Area chính là một trong những ưu thế kiến trúc đột phá nhất của Git so với các hệ thống quản lý phiên bản cổ điển. Trong các hệ thống cũ, mọi sửa đổi trong thư mục làm việc đều bị ép buộc phải commit cùng một lúc. Với Staging Area, bạn có thể chỉnh sửa 10 tệp tin khác nhau nhưng chỉ chọn lọc 2 tệp liên quan đến tính năng đăng nhập để đưa vào Staging Area và tạo một commit gọn gàng, trong khi 8 tệp còn lại vẫn giữ nguyên để tiếp tục hoàn thiện sau.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Staging Area giống như chiếc bàn đóng gói kiện hàng trước khi gửi bưu điện. Trong kho hàng của bạn (Working Directory) có hàng trăm món đồ khác nhau. Bạn không ném bừa tất cả vào một chiếc thùng lớn. Thay vào đó, bạn lấy ra một chiếc hộp các-tông (Staging Area), cẩn thận chọn ra đúng chiếc áo và chiếc quần mà khách hàng đặt mua, xếp ngay ngắn vào hộp rồi dán băng dính niêm phong lại trước khi đóng dấu giao hàng (commit).\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình đóng gói có chọn lọc:\n[Working Directory]                [Staging Area]                 [Commit History]\n├── auth.js (đã sửa) ──git add──►  auth.js (staged)  ──git commit──► Commit #1: feat: auth\n├── api.js  (đã sửa) ───────────►  (chưa add)\n└── temp.txt (nháp)  ───────────►  (chưa add)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột lập trình viên đang tiến hành sửa lỗi bảo mật khẩn cấp tại tệp user-controller.js. Trong lúc đọc code, lập trình viên thấy một đoạn code khác bị sai định dạng thụt đầu dòng nên tiện tay format lại tệp style.css và tệp helper.js. Khi chuẩn bị commit, nhờ có Staging Area, lập trình viên chỉ gõ lệnh git add user-controller.js để commit riêng một bản vá lỗi bảo mật sạch sẽ gửi lên cho trưởng nhóm duyệt, tránh làm loãng lịch sử bởi những thay đổi định dạng không liên quan. Điều này giúp đồng nghiệp khi thực hiện code review có thể tập trung 100% vào logic bảo mật mà không bị phân tâm bởi hàng chục dòng thay đổi khoảng trắng vô nghĩa.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit add <file>\ngit restore --staged <file>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Kiểm tra danh sách các tệp đã nằm trong Staging Area (màu xanh) và tệp chưa được staged (màu đỏ).\n- `git add <file>`: Đưa nội dung hiện tại của tệp tin từ Working Directory vào Staging Area.\n- `git restore --staged <file>`: Rút tệp tin ra khỏi Staging Area trở lại Working Directory mà không làm mất nội dung code.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ Staging Area lưu một bản copy vật lý đầy đủ**:  Git Index chỉ lưu siêu dữ liệu và trỏ tới các blob đối tượng trong cơ sở dữ liệu Git.\n2. **Sửa tiếp file sau khi đã git add rồi vội vã commit**:  Git chỉ commit phiên bản của tệp tại thời điểm bạn chạy lệnh git add, phần sửa sau đó sẽ bị bỏ lại.\n3. **Commit một đống thay đổi hỗn độn**:  Bỏ qua lợi ích chọn lọc của Staging Area và luôn commit toàn bộ mọi thứ bừa bãi.\n\n---\n\n## 🧪 Lab\n1. Tạo tệp `app.js` và thêm vào nội dung `console.log(\"Staging lab\");`.\n2. Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.\n3. Chạy `git status` và quan sát tệp `app.js` nằm dưới tiêu đề Changes to be committed màu xanh lá.\n\n---\n\n## 💡 Hint\n> Chỉ những thay đổi nằm trong Staging Area mới được ghi vào commit tiếp theo.\n\n---\n\n## ✅ Validation\n- Kiểm tra `git status` hiển thị tệp tin trong Changes to be committed.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để đánh giá sự am hiểu về Staging Area.\n\n---\n\n## 🔥 Challenge\nGiải thích điều gì xảy ra nếu bạn sửa tiếp tệp app.js sau khi đã chạy lệnh git add app.js.\n\n---\n\n## 📚 Tổng kết\n- Staging Area (Index) là vùng đệm lưu trữ ảnh chụp chuẩn bị cho commit kế tiếp.\n- Cho phép chọn lọc chính xác từng tệp tin cần ghi nhận vào lịch sử phiên bản.\n- Tệp tin trong Staging Area được hiển thị trong mục Changes to be committed khi gõ git status.\n",
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
            "text": "Là vùng đệm trung gian cho phép chọn lọc các thay đổi trước khi ghi vào commit",
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
      }
    ]
  }
};
export default lesson;
