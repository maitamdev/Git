import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "13-merge-pull-request",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "13-merge-pull-request",
    "title": "Quy trình Merge Pull Request",
    "level": "intermediate",
    "duration": 30,
    "xp": 100,
    "prerequisites": [
      "12-code-review"
    ],
    "objectives": [
      "Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính trên GitHub.",
      "Phân biệt merge commit, squash merge và rebase merge nếu repository bật các phương thức đó.",
      "Hiểu rõ ưu và nhược điểm của từng chiến lược đối với đồ thị lịch sử của dự án.",
      "Cập nhật nhánh local sau khi merge và chỉ xóa nhánh nếu không còn cần dùng."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "merge-pr"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "merge pr",
      "merge commit",
      "squash and merge",
      "rebase and merge",
      "dong pr",
      "delete branch"
    ],
    "commands": [
      "git switch main",
      "git pull origin main",
      "git branch -d feat/my-feature"
    ]
  },
  "content": "# Quy trình Merge Pull Request\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính thức trên GitHub.\n- Phân biệt sâu sắc 3 chiến lược hợp nhất: Create a merge commit, Squash and merge, và Rebase and merge.\n- Đánh giá ưu nhược điểm của từng phương thức đối với việc quản trị đồ thị lịch sử Git dài hạn.\n- Thực hiện chuẩn xác quy trình dọn dẹp và xóa bỏ nhánh tính năng sau khi đã merge thành công.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### merge commit PR — gộp tạo commit kết nối\n- **Nói dễ hiểu:** Chiến lược giữ nguyên vẹn từng commit con của nhánh tính năng và sinh ra một commit gộp đặc biệt có 2 cha trên nhánh chính.\n- **Ví dụ:** Giữ lại toàn bộ 8 commit chi tiết của nhánh `feat/auth` cùng một commit kết nối đưa vào nhánh `main`.\n- **Đừng nhầm:** Phương thức này lưu trữ toàn bộ lịch sử chi tiết nhưng dễ làm rối đồ thị Git nếu nhánh chứa nhiều commit sửa lỗi lặt vặt.\n\n### squash and merge — nén và gộp\n- **Nói dễ hiểu:** Gom toàn bộ các commit nhỏ trong nhánh tính năng lại thành đúng một commit duy nhất có chất lượng cao đưa vào nhánh chính.\n- **Ví dụ:** Nén 10 commit nháp thử nghiệm thành một commit sạch đẹp duy nhất mang thông điệp `feat(auth): integrate OAuth2 login`.\n- **Đừng nhầm:** Các commit riêng lẻ ban đầu sẽ không còn xuất hiện trên nhánh chính; toàn bộ nội dung mã nguồn được nén vào commit mới.\n\n### rebase and merge — tái lập và gộp\n- **Nói dễ hiểu:** Áp dụng lần lượt từng commit của nhánh tính năng nối tiếp vào đỉnh nhánh chính mà không sinh ra commit gộp kết nối.\n- **Ví dụ:** Đưa 3 commit tính năng xếp hàng thẳng tắp ngay sau commit mới nhất của nhánh `main`.\n- **Đừng nhầm:** Mã băm SHA của các commit sẽ được tính toán lại hoàn toàn mới vì gốc xuất phát điểm của chúng đã bị thay đổi.\n\n---\n\n## 📖 Định nghĩa\nMerge Pull Request là thao tác kết nạp chính thức các commit từ nhánh tính năng vào nhánh chính thức trên nền tảng GitHub sau khi đã vượt qua các bài kiểm thử và vòng kiểm duyệt mã nguồn, hỗ trợ 3 chiến lược cốt lõi: tạo commit gộp (merge commit), nén các commit lại thành một (squash and merge), hoặc tái lập các commit nối tiếp thẳng tắp (rebase and merge).\n\n---\n\n## 🤔 Tại sao cần?\nMỗi chiến lược hợp nhất PR mang lại một cấu trúc đồ thị lịch sử commit hoàn toàn khác nhau cho sản phẩm. Hiểu rõ bản chất của từng phương thức giúp đội ngũ kỹ thuật duy trì một cây lịch sử Git ngăn nắp, dễ dàng tra cứu, phục vụ hiệu quả cho việc truy vết lỗi hồi quy (regression testing) và hỗ trợ tự động hóa phát hành phiên bản mượt mà.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đi siêu thị mua sắm nhiều món đồ lặt vặt. Chiến lược Merge Commit giống như việc giữ lại từng mẩu hóa đơn lẻ rồi kẹp chung vào bìa hồ sơ lưu trữ. Chiến lược Squash giống như thu ngân gom tất cả lại và xuất đúng một hóa đơn tổng thanh toán duy nhất. Còn chiến lược Rebase giống như dán nối tiếp từng cuống vé vào cuối sổ nhật ký chi tiêu.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBA CHIẾN LƯỢC HỢP NHẤT PULL REQUEST TRÊN GITHUB:\n\n1. Create a merge commit:\n   main:    C1 ──► C2 ──────────► C5 (Merge Commit có 2 cha)\n                                /\n   feature:          └── C3 ── C4\n\n2. Squash and merge:\n   main:    C1 ──► C2 ──► C3+4' (Gom toàn bộ thành 1 commit duy nhất)\n\n3. Rebase and merge:\n   main:    C1 ──► C2 ──► C3' ──► C4' (Lịch sử thẳng tắp không rẽ nhánh)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong quá trình xây dựng tính năng giỏ hàng, lập trình viên tạo ra 7 commit nhỏ sửa lỗi chính tả và chỉnh màu CSS. Khi PR được chấp thuận, Tech Lead chọn \"Squash and merge\" để nén toàn bộ 7 commit nháp thành đúng một commit duy nhất có thông điệp chuẩn mực: `feat(cart): implement checkout drawer (#42)`. Lịch sử nhánh chính vẫn sạch sẽ, tinh tươm và không bị rác.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit pull origin main\ngit branch -d feat/my-feature\ngit remote prune origin\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Quay trở lại nhánh chính trên máy tính sau khi PR đã được merge thành công trên giao diện web.\n- `git pull origin main`: Kéo commit vừa được merge trên GitHub về để cập nhật thư mục làm việc cục bộ.\n- `git branch -d feat/my-feature`: Xóa an toàn nhánh tính năng cục bộ khi các thay đổi đã nằm trọn vẹn trong nhánh main.\n- `git remote prune origin`: Dọn dẹp các con trỏ nhánh theo dõi từ xa đã bị xóa bỏ trên máy chủ GitHub.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên xóa nhánh tính năng sau khi đã merge**: Để tồn đọng hàng trăm nhánh cũ mốc meo trên kho lưu trữ đám mây.\n2. **Chọn sai chiến lược gộp gây ô nhiễm lịch sử**: Dùng merge commit cho những nhánh chứa đầy commit rác như \"fix typo\" hay \"test again\".\n3. **Tiếp tục commit lên nhánh đã bị squash-merge**: Gây ra xung đột mã nguồn phức tạp ở các lần PR tiếp theo vì lịch sử cũ đã bị nén.\n\n---\n\n## 🧪 Lab\n1. Trên giao diện một PR đã nhận đủ lượt Approve và vượt qua CI, quan sát nút Merge màu xanh lá cây.\n2. Nhấp vào mũi tên bên cạnh nút Merge để khám phá 3 tùy chọn chiến lược hợp nhất.\n3. Chọn chiến lược theo quy chuẩn dự án (ví dụ \"Squash and merge\"), viết thông điệp tóm tắt và xác nhận hoàn tất.\n4. Nhấp nút tím \"Delete branch\" để xóa ngay nhánh tính năng trên máy chủ GitHub.\n5. Mở terminal máy tính, chạy `git switch main`, `git pull origin main` và xóa nhánh cục bộ bằng `git branch -d`.\n\n---\n\n## 💡 Hint\n> Trong đại đa số các nhóm phát triển tính năng web và mobile hiện đại, \"Squash and merge\" là chiến lược được các Tech Lead ưa chuộng nhất vì nó biến mỗi PR thành đúng một mốc lịch sử logic nguyên tử, cực kỳ dễ revert khi có sự cố phát sinh!\n\n---\n\n## ✅ Validation\n- Phân biệt chuẩn xác sự khác nhau về mặt đồ thị commit giữa 3 phương thức merge.\n- Nắm vững quy trình dọn dẹp nhánh tính năng cả trên GitHub lẫn trên máy tính cá nhân.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về các chiến lược Merge Pull Request và quy trình dọn dẹp dự án.\n\n---\n\n## 🔥 Challenge\nHãy tìm hiểu tùy chọn thiết lập \"Automatically delete head branches\" trong mục Settings của repository trên GitHub. Cơ chế này tự động giải phóng tài nguyên và bảo vệ kho lưu trữ khỏi tình trạng rác nhánh như thế nào?\n\n---\n\n## 📚 Tổng kết\n- Merge PR đưa mã nguồn hoàn thiện từ nhánh tính năng vào nhánh chính của sản phẩm.\n- Nắm vững 3 chiến lược: Merge commit, Squash and merge, và Rebase and merge.\n- Luôn dọn dẹp xóa bỏ nhánh tính năng sau khi merge để giữ kho dự án luôn tinh gọn.\n",
  "quiz": {
    "id": "quiz-04-13-merge-pull-request",
    "title": "Trắc nghiệm: Quy trình Merge Pull Request",
    "questions": [
      {
        "id": "q1",
        "question": "Chiến lược \"Squash and merge\" trên GitHub thực hiện hành vi kỹ thuật nào đối với các commit của PR?",
        "type": "single",
        "options": [
          {
            "text": "Nén toàn bộ các commit nhỏ trong nhánh tính năng thành một commit hoàn chỉnh duy nhất trên nhánh chính",
            "correct": true
          },
          {
            "text": "Xóa sạch toàn bộ mã nguồn của PR và từ chối gộp",
            "correct": false
          },
          {
            "text": "Nhân đôi số lượng commit lên gấp hai lần để lưu trữ dự phòng",
            "correct": false
          },
          {
            "text": "Chuyển toàn bộ commit thành các tệp văn bản PDF",
            "correct": false
          }
        ],
        "explanation": "Squash gom tất cả các thay đổi thành 1 commit duy nhất, giúp lịch sử nhánh chính cực kỳ tinh gọn."
      },
      {
        "id": "q2",
        "question": "Ưu điểm vượt trội nhất của chiến lược \"Rebase and merge\" là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo ra một lịch sử commit hoàn toàn tuyến tính (thẳng tắp) mà không sinh ra bất kỳ merge commit nào",
            "correct": true
          },
          {
            "text": "Tự động kiểm tra lỗi chính tả tiếng Việt trong mã nguồn",
            "correct": false
          },
          {
            "text": "Không cần kết nối mạng Internet vẫn merge được",
            "correct": false
          },
          {
            "text": "Cho phép merge ngay cả khi code đang bị lỗi cú pháp nghiêm trọng",
            "correct": false
          }
        ],
        "explanation": "Rebase and merge áp dụng từng commit lên đầu nhánh chính tạo ra một chuỗi lịch sử thẳng đều."
      },
      {
        "id": "q3",
        "question": "Sau khi một Pull Request đã được merge thành công vào nhánh main trên GitHub, hành động vệ sinh kho chứa chuẩn mực là gì?",
        "type": "single",
        "options": [
          {
            "text": "Bấm nút \"Delete branch\" để xóa bỏ con trỏ nhánh tính năng đã hoàn thành trên GitHub",
            "correct": true
          },
          {
            "text": "Xóa toàn bộ kho lưu trữ của công ty",
            "correct": false
          },
          {
            "text": "Khóa tài khoản của tất cả các lập trình viên vừa tham gia review",
            "correct": false
          },
          {
            "text": "Tạo ngay một nhánh mới có cùng tên để ghi đè",
            "correct": false
          }
        ],
        "explanation": "Nhánh đã merge thì toàn bộ code đã nằm an toàn trong main; xóa nhánh giúp danh sách nhánh luôn gọn gàng."
      },
      {
        "id": "q4",
        "question": "Sau khi PR được merge trên GitHub, lập trình viên cần làm gì trên máy tính cá nhân để cập nhật nhánh main của mình?",
        "type": "single",
        "options": [
          {
            "text": "Chuyển về nhánh main bằng `git switch main` rồi chạy `git pull origin main`",
            "correct": true
          },
          {
            "text": "Không cần làm gì cả vì máy tính sẽ tự động biết qua sóng tâm linh",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ thư mục dự án và clone lại từ đầu",
            "correct": false
          },
          {
            "text": "Cài lại hệ điều hành Windows",
            "correct": false
          }
        ],
        "explanation": "Bạn cần chuyển về nhánh main và pull để đồng bộ commit merge từ GitHub về không gian làm việc cục bộ."
      },
      {
        "id": "q5",
        "question": "Khi nào việc sử dụng chiến lược truyền thống \"Create a merge commit\" là phù hợp và có lợi nhất?",
        "type": "single",
        "options": [
          {
            "text": "Khi dự án áp dụng quy trình Git Flow và muốn bảo lưu nguyên vẹn từng ranh giới nhánh và lịch sử tích hợp tính năng lớn",
            "correct": true
          },
          {
            "text": "Khi nhánh tính năng chỉ có đúng một dòng sửa lỗi chính tả nhỏ",
            "correct": false
          },
          {
            "text": "Khi máy tính bị mất kết nối mạng Internet",
            "correct": false
          },
          {
            "text": "Khi muốn làm chậm tốc độ build của hệ thống",
            "correct": false
          }
        ],
        "explanation": "Merge Commit lưu vết ranh giới phát triển và bối cảnh tích hợp, hữu ích cho các dự án dài hạn cần kiểm toán chặt chẽ."
      },
      {
        "id": "q6",
        "question": "Nếu một Pull Request bị xung đột (Merge Conflict) với nhánh main, nút Merge trên GitHub sẽ như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Nút Merge sẽ bị vô hiệu hóa (bị xám) và GitHub yêu cầu bạn phải giải quyết xung đột trước khi được merge",
            "correct": true
          },
          {
            "text": "GitHub sẽ tự động chọn nhánh của người có cấp bậc cao hơn để merge",
            "correct": false
          },
          {
            "text": "GitHub sẽ tự động xóa đoạn code bị xung đột để merge tiếp",
            "correct": false
          },
          {
            "text": "Nút Merge vẫn bấm được bình thường và bỏ qua lỗi",
            "correct": false
          }
        ],
        "explanation": "Git kiên quyết bảo vệ tính toàn vẹn: có xung đột thì nút Merge bị khóa cho đến khi conflict được giải quyết."
      }
    ]
  }
};
export default lesson;
