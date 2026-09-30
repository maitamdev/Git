import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "14-matrix-strategy",
  "moduleId": "07-github-actions",
  "metadata": {
    "id": "14-matrix-strategy",
    "title": "Chiến lược ma trận kiểm thử đa môi trường (Matrix Strategy)",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "13-conditional-execution-if"
    ],
    "objectives": [
      "Hiểu rõ khái niệm và sức mạnh của Matrix Strategy trong việc mở rộng kiểm thử đa cấu hình tự động.",
      "Biết cách khai báo ma trận đa chiều: kết hợp nhiều phiên bản ngôn ngữ và nhiều hệ điều hành.",
      "Sử dụng các thuộc tính nâng cao: include (bổ sung trường hợp đặc biệt), exclude (loại trừ tổ hợp không mong muốn) và max-parallel."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "matrix strategy",
      "test matrix",
      "multi environment",
      "cross platform",
      "combinatorial build"
    ],
    "commands": [
      "npm test",
      "node -v"
    ]
  },
  "content": "# Chiến lược ma trận kiểm thử đa môi trường (Matrix Strategy)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Hiểu rõ khái niệm và sức mạnh của Matrix Strategy trong việc mở rộng kiểm thử đa cấu hình tự động.\n- Biết cách khai báo ma trận đa chiều: kết hợp nhiều phiên bản ngôn ngữ và nhiều hệ điều hành.\n- Sử dụng các thuộc tính nâng cao: include (bổ sung trường hợp đặc biệt), exclude (loại trừ tổ hợp không mong muốn) và max-parallel.\n\n---\n\n## 📖 Định nghĩa\n> Chiến lược ma trận (Matrix Strategy) là cơ chế cao cấp trong GitHub Actions cho phép bạn sử dụng các biến cấu hình để tự động tạo ra một tập hợp nhiều Job con chạy song song từ một định nghĩa Job duy nhất. Bằng cách khai báo khối từ khóa `strategy: matrix:`, GitHub Actions sẽ tự động tính toán tích Đề-các (Cartesian product) của tất cả các mảng giá trị đầu vào để sinh ra toàn bộ các tổ hợp môi trường cần kiểm thử một cách nhanh chóng và tối ưu.\n\n---\n\n## 🤔 Tại sao cần?\nKhi phát triển một thư viện hoặc phần mềm đa nền tảng, việc chỉ kiểm thử trên một phiên bản Node.js hay một hệ điều hành duy nhất là cực kỳ mạo hiểm. Có những tính năng hoạt động hoàn hảo trên Node 20 trên Linux nhưng lại bị lỗi trên Node 18 hoặc trên Windows do khác biệt về đường dẫn tệp tin. Nếu không có Matrix, bạn sẽ phải sao chép tệp YAML ra hàng chục Job giống hệt nhau, gây ác mộng khi cần bảo trì.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy hình dung một xưởng sản xuất quần áo may thử nghiệm một mẫu áo sơ mi mới. Thay vì may thủ công từng cái một, người quản lý lập một bảng ma trận gồm 3 Kích cỡ (S, M, L) và 3 Màu sắc (Đỏ, Xanh, Trắng). Bằng một lệnh duy nhất, hệ thống tự động sinh ra 9 tổ hợp sản phẩm khác nhau (3 x 3 = 9) và giao cho 9 thợ may thực hiện cùng một lúc để kiểm tra độ vừa vặn của từng màu trên từng kích cỡ.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nTích Đề-các của Matrix Strategy:\nstrategy:\n  matrix:\n    os: [ubuntu-latest, windows-latest]     (2 giá trị)\n    node: [18, 20]                          (2 giá trị)\n\nSinh ra 4 Jobs chạy SONG SONG:\n┌────────────────────────────────────────┐\n│ • test (os: ubuntu-latest, node: 18)   │\n│ • test (os: ubuntu-latest, node: 20)   │\n│ • test (os: windows-latest, node: 18)  │\n│ • test (os: windows-latest, node: 20)  │\n└────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nNhóm phát triển một thư viện công cụ dòng lệnh mã nguồn mở thiết lập ma trận kiểm thử: hệ điều hành gồm [ubuntu-latest, windows-latest, macos-latest] và phiên bản Node gồm [18, 20, 22]. Khi một lập trình viên gửi Pull Request, GitHub Actions tự động phân rã thành 9 Jobs chạy đồng thời trên 9 máy ảo độc lập. Kết quả cho thấy 8 Jobs đều báo xanh, nhưng Job chạy trên Windows với Node 18 bị đỏ do hàm xử lý dấu gạch chéo đường dẫn `\\` của Windows. Lập trình viên lập tức phát hiện và sửa lỗi ngay trước khi người dùng thực tế tải thư viện về.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\nnpm test\nnode -v\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nCác câu lệnh bên trong Step của Job ma trận sử dụng biến ngữ cảnh `${{ matrix.node }}` và `${{ matrix.os }}` để cài đặt chính xác phiên bản môi trường cho từng máy ảo cụ thể.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Tạo ma trận quá lớn (ví dụ**:  5 OS x 5 Browser x 5 Node = 125 Jobs) làm cạn kiệt toàn bộ hạn ngạch tính toán miễn phí của tài khoản.\n2. **Không sử dụng thuộc tính `fail-fast**:  false` khi muốn xem toàn bộ kết quả của mọi tổ hợp kể cả khi một tổ hợp bị lỗi sớm.\n3. **Sử dụng sai cú pháp của `include` hoặc `exclude` dẫn đến việc các tổ hợp không được loại trừ như mong đợi.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Khai báo khối `strategy: matrix:` cho Job `test` với biến `node: [18, 20]`.\n2. Sử dụng `${{ matrix.node }}` trong step `actions/setup-node@v4` để cài đặt phiên bản tương ứng.\n3. Quan sát trên giao diện xem hệ thống có tự động sinh ra 2 Job con chạy song song hay không.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Đặt `fail-fast: false` bên trong `strategy:` nếu bạn muốn các phiên bản khác vẫn tiếp tục chạy khi có một phiên bản bị lỗi.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nHệ thống tự động mở rộng và hiển thị đầy đủ danh sách các Job con tương ứng với ma trận cấu hình.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra khả năng tư duy và thiết lập ma trận kiểm thử qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để sử dụng thuộc tính exclude trong ma trận gồm 3 hệ điều hành và 3 phiên bản Node để loại trừ duy nhất trường hợp Windows kết hợp với Node 16?\n\n---\n\n## 📚 Tổng kết kiến thức\n- `strategy: matrix:` tự động tạo ra nhiều Job con bằng tích Đề-các của các danh sách giá trị.\n- Giúp kiểm thử tương thích đa môi trường (hệ điều hành, phiên bản runtime, cơ sở dữ liệu) chỉ với một định nghĩa duy nhất.\n- Hỗ trợ `include` để thêm biến phụ và `exclude` để loại bỏ các tổ hợp không hợp lệ.\n",
  "quiz": {
    "id": "quiz-07-github-actions-14-matrix-strategy",
    "title": "Trắc nghiệm: Chiến lược ma trận kiểm thử đa môi trường (Matrix Strategy)",
    "questions": [
      {
        "id": "q1",
        "question": "Nếu ma trận khai báo `os: [ubuntu, windows]` và `node: [18, 20, 22]`, có tổng cộng bao nhiêu Job con sẽ được sinh ra?",
        "type": "single",
        "options": [
          {
            "text": "6 Jobs (2 x 3 = 6)",
            "correct": true
          },
          {
            "text": "5 Jobs (2 + 3 = 5)",
            "correct": false
          },
          {
            "text": "2 Jobs",
            "correct": false
          },
          {
            "text": "3 Jobs",
            "correct": false
          }
        ],
        "explanation": "Số lượng Job con được tính bằng tích Đề-các giữa số phần tử của các chiều trong ma trận: 2 nhân 3 bằng 6."
      },
      {
        "id": "q2",
        "question": "Thuộc tính `fail-fast: true` (mặc định) trong strategy có hành vi như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Ngay khi một Job con trong ma trận bị lỗi, GitHub Actions lập tức hủy bỏ tất cả các Job con còn lại đang chạy",
            "correct": true
          },
          {
            "text": "Tự động sửa lỗi cho các bài kiểm thử",
            "correct": false
          },
          {
            "text": "Ép các Job con phải chạy thật nhanh gấp đôi",
            "correct": false
          },
          {
            "text": "Bỏ qua hoàn toàn bài test bị lỗi mà không thông báo",
            "correct": false
          }
        ],
        "explanation": "`fail-fast: true` giúp tiết kiệm chi phí bằng cách dừng ngay toàn bộ ma trận khi đã phát hiện có ít nhất một môi trường bị lỗi."
      },
      {
        "id": "q3",
        "question": "Cú pháp nào sau đây dùng để truy cập giá trị của biến `version` đang xét trong Step của ma trận?",
        "type": "single",
        "options": [
          {
            "text": "${{ matrix.version }}",
            "correct": true
          },
          {
            "text": "${{ env.version }}",
            "correct": false
          },
          {
            "text": "${{ job.version }}",
            "correct": false
          },
          {
            "text": "$MATRIX_VERSION",
            "correct": false
          }
        ],
        "explanation": "Ngữ cảnh `matrix` chứa giá trị hiện tại của các biến ma trận được gán riêng cho từng Job con cụ thể."
      },
      {
        "id": "q4",
        "question": "Thuộc tính nào cho phép bạn loại bỏ một tổ hợp cụ thể không mong muốn khỏi ma trận?",
        "type": "single",
        "options": [
          {
            "text": "exclude",
            "correct": true
          },
          {
            "text": "remove",
            "correct": false
          },
          {
            "text": "ignore",
            "correct": false
          },
          {
            "text": "skip",
            "correct": false
          }
        ],
        "explanation": "Từ khóa `exclude:` trong cấu hình ma trận dùng để định nghĩa các cặp giá trị cần loại trừ khỏi danh sách thực thi."
      }
    ]
  }
};
export default lesson;
