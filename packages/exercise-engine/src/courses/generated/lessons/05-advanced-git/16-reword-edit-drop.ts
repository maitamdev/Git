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
      "Sử dụng `drop` (hoặc `d`) để không phát lại commit thử nghiệm vào lịch sử mới."
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
      "git log --oneline",
      "git status"
    ]
  },
  "content": "# Reword / Edit / Drop Commit\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ 3 chỉ thị quyền năng còn lại của Interactive Rebase: `reword` (sửa thông điệp), `edit` (sửa nội dung) và `drop` (xóa commit).\n- Sử dụng `reword` (hoặc `r`) để chuẩn hóa các commit message cũ sâu trong quá khứ.\n- Sử dụng `edit` (hoặc `e`) để tạm dừng tiến trình rebase, bổ sung thêm file hoặc chia nhỏ commit đó.\n- Sử dụng `drop` (hoặc `d`) để không phát lại commit thử nghiệm vào lịch sử mới.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Reword (reword / r)\n- **Nói dễ hiểu**: Lệnh trong Todo List mở trình soạn thảo để bạn viết lại câu thông điệp của commit cũ mà không đụng chạm đến code.\n- **Ví dụ**: Đổi `pick` thành `reword` cho commit `a1b2c3d` để sửa lỗi chính tả trong commit message.\n- **Đừng nhầm**: `reword` vẫn tạo ra một commit hash mới vì SHA-1 tính cả nội dung câu mô tả commit.\n\n### Edit (edit / e)\n- **Nói dễ hiểu**: Lệnh tạm dừng tiến trình rebase tại đúng commit được chỉ định để bạn sửa file, bổ sung code hoặc tách commit.\n- **Ví dụ**: Đổi thành `edit` ở một commit cũ để thêm một file bị sót bằng `git add` và `git commit --amend`, sau đó gõ `git rebase --continue`.\n- **Đừng nhầm**: Sau khi hoàn thành thao tác sửa đổi, bạn phải chạy `git rebase --continue` để Git tiếp tục áp dụng các commit kế tiếp.\n\n### Drop (drop / d)\n- **Nói dễ hiểu**: Lệnh bỏ commit khỏi lịch sử mới mà rebase đang tạo.\n- **Ví dụ**: Đổi dòng commit thử nghiệm thành `drop` để không phát lại thay đổi đó vào lịch sử mới.\n- **Đừng nhầm**: Commit cũ có thể còn tìm thấy trong reflog một thời gian; drop không xóa ngay object khỏi kho.\n\n---\n\n## 📖 Định nghĩa\n`reword`, `edit` và `drop` là các chỉ thị của Interactive Rebase: `reword` đổi thông điệp, `edit` dừng để bạn sửa commit, còn `drop` không phát lại commit đó vào lịch sử mới. Rebase tạo lại lịch sử; commit cũ có thể còn tìm được qua reflog trong một thời gian.\n\n---\n\n## 💡 Tại sao cần\nTrong thực tế, bạn thường cần sửa mã vé Jira ghi sai, loại bỏ commit chứa tệp rác thừa, hoặc tách một commit quá lớn thành hai. Bộ ba chỉ thị này trao cho bạn khả năng kiểm soát phẫu thuật chính xác đến từng điểm trong lịch sử Git.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn có cỗ máy thời gian quay về từng cảnh quay trong phim. Lệnh `reword` giống như lồng tiếng lại lời bình. Lệnh `edit` giống như dừng trường quay lại để bạn đưa thêm đạo cụ vào tay diễn viên rồi mới bấm máy tiếp. Còn lệnh `drop` là cắt bỏ phân cảnh đó vứt vào sọt rác.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\n3 hành động phẫu thuật commit trong Interactive Rebase:\n[pick C1]   ──► Giữ nguyên không đổi\n[reword C2] ──► Dừng lại để mở editor sửa commit message của C2\n[edit C3]   ──► Tạm dừng tại C3! Cho phép sửa code, git add/amend\n[drop C4]   ──► Xóa sổ hoàn toàn C4 khỏi lịch sử!\n[pick C5]   ──► Áp dụng tiếp bình thường\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Đức cần sửa ba commit chưa chia sẻ: đổi thông điệp commit đầu, bỏ một commit debug không cần nữa, và thêm test vào commit thứ ba. Đức dùng `rebase -i` trên nhánh thử nghiệm, rồi kiểm tra cả nội dung lẫn lịch sử mới. Nếu commit có credential đã lỡ chia sẻ, Đức thu hồi credential trước; `drop` không vô hiệu hóa secret.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\nr <commit-hash> (hoặc reword)\ne <commit-hash> (hoặc edit)\nd <commit-hash> (hoặc drop)\ngit rebase --continue\ngit commit --amend (khi đang tạm dừng ở trạng thái edit)\n```\n\n---\n\n## 🔍 Giải thích command\n- `reword <hash>`: Giữ nguyên mã nguồn của commit nhưng mở editor để sửa đổi tiêu đề và mô tả commit.\n- `edit <hash>`: Tạm dừng tiến trình rebase tại commit này, cho phép bạn chỉnh sửa tệp tin, commit amend hoặc chia tách commit.\n- `drop <hash>`: Không phát lại commit này vào lịch sử mới (có thể xóa dòng đó khỏi todo list).\n- `git rebase --continue`: Báo cho Git biết bạn đã hoàn tất chỉnh sửa ở bước edit và tiếp tục tiến trình.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên gõ `git rebase --continue` sau khi edit**: Khiến Git bị treo mãi ở trạng thái rebase dở dang trong terminal.\n2. **Dùng `drop` nhầm commit quan trọng**: Thay đổi đó không được phát lại. Có thể cần tìm commit cũ qua reflog nếu entry và object còn đó.\n3. **Lúng túng khi đang ở trạng thái edit**: Nhớ rằng bạn đang đứng ở snapshot quá khứ, sửa xong chỉ cần `git add`, `git commit --amend` rồi `--continue`.\n\n---\n\n## 🧪 Lab thực hành\nLuyện bằng Git thật trong kho thử nghiệm riêng; simulator hiện chưa nhận chỉnh sửa todo list qua editor.\n1. Tạo commit nền, rồi ba commit riêng: `add heading`, `add debug log`, `add test`.\n2. Chạy `git rebase -i HEAD~3`. Đổi dòng `add heading` thành `reword`, dòng `add debug log` thành `drop`, và dòng `add test` thành `edit`.\n3. Lưu todo list. Khi được hỏi, đổi thông điệp commit đầu thành `docs: add heading`.\n4. Khi rebase dừng ở commit `edit`, sửa `test.txt`, chạy `git add test.txt`, `git commit --amend --no-edit`, rồi `git rebase --continue`.\n5. Kiểm tra `git log --oneline -4` và `git status`; commit debug không còn trong nhánh mới, hai commit còn lại có nội dung mong muốn.\n\n---\n\n## 💡 Hint & mẹo\n> Khi Git dừng ở `edit`, sửa file, stage phần muốn giữ, rồi `git commit --amend` và `git rebase --continue`. Nếu commit có secret đã lỡ chia sẻ, hãy thu hồi hoặc đổi secret trước; chỉ drop commit không làm credential mất hiệu lực và không xóa bản sao đã có.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Thực hiện được `reword`, `edit` và `drop` trong kho thử nghiệm, rồi kiểm tra lịch sử mới.\n- Biết `drop` không phải cách xử lý bảo mật cho secret đã bị lộ.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về các chỉ thị reword, edit và drop.\n\n---\n\n## 🚀 Thử thách nâng cao\nMô tả quy trình từng bước sử dụng chỉ thị `edit` để chia một commit lớn thành 2 commit nhỏ riêng biệt.\n\n---\n\n## 📝 Tổng kết\n- `reword` giúp chuẩn hóa thông điệp mà không đụng chạm đến mã nguồn.\n- `edit` trao quyền can thiệp vào mã nguồn của commit trong quá khứ.\n- `drop` (hoặc xóa dòng) loại bỏ commit thừa một cách dứt khoát.\n",
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
      },
      {
        "id": "q5",
        "question": "Khi nào bạn nên chọn chỉ thị `edit` thay vì `reword` trong interactive rebase?",
        "type": "single",
        "options": [
          {
            "text": "Khi bạn cần can thiệp thay đổi mã nguồn, thêm tệp mới hoặc tách nhỏ một commit trong quá khứ",
            "correct": true
          },
          {
            "text": "Khi bạn chỉ muốn sửa lỗi chính tả trong câu mô tả commit",
            "correct": false
          },
          {
            "text": "Khi bạn muốn gửi commit đó qua email cho người khác",
            "correct": false
          },
          {
            "text": "Khi commit đó đã được hợp nhất vào nhánh main trên GitHub",
            "correct": false
          }
        ],
        "explanation": "`edit` tạm dừng để bạn chỉnh sửa file hoặc code, còn `reword` chỉ mở editor để sửa mỗi commit message."
      }
    ]
  }
};
export default lesson;
