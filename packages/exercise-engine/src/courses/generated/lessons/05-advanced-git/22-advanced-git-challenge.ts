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
  "content": "# Advanced Git Challenge\n\n---\n\n## 🎯 Mục tiêu\n- Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.\n- Cứu hộ thành công một commit bị mất bằng reflog sau một thao tác phá hủy mô phỏng.\n- Biên tập dọn dẹp chuỗi commit bằng Interactive Rebase (squash, fixup, reword).\n- Sử dụng bisect để truy tìm một commit gây lỗi ngầm và gắn thẻ Annotated Tag đánh dấu phiên bản hoàn thiện.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Rescue Specialist\n- **Nói dễ hiểu**: Kỹ sư thành thạo các kỹ thuật cứu hộ dữ liệu Git (reflog, revert, rebase) để giải cứu kho mã nguồn khi gặp sự cố nghiêm trọng.\n- **Ví dụ**: Dùng `git reflog` và `git branch` để cứu lại commit bị xóa nhầm do reset hard chỉ trong 1 phút.\n- **Đừng nhầm**: Cứu hộ không phải là đoán mò; mọi thao tác đều dựa trên nhật ký di chuyển reflog chính xác của Git.\n\n### History Rewriting Mastery\n- **Nói dễ hiểu**: Khả năng làm chủ việc chỉnh sửa và tái cấu trúc lịch sử commit (rebase -i, squash, fixup, autosquash) trước khi chia sẻ ra cộng đồng.\n- **Ví dụ**: Gộp 10 commit nháp thành 2 commit chuẩn conventional với mô tả sắc nét trước khi mở Pull Request.\n- **Đừng nhầm**: Chỉ viết lại lịch sử trên nhánh cá nhân ở máy cục bộ, không bao giờ viết lại lịch sử trên nhánh chung đã push.\n\n### Binary Bug Hunting (git bisect)\n- **Nói dễ hiểu**: Phương pháp truy tìm commit phát sinh lỗi tự động với thuật toán chia đôi nhị phân đạt tốc độ $O(\\log N)$.\n- **Ví dụ**: Tìm ra commit làm hỏng chức năng thanh toán giữa 1.000 commit chỉ với 10 lần kiểm thử.\n- **Đừng nhầm**: Nhớ chạy `git bisect reset` sau khi xác định xong thủ phạm để đưa HEAD về nhánh làm việc an toàn.\n\n---\n\n## 📖 Định nghĩa\nAdvanced Git Challenge là bài sát hạch toàn diện kết thúc Level 5, yêu cầu phối hợp nhịp nhàng các kỹ thuật chuyên sâu: cứu hộ commit bằng reflog, biên tập lịch sử với interactive rebase, truy tìm lỗi bằng bisect và đóng gói mốc phát hành bằng annotated tag.\n\n---\n\n## 💡 Tại sao cần\nHọc lý thuyết từng lệnh là chưa đủ. Khả năng kết hợp linh hoạt reflog, rebase, bisect và worktree dưới áp lực tình huống thực chiến giúp bạn trở thành chuyên gia Git thực thụ, tự tin xử lý mọi sự cố phức tạp trong các dự án quy mô lớn.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn là bác sĩ phẫu thuật trưởng trong phòng cấp cứu. Kho mã nguồn gặp sự cố: một chi đứt rời cần nối lại (cứu commit bằng reflog), vết thương cần cắt lọc gọt giũa (rebase squash), chất độc cần xét nghiệm tìm nguồn (bisect) và cấp giấy xuất viện hoàn hảo (Annotated Tag).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nKịch bản 4 chặng của Advanced Git Challenge:\n[Chặng 1: Reflog Rescue]      ──► Hồi sinh commit bị mất do reset hard\n               │\n               ▼\n[Chặng 2: Interactive Rebase] ──► Dọn dẹp, squash và reword chuỗi commit\n               │\n               ▼\n[Chặng 3: Git Bisect Hunt]    ──► Truy tìm commit bí mật đưa lỗi vào hệ thống\n               │\n               ▼\n[Chặng 4: Annotated Tag]      ──► Đóng gói mốc phát hành an toàn v2.0.0!\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư nhận ca sự cố: nhánh `feature` bị reset hard mất code. Kỹ sư mở `git reflog` hồi sinh nhánh, dùng `git rebase -i` gộp commit nháp thành 2 commit chuẩn mực, chạy `git bisect` qua 4 bước nhị phân tìm ra commit lỗi ngầm, rồi gắn tag `v2.0.0` xuất sắc hoàn thành thử thách.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit reflog\ngit branch rescue-branch <commit-hash>\ngit rebase -i HEAD~<n>\ngit bisect start && git bisect bad && git bisect good <hash>\ngit tag -a v2.0.0 -m \"<thông-điệp-phát-hành>\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog & git branch`: Bộ đôi cứu hộ tái sinh commit bị mất vào nhánh mới an toàn.\n- `git rebase -i`: Tinh chỉnh, nén commit và viết lại thông điệp chuẩn mực.\n- `git bisect`: Chia đôi lịch sử để truy vết commit phát sinh lỗi.\n- `git tag -a`: Đóng dấu niêm phong cột mốc sản phẩm hoàn thiện.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Mất bình tĩnh khi đối mặt với sự cố**: Bình tĩnh giải quyết tuần tự từng bước theo quy trình đã học; Git gần như không bao giờ làm mất commit đã tạo.\n2. **Quên chạy `git bisect reset`**: Để sót trạng thái bisect dở dang khiến HEAD bị tách rời khỏi nhánh làm việc.\n3. **Lạm dụng force push bừa bãi**: Luôn dùng `--force-with-lease` thay vì `--force` khi cần cập nhật nhánh cá nhân sau khi rebase.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Khởi động kịch bản thử thách nâng cao trên kho bài tập cá nhân.\n2. Sử dụng `git reflog` để tìm và khôi phục commit bị mất do thao tác reset mô phỏng.\n3. Chạy `git rebase -i` để sắp xếp và gộp lại các commit cho gọn gàng.\n4. Thực hiện `git bisect` để tìm commit gây lỗi và ghi nhận mã hash.\n5. Tạo thẻ Annotated Tag `v2.0.0` và kiểm tra lại lịch sử toàn diện.\n\n---\n\n## 💡 Hint & mẹo\n> Bình tĩnh kiểm tra reflog trước tiên, mọi dữ liệu trong Git đều có thể cứu được nếu đã từng commit.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Vượt qua 100% các tiêu chí sát hạch của bài thi thử thách Advanced Git Challenge.\n- Tự tin làm chủ hoàn toàn các công cụ cấp cao của Git trong môi trường dự án thực tế.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm tổng kết toàn diện Level 5: Advanced Git.\n\n---\n\n## 🚀 Thử thách nâng cao\nKết hợp Git Hooks và Worktree để tự động chạy kiểm thử đơn vị trong một worktree ngầm mỗi khi bạn chuẩn bị commit mã nguồn.\n\n---\n\n## 📝 Tổng kết\n- Level 5 trang bị toàn bộ kỹ năng cứu hộ và biên tập lịch sử tối cao của Git.\n- Reflog, Rebase, Bisect và Worktree là bộ tứ vũ khí của mọi Git Master.\n- Tự tin bước tiếp sang Level 6: Team Workflows & Collaboration.\n",
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
