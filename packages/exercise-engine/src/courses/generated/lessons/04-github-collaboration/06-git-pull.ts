import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "06-git-pull",
  "moduleId": "04-github-collaboration",
  "metadata": {
    "id": "06-git-pull",
    "title": "Đồng bộ và gộp code với git pull",
    "level": "intermediate",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "05-git-fetch"
    ],
    "objectives": [
      "Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.",
      "Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.",
      "Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.",
      "Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull."
    ],
    "completion": {
      "theoryViewed": true,
      "labs": [
        "pull-remote"
      ],
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git pull",
      "fetch and merge",
      "dong bo code",
      "pull rebase",
      "cap nhat local"
    ],
    "commands": [
      "git pull",
      "git pull origin <tên-nhánh>",
      "git pull --rebase",
      "git pull --ff-only"
    ]
  },
  "content": "# Đồng bộ và gộp code với git pull\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.\n- Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.\n- Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.\n- Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull.\n\n---\n\n## 📖 Định nghĩa\n> `git pull` là câu lệnh tiện ích tổng hợp trong Git, kết hợp hai thao tác liên tiếp vào trong một bước duy nhất: đầu tiên nó thực thi `git fetch` để tải về toàn bộ các commit mới nhất từ máy chủ từ xa, sau đó ngay lập tức thực thi `git merge` để tự động gộp các commit mới đó vào nhánh cục bộ mà bạn đang đứng làm việc. Nếu hai bên cùng sửa các dòng code mâu thuẫn, quá trình pull sẽ dừng lại và yêu cầu giải quyết conflict.\n\n---\n\n## 🤔 Tại sao cần?\nTrong quy trình làm việc hàng ngày, `git pull` là câu lệnh đầu tiên bạn gõ mỗi sáng khi mở máy tính bắt đầu ngày làm việc mới, nhằm bảo đảm mã nguồn trên máy cá nhân luôn bắt kịp tiến độ mới nhất của toàn đội ngũ. Nắm vững bản chất hai pha (fetch + merge) của lệnh pull giúp bạn tự tin xử lý mọi xung đột phát sinh và biết cách cấu hình pull rebase để giữ lịch sử dự án luôn thẳng thớm.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy hình dung nếu `git fetch` là việc nhân viên bưu tá đem gói bưu phẩm đặt vào chiếc hộp thư trước cửa nhà bạn, thì `git pull` là việc bạn tự động cầm chìa khóa ra mở hộp thư, bưng gói bưu phẩm vào phòng khách và mở toang bưu phẩm ra trộn chung vào bàn làm việc của bạn. Hành động này rất tiện lợi và nhanh chóng, nhưng nếu trong bưu phẩm có đồ vật trùng lặp với thứ bạn đang cầm trên tay, bạn sẽ phải dừng lại sắp xếp.\n\n---\n\n## 🖼 Sơ đồ\n```text\nBản chất hai pha của câu lệnh git pull:\n┌────────────────────────────────────────────────────────┐\n│                      git pull                          │\n│  ┌───────────────────────┐   ┌───────────────────────┐  │\n│  │ 1. git fetch origin   │ + │ 2. git merge FETCH_HEAD│  │\n│  └───────────────────────┘   └───────────────────────┘  │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nĐầu giờ sáng thứ Hai, kỹ sư Hoàng mở dự án phần mềm trên máy tính cá nhân. Nhánh main của Hoàng đang ở commit C2. Trong hai ngày cuối tuần, các đồng nghiệp đã hoàn thành tính năng thông báo và đẩy các commit C3, C4 lên GitHub. Hoàng gõ lệnh: `git pull origin main`. Git lập tức tải hai commit C3, C4 về và tự động thực hiện Fast-forward merge đưa con trỏ nhánh main của Hoàng lên mốc C4. Toàn bộ mã nguồn mới nhất xuất hiện ngay trong VS Code của Hoàng chỉ sau 2 giây mà không phát sinh thêm bất kỳ thao tác thủ công nào.\n\n---\n\n## 💻 Command\n```bash\ngit pull\ngit pull origin <tên-nhánh>\ngit pull --rebase\ngit pull --ff-only\n```\n\n---\n\n## 🔍 Giải thích command\n- `git pull`: Kéo và gộp dữ liệu từ nhánh upstream tương ứng được cấu hình mặc định.\n- `git pull origin <nhánh>`: Chỉ định rõ ràng remote và tên nhánh cần kéo về gộp vào nhánh hiện tại.\n- `git pull --rebase`: Thay vì tạo Merge Commit, Git sẽ rebase các commit cục bộ của bạn lên trên đỉnh của commit mới kéo về, giữ lịch sử tuyến tính.\n- `git pull --ff-only`: Chỉ cho phép pull nếu có thể tua nhanh (Fast-forward), từ chối pull nếu phát sinh phân kỳ lịch sử.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Chạy git pull khi Working Directory đang có nhiều thay đổi dở dang chưa commit**:  Có thể bị Git từ chối hoặc gây xung đột phức tạp; nên commit hoặc stash trước.\n2. **Mù quáng dùng git pull mà không hiểu nó là fetch + merge**:  Gây bối rối khi bỗng nhiên thấy xuất hiện một Merge Commit lạ hoặc bị dính conflict.\n3. **Kéo nhầm nhánh khác vào nhánh hiện tại**:  Gõ `git pull origin develop` khi đang đứng ở `main` sẽ làm gộp develop vào main.\n\n---\n\n## 🧪 Lab\n1. Đứng tại nhánh `main` và kiểm tra trạng thái bằng `git status`.\n2. Thực hiện câu lệnh `git pull origin main` để cập nhật mã nguồn mới nhất.\n3. Quan sát Git thực hiện tự động fetch và merge.\n4. Kiểm tra lại nhật ký lịch sử bằng `git log --oneline -n 3` để xác nhận commit mới đã tích hợp.\n\n---\n\n## 💡 Hint\n> Luôn giữ thói quen `git pull` đầu ngày làm việc trước khi bắt tay vào viết dòng code mới.\n\n---\n\n## ✅ Validation\n- Nhánh cục bộ đồng bộ thành công với nhánh remote và Working Tree cập nhật sạch sẽ.\n\n---\n\n## ❓ Quiz\nHãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git pull.\n\n---\n\n## 🔥 Challenge\nNêu ưu điểm của cấu hình `git config --global pull.rebase true` đối với việc giữ lịch sử dự án tinh gọn.\n\n---\n\n## 📚 Tổng kết\n- `git pull` = `git fetch` (tải về) + `git merge` (gộp vào).\n- Đồng bộ mã nguồn từ GitHub vào thẳng Working Directory của bạn.\n- Sử dụng `--rebase` để giữ lịch sử là một đường thẳng đẹp mắt.\n",
  "quiz": {
    "id": "quiz-04-06-git-pull",
    "title": "Trắc nghiệm: Đồng bộ code với git pull",
    "questions": [
      {
        "id": "q1",
        "question": "Về mặt bản chất kỹ thuật, câu lệnh `git pull` tương đương hoàn toàn với sự kết hợp tuần tự của hai câu lệnh nào?",
        "type": "single",
        "options": [
          {
            "text": "git fetch kết hợp với git merge",
            "correct": true
          },
          {
            "text": "git add kết hợp với git commit",
            "correct": false
          },
          {
            "text": "git checkout kết hợp với git push",
            "correct": false
          },
          {
            "text": "git branch kết hợp với git status",
            "correct": false
          }
        ],
        "explanation": "`git pull` là câu lệnh tắt: đầu tiên tải dữ liệu bằng `fetch`, sau đó gộp vào bằng `merge`."
      },
      {
        "id": "q2",
        "question": "Điều gì sẽ xảy ra nếu cả bạn và đồng nghiệp cùng chỉnh sửa một dòng code trong cùng một tệp tin khi bạn thực hiện `git pull`?",
        "type": "single",
        "options": [
          {
            "text": "Git sẽ phát hiện Merge Conflict, tạm dừng quá trình gộp và chèn các vạch đánh dấu xung đột vào tệp để bạn xử lý",
            "correct": true
          },
          {
            "text": "Git sẽ tự động xóa code của bạn và lấy code của đồng nghiệp",
            "correct": false
          },
          {
            "text": "Git sẽ xóa toàn bộ kho lưu trữ trên máy tính của bạn",
            "correct": false
          },
          {
            "text": "Máy chủ GitHub sẽ tự động tắt nguồn",
            "correct": false
          }
        ],
        "explanation": "Vì pull có chứa pha merge nên nếu có mâu thuẫn dòng code, Git sẽ kích hoạt quy trình giải quyết conflict."
      },
      {
        "id": "q3",
        "question": "Lợi ích của việc sử dụng câu lệnh `git pull --rebase` thay vì `git pull` thông thường là gì?",
        "type": "single",
        "options": [
          {
            "text": "Tránh việc sinh ra các commit merge rác không cần thiết, giúp lịch sử dự án luôn là một đường thẳng tuyến tính",
            "correct": true
          },
          {
            "text": "Tăng gấp đôi tốc độ tải mạng Internet",
            "correct": false
          },
          {
            "text": "Tự động kiểm tra lỗi logic lập trình trong mã nguồn",
            "correct": false
          },
          {
            "text": "Bảo vệ máy tính khỏi các cuộc tấn công mạng",
            "correct": false
          }
        ],
        "explanation": "`--rebase` đặt các commit của bạn lên trên đỉnh của các commit mới kéo về, loại bỏ commit merge thừa."
      },
      {
        "id": "q4",
        "question": "Thời điểm vàng được các chuyên gia khuyến nghị luôn luôn nên thực hiện câu lệnh `git pull` là khi nào?",
        "type": "single",
        "options": [
          {
            "text": "Đầu mỗi buổi sáng khi bắt đầu làm việc hoặc trước khi chuẩn bị tạo một nhánh tính năng mới",
            "correct": true
          },
          {
            "text": "Chỉ thực hiện một lần duy nhất khi dự án kết thúc bàn giao",
            "correct": false
          },
          {
            "text": "Chỉ thực hiện vào các ngày cuối tuần",
            "correct": false
          },
          {
            "text": "Khi máy tính sắp hết pin",
            "correct": false
          }
        ],
        "explanation": "Luôn kéo code mới nhất về trước khi code giúp bạn làm việc trên nền tảng mới nhất và giảm thiểu nguy cơ xung đột."
      },
      {
        "id": "q5",
        "question": "Cờ `--ff-only` trong lệnh `git pull --ff-only` có tác dụng bảo vệ nào?",
        "type": "single",
        "options": [
          {
            "text": "Chỉ cho phép kéo code về nếu có thể tua nhanh Fast-forward, từ chối pull nếu phát sinh nút giao rẽ nhánh",
            "correct": true
          },
          {
            "text": "Ép buộc máy tính phải khởi động lại sau khi pull",
            "correct": false
          },
          {
            "text": "Tự động xóa tất cả các nhánh con đã hoàn thành",
            "correct": false
          },
          {
            "text": "Chỉ tải về các tệp tin có dung lượng dưới 1 kilobyte",
            "correct": false
          }
        ],
        "explanation": "`--ff-only` ngăn chặn việc vô tình sinh ra commit merge khi lịch sử của bạn và server đã bị phân kỳ."
      },
      {
        "id": "q6",
        "question": "Nếu trong Working Directory của bạn đang có tệp sửa đổi dở dang chưa commit mà bị conflict khi pull, hành động an toàn nên làm trước là gì?",
        "type": "single",
        "options": [
          {
            "text": "Lưu tạm thay đổi vào bộ nhớ đệm bằng lệnh `git stash` hoặc commit tạm thời trước khi pull",
            "correct": true
          },
          {
            "text": "Xóa vĩnh viễn tệp tin đó đi",
            "correct": false
          },
          {
            "text": "Tắt phần mềm diệt virus trên máy tính",
            "correct": false
          },
          {
            "text": "Đổi tên tài khoản người dùng máy tính",
            "correct": false
          }
        ],
        "explanation": "`git stash` giúp cất gọn gàng các thay đổi chưa xong, đưa Working Tree về trạng thái sạch sẽ an toàn để pull."
      }
    ]
  }
};
export default lesson;
