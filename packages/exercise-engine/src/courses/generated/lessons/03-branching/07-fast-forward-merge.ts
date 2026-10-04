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
  "content": "# Hợp nhất tua nhanh (fast-forward merge)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững điều kiện hình thành và bản chất cơ chế của Fast-Forward Merge.\n- Thành thạo thao tác gộp nhánh: đứng đúng vị trí nhánh đích và gọi tên nhánh nguồn.\n- Hiểu rõ sự khác biệt giữa tua nhanh mặc định và kỹ thuật ép tạo mốc với cờ `--no-ff`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Fast-forward — tua nhanh con trỏ\n- **Nói dễ hiểu:** Hành động Git dịch chuyển tịnh tiến con trỏ nhánh đích tiến thẳng tới commit mới nhất của nhánh nguồn khi lịch sử là một đường thẳng.\n- **Ví dụ:** Nhánh `main` đứng yên ở commit C2 trong khi `feature` tiến tới C4; khi merge, con trỏ `main` trượt thẳng tới C4.\n- **Đừng nhầm:** Fast-forward chỉ di chuyển con trỏ, hoàn toàn không sinh ra thêm bất kỳ commit mới nào trong lịch sử.\n\n### Nhánh đích — nơi nhận thay đổi\n- **Nói dễ hiểu:** Nhánh mà bạn đang đứng chân vào tại khoảnh khắc bạn gõ lệnh `git merge`.\n- **Ví dụ:** Muốn tích hợp code của `feature-cart` vào `main`, bạn phải chuyển sang đứng ở `main` trước rồi mới gọi lệnh merge.\n- **Đừng nhầm:** Nếu bạn đứng ở nhánh `feature-cart` rồi merge `main`, bạn đang làm ngược lại: kéo code của main vào nhánh tính năng!\n\n### `--no-ff` — giữ mốc hợp nhất\n- **Nói dễ hiểu:** Cờ tùy chọn yêu cầu Git từ chối tua nhanh, ép buộc tạo ra một commit gộp (merge commit) có 2 cha để lưu dấu lịch sử.\n- **Ví dụ:** `git merge --no-ff feature-cart` tạo một mốc ghi nhận rõ ràng: \"Tính năng giỏ hàng đã được tích hợp tại đây\".\n- **Đừng nhầm:** Cờ này làm đồ thị lịch sử rẽ nhánh rồi nhập lại, phù hợp với quản lý phát hành phiên bản lớn.\n\n---\n\n## 📖 Định nghĩa\nFast-Forward Merge (hợp nhất tua nhanh) là cơ chế gộp nhánh đơn giản và thanh lịch nhất của Git. Hiện tượng này xảy ra khi nhánh đích (nhánh nhận thay đổi) không hề có bất kỳ commit mới nào kể từ thời điểm nhánh tính năng được tách ra. Khi đó, Git chỉ việc 'tua nhanh' con trỏ của nhánh đích tiến thẳng tới vị trí commit mới nhất của nhánh tính năng mà không cần tạo thêm commit gộp nào.\n\n---\n\n## 🤔 Tại sao cần?\nFast-forward giúp giữ cho đồ thị lịch sử của dự án hoàn toàn thẳng tắp, sạch sẽ và cực kỳ dễ đọc. Bạn không phải đau đầu xử lý các commit gộp rác (merge commits) không cần thiết cho những thay đổi tuần tự. Tuy nhiên, khi làm việc trong các quy trình lớn như Git Flow, kỹ sư đôi khi cố ý dùng cờ `--no-ff` để ép Git tạo một commit gộp nhằm lưu dấu thời khắc hoàn thành một tính năng quan trọng.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn và một người bạn cùng đọc chung một cuốn sách. Bạn dừng lại đánh dấu ở trang 50. Người bạn mượn sách đọc tiếp một mạch tới trang 80. Khi người bạn trả lại sách, cuốn sách không có gì bị xé hay viết đè; bạn chỉ việc nhấc chiếc thẻ đánh dấu trang của mình từ trang 50 đặt sang trang 80. Đó chính xác là cách Fast-Forward hoạt động!\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ TUA NHANH FAST-FORWARD:\n\nTrước khi merge:\n  (C1) ── (C2: main) ── (C3) ── (C4: feature)\n\nĐứng ở main, chạy: `git merge feature`\n\nSau khi merge:\n  (C1) ── (C2) ────── (C3) ── (C4: main, feature)\n  (Con trỏ `main` trượt thẳng tới C4. Lịch sử hoàn toàn thẳng hàng!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tạo nhánh `fix-typo` từ `main` để sửa vài lỗi chính tả trên trang giới thiệu và tạo 2 commit. Trong lúc bạn làm, không có đồng đội nào commit lên `main`. Khi chuyển về `main` và gõ `git merge fix-typo`, terminal thông báo 'Fast-forward' và con trỏ `main` lập tức nhảy lên đón nhận 2 commit của bạn mà không tốn thêm một byte nào để tạo commit gộp.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit merge feature-branch\ngit merge --no-ff feature-branch\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Quy tắc bất di bất dịch: muốn kéo code vào đâu, phải đứng chân ở đó trước!\n- `git merge feature-branch`: Yêu cầu Git tích hợp nhánh tính năng vào nhánh hiện tại; Git tự động dùng Fast-forward nếu thỏa mãn điều kiện đường thẳng.\n- `git merge --no-ff feature-branch`: Ép buộc Git tạo một commit merge độc lập bất chấp có thể tua nhanh.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đứng nhầm nhánh khi merge**: Đang đứng ở nhánh con lại gõ `git merge main`, vô tình đưa code dở dang vào tình huống lộn xộn.\n2. **Ngơ ngác tìm kiếm commit gộp sau Fast-forward**: Tưởng merge bị lỗi vì không thấy commit mới sinh ra; Fast-forward chỉ trượt con trỏ chứ không tạo commit mới.\n3. **Nghĩ rằng mọi lần merge đều là Fast-forward**: Chỉ cần nhánh chính có một commit mới bất kỳ do người khác đẩy lên, Fast-forward sẽ không thể diễn ra.\n\n---\n\n## 🧪 Lab\n1. Chạy `git switch -c ff-demo` để tạo và bước sang nhánh thử nghiệm.\n2. Tạo file `feature.js` với một dòng code bất kỳ, chạy `git add feature.js` và `git commit -m \"feat: add feature file\"`.\n3. Chạy `git switch main` để trở về nhánh chính.\n4. Chạy `git merge ff-demo`; quan sát terminal xuất hiện dòng chữ `Fast-forward`.\n5. Chạy `git log --oneline` và xác nhận commit của nhánh tính năng đã nằm ngay ngắn trong lịch sử của `main`.\n\n---\n\n## 💡 Hint\n> Ghi nhớ nguyên tắc: \"Muốn rót nước vào cốc nào, phải cầm cốc đó trên tay!\" — Muốn gộp code vào `main`, phải `git switch main` trước!\n\n---\n\n## ✅ Validation\n- Lệnh merge thành công rực rỡ và báo cáo chế độ `Fast-forward`.\n- Lịch sử `git log --oneline` trên `main` chứa trọn vẹn commit mới mà không sinh thêm commit rác.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để kiểm tra mức độ am hiểu về điều kiện và hành vi của Fast-forward merge.\n\n---\n\n## 🔥 Challenge\nHãy tạo một nhánh tính năng mới, commit một file rồi thực hiện merge bằng cờ `git merge --no-ff`. So sánh đồ thị hiển thị trong `git log --oneline --graph` giữa cách merge này với cách Fast-forward thông thường. Khi nào đội ngũ của bạn nên chọn `--no-ff`?\n\n---\n\n## 📚 Tổng kết\n- Fast-forward là cơ chế trượt con trỏ nhẹ nhàng khi lịch sử hai nhánh là một đường thẳng đơn nhất.\n- Luôn chuyển sang nhánh đích trước khi chạy lệnh `git merge`.\n- Sử dụng `--no-ff` khi bạn muốn tạo dấu mốc tích hợp chính thức có cấu trúc 2 commit cha.\n",
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
