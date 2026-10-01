import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-git-reset-soft",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "02-git-reset-soft",
    "title": "git reset --soft",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-undo-restore-reset-revert"
    ],
    "objectives": [
      "Hiểu rõ bản chất hoạt động của cờ `--soft` trong câu lệnh `git reset`.",
      "Biết chính xác trạng thái của HEAD, Staging Area và Working Directory sau khi chạy `git reset --soft`.",
      "Ứng dụng `git reset --soft` để gộp nhiều commit nhỏ hoặc viết lại commit message một cách linh hoạt.",
      "Phân biệt sự khác nhau giữa reset soft và các chế độ mixed hay hard."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git reset --soft",
      "reset soft",
      "hoan tac commit giu staging",
      "amend commit alternative",
      "undo commit"
    ],
    "commands": [
      "git reset --soft HEAD~1",
      "git reset --soft <commit-hash>",
      "git status",
      "git commit -m \"<thông-điệp-mới>\""
    ]
  },
  "content": "# git reset --soft\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất hoạt động của cờ `--soft` trong câu lệnh `git reset`.\n- Biết chính xác trạng thái của HEAD, Staging Area và Working Directory sau khi chạy `git reset --soft`.\n- Ứng dụng `git reset --soft` để gộp nhiều commit nhỏ hoặc viết lại commit message một cách linh hoạt.\n- Phân biệt sự khác nhau giữa reset soft và các chế độ mixed hay hard.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git reset --soft\n- **Nói dễ hiểu**: Lệnh rút lại commit gần nhất nhưng giữ nguyên toàn bộ thay đổi trong Staging Area để sẵn sàng commit lại ngay.\n- **Ví dụ**: `git reset --soft HEAD~1` khi vừa commit xong thì nhớ ra quên sửa lỗi chính tả trong message.\n- **Đừng nhầm**: Không làm mất bất kỳ dòng code nào; toàn bộ file vẫn nằm nguyên ở trạng thái staged màu xanh.\n\n### HEAD~1\n- **Nói dễ hiểu**: Ký hiệu trỏ đến commit cha đứng ngay liền trước commit hiện tại của nhánh.\n- **Ví dụ**: Đang ở commit C3 thì `HEAD~1` chính là commit C2.\n- **Đừng nhầm**: Không phải tên một nhánh; đây là cú pháp di chuyển tương đối lùi lại một bước trong cây lịch sử.\n\n### staged preservation\n- **Nói dễ hiểu**: Đặc điểm giữ nguyên vẹn nội dung của Staging Area trong quá trình di chuyển con trỏ nhánh.\n- **Ví dụ**: Các file trong commit bị hủy không bị văng ra ngoài mà vẫn nằm sẵn trong Staging.\n- **Đừng nhầm**: Khác với `--mixed` vốn xóa sạch Staging và đưa code về Working Directory chưa add.\n\n---\n\n## 📖 Định nghĩa\n`git reset --soft <commit-target>` di chuyển nhánh hiện tại về commit mục tiêu nhưng không thay đổi Staging Area hoặc nội dung trong Working Tree. Nếu Staging khớp với `HEAD` trước lệnh, phần khác nhau giữa `HEAD` cũ và commit mục tiêu sẽ trở thành thay đổi staged sau reset. Dùng trong kho thử nghiệm hoặc nhánh cá nhân; lệnh này viết lại vị trí lịch sử của nhánh.\n\n---\n\n## 💡 Tại sao cần\nKhi lập trình, bạn thường xuyên lỡ commit quá sớm khi thiếu file hoặc ghi sai thông điệp. Lệnh `git reset --soft HEAD~1` là giải pháp hoàn hảo: nó rút lại commit vừa tạo tức thì mà không làm mất dòng code nào, đưa toàn bộ mã nguồn trở lại Staging để bạn thoải mái bổ sung file hoặc viết lại message chuẩn xác.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn đóng gói một kiện hàng. Bạn đã xếp đồ vào thùng (Working Tree), dán nhãn niêm phong (Staging) và bưu tá đóng dấu gửi (Commit). Khi nhận ra quên bỏ thiệp mừng vào thùng, bạn yêu cầu bưu tá hủy dấu vừa đóng (`--soft`). Kiện hàng vẫn dán nhãn nguyên vẹn, bạn chỉ việc kẹp thêm thiệp rồi bảo bưu tá đóng dấu lại.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế hoạt động của git reset --soft HEAD~1:\nTrước khi reset:\nCommit History:   C1 ──► C2 ──► C3 (HEAD -> main)\nStaging Area:     Trống sạch sẽ\nWorking Tree:     Trống sạch sẽ\n\nSau khi git reset --soft HEAD~1:\nCommit History:   C1 ──► C2 (HEAD -> main)\nStaging Area:     Chứa toàn bộ thay đổi của C3 (Staged!)\nWorking Tree:     Không đổi\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nLập trình viên Quang vừa gõ `git commit -m \"feat: user profile\"` thì nhận ra quên cập nhật README.md. Thay vì tạo commit vá víu làm rối lịch sử, Quang gõ `git reset --soft HEAD~1`. Nhánh lùi lại 1 commit, các file tính năng vẫn nằm trong Staging màu xanh. Quang sửa README, gõ `git add README.md` và commit lại một lần duy nhất hoàn chỉnh.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit reset --soft HEAD~1\ngit reset --soft <commit-hash>\ngit status\ngit commit -m \"<thông-điệp-mới>\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reset --soft HEAD~1`: Rút lại commit gần nhất, toàn bộ thay đổi chuyển về trạng thái staged sẵn sàng commit lại.\n- `git reset --soft <hash>`: Lùi nhánh về commit chỉ định trong quá khứ, toàn bộ thay đổi trung gian được gộp vào Staging.\n- `git status`: Kiểm tra lại danh sách các tệp tin đang nằm trong Staging Area sau khi reset.\n- `git commit -m`: Tạo commit mới thay thế hoàn hảo với đầy đủ mã nguồn và thông điệp chuẩn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nhầm `--soft` với thao tác không ảnh hưởng lịch sử**: File và index được giữ nguyên, nhưng nhánh vẫn được chuyển về commit mục tiêu.\n2. **Chạy reset trên nhánh đã chia sẻ mà chưa thống nhất**: Người khác có thể đã dựa trên commit cũ; hãy phối hợp trước khi cập nhật lịch sử từ xa.\n3. **Quên cờ --soft khiến Git chạy mặc định --mixed**: Làm toàn bộ file văng ra khỏi Staging Area và phải tốn công `git add` lại từ đầu.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác reset --soft và kiểm tra trạng thái staged trên terminal.\n1. Trong kho thử nghiệm riêng, tạo `note.txt` có nội dung `ban dau`, rồi chạy `git add note.txt` và `git commit -m \"base\"`.\n2. Đổi nội dung thành `ban cap nhat`, stage và commit bằng thông điệp `thu nghiem`.\n3. Chạy `git reset --soft HEAD~1`, rồi `git status`. Thay đổi do commit `thu nghiem` tạo ra nằm trong Staging Area.\n4. Chạy `git commit -m \"cap nhat note\"`, sau đó `git log --oneline -3` để kiểm tra commit mới thay cho commit thử nghiệm.\n\n---\n\n## 💡 Hint & mẹo\n> Nếu chỉ cần sửa commit gần nhất, `git commit --amend` thường trực tiếp hơn. Dùng reset khi muốn đưa một hay nhiều commit về Staging để sắp xếp lại.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git status` hiển thị phần khác với commit mục tiêu trong mục \"Changes to be committed\" (khi kho sạch trước khi bắt đầu).\n- Nhánh hiện tại trỏ về commit cha, còn nội dung file vẫn giữ nguyên.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --soft.\n\n---\n\n## 🚀 Thử thách nâng cao\nSử dụng `git reset --soft HEAD~3` để gom 3 commit nhỏ lẻ gần nhất thành đúng một commit duy nhất có thông điệp chuẩn mực.\n\n---\n\n## 📝 Tổng kết\n- `git reset --soft` chỉ dịch chuyển HEAD, bảo toàn trọn vẹn Staging Area và Working Directory.\n- Thay đổi từ commit bị rút lại sẽ nằm ở trạng thái staged sẵn sàng cho commit mới.\n- Là công cụ tuyệt vời để sửa thông điệp commit hoặc bổ sung tệp còn thiếu mà không gây rác lịch sử.\n",
  "quiz": {
    "id": "quiz-05-02-git-reset-soft",
    "title": "Trắc nghiệm: git reset --soft",
    "questions": [
      {
        "id": "q1",
        "question": "Sau khi chạy lệnh `git reset --soft HEAD~1`, các thay đổi của commit vừa bị rút lại sẽ nằm ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Nằm trong Staging Area (Index) ở trạng thái đã được staged sẵn sàng commit",
            "correct": true
          },
          {
            "text": "Bị xóa vĩnh viễn khỏi ổ đĩa cứng không thể phục hồi",
            "correct": false
          },
          {
            "text": "Bị đẩy ra Working Directory ở trạng thái chưa staged",
            "correct": false
          },
          {
            "text": "Tự động gửi lên hòm thư điện tử của bạn",
            "correct": false
          }
        ],
        "explanation": "Cờ `--soft` chỉ dịch chuyển HEAD, giữ nguyên Staging và Working Tree, nên code nằm sẵn trong Staging."
      },
      {
        "id": "q2",
        "question": "Mục đích sử dụng phổ biến và hữu ích nhất của `git reset --soft HEAD~1` trong thực tế là gì?",
        "type": "single",
        "options": [
          {
            "text": "Rút lại commit gần nhất để chỉnh sửa lại thông điệp commit hoặc bổ sung thêm tệp tin còn thiếu",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ dự án để làm lại từ đầu",
            "correct": false
          },
          {
            "text": "Tăng gấp đôi tốc độ tải mạng",
            "correct": false
          },
          {
            "text": "Chuyển đổi dự án sang nhánh khác",
            "correct": false
          }
        ],
        "explanation": "Reset soft hoàn tác commit nhưng giữ nguyên staged, cho phép bạn commit lại ngay với thông điệp hoặc tệp bổ sung."
      },
      {
        "id": "q3",
        "question": "Điều gì xảy ra với các tệp tin trong Working Directory khi bạn chạy `git reset --soft`?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không bị ảnh hưởng, giữ nguyên 100% nội dung hiện tại",
            "correct": true
          },
          {
            "text": "Bị xóa sạch sẽ không còn dấu vết",
            "correct": false
          },
          {
            "text": "Bị khóa quyền đọc và ghi",
            "correct": false
          },
          {
            "text": "Tự động chuyển thành file nén ZIP",
            "correct": false
          }
        ],
        "explanation": "Reset soft hoàn toàn không chạm vào Working Directory của lập trình viên."
      },
      {
        "id": "q4",
        "question": "Nếu muốn gộp 3 commit gần nhất thành 1 commit duy nhất bằng reset soft, bạn sử dụng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git reset --soft HEAD~3",
            "correct": true
          },
          {
            "text": "git reset --soft HEAD+3",
            "correct": false
          },
          {
            "text": "git squash 3 --soft",
            "correct": false
          },
          {
            "text": "git merge --soft HEAD~3",
            "correct": false
          }
        ],
        "explanation": "`git reset --soft HEAD~3` lùi con trỏ nhánh 3 bước và đưa toàn bộ nội dung của 3 commit đó vào Staging để commit 1 lần."
      },
      {
        "id": "q5",
        "question": "Sau khi chạy lệnh `git reset --soft HEAD~1`, khi gõ `git status` bạn sẽ thấy thông báo thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Các tệp tin hiển thị màu xanh lá cây trong mục \"Changes to be committed\"",
            "correct": true
          },
          {
            "text": "Các tệp tin hiển thị màu đỏ trong mục \"Changes not staged for commit\"",
            "correct": false
          },
          {
            "text": "Thông báo \"nothing to commit, working tree clean\"",
            "correct": false
          },
          {
            "text": "Thông báo lỗi \"fatal: repository is corrupted\"",
            "correct": false
          }
        ],
        "explanation": "Vì cờ `--soft` bảo tồn toàn bộ Staging Area, các thay đổi từ commit bị rút lại vẫn ở trạng thái staged sẵn sàng để commit lại ngay."
      }
    ]
  }
};
export default lesson;
