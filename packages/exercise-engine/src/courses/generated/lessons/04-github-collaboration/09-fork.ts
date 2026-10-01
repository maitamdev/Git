import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-fork",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "09-fork",
    "title": "Cơ chế Fork trên GitHub",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "04-git-clone"
    ],
    "objectives": [
      "Hiểu rõ bản chất cơ chế Fork trên máy chủ GitHub như một bản sao phía server.",
      "Phân biệt rõ ràng giữa thao tác Fork (trên GitHub) và thao tác Clone (về máy cá nhân).",
      "Nắm bắt quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình Fork & Pull Request.",
      "Quản lý và đồng bộ kho fork cá nhân với kho gốc của dự án."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "fork",
      "github fork",
      "sao chep kho",
      "dong gop ma nguon mo",
      "upstream",
      "open source"
    ],
    "commands": [
      "git clone <url-kho-fork-cua-ban>",
      "git remote -v",
      "git remote add upstream <url-kho-goc>"
    ]
  },
  "content": "# Cơ chế Fork trên GitHub\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ bản chất cơ chế Fork trên máy chủ GitHub như một bản sao phía server.\n- Phân biệt rõ ràng giữa thao tác Fork (trên GitHub) và thao tác Clone (về máy cá nhân).\n- Nắm bắt quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình Fork & Pull Request.\n- Quản lý và đồng bộ kho fork cá nhân với kho gốc của dự án.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### fork\n- **Nói dễ hiểu**: Thao tác tạo một bản sao độc lập của dự án người khác vào tài khoản GitHub cá nhân của bạn.\n- **Ví dụ**: Bấm nút \"Fork\" trên repo `facebook/react` để có một bản `your-username/react`.\n- **Đừng nhầm**: Không phải là câu lệnh gõ trong terminal; đây là tính năng trên nền tảng web GitHub.\n\n### server-side clone\n- **Nói dễ hiểu**: Quá trình nhân bản diễn ra hoàn toàn giữa các máy chủ đám mây của GitHub mà không qua máy bạn.\n- **Ví dụ**: GitHub sao chép repo gốc sang tài khoản của bạn chỉ trong vài giây trên máy chủ.\n- **Đừng nhầm**: Khác với `git clone` vốn tải toàn bộ dữ liệu từ đám mây về ổ đĩa máy tính cá nhân.\n\n### open source contribution\n- **Nói dễ hiểu**: Quy trình đóng góp code cho các dự án cộng đồng bằng cách fork, sửa code và gửi Pull Request.\n- **Ví dụ**: Sửa một lỗi trong thư viện nguồn mở và gửi PR mời tác giả tích hợp vào dự án chính.\n- **Đừng nhầm**: Bạn không cần xin quyền truy cập ghi trực tiếp vào kho của tác giả để bắt đầu đóng góp.\n\n---\n\n## 📖 Định nghĩa\nFork trên GitHub là thao tác nhân bản phía máy chủ (server-side clone), tạo ra một bản sao độc lập hoàn chỉnh của kho lưu trữ người khác vào tài khoản cá nhân của bạn. Bạn có toàn quyền ghi vào bản sao này để sửa lỗi hay thêm tính năng mà không ảnh hưởng tới dự án gốc.\n\n---\n\n## 💡 Tại sao cần\nTrong các dự án mã nguồn mở, bạn không có quyền push trực tiếp vào kho nguồn vì lý do an toàn. Cơ chế Fork giúp bất kỳ ai cũng có thể tham gia cải tiến mã nguồn, thử nghiệm ý tưởng mới và gửi thành quả lại cho tác giả ban đầu thông qua Pull Request.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung công thức phở gia truyền niêm yết trong tủ kính nhà hàng (dự án gốc). Bạn không thể mở tủ kính lấy bút viết thêm vào công thức. Nhà hàng cho phép bạn chụp lại toàn bộ công thức mang về bếp nhà mình (Fork). Tại bếp nhà, bạn tự do nêm nếm và nếu ngon có thể gửi thư mời bếp trưởng nếm thử (Pull Request).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình Fork trên GitHub:\n[Kho gốc: upstream] (facebook/react)\n        │\n        ▼ (Thao tác Fork trên GitHub web)\n[Kho cá nhân: origin] (your-account/react)\n        │\n        ▼ (git clone về máy cá nhân)\n[Máy tính của bạn: Local] (lập trình, commit & push lên your-account/react)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nLập trình viên Bình phát hiện lỗi chính tả trong tài liệu của một thư viện nổi tiếng. Vì không có quyền commit trực tiếp, Bình bấm nút \"Fork\" trên GitHub để tạo bản sao `github.com/binh-dev/famous-lib`. Bình clone kho fork về máy, sửa lỗi, commit rồi push lên fork cá nhân và mở Pull Request gửi về cho ban quản trị dự án phê duyệt.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit clone <url-kho-fork-cua-ban>\ngit remote -v\ngit remote add upstream <url-kho-goc>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git clone <url-kho-fork>`: Tải bản sao từ tài khoản cá nhân của bạn về máy tính để lập trình.\n- `git remote -v`: Kiểm tra liên kết remote origin trỏ về kho fork cá nhân.\n- `git remote add upstream <url-kho-goc>`: Thiết lập thêm liên kết tới kho gốc của tác giả để đồng bộ các cập nhật mới sau này.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Fork là lệnh trong terminal**: Fork là tính năng trên giao diện nền tảng web như GitHub hoặc GitLab, không phải lệnh CLI.\n2. **Clone trực tiếp kho gốc rồi push**: Sẽ bị lỗi `Permission denied` vì bạn không có quyền ghi vào kho của người khác.\n3. **Để kho fork bị lỗi thời lâu ngày**: Quên đồng bộ với kho gốc khiến các Pull Request gửi đi sau này dễ bị xung đột phức tạp.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thực hành thao tác fork trên giao diện GitHub và clone về máy cá nhân.\n1. Mở trang web GitHub của dự án mẫu và nhấn nút `Fork`.\n2. Sao chép URL của kho fork trên tài khoản cá nhân của bạn.\n3. Mở terminal và thực thi `git clone` kho fork về máy tính.\n4. Chạy `git remote -v` để xác nhận origin trỏ đúng vào tài khoản của bạn.\n\n---\n\n## 💡 Hint & mẹo\n> Ghi nhớ quy trình 5 bước: Fork trên web -> Clone về máy -> Code & commit -> Push lên fork -> Mở Pull Request.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Bản sao kho lưu trữ xuất hiện trên tài khoản GitHub cá nhân của bạn.\n- Kho trên máy tính có remote origin trỏ về kho fork cá nhân.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về cơ chế Fork trên GitHub.\n\n---\n\n## 🚀 Thử thách nâng cao\nKhám phá tính năng \"Sync fork\" ngay trên giao diện web của GitHub để cập nhật các commit mới từ kho gốc về fork cá nhân chỉ với một cú nhấp chuột.\n\n---\n\n## 📝 Tổng kết\n- Fork tạo bản sao kho từ xa trên GitHub về tài khoản cá nhân của bạn.\n- Cung cấp toàn quyền chỉnh sửa và thử nghiệm mà không ảnh hưởng tới kho gốc.\n- Là nền tảng cốt lõi của quy trình đóng góp mã nguồn mở trên toàn cầu.\n",
  "quiz": {
    "id": "quiz-04-09-fork",
    "title": "Trắc nghiệm: Cơ chế Fork trên GitHub",
    "questions": [
      {
        "id": "q1",
        "question": "Thao tác \"Fork\" trong hệ sinh thái GitHub thực chất là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo một bản sao độc lập của kho lưu trữ người khác vào tài khoản GitHub của chính bạn ở phía máy chủ",
            "correct": true
          },
          {
            "text": "Một câu lệnh gõ trong terminal shell của máy tính cá nhân",
            "correct": false
          },
          {
            "text": "Xóa bỏ vĩnh viễn dự án của tác giả ban đầu",
            "correct": false
          },
          {
            "text": "Tải toàn bộ mã nguồn về ổ đĩa cứng dưới dạng file Word",
            "correct": false
          }
        ],
        "explanation": "Fork là thao tác server-side clone do GitHub cung cấp, tạo bản sao kho trên máy chủ thuộc quyền sở hữu của bạn."
      },
      {
        "id": "q2",
        "question": "Tại sao các dự án mã nguồn mở lại yêu cầu cộng đồng lập trình viên phải Fork dự án trước khi đóng góp?",
        "type": "single",
        "options": [
          {
            "text": "Để bảo vệ an ninh dự án, chỉ những người bảo trì chính mới có quyền ghi trực tiếp vào kho nguồn gốc",
            "correct": true
          },
          {
            "text": "Vì GitHub giới hạn mỗi dự án chỉ được có tối đa 3 lập trình viên",
            "correct": false
          },
          {
            "text": "Vì nếu không fork thì mã nguồn sẽ tự động bị mã hóa biến mất",
            "correct": false
          },
          {
            "text": "Vì fork giúp máy tính của tác giả chạy nhanh hơn",
            "correct": false
          }
        ],
        "explanation": "Fork cho phép bất kỳ ai cũng đóng góp được mà không cần cấp quyền push trực tiếp vào kho mã nguồn nhạy cảm."
      },
      {
        "id": "q3",
        "question": "Sau khi đã Fork một dự án trên giao diện web của GitHub, bước tiếp theo bạn cần làm để bắt đầu viết code là gì?",
        "type": "single",
        "options": [
          {
            "text": "Clone kho fork từ tài khoản cá nhân của bạn về máy tính bằng lệnh `git clone`",
            "correct": true
          },
          {
            "text": "Chạy lệnh git push ngay lập tức khi chưa có code",
            "correct": false
          },
          {
            "text": "Xóa tài khoản GitHub vừa tạo",
            "correct": false
          },
          {
            "text": "Tắt màn hình máy tính và chờ đợi tác giả gửi mã nguồn qua email",
            "correct": false
          }
        ],
        "explanation": "Bạn clone kho fork của mình về máy tính, khi đó remote origin sẽ trỏ vào kho bạn có quyền push."
      },
      {
        "id": "q4",
        "question": "Mối quan hệ giữa kho gốc (upstream) và kho bạn vừa Fork về tài khoản cá nhân là như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Hai kho hoàn toàn độc lập, mọi sửa đổi trên kho fork không làm ảnh hưởng gì tới kho gốc trừ khi tác giả chấp nhận Pull Request",
            "correct": true
          },
          {
            "text": "Bất kỳ dòng code nào bạn gõ trên máy cá nhân sẽ tự động xuất hiện trên kho gốc ngay lập tức",
            "correct": false
          },
          {
            "text": "Kho gốc sẽ tự động bị biến mất sau 30 ngày",
            "correct": false
          },
          {
            "text": "Hai kho bị khóa quyền truy cập của tất cả mọi người",
            "correct": false
          }
        ],
        "explanation": "Kho fork là không gian an toàn biệt lập 100%; tác giả kho gốc chỉ nhận code khi duyệt Pull Request."
      },
      {
        "id": "q5",
        "question": "Khi thực hiện Fork trên GitHub, bạn có thể chọn sao chép những nhánh nào sang tài khoản của mình?",
        "type": "single",
        "options": [
          {
            "text": "Mặc định GitHub chỉ sao chép nhánh chính (default branch), hoặc bạn có thể bỏ chọn để sao chép tất cả các nhánh",
            "correct": true
          },
          {
            "text": "Bắt buộc phải sao chép toàn bộ các nhánh mà không có lựa chọn nào khác",
            "correct": false
          },
          {
            "text": "Chỉ được phép sao chép các nhánh đã được gộp (merged branches)",
            "correct": false
          },
          {
            "text": "Không có nhánh nào được chép sang, bạn phải tự tạo lại từng nhánh từ đầu",
            "correct": false
          }
        ],
        "explanation": "Trên giao diện Fork của GitHub, tùy chọn 'Copy the default branch only' được bật mặc định, cho phép linh hoạt chọn copy một hay toàn bộ nhánh."
      }
    ]
  }
};
export default lesson;
