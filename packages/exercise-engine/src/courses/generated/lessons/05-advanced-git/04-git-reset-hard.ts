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
  "content": "# git reset --hard\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.\n- Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.\n- Nhận thức rõ nguy cơ mất vĩnh viễn dữ liệu chưa commit trong Working Directory khi chạy lệnh này.\n- Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard.\n\n---\n\n## 📖 Định nghĩa\n> `git reset --hard <commit-target>` là tùy chọn mạnh mẽ và triệt để nhất của câu lệnh reset trong Git. Khi được thực thi, Git sẽ đồng loạt dịch chuyển con trỏ HEAD và con trỏ nhánh hiện tại về commit mục tiêu, đồng thời ghi đè và làm sạch hoàn toàn cả Staging Area lẫn thư mục làm việc Working Directory sao cho khớp 100% với trạng thái của commit đích. Mọi chỉnh sửa chưa commit trong Working Tree sẽ bị xóa sổ hoàn toàn không để lại dấu vết.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quá trình nghiên cứu và phát triển phần mềm, sẽ có những lúc bạn thử nghiệm một thuật toán hoặc một kiến trúc mới nhưng hoàn toàn thất bại, mã nguồn bị sửa đổi tan hoang và bạn muốn vứt bỏ toàn bộ những thử nghiệm tồi tệ đó để quay về trạng thái sạch sẽ hoàn hảo của một commit trước đó. `git reset --hard` chính là chiếc nút \"Khởi động lại từ đầu\" giúp bạn quét sạch mọi rác rưởi thử nghiệm chỉ trong một phần nghìn giây.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang thử nghiệm chế tạo một cỗ máy trong phòng thí nghiệm. Thử nghiệm thất bại thảm hại, các mảnh vỡ và dầu mỡ văng tung tóe khắp sàn nhà và bàn làm việc. Bạn nhấn nút \"Dọn sạch phòng thí nghiệm tự động\" (`git reset --hard`). Ngay lập tức, một luồng nước áp lực cao quét sạch mọi mảnh vỡ và vết bẩn trên sàn (Working Tree), dọn sạch bàn đóng gói (Staging) và đưa phòng thí nghiệm trở về trạng thái tinh tươm đúng như lúc bạn chụp bức ảnh kỷ niệm trước khi bắt đầu thử nghiệm.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế hủy diệt của git reset --hard HEAD~1:\nTrước khi reset:\nCommit History:   C1 ──► C2 ──► C3 (HEAD -> main)\nWorking Tree:     Có tệp sửa đổi dở dang X\n\nSau khi git reset --hard HEAD~1:\nCommit History:   C1 ──► C2 (HEAD -> main)\nStaging Area:     Khớp hoàn toàn với C2!\nWorking Tree:     Khớp hoàn toàn với C2! (Tệp sửa đổi X bị XÓA VĨNH VIỄN!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Hùng dành cả buổi sáng để thử nghiệm chuyển đổi cơ sở dữ liệu sang MongoDB trên nhánh `feat/db-migration`. Sau 3 commit và nhiều chỉnh sửa dở dang, Hùng nhận thấy giải pháp này không khả thi và muốn quay về mốc ban đầu của nhánh. Hùng kiểm tra lịch sử, xác định mã hash của commit ban đầu là `a1b2c3d` và chạy lệnh: `git reset --hard a1b2c3d`. Ngay lập tức, console thông báo \"HEAD is now at a1b2c3d initial commit\". Toàn bộ mã nguồn trên máy Hùng quay về sạch sẽ như chưa từng có cuộc thử nghiệm nào diễn ra.\n\n---\n\n## 💻 Command\n```bash\ngit reset --hard HEAD\ngit reset --hard HEAD~1\ngit reset --hard <commit-hash>\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reset --hard HEAD`: Hủy bỏ sạch sẽ toàn bộ các thay đổi chưa commit trong cả Staging và Working Tree, đưa máy về commit hiện tại.\n- `git reset --hard HEAD~1`: Xóa bỏ commit gần nhất và xóa sạch mọi thay đổi của nó trên đĩa cứng.\n- `git reset --hard <hash>`: Đưa toàn bộ dự án quay trở về mốc commit chỉ định trong quá khứ.\n- `git status`: Xác nhận trạng thái \"working tree clean\" sau khi đã quét sạch sẽ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy git reset --hard khi đang có công việc dở dang chưa commit**:  Các thay đổi chưa commit sẽ biến mất vĩnh viễn không thể khôi phục bằng reflog.\n2. **Sử dụng reset hard trên nhánh dùng chung gây mất dữ liệu của đồng nghiệp.**: Sử dụng reset hard trên nhánh dùng chung gây mất dữ liệu của đồng nghiệp.\n3. **Gõ nhầm số lượng commit cần lùi (ví dụ gõ HEAD~5 thay vì HEAD~1) làm mất nhiều công sức lập trình.**: Gõ nhầm số lượng commit cần lùi (ví dụ gõ HEAD~5 thay vì HEAD~1) làm mất nhiều công sức lập trình.\n\n---\n\n## 🧪 Lab\n1. Tạo một tệp tin rác `temp.txt` và sửa lung tung nội dung một vài tệp có sẵn.\n2. Chạy `git status` để thấy dự án đang bừa bộn.\n3. Chạy lệnh `git reset --hard HEAD` và quan sát kết quả.\n4. Chạy lại `git status` để xác nhận thông báo \"nothing to commit, working tree clean\".\n\n---\n\n## 💡 Hint\n> Nếu không chắc chắn, hãy gõ `git stash` để cất mã nguồn dự phòng trước khi chạy `git reset --hard`.\n\n---\n\n## ✅ Validation\n- Hiểu rõ rủi ro và thực thi thành thạo lệnh git reset --hard để dọn sạch môi trường làm việc.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --hard.\n\n---\n\n## 🔥 Challenge\nNếu bạn lỡ tay chạy `git reset --hard HEAD~1` và làm mất một commit quan trọng, công cụ nào trong Git có thể giúp bạn cứu lại?\n\n---\n\n## 📚 Tổng kết\n- `git reset --hard` đồng bộ hóa cả 3 cây HEAD, Staging và Working Tree về commit đích.\n- Xóa sạch mọi thay đổi chưa commit trong Working Directory không để lại dấu vết.\n- Cực kỳ hữu ích để dọn dẹp các thử nghiệm thất bại nhưng đòi hỏi sự cẩn trọng cao độ.\n",
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
      }
    ]
  }
};
export default lesson;
