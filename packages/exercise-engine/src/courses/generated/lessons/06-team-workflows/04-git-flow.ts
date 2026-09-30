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
  "content": "# Git Flow\n\n---\n\n## 🎯 Mục tiêu\n- Nắm bắt toàn diện kiến trúc 5 loại nhánh trong mô hình kinh điển Git Flow do Vincent Driessen đề xuất.\n- Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).\n- Vận hành chuẩn xác vòng đời của nhánh release và nhánh hotfix từ khi rẽ nhánh đến khi hợp nhất kép (dual-merge).\n- Đánh giá được ưu nhược điểm và nhận diện các dự án phù hợp với Git Flow: ứng dụng mobile, phần mềm đóng gói, enterprise.\n\n---\n\n## 📖 Định nghĩa\n> Git Flow là mô hình phân nhánh Git kinh điển và có cấu trúc chặt chẽ nhất, được kỹ sư Vincent Driessen giới thiệu vào năm 2010. Mô hình này thiết lập một quy trình làm việc nghiêm ngặt xoay quanh việc phát hành các phiên bản phần mềm có kế hoạch định kỳ (Scheduled Releases). Git Flow phân định mã nguồn thành hai nhánh trường tồn vĩnh viễn: `main` (lưu trữ lịch sử các bản phát hành chính thức cho khách hàng) và `develop` (nhánh tích hợp trung tâm của các tính năng mới), cùng với 3 nhóm nhánh ngắn hạn hỗ trợ: `feature/*`, `release/*` và `hotfix/*`.\n\n---\n\n## 🤔 Tại sao cần?\nĐối với các sản phẩm như ứng dụng di động trên App Store/Google Play, phần mềm nhúng hoặc các giải pháp phần mềm doanh nghiệp (Enterprise), bạn không thể tùy tiện triển khai code mới lên người dùng nhiều lần mỗi ngày. Bạn cần một giai đoạn đóng băng tính năng (Feature Freeze) để đội QA kiểm thử hồi quy toàn diện, chuẩn bị tài liệu hướng dẫn và làm thủ tục phê duyệt ứng dụng. Git Flow cung cấp một cấu trúc vững chắc và dự đoán trước được cho toàn bộ các khâu phức tạp đó.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một xưởng đóng tàu thủy quân sự. Nhánh `main` là hạm đội tàu chiến đã được bàn giao và đang thực hiện nhiệm vụ trên biển khơi. Nhánh `develop` là xưởng đóng tàu ngầm khổng lồ nơi các đội công nhân đang lắp ráp các bộ phận mới. Khi một con tàu mới hoàn thiện phần thô, nó được đưa ra ụ thử nghiệm riêng (`release branch`) để kiểm tra chống thấm nước và sơn tĩnh điện mà không làm cản trở công nhân đóng các con tàu tiếp theo trong xưởng. Nếu một tàu chiến ngoài biển bị thủng vỏ bất ngờ, một đội cứu hộ khẩn cấp (`hotfix branch`) xuất phát ngay từ `main` để sửa chữa rồi báo cáo kết quả cho cả hai nơi.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCấu trúc 5 loại nhánh trong mô hình Git Flow kinh điển:\nmain:        v1.0 ────────────────────────────────────────── v1.1 (Production)\n               ▲                                              ▲\n               │                     ┌── release/1.1 ─────────┤\n               │                     │                        ▼\ndevelop:     ──┴─► C1 ──► C2 ──► C3 ─┴─────────────────────── C4 ──► (Next sprint)\n                    │      ▲\n                    └─feat─┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột công ty phát triển ứng dụng ngân hàng di động trên iOS và Android áp dụng mô hình Git Flow. Nhánh `develop` là nơi 15 lập trình viên tích hợp các tính năng chuyển tiền và quét mã QR. Đến ngày 20 hàng tháng theo kế hoạch sprint, đội trưởng kỹ thuật tạo nhánh `release/v2.5.0` từ `develop`. Trong 5 ngày tiếp theo, nhánh này bị đóng băng tính năng, nhóm QA chỉ tập trung tìm lỗi và các lập trình viên chỉ commit sửa lỗi trực tiếp trên nhánh release này. Khi bản build vượt qua mọi bài kiểm thử an ninh, nhánh release được gộp vào `main`, gắn thẻ tag `v2.5.0`, đồng thời được gộp ngược lại vào `develop` để bảo đảm các bản sửa lỗi không bị thất lạc.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c release/v1.2.0 develop\ngit switch main && git merge --no-ff release/v1.2.0\ngit tag -a v1.2.0 -m \"Release v1.2.0\"\ngit switch develop && git merge --no-ff release/v1.2.0\ngit branch -d release/v1.2.0\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c release/v1.2.0 develop`: Tạo nhánh phát hành xuất phát từ nhánh tích hợp develop.\n- `git merge --no-ff`: Hợp nhất có tạo merge commit để bảo toàn dấu vết lịch sử của nhánh release.\n- `git tag -a`: Đánh dấu mốc phiên bản phát hành chính thức trên nhánh main.\n- Hợp nhất ngược về `develop`: Bước bắt buộc để mang các lỗi đã sửa trên release quay về nhánh phát triển.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên hợp nhất ngược nhánh release hoặc hotfix về develop**:  Dẫn đến việc các lỗi nghiêm trọng đã sửa trên production lại tái xuất hiện ở phiên bản sau.\n2. **Tiếp tục code tính năng mới trên nhánh release đang đóng băng**:  Phá vỡ mục tiêu ổn định hóa của giai đoạn chuẩn bị phát hành.\n3. **Áp dụng Git Flow cho các website đơn giản cần deploy 10 lần một ngày**:  Gây lãng phí công sức và làm chậm tiến độ dự án nghiêm trọng.\n\n---\n\n## 🧪 Lab\n1. Khởi tạo hai nhánh dài hạn `main` và `develop` trong kho lưu trữ thử nghiệm.\n2. Mô phỏng quy trình tạo một nhánh `release/v1.0.0` từ `develop`, sửa một lỗi nhỏ và gộp vào cả `main` lẫn `develop`.\n\n---\n\n## 💡 Hint\n> Nhánh release và hotfix luôn luôn phải được merge vào cả hai nhánh vĩnh cửu: main và develop.\n\n---\n\n## ✅ Validation\n- Hiểu rõ tại sao Git Flow cần quy trình hợp nhất kép (dual-merge) cho release và hotfix.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về mô hình đa nhánh Git Flow.\n\n---\n\n## 🔥 Challenge\nMô tả chi tiết quy trình xử lý một sự cố khẩn cấp (Hotfix) trong Git Flow từ lúc nhận báo cáo lỗi đến khi deploy xong.\n\n---\n\n## 📚 Tổng kết\n- Git Flow là mô hình phân nhánh chặt chẽ lý tưởng cho các sản phẩm có chu kỳ phát hành cố định.\n- Sở hữu 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).\n- Quy trình đóng băng tính năng trên release branch bảo đảm chất lượng và sự ổn định cao nhất trước khi xuất bản.\n",
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
        "explanation": "Trong kiến trúc Git Flow chuẩn, `main` và `develop` là hai nhánh tồn tại vĩnh viễn, trong khi các nhánh khác đều bị xóa sau khi hoàn thành nhiệm vụ."
      },
      {
        "id": "q2",
        "question": "Khi một nhánh `release/*` hoàn tất quá trình kiểm thử và sẵn sàng xuất bản, nó bắt buộc phải được merge vào những nhánh nào?",
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
        "explanation": "Bắt buộc phải merge vào `main` để phát hành và merge ngược vào `develop` để bảo đảm các bugfix trong giai đoạn release không bị mất ở phiên bản tiếp theo."
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
        "explanation": "Độ trễ do việc duy trì nhiều nhánh trung gian khiến Git Flow không phù hợp với các đội ngũ cần phát hành phiên bản mới liên tục hàng ngày."
      }
    ]
  }
};
export default lesson;
