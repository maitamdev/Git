import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-code-review",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "12-code-review",
    "title": "Văn hóa và kỹ năng Code Review trên GitHub",
    "level": "intermediate",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "11-pull-request"
    ],
    "objectives": [
      "Hiểu rõ mục đích và tầm quan trọng sống còn của hoạt động Code Review đối với sự phát triển của đội ngũ.",
      "Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa code (Suggested Changes), và phê duyệt (Approve).",
      "Xây dựng văn hóa nhận xét mang tính xây dựng, tôn trọng và đồng cảm (Empathy in Code Review).",
      "Phân biệt rõ ràng giữa 3 trạng thái phản hồi: Comment, Approve, và Request Changes."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "code review",
      "review code",
      "phe duyet",
      "comment diff",
      "van hoa ky thuat",
      "chat luong ma"
    ],
    "commands": [
      "gh pr checkout <pr-number>",
      "git log -p"
    ]
  },
  "content": "# Văn hóa và kỹ năng Code Review trên GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ mục đích và tầm quan trọng sống còn của hoạt động Code Review đối với sự phát triển của đội ngũ.\n- Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa code (Suggested Changes), và phê duyệt (Approve).\n- Xây dựng văn hóa nhận xét mang tính xây dựng, tôn trọng và đồng cảm (Empathy in Code Review).\n- Phân biệt rõ ràng giữa 3 trạng thái phản hồi: Comment, Approve, và Request Changes.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### code review\n- **Nói dễ hiểu**: Hoạt động đồng nghiệp đọc và phản biện code của nhau trước khi cho phép gộp vào nhánh chính.\n- **Ví dụ**: Đọc các file thay đổi trên tab \"Files changed\" của PR để tìm lỗi logic và bảo mật.\n- **Đừng nhầm**: Không phải công cụ soi xét chỉ trích cá nhân; đây là quy trình học hỏi và nâng cao chất lượng chung.\n\n### suggested changes\n- **Nói dễ hiểu**: Tính năng viết sẵn đoạn code sửa lỗi ngay trong bình luận để tác giả PR bấm áp dụng trực tiếp.\n- **Ví dụ**: Chèn khối code gợi ý thay thế hàm cũ bằng hàm mới an toàn hơn.\n- **Đừng nhầm**: Người review không tự động ghi đè code; tác giả PR vẫn là người bấm duyệt áp dụng commit.\n\n### request changes\n- **Nói dễ hiểu**: Trạng thái phản hồi chặn không cho merge PR cho đến khi các lỗi nghiêm trọng được khắc phục xong.\n- **Ví dụ**: Phát hiện lỗ hổng SQL Injection hoặc lộ secret key và yêu cầu sửa trước khi đưa vào main.\n- **Đừng nhầm**: Không dùng cho những góp ý nhỏ về cách đặt tên hay sở thích cá nhân; chỉ dùng khi có rủi ro kỹ thuật thật sự.\n\n---\n\n## 📖 Định nghĩa\nCode Review là quy trình kiểm tra chất lượng mã nguồn bắt buộc trong nhóm kỹ thuật, nơi các thành viên cùng đọc, phân tích và phản biện code trong Pull Request trước khi gộp vào nhánh chính, giúp phát hiện sớm lỗ hổng bảo mật, lỗi logic và sai lệch kiến trúc.\n\n---\n\n## 💡 Tại sao cần\nKhông ai có thể viết code hoàn hảo mọi lúc mà không mắc lỗi. Code Review biến việc đảm bảo chất lượng từ gánh nặng cá nhân thành sức mạnh tập thể. Đây cũng là kênh đào tạo nội bộ tốt nhất giúp kỹ sư trẻ học hỏi tư duy thiết kế từ đồng nghiệp đi trước.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung Code Review như quy trình biên tập viên đọc bản thảo của tác giả trước khi đem in sách. Người biên tập không nhằm chê bai mà cùng tác giả rà soát từng lỗi chính tả, câu chữ lủng củng và chi tiết vô lý để cuốn sách xuất bản đạt chất lượng hoàn hảo nhất.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\n3 mức độ phản hồi khi kết thúc Code Review trên GitHub:\n┌────────────────────────────────────────────────────────┐\n│  [Comment]         ──► Chỉ để lại câu hỏi hoặc góp ý nhẹ│\n│  [Approve]         ──► Đồng ý hoàn toàn, sẵn sàng merge │\n│  [Request Changes] ──► Bắt buộc phải sửa lỗi trước      │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Senior Tuấn review PR đăng ký tài khoản của bạn thực tập sinh. Thấy mật khẩu lưu dạng văn bản chưa mã hóa, Tuấn bấm vào dòng code trên GitHub diff, giải thích rủi ro theo chuẩn OWASP và dùng tính năng Insert suggestion để gợi ý băm mật khẩu bằng bcrypt. Tác giả cảm ơn và bấm nút áp dụng gợi ý để cập nhật commit ngay.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngh pr checkout <pr-number>\ngit log -p\n```\n\n---\n\n## 🔍 Giải thích command\n- `gh pr checkout <number>`: Lệnh của GitHub CLI cho phép tải nhánh của PR về máy tính cá nhân để chạy thử nghiệm thực tế.\n- `git log -p`: Xem chi tiết từng dòng thay đổi (diff) của các commit trong nhánh ngay tại terminal máy bạn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Công kích cá nhân thay vì tập trung vào đoạn code**: Dùng lời lẽ gay gắt làm ảnh hưởng tiêu cực tới tinh thần đồng đội.\n2. **Duyệt hời hợt mà không đọc code**: Bấm approve bừa bãi khiến lỗi nghiêm trọng lọt vào môi trường chạy thật.\n3. **Tranh cãi gay gắt về sở thích cá nhân**: Tranh luận về dấu cách hay tab thay vì cấu hình công cụ tự động như Prettier và ESLint.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành xem diff và thử để lại nhận xét trên giao diện GitHub PR.\n1. Mở tab `Files changed` trong một Pull Request trên GitHub.\n2. Rê chuột vào một dòng code và nhấn vào biểu tượng dấu cộng xanh để mở ô bình luận.\n3. Sử dụng cú pháp gợi ý sửa code để đề xuất dòng thay thế.\n4. Nhấn `Review changes` và phân biệt giữa ba lựa chọn `Comment`, `Approve`, `Request changes`.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn bình luận về dòng mã nguồn và giải pháp kỹ thuật, tuyệt đối không bình luận về con người lập trình viên.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Để lại nhận xét mang tính xây dựng và sử dụng thành thạo tính năng gợi ý sửa code trên GitHub.\n- Hiểu rõ khi nào nên Approve và khi nào cần Request changes.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về văn hóa và kỹ năng Code Review.\n\n---\n\n## 🚀 Thử thách nâng cao\nTìm hiểu cách cấu hình quy tắc Branch Protection Rules trên GitHub để yêu cầu tối thiểu 1 hoặc 2 lượt Approve trước khi nút Merge được mở khóa.\n\n---\n\n## 📝 Tổng kết\n- Code Review là hoạt động tập thể nhằm nâng cao chất lượng mã nguồn và chia sẻ kiến thức.\n- Sử dụng tính năng Suggested Changes để đồng nghiệp có thể áp dụng sửa đổi chỉ với một cú click.\n- Luôn giữ thái độ tôn trọng, tích cực và tập trung vào giải pháp kỹ thuật.\n",
  "quiz": {
    "id": "quiz-04-12-code-review",
    "title": "Trắc nghiệm: Văn hóa và kỹ năng Code Review",
    "questions": [
      {
        "id": "q1",
        "question": "Mục tiêu quan trọng và cao cả nhất của hoạt động Code Review trong một nhóm phần mềm là gì?",
        "type": "single",
        "options": [
          {
            "text": "Nâng cao chất lượng mã nguồn, phát hiện lỗi sớm và chia sẻ kiến thức chuyên môn giữa các thành viên",
            "correct": true
          },
          {
            "text": "Tìm lỗi để trừ lương hoặc hạ bậc khen thưởng của đồng nghiệp",
            "correct": false
          },
          {
            "text": "Thể hiện quyền lực và chứng tỏ bản thân giỏi hơn người khác",
            "correct": false
          },
          {
            "text": "Làm kéo dài thời gian phát triển dự án để không phải làm việc mới",
            "correct": false
          }
        ],
        "explanation": "Code Review là cơ hội học hỏi và nâng cao chất lượng tập thể, hoàn toàn không phải công cụ đánh giá kỷ luật cá nhân."
      },
      {
        "id": "q2",
        "question": "Tính năng \"Suggested Changes\" (Gợi ý thay đổi) trên giao diện GitHub diff cho phép người review làm điều gì tuyệt vời?",
        "type": "single",
        "options": [
          {
            "text": "Viết sẵn đoạn code thay thế chính xác để tác giả PR có thể chấp nhận và tự động commit chỉ với một cú nhấp chuột",
            "correct": true
          },
          {
            "text": "Tự động xóa tài khoản của người viết code sai",
            "correct": false
          },
          {
            "text": "Tự động gửi tin nhắn trừ điểm rèn luyện của sinh viên",
            "correct": false
          },
          {
            "text": "Tắt màn hình máy tính của tác giả PR từ xa",
            "correct": false
          }
        ],
        "explanation": "Suggested Changes giúp đề xuất giải pháp trực quan và cho phép áp dụng ngay thành commit mới mà không cần gõ lại."
      },
      {
        "id": "q3",
        "question": "Lựa chọn phản hồi \"Request changes\" trên GitHub nên được sử dụng trong trường hợp nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Khi phát hiện lỗi logic nghiêm trọng, lỗ hổng bảo mật hoặc vi phạm kiến trúc bắt buộc phải sửa trước khi merge",
            "correct": true
          },
          {
            "text": "Khi bạn không thích màu hình đại diện đại diện của tác giả PR",
            "correct": false
          },
          {
            "text": "Khi tác giả PR từ chối mời bạn đi uống trà sữa",
            "correct": false
          },
          {
            "text": "Bất cứ khi nào bạn muốn trêu đùa đồng nghiệp cho vui",
            "correct": false
          }
        ],
        "explanation": "`Request changes` là rào chắn chặn không cho phép merge cho đến khi tác giả sửa xong các vấn đề cốt lõi."
      },
      {
        "id": "q4",
        "question": "Thói quen xấu nào sau đây thể hiện sự thiếu trách nhiệm và nguy hại nhất trong văn hóa Code Review?",
        "type": "single",
        "options": [
          {
            "text": "Phê duyệt hời hợt (LGTM) mà không hề đọc hay kiểm tra kỹ lưỡng các dòng code thay đổi",
            "correct": true
          },
          {
            "text": "Khen ngợi một đoạn thuật toán sáng tạo của đồng nghiệp",
            "correct": false
          },
          {
            "text": "Đặt câu hỏi để hiểu rõ hơn lý do lựa chọn giải pháp của tác giả",
            "correct": false
          },
          {
            "text": "Chạy thử nghiệm tính năng trên máy cá nhân trước khi duyệt",
            "correct": false
          }
        ],
        "explanation": "Review hời hợt tạo ra ảo tưởng về sự an toàn và là con đường ngắn nhất để lọt các lỗi chết người vào production."
      },
      {
        "id": "q5",
        "question": "Khi là tác giả nhận được phản hồi góp ý từ người review, thái độ và hành động chuyên nghiệp nhất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Đón nhận phản hồi mang tính xây dựng, trao đổi logic kỹ thuật rõ ràng và commit các chỉnh sửa bổ sung lên nhánh PR",
            "correct": true
          },
          {
            "text": "Tức giận, công kích cá nhân người review và từ chối hợp tác tiếp",
            "correct": false
          },
          {
            "text": "Ngay lập tức đóng PR và xóa toàn bộ tài khoản GitHub cá nhân",
            "correct": false
          },
          {
            "text": "Bỏ qua ý kiến phản hồi rồi ép merge thẳng vào main bằng quyền admin",
            "correct": false
          }
        ],
        "explanation": "Tác giả PR chuyên nghiệp luôn trao đổi trên tinh thần kỹ thuật, kiểm tra lại logic và cập nhật commit mới để hoàn thiện code."
      }
    ]
  }
};
export default lesson;
