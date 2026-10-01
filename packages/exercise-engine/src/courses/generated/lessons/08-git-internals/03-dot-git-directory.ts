import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-dot-git-directory",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "03-dot-git-directory",
    "title": "Khám phá cấu trúc bên trong thư mục .git",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "02-porcelain-vs-plumbing"
    ],
    "objectives": [
      "Giải mã toàn bộ các tệp tin và thư mục cốt lõi bên trong thư mục quản trị .git/.",
      "Hiểu rõ chức năng của từng thành phần: HEAD, config, description, index, objects/, refs/, hooks/, info/.",
      "Nhận thức được rằng một kho lưu trữ Git hoàn chỉnh chỉ là một thư mục bình thường chứa thư mục con .git/."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "dot git directory",
      "HEAD",
      "config",
      "index",
      "objects",
      "refs",
      "hooks"
    ],
    "commands": [
      "ls -la .git",
      "cat .git/config",
      "cat .git/HEAD"
    ]
  },
  "content": "# Khám phá cấu trúc bên trong thư mục .git\n\n---\n\n## 🎯 Mục tiêu\n- Giải mã toàn bộ các tệp tin và thư mục cốt lõi bên trong thư mục quản trị `.git/`.\n- Hiểu rõ chức năng của từng thành phần: `HEAD`, `config`, `description`, `index`, `objects/`, `refs/`, `hooks/`, `info/`.\n- Nhận thức được rằng một kho lưu trữ Git hoàn chỉnh chỉ là một thư mục bình thường chứa thư mục con `.git/`.\n- Tự tin kiểm tra và điều chỉnh các thiết lập cục bộ trực tiếp trong tệp cấu hình.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### HEAD Reference File\n- **Nói dễ hiểu**: Tệp văn bản thuần ASCII nằm tại `.git/HEAD` ghi lại con trỏ hiện tại đang kiểm xuất (checkout) nhánh nào hoặc commit nào.\n- **Ví dụ**: Khi ở trên nhánh `main`, mở tệp sẽ thấy đúng một dòng: `ref: refs/heads/main`.\n- **Đừng nhầm**: Không phải file nhị phân; bạn hoàn toàn có thể dùng lệnh `cat` hoặc text editor để xem nội dung bên trong.\n\n### Local Repository Config (.git/config)\n- **Nói dễ hiểu**: Tệp cấu hình dạng INI lưu trữ toàn bộ thiết lập cụ thể cho riêng repository hiện tại (như URL remote, tracking branch).\n- **Ví dụ**: Khối `[remote \"origin\"] url = git@github.com:user/repo.git` chỉ định địa chỉ đẩy mã nguồn.\n- **Đừng nhầm**: Không ghi đè vĩnh viễn cấu hình toàn cục `~/.gitconfig`; cấu hình cục bộ chỉ có hiệu lực trong phạm vi repo này và có độ ưu tiên cao hơn.\n\n### Binary Staging Index (.git/index)\n- **Nói dễ hiểu**: Tệp nhị phân lưu trữ trạng thái hiện thời của Staging Area (danh sách tệp tin đã `git add`, mã băm SHA-1 và thời gian sửa đổi).\n- **Ví dụ**: Khi gõ `git add file.txt`, Git ghi lại đường dẫn `file.txt` và mã blob tương ứng vào tệp `.git/index`.\n- **Đừng nhầm**: Không phải tệp văn bản đọc được bằng `cat`; cần dùng lệnh plumbing `git ls-files --stage` để kiểm tra.\n\n---\n\n## 📖 Định nghĩa\nThư mục `.git/` là trái tim và linh hồn của mọi kho lưu trữ Git. Đây là một thư mục ẩn nằm ở vị trí cao nhất của cây thư mục làm việc, chứa toàn bộ siêu dữ liệu, lịch sử commit, các đối tượng nhị phân, cấu hình người dùng và con trỏ nhánh. Nếu bạn xóa thư mục `.git/`, toàn bộ lịch sử quản lý phiên bản sẽ biến mất và dự án của bạn trở thành một thư mục tệp tin thông thường không có Version Control.\n\n---\n\n## 💡 Tại sao cần\nHầu hết các kỹ sư xem thư mục `.git/` như một chiếc hộp đen ma thuật cấm kỵ và không bao giờ dám mở ra xem. Tuy nhiên, khi bạn thấu hiểu tường tận từng tệp tin và thư mục bên trong chiếc hộp đen đó: bạn biết cách sửa tệp `.git/config` để đổi URL remote mà không cần gõ lệnh dài dòng, biết đọc tệp `.git/HEAD` để biết chính xác con trỏ đang ở đâu, và biết cách sao lưu toàn vẹn toàn bộ dự án bằng cách nén duy nhất thư mục `.git/`. Nhờ đó, bạn hoàn toàn làm chủ hệ thống lưu trữ và tự tin ứng phó với mọi tình huống khẩn cấp.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung thư mục dự án của bạn như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu trên bàn là Working Directory (nơi bạn làm việc hàng ngày). Còn thư mục `.git/` chính là căn phòng lưu trữ hồ sơ tài liệu mật nằm ở góc phòng: có tủ đựng hồ sơ lịch sử (`objects/`), bảng danh bạ nhân viên (`config`), chiếc bảng ghim vị trí công việc hiện tại (`HEAD`), và ngăn kéo chứa các bản thảo chờ đóng dấu (`index`).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc giải phẫu thư mục .git/:\n.git/\n├── HEAD              <── Tệp văn bản trỏ tới branch hiện hành (ref: refs/heads/main)\n├── config            <── Tệp cấu hình cục bộ của kho lưu trữ (remotes, user)\n├── description       <── Tệp mô tả dự án dùng cho GitWeb\n├── index             <── Tệp nhị phân Staging Area (lưu cache của cây thư mục)\n├── objects/          <── Cơ sở dữ liệu đối tượng (Object Store: xx/yyyyzz)\n│   ├── info/\n│   └── pack/         <── Chứa các tệp nén packfiles và chỉ mục index\n├── refs/             <── Danh mục các con trỏ tham chiếu\n│   ├── heads/        <── Nhánh cục bộ (main, feature)\n│   ├── tags/         <── Thẻ phiên bản (v1.0.0)\n│   └── remotes/      <── Nhánh theo dõi từ xa (origin/main)\n└── hooks/            <── Kịch bản tự động kích hoạt trước/sau sự kiện\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư clone một dự án mã nguồn mở có dung lượng mã nguồn là 10 MB nhưng nhận thấy thư mục `.git/` nặng tới 200 MB. Tò mò mở khám phá cấu trúc bên trong, kỹ sư kiểm tra thư mục `.git/objects/pack/` và phát hiện một tệp `.pack` khổng lồ. Sử dụng các công cụ kiểm tra, kỹ sư phát hiện ra rằng trong quá khứ, một lập trình viên cũ đã vô tình commit một tệp video demo nặng 150 MB rồi sau đó xóa đi bằng lệnh `git rm`. Vì Git không bao giờ tự động xóa lịch sử, tệp video đó vẫn nằm nguyên vẹn trong thư mục `.git/objects/`. Kỹ sư đã tiến hành dọn dẹp và giảm 90% dung lượng kho lưu trữ.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Kiểm tra danh sách tệp tin trong thư mục .git\nls -la .git\n\n# Đọc cấu hình cục bộ của kho lưu trữ\ncat .git/config\n\n# Đọc con trỏ nhánh hiện tại\ncat .git/HEAD\n\n# Liệt kê các nhánh cục bộ được lưu trong thư mục refs\nls -la .git/refs/heads\n```\n\n---\n\n## 🔍 Giải thích command\n- `ls -la .git`: Liệt kê danh sách toàn bộ cấu trúc nội tạng của kho lưu trữ, bao gồm cả các tệp ẩn.\n- `cat .git/config`: Đọc nội dung tệp cấu hình INI, cho biết các nhánh tracking và URL remote đang kết nối.\n- `cat .git/HEAD`: In ra đường dẫn tham chiếu của nhánh đang được kiểm xuất (ví dụ: `ref: refs/heads/main`).\n- `ls -la .git/refs/heads`: Liệt kê các tệp đại diện cho các nhánh cục bộ có trong kho.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Xóa nhầm thư mục `.git/` khi muốn dọn dẹp**: Làm mất vĩnh viễn toàn bộ lịch sử commit và các nhánh cục bộ chưa đẩy lên remote.\n2. **Commit nhầm thư mục `.git/` của repo con vào repo cha**: Gây ra tình trạng repo lồng nhau bị lỗi (corrupted submodule indicator).\n3. **Chỉnh sửa tệp nhị phân `.git/index` bằng text editor**: Định dạng nhị phân sẽ bị hỏng khiến lệnh `git status` báo lỗi index corrupted.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Mở terminal trong một kho lưu trữ Git và chạy lệnh `ls -la .git` để quan sát toàn bộ các tệp tin và thư mục con.\n2. **Bước 2**: Chạy lệnh `cat .git/HEAD` để xem nội dung văn bản bên trong con trỏ HEAD.\n3. **Bước 3**: Chạy lệnh `cat .git/config` để xem cách Git lưu trữ thông tin user, repository format và các nhánh.\n4. **Bước 4**: Tạo nhánh mới `git branch feature-test`, sau đó chạy `cat .git/refs/heads/feature-test` để thấy mã SHA-1 của commit đầu nhánh.\n\n---\n\n## 💡 Hint & mẹo\n> Bạn có thể xem tệp `.git/HEAD` hoàn toàn bằng lệnh đọc văn bản thông thường như `cat` vì nó là tệp văn bản ASCII thuần túy chỉ chứa một dòng ngắn gọn.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `cat .git/HEAD` trả về chuỗi có định dạng `ref: refs/heads/<tên_nhánh>`.\n- Tệp `.git/refs/heads/feature-test` hiển thị đúng mã SHA-1 40 ký tự trùng khớp với commit mới nhất trên `git log -1`.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra mức độ nắm bắt của bạn về giải phẫu thư mục .git qua bài trắc nghiệm trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nNếu bạn sao chép duy nhất thư mục `.git/` sang một máy tính hoàn toàn mới (thư mục rỗng) và chạy lệnh `git checkout -f main` hoặc `git restore .`, điều kỳ diệu gì sẽ xảy ra? Hãy giải thích cơ chế phục hồi toàn bộ code từ cơ sở dữ liệu đối tượng.\n\n---\n\n## 📝 Tổng kết\n- Thư mục `.git/` chứa toàn bộ lịch sử, đối tượng và siêu dữ liệu của kho lưu trữ.\n- Các tệp quan trọng gồm: `HEAD` (con trỏ hiện tại), `config` (cấu hình), `index` (staging area).\n- Các thư mục quan trọng gồm: `objects/` (database), `refs/` (nhánh và tag), `hooks/` (kịch bản tự động).\n- Hiểu cấu trúc `.git/` giúp bạn tự tin sao lưu, di chuyển và sửa lỗi kho lưu trữ khi gặp sự cố.\n",
  "quiz": {
    "id": "quiz-08-git-internals-03-dot-git-directory",
    "title": "Trắc nghiệm: Khám phá cấu trúc bên trong thư mục .git",
    "questions": [
      {
        "id": "q1",
        "question": "Tệp .git/HEAD thường chứa nội dung có định dạng như thế nào khi bạn đang ở trên nhánh main?",
        "type": "single",
        "options": [
          {
            "text": "ref: refs/heads/main",
            "correct": true
          },
          {
            "text": "Dãy số nhị phân không đọc được",
            "correct": false
          },
          {
            "text": "Tên tài khoản GitHub của bạn",
            "correct": false
          },
          {
            "text": "Mã băm commit của lần đầu tiên tạo repo",
            "correct": false
          }
        ],
        "explanation": "Tệp HEAD là một symbolic reference trỏ tới tệp tham chiếu nhánh hiện tại dưới dạng văn bản: ref: refs/heads/<branch>."
      },
      {
        "id": "q2",
        "question": "Thư mục nào bên trong .git/ chịu trách nhiệm lưu trữ tất cả các đối tượng Blob, Tree, Commit và Tag?",
        "type": "single",
        "options": [
          {
            "text": ".git/objects/",
            "correct": true
          },
          {
            "text": ".git/refs/",
            "correct": false
          },
          {
            "text": ".git/hooks/",
            "correct": false
          },
          {
            "text": ".git/logs/",
            "correct": false
          }
        ],
        "explanation": "Thư mục objects/ là nơi cư ngụ của Object Database, lưu trữ mọi đối tượng nén bằng thuật toán zlib."
      },
      {
        "id": "q3",
        "question": "Tệp .git/index đại diện cho thành phần kiến trúc nào mà người dùng hay thao tác?",
        "type": "single",
        "options": [
          {
            "text": "Staging Area (vùng chuẩn bị commit)",
            "correct": true
          },
          {
            "text": "Thư mục thùng rác Recycle Bin",
            "correct": false
          },
          {
            "text": "Danh sách các mật khẩu đã lưu",
            "correct": false
          },
          {
            "text": "Chỉ mục tìm kiếm của Google",
            "correct": false
          }
        ],
        "explanation": "Tệp nhị phân index ghi lại danh sách toàn bộ các tệp tin trong Staging Area cùng mã băm SHA-1 và quyền hạn tệp."
      },
      {
        "id": "q4",
        "question": "Điều gì sẽ xảy ra nếu một lập trình viên xóa bỏ hoàn toàn thư mục .git/ khỏi dự án của họ?",
        "type": "single",
        "options": [
          {
            "text": "Mã nguồn hiện tại vẫn còn trên đĩa, nhưng toàn bộ lịch sử commit, nhánh và cấu hình Git đều bị xóa sạch",
            "correct": true
          },
          {
            "text": "Toàn bộ máy tính sẽ bị cài lại hệ điều hành",
            "correct": false
          },
          {
            "text": "Các tệp tin mã nguồn tự động biến mất ngay lập tức",
            "correct": false
          },
          {
            "text": "Không có gì thay đổi vì Git lưu dữ liệu ở đám mây",
            "correct": false
          }
        ],
        "explanation": "Working Directory vẫn còn nguyên, nhưng dự án đã mất đi toàn bộ khả năng theo dõi lịch sử vì linh hồn .git/ đã mất."
      },
      {
        "id": "q5",
        "question": "Tệp tin cấu hình .git/config lưu trữ những thông tin nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Cấu hình riêng của repository như remote URLs, tracking branches, và email/name cục bộ",
            "correct": true
          },
          {
            "text": "Mật khẩu tài khoản ngân hàng của lập trình viên",
            "correct": false
          },
          {
            "text": "Mã nguồn ứng dụng đã biên dịch thành mã máy",
            "correct": false
          },
          {
            "text": "Toàn bộ nội dung của tệp .gitignore",
            "correct": false
          }
        ],
        "explanation": "Tệp .git/config chứa các thông số cấu hình cụ thể cho riêng repository hiện tại theo định dạng INI quen thuộc, bao gồm định nghĩa các remote và nhánh theo dõi."
      }
    ]
  }
};
export default lesson;
