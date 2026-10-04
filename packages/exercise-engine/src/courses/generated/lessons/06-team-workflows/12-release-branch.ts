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
  "content": "# Release Branch\n\n## 🎯 Mục tiêu\n- Giải thích vai trò của nhánh release trong Git Flow và các workflow cần ổn định bản phát hành riêng.\n- Hiểu Feature Freeze là chính sách của nhóm để giới hạn thay đổi trong giai đoạn ổn định.\n- Thực hiện quy trình của Git Flow: tích hợp release vào `main`, gắn tag và đưa sửa đổi cần giữ về `develop`.\n- Sử dụng Git Tag để niêm phong cột mốc phát hành chính thức sau khi nhánh release hoàn thành sứ mệnh.\n\n## 🧩 Từ khóa hôm nay\n### Release Branch\n- **Nói dễ hiểu**: Nhánh tạm thời để kiểm thử và ổn định một bản phát hành trước khi phát hành.\n- **Ví dụ**: Tạo nhánh `release/v2.1.0` từ `develop` để đội QA kiểm tra toàn diện trong 3 ngày trước khi mở bán.\n- **Đừng nhầm**: Trong Git Flow, nhóm thường hạn chế tính năng mới trên nhánh này; đó là quy ước nhằm tránh mở rộng phạm vi release.\n\n### Feature Freeze\n- **Nói dễ hiểu**: Chính sách tạm ngừng nhận tính năng mới vào một bản phát hành để tập trung kiểm tra và ổn định nó.\n- **Ví dụ**: Nhóm thông báo đóng băng lúc 17h thứ Sáu, mọi commit sau đó chỉ được phép là bug fix được phê duyệt.\n- **Đừng nhầm**: Mức giới hạn thay đổi do nhóm định nghĩa; code cần thiết cho bản phát hành vẫn có thể được chấp nhận theo review.\n\n### Dual-merge\n- **Nói dễ hiểu**: Trong Git Flow, tích hợp bản release vào `main` rồi đưa các sửa đổi cần giữ về `develop`.\n- **Ví dụ**: Khi sửa xong lỗi video trên `release/v2.1.0`, merge vào `main` để deploy và merge về `develop` để phiên bản tương lai có bản sửa này.\n- **Đừng nhầm**: Cần đồng bộ các commit chỉ có trên release; cách làm có thể là merge, cherry-pick hoặc quy trình khác của nhóm.\n\n## 📖 Định nghĩa\nTrong Git Flow, Release Branch thường được tạo từ `develop` khi nhóm bắt đầu ổn định một phiên bản. Nhóm giới hạn thay đổi trên nhánh, kiểm thử, sửa lỗi release và chuẩn bị ghi chú. Khi phát hành, nhánh được tích hợp vào `main` và thường gắn tag; các sửa đổi cần cho công việc sau được đồng bộ về `develop`. Đây là quy trình của mô hình Git Flow, không phải yêu cầu của Git.\n\n## 🤔 Tại sao cần?\nNhánh release tách phiên bản đang được kiểm tra khỏi thay đổi mới trên `develop`. Nó giúp nhóm kiểm thử phiên bản cụ thể, nhưng cần đồng bộ sửa lỗi và tránh để nhánh này sống lâu hơn mức cần thiết.\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung quy trình in sách giáo khoa. Nhánh `develop` là phòng sáng tác của các tác giả. Khi xong bản thảo, họ gửi bản in thử sang phòng Hiệu đính (`Release Branch`). Tại đây, biên tập viên chỉ sửa lỗi chính tả, căn chỉnh lề in chứ không được viết thêm chương mới. Trong lúc đó, các tác giả vẫn thoải mái viết sách tập hai ở phòng sáng tác.\n\n## 🖼 Sơ đồ\n```mermaid\ngitGraph\n    commit id: \"Init\"\n    branch develop\n    checkout develop\n    commit id: \"Feat A\"\n    commit id: \"Feat B\"\n    branch release/v1.0\n    checkout release/v1.0\n    commit id: \"Fix bug\"\n    commit id: \"Bump version\"\n    checkout main\n    merge release/v1.0 tag: \"v1.0.0\" id: \"Merge to main\"\n    checkout develop\n    merge release/v1.0 id: \"Merge back develop\"\n```\n\n## 🌎 Ví dụ thực tế\nTrước đợt ra mắt bản 3.0 của ứng dụng học tập, đội trưởng kỹ thuật tạo nhánh `release/v3.0.0` từ `develop`. Trong 4 ngày sau đó, cả đội tuân thủ nghiêm ngặt Feature Freeze. Khi QA phát hiện lỗi video không tự động chạy trên Firefox, kỹ sư sửa trực tiếp trên nhánh release. Khi mọi bài kiểm tra đều đạt, nhánh được merge vào `main`, gắn thẻ tag `v3.0.0` để triển khai lên máy chủ và merge ngược lại về `develop`.\n\n## 💻 Command\n```bash\n# Tách nhánh release từ develop để chuẩn bị phát hành\ngit switch -c release/v1.2.0 develop\n\n# Sửa lỗi phát hiện trong quá trình kiểm thử\ngit commit -m \"fix(video): resolve autoplay bug on firefox\"\n\n# Hợp nhất vào main để phát hành và gắn thẻ tag\ngit switch main && git merge --no-ff release/v1.2.0\ngit tag -a v1.2.0 -m \"Release v1.2.0 official\"\n\n# Hợp nhất ngược về develop và dọn dẹp nhánh\ngit switch develop && git merge --no-ff release/v1.2.0\ngit branch -d release/v1.2.0\n```\n\n## 🔍 Giải thích command\n- `git switch -c release/v1.2.0 develop`: Tách một nhánh phát hành độc lập từ trạng thái tích hợp của develop.\n- `git merge --no-ff`: Tạo merge commit kể cả khi fast-forward có thể; dùng nếu nhóm muốn giữ mốc nhánh release trong lịch sử.\n- `git tag -a`: Đánh dấu commit phát hành; tag không tự triển khai sản phẩm, trừ khi pipeline của repo được cấu hình để phản ứng với tag.\n- `git branch -d`: Xóa nhánh release cục bộ đã tích hợp; chỉ dọn nhánh remote nếu nhóm cho phép và đã xác nhận không còn cần nó.\n\n## ⚠️ Sai lầm phổ biến\n- Cho phép lập trình viên viết thêm tính năng mới vào nhánh release đang trong giai đoạn đóng băng.\n- Quên hợp nhất ngược nhánh release về `develop` khiến các lỗi vừa sửa bị tái phát ở phiên bản tiếp theo.\n- Xóa nhánh release trước khi bảo đảm toàn bộ mã nguồn đã được đưa trọn vẹn vào cả `main` và `develop`.\n\n## 🧪 Lab\nHãy cùng tôi thực hành quy trình trích xuất nhánh phát hành (Release Branch) và gắn thẻ phiên bản:\n\nĐiều kiện đầu vào: repo thử nghiệm đã có commit, `main` và `develop` cùng trỏ tới lịch sử có thể merge; các lệnh chỉ thao tác local.\n1. Tạo nhánh release từ `develop`: `git switch -c release/v1.0.0 develop`.\n2. Sửa một lỗi tài liệu, rồi stage và commit: `git add README.md`; `git commit -m \"docs: fix release instructions\"`.\n3. Tích hợp vào `main`: `git switch main`; `git merge --no-ff release/v1.0.0`.\n4. Gắn tag vào commit phát hành dự định: `git tag -a v1.0.0 -m \"Release v1.0.0\"`.\n5. Tích hợp commit release về `develop`, xác minh bằng `git log --oneline --graph --all`; xóa nhánh local sau khi chắc chắn đã tích hợp.\n\n## 💡 Hint\n- Dùng `--no-ff` nếu nhóm muốn thấy ranh giới nhánh release trong lịch sử; không phải quy tắc bắt buộc của Git Flow.\n- Thống nhất trước loại thay đổi được nhận trong giai đoạn ổn định; thường ưu tiên sửa lỗi và tài liệu.\n\n## ✅ Validation\n- Cả hai nhánh `main` và `develop` đều chứa trọn vẹn commit sửa lỗi từ nhánh release.\n- Thẻ tag `v1.0.0` trỏ chính xác vào commit hợp nhất trên nhánh `main`.\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm bên dưới để kiểm tra mức độ nắm vững quy trình vận hành của nhánh phát hành Release Branch.\n\n## 🔥 Challenge\nThiết kế kịch bản xử lý khi phát sinh xung đột mã nguồn trong bước hợp nhất ngược nhánh release về nhánh `develop` do có tính năng mới vừa được đưa vào `develop`.\n\n## 📚 Tổng kết\n- Release Branch tạo ra môi trường tĩnh lặng cho QA kiểm thử hồi quy và ổn định hóa phần mềm.\n- Quy tắc Feature Freeze bảo vệ sản phẩm khỏi các lỗi mới phát sinh sát giờ phát hành.\n- Quy trình hợp nhất kép (Dual-merge) bảo đảm mọi bản vá lỗi đều được bảo toàn cho các chu kỳ phát triển tiếp theo.\n",
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
            "text": "Tách phiên bản cần ổn định để kiểm thử và chuẩn bị phát hành; đây là lựa chọn của nhóm",
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
        "explanation": "Nhánh release giúp nhóm kiểm tra một trạng thái cụ thể trong khi công việc khác có thể tiếp tục trên nhánh phát triển."
      },
      {
        "id": "q2",
        "question": "Quy tắc \"Feature Freeze\" (Đóng băng tính năng) trên Release Branch quy định điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Theo chính sách của nhóm, hạn chế nhận tính năng mới để tập trung kiểm tra và sửa lỗi release",
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
        "explanation": "Feature Freeze giảm thay đổi phạm vi trong giai đoạn ổn định; nó không tự bảo đảm phát hành không có lỗi."
      },
      {
        "id": "q3",
        "question": "Trong Git Flow cổ điển, sau khi release hoàn tất, nơi nào nhận bản phát hành và nơi nào nhận lại sửa đổi cần giữ?",
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
        "explanation": "Git Flow tích hợp release vào `main` và đồng bộ các sửa đổi cần giữ về `develop`; cách cụ thể tùy workflow nhóm."
      },
      {
        "id": "q4",
        "question": "Tác dụng của cờ `--no-ff` khi merge một nhánh release là gì?",
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
        "explanation": "`--no-ff` tạo merge commit kể cả khi có thể fast-forward; dùng hay không là lựa chọn về cách lưu lịch sử."
      },
      {
        "id": "q5",
        "question": "Nhóm nên xác định ai chịu trách nhiệm chấp thuận phát hành dựa trên điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Vai trò được nhóm giao trách nhiệm phát hành và tiêu chí kiểm tra đã thống nhất",
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
        "explanation": "Git không chỉ định người phê duyệt release; nhóm cần phân công vai trò và nêu rõ tiêu chí."
      },
      {
        "id": "q6",
        "question": "Trong workflow dùng tag release, thao tác nào đánh dấu commit phát hành để tra cứu lại?",
        "type": "single",
        "options": [
          {
            "text": "Gắn tag vào commit dự định phát hành theo chính sách phiên bản của nhóm",
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
        "explanation": "Tag giúp đặt tên commit phát hành; Git không bắt buộc tag và tag không tự kích hoạt deploy nếu chưa cấu hình pipeline."
      }
    ]
  }
};
export default lesson;
