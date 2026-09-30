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
  "content": "# Văn hóa và kỹ năng Code Review trên GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ mục đích và tầm quan trọng sống còn của hoạt động Code Review đối với sự phát triển của đội ngũ.\n- Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa code (Suggested Changes), và phê duyệt (Approve).\n- Xây dựng văn hóa nhận xét mang tính xây dựng, tôn trọng và đồng cảm (Empathy in Code Review).\n- Phân biệt rõ ràng giữa 3 trạng thái phản hồi: Comment, Approve, và Request Changes.\n\n---\n\n## 📖 Định nghĩa\n> Code Review (Đánh giá mã nguồn) là một quy trình kỹ thuật bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp, nơi các thành viên trong đội ngũ cùng nhau đọc, phân tích và phản biện mã nguồn trong một Pull Request trước khi nó được phép hợp nhất vào nhánh chính. Code Review giúp phát hiện sớm các lỗ hổng bảo mật, lỗi logic ngầm, vấn đề hiệu năng và bảo đảm phong cách lập trình tuân thủ đúng các quy chuẩn kiến trúc của dự án.\n\n---\n\n## 🤔 Tại sao cần?\nKhông một cá nhân nào có thể viết code hoàn hảo 100% mọi lúc. Hoạt động Code Review biến việc đảm bảo chất lượng từ trách nhiệm cá nhân đơn độc thành sức mạnh tập thể. Đây cũng là kênh đào tạo nội bộ hiệu quả nhất: các kỹ sư trẻ học hỏi được tư duy kiến trúc sắc bén từ các chuyên gia tiền bối, trong khi các chuyên gia senior liên tục nắm bắt được những thay đổi chi tiết đang diễn ra trên toàn bộ hệ thống.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Code Review giống như quy trình phản biện bài báo khoa học (Peer Review) của các nhà nghiên cứu, hoặc người biên tập viên đọc bản thảo của tác giả trước khi đem in sách. Người biên tập không nhằm mục đích chỉ trích hay hạ thấp danh dự tác giả, mà cùng tác giả soi từng lỗi chính tả, câu chữ lủng củng và các tình tiết vô lý để khi cuốn sách ra đời, nó là một tác phẩm hoàn hảo nhất có thể phục vụ độc giả.\n\n---\n\n## 🖼 Sơ đồ\n```text\n3 mức độ phản hồi khi kết thúc Code Review trên GitHub:\n┌────────────────────────────────────────────────────────┐\n│  [Comment]         ──► Chỉ để lại câu hỏi hoặc góp ý nhẹ│\n│  [Approve]         ──► Đồng ý hoàn toàn, sẵn sàng merge │\n│  [Request Changes] ──► Bắt buộc phải sửa lỗi trước      │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKỹ sư Senior Tuấn nhận được yêu cầu review Pull Request của bạn thực tập sinh Nam về chức năng đăng ký tài khoản. Đọc qua tệp auth.js, Tuấn nhận thấy mật khẩu người dùng đang được lưu dưới dạng văn bản thuần túy chưa mã hóa. Tuấn không hề chê bai mà nhẹ nhàng bấm vào dòng code đó trên GitHub diff, viết bình luận giải thích rủi ro bảo mật theo tiêu chuẩn OWASP và sử dụng tính năng \"Insert suggestion\" để gợi ý đoạn mã băm mật khẩu bằng thư viện bcrypt. Nam cảm ơn Tuấn, bấm nút chấp nhận gợi ý và cập nhật PR ngay lập tức.\n\n---\n\n## 💻 Command\n```bash\ngh pr checkout <pr-number>\ngit log -p\n```\n\n---\n\n## 🔍 Giải thích command\n- `gh pr checkout <number>`: Lệnh của GitHub CLI cho phép tải nhanh toàn bộ nhánh của PR về máy tính cá nhân để chạy thử nghiệm và kiểm tra thực tế.\n- `git log -p`: Xem chi tiết từng dòng diff thay đổi của các commit trong PR ngay trong terminal.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Công kích cá nhân thay vì tập trung vào đoạn code**:  Dùng lời lẽ gay gắt làm tổn thương đồng nghiệp.\n2. **Duyệt code mù quáng (LGTM - Looks Good To Me mà không thèm đọc)**:  Đẩy rủi ro lỗi nghiêm trọng lên môi trường production.\n3. **Tranh cãi gay gắt về sở thích cá nhân**:  Ví dụ tranh cãi về dấu cách hay tab thay vì để công cụ tự động (Prettier/ESLint) xử lý.\n\n---\n\n## 🧪 Lab\n1. Mở tab `Files changed` trong một Pull Request trên GitHub.\n2. Rê chuột vào một dòng code và nhấn vào biểu tượng dấu cộng màu xanh để để lại bình luận.\n3. Sử dụng cú pháp gợi ý sửa code ````suggestion` để đề xuất đoạn code mới.\n4. Nhấn `Review changes` và chọn trạng thái `Approve` hoặc `Request changes`.\n\n---\n\n## 💡 Hint\n> Hãy luôn bình luận về mã nguồn, không bao giờ bình luận về con người lập trình viên.\n\n---\n\n## ✅ Validation\n- Để lại nhận xét mang tính xây dựng và sử dụng thành thạo các tính năng review trên GitHub.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về văn hóa và kỹ năng Code Review.\n\n---\n\n## 🔥 Challenge\nNêu lợi ích của việc cấu hình Branch Protection Rule yêu cầu tối thiểu 2 approvals trước khi merge.\n\n---\n\n## 📚 Tổng kết\n- Code Review là hoạt động tập thể nhằm nâng cao chất lượng mã nguồn và chia sẻ kiến thức.\n- Sử dụng tính năng Suggested Changes để đồng nghiệp có thể áp dụng sửa đổi chỉ với một cú click.\n- Luôn giữ thái độ tôn trọng, tích cực và tập trung vào giải pháp kỹ thuật.\n",
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
      }
    ]
  }
};
export default lesson;
