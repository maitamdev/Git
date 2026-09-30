import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "03-git-branch",
  "moduleId": "03-branching",
  "metadata": {
    "id": "03-git-branch",
    "title": "Quản lý nhánh với git branch",
    "level": "intermediate",
    "duration": 25,
    "xp": 80,
    "prerequisites": [
      "01-branch-concept"
    ],
    "objectives": [
      "Sử dụng thành thạo câu lệnh `git branch` cùng các cờ tùy chọn nâng cao: `-a`, `-r`, `-vv`, `--merged`.",
      "Xóa nhánh an toàn với cờ `-d` và xóa nhánh cưỡng chế với cờ `-D`.",
      "Đổi tên nhánh cục bộ nhanh chóng bằng cờ `-m`.",
      "Kiểm soát và dọn dẹp các nhánh đã hợp nhất để giữ kho lưu trữ luôn tinh gọn."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "create-branch"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git branch",
      "quan ly nhanh",
      "xoa nhanh",
      "danh sach nhanh",
      "branch list"
    ],
    "commands": [
      "git branch",
      "git branch -a",
      "git branch -vv",
      "git branch -m <tên-cũ> <tên-mới>",
      "git branch -d <tên-nhánh>",
      "git branch -D <tên-nhánh>"
    ]
  },
  "content": "# Quản lý nhánh với git branch\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng thành thạo câu lệnh `git branch` cùng các cờ tùy chọn nâng cao: `-a`, `-r`, `-vv`, `--merged`.\n- Xóa nhánh an toàn với cờ `-d` và xóa nhánh cưỡng chế với cờ `-D`.\n- Đổi tên nhánh cục bộ nhanh chóng bằng cờ `-m`.\n- Kiểm soát và dọn dẹp các nhánh đã hợp nhất để giữ kho lưu trữ luôn tinh gọn.\n\n---\n\n## 📖 Định nghĩa\n> `git branch` là câu lệnh quản trị đa năng phục vụ việc tạo mới, liệt kê danh sách, đổi tên, kiểm tra trạng thái và xóa bỏ các nhánh trong kho lưu trữ Git cục bộ. Khi chạy không kèm đối số, lệnh hiển thị toàn bộ các nhánh cục bộ hiện hữu trên máy tính của bạn. Khi kết hợp với các cờ tùy chọn chuyên dụng, `git branch` trở thành công cụ đắc lực giúp bạn duy trì một cấu trúc kho chứa sạch sẽ và chuyên nghiệp.\n\n---\n\n## 🤔 Tại sao cần?\nTrong các dự án quy mô lớn, mỗi tuần có thể có hàng chục nhánh tính năng và nhánh sửa lỗi được tạo ra. Nếu không biết cách quản lý và dọn dẹp thường xuyên, danh sách nhánh của bạn sẽ phình to thành hàng trăm mục rác, gây khó khăn cho việc định vị nhánh cần làm và tăng nguy cơ thao tác nhầm lẫn. Nắm vững lệnh `git branch` giúp bạn làm chủ quy trình kiểm soát phiên bản và tự tin phối hợp nhóm trơn tru.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git branch` giống như cuốn sổ danh bạ quản lý các đường dây điện thoại nội bộ trong một tòa nhà văn phòng hiện đại. Người quản trị mạng điện thoại có thể mở danh bạ ra xem phòng ban nào đang có máy nhánh (liệt kê), đăng ký thêm một số máy nội bộ mới cho nhân viên mới vào (tạo nhánh), đổi tên phòng ban khi tái cơ cấu (đổi tên nhánh), và cắt bỏ đường dây của các dự án đã kết thúc (xóa nhánh).\n\n---\n\n## 🖼 Sơ đồ\n```text\nQuản lý vòng đời nhánh với git branch:\nTạo nhánh:       git branch feature-auth\nXem danh sách:   git branch -vv\nĐổi tên nhánh:   git branch -m old-name new-name\nXóa an toàn:     git branch -d feature-auth (chỉ xóa khi đã merge)\nXóa cưỡng chế:   git branch -D feature-auth (xóa bất kể chưa merge)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nSau khi tính năng giỏ hàng đã được gộp thành công vào nhánh main và đưa lên máy chủ kiểm thử, kỹ sư Nam muốn dọn dẹp máy tính cá nhân để chuẩn bị không gian làm việc cho sprint tiếp theo. Nam chạy lệnh `git branch --merged` để kiểm tra danh sách toàn bộ các nhánh đã được tích hợp trọn vẹn vào main. Thấy nhánh feature-cart xuất hiện trong danh sách an toàn, Nam tự tin gõ lệnh: `git branch -d feature-cart`. Git lập tức thông báo xóa thành công con trỏ nhánh, giúp danh sách nhánh cục bộ của Nam luôn gọn gàng, tinh tươm và không để lại bất kỳ dữ liệu rác thừa nào gây nhầm lẫn khi làm việc.\n\n---\n\n## 💻 Command\n```bash\ngit branch\ngit branch -a\ngit branch -vv\ngit branch -m <tên-cũ> <tên-mới>\ngit branch -d <tên-nhánh>\ngit branch -D <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ.\n- `git branch -a`: Liệt kê tất cả các nhánh bao gồm cả nhánh cục bộ và nhánh theo dõi từ xa (remote-tracking branches).\n- `git branch -vv`: Hiển thị chi tiết commit đỉnh, thông điệp commit và mối quan hệ đồng bộ với nhánh remote upstream.\n- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên nhánh chỉ định sang tên mới chuẩn mực.\n- `git branch -d <nhánh>`: Xóa nhánh có kiểm tra an toàn (từ chối xóa nếu nhánh chứa commit chưa được merge).\n- `git branch -D <nhánh>`: Xóa nhánh cưỡng chế (tương đương `--delete --force`), bỏ qua kiểm tra an toàn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Cố gắng xóa nhánh mà mình đang đứng trực tiếp**:  Git sẽ báo lỗi từ chối; bạn phải switch sang nhánh khác (như main) trước khi xóa.\n2. **Dùng cờ -D bừa bãi**:  Vô tình xóa mất nhánh chứa các dòng code chưa kịp merge mà không hay biết.\n3. **Quên dọn dẹp nhánh sau khi đã merge**:  Khiến danh sách nhánh tích tụ hàng trăm mục cũ gây rối mắt.\n\n---\n\n## 🧪 Lab\n1. Tạo một nhánh thử nghiệm bằng lệnh `git branch temp-test`.\n2. Đổi tên nhánh vừa tạo thành `experiment` bằng lệnh `git branch -m temp-test experiment`.\n3. Chạy `git branch` để xác nhận tên mới xuất hiện trong danh sách.\n4. Xóa nhánh đó an toàn bằng câu lệnh `git branch -d experiment`.\n\n---\n\n## 💡 Hint\n> Hãy đứng ở nhánh `main` khi bạn muốn xóa các nhánh tính năng phụ.\n\n---\n\n## ✅ Validation\n- Xác nhận nhánh thử nghiệm đã được dọn dẹp sạch sẽ khỏi kết quả `git branch`.\n\n---\n\n## ❓ Quiz\nHãy hoàn thành bài trắc nghiệm dưới đây về các thao tác quản lý nhánh với git branch.\n\n---\n\n## 🔥 Challenge\nTìm hiểu cách sử dụng lệnh `git branch --merged` và `git branch --no-merged` để tự động hóa dọn dẹp kho chứa.\n\n---\n\n## 📚 Tổng kết\n- `git branch` là lệnh cốt lõi để tạo, xem, đổi tên và xóa các nhánh cục bộ.\n- Dùng `-d` để xóa an toàn sau khi đã merge, dùng `-D` để xóa cưỡng chế khi muốn vứt bỏ code nháp.\n- Không thể xóa nhánh mà bạn hiện đang đứng làm việc trực tiếp.\n",
  "quiz": {
    "id": "quiz-03-03-git-branch",
    "title": "Trắc nghiệm: Quản lý nhánh với git branch",
    "questions": [
      {
        "id": "q1",
        "question": "Điều gì sẽ xảy ra nếu bạn cố gắng chạy lệnh `git branch -d feature` khi bạn đang đứng trực tiếp trên nhánh `feature`?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ báo lỗi từ chối xóa vì không thể xóa nhánh mà con trỏ HEAD đang đứng trực tiếp",
            "correct": true
          },
          {
            "text": "Git sẽ tự động xóa nhánh và thoát khỏi terminal ngay lập tức",
            "correct": false
          },
          {
            "text": "Git sẽ tự động chuyển bạn về nhánh main rồi mới xóa",
            "correct": false
          },
          {
            "text": "Git sẽ xóa toàn bộ ổ cứng máy tính để làm sạch",
            "correct": false
          }
        ],
        "explanation": "Bạn không thể xóa nhánh hiện tại; bạn phải chuyển sang nhánh khác (ví dụ: git switch main) rồi mới xóa."
      },
      {
        "id": "q2",
        "question": "Sự khác biệt cốt lõi giữa hai cờ xóa nhánh `git branch -d` và `git branch -D` là gì?",
        "type": "single",
        "options": [
          {
            "text": "`-d` có cơ chế bảo vệ an toàn (chỉ xóa khi đã merge), còn `-D` cưỡng chế xóa bất kể code chưa được merge",
            "correct": true
          },
          {
            "text": "`-d` dùng cho hệ điều hành Windows, `-D` dùng cho hệ điều hành macOS",
            "correct": false
          },
          {
            "text": "`-d` chỉ xóa trên máy tính cá nhân, `-D` xóa luôn cả máy chủ GitHub",
            "correct": false
          },
          {
            "text": "Hai cờ này hoàn toàn giống nhau 100% không có khác biệt nào",
            "correct": false
          }
        ],
        "explanation": "`-D` là viết tắt của `--delete --force`, ép buộc xóa bỏ nhánh ngay cả khi có commit chưa hợp nhất."
      },
      {
        "id": "q3",
        "question": "Lệnh nào sau đây dùng để đổi tên nhánh hiện tại bạn đang đứng thành tên mới `feature-auth`?",
        "type": "single",
        "options": [
          {
            "text": "git branch -m feature-auth",
            "correct": true
          },
          {
            "text": "git branch --rename feature-auth",
            "correct": false
          },
          {
            "text": "git name-change feature-auth",
            "correct": false
          },
          {
            "text": "git update-title feature-auth",
            "correct": false
          }
        ],
        "explanation": "Cờ `-m` (viết tắt của move/rename) đổi tên nhánh; nếu không truyền tên cũ thì đổi tên nhánh hiện tại."
      },
      {
        "id": "q4",
        "question": "Cờ tùy chọn nào của lệnh git branch giúp hiển thị tất cả các nhánh bao gồm cả nhánh từ xa trên GitHub?",
        "type": "single",
        "options": [
          {
            "text": "-a (hoặc --all)",
            "correct": true
          },
          {
            "text": "-r-only",
            "correct": false
          },
          {
            "text": "--global-branch",
            "correct": false
          },
          {
            "text": "-f (full)",
            "correct": false
          }
        ],
        "explanation": "`git branch -a` liệt kê toàn bộ nhánh cục bộ và nhánh theo dõi từ xa (dạng remotes/origin/main)."
      },
      {
        "id": "q5",
        "question": "Để lọc ra danh sách các nhánh tính năng đã được hợp nhất an toàn vào nhánh hiện tại, bạn dùng cờ nào?",
        "type": "single",
        "options": [
          {
            "text": "--merged",
            "correct": true
          },
          {
            "text": "--done",
            "correct": false
          },
          {
            "text": "--finished",
            "correct": false
          },
          {
            "text": "--safe-delete",
            "correct": false
          }
        ],
        "explanation": "`git branch --merged` chỉ liệt kê các nhánh mà toàn bộ commit đã nằm trong nhánh hiện tại."
      },
      {
        "id": "q6",
        "question": "Khi bạn chạy lệnh `git branch -vv`, thông tin bổ sung quan trọng nào được hiển thị?",
        "type": "single",
        "options": [
          {
            "text": "Mã commit đỉnh, thông điệp commit và trạng thái so sánh đi trước/sau với nhánh remote tracking",
            "correct": true
          },
          {
            "text": "Địa chỉ nhà riêng và số tài khoản ngân hàng của tác giả",
            "correct": false
          },
          {
            "text": "Dung lượng RAM đang tiêu tốn của hệ điều hành",
            "correct": false
          },
          {
            "text": "Tốc độ quay của quạt tản nhiệt máy tính",
            "correct": false
          }
        ],
        "explanation": "`-vv` (very verbose) hiển thị chi tiết commit hash, subject và tracking branch kèm trạng thái ahead/behind."
      }
    ]
  }
};
export default lesson;
