import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-object-database",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "04-object-database",
    "title": "Cơ sở dữ liệu đối tượng Git (Object Database)",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "03-dot-git-directory"
    ],
    "objectives": [
      "Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.",
      "Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).",
      "Phân biệt loose object với object trong packfile; dùng ví dụ SHA-1 khi xem đường dẫn loose object."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "object database",
      "git objects",
      "zlib compression",
      "loose objects",
      "packfiles"
    ],
    "commands": [
      "git count-objects -v",
      "git cat-file -t <object-id>"
    ]
  },
  "content": "# Cơ sở dữ liệu đối tượng Git (Object Database)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.\n- Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).\n- Khám phá cơ chế lưu Loose Objects; ví dụ repo SHA-1 dùng 2 ký tự đầu làm thư mục và phần còn lại làm tên file.\n- Hiểu cấu trúc tiêu đề chuẩn của đối tượng Git: `<type> <size>\\0<content>`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Loose Objects\n- **Nói dễ hiểu**: Các đối tượng riêng lẻ được nén zlib độc lập và lưu trữ trực tiếp dưới dạng các tệp tin trong `.git/objects/`.\n- **Ví dụ**: Trong repo SHA-1, object ID của blob chứa đúng byte `hello\\n` là `ce013625030ba8dba906f756967f9e9ca394464a`; nếu còn là loose, đường dẫn là `.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a`.\n- **Đừng nhầm**: Không phải đối tượng trong Packfile; khi số lượng loose objects nhiều lên, Git sẽ gom chúng vào tệp `.pack` để tiết kiệm đĩa.\n\n### Object Header Format\n- **Nói dễ hiểu**: Header chuẩn hóa mà Git ghép trước nội dung khi tạo object ID theo hash format của repo.\n- **Ví dụ**: Chuỗi tiêu đề `blob 6\\0` được ghép trước nội dung 6 byte `hello\\n`.\n- **Đừng nhầm**: Người dùng không nhìn thấy tiêu đề này khi dùng lệnh Porcelain; nó được Git tự động tính toán ngầm bên trong.\n\n### Key-Value Store in Git\n- **Nói dễ hiểu**: Mô hình tra cứu object bằng object ID; ID dài 40 ký tự trong repo SHA-1 và 64 ký tự trong repo SHA-256.\n- **Ví dụ**: Dùng object ID đầy đủ vừa lấy từ `git hash-object` với `git cat-file -p <object-id>` để xem nội dung.\n- **Đừng nhầm**: Không có bảng, khóa ngoại hay chỉ mục SQL; mọi quan hệ được tạo ra nhờ các đối tượng trỏ mã băm của nhau.\n\n---\n\n## 📖 Định nghĩa\nObject database là kho các object được Git tra cứu bằng object ID. Repo SHA-1 dùng SHA-1; repo SHA-256 dùng SHA-256. Object loose được nén riêng bằng zlib; khi đóng gói, nhiều object được lưu trong packfile có thể dùng delta compression. Git directory mặc định chứa `objects/`, nhưng có thể cấu hình vị trí khác.\n\n---\n\n## 💡 Tại sao cần\nHiểu object database giúp bạn đọc lịch sử và chẩn đoán dữ liệu. Object ID cho phép Git phát hiện thay đổi ngoài ý muốn; SHA-1 có điểm yếu va chạm đã biết và Git có cơ chế bảo vệ bổ sung. Không nên mô tả hash là bảo đảm mật mã tuyệt đối hoặc cho rằng object bất khả xóa.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung một thư viện sắp object theo ID thay vì tên tệp. Trong repository SHA-1, ID có 40 ký tự hexa; nếu object còn loose, Git dùng hai ký tự đầu làm thư mục và phần còn lại làm tên tệp. Ví dụ, blob rỗng có ID `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` nằm loose tại `.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391`. Repo SHA-256 và object đã pack có cách nhìn khác.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình lưu trữ Loose Objects trong .git/objects/:\nSHA-1 Hash: e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\n            ││ └─────────────────────────────────────┘\n            ▼▼                  ▼\n    Tên thư mục con:     Tên tệp tin nén zlib:\n    .git/objects/e6/     9de29bb2d1d6434b8b29ae775ad8c2e48c5391\n\nNội dung bên trong tệp nén:\n[Header: \"<type> <size>\\0\"] + [Payload Content]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư tạo `hello.txt` chứa đúng 6 byte `hello` và ký tự xuống dòng rồi chạy `git hash-object -w hello.txt`. Trong repo SHA-1, Git in `ce013625030ba8dba906f756967f9e9ca394464a`; nếu object còn ở dạng loose, nó nằm tại `.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a`. Dùng `git cat-file -p <object-id>` để xem nội dung đã giải nén. Nếu object đã được pack, bạn sẽ không thấy file loose tương ứng.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Thống kê số lượng loose objects và packfiles\ngit count-objects -v\n\n# Tính object ID cho nội dung mà không ghi object\necho \"Git Internals Demo\" | git hash-object --stdin\n\n# Kiểm tra kiểu và nội dung bằng object ID vừa in ra\ngit cat-file -t <object-id>\ngit cat-file -p <object-id>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git count-objects -v`: Thống kê loose objects và thông tin packfiles; không nhất thiết có một file riêng cho mỗi object.\n- `git hash-object --stdin`: Tính object ID, mặc định không ghi object vào database.\n- `git cat-file -t <object-id>`: In loại object (`blob`, `tree`, `commit` hoặc `tag`).\n- `git cat-file -p <object-id>`: Hiển thị nội dung object theo dạng dễ đọc; blob nhị phân có thể không hiển thị thành văn bản dễ hiểu.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng tên tệp tin được lưu trong đối tượng Blob**: Blob chỉ lưu duy nhất nội dung nhị phân thô; tên tệp và quyền hạn được lưu trong đối tượng Tree.\n2. **Sửa đổi thủ công tệp đối tượng trong `.git/objects/`**: Dẫn tới lỗi \"Corrupt loose object\" do mã băm không còn khớp với nội dung sau khi sửa.\n3. **Cho rằng mọi repo đều có đường dẫn object dạng 2+38 ký tự**: Đó là ví dụ loose object của định dạng SHA-1; repo SHA-256 có ID dài hơn và packed object nằm trong packfile.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Chạy `git hash-object --stdin` rồi nhập một dòng nội dung duy nhất; lưu object ID được in ra.\n2. Chạy `git cat-file -t <object-id>` để xác nhận loại là `blob` và `git cat-file -p <object-id>` để đọc nội dung.\n3. Lặp lại `git hash-object --stdin` với cùng nội dung. ID phải giống nhau.\n4. Thêm cờ `-w` để ghi object; sau đó dùng `git count-objects -v` xem thống kê. Số loose objects có thể không tăng nếu blob đã tồn tại hoặc Git pack dữ liệu.\n\n---\n\n## 💡 Hint & mẹo\n> Cấu trúc 2 ký tự đầu là cách Git tổ chức loose objects; không cần suy ra một ngưỡng hiệu năng cụ thể của hệ điều hành. Packfile có bố cục khác.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git cat-file -t` trả về chuỗi `blob`.\n- Lệnh `git cat-file -p` in ra chính xác dòng chữ \"Git Internals Demo\".\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra mức độ thấu hiểu của bạn về cơ sở dữ liệu đối tượng Git qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTại sao các đối tượng trong Git Object Database lại được gọi là Bất biến (Immutable)? Nếu bạn sửa một dấu phẩy trong tệp tin, chuyện gì sẽ xảy ra với đối tượng cũ?\n\n---\n\n## 📝 Tổng kết\n- Git Object Database là một kho lưu trữ Key-Value dạng Content-Addressable nén bằng zlib.\n- Bốn loại đối tượng cốt lõi gồm: `blob`, `tree`, `commit`, và `tag`.\n- Trong repo SHA-1, đường dẫn loose object dùng 2 ký tự đầu làm thư mục và phần còn lại làm tên file; packfile không theo cấu trúc đó.\n- Object ID giúp phát hiện thay đổi nội dung; không nên xem hash hoặc object là bất khả xóa hay bảo đảm an ninh tuyệt đối.\n",
  "quiz": {
    "id": "quiz-08-git-internals-04-object-database",
    "title": "Trắc nghiệm: Cơ sở dữ liệu đối tượng Git (Object Database)",
    "questions": [
      {
        "id": "q1",
        "question": "Trong Git Object Database, Khóa (Key) dùng để định danh và tra cứu một đối tượng được tạo ra như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Là mã băm mật mã học (SHA-1/SHA-256) được tính toán từ nội dung của đối tượng đó",
            "correct": true
          },
          {
            "text": "Là số thứ tự tăng dần tự động (Auto-increment ID: 1, 2, 3)",
            "correct": false
          },
          {
            "text": "Là tên của tệp tin do người dùng đặt",
            "correct": false
          },
          {
            "text": "Là ngày giờ tạo ra tệp tin",
            "correct": false
          }
        ],
        "explanation": "Git dùng hash của object làm object ID; thuật toán là SHA-1 hoặc SHA-256 tùy định dạng của repository."
      },
      {
        "id": "q2",
        "question": "Git sử dụng thuật toán nén dữ liệu nào cho các đối tượng lưu trữ dạng rời rạc (Loose Objects)?",
        "type": "single",
        "options": [
          {
            "text": "zlib (Deflate)",
            "correct": true
          },
          {
            "text": "mp3",
            "correct": false
          },
          {
            "text": "jpeg",
            "correct": false
          },
          {
            "text": "rar",
            "correct": false
          }
        ],
        "explanation": "Loose objects được nén bằng zlib; trong packfile, Git có thể lưu object bằng delta để tiết kiệm dung lượng."
      },
      {
        "id": "q3",
        "question": "Bốn loại đối tượng cơ bản duy nhất tồn tại trong cơ sở dữ liệu của Git là gì?",
        "type": "single",
        "options": [
          {
            "text": "blob, tree, commit, và tag",
            "correct": true
          },
          {
            "text": "file, folder, branch, và remote",
            "correct": false
          },
          {
            "text": "text, image, audio, và video",
            "correct": false
          },
          {
            "text": "user, pass, token, và key",
            "correct": false
          }
        ],
        "explanation": "Blob, tree, commit và tag là bốn loại object cơ bản; branch và remote là refs/cấu hình chứ không phải object type."
      },
      {
        "id": "q4",
        "question": "Trong repo SHA-1, loose object được tổ chức theo đường dẫn nào?",
        "type": "single",
        "options": [
          {
            "text": "Hai ký tự đầu của object ID làm tên thư mục; phần còn lại làm tên file object",
            "correct": true
          },
          {
            "text": "Để mã hóa thông tin chống người khác đọc trộm",
            "correct": false
          },
          {
            "text": "Để tiết kiệm dung lượng pin máy tính",
            "correct": false
          },
          {
            "text": "Do quy định bắt buộc của ngôn ngữ C",
            "correct": false
          }
        ],
        "explanation": "Đây là cách bố trí loose object truyền thống của repo SHA-1; object được pack thì nằm trong các packfile thay vì mỗi object một file."
      },
      {
        "id": "q5",
        "question": "Đặc tính bất biến (immutability) của đối tượng trong Git Object Database có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Object được định danh từ nội dung; thay đổi nội dung thường tạo object ID khác, nhưng object không phải bất khả xóa",
            "correct": true
          },
          {
            "text": "Đối tượng không thể bị xóa ngay cả khi dùng lệnh rm -rf",
            "correct": false
          },
          {
            "text": "Đối tượng chỉ đọc được trên một máy tính duy nhất",
            "correct": false
          },
          {
            "text": "Đối tượng tự động biến mất sau 30 ngày",
            "correct": false
          }
        ],
        "explanation": "Git tính object ID từ header và nội dung; sửa đổi thường làm ID khác, còn object cũ chỉ được giữ khi còn tham chiếu hoặc chưa bị garbage collection dọn."
      }
    ]
  }
};
export default lesson;
