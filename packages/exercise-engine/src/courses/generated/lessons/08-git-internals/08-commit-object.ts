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
      "Hiểu các trường cốt lõi gồm tree, author, committer và message; parent có thể không có (root), một (commit thường) hoặc nhiều (merge).",
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
  "content": "# Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả\n\n---\n\n## 🎯 Mục tiêu\n- Giải phẫu cấu trúc định dạng nội dung của một đối tượng Commit trong Git.\n- Hiểu các trường cốt lõi của Commit: tree, author, committer, thông điệp và parent tùy lịch sử.\n- Nắm bắt bản chất của lịch sử Git như một Đồ thị có hướng không chu trình (DAG) liên kết bởi các con trỏ parent.\n- Phân biệt sự khác nhau giữa Author (tác giả sáng tác mã) và Committer (người áp dụng commit vào kho).\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Commit Object Structure\n- **Nói dễ hiểu**: Object mô tả một snapshot bằng `tree` và ghi metadata tác giả/người commit; có thể trỏ tới commit cha.\n- **Ví dụ**: Nội dung có dòng `tree`, thường có `author` và `committer`, có 0, 1 hoặc nhiều dòng `parent`, rồi đến thông điệp sau một dòng trống.\n- **Đừng nhầm**: Commit không lưu trữ danh sách các dòng thay đổi (diff/patch); nó trỏ thẳng tới một Root Tree hoàn chỉnh của toàn bộ dự án.\n\n### Author vs Committer Metadata\n- **Nói dễ hiểu**: Author là người đầu tiên sáng tác ra đoạn mã nguồn, còn Committer là người trực tiếp ghi commit đó vào nhánh hiện tại.\n- **Ví dụ**: Bạn viết code vào tuần trước (Author), trưởng nhóm hôm nay dùng `git rebase` hoặc `cherry-pick` để gộp vào main (Committer).\n- **Đừng nhầm**: Khi commit thông thường hai trường thường trùng nhau; có thể khác trong nhiều quy trình, ví dụ rebase, cherry-pick, áp dụng patch hoặc đặt author riêng.\n\n### Directed Acyclic Graph (DAG) in Git\n- **Nói dễ hiểu**: Cấu trúc đồ thị một chiều không khép kín, trong đó mỗi commit trỏ ngược về một hoặc nhiều commit cha đi trước.\n- **Ví dụ**: Commit thường có 1 cha, merge commit có 2 cha, root commit có 0 cha, và không bao giờ có đường đi vòng tròn quay lại chính nó.\n- **Đừng nhầm**: Không phải là danh sách liên kết đơn (Linked List) tuyến tính đơn giản; Git có thể rẽ nhánh và hợp nhất đa chiều.\n\n---\n\n## 📖 Định nghĩa\nCommit object chứa con trỏ tới root tree, thông tin author và committer (tên, email, Unix timestamp cùng độ lệch múi giờ), các dòng parent nếu có, và thông điệp sau một dòng trống. Root commit không có parent; commit thường có một parent; merge commit có từ hai parent trở lên. Có thể có thêm header tùy chọn như chữ ký. Nội dung thực tế không có giới hạn kích thước cố định.\n\n---\n\n## 💡 Tại sao cần\nNếu không có đối tượng Commit, bạn chỉ có các ảnh chụp thư mục (Tree) rời rạc trong không gian mà không có khái niệm về thời gian, mối liên hệ nhân quả và lịch sử tiến hóa của dự án. Đối tượng Commit đóng vai trò như một bức ảnh chụp kỷ niệm kèm dòng nhật ký lịch sử: nó cho bạn biết ai là người viết mã, ai là người gộp vào kho lưu trữ, diễn ra vào ngày giờ nào, vì lý do gì, và bức ảnh trước đó trong album lịch sử là bức ảnh nào.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng mỗi commit là một trang nhật ký chỉ tới snapshot của dự án (`tree`) và ghi lại trang trước đó qua `parent`. Trang đầu không có trang trước; khi hai dòng lịch sử được hợp nhất, trang mới có thể tham chiếu nhiều trang cha. Nhờ vậy, lịch sử là đồ thị chứ không chỉ là một chuỗi.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nGiải phẫu cấu trúc tệp nội dung đối tượng Commit:\n┌────────────────────────────────────────────────────────┐\n│                     COMMIT OBJECT                      │\n├────────────────────────────────────────────────────────┤\n│ tree <tree-object-id>                                  │ <── Trỏ tới Root Tree\n│ parent <parent-object-id> (nếu có)                     │ <── Có thể có nhiều parent\n│ author Nguyen Van A <a@demo.com> <epoch> +0700          │ <── Tác giả thay đổi\n│ committer Nguyen Van A <a@demo.com> <epoch> +0700       │ <── Người tạo commit object\n│                                                        │\n│ feat: implement user authentication logic              │ <── Commit Message\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nChạy `git cat-file -p HEAD` để xem commit hiện tại. Header bắt đầu bằng `tree`; nếu HEAD là root commit thì không có dòng `parent`, còn merge commit có thể có nhiều dòng `parent`. Các trường author/committer ghi timestamp dạng Unix và độ lệch múi giờ; một dòng trống phân cách header với thông điệp.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Xem nội dung cấu trúc của commit hiện tại\ngit cat-file -p HEAD\n\n# Kiểm tra kiểu đối tượng (kết quả trả về: commit)\ngit cat-file -t HEAD\n\n# Xem thông tin commit cùng mã băm của Tree gốc\ngit log -1 --pretty=raw\n```\n\n---\n\n## 🔍 Giải thích command\n- `git cat-file -p HEAD`: Đọc và giải mã trực tiếp đối tượng commit mà con trỏ HEAD đang trỏ tới.\n- `git cat-file -t HEAD`: Trả về kiểu của đối tượng (chữ `commit`).\n- `git log -1 --pretty=raw`: Hiển thị các header chính, parent và timestamp; `git cat-file -p` hữu ích để xem payload commit trực tiếp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng commit lưu vết vi phân (diff)**: Commit lưu con trỏ trỏ tới Root Tree chứa snapshot hoàn chỉnh của toàn bộ cây mã nguồn tại thời điểm đó.\n2. **Nhầm lẫn giữa Author và Committer**: Cần phân biệt rõ khi audit lịch sử để biết ai là người sáng tác mã và ai là người thực hiện đưa mã vào repo chính thức.\n3. **Nghĩ rằng Root commit có con trỏ parent**: Commit đầu tiên của kho khởi tạo không có commit cha nào phía trước nên hoàn toàn không có dòng `parent`.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Sử dụng lệnh `git cat-file -p HEAD` để xem nội dung thô của commit hiện tại trong kho làm việc.\n2. **Bước 2**: Xác định mã băm của đối tượng `tree` ở dòng 1 và mã băm của `parent` ở dòng 2.\n3. **Bước 3**: Chạy lệnh `git cat-file -p <parent_hash>` để lần theo móc xích đi ngược về commit phía trước trong lịch sử.\n4. **Bước 4**: Tiếp tục lặp lại cho đến khi gặp commit đầu tiên (Root commit) và quan sát dòng `parent` hoàn toàn biến mất.\n\n---\n\n## 💡 Hint & mẹo\n> Một Merge Commit phát sinh từ thao tác gộp nhánh 3-way sẽ có từ 2 dòng `parent` trở lên (ví dụ: `parent <hash_1>` và `parent <hash_2>`), đại diện cho hai nhánh lịch sử hợp nhất lại với nhau.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git cat-file -p HEAD` hiển thị `tree`, author/committer, thông điệp và 0/1/nhiều parent tùy loại commit.\n- Truy vấn ngược theo mã `parent` dẫn về đúng lịch sử commit trước đó được hiển thị trong `git log`.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra kiến thức về cấu trúc và vai trò của đối tượng Commit qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTại sao khi hai lập trình viên khác nhau cùng commit một đoạn mã có nội dung y hệt nhau vào cùng một giây, mã băm commit của họ vẫn hoàn toàn khác biệt? Các yếu tố nào trong metadata quyết định tính duy nhất của mã băm commit?\n\n---\n\n## 📝 Tổng kết\n- Đối tượng Commit là trung tâm của lịch sử Git, liên kết snapshot thư mục với trục thời gian.\n- Cấu trúc gồm `tree`, metadata `author`/`committer`, message và các parent tùy lịch sử (root không có parent).\n- Các con trỏ parent móc nối với nhau tạo thành Đồ thị có hướng không chu trình (DAG).\n- Phân biệt rõ Author và Committer giúp kiểm soát xuất xứ và lịch sử chỉnh sửa mã nguồn minh bạch.\n",
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
