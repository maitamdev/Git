import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-fast-forward-merge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "07-fast-forward-merge",
    "title": "Hợp nhất tua nhanh (fast-forward merge)",
    "level": "intermediate",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "06-branch-isolation"
    ],
    "objectives": [
      "Nhận ra khi nhánh hiện tại có thể tiến thẳng tới commit của nhánh cần gộp.",
      "Chạy git merge <nhánh> khi đang đứng trên nhánh nhận thay đổi.",
      "Giải thích vì sao fast-forward không tạo merge commit."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "fast-forward"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "fast-forward",
      "ff merge",
      "hop nhat nhanh",
      "git merge"
    ],
    "commands": [
      "git switch main",
      "git merge <tên-nhánh>",
      "git merge --no-ff <tên-nhánh>"
    ]
  },
  "content": "# Hợp nhất tua nhanh (fast-forward merge)\r\n\r\n---\r\n\r\n## 🎯 Mục tiêu\r\n- Nhận ra khi nhánh hiện tại có thể tiến thẳng tới commit của nhánh cần gộp.\r\n- Chạy `git merge <nhánh>` khi đang đứng trên nhánh nhận thay đổi.\r\n- Giải thích vì sao fast-forward không tạo merge commit.\r\n\r\n---\r\n\r\n## 🧩 Từ khóa hôm nay\r\n\r\n### Fast-forward — tua nhanh con trỏ\r\n- **Nói dễ hiểu:** Nhánh nhận thay đổi chưa có commit riêng kể từ lúc nhánh kia tách ra.\r\n- **Ví dụ:** `main` đứng yên trong lúc `feature` có thêm hai commit.\r\n- **Đừng nhầm:** Git chỉ dịch chuyển con trỏ `main` tới commit mới; không tạo merge commit.\r\n\r\n### Nhánh đích — nơi nhận thay đổi\r\n- **Nói dễ hiểu:** Nhánh bạn đang đứng khi chạy `git merge`.\r\n- **Ví dụ:** Muốn đưa `feature-cart` vào `main`, chuyển sang `main` trước.\r\n- **Đừng nhầm:** Đứng trên `feature-cart` rồi merge `main` sẽ đưa thay đổi theo hướng ngược lại.\r\n\r\n### `--no-ff` — giữ mốc hợp nhất\r\n- **Nói dễ hiểu:** Buộc Git tạo commit hợp nhất dù có thể tua nhanh.\r\n- **Ví dụ:** `git merge --no-ff feature-cart` ghi lại riêng lần tích hợp.\r\n- **Đừng nhầm:** Cờ này không tua nhanh; nó tạo commit có hai cha.\r\n\r\n---\r\n\r\n## 📖 Định nghĩa\r\nFast-forward xảy ra khi commit hiện tại của nhánh đích là tổ tiên của nhánh được gộp. Git có thể đưa con trỏ nhánh đích tới commit mới hơn mà không tạo commit hợp nhất. Nếu hai nhánh đã có commit riêng, điều kiện này không còn đúng; đó là tình huống học ở bài 3-way merge.\r\n\r\n---\r\n\r\n## 🤔 Tại sao cần?\r\nKhi nhánh đích chưa có thay đổi riêng, tua nhanh giữ lịch sử thẳng và dễ đọc. Nếu nhóm muốn lưu dấu một lần tích hợp dù lịch sử có thể đi thẳng, `--no-ff` yêu cầu Git tạo merge commit riêng.\r\n\r\n---\r\n\r\n## 🧠 Mental Model (Mô hình tư duy)\r\nHãy tưởng tượng `main` đang đứng ở cột mốc C3, còn `feature` đã đi tiếp tới C5. Nếu không có con đường khác tiến lên từ C3, `main` chỉ cần chuyển tới C5. Nếu nhóm muốn ghi rõ “ở đây đã tích hợp feature”, dùng `--no-ff` để tạo thêm một mốc hợp nhất.\r\n\r\n---\r\n\r\n## 🖼 Sơ đồ\r\n```text\r\nTrước:\r\nC1 ── C2 ── C3 (main) ── C4 ── C5 (feature)\r\n\r\nSau `git switch main` rồi `git merge feature`:\r\nC1 ── C2 ── C3 ── C4 ── C5 (main, feature)\r\n```\r\n\r\n---\r\n\r\n## 🌎 Ví dụ thực tế\r\nĐức tạo `fix-typo` từ `main`, sửa lỗi chính tả rồi tạo hai commit. Trong lúc đó không có commit mới trên `main`. Đức chuyển về `main`, chạy `git merge fix-typo`; Git có thể đưa `main` tới commit mới nhất của nhánh sửa lỗi mà không tạo commit hợp nhất mới.\r\n\r\n---\r\n\r\n## 💻 Command\r\n```bash\r\ngit switch main\r\ngit merge <tên-nhánh>\r\ngit merge --no-ff <tên-nhánh>\r\n```\r\n\r\n---\r\n\r\n## 🔍 Giải thích command\r\n- `git switch main`: Chọn nhánh sẽ nhận thay đổi.\r\n- `git merge <tên-nhánh>`: Gộp lịch sử của nhánh được nêu vào nhánh hiện tại; Git dùng fast-forward nếu có thể.\r\n- `git merge --no-ff <tên-nhánh>`: Yêu cầu tạo một merge commit thay vì tua nhanh.\r\n\r\n---\r\n\r\n## ⚠️ Sai lầm phổ biến\r\n1. **Đứng trên nhánh nguồn:** Merge sẽ cập nhật nhánh hiện tại, nên kiểm tra `git status` trước.\r\n2. **Chờ merge commit sau fast-forward:** Fast-forward chỉ di chuyển con trỏ; không sinh commit mới.\r\n3. **Cho rằng mọi lần merge đều tua nhanh:** Nếu nhánh đích cũng có commit riêng, Git cần cách hợp nhất khác.\r\n\r\n---\r\n\r\n## 🧪 Lab\r\n1. Chạy `git switch -c ff-demo`.\r\n2. Tạo `feature.js`, ghi một dòng, rồi chạy `git add feature.js` và `git commit -m \"feat: add feature file\"`.\r\n3. Chạy `git switch main`.\r\n4. Chạy `git merge ff-demo`; xác nhận terminal báo `Fast-forward`.\r\n5. Chạy `git log --oneline`; xác nhận commit tính năng nằm trong lịch sử `main`.\r\n\r\n---\r\n\r\n## 💡 Hint\r\n> Đứng trên nhánh nhận thay đổi rồi gọi tên nhánh nguồn trong `git merge`.\r\n\r\n---\r\n\r\n## ✅ Validation\r\n- Lệnh merge hoàn tất và báo `Fast-forward`.\r\n- `git log --oneline` trên `main` có commit `feat: add feature file`.\r\n\r\n---\r\n\r\n## ❓ Quiz\r\nTrả lời các câu hỏi để kiểm tra điều kiện và kết quả của fast-forward.\r\n\r\n---\r\n\r\n## 🔥 Challenge\r\nTạo nhánh tính năng mới từ `main`, commit một tệp, rồi merge bằng `--no-ff`. Dùng `git log --oneline` để tìm commit merge và so sánh với fast-forward ở lab.\r\n\r\n---\r\n\r\n## 📚 Tổng kết\r\n- Fast-forward chỉ xảy ra khi nhánh đích là tổ tiên của nhánh nguồn.\r\n- Chuyển sang nhánh đích trước khi chạy merge.\r\n- `--no-ff` tạo merge commit để lưu dấu lần tích hợp.\r\n",
  "quiz": {
    "id": "quiz-03-07-fast-forward-merge",
    "title": "Trắc nghiệm: Hợp nhất tua nhanh",
    "questions": [
      {
        "id": "q1",
        "question": "Điều kiện nào cho phép Git thực hiện fast-forward từ `feature` vào `main`?",
        "type": "single",
        "options": [
          {
            "text": "Commit hiện tại của `main` là tổ tiên của commit trên `feature`",
            "correct": true
          },
          {
            "text": "Hai nhánh có tên giống nhau",
            "correct": false
          },
          {
            "text": "Repository có ít hơn mười tệp",
            "correct": false
          },
          {
            "text": "Người dùng đã kết nối Internet",
            "correct": false
          }
        ],
        "explanation": "Git có thể tua con trỏ main khi lịch sử của main nằm trên đường dẫn tới commit feature."
      },
      {
        "id": "q2",
        "question": "Fast-forward merge tạo ra thay đổi nào trong lịch sử?",
        "type": "single",
        "options": [
          {
            "text": "Di chuyển con trỏ nhánh đích tới commit mới hơn mà không tạo merge commit",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ commit của nhánh nguồn",
            "correct": false
          },
          {
            "text": "Tạo commit có hai cha trong mọi trường hợp",
            "correct": false
          },
          {
            "text": "Đổi tên nhánh nguồn thành nhánh đích",
            "correct": false
          }
        ],
        "explanation": "Fast-forward đưa nhánh đích tới commit đã có trên nhánh nguồn; không tạo commit mới."
      },
      {
        "id": "q3",
        "question": "Muốn gộp `feature-login` vào `main`, bạn cần đứng trên nhánh nào trước khi chạy `git merge feature-login`?",
        "type": "single",
        "options": [
          {
            "text": "`main`, vì đó là nhánh nhận thay đổi",
            "correct": true
          },
          {
            "text": "`feature-login`, vì merge luôn cập nhật nhánh nguồn",
            "correct": false
          },
          {
            "text": "Nhánh remote `origin`",
            "correct": false
          },
          {
            "text": "Không quan trọng nhánh nào đang chọn",
            "correct": false
          }
        ],
        "explanation": "Lệnh `git merge` cập nhật nhánh hiện tại bằng cách hợp nhất nhánh được nêu làm nguồn."
      },
      {
        "id": "q4",
        "question": "Khi có thể fast-forward nhưng bạn muốn lưu một commit riêng cho lần tích hợp, dùng cờ nào?",
        "type": "single",
        "options": [
          {
            "text": "--no-ff",
            "correct": true
          },
          {
            "text": "--oneline",
            "correct": false
          },
          {
            "text": "--staged",
            "correct": false
          },
          {
            "text": "--cached",
            "correct": false
          }
        ],
        "explanation": "`git merge --no-ff` yêu cầu Git tạo merge commit thay vì chỉ di chuyển con trỏ."
      },
      {
        "id": "q5",
        "question": "Vì sao một nhóm có thể chọn `--no-ff` dù fast-forward đang khả thi?",
        "type": "single",
        "options": [
          {
            "text": "Muốn lưu riêng một mốc thể hiện lần tích hợp nhánh tính năng",
            "correct": true
          },
          {
            "text": "Muốn xóa lịch sử cũ khỏi repository",
            "correct": false
          },
          {
            "text": "Muốn bỏ qua việc kiểm tra thay đổi",
            "correct": false
          },
          {
            "text": "Muốn tự động đẩy commit lên GitHub",
            "correct": false
          }
        ],
        "explanation": "Merge commit tạo dấu mốc riêng cho lần tích hợp, theo quy ước của nhóm."
      },
      {
        "id": "q6",
        "question": "Sau fast-forward, điều gì đúng về hai con trỏ `main` và `feature`?",
        "type": "single",
        "options": [
          {
            "text": "Cả hai có thể cùng trỏ tới commit mới nhất",
            "correct": true
          },
          {
            "text": "`feature` bị xóa tự động",
            "correct": false
          },
          {
            "text": "`main` quay lại commit đầu tiên",
            "correct": false
          },
          {
            "text": "Cả hai chuyển thành remote branch",
            "correct": false
          }
        ],
        "explanation": "Fast-forward di chuyển main tới commit feature; nhánh feature vẫn tồn tại nếu chưa bị xóa riêng."
      }
    ]
  }
};
export default lesson;
