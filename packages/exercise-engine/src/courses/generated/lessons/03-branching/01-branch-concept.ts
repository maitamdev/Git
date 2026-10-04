import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-branch-concept",
  "moduleId": "03-branching",
  "metadata": {
    "id": "01-branch-concept",
    "title": "Khái niệm nhánh (branch) trong Git",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "06-git-commit"
    ],
    "objectives": [
      "Giải thích branch là một tên trỏ tới commit, không phải bản sao dự án.",
      "Nhận biết main là tên nhánh phổ biến, không bảo đảm code production.",
      "Dùng git branch để xem nhánh hiện có và nhánh đang chọn."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "create-branch"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch",
      "nhanh git",
      "con tro commit",
      "phan nhanh"
    ],
    "commands": [
      "git branch",
      "git branch <tên-nhánh>"
    ]
  },
  "content": "# Khái niệm nhánh (branch) trong Git\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu thấu bản chất công nghệ: Branch chỉ là con trỏ siêu nhẹ trỏ tới commit, không phải bản sao thư mục.\n- Giải mã vai trò của nhánh `main` và hiểu rõ quy ước tổ chức nhánh trong môi trường dự án thực tế.\n- Sử dụng thành thạo `git branch` để thanh tra danh sách các luồng phát triển và vị trí nhánh đang đứng.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Branch — nhánh\n- **Nói dễ hiểu:** Một con trỏ định danh siêu nhẹ trỏ tới commit mới nhất của một luồng công việc độc lập.\n- **Ví dụ:** Tạo nhánh `feature-cart` để lập trình tính năng giỏ hàng mà không làm xáo trộn nhánh chính.\n- **Đừng nhầm:** Nhánh trong Git chỉ là một file văn bản chứa 40 ký tự mã băm commit, hoàn toàn không phải một bản sao chép thư mục nặng nề như các VCS đời cũ.\n\n### Commit — mốc trong lịch sử\n- **Nói dễ hiểu:** Một viên gạch nền tảng snapshot bất biến lưu lại toàn bộ trạng thái dự án tại một khoảnh khắc cụ thể.\n- **Ví dụ:** Sau khi hoàn thành logic xác thực mật khẩu, bạn tạo commit để ghi nhận cột mốc vững chắc.\n- **Đừng nhầm:** Commit là một điểm cố định bất biến trong quá khứ; còn nhánh là một con trỏ di động trỏ tới commit đó.\n\n### `main` — tên nhánh thường dùng\n- **Nói dễ hiểu:** Tên nhánh mặc định đóng vai trò là dòng chảy tích hợp trung tâm của hầu hết các dự án phần mềm hiện đại.\n- **Ví dụ:** Khi bạn vừa khởi tạo kho mã nguồn hoặc clone về máy, nhánh làm việc mặc định thường là `main`.\n- **Đừng nhầm:** Cái tên `main` chỉ là một quy ước đặt tên phổ biến; Git không cấp cho nó bất kỳ phép màu hay đặc quyền công nghệ nào khác biệt so với các nhánh khác.\n\n---\n\n## 📖 Định nghĩa\nBranch (nhánh) trong Git thực chất là một con trỏ siêu nhẹ (chỉ nặng đúng 41 bytes chứa mã băm commit) trỏ tới đỉnh mốc lịch sử của một luồng phát triển độc lập. Mỗi khi bạn tạo commit mới, con trỏ nhánh tự động dịch chuyển về phía trước để neo vào snapshot mới nhất mà hoàn toàn không nhân bản hay tốn thêm dung lượng thư mục dự án.\n\n---\n\n## 🤔 Tại sao cần?\nHãy tưởng tượng nếu cả đội ngũ 10 kỹ sư cùng code thẳng vào một nhánh duy nhất: người đang sửa dở chức năng thanh toán sẽ làm gãy bản build của người đang viết giao diện đăng nhập. Phân nhánh tạo ra những vũ trụ song song an toàn, cho phép bạn tự do thử nghiệm, sáng tạo và hoàn thiện từng tính năng độc lập trước khi gộp trở lại vào dòng chảy chính của dự án.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung các commit như những bậc thang đá dựng đứng dẫn lên đỉnh núi, còn Branch giống như những dải ruy-băng đánh dấu màu sắc khác nhau buộc vào các bậc đá. Khi bạn leo thêm một bậc thang mới trên lộ trình của mình, dải ruy-băng nhánh của bạn sẽ được buộc nhấc lên bậc thang cao nhất đó, trong khi các dải ruy-băng của đồng đội vẫn nằm yên tại bậc đá của họ.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ CON TRỎ NHÁNH SIÊU NHẸ CỦA GIT:\n\n  Lịch sử commit:  (C1) ◄── (C2) ◄── (C3)\n                             ▲         ▲\n                             │         └── [main] (Con trỏ nhánh chính)\n                             └──────────── [feature-cart] (Con trỏ nhánh tính năng)\n\n  Tạo nhánh mới = Chỉ tạo thêm 1 file 41 bytes trong .git/refs/heads/\n  Chưa hề sao chép bất kỳ file code nào trên ổ cứng!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một dự án ví điện tử, nhánh `main` lưu trữ mã nguồn chuẩn đang chạy cho hàng triệu người dùng. Khi bạn được giao tích hợp cổng thanh toán Apple Pay, bạn lập tức tạo nhánh `feature/apple-pay`. Mọi thử nghiệm sai sót, sửa chữa của bạn đều nằm gọn trong nhánh này, đảm bảo `main` của khách hàng luôn chạy mượt mà và an toàn tuyệt đối.\n\n---\n\n## 💻 Command\n```bash\ngit branch\ngit branch feature-cart\ngit branch --list\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong repository của bạn; dấu hoa thị `*` biểu thị nhánh bạn đang đứng.\n- `git branch <tên-nhánh>`: Tạo ra một nhánh mới ngay tại vị trí commit hiện tại của HEAD, nhưng chưa chuyển chỗ làm việc sang đó.\n- `git branch --list`: Tùy chọn tường minh tương đương với lệnh liệt kê cơ bản.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng tạo nhánh là nhân đôi toàn bộ thư mục**: Nhiều bạn sợ tạo nhánh vì nghĩ ổ cứng sẽ bị tốn dung lượng; thực tế nhánh trong Git chỉ tốn vài chục bytes bộ nhớ.\n2. **Nghĩ rằng gõ `git branch <tên>` sẽ tự nhảy sang nhánh mới**: Lệnh này chỉ đơn thuần cắm thêm một chiếc cờ mang tên mới; bạn vẫn đang đứng yên ở nhánh cũ!\n3. **Thần thánh hóa nhánh `main`**: Tưởng rằng `main` tự động chống lỗi; `main` chỉ là một cái tên thông thường do cộng đồng quy ước.\n\n---\n\n## 🧪 Lab\n1. Mở terminal gõ `git branch` để kiểm tra danh sách nhánh hiện tại và nhận diện dấu `*`.\n2. Tạo nhánh tính năng mới bằng lệnh `git branch feature-cart`.\n3. Chạy lại `git branch` để kiểm tra kết quả danh sách.\n4. Xác nhận nhánh `feature-cart` đã xuất hiện nhưng dấu hoa thị `*` vẫn kiên định nằm ở nhánh ban đầu của bạn.\n\n---\n\n## 💡 Hint\n> Tạo nhánh mới chỉ là cắm một chiếc cờ mới vào commit hiện tại; để bước chân sang đó bạn cần dùng lệnh chuyển nhánh!\n\n---\n\n## ✅ Validation\n- Danh sách nhánh xuất hiện tên nhánh mới `feature-cart`.\n- Dấu `*` vẫn hiển thị chính xác trước nhánh ban đầu, chứng minh bạn chưa bị chuyển dịch vị trí làm việc ngoài ý muốn.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để kiểm tra mức độ thấu hiểu của bạn về bản chất con trỏ nhánh trong Git.\n\n---\n\n## 🔥 Challenge\nHãy mở thư mục ngầm `.git/refs/heads/` trên máy và xem nội dung file mang tên nhánh vừa tạo. Bạn thấy gì bên trong file đó? Hãy giải thích tại sao Git lại có thể tạo và xóa nhánh trong thời gian chỉ vài mili-giây!\n\n---\n\n## 📚 Tổng kết\n- Branch trong Git là con trỏ nhẹ trỏ tới commit, hoàn toàn không nhân bản mã nguồn.\n- Lệnh `git branch <tên>` chỉ tạo mốc con trỏ mới chứ không tự động chuyển nhánh.\n- Phân nhánh độc lập là nền tảng cốt lõi của mọi quy trình làm việc nhóm chuyên nghiệp.\n",
  "quiz": {
    "id": "quiz-03-01-branch-concept",
    "title": "Trắc nghiệm: Khái niệm nhánh trong Git",
    "questions": [
      {
        "id": "q1",
        "question": "Trong Git, một branch là gì?",
        "type": "single",
        "options": [
          {
            "text": "Một tên trỏ tới một commit trong lịch sử",
            "correct": true
          },
          {
            "text": "Một bản sao đầy đủ của dự án trong thư mục khác",
            "correct": false
          },
          {
            "text": "Một commit chứa riêng mã nguồn trên GitHub",
            "correct": false
          },
          {
            "text": "Một tệp lưu danh sách người dùng của dự án",
            "correct": false
          }
        ],
        "explanation": "Branch là tên tham chiếu tới commit; nó không sao chép toàn bộ thư mục dự án."
      },
      {
        "id": "q2",
        "question": "Bạn muốn tạo nhánh tên `feature-cart` nhưng vẫn ở nhánh hiện tại. Nên chạy lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git branch feature-cart",
            "correct": true
          },
          {
            "text": "git switch feature-cart",
            "correct": false
          },
          {
            "text": "git commit -m \"feature-cart\"",
            "correct": false
          },
          {
            "text": "git branch -d feature-cart",
            "correct": false
          }
        ],
        "explanation": "`git branch <tên>` tạo một nhánh mới tại commit hiện tại nhưng không tự chuyển sang nhánh đó."
      },
      {
        "id": "q3",
        "question": "Sau khi tạo nhánh mới bằng `git branch feature-cart`, bạn vẫn đang ở đâu?",
        "type": "single",
        "options": [
          {
            "text": "Vẫn ở nhánh đang có dấu `*` trước khi chạy lệnh",
            "correct": true
          },
          {
            "text": "Tự động ở nhánh `feature-cart`",
            "correct": false
          },
          {
            "text": "Ở trạng thái detached HEAD",
            "correct": false
          },
          {
            "text": "Trên nhánh remote `origin/feature-cart`",
            "correct": false
          }
        ],
        "explanation": "`git branch` chỉ tạo tên nhánh; muốn đổi chỗ làm việc cần dùng lệnh chuyển nhánh riêng."
      },
      {
        "id": "q4",
        "question": "Kết quả `git branch` dùng dấu nào để đánh dấu nhánh hiện tại?",
        "type": "single",
        "options": [
          {
            "text": "Dấu sao `*`",
            "correct": true
          },
          {
            "text": "Dấu cộng `+`",
            "correct": false
          },
          {
            "text": "Dấu thăng `#`",
            "correct": false
          },
          {
            "text": "Dấu chấm `.`",
            "correct": false
          }
        ],
        "explanation": "Dấu sao ở đầu dòng đánh dấu tên nhánh mà HEAD đang theo trong trạng thái bình thường."
      },
      {
        "id": "q5",
        "question": "Tên `main` cho biết chắc chắn điều gì về repository?",
        "type": "single",
        "options": [
          {
            "text": "Đây là một tên nhánh phổ biến; vai trò cụ thể do nhóm quy định",
            "correct": true
          },
          {
            "text": "Nội dung trên nhánh luôn đang chạy production",
            "correct": false
          },
          {
            "text": "Git không cho phép tạo thêm nhánh khác",
            "correct": false
          },
          {
            "text": "Đây là tên cố định mà mọi repository bắt buộc phải dùng",
            "correct": false
          }
        ],
        "explanation": "`main` thường được chọn làm nhánh mặc định, nhưng Git không gán vai trò production cố định cho tên này."
      },
      {
        "id": "q6",
        "question": "Bạn tạo commit mới khi đang ở một nhánh. Thông thường, điều gì xảy ra với nhánh đó?",
        "type": "single",
        "options": [
          {
            "text": "Tên nhánh cập nhật để trỏ tới commit mới",
            "correct": true
          },
          {
            "text": "Tên nhánh bị xóa sau khi commit",
            "correct": false
          },
          {
            "text": "Mọi nhánh khác cũng tự chuyển tới commit mới",
            "correct": false
          },
          {
            "text": "Commit mới không được thêm vào lịch sử nào",
            "correct": false
          }
        ],
        "explanation": "Khi commit trên một nhánh, Git thường cập nhật con trỏ của nhánh đó tới commit mới."
      }
    ]
  }
};
export default lesson;
