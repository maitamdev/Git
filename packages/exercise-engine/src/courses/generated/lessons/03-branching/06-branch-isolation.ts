import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-branch-isolation",
  "moduleId": "03-branching",
  "metadata": {
    "id": "06-branch-isolation",
    "title": "Nguyên lý cách ly không gian Branch Isolation",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "04-git-switch"
    ],
    "objectives": [
      "Hiểu rõ nguyên lý cách ly không gian (Branch Isolation) độc lập của các luồng phát triển trong Git.",
      "Nhận biết phạm vi tác động của commit trên từng nhánh riêng biệt.",
      "Tự tin phát triển các tính năng thử nghiệm mạo hiểm mà không sợ làm ảnh hưởng tới nhánh chính.",
      "Phân tích sự phân kỳ lịch sử (divergent history) khi hai nhánh cùng tiến về phía trước."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "branch isolation",
      "cach ly khong gian",
      "song song",
      "an toan nhanh",
      "doc lap"
    ],
    "commands": [
      "git switch -c <nhánh-thử-nghiệm>",
      "git log --oneline --graph --all",
      "git diff main..<nhánh-thử-nghiệm>"
    ]
  },
  "content": "# Nguyên lý cách ly không gian Branch Isolation\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ nguyên lý cách ly độc lập giữa các nhánh trong Git.\n- Nhận biết phạm vi tác động của một commit chỉ nằm trên nhánh đang làm việc.\n- Tự tin thử nghiệm ý tưởng mới trên nhánh riêng mà không sợ hỏng mã nguồn chính.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Branch Isolation — nguyên lý cách ly nhánh\n- **Nói dễ hiểu:** Mọi commit tạo ra trên một nhánh chỉ tồn tại và ảnh hưởng trong nội bộ nhánh đó.\n- **Ví dụ:** Bạn tạo tệp `chat.js` trên nhánh `feature-chat`, khi về `main` tệp này hoàn toàn không xuất hiện.\n- **Đừng nhầm:** Tính cách ly chỉ áp dụng cho commit đã lưu; các tệp sửa dở chưa commit có thể đi theo khi đổi nhánh.\n\n### Divergent History — lịch sử phân kỳ\n- **Nói dễ hiểu:** Tình trạng hai nhánh cùng tách ra từ một commit cũ, sau đó mỗi nhánh tiếp tục có các commit mới riêng biệt.\n- **Ví dụ:** Nhánh `main` có commit cập nhật tài liệu, nhánh `feature` có commit thêm nút bấm, tạo thành ngã rẽ chữ Y.\n- **Đừng nhầm:** Lịch sử phân kỳ không phải là lỗi; đây là quy trình làm việc song song bình thường của nhóm.\n\n### Merge — hành động hợp nhất nhánh\n- **Nói dễ hiểu:** Thao tác chủ động gom toàn bộ thay đổi từ nhánh tính năng đưa vào nhánh chính.\n- **Ví dụ:** Sau khi tính năng thanh toán được kiểm tra kỹ, bạn gộp `feature-pay` vào nhánh `main`.\n- **Đừng nhầm:** Git không bao giờ tự động gộp các nhánh; bạn luôn phải chủ động thực hiện lệnh hợp nhất.\n\n---\n\n## 📖 Định nghĩa\nNguyên lý cách ly nhánh (Branch Isolation) đảm bảo rằng những commit trên một nhánh chỉ thuộc về luồng lịch sử của nhánh đó. Nhánh chính (`main`) và các nhánh khác không bị ảnh hưởng cho tới khi bạn chủ động gộp chúng lại với nhau.\n\n---\n\n## 🤔 Tại sao cần?\nNhờ tính cách ly, bạn có thể tự do thử nghiệm các giải pháp phức tạp hoặc viết lại code mà không sợ làm gián đoạn sản phẩm đang chạy. Nếu thử nghiệm thành công, bạn gộp vào nhánh chính; nếu thất bại, bạn chỉ cần xóa nhánh con đi là dự án lại nguyên vẹn như cũ.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung mỗi nhánh như một phòng thí nghiệm riêng biệt trong cùng một tòa nhà. Bạn làm việc, thử nghiệm và thậm chí làm hỏng thiết bị trong phòng của mình thì các phòng khác và sảnh chính của tòa nhà vẫn hoàn toàn an toàn và hoạt động bình thường.\n\n---\n\n## 🖼 Sơ đồ\n```text\nCommit chung C2:\nNhánh main:            C1 ───> C2 ───> C3 ───> C5 (main)\n                               │\nNhánh feature-login:          └───> C4 ───> C6 (feature-login)\n(Commit C4 và C6 hoàn toàn không xuất hiện trên nhánh main)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn An tạo nhánh `test-darkmode` để thử đổi toàn bộ giao diện sang màu tối. Sau khi sửa 10 tệp CSS và commit 3 lần, An thấy màu sắc chưa hài hòa và quyết định dừng lại. Nhờ tính cách ly của nhánh, mã nguồn trên `main` của cả nhóm vẫn hiển thị giao diện sáng chuẩn mực. An chỉ việc chuyển về `main` và xóa nhánh thử nghiệm mà không để lại bất kỳ rác thừa nào.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c <nhánh-thử-nghiệm>\ngit log --oneline --graph --all\ngit diff main..<nhánh-thử-nghiệm>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <nhánh-thử-nghiệm>`: Tạo ra một không gian làm việc độc lập mới để bắt đầu thử nghiệm.\n- `git log --oneline --graph --all`: Xem sơ đồ cây phân nhánh trực quan của tất cả các nhánh trong dự án.\n- `git diff main..<nhánh>`: So sánh tổng thể những khác biệt giữa nhánh thử nghiệm và nhánh chính.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ commit nhánh con sẽ tự sang nhánh main:** Bạn bắt buộc phải chủ động chạy lệnh hợp nhất thì code mới vào `main`.\n2. **Lo lắng khi tệp của nhánh con biến mất khi chuyển về main:** Đây là hành vi đúng của Git nhằm phản ánh chính xác trạng thái của nhánh hiện tại.\n3. **Để tệp sửa dở khi chuyển nhánh:** Nên commit hoặc cất tệp tạm trước khi chuyển nhánh để tránh mang nhầm code chưa hoàn thiện sang nhánh khác.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Tạo nhánh cách ly bằng lệnh `git switch -c test-isolation`.\n2. Tạo tệp mới `secret-test.txt` và commit vào nhánh này.\n3. Chuyển quay trở lại nhánh chính bằng lệnh `git switch main`.\n4. Quan sát danh sách tệp và nhận thấy `secret-test.txt` hoàn toàn không có mặt trên nhánh `main`.\n\n---\n\n## 💡 Hint\nKhi chuyển về nhánh `main`, Git tự động dọn dẹp các tệp chỉ thuộc về nhánh con để giữ thư mục làm việc luôn đúng chuẩn.\n\n---\n\n## ✅ Validation\n- Tệp `secret-test.txt` chỉ xuất hiện khi bạn đứng ở nhánh `test-isolation`.\n- Thư mục làm việc trên nhánh `main` hoàn toàn sạch sẽ, không có tệp đó.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để kiểm tra sự hiểu biết về nguyên lý cách ly không gian nhánh trong Git.\n\n---\n\n## 🔥 Challenge\nChạy lệnh `git log --graph --oneline --all` sau khi đã commit trên cả hai nhánh để tự mình nhìn thấy ngã rẽ đồ thị chữ Y trên màn hình dòng lệnh.\n\n---\n\n## 📚 Tổng kết\n- Branch Isolation đảm bảo các thay đổi đã commit trên nhánh này không làm ảnh hưởng nhánh khác.\n- Bạn có thể thoải mái thử nghiệm ý tưởng mới trên nhánh riêng với rủi ro bằng không.\n- Mã nguồn chỉ được chia sẻ giữa các nhánh khi có lệnh hợp nhất rõ ràng.\n",
  "quiz": {
    "id": "quiz-03-06-branch-isolation",
    "title": "Trắc nghiệm: Nguyên lý cách ly không gian Branch Isolation",
    "questions": [
      {
        "id": "q1",
        "question": "Nguyên lý Branch Isolation trong Git mang lại lợi ích lớn nhất nào sau đây?",
        "type": "single",
        "options": [
          {
            "text": "Cho phép lập trình viên tự do thử nghiệm và thay đổi mã nguồn mà không sợ ảnh hưởng tới nhánh chính",
            "correct": true
          },
          {
            "text": "Giúp mã nguồn tự động biên dịch thành file exe mà không cần trình biên dịch",
            "correct": false
          },
          {
            "text": "Giúp tự động sửa các lỗi cú pháp ngữ pháp tiếng Anh trong mã nguồn",
            "correct": false
          },
          {
            "text": "Tăng tốc độ truy cập mạng Internet của văn phòng công ty",
            "correct": false
          }
        ],
        "explanation": "Tính cách ly độc lập bảo vệ nhánh chính an toàn trước mọi thử nghiệm và lỗi phát sinh trên nhánh phụ."
      },
      {
        "id": "q2",
        "question": "Nếu bạn commit một tệp mới trên nhánh `feature` rồi chuyển về nhánh `main`, tệp đó trên ổ đĩa sẽ ra sao?",
        "type": "single",
        "options": [
          {
            "text": "Tệp đó sẽ tự động biến mất khỏi Working Directory trên main và chỉ xuất hiện lại khi quay về feature",
            "correct": true
          },
          {
            "text": "Tệp đó sẽ tự động được gửi qua email cho sếp",
            "correct": false
          },
          {
            "text": "Tệp đó sẽ bị xóa vĩnh viễn khỏi toàn bộ lịch sử Git",
            "correct": false
          },
          {
            "text": "Tệp đó sẽ tự động được đưa vào nhánh main mà không cần merge",
            "correct": false
          }
        ],
        "explanation": "Git cập nhật Working Directory theo snapshot của nhánh hiện tại; tệp của nhánh con sẽ được cất đi an toàn."
      },
      {
        "id": "q3",
        "question": "Khi hai lập trình viên tạo hai nhánh khác nhau từ cùng một commit trên main và cùng commit code mới, hình thái lịch sử sẽ như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Lịch sử sẽ phân kỳ (divergent) thành hai nhánh rẽ độc lập hình chữ Y từ mốc commit chung ban đầu",
            "correct": true
          },
          {
            "text": "Lịch sử sẽ bị khóa lại và không ai được commit tiếp",
            "correct": false
          },
          {
            "text": "Một trong hai nhánh sẽ bị xóa ngẫu nhiên để tránh xung đột",
            "correct": false
          },
          {
            "text": "Toàn bộ mã nguồn của cả hai người sẽ bị hòa tan thành một tệp duy nhất",
            "correct": false
          }
        ],
        "explanation": "Đồ thị commit DAG sẽ phân nhánh độc lập từ commit cha chung tạo thành hình thái phân kỳ."
      },
      {
        "id": "q4",
        "question": "Để xem biểu đồ phân kỳ trực quan của tất cả các nhánh trong terminal, bạn dùng câu lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git log --graph --oneline --all",
            "correct": true
          },
          {
            "text": "git show --branches-only",
            "correct": false
          },
          {
            "text": "git view --diagram",
            "correct": false
          },
          {
            "text": "git chart --divergent",
            "correct": false
          }
        ],
        "explanation": "`git log --graph --oneline --all` vẽ các nhánh phân kỳ bằng ký tự ASCII trực quan tuyệt đẹp."
      },
      {
        "id": "q5",
        "question": "Một tính năng thử nghiệm trên nhánh phụ bị thất bại hoàn toàn, thao tác xử lý chuẩn mực là gì?",
        "type": "single",
        "options": [
          {
            "text": "Chuyển về nhánh main và xóa bỏ nhánh thử nghiệm đó bằng lệnh git branch -D",
            "correct": true
          },
          {
            "text": "Phải cài lại hệ điều hành Windows từ đầu",
            "correct": false
          },
          {
            "text": "Gửi đơn xin nghỉ việc tại công ty",
            "correct": false
          },
          {
            "text": "Xóa toàn bộ kho chứa của công ty trên GitHub",
            "correct": false
          }
        ],
        "explanation": "Nhờ tính cách ly, bạn chỉ việc xóa nhánh thất bại là dự án trở về trạng thái hoàn hảo ban đầu."
      },
      {
        "id": "q6",
        "question": "Các commit trên một nhánh tính năng có thể đến được nhánh main thông qua cơ chế nào?",
        "type": "single",
        "options": [
          {
            "text": "Thông qua thao tác hợp nhất có chủ đích (Merge hoặc Rebase)",
            "correct": true
          },
          {
            "text": "Tự động hòa nhập sau 24 giờ đồng hồ nếu không có lỗi",
            "correct": false
          },
          {
            "text": "Tự động hòa nhập khi bạn tắt máy tính đi ngủ",
            "correct": false
          },
          {
            "text": "Thông qua việc cắm cáp USB nối giữa hai máy tính",
            "correct": false
          }
        ],
        "explanation": "Git chỉ hòa nhập mã nguồn khi có lệnh chỉ định rõ ràng của lập trình viên (Merge hoặc Rebase)."
      }
    ]
  }
};
export default lesson;
