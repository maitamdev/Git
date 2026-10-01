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
  "content": "# Professional Team Project\n\n## 🎯 Mục tiêu\n- Kết hợp workflow nhánh, commit có cấu trúc, tag và kiểm tra thay đổi trong một repo thử nghiệm.\n- Phân biệt việc ghi tài liệu/chạy lệnh Git local với cấu hình PR, CODEOWNERS và branch protection cần GitHub.\n- Thực hiện một nhánh feature và một bản sửa khẩn cấp theo quy trình mà bài tập đã chọn.\n- Nêu rõ phần nào phụ thuộc nhánh `develop`, SemVer hoặc quyền trên GitHub.\n\n## 🧩 Từ khóa hôm nay\n### Governance Framework\n- **Nói dễ hiểu**: Khung chính sách kỹ thuật và quy tắc quản trị giúp cả đội ngũ lập trình phối hợp nhịp nhàng mà không sợ giẫm chân lên nhau.\n- **Ví dụ**: Nhóm có thể yêu cầu PR, một lượt review, check CI và approval từ code owner trước khi merge.\n- **Đừng nhầm**: Một số chính sách cần cấu hình máy chủ; tài liệu quy trình, quyền bypass và ngoại lệ vẫn cần con người quản lý.\n\n### Pull Request Template\n- **Nói dễ hiểu**: Tệp mẫu gợi ý nội dung để tác giả điền khi tạo PR trên GitHub.\n- **Ví dụ**: Tệp `.github/pull_request_template.md` chứa các mục: Mô tả thay đổi, Ảnh chụp màn hình, và Các bài test đã chạy.\n- **Đừng nhầm**: Mẫu chỉ nhắc người viết; nó không kiểm chứng câu trả lời hay ép người dùng hoàn thành checklist.\n\n### Release Cadence\n- **Nói dễ hiểu**: Nhịp điệu và lịch trình phát hành phần mềm định kỳ của đội ngũ kỹ thuật ra môi trường thực tế.\n- **Ví dụ**: Một nhóm chọn phát hành vào thứ Sáu; đây là lịch riêng của nhóm, không phải quy tắc Git.\n- **Đừng nhầm**: Không áp dụng cho các bản vá khẩn cấp Hotfix; hotfix được triển khai ngay lập tức khi hoàn thành kiểm thử.\n\n## 📖 Định nghĩa\nProfessional Team Project là bài thực hành tổng hợp tích hợp toàn bộ các trụ cột quy trình làm việc nhóm chuyên nghiệp. Trong kịch bản này, bạn đóng vai trò Kỹ sư trưởng thiết lập hạ tầng quản trị kho mã nguồn từ con số không: ban hành quy chuẩn phân nhánh, thiết lập hàng rào bảo vệ nhánh, cấu hình phân quyền tệp CODEOWNERS, chỉ đạo giải quyết xung đột và điều phối phát hành theo chuẩn SemVer.\n\n## 💡 Tại sao cần\nLý thuyết quy trình chỉ có giá trị thực sự khi bạn trực tiếp điều phối một luồng công việc đa tầng dưới áp lực thực tế. Dự án tổng hợp này giúp củng cố phản xạ nghề nghiệp vững vàng, giúp bạn tự tin làm việc trong các tập đoàn công nghệ lớn với quy chuẩn quốc tế khắt khe.\n\n## 🧠 Mental Model\nHãy hình dung bạn là tổng công trình sư điều hành thi công tòa nhà chọc trời. Bạn không trực tiếp xây từng viên gạch mà thiết kế bản vẽ phân khu (`Branching Strategy`), dựng giàn giáo bảo hiểm (`Branch Protection`), chỉ định kỹ sư phụ trách từng tầng (`CODEOWNERS`), ban hành quy chuẩn nghiệm thu vật tư (`Conventional Commits`) và sẵn sàng phương án chữa cháy khẩn cấp (`Hotfix Workflow`).\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Setup[Khởi tạo Repo & Chính sách] --> Policies[Cấu hình Branch Protection & CODEOWNERS]\n    Policies --> DevLoop[Chu trình Feature: Branch -> Conventional Commit -> PR]\n    DevLoop --> Gate{CI xanh & CODEOWNERS Approve?}\n    Gate -- Đạt --> Merge[Squash & Merge vào main]\n    DevLoop -. Sự cố Prod .-> Hotfix[Tách hotfix từ main -> Dual-merge -> Tag SemVer]\n```\n\n## 🏢 Ví dụ thực tế\nVí dụ giả định theo Git Flow: repo có `main` và `develop`; nhóm cấu hình CODEOWNERS trên nhánh đích, bật các điều kiện review/CI họ cần và có pipeline phát hành riêng. Khi sửa cổng thanh toán, GitHub có thể yêu cầu review từ owner; approval chỉ là điều kiện merge nếu rule tương ứng bật. Với hotfix, nhóm bắt đầu từ commit production thực tế, kiểm thử, phát hành theo chính sách rồi đồng bộ về `develop` nếu còn dùng nhánh này.\n\n## 💻 Command & Cú pháp\n```bash\n# Tạo cột mốc phiên bản gốc ổn định ban đầu\ngit tag -a v1.0.0 -m \"Release v1.0.0 baseline\"\n\n# Tách nhánh tính năng mới và commit chuẩn mực\n# Trước commit, phải sửa hoặc tạo file rồi stage thay đổi\ngit switch -c feat/order-service\ngit commit -m \"feat(order): implement order placement logic\"\n\n# Tạo hotfix từ main trong ví dụ Git Flow; xác nhận main đúng với production\ngit switch -c hotfix/v1.0.1 main\ngit commit -m \"fix(order): prevent duplicate checkout charges\"\n```\n\n## 🔍 Giải thích command\n- `git tag -a v1.0.0`: Gắn tag vào commit hiện tại; chỉ dùng số này nếu đó thực sự là mốc phát hành dự án.\n- `git commit -m \"feat(order): <mo-ta>\"`: Tạo commit sau khi đã sửa file và stage; format chỉ tự động hóa nếu repo có cấu hình tool phù hợp.\n- `git switch -c hotfix/v1.0.1 main`: Trong ví dụ này, tạo nhánh từ `main`; cần xác minh nhánh trỏ đúng commit đang chạy production.\n\n## ⚠️ Sai lầm phổ biến\n- Cho rằng có tệp CODEOWNERS là approval đã bắt buộc; cần bật review-from-code-owners trong branch rule.\n- Mong đợi Conventional Commits tự tạo changelog/phiên bản khi repo chưa cấu hình công cụ.\n- Quên đồng bộ bản vá về nhánh phát triển đang được duy trì; chọn merge/cherry-pick theo chính sách nhóm.\n\n## 🧪 Lab thực hành\nLàm phần A trong repo local. Phần B cần repository GitHub thử nghiệm và quyền quản trị; nếu chưa có, đọc cấu hình mẫu và ghi kết quả dự kiến, không cần tạo tài khoản.\n\n1. Bắt đầu từ repo thử nghiệm có commit trên `main`; tạo một file README, stage và commit `docs: start team demo`, sau đó kiểm tra bằng `git status`.\n2. Tạo `develop` từ `main`, rồi tạo `feat/auth` từ `develop`. Sửa một file, stage, commit `feat(auth): add sign-in instructions` và merge nhánh feature về `develop`.\n3. Tạo `release/v1.0.0` từ `develop`, sửa một lỗi nhỏ, commit, merge vào `main` rồi gắn tag `v1.0.0` lên commit phát hành; nếu theo Git Flow, tích hợp sửa đổi cần giữ lại về `develop`.\n4. Tạo `hotfix/v1.0.1` từ `main`, sửa một lỗi khác, stage/commit, merge vào `main`, gắn tag sau khi xác minh commit; tích hợp bản sửa về `develop` nếu nhánh còn được dùng.\n5. Chạy `git status` và `git log --oneline --graph --decorate --all`; chỉ xóa nhánh thử nghiệm sau khi xác nhận các commit cần giữ đã được tích hợp.\n6. **Phần B tùy chọn**: trên repo GitHub thử nghiệm, thêm CODEOWNERS/PR template và cấu hình branch rule. CODEOWNERS phải có trên nhánh đích; chọn reviewer có quyền ghi và bật điều kiện approval riêng nếu muốn nó chặn merge.\n\n## 💡 Hint & mẹo\n- `git status` giúp xác nhận file nào đang sửa/stage trước khi đổi nhánh hoặc commit.\n- Chọn workflow theo các nhánh nhóm thực sự duy trì; không cần tạo `develop`, release branch hay CODEOWNERS nếu dự án không dùng.\n\n## ✅ Validation & Kết quả mong đợi\n- Có thể chỉ ra feature commit, release/hotfix commit và commit mà mỗi tag đang trỏ tới.\n- Giải thích được các bước GitHub chỉ hoạt động khi có remote, quyền và quy tắc tương ứng.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để tổng kết toàn diện các kiến thức và kỹ năng then chốt của Level 6: Team Workflows.\n\n## 🚀 Thử thách nâng cao\nThiết kế tệp cấu hình GitHub Actions hoàn chỉnh để tự động kiểm tra định dạng commit message và tự động đóng gói ứng dụng mỗi khi có thẻ tag phiên bản mới được đẩy lên kho lưu trữ.\n\n## 📝 Tổng kết\n- Branch protection, CODEOWNERS và commit conventions là các lựa chọn có cấu hình riêng, không tự xuất hiện khi dùng Git.\n- Feature/release/hotfix branches cần gắn với workflow cụ thể của nhóm; hotfix phải bắt đầu từ commit production đúng.\n- Đánh giá dựa trên việc giải thích được lựa chọn, thực hiện được thao tác và kiểm tra được kết quả.\n",
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
        "explanation": "Đây là các lựa chọn có thể phối hợp; chúng cần cấu hình phù hợp và không tự bảo đảm chất lượng hay an toàn."
      },
      {
        "id": "q2",
        "question": "Khi một dự án áp dụng song song cả Feature Branch và Hotfix Workflow, điều gì bảo đảm không bị mất mã nguồn sửa lỗi?",
        "type": "single",
        "options": [
          {
            "text": "Tích hợp bản vá vào nhánh phát hành và nhánh phát triển đang được duy trì theo workflow của nhóm",
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
        "explanation": "Trong Git Flow, nhóm thường đưa bản sửa về `develop`; nếu không duy trì nhánh này, hãy đồng bộ nơi chứa lịch sử phát triển tương ứng."
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
        "explanation": "Mẫu nhắc tác giả cung cấp ngữ cảnh; nó không xác minh nội dung hay bắt buộc các kiểm tra đã liệt kê phải đạt."
      },
      {
        "id": "q4",
        "question": "Sau capstone này, kỹ năng nào bạn cần chứng minh bằng kết quả quan sát được?",
        "type": "single",
        "options": [
          {
            "text": "Giải thích workflow đã chọn, thực hiện các nhánh/commit và xác nhận tag trỏ đúng commit",
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
        "explanation": "Kết quả cụ thể cho thấy bạn hiểu đường đi của thay đổi; capstone không tự chứng nhận thành thạo mọi workflow."
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
        "explanation": "Khi đã cài và cấu hình, commit-msg hook có thể gọi commitlint để từ chối thông điệp không hợp lệ trên máy đó."
      },
      {
        "id": "q6",
        "question": "Khi vận hành dự án nhóm với hàng chục lập trình viên, chiến lược squash merge khi gộp Pull Request mang lại lợi ích gì cho nhánh main?",
        "type": "single",
        "options": [
          {
            "text": "Tạo một commit trên nhánh đích đại diện cho thay đổi của PR; lịch sử nhánh feature không còn được giữ nguyên từng commit ở đích",
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
        "explanation": "Squash merge gộp các thay đổi của PR thành một commit trên nhánh đích; nội dung và khả năng revert vẫn cần được review."
      }
    ]
  }
};
export default lesson;
