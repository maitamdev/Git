import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-content-addressable-storage",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "05-content-addressable-storage",
    "title": "Bộ nhớ định danh theo nội dung (Content-Addressable Storage)",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "04-object-database"
    ],
    "objectives": [
      "Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).",
      "Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.",
      "Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: <type> <size>\\0<content>."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "content addressable",
      "cryptographic hashing",
      "sha-1",
      "deduplication",
      "immutability"
    ],
    "commands": [
      "echo -e \"test content\\n\" | git hash-object --stdin",
      "sha1sum"
    ]
  },
  "content": "# Bộ nhớ định danh theo nội dung (Content-Addressable Storage)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).\n- Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.\n- Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: <type> <size>\\0<content>.\n\n---\n\n## 📖 Định nghĩa\n> Content-Addressable Storage (CAS) là cơ chế lưu trữ dữ liệu trong đó thông tin được truy xuất và định danh dựa trên chính nội dung của nó, chứ không phải dựa trên vị trí đường dẫn hay tên gọi. Trong Git, mỗi khi bạn đưa dữ liệu vào hệ thống, Git sẽ băm toàn bộ nội dung cùng với một phần tiêu đề chuẩn mực thông qua thuật toán hàm băm SHA-1 để tạo ra mã định danh duy nhất (Content Hash). Nếu nội dung thay đổi dù chỉ một dấu cách, mã băm sẽ hoàn toàn khác; nếu nội dung giống hệt nhau, mã băm sẽ luôn luôn trùng khớp.\n\n---\n\n## 🤔 Tại sao cần?\nNguyên lý CAS mang lại hai siêu năng lực cốt lõi cho Git: Thứ nhất là Khử trùng lặp tự động (Automatic Deduplication) — nếu bạn có 100 tệp tin ở 100 thư mục khác nhau nhưng cùng chung nội dung, Git chỉ lưu đúng 1 đối tượng duy nhất trên đĩa, tiết kiệm dung lượng khổng lồ. Thứ hai là Tính toàn vẹn mật mã học (Cryptographic Integrity) — không ai có thể âm thầm sửa đổi mã nguồn trong quá khứ mà không làm thay đổi toàn bộ cây mã băm.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy so sánh việc tìm một người bằng số Căn cước công dân (Định danh theo nội dung) với việc tìm theo số phòng khách sạn (Định danh theo vị trí). Nếu tìm theo số phòng, người thuê phòng có thể thay đổi liên tục nhưng số phòng vẫn là 301. Nhưng nếu tìm theo số Căn cước công dân gắn liền với vân tay và võng mạc (nội dung sinh trắc học), dù người đó có di chuyển sang bất kỳ tỉnh thành nào trên thế giới thì danh tính của họ vẫn duy nhất và không bao giờ bị trùng lặp.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nCơ chế tạo mã băm trong Content-Addressable Storage:\nNội dung văn bản: \"hello\\n\" (chiều dài: 6 bytes)\nLoại đối tượng:  blob\n\nChuỗi dữ liệu chuẩn hóa đưa vào hàm băm:\n\"blob 6\\0hello\\n\"\n        │\n        ▼ [Hàm băm mật mã học SHA-1]\n  ce013625030ba8dba906f756967f9e9cf3944e52\n\n(Bất kỳ ai trên thế giới băm chuỗi này đều ra đúng mã hash trên!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột lập trình viên sao chép một tệp thư viện JavaScript có dung lượng 5 MB có tên `lodash.js` vào 10 thư mục module khác nhau trong dự án. Khi thực hiện `git add .`, lập trình viên lo lắng rằng thư mục `.git/` sẽ bị phình to thêm 50 MB (5 MB x 10). Tuy nhiên, khi kiểm tra dung lượng, thư mục `.git/objects/` chỉ tăng thêm đúng 5 MB. Lý do là vì cả 10 tệp tin đều có chung nội dung, Git áp dụng nguyên lý Content-Addressable Storage và tính toán ra cùng một mã băm SHA-1 duy nhất. Cả 10 đường dẫn khác nhau đều trỏ chung về một đối tượng Blob duy nhất trên đĩa.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\necho -e \"test content\\n\" | git hash-object --stdin\nsha1sum\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git hash-object --stdin nhận dữ liệu từ luồng đầu vào, tự động gắn tiêu đề chuẩn của đối tượng và tính toán mã băm SHA-1 tương ứng mà không cần phải tạo tệp tin vật lý trên đĩa.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cho rằng mã băm của tệp tin chỉ tính từ nội dung của tệp**:  Git bắt buộc phải ghép thêm phần tiêu đề `\"<type> <size>\\0\"` trước khi băm.\n2. **Sợ rằng việc đổi tên tệp tin (rename file) sẽ làm tăng gấp đôi dung lượng repository**:  Vì nội dung không đổi, Blob cũ được tái sử dụng 100%.\n3. **Nghĩ rằng mã băm SHA-1 có thể bị trùng lặp ngẫu nhiên trong một dự án thực tế**:  Xác suất va chạm SHA-1 là vô cùng nhỏ, tương đương xác suất bị sét đánh trúng trúng xổ số nhiều lần liên tiếp.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Chạy lệnh `echo \"hello world\" | git hash-object --stdin` và ghi lại mã băm đầu ra.\n2. Tạo một tệp `a.txt` chứa dòng chữ \"hello world\" và chạy `git hash-object a.txt`.\n3. Tạo một tệp `b.txt` nằm trong thư mục con cũng chứa dòng chữ \"hello world\" và so sánh mã băm.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Hai tệp tin ở hai vị trí khác nhau, mang hai tên gọi khác nhau, nhưng hễ có nội dung giống nhau thì sẽ có mã băm SHA-1 giống hệt nhau.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nXác nhận mã băm của hai tệp tin có cùng nội dung là hoàn toàn trùng khớp 100%.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng kiểm tra mức độ thấu hiểu nguyên lý Content-Addressable Storage qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nNếu bạn có một dự án mã nguồn gồm 10.000 tệp tin nhưng tất cả các tệp đều hoàn toàn trống rỗng (0 bytes), cơ sở dữ liệu đối tượng của Git sẽ tạo ra bao nhiêu đối tượng Blob?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Content-Addressable Storage lưu trữ và truy xuất dữ liệu dựa trên mã băm nội dung của chính nó.\n- Công thức tính băm chuẩn của Git luôn bao gồm tiêu đề: `\"<type> <size>\\0<content>\"`.\n- Mang lại khả năng tự động khử trùng lặp dữ liệu tuyệt đối và bảo đảm tính toàn vẹn bất biến.\n",
  "quiz": {
    "id": "quiz-08-git-internals-05-content-addressable-storage",
    "title": "Trắc nghiệm: Bộ nhớ định danh theo nội dung (Content-Addressable Storage)",
    "questions": [
      {
        "id": "q1",
        "question": "Công thức chuỗi dữ liệu đầu vào mà Git sử dụng để tính toán mã băm SHA-1 cho một đối tượng là gì?",
        "type": "single",
        "options": [
          {
            "text": "<type> <size>\\0<content>",
            "correct": true
          },
          {
            "text": "<filename> <content>",
            "correct": false
          },
          {
            "text": "<timestamp> <author> <content>",
            "correct": false
          },
          {
            "text": "Chỉ riêng phần <content> thuần túy",
            "correct": false
          }
        ],
        "explanation": "Git luôn gắn phần tiêu đề gồm loại đối tượng, dấu cách, kích thước byte, ký tự null byte (\\0) rồi mới đến nội dung."
      },
      {
        "id": "q2",
        "question": "Nếu bạn có 5 tệp tin ở 5 thư mục khác nhau nhưng có nội dung hoàn toàn giống nhau từng ký tự, Git sẽ lưu bao nhiêu Blob trong .git/objects/?",
        "type": "single",
        "options": [
          {
            "text": "Đúng 1 đối tượng Blob duy nhất (cơ chế khử trùng lặp)",
            "correct": true
          },
          {
            "text": "5 đối tượng Blob riêng biệt",
            "correct": false
          },
          {
            "text": "Không lưu đối tượng nào cả",
            "correct": false
          },
          {
            "text": "10 đối tượng",
            "correct": false
          }
        ],
        "explanation": "Vì nội dung giống nhau nên mã băm giống nhau, Git tái sử dụng ngay đối tượng đã có mà không ghi đè thêm bản sao."
      },
      {
        "id": "q3",
        "question": "Đặc tính \"Bất biến\" (Immutability) trong hệ thống Content-Addressable Storage nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung của một đối tượng đã tạo ra không bao giờ có thể bị sửa đổi, sửa nội dung sẽ sinh ra đối tượng mới với mã băm mới",
            "correct": true
          },
          {
            "text": "Không ai có quyền xóa kho lưu trữ Git",
            "correct": false
          },
          {
            "text": "Tệp tin bị khóa quyền chỉ đọc trên hệ điều hành",
            "correct": false
          },
          {
            "text": "Chỉ có tác giả mới có quyền commit",
            "correct": false
          }
        ],
        "explanation": "Mỗi đối tượng gắn liền vĩnh viễn với mã băm của nó. Thay đổi dù 1 bit cũng biến nó thành một đối tượng hoàn toàn khác."
      },
      {
        "id": "q4",
        "question": "Lệnh nào cho phép bạn tính toán mã băm của một chuỗi dữ liệu mà không cần phải ghi đối tượng vào thư mục .git/objects/?",
        "type": "single",
        "options": [
          {
            "text": "git hash-object (không kèm cờ -w)",
            "correct": true
          },
          {
            "text": "git hash-object -w",
            "correct": false
          },
          {
            "text": "git write-tree",
            "correct": false
          },
          {
            "text": "git cat-file -p",
            "correct": false
          }
        ],
        "explanation": "Cờ `-w` viết tắt của write (ghi xuống đĩa). Nếu không có cờ `-w`, lệnh chỉ tính và in ra mã băm mà không ghi đối tượng."
      }
    ]
  }
};
export default lesson;
