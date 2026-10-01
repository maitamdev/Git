import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "15-revision-syntax",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "15-revision-syntax",
    "title": "Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2",
    "level": "advanced",
    "duration": 35,
    "xp": 95,
    "prerequisites": [
      "14-git-index-internals"
    ],
    "objectives": [
      "Phân biệt tuyệt đối và chính xác giữa hai toán tử điều hướng commit: dấu ngã (~) và dấu mũ (^).",
      "Hiểu quy tắc: HEAD~n là đi lùi n thế hệ tổ tiên theo nhánh chính; HEAD^n là chọn commit cha thứ n trong Merge Commit.",
      "Sử dụng lệnh plumbing git rev-parse để phân giải mọi cú pháp revision phức tạp thành mã băm SHA-1 duy nhất."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "revision syntax",
      "tilde operator",
      "caret operator",
      "git rev-parse",
      "dag navigation"
    ],
    "commands": [
      "git rev-parse HEAD~1",
      "git rev-parse HEAD^2",
      "git rev-parse main@{yesterday}"
    ]
  },
  "content": "# Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt tuyệt đối và chính xác giữa hai toán tử điều hướng commit: dấu ngã (~) và dấu mũ (^).\n- Hiểu quy tắc: `HEAD~n` là đi lùi n thế hệ tổ tiên theo nhánh chính; `HEAD^n` là chọn commit cha thứ n trong Merge Commit.\n- Sử dụng lệnh plumbing `git rev-parse` để phân giải mọi cú pháp revision phức tạp thành mã băm SHA-1 duy nhất.\n- Kết hợp linh hoạt các chuỗi toán tử để định vị bất kỳ nút nào trên đồ thị DAG.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Tilde Operator (HEAD~n)\n- **Nói dễ hiểu**: Toán tử dấu ngã dùng để đi lùi tuyến tính n thế hệ theo chuỗi cha đầu tiên (cha, ông nội, cụ kỵ).\n- **Ví dụ**: Biểu thức `HEAD~3` tương đương với `HEAD~~~`, đi lùi 3 commit trên nhánh hiện tại.\n- **Đừng nhầm**: Không nhảy sang nhánh phụ khi gặp merge commit; nó luôn bám theo commit cha thứ nhất (first parent).\n\n### Caret Operator (HEAD^n)\n- **Nói dễ hiểu**: Toán tử dấu mũ dùng để chọn người cha thứ n của một Merge Commit có nhiều nhánh hợp nhất lại.\n- **Ví dụ**: Tại một điểm merge, `HEAD^1` là cha trên nhánh chính và `HEAD^2` là commit cuối của nhánh phụ được merge vào.\n- **Đừng nhầm**: Nếu commit chỉ có 1 cha duy nhất (commit bình thường), gọi `HEAD^2` sẽ bị báo lỗi vì không tồn tại người cha thứ hai.\n\n### git rev-parse Command\n- **Nói dễ hiểu**: Lệnh plumbing tiếp nhận bất kỳ chuỗi biểu thức revision nào và tính toán ra chuỗi mã băm SHA-1 40 ký tự chính xác.\n- **Ví dụ**: Chạy `git rev-parse HEAD~1` in ra mã băm của commit trước đó.\n- **Đừng nhầm**: Không làm thay đổi vị trí con trỏ hay working directory; đây chỉ là công cụ tính toán và phân giải địa chỉ.\n\n---\n\n## 📖 Định nghĩa\nCú pháp Revision (Revision Syntax) là hệ thống ký hiệu điều hướng cho phép bạn tham chiếu tới bất kỳ commit nào trong lịch sử đồ thị DAG của Git mà không cần phải sao chép mã băm SHA-1. Hai toán tử then chốt và dễ gây nhầm lẫn nhất là Dấu ngã (Tilde ~) và Dấu mũ (Caret ^). Toán tử `HEAD~n` điều hướng lùi về n thế hệ theo tuyến tính tổ tiên cha đầu tiên; trong khi toán tử `HEAD^n` dùng để chọn người cha thứ n của một Merge Commit có nhiều nhánh hợp nhất.\n\n---\n\n## 💡 Tại sao cần\nNhầm lẫn giữa cú pháp `HEAD~2` và `HEAD^2` là một trong những sai lầm phổ biến và nguy hiểm nhất của các kỹ sư Git. Khi bạn muốn hoàn tác hai commit gần nhất bằng lệnh reset hay xem sự khác biệt bằng lệnh diff, nếu gõ nhầm toán tử trên một Merge Commit, bạn có thể vô tình nhảy sang một nhánh phụ hoàn toàn xa lạ thay vì đi ngược dòng lịch sử của nhánh chính, dẫn đến việc xóa nhầm dữ liệu hoặc hiểu sai biến động mã nguồn.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng sơ đồ gia phả gia đình qua các thế hệ nối tiếp nhau: Dấu ngã (~) giống như việc đi ngược dòng thời gian về các đời trước trên nhánh phả hệ chính: `Tôi~1` là Bố tôi, `Tôi~2` là Ông nội tôi, `Tôi~3` là Cụ nội tôi (đi thẳng một mạch theo trục dọc thế hệ). Còn dấu mũ (^) xuất hiện khi một người có cả Bố và Mẹ hợp nhất (Merge Commit): `Tôi^1` là Bố tôi (người cha thứ nhất), và `Tôi^2` là Mẹ tôi (người cha thứ hai ở nhánh phụ).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nSự khác biệt trực quan giữa ~ và ^ trên đồ thị Merge:\n          (Commit C1) ──► (Commit C2) ──┐ [Nhánh phụ được merge]\n                                         ▼\n(Commit A1) ──► (Commit A2) ──────────► [Commit M (Merge Commit)] ◄── HEAD\n\nTừ vị trí HEAD (Commit M):\n• HEAD~1 = A2   (Đi lùi 1 thế hệ theo nhánh chính)\n• HEAD~2 = A1   (Đi lùi 2 thế hệ theo nhánh chính)\n• HEAD^1 = A2   (Chọn cha thứ nhất: nhánh chính)\n• HEAD^2 = C2   (Chọn cha thứ hai: nhánh phụ vừa được merge vào)\n• HEAD^2~1 = C1 (Đi sang cha thứ hai rồi lùi thêm 1 thế hệ)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư muốn kiểm tra sự khác biệt giữa phiên bản hiện tại sau khi merge và mã nguồn của nhánh tính năng trước khi được gộp vào. Nếu kỹ sư gõ `git diff HEAD~1`, Git sẽ so sánh với commit cha trên nhánh main. Để so sánh chính xác với commit cuối cùng của nhánh tính năng được gộp vào, kỹ sư sử dụng toán tử dấu mũ: `git diff HEAD^2`. Lệnh `git rev-parse HEAD^2` trả về chính xác mã băm của commit tính năng trên nhánh phụ. Sự hiểu biết chính xác về cú pháp revision giúp kỹ sư kiểm tra mã nguồn đa nhánh một cách chuẩn xác 100%.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Phân giải commit trước đó một thế hệ\ngit rev-parse HEAD~1\n\n# Phân giải commit cha thứ hai của một merge commit\ngit rev-parse HEAD^2\n\n# Kết hợp: đi tới cha thứ hai rồi lùi lại một thế hệ\ngit rev-parse HEAD^2~1\n\n# So sánh diff giữa commit hiện tại và commit của nhánh phụ đã merge\ngit diff HEAD^2 HEAD\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rev-parse HEAD~1`: In ra mã SHA-1 của commit cha đầu tiên (tương đương `HEAD^`).\n- `git rev-parse HEAD^2`: In ra mã SHA-1 của commit cha thứ hai trên một merge commit.\n- `HEAD^2~1`: Điều hướng sang commit cha thứ hai của merge commit, sau đó lùi tiếp một thế hệ trên nhánh đó.\n- `git diff HEAD^2 HEAD`: Xem toàn bộ các thay đổi mà nhánh chính mang lại so với nhánh tính năng vừa được merge.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng `HEAD~2` và `HEAD^2` giống nhau**: Chỉ tình cờ giống nhau trên lịch sử đơn tuyến tính; trên điểm merge, `HEAD^2` nhảy sang nhánh phụ còn `HEAD~2` đi lùi 2 bước trên nhánh chính.\n2. **Gọi `HEAD^2` trên commit đơn**: Git sẽ báo lỗi ambiguous argument vì commit đơn chỉ có 1 cha duy nhất.\n3. **Quên thứ tự ưu tiên khi ghép chuỗi**: `HEAD~2^2` khác với `HEAD^2~2`; cần đọc tuần tự từ trái sang phải để theo dõi đúng đường đi trên đồ thị.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo một lịch sử có rẽ nhánh và thực hiện merge để tạo ra một Merge Commit thực tế.\n2. **Bước 2**: Sử dụng `git rev-parse HEAD~1` và ghi lại mã băm của nhánh chính.\n3. **Bước 3**: Sử dụng `git rev-parse HEAD^2` và quan sát mã băm thuộc về nhánh phụ vừa được gộp vào.\n4. **Bước 4**: Chạy `git log --graph --oneline` để đối chiếu trực quan vị trí của cả hai commit trên đồ thị.\n\n---\n\n## 💡 Hint & mẹo\n> Ghi nhớ câu thần chú: \"Dấu ngã (~) là leo cây gia phả thế hệ lùi dần; Dấu mũ (^) là chọn nhánh rẽ của ngã ba hợp nhất\".\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git rev-parse HEAD~1` trả về đúng commit cha trên nhánh chính.\n- Lệnh `git rev-parse HEAD^2` trả về đúng commit cuối cùng của nhánh tính năng đã được gộp.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra khả năng định vị đồ thị commit qua bài trắc nghiệm về cú pháp revision trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nBiểu thức revision `HEAD~3^2~1` có nghĩa là gì trên sơ đồ cây commit của Git? Hãy vẽ sơ đồ minh họa từng bước nhảy con trỏ.\n\n---\n\n## 📝 Tổng kết\n- Toán tử `~n` (Tilde) đi lùi n thế hệ theo tuyến tính tổ tiên đầu tiên (nhánh chính).\n- Toán tử `^n` (Caret) dùng để chọn người cha thứ n của một Merge Commit.\n- `git rev-parse` là lệnh plumbing chuyển đổi mọi cú pháp biểu thức revision thành mã băm SHA-1.\n- Nắm vững cú pháp revision giúp bạn thao tác git rebase, reset và diff trên các đồ thị phức tạp với độ chính xác tuyệt đối.\n",
  "quiz": {
    "id": "quiz-08-git-internals-15-revision-syntax",
    "title": "Trắc nghiệm: Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2",
    "questions": [
      {
        "id": "q1",
        "question": "Biểu thức HEAD~3 tương đương với cách viết nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "HEAD~~~ (đi lùi 3 thế hệ cha liên tiếp)",
            "correct": true
          },
          {
            "text": "HEAD^^^3",
            "correct": false
          },
          {
            "text": "HEAD trỏ vào nhánh số 3",
            "correct": false
          },
          {
            "text": "HEAD nhân với 3",
            "correct": false
          }
        ],
        "explanation": "Toán tử ngã ~3 là cách viết tắt của việc lặp lại 3 lần toán tử ngã đơn ~~~, tương đương đi lùi 3 đời commit."
      },
      {
        "id": "q2",
        "question": "Khi đứng tại một Merge Commit, biểu thức HEAD^2 sẽ trỏ tới commit nào?",
        "type": "single",
        "options": [
          {
            "text": "Commit cha thứ hai (commit đầu nhánh phụ được gộp vào)",
            "correct": true
          },
          {
            "text": "Commit đi lùi 2 bước trên nhánh chính",
            "correct": false
          },
          {
            "text": "Commit của 2 ngày trước",
            "correct": false
          },
          {
            "text": "Commit của người review thứ 2",
            "correct": false
          }
        ],
        "explanation": "Số đứng sau dấu mũ ^ chỉ định số thứ tự của commit cha trong danh sách parent của commit hiện tại."
      },
      {
        "id": "q3",
        "question": "Lệnh Plumbing nào sau đây nhận vào một biểu thức revision và in ra mã băm SHA-1 tương ứng?",
        "type": "single",
        "options": [
          {
            "text": "git rev-parse",
            "correct": true
          },
          {
            "text": "git hash-parse",
            "correct": false
          },
          {
            "text": "git eval-rev",
            "correct": false
          },
          {
            "text": "git resolve-commit",
            "correct": false
          }
        ],
        "explanation": "git rev-parse là lệnh phân giải cú pháp tham chiếu cốt lõi được sử dụng rộng rãi trong các kịch bản tự động của Git."
      },
      {
        "id": "q4",
        "question": "Nếu một commit là commit đơn bình thường (không phải merge commit), điều gì xảy ra nếu bạn gõ git rev-parse HEAD^2?",
        "type": "single",
        "options": [
          {
            "text": "Báo lỗi vì commit đơn chỉ có duy nhất 1 cha (không có parent 2)",
            "correct": true
          },
          {
            "text": "Tự động trỏ về Root commit",
            "correct": false
          },
          {
            "text": "Tự động tạo ra một nhánh mới",
            "correct": false
          },
          {
            "text": "In ra mã băm của chính nó",
            "correct": false
          }
        ],
        "explanation": "Vì commit không phải là điểm hợp nhất nên chỉ sở hữu parent 1, yêu cầu truy cập parent 2 sẽ bị báo lỗi không tồn tại."
      },
      {
        "id": "q5",
        "question": "Sự khác biệt căn bản giữa toán tử dấu mũ (^) và toán tử dấu ngã (~) trong cú pháp Revision của Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "^ dùng để chọn cha thứ mấy trong merge commit, còn ~ dùng để đi lùi tuyến tính theo nhiều thế hệ cha đầu tiên",
            "correct": true
          },
          {
            "text": "^ chỉ dùng cho hệ điều hành Windows, còn ~ chỉ dùng cho Linux",
            "correct": false
          },
          {
            "text": "^ đi tới commit tương lai, còn ~ đi lùi về commit quá khứ",
            "correct": false
          },
          {
            "text": "Hai toán tử này hoàn toàn tương đương nhau trong mọi tình huống",
            "correct": false
          }
        ],
        "explanation": "Quy tắc vàng: HEAD~2 tương đương HEAD^^ (lùi 2 thế hệ theo cha thứ nhất), trong khi HEAD^2 trỏ tới commit cha thứ hai của một merge commit."
      }
    ]
  }
};
export default lesson;
