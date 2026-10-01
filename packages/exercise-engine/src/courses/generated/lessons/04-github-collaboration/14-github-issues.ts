import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-github-issues",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "14-github-issues",
    "title": "Quản lý công việc và lỗi với GitHub Issues",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-local-vs-remote"
    ],
    "objectives": [
      "Hiểu rõ vai trò của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).",
      "Biết cách viết một báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện chi tiết.",
      "Sử dụng các nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để quản trị công việc.",
      "Nắm vững các từ khóa liên kết tự động đóng Issue khi merge PR: `Fixes #12`, `Closes #45`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "github issues",
      "issue tracking",
      "quan ly loi",
      "bug report",
      "feature request",
      "closing keywords"
    ],
    "commands": [
      "gh issue list",
      "gh issue create",
      "gh issue view <issue-number>"
    ]
  },
  "content": "# Quản lý công việc và lỗi với GitHub Issues\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ vai trò của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).\n- Biết cách viết một báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện chi tiết.\n- Sử dụng các nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để quản trị công việc.\n- Nắm vững các từ khóa liên kết tự động đóng Issue khi merge PR: `Fixes #12`, `Closes #45`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### issue\n- **Nói dễ hiểu**: Một tấm thẻ theo dõi một lỗi cần sửa, một tính năng cần làm hoặc một câu hỏi kỹ thuật trong dự án.\n- **Ví dụ**: Tạo Issue `#15: Lỗi không nhấn được nút thanh toán trên mobile`.\n- **Đừng nhầm**: Không chỉ để báo lỗi hỏng; issue còn dùng để lập kế hoạch công việc và thảo luận tính năng mới.\n\n### labels & assignees\n- **Nói dễ hiểu**: Nhãn phân loại màu sắc và người chịu trách nhiệm chính được giao giải quyết issue.\n- **Ví dụ**: Gắn nhãn `bug`, `high-priority` và chỉ định bạn Nam vào mục `Assignees`.\n- **Đừng nhầm**: Nhãn không tự động sửa lỗi; đây là công cụ hỗ trợ lọc, tìm kiếm và phân công công việc khoa học.\n\n### closing keywords\n- **Nói dễ hiểu**: Các từ khóa đặc biệt viết trong commit hoặc PR giúp GitHub tự động chuyển Issue sang trạng thái Closed khi merge.\n- **Ví dụ**: Ghi `Fixes #15` trong mô tả PR để tự động đóng Issue #15 khi được merge vào main.\n- **Đừng nhầm**: Chỉ đóng tự động khi PR được merge vào nhánh mặc định; nếu PR bị đóng (close) mà không merge thì Issue vẫn mở.\n\n---\n\n## 📖 Định nghĩa\nGitHub Issues là hệ thống theo dõi lỗi và quản lý công việc tích hợp sẵn bên trong mỗi kho lưu trữ GitHub, nơi người dùng và lập trình viên có thể báo cáo sự cố (Bug Reports), đề xuất tính năng mới (Feature Requests), thảo luận kỹ thuật và phân công nhiệm vụ cụ thể cho từng thành viên.\n\n---\n\n## 💡 Tại sao cần\nMột dự án phần mềm không thể thành công nếu chỉ có mã nguồn mà thiếu quản trị công việc bài bản. Nếu không có hệ thống theo dõi lỗi, yêu cầu của khách hàng sẽ bị trôi mất trong tin nhắn chat, lỗi nghiêm trọng bị bỏ quên và nhóm sẽ rơi vào tình trạng hỗn loạn không rõ ai đang làm phần việc nào.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung GitHub Issues như một chiếc bảng Kanban thông minh đặt giữa phòng làm việc của đội ngũ. Mỗi tấm thẻ ghi chú (Issue) có màu sắc riêng (Labels), ghi rõ ai phụ trách (Assignees), làm trước ngày nào (Milestones) và mô tả chi tiết lỗi cần sửa để cả nhóm cùng theo dõi minh bạch.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình liên kết tự động Issue và Pull Request:\n[Issue #42: Bug giỏ hàng] ◄────────────────────────────────┐\n                                                           │ (Khi PR được merge)\n[Pull Request: \"Fixes #42 - Fix cart calculation\"] ────────┴──► [Tự động ĐÓNG Issue #42!]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKhách hàng báo lỗi không thể thanh toán bằng thẻ tín dụng. Kỹ sư Linh tạo Issue trên GitHub: \"[Bug] Payment gateway timeout on checkout\", đính kèm log chi tiết và gắn nhãn `bug`, `critical`. Kỹ sư Huy nhận xử lý issue này. Khi hoàn thành, Huy mở PR ghi rõ: \"Fixes #104\". Khi PR được duyệt và merge vào main, GitHub tự động đóng Issue #104 ngay lập tức.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngh issue list\ngh issue create\ngh issue view <issue-number>\n```\n\n---\n\n## 🔍 Giải thích command\n- `gh issue list`: Liệt kê danh sách các issue đang mở của dự án trực tiếp trong terminal bằng GitHub CLI.\n- `gh issue create`: Tạo một issue mới nhanh chóng ngay từ dòng lệnh mà không cần mở trình duyệt web.\n- `gh issue view <number>`: Xem chi tiết nội dung và các bình luận trao đổi của một issue chỉ định.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Báo cáo lỗi quá mơ hồ không có bước tái hiện**: Viết mỗi câu \"Web bị lỗi\" khiến đồng nghiệp không thể tái hiện và sửa chữa.\n2. **Quên dùng từ khóa đóng issue trong PR**: Khiến PR đã merge xong nhưng Issue vẫn bị treo ở trạng thái mở làm sai lệch báo cáo tiến độ.\n3. **Dùng Issues để tán gẫu việc riêng ngoài lề**: Làm loãng không gian thảo luận kỹ thuật và gây khó khăn cho việc tra cứu tài liệu sau này.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tạo một Issue thử nghiệm và liên kết từ khóa đóng tự động.\n1. Truy cập tab `Issues` trên kho lưu trữ GitHub và bấm nút `New issue`.\n2. Điền tiêu đề rõ ràng và nội dung mô tả lỗi theo mẫu các bước tái hiện.\n3. Gán nhãn `bug` và chỉ định bản thân vào mục `Assignees`.\n4. Tạo một commit có thông điệp `Fixes #1` để kiểm tra tính năng tự động liên kết đóng issue.\n\n---\n\n## 💡 Hint & mẹo\n> Sử dụng các từ khóa `Fixes #ID`, `Closes #ID`, hoặc `Resolves #ID` trong PR để tự động đóng Issue khi code được tích hợp.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Issue mới hiển thị đầy đủ nhãn phân loại và người phụ trách trong danh sách tab Issues.\n- Issue tự động chuyển sang màu tím `Closed` sau khi PR liên kết được merge vào main.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố kiến thức về quản lý công việc với GitHub Issues.\n\n---\n\n## 🚀 Thử thách nâng cao\nThiết lập mẫu Issue (Issue Templates) trong thư mục `.github/ISSUE_TEMPLATE/` để người báo cáo lỗi tự động điền theo biểu mẫu chuẩn chuyên nghiệp.\n\n---\n\n## 📝 Tổng kết\n- GitHub Issues là công cụ theo dõi lỗi và quản lý đầu việc tích hợp sẵn trong repo.\n- Sử dụng Labels, Milestones và Assignees để tổ chức công việc khoa học.\n- Từ khóa `Fixes #ID` trong PR giúp tự động đóng Issue khi code được merge vào main.\n",
  "quiz": {
    "id": "quiz-04-14-github-issues",
    "title": "Trắc nghiệm: Quản lý công việc với GitHub Issues",
    "questions": [
      {
        "id": "q1",
        "question": "GitHub Issues được thiết kế nhằm phục vụ mục đích cốt lõi nào trong dự án?",
        "type": "single",
        "options": [
          {
            "text": "Theo dõi lỗi phần mềm (bug tracking), quản lý yêu cầu tính năng mới và tổ chức công việc của nhóm",
            "correct": true
          },
          {
            "text": "Lưu trữ tệp video dung lượng lớn của công ty",
            "correct": false
          },
          {
            "text": "Tự động biên dịch mã nguồn thành file thực thi",
            "correct": false
          },
          {
            "text": "Quản lý tài khoản ngân hàng của lập trình viên",
            "correct": false
          }
        ],
        "explanation": "GitHub Issues đóng vai trò hệ thống quản lý công việc, theo dõi lỗi và thảo luận kỹ thuật tập trung."
      },
      {
        "id": "q2",
        "question": "Khi bạn viết câu cú pháp `Fixes #25` trong phần mô tả của một Pull Request, điều kỳ diệu gì sẽ xảy ra?",
        "type": "single",
        "options": [
          {
            "text": "Khi Pull Request đó được merge thành công vào nhánh main, Issue số 25 sẽ tự động được chuyển sang trạng thái Closed",
            "correct": true
          },
          {
            "text": "Issue số 25 sẽ bị xóa vĩnh viễn khỏi lịch sử",
            "correct": false
          },
          {
            "text": "Toàn bộ mã nguồn của commit 25 sẽ bị quay ngược lại",
            "correct": false
          },
          {
            "text": "Người tạo Issue 25 sẽ bị khóa tài khoản",
            "correct": false
          }
        ],
        "explanation": "Closing keywords như `Fixes #ID`, `Closes #ID` tự động đóng Issue liên kết ngay khi PR được merge."
      },
      {
        "id": "q3",
        "question": "Tính năng \"Labels\" trong GitHub Issues mang lại lợi ích gì cho việc quản trị dự án?",
        "type": "single",
        "options": [
          {
            "text": "Phân loại công việc theo màu sắc và danh mục (như bug, enhancement, documentation) để lọc tìm kiếm dễ dàng",
            "correct": true
          },
          {
            "text": "Tự động tính tiền thưởng cho từng nhiệm vụ",
            "correct": false
          },
          {
            "text": "Tăng tốc độ kết nối mạng của máy tính",
            "correct": false
          },
          {
            "text": "Bảo vệ kho chứa khỏi các cuộc tấn công mạng",
            "correct": false
          }
        ],
        "explanation": "Labels giúp phân loại, sắp xếp độ ưu tiên và lọc các tác vụ theo chủ đề một cách nhanh chóng."
      },
      {
        "id": "q4",
        "question": "Một bản báo cáo lỗi (Bug Report) chất lượng cao và chuyên nghiệp bắt buộc phải có thông tin nào?",
        "type": "single",
        "options": [
          {
            "text": "Các bước cụ thể để tái hiện lỗi (Steps to reproduce), kết quả thực tế gặp phải, kết quả kỳ vọng và ảnh chụp/mã lỗi",
            "correct": true
          },
          {
            "text": "Chỉ cần một câu ngắn gọn như \"Web bị hỏng rồi\"",
            "correct": false
          },
          {
            "text": "Số điện thoại cá nhân của người tìm ra lỗi",
            "correct": false
          },
          {
            "text": "Mật khẩu đăng nhập tài khoản máy tính của người báo cáo",
            "correct": false
          }
        ],
        "explanation": "Các bước tái hiện rõ ràng là yếu tố tiên quyết để kỹ sư khác có thể kiểm tra và sửa lỗi triệt để."
      },
      {
        "id": "q5",
        "question": "Tính năng Milestones trong GitHub Issues mang lại giá trị quản trị nào cho đội ngũ phát triển?",
        "type": "single",
        "options": [
          {
            "text": "Gom nhóm các Issue và PR liên quan theo một đợt phát hành phiên bản hoặc hạn chót sprint cụ thể để theo dõi tiến độ chung",
            "correct": true
          },
          {
            "text": "Tự động khóa kho chứa lại khi đến ngày hạn chót mà chưa xong việc",
            "correct": false
          },
          {
            "text": "Giới hạn số lượng commit tối đa mà mỗi thành viên được phép đẩy lên",
            "correct": false
          },
          {
            "text": "Tự động sa thải người được giao việc nếu Issue bị trễ hạn",
            "correct": false
          }
        ],
        "explanation": "Milestones giúp nhóm theo dõi tỷ lệ phần trăm hoàn thành của một nhóm các task hướng tới một cột mốc bàn giao sản phẩm."
      }
    ]
  }
};
export default lesson;
