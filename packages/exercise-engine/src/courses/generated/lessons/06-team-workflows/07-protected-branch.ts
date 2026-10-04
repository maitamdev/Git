import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "07-protected-branch",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "07-protected-branch",
    "title": "Protected Branch",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "06-workflow-comparison"
    ],
    "objectives": [
      "Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.",
      "Nhận diện các mối nguy hiểm bị loại bỏ hoàn toàn bởi Protected Branch: xóa nhầm nhánh, force push đè lịch sử, push trực tiếp code lỗi.",
      "Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.",
      "Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "protected branch",
      "bao ve nhanh",
      "khoa nhanh main",
      "force push prevention",
      "chan push direct",
      "security policy"
    ],
    "commands": [
      "git push origin main",
      "git push origin --delete main",
      "git push --force origin main"
    ]
  },
  "content": "# Protected Branch\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.\n- Biết những thao tác có thể bị chặn khi quy tắc bảo vệ tương ứng được bật.\n- Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.\n- Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Protected Branch (Nhánh được bảo vệ)\n- **Nói dễ hiểu**: Các quy tắc trên máy chủ Git có thể giới hạn ai được cập nhật nhánh, yêu cầu Pull Request hoặc chặn force push và xóa nhánh.\n- **Ví dụ**: Bảo vệ nhánh `main` để không ai có thể vô tình xóa hoặc ghi đè lịch sử của dự án.\n- **Đừng nhầm**: Tạo một quy tắc bảo vệ không đồng nghĩa mọi thao tác đều bị chặn; kết quả phụ thuộc các lựa chọn trong quy tắc và quyền bypass.\n\n### Direct Push Prevention\n- **Nói dễ hiểu**: Cơ chế từ chối cập nhật trực tiếp khi quy tắc yêu cầu Pull Request hoặc giới hạn người được push.\n- **Ví dụ**: Lập trình viên gõ `git push origin main` thì terminal báo lỗi từ chối ngay lập tức vì nhánh đã được bảo vệ.\n- **Đừng nhầm**: Nếu không bật điều kiện yêu cầu Pull Request hay giới hạn push, một lần push thường vẫn có thể được chấp nhận.\n\n### Force Push Protection\n- **Nói dễ hiểu**: GitHub chặn force push lên nhánh được bảo vệ theo mặc định; người có quyền bypass hoặc cấu hình ngoại lệ có thể thay đổi kết quả.\n- **Ví dụ**: Ngăn chặn việc ai đó lỡ tay chạy `git push --force` làm mất các commit quan trọng của toàn bộ đồng nghiệp.\n- **Đừng nhầm**: Ngay cả khi bạn có quyền admin, việc cho phép bypass force push cũng tiềm ẩn nguy cơ phá hủy dữ liệu.\n\n---\n\n## 📖 Định nghĩa\nProtected Branch là nhánh trên máy chủ được áp dụng một hoặc nhiều quy tắc bảo vệ. Tùy cấu hình, quy tắc có thể yêu cầu Pull Request, lượt duyệt hoặc status check, đồng thời chặn force push hay xóa nhánh. Quy tắc không tự quyết định ai được bypass; điều đó còn phụ thuộc quyền và cấu hình của repository.\n\n---\n\n## 🤔 Tại sao cần?\nQuy tắc bảo vệ giúp nhóm giảm rủi ro cập nhật nhầm nhánh hoặc bỏ qua bước review đã thống nhất. Nó không thay thế backup, kiểm thử hay phân quyền phù hợp; cấu hình quá rộng hoặc quyền bypass vẫn có thể cho phép thay đổi không mong muốn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung một cổng có nhiều chốt: nhóm chọn chốt nào cần dùng, chẳng hạn yêu cầu phiếu duyệt hoặc chặn ghi đè lịch sử. Một số chốt có mặc định riêng, nhưng quyền quản trị và cấu hình ngoại lệ vẫn ảnh hưởng kết quả.\n\n---\n\n## 🖼 Sơ đồ\n```text\nVí dụ khi cấu hình yêu cầu Pull Request và không cấp ngoại lệ:\nDev gõ: git push origin main\n                │\n                ▼\n        ┌───────────────────────────────┐\n        │  GitHub Branch Protection     │\n        │  [X] Yêu cầu Pull Request     │ ──► TỪ CHỐI (nếu người push không được bypass)\n        │  [X] Chặn force push (mặc định)│\n        └───────────────────────────────┘\n                ▲\n                │ Nếu rule yêu cầu PR:\n        [Pull Request ──► Review/checks đã cấu hình ──► Merge]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong môi trường phát triển dự án thực tế: repository bật quy tắc yêu cầu Pull Request và chặn force push, đồng thời tài khoản của kỹ sư không nằm trong danh sách bypass. Khi kỹ sư thử cập nhật trực tiếp `main`, máy chủ từ chối; thông báo cụ thể phụ thuộc nền tảng và cấu hình.\n\n---\n\n## 💻 Command\n```bash\ngit push origin main\n# Hai lệnh sau có thể bị từ chối bởi quy tắc tương ứng; không chạy trên repo thật\ngit push origin --delete main\ngit push --force origin main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git push origin main`: Bị từ chối nếu quy tắc yêu cầu Pull Request/giới hạn push và bạn không được bypass; cấu hình khác có thể vẫn cho phép.\n- `git push origin --delete main`: Bị từ chối khi nhánh được bảo vệ và chính sách không cho phép xóa.\n- `git push --force origin main`: Bị chặn mặc định trên nhánh được bảo vệ; có thể được bật lại cho người có quyền theo cấu hình.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho rằng có bảo vệ là không ai push được**: Quy tắc mặc định chặn force push/xóa nhánh, còn push thường phụ thuộc PR requirement và hạn chế quyền.\n2. **Cấp quyền miễn trừ (Bypass) tùy tiện**: Cho phép quá nhiều tài khoản được bypass làm mất đi tác dụng bảo vệ an ninh.\n3. **Bỏ quên các nhánh dài hạn khác**: Chỉ bảo vệ mỗi `main` mà bỏ qua các nhánh quan trọng như `develop` hay `staging`.\n\n---\n\n## 🧪 Lab\nHãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:\n1. Dùng repository thử nghiệm mà bạn quản lý; không thử lệnh xóa hoặc force push trên dự án thật.\n2. Mở **Settings → Branches**, tạo quy tắc cho `main` và bật **Require a pull request before merging**.\n3. Nếu có tài khoản cộng tác viên thử nghiệm, thử push một commit lên `main`; nếu không, chỉ xem cấu hình và mô phỏng kết quả.\n4. Mở PR thử nghiệm, ghi lại điều kiện còn thiếu và cách quy tắc cho phép merge.\n\n---\n\n## 💡 Hint\n> Trước khi bật quy tắc cho repo đang dùng, kiểm tra xem ai có quyền bypass và các điều kiện bắt buộc có phù hợp với quy trình của nhóm không.\n\n---\n\n## ✅ Validation\n- Chỉ ra được từng quy tắc đang bật và ai có thể bypass.\n- Với cấu hình yêu cầu PR, giải thích được vì sao push trực tiếp bị từ chối và điều kiện nào mở khóa việc merge.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về tính năng Protected Branch.\n\n---\n\n## 🔥 Challenge\nPhân tích các nguy cơ tiềm ẩn nếu một dự án cho phép các tài khoản Administrator tự do bypass các quy tắc bảo vệ nhánh.\n\n---\n\n## 📚 Tổng kết\n- Protected Branch là tên gọi cho nhánh có một hoặc nhiều quy tắc bảo vệ.\n- Push trực tiếp, force push, xóa nhánh, review và status check được điều khiển bởi các quy tắc riêng.\n- Quyền bypass và cấu hình repository ảnh hưởng đến kết quả thực tế.\n",
  "quiz": {
    "id": "quiz-06-07-protected-branch",
    "title": "Trắc nghiệm: Protected Branch",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích chính quan trọng nhất của việc kích hoạt Protected Branch là gì?",
        "type": "single",
        "options": [
          {
            "text": "Áp dụng những điều kiện đã cấu hình cho nhánh, như yêu cầu PR hoặc chặn force push/xóa nhánh",
            "correct": true
          },
          {
            "text": "Tự động tăng tốc độ mạng Internet khi tải mã nguồn",
            "correct": false
          },
          {
            "text": "Mã hóa toàn bộ mã nguồn để không ai đọc được nữa",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ các tệp tin không phải là code JavaScript",
            "correct": false
          }
        ],
        "explanation": "Nhánh được bảo vệ chỉ thực thi các điều kiện đã bật; điều kiện và quyền bypass quyết định thao tác nào bị chặn."
      },
      {
        "id": "q2",
        "question": "Điều gì thường xảy ra khi tài khoản không có quyền bypass chạy `git push --force origin main` lên nhánh được bảo vệ?",
        "type": "single",
        "options": [
          {
            "text": "Máy chủ từ chối nếu rule đang chặn force push; thông báo tùy nền tảng",
            "correct": true
          },
          {
            "text": "Lệnh sẽ thành công và ghi đè lịch sử bình thường",
            "correct": false
          },
          {
            "text": "Máy tính của lập trình viên sẽ tự động khởi động lại",
            "correct": false
          },
          {
            "text": "GitHub sẽ xóa tài khoản cá nhân của lập trình viên đó ngay lập tức",
            "correct": false
          }
        ],
        "explanation": "Rule bảo vệ thường chặn force push; người có quyền bypass hoặc cấu hình ngoại lệ có thể thay đổi kết quả."
      },
      {
        "id": "q3",
        "question": "Nếu rule của nhánh yêu cầu Pull Request và bạn không thuộc nhóm bypass, cách cập nhật nhánh nào đáp ứng điều kiện đó?",
        "type": "single",
        "options": [
          {
            "text": "Tạo nhánh tính năng, đẩy lên remote và mở Pull Request để kiểm duyệt trước khi hợp nhất",
            "correct": true
          },
          {
            "text": "Commit trực tiếp vào nhánh đó bằng cờ --admin",
            "correct": false
          },
          {
            "text": "Gửi email chứa tệp zip cho nhân viên hỗ trợ của GitHub",
            "correct": false
          },
          {
            "text": "Tải code lên Google Drive rồi dẫn link vào README",
            "correct": false
          }
        ],
        "explanation": "Khi bật yêu cầu PR, cần mở PR và thỏa các điều kiện đã đặt trước khi merge; một cấu hình khác có thể cho phép cách cập nhật khác."
      },
      {
        "id": "q4",
        "question": "Ai là người có quyền cấu hình bật/tắt hoặc chỉnh sửa các quy tắc Protected Branch trên GitHub Repository?",
        "type": "single",
        "options": [
          {
            "text": "Chủ sở hữu kho lưu trữ (Owner) hoặc người dùng có quyền Quản trị viên (Admin)",
            "correct": true
          },
          {
            "text": "Bất kỳ người dùng nào có quyền xem (Read access)",
            "correct": false
          },
          {
            "text": "Tất cả mọi người dùng trên Internet",
            "correct": false
          },
          {
            "text": "Chỉ có kỹ sư của công ty Microsoft",
            "correct": false
          }
        ],
        "explanation": "Chỉ có cấp quyền Admin hoặc Repository Owner mới có thẩm quyền thiết lập các chính sách an ninh chi phối toàn bộ dự án."
      },
      {
        "id": "q5",
        "question": "Lựa chọn \"Do not allow bypassing the above settings\" trong cài đặt Protected Branch có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Không cho các tài khoản thuộc diện quản trị bỏ qua những điều kiện bảo vệ đã bật",
            "correct": true
          },
          {
            "text": "Cho phép bất kỳ ai cũng có thể ghi đè quy tắc",
            "correct": false
          },
          {
            "text": "Tắt toàn bộ hệ thống kiểm tra an ninh",
            "correct": false
          },
          {
            "text": "Tự động cấp quyền quản trị cho tất cả các commit mới",
            "correct": false
          }
        ],
        "explanation": "Khi bật tùy chọn này, các quản trị viên thuộc phạm vi áp dụng cũng phải tuân theo điều kiện; hãy kiểm tra ngoại lệ và quyền bypass trong cấu hình cụ thể."
      },
      {
        "id": "q6",
        "question": "Ngoài nhánh `main`, những nhánh nào sau đây cũng thường xuyên được thiết lập là Protected Branch?",
        "type": "single",
        "options": [
          {
            "text": "Nhánh dùng chung hoặc nhánh phát hành mà nhóm muốn áp dụng quy tắc bảo vệ",
            "correct": true
          },
          {
            "text": "Các nhánh thử nghiệm ngắn hạn do lập trình viên thực tập tạo ra",
            "correct": false
          },
          {
            "text": "Tất cả các nhánh feature ngắn hạn trong dự án",
            "correct": false
          },
          {
            "text": "Các nhánh đã bị xóa trong thùng rác",
            "correct": false
          }
        ],
        "explanation": "Nhóm chọn các nhánh cần bảo vệ theo quy trình; không phải nhánh dùng chung nào cũng nhất thiết cần cùng một bộ rule."
      }
    ]
  }
};
export default lesson;
