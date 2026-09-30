import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-tree-object",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "07-tree-object",
    "title": "Đối tượng Tree: Lưu trữ cấu trúc thư mục và quyền tệp",
    "level": "advanced",
    "duration": 35,
    "xp": 95,
    "prerequisites": [
      "06-blob-object"
    ],
    "objectives": [
      "Hiểu rõ bản chất của đối tượng Tree như người quản lý cấu trúc thư mục phân cấp trong Git.",
      "Nắm vững định dạng từng dòng mục (Tree Entry): chế độ quyền tệp (mode), loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.",
      "Khám phá kiến trúc cây Merkle Tree lồng nhau: một đối tượng Tree có thể chứa các đối tượng Tree con (thư mục con) và Blob (tệp con)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "tree object",
      "directory structure",
      "file mode",
      "merkle tree",
      "hierarchy"
    ],
    "commands": [
      "git cat-file -p <tree-hash>",
      "git ls-tree HEAD",
      "git write-tree"
    ]
  },
  "content": "# Đối tượng Tree: Lưu trữ cấu trúc thư mục và quyền tệp\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ bản chất của đối tượng Tree như người quản lý cấu trúc thư mục phân cấp trong Git.\n- Nắm vững định dạng từng dòng mục (Tree Entry): chế độ quyền tệp (mode), loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.\n- Khám phá kiến trúc cây Merkle Tree lồng nhau: một đối tượng Tree có thể chứa các đối tượng Tree con (thư mục con) và Blob (tệp con).\n\n---\n\n## 📖 Định nghĩa\n> Đối tượng Tree (Cây thư mục) trong Git giải quyết bài toán biểu diễn cấu trúc hệ thống tệp tin phân cấp. Một đối tượng Tree đại diện cho một thư mục, bên trong chứa danh sách các bản ghi (entries). Mỗi bản ghi bao gồm 4 thông tin cốt lõi: chế độ quyền tệp (File Mode, ví dụ: 100644 cho tệp thường, 100755 cho tệp thực thi, 040000 cho thư mục con), loại đối tượng (blob hoặc tree), mã băm SHA-1 của đối tượng đó, và tên gọi của tệp hoặc thư mục.\n\n---\n\n## 🤔 Tại sao cần?\nNếu kiến trúc Git chỉ lưu trữ các đối tượng Blob, chúng ta sẽ chỉ sở hữu một kho dữ liệu nội dung thô rời rạc mà không thể biết tệp nào mang tên là gì, nằm trong đường dẫn thư mục nào, hoặc tệp nào được gán quyền thực thi kịch bản hệ điều hành. Đối tượng Tree chính là chất keo kết nối các Blob đơn lẻ lại thành một cây thư mục phân cấp hoàn chỉnh, mô phỏng chính xác 100% trạng thái không gian làm việc của dự án tại thời điểm chụp ảnh nhanh (snapshot), giúp tái tạo lại toàn bộ dự án nguyên vẹn.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng đối tượng Tree như một cuốn sổ mục lục danh bạ thư mục. Mỗi trang sổ đại diện cho một ngăn tủ (Tree). Mở trang sổ ra, bạn thấy từng dòng ghi chú rõ ràng: \"Ngăn nhỏ số 1 (040000 tree abc12): thư mục src\", \"Tài liệu số 2 (100644 blob def34): tệp README.md\". Khi bạn muốn tìm tệp `src/app.ts`, bạn lần theo mục lục từ trang sổ gốc (Root Tree) đi vào trang sổ con (Sub-tree src) rồi mới chạm tới bức thư tay (Blob app.ts).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nCấu trúc cây Merkle Tree phân tầng:\n[Root Tree: a1b2c3d4]\n├── 100644 blob e69de29b README.md\n└── 040000 tree f4a3b1c2 src/\n                          │\n                          ▼ [Sub-Tree src: f4a3b1c2]\n                          ├── 100644 blob 3b18e5f1 app.ts\n                          └── 100755 blob 9a8c7b6d build.sh (Executable)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư muốn khám phá cây thư mục của commit mới nhất trong dự án. Kỹ sư chạy lệnh `git cat-file -p HEAD` để lấy mã băm của đối tượng Tree gốc từ thông tin commit. Sau đó, kỹ sư chạy lệnh `git ls-tree <tree-hash>` và thấy hai dòng bản ghi: dòng thứ nhất hiển thị `100644 blob e69de29b package.json`, dòng thứ hai hiển thị `040000 tree a8b7c6df src`. Kỹ sư tiếp tục chạy `git ls-tree a8b7c6df` để xem nội dung thư mục con `src` và thấy danh sách các tệp mã nguồn bên trong gồm `app.ts` và `utils.ts`. Cấu trúc lồng nhau dạng Merkle Tree này chứng minh Git có thể quản lý cả cây thư mục sâu hàng chục tầng một cách ngăn nắp, tốc độ cao và cực kỳ nhẹ nhàng.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit cat-file -p <tree-hash>\ngit ls-tree HEAD\ngit write-tree\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git ls-tree HEAD in ra danh sách cấu trúc cây thư mục của commit hiện tại, git cat-file -p hiển thị định dạng nội dung thô của đối tượng Tree, và git write-tree đóng gói Staging Area thành đối tượng Tree mới.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cho rằng thư mục trống (Empty Directory) sẽ tạo ra một đối tượng Tree**:  Git không thể theo dõi thư mục trống nếu bên trong không có ít nhất một tệp tin (đó là lý do người ta phải dùng `.gitkeep`).\n2. **Nhầm lẫn giữa quyền hạn tệp đầy đủ của Linux với Git File Mode**:  Git chỉ hỗ trợ một số ít chế độ quyền chuẩn (100644, 100755, 120000 cho symlink, 040000 cho directory).\n3. **Sắp xếp danh sách entry trong Tree sai thứ tự**:  Chuẩn Git bắt buộc các mục trong Tree phải được sắp xếp theo thứ tự mã byte ASCII của tên tệp.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một dự án nhỏ gồm một tệp ở thư mục gốc và một tệp bên trong thư mục con `src/`.\n2. Đưa toàn bộ vào staging bằng lệnh `git add .`.\n3. Chạy lệnh plumbing `git write-tree` để tự sinh ra mã băm của đối tượng Root Tree.\n4. Sử dụng `git cat-file -p <tree-hash>` để quan sát cấu trúc bảng phân nhánh bên trong.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Mã quyền `100755` biểu thị tệp tin có cờ thực thi (executable script), trong khi `100644` là tệp văn bản hoặc nhị phân thông thường.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nNhận diện chính xác các dòng blob và tree con bên trong bảng in ra của lệnh ls-tree.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra khả năng phân tích đối tượng Tree qua bài trắc nghiệm dưới đây.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao Git từ chối theo dõi (track) một thư mục hoàn toàn trống rỗng nếu không có tệp tin nào bên trong?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Đối tượng Tree đại diện cho một thư mục, liên kết các tên tệp với các đối tượng Blob và Tree con.\n- Mỗi bản ghi trong Tree gồm: File Mode, loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.\n- Mô hình cây Merkle Tree giúp Git phát hiện sự thay đổi ở bất kỳ nhánh con nào một cách tức thì.\n",
  "quiz": {
    "id": "quiz-08-git-internals-07-tree-object",
    "title": "Trắc nghiệm: Đối tượng Tree: Lưu trữ cấu trúc thư mục và quyền tệp",
    "questions": [
      {
        "id": "q1",
        "question": "Đối tượng Tree trong cơ sở dữ liệu của Git đại diện cho thành phần nào trong hệ thống tệp tin?",
        "type": "single",
        "options": [
          {
            "text": "Một thư mục (Directory)",
            "correct": true
          },
          {
            "text": "Một tệp tin văn bản",
            "correct": false
          },
          {
            "text": "Một con trỏ nhánh",
            "correct": false
          },
          {
            "text": "Một bài kiểm thử tự động",
            "correct": false
          }
        ],
        "explanation": "Đối tượng Tree ánh xạ trực tiếp tới một thư mục, chứa danh sách các tệp (blobs) và thư mục con (sub-trees)."
      },
      {
        "id": "q2",
        "question": "Mã chế độ quyền tệp tin (File Mode) `100755` trong đối tượng Tree biểu thị điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Tệp tin thông thường có quyền thực thi (Executable file / script)",
            "correct": true
          },
          {
            "text": "Thư mục con",
            "correct": false
          },
          {
            "text": "Tệp tin chỉ đọc",
            "correct": false
          },
          {
            "text": "Tệp tin đã bị xóa",
            "correct": false
          }
        ],
        "explanation": "Git theo dõi cờ thực thi qua mã mode `100755`, trong khi tệp thường không thực thi mang mã `100644`."
      },
      {
        "id": "q3",
        "question": "Lệnh Git nào sau đây cho phép xem nội dung của một đối tượng Tree dưới dạng bảng danh sách tệp trực quan?",
        "type": "single",
        "options": [
          {
            "text": "git ls-tree",
            "correct": true
          },
          {
            "text": "git tree-view",
            "correct": false
          },
          {
            "text": "git list-folder",
            "correct": false
          },
          {
            "text": "git show-dir",
            "correct": false
          }
        ],
        "explanation": "`git ls-tree` là lệnh chuyên dụng để phân tích và in ra bảng danh mục của một đối tượng Tree."
      },
      {
        "id": "q4",
        "question": "Tại sao Git không thể theo dõi một thư mục rỗng?",
        "type": "single",
        "options": [
          {
            "text": "Vì Git theo dõi dữ liệu dựa trên nội dung tệp tin; một thư mục rỗng không có đối tượng Blob nào để tham chiếu",
            "correct": true
          },
          {
            "text": "Vì Git bị lỗi phần mềm chưa khắc phục được",
            "correct": false
          },
          {
            "text": "Vì hệ điều hành Linux cấm tạo thư mục rỗng",
            "correct": false
          },
          {
            "text": "Vì thư mục rỗng làm hỏng thuật toán SHA-1",
            "correct": false
          }
        ],
        "explanation": "Một đối tượng Tree chỉ được tạo ra khi có ít nhất một entry hợp lệ; thư mục rỗng không sinh ra blob nên không thể tạo tree."
      }
    ]
  }
};
export default lesson;
