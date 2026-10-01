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
      "Khám phá cơ chế lưu trữ Loose Objects: cấu trúc phân chia thư mục 2 ký tự đầu và 38 ký tự sau (.git/objects/xx/yyyy)."
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
      "find .git/objects -type f",
      "git count-objects -v"
    ]
  },
  "content": "# Cơ sở dữ liệu đối tượng Git (Object Database)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.\n- Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).\n- Khám phá cơ chế lưu trữ Loose Objects: cấu trúc phân chia thư mục 2 ký tự đầu và 38 ký tự sau (`.git/objects/xx/yyyy`).\n- Hiểu cấu trúc tiêu đề chuẩn của đối tượng Git: `<type> <size>\\0<content>`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Loose Objects\n- **Nói dễ hiểu**: Các đối tượng riêng lẻ được nén zlib độc lập và lưu trữ trực tiếp dưới dạng các tệp tin trong `.git/objects/`.\n- **Ví dụ**: Tệp tin `.git/objects/ce/013625030ba8dba906f756967f9e9cf3944e52` chứa nội dung nén của một blob.\n- **Đừng nhầm**: Không phải đối tượng trong Packfile; khi số lượng loose objects nhiều lên, Git sẽ gom chúng vào tệp `.pack` để tiết kiệm đĩa.\n\n### Object Header Format\n- **Nói dễ hiểu**: Phần đầu nhị phân chuẩn hóa mà Git gắn vào trước nội dung dữ liệu trước khi thực hiện băm SHA-1.\n- **Ví dụ**: Chuỗi tiêu đề `blob 14\\0` được ghép vào trước nội dung `hello world\\n`.\n- **Đừng nhầm**: Người dùng không nhìn thấy tiêu đề này khi dùng lệnh Porcelain; nó được Git tự động tính toán ngầm bên trong.\n\n### Key-Value Store in Git\n- **Nói dễ hiểu**: Mô hình cơ sở dữ liệu tra cứu đơn giản: đưa vào khóa là mã SHA-1 40 ký tự sẽ nhận về giá trị là nội dung giải nén của đối tượng.\n- **Ví dụ**: Tra cứu khóa `ce0136` bằng lệnh `git cat-file -p ce0136` trả về chuỗi văn bản gốc.\n- **Đừng nhầm**: Không có bảng, khóa ngoại hay chỉ mục SQL; mọi quan hệ được tạo ra nhờ các đối tượng trỏ mã băm của nhau.\n\n---\n\n## 📖 Định nghĩa\nCơ sở dữ liệu đối tượng Git (Git Object Database) là một kho lưu trữ cặp Khóa - Giá trị (Key-Value Data Store) nằm tại thư mục `.git/objects/`. Trong hệ thống này, Giá trị (Value) là nội dung của một đối tượng bất kỳ được nén bằng thuật toán zlib, và Khóa (Key) là mã băm băm mật mã học SHA-1 (chuỗi 40 ký tự hexa) được tính toán từ chính nội dung của đối tượng đó kèm theo tiêu đề chuẩn.\n\n---\n\n## 💡 Tại sao cần\nHiểu được cách Git tổ chức cơ sở dữ liệu đối tượng giúp bạn giải mã được sự thần kỳ về tốc độ và tính toàn vẹn của Git. Mọi thứ trong Git — từ một dòng mã bạn viết, một thư mục con, một commit cho đến một nhãn phát hành — đều được quy về một trong bốn loại đối tượng cơ bản bất biến. Nếu dữ liệu bị hỏng dù chỉ 1 bit, mã băm SHA-1 sẽ thay đổi ngay lập tức và Git sẽ phát hiện sự can thiệp bất hợp pháp.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung một thư viện khổng lồ chứa hàng triệu cuốn sách. Thủ thư không xếp sách theo tên tác giả hay ngày xuất bản, mà sử dụng một chiếc máy quét quang học quét toàn bộ chữ trong cuốn sách để tạo ra một mã số định danh duy nhất (SHA-1 hash). Sau đó, thủ thư lấy 2 chữ số đầu của mã số làm số thứ tự của Dãy kệ sách (ví dụ: kệ số `4b`), và 38 chữ số còn lại làm số hiệu cuốn sách đặt trên kệ đó (`.git/objects/4b/825dc6e8`).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình lưu trữ Loose Objects trong .git/objects/:\nSHA-1 Hash: e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\n            ││ └─────────────────────────────────────┘\n            ▼▼                  ▼\n    Tên thư mục con:     Tên tệp tin nén zlib:\n    .git/objects/e6/     9de29bb2d1d6434b8b29ae775ad8c2e48c5391\n\nNội dung bên trong tệp nén:\n[Header: \"<type> <size>\\0\"] + [Payload Content]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư muốn kiểm tra xem Git lưu trữ một chuỗi văn bản như thế nào. Kỹ sư tạo một tệp tin `hello.txt` chứa chữ \"hello\\n\" và chạy lệnh `git hash-object -w hello.txt`. Git trả về mã băm: `ce013625030ba8dba906f756967f9e9cf3944e52`. Kỹ sư mở thư mục `.git/objects/ce/` và thấy một tệp tin mới xuất hiện có tên `013625030ba8dba906f756967f9e9cf3944e52`. Khi kiểm tra tệp này bằng lệnh cat thông thường, màn hình chỉ hiển thị các ký tự nhị phân vô nghĩa vì dữ liệu đã được nén bằng zlib. Khi sử dụng lệnh chuyên dụng `git cat-file -p ce0136`, Git lập tức giải nén và in ra chữ \"hello\" nguyên bản.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Quét toàn bộ tệp đối tượng rời rạc trên đĩa\nfind .git/objects -type f\n\n# Thống kê số lượng đối tượng và dung lượng chiếm dụng\ngit count-objects -v\n\n# Kiểm tra kiểu của đối tượng qua mã băm\ngit cat-file -t ce0136\n\n# Xem nội dung giải nén đẹp của đối tượng\ngit cat-file -p ce0136\n```\n\n---\n\n## 🔍 Giải thích command\n- `find .git/objects -type f`: Liệt kê các tệp đối tượng rời rạc (loose objects) đang lưu trữ trên đĩa.\n- `git count-objects -v`: Thống kê số lượng loose objects, packfiles và dung lượng đĩa tương ứng.\n- `git cat-file -t <hash>`: Đọc header và trả về loại đối tượng (`blob`, `tree`, `commit`, hoặc `tag`).\n- `git cat-file -p <hash>`: Giải nén zlib và in ra nội dung nguyên bản (pretty-print).\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng tên tệp tin được lưu trong đối tượng Blob**: Blob chỉ lưu duy nhất nội dung nhị phân thô; tên tệp và quyền hạn được lưu trong đối tượng Tree.\n2. **Sửa đổi thủ công tệp đối tượng trong `.git/objects/`**: Dẫn tới lỗi \"Corrupt loose object\" do mã băm không còn khớp với nội dung sau khi sửa.\n3. **Hoang mang khi thấy nhiều thư mục 2 ký tự**: Đây là thiết kế tối ưu hóa hệ thống tệp giúp tránh tình trạng một thư mục chứa quá nhiều tệp tin làm chậm hệ điều hành.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Chạy lệnh `git count-objects -v` để ghi nhận số lượng đối tượng ban đầu trong kho.\n2. **Bước 2**: Chạy lệnh `echo \"Git Internals Demo\" | git hash-object -w --stdin` để trực tiếp tạo một blob vào database.\n3. **Bước 3**: Sao chép mã SHA-1 vừa in ra, kiểm tra kiểu đối tượng bằng lệnh `git cat-file -t <mã_sha>`.\n4. **Bước 4**: Chạy `git count-objects -v` lần nữa để thấy chỉ số `count` tăng thêm đúng 1 đối tượng.\n\n---\n\n## 💡 Hint & mẹo\n> Tại sao Git lại tách 2 ký tự đầu làm thư mục con? Vì nhiều hệ thống tệp tin cổ điển (như FAT32 hoặc ext3) sẽ bị chậm nghiêm trọng nếu một thư mục đơn lẻ chứa quá 10.000 tệp tin. Với 256 thư mục con (từ 00 đến ff), tải trọng được phân bổ đều đặn.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git cat-file -t` trả về chuỗi `blob`.\n- Lệnh `git cat-file -p` in ra chính xác dòng chữ \"Git Internals Demo\".\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra mức độ thấu hiểu của bạn về cơ sở dữ liệu đối tượng Git qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTại sao các đối tượng trong Git Object Database lại được gọi là Bất biến (Immutable)? Nếu bạn sửa một dấu phẩy trong tệp tin, chuyện gì sẽ xảy ra với đối tượng cũ?\n\n---\n\n## 📝 Tổng kết\n- Git Object Database là một kho lưu trữ Key-Value dạng Content-Addressable nén bằng zlib.\n- Bốn loại đối tượng cốt lõi gồm: `blob`, `tree`, `commit`, và `tag`.\n- Đường dẫn đối tượng được phân rã thành thư mục 2 ký tự đầu và tệp 38 ký tự còn lại để tối ưu hóa hệ thống tệp.\n- Tính bất biến của đối tượng giúp Git bảo vệ tính toàn vẹn của lịch sử dự án trước mọi nguy cơ sửa đổi.\n",
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
        "explanation": "Git sử dụng mã băm nội dung (Content Hash) làm khóa định danh duy nhất, đảm bảo tính toàn vẹn và bất biến."
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
        "explanation": "Git sử dụng thư viện nén zlib tiêu chuẩn để nén tiêu đề và nội dung của mọi đối tượng trước khi ghi xuống đĩa."
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
        "explanation": "Mọi cấu trúc phức tạp của Git đều được quy tụ về đúng 4 khối hình học cơ bản: blob, tree, commit và tag."
      },
      {
        "id": "q4",
        "question": "Tại sao Git lại chia mã băm 40 ký tự thành thư mục con 2 ký tự và tệp 38 ký tự?",
        "type": "single",
        "options": [
          {
            "text": "Để tránh việc có quá nhiều tệp tin nằm trong cùng một thư mục làm giảm tốc độ của hệ thống tệp tin hệ điều hành",
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
        "explanation": "Việc chia thành 256 thư mục con (từ 00 đến ff) giúp phân tán số lượng tệp, tối ưu hóa tốc độ tìm kiếm và mở tệp của OS."
      },
      {
        "id": "q5",
        "question": "Đặc tính bất biến (immutability) của đối tượng trong Git Object Database có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Khi một đối tượng đã được ghi vào cơ sở dữ liệu, nội dung của nó không bao giờ bị sửa đổi; mọi sự thay đổi sẽ tạo ra một đối tượng mới với mã băm mới",
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
        "explanation": "Vì mã định danh đối tượng được sinh ra trực tiếp từ nội dung của nó, việc sửa đổi dù chỉ 1 bit nội dung sẽ làm thay đổi mã SHA-1 và tạo ra đối tượng mới, giữ nguyên lịch sử cũ."
      }
    ]
  }
};
export default lesson;
