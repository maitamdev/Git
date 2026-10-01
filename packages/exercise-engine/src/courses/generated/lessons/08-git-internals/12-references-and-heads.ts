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
      "Hiểu rõ bản chất của một Nhánh (Branch) trong Git: thực chất chỉ là một tệp văn bản nhỏ 41 bytes chứa mã băm SHA-1.",
      "Khám phá cấu trúc thư mục .git/refs/ bao gồm: refs/heads/ (nhánh cục bộ), refs/tags/ (thẻ), và refs/remotes/ (nhánh từ xa).",
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
      "cat .git/refs/heads/main",
      "git show-ref",
      "git update-ref refs/heads/test HEAD"
    ]
  },
  "content": "# Cơ chế References (Refs): heads, tags và remotes\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất của một Nhánh (Branch) trong Git: thực chất chỉ là một tệp văn bản nhỏ 41 bytes chứa mã băm SHA-1.\n- Khám phá cấu trúc thư mục `.git/refs/` bao gồm: `refs/heads/` (nhánh cục bộ), `refs/tags/` (thẻ), và `refs/remotes/` (nhánh từ xa).\n- Sử dụng lệnh plumbing `git update-ref` để tạo và điều khiển con trỏ nhánh trực tiếp.\n- Hiểu tại sao thao tác rẽ nhánh và xóa nhánh trong Git diễn ra gần như tức thì với chi phí tài nguyên bằng không.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git References (Refs)\n- **Nói dễ hiểu**: Các con trỏ thân thiện với con người đại diện cho các mã băm commit phức tạp trong Git.\n- **Ví dụ**: Nhãn nhánh `main` hay thẻ tag `v1.0` giúp bạn không cần phải nhớ chuỗi mã băm 40 ký tự.\n- **Đừng nhầm**: Không phải bản sao mã nguồn; refs chỉ là các tệp văn bản tĩnh chứa chuỗi SHA-1.\n\n### refs/heads/ Directory\n- **Nói dễ hiểu**: Thư mục bên trong `.git/refs/` chuyên lưu giữ các con trỏ của tất cả các nhánh cục bộ trong kho lưu trữ.\n- **Ví dụ**: Tệp `.git/refs/heads/main` chứa duy nhất mã băm của commit đầu nhánh `main`.\n- **Đừng nhầm**: Khác với `refs/remotes/` là nhánh chỉ đọc ghi nhận từ máy chủ remote; nhánh trong `refs/heads/` có thể được commit và sửa đổi tự do.\n\n### git update-ref Command\n- **Nói dễ hiểu**: Lệnh plumbing chuẩn mực và an toàn dùng để tạo mới hoặc di chuyển một con trỏ tham chiếu tới một commit cụ thể.\n- **Ví dụ**: Chạy `git update-ref refs/heads/feature-x HEAD` để tạo nhánh mới trỏ tới commit hiện tại.\n- **Đừng nhầm**: Không dùng text editor để sửa trực tiếp file ref; lệnh `git update-ref` có cơ chế khóa file (file locking) chống xung đột tiến trình.\n\n---\n\n## 📖 Định nghĩa\nReferences (thường gọi tắt là Refs) là các con trỏ thân thiện với con người trỏ tới các đối tượng commit trong Git. Thay vì bắt người dùng phải ghi nhớ dãy mã băm 40 ký tự khó nhớ như `7a8b9c4d`, Git lưu trữ các tên gọi gợi nhớ (như `main`, `feature/login`, `v1.0.0`) dưới dạng các tệp văn bản tĩnh nằm trong thư mục `.git/refs/`. Bên trong mỗi tệp văn bản này chỉ chứa duy nhất một dòng văn bản gồm 40 ký tự hexa của commit mục tiêu kèm một ký tự xuống dòng (đúng 41 bytes).\n\n---\n\n## 💡 Tại sao cần\nNhiều hệ thống quản lý phiên bản khác (như SVN) xem một nhánh là một bản sao chép vật lý toàn bộ cây thư mục, khiến việc tạo nhánh mất nhiều thời gian và tốn hàng trăm megabyte. Trong Git, một nhánh chỉ là một con trỏ văn bản nặng 41 byte. Việc tạo nhánh, chuyển nhánh hay xóa nhánh diễn ra với tốc độ ánh sáng (dưới 1 phần nghìn giây) vì Git thực chất chỉ tạo hoặc xóa một tệp văn bản nhỏ xíu.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng bạn đang đọc một cuốn sách dày 1000 trang (lịch sử commit). Bạn không thể nhớ cuốn sách đang mở đến trang thứ 872 (mã SHA-1). Bạn lấy một chiếc kẹp sách bằng nhựa nhỏ có dán nhãn chữ \"main\" kẹp vào trang 872 (Refs). Khi bạn đọc thêm một trang mới 873 (commit mới), bạn chỉ việc rút chiếc kẹp sách \"main\" ra và kẹp nó vào trang 873. Chiếc kẹp sách siêu nhẹ và việc di chuyển nó hoàn toàn không tốn chút sức lực nào.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBản chất cấu trúc của References trong .git/refs/:\n.git/refs/\n├── heads/                 <── Nhánh cục bộ\n│   ├── main               <── Tệp văn bản chứa: \"7a8b9c4d3e2f\\n\" (41 bytes)\n│   └── feature            <── Tệp văn bản chứa: \"1f2e3d4c5b6a\\n\"\n├── tags/                  <── Thẻ phiên bản\n│   └── v1.0.0             <── Tệp văn bản chứa mã băm của Commit hoặc Tag\n└── remotes/               <── Nhánh theo dõi từ xa\n    └── origin/\n        └── main           <── Tệp văn bản ghi vết trạng thái trên server\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư muốn kiểm chứng xem tạo nhánh trong Git có thực sự chỉ là tạo tệp văn bản hay không. Kỹ sư mở terminal và chạy lệnh: `cat .git/refs/heads/main`. Màn hình in ra chuỗi mã băm: `c5d4e3f2a1b09876543210fedcba9876543210fe`. Sau đó, thay vì gõ lệnh thông thường `git branch new-feature`, kỹ sư sử dụng lệnh echo để tạo tệp thủ công: `echo \"c5d4e3f2a1b09876543210fedcba9876543210fe\" > .git/refs/heads/new-feature`. Ngay lập tức, kỹ sư gõ `git branch` để kiểm tra: danh sách nhánh hiện ra ngay lập tức nhánh `new-feature` mới tinh trỏ đúng vào commit của main. Thao tác hoàn toàn thành công mà không cần qua bất kỳ công cụ phức tạp nào.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xem nội dung mã băm bên trong nhánh main\ncat .git/refs/heads/main\n\n# Liệt kê tất cả các tham chiếu trong kho\ngit show-ref\n\n# Tạo hoặc cập nhật con trỏ nhánh bằng lệnh plumbing an toàn\ngit update-ref refs/heads/hotfix-123 HEAD\n\n# Xóa tham chiếu nhánh bằng lệnh plumbing\ngit update-ref -d refs/heads/hotfix-123\n```\n\n---\n\n## 🔍 Giải thích command\n- `cat .git/refs/heads/main`: Đọc tệp văn bản 41 byte để lấy mã commit mới nhất của nhánh `main`.\n- `git show-ref`: Liệt kê tất cả các mã SHA-1 gắn liền với từng ref trong `heads`, `tags` và `remotes`.\n- `git update-ref <ref> <sha>`: Cập nhật tham chiếu tới mã băm mới có cơ chế khóa file bảo vệ an toàn.\n- `git update-ref -d <ref>`: Xóa bỏ tệp tham chiếu mà không ảnh hưởng tới dữ liệu commit trong database.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng xóa một nhánh sẽ xóa các commit**: Xóa nhánh chỉ xóa con trỏ 41 byte; commit vẫn nằm nguyên vẹn trong `.git/objects/` và có thể phục hồi qua reflog.\n2. **Sửa tệp trong `.git/refs/` thủ công**: Dễ vô tình làm mất ký tự hoặc thêm khoảng trắng khiến mã băm bị sai lệch độ dài 40 ký tự.\n3. **Nhầm lẫn giữa `heads` và `remotes`**: `refs/heads/` là nhánh cục bộ bạn thao tác trực tiếp, còn `refs/remotes/` là nhánh phản ánh trạng thái trên máy chủ từ xa khi bạn fetch.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Xem nội dung của tệp nhánh hiện tại bằng lệnh `cat .git/refs/heads/<tên_nhánh>`.\n2. **Bước 2**: Sử dụng lệnh plumbing `git update-ref refs/heads/manual-branch HEAD` để tạo nhánh mới.\n3. **Bước 3**: Chạy lệnh `git branch` để kiểm chứng xem nhánh `manual-branch` đã xuất hiện trong danh sách hay chưa.\n4. **Bước 4**: Chạy `cat .git/refs/heads/manual-branch` để so sánh mã SHA-1 với commit hiện tại.\n\n---\n\n## 💡 Hint & mẹo\n> Lệnh `git update-ref` là phương pháp chuẩn an toàn để thao tác với refs vì nó có cơ chế kiểm tra khóa tệp tin (lockfile) tránh việc hai tiến trình ghi đè đồng thời.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tệp `.git/refs/heads/manual-branch` được tạo thành công với dung lượng 41 bytes.\n- Lệnh `git branch` hiển thị nhánh mới tạo trỏ đúng vào commit hiện tại.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về cơ chế con trỏ References trong Git qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào mà tệp `.git/packed-refs` giúp tối ưu hóa hiệu năng khi kho lưu trữ có tới hàng chục nghìn nhánh và thẻ tag? Hãy giải thích cơ chế nén tham chiếu của lệnh `git gc`.\n\n---\n\n## 📝 Tổng kết\n- Một nhánh trong Git thực chất chỉ là một tệp văn bản 41 bytes chứa mã băm SHA-1 của commit mới nhất.\n- Tất cả tham chiếu được tổ chức ngăn nắp trong `.git/refs/` (`heads/`, `tags/`, `remotes/`).\n- Việc tạo, chuyển và xóa nhánh trong Git có chi phí tài nguyên gần như bằng 0.\n- Lệnh `git update-ref` là công cụ chuẩn mực của tầng Plumbing để quản trị tham chiếu an toàn.\n",
  "quiz": {
    "id": "quiz-08-git-internals-12-references-and-heads",
    "title": "Trắc nghiệm: Cơ chế References (Refs): heads, tags và remotes",
    "questions": [
      {
        "id": "q1",
        "question": "Về mặt vật lý trên ổ đĩa, một nhánh Git (Branch) được lưu trữ dưới hình thức nào?",
        "type": "single",
        "options": [
          {
            "text": "Một tệp văn bản nhỏ 41 bytes chứa duy nhất mã băm SHA-1 của commit đầu nhánh",
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
        "explanation": "Một nhánh chỉ là một con trỏ văn bản tĩnh trỏ tới một commit; nó cực kỳ nhẹ và không tốn dung lượng ổ đĩa."
      },
      {
        "id": "q2",
        "question": "Các nhánh cục bộ (local branches) được lưu trữ trong thư mục nào dưới đây?",
        "type": "single",
        "options": [
          {
            "text": ".git/refs/heads/",
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
        "explanation": "Thư mục refs/heads/ là nơi chứa tất cả các tệp con trỏ nhánh cục bộ của kho lưu trữ."
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
            "text": "Git chỉ đơn giản là xóa tệp văn bản .git/refs/heads/feature khỏi đĩa",
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
        "explanation": "Xóa nhánh chỉ là xóa con trỏ; các đối tượng commit thực sự vẫn nằm an toàn trong cơ sở dữ liệu cho đến khi bị dọn rác."
      },
      {
        "id": "q5",
        "question": "Tệp tin .git/packed-refs có vai trò gì trong việc quản lý các tham chiếu References?",
        "type": "single",
        "options": [
          {
            "text": "Gom hàng ngàn tệp tin ref riêng lẻ vào một tệp văn bản duy nhất để tối ưu hóa hệ thống tệp",
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
        "explanation": "Khi chạy git gc, Git nén các tệp rời rạc trong refs/heads và refs/tags vào một tệp duy nhất tên là packed-refs để giảm số lượng tệp nhỏ trên đĩa."
      }
    ]
  }
};
export default lesson;
