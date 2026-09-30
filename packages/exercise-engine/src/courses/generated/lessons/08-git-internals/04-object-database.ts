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
  "content": "# Cơ sở dữ liệu đối tượng Git (Object Database)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.\n- Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).\n- Khám phá cơ chế lưu trữ Loose Objects: cấu trúc phân chia thư mục 2 ký tự đầu và 38 ký tự sau (.git/objects/xx/yyyy).\n\n---\n\n## 📖 Định nghĩa\n> Cơ sở dữ liệu đối tượng Git (Git Object Database) là một kho lưu trữ cặp Khóa - Giá trị (Key-Value Data Store) nằm tại thư mục .git/objects/. Trong hệ thống này, Giá trị (Value) là nội dung của một đối tượng bất kỳ được nén bằng thuật toán zlib, và Khóa (Key) là mã băm băm mật mã học SHA-1 (chuỗi 40 ký tự hexa) được tính toán từ chính nội dung của đối tượng đó kèm theo tiêu đề chuẩn.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu được cách Git tổ chức cơ sở dữ liệu đối tượng giúp bạn giải mã được sự thần kỳ về tốc độ và tính toàn vẹn của Git. Mọi thứ trong Git — từ một dòng mã bạn viết, một thư mục con, một commit cho đến một nhãn phát hành — đều được quy về một trong bốn loại đối tượng cơ bản bất biến. Nếu dữ liệu bị hỏng dù chỉ 1 bit, mã băm SHA-1 sẽ thay đổi ngay lập tức và Git sẽ phát hiện sự can thiệp bất hợp pháp.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung một thư viện khổng lồ chứa hàng triệu cuốn sách. Thủ thư không xếp sách theo tên tác giả hay ngày xuất bản, mà sử dụng một chiếc máy quét quang học quét toàn bộ chữ trong cuốn sách để tạo ra một mã số định danh duy nhất (SHA-1 hash). Sau đó, thủ thư lấy 2 chữ số đầu của mã số làm số thứ tự của Dãy kệ sách (ví dụ: kệ số `4b`), và 38 chữ số còn lại làm số hiệu cuốn sách đặt trên kệ đó (`.git/objects/4b/825dc6e8`).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nMô hình lưu trữ Loose Objects trong .git/objects/:\nSHA-1 Hash: e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\n            ││ └─────────────────────────────────────┘\n            ▼▼                  ▼\n    Tên thư mục con:     Tên tệp tin nén zlib:\n    .git/objects/e6/     9de29bb2d1d6434b8b29ae775ad8c2e48c5391\n\nNội dung bên trong tệp nén:\n[Header: \"<type> <size>\\0\"] + [Payload Content]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư muốn kiểm tra xem Git lưu trữ một chuỗi văn bản như thế nào. Kỹ sư tạo một tệp tin `hello.txt` chứa chữ \"hello\\n\" và chạy lệnh `git hash-object -w hello.txt`. Git trả về mã băm: `ce013625030ba8dba906f756967f9e9cf3944e52`. Kỹ sư mở thư mục `.git/objects/ce/` và thấy một tệp tin mới xuất hiện có tên `013625030ba8dba906f756967f9e9cf3944e52`. Khi kiểm tra tệp này bằng lệnh cat thông thường, màn hình chỉ hiển thị các ký tự nhị phân vô nghĩa vì dữ liệu đã được nén bằng zlib. Khi sử dụng lệnh chuyên dụng `git cat-file -p ce0136`, Git lập tức giải nén và in ra chữ \"hello\" nguyên bản.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\nfind .git/objects -type f\ngit count-objects -v\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh find quét và hiển thị tất cả các tệp đối tượng rời rạc (loose objects) đang có trên đĩa, và git count-objects -v thống kê tổng số lượng đối tượng và dung lượng lưu trữ thực tế mà chúng chiếm dụng.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nhầm tưởng rằng tên tệp tin (ví dụ**:  `app.ts` hay `index.html`) được lưu bên trong đối tượng Blob: Blob chỉ lưu duy nhất nội dung, tên tệp được lưu trong đối tượng Tree.\n2. **Sửa đổi nội dung của một tệp đối tượng trong `.git/objects/` bằng tay khiến Git báo lỗi \"Corrupt loose object\".**: \n3. **Lo lắng khi thấy hàng trăm thư mục 2 ký tự sinh ra trong `.git/objects/`**:  Đây là thiết kế có chủ đích để tránh việc một thư mục chứa quá nhiều tệp làm giảm hiệu năng hệ điều hành.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Chạy lệnh `git count-objects -v` để xem thống kê số lượng đối tượng trong repository hiện tại.\n2. Tạo một commit mới và chạy lại lệnh trên để quan sát số lượng đối tượng tăng lên.\n3. Sử dụng lệnh `find .git/objects -type f` để xem cấu trúc đường dẫn phân tách 2 ký tự đầu.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Tại sao Git lại tách 2 ký tự đầu làm thư mục con? Vì nhiều hệ thống tệp tin cổ điển (như FAT32 hoặc ext3) sẽ bị chậm nghiêm trọng nếu một thư mục đơn lẻ chứa quá 10.000 tệp tin.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nGiải thích được quy tắc băm và phân rã đường dẫn thư mục `xx/yyyy` của các đối tượng Git.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra mức độ thấu hiểu của bạn về cơ sở dữ liệu đối tượng Git qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao các đối tượng trong Git Object Database lại được gọi là Bất biến (Immutable)? Nếu bạn sửa một dấu phẩy trong tệp tin, chuyện gì sẽ xảy ra với đối tượng cũ?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Git Object Database là một kho lưu trữ Key-Value dạng Content-Addressable nén bằng zlib.\n- Bốn loại đối tượng cốt lõi gồm: `blob`, `tree`, `commit`, và `tag`.\n- Đường dẫn đối tượng được phân rã thành thư mục 2 ký tự đầu và tệp 38 ký tự còn lại để tối ưu hóa hệ thống tệp.\n",
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
        "question": "Tại sao Git lại chia mã băm 40 ký tự thành thư mục con 2 ký tự và tệp 38 ký tự (ví dụ: objects/4b/825de8)?",
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
      }
    ]
  }
};
export default lesson;
