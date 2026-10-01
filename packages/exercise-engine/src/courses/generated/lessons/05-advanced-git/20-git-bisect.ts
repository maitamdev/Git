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
  "content": "# git bisect\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.\n- Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.\n- Hiểu rõ hiệu quả toán học: Tìm ra commit lỗi trong 1000 commit chỉ với khoảng 10 lần kiểm tra (O(log N)).\n- Tự động hóa hoàn toàn quá trình tìm lỗi bằng câu lệnh `git bisect run <script-test>`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Git Bisect\n- **Nói dễ hiểu**: Công cụ điều tra tự động giúp tìm ra commit đầu tiên gây lỗi bằng thuật toán tìm kiếm nhị phân chia đôi lịch sử.\n- **Ví dụ**: Dùng `git bisect start`, đánh dấu `git bisect bad` và `git bisect good v1.0` để Git tự nhảy đến commit ở giữa.\n- **Đừng nhầm**: Git bisect không tự sửa lỗi code, nó chỉ tìm ra chính xác commit nào là nguyên nhân gây ra lỗi.\n\n### Good / Bad Commit\n- **Nói dễ hiểu**: Hai mốc đánh dấu trạng thái của mã nguồn: `good` là phiên bản còn chạy chuẩn, `bad` là phiên bản đã phát sinh lỗi.\n- **Ví dụ**: Đánh dấu `git bisect good` khi thấy tính năng in hóa đơn ở commit hiện tại vẫn hoạt động tốt.\n- **Đừng nhầm**: Nhớ gắn nhãn chính xác; nếu bạn đánh dấu nhầm good/bad thì Git sẽ bị điều hướng sang khoảng tìm kiếm sai.\n\n### Bisect Reset (git bisect reset)\n- **Nói dễ hiểu**: Lệnh kết thúc phiên điều tra bisect và đưa con trỏ HEAD quay trở về nhánh làm việc ban đầu.\n- **Ví dụ**: Gõ `git bisect reset` ngay sau khi Git in ra thông báo commit thủ phạm gây lỗi.\n- **Đừng nhầm**: Nếu quên reset, bạn sẽ tiếp tục bị mắc kẹt ở trạng thái Detached HEAD trên commit lỗi.\n\n---\n\n## 📖 Định nghĩa\n`git bisect` là công cụ điều tra lỗi trong Git hoạt động theo thuật toán tìm kiếm nhị phân (Binary Search). Bằng cách đánh dấu mốc tốt và mốc hỏng, Git liên tục chia đôi khoảng cách commit để tìm ra chính xác commit đầu tiên đưa lỗi vào hệ thống.\n\n---\n\n## 💡 Tại sao cần\nTrong kho mã nguồn có hàng ngàn commit, kiểm tra tuần tự từng commit mất nhiều ngày. Với `git bisect`, 1.000 commit chỉ cần tối đa khoảng 10 lần chạy thử ($2^{10} = 1024$), giúp bạn tiết kiệm đến 99% thời gian điều tra lỗi phát sinh.\n\n---\n\n## 🧠 Mental Model\nHãy hình dung trò đoán số từ 1 đến 100. Thay vì đoán từng số 1, 2, 3, bạn đoán ngay số 50. Người quản trò nói lỗi ở sau 50, bạn lập tức bỏ 50 số đầu và đoán tiếp 75. Chỉ sau vài bước chia đôi, bạn tìm ra chính xác số bí mật.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình tìm kiếm nhị phân của git bisect:\nMốc Good: C1 (Chạy tốt)                  Mốc Bad: C8 (Bị lỗi!)\nPhạm vi ban đầu: C1 ──► C2 ──► C3 ──► C4 ──► C5 ──► C6 ──► C7 ──► C8\n\nBước 1: Git nhảy tới C4 ở giữa -> Test thấy Good!\nPhạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6 ──► C7 ──► C8(Bad)\n\nBước 2: Git nhảy tới C6 ở giữa -> Test thấy Bad!\nPhạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6(Bad)\n\nBước 3: Git nhảy tới C5 -> Test thấy Bad!\nKẾT LUẬN: C5 chính là commit đầu tiên gây ra lỗi!\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nHệ thống xuất hóa đơn bị lỗi trên production. Kỹ sư Bách biết ở tag `v1.2.0` cách đây 500 commit code vẫn chạy tốt. Bách dùng `git bisect start`, gõ `bad` cho HEAD và `good v1.2.0`. Đúng 8 lần kiểm tra nhị phân, Git chỉ mặt điểm tên commit gây lỗi kèm tên tác giả và diff code.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit bisect start\ngit bisect bad\ngit bisect good <commit-hoặc-tag>\ngit bisect reset\ngit bisect run <file-chay-kiem-thu>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git bisect start`: Khởi động phiên làm việc tìm kiếm nhị phân của bisect.\n- `git bisect bad`: Đánh dấu commit hiện tại là commit bị lỗi.\n- `git bisect good <hash/tag>`: Đánh dấu commit trong quá khứ là mốc hoạt động bình thường không có lỗi.\n- `git bisect reset`: Kết thúc phiên điều tra và đưa bạn quay trở về nhánh ban đầu.\n- `git bisect run <script>`: Tự động hóa 100%: Git sẽ tự động chạy file script kiểm thử và tự đánh dấu good/bad.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên gõ `git bisect reset`**: Khiến bạn bị mắc kẹt ở trạng thái Detached HEAD trên commit lỗi sau khi điều tra xong.\n2. **Đánh dấu nhầm good thành bad**: Làm sai lệch thuật toán nhị phân khiến Git nhảy sang phân vùng tìm kiếm hoàn toàn sai.\n3. **Chưa build dependencies**: Quên cài thư viện hoặc build code khiến bài test báo lỗi giả mạo không phải do commit gây ra.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.\n1. Khởi động chế độ bisect bằng `git bisect start`.\n2. Đánh dấu commit hiện tại là lỗi bằng `git bisect bad`.\n3. Đánh dấu commit tốt trong quá khứ bằng `git bisect good HEAD~6`.\n4. Quan sát Git tự động checkout về commit ở giữa.\n5. Chạy thử nghiệm, gõ `git bisect good` hoặc `git bisect bad` tương ứng cho đến khi Git thông báo thủ phạm.\n6. Gõ `git bisect reset` để hoàn tất bài tập và quay về nhánh chính.\n\n---\n\n## 💡 Hint & mẹo\n> Luôn nhớ chạy `git bisect reset` ngay sau khi đã xác định được commit gây lỗi để đưa con trỏ HEAD trở về nhánh làm việc an toàn.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Sử dụng thành thạo quy trình `git bisect` để tìm ra chính xác commit gây lỗi trong chuỗi lịch sử.\n- Nắm vững cách kết hợp với test script bằng `git bisect run` để tự động hóa toàn bộ quá trình.\n\n---\n\n## ❓ Quiz nhanh\nHãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ thám tử git bisect.\n\n---\n\n## 🚀 Thử thách nâng cao\nViết một đoạn script bash ngắn kiểm tra mã thoát (exit code) để chạy tự động với `git bisect run ./test.sh`.\n\n---\n\n## 📝 Tổng kết\n- `git bisect` áp dụng tìm kiếm nhị phân $O(\\log N)$ để truy tìm lỗi cực nhanh.\n- Quy trình: `git bisect start` -> `bad` / `good` -> kiểm tra lặp lại -> `git bisect reset`.\n- Có thể tự động hóa hoàn toàn với `git bisect run <script>`.\n",
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
