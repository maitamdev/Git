import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-pull",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "06-git-pull",
    "title": "Đồng bộ và gộp code với git pull",
    "level": "intermediate",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "05-git-fetch"
    ],
    "objectives": [
      "Hiểu `git pull` fetch thay đổi rồi tích hợp vào nhánh hiện tại theo tùy chọn/cấu hình Git.",
      "Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.",
      "Kiểm tra nhánh và trạng thái trước khi pull; nhận biết có thể phát sinh conflict.",
      "Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "pull-remote"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git pull",
      "fetch and merge",
      "dong bo code",
      "pull rebase",
      "cap nhat local"
    ],
    "commands": [
      "git pull",
      "git pull origin <tên-nhánh>"
    ]
  },
  "content": "# Đồng bộ và gộp code với git pull\n\n---\n\n## 🎯 Mục tiêu\n- Thấu suốt bản chất toán học của `git pull`: phép kết hợp giữa `git fetch` và thao tác tích hợp (`git merge`).\n- Vận dụng chuẩn xác lệnh `git pull` để đồng bộ các commit mới nhất từ máy chủ GitHub về thư mục làm việc.\n- Phân biệt các kịch bản hợp nhất phổ biến: Fast-Forward, tạo Merge Commit tự động và xử lý xung đột (Merge Conflict).\n- Nắm vững các lưu ý an toàn trước khi thực thi lệnh pull để tránh làm xáo trộn các tệp đang sửa đổi dở dang.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git pull\n- **Nói dễ hiểu:** Câu lệnh kéo toàn bộ các commit mới nhất từ GitHub về máy và tự động gộp thẳng vào nhánh bạn đang mở.\n- **Ví dụ:** Lệnh `git pull origin main` giúp đưa toàn bộ thay đổi mới của đồng đội vào mã nguồn trên máy bạn.\n- **Đừng nhầm:** `git pull` không phải thao tác một bước đơn lẻ; nó luôn chạy `fetch` trước rồi mới tiến hành `merge`.\n\n### fetch + merge — công thức hai pha\n- **Nói dễ hiểu:** Bản chất cơ chế vận hành ngầm của `git pull`: bước một tải dữ liệu về kho, bước hai hợp nhất vào nhánh hiện tại.\n- **Ví dụ:** Chạy `git pull` tương đương việc bạn gõ tuần tự hai lệnh `git fetch origin` rồi `git merge origin/main`.\n- **Đừng nhầm:** Vì có pha merge nên `git pull` hoàn toàn có thể gây ra xung đột (conflict) nếu code trên máy trùng dòng sửa với server.\n\n### fast-forward pull\n- **Nói dễ hiểu:** Trường hợp kéo code thuận lợi nhất khi nhánh cục bộ của bạn chưa có commit mới nào so với máy chủ.\n- **Ví dụ:** Máy chủ có thêm 3 commit trong khi máy bạn đứng yên, Git chỉ việc dịch chuyển con trỏ nhánh bạn tiến về trước 3 bước.\n- **Đừng nhầm:** Tình huống này diễn ra êm đẹp không sinh ra commit gộp thừa; nếu cả hai bên đều có commit mới, Git bắt buộc phải tạo merge commit hoặc rebase.\n\n---\n\n## 📖 Định nghĩa\n`git pull` là câu lệnh đồng bộ hai pha trong Git, tự động thực hiện tải dữ liệu mới từ máy chủ từ xa về máy tính (`fetch`) và ngay lập tức tích hợp (thông thường bằng `merge` hoặc `rebase`) vào nhánh cục bộ bạn đang làm việc, giúp mã nguồn tại thư mục làm việc bắt kịp phiên bản mới nhất.\n\n---\n\n## 🤔 Tại sao cần?\nKhi phát triển phần mềm trong một nhóm nhiều người, mã nguồn trên GitHub liên tục được cập nhật từ các đồng nghiệp. Nếu bạn không thường xuyên kéo code mới về, bạn sẽ bị tụt hậu và đối mặt với những xung đột mã nguồn khổng lồ khi bàn giao tính năng. Lệnh `git pull` giữ cho dòng chảy phát triển của bạn luôn nhịp nhàng và ăn khớp với tiến độ chung của toàn đội ngũ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nNếu `git fetch` giống như người giao hàng đặt thùng bưu kiện mới vào hòm thư ngoài cổng, thì `git pull` chính là việc bạn chủ động ra mở hòm thư, ôm thùng hàng vào phòng làm việc và lập tức sắp xếp bày biện lên bàn. Nếu có món đồ trùng vị trí trên bàn, bạn sẽ cần sắp đặt lại cho gọn gàng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ HAI PHA NẰM SAU CÂU LỆNH GIT PULL:\n\n┌────────────────────────────────────────────────────────┐\n│                        git pull                        │\n│   ┌────────────────────────┐    ┌──────────────────┐   │\n│   │ Pha 1: git fetch       │ ──►│ Pha 2: git merge │   │\n│   │ (Tải commit từ server) │    │ (Gộp vào nhánh)  │   │\n│   └────────────────────────┘    └──────────────────┘   │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nĐầu giờ sáng thứ Hai, bạn mở máy tính để tiếp tục làm việc trên nhánh `main`. Trong dịp cuối tuần, hai đồng đội đã hoàn thành chức năng thanh toán và gộp vào nhánh chính trên GitHub. Bạn chỉ cần gõ nhẹ lệnh `git pull origin main`. Git tải 4 commit mới về và tự động di chuyển con trỏ nhánh `main` trên máy bạn bắt kịp đồng đội trong 3 giây.\n\n---\n\n## 💻 Command\n```bash\ngit pull\ngit pull origin main\ngit pull --ff-only\n```\n\n---\n\n## 🔍 Giải thích command\n- `git pull`: Kéo và tự động hợp nhất các commit mới từ remote và nhánh upstream tương ứng đã cấu hình.\n- `git pull origin main`: Chỉ định đích danh máy chủ remote là `origin` và nhánh nguồn cần kéo về là `main`.\n- `git pull --ff-only`: Chỉ cho phép pull nếu nhánh có thể tiến nhanh (fast-forward); từ chối tạo commit gộp nếu có phân kỳ lịch sử.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Pull khi thư mục làm việc đang có file sửa dở chưa commit**: Git sẽ từ chối gộp đè lên tệp chưa lưu; bạn cần commit hoặc cất vào `git stash` trước khi pull.\n2. **Kéo nhầm nhánh trên remote vào nhánh cục bộ khác**: Đang đứng ở nhánh `feature` lại gõ `git pull origin main` khiến mã nguồn bị hòa lẫn không mong muốn.\n3. **Hoảng loạn khi gặp xung đột (Merge Conflict) lúc pull**: Nghĩ rằng code bị hỏng; thực chất bạn chỉ cần mở tệp xung đột lên, chọn giữ lại đoạn code đúng và tạo commit hoàn tất.\n\n---\n\n## 🧪 Lab\n1. Chạy `git status` để bảo đảm thư mục làm việc hoàn toàn sạch sẽ, không có tệp nào sửa dở chưa commit.\n2. Kiểm tra thông tin các remote đang kết nối bằng lệnh: `git remote -v`.\n3. Chạy lệnh đồng bộ: `git pull origin main` để kéo những cập nhật mới nhất từ máy chủ GitHub về máy.\n4. Xem lại lịch sử các commit vừa được gộp vào dự án bằng lệnh: `git log --oneline -n 5`.\n\n---\n\n## 💡 Hint\n> Một thói quen vàng của các kỹ sư cấp cao: luôn chạy `git status` trước khi `git pull`. Đảm bảo không gian làm việc của bạn gọn gàng sẽ giúp quá trình hợp nhất mã nguồn diễn ra thuận lợi 100% mà không bị lỗi tệp xung đột dở dang cản trở.\n\n---\n\n## ✅ Validation\n- Nhận thức thấu đáo công thức hai pha: `git pull = fetch + merge`.\n- Thực hiện thành công thao tác kéo và cập nhật mã nguồn bằng `git pull` trên nhánh làm việc.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về cách thức vận hành và xử lý tình huống khi dùng lệnh `git pull`.\n\n---\n\n## 🔥 Challenge\nTìm hiểu về tùy chọn `git pull --rebase`. Trong hoàn cảnh nào thì các nhóm phát triển phần mềm doanh nghiệp ưu tiên sử dụng `git pull --rebase` thay vì lệnh `git pull` mặc định sử dụng cơ chế merge commit?\n\n---\n\n## 📚 Tổng kết\n- `git pull` là câu lệnh tiện lợi kết hợp giữa tải dữ liệu (`fetch`) và hợp nhất (`merge`).\n- Giúp thư mục làm việc của bạn lập tức đồng bộ hóa với tiến độ phát triển của nhóm trên GitHub.\n- Luôn giữ không gian làm việc sạch sẽ trước khi thực hiện pull để giảm thiểu nguy cơ lỗi xung đột.\n",
  "quiz": {
    "id": "quiz-04-06-git-pull",
    "title": "Trắc nghiệm: Đồng bộ code với git pull",
    "questions": [
      {
        "id": "q1",
        "question": "Trong cấu hình pull dùng merge, lệnh `git pull` thường làm những việc nào?",
        "type": "single",
        "options": [
          {
            "text": "Tải thông tin từ remote rồi tích hợp thay đổi vào nhánh hiện tại bằng merge",
            "correct": true
          },
          {
            "text": "Chỉ xem trạng thái file mà không kết nối remote",
            "correct": false
          },
          {
            "text": "Đẩy commit của máy lên remote",
            "correct": false
          },
          {
            "text": "Xóa nhánh hiện tại và tạo nhánh mới",
            "correct": false
          }
        ],
        "explanation": "Pull fetch dữ liệu trước rồi tích hợp; cấu hình Git có thể chọn cách tích hợp khác."
      },
      {
        "id": "q2",
        "question": "Bạn đang ở nhánh `feature` và chạy `git pull origin main`. Thay đổi từ đâu được tích hợp vào đâu?",
        "type": "single",
        "options": [
          {
            "text": "Từ nhánh `main` trên remote `origin` vào nhánh local hiện tại `feature`",
            "correct": true
          },
          {
            "text": "Từ nhánh local `feature` lên nhánh `main` trên remote",
            "correct": false
          },
          {
            "text": "Từ remote `origin` vào tất cả nhánh local cùng lúc",
            "correct": false
          },
          {
            "text": "Từ nhánh `main` sang nhánh `feature` trên GitHub bằng cách tạo PR",
            "correct": false
          }
        ],
        "explanation": "Lệnh pull tích hợp ref được chỉ định vào nhánh đang checkout, không tự tạo PR."
      },
      {
        "id": "q3",
        "question": "Nếu Git không thể tự kết hợp các thay đổi khi pull, điều gì có thể xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Pull dừng ở trạng thái conflict để bạn kiểm tra và giải quyết các file liên quan",
            "correct": true
          },
          {
            "text": "Git tự chọn phiên bản của người có quyền cao hơn",
            "correct": false
          },
          {
            "text": "Git xóa nhánh local và tạo lại từ remote",
            "correct": false
          },
          {
            "text": "Git tự đóng repository để tránh sửa thêm",
            "correct": false
          }
        ],
        "explanation": "Conflict nghĩa là Git cần bạn chọn cách kết hợp nội dung trước khi hoàn tất tích hợp."
      },
      {
        "id": "q4",
        "question": "Trước khi pull trong repository đang có thay đổi chưa commit, bước nào giúp bạn quyết định an toàn?",
        "type": "single",
        "options": [
          {
            "text": "Chạy `git status`, xem các thay đổi và commit hoặc stash nếu phù hợp với quy trình nhóm",
            "correct": true
          },
          {
            "text": "Chạy `git reset --hard` để xóa mọi thay đổi trước khi kiểm tra",
            "correct": false
          },
          {
            "text": "Dùng `git push --force` để đảm bảo pull thành công",
            "correct": false
          },
          {
            "text": "Xóa thư mục `.git` rồi chạy pull lại",
            "correct": false
          }
        ],
        "explanation": "`git status` cho bạn biết thay đổi nào chưa lưu vào commit trước khi tích hợp code."
      },
      {
        "id": "q5",
        "question": "Nếu `git pull` báo local branch chưa có upstream, bạn nên làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Xác nhận đúng remote và nhánh đích, rồi chỉ định rõ chúng hoặc thiết lập upstream theo hướng dẫn dự án",
            "correct": true
          },
          {
            "text": "Dùng `git pull --force` để Git tự tìm mọi repository",
            "correct": false
          },
          {
            "text": "Đổi tên nhánh local thành `origin/main` để tạo upstream",
            "correct": false
          },
          {
            "text": "Xóa remote để Git tự chọn lại",
            "correct": false
          }
        ],
        "explanation": "Pull cần biết nguồn thay đổi; hãy kiểm tra đúng URL và nhánh trước khi cấu hình upstream."
      },
      {
        "id": "q6",
        "question": "Khi nào nên dùng `git fetch` trước để xem thay đổi thay vì chạy pull ngay?",
        "type": "single",
        "options": [
          {
            "text": "Khi muốn xem commit hoặc diff mới trước khi quyết định cách tích hợp chúng",
            "correct": true
          },
          {
            "text": "Khi muốn tự động merge mà không kiểm tra trạng thái",
            "correct": false
          },
          {
            "text": "Khi muốn xóa commit local mà không để lại dấu vết",
            "correct": false
          },
          {
            "text": "Khi muốn tạo một repository GitHub mới",
            "correct": false
          }
        ],
        "explanation": "Fetch cập nhật refs từ remote nhưng chưa tích hợp chúng vào nhánh local hiện tại."
      }
    ]
  }
};
export default lesson;
