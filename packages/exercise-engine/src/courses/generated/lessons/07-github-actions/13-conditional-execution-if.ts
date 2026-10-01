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
  "content": "# Thực thi có điều kiện với if: always(), success(), failure()\n\n## 🎯 Mục tiêu\n- Nắm vững cách sử dụng từ khóa `if` ở cả cấp độ Job và cấp độ Step để kiểm soát luồng chạy.\n- Làm chủ 4 hàm kiểm tra trạng thái cốt lõi: `success()`, `failure()`, `always()`, và `cancelled()`.\n- Hiểu rõ cơ chế mặc định ngầm định: nếu không khai báo hàm trạng thái, GitHub Actions luôn tự động áp dụng `success()`.\n\n## 🧩 Từ khóa hôm nay\n### if Condition\n- **Nói dễ hiểu**: Thuộc tính điều kiện quyết định xem một Job hoặc Step có được phép chạy hay bị bỏ qua.\n- **Ví dụ**: Dùng `if: github.ref == 'refs/heads/main'` để chỉ chạy bước deploy khi đang ở nhánh chính.\n- **Đừng nhầm**: Không bắt buộc phải bao bọc bằng cặp dấu ngoặc `${{ }}` bên trong từ khóa `if:`.\n\n### success() vs failure()\n- **Nói dễ hiểu**: Hai hàm kiểm tra trạng thái; `success()` chỉ chạy khi các bước trước đều tốt, còn `failure()` chỉ chạy khi có ít nhất một bước bị lỗi.\n- **Ví dụ**: Bước gửi thông báo lỗi tới Telegram chỉ kích hoạt khi `if: failure()`.\n- **Đừng nhầm**: Mặc định mọi bước đều ngầm định mang `success()`; nếu không ghi gì thì có lỗi là các bước sau dừng lại.\n\n### always() Function\n- **Nói dễ hiểu**: Hàm điều kiện ép buộc bước đó luôn luôn được thực thi trong mọi tình huống, kể cả khi các bước trước bị hỏng hay bị hủy.\n- **Ví dụ**: Bước xóa các tệp nháp và giải phóng container cơ sở dữ liệu tạm thời dùng `if: always()`.\n- **Đừng nhầm**: Cần cẩn trọng khi dùng `always()` cho thông báo để tránh gửi nhầm thông điệp thành công khi build bị lỗi.\n\n## 📖 Định nghĩa\nThuộc tính `if` cho phép bạn ngăn chặn một Job hoặc Step thực thi trừ khi một điều kiện logic cụ thể được thỏa mãn. Bạn có thể sử dụng bất kỳ biểu thức ngữ cảnh nào kết hợp với các hàm kiểm tra trạng thái đặc biệt: `success()` (thành công), `failure()` (có lỗi trước đó), `always()` (luôn luôn chạy) và `cancelled()` (bị hủy bỏ giữa chừng).\n\n## 💡 Tại sao cần\nTrong thực tế, bạn thường xuyên cần các hành động cứu hộ hoặc dọn dẹp khi sự cố xảy ra: gửi thông báo khẩn cấp lên Slack khi kiểm thử hỏng (`if: failure()`), hoặc dọn dẹp cụm máy chủ thử nghiệm kể cả khi ứng dụng bị sập (`if: always()`). Thiếu mệnh đề điều kiện, pipeline sẽ không có khả năng tự xử lý tình huống linh hoạt.\n\n## 🧠 Mental Model\nHãy hình dung hệ thống an toàn trên xe cứu hỏa. Hệ thống phun nước dập lửa chỉ hoạt động khi xe đã đến hiện trường an toàn (`if: success()`). Nhưng còi báo động khẩn cấp và túi khí chỉ bung ra khi xe gặp sự cố va chạm mạnh (`if: failure()`). Và thiết bị ghi dữ liệu hộp đen hành trình thì luôn luôn ghi âm liên tục trong mọi hoàn cảnh kể cả khi xe bị nổ lốp (`if: always()`).\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Step1[Step 1: Run Unit Tests - Bị Thất bại] --> Check{Đánh giá điều kiện các bước sau}\n    Check -- if: success() --> Step2[Step 2: Deploy - Bị bỏ qua Skipped]\n    Check -- if: failure() --> Step3[Step 3: Gửi tin nhắn cứu hộ Telegram - Được chạy]\n    Check -- if: always() --> Step4[Step 4: Dọn dẹp máy ảo - Luôn được chạy]\n```\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư thiết lập đường ống kiểm thử cho ngân hàng trực tuyến. Khi Job kiểm thử chạy: Step 1 xuất bản gói ứng dụng chỉ khi toàn bộ bài test vượt qua (`if: success()`). Step 2 tự động chụp ảnh màn hình lỗi, thu thập log debug và tải lên kênh hỗ trợ chỉ khi có test thất bại (`if: failure()`). Step 3 gửi lệnh tắt cơ sở dữ liệu tạm thời để tránh tốn tiền đám mây (`if: always()`). Nhờ các hàm điều kiện chính xác, hệ thống vừa tiết kiệm chi phí vừa cung cấp đầy đủ thông tin gỡ lỗi.\n\n## 💻 Command & Cú pháp\n```bash\n# Minh họa lệnh thông báo trong bước có điều kiện failure()\necho \"Đã phát hiện lỗi kiểm thử, đang gửi cảnh báo!\"\n\n# Minh họa lệnh dọn dẹp trong bước có điều kiện always()\necho \"Đang dọn dẹp tài nguyên tạm thời!\"\n```\n\n## 🔍 Giải thích command\n- Lệnh đầu tiên mô phỏng hành động cứu hộ chỉ chạy khi điều kiện `if: failure()` được kích hoạt bởi lỗi từ các bước trước.\n- Lệnh thứ hai mô phỏng hành động dọn dẹp môi trường luôn luôn được chạy nhờ điều kiện `if: always()`.\n\n## ⚠️ Sai lầm phổ biến\n- Nghĩ rằng `if: failure()` sẽ chạy ngay cả khi workflow bị bấm Cancel (trường hợp bị hủy phải dùng `always()` hoặc `cancelled()`).\n- Quên rằng mặc định mọi Step đều có ngầm định `if: success()` nên viết lặp lại thừa thãi.\n- Sử dụng biến môi trường không tồn tại trong mệnh đề điều kiện dẫn đến việc biểu thức luôn bị đánh giá là false.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Khởi tạo một tệp workflow thử nghiệm các hàm điều kiện:\n   ```yaml\n   name: Conditional If Demo\n   on: [workflow_dispatch]\n   jobs:\n     demo:\n       runs-on: ubuntu-latest\n       steps:\n         - name: Bước 1 - Cố tình gây lỗi\n           run: exit 1\n         - name: Bước 2 - Chỉ chạy khi có lỗi\n           if: failure()\n           run: echo \"Bước 1 đã thất bại, bước 2 được cứu hộ!\"\n         - name: Bước 3 - Bị bỏ qua vì có lỗi\n           if: success()\n           run: echo \"Bước này sẽ không bao giờ được in ra!\"\n         - name: Bước 4 - Luôn luôn chạy\n           if: always()\n           run: echo \"Bước 4 hoàn tất dọn dẹp an toàn!\"\n   ```\n2. Đẩy file lên GitHub và kích hoạt thủ công qua nút Run workflow.\n3. Quan sát log: Bước 1 đỏ, Bước 2 xanh, Bước 3 xám (Skipped), Bước 4 xanh.\n\n## 💡 Hint & mẹo\n- Khi viết `if: always()`, bước đó sẽ kiên cường thực thi bất kể các bước trước đó thành công, thất bại hay bị hủy bỏ.\n- Bạn có thể kết hợp toán tử logic: `if: always() && github.ref == 'refs/heads/main'`.\n\n## ✅ Validation & Kết quả mong đợi\n- Bước gắn `failure()` và bước gắn `always()` đều được thực thi sau khi bước đầu tiên gặp sự cố.\n- Bước mang điều kiện `success()` tự động chuyển sang trạng thái Skipped màu xám.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững các hàm điều kiện trạng thái trong GitHub Actions.\n\n## 🚀 Thử thách nâng cao\nThiết kế bước thông báo lỗi chỉ gửi tin nhắn cảnh báo khi sự kiện là `push` lên nhánh `main` và bài kiểm thử bị thất bại (`if: failure() && github.ref == 'refs/heads/main'`).\n\n## 📝 Tổng kết\n- Từ khóa `if` dùng để quyết định xem một Job hoặc Step có được phép chạy hay không.\n- Các hàm trạng thái cốt lõi gồm: `success()`, `failure()`, `always()`, và `cancelled()`.\n- Mặc định nếu không chỉ định, GitHub Actions luôn áp dụng điều kiện ngầm định là `success()`.\n",
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
      },
      {
        "id": "q5",
        "question": "Hàm trạng thái `cancelled()` trong mệnh đề `if:` trả về true trong trường hợp nào?",
        "type": "single",
        "options": [
          {
            "text": "Khi tiến trình workflow bị người dùng chủ động bấm hủy hoặc bị ngắt do vượt quá thời gian timeout",
            "correct": true
          },
          {
            "text": "Khi có lỗi cú pháp thụt lề YAML trong tệp kịch bản",
            "correct": false
          },
          {
            "text": "Khi tất cả các bài kiểm thử hoàn thành xuất sắc mà không có lỗi",
            "correct": false
          },
          {
            "text": "Khi người lập trình viên tắt màn hình máy tính cá nhân",
            "correct": false
          }
        ],
        "explanation": "Hàm `cancelled()` trả về true khi phiên chạy bị dừng đột ngột, giúp bạn kích hoạt các bước gửi thông báo cứu hộ hoặc hủy các tài nguyên đang cấp phát dở dang."
      }
    ]
  }
};
export default lesson;
