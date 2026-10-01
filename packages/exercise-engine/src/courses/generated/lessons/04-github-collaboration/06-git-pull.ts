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
  "content": "# Đồng bộ và gộp code với git pull\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.\n- Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.\n- Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.\n- Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git pull\n- **Nói dễ hiểu**: Lệnh tải thay đổi từ remote và tích hợp chúng vào nhánh hiện tại. Cách tích hợp có thể tùy cấu hình Git.\n- **Ví dụ**: `git pull origin main` để lấy toàn bộ commit mới của đồng nghiệp trên GitHub về máy.\n- **Đừng nhầm**: Pull gồm bước fetch rồi bước tích hợp. Mặc định thường dùng merge, nhưng cấu hình có thể chọn rebase.\n\n### fetch — lấy thông tin mới từ remote\n- **Nói dễ hiểu**: Tải commit và cập nhật tham chiếu theo dõi từ remote mà chưa tích hợp vào nhánh hiện tại.\n- **Ví dụ**: `git fetch origin` cập nhật dữ liệu từ `origin`; bạn có thể xem commit mới trước khi quyết định merge hoặc rebase.\n- **Đừng nhầm**: Fetch đứng riêng không thay đổi nội dung nhánh hiện tại; `git pull` thực hiện fetch rồi thêm bước tích hợp.\n\n### pull conflict\n- **Nói dễ hiểu**: Xung đột xảy ra khi bạn và đồng nghiệp cùng sửa trên cùng một dòng code trong cùng một file.\n- **Ví dụ**: Đồng nghiệp sửa hàm login trên server, bạn cũng sửa hàm login ở máy và chạy git pull.\n- **Đừng nhầm**: Không phải lỗi làm hỏng dự án; Git chỉ dừng lại yêu cầu bạn xác nhận giữ phiên bản nào.\n\n---\n\n## 📖 Định nghĩa\n`git pull <remote> <nhánh>` lấy thay đổi từ nhánh đã chỉ định rồi tích hợp vào nhánh hiện tại. Git fetch trước; kiểu tích hợp phụ thuộc tùy chọn và cấu hình. Với cấu hình merge thông thường, pull dùng merge; nếu cấu hình rebase thì hành vi khác. Nếu lịch sử phân kỳ, có thể phát sinh merge commit hoặc conflict.\n\n---\n\n## 💡 Tại sao cần\nKhi làm việc nhóm, các thành viên liên tục đẩy code mới lên máy chủ chung. Lệnh `git pull` giúp bạn cập nhật tiến độ dự án mỗi ngày, đảm bảo bạn đang phát triển tính năng mới dựa trên phiên bản mới nhất và giảm thiểu nguy cơ xung đột lớn về sau.\n\n---\n\n## 🧠 Mental Model\nNếu `git fetch` là nhân viên bưu tá đặt kiện hàng vào hòm thư trước cổng, thì `git pull` là bạn tự ra mở hòm thư, mang gói hàng vào phòng khách và bày lên bàn làm việc. Nếu trong gói hàng có món đồ trùng vị trí trên bàn, bạn sẽ dừng lại sắp xếp cho ngăn nắp.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nLuồng thường gặp khi cấu hình dùng merge:\n┌────────────────────────────────────────────────────────┐\n│                      git pull                          │\n│  ┌───────────────────────┐   ┌───────────────────────┐  │\n│  │ 1. fetch dữ liệu       │ + │ 2. tích hợp thay đổi   │  │\n│  └───────────────────────┘   └───────────────────────┘  │\n└────────────────────────────────────────────────────────┘\nKiểu tích hợp phụ thuộc tùy chọn và cấu hình Git.\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nNhánh local `main` đang ở C2, remote có thêm C3. Khi nhánh local chưa có commit riêng và cấu hình cho phép fast-forward, `git pull origin main` tải C3 rồi đưa `main` lên C3. Nếu hai bên cùng có commit mới, cần tích hợp lịch sử và có thể phải xử lý conflict.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit pull\ngit pull origin <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git pull`: Kéo và gộp dữ liệu từ nhánh theo dõi mặc định trên remote vào nhánh hiện tại.\n- `git pull origin <nhánh>`: Chỉ định cụ thể tên remote và tên nhánh cần kéo về gộp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Pull khi Working Directory còn thay đổi dở dang**: Git có thể từ chối gộp đè lên file chưa commit; nên commit hoặc cất vào stash trước khi pull.\n2. **Quên rằng pull là fetch cộng merge**: Dẫn đến bối rối khi thấy xuất hiện merge commit ngoài ý muốn hoặc gặp conflict.\n3. **Kéo nhầm nhánh khác vào nhánh đang đứng**: Gõ `git pull origin develop` khi đang đứng ở `main` sẽ làm gộp mã nguồn develop vào main.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác kéo cập nhật từ remote và kiểm tra lịch sử commit.\n1. Dùng một kho thử nghiệm có remote và nhánh `main`; chạy `git status` để kiểm tra nhánh hiện tại và thay đổi chưa commit.\n2. Chạy `git fetch origin` để cập nhật thông tin remote trước. Nếu bạn không có remote thử nghiệm, hãy dừng ở bước này thay vì chạy lệnh lên kho công việc thật.\n3. Chạy `git pull origin main`. Nếu remote không có commit mới, Git báo đã cập nhật; nếu có commit mới thì xem thông báo tích hợp.\n4. Chạy `git log --oneline -n 5` và `git status` để kiểm tra kết quả.\n\n---\n\n## 💡 Hint & mẹo\n> Trước khi pull, xem `git status` và xác nhận bạn đang ở đúng nhánh. Hãy theo cấu hình và quy trình của nhóm.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lịch sử commit trên nhánh cục bộ bắt kịp commit mới nhất trên remote.\n- Nếu remote không có commit mới, nhánh không đổi. Nếu có thay đổi, lịch sử hoặc file phản ánh cách Git đã tích hợp chúng.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về bản chất hai pha của git pull.\n\n---\n\n## 🚀 Thử thách nâng cao\nĐọc `git help pull` để tìm các chế độ merge/rebase và tùy chọn fast-forward. Không đổi cấu hình `--global` trên máy dùng chung hoặc trước khi hiểu tác động tới mọi kho của bạn.\n\n---\n\n## 📝 Tổng kết\n- `git pull` fetch thay đổi rồi tích hợp vào nhánh hiện tại.\n- Cách tích hợp phụ thuộc tùy chọn và cấu hình; có thể phát sinh conflict.\n- Kiểm tra nhánh và trạng thái trước khi pull; làm theo quy ước của nhóm.\n",
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
