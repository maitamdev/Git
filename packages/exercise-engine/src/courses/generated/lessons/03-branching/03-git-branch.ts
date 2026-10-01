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
  "content": "# Quản lý nhánh với git branch\n\n---\n\n## 🎯 Mục tiêu\n- Sử dụng lệnh `git branch` để xem danh sách nhánh và kiểm tra nhánh đang làm việc.\n- Đổi tên nhánh bằng cờ `-m` khi cần sửa tên cho đúng quy ước nhóm.\n- Xóa nhánh an toàn với cờ `-d` và phân biệt với xóa cưỡng chế bằng cờ `-D`.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git branch -d — xóa nhánh an toàn\n- **Nói dễ hiểu:** Lệnh xóa một nhánh chỉ khi nhánh đó đã được gộp đầy đủ vào nhánh chính.\n- **Ví dụ:** Sau khi tính năng `feature-cart` đã merge vào `main`, chạy `git branch -d feature-cart` để dọn dẹp.\n- **Đừng nhầm:** Git sẽ từ chối xóa bằng cờ `-d` nếu nhánh đó còn commit chưa được gộp, giúp bạn tránh mất dữ liệu.\n\n### git branch -D — xóa nhánh dứt khoát\n- **Nói dễ hiểu:** Lệnh ép buộc xóa một nhánh ngay cả khi các commit trên nhánh đó chưa hề được gộp.\n- **Ví dụ:** Bạn làm thử một tính năng nhưng quyết định hủy bỏ hoàn toàn nhánh `test-prototype`.\n- **Đừng nhầm:** Xóa bằng cờ `-D` sẽ bỏ qua lớp bảo vệ an toàn; chỉ dùng khi bạn chắc chắn không cần mã nguồn đó nữa.\n\n### git branch -m — đổi tên nhánh\n- **Nói dễ hiểu:** Đổi tên một nhánh cũ sang tên mới chuẩn mực và rõ nghĩa hơn.\n- **Ví dụ:** Chạy `git branch -m feat-log feature-login` để sửa tên nhánh theo đúng quy ước của nhóm.\n- **Đừng nhầm:** Đổi tên nhánh chỉ đổi nhãn con trỏ; toàn bộ commit và lịch sử bên trong nhánh vẫn giữ nguyên vẹn.\n\n---\n\n## 📖 Định nghĩa\n`git branch` là câu lệnh trung tâm để liệt kê, tạo mới, đổi tên và xóa bỏ các nhánh trong kho lưu trữ Git cục bộ. Khi chạy một mình, lệnh cho biết tất cả các nhánh hiện có và đánh dấu nhánh bạn đang đứng.\n\n---\n\n## 🤔 Tại sao cần?\nKhi dự án phát triển lâu dài, mỗi tính năng hoặc lần sửa lỗi đều tạo ra một nhánh mới. Nếu không kiểm tra và dọn dẹp các nhánh đã hoàn thành, danh sách nhánh sẽ phình to, gây khó khăn cho việc tìm kiếm và dễ khiến bạn gõ nhầm tên nhánh.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung `git branch` như danh bạ các đường dây liên lạc trong văn phòng. Bạn có thể mở danh bạ để xem đang có những đường dây nào (liệt kê), đăng ký thêm dây cho dự án mới (tạo nhánh), đổi lại tên phòng ban (đổi tên nhánh) hoặc cắt bỏ dây của dự án đã kết thúc (xóa nhánh).\n\n---\n\n## 🖼 Sơ đồ\n```text\nLiệt kê nhánh:   git branch\nĐổi tên nhánh:   git branch -m old-name new-name\nXóa an toàn:     git branch -d feature-cart   (chỉ xóa khi đã merge)\nXóa cưỡng chế:   git branch -D test-draft     (xóa bỏ code thử nghiệm)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nBạn Nam hoàn thành việc viết trang thông tin liên hệ trên nhánh `feature-contact` và đã gộp thành công vào nhánh `main`. Để máy tính cá nhân gọn gàng, Nam chuyển về `main` rồi chạy `git branch -d feature-contact`. Git xóa con trỏ nhánh an toàn vì biết toàn bộ commit của Nam đã nằm chắc chắn trong nhánh `main`.\n\n---\n\n## 💻 Command\n```bash\ngit branch\ngit branch -m <tên-cũ> <tên-mới>\ngit branch -d <tên-nhánh>\ngit branch -D <tên-nhánh>\n```\n\n---\n\n## 🔍 Giải thích command\n- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ của bạn.\n- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên nhánh chỉ định sang tên mới.\n- `git branch -d <tên-nhánh>`: Xóa nhánh đã được hợp nhất an toàn.\n- `git branch -D <tên-nhánh>`: Ép buộc xóa nhánh, bỏ qua bước kiểm tra đã hợp nhất hay chưa.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Đứng ngay trên nhánh đó rồi đòi xóa:** Git sẽ từ chối xóa nhánh mà bạn đang đứng; bạn phải chuyển sang nhánh khác như `main` rồi mới xóa được.\n2. **Dùng `-D` thành thói quen:** Dễ vô tình xóa mất những commit quan trọng mà bạn quên chưa gộp vào nhánh chính.\n3. **Quên dọn dẹp nhánh sau khi đã gộp xong:** Để lại hàng chục nhánh cũ không còn dùng đến khiến danh sách bị rối.\n\n---\n\n## 🧪 Lab\nBài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:\n1. Chạy `git branch` để kiểm tra danh sách nhánh hiện tại.\n2. Tạo nhánh thử nghiệm bằng lệnh `git branch temp-test`.\n3. Đổi tên nhánh thành `experiment` bằng lệnh `git branch -m temp-test experiment`.\n4. Xóa nhánh đó an toàn bằng lệnh `git branch -d experiment`.\n\n---\n\n## 💡 Hint\nHãy nhớ chuyển về nhánh `main` trước khi chạy lệnh xóa các nhánh tính năng phụ.\n\n---\n\n## ✅ Validation\n- Nhánh `experiment` được tạo, đổi tên và xóa thành công.\n- Lệnh `git branch` cuối cùng chỉ còn hiển thị nhánh `main`.\n\n---\n\n## ❓ Quiz\nTrả lời các câu hỏi sau để nắm vững các thao tác tạo, đổi tên và xóa nhánh với `git branch`.\n\n---\n\n## 🔥 Challenge\nChạy lệnh `git branch --merged` để xem Git lọc ra những nhánh nào đã được hợp nhất an toàn vào nhánh hiện tại.\n\n---\n\n## 📚 Tổng kết\n- `git branch` giúp quản lý toàn bộ vòng đời của các nhánh cục bộ trong dự án.\n- Dùng cờ `-m` để đổi tên nhánh và cờ `-d` để xóa nhánh an toàn sau khi hoàn thành.\n- Luôn chuyển sang nhánh khác trước khi thực hiện thao tác xóa nhánh.\n",
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
