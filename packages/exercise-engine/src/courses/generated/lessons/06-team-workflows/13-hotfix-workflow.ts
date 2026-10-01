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
  "content": "# Hotfix Workflow\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất khẩn cấp và các tiêu chí phân loại một sự cố sản xuất (Production Incident) cần kích hoạt Hotfix.\n- Nắm vững quy trình tách nhánh Hotfix trực tiếp từ commit bị lỗi trên nhánh sản phẩm (`main`).\n- Thực hiện quy trình hợp nhất kép (Dual-merge) chuẩn xác cho Hotfix vào cả `main` và `develop` để tránh tái phát lỗi.\n- Áp dụng quy tắc gắn thẻ phiên bản tăng PATCH (ví dụ v1.0.1) và cập nhật tài liệu khắc phục sự cố.\n\n## 🧩 Từ khóa hôm nay\n### Hotfix Branch\n- **Nói dễ hiểu**: Nhánh cứu hộ khẩn cấp được tách trực tiếp từ nhánh sản xuất `main` để sửa lỗi nghiêm trọng đang xảy ra.\n- **Ví dụ**: Tạo nhánh `hotfix/v1.0.1` để sửa gấp lỗi không thanh toán được bằng thẻ tín dụng.\n- **Đừng nhầm**: Không tách từ `develop` vì `develop` đang chứa nhiều code mới chưa qua kiểm duyệt đầy đủ.\n\n### Production Incident\n- **Nói dễ hiểu**: Sự cố lỗi phần mềm phát sinh trực tiếp trên môi trường người dùng thật gây gián đoạn dịch vụ.\n- **Ví dụ**: Người dùng nhận thông báo lỗi 500 khi bấm nút đăng nhập vào giờ cao điểm.\n- **Đừng nhầm**: Không phải lỗi nhỏ về giao diện có thể chờ đợt phát hành định kỳ vào cuối tuần.\n\n### Dual-merge\n- **Nói dễ hiểu**: Việc đưa bản sửa lỗi hotfix vào cả nhánh `main` để sửa lỗi ngay và nhánh `develop` để không tái phát lỗi sau này.\n- **Ví dụ**: Khi sửa xong mã thanh toán, merge vào `main` để deploy liền và merge về `develop` để sprint tới vẫn có code sửa này.\n- **Đừng nhầm**: Nếu quên merge về `develop`, khi đợt phát hành tiếp theo diễn ra thì lỗi cũ sẽ bị đè lại lên máy chủ.\n\n## 📖 Định nghĩa\nHotfix Workflow là cơ chế phản ứng nhanh nhằm sửa chữa các lỗi khẩn cấp phát sinh đột ngột trên môi trường sản xuất. Nhánh Hotfix được tách trực tiếp từ commit đang chạy thực tế trên `main`, chỉ chứa các thay đổi tối thiểu cần thiết để dập lỗi, và ngay sau đó được hợp nhất kép vào cả `main` lẫn `develop`.\n\n## 💡 Tại sao cần\nKhi hệ thống gặp lỗi nghiêm trọng như rò rỉ dữ liệu hoặc hỏng cổng thanh toán, mỗi phút trôi qua đều gây thiệt hại tài chính nặng nề. Bạn không thể chờ đợt phát hành tiếp theo trên `develop` vì nhánh đó đang chứa nhiều tính năng dang dở. Nhánh Hotfix cho phép vá lỗi trực tiếp trên phiên bản đang chạy trong thời gian ngắn nhất.\n\n## 🧠 Mental Model\nHãy hình dung con tàu ngầm đang tuần tra dưới đáy biển (`main`). Đột nhiên một đường ống áp lực bị rò rỉ. Thuyền trưởng không thể kéo tàu về xưởng sửa chữa trên đất liền (`develop`) để chờ lịch bảo trì tháng sau. Một đội thợ lặn cấp cứu (`hotfix branch`) mang dụng cụ vá ngay vết nứt tại chỗ để tàu tiếp tục hoạt động, rồi gửi biên bản về xưởng đóng tàu để các tàu sau không mắc lỗi.\n\n## 📊 Sơ đồ minh họa\n```mermaid\ngitGraph\n    commit id: \"v1.0.0\"\n    branch develop\n    checkout develop\n    commit id: \"Feat 1\"\n    commit id: \"Feat 2\"\n    checkout main\n    branch hotfix/v1.0.1\n    checkout hotfix/v1.0.1\n    commit id: \"Patch payment bug\"\n    checkout main\n    merge hotfix/v1.0.1 tag: \"v1.0.1\" id: \"Deploy hotfix\"\n    checkout develop\n    merge hotfix/v1.0.1 id: \"Sync patch to develop\"\n```\n\n## 🏢 Ví dụ thực tế\nVào lúc 2 giờ sáng, hệ thống thanh toán báo lỗi do sai lệch múi giờ với khách hàng Nhật Bản. Kỹ sư trực ca lập tức chuyển sang `main` và tạo nhánh `hotfix/v1.0.1`. Kỹ sư sửa 3 dòng lệnh chuyển đổi giờ UTC trong tệp `payment.ts` và chạy test thành công. Sau khi PR được duyệt khẩn cấp, code được gộp vào `main`, gắn thẻ tag `v1.0.1` để tự động deploy sau 15 phút, rồi gộp tiếp vào `develop` để giữ lại bản sửa lỗi.\n\n## 💻 Command & Cú pháp\n```bash\n# Tách nhánh hotfix trực tiếp từ nhánh sản xuất main\ngit switch -c hotfix/v1.0.1 main\n\n# Commit sửa lỗi tối thiểu cần thiết\ngit commit -m \"fix(security): patch payment validation bypass\"\n\n# Hợp nhất vào main để phát hành khẩn cấp và gắn thẻ tag\ngit switch main && git merge --no-ff hotfix/v1.0.1\ngit tag -a v1.0.1 -m \"Hotfix v1.0.1: patch payment validation\"\n\n# Hợp nhất ngược về develop để đồng bộ mã nguồn\ngit switch develop && git merge --no-ff hotfix/v1.0.1\ngit branch -d hotfix/v1.0.1\n```\n\n## 🔍 Giải thích command\n- `git switch -c hotfix/v1.0.1 main`: Tạo và chuyển sang nhánh hotfix bắt nguồn từ commit mới nhất của nhánh chính `main`.\n- `git commit -m`: Ghi nhận thay đổi vá lỗi với mô tả súc tích và chính xác theo chuẩn `fix`.\n- `git tag -a v1.0.1`: Tăng chỉ số PATCH để đánh dấu phiên bản vá lỗi khẩn cấp tương thích ngược.\n- `git merge --no-ff`: Hợp nhất kép vào cả `main` và `develop` để ngăn ngừa tình trạng lỗi tái xuất hiện trong tương lai.\n\n## ⚠️ Sai lầm phổ biến\n- Tách nhánh hotfix từ `develop` thay vì `main`, kéo theo toàn bộ các tính năng chưa kiểm thử lên môi trường thực tế.\n- Tiện tay thêm các tính năng không liên quan vào nhánh hotfix làm tăng nguy cơ phát sinh lỗi phụ.\n- Quên hợp nhất ngược hotfix về `develop`, khiến phiên bản sau lại đem lỗi cũ đè lên môi trường sản xuất.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác mô phỏng quy trình Hotfix trên máy và đối chiếu theo hướng dẫn bên dưới.\n\n1. Khởi tạo một kho Git với nhánh `main` và nhánh `develop`.\n2. Tạo nhánh hotfix khẩn cấp từ `main`: `git switch -c hotfix/v1.0.1 main`.\n3. Sửa một dòng lỗi trong tệp cấu hình và commit theo chuẩn `fix(config): update db timeout`.\n4. Chuyển sang `main`, merge nhánh hotfix và gắn tag `v1.0.1`.\n5. Chuyển sang `develop`, merge nhánh hotfix về và xóa nhánh `hotfix/v1.0.1`.\n\n## 💡 Hint & mẹo\n- Bản vá Hotfix phải là bản sửa đổi nhỏ nhất và an toàn nhất có thể để triệt tiêu sự cố mà không tạo tác dụng phụ.\n- Luôn viết tài liệu tóm tắt sự cố (Post-mortem) sau khi dập xong lỗi để cải tiến quy trình kiểm thử.\n\n## ✅ Validation & Kết quả mong đợi\n- Nhánh `main` sở hữu bản vá và thẻ tag phiên bản mới phản ánh đúng trạng thái deploy lên máy chủ.\n- Nhánh `develop` được đồng bộ bản sửa lỗi mà không làm mất các commit tính năng đang phát triển.\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững quy trình xử lý lỗi khẩn cấp với Hotfix Workflow.\n\n## 🚀 Thử thách nâng cao\nThiết kế kịch bản xử lý khi nhánh hotfix khi merge ngược vào `develop` phát sinh xung đột do nhánh `develop` đã tái cấu trúc hoàn toàn file mã nguồn đó.\n\n## 📝 Tổng kết\n- Hotfix Workflow là quy trình cứu hộ khẩn cấp cho các sự cố nghiêm trọng trên môi trường sản xuất.\n- Luôn tách nhánh trực tiếp từ phiên bản đang chạy lỗi trên nhánh `main`.\n- Bắt buộc thực hiện hợp nhất kép vào cả `main` và `develop` để tránh tái phát lỗi trong tương lai.\n",
  "quiz": {
    "id": "quiz-06-13-hotfix-workflow",
    "title": "Trắc nghiệm: Hotfix Workflow",
    "questions": [
      {
        "id": "q1",
        "question": "Nhánh Hotfix bắt buộc phải được rẽ nhánh xuất phát trực tiếp từ đâu để giải quyết sự cố sản xuất?",
        "type": "single",
        "options": [
          {
            "text": "Trực tiếp từ nhánh main nơi phiên bản lỗi đang chạy thực tế trên production",
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
        "explanation": "Tách từ `main` giúp bản vá độc lập hoàn toàn với các tính năng dở dang chưa qua kiểm duyệt đang nằm trên `develop`."
      },
      {
        "id": "q2",
        "question": "Nguyên tắc vàng về phạm vi chỉnh sửa mã nguồn bên trong một nhánh Hotfix là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ thực hiện thay đổi tối thiểu cần thiết để sửa dứt điểm lỗi nghiêm trọng, tuyệt đối không thêm tính năng mới",
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
        "explanation": "Bản vá càng nhỏ gọn thì rủi ro phát sinh lỗi phụ càng thấp, giúp việc kiểm thử và triển khai diễn ra nhanh nhất có thể."
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
        "explanation": "Nếu không merge về `develop`, nhánh `develop` vẫn giữ đoạn mã lỗi cũ và khi release phiên bản mới sẽ đè lại lỗi đó lên production."
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
        "explanation": "Hotfix là bản sửa lỗi bảo đảm tính tương thích tuyệt đối nên chỉ số PATCH sẽ được tăng thêm một đơn vị."
      },
      {
        "id": "q5",
        "question": "Nếu kho lưu trữ đang có một nhánh release đang hoạt động song song khi phát sinh hotfix, nhánh hotfix cần được hợp nhất vào những đâu?",
        "type": "single",
        "options": [
          {
            "text": "Hợp nhất vào main để vá sản xuất, đồng thời hợp nhất vào nhánh release và develop để tránh tái phát lỗi",
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
        "explanation": "Khi có nhánh release đang chạy, bản sửa lỗi hotfix phải được tích hợp vào cả release branch và develop để đợt phát hành kế tiếp không bị ghi đè lỗi cũ."
      }
    ]
  }
};
export default lesson;
