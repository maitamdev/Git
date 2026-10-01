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
  "content": "# Git Flow\n\n---\n\n## 🎯 Mục tiêu\n- Nắm bắt toàn diện kiến trúc 5 loại nhánh trong mô hình kinh điển Git Flow do Vincent Driessen đề xuất.\n- Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).\n- Vận hành chuẩn xác vòng đời của nhánh release và nhánh hotfix từ khi rẽ nhánh đến khi hợp nhất kép (dual-merge).\n- Đánh giá được ưu nhược điểm và nhận diện các dự án phù hợp với Git Flow: ứng dụng mobile, phần mềm đóng gói, enterprise.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Flow\n- **Nói dễ hiểu**: Mô hình phân nhánh kinh điển với hai nhánh vĩnh cửu (`main`, `develop`) cùng các nhánh phụ (`feature`, `release`, `hotfix`).\n- **Ví dụ**: Dùng cho app ngân hàng di động phát hành bản cập nhật định kỳ mỗi tháng một lần lên App Store.\n- **Đừng nhầm**: Git Flow không tối ưu cho web app cần deploy liên tục hàng ngày; nó phù hợp cho sản phẩm đóng gói có lịch release cố định.\n\n### Dual-Merge (Hợp nhất kép)\n- **Nói dễ hiểu**: Thao tác merge một nhánh (như release hoặc hotfix) vào cả hai nhánh vĩnh cửu `main` và `develop`.\n- **Ví dụ**: Sau khi vá lỗi trên `release/v2.5.0`, merge vào `main` để xuất bản và merge ngược vào `develop` để không mất bản vá.\n- **Đừng nhầm**: Nếu quên merge ngược về `develop`, các lỗi đã sửa trên production sẽ tái xuất hiện ở phiên bản kế tiếp.\n\n### Feature Freeze (Đóng băng tính năng)\n- **Nói dễ hiểu**: Giai đoạn dừng nhận thêm tính năng mới trên nhánh release để đội ngũ QA tập trung kiểm thử hồi quy và vá lỗi.\n- **Ví dụ**: Nhánh `release/v1.2.0` chỉ nhận commit sửa bug từ QA, tuyệt đối không thêm tính năng mới của sprint sau.\n- **Đừng nhầm**: Các tính năng mới của sprint sau vẫn được commit bình thường trên nhánh `develop`, không bị dừng lại.\n\n---\n\n## 📖 Định nghĩa\nGit Flow là mô hình phân nhánh chặt chẽ có hai nhánh vĩnh cửu: `main` (lưu trữ phiên bản phát hành chính thức) và `develop` (nhánh tích hợp tính năng mới), cùng 3 loại nhánh ngắn hạn hỗ trợ: `feature/*`, `release/*` và `hotfix/*`.\n\n---\n\n## 💡 Tại sao cần\nVới các sản phẩm như ứng dụng di động hoặc phần mềm doanh nghiệp, bạn không thể deploy liên tục mà cần giai đoạn đóng băng kiểm thử hồi quy và xét duyệt. Git Flow cung cấp cấu trúc rõ ràng và kiểm soát chặt chẽ cho toàn bộ quy trình phát hành phức tạp này.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung xưởng đóng tàu quân sự. Nhánh main là hạm đội tàu chiến đang hoạt động trên biển. Nhánh develop là xưởng ngầm lắp ráp linh kiện mới. Khi hoàn thiện phần thô, tàu được đưa ra ụ thử nghiệm riêng (release) để sơn và chống thấm. Khi tàu ngoài biển thủng vỏ, đội cứu hộ (hotfix) xuất phát từ main để xử lý khẩn cấp.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCấu trúc 5 loại nhánh trong mô hình Git Flow kinh điển:\nmain:        v1.0 ────────────────────────────────────────── v1.1 (Production)\n               ▲                                              ▲\n               │                     ┌── release/1.1 ─────────┤ (Dual-merge!)\n               │                     │                        ▼\ndevelop:     ──┴─► C1 ──► C2 ──► C3 ─┴─────────────────────── C4 ──► (Next sprint)\n                    │      ▲\n                    └─feat─┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nỨng dụng ngân hàng di động áp dụng Git Flow. Đến ngày 20 hàng tháng, nhóm tạo nhánh `release/v2.5.0` từ `develop` để đóng băng tính năng cho QA kiểm thử. Sau khi vượt qua kiểm định an ninh, nhánh release được merge vào `main`, gắn tag `v2.5.0`, đồng thời merge ngược về `develop` để bảo toàn các bản vá lỗi.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch -c release/v1.2.0 develop\ngit switch main && git merge --no-ff release/v1.2.0\ngit tag -a v1.2.0 -m \"Release v1.2.0\"\ngit switch develop && git merge --no-ff release/v1.2.0\ngit branch -d release/v1.2.0\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c release/v1.2.0 develop`: Tạo nhánh phát hành xuất phát từ nhánh tích hợp develop.\n- `git merge --no-ff`: Hợp nhất có tạo merge commit để bảo toàn dấu vết lịch sử của nhánh release.\n- `git tag -a`: Đánh dấu mốc phiên bản phát hành chính thức trên nhánh main.\n- Hợp nhất ngược về `develop`: Bước bắt buộc để mang các lỗi đã sửa trên release quay về nhánh phát triển.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên merge ngược về develop**: Khiến các bản vá lỗi trên nhánh release hoặc hotfix bị thất lạc ở phiên bản tiếp theo.\n2. **Thêm tính năng vào nhánh release**: Phá vỡ nguyên tắc đóng băng tính năng (Feature Freeze) để ổn định mã nguồn.\n3. **Lạm dụng cho dự án web đơn giản**: Áp dụng mô hình nhiều nhánh cồng kềnh cho sản phẩm cần deploy liên tục sẽ gây lãng phí nguồn lực.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Khởi tạo hai nhánh dài hạn `main` và `develop` trong kho lưu trữ thử nghiệm.\n2. Tạo nhánh tính năng `feature/demo` từ `develop` và gộp lại vào `develop`.\n3. Mô phỏng quy trình tạo một nhánh `release/v1.0.0` từ `develop`, sửa một lỗi nhỏ và gộp vào cả `main` lẫn `develop`.\n4. Gắn thẻ Annotated Tag `v1.0.0` trên nhánh `main`.\n\n---\n\n## 💡 Hint & mẹo\n> Nhánh release và hotfix luôn luôn phải được merge vào cả hai nhánh vĩnh cửu: main và develop để bảo toàn lịch sử.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Hiểu rõ tại sao Git Flow cần quy trình hợp nhất kép (dual-merge) cho release và hotfix.\n- Phân biệt rõ ràng mục đích sử dụng giữa 2 nhánh dài hạn và 3 nhánh ngắn hạn.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây về mô hình đa nhánh Git Flow.\n\n---\n\n## 🚀 Thử thách nâng cao\nMô tả chi tiết quy trình xử lý một sự cố khẩn cấp (Hotfix) trong Git Flow từ lúc nhận báo cáo lỗi đến khi deploy xong.\n\n---\n\n## 📝 Tổng kết\n- Git Flow là mô hình phân nhánh chặt chẽ lý tưởng cho các sản phẩm có chu kỳ phát hành cố định.\n- Duy trì 2 nhánh vĩnh cửu: `main` (Production) và `develop` (Integration).\n- Áp dụng hợp nhất kép (Dual-Merge) cho các nhánh `release` và `hotfix`.\n",
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
      },
      {
        "id": "q5",
        "question": "Khi nào một đội ngũ phát triển phần mềm NÊN cân nhắc sử dụng Git Flow cổ điển thay vì GitHub Flow?",
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
        "explanation": "Git Flow lý tưởng cho các sản phẩm đóng gói phân phối theo phiên bản hoặc ứng dụng di động cần quy trình kiểm thử đóng băng release nghiêm ngặt."
      }
    ]
  }
};
export default lesson;
