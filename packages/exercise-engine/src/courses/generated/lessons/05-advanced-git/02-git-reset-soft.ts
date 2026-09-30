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
  "content": "# git reset --soft\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất hoạt động của cờ `--soft` trong câu lệnh `git reset`.\n- Biết chính xác trạng thái của HEAD, Staging Area và Working Directory sau khi chạy `git reset --soft`.\n- Ứng dụng `git reset --soft` để gộp nhiều commit nhỏ hoặc viết lại commit message một cách linh hoạt.\n- Phân biệt sự khác nhau giữa reset soft và các chế độ mixed hay hard.\n\n---\n\n## 📖 Định nghĩa\n> `git reset --soft <commit-target>` là chế độ hoàn tác nhẹ nhàng và bảo tồn dữ liệu tối đa nhất của lệnh reset trong Git. Khi thực thi câu lệnh này, Git chỉ dịch chuyển duy nhất con trỏ HEAD và con trỏ nhánh hiện tại lùi về commit mục tiêu được chỉ định, trong khi hoàn toàn giữ nguyên vẹn 100% nội dung của cả Staging Area (Index) và Working Directory. Tất cả những thay đổi thuộc các commit bị lùi lại sẽ ngay lập tức xuất hiện ở trạng thái đã được staged sẵn sàng.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quá trình lập trình, rất nhiều khi bạn lỡ tạo một commit với thông điệp chưa chuẩn, hoặc bạn trót ấn commit quá sớm trong khi còn thiếu một số tệp tin quan trọng. `git reset --soft HEAD~1` là chiếc phao cứu sinh hoàn hảo: nó rút lại commit vừa tạo ngay tức khắc mà không làm mất một dòng code nào, đưa toàn bộ mã nguồn trở lại Staging Area để bạn có thể tự do thêm bớt tệp tin hoặc viết lại thông điệp commit một cách hoàn chỉnh nhất.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn chuẩn bị gửi một gói bưu phẩm qua bưu điện. Bạn đã đóng thùng các món hàng (Working Tree), dán băng dính niêm phong và dán phiếu gửi hàng (Staging Area), đồng thời bưu tá đã đóng dấu xác nhận gửi đi (Commit). Khi bạn phát hiện ra quên bỏ chiếc thiệp chúc mừng vào trong hộp, bạn yêu cầu bưu tá hủy dấu xác nhận vừa đóng (`git reset --soft`). Chiếc hộp vẫn còn nguyên ở đó với đầy đủ hàng hóa đã niêm phong sẵn, bạn chỉ việc dán thêm thiệp rồi bảo bưu tá đóng dấu lại.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế hoạt động của git reset --soft HEAD~1:\nTrước khi reset:\nCommit History:   C1 ──► C2 ──► C3 (HEAD -> main)\nStaging Area:     Trống sạch sẽ\nWorking Tree:     Trống sạch sẽ\n\nSau khi git reset --soft HEAD~1:\nCommit History:   C1 ──► C2 (HEAD -> main)\nStaging Area:     Chứa toàn bộ thay đổi của C3 (Staged!)\nWorking Tree:     Không đổi\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Quang vừa gõ câu lệnh `git commit -m \"feat: user profile\"` sau khi hoàn thành giao diện người dùng nhưng chợt nhận ra mình quên chưa cập nhật tệp tài liệu README.md và commit message bị sai chính tả ngớ ngẩn. Thay vì tạo thêm một commit vá víu rác rưởi làm xấu cây lịch sử dự án, Quang gõ ngay câu lệnh cứu cánh: `git reset --soft HEAD~1`. Con trỏ nhánh lập tức lùi lại 1 commit, toàn bộ các tệp tin của tính năng user profile vẫn nằm nguyên vẹn trong Staging Area dưới dạng màu xanh lá cây khi kiểm tra `git status`. Quang sửa tệp README.md, gõ `git add README.md` và thực hiện một commit duy nhất hoàn hảo trọn vẹn mọi yêu cầu.\n\n---\n\n## 💻 Command\n```bash\ngit reset --soft HEAD~1\ngit reset --soft <commit-hash>\ngit status\ngit commit -m \"<thông-điệp-mới>\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reset --soft HEAD~1`: Rút lại commit gần nhất, toàn bộ thay đổi chuyển về trạng thái staged sẵn sàng commit lại.\n- `git reset --soft <hash>`: Lùi nhánh về commit chỉ định trong quá khứ, toàn bộ thay đổi trung gian được gộp vào Staging.\n- `git status`: Kiểm tra lại danh sách các tệp tin đang nằm trong Staging Area sau khi reset.\n- `git commit -m`: Tạo commit mới thay thế hoàn hảo với đầy đủ mã nguồn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng reset --soft làm mất mã nguồn**:  Chế độ soft bảo tồn toàn bộ mã nguồn 100%, không mất dữ liệu.\n2. **Chạy reset --soft trên nhánh chung đã push lên server từ xa mà không có kế hoạch xử lý xung đột.**: Chạy reset --soft trên nhánh chung đã push lên server từ xa mà không có kế hoạch xử lý xung đột.\n3. **Quên gõ cờ --soft dẫn đến Git mặc định chạy chế độ --mixed làm văng code ra khỏi Staging Area.**: Quên gõ cờ --soft dẫn đến Git mặc định chạy chế độ --mixed làm văng code ra khỏi Staging Area.\n\n---\n\n## 🧪 Lab\n1. Tạo một commit thử nghiệm mới với thông điệp bất kỳ.\n2. Chạy lệnh `git reset --soft HEAD~1` để hoàn tác commit vừa tạo.\n3. Chạy `git status` và quan sát các tệp tin vẫn đang ở trạng thái staged màu xanh lá.\n4. Thực hiện một commit mới hoàn thiện với thông điệp chuẩn mực.\n\n---\n\n## 💡 Hint\n> Dùng `git reset --soft HEAD~1` khi bạn muốn viết lại commit message hoặc gộp commit vừa tạo.\n\n---\n\n## ✅ Validation\n- Rút lại commit thành công và bảo toàn 100% tệp tin trong Staging Area với cờ --soft.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --soft.\n\n---\n\n## 🔥 Challenge\nLàm thế nào để sử dụng `git reset --soft` gộp 5 commit vụn vặt gần nhất thành một commit duy nhất?\n\n---\n\n## 📚 Tổng kết\n- `git reset --soft` chỉ dịch chuyển HEAD, bảo toàn trọn vẹn Staging Area và Working Directory.\n- Thay đổi từ commit bị rút lại sẽ nằm ở trạng thái staged sẵn sàng cho commit mới.\n- Là công cụ tuyệt vời để sửa thông điệp commit hoặc bổ sung tệp còn thiếu mà không gây rác lịch sử.\n",
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
      }
    ]
  }
};
export default lesson;
