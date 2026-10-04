import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-hotfix-workflow",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "13-hotfix-workflow",
    "title": "Hotfix Workflow",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "12-release-branch"
    ],
    "objectives": [
      "Hiểu rõ bản chất khẩn cấp và các tiêu chí phân loại một sự cố sản xuất (Production Incident) cần kích hoạt Hotfix.",
      "Nắm vững quy trình tách nhánh Hotfix trực tiếp từ commit bị lỗi trên nhánh sản phẩm (`main`).",
      "Thực hiện quy trình hợp nhất kép (Dual-merge) chuẩn xác cho Hotfix vào cả `main` và `develop` để tránh tái phát lỗi.",
      "Áp dụng quy tắc gắn thẻ phiên bản tăng PATCH (ví dụ v1.0.1) và cập nhật tài liệu khắc phục sự cố (Post-mortem)."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "hotfix workflow",
      "va loi khan cap",
      "production bug",
      "emergency fix",
      "hotfix dual merge",
      "hotfix branch"
    ],
    "commands": [
      "git switch -c hotfix/<ten-loi> main",
      "git commit -m \"fix(security): patch sql injection vulnerability\"",
      "git switch main && git merge --no-ff hotfix/<ten-loi>",
      "git tag -a v1.0.1 -m \"Hotfix v1.0.1: security patch\"",
      "git switch develop && git merge --no-ff hotfix/<ten-loi>",
      "git branch -d hotfix/<ten-loi>"
    ]
  },
  "content": "# Hotfix Workflow\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất khẩn cấp và các tiêu chí phân loại một sự cố sản xuất (Production Incident) cần kích hoạt Hotfix.\n- Biết tách nhánh hotfix từ commit/nhánh đang đại diện cho phiên bản production bị lỗi.\n- Thực hiện quy trình của Git Flow để đưa bản vá vào nhánh phát hành và đồng bộ về `develop` nếu nhóm duy trì nhánh đó.\n- Chọn tag phiên bản theo chính sách release; bản sửa chỉ là PATCH khi tương thích ngược và dự án dùng SemVer.\n\n## 🧩 Từ khóa hôm nay\n### Hotfix Branch\n- **Nói dễ hiểu**: Nhánh tạm để sửa lỗi cần phát hành khẩn cấp, bắt đầu từ mã nguồn đang đại diện cho phiên bản production bị lỗi.\n- **Ví dụ**: Tạo nhánh `hotfix/v1.0.1` để sửa gấp lỗi không thanh toán được bằng thẻ tín dụng.\n- **Đừng nhầm**: Trong Git Flow thường tách từ `main`; nếu production đang chạy tag/nhánh khác, hãy xác định chính xác commit đang triển khai.\n\n### Production Incident\n- **Nói dễ hiểu**: Sự cố lỗi phần mềm phát sinh trực tiếp trên môi trường người dùng thật gây gián đoạn dịch vụ.\n- **Ví dụ**: Người dùng nhận thông báo lỗi 500 khi bấm nút đăng nhập vào giờ cao điểm.\n- **Đừng nhầm**: Nhóm xác định mức độ khẩn cấp theo tác động và khả năng giảm thiểu; không phải mọi lỗi production đều cần hotfix.\n\n### Dual-merge\n- **Nói dễ hiểu**: Trong Git Flow, tích hợp bản sửa vào `main` để phát hành rồi đồng bộ vào `develop` nếu nhánh này còn được dùng.\n- **Ví dụ**: Khi sửa xong mã thanh toán, merge vào `main` để deploy liền và merge về `develop` để sprint tới vẫn có code sửa này.\n- **Đừng nhầm**: Nếu `develop` tồn tại, hãy bảo đảm bản sửa được đưa vào đó; merge không phải cách duy nhất, có thể dùng cherry-pick theo chính sách nhóm.\n\n## 📖 Định nghĩa\nTrong Git Flow, Hotfix Branch là nhánh sửa một vấn đề khẩn cấp trên bản phát hành production, thường được tách từ `main`. Nếu production đang chạy commit được đánh dấu bằng tag hoặc nhánh khác, nhóm cần bắt đầu từ commit đó. Sau khi kiểm tra và phát hành bản sửa, nhóm đưa thay đổi về `develop` hoặc nhánh phát triển tương ứng. Đây là quy trình nhóm lựa chọn, không phải tính năng tự động của Git.\n\n## 🤔 Tại sao cần?\nKhi lỗi đang ảnh hưởng người dùng, nhóm có thể cần một đường phát hành riêng để sửa đúng phiên bản đang chạy mà không đưa theo thay đổi chưa phát hành. Hotfix cần review và kiểm thử tương xứng với mức rủi ro; gắn nhãn khẩn cấp không làm bản sửa an toàn hơn.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung con tàu ngầm đang tuần tra dưới đáy biển (`main`). Đột nhiên một đường ống áp lực bị rò rỉ. Thuyền trưởng không thể kéo tàu về xưởng sửa chữa trên đất liền (`develop`) để chờ lịch bảo trì tháng sau. Một đội thợ lặn cấp cứu (`hotfix branch`) mang dụng cụ vá ngay vết nứt tại chỗ để tàu tiếp tục hoạt động, rồi gửi biên bản về xưởng đóng tàu để các tàu sau không mắc lỗi.\n\n## 🖼 Sơ đồ\n```mermaid\ngitGraph\n    commit id: \"v1.0.0\"\n    branch develop\n    checkout develop\n    commit id: \"Feat 1\"\n    commit id: \"Feat 2\"\n    checkout main\n    branch hotfix/v1.0.1\n    checkout hotfix/v1.0.1\n    commit id: \"Patch payment bug\"\n    checkout main\n    merge hotfix/v1.0.1 tag: \"v1.0.1\" id: \"Deploy hotfix\"\n    checkout develop\n    merge hotfix/v1.0.1 id: \"Sync patch to develop\"\n```\n\n## 🌎 Ví dụ thực tế\nTrong quy trình Git Flow thực tế tại doanh nghiệp: nhóm xác nhận production đang chạy commit của `main`, tạo `hotfix/v1.0.1` từ đó, sửa lỗi, chạy kiểm tra và mở PR khẩn cấp. Sau khi merge vào `main`, nhóm gắn tag nếu chính sách SemVer phù hợp và phát hành theo pipeline/quy trình đã cấu hình; bản sửa sau đó được tích hợp vào `develop`.\n\n## 💻 Command\n```bash\n# Trong Git Flow, giả sử main trỏ tới phiên bản production cần sửa\ngit switch -c hotfix/v1.0.1 main\n\n# Sau khi sửa file, stage và commit bản vá\ngit add src/payment.ts\ngit commit -m \"fix(security): patch payment validation bypass\"\n\n# Hợp nhất vào main để phát hành khẩn cấp và gắn thẻ tag\ngit switch main && git merge --no-ff hotfix/v1.0.1\ngit tag -a v1.0.1 -m \"Hotfix v1.0.1: patch payment validation\"\n\n# Hợp nhất về develop nếu dự án duy trì nhánh này\ngit switch develop && git merge --no-ff hotfix/v1.0.1\ngit branch -d hotfix/v1.0.1\n```\n\n## 🔍 Giải thích command\n- `git switch -c hotfix/v1.0.1 main`: Trong ví dụ Git Flow này, tạo nhánh từ commit `main`; xác nhận nhánh này khớp với mã đang chạy trước khi sửa.\n- `git commit -m`: Ghi nhận thay đổi vá lỗi với mô tả súc tích và chính xác theo chuẩn `fix`.\n- `git tag -a v1.0.1`: Gắn tag theo chính sách phiên bản sau khi xác định commit phát hành; hotfix không tự động đồng nghĩa PATCH.\n- `git merge --no-ff`: Tạo merge commit nếu nhóm muốn giữ dấu nhánh; tích hợp về `develop` khi dự án có nhánh này.\n\n## ⚠️ Sai lầm phổ biến\n- Tách nhánh hotfix từ `develop` thay vì `main`, kéo theo toàn bộ các tính năng chưa kiểm thử lên môi trường thực tế.\n- Tiện tay thêm các tính năng không liên quan vào nhánh hotfix làm tăng nguy cơ phát sinh lỗi phụ.\n- Quên tích hợp bản sửa về nhánh phát triển còn được duy trì; chọn merge/cherry-pick theo lịch sử và chính sách nhóm.\n\n## 🧪 Lab\nCùng tôi thực hiện chu trình xử lý sự cố khẩn cấp (Hotfix Workflow) trực tiếp trên nhánh Production:\n\nĐiều kiện đầu vào: repo thử nghiệm có commit trên `main` và `develop`; trong bài này giả định `main` là mã nguồn production.\n1. Tạo nhánh: `git switch -c hotfix/v1.0.1 main`.\n2. Sửa một file thử nghiệm, stage và commit: `git add config.yml`; `git commit -m \"fix(config): update db timeout\"`.\n3. Tích hợp vào `main`: `git switch main`; `git merge --no-ff hotfix/v1.0.1`.\n4. Gắn tag vào commit phát hành đã kiểm tra: `git tag -a v1.0.1 -m \"Hotfix v1.0.1\"`.\n5. Nếu repo duy trì `develop`, tích hợp thay đổi về đó rồi kiểm tra lịch sử bằng `git log --oneline --graph --all`.\n\n## 💡 Hint\n- Giữ phạm vi bản vá hẹp, nhưng vẫn kiểm tra nguyên nhân và tác động liên quan trước khi phát hành.\n- Sau sự cố, ghi nhận nguyên nhân, cách phát hiện và hành động phòng ngừa theo quy trình của nhóm.\n\n## ✅ Validation\n- Nhánh `main` sở hữu bản vá và thẻ tag phiên bản mới phản ánh đúng trạng thái deploy lên máy chủ.\n- Nhánh `develop` được đồng bộ bản sửa lỗi mà không làm mất các commit tính năng đang phát triển.\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững quy trình xử lý lỗi khẩn cấp với Hotfix Workflow.\n\n## 🔥 Challenge\nThiết kế kịch bản xử lý khi nhánh hotfix khi merge ngược vào `develop` phát sinh xung đột do nhánh `develop` đã tái cấu trúc hoàn toàn file mã nguồn đó.\n\n## 📚 Tổng kết\n- Hotfix Workflow là quy trình cứu hộ khẩn cấp cho các sự cố nghiêm trọng trên môi trường sản xuất.\n- Luôn tách nhánh trực tiếp từ phiên bản đang chạy lỗi trên nhánh `main`.\n- Bắt buộc thực hiện hợp nhất kép vào cả `main` và `develop` để tránh tái phát lỗi trong tương lai.\n",
  "quiz": {
    "id": "quiz-06-13-hotfix-workflow",
    "title": "Trắc nghiệm: Hotfix Workflow",
    "questions": [
      {
        "id": "q1",
        "question": "Trong Git Flow, nhánh hotfix thường bắt đầu từ đâu; điều gì cần kiểm tra nếu production chạy tag riêng?",
        "type": "single",
        "options": [
          {
            "text": "Từ commit production bị lỗi, thường là `main` trong Git Flow",
            "correct": true
          },
          {
            "text": "Từ nhánh develop nơi chứa các tính năng mới nhất của sprint hiện tại",
            "correct": false
          },
          {
            "text": "Từ một nhánh tính năng cá nhân của lập trình viên",
            "correct": false
          },
          {
            "text": "Từ nhánh master của một kho lưu trữ mã nguồn mở khác",
            "correct": false
          }
        ],
        "explanation": "Mục tiêu là sửa đúng commit đang chạy; Git Flow thường dùng `main`, nhưng deployment thực tế có thể trỏ tới tag/commit khác."
      },
      {
        "id": "q2",
        "question": "Nguyên tắc vàng về phạm vi chỉnh sửa mã nguồn bên trong một nhánh Hotfix là gì?",
        "type": "single",
        "options": [
          {
            "text": "Giữ phạm vi bản vá hẹp, kiểm tra nguyên nhân và chạy test phù hợp trước khi phát hành",
            "correct": true
          },
          {
            "text": "Nhân tiện viết lại toàn bộ kiến trúc dự án sang ngôn ngữ lập trình khác",
            "correct": false
          },
          {
            "text": "Thêm thật nhiều tính năng mới để khách hàng cảm thấy vui vẻ hơn",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các tệp tin cấu hình bảo mật",
            "correct": false
          }
        ],
        "explanation": "Thay đổi hẹp thường dễ review hơn, nhưng vẫn cần kiểm tra nguyên nhân và tác động liên quan trước khi triển khai."
      },
      {
        "id": "q3",
        "question": "Điều gì sẽ xảy ra nếu một đội ngũ kỹ thuật quên không hợp nhất ngược nhánh Hotfix về nhánh develop?",
        "type": "single",
        "options": [
          {
            "text": "Lỗi sản xuất vừa sửa thành công sẽ bị tái phát trở lại ở đợt phát hành sản phẩm tiếp theo",
            "correct": true
          },
          {
            "text": "Máy chủ GitHub sẽ tự động khóa vĩnh viễn kho lưu trữ",
            "correct": false
          },
          {
            "text": "Không có vấn đề gì xảy ra cả",
            "correct": false
          },
          {
            "text": "Tất cả các commit trên nhánh develop sẽ bị xóa sạch",
            "correct": false
          }
        ],
        "explanation": "Nếu `develop` tiếp tục là nhánh phát triển, nhóm cần đưa bản sửa vào đó; cách tích hợp và thời điểm release tùy workflow."
      },
      {
        "id": "q4",
        "question": "Theo chuẩn Semantic Versioning, bản phát hành sau khi áp dụng Hotfix thành công sẽ tăng chỉ số nào?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ số PATCH (ví dụ từ v2.3.1 lên v2.3.2)",
            "correct": true
          },
          {
            "text": "Chỉ số MAJOR (ví dụ từ v2.3.1 lên v3.0.0)",
            "correct": false
          },
          {
            "text": "Chỉ số MINOR (ví dụ từ v2.3.1 lên v2.4.0)",
            "correct": false
          },
          {
            "text": "Không được phép thay đổi số phiên bản",
            "correct": false
          }
        ],
        "explanation": "Khi dùng SemVer và bản sửa tương thích ngược, PATCH là mức phù hợp; hotfix không tự quyết định mức phiên bản."
      },
      {
        "id": "q5",
        "question": "Nếu kho lưu trữ đang có một nhánh release đang hoạt động song song khi phát sinh hotfix, nhánh hotfix cần được hợp nhất vào những đâu?",
        "type": "single",
        "options": [
          {
            "text": "Đưa bản sửa vào nhánh release/nhánh phát triển còn dùng theo quy trình nhóm, tránh bỏ sót phiên bản đang chuẩn bị",
            "correct": true
          },
          {
            "text": "Chỉ hợp nhất vào main rồi xóa ngay lập tức",
            "correct": false
          },
          {
            "text": "Hủy bỏ toàn bộ nhánh release hiện tại và bắt đầu lại từ đầu",
            "correct": false
          },
          {
            "text": "Chỉ hợp nhất vào máy trạm cá nhân của người phát hiện lỗi",
            "correct": false
          }
        ],
        "explanation": "Hãy xác định các nhánh/commit phát hành còn hoạt động và tích hợp bản sửa phù hợp; không phải dự án nào cũng duy trì cả hai nhánh."
      }
    ]
  }
};
export default lesson;
