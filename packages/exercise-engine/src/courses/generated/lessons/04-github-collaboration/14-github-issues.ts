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
      "Dùng closing keyword với số Issue thật và biết điều kiện để Issue tự đóng."
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
  "content": "# Quản lý công việc và lỗi với GitHub Issues\n\n---\n\n## 🎯 Mục tiêu\n- Thấu suốt vai trò trung tâm của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).\n- Nắm vững cấu trúc một bản báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện lỗi chi tiết.\n- Sử dụng thành thạo hệ thống nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để phân luồng công việc.\n- Vận dụng các từ khóa đóng tự động (Closing Keywords) như `Fixes #12`, `Closes #45` trong mô tả Pull Request.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### github issues — theo dõi công việc và lỗi\n- **Nói dễ hiểu:** Tấm thẻ quản lý công việc trên GitHub đại diện cho một lỗi cần sửa, một tính năng cần làm hoặc một câu hỏi kỹ thuật.\n- **Ví dụ:** Tạo Issue `#15: Nút đặt hàng không phản hồi trên trình duyệt Safari mobile`.\n- **Đừng nhầm:** Issues không chỉ dùng khi có sự cố hỏng hóc; nó còn dùng để lập kế hoạch phát triển tính năng và kiến trúc hệ thống.\n\n### labels and assignees — nhãn và người phụ trách\n- **Nói dễ hiểu:** Công cụ phân loại bằng màu sắc (Labels) và người chịu trách nhiệm chính (Assignees) được giao giải quyết công việc.\n- **Ví dụ:** Gắn nhãn màu đỏ `bug`, màu cam `p1-urgent` và gán tên kỹ sư Tuấn vào mục Assignees.\n- **Đừng nhầm:** Nhãn không tự động sửa lỗi; đây là công cụ hỗ trợ lọc, tìm kiếm và phân cấp mức độ ưu tiên công việc khoa học.\n\n### closing keywords — từ khóa đóng issue tự động\n- **Nói dễ hiểu:** Các từ khóa đặc biệt như `Fixes #15` giúp GitHub tự động chuyển Issue sang trạng thái hoàn thành khi PR được gộp.\n- **Ví dụ:** Trong phần mô tả PR bạn ghi `Resolves #42`, khi PR merge vào main thì Issue #42 sẽ tự động đóng ngay lập tức.\n- **Đừng nhầm:** Từ khóa đóng chỉ phát huy tác dụng tự động khi Pull Request được merge thẳng vào nhánh mặc định của dự án.\n\n---\n\n## 📖 Định nghĩa\nGitHub Issues là hệ thống quản trị đầu việc và theo dõi lỗi tích hợp sẵn bên trong kho lưu trữ GitHub, cung cấp không gian tập trung để đội ngũ ghi nhận các lỗi phần mềm (bugs), thảo luận các đề xuất tính năng mới (features) và phân công trách nhiệm rõ ràng cho từng thành viên trong suốt vòng đời dự án.\n\n---\n\n## 🤔 Tại sao cần?\nMột dự án phần mềm không thể thành công nếu chỉ có mã nguồn mà thiếu đi quy trình quản lý yêu cầu bài bản. Nếu không có hệ thống theo dõi lỗi chuyên nghiệp, phản hồi của người dùng sẽ bị thất lạc trong các nhóm chat, lỗi bảo mật nghiêm trọng bị bỏ quên và nhóm sẽ rơi vào tình trạng mất phương hướng, không nắm được ai đang chịu trách nhiệm cho hạng mục nào.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung GitHub Issues như một chiếc bảng thông minh Kanban đặt ở vị trí trung tâm của phòng làm việc đội ngũ. Mỗi tấm thẻ ghi chú (Issue) được dán màu sắc phân loại riêng (Labels), chỉ định rõ người thực hiện (Assignees), thời hạn hoàn thành (Milestones) và mô tả chi tiết vấn đề để toàn bộ các thành viên đều có thể theo dõi tiến độ một cách minh bạch.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ LIÊN KẾT TỰ ĐỘNG GIỮA PULL REQUEST VÀ GITHUB ISSUES:\n\n[Issue #42: Bug tính sai tiền giỏ hàng] ◄───────────────────────┐\n                                                                │ (Khi PR được merge)\n[Pull Request: \"feat: Fixes #42 - recalculate total price\"] ────┴──► [Tự động ĐÓNG Issue #42!]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhi người dùng báo lỗi cổng thanh toán bị treo, lập trình viên tạo ngay Issue `#104: Bug cổng thanh toán trả về mã lỗi 504 khi tải cao`, đính kèm ảnh chụp màn hình và gắn nhãn `bug`, `high-priority`. Kỹ sư phụ trách nhận Issue, tạo nhánh sửa lỗi và mở PR có ghi dòng `Fixes #104`. Ngay khi PR được duyệt và merge vào main, GitHub tự động chuyển Issue #104 sang trạng thái Closed.\n\n---\n\n## 💻 Command\n```bash\ngh issue list\ngh issue create --title \"Bug: navbar broken on mobile\" --label \"bug\"\ngh issue view 42\ngh issue close 42\n```\n\n---\n\n## 🔍 Giải thích command\n- `gh issue list`: Hiển thị danh sách các issue đang mở của dự án trực tiếp ngay trong cửa sổ terminal.\n- `gh issue create`: Tạo nhanh một issue mới kèm tiêu đề và gắn nhãn mà không cần mở trình duyệt web.\n- `gh issue view 42`: Đọc toàn bộ nội dung mô tả và các bình luận phản hồi của issue số 42.\n- `gh issue close 42`: Đóng issue số 42 trực tiếp từ giao diện dòng lệnh khi công việc đã hoàn tất.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Viết tiêu đề và mô tả lỗi chung chung**: Viết mỗi câu \"Hệ thống bị lỗi\" mà không cung cấp các bước tái hiện, khiến đồng nghiệp không thể sửa.\n2. **Quên dùng từ khóa đóng Issue trong PR**: PR đã merge xong nhưng Issue vẫn nằm mở, gây sai lệch báo cáo tiến độ dự án.\n3. **Biến Issue thành nơi tranh cãi tán gẫu**: Làm loãng không gian trao đổi kỹ thuật và khiến thông tin nghiệp vụ bị phân tán.\n\n---\n\n## 🧪 Lab\n1. Truy cập tab \"Issues\" trên kho lưu trữ GitHub của bạn và nhấp nút \"New issue\".\n2. Điền tiêu đề rõ ràng, mô tả chi tiết các bước tái hiện lỗi và kết quả kỳ vọng.\n3. Gán nhãn phù hợp (ví dụ `bug` hoặc `documentation`) và gán người phụ trách.\n4. Ghi lại số thứ tự của Issue (ví dụ `#1`).\n5. Tạo một PR sửa đổi có chứa từ khóa `Closes #1` trong phần mô tả để kiểm chứng tính năng tự động đóng.\n\n---\n\n## 💡 Hint\n> Một báo cáo lỗi xuất sắc luôn tuân thủ công thức 3 phần: 1. Bước tái hiện lỗi (Steps to reproduce), 2. Kết quả thực tế xảy ra (Actual behavior), 3. Kết quả mong đợi (Expected behavior). Làm chuẩn điều này sẽ tiết kiệm 80% thời gian cho cả đội ngũ!\n\n---\n\n## ✅ Validation\n- Tạo được một Issue đạt chuẩn với đầy đủ mô tả, nhãn và người chịu trách nhiệm.\n- Nắm vững danh sách các từ khóa đóng tự động được GitHub hỗ trợ: `Fixes`, `Closes`, `Resolves`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về kỹ năng quản lý công việc và báo cáo lỗi với GitHub Issues.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cách kết hợp GitHub Issues với GitHub Projects (bảng Kanban tự động). Làm thế nào để khi một Issue mới được tạo, nó tự động rơi vào cột \"Todo\", và khi có PR liên kết thì tự động nhảy sang cột \"In Progress\"?\n\n---\n\n## 📚 Tổng kết\n- GitHub Issues là trung tâm điều phối công việc và quản lý lỗi của dự án.\n- Tận dụng Labels, Milestones và Assignees để tổ chức quy trình làm việc khoa học.\n- Sử dụng Closing Keywords (`Fixes #ID`) để liên kết và đóng Issue tự động khi merge PR.\n",
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
            "text": "Khi Pull Request đó được merge thành công vào nhánh mặc định của repository, Issue số 25 sẽ tự động được chuyển sang trạng thái Closed",
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
        "explanation": "Closing keywords trong PR tự đóng Issue khi PR được merge vào nhánh mặc định của repository."
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
