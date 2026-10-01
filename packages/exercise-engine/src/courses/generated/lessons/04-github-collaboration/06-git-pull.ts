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
  "content": "# Đồng bộ và gộp code với git pull\n\n---\n\n## 🎯 Mục tiêu\n- Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.\n- Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.\n- Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.\n- Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### git pull\n- **Nói dễ hiểu**: Lệnh tải mã nguồn mới từ máy chủ về và tự động gộp ngay vào nhánh bạn đang đứng.\n- **Ví dụ**: `git pull origin main` để lấy toàn bộ commit mới của đồng nghiệp trên GitHub về máy.\n- **Đừng nhầm**: Không phải một lệnh nguyên tử đơn lẻ; bản chất lệnh là chạy `git fetch` rồi đến `git merge`.\n\n### git pull --rebase\n- **Nói dễ hiểu**: Chiến lược gộp code bằng cách đưa các commit riêng của bạn lên trên đỉnh các commit mới kéo về.\n- **Ví dụ**: `git pull --rebase origin main` giúp tránh sinh commit gộp rác và giữ nhánh thẳng tắp.\n- **Đừng nhầm**: Không xóa code của bạn; Git chỉ tạm thời gỡ commit cá nhân ra và đắp lại sau.\n\n### pull conflict\n- **Nói dễ hiểu**: Xung đột xảy ra khi bạn và đồng nghiệp cùng sửa trên cùng một dòng code trong cùng một file.\n- **Ví dụ**: Đồng nghiệp sửa hàm login trên server, bạn cũng sửa hàm login ở máy và chạy git pull.\n- **Đừng nhầm**: Không phải lỗi làm hỏng dự án; Git chỉ dừng lại yêu cầu bạn xác nhận giữ phiên bản nào.\n\n---\n\n## 📖 Định nghĩa\n`git pull` là câu lệnh tổng hợp trong Git, kết hợp hai thao tác liên tiếp: đầu tiên thực hiện `git fetch` để tải các commit mới nhất từ máy chủ, sau đó chạy `git merge` để tự động gộp những commit đó vào nhánh hiện tại trong Working Directory.\n\n---\n\n## 💡 Tại sao cần\nKhi làm việc nhóm, các thành viên liên tục đẩy code mới lên máy chủ chung. Lệnh `git pull` giúp bạn cập nhật tiến độ dự án mỗi ngày, đảm bảo bạn đang phát triển tính năng mới dựa trên phiên bản mới nhất và giảm thiểu nguy cơ xung đột lớn về sau.\n\n---\n\n## 🧠 Mental Model\nNếu `git fetch` là nhân viên bưu tá đặt kiện hàng vào hòm thư trước cổng, thì `git pull` là bạn tự ra mở hòm thư, mang gói hàng vào phòng khách và bày lên bàn làm việc. Nếu trong gói hàng có món đồ trùng vị trí trên bàn, bạn sẽ dừng lại sắp xếp cho ngăn nắp.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nBản chất hai pha của câu lệnh git pull:\n┌────────────────────────────────────────────────────────┐\n│                      git pull                          │\n│  ┌───────────────────────┐   ┌───────────────────────┐  │\n│  │ 1. git fetch origin   │ + │ 2. git merge FETCH_HEAD│  │\n│  └───────────────────────┘   └───────────────────────┘  │\n└────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nSáng thứ Hai, kỹ sư Hoàng mở dự án trên máy cá nhân. Nhánh main của Hoàng đang ở commit C2, trong khi đồng nghiệp đã đẩy C3, C4 lên GitHub. Hoàng chạy `git pull origin main`. Git lập tức tải C3, C4 về và tua nhanh con trỏ nhánh lên C4. Toàn bộ tính năng mới xuất hiện trong editor của Hoàng chỉ sau 2 giây mà không cần thao tác thủ công.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\ngit pull\ngit pull origin <tên-nhánh>\ngit pull --rebase\ngit pull --ff-only\n```\n\n---\n\n## 🔍 Giải thích command\n- `git pull`: Kéo và gộp dữ liệu từ nhánh theo dõi mặc định trên remote vào nhánh hiện tại.\n- `git pull origin <nhánh>`: Chỉ định cụ thể tên remote và tên nhánh cần kéo về gộp.\n- `git pull --rebase`: Gộp code theo chiến lược rebase, đặt commit cục bộ lên đỉnh lịch sử mới tải về.\n- `git pull --ff-only`: Chỉ cho phép kéo về nếu có thể tua nhanh (Fast-forward), từ chối gộp nếu có phân kỳ lịch sử.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Pull khi Working Directory còn thay đổi dở dang**: Git có thể từ chối gộp đè lên file chưa commit; nên commit hoặc cất vào stash trước khi pull.\n2. **Quên rằng pull là fetch cộng merge**: Dẫn đến bối rối khi thấy xuất hiện merge commit ngoài ý muốn hoặc gặp conflict.\n3. **Kéo nhầm nhánh khác vào nhánh đang đứng**: Gõ `git pull origin develop` khi đang đứng ở `main` sẽ làm gộp mã nguồn develop vào main.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác kéo cập nhật từ remote và kiểm tra lịch sử commit.\n1. Đứng tại nhánh `main` và kiểm tra trạng thái sạch sẽ bằng `git status`.\n2. Thực hiện câu lệnh `git pull origin main` để cập nhật mã nguồn mới nhất.\n3. Quan sát thông báo Git tự động thực hiện hai bước fetch và merge.\n4. Kiểm tra lại nhật ký lịch sử bằng `git log --oneline -n 3` để xác nhận commit mới đã tích hợp.\n\n---\n\n## 💡 Hint & mẹo\n> Tập thói quen chạy `git pull` vào đầu mỗi buổi làm việc trước khi bắt tay vào viết dòng code mới.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lịch sử commit trên nhánh cục bộ bắt kịp commit mới nhất trên remote.\n- Trạng thái `git status` báo `Your branch is up to date with 'origin/main'`.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về bản chất hai pha của git pull.\n\n---\n\n## 🚀 Thử thách nâng cao\nCấu hình Git tự động rebase mỗi khi pull bằng lệnh `git config --global pull.rebase true` và quan sát cây lịch sử commit sau khi thực hiện.\n\n---\n\n## 📝 Tổng kết\n- `git pull` = `git fetch` (tải về) kết hợp với `git merge` (gộp vào).\n- Giúp đồng bộ mã nguồn mới nhất từ máy chủ vào thẳng Working Directory.\n- Sử dụng `--rebase` khi muốn giữ lịch sử commit dạng một đường thẳng tinh gọn.\n",
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
