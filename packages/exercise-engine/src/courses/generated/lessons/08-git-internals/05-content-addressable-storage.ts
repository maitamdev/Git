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
      "Hiểu Git có thể tái sử dụng cùng object khi byte dữ liệu đã lưu giống nhau.",
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
      "sha-256",
      "sha-1 compatibility",
      "deduplication",
      "immutability"
    ],
    "commands": [
      "echo -e \"test content\\n\" | git hash-object --stdin",
      "sha1sum"
    ]
  },
  "content": "# Bộ nhớ định danh theo nội dung (Content-Addressable Storage)\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).\n- Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.\n- Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: `<type> <size>\\0<content>`.\n- Hiểu mã băm giúp nhận diện thay đổi nội dung và các giới hạn của SHA-1.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Content-Addressable Storage (CAS)\n- **Nói dễ hiểu**: Phương thức lưu trữ mà địa chỉ dữ liệu chính là mã băm tính toán trực tiếp từ nội dung của đối tượng.\n- **Ví dụ**: Git tính object ID từ header và nội dung; tên/đường dẫn file được lưu trong tree, không nằm trong blob.\n- **Đừng nhầm**: Không giống hệ thống tệp thông thường (tìm file theo tên thư mục); Git tìm dữ liệu theo vân tay nội dung.\n\n### Automatic Deduplication\n- **Nói dễ hiểu**: Khả năng tự động loại bỏ dữ liệu trùng lặp; nhiều tệp giống hệt nhau về nội dung chỉ lưu duy nhất một bản trên đĩa.\n- **Ví dụ**: Hai file có nội dung blob giống hệt nhau có thể cùng trỏ tới một object; tổng dung lượng thực tế còn phụ thuộc nén và cách lưu.\n- **Đừng nhầm**: Các tệp vẫn có tên và đường dẫn riêng biệt trong đối tượng Tree, nhưng cùng trỏ tới một mã băm Blob duy nhất.\n\n### Cryptographic Hash (SHA-1 / SHA-256)\n- **Nói dễ hiểu**: Thuật toán băm một chiều biến đổi một khối dữ liệu có kích thước bất kỳ thành chuỗi ký tự độ dài cố định (40 ký tự hexa với SHA-1).\n- **Ví dụ**: Chuỗi băm `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391` là mã băm chuẩn của một tệp rỗng (0 byte) trong Git.\n- **Đừng nhầm**: Hash không phải mã hóa, không thể giải mã ngược; SHA-1 có điểm yếu va chạm đã biết và không nên xem là bảo đảm an ninh tuyệt đối.\n\n---\n\n## 📖 Định nghĩa\nContent-Addressable Storage (CAS) định danh dữ liệu theo nội dung. Trong Git, object ID được tính từ header `<type> <size>\\0` cộng byte nội dung. Repo SHA-1 dùng SHA-1; repo SHA-256 dùng SHA-256. Cùng type và cùng byte nội dung cho cùng ID trong cùng định dạng hash (bỏ qua trường hợp va chạm). Đường dẫn không nằm trong blob, nhưng Git attributes/clean filters có thể biến đổi dữ liệu trước khi lưu.\n\n---\n\n## 🤔 Tại sao cần?\nCAS cho phép Git tái sử dụng cùng một blob khi byte dữ liệu đã lưu giống nhau, nhờ vậy tránh lưu nhiều bản giống hệt ở dạng loose objects. Git còn kiểm tra object ID để phát hiện thay đổi ngoài ý muốn. SHA-1 có va chạm thực tế đã biết; Git có bảo vệ bổ sung, nhưng hash không thay thế chữ ký, kiểm soát truy cập hay sao lưu.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng hai bản sao của cùng một ghi chú. Nếu Git lưu nội dung theo tên đường dẫn, hai tên khác nhau sẽ tạo hai bản dữ liệu riêng. Với content-addressable storage, Git tính ID từ loại object và byte nội dung; hai blob giống nhau trong cùng định dạng hash thường có thể dùng chung object, còn tree vẫn giữ tên và đường dẫn riêng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế tạo mã băm trong Content-Addressable Storage:\nNội dung văn bản: \"hello\\n\" (chiều dài: 6 bytes)\nLoại đối tượng:  blob\n\nChuỗi dữ liệu chuẩn hóa đưa vào hàm băm:\n\"blob 6\\0hello\\n\"\n        │\n        ▼ [Hàm băm mật mã học SHA-1]\n  ce013625030ba8dba906f756967f9e9ca394464a\n\n(Bất kỳ ai trên thế giới băm chuỗi này đều ra đúng mã hash trên)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNếu nhiều đường dẫn được stage với cùng byte nội dung và cùng bộ lọc, chúng có thể dùng chung một blob. Git vẫn cần tree entry riêng cho từng tên/đường dẫn; dung lượng thật thay đổi theo nén, packfile, và dữ liệu đã có trong repository.\n\n---\n\n## 💻 Command\n```bash\n# Tính mã băm của chuỗi mà không ghi xuống đĩa\necho \"hello world\" | git hash-object --stdin\n\n# Tính mã băm và đồng thời ghi đối tượng vào .git/objects/\necho \"hello world\" | git hash-object -w --stdin\n\n# Tự tính toán thủ công bằng lệnh sha1sum của Linux để kiểm chứng\nprintf \"blob 12\\0hello world\\n\" | sha1sum\n```\n\n---\n\n## 🔍 Giải thích command\n- `git hash-object --stdin`: Nhận dữ liệu từ stdin, thêm header `blob <length>\\0` và tính object ID theo định dạng hash của repo.\n- Cờ `-w` (write): Yêu cầu Git ghi đối tượng nén zlib vào đúng thư mục con tương ứng trong `.git/objects/`.\n- `printf \"blob 12\\0hello world\\n\" | sha1sum`: Thao tác băm thủ công chứng minh công thức tiêu đề nội tại của Git hoàn toàn minh bạch.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng mã băm chỉ tính từ nội dung file**: Nếu bạn dùng lệnh `sha1sum file.txt` thông thường, kết quả sẽ khác với `git hash-object file.txt` vì Git bắt buộc phải ghép thêm header `blob <size>\\0`.\n2. **Lo lắng khi đổi tên file làm tăng dung lượng kho**: Đổi tên file chỉ tạo ra đối tượng Tree mới chứa tên mới, còn nội dung Blob cũ được tái sử dụng 100%.\n3. **Cho rằng va chạm SHA-1 là bất khả thi**: Đã có va chạm được chứng minh cho SHA-1; Git có biện pháp bảo vệ, nhưng không nên khẳng định xác suất bằng 0.\n\n---\n\n## 🧪 Lab\nHãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:\n\n1. Chạy `printf 'hello git\\n' > doc1.txt`, rồi `mkdir -p sub` và `cp doc1.txt sub/doc2.txt` để hai đường dẫn có cùng byte nội dung.\n2. Chạy `git hash-object doc1.txt` và `git hash-object sub/doc2.txt`; hai ID phải khớp nếu file không qua clean filter khác nhau.\n3. Chạy `git hash-object --stdin`, nhập cùng nội dung `hello git` và xuống dòng bằng `Ctrl+D` (Git Bash), rồi so sánh ID.\n4. Thử hash một nội dung khác để thấy ID thay đổi. Lệnh chưa có `-w` nên không ghi các blob thử vào database.\n\n---\n\n## 💡 Hint\n> So sánh hash của object đã lưu, không phải lúc nào cũng so raw file trước filter. Trong bài lab này, dùng file text đơn giản không có clean filter để thấy rõ quy tắc.\n\n---\n\n## ✅ Validation\n- Hai đầu vào cùng byte cho cùng object ID; độ dài ID tùy SHA-1/SHA-256.\n- `git hash-object` không kèm `-w` chỉ tính ID, không ghi object thử vào database.\n\n---\n\n## ❓ Quiz\nCùng kiểm tra mức độ thấu hiểu nguyên lý Content-Addressable Storage qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🔥 Challenge\nNếu bạn có một dự án mã nguồn gồm 10.000 tệp tin nhưng tất cả các tệp đều hoàn toàn trống rỗng (0 bytes), cơ sở dữ liệu đối tượng của Git sẽ tạo ra bao nhiêu đối tượng Blob? Mã băm của tệp rỗng trong Git là gì?\n\n---\n\n## 📚 Tổng kết\n- Content-Addressable Storage định danh object từ header và byte nội dung của nó.\n- Công thức tính băm chuẩn của Git luôn bao gồm tiêu đề: `<type> <size>\\0<content>`.\n- Giúp tái sử dụng object giống nhau và phát hiện nhiều thay đổi; hash không phải bảo đảm an ninh tuyệt đối.\n- Đổi tên tệp hoặc di chuyển thư mục không làm tốn thêm dung lượng lưu trữ nội dung tệp tin.\n",
  "quiz": {
    "id": "quiz-08-git-internals-05-content-addressable-storage",
    "title": "Trắc nghiệm: Bộ nhớ định danh theo nội dung (Content-Addressable Storage)",
    "questions": [
      {
        "id": "q1",
        "question": "Git tính object ID từ dữ liệu nào?",
        "type": "single",
        "options": [
          {
            "text": "<type> <size>, byte NUL, rồi đến nội dung object",
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
        "explanation": "Git băm header gồm type và kích thước, byte NUL, rồi byte nội dung; repo chọn SHA-1 hoặc SHA-256 làm thuật toán hash."
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
        "explanation": "Nếu byte blob đã stage giống nhau thì ID giống nhau trong cùng hash format, nên Git có thể tái sử dụng cùng một object."
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
        "explanation": "ID được tính từ header và nội dung; thay đổi thường tạo ID khác, nhưng object cũ có thể bị dọn khi không còn được tham chiếu."
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
        "question": "Mô tả nào chính xác nhất về vai trò và giới hạn của hash trong Git?",
        "type": "single",
        "options": [
          {
            "text": "Hash giúp phát hiện nhiều thay đổi nội dung, nhưng SHA-1 có va chạm đã biết và hash không thay thế chữ ký hay sao lưu",
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
        "explanation": "Object ID giúp đối chiếu nội dung nhưng không phải bảo đảm an ninh tuyệt đối; SHA-1 đã có va chạm thực tế nên cần hiểu giới hạn này."
      }
    ]
  }
};
export default lesson;
