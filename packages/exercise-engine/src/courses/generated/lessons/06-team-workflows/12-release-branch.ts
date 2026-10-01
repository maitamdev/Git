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
  "content": "# Release Branch\n\n## 🎯 Mục tiêu\n- Nắm vững mục đích và vòng đời chuẩn của nhánh phát hành (Release Branch) trong các quy trình phần mềm chuyên nghiệp.\n- Áp dụng quy tắc Đóng băng tính năng (Feature Freeze): nghiêm cấm code tính năng mới, chỉ chấp nhận commit sửa lỗi và tài liệu.\n- Thực hiện quy trình hợp nhất kép (Dual-merge): hợp nhất vào main để phát hành và hợp nhất ngược về develop để đồng bộ.\n- Sử dụng Git Tag để niêm phong cột mốc phát hành chính thức sau khi nhánh release hoàn thành sứ mệnh.\n\n## 🧩 Từ khóa hôm nay\n### Release Branch\n- **Nói dễ hiểu**: Nhánh tạm thời tách ra để kiểm thử hồi quy và sửa lỗi dọn dẹp trước khi đưa sản phẩm lên môi trường thực tế.\n- **Ví dụ**: Tạo nhánh `release/v2.1.0` từ `develop` để đội QA kiểm tra toàn diện trong 3 ngày trước khi mở bán.\n- **Đừng nhầm**: Không dùng để phát triển tính năng mới; mọi tính năng mới phải đợi ở chu kỳ sau trên `develop`.\n\n### Feature Freeze\n- **Nói dễ hiểu**: Trạng thái đóng băng tính năng, nghiêm cấm viết thêm code mới mà chỉ tập trung sửa lỗi và hoàn thiện tài liệu.\n- **Ví dụ**: Nhóm thông báo đóng băng lúc 17h thứ Sáu, mọi commit sau đó chỉ được phép là bug fix được phê duyệt.\n- **Đừng nhầm**: Không có nghĩa là toàn bộ đội ngũ dừng làm việc; các lập trình viên khác vẫn code tính năng mới cho bản sau trên `develop`.\n\n### Dual-merge\n- **Nói dễ hiểu**: Thao tác hợp nhất nhánh release vào cả `main` lẫn `develop` để vừa phát hành vừa không làm mất bản vá lỗi.\n- **Ví dụ**: Khi sửa xong lỗi video trên `release/v2.1.0`, merge vào `main` để deploy và merge về `develop` để phiên bản tương lai có bản sửa này.\n- **Đừng nhầm**: Nếu chỉ merge vào `main`, các bản vá lỗi trên release branch sẽ bị thất lạc ở các phiên bản tiếp theo.\n\n## 📖 Định nghĩa\nRelease Branch là nhánh làm việc ngắn hạn được tạo ra từ `develop` nhằm mục đích ổn định hóa mã nguồn trước khi xuất bản. Trong suốt vòng đời của nhánh này, dự án kích hoạt trạng thái Feature Freeze để toàn bộ đội ngũ chỉ tập trung kiểm thử hồi quy, sửa lỗi còn tồn đọng và chuẩn bị tài liệu phát hành.\n\n## 💡 Tại sao cần\nKhi nhiều kỹ sư cùng làm việc trên `develop`, mã nguồn liên tục thay đổi khiến đội QA không thể kiểm thử ổn định. Release Branch tạo ra một vùng cô lập tĩnh lặng để đánh bóng chất lượng sản phẩm, trong khi các lập trình viên khác vẫn có thể tiếp tục phát triển tính năng cho các phiên bản tiếp theo mà không làm gián đoạn nhau.\n\n## 🧠 Mental Model\nHãy hình dung quy trình in sách giáo khoa. Nhánh `develop` là phòng sáng tác của các tác giả. Khi xong bản thảo, họ gửi bản in thử sang phòng Hiệu đính (`Release Branch`). Tại đây, biên tập viên chỉ sửa lỗi chính tả, căn chỉnh lề in chứ không được viết thêm chương mới. Trong lúc đó, các tác giả vẫn thoải mái viết sách tập hai ở phòng sáng tác.\n\n## 📊 Sơ đồ minh họa\n```mermaid\ngitGraph\n    commit id: \"Init\"\n    branch develop\n    checkout develop\n    commit id: \"Feat A\"\n    commit id: \"Feat B\"\n    branch release/v1.0\n    checkout release/v1.0\n    commit id: \"Fix bug\"\n    commit id: \"Bump version\"\n    checkout main\n    merge release/v1.0 tag: \"v1.0.0\" id: \"Merge to main\"\n    checkout develop\n    merge release/v1.0 id: \"Merge back develop\"\n```\n\n## 🏢 Ví dụ thực tế\nTrước đợt ra mắt bản 3.0 của ứng dụng học tập, đội trưởng kỹ thuật tạo nhánh `release/v3.0.0` từ `develop`. Trong 4 ngày sau đó, cả đội tuân thủ nghiêm ngặt Feature Freeze. Khi QA phát hiện lỗi video không tự động chạy trên Firefox, kỹ sư sửa trực tiếp trên nhánh release. Khi mọi bài kiểm tra đều đạt, nhánh được merge vào `main`, gắn thẻ tag `v3.0.0` để triển khai lên máy chủ và merge ngược lại về `develop`.\n\n## 💻 Command & Cú pháp\n```bash\n# Tách nhánh release từ develop để chuẩn bị phát hành\ngit switch -c release/v1.2.0 develop\n\n# Sửa lỗi phát hiện trong quá trình kiểm thử\ngit commit -m \"fix(video): resolve autoplay bug on firefox\"\n\n# Hợp nhất vào main để phát hành và gắn thẻ tag\ngit switch main && git merge --no-ff release/v1.2.0\ngit tag -a v1.2.0 -m \"Release v1.2.0 official\"\n\n# Hợp nhất ngược về develop và dọn dẹp nhánh\ngit switch develop && git merge --no-ff release/v1.2.0\ngit branch -d release/v1.2.0\n```\n\n## 🔍 Giải thích command\n- `git switch -c release/v1.2.0 develop`: Tách một nhánh phát hành độc lập từ trạng thái tích hợp của develop.\n- `git merge --no-ff`: Hợp nhất tạo commit đại diện rõ ràng giúp lưu dấu lịch sử đợt phát hành trên biểu đồ Git.\n- `git tag -a`: Đánh dấu cột mốc phiên bản chính thức trên nhánh `main` để kích hoạt dây chuyền triển khai.\n- `git branch -d`: Xóa an toàn nhánh release sau khi đã hợp nhất đầy đủ vào cả hai nhánh chính.\n\n## ⚠️ Sai lầm phổ biến\n- Cho phép lập trình viên viết thêm tính năng mới vào nhánh release đang trong giai đoạn đóng băng.\n- Quên hợp nhất ngược nhánh release về `develop` khiến các lỗi vừa sửa bị tái phát ở phiên bản tiếp theo.\n- Xóa nhánh release trước khi bảo đảm toàn bộ mã nguồn đã được đưa trọn vẹn vào cả `main` và `develop`.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác tách nhánh phát hành trên kho mô phỏng và đối chiếu theo hướng dẫn bên dưới.\n\n1. Khởi tạo một nhánh `develop` và tạo 2 commit tính năng.\n2. Tách nhánh `release/v1.0.0` từ `develop` bằng lệnh `git switch -c release/v1.0.0 develop`.\n3. Tạo commit sửa lỗi tài liệu trên nhánh release.\n4. Chuyển sang `main`, merge nhánh release với cờ `--no-ff` và gắn tag `v1.0.0`.\n5. Chuyển sang `develop`, merge nhánh release về để hoàn tất quy trình hợp nhất kép và xóa nhánh release.\n\n## 💡 Hint & mẹo\n- Luôn sử dụng cờ `--no-ff` khi merge nhánh release để bảo toàn biểu đồ lịch sử phát hành trên Git.\n- Chỉ những commit sửa lỗi nghiêm trọng và cập nhật tài liệu hoặc nâng số phiên bản mới được phép đưa lên nhánh release.\n\n## ✅ Validation & Kết quả mong đợi\n- Cả hai nhánh `main` và `develop` đều chứa trọn vẹn commit sửa lỗi từ nhánh release.\n- Thẻ tag `v1.0.0` trỏ chính xác vào commit hợp nhất trên nhánh `main`.\n\n## ❓ Quiz nhanh\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững quy trình vận hành của nhánh phát hành Release Branch.\n\n## 🚀 Thử thách nâng cao\nThiết kế kịch bản xử lý khi phát sinh xung đột mã nguồn trong bước hợp nhất ngược nhánh release về nhánh `develop` do có tính năng mới vừa được đưa vào `develop`.\n\n## 📝 Tổng kết\n- Release Branch tạo ra môi trường tĩnh lặng cho QA kiểm thử hồi quy và ổn định hóa phần mềm.\n- Quy tắc Feature Freeze bảo vệ sản phẩm khỏi các lỗi mới phát sinh sát giờ phát hành.\n- Quy trình hợp nhất kép (Dual-merge) bảo đảm mọi bản vá lỗi đều được bảo toàn cho các chu kỳ phát triển tiếp theo.\n",
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
