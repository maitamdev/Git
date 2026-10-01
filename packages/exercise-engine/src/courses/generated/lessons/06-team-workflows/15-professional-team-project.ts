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
  "content": "# Professional Team Project\n\n## 🎯 Mục tiêu\n- Tổng hợp toàn bộ các kỹ năng và kiến thức đã học trong Level 6 vào một dự án mô phỏng thực chiến quy mô doanh nghiệp.\n- Thiết lập hoàn chỉnh cấu trúc dự án chuẩn mực: Protected Branch, Branch Protection Rules, tệp CODEOWNERS và mẫu PR Template.\n- Vận hành trơn tru quy trình Feature Branch kết hợp Conventional Commits và Semantic Versioning.\n- Xử lý thành công tình huống khẩn cấp Hotfix trên môi trường sản xuất song song với việc phát triển tính năng mới.\n\n## 🧩 Từ khóa hôm nay\n### Governance Framework\n- **Nói dễ hiểu**: Khung chính sách kỹ thuật và quy tắc quản trị giúp cả đội ngũ lập trình phối hợp nhịp nhàng mà không sợ giẫm chân lên nhau.\n- **Ví dụ**: Kết hợp khóa nhánh chính, bắt buộc 1 lượt review từ CODEOWNERS và test CI phải xanh mới cho phép merge.\n- **Đừng nhầm**: Không phải quy định hành chính trên giấy, mà là các chốt chặn tự động hóa 100% bằng công cụ.\n\n### Pull Request Template\n- **Nói dễ hiểu**: Mẫu nội dung định sẵn tự động xuất hiện khi mở PR để nhắc nhở người tạo cung cấp đủ ngữ cảnh và checklist an toàn.\n- **Ví dụ**: Tệp `.github/pull_request_template.md` chứa các mục: Mô tả thay đổi, Ảnh chụp màn hình, và Các bài test đã chạy.\n- **Đừng nhầm**: Không bắt buộc phải viết dài dòng, mục đích chính là bảo đảm không bỏ sót các bước kiểm tra then chốt.\n\n### Release Cadence\n- **Nói dễ hiểu**: Nhịp điệu và lịch trình phát hành phần mềm định kỳ của đội ngũ kỹ thuật ra môi trường thực tế.\n- **Ví dụ**: Nhóm cố định cắt nhánh release vào thứ Tư hàng tuần và triển khai lên máy chủ sản xuất vào sáng thứ Sáu.\n- **Đừng nhầm**: Không áp dụng cho các bản vá khẩn cấp Hotfix; hotfix được triển khai ngay lập tức khi hoàn thành kiểm thử.\n\n## 📖 Định nghĩa\nProfessional Team Project là bài thực hành tổng hợp tích hợp toàn bộ các trụ cột quy trình làm việc nhóm chuyên nghiệp. Trong kịch bản này, bạn đóng vai trò Kỹ sư trưởng thiết lập hạ tầng quản trị kho mã nguồn từ con số không: ban hành quy chuẩn phân nhánh, thiết lập hàng rào bảo vệ nhánh, cấu hình phân quyền tệp CODEOWNERS, chỉ đạo giải quyết xung đột và điều phối phát hành theo chuẩn SemVer.\n\n## 💡 Tại sao cần\nLý thuyết quy trình chỉ có giá trị thực sự khi bạn trực tiếp điều phối một luồng công việc đa tầng dưới áp lực thực tế. Dự án tổng hợp này giúp củng cố phản xạ nghề nghiệp vững vàng, giúp bạn tự tin làm việc trong các tập đoàn công nghệ lớn với quy chuẩn quốc tế khắt khe.\n\n## 🧠 Mental Model\nHãy hình dung bạn là tổng công trình sư điều hành thi công tòa nhà chọc trời. Bạn không trực tiếp xây từng viên gạch mà thiết kế bản vẽ phân khu (`Branching Strategy`), dựng giàn giáo bảo hiểm (`Branch Protection`), chỉ định kỹ sư phụ trách từng tầng (`CODEOWNERS`), ban hành quy chuẩn nghiệm thu vật tư (`Conventional Commits`) và sẵn sàng phương án chữa cháy khẩn cấp (`Hotfix Workflow`).\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Setup[Khởi tạo Repo & Chính sách] --> Policies[Cấu hình Branch Protection & CODEOWNERS]\n    Policies --> DevLoop[Chu trình Feature: Branch -> Conventional Commit -> PR]\n    DevLoop --> Gate{CI xanh & CODEOWNERS Approve?}\n    Gate -- Đạt --> Merge[Squash & Merge vào main]\n    DevLoop -. Sự cố Prod .-> Hotfix[Tách hotfix từ main -> Dual-merge -> Tag SemVer]\n```\n\n## 🏢 Ví dụ thực tế\nTrong dự án thương mại điện tử, nhóm thiết lập `.github/CODEOWNERS` phân chia quyền sở hữu cho thư mục `api/` và `web/`. Tiếp theo, nhóm cấu hình nhánh `main` cấm push trực tiếp và bắt buộc vượt qua kiểm thử CI. Khi một kỹ sư mở PR thêm cổng thanh toán, hệ thống tự động gán đúng reviewer tài chính. Đồng thời khi có sự cố giao dịch, nhóm kích hoạt nhánh `hotfix/v1.0.1`, vá lỗi, thực hiện hợp nhất kép vào cả `main` lẫn `develop` và gắn tag SemVer để triển khai tức thì.\n\n## 💻 Command & Cú pháp\n```bash\n# Tạo cột mốc phiên bản gốc ổn định ban đầu\ngit tag -a v1.0.0 -m \"Release v1.0.0 baseline\"\n\n# Tách nhánh tính năng mới và commit chuẩn mực\ngit switch -c feat/order-service\ngit commit -m \"feat(order): implement order placement logic\"\n\n# Tách nhánh cứu hộ khẩn cấp từ main khi có sự cố\ngit switch -c hotfix/v1.0.1 main\ngit commit -m \"fix(order): prevent duplicate checkout charges\"\n```\n\n## 🔍 Giải thích command\n- `git tag -a v1.0.0`: Đánh dấu cột mốc phiên bản ổn định ban đầu làm điểm mốc đối chiếu cho dự án.\n- `git commit -m \"feat(order): <mo-ta>\"`: Áp dụng cú pháp Conventional Commits để chuẩn hóa lịch sử và phục vụ tự động hóa changelog.\n- `git switch -c hotfix/v1.0.1 main`: Rẽ nhánh giải cứu sản xuất trực tiếp từ `main` để dập lỗi khẩn cấp mà không vướng tính năng dở dang.\n\n## ⚠️ Sai lầm phổ biến\n- Bỏ qua bước thiết lập CODEOWNERS và Branch Protection trước khi mở quyền cho các thành viên đóng góp code.\n- Viết commit message tự do không tuân thủ quy chuẩn khiến công cụ tự động hóa không thể sinh nhật ký phát hành.\n- Quên đồng bộ bản vá hotfix về nhánh phát triển khiến nhánh `develop` bị lỗi thời mã nguồn.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác thực hành bài tập lớn mô phỏng trên máy và đối chiếu theo hướng dẫn bên dưới.\n\n1. Khởi tạo kho lưu trữ với tệp `.github/CODEOWNERS` và tệp `.github/pull_request_template.md`.\n2. Tạo nhánh `feat/auth` và thực hiện các commit chuẩn Conventional Commits.\n3. Mở Pull Request mô phỏng, kiểm tra danh sách review và checklist an toàn.\n4. Giả lập một sự cố sản xuất, tạo nhánh `hotfix/v1.0.1`, vá lỗi và thực hiện hợp nhất kép vào cả `main` lẫn `develop`.\n5. Gắn thẻ tag SemVer `v1.0.1` và dùng `git log --graph --oneline` để chiêm ngưỡng cây lịch sử sạch đẹp của toàn bộ dự án.\n\n## 💡 Hint & mẹo\n- Tính kỷ luật và sự rõ ràng trong quy trình phân nhánh là yếu tố quyết định giúp các đội ngũ kỹ sư lớn vận hành hiệu quả mà không bị hỗn loạn.\n- Luôn kiểm tra trạng thái cây Git bằng `git status` trước khi chuyển đổi qua lại giữa nhánh tính năng và nhánh cứu hộ.\n\n## ✅ Validation & Kết quả mong đợi\n- Lịch sử Git sạch đẹp, phân định rõ ràng giữa các commit tính năng và các bản vá khẩn cấp.\n- Toàn bộ các thẻ tag SemVer trỏ chính xác vào các mốc phát hành trên nhánh chính.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để tổng kết toàn diện các kiến thức và kỹ năng then chốt của Level 6: Team Workflows.\n\n## 🚀 Thử thách nâng cao\nThiết kế tệp cấu hình GitHub Actions hoàn chỉnh để tự động kiểm tra định dạng commit message và tự động đóng gói ứng dụng mỗi khi có thẻ tag phiên bản mới được đẩy lên kho lưu trữ.\n\n## 📝 Tổng kết\n- Kết hợp Protected Branch, CODEOWNERS và Conventional Commits tạo nên nền tảng quản trị mã nguồn vững chắc.\n- Khả năng xử lý linh hoạt giữa Feature Branch, Release Branch và Hotfix Workflow là thước đo của một kỹ sư Git chuyên nghiệp.\n- Bạn đã sẵn sàng tự tin bước vào môi trường phát triển phần mềm cộng tác quy mô doanh nghiệp!\n",
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
