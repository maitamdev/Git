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
  "content": "# Cơ chế References (Refs): heads, tags và remotes\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ bản chất của một Nhánh (Branch) trong Git: thực chất chỉ là một tệp văn bản nhỏ 41 bytes chứa mã băm SHA-1.\n- Khám phá cấu trúc thư mục .git/refs/ bao gồm: refs/heads/ (nhánh cục bộ), refs/tags/ (thẻ), và refs/remotes/ (nhánh từ xa).\n- Sử dụng lệnh plumbing git update-ref để tạo và điều khiển con trỏ nhánh trực tiếp.\n\n---\n\n## 📖 Định nghĩa\n> References (thường gọi tắt là Refs) là các con trỏ thân thiện với con người trỏ tới các đối tượng commit trong Git. Thay vì bắt người dùng phải ghi nhớ dãy mã băm 40 ký tự khó nhớ như 7a8b9c4d, Git lưu trữ các tên gọi gợi nhớ (như main, feature/login, v1.0.0) dưới dạng các tệp văn bản tĩnh nằm trong thư mục .git/refs/. Bên trong mỗi tệp tệp văn bản này chỉ chứa duy nhất một dòng văn bản gồm 40 ký tự hexa của commit mục tiêu kèm một ký tự xuống dòng (đúng 41 bytes).\n\n---\n\n## 🤔 Tại sao cần?\nNhiều hệ thống quản lý phiên bản khác (như SVN) xem một nhánh là một bản sao chép vật lý toàn bộ cây thư mục, khiến việc tạo nhánh mất nhiều thời gian và tốn hàng trăm megabyte. Trong Git, một nhánh chỉ là một con trỏ văn bản nặng 41 byte. Việc tạo nhánh, chuyển nhánh hay xóa nhánh diễn ra với tốc độ ánh sáng (dưới 1 phần nghìn giây) vì Git thực chất chỉ tạo hoặc xóa một tệp văn bản nhỏ xíu.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng bạn đang đọc một cuốn sách dày 1000 trang (lịch sử commit). Bạn không thể nhớ cuốn sách đang mở đến trang thứ 872 (mã SHA-1). Bạn lấy một chiếc kẹp sách bằng nhựa nhỏ có dán nhãn chữ \"main\" kẹp vào trang 872 (Refs). Khi bạn đọc thêm một trang mới 873 (commit mới), bạn chỉ việc rút chiếc kẹp sách \"main\" ra và kẹp nó vào trang 873. Chiếc kẹp sách siêu nhẹ và việc di chuyển nó hoàn toàn không tốn chút sức lực nào.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nBản chất cấu trúc của References trong .git/refs/:\n.git/refs/\n├── heads/                 <── Nhánh cục bộ\n│   ├── main               <── Tệp văn bản chứa: \"7a8b9c4d3e2f\\n\" (41 bytes)\n│   └── feature            <── Tệp văn bản chứa: \"1f2e3d4c5b6a\\n\"\n├── tags/                  <── Thẻ phiên bản\n│   └── v1.0.0             <── Tệp văn bản chứa mã băm của Commit hoặc Tag\n└── remotes/               <── Nhánh theo dõi từ xa\n    └── origin/\n        └── main           <── Tệp văn bản ghi vết trạng thái trên server\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư muốn kiểm chứng xem tạo nhánh trong Git có thực sự chỉ là tạo tệp văn bản hay không. Kỹ sư mở terminal và chạy lệnh: `cat .git/refs/heads/main`. Màn hình in ra chuỗi mã băm: `c5d4e3f2a1b09876543210fedcba9876543210fe`. Sau đó, thay vì gõ lệnh thông thường git branch new-feature, kỹ sư sử dụng lệnh echo để tạo tệp thủ công: `echo \"c5d4e3f2a1b09876543210fedcba9876543210fe\" > .git/refs/heads/new-feature`. Ngay lập tức, kỹ sư gõ `git branch` để kiểm tra: danh sách nhánh hiện ra ngay lập tức nhánh `new-feature` mới tinh trỏ đúng vào commit của main. Thao tác hoàn toàn thành công mà không cần qua bất kỳ công cụ phức tạp nào.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ncat .git/refs/heads/main\ngit show-ref\ngit update-ref refs/heads/test HEAD\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh cat xem nội dung mã băm bên trong tệp nhánh, git show-ref liệt kê toàn bộ các tham chiếu trong kho lưu trữ, và git update-ref cập nhật con trỏ tham chiếu an toàn theo chuẩn plumbing.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nghĩ rằng xóa một nhánh là xóa toàn bộ các commit trên nhánh đó**:  Xóa nhánh thực chất chỉ là xóa tệp văn bản 41 bytes chứa con trỏ, các commit vẫn nằm nguyên vẹn trong Object Store.\n2. **Tự ý sửa đổi nội dung tệp trong `.git/refs/` bằng tay mà vô tình xóa mất ký tự khiến mã băm không đủ 40 ký tự.**: \n3. **Nhầm lẫn giữa `refs/heads/` (nhánh cục bộ bạn có thể commit vào) và `refs/remotes/` (nhánh chỉ đọc phản ánh trạng thái máy chủ từ xa).**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Xem nội dung của tệp nhánh hiện tại bằng lệnh `cat .git/refs/heads/<tên-nhánh>`.\n2. Sử dụng lệnh plumbing `git update-ref refs/heads/manual-branch HEAD` để tạo nhánh mới.\n3. Chạy lệnh `git branch` để kiểm chứng xem nhánh `manual-branch` đã xuất hiện hay chưa.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Lệnh `git update-ref` là phương pháp chuẩn an toàn để thao tác với refs vì nó có cơ chế kiểm tra khóa tệp tin tránh xung đột tiến trình.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nNhánh mới tạo bằng lệnh plumbing update-ref hiển thị chính xác trong danh sách git branch.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra kiến thức về cơ chế con trỏ References trong Git qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào mà lệnh git packed-refs giúp tối ưu hóa hiệu năng khi kho lưu trữ có tới hàng chục nghìn nhánh và thẻ tag?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Một nhánh trong Git thực chất chỉ là một tệp văn bản 41 bytes chứa mã băm SHA-1 của commit mới nhất.\n- Tất cả tham chiếu được tổ chức ngăn nắp trong `.git/refs/` (`heads/`, `tags/`, `remotes/`).\n- Việc tạo, chuyển và xóa nhánh trong Git có chi phí tài nguyên gần như bằng 0.\n",
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
        "explanation": "Thư mục `refs/heads/` là nơi chứa tất cả các tệp con trỏ nhánh cục bộ của kho lưu trữ."
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
        "explanation": "`git update-ref <ref> <newvalue>` là lệnh plumbing chuyên dụng để sửa đổi giá trị tham chiếu một cách an toàn."
      },
      {
        "id": "q4",
        "question": "Khi bạn chạy lệnh xóa nhánh `git branch -d feature`, điều gì thực sự diễn ra trên ổ cứng?",
        "type": "single",
        "options": [
          {
            "text": "Git chỉ đơn giản là xóa tệp văn bản `.git/refs/heads/feature` khỏi đĩa",
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
        "explanation": "Xóa nhánh chỉ là xóa con trỏ; các đối tượng commit thực sự vẫn nằm an toàn trong cơ sở dữ liệu cho đến khi bị dọn rác (GC)."
      }
    ]
  }
};
export default lesson;
