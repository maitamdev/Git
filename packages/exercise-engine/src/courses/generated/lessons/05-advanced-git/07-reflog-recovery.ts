import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-reflog-recovery",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "07-reflog-recovery",
    "title": "Khôi phục commit bị mất bằng reflog",
    "level": "advanced",
    "duration": 35,
    "xp": 110,
    "prerequisites": [
      "06-git-reflog"
    ],
    "objectives": [
      "Thành thạo quy trình 4 bước cứu hộ commit bị mất: Kiểm tra reflog -> Xác định tọa độ -> Tạo nhánh cứu hộ -> Hợp nhất.",
      "Khôi phục thành công một commit vừa bị xóa do câu lệnh `git reset --hard`.",
      "Hồi sinh nguyên vẹn một nhánh tính năng vừa bị lỡ tay xóa cưỡng chế bằng `git branch -D`.",
      "Xây dựng tâm lý bình tĩnh, tự tin xử lý mọi sự cố mất mát mã nguồn trong dự án."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "reflog recovery",
      "khoi phuc commit",
      "cuu commit mat",
      "dangling commit",
      "reviving branch",
      "git rescue"
    ],
    "commands": [
      "git reflog",
      "git branch <tên-nhánh-cứu-hộ> <commit-hash>",
      "git reset --hard HEAD@{n}",
      "git checkout -b <nhánh-mới> HEAD@{n}"
    ]
  },
  "content": "# Khôi phục commit bị mất bằng reflog\n\n---\n\n## 🎯 Mục tiêu\n- Thành thạo quy trình 4 bước cứu hộ commit bị mất: Kiểm tra reflog -> Xác định tọa độ -> Tạo nhánh cứu hộ -> Hợp nhất.\n- Khôi phục thành công một commit vừa bị xóa do câu lệnh `git reset --hard`.\n- Hồi sinh nguyên vẹn một nhánh tính năng vừa bị lỡ tay xóa cưỡng chế bằng `git branch -D`.\n- Xây dựng tâm lý bình tĩnh, tự tin xử lý mọi sự cố mất mát mã nguồn trong dự án.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### reflog recovery\n- **Nói dễ hiểu**: Kỹ thuật tìm lại mã hash từ nhật ký reflog để gắn nhánh mới và cứu lại các commit bị mất.\n- **Ví dụ**: Tra reflog thấy commit `a9c8b7d` và chạy `git branch rescue a9c8b7d` để hồi sinh code.\n- **Đừng nhầm**: Không tạo ra commit mới; kỹ thuật này chỉ nối lại con trỏ nhánh vào commit cũ đang trôi nổi.\n\n### dangling commit\n- **Nói dễ hiểu**: Commit mồ côi trôi nổi tự do trong cơ sở dữ liệu ngầm mà không có con trỏ nhánh nào trỏ tới.\n- **Ví dụ**: Sau khi chạy `git reset --hard HEAD~1`, commit đỉnh cũ trở thành dangling commit.\n- **Đừng nhầm**: Không hề bị xóa ngay lập tức; Git bảo tồn các commit này trong kho ngầm ít nhất 30 ngày.\n\n### rescue branch\n- **Nói dễ hiểu**: Nhánh mới được tạo ra cắm chốt ngay tại vị trí commit mồ côi để đưa nó trở lại cây lịch sử.\n- **Ví dụ**: `git branch rescue-feature <commit-hash>` giúp bạn xem lại và merge code an toàn.\n- **Đừng nhầm**: Là phương án an toàn nhất; không làm thay đổi hay ghi đè lên nhánh bạn đang đứng.\n\n---\n\n## 📖 Định nghĩa\nKhôi phục commit bằng reflog (Reflog Recovery) là kỹ thuật cứu hộ cấp cao trong Git, cho phép tái kết nối và hồi sinh các commit bị cô lập (Dangling Commits) trở lại cây lịch sử làm việc. Trong Git, commit bị xóa khỏi nhánh không biến mất ngay mà vẫn nằm trong cơ sở dữ liệu ngầm; reflog cung cấp mã hash chính xác để gắn lại nhánh mới.\n\n---\n\n## 💡 Tại sao cần\nKhông gì tồi tệ hơn việc nhìn thấy công sức lập trình biến mất vì một lệnh gõ sai. Kỹ năng cứu hộ bằng reflog là tấm khiên bảo vệ bạn trong mọi tình huống. Nắm vững reflog recovery giúp bạn luôn giữ sự điềm tĩnh phi thường khi xảy ra sự cố và tự tin xử lý những ca mất code phức tạp nhất.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung khinh khí cầu đang bay trên trời được neo vào đất bằng một sợi dây thừng (nhánh main). Khi bạn lỡ tay cắt đứt sợi dây (reset hard hoặc xóa nhánh), khinh khí cầu không hề nổ tung mà chỉ trôi lơ lửng giữa tầng mây (Dangling Commit). `git reflog` là ống nhòm định vị tọa độ, và bạn phóng một sợi dây neo mới (`git branch rescue <hash>`) để kéo nó về đất an toàn.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình hồi sinh commit mồ côi:\nTrạng thái mồ côi:\nC1 ──► C2 (main)\n        └──► C3 (Trôi nổi cô lập vì bị reset hard lùi về C2!)\n\nHồi sinh bằng nhánh mới:\ngit branch rescue C3\nC1 ──► C2 (main)\n        └──► C3 (rescue - Đã được kết nối trở lại an toàn!)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Mai lỡ tay gõ `git branch -D feat-ai-chat` xóa mất nhánh chứa 15 commit chưa push lên GitHub. Không hoảng loạn, Mai mở terminal gõ `git reflog` và thấy dòng sự kiện trước đó: `a9c8b7d HEAD@{3}: commit: feat: complete streaming`. Mai lập tức gõ lệnh hồi sinh `git branch feat-ai-chat a9c8b7d`. Toàn bộ 15 commit sống lại nguyên vẹn không thiếu một dòng code nào trong sự thán phục của đồng đội.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit reflog\ngit branch <tên-nhánh-cứu-hộ> <commit-hash>\ngit reset --hard HEAD@{n}\ngit checkout -b <nhánh-mới> HEAD@{n}\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog`: Bước 1 tra cứu tọa độ hash của commit trước khi tai nạn xảy ra.\n- `git branch <nhánh-mới> <hash>`: Cách an toàn nhất: tạo một nhánh mới cắm chốt ngay tại commit vừa tìm thấy.\n- `git reset --hard HEAD@{n}`: Cách dịch chuyển trực tiếp con trỏ nhánh hiện tại quay về vị trí reflog chỉ định.\n- `git checkout -b <nhánh> HEAD@{n}`: Tạo nhánh mới và chuyển ngay sang mốc commit cần cứu hộ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng loạn gõ thêm nhiều lệnh reset lung tung**: Làm bảng reflog bị tràn các sự kiện mới và đẩy vị trí commit cần cứu đi xa.\n2. **Tắt máy tính hoặc xóa thư mục dự án khi vừa lỡ gõ sai**: Khiến các tiến trình Git bị ngắt quãng không cần thiết; dữ liệu vẫn nằm an toàn trong thư mục `.git`.\n3. **Cố tình dùng reset hard để cứu hộ thay vì tạo nhánh mới**: Tạo nhánh mới luôn an toàn nhất vì không làm xáo trộn nhánh hiện tại.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành cứu hộ commit mồ côi trên terminal.\n1. Tạo commit thử nghiệm có nội dung `secret-data` trong tệp `secret.txt`.\n2. Chạy `git reset --hard HEAD~1` và kiểm tra thấy commit biến mất khỏi `git log`.\n3. Mở `git reflog` để tìm mã hash của commit vừa bị tách rời.\n4. Tạo nhánh cứu hộ bằng lệnh `git branch rescue <hash-tìm-thấy>`.\n5. Chuyển sang nhánh `rescue` và xác nhận tệp `secret.txt` đã trở lại nguyên vẹn.\n\n---\n\n## 💡 Hint & mẹo\n> Phương pháp an toàn nhất để cứu commit mồ côi luôn là dùng `git branch <tên-nhánh-mới> <commit-hash>`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Nhánh cứu hộ mới được tạo trỏ đúng vào commit bị mất trước đó.\n- Lịch sử `git log` trên nhánh mới hiển thị đầy đủ các commit tưởng chừng đã bị xóa sổ.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng cứu hộ dữ liệu với reflog.\n\n---\n\n## 🚀 Thử thách nâng cao\nKhám phá lệnh `git fsck --lost-found` để quét toàn bộ cơ sở dữ liệu và tìm ra tất cả các blob và commit mồ côi (dangling objects) trong kho lưu trữ.\n\n---\n\n## 📝 Tổng kết\n- Commit bị mất trong Git thực chất chỉ bị ngắt kết nối con trỏ chứ chưa bị xóa vật lý.\n- Sử dụng `git reflog` để định vị chính xác mã hash của commit trước thời điểm tai nạn.\n- Hồi sinh dữ liệu an toàn tuyệt đối bằng câu lệnh `git branch <tên-nhánh> <commit-hash>`.\n",
  "quiz": {
    "id": "quiz-05-07-reflog-recovery",
    "title": "Trắc nghiệm: Cứu hộ commit với reflog",
    "questions": [
      {
        "id": "q1",
        "question": "Sau khi xác định được mã hash `c4d5e6f` của commit bị mất trong reflog, câu lệnh an toàn và chuyên nghiệp nhất để hồi sinh commit đó là gì?",
        "type": "single",
        "options": [
          {
            "text": "git branch restored-branch c4d5e6f",
            "correct": true
          },
          {
            "text": "git delete c4d5e6f",
            "correct": false
          },
          {
            "text": "git init --restore c4d5e6f",
            "correct": false
          },
          {
            "text": "git push --force c4d5e6f",
            "correct": false
          }
        ],
        "explanation": "`git branch <tên-nhánh> <hash>` tạo một con trỏ nhánh mới neo giữ commit đó, đưa nó trở lại cây lịch sử hoàn toàn an toàn."
      },
      {
        "id": "q2",
        "question": "Nếu bạn vừa lỡ tay gõ `git branch -D feature-x` xóa mất nhánh khi chưa merge, bạn có thể cứu lại được không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn cứu được, chỉ cần tìm mã hash của đỉnh nhánh feature-x trong reflog rồi tạo lại nhánh",
            "correct": true
          },
          {
            "text": "Không thể cứu được vì cờ -D là xóa vĩnh viễn",
            "correct": false
          },
          {
            "text": "Chỉ cứu được nếu có lưu file ra USB bên ngoài",
            "correct": false
          },
          {
            "text": "Phải liên hệ với bộ phận hỗ trợ khách hàng của GitHub",
            "correct": false
          }
        ],
        "explanation": "Xóa nhánh chỉ là xóa con trỏ tên nhánh; các commit vẫn nằm nguyên vẹn trong kho và có thể tái tạo lại nhánh dễ dàng qua reflog."
      },
      {
        "id": "q3",
        "question": "Trong tình huống bạn lỡ tay chạy `git reset --hard HEAD~1`, câu lệnh một dòng nào đưa bạn quay trở lại ngay lập tức trạng thái trước khi reset?",
        "type": "single",
        "options": [
          {
            "text": "git reset --hard HEAD@{1}",
            "correct": true
          },
          {
            "text": "git undo reset",
            "correct": false
          },
          {
            "text": "git revert HEAD",
            "correct": false
          },
          {
            "text": "git restore --previous",
            "correct": false
          }
        ],
        "explanation": "Trước khi reset con trỏ ở vị trí `HEAD@{1}`, lệnh `git reset --hard HEAD@{1}` lập tức đưa bạn trở lại vị trí đó."
      },
      {
        "id": "q4",
        "question": "Tại sao việc giữ bình tĩnh và không gõ bừa bãi các lệnh khác khi phát hiện mất commit lại cực kỳ quan trọng?",
        "type": "single",
        "options": [
          {
            "text": "Để tránh việc sinh ra quá nhiều bản ghi mới làm trôi mất vị trí cần tìm trong danh sách reflog",
            "correct": true
          },
          {
            "text": "Để máy tính không bị quá tải bộ nhớ RAM",
            "correct": false
          },
          {
            "text": "Để hệ điều hành không tự động khóa bàn phím",
            "correct": false
          },
          {
            "text": "Vì nếu gõ quá nhanh Git sẽ tự động thoát",
            "correct": false
          }
        ],
        "explanation": "Gõ nhiều lệnh dịch chuyển HEAD sẽ tạo thêm nhiều dòng `HEAD@{n}`, làm phức tạp và đẩy xa vị trí commit cần cứu."
      },
      {
        "id": "q5",
        "question": "Khi bạn tạo nhánh mới tại commit tìm được từ reflog bằng cú pháp `git branch rescue-branch <commit-hash>`, điều gì xảy ra với nhánh hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh hiện tại hoàn toàn không bị ảnh hưởng; Git chỉ tạo thêm một con trỏ nhánh mới neo giữ commit đó",
            "correct": true
          },
          {
            "text": "Nhánh hiện tại bị xóa sạch sẽ khỏi dự án",
            "correct": false
          },
          {
            "text": "Toàn bộ lịch sử của nhánh hiện tại bị ghi đè hoàn toàn",
            "correct": false
          },
          {
            "text": "Git bắt buộc phải kích hoạt xung đột merge ngay lập tức",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git branch <tên> <hash>` là thao tác an toàn 100%, chỉ tạo thêm con trỏ tham chiếu mà không chạm vào nhánh làm việc hiện tại."
      }
    ]
  }
};
export default lesson;
