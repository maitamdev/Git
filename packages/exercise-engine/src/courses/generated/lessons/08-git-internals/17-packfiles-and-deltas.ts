import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "17-packfiles-and-deltas",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "17-packfiles-and-deltas",
    "title": "Đóng gói Packfiles và nén sai biệt Delta Compression",
    "level": "advanced",
    "duration": 35,
    "xp": 95,
    "prerequisites": [
      "16-object-graph-traversal"
    ],
    "objectives": [
      "Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).",
      "Hiểu object trong pack có thể được lưu đầy đủ hoặc dưới dạng delta dựa trên một object khác; lựa chọn base không cố định theo tuổi phiên bản.",
      "Sử dụng git verify-pack và git count-objects để kiểm tra pack và thống kê object."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "packfiles",
      "delta compression",
      "loose objects",
      "git pack",
      "storage optimization"
    ],
    "commands": [
      "git verify-pack -v <path-to-pack.idx>",
      "git count-objects -v"
    ]
  },
  "content": "# Đóng gói Packfiles và nén sai biệt Delta Compression\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).\n- Làm chủ cơ chế nén sai biệt Delta Compression: lưu một phiên bản gốc (base) và các bản vi phân chênh lệch nhỏ.\n- Hiểu vai trò của cặp tệp `.pack` (dữ liệu nén) và `.idx` (bảng chỉ mục tìm kiếm nhanh).\n- Kiểm tra pack/index bằng `git verify-pack` và xem thống kê bằng `git count-objects`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Packfile (.pack) và index (.idx)\n- **Nói dễ hiểu**: Packfile chứa nhiều object đã đóng gói; file `.idx` giúp Git tìm object trong pack.\n- **Ví dụ**: Repository vừa clone có thể chứa object trong một hoặc nhiều pack thay vì hàng loạt tệp loose.\n- **Đừng nhầm**: Đóng gói không đổi object ID; độ dài ID phụ thuộc hash format của repository.\n\n### Delta compression\n- **Nói dễ hiểu**: Một object trong pack có thể được lưu dưới dạng chỉ dẫn tái tạo dựa trên một object khác, thay vì lặp lại toàn bộ dữ liệu.\n- **Ví dụ**: Hai phiên bản gần giống nhau có thể nén tốt hơn nếu một phiên bản được biểu diễn bằng phần khác biệt.\n- **Đừng nhầm**: Git không đảm bảo một thay đổi nhỏ luôn tạo delta nhỏ; object nào làm base cũng không cố định theo thứ tự mới nhất/cũ nhất.\n\n### Base object và delta object\n- **Nói dễ hiểu**: Base được lưu đủ dữ liệu; delta lưu cách tái tạo object từ một base hoặc delta khác trong pack.\n- **Ví dụ**: `git verify-pack -v <pack>.idx` có thể hiện độ sâu delta và ID của base object.\n- **Đừng nhầm**: Cách Git chọn base là chi tiết tối ưu hóa; đừng suy ra nó luôn chọn phiên bản mới nhất.\n\n---\n\n## 📖 Định nghĩa\nGit có thể lưu object dưới dạng loose object hoặc gộp chúng vào packfile. Một pack thường đi kèm file `.idx`, giúp định vị object trong pack. Pack entry có thể chứa object đầy đủ hoặc delta dựa trên object khác; Git chọn cách đóng gói để cân bằng dung lượng và tốc độ. Cấu trúc pack không buộc base phải là phiên bản mới nhất, và không phải mọi object trong pack đều được lưu bằng delta.\n\n---\n\n## 🤔 Tại sao cần?\nPackfile giảm chi phí lưu trữ nhiều object và giúp Git truyền dữ liệu theo lô. Mức tiết kiệm tùy nội dung và lịch sử; có repository tạo nhiều pack, và dữ liệu không nhất thiết vừa một pack duy nhất. Object ID vẫn xác định nội dung logic sau khi giải nén.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy tưởng tượng mỗi object là một bản tài liệu. Packfile gom nhiều object vào một gói; một số object có thể lưu đầy đủ, còn một số được ghi như chỉ dẫn tái tạo dựa trên object khác. Cách chọn base và mức tiết kiệm tùy dữ liệu, nên không có bảo đảm rằng bản mới nhất luôn là base hay mọi object đều được delta.\n\n---\n\n## 🖼 Sơ đồ\n```text\nChuyển đổi từ Loose Objects sang Packfile với Delta Compression:\nTrước khi đóng gói (Loose Objects):\n[Blob v1: 10 MB]   [Blob v2: 10 MB]   [Blob v3: 10 MB] ──► Tổng: 30 MB đĩa\n\nSau khi đóng gói (Packfile + Delta Compression):\n┌────────────────────────────────────────────────────────┐\n│ PACKFILE (.git/objects/pack/pack-xxx.pack)              │\n│ - Một object có thể lưu đủ dữ liệu (base)               │\n│ - Object gần giống có thể lưu thành delta               │\n│ - Delta có thể phụ thuộc base hoặc delta khác           │\n└────────────────────────────────────────────────────────┘\n──► Mức giảm phụ thuộc nội dung, lựa chọn base và cách Git đóng gói.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một repository thử nghiệm, người học tìm cặp `.pack` / `.idx` dưới đường dẫn objects/pack, rồi chạy `git verify-pack -v <path-to-pack.idx>`. Lệnh nhận file `.idx`; kết quả verbose liệt kê object trong pack, kích thước và thông tin delta nếu có. Nếu chưa có pack, không có gì để verify — đừng tạo dữ liệu nhân tạo trong repository dự án.\n\n---\n\n## 💻 Command\n```bash\n# Thống kê số lượng loose objects và packed objects\ngit count-objects -v\n\n# Kiểm tra một pack bằng tệp index đi kèm\ngit verify-pack -v <path-to-pack.idx>\n\n# Chỉ chạy trong repository thử nghiệm; git gc thay đổi dữ liệu nội bộ\ngit gc\n```\n\n---\n\n## 🔍 Giải thích command\n- `git count-objects -v`: Báo cáo số object loose (`count`), object packed (`in-pack`), dung lượng pack và object có thể được đóng gói.\n- `git gc`: Chạy bảo trì như đóng gói, dọn reflog và thu hồi object hết hạn; có thể thay đổi dữ liệu nội bộ nên không dùng để thử trên repo quan trọng.\n- `git verify-pack -v <path-to-pack.idx>`: Kiểm tra file index và pack tương ứng, đồng thời liệt kê thông tin object.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cho rằng base luôn là phiên bản mới nhất**: Git có thể chọn nhiều cách đóng gói; hãy đọc dữ liệu của pack cụ thể thay vì ghi nhớ một quy tắc không được bảo đảm.\n2. **Tự ý xóa `.idx` hoặc `.pack`**: Hai tệp làm việc cùng nhau; xóa thủ công có thể khiến object trong pack không đọc được.\n3. **Cho rằng object ID đổi khi pack**: ID xác định object logic, không phụ thuộc việc object được lưu loose hay packed.\n\n---\n\n## 🧪 Lab\nChạy trong Bash/Git Bash và tạo repository tạm. `git gc` có thể dọn object unreachable và reflog hết hạn; không chạy phần này trong repo dự án.\n\n```bash\nmkdir git-pack-lab\ncd git-pack-lab\ngit init\ngit config user.name \"Git Learner\"\ngit config user.email \"learner@example.com\"\necho \"version one\" > note.txt\ngit add note.txt\ngit commit -m \"version one\"\necho \"version two\" >> note.txt\ngit add note.txt\ngit commit -m \"version two\"\necho \"version three\" >> note.txt\ngit add note.txt\ngit commit -m \"version three\"\n\ngit count-objects -v\ngit gc\ngit count-objects -v\ngit verify-pack -v \"$(git rev-parse --git-path objects/pack)\"/pack-*.idx\n```\n\n1. **Bước 1**: So sánh `count`, `in-pack` và `size-pack` trước/sau `git gc`; số liệu có thể khác nhau giữa phiên bản Git.\n2. **Bước 2**: Đọc các dòng `git verify-pack -v`; chúng có thể cho biết object đầy đủ hoặc delta. Pack nhỏ có thể không có delta.\n3. **Bước 3**: Nếu wildcard không tìm thấy `.idx`, xem đường dẫn in từ `git rev-parse --git-path objects/pack` và chọn file `.idx` trong đó.\n\n---\n\n## 💡 Hint\n> `git gc` là bảo trì repository, không phải lệnh xem thử vô hại. Học trên repo tạm và so sánh kết quả `git count-objects -v` trước/sau.\n\n---\n\n## ✅ Validation\n- `git count-objects -v` cho biết số object loose và pack; số lượng thay đổi tùy repository và phiên bản Git.\n- `git verify-pack -v <path-to-pack.idx>` xác nhận pack/index hợp lệ nếu repository có pack.\n\n---\n\n## ❓ Quiz\nHãy kiểm tra kiến thức về cơ chế Packfile và nén sai biệt Delta qua bài trắc nghiệm trong phần bên dưới.\n\n---\n\n## 🔥 Challenge\nTrong output của `git verify-pack -v`, hãy tìm một object được lưu bằng delta. Object đó phụ thuộc base nào? Tại sao không nên kết luận Git luôn chọn phiên bản mới nhất làm base chỉ từ một ví dụ?\n\n---\n\n## 📚 Tổng kết\n- Loose objects lưu từng object riêng; repository có thể có một hoặc nhiều packfile chứa nhiều object.\n- Một pack entry có thể là object đầy đủ hoặc delta; Git chọn cách lưu để cân bằng dung lượng và tốc độ.\n- Tệp `.idx` đóng vai trò là bảng mục lục tra cứu nhanh vị trí byte của từng đối tượng trong tệp `.pack`.\n- Packfiles cho phép Git truyền và lưu nhiều object theo lô; hiệu quả phụ thuộc nội dung và repository.\n",
  "quiz": {
    "id": "quiz-08-git-internals-17-packfiles-and-deltas",
    "title": "Trắc nghiệm: Đóng gói Packfiles và nén sai biệt Delta Compression",
    "questions": [
      {
        "id": "q1",
        "question": "Quy tắc nào mô tả đúng việc Git chọn base object cho delta trong một packfile?",
        "type": "single",
        "options": [
          {
            "text": "Không có quy tắc cố định rằng base luôn là phiên bản mới nhất hay cũ nhất",
            "correct": true
          },
          {
            "text": "Phiên bản đầu tiên cách đây 10 năm",
            "correct": false
          },
          {
            "text": "Một phiên bản ngẫu nhiên ở giữa",
            "correct": false
          },
          {
            "text": "Mọi object trong pack đều luôn là delta",
            "correct": false
          }
        ],
        "explanation": "Git có thể lưu object đầy đủ hoặc delta và chọn cách đóng gói phù hợp; người học nên đọc pack cụ thể thay vì giả định base theo tuổi phiên bản."
      },
      {
        "id": "q2",
        "question": "Vai trò của tệp .idx (Index File) đi kèm với tệp .pack trong thư mục objects/pack/ là gì?",
        "type": "single",
        "options": [
          {
            "text": "Làm bảng chỉ mục cho phép tìm kiếm nhanh vị trí byte chính xác của một đối tượng trong tệp pack khổng lồ",
            "correct": true
          },
          {
            "text": "Chứa danh sách tên người dùng của kho lưu trữ",
            "correct": false
          },
          {
            "text": "Chứa bản dịch tiếng Việt của Git",
            "correct": false
          },
          {
            "text": "Dùng để sao lưu dự phòng khi mất điện",
            "correct": false
          }
        ],
        "explanation": "File `.idx` ánh xạ object ID tới vị trí trong pack tương ứng, nhờ đó Git tra cứu object mà không phải giải nén toàn bộ pack."
      },
      {
        "id": "q3",
        "question": "Lệnh nào kiểm tra pack thông qua tệp index `.idx` và có thể in danh sách object cùng thông tin delta?",
        "type": "single",
        "options": [
          {
            "text": "git verify-pack -v <pack>.idx",
            "correct": true
          },
          {
            "text": "git check-pack",
            "correct": false
          },
          {
            "text": "git unzip-pack",
            "correct": false
          },
          {
            "text": "git inspect-bundle",
            "correct": false
          }
        ],
        "explanation": "`git verify-pack` nhận một hay nhiều file `.idx`; cờ `-v` yêu cầu in các object và thông tin delta của pack tương ứng."
      },
      {
        "id": "q4",
        "question": "Khi object được đóng gói từ dạng loose vào packfile, object ID của nó có đổi không?",
        "type": "single",
        "options": [
          {
            "text": "Hoàn toàn không thay đổi",
            "correct": true
          },
          {
            "text": "Có, toàn bộ mã băm bị tính toán lại",
            "correct": false
          },
          {
            "text": "Mã băm bị rút ngắn xuống còn 10 ký tự",
            "correct": false
          },
          {
            "text": "Tùy thuộc vào hệ điều hành",
            "correct": false
          }
        ],
        "explanation": "Object ID được tính từ nội dung object logic nên cách lưu loose hay packed không làm đổi ID; thuật toán hash tùy repository."
      },
      {
        "id": "q5",
        "question": "Lệnh nào sau đây chủ động kích hoạt quy trình tối ưu hóa và đóng gói các Loose Objects vào Packfiles?",
        "type": "single",
        "options": [
          {
            "text": "git gc (Garbage Collection)",
            "correct": true
          },
          {
            "text": "git clean -fd",
            "correct": false
          },
          {
            "text": "git compress-all",
            "correct": false
          },
          {
            "text": "git pack-force",
            "correct": false
          }
        ],
        "explanation": "`git gc` chạy các tác vụ bảo trì như đóng gói và dọn dữ liệu hết hạn; nó có thể làm thay đổi repository và không bảo đảm mọi loose object sẽ thành pack ngay."
      }
    ]
  }
};
export default lesson;
