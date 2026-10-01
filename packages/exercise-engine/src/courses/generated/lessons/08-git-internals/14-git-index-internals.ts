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
      "Nhận biết metadata, mode, object ID, stage và đường dẫn trong mục index; độ dài object ID phụ thuộc định dạng hash của repository.",
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
      "git rev-parse --git-path index"
    ]
  },
  "content": "# Cấu trúc tệp nhị phân .git/index (Staging Area Internals)\n\n---\n\n## 🎯 Mục tiêu\n- Giải phẫu cấu trúc nhị phân của tệp `.git/index` (DIRC - Directory Cache).\n- Nhận biết các trường thường có trong index: metadata của tệp, object ID, stage và đường dẫn.\n- Sử dụng lệnh plumbing `git ls-files --stage` để xem bảng thông tin Staging Area nội bộ.\n- Nắm vững ý nghĩa của các Stage Number (0, 1, 2, 3) trong quá trình giải quyết xung đột 3-way merge.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git index (Staging Area)\n- **Nói dễ hiểu**: Bản ghi nhị phân Git dùng để biết nội dung nào sẽ đi vào commit kế tiếp.\n- **Ví dụ**: `git add file.txt` cập nhật đường dẫn và object ID trong index.\n- **Đừng nhầm**: `.git/index` là vị trí thông thường; Git directory có thể nằm nơi khác, index có thể dùng split-index, và index không lưu nguyên bản nội dung tệp.\n\n### Stage Numbers (0, 1, 2, 3)\n- **Nói dễ hiểu**: Chỉ số phân đoạn trong index: `0` là trạng thái bình thường; `1` là bản gốc tổ tiên (base), `2` là bản của ta (ours), `3` là bản của đối phương (theirs) khi có xung đột.\n- **Ví dụ**: Khi gặp merge conflict, `git ls-files -u` hiển thị cùng lúc 3 stage 1, 2, 3 cho tệp bị xung đột.\n- **Đừng nhầm**: Sau khi sửa xong xung đột và gõ `git add`, cả 3 stage sẽ được thu về một stage 0 duy nhất.\n\n### Stat cache\n- **Nói dễ hiểu**: Index lưu một số metadata như thời gian sửa và kích thước để Git kiểm tra tệp nhanh hơn.\n- **Ví dụ**: `git status` dùng metadata để nhận ra nhiều tệp không đổi mà không phải đọc lại nội dung từng tệp.\n- **Đừng nhầm**: Đây là cách tối ưu, không phải bằng chứng tuyệt đối. Git có thể đọc và so sánh nội dung khi metadata thay đổi hoặc không đủ tin cậy.\n\n---\n\n## 📖 Định nghĩa\nGit index (còn gọi là Staging Area hoặc dircache) là bản ghi nhị phân dùng để chuẩn bị nội dung cho commit kế tiếp. Trong cấu trúc index phổ biến, phần đầu có chữ ký `DIRC`, số phiên bản và số mục; sau đó là các mục cùng phần mở rộng. Một mục thường ghi metadata của tệp, mode, object ID theo định dạng hash của repository, stage và đường dẫn. Git thường lưu index ở `.git/index`, nhưng vị trí Git directory có thể khác và split-index có thể lưu phần lớn mục ở tệp dùng chung riêng.\n\n---\n\n## 💡 Tại sao cần\n`git status` cần so sánh index với working tree và commit hiện tại. Metadata như thời gian sửa, kích thước và inode giúp Git bỏ qua nhiều lần đọc tệp không cần thiết. Nếu metadata báo có thay đổi, hoặc Git không thể tin chắc dữ liệu cache (ví dụ có thể gặp tình huống racy timestamp), Git có thể kiểm tra nội dung để xác định trạng thái. Vì vậy stat cache giúp tăng tốc nhưng không bảo đảm rằng chỉ nhìn thời gian là luôn đủ.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng tệp `.git/index` như danh sách kiểm kê hàng hóa xuất kho của một nhân viên bưu điện. Trong danh sách có ghi rõ: Tên gói hàng (`path`), Trọng lượng và giờ niêm phong (`stat cache`), Mã vạch nhận diện kiện hàng (`blob hash`), và Cột đánh dấu kiểm định (`stage`). Nhân viên bưu điện chỉ cần nhìn lướt qua danh sách đối chiếu với các gói hàng trên bàn để biết gói nào đã bị bóc tem sửa đổi mà không cần mở từng hộp ra kiểm tra.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc nhị phân của tệp .git/index:\n┌────────────────────────────────────────────────────────┐\n│ HEADER: \"DIRC\" (4 bytes) | Version (4B) | Entries (4B) │\n├────────────────────────────────────────────────────────┤\n│ ENTRY 1:                                               │\n│ - ctime / mtime (Tem thời gian hệ điều hành)          │\n│ - file size (Kích thước byte trên đĩa)                │\n│ - mode: 100644 (Quyền tệp tin)                         │\n│ - object ID: (độ dài tùy hash format của repo)        │\n│ - stage: 0 (Normal) | 1 (Base) | 2 (Ours) | 3 (Theirs) │\n│ - path: \"src/app.ts\" (Đường dẫn tệp)                   │\n├────────────────────────────────────────────────────────┤\n│ ENTRY 2: [mode, object ID, stage, path]                │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nSau khi chạy `git add`, người học dùng `git ls-files --stage` để xem các mục trong index. Mỗi dòng thường có dạng `100644 <object-id> 0 README.md`: mode, object ID, stage và đường dẫn. Stage `0` là mục bình thường. Trong một số xung đột, cùng đường dẫn có thể có các mục stage `1` (base), `2` (ours) và `3` (theirs). Độ dài object ID tùy định dạng hash của repository.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xem danh sách toàn bộ các mục trong Index kèm Stage Number\ngit ls-files --stage\n\n# Chỉ xem các tệp tin đang bị xung đột merge (stage 1, 2, 3)\ngit ls-files --unmerged\n\n# Kiểm tra trực tiếp trạng thái index với định dạng porcelain v2\ngit status --porcelain=v2\n\n# Xem đường dẫn Git dùng cho index trong repository hiện tại\ngit rev-parse --git-path index\n```\n\n---\n\n## 🔍 Giải thích command\n- `git ls-files --stage`: In ra các mục trong index gồm mode, object ID, stage number và path.\n- `git ls-files --unmerged`: Bộ lọc tiện lợi chỉ hiển thị các tệp đang có stage khác 0 khi bị conflict.\n- `git status --porcelain=v2`: Định dạng đầu ra ổn định cho script phân tích cú pháp trạng thái index.\n- `git rev-parse --git-path index`: Trả về đường dẫn index thực tế mà repository này sử dụng.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ mọi repository luôn có một tệp index ở đúng `.git/index`**: Đây là vị trí thường gặp, nhưng linked worktree và split-index có thể dùng vị trí hoặc cấu trúc khác.\n2. **Không hiểu ý nghĩa Stage Number**: Dẫn đến lúng túng khi xử lý xung đột 3-way merge ở mức độ sâu.\n3. **Nghĩ mỗi lần `git add` luôn tạo một tệp Blob mới**: Git lưu object theo nội dung; nội dung đã có có thể được dùng lại và object có thể được lưu loose hoặc trong pack.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo một tệp mới `hello.txt` và thêm vào Staging Area bằng lệnh `git add hello.txt`.\n2. **Bước 2**: Sử dụng lệnh plumbing `git ls-files --stage` để kiểm tra bảng dữ liệu nội bộ của Index.\n3. **Bước 3**: Quan sát mode, object ID, stage (`0`) và đường dẫn. Object ID có thể dài khác nhau tùy repository.\n4. **Bước 4**: Dùng `git cat-file -p <object-id>` với ID ở cột thứ hai để đọc nội dung đã được đưa vào index.\n\n---\n\n## 💡 Hint & mẹo\n> Số `0` trong đầu ra của `git ls-files --stage` biểu thị tệp tin không có xung đột; trong khi các số 1, 2, 3 xuất hiện khi đang giải quyết merge conflict.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- `git ls-files --stage` hiển thị tệp với stage `0`.\n- `git cat-file -p <object-id>` in nội dung đã stage; không cần tìm tệp vật lý trong `.git/objects/` vì object có thể đã được pack.\n\n---\n\n## ❓ Quiz nhanh\nCùng làm bài trắc nghiệm về kiến trúc nhị phân và hoạt động của tệp .git/index trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào mà thông số stat cache bên trong tệp `.git/index` giúp Git tối ưu hóa tốc độ của lệnh `git status` khi làm việc với các kho mã nguồn khổng lồ như Linux Kernel?\n\n---\n\n## 📝 Tổng kết\n- Git index là bản ghi nhị phân đại diện cho Staging Area; `.git/index` là vị trí phổ biến nhưng không phải giả định an toàn cho mọi repository.\n- Các mục chứa stat cache, mode, object ID, stage và đường dẫn; metadata giúp tăng tốc nhưng không thay thế mọi lần kiểm tra nội dung.\n- Sử dụng `git ls-files --stage` để xem chi tiết các mục đang nằm trong Index.\n- `git add` cập nhật index và bảo đảm nội dung được Git nhận diện; cùng nội dung có thể dùng chung object.\n",
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
            "text": "Index của repository (thường là `.git/index`)",
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
        "explanation": "Index thường nằm ở `.git/index`, nhưng Git directory có thể ở vị trí khác và split-index có thể lưu phần lớn mục ở tệp riêng."
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
        "question": "Ngoài object ID và đường dẫn, index lưu metadata nào để giúp Git kiểm tra working tree hiệu quả hơn?",
        "type": "single",
        "options": [
          {
            "text": "Metadata như thời gian sửa, kích thước và inode để giảm số lần phải đọc nội dung tệp",
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
        "explanation": "Git dùng stat cache để tăng tốc so sánh; khi metadata đổi hoặc không đáng tin cậy, Git vẫn có thể cần kiểm tra nội dung tệp."
      }
    ]
  }
};
export default lesson;
