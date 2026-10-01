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
  "content": "# Thực thi có điều kiện với if: always(), success(), failure()\n\n## 🎯 Mục tiêu\n- Nắm vững cách sử dụng từ khóa `if` ở cả cấp độ Job và cấp độ Step để kiểm soát luồng chạy.\n- Làm chủ 4 hàm kiểm tra trạng thái cốt lõi: `success()`, `failure()`, `always()`, và `cancelled()`.\n- Hiểu rõ cơ chế mặc định ngầm định: nếu không khai báo hàm trạng thái, GitHub Actions luôn tự động áp dụng `success()`.\n\n## 🧩 Từ khóa hôm nay\n### if Condition\n- **Nói dễ hiểu**: Thuộc tính điều kiện quyết định xem một Job hoặc Step có được phép chạy hay bị bỏ qua.\n- **Ví dụ**: Dùng `if: github.ref == 'refs/heads/main'` để chỉ chạy bước deploy khi đang ở nhánh chính.\n- **Đừng nhầm**: Không bắt buộc phải bao bọc bằng cặp dấu ngoặc `${{ }}` bên trong từ khóa `if:`.\n\n### success() vs failure()\n- **Nói dễ hiểu**: Hai hàm kiểm tra trạng thái; `success()` chỉ chạy khi các bước trước đều tốt, còn `failure()` chỉ chạy khi có ít nhất một bước bị lỗi.\n- **Ví dụ**: Bước gửi thông báo lỗi tới Telegram chỉ kích hoạt khi `if: failure()`.\n- **Đừng nhầm**: Mặc định mọi bước đều ngầm định mang `success()`; nếu không ghi gì thì có lỗi là các bước sau dừng lại.\n\n### always() Function\n- **Nói dễ hiểu**: Hàm trạng thái trả về `true` kể cả khi workflow đã bị hủy, nên dùng cho tác vụ cần thử chạy trong cả tình huống đó.\n- **Ví dụ**: Có thể dùng `if: always()` để cố gắng lưu log chẩn đoán sau khi các bước trước lỗi hoặc workflow bị hủy.\n- **Đừng nhầm**: Nó không bảo đảm runner còn hoạt động đủ lâu để tác vụ hoàn tất. Tránh dùng cho thao tác thiết yếu có thể treo; nếu muốn chạy khi thành công hoặc thất bại nhưng bỏ qua khi bị hủy, dùng `if: ${{ !cancelled() }}`.\n\n## 📖 Định nghĩa\nThuộc tính `if` cho phép bạn điều khiển một Job hoặc Step có được chạy hay không. Có thể kết hợp biểu thức ngữ cảnh với các hàm trạng thái: `success()` trả về true khi các bước trước thành công; `failure()` khi bước trước hoặc Job tổ tiên thất bại; `cancelled()` khi workflow bị hủy; `always()` trả về true kể cả sau khi workflow bị hủy. `always()` không bảo đảm tác vụ sẽ hoàn tất nếu runner bị dừng.\n\n## 💡 Tại sao cần\nTrong thực tế, bạn có thể gửi thông báo khi kiểm thử lỗi (`if: failure()`), dọn tài nguyên khi bước trước thành công hoặc thất bại nhưng workflow chưa bị hủy (`if: ${{ !cancelled() }}`), hoặc lưu thông tin chẩn đoán ngay cả khi bị hủy (`if: always()`). Chọn điều kiện theo hành động mong muốn; `always()` có rủi ro giữ Job chạy đến hết thời hạn nếu tác vụ gặp lỗi nghiêm trọng.\n\n## 🧠 Mental Model\n`success()` giữ bước sau ở trạng thái bỏ qua khi bước trước thất bại; `failure()` chọn xử lý lỗi; `!cancelled()` cho phép chạy sau thành công hoặc thất bại nhưng bỏ qua khi run bị hủy. `always()` vẫn đúng khi run bị hủy, nên phù hợp với bước ngắn như lưu log chẩn đoán; nó không thể bảo đảm runner còn sống để hoàn tất.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Step1[Step 1: Run Unit Tests - Bị Thất bại] --> Check{Đánh giá điều kiện các bước sau}\n    Check -- if: success() --> Step2[Step 2: Deploy - Bị bỏ qua Skipped]\n    Check -- if: failure() --> Step3[Step 3: Gửi tin nhắn cứu hộ Telegram - Được chạy]\n    Check -- if: !cancelled() --> Step4[Step 4: Dọn dẹp tài nguyên - Được chạy sau lỗi]\n    Check -- if: always() --> Step5[Step 5: Lưu log, kể cả khi bị hủy]\n```\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư thiết lập đường ống kiểm thử cho ứng dụng web. Job chỉ phát hành gói nếu kiểm thử thành công (`success()`). Khi kiểm thử thất bại, một Step thu thập log để chẩn đoán (`failure()`). Một Step khác dọn cơ sở dữ liệu tạm nếu workflow chưa bị hủy (`!cancelled()`). Nếu cần thử lưu log khi run bị hủy, có thể dùng `always()`, nhưng phải thiết kế Step ngắn và chịu lỗi.\n\n## 💻 Command & Cú pháp\n```bash\n# Minh họa lệnh thông báo trong bước có điều kiện failure()\necho \"Đã phát hiện lỗi kiểm thử, đang gửi cảnh báo!\"\n\n# Minh họa lệnh dọn dẹp trong bước có điều kiện always()\necho \"Đang dọn dẹp tài nguyên tạm thời!\"\n```\n\n## 🔍 Giải thích command\n- Lệnh đầu tiên mô phỏng hành động cứu hộ chỉ chạy khi điều kiện `if: failure()` được kích hoạt bởi lỗi từ các bước trước.\n- Lệnh thứ hai mô phỏng hành động cleanup khi dùng điều kiện `if: ${{ !cancelled() }}`.\n\n## ⚠️ Sai lầm phổ biến\n- Nghĩ `failure()` là điều kiện để xử lý việc hủy workflow; dùng `cancelled()` để nhận biết run bị hủy, hoặc `always()` nếu cần một tác vụ chạy cả sau khi hủy.\n- Quên rằng mặc định mọi Step đều có ngầm định `if: success()` nên viết lặp lại thừa thãi.\n- Dùng `always()` cho công việc dài hoặc thiết yếu: run bị hủy có thể vẫn chờ job/bước này, và runner có thể dừng trước khi nó xong.\n- Sử dụng biến môi trường không tồn tại trong mệnh đề điều kiện dẫn đến việc biểu thức luôn bị đánh giá là false.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Khởi tạo một tệp workflow thử nghiệm các hàm điều kiện:\n   ```yaml\n   name: Conditional If Demo\n   on: [workflow_dispatch]\n   jobs:\n     demo:\n       runs-on: ubuntu-latest\n       steps:\n         - name: Bước 1 - Cố tình gây lỗi\n           run: exit 1\n         - name: Bước 2 - Chỉ chạy khi có lỗi\n           if: failure()\n           run: echo \"Bước 1 đã thất bại, bước 2 được cứu hộ!\"\n         - name: Bước 3 - Bị bỏ qua vì có lỗi\n           if: success()\n           run: echo \"Bước này sẽ không bao giờ được in ra!\"\n         - name: Bước 4 - Ghi log ngay cả khi run bị hủy\n           if: always()\n           run: echo \"Thử ghi log chẩn đoán sau lỗi hoặc khi workflow bị hủy.\"\n   ```\n2. Đẩy file lên GitHub và kích hoạt thủ công qua nút Run workflow.\n3. Quan sát log của một run không bị hủy: Bước 1 đỏ, Bước 2 chạy nhờ `failure()`, Bước 3 bị bỏ qua do `success()` không thỏa, Bước 4 được thử chạy nhờ `always()`. Hủy run riêng để quan sát khác biệt; tác vụ vẫn có thể bị dừng nếu runner kết thúc.\n\n## 💡 Hint & mẹo\n- `always()` vẫn trả về true khi workflow bị hủy. Với bước cần chạy sau thành công/thất bại nhưng không chạy sau khi hủy, ưu tiên `if: ${{ !cancelled() }}`.\n- Bạn có thể kết hợp toán tử logic: `if: always() && github.ref == 'refs/heads/main'`.\n\n## ✅ Validation & Kết quả mong đợi\n- Trong run không bị hủy, bước gắn `failure()` và `always()` được chạy sau khi bước đầu tiên gặp sự cố; điều kiện của chúng khác nhau khi workflow bị hủy.\n- Bước mang điều kiện `success()` tự động chuyển sang trạng thái Skipped màu xám.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững các hàm điều kiện trạng thái trong GitHub Actions.\n\n## 🚀 Thử thách nâng cao\nThiết kế bước thông báo lỗi chỉ gửi tin nhắn cảnh báo khi sự kiện là `push` lên nhánh `main` và bài kiểm thử bị thất bại (`if: failure() && github.ref == 'refs/heads/main'`).\n\n## 📝 Tổng kết\n- Từ khóa `if` dùng để quyết định xem một Job hoặc Step có được phép chạy hay không.\n- Các hàm trạng thái cốt lõi gồm `success()`, `failure()`, `always()` và `cancelled()`; dùng `!cancelled()` khi muốn tiếp tục sau lỗi nhưng tôn trọng thao tác hủy.\n- Mặc định nếu không chỉ định, GitHub Actions luôn áp dụng điều kiện ngầm định là `success()`.\n",
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
        "question": "Hàm nào trả về true kể cả khi workflow đã bị hủy, để một Step có thể thử chạy tác vụ như lưu log chẩn đoán?",
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
        "explanation": "`always()` trả về true kể cả sau khi workflow bị hủy. Điều đó không bảo đảm tác vụ hoàn tất nếu runner bị dừng, nên không nên dùng bừa cho thao tác thiết yếu hoặc có thể treo."
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
            "text": "Khi một workflow run bị hủy",
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
        "explanation": "`cancelled()` trả về true khi workflow run bị hủy. Hàm này không đồng nghĩa với mọi lỗi hoặc mọi trường hợp hết thời gian của một Step."
      }
    ]
  }
};
export default lesson;
