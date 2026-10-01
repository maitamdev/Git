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
  "content": "# Interactive Rebase\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sức mạnh vượt trội của Interactive Rebase (`git rebase -i`) như một công cụ biên tập lịch sử tối thượng.\n- Đọc hiểu và sử dụng thành thạo danh sách lệnh Todo của Interactive Rebase: pick, reword, edit, squash, fixup, drop.\n- Sắp xếp lại thứ tự xuất hiện của các commit trong chuỗi lịch sử cục bộ.\n- Chuẩn bị một chuỗi commit chuyên nghiệp, sắc nét trước khi mở Pull Request.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Interactive Rebase (git rebase -i)\n- **Nói dễ hiểu**: Trình biên tập tương tác cho phép sửa, gộp, xóa hoặc đổi thứ tự các commit cũ trong quá khứ.\n- **Ví dụ**: Dùng `git rebase -i HEAD~3` để dọn dẹp 3 commit lộn xộn gần nhất trước khi mở Pull Request.\n- **Đừng nhầm**: Không dùng rebase tương tác trên nhánh chung đã push lên remote vì nó viết lại lịch sử commit.\n\n### Rebase Todo List\n- **Nói dễ hiểu**: Bảng danh sách hành động (pick, squash, reword, drop) mà Git mở ra trong trình soạn thảo để bạn ra lệnh xử lý từng commit.\n- **Ví dụ**: Đổi từ `pick` sang `reword` ở một dòng để đổi tên commit message khi Git chạy qua.\n- **Đừng nhầm**: Thứ tự commit trong Todo List là từ trên xuống dưới (từ commit cũ nhất đến commit mới nhất), ngược với git log.\n\n### Rebase Actions (pick/reword/drop)\n- **Nói dễ hiểu**: Các động từ chỉ thị cho Git biết phải làm gì với từng commit cụ thể trong danh sách biên tập.\n- **Ví dụ**: Giữ `pick` để dùng nguyên commit, chọn `drop` (hoặc xóa dòng) để loại bỏ hoàn toàn commit đó khỏi lịch sử.\n- **Đừng nhầm**: `reword` chỉ sửa message commit, còn `edit` sẽ dừng tiến trình lại để bạn sửa cả code lẫn commit.\n\n---\n\n## 📖 Định nghĩa\nInteractive Rebase (`git rebase -i`) là công cụ biên tập tương tác cho phép xem lại danh sách commit cũ và chọn hành động cụ thể cho từng commit: giữ nguyên, đổi tên, sửa nội dung, gộp lại hoặc xóa bỏ hoàn toàn.\n\n---\n\n## 💡 Tại sao cần\nKhi lập trình, chúng ta thường tạo nhiều commit vụn vặt và tạm bợ. Interactive Rebase giúp bạn dọn dẹp, sắp xếp lại chuỗi lịch sử cục bộ cho mạch lạc, sạch sẽ và chuyên nghiệp trước khi gửi Pull Request cho đồng nghiệp review.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng bạn là đạo diễn phim đang ngồi trong phòng dựng phim. Bạn có các đoạn quay nháp, quay hỏng hay trùng lặp. Interactive Rebase chính là chiếc bàn dựng phim giúp bạn cắt bỏ cảnh hỏng, ghép các cảnh rời rạc thành một bộ phim liền mạch hoàn chỉnh.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình Interactive Rebase (git rebase -i HEAD~3):\nGit mở Todo List trong editor:\npick a1b2c3d feat: add shopping cart UI\npick e4f5a6b fix typo in cart\npick 7c8d9e0 add unit tests for cart\n\nBạn sửa Todo List:\npick a1b2c3d feat: add shopping cart UI\nfixup e4f5a6b fix typo in cart          (Gộp vào commit trên, bỏ message thừa)\npick 7c8d9e0 test: add unit tests for cart (Đổi tên message cho chuẩn)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Tuấn làm tính năng giỏ hàng và có 3 commit vụn: \"tạo nút\", \"sửa css nút\", \"fix typo\". Trước khi mở PR, Tuấn chạy `git rebase -i HEAD~3`, đổi 2 commit sau thành fixup để gộp vào commit đầu. Kết quả là nhánh chỉ còn 1 commit duy nhất chuẩn chỉ và rõ ràng.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit rebase -i HEAD~<số-lượng-commit>\ngit rebase -i <commit-hash-gốc>\ngit rebase --continue\ngit rebase --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rebase -i HEAD~n`: Mở trình tương tác để biên tập lại n commit gần đây nhất tính từ đỉnh HEAD.\n- `git rebase -i <hash>`: Biên tập lại toàn bộ các commit nằm giữa hash chỉ định và HEAD.\n- `git rebase --continue`: Tiếp tục tiến trình sau khi đã hoàn thành một chỉ thị sửa đổi (ví dụ sau khi edit hoặc giải quyết xung đột).\n- `git rebase --abort`: Hủy bỏ hoàn toàn phiên biên tập và khôi phục trạng thái nhánh về nguyên vẹn như trước khi rebase.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Xóa dòng trong file Todo List**: Trong interactive rebase, xóa một dòng commit đồng nghĩa với việc Git sẽ loại bỏ hoàn toàn (drop) commit đó khỏi lịch sử.\n2. **Rebase trên nhánh chung đã push**: Thay đổi lịch sử của nhánh chung công khai sẽ gây xung đột và rối loạn cho toàn bộ nhóm làm việc.\n3. **Hoảng sợ khi editor mở ra**: Bình tĩnh đọc kỹ phần hướng dẫn giải thích ý nghĩa các lệnh ở nửa dưới của tệp todo list do Git tạo ra.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Tạo liên tiếp 3 commit thử nghiệm nhỏ trong kho chứa bài tập cá nhân.\n2. Chạy lệnh `git rebase -i HEAD~3` để mở trình soạn thảo Todo List.\n3. Đổi từ `pick` ở dòng thứ 2 thành `reword` để đổi tên thông điệp commit.\n4. Lưu và đóng file lại, sau đó nhập thông điệp mới theo yêu cầu của Git.\n5. Kiểm tra lại `git log --oneline` để chiêm ngưỡng kết quả lịch sử đã được cập nhật.\n\n---\n\n## 💡 Hint & mẹo\n> Nếu lỡ tay làm hỏng Todo List trong khi soạn thảo, chỉ cần xóa sạch nội dung file hoặc đóng lại mà không lưu rồi gõ `git rebase --abort` để quay về an toàn.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Làm chủ giao diện Todo List của Interactive Rebase và thực hiện thành thạo các chỉ thị biên tập cơ bản.\n- Biết cách sử dụng `git rebase --abort` và `git rebase --continue` một cách tự tin.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ Interactive Rebase.\n\n---\n\n## 🚀 Thử thách nâng cao\nNêu sự khác biệt trong thứ tự hiển thị commit giữa `git log` (từ mới nhất đến cũ nhất) và Todo List của `git rebase -i` (từ cũ nhất đến mới nhất theo thứ tự áp dụng).\n\n---\n\n## 📝 Tổng kết\n- `git rebase -i` mở ra Todo List cho phép toàn quyền biên tập chuỗi commit cục bộ.\n- Cung cấp các lệnh quyền năng: pick, reword, edit, squash, fixup, drop.\n- Là bước chuẩn bị quan trọng bậc nhất để xây dựng văn hóa commit chuyên nghiệp trước khi mở PR.\n",
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
      },
      {
        "id": "q5",
        "question": "Trong tệp Todo List của Interactive Rebase, chỉ thị `pick` ở đầu mỗi dòng có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Giữ lại commit đó và áp dụng vào cây lịch sử mới",
            "correct": true
          },
          {
            "text": "Xóa bỏ vĩnh viễn commit đó khỏi dự án",
            "correct": false
          },
          {
            "text": "Nén commit đó vào commit liền trước",
            "correct": false
          },
          {
            "text": "Dừng tiến trình để sửa code bên trong commit",
            "correct": false
          }
        ],
        "explanation": "`pick` là hành vi mặc định, báo cho Git tiếp tục giữ lại và phát lại commit đó vào chuỗi commit mới."
      }
    ]
  }
};
export default lesson;
