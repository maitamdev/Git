import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "11-git-cat-file",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "11-git-cat-file",
    "title": "Giải mã và kiểm tra chi tiết đối tượng với git cat-file",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "10-git-hash-object"
    ],
    "objectives": [
      "Làm chủ lệnh plumbing cứu hộ đa năng: git cat-file.",
      "Sử dụng thành thạo 3 cờ quan sát cốt lõi: -p (pretty-print nội dung), -t (kiểm tra loại đối tượng), và -s (xem kích thước byte).",
      "Có khả năng kiểm tra bất kỳ đối tượng nhị phân nào trong .git/objects/ chỉ bằng tiền tố mã băm (hash prefix)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git cat-file",
      "inspect object",
      "pretty print",
      "object type",
      "object size"
    ],
    "commands": [
      "git cat-file -p <hash>",
      "git cat-file -t <hash>",
      "git cat-file -s <hash>"
    ]
  },
  "content": "# Giải mã và kiểm tra chi tiết đối tượng với git cat-file\n\n---\n\n## 🎯 Mục tiêu bài học\n- Làm chủ lệnh plumbing cứu hộ đa năng: git cat-file.\n- Sử dụng thành thạo 3 cờ quan sát cốt lõi: -p (pretty-print nội dung), -t (kiểm tra loại đối tượng), và -s (xem kích thước byte).\n- Có khả năng kiểm tra bất kỳ đối tượng nhị phân nào trong .git/objects/ chỉ bằng tiền tố mã băm (hash prefix).\n\n---\n\n## 📖 Định nghĩa\n> git cat-file là con dao pha của các chuyên gia Git Internals. Vì mọi đối tượng trong thư mục .git/objects/ đều bị nén bằng thuật toán zlib, bạn không thể sử dụng các lệnh đọc văn bản thông thường như cat hay notepad để xem nội dung của chúng. Lệnh git cat-file nhận mã băm SHA-1 của một đối tượng, tự động giải nén, phân tích cú pháp tiêu đề và hiển thị thông tin chi tiết ra màn hình tùy theo các cờ tùy chọn được cung cấp.\n\n---\n\n## 🤔 Tại sao cần?\nKhi hệ thống Git gặp sự cố hỏng tệp hoặc khi bạn cần điều tra lịch sử ở mức độ pháp y kỹ thuật số (digital forensics), git cat-file là công cụ duy nhất cho phép bạn \"chụp X-quang\" bên trong cơ sở dữ liệu đối tượng. Bạn có thể xem chính xác một Commit trỏ tới Tree nào, một Tree chứa những tệp gì, hoặc một Blob chứa nội dung thô ra sao mà không làm thay đổi trạng thái của Working Directory.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng các đối tượng trong .git/objects/ như những viên thuốc con nhộng được niêm phong kín. git cat-file chính là chiếc máy quét y tế: cờ `-t` giống như máy quét nhiệt cho biết đây là viên thuốc loại gì (blob, tree hay commit); cờ `-s` là chiếc cân điện tử siêu nhỏ đo khối lượng viên thuốc; và cờ `-p` là chiếc máy soi laser mở nắp con nhộng để bạn nhìn thấy toàn bộ các hạt vi chất bên trong.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nBa chế độ kiểm tra của git cat-file:\nĐối tượng: .git/objects/4b/825dc642cb6eb9a060e54bf8d69288fbee4904\n               │\n               ├─ git cat-file -t 4b825d ──► \"tree\"     (Loại đối tượng)\n               ├─ git cat-file -s 4b825d ──► \"182\"      (Kích thước byte)\n               └─ git cat-file -p 4b825d ──► Hiển thị nội dung định dạng đẹp\n                                             100644 blob e69de2 README.md\n                                             040000 tree 8a7b6c src\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư nhận được thông báo lỗi từ đồng nghiệp rằng commit mới nhất bị mất một tệp tin cấu hình quan trọng. Thay vì chuyển nhánh hay reset lung tung làm xáo trộn code, kỹ sư mở terminal và chạy lệnh `git cat-file -p HEAD`. Nhìn vào dòng đầu tiên, kỹ sư thấy mã băm Tree là `e2a4b6`. Kỹ sư tiếp tục chạy `git cat-file -p e2a4b6` để kiểm tra danh mục cây thư mục gốc. Kết quả cho thấy tệp tin cấu hình `config.json` hoàn toàn không có mặt trong danh sách bản ghi của Tree. Kỹ sư kết luận ngay lập tức rằng đồng nghiệp đã quên gõ lệnh git add trước khi commit. Việc chẩn đoán diễn ra trong 10 giây mà không cần mở bất kỳ tệp nào trên đĩa.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit cat-file -p <hash>\ngit cat-file -t <hash>\ngit cat-file -s <hash>\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCờ -p hiển thị nội dung đối tượng theo định dạng thân thiện (pretty-print), cờ -t hiển thị loại đối tượng (type như blob, tree, commit), và cờ -s hiển thị kích thước byte thực tế (size) của đối tượng trước khi nén, hỗ trợ kiểm tra toàn diện cấu trúc nội tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cố gắng mở tệp trong `.git/objects/` bằng lệnh `cat` thông thường của Linux dẫn đến việc màn hình tràn ngập các ký tự rác nhị phân.**: \n2. **Truyền nhầm đường dẫn tệp tin thay vì truyền mã băm đối tượng cho lệnh git cat-file.**: \n3. **Không biết rằng có thể chỉ truyền 4 đến 7 ký tự đầu tiên của mã băm (Prefix Hash) miễn là nó là duy nhất.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Lấy mã băm của commit gần nhất bằng lệnh `git rev-parse HEAD`.\n2. Chạy lệnh `git cat-file -t HEAD` để xác nhận loại đối tượng.\n3. Chạy lệnh `git cat-file -p HEAD` và chọn một mã băm Blob bất kỳ trong danh mục để tiếp tục giải mã.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Bạn có thể truyền trực tiếp con trỏ `HEAD` hoặc tên nhánh vào lệnh git cat-file thay vì phải gõ mã băm đầy đủ (ví dụ: `git cat-file -p HEAD`).\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nGiải mã thành công nội dung của cả ba loại đối tượng: commit, tree và blob bằng lệnh cat-file.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra khả năng giải mã đối tượng bằng git cat-file qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để sử dụng git cat-file kết hợp với vòng lặp bash script để tìm ra tệp tin có dung lượng lớn nhất từng tồn tại trong toàn bộ lịch sử repository?\n\n---\n\n## 📚 Tổng kết kiến thức\n- `git cat-file` là công cụ giải nén và kiểm tra nội tạng của các đối tượng trong Git Object Store.\n- Cờ `-p` in nội dung định dạng đẹp, `-t` in loại đối tượng, `-s` in kích thước byte.\n- Hỗ trợ truyền mã băm rút gọn (prefix hash) hoặc các con trỏ tham chiếu như `HEAD`.\n",
  "quiz": {
    "id": "quiz-08-git-internals-11-git-cat-file",
    "title": "Trắc nghiệm: Giải mã và kiểm tra chi tiết đối tượng với git cat-file",
    "questions": [
      {
        "id": "q1",
        "question": "Tùy chọn `-p` trong lệnh `git cat-file` có ý nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Pretty-print (tự động phát hiện loại và hiển thị nội dung định dạng thân thiện với con người)",
            "correct": true
          },
          {
            "text": "Password (yêu cầu mật khẩu giải mã)",
            "correct": false
          },
          {
            "text": "Parent (in ra commit cha)",
            "correct": false
          },
          {
            "text": "Push (đẩy đối tượng lên server)",
            "correct": false
          }
        ],
        "explanation": "Cờ `-p` (pretty-print) sẽ tự động kiểm tra loại đối tượng và định dạng nội dung tương ứng (tree thành danh sách, commit thành header, blob thành text)."
      },
      {
        "id": "q2",
        "question": "Tùy chọn nào của `git cat-file` được sử dụng để kiểm tra kích thước tính theo byte của đối tượng?",
        "type": "single",
        "options": [
          {
            "text": "-s (size)",
            "correct": true
          },
          {
            "text": "-b (bytes)",
            "correct": false
          },
          {
            "text": "-k (kilobytes)",
            "correct": false
          },
          {
            "text": "-l (length)",
            "correct": false
          }
        ],
        "explanation": "Cờ `-s` viết tắt của size, trả về kích thước chính xác của payload nội dung đối tượng trước khi nén."
      },
      {
        "id": "q3",
        "question": "Nếu bạn chạy `git cat-file -p` trỏ tới một đối tượng Blob chứa ảnh PNG, điều gì sẽ xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung dữ liệu nhị phân thô của tệp ảnh sẽ được in trực tiếp ra terminal",
            "correct": true
          },
          {
            "text": "Một cửa sổ xem ảnh tự động bật lên",
            "correct": false
          },
          {
            "text": "Git tự động chuyển ảnh thành một bức vẽ ASCII Art",
            "correct": false
          },
          {
            "text": "Lệnh bị báo lỗi từ chối hiển thị",
            "correct": false
          }
        ],
        "explanation": "Vì Blob chỉ lưu dữ liệu thô, git cat-file sẽ giải nén và in thẳng dữ liệu nhị phân của ảnh ra dòng lệnh."
      },
      {
        "id": "q4",
        "question": "Bạn có thể cung cấp bao nhiêu ký tự tối thiểu của mã băm cho lệnh `git cat-file`?",
        "type": "single",
        "options": [
          {
            "text": "Tối thiểu từ 4 ký tự trở lên, miễn là chuỗi đó không bị trùng lặp với đối tượng khác",
            "correct": true
          },
          {
            "text": "Bắt buộc phải đủ 40 ký tự",
            "correct": false
          },
          {
            "text": "Chỉ cần đúng 1 ký tự đầu tiên",
            "correct": false
          },
          {
            "text": "Chính xác 8 ký tự, không được thừa hay thiếu",
            "correct": false
          }
        ],
        "explanation": "Git hỗ trợ cơ chế Short Hash: bạn chỉ cần cung cấp đủ số ký tự đầu để phân biệt duy nhất đối tượng trong kho lưu trữ."
      }
    ]
  }
};
export default lesson;
