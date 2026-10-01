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
      "Tự tay tạo ra một đối tượng Blob hợp lệ trong thư mục .git/objects/ mà không cần dùng git add hay git commit."
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
      "sha-1 calculation",
      "write object",
      "hands-on lab"
    ],
    "commands": [
      "echo \"Hello Internals\" | git hash-object -w --stdin",
      "git hash-object -w myfile.txt"
    ]
  },
  "content": "# Tạo và băm đối tượng thủ công với git hash-object\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ lệnh plumbing quan trọng hàng đầu: `git hash-object`.\n- Sử dụng các cờ cốt lõi: `-w` (write to database), `--stdin` (đọc từ luồng tiêu chuẩn), `-t` (chỉ định loại đối tượng).\n- Tự tay tạo ra một đối tượng Blob hợp lệ trong thư mục `.git/objects/` mà không cần dùng `git add` hay `git commit`.\n- Hiểu sự khác biệt giữa việc chỉ tính mã băm trên bộ nhớ và việc ghi dữ liệu nén zlib xuống ổ đĩa.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git hash-object Command\n- **Nói dễ hiểu**: Lệnh plumbing cơ bản nhận dữ liệu, tính toán mã băm SHA-1 theo chuẩn tiêu đề Git (`<type> <size>\\0<content>`) và in ra màn hình.\n- **Ví dụ**: Chạy `git hash-object README.md` để xem mã băm SHA-1 mà file này sẽ nhận được khi lưu vào Git.\n- **Đừng nhầm**: Không làm thay đổi staging area; lệnh này hoạt động độc lập và không đụng tới tệp `.git/index`.\n\n### -w (Write Flag)\n- **Nói dễ hiểu**: Tùy chọn yêu cầu Git nén dữ liệu bằng zlib và ghi tệp đối tượng vào đúng thư mục con tương ứng trong `.git/objects/`.\n- **Ví dụ**: Chạy `git hash-object -w README.md` thực sự tạo ra tệp nhị phân trên đĩa.\n- **Đừng nhầm**: Nếu quên cờ `-w`, Git chỉ in mã băm ra terminal mà không lưu bất kỳ dữ liệu nào vào kho đối tượng.\n\n### --stdin Flag\n- **Nói dễ hiểu**: Cờ thông báo cho Git đọc nội dung trực tiếp từ luồng ký tự đầu vào của terminal thay vì đọc từ một file vật lý trên đĩa.\n- **Ví dụ**: Kết hợp qua đường ống: `echo \"Hello Git\" | git hash-object --stdin`.\n- **Đừng nhầm**: Không yêu cầu người dùng gõ mật khẩu; đây là cơ chế truyền dữ liệu tiêu chuẩn (standard input) của Unix.\n\n---\n\n## 📖 Định nghĩa\n`git hash-object` là một lệnh Plumbing cơ bản nhận một tệp tin hoặc luồng dữ liệu đầu vào, tính toán mã băm mật mã học (SHA-1 hoặc SHA-256) của đối tượng đó theo đúng công thức tiêu đề của Git (`<type> <size>\\0<content>`), và in mã băm 40 ký tự ra màn hình. Khi kèm theo tùy chọn `-w` (write), lệnh này sẽ trực tiếp nén dữ liệu bằng zlib và ghi tệp đối tượng vào đúng vị trí trong thư mục `.git/objects/`.\n\n---\n\n## 💡 Tại sao cần\nLệnh `git hash-object` là viên gạch đầu tiên giúp bạn phá vỡ ảo tưởng rằng Git là một công cụ ma thuật thần bí khó hiểu. Bằng cách tự tay đưa một chuỗi văn bản vào cơ sở dữ liệu đối tượng mà không cần thông qua Staging Area hay tạo commit, bạn trực tiếp chứng kiến cách Git mã hóa và nén dữ liệu ở tầng vật lý, xây dựng nền tảng tư duy vững chắc để tự tay lắp ráp cây thư mục Merkle Tree và tạo commit thủ công hoàn toàn độc lập.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng bạn đang cầm trên tay một chiếc máy dập mã vạch và đóng gói chân không công nghiệp trong một dây chuyền tự động. Bạn đưa một bức thư vào máy. Chiếc máy tự động đếm số lượng ký tự, dán một nhãn tiêu chuẩn lên đầu bức thư, hút chân không túi nhựa bảo quản (tương đương nén zlib), in ra một mã số băm SHA-1 40 ký tự độc nhất và cất chiếc túi vào đúng ngăn kệ lưu trữ trong kho hàng theo 2 ký tự đầu của mã số.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình vận hành của lệnh git hash-object -w:\nChuỗi văn bản ──► [Gắn Header: \"blob 15\\0\"] ──► [Hàm băm SHA-1] ──► Mã băm 40 ký tự\n                                                          │\n                                                          ▼ [Nén zlib]\n                                                Ghi tệp đối tượng vào:\n                                                .git/objects/xx/yyyyzz\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư muốn tạo đối tượng lưu trữ chuỗi văn bản \"Hello World\" trực tiếp từ dòng lệnh mà không cần tạo tệp trên đĩa cứng. Kỹ sư chạy câu lệnh terminal: `echo \"Hello World\" | git hash-object -w --stdin`. Git xử lý tức thì và trả về chuỗi mã băm: `557db03de997c86a4a028e1ebd3a1ceb225be238`. Ngay sau đó, kỹ sư kiểm tra thư mục nội tạng `.git/objects/55/` và phát hiện một tệp tin nhị phân mới tinh có tên `7db03de997c86a4a028e1ebd3a1ceb225be238` đã được ghi xuống đĩa thành công. Bằng một lệnh duy nhất, dữ liệu văn bản đã được đóng gói và bảo toàn vĩnh cửu trong cơ sở dữ liệu của Git mà không cần dùng đến lệnh `git add`.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Băm và ghi trực tiếp từ chuỗi ký tự terminal\necho \"Hello Internals\" | git hash-object -w --stdin\n\n# Băm và ghi từ tệp tin có sẵn trên đĩa\ngit hash-object -w myfile.txt\n\n# Chỉ tính mã băm kiểm tra mà không ghi xuống đĩa (chế độ preview)\ngit hash-object myfile.txt\n```\n\n---\n\n## 🔍 Giải thích command\n- `echo \"Hello Internals\" | git hash-object -w --stdin`: Đọc chuỗi qua đường ống pipe, gắn tiêu đề `blob 16\\0`, băm SHA-1 và ghi vào `.git/objects/`.\n- `git hash-object -w myfile.txt`: Đọc trực tiếp từ tệp tin vật lý, tính kích thước và lưu đối tượng blob vào database.\n- Không có cờ `-w`: Git chỉ in mã băm 40 ký tự ra stdout mà không đụng chạm đến ổ đĩa.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ `-w`**: Git chỉ in mã băm ra màn hình mà hoàn toàn không lưu đối tượng vào thư mục `.git/objects/`, khiến các lệnh sau không tìm thấy mã băm.\n2. **Ký tự xuống dòng khác biệt giữa các hệ điều hành**: Lệnh `echo` trên PowerShell có thể gửi kèm `\\r\\n` (CRLF) thay vì `\\n` (LF) như Linux, khiến mã SHA-1 sinh ra khác nhau.\n3. **Nghĩ rằng hash-object đưa file vào Staging**: Lệnh này chỉ ghi vào cơ sở dữ liệu đối tượng thô, tệp `.git/index` hoàn toàn không biết tới sự tồn tại của file này.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo một tệp tin mới `secret.txt` chứa nội dung \"Top secret data\".\n2. **Bước 2**: Chạy lệnh `git hash-object -w secret.txt` và sao chép lại mã băm 40 ký tự hiển thị trên màn hình.\n3. **Bước 3**: Mở thư mục `.git/objects/` và xác nhận sự tồn tại của thư mục con 2 ký tự đầu tương ứng.\n4. **Bước 4**: Chạy `git cat-file -p <mã_băm>` để kiểm tra nội dung được khôi phục từ object store.\n\n---\n\n## 💡 Hint & mẹo\n> Ghi nhớ: cờ `-w` viết tắt của \"write\". Nếu không có cờ `-w`, lệnh hoạt động ở chế độ chỉ đọc mô phỏng.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tệp đối tượng nhị phân xuất hiện chính xác trong thư mục `.git/objects/xx/` sau khi thực thi lệnh có cờ `-w`.\n- Lệnh `git cat-file -p` đọc thành công chuỗi \"Top secret data\" từ mã SHA-1 đó.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kỹ năng sử dụng lệnh plumbing git hash-object qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để sử dụng tùy chọn `-t` của `git hash-object` để băm một tệp tin dưới dạng đối tượng Tree hoặc Commit thay vì mặc định là Blob?\n\n---\n\n## 📝 Tổng kết\n- `git hash-object` tính toán mã băm SHA-1 theo chuẩn định dạng đối tượng của Git.\n- Thêm cờ `-w` để ghi đối tượng nén zlib vào thư mục `.git/objects/`.\n- Cờ `--stdin` cho phép đọc dữ liệu trực tiếp từ đường ống pipe của terminal.\n- Là viên gạch nền tảng để tạo Blob thủ công mà không cần qua lệnh Porcelain `git add`.\n",
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
        "explanation": "Loại đối tượng mặc định của git hash-object luôn luôn là blob."
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
