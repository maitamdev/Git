import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-branch-protection-rules",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "08-branch-protection-rules",
    "title": "Branch Protection Rules",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "07-protected-branch"
    ],
    "objectives": [
      "Làm chủ toàn diện các tùy chọn chi tiết trong bộ quy tắc Branch Protection Rules trên GitHub.",
      "Thiết lập yêu cầu bắt buộc kiểm duyệt mã nguồn: số lượng người phê duyệt tối thiểu (Require approvals) và tự động vô hiệu hóa duyệt khi có commit mới.",
      "Cấu hình cổng kiểm tra trạng thái bắt buộc (Require status checks to pass) tích hợp chặt chẽ với CI/CD.",
      "Áp dụng quy tắc lịch sử tuyến tính (Require linear history) và chữ ký bảo mật (Require signed commits)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch protection rules",
      "quy tac bao ve nhanh",
      "require pull request reviews",
      "status checks",
      "require linear history",
      "ci gate"
    ],
    "commands": [
      "gh pr checks",
      "gh pr status",
      "git log --oneline --show-signature"
    ]
  },
  "content": "# Branch Protection Rules\n\n## 🎯 Mục tiêu\n- Làm chủ toàn diện các tùy chọn chi tiết trong bộ quy tắc Branch Protection Rules trên GitHub.\n- Thiết lập yêu cầu bắt buộc kiểm duyệt mã nguồn: số lượng người phê duyệt tối thiểu (Require approvals) và tự động vô hiệu hóa duyệt khi có commit mới.\n- Cấu hình cổng kiểm tra trạng thái bắt buộc (Require status checks to pass) tích hợp chặt chẽ với CI/CD.\n- Hiểu điều kiện lịch sử tuyến tính và chữ ký commit; bật chúng khi repo đã thống nhất cách tạo/xác minh commit.\n\n## 🧩 Từ khóa hôm nay\n### Branch Protection Rules\n- **Nói dễ hiểu**: Các điều kiện có thể áp dụng cho nhánh quan trọng, chẳng hạn yêu cầu PR, lượt duyệt hoặc status check trước khi merge.\n- **Ví dụ**: Khóa nhánh `main`, chỉ cho phép merge khi đã có ít nhất một đồng nghiệp bấm Approve và test CI chạy qua.\n- **Đừng nhầm**: Không phải quyền truy cập tài khoản, mà là điều kiện bắt buộc áp dụng riêng cho từng nhánh Git.\n\n### Status Checks\n- **Nói dễ hiểu**: Kết quả kiểm tra được gửi lên GitHub bởi CI hoặc ứng dụng tích hợp; quy tắc có thể yêu cầu một số kết quả cụ thể phải đạt trước khi merge.\n- **Ví dụ**: Bài kiểm tra `npm test` và `lint` phải báo màu xanh thì nút Merge mới sáng lên.\n- **Đừng nhầm**: Không phải mọi status check đều do GitHub Actions tạo ra, và CI không thay thế review của con người.\n\n### Linear History\n- **Nói dễ hiểu**: Quy tắc từ chối merge commit trên nhánh được bảo vệ để giữ lịch sử tuyến tính.\n- **Ví dụ**: Yêu cầu nhóm sử dụng Squash and Merge hoặc Rebase thay vì tạo các merge commit thông thường.\n- **Đừng nhầm**: Quy tắc này giới hạn kiểu merge; nó không tự sắp xếp lại commit hay thay đổi mã nguồn.\n\n## 📖 Định nghĩa\nBranch protection rules là các chính sách tùy chọn áp dụng cho nhánh trên GitHub. Quản trị viên chọn riêng điều kiện cần dùng, chẳng hạn yêu cầu PR, số lượt duyệt, status checks, giải quyết hội thoại hoặc lịch sử tuyến tính. Nếu không bật một điều kiện thì không thể giả định điều kiện đó đang được yêu cầu; quyền bypass cũng ảnh hưởng việc thực thi.\n\n## 💡 Tại sao cần\nNhóm có thể dùng quy tắc để biến một số bước đã thống nhất thành điều kiện kỹ thuật trước khi merge. Chọn vừa đủ để kiểm soát rủi ro; yêu cầu quá nhiều hoặc status check không ổn định có thể làm chậm cả nhóm.\n\n## 🧠 Mental Model\nHãy tưởng tượng quy trình an ninh sân bay đa tầng trước khi hành khách lên máy bay. Bạn phải xuất trình vé hợp lệ do nhân viên xác nhận (`Require approvals`), hành lý qua máy quét tự động không có vật cấm (`Status checks pass`), và giải quyết xong mọi thắc mắc ở cổng soi chiếu (`Conversations resolved`).\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    PR[Pull Request mới] --> C1{Đủ lượt Approve?}\n    C1 -- Chưa --> Block1[Khóa nút Merge]\n    C1 -- Đã duyệt --> C2{CI Status Checks Pass?}\n    C2 -- Thất bại đỏ --> Block2[Khóa nút Merge]\n    C2 -- Thành công xanh --> C3{Giải quyết hết hội thoại?}\n    C3 -- Còn phản hồi --> Block3[Khóa nút Merge]\n    C3 -- Hoàn tất --> Open[Không còn điều kiện chặn trong sơ đồ này]\n```\n\n## 🏢 Ví dụ thực tế\nVí dụ giả định: một nhóm bật yêu cầu hai lượt duyệt và chọn status check bảo mật cho `main`. PR sẽ còn điều kiện chặn khi thiếu một trong hai kết quả. Điều này chỉ xác nhận các điều kiện đã cấu hình đạt, không tự bảo đảm phần mềm không có lỗi hay tự triển khai ra production.\n\n## 💻 Command & Cú pháp\n```bash\n# Các lệnh gh cần GitHub CLI đã cài, đăng nhập và repository phù hợp\ngh pr checks\n\n# Xem tổng quan trạng thái phê duyệt của Pull Request\ngh pr status\n\n# Xem chữ ký của commit (nếu có; GitHub chấp nhận GPG, SSH hoặc S/MIME khi đã cấu hình)\ngit log --oneline --show-signature\n```\n\n## 🔍 Giải thích command\n- `gh pr checks`: Hiển thị các check GitHub ghi nhận cho PR; cần cài và đăng nhập GitHub CLI trong repo liên quan.\n- `gh pr status`: Tóm tắt PR liên quan đến tài khoản hiện tại; lệnh này không thay thế trang Settings hay cấu hình rule.\n- `git log --show-signature`: Hiển thị kết quả kiểm tra chữ ký nếu commit có chữ ký và Git có thể xác minh khóa; chữ ký không tự chứng minh nội dung code an toàn.\n\n## ⚠️ Sai lầm phổ biến\n- Đặt số lượng reviewer bắt buộc quá cao trong nhóm ít người gây tắc nghẽn tiến độ dự án.\n- Quên tích chọn tự động hủy phê duyệt cũ khi có commit mới khiến code sửa đổi không được kiểm tra lại.\n- Thiết lập status checks với những bài test không ổn định khiến Pull Request bị chặn vô lý.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình trực tiếp trên giao diện GitHub Repository Settings và đối chiếu theo hướng dẫn bên dưới.\n\n1. Dùng repository thử nghiệm mà bạn có quyền quản trị; vào **Settings → Branches** (tên nút có thể thay đổi theo giao diện).\n2. Tạo quy tắc chỉ khớp `main`; bật **Require a pull request before merging** và đặt một lượt duyệt nếu giao diện cho phép.\n3. Quan sát các tùy chọn khác, nhưng chỉ bật chúng nếu repo có quy trình đáp ứng được (ví dụ status check phải tồn tại trước khi chọn).\n4. Lưu quy tắc rồi tạo PR thử nghiệm; ghi lại điều kiện còn thiếu. Một số tùy chọn có thể phụ thuộc quyền, loại repository hoặc cấu hình CI.\n\n## 💡 Hint & mẹo\n- Cân nhắc hủy lượt duyệt cũ khi có commit mới; quyết định này phụ thuộc mức rủi ro và cách nhóm review.\n- Xem mục bypass/exemptions trong rule để biết chính xác tài khoản nào được phép bỏ qua điều kiện.\n\n## ✅ Validation & Kết quả mong đợi\n- Nêu được các điều kiện thực tế đã bật cho nhánh thử nghiệm.\n- Tạo PR minh họa được ít nhất một điều kiện chưa đạt và quan sát trạng thái mà GitHub hiển thị.\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ thấu hiểu của bạn về các quy tắc Branch Protection Rules chuyên sâu.\n\n## 🚀 Thử thách nâng cao\nHãy tìm hiểu thêm về tính năng Rulesets mới trên GitHub và so sánh ưu điểm của Rulesets so với Branch Protection Rules truyền thống khi quản lý nhiều nhánh cùng lúc.\n\n## 📝 Tổng kết\n- Mỗi branch protection rule chỉ thực thi các điều kiện đã bật và áp dụng cho pattern khớp.\n- Status checks có thể đến từ các dịch vụ tích hợp khác nhau; cấu hình nhầm check có thể chặn PR.\n- Linear history chặn merge commit; chữ ký giúp xác minh nguồn gốc commit khi cấu hình xác minh phù hợp.\n",
  "quiz": {
    "id": "quiz-06-08-branch-protection-rules",
    "title": "Trắc nghiệm: Branch Protection Rules",
    "questions": [
      {
        "id": "q1",
        "question": "Tùy chọn \"Require a pull request before merging\" kết hợp \"Require approvals\" mang lại lợi ích gì?",
        "type": "single",
        "options": [
          {
            "text": "Bắt buộc mã nguồn phải được ít nhất một số lượng đồng nghiệp chỉ định xem xét và phê duyệt trước khi được phép merge",
            "correct": true
          },
          {
            "text": "Tự động gửi tin nhắn SMS thông báo cho toàn bộ công ty",
            "correct": false
          },
          {
            "text": "Cho phép bất kỳ ai trên mạng cũng có quyền merge code",
            "correct": false
          },
          {
            "text": "Tự động xóa tài khoản của người gửi Pull Request",
            "correct": false
          }
        ],
        "explanation": "Quy tắc này bảo đảm không ai có thể tự biên tự diễn đưa code lên nhánh chính mà không có sự kiểm tra chéo từ đồng nghiệp."
      },
      {
        "id": "q2",
        "question": "Tính năng \"Dismiss stale pull request approvals when new commits are pushed\" hoạt động như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Nếu tác giả đẩy thêm commit mới sau khi đã được duyệt, các lượt phê duyệt trước đó sẽ tự động bị hủy và phải duyệt lại",
            "correct": true
          },
          {
            "text": "Tự động xóa luôn các commit mới vừa đẩy lên",
            "correct": false
          },
          {
            "text": "Chặn không cho phép tác giả sửa lỗi nữa",
            "correct": false
          },
          {
            "text": "Tự động chấp nhận ngay lập tức mà không cần kiểm tra",
            "correct": false
          }
        ],
        "explanation": "Tùy chọn này ngăn chặn việc tác giả vô tình hoặc cố ý thêm mã nguồn lỗi hoặc mã độc vào PR sau khi đồng nghiệp đã bấm duyệt."
      },
      {
        "id": "q3",
        "question": "Quy tắc \"Require status checks to pass before merging\" có vai trò gì trong đường ống CI/CD?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ cho merge khi các status check được chỉ định là bắt buộc đều báo đạt",
            "correct": true
          },
          {
            "text": "Kiểm tra xem số dư tài khoản ngân hàng của lập trình viên có đủ không",
            "correct": false
          },
          {
            "text": "Kiểm tra tốc độ gõ bàn phím của người viết mã nguồn",
            "correct": false
          },
          {
            "text": "Tự động bỏ qua toàn bộ các ca kiểm thử bị lỗi đỏ",
            "correct": false
          }
        ],
        "explanation": "Chỉ những check được chọn làm bắt buộc mới là điều kiện merge; check có thể đến từ GitHub Actions hoặc ứng dụng tích hợp khác."
      },
      {
        "id": "q4",
        "question": "Quy tắc \"Require conversation resolution before merging\" bảo đảm điều gì trong quá trình review?",
        "type": "single",
        "options": [
          {
            "text": "Các review conversation trên PR phải được đánh dấu đã giải quyết trước khi merge",
            "correct": true
          },
          {
            "text": "Bắt buộc lập trình viên phải gọi video call cho người review",
            "correct": false
          },
          {
            "text": "Tự động xóa tất cả các bình luận có từ ngữ phê bình tiêu cực",
            "correct": false
          },
          {
            "text": "Chỉ cho phép bình luận bằng hình ảnh động GIF",
            "correct": false
          }
        ],
        "explanation": "Rule chặn merge khi còn conversation chưa resolve; việc resolve không chứng minh mọi góp ý đã được sửa đúng ý."
      },
      {
        "id": "q5",
        "question": "Khi quy tắc \"Require linear history\" được bật, điều gì sẽ bị cấm trên nhánh được bảo vệ?",
        "type": "single",
        "options": [
          {
            "text": "Cấm tạo merge commit trên nhánh được bảo vệ; PR có thể cần dùng kiểu Squash hoặc Rebase",
            "correct": true
          },
          {
            "text": "Cấm tạo commit vào các ngày thứ bảy và chủ nhật",
            "correct": false
          },
          {
            "text": "Cấm viết commit message có độ dài vượt quá 10 ký tự",
            "correct": false
          },
          {
            "text": "Cấm sử dụng hình đại diện trên GitHub",
            "correct": false
          }
        ],
        "explanation": "Linear history từ chối merge commit; GitHub có thể yêu cầu dùng kiểu hợp nhất PR tương thích như Squash hoặc Rebase."
      },
      {
        "id": "q6",
        "question": "Quy tắc \"Require signed commits\" yêu cầu lập trình viên phải làm gì khi thực hiện commit mã nguồn?",
        "type": "single",
        "options": [
          {
            "text": "Tạo commit có chữ ký được GitHub chấp nhận theo khóa GPG, SSH hoặc S/MIME đã cấu hình",
            "correct": true
          },
          {
            "text": "Phải in thông điệp commit ra giấy rồi ký tay bằng bút mực",
            "correct": false
          },
          {
            "text": "Phải nộp ảnh chụp căn cước công dân vào thư mục gốc của dự án",
            "correct": false
          },
          {
            "text": "Phải nhờ người quản lý dự án ký tên trực tiếp lên màn hình máy tính",
            "correct": false
          }
        ],
        "explanation": "Chữ ký cho phép xác minh commit được ký bằng khóa liên quan; người quản lý vẫn cần kiểm tra danh tính và trạng thái xác thực của khóa."
      }
    ]
  }
};
export default lesson;
