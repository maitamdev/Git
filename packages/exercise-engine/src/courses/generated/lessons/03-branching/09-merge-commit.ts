import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "09-merge-commit",
  "moduleId": "03-branching",
  "metadata": {
    "id": "09-merge-commit",
    "title": "Merge commit là gì?",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "08-three-way-merge"
    ],
    "objectives": [
      "Phân biệt commit thường với merge commit qua số lượng commit cha.",
      "Giải thích điều mà merge commit ghi lại và điều nó không chứng minh.",
      "Dùng `git show` và `git log` để tìm merge commit, đọc hai commit cha."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "merge commit",
      "hai commit cha",
      "parents",
      "dag node",
      "linear vs non-linear"
    ],
    "commands": [
      "git show <merge-commit-hash>",
      "git log --merges --oneline",
      "git log --no-merges --oneline"
    ]
  },
  "content": "# Merge commit là gì?\n\n---\n\n## 🎯 Mục tiêu\n- Phân biệt bản chất giữa commit đơn thông thường và Merge Commit qua số lượng commit cha (parents).\n- Hiểu rõ giá trị lịch sử và ý nghĩa ngữ cảnh mà Merge Commit mang lại cho dự án.\n- Sử dụng thành thạo `git show` và bộ lọc `git log --merges` để thanh tra các mốc hợp nhất.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Merge commit — commit hợp nhất\n- **Nói dễ hiểu:** Cột mốc snapshot đặc biệt ghi lại kết quả của việc kết hợp hai nhánh độc lập có lịch sử phân kỳ.\n- **Ví dụ:** Git tự sinh commit có thông điệp `Merge branch 'feature-cart' into main` sau khi gộp nhánh.\n- **Đừng nhầm:** Merge commit chỉ sinh ra khi có sự phân kỳ lịch sử hoặc khi dùng cờ `--no-ff`; các lần gộp dạng Fast-forward không tạo commit này.\n\n### Parent commit — commit cha\n- **Nói dễ hiểu:** Mốc commit đứng ngay liền trước commit hiện tại trong cây phả hệ lịch sử của Git.\n- **Ví dụ:** Commit thông thường chỉ có đúng 1 cha; riêng merge commit sở hữu từ 2 cha trở lên đại diện cho các nhánh được gộp.\n- **Đừng nhầm:** Commit khởi tạo đầu tiên của kho mã nguồn là commit duy nhất không có bất kỳ commit cha nào.\n\n### `git log --merges` — lọc merge commit\n- **Nói dễ hiểu:** Cờ tùy chọn giúp bộ lọc của Git chỉ hiển thị các commit hợp nhất, loại bỏ toàn bộ các commit nhỏ lẻ.\n- **Ví dụ:** Chạy `git log --merges --oneline` để duyệt nhanh danh sách các đợt sáp nhập tính năng lớn vào dự án.\n- **Đừng nhầm:** Cờ `--no-merges` làm điều ngược lại: ẩn các commit hợp nhất để bạn chỉ đọc các commit code tính năng chi tiết.\n\n---\n\n## 📖 Định nghĩa\nMerge Commit là một commit cấu trúc đặc biệt sở hữu từ hai commit cha (parents) trở lên. Snapshot này đánh dấu điểm nút giao thoa lịch sử, tích hợp toàn bộ các thay đổi từ một nhánh nguồn vào nhánh đích. Bản thân merge commit đại diện cho thời khắc đồng bộ mã nguồn, giúp bảo toàn nguyên vẹn ngữ cảnh phát triển độc lập của cả hai nhánh.\n\n---\n\n## 🤔 Tại sao cần?\nKhi dự án phát triển với hàng chục kỹ sư, việc đọc lịch sử sẽ trở nên hỗn loạn nếu không có các mốc ghi nhận. Merge Commit giúp bạn nhận biết chính xác khi nào một tính năng lớn được sáp nhập vào nhánh chính, ai là người thực hiện tích hợp và nguồn gốc của từng dòng code. Nếu phát sinh lỗi nghiêm trọng trên production, bạn có thể dễ dàng hoàn tác (revert) toàn bộ cả tính năng chỉ qua mã định danh của merge commit này.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung hai con sông chảy song song bắt nguồn từ một ngọn núi. Khi hai dòng chảy hợp lưu tạo thành một con sông lớn hơn tại một ngã ba sông, điểm ngã ba đó chính là Merge Commit. Nhìn vào ngã ba sông, người đi thuyền biết rõ nước từ nhánh Tây và nhánh Đông đã hòa quyện vào nhau để tiếp tục hành trình ra biển lớn.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCẤU TRÚC PHẢ HỆ CỦA MERGE COMMIT:\n\n               (F1) ── (F2) ◄── [feature-cart]\n              /            \\\n(C1) ── (M1) ─              ──► [M2: Merge Commit] ◄── [main]\n        (main)\n  \n  M2 có 2 commit cha trực tiếp: M1 (trên main) và F2 (trên feature-cart).\n  Chạy `git show M2`: dòng đầu tiên ghi rõ `Merge: M1_hash F2_hash`.\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn phát triển trang giỏ hàng trên nhánh `feature-cart` với 5 commit. Trong lúc đó, Tech Lead cập nhật cấu hình bảo mật trên `main` với 2 commit. Khi merge `feature-cart` vào `main`, Git tạo ra commit hợp nhất mang mã `m1a2b3c`. Nhìn vào đồ thị `git log`, bất kỳ ai cũng thấy rõ nhánh giỏ hàng đã hoàn thành và hòa vào dòng chảy chính.\n\n---\n\n## 💻 Command\n```bash\ngit log --merges --oneline\ngit show HEAD\ngit log --no-merges --oneline\ngit log --graph --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git log --merges --oneline`: Chỉ lọc và in ra các commit hợp nhất; mỗi commit hiển thị trên một dòng ngắn.\n- `git show HEAD`: Soi chi tiết commit hiện tại; nếu là merge commit, bạn sẽ thấy dòng `Merge: <cha-1> <cha-2>`.\n- `git log --no-merges --oneline`: Bỏ qua các commit gộp, chỉ xem các commit nghiệp vụ đơn thuần do lập trình viên gõ code.\n- `git log --graph --oneline`: Hiển thị đồ thị cây nhánh trực quan bằng các đường nối ký tự ASCII.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng merge commit chứng minh code đã hết lỗi**: Merge commit chỉ xác nhận hai luồng lịch sử đã gộp vào nhau; chất lượng code vẫn phụ thuộc vào bộ unit test và code review.\n2. **Nghĩ rằng mọi lần merge đều sinh ra merge commit**: Như đã học ở bài trước, Fast-forward merge chỉ trượt con trỏ chứ không sinh ra merge commit.\n3. **Cố gắng xóa merge commit thủ công**: Xóa nhầm merge commit có thể làm đứt gãy phả hệ lịch sử của cả nhánh tính năng.\n\n---\n\n## 🧪 Lab\n1. Trên nhánh `main`, tạo file `history-main.txt`, gõ một dòng nội dung rồi chạy `git add` và `git commit -m \"docs: add main note\"`.\n2. Tạo nhánh mới `git switch -c feature-history`, tạo file `history-feature.txt`, gõ nội dung rồi add và commit.\n3. Quay về nhánh chính `git switch main`, sau đó chạy lệnh: `git merge feature-history`.\n4. Chạy `git show HEAD` và quan sát dòng `Merge:` để đếm đủ hai mã commit cha.\n5. Chạy `git log --merges --oneline` để thấy merge commit vừa tạo xuất hiện trong danh sách lọc.\n\n---\n\n## 💡 Hint\n> Dòng `Merge: <hash1> <hash2>` trong `git show` chính là bằng chứng xác thực nhất khẳng định commit hiện tại là một Merge Commit!\n\n---\n\n## ✅ Validation\n- Lệnh `git log --merges --oneline` lọc ra chính xác commit hợp nhất vừa tạo.\n- Lệnh `git show HEAD` hiển thị hai mã cha ở phần thông tin tiêu đề.\n- `git log --no-merges --oneline` loại trừ merge commit này khỏi danh sách.\n\n---\n\n## ❓ Quiz\nTrả lời bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về đặc tính hai cha của Merge Commit và cách tra cứu lịch sử.\n\n---\n\n## 🔥 Challenge\nHãy so sánh sự khác nhau về mặt đồ thị và khả năng truy vết giữa việc giữ lại merge commit (Merge commit workflow) và việc là phẳng lịch sử không có merge commit (Rebase workflow). Đội ngũ của bạn nên ưu tiên phong cách nào trong tình huống nào?\n\n---\n\n## 📚 Tổng kết\n- Merge commit là mốc snapshot đặc biệt sở hữu từ hai commit cha trở lên.\n- Đóng vai trò là cầu nối liên kết lịch sử của hai nhánh đã từng rẽ nhánh độc lập.\n- Sử dụng `git log --merges` và `git log --no-merges` để linh hoạt điều chỉnh góc nhìn lịch sử dự án.\n",
  "quiz": {
    "id": "quiz-03-09-merge-commit",
    "title": "Trắc nghiệm: Merge commit",
    "questions": [
      {
        "id": "q1",
        "question": "Điểm nào phân biệt merge commit với commit thông thường trong lịch sử phân kỳ?",
        "type": "single",
        "options": [
          {
            "text": "Merge commit có từ hai commit cha trở lên",
            "correct": true
          },
          {
            "text": "Merge commit không có mã định danh",
            "correct": false
          },
          {
            "text": "Merge commit không lưu trạng thái tệp",
            "correct": false
          },
          {
            "text": "Merge commit chỉ được tạo bởi quản trị viên",
            "correct": false
          }
        ],
        "explanation": "Commit thông thường sau commit gốc thường có một cha, còn merge commit nối nhiều luồng lịch sử."
      },
      {
        "id": "q2",
        "question": "Lệnh nào lọc lịch sử để chỉ xem các merge commit?",
        "type": "single",
        "options": [
          {
            "text": "git log --merges --oneline",
            "correct": true
          },
          {
            "text": "git log --only-combine",
            "correct": false
          },
          {
            "text": "git show --merge-list",
            "correct": false
          },
          {
            "text": "git filter --merge-nodes",
            "correct": false
          }
        ],
        "explanation": "Tùy chọn --merges chỉ giữ các commit có nhiều hơn một commit cha trong kết quả git log."
      },
      {
        "id": "q3",
        "question": "Merge commit cho biết điều gì về lịch sử dự án?",
        "type": "single",
        "options": [
          {
            "text": "Thời điểm hai luồng lịch sử được nối và trạng thái kết quả",
            "correct": true
          },
          {
            "text": "Chắc chắn mọi bài kiểm thử đều đạt",
            "correct": false
          },
          {
            "text": "Chắc chắn một người quản lý đã phê duyệt thay đổi",
            "correct": false
          },
          {
            "text": "Ai đã tạo repository đầu tiên",
            "correct": false
          }
        ],
        "explanation": "Commit ghi lịch sử tích hợp và trạng thái tệp, nhưng review và kiểm thử phải được xác nhận ở nơi khác."
      },
      {
        "id": "q4",
        "question": "Khi `git show HEAD` đang trỏ tới merge commit, dòng `Merge:` cho biết gì?",
        "type": "single",
        "options": [
          {
            "text": "Mã định danh của hai commit cha",
            "correct": true
          },
          {
            "text": "Danh sách tệp bị xóa",
            "correct": false
          },
          {
            "text": "Tên người đã duyệt pull request",
            "correct": false
          },
          {
            "text": "Tên remote của repository",
            "correct": false
          }
        ],
        "explanation": "Dòng Merge liệt kê các commit cha, giúp nhận ra hai lịch sử đã được nối."
      },
      {
        "id": "q5",
        "question": "`git log --no-merges --oneline` làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Ẩn merge commit khỏi danh sách kết quả, không xóa chúng",
            "correct": true
          },
          {
            "text": "Xóa các merge commit khỏi repository",
            "correct": false
          },
          {
            "text": "Chỉ hiện commit đã được kiểm thử",
            "correct": false
          },
          {
            "text": "Tạo nhánh mới cho từng commit",
            "correct": false
          }
        ],
        "explanation": "Đây là bộ lọc cách hiển thị lịch sử; nội dung và commit trong repository không bị thay đổi."
      },
      {
        "id": "q6",
        "question": "Vì sao fast-forward merge thường không tạo merge commit?",
        "type": "single",
        "options": [
          {
            "text": "Vì đầu nhánh hiện tại có thể được di chuyển thẳng tới commit mới hơn",
            "correct": true
          },
          {
            "text": "Vì Git xóa các commit trên nhánh nguồn",
            "correct": false
          },
          {
            "text": "Vì fast-forward chỉ hoạt động khi không có repository",
            "correct": false
          },
          {
            "text": "Vì Git tự đổi fast-forward thành squash",
            "correct": false
          }
        ],
        "explanation": "Nếu lịch sử nhánh hiện tại đã nằm phía trước nhánh nguồn, Git chỉ cần di chuyển con trỏ nhánh."
      }
    ]
  }
};
export default lesson;
