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
      "Hiểu mục tiêu của Code Review và viết nhận xét kỹ thuật mang tính xây dựng.",
      "Nhận biết Comment, Approve, Request Changes và Suggested Changes trên GitHub.",
      "Xây dựng văn hóa nhận xét mang tính xây dựng, tôn trọng và đồng cảm (Empathy in Code Review)."
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
    "commands": []
  },
  "content": "# Văn hóa và kỹ năng Code Review trên GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Thấu hiểu mục đích tối thượng và giá trị vô giá của hoạt động Code Review đối với sự trưởng thành của đội ngũ.\n- Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa mã (Suggested Changes) và gửi phản hồi.\n- Xây dựng tư duy phản biện mang tính xây dựng, đồng cảm và tôn trọng (Empathy in Code Review).\n- Nắm vững ý nghĩa và hoàn cảnh áp dụng chuẩn xác của 3 trạng thái phản hồi: Comment, Approve và Request Changes.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### code review — phản biện mã nguồn\n- **Nói dễ hiểu:** Hoạt động đồng nghiệp đọc và kiểm tra chéo mã nguồn của nhau trước khi cho phép gộp vào nhánh chính của dự án.\n- **Ví dụ:** Mở tab \"Files changed\" trên GitHub để rà soát logic tính tiền, kiểm tra lỗ hổng bảo mật và tính tối ưu thuật toán.\n- **Đừng nhầm:** Đây tuyệt đối không phải công cụ để soi mói hay chỉ trích cá nhân; đây là diễn đàn học hỏi và cùng nâng cao chuẩn mực chung.\n\n### suggested changes — gợi ý sửa đổi trực tiếp\n- **Nói dễ hiểu:** Tính năng ưu việt cho phép người review viết sẵn đoạn code đề xuất ngay trong bình luận để tác giả bấm nút áp dụng tức thì.\n- **Ví dụ:** Bạn chèn khối code gợi ý thay thế vòng lặp for thủ công bằng phương thức `.map()` ngắn gọn và an toàn hơn.\n- **Đừng nhầm:** Đoạn gợi ý không tự động đè lên code của tác giả; chính tác giả PR mới là người bấm nút phê duyệt để tạo commit mới.\n\n### request changes — yêu cầu chỉnh sửa\n- **Nói dễ hiểu:** Trạng thái đánh giá chính thức thể hiện người review phát hiện lỗi nghiêm trọng và yêu cầu tác giả phải sửa trước khi gộp.\n- **Ví dụ:** Bạn bấm \"Request changes\" khi phát hiện đoạn code có lỗ hổng SQL Injection hoặc làm lộ thông tin mật khẩu nhạy cảm.\n- **Đừng nhầm:** Trạng thái này có thể trực tiếp khóa nút Merge nếu kho lưu trữ đã được cấu hình luật bảo vệ nhánh nghiêm ngặt.\n\n---\n\n## 📖 Định nghĩa\nCode Review (phản biện mã nguồn) là quy trình kỹ thuật bắt buộc trong phát triển phần mềm chuyên nghiệp, nơi các thành viên trong đội ngũ trực tiếp đọc hiểu, kiểm tra chéo, phân tích rủi ro và đóng góp ý kiến cải tiến trên từng dòng mã nguồn của đồng nghiệp trước khi những thay đổi đó được chính thức phê duyệt và tích hợp vào nhánh chính.\n\n---\n\n## 🤔 Tại sao cần?\nKhông một lập trình viên nào dù tài năng đến đâu có thể viết mã hoàn hảo 100% mọi lúc. Hoạt động Code Review chuyển hóa trách nhiệm bảo đảm chất lượng từ gánh nặng đơn độc của một cá nhân thành sức mạnh trí tuệ của cả tập thể. Quan trọng hơn, đây là kênh đào tạo nội bộ hiệu quả nhất: kỹ sư ít kinh nghiệm học được tư duy thiết kế hệ thống từ đàn anh, còn kỹ sư kỳ cựu liên tục củng cố sự chuẩn mực.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung Code Review như quy trình biên tập viên kỳ cựu đọc duyệt bản thảo của nhà văn trước khi đưa vào nhà in xuất bản sách. Người biên tập không nhằm mục đích phán xét hay chỉ trích tác giả, mà cùng ngồi lại với tác giả để rà soát từng lỗi diễn đạt, chi tiết vô lý và gợi ý câu từ đắt giá hơn nhằm đem lại một tác phẩm hoàn hảo nhất tới tay độc giả.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBA TRẠNG THÁI PHẢN HỒI KHI KẾT THÚC REVIEW TRÊN GITHUB:\n\n┌────────────────────────────────────────────────────────┐\n│  [Comment]         ──► Chỉ để lại thắc mắc hoặc góp ý  │\n│  [Approve]         ──► Đồng thuận hoàn toàn, cho phép  │\n│  [Request Changes] ──► Bắt buộc phải sửa mới được gộp  │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhi xem xét PR của một đồng nghiệp mới, Tech Lead phát hiện một câu lệnh truy vấn cơ sở dữ liệu có nguy cơ gây lỗi N+1 làm tê liệt hệ thống khi lượng người dùng tăng cao. Thay vì bình luận chung chung, Tech Lead để lại bình luận chi tiết ngay tại dòng code đó, giải thích rõ nguyên nhân và dùng tính năng Suggested Changes để viết sẵn đoạn mã dùng eager loading. Lập trình viên chỉ cần bấm nút chấp thuận để áp dụng ngay.\n\n---\n\n## 💻 Command\n```bash\ngh pr checkout 42\ngit log -p -2\n```\n\n---\n\n## 🔍 Giải thích command\n- `gh pr checkout 42`: Lệnh của GitHub CLI giúp tự động kéo toàn bộ nhánh của PR số 42 về máy tính cá nhân để chạy thử nghiệm thực tế.\n- `git log -p -2`: Soi chiếu chi tiết từng dòng thay đổi (diff) của 2 commit gần nhất ngay tại giao diện dòng lệnh.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Phán xét gay gắt về con người thay vì đoạn code**: Dùng ngôn từ tiêu cực làm tổn thương đồng nghiệp và phá vỡ tinh thần đoàn kết của nhóm.\n2. **Bấm Approve hời hợt mà không thèm đọc code**: Dễ dãi ký duyệt khiến các lỗi bảo mật hoặc rò rỉ bộ nhớ nghiêm trọng lọt vào bản phát hành chính.\n3. **Tranh cãi bất tận về phong cách định dạng cá nhân**: Tranh cãi dấu cách hay dấu phẩy thay vì để các công cụ tự động hóa như Linter hay Prettier giải quyết.\n\n---\n\n## 🧪 Lab\n1. Mở một PR đang mở trên GitHub của nhóm bạn hoặc kho dự án mã nguồn mở.\n2. Điều hướng sang tab \"Files changed\" để quan sát các vùng sai khác màu xanh và đỏ.\n3. Nhấp vào một dòng code cụ thể, nhấp biểu tượng dấu cộng để mở khung bình luận.\n4. Thử nghiệm tính năng \"Add a suggestion\" để tạo một khối mã thay thế mẫu.\n5. Xem lại bảng tổng kết đánh giá \"Review changes\" với 3 lựa chọn Comment, Approve và Request changes.\n\n---\n\n## 💡 Hint\n> Kim chỉ nam của người review xuất sắc: \"Luôn giải thích lý do (Tại sao nên làm thế này?) kèm theo giải pháp cụ thể (Làm thế nào?), và không bao giờ quên khen ngợi những đoạn code xử lý thông minh của đồng nghiệp!\"\n\n---\n\n## ✅ Validation\n- Nhận thức thấu đáo tinh thần và văn hóa cốt lõi của hoạt động Code Review.\n- Sử dụng thành thạo tính năng gợi ý mã nguồn Suggested Changes trên giao diện GitHub.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để củng cố nhận thức và kỹ năng thực hành văn hóa Code Review chuyên nghiệp.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cách kết hợp cấu hình `CODEOWNERS` với Branch Protection Rules trên GitHub. Làm thế nào để GitHub tự động gắn thẻ trưởng nhóm kiến trúc vào mục Reviewers mỗi khi có ai đó sửa đổi các tệp nằm trong thư mục cốt lõi `/src/core/`?\n\n---\n\n## 📚 Tổng kết\n- Code Review là tấm lá chắn bảo vệ chất lượng phần mềm và văn hóa chia sẻ tri thức.\n- Tận dụng Suggested Changes để đưa ra đề xuất trực quan và tiết kiệm thời gian cho đồng đội.\n- Luôn giữ thái độ khách quan, tôn trọng và tập trung vào lợi ích lâu dài của dự án.\n",
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
            "text": "Khi bạn cho rằng thay đổi cần được xử lý trước khi chấp thuận; quy tắc repository quyết định trạng thái đó có chặn merge không",
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
        "explanation": "`Request changes` truyền đạt yêu cầu sửa; branch protection có thể bắt buộc xử lý trước khi merge."
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
