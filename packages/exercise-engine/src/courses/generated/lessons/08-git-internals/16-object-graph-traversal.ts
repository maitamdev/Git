import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "16-object-graph-traversal",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "16-object-graph-traversal",
    "title": "Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)",
    "level": "advanced",
    "duration": 35,
    "xp": 100,
    "prerequisites": [
      "15-revision-syntax"
    ],
    "objectives": [
      "Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).",
      "Hiểu rõ khái niệm Reachability (Khả năng tiếp cận): đối tượng nào có thể chạm tới từ các References và đối tượng nào bị mồ côi (Dangling/Unreachable).",
      "Sử dụng lệnh plumbing git rev-list và git fsck để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "dag",
      "graph traversal",
      "reachability",
      "dangling objects",
      "git rev-list"
    ],
    "commands": [
      "git rev-list --all --count",
      "git fsck --unreachable",
      "git log --graph --oneline --all"
    ]
  },
  "content": "# Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)\n\n---\n\n## 🎯 Mục tiêu bài học\n- Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n- Hiểu rõ khái niệm Reachability (Khả năng tiếp cận): đối tượng nào có thể chạm tới từ các References và đối tượng nào bị mồ côi (Dangling/Unreachable).\n- Sử dụng lệnh plumbing git rev-list và git fsck để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối.\n\n---\n\n## 📖 Định nghĩa\n> Trong khoa học máy tính, lịch sử và cơ sở dữ liệu đối tượng của Git được mô hình hóa chính xác dưới dạng một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG). Trong đồ thị này, các Đỉnh (Vertices/Nodes) là các đối tượng Commit, Tree, Blob, và các Cạnh có hướng (Directed Edges) là các con trỏ phụ thuộc trỏ ngược chiều thời gian (Commit trỏ về Commit cha, Commit trỏ về Root Tree, Tree trỏ về Blob). Tính chất \"Không chu trình\" (Acyclic) bảo đảm rằng không bao giờ có một commit nào có thể là tổ tiên của chính mình.\n\n---\n\n## 🤔 Tại sao cần?\nHiểu rõ cấu trúc Đồ thị có hướng không chu trình (DAG) là chìa khóa then chốt để giải mã khái niệm \"Khả năng tiếp cận\" (Reachability) trong Git. Một đối tượng chỉ thực sự tồn tại có ý nghĩa nếu có ít nhất một con trỏ tham chiếu (nhánh làm việc, thẻ tag, hoặc HEAD) có thể duyệt tới nó theo các cạnh của đồ thị. Khi bạn xóa một nhánh hay reset commit, Git không hề xóa tệp tin ngay lập tức; đối tượng đó chỉ tạm thời trở thành Đối tượng mồ côi (Dangling Object) nằm lơ lửng trong đồ thị cho đến khi tiến trình dọn rác thu hồi.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng một cây cổ thụ sum suê xanh tốt trong một khu rừng kỳ bí. Các cành lớn và cành nhỏ đâm chồi từ thân cây vững chắc chính là các References và Commits (chúng được kết nối kiên cố). Nếu một người cầm cưa cắt đứt một cành cây nhỏ (hành động xóa nhánh), chiếc cành cây bị rơi xuống thảm cỏ bên dưới gốc cây. Chiếc cành đó vẫn còn nguyên lá tươi xanh (Dangling Object) trong vài tuần tiếp theo, bất kỳ ai đi ngang qua nhặt lên vẫn có thể cắm nó trở lại thân cây trước khi người gác rừng tiến hành dọn dẹp quét lá rụng đi đốt.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nMô hình Đồ thị DAG và Đối tượng mồ côi (Dangling):\n[Branch: main] ──► (Commit C3) ──► (Commit C2) ──► (Commit C1)  <── CÁC NODE REACHABLE\n                         │\n                         ▼\n                    [Tree: T3] ──► [Blob: B1]\n\n(Commit D2) ──► (Commit D1)  <── BỊ CẮT ĐỨT (DANGLING / UNREACHABLE OBJECTS)\n     ▲\n     │ (Không có nhánh hay thẻ nào trỏ tới, nhưng tệp vẫn nằm trong .git/objects!)\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư phần mềm thực hiện lệnh `git reset --hard HEAD~3` và hoảng hốt nhận ra mình vừa làm mất một tính năng chưa kịp đẩy lên remote. Kỹ sư bình tĩnh mở terminal và chạy lệnh plumbing kiểm tra tính toàn vẹn của đồ thị: `git fsck --lost-found`. Git lập tức quét toàn bộ đồ thị DAG và thông báo: `dangling commit 8a7b6c5d4e3f`. Kỹ sư sử dụng lệnh `git cat-file -p 8a7b6c` để kiểm tra nội dung và xác nhận đúng là commit tính năng bị mất. Bằng cách gõ `git merge 8a7b6c`, toàn bộ nhánh mồ côi được nối lại vào thân cây chính của đồ thị DAG một cách ngoạn mục.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit rev-list --all --count\ngit fsck --unreachable\ngit log --graph --oneline --all\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git rev-list đếm chính xác tổng số commit có thể tiếp cận trong toàn bộ đồ thị, git fsck --unreachable rà soát và phát hiện tất cả các đối tượng bị đứt kết nối mồ côi, và git log --graph trực quan hóa sinh động các cạnh liên kết của đồ thị DAG.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Nghĩ rằng các mũi tên trong đồ thị commit trỏ từ quá khứ đến tương lai**:  Trong Git, các con trỏ parent luôn trỏ NGƯỢC từ tương lai về quá khứ.\n2. **Sợ rằng các lệnh phân nhánh sẽ tạo ra đồ thị vô hạn**:  Thuật toán đồ thị của Git được tối ưu hóa cực đỉnh bằng kỹ thuật băm SHA-1.\n3. **Không biết cách sử dụng `git fsck` để tìm lại những commit bị mất sau khi thực hiện reset hard hoặc rebase lỗi.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Xem đồ thị toàn diện của repository bằng lệnh `git log --graph --oneline --all`.\n2. Tạo một commit thử nghiệm, sau đó chạy `git reset --hard HEAD~1` để biến commit đó thành mồ côi.\n3. Chạy lệnh `git fsck --unreachable` để truy vết ra mã băm của commit vừa bị cắt đứt.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Mọi commit vừa bị mất do reset hard đều có thể tìm lại được thông qua `git fsck` hoặc `git reflog`.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nĐịnh vị và khôi phục thành công một commit mồ côi (dangling commit) trở lại nhánh làm việc.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra khả năng tư duy đồ thị DAG của bạn qua bài trắc nghiệm sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nTại sao việc thiết kế con trỏ trỏ ngược về quá khứ (Commit trỏ về Parent) lại an toàn hơn rất nhiều so với việc con trỏ trỏ xuôi về tương lai trong hệ thống phân tán?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Lịch sử Git là một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n- Các con trỏ parent luôn trỏ ngược chiều từ commit mới về commit tổ tiên.\n- Đối tượng không có con trỏ tham chiếu nào chạm tới được gọi là Unreachable/Dangling Object và có thể cứu hộ bằng `git fsck`.\n",
  "quiz": {
    "id": "quiz-08-git-internals-16-object-graph-traversal",
    "title": "Trắc nghiệm: Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)",
    "questions": [
      {
        "id": "q1",
        "question": "Tính chất \"Không chu trình\" (Acyclic) trong đồ thị DAG của Git đảm bảo điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Không bao giờ xảy ra trường hợp một commit lại trở thành tổ tiên của chính mình (không có vòng lặp vô hạn)",
            "correct": true
          },
          {
            "text": "Các commit không bao giờ được phép phân nhánh",
            "correct": false
          },
          {
            "text": "Chỉ có đúng một người được phép commit",
            "correct": false
          },
          {
            "text": "Dung lượng repository không bao giờ vượt quá 1 GB",
            "correct": false
          }
        ],
        "explanation": "Vì các cạnh đồ thị trỏ ngược về quá khứ theo mã băm mật mã, không thể tạo ra một chu trình khép kín quay lại chính mình."
      },
      {
        "id": "q2",
        "question": "Thuật ngữ \"Dangling Commit\" (Commit mồ côi) trong Git ám chỉ điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Một commit vẫn tồn tại trong cơ sở dữ liệu đối tượng nhưng không có bất kỳ nhánh hay thẻ nào trỏ tới để tiếp cận",
            "correct": true
          },
          {
            "text": "Một commit bị nhiễm virus máy tính",
            "correct": false
          },
          {
            "text": "Một commit được tạo bởi người dùng ẩn danh",
            "correct": false
          },
          {
            "text": "Một commit không chứa bất kỳ dòng mã nào",
            "correct": false
          }
        ],
        "explanation": "Dangling commit là node bị đứt kết nối khỏi hệ thống tham chiếu của đồ thị, thường do reset hard hoặc xóa nhánh."
      },
      {
        "id": "q3",
        "question": "Lệnh Plumbing nào dùng để kiểm tra tính toàn vẹn của đồ thị đối tượng và liệt kê các đối tượng không thể tiếp cận?",
        "type": "single",
        "options": [
          {
            "text": "git fsck",
            "correct": true
          },
          {
            "text": "git graph-check",
            "correct": false
          },
          {
            "text": "git repair-dag",
            "correct": false
          },
          {
            "text": "git scan-lost",
            "correct": false
          }
        ],
        "explanation": "`git fsck` (File System Consistency Check) là lệnh chuyên dụng để xác thực đồ thị đối tượng và tìm các đối tượng mồ côi."
      },
      {
        "id": "q4",
        "question": "Trong đồ thị Git, hướng của các cạnh liên kết giữa các commit diễn ra như thế nào?",
        "type": "single",
        "options": [
          {
            "text": "Trỏ ngược từ commit con về commit cha (ngược chiều thời gian)",
            "correct": true
          },
          {
            "text": "Trỏ xuôi từ commit cha tới commit con",
            "correct": false
          },
          {
            "text": "Trỏ hai chiều qua lại",
            "correct": false
          },
          {
            "text": "Không có hướng xác định",
            "correct": false
          }
        ],
        "explanation": "Khi tạo commit mới, nó ghi mã băm của commit cha đã có sẵn; do đó mũi tên liên kết luôn trỏ ngược về quá khứ."
      }
    ]
  }
};
export default lesson;
