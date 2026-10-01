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
  "content": "# Protected Branch\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.\n- Nhận diện các mối nguy hiểm bị loại bỏ hoàn toàn bởi Protected Branch: xóa nhầm nhánh, force push đè lịch sử, push trực tiếp code lỗi.\n- Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.\n- Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Protected Branch (Nhánh được bảo vệ)\n- **Nói dễ hiểu**: Thiết lập an ninh trên server (GitHub/GitLab) nhằm chặn đứng push trực tiếp, force push và xóa nhánh quan trọng.\n- **Ví dụ**: Bảo vệ nhánh `main` để không ai có thể vô tình xóa hoặc ghi đè lịch sử của dự án.\n- **Đừng nhầm**: Đây là tính năng do máy chủ từ xa quản lý, không phải là câu lệnh chạy ở máy Git cục bộ.\n\n### Direct Push Prevention\n- **Nói dễ hiểu**: Cơ chế từ chối mọi lệnh `git push` trực tiếp lên nhánh, bắt buộc mã nguồn phải đi qua Pull Request.\n- **Ví dụ**: Lập trình viên gõ `git push origin main` thì terminal báo lỗi từ chối ngay lập tức vì nhánh đã được bảo vệ.\n- **Đừng nhầm**: Không có nghĩa là nhánh bị khóa chết; bạn vẫn có thể merge code vào thông qua Pull Request được duyệt.\n\n### Force Push Protection\n- **Nói dễ hiểu**: Rào chắn cấm vĩnh viễn việc dùng cờ `--force` để ghi đè lịch sử commit trên các nhánh dùng chung.\n- **Ví dụ**: Ngăn chặn việc ai đó lỡ tay chạy `git push --force` làm mất các commit quan trọng của toàn bộ đồng nghiệp.\n- **Đừng nhầm**: Ngay cả khi bạn có quyền admin, việc cho phép bypass force push cũng tiềm ẩn nguy cơ phá hủy dữ liệu.\n\n---\n\n## 📖 Định nghĩa\nProtected Branch (Nhánh được bảo vệ) là cơ chế kiểm soát an ninh do các nền tảng Git từ xa cung cấp nhằm áp đặt các ràng buộc chặt chẽ lên các nhánh trọng yếu: cấm push trực tiếp, cấm xóa nhánh và vô hiệu hóa hoàn toàn thao tác force-push.\n\n---\n\n## 💡 Tại sao cần\nChỉ một sơ suất gõ nhầm `git push --force origin main` hoặc vô tình xóa nhánh chính, công sức cả đội ngũ có thể bị phá hủy. Protected Branch là lá chắn thép bảo vệ tài sản số khỏi sai sót con người và bảo đảm mã nguồn luôn được kiểm duyệt trước khi vào main.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung cửa kho tiền trung tâm ngân hàng. Cửa kho không bao giờ để mở toang cho nhân viên tự do ném tiền vào hay rút tiền ra. Cửa luôn khóa kiên cố. Muốn gửi hay rút tiền đều phải làm thủ tục qua quầy giao dịch, có biên lai và kiểm soát viên duyệt mới được chuyển vào.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nCơ chế phòng thủ của Protected Branch trên GitHub:\nDev cố tình gõ: git push origin main\n                │\n                ▼\n        ┌───────────────────────────────┐\n        │  GitHub Branch Protection     │\n        │  [X] Direct push disabled!    │ ──► TỪ CHỐI (Remote rejected!)\n        │  [X] Force push disabled!     │\n        └───────────────────────────────┘\n                ▲\n                │ Chỉ cho phép đi qua con đường duy nhất:\n        [Pull Request ──► Code Review ──► CI Pass ──► Merge]\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư mới gia nhập lỡ tay gõ `git push --force origin main` sau một thao tác rebase nhầm. Nhờ nhánh main đã được bảo vệ, GitHub từ chối lệnh ngay lập tức và in lỗi: \"Protected branch update failed. Cannot force-push\". Lịch sử của cả công ty được giữ an toàn tuyệt đối.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit push origin main\ngit push origin --delete main\ngit push --force origin main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git push origin main`: Thao tác bị chặn đứng bởi Protected Branch nếu chưa qua Pull Request.\n- `git push origin --delete`: Bị từ chối tuyệt đối nhằm ngăn chặn rủi ro vô tình xóa mất nhánh chính.\n- `git push --force`: Bị vô hiệu hóa hoàn toàn để bảo vệ tính toàn vẹn của lịch sử commit.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên kích hoạt bảo vệ**: Không bật Protected Branch ngay khi vừa tạo repo khiến nhánh chính dễ bị ghi đè.\n2. **Cấp quyền miễn trừ (Bypass) tùy tiện**: Cho phép quá nhiều tài khoản được bypass làm mất đi tác dụng bảo vệ an ninh.\n3. **Bỏ quên các nhánh dài hạn khác**: Chỉ bảo vệ mỗi `main` mà bỏ qua các nhánh quan trọng như `develop` hay `staging`.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Truy cập vào mục Settings -> Branches trên một repository GitHub thử nghiệm.\n2. Kích hoạt quy tắc bảo vệ nhánh cho nhánh `main`.\n3. Thử thực hiện lệnh `git push origin main` trực tiếp từ terminal máy cá nhân.\n4. Quan sát thông báo từ chối từ GitHub và kiểm tra các điều kiện mở khóa.\n\n---\n\n## 💡 Hint & mẹo\n> Bảo vệ nhánh là việc đầu tiên kỹ sư trưởng phải làm ngay sau khi gõ git init và push commit đầu tiên lên kho lưu trữ từ xa.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Không ai có thể xóa hoặc force push vào nhánh chính đã được bảo vệ.\n- Mọi thay đổi vào nhánh bảo vệ đều phải đi qua cổng kiểm duyệt Pull Request.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây về tính năng Protected Branch.\n\n---\n\n## 🚀 Thử thách nâng cao\nPhân tích các nguy cơ tiềm ẩn nếu một dự án cho phép các tài khoản Administrator tự do bypass các quy tắc bảo vệ nhánh.\n\n---\n\n## 📝 Tổng kết\n- Protected Branch là tấm khiên an ninh bảo vệ nhánh chính khỏi phá hủy và ghi đè lịch sử.\n- Chặn push trực tiếp, cấm force-push và cấm xóa nhánh.\n- Bắt buộc mọi thay đổi mã nguồn phải thông qua quy trình Pull Request chuẩn mực.\n",
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
            "text": "Ngăn chặn việc commit/push trực tiếp, cấm force-push và cấm xóa các nhánh trọng yếu của dự án",
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
        "explanation": "Protected Branch là lá chắn bảo vệ an ninh mã nguồn, ngăn chặn các thao tác phá hủy vô ý hoặc cố ý lên các nhánh quan trọng."
      },
      {
        "id": "q2",
        "question": "Điều gì sẽ xảy ra khi một lập trình viên cố tình thực hiện `git push --force origin main` lên nhánh đã được bảo vệ?",
        "type": "single",
        "options": [
          {
            "text": "Máy chủ Git từ xa sẽ từ chối lệnh và thông báo lỗi Protected branch update failed",
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
        "explanation": "Protected Branch mặc định cấm hoàn toàn thao tác force-push nhằm bảo vệ lịch sử commit không bị viết lại."
      },
      {
        "id": "q3",
        "question": "Con đường hợp lệ DUY NHẤT để đưa mã nguồn mới vào một nhánh đã được cấu hình Protected Branch là gì?",
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
        "explanation": "Pull Request là cổng kiểm soát duy nhất cho phép mã nguồn được xem xét, kiểm thử và hợp nhất an toàn vào nhánh bảo vệ."
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
            "text": "Áp dụng các quy tắc bảo vệ bình đẳng lên tất cả mọi người, kể cả Quản trị viên (Administrators)",
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
        "explanation": "Tùy chọn này bảo đảm nguyên tắc công bằng: không một cá nhân nào kể cả sếp hay admin được quyền phá vỡ quy trình an toàn chung."
      },
      {
        "id": "q6",
        "question": "Ngoài nhánh `main`, những nhánh nào sau đây cũng thường xuyên được thiết lập là Protected Branch?",
        "type": "single",
        "options": [
          {
            "text": "Các nhánh vĩnh cửu như develop, staging và các nhánh phát hành production",
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
        "explanation": "Mọi nhánh đại diện cho môi trường vận hành thực tế hoặc môi trường tích hợp chung đều cần được bảo vệ cẩn mật."
      }
    ]
  }
};
export default lesson;
