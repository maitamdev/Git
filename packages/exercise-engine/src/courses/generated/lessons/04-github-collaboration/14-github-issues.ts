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
  "content": "# Quản lý công việc và lỗi với GitHub Issues\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ vai trò của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).\n- Biết cách viết một báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện chi tiết.\n- Sử dụng các nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để quản trị công việc.\n- Nắm vững các từ khóa liên kết tự động đóng Issue khi merge PR: `Fixes #12`, `Closes #45`.\n\n---\n\n## 📖 Định nghĩa\n> GitHub Issues là hệ thống quản lý công việc và theo dõi lỗi (Issue Tracking System) tích hợp sẵn ngay bên trong mỗi kho lưu trữ GitHub. Issues hoạt động như một danh sách việc cần làm (To-Do List) mạnh mẽ, nơi người dùng và các kỹ sư có thể báo cáo sự cố (Bug Reports), đề xuất tính năng mới (Feature Requests), thảo luận về các vấn đề kỹ thuật và phân công trách nhiệm cho từng thành viên trong nhóm.\n\n---\n\n## 🤔 Tại sao cần?\nMột dự án phần mềm không thể thành công nếu chỉ có mã nguồn mà không có sự quản lý công việc bài bản. Nếu không có hệ thống theo dõi lỗi, các yêu cầu của khách hàng sẽ bị trôi mất trong tin nhắn chat, các lỗi nghiêm trọng sẽ bị bỏ quên và đội ngũ sẽ rơi vào tình trạng hỗn loạn không biết ai đang làm gì. Sử dụng thành thạo GitHub Issues giúp dự án vận hành khoa học, minh bạch và chuyên nghiệp.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung GitHub Issues giống như một chiếc bảng Kanban điện tử thông minh được đặt trang trọng ngay giữa phòng làm việc của nhóm kỹ thuật, nơi dán các tấm thẻ ghi chú nhiệm vụ với nhiều màu sắc phân loại khác nhau. Mỗi tấm thẻ (Issue) ghi rõ nội dung sự cố: \"Nút Đăng nhập trên điện thoại bị lệch giao diện\" (Lỗi), do ai chịu trách nhiệm sửa (Assignee), độ ưu tiên cao hay thấp (Label: bug, priority:high), và cần phải hoàn thành trước ngày nào (Milestone: Sprint 4). Nhờ chiếc bảng này, toàn đội luôn nắm bắt tiến độ công việc minh bạch.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình liên kết tự động Issue và Pull Request:\n[Issue #42: Bug giỏ hàng] ◄────────────────────────────────┐\n                                                           │ (Khi PR được merge)\n[Pull Request: \"Fixes #42 - Fix cart calculation\"] ────────┴──► [Tự động ĐÓNG Issue #42!]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột khách hàng liên hệ báo cáo lỗi không thể thanh toán đơn hàng bằng thẻ tín dụng quốc tế. Kỹ sư Linh nhanh chóng tạo một Issue trên GitHub với tiêu đề chuẩn mực: \"[Bug] Payment gateway timeout on checkout\". Linh dán mã lỗi chi tiết từ hệ thống ghi log, đính kèm ảnh chụp màn hình và gắn nhãn `bug`, `critical`. Kỹ sư Huy nhận phân công phụ trách xử lý issue này. Sau khi sửa xong trên nhánh tính năng, Huy mở Pull Request với phần mô tả ghi rõ: \"Fixes #104 - increase payment gateway timeout to 30s\". Khi PR được duyệt và merge vào main, GitHub tự động chuyển trạng thái của Issue #104 sang Closed một cách hoàn toàn tự động.\n\n---\n\n## 💻 Command\n```bash\ngh issue list\ngh issue create\ngh issue view <issue-number>\n```\n\n---\n\n## 🔍 Giải thích command\n- `gh issue list`: Liệt kê danh sách các issue đang mở của dự án trực tiếp trong terminal bằng GitHub CLI.\n- `gh issue create`: Tạo một issue mới nhanh chóng ngay từ dòng lệnh.\n- `gh issue view <number>`: Xem chi tiết nội dung và các bình luận của một issue chỉ định.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Báo cáo lỗi quá mơ hồ như \"Trang web bị lỗi không chạy\"**:  Không có bước tái hiện, không có ảnh chụp màn hình khiến người khác không thể sửa được.\n2. **Quên sử dụng từ khóa đóng issue trong PR**:  Khiến PR đã merge nhưng issue vẫn mở, làm sai lệch báo cáo tiến độ dự án.\n3. **Sử dụng Issue để trò chuyện tán gẫu không liên quan đến kỹ thuật.**: Sử dụng Issue để trò chuyện tán gẫu không liên quan đến kỹ thuật.\n\n---\n\n## 🧪 Lab\n1. Truy cập tab `Issues` trên kho lưu trữ GitHub và bấm nút `New issue`.\n2. Điền tiêu đề rõ ràng và nội dung mô tả lỗi theo mẫu hướng dẫn.\n3. Gán nhãn `bug` và chỉ định bản thân vào mục `Assignees`.\n4. Tạo một commit có thông điệp `Fixes #1` để trải nghiệm tính năng tự động liên kết đóng issue.\n\n---\n\n## 💡 Hint\n> Sử dụng các từ khóa `Fixes #ID`, `Closes #ID`, hoặc `Resolves #ID` trong PR để tự động đóng Issue.\n\n---\n\n## ✅ Validation\n- Tạo thành công Issue trên GitHub và liên kết tự động đóng thông qua Pull Request.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về quản lý công việc với GitHub Issues.\n\n---\n\n## 🔥 Challenge\nNêu danh sách toàn bộ các từ khóa liên kết tự động đóng issue (Closing keywords) được GitHub hỗ trợ.\n\n---\n\n## 📚 Tổng kết\n- GitHub Issues là công cụ theo dõi lỗi và quản lý đầu việc tích hợp sẵn trong repo.\n- Sử dụng Labels, Milestones và Assignees để tổ chức công việc khoa học.\n- Từ khóa `Fixes #ID` trong PR giúp tự động đóng Issue khi code được merge vào main.\n",
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
      }
    ]
  }
};
export default lesson;
