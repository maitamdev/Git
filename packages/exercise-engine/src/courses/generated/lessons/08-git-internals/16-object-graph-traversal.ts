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
  "content": "# Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n- Hiểu rõ khái niệm Reachability (Khả năng tiếp cận): đối tượng nào có thể chạm tới từ các References và đối tượng nào bị mồ côi (Dangling/Unreachable).\n- Sử dụng lệnh plumbing `git rev-list` và `git fsck` để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối.\n- Hiểu lý do tại sao các con trỏ trong Git luôn trỏ ngược từ tương lai về quá khứ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Directed Acyclic Graph (DAG)\n- **Nói dễ hiểu**: Mô hình cấu trúc dữ liệu đồ thị có hướng và không bao giờ tạo thành một vòng lặp tròn lặp lại chính nó.\n- **Ví dụ**: Mỗi commit mới tạo ra sẽ trỏ về commit cha cũ, bạn có thể đi lùi mãi về commit đầu tiên nhưng không bao giờ quay lại tương lai.\n- **Đừng nhầm**: Không phải cây đơn nhánh; Git hỗ trợ rẽ nhánh song song và hợp nhất nhiều nhánh lại với nhau (Merge).\n\n### Dangling Object / Unreachable Commit\n- **Nói dễ hiểu**: Đối tượng commit hoặc blob vẫn còn nằm trong `.git/objects/` nhưng không còn bất kỳ nhánh hay thẻ nào trỏ tới để tiếp cận.\n- **Ví dụ**: Khi bạn lỡ tay chạy `git reset --hard HEAD~1`, commit vừa bị bỏ rơi biến thành dangling commit.\n- **Đừng nhầm**: Chưa bị xóa khỏi ổ đĩa ngay; nó vẫn nằm đó trong 30 đến 90 ngày cho đến khi bộ dọn rác `git gc` dọn dẹp.\n\n### git fsck Command\n- **Nói dễ hiểu**: Lệnh plumbing kiểm tra tính toàn vẹn của hệ thống tệp tin và quét tìm tất cả các đối tượng mồ côi bị đứt kết nối.\n- **Ví dụ**: Chạy `git fsck --lost-found` để tìm lại mã SHA-1 của commit tưởng như đã mất sau khi reset nhầm.\n- **Đừng nhầm**: Không làm hỏng mã nguồn; đây là lệnh chỉ đọc an toàn dùng để kiểm tra sức khỏe và cứu hộ dữ liệu.\n\n---\n\n## 📖 Định nghĩa\nTrong khoa học máy tính, lịch sử và cơ sở dữ liệu đối tượng của Git được mô hình hóa chính xác dưới dạng một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG). Trong đồ thị này, các Đỉnh (Vertices/Nodes) là các đối tượng Commit, Tree, Blob, và các Cạnh có hướng (Directed Edges) là các con trỏ phụ thuộc trỏ ngược chiều thời gian (Commit trỏ về Commit cha, Commit trỏ về Root Tree, Tree trỏ về Blob). Tính chất \"Không chu trình\" (Acyclic) bảo đảm rằng không bao giờ có một commit nào có thể là tổ tiên của chính mình.\n\n---\n\n## 💡 Tại sao cần\nHiểu rõ cấu trúc Đồ thị có hướng không chu trình (DAG) là chìa khóa then chốt để giải mã khái niệm \"Khả năng tiếp cận\" (Reachability) trong Git. Một đối tượng chỉ thực sự tồn tại có ý nghĩa nếu có ít nhất một con trỏ tham chiếu (nhánh làm việc, thẻ tag, hoặc HEAD) có thể duyệt tới nó theo các cạnh của đồ thị. Khi bạn xóa một nhánh hay reset commit, Git không hề xóa tệp tin ngay lập tức; đối tượng đó chỉ tạm thời trở thành Đối tượng mồ côi (Dangling Object) nằm lơ lửng trong đồ thị cho đến khi tiến trình dọn rác thu hồi.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng một cây cổ thụ sum suê xanh tốt trong một khu rừng kỳ bí. Các cành lớn và cành nhỏ đâm chồi từ thân cây vững chắc chính là các References và Commits (chúng được kết nối kiên cố). Nếu một người cầm cưa cắt đứt một cành cây nhỏ (hành động xóa nhánh), chiếc cành cây bị rơi xuống thảm cỏ bên dưới gốc cây. Chiếc cành đó vẫn còn nguyên lá tươi xanh (Dangling Object) trong vài tuần tiếp theo, bất kỳ ai đi ngang qua nhặt lên vẫn có thể cắm nó trở lại thân cây trước khi người gác rừng tiến hành dọn dẹp quét lá rụng đi đốt.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình Đồ thị DAG và Đối tượng mồ côi (Dangling):\n[Branch: main] ──► (Commit C3) ──► (Commit C2) ──► (Commit C1)  <── CÁC NODE REACHABLE\n                         │\n                         ▼\n                    [Tree: T3] ──► [Blob: B1]\n\n(Commit D2) ──► (Commit D1)  <── BỊ CẮT ĐỨT (DANGLING / UNREACHABLE OBJECTS)\n     ▲\n     │ (Không có nhánh hay thẻ nào trỏ tới, nhưng tệp vẫn nằm trong .git/objects)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư phần mềm thực hiện lệnh `git reset --hard HEAD~3` và hoảng hốt nhận ra mình vừa làm mất một tính năng chưa kịp đẩy lên remote. Kỹ sư bình tĩnh mở terminal và chạy lệnh plumbing kiểm tra tính toàn vẹn của đồ thị: `git fsck --lost-found`. Git lập tức quét toàn bộ đồ thị DAG và thông báo: `dangling commit 8a7b6c5d4e3f`. Kỹ sư sử dụng lệnh `git cat-file -p 8a7b6c` để kiểm tra nội dung và xác nhận đúng là commit tính năng bị mất. Bằng cách gõ `git merge 8a7b6c` hoặc `git branch rescue-feature 8a7b6c`, toàn bộ nhánh mồ côi được nối lại vào thân cây chính của đồ thị DAG một cách ngoạn mục.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Đếm số lượng commit có thể tiếp cận trong toàn bộ đồ thị\ngit rev-list --all --count\n\n# Quét và tìm tất cả các đối tượng bị mất liên kết (dangling)\ngit fsck --unreachable\n\n# Vẽ trực quan sơ đồ các nhánh của đồ thị DAG\ngit log --graph --oneline --all\n\n# Duyệt danh sách các commit từ mới đến cũ theo thứ tự đồ thị\ngit rev-list HEAD\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rev-list --all --count`: Duyệt qua toàn bộ các con trỏ ref và đếm số lượng node commit tiếp cận được.\n- `git fsck --unreachable`: Rà soát toàn bộ tệp trong `.git/objects/` và in ra các mã băm không có đường đi từ bất kỳ ref nào.\n- `git log --graph --oneline --all`: Vẽ sơ đồ ASCII trực quan biểu diễn các cạnh hợp nhất và phân nhánh của đồ thị.\n- `git rev-list HEAD`: In ra danh sách toàn bộ các commit SHA-1 từ commit hiện tại ngược về root commit.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng mũi tên trong Git trỏ từ quá khứ đến tương lai**: Con trỏ `parent` trong đối tượng commit luôn trỏ NGƯỢC từ commit con về commit cha (ngược chiều thời gian).\n2. **Lo sợ dữ liệu bị xóa mất ngay khi reset hard**: Các đối tượng commit vẫn nằm nguyên vẹn trong thư mục `.git/objects/` dưới dạng dangling objects và hoàn toàn có thể cứu hộ.\n3. **Không biết dùng `git fsck` khi gặp sự cố**: Vội vàng clone lại repo hoặc viết lại code từ đầu thay vì chỉ cần 1 lệnh để tìm lại commit bị mất.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Xem đồ thị toàn diện của repository bằng lệnh `git log --graph --oneline --all`.\n2. **Bước 2**: Tạo một commit thử nghiệm, sau đó chạy `git reset --hard HEAD~1` để tách rời commit đó khỏi nhánh chính.\n3. **Bước 3**: Chạy lệnh `git fsck --unreachable` và tìm dòng `unreachable commit <mã_sha>`.\n4. **Bước 4**: Chạy `git branch rescue <mã_sha>` để nối lại commit mồ côi vào một nhánh mới và kiểm tra lại bằng `git log`.\n\n---\n\n## 💡 Hint & mẹo\n> Mọi commit vừa bị mất do reset hard hay xóa nhầm nhánh đều có thể tìm lại được tức thì thông qua `git fsck` hoặc `git reflog` trước khi tiến trình `git gc` được kích hoạt.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git fsck` phát hiện chính xác mã băm của commit vừa bị reset.\n- Nhánh `rescue` được tạo ra khôi phục hoàn chỉnh 100% mã nguồn và lịch sử của commit tưởng như đã mất.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra khả năng tư duy đồ thị DAG của bạn qua bài trắc nghiệm trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTại sao việc thiết kế con trỏ trỏ ngược về quá khứ (Commit trỏ về Parent) lại an toàn hơn rất nhiều so với việc con trỏ trỏ xuôi về tương lai trong hệ thống phân tán?\n\n---\n\n## 📝 Tổng kết\n- Lịch sử Git là một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n- Các con trỏ parent luôn trỏ ngược chiều từ commit mới về commit tổ tiên.\n- Đối tượng không có con trỏ tham chiếu nào chạm tới được gọi là Unreachable/Dangling Object và có thể cứu hộ bằng `git fsck`.\n- Khái niệm Reachability giải thích cơ chế an toàn dữ liệu và quy trình thu gom rác tự động của Git.\n",
  "quiz": {
    "id": "quiz-08-git-internals-16-object-graph-traversal",
    "title": "Trắc nghiệm: Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)",
    "questions": [
      {
        "id": "q1",
        "question": "Tính chất Không chu trình (Acyclic) trong đồ thị DAG của Git đảm bảo điều gì?",
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
        "question": "Thuật ngữ Dangling Commit (Commit mồ côi) trong Git ám chỉ điều gì?",
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
        "explanation": "git fsck (File System Consistency Check) là lệnh chuyên dụng để xác thực đồ thị đối tượng và tìm các đối tượng mồ côi."
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
      },
      {
        "id": "q5",
        "question": "Lệnh git rev-list được sử dụng cho mục đích gì khi duyệt đồ thị commit?",
        "type": "single",
        "options": [
          {
            "text": "Duyệt đồ thị commit theo thứ tự thời gian hoặc topo và in ra danh sách các mã băm commit theo điều kiện lọc",
            "correct": true
          },
          {
            "text": "Tự động đảo ngược toàn bộ lịch sử commit",
            "correct": false
          },
          {
            "text": "Xóa sạch các commit cũ trong kho lưu trữ",
            "correct": false
          },
          {
            "text": "Đếm số dòng mã nguồn trong mỗi commit",
            "correct": false
          }
        ],
        "explanation": "Lệnh git rev-list là động cơ duyệt đồ thị nền tảng bên dưới lệnh git log, cho phép lọc commit theo khoảng cách, nhánh và thời gian."
      }
    ]
  }
};
export default lesson;
