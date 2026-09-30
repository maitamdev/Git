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
  "content": "# Rebase là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững khái niệm và triết lý thiết kế cốt lõi của Rebase trong Git.\n- Hiểu rõ thuật ngữ \"Re-base\" (thay đổi điểm tựa gốc rễ của nhánh tính năng).\n- So sánh chi tiết sự khác nhau về triết lý và cấu trúc cây lịch sử giữa Merge và Rebase.\n- Hiểu rõ khái niệm lịch sử tuyến tính (Linear History) và lợi ích của nó đối với các dự án lớn.\n\n---\n\n## 📖 Định nghĩa\n> `git rebase` (Đổi gốc nhánh) là một trong hai cơ chế hợp nhất mã nguồn quan trọng bậc nhất của Git (bên cạnh `git merge`). Về bản chất, Rebase là quá trình ngắt kết nối các commit của nhánh hiện tại khỏi điểm xuất phát ban đầu, sau đó \"di dời\" và áp dụng lần lượt từng commit đó lên trên đỉnh một commit cơ sở mới (Base Commit). Kết quả là cây lịch sử của bạn được tái cấu trúc thành một đường thẳng tuyến tính hoàn hảo không có vết rẽ nhánh.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các dự án phần mềm có quy mô lớn với hàng chục lập trình viên, nếu ai cũng dùng `git merge` thông thường thì lịch sử Git sẽ nhanh chóng biến thành một \"bát mì spaghetti\" chằng chịt các nút giao cắt nhau và hàng trăm commit merge rác không mang lại giá trị nội dung. Nắm vững tư duy Rebase giúp bạn giữ cho lịch sử phát triển luôn thẳng tắp, dễ đọc, dễ tra cứu bằng `git bisect` và thể hiện đẳng cấp chuyên nghiệp của một kỹ sư Git cao cấp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đang xếp các khối gỗ đồ chơi màu đỏ lên một chiếc bàn gỗ cũ (nhánh main cũ). Trong khi bạn đang xếp dở các khối gỗ đỏ, đồng nghiệp mang đến một chiếc bàn kính mới tinh và đặt các khối gỗ màu xanh lên đó (main mới cập nhật). Thay vì dùng dây buộc nối chiếc bàn cũ vào chiếc bàn mới (Merge Commit), bạn nhẹ nhàng nhấc toàn bộ chồng khối gỗ đỏ của mình sang đặt tiếp nối ngay ngắn lên trên đỉnh của các khối gỗ xanh trên chiếc bàn mới (`git rebase`). Bạn có một tòa tháp thẳng đứng tuyệt đẹp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nSo sánh trực quan giữa Merge và Rebase:\nLịch sử phân kỳ ban đầu:\nBase ──► M1 ──► M2 (main)\n  └──► F1 ──► F2 (feature)\n\nKết quả khi MERGE: (Sinh ra nút hợp nhất M3 hình thoi)\nBase ──► M1 ──► M2 ──────► M3 (main)\n  └──► F1 ──► F2 ────────┘\n\nKết quả khi REBASE feature lên main: (Đường thẳng tắp tuyến tính!)\nBase ──► M1 ──► M2 (main) ──► F1' ──► F2' (feature)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm phát triển hệ thống lõi ngân hàng quy định mọi nhánh tính năng trước khi gửi Pull Request đều phải rebase lên nhánh `main` mới nhất. Kỹ sư Hoàng sau 3 ngày phát triển nhánh `feat/biometric` nhận thấy nhánh main đã tiến thêm 10 commit mới do các nhóm khác hoàn thành. Thay vì gõ merge làm sinh ra commit thừa \"Merge branch main into feat/biometric\", Hoàng thực hiện rebase. Nhánh của Hoàng được nâng bổng lên, đặt tiếp nối mượt mà vào đuôi commit thứ 10 của main. Cây lịch sử dự án hoàn toàn thẳng tắp và rõ ràng như một cuốn tiểu thuyết liền mạch.\n\n---\n\n## 💻 Command\n```bash\ngit switch <nhánh-tính-năng>\ngit fetch origin\ngit rebase origin/main\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch <feature>`: Chuyển về nhánh tính năng bạn muốn di chuyển điểm tựa.\n- `git fetch origin`: Cập nhật các commit mới nhất từ máy chủ từ xa về máy cá nhân.\n- `git rebase origin/main`: Dời các commit của nhánh tính năng lên trên đỉnh mới nhất của nhánh origin/main.\n- `git log --graph`: Chiêm ngưỡng cây lịch sử thẳng tắp không có các nút giao rác.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Rebase làm mất mã nguồn**:  Rebase áp dụng lại toàn bộ commit, mã nguồn được tích hợp đầy đủ.\n2. **Nhầm lẫn giữa Rebase nhánh tính năng lên main và Rebase main vào tính năng.**: Nhầm lẫn giữa Rebase nhánh tính năng lên main và Rebase main vào tính năng.\n3. **Áp dụng Rebase trên các nhánh dùng chung đã xuất bản công khai (Vi phạm Quy tắc vàng của Rebase).**: Áp dụng Rebase trên các nhánh dùng chung đã xuất bản công khai (Vi phạm Quy tắc vàng của Rebase).\n\n---\n\n## 🧪 Lab\n1. Tạo một nhánh mới `demo-rebase` từ main và tạo 2 commit.\n2. Chuyển về `main` và tạo 1 commit độc lập để tạo ra sự phân kỳ chữ Y.\n3. Chuyển lại sang `demo-rebase` và quan sát sơ đồ bằng `git log --graph --oneline --all`.\n4. Chạy lệnh `git rebase main` và quan sát cây lịch sử biến thành một đường thẳng.\n\n---\n\n## 💡 Hint\n> Rebase làm sạch lịch sử bằng cách viết lại các commit thành đường thẳng tuyến tính.\n\n---\n\n## ✅ Validation\n- Hiểu rõ triết lý đổi gốc nhánh và phân biệt chuẩn xác sự khác nhau giữa Merge và Rebase.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và triết lý của Git Rebase.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt cốt lõi về bản chất giữa việc \"lưu giữ lịch sử như nó đã diễn ra\" (Merge) và \"kể lại câu chuyện lịch sử một cách hoàn hảo\" (Rebase).\n\n---\n\n## 📚 Tổng kết\n- Rebase thay đổi điểm tựa gốc (Base Commit) của nhánh hiện tại lên đỉnh nhánh đích.\n- Loại bỏ hoàn toàn các commit merge không cần thiết, tạo lịch sử tuyến tính thẳng tắp.\n- Giúp dự án dễ đọc, dễ bảo trì và thuận tiện cho việc truy vết lỗi tự động.\n",
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
            "text": "Tạo ra lịch sử tuyến tính thẳng tắp (Linear History), loại bỏ hoàn toàn các commit merge rác không cần thiết",
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
        "explanation": "Lịch sử dạng đường thẳng tuyến tính giúp việc đọc hiểu dòng thời gian và tìm lỗi bằng bisect thuận tiện hơn rất nhiều."
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
      }
    ]
  }
};
export default lesson;
