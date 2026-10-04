import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-delete-rename-branch",
  "moduleId": "03-branching",
  "metadata": {
    "id": "13-delete-rename-branch",
    "title": "Xóa và đổi tên nhánh an toàn",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-git-branch"
    ],
    "objectives": [
      "Đổi tên nhánh bằng `git branch -m`.",
      "Giải thích điều kiện để xóa an toàn bằng `git branch -d`.",
      "Nhận biết vì sao không nên bỏ qua kiểm tra an toàn của `-d`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "delete branch",
      "rename branch",
      "git branch -d",
      "git branch -m",
      "don dep nhanh"
    ],
    "commands": [
      "git branch -m <tên-cũ> <tên-mới>",
      "git branch -d <tên-nhánh>",
      "git branch"
    ]
  },
  "content": "# Đổi tên và xóa nhánh an toàn\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo `git branch -m` để đổi tên nhánh chuẩn chỉ theo quy ước kỹ thuật.\n- Hiểu rõ cơ chế bảo vệ của lệnh xóa nhánh an toàn `git branch -d`.\n- Phân biệt sự khác biệt sinh tử giữa xóa an toàn `-d` và xóa cưỡng chế `-D`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### `git branch -m` — đổi tên nhánh\n- **Nói dễ hiểu:** Thao tác đổi tên con trỏ định danh của nhánh mà không làm suy chuyển hay biến đổi bất kỳ commit nào trong lịch sử.\n- **Ví dụ:** `git branch -m feature-cart feature-shopping-cart` đổi tên nhánh cũ thành tên mới chuẩn chỉ hơn.\n- **Đừng nhầm:** Lệnh chỉ đổi tên nhánh cục bộ trên máy bạn; không tự động đổi tên nhánh trên remote GitHub.\n\n### `git branch -d` — xóa nhánh có kiểm tra\n- **Nói dễ hiểu:** Lệnh xóa nhánh thông minh có kiểm tra an toàn: Git chỉ đồng ý xóa khi toàn bộ commit của nhánh đó đã được gộp vào nhánh khác.\n- **Ví dụ:** Sau khi tính năng thanh toán đã merge vào `main`, bạn gõ `git branch -d feature-payment` để dọn dẹp.\n- **Đừng nhầm:** Nếu nhánh vẫn còn commit mồ côi chưa được merge, Git sẽ lập tức từ chối xóa để bảo vệ công sức của bạn.\n\n### `git branch -D` — xóa cưỡng chế\n- **Nói dễ hiểu:** Lệnh xóa đao phủ (tương đương với `--delete --force`) ép buộc xóa nhánh ngay lập tức bất chấp code đã merge hay chưa.\n- **Ví dụ:** Bạn thử nghiệm một ý tưởng tồi và muốn vứt bỏ hoàn toàn nhánh đó mà không cần gộp vào đâu.\n- **Đừng nhầm:** Cực kỳ nguy hiểm! Chỉ sử dụng khi bạn chắc chắn 100% muốn khai tử nhánh đó và không còn cần đến bất kỳ dòng code nào trên đó.\n\n---\n\n## 📖 Định nghĩa\nQuản lý vòng đời nhánh bao gồm hai thao tác sống còn: đổi tên nhánh bằng `git branch -m` để phản ánh đúng mục tiêu phát triển, và xóa dọn dẹp các nhánh đã hoàn thành sứ mệnh. Lệnh `git branch -d` thực hiện xóa nhánh an toàn có kiểm tra nghiêm ngặt (chỉ cho phép xóa khi code đã được merge), trong khi cờ viết hoa `-D` là lệnh xóa cưỡng chế dứt khoát không kiểm tra.\n\n---\n\n## 🤔 Tại sao cần?\nSau mỗi chu kỳ phát triển tính năng (Sprint), hàng chục nhánh tạm bợ sẽ mọc lên như nấm trong kho mã nguồn của bạn. Nếu không dọn dẹp thường xuyên, danh sách nhánh sẽ phình to gây hoa mắt, nhầm lẫn và tiềm ẩn rủi ro checkout nhầm code cũ. Đồng thời, cơ chế khóa an toàn của `-d` bảo vệ bạn khỏi thảm họa lỡ tay xóa mất những nhánh chứa công sức nhiều ngày chưa kịp gộp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung mỗi nhánh như một chiếc nhãn dán Post-it dán trên bìa hồ sơ. Đổi tên (`-m`) là bạn bóc nhãn cũ viết tên mới dán đè lên. Khi hồ sơ đã được số hóa lưu trữ vào kho chung (đã merge), bạn bóc nhãn Post-it vứt vào sọt rác (`-d`) để bàn làm việc gọn gàng. Nhưng nếu hồ sơ chưa lưu, sọt rác sẽ bật khóa báo động ngăn bạn vứt đi!\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ BẢO VỆ CỦA LỆNH XÓA NHÁNH GIT BRANCH -D:\n\nTình huống 1: Nhánh CHƯA merge vào main\n  (C1) ──► (C2: main)\n             \\\n              ──► (C3: feature)\n  Chạy `git branch -d feature` ──► ❌ TỪ CHỐI! Báo lỗi: The branch is not fully merged!\n\nTình huống 2: Nhánh ĐÃ merge vào main\n  (C1) ──► (C2) ──► (C3: main, feature)\n  Chạy `git branch -d feature` ──► ✅ THÀNH CÔNG! Đã gỡ nhãn an toàn, commit C3 vẫn còn!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn khởi tạo nhánh tạm là `temp-fix`, sau khi xác định rõ nguyên nhân bạn đổi tên chuẩn mực thành `bugfix/login-oauth`. Sau khi nhánh này được Tech Lead merge vào `main`, bạn chuyển về `main` và gõ `git branch -d bugfix/login-oauth`. Nhánh phụ được dọn sạch sẽ, giữ cho danh bạ repo của bạn luôn tinh gọn.\n\n---\n\n## 💻 Command\n```bash\ngit branch -m <tên-cũ> <tên-mới>\ngit branch -d <tên-nhánh>\ngit branch -D <tên-nhánh>\ngit branch\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch -m <tên-mới>`: Nếu chỉ truyền một tham số, Git sẽ đổi tên của chính nhánh hiện tại mà bạn đang đứng.\n- `git branch -m <cũ> <mới>`: Đổi tên nhánh bất kỳ trong kho lưu trữ từ xa mà không cần phải chuyển sang nhánh đó.\n- `git branch -d <tên-nhánh>`: Xóa an toàn nhánh đã được hợp nhất thành công.\n- Lưu ý sống còn: Bạn không thể tự xóa nhánh mà bạn đang đứng chân lên; hãy switch sang nhánh khác trước khi xóa!\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đứng ở chính nhánh đó để gõ lệnh xóa**: Git sẽ lập tức chặn lại và báo lỗi \"Cannot delete branch currently checked out\".\n2. **Thấy `-d` từ chối là vội vàng gõ ngay `-D`**: Thói quen tai hại này xóa sổ vĩnh viễn nhiều ngày công sức code của bạn khi chưa kịp merge.\n3. **Nghĩ xóa nhánh là xóa mất commit**: Khi nhánh đã merge vào `main`, việc xóa nhánh chỉ là gỡ đi con trỏ nhãn; toàn bộ commit vẫn nằm an toàn trong lịch sử của `main`.\n\n---\n\n## 🧪 Lab\n1. Chạy `git branch temp-feature` để cắm một con trỏ nhánh mới.\n2. Đổi tên nhánh: `git branch -m temp-feature feature-profile`, kiểm tra bằng `git branch`.\n3. Chuyển sang nhánh đó: `git switch feature-profile`, tạo file `feature-profile.txt`, add và commit.\n4. Quay về `git switch main`. Thử xóa: `git branch -d feature-profile` và quan sát cảnh báo từ chối của Git.\n5. Tiến hành gộp nhánh: `git merge feature-profile`.\n6. Giờ đây gõ lại: `git branch -d feature-profile` và chứng kiến nhánh được xóa thành công rực rỡ!\n\n---\n\n## 💡 Hint\n> Luôn đứng ở nhánh `main` trước khi tiến hành dọn dẹp xóa các nhánh tính năng đã hoàn thành!\n\n---\n\n## ✅ Validation\n- Nhánh đổi tên thành công từ `temp-feature` sang `feature-profile`.\n- Lệnh xóa trước khi merge bị Git từ chối chuẩn xác theo cơ chế an toàn.\n- Lệnh xóa sau khi merge diễn ra suôn sẻ và file mã nguồn vẫn nằm nguyên vẹn trên `main`.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để nắm vững quy tắc đổi tên và các cấp độ bảo vệ khi xóa nhánh trong Git.\n\n---\n\n## 🔥 Challenge\nGiả sử bạn lỡ tay dùng `git branch -D` xóa mất một nhánh chứa tính năng quan trọng chưa kịp merge. Làm thế nào để giải cứu các commit của nhánh đó quay trở lại cõi sống? (Gợi ý: Tìm lại dấu vết trong `git reflog`).\n\n---\n\n## 📚 Tổng kết\n- `git branch -m` đổi tên nhánh linh hoạt mà không làm ảnh hưởng tới lịch sử snapshot.\n- `git branch -d` là tấm khiên an toàn bảo vệ công sức lập trình viên khỏi việc xóa nhầm.\n- Duy trì thói quen xóa các nhánh tính năng đã merge để giữ kho mã nguồn luôn ngăn nắp, tinh tươm.\n",
  "quiz": {
    "id": "quiz-03-13-delete-rename-branch",
    "title": "Trắc nghiệm: Đổi tên và xóa nhánh an toàn",
    "questions": [
      {
        "id": "q1",
        "question": "Bạn đang đứng trên `main` và muốn đổi tên nhánh `temp` thành `feature-cart`. Dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git branch -m temp feature-cart",
            "correct": true
          },
          {
            "text": "git branch --delete temp feature-cart",
            "correct": false
          },
          {
            "text": "git switch --rename temp feature-cart",
            "correct": false
          },
          {
            "text": "git merge -m temp feature-cart",
            "correct": false
          }
        ],
        "explanation": "Cú pháp này đổi tên nhánh được chỉ định mà không cần chuyển sang nhánh đó."
      },
      {
        "id": "q2",
        "question": "Khi bạn xóa nhánh đã merge bằng `git branch -d`, điều gì bị gỡ?",
        "type": "single",
        "options": [
          {
            "text": "Tên nhánh và con trỏ phụ; commit đã được nhập vẫn nằm trong nhánh nhận",
            "correct": true
          },
          {
            "text": "Tất cả các tệp có trong commit",
            "correct": false
          },
          {
            "text": "Nhánh `main` cùng repository",
            "correct": false
          },
          {
            "text": "Tài khoản GitHub của tác giả",
            "correct": false
          }
        ],
        "explanation": "Xóa nhánh đã merge gỡ nhãn phụ; nội dung commit vẫn được giữ bởi nhánh nhận."
      },
      {
        "id": "q3",
        "question": "Vì sao `git branch -d feature` có thể từ chối xóa nhánh?",
        "type": "single",
        "options": [
          {
            "text": "Git phát hiện có commit trên nhánh đó chưa được merge vào nơi phù hợp",
            "correct": true
          },
          {
            "text": "Tên nhánh có dấu gạch nối",
            "correct": false
          },
          {
            "text": "Repository có ít hơn mười tệp",
            "correct": false
          },
          {
            "text": "Máy tính không kết nối Internet",
            "correct": false
          }
        ],
        "explanation": "`-d` kiểm tra trạng thái merge để tránh xóa nhầm đường dẫn tới công việc chưa được nhập."
      },
      {
        "id": "q4",
        "question": "Sau khi `git branch -d feature` báo nhánh chưa được merge, bước nào an toàn nhất?",
        "type": "single",
        "options": [
          {
            "text": "Kiểm tra commit và merge hoặc giữ lại nhánh cho tới khi hiểu rõ công việc",
            "correct": true
          },
          {
            "text": "Dùng `-D` ngay để bỏ qua thông báo",
            "correct": false
          },
          {
            "text": "Xóa thư mục `.git`",
            "correct": false
          },
          {
            "text": "Chạy `git init` lần nữa",
            "correct": false
          }
        ],
        "explanation": "Hãy giữ con trỏ nhánh cho tới khi xác định commit chưa merge có cần giữ hay không."
      },
      {
        "id": "q5",
        "question": "Điều gì xảy ra với commit khi đổi tên nhánh bằng `git branch -m`?",
        "type": "single",
        "options": [
          {
            "text": "Commit không thay đổi; chỉ tên con trỏ nhánh đổi",
            "correct": true
          },
          {
            "text": "Toàn bộ commit được viết lại thành commit mới",
            "correct": false
          },
          {
            "text": "Commit được đẩy lên GitHub tự động",
            "correct": false
          },
          {
            "text": "Các commit trên nhánh bị xóa",
            "correct": false
          }
        ],
        "explanation": "Rename thay tên tham chiếu giúp tìm commit; bản thân lịch sử commit không bị sửa."
      },
      {
        "id": "q6",
        "question": "Lệnh nào cho biết nhánh nào còn tồn tại sau thao tác đổi tên hoặc xóa?",
        "type": "single",
        "options": [
          {
            "text": "git branch",
            "correct": true
          },
          {
            "text": "git status --remote",
            "correct": false
          },
          {
            "text": "git show --branches-only",
            "correct": false
          },
          {
            "text": "git list-commits",
            "correct": false
          }
        ],
        "explanation": "`git branch` liệt kê các nhánh local và đánh dấu nhánh hiện tại bằng dấu sao."
      }
    ]
  }
};
export default lesson;
