import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "01-version-control",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "01-version-control",
    "title": "Version Control là gì?",
    "level": "beginner",
    "duration": 20,
    "xp": 50,
    "prerequisites": [],
    "objectives": [
      "Giải thích được VCS giúp lưu và xem lại các mốc thay đổi.",
      "Nhận ra rủi ro khi chỉ tạo nhiều bản sao thư mục thủ công.",
      "Phân biệt mốc đã lưu với tệp đang sửa dở."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "vcs",
      "version control",
      "quan ly phien ban",
      "lich su",
      "source code"
    ],
    "commands": []
  },
  "content": "# Version Control là gì? Nền tảng sống còn của kỹ sư phần mềm\n\n---\n\n## 🎯 Mục tiêu\n- Thấu hiểu bản chất và nỗi đau thực tế mà hệ thống quản lý phiên bản (Version Control) giải quyết trong công việc lập trình.\n- Nhận diện hiểm họa của thói quen đặt tên file thủ công kiểu `final`, `final_v2` trong làm việc nhóm.\n- Phân biệt rạch ròi giữa mã nguồn đang gõ dở trên máy với một mốc lịch sử (Commit) đã được đóng băng an toàn.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Version Control — quản lý phiên bản\n- **Nói dễ hiểu:** Cỗ máy thời gian cho mã nguồn, giúp bạn lưu trữ từng mốc hoàn chỉnh để khi cần có thể xem lại, so sánh sai biệt hoặc quay ngược thời gian mà không sợ mất code.\n- **Ví dụ:** Thầy viết xong tính năng đăng nhập chạy ngon lành, thầy đóng dấu một mốc. Hôm sau táy máy sửa làm hỏng giao diện, thầy chỉ cần mở lịch sử để lấy lại phiên bản chạy tốt hôm qua.\n- **Đừng nhầm:** Git không phải công cụ tự động chụp lại từng phím gõ như Google Docs; bạn phải là người chủ động quyết định thời điểm đóng dấu phiên bản.\n\n### VCS (Version Control System) — hệ thống quản lý phiên bản\n- **Nói dễ hiểu:** Phần mềm chuyên dụng chạy ngầm để ghi chép toàn bộ lịch sử tiến hóa của dự án. Git chính là một VCS hiện đại và phổ biến nhất thế giới hiện nay.\n- **Ví dụ:** Dự án có mười thành viên cùng code, VCS ghi nhận chính xác ai đã sửa dòng code nào, sửa vào lúc mấy giờ và vì mục đích gì.\n- **Đừng nhầm:** VCS không giúp bạn tự sửa bug hay kiểm tra logic thuật toán; nó chỉ quản lý lịch sử và biến động của các tệp tin.\n\n### Commit — mốc đã lưu trong Git\n- **Nói dễ hiểu:** Một tấm ảnh chụp nhanh đóng băng toàn bộ trạng thái dự án tại thời điểm bạn cảm thấy code đã chạy ổn định.\n- **Ví dụ:** Sau khi làm xong giao diện đầu trang, bạn tạo một commit với thông điệp: \"Hoàn thiện giao diện Header chuẩn responsive\".\n- **Đừng nhầm:** Nhấn phím lưu trên trình soạn thảo chỉ là lưu file tạm thời trên ổ cứng, chưa hề tạo ra commit an toàn trong Git.\n\n### History — lịch sử thay đổi\n- **Nói dễ hiểu:** Danh sách toàn bộ các commit được sắp xếp theo trình tự thời gian, tạo thành cuốn nhật ký tiến trình phát triển của cả nhóm.\n- **Ví dụ:** Đọc lại lịch sử commit để biết tính năng giỏ hàng được thêm vào ngày nào và do lập trình viên nào chịu trách nhiệm.\n- **Đừng nhầm:** Những đoạn code bạn mới gõ nhưng chưa lưu thành commit sẽ không bao giờ xuất hiện trong cuốn biên niên sử này.\n\n---\n\n## 🤔 Tại sao cần?\nChắc hẳn các bạn từng trải qua cơn ác mộng đặt tên file đồ án: `baocao_final.docx`, `baocao_final2.docx`, rồi đến `final_chot_nop.docx`. Đến đêm trước hạn nộp, không ai nhớ file nào mới là bản chuẩn! Khi lập trình dự án lớn với nhiều người, cách làm thủ công này chắc chắn gây thảm họa đè code và mất dữ liệu. Version Control ra đời để biến quy trình lưu trữ thành một cỗ máy thời gian: mọi thay đổi đều được ghi lại có danh tính, có lý do rõ ràng, cho phép bạn tự tin thử nghiệm và quay về trạng thái tốt nhất bất cứ lúc nào.\n\n---\n\n## 📖 Định nghĩa\nVersion Control (Quản lý phiên bản) là phương pháp có hệ thống giúp ghi chép và theo dõi sự thay đổi của tập hợp các tệp tin theo thời gian. Phần mềm thực hiện nhiệm vụ này gọi là Version Control System (VCS). Trong Git, mỗi mốc lịch sử hoàn chỉnh được người dùng chủ động đóng gói và ghi nhận gọi là một commit.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng bạn đang chơi một tựa game nhập vai phiêu lưu mạo hiểm. Mỗi khi vượt qua một con Boss khó, bạn phải tìm ngay điểm Checkpoint để bấm nút Save Game. Nếu lát sau chẳng may đi nhầm đường ngã xuống hố gai, bạn chỉ việc tải lại Save Game đó để tiếp tục chơi mà không phải cày lại từ đầu. Commit trong Git chính là những điểm Save Game vô giá ấy!\n\n---\n\n## 🖼 Sơ đồ\n```text\nTrục lịch sử dự án:\n[Commit 1: Dựng khung Web] ───> [Commit 2: Xong đăng nhập] (Điểm Save Game an toàn)\n                                              │\nKhông gian bạn đang gõ code:                 └──> Đang gõ tính năng Giỏ hàng (chưa Save!)\n```\nChỉ những mốc Commit mới được vĩnh viễn bảo vệ trong lịch sử; phần code đang gõ dở vẫn có nguy cơ mất nếu bạn sơ suất.\n\n---\n\n## 🌎 Ví dụ thực tế\nMột nhóm sinh viên làm bài tập lớn môn Lập trình Web. Bạn Tuấn làm xong thanh điều hướng chạy rất mượt và tạo ngay một commit ghi nhận. Sau đó, Tuấn thử nghiệm đổi màu sắc bằng CSS mới nhưng vô tình làm vỡ toàn bộ bố cục trang. Thay vì hoảng loạn nhấn hoàn tác liên tục trong vô vọng, Tuấn chỉ cần ra lệnh cho Git so sánh với commit trước đó để khôi phục lại trạng thái ban đầu trong tích tắc.\n\n---\n\n## 💻 Command\nBài học mở đầu này tập trung rèn luyện tư duy kỹ sư và hiểu rõ bản chất vấn đề. Bạn chưa cần gõ lệnh Git nào; hãy thấm nhuần triết lý quản lý phiên bản trước khi chạm vào bàn phím.\n\n---\n\n## 🔍 Giải thích command\nĐây là bài học nền tảng giúp bạn định hình tư duy quản lý phiên bản đúng đắn của một lập trình viên chuyên nghiệp. Các cú pháp dòng lệnh thực chiến sẽ được hướng dẫn chi tiết ngay từ những bài học kế tiếp.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Ảo tưởng rằng Git tự động lưu mọi lần gõ phím:** Git hoàn toàn thụ động; chỉ khi bạn chủ động ra lệnh tạo commit thì một mốc lịch sử mới được ghi nhận.\n2. **Duy trì thói quen nhân bản file kiểu `code_v1`, `code_v2`:** Đây là cách làm nguy hiểm của người nghiệp dư, gây rối loạn mã nguồn và làm mất khả năng so sánh sai biệt chính xác giữa các phiên bản.\n3. **Nhầm lẫn giữa lưu tệp thông thường với tạo mốc phiên bản (Commit):** Lưu file chỉ ghi đè dữ liệu lên ổ cứng cục bộ; chỉ có commit mới đóng băng lịch sử để bạn có thể quay lại sau này.\n\n---\n\n## 🧪 Lab\nHãy phân tích tình huống thực tế của một nhóm làm đồ án tốt nghiệp: Thư mục dự án đang có ba file `source_final.js`, `source_final_fix.js` và `source_moi_nhat.js`.\n1. Chỉ ra ít nhất hai rủi ro nghiêm trọng mà cách đặt tên thủ công này gây ra cho nhóm.\n2. Nếu áp dụng Git, bạn sẽ đặt tên thông điệp commit như thế nào khi hoàn thành tính năng kết nối cơ sở dữ liệu?\n3. Khi một thành viên lỡ tay xóa nhầm file quan trọng trên máy, lịch sử Git sẽ cứu nguy cho bạn ra sao?\n\n---\n\n## 💡 Hint\nHãy luôn tự đặt ba câu hỏi của một kỹ sư chuyên nghiệp: \"Mốc này đã đủ ổn định để Save Game chưa?\", \"Thông điệp commit của mình đồng đội đọc có hiểu ngay không?\", và \"Đoạn code mình vừa sửa đã thực sự được đóng gói an toàn chưa?\"\n\n---\n\n## ✅ Validation\n- Trình bày được bản chất của Version Control và lý do tại sao nó là kỹ năng sinh tồn của mọi lập trình viên.\n- Phân biệt rạch ròi giữa thao tác lưu file trên trình soạn thảo và việc đóng dấu một commit vào lịch sử Git.\n- Giải thích được cơ chế hoạt động của mô hình Save Game (Mental Model) trong quản lý mã nguồn dự án.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm củng cố kiến thức bên dưới để kiểm tra mức độ thấu hiểu bài giảng. Đọc kỹ phần giải thích chi tiết của giảng viên sau mỗi câu hỏi.\n\n---\n\n## 🔥 Challenge\nHãy thử giải thích cho một người bạn mới học lập trình (chưa từng biết Git) hiểu vì sao việc dùng Git chuyên nghiệp và an toàn gấp trăm lần việc gửi file nén ZIP qua tin nhắn mạng xã hội.\n\n---\n\n## 📚 Tổng kết\n- Version Control là cỗ máy thời gian của kỹ sư phần mềm, giúp lưu lại các mốc lịch sử ổn định để tra cứu, đối chiếu và phục hồi khi có sự cố.\n- Commit là điểm Save Game an toàn do bạn chủ động tạo ra; code chưa commit thì chưa hề nằm trong lịch sử bảo vệ.\n- Xóa bỏ hoàn toàn tư duy nhân bản file thủ công; hãy để Git quản lý toàn bộ tiến trình tiến hóa của mã nguồn một cách khoa học.\n\n",
  "quiz": {
    "id": "quiz-01-version-control",
    "title": "Trắc nghiệm: Version Control là gì?",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích nào mô tả đúng nhất về Version Control?",
        "type": "single",
        "options": [
          {
            "text": "Ghi lại các phiên bản được chọn để xem lại hoặc so sánh về sau",
            "correct": true
          },
          {
            "text": "Tự động lưu mọi ký tự người dùng gõ vào tệp",
            "correct": false
          },
          {
            "text": "Tự gửi tất cả tệp của dự án lên Internet",
            "correct": false
          },
          {
            "text": "Tự tìm và sửa mọi lỗi trong chương trình",
            "correct": false
          }
        ],
        "explanation": "Version Control lưu những mốc người dùng chọn để xem lại và so sánh. Nó không tự lưu từng lần gõ, tải tệp lên mạng hoặc sửa lỗi."
      },
      {
        "id": "q2",
        "question": "Bạn đã lưu một commit khi trang còn chạy tốt, rồi một lần sửa làm trang lỗi. Git giúp gì?",
        "type": "single",
        "options": [
          {
            "text": "Tự nhận ra lỗi và sửa đúng dòng mà không cần bạn kiểm tra",
            "correct": false
          },
          {
            "text": "Cho bạn so sánh thay đổi với commit cũ và lấy lại nội dung cần thiết",
            "correct": true
          },
          {
            "text": "Xóa mọi thay đổi sau commit cũ ngay khi trang báo lỗi",
            "correct": false
          },
          {
            "text": "Chỉ cho xem lịch sử nếu dự án đã được gửi lên Internet",
            "correct": false
          }
        ],
        "explanation": "Commit cũ cho bạn một trạng thái để so sánh hoặc lấy lại nội dung. Git không tự xác định nguyên nhân lỗi hay chọn thay đổi cần khôi phục."
      },
      {
        "id": "q3",
        "question": "Rủi ro nào dễ gặp khi tự tạo nhiều tệp tên `final`, `final-2`, `final-moi-nhat`?",
        "type": "single",
        "options": [
          {
            "text": "Khó biết các tệp khác nhau ở đâu và bản nào đã được kiểm tra",
            "correct": true
          },
          {
            "text": "Hệ điều hành sẽ tự gộp nội dung các tệp thành một bản",
            "correct": false
          },
          {
            "text": "Git sẽ xóa mọi thư mục có chữ `final` trong tên",
            "correct": false
          },
          {
            "text": "Tệp sao chép luôn được lưu thêm trên một thiết bị khác",
            "correct": false
          }
        ],
        "explanation": "Tên tệp chỉ là nhãn do người đặt; chúng không ghi rõ từng khác biệt, người sửa hay lý do thay đổi như một lịch sử có tổ chức."
      },
      {
        "id": "q4",
        "question": "Bạn đã lưu một commit rồi sửa tiếp tệp nhưng chưa lưu mốc mới. Điều nào đúng?",
        "type": "single",
        "options": [
          {
            "text": "Lần sửa mới đã tự xuất hiện trong lịch sử Git",
            "correct": false
          },
          {
            "text": "Lịch sử vẫn có commit cũ; lần sửa mới chưa nằm trong một commit",
            "correct": true
          },
          {
            "text": "Git xóa commit cũ để thay bằng phần đang sửa",
            "correct": false
          },
          {
            "text": "Tệp đang sửa chắc chắn đã bị mất",
            "correct": false
          }
        ],
        "explanation": "Commit ghi lại trạng thái tại lúc bạn lưu nó; sửa sau đó không tự viết lại lịch sử và phần sửa vẫn có thể còn trong tệp hiện tại."
      },
      {
        "id": "q5",
        "question": "Dự án chỉ có một bản Git trên laptop. Nếu laptop hỏng, điều gì cần nhớ?",
        "type": "single",
        "options": [
          {
            "text": "Git tự tạo thêm một bản đầy đủ trên Internet",
            "correct": false
          },
          {
            "text": "Lịch sử trên laptop cũng có thể mất; cần có bản sao ở nơi khác",
            "correct": true
          },
          {
            "text": "Mọi commit đã lưu đều tự chuyển sang máy của bạn cùng nhóm",
            "correct": false
          },
          {
            "text": "Không thể dùng Git nếu chưa mua dịch vụ sao lưu",
            "correct": false
          }
        ],
        "explanation": "Repository Git chỉ có trên một thiết bị không bảo vệ khỏi hỏng thiết bị. Muốn có bản dự phòng, bạn cần sao chép dữ liệu sang một nơi khác."
      }
    ]
  }
};
export default lesson;
