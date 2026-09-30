import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-steps-execution",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "07-steps-execution",
    "title": "Các bước thực thi (Steps): name, id và thứ tự tuần tự",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "06-jobs-configuration"
    ],
    "objectives": [
      "Nắm vững cấu trúc danh sách steps trong Job và tính chất thực thi tuần tự nghiêm ngặt.",
      "Hiểu rõ công dụng của thuộc tính name (mô tả trực quan) và thuộc tính id (định danh để tham chiếu output).",
      "Nắm được cơ chế dừng khẩn cấp khi một Step thất bại và cách tiếp tục với continue-on-error."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "steps execution",
      "step id",
      "sequential",
      "step name",
      "working directory"
    ],
    "commands": [
      "echo \"Hello Step\"",
      "gh run view --log"
    ]
  },
  "content": "# Các bước thực thi (Steps): name, id và thứ tự tuần tự\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững cấu trúc danh sách steps trong Job và tính chất thực thi tuần tự nghiêm ngặt.\n- Hiểu rõ công dụng của thuộc tính name (mô tả trực quan) và thuộc tính id (định danh để tham chiếu output).\n- Nắm được cơ chế dừng khẩn cấp khi một Step thất bại và cách tiếp tục với continue-on-error.\n\n---\n\n## 📖 Định nghĩa\n> Steps (Các bước) là một mảng tuần tự các tác vụ cụ thể cần thực hiện bên trong một Job. Một Step có thể là một câu lệnh shell đơn giản (dùng từ khóa run) hoặc một hành động được đóng gói sẵn (dùng từ khóa uses). Các Step trong cùng một Job luôn luôn thực thi tuần tự từ trên xuống dưới trên cùng một máy ảo Runner, dùng chung hệ thống tệp tin và các biến môi trường được thiết lập trước đó trong suốt phiên làm việc.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu rõ cơ chế của Step giúp bạn kiểm soát hoàn toàn quy trình xử lý mã nguồn: từ việc tải mã nguồn về đĩa, cài đặt đúng phiên bản ngôn ngữ, chạy kiểm thử cho đến khi dọn dẹp môi trường. Nếu một Step bị lỗi (mã thoát khác 0), mặc định toàn bộ các Step phía sau sẽ bị hủy bỏ ngay lập tức, ngăn ngừa việc tiếp tục xây dựng hoặc phát hành một sản phẩm hỏng.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng các Step như một công thức làm bánh ngọt từng bước trong sách nấu ăn: Bước 1: Đập trứng vào bát; Bước 2: Đánh tan trứng; Bước 3: Cho đường và sữa; Bước 4: Nướng bánh trong lò. Bạn không thể nướng bánh trước khi đập trứng (tính tuần tự). Và nếu ở Bước 1 quả trứng bị ung thối (Step 1 Failed), bạn phải dừng lại ngay lập tức chứ không được phép tiếp tục đổ sữa và nướng.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nJob Runner Container\n┌────────────────────────────────────────────────────────┐\n│ Step 1: actions/checkout@v4       ──► [Thành công ✓]   │\n│       │ (Dữ liệu repo ghi vào ổ đĩa workspace)          │\n│       ▼                                                │\n│ Step 2: npm install               ──► [Thành công ✓]   │\n│       │ (Thư mục node_modules sẵn sàng)                │\n│       ▼                                                │\n│ Step 3: npm test                  ──► [Thất bại ✗]     │\n│       │ (Phát hiện lỗi kiểm thử)                       │\n│       ▼                                                │\n│ Step 4: npm run build             ──► [Bị hủy bỏ 🚫]   │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư cấu hình Job chạy kiểm thử cho ứng dụng Python: Step 1 tải mã nguồn về; Step 2 cài đặt thư viện kiểm thử pytest; Step 3 chạy lệnh pytest tests/ với định danh id: test_run; Step 4 in ra thông báo chúc mừng. Trong lần chạy thử nghiệm, Step 3 phát hiện một lỗi chia cho số 0 và thoát với mã lỗi 1. Toàn bộ Job lập tức chuyển sang trạng thái thất bại màu đỏ và Step 4 hoàn toàn không được gọi. Nhờ cơ chế an toàn này, hệ thống không bao giờ lãng phí thời gian chạy tiếp các bước sau khi lỗi đã xuất hiện.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\necho \"Hello Step\"\ngh run view --log\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh echo minh họa một lệnh shell cơ bản bên trong thuộc tính run của step, và gh run view --log hiển thị chi tiết dòng log xuất ra của từng Step trong phiên chạy để kỹ sư theo dõi diễn biến từng dòng lệnh được thực thi.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Cho rằng mỗi Step chạy trong một thư mục khác nhau**:  Toàn bộ các Step trong một Job đều chạy trong thư mục mặc định github.workspace.\n2. **Thiếu thuộc tính name khiến log hiển thị các dòng lệnh run dài ngoằng rất khó quan sát và chẩn đoán lỗi.**: \n3. **Không đặt thuộc tính id khi cần lấy dữ liệu đầu ra (outputs) của Step đó để sử dụng ở các Step tiếp theo.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Khai báo danh sách `steps` gồm ít nhất 3 bước với tên mô tả `name` rõ ràng bằng tiếng Việt.\n2. Gán thuộc tính `id: step_one` cho bước đầu tiên để làm quen với việc định danh.\n3. Chạy thử nghiệm một lệnh thoát lỗi `exit 1` ở bước 2 để quan sát bước 3 tự động bị bỏ qua.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Luôn đặt tên `name` mô tả hành động (ví dụ: \"Cài đặt dependencies\", \"Biên dịch mã nguồn\") thay vì để trống.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nCác Step thực thi đúng theo thứ tự khai báo và ghi lại log riêng biệt cho từng bước.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng kiểm tra hiểu biết của bạn về cơ chế thực thi của các Step qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để cấu hình một Step vẫn luôn luôn được thực thi (ví dụ: gửi thông báo báo cáo lỗi) kể cả khi các Step trước đó bị thất bại?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Các Step trong Job luôn thực thi tuần tự từ trên xuống dưới trên cùng một Runner.\n- Nếu một Step gặp lỗi (exit code khác 0), mặc định các Step tiếp theo sẽ bị hủy bỏ ngay lập tức.\n- Mỗi Step có thể gán `name` để hiển thị trực quan và `id` để tham chiếu dữ liệu đầu ra.\n",
  "quiz": {
    "id": "quiz-07-github-actions-07-steps-execution",
    "title": "Trắc nghiệm: Các bước thực thi (Steps): name, id và thứ tự tuần tự",
    "questions": [
      {
        "id": "q1",
        "question": "Thứ tự thực thi của các Step bên trong một Job được quyết định như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Tuần tự lần lượt từ trên xuống dưới theo thứ tự khai báo trong tệp YAML",
            "correct": true
          },
          {
            "text": "Chạy song song cùng lúc",
            "correct": false
          },
          {
            "text": "Theo thứ tự bảng chữ cái của tên Step",
            "correct": false
          },
          {
            "text": "Ngẫu nhiên tùy theo tải của máy chủ",
            "correct": false
          }
        ],
        "explanation": "Các Step trong một Job luôn tuân thủ nguyên tắc thực thi tuần tự từ trên xuống dưới."
      },
      {
        "id": "q2",
        "question": "Điều gì xảy ra với các Step phía sau nếu một Step bị lỗi (exit code khác 0)?",
        "type": "single",
        "options": [
          {
            "text": "Mặc định toàn bộ các Step phía sau sẽ bị hủy bỏ (skipped) và Job báo thất bại",
            "correct": true
          },
          {
            "text": "Hệ thống tự động khởi động lại máy tính của lập trình viên",
            "correct": false
          },
          {
            "text": "Các Step phía sau vẫn chạy bình thường như không có gì xảy ra",
            "correct": false
          },
          {
            "text": "Toàn bộ kho lưu trữ GitHub bị khóa tạm thời",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions có cơ chế Fail-fast: khi một bước bị lỗi, các bước sau sẽ không được chạy để tránh hậu quả sai lệch."
      },
      {
        "id": "q3",
        "question": "Thuộc tính nào giúp một Step vẫn tiếp tục chạy mà không làm dừng Job kể cả khi lệnh bên trong bị lỗi?",
        "type": "single",
        "options": [
          {
            "text": "continue-on-error: true",
            "correct": true
          },
          {
            "text": "ignore-failure: true",
            "correct": false
          },
          {
            "text": "allow-crash: true",
            "correct": false
          },
          {
            "text": "force-run: true",
            "correct": false
          }
        ],
        "explanation": "`continue-on-error: true` cho phép Job tiếp tục chạy các bước sau dù bước hiện tại trả về mã lỗi thất bại."
      },
      {
        "id": "q4",
        "question": "Mục đích chính của thuộc tính `id` trong một Step là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đặt tên định danh để các Step sau có thể truy cập biến đầu ra (outputs) của Step này",
            "correct": true
          },
          {
            "text": "Để GitHub trừ tiền vào tài khoản người dùng",
            "correct": false
          },
          {
            "text": "Để mã hóa tệp tin chứa mã nguồn",
            "correct": false
          },
          {
            "text": "Bắt buộc phải có thì Step mới chạy được",
            "correct": false
          }
        ],
        "explanation": "Gán `id` cho Step giúp bạn có thể tham chiếu các giá trị output qua cú pháp `${{ steps.my_id.outputs.my_var }}`."
      }
    ]
  }
};
export default lesson;
