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
  "content": "# Hotfix Workflow\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất khẩn cấp và các tiêu chí phân loại một sự cố sản xuất (Production Incident) cần kích hoạt Hotfix.\n- Nắm vững quy trình tách nhánh Hotfix trực tiếp từ commit bị lỗi trên nhánh sản phẩm (`main`).\n- Thực hiện quy trình hợp nhất kép (Dual-merge) chuẩn xác cho Hotfix vào cả `main` và `develop` để tránh tái phát lỗi.\n- Áp dụng quy tắc gắn thẻ phiên bản tăng PATCH (ví dụ v1.0.1) và cập nhật tài liệu khắc phục sự cố (Post-mortem).\n\n---\n\n## 📖 Định nghĩa\n> Hotfix Workflow (Quy trình vá lỗi khẩn cấp) là cơ chế xử lý sự cố kỹ thuật đặc biệt trong Git nhằm phản ứng nhanh với các lỗi nghiêm trọng (Critical Bugs) phát sinh đột ngột trên môi trường sản xuất (Production) mà không thể chờ đến chu kỳ phát hành theo kế hoạch tiếp theo. Điểm khác biệt cốt tử của Hotfix là nó được rẽ nhánh trực tiếp từ phiên bản đang chạy lỗi trên nhánh `main`, thực hiện bản vá tối thiểu cần thiết, kiểm thử thần tốc và hợp nhất ngay lập tức vào `main` để deploy giải cứu hệ thống, sau đó được hợp nhất ngược về `develop`.\n\n---\n\n## 🤔 Tại sao cần?\nKhi một lỗi nghiêm trọng xảy ra trên production (ví dụ khách hàng không thể bấm nút thanh toán, hoặc rò rỉ dữ liệu người dùng), mỗi phút trôi qua đều gây thiệt hại hàng triệu đồng và đánh mất uy tín doanh nghiệp. Bạn không thể lấy nhánh `develop` để sửa lỗi vì trên đó đang chứa hàng chục tính năng dang dở chưa kiểm thử. Nhánh Hotfix cho phép bạn phẫu thuật nội soi trực tiếp trên đúng commit đang chạy thực tế, chữa lành sự cố trong thời gian ngắn nhất mà không kéo theo bất kỳ đoạn code rủi ro nào khác.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một con tàu ngầm đang làm nhiệm vụ dưới đáy đại dương (`main`). Đột nhiên một đường ống nước biển bị nứt và nước bắt đầu rò rỉ vào khoang máy. Thuyền trưởng không thể kéo con tàu về lại xưởng đóng tàu trên đất liền (`develop`) để chờ đợt đại tu vào tháng sau. Một đội thợ lặn cấp cứu mang theo bộ hàn đặc biệt (`hotfix branch`) tiến thẳng vào khoang máy, hàn kín vết nứt ngay tại chỗ để tàu tiếp tục hoạt động an toàn. Sau đó, họ gửi bản vẽ mối hàn về xưởng đóng tàu để các con tàu đang đóng không mắc lại lỗi tương tự.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình phản ứng nhanh của Hotfix Workflow:\nmain:     v1.0.0 ────────────────────────────────────── v1.0.1 (Deploy Hotfix!)\n             │                                            ▲\n             └─► hotfix/fix-payment-leak ─► [Fix & Test] ─┤ (Dual-merge)\n                                                          ▼\ndevelop:  ──────●────────●────────●───────────────────────● (Nhận bản vá lỗi)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nVào lúc 2 giờ sáng, hệ thống cảnh báo tự động gửi tin nhắn khẩn: khách hàng tại Nhật Bản không thể hoàn tất thanh toán do lỗi múi giờ. Kỹ sư trực ca lập tức chuyển sang nhánh `main` mới nhất và tạo nhánh: `git switch -c hotfix/fix-japan-timezone main`. Kỹ sư sửa đúng 3 dòng mã bị lỗi chuyển đổi giờ UTC trong tệp `payment.js`, kiểm thử vượt qua bài test thanh toán. Kỹ sư đẩy code lên và mở PR khẩn cấp. Trưởng nhóm duyệt ngay, gộp code vào `main`, gắn thẻ tag `v1.0.1` và hệ thống CI tự động deploy bản vá chỉ sau 15 phút từ khi phát hiện. Cuối cùng, kỹ sư chuyển sang `develop` và gộp bản vá vào để bảo đảm phiên bản v1.1.0 sau này không bị lỗi lại.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c hotfix/<ten-loi> main\ngit commit -m \"fix(security): patch sql injection vulnerability\"\ngit switch main && git merge --no-ff hotfix/<ten-loi>\ngit tag -a v1.0.1 -m \"Hotfix v1.0.1: security patch\"\ngit switch develop && git merge --no-ff hotfix/<ten-loi>\ngit branch -d hotfix/<ten-loi>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c hotfix/<tên-lỗi> main`: Bắt buộc rẽ nhánh trực tiếp từ nhánh sản xuất main.\n- `git tag -a v1.0.1`: Tăng chỉ số PATCH đánh dấu bản vá lỗi khẩn cấp.\n- Hợp nhất kép vào `main` và `develop`: Bảo đảm bản vá được triển khai ngay và không bị mất ở bản phát hành sau.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Rẽ nhánh hotfix từ develop thay vì main**:  Đưa nhầm toàn bộ các tính năng dở dang chưa kiểm thử lên production.\n2. **Tiện tay thêm các tính năng không liên quan vào nhánh hotfix**:  Vi phạm nguyên tắc bản vá tối thiểu, tăng rủi ro lỗi mới.\n3. **Quên merge ngược hotfix về develop**:  Nguyên nhân phổ biến khiến lỗi cũ vừa sửa xong lại tái phát ở sprint sau.\n\n---\n\n## 🧪 Lab\n1. Mô phỏng sự cố khẩn cấp bằng cách tạo nhánh `hotfix/v1.0.1` xuất phát trực tiếp từ `main`.\n2. Thực hiện commit sửa lỗi, hợp nhất kép vào cả `main` và `develop`, sau đó gắn thẻ tag `v1.0.1`.\n\n---\n\n## 💡 Hint\n> Bản vá Hotfix phải là bản vá nhỏ nhất, an toàn nhất có thể để giải quyết triệt để sự cố mà không tạo tác dụng phụ.\n\n---\n\n## ✅ Validation\n- Phiên bản production được khôi phục trạng thái hoạt động bình thường trong thời gian tối thiểu.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về quy trình xử lý lỗi khẩn cấp Hotfix Workflow.\n\n---\n\n## 🔥 Challenge\nTrình bày cách xử lý nếu nhánh hotfix khi merge ngược vào develop gặp xung đột mã nguồn lớn do code develop đã bị cấu trúc lại.\n\n---\n\n## 📚 Tổng kết\n- Hotfix Workflow là quy trình phản ứng nhanh xử lý sự cố nghiêm trọng trên môi trường sản xuất.\n- Luôn luôn rẽ nhánh trực tiếp từ commit đang chạy thực tế trên nhánh main.\n- Bắt buộc thực hiện hợp nhất kép vào cả main và develop để ngăn ngừa lỗi tái xuất hiện.\n",
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
      }
    ]
  }
};
export default lesson;
