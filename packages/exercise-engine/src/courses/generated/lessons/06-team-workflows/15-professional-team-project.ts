import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "15-professional-team-project",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "15-professional-team-project",
    "title": "Professional Team Project",
    "level": "advanced",
    "duration": 50,
    "xp": 250,
    "prerequisites": [
      "13-hotfix-workflow",
      "14-team-conflict-scenario"
    ],
    "objectives": [
      "Tổng hợp toàn bộ các kỹ năng và kiến thức đã học trong Level 6 vào một dự án mô phỏng thực chiến quy mô doanh nghiệp.",
      "Thiết lập hoàn chỉnh cấu trúc dự án chuẩn mực: Protected Branch, Branch Protection Rules, tệp CODEOWNERS và mẫu PR Template.",
      "Vận hành trơn tru quy trình Feature Branch kết hợp Conventional Commits và Semantic Versioning.",
      "Xử lý thành công tình huống khẩn cấp Hotfix trên môi trường sản xuất song song với việc phát triển tính năng mới."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "professional team project",
      "du an nhom chuyen nghiep",
      "capstone level 6",
      "branch protection simulation",
      "codeowners review",
      "tong hop level 6"
    ],
    "commands": [
      "git tag -a v1.0.0 -m \"Release v1.0.0 initial baseline\"",
      "git switch -c feat/order-service",
      "git commit -m \"feat(order): implement order placement logic\"",
      "git switch -c hotfix/v1.0.1 main",
      "git commit -m \"fix(order): prevent duplicate checkout charges\""
    ]
  },
  "content": "# Professional Team Project\n\n---\n\n## 🎯 Mục tiêu\n- Tổng hợp toàn bộ các kỹ năng và kiến thức đã học trong Level 6 vào một dự án mô phỏng thực chiến quy mô doanh nghiệp.\n- Thiết lập hoàn chỉnh cấu trúc dự án chuẩn mực: Protected Branch, Branch Protection Rules, tệp CODEOWNERS và mẫu PR Template.\n- Vận hành trơn tru quy trình Feature Branch kết hợp Conventional Commits và Semantic Versioning.\n- Xử lý thành công tình huống khẩn cấp Hotfix trên môi trường sản xuất song song với việc phát triển tính năng mới.\n\n---\n\n## 📖 Định nghĩa\n> Professional Team Project (Dự án nhóm chuyên nghiệp) là bài tập tổng hợp thực chiến đỉnh cao khép lại Level 6: Team Workflows. Trong thử thách này, bạn sẽ đóng vai trò Kỹ sư trưởng kiêm Trưởng nhóm kỹ thuật (Lead Engineer) của một nền tảng thương mại điện tử hiện đại. Nhiệm vụ của bạn là kiến thiết toàn bộ hạ tầng quy trình cộng tác từ con số không: ban hành quy ước phân nhánh, thiết lập hàng rào bảo vệ nhánh, cấu hình phân quyền tệp CODEOWNERS, chỉ đạo giải quyết xung đột mã nguồn và điều phối phát hành các phiên bản phần mềm theo chuẩn SemVer.\n\n---\n\n## 🤔 Tại sao cần?\nLý thuyết về các quy trình sẽ mãi chỉ là lý thuyết nếu bạn chưa từng tự tay trải nghiệm cảm giác điều phối một luồng công việc đa tầng phức tạp dưới áp lực thời gian thực tế. Bài tập lớn này được thiết kế để rèn luyện bản lĩnh nghề nghiệp, giúp bạn tự tin bước vào bất kỳ tập đoàn công nghệ lớn nào trên thế giới và hòa nhập ngay lập tức vào guồng quay phát triển phần mềm chuẩn mực quốc tế.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn là một vị tổng công trình sư đang điều hành việc xây dựng một tòa nhà chọc trời 80 tầng. Bạn không thể chỉ tự mình cầm bay đi xây từng viên gạch. Bạn phải thiết kế bản vẽ quy hoạch phân khu (`Branching Strategy`), lắp đặt giàn giáo an toàn và lưới bảo vệ chống rơi vãi (`Branch Protection`), chỉ định rõ ràng kỹ sư chịu trách nhiệm từng tầng lầu (`CODEOWNERS`), ban hành quy chuẩn nghiệm thu vật liệu (`Conventional Commits`) và sẵn sàng phương án kích hoạt còi báo động cứu hỏa xử lý sự cố bất ngờ (`Hotfix Workflow`).\n\n---\n\n## 🖼 Sơ đồ\n```text\nKiến trúc quy trình tổng hợp của Professional Team Project:\nRepository Settings:\n├── Protected Branch: main (Require 1 Approval, Require CI Pass, Require Linear History)\n├── .github/CODEOWNERS (Phân quyền @frontend, @backend, @devops)\n└── .github/PULL_REQUEST_TEMPLATE.md (Chuẩn hóa nội dung review)\n\nVòng lặp vận hành liên hoàn:\nFeature Request ──► feat/* ──► Conventional Commits ──► PR ──► CODEOWNERS Review ──► CI Pass ──► Squash & Merge\n                                                                                                        │\nIncident Alert  ──► hotfix/* ──► Fast Patch ─────────► Dual Merge (main & develop) ────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong bài tập lớn mô phỏng, học viên khởi tạo kho lưu trữ `ecommerce-platform`. Đầu tiên, học viên thiết lập tệp `.github/CODEOWNERS` phân chia quyền sở hữu cho các thư mục `api/` và `web/`. Tiếp theo, học viên cấu hình chính sách bảo vệ nhánh `main`: cấm push trực tiếp, bắt buộc có ít nhất 1 lượt review và bài kiểm tra CI phải báo xanh. Sau đó, học viên tạo nhánh `feat/cart-checkout`, viết các commit theo đúng chuẩn `feat(cart): add payment gateway`, mở PR và đóng vai reviewer để kiểm duyệt. Tiếp đó, hệ thống kích hoạt kịch bản lỗi khẩn cấp trên production, học viên bình tĩnh tạo nhánh `hotfix/v1.0.1`, vá lỗi, thực hiện quy trình hợp nhất kép vào cả `main` lẫn `develop` và gắn thẻ tag `v1.0.1`. Cuối cùng, học viên kích hoạt công cụ tự động sinh tệp `CHANGELOG.md` hoàn chỉnh và kết thúc bài thi với điểm số tuyệt đối.\n\n---\n\n## 💻 Command\n```bash\ngit tag -a v1.0.0 -m \"Release v1.0.0 initial baseline\"\ngit switch -c feat/order-service\ngit commit -m \"feat(order): implement order placement logic\"\ngit switch -c hotfix/v1.0.1 main\ngit commit -m \"fix(order): prevent duplicate checkout charges\"\n```\n\n---\n\n## 🔍 Giải thích command\n- `git tag -a v1.0.0`: Tạo cột mốc phiên bản gốc ổn định cho hệ thống thương mại điện tử.\n- `feat(order): <mô-tả>`: Commit tính năng mới chuẩn mực theo cú pháp Conventional Commits.\n- `hotfix/v1.0.1`: Rẽ nhánh giải cứu sản xuất trực tiếp từ main và vá lỗi khẩn cấp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Bỏ qua bước cấu hình CODEOWNERS và Branch Protection trước khi cho thành viên vào phát triển.**: Bỏ qua bước cấu hình CODEOWNERS và Branch Protection trước khi cho thành viên vào phát triển.\n2. **Viết các commit message không tuân thủ chuẩn Conventional Commits làm hỏng quy trình sinh changelog.**: Viết các commit message không tuân thủ chuẩn Conventional Commits làm hỏng quy trình sinh changelog.\n3. **Quên đồng bộ bản vá hotfix về nhánh phát triển khiến nhánh develop bị lạc hậu mã nguồn.**: Quên đồng bộ bản vá hotfix về nhánh phát triển khiến nhánh develop bị lạc hậu mã nguồn.\n\n---\n\n## 🧪 Lab\n1. Khởi tạo dự án mẫu hoàn chỉnh với tệp `.github/CODEOWNERS` và quy tắc Branch Protection.\n2. Thực hiện toàn bộ chuỗi quy trình từ tạo tính năng mới, mở PR, xử lý một sự cố hotfix giả lập và gắn thẻ phát hành SemVer.\n\n---\n\n## 💡 Hint\n> Hãy tưởng tượng bạn đang điều hành một đội ngũ 50 kỹ sư: sự rõ ràng và kỷ luật trong quy trình là chìa khóa duy nhất để dự án không rơi vào hỗn loạn.\n\n---\n\n## ✅ Validation\n- Toàn bộ lịch sử commit, các thẻ tag SemVer và cây phân nhánh đều sạch đẹp, không có commit rác hay xung đột tồn đọng.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây để tổng kết toàn diện kiến thức của Level 6.\n\n---\n\n## 🔥 Challenge\nXây dựng một tệp Pull Request Template chuẩn hóa (.github/pull_request_template.md) có danh sách kiểm tra an toàn cho toàn bộ dự án.\n\n---\n\n## 📚 Tổng kết\n- Level 6 trang bị toàn diện các tư duy, kỹ năng và quy chuẩn cộng tác nhóm chuyên nghiệp đỉnh cao.\n- Sự kết hợp giữa Protected Branch, CODEOWNERS, Conventional Commits và SemVer tạo nên bộ khung kỹ thuật bất khả chiến bại.\n- Bạn đã sẵn sàng tự tin đảm nhận vai trò kỹ sư phần mềm chuyên nghiệp trong bất kỳ môi trường công nghệ hiện đại nào.\n",
  "quiz": {
    "id": "quiz-06-15-professional-team-project",
    "title": "Trắc nghiệm: Dự án nhóm chuyên nghiệp",
    "questions": [
      {
        "id": "q1",
        "question": "Bộ 3 trụ cột kỹ thuật nào sau đây kết hợp với nhau tạo nên nền tảng quản trị mã nguồn vững chắc nhất cho một dự án chuyên nghiệp?",
        "type": "single",
        "options": [
          {
            "text": "Protected Branch Rules, tệp phân quyền CODEOWNERS và chuẩn thông điệp Conventional Commits",
            "correct": true
          },
          {
            "text": "Tắt kết nối Internet, cấm commit mã nguồn và xóa thư mục .git",
            "correct": false
          },
          {
            "text": "Chỉ sử dụng duy nhất một nhánh main và không bao giờ mở Pull Request",
            "correct": false
          },
          {
            "text": "Gửi mã nguồn qua Zalo và lưu trữ dự án trên USB",
            "correct": false
          }
        ],
        "explanation": "Ba công cụ này bảo vệ an toàn cho nhánh chính, tự động hóa người kiểm duyệt và chuẩn hóa lịch sử phát triển của toàn đội ngũ."
      },
      {
        "id": "q2",
        "question": "Khi một dự án áp dụng song song cả Feature Branch và Hotfix Workflow, điều gì bảo đảm không bị mất mã nguồn sửa lỗi?",
        "type": "single",
        "options": [
          {
            "text": "Quy trình hợp nhất kép (Dual-merge) đưa bản vá của nhánh hotfix vào cả nhánh main và nhánh develop",
            "correct": true
          },
          {
            "text": "Tự động sao lưu mã nguồn ra đĩa mềm 1.44MB",
            "correct": false
          },
          {
            "text": "Yêu cầu lập trình viên học thuộc lòng toàn bộ các dòng mã vừa viết",
            "correct": false
          },
          {
            "text": "Không bao giờ được phép tắt máy tính tại văn phòng",
            "correct": false
          }
        ],
        "explanation": "Hợp nhất kép là cơ chế then chốt bảo đảm các bản sửa lỗi khẩn cấp trên production luôn có mặt trong các phiên bản tương lai trên develop."
      },
      {
        "id": "q3",
        "question": "Vai trò lớn nhất của việc thiết lập tệp mẫu Pull Request Template (`.github/pull_request_template.md`) là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nhắc nhở tác giả cung cấp đầy đủ thông tin mô tả, bằng chứng kiểm thử và danh sách kiểm tra an toàn trước khi nhờ đồng nghiệp review",
            "correct": true
          },
          {
            "text": "Tự động gửi hóa đơn thu tiền người xem Pull Request",
            "correct": false
          },
          {
            "text": "Chặn không cho phép bất kỳ ai gửi bình luận phản hồi",
            "correct": false
          },
          {
            "text": "Tự động dịch mã nguồn sang ngôn ngữ tiếng Pháp",
            "correct": false
          }
        ],
        "explanation": "Mẫu PR chuẩn hóa giúp nâng cao chất lượng mô tả công việc, giúp người review nắm bắt ngữ cảnh nhanh chóng và không bỏ sót các bước kiểm tra quan trọng."
      },
      {
        "id": "q4",
        "question": "Chúc mừng bạn đã hoàn thành xuất sắc Level 6: Team Workflows! Năng lực cốt lõi lớn nhất bạn đã đạt được là gì?",
        "type": "single",
        "options": [
          {
            "text": "Làm chủ toàn diện các mô hình quy trình phân nhánh, kiểm soát an ninh mã nguồn và tự tin cộng tác trong các đội ngũ công nghệ quy mô lớn",
            "correct": true
          },
          {
            "text": "Chỉ biết gõ duy nhất một câu lệnh git status",
            "correct": false
          },
          {
            "text": "Không còn muốn làm việc với bất kỳ lập trình viên nào khác",
            "correct": false
          },
          {
            "text": "Chỉ thích lập trình một mình không theo quy chuẩn nào",
            "correct": false
          }
        ],
        "explanation": "Bạn đã hoàn thiện đầy đủ tư duy và kỹ năng của một kỹ sư Git chuyên nghiệp, sẵn sàng đóng góp xuất sắc vào các dự án phần mềm thực tế!"
      },
      {
        "id": "q5",
        "question": "Trong quy trình CI/CD chuyên nghiệp, công cụ nào sau đây thường được dùng để tự động chặn các commit không tuân thủ Conventional Commits ngay tại máy cá nhân?",
        "type": "single",
        "options": [
          {
            "text": "Git Hook (như Husky kết hợp commitlint) chạy kiểm tra định dạng thông điệp trước khi commit được tạo",
            "correct": true
          },
          {
            "text": "Chương trình diệt virus Windows Defender",
            "correct": false
          },
          {
            "text": "Trình duyệt web Google Chrome",
            "correct": false
          },
          {
            "text": "Phần mềm nghe nhạc Spotify",
            "correct": false
          }
        ],
        "explanation": "Husky và commitlint kiểm tra cú pháp commit ngay ở bước commit-msg hook, ngăn chặn thông điệp sai chuẩn trước khi được đẩy lên remote."
      },
      {
        "id": "q6",
        "question": "Khi vận hành dự án nhóm với hàng chục lập trình viên, chiến lược squash merge khi gộp Pull Request mang lại lợi ích gì cho nhánh main?",
        "type": "single",
        "options": [
          {
            "text": "Nén toàn bộ các commit nhỏ thử nghiệm trên nhánh tính năng thành duy nhất 1 commit sạch đẹp trên nhánh main",
            "correct": true
          },
          {
            "text": "Tự động xóa toàn bộ mã nguồn của dự án",
            "correct": false
          },
          {
            "text": "Nhân đôi số lượng commit trên nhánh chính lên gấp mười lần",
            "correct": false
          },
          {
            "text": "Làm chậm tốc độ tải trang web của dự án",
            "correct": false
          }
        ],
        "explanation": "Squash merge giúp nhánh chính có lịch sử thẳng tắp, mỗi commit đại diện cho một tính năng hoàn chỉnh, cực kỳ dễ tra cứu và revert khi cần thiết."
      }
    ]
  }
};
export default lesson;
