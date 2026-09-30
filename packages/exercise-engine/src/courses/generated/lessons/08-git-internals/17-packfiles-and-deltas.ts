import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "17-packfiles-and-deltas",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "17-packfiles-and-deltas",
    "title": "Đóng gói Packfiles và nén sai biệt Delta Compression",
    "level": "advanced",
    "duration": 35,
    "xp": 95,
    "prerequisites": [
      "16-object-graph-traversal"
    ],
    "objectives": [
      "Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).",
      "Làm chủ cơ chế nén sai biệt Delta Compression: lưu một phiên bản gốc (base) và các bản vi phân chênh lệch nhỏ.",
      "Sử dụng các lệnh kiểm tra và tạo gói: git verify-pack và git pack-objects."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "packfiles",
      "delta compression",
      "loose objects",
      "git pack",
      "storage optimization"
    ],
    "commands": [
      "git verify-pack -v .git/objects/pack/*.pack",
      "git count-objects -v"
    ]
  },
  "content": "# Đóng gói Packfiles và nén sai biệt Delta Compression\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).\n- Làm chủ cơ chế nén sai biệt Delta Compression: lưu một phiên bản gốc (base) và các bản vi phân chênh lệch nhỏ.\n- Sử dụng các lệnh kiểm tra và tạo gói: git verify-pack và git pack-objects.\n\n---\n\n## 📖 Định nghĩa\n> Ban đầu, Git lưu trữ mỗi đối tượng dưới dạng một tệp nén zlib riêng rẽ trong thư mục .git/objects/ (gọi là Loose Objects). Tuy nhiên, nếu bạn chỉnh sửa một tệp 10 MB cả trăm lần, việc lưu 100 tệp 10 MB sẽ chiếm 1 GB ổ đĩa. Để giải quyết vấn đề này, Git áp dụng cơ chế đóng gói Packfiles (.pack) đi kèm tệp chỉ mục (.idx). Trong Packfile, Git sử dụng thuật toán Nén sai biệt (Delta Compression): nó chọn phiên bản mới nhất làm gốc (Base Object), sau đó chỉ lưu phần chênh lệch (Delta) của các phiên bản cũ hơn.\n\n---\n\n## 🤔 Tại sao cần?\nCơ chế đóng gói Packfile chính là lý do cốt lõi tại sao Git có thể truyền tải toàn bộ lịch sử 15 năm của Linux Kernel với hàng triệu commit qua mạng Internet một cách thần tốc. Thay vì truyền hàng triệu tệp tin nhỏ lẻ qua giao thức mạng gây nghẽn I/O, Git đóng gói tất cả vào một tệp Packfile duy nhất nén cực chặt, giúp giảm dung lượng kho lưu trữ từ vài gigabyte xuống chỉ còn vài chục megabyte mà không làm mất đi bất kỳ bit dữ liệu nào.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng bạn đang lưu trữ 100 bản dự thảo của một bộ hợp đồng pháp lý dài 50 trang. Thay vì in ra 100 tập tài liệu dày cộp riêng lẻ (Loose Objects), bạn in tập hợp đồng hoàn chỉnh mới nhất (Base Object). Đối với 99 bản nháp cũ trước đó, bạn chỉ kẹp một mẩu giấy nhỏ ghi chú rõ ràng: \"Bản nháp 2 chỉ khác bản mới nhất ở dòng số 15 thay chữ A bằng chữ B\" (Delta). Toàn bộ 100 phiên bản hợp đồng được đóng gói gọn gàng vào duy nhất một chiếc vali xách tay an toàn (Packfile).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nChuyển đổi từ Loose Objects sang Packfile với Delta Compression:\nTrước khi đóng gói (Loose Objects):\n[Blob v1: 10 MB]   [Blob v2: 10 MB]   [Blob v3: 10 MB] ──► Tổng: 30 MB đĩa\n\nSau khi đóng gói (Packfile + Delta Compression):\n┌────────────────────────────────────────────────────────┐\n│ PACKFILE (.git/objects/pack/pack-xxx.pack)              │\n│ • Blob v3 (Base): [10 MB dữ liệu hoàn chỉnh mới nhất]   │\n│ • Blob v2 (Delta): [15 KB vi phân so với v3]            │\n│ • Blob v1 (Delta): [12 KB vi phân so với v2]            │\n└────────────────────────────────────────────────────────┘\n──► Tổng dung lượng giảm từ 30 MB xuống còn ~10.03 MB! (Giảm gần 70%)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư kiểm tra một dự án lớn vừa clone từ GitHub về và thấy thư mục `.git/objects/` gần như trống rỗng không có các thư mục con 2 ký tự. Nhìn vào thư mục con `.git/objects/pack/`, kỹ sư thấy một cặp tệp tin: `pack-1a2b3c4d.pack` (nặng 45 MB) và `pack-1a2b3c4d.idx` (nặng 1 MB). Kỹ sư chạy lệnh `git verify-pack -v .git/objects/pack/pack-1a2b3c4d.pack`. Màn hình hiển thị danh sách chi tiết hàng chục nghìn đối tượng được nén chặt, trong đó có những dòng ghi rõ chuỗi phụ thuộc delta: đối tượng A là base, đối tượng B là delta của A với kích thước chỉ 120 bytes. Nhờ Packfile, quá trình clone qua đường truyền mạng diễn ra chỉ trong vài giây.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit verify-pack -v .git/objects/pack/*.pack\ngit count-objects -v\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git count-objects -v báo cáo chi tiết số lượng loose objects và in-pack objects trong kho lưu trữ, trong khi git verify-pack -v phân tích tường tận cấu trúc bên trong tệp packfile nhị phân, hiển thị danh sách các chuỗi delta và tỷ lệ nén tối ưu.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nghĩ rằng Git lưu Delta xuôi từ quá khứ đến hiện tại**:  Trong Packfile, Git lưu phiên bản MỚI NHẤT làm Base đầy đủ và lưu các phiên bản CŨ dưới dạng Delta để tối ưu hóa tốc độ kiểm xuất phiên bản hiện hành.\n2. **Tự ý xóa tệp `.idx` trong thư mục pack**:  Tệp index chỉ mục cho phép Git truy xuất ngẫu nhiên bất kỳ đối tượng nào trong tệp pack nhị phân mà không cần đọc tuần tự từ đầu.\n3. **Lo sợ rằng việc đóng gói packfile sẽ làm thay đổi mã băm SHA-1 của đối tượng**:  Mã băm SHA-1 của đối tượng là vĩnh cửu và không bao giờ đổi dù nó nằm ở dạng loose hay pack.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Chạy lệnh `git count-objects -v` để xem tỷ lệ giữa Loose Objects và Packed Objects.\n2. Sử dụng lệnh `git verify-pack -v .git/objects/pack/*.pack` (nếu có packfile) để quan sát các dòng phân tích delta.\n3. Tìm hiểu cách Git tự động kích hoạt tiến trình đóng gói khi số lượng loose objects vượt ngưỡng.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Bạn có thể chủ động chuyển toàn bộ loose objects vào packfile bất cứ lúc nào bằng lệnh `git gc` hoặc `git repack -d`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nNhận diện được đối tượng Base và các đối tượng Delta từ đầu ra của lệnh verify-pack.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra kiến thức về cơ chế Packfile và nén sai biệt Delta qua bài trắc nghiệm sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao Git lại chọn phiên bản mới nhất của tệp tin làm Base Object nguyên bản thay vì chọn phiên bản đầu tiên của tệp tin khi thực hiện Delta Compression?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Loose Objects lưu tệp nén rời rạc; Packfiles gộp nhiều đối tượng vào một tệp nén tối ưu duy nhất.\n- Delta Compression lưu phiên bản mới nhất làm Base và các phiên bản cũ hơn làm bản vi phân chênh lệch nhỏ.\n- Tệp `.idx` đóng vai trò là bảng mục lục tra cứu nhanh vị trí byte của từng đối tượng trong tệp `.pack`.\n",
  "quiz": {
    "id": "quiz-08-git-internals-17-packfiles-and-deltas",
    "title": "Trắc nghiệm: Đóng gói Packfiles và nén sai biệt Delta Compression",
    "questions": [
      {
        "id": "q1",
        "question": "Trong cơ chế Delta Compression của Packfile, Git chọn phiên bản nào của tệp tin để lưu trữ đầy đủ làm Base Object?",
        "type": "single",
        "options": [
          {
            "text": "Phiên bản mới nhất của tệp tin",
            "correct": true
          },
          {
            "text": "Phiên bản đầu tiên cách đây 10 năm",
            "correct": false
          },
          {
            "text": "Một phiên bản ngẫu nhiên ở giữa",
            "correct": false
          },
          {
            "text": "Không phiên bản nào cả, tất cả đều là delta",
            "correct": false
          }
        ],
        "explanation": "Git ưu tiên tốc độ truy xuất cho phiên bản mới nhất (thường xuyên được checkout nhất), do đó lưu bản mới nhất làm Base đầy đủ."
      },
      {
        "id": "q2",
        "question": "Vai trò của tệp `.idx` (Index File) đi kèm với tệp `.pack` trong thư mục objects/pack/ là gì?",
        "type": "single",
        "options": [
          {
            "text": "Làm bảng chỉ mục cho phép tìm kiếm nhanh vị trí byte chính xác của một đối tượng trong tệp pack khổng lồ",
            "correct": true
          },
          {
            "text": "Chứa danh sách tên người dùng của kho lưu trữ",
            "correct": false
          },
          {
            "text": "Chứa bản dịch tiếng Việt của Git",
            "correct": false
          },
          {
            "text": "Dùng để sao lưu dự phòng khi mất điện",
            "correct": false
          }
        ],
        "explanation": "Tệp `.idx` chứa bảng băm nhị phân giúp Git nhảy thẳng tới offset byte của đối tượng trong tệp `.pack` với độ phức tạp O(log N)."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để kiểm tra chi tiết cấu trúc và các chuỗi delta bên trong một tệp Packfile?",
        "type": "single",
        "options": [
          {
            "text": "git verify-pack -v",
            "correct": true
          },
          {
            "text": "git check-pack",
            "correct": false
          },
          {
            "text": "git unzip-pack",
            "correct": false
          },
          {
            "text": "git inspect-bundle",
            "correct": false
          }
        ],
        "explanation": "`git verify-pack` là lệnh plumbing chuyên dụng để kiểm tra tính toàn vẹn và in cấu trúc chi tiết của tệp Packfile."
      },
      {
        "id": "q4",
        "question": "Khi các đối tượng được đóng gói từ dạng rời rạc (Loose) vào tệp Packfile, mã băm SHA-1 của chúng có bị thay đổi không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không thay đổi",
            "correct": true
          },
          {
            "text": "Có, toàn bộ mã băm bị tính toán lại",
            "correct": false
          },
          {
            "text": "Mã băm bị rút ngắn xuống còn 10 ký tự",
            "correct": false
          },
          {
            "text": "Tùy thuộc vào hệ điều hành",
            "correct": false
          }
        ],
        "explanation": "Mã băm SHA-1 là định danh nội dung bất biến; vị trí lưu trữ trên đĩa (loose hay packed) không bao giờ làm thay đổi mã băm."
      }
    ]
  }
};
export default lesson;
