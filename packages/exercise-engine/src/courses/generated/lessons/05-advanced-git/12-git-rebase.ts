import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-git-rebase",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "12-git-rebase",
    "title": "git rebase",
    "level": "advanced",
    "duration": 35,
    "xp": 110,
    "prerequisites": [
      "11-rebase-concept"
    ],
    "objectives": [
      "Thực thi thành thạo câu lệnh `git rebase <upstream>` để đồng bộ nhánh tính năng với nhánh chính.",
      "Khắc cốt ghi tâm \"Quy tắc vàng của Rebase\" (The Golden Rule of Rebasing): Không bao giờ rebase trên nhánh công khai.",
      "Hiểu rõ quy trình xử lý khi cần cập nhật nhánh sau khi đã rebase bằng `git push --force-with-lease`.",
      "Định hình thói quen giữ lịch sử dự án luôn tinh gọn trước khi tạo Pull Request."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git rebase",
      "rebase branch",
      "rebase upstream",
      "quy tac vang rebase",
      "golden rule rebase"
    ],
    "commands": [
      "git fetch origin",
      "git rebase origin/main",
      "git push --force-with-lease origin <tên-nhánh>",
      "git rebase --abort"
    ]
  },
  "content": "# git rebase\n\n---\n\n## 🎯 Mục tiêu\n- Thực thi thành thạo câu lệnh `git rebase <upstream>` để đồng bộ nhánh tính năng với nhánh chính.\n- Khắc cốt ghi tâm \"Quy tắc vàng của Rebase\" (The Golden Rule of Rebasing): Không bao giờ rebase trên nhánh công khai.\n- Hiểu rõ quy trình xử lý khi cần cập nhật nhánh sau khi đã rebase bằng `git push --force-with-lease`.\n- Định hình thói quen giữ lịch sử dự án luôn tinh gọn trước khi tạo Pull Request.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git rebase <base>\n- **Nói dễ hiểu**: Lệnh nhấc các commit riêng của nhánh tính năng đặt nối tiếp lên trên đỉnh mới nhất của nhánh đích.\n- **Ví dụ**: `git rebase main` khi đang đứng ở nhánh `feature` để đón nhận các commit mới nhất từ main.\n- **Đừng nhầm**: Tái tạo lại commit với mã hash mới; không giữ nguyên mã SHA cũ của nhánh tính năng.\n\n### the golden rule of rebase\n- **Nói dễ hiểu**: Quy tắc cấm kỵ: Tuyệt đối không bao giờ rebase trên các nhánh công khai dùng chung với người khác.\n- **Ví dụ**: Không bao giờ gõ rebase khi đang đứng ở nhánh `main` hay nhánh develop chung của cả nhóm.\n- **Đừng nhầm**: Chỉ dùng rebase trên nhánh tính năng cá nhân của riêng bạn trước khi mở Pull Request.\n\n### --force-with-lease\n- **Nói dễ hiểu**: Tùy chọn đẩy code cưỡng chế an toàn, chỉ cho phép ghi đè nếu remote chưa có ai khác đẩy commit mới chen ngang.\n- **Ví dụ**: `git push --force-with-lease origin feat/login` sau khi vừa rebase nhánh cá nhân xong.\n- **Đừng nhầm**: An toàn hơn nhiều so với `--force` mù quáng vốn xóa đè không cần kiểm tra.\n\n---\n\n## 📖 Định nghĩa\n`git rebase <base-branch>` là câu lệnh tái cơ sở nhánh trong Git. Khi chạy trên nhánh tính năng, Git tìm commit tổ tiên chung, tạm lưu các commit riêng của tính năng ra bộ nhớ đệm, tua nhánh tính năng về commit mới nhất của nhánh cơ sở (ví dụ `main`), rồi lần lượt áp dụng từng commit lên đỉnh mới thành một chuỗi thẳng tắp.\n\n---\n\n## 💡 Tại sao cần\nNhánh tính năng của bạn liên tục bị tụt lại so với nhánh chính trong quá trình code. Nếu liên tục merge main vào nhánh tính năng, lịch sử sẽ bị ô nhiễm bởi các commit gộp rác. `git rebase` giúp cập nhật toàn bộ thay đổi mới từ main vào nhánh làm việc thanh lịch, giải quyết xung đột sớm và tạo PR sạch đẹp.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung bạn đang xếp hàng thanh toán tại siêu thị với giỏ 3 món hàng (3 commit). Thu ngân mở thêm một quầy ưu tiên mới thông thoáng hơn (nhánh main vừa cập nhật). Bạn nhấc giỏ hàng sang đứng tiếp nối vào cuối dòng người của quầy mới (`git rebase`). Quá trình thanh toán diễn ra trơn tru mà không cản trở ai.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình 3 bước của git rebase main:\nBước 1: Tìm tổ tiên chung C và lưu tạm F1, F2 ra bộ đệm.\nBước 2: Dịch chuyển con trỏ feature tới vị trí M2 của main.\nBước 3: Lần lượt áp dụng F1 tạo thành F1', áp dụng F2 tạo thành F2'.\n\nC ──► M1 ──► M2 (main)\n                └──► F1' ──► F2' (feature sau khi rebase)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nLập trình viên Thành đang phát triển nhánh `feat/dark-mode`. Nhánh `main` trên kho chứa đã có thêm 4 commit mới từ đồng nghiệp. Thành muốn cập nhật code mới trước khi mở PR nên mở terminal gõ: `git fetch origin`, sau đó chạy: `git rebase origin/main`. Git tự động tua nhánh của Thành đến commit mới nhất của main rồi cấy lần lượt các commit giao diện tối lên đỉnh.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit fetch origin\ngit rebase origin/main\ngit push --force-with-lease origin <tên-nhánh>\ngit rebase --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git fetch origin`: Tải các commit mới nhất trên máy chủ về kho lưu trữ cục bộ.\n- `git rebase origin/main`: Dời gốc nhánh hiện tại lên đỉnh của nhánh origin/main.\n- `git push --force-with-lease`: Cập nhật nhánh lên server an toàn sau khi rebase (chỉ ghi đè nếu không có ai khác push chen ngang).\n- `git rebase --abort`: Hủy bỏ hoàn toàn phiên rebase nếu gặp sự cố phức tạp và trở về trạng thái ban đầu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Vi phạm Quy tắc vàng của Rebase**: Chạy rebase trên nhánh dùng chung như main hoặc develop khiến lịch sử của cả nhóm bị phá vỡ.\n2. **Dùng git push --force bừa bãi**: Có nguy cơ xóa đè commit mới mà đồng nghiệp vừa đẩy lên cùng nhánh.\n3. **Hoảng loạn khi Git tạm ngưng**: Git chỉ đang dừng lại chờ bạn xử lý xung đột dòng code nếu có; sửa xong chỉ cần gõ `git rebase --continue`.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành rebase nhánh tính năng lên main trên terminal.\n1. Tạo nhánh `feat-rebase-demo` từ main và tạo 2 commit.\n2. Chuyển về `main`, tạo 1 commit mới để làm phân kỳ lịch sử.\n3. Chuyển lại sang nhánh `feat-rebase-demo`.\n4. Chạy lệnh `git rebase main` và kiểm tra lịch sử bằng `git log --oneline --graph`.\n\n---\n\n## 💡 Hint & mẹo\n> Ghi nhớ quy tắc vàng: Chỉ rebase trên nhánh cục bộ cá nhân, tuyệt đối không bao giờ rebase trên nhánh công khai dùng chung.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Toàn bộ commit của nhánh tính năng được chuyển lên sau commit đỉnh của nhánh main.\n- Cây lịch sử hiển thị thành một đường thẳng tuyến tính đẹp mắt.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git rebase và quy tắc vàng.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách cấu hình tự động bảo vệ nhánh trên GitHub để ngăn chặn mọi hành vi push force hoặc rebase lên nhánh `main`.\n\n---\n\n## 📝 Tổng kết\n- `git rebase` đưa các commit của nhánh tính năng lên đỉnh mới nhất của nhánh cơ sở.\n- Quy tắc vàng: Tuyệt đối không bao giờ rebase trên các nhánh công khai dùng chung.\n- Luôn ưu tiên sử dụng `git push --force-with-lease` sau khi rebase nhánh cá nhân lên remote.\n",
  "quiz": {
    "id": "quiz-05-12-git-rebase",
    "title": "Trắc nghiệm: git rebase và Quy tắc vàng",
    "questions": [
      {
        "id": "q1",
        "question": "\"Quy tắc vàng của Rebase\" (The Golden Rule of Rebasing) trong Git quy định điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Tuyệt đối không bao giờ được phép rebase trên một nhánh công khai đang có nhiều người cùng làm việc chung",
            "correct": true
          },
          {
            "text": "Mọi commit đều phải được tạo bằng chữ in hoa",
            "correct": false
          },
          {
            "text": "Chỉ được rebase khi có sự cho phép của giám đốc công ty",
            "correct": false
          },
          {
            "text": "Không được phép rebase quá 3 lần trong một ngày",
            "correct": false
          }
        ],
        "explanation": "Rebase viết lại lịch sử; nếu làm trên nhánh chung, các đồng nghiệp kéo code về sẽ bị xung đột nặng nề."
      },
      {
        "id": "q2",
        "question": "Vì sao sau khi thực hiện rebase ở nhánh cá nhân cục bộ, lệnh `git push` thông thường sẽ bị máy chủ từ chối?",
        "type": "single",
        "options": [
          {
            "text": "Vì các commit đã được viết lại với mã hash SHA-1 mới, khiến lịch sử cục bộ và server không còn khớp nhau",
            "correct": true
          },
          {
            "text": "Vì máy chủ GitHub bị quá tải bộ nhớ đệm",
            "correct": false
          },
          {
            "text": "Vì đường truyền mạng Internet bị ngắt kết nối",
            "correct": false
          },
          {
            "text": "Vì tên nhánh của bạn bị đổi thành tên khác",
            "correct": false
          }
        ],
        "explanation": "Commit hash mới tạo ra phân kỳ lịch sử, bắt buộc phải dùng `--force-with-lease` để cập nhật con trỏ nhánh trên remote."
      },
      {
        "id": "q3",
        "question": "Tại sao cờ `--force-with-lease` lại được các chuyên gia khuyến nghị thay thế hoàn toàn cho cờ `-f` (`--force`)?",
        "type": "single",
        "options": [
          {
            "text": "Nó sẽ kiểm tra xem có ai khác vừa đẩy commit mới lên nhánh đó chưa; nếu có, nó từ chối push để bảo vệ code của đồng nghiệp",
            "correct": true
          },
          {
            "text": "Nó tăng tốc độ tải dữ liệu lên đám mây gấp đôi",
            "correct": false
          },
          {
            "text": "Nó tự động mã hóa mật khẩu kho chứa",
            "correct": false
          },
          {
            "text": "Nó giúp giảm chi phí thuê máy chủ",
            "correct": false
          }
        ],
        "explanation": "`--force-with-lease` hoạt động như một khóa an toàn (lease), chỉ cho phép ghi đè nếu remote chưa bị thay đổi bởi người khác."
      },
      {
        "id": "q4",
        "question": "Nếu trong quá trình rebase bạn cảm thấy quá phức tạp và muốn hủy bỏ ngay lập tức để quay về trạng thái an toàn trước đó, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git rebase --abort",
            "correct": true
          },
          {
            "text": "git rebase --cancel",
            "correct": false
          },
          {
            "text": "git undo rebase",
            "correct": false
          },
          {
            "text": "git reset --quit",
            "correct": false
          }
        ],
        "explanation": "`git rebase --abort` dừng toàn bộ tiến trình rebase và đưa nhánh của bạn quay về trạng thái y hệt lúc trước khi gõ lệnh."
      },
      {
        "id": "q5",
        "question": "Sau khi giải quyết xong xung đột và chạy `git add .` trong một bước rebase, lệnh tiếp theo bạn cần thực hiện là gì?",
        "type": "single",
        "options": [
          {
            "text": "git rebase --continue",
            "correct": true
          },
          {
            "text": "git commit -m \"resolve conflict\"",
            "correct": false
          },
          {
            "text": "git push --force",
            "correct": false
          },
          {
            "text": "git rebase --finish",
            "correct": false
          }
        ],
        "explanation": "Khi giải quyết xong conflict trong rebase, dùng `git rebase --continue` để Git áp dụng tiếp các commit còn lại mà không tự tạo commit merge rác."
      }
    ]
  }
};
export default lesson;
