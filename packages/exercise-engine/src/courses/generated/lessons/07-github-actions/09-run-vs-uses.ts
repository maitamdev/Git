import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-run-vs-uses",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "09-run-vs-uses",
    "title": "Phân biệt run (shell command) vs uses (prebuilt action)",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "08-runners-environment"
    ],
    "objectives": [
      "Phân biệt rõ ràng mục đích sử dụng giữa lệnh shell tự do (run) và hành động đóng gói sẵn (uses).",
      "Hiểu cú pháp tham chiếu action với phiên bản: owner/repo@version (ví dụ: actions/checkout@v4).",
      "Biết cách truyền tham số cấu hình cho Action thông qua từ khóa with."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "run",
      "uses",
      "action",
      "shell command",
      "marketplace"
    ],
    "commands": [
      "git clone",
      "node --version",
      "npm test"
    ]
  },
  "content": "# Phân biệt run (shell command) vs uses (prebuilt action)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Phân biệt rõ ràng mục đích sử dụng giữa lệnh shell tự do (run) và hành động đóng gói sẵn (uses).\n- Hiểu cú pháp tham chiếu action với phiên bản: owner/repo@version (ví dụ: actions/checkout@v4).\n- Biết cách truyền tham số cấu hình cho Action thông qua từ khóa with.\n\n---\n\n## 📖 Định nghĩa\n> Trong định nghĩa của một Step, bạn có hai phương thức chính để thực thi công việc: run và uses. Từ khóa run được sử dụng để chạy trực tiếp các câu lệnh shell (bash, sh, powershell, cmd) trên hệ điều hành của Runner. Trong khi đó, từ khóa uses được sử dụng để gọi và thực thi một Hành động (Action) đã được đóng gói sẵn từ GitHub Marketplace hoặc từ nội bộ dự án, tuân theo định dạng chuẩn owner/repo@ref với đầy đủ tham số cấu hình đầu vào.\n\n---\n\n## 🤔 Tại sao cần?\nNếu không có các Action đóng gói sẵn (uses), bạn sẽ phải tự viết hàng chục dòng lệnh shell phức tạp để thiết lập môi trường: tự tải mã nguồn qua git clone có xác thực token, tự cài đặt và giải nén Node.js, tự cấu hình biến môi trường và xử lý lỗi đa nền tảng. Sử dụng uses giúp kịch bản workflow ngắn gọn, đạt chuẩn thực hành tốt nhất của ngành, nâng cao tính bảo mật và giúp mã nguồn dễ bảo trì, dễ dàng nâng cấp trong suốt vòng đời dự án phần mềm lâu dài.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy so sánh việc tự tay làm một chiếc bánh pizza thơm ngon tại nhà (run) với việc mua một hộp pizza cao cấp được chế biến sẵn từ siêu thị (uses). Với phương thức run, bạn tự nhào bột, tự nêm nếm gia vị và nướng bằng chiếc lò của mình (bạn có toàn quyền kiểm soát từng chi tiết nhỏ nhưng rất tốn công sức). Với phương thức uses, bạn chỉ việc bóc hộp cho vào lò theo đúng hướng dẫn chuẩn xác in trên bao bì (khối with) của các chuyên gia đầu bếp quốc tế chuyên nghiệp.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nStep Execution Method:\n┌──────────────────────────────────────────┬──────────────────────────────────────────┐\n│ run: Shell Commands                      │ uses: Prebuilt Actions                   │\n├──────────────────────────────────────────┼──────────────────────────────────────────┤\n│ - name: Chạy kiểm thử                    │ - name: Cài đặt Node.js                  │\n│   run: |                                 │   uses: actions/setup-node@v4            │\n│     npm install                          │   with:                                  │\n│     npm test                             │     node-version: 20                     │\n│ • Tự viết lệnh dòng lệnh cụ thể          │ • Tái sử dụng thư viện đóng gói sẵn      │\n│ • Linh hoạt, trực tiếp                   │ • Đơn giản, an toàn, chuẩn hóa           │\n└──────────────────────────────────────────┴──────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư xây dựng kịch bản kiểm thử cho dự án TypeScript. Bước đầu tiên, kỹ sư sử dụng uses: actions/checkout@v4 để tải mã nguồn kho lưu trữ về máy ảo. Bước thứ hai, kỹ sư sử dụng uses: actions/setup-node@v4 kèm theo tham số with: { node-version: 18, cache: 'npm' } để vừa cài đặt Node.js vừa tự động lưu bộ đệm các thư viện. Đến bước thứ ba, khi cần chạy bài kiểm thử nội bộ đặc thù của dự án, kỹ sư chuyển sang dùng run: npm test. Sự kết hợp nhịp nhàng giữa uses (chuẩn bị hạ tầng) và run (thực thi nghiệp vụ riêng) tạo nên một pipeline mẫu mực.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit clone\nnode --version\nnpm test\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh trên phản ánh những tác vụ thực tế: sao chép mã nguồn, kiểm tra phiên bản runtime môi trường và chạy bộ kiểm thử dự án nhằm đảm bảo hệ thống phần mềm hoạt động chính xác trước khi chuyển sang giai đoạn phát hành.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Quên ghim phiên bản cụ thể (@v4) cho action trong uses, khiến workflow dễ bị lỗi khi tác giả cập nhật phiên bản mới làm hỏng tính tương thích.**: \n2. **Sử dụng run để tự viết lại những tác vụ phức tạp đã có sẵn action chuẩn mực như checkout hay upload-artifact.**: \n3. **Đặt nhầm các tham số cấu hình của Action ngang hàng với uses thay vì đặt bên trong khối `with**: `.\n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một Step sử dụng action đóng gói sẵn `actions/checkout@v4`.\n2. Tạo một Step sử dụng `actions/setup-node@v4` và cấu hình phiên bản Node 20 bằng khóa `with:`.\n3. Tạo một Step sử dụng `run:` để in ra phiên bản `node -v` và `npm -v`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Luôn luôn sử dụng `actions/checkout@v4` làm bước đầu tiên trong hầu hết các Job cần thao tác với mã nguồn dự án.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nMã nguồn được tải về chính xác và phiên bản Node.js hiển thị đúng như đã cấu hình.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng phân biệt và ứng dụng chính xác giữa run và uses qua bài kiểm tra dưới đây.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao các chuyên gia bảo mật khuyến nghị nên ghim action bằng mã băm commit SHA đầy đủ thay vì dùng thẻ tag phiên bản (@v4) trong các dự án quan trọng?\n\n---\n\n## 📚 Tổng kết kiến thức\n- `run` dùng để thực thi trực tiếp các câu lệnh shell trên hệ điều hành của Runner.\n- `uses` dùng để gọi các Action đóng gói sẵn từ Marketplace theo cú pháp `owner/repo@version`.\n- Sử dụng khối `with:` để truyền các tham số cấu hình đầu vào (inputs) cho Action.\n",
  "quiz": {
    "id": "quiz-07-github-actions-09-run-vs-uses",
    "title": "Trắc nghiệm: Phân biệt run (shell command) vs uses (prebuilt action)",
    "questions": [
      {
        "id": "q1",
        "question": "Từ khóa nào được sử dụng để thực thi một câu lệnh dòng lệnh shell trực tiếp trong Step?",
        "type": "single",
        "options": [
          {
            "text": "run",
            "correct": true
          },
          {
            "text": "uses",
            "correct": false
          },
          {
            "text": "exec",
            "correct": false
          },
          {
            "text": "shell",
            "correct": false
          }
        ],
        "explanation": "Từ khóa `run:` cho phép bạn nhập các câu lệnh shell trực tiếp như `npm install` hay `echo \"hello\"`."
      },
      {
        "id": "q2",
        "question": "Cú pháp chuẩn để gọi một Action từ GitHub Marketplace là gì?",
        "type": "single",
        "options": [
          {
            "text": "owner/repo@ref (ví dụ: actions/checkout@v4)",
            "correct": true
          },
          {
            "text": "https://github.com/action.zip",
            "correct": false
          },
          {
            "text": "import action from marketplace",
            "correct": false
          },
          {
            "text": "npm install @actions/checkout",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions định danh các action bằng đường dẫn kho lưu trữ kèm thẻ phiên bản hoặc commit hash: `owner/repo@ref`."
      },
      {
        "id": "q3",
        "question": "Từ khóa nào được sử dụng để truyền các tham số đầu vào cho một Action gọi bằng uses?",
        "type": "single",
        "options": [
          {
            "text": "with",
            "correct": true
          },
          {
            "text": "args",
            "correct": false
          },
          {
            "text": "params",
            "correct": false
          },
          {
            "text": "inputs",
            "correct": false
          }
        ],
        "explanation": "Khối `with:` chứa danh sách các cặp key-value đóng vai trò là tham số đầu vào (inputs) cung cấp cho Action."
      },
      {
        "id": "q4",
        "question": "Nếu trong một Job bạn không sử dụng `actions/checkout`, điều gì sẽ xảy ra trong thư mục làm việc của Runner?",
        "type": "single",
        "options": [
          {
            "text": "Thư mục làm việc sẽ hoàn toàn trống rỗng, không có mã nguồn của dự án",
            "correct": true
          },
          {
            "text": "Toàn bộ mã nguồn tự động xuất hiện sẵn",
            "correct": false
          },
          {
            "text": "Máy ảo Runner sẽ tự động tải mã nguồn từ Google Drive",
            "correct": false
          },
          {
            "text": "Job sẽ tự động bị từ chối chạy",
            "correct": false
          }
        ],
        "explanation": "Máy ảo Runner khi mới khởi động hoàn toàn sạch sẽ, bạn bắt buộc phải gọi action checkout để kéo mã nguồn về ổ đĩa."
      }
    ]
  }
};
export default lesson;
