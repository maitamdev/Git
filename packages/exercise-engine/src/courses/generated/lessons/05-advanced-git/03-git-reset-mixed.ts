import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-git-reset-mixed",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "03-git-reset-mixed",
    "title": "git reset --mixed",
    "level": "advanced",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "02-git-reset-soft"
    ],
    "objectives": [
      "Nắm vững cơ chế hoạt động của chế độ mặc định `git reset --mixed` (hoặc `git reset` không truyền cờ).",
      "Hiểu rõ trạng thái của HEAD, Staging Area và Working Directory sau khi chạy reset mixed.",
      "Dùng `git reset <commit>` để bỏ stage toàn bộ thay đổi; dùng `git restore --staged <file>` cho một file.",
      "So sánh chi tiết sự khác nhau về hành vi giữa reset mixed và reset soft."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git reset --mixed",
      "reset mixed",
      "default reset",
      "unstaging changes",
      "hoan tac staging"
    ],
    "commands": [
      "git reset HEAD~1",
      "git reset --mixed HEAD~1",
      "git restore --staged <tên-tệp>",
      "git status"
    ]
  },
  "content": "# git reset --mixed\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững cơ chế hoạt động của chế độ mặc định `git reset --mixed` (hoặc `git reset` không truyền cờ).\n- Hiểu rõ trạng thái của HEAD, Staging Area và Working Directory sau khi chạy reset mixed.\n- Sử dụng `git reset` để hủy staged toàn bộ hoặc chọn lọc các tệp tin một cách linh hoạt.\n- So sánh chi tiết sự khác nhau về hành vi giữa reset mixed và reset soft.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git reset --mixed\n- **Nói dễ hiểu**: Lệnh rút lại commit đồng thời xóa sạch Staging Area, đưa toàn bộ thay đổi về trạng thái chưa add trong thư mục làm việc.\n- **Ví dụ**: `git reset --mixed HEAD~1` khi muốn dỡ commit ra để chia nhỏ thành nhiều commit riêng.\n- **Đừng nhầm**: Không xóa file hay mất code; các thay đổi vẫn nằm nguyên trong Working Directory dưới dạng màu đỏ.\n\n### default reset mode\n- **Nói dễ hiểu**: Hành vi ngầm định của Git mỗi khi bạn gõ lệnh `git reset` mà không cung cấp cờ `--soft` hay `--hard`.\n- **Ví dụ**: Gõ `git reset HEAD~1` thì Git sẽ tự động hiểu và chạy như `git reset --mixed HEAD~1`.\n- **Đừng nhầm**: Không tương đương với `--soft`; nếu không gõ cờ, Staging Area sẽ bị làm sạch thay vì giữ nguyên staged.\n\n### unstaged changes\n- **Nói dễ hiểu**: Trạng thái các file có chỉnh sửa trong thư mục làm việc nhưng chưa được đưa vào hàng đợi chuẩn bị commit.\n- **Ví dụ**: Trong `git status`, file hiển thị màu đỏ dưới mục \"Changes not staged for commit\".\n- **Đừng nhầm**: Không phải file mới chưa theo dõi (untracked); đây là file đã có trong Git nhưng đang có sửa đổi mới chưa add.\n\n---\n\n## 📖 Định nghĩa\n`git reset --mixed <commit-target>` (cũng là mặc định khi bỏ cờ chế độ) di chuyển nhánh hiện tại về commit mục tiêu, cập nhật Staging Area theo commit đó và không chủ động sửa nội dung file trong Working Tree. Vì vậy, file đã có ở commit cũ nhưng không có ở mục tiêu thường trở thành untracked; file đã được theo dõi và thay đổi sẽ hiện là modified.\n\n---\n\n## 💡 Tại sao cần\nKhi gõ `git add .` theo thói quen, bạn dễ đưa nhiều file không liên quan vào Staging Area, hoặc bạn commit một loạt thay đổi lớn nhưng sau đó muốn chia nhỏ. Lệnh `git reset --mixed` tháo dỡ các thay đổi ra khỏi Staging về lại Working Tree dưới dạng unstaged để bạn tự do chọn lọc commit từng phần.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn đóng gói đồ đạc vào thùng và dán băng dính niêm phong (Staging Area). Khi nhận ra đã bỏ nhầm tài liệu cơ quan vào thùng, bạn rạch băng dính và dỡ toàn bộ đồ vật trong thùng ra đặt lại trên bàn làm việc (`--mixed`). Đồ vật vẫn còn nguyên trên bàn, bạn thong thả lựa chọn món nào cần gửi và món nào giữ lại.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế hoạt động của git reset --mixed HEAD~1:\nTrước khi reset:\nCommit History:   C1 ──► C2 ──► C3 (HEAD -> main)\nStaging Area:     Trống\nWorking Tree:     Trống\n\nSau khi git reset --mixed HEAD~1:\nCommit History:   C1 ──► C2 (HEAD -> main)\nStaging Area:     Trống (Unstaged!)\nWorking Tree:     Chứa toàn bộ thay đổi của C3 (Chưa staged - màu đỏ)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Lan sửa 5 file khác nhau rồi commit chung với thông điệp: \"update various files\". Thấy commit quá cồng kềnh, Lan chạy `git reset HEAD~1` (chế độ mixed mặc định). Nhánh lùi lại 1 commit, cả 5 file xuất hiện màu đỏ unstaged trong `git status`. Lan lần lượt `git add` và commit riêng từng file theo từng logic rõ ràng, giúp lịch sử dự án trở nên cực kỳ chuyên nghiệp.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit reset HEAD~1\ngit reset --mixed HEAD~1\ngit reset <tên-tệp>\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reset HEAD~1`: Cú pháp mặc định tương đương `--mixed`, đưa thay đổi của commit gần nhất về Working Directory.\n- `git reset --mixed <hash>`: Lùi lịch sử về commit chỉ định và đồng bộ lại Staging Area theo commit đó.\n- `git reset -- <tệp>`: Bỏ stage một tệp cụ thể mà không di chuyển `HEAD` (tương đương `git restore --staged <tệp>`).\n- `git status`: Quan sát các tệp tin xuất hiện ở trạng thái màu đỏ chưa staged.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng hốt khi thấy git status đổi từ màu xanh sang màu đỏ**: Tưởng code bị mất, thực tế code vẫn an toàn trong Working Directory.\n2. **Quên rằng git reset không cờ chính là chế độ --mixed**: Dẫn đến bối rối vì sao các file vừa add bị chuyển sang unstaged.\n3. **Chạy reset trên các commit đã push lên nhánh dùng chung**: Làm sai lệch lịch sử của đồng nghiệp và gây xung đột khi đồng bộ.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác reset --mixed và bóc tách commit trên terminal.\n1. Trong kho thử nghiệm riêng, tạo và commit `notes.txt` với nội dung `ban dau` để có commit nền.\n2. Sửa `notes.txt`, tạo thêm `a.txt` và `b.txt`, rồi stage cả ba file và commit bằng thông điệp `thu nghiem`.\n3. Chạy `git reset --mixed HEAD~1`, rồi `git status`. `notes.txt` hiện modified; `a.txt` và `b.txt` hiện untracked vì commit nền chưa từng chứa chúng.\n4. Stage riêng `notes.txt` và `a.txt`, kiểm tra bằng `git status`, rồi commit. Stage `b.txt` và commit riêng.\n\n---\n\n## 💡 Hint & mẹo\n> Với cú pháp reset nhắm vào commit, nếu không chọn `--soft` hay `--hard`, Git dùng `--mixed`. Dùng dấu `--` trước tên file để chỉ nhắm vào file và không di chuyển nhánh.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Phần thay đổi so với commit mục tiêu không còn staged; file có thể hiện modified hoặc untracked tùy file đó đã có trong commit mục tiêu chưa.\n- Nội dung đang có trong Working Tree vẫn còn sau thao tác mixed reset.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --mixed.\n\n---\n\n## 🚀 Thử thách nâng cao\nSử dụng `git reset <tên-file>` để chỉ rút duy nhất một file nhạy cảm ra khỏi Staging Area mà vẫn giữ lại các file khác đang chuẩn bị commit.\n\n---\n\n## 📝 Tổng kết\n- `git reset --mixed` là chế độ mặc định, dịch chuyển HEAD và reset Staging Area.\n- Bảo tồn toàn vẹn Working Directory, đưa các thay đổi về trạng thái unstaged.\n- Rất hữu hiệu để bóc tách một commit lớn thành nhiều commit nhỏ có ý nghĩa.\n",
  "quiz": {
    "id": "quiz-05-03-git-reset-mixed",
    "title": "Trắc nghiệm: git reset --mixed",
    "questions": [
      {
        "id": "q1",
        "question": "Khi bạn chạy câu lệnh `git reset HEAD~1` mà không truyền bất kỳ cờ tùy chọn nào, Git sẽ chạy ở chế độ nào?",
        "type": "single",
        "options": [
          {
            "text": "Chế độ --mixed mặc định",
            "correct": true
          },
          {
            "text": "Chế độ --soft",
            "correct": false
          },
          {
            "text": "Chế độ --hard",
            "correct": false
          },
          {
            "text": "Chế độ --keep",
            "correct": false
          }
        ],
        "explanation": "`--mixed` là hành vi mặc định của lệnh `git reset` nếu không chỉ định cờ."
      },
      {
        "id": "q2",
        "question": "Trạng thái của mã nguồn sau khi thực thi `git reset --mixed HEAD~1` sẽ hiển thị như thế nào trong `git status`?",
        "type": "single",
        "options": [
          {
            "text": "Mã nguồn nằm trong Working Directory dưới dạng tệp sửa đổi chưa staged (màu đỏ)",
            "correct": true
          },
          {
            "text": "Mã nguồn nằm trong Staging Area sẵn sàng commit (màu xanh)",
            "correct": false
          },
          {
            "text": "Mã nguồn bị xóa hoàn toàn khỏi đĩa cứng",
            "correct": false
          },
          {
            "text": "Mã nguồn tự động biến thành tệp ẩn",
            "correct": false
          }
        ],
        "explanation": "Reset mixed xóa Staging Area nhưng giữ Working Tree, đưa thay đổi về trạng thái unstaged màu đỏ."
      },
      {
        "id": "q3",
        "question": "Trường hợp nào sau đây là ứng dụng xuất sắc nhất của `git reset --mixed`?",
        "type": "single",
        "options": [
          {
            "text": "Khi muốn dỡ bỏ một commit gom quá nhiều việc để chia nhỏ thành các commit riêng lẻ gàng",
            "correct": true
          },
          {
            "text": "Khi muốn xóa vĩnh viễn toàn bộ các tệp tin trong dự án",
            "correct": false
          },
          {
            "text": "Khi muốn xuất bản code lên GitHub",
            "correct": false
          },
          {
            "text": "Khi muốn tải dự án từ máy chủ từ xa về",
            "correct": false
          }
        ],
        "explanation": "Đưa code về Working Tree giúp bạn dễ dàng chọn lọc từng phần để commit thành nhiều mốc lịch sử logic."
      },
      {
        "id": "q4",
        "question": "Sự khác biệt lớn nhất giữa `git reset --soft` và `git reset --mixed` nằm ở thành phần nào?",
        "type": "single",
        "options": [
          {
            "text": "Staging Area: soft giữ nguyên staged (xanh), còn mixed hủy staged (đỏ)",
            "correct": true
          },
          {
            "text": "Working Directory: soft xóa file, mixed giữ file",
            "correct": false
          },
          {
            "text": "Commit history: soft dịch chuyển HEAD, mixed không dịch chuyển HEAD",
            "correct": false
          },
          {
            "text": "Hai lệnh này hoàn toàn giống nhau 100%",
            "correct": false
          }
        ],
        "explanation": "Cả hai đều giữ Working Tree, nhưng `--soft` giữ Staging còn `--mixed` reset luôn cả Staging."
      },
      {
        "id": "q5",
        "question": "Khi bạn lỡ chạy `git add .` và muốn hủy trạng thái staged của toàn bộ các tệp tin mà không làm mất nội dung sửa, lệnh nào phù hợp nhất?",
        "type": "single",
        "options": [
          {
            "text": "git reset (tương đương git reset --mixed HEAD)",
            "correct": true
          },
          {
            "text": "git reset --hard HEAD",
            "correct": false
          },
          {
            "text": "git clean -fd",
            "correct": false
          },
          {
            "text": "git revert HEAD",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git reset` không kèm cờ sẽ chạy `--mixed`, làm sạch Staging Area và giữ nguyên toàn bộ thay đổi trong Working Directory."
      }
    ]
  }
};
export default lesson;
