import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-git-index-internals",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "14-git-index-internals",
    "title": "Cấu trúc tệp nhị phân .git/index (Staging Area Internals)",
    "level": "advanced",
    "duration": 35,
    "xp": 95,
    "prerequisites": [
      "13-symbolic-refs-head"
    ],
    "objectives": [
      "Giải phẫu cấu trúc nhị phân của tệp .git/index (DIRC - Directory Cache).",
      "Hiểu rõ các trường dữ liệu được lưu cho mỗi tệp: ctime, mtime, file size, permissions, SHA-1, và đường dẫn tệp.",
      "Sử dụng lệnh plumbing git ls-files --stage để xem bảng thông tin Staging Area nội bộ."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git index",
      "staging area",
      "binary index format",
      "dircache",
      "stat cache"
    ],
    "commands": [
      "git ls-files --stage",
      "git status --porcelain=v2",
      "git update-index"
    ]
  },
  "content": "# Cấu trúc tệp nhị phân .git/index (Staging Area Internals)\n\n---\n\n## 🎯 Mục tiêu\n- Giải phẫu cấu trúc nhị phân của tệp `.git/index` (DIRC - Directory Cache).\n- Hiểu rõ các trường dữ liệu được lưu cho mỗi tệp: ctime, mtime, file size, permissions, SHA-1, và đường dẫn tệp.\n- Sử dụng lệnh plumbing `git ls-files --stage` để xem bảng thông tin Staging Area nội bộ.\n- Nắm vững ý nghĩa của các Stage Number (0, 1, 2, 3) trong quá trình giải quyết xung đột 3-way merge.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Directory Cache (.git/index)\n- **Nói dễ hiểu**: Tệp nhị phân duy nhất đại diện cho Staging Area, đóng vai trò bản nháp bộ nhớ đệm trung gian trước khi commit.\n- **Ví dụ**: Khi gõ `git add file.txt`, Git ghi đường dẫn `file.txt` cùng mã blob vào tệp `.git/index`.\n- **Đừng nhầm**: Không phải là một thư mục chứa các bản copy vật lý; nó chỉ là danh bạ nhị phân lưu trữ các con trỏ trỏ tới Blobs.\n\n### Stage Numbers (0, 1, 2, 3)\n- **Nói dễ hiểu**: Chỉ số phân đoạn trong index: `0` là trạng thái bình thường; `1` là bản gốc tổ tiên (base), `2` là bản của ta (ours), `3` là bản của đối phương (theirs) khi có xung đột.\n- **Ví dụ**: Khi gặp merge conflict, `git ls-files -u` hiển thị cùng lúc 3 stage 1, 2, 3 cho tệp bị xung đột.\n- **Đừng nhầm**: Sau khi sửa xong xung đột và gõ `git add`, cả 3 stage sẽ được thu về một stage 0 duy nhất.\n\n### Stat Cache Optimization\n- **Nói dễ hiểu**: Cơ chế lưu lại mtime (giờ sửa đổi) và size tệp tin trực tiếp từ hệ điều hành để nhận diện thay đổi trong tích tắc.\n- **Ví dụ**: Lệnh `git status` chỉ cần so sánh tem mtime của file trên đĩa với số mtime lưu trong index mà không cần đọc lại toàn bộ nội dung.\n- **Đừng nhầm**: Nếu bạn chạm vào file bằng lệnh `touch` (đổi mtime) mà không đổi nội dung, Git sẽ băm lại nội dung để xác minh trước khi báo modified.\n\n---\n\n## 📖 Định nghĩa\nTệp `.git/index` là một tệp nhị phân phức tạp và có hiệu năng cao bậc nhất trong Git, đại diện cho Staging Area (hay còn gọi là Cache hoặc Dircache). Nó đóng vai trò là bản nháp trung gian chuẩn bị cho commit tiếp theo. Cấu trúc nhị phân của tệp index bắt đầu bằng 4 byte chữ ký \"DIRC\", phiên bản, số lượng mục (entries), và danh sách các tệp được theo dõi. Mỗi mục lưu giữ đầy đủ thông số tem thời gian của hệ điều hành (stat cache), quyền hạn tệp, mã băm SHA-1 của Blob tương ứng, số thứ tự phân đoạn (stage number dùng cho xử lý merge conflict), và đường dẫn tệp.\n\n---\n\n## 💡 Tại sao cần\nTại sao lệnh `git status` có thể quét hàng trăm nghìn tệp tin trong dự án lớn chỉ trong tích tắc nửa giây? Bí quyết nằm ở tệp `.git/index`. Bằng cách lưu lại thông số `mtime` (thời điểm chỉnh sửa tệp) và kích thước tệp trực tiếp từ hệ điều hành, Git chỉ cần gọi hàm hệ thống nhanh `stat()` để so sánh tem thời gian. Nếu tem thời gian không đổi, Git biết chắc 100% nội dung tệp chưa hề bị sửa mà không cần tốn công đọc nội dung tệp từ đĩa.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng tệp `.git/index` như danh sách kiểm kê hàng hóa xuất kho của một nhân viên bưu điện. Trong danh sách có ghi rõ: Tên gói hàng (`path`), Trọng lượng và giờ niêm phong (`stat cache`), Mã vạch nhận diện kiện hàng (`blob hash`), và Cột đánh dấu kiểm định (`stage`). Nhân viên bưu điện chỉ cần nhìn lướt qua danh sách đối chiếu với các gói hàng trên bàn để biết gói nào đã bị bóc tem sửa đổi mà không cần mở từng hộp ra kiểm tra.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc nhị phân của tệp .git/index:\n┌────────────────────────────────────────────────────────┐\n│ HEADER: \"DIRC\" (4 bytes) | Version (4B) | Entries (4B) │\n├────────────────────────────────────────────────────────┤\n│ ENTRY 1:                                               │\n│ - ctime / mtime (Tem thời gian hệ điều hành)          │\n│ - file size (Kích thước byte trên đĩa)                │\n│ - mode: 100644 (Quyền tệp tin)                         │\n│ - sha1: e69de29bb2d1 (Mã băm trỏ tới Blob)            │\n│ - stage: 0 (Normal) | 1 (Base) | 2 (Ours) | 3 (Theirs) │\n│ - path: \"src/app.ts\" (Đường dẫn tệp)                   │\n├────────────────────────────────────────────────────────┤\n│ ENTRY 2: [mode, sha1, path]                            │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư muốn xem những gì thực sự đang nằm trong Staging Area sau khi gõ `git add`. Kỹ sư chạy lệnh plumbing: `git ls-files --stage`. Màn hình hiển thị danh sách chi tiết: `100644 e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 0 README.md` và `100644 3b18e512db79e4c8300de074a1e281301f6181f0 0 src/index.ts`. Kỹ sư nhận thấy số `0` ở giữa chính là stage number (biểu thị tệp ở trạng thái bình thường, không xung đột). Khi xảy ra xung đột merge conflict, lệnh này sẽ hiển thị 3 dòng cho cùng một tệp ứng với stage 1 (base), stage 2 (ours), và stage 3 (theirs). Hiểu được tệp index giúp kỹ sư giải quyết xung đột ở tầng bản chất nhất.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xem danh sách toàn bộ các mục trong Index kèm Stage Number\ngit ls-files --stage\n\n# Chỉ xem các tệp tin đang bị xung đột merge (stage 1, 2, 3)\ngit ls-files --unmerged\n\n# Kiểm tra trực tiếp trạng thái index với định dạng porcelain v2\ngit status --porcelain=v2\n\n# Cập nhật trực tiếp tệp vào index bằng lệnh plumbing\ngit update-index --add sample.txt\n```\n\n---\n\n## 🔍 Giải thích command\n- `git ls-files --stage`: In ra bảng dữ liệu nội bộ của index gồm mode, sha-1, stage number và path.\n- `git ls-files --unmerged`: Bộ lọc tiện lợi chỉ hiển thị các tệp đang có stage khác 0 khi bị conflict.\n- `git status --porcelain=v2`: Định dạng đầu ra ổn định cho script phân tích cú pháp trạng thái index.\n- `git update-index --add`: Thao tác trực tiếp với Staging Area mà không cần qua lệnh bề mặt `git add`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Staging Area là một thư mục ảo**: Thực chất chỉ là một tệp nhị phân duy nhất `.git/index` chứa danh sách con trỏ trỏ tới Blob.\n2. **Không hiểu ý nghĩa Stage Number**: Dẫn đến lúng túng khi xử lý xung đột 3-way merge ở mức độ sâu.\n3. **Nghĩ rằng `git add` chỉ là đánh dấu nhãn**: Lệnh `git add` thực tế đã tạo ngay đối tượng Blob mới nén zlib vào `.git/objects/` tại thời điểm bạn gõ lệnh.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo một tệp mới `hello.txt` và thêm vào Staging Area bằng lệnh `git add hello.txt`.\n2. **Bước 2**: Sử dụng lệnh plumbing `git ls-files --stage` để kiểm tra bảng dữ liệu nội bộ của Index.\n3. **Bước 3**: Quan sát 4 cột dữ liệu: File Mode (`100644`), Blob SHA-1, Stage Number (`0`), và Đường dẫn tệp.\n4. **Bước 4**: Dùng lệnh `git cat-file -p <mã_sha_ở_cột_2>` để xác minh Blob đã được ghi vào database ngay khi `git add`.\n\n---\n\n## 💡 Hint & mẹo\n> Số `0` trong đầu ra của `git ls-files --stage` biểu thị tệp tin không có xung đột; trong khi các số 1, 2, 3 xuất hiện khi đang giải quyết merge conflict.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git ls-files --stage` hiển thị chính xác tệp tin với stage number là `0`.\n- Đối tượng Blob tương ứng xuất hiện ngay trong thư mục `.git/objects/` ngay cả khi bạn chưa hề gõ lệnh `git commit`.\n\n---\n\n## ❓ Quiz nhanh\nCùng làm bài trắc nghiệm về kiến trúc nhị phân và hoạt động của tệp .git/index trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào mà thông số stat cache bên trong tệp `.git/index` giúp Git tối ưu hóa tốc độ của lệnh `git status` khi làm việc với các kho mã nguồn khổng lồ như Linux Kernel?\n\n---\n\n## 📝 Tổng kết\n- Tệp `.git/index` là tệp nhị phân Directory Cache đại diện cho Staging Area.\n- Lưu trữ stat cache (mtime, size), quyền hạn tệp, mã băm Blob và stage number.\n- Sử dụng `git ls-files --stage` để xem chi tiết các mục đang nằm trong Index.\n- Quá trình `git add` thực sự tạo Blob trong database và ghi nhận thông tin vào file `.git/index`.\n",
  "quiz": {
    "id": "quiz-08-git-internals-14-git-index-internals",
    "title": "Trắc nghiệm: Cấu trúc tệp nhị phân .git/index (Staging Area Internals)",
    "questions": [
      {
        "id": "q1",
        "question": "Tệp tin nào trên ổ đĩa đại diện trực tiếp cho Staging Area trong kho lưu trữ Git?",
        "type": "single",
        "options": [
          {
            "text": ".git/index",
            "correct": true
          },
          {
            "text": ".git/staging/",
            "correct": false
          },
          {
            "text": ".git/cache/",
            "correct": false
          },
          {
            "text": ".git/stage.txt",
            "correct": false
          }
        ],
        "explanation": "Staging Area không phải là một thư mục, mà là một tệp nhị phân duy nhất có tên .git/index."
      },
      {
        "id": "q2",
        "question": "Lệnh Plumbing nào dùng để xem danh sách các tệp tin trong Index kèm mã mode, mã băm Blob và stage number?",
        "type": "single",
        "options": [
          {
            "text": "git ls-files --stage",
            "correct": true
          },
          {
            "text": "git show-index",
            "correct": false
          },
          {
            "text": "git list-stage",
            "correct": false
          },
          {
            "text": "git inspect-cache",
            "correct": false
          }
        ],
        "explanation": "git ls-files --stage (hoặc -s) hiển thị bảng chi tiết các bản ghi đang được lập chỉ mục trong Staging Area."
      },
      {
        "id": "q3",
        "question": "Khi xảy ra xung đột merge conflict trên một tệp tin, stage number 2 trong index đại diện cho phiên bản nào?",
        "type": "single",
        "options": [
          {
            "text": "Phiên bản của nhánh hiện tại của bạn (ours)",
            "correct": true
          },
          {
            "text": "Phiên bản tổ tiên chung (base)",
            "correct": false
          },
          {
            "text": "Phiên bản của nhánh đang được gộp vào (theirs)",
            "correct": false
          },
          {
            "text": "Phiên bản đã giải quyết xong",
            "correct": false
          }
        ],
        "explanation": "Trong quy ước 3-way merge của Git: stage 1 là base (tổ tiên chung), stage 2 là ours (nhánh ta), stage 3 là theirs (nhánh bạn)."
      },
      {
        "id": "q4",
        "question": "Bốn byte ký tự đầu tiên trong tiêu đề của tệp nhị phân .git/index là gì?",
        "type": "single",
        "options": [
          {
            "text": "DIRC (Directory Cache)",
            "correct": true
          },
          {
            "text": "GITI (Git Index)",
            "correct": false
          },
          {
            "text": "BLOB",
            "correct": false
          },
          {
            "text": "PACK",
            "correct": false
          }
        ],
        "explanation": "Chữ ký nhị phân (magic signature) của tệp index trong mã nguồn Git là 4 ký tự ASCII DIRC."
      },
      {
        "id": "q5",
        "question": "Ngoài mã băm SHA-1 và đường dẫn tệp, tệp tin .git/index còn lưu thông tin gì để giúp lệnh git status chạy cực nhanh?",
        "type": "single",
        "options": [
          {
            "text": "Dấu thời gian sửa đổi (mtime), kích thước tệp và inode để phát hiện thay đổi tức thì",
            "correct": true
          },
          {
            "text": "Toàn bộ mã nguồn của dự án dưới dạng nén",
            "correct": false
          },
          {
            "text": "Lịch sử duyệt web của lập trình viên",
            "correct": false
          },
          {
            "text": "Mật khẩu mã hóa của SSH key",
            "correct": false
          }
        ],
        "explanation": "Nhờ cơ chế cache các thuộc tính stat (mtime, size) của hệ điều hành trong .git/index, Git có thể so sánh siêu dữ liệu trong tích tắc mà không cần phải băm lại từng tệp tin trên đĩa."
      }
    ]
  }
};
export default lesson;
