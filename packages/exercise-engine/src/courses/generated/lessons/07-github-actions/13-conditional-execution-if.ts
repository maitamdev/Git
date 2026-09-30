import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-conditional-execution-if",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "13-conditional-execution-if",
    "title": "Thực thi có điều kiện với if: always(), success(), failure()",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "12-job-dependencies-needs"
    ],
    "objectives": [
      "Nắm vững cách sử dụng từ khóa if ở cả cấp độ Job và cấp độ Step để kiểm soát luồng chạy.",
      "Làm chủ 4 hàm kiểm tra trạng thái cốt lõi: success(), failure(), always(), và cancelled().",
      "Hiểu rõ cơ chế mặc định ngầm định: nếu không khai báo hàm trạng thái, GitHub Actions luôn tự động áp dụng success()."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "conditional execution",
      "if statement",
      "status check functions",
      "always",
      "failure"
    ],
    "commands": [
      "echo \"Chạy khi có lỗi\"",
      "echo \"Chạy bất kể kết quả\""
    ]
  },
  "content": "# Thực thi có điều kiện với if: always(), success(), failure()\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững cách sử dụng từ khóa if ở cả cấp độ Job và cấp độ Step để kiểm soát luồng chạy.\n- Làm chủ 4 hàm kiểm tra trạng thái cốt lõi: success(), failure(), always(), và cancelled().\n- Hiểu rõ cơ chế mặc định ngầm định: nếu không khai báo hàm trạng thái, GitHub Actions luôn tự động áp dụng success().\n\n---\n\n## 📖 Định nghĩa\n> Thuộc tính if cho phép bạn ngăn chặn một Job hoặc một Step thực thi trừ khi một điều kiện logic cụ thể được thỏa mãn. Bạn có thể sử dụng bất kỳ biểu thức ngữ cảnh nào kết hợp với các hàm kiểm tra trạng thái đặc biệt của GitHub Actions: `success()` (trả về true khi các bước trước thành công), `failure()` (trả về true khi có ít nhất một bước trước bị lỗi), `always()` (luôn luôn trả về true bất kể kết quả), và `cancelled()` (trả về true khi người dùng bấm hủy workflow).\n\n---\n\n## 🤔 Tại sao cần?\nTrong tự động hóa thực tế, bạn thường xuyên cần thực hiện các hành động dọn dẹp hoặc cứu hộ khi có sự cố xảy ra: ví dụ như gửi tin nhắn thông báo khẩn cấp lên kênh Telegram/Discord khi bài kiểm thử bị hỏng (cần `if: failure()`), hoặc dọn dẹp các thùng chứa tạm thời kể cả khi chương trình bị crash (cần `if: always()`). Thiếu mệnh đề điều kiện, bạn không thể xây dựng các quy trình linh hoạt và có khả năng tự phục hồi.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung hệ thống túi khí an toàn và hệ thống loa thông báo trên xe cứu hỏa. Hệ thống phun nước dập lửa chỉ hoạt động khi đến hiện trường (`if: success()`). Nhưng hệ thống còi báo động khẩn cấp và túi khí chỉ bung ra khi xe gặp sự cố va chạm mạnh (`if: failure()`). Và hệ thống ghi dữ liệu hộp đen hành trình thì luôn luôn ghi âm liên tục trong mọi hoàn cảnh kể cả khi xe nổ lốp (`if: always()`).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nQuyết định thực thi của Step dựa trên Status Check Functions:\nStep 1: Test ──────────► [Bị lỗi ✗]\n                          │\n                          ├─ Step 2: Gửi thông báo lỗi (if: failure())     ──► [Được chạy ✓]\n                          ├─ Step 3: Đóng gói sản phẩm (if: success())     ──► [Bị bỏ qua 🚫]\n                          └─ Step 4: Dọn dẹp máy ảo     (if: always())      ──► [Được chạy ✓]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư thiết lập đường ống kiểm thử tự động cho hệ thống ngân hàng trực tuyến. Khi Job kiểm thử chạy, có 3 bước xử lý kết quả: Step thứ nhất xuất bản gói ứng dụng chỉ khi toàn bộ bài test vượt qua (`if: success()`). Step thứ hai tự động chụp ảnh màn hình lỗi, thu thập tệp nhật ký debug và tải lên kênh hỗ trợ chỉ khi có bài test bị thất bại (`if: failure()`). Step thứ ba gửi yêu cầu tắt máy chủ cơ sở dữ liệu tạm thời để tránh tốn tiền đám mây (`if: always()`). Nhờ các hàm điều kiện chính xác, hệ thống vừa tiết kiệm chi phí vừa cung cấp đầy đủ dữ liệu gỡ lỗi cho lập trình viên.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\necho \"Chạy khi có lỗi\"\necho \"Chạy bất kể kết quả\"\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh trên mô phỏng những khối lệnh đặc thù được bảo vệ bởi mệnh đề điều kiện if, chỉ xuất hiện trong log khi điều kiện trạng thái của phiên chạy thỏa mãn.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nghĩ rằng `if**:  failure()` sẽ chạy ngay cả khi workflow bị người dùng chủ động bấm Cancel (trường hợp này phải dùng `always()` hoặc `cancelled()`).\n2. **Quên rằng mặc định mọi Step đều có ngầm định `if**:  success()` nên viết lặp lại thừa thãi.\n3. **Sử dụng biến môi trường không tồn tại trong mệnh đề điều kiện dẫn đến việc biểu thức luôn bị đánh giá là false.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một bước cố tình gây lỗi bằng lệnh `exit 1`.\n2. Tạo một bước tiếp theo gắn điều kiện `if: failure()` để in ra dòng thông báo cứu hộ.\n3. Tạo bước cuối cùng gắn điều kiện `if: always()` để chứng minh bước này vẫn luôn thực thi.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Khi viết `if: always()`, bước đó sẽ kiên cường thực thi bất kể các bước trước đó thành công, thất bại hay bị hủy bỏ.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nBước gắn `failure()` và bước gắn `always()` đều được thực thi sau khi bước đầu tiên bị lỗi.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nCùng làm bài kiểm tra về các hàm điều kiện trạng thái và từ khóa if trong GitHub Actions.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao việc kết hợp `if: always()` với các bước gửi thông báo lại cần cẩn thận để không vô tình gửi báo cáo thành công giả mạo khi pipeline thực chất đã bị hỏng?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Từ khóa `if` dùng để quyết định xem một Job hoặc Step có được phép chạy hay không.\n- Các hàm trạng thái cốt lõi gồm: `success()`, `failure()`, `always()`, và `cancelled()`.\n- Mặc định nếu không chỉ định, GitHub Actions luôn áp dụng điều kiện ngầm định là `success()`.\n",
  "quiz": {
    "id": "quiz-07-github-actions-13-conditional-execution-if",
    "title": "Trắc nghiệm: Thực thi có điều kiện với if: always(), success(), failure()",
    "questions": [
      {
        "id": "q1",
        "question": "Hàm trạng thái nào giúp một Step chỉ chạy khi có ít nhất một bước trước đó trong Job bị thất bại?",
        "type": "single",
        "options": [
          {
            "text": "failure()",
            "correct": true
          },
          {
            "text": "error()",
            "correct": false
          },
          {
            "text": "failed()",
            "correct": false
          },
          {
            "text": "on_error()",
            "correct": false
          }
        ],
        "explanation": "Hàm `failure()` trả về giá trị `true` khi bất kỳ bước tiên quyết nào trong Job trước đó gặp sự cố thất bại."
      },
      {
        "id": "q2",
        "question": "Điều kiện mặc định cho một Step nếu bạn không khai báo thuộc tính `if:` là gì?",
        "type": "single",
        "options": [
          {
            "text": "success()",
            "correct": true
          },
          {
            "text": "always()",
            "correct": false
          },
          {
            "text": "failure()",
            "correct": false
          },
          {
            "text": "cancelled()",
            "correct": false
          }
        ],
        "explanation": "Mặc định, GitHub Actions luôn tự động áp dụng `success()`, nghĩa là chỉ chạy khi tất cả các bước trước đó đều thành công."
      },
      {
        "id": "q3",
        "question": "Để một bước dọn dẹp luôn luôn được chạy dù các bước trước thành công, thất bại hay bị hủy, ta dùng hàm nào?",
        "type": "single",
        "options": [
          {
            "text": "always()",
            "correct": true
          },
          {
            "text": "forever()",
            "correct": false
          },
          {
            "text": "force()",
            "correct": false
          },
          {
            "text": "run_anyway()",
            "correct": false
          }
        ],
        "explanation": "Hàm `always()` ép buộc bước thực thi trong mọi tình huống, rất lý tưởng cho các tác vụ giải phóng tài nguyên và dọn dẹp."
      },
      {
        "id": "q4",
        "question": "Biểu thức `if: github.event_name == 'push' && success()` có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ chạy khi sự kiện kích hoạt là push và các bước trước đó đều thành công",
            "correct": true
          },
          {
            "text": "Chạy mỗi khi có người mở Pull Request",
            "correct": false
          },
          {
            "text": "Chạy bất kể sự kiện nào nhưng chỉ khi có lỗi",
            "correct": false
          },
          {
            "text": "Từ chối mọi sự kiện push",
            "correct": false
          }
        ],
        "explanation": "Biểu thức kết hợp điều kiện loại sự kiện (`push`) và trạng thái thành công của các bước đi trước bằng toán tử logic `&&`."
      }
    ]
  }
};
export default lesson;
