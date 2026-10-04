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
      "Thực hành riêng từng kỹ năng Level 5 trong repository có thể bỏ đi.",
      "Cứu commit đã reset bằng reflog, nếu commit còn được ghi nhận.",
      "Thực hiện một thao tác interactive rebase và tìm commit lỗi bằng bisect trong Git thật.",
      "Tạo và kiểm tra annotated tag sau khi xác minh commit mục tiêu."
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
      "git status",
      "git log --oneline"
    ]
  },
  "content": "# Advanced Git Challenge\n\n---\n\n## 🎯 Mục tiêu\n- Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.\n- Tạo ref mới trỏ tới commit bị tách khỏi nhánh và xác nhận file đã commit còn đó.\n- Chọn một thao tác Interactive Rebase đã học và kiểm tra nội dung cùng lịch sử sau khi viết lại.\n- Tìm commit gây lỗi trong lịch sử thử nghiệm, kết thúc phiên bisect, rồi gắn tag có chú giải cho commit đã kiểm tra.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Rescue Specialist\n- **Nói dễ hiểu**: Kỹ sư thành thạo các kỹ thuật cứu hộ dữ liệu Git (reflog, revert, rebase) để giải cứu kho mã nguồn khi gặp sự cố nghiêm trọng.\n- **Ví dụ**: Dùng `git reflog` và `git branch` để cứu lại commit bị xóa nhầm do reset hard chỉ trong 1 phút.\n- **Đừng nhầm**: Reflog có thể hết hạn và chỉ giúp tìm commit đã từng được tham chiếu; nó không lưu file chưa commit.\n\n### History Rewriting Mastery\n- **Nói dễ hiểu**: Khả năng làm chủ việc chỉnh sửa và tái cấu trúc lịch sử commit (rebase -i, squash, fixup, autosquash) trước khi chia sẻ ra cộng đồng.\n- **Ví dụ**: Gộp 10 commit nháp thành 2 commit chuẩn conventional với mô tả sắc nét trước khi mở Pull Request.\n- **Đừng nhầm**: Rebase thay đổi commit hash; trước khi cập nhật nhánh đã chia sẻ, cần làm theo quy trình của nhóm.\n\n### Binary Bug Hunting (git bisect)\n- **Nói dễ hiểu**: Phương pháp truy tìm commit phát sinh lỗi tự động với thuật toán chia đôi nhị phân đạt tốc độ $O(\\log N)$.\n- **Ví dụ**: Với 1.000 commit và một mốc tốt, một mốc hỏng rõ ràng, bisect cần khoảng 10 lượt kiểm tra trong trường hợp lý tưởng.\n- **Đừng nhầm**: Sau khi tìm thấy thủ phạm, chạy `git bisect reset` để kết thúc phiên và quay lại vị trí ban đầu.\n\n---\n\n## 📖 Định nghĩa\nĐây là bài ôn tập cuối Level 5 gồm bốn phần ngắn: reflog recovery, interactive rebase, bisect và annotated tag. Hãy làm trong repository thử nghiệm riêng; interactive rebase và bisect có bước kiểm tra cần Git thật, không phải terminal mô phỏng.\n\n---\n\n## 🤔 Tại sao cần?\nBạn sẽ thực hành từng kỹ năng trên một repo có thể bỏ đi, xem Git thay đổi ref và file ra sao, rồi đối chiếu kết quả bằng `git status`, `git log` và `git show`.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là bác sĩ phẫu thuật trưởng trong phòng cấp cứu. Kho mã nguồn gặp sự cố: một chi đứt rời cần nối lại (cứu commit bằng reflog), vết thương cần cắt lọc gọt giũa (rebase squash), chất độc cần xét nghiệm tìm nguồn (bisect) và cấp giấy xuất viện hoàn hảo (Annotated Tag).\n\n---\n\n## 🖼 Sơ đồ\n```text\nKịch bản 4 chặng của Advanced Git Challenge:\n[Chặng 1: Reflog Rescue]      ──► Hồi sinh commit bị mất do reset hard\n               │\n               ▼\n[Chặng 2: Interactive Rebase] ──► Dọn dẹp, squash và reword chuỗi commit\n               │\n               ▼\n[Chặng 3: Git Bisect Hunt]    ──► Truy tìm commit bí mật đưa lỗi vào hệ thống\n               │\n               ▼\n[Chặng 4: Annotated Tag]      ──► Đóng gói mốc phát hành an toàn v2.0.0!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư nhận ca sự cố: nhánh `feature` bị reset hard mất code. Kỹ sư mở `git reflog` hồi sinh nhánh, dùng `git rebase -i` gộp commit nháp thành 2 commit chuẩn mực, chạy `git bisect` qua 4 bước nhị phân tìm ra commit lỗi ngầm, rồi gắn tag `v2.0.0` xuất sắc hoàn thành thử thách.\n\n---\n\n## 💻 Command\n```bash\ngit reflog\ngit branch rescue-branch <commit-hash>\ngit rebase -i HEAD~<n>\ngit bisect start\ngit bisect bad\ngit bisect good <commit-tot>\ngit bisect reset\ngit tag -a v2.0.0 -m \"<thông-điệp-phát-hành>\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog` và `git branch`: Tìm một commit còn tham chiếu được rồi tạo nhánh mới trỏ tới nó.\n- `git rebase -i`: Tinh chỉnh, nén commit và viết lại thông điệp chuẩn mực.\n- `git bisect`: Chia đôi lịch sử để truy vết commit phát sinh lỗi.\n- `git tag -a`: Tạo tag có metadata; chỉ gắn sau khi xác nhận commit đúng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng repo đang làm việc để thử reset/rebase**: Dùng repo riêng, xác nhận `git status` sạch và sao lưu nội dung cần giữ.\n2. **Cho rằng reflog giữ commit vô thời hạn hoặc cứu file chưa commit**: Reflog có thể hết hạn; commit hóa hoặc sao lưu công việc trước.\n3. **Xem `--force-with-lease` là không có rủi ro**: Cờ này giảm khả năng ghi đè cập nhật mới, nhưng vẫn cần quyền và phối hợp với người dùng nhánh.\n\n---\n\n## 🧪 Lab\nChạy bốn phần theo thứ tự trong một repo thử nghiệm mới bằng Git thật. Không dùng repo dự án đang làm.\n\n**A. Cứu commit**\n1. Tạo commit nền có `README.md`, sau đó commit `recovery.txt` với nội dung `keep this`.\n2. Ghi lại hash, chạy `git reset --hard HEAD~1`, rồi dùng `git reflog` tìm commit vừa rời khỏi nhánh.\n3. Chạy `git branch rescue <hash>`, rồi `git switch rescue`; xác nhận `recovery.txt` còn nội dung `keep this`.\n\n**B. Sửa lịch sử riêng**\n4. Trên một nhánh thử nghiệm chưa chia sẻ, tạo ba commit có thông điệp dễ nhận biết.\n5. Chạy `git rebase -i HEAD~3`; đổi một message bằng `reword` hoặc gộp hai commit liên quan bằng `squash`/`fixup`. Lưu todo list.\n6. Chạy `git log --oneline -4` và `git status`; xác nhận nội dung cần giữ vẫn còn và hash đã thay đổi.\n\n**C. Tìm commit lỗi**\n7. Dùng repo bisect riêng theo setup ở bài 20: mốc tốt, mốc hỏng và một file kiểm tra rõ kết quả.\n8. Ghi lại hash commit đầu tiên bị lỗi, sau đó chạy `git bisect reset`.\n\n**D. Gắn tag**\n9. Chỉ sau khi kiểm tra commit mục tiêu, chạy `git tag -a practice-v0.1 -m \"Practice release\"` và `git show practice-v0.1`.\n10. Xóa tag thử nghiệm bằng `git tag -d practice-v0.1` nếu đây không phải tag cần giữ.\n\n---\n\n## 💡 Hint\n> Trước khi thử: chạy `git status`, dùng repo riêng, ghi lại hash trước thao tác viết lại lịch sử và kiểm tra lại file sau mỗi chặng.\n\n---\n\n## ✅ Validation\n- Tạo được nhánh `rescue` trỏ đúng commit đã reset và mở lại file đã commit.\n- Hoàn thành một thao tác interactive rebase, tìm được commit lỗi bằng bisect và tạo/xem được annotated tag.\n- Sau mỗi phần, nêu được thay đổi nào có thể khôi phục và điều kiện nào có thể làm thao tác thất bại.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm tổng kết toàn diện Level 5: Advanced Git.\n\n---\n\n## 🔥 Challenge\nKết hợp Git Hooks và Worktree để tự động chạy kiểm thử đơn vị trong một worktree ngầm mỗi khi bạn chuẩn bị commit mã nguồn.\n\n---\n\n## 📚 Tổng kết\n- Reflog giúp tìm commit còn được ghi nhận; nó không thay thế sao lưu.\n- Rebase viết lại commit; bisect tìm mốc lỗi; annotated tag lưu nhãn cùng metadata.\n- Tự tin bước tiếp sang Level 6: Team Workflows & Collaboration.\n",
  "quiz": {
    "id": "quiz-05-22-advanced-git-challenge",
    "title": "Trắc nghiệm tổng kết: Master Advanced Git",
    "questions": [
      {
        "id": "q1",
        "question": "Bộ công cụ nào ghép đúng từng việc đã học trong Level 5?",
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
        "explanation": "Reflog giúp tìm ref cũ, interactive rebase chỉnh chuỗi commit, bisect thu hẹp nơi phát sinh lỗi, còn worktree mở thư mục làm việc song song."
      },
      {
        "id": "q2",
        "question": "Với commit đã chia sẻ trên `main`, lệnh nào thường được dùng để thêm một commit đảo thay đổi?",
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
        "explanation": "`git revert` giữ commit cũ và thêm commit đảo thay đổi. Hãy review diff và làm theo quy ước của nhóm."
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
        "explanation": "`--autosquash` sắp xếp commit fixup trong todo list; hãy kiểm tra danh sách và xử lý conflict nếu có trước khi hoàn tất rebase."
      },
      {
        "id": "q4",
        "question": "Sau khi tìm thấy hash commit trong reflog, lệnh nào tạo nhánh cứu hộ mà không di chuyển nhánh hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git branch rescue <commit-hash>",
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
        "explanation": "Lệnh này tạo ref nhánh mới trỏ tới commit đã tìm. Xác minh hash trước khi chạy và nhớ rằng reflog không khôi phục file chưa commit."
      },
      {
        "id": "q5",
        "question": "Khi nào bạn NÊN sử dụng `git cherry-pick` thay vì `git merge` hay `git rebase`?",
        "type": "single",
        "options": [
          {
            "text": "Khi bạn chỉ cần trích xuất một vài commit cụ thể (như bản vá lỗi khẩn cấp) từ một nhánh khác mà không muốn lấy toàn bộ nhánh đó",
            "correct": true
          },
          {
            "text": "Khi bạn muốn xóa toàn bộ lịch sử commit của nhánh hiện tại",
            "correct": false
          },
          {
            "text": "Khi bạn chuẩn bị xóa kho chứa trên GitHub",
            "correct": false
          },
          {
            "text": "Khi bạn muốn đổi tên tài khoản người dùng Git",
            "correct": false
          }
        ],
        "explanation": "`git cherry-pick` cho phép bạn nhặt chọn lọc một hoặc nhiều commit riêng lẻ từ một nhánh sang nhánh khác mà không cần tích hợp toàn bộ nhánh."
      }
    ]
  }
};
export default lesson;
