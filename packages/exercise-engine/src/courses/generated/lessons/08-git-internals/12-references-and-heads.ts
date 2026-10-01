import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-references-and-heads",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "12-references-and-heads",
    "title": "Cơ chế References (Refs): heads, tags và remotes",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "11-git-cat-file"
    ],
    "objectives": [
      "Hiểu nhánh local là ref trong namespace refs/heads/ trỏ tới commit; cách lưu vật lý và độ dài object ID phụ thuộc repository.",
      "Phân biệt các namespace refs/heads/, refs/tags/ và refs/remotes/.",
      "Sử dụng lệnh plumbing git update-ref để tạo và điều khiển con trỏ nhánh trực tiếp."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "references",
      "refs",
      "heads",
      "branches",
      "tags",
      "remotes",
      "pointers"
    ],
    "commands": [
      "git show-ref --verify refs/heads/main",
      "git show-ref",
      "git update-ref refs/heads/test HEAD"
    ]
  },
  "content": "# Cơ chế References (Refs): heads, tags và remotes\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu nhánh là một ref thuộc `refs/heads/` trỏ tới commit; không giả định ref luôn là file rời hay ID có độ dài cố định.\n- Phân biệt các namespace logic `refs/heads/`, `refs/tags/` và `refs/remotes/`.\n- Sử dụng lệnh plumbing `git update-ref` để tạo và điều khiển con trỏ nhánh trực tiếp.\n- Hiểu tại sao thao tác rẽ nhánh và xóa nhánh trong Git diễn ra gần như tức thì với chi phí tài nguyên bằng không.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git References (Refs)\n- **Nói dễ hiểu**: Ref là tên có thể tra ra object ID; local branch trỏ tới commit, tag có thể trỏ tới nhiều loại object.\n- **Ví dụ**: `main` thường được viết đầy đủ là `refs/heads/main` và chỉ tới commit đầu nhánh.\n- **Đừng nhầm**: Ref là một tên logic; Git có thể lưu ref riêng, trong `packed-refs` hoặc bằng backend refs khác.\n\n### refs/heads/ Directory\n- **Nói dễ hiểu**: Namespace `refs/heads/` dành cho các nhánh local.\n- **Ví dụ**: `refs/heads/main` đặt tên ref của nhánh `main`; dùng `git show-ref --verify refs/heads/main` để tra cứu.\n- **Đừng nhầm**: Remote-tracking branch phản ánh lần fetch gần nhất; nó không tự cập nhật từ server khi chưa fetch.\n\n### git update-ref Command\n- **Nói dễ hiểu**: Lệnh plumbing chuẩn mực và an toàn dùng để tạo mới hoặc di chuyển một con trỏ tham chiếu tới một commit cụ thể.\n- **Ví dụ**: Chạy `git update-ref refs/heads/feature-x HEAD` để tạo nhánh mới trỏ tới commit hiện tại.\n- **Đừng nhầm**: Không dùng text editor để sửa trực tiếp file ref; lệnh `git update-ref` có cơ chế khóa file (file locking) chống xung đột tiến trình.\n\n---\n\n## 📖 Định nghĩa\nRef là tên logic ánh xạ tới object. Nhánh local thuộc `refs/heads/`; remote-tracking ref thuộc `refs/remotes/`; tag thuộc `refs/tags/`. Cách lưu vật lý có thể là loose ref, `packed-refs` hoặc backend khác, và object ID có độ dài tùy hash format.\n\n---\n\n## 💡 Tại sao cần\nMột nhánh Git là một tên ref trỏ tới commit, không phải bản sao riêng của toàn bộ working tree. Vì thế việc tạo nhánh thường nhẹ và nhanh; tốc độ cụ thể phụ thuộc repository và hệ thống, còn ref có thể không được lưu thành file riêng.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng bạn đang đọc một cuốn sách dày 1000 trang (lịch sử commit). Bạn không thể nhớ cuốn sách đang mở đến trang thứ 872 (mã SHA-1). Bạn lấy một chiếc kẹp sách bằng nhựa nhỏ có dán nhãn chữ \"main\" kẹp vào trang 872 (Refs). Khi bạn đọc thêm một trang mới 873 (commit mới), bạn chỉ việc rút chiếc kẹp sách \"main\" ra và kẹp nó vào trang 873. Chiếc kẹp sách siêu nhẹ và việc di chuyển nó hoàn toàn không tốn chút sức lực nào.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBản chất cấu trúc của References trong .git/refs/:\n.git/refs/\n├── heads/                 <── Nhánh cục bộ\n│   ├── main               <── Tên ref logic; có thể loose hoặc packed\n│   └── feature            <── Không cần có một tệp riêng trên mọi backend\n├── tags/                  <── Thẻ phiên bản\n│   └── v1.0.0             <── Tệp văn bản chứa mã băm của Commit hoặc Tag\n└── remotes/               <── Nhánh theo dõi từ xa\n    └── origin/\n        └── main           <── Ref local ghi nhận lần fetch gần nhất\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nĐể quan sát một ref mà không phụ thuộc cách lưu vật lý, người học chạy `git show-ref --verify refs/heads/main` và `git rev-parse refs/heads/main`. Trong một repository thử nghiệm có commit, có thể tạo rồi xóa ref riêng bằng `git update-ref refs/heads/ref-lab HEAD` và `git update-ref -d refs/heads/ref-lab`. Không tự tạo hoặc sửa tệp bên trong `.git/refs/`: refs có thể đã được pack hoặc lưu bằng backend khác.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xác minh nhánh local và xem commit mà nhánh trỏ tới\ngit show-ref --verify refs/heads/main\ngit rev-parse refs/heads/main\n\n# Liệt kê tất cả các tham chiếu trong kho\ngit show-ref\n\n# Tạo hoặc cập nhật con trỏ nhánh bằng lệnh plumbing an toàn\ngit update-ref refs/heads/hotfix-123 HEAD\n\n# Xóa tham chiếu nhánh bằng lệnh plumbing\ngit update-ref -d refs/heads/hotfix-123\n```\n\n---\n\n## 🔍 Giải thích command\n- `git show-ref --verify refs/heads/main`: Xác minh ref `main` tồn tại và in object ID.\n- `git rev-parse refs/heads/main`: Phân giải ref thành object ID theo hash format hiện tại.\n- `git update-ref <ref> <object>`: Tạo/cập nhật ref với cơ chế khóa; vì lệnh này có thể di chuyển ref đã tồn tại, hãy kiểm tra đích hoặc dùng old-value guard khi cần.\n- `git update-ref -d <ref>`: Xóa ref; object có thể còn được giữ một thời gian nhưng không được bảo đảm tồn tại sau garbage collection.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng xóa một nhánh đồng nghĩa commit biến mất ngay**: Commit có thể còn trong database và reflog một thời gian; object không còn tham chiếu có thể bị garbage collection dọn.\n2. **Sửa tệp ref nội bộ bằng tay**: Ref có thể được pack hoặc dùng backend khác; dùng lệnh Git để tra cứu và cập nhật.\n3. **Nhầm lẫn giữa `heads` và `remotes`**: `refs/heads/` là nhánh cục bộ bạn thao tác trực tiếp, còn `refs/remotes/` là nhánh phản ánh trạng thái trên máy chủ từ xa khi bạn fetch.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Trong repository thực hành có commit, chạy `git show-ref --verify refs/heads/main` hoặc thay `main` bằng tên nhánh hiện tại.\n2. Tạo ref thử bằng `git update-ref refs/heads/manual-branch HEAD`.\n3. Xác minh bằng `git show-ref --verify refs/heads/manual-branch` và `git branch --list manual-branch`.\n4. Xóa ref thử bằng `git update-ref -d refs/heads/manual-branch`; không sửa trực tiếp `.git/refs/`.\n\n---\n\n## 💡 Hint & mẹo\n> Lệnh `git update-ref` cập nhật refs an toàn và hỗ trợ kiểm tra giá trị cũ để tránh ghi đè thay đổi ngoài ý muốn. Dùng cẩn thận: xóa hoặc di chuyển ref có thể làm commit không còn được tham chiếu.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- `git show-ref --verify refs/heads/manual-branch` thấy ref thử trỏ tới cùng commit với HEAD.\n- Sau lệnh xóa, `git show-ref --verify refs/heads/manual-branch` không còn tìm thấy ref.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về cơ chế con trỏ References trong Git qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào mà tệp `.git/packed-refs` giúp tối ưu hóa hiệu năng khi kho lưu trữ có tới hàng chục nghìn nhánh và thẻ tag? Hãy giải thích cơ chế nén tham chiếu của lệnh `git gc`.\n\n---\n\n## 📝 Tổng kết\n- Nhánh local là ref thuộc `refs/heads/` trỏ tới commit; cách lưu vật lý có thể loose, packed hoặc dùng backend khác.\n- Các namespace chính gồm `refs/heads/`, `refs/tags/` và `refs/remotes/`.\n- Nhánh là ref nhỏ so với các object lịch sử; thao tác với ref thường nhẹ nhưng vẫn chịu tác động của repository và hệ thống.\n- Lệnh `git update-ref` là công cụ chuẩn mực của tầng Plumbing để quản trị tham chiếu an toàn.\n",
  "quiz": {
    "id": "quiz-08-git-internals-12-references-and-heads",
    "title": "Trắc nghiệm: Cơ chế References (Refs): heads, tags và remotes",
    "questions": [
      {
        "id": "q1",
        "question": "Nhận định nào đúng về một nhánh local Git?",
        "type": "single",
        "options": [
          {
            "text": "Một ref trong namespace refs/heads/ trỏ tới commit; cách lưu vật lý và độ dài ID phụ thuộc repository",
            "correct": true
          },
          {
            "text": "Một bản sao chép toàn bộ thư mục dự án sang một thư mục mới",
            "correct": false
          },
          {
            "text": "Một tệp nén zip chứa toàn bộ mã nguồn",
            "correct": false
          },
          {
            "text": "Một bản ghi trong Registry hệ điều hành",
            "correct": false
          }
        ],
        "explanation": "Branch là tên ref trỏ tới commit, không phải bản sao working tree; Git có thể lưu ref rời, packed hoặc bằng backend khác."
      },
      {
        "id": "q2",
        "question": "Các nhánh cục bộ (local branches) được lưu trữ trong thư mục nào dưới đây?",
        "type": "single",
        "options": [
          {
            "text": "refs/heads/",
            "correct": true
          },
          {
            "text": ".git/refs/remotes/",
            "correct": false
          },
          {
            "text": ".git/refs/tags/",
            "correct": false
          },
          {
            "text": ".git/branches_dir/",
            "correct": false
          }
        ],
        "explanation": "`refs/heads/` là namespace của nhánh local; Git không nhất thiết lưu từng nhánh thành file riêng trong thư mục này."
      },
      {
        "id": "q3",
        "question": "Lệnh Plumbing chuẩn mực nào được sử dụng để cập nhật con trỏ của một tham chiếu an toàn?",
        "type": "single",
        "options": [
          {
            "text": "git update-ref",
            "correct": true
          },
          {
            "text": "git set-branch",
            "correct": false
          },
          {
            "text": "git point-to",
            "correct": false
          },
          {
            "text": "git move-pointer",
            "correct": false
          }
        ],
        "explanation": "Lệnh git update-ref là lệnh plumbing chuyên dụng để sửa đổi giá trị tham chiếu một cách an toàn."
      },
      {
        "id": "q4",
        "question": "Khi bạn chạy lệnh xóa nhánh git branch -d feature, điều gì thực sự diễn ra trên ổ cứng?",
        "type": "single",
        "options": [
          {
            "text": "Git xóa ref feature khỏi kho tham chiếu; commit không bị xóa ngay chỉ vì ref bị xóa",
            "correct": true
          },
          {
            "text": "Git quét và xóa vĩnh viễn tất cả các commit mà nhánh đó từng tạo ra",
            "correct": false
          },
          {
            "text": "Git gửi yêu cầu đóng tài khoản GitHub của bạn",
            "correct": false
          },
          {
            "text": "Hệ điều hành format lại phân vùng ổ đĩa",
            "correct": false
          }
        ],
        "explanation": "Xóa nhánh bỏ ref trỏ tới commit; object có thể còn truy cập qua ref khác hoặc reflog, nhưng object không còn tham chiếu có thể bị GC dọn."
      },
      {
        "id": "q5",
        "question": "Tệp tin .git/packed-refs có vai trò gì trong việc quản lý các tham chiếu References?",
        "type": "single",
        "options": [
          {
            "text": "Lưu nhiều ref phù hợp trong một tệp packed-refs để giảm số lượng ref loose",
            "correct": true
          },
          {
            "text": "Mã hóa toàn bộ mật khẩu remote repository",
            "correct": false
          },
          {
            "text": "Lưu giữ danh sách các commit bị xóa",
            "correct": false
          },
          {
            "text": "Chứa bản sao lưu của tệp .gitignore",
            "correct": false
          }
        ],
        "explanation": "`git pack-refs` có thể chuyển nhiều ref phù hợp sang `packed-refs`; một số ref vẫn loose và backend lưu trữ có thể khác."
      }
    ]
  }
};
export default lesson;
