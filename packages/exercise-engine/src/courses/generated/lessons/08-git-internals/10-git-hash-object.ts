import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-git-hash-object",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "10-git-hash-object",
    "title": "Tạo và băm đối tượng thủ công với git hash-object",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "09-tag-object"
    ],
    "objectives": [
      "Làm chủ lệnh plumbing quan trọng hàng đầu: git hash-object.",
      "Sử dụng các cờ cốt lõi: -w (write to database), --stdin (đọc từ luồng tiêu chuẩn), -t (chỉ định loại đối tượng).",
      "Tạo một blob object mà không cập nhật index hoặc tạo commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git hash-object",
      "plumbing command",
      "sha-256 object format",
      "write object",
      "hands-on lab"
    ],
    "commands": [
      "echo \"Hello Internals\" | git hash-object -w --stdin",
      "git hash-object -w myfile.txt"
    ]
  },
  "content": "# Tạo và băm đối tượng thủ công với git hash-object\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ lệnh plumbing quan trọng hàng đầu: `git hash-object`.\n- Sử dụng các cờ cốt lõi: `-w` (write to database), `--stdin` (đọc từ luồng tiêu chuẩn), `-t` (chỉ định loại đối tượng).\n- Tự tay tạo ra một đối tượng Blob hợp lệ trong thư mục `.git/objects/` mà không cần dùng `git add` hay `git commit`.\n- Hiểu sự khác biệt giữa việc chỉ tính mã băm trên bộ nhớ và việc ghi dữ liệu nén zlib xuống ổ đĩa.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git hash-object Command\n- **Nói dễ hiểu**: Lệnh plumbing nhận dữ liệu, tính object ID theo hash format của repository và in kết quả.\n- **Ví dụ**: Chạy `git hash-object README.md` để xem object ID của nội dung file trong repository hiện tại.\n- **Đừng nhầm**: Không làm thay đổi staging area; lệnh này hoạt động độc lập và không đụng tới tệp `.git/index`.\n\n### -w (Write Flag)\n- **Nói dễ hiểu**: Tùy chọn yêu cầu Git ghi object vào object database; object ID vẫn phụ thuộc nội dung và hash format của repository.\n- **Ví dụ**: Chạy `git hash-object -w README.md` thực sự tạo ra tệp nhị phân trên đĩa.\n- **Đừng nhầm**: Nếu quên cờ `-w`, Git chỉ in mã băm ra terminal mà không lưu bất kỳ dữ liệu nào vào kho đối tượng.\n\n### --stdin Flag\n- **Nói dễ hiểu**: Cờ thông báo cho Git đọc nội dung trực tiếp từ luồng ký tự đầu vào của terminal thay vì đọc từ một file vật lý trên đĩa.\n- **Ví dụ**: Kết hợp qua đường ống: `echo \"Hello Git\" | git hash-object --stdin`.\n- **Đừng nhầm**: Không yêu cầu người dùng gõ mật khẩu; đây là cơ chế truyền dữ liệu tiêu chuẩn (standard input) của Unix.\n\n---\n\n## 📖 Định nghĩa\n`git hash-object` nhận một tệp hoặc luồng dữ liệu, ghép header `<type> <size>\\0`, rồi tính object ID bằng hash format của repository (SHA-1 hoặc SHA-256). Khi thêm `-w`, Git ghi object vào object database; lệnh không cập nhật index hay branch ref. Object không được tham chiếu có thể bị garbage collection thu gom về sau.\n\n---\n\n## 🤔 Tại sao cần?\nLệnh `git hash-object` là viên gạch đầu tiên giúp bạn phá vỡ ảo tưởng rằng Git là một công cụ ma thuật thần bí khó hiểu. Bằng cách tự tay đưa một chuỗi văn bản vào cơ sở dữ liệu đối tượng mà không cần thông qua Staging Area hay tạo commit, bạn trực tiếp chứng kiến cách Git mã hóa và nén dữ liệu ở tầng vật lý, xây dựng nền tảng tư duy vững chắc để tự tay lắp ráp cây thư mục Merkle Tree và tạo commit thủ công hoàn toàn độc lập.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng máy nhận byte dữ liệu, gắn nhãn cho biết loại và kích thước, rồi tính ID từ cả nhãn lẫn nội dung. Khi dùng `-w`, Git ghi object; nếu repo SHA-1, ID thường có 40 ký tự, còn repo SHA-256 có 64.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình vận hành của lệnh git hash-object -w:\n Payload bytes ──► [Header: \"blob <byte-count>\\0\" + payload]\n                              │\n                              ▼ [Hash theo định dạng của repository]\n                         Object ID\n                              │\n                              ▼ [Ghi object]\n       Loose path (nếu loose) hoặc packfile (nếu được đóng gói)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong repository SHA-1, chạy `echo \"Hello World\" | git hash-object -w --stdin` trong Bash để hash nội dung `Hello World` kèm newline sẽ in `557db03de997c86a4a028e1ebd3a1ceb225be238`. Khi loose, object có thể nằm dưới `objects/55/`; dùng `git cat-file -p <object-id>` để kiểm tra. Lệnh không stage nội dung và object không được tham chiếu có thể bị thu gom về sau.\n\n---\n\n## 💻 Command\n```bash\n# Băm và ghi trực tiếp từ chuỗi ký tự terminal\necho \"Hello Internals\" | git hash-object -w --stdin\n\n# Băm và ghi từ tệp tin có sẵn trên đĩa\ngit hash-object -w myfile.txt\n\n# Chỉ tính mã băm kiểm tra mà không ghi xuống đĩa (chế độ preview)\ngit hash-object myfile.txt\n```\n\n---\n\n## 🔍 Giải thích command\n- `echo \"Hello Internals\" | git hash-object -w --stdin`: Trong Bash, `echo` thêm newline nên phần blob có 16 byte; Git tính object ID theo repo và ghi object vào database.\n- `git hash-object -w myfile.txt`: Đọc trực tiếp từ tệp tin vật lý, tính kích thước và lưu đối tượng blob vào database.\n- Không có cờ `-w`: Git chỉ in object ID ra stdout mà không ghi object mới vào database.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ `-w`**: Git chỉ in mã băm ra màn hình mà hoàn toàn không lưu đối tượng vào thư mục `.git/objects/`, khiến các lệnh sau không tìm thấy mã băm.\n2. **Ký tự xuống dòng khác biệt giữa các hệ điều hành**: Lệnh `echo` trên PowerShell có thể gửi kèm `\\r\\n` (CRLF) thay vì `\\n` (LF) như Linux, khiến mã SHA-1 sinh ra khác nhau.\n3. **Nghĩ rằng hash-object đưa file vào Staging**: Lệnh này chỉ ghi vào cơ sở dữ liệu đối tượng thô, tệp `.git/index` hoàn toàn không biết tới sự tồn tại của file này.\n\n---\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Trong repository thực hành, tạo `blob-demo.txt` với nội dung không nhạy cảm.\n2. Chạy `git hash-object -w blob-demo.txt` và lưu object ID được in ra (độ dài tùy hash format).\n3. Dùng `git rev-parse --git-path objects` để xem đường dẫn object store mà Git đang dùng.\n4. Chạy `git cat-file -t <object-id>` và `git cat-file -p <object-id>` để xác nhận loại và nội dung. Xóa file thử không xóa object ngay; object chưa được tham chiếu không phải bản sao lưu.\n\n---\n\n## 💡 Hint\n> `-w` viết tắt của “write”. Không có `-w`, lệnh chỉ tính object ID và không ghi object mới.\n\n---\n\n## ✅ Validation\n- `git cat-file -t <object-id>` trả về `blob` và `git cat-file -p <object-id>` in nội dung đã hash.\n- `git hash-object` không cập nhật Staging Area; cần `git add` riêng nếu muốn đưa file vào index.\n\n---\n\n## ❓ Quiz\nHãy kiểm tra kỹ năng sử dụng lệnh plumbing git hash-object qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🔥 Challenge\nVì sao `git hash-object -t tree file.txt` không tự biến file văn bản thành Tree hợp lệ? Nêu lệnh phù hợp để tạo tree từ index và commit từ tree.\n\n---\n\n## 📚 Tổng kết\n- `git hash-object` tính object ID theo chuẩn header và hash format của repository.\n- Thêm cờ `-w` để ghi đối tượng nén zlib vào thư mục `.git/objects/`.\n- Cờ `--stdin` cho phép đọc dữ liệu trực tiếp từ đường ống pipe của terminal.\n- Là viên gạch nền tảng để tạo Blob thủ công mà không cần qua lệnh Porcelain `git add`.\n",
  "quiz": {
    "id": "quiz-08-git-internals-10-git-hash-object",
    "title": "Trắc nghiệm: Tạo và băm đối tượng thủ công với git hash-object",
    "questions": [
      {
        "id": "q1",
        "question": "Tùy chọn nào của lệnh git hash-object bắt buộc phải có để đối tượng thực sự được ghi xuống ổ đĩa trong .git/objects/?",
        "type": "single",
        "options": [
          {
            "text": "-w (write)",
            "correct": true
          },
          {
            "text": "-s (save)",
            "correct": false
          },
          {
            "text": "-f (force)",
            "correct": false
          },
          {
            "text": "-c (commit)",
            "correct": false
          }
        ],
        "explanation": "Cờ -w yêu cầu Git ghi đối tượng vào Object Database; nếu không có cờ này, lệnh chỉ in mã băm ra màn hình."
      },
      {
        "id": "q2",
        "question": "Tùy chọn --stdin trong lệnh git hash-object có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Đọc nội dung dữ liệu từ luồng đầu vào tiêu chuẩn (Standard Input) thay vì đọc từ tệp tin trên đĩa",
            "correct": true
          },
          {
            "text": "Bắt buộc người dùng phải nhập mật khẩu",
            "correct": false
          },
          {
            "text": "Chạy lệnh với quyền quản trị viên",
            "correct": false
          },
          {
            "text": "Tự động sửa lỗi cú pháp",
            "correct": false
          }
        ],
        "explanation": "--stdin cho phép bạn truyền dữ liệu qua đường ống pipe từ luồng terminal vào Git hash-object."
      },
      {
        "id": "q3",
        "question": "Mặc định nếu không chỉ định cờ -t, lệnh git hash-object sẽ tạo ra loại đối tượng nào?",
        "type": "single",
        "options": [
          {
            "text": "blob",
            "correct": true
          },
          {
            "text": "tree",
            "correct": false
          },
          {
            "text": "commit",
            "correct": false
          },
          {
            "text": "tag",
            "correct": false
          }
        ],
        "explanation": "Nếu không truyền `-t`, `git hash-object` dùng loại `blob` mặc định; `-t` cho phép yêu cầu loại object khác."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy lệnh git hash-object -w myfile.txt, tệp myfile.txt đã được đưa vào Staging Area chưa?",
        "type": "single",
        "options": [
          {
            "text": "Chưa, lệnh này chỉ ghi đối tượng vào Object Database, hoàn toàn không tác động đến tệp .git/index",
            "correct": true
          },
          {
            "text": "Rồi, nó tương đương với git add",
            "correct": false
          },
          {
            "text": "Tự động commit luôn",
            "correct": false
          },
          {
            "text": "Tệp bị xóa khỏi thư mục làm việc",
            "correct": false
          }
        ],
        "explanation": "Đây là sự khác biệt giữa Plumbing và Porcelain: hash-object chỉ thao tác với object store, không chạm vào staging area."
      },
      {
        "id": "q5",
        "question": "Tùy chọn -t trong lệnh git hash-object cho phép chỉ định những loại đối tượng nào?",
        "type": "single",
        "options": [
          {
            "text": "blob, tree, commit, hoặc tag",
            "correct": true
          },
          {
            "text": "text, json, xml, hoặc binary",
            "correct": false
          },
          {
            "text": "main, master, staging, hoặc production",
            "correct": false
          },
          {
            "text": "Chỉ duy nhất một loại là blob",
            "correct": false
          }
        ],
        "explanation": "Cờ -t cho phép bạn chỉ định loại đối tượng cần tạo trong 4 kiểu nguyên thủy của Git: blob, tree, commit, hoặc tag."
      }
    ]
  }
};
export default lesson;
