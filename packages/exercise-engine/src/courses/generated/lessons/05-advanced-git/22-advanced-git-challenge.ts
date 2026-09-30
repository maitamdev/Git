import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "22-advanced-git-challenge",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "22-advanced-git-challenge",
    "title": "Advanced Git Challenge",
    "level": "advanced",
    "duration": 45,
    "xp": 200,
    "prerequisites": [
      "17-rebase-conflict",
      "20-git-bisect"
    ],
    "objectives": [
      "Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.",
      "Cứu hộ thành công một commit bị mất bằng reflog sau một thao tác phá hủy mô phỏng.",
      "Biên tập dọn dẹp chuỗi commit bằng Interactive Rebase (squash, fixup, reword).",
      "Sử dụng bisect để truy tìm một commit gây lỗi ngầm và gắn thẻ Annotated Tag đánh dấu phiên bản hoàn thiện."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "advanced challenge",
      "git master",
      "tong hop level 5",
      "reflog rebase bisect",
      "thu thach chuyen gia"
    ],
    "commands": [
      "git reflog",
      "git branch rescue-branch <commit-hash>",
      "git rebase -i HEAD~<n>",
      "git bisect start && git bisect bad && git bisect good <hash>",
      "git tag -a v2.0.0 -m \"<thông-điệp-phát-hành>\""
    ]
  },
  "content": "# Advanced Git Challenge\n\n---\n\n## 🎯 Mục tiêu\n- Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.\n- Cứu hộ thành công một commit bị mất bằng reflog sau một thao tác phá hủy mô phỏng.\n- Biên tập dọn dẹp chuỗi commit bằng Interactive Rebase (squash, fixup, reword).\n- Sử dụng bisect để truy tìm một commit gây lỗi ngầm và gắn thẻ Annotated Tag đánh dấu phiên bản hoàn thiện.\n\n---\n\n## 📖 Định nghĩa\n> Advanced Git Challenge (Thử thách Git nâng cao) là bài kiểm tra sát hạch toàn diện kết thúc Level 5: Advanced Git. Bạn sẽ được đặt vào vai trò một kỹ sư cứu hộ mã nguồn cao cấp (Git Rescue Specialist) trong một dự án gặp sự cố nghiêm trọng: lịch sử bị rối loạn, một commit quan trọng bị xóa nhầm, một lỗi tiềm ẩn đang ẩn nấp trong hàng chục commit và mã nguồn cần được gọt giũa đóng gói chuẩn mực trước giờ phát hành.\n\n---\n\n## 🤔 Tại sao cần?\nVượt qua các bài học lý thuyết là bước đầu tiên, nhưng khả năng kết hợp nhịp nhàng giữa reflog, rebase, bisect và worktree dưới áp lực tình huống thực tế mới là thước đo chính xác năng lực của một chuyên gia Git thực thụ. Hoàn thành thử thách này khẳng định bạn đã bước vào hàng ngũ top 5% kỹ sư hiểu sâu và làm chủ hoàn toàn các cơ chế vận hành phức tạp nhất của Git.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là một bác sĩ phẫu thuật trưởng trong phòng cấp cứu đặc biệt của bệnh viện. Bệnh nhân (kho lưu trữ mã nguồn) đang ở trong tình trạng nguy kịch: một chi bị đứt rời cần nối lại (cứu commit bằng reflog), các vết thương đang bị viêm nhiễm cần phẫu thuật cắt lọc (rebase squash/drop), một độc tố ngầm đang phát tác cần xét nghiệm truy tìm nguồn gốc (git bisect) và sau khi chữa lành phải cấp giấy xuất viện chứng nhận sức khỏe hoàn hảo (Annotated Tag).\n\n---\n\n## 🖼 Sơ đồ\n```text\nKịch bản 4 chặng của Advanced Git Challenge:\n[Chặng 1: Reflog Rescue]      ──► Hồi sinh commit bị mất do reset hard\n               │\n               ▼\n[Chặng 2: Interactive Rebase] ──► Dọn dẹp, squash và reword chuỗi commit\n               │\n               ▼\n[Chặng 3: Git Bisect Hunt]    ──► Truy tìm commit bí mật đưa lỗi vào hệ thống\n               │\n               ▼\n[Chặng 4: Annotated Tag]      ──► Đóng gói mốc phát hành an toàn v2.0.0!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong kịch bản thử thách chuyên gia, học viên nhận được thông báo khẩn cấp: nhánh tính năng `feature-ai` bị ai đó vô tình reset hard làm mất toàn bộ mã nguồn quan trọng. Học viên bình tĩnh mở `git reflog`, tìm thấy mã hash gốc và hồi sinh nhánh an toàn bằng lệnh `git branch`. Tiếp theo, học viên thực hiện `git rebase -i` gộp 6 commit vụn vặt thành 2 commit chuẩn mực theo chuẩn conventional. Tiếp đó, khi hệ thống kích hoạt kịch bản lỗi ngầm, học viên vận hành thành thạo `git bisect` qua 4 bước phân đoạn nhị phân để chỉ mặt điểm tên commit gây lỗi. Cuối cùng, học viên gắn thẻ `v2.0.0` với thông điệp chú giải đầy đủ và hoàn thành bài thi xuất sắc với điểm số tuyệt đối.\n\n---\n\n## 💻 Command\n```bash\ngit reflog\ngit branch rescue-branch <commit-hash>\ngit rebase -i HEAD~<n>\ngit bisect start && git bisect bad && git bisect good <hash>\ngit tag -a v2.0.0 -m \"<thông-điệp-phát-hành>\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog & git branch`: Bộ đôi cứu hộ tái sinh commit bị mất vào nhánh mới an toàn.\n- `git rebase -i`: Tinh chỉnh, nén commit và viết lại thông điệp chuẩn mực.\n- `git bisect`: Chia đôi lịch sử để truy vết commit phát sinh lỗi.\n- `git tag -a`: Đóng dấu niêm phong cột mốc sản phẩm hoàn thiện.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Mất bình tĩnh khi đối mặt với nhiều lỗi cùng lúc**:  Hãy giải quyết tuần tự từng chặng theo đúng quy trình.\n2. **Quên chạy `git bisect reset` sau khi đã tìm ra commit gây lỗi.**: Quên chạy `git bisect reset` sau khi đã tìm ra commit gây lỗi.\n3. **Dùng cờ `--force` mà không có lease gây mất dữ liệu mô phỏng của hệ thống.**: Dùng cờ `--force` mà không có lease gây mất dữ liệu mô phỏng của hệ thống.\n\n---\n\n## 🧪 Lab\n1. Khởi động kịch bản `advanced-git-master-challenge` trong phòng lab.\n2. Sử dụng `git reflog` để tìm và khôi phục commit bị mất.\n3. Chạy `git rebase -i` để sắp xếp lại các commit theo đúng yêu cầu đề bài.\n4. Thực hiện `git bisect` để tìm commit gây lỗi và ghi nhận mã hash.\n5. Tạo thẻ Annotated Tag `v2.0.0` và nộp bài kiểm tra.\n\n---\n\n## 💡 Hint\n> Bình tĩnh kiểm tra reflog trước tiên, mọi dữ liệu trong Git đều có thể cứu được nếu đã từng commit.\n\n---\n\n## ✅ Validation\n- Vượt qua 100% các tiêu chí sát hạch của bài thi thử thách Advanced Git Challenge.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm tổng kết toàn diện Level 5: Advanced Git.\n\n---\n\n## 🔥 Challenge\nTự thiết lập một kịch bản mô phỏng tương tự trên máy tính cá nhân để thử thách bạn bè cùng học.\n\n---\n\n## 📚 Tổng kết\n- Làm chủ trọn vẹn bộ công cụ chuyên gia: Reflog, Rebase, Bisect, Worktree và Tag.\n- Khả năng cứu hộ và biên tập lịch sử là kỹ năng cốt lõi phân biệt kỹ sư cao cấp.\n- Tự tin giải quyết mọi tình huống sự cố phức tạp nhất trong các dự án phần mềm quy mô lớn.\n",
  "quiz": {
    "id": "quiz-05-22-advanced-git-challenge",
    "title": "Trắc nghiệm tổng kết: Master Advanced Git",
    "questions": [
      {
        "id": "q1",
        "question": "Bộ công cụ nào sau đây đại diện cho sức mạnh cứu hộ và kiểm soát lịch sử tối cao của Git?",
        "type": "single",
        "options": [
          {
            "text": "Reflog (cứu hộ), Interactive Rebase (biên tập), Bisect (tìm lỗi nhị phân), Worktree (đa nhiệm)",
            "correct": true
          },
          {
            "text": "Chỉ cần duy nhất lệnh git commit là đủ",
            "correct": false
          },
          {
            "text": "Các công cụ nén file như WinRAR và 7-Zip",
            "correct": false
          },
          {
            "text": "Các phần mềm diệt virus trên máy tính",
            "correct": false
          }
        ],
        "explanation": "Bộ tứ Reflog, Interactive Rebase, Bisect và Worktree là đỉnh cao làm chủ Git của mọi kỹ sư chuyên nghiệp."
      },
      {
        "id": "q2",
        "question": "Khi bạn cần hoàn tác một commit trên nhánh `main` chung mà không muốn làm hỏng lịch sử của đồng nghiệp, lệnh nào là lựa chọn duy nhất đúng?",
        "type": "single",
        "options": [
          {
            "text": "git revert <commit-hash>",
            "correct": true
          },
          {
            "text": "git reset --hard HEAD~1",
            "correct": false
          },
          {
            "text": "git rebase -i HEAD~2",
            "correct": false
          },
          {
            "text": "git push --force",
            "correct": false
          }
        ],
        "explanation": "`git revert` tạo commit đối nghịch mới mà không viết lại lịch sử, an toàn tuyệt đối cho nhánh dùng chung."
      },
      {
        "id": "q3",
        "question": "Kỹ thuật nào giúp bạn tự động chèn bản sửa lỗi vào đúng một commit cũ sâu trong lịch sử mà không cần kéo thả thủ công?",
        "type": "single",
        "options": [
          {
            "text": "git commit --fixup <hash> kết hợp với git rebase -i --autosquash",
            "correct": true
          },
          {
            "text": "git merge --fast-forward",
            "correct": false
          },
          {
            "text": "git cherry-pick --all",
            "correct": false
          },
          {
            "text": "git reset --mixed",
            "correct": false
          }
        ],
        "explanation": "Cặp đôi `--fixup` và `--autosquash` tự động hóa hoàn toàn việc vá lỗi hồi tố vào commit cũ."
      },
      {
        "id": "q4",
        "question": "Sau khi hoàn thành xuất sắc toàn bộ 22 bài học của Level 5, năng lực thực chiến của bạn được nâng lên tầm cao nào?",
        "type": "single",
        "options": [
          {
            "text": "Làm chủ toàn bộ cỗ máy thời gian của Git, tự tin cứu hộ dữ liệu, tối ưu lịch sử và giải quyết xung đột cấp cao",
            "correct": true
          },
          {
            "text": "Biết cách sửa chữa phần cứng màn hình máy tính",
            "correct": false
          },
          {
            "text": "Trở thành chuyên viên thiết kế đồ họa 3D",
            "correct": false
          },
          {
            "text": "Có thể tự động viết code mà không cần động vào bàn phím",
            "correct": false
          }
        ],
        "explanation": "Level 5 trang bị toàn bộ kỹ năng chuyên sâu giúp bạn trở thành chuyên gia Git cao cấp trong mọi đội ngũ kỹ thuật."
      }
    ]
  }
};
export default lesson;
