import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-git-remote",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "02-git-remote",
    "title": "Quản lý remote với git remote",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-local-vs-remote"
    ],
    "objectives": [
      "Sử dụng thành thạo câu lệnh `git remote` để quản trị danh sách các kho lưu trữ từ xa.",
      "Biết cách liên kết một kho cục bộ vừa tạo với kho từ xa trên GitHub bằng `git remote add`.",
      "Đổi tên và thay đổi đường dẫn URL của remote an toàn khi dự án đổi tên miền hoặc tổ chức.",
      "Xóa bỏ các liên kết remote không còn sử dụng bằng lệnh `git remote remove`."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "upstream-setup"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git remote",
      "remote add",
      "remote remove",
      "remote set-url",
      "origin",
      "lien ket kho"
    ],
    "commands": [
      "git remote",
      "git remote -v",
      "git remote add <tên-bí-danh> <url>",
      "git remote rename <tên-cũ> <tên-mới>",
      "git remote set-url <tên-bí-danh> <url-mới>",
      "git remote remove <tên-bí-danh>"
    ]
  },
  "content": "# Quản lý remote với git remote\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git remote` để quản trị danh sách các kho lưu trữ từ xa.\n- Biết cách liên kết một kho cục bộ vừa tạo với kho từ xa trên GitHub bằng `git remote add`.\n- Đổi tên và thay đổi đường dẫn URL của remote an toàn khi dự án đổi tên miền hoặc tổ chức.\n- Xóa bỏ các liên kết remote không còn sử dụng bằng lệnh `git remote remove`.\n\n---\n\n## 📖 Định nghĩa\n> `git remote` là câu lệnh quản trị chuyên trách dùng để xem, thiết lập, chỉnh sửa và quản lý các kết nối tham chiếu giữa kho lưu trữ cục bộ trên máy tính của bạn với các kho lưu trữ từ xa trên mạng. Thay vì phải gõ toàn bộ chuỗi URL mạng dài dòng và phức tạp (như `https://github.com/company/project.git`) mỗi khi gửi nhận code, Git cho phép bạn đặt một tên định danh ngắn gọn tiện lợi (bí danh - alias) cho URL đó, tiêu biểu nhất là tên quy ước `origin`.\n\n---\n\n## 🤔 Tại sao cần?\nKhi bạn khởi tạo một dự án mới hoàn toàn trên máy tính cá nhân bằng `git init`, kho chứa của bạn hoàn toàn cô lập và chưa hề biết máy chủ GitHub nằm ở đâu. Lệnh `git remote` chính là nhịp cầu đầu tiên giúp bạn khai báo địa chỉ của GitHub cho Git hiểu. Nắm vững lệnh này cũng giúp bạn dễ dàng chuyển đổi giữa các giao thức HTTPS và SSH, hoặc liên kết cùng lúc với nhiều remote khác nhau (như upstream của cộng đồng mã nguồn mở).\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git remote` giống như ứng dụng Danh bạ điện thoại trên chiếc smartphone của bạn. Bạn không thể nhớ nổi dãy số điện thoại quốc tế dài dằng dặc của từng người bạn (chuỗi URL repo). Vì vậy, bạn lưu số đó lại và đặt một cái tên danh bạ ngắn gọn, dễ nhớ như \"origin\" hay \"upstream\". Mỗi khi bạn muốn gọi điện hay gửi tin nhắn (push/pull), bạn chỉ cần chọn tên \"origin\" là điện thoại tự động kết nối chính xác tới địa chỉ đích.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế đặt bí danh của git remote:\nBí danh (Alias):         URL thực tế trên máy chủ:\norigin       ──► https://github.com/my-org/my-app.git\nupstream     ──► https://github.com/original-author/my-app.git\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên Thành vừa khởi tạo một dự án mới trên máy tính và muốn tải mã nguồn lên kho chứa mới tạo trên GitHub. Thành mở terminal và thực hiện lệnh: `git remote add origin https://github.com/thanh-dev/ecommerce-api.git`. Sau đó, Thành gõ `git remote -v` để kiểm tra lại cấu hình mạng. Màn hình console in ra hai dòng xác nhận origin đã trỏ tới URL GitHub cho cả hai chiều fetch và push. Từ thời điểm này, Thành có thể thoải mái đẩy code lên mạng bằng câu lệnh ngắn gọn `git push -u origin main` mà không cần phải gõ lại chuỗi URL phức tạp mỗi ngày. Việc này giúp Thành tiết kiệm thời gian và hoàn toàn tránh khỏi nguy cơ gõ sai đường dẫn dự án.\n\n---\n\n## 💻 Command\n```bash\ngit remote\ngit remote -v\ngit remote add <tên-bí-danh> <url>\ngit remote rename <tên-cũ> <tên-mới>\ngit remote set-url <tên-bí-danh> <url-mới>\ngit remote remove <tên-bí-danh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote`: Liệt kê các tên bí danh của remote hiện có (ví dụ: origin).\n- `git remote -v`: Hiển thị tên bí danh kèm theo địa chỉ URL chi tiết cho hai thao tác fetch và push.\n- `git remote add <tên> <url>`: Tạo một liên kết remote mới trỏ tới địa chỉ kho trên server.\n- `git remote rename <cũ> <mới>`: Đổi tên định danh remote trong cấu hình dự án.\n- `git remote set-url <tên> <url-mới>`: Cập nhật địa chỉ URL mới khi dự án thay đổi đường dẫn hoặc đổi từ HTTPS sang SSH.\n- `git remote remove <tên>`: Xóa bỏ liên kết remote khỏi kho lưu trữ cục bộ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gõ sai chính tả URL kho chứa**:  Khiến lệnh push hoặc fetch sau đó bị lỗi 404 Not Found hoặc Authentication Failed.\n2. **Thêm remote trùng tên origin hai lần**:  Git sẽ báo lỗi `fatal\n3. **Nghĩ rằng git remote remove sẽ xóa kho chứa trên GitHub**:  Lệnh này chỉ xóa liên kết cấu hình trên máy tính cá nhân của bạn.\n\n---\n\n## 🧪 Lab\n1. Xem danh sách remote hiện hữu bằng `git remote -v`.\n2. Thêm một liên kết remote thử nghiệm có tên `backup` bằng `git remote add backup https://github.com/user/backup.git`.\n3. Kiểm tra lại bằng `git remote -v` để thấy cả hai liên kết.\n4. Xóa liên kết thử nghiệm vừa tạo bằng `git remote remove backup`.\n\n---\n\n## 💡 Hint\n> Nếu muốn đổi địa chỉ URL của origin, hãy dùng `git remote set-url origin <url-mới>`.\n\n---\n\n## ✅ Validation\n- Cấu hình và kiểm tra thành công danh sách remote với `git remote -v`.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh quản lý git remote.\n\n---\n\n## 🔥 Challenge\nGiải thích sự khác biệt giữa URL giao thức HTTPS và URL giao thức SSH khi cấu hình git remote.\n\n---\n\n## 📚 Tổng kết\n- `git remote` quản lý các bí danh liên kết tới kho lưu trữ từ xa trên mạng.\n- Sử dụng `git remote add origin <url>` để kết nối kho cá nhân với GitHub.\n- Dùng `set-url` để sửa địa chỉ và `remove` để gỡ bỏ liên kết an toàn.\n",
  "quiz": {
    "id": "quiz-04-02-git-remote",
    "title": "Trắc nghiệm: Quản lý remote với git remote",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh nào sau đây dùng để liên kết kho lưu trữ cục bộ với một kho trên GitHub có tên bí danh là `origin`?",
        "type": "single",
        "options": [
          {
            "text": "git remote add origin https://github.com/user/repo.git",
            "correct": true
          },
          {
            "text": "git connect github https://github.com/user/repo.git",
            "correct": false
          },
          {
            "text": "git link cloud origin https://github.com/user/repo.git",
            "correct": false
          },
          {
            "text": "git push --set-remote https://github.com/user/repo.git",
            "correct": false
          }
        ],
        "explanation": "`git remote add <tên> <url>` là cú pháp chuẩn để thiết lập liên kết với kho từ xa."
      },
      {
        "id": "q2",
        "question": "Cờ tùy chọn `-v` trong câu lệnh `git remote -v` có ý nghĩa là gì?",
        "type": "single",
        "options": [
          {
            "text": "Verbose: Hiển thị chi tiết địa chỉ URL đầy đủ cho cả hai chiều fetch và push",
            "correct": true
          },
          {
            "text": "Verify: Tự động kiểm tra mật khẩu tài khoản người dùng",
            "correct": false
          },
          {
            "text": "Version: Hiển thị phiên bản phần mềm Git đang cài trên máy tính",
            "correct": false
          },
          {
            "text": "Virtual: Tạo một kho lưu trữ ảo trong bộ nhớ RAM",
            "correct": false
          }
        ],
        "explanation": "`-v` (verbose) yêu cầu Git in ra đầy đủ chi tiết đường dẫn URL của từng remote."
      },
      {
        "id": "q3",
        "question": "Nếu công ty của bạn chuyển đổi tên miền máy chủ và bạn cần cập nhật URL mới cho `origin`, bạn dùng lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git remote set-url origin <url-mới>",
            "correct": true
          },
          {
            "text": "git remote update-domain origin <url-mới>",
            "correct": false
          },
          {
            "text": "git change origin <url-mới>",
            "correct": false
          },
          {
            "text": "git url reset origin <url-mới>",
            "correct": false
          }
        ],
        "explanation": "`git remote set-url <tên> <url-mới>` thay đổi trực tiếp URL đích mà không cần xóa đi tạo lại."
      },
      {
        "id": "q4",
        "question": "Điều gì thực sự xảy ra khi bạn chạy lệnh `git remote remove origin` trên máy tính cá nhân?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ có dòng cấu hình liên kết origin bị xóa khỏi tệp .git/config cục bộ, kho trên GitHub vẫn an toàn 100%",
            "correct": true
          },
          {
            "text": "Toàn bộ kho chứa của công ty trên GitHub sẽ bị xóa vĩnh viễn",
            "correct": false
          },
          {
            "text": "Mã nguồn trong Working Directory bị biến mất hoàn toàn",
            "correct": false
          },
          {
            "text": "Tài khoản GitHub của bạn bị khóa vĩnh viễn",
            "correct": false
          }
        ],
        "explanation": "Lệnh này chỉ gỡ bỏ cấu hình định danh cục bộ, hoàn toàn không tác động đến dữ liệu trên máy chủ remote."
      },
      {
        "id": "q5",
        "question": "Thông tin cấu hình của các remote được Git lưu trữ nội bộ tại tệp tin nào trong dự án?",
        "type": "single",
        "options": [
          {
            "text": ".git/config",
            "correct": true
          },
          {
            "text": ".git/remotes.json",
            "correct": false
          },
          {
            "text": "package.json",
            "correct": false
          },
          {
            "text": "README.md",
            "correct": false
          }
        ],
        "explanation": "Các khối cấu hình `[remote \"origin\"]` được ghi trực tiếp vào tệp văn bản cấu hình `.git/config`."
      },
      {
        "id": "q6",
        "question": "Một kho lưu trữ Git cục bộ có thể liên kết tới bao nhiêu kho từ xa (remotes) cùng lúc?",
        "type": "single",
        "options": [
          {
            "text": "Không giới hạn, bạn có thể thêm nhiều remote khác nhau như origin, upstream, backup",
            "correct": true
          },
          {
            "text": "Duy nhất chỉ một remote mà thôi",
            "correct": false
          },
          {
            "text": "Tối đa hai remote cho hai lập trình viên",
            "correct": false
          },
          {
            "text": "Tối đa mười remote",
            "correct": false
          }
        ],
        "explanation": "Git hỗ trợ liên kết với bao nhiêu remote tùy ý, cực kỳ phổ biến trong mô hình fork/upstream."
      }
    ]
  }
};
export default lesson;
