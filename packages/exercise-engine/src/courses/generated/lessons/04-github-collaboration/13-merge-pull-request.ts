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
      "Phân biệt rõ ràng 3 chiến lược merge được GitHub cung cấp: Create a merge commit, Squash and merge, và Rebase and merge.",
      "Hiểu rõ ưu và nhược điểm của từng chiến lược đối với đồ thị lịch sử của dự án.",
      "Thực hiện thao tác dọn dẹp xóa nhánh tính năng sau khi PR đã được merge thành công."
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
  "content": "# Quy trình Merge Pull Request\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính trên GitHub.\n- Phân biệt rõ ràng 3 chiến lược merge được GitHub cung cấp: Create a merge commit, Squash and merge, và Rebase and merge.\n- Hiểu rõ ưu và nhược điểm của từng chiến lược đối với đồ thị lịch sử của dự án.\n- Thực hiện thao tác dọn dẹp xóa nhánh tính năng sau khi PR đã được merge thành công.\n\n---\n\n## 📖 Định nghĩa\n> Merge Pull Request là thao tác kết thúc vòng đời của một tính năng thành công trên GitHub, chính thức kết nạp các commit từ nhánh tính năng vào nhánh chính (thường là `main`). GitHub cung cấp cho bạn 3 tùy chọn chiến lược hợp nhất: (1) `Create a merge commit` (giữ nguyên tất cả commit và tạo merge commit 2 cha), (2) `Squash and merge` (nén toàn bộ các commit nhỏ thành một commit duy nhất), và (3) `Rebase and merge` (áp dụng từng commit lên đỉnh nhánh chính thành một đường thẳng).\n\n---\n\n## 🤔 Tại sao cần?\nLựa chọn chiến lược merge đúng đắn quyết định diện mạo và chất lượng của lịch sử kho chứa trong suốt nhiều năm vận hành. Nếu chọn sai, lịch sử dự án của bạn có thể biến thành một \"rừng cây\" chằng chịt các commit rác như \"fix typo\", \"fix bug again\", \"commit test\". Hiểu rõ 3 chiến lược này giúp bạn và đội ngũ giữ cho nhật ký commit luôn sạch đẹp, dễ tra cứu và hỗ trợ tối đa việc truy vết lỗi hoặc rollback khi cần.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn đi siêu thị mua sắm nhiều món đồ lặt vặt: chai nước mắm, gói mì tôm, cây bút bi (các commit nhỏ). Khi thanh toán tại quầy: Chiến lược Merge thông thường giống như thu ngân đưa cho bạn từng tờ hóa đơn rời cho mỗi món đồ kèm một tờ kẹp tổng hợp. Chiến lược Squash giống như thu ngân gom tất cả các món đồ đó lại và in ra đúng một tờ hóa đơn thanh toán duy nhất sạch sẽ mang tên \"Chi phí sinh hoạt tuần 1\". Chiến lược Rebase giống như dán nối tiếp từng tờ hóa đơn nhỏ vào đuôi cuốn sổ kế toán.\n\n---\n\n## 🖼 Sơ đồ\n```text\n3 phương thức Merge Pull Request trên GitHub:\n1. Create a merge commit:\n   main:    C1 ──► C2 ──────────► C5 (Merge Commit có 2 cha)\n                               /\n   feature:          └── C3 ── C4\n\n2. Squash and merge:\n   main:    C1 ──► C2 ──► C3+4' (Gom C3 và C4 thành 1 commit duy nhất)\n\n3. Rebase and merge:\n   main:    C1 ──► C2 ──► C3' ──► C4' (Lịch sử thẳng tắp, không có nút giao)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong quá trình phát triển tính năng giỏ hàng, lập trình viên tạo ra 8 commit nhỏ với các thông điệp nháp như \"wip\", \"fix css\", \"testing\". Sau khi Pull Request vượt qua toàn bộ các bài kiểm tra tự động và được 2 kỹ sư senior phê duyệt, trưởng nhóm quyết định bấm chọn tùy chọn: \"Squash and merge\". Toàn bộ 8 commit nháp được nén gọn thành một commit chất lượng cao duy nhất: \"feat(cart): implement shopping cart and checkout flow (#42)\". Sau khi merge, trưởng nhóm nhấn nút màu tím \"Delete branch\" để dọn dẹp sạch sẽ nhánh tính năng.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit pull origin main\ngit branch -d feat/my-feature\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Chuyển về nhánh main trên máy tính cá nhân sau khi PR đã được merge trên web.\n- `git pull origin main`: Kéo commit vừa được merge trên GitHub về cập nhật máy cá nhân.\n- `git branch -d <nhánh>`: Xóa an toàn nhánh tính năng cục bộ sau khi nó đã nằm trọn vẹn trong main.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên xóa nhánh tính năng sau khi đã merge**:  Khiến danh sách nhánh trên GitHub bị tồn đọng hàng trăm nhánh cũ rác rưởi.\n2. **Dùng Create a merge commit cho các PR chứa nhiều commit nháp vô nghĩa**:  Khiến lịch sử nhánh main bị ô nhiễm bởi các commit rác.\n3. **Tiếp tục code thêm trên nhánh tính năng đã bị squash and merge**:  Sẽ gặp khó khăn khi đồng bộ vì lịch sử commit đã bị viết lại.\n\n---\n\n## 🧪 Lab\n1. Quan sát nút xanh `Merge pull request` xuất hiện khi PR đã được Approve và pass CI.\n2. Nhấn vào mũi tên cạnh nút để so sánh 3 tùy chọn: Merge, Squash, và Rebase.\n3. Chọn `Squash and merge` và chỉnh sửa lại tiêu đề commit cho thật chuẩn mực.\n4. Nhấn xác nhận merge và bấm nút `Delete branch` màu tím để xóa nhánh.\n\n---\n\n## 💡 Hint\n> Squash and merge là lựa chọn phổ biến hàng đầu trong các dự án web hiện đại để giữ lịch sử main tinh gọn.\n\n---\n\n## ✅ Validation\n- Merge thành công Pull Request vào nhánh chính và dọn dẹp nhánh tính năng sạch sẽ.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về các chiến lược Merge Pull Request.\n\n---\n\n## 🔥 Challenge\nNêu trường hợp nào nên ưu tiên chọn \"Create a merge commit\" thay vì \"Squash and merge\".\n\n---\n\n## 📚 Tổng kết\n- Merge PR chính thức kết nạp mã nguồn tính năng vào nhánh chính của sản phẩm.\n- 3 chiến lược: Merge commit (giữ vết), Squash (nén thành 1), Rebase (làm phẳng).\n- Luôn xóa nhánh tính năng sau khi merge để giữ kho lưu trữ luôn sạch đẹp.\n",
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
