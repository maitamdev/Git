import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-reset-hard",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "04-git-reset-hard",
    "title": "git reset --hard",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "03-git-reset-mixed"
    ],
    "objectives": [
      "Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.",
      "Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.",
      "Nhận thức rõ nguy cơ mất vĩnh viễn dữ liệu chưa commit trong Working Directory khi chạy lệnh này.",
      "Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git reset --hard",
      "reset hard",
      "xoa commit",
      "nguy hiem git",
      "huy bo thay doi",
      "destructive command"
    ],
    "commands": [
      "git reset --hard HEAD",
      "git reset --hard HEAD~1",
      "git reset --hard <commit-hash>",
      "git status"
    ]
  },
  "content": "# git reset --hard\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.\n- Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.\n- Nhận thức rõ nguy cơ mất vĩnh viễn dữ liệu chưa commit trong Working Directory khi chạy lệnh này.\n- Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git reset --hard\n- **Nói dễ hiểu**: Chế độ reset triệt để nhất, dịch chuyển con trỏ nhánh và xóa sạch mọi thay đổi trong cả Staging lẫn thư mục làm việc.\n- **Ví dụ**: `git reset --hard HEAD` để xóa sạch toàn bộ các thử nghiệm lỗi và đưa code về y nguyên commit gần nhất.\n- **Đừng nhầm**: Mang tính hủy diệt; các file sửa dở dang chưa từng commit sẽ bị xóa vĩnh viễn không cứu lại được.\n\n### destructive command\n- **Nói dễ hiểu**: Lệnh có khả năng ghi đè hoặc xóa bỏ dữ liệu thực tế trên đĩa cứng mà không thể hoàn tác thông thường.\n- **Ví dụ**: `git reset --hard` hay `git clean -fd` là các lệnh nguy hiểm cần cân nhắc kỹ trước khi gõ.\n- **Đừng nhầm**: Khác với `--soft` hay `--mixed` vốn bảo toàn 100% mã nguồn trong thư mục làm việc.\n\n### working tree wipe\n- **Nói dễ hiểu**: Thao tác làm sạch toàn bộ Working Directory sao cho khớp chính xác với snapshot của commit mục tiêu.\n- **Ví dụ**: Các file bị chỉnh sửa lung tung sẽ tự động quay về bản lưu sạch sẽ của commit trước.\n- **Đừng nhầm**: Git chỉ khôi phục được file đã từng commit; file mới tạo chưa add có thể bị bỏ qua hoặc mất nếu kết hợp tùy chọn xóa.\n\n---\n\n## 📖 Định nghĩa\n`git reset --hard <commit-target>` là tùy chọn mạnh mẽ và triệt để nhất của lệnh reset trong Git. Khi thực thi, Git dịch chuyển con trỏ HEAD và nhánh hiện tại về commit đích, đồng thời ghi đè và làm sạch cả Staging Area lẫn Working Directory khớp 100% với commit đó. Mọi thay đổi chưa commit sẽ bị xóa sạch hoàn toàn.\n\n---\n\n## 💡 Tại sao cần\nKhi thử nghiệm một thuật toán hay kiến trúc mới thất bại thảm hại, mã nguồn bị sửa đổi tan hoang và bạn muốn vứt bỏ toàn bộ để quay về trạng thái sạch sẽ trước đó. `git reset --hard` chính là chiếc nút khởi động lại từ đầu, giúp bạn dọn sạch mọi rác rưởi thử nghiệm chỉ trong tích tắc.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn thử nghiệm chế tạo cỗ máy trong phòng thí nghiệm. Thử nghiệm thất bại, dầu mỡ và mảnh vỡ văng tung tóe khắp sàn. Bạn nhấn nút xả nước tự động (`--hard`). Luồng nước áp lực cao quét sạch mọi vết bẩn trên sàn (Working Tree), dọn sạch bàn đóng gói (Staging) và đưa phòng trở về trạng thái tinh tươm như bức ảnh chụp lúc đầu.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế hủy diệt của git reset --hard HEAD~1:\nTrước khi reset:\nCommit History:   C1 ──► C2 ──► C3 (HEAD -> main)\nWorking Tree:     Có tệp sửa đổi dở dang X\n\nSau khi git reset --hard HEAD~1:\nCommit History:   C1 ──► C2 (HEAD -> main)\nStaging Area:     Khớp hoàn toàn với C2!\nWorking Tree:     Khớp hoàn toàn với C2! (Tệp sửa đổi X bị XÓA VĨNH VIỄN!)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Hùng dành cả buổi sáng thử nghiệm đổi cơ sở dữ liệu sang MongoDB trên nhánh `feat/db-migration`. Sau 3 commit và nhiều sửa đổi dở dang, Hùng thấy giải pháp không khả thi và muốn bỏ hết để quay lại mốc ban đầu có hash `a1b2c3d`. Hùng gõ `git reset --hard a1b2c3d`. Toàn bộ mã nguồn trên máy quay về sạch sẽ như chưa từng có cuộc thử nghiệm nào diễn ra.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit reset --hard HEAD\ngit reset --hard HEAD~1\ngit reset --hard <commit-hash>\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reset --hard HEAD`: Hủy bỏ sạch sẽ toàn bộ các thay đổi chưa commit trong cả Staging và Working Tree, đưa máy về commit hiện tại.\n- `git reset --hard HEAD~1`: Xóa bỏ commit gần nhất và xóa sạch mọi thay đổi của nó trên đĩa cứng.\n- `git reset --hard <hash>`: Đưa toàn bộ dự án quay trở về mốc commit chỉ định trong quá khứ.\n- `git status`: Xác nhận trạng thái \"working tree clean\" sau khi đã quét sạch sẽ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy reset hard khi đang có code dở dang chưa commit**: Dẫn đến việc mất vĩnh viễn các dòng code vừa viết mà không thể tìm lại qua reflog.\n2. **Dùng reset hard trên nhánh dùng chung**: Làm biến mất lịch sử chung và khiến các thành viên khác trong nhóm gặp lỗi đồng bộ nghiêm trọng.\n3. **Gõ nhầm số lượng commit cần lùi**: Ví dụ muốn lùi 1 commit nhưng gõ nhầm `HEAD~5` làm mất nhiều công sức lập trình.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác reset --hard để làm sạch môi trường trên terminal.\n1. Tạo một tệp tin nháp `temp.txt` và sửa nội dung một vài tệp có sẵn.\n2. Chạy `git status` để thấy dự án đang có các thay đổi chưa lưu.\n3. Chạy lệnh `git reset --hard HEAD` và quan sát console thông báo.\n4. Chạy lại `git status` để xác nhận thông báo \"nothing to commit, working tree clean\".\n\n---\n\n## 💡 Hint & mẹo\n> Nếu chưa chắc chắn muốn vứt bỏ code, hãy chạy `git stash` để cất giữ một bản sao dự phòng trước khi gõ `git reset --hard`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Trạng thái kho lưu trữ trở về sạch sẽ hoàn toàn khớp với commit mục tiêu.\n- Lệnh `git status` báo `working tree clean`.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --hard.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách sử dụng `git reflog` kết hợp với `git reset --hard <hash>` để phục hồi lại một commit vừa bị lùi nhầm.\n\n---\n\n## 📝 Tổng kết\n- `git reset --hard` đồng bộ hóa cả 3 cây HEAD, Staging và Working Tree về commit đích.\n- Xóa sạch mọi thay đổi chưa commit trong Working Directory không để lại dấu vết.\n- Cực kỳ hữu ích để dọn dẹp các thử nghiệm thất bại nhưng đòi hỏi sự cẩn trọng cao độ.\n",
  "quiz": {
    "id": "quiz-05-04-git-reset-hard",
    "title": "Trắc nghiệm: git reset --hard",
    "questions": [
      {
        "id": "q1",
        "question": "Điều gì sẽ xảy ra với các tệp tin đang sửa đổi dở dang chưa từng commit khi bạn chạy `git reset --hard`?",
        "type": "single",
        "options": [
          {
            "text": "Chúng bị ghi đè và xóa sổ vĩnh viễn, hoàn toàn không thể khôi phục lại",
            "correct": true
          },
          {
            "text": "Chúng được tự động lưu vào thùng rác Recycle Bin của hệ điều hành",
            "correct": false
          },
          {
            "text": "Chúng được chuyển thành file nén ZIP trong thư mục gốc",
            "correct": false
          },
          {
            "text": "Chúng tự động được gửi lên máy chủ GitHub",
            "correct": false
          }
        ],
        "explanation": "Git chỉ bảo vệ các dữ liệu đã từng được commit; những thay đổi chưa commit sẽ bị reset hard ghi đè vĩnh viễn."
      },
      {
        "id": "q2",
        "question": "Lệnh nào sau đây giúp bạn hủy bỏ toàn bộ chỉnh sửa chưa commit và đưa Working Tree về trạng thái sạch sẽ của HEAD?",
        "type": "single",
        "options": [
          {
            "text": "git reset --hard HEAD",
            "correct": true
          },
          {
            "text": "git reset --soft HEAD",
            "correct": false
          },
          {
            "text": "git clean --soft",
            "correct": false
          },
          {
            "text": "git revert HEAD",
            "correct": false
          }
        ],
        "explanation": "`git reset --hard HEAD` khôi phục cả Staging và Working Tree về trạng thái y hệt như snapshot của commit HEAD hiện tại."
      },
      {
        "id": "q3",
        "question": "Trước khi chạy một lệnh nguy hiểm như `git reset --hard`, hành động an toàn nhất được khuyến nghị là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo một nhánh dự phòng tạm thời hoặc lưu thay đổi vào `git stash` để đề phòng",
            "correct": true
          },
          {
            "text": "Tắt phần mềm diệt virus trên máy tính",
            "correct": false
          },
          {
            "text": "Khởi động lại hệ điều hành",
            "correct": false
          },
          {
            "text": "Rút dây mạng Internet ra khỏi máy",
            "correct": false
          }
        ],
        "explanation": "Luôn tạo điểm tựa an toàn bằng `git stash` hoặc nhánh tạm thời trước khi thực hiện các thao tác mang tính hủy diệt."
      },
      {
        "id": "q4",
        "question": "So sánh mức độ ảnh hưởng của 3 cờ trong `git reset`: soft, mixed, và hard đối với Working Directory:",
        "type": "single",
        "options": [
          {
            "text": "soft và mixed giữ nguyên Working Directory, còn hard ghi đè và xóa sạch Working Directory",
            "correct": true
          },
          {
            "text": "Cả 3 cờ đều xóa sạch Working Directory như nhau",
            "correct": false
          },
          {
            "text": "soft xóa sạch, còn mixed và hard giữ nguyên",
            "correct": false
          },
          {
            "text": "Không có cờ nào chạm vào Working Directory",
            "correct": false
          }
        ],
        "explanation": "Chỉ có `--hard` là ghi đè lên Working Directory, hai chế độ `--soft` và `--mixed` hoàn toàn bảo tồn Working Tree."
      },
      {
        "id": "q5",
        "question": "Nếu lỡ chạy `git reset --hard HEAD~1` và mất một commit vừa tạo, công cụ nào của Git có thể cứu bạn tìm lại commit đó?",
        "type": "single",
        "options": [
          {
            "text": "git reflog (nhật ký tham chiếu lưu lại lịch sử di chuyển của HEAD)",
            "correct": true
          },
          {
            "text": "Thùng rác Recycle Bin của hệ điều hành",
            "correct": false
          },
          {
            "text": "Lệnh git restore --all",
            "correct": false
          },
          {
            "text": "Không thể cứu được vì reset hard xóa vĩnh viễn khỏi ổ cứng",
            "correct": false
          }
        ],
        "explanation": "Đối với commit đã từng được lưu, `git reflog` vẫn lưu vết SHA hash trong ít nhất 30-90 ngày, giúp bạn khôi phục lại dễ dàng."
      }
    ]
  }
};
export default lesson;
