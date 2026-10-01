import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-job-dependencies-needs",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "12-job-dependencies-needs",
    "title": "Quan hệ phụ thuộc giữa các Job với thuộc tính needs",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "11-contexts-and-expressions"
    ],
    "objectives": [
      "Làm chủ thuộc tính needs để thiết lập mối quan hệ phụ thuộc có thứ tự giữa các Job.",
      "Hiểu cách GitHub Actions xây dựng Đồ thị có hướng không chu trình (DAG) từ các khai báo needs.",
      "Biết cách truyền và sử dụng kết quả (needs.<job_id>.result) hoặc dữ liệu đầu ra (outputs) giữa các Job."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "job dependencies",
      "needs",
      "dag scheduler",
      "sequential jobs",
      "pipeline flow"
    ],
    "commands": [
      "gh run view",
      "gh run view --web",
      "cat .github/workflows/pipeline.yml"
    ]
  },
  "content": "# Quan hệ phụ thuộc giữa các Job với thuộc tính needs\n\n## 🎯 Mục tiêu\n- Làm chủ thuộc tính `needs` để thiết lập mối quan hệ phụ thuộc có thứ tự giữa các Job.\n- Hiểu cách GitHub Actions xây dựng Đồ thị có hướng không chu trình (DAG) từ các khai báo `needs`.\n- Biết cách truyền và sử dụng kết quả (`needs.<job_id>.result`) hoặc dữ liệu đầu ra giữa các Job.\n\n## 🧩 Từ khóa hôm nay\n### needs Property\n- **Nói dễ hiểu**: Thuộc tính yêu cầu Job này phải đợi một hoặc nhiều Job khác chạy thành công xong mới được bắt đầu.\n- **Ví dụ**: Khai báo `needs: [test, lint]` trong Job `deploy` để bảo đảm code sạch và pass test rồi mới deploy.\n- **Đừng nhầm**: Mặc định các Job không đợi nhau mà chạy song song; bạn bắt buộc phải chỉ định `needs` nếu muốn chạy tuần tự.\n\n### Directed Acyclic Graph\n- **Nói dễ hiểu**: Đồ thị có hướng không chu trình (DAG), mô hình luồng công việc đi một chiều từ gốc tới ngọn không bị lặp vòng.\n- **Ví dụ**: Sơ đồ Lint và Test cùng trỏ mũi tên vào Build, và Build trỏ mũi tên vào Deploy.\n- **Đừng nhầm**: Đây là cấu trúc đồ thị toán học; không được phép có mũi tên quay ngược tạo thành vòng lặp luẩn quẩn.\n\n### Circular Dependency\n- **Nói dễ hiểu**: Lỗi vòng lặp luẩn quẩn khi Job A đợi Job B và Job B lại khai báo đợi Job A.\n- **Ví dụ**: Hệ thống bị bế tắc và GitHub Actions sẽ từ chối biên dịch tệp workflow ngay lập tức.\n- **Đừng nhầm**: Không có Job nào được chạy trong trường hợp này; toàn bộ workflow sẽ bị báo lỗi xác thực cú pháp.\n\n## 📖 Định nghĩa\nMặc định, các Job độc lập trong cùng một workflow sẽ chạy hoàn toàn song song nhằm tiết kiệm thời gian. Tuy nhiên, thuộc tính `needs` cho phép bạn định nghĩa các mối quan hệ phụ thuộc có hướng giữa các Job, biến các tác vụ rời rạc thành một chuỗi đường ống (Pipeline) có trật tự chặt chẽ. Một Job có khai báo `needs: [job_a, job_b]` sẽ chỉ bắt đầu khi cả hai Job A và B đều đã hoàn thành thành công.\n\n## 💡 Tại sao cần\nTrong quy trình phát hành chuyên nghiệp, bạn không bao giờ muốn triển khai lên máy chủ sản xuất (`deploy`) khi bài kiểm tra chất lượng mã nguồn (`lint`) hoặc kiểm thử chức năng (`test`) vẫn chưa chạy hoặc đã bị thất bại. Thuộc tính `needs` tạo ra chốt chặn an toàn đa tầng: chỉ khi nền móng kiểm thử vững chắc thì tầng đóng gói và phát hành mới được kích hoạt.\n\n## 🧠 Mental Model\nHãy tưởng tượng quá trình xây nhà nhiều tầng. Job 1 là đổ móng; Job 2 là dựng cột; Job 3 là lợp mái; Job 4 là sơn tường. Bạn không thể lợp mái khi chưa dựng cột (`lợp mái needs dựng cột`), và không thể dựng cột khi chưa đổ móng (`dựng cột needs đổ móng`). Sự phụ thuộc này tạo nên chuỗi tiến độ vững vàng theo đúng quy luật xây dựng.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Lint[Job: lint] --> Build[Job: build]\n    Test[Job: test] --> Build\n    Build --> Deploy[Job: deploy-production]\n```\n\n## 🏢 Ví dụ thực tế\nMột công ty tài chính thiết lập pipeline phát hành cổng thanh toán gồm 4 Jobs: `security-scan` (quét lỗ hổng), `unit-test` (kiểm tra hàm tính lãi), `build-image` (đóng gói Docker) và `deploy-cloud` (triển khai máy chủ). Job `build-image` có khai báo `needs: [security-scan, unit-test]`. Nếu quá trình quét mã nguồn phát hiện lỗ hổng bảo mật, bước quét báo đỏ, hệ thống lập tức hủy bỏ Job đóng gói và Job triển khai, ngăn chặn triệt để mã nguồn lỗi tiếp cận máy chủ người dùng.\n\n## 💻 Command & Cú pháp\n```bash\n# Xem tóm tắt một lần chạy trong terminal (cần GitHub CLI đã đăng nhập)\ngh run view\n\n# Mở lần chạy trong trình duyệt để xem đồ thị Job\ngh run view --web\n\n# Kiểm tra cú pháp pipeline phụ thuộc trong file workflow\ncat .github/workflows/pipeline.yml\n```\n\n## 🔍 Giải thích command\n- `gh run view`: Hiển thị tóm tắt lần chạy workflow; có thể thêm `--web` để mở trang run và xem đồ thị Job.\n- `cat .github/workflows/pipeline.yml`: Đọc nội dung tệp để kiểm tra các danh sách mảng `needs` có khớp đúng tên `job_id` hay không.\n\n## ⚠️ Sai lầm phổ biến\n- Tạo ra vòng lặp phụ thuộc (Circular Dependency) ví dụ A cần B và B cần A khiến workflow bị khóa và báo lỗi xác thực.\n- Khai báo sai tên định danh `job_id` trong mảng `needs` (gõ sai chữ hoa, chữ thường hoặc nhầm với thuộc tính `name`).\n- Kỳ vọng Job phụ thuộc tự chạy sau khi Job trước thất bại; mặc định các Job phụ thuộc sẽ bị bỏ qua nếu dependency không thành công. Chỉ thêm điều kiện trạng thái khi có lý do rõ ràng.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Tạo tệp `.github/workflows/pipeline.yml` gồm 3 Job liên kết tuần tự:\n   ```yaml\n   name: Pipeline DAG Demo\n   on: [workflow_dispatch]\n   jobs:\n     setup:\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Setup completed!\"\n     test:\n       needs: setup\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Tests passed!\"\n     deploy:\n       needs: [setup, test]\n       runs-on: ubuntu-latest\n       steps:\n         - run: echo \"Deploy succeeded!\"\n   ```\n2. Đẩy file lên GitHub và kích hoạt thủ công qua nút Run workflow.\n3. Truy cập tab Actions và chiêm ngưỡng đồ thị các đường nối mũi tên trực quan giữa `setup` -> `test` -> `deploy`.\n\n## 💡 Hint & mẹo\n- Nếu một Job phụ thuộc vào nhiều Job tiên quyết cùng lúc, hãy truyền danh sách: `needs: [job1, job2]`.\n- Bạn có thể đọc kết quả của Job trước thông qua biểu thức `needs.<job_id>.result` để xử lý logic rẽ nhánh.\n\n## ✅ Validation & Kết quả mong đợi\n- Trên giao diện đồ thị web của GitHub Actions, các Job được nối với nhau bằng các mũi tên có hướng rõ ràng.\n- Job `deploy` chỉ bắt đầu chạy khi cả hai Job `setup` và `test` đã báo dấu tích xanh thành công.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra khả năng thiết kế quan hệ phụ thuộc giữa các Job bằng thuộc tính `needs`.\n\n## 🚀 Thử thách nâng cao\nThiết kế một Job dọn dẹp tài nguyên có `needs: [test, build]` và điều kiện `if: ${{ !cancelled() }}` để chạy sau khi dependency thành công hoặc thất bại, nhưng không bắt đầu khi toàn bộ workflow đã bị hủy. Dùng `always()` chỉ khi cần chạy cả sau khi hủy và cân nhắc khả năng bước cleanup bị treo.\n\n## 📝 Tổng kết\n- Thuộc tính `needs` dùng để xác định các Job tiên quyết phải chạy xong trước khi Job hiện tại bắt đầu.\n- Có thể truyền một Job đơn lẻ (`needs: setup`) hoặc một mảng nhiều Jobs (`needs: [lint, test]`).\n- Kết hợp `needs` giúp xây dựng các pipeline kiểm thử và phát hành chuyên nghiệp, giảm thiểu rủi ro lỗi sản phẩm.\n",
  "quiz": {
    "id": "quiz-07-github-actions-12-job-dependencies-needs",
    "title": "Trắc nghiệm: Quan hệ phụ thuộc giữa các Job với thuộc tính needs",
    "questions": [
      {
        "id": "q1",
        "question": "Thuộc tính nào được sử dụng để bắt buộc một Job phải chờ một Job khác hoàn thành trước?",
        "type": "single",
        "options": [
          {
            "text": "needs",
            "correct": true
          },
          {
            "text": "depends_on",
            "correct": false
          },
          {
            "text": "after",
            "correct": false
          },
          {
            "text": "wait_for",
            "correct": false
          }
        ],
        "explanation": "Trong GitHub Actions, từ khóa `needs:` là thuộc tính tiêu chuẩn để khai báo mối quan hệ phụ thuộc giữa các Job."
      },
      {
        "id": "q2",
        "question": "Điều gì xảy ra nếu Job A bị thất bại (failed) và Job B có khai báo `needs: A`?",
        "type": "single",
        "options": [
          {
            "text": "Job B sẽ tự động bị bỏ qua (skipped) và không được thực thi",
            "correct": true
          },
          {
            "text": "Job B vẫn chạy bình thường",
            "correct": false
          },
          {
            "text": "Hệ thống tự động chạy lại Job A lần thứ hai",
            "correct": false
          },
          {
            "text": "Toàn bộ workflow bị xóa khỏi kho lưu trữ",
            "correct": false
          }
        ],
        "explanation": "Mặc định, nếu bất kỳ Job tiên quyết nào trong danh sách `needs` bị thất bại, các Job phụ thuộc phía sau sẽ bị hủy bỏ."
      },
      {
        "id": "q3",
        "question": "Hiện tượng Circular Dependency (Vòng lặp phụ thuộc) ví dụ A cần B và B cần A sẽ dẫn đến kết quả gì?",
        "type": "single",
        "options": [
          {
            "text": "Workflow bị lỗi xác thực cú pháp và hoàn toàn không thể khởi chạy",
            "correct": true
          },
          {
            "text": "Cả hai Job cùng chạy vĩnh viễn không bao giờ dừng",
            "correct": false
          },
          {
            "text": "GitHub Actions tự động xóa Job B để giải quyết",
            "correct": false
          },
          {
            "text": "Không có vấn đề gì, hệ thống tự động xử lý được",
            "correct": false
          }
        ],
        "explanation": "GitHub Actions yêu cầu đồ thị DAG không được có chu trình (Acyclic). Nếu phát hiện vòng lặp, workflow sẽ bị từ chối ngay lập tức."
      },
      {
        "id": "q4",
        "question": "Để kiểm tra kết quả thực thi của Job tiên quyết có tên là `build`, ta dùng cú pháp ngữ cảnh nào?",
        "type": "single",
        "options": [
          {
            "text": "needs.build.result",
            "correct": true
          },
          {
            "text": "jobs.build.status",
            "correct": false
          },
          {
            "text": "steps.build.outcome",
            "correct": false
          },
          {
            "text": "env.BUILD_RESULT",
            "correct": false
          }
        ],
        "explanation": "Ngữ cảnh `needs.<job_id>.result` trả về trạng thái hoàn thành của Job đó (ví dụ: `success`, `failure`, `cancelled`, hoặc `skipped`)."
      },
      {
        "id": "q5",
        "question": "Khi một Job cần phụ thuộc vào nhiều Job tiên quyết cùng lúc (ví dụ vừa cần lint, vừa cần test), cú pháp khai báo nào sau đây là chuẩn mực?",
        "type": "single",
        "options": [
          {
            "text": "Sử dụng mảng danh sách trong YAML: needs: [lint, test]",
            "correct": true
          },
          {
            "text": "Nối các Job bằng dấu cộng: needs: lint + test",
            "correct": false
          },
          {
            "text": "Dùng từ khóa kết nối tiếng Anh: needs: lint and test",
            "correct": false
          },
          {
            "text": "GitHub Actions không cho phép một Job phụ thuộc vào nhiều hơn một Job khác",
            "correct": false
          }
        ],
        "explanation": "Thuộc tính `needs` hỗ trợ truyền một danh sách các job_id, yêu cầu tất cả các Job trong danh sách phải thành công thì Job tiếp theo mới được khởi động."
      }
    ]
  }
};
export default lesson;
