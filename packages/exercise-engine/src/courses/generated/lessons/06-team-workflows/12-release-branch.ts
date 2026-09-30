import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "12-release-branch",
  "moduleId": "06-team-workflows",
  "metadata": {
    "id": "12-release-branch",
    "title": "Release Branch",
    "level": "advanced",
    "duration": 30,
    "xp": 95,
    "prerequisites": [
      "11-semantic-versioning"
    ],
    "objectives": [
      "Nắm vững mục đích và vòng đời chuẩn của nhánh phát hành (Release Branch) trong các quy trình phần mềm chuyên nghiệp.",
      "Áp dụng quy tắc Đóng băng tính năng (Feature Freeze): nghiêm cấm code tính năng mới, chỉ chấp nhận commit sửa lỗi và tài liệu.",
      "Thực hiện quy trình hợp nhất kép (Dual-merge): hợp nhất vào main để phát hành và hợp nhất ngược về develop để đồng bộ.",
      "Sử dụng Git Tag để niêm phong cột mốc phát hành chính thức sau khi nhánh release hoàn thành sứ mệnh."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "release branch",
      "nhanh phat hanh",
      "feature freeze",
      "dong bang tinh nang",
      "kiem thu hoi quy",
      "hardening sprint"
    ],
    "commands": [
      "git switch -c release/v1.2.0 develop",
      "git commit -m \"fix(video): resolve autoplay bug on firefox\"",
      "git switch main && git merge --no-ff release/v1.2.0",
      "git tag -a v1.2.0 -m \"Release v1.2.0 official\"",
      "git switch develop && git merge --no-ff release/v1.2.0",
      "git branch -d release/v1.2.0"
    ]
  },
  "content": "# Release Branch\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững mục đích và vòng đời chuẩn của nhánh phát hành (Release Branch) trong các quy trình phần mềm chuyên nghiệp.\n- Áp dụng quy tắc Đóng băng tính năng (Feature Freeze): nghiêm cấm code tính năng mới, chỉ chấp nhận commit sửa lỗi và tài liệu.\n- Thực hiện quy trình hợp nhất kép (Dual-merge): hợp nhất vào main để phát hành và hợp nhất ngược về develop để đồng bộ.\n- Sử dụng Git Tag để niêm phong cột mốc phát hành chính thức sau khi nhánh release hoàn thành sứ mệnh.\n\n---\n\n## 📖 Định nghĩa\n> Release Branch (Nhánh phát hành) là một nhánh tạm thời được tách ra từ nhánh tích hợp chính (như `develop`) nhằm mục đích chuẩn bị và ổn định hóa một bản phát hành sản phẩm chính thức. Khi một Release Branch được khởi tạo, dự án bước vào giai đoạn Đóng băng tính năng (Feature Freeze): toàn bộ việc phát triển chức năng mới cho bản phát hành này bị dừng lại, và đội ngũ kỹ sư cùng đội QA chỉ tập trung vào việc tìm lỗi, sửa lỗi hồi quy, tinh chỉnh hiệu năng và hoàn thiện tài liệu phát hành trước khi đưa ra thị trường.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các dự án quy mô lớn, nếu không có Release Branch, các lập trình viên sẽ liên tục đẩy mã nguồn mới vào nhánh chung. Đội ngũ kiểm thử (QA) sẽ không bao giờ có được một trạng thái mã nguồn tĩnh để kiểm thử toàn diện, bởi vì mỗi giờ lại có người sửa đổi logic. Release Branch tạo ra một không gian độc lập tĩnh lặng để đánh bóng chất lượng sản phẩm, trong khi phần còn lại của công ty vẫn có thể tiếp tục phát triển các tính năng cho phiên bản tiếp theo trên nhánh `develop` mà không làm phiền nhau.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung việc xuất bản một cuốn sách giáo khoa dày 500 trang. Nhánh `develop` là xưởng viết của tập thể các tác giả. Khi bản thảo hoàn thành, họ in một bản thử nghiệm gửi sang phòng Chế bản và Hiệu đính (`Release Branch`). Tại phòng này, các biên tập viên chỉ soi lỗi chính tả, căn chỉnh lề và sửa các câu chữ in sai mà không được phép viết thêm các chương sách mới toanh. Trong khi phòng hiệu đính đang làm việc, các tác giả ở xưởng vẫn có thể thoải mái viết các chương cho cuốn sách tập hai tiếp theo.\n\n---\n\n## 🖼 Sơ đồ\n```text\nVòng đời của một Release Branch chuẩn mực:\ndevelop: ──●───●───● (Tách release) ───────────────────────────● (Nhận dual-merge)\n                   │                                           ▲\nrelease/v2.1:      └───● (Fix bug) ───● (Cập nhật docs) ───────┤\n                                                               │\nmain:    ──────────────────────────────────────────────────────┴──● (Gắn tag v2.1.0)\n                                                                    (Deploy Prod)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrước đợt phát hành phiên bản 3.0 của ứng dụng học tập, đội trưởng kỹ thuật tạo nhánh `release/v3.0.0` từ nhánh `develop`. Trong 4 ngày sau đó, cả đội tuân thủ nghiêm ngặt chính sách Feature Freeze. Khi chuyên viên QA phát hiện lỗi video không tự động phát trên trình duyệt Firefox, kỹ sư Huy thực hiện commit sửa lỗi trực tiếp trên nhánh `release/v3.0.0`. Khi tất cả 150 kịch bản kiểm thử đều đạt yêu cầu, nhánh release được hợp nhất vào `main` với cờ `--no-ff`, được gắn thẻ tag `v3.0.0` để kích hoạt dây chuyền đóng gói đưa lên máy chủ sản xuất, đồng thời được hợp nhất ngược lại vào `develop` để giữ lại bản sửa lỗi video Firefox.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c release/v1.2.0 develop\ngit commit -m \"fix(video): resolve autoplay bug on firefox\"\ngit switch main && git merge --no-ff release/v1.2.0\ngit tag -a v1.2.0 -m \"Release v1.2.0 official\"\ngit switch develop && git merge --no-ff release/v1.2.0\ngit branch -d release/v1.2.0\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c release/v1.2.0 develop`: Rẽ nhánh phát hành từ điểm tích hợp develop.\n- `git merge --no-ff`: Hợp nhất tạo merge commit bảo toàn nhánh vào main và develop.\n- `git tag -a`: Đánh dấu phiên bản phát hành chính thức.\n- `git branch -d`: Xóa nhánh release sau khi hoàn thành quy trình hợp nhất kép an toàn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho phép thành viên viết thêm tính năng mới toanh vào nhánh release đang trong giai đoạn đóng băng.**: Cho phép thành viên viết thêm tính năng mới toanh vào nhánh release đang trong giai đoạn đóng băng.\n2. **Quên hợp nhất ngược nhánh release về develop**:  Khiến các lỗi đã sửa công phu bị biến mất ở phiên bản tiếp theo.\n3. **Xóa nhánh release trước khi bảo đảm toàn bộ mã nguồn đã được hợp nhất đủ vào cả main và develop.**: Xóa nhánh release trước khi bảo đảm toàn bộ mã nguồn đã được hợp nhất đủ vào cả main và develop.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh `release/v1.0.0` từ nhánh `develop` trong kho lưu trữ mô phỏng.\n2. Thực hiện một commit sửa lỗi tài liệu trên nhánh release, sau đó thực hiện hợp nhất kép vào cả `main` và `develop`.\n\n---\n\n## 💡 Hint\n> Chỉ các commit sửa lỗi quan trọng (Bug fixes) và cập nhật số phiên bản mới được phép xuất hiện trên Release Branch.\n\n---\n\n## ✅ Validation\n- Cả hai nhánh main và develop đều sở hữu đầy đủ các commit sửa lỗi được thực hiện trên release branch.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về quy trình vận hành Release Branch.\n\n---\n\n## 🔥 Challenge\nMô tả cách xử lý nếu trong quá trình hợp nhất ngược nhánh release về develop phát sinh xung đột mã nguồn lớn.\n\n---\n\n## 📚 Tổng kết\n- Release Branch tạo ra vùng cách ly để ổn định hóa và kiểm thử hồi quy trước giờ phát hành.\n- Chính sách Feature Freeze nghiêm cấm thêm tính năng mới, chỉ ưu tiên sửa lỗi và hoàn thiện bản build.\n- Bắt buộc thực hiện quy trình hợp nhất kép vào cả main và develop để bảo toàn lịch sử sửa lỗi.\n",
  "quiz": {
    "id": "quiz-06-12-release-branch",
    "title": "Trắc nghiệm: Release Branch",
    "questions": [
      {
        "id": "q1",
        "question": "Mục đích chính cốt lõi của việc tạo ra nhánh Release Branch là gì?",
        "type": "single",
        "options": [
          {
            "text": "Cô lập mã nguồn để đóng băng tính năng, kiểm thử toàn diện và sửa lỗi ổn định hóa trước khi xuất bản",
            "correct": true
          },
          {
            "text": "Để các lập trình viên bắt đầu viết các tính năng thử nghiệm hoàn toàn mới",
            "correct": false
          },
          {
            "text": "Để xóa toàn bộ cơ sở dữ liệu cũ của khách hàng",
            "correct": false
          },
          {
            "text": "Để giảm bớt dung lượng của thư mục .git",
            "correct": false
          }
        ],
        "explanation": "Release Branch giúp tạo một môi trường tĩnh lặng cho QA kiểm thử hồi quy mà không bị xáo trộn bởi code mới từ các tính năng khác."
      },
      {
        "id": "q2",
        "question": "Quy tắc \"Feature Freeze\" (Đóng băng tính năng) trên Release Branch quy định điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Nghiêm cấm thêm bất kỳ tính năng mới nào, chỉ chấp nhận các commit sửa lỗi và tinh chỉnh tài liệu",
            "correct": true
          },
          {
            "text": "Tắt máy chủ không cho bất kỳ ai truy cập mã nguồn trong 1 tuần",
            "correct": false
          },
          {
            "text": "Đóng băng tài khoản ngân hàng của công ty phần mềm",
            "correct": false
          },
          {
            "text": "Chỉ cho phép lập trình viên làm việc trong phòng có máy lạnh thật lạnh",
            "correct": false
          }
        ],
        "explanation": "Đóng băng tính năng ngăn chặn nguy cơ đưa thêm các lỗi mới vào hệ thống ngay sát giờ phát hành sản phẩm."
      },
      {
        "id": "q3",
        "question": "Sau khi một nhánh Release Branch hoàn tất kiểm thử, nó bắt buộc phải được hợp nhất vào những nhánh nào?",
        "type": "single",
        "options": [
          {
            "text": "Hợp nhất vào nhánh main để phát hành và hợp nhất ngược về develop để đồng bộ bản sửa lỗi",
            "correct": true
          },
          {
            "text": "Chỉ hợp nhất vào nhánh main rồi xóa ngay lập tức",
            "correct": false
          },
          {
            "text": "Chỉ hợp nhất vào nhánh develop",
            "correct": false
          },
          {
            "text": "Không được hợp nhất vào đâu cả",
            "correct": false
          }
        ],
        "explanation": "Hợp nhất kép (Dual-merge) bảo đảm rằng các bugfix quý giá phát hiện trong giai đoạn release sẽ không bị mất trong các sprint tương lai."
      },
      {
        "id": "q4",
        "question": "Tại sao việc dùng cờ `--no-ff` (No Fast-Forward) lại được khuyến nghị mạnh mẽ khi merge Release Branch?",
        "type": "single",
        "options": [
          {
            "text": "Để tạo một Merge Commit rõ ràng ghi nhận đầy đủ dấu vết lịch sử của đợt phát hành trên biểu đồ Git",
            "correct": true
          },
          {
            "text": "Để ép Git phải xóa nhánh đó sau 10 giây",
            "correct": false
          },
          {
            "text": "Để tăng tốc độ biên dịch mã nguồn của ngôn ngữ C++",
            "correct": false
          },
          {
            "text": "Vì lệnh git không cho phép merge nếu thiếu cờ đó",
            "correct": false
          }
        ],
        "explanation": "Cờ `--no-ff` bảo toàn hình hài của nhánh release trong biểu đồ lịch sử, giúp việc tra cứu các mốc phát hành sau này cực kỳ trực quan."
      },
      {
        "id": "q5",
        "question": "Ai là người nên có quyền quyết định cuối cùng phê duyệt cho phép một nhánh release được merge vào main?",
        "type": "single",
        "options": [
          {
            "text": "Trưởng nhóm kỹ thuật (Tech Lead) hoặc người quản lý phát hành (Release Manager) sau khi có xác nhận từ QA",
            "correct": true
          },
          {
            "text": "Bất kỳ thực tập sinh nào rảnh rỗi",
            "correct": false
          },
          {
            "text": "Nhân viên bảo vệ tòa nhà văn phòng",
            "correct": false
          },
          {
            "text": "Một thuật toán ngẫu nhiên trên mạng",
            "correct": false
          }
        ],
        "explanation": "Phát hành sản phẩm ra người dùng là quyết định quan trọng đòi hỏi sự thẩm định của người chịu trách nhiệm kỹ thuật cao nhất."
      },
      {
        "id": "q6",
        "question": "Sau khi hợp nhất thành công Release Branch vào nhánh main, thao tác chuẩn tiếp theo không thể thiếu là gì?",
        "type": "single",
        "options": [
          {
            "text": "Gắn thẻ Annotated Tag (ví dụ v1.2.0) có chữ ký hoặc thông điệp rõ ràng để đánh dấu cột mốc phiên bản",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ các tệp tin trong thư mục gốc của dự án",
            "correct": false
          },
          {
            "text": "Reset máy tính cá nhân về cài đặt gốc",
            "correct": false
          },
          {
            "text": "Tạo thêm 10 nhánh release rỗng để dự phòng",
            "correct": false
          }
        ],
        "explanation": "Git Tag đánh dấu vĩnh viễn trạng thái chính xác của commit phát hành, làm căn cứ truy cứu và kích hoạt pipeline triển khai sản phẩm."
      }
    ]
  }
};
export default lesson;
