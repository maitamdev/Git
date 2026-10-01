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
  "content": "# Phân biệt run (shell command) vs uses (prebuilt action)\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng mục đích sử dụng giữa lệnh shell tự do (`run`) và hành động đóng gói sẵn (`uses`).\n- Hiểu cú pháp tham chiếu action với phiên bản: `owner/repo@version` (ví dụ: `actions/checkout@v4`).\n- Biết cách truyền tham số cấu hình cho Action thông qua từ khóa `with`.\n\n## 🧩 Từ khóa hôm nay\n### run Command\n- **Nói dễ hiểu**: Từ khóa để gõ và chạy trực tiếp các câu lệnh dòng lệnh terminal trong hệ điều hành của máy ảo Runner.\n- **Ví dụ**: Dùng `run: npm test` để chạy bộ bài kiểm thử hoặc `run: ls -la` để xem thư mục.\n- **Đừng nhầm**: Chạy với shell mặc định của máy ảo (Bash trên Linux/macOS, PowerShell trên Windows).\n\n### uses Action\n- **Nói dễ hiểu**: Từ khóa để gọi và tái sử dụng một Action có sẵn do cộng đồng hoặc GitHub đóng gói trên Marketplace.\n- **Ví dụ**: Dùng `uses: actions/checkout@v4` để kéo mã nguồn về máy ảo mà không cần tự viết lệnh clone.\n- **Đừng nhầm**: Bắt buộc phải có hậu tố phiên bản `@v4` hoặc commit SHA để cố định hành vi của action.\n\n### with Parameters\n- **Nói dễ hiểu**: Khối dữ liệu khai báo các tham số đầu vào (inputs) truyền vào cho một Action được gọi bằng `uses`.\n- **Ví dụ**: Dùng `with: { node-version: '20' }` để thông báo cho `actions/setup-node` biết cần cài Node.js bản nào.\n- **Đừng nhầm**: Chỉ dùng với `uses`; không thể dùng `with` với câu lệnh `run`.\n\n## 📖 Định nghĩa\nTrong định nghĩa của một Step, bạn có hai phương thức chính để thực thi công việc: `run` và `uses`. Từ khóa `run` dùng để chạy trực tiếp các câu lệnh shell trên hệ điều hành của Runner. Trong khi đó, `uses` dùng để gọi và thực thi một Action đã được đóng gói sẵn từ GitHub Marketplace hoặc từ nội bộ dự án theo định dạng chuẩn `owner/repo@ref`.\n\n## 💡 Tại sao cần\nNếu không có Action đóng gói sẵn (`uses`), bạn phải tự viết hàng chục dòng lệnh shell phức tạp: tự clone mã nguồn có xác thực token, tự giải nén runtime, tự xử lý khác biệt giữa Linux và Windows. Sử dụng `uses` giúp kịch bản ngắn gọn, đạt chuẩn thực hành tốt nhất của ngành và dễ dàng nâng cấp bảo trì.\n\n## 🧠 Mental Model\nHãy so sánh việc tự tay nấu ăn tại nhà (`run`) với việc mua một gói thực phẩm chế biến sẵn (`uses`). Với `run`, bạn tự nhào bột, nêm gia vị và nướng bằng lò (toàn quyền kiểm soát từng chi tiết nhưng tốn nhiều công sức). Với `uses`, bạn bóc gói và làm theo hướng dẫn in trên bao bì (`with`) của các chuyên gia ẩm thực quốc tế mà không lo bị cháy.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart LR\n    Step[Một Step trong Job] --> Choice{Phương thức thực thi}\n    Choice -- run --> Shell[Thực thi lệnh Terminal: npm test, bash script]\n    Choice -- uses --> Prebuilt[Gọi Action đóng gói: actions/checkout@v4]\n    Prebuilt --> With[Truyền tham số qua with: node-version: 20]\n```\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư xây dựng kịch bản kiểm thử cho dự án TypeScript. Bước đầu tiên, kỹ sư dùng `uses: actions/checkout@v4` để tải mã nguồn về máy ảo. Bước thứ hai, kỹ sư dùng `uses: actions/setup-node@v4` kèm `with: { node-version: '20', cache: 'npm' }` để vừa cài Node vừa lưu cache thư viện. Đến bước thứ ba, kỹ sư chuyển sang dùng `run: npm test` để chạy bộ kiểm thử riêng của dự án. Sự kết hợp nhịp nhàng giữa `uses` (chuẩn bị hạ tầng) và `run` (chạy nghiệp vụ) tạo nên pipeline mẫu mực.\n\n## 💻 Command & Cú pháp\n```bash\n# Minh họa lệnh shell chạy trong run\nnode --version\nnpm test\n\n# Kiểm tra mã nguồn đã được tải về bởi actions/checkout chưa\nls -la\n```\n\n## 🔍 Giải thích command\n- `node --version`: Lệnh kiểm tra phiên bản môi trường thực thi đã được cài đặt thành công bởi action setup-node.\n- `npm test`: Lệnh thực thi bài kiểm thử ứng dụng thông qua từ khóa `run` của step.\n- `ls -la`: Xác nhận toàn bộ tệp tin trong repository đã được kéo về thư mục làm việc của máy ảo.\n\n## ⚠️ Sai lầm phổ biến\n- Quên ghim phiên bản cụ thể (`@v4`) cho action trong `uses`, khiến workflow dễ bị lỗi khi tác giả cập nhật bản mới.\n- Dùng `run` để tự viết lại những tác vụ phức tạp đã có sẵn action chuẩn mực như checkout hay upload-artifact.\n- Đặt nhầm các tham số cấu hình của Action ngang hàng với `uses` thay vì đặt thụt dòng bên trong khối `with`.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Khởi tạo một tệp workflow kết hợp cả `uses` và `run`:\n   ```yaml\n   name: Run vs Uses Demo\n   on: [push]\n   jobs:\n     build:\n       runs-on: ubuntu-latest\n       steps:\n         - name: Tải mã nguồn\n           uses: actions/checkout@v4\n         - name: Cài đặt môi trường Node.js\n           uses: actions/setup-node@v4\n           with:\n             node-version: '20'\n         - name: Chạy lệnh kiểm tra phiên bản\n           run: |\n             echo \"Phiên bản Node hiện tại:\"\n             node -v\n             npm -v\n   ```\n2. Đẩy commit lên GitHub và vào tab Actions để kiểm tra.\n3. Quan sát log xem action `setup-node` cài đặt Node 20 và bước `run` in ra phiên bản tương ứng.\n\n## 💡 Hint & mẹo\n- Luôn sử dụng `actions/checkout@v4` làm bước đầu tiên trong mọi Job cần thao tác với mã nguồn dự án.\n- Sử dụng ký tự thanh dọc `|` sau `run:` để viết nhiều câu lệnh shell liên tiếp một cách rõ ràng.\n\n## ✅ Validation & Kết quả mong đợi\n- Tệp tin của repository xuất hiện trong thư mục làm việc của Runner sau bước checkout.\n- Lệnh `node -v` in ra phiên bản v20.x chuẩn xác trong console log của GitHub Actions.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ phân biệt giữa `run` và `uses`.\n\n## 🚀 Thử thách nâng cao\nTìm hiểu tại sao các hệ thống tài chính yêu cầu ghim Action bằng mã băm commit SHA đầy đủ (ví dụ `actions/checkout@b4ffde52`) thay vì dùng thẻ tag `@v4` để phòng chống tấn công chuỗi cung ứng (Supply Chain Attack).\n\n## 📝 Tổng kết\n- `run` dùng để thực thi trực tiếp các câu lệnh shell trên hệ điều hành của Runner.\n- `uses` dùng để gọi các Action đóng gói sẵn từ Marketplace theo cú pháp `owner/repo@version`.\n- Sử dụng khối `with:` để truyền các tham số cấu hình đầu vào cho Action.\n",
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
      },
      {
        "id": "q5",
        "question": "Để viết nhiều dòng lệnh shell liên tiếp trong một Step sử dụng từ khóa `run:`, bạn sử dụng ký tự nào trong cú pháp YAML?",
        "type": "single",
        "options": [
          {
            "text": "Ký tự thanh dọc `|` (Pipe block scalar)",
            "correct": true
          },
          {
            "text": "Ký tự dấu hoa thị `*`",
            "correct": false
          },
          {
            "text": "Ký tự dấu phần trăm `%`",
            "correct": false
          },
          {
            "text": "Ký tự dấu thăng `#`",
            "correct": false
          }
        ],
        "explanation": "Trong YAML, ký tự thanh dọc `|` cho phép viết một đoạn văn bản nhiều dòng giữ nguyên định dạng ngắt dòng, rất lý tưởng để viết shell script phức tạp."
      }
    ]
  }
};
export default lesson;
