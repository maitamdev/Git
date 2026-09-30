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
  "content": "# Nguyên lý cách ly không gian Branch Isolation\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ nguyên lý cách ly không gian (Branch Isolation) độc lập của các luồng phát triển trong Git.\n- Nhận biết phạm vi tác động của commit trên từng nhánh riêng biệt.\n- Tự tin phát triển các tính năng thử nghiệm mạo hiểm mà không sợ làm ảnh hưởng tới nhánh chính.\n- Phân tích sự phân kỳ lịch sử (divergent history) khi hai nhánh cùng tiến về phía trước.\n\n---\n\n## 📖 Định nghĩa\n> Nguyên lý cách ly không gian (Branch Isolation) là đặc tính kiến trúc cốt lõi của Git, bảo đảm rằng mọi thay đổi đã được commit trên một nhánh chỉ tồn tại và ảnh hưởng độc quyền trên luồng lịch sử của chính nhánh đó. Nhánh chính (`main`) và các nhánh tính năng khác hoàn toàn không hề hay biết hay chịu bất kỳ tác động nào từ những sửa đổi này cho đến khi bạn chủ động thực hiện hành động hợp nhất (Merge hoặc Rebase).\n\n---\n\n## 🤔 Tại sao cần?\nKhả năng cách ly tuyệt đối giải phóng sự sáng tạo của lập trình viên khỏi nỗi sợ hãi làm hỏng mã nguồn đang vận hành. Bạn có thể thoải mái thử nghiệm viết lại toàn bộ kiến trúc ứng dụng, cài đặt các thư viện mới hoặc xóa bỏ các module cũ trên một nhánh riêng biệt. Nếu thử nghiệm thành công rực rỡ, bạn sẽ gộp vào dự án chung; nếu thất bại thảm hại, bạn chỉ việc xóa nhánh đó đi chỉ trong một giây mà kho lưu trữ chính vẫn hoàn toàn nguyên vẹn.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung nguyên lý cách ly nhánh giống như các phòng thí nghiệm an toàn sinh học cấp độ 4 độc lập trong cùng một viện nghiên cứu. Mỗi nhà khoa học được cấp một căn phòng kín với hệ thống lọc khí riêng biệt để nghiên cứu các mẫu thử nghiệm mới. Bất kể phòng thí nghiệm số 1 có xảy ra sự cố cháy nổ hay đổ vỡ ống nghiệm, căn phòng chính số 0 và các phòng thí nghiệm lân cận vẫn hoàn toàn sạch sẽ, an toàn tuyệt đối và hoạt động bình thường.\n\n---\n\n## 🖼 Sơ đồ\n```text\nLịch sử phân kỳ độc lập giữa hai nhánh:\nNhánh main:            C1 ──► C2 ──► C3 ──► C5 (main)\n                              │\nNhánh feature-login:          └──► C4 ──► C6 (feature-login)\n(Commit C4 và C6 hoàn toàn không xuất hiện trên nhánh main)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nLập trình viên An tạo nhánh experiment-ai để thử nghiệm tích hợp một mô hình trí tuệ nhân tạo nhận diện giọng nói vào ứng dụng di động. Sau ba ngày thử nghiệm và tạo 8 commit, An nhận thấy mô hình này tiêu tốn quá nhiều pin và không phù hợp với điện thoại đời cũ. Nhờ nguyên lý cách ly nhánh, toàn bộ mã nguồn của nhóm trên nhánh main vẫn đang chạy ổn định 100%. An chỉ việc chuyển về main và gõ `git branch -D experiment-ai` để loại bỏ thử nghiệm mà không để lại bất kỳ tì vết nào trong lịch sử chính.\n\n---\n\n## 💻 Command\n```bash\ngit switch -c <nhánh-thử-nghiệm>\ngit log --oneline --graph --all\ngit diff main..<nhánh-thử-nghiệm>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git switch -c <nhánh-thử-nghiệm>`: Tạo một không gian cách ly an toàn mới để bắt đầu phát triển tính năng.\n- `git log --oneline --graph --all`: Quan sát bức tranh phân kỳ lịch sử trực quan của tất cả các nhánh độc lập.\n- `git diff main..<nhánh>`: Xem tổng hợp tất cả sự khác biệt mà nhánh thử nghiệm đã tạo ra so với nhánh main.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ commit trên nhánh con sẽ tự động xuất hiện trên nhánh main**:  Bạn bắt buộc phải thực hiện merge thì code mới sang main.\n2. **Sợ hãi không dám tạo nhánh thử nghiệm**:  Hãy nhớ tạo nhánh là hoàn toàn miễn phí và an toàn tuyệt đối.\n3. **Để lại các tệp chưa commit khi chuyển nhánh**:  Thay đổi chưa commit có thể đi theo sang nhánh khác nếu không bị xung đột.\n\n---\n\n## 🧪 Lab\n1. Tạo nhánh cách ly `test-isolation` bằng `git switch -c test-isolation`.\n2. Tạo tệp mới `secret-test.txt` và commit vào nhánh này.\n3. Chuyển về nhánh chính bằng lệnh `git switch main`.\n4. Kiểm tra thư mục làm việc và thấy tệp `secret-test.txt` hoàn toàn không tồn tại trên main.\n\n---\n\n## 💡 Hint\n> Nhánh con cách ly hoàn toàn; khi về nhánh main, các tệp của nhánh con sẽ biến mất trên ổ đĩa.\n\n---\n\n## ✅ Validation\n- Xác nhận tệp tin mới tạo ở nhánh con không xuất hiện trên nhánh main.\n\n---\n\n## ❓ Quiz\nHãy làm bài trắc nghiệm dưới đây về nguyên lý cách ly nhánh Branch Isolation.\n\n---\n\n## 🔥 Challenge\nVẽ sơ đồ phân kỳ commit khi hai lập trình viên cùng tạo nhánh từ một commit cha và commit độc lập.\n\n---\n\n## 📚 Tổng kết\n- Branch Isolation đảm bảo các thay đổi đã commit trên một nhánh không ảnh hưởng tới nhánh khác.\n- Thoải mái thử nghiệm các ý tưởng mới trên nhánh riêng mà không sợ hỏng code của nhóm.\n- Chỉ khi nào thực hiện Merge hoặc Rebase thì mã nguồn giữa các nhánh mới được tích hợp.\n",
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
