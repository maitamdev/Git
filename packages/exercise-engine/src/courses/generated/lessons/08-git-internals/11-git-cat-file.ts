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
      "Tra cứu object bằng object ID đầy đủ hoặc tiền tố ngắn không mơ hồ."
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
  "content": "# Giải mã và kiểm tra chi tiết đối tượng với git cat-file\n\n---\n\n## 🎯 Mục tiêu\n- Làm chủ lệnh plumbing cứu hộ đa năng: `git cat-file`.\n- Sử dụng thành thạo 3 cờ quan sát cốt lõi: `-p` (pretty-print nội dung), `-t` (kiểm tra loại đối tượng), và `-s` (xem kích thước byte).\n- Có khả năng kiểm tra object bằng object ID đầy đủ, ref hoặc tiền tố ID ngắn nếu ID đó không mơ hồ.\n- Nắm vững cách truyền các symbolic refs như `HEAD` trực tiếp vào lệnh kiểm tra.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git cat-file Command\n- **Nói dễ hiểu**: Lệnh plumbing đọc object từ Git database và hiển thị thông tin hoặc nội dung đã giải nén.\n- **Ví dụ**: Dùng `git cat-file -p HEAD` để xem nội dung văn bản gốc của commit mới nhất.\n- **Đừng nhầm**: Không phải lệnh `cat` của Linux; đối tượng Git được nén nhị phân nên lệnh `cat` thông thường sẽ in ra ký tự rác.\n\n### Pretty-Print Flag (-p)\n- **Nói dễ hiểu**: Tùy chọn yêu cầu Git tự động nhận diện loại đối tượng và định dạng đầu ra thân thiện nhất với mắt người đọc.\n- **Ví dụ**: Nếu là blob in ra text, nếu là tree in ra bảng danh mục tệp, nếu là commit in ra thông tin tác giả và message.\n- **Đừng nhầm**: Không làm thay đổi dữ liệu của tệp; chỉ hiển thị dữ liệu đã giải nén ra màn hình terminal.\n\n### Object Inspection Flags (-t, -s)\n- **Nói dễ hiểu**: Cặp cờ tra cứu nhanh siêu dữ liệu: `-t` (type) cho biết kiểu đối tượng và `-s` (size) cho biết kích thước byte trước khi nén.\n- **Ví dụ**: Chạy `git cat-file -t e69de2` in ra chữ `blob`, chạy `git cat-file -s e69de2` in ra số `0`.\n- **Đừng nhầm**: Kích thước trả về bởi `-s` là kích thước dữ liệu gốc, không phải kích thước tệp nén trên ổ đĩa.\n\n---\n\n## 📖 Định nghĩa\n`git cat-file` đọc object từ object database. Loose object được nén riêng; nhiều object khác có thể nằm trong packfile. Lệnh xử lý cách lưu trữ đó và cho phép xem loại (`-t`), kích thước nội dung (`-s`) hoặc nội dung (`-p`). Bạn có thể đưa vào object ID, ref hoặc revision expression hợp lệ; tiền tố rút gọn chỉ dùng được khi không mơ hồ.\n\n---\n\n## 💡 Tại sao cần\nKhi cần tìm hiểu một commit chứa gì, `git cat-file` cho phép đọc object mà không chuyển nhánh hay sửa working tree. Bạn có thể xem commit trỏ tới tree nào, tree chứa entry gì, hoặc blob có nội dung nào. Một số lệnh khác như `git show` cũng trình bày dữ liệu lịch sử ở dạng thân thiện hơn.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng các đối tượng trong `.git/objects/` như những viên thuốc con nhộng được niêm phong kín. `git cat-file` chính là chiếc máy quét y tế: cờ `-t` giống như máy quét nhiệt cho biết đây là viên thuốc loại gì (blob, tree hay commit); cờ `-s` là chiếc cân điện tử siêu nhỏ đo khối lượng viên thuốc; và cờ `-p` là chiếc máy soi laser mở nắp con nhộng để bạn nhìn thấy toàn bộ các hạt vi chất bên trong.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBa chế độ kiểm tra của git cat-file:\nĐối tượng: <object-id>\n               │\n               ├─ git cat-file -t <object-id> ──► loại (blob/tree/commit/tag)\n               ├─ git cat-file -s <object-id> ──► kích thước payload theo byte\n               └─ git cat-file -p <object-id> ──► nội dung theo dạng phù hợp với loại\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư nhận được thông báo lỗi từ đồng nghiệp rằng commit mới nhất bị mất một tệp tin cấu hình quan trọng. Thay vì chuyển nhánh hay reset lung tung làm xáo trộn code, kỹ sư mở terminal và chạy lệnh `git cat-file -p HEAD`. Nhìn vào dòng đầu tiên, kỹ sư thấy mã băm Tree là `e2a4b6`. Kỹ sư tiếp tục chạy `git cat-file -p e2a4b6` để kiểm tra danh mục cây thư mục gốc. Kết quả cho thấy tệp tin cấu hình `config.json` hoàn toàn không có mặt trong danh sách bản ghi của Tree. Kỹ sư kết luận ngay lập tức rằng đồng nghiệp đã quên gõ lệnh `git add` trước khi commit. Việc chẩn đoán diễn ra trong 10 giây mà không cần mở bất kỳ tệp nào trên đĩa.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xem nội dung định dạng đẹp của đối tượng\ngit cat-file -p 'HEAD^{tree}'\n\n# Kiểm tra loại đối tượng (blob, tree, commit, tag)\ngit cat-file -t HEAD\n\n# Xem kích thước byte nguyên bản của đối tượng\ngit cat-file -s HEAD\n\n# Kiểm tra trực tiếp cây thư mục của commit\ngit cat-file -p HEAD^{tree}\n```\n\n---\n\n## 🔍 Giải thích command\n- `git cat-file -p <object>`: Đọc object và in nội dung phù hợp với loại object; blob nhị phân có thể không đọc được trong terminal.\n- `git cat-file -t <hash>`: Đọc byte header và in ra loại đối tượng.\n- `git cat-file -s <hash>`: Trả về số byte của nội dung tệp trước khi nén.\n- `HEAD^{tree}`: Cú pháp revision mở rộng trỏ trực tiếp tới đối tượng Tree của commit hiện tại.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Dùng lệnh `cat` của Linux đọc file trong `.git/objects/`**: Gây ra màn hình tràn ngập ký tự nhị phân rác vì tệp đã bị nén zlib.\n2. **Truyền nhầm đường dẫn file trên ổ đĩa**: `git cat-file` cần object name hoặc revision expression; để xem file trong commit, dùng biểu thức như `HEAD:path/to/file`.\n3. **Nghĩ rằng tiền tố ngắn bất kỳ luôn dùng được**: Tiền tố phải đủ dài để xác định duy nhất một object trong repository; độ dài cần thiết thay đổi theo repo.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Chạy `git rev-parse HEAD` để xem object ID của commit hiện tại.\n2. **Bước 2**: Chạy `git cat-file -t HEAD`; kết quả phải là `commit`.\n3. **Bước 3**: Chạy `git cat-file -p HEAD` và đọc object ID sau `tree`.\n4. **Bước 4**: Chạy `git cat-file -p 'HEAD^{tree}'` để xem tree, rồi `git ls-tree -r HEAD` để chọn một đường dẫn có trong commit.\n5. **Bước 5**: Chạy `git cat-file -p HEAD:<path>` với đường dẫn vừa chọn để xem nội dung blob văn bản.\n\n---\n\n## 💡 Hint & mẹo\n> Bạn có thể truyền trực tiếp con trỏ `HEAD` hoặc tên nhánh vào lệnh `git cat-file` thay vì phải copy-paste mã băm thủ công, ví dụ: `git cat-file -p main` hoặc `git cat-file -p HEAD`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Thao tác thành công chuỗi truy vết: từ Commit -> sang Tree -> sang Blob bằng lệnh `git cat-file -p`.\n- Hiểu và đối chiếu được nội dung in ra từ lệnh với các file thực tế trong working directory.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra khả năng giải mã đối tượng bằng git cat-file qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để sử dụng `git cat-file --batch-check` kết hợp với lệnh shell để quét và thống kê top 5 đối tượng tốn nhiều dung lượng nhất trong kho lưu trữ?\n\n---\n\n## 📝 Tổng kết\n- `git cat-file` là công cụ kiểm tra object trong Git Object Store, bất kể chúng được lưu loose hay packed.\n- Cờ `-p` in nội dung định dạng đẹp, `-t` in loại đối tượng, `-s` in kích thước byte.\n- Hỗ trợ truyền mã băm rút gọn (prefix hash) hoặc các con trỏ tham chiếu như `HEAD`.\n- Giúp kỹ sư kiểm tra sâu và điều tra lịch sử mã nguồn ở tầng dữ liệu nhị phân nguyên bản.\n",
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
        "question": "Khi nào tiền tố rút gọn của object ID dùng được với git cat-file?",
        "type": "single",
        "options": [
          {
            "text": "Khi tiền tố đủ dài để xác định duy nhất object trong repository",
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
        "explanation": "Tiền tố rút gọn phải không mơ hồ trong repo; số ký tự cần thiết thay đổi theo object set và hash format."
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
