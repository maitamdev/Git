import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-blob-object",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "06-blob-object",
    "title": "Đối tượng Blob: Lưu trữ nội dung nhị phân và tệp tin",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "05-content-addressable-storage"
    ],
    "objectives": [
      "Hiểu rõ bản chất của đối tượng Blob (Binary Large Object) trong Git.",
      "Nắm vững quy tắc quan trọng: Blob CHỈ lưu trữ nội dung dữ liệu thô, HOÀN TOÀN KHÔNG lưu tên tệp, ngày giờ hay quyền hạn.",
      "Sử dụng các lệnh plumbing để băm, ghi và giải mã một đối tượng Blob."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "blob",
      "binary large object",
      "file content",
      "git objects",
      "metadata exclusion"
    ],
    "commands": [
      "git hash-object -w file.txt",
      "git cat-file -t <hash>",
      "git cat-file -p <hash>"
    ]
  },
  "content": "# Đối tượng Blob: Lưu trữ nội dung nhị phân và tệp tin\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất của đối tượng Blob (Binary Large Object) trong Git.\n- Nắm vững quy tắc quan trọng: Blob CHỈ lưu trữ nội dung dữ liệu thô, HOÀN TOÀN KHÔNG lưu tên tệp, ngày giờ hay quyền hạn.\n- Sử dụng các lệnh plumbing (`git hash-object`, `git cat-file`) để băm, ghi và giải mã một đối tượng Blob.\n- Hiểu cách Git tách biệt nội dung khỏi siêu dữ liệu để tối ưu hóa việc đổi tên và di chuyển tệp.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Binary Large Object (Blob)\n- **Nói dễ hiểu**: Loại đối tượng Git chuyên dùng để lưu trữ toàn bộ nội dung dữ liệu thô của một tệp tin bất kỳ.\n- **Ví dụ**: Nội dung file mã nguồn `server.js` hoặc file ảnh `avatar.png` đều được nén zlib thành một đối tượng Blob.\n- **Đừng nhầm**: Không chứa tên file, đường dẫn hay ngày giờ sửa đổi; chỉ lưu duy nhất dữ liệu thuần túy (content payload).\n\n### Raw Content Payload\n- **Nói dễ hiểu**: Khối dữ liệu nhị phân nguyên thủy của tệp tin được đặt ngay sau phần tiêu đề `blob <size>\\0`.\n- **Ví dụ**: Chuỗi byte của bức ảnh hoặc chuỗi ký tự của file mã nguồn.\n- **Đừng nhầm**: Không phụ thuộc vào bảng mã hay định dạng tệp; Git coi mọi tệp tin đều là một chuỗi byte thô.\n\n### git cat-file Command\n- **Nói dễ hiểu**: Lệnh plumbing đa năng dùng để thẩm vấn và hiển thị thông tin về bất kỳ đối tượng nào trong Git database.\n- **Ví dụ**: Dùng `git cat-file -p <hash>` để đọc nội dung và `git cat-file -t <hash>` để xem kiểu đối tượng.\n- **Đừng nhầm**: Không tương đương với lệnh `cat` của Linux vì đối tượng Git đã bị nén bằng zlib, lệnh này giải nén trước khi in ra.\n\n---\n\n## 📖 Định nghĩa\nBlob (viết tắt của Binary Large Object - Đối tượng nhị phân lớn) là loại đối tượng đơn giản nhất và chiếm số lượng nhiều nhất trong cơ sở dữ liệu của Git. Nhiệm vụ duy nhất của Blob là lưu trữ toàn bộ nội dung dữ liệu thô của một tệp tin. Điều tối quan trọng cần ghi nhớ: một đối tượng Blob hoàn toàn không chứa tên tệp tin, không chứa quyền hạn thực thi (permissions), và không chứa ngày giờ tạo lập.\n\n---\n\n## 💡 Tại sao cần\nViệc tách rời nội dung tệp tin (Blob) ra khỏi siêu dữ liệu và vị trí thư mục (Tree) là một phát minh thiết kế thiên tài và tinh tế của Git. Nhờ sự phân tách độc lập này, khi bạn đổi tên một tệp tin lớn từ `movie_old.mp4` thành `movie_new.mp4` hoặc di chuyển nó vào một thư mục khác, Git không cần phải nhân đôi hay nén lại đối tượng lưu trữ 1 GB đó, mà chỉ cần cập nhật một dòng chữ nhỏ trong đối tượng Tree trỏ tới cùng một Blob ID cũ. Điều này giúp tiết kiệm tối đa dung lượng đĩa và đẩy nhanh tốc độ thực thi.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng nội dung cuốn tiểu thuyết của bạn là một bức thư tay dài (Blob). Bức thư này được nhét vào trong một chiếc phong bì thư. Trên mặt ngoài phong bì có ghi: \"Tên người nhận: app.js\", \"Ngày gửi: 2026\", \"Quyền hạn: 100644\" (Tree). Bạn có thể đổi chữ ghi ngoài phong bì thành bất kỳ tên gì bạn thích, nhưng bức thư tay nằm bên trong phong bì thì vẫn giữ nguyên từng con chữ không hề thay đổi.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc của đối tượng Blob:\n┌────────────────────────────────────────────────────────┐\n│                     BLOB OBJECT                        │\n├────────────────────────────────────────────────────────┤\n│ Header:  \"blob <content_length>\\0\"                     │\n│ Payload: Toàn bộ nội dung dữ liệu thô của tệp tin      │\n│                                                        │\n│ - KHÔNG CÓ: Tên tệp tin (filename)                     │\n│ - KHÔNG CÓ: Đường dẫn thư mục (path)                   │\n│ - KHÔNG CÓ: Quyền hạn tệp (mode/chmod)                 │\n│ - KHÔNG CÓ: Ngày giờ commit (timestamp)                │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư phần mềm thực hiện thử nghiệm tạo một tệp tin mới có tên `sample.txt` với nội dung văn bản thuần túy \"Xin chào Git Academy\". Kỹ sư mở cửa sổ dòng lệnh và chạy lệnh plumbing cơ bản: `git hash-object -w sample.txt` và lập tức nhận được chuỗi mã băm SHA-1: `3b18e512db79e4c8300de074a1e281301f6181f0`. Sau đó, kỹ sư xóa hẳn tệp tin `sample.txt` khỏi thư mục làm việc và dọn sạch thùng rác. Bằng cách sử dụng lệnh `git cat-file -p 3b18e512db79e4c8300de074a1e281301f6181f0`, màn hình lập tức in ra dòng chữ \"Xin chào Git Academy\". Dù tệp tin trên ổ đĩa đã bị xóa hoàn toàn và tên gọi của tệp không còn lưu trong bảng tệp của hệ điều hành, nhưng nội dung dữ liệu của nó đã được bảo tồn an toàn trong đối tượng Blob của Git.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Tạo và lưu trữ đối tượng Blob vào database từ tệp tin\ngit hash-object -w file.txt\n\n# Kiểm tra kiểu của đối tượng (trả về \"blob\")\ngit cat-file -t 3b18e512db79e4c8300de074a1e281301f6181f0\n\n# Xem kích thước byte chính xác của đối tượng\ngit cat-file -s 3b18e512db79e4c8300de074a1e281301f6181f0\n\n# Giải nén và in nội dung dữ liệu của Blob\ngit cat-file -p 3b18e512db79e4c8300de074a1e281301f6181f0\n```\n\n---\n\n## 🔍 Giải thích command\n- `git hash-object -w file.txt`: Băm nội dung của `file.txt` và ghi đối tượng nén zlib vào `.git/objects/`.\n- `git cat-file -t <hash>`: In ra định danh loại đối tượng (chữ `blob`).\n- `git cat-file -s <hash>`: Trả về số byte thực tế của nội dung tệp.\n- `git cat-file -p <hash>`: Lệnh \"pretty-print\" giải nén dữ liệu và in trực tiếp ra màn hình terminal.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Tìm kiếm tên tệp bên trong Blob**: Blob hoàn toàn không lưu tên tệp, việc cố đọc tên tệp từ blob là bất khả thi. Tên tệp chỉ được lưu trong đối tượng Tree.\n2. **Nhầm lẫn giữa Blob và Commit**: Blob không có thông điệp commit, không có tên tác giả, không có con trỏ cha.\n3. **Nghĩ rằng Blob chỉ dành cho tệp nhị phân**: Mọi file mã nguồn TypeScript, Python, HTML hay JSON đều được Git lưu trữ dưới dạng đối tượng Blob.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo một tệp `demo.txt` chứa một đoạn văn bản ngắn.\n2. **Bước 2**: Sử dụng `git hash-object -w demo.txt` để tạo và ghi Blob vào cơ sở dữ liệu đối tượng.\n3. **Bước 3**: Dùng lệnh `git cat-file -t <mã_sha>` để xác nhận loại đối tượng là `blob`.\n4. **Bước 4**: Dùng lệnh `git cat-file -p <mã_sha>` để giải nén và xem nội dung đối tượng mà không cần mở file gốc.\n\n---\n\n## 💡 Hint & mẹo\n> Sử dụng lệnh `git cat-file -s <hash>` nếu bạn muốn biết kích thước chính xác theo đơn vị byte của đối tượng Blob đó mà không cần in toàn bộ dữ liệu ra màn hình.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git cat-file -t` hiển thị chính xác kết quả `blob`.\n- Lệnh `git cat-file -p` in ra toàn bộ nội dung văn bản gốc đã ghi vào tệp `demo.txt`.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về đối tượng Blob trong cơ sở dữ liệu Git qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nNếu bạn đổi tên một tệp tin 100 MB trong dự án và thực hiện commit, dung lượng của kho chứa `.git/` sẽ tăng thêm bao nhiêu byte? Hãy giải thích dựa trên cơ chế chia tách giữa Blob và Tree.\n\n---\n\n## 📝 Tổng kết\n- Blob là đối tượng cơ bản nhất trong Git dùng để lưu trữ nội dung dữ liệu thô của tệp tin.\n- Blob hoàn toàn không chứa tên tệp, quyền hạn tệp hay dấu thời gian.\n- Sử dụng `git cat-file -p <hash>` để xem nội dung và `git cat-file -t <hash>` để kiểm tra loại đối tượng.\n- Việc tách biệt Blob và Tree giúp Git khử trùng lặp và tiết kiệm bộ nhớ khi đổi tên hay di chuyển tệp.\n",
  "quiz": {
    "id": "quiz-08-git-internals-06-blob-object",
    "title": "Trắc nghiệm: Đối tượng Blob: Lưu trữ nội dung nhị phân và tệp tin",
    "questions": [
      {
        "id": "q1",
        "question": "Đối tượng Blob trong Git chứa những thông tin nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ chứa nội dung dữ liệu thô của tệp tin",
            "correct": true
          },
          {
            "text": "Chứa tên tệp tin, ngày tạo và nội dung",
            "correct": false
          },
          {
            "text": "Chứa tên tác giả và thông điệp commit",
            "correct": false
          },
          {
            "text": "Chứa danh sách các tệp tin trong thư mục",
            "correct": false
          }
        ],
        "explanation": "Blob chỉ tập trung làm một việc duy nhất là lưu trữ nội dung thô, mọi siêu dữ liệu khác do đối tượng Tree quản lý."
      },
      {
        "id": "q2",
        "question": "Tên của tệp tin (ví dụ: index.ts) được lưu trữ ở đâu trong kiến trúc Git?",
        "type": "single",
        "options": [
          {
            "text": "Được lưu trữ bên trong đối tượng Tree (cây thư mục)",
            "correct": true
          },
          {
            "text": "Được lưu trữ bên trong đối tượng Blob",
            "correct": false
          },
          {
            "text": "Được lưu trên máy chủ của GitHub",
            "correct": false
          },
          {
            "text": "Git hoàn toàn không nhớ tên tệp tin",
            "correct": false
          }
        ],
        "explanation": "Đối tượng Tree đóng vai trò như một thư mục, ánh xạ tên tệp tin với mã băm Blob tương ứng."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để xem loại của một đối tượng Git từ mã băm SHA-1 của nó?",
        "type": "single",
        "options": [
          {
            "text": "git cat-file -t <hash>",
            "correct": true
          },
          {
            "text": "git cat-file -p <hash>",
            "correct": false
          },
          {
            "text": "git type-of <hash>",
            "correct": false
          },
          {
            "text": "git inspect <hash>",
            "correct": false
          }
        ],
        "explanation": "Cờ -t viết tắt của type, yêu cầu Git in ra định danh loại đối tượng (blob, tree, commit hoặc tag)."
      },
      {
        "id": "q4",
        "question": "Chữ viết tắt Blob là đại diện cho cụm từ tiếng Anh nào?",
        "type": "single",
        "options": [
          {
            "text": "Binary Large Object",
            "correct": true
          },
          {
            "text": "Basic Line of Branch",
            "correct": false
          },
          {
            "text": "Backup Log of Binary",
            "correct": false
          },
          {
            "text": "Build Link of Base",
            "correct": false
          }
        ],
        "explanation": "Blob là thuật ngữ khoa học máy tính kinh điển chỉ khối dữ liệu nhị phân lớn không có cấu trúc nội tại xác định."
      },
      {
        "id": "q5",
        "question": "Cờ -s trong lệnh git cat-file -s <hash> dùng để làm gì?",
        "type": "single",
        "options": [
          {
            "text": "In ra kích thước chính xác theo đơn vị byte của đối tượng",
            "correct": true
          },
          {
            "text": "Xóa sạch đối tượng khỏi cơ sở dữ liệu",
            "correct": false
          },
          {
            "text": "Gửi đối tượng lên máy chủ remote server",
            "correct": false
          },
          {
            "text": "Mã hóa đối tượng bằng mật khẩu bảo vệ",
            "correct": false
          }
        ],
        "explanation": "Cờ -s viết tắt của size, cho phép bạn truy vấn nhanh kích thước tệp tin thực tế mà không cần phải in toàn bộ nội dung ra màn hình."
      }
    ]
  }
};
export default lesson;
