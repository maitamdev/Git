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
  "content": "# Khám phá cấu trúc bên trong thư mục .git\n\n---\n\n## 🎯 Mục tiêu bài học\n- Giải mã toàn bộ các tệp tin và thư mục cốt lõi bên trong thư mục quản trị .git/.\n- Hiểu rõ chức năng của từng thành phần: HEAD, config, description, index, objects/, refs/, hooks/, info/.\n- Nhận thức được rằng một kho lưu trữ Git hoàn chỉnh chỉ là một thư mục bình thường chứa thư mục con .git/.\n\n---\n\n## 📖 Định nghĩa\n> Thư mục .git/ là trái tim và linh hồn của mọi kho lưu trữ Git. Đây là một thư mục ẩn nằm ở vị trí cao nhất của cây thư mục làm việc, chứa toàn bộ siêu dữ liệu, lịch sử commit, các đối tượng nhị phân, cấu hình người dùng và con trỏ nhánh. Nếu bạn xóa thư mục .git/, toàn bộ lịch sử quản lý phiên bản sẽ biến mất và dự án của bạn trở thành một thư mục tệp tin thông thường không có Version Control.\n\n---\n\n## 🤔 Tại sao cần?\nHầu hết các kỹ sư xem thư mục .git/ như một chiếc hộp đen ma thuật cấm kỵ và không bao giờ dám mở ra xem. Tuy nhiên, khi bạn thấu hiểu tường tận từng tệp tin và thư mục bên trong chiếc hộp đen đó: bạn biết cách sửa tệp .git/config để đổi URL remote mà không cần gõ lệnh dài dòng, biết đọc tệp .git/HEAD để biết chính xác con trỏ đang ở đâu, và biết cách sao lưu toàn vẹn toàn bộ dự án bằng cách nén duy nhất thư mục .git/. Nhờ đó, bạn hoàn toàn làm chủ hệ thống lưu trữ và tự tin ứng phó với mọi tình huống khẩn cấp.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung thư mục dự án của bạn như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu trên bàn là Working Directory (nơi bạn làm việc hàng ngày). Còn thư mục `.git/` chính là căn phòng lưu trữ hồ sơ tài liệu mật nằm ở góc phòng: có tủ đựng hồ sơ lịch sử (`objects/`), bảng danh bạ nhân viên (`config`), chiếc bảng ghim vị trí công việc hiện tại (`HEAD`), và ngăn kéo chứa các bản thảo chờ đóng dấu (`index`).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nCấu trúc giải phẫu thư mục .git/:\n.git/\n├── HEAD              <── Tệp văn bản trỏ tới branch hiện hành (ref: refs/heads/main)\n├── config            <── Tệp cấu hình cục bộ của kho lưu trữ (remotes, user)\n├── description       <── Tệp mô tả dự án dùng cho GitWeb\n├── index             <── Tệp nhị phân Staging Area (lưu cache của cây thư mục)\n├── objects/          <── Cơ sở dữ liệu đối tượng (Object Store: xx/yyyyzz)\n│   ├── info/\n│   └── pack/         <── Chứa các tệp nén packfiles và chỉ mục index\n├── refs/             <── Danh mục các con trỏ tham chiếu\n│   ├── heads/        <── Nhánh cục bộ (main, feature)\n│   ├── tags/         <── Thẻ phiên bản (v1.0.0)\n│   └── remotes/      <── Nhánh theo dõi từ xa (origin/main)\n└── hooks/            <── Kịch bản tự động kích hoạt trước/sau sự kiện\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư clone một dự án mã nguồn mở có dung lượng mã nguồn là 10 MB nhưng nhận thấy thư mục `.git/` nặng tới 200 MB. Tò mò mở khám phá cấu trúc bên trong, kỹ sư kiểm tra thư mục `.git/objects/pack/` và phát hiện một tệp `.pack` khổng lồ. Sử dụng các công cụ kiểm tra, kỹ sư phát hiện ra rằng trong quá khứ, một lập trình viên cũ đã vô tình commit một tệp video demo nặng 150 MB rồi sau đó xóa đi bằng lệnh git rm. Vì Git không bao giờ tự động xóa lịch sử, tệp video đó vẫn nằm nguyên vẹn trong thư mục `.git/objects/`. Kỹ sư đã tiến hành dọn dẹp và giảm 90% dung lượng kho lưu trữ.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\nls -la .git\ncat .git/config\ncat .git/HEAD\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh ls -la .git liệt kê danh sách toàn bộ cấu trúc nội tạng của kho lưu trữ, cat .git/config đọc nội dung tệp cấu hình INI, và cat .git/HEAD in ra đường dẫn tham chiếu của nhánh đang được kiểm xuất.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Xóa nhầm thư mục .git/ khi muốn dọn dẹp dự án, làm mất trắng toàn bộ lịch sử commit và các nhánh chưa đẩy lên server.**: \n2. **Commit nhầm cả thư mục .git/ của một dự án con vào trong dự án cha (hiện tượng nested repo hoặc submodule lỗi).**: \n3. **Chỉnh sửa tùy tiện tệp nhị phân .git/index bằng text editor thông thường làm hỏng cấu trúc Staging Area.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Sử dụng lệnh `cd .git` để trực tiếp bước vào bên trong thư mục quản trị.\n2. Sử dụng lệnh `cat HEAD` để xem nội dung văn bản bên trong con trỏ HEAD.\n3. Xem nội dung tệp `config` để quan sát cách Git lưu thông tin remote origin và branch.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Bạn có thể xem tệp `.git/HEAD` hoàn toàn bằng lệnh đọc văn bản thông thường như `cat` vì nó là tệp văn bản ASCII thuần túy.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nĐọc và giải thích được ý nghĩa nội dung của ít nhất 4 tệp tin/thư mục bên trong `.git/`.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra mức độ nắm bắt của bạn về giải phẫu thư mục .git qua bài trắc nghiệm sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nNếu bạn sao chép duy nhất thư mục .git/ sang một máy tính hoàn toàn mới và chạy lệnh git restore ., điều kỳ diệu gì sẽ xảy ra?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Thư mục `.git/` chứa toàn bộ lịch sử, đối tượng và siêu dữ liệu của kho lưu trữ.\n- Các tệp quan trọng gồm: `HEAD` (con trỏ hiện tại), `config` (cấu hình), `index` (staging area).\n- Các thư mục quan trọng gồm: `objects/` (database), `refs/` (nhánh và tag), `hooks/` (kịch bản tự động).\n",
  "quiz": {
    "id": "quiz-08-git-internals-03-dot-git-directory",
    "title": "Trắc nghiệm: Khám phá cấu trúc bên trong thư mục .git",
    "questions": [
      {
        "id": "q1",
        "question": "Tệp `.git/HEAD` thường chứa nội dung có định dạng như thế nào khi bạn đang ở trên nhánh main?",
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
        "explanation": "Tệp `HEAD` là một symbolic reference trỏ tới tệp tham chiếu nhánh hiện tại dưới dạng văn bản: `ref: refs/heads/<branch>`."
      },
      {
        "id": "q2",
        "question": "Thư mục nào bên trong `.git/` chịu trách nhiệm lưu trữ tất cả các đối tượng Blob, Tree, Commit và Tag?",
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
        "explanation": "Thư mục `objects/` là nơi cư ngụ của Object Database, lưu trữ mọi đối tượng nén bằng thuật toán zlib."
      },
      {
        "id": "q3",
        "question": "Tệp `.git/index` đại diện cho thành phần kiến trúc nào mà người dùng hay thao tác?",
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
        "explanation": "Tệp nhị phân `index` ghi lại danh sách toàn bộ các tệp tin trong Staging Area cùng mã băm SHA-1 và quyền hạn tệp."
      },
      {
        "id": "q4",
        "question": "Điều gì sẽ xảy ra nếu một lập trình viên xóa bỏ hoàn toàn thư mục `.git/` khỏi dự án của họ?",
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
        "explanation": "Working Directory vẫn còn nguyên, nhưng dự án đã mất đi toàn bộ khả năng theo dõi lịch sử vì linh hồn `.git/` đã mất."
      }
    ]
  }
};
export default lesson;
