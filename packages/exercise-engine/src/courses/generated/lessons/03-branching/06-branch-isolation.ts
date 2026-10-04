import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-branch-isolation",
  "moduleId": "03-branching",
  "metadata": {
    "id": "06-branch-isolation",
    "title": "Thay đổi đã commit được giữ riêng theo nhánh",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "04-git-switch"
    ],
    "objectives": [
      "Giải thích vì sao commit trên nhánh tính năng chưa xuất hiện trên main.",
      "Tạo commit trên nhánh thử nghiệm rồi so sánh với main.",
      "Nhận biết sửa đổi chưa commit có thể còn đi theo khi chuyển nhánh."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch isolation",
      "cach ly nhanh",
      "lich su phan ky"
    ],
    "commands": [
      "git switch -c <nhánh-thử-nghiệm>",
      "git add <file>",
      "git commit -m \"test: add isolated file\"",
      "git switch main",
      "git status"
    ]
  },
  "content": "# Thay đổi đã commit được giữ riêng theo nhánh\n\n---\n\n## 🎯 Mục tiêu\n- Thấu suốt cơ chế cô lập tuyệt đối của các commit trên từng nhánh riêng biệt.\n- Thực hành tạo commit trên nhánh thử nghiệm và kiểm chứng sự vô hình của nó đối với nhánh `main`.\n- Phân biệt rõ rệt giữa thay đổi đã commit (được cách ly) và sửa đổi dở dang chưa commit (có thể rò rỉ khi đổi nhánh).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Cách ly thay đổi đã commit\n- **Nói dễ hiểu:** Quy tắc các commit mới tạo sẽ được gắn chặt vào nhánh đang chọn; các nhánh khác không tự động cập nhật theo.\n- **Ví dụ:** Nhánh `feature-chat` có commit thêm `chat.js`, nhưng khi bạn chuyển về `main` thì file `chat.js` hoàn toàn không xuất hiện.\n- **Đừng nhầm:** Quy tắc cách ly này chỉ áp dụng cho code đã commit; các chỉnh sửa dở dang chưa commit có thể sẽ đi theo bạn khi đổi nhánh.\n\n### Lịch sử phân kỳ\n- **Nói dễ hiểu:** Hiện tượng hai nhánh cùng phát triển độc lập và tự tạo ra các commit riêng biệt sau một mốc commit chung trong quá khứ.\n- **Ví dụ:** Nhánh `main` có thêm commit sửa lỗi bảo mật, trong khi nhánh `feature` có thêm commit giao diện mới.\n- **Đừng nhầm:** Phân kỳ là trạng thái hoàn toàn lành mạnh và bình thường của mọi dự án thực tế trước khi tiến hành bước gộp code.\n\n### Hợp nhất (merge)\n- **Nói dễ hiểu:** Thao tác kết hợp lịch sử và nội dung từ một nhánh tính năng đưa trở lại vào nhánh chính của dự án.\n- **Ví dụ:** Sau khi tính năng chat chạy ổn định, Tech Lead thực hiện merge nhánh `feature-chat` vào nhánh `main`.\n- **Đừng nhầm:** Mã nguồn không bao giờ tự động gộp vào nhau; việc hợp nhất luôn đòi hỏi một quyết định thao tác có chủ đích của con người.\n\n---\n\n## 📖 Định nghĩa\nTính cô lập của nhánh (Branch Isolation) là nguyên lý cốt lõi của Git, bảo đảm rằng mọi commit tạo ra trên một nhánh chỉ thuộc về riêng nhánh đó và hoàn toàn vô hình đối với các nhánh khác. Các nhánh chỉ chia sẻ chung lịch sử cho tới điểm rẽ nhánh (tổ tiên chung); từ đó trở đi, mỗi nhánh phát triển trong thế giới riêng cho tới khi có lệnh hợp nhất chủ đích.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có tính năng cách ly tuyệt đối này, bạn sẽ không bao giờ dám thử nghiệm các giải pháp kiến trúc mạo hiểm vì sợ làm hỏng mã nguồn đang chạy của công ty. Tính cô lập cho phép nhiều lập trình viên cùng làm việc trên cùng một tệp tin ở các nhánh khác nhau mà không hề can thiệp hay làm gián đoạn công việc của nhau, mở ra khả năng cộng tác quy mô lớn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng mỗi nhánh là một vũ trụ song song trong truyện khoa học viễn tưởng. Khi bạn bước sang nhánh `feature-chat` và xây một tòa nhà (commit), tòa nhà đó chỉ tồn tại trong vũ trụ của bạn. Khi bạn bước ngược về vũ trụ `main`, bãi đất đó vẫn trống trải như ngày bạn rời đi. Hai vũ trụ chỉ giao nhau khi bạn chủ động kích hoạt cổng hợp nhất (merge).\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ CÔ LẬP CỦA CÁC NHÁNH ĐỘC LẬP:\n\n                   ┌─── (Commit C4: thêm chat.js) ◄── [feature-chat]\n(C1) ── (C2) ── (C3)\n                   └─── (Commit C5: sửa header)   ◄── [main]\n\n- Đứng ở `feature-chat`: Thấy C1, C2, C3, C4. (Có chat.js)\n- Đứng ở `main`:         Thấy C1, C2, C3, C5. (KHÔNG có chat.js!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn nhận nhiệm vụ thử nghiệm chuyển đổi toàn bộ giao diện sang Dark Mode trên nhánh `feature/dark-mode`. Bạn thêm 5 commit đổi màu CSS và cấu hình giao diện. Khi chuyển về `main`, giao diện ứng dụng vẫn sáng trưng bình thường như chưa hề có cuộc thử nghiệm. Trưởng nhóm có thể xem xét bản thử nghiệm của bạn mà khách hàng dùng `main` không hề bị ảnh hưởng.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c test-isolation\ngit add secret-test.txt\ngit commit -m \"test: add isolated file\"\ngit switch main\ngit status\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c test-isolation`: Tạo không gian làm việc độc lập mới.\n- `git add` và `git commit`: Đóng gói file vào snapshot của riêng nhánh `test-isolation`.\n- `git switch main`: Quay về nhánh chính; Git lập tức cập nhật lại thư mục làm việc, ẩn file vừa tạo trên nhánh kia đi.\n- `git status`: Xác nhận nhánh `main` hoàn toàn sạch sẽ và không hề chứa file của nhánh thử nghiệm.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng file biến mất là bị mất code**: Khi switch về `main` thấy file vừa tạo biến mất, nhiều bạn hoảng sợ; chỉ cần gõ switch trở lại nhánh thử nghiệm là file sẽ hiện ra nguyên vẹn!\n2. **Nghĩ commit nhánh con tự chạy sang `main`**: Nhiều bạn mới tự hỏi sao commit trên nhánh con rồi mà xem ở `main` không thấy; bạn bắt buộc phải thực hiện thao tác merge!\n3. **Quên commit trước khi chuyển nhánh**: Thay đổi chưa commit có thể bị Git mang theo sang nhánh mới, làm lẫn lộn code giữa hai nhánh.\n\n---\n\n## 🧪 Lab\n1. Chạy `git switch -c test-isolation` để bước vào nhánh thử nghiệm.\n2. Tạo file `secret-test.txt` với nội dung `Dữ liệu bí mật của nhánh thử nghiệm`.\n3. Chạy `git add secret-test.txt` rồi `git commit -m \"test: add isolated file\"`.\n4. Chạy `git switch main`; mở thư mục kiểm tra và xác nhận `secret-test.txt` hoàn toàn không có mặt trên `main`.\n5. Chạy `git switch test-isolation` và chứng kiến tệp tin lập tức xuất hiện trở lại.\n\n---\n\n## 💡 Hint\n> Chuyển nhánh thực chất là yêu cầu Git thay đổi ống kính nhìn vào snapshot khác nhau; không có dữ liệu đã commit nào bị xóa!\n\n---\n\n## ✅ Validation\n- File `secret-test.txt` hiện diện trên nhánh `test-isolation` nhưng vắng mặt trên nhánh `main`.\n- Lệnh `git status` sạch sẽ trên cả hai nhánh.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để củng cố nguyên lý cách ly nhánh và sự khác biệt giữa commit nhánh riêng với mã nguồn chung.\n\n---\n\n## 🔥 Challenge\nTạo tiếp một commit mới trên nhánh `main`. Sau đó dùng lệnh `git log --oneline --graph --all` để chiêm ngưỡng đồ thị phân kỳ rực rỡ thể hiện hai con đường riêng biệt của hai nhánh!\n\n---\n\n## 📚 Tổng kết\n- Mọi commit mới luôn được neo chặt vào nhánh hiện hành mà bạn đang đứng.\n- Chuyển nhánh không bao giờ làm mất các commit ở nhánh khác.\n- Tính cô lập giúp bạn thoải mái sáng tạo thử nghiệm mà không sợ làm sập hệ thống chính.\n",
  "quiz": {
    "id": "quiz-03-06-branch-isolation",
    "title": "Trắc nghiệm: Thay đổi trên các nhánh",
    "questions": [
      {
        "id": "q1",
        "question": "Bạn commit `chat.js` trên `feature-chat`, rồi chuyển về `main`. Vì sao tệp chưa xuất hiện trên `main`?",
        "type": "single",
        "options": [
          {
            "text": "Commit đó chưa thuộc lịch sử mà nhánh `main` trỏ tới",
            "correct": true
          },
          {
            "text": "Git tự đổi tên tệp thành `.git/chat.js`",
            "correct": false
          },
          {
            "text": "`git switch` xóa mọi commit mới",
            "correct": false
          },
          {
            "text": "`main` chỉ lưu tệp HTML",
            "correct": false
          }
        ],
        "explanation": "Mỗi nhánh trỏ tới lịch sử riêng; commit tính năng cần được hợp nhất trước khi nằm trong lịch sử main."
      },
      {
        "id": "q2",
        "question": "Khi chuyển về `main`, commit đã tạo trên `feature-chat` sẽ ra sao?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn thuộc lịch sử của nhánh tính năng",
            "correct": true
          },
          {
            "text": "Bị xóa khỏi toàn bộ repository",
            "correct": false
          },
          {
            "text": "Tự chuyển thành commit trên `main`",
            "correct": false
          },
          {
            "text": "Được gửi tự động lên GitHub",
            "correct": false
          }
        ],
        "explanation": "Chuyển nhánh thay đổi vị trí làm việc; thao tác đó không xóa commit trên nhánh cũ."
      },
      {
        "id": "q3",
        "question": "Bạn sửa một tệp nhưng chưa commit rồi chuyển nhánh. Điều gì có thể xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Git có thể giữ sửa đổi đó nếu chuyển nhánh không ghi đè nội dung",
            "correct": true
          },
          {
            "text": "Mọi sửa đổi chưa commit luôn bị xóa",
            "correct": false
          },
          {
            "text": "Sửa đổi tự động được commit lên cả hai nhánh",
            "correct": false
          },
          {
            "text": "Repository tự chuyển sang detached HEAD",
            "correct": false
          }
        ],
        "explanation": "Thay đổi chưa commit không được cách ly như commit; Git có thể mang nó theo nếu an toàn."
      },
      {
        "id": "q4",
        "question": "Bạn muốn biết có thay đổi chưa commit nào trước khi chuyển nhánh. Nên chạy lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git status",
            "correct": true
          },
          {
            "text": "git branch -D",
            "correct": false
          },
          {
            "text": "git remote -v",
            "correct": false
          },
          {
            "text": "git log --oneline",
            "correct": false
          }
        ],
        "explanation": "`git status` cho biết nhánh hiện tại và các tệp đang staged, chưa staged hoặc untracked."
      },
      {
        "id": "q5",
        "question": "Tính năng trên nhánh riêng đã được kiểm tra và muốn đưa vào `main`. Cần làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Đứng trên nhánh nhận thay đổi rồi thực hiện merge",
            "correct": true
          },
          {
            "text": "Chỉ đổi tên nhánh feature thành `main`",
            "correct": false
          },
          {
            "text": "Chạy `git status` nhiều lần",
            "correct": false
          },
          {
            "text": "Xóa commit cuối của `main`",
            "correct": false
          }
        ],
        "explanation": "Để lịch sử tính năng đi vào main, nhóm cần chủ động chọn thao tác tích hợp phù hợp."
      },
      {
        "id": "q6",
        "question": "Lịch sử hai nhánh được gọi là phân kỳ khi nào?",
        "type": "single",
        "options": [
          {
            "text": "Cả hai nhánh có commit riêng sau một commit chung",
            "correct": true
          },
          {
            "text": "Một nhánh không có commit nào",
            "correct": false
          },
          {
            "text": "Tệp `.gitignore` có hai dòng",
            "correct": false
          },
          {
            "text": "Người dùng tạo hai bản sao thư mục",
            "correct": false
          }
        ],
        "explanation": "Hai nhánh phân kỳ khi cùng đi từ một mốc chung rồi mỗi nhánh có commit riêng."
      }
    ]
  }
};
export default lesson;
