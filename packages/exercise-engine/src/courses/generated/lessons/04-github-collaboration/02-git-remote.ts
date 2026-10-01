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
  "content": "# Quản lý remote với git remote\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git remote` để quản trị danh sách các kho lưu trữ từ xa.\n- Biết cách liên kết một kho cục bộ vừa tạo với kho từ xa trên GitHub bằng `git remote add`.\n- Đổi tên và thay đổi đường dẫn URL của remote an toàn khi dự án đổi tên miền hoặc tổ chức.\n- Xóa bỏ các liên kết remote không còn sử dụng bằng lệnh `git remote remove`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git remote\n- **Nói dễ hiểu**: Lệnh quản lý danh bạ các kho lưu trữ từ xa mà máy bạn được kết nối tới.\n- **Ví dụ**: Gõ `git remote -v` để xem danh sách máy chủ kèm URL tải về và đẩy lên.\n- **Đừng nhầm**: Không tải code về máy ngay lập tức; lệnh này chỉ xem hoặc chỉnh sửa danh bạ liên kết.\n\n### git remote add\n- **Nói dễ hiểu**: Thêm một địa chỉ kho từ xa mới vào danh bạ và gán cho nó một bí danh ngắn gọn.\n- **Ví dụ**: `git remote add origin https://github.com/alice/project.git`.\n- **Đừng nhầm**: Không đẩy commit lên mạng ngay; lệnh chỉ ghi thông tin địa chỉ vào cấu hình `.git/config`.\n\n### git remote set-url\n- **Nói dễ hiểu**: Cập nhật lại đường link URL cho một bí danh remote đã có sẵn trong danh bạ.\n- **Ví dụ**: `git remote set-url origin https://github.com/new-org/project.git` khi công ty đổi tổ chức.\n- **Đừng nhầm**: Không xóa lịch sử commit hay tạo remote mới; lệnh chỉ thay thế địa chỉ URL đích.\n\n---\n\n## 📖 Định nghĩa\n`git remote` là công cụ quản lý các kết nối tham chiếu giữa kho lưu trữ cục bộ với các máy chủ từ xa. Lệnh giúp bạn gắn bí danh ngắn gọn như `origin` cho chuỗi URL dài, hỗ trợ kiểm tra và cập nhật địa chỉ liên kết nhanh chóng.\n\n---\n\n## 💡 Tại sao cần\nKhi tạo kho bằng `git init`, máy tính hoàn toàn cô lập và chưa biết máy chủ từ xa ở đâu. Lệnh `git remote` thiết lập cầu nối liên lạc, cho phép chuyển đổi giữa HTTPS và SSH hoặc kết nối cùng lúc với nhiều remote như origin và upstream.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung `git remote` như ứng dụng danh bạ điện thoại trên máy bạn. Thay vì phải nhớ chuỗi URL máy chủ dài dòng mỗi khi gửi hay nhận code, bạn lưu địa chỉ vào danh bạ với tên gọi ngắn gọn như `origin` để gọi nhanh mỗi ngày.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế đặt bí danh của git remote:\nBí danh (Alias):         URL thực tế trên máy chủ:\norigin       ──► https://github.com/my-org/my-app.git\nupstream     ──► https://github.com/original-author/my-app.git\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nLập trình viên Thành tạo xong dự án API trên máy cá nhân và tạo một repository mới trên GitHub. Thành chạy `git remote add origin https://github.com/thanh-dev/ecommerce-api.git`, sau đó gõ `git remote -v` để kiểm tra. Terminal hiển thị rõ hai dòng fetch và push trỏ về GitHub, giúp Thành tự tin đẩy mã nguồn mà không lo gõ sai URL.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit remote\ngit remote -v\ngit remote add <tên-bí-danh> <url>\ngit remote rename <tên-cũ> <tên-mới>\ngit remote set-url <tên-bí-danh> <url-mới>\ngit remote remove <tên-bí-danh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote`: Liệt kê các tên bí danh của remote hiện có trong kho.\n- `git remote -v`: Hiển thị chi tiết từng bí danh kèm địa chỉ URL cho hai chiều fetch và push.\n- `git remote add <tên> <url>`: Khai báo thêm một liên kết máy chủ từ xa mới.\n- `git remote rename <cũ> <mới>`: Đổi tên bí danh trong file cấu hình cục bộ.\n- `git remote set-url <tên> <url-mới>`: Cập nhật URL mới khi dự án đổi địa chỉ hoặc chuyển giao thức.\n- `git remote remove <tên>`: Gỡ bỏ cấu hình liên kết remote khỏi máy tính cá nhân.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Gõ sai chính tả URL kho chứa**: Khiến các thao tác push hoặc fetch sau đó bị lỗi 404 Not Found hoặc thất bại xác thực.\n2. **Thêm trùng tên origin đã tồn tại**: Git sẽ báo lỗi `fatal: remote origin already exists`, cần dùng `set-url` để sửa thay vì `add`.\n3. **Hiểu nhầm git remote remove xóa kho trên GitHub**: Lệnh chỉ xóa dòng cấu hình trong file `.git/config` tại máy cá nhân, máy chủ vẫn an toàn.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành quản lý remote trên terminal và đối chiếu kết quả.\n1. Kiểm tra danh sách remote hiện tại bằng `git remote -v`.\n2. Thêm một liên kết remote thử nghiệm tên `backup` bằng `git remote add backup https://github.com/user/backup.git`.\n3. Chạy lại `git remote -v` để xác nhận cả origin và backup đều xuất hiện.\n4. Gỡ bỏ remote thử nghiệm bằng `git remote remove backup`.\n\n---\n\n## 💡 Hint & mẹo\n> Khi cần chuyển đổi từ giao thức HTTPS sang SSH để không phải nhập mật khẩu, chỉ cần dùng `git remote set-url origin git@github.com:user/repo.git`.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git remote -v` in ra đúng địa chỉ URL cho cả fetch và push.\n- Không gặp lỗi trùng tên khi thiết lập liên kết remote.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố kiến thức về quản lý remote trong Git.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu file cấu hình `.git/config` bằng lệnh `cat .git/config` để xem cách Git lưu trữ các mục `[remote \"origin\"]` bên dưới hệ thống.\n\n---\n\n## 📝 Tổng kết\n- `git remote` quản lý danh bạ các đường dẫn tới máy chủ từ xa của dự án.\n- Sử dụng `git remote add origin <url>` để kết nối kho cá nhân với máy chủ từ xa.\n- Dùng `git remote set-url` để đổi URL và `git remote remove` để xóa liên kết an toàn.\n",
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
