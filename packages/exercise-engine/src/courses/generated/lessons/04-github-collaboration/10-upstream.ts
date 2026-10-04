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
      "Hiểu cách nhóm thường dùng remote `upstream` trong quy trình fork.",
      "Cấu hình thêm remote `upstream` trỏ về kho gốc của tác giả bằng câu lệnh `git remote add`.",
      "Fetch cập nhật từ kho gốc và tích hợp theo quy trình của repository.",
      "Xác nhận URL và quyền trước khi push lên fork."
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
  "content": "# Cấu hình Upstream cho dự án mã nguồn mở\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu thấu đáo khái niệm và quy ước đặt tên remote `upstream` trong quy trình làm việc với kho fork.\n- Thành thạo thao tác liên kết remote `upstream` trỏ về kho gốc của tác giả bằng lệnh `git remote add`.\n- Làm chủ quy trình đồng bộ hóa hai chiều: kéo cập nhật từ upstream về máy cá nhân và đẩy lên kho fork (`origin`).\n- Ngăn chặn hoàn toàn tình trạng kho cá nhân bị phân kỳ và lệch nhịp so với tiến độ chung của cộng đồng.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### upstream — kho thượng nguồn\n- **Nói dễ hiểu:** Tên bí danh quy ước chuẩn trỏ về kho lưu trữ gốc ban đầu của tác giả hoặc tổ chức sáng lập dự án.\n- **Ví dụ:** Lệnh `git remote add upstream https://github.com/vuejs/core.git` kết nối trực tiếp kho máy bạn tới kho gốc Vue.\n- **Đừng nhầm:** Khác với `origin` trỏ vào kho fork cá nhân của bạn; bạn chỉ có quyền đọc (`fetch`) từ upstream mà không có quyền ghi.\n\n### sync fork — đồng bộ kho fork\n- **Nói dễ hiểu:** Quy trình kéo các commit mới nhất từ kho gốc về máy cá nhân rồi đẩy lên kho fork trên GitHub để bắt kịp tiến độ.\n- **Ví dụ:** Tải commit mới từ upstream, gộp vào nhánh `main` trên máy tính rồi chạy `git push origin main`.\n- **Đừng nhầm:** Quá trình này không làm mất các nhánh tính năng riêng của bạn nếu bạn tuân thủ nguyên tắc tách nhánh độc lập.\n\n### two-remote model — mô hình hai máy chủ\n- **Nói dễ hiểu:** Mô hình làm việc chuyên nghiệp kết nối song song 2 remote: `origin` để đẩy code cá nhân và `upstream` để nhận bản vá từ kho gốc.\n- **Ví dụ:** Khi gõ `git remote -v`, terminal hiển thị đầy đủ cả hai địa chỉ URL riêng biệt cho origin và upstream.\n- **Đừng nhầm:** `upstream` không phải từ khóa hệ thống bắt buộc; đây là chuẩn mực đặt tên được cả cộng đồng công nghệ thế giới thống nhất.\n\n---\n\n## 📖 Định nghĩa\nTrong mô hình đóng góp mã nguồn mở, `upstream` là tên bí danh quy ước chuẩn mực trỏ thẳng về kho lưu trữ gốc của tác giả ban đầu, cho phép bạn định kỳ tải về các commit mới nhất (`fetch`) để đồng bộ hóa kho fork cá nhân và giữ cho lịch sử phát triển luôn bắt kịp tiến độ của dự án chính.\n\n---\n\n## 🤔 Tại sao cần?\nSau khi bạn tạo bản sao fork, kho gốc của dự án vẫn không ngừng phát triển với hàng chục commit mới mỗi ngày từ các kỹ sư trên khắp thế giới. Nếu không thiết lập remote `upstream` để liên tục kéo các cải tiến mới về máy, nhánh làm việc của bạn sẽ nhanh chóng bị lỗi thời, dẫn đến xung đột mã nguồn nghiêm trọng khi bạn gửi đóng góp trở lại qua Pull Request.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung kho gốc của dự án như dòng sông Mẹ cuồn cuộn ở thượng nguồn (Upstream). Kho fork cá nhân của bạn là con kênh nhỏ dẫn nước về phục vụ cánh đồng riêng (Origin). Để con kênh không bao giờ bị khô cạn hay tù đọng, bạn cần xây dựng một cửa cống kiên cố (cấu hình remote upstream) để định kỳ dẫn dòng nước mát lành mới nhất từ sông Mẹ vào kênh của mình.\n\n---\n\n## 🖼 Sơ đồ\n```text\nMÔ HÌNH HAI MÁY CHỦ SONG SONG (TWO-REMOTE MODEL):\n\n[Kho gốc của tác giả] ◄──────────────────┐ (Định kỳ fetch cập nhật)\n(upstream)                                │\n                                          │\n[Kho fork cá nhân] ◄────┐ (git push)      │ (git fetch upstream)\n(origin)                │                 │\n                        │                 │\n[Máy tính của bạn] ─────┴─────────────────┘\n(Local Repository)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nĐể chuẩn bị đóng góp tính năng mới cho thư viện UI mã nguồn mở, bạn cấu hình kết nối tới kho gốc: `git remote add upstream https://github.com/organization/core-ui.git`. Mỗi sáng trước khi bắt tay vào code, bạn chỉ cần chạy `git fetch upstream` rồi gộp vào nhánh chính bằng `git merge upstream/main`. Kho làm việc trên máy bạn lập tức sở hữu các bản sửa lỗi mới nhất của cộng đồng quốc tế.\n\n---\n\n## 💻 Command\n```bash\ngit remote add upstream https://github.com/org/project.git\ngit remote -v\ngit fetch upstream\ngit merge upstream/main\ngit push origin main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote add upstream <url>`: Thiết lập thêm liên kết máy chủ từ xa mang tên quy ước `upstream` trỏ về kho gốc.\n- `git remote -v`: Kiểm tra danh sách xác nhận kho hiện tại đang sở hữu song song cả hai remote origin và upstream.\n- `git fetch upstream`: Nạp toàn bộ dữ liệu lịch sử và các nhánh mới nhất từ kho gốc về cơ sở dữ liệu ngầm.\n- `git merge upstream/main`: Gộp các commit mới từ nhánh theo dõi `upstream/main` vào nhánh chính trên máy tính bạn.\n- `git push origin main`: Đẩy các commit vừa đồng bộ lên kho fork cá nhân trên GitHub để hoàn tất chu trình.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố tình push trực tiếp vào `upstream`**: Bị máy chủ từ chối thẳng thừng vì bạn không có quyền ghi vào kho của tác giả ban đầu.\n2. **Quên đồng bộ kho gốc trước khi tạo nhánh tính năng mới**: Bắt đầu viết code trên nền tảng phiên bản cũ khiến Pull Request bị xung đột nặng.\n3. **Lập trình trực tiếp trên nhánh `main` của kho fork**: Khiến nhánh chính bị ô nhiễm commit riêng, gây khó khăn cho việc đồng bộ upstream về sau.\n\n---\n\n## 🧪 Lab\n1. Chạy lệnh: `git remote -v` để kiểm tra các máy chủ hiện tại đang kết nối với kho của bạn.\n2. Thiết lập remote upstream trỏ về kho gốc bằng lệnh: `git remote add upstream https://github.com/org/project.git`.\n3. Chạy lại `git remote -v` để đảm bảo hệ thống đã ghi nhận đầy đủ hai cặp remote origin và upstream.\n4. Nạp các cập nhật từ thượng nguồn bằng câu lệnh: `git fetch upstream`.\n\n---\n\n## 💡 Hint\n> Quy tắc vàng cho lập trình viên mã nguồn mở: Giữ cho nhánh `main` trên máy bạn hoàn toàn trong sạch, chỉ dùng để đồng bộ với `upstream/main`. Bất cứ tính năng hay bản sửa lỗi nào cũng phải được phát triển trên một nhánh riêng biệt!\n\n---\n\n## ✅ Validation\n- Cấu hình thành công remote `upstream` trong tệp cấu hình dự án cục bộ.\n- Hiểu rõ luồng di chuyển của dữ liệu: từ `upstream` về máy cục bộ, sau đó mới đẩy lên `origin`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về mô hình hai remote và cách thức đồng bộ upstream trong Git.\n\n---\n\n## 🔥 Challenge\nHãy so sánh hai phương thức cập nhật nhánh tính năng từ upstream: `git merge upstream/main` và `git rebase upstream/main`. Phương thức nào giúp tạo ra một lịch sử đóng góp thẳng tắp, sạch đẹp và được các dự án mã nguồn mở hàng đầu thế giới khuyến khích sử dụng?\n\n---\n\n## 📚 Tổng kết\n- `upstream` là tên bí danh quy ước trỏ về kho lưu trữ gốc của tác giả ban đầu.\n- Dùng để liên tục kéo các bản cập nhật mới nhất về máy tính thông qua `git fetch upstream`.\n- Giúp kho cá nhân luôn bắt nhịp với cộng đồng và loại bỏ nguy cơ xung đột mã nguồn.\n",
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
        "question": "Trong mô hình fork phổ biến, nếu nhánh đích tên `main` và nhóm đồng bộ bằng merge, trình tự nào phù hợp?",
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
        "question": "Nếu bạn không có quyền ghi vào remote `upstream`, điều gì thường xảy ra khi push tới đó?",
        "type": "single",
        "options": [
          {
            "text": "Máy chủ từ chối cập nhật nhánh vì tài khoản của bạn không được cấp quyền ghi",
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
        "explanation": "Push yêu cầu quyền ghi; người đóng góp thường chỉ có quyền đọc kho gốc và push lên fork của mình."
      },
      {
        "id": "q5",
        "question": "Sự khác biệt then chốt về vai trò giữa hai remote `origin` và `upstream` trong Forking Workflow là gì?",
        "type": "single",
        "options": [
          {
            "text": "Trong quy trình thường gặp, origin trỏ tới fork của bạn và upstream trỏ tới kho gốc; quyền thực tế phụ thuộc tài khoản",
            "correct": true
          },
          {
            "text": "origin chỉ dùng cho máy Mac, còn upstream chỉ dùng cho máy Windows",
            "correct": false
          },
          {
            "text": "origin chỉ tải về commit mới nhất, còn upstream tải toàn bộ lịch sử commit",
            "correct": false
          },
          {
            "text": "upstream tự động xóa sạch mã nguồn trên máy sau khi đóng cửa sổ terminal",
            "correct": false
          }
        ],
        "explanation": "Origin và upstream là bí danh do cấu hình đặt; hãy kiểm tra URL và quyền trước khi đồng bộ hoặc push."
      }
    ]
  }
};
export default lesson;
