import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "02-feature-branch-workflow",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "02-feature-branch-workflow",
    "title": "Feature Branch Workflow",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "01-why-team-workflow"
    ],
    "objectives": [
      "Nắm vững nguyên lý cốt lõi của mô hình Feature Branch Workflow: cô lập hoàn toàn từng tính năng trên một nhánh riêng.",
      "Thực hiện chuẩn xác quy trình 5 bước: tạo nhánh -> phát triển -> push remote -> mở Pull Request -> hợp nhất.",
      "Áp dụng quy ước đặt tên nhánh tính năng chuyên nghiệp (feat/user-auth, fix/cart-total).",
      "Giải thích được vì sao mô hình này là nền tảng cơ sở của tất cả các mô hình workflow phức tạp khác."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "feature branch workflow",
      "nhanh tinh nang",
      "feat branch",
      "quy trinh feature",
      "cach ly ma nguon",
      "pull request flow"
    ],
    "commands": [
      "git switch -c feat/<ten-tinh-nang>",
      "git push -u origin feat/<ten-tinh-nang>",
      "git switch main && git pull origin main",
      "git branch -d feat/<ten-tinh-nang>"
    ]
  },
  "content": "# Feature Branch Workflow\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý cốt lõi của mô hình Feature Branch Workflow: cô lập hoàn toàn từng tính năng trên một nhánh riêng.\n- Thực hiện chuẩn xác quy trình 5 bước: tạo nhánh -> phát triển -> push remote -> mở Pull Request -> hợp nhất.\n- Áp dụng quy ước đặt tên nhánh tính năng chuyên nghiệp (feat/user-auth, fix/cart-total).\n- Giải thích được vì sao mô hình này là nền tảng cơ sở của tất cả các mô hình workflow phức tạp khác.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Feature Branch (Nhánh tính năng)\n- **Nói dễ hiểu**: Nhánh độc lập được rẽ từ nhánh main để phát triển duy nhất một tính năng hoặc sửa một lỗi cụ thể.\n- **Ví dụ**: Tạo nhánh `feat/google-auth` để thêm đăng nhập Google mà không đụng chạm đến code của đồng nghiệp.\n- **Đừng nhầm**: Không gom nhiều tính năng khác nhau vào một nhánh duy nhất vì sẽ khiến Pull Request quá lớn và khó kiểm duyệt.\n\n### Branch Naming Convention\n- **Nói dễ hiểu**: Quy ước đặt tên nhánh rõ ràng có tiền tố mục đích (feat/, fix/, chore/, docs/) theo dạng kebab-case.\n- **Ví dụ**: Đặt tên `feat/shopping-cart` cho tính năng mới hoặc `fix/payment-timeout` cho bản sửa lỗi.\n- **Đừng nhầm**: Tránh đặt tên tùy tiện như `test`, `branch-moi`, `nam-dev` khiến người khác không biết nhánh làm nhiệm vụ gì.\n\n### Short-lived Branch\n- **Nói dễ hiểu**: Nhánh có vòng đời ngắn (chỉ kéo dài vài giờ đến 2-3 ngày) rồi hợp nhất ngay vào nhánh chính và xóa đi.\n- **Ví dụ**: Hoàn thành form đổi mật khẩu trong 1 ngày, mở PR merge vào main rồi xóa nhánh để dọn dẹp kho lưu trữ.\n- **Đừng nhầm**: Giữ nhánh tính năng quá lâu (vài tuần hoặc vài tháng) sẽ gây ra xung đột mã nguồn khổng lồ khi merge.\n\n---\n\n## 📖 Định nghĩa\nFeature Branch Workflow là mô hình cộng tác Git trong đó mọi tính năng hoặc bản sửa lỗi đều được cô lập trên một nhánh rẽ riêng biệt. Nhánh chính chỉ chứa mã nguồn ổn định và chỉ nhận code sau khi vượt qua bài kiểm thử và được phê duyệt qua Pull Request.\n\n---\n\n## 💡 Tại sao cần\nNếu nhiều người cùng làm trên một nhánh, code dở dang của người này sẽ làm hỏng môi trường của người khác. Feature Branch Workflow mang lại khả năng cô lập tuyệt đối, giúp mọi người làm việc song song mà không giẫm chân lên nhau.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung nhà máy lắp ráp ô tô. Dây chuyền chính liên tục cho ra đời những chiếc xe hoàn chỉnh. Khi cần thử nghiệm hệ thống phanh mới, các kỹ sư mở một xưởng nghiên cứu phụ bên cạnh. Họ thỏa sức tháo lắp mà không làm gián đoạn dây chuyền lớn, chỉ đưa vào khi đã kiểm định an toàn.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình Feature Branch Workflow khép kín:\nmain:        C1 ────────────────────────────── C4 (Merge Commit / Fast-Forward)\n              │                                ▲\n              └─► [Tạo nhánh feat/auth]        │ (Sau khi Review & Pass CI)\n                        │                      │\nfeat/auth:              C2 ───────► C3 ────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nKỹ sư Trang làm chức năng đăng nhập Google. Trang cập nhật `main` mới nhất rồi tạo nhánh `feat/google-auth`. Sau khi hoàn thiện và đẩy lên GitHub, Trang tạo Pull Request. Đồng nghiệp review code, hệ thống kiểm tra tự động báo xanh và nhánh được gộp an toàn vào nhánh `main`.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit switch -c feat/<ten-tinh-nang>\ngit push -u origin feat/<ten-tinh-nang>\ngit switch main && git pull origin main\ngit branch -d feat/<ten-tinh-nang>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c feat/<name>`: Vừa tạo vừa chuyển sang nhánh tính năng mới bắt đầu từ vị trí hiện tại.\n- `git push -u origin <name>`: Đẩy nhánh lên máy chủ và thiết lập liên kết theo dõi (upstream tracking).\n- `git switch main && git pull`: Quay về nhánh chính và đồng bộ mã nguồn mới nhất từ remote server.\n- `git branch -d feat/<name>`: Xóa nhánh tính năng cục bộ một cách an toàn sau khi đã hợp nhất thành công.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên pull main trước khi tạo nhánh**: Khiến nhánh tính năng bắt đầu từ nền tảng code cũ, dễ gặp conflict khi hợp nhất.\n2. **Đặt tên nhánh tùy tiện**: Đặt tên tối nghĩa như `my-branch`, `test` khiến người khác không hiểu nội dung tính năng.\n3. **Gộp quá nhiều việc vào một nhánh**: Biến PR thành một khối khổng lồ làm đồng nghiệp quá tải khi review.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Đảm bảo nhánh main được cập nhật mới nhất bằng lệnh `git switch main && git pull origin main`.\n2. Tạo một nhánh tính năng mới theo quy ước chuẩn: `git switch -c feat/user-profile`.\n3. Thực hiện một commit mẫu, sau đó đẩy nhánh lên remote bằng `git push -u origin feat/user-profile`.\n4. Quan sát liên kết theo dõi nhánh trên máy chủ.\n\n---\n\n## 💡 Hint & mẹo\n> Mỗi nhánh tính năng chỉ nên phục vụ một mục đích duy nhất và có vòng đời ngắn từ vài giờ đến vài ngày để giảm thiểu xung đột.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Nhánh main luôn giữ được trạng thái có thể build và chạy thành công ở mọi thời điểm.\n- Nắm vững chu trình 5 bước từ rẽ nhánh, commit, push, review PR đến merge an toàn.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm dưới đây về mô hình Feature Branch Workflow tiêu chuẩn.\n\n---\n\n## 🚀 Thử thách nâng cao\nTrình bày cách xử lý nếu nhánh tính năng của bạn bị tụt hậu nhiều commit so với main trong thời gian bạn phát triển.\n\n---\n\n## 📝 Tổng kết\n- Feature Branch Workflow cô lập toàn bộ công việc mới trên các nhánh rẽ riêng biệt.\n- Nhánh main luôn được bảo vệ nghiêm ngặt và chỉ chứa mã nguồn đã kiểm thử ổn định.\n- Pull Request là cầu nối trung tâm để thảo luận, duyệt code và tích hợp nhánh tính năng vào main.\n",
  "quiz": {
    "id": "quiz-06-02-feature-branch-workflow",
    "title": "Trắc nghiệm: Feature Branch Workflow",
    "questions": [
      {
        "id": "q1",
        "question": "Quy tắc vàng quan trọng nhất trong mô hình Feature Branch Workflow là gì?",
        "type": "single",
        "options": [
          {
            "text": "Mọi tính năng mới đều phải được phát triển trên một nhánh riêng và nhánh main chỉ chứa code ổn định",
            "correct": true
          },
          {
            "text": "Tất cả lập trình viên chỉ được làm việc trên nhánh main duy nhất",
            "correct": false
          },
          {
            "text": "Không được phép xóa bất kỳ nhánh nào dù đã merge xong",
            "correct": false
          },
          {
            "text": "Chỉ được phép tạo nhánh mới vào ngày đầu tuần",
            "correct": false
          }
        ],
        "explanation": "Tách biệt nhánh tính năng giúp bảo vệ tính toàn vẹn của nhánh chính và hỗ trợ nhiều người cùng làm việc song song mà không giẫm chân lên nhau."
      },
      {
        "id": "q2",
        "question": "Quy ước đặt tên nhánh nào sau đây thể hiện rõ ràng và chuyên nghiệp nhất cho tính năng giỏ hàng?",
        "type": "single",
        "options": [
          {
            "text": "feat/shopping-cart",
            "correct": true
          },
          {
            "text": "code_moi_nhat_2026",
            "correct": false
          },
          {
            "text": "test1234",
            "correct": false
          },
          {
            "text": "dung-xoa-nhe",
            "correct": false
          }
        ],
        "explanation": "Tiền tố `feat/` kết hợp với mô tả ngắn gọn bằng tiếng Anh theo dạng kebab-case là chuẩn mực phổ biến nhất trong các dự án công nghệ."
      },
      {
        "id": "q3",
        "question": "Sau khi một nhánh tính năng đã được hợp nhất thành công vào nhánh main trên GitHub, bước tiếp theo nên làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Xóa nhánh tính năng đó trên cả GitHub và máy cục bộ để giữ kho lưu trữ gọn gàng",
            "correct": true
          },
          {
            "text": "Tiếp tục dùng nhánh đó để phát triển một tính năng hoàn toàn khác",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ kho lưu trữ trên máy và clone lại từ đầu",
            "correct": false
          },
          {
            "text": "Tắt máy tính và không bao giờ đồng bộ mã nguồn nữa",
            "correct": false
          }
        ],
        "explanation": "Xóa nhánh tính năng đã hoàn thành giúp cây thư mục gọn gàng, tránh nhầm lẫn và giảm tải chi phí quản lý nhánh."
      },
      {
        "id": "q4",
        "question": "Tại sao việc gộp nhiều tính năng độc lập vào một nhánh tính năng duy nhất lại bị xem là phản mẫu (anti-pattern)?",
        "type": "single",
        "options": [
          {
            "text": "Vì Pull Request sẽ quá lớn, khó kiểm duyệt chi tiết và khó cô lập khi phát sinh lỗi cần hoàn tác",
            "correct": true
          },
          {
            "text": "Vì Git không cho phép một nhánh chứa quá 3 commit",
            "correct": false
          },
          {
            "text": "Vì máy chủ GitHub sẽ từ chối nhận các nhánh có tên dài",
            "correct": false
          },
          {
            "text": "Vì việc đó vi phạm bản quyền phần mềm mã nguồn mở",
            "correct": false
          }
        ],
        "explanation": "Nhánh tính năng quá lớn khiến người review bị quá tải, tăng nguy cơ sót lỗi ngầm và rất khó revert nếu một trong các tính năng gặp sự cố."
      },
      {
        "id": "q5",
        "question": "Lệnh nào sau đây vừa tạo nhánh mới vừa kích hoạt con trỏ HEAD làm việc trên nhánh đó ngay lập tức?",
        "type": "single",
        "options": [
          {
            "text": "git switch -c feat/dark-mode",
            "correct": true
          },
          {
            "text": "git branch feat/dark-mode",
            "correct": false
          },
          {
            "text": "git checkout feat/dark-mode",
            "correct": false
          },
          {
            "text": "git commit -b feat/dark-mode",
            "correct": false
          }
        ],
        "explanation": "Cờ `-c` trong lệnh hiện đại `git switch` thực hiện hành động tạo nhánh mới và chuyển sang nhánh đó trong một bước duy nhất."
      },
      {
        "id": "q6",
        "question": "Trước khi bắt đầu rẽ nhánh tính năng mới từ nhánh main, bạn luôn luôn nên thực hiện thao tác gì?",
        "type": "single",
        "options": [
          {
            "text": "Chuyển về nhánh main và chạy git pull để bảo đảm đang rẽ nhánh từ phiên bản mã nguồn mới nhất",
            "correct": true
          },
          {
            "text": "Xóa sạch toàn bộ lịch sử commit trong thư mục .git",
            "correct": false
          },
          {
            "text": "Chạy lệnh git reset --hard để đưa máy về trạng thái xuất xưởng",
            "correct": false
          },
          {
            "text": "Đổi tên tài khoản GitHub của bạn sang tên khác",
            "correct": false
          }
        ],
        "explanation": "Luôn cập nhật nhánh main mới nhất trước khi rẽ nhánh giúp giảm thiểu tối đa nguy cơ gặp xung đột mã nguồn sau này khi mở Pull Request."
      }
    ]
  }
};
export default lesson;
