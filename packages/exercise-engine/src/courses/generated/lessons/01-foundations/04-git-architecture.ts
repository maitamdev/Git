import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "04-git-architecture",
  "moduleId": "01-foundations",
  "metadata": {
    "id": "04-git-architecture",
    "title": "Git hoạt động như thế nào?",
    "level": "beginner",
    "duration": 25,
    "xp": 70,
    "prerequisites": [
      "03-git-la-gi"
    ],
    "objectives": [
      "Phân biệt rõ ràng sự khác biệt giữa mô hình lưu trữ Delta (sự khác biệt) và Snapshot (ảnh chụp tức thời).",
      "Hiểu khái niệm Directed Acyclic Graph (DAG) và cách Git liên kết các commit bằng mã băm SHA.",
      "Nắm bắt sơ bộ cấu trúc các đối tượng cốt lõi trong Git: Blob, Tree, Commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "kien truc git",
      "snapshot",
      "delta",
      "dag",
      "blob",
      "tree",
      "commit"
    ],
    "commands": [
      "git status",
      "git log --oneline"
    ]
  },
  "content": "# Git hoạt động như thế nào?\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt rõ ràng sự khác biệt giữa mô hình lưu trữ Delta (sự khác biệt) và Snapshot (ảnh chụp tức thời).\n- Hiểu khái niệm Directed Acyclic Graph (DAG) và cách Git liên kết các commit bằng mã băm SHA.\n- Nắm bắt sơ bộ cấu trúc các đối tượng cốt lõi trong Git: Blob, Tree, Commit.\n\n---\n\n## 📖 Định nghĩa\n> Về mặt kiến trúc, Git không lưu trữ dữ liệu dưới dạng danh sách các thay đổi dòng code (Delta-based) như các hệ thống VCS truyền thống, mà lưu trữ dữ liệu dưới dạng một chuỗi các ảnh chụp tức thời hoàn chỉnh (Snapshots) của toàn bộ hệ thống tệp tin theo thời gian. Nếu một tệp không có sự thay đổi giữa các phiên bản, Git sẽ thông minh không nhân bản dữ liệu mà chỉ tạo một con trỏ liên kết trỏ lại tệp cũ đã lưu. Lịch sử của Git được tổ chức dưới dạng một đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n\n---\n\n## 🤔 Tại sao cần?\nNắm bắt được kiến trúc Snapshot và mô hình đồ thị DAG giúp bạn hiểu được gốc rễ mọi hành vi của Git. Khi bạn hiểu rằng nhánh (branch) thực chất chỉ là một con trỏ nhẹ có thể di chuyển trỏ đến một đỉnh trong đồ thị DAG, bạn sẽ không còn cảm thấy hoang mang khi chuyển nhánh, gộp nhánh hay giải quyết xung đột mã nguồn. Điều này biến việc học Git từ học vẹt thành tư duy trực quan sắc bén.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng kiến trúc của Git giống như một cuốn sổ chụp ảnh gia đình qua nhiều thế hệ. Thay vì ghi chép lại rằng \"năm nay bố mọc thêm một sợi râu bạc, con cao thêm hai xăng-ti-mét\", người thợ ảnh chụp lại toàn bộ cả gia đình đứng trong phòng khách. Tuy nhiên, nếu chiếc bàn trà hay bộ ghế sofa không hề thay đổi sau mười năm, người thợ ảnh chỉ cần dán một mảnh giấy ghi chú mượn lại hình ảnh chiếc bàn từ album cũ, giúp cuốn sổ vừa trực quan vừa nhẹ nhàng.\n\n---\n\n## 🖼 Sơ đồ\n```text\nHệ thống cũ (Delta):                Git (Snapshots):\nFile A: [V1] ──> [Δ1] ──> [Δ2]      Snapshot 1: [File A v1] [File B v1]\nFile B: [V1] ───────────> [Δ1]      Snapshot 2: [File A v2] [File B (trỏ v1)]\n(Phải tính toán lại từ đầu)         Snapshot 3: [File A v3] [File B v2]\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nKhi bạn chỉnh sửa một dòng comment trong tệp `index.html` của dự án chứa hơn 500 hình ảnh và 100 tệp CSS, Git sẽ không lưu lại 500 hình ảnh đó một lần nữa. Git tạo ra một snapshot mới, trong đó tệp `index.html` được ghi nhận nội dung mới, còn 600 tệp tin còn lại chỉ được lưu dưới dạng tham chiếu trỏ về đối tượng cũ trong thư mục `.git/objects`. Nhờ vậy, kích thước kho lưu trữ của bạn cực kỳ nhỏ gọn dù trải qua hàng ngàn lần commit, đồng thời tốc độ tạo commit hay chuyển đổi giữa các nhánh diễn ra gần như tức thì mà không phải tính toán cộng dồn sự khác biệt phức tạp.\n\n---\n\n## 💻 Command\n```bash\ngit status\ngit log --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git status`: Hiển thị trạng thái hiện tại của Working Tree và Staging Area so với snapshot gần nhất, giúp bạn nhìn thấy rõ các tệp tin mới tạo hoặc bị sửa đổi trước khi ghi lại phiên bản.\n- `git log --oneline`: Hiển thị danh sách các commit trong lịch sử rút gọn trên một dòng với mã băm ngắn và thông điệp, tương ứng trực quan với các nút trên đồ thị DAG.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng Git lưu từng dòng code khác biệt**:  Git thực chất lưu trọn vẹn snapshot nội dung tệp tin và trỏ tái sử dụng tệp không đổi.\n2. **Sợ rằng dự án lớn sẽ làm Git bị phình to dung lượng**:  Nhờ cơ chế lưu trữ snapshot thông minh và nén packfile, Git quản lý dung lượng vô cùng tối ưu.\n3. **Nghĩ commit là một bản vá độc lập**:  Commit trong Git luôn chứa liên kết tham chiếu đến commit cha của nó trong đồ thị DAG.\n\n---\n\n## 🧪 Lab\n1. Thực hiện kiểm tra trạng thái ban đầu của kho lưu trữ bằng lệnh `git status`.\n2. Quan sát cách Git theo dõi sự khác biệt giữa thư mục làm việc và snapshot gần nhất.\n3. Sử dụng `git log --oneline` để hình dung các đỉnh của đồ thị lịch sử.\n\n---\n\n## 💡 Hint\n> Mỗi commit đại diện cho một ảnh chụp Snapshot toàn diện của dự án tại một thời điểm.\n\n---\n\n## ✅ Validation\n- Phân biệt chính xác giữa mô hình Delta và Snapshot trong Git.\n\n---\n\n## ❓ Quiz\nHoàn thành các câu hỏi dưới đây để kiểm tra kiến thức về kiến trúc Snapshot của Git.\n\n---\n\n## 🔥 Challenge\nVẽ sơ đồ biểu diễn 3 commit liên tiếp trong Git và giải thích cách các commit cha-con liên kết với nhau.\n\n---\n\n## 📚 Tổng kết\n- Git lưu trữ lịch sử dưới dạng chuỗi các ảnh chụp tức thời (Snapshots) thay vì sự khác biệt tệp (Deltas).\n- Nếu một tệp không thay đổi, Git chỉ trỏ lại blob dữ liệu cũ mà không hề sao chép lãng phí dung lượng.\n- Lịch sử commit trong Git tạo thành một đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n",
  "quiz": {
    "id": "quiz-04-git-architecture",
    "title": "Trắc nghiệm: Kiến trúc lưu trữ của Git",
    "questions": [
      {
        "id": "q1",
        "question": "Git lưu trữ dữ liệu của các mốc lịch sử theo mô hình nào dưới đây?",
        "type": "single",
        "options": [
          {
            "text": "Các ảnh chụp tức thời hoàn chỉnh (Snapshots)",
            "correct": true
          },
          {
            "text": "Danh sách các dòng code thay đổi khác biệt (Deltas)",
            "correct": false
          },
          {
            "text": "Các tệp tin nén zip chứa toàn bộ hệ điều hành",
            "correct": false
          },
          {
            "text": "Bảng dữ liệu quan hệ SQL theo từng cột dòng",
            "correct": false
          }
        ],
        "explanation": "Git coi dữ liệu như một chuỗi các snapshot của hệ thống tệp tin tại từng thời điểm commit."
      },
      {
        "id": "q2",
        "question": "Điều gì xảy ra khi bạn tạo một commit mới nhưng có rất nhiều tệp tin không hề bị chỉnh sửa?",
        "type": "single",
        "options": [
          {
            "text": "Git chỉ lưu một con trỏ tham chiếu trỏ lại tệp tin cũ đã có trong cơ sở dữ liệu",
            "correct": true
          },
          {
            "text": "Git nhân bản toàn bộ các tệp tin đó sang thư mục mới gây tốn dung lượng",
            "correct": false
          },
          {
            "text": "Git tự động xóa bỏ các tệp tin không bị chỉnh sửa khỏi dự án",
            "correct": false
          },
          {
            "text": "Git báo lỗi từ chối commit vì tệp tin không có sự thay đổi",
            "correct": false
          }
        ],
        "explanation": "Để tối ưu tốc độ và dung lượng, Git tái sử dụng con trỏ tới các blob tệp tin cũ không có thay đổi."
      },
      {
        "id": "q3",
        "question": "Cấu trúc dữ liệu nào được Git sử dụng để tổ chức mối liên kết lịch sử giữa các commit?",
        "type": "single",
        "options": [
          {
            "text": "Directed Acyclic Graph - DAG (Đồ thị có hướng không chu trình)",
            "correct": true
          },
          {
            "text": "Mảng một chiều tuyến tính cố định kích thước",
            "correct": false
          },
          {
            "text": "Ngăn xếp theo nguyên lý vào trước ra trước (FIFO Queue)",
            "correct": false
          },
          {
            "text": "Bảng băm đơn cấp không có con trỏ cha con",
            "correct": false
          }
        ],
        "explanation": "Lịch sử Git là một DAG (Directed Acyclic Graph), trong đó mỗi commit trỏ về một hoặc nhiều commit cha của nó."
      },
      {
        "id": "q4",
        "question": "Mã băm SHA của một commit trong Git được sinh ra dựa trên những yếu tố nào?",
        "type": "single",
        "options": [
          {
            "text": "Nội dung cây thư mục, thông điệp commit, tác giả, thời gian và mã hash của commit cha",
            "correct": true
          },
          {
            "text": "Chỉ dựa trên số thứ tự commit do người dùng tự nhập",
            "correct": false
          },
          {
            "text": "Tên của máy tính và địa chỉ IP kết nối mạng của bạn",
            "correct": false
          },
          {
            "text": "Số lượng dòng code có trong tệp tin lớn nhất của dự án",
            "correct": false
          }
        ],
        "explanation": "Mã băm SHA là hàm mật mã học tính toán từ toàn bộ dữ liệu nội dung, siêu dữ liệu tác giả, ngày giờ và cha của commit."
      }
    ]
  }
};
export default lesson;
