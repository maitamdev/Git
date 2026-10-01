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
      "Hiểu rằng bisect cần khoảng 10 lần kiểm tra cho 1.000 commit khi có mốc tốt/xấu rõ ràng và lỗi chuyển một lần.",
      "Biết dùng `git bisect run` trong Git thật với script kiểm thử tin cậy."
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
      "git bisect log"
    ]
  },
  "content": "# git bisect\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.\n- Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.\n- Hiểu vì sao khoảng 1.000 commit có thể cần gần 10 lần kiểm tra khi lỗi nằm trong một khoảng liên tục và mỗi lần kiểm tra cho kết quả tin cậy.\n- Biết `git bisect run <script-test>` có thể tự động đánh dấu kết quả nếu script trả mã thoát đúng; lệnh này cần Git thật và không được mô phỏng trong khóa học.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Bisect\n- **Nói dễ hiểu**: Công cụ giúp thu hẹp commit đầu tiên gây lỗi bằng cách chia đôi lịch sử và kiểm tra từng phiên bản.\n- **Ví dụ**: Dùng `git bisect start`, đánh dấu `git bisect bad` và `git bisect good v1.0` để Git tự nhảy đến commit ở giữa.\n- **Đừng nhầm**: Bisect không tự sửa lỗi. Kết quả đáng tin khi mốc good/bad đúng và lỗi xuất hiện một lần theo thứ tự lịch sử trong khoảng đã chọn.\n\n### Good / Bad Commit\n- **Nói dễ hiểu**: Hai mốc đánh dấu trạng thái của mã nguồn: `good` là phiên bản còn chạy chuẩn, `bad` là phiên bản đã phát sinh lỗi.\n- **Ví dụ**: Đánh dấu `git bisect good` khi thấy tính năng in hóa đơn ở commit hiện tại vẫn hoạt động tốt.\n- **Đừng nhầm**: Nhớ gắn nhãn chính xác; nếu bạn đánh dấu nhầm good/bad thì Git sẽ bị điều hướng sang khoảng tìm kiếm sai.\n\n### Bisect Reset (git bisect reset)\n- **Nói dễ hiểu**: Lệnh kết thúc phiên điều tra bisect và đưa con trỏ HEAD quay trở về nhánh làm việc ban đầu.\n- **Ví dụ**: Gõ `git bisect reset` ngay sau khi Git in ra thông báo commit thủ phạm gây lỗi.\n- **Đừng nhầm**: Trong lúc bisect, Git thường checkout các commit đang kiểm tra. `git bisect reset` kết thúc phiên và đưa HEAD về vị trí trước đó.\n\n---\n\n## 📖 Định nghĩa\n`git bisect` tìm commit đầu tiên làm xuất hiện một lỗi bằng cách chọn commit ở giữa khoảng thời gian từ mốc tốt đến mốc hỏng. Bạn kiểm tra phiên bản đó rồi đánh dấu `good` hoặc `bad`; quá trình hiệu quả khi tình trạng lỗi có thể kiểm tra nhất quán và chuyển từ tốt sang hỏng một lần trong khoảng đã chọn.\n\n---\n\n## 💡 Tại sao cần\nTrong kho mã nguồn có hàng ngàn commit, kiểm tra tuần tự từng commit mất nhiều ngày. Với `git bisect`, 1.000 commit chỉ cần tối đa khoảng 10 lần chạy thử ($2^{10} = 1024$), giúp bạn tiết kiệm đến 99% thời gian điều tra lỗi phát sinh.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung trò đoán số từ 1 đến 100. Thay vì đoán từng số 1, 2, 3, bạn đoán ngay số 50. Người quản trò nói lỗi ở sau 50, bạn lập tức bỏ 50 số đầu và đoán tiếp 75. Chỉ sau vài bước chia đôi, bạn tìm ra chính xác số bí mật.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình tìm kiếm nhị phân của git bisect:\nMốc Good: C1 (Chạy tốt)                  Mốc Bad: C8 (Bị lỗi!)\nPhạm vi ban đầu: C1 ──► C2 ──► C3 ──► C4 ──► C5 ──► C6 ──► C7 ──► C8\n\nBước 1: Git nhảy tới C4 ở giữa -> Test thấy Good!\nPhạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6 ──► C7 ──► C8(Bad)\n\nBước 2: Git nhảy tới C6 ở giữa -> Test thấy Bad!\nPhạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6(Bad)\n\nBước 3: Git nhảy tới C5 -> Test thấy Bad!\nKẾT LUẬN: C5 chính là commit đầu tiên gây ra lỗi!\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nHệ thống xuất hóa đơn bị lỗi trên production. Kỹ sư Bách biết tag `v1.2.0` vẫn tốt còn `HEAD` bị lỗi. Bách dùng `git bisect start`, đánh dấu hai mốc, rồi kiểm tra từng commit Git chọn. Với khoảng 500 commit, trong trường hợp lý tưởng cần khoảng 9 lượt kiểm tra; sau cùng Bách xác nhận hash và diff của commit đầu tiên bị lỗi.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit bisect start\ngit bisect bad\ngit bisect good <commit-hoặc-tag>\ngit bisect reset\ngit bisect run <file-chay-kiem-thu>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git bisect start`: Khởi động phiên làm việc tìm kiếm nhị phân của bisect.\n- `git bisect bad`: Đánh dấu commit hiện tại là commit bị lỗi.\n- `git bisect good <hash/tag>`: Đánh dấu commit trong quá khứ là mốc hoạt động bình thường không có lỗi.\n- `git bisect reset`: Kết thúc phiên điều tra và đưa bạn quay trở về nhánh ban đầu.\n- `git bisect run <script>`: Trong Git thật, chạy script ở từng commit và đọc mã thoát để đánh dấu good/bad; dùng test ổn định và bảo đảm script chạy được ở các phiên bản cũ.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên kết thúc phiên bisect**: Sau khi tìm được commit, chạy `git bisect reset` để quay về vị trí trước phiên điều tra.\n2. **Đánh dấu nhầm good thành bad**: Làm sai lệch thuật toán nhị phân khiến Git nhảy sang phân vùng tìm kiếm hoàn toàn sai.\n3. **Chưa build dependencies**: Quên cài thư viện hoặc build code khiến bài test báo lỗi giả mạo không phải do commit gây ra.\n\n---\n\n## 🧪 Lab thực hành\nLàm trong kho thử nghiệm riêng có ít nhất một commit nền và sáu commit sau đó. Trong ví dụ này lỗi bắt đầu ở commit thứ ba sau nền.\n1. Tạo commit nền có `probe.txt` chứa `GOOD`.\n2. Tạo commit 1 và 2 bằng cách thêm `note1.txt`, `note2.txt`; commit 3 đổi `probe.txt` thành `BAD`; tạo commit 4, 5, 6 bằng cách thêm `note3.txt`, `note4.txt`, `note5.txt`.\n3. Chạy `git bisect start`, rồi `git bisect bad` để đánh dấu tip hiện tại là lỗi.\n4. Chạy `git bisect good HEAD~6` để đánh dấu commit nền tốt. Mở `probe.txt` tại từng commit Git checkout và đánh dấu `git bisect good` hoặc `git bisect bad` theo nội dung.\n5. Lặp lại cho đến khi Git in `is the first bad commit`; xác nhận commit đó chính là commit đổi `probe.txt` thành `BAD`.\n6. Chạy `git bisect reset` và xác nhận `git status` cùng nhánh hiện tại trở về trước phiên tìm kiếm.\n\n---\n\n## 💡 Hint & mẹo\n> Khi kết thúc điều tra, chạy `git bisect reset` để rời commit đang kiểm tra và trở về vị trí trước phiên bisect.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Tìm được commit đầu tiên có nội dung `BAD` trong ví dụ và xác nhận bằng thông điệp commit.\n- Kết thúc phiên bằng `git bisect reset`; chỉ thử `git bisect run` trong Git thật với script trả kết quả tin cậy.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ thám tử git bisect.\n\n---\n\n## 🚀 Thử thách nâng cao\nViết một đoạn script bash ngắn kiểm tra mã thoát (exit code) để chạy tự động với `git bisect run ./test.sh`.\n\n---\n\n## 📝 Tổng kết\n- `git bisect` dùng tìm kiếm nhị phân, cần khoảng $O(\\log N)$ lần kiểm tra trong trường hợp đơn giản và có mốc good/bad đáng tin.\n- Quy trình: `git bisect start` -> `bad` / `good` -> kiểm tra lặp lại -> `git bisect reset`.\n- Git thật có thể chạy kiểm thử tự động bằng `git bisect run <script>`; script phải trả đúng mã thoát.\n",
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
        "question": "Khi muốn kết thúc phiên bisect và quay về vị trí trước đó, nên chạy lệnh nào?",
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
            "text": "Mã thoát của script: 0 là Good; 1–127 là Bad, trừ 125 dùng để skip; mã khác làm dừng quy trình",
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
        "explanation": "Theo Git, 0 đánh dấu Good; 1–127 đánh dấu Bad, trừ 125 để bỏ qua commit không thể kiểm tra. Mã khác khiến bisect run dừng."
      },
      {
        "id": "q5",
        "question": "Câu lệnh nào sau đây dùng để đánh dấu commit hiện tại là commit chứa lỗi trong phiên làm việc với git bisect?",
        "type": "single",
        "options": [
          {
            "text": "git bisect bad",
            "correct": true
          },
          {
            "text": "git bisect broken",
            "correct": false
          },
          {
            "text": "git bisect fail",
            "correct": false
          },
          {
            "text": "git bisect error",
            "correct": false
          }
        ],
        "explanation": "Trong quy trình chuẩn của `git bisect`, bạn dùng `git bisect bad` để đánh dấu commit lỗi và `git bisect good` cho commit còn tốt."
      }
    ]
  }
};
export default lesson;
