export const LEVEL8_PART3 = [
  {
    id: '16-object-graph-traversal',
    title: 'Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)',
    duration: 35,
    xp: 100,
    prerequisites: ['15-revision-syntax'],
    keywords: ['dag', 'graph traversal', 'reachability', 'dangling objects', 'git rev-list'],
    objectives: [
      'Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).',
      'Hiểu rõ khái niệm Reachability (Khả năng tiếp cận): đối tượng nào có thể chạm tới từ các References và đối tượng nào bị mồ côi (Dangling/Unreachable).',
      'Sử dụng lệnh plumbing git rev-list và git fsck để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối.',
    ],
    commands: ['git rev-list --all --count', 'git fsck --unreachable', 'git log --graph --oneline --all'],
    definition:
      'Trong khoa học máy tính, lịch sử và cơ sở dữ liệu đối tượng của Git được mô hình hóa chính xác dưới dạng một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG). Trong đồ thị này, các Đỉnh (Vertices/Nodes) là các đối tượng Commit, Tree, Blob, và các Cạnh có hướng (Directed Edges) là các con trỏ phụ thuộc trỏ ngược chiều thời gian (Commit trỏ về Commit cha, Commit trỏ về Root Tree, Tree trỏ về Blob). Tính chất "Không chu trình" (Acyclic) bảo đảm rằng không bao giờ có một commit nào có thể là tổ tiên của chính mình.',
    why:
      'Hiểu rõ cấu trúc Đồ thị có hướng không chu trình (DAG) là chìa khóa then chốt để giải mã khái niệm "Khả năng tiếp cận" (Reachability) trong Git. Một đối tượng chỉ thực sự tồn tại có ý nghĩa nếu có ít nhất một con trỏ tham chiếu (nhánh làm việc, thẻ tag, hoặc HEAD) có thể duyệt tới nó theo các cạnh của đồ thị. Khi bạn xóa một nhánh hay reset commit, Git không hề xóa tệp tin ngay lập tức; đối tượng đó chỉ tạm thời trở thành Đối tượng mồ côi (Dangling Object) nằm lơ lửng trong đồ thị cho đến khi tiến trình dọn rác thu hồi.',
    mentalModel:
      'Hãy tưởng tượng một cây cổ thụ sum suê xanh tốt trong một khu rừng kỳ bí. Các cành lớn và cành nhỏ đâm chồi từ thân cây vững chắc chính là các References và Commits (chúng được kết nối kiên cố). Nếu một người cầm cưa cắt đứt một cành cây nhỏ (hành động xóa nhánh), chiếc cành cây bị rơi xuống thảm cỏ bên dưới gốc cây. Chiếc cành đó vẫn còn nguyên lá tươi xanh (Dangling Object) trong vài tuần tiếp theo, bất kỳ ai đi ngang qua nhặt lên vẫn có thể cắm nó trở lại thân cây trước khi người gác rừng tiến hành dọn dẹp quét lá rụng đi đốt.',
    diagram:
      'Mô hình Đồ thị DAG và Đối tượng mồ côi (Dangling):\n[Branch: main] ──► (Commit C3) ──► (Commit C2) ──► (Commit C1)  <── CÁC NODE REACHABLE\n                         │\n                         ▼\n                    [Tree: T3] ──► [Blob: B1]\n\n(Commit D2) ──► (Commit D1)  <── BỊ CẮT ĐỨT (DANGLING / UNREACHABLE OBJECTS)\n     ▲\n     │ (Không có nhánh hay thẻ nào trỏ tới, nhưng tệp vẫn nằm trong .git/objects!)',
    example:
      'Một kỹ sư phần mềm thực hiện lệnh `git reset --hard HEAD~3` và hoảng hốt nhận ra mình vừa làm mất một tính năng chưa kịp đẩy lên remote. Kỹ sư bình tĩnh mở terminal và chạy lệnh plumbing kiểm tra tính toàn vẹn của đồ thị: `git fsck --lost-found`. Git lập tức quét toàn bộ đồ thị DAG và thông báo: `dangling commit 8a7b6c5d4e3f`. Kỹ sư sử dụng lệnh `git cat-file -p 8a7b6c` để kiểm tra nội dung và xác nhận đúng là commit tính năng bị mất. Bằng cách gõ `git merge 8a7b6c`, toàn bộ nhánh mồ côi được nối lại vào thân cây chính của đồ thị DAG một cách ngoạn mục.',
    commandSnippet: 'git rev-list --all --count\ngit fsck --unreachable\ngit log --graph --oneline --all',
    commandExplanation:
      'Lệnh git rev-list đếm chính xác tổng số commit có thể tiếp cận trong toàn bộ đồ thị, git fsck --unreachable rà soát và phát hiện tất cả các đối tượng bị đứt kết nối mồ côi, và git log --graph trực quan hóa sinh động các cạnh liên kết của đồ thị DAG.',
    mistakes: [
      'Nghĩ rằng các mũi tên trong đồ thị commit trỏ từ quá khứ đến tương lai: Trong Git, các con trỏ parent luôn trỏ NGƯỢC từ tương lai về quá khứ.',
      'Sợ rằng các lệnh phân nhánh sẽ tạo ra đồ thị vô hạn: Thuật toán đồ thị của Git được tối ưu hóa cực đỉnh bằng kỹ thuật băm SHA-1.',
      'Không biết cách sử dụng `git fsck` để tìm lại những commit bị mất sau khi thực hiện reset hard hoặc rebase lỗi.',
    ],
    labSteps: [
      'Xem đồ thị toàn diện của repository bằng lệnh `git log --graph --oneline --all`.',
      'Tạo một commit thử nghiệm, sau đó chạy `git reset --hard HEAD~1` để biến commit đó thành mồ côi.',
      'Chạy lệnh `git fsck --unreachable` để truy vết ra mã băm của commit vừa bị cắt đứt.',
    ],
    hint: 'Mọi commit vừa bị mất do reset hard đều có thể tìm lại được thông qua `git fsck` hoặc `git reflog`.',
    validation: 'Định vị và khôi phục thành công một commit mồ côi (dangling commit) trở lại nhánh làm việc.',
    quizIntro: 'Hãy kiểm tra khả năng tư duy đồ thị DAG của bạn qua bài trắc nghiệm sau.',
    challenge:
      'Tại sao việc thiết kế con trỏ trỏ ngược về quá khứ (Commit trỏ về Parent) lại an toàn hơn rất nhiều so với việc con trỏ trỏ xuôi về tương lai trong hệ thống phân tán?',
    summary: [
      'Lịch sử Git là một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).',
      'Các con trỏ parent luôn trỏ ngược chiều từ commit mới về commit tổ tiên.',
      'Đối tượng không có con trỏ tham chiếu nào chạm tới được gọi là Unreachable/Dangling Object và có thể cứu hộ bằng `git fsck`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Tính chất "Không chu trình" (Acyclic) trong đồ thị DAG của Git đảm bảo điều gì?',
        options: [
          { text: 'Không bao giờ xảy ra trường hợp một commit lại trở thành tổ tiên của chính mình (không có vòng lặp vô hạn)', correct: true },
          { text: 'Các commit không bao giờ được phép phân nhánh', correct: false },
          { text: 'Chỉ có đúng một người được phép commit', correct: false },
          { text: 'Dung lượng repository không bao giờ vượt quá 1 GB', correct: false },
        ],
        explanation: 'Vì các cạnh đồ thị trỏ ngược về quá khứ theo mã băm mật mã, không thể tạo ra một chu trình khép kín quay lại chính mình.',
      },
      {
        id: 'q2',
        question: 'Thuật ngữ "Dangling Commit" (Commit mồ côi) trong Git ám chỉ điều gì?',
        options: [
          { text: 'Một commit vẫn tồn tại trong cơ sở dữ liệu đối tượng nhưng không có bất kỳ nhánh hay thẻ nào trỏ tới để tiếp cận', correct: true },
          { text: 'Một commit bị nhiễm virus máy tính', correct: false },
          { text: 'Một commit được tạo bởi người dùng ẩn danh', correct: false },
          { text: 'Một commit không chứa bất kỳ dòng mã nào', correct: false },
        ],
        explanation: 'Dangling commit là node bị đứt kết nối khỏi hệ thống tham chiếu của đồ thị, thường do reset hard hoặc xóa nhánh.',
      },
      {
        id: 'q3',
        question: 'Lệnh Plumbing nào dùng để kiểm tra tính toàn vẹn của đồ thị đối tượng và liệt kê các đối tượng không thể tiếp cận?',
        options: [
          { text: 'git fsck', correct: true },
          { text: 'git graph-check', correct: false },
          { text: 'git repair-dag', correct: false },
          { text: 'git scan-lost', correct: false },
        ],
        explanation: '`git fsck` (File System Consistency Check) là lệnh chuyên dụng để xác thực đồ thị đối tượng và tìm các đối tượng mồ côi.',
      },
      {
        id: 'q4',
        question: 'Trong đồ thị Git, hướng của các cạnh liên kết giữa các commit diễn ra như thế nào?',
        options: [
          { text: 'Trỏ ngược từ commit con về commit cha (ngược chiều thời gian)', correct: true },
          { text: 'Trỏ xuôi từ commit cha tới commit con', correct: false },
          { text: 'Trỏ hai chiều qua lại', correct: false },
          { text: 'Không có hướng xác định', correct: false },
        ],
        explanation: 'Khi tạo commit mới, nó ghi mã băm của commit cha đã có sẵn; do đó mũi tên liên kết luôn trỏ ngược về quá khứ.',
      },
    ],
  },
  {
    id: '17-packfiles-and-deltas',
    title: 'Đóng gói Packfiles và nén sai biệt Delta Compression',
    duration: 35,
    xp: 95,
    prerequisites: ['16-object-graph-traversal'],
    keywords: ['packfiles', 'delta compression', 'loose objects', 'git pack', 'storage optimization'],
    objectives: [
      'Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).',
      'Làm chủ cơ chế nén sai biệt Delta Compression: lưu một phiên bản gốc (base) và các bản vi phân chênh lệch nhỏ.',
      'Sử dụng các lệnh kiểm tra và tạo gói: git verify-pack và git pack-objects.',
    ],
    commands: ['git verify-pack -v .git/objects/pack/*.pack', 'git count-objects -v'],
    definition:
      'Ban đầu, Git lưu trữ mỗi đối tượng dưới dạng một tệp nén zlib riêng rẽ trong thư mục .git/objects/ (gọi là Loose Objects). Tuy nhiên, nếu bạn chỉnh sửa một tệp 10 MB cả trăm lần, việc lưu 100 tệp 10 MB sẽ chiếm 1 GB ổ đĩa. Để giải quyết vấn đề này, Git áp dụng cơ chế đóng gói Packfiles (.pack) đi kèm tệp chỉ mục (.idx). Trong Packfile, Git sử dụng thuật toán Nén sai biệt (Delta Compression): nó chọn phiên bản mới nhất làm gốc (Base Object), sau đó chỉ lưu phần chênh lệch (Delta) của các phiên bản cũ hơn.',
    why:
      'Cơ chế đóng gói Packfile chính là lý do cốt lõi tại sao Git có thể truyền tải toàn bộ lịch sử 15 năm của Linux Kernel với hàng triệu commit qua mạng Internet một cách thần tốc. Thay vì truyền hàng triệu tệp tin nhỏ lẻ qua giao thức mạng gây nghẽn I/O, Git đóng gói tất cả vào một tệp Packfile duy nhất nén cực chặt, giúp giảm dung lượng kho lưu trữ từ vài gigabyte xuống chỉ còn vài chục megabyte mà không làm mất đi bất kỳ bit dữ liệu nào.',
    mentalModel:
      'Hãy tưởng tượng bạn đang lưu trữ 100 bản dự thảo của một bộ hợp đồng pháp lý dài 50 trang. Thay vì in ra 100 tập tài liệu dày cộp riêng lẻ (Loose Objects), bạn in tập hợp đồng hoàn chỉnh mới nhất (Base Object). Đối với 99 bản nháp cũ trước đó, bạn chỉ kẹp một mẩu giấy nhỏ ghi chú rõ ràng: "Bản nháp 2 chỉ khác bản mới nhất ở dòng số 15 thay chữ A bằng chữ B" (Delta). Toàn bộ 100 phiên bản hợp đồng được đóng gói gọn gàng vào duy nhất một chiếc vali xách tay an toàn (Packfile).',
    diagram:
      'Chuyển đổi từ Loose Objects sang Packfile với Delta Compression:\nTrước khi đóng gói (Loose Objects):\n[Blob v1: 10 MB]   [Blob v2: 10 MB]   [Blob v3: 10 MB] ──► Tổng: 30 MB đĩa\n\nSau khi đóng gói (Packfile + Delta Compression):\n┌────────────────────────────────────────────────────────┐\n│ PACKFILE (.git/objects/pack/pack-xxx.pack)              │\n│ • Blob v3 (Base): [10 MB dữ liệu hoàn chỉnh mới nhất]   │\n│ • Blob v2 (Delta): [15 KB vi phân so với v3]            │\n│ • Blob v1 (Delta): [12 KB vi phân so với v2]            │\n└────────────────────────────────────────────────────────┘\n──► Tổng dung lượng giảm từ 30 MB xuống còn ~10.03 MB! (Giảm gần 70%)',
    example:
      'Một kỹ sư kiểm tra một dự án lớn vừa clone từ GitHub về và thấy thư mục `.git/objects/` gần như trống rỗng không có các thư mục con 2 ký tự. Nhìn vào thư mục con `.git/objects/pack/`, kỹ sư thấy một cặp tệp tin: `pack-1a2b3c4d.pack` (nặng 45 MB) và `pack-1a2b3c4d.idx` (nặng 1 MB). Kỹ sư chạy lệnh `git verify-pack -v .git/objects/pack/pack-1a2b3c4d.pack`. Màn hình hiển thị danh sách chi tiết hàng chục nghìn đối tượng được nén chặt, trong đó có những dòng ghi rõ chuỗi phụ thuộc delta: đối tượng A là base, đối tượng B là delta của A với kích thước chỉ 120 bytes. Nhờ Packfile, quá trình clone qua đường truyền mạng diễn ra chỉ trong vài giây.',
    commandSnippet: 'git verify-pack -v .git/objects/pack/*.pack\ngit count-objects -v',
    commandExplanation:
      'Lệnh git count-objects -v báo cáo chi tiết số lượng loose objects và in-pack objects trong kho lưu trữ, trong khi git verify-pack -v phân tích tường tận cấu trúc bên trong tệp packfile nhị phân, hiển thị danh sách các chuỗi delta và tỷ lệ nén tối ưu.',
    mistakes: [
      'Nghĩ rằng Git lưu Delta xuôi từ quá khứ đến hiện tại: Trong Packfile, Git lưu phiên bản MỚI NHẤT làm Base đầy đủ và lưu các phiên bản CŨ dưới dạng Delta để tối ưu hóa tốc độ kiểm xuất phiên bản hiện hành.',
      'Tự ý xóa tệp `.idx` trong thư mục pack: Tệp index chỉ mục cho phép Git truy xuất ngẫu nhiên bất kỳ đối tượng nào trong tệp pack nhị phân mà không cần đọc tuần tự từ đầu.',
      'Lo sợ rằng việc đóng gói packfile sẽ làm thay đổi mã băm SHA-1 của đối tượng: Mã băm SHA-1 của đối tượng là vĩnh cửu và không bao giờ đổi dù nó nằm ở dạng loose hay pack.',
    ],
    labSteps: [
      'Chạy lệnh `git count-objects -v` để xem tỷ lệ giữa Loose Objects và Packed Objects.',
      'Sử dụng lệnh `git verify-pack -v .git/objects/pack/*.pack` (nếu có packfile) để quan sát các dòng phân tích delta.',
      'Tìm hiểu cách Git tự động kích hoạt tiến trình đóng gói khi số lượng loose objects vượt ngưỡng.',
    ],
    hint: 'Bạn có thể chủ động chuyển toàn bộ loose objects vào packfile bất cứ lúc nào bằng lệnh `git gc` hoặc `git repack -d`.',
    validation: 'Nhận diện được đối tượng Base và các đối tượng Delta từ đầu ra của lệnh verify-pack.',
    quizIntro: 'Hãy kiểm tra kiến thức về cơ chế Packfile và nén sai biệt Delta qua bài trắc nghiệm sau.',
    challenge:
      'Tại sao Git lại chọn phiên bản mới nhất của tệp tin làm Base Object nguyên bản thay vì chọn phiên bản đầu tiên của tệp tin khi thực hiện Delta Compression?',
    summary: [
      'Loose Objects lưu tệp nén rời rạc; Packfiles gộp nhiều đối tượng vào một tệp nén tối ưu duy nhất.',
      'Delta Compression lưu phiên bản mới nhất làm Base và các phiên bản cũ hơn làm bản vi phân chênh lệch nhỏ.',
      'Tệp `.idx` đóng vai trò là bảng mục lục tra cứu nhanh vị trí byte của từng đối tượng trong tệp `.pack`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Trong cơ chế Delta Compression của Packfile, Git chọn phiên bản nào của tệp tin để lưu trữ đầy đủ làm Base Object?',
        options: [
          { text: 'Phiên bản mới nhất của tệp tin', correct: true },
          { text: 'Phiên bản đầu tiên cách đây 10 năm', correct: false },
          { text: 'Một phiên bản ngẫu nhiên ở giữa', correct: false },
          { text: 'Không phiên bản nào cả, tất cả đều là delta', correct: false },
        ],
        explanation: 'Git ưu tiên tốc độ truy xuất cho phiên bản mới nhất (thường xuyên được checkout nhất), do đó lưu bản mới nhất làm Base đầy đủ.',
      },
      {
        id: 'q2',
        question: 'Vai trò của tệp `.idx` (Index File) đi kèm với tệp `.pack` trong thư mục objects/pack/ là gì?',
        options: [
          { text: 'Làm bảng chỉ mục cho phép tìm kiếm nhanh vị trí byte chính xác của một đối tượng trong tệp pack khổng lồ', correct: true },
          { text: 'Chứa danh sách tên người dùng của kho lưu trữ', correct: false },
          { text: 'Chứa bản dịch tiếng Việt của Git', correct: false },
          { text: 'Dùng để sao lưu dự phòng khi mất điện', correct: false },
        ],
        explanation: 'Tệp `.idx` chứa bảng băm nhị phân giúp Git nhảy thẳng tới offset byte của đối tượng trong tệp `.pack` với độ phức tạp O(log N).',
      },
      {
        id: 'q3',
        question: 'Lệnh nào sau đây dùng để kiểm tra chi tiết cấu trúc và các chuỗi delta bên trong một tệp Packfile?',
        options: [
          { text: 'git verify-pack -v', correct: true },
          { text: 'git check-pack', correct: false },
          { text: 'git unzip-pack', correct: false },
          { text: 'git inspect-bundle', correct: false },
        ],
        explanation: '`git verify-pack` là lệnh plumbing chuyên dụng để kiểm tra tính toàn vẹn và in cấu trúc chi tiết của tệp Packfile.',
      },
      {
        id: 'q4',
        question: 'Khi các đối tượng được đóng gói từ dạng rời rạc (Loose) vào tệp Packfile, mã băm SHA-1 của chúng có bị thay đổi không?',
        options: [
          { text: 'Hoàn toàn không thay đổi', correct: true },
          { text: 'Có, toàn bộ mã băm bị tính toán lại', correct: false },
          { text: 'Mã băm bị rút ngắn xuống còn 10 ký tự', correct: false },
          { text: 'Tùy thuộc vào hệ điều hành', correct: false },
        ],
        explanation: 'Mã băm SHA-1 là định danh nội dung bất biến; vị trí lưu trữ trên đĩa (loose hay packed) không bao giờ làm thay đổi mã băm.',
      },
    ],
  },
  {
    id: '18-refspec-and-remotes',
    title: 'Cấu trúc Refspec và đồng bộ Remote References',
    duration: 30,
    xp: 90,
    prerequisites: ['17-packfiles-and-deltas'],
    keywords: ['refspec', 'remote references', 'fetch refspec', 'push refspec', 'git config'],
    objectives: [
      'Giải mã cú pháp Refspec bí ẩn trong tệp cấu hình .git/config: `+refs/heads/*:refs/remotes/origin/*`.',
      'Hiểu rõ cơ chế ánh xạ không gian tên (Namespace Mapping) giữa nhánh máy chủ và nhánh theo dõi cục bộ.',
      'Làm chủ quy tắc đồng bộ khi thực hiện git fetch và git push thông qua đặc tả Refspec tùy biến.',
    ],
    commands: ['git config --get remote.origin.fetch', 'git fetch origin', 'git push origin main:refs/heads/custom'],
    definition:
      'Refspec (viết tắt của Reference Specification - Đặc tả tham chiếu) là một chuỗi quy tắc định dạng quy chuẩn quy định cách thức Git ánh xạ và đồng bộ các tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa. Cú pháp chuẩn của một Refspec gồm bốn thành phần: [+]<nguồn>:<đích>, trong đó dấu cộng + tùy chọn biểu thị quyền ép buộc cập nhật không cần kiểm tra tính chất fast-forward, <nguồn> là mẫu tham chiếu trên kho gửi, và <đích> là vị trí tham chiếu đích trên kho nhận.',
    why:
      'Nhiều lập trình viên nghĩ rằng lệnh git fetch origin hay git push origin main hoạt động theo một quy ước ma thuật ngầm định nào đó. Thực chất, toàn bộ hành vi đó được điều khiển chính xác 100% bởi các dòng cấu hình Refspec được lưu trữ bên trong tệp .git/config. Thấu hiểu bản chất của Refspec cho phép bạn thực hiện những thao tác nâng cao ngoạn mục: tải về duy nhất một nhánh cụ thể mà không tải toàn bộ repo, hoặc đẩy một commit lên máy chủ dưới một tên nhánh hoàn toàn khác.',
    mentalModel:
      'Hãy tưởng tượng hệ thống chuyển phát bưu phẩm quốc tế xuyên quốc gia. Bạn chuẩn bị gửi một kiện hàng tài liệu quan trọng từ Hà Nội sang Tokyo. Refspec đóng vai trò chính là tờ nhãn dán quy chuẩn hướng dẫn hải quan dán trên kiện hàng: "Từ ngăn thư: refs/heads/* tại chi nhánh Hà Nội -> Chuyển vào ngăn lưu trữ theo dõi: refs/remotes/origin/* tại bưu cục Tokyo". Nhờ quy tắc địa chỉ tường minh này, nhân viên bưu tá biết chính xác phải lấy thư từ ngăn nào của người gửi và cất vào đúng ngăn tương ứng của người nhận mà không bao giờ bị nhầm lẫn hay thất lạc dữ liệu.',
    diagram:
      'Giải phẫu cấu trúc Refspec trong .git/config:\n+refs/heads/* : refs/remotes/origin/*\n│ └─────────┘   └───────────────────┘\n│      │                  │\n│   <Nguồn>            <Đích>\n│ (Nhánh trên máy chủ) (Nhánh theo dõi trên máy bạn)\n│\n└─ Dấu "+": Cho phép cập nhật non-fast-forward khi fetch\n\nKhi bạn chạy `git fetch origin`:\nServer: refs/heads/feature ──► Ánh xạ thành ──► Cục bộ: refs/remotes/origin/feature',
    example:
      'Một kỹ sư làm việc với một kho lưu trữ khổng lồ của công ty có hơn 10.000 nhánh từ xa. Mỗi khi gõ `git fetch`, máy tính của kỹ sư phải mất 5 phút để đồng bộ toàn bộ danh sách nhánh rác. Mở tệp `.git/config`, kỹ sư thấy dòng cấu hình mặc định: `fetch = +refs/heads/*:refs/remotes/origin/*`. Kỹ sư sửa lại dòng đó thành: `fetch = +refs/heads/main:refs/remotes/origin/main` và thêm một dòng `fetch = +refs/heads/dev/*:refs/remotes/origin/dev/*`. Kể từ đó, mỗi lần gõ `git fetch`, Git chỉ đồng bộ duy nhất nhánh main và các nhánh phát triển dev, thời gian đồng bộ giảm từ 5 phút xuống còn đúng 2 giây.',
    commandSnippet: 'git config --get remote.origin.fetch\ngit fetch origin\ngit push origin main:refs/heads/custom',
    commandExplanation:
      'Lệnh git config kiểm tra quy tắc refspec mặc định đang áp dụng cho remote origin, trong khi lệnh git push minh họa sinh động việc sử dụng cú pháp refspec tường minh để đẩy nhánh main cục bộ lên một nhánh custom hoàn toàn mới trên máy chủ từ xa.',
    mistakes: [
      'Quên dấu hai chấm `:` khi viết refspec khiến Git hiểu nhầm tham chiếu nguồn và đích.',
      'Sử dụng refspec trống ở vế nguồn (ví dụ: `git push origin :dead-branch`) mà không biết rằng đây là cú pháp để XÓA một nhánh trên remote.',
      'Tự ý sửa đổi quy tắc refspec trong `.git/config` mà viết sai cú pháp khiến lệnh fetch bị tê liệt hoàn toàn.',
    ],
    labSteps: [
      'Xem nội dung quy tắc refspec của remote origin bằng lệnh `git config --get remote.origin.fetch`.',
      'Thực hiện lệnh đẩy nhánh với cú pháp refspec tường minh: `git push origin HEAD:refs/heads/test-refspec`.',
      'Kiểm tra danh sách nhánh trên remote để xác nhận nhánh mới đã xuất hiện đúng như ánh xạ.',
    ],
    hint: 'Cú pháp xóa nhánh từ xa kinh điển bằng lệnh `git push origin :branch-name` thực chất là gửi một tham chiếu rỗng (empty source) vào tham chiếu đích trên máy chủ.',
    validation: 'Giải thích được cấu trúc 4 thành phần của một chuỗi Refspec tiêu chuẩn trong tệp cấu hình.',
    quizIntro: 'Hãy kiểm tra mức độ am hiểu về cơ chế Refspec qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để sử dụng Refspec nhằm tải về các Pull Request từ GitHub về máy cục bộ để kiểm tra (ví dụ: refs/pull/123/head)?',
    summary: [
      'Refspec quy định quy tắc ánh xạ tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa.',
      'Cú pháp chuẩn: `[+]<source-ref>:<destination-ref>`.',
      'Được lưu trữ trong `.git/config` dưới mục `[remote "origin"]` và điều khiển hành vi của `fetch` và `push`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Dấu cộng `+` ở đầu chuỗi Refspec (ví dụ: `+refs/heads/*:refs/remotes/origin/*`) có ý nghĩa gì?',
        options: [
          { text: 'Cho phép cập nhật tham chiếu đích kể cả khi thao tác không phải là fast-forward (force update)', correct: true },
          { text: 'Chỉ định kho lưu trữ có tính phí', correct: false },
          { text: 'Yêu cầu mã hóa tệp tin bằng mật khẩu', correct: false },
          { text: 'Cộng thêm 1 commit vào lịch sử', correct: false },
        ],
        explanation: 'Dấu `+` tùy chọn ở đầu refspec thông báo cho Git bỏ qua kiểm tra an toàn fast-forward khi cập nhật con trỏ tham chiếu.',
      },
      {
        id: 'q2',
        question: 'Cú pháp lệnh `git push origin :old-branch` (để trống phần nguồn trước dấu hai chấm) có tác dụng gì?',
        options: [
          { text: 'Xóa nhánh `old-branch` trên máy chủ từ xa', correct: true },
          { text: 'Đổi tên nhánh thành rỗng', correct: false },
          { text: 'Tạo một nhánh mới không có commit', correct: false },
          { text: 'Báo lỗi cú pháp', correct: false },
        ],
        explanation: 'Đẩy một tham chiếu rỗng vào nhánh đích tương đương với hành động xóa bỏ hoàn toàn tham chiếu đó trên máy chủ từ xa.',
      },
      {
        id: 'q3',
        question: 'Quy tắc Refspec mặc định khi bạn clone một repository từ GitHub về máy là gì?',
        options: [
          { text: '+refs/heads/*:refs/remotes/origin/*', correct: true },
          { text: 'refs/all:refs/all', correct: false },
          { text: 'master:main', correct: false },
          { text: 'remote:local', correct: false },
        ],
        explanation: 'Quy tắc mặc định ánh xạ toàn bộ các nhánh `refs/heads/*` trên server thành các nhánh tracking `refs/remotes/origin/*` trên máy cục bộ.',
      },
      {
        id: 'q4',
        question: 'Tại sao các nhánh từ xa (như `origin/main`) lại được đặt trong không gian tên `refs/remotes/` thay vì `refs/heads/`?',
        options: [
          { text: 'Để cách ly không gian tên, ngăn chặn việc các nhánh theo dõi từ xa ghi đè trực tiếp lên các nhánh làm việc cục bộ của bạn', correct: true },
          { text: 'Do hạn chế về dung lượng ổ đĩa', correct: false },
          { text: 'Để người khác không xem được mã nguồn của bạn', correct: false },
          { text: 'Để máy tính tự động dịch sang tiếng Anh', correct: false },
        ],
        explanation: 'Phân tách namespace giúp bạn có thể tự do chỉnh sửa nhánh `main` cục bộ mà không sợ bị xung đột trực tiếp với con trỏ theo dõi `origin/main`.',
      },
      {
        id: 'q5',
        question: 'Khi thực hiện lệnh `git push origin main`, thực chất Git thực thi cú pháp Refspec ngầm định nào?',
        options: [
          { text: 'refs/heads/main:refs/heads/main', correct: true },
          { text: 'refs/heads/main:refs/remotes/origin/main', correct: false },
          { text: 'HEAD:refs/tags/main', correct: false },
          { text: '+refs/remotes/*:refs/heads/*', correct: false },
        ],
        explanation: 'Lệnh push ngầm định đẩy nhánh cục bộ refs/heads/main lên nhánh cùng tên refs/heads/main trên server từ xa.',
      },
      {
        id: 'q6',
        question: 'Làm thế nào để chỉ fetch duy nhất một nhánh `feature-login` mà không muốn kéo về tất cả các nhánh khác từ origin?',
        options: [
          { text: 'git fetch origin feature-login:refs/remotes/origin/feature-login', correct: true },
          { text: 'git fetch origin --all --single', correct: false },
          { text: 'git clone origin/feature-login', correct: false },
          { text: 'git pull --only-one', correct: false },
        ],
        explanation: 'Bằng cách chỉ định rõ ràng cặp refspec nguồn và đích cho nhánh cụ thể, Git sẽ chỉ đồng bộ duy nhất nhánh đó.',
      },
    ],
  },
  {
    id: '19-reflog-internals',
    title: 'Cơ chế lưu trữ và phục hồi của .git/logs (Reflog Internals)',
    duration: 35,
    xp: 100,
    prerequisites: ['18-refspec-and-remotes'],
    keywords: ['reflog internals', 'git logs directory', 'history of heads', 'recovery safety net', 'commit salvage'],
    objectives: [
      'Giải mã cấu trúc bên trong thư mục nhật ký .git/logs/ (gồm logs/HEAD và logs/refs/heads/).',
      'Hiểu rõ định dạng văn bản của từng dòng bản ghi Reflog: old-hash, new-hash, committer, timestamp, và lý do thay đổi.',
      'Sử dụng kiến thức Reflog Internals để giải cứu mã nguồn khi mọi lệnh Porcelain đều từ chối hoạt động.',
    ],
    commands: ['cat .git/logs/HEAD', 'git reflog', 'git log -g'],
    definition:
      'Reflog (viết tắt của Reference Log - Nhật ký tham chiếu) là một hệ thống tệp tin nhật ký tuần tự nằm bên trong thư mục .git/logs/. Khác với git log ghi lại lịch sử tiến hóa của các commit trong dự án, Reflog ghi lại toàn bộ lịch sử di chuyển của các con trỏ tham chiếu (đặc biệt là con trỏ HEAD và các nhánh cục bộ) trên chính máy tính của bạn. Mỗi khi con trỏ HEAD thay đổi tọa độ (do commit, checkout, switch, rebase, merge hay reset), một dòng văn bản mới sẽ được nối thêm vào tệp .git/logs/HEAD.',
    why:
      'Reflog là tấm lưới bảo hiểm an toàn tối thượng của Git. Khi một lập trình viên vô tình gõ `git reset --hard` hay lỡ tay rebase làm mất các commit quan trọng, lịch sử thông thường (`git log`) sẽ không còn hiển thị những commit đó nữa. Nhưng vì con trỏ HEAD từng đi qua commit đó trong quá khứ, tọa độ mã băm SHA-1 của nó vẫn được ghi lại sắc nét bên trong tệp nhật ký `.git/logs/HEAD`. Nhờ Reflog, hầu như không có gì có thể thực sự biến mất khỏi Git trong vòng 30 đến 90 ngày.',
    mentalModel:
      'Hãy tưởng tượng hộp đen ghi lại hành trình bay chuyên dụng của một chiếc máy bay trực thăng hiện đại. Chiếc trực thăng (HEAD) bay qua ngọn đồi A, đáp xuống đỉnh núi B rồi quay về trạm sân bay C. Dù bạn có xóa sạch lộ trình trên tấm bản đồ du lịch thông thường (git log), thì chiếc hộp đen (.git/logs/HEAD) vẫn ghi lại chính xác từng giây từng phút chiếc trực thăng đã ở tọa độ nào, xuất phát từ đâu và vì lý do cụ thể gì.',
    diagram:
      'Giải phẫu cấu trúc tệp nhật ký .git/logs/HEAD:\n[Old SHA-1 (40B)] [New SHA-1 (40B)] [Committer Name <Email> Timestamp TZ] [Action / Message]\n\nVí dụ một dòng thực tế bên trong tệp .git/logs/HEAD:\n0000000000000000000000000000000000000000 7a8b9c4d Nam <nam@dev.com> 1727654400 +0700 commit (initial): init\n7a8b9c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b c5d4e3f2 Nam <nam@dev.com> 1727654500 +0700 commit: add login\nc5d4e3f2a1b09876543210fedcba9876543210fe 7a8b9c4d Nam <nam@dev.com> 1727654600 +0700 reset: moving to HEAD~1',
    example:
      'Một kỹ sư trong lúc xử lý xung đột rebase đã bấm nhầm phím và làm mất toàn bộ nhánh tính năng của hai tuần làm việc. Lệnh git log chỉ hiển thị nhánh main cũ kỹ. Kỹ sư không hề nao núng, mở terminal và sử dụng lệnh đọc trực tiếp: `cat .git/logs/HEAD`. Trước mắt kỹ sư hiện ra danh sách toàn bộ các thao tác gần nhất kèm theo lý do rõ ràng. Dòng thứ 3 từ dưới lên ghi rõ: `7a8b9c4d 3b18e5a1 checkout: moving from feature to main`. Kỹ sư lập tức sao chép mã băm `3b18e5a1` và gõ lệnh: `git switch -c rescued-feature 3b18e5a1`. Nhánh tính năng được phục sinh hoàn hảo từng dòng code trong sự thán phục của toàn bộ đồng nghiệp trong phòng.',
    commandSnippet: 'cat .git/logs/HEAD\ngit reflog\ngit log -g',
    commandExplanation:
      'Lệnh cat .git/logs/HEAD cho phép xem trực tiếp cấu trúc tệp nhật ký thô được lưu trữ bên dưới đĩa cứng, git reflog hiển thị danh sách thân thiện với con người, và git log -g duyệt toàn bộ lịch sử commit dựa trên các mục trong reflog thay vì cây commit thông thường.',
    mistakes: [
      'Nghĩ rằng Reflog được đồng bộ lên remote GitHub: Reflog là dữ liệu hoàn toàn CỤC BỘ trên máy bạn, không bao giờ được gửi qua lệnh push.',
      'Để quá thời hạn hết hạn (expire) của Reflog: Mặc định Git sẽ dọn dẹp các mục reflog không thể tiếp cận sau 30 ngày (unreachable) và 90 ngày (reachable).',
      'Xóa thủ công thư mục `.git/logs/` khiến bạn mất đi chiếc phao cứu sinh duy nhất khi gặp sự cố.',
    ],
    labSteps: [
      'Sử dụng lệnh `cat .git/logs/HEAD` để xem nội dung nhật ký chuyển dịch thô của con trỏ HEAD.',
      'Thực hiện một vài thao tác chuyển nhánh `git switch` và tạo commit mới, sau đó kiểm tra lại tệp log.',
      'Sử dụng cú pháp reflog đặc biệt `HEAD@{1}` để xem trạng thái ngay trước thao tác gần nhất.',
    ],
    hint: 'Mỗi nhánh cục bộ đều có tệp nhật ký riêng trong thư mục `.git/logs/refs/heads/<branch-name>`.',
    validation: 'Đọc và đối chiếu được từng trường dữ liệu trong dòng nhật ký thô của tệp .git/logs/HEAD.',
    quizIntro: 'Hãy kiểm tra kiến thức về cấu trúc và sức mạnh cứu hộ của Reflog qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để cấu hình thời gian sống của các mục Reflog lâu hơn mặc định thông qua thuộc tính gc.reflogExpire trong tệp .git/config?',
    summary: [
      'Reflog là tệp nhật ký cục bộ ghi lại mọi sự di chuyển của con trỏ HEAD và các nhánh.',
      'Lưu trữ trong `.git/logs/HEAD` dưới dạng các dòng văn bản thuần ghi nhận old-hash, new-hash và hành động.',
      'Là công cụ cứu hộ dữ liệu mạnh mẽ nhất của Git, giúp phục hồi mọi commit bị mất trong vòng 30 đến 90 ngày.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Dữ liệu Reflog được lưu trữ vật lý trong thư mục nào của kho lưu trữ?',
        options: [
          { text: '.git/logs/', correct: true },
          { text: '.git/history/', correct: false },
          { text: '.git/records/', correct: false },
          { text: '.git/backups/', correct: false },
        ],
        explanation: 'Toàn bộ các tệp nhật ký tham chiếu được lưu trữ ngăn nắp trong thư mục `.git/logs/`.',
      },
      {
        id: 'q2',
        question: 'Khi bạn chạy lệnh `git push origin main`, dữ liệu Reflog của bạn có được đẩy lên GitHub không?',
        options: [
          { text: 'Hoàn toàn không, Reflog là dữ liệu riêng tư cục bộ 100% trên máy tính của bạn', correct: true },
          { text: 'Có, toàn bộ lịch sử reflog được đồng bộ lên server', correct: false },
          { text: 'Chỉ các mục reflog của ngày hôm nay mới được gửi', correct: false },
          { text: 'Chỉ đẩy lên nếu có cờ --force', correct: false },
        ],
        explanation: 'Reflog chỉ ghi lại hành vi di chuyển con trỏ trên máy cá nhân, không thuộc về lịch sử chung của dự án nên không bao giờ được push.',
      },
      {
        id: 'q3',
        question: 'Mỗi dòng bản ghi trong tệp `.git/logs/HEAD` chứa những trường thông tin chính nào?',
        options: [
          { text: 'Old SHA-1, New SHA-1, Thông tin người thực hiện, Dấu thời gian, và Lý do hành động', correct: true },
          { text: 'Toàn bộ nội dung các tệp tin mã nguồn', correct: false },
          { text: 'Mật khẩu đăng nhập máy tính', correct: false },
          { text: 'Địa chỉ IP của người dùng', correct: false },
        ],
        explanation: 'Cấu trúc tệp nhật ký ghi rõ mã băm trước và sau khi di chuyển, ai làm, vào lúc nào và hành động là gì (commit, checkout, rebase v.v.).',
      },
      {
        id: 'q4',
        question: 'Thời gian lưu trữ mặc định của các mục Reflog không thể tiếp cận (unreachable) trước khi bị dọn rác là bao lâu?',
        options: [
          { text: '30 ngày', correct: true },
          { text: '1 ngày', correct: false },
          { text: '365 ngày', correct: false },
          { text: 'Vĩnh viễn không bao giờ xóa', correct: false },
        ],
        explanation: 'Git cấu hình mặc định thời gian hết hạn cho các mục không thể tiếp cận là 30 ngày (`gc.reflogExpireUnreachable`).',
      },
    ],
  },
  {
    id: '20-build-commit-manually-capstone',
    title: 'Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands',
    duration: 50,
    xp: 250,
    prerequisites: ['19-reflog-internals'],
    keywords: ['git internals capstone', 'build commit manually', 'plumbing only', 'mastery challenge', 'no porcelain'],
    objectives: [
      'Chinh phục thử thách tối thượng của Level 8: Tự tay tạo ra một Commit hợp lệ mà TUYỆT ĐỐI KHÔNG dùng git add hay git commit.',
      'Thực hiện quy trình 5 bước phẫu thuật: Băm Blob -> Cập nhật Index nhị phân -> Đóng gói Tree -> Tạo Commit object -> Cập nhật con trỏ nhánh.',
      'Quan sát Git Graph và git log hiển thị commit do chính bạn lắp ráp thủ công từ các linh kiện cơ bản.',
    ],
    commands: [
      'git hash-object -w <file>',
      'git update-index --add --cacheinfo 100644 <hash> <path>',
      'git write-tree',
      'git commit-tree <tree-hash> -m "Manual commit"',
      'git update-ref refs/heads/main <commit-hash>',
    ],
    definition:
      'Bài học Capstone này là đỉnh cao danh vọng chứng minh bạn đã hoàn toàn làm chủ bản chất nội tại của Git. Trong thử thách này, các lệnh Porcelain bậc cao (git add, git commit) bị cấm sử dụng hoàn toàn. Bạn sẽ đóng vai trò như chính bộ máy hạt nhân của Git: tự tay băm dữ liệu thô thành đối tượng Blob, tự tay ghi bản ghi vào tệp nhị phân Staging Area (.git/index), tự tay xuất cây thư mục Tree, tự tay kết nối thông tin tác giả để đúc nên đối tượng Commit, và cuối cùng cập nhật con trỏ tham chiếu nhánh.',
    why:
      'Mọi lập trình viên trên thế giới đều biết gõ git add rồi git commit theo thói quen hàng ngày. Nhưng chỉ có top 1% các kỹ sư tinh hoa mới có thể giải thích cặn kẽ và tự tay thực hiện toàn bộ quy trình đó bằng các lệnh nguyên tử bên dưới. Khi bạn tự tay tạo thành công một commit bằng các công cụ plumbing, bạn không còn nhìn Git như một người sử dụng công cụ thụ động nữa; bạn hiểu Git như chính Linus Torvalds khi ông viết nên những dòng mã đầu tiên.',
    mentalModel:
      'Hãy tưởng tượng bạn là một nghệ nhân chế tác đồng hồ Thụy Sĩ cổ điển. Người bình thường chỉ mua chiếc đồng hồ đã đóng vỏ hoàn chỉnh về đeo lên tay và xem giờ (Porcelain). Nhưng bạn tự tay gắp từng chiếc bánh răng bánh lắc siêu nhỏ (Blob), tra dầu vào trục quay (Index), lắp ráp thành bộ máy cơ khí tinh vi (Tree), đóng vào khung vỏ thép không gỉ khắc số seri (Commit), và gắn kim đồng hồ chỉ đúng giờ hiện tại (Branch Ref).',
    diagram:
      'Quy trình 5 bước tạo Commit hoàn chỉnh bằng Plumbing Commands:\n┌────────────────────────────────────────────────────────────────────────┐\n│ Bước 1: Tạo Blob từ tệp tin                                           │\n│ echo "Hello" > app.txt                                                 │\n│ BLOB_ID=$(git hash-object -w app.txt)                                  │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 2: Đưa vào Staging Area (Cập nhật tệp .git/index)                 │\n│ git update-index --add --cacheinfo 100644 $BLOB_ID app.txt            │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 3: Đóng gói cây thư mục thành đối tượng Tree                     │\n│ TREE_ID=$(git write-tree)                                              │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 4: Đúc đối tượng Commit từ Tree                                  │\n│ COMMIT_ID=$(echo "feat: manual plumbing" | git commit-tree $TREE_ID)   │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 5: Cập nhật con trỏ nhánh                                         │\n│ git update-ref refs/heads/main $COMMIT_ID                              │\n└────────────────────────────────────────────────────────────────────────┘\n──► KẾT QUẢ: `git log` và Git Graph hiển thị commit mới mượt mà 100%!',
    example:
      'Một kỹ sư trong kỳ thi tuyển chọn Kiến trúc sư trưởng tại một công ty công nghệ đa quốc gia nhận được đề bài: "Tạo một commit hợp lệ trong Git mà không được sử dụng lệnh git add và git commit". Không một giây chần chừ, kỹ sư tạo tệp `README.md`, băm tệp lấy mã Blob bằng `git hash-object -w README.md`. Tiếp đó, kỹ sư gọi `git update-index --add --cacheinfo 100644 <blob-hash> README.md` để lập chỉ mục. Kỹ sư chạy `git write-tree` thu được mã Tree, rồi chuyển tiếp qua `git commit-tree <tree-hash> -m "feat: built with plumbing"`. Cuối cùng, kỹ sư cập nhật con trỏ nhánh bằng `git update-ref refs/heads/main <commit-hash>`. Khi gõ lệnh `git log -1`, toàn bộ hội đồng giám khảo đứng dậy vỗ tay khi thấy commit mới hiển thị hoàn hảo trên đồ thị. Kỹ sư chính thức được tuyển dụng.',
    commandSnippet: 'git hash-object -w <file>\ngit update-index --add --cacheinfo 100644 <hash> <path>\ngit write-tree\ngit commit-tree <tree-hash> -m "Manual commit"\ngit update-ref refs/heads/main <commit-hash>',
    commandExplanation:
      'Năm câu lệnh nguyên tử trên tạo thành một chuỗi lắp ráp hoàn chỉnh: hash-object tạo blob, update-index stage tệp vào index, write-tree tạo tree object, commit-tree tạo commit object, và update-ref di chuyển con trỏ nhánh tới commit mới một cách an toàn.',
    mistakes: [
      'Quên cờ `--add` hoặc `--cacheinfo` trong lệnh `git update-index` khiến tệp không được nạp vào index đúng chuẩn.',
      'Không lưu lại mã băm trả về của từng bước để truyền vào bước tiếp theo (Tree cần Blob, Commit cần Tree, Ref cần Commit).',
      'Quên truyền commit cha `-p HEAD` nếu đây không phải là commit đầu tiên của dự án, làm lịch sử bị đứt gãy thành nhiều root.',
    ],
    labSteps: [
      'Tạo một tệp tin `manual.txt` chứa nội dung "Thực hành Plumbing Capstone".',
      'Chạy lệnh `git hash-object -w manual.txt` để lấy mã băm Blob.',
      'Chạy `git update-index --add --cacheinfo 100644 <blob-hash> manual.txt`.',
      'Chạy `git write-tree` để sinh mã băm Tree.',
      'Chạy `git commit-tree <tree-hash> -m "feat: manual capstone commit"` để tạo commit.',
      'Chạy `git update-ref refs/heads/main <commit-hash>` và chiêm ngưỡng kết quả với `git log`.',
    ],
    hint: 'Hãy ghi nhớ công thức dây chuyền: Blob -> Index -> Tree -> Commit -> Ref -> HEAD.',
    validation: 'Lệnh git log hiển thị commit mới với đầy đủ tác giả, cây thư mục và thông điệp mà không dùng bất kỳ lệnh porcelain nào.',
    quizIntro: 'Hãy hoàn thành bài kiểm tra danh dự tổng kết đỉnh cao của Level 8 Git Internals.',
    challenge:
      'Làm thế nào để tạo một Merge Commit thủ công hoàn toàn bằng lệnh plumbing git commit-tree kết hợp truyền hai cờ `-p parent1 -p parent2`?',
    summary: [
      'Chinh phục trọn vẹn quy trình 5 bước xây dựng Commit thủ công từ các hạt nguyên tử cơ bản của Git.',
      'Thấu hiểu bản chất cơ học thực sự bên dưới các lệnh bề mặt `git add` và `git commit`.',
      'Chính thức tốt nghiệp toàn diện chương trình đào tạo Git Academy từ Zero đến Git Internals Master!',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Lệnh Plumbing nào dùng để đưa một đối tượng Blob vào Staging Area (tệp .git/index) mà không dùng `git add`?',
        options: [
          { text: 'git update-index --add --cacheinfo 100644 <hash> <path>', correct: true },
          { text: 'git stage-blob <hash>', correct: false },
          { text: 'git put-index <hash>', correct: false },
          { text: 'git insert-cache <hash>', correct: false },
        ],
        explanation: '`git update-index --add --cacheinfo` cho phép bạn đăng ký trực tiếp một Blob đã băm vào Staging Area mà không cần đọc lại từ Working Directory.',
      },
      {
        id: 'q2',
        question: 'Sau khi đã đưa các tệp vào Index, lệnh Plumbing nào dùng để đóng gói cấu trúc thư mục thành đối tượng Tree?',
        options: [
          { text: 'git write-tree', correct: true },
          { text: 'git build-tree', correct: false },
          { text: 'git make-tree', correct: false },
          { text: 'git save-tree', correct: false },
        ],
        explanation: '`git write-tree` đọc nội dung hiện tại của tệp `.git/index` và ghi ra đối tượng Tree tương ứng trong Object Store.',
      },
      {
        id: 'q3',
        question: 'Lệnh Plumbing nào nhận vào mã băm của đối tượng Tree và tạo ra đối tượng Commit?',
        options: [
          { text: 'git commit-tree', correct: true },
          { text: 'git create-commit', correct: false },
          { text: 'git make-commit', correct: false },
          { text: 'git hash-commit', correct: false },
        ],
        explanation: '`git commit-tree` là lệnh bậc thấp tạo ra đối tượng Commit từ một Tree và danh sách các commit cha.',
      },
      {
        id: 'q4',
        question: 'Bước cuối cùng để một commit mới hiển thị trên nhánh `main` khi dùng lệnh plumbing là gì?',
        options: [
          { text: 'Cập nhật con trỏ nhánh bằng lệnh `git update-ref refs/heads/main <commit-hash>`', correct: true },
          { text: 'Khởi động lại máy tính', correct: false },
          { text: 'Xóa tệp .git/index', correct: false },
          { text: 'Chạy lệnh git pull', correct: false },
        ],
        explanation: 'Nếu không cập nhật con trỏ nhánh bằng `git update-ref`, commit mới sẽ là commit mồ côi không có nhánh nào trỏ tới.',
      },
      {
        id: 'q5',
        question: 'Đối số `--cacheinfo 100644` trong lệnh `git update-index` đại diện cho điều gì?',
        options: [
          { text: 'Chế độ quyền tệp tin (File Mode) chuẩn cho tệp văn bản thông thường không thực thi', correct: true },
          { text: 'Mã băm SHA-1 rút gọn của tệp', correct: false },
          { text: 'Kích thước tối đa của tệp tính bằng byte', correct: false },
          { text: 'Số dòng tối đa được phép lưu trong index', correct: false },
        ],
        explanation: '100644 là file mode bát phân theo chuẩn POSIX đại diện cho regular non-executable file trong Git index.',
      },
      {
        id: 'q6',
        question: 'Khi tạo commit thứ hai bằng `git commit-tree`, tùy chọn nào là bắt buộc để nối commit mới với commit trước đó trong đồ thị DAG?',
        options: [
          { text: '-p <parent-commit-hash>', correct: true },
          { text: '--link-to <hash>', correct: false },
          { text: '--after <hash>', correct: false },
          { text: '-c <previous-hash>', correct: false },
        ],
        explanation: 'Cờ `-p` (viết tắt của parent) chỉ định commit cha mà commit mới sẽ trỏ về, đảm bảo tính liên tục của chuỗi lịch sử.',
      },
    ],
  },
];
