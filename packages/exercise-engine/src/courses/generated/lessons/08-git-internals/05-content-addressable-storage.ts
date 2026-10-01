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
  "content": "# Bộ nhớ định danh theo nội dung (Content-Addressable Storage)\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).\n- Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.\n- Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: `<type> <size>\\0<content>`.\n- Hiểu tại sao mã băm mật mã học bảo vệ toàn vẹn lịch sử Git trước mọi hành vi can thiệp trái phép.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Content-Addressable Storage (CAS)\n- **Nói dễ hiểu**: Phương thức lưu trữ mà địa chỉ dữ liệu chính là mã băm tính toán trực tiếp từ nội dung của đối tượng.\n- **Ví dụ**: Bạn đưa nội dung vào hàm băm để nhận về địa chỉ khóa SHA-1, không dựa vào tên hay đường dẫn tệp.\n- **Đừng nhầm**: Không giống hệ thống tệp thông thường (tìm file theo tên thư mục); Git tìm dữ liệu theo vân tay nội dung.\n\n### Automatic Deduplication\n- **Nói dễ hiểu**: Khả năng tự động loại bỏ dữ liệu trùng lặp; nhiều tệp giống hệt nhau về nội dung chỉ lưu duy nhất một bản trên đĩa.\n- **Ví dụ**: Sao chép một file ảnh 10MB vào 5 thư mục khác nhau thì Git vẫn chỉ tốn đúng 10MB bộ nhớ cho một đối tượng Blob.\n- **Đừng nhầm**: Các tệp vẫn có tên và đường dẫn riêng biệt trong đối tượng Tree, nhưng cùng trỏ tới một mã băm Blob duy nhất.\n\n### Cryptographic Hash (SHA-1 / SHA-256)\n- **Nói dễ hiểu**: Thuật toán băm một chiều biến đổi một khối dữ liệu có kích thước bất kỳ thành chuỗi ký tự độ dài cố định (40 ký tự hexa với SHA-1).\n- **Ví dụ**: Chuỗi băm `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` là mã băm chuẩn của một tệp rỗng (0 byte) trong Git.\n- **Đừng nhầm**: Không phải thuật toán mã hóa (encryption) có thể giải mã ngược lại; đây là hàm băm một chiều dùng để kiểm tra tính toàn vẹn.\n\n---\n\n## 📖 Định nghĩa\nContent-Addressable Storage (CAS) là cơ chế lưu trữ dữ liệu trong đó thông tin được truy xuất và định danh dựa trên chính nội dung của nó, chứ không phải dựa trên vị trí đường dẫn hay tên gọi. Trong Git, mỗi khi bạn đưa dữ liệu vào hệ thống, Git sẽ băm toàn bộ nội dung cùng với một phần tiêu đề chuẩn mực thông qua thuật toán hàm băm SHA-1 để tạo ra mã định danh duy nhất (Content Hash). Nếu nội dung thay đổi dù chỉ một dấu cách, mã băm sẽ hoàn toàn khác; nếu nội dung giống hệt nhau, mã băm sẽ luôn luôn trùng khớp.\n\n---\n\n## 💡 Tại sao cần\nNguyên lý CAS mang lại hai siêu năng lực cốt lõi cho Git: Thứ nhất là Khử trùng lặp tự động (Automatic Deduplication) — nếu bạn có 100 tệp tin ở 100 thư mục khác nhau nhưng cùng chung nội dung, Git chỉ lưu đúng 1 đối tượng duy nhất trên đĩa, tiết kiệm dung lượng khổng lồ. Thứ hai là Tính toàn vẹn mật mã học (Cryptographic Integrity) — không ai có thể âm thầm sửa đổi mã nguồn trong quá khứ mà không làm thay đổi toàn bộ cây mã băm.\n\n---\n\n## 🧠 Mental Model\nHãy so sánh việc tìm một người bằng số Căn cước công dân (Định danh theo nội dung) với việc tìm theo số phòng khách sạn (Định danh theo vị trí). Nếu tìm theo số phòng, người thuê phòng có thể thay đổi liên tục nhưng số phòng vẫn là 301. Nhưng nếu tìm theo số Căn cước công dân gắn liền với vân tay và võng mạc (nội dung sinh trắc học), dù người đó có di chuyển sang bất kỳ tỉnh thành nào trên thế giới thì danh tính của họ vẫn duy nhất và không bao giờ bị trùng lặp.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế tạo mã băm trong Content-Addressable Storage:\nNội dung văn bản: \"hello\\n\" (chiều dài: 6 bytes)\nLoại đối tượng:  blob\n\nChuỗi dữ liệu chuẩn hóa đưa vào hàm băm:\n\"blob 6\\0hello\\n\"\n        │\n        ▼ [Hàm băm mật mã học SHA-1]\n  ce013625030ba8dba906f756967f9e9cf3944e52\n\n(Bất kỳ ai trên thế giới băm chuỗi này đều ra đúng mã hash trên)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột lập trình viên sao chép một tệp thư viện JavaScript có dung lượng 5 MB có tên `lodash.js` vào 10 thư mục module khác nhau trong dự án. Khi thực hiện `git add .`, lập trình viên lo lắng rằng thư mục `.git/` sẽ bị phình to thêm 50 MB (5 MB x 10). Tuy nhiên, khi kiểm tra dung lượng, thư mục `.git/objects/` chỉ tăng thêm đúng 5 MB. Lý do là vì cả 10 tệp tin đều có chung nội dung, Git áp dụng nguyên lý Content-Addressable Storage và tính toán ra cùng một mã băm SHA-1 duy nhất. Cả 10 đường dẫn khác nhau đều trỏ chung về một đối tượng Blob duy nhất trên đĩa.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Tính mã băm của chuỗi mà không ghi xuống đĩa\necho \"hello world\" | git hash-object --stdin\n\n# Tính mã băm và đồng thời ghi đối tượng vào .git/objects/\necho \"hello world\" | git hash-object -w --stdin\n\n# Tự tính toán thủ công bằng lệnh sha1sum của Linux để kiểm chứng\nprintf \"blob 12\\0hello world\\n\" | sha1sum\n```\n\n---\n\n## 🔍 Giải thích command\n- `git hash-object --stdin`: Nhận dữ liệu từ terminal stdin, thêm tiêu đề chuẩn `blob <length>\\0` và tính toán mã SHA-1.\n- Cờ `-w` (write): Yêu cầu Git ghi đối tượng nén zlib vào đúng thư mục con tương ứng trong `.git/objects/`.\n- `printf \"blob 12\\0hello world\\n\" | sha1sum`: Thao tác băm thủ công chứng minh công thức tiêu đề nội tại của Git hoàn toàn minh bạch.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng mã băm chỉ tính từ nội dung file**: Nếu bạn dùng lệnh `sha1sum file.txt` thông thường, kết quả sẽ khác với `git hash-object file.txt` vì Git bắt buộc phải ghép thêm header `blob <size>\\0`.\n2. **Lo lắng khi đổi tên file làm tăng dung lượng kho**: Đổi tên file chỉ tạo ra đối tượng Tree mới chứa tên mới, còn nội dung Blob cũ được tái sử dụng 100%.\n3. **Hiểu lầm về va chạm mã băm**: Không gian địa chỉ 160-bit của SHA-1 có tới 2^160 khả năng, xác suất va chạm tự nhiên là 0 trong thực tế phát triển phần mềm.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Chạy lệnh `echo \"hello git\" | git hash-object --stdin` và ghi lại mã băm đầu ra.\n2. **Bước 2**: Tạo tệp `doc1.txt` chứa dòng chữ \"hello git\" và chạy `git hash-object doc1.txt`.\n3. **Bước 3**: Tạo tệp `sub/doc2.txt` ở thư mục con khác nhưng có cùng nội dung \"hello git\" và chạy `git hash-object sub/doc2.txt`.\n4. **Bước 4**: Đối chiếu 3 mã băm để xác nhận cả 3 kết quả đều cho ra cùng một chuỗi SHA-1 giống nhau hoàn toàn.\n\n---\n\n## 💡 Hint & mẹo\n> Hai tệp tin ở hai vị trí khác nhau, mang hai tên gọi khác nhau, nhưng hễ có nội dung giống nhau thì sẽ có mã băm SHA-1 giống hệt nhau. Đó chính là bản chất của cơ chế khử trùng lặp trong Git.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Cả 3 lệnh tính toán đều in ra cùng một chuỗi 40 ký tự hexa duy nhất.\n- Kiểm tra `.git/objects/` chỉ thấy xuất hiện 1 đối tượng duy nhất đại diện cho nội dung \"hello git\".\n\n---\n\n## ❓ Quiz nhanh\nCùng kiểm tra mức độ thấu hiểu nguyên lý Content-Addressable Storage qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nNếu bạn có một dự án mã nguồn gồm 10.000 tệp tin nhưng tất cả các tệp đều hoàn toàn trống rỗng (0 bytes), cơ sở dữ liệu đối tượng của Git sẽ tạo ra bao nhiêu đối tượng Blob? Mã băm của tệp rỗng trong Git là gì?\n\n---\n\n## 📝 Tổng kết\n- Content-Addressable Storage lưu trữ và truy xuất dữ liệu dựa trên mã băm nội dung của chính nó.\n- Công thức tính băm chuẩn của Git luôn bao gồm tiêu đề: `<type> <size>\\0<content>`.\n- Mang lại khả năng tự động khử trùng lặp dữ liệu tuyệt đối và bảo đảm tính toàn vẹn bất biến.\n- Đổi tên tệp hoặc di chuyển thư mục không làm tốn thêm dung lượng lưu trữ nội dung tệp tin.\n",
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
        "question": "Đặc tính Bất biến (Immutability) trong hệ thống Content-Addressable Storage nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung của một đối tượng đã tạo ra không bao giờ bị sửa đổi; sửa nội dung sẽ sinh ra đối tượng mới với mã băm mới",
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
        "explanation": "Cờ -w viết tắt của write (ghi xuống đĩa). Nếu không có cờ -w, lệnh chỉ tính và in ra mã băm mà không ghi đối tượng."
      },
      {
        "id": "q5",
        "question": "Tại sao thuật toán SHA-1 hoặc SHA-256 lại được coi là nền tảng bảo mật toàn vẹn của Git?",
        "type": "single",
        "options": [
          {
            "text": "Vì bất kỳ sự sửa đổi nào dù vô tình hay độc hại đối với mã nguồn hoặc lịch sử commit đều khiến toàn bộ mã băm thay đổi, làm lộ hành vi can thiệp",
            "correct": true
          },
          {
            "text": "Vì Git dùng mã băm để giấu code không cho lập trình viên khác xem",
            "correct": false
          },
          {
            "text": "Vì mã băm giúp tăng tốc độ mạng Internet khi push code",
            "correct": false
          },
          {
            "text": "Vì các máy chủ đám mây chỉ chấp nhận file có SHA-1",
            "correct": false
          }
        ],
        "explanation": "Do tính chất một chiều của hàm băm mật mã học, không thể sửa đổi nội dung mà vẫn giữ nguyên mã hash, giúp bảo vệ toàn vẹn lịch sử mã nguồn tuyệt đối."
      }
    ]
  }
};
export default lesson;
