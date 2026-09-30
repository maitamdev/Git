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
  "content": "# git rebase\n\n---\n\n## 🎯 Mục tiêu\n- Thực thi thành thạo câu lệnh `git rebase <upstream>` để đồng bộ nhánh tính năng với nhánh chính.\n- Khắc cốt ghi tâm \"Quy tắc vàng của Rebase\" (The Golden Rule of Rebasing): Không bao giờ rebase trên nhánh công khai.\n- Hiểu rõ quy trình xử lý khi cần cập nhật nhánh sau khi đã rebase bằng `git push --force-with-lease`.\n- Định hình thói quen giữ lịch sử dự án luôn tinh gọn trước khi tạo Pull Request.\n\n---\n\n## 📖 Định nghĩa\n> `git rebase <base-branch>` là câu lệnh thực thi tái cơ sở nhánh trong Git. Khi bạn đang đứng trên nhánh tính năng và chạy lệnh này, Git sẽ tìm commit tổ tiên chung gần nhất (Common Ancestor), tạm thời lưu các commit riêng của nhánh tính năng vào bộ nhớ đệm, sau đó tua con trỏ nhánh tính năng về mốc commit mới nhất của nhánh cơ sở (ví dụ `main`), rồi lần lượt áp dụng từng commit được lưu tạm lên đỉnh mới. Kết quả mang lại một chuỗi commit nối tiếp tuyến tính mượt mà.\n\n---\n\n## 🤔 Tại sao cần?\nTrong văn hóa phát triển phần mềm chuẩn mực, việc nhánh tính năng của bạn bị tụt hậu so với nhánh chính diễn ra liên tục hàng giờ. Nếu bạn liên tục merge main vào nhánh tính năng, lịch sử của bạn sẽ bị rác bởi hàng loạt commit \"Merge branch main into feature\". Câu lệnh `git rebase` giúp bạn cập nhật toàn bộ những tiến bộ mới nhất của nhánh chính vào nhánh làm việc của mình một cách thanh lịch, giúp việc giải quyết xung đột diễn ra sớm và tạo điều kiện cho một Pull Request cực kỳ sạch đẹp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang đứng xếp hàng tại quầy thanh toán của một siêu thị. Bạn đã chọn được 3 món hàng trong giỏ (3 commit của feature branch). Bỗng nhiên nhân viên thu ngân mở một lối đi ưu tiên mới rộng rãi hơn và mời bạn chuyển sang đó (nhánh main mới cập nhật). Bạn không đứng giằng co giữa hai lối đi, mà nhấc giỏ hàng của mình sang đứng tiếp nối vào cuối dòng người của lối đi mới (`git rebase`). Quá trình thanh toán diễn ra trơn tru mà không làm gián đoạn bất kỳ ai.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình 3 bước của git rebase main:\nBước 1: Tìm tổ tiên chung C và lưu tạm F1, F2 ra bộ đệm.\nBước 2: Dịch chuyển con trỏ feature tới vị trí M2 của main.\nBước 3: Lần lượt áp dụng F1 tạo thành F1', áp dụng F2 tạo thành F2'.\n\nC ──► M1 ──► M2 (main)\n                └──► F1' ──► F2' (feature sau khi rebase)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Thành đang phát triển nhánh `feat/dark-mode` trên máy tính cá nhân. Trong thời gian Thành làm việc, nhánh `main` trên kho chứa đã có thêm 4 commit mới từ các đồng nghiệp khác. Thành muốn cập nhật các commit mới này vào nhánh của mình trước khi mở PR. Thành mở console và gõ: `git fetch origin`, sau đó chạy: `git rebase origin/main`. Git tự động tua nhánh của Thành đến commit mới nhất của main rồi cấy lần lượt các commit giao diện tối lên đỉnh. Thành kiểm tra lại toàn bộ ứng dụng và thấy mọi tính năng mới đều hoạt động hòa hợp hoàn hảo.\n\n---\n\n## 💻 Command\n```bash\ngit fetch origin\ngit rebase origin/main\ngit push --force-with-lease origin <tên-nhánh>\ngit rebase --abort\n```\n\n---\n\n## 🔍 Giải thích command\n- `git fetch origin`: Tải các commit mới nhất trên máy chủ về kho lưu trữ cục bộ.\n- `git rebase origin/main`: Dời gốc nhánh hiện tại lên đỉnh của nhánh origin/main.\n- `git push --force-with-lease`: Cập nhật nhánh lên server an toàn sau khi rebase (chỉ ghi đè nếu không có ai khác push chen ngang).\n- `git rebase --abort`: Hủy bỏ hoàn toàn phiên rebase nếu gặp sự cố phức tạp và trở về trạng thái ban đầu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Vi phạm Quy tắc vàng của Rebase**:  Chạy rebase trên nhánh dùng chung như main hoặc develop khiến lịch sử của cả nhóm bị phá vỡ.\n2. **Sử dụng git push --force bừa bãi thay vì --force-with-lease**:  Có nguy cơ vô tình xóa đè commit mới của đồng nghiệp trên cùng nhánh.\n3. **Hoảng loạn khi thấy Git tạm ngưng rebase**:  Thực chất Git chỉ đang chờ bạn xử lý xung đột nếu có mâu thuẫn dòng code.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh `feat-rebase-demo` từ main và tạo 2 commit.\n2. Chuyển về `main`, tạo 1 commit mới để làm phân kỳ lịch sử.\n3. Chuyển lại sang nhánh `feat-rebase-demo`.\n4. Chạy lệnh `git rebase main` và kiểm tra lịch sử bằng `git log --oneline --graph`.\n\n---\n\n## 💡 Hint\n> Nhớ câu thần chú: Chỉ rebase trên nhánh cục bộ cá nhân, không bao giờ rebase trên nhánh công khai dùng chung.\n\n---\n\n## ✅ Validation\n- Thực hiện rebase thành công nhánh tính năng lên đỉnh nhánh main mà không làm mất mát mã nguồn.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git rebase và quy tắc vàng.\n\n---\n\n## 🔥 Challenge\nTại sao cờ `--force-with-lease` lại an toàn hơn rất nhiều so với cờ `--force` truyền thống khi push nhánh sau khi rebase?\n\n---\n\n## 📚 Tổng kết\n- `git rebase` đưa các commit của nhánh tính năng lên đỉnh mới nhất của nhánh cơ sở.\n- Quy tắc vàng: Tuyệt đối không bao giờ rebase trên các nhánh công khai dùng chung.\n- Luôn ưu tiên sử dụng `git push --force-with-lease` sau khi rebase nhánh cá nhân lên remote.\n",
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
      }
    ]
  }
};
export default lesson;
