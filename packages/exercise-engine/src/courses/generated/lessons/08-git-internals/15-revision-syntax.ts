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
      "Hiểu quy tắc: HEAD~n đi lùi n thế hệ theo cha thứ nhất; HEAD^n chọn cha thứ n của commit.",
      "Sử dụng lệnh plumbing git rev-parse để phân giải mọi cú pháp revision phức tạp thành object ID theo định dạng của repository."
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
      "git diff HEAD^2 HEAD"
    ]
  },
  "content": "# Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt hai toán tử điều hướng commit: dấu ngã (~) và dấu mũ (^).\n- Hiểu quy tắc: `HEAD~n` là đi lùi n thế hệ theo cha thứ nhất; `HEAD^n` là chọn cha thứ n của commit.\n- Sử dụng `git rev-parse` để phân giải revision thành object ID của repository.\n- Kết hợp linh hoạt các chuỗi toán tử để định vị bất kỳ nút nào trên đồ thị DAG.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Tilde Operator (HEAD~n)\n- **Nói dễ hiểu**: Dấu ngã đi lùi n lần theo chuỗi cha thứ nhất.\n- **Ví dụ**: Biểu thức `HEAD~3` tương đương với `HEAD~~~`, đi lùi 3 commit trên nhánh hiện tại.\n- **Đừng nhầm**: Đây là chuỗi cha thứ nhất, không đồng nghĩa với nhánh `main`; nó phụ thuộc commit mà `HEAD` đang trỏ tới.\n\n### Caret Operator (HEAD^n)\n- **Nói dễ hiểu**: Dấu mũ chọn cha thứ n của commit. Merge commit thường có từ hai cha trở lên.\n- **Ví dụ**: Với merge commit có hai cha, `HEAD^1` là cha thứ nhất và `HEAD^2` là cha thứ hai.\n- **Đừng nhầm**: `HEAD^2` chỉ dùng được khi commit có ít nhất hai cha; thứ tự cha không tự nói tên nhánh.\n\n### git rev-parse Command\n- **Nói dễ hiểu**: Lệnh phân giải revision thành object ID mà Git nhận diện được.\n- **Ví dụ**: Chạy `git rev-parse HEAD~1` in ra mã băm của commit trước đó.\n- **Đừng nhầm**: Không làm thay đổi vị trí con trỏ hay working directory; đây chỉ là công cụ tính toán và phân giải địa chỉ.\n\n---\n\n## 📖 Định nghĩa\nCú pháp revision giúp gọi tên commit bằng các biểu thức như `HEAD~2` thay vì chép object ID. `~n` lặp n lần việc đi theo cha thứ nhất. `^n` chọn cha thứ n của commit hiện tại; ví dụ `^2` cần commit có cha thứ hai. Hai biểu thức cùng được tính từ revision đứng trước chúng.\n\n---\n\n## 💡 Tại sao cần\nHiểu các toán tử này giúp bạn so sánh đúng hai nhánh của merge và đọc lịch sử. Trước khi dùng revision với lệnh thay đổi như `reset`, hãy kiểm tra nó bằng `git rev-parse`; lỗi chọn revision có thể đưa lệnh tới commit khác với dự định.\n\n---\n\n## 🧠 Mental Model\nHãy xem merge commit như một nút có hai cạnh đi ngược về hai commit cha. `M^1` chọn cạnh cha thứ nhất; `M^2` chọn cạnh cha thứ hai. `M~2` đi hai bước liên tiếp theo cạnh cha thứ nhất. Các cạnh là quan hệ trong commit, không phải tên nhánh.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nSự khác biệt trực quan giữa ~ và ^ trên đồ thị Merge:\n          (Commit C1) ◄── (Commit C2) ◄──┐\n                                         \\\n(Commit A1) ◄── (Commit A2) ◄────────── [Commit M] ◄── HEAD\n\nTừ vị trí HEAD (Commit M):\n• HEAD~1 = A2   (Đi lùi 1 thế hệ theo cha thứ nhất)\n• HEAD~2 = A1   (Đi lùi 2 thế hệ theo cha thứ nhất)\n• HEAD^1 = A2   (Chọn cha thứ nhất)\n• HEAD^2 = C2   (Chọn cha thứ hai)\n• HEAD^2~1 = C1 (Đi sang cha thứ hai rồi lùi thêm 1 thế hệ)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMuốn so sánh merge commit với cha thứ hai, dùng `git diff HEAD^2 HEAD`. Lệnh một revision như `git diff HEAD^2` so sánh cây của cha thứ hai với working tree, nên không biểu đạt cùng phép so sánh. Trước tiên có thể xem cha thứ hai bằng `git rev-parse HEAD^2`.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Phân giải commit trước đó một thế hệ\ngit rev-parse HEAD~1\n\n# Phân giải commit cha thứ hai của một merge commit\ngit rev-parse HEAD^2\n\n# Kết hợp: đi tới cha thứ hai rồi lùi lại một thế hệ\ngit rev-parse HEAD^2~1\n\n# So sánh diff giữa commit hiện tại và commit của nhánh phụ đã merge\ngit diff HEAD^2 HEAD\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rev-parse HEAD~1`: In object ID của commit cha thứ nhất (tương đương `HEAD^`).\n- `git rev-parse HEAD^2`: In object ID của cha thứ hai nếu commit có cha thứ hai.\n- `HEAD^2~1`: Điều hướng sang commit cha thứ hai của merge commit, sau đó lùi tiếp một thế hệ trên nhánh đó.\n- `git diff HEAD^2 HEAD`: So sánh tree của merge commit với tree của cha thứ hai; kết quả là khác biệt giữa hai tree đó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng `HEAD~2` và `HEAD^2` giống nhau**: Trên merge commit, `HEAD^2` chọn cha thứ hai còn `HEAD~2` đi hai bước liên tiếp theo cha thứ nhất.\n2. **Gọi `HEAD^2` trên commit đơn**: Không có cha thứ hai nên Git không thể phân giải biểu thức này.\n3. **Quên thứ tự ưu tiên khi ghép chuỗi**: `HEAD~2^2` khác với `HEAD^2~2`; cần đọc tuần tự từ trái sang phải để theo dõi đúng đường đi trên đồ thị.\n\n---\n\n## 🧪 Lab thực hành\nTạo merge commit trong repository tạm để so sánh parent. Chạy trong Bash/Git Bash:\n\n```bash\nmkdir git-revision-lab\ncd git-revision-lab\ngit init -b main\ngit config user.name \"Git Learner\"\ngit config user.email \"learner@example.com\"\necho \"base\" > README.md\ngit add README.md\ngit commit -m \"base\"\ngit switch -c feature\necho \"feature\" > feature.txt\ngit add feature.txt\ngit commit -m \"feature change\"\ngit switch main\necho \"main\" > main.txt\ngit add main.txt\ngit commit -m \"main change\"\ngit merge --no-ff feature -m \"merge feature\"\n```\n\n1. **Bước 1**: Kiểm tra sơ đồ bằng `git log --graph --oneline --all`.\n2. **Bước 2**: Chạy `git rev-parse HEAD~1` để xem cha thứ nhất và `git rev-parse HEAD^2` để xem cha thứ hai.\n3. **Bước 3**: Dùng `git diff HEAD^2 HEAD` để so sánh tree của merge với tree cha thứ hai.\n4. **Bước 4**: So sánh object ID với `git log -1 --format=%P HEAD`, nơi Git in các parent theo thứ tự.\n\n---\n\n## 💡 Hint & mẹo\n> Ghi nhớ: `~n` lặp theo cha thứ nhất; `^n` chọn cha thứ n của commit hiện tại.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git rev-parse HEAD~1` trả về đúng commit cha trên nhánh chính.\n- Lệnh `git rev-parse HEAD^2` trả về đúng commit cuối cùng của nhánh tính năng đã được gộp.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra khả năng định vị đồ thị commit qua bài trắc nghiệm về cú pháp revision trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nBiểu thức revision `HEAD~3^2~1` có nghĩa là gì trên sơ đồ cây commit của Git? Hãy vẽ sơ đồ minh họa từng bước nhảy con trỏ.\n\n---\n\n## 📝 Tổng kết\n- Toán tử `~n` đi lùi n thế hệ theo cha thứ nhất, không nhất thiết là nhánh `main`.\n- Toán tử `^n` chọn cha thứ n của commit; cha thứ hai thường xuất hiện ở merge commit.\n- `git rev-parse` phân giải revision thành object ID theo định dạng của repository.\n- Nắm vững cú pháp revision giúp bạn thao tác git rebase, reset và diff trên các đồ thị phức tạp với độ chính xác tuyệt đối.\n",
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
            "text": "Commit cha thứ hai của merge commit",
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
        "explanation": "Số sau dấu mũ chọn cha theo thứ tự được ghi trong commit; số thứ tự đó không tự cho biết tên nhánh."
      },
      {
        "id": "q3",
        "question": "Lệnh nào nhận vào một biểu thức revision và in ra object ID tương ứng?",
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
            "text": "^n chọn cha thứ n, còn ~n đi lùi n thế hệ theo chuỗi cha thứ nhất",
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
        "explanation": "`HEAD~2` tương đương `HEAD^^`; cả hai lần theo cha thứ nhất, còn `HEAD^2` chọn cha thứ hai nếu có."
      }
    ]
  }
};
export default lesson;
