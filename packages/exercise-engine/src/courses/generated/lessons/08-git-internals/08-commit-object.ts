import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-commit-object",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "08-commit-object",
    "title": "Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "07-tree-object"
    ],
    "objectives": [
      "Giải phẫu cấu trúc định dạng nội dung của một đối tượng Commit trong Git.",
      "Hiểu rõ 4 thành phần bắt buộc bên trong Commit: con trỏ tree, con trỏ commit cha (parent), thông tin tác giả/người commit, và commit message.",
      "Nắm bắt bản chất của lịch sử Git như một Đồ thị có hướng không chu trình (DAG) liên kết bởi các con trỏ parent."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "commit object",
      "parent commit",
      "author",
      "committer",
      "commit message",
      "dag node"
    ],
    "commands": [
      "git cat-file -p HEAD",
      "git cat-file -t HEAD",
      "git log -1 --raw"
    ]
  },
  "content": "# Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả\n\n---\n\n## 🎯 Mục tiêu bài học\n- Giải phẫu cấu trúc định dạng nội dung của một đối tượng Commit trong Git.\n- Hiểu rõ 4 thành phần bắt buộc bên trong Commit: con trỏ tree, con trỏ commit cha (parent), thông tin tác giả/người commit, và commit message.\n- Nắm bắt bản chất của lịch sử Git như một Đồ thị có hướng không chu trình (DAG) liên kết bởi các con trỏ parent.\n\n---\n\n## 📖 Định nghĩa\n> Đối tượng Commit là khối xây dựng trung tâm gắn kết toàn bộ lịch sử của Git. Một đối tượng Commit là một tệp văn bản nhỏ có cấu trúc cố định chứa một con trỏ trỏ tới đối tượng Tree gốc đại diện cho snapshot toàn diện của dự án tại thời điểm đó, một hoặc nhiều con trỏ trỏ tới các commit cha đi trước (parent), siêu dữ liệu về tác giả (Author: người viết mã) và người thực hiện commit (Committer: người đưa mã vào repo) kèm theo dấu thời gian UTC, và cuối cùng là thông điệp mô tả commit (Commit Message).\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có đối tượng Commit, bạn chỉ có các ảnh chụp thư mục (Tree) rời rạc trong không gian mà không có khái niệm về thời gian, mối liên hệ nhân quả và lịch sử tiến hóa của dự án. Đối tượng Commit đóng vai trò như một bức ảnh chụp kỷ niệm kèm dòng nhật ký lịch sử: nó cho bạn biết ai là người viết mã, ai là người gộp vào kho lưu trữ, diễn ra vào ngày giờ nào, vì lý do gì, và bức ảnh trước đó trong album lịch sử là bức ảnh nào.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng một chuỗi các toa tàu hỏa nối đuôi nhau trên đường ray. Mỗi toa tàu là một đối tượng Commit. Đầu toa tàu có một chiếc móc xích bằng thép nối ngược về toa tàu phía trước (`parent <hash>`). Bên trong toa tàu chứa một tấm bản đồ chỉ dẫn tới nhà kho chứa hàng (`tree <hash>`). Bạn có thể đi ngược từ toa tàu cuối cùng (HEAD) lần theo từng móc xích để đi về toa tàu đầu tiên của đoàn tàu lịch sử.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nGiải phẫu cấu trúc tệp nội dung đối tượng Commit:\n┌────────────────────────────────────────────────────────┐\n│                     COMMIT OBJECT                      │\n├────────────────────────────────────────────────────────┤\n│ tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904         │ <── Trỏ tới Root Tree\n│ parent 7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b        │ <── Trỏ tới Commit cha\n│ author Nguyen Van A <a@demo.com> 1769817600 +0700      │ <── Tác giả viết code\n│ committer Nguyen Van A <a@demo.com> 1769817600 +0700   │ <── Người commit\n│                                                        │\n│ feat: implement user authentication logic              │ <── Commit Message\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư muốn xem Git lưu trữ commit đầu tiên của dự án như thế nào. Kỹ sư chạy lệnh `git cat-file -p HEAD`. Màn hình hiển thị chính xác cấu trúc văn bản thuần túy gồm 5 dòng: dòng 1 bắt đầu bằng chữ `tree` kèm mã băm 40 ký tự; dòng 2 bắt đầu bằng chữ `parent` trỏ về commit trước; dòng 3 ghi rõ `author Le Hoang Nam <nam@company.com> 1727654400 +0700`; dòng 4 là committer; và sau một dòng trống là thông điệp: \"feat: add user login endpoint\". Kỹ sư nhận ra rằng commit không hề to lớn cồng kềnh, nó chỉ là một tệp văn bản nhỏ nặng chưa tới 300 bytes làm nhiệm vụ liên kết các con trỏ.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit cat-file -p HEAD\ngit cat-file -t HEAD\ngit log -1 --raw\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git cat-file -p HEAD giải mã đối tượng commit hiện tại và hiển thị chi tiết các con trỏ tree, parent và metadata tác giả. Lệnh git cat-file -t HEAD xác nhận kiểu đối tượng là commit, và git log -1 --raw hiển thị thông tin commit mới nhất cùng mã băm của đối tượng Tree liên quan một cách trực quan.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cho rằng một commit lưu trữ sự khác biệt (diff) giữa hai phiên bản**:  Commit trỏ tới một cây Tree toàn diện của toàn bộ dự án tại thời điểm đó.\n2. **Nhầm lẫn giữa Author (người tạo ra đoạn mã ban đầu) và Committer (người thực hiện lệnh đưa commit vào lịch sử, ví dụ khi cherry-pick hoặc rebase).**: \n3. **Nghĩ rằng commit đầu tiên (Root commit) có con trỏ parent**:  Root commit là khởi nguồn của vũ trụ repo nên hoàn toàn không có dòng `parent`.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Sử dụng lệnh `git cat-file -p HEAD` để xem nội dung thô của commit hiện tại.\n2. Xác định mã băm của đối tượng Tree và mã băm của Commit cha (parent).\n3. Chạy lệnh `git cat-file -p <parent-hash>` để lần ngược lại commit phía trước.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Một Merge Commit thông thường sẽ có từ 2 dòng `parent` trở lên (ví dụ: `parent commit_1` và `parent commit_2`).\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nChỉ rõ được 4 thành phần cấu tạo nên đối tượng commit từ kết quả hiển thị của lệnh cat-file.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra kiến thức về cấu trúc và vai trò của đối tượng Commit qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao khi hai lập trình viên khác nhau cùng commit một đoạn mã có nội dung y hệt nhau vào cùng một giây, mã băm commit của họ vẫn hoàn toàn khác biệt?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Đối tượng Commit là trung tâm của lịch sử Git, liên kết snapshot thư mục với trục thời gian.\n- Cấu trúc gồm: con trỏ `tree`, con trỏ `parent`, metadata `author`/`committer`, và `message`.\n- Các con trỏ parent móc nối với nhau tạo thành Đồ thị có hướng không chu trình (DAG).\n",
  "quiz": {
    "id": "quiz-08-git-internals-08-commit-object",
    "title": "Trắc nghiệm: Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả",
    "questions": [
      {
        "id": "q1",
        "question": "Dòng đầu tiên bên trong nội dung thô của một đối tượng Commit luôn luôn là con trỏ nào?",
        "type": "single",
        "options": [
          {
            "text": "tree <mã-băm-tree>",
            "correct": true
          },
          {
            "text": "parent <mã-băm-commit>",
            "correct": false
          },
          {
            "text": "author <tên-tác-giả>",
            "correct": false
          },
          {
            "text": "message <nội-dung>",
            "correct": false
          }
        ],
        "explanation": "Đối tượng Commit bắt buộc phải bắt đầu bằng dòng trỏ tới đối tượng Tree đại diện cho snapshot dự án."
      },
      {
        "id": "q2",
        "question": "Sự khác biệt giữa thông tin `author` và `committer` trong đối tượng Commit là gì?",
        "type": "single",
        "options": [
          {
            "text": "Author là người viết đoạn mã ban đầu, Committer là người áp dụng commit vào kho lưu trữ (ví dụ khi rebase/cherry-pick)",
            "correct": true
          },
          {
            "text": "Author là giám đốc công ty, Committer là nhân viên thực tập",
            "correct": false
          },
          {
            "text": "Author là máy tính, Committer là con người",
            "correct": false
          },
          {
            "text": "Hai thông tin này hoàn toàn là một và không bao giờ khác nhau",
            "correct": false
          }
        ],
        "explanation": "Khi một lập trình viên gửi bản vá và người bảo trì dùng lệnh rebase để gộp mã, thông tin author được giữ nguyên nhưng committer đổi thành người gộp."
      },
      {
        "id": "q3",
        "question": "Một Commit phát sinh từ một thao tác hợp nhất nhánh (3-way Merge Commit) sẽ có bao nhiêu con trỏ `parent`?",
        "type": "single",
        "options": [
          {
            "text": "Có ít nhất 2 con trỏ parent trở lên",
            "correct": true
          },
          {
            "text": "Chỉ duy nhất 1 con trỏ parent",
            "correct": false
          },
          {
            "text": "Hoàn toàn không có parent nào",
            "correct": false
          },
          {
            "text": "Có đúng 10 con trỏ parent",
            "correct": false
          }
        ],
        "explanation": "Merge commit nối hai nhánh lịch sử lại với nhau nên sở hữu tối thiểu 2 commit cha (parent 1 của nhánh hiện tại, parent 2 của nhánh được gộp)."
      },
      {
        "id": "q4",
        "question": "Commit đầu tiên trong một kho lưu trữ Git (Root Commit) có điểm gì đặc biệt về cấu trúc?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không có dòng `parent` nào",
            "correct": true
          },
          {
            "text": "Không có dòng `tree`",
            "correct": false
          },
          {
            "text": "Không có thông điệp commit",
            "correct": false
          },
          {
            "text": "Không có mã băm SHA-1",
            "correct": false
          }
        ],
        "explanation": "Vì là commit khởi thủy không có ai đi trước, Root commit không có bất kỳ con trỏ parent nào."
      },
      {
        "id": "q5",
        "question": "Nếu hai người dùng khác nhau tạo ra hai commit có cùng đối tượng Tree, cùng commit cha và cùng commit message, tại sao mã băm commit của họ vẫn khác nhau?",
        "type": "single",
        "options": [
          {
            "text": "Do dấu thời gian (timestamp) hoặc thông tin tác giả/người commit khác nhau",
            "correct": true
          },
          {
            "text": "Do Git tự động gắn số ngẫu nhiên bí mật",
            "correct": false
          },
          {
            "text": "Do địa chỉ IP mạng của hai máy tính khác nhau",
            "correct": false
          },
          {
            "text": "Do thuật toán SHA-1 không hỗ trợ trùng lặp",
            "correct": false
          }
        ],
        "explanation": "Mã băm commit được tính toán trên toàn bộ nội dung bao gồm thông tin author, committer và timestamp chính xác đến từng giây."
      },
      {
        "id": "q6",
        "question": "Tại sao việc thay đổi một commit cũ trong lịch sử lại làm thay đổi mã băm của toàn bộ các commit nối tiếp phía sau nó?",
        "type": "single",
        "options": [
          {
            "text": "Vì mỗi commit con đều lưu mã băm của commit cha bên trong nội dung con trỏ parent của mình",
            "correct": true
          },
          {
            "text": "Vì Git tự động xóa và tạo lại toàn bộ repository",
            "correct": false
          },
          {
            "text": "Vì hệ thống tệp tin bị phân mảnh",
            "correct": false
          },
          {
            "text": "Vì máy chủ GitHub bắt buộc phải cấp phát ID mới",
            "correct": false
          }
        ],
        "explanation": "Do tính chất mật mã học của DAG, việc đổi hash của commit cha làm thay đổi nội dung của commit con, kéo theo sự thay đổi chuỗi hash dây chuyền."
      }
    ]
  }
};
export default lesson;
