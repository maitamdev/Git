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
  "content": "# Khôi phục commit bị mất bằng reflog\n\n---\n\n## 🎯 Mục tiêu\n- Thành thạo quy trình 4 bước cứu hộ commit bị mất: Kiểm tra reflog -> Xác định tọa độ -> Tạo nhánh cứu hộ -> Hợp nhất.\n- Khôi phục thành công một commit vừa bị xóa do câu lệnh `git reset --hard`.\n- Hồi sinh nguyên vẹn một nhánh tính năng vừa bị lỡ tay xóa cưỡng chế bằng `git branch -D`.\n- Xây dựng tâm lý bình tĩnh, tự tin xử lý mọi sự cố mất mát mã nguồn trong dự án.\n\n---\n\n## 📖 Định nghĩa\n> Khôi phục commit bằng reflog (Reflog Recovery) là kỹ thuật cứu hộ cấp cao trong Git, cho phép lập trình viên tái kết nối và hồi sinh các commit bị cô lập (Dangling / Orphan Commits) trở lại cây lịch sử làm việc chính thống. Trong kiến trúc hướng đối tượng của Git, các commit bị xóa hoặc bị tách rời không hề biến mất ngay lập tức mà vẫn tồn tại trong cơ sở dữ liệu ngầm cho đến khi bị thu dọn rác; reflog cung cấp tọa độ chính xác để bạn gắn lại nhãn nhánh vào các commit đó.\n\n---\n\n## 🤔 Tại sao cần?\nTrong đời làm nghề kỹ sư phần mềm, không có cảm giác nào tồi tệ bằng việc nhìn thấy hàng tuần công sức lập trình biến mất vì một câu lệnh sai lầm. Kỹ năng cứu hộ bằng reflog chính là tấm khiên bảo vệ sự nghiệp của bạn. Một kỹ sư làm chủ reflog recovery không bao giờ biết sợ hãi trước những câu lệnh phức tạp, luôn giữ được sự điềm tĩnh phi thường khi xảy ra sự cố và trở thành người hùng cứu cánh cho cả đội ngũ trong những thời khắc khủng hoảng nhất.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một chiếc khinh khí cầu đang bay trên bầu trời, được neo giữ vào mặt đất bằng một sợi dây thừng (nhánh main). Khi bạn lỡ tay lấy kéo cắt đứt sợi dây thừng đó (reset hard hoặc xóa nhánh), khinh khí cầu không hề nổ tung biến mất, nó chỉ đang trôi lơ lửng tự do giữa tầng mây (Dangling Commit). `git reflog` chính là chiếc ống nhòm giúp bạn nhìn thấy tọa độ khinh khí cầu đang trôi, và bạn chỉ việc phóng một sợi dây neo mới (`git branch rescue-branch <hash>`) để kéo nó trở lại mặt đất an toàn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình hồi sinh commit mồ côi:\nTrạng thái mồ côi:\nC1 ──► C2 (main)\n        └──► C3 (Trôi nổi cô lập vì bị reset hard lùi về C2!)\n\nHồi sinh bằng nhánh mới:\ngit branch rescue C3\nC1 ──► C2 (main)\n        └──► C3 (rescue - Đã được kết nối trở lại an toàn!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Mai vừa vô tình chạy câu lệnh nguy hiểm `git branch -D feat-ai-chat` xóa mất nhánh tính năng AI chứa hơn 15 commit giá trị mà chưa kịp đẩy lên kho lưu trữ đám mây GitHub. Không hề bối rối hay hoảng loạn, Mai mở ngay terminal và gõ lệnh `git reflog` để truy tìm dấu vết của con trỏ. Mai nhanh chóng tìm thấy dòng sự kiện cuối cùng trước khi chuyển nhánh: `a9c8b7d HEAD@{3}: commit: feat: complete streaming response`. Mai lập tức gõ câu lệnh hồi sinh an toàn: `git branch feat-ai-chat a9c8b7d`. Ngay tức thì, nhánh `feat-ai-chat` được tái tạo nguyên vẹn với đầy đủ toàn bộ 15 commit và không hề mất một ký tự code nào trong sự thán phục của đồng nghiệp.\n\n---\n\n## 💻 Command\n```bash\ngit reflog\ngit branch <tên-nhánh-cứu-hộ> <commit-hash>\ngit reset --hard HEAD@{n}\ngit checkout -b <nhánh-mới> HEAD@{n}\n```\n\n---\n\n## 🔍 Giải thích command\n- `git reflog`: Bước 1 tra cứu tọa độ hash của commit trước khi tai nạn xảy ra.\n- `git branch <nhánh-mới> <hash>`: Cách an toàn nhất: tạo một nhánh mới cắm chốt ngay tại commit vừa tìm thấy.\n- `git reset --hard HEAD@{n}`: Cách dịch chuyển trực tiếp con trỏ nhánh hiện tại quay về vị trí reflog chỉ định.\n- `git checkout -b <nhánh> HEAD@{n}`: Tạo nhánh mới và chuyển ngay sang mốc commit cần cứu hộ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Hoảng loạn chạy loạn xạ các lệnh reset khác khiến bảng reflog bị tràn và khó tìm lại tọa độ cũ.**: Hoảng loạn chạy loạn xạ các lệnh reset khác khiến bảng reflog bị tràn và khó tìm lại tọa độ cũ.\n2. **Cố tình tắt máy tính hoặc xóa thư mục dự án khi vừa lỡ tay gõ lệnh sai.**: Cố tình tắt máy tính hoặc xóa thư mục dự án khi vừa lỡ tay gõ lệnh sai.\n3. **Dùng reset hard để cứu hộ thay vì tạo nhánh mới**:  Tạo nhánh mới luôn luôn là phương án an toàn nhất vì không làm xáo trộn nhánh hiện tại.\n\n---\n\n## 🧪 Lab\n1. Tạo commit bí mật có thông điệp `secret-data` trong tệp `secret.txt`.\n2. Cố tình phá hủy bằng lệnh `git reset --hard HEAD~1`. Kiểm tra thấy commit đã biến mất khỏi `git log`.\n3. Mở `git reflog` để tìm mã hash của commit chứa thông điệp `secret-data`.\n4. Tạo nhánh cứu hộ bằng lệnh `git branch rescue <hash-tìm-thấy>`.\n5. Chuyển sang nhánh `rescue` và xác nhận tệp `secret.txt` đã trở lại nguyên vẹn.\n\n---\n\n## 💡 Hint\n> Phương pháp an toàn nhất để cứu commit mồ côi luôn là dùng `git branch <tên-nhánh-mới> <commit-hash>`.\n\n---\n\n## ✅ Validation\n- Cứu hộ thành công commit bị mất sau khi bị reset hard hoặc xóa nhánh bằng reflog.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng cứu hộ dữ liệu với reflog.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa việc cứu một commit bị reset hard và việc cứu một nhánh vừa bị xóa bằng `git branch -D`.\n\n---\n\n## 📚 Tổng kết\n- Commit bị mất trong Git thực chất chỉ bị ngắt kết nối con trỏ chứ chưa bị xóa vật lý.\n- Sử dụng `git reflog` để định vị chính xác mã hash của commit trước thời điểm tai nạn.\n- Hồi sinh dữ liệu an toàn tuyệt đối bằng câu lệnh `git branch <tên-nhánh> <commit-hash>`.\n",
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
      }
    ]
  }
};
export default lesson;
