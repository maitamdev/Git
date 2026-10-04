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
  "content": "# Tải dự án về máy với git clone\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git clone` để tải toàn bộ kho mã nguồn từ GitHub về máy tính cá nhân.\n- Giải mã 4 hành động ngầm Git tự động kích hoạt khi clone: `init`, cấu hình `origin`, `fetch` dữ liệu và `checkout`.\n- Tùy biến thư mục đích và áp dụng kỹ thuật shallow clone (`--depth 1`) để tối ưu hóa thời gian tải dự án khổng lồ.\n- Nhận biết và tuyệt đối tránh sai lầm lồng kho chứa (nested repository) gây hỏng cấu trúc theo dõi.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git clone\n- **Nói dễ hiểu:** Lệnh tạo một bản sao hoàn chỉnh của kho lưu trữ từ xa về máy, bao gồm mã nguồn và toàn bộ cơ sở dữ liệu lịch sử commit.\n- **Ví dụ:** Lệnh `git clone https://github.com/facebook/react.git` sẽ tải toàn bộ mã nguồn và lịch sử của thư viện React về máy tính bạn.\n- **Đừng nhầm:** Khác hoàn toàn việc tải tệp nén ZIP; clone mang về thư mục ẩn `.git` đầy đủ để bạn có thể commit và đồng bộ tiếp với GitHub.\n\n### shallow clone\n- **Nói dễ hiểu:** Kỹ thuật clone nông, chỉ tải về một số lượng commit gần nhất (thường là 1 commit cuối) thay vì toàn bộ lịch sử từ ngày đầu dự án.\n- **Ví dụ:** Lệnh `git clone --depth 1 https://github.com/torvalds/linux.git` giúp tải nhân Linux chỉ mất vài giây thay vì hàng giờ đồng hồ.\n- **Đừng nhầm:** Bản sao nông này bị cắt tỉa lịch sử cũ; bạn không nên dùng nếu cần tra cứu sâu lịch sử bằng `git log` hoặc `git blame`.\n\n### nested repository — kho lồng bên trong kho khác\n- **Nói dễ hiểu:** Tình trạng một thư mục chứa kho Git hoàn chỉnh bị clone nhầm vào bên trong một thư mục dự án Git khác đang hoạt động.\n- **Ví dụ:** Bạn đang đứng trong thư mục `my-project` (đã có `.git`) rồi lại gõ lệnh `git clone` một thư viện khác vào thẳng thư mục con.\n- **Đừng nhầm:** Git sẽ coi thư mục con đó như một tệp con không thể theo dõi nội dung bên trong; nếu muốn kết hợp hai kho, bạn phải dùng Git Submodule.\n\n---\n\n## 📖 Định nghĩa\nCâu lệnh `git clone <url>` thực hiện sao chép toàn bộ một kho lưu trữ từ xa về máy tính cá nhân của bạn, tự động khởi tạo thư mục `.git`, liên kết remote mặc định `origin`, tải về toàn bộ lịch sử commit và chuyển đổi (checkout) nhánh mặc định thành thư mục làm việc sẵn sàng lập trình.\n\n---\n\n## 🤔 Tại sao cần?\nKhi bạn gia nhập một nhóm dự án hoặc muốn đóng góp cho một thư viện mã nguồn mở trên GitHub, `git clone` là cánh cửa đầu tiên bạn phải bước qua. Thay vì tải tệp nén ZIP vụn vặt và mất trắng lịch sử, clone mang về một cỗ máy thời gian Git hoàn chỉnh, giúp bạn lập tức đồng bộ hóa và phát triển tính năng ăn khớp với đồng đội.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git clone` như việc đặt một bản sao công chứng nguyên vẹn của toàn bộ hồ sơ lưu trữ công ty về bàn làm việc của bạn, kèm theo sẵn đường dây nóng kết nối trực tiếp đến trụ sở chính (`origin`). Bạn có trọn vẹn mọi tài liệu từ quá khứ tới hiện tại và sẵn sàng gọi điện cập nhật bất cứ lúc nào.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBỐN BƯỚC TỰ ĐỘNG BÊN DƯỚI NẮP CA-PÔ CỦA LỆNH GIT CLONE:\n\ngit clone https://github.com/org/project.git\n                     │\n    ┌────────────────┼────────────────┐\n    ▼                ▼                ▼\n[1. git init] ──► [2. git remote add origin <url>]\n                     │\n    ┌────────────────┴────────────────┐\n    ▼                                 ▼\n[3. git fetch origin] ───────► [4. git checkout main]\n(Tải toàn bộ commit)          (Tạo thư mục làm việc hoàn chỉnh)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong ngày đầu nhận việc, kỹ sư mới nhận được liên kết dự án `https://github.com/company/paygate-service.git`. Thay vì mất nửa ngày xin gửi mã nguồn qua tin nhắn hay tệp đính kèm, kỹ sư chỉ cần mở terminal gõ một dòng lệnh `git clone https://github.com/company/paygate-service.git`. Chỉ sau 30 giây, toàn bộ 1000 commit và hệ thống mã nguồn đã sẵn sàng khởi chạy trên máy.\n\n---\n\n## 💻 Command\n```bash\ngit clone https://github.com/octocat/Hello-World.git\ngit clone https://github.com/octocat/Hello-World.git my-app\ngit clone --depth 1 https://github.com/octocat/Hello-World.git\ngit clone --branch feature-ui https://github.com/octocat/Hello-World.git\n```\n\n---\n\n## 🔍 Giải thích command\n- `git clone <url>`: Tải toàn bộ kho từ xa về thư mục mang tên mặc định của dự án trên máy tính cá nhân.\n- `git clone <url> <tên-thư-mục>`: Tải dự án về và chủ động đặt tên thư mục cục bộ theo ý muốn lập trình viên.\n- `git clone --depth 1 <url>`: Kỹ thuật shallow clone chỉ lấy 1 commit mới nhất, giảm tối đa dung lượng tải mạng cho hệ thống CI/CD.\n- `git clone --branch <tên-nhánh> <url>`: Tải về và tự động checkout thẳng vào một nhánh cụ thể thay vì nhánh mặc định của kho.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Clone vào bên trong một kho Git đang tồn tại**: Tạo ra lỗi kho lồng nhau (nested repo) khiến Git không thể theo dõi và commit các tệp bên trong thư mục con.\n2. **Tải tệp ZIP từ GitHub về thay vì dùng `git clone`**: Tệp ZIP thiếu toàn bộ thư mục `.git`, khiến bạn mất sạch lịch sử và không thể chạy lệnh `push` hay `pull`.\n3. **Quên kiểm tra quyền truy cập đối với kho Private**: Khi clone kho riêng tư mà chưa đăng nhập tài khoản hoặc cấu hình SSH Key, bạn sẽ bị chặn với lỗi `Permission denied`.\n\n---\n\n## 🧪 Lab\nThực hành trải nghiệm clone kho thực tế trên môi trường terminal cá nhân của bạn:\n1. Mở PowerShell hoặc terminal bên ngoài thư mục dự án khóa học để tránh bị lồng kho chứa.\n2. Tạo một thư mục làm việc tạm: `mkdir git-clone-lab` rồi chuyển vào: `cd git-clone-lab`.\n3. Chạy lệnh clone một kho mã nguồn mở: `git clone https://github.com/octocat/Hello-World.git`.\n4. Di chuyển vào kho vừa tải: `cd Hello-World`.\n5. Kiểm tra kết nối remote: `git remote -v` và xem lịch sử: `git log --oneline -n 3`.\n6. Trở về thư mục cha sau khi quan sát: `cd ..`.\n\n---\n\n## 💡 Hint\n> Luôn chạy lệnh kiểm tra đường dẫn thư mục hiện tại (`pwd` trên Linux/macOS hoặc `Get-Location` trên Windows) trước khi gõ `git clone`. Hãy chắc chắn rằng bạn đang đứng ở một thư mục độc lập chứ không nằm lọt thỏm trong bất kỳ kho Git nào khác!\n\n---\n\n## ✅ Validation\n- Hiểu rõ 4 công đoạn tự động ngầm định diễn ra khi thực thi `git clone`.\n- Phân biệt sự khác nhau mang tính sống còn giữa `git clone` và tải tệp nén ZIP từ GitHub.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt của bạn về cơ chế vận hành của lệnh `git clone`.\n\n---\n\n## 🔥 Challenge\nHãy so sánh sự khác biệt về dung lượng thư mục `.git` và thời gian thực thi khi bạn clone một dự án mã nguồn mở lớn (ví dụ kho chứa React hoặc Node.js) giữa hai chế độ: clone thông thường và shallow clone với cờ `--depth 1`. Vì sao shallow clone lại là tiêu chuẩn vàng trong các hệ thống CI/CD tự động?\n\n---\n\n## 📚 Tổng kết\n- `git clone` sao chép toàn bộ mã nguồn kèm thư mục ẩn `.git` từ xa về máy tính cá nhân.\n- Lệnh tự động thiết lập bí danh remote `origin` và tạo thư mục làm việc của nhánh mặc định.\n- Sử dụng `--depth 1` để tối ưu tốc độ tải và luôn đảm bảo không clone lồng vào kho khác.\n",
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
