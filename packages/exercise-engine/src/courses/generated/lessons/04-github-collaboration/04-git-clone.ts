import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-clone",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "04-git-clone",
    "title": "Tải dự án về máy với git clone",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "03-origin-concept"
    ],
    "objectives": [
      "Dùng `git clone` để tạo kho cục bộ mới từ một URL.",
      "Giải thích clone thiết lập remote `origin` và checkout nhánh mặc định khi có.",
      "Chọn thư mục riêng để tránh thay đổi nhầm một kho đang làm.",
      "Phân biệt clone thông thường với shallow clone."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "clone-remote"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git clone",
      "tai du an",
      "nhan ban kho",
      "clone repo",
      "bat dau du an"
    ],
    "commands": [
      "git clone <url-kho-chứa>",
      "git clone <url-kho-chứa> <tên-thư-mục-mới>",
      "git clone --depth 1 <url-kho-chứa>",
      "git clone --branch <tên-nhánh> <url-kho-chứa>"
    ]
  },
  "content": "# Tải dự án về máy với git clone\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng câu lệnh `git clone` để tải toàn bộ một dự án từ GitHub về máy tính cá nhân.\n- Hiểu rõ các hành động ngầm mà Git tự động thực hiện trong quá trình clone: khởi tạo, liên kết remote, fetch dữ liệu và checkout nhánh mặc định.\n- Tùy chỉnh tên thư mục đích khi clone dự án về ổ đĩa.\n- Sử dụng cờ `--depth 1` (shallow clone) để tải nhanh các dự án có kích thước khổng lồ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git clone\n- **Nói dễ hiểu**: Lệnh tạo một thư mục kho Git mới từ địa chỉ máy chủ, tải dữ liệu cần thiết và thiết lập remote theo dõi nguồn.\n- **Ví dụ**: `git clone https://github.com/facebook/react.git` tải toàn bộ mã nguồn React về máy.\n- **Đừng nhầm**: Không chỉ tải mỗi file code nén dạng ZIP; lệnh mang về cả kho dữ liệu `.git` hoàn chỉnh.\n\n### shallow clone\n- **Nói dễ hiểu**: Kỹ thuật chỉ tải về một số lượng commit gần nhất thay vì toàn bộ lịch sử từ đầu dự án.\n- **Ví dụ**: `git clone --depth 1 https://github.com/org/huge-repo.git` để tải cực nhanh trong CI/CD.\n- **Đừng nhầm**: Bản sao nông này thiếu lịch sử commit cũ; không thích hợp nếu bạn cần điều tra commit cũ bằng git log hay git blame.\n\n### nested repository — kho lồng bên trong kho khác\n- **Nói dễ hiểu**: Một thư mục Git được đặt bên trong thư mục của kho khác.\n- **Ví dụ**: Clone một dự án con vào thư mục dự án cha.\n- **Đừng nhầm**: Git không tự biến kho con thành submodule. Nếu muốn quản lý quan hệ giữa hai kho, cần chọn giải pháp phù hợp như submodule hoặc subtree.\n\n---\n\n## 📖 Định nghĩa\n`git clone <url>` tạo một thư mục mới chứa kho cục bộ, tải lịch sử theo chế độ clone đã chọn, thiết lập remote `origin` và checkout nhánh mặc định (nếu kho có nhánh). Clone thông thường tải lịch sử đầy đủ; tùy chọn như `--depth 1` chỉ lấy lịch sử nông. Lệnh cần mạng và quyền đọc kho.\n\n---\n\n## 💡 Tại sao cần\nKhi tham gia một dự án có sẵn, clone tạo thư mục làm việc riêng trên máy bạn. Trước khi chạy, hãy biết thư mục hiện tại ở đâu và tránh clone đè vào thư mục dự án khác.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung clone như lấy một bản làm việc mới từ kho chung và ghi sẵn địa chỉ kho chung vào danh bạ. Sau đó `fetch` cập nhật thông tin mới, còn `pull` đưa thay đổi vào nhánh đang làm.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình tự động bên trong lệnh git clone:\ngit clone https://github.com/user/project.git\n                      │\n   ┌──────────────────┼──────────────────┐\n   ▼                  ▼                  ▼\n[1. git init]  [2. remote add origin] [3. git fetch]\n   │\n   ▼\n[4. git checkout main (tạo Working Tree hoàn chỉnh)]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nNgày đầu đi làm, kỹ sư Minh nhận đường link kho mã nguồn `https://github.com/company/mobile-app.git`. Minh mở terminal và gõ `git clone https://github.com/company/mobile-app.git`. Git tự động tạo thư mục mobile-app, tải đầy đủ 500 commit trước đó và cấu hình sẵn remote origin. Minh chỉ việc mở thư mục trong editor và bắt tay vào code ngay.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit clone <url-kho-chứa>\ngit clone <url-kho-chứa> <tên-thư-mục-mới>\ngit clone --depth 1 <url-kho-chứa>\ngit clone --branch <tên-nhánh> <url-kho-chứa>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git clone <url>`: Sao chép toàn bộ kho từ xa về thư mục mang tên mặc định của dự án.\n- `git clone <url> <tên-thư-mục>`: Tải dự án về và đổi tên thư mục theo ý muốn cá nhân.\n- `git clone --depth 1 <url>`: Chỉ tải commit mới nhất, giảm tối đa dung lượng tải về khi chỉ muốn đọc code.\n- `git clone --branch <nhánh> <url>`: Tải về và tự động checkout sẵn ngay vào nhánh chỉ định thay vì nhánh mặc định.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Clone vào bên trong một kho Git khác đang tồn tại**: Tạo ra lỗi lồng kho chứa (nested repo) khiến Git không theo dõi được file con.\n2. **Quên kiểm tra quyền truy cập kho private**: Khi clone kho riêng tư mà chưa cấu hình tài khoản hoặc SSH key, lệnh sẽ báo lỗi `Permission denied`.\n3. **Tải file ZIP thay vì git clone**: Tải ZIP không có thư mục `.git`, làm mất toàn bộ lịch sử commit và không thể push hay pull.\n\n---\n\n## 🧪 Lab thực hành\n**Bài này làm trong PowerShell thật, không chạy `git clone` ở terminal mô phỏng của khóa học.** Simulator chỉ giữ một kho làm việc; clone tại đó sẽ bị chặn để bảo vệ bài đang học.\n1. Tạo thư mục luyện tập riêng và đi vào đó: `New-Item -ItemType Directory -Path \"$env:USERPROFILE\\Documents\\git-clone-practice\" -Force` rồi `Set-Location \"$env:USERPROFILE\\Documents\\git-clone-practice\"`.\n2. Clone dự án mẫu vào thư mục con mới: `git clone https://github.com/octocat/Hello-World.git git-clone-demo`.\n3. Chạy `cd git-clone-demo` để vào thư mục vừa tạo.\n4. Chạy `git remote -v`; xác nhận `origin` trỏ tới URL đã clone.\n5. Chạy `git log --oneline -n 5` để xem các commit đã tải về.\n6. Kết thúc bằng `cd ..`. Đừng xóa thư mục nếu muốn xem lại bài; đây là một kho riêng, tách khỏi dự án khóa học.\n\n---\n\n## 💡 Hint & mẹo\n> Trước khi clone, kiểm tra `pwd` (hoặc `Get-Location` trong PowerShell). Chọn một thư mục cha riêng để Git tạo thư mục dự án con.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Thư mục `git-clone-demo` có file dự án và thư mục `.git`.\n- Lệnh `git remote -v` hiển thị đúng `origin` trỏ về địa chỉ kho mẫu.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về thao tác git clone.\n\n---\n\n## 🚀 Thử thách nâng cao\nThử dùng tùy chọn `--depth 1` để clone một dự án mã nguồn mở lớn và so sánh thời gian tải về so với lệnh clone thông thường.\n\n---\n\n## 📝 Tổng kết\n- Clone tạo kho cục bộ mới và thường thiết lập remote tên `origin`.\n- Clone mặc định lấy lịch sử đầy đủ; shallow clone như `--depth 1` chỉ lấy một phần lịch sử.\n- Clone vào thư mục riêng. Lệnh này cần mạng và quyền đọc kho nguồn.\n",
  "quiz": {
    "id": "quiz-04-04-git-clone",
    "title": "Trắc nghiệm: Tải dự án với git clone",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh `git clone` khác biệt căn bản so với việc tải tệp nén \"Download ZIP\" từ GitHub ở điểm nào?",
        "type": "single",
        "options": [
          {
            "text": "Clone tải về toàn bộ kho lưu trữ bao gồm thư mục .git, đầy đủ lịch sử commit và liên kết remote origin",
            "correct": true
          },
          {
            "text": "Clone chỉ tải về đúng một tệp tin duy nhất",
            "correct": false
          },
          {
            "text": "Download ZIP giữ lại được toàn bộ các nhánh còn clone thì không",
            "correct": false
          },
          {
            "text": "Download ZIP tự động tạo commit mới trên máy tính",
            "correct": false
          }
        ],
        "explanation": "Download ZIP chỉ chứa mã nguồn phẳng tại thời điểm hiện tại, hoàn toàn không có lịch sử Git hay liên kết remote."
      },
      {
        "id": "q2",
        "question": "Lệnh nào sau đây cho phép bạn clone dự án về nhưng đặt tên thư mục trên máy tính là `my-custom-app`?",
        "type": "single",
        "options": [
          {
            "text": "git clone https://github.com/org/app.git my-custom-app",
            "correct": true
          },
          {
            "text": "git clone https://github.com/org/app.git --rename-to my-custom-app",
            "correct": false
          },
          {
            "text": "git clone --name my-custom-app https://github.com/org/app.git",
            "correct": false
          },
          {
            "text": "git clone -dir my-custom-app https://github.com/org/app.git",
            "correct": false
          }
        ],
        "explanation": "Đối số thứ hai phía sau URL trong lệnh `git clone <url> <dir>` chính là tên thư mục đích."
      },
      {
        "id": "q3",
        "question": "Tùy chọn `--depth 1` trong câu lệnh `git clone` mang lại lợi ích lớn nhất nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ tải về duy nhất một snapshot commit mới nhất, giúp tốc độ tải cực nhanh và tiết kiệm dung lượng ổ cứng",
            "correct": true
          },
          {
            "text": "Tự động kiểm tra lỗi bảo mật của toàn bộ mã nguồn",
            "correct": false
          },
          {
            "text": "Tự động nâng cấp phiên bản ngôn ngữ lập trình của dự án",
            "correct": false
          },
          {
            "text": "Xóa bỏ tất cả các bài kiểm tra tự động trong kho",
            "correct": false
          }
        ],
        "explanation": "Shallow clone với `--depth 1` chỉ lấy commit đỉnh, cực kỳ hữu dụng trong CI/CD pipeline để tăng tốc build."
      },
      {
        "id": "q4",
        "question": "Sau khi chạy lệnh `git clone` thành công, thao tác đầu tiên bạn cần làm trong terminal để bắt đầu làm việc là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chuyển thư mục dòng lệnh vào bên trong thư mục dự án vừa được tạo ra bằng lệnh `cd <tên-thư-mục>`",
            "correct": true
          },
          {
            "text": "Khởi tạo lại bằng lệnh git init một lần nữa",
            "correct": false
          },
          {
            "text": "Chạy lệnh git delete để làm sạch màn hình",
            "correct": false
          },
          {
            "text": "Rút dây mạng Internet ra khỏi máy tính",
            "correct": false
          }
        ],
        "explanation": "Git clone tạo ra một thư mục con; bạn phải dùng lệnh `cd` đi vào bên trong thư mục đó mới dùng được các lệnh Git."
      },
      {
        "id": "q5",
        "question": "Nếu muốn clone và checkout ngay vào một nhánh cụ thể (ví dụ nhánh `develop`), bạn sử dụng cú pháp lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git clone -b develop <url>",
            "correct": true
          },
          {
            "text": "git clone --only develop <url>",
            "correct": false
          },
          {
            "text": "git clone --checkout-branch develop <url>",
            "correct": false
          },
          {
            "text": "git clone <url> > develop",
            "correct": false
          }
        ],
        "explanation": "Tùy chọn `-b <tên-nhánh>` (hoặc `--branch <tên-nhánh>`) cho phép Git clone về và tự động trỏ HEAD tới nhánh được chỉ định."
      }
    ]
  }
};
export default lesson;
