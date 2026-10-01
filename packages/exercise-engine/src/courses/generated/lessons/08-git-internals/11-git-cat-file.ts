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
  "content": "# Giải mã và kiểm tra chi tiết đối tượng với git cat-file\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ lệnh plumbing cứu hộ đa năng: `git cat-file`.\n- Sử dụng thành thạo 3 cờ quan sát cốt lõi: `-p` (pretty-print nội dung), `-t` (kiểm tra loại đối tượng), và `-s` (xem kích thước byte).\n- Có khả năng kiểm tra bất kỳ đối tượng nhị phân nào trong `.git/objects/` chỉ bằng tiền tố mã băm (hash prefix).\n- Nắm vững cách truyền các symbolic refs như `HEAD` trực tiếp vào lệnh kiểm tra.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git cat-file Command\n- **Nói dễ hiểu**: Lệnh plumbing chuyên dụng dùng để giải nén zlib và hiển thị thông tin chi tiết của mọi đối tượng trong Git database.\n- **Ví dụ**: Dùng `git cat-file -p HEAD` để xem nội dung văn bản gốc của commit mới nhất.\n- **Đừng nhầm**: Không phải lệnh `cat` của Linux; đối tượng Git được nén nhị phân nên lệnh `cat` thông thường sẽ in ra ký tự rác.\n\n### Pretty-Print Flag (-p)\n- **Nói dễ hiểu**: Tùy chọn yêu cầu Git tự động nhận diện loại đối tượng và định dạng đầu ra thân thiện nhất với mắt người đọc.\n- **Ví dụ**: Nếu là blob in ra text, nếu là tree in ra bảng danh mục tệp, nếu là commit in ra thông tin tác giả và message.\n- **Đừng nhầm**: Không làm thay đổi dữ liệu của tệp; chỉ hiển thị dữ liệu đã giải nén ra màn hình terminal.\n\n### Object Inspection Flags (-t, -s)\n- **Nói dễ hiểu**: Cặp cờ tra cứu nhanh siêu dữ liệu: `-t` (type) cho biết kiểu đối tượng và `-s` (size) cho biết kích thước byte trước khi nén.\n- **Ví dụ**: Chạy `git cat-file -t e69de2` in ra chữ `blob`, chạy `git cat-file -s e69de2` in ra số `0`.\n- **Đừng nhầm**: Kích thước trả về bởi `-s` là kích thước dữ liệu gốc, không phải kích thước tệp nén trên ổ đĩa.\n\n---\n\n## 📖 Định nghĩa\n`git cat-file` là con dao pha của các chuyên gia Git Internals. Vì mọi đối tượng trong thư mục `.git/objects/` đều bị nén bằng thuật toán zlib, bạn không thể sử dụng các lệnh đọc văn bản thông thường như `cat` hay notepad để xem nội dung của chúng. Lệnh `git cat-file` nhận mã băm SHA-1 của một đối tượng, tự động giải nén, phân tích cú pháp tiêu đề và hiển thị thông tin chi tiết ra màn hình tùy theo các cờ tùy chọn được cung cấp.\n\n---\n\n## 💡 Tại sao cần\nKhi hệ thống Git gặp sự cố hỏng tệp hoặc khi bạn cần điều tra lịch sử ở mức độ pháp y kỹ thuật số (digital forensics), `git cat-file` là công cụ duy nhất cho phép bạn \"chụp X-quang\" bên trong cơ sở dữ liệu đối tượng. Bạn có thể xem chính xác một Commit trỏ tới Tree nào, một Tree chứa những tệp gì, hoặc một Blob chứa nội dung thô ra sao mà không làm thay đổi trạng thái của Working Directory.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng các đối tượng trong `.git/objects/` như những viên thuốc con nhộng được niêm phong kín. `git cat-file` chính là chiếc máy quét y tế: cờ `-t` giống như máy quét nhiệt cho biết đây là viên thuốc loại gì (blob, tree hay commit); cờ `-s` là chiếc cân điện tử siêu nhỏ đo khối lượng viên thuốc; và cờ `-p` là chiếc máy soi laser mở nắp con nhộng để bạn nhìn thấy toàn bộ các hạt vi chất bên trong.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBa chế độ kiểm tra của git cat-file:\nĐối tượng: .git/objects/4b/825dc642cb6eb9a060e54bf8d69288fbee4904\n               │\n               ├─ git cat-file -t 4b825d ──► \"tree\"     (Loại đối tượng)\n               ├─ git cat-file -s 4b825d ──► \"182\"      (Kích thước byte)\n               └─ git cat-file -p 4b825d ──► Hiển thị nội dung định dạng đẹp\n                                             100644 blob e69de2 README.md\n                                             040000 tree 8a7b6c src\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư nhận được thông báo lỗi từ đồng nghiệp rằng commit mới nhất bị mất một tệp tin cấu hình quan trọng. Thay vì chuyển nhánh hay reset lung tung làm xáo trộn code, kỹ sư mở terminal và chạy lệnh `git cat-file -p HEAD`. Nhìn vào dòng đầu tiên, kỹ sư thấy mã băm Tree là `e2a4b6`. Kỹ sư tiếp tục chạy `git cat-file -p e2a4b6` để kiểm tra danh mục cây thư mục gốc. Kết quả cho thấy tệp tin cấu hình `config.json` hoàn toàn không có mặt trong danh sách bản ghi của Tree. Kỹ sư kết luận ngay lập tức rằng đồng nghiệp đã quên gõ lệnh `git add` trước khi commit. Việc chẩn đoán diễn ra trong 10 giây mà không cần mở bất kỳ tệp nào trên đĩa.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xem nội dung định dạng đẹp của đối tượng\ngit cat-file -p 4b825dc642\n\n# Kiểm tra loại đối tượng (blob, tree, commit, tag)\ngit cat-file -t HEAD\n\n# Xem kích thước byte nguyên bản của đối tượng\ngit cat-file -s HEAD\n\n# Kiểm tra trực tiếp cây thư mục của commit\ngit cat-file -p HEAD^{tree}\n```\n\n---\n\n## 🔍 Giải thích command\n- `git cat-file -p <hash>`: Giải nén zlib và in dữ liệu ra terminal ở định dạng dễ đọc nhất.\n- `git cat-file -t <hash>`: Đọc byte header và in ra loại đối tượng.\n- `git cat-file -s <hash>`: Trả về số byte của nội dung tệp trước khi nén.\n- `HEAD^{tree}`: Cú pháp revision mở rộng trỏ trực tiếp tới đối tượng Tree của commit hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng lệnh `cat` của Linux đọc file trong `.git/objects/`**: Gây ra màn hình tràn ngập ký tự nhị phân rác vì tệp đã bị nén zlib.\n2. **Truyền nhầm đường dẫn file thay vì mã băm SHA-1**: `git cat-file` chỉ nhận mã SHA-1 hoặc con trỏ ref (`HEAD`), không nhận đường dẫn tệp trên đĩa.\n3. **Nghĩ rằng phải gõ đủ 40 ký tự**: Bạn chỉ cần cung cấp từ 4 đến 7 ký tự đầu tiên miễn là tiền tố đó không bị trùng lặp trong kho lưu trữ.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Lấy mã băm của commit gần nhất bằng lệnh `git rev-parse HEAD`.\n2. **Bước 2**: Chạy lệnh `git cat-file -t HEAD` để xác nhận loại đối tượng là `commit`.\n3. **Bước 3**: Chạy lệnh `git cat-file -p HEAD` và sao chép mã băm ở dòng `tree`.\n4. **Bước 4**: Chạy `git cat-file -p <mã_tree>` để xem danh mục tệp, rồi tiếp tục lấy một mã blob và chạy `git cat-file -p <mã_blob>` để xem nội dung tệp.\n\n---\n\n## 💡 Hint & mẹo\n> Bạn có thể truyền trực tiếp con trỏ `HEAD` hoặc tên nhánh vào lệnh `git cat-file` thay vì phải copy-paste mã băm thủ công, ví dụ: `git cat-file -p main` hoặc `git cat-file -p HEAD`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Thao tác thành công chuỗi truy vết: từ Commit -> sang Tree -> sang Blob bằng lệnh `git cat-file -p`.\n- Hiểu và đối chiếu được nội dung in ra từ lệnh với các file thực tế trong working directory.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra khả năng giải mã đối tượng bằng git cat-file qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để sử dụng `git cat-file --batch-check` kết hợp với lệnh shell để quét và thống kê top 5 đối tượng tốn nhiều dung lượng nhất trong kho lưu trữ?\n\n---\n\n## 📝 Tổng kết\n- `git cat-file` là công cụ giải nén và kiểm tra nội tạng của các đối tượng trong Git Object Store.\n- Cờ `-p` in nội dung định dạng đẹp, `-t` in loại đối tượng, `-s` in kích thước byte.\n- Hỗ trợ truyền mã băm rút gọn (prefix hash) hoặc các con trỏ tham chiếu như `HEAD`.\n- Giúp kỹ sư kiểm tra sâu và điều tra lịch sử mã nguồn ở tầng dữ liệu nhị phân nguyên bản.\n",
  "quiz": {
    "id": "quiz-08-git-internals-11-git-cat-file",
    "title": "Trắc nghiệm: Giải mã và kiểm tra chi tiết đối tượng với git cat-file",
    "questions": [
      {
        "id": "q1",
        "question": "Tùy chọn -p trong lệnh git cat-file có ý nghĩa là gì?",
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
        "explanation": "Cờ -p (pretty-print) sẽ tự động kiểm tra loại đối tượng và định dạng nội dung tương ứng để con người dễ đọc."
      },
      {
        "id": "q2",
        "question": "Tùy chọn nào của git cat-file được sử dụng để kiểm tra kích thước tính theo byte của đối tượng?",
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
        "explanation": "Cờ -s viết tắt của size, trả về kích thước chính xác của payload nội dung đối tượng trước khi nén."
      },
      {
        "id": "q3",
        "question": "Nếu bạn chạy git cat-file -p trỏ tới một đối tượng Blob chứa ảnh PNG, điều gì sẽ xảy ra?",
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
        "question": "Bạn có thể cung cấp bao nhiêu ký tự tối thiểu của mã băm cho lệnh git cat-file?",
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
      },
      {
        "id": "q5",
        "question": "Tùy chọn --batch trong lệnh git cat-file thường được sử dụng trong trường hợp nào?",
        "type": "single",
        "options": [
          {
            "text": "Cho phép các script và công cụ bên ngoài truy vấn hàng loạt thông tin của nhiều đối tượng qua stdin",
            "correct": true
          },
          {
            "text": "Tự động xóa hàng loạt đối tượng trong cơ sở dữ liệu",
            "correct": false
          },
          {
            "text": "Đổi tên hàng loạt commit trong lịch sử",
            "correct": false
          },
          {
            "text": "Tạo hàng loạt nhánh mới cùng một lúc",
            "correct": false
          }
        ],
        "explanation": "Chế độ --batch của git cat-file là một tính năng hiệu năng cao cho phép đọc luồng liên tục các mã hash và trả về nội dung đối tượng tức thì cho các ứng dụng tích hợp."
      }
    ]
  }
};
export default lesson;
