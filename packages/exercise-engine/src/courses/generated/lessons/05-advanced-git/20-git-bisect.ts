import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "20-git-bisect",
  "moduleId": "05-advanced-git",
  "metadata": {
    "id": "20-git-bisect",
    "title": "git bisect",
    "level": "advanced",
    "duration": 35,
    "xp": 120,
    "prerequisites": [
      "18-git-tag"
    ],
    "objectives": [
      "Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.",
      "Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.",
      "Hiểu rõ hiệu quả toán học: Tìm ra commit lỗi trong 1000 commit chỉ với khoảng 10 lần kiểm tra (O(log N)).",
      "Tự động hóa hoàn toàn quá trình tìm lỗi bằng câu lệnh `git bisect run <script-test>`."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git bisect",
      "binary search git",
      "tim loi nhi phan",
      "debug commit",
      "truy tim bug",
      "bisect automation"
    ],
    "commands": [
      "git bisect start",
      "git bisect bad",
      "git bisect good <commit-hoặc-tag>",
      "git bisect reset",
      "git bisect run <file-chay-kiem-thu>"
    ]
  },
  "content": "# git bisect\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.\n- Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.\n- Hiểu rõ hiệu quả toán học: Tìm ra commit lỗi trong 1000 commit chỉ với khoảng 10 lần kiểm tra (O(log N)).\n- Tự động hóa hoàn toàn quá trình tìm lỗi bằng câu lệnh `git bisect run <script-test>`.\n\n---\n\n## 📖 Định nghĩa\n> `git bisect` là công cụ thám tử điều tra lỗi tự động đỉnh cao trong Git, hoạt động dựa trên thuật toán tìm kiếm nhị phân (Binary Search). Khi bạn biết mã nguồn hiện tại đang bị lỗi (bad) nhưng chắc chắn một phiên bản trong quá khứ từng chạy tốt (good), `git bisect` sẽ tự động chia đôi lịch sử, nhảy tới commit ở chính giữa để bạn kiểm tra, rồi tiếp tục thu hẹp phạm vi tìm kiếm theo cấp số nhân cho đến khi chỉ mặt điểm tên chính xác commit đầu tiên đã đưa lỗi vào hệ thống.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các dự án phát triển lâu năm với hàng ngàn commit, một ngày đẹp trời người dùng báo một chức năng bị lỗi mà không ai biết lỗi xuất hiện từ khi nào. Nếu bạn phải kiểm tra thủ công từng commit một (Linear Search), bạn sẽ mất nhiều ngày làm việc mệt mỏi. Với `git bisect`, dù dự án có 1.024 commit, thuật toán nhị phân giúp bạn tìm ra chính xác commit gây lỗi chỉ sau đúng 10 lần chạy thử (vì $2^{10} = 1024$), tiết kiệm 99% thời gian điều tra.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung trò chơi đoán số từ 1 đến 100. Người quản trò nghĩ ra một số bí mật (commit gây lỗi). Bạn không đoán lần lượt 1, 2, 3, 4 vì quá lâu. Bạn đoán ngay số 50. Người quản trò nói: \"Lỗi xuất hiện sau số 50\". Bạn lập tức loại bỏ 50 số đầu và đoán tiếp số 75. Người quản trò nói: \"Lỗi xuất hiện trước số 75\". Bạn thu hẹp phạm vi xuống còn giữa 50 và 75. Chỉ sau vài câu hỏi chia đôi khoảng cách, bạn chỉ ra chính xác con số bí mật.\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuy trình tìm kiếm nhị phân của git bisect:\nMốc Good: C1 (Chạy tốt)                  Mốc Bad: C8 (Bị lỗi!)\nPhạm vi ban đầu: C1 ──► C2 ──► C3 ──► C4 ──► C5 ──► C6 ──► C7 ──► C8\n\nBước 1: Git nhảy tới C4 ở giữa -> Bạn test thấy Good!\nPhạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6 ──► C7 ──► C8(Bad)\n\nBước 2: Git nhảy tới C6 ở giữa -> Bạn test thấy Bad!\nPhạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6(Bad)\n\nBước 3: Git nhảy tới C5 -> Test thấy Bad!\nKẾT LUẬN: C5 chính là commit đầu tiên gây ra lỗi!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nChức năng xuất hóa đơn PDF bị hỏng trên môi trường production. Kỹ sư Bách biết rằng ở phiên bản phát hành `v1.2.0` cách đây 500 commit thì chức năng này vẫn chạy bình thường. Bách khởi động chế độ thám tử: gõ `git bisect start`, gõ `git bisect bad` (commit hiện tại lỗi), và `git bisect good v1.2.0`. Git lập tức thông báo: \"Bisecting: 250 revisions left to test after this (roughly 8 steps)\". Git checkout ra commit ở giữa. Bách chạy thử lệnh in PDF, nếu hỏng gõ `git bisect bad`, nếu chạy được gõ `git bisect good`. Đúng 8 bước sau, Git in ra màn hình: \"commit 8a9b0c is the first bad commit\" kèm tên tác giả và diff dòng code gây lỗi.\n\n---\n\n## 💻 Command\n```bash\ngit bisect start\ngit bisect bad\ngit bisect good <commit-hoặc-tag>\ngit bisect reset\ngit bisect run <file-chay-kiem-thu>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git bisect start`: Khởi động phiên làm việc tìm kiếm nhị phân của bisect.\n- `git bisect bad`: Đánh dấu commit hiện tại là commit bị lỗi.\n- `git bisect good <hash/tag>`: Đánh dấu commit trong quá khứ là mốc hoạt động bình thường không có lỗi.\n- `git bisect reset`: Kết thúc phiên điều tra và đưa bạn quay trở về nhánh ban đầu.\n- `git bisect run <script>`: Tự động hóa 100%: Git sẽ tự động chạy file script kiểm thử và tự đánh dấu good/bad.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên gõ `git bisect reset` sau khi tìm thấy lỗi**:  Khiến bạn bị mắc kẹt ở trạng thái Detached HEAD trên commit lỗi.\n2. **Đánh dấu nhầm commit good thành bad hoặc ngược lại**:  Làm sai lệch thuật toán tìm kiếm nhị phân dẫn đến kết luận sai.\n3. **Kiểm tra mã nguồn mà chưa build hoặc chưa cài đặt dependencies khiến bài test báo lỗi giả.**: Kiểm tra mã nguồn mà chưa build hoặc chưa cài đặt dependencies khiến bài test báo lỗi giả.\n\n---\n\n## 🧪 Lab\n1. Khởi động chế độ bisect bằng `git bisect start`.\n2. Đánh dấu commit hiện tại là lỗi bằng `git bisect bad`.\n3. Đánh dấu commit đầu tiên trong bài tập là tốt bằng `git bisect good HEAD~6`.\n4. Quan sát Git tự động checkout về commit ở giữa.\n5. Chạy thử nghiệm, gõ `git bisect good` hoặc `git bisect bad` tương ứng cho đến khi Git thông báo thủ phạm.\n6. Gõ `git bisect reset` để hoàn tất bài tập.\n\n---\n\n## 💡 Hint\n> Luôn nhớ chạy `git bisect reset` ngay sau khi đã xác định được commit gây lỗi để trở về nhánh làm việc.\n\n---\n\n## ✅ Validation\n- Sử dụng thành thạo quy trình git bisect để tìm ra chính xác commit gây lỗi trong chuỗi lịch sử.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ thám tử git bisect.\n\n---\n\n## 🔥 Challenge\nLàm thế nào để viết một script kiểm thử tự động trả về mã thoát exit code 0 (good) hoặc exit code khác 0 (bad) để chạy với `git bisect run`?\n\n---\n\n## 📚 Tổng kết\n- `git bisect` sử dụng thuật toán tìm kiếm nhị phân để truy tìm commit gây lỗi với độ phức tạp O(log N).\n- Quy trình gồm: `start` -> khai báo `bad` & `good` -> kiểm thử -> lặp lại -> `reset`.\n- Có thể tự động hóa 100% bằng câu lệnh `git bisect run <script>`.\n",
  "quiz": {
    "id": "quiz-05-20-git-bisect",
    "title": "Trắc nghiệm: git bisect",
    "questions": [
      {
        "id": "q1",
        "question": "Thuật toán tìm kiếm mà câu lệnh `git bisect` áp dụng để truy tìm commit gây lỗi là thuật toán nào?",
        "type": "single",
        "options": [
          {
            "text": "Tìm kiếm nhị phân (Binary Search) chia đôi phạm vi sau mỗi bước kiểm tra",
            "correct": true
          },
          {
            "text": "Tìm kiếm tuyến tính tuần tự từ đầu đến cuối",
            "correct": false
          },
          {
            "text": "Tìm kiếm ngẫu nhiên theo xác suất",
            "correct": false
          },
          {
            "text": "Tìm kiếm theo độ dài của thông điệp commit",
            "correct": false
          }
        ],
        "explanation": "`git bisect` chia đôi lịch sử theo thuật toán Binary Search, mang lại hiệu quả cực cao với độ phức tạp O(log N)."
      },
      {
        "id": "q2",
        "question": "Giả sử khoảng cách giữa commit tốt (good) và commit lỗi (bad) là 1.000 commit, bạn cần tối đa khoảng bao nhiêu lần kiểm tra để tìm ra thủ phạm?",
        "type": "single",
        "options": [
          {
            "text": "Khoảng 10 lần kiểm tra (vì 2^10 = 1024)",
            "correct": true
          },
          {
            "text": "Khoảng 500 lần kiểm tra",
            "correct": false
          },
          {
            "text": "Khoảng 1.000 lần kiểm tra",
            "correct": false
          },
          {
            "text": "Chỉ cần đúng 1 lần duy nhất",
            "correct": false
          }
        ],
        "explanation": "Nhờ tính chất lũy thừa cơ số 2 của thuật toán nhị phân, 1.000 commit chỉ cần tối đa khoảng 10 bước kiểm thử."
      },
      {
        "id": "q3",
        "question": "Sau khi đã tìm ra chính xác commit gây lỗi bằng `git bisect`, câu lệnh BẮT BUỘC bạn phải chạy để quay về nhánh làm việc ban đầu là gì?",
        "type": "single",
        "options": [
          {
            "text": "git bisect reset",
            "correct": true
          },
          {
            "text": "git bisect stop",
            "correct": false
          },
          {
            "text": "git bisect finish",
            "correct": false
          },
          {
            "text": "git checkout main --force",
            "correct": false
          }
        ],
        "explanation": "`git bisect reset` dọn dẹp các con trỏ bisect tạm thời và đưa HEAD quay trở về nhánh ban đầu của bạn."
      },
      {
        "id": "q4",
        "question": "Tính năng tự động hóa tối thượng `git bisect run <script>` xác định commit là Good hay Bad dựa trên tiêu chí nào của script?",
        "type": "single",
        "options": [
          {
            "text": "Mã thoát (Exit code) của script: mã 0 là Good, mã khác 0 (từ 1 đến 127) là Bad",
            "correct": true
          },
          {
            "text": "Dung lượng của tệp script tính bằng kilobyte",
            "correct": false
          },
          {
            "text": "Thời gian chạy script tính bằng mili-giây",
            "correct": false
          },
          {
            "text": "Màu sắc hiển thị trên màn hình terminal",
            "correct": false
          }
        ],
        "explanation": "Theo chuẩn POSIX, exit code 0 biểu thị thành công (Good), các mã lỗi khác 0 biểu thị thất bại (Bad)."
      }
    ]
  }
};
export default lesson;
