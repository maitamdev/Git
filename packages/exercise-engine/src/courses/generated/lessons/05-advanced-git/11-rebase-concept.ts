import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-rebase-concept",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "11-rebase-concept",
    "title": "Rebase là gì?",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "10-git-cherry-pick"
    ],
    "objectives": [
      "Nắm vững khái niệm và triết lý thiết kế cốt lõi của Rebase trong Git.",
      "Hiểu rõ thuật ngữ \"Re-base\" (thay đổi điểm tựa gốc rễ của nhánh tính năng).",
      "So sánh chi tiết sự khác nhau về triết lý và cấu trúc cây lịch sử giữa Merge và Rebase.",
      "Hiểu rõ khái niệm lịch sử tuyến tính (Linear History) và lợi ích của nó đối với các dự án lớn."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "rebase concept",
      "rebase la gi",
      "rebase vs merge",
      "tuyen tinh hoa lich su",
      "viet lai lich su",
      "base commit"
    ],
    "commands": [
      "git switch <nhánh-tính-năng>",
      "git fetch origin",
      "git rebase origin/main",
      "git log --oneline --graph"
    ]
  },
  "content": "# Rebase là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm và triết lý thiết kế cốt lõi của Rebase trong Git.\n- Hiểu rõ thuật ngữ \"Re-base\" (thay đổi điểm tựa gốc rễ của nhánh tính năng).\n- So sánh chi tiết sự khác nhau về triết lý và cấu trúc cây lịch sử giữa Merge và Rebase.\n- Hiểu rõ khái niệm lịch sử tuyến tính (Linear History) và lợi ích của nó đối với các dự án lớn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git rebase\n- **Nói dễ hiểu**: Lệnh đổi điểm xuất phát của nhánh tính năng sang đỉnh mới nhất của nhánh chính để tạo thành một đường thẳng.\n- **Ví dụ**: Đang ở nhánh `feat/cart`, chạy `git rebase main` để nâng các commit của mình đặt lên đuôi của `main`.\n- **Đừng nhầm**: Không tạo merge commit hình thoi; Git tính toán lại diff và tái tạo các commit mới trên đỉnh nhánh đích.\n\n### linear history\n- **Nói dễ hiểu**: Lịch sử commit dạng đường thẳng một chiều, không có các nhánh rẽ ngang dọc hay các commit gộp rác.\n- **Ví dụ**: Dùng `git log --graph --oneline` chỉ thấy một cột thẳng tắp từ commit đầu đến commit cuối.\n- **Đừng nhầm**: Không làm mất code; toàn bộ nội dung thay đổi vẫn được bảo toàn nguyên vẹn nhưng sắp xếp theo thứ tự thời gian hợp lý.\n\n### base commit\n- **Nói dễ hiểu**: Điểm tựa gốc rễ nơi nhánh tính năng được tách ra ban đầu từ nhánh cha.\n- **Ví dụ**: Khi rebase, base commit cũ được thay thế bằng commit mới nhất của nhánh đích.\n- **Đừng nhầm**: SHA hash của các commit tính năng sẽ thay đổi vì commit cha của chúng đã bị thay đổi thành base mới.\n\n---\n\n## 📖 Định nghĩa\n`git rebase` lấy các commit riêng của nhánh hiện tại rồi áp dụng lại chúng trên một commit cơ sở mới. Git tạo các commit mới nên mã hash thay đổi. Rebase thường tạo lịch sử tuyến tính trong ví dụ đơn giản; lịch sử có merge commit hoặc patch đã có sẵn cần được xem xét riêng.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các dự án lớn với nhiều lập trình viên, nếu ai cũng dùng `git merge` thông thường thì lịch sử sẽ biến thành \"bát mì spaghetti\" chằng chịt các nút giao cắt và hàng trăm commit merge rác. Rebase giúp giữ lịch sử thẳng tắp, dễ đọc hiểu trình tự thời gian và thuận tiện truy vết lỗi bằng `git bisect`.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang xếp chồng các khối gỗ đỏ lên một chiếc bàn cũ (nhánh main cũ). Đồng nghiệp mang đến chiếc bàn mới tinh đặt các khối gỗ xanh lên đó (main mới cập nhật). Thay vì dùng dây buộc nối chiếc bàn cũ vào bàn mới (Merge Commit), bạn nhẹ nhàng nhấc toàn bộ chồng khối gỗ đỏ sang đặt tiếp nối lên đỉnh các khối gỗ xanh trên bàn mới (`git rebase`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nSo sánh trực quan giữa Merge và Rebase:\nLịch sử phân kỳ ban đầu:\nBase ──► M1 ──► M2 (main)\n  └──► F1 ──► F2 (feature)\n\nKết quả khi MERGE: (Sinh ra nút hợp nhất M3 hình thoi)\nBase ──► M1 ──► M2 ──────► M3 (main)\n  └──► F1 ──► F2 ────────┘\n\nKết quả khi REBASE feature lên main: (Đường thẳng tắp tuyến tính!)\nBase ──► M1 ──► M2 (main) ──► F1' ──► F2' (feature)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm quy định nhánh tính năng cần cập nhật trước khi mở PR. Hoàng đang làm trên `feat/biometric` và `main` có commit mới. Theo quy trình nhóm, Hoàng có thể rebase nhánh tính năng lên `origin/main` để phát lại commit riêng của mình; nếu nhóm muốn giữ lại điểm hợp nhất, có thể chọn merge.\n\n---\n\n## 💻 Command\n```bash\ngit switch <nhánh-tính-năng>\ngit fetch origin\ngit rebase origin/main\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch <feature>`: Chuyển về nhánh tính năng bạn muốn di chuyển điểm tựa.\n- `git fetch origin`: Cập nhật các commit mới nhất từ máy chủ từ xa về máy cá nhân.\n- `git rebase origin/main`: Dời các commit của nhánh tính năng lên trên đỉnh mới nhất của nhánh origin/main.\n- `git log --graph`: Quan sát cấu trúc lịch sử sau khi chọn rebase.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Rebase chỉ đổi nhãn commit**: Git phát lại thay đổi và tạo commit hash mới; conflict hoặc patch đã có sẵn có thể làm kết quả khác dự kiến.\n2. **Nhầm lẫn chiều rebase**: Rebase nhánh tính năng lên main chứ không phải rebase main vào nhánh tính năng.\n3. **Rebase nhánh mà đồng đội đang dựa vào**: Commit hash đổi; hãy theo chính sách nhóm và báo cho người cùng làm trước khi cập nhật nhánh đã chia sẻ.\n\n---\n\n## 🧪 Lab\nCùng tôi tạo một phân kỳ lịch sử nhỏ và trải nghiệm cảm giác duỗi thẳng commit bằng git rebase:\n1. Tạo một nhánh mới `demo-rebase` từ main và tạo 2 commit.\n2. Chuyển về `main` và tạo 1 commit độc lập để tạo ra sự phân kỳ chữ Y.\n3. Chuyển lại sang `demo-rebase` và quan sát sơ đồ bằng `git log --graph --oneline --all`.\n4. Chạy lệnh `git rebase main` và quan sát cây lịch sử biến thành một đường thẳng.\n\n---\n\n## 💡 Hint\n> Rebase phát lại commit trên một base mới. Trước khi làm, xác định ai đang dùng nhánh đó và liệu nhóm muốn rebase hay merge.\n\n---\n\n## ✅ Validation\n- Trong bài lab không có conflict, commit tính năng có cha mới là tip `main`.\n- Hash commit tính năng thay đổi sau khi rebase; so sánh bằng `git log --graph --oneline`.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và triết lý của Git Rebase.\n\n---\n\n## 🔥 Challenge\nSo sánh ưu nhược điểm giữa hai trường phái bảo thủ (True History qua Merge) và trường phái thẩm mỹ (Linear History qua Rebase) trong văn hóa phát triển phần mềm.\n\n---\n\n## 📚 Tổng kết\n- Rebase thay đổi điểm tựa gốc (Base Commit) của nhánh hiện tại lên đỉnh nhánh đích.\n- Loại bỏ hoàn toàn các commit merge không cần thiết, tạo lịch sử tuyến tính thẳng tắp.\n- Giúp dự án dễ đọc, dễ bảo trì và thuận tiện cho việc truy vết lỗi tự động.\n",
  "quiz": {
    "id": "quiz-05-11-rebase-concept",
    "title": "Trắc nghiệm: Khái niệm Git Rebase",
    "questions": [
      {
        "id": "q1",
        "question": "Thuật ngữ \"Re-base\" trong Git phản ánh hành động cốt lõi nào của câu lệnh?",
        "type": "single",
        "options": [
          {
            "text": "Thay đổi điểm tựa gốc ban đầu (base commit) của nhánh tính năng sang một commit đỉnh mới",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ cơ sở dữ liệu database của dự án",
            "correct": false
          },
          {
            "text": "Đổi tên kho lưu trữ trên máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Cài đặt lại Git từ đầu",
            "correct": false
          }
        ],
        "explanation": "Re-base có nghĩa là đặt lại gốc (base) của nhánh tính năng lên đỉnh mới nhất của nhánh đích."
      },
      {
        "id": "q2",
        "question": "Lợi ích thẩm mỹ và kỹ thuật lớn nhất mà Git Rebase mang lại so với Git Merge là gì?",
        "type": "single",
        "options": [
          {
            "text": "Có thể tạo lịch sử tuyến tính, giúp theo dõi các commit đơn giản hơn trong một số quy trình",
            "correct": true
          },
          {
            "text": "Giúp mã nguồn chạy nhanh hơn gấp 10 lần trong môi trường runtime",
            "correct": false
          },
          {
            "text": "Tự động sửa lỗi cú pháp lập trình JavaScript",
            "correct": false
          },
          {
            "text": "Giảm 50% dung lượng tệp tin video trong kho chứa",
            "correct": false
          }
        ],
        "explanation": "Rebase phát lại commit trên nền mới và có thể tạo lịch sử tuyến tính. Merge giữ lại điểm hợp nhất; nhóm chọn cách phù hợp với quy trình."
      },
      {
        "id": "q3",
        "question": "Khi bạn rebase nhánh `feature` lên nhánh `main`, các commit trên nhánh `feature` sẽ như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Chúng được tính toán lại diff và tạo thành các commit hoàn toàn mới (mã SHA-1 mới) trên đỉnh của main",
            "correct": true
          },
          {
            "text": "Chúng giữ nguyên mã SHA-1 cũ 100%",
            "correct": false
          },
          {
            "text": "Chúng bị xóa sạch và chỉ giữ lại commit của main",
            "correct": false
          },
          {
            "text": "Chúng tự động chuyển thành tệp ZIP",
            "correct": false
          }
        ],
        "explanation": "Vì parent commit thay đổi nên Git tái tạo các commit mới với mã hash mới tương ứng."
      },
      {
        "id": "q4",
        "question": "Triết lý cốt lõi của những người ủng hộ trường phái Rebase coi lịch sử Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "Lịch sử là một câu chuyện được biên tập chỉn chu và có trật tự để người khác đọc hiểu",
            "correct": true
          },
          {
            "text": "Lịch sử là cuốn nhật ký thô sơ ghi lại mọi hành động dù lộn xộn đến đâu",
            "correct": false
          },
          {
            "text": "Lịch sử không có giá trị gì sau khi xuất bản",
            "correct": false
          },
          {
            "text": "Lịch sử do phần mềm diệt virus kiểm soát",
            "correct": false
          }
        ],
        "explanation": "Trường phái Rebase coi lịch sử như một tác phẩm hoàn chỉnh cần được biên tập gọn gàng trước khi xuất bản."
      },
      {
        "id": "q5",
        "question": "Nguyên tắc thận trọng nào nên nhớ trước khi rebase commit đã chia sẻ?",
        "type": "single",
        "options": [
          {
            "text": "Tránh rebase commit người khác đã lấy về, trừ khi nhóm đã thống nhất cách phối hợp",
            "correct": true
          },
          {
            "text": "Bắt buộc phải rebase toàn bộ các nhánh trước khi đi ngủ mỗi ngày",
            "correct": false
          },
          {
            "text": "Chỉ được phép chạy lệnh rebase khi không có kết nối Internet",
            "correct": false
          },
          {
            "text": "Không bao giờ được phép rebase các commit có gắn thẻ tag",
            "correct": false
          }
        ],
        "explanation": "Rebase tạo commit mới với hash khác. Nếu người khác đã dựa vào commit cũ, hãy phối hợp trước để tránh phải ghép hai lịch sử lại."
      }
    ]
  }
};
export default lesson;
