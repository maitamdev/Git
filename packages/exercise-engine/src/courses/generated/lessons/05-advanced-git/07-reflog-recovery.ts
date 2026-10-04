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
      "Tìm commit trong reflog rồi tạo nhánh mới trỏ tới commit đó.",
      "Khôi phục thành công một commit vừa bị xóa do câu lệnh `git reset --hard`.",
      "Hiểu reflog chỉ tìm lại commit còn được ghi nhận; nó không khôi phục file chưa commit."
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
      "git log --oneline"
    ]
  },
  "content": "# Khôi phục commit bị mất bằng reflog\n\n---\n\n## 🎯 Mục tiêu\n- Thực hành tìm commit bằng reflog rồi tạo nhánh mới để giữ một tham chiếu tới commit đó.\n- Tạo nhánh cứu hộ trỏ tới commit đã tìm thấy sau một lần `git reset --hard`.\n- Hiểu cách áp dụng cùng quy trình khi xóa nhánh, nếu tìm được commit và object còn tồn tại.\n- Nhận biết reflog không khôi phục được file chưa commit và entry có thể hết hạn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### reflog recovery\n- **Nói dễ hiểu**: Kỹ thuật tìm lại mã hash từ nhật ký reflog để gắn nhánh mới và cứu lại các commit bị mất.\n- **Ví dụ**: Tra reflog thấy commit `a9c8b7d` và chạy `git branch rescue a9c8b7d` để hồi sinh code.\n- **Đừng nhầm**: Không tạo ra commit mới; kỹ thuật này chỉ nối lại con trỏ nhánh vào commit cũ đang trôi nổi.\n\n### dangling commit\n- **Nói dễ hiểu**: Commit không còn nằm trên lịch sử các nhánh hiện tại; hash của nó có thể vẫn còn trong reflog một thời gian.\n- **Ví dụ**: Sau khi chạy `git reset --hard HEAD~1`, commit đỉnh cũ trở thành dangling commit.\n- **Đừng nhầm**: Không được bảo đảm còn mãi. Reflog hết hạn và garbage collection có thể dọn object không còn được tham chiếu.\n\n### rescue branch\n- **Nói dễ hiểu**: Nhánh mới được tạo ra cắm chốt ngay tại vị trí commit mồ côi để đưa nó trở lại cây lịch sử.\n- **Ví dụ**: `git branch rescue-feature <commit-hash>` giúp bạn xem lại và merge code an toàn.\n- **Đừng nhầm**: Là phương án an toàn nhất; không làm thay đổi hay ghi đè lên nhánh bạn đang đứng.\n\n---\n\n## 📖 Định nghĩa\nKhôi phục commit bằng reflog là cách tìm một commit từng được tham chiếu rồi tạo ref mới, chẳng hạn nhánh, trỏ đến commit đó. Cách này hữu ích sau reset hoặc xóa nhánh khi reflog và object commit còn tồn tại; không khôi phục thay đổi chưa commit.\n\n---\n\n## 🤔 Tại sao cần?\nReflog hữu ích khi cần tìm lại commit sau thao tác nhầm. Trước tiên dừng các lệnh ghi, kiểm tra trạng thái repo, tìm hash phù hợp, rồi tạo nhánh cứu hộ để giữ commit đó.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung nhánh là nhãn chỉ tới commit. Khi nhãn bị di chuyển hoặc xóa, reflog có thể còn ghi hash trước đó. Tạo nhánh cứu hộ (`git branch rescue <hash>`) sẽ thêm một nhãn mới trỏ tới commit đó.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình hồi sinh commit mồ côi:\nTrạng thái mồ côi:\nC1 ──► C2 (main)\n        └──► C3 (Trôi nổi cô lập vì bị reset hard lùi về C2!)\n\nHồi sinh bằng nhánh mới:\ngit branch rescue C3\nC1 ──► C2 (main)\n        └──► C3 (rescue - Đã được kết nối trở lại an toàn!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Mai xóa nhánh `feat-ai-chat` chưa push. Mai kiểm tra `git reflog`, tìm hash của commit cuối nhánh và xác minh đó đúng là commit cần giữ. Nếu hash và object còn tồn tại, Mai tạo lại nhánh bằng `git branch feat-ai-chat <hash>`. Reflog không khôi phục được thay đổi chưa commit.\n\n---\n\n## 💻 Command\n```bash\ngit reflog\ngit branch <tên-nhánh-cứu-hộ> <commit-hash>\n```\n\nTrong Git thật có thể reset tới một entry reflog hoặc tạo nhánh trực tiếp từ entry đó. Các lệnh này có thể ghi đè file chưa commit; bài thực hành dùng cách ít rủi ro hơn là tạo nhánh theo hash đã kiểm tra.\n\n---\n\n## 🔍 Giải thích command\n- `git reflog`: Bước 1 tra cứu tọa độ hash của commit trước khi tai nạn xảy ra.\n- `git branch <nhánh-mới> <hash>`: Cách an toàn nhất: tạo một nhánh mới cắm chốt ngay tại commit vừa tìm thấy.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy thêm reset trước khi kiểm tra**: Có thể làm khó việc đọc lịch sử gần nhất; dừng và xem `git reflog` trước khi thay đổi ref thêm.\n2. **Cho rằng mọi commit sẽ luôn còn trong kho**: Reflog có thể hết hạn và object unreachable có thể bị dọn dẹp; sao lưu hoặc hỏi quản trị viên nếu dữ liệu quan trọng.\n3. **Cố tình dùng reset hard để cứu hộ thay vì tạo nhánh mới**: Tạo nhánh mới luôn an toàn nhất vì không làm xáo trộn nhánh hiện tại.\n\n---\n\n## 🧪 Lab\nBài này thao tác reset trên kho thử nghiệm riêng; không dùng file chứa mật khẩu hoặc dữ liệu thật.\n1. Tạo commit nền có `README.md`, sau đó tạo commit `demo-note` thêm `demo-note.txt`.\n2. Ghi lại mã commit `demo-note` bằng `git log --oneline -2`.\n3. Chạy `git reset --hard HEAD~1`. File demo biến khỏi Working Tree và commit không còn trên nhánh hiện tại.\n4. Chạy `git reflog`, tìm mã commit `demo-note`, rồi chạy `git branch rescue <hash>`.\n5. Chạy `git switch rescue` và xác nhận `demo-note.txt` xuất hiện. Nếu chưa thấy commit trong reflog, dừng; đừng đoán hash.\n\n---\n\n## 💡 Hint\n> Khi đã xác minh hash, tạo nhánh cứu hộ thường ít rủi ro hơn việc di chuyển nhánh hiện tại bằng `reset --hard`.\n\n---\n\n## ✅ Validation\n- Nhánh `rescue` trỏ đúng commit `demo-note` và file đã commit xuất hiện trên nhánh đó.\n- Không suy ra từ kết quả này rằng reflog có thể cứu file chưa commit hoặc mọi commit vô thời hạn.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng cứu hộ dữ liệu với reflog.\n\n---\n\n## 🔥 Challenge\nKhám phá lệnh `git fsck --lost-found` để quét toàn bộ cơ sở dữ liệu và tìm ra tất cả các blob và commit mồ côi (dangling objects) trong kho lưu trữ.\n\n---\n\n## 📚 Tổng kết\n- Commit bị mất trong Git thực chất chỉ bị ngắt kết nối con trỏ chứ chưa bị xóa vật lý.\n- Sử dụng `git reflog` để định vị chính xác mã hash của commit trước thời điểm tai nạn.\n- Tạo nhánh trỏ tới commit tìm được bằng `git branch <tên-nhánh> <commit-hash>`; xác minh hash trước khi chạy.\n",
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
        "explanation": "`git branch <tên-nhánh> <hash>` tạo ref mới trỏ tới commit. Hãy xác minh hash và tên nhánh trước khi chạy."
      },
      {
        "id": "q2",
        "question": "Nếu bạn vừa lỡ tay gõ `git branch -D feature-x` xóa mất nhánh khi chưa merge, bạn có thể cứu lại được không?",
        "type": "single",
        "options": [
          {
            "text": "Có thể cứu nếu tìm được commit đỉnh nhánh trong reflog và object vẫn còn; hãy tạo nhánh mới trỏ tới commit đó",
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
        "explanation": "Xóa nhánh bỏ ref của nhánh. Nếu reflog còn entry và commit object chưa bị dọn, có thể tạo ref mới trỏ tới commit đó."
      },
      {
        "id": "q3",
        "question": "Sau khi tìm được commit bị mất trong reflog, cách nào giữ commit đó mà không di chuyển nhánh hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "git branch rescue <commit-hash>",
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
        "explanation": "Tạo nhánh mới lưu một tham chiếu tới commit tìm được. Trước khi dùng reset hard, hãy kiểm tra trạng thái làm việc vì lệnh có thể ghi đè chỉnh sửa chưa commit."
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
        "explanation": "Reflog được đánh số theo thứ tự mới đến cũ; thao tác làm đổi ref có thể đổi số thứ tự. Hãy đọc và ghi lại hash cần tìm trước khi làm bước tiếp theo."
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
        "explanation": "Lệnh này tạo thêm ref và không di chuyển ref của nhánh hiện tại. Kiểm tra hash trước để tránh neo nhánh mới vào commit nhầm."
      }
    ]
  }
};
export default lesson;
