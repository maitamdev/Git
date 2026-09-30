import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "10-upstream",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "10-upstream",
    "title": "Cấu hình Upstream cho dự án mã nguồn mở",
    "level": "intermediate",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "09-fork"
    ],
    "objectives": [
      "Hiểu rõ khái niệm và quy ước đặt tên remote `upstream` trong quy trình làm việc với kho fork.",
      "Cấu hình thêm remote `upstream` trỏ về kho gốc của tác giả bằng câu lệnh `git remote add`.",
      "Đồng bộ hóa mã nguồn mới nhất từ kho gốc về máy cá nhân và cập nhật lên kho fork.",
      "Ngăn ngừa tình trạng kho fork bị phân kỳ quá xa so với tiến độ phát triển của dự án chính."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "upstream",
      "sync fork",
      "remote upstream",
      "dong bo kho goc",
      "open source workflow"
    ],
    "commands": [
      "git remote add upstream <url-kho-goc>",
      "git remote -v",
      "git fetch upstream",
      "git merge upstream/main",
      "git push origin main"
    ]
  },
  "content": "# Cấu hình Upstream cho dự án mã nguồn mở\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và quy ước đặt tên remote `upstream` trong quy trình làm việc với kho fork.\n- Cấu hình thêm remote `upstream` trỏ về kho gốc của tác giả bằng câu lệnh `git remote add`.\n- Đồng bộ hóa mã nguồn mới nhất từ kho gốc về máy cá nhân và cập nhật lên kho fork.\n- Ngăn ngừa tình trạng kho fork bị phân kỳ quá xa so với tiến độ phát triển của dự án chính.\n\n---\n\n## 📖 Định nghĩa\n> `upstream` trong ngữ cảnh làm việc với các kho fork là tên bí danh quy ước chuẩn quốc tế được dùng để định danh cho kho lưu trữ từ xa gốc (Original Repository) của tác giả hoặc tổ chức sáng lập dự án. Trong khi `origin` trỏ về bản sao fork trên tài khoản cá nhân của bạn, thì `upstream` trỏ thẳng về nguồn cội ban đầu của mã nguồn, cho phép bạn liên tục theo dõi và kéo các cải tiến mới nhất từ dự án gốc về máy.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các dự án mã nguồn mở năng động, mỗi ngày có thể có hàng chục commit và bản vá lỗi mới được các chuyên gia đưa vào kho gốc. Nếu kho fork của bạn không được cấu hình `upstream` để cập nhật thường xuyên, mã nguồn của bạn sẽ nhanh chóng bị lạc hậu sau vài tuần. Khi bạn muốn đóng góp tính năng mới, Pull Request của bạn sẽ bị xung đột nặng nề và bị từ chối duyệt. Cấu hình upstream là kỹ năng sống còn của mọi kỹ sư mã nguồn mở.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung kho gốc của dự án giống như dòng sông Mẹ thượng nguồn (Upstream) liên tục cuộn trào dòng nước mát lành và phù sa màu mỡ. Kho fork cá nhân của bạn giống như một con kênh nhỏ bạn đào rẽ nhánh từ bờ sông về cánh đồng nhà mình (Origin). Để con kênh không bị khô cạn và ứ đọng rác bẩn, bạn phải mở một cửa cống đón nước (cấu hình remote upstream) để định kỳ dẫn dòng nước mới nhất từ sông Mẹ vào kênh của mình.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMô hình 2 remote: origin và upstream:\n[Kho gốc của tác giả] ◄──────────────────┐ (Định kỳ fetch cập nhật)\n(upstream)                                │\n                                          │\n[Kho fork của bạn] ◄────┐ (git push)      │ (git fetch upstream)\n(origin)                │                 │\n                        │                 │\n[Máy tính của bạn] ─────┴─────────────────┘\n(Local Repository)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau một tháng miệt mài phát triển tính năng mới trên kho fork cá nhân, kỹ sư An chuẩn bị gửi đóng góp mã nguồn cho dự án Vue.js gốc của cộng đồng quốc tế. Để đảm bảo đoạn mã của mình hoàn toàn tương thích và không bị xung đột với phiên bản mới nhất, An cấu hình thêm remote gốc bằng câu lệnh: `git remote add upstream https://github.com/vuejs/core.git`. Sau đó An chạy tiếp `git fetch upstream` và `git merge upstream/main`. Toàn bộ các cải tiến và bản vá lỗi mới nhất của hàng trăm kỹ sư hàng đầu thế giới được tích hợp mượt mà vào máy tính của An. An tự tin đẩy code lên origin và tạo một Pull Request hoàn hảo gửi tới ban quản trị.\n\n---\n\n## 💻 Command\n```bash\ngit remote add upstream <url-kho-goc>\ngit remote -v\ngit fetch upstream\ngit merge upstream/main\ngit push origin main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote add upstream <url>`: Thiết lập liên kết remote upstream trỏ trực tiếp tới kho gốc của dự án.\n- `git remote -v`: Xác nhận cấu hình có đủ 2 remote: origin (kho của bạn) và upstream (kho gốc).\n- `git fetch upstream`: Tải về toàn bộ commit và nhánh mới nhất từ kho gốc.\n- `git merge upstream/main`: Gộp các cập nhật mới nhất của kho gốc vào nhánh main cục bộ trên máy bạn.\n- `git push origin main`: Đẩy các cập nhật vừa gộp lên kho fork cá nhân trên GitHub để đồng bộ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nhầm lẫn giữa origin và upstream**:  Push nhầm vào upstream (sẽ bị lỗi từ chối vì bạn không có quyền ghi vào kho gốc).\n2. **Quên cập nhật upstream trước khi tạo nhánh mới**:  Bắt đầu viết tính năng trên nền tảng code cũ kỹ đã bị lỗi thời.\n3. **Cố tình sửa đổi nhánh main cục bộ**:  Tốt nhất nên giữ main luôn sạch sẽ để chỉ đồng bộ với upstream/main, mọi tính năng đều viết trên branch riêng.\n\n---\n\n## 🧪 Lab\n1. Thêm remote upstream trỏ tới kho mẫu bằng `git remote add upstream https://github.com/git-academy/original-project.git`.\n2. Kiểm tra danh sách bằng `git remote -v` và xác nhận có cả origin và upstream.\n3. Chạy `git fetch upstream` để tải các commit mới nhất từ kho gốc.\n4. Gộp cập nhật vào nhánh main bằng `git merge upstream/main`.\n\n---\n\n## 💡 Hint\n> Nhớ nguyên tắc: Luôn kéo từ `upstream` về, và chỉ đẩy lên `origin` của chính bạn.\n\n---\n\n## ✅ Validation\n- Cấu hình thành công 2 remote origin và upstream và đồng bộ trơn tru.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về cấu hình remote upstream.\n\n---\n\n## 🔥 Challenge\nNêu sự khác biệt giữa việc bấm nút \"Sync fork\" trên giao diện GitHub web và việc gõ lệnh đồng bộ qua remote upstream trong terminal.\n\n---\n\n## 📚 Tổng kết\n- `upstream` là tên quy ước trỏ về kho lưu trữ gốc của tác giả ban đầu.\n- Dùng để định kỳ kéo các bản cập nhật mới nhất về máy tính cá nhân.\n- Giúp kho fork cá nhân luôn bắt kịp tiến độ và tránh xung đột khi tạo PR.\n",
  "quiz": {
    "id": "quiz-04-10-upstream",
    "title": "Trắc nghiệm: Cấu hình Upstream trong Open Source",
    "questions": [
      {
        "id": "q1",
        "question": "Trong quy trình đóng góp mã nguồn mở, bí danh remote `upstream` đại diện cho địa chỉ nào?",
        "type": "single",
        "options": [
          {
            "text": "Kho lưu trữ gốc ban đầu của tác giả hoặc tổ chức sáng lập dự án",
            "correct": true
          },
          {
            "text": "Kho fork trên tài khoản cá nhân của bạn",
            "correct": false
          },
          {
            "text": "Một trang web sao lưu đám mây bí mật",
            "correct": false
          },
          {
            "text": "Máy chủ kiểm thử nội bộ trong nhà riêng của bạn",
            "correct": false
          }
        ],
        "explanation": "`upstream` là quy ước đặt tên cho remote trỏ về kho nguồn cội ban đầu (Original Repo)."
      },
      {
        "id": "q2",
        "question": "Lệnh nào sau đây dùng để thiết lập liên kết remote `upstream` trỏ tới kho gốc của dự án?",
        "type": "single",
        "options": [
          {
            "text": "git remote add upstream https://github.com/original-author/repo.git",
            "correct": true
          },
          {
            "text": "git link upstream https://github.com/original-author/repo.git",
            "correct": false
          },
          {
            "text": "git remote set-parent https://github.com/original-author/repo.git",
            "correct": false
          },
          {
            "text": "git upstream connect https://github.com/original-author/repo.git",
            "correct": false
          }
        ],
        "explanation": "`git remote add <tên> <url>` là cú pháp chuẩn để gắn thêm liên kết remote mới."
      },
      {
        "id": "q3",
        "question": "Quy trình chuẩn 3 bước để đồng bộ mã nguồn mới nhất từ kho gốc về kho fork cá nhân trên GitHub là gì?",
        "type": "single",
        "options": [
          {
            "text": "git fetch upstream -> git merge upstream/main -> git push origin main",
            "correct": true
          },
          {
            "text": "git push upstream main -> git pull origin main -> git status",
            "correct": false
          },
          {
            "text": "git delete fork -> git clone -> git commit",
            "correct": false
          },
          {
            "text": "git reset --hard -> git remote remove -> git clone",
            "correct": false
          }
        ],
        "explanation": "Tải từ gốc (fetch upstream) -> gộp vào máy (merge) -> đẩy lên fork cá nhân (push origin)."
      },
      {
        "id": "q4",
        "question": "Điều gì sẽ xảy ra nếu bạn cố gắng chạy lệnh `git push upstream main` trên một dự án mã nguồn mở lớn?",
        "type": "single",
        "options": [
          {
            "text": "Lệnh sẽ bị từ chối với lỗi Permission denied vì bạn không có quyền ghi trực tiếp vào kho của tác giả",
            "correct": true
          },
          {
            "text": "Mã nguồn của bạn sẽ tự động ghi đè lên toàn bộ hệ thống của tác giả",
            "correct": false
          },
          {
            "text": "GitHub sẽ tự động sa thải tác giả dự án",
            "correct": false
          },
          {
            "text": "Máy tính của bạn sẽ bị mất bản quyền Git",
            "correct": false
          }
        ],
        "explanation": "Bạn chỉ có quyền đọc (clone/fetch) kho gốc; quyền ghi chỉ dành cho maintainers của dự án."
      }
    ]
  }
};
export default lesson;
