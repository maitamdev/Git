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
  "content": "# Cấu hình Upstream cho dự án mã nguồn mở\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và quy ước đặt tên remote `upstream` trong quy trình làm việc với kho fork.\n- Cấu hình thêm remote `upstream` trỏ về kho gốc của tác giả bằng câu lệnh `git remote add`.\n- Đồng bộ hóa mã nguồn mới nhất từ kho gốc về máy cá nhân và cập nhật lên kho fork.\n- Ngăn ngừa tình trạng kho fork bị phân kỳ quá xa so với tiến độ phát triển của dự án chính.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### upstream\n- **Nói dễ hiểu**: Tên bí danh quy ước trỏ về kho gốc của tác giả hoặc tổ chức tạo ra dự án ban đầu.\n- **Ví dụ**: `git remote add upstream https://github.com/vuejs/core.git` để nối với kho gốc Vue.\n- **Đừng nhầm**: Khác với `origin` vốn trỏ vào kho fork riêng của bạn; bạn thường chỉ có quyền đọc từ upstream.\n\n### sync fork\n- **Nói dễ hiểu**: Quá trình kéo các commit mới nhất từ kho gốc về kho fork cá nhân để không bị tụt lại phía sau.\n- **Ví dụ**: Fetch từ upstream, gộp vào main máy bạn rồi đẩy lên origin.\n- **Đừng nhầm**: Không làm mất code riêng của bạn nếu bạn làm việc trên các nhánh tính năng tách biệt.\n\n### two-remote model\n- **Nói dễ hiểu**: Mô hình cấu hình đồng thời 2 máy chủ từ xa: origin để đẩy code và upstream để nhận cập nhật.\n- **Ví dụ**: `git remote -v` hiển thị cả cặp origin và upstream trong cùng một kho cục bộ.\n- **Đừng nhầm**: `origin` và `upstream` chỉ là tên thường dùng. Git không giới hạn lệnh theo tên; hãy chọn đúng URL và quyền trước khi fetch hoặc push.\n\n---\n\n## 📖 Định nghĩa\nTrong quy trình fork, nhóm thường đặt `origin` cho fork cá nhân và `upstream` cho kho gốc. Đây là quy ước tên, không phải từ khóa đặc biệt của Git. Trước khi chạy lệnh, kiểm tra `git remote -v` để biết mỗi bí danh thực sự trỏ tới đâu.\n\n---\n\n## 💡 Tại sao cần\nKho gốc có thể tiếp tục nhận thay đổi sau khi bạn fork. Fetch từ kho gốc giúp bạn xem các cập nhật mới; khi cần, tích hợp chúng vào nhánh làm việc theo quy định của dự án. Đồng bộ giảm nguy cơ làm việc trên lịch sử cũ nhưng không đảm bảo loại bỏ mọi conflict.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung kho gốc như dòng sông Mẹ ở thượng nguồn (Upstream). Kho fork cá nhân của bạn là con kênh nhỏ dẫn nước về cánh đồng nhà mình (Origin). Để con kênh không bị tù đọng, bạn cần mở cống đón nước (cấu hình remote upstream) để định kỳ dẫn dòng nước mát mới nhất từ sông Mẹ vào kênh.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình 2 remote: origin và upstream:\n[Kho gốc của tác giả] ◄──────────────────┐ (Định kỳ fetch cập nhật)\n(upstream)                                │\n                                          │\n[Kho fork của bạn] ◄────┐ (git push)      │ (git fetch upstream)\n(origin)                │                 │\n                        │                 │\n[Máy tính của bạn] ─────┴─────────────────┘\n(Local Repository)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư An chuẩn bị đóng góp mã nguồn cho dự án Vue.js gốc. Để đảm bảo tính tương thích với phiên bản mới nhất, An thêm remote gốc: `git remote add upstream https://github.com/vuejs/core.git`. Sau đó An chạy `git fetch upstream` và gộp vào nhánh chính bằng `git merge upstream/main`. Mã nguồn trên máy được cập nhật bản vá mới nhất, giúp An tự tin mở Pull Request mà không lo xung đột.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit remote add upstream <url-kho-goc>\ngit remote -v\ngit fetch upstream\ngit merge upstream/main\ngit push origin main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git remote add upstream <url>`: Thiết lập liên kết remote upstream trỏ trực tiếp tới kho gốc của dự án.\n- `git remote -v`: Xác nhận cấu hình có đủ 2 remote: origin (kho cá nhân) và upstream (kho gốc).\n- `git fetch upstream`: Tải về toàn bộ commit và nhánh mới nhất từ kho gốc của tác giả.\n- `git merge upstream/main`: Gộp các cập nhật mới nhất từ upstream vào nhánh main trên máy bạn.\n- `git push origin main`: Đẩy các commit vừa cập nhật lên kho fork cá nhân trên GitHub.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Push nhầm vào upstream**: Bị báo lỗi từ chối vì bạn không có quyền ghi trực tiếp vào kho của tác giả.\n2. **Quên đồng bộ upstream trước khi tạo nhánh mới**: Khiến bạn viết tính năng mới trên nền tảng code cũ đã lỗi thời.\n3. **Sửa trực tiếp trên nhánh main cục bộ**: Nên giữ main luôn sạch sẽ để chỉ đồng bộ với upstream, mọi tính năng đều viết trên branch riêng.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình remote upstream và đối chiếu danh sách remote.\n1. Trong một fork thật mà bạn đã clone, chạy `git remote -v` và xác nhận URL của `origin` trước khi tiếp tục.\n2. Thêm URL kho gốc thật bằng `git remote add upstream <url-kho-goc>`; đừng dùng URL ví dụ chưa tồn tại.\n3. Chạy `git fetch upstream`, rồi `git branch -r` để xem tên nhánh remote-tracking đã tải về.\n4. Nếu nhánh gốc tên `main`, chuyển sang local `main` sau khi bảo đảm không có thay đổi chưa commit: `git switch main`.\n5. Chạy `git merge upstream/main` chỉ khi chính sách dự án cho phép đồng bộ theo cách này. Nếu thành công và muốn cập nhật fork, dùng `git push origin main` khi có quyền ghi.\n\n---\n\n## 💡 Hint & mẹo\n> Trong quy trình fork phổ biến, thường fetch từ `upstream` và push lên `origin`. Trước mỗi lần push, xác nhận URL đích và quyền của bạn.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Danh sách `git remote -v` hiển thị đầy đủ cả hai remote origin và upstream.\n- Nếu merge thành công, local `main` chứa cập nhật đã fetch từ upstream; nhánh có thể vẫn khác nếu dự án có commit riêng.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về cấu hình remote upstream.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách kết hợp `git fetch upstream` với `git rebase upstream/main` trên nhánh tính năng cá nhân để giữ lịch sử commit luôn thẳng và sạch đẹp.\n\n---\n\n## 📝 Tổng kết\n- `upstream` là tên quy ước trỏ về kho lưu trữ gốc của tác giả ban đầu.\n- Dùng để định kỳ kéo các bản cập nhật mới nhất về máy tính cá nhân.\n- Giúp kho fork cá nhân luôn bắt kịp tiến độ và tránh xung đột khi tạo PR.\n",
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
