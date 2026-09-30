import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "05-git-revert",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "05-git-revert",
    "title": "git revert",
    "level": "advanced",
    "duration": 25,
    "xp": 85,
    "prerequisites": [
      "04-git-reset-hard"
    ],
    "objectives": [
      "Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).",
      "Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).",
      "Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.",
      "Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git revert",
      "revert commit",
      "dao nguoc commit",
      "hoan tac an toan",
      "public undo",
      "non-destructive"
    ],
    "commands": [
      "git revert <commit-hash>",
      "git revert HEAD",
      "git revert HEAD~2..HEAD",
      "git revert --no-commit <commit-hash>"
    ]
  },
  "content": "# git revert\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).\n- Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).\n- Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.\n- Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit.\n\n---\n\n## 📖 Định nghĩa\n> `git revert <commit-target>` là câu lệnh hoàn tác an toàn nhất trong Git, hoạt động theo nguyên lý tạo ra một commit snapshot hoàn toàn mới mang nội dung đối nghịch (nghịch đảo) chính xác với những gì mà commit mục tiêu đã thực hiện. Thay vì xóa bỏ hoặc sửa đổi các commit cũ trong quá khứ như lệnh reset, `git revert` bảo tồn nguyên vẹn toàn bộ chuỗi lịch sử và bổ sung thêm một nút commit mới để vô hiệu hóa lỗi.\n\n---\n\n## 🤔 Tại sao cần?\nTrong môi trường sản xuất thực tế tại các doanh nghiệp lớn, việc viết lại lịch sử trên nhánh `main` hoặc `production` là hành vi bị nghiêm cấm hoàn toàn vì nó làm hỏng đồng bộ của hàng chục kỹ sư và phá vỡ quy trình kiểm toán mã nguồn. `git revert` là giải pháp tiêu chuẩn vàng duy nhất: nó giúp bạn khắc phục lỗi tức thì mà vẫn lưu lại minh chứng rõ ràng trong nhật ký lịch sử về việc mã nguồn đã được sửa đổi và thu hồi như thế nào.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung sổ cái kế toán tài chính của một ngân hàng thương mại. Khi kế toán viên phát hiện mình lỡ ghi nhầm một khoản chuyển tiền 10 triệu đồng cho khách hàng vào ngày hôm qua, kế toán viên không được phép dùng bút xóa hay xé rách trang sổ cái đó đi (viết lại lịch sử). Thay vào đó, kế toán viên bắt buộc phải ghi thêm một dòng nghiệp vụ mới vào ngày hôm nay: \"Thu hồi khoản chi nhầm 10 triệu đồng\" (`git revert`). Số dư trở về đúng, và cuốn sổ cái vẫn minh bạch 100%.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCơ chế hoàn tác tiến lên của git revert:\nLịch sử ban đầu:\nC1 ──► C2 (Gây lỗi thanh toán!) ──► C3 (HEAD -> main)\n\nSau khi chạy git revert C2:\nC1 ──► C2 ──► C3 ──► C4 [Revert \"C2\"] (HEAD -> main)\n(C2 vẫn tồn tại trong lịch sử, nhưng C4 đã đảo ngược toàn bộ thay đổi của C2!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nHệ thống thương mại điện tử vừa triển khai bản cập nhật mới lên production thì bộ phận chăm sóc khách hàng báo sự cố: khách hàng không thể áp dụng mã giảm giá do một commit có mã hash `e7f8a9b` gây lỗi logic. Đội ngũ trực chiến không hề hoảng loạn dùng reset, kỹ sư trưởng lập tức chạy lệnh: `git revert e7f8a9b`. Git tự động tính toán các dòng code đối nghịch, mở trình soạn thảo commit message với tiêu đề mặc định `Revert \"feat: coupon engine\"`. Kỹ sư lưu lại, push lên server và hệ thống CI/CD tự động triển khai bản vá. Toàn bộ sự cố được giải quyết triệt để chỉ trong 2 phút.\n\n---\n\n## 💻 Command\n```bash\ngit revert <commit-hash>\ngit revert HEAD\ngit revert HEAD~2..HEAD\ngit revert --no-commit <commit-hash>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git revert <hash>`: Tạo commit mới đảo ngược các thay đổi do commit chỉ định tạo ra.\n- `git revert HEAD`: Hoàn tác commit gần đây nhất trên nhánh hiện tại.\n- `git revert HEAD~2..HEAD`: Hoàn tác liên tiếp một dải các commit gần nhất.\n- `git revert --no-commit <hash>`: Đảo ngược thay đổi đưa vào Staging nhưng chưa tự động tạo commit mới.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nhầm tưởng revert sẽ xóa mất commit cũ khỏi lịch sử git log**:  Revert tạo thêm commit mới, commit cũ vẫn nằm nguyên vẹn.\n2. **Hoảng hốt khi gặp xung đột trong lúc revert**:  Xung đột xảy ra khi các commit sau đó đã sửa đổi cùng dòng code; chỉ cần resolve conflict và chạy `git revert --continue`.\n3. **Lạm dụng reset thay vì revert trên nhánh main của công ty dẫn đến bị từ chối push.**: Lạm dụng reset thay vì revert trên nhánh main của công ty dẫn đến bị từ chối push.\n\n---\n\n## 🧪 Lab\n1. Tạo một tệp `feature.txt` có nội dung \"phần mềm lỗi\" và tạo commit.\n2. Chạy lệnh `git revert HEAD` để hoàn tác commit vừa tạo.\n3. Quan sát Git mở cửa sổ soạn thảo thông điệp commit revert tự động.\n4. Lưu lại và kiểm tra `git log --oneline` để thấy commit revert xuất hiện trên đỉnh.\n\n---\n\n## 💡 Hint\n> Luôn dùng `git revert` khi cần sửa lỗi trên các nhánh dùng chung hoặc nhánh production.\n\n---\n\n## ✅ Validation\n- Hoàn tác thành công một commit bằng git revert và bảo toàn nguyên vẹn lịch sử dự án.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh an toàn git revert.\n\n---\n\n## 🔥 Challenge\nĐiều gì xảy ra khi bạn revert một commit merge (Merge Commit)? Cờ `-m` trong `git revert -m 1 <merge-commit>` có ý nghĩa gì?\n\n---\n\n## 📚 Tổng kết\n- `git revert` tạo ra một commit mới để đảo ngược lại các thay đổi của commit cũ.\n- Là phương thức hoàn tác an toàn tuyệt đối trên các nhánh dùng chung và production.\n- Bảo tồn nguyên vẹn 100% lịch sử và tính toàn vẹn của chuỗi commit.\n",
  "quiz": {
    "id": "quiz-05-05-git-revert",
    "title": "Trắc nghiệm: git revert",
    "questions": [
      {
        "id": "q1",
        "question": "Bản chất cốt lõi của câu lệnh `git revert <commit-hash>` là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tạo một commit mới đảo ngược lại toàn bộ các thay đổi mà commit chỉ định đã thực hiện",
            "correct": true
          },
          {
            "text": "Xóa bỏ hoàn toàn commit chỉ định khỏi lịch sử vĩnh viễn",
            "correct": false
          },
          {
            "text": "Chuyển đổi commit đó sang một kho lưu trữ khác",
            "correct": false
          },
          {
            "text": "Đổi tên tác giả của commit đó",
            "correct": false
          }
        ],
        "explanation": "`git revert` tiến lên phía trước bằng cách sinh ra commit nghịch đảo chứ không hề xóa bỏ commit trong quá khứ."
      },
      {
        "id": "q2",
        "question": "Tại sao `git revert` lại là phương pháp hoàn tác bắt buộc trên nhánh `main` của các dự án chuyên nghiệp?",
        "type": "single",
        "options": [
          {
            "text": "Vì nó không viết lại lịch sử, tránh gây xung đột cho các thành viên khác và phục vụ tốt việc kiểm toán mã nguồn",
            "correct": true
          },
          {
            "text": "Vì lệnh này chạy nhanh hơn tất cả các lệnh khác 100 lần",
            "correct": false
          },
          {
            "text": "Vì GitHub không hỗ trợ bất kỳ câu lệnh nào khác",
            "correct": false
          },
          {
            "text": "Vì nó tự động sửa lỗi logic của lập trình viên",
            "correct": false
          }
        ],
        "explanation": "Tính bảo tồn lịch sử giúp mọi thành viên kéo code về mà không bị lỗi phân kỳ lịch sử do viết lại cây commit."
      },
      {
        "id": "q3",
        "question": "Nếu commit bạn muốn revert đang bị mâu thuẫn dòng code với các commit mới hơn, Git sẽ xử lý thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Git dừng lại và kích hoạt trạng thái xung đột (conflict) để bạn giải quyết thủ công rồi mới tiếp tục",
            "correct": true
          },
          {
            "text": "Git tự động xóa toàn bộ các commit mới hơn để ưu tiên revert",
            "correct": false
          },
          {
            "text": "Git hủy bỏ toàn bộ kho lưu trữ trên máy tính",
            "correct": false
          },
          {
            "text": "Git tự động chọn ngẫu nhiên một phương án",
            "correct": false
          }
        ],
        "explanation": "Revert thực chất là một phép áp dụng diff nghịch đảo, nếu có xung đột bạn phải xử lý conflict tương tự như khi merge."
      },
      {
        "id": "q4",
        "question": "Cờ `--no-commit` (hoặc `-n`) trong lệnh `git revert -n <hash>` có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Áp dụng các thay đổi đảo ngược vào Working Tree và Staging nhưng không tự động tạo commit mới ngay lập tức",
            "correct": true
          },
          {
            "text": "Cấm không bao giờ cho phép commit lại tệp đó nữa",
            "correct": false
          },
          {
            "text": "Xóa commit đó khỏi bộ nhớ cache của CPU",
            "correct": false
          },
          {
            "text": "Ngăn không cho Git ghi log lịch sử",
            "correct": false
          }
        ],
        "explanation": "`--no-commit` cho phép bạn đảo ngược nhiều commit liên tiếp vào Staging rồi mới tự tay gom thành một commit hoàn chỉnh."
      }
    ]
  }
};
export default lesson;
