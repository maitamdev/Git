import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-branching-challenge",
  "moduleId": "03-branching",
  "metadata": {
    "id": "14-branching-challenge",
    "title": "Thử thách cuối Level 3: tạo nhánh, xử lý conflict và merge",
    "level": "intermediate",
    "duration": 40,
    "xp": 150,
    "prerequisites": [
      "12-merge-abort",
      "13-delete-rename-branch"
    ],
    "objectives": [
      "Tạo hai nhánh có commit riêng và gây conflict có chủ đích.",
      "Giải quyết conflict, tạo merge commit và xác nhận hai commit cha.",
      "Xóa an toàn nhánh đã merge."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "branching-challenge"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "challenge",
      "branching master",
      "tong hop",
      "conflict resolution",
      "workflow"
    ],
    "commands": [
      "git switch -c feature-challenge",
      "git switch main",
      "git merge feature-challenge",
      "git status",
      "git add challenge.txt",
      "git commit -m \"merge: combine challenge changes\"",
      "git show HEAD",
      "git branch -d feature-challenge"
    ]
  },
  "content": "# Thử thách cuối Level 3: tạo nhánh, xử lý conflict và merge\n\n---\n\n## 🎯 Mục tiêu\n- Tự tay thực hiện trọn vẹn chu trình làm việc với nhánh chuẩn kỹ sư: từ tách nhánh, gây phân kỳ, hợp nhất đến xử lý xung đột.\n- Làm chủ kỹ thuật Resolve Conflict và tạo Merge Commit hoàn chỉnh nối liền hai luồng lịch sử.\n- Dọn dẹp kho lưu trữ an toàn bằng việc xóa nhánh tính năng sau khi đã sáp nhập thành công.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Feature branch — nhánh tính năng\n- **Nói dễ hiểu:** Luồng làm việc độc lập được tách ra từ nhánh chính để phát triển riêng một tính năng mà không làm xáo trộn mã nguồn chung.\n- **Ví dụ:** Tạo nhánh `feature-challenge` để thử nghiệm tính năng thông báo mới.\n- **Đừng nhầm:** Nhánh tính năng chỉ có ý nghĩa tạm thời trong suốt vòng đời phát triển; sau khi gộp vào nhánh chính, nhánh này nên được dọn dẹp sạch sẽ.\n\n### Resolve conflict — giải quyết xung đột\n- **Nói dễ hiểu:** Nghệ thuật dung hòa và chắt lọc mã nguồn khi hai nhánh cùng can thiệp vào một vùng nội dung mâu thuẫn.\n- **Ví dụ:** Kết hợp hài hòa cả thông điệp bảo trì của nhánh chính lẫn thông điệp ưu đãi của nhánh tính năng thành một câu trọn vẹn.\n- **Đừng nhầm:** Không chọn bừa Current hay Incoming một cách máy móc; phải hiểu rõ yêu cầu nghiệp vụ của sản phẩm trước khi quyết định.\n\n### Merge commit — commit hợp nhất\n- **Nói dễ hiểu:** Mốc son snapshot lịch sử sở hữu 2 commit cha, ghi nhận thời điểm hoàn thành việc sáp nhập nhánh tính năng vào nhánh chính.\n- **Ví dụ:** Commit sinh ra với thông điệp `merge: combine challenge changes` nối liền hai luồng phân kỳ.\n- **Đừng nhầm:** Luôn đứng tại nhánh nhận (`main`) trước khi thực hiện merge để đảm bảo dòng chảy mã nguồn đi đúng hướng.\n\n---\n\n## 📖 Định nghĩa\nThử thách tổng kết Level 3 là bài kiểm tra thực chiến toàn diện mô phỏng 100% quy trình làm việc chuyên nghiệp tại các tập đoàn công nghệ: Khởi tạo commit gốc, tách nhánh tính năng (Feature branch), phát triển commit độc lập gây phân kỳ lịch sử, gộp nhánh, làm chủ và gỡ xung đột (Resolve conflict), niêm phong Merge commit và dọn dẹp nhánh an toàn.\n\n---\n\n## 🤔 Tại sao cần?\nHọc lý thuyết suông sẽ không bao giờ biến bạn thành một kỹ sư Git tự tin. Chỉ khi tự tay tạo ra xung đột, đối mặt với các vạch đánh dấu, dung hòa logic nghiệp vụ và hoàn tất chu trình gộp code từ đầu đến cuối, bạn mới thực sự xóa bỏ nỗi sợ hãi về Git Branching và sẵn sàng bước chân vào các dự án phần mềm thực chiến quy mô lớn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem thử thách này như bài thi sát hạch lái xe sa hình tổng hợp: Bạn xuất phát từ vạch xuất phát (`main`), rẽ vào làn đường tính năng riêng, đối mặt với chướng ngại vật ngã tư xung đột, bình tĩnh đánh lái xử lý chướng ngại vật an toàn, nhập làn trở lại đường cao tốc chính và cất chìa khóa vào gara ngăn nắp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nTOÀN BỘ TIẾN TRÌNH THỰC THI THỬ THÁCH SA HÌNH LEVEL 3:\n\n                          (F1: thông báo có ưu đãi) ◄── [feature-challenge]\n                         /                               \\\n(Base: thông báo đầu) ──                                  ──► [M1: Merge Commit] ◄── [main]\n                         \\                               /\n                          (M0: thông báo bảo trì trên main)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrên nhánh `main`, cửa hàng thông báo đang bảo trì hệ thống. Trên nhánh `feature-challenge`, bạn cập nhật chương trình khuyến mãi giảm giá 50%. Khi gộp nhánh, bạn khéo léo kết hợp cả hai: 'Hệ thống đang bảo trì; chương trình khuyến mãi 50% sẽ tự động kích hoạt ngay khi mở cửa trở lại'. Một pha xử lý nghiệp vụ mẫu mực của Senior Developer!\n\n---\n\n## 💻 Command\n```bash\ngit switch -c feature-challenge\ngit switch main\ngit merge feature-challenge\ngit status\ngit add challenge.txt\ngit commit -m \"merge: combine challenge changes\"\ngit show HEAD\ngit branch -d feature-challenge\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c feature-challenge`: Tách nhánh tính năng và chuyển sang đó làm việc.\n- `git switch main` rồi `git merge`: Đứng đúng vị trí nhánh đích trước khi kéo nhánh tính năng vào.\n- `git add` & `git commit`: Đánh dấu hoàn tất việc gỡ xung đột và tạo Merge Commit có 2 cha.\n- `git branch -d`: Dọn sạch nhánh sau khi mọi công sức đã được bảo toàn trong `main`.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Merge khi đang đứng trên nhánh tính năng**: Làm đảo lộn hướng di chuyển của mã nguồn.\n2. **Quên tạo commit riêng trên cả hai nhánh**: Không có sự phân kỳ lịch sử thì không thể tạo ra tình huống thử thách thực tế.\n3. **Cố xóa nhánh khi chưa switch về nhánh chính**: Git sẽ từ chối xóa nhánh bạn đang đứng.\n\n---\n\n## 🧪 Lab\n1. Trên nhánh `main`, tạo file `challenge.txt` với dòng: `Thông báo: phiên bản đầu`, rồi add và commit với thông điệp `docs: add challenge note`.\n2. Tạo nhánh tính năng: `git switch -c feature-challenge`, sửa dòng đó thành: `Thông báo: có ưu đãi`, rồi add và commit với `feat: announce offer`.\n3. Quay về `git switch main`, sửa cùng dòng thành: `Thông báo: cửa hàng đang bảo trì`, rồi add và commit với `docs: announce maintenance`.\n4. Chạy `git merge feature-challenge` để kích hoạt xung đột sa hình.\n5. Mở file `challenge.txt`, dung hòa nội dung thành câu hoàn chỉnh: `Thông báo: cửa hàng đang bảo trì; ưu đãi áp dụng khi mở cửa trở lại.`, xóa sạch 3 vạch markers rồi lưu file.\n6. Chạy `git add challenge.txt`, rồi `git commit -m \"merge: combine challenge changes\"`.\n7. Chạy `git show HEAD` để xác nhận commit có 2 cha, sau đó chạy `git branch -d feature-challenge` để hoàn tất dọn dẹp.\n\n---\n\n## 💡 Hint\n> Hãy bình tĩnh đọc cả hai thông điệp và kết hợp chúng thành một câu văn có nghĩa nghiệp vụ rõ ràng nhất!\n\n---\n\n## ✅ Validation\n- Quá trình gộp nhánh kích hoạt xung đột và được giải quyết sạch sẽ 100%.\n- Merge Commit được tạo ra hợp lệ với 2 commit cha.\n- Nhánh `feature-challenge` được xóa an toàn khỏi danh sách `git branch`.\n\n---\n\n## ❓ Quiz\nLàm bài trắc nghiệm dưới đây để tổng kết và kiểm tra toàn diện năng lực làm chủ nhánh và hợp nhất mã nguồn của bạn.\n\n---\n\n## 🔥 Challenge\nHãy mô tả lại cảm giác và bài học lớn nhất bạn rút ra được sau khi vượt qua thử thách gỡ xung đột Level 3. Tại sao một lập trình viên biết gỡ xung đột bình tĩnh lại luôn được các công ty săn đón?\n\n---\n\n## 📚 Tổng kết\n- Làm chủ toàn bộ chu trình: Tách nhánh ──► Phân kỳ ──► Hợp nhất ──► Gỡ xung đột ──► Dọn dẹp.\n- Luôn đứng trên nhánh nhận trước khi thực hiện hợp nhất.\n- Chúc mừng bạn đã hoàn thành xuất sắc và chính thức Master toàn bộ kiến thức Level 3: Branching & Merging!\n",
  "quiz": {
    "id": "quiz-03-14-branching-challenge",
    "title": "Trắc nghiệm tổng kết: Branching và merge",
    "questions": [
      {
        "id": "q1",
        "question": "Trước khi chạy `git merge feature` để đưa tính năng vào `main`, bạn nên đứng trên nhánh nào?",
        "type": "single",
        "options": [
          {
            "text": "`main`, vì lệnh merge cập nhật nhánh hiện tại",
            "correct": true
          },
          {
            "text": "`feature`, vì đó là nhánh có thay đổi",
            "correct": false
          },
          {
            "text": "Nhánh không liên quan",
            "correct": false
          },
          {
            "text": "Detached HEAD",
            "correct": false
          }
        ],
        "explanation": "Nhánh đang checkout nhận kết quả merge, nên cần chuyển sang main trước."
      },
      {
        "id": "q2",
        "question": "Khi tệp có hai khối conflict, bước nào nên làm trước khi chọn nội dung?",
        "type": "single",
        "options": [
          {
            "text": "Đọc cả hai phiên bản và hiểu yêu cầu của thay đổi",
            "correct": true
          },
          {
            "text": "Luôn giữ Current mà không đọc",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ tệp",
            "correct": false
          },
          {
            "text": "Chạy git branch -D",
            "correct": false
          }
        ],
        "explanation": "Chọn dựa trên yêu cầu nghiệp vụ giúp giữ logic cần thiết thay vì bỏ thay đổi một cách ngẫu nhiên."
      },
      {
        "id": "q3",
        "question": "Sau khi sửa tệp conflict và xóa markers, lệnh nào báo cho Git rằng tệp đã được giải quyết?",
        "type": "single",
        "options": [
          {
            "text": "git add <tên-tệp>",
            "correct": true
          },
          {
            "text": "git status",
            "correct": false
          },
          {
            "text": "git branch",
            "correct": false
          },
          {
            "text": "git switch",
            "correct": false
          }
        ],
        "explanation": "`git add` đưa phiên bản đã sửa vào staging area để chuẩn bị hoàn tất merge commit."
      },
      {
        "id": "q4",
        "question": "Sau khi merge hoàn tất, lệnh nào cho biết HEAD là merge commit và hiện hai commit cha?",
        "type": "single",
        "options": [
          {
            "text": "git show HEAD",
            "correct": true
          },
          {
            "text": "git init",
            "correct": false
          },
          {
            "text": "git status --remote",
            "correct": false
          },
          {
            "text": "git list-parents",
            "correct": false
          }
        ],
        "explanation": "Với merge commit, `git show` trình bày dòng Merge chứa mã của hai commit cha."
      },
      {
        "id": "q5",
        "question": "Khi nào nên chạy `git branch -d feature`?",
        "type": "single",
        "options": [
          {
            "text": "Sau khi xác nhận công việc đã được merge vào nhánh nhận và đã chuyển khỏi feature",
            "correct": true
          },
          {
            "text": "Trước khi tạo commit tính năng",
            "correct": false
          },
          {
            "text": "Khi Git đang báo conflict",
            "correct": false
          },
          {
            "text": "Bất cứ khi nào muốn bỏ qua kiểm tra của Git",
            "correct": false
          }
        ],
        "explanation": "Xóa nhánh sau merge giữ lịch sử trong nhánh nhận và tránh mất đường dẫn tới commit chưa tích hợp."
      },
      {
        "id": "q6",
        "question": "Nếu `git status` còn báo `Unmerged paths`, điều đó có nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Còn tệp conflict cần được sửa và đánh dấu đã giải quyết",
            "correct": true
          },
          {
            "text": "Merge đã hoàn tất và working tree chắc chắn sạch",
            "correct": false
          },
          {
            "text": "Repository chưa được khởi tạo",
            "correct": false
          },
          {
            "text": "Tất cả các nhánh đã bị xóa",
            "correct": false
          }
        ],
        "explanation": "Các đường dẫn unmerged cho biết merge chưa được xử lý xong và chưa thể kết luận thành công."
      }
    ]
  }
};
export default lesson;
