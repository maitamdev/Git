import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-interactive-rebase",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "13-interactive-rebase",
    "title": "Interactive Rebase",
    "level": "advanced",
    "duration": 35,
    "xp": 120,
    "prerequisites": [
      "12-git-rebase"
    ],
    "objectives": [
      "Hiểu rõ sức mạnh vượt trội của Interactive Rebase (`git rebase -i`) như một công cụ biên tập lịch sử tối thượng.",
      "Đọc hiểu và sử dụng thành thạo danh sách lệnh Todo của Interactive Rebase: pick, reword, edit, squash, fixup, drop.",
      "Sắp xếp lại thứ tự xuất hiện của các commit trong chuỗi lịch sử cục bộ.",
      "Chuẩn bị một chuỗi commit chuyên nghiệp, sắc nét trước khi mở Pull Request."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "interactive rebase",
      "git rebase -i",
      "rebase tuong tac",
      "chinh sua lich su",
      "bien tap commit",
      "todo list git"
    ],
    "commands": [
      "git rebase -i HEAD~<số-lượng-commit>",
      "git rebase -i <commit-hash-gốc>",
      "git rebase --continue",
      "git rebase --abort"
    ]
  },
  "content": "# Interactive Rebase\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sức mạnh vượt trội của Interactive Rebase (`git rebase -i`) như một công cụ biên tập lịch sử tối thượng.\n- Đọc hiểu và sử dụng thành thạo danh sách lệnh Todo của Interactive Rebase: pick, reword, edit, squash, fixup, drop.\n- Sắp xếp lại thứ tự xuất hiện của các commit trong chuỗi lịch sử cục bộ.\n- Chuẩn bị một chuỗi commit chuyên nghiệp, sắc nét trước khi mở Pull Request.\n\n---\n\n## 📖 Định nghĩa\n> Interactive Rebase (Rebase tương tác, kích hoạt bằng cờ `-i` trong `git rebase -i <commit-base>`) là một trong những tính năng mạnh mẽ và ấn tượng nhất của Git. Khi thực thi, Git sẽ mở một trình soạn thảo văn bản chứa danh sách toàn bộ các commit cần xử lý (gọi là Git Todo List), cho phép lập trình viên toàn quyền chỉ huy số phận của từng commit: đổi tên thông điệp, gộp nhiều commit thành một, chỉnh sửa nội dung bên trong, thay đổi thứ tự thời gian hoặc xóa bỏ hoàn toàn commit thừa.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quá trình phát triển tính năng, không ai có thể commit hoàn hảo ngay từ đầu. Bạn thường tạo ra hàng loạt commit vụn vặt như \"fix bug\", \"sửa lỗi chính tả\", \"thử lại lần nữa\", \"tạm thời lưu\". Việc để nguyên đống commit nham nhở này gửi lên Pull Request thể hiện sự thiếu chuyên nghiệp nghiêm trọng. Interactive Rebase trao cho bạn cây đũa phép của người biên tập viên: bạn gọt giũa, dọn dẹp và đóng gói lại các commit vụn đó thành những khối thay đổi mạch lạc, sáng sủa trước khi trình diện cho đồng nghiệp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là một đạo diễn phim đang ngồi trong phòng dựng phim với hàng chục cuộn băng quay thô tại phim trường. Có những cảnh quay hỏng (commit rác), có những cảnh quay trùng lặp cần ghép lại (squash/fixup), có những phân cảnh cần đổi tên (reword) hoặc đổi thứ tự trước sau (reorder). Interactive Rebase chính là chiếc bàn dựng phim chuyên nghiệp giúp bạn cắt ghép, biên tập toàn bộ các cảnh quay thô thành một bộ phim điện ảnh bom tấn liền mạch và cuốn hút người xem từ đầu đến cuối.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình Interactive Rebase (git rebase -i HEAD~3):\nTrình soạn thảo mở ra bảng Todo List:\npick a1b2c3d feat: add shopping cart UI\npick e4f5a6b fix typo in cart\npick 7c8d9e0 add unit tests for cart\n\nĐạo diễn biên tập lại:\npick a1b2c3d feat: add shopping cart UI\nfixup e4f5a6b fix typo in cart          (Gộp vào commit trên, bỏ message thừa)\npick 7c8d9e0 test: add unit tests for cart (Đổi pick -> pick nhưng chuẩn hóa)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Tuấn vừa hoàn thành nhánh `feat/payment-gateway` với 4 commit: commit 1 thêm giao diện, commit 2 sửa CSS nút bấm, commit 3 thêm API, commit 4 sửa lỗi logic API. Trước khi mở Pull Request, Tuấn gõ lệnh: `git rebase -i HEAD~4`. Một tệp todo list mở ra trong VS Code. Tuấn giữ nguyên commit 1 và 3 bằng lệnh `pick`, đổi commit 2 và 4 thành `fixup` để gộp vào các commit tương ứng. Tuấn lưu tệp và đóng lại. Git tự động chạy lại lịch sử, biến 4 commit lộn xộn thành đúng 2 commit hoàn chỉnh: một cho giao diện và một cho API. Đồng nghiệp review PR vô cùng hài lòng.\n\n---\n\n## 💻 Command\n```bash\ngit rebase -i HEAD~<số-lượng-commit>\ngit rebase -i <commit-hash-gốc>\ngit rebase --continue\ngit rebase --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rebase -i HEAD~n`: Mở trình tương tác để biên tập lại n commit gần đây nhất tính từ đỉnh HEAD.\n- `git rebase -i <hash>`: Biên tập lại toàn bộ các commit nằm giữa hash chỉ định và HEAD.\n- `git rebase --continue`: Tiếp tục tiến trình sau khi đã hoàn thành một chỉ thị sửa đổi (ví dụ sau khi edit).\n- `git rebase --abort`: Hủy bỏ hoàn toàn phiên biên tập và khôi phục trạng thái ban đầu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Xóa dòng trong file Todo List**:  Trong interactive rebase, xóa một dòng commit đồng nghĩa với việc Git sẽ XÓA BỎ VĨNH VIỄN (drop) commit đó.\n2. **Sử dụng interactive rebase trên nhánh chung đã push lên GitHub.**: Sử dụng interactive rebase trên nhánh chung đã push lên GitHub.\n3. **Hoảng sợ khi editor mở ra**:  Bình tĩnh đọc kỹ phần hướng dẫn (comments) ở nửa dưới của tệp todo list.\n\n---\n\n## 🧪 Lab\n1. Tạo liên tiếp 3 commit thử nghiệm nhỏ trong kho chứa bài tập.\n2. Chạy lệnh `git rebase -i HEAD~3` để mở trình soạn thảo Todo List.\n3. Đổi từ `pick` ở dòng thứ 2 thành `reword` để đổi tên thông điệp.\n4. Lưu và đóng file lại, sau đó nhập thông điệp mới theo yêu cầu của Git.\n5. Kiểm tra lại `git log --oneline` để chiêm ngưỡng kết quả.\n\n---\n\n## 💡 Hint\n> Nếu lỡ tay làm hỏng Todo List trong khi soạn thảo, chỉ cần xóa sạch nội dung file hoặc đóng lại mà không lưu rồi gõ `git rebase --abort`.\n\n---\n\n## ✅ Validation\n- Làm chủ giao diện Todo List của Interactive Rebase và thực hiện thành thạo các chỉ thị biên tập cơ bản.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ Interactive Rebase.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt trong thứ tự hiển thị commit giữa `git log` (từ mới đến cũ) và Todo List của `git rebase -i` (từ cũ đến mới).\n\n---\n\n## 📚 Tổng kết\n- `git rebase -i` mở ra Todo List cho phép toàn quyền biên tập chuỗi commit cục bộ.\n- Cung cấp các lệnh quyền năng: pick, reword, edit, squash, fixup, drop.\n- Là bước chuẩn bị quan trọng bậc nhất để xây dựng văn hóa commit chuyên nghiệp trước khi mở PR.\n",
  "quiz": {
    "id": "quiz-05-13-interactive-rebase",
    "title": "Trắc nghiệm: Interactive Rebase",
    "questions": [
      {
        "id": "q1",
        "question": "Thứ tự sắp xếp các commit trong tệp Todo List khi bạn chạy `git rebase -i HEAD~3` là như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Theo thứ tự thời gian từ cũ nhất ở trên đỉnh xuống mới nhất ở dưới đáy (ngược lại với git log)",
            "correct": true
          },
          {
            "text": "Commit mới nhất luôn ở trên đỉnh",
            "correct": false
          },
          {
            "text": "Sắp xếp ngẫu nhiên không có thứ tự",
            "correct": false
          },
          {
            "text": "Sắp xếp theo thứ tự bảng chữ cái của thông điệp",
            "correct": false
          }
        ],
        "explanation": "Todo list hiển thị từ quá khứ đến hiện tại để Git có thể phát lại (replay) từng commit từ trên xuống dưới."
      },
      {
        "id": "q2",
        "question": "Nếu bạn vô tình xóa hẳn một dòng commit trong tệp Todo List rồi lưu lại và đóng trình soạn thảo, Git sẽ làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Git hiểu rằng bạn muốn loại bỏ (drop) commit đó và sẽ xóa hoàn toàn commit đó khỏi nhánh",
            "correct": true
          },
          {
            "text": "Git sẽ báo lỗi cú pháp và bắt bạn nhập lại",
            "correct": false
          },
          {
            "text": "Git tự động nhân đôi commit đó lên",
            "correct": false
          },
          {
            "text": "Không có chuyện gì xảy ra cả",
            "correct": false
          }
        ],
        "explanation": "Xóa dòng trong todo list tương đương với chỉ thị `drop`: Git sẽ bỏ qua commit đó khi tái tạo lịch sử."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để mở phiên Interactive Rebase biên tập lại 5 commit gần nhất?",
        "type": "single",
        "options": [
          {
            "text": "git rebase -i HEAD~5",
            "correct": true
          },
          {
            "text": "git rebase --interactive 5",
            "correct": false
          },
          {
            "text": "git edit-history HEAD~5",
            "correct": false
          },
          {
            "text": "git interactive 5",
            "correct": false
          }
        ],
        "explanation": "`git rebase -i HEAD~5` là cú pháp chuẩn mực để biên tập 5 commit gần nhất."
      },
      {
        "id": "q4",
        "question": "Làm thế nào để thay đổi thứ tự xuất hiện của hai commit bằng Interactive Rebase?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ cần hoán đổi vị trí của hai dòng tương ứng trong tệp Todo List rồi lưu lại",
            "correct": true
          },
          {
            "text": "Gõ lệnh git swap-commits",
            "correct": false
          },
          {
            "text": "Thay đổi ngày giờ của hệ điều hành máy tính",
            "correct": false
          },
          {
            "text": "Đổi tên nhánh rồi đổi ngược lại",
            "correct": false
          }
        ],
        "explanation": "Git áp dụng commit theo thứ tự từ trên xuống dưới trong Todo list; đổi vị trí dòng là đổi thứ tự commit."
      }
    ]
  }
};
export default lesson;
