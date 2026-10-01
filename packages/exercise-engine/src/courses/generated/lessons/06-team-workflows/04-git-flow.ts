import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-flow",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "04-git-flow",
    "title": "Git Flow",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "02-feature-branch-workflow"
    ],
    "objectives": [
      "Nắm bắt toàn diện kiến trúc 5 loại nhánh trong mô hình kinh điển Git Flow do Vincent Driessen đề xuất.",
      "Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).",
      "Vận hành chuẩn xác vòng đời của nhánh release và nhánh hotfix từ khi rẽ nhánh đến khi hợp nhất kép (dual-merge).",
      "Đánh giá được ưu nhược điểm và nhận diện các dự án phù hợp với Git Flow: ứng dụng mobile, phần mềm đóng gói, enterprise."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git flow",
      "vincent driessen",
      "develop branch",
      "release branch",
      "hotfix branch",
      "scheduled release",
      "chu ky phat hanh"
    ],
    "commands": [
      "git switch -c release/v1.2.0 develop",
      "git switch main && git merge --no-ff release/v1.2.0",
      "git tag -a v1.2.0 -m \"Release v1.2.0\"",
      "git switch develop && git merge --no-ff release/v1.2.0",
      "git branch -d release/v1.2.0"
    ]
  },
  "content": "# Git Flow\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu vai trò của `main`, `develop`, `feature`, `release` và `hotfix` trong mô hình Git Flow.\n- Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).\n- Mô tả cách release/hotfix quay về các nhánh dài hạn trong quy trình Git Flow.\n- Nhận biết lợi ích và chi phí của quy trình nhiều nhánh; lựa chọn theo chu kỳ release của nhóm.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Flow\n- **Nói dễ hiểu**: Mô hình phân nhánh kinh điển với hai nhánh vĩnh cửu (`main`, `develop`) cùng các nhánh phụ (`feature`, `release`, `hotfix`).\n- **Ví dụ**: Dùng cho app ngân hàng di động phát hành bản cập nhật định kỳ mỗi tháng một lần lên App Store.\n- **Đừng nhầm**: Git Flow là một lựa chọn, không phải quy trình bắt buộc cho mobile hay enterprise. Nhóm có thể chọn workflow khác tùy cách release.\n\n### Dual-Merge (Hợp nhất kép)\n- **Nói dễ hiểu**: Thao tác merge một nhánh (như release hoặc hotfix) vào cả hai nhánh vĩnh cửu `main` và `develop`.\n- **Ví dụ**: Sau khi vá lỗi trên `release/v2.5.0`, merge vào `main` để xuất bản và merge ngược vào `develop` để không mất bản vá.\n- **Đừng nhầm**: Nếu nhóm duy trì `develop`, họ thường tích hợp lại các bản vá cần thiết vào đó; Git Flow không tự làm bước này.\n\n### Feature Freeze (Đóng băng tính năng)\n- **Nói dễ hiểu**: Giai đoạn dừng nhận thêm tính năng mới trên nhánh release để đội ngũ QA tập trung kiểm thử hồi quy và vá lỗi.\n- **Ví dụ**: Trong một quy trình Git Flow điển hình, nhánh `release/v1.2.0` chỉ nhận chỉnh sửa để ổn định bản phát hành; tính năng kế tiếp tiếp tục ở `develop`.\n- **Đừng nhầm**: Các tính năng mới của sprint sau vẫn được commit bình thường trên nhánh `develop`, không bị dừng lại.\n\n---\n\n## 📖 Định nghĩa\nGit Flow là mô hình phân nhánh nhiều tầng gồm hai nhánh dài hạn `main` và `develop`, cùng các nhánh ngắn hạn `feature`, `release`, `hotfix`. Mô hình này tách công việc đang phát triển khỏi giai đoạn ổn định một bản phát hành.\n\n---\n\n## 💡 Tại sao cần\nMô hình này tạo các nhánh riêng cho phát triển, ổn định release và sửa lỗi khẩn cấp. Đổi lại, nhóm phải quản lý thêm nhánh và nhớ đồng bộ các bản vá giữa chúng.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung xưởng đóng tàu quân sự. Nhánh main là hạm đội tàu chiến đang hoạt động trên biển. Nhánh develop là xưởng ngầm lắp ráp linh kiện mới. Khi hoàn thiện phần thô, tàu được đưa ra ụ thử nghiệm riêng (release) để sơn và chống thấm. Khi tàu ngoài biển thủng vỏ, đội cứu hộ (hotfix) xuất phát từ main để xử lý khẩn cấp.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc 5 loại nhánh trong mô hình Git Flow kinh điển:\nmain:        v1.0 ────────────────────────────────────────── v1.1 (Production)\n               ▲                                              ▲\n               │                     ┌── release/1.1 ─────────┤ (Dual-merge!)\n               │                     │                        ▼\ndevelop:     ──┴─► C1 ──► C2 ──► C3 ─┴─────────────────────── C4 ──► (Next sprint)\n                    │      ▲\n                    └─feat─┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nVí dụ: nhóm có lịch phát hành định kỳ tạo `release/v2.5.0` từ `develop`, chỉ nhận bản sửa phục vụ ổn định release, rồi hợp nhất vào `main` và gắn tag. Nếu vẫn duy trì `develop`, nhóm tích hợp lại các bản sửa phù hợp vào đó.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch -c release/v1.2.0 develop\ngit switch main\ngit merge --no-ff release/v1.2.0\ngit tag -a v1.2.0 -m \"Release v1.2.0\"\ngit switch develop\ngit merge --no-ff release/v1.2.0\ngit branch -d release/v1.2.0\n```\n\nĐây là Git thật trong repo thử nghiệm đã có `main` và `develop`; Git Flow không tự tạo các nhánh hoặc quy tắc bảo vệ.\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c release/v1.2.0 develop`: Tạo nhánh phát hành xuất phát từ nhánh tích hợp develop.\n- `git merge --no-ff`: Hợp nhất có tạo merge commit để bảo toàn dấu vết lịch sử của nhánh release.\n- `git tag -a`: Đánh dấu mốc phiên bản phát hành chính thức trên nhánh main.\n- Hợp nhất ngược về `develop`: Trong Git Flow, tích hợp các bản sửa release cần giữ cho nhánh phát triển tiếp theo.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên merge ngược về develop**: Khiến các bản vá lỗi trên nhánh release hoặc hotfix bị thất lạc ở phiên bản tiếp theo.\n2. **Thêm tính năng vào nhánh release**: Phá vỡ nguyên tắc đóng băng tính năng (Feature Freeze) để ổn định mã nguồn.\n3. **Lạm dụng cho dự án web đơn giản**: Áp dụng mô hình nhiều nhánh cồng kềnh cho sản phẩm cần deploy liên tục sẽ gây lãng phí nguồn lực.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Khởi tạo hai nhánh dài hạn `main` và `develop` trong kho lưu trữ thử nghiệm.\n2. Tạo nhánh tính năng `feature/demo` từ `develop` và gộp lại vào `develop`.\n3. Mô phỏng quy trình tạo một nhánh `release/v1.0.0` từ `develop`, sửa một lỗi nhỏ và gộp vào cả `main` lẫn `develop`.\n4. Gắn thẻ Annotated Tag `v1.0.0` trên nhánh `main`.\n\n---\n\n## 💡 Hint & mẹo\n> Trong Git Flow, kiểm tra sau mỗi release/hotfix rằng các thay đổi cần giữ đã có trên cả nhánh phát hành và nhánh phát triển.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Mô tả được mục đích của việc đưa release/hotfix vào `main` và tích hợp lại thay đổi cần thiết vào `develop`.\n- Phân biệt rõ ràng mục đích sử dụng giữa 2 nhánh dài hạn và 3 nhánh ngắn hạn.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây về mô hình đa nhánh Git Flow.\n\n---\n\n## 🚀 Thử thách nâng cao\nMô tả chi tiết quy trình xử lý một sự cố khẩn cấp (Hotfix) trong Git Flow từ lúc nhận báo cáo lỗi đến khi deploy xong.\n\n---\n\n## 📝 Tổng kết\n- Git Flow là mô hình phân nhánh chặt chẽ lý tưởng cho các sản phẩm có chu kỳ phát hành cố định.\n- Duy trì 2 nhánh vĩnh cửu: `main` (Production) và `develop` (Integration).\n- Với Git Flow, tích hợp các bản sửa release/hotfix cần thiết về nhánh phát triển.\n",
  "quiz": {
    "id": "quiz-06-04-git-flow",
    "title": "Trắc nghiệm: Git Flow",
    "questions": [
      {
        "id": "q1",
        "question": "Hai nhánh vĩnh cửu (long-lived branches) song hành xuyên suốt vòng đời dự án trong Git Flow là gì?",
        "type": "single",
        "options": [
          {
            "text": "main và develop",
            "correct": true
          },
          {
            "text": "feature và bugfix",
            "correct": false
          },
          {
            "text": "release và hotfix",
            "correct": false
          },
          {
            "text": "test và production",
            "correct": false
          }
        ],
        "explanation": "Trong mô hình Git Flow cổ điển, `main` và `develop` là nhánh dài hạn; feature, release và hotfix thường được xóa sau khi tích hợp."
      },
      {
        "id": "q2",
        "question": "Trong Git Flow cổ điển, khi nhánh `release/*` hoàn tất, nhánh nào nhận bản phát hành và nơi nào nhận lại các sửa lỗi?",
        "type": "single",
        "options": [
          {
            "text": "Merge vào cả nhánh main và nhánh develop (hợp nhất kép)",
            "correct": true
          },
          {
            "text": "Chỉ merge duy nhất vào nhánh main rồi xóa bỏ",
            "correct": false
          },
          {
            "text": "Chỉ merge duy nhất vào nhánh develop",
            "correct": false
          },
          {
            "text": "Không được merge vào đâu mà giữ nguyên làm kho lưu trữ",
            "correct": false
          }
        ],
        "explanation": "Mô hình Git Flow cổ điển merge release vào `main` để phát hành và tích hợp các sửa đổi về `develop`; dự án không duy trì `develop` có thể chọn cách khác."
      },
      {
        "id": "q3",
        "question": "Nhánh `hotfix/*` trong Git Flow được rẽ nhánh trực tiếp từ đâu để giải quyết sự cố sản xuất?",
        "type": "single",
        "options": [
          {
            "text": "Rẽ nhánh trực tiếp từ nhánh main nơi phiên bản lỗi đang chạy thực tế",
            "correct": true
          },
          {
            "text": "Rẽ nhánh từ nhánh develop",
            "correct": false
          },
          {
            "text": "Rẽ nhánh từ một nhánh feature bất kỳ",
            "correct": false
          },
          {
            "text": "Rẽ nhánh từ máy tính cá nhân của lập trình viên thực tập",
            "correct": false
          }
        ],
        "explanation": "Hotfix phải xuất phát trực tiếp từ commit bị lỗi trên `main` để tránh đưa nhầm các tính năng chưa hoàn thiện trên `develop` ra môi trường sản xuất."
      },
      {
        "id": "q4",
        "question": "Nhược điểm lớn nhất khiến nhiều nhóm phần mềm hiện đại chuyển dịch từ Git Flow sang các mô hình tinh gọn hơn là gì?",
        "type": "single",
        "options": [
          {
            "text": "Quy trình nhiều nhánh phức tạp, cồng kềnh và làm chậm chu kỳ triển khai liên tục (CI/CD)",
            "correct": true
          },
          {
            "text": "Git Flow không hỗ trợ ngôn ngữ lập trình JavaScript",
            "correct": false
          },
          {
            "text": "Git Flow bắt buộc phải trả phí bản quyền hàng tháng cho tác giả",
            "correct": false
          },
          {
            "text": "Git Flow làm mất toàn bộ các commit cũ sau 30 ngày",
            "correct": false
          }
        ],
        "explanation": "Nhiều nhánh và bước đồng bộ có thể tạo thêm công việc; đây là trade-off cần cân nhắc, không có nghĩa Git Flow luôn làm chậm mọi nhóm."
      },
      {
        "id": "q5",
        "question": "Điều kiện nào có thể khiến một nhóm cân nhắc nhánh release như trong Git Flow?",
        "type": "single",
        "options": [
          {
            "text": "Khi sản phẩm có chu kỳ phát hành phiên bản cố định định kỳ (như app di động, phần mềm nhúng) và cần duy trì nhiều phiên bản cũ song song",
            "correct": true
          },
          {
            "text": "Khi dự án chỉ có một lập trình viên duy nhất làm việc cá nhân",
            "correct": false
          },
          {
            "text": "Khi toàn bộ ứng dụng chỉ là một trang HTML đơn giản",
            "correct": false
          },
          {
            "text": "Khi đội ngũ muốn triển khai mã nguồn lên production hàng chục lần mỗi ngày",
            "correct": false
          }
        ],
        "explanation": "Nhánh release có thể hữu ích khi cần ổn định một phiên bản trong lúc việc phát triển tiếp tục, nhưng không bị quyết định chỉ bởi loại sản phẩm."
      }
    ]
  }
};
export default lesson;
