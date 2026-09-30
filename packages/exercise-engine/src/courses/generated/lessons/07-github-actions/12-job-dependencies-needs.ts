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
      "gh run view --graph",
      "cat .github/workflows/pipeline.yml"
    ]
  },
  "content": "# Quan hệ phụ thuộc giữa các Job với thuộc tính needs\n\n---\n\n## 🎯 Mục tiêu bài học\n- Làm chủ thuộc tính needs để thiết lập mối quan hệ phụ thuộc có thứ tự giữa các Job.\n- Hiểu cách GitHub Actions xây dựng Đồ thị có hướng không chu trình (DAG) từ các khai báo needs.\n- Biết cách truyền và sử dụng kết quả (needs.<job_id>.result) hoặc dữ liệu đầu ra (outputs) giữa các Job.\n\n---\n\n## 📖 Định nghĩa\n> Mặc định, các Job độc lập trong cùng một workflow của GitHub Actions sẽ chạy hoàn toàn song song nhằm tiết kiệm thời gian tổng thể. Tuy nhiên, thuộc tính needs cho phép bạn định nghĩa các mối quan hệ phụ thuộc có hướng giữa các Job, biến các tác vụ rời rạc thành một chuỗi đường ống (Pipeline) có trật tự và kiểm soát chặt chẽ. Một Job có khai báo needs: [job_a, job_b] sẽ chỉ được phép bắt đầu thực thi sau khi cả hai Job A và Job B đã hoàn thành thành công rực rỡ mà không gặp sự cố gián đoạn nào.\n\n---\n\n## 🤔 Tại sao cần?\nTrong môi trường phát triển phần mềm chuyên nghiệp, bạn không bao giờ muốn triển khai phiên bản mới lên máy chủ sản xuất (Deploy Job) khi mà các bài kiểm tra chất lượng mã nguồn (Lint Job) hoặc bài kiểm tra chức năng (Test Job) vẫn chưa chạy hoặc đã bị thất bại. Sử dụng thuộc tính needs giúp bạn xây dựng cổng kiểm soát đa tầng an toàn: chỉ khi nền móng kiểm thử tầng dưới vững chắc thì tầng đóng gói và phát hành phía trên mới được phép kích hoạt, giúp giảm thiểu tối đa rủi ro gián đoạn dịch vụ người dùng.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng quá trình xây dựng một ngôi nhà nhiều tầng. Job 1 là đổ móng nhà; Job 2 là dựng cột bê tông; Job 3 là lợp mái; Job 4 là sơn tường. Bạn không thể lợp mái khi chưa dựng cột (lợp mái needs dựng cột), và không thể dựng cột khi chưa đổ móng (dựng cột needs đổ móng). Sự phụ thuộc này tạo nên một chuỗi tiến độ vững chắc theo quy luật trọng lực.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nMô hình đồ thị phụ thuộc (DAG Workflow):\n       [Job: Lint] ─────────┐\n                            ├──► [Job: Build] ──► [Job: Deploy Production]\n       [Job: Unit Test] ────┘\n\nKhai báo YAML:\njobs:\n  lint: npm run lint\n  test: npm test\n  build:\n    needs: [lint, test]       <── Chờ cả Lint và Test xong\n  deploy:\n    needs: [build]            <── Chờ Build xong\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty tài chính công nghệ cao thiết lập pipeline phát hành cổng thanh toán gồm 4 Jobs độc lập: security-scan (quét lỗ hổng bảo mật mã nguồn), unit-test (kiểm tra hàm tính lãi suất giao dịch), build-container (đóng gói ảnh Docker ứng dụng), và deploy-cloud (triển khai lên cụm máy chủ). Job build-container được cấu hình chặt chẽ với needs: [security-scan, unit-test]. Nếu quá trình quét mã nguồn phát hiện một thư viện phụ thuộc có nguy cơ rò rỉ dữ liệu nghiêm trọng dẫn đến security-scan bị thất bại, hệ thống lập tức hủy bỏ Job đóng gói và Job triển khai. Nhờ cơ chế kiểm soát này, mã nguồn lỗi không bao giờ có cơ hội tiếp cận máy chủ thực tế.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngh run view --graph\ncat .github/workflows/pipeline.yml\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh gh run view --graph hiển thị đồ thị phụ thuộc DAG trực quan của phiên chạy ngay trong dòng lệnh terminal, giúp bạn thấy rõ nhánh nào đã hoàn thành và nhánh nào đang xếp hàng chờ.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Tạo ra vòng lặp phụ thuộc (Circular Dependency)**:  Ví dụ Job A needs Job B và Job B lại needs Job A khiến workflow bị khóa vĩnh viễn và báo lỗi xác thực.\n2. **Khai báo sai tên định danh `job_id` trong mảng `needs` khiến hệ thống không tìm thấy Job tiên quyết.**: \n3. **Kỳ vọng Job phụ thuộc vẫn chạy khi Job trước bị lỗi mà không sử dụng hàm trạng thái `always()`.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo 3 Job: `setup`, `test`, và `deploy`.\n2. Cấu hình để `test` phụ thuộc vào `setup` bằng từ khóa `needs: setup`.\n3. Cấu hình để `deploy` phụ thuộc vào `test` bằng từ khóa `needs: test`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Nếu một Job phụ thuộc vào nhiều Job khác, hãy truyền một danh sách mảng: `needs: [job1, job2]`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nTrên giao diện đồ thị, các Job được nối với nhau bằng các đường mũi tên chỉ hướng chính xác.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra khả năng thiết kế luồng phụ thuộc Job của bạn qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để cấu hình một Job dọn dẹp tài nguyên (cleanup) luôn luôn chạy ở cuối cùng, bất kể các Job tiên quyết trước đó thành công hay thất bại?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Thuộc tính `needs` dùng để xác định các Job tiên quyết phải chạy xong trước khi Job hiện tại bắt đầu.\n- Có thể truyền một Job đơn lẻ hoặc một mảng nhiều Jobs: `needs: [job_a, job_b]`.\n- GitHub Actions tự động chuyển các khai báo `needs` thành một đồ thị có hướng không chu trình (DAG).\n",
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
      }
    ]
  }
};
export default lesson;
