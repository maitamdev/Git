import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "16-reword-edit-drop",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "16-reword-edit-drop",
    "title": "Reword / Edit / Drop Commit",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "13-interactive-rebase"
    ],
    "objectives": [
      "Làm chủ 3 chỉ thị quyền năng còn lại của Interactive Rebase: `reword` (sửa thông điệp), `edit` (sửa nội dung) và `drop` (xóa commit).",
      "Sử dụng `reword` (hoặc `r`) để chuẩn hóa các commit message cũ sâu trong quá khứ.",
      "Sử dụng `edit` (hoặc `e`) để tạm dừng tiến trình rebase, bổ sung thêm file hoặc chia nhỏ commit đó.",
      "Sử dụng `drop` (hoặc `d`) để loại bỏ hoàn toàn các commit thử nghiệm không còn giá trị."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "reword commit",
      "edit commit",
      "drop commit",
      "sua thong diep",
      "sua noi dung commit",
      "xoa commit"
    ],
    "commands": [
      "r <commit-hash> (hoặc reword)",
      "e <commit-hash> (hoặc edit)",
      "d <commit-hash> (hoặc drop)",
      "git rebase --continue",
      "git reset HEAD~1 (trong lúc edit)"
    ]
  },
  "content": "# Reword / Edit / Drop Commit\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ 3 chỉ thị quyền năng còn lại của Interactive Rebase: `reword` (sửa thông điệp), `edit` (sửa nội dung) và `drop` (xóa commit).\n- Sử dụng `reword` (hoặc `r`) để chuẩn hóa các commit message cũ sâu trong quá khứ.\n- Sử dụng `edit` (hoặc `e`) để tạm dừng tiến trình rebase, bổ sung thêm file hoặc chia nhỏ commit đó.\n- Sử dụng `drop` (hoặc `d`) để loại bỏ hoàn toàn các commit thử nghiệm không còn giá trị.\n\n---\n\n## 📖 Định nghĩa\n> `reword`, `edit` và `drop` là bộ ba công cụ can thiệp chuyên sâu vào từng lát cắt lịch sử trong Interactive Rebase của Git. Chỉ thị `reword` (hoặc `r`) cho phép sửa đổi thông điệp của một commit bất kỳ trong quá khứ mà giữ nguyên mã nguồn. Chỉ thị `edit` (hoặc `e`) tạm dừng cỗ máy thời gian ngay tại thời điểm commit đó được sinh ra để bạn tự do sửa đổi tệp tin hoặc chia nhỏ commit. Còn chỉ thị `drop` (hoặc `d`) xóa bỏ vĩnh viễn commit đó khỏi chuỗi lịch sử.\n\n---\n\n## 🤔 Tại sao cần?\nTrong thực tế, bạn không chỉ muốn gộp commit mà còn cần gọt giũa chi tiết: một commit cách đây 5 bước bị viết sai mã vé Jira, một commit khác lỡ tay thêm tệp log nặng hàng chục megabyte cần phải xóa bỏ, hay một commit làm quá nhiều việc cần được dừng lại để bóc tách thành hai. Bộ ba reword, edit và drop trao cho bạn khả năng kiểm soát phẫu thuật chính xác đến từng nguyên tử đối với bất kỳ điểm nào trong dòng thời gian Git.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn sở hữu cỗ máy thời gian quay về quá khứ của một cuốn phim tài liệu. Lệnh `reword` giống như việc bạn chỉ cần thu âm lại lời bình của thuyết minh viên cho một đoạn phim mà không đổi cảnh quay. Lệnh `edit` giống như việc bạn bước hẳn vào trường quay của ngày hôm đó, bảo các diễn viên dừng hình, bạn thêm một đạo cụ vào tay diễn viên rồi mới cho máy quay chạy tiếp (`git rebase --continue`). Còn lệnh `drop` giống như việc bạn dùng kéo cắt đứt đoạn phim đó vứt vào sọt rác.\n\n---\n\n## 🖼 Sơ đồ\n```text\n3 hành động phẫu thuật commit:\n[pick C1]  ──► Giữ nguyên không đổi\n[reword C2]──► Dừng lại để mở editor sửa commit message của C2\n[edit C3]  ──► Dừng cỗ máy thời gian tại C3! (Cho phép git add/commit thêm)\n[drop C4]  ──► Xóa sổ hoàn toàn C4!\n[pick C5]  ──► Áp dụng tiếp bình thường\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Đức kiểm tra nhánh trước khi bàn giao và phát hiện 3 vấn đề: commit 1 ghi nhầm số issue #101 thành #102, commit 2 vô tình commit nhầm file mật khẩu `secret.env`, commit 3 thiếu tệp test. Đức chạy lệnh `git rebase -i HEAD~3`. Trong Todo List, Đức đánh dấu: dòng 1 là `reword`, dòng 2 là `drop`, dòng 3 là `edit`. Khi lưu lại, Git dừng ở commit 1 để Đức sửa lại thành #101. Tiếp theo Git xóa phăng commit 2 chứa file mật khẩu. Cuối cùng Git dừng lại ở commit 3, Đức thêm file test, gõ `git add` và `git rebase --continue`. Toàn bộ nhánh được dọn dẹp sạch bong và tuyệt đối an toàn.\n\n---\n\n## 💻 Command\n```bash\nr <commit-hash> (hoặc reword)\ne <commit-hash> (hoặc edit)\nd <commit-hash> (hoặc drop)\ngit rebase --continue\ngit reset HEAD~1 (trong lúc edit)\n```\n\n---\n\n## 🔍 Giải thích command\n- `reword <hash>`: Giữ nguyên mã nguồn của commit nhưng mở editor để sửa đổi tiêu đề và mô tả commit.\n- `edit <hash>`: Tạm dừng tiến trình rebase tại commit này, cho phép bạn chỉnh sửa tệp tin, commit amend hoặc chia tách commit.\n- `drop <hash>`: Xóa bỏ hoàn toàn commit này (tương đương với việc xóa dòng đó khỏi Todo List).\n- `git rebase --continue`: Báo cho Git biết bạn đã hoàn tất chỉnh sửa ở bước edit và tiếp tục tiến trình.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên gõ `git rebase --continue` sau khi edit**:  Khiến Git bị treo mãi ở trạng thái rebase dở dang.\n2. **Sử dụng `drop` nhầm commit quan trọng chứa mã nguồn cần giữ lại.**: Sử dụng `drop` nhầm commit quan trọng chứa mã nguồn cần giữ lại.\n3. **Lúng túng khi đang ở trạng thái edit**:  Chỉ cần nhớ bạn đang đứng tại đúng thời điểm của commit đó, sửa xong thì `git add` và `git commit --amend` rồi `--continue`.\n\n---\n\n## 🧪 Lab\n1. Tạo 3 commit liên tiếp, trong đó commit 2 có thông điệp `sai thong diep`.\n2. Chạy `git rebase -i HEAD~3`.\n3. Đổi từ khóa dòng 2 từ `pick` thành `reword`.\n4. Lưu và đóng editor; nhập thông điệp mới `thong diep chuan` khi Git yêu cầu.\n5. Kiểm tra lại `git log --oneline` để xác nhận thông điệp đã được sửa thành công.\n\n---\n\n## 💡 Hint\n> Khi ở trạng thái `edit`, bạn có thể chạy `git reset HEAD~1` để bóc tách một commit lớn thành nhiều commit nhỏ.\n\n---\n\n## ✅ Validation\n- Sử dụng thành thạo reword để đổi thông điệp, edit để sửa code và drop để loại bỏ commit.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về các chỉ thị reword, edit và drop.\n\n---\n\n## 🔥 Challenge\nMô tả quy trình từng bước sử dụng chỉ thị `edit` để chia một commit lớn thành 2 commit nhỏ riêng biệt.\n\n---\n\n## 📚 Tổng kết\n- `reword` (r) sửa đổi thông điệp của commit trong quá khứ mà giữ nguyên mã nguồn.\n- `edit` (e) tạm dừng tiến trình để bổ sung thay đổi hoặc chia nhỏ commit.\n- `drop` (d) loại bỏ vĩnh viễn commit thừa ra khỏi chuỗi lịch sử.\n",
  "quiz": {
    "id": "quiz-05-16-reword-edit-drop",
    "title": "Trắc nghiệm: Reword, Edit và Drop Commit",
    "questions": [
      {
        "id": "q1",
        "question": "Chỉ thị nào trong Interactive Rebase cho phép bạn sửa đổi thông điệp của một commit cũ mà KHÔNG làm thay đổi mã nguồn của nó?",
        "type": "single",
        "options": [
          {
            "text": "reword (hoặc r)",
            "correct": true
          },
          {
            "text": "edit (hoặc e)",
            "correct": false
          },
          {
            "text": "drop (hoặc d)",
            "correct": false
          },
          {
            "text": "pick (hoặc p)",
            "correct": false
          }
        ],
        "explanation": "`reword` chỉ dừng lại để mở editor sửa đổi commit message, mã nguồn được bảo toàn nguyên vẹn."
      },
      {
        "id": "q2",
        "question": "Khi bạn đặt chỉ thị `edit` cho một commit trong Todo List, Git sẽ cư xử như thế nào khi chạy đến commit đó?",
        "type": "single",
        "options": [
          {
            "text": "Tạm dừng toàn bộ tiến trình rebase tại commit đó và trả quyền điều khiển về terminal để bạn chỉnh sửa code",
            "correct": true
          },
          {
            "text": "Tự động mở trình duyệt web tìm kiếm tài liệu",
            "correct": false
          },
          {
            "text": "Xóa commit đó đi và làm tiếp commit sau",
            "correct": false
          },
          {
            "text": "Tắt cửa sổ terminal của bạn",
            "correct": false
          }
        ],
        "explanation": "`edit` đưa bạn về đúng snapshot của commit đó để bạn sửa code, bổ sung file hoặc chạy commit amend."
      },
      {
        "id": "q3",
        "question": "Sau khi đã chỉnh sửa xong mã nguồn ở trạng thái tạm dừng của lệnh `edit`, câu lệnh nào dùng để tiếp tục tiến trình rebase?",
        "type": "single",
        "options": [
          {
            "text": "git rebase --continue",
            "correct": true
          },
          {
            "text": "git rebase --next",
            "correct": false
          },
          {
            "text": "git resume",
            "correct": false
          },
          {
            "text": "git proceed",
            "correct": false
          }
        ],
        "explanation": "`git rebase --continue` là chỉ thị thông báo cho Git tiếp tục phát lại các commit còn lại trong danh sách."
      },
      {
        "id": "q4",
        "question": "Hành động nào sau đây có tác dụng tương đương hoàn toàn với chỉ thị `drop` trong Todo List?",
        "type": "single",
        "options": [
          {
            "text": "Xóa hoàn toàn dòng chứa commit đó ra khỏi tệp Todo List",
            "correct": true
          },
          {
            "text": "Đổi từ pick thành squash",
            "correct": false
          },
          {
            "text": "Chuyển dòng đó xuống dưới cùng của tệp",
            "correct": false
          },
          {
            "text": "Đổi tên thông điệp commit thành chữ \"deleted\"",
            "correct": false
          }
        ],
        "explanation": "Xóa dòng trong Todo List và đặt từ khóa `drop` đều chỉ thị cho Git loại bỏ hoàn toàn commit đó khỏi lịch sử."
      }
    ]
  }
};
export default lesson;
