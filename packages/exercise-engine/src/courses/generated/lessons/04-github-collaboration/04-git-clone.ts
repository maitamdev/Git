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
      "Sử dụng câu lệnh `git clone` để tải toàn bộ một dự án từ GitHub về máy tính cá nhân.",
      "Hiểu rõ các hành động ngầm mà Git tự động thực hiện trong quá trình clone: khởi tạo, liên kết remote, fetch dữ liệu và checkout nhánh mặc định.",
      "Tùy chỉnh tên thư mục đích khi clone dự án về ổ đĩa.",
      "Sử dụng cờ `--depth 1` (shallow clone) để tải nhanh các dự án có kích thước khổng lồ."
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
  "content": "# Tải dự án về máy với git clone\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng câu lệnh `git clone` để tải toàn bộ một dự án từ GitHub về máy tính cá nhân.\n- Hiểu rõ các hành động ngầm mà Git tự động thực hiện trong quá trình clone: khởi tạo, liên kết remote, fetch dữ liệu và checkout nhánh mặc định.\n- Tùy chỉnh tên thư mục đích khi clone dự án về ổ đĩa.\n- Sử dụng cờ `--depth 1` (shallow clone) để tải nhanh các dự án có kích thước khổng lồ.\n\n---\n\n## 📖 Định nghĩa\n> `git clone` là câu lệnh mạnh mẽ bậc nhất giúp bạn tạo ra một bản sao cục bộ hoàn chỉnh (exact local copy) của một kho lưu trữ từ xa trên máy tính của bạn. Quá trình clone không chỉ tải về các tệp tin mã nguồn hiện tại, mà còn sao chép toàn bộ cơ sở dữ liệu lịch sử commit, tất cả các nhánh, các thẻ tag và cấu hình của dự án, đồng thời tự động thiết lập liên kết remote `origin` trỏ về kho máy chủ ban đầu.\n\n---\n\n## 🤔 Tại sao cần?\nKhi bạn gia nhập một công ty mới, tham gia vào một dự án mã nguồn mở hoặc chuyển sang làm việc trên một chiếc máy tính cá nhân mới, `git clone` luôn là câu lệnh đầu tiên bạn phải gõ. Nắm vững cơ chế hoạt động của clone giúp bạn bắt đầu công việc nhanh chóng, tự tin tải các dự án mẫu về học tập và biết cách tối ưu thời gian tải dữ liệu đối với những kho chứa có dung lượng lớn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc clone một kho lưu trữ giống như bạn bước vào một thư viện quốc gia lớn, tìm thấy một cuốn bách khoa toàn thư quý hiếm dày 1000 trang, và đưa toàn bộ cuốn sách qua một chiếc máy photocopy 3D siêu tốc. Bạn mang về nhà một cuốn sách mới tinh giống hệt 100% bản gốc từ trang bìa, nội dung đến từng trang nhật ký chỉnh sửa của tác giả, kèm theo một sợi dây liên lạc trực tiếp tới thư viện.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình tự động bên trong lệnh git clone:\ngit clone https://github.com/user/project.git\n                      │\n   ┌──────────────────┼──────────────────┐\n   ▼                  ▼                  ▼\n[1. git init]  [2. remote add origin] [3. git fetch]\n   │\n   ▼\n[4. git checkout main (tạo Working Tree hoàn chỉnh)]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNgày đầu tiên đi làm tại công ty công nghệ, kỹ sư Minh nhận được đường dẫn kho mã nguồn của dự án ứng dụng di động: `https://github.com/company/mobile-app.git`. Minh mở terminal trên máy tính mới và gõ lệnh: `git clone https://github.com/company/mobile-app.git`. Git tự động tạo thư mục mobile-app, tải về toàn bộ lịch sử 500 commit từ trước tới nay, liên kết sẵn remote origin và đưa mã nguồn ra màn hình. Minh chỉ việc mở thư mục bằng VS Code và bắt đầu làm việc ngay lập tức mà không cần bất kỳ thao tác cấu hình thủ công phức tạp nào khác.\n\n---\n\n## 💻 Command\n```bash\ngit clone <url-kho-chứa>\ngit clone <url-kho-chứa> <tên-thư-mục-mới>\ngit clone --depth 1 <url-kho-chứa>\ngit clone --branch <tên-nhánh> <url-kho-chứa>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git clone <url>`: Sao chép toàn bộ kho từ xa về thư mục mang tên mặc định của dự án.\n- `git clone <url> <tên-thư-mục>`: Tải dự án về và đặt tên thư mục theo ý muốn cá nhân.\n- `git clone --depth 1 <url>`: Shallow clone: Chỉ tải commit mới nhất, giảm tối đa dung lượng tải về khi chỉ muốn đọc code.\n- `git clone --branch <nhánh> <url>`: Tải về và tự động checkout sẵn ngay vào nhánh chỉ định thay vì nhánh mặc định.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Clone một kho chứa Git vào bên trong một kho chứa Git khác đang tồn tại**:  Tạo ra cấu trúc lồng nhau lỗi (nested repository).\n2. **Quên kiểm tra quyền truy cập**:  Clone kho riêng tư (private repo) mà chưa đăng nhập tài khoản có quyền đọc sẽ bị báo lỗi Permission denied.\n3. **Tải về dạng file ZIP từ GitHub thay vì dùng git clone**:  Bạn sẽ bị mất hoàn toàn toàn bộ lịch sử commit và không thể git push được.\n\n---\n\n## 🧪 Lab\n1. Thực hiện clone một kho lưu trữ mẫu bằng `git clone https://github.com/git-academy/sample-demo.git`.\n2. Di chuyển vào thư mục vừa clone bằng `cd sample-demo`.\n3. Kiểm tra cấu hình remote tự sinh bằng `git remote -v`.\n4. Kiểm tra lịch sử commit đã tải về trọn vẹn bằng `git log --oneline`.\n\n---\n\n## 💡 Hint\n> Tuyệt đối không chạy lệnh `git clone` khi bạn đang đứng bên trong một thư mục đã có file `.git`.\n\n---\n\n## ✅ Validation\n- Kho lưu trữ được clone hoàn chỉnh về máy tính với remote origin trỏ đúng URL.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git clone.\n\n---\n\n## 🔥 Challenge\nSo sánh sự khác nhau về thời gian và dung lượng đĩa giữa full clone và shallow clone (`--depth 1`).\n\n---\n\n## 📚 Tổng kết\n- `git clone` sao chép toàn bộ mã nguồn, lịch sử commit và các nhánh về máy tính.\n- Tự động thiết lập sẵn remote `origin` trỏ về kho máy chủ ban đầu.\n- Sử dụng `--depth 1` khi muốn tải nhanh mã nguồn mà không cần tải toàn bộ lịch sử quá khứ.\n",
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
      }
    ]
  }
};
export default lesson;
