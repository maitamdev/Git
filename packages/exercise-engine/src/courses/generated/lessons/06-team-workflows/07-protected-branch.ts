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
  "content": "# Protected Branch\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.\n- Nhận diện các mối nguy hiểm bị loại bỏ hoàn toàn bởi Protected Branch: xóa nhầm nhánh, force push đè lịch sử, push trực tiếp code lỗi.\n- Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.\n- Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub.\n\n---\n\n## 📖 Định nghĩa\n> Protected Branch (Nhánh được bảo vệ) là một cơ chế kiểm soát an ninh và phân quyền do các nền tảng lưu trữ Git đám mây (như GitHub, GitLab, Bitbucket) cung cấp nhằm áp đặt các ràng buộc nghiêm ngặt lên một hoặc nhiều nhánh quan trọng (thường là `main`, `master`, hoặc `production`). Khi một nhánh được thiết lập trạng thái Protected, không một ai — kể cả lập trình viên có quyền ghi mã nguồn — có thể tùy tiện đẩy code trực tiếp, xóa nhánh hoặc thực hiện thao tác force push làm biến đổi lịch sử nếu chưa thỏa mãn các điều kiện quy định.\n\n---\n\n## 🤔 Tại sao cần?\nChỉ cần một lập trình viên gõ nhầm câu lệnh `git push origin main --force` hoặc vô tình ấn xóa nhánh chính trên giao diện đồ họa, toàn bộ công sức của cả công ty có thể biến mất trong chớp mắt, gây gián đoạn dây chuyền triển khai và làm gián đoạn dịch vụ của khách hàng. Protected Branch là lá chắn thép bảo vệ tài sản số của doanh nghiệp khỏi cả những sơ suất vô ý của con người lẫn các hành vi can thiệp trái phép, bảo đảm quy trình phát triển luôn tuân thủ đúng chuẩn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung kho tiền trung tâm của một ngân hàng quốc gia. Cửa kho tiền không thể để mở toang cho bất kỳ nhân viên nào tự do ra vào ném tiền vào hay mang tiền ra tùy ý (`direct push`). Thay vào đó, cửa kho tiền luôn được khóa kiên cố (`Protected Branch`). Mọi khoản tiền gửi hay rút đều phải qua quầy giao dịch làm thủ tục, có biên lai rõ ràng (`Pull Request`) và phải có chữ ký phê duyệt của kiểm soát viên trưởng mới được phép chuyển vào bên trong.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế phòng thủ của Protected Branch trên GitHub:\nDev cố tình gõ: git push origin main\n                │\n                ▼\n        ┌───────────────────────────────┐\n        │  GitHub Branch Protection     │\n        │  [X] Direct push disabled!    │ ──► TỪ CHỐI (Remote rejected!)\n        │  [X] Force push disabled!     │\n        └───────────────────────────────┘\n                ▲\n                │ Chỉ cho phép đi qua con đường duy nhất:\n        [Pull Request ──► Code Review ──► CI Pass ──► Merge]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư mới gia nhập dự án trong lúc bối rối đã gõ nhầm câu lệnh `git push --force origin main` từ máy cá nhân sau một thao tác rebase lỗi. Nếu là kho lưu trữ thông thường, lịch sử commit của cả dự án sẽ bị ghi đè hoàn toàn. Nhưng nhờ nhánh `main` đã được cấu hình Protected Branch từ trước, terminal của kỹ sư lập tức bật ra thông báo lỗi từ chối dứt khoát: \"remote: error: GH006: Protected branch update failed for refs/heads/main. Cannot force-push to a protected branch\". Kỹ sư thở phào nhẹ nhõm vì hệ thống phòng thủ đã cứu kho lưu trữ khỏi một thảm họa kỹ thuật nghiêm trọng.\n\n---\n\n## 💻 Command\n```bash\ngit push origin main\ngit push origin --delete main\ngit push --force origin main\n```\n\n---\n\n## 🔍 Giải thích command\n- `git push origin main`: Thao tác bị chặn đứng bởi Protected Branch nếu chưa qua Pull Request.\n- `git push origin --delete`: Bị từ chối tuyệt đối nhằm ngăn chặn rủi ro vô tình xóa mất nhánh chính.\n- `git push --force`: Bị vô hiệu hóa hoàn toàn để bảo vệ tính toàn vẹn của lịch sử commit.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên kích hoạt Protected Branch cho các nhánh quan trọng khi vừa khởi tạo kho lưu trữ mới.**: Quên kích hoạt Protected Branch cho các nhánh quan trọng khi vừa khởi tạo kho lưu trữ mới.\n2. **Cấp quyền miễn trừ (Bypass) bừa bãi cho quá nhiều tài khoản khiến cơ chế bảo vệ bị vô hiệu hóa trên thực tế.**: Cấp quyền miễn trừ (Bypass) bừa bãi cho quá nhiều tài khoản khiến cơ chế bảo vệ bị vô hiệu hóa trên thực tế.\n3. **Chỉ bảo vệ nhánh main mà bỏ quên các nhánh dài hạn khác như develop hay staging.**: Chỉ bảo vệ nhánh main mà bỏ quên các nhánh dài hạn khác như develop hay staging.\n\n---\n\n## 🧪 Lab\n1. Truy cập vào mục Settings -> Branches trên một repository GitHub thử nghiệm.\n2. Thử thực hiện lệnh `git push origin main` trực tiếp từ máy cá nhân và quan sát thông báo từ chối từ GitHub.\n\n---\n\n## 💡 Hint\n> Bảo vệ nhánh là việc đầu tiên kỹ sư trưởng phải làm ngay sau khi gõ git init và push commit đầu tiên.\n\n---\n\n## ✅ Validation\n- Không ai có thể xóa hoặc force push vào nhánh chính đã được bảo vệ.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về tính năng Protected Branch.\n\n---\n\n## 🔥 Challenge\nPhân tích các nguy cơ tiềm ẩn nếu một dự án cho phép các tài khoản Administrator tự do bypass các quy tắc bảo vệ nhánh.\n\n---\n\n## 📚 Tổng kết\n- Protected Branch áp đặt các rào cản an ninh nghiêm ngặt bảo vệ các nhánh cốt lõi.\n- Ngăn chặn triệt để thao tác push trực tiếp, xóa nhánh và force push phá hủy lịch sử.\n- Bắt buộc mọi sự thay đổi mã nguồn phải đi qua con đường kiểm duyệt Pull Request.\n",
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
