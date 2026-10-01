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
      "Hiểu reachability từ refs, index và reflog; phân biệt dangling với unreachable object.",
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
      "git fsck --no-reflogs --unreachable",
      "git log --graph --oneline --all"
    ]
  },
  "content": "# Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)\n\n---\n\n## 🎯 Mục tiêu\n- Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n- Hiểu reachability: object nào Git có thể lần tới từ các tham chiếu, index và reflog.\n- Sử dụng lệnh plumbing `git rev-list` và `git fsck` để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối.\n- Hiểu lý do tại sao các con trỏ trong Git luôn trỏ ngược từ tương lai về quá khứ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Directed Acyclic Graph (DAG)\n- **Nói dễ hiểu**: Mô hình cấu trúc dữ liệu đồ thị có hướng và không bao giờ tạo thành một vòng lặp tròn lặp lại chính nó.\n- **Ví dụ**: Mỗi commit mới tạo ra sẽ trỏ về commit cha cũ, bạn có thể đi lùi mãi về commit đầu tiên nhưng không bao giờ quay lại tương lai.\n- **Đừng nhầm**: Không phải cây đơn nhánh; Git hỗ trợ rẽ nhánh song song và hợp nhất nhiều nhánh lại với nhau (Merge).\n\n### Unreachable object\n- **Nói dễ hiểu**: Object tồn tại trong object database nhưng Git không lần tới được từ các điểm bắt đầu đang xét.\n- **Ví dụ**: Commit bị bỏ khỏi đầu nhánh có thể vẫn còn trong reflog; dùng `git fsck --no-reflogs --unreachable` để tìm object không còn được reflog giữ lại.\n- **Đừng nhầm**: `dangling` là một trường hợp cụ thể của unreachable object. Thời gian object được giữ lại phụ thuộc cấu hình và thao tác bảo trì.\n\n### git fsck\n- **Nói dễ hiểu**: Lệnh kiểm tra tính toàn vẹn và kết nối giữa các object trong repository.\n- **Ví dụ**: `git fsck --no-reflogs --unreachable` bỏ qua reflog khi tính reachability để tìm object chỉ còn được reflog giữ.\n- **Đừng nhầm**: `--lost-found` ghi dữ liệu tham khảo vào `.git/lost-found`, nên không phải chế độ chỉ đọc thuần túy. Hãy tạo nhánh cứu hộ sau khi kiểm tra đúng commit.\n\n---\n\n## 📖 Định nghĩa\nLịch sử commit của Git là đồ thị có hướng không chu trình (DAG). Một commit trỏ tới tree của nó và các commit cha; tree trỏ tới các entry con như tree hoặc blob. Khi tạo commit thông thường, các cạnh parent đi từ commit mới về commit đã có. Điều này cho phép Git biểu diễn nhánh rẽ và merge mà không tạo vòng lặp.\n\n---\n\n## 💡 Tại sao cần\nReachability giải thích vì sao một commit không xuất hiện trong `git log --all` vẫn có thể còn trong repository. Git xác định điểm bắt đầu từ refs và index, và mặc định cũng xét reflog khi chạy `git fsck`. Vì vậy một commit vừa bị reset có thể chưa được báo unreachable. Object unreachable vẫn có thể được giữ lại một thời gian, nhưng không nên xem đó là bản sao lưu: garbage collection và cấu hình repository có thể làm object hết hạn.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng một cây cổ thụ sum suê xanh tốt trong một khu rừng kỳ bí. Các cành lớn và cành nhỏ đâm chồi từ thân cây vững chắc chính là các References và Commits (chúng được kết nối kiên cố). Nếu một người cầm cưa cắt đứt một cành cây nhỏ (hành động xóa nhánh), chiếc cành cây bị rơi xuống thảm cỏ bên dưới gốc cây. Chiếc cành đó vẫn còn nguyên lá tươi xanh (Dangling Object) trong vài tuần tiếp theo, bất kỳ ai đi ngang qua nhặt lên vẫn có thể cắm nó trở lại thân cây trước khi người gác rừng tiến hành dọn dẹp quét lá rụng đi đốt.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nMô hình Đồ thị DAG và Đối tượng mồ côi (Dangling):\n[Branch: main] ──► (Commit C3) ──► (Commit C2) ──► (Commit C1)  <── REACHABLE\n                         │\n                         ▼\n                    [Tree: T3] ──► [Blob: B1]\n\n(Commit D2) ──► (Commit D1)  <── UNREACHABLE NẾU KHÔNG CÒN ĐIỂM BẮT ĐẦU NÀO TRỎ TỚI\n     (Có thể còn trong object database; thời gian giữ lại không được bảo đảm)\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTrong repository thử nghiệm, người học di chuyển đầu nhánh khỏi một commit rồi dùng `git fsck --no-reflogs --unreachable` để xem object không còn được reflog giữ lại. Họ kiểm tra một commit bằng `git show <object-id>` và chỉ khi xác nhận đúng mới neo nó bằng `git branch rescue-feature <object-id>`. Trong repository thật, bắt đầu bằng `git reflog` và tạo nhánh cứu hộ trước khi chạy lệnh dọn dẹp; việc khôi phục không được bảo đảm nếu object đã bị xóa.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Đếm số lượng commit có thể tiếp cận trong toàn bộ đồ thị\ngit rev-list --all --count\n\n# Tìm object không thể tiếp cận, kể cả commit còn trong reflog\ngit fsck --no-reflogs --unreachable\n\n# Vẽ trực quan sơ đồ các nhánh của đồ thị DAG\ngit log --graph --oneline --all\n\n# Duyệt danh sách các commit từ mới đến cũ theo thứ tự đồ thị\ngit rev-list HEAD\n```\n\n---\n\n## 🔍 Giải thích command\n- `git rev-list --all --count`: Duyệt qua toàn bộ các con trỏ ref và đếm số lượng node commit tiếp cận được.\n- `git fsck --no-reflogs --unreachable`: Tính reachability mà không dùng reflog làm điểm bắt đầu, rồi liệt kê object tồn tại nhưng không reachable.\n- `git log --graph --oneline --all`: Vẽ sơ đồ ASCII trực quan biểu diễn các cạnh hợp nhất và phân nhánh của đồ thị.\n- `git rev-list HEAD`: In các object ID commit từ commit hiện tại ngược về các tổ tiên của nó.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Nghĩ rằng mũi tên trong Git trỏ từ quá khứ đến tương lai**: Con trỏ `parent` trong đối tượng commit luôn trỏ NGƯỢC từ commit con về commit cha (ngược chiều thời gian).\n2. **Cho rằng reset luôn xóa commit ngay, hoặc luôn giữ commit đủ lâu**: Reset thường di chuyển ref; object có thể còn lại, nhưng thời hạn và khả năng cứu không được bảo đảm.\n3. **Chạy lệnh phá hủy để thử trên repo thật**: Tạo repository tạm riêng trước khi thực hành `reset --hard` hoặc tìm object unreachable.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\nChỉ làm các bước reset trong repository thử nghiệm mới, không làm trong repository dự án của bạn. Lệnh dưới đây dùng Bash/Git Bash:\n\n```bash\nmkdir git-fsck-lab\ncd git-fsck-lab\ngit init\ngit config user.name \"Git Learner\"\ngit config user.email \"learner@example.com\"\nprintf \"first version\\n\" > note.txt\ngit add note.txt\ngit commit -m \"first test commit\"\nprintf \"second version\\n\" >> note.txt\ngit add note.txt\ngit commit -m \"second test commit\"\n\n# Chỉ làm trong repository thử nghiệm vừa tạo\ngit reset --hard HEAD~1\ngit fsck --no-reflogs --unreachable\ngit show <object-id-of-unreachable-commit>\ngit branch rescue <object-id-of-unreachable-commit>\ngit log rescue -1\n```\n\n1. **Bước 1**: Tạo hai commit thử nghiệm bằng các lệnh trên.\n2. **Bước 2**: Sau lệnh reset, lấy ID của dòng `unreachable commit` do `git fsck` in ra.\n3. **Bước 3**: Thay `<object-id-of-unreachable-commit>` bằng ID đó để xem nội dung và tạo nhánh cứu hộ.\n4. **Bước 4**: Xác nhận commit đã được neo bằng `git log rescue -1`.\n\n---\n\n## 💡 Hint & mẹo\n> Nếu lỡ di chuyển nhánh, hãy xem `git reflog` và neo commit đúng bằng một nhánh cứu hộ càng sớm càng tốt. Reflog và object chưa được bảo đảm tồn tại mãi.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Trong repo thử nghiệm, `git fsck --no-reflogs --unreachable` liệt kê commit vừa bỏ khỏi nhánh.\n- `git show` xác nhận nội dung; `git branch rescue <object-id>` làm commit reachable qua nhánh cứu hộ.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra khả năng tư duy đồ thị DAG của bạn qua bài trắc nghiệm trong phần bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nTại sao việc thiết kế con trỏ trỏ ngược về quá khứ (Commit trỏ về Parent) lại an toàn hơn rất nhiều so với việc con trỏ trỏ xuôi về tương lai trong hệ thống phân tán?\n\n---\n\n## 📝 Tổng kết\n- Lịch sử Git là một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).\n- Các con trỏ parent luôn trỏ ngược chiều từ commit mới về commit tổ tiên.\n- Unreachable object còn trong object database nhưng không reachable từ các điểm bắt đầu; dangling là một trường hợp cụ thể.\n- `git fsck` giúp kiểm tra và tìm object, nhưng không thay thế backup và không bảo đảm phục hồi sau khi object đã bị thu hồi.\n",
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
        "explanation": "Commit mới ghi parent đã tồn tại trước đó; các cạnh parent vì thế đi về lịch sử trước và không tạo vòng lặp."
      },
      {
        "id": "q2",
        "question": "Thuật ngữ Dangling Commit (Commit mồ côi) trong Git ám chỉ điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Một commit còn trong object database nhưng không thể lần tới từ các điểm bắt đầu mà Git đang xét",
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
        "explanation": "Unreachable phụ thuộc các điểm bắt đầu được xét; mặc định `git fsck` cũng xét reflog, nên commit vừa reset có thể chưa bị xem là unreachable."
      },
      {
        "id": "q3",
        "question": "Lệnh Plumbing nào dùng để kiểm tra tính toàn vẹn của đồ thị đối tượng và liệt kê các đối tượng không thể tiếp cận?",
        "type": "single",
        "options": [
          {
            "text": "git fsck --unreachable",
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
        "explanation": "`git fsck` kiểm tra tính toàn vẹn và kết nối object; cờ `--unreachable` yêu cầu liệt kê object không tới được từ điểm bắt đầu."
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
