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
      "Nhận ra thay đổi tracked chưa commit có thể bị bỏ và không được reflog lưu lại.",
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
  "content": "# git reset --hard\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.\n- Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.\n- Biết Git không lưu thay đổi chưa commit khi lệnh ghi đè chúng; không dựa vào reflog để khôi phục phần đó.\n- Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git reset --hard\n- **Nói dễ hiểu**: Chế độ reset cập nhật nhánh, Staging và các tệp được theo dõi về commit đích; chỉnh sửa chưa commit trên các tệp đó sẽ bị bỏ.\n- **Ví dụ**: `git reset --hard HEAD` để xóa sạch toàn bộ các thử nghiệm lỗi và đưa code về y nguyên commit gần nhất.\n- **Đừng nhầm**: Git không lưu bản sao chỉnh sửa bị ghi đè. File untracked không liên quan thường vẫn còn; file đó có thể bị ghi đè nếu cản trở việc cập nhật.\n\n### Lệnh có thể làm mất chỉnh sửa chưa commit\n- **Nói dễ hiểu**: Lệnh có thể ghi đè hoặc xóa dữ liệu được theo dõi trên đĩa. Git không có bản sao của chỉnh sửa chưa commit bị bỏ.\n- **Ví dụ**: `git reset --hard` hay `git clean -fd` là các lệnh nguy hiểm cần cân nhắc kỹ trước khi gõ.\n- **Đừng nhầm**: `--soft` và `--mixed` không cập nhật Working Tree; `--hard` cập nhật các file được theo dõi về snapshot đích.\n\n### Khôi phục file được theo dõi\n- **Nói dễ hiểu**: Thao tác đưa các file được theo dõi về snapshot của commit mục tiêu.\n- **Ví dụ**: Các file bị chỉnh sửa lung tung sẽ tự động quay về bản lưu sạch sẽ của commit trước.\n- **Đừng nhầm**: Lệnh không dọn mọi file untracked. File untracked thường còn, nhưng có thể bị ghi đè hoặc xóa nếu cản đường file trong snapshot đích.\n\n---\n\n## 📖 Định nghĩa\n`git reset --hard <commit-target>` di chuyển nhánh hiện tại về commit mục tiêu, cập nhật Staging Area và đưa các file được Git theo dõi về nội dung của commit đó. Thay đổi staged và unstaged trên các file ấy sẽ bị bỏ. File untracked không liên quan thường vẫn còn; file untracked chắn đường cho một file được khôi phục có thể bị ghi đè hoặc xóa. Reflog có thể giúp tìm lại commit cũ, nhưng không phải bản sao lưu cho sửa đổi chưa commit.\n\n---\n\n## 💡 Tại sao cần\nKhi thử nghiệm một thuật toán hay kiến trúc mới thất bại thảm hại, mã nguồn bị sửa đổi tan hoang và bạn muốn vứt bỏ toàn bộ để quay về trạng thái sạch sẽ trước đó. `git reset --hard` chính là chiếc nút khởi động lại từ đầu, giúp bạn dọn sạch mọi rác rưởi thử nghiệm chỉ trong tích tắc.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn thử nghiệm chế tạo cỗ máy trong phòng thí nghiệm. Thử nghiệm thất bại, dầu mỡ và mảnh vỡ văng tung tóe khắp sàn. Bạn nhấn nút xả nước tự động (`--hard`). Luồng nước áp lực cao quét sạch mọi vết bẩn trên sàn (Working Tree), dọn sạch bàn đóng gói (Staging) và đưa phòng trở về trạng thái tinh tươm như bức ảnh chụp lúc đầu.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế hủy diệt của git reset --hard HEAD~1:\nTrước khi reset:\nCommit History:   C1 ──► C2 ──► C3 (HEAD -> main)\nWorking Tree:     Có tệp sửa đổi dở dang X\n\nSau khi git reset --hard HEAD~1:\nCommit History:   C1 ──► C2 (HEAD -> main)\nStaging Area:     Khớp hoàn toàn với C2!\nWorking Tree:     Các file được theo dõi trở về snapshot C2; chỉnh sửa X bị bỏ\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Hùng dành cả buổi sáng thử nghiệm đổi cơ sở dữ liệu sang MongoDB trên nhánh `feat/db-migration`. Sau 3 commit và nhiều sửa đổi dở dang, Hùng thấy giải pháp không khả thi và muốn bỏ hết để quay lại mốc ban đầu có hash `a1b2c3d`. Hùng gõ `git reset --hard a1b2c3d`. Toàn bộ mã nguồn trên máy quay về sạch sẽ như chưa từng có cuộc thử nghiệm nào diễn ra.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit reset --hard HEAD\ngit reset --hard HEAD~1\ngit reset --hard <commit-hash>\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reset --hard HEAD`: Hủy bỏ sạch sẽ toàn bộ các thay đổi chưa commit trong cả Staging và Working Tree, đưa máy về commit hiện tại.\n- `git reset --hard HEAD~1`: Xóa bỏ commit gần nhất và xóa sạch mọi thay đổi của nó trên đĩa cứng.\n- `git reset --hard <hash>`: Đưa toàn bộ dự án quay trở về mốc commit chỉ định trong quá khứ.\n- `git status`: Xác nhận trạng thái \"working tree clean\" sau khi đã quét sạch sẽ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy reset hard khi còn code dở chưa lưu**: Thay đổi tracked có thể mất; `reflog` không ghi nội dung sửa chưa commit.\n2. **Dùng reset hard để cập nhật nhánh đã chia sẻ mà chưa phối hợp**: Việc di chuyển nhánh có thể làm lịch sử cục bộ lệch khỏi lịch sử nhóm.\n3. **Gõ nhầm số lượng commit cần lùi**: Ví dụ muốn lùi 1 commit nhưng gõ nhầm `HEAD~5`. Hãy đọc lại mục tiêu và xác nhận `git status` trước khi chạy.\n\n---\n\n## 🧪 Lab thực hành\nBài này xóa thay đổi trên file tracked; hãy dùng kho thử nghiệm riêng, không dùng kho dự án đang học.\n1. Tạo `tracked.txt` với nội dung `ban dau`, rồi chạy `git add tracked.txt` và `git commit -m \"base\"`.\n2. Sửa `tracked.txt` thành `ban sua chua commit`; tạo thêm `scratch.txt` nhưng không chạy `git add`.\n3. Chạy `git status` để thấy một file modified và một file untracked.\n4. Chạy `git reset --hard HEAD`, rồi mở hai file: `tracked.txt` trở về `ban dau`, còn `scratch.txt` vẫn còn vì nó không chắn file tracked nào.\n5. Chạy `git status`: chỉ còn `scratch.txt` trong nhóm untracked. Xóa nó thủ công nếu muốn dọn kho thử nghiệm.\n\n---\n\n## 💡 Hint & mẹo\n> Nếu chưa chắc chắn muốn vứt bỏ code, hãy chạy `git stash` để cất giữ một bản sao dự phòng trước khi gõ `git reset --hard`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- File tracked khớp với commit mục tiêu và các thay đổi staged của chúng bị bỏ.\n- File untracked không liên quan còn nguyên; do đó `git status` vẫn liệt kê `scratch.txt`.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --hard.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách sử dụng `git reflog` kết hợp với `git reset --hard <hash>` để phục hồi lại một commit vừa bị lùi nhầm.\n\n---\n\n## 📝 Tổng kết\n- `git reset --hard` đồng bộ hóa cả 3 cây HEAD, Staging và Working Tree về commit đích.\n- Bỏ thay đổi staged và unstaged trên các file được theo dõi; file untracked không liên quan thường còn nguyên.\n- Cực kỳ hữu ích để dọn dẹp các thử nghiệm thất bại nhưng đòi hỏi sự cẩn trọng cao độ.\n",
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
            "text": "Git không lưu bản sao của các chỉnh sửa bị ghi đè; hãy xem chúng là mất nếu chưa sao lưu",
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
        "explanation": "`reset --hard` đặt các tệp được theo dõi về snapshot đích. Git không lưu bản sao của phần chưa commit; tệp không được theo dõi thường vẫn còn, trừ khi cản trở việc cập nhật."
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
            "text": "soft và mixed không cập nhật Working Tree; hard đặt các tệp được theo dõi về snapshot đích",
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
        "explanation": "`--soft` và `--mixed` không cập nhật Working Tree. `--hard` cập nhật các tệp được theo dõi về snapshot đích và có thể ghi đè file không theo dõi nếu chúng cản trở."
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
        "explanation": "Nếu commit còn trong reflog và object chưa bị dọn, bạn có thể tạo ref mới trỏ tới nó. Thời hạn mặc định thường là 90 ngày với ref còn truy cập được và 30 ngày với ref không còn truy cập được; cấu hình có thể đổi."
      }
    ]
  }
};
export default lesson;
