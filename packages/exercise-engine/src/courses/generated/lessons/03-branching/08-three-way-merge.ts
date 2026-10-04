import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "08-three-way-merge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "08-three-way-merge",
    "title": "Hợp nhất khi hai nhánh đã phân kỳ (3-way merge)",
    "level": "intermediate",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "07-fast-forward-merge"
    ],
    "objectives": [
      "Giải thích vai trò của tổ tiên chung, nhánh hiện tại và nhánh nguồn.",
      "Nhận biết khi hai nhánh có commit riêng thì cần hợp nhất ba chiều.",
      "Tạo merge commit và xác nhận thay đổi của cả hai nhánh được giữ lại."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "three-way-merge"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "3-way merge",
      "merge commit",
      "common ancestor",
      "hop nhat ba chieu",
      "phan ky"
    ],
    "commands": [
      "git switch main",
      "git merge <tên-nhánh-tính-năng>",
      "git status",
      "git log --oneline"
    ]
  },
  "content": "# Hợp nhất khi hai nhánh đã phân kỳ (3-way merge)\n\n---\n\n## 🎯 Mục tiêu\n- Thấu suốt thuật toán 3-Way Merge và vai trò cốt lõi của điểm mốc Tổ tiên chung (Common Ancestor).\n- Nhận diện chính xác tình huống lịch sử phân kỳ bắt buộc phải tạo commit hợp nhất (Merge Commit).\n- Thực hành quy trình gộp hai luồng công việc độc lập một cách an toàn và tự tin.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### 3-way merge — hợp nhất ba chiều\n- **Nói dễ hiểu:** Thuật toán tự động đối chiếu 3 điểm: tổ tiên chung, đỉnh nhánh hiện tại và đỉnh nhánh cần gộp để tích hợp mã nguồn.\n- **Ví dụ:** Nhánh `main` sửa file giới thiệu, nhánh `feature` thêm trang liên hệ; Git dùng 3-way merge để gộp cả hai.\n- **Đừng nhầm:** 3-way merge hoàn toàn không đồng nghĩa với xung đột (conflict); đa phần các trường hợp Git tự động xử lý êm đẹp.\n\n### Common ancestor — tổ tiên chung\n- **Nói dễ hiểu:** Mốc commit gần nhất trong quá khứ mà cả hai nhánh cùng chia sẻ chung trước thời điểm rẽ nhánh.\n- **Ví dụ:** Cả nhánh `main` và nhánh tính năng đều xuất phát từ commit C2; commit C2 chính là tổ tiên chung.\n- **Đừng nhầm:** Thuật toán Git tự động truy tìm mốc tổ tiên này theo đồ thị DAG, bạn không cần phải tính toán thủ công.\n\n### Merge commit — commit hợp nhất\n- **Nói dễ hiểu:** Một commit đặc biệt đóng vai trò điểm giao thoa lịch sử, sở hữu tới 2 commit cha (parents) thay vì 1 cha như bình thường.\n- **Ví dụ:** Khi gộp nhánh tính năng vào nhánh chính có phân kỳ, Git tự sinh commit có thông điệp `Merge branch 'feature-contact'`.\n- **Đừng nhầm:** Trong trường hợp Fast-forward merge, Git sẽ không tạo ra commit hợp nhất này.\n\n---\n\n## 📖 Định nghĩa\n3-Way Merge (hợp nhất 3 chiều) là thuật toán gộp thông minh của Git khi hai nhánh đã rẽ nhánh phân kỳ và cùng sở hữu những commit độc lập. Thay vì chỉ đối chiếu hai đỉnh nhánh, Git tìm lại điểm nút rẽ nhánh trong quá khứ gọi là tổ tiên chung (Common Ancestor). Bằng cách so sánh 3 trạng thái: Tổ tiên chung, Nhánh hiện tại và Nhánh nguồn, Git tự động kết hợp những thay đổi không giao thoa và tạo ra một Merge Commit đặc biệt có hai commit cha.\n\n---\n\n## 🤔 Tại sao cần?\nTrong môi trường làm việc nhóm thực tế, nhánh `main` không bao giờ đứng yên chờ bạn: trong 3 ngày bạn viết tính năng mới, đồng đội đã kịp hoàn thành và gộp 5 tính năng khác vào `main`. 3-Way Merge là phép màu giúp bạn tích hợp công sức của mình vào dòng chảy chính mà không ghi đè hay làm mất bất kỳ dòng code nào của đồng đội, miễn là các bạn không sửa đổi cùng một dòng code.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung bạn và người bạn cùng mang một bản hợp đồng gốc (Tổ tiên chung) về nhà chỉnh sửa. Bạn bổ sung điều khoản bảo hành ở trang 2; người bạn bổ sung điều khoản thanh toán ở trang 5. Khi hai bạn ngồi lại đối chiếu với bản gốc, cả hai điều khoản mới đều được ghép trọn vẹn vào bản hợp đồng cuối cùng (Merge Commit) mà không hề có bất kỳ tranh chấp nào.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCƠ CHẾ THUẬT TOÁN 3-WAY MERGE:\n\n                   ┌─── (C3: main sửa about.html) ───────┐\n(C2: Tổ tiên chung)                                      ▼\n                   └─── (C4: feature thêm contact.html) ─► [M5: Merge Commit]\n                                                           (Có 2 cha: C3 & C4)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn tạo nhánh `feature-contact` để thêm tệp `contact.html`. Cùng lúc đó, đồng đội đẩy một commit lên `main` để sửa nội dung tệp `about.html`. Khi bạn đứng ở `main` gõ `git merge feature-contact`, Git lập tức đối chiếu 3 mốc: vì thay đổi nằm ở hai file tách biệt, Git tự động gộp mượt mà và tạo ra một Merge Commit lưu giữ cả hai thành quả.\n\n---\n\n## 💻 Command\n```bash\ngit switch main\ngit merge feature-contact\ngit status\ngit log --oneline --graph\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch main`: Luôn đứng tại nhánh nhận mã nguồn trước khi khởi động tiến trình hợp nhất.\n- `git merge <tên-nhánh>`: Kích hoạt thuật toán 3-way merge nếu Git phát hiện lịch sử hai nhánh đã bị phân kỳ.\n- `git status`: Xác nhận quá trình merge đã kết thúc trọn vẹn mà không bị vướng mắc conflict dở dang.\n- `git log --oneline --graph`: Vẽ lại sơ đồ hợp nhất trực quan hiển thị hai nhánh chập lại thành một điểm nút.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Lầm tưởng 3-way merge luôn gây ra xung đột**: Phần lớn các trường hợp Git giải quyết tự động hoàn hảo nếu hai người sửa ở các file hoặc dòng code khác nhau.\n2. **Đứng nhầm ở nhánh tính năng để gộp**: Sẽ vô tình đưa mã nguồn của nhánh chính vào nhánh tính năng thay vì ngược lại.\n3. **Chủ quan không chạy kiểm thử sau khi merge**: Dù Git tự động ghép code không báo lỗi cú pháp, nhưng sự kết hợp logic giữa hai nhánh vẫn có thể gây bug nghiệp vụ.\n\n---\n\n## 🧪 Lab\n1. Chạy `git switch main` rồi tạo nhánh mới: `git switch -c feature-contact`.\n2. Tạo file `contact.html` với nội dung bất kỳ, chạy `git add contact.html` và `git commit -m \"feat: add contact page\"`.\n3. Chạy `git switch main` để trở về nhánh chính.\n4. Tạo file `about.html` với nội dung mới, chạy `git add about.html` và `git commit -m \"docs: add about page\"`.\n5. Đang ở `main`, chạy: `git merge feature-contact`.\n6. Chạy `git status` và `git log --oneline --graph` để tận mắt chiêm ngưỡng Merge Commit vừa xuất hiện!\n\n---\n\n## 💡 Hint\n> Khi hai nhánh sửa đổi ở các file khác nhau hoặc các dòng cách xa nhau, Git sẽ tự động tạo commit hợp nhất mà không làm phiền bạn!\n\n---\n\n## ✅ Validation\n- Cả hai file `about.html` và `contact.html` cùng xuất hiện đồng thời trong thư mục của nhánh `main`.\n- Lệnh `git log --oneline` hiển thị một commit hợp nhất mới nối liền hai nhánh.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để kiểm tra mức độ thấu hiểu của bạn về thuật toán 3-way merge và cách Git tìm tổ tiên chung.\n\n---\n\n## 🔥 Challenge\nHãy gõ lệnh `git show HEAD` ngay sau khi tạo merge commit thành công. Quan sát dòng `Merge: <cha-1> <cha-2>` ở đầu kết quả và giải thích ý nghĩa của hai mã commit hash được liệt kê tại đó!\n\n---\n\n## 📚 Tổng kết\n- 3-Way Merge là thuật toán hợp nhất thông minh đối chiếu ba điểm: Tổ tiên chung và hai đỉnh nhánh.\n- Merge Commit là mốc snapshot đặc biệt sở hữu hai commit cha đại diện cho hai luồng lịch sử giao nhau.\n- Luôn kiểm thử lại toàn bộ ứng dụng sau khi thực hiện hợp nhất để đảm bảo tính toàn vẹn logic.\n",
  "quiz": {
    "id": "quiz-03-08-three-way-merge",
    "title": "Trắc nghiệm: Hợp nhất ba chiều",
    "questions": [
      {
        "id": "q1",
        "question": "Khi hai nhánh đã có commit riêng, Git dựa vào những phiên bản nào để hợp nhất?",
        "type": "single",
        "options": [
          {
            "text": "Tổ tiên chung, phiên bản của nhánh hiện tại và phiên bản của nhánh được gộp",
            "correct": true
          },
          {
            "text": "Ba commit mới nhất bất kỳ trong repository",
            "correct": false
          },
          {
            "text": "Chỉ phiên bản mới nhất của nhánh hiện tại",
            "correct": false
          },
          {
            "text": "Chỉ phiên bản đầu tiên được tạo bằng git init",
            "correct": false
          }
        ],
        "explanation": "Git so sánh Base, Ours và Theirs để biết mỗi nhánh đã thay đổi gì kể từ mốc chung."
      },
      {
        "id": "q2",
        "question": "Tổ tiên chung là gì trong tình huống hai nhánh phân kỳ?",
        "type": "single",
        "options": [
          {
            "text": "Commit gần nhất mà lịch sử của cả hai nhánh cùng có trước khi tách",
            "correct": true
          },
          {
            "text": "Commit mới nhất trên nhánh được gộp",
            "correct": false
          },
          {
            "text": "Tên gọi khác của nhánh main",
            "correct": false
          },
          {
            "text": "Một tệp tạm do người dùng phải tự tạo",
            "correct": false
          }
        ],
        "explanation": "Git dùng tổ tiên chung làm mốc để so sánh hai luồng thay đổi sau khi chúng tách ra."
      },
      {
        "id": "q3",
        "question": "Một nhánh sửa `about.html`, nhánh kia thêm `contact.html`. Thường điều gì xảy ra khi merge?",
        "type": "single",
        "options": [
          {
            "text": "Git có thể kết hợp tự động vì hai thay đổi nằm ở các tệp khác nhau",
            "correct": true
          },
          {
            "text": "Git luôn báo conflict khi có hai nhánh",
            "correct": false
          },
          {
            "text": "Git xóa một tệp để chỉ giữ lại một nhánh",
            "correct": false
          },
          {
            "text": "Git tự tạo thêm một nhánh thứ ba",
            "correct": false
          }
        ],
        "explanation": "Thay đổi độc lập ở các tệp khác nhau thường có thể kết hợp tự động, dù vẫn cần kiểm tra kết quả."
      },
      {
        "id": "q4",
        "question": "Git tạo merge commit có ý nghĩa gì sau khi hai nhánh phân kỳ?",
        "type": "single",
        "options": [
          {
            "text": "Ghi trạng thái kết quả và nối hai lịch sử bằng hai commit cha",
            "correct": true
          },
          {
            "text": "Xóa tổ tiên chung khỏi lịch sử",
            "correct": false
          },
          {
            "text": "Chứng minh rằng toàn bộ kiểm thử của ứng dụng đã thành công",
            "correct": false
          },
          {
            "text": "Đổi tên nhánh được gộp",
            "correct": false
          }
        ],
        "explanation": "Merge commit nối đầu hai nhánh; việc kiểm thử vẫn cần được thực hiện riêng."
      },
      {
        "id": "q5",
        "question": "Trong lệnh `git merge feature-contact`, nếu bạn đang đứng trên `main`, nhánh nào nhận kết quả?",
        "type": "single",
        "options": [
          {
            "text": "`main`, vì merge cập nhật nhánh hiện tại",
            "correct": true
          },
          {
            "text": "`feature-contact`, vì tên nhánh đứng sau lệnh",
            "correct": false
          },
          {
            "text": "Cả hai nhánh đều tự di chuyển đến cùng một commit",
            "correct": false
          },
          {
            "text": "Không nhánh nào; lệnh chỉ xem lịch sử",
            "correct": false
          }
        ],
        "explanation": "Lệnh merge đưa thay đổi của nhánh nguồn vào nhánh hiện tại, nên cần kiểm tra mình đang đứng đúng nhánh."
      },
      {
        "id": "q6",
        "question": "Hai nhánh cùng sửa một đoạn nội dung theo cách không thể kết hợp tự động. Git thường làm gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạm dừng merge và yêu cầu người dùng giải quyết conflict",
            "correct": true
          },
          {
            "text": "Tự chọn ngẫu nhiên nội dung của một bên",
            "correct": false
          },
          {
            "text": "Xóa cả hai nhánh",
            "correct": false
          },
          {
            "text": "Tạo merge commit và bỏ qua phần nội dung mâu thuẫn",
            "correct": false
          }
        ],
        "explanation": "Khi không thể xác định cách kết hợp an toàn, Git dừng để người dùng chọn nội dung phù hợp."
      }
    ]
  }
};
export default lesson;
