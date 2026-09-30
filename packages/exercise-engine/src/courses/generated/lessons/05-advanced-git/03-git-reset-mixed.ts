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
      "Sử dụng `git reset` để hủy staged toàn bộ hoặc chọn lọc các tệp tin một cách linh hoạt.",
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
      "git reset <tên-tệp>",
      "git status"
    ]
  },
  "content": "# git reset --mixed\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững cơ chế hoạt động của chế độ mặc định `git reset --mixed` (hoặc `git reset` không truyền cờ).\n- Hiểu rõ trạng thái của HEAD, Staging Area và Working Directory sau khi chạy reset mixed.\n- Sử dụng `git reset` để hủy staged toàn bộ hoặc chọn lọc các tệp tin một cách linh hoạt.\n- So sánh chi tiết sự khác nhau về hành vi giữa reset mixed và reset soft.\n\n---\n\n## 📖 Định nghĩa\n> `git reset --mixed <commit-target>` (hoặc cú pháp ngắn gọn `git reset <commit-target>`) là chế độ hoạt động mặc định của câu lệnh reset trong Git. Khi được gọi, Git sẽ đồng thời thực hiện hai thao tác: dịch chuyển con trỏ HEAD và con trỏ nhánh hiện tại lùi về commit mục tiêu được chỉ định, đồng thời cập nhật lại Staging Area (Index) sao cho khớp hoàn toàn với snapshot của commit đó. Tuy nhiên, nội dung trong thư mục làm việc Working Directory vẫn được bảo toàn nguyên vẹn.\n\n---\n\n## 🤔 Tại sao cần?\nTrong công việc hàng ngày, rất thường xuyên bạn gõ lệnh `git add .` theo thói quen và vô tình đưa hàng chục tệp tin không liên quan vào Staging Area, hoặc bạn commit một loạt thay đổi nhưng sau đó muốn phân chia chúng thành các commit nhỏ gọn gàng hơn. `git reset --mixed` chính là công cụ phân tách tuyệt vời: nó tháo dỡ toàn bộ các thay đổi ra khỏi Staging Area về lại Working Tree dưới dạng unstaged, trao cho bạn quyền chọn lọc lại từng dòng code để chuẩn bị commit.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nTiếp tục với hình ảnh gửi kiện hàng qua bưu điện. Trong trường hợp này, bạn đã đóng gói hàng và dán băng dính niêm phong hộp cẩn thận (Staging Area). Khi bạn nhận ra mình đã đóng nhầm cả tài liệu bí mật của công ty vào trong thùng hàng, bạn quyết định rạch băng dính và dỡ toàn bộ đồ vật trong thùng ra đặt lại trên bàn làm việc của bạn (`git reset --mixed`). Mọi món đồ vẫn còn nguyên vẹn trên bàn, bạn có thể thong thả phân loại lại món nào cần gửi và món nào giữ lại.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế hoạt động của git reset --mixed HEAD~1:\nTrước khi reset:\nCommit History:   C1 ──► C2 ──► C3 (HEAD -> main)\nStaging Area:     Trống\nWorking Tree:     Trống\n\nSau khi git reset --mixed HEAD~1:\nCommit History:   C1 ──► C2 (HEAD -> main)\nStaging Area:     Trống (Unstaged!)\nWorking Tree:     Chứa toàn bộ thay đổi của C3 (Chưa staged - màu đỏ)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Lan thực hiện chỉnh sửa trên 5 tệp tin khác nhau và tiện tay tạo ngay một commit với thông điệp chung chung: \"update various files\". Nhận thấy commit này quá lộn xộn, thiếu tính nguyên tử và vi phạm quy chuẩn chia nhỏ commit của công ty, Lan chạy lệnh: `git reset HEAD~1` (chính là chế độ mặc định mixed). Con trỏ nhánh lùi lại 1 commit, và khi Lan gõ `git status`, cả 5 tệp tin đều xuất hiện dưới màu đỏ trong mục \"Changes not staged for commit\". Từ đây, Lan lần lượt dùng `git add file1` và commit riêng, sau đó `git add file2 file3` và commit riêng rẽ từng phần một cách vô cùng ngăn nắp và rõ ràng.\n\n---\n\n## 💻 Command\n```bash\ngit reset HEAD~1\ngit reset --mixed HEAD~1\ngit reset <tên-tệp>\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reset HEAD~1`: Cú pháp mặc định tương đương với `--mixed`, đưa thay đổi của commit gần nhất về Working Directory.\n- `git reset --mixed <hash>`: Lùi lịch sử về commit chỉ định và đồng bộ lại Staging Area.\n- `git reset <tệp>`: Bỏ staged một tệp tin cụ thể (chức năng tương đương `git restore --staged`).\n- `git status`: Quan sát các tệp tin xuất hiện ở trạng thái màu đỏ chưa staged.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng hốt khi thấy git status đổi từ màu xanh sang màu đỏ**:  Tưởng rằng code bị mất, thực tế code vẫn nằm an toàn trong Working Directory.\n2. **Không nhận biết rằng git reset không cờ chính là git reset --mixed.**: Không nhận biết rằng git reset không cờ chính là git reset --mixed.\n3. **Lạm dụng reset mixed trên các commit đã chia sẻ cho đồng nghiệp trên nhánh chung.**: Lạm dụng reset mixed trên các commit đã chia sẻ cho đồng nghiệp trên nhánh chung.\n\n---\n\n## 🧪 Lab\n1. Tạo 2 tệp mới `a.txt` và `b.txt`, đưa vào staging bằng `git add .` và commit.\n2. Chạy lệnh `git reset HEAD~1` để hoàn tác commit ở chế độ mặc định mixed.\n3. Gõ `git status` và quan sát 2 tệp xuất hiện ở trạng thái Untracked/Modified màu đỏ.\n4. Lần lượt `git add a.txt` và commit riêng, sau đó làm tương tự với `b.txt`.\n\n---\n\n## 💡 Hint\n> Gõ `git reset` không kèm cờ thì Git sẽ luôn luôn mặc định sử dụng chế độ `--mixed`.\n\n---\n\n## ✅ Validation\n- Thực hiện thành công reset mixed để tháo dỡ commit và tổ chức lại các thay đổi.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --mixed.\n\n---\n\n## 🔥 Challenge\nSo sánh sự khác biệt cốt lõi giữa `git reset --soft HEAD~1` và `git reset --mixed HEAD~1`.\n\n---\n\n## 📚 Tổng kết\n- `git reset --mixed` là chế độ mặc định, dịch chuyển HEAD và reset Staging Area.\n- Bảo tồn toàn vẹn Working Directory, đưa các thay đổi về trạng thái unstaged.\n- Rất hữu hiệu để bóc tách một commit lớn thành nhiều commit nhỏ có ý nghĩa.\n",
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
      }
    ]
  }
};
export default lesson;
