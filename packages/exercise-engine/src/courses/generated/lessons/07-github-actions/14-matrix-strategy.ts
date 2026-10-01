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
  "content": "# Chiến lược ma trận kiểm thử đa môi trường (Matrix Strategy)\n\n## 🎯 Mục tiêu\n- Hiểu rõ khái niệm và sức mạnh của Matrix Strategy trong việc mở rộng kiểm thử đa cấu hình tự động.\n- Biết cách khai báo ma trận đa chiều: kết hợp nhiều phiên bản ngôn ngữ và nhiều hệ điều hành.\n- Sử dụng các thuộc tính nâng cao: `include` (bổ sung trường hợp đặc biệt), `exclude` (loại trừ tổ hợp không mong muốn) và `max-parallel`.\n\n## 🧩 Từ khóa hôm nay\n### Matrix Strategy\n- **Nói dễ hiểu**: Chiến lược cấu hình cho phép tự động nhân bản một Job thành nhiều Job con chạy trên các môi trường khác nhau.\n- **Ví dụ**: Khai báo `node: [18, 20, 22]` để chạy đồng thời bài test trên cả 3 phiên bản Node.js.\n- **Đừng nhầm**: Bạn chỉ cần viết một Job duy nhất, GitHub Actions sẽ tự động sinh ra các phiên bản tương ứng.\n\n### Cartesian Product\n- **Nói dễ hiểu**: Tích Đề-các toán học giữa các chiều ma trận; số Job con sinh ra bằng tích số phần tử của các danh sách.\n- **Ví dụ**: Ma trận có 2 hệ điều hành và 3 phiên bản Node sẽ tự động tạo ra 6 Job con chạy song song (2 x 3 = 6).\n- **Đừng nhầm**: Không phải phép cộng (2 + 3 = 5); thêm một chiều ma trận sẽ làm số lượng Job tăng theo cấp số nhân.\n\n### fail-fast Property\n- **Nói dễ hiểu**: Thuộc tính kiểm soát việc có hủy bỏ các Job con còn lại hay không khi phát hiện một Job con bị lỗi.\n- **Ví dụ**: Đặt `fail-fast: false` để nếu Node 18 bị lỗi thì Node 20 và 22 vẫn tiếp tục chạy đến khi có kết quả đầy đủ.\n- **Đừng nhầm**: Mặc định `fail-fast: true` sẽ dừng ngay toàn bộ ma trận khi có một lỗi đầu tiên nhằm tiết kiệm thời gian.\n\n## 📖 Định nghĩa\nChiến lược ma trận (Matrix Strategy) là cơ chế cao cấp trong GitHub Actions cho phép bạn sử dụng các biến cấu hình để tự động tạo ra một tập hợp nhiều Job con chạy song song từ một định nghĩa Job duy nhất. Bằng cách khai báo khối `strategy: matrix:`, GitHub Actions sẽ tự động tính toán tích Đề-các của tất cả các mảng giá trị đầu vào để sinh ra toàn bộ các tổ hợp môi trường cần kiểm thử.\n\n## 💡 Tại sao cần\nKhi phát triển phần mềm hoặc thư viện đa nền tảng, việc chỉ kiểm thử trên một phiên bản duy nhất là rất rủi ro. Có những tính năng chạy tốt trên Linux nhưng lại bị lỗi trên Windows do khác biệt dấu gạch chéo đường dẫn. Matrix Strategy giúp bạn kiểm tra toàn diện mọi môi trường mà không cần sao chép tệp YAML ra hàng chục Job giống hệt nhau.\n\n## 🧠 Mental Model\nHãy hình dung xưởng may áo sơ mi thử nghiệm một mẫu thiết kế mới. Thay vì may thủ công từng chiếc, người quản lý lập bảng ma trận gồm 3 Kích cỡ (S, M, L) và 3 Màu sắc (Đỏ, Xanh, Trắng). Bằng một chỉ thị duy nhất, hệ thống tự động sinh ra 9 tổ hợp sản phẩm (3 x 3 = 9) và giao cho 9 thợ may thực hiện cùng một lúc để kiểm tra độ vừa vặn của từng màu trên từng kích cỡ.\n\n## 📊 Sơ đồ minh họa\n```mermaid\nflowchart TD\n    Config[\"strategy.matrix: os [ubuntu, windows] & node [18, 20]\"] --> M1[\"Job 1: ubuntu + node 18\"]\n    Config --> M2[\"Job 2: ubuntu + node 20\"]\n    Config --> M3[\"Job 3: windows + node 18\"]\n    Config --> M4[\"Job 4: windows + node 20\"]\n```\n\n## 🏢 Ví dụ thực tế\nMột nhóm phát triển công cụ dòng lệnh mã nguồn mở thiết lập ma trận: hệ điều hành gồm `[ubuntu-latest, windows-latest, macos-latest]` và phiên bản Node gồm `[18, 20, 22]`. Khi có PR, GitHub Actions tự động phân rã thành 9 Jobs chạy đồng thời. Kết quả cho thấy 8 Jobs đều báo xanh, nhưng Job Windows với Node 18 bị đỏ do hàm xử lý đường dẫn `\\` đặc thù. Nhờ đó, lập trình viên sửa lỗi ngay trước khi phát hành cho người dùng.\n\n## 💻 Command & Cú pháp\n```bash\n# Kiểm tra phiên bản node được cài đặt trong job con hiện tại\nnode -v\n\n# Chạy kiểm thử ứng dụng trong môi trường ma trận\nnpm test\n```\n\n## 🔍 Giải thích command\n- `node -v`: Xác minh phiên bản Node.js của Runner con đang thực thi đúng giá trị `${{ matrix.node }}`.\n- `npm test`: Thực thi bài kiểm thử ứng dụng trên môi trường ma trận được cấp phát riêng biệt.\n\n## ⚠️ Sai lầm phổ biến\n- Tạo ma trận quá lớn (ví dụ 5 hệ điều hành kết hợp 5 trình duyệt kết hợp 5 phiên bản Node = 125 Jobs) làm cạn kiệt định mức phút miễn phí của tài khoản.\n- Không đặt `fail-fast: false` khi muốn xem kết quả kiểm thử trên toàn bộ các môi trường còn lại.\n- Dùng sai cú pháp của `include` hoặc `exclude` khiến các tổ hợp không được lọc theo đúng mong muốn.\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. Khởi tạo một tệp workflow sử dụng Matrix Strategy:\n   ```yaml\n   name: Matrix Strategy Demo\n   on: [workflow_dispatch]\n   jobs:\n     test:\n       runs-on: ${{ matrix.os }}\n       strategy:\n         fail-fast: false\n         matrix:\n           os: [ubuntu-latest, windows-latest]\n           node: [18, 20]\n       steps:\n         - name: Cài đặt Node.js\n           uses: actions/setup-node@v4\n           with:\n             node-version: ${{ matrix.node }}\n         - name: Kiểm tra môi trường\n           run: |\n             echo \"Đang chạy trên OS: ${{ matrix.os }} với Node: ${{ matrix.node }}\"\n             node -v\n   ```\n2. Đẩy commit lên GitHub và kích hoạt bằng nút Run workflow.\n3. Quan sát tab Actions hiển thị 4 Job con riêng biệt chạy song song trên các hệ điều hành và phiên bản tương ứng.\n\n## 💡 Hint & mẹo\n- Đặt `fail-fast: false` bên trong `strategy:` nếu bạn muốn các phiên bản khác vẫn tiếp tục chạy khi có một phiên bản bị lỗi sớm.\n- Bạn có thể dùng `max-parallel: 2` để giới hạn số lượng Job con chạy đồng thời nếu lo ngại quá tải tài nguyên mạng.\n\n## ✅ Validation & Kết quả mong đợi\n- Bảng điều khiển GitHub Actions mở rộng hiển thị đầy đủ danh sách 4 Job con độc lập.\n- Mỗi Job con hiển thị đúng cặp giá trị hệ điều hành và phiên bản Node trong tiêu đề thực thi.\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài trắc nghiệm bên dưới để kiểm tra khả năng tư duy và thiết lập ma trận kiểm thử trong GitHub Actions.\n\n## 🚀 Thử thách nâng cao\nSử dụng thuộc tính `exclude` trong ma trận gồm 3 hệ điều hành và 3 phiên bản Node để loại trừ duy nhất trường hợp Windows kết hợp với Node 18 do hệ thống cũ không hỗ trợ.\n\n## 📝 Tổng kết\n- `strategy: matrix:` tự động tạo ra nhiều Job con bằng tích Đề-các của các danh sách giá trị.\n- Giúp kiểm thử tương thích đa môi trường (hệ điều hành, phiên bản runtime, cơ sở dữ liệu) chỉ với một định nghĩa duy nhất.\n- Kiểm soát tiến trình ma trận linh hoạt thông qua các thuộc tính `fail-fast`, `include`, và `exclude`.\n",
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
      },
      {
        "id": "q5",
        "question": "Thuộc tính `include` trong cấu hình ma trận `strategy.matrix` mang lại khả năng gì?",
        "type": "single",
        "options": [
          {
            "text": "Cho phép bổ sung thêm một tổ hợp cấu hình tùy chỉnh hoặc thêm biến phụ trợ vào các tổ hợp có sẵn",
            "correct": true
          },
          {
            "text": "Bắt buộc tất cả các tệp tin trong repository phải được biên dịch",
            "correct": false
          },
          {
            "text": "Nhúng thêm mã HTML vào giao diện hiển thị của GitHub",
            "correct": false
          },
          {
            "text": "Đưa thêm các bài kiểm tra từ một repository khác vào chạy chung",
            "correct": false
          }
        ],
        "explanation": "Thuộc tính `include:` cho phép mở rộng ma trận bằng cách thêm các tổ hợp cấu hình mới hoặc bổ sung thuộc tính đặc thù cho một tổ hợp cụ thể."
      }
    ]
  }
};
export default lesson;
