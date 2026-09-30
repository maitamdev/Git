export const LEVEL8_PART1 = [
  {
    id: '01-git-internals-intro',
    title: 'Git Internals là gì? Bí mật dưới nắp ca-pô của Git',
    duration: 25,
    xp: 85,
    prerequisites: ['20-ci-cd-capstone'],
    keywords: ['git internals', 'under the hood', 'directed acyclic graph', 'content addressable', 'architecture'],
    objectives: [
      'Hiểu rõ lý do tại sao một kỹ sư Git cấp cao cần nắm vững cơ chế bên dưới nắp ca-pô (Under the hood) của Git.',
      'Nắm bắt bức tranh tổng quan: Git thực chất là một hệ thống tệp tin định danh theo nội dung đơn giản kèm theo giao diện VCS phía trên.',
      'Làm quen với 4 trụ cột cốt lõi: Object Database, References (Refs), Con trỏ HEAD, và Index (Staging Area).',
    ],
    commands: ['git rev-parse --git-dir', 'ls -la .git', 'find .git/objects -type f'],
    definition:
      'Git Internals (Kiến trúc nội tại của Git) là toàn bộ các cấu trúc dữ liệu nhị phân, thuật toán băm mật mã học và cơ chế lưu trữ đĩa mà Git sử dụng để theo dõi phiên bản mã nguồn của bạn. Khác với quan niệm thông thường coi Git là một công cụ phức tạp huyền bí, nhà sáng lập Linus Torvalds thiết kế Git về bản chất chỉ là một hệ thống tệp tin định danh theo nội dung (Content-Addressable File System) cực kỳ tinh gọn, bên trên được bao bọc bởi một bộ giao diện quản lý phiên bản thân thiện với người dùng.',
    why:
      'Khi bạn chỉ biết các lệnh thông thường ở bề mặt, mỗi khi gặp sự cố phức tạp như xung đột rebase, nhánh bị rẽ nhánh ngoài ý muốn, hay mất commit, bạn sẽ cảm thấy hoang mang và sợ hãi làm mất dữ liệu. Khi bạn đã hiểu rõ Git Internals, toàn bộ Git trở nên trong suốt như pha lê: bạn hiểu commit chỉ là một tệp văn bản nhỏ trỏ tới một cây thư mục, nhánh chỉ là một con trỏ văn bản 41 byte, và mọi dữ liệu từng commit đều không bao giờ mất đi trong cơ sở dữ liệu đối tượng.',
    mentalModel:
      'Hãy hình dung việc lái một chiếc xe đua Công thức 1. Một tài xế bình thường chỉ biết đạp ga, phanh và xoay vô lăng. Nhưng một tay đua vô địch thế giới và đội ngũ kỹ thuật am hiểu từng vòng tua máy, hệ thống phun xăng điện tử và vi sai cầu sau dưới nắp ca-pô. Khi xe gặp sự cố trơn trượt trên đường mưa, người hiểu động cơ sẽ biết chính xác nguyên nhân và cách xử lý an toàn thay vì hoảng loạn đạp phanh.',
    diagram:
      'Kiến trúc 4 trụ cột của Git Internals:\n┌──────────────────────────────────────────────────────────┐\n│                     GIT ARCHITECTURE                     │\n├─────────────────────────────┬────────────────────────────┤\n│ 1. OBJECT DATABASE          │ 2. REFERENCES (REFS)       │\n│    .git/objects/            │    .git/refs/heads/        │\n│    (Blob, Tree, Commit, Tag)│    (Con trỏ trỏ tới SHA-1) │\n├─────────────────────────────┼────────────────────────────┤\n│ 3. HEAD POINTER             │ 4. STAGING AREA (INDEX)    │\n│    .git/HEAD                │    .git/index              │\n│    (Trỏ tới branch hiện tại)│    (Cầu nối nhị phân)      │\n└─────────────────────────────┴────────────────────────────┘',
    example:
      'Một kỹ sư phần mềm cao cấp tại một tập đoàn công nghệ lớn hỗ trợ một đồng nghiệp vừa vô tình gõ lệnh git reset --hard làm mất toàn bộ mã nguồn của ba ngày làm việc. Đồng nghiệp hoảng sợ tột độ vì tưởng rằng dữ liệu đã bị xóa vĩnh viễn khỏi ổ cứng. Kỹ sư cao cấp mỉm cười, mở terminal, truy cập trực tiếp vào cơ sở dữ liệu đối tượng của Git thông qua các công cụ tầng thấp, tìm thấy đối tượng commit mồ côi (dangling commit) vẫn đang nằm nguyên vẹn trong thư mục `.git/objects/` và khôi phục lại toàn bộ nhánh chỉ sau ba mươi giây. Sự khác biệt giữa người dùng Git thông thường và chuyên gia Git Internals nằm ở chính sự thấu hiểu này.',
    commandSnippet: 'git rev-parse --git-dir\nls -la .git\nfind .git/objects -type f',
    commandExplanation:
      'Lệnh git rev-parse --git-dir trả về đường dẫn tuyệt đối của thư mục quản trị .git, ls -la liệt kê các thành phần cốt lõi bên trong, và find quét toàn bộ các đối tượng nhị phân đang được lưu trữ trong cơ sở dữ liệu đối tượng.',
    mistakes: [
      'Nghĩ rằng Git lưu trữ sự khác biệt giữa các dòng code (diff/deltas) cho từng phiên bản: Thực chất Git lưu toàn bộ ảnh chụp (snapshot) của tệp tin dưới dạng đối tượng Blob.',
      'Sợ hãi chỉnh sửa hoặc xem nội dung thư mục .git vì nghĩ rằng nó sẽ làm hỏng dự án.',
      'Tự ý dùng trình soạn thảo văn bản thông thường để mở và sửa đổi các tệp nhị phân nén zlib bên trong .git/objects.',
    ],
    labSteps: [
      'Mở terminal và di chuyển vào một thư mục repository đã khởi tạo Git.',
      'Sử dụng lệnh `ls -la .git` để quan sát toàn bộ các tệp tin và thư mục quản trị.',
      'Kiểm tra kích thước của thư mục `.git/objects` trước và sau khi thêm một tệp tin mới.',
    ],
    hint: 'Mọi dữ liệu lịch sử và cấu hình của Git đều nằm gói gọn bên trong duy nhất thư mục ẩn `.git`.',
    validation: 'Nhận diện chính xác 4 thành phần trụ cột của Git bên trong hệ thống tệp tin cục bộ.',
    quizIntro: 'Hãy kiểm tra nhận thức tổng quan của bạn về kiến trúc nội tại Git qua các câu hỏi sau.',
    challenge:
      'Tại sao Linus Torvalds lại khẳng định: "Git không phải là một hệ thống quản lý phiên bản ma thuật, nó chỉ là một cơ sở dữ liệu định danh theo nội dung cực kỳ đơn giản"?',
    summary: [
      'Git Internals nghiên cứu cấu trúc dữ liệu, thuật toán băm và cơ chế lưu trữ thực tế bên dưới của Git.',
      'Hiểu rõ Git Internals giúp làm chủ hoàn toàn các thao tác cứu hộ, tối ưu hóa và gỡ lỗi phức tạp.',
      'Bốn trụ cột chính bao gồm: Object Database, References, HEAD pointer và Index binary file.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Về mặt bản chất kiến trúc cốt lõi, Git thực sự là gì?',
        options: [
          { text: 'Một hệ thống tệp tin định danh theo nội dung (Content-Addressable File System)', correct: true },
          { text: 'Một cơ sở dữ liệu quan hệ SQL truyền thống', correct: false },
          { text: 'Một chương trình nén tệp tin đơn thuần như WinRAR', correct: false },
          { text: 'Một dịch vụ lưu trữ đám mây của Microsoft', correct: false },
        ],
        explanation: 'Git được thiết kế xoay quanh cơ sở dữ liệu khóa-giá trị, trong đó khóa chính là mã băm SHA-1 của nội dung dữ liệu.',
      },
      {
        id: 'q2',
        question: 'Toàn bộ siêu dữ liệu, lịch sử commit và cấu hình của một kho lưu trữ Git được lưu trữ ở đâu?',
        options: [
          { text: 'Nằm trọn vẹn trong thư mục ẩn `.git/` tại thư mục gốc của dự án', correct: true },
          { text: 'Lưu trữ trên máy chủ của GitHub tại Mỹ', correct: false },
          { text: 'Lưu trong Registry của hệ điều hành Windows', correct: false },
          { text: 'Lưu rải rác trong từng tệp tin mã nguồn', correct: false },
        ],
        explanation: 'Tính phân tán của Git thể hiện ở chỗ toàn bộ lịch sử và đối tượng đều được đóng gói đầy đủ trong thư mục `.git`.',
      },
      {
        id: 'q3',
        question: 'Mô hình lưu trữ dữ liệu của Git khác gì so với các hệ thống VCS đời cũ như SVN hay CVS?',
        options: [
          { text: 'Git lưu trữ ảnh chụp toàn diện (Snapshot) của toàn bộ dự án, trong khi SVN lưu trữ danh sách các dòng thay đổi (Delta/Diff)', correct: true },
          { text: 'Git chỉ lưu trữ mã nguồn tệp tin dạng văn bản thuần', correct: false },
          { text: 'Git không hỗ trợ lưu trữ tệp hình ảnh', correct: false },
          { text: 'Hai hệ thống có cơ chế lưu trữ hoàn toàn giống hệt nhau', correct: false },
        ],
        explanation: 'Mỗi commit trong Git là một snapshot toàn diện của cây thư mục tại thời điểm đó, chứ không phải một chuỗi các bản vá vi phân tích lũy.',
      },
      {
        id: 'q4',
        question: 'Bốn thành phần trụ cột nền tảng của Git Internals bao gồm những thành phần nào?',
        options: [
          { text: 'Object Database, References (Refs), HEAD pointer, và Index (Staging Area)', correct: true },
          { text: 'CPU, RAM, Ổ cứng và Card mạng', correct: false },
          { text: 'HTML, CSS, JavaScript và TypeScript', correct: false },
          { text: 'Commit, Push, Pull và Merge', correct: false },
        ],
        explanation: 'Bốn thực thể này phối hợp với nhau để tạo nên toàn bộ các tính năng phân nhánh, ghi vết và hợp nhất của Git.',
      },
    ],
  },
  {
    id: '02-porcelain-vs-plumbing',
    title: 'Phân biệt Porcelain Commands vs Plumbing Commands',
    duration: 25,
    xp: 85,
    prerequisites: ['01-git-internals-intro'],
    keywords: ['porcelain', 'plumbing', 'low level commands', 'high level commands', 'git architecture'],
    objectives: [
      'Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).',
      'Hiểu cách các lệnh Porcelain thân thiện (git add, git commit) phối hợp nhiều lệnh Plumbing bên dưới.',
      'Làm quen với các lệnh Plumbing cơ bản: git hash-object, git cat-file, git update-index, git write-tree, git commit-tree.',
    ],
    commands: ['git commit -m "msg"', 'git write-tree', 'git commit-tree'],
    definition:
      'Trong thuật ngữ của Git, Porcelain (nghĩa đen là đồ sứ tráng men cao cấp) là nhóm các lệnh giao diện bậc cao, thân thiện và công thái học dành cho người dùng hàng ngày như git commit, git checkout, git pull. Ngược lại, Plumbing (nghĩa đen là hệ thống đường ống nước ngầm) là nhóm các lệnh bậc thấp được thiết kế để thực hiện các thao tác nguyên tử trực tiếp với cơ sở dữ liệu đối tượng của Git (như git hash-object, git cat-file, git write-tree).',
    why:
      'Các lệnh Porcelain được thiết kế để thuận tiện cho con người, nhưng chúng ẩn giấu toàn bộ các bước xử lý nội bộ tinh vi. Khi bạn cần xây dựng các công cụ tự động hóa tùy biến, viết script tích hợp sâu, hoặc thực hiện các ca cứu hộ mã nguồn phức tạp mà lệnh bề mặt từ chối thực hiện, các lệnh Plumbing cung cấp cho bạn quyền kiểm soát phẫu thuật chính xác tới từng byte dữ liệu.',
    mentalModel:
      'Hãy tưởng tượng hệ thống cấp thoát nước trong một căn biệt thự sang trọng. Các thiết bị vệ sinh bằng sứ trắng muốt cao cấp như bồn rửa tay, vòi hoa sen tự động và bồn tắm massage chính là Porcelain: người sử dụng chỉ cần nhấn nút nhẹ nhàng để xả nước. Nhưng bên dưới sàn nhà là mạng lưới chằng chịt các đường ống dẫn nước bằng đồng, van áp suất và bơm thủy lực (Plumbing): chỉ có những người thợ sửa ống nước lành nghề mới can thiệp vào đây khi cần khắc phục rò rỉ.',
    diagram:
      'Hai tầng câu lệnh trong Git:\n┌────────────────────────────────────────────────────────┐\n│ PORCELAIN (Giao diện bậc cao - Thân thiện người dùng)  │\n│ git add | git commit | git branch | git merge | git log │\n└───────────────────────────┬────────────────────────────┘\n                            │ Phối hợp bên dưới\n                            ▼\n┌────────────────────────────────────────────────────────┐\n│ PLUMBING (Giao diện bậc thấp - Thao tác trực tiếp đĩa) │\n│ git hash-object | git cat-file | git update-index      │\n│ git write-tree  | git commit-tree | git rev-parse      │\n└───────────────────────────┬────────────────────────────┘\n                            │ Ghi trực tiếp\n                            ▼\n             [.git/objects/ và .git/refs/]',
    example:
      'Khi một lập trình viên gõ lệnh Porcelain quen thuộc: `git commit -m "feat: login"`, Git không thực hiện một hành động đơn nhất. Dưới nắp ca-pô, Git âm thầm kích hoạt một chuỗi các lệnh Plumbing: trước hết gọi `git write-tree` để quét toàn bộ Staging Area và đóng gói thành một đối tượng Tree; sau đó gọi `git commit-tree <tree-hash> -p <parent-hash> -m "feat: login"` để tạo ra đối tượng Commit; và cuối cùng gọi `git update-ref refs/heads/main <commit-hash>` để di chuyển con trỏ nhánh chính tới commit mới. Hiểu được chuỗi phối hợp này giúp kỹ sư có thể tự tay tạo ra commit mà không cần dùng đến git add hay git commit.',
    commandSnippet: 'git commit -m "msg"\ngit write-tree\ngit commit-tree',
    commandExplanation:
      'Lệnh git commit là đại diện tiêu biểu của tầng Porcelain, trong khi git write-tree và git commit-tree là các lệnh Plumbing nguyên tử thao tác trực tiếp với dữ liệu nhị phân của Git.',
    mistakes: [
      'Cố gắng sử dụng các lệnh Plumbing cho công việc lập trình thường nhật: Các lệnh này rất khó gõ và không có cơ chế bảo vệ an toàn như Porcelain.',
      'Nghĩ rằng các lệnh Plumbing là công cụ bên ngoài không thuộc về Git: Chúng được cài đặt sẵn bên trong mã nguồn chính thức của Git từ ngày đầu tiên.',
      'Quên truyền mã băm của commit cha (-p) khi gọi lệnh plumbing git commit-tree khiến lịch sử bị đứt gãy.',
    ],
    labSteps: [
      'Chạy lệnh `git --help -a` và cuộn trang xuống phần "Low-level Commands (Plumbing)".',
      'Quan sát danh sách phong phú các lệnh thao tác đối tượng, chỉ mục và tham chiếu.',
      'Đối chiếu các lệnh Porcelain thường dùng hàng ngày với các lệnh Plumbing tương ứng bên dưới.',
    ],
    hint: 'Bất kỳ thao tác nào bạn thực hiện bằng lệnh Porcelain đều có thể được tái hiện chính xác bằng cách xâu chuỗi các lệnh Plumbing.',
    validation: 'Phân loại chính xác một lệnh Git bất kỳ thuộc nhóm Porcelain hay Plumbing.',
    quizIntro: 'Cùng làm bài kiểm tra về sự khác biệt giữa hai tầng câu lệnh Porcelain và Plumbing.',
    challenge:
      'Tại sao Linus Torvalds lại thiết kế tầng Plumbing trước khi xây dựng tầng Porcelain trong những ngày đầu phát triển Git năm 2005?',
    summary: [
      'Porcelain là tầng lệnh bậc cao phục vụ trải nghiệm người dùng (`git add`, `git commit`, `git checkout`).',
      'Plumbing là tầng lệnh bậc thấp thao tác nguyên tử với dữ liệu (`git hash-object`, `git write-tree`, `git cat-file`).',
      'Mọi lệnh Porcelain thực chất là kịch bản phối hợp nhiều lệnh Plumbing bên dưới.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Lệnh nào sau đây thuộc nhóm Plumbing commands (lệnh bậc thấp) trong Git?',
        options: [
          { text: 'git cat-file', correct: true },
          { text: 'git commit', correct: false },
          { text: 'git branch', correct: false },
          { text: 'git clone', correct: false },
        ],
        explanation: '`git cat-file` là lệnh plumbing chuyên dụng để kiểm tra loại, kích thước và nội dung thô của một đối tượng Git.',
      },
      {
        id: 'q2',
        question: 'Thuật ngữ Porcelain (đồ sứ tráng men) trong Git được dùng để ẩn dụ cho điều gì?',
        options: [
          { text: 'Giao diện dòng lệnh bậc cao bóng bẩy, tiện lợi và thân thiện với người dùng', correct: true },
          { text: 'Phần cứng máy tính dễ vỡ nếu va đập', correct: false },
          { text: 'Các tệp tin mã nguồn có màu trắng', correct: false },
          { text: 'Một giao thức mạng truyền tải dữ liệu', correct: false },
        ],
        explanation: 'Linus Torvalds ví von các lệnh giao diện người dùng như thiết bị vệ sinh bằng sứ sạch sẽ, che giấu đường ống nước bẩn bên dưới.',
      },
      {
        id: 'q3',
        question: 'Lệnh Plumbing nào chịu trách nhiệm chuyển đổi nội dung của Staging Area thành một đối tượng Tree trên đĩa?',
        options: [
          { text: 'git write-tree', correct: true },
          { text: 'git make-tree', correct: false },
          { text: 'git save-index', correct: false },
          { text: 'git export-tree', correct: false },
        ],
        explanation: '`git write-tree` đọc tệp `.git/index` và ghi ra cấu trúc cây thư mục nhị phân vào `.git/objects`.',
      },
      {
        id: 'q4',
        question: 'Khi thực hiện lệnh Porcelain `git commit -m "init"`, Git âm thầm gọi những lệnh Plumbing nào bên dưới?',
        options: [
          { text: 'git write-tree, git commit-tree, và git update-ref', correct: true },
          { text: 'git push, git pull, và git fetch', correct: false },
          { text: 'git clean, git reset, và git rm', correct: false },
          { text: 'git format, git lint, và git compile', correct: false },
        ],
        explanation: 'Quy trình tạo commit đòi hỏi đóng gói tree, tạo đối tượng commit chứa thông điệp và cập nhật con trỏ tham chiếu nhánh.',
      },
    ],
  },
  {
    id: '03-dot-git-directory',
    title: 'Khám phá cấu trúc bên trong thư mục .git',
    duration: 30,
    xp: 90,
    prerequisites: ['02-porcelain-vs-plumbing'],
    keywords: ['dot git directory', 'HEAD', 'config', 'index', 'objects', 'refs', 'hooks'],
    objectives: [
      'Giải mã toàn bộ các tệp tin và thư mục cốt lõi bên trong thư mục quản trị .git/.',
      'Hiểu rõ chức năng của từng thành phần: HEAD, config, description, index, objects/, refs/, hooks/, info/.',
      'Nhận thức được rằng một kho lưu trữ Git hoàn chỉnh chỉ là một thư mục bình thường chứa thư mục con .git/.',
    ],
    commands: ['ls -la .git', 'cat .git/config', 'cat .git/HEAD'],
    definition:
      'Thư mục .git/ là trái tim và linh hồn của mọi kho lưu trữ Git. Đây là một thư mục ẩn nằm ở vị trí cao nhất của cây thư mục làm việc, chứa toàn bộ siêu dữ liệu, lịch sử commit, các đối tượng nhị phân, cấu hình người dùng và con trỏ nhánh. Nếu bạn xóa thư mục .git/, toàn bộ lịch sử quản lý phiên bản sẽ biến mất và dự án của bạn trở thành một thư mục tệp tin thông thường không có Version Control.',
    why:
      'Hầu hết các kỹ sư xem thư mục .git/ như một chiếc hộp đen ma thuật cấm kỵ và không bao giờ dám mở ra xem. Tuy nhiên, khi bạn thấu hiểu tường tận từng tệp tin và thư mục bên trong chiếc hộp đen đó: bạn biết cách sửa tệp .git/config để đổi URL remote mà không cần gõ lệnh dài dòng, biết đọc tệp .git/HEAD để biết chính xác con trỏ đang ở đâu, và biết cách sao lưu toàn vẹn toàn bộ dự án bằng cách nén duy nhất thư mục .git/. Nhờ đó, bạn hoàn toàn làm chủ hệ thống lưu trữ và tự tin ứng phó với mọi tình huống khẩn cấp.',
    mentalModel:
      'Hãy hình dung thư mục dự án của bạn như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu trên bàn là Working Directory (nơi bạn làm việc hàng ngày). Còn thư mục `.git/` chính là căn phòng lưu trữ hồ sơ tài liệu mật nằm ở góc phòng: có tủ đựng hồ sơ lịch sử (`objects/`), bảng danh bạ nhân viên (`config`), chiếc bảng ghim vị trí công việc hiện tại (`HEAD`), và ngăn kéo chứa các bản thảo chờ đóng dấu (`index`).',
    diagram:
      'Cấu trúc giải phẫu thư mục .git/:\n.git/\n├── HEAD              <── Tệp văn bản trỏ tới branch hiện hành (ref: refs/heads/main)\n├── config            <── Tệp cấu hình cục bộ của kho lưu trữ (remotes, user)\n├── description       <── Tệp mô tả dự án dùng cho GitWeb\n├── index             <── Tệp nhị phân Staging Area (lưu cache của cây thư mục)\n├── objects/          <── Cơ sở dữ liệu đối tượng (Object Store: xx/yyyyzz)\n│   ├── info/\n│   └── pack/         <── Chứa các tệp nén packfiles và chỉ mục index\n├── refs/             <── Danh mục các con trỏ tham chiếu\n│   ├── heads/        <── Nhánh cục bộ (main, feature)\n│   ├── tags/         <── Thẻ phiên bản (v1.0.0)\n│   └── remotes/      <── Nhánh theo dõi từ xa (origin/main)\n└── hooks/            <── Kịch bản tự động kích hoạt trước/sau sự kiện',
    example:
      'Một kỹ sư clone một dự án mã nguồn mở có dung lượng mã nguồn là 10 MB nhưng nhận thấy thư mục `.git/` nặng tới 200 MB. Tò mò mở khám phá cấu trúc bên trong, kỹ sư kiểm tra thư mục `.git/objects/pack/` và phát hiện một tệp `.pack` khổng lồ. Sử dụng các công cụ kiểm tra, kỹ sư phát hiện ra rằng trong quá khứ, một lập trình viên cũ đã vô tình commit một tệp video demo nặng 150 MB rồi sau đó xóa đi bằng lệnh git rm. Vì Git không bao giờ tự động xóa lịch sử, tệp video đó vẫn nằm nguyên vẹn trong thư mục `.git/objects/`. Kỹ sư đã tiến hành dọn dẹp và giảm 90% dung lượng kho lưu trữ.',
    commandSnippet: 'ls -la .git\ncat .git/config\ncat .git/HEAD',
    commandExplanation:
      'Lệnh ls -la .git liệt kê danh sách toàn bộ cấu trúc nội tạng của kho lưu trữ, cat .git/config đọc nội dung tệp cấu hình INI, và cat .git/HEAD in ra đường dẫn tham chiếu của nhánh đang được kiểm xuất.',
    mistakes: [
      'Xóa nhầm thư mục .git/ khi muốn dọn dẹp dự án, làm mất trắng toàn bộ lịch sử commit và các nhánh chưa đẩy lên server.',
      'Commit nhầm cả thư mục .git/ của một dự án con vào trong dự án cha (hiện tượng nested repo hoặc submodule lỗi).',
      'Chỉnh sửa tùy tiện tệp nhị phân .git/index bằng text editor thông thường làm hỏng cấu trúc Staging Area.',
    ],
    labSteps: [
      'Sử dụng lệnh `cd .git` để trực tiếp bước vào bên trong thư mục quản trị.',
      'Sử dụng lệnh `cat HEAD` để xem nội dung văn bản bên trong con trỏ HEAD.',
      'Xem nội dung tệp `config` để quan sát cách Git lưu thông tin remote origin và branch.',
    ],
    hint: 'Bạn có thể xem tệp `.git/HEAD` hoàn toàn bằng lệnh đọc văn bản thông thường như `cat` vì nó là tệp văn bản ASCII thuần túy.',
    validation: 'Đọc và giải thích được ý nghĩa nội dung của ít nhất 4 tệp tin/thư mục bên trong `.git/`.',
    quizIntro: 'Hãy kiểm tra mức độ nắm bắt của bạn về giải phẫu thư mục .git qua bài trắc nghiệm sau.',
    challenge:
      'Nếu bạn sao chép duy nhất thư mục .git/ sang một máy tính hoàn toàn mới và chạy lệnh git restore ., điều kỳ diệu gì sẽ xảy ra?',
    summary: [
      'Thư mục `.git/` chứa toàn bộ lịch sử, đối tượng và siêu dữ liệu của kho lưu trữ.',
      'Các tệp quan trọng gồm: `HEAD` (con trỏ hiện tại), `config` (cấu hình), `index` (staging area).',
      'Các thư mục quan trọng gồm: `objects/` (database), `refs/` (nhánh và tag), `hooks/` (kịch bản tự động).',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Tệp `.git/HEAD` thường chứa nội dung có định dạng như thế nào khi bạn đang ở trên nhánh main?',
        options: [
          { text: 'ref: refs/heads/main', correct: true },
          { text: 'Dãy số nhị phân không đọc được', correct: false },
          { text: 'Tên tài khoản GitHub của bạn', correct: false },
          { text: 'Mã băm commit của lần đầu tiên tạo repo', correct: false },
        ],
        explanation: 'Tệp `HEAD` là một symbolic reference trỏ tới tệp tham chiếu nhánh hiện tại dưới dạng văn bản: `ref: refs/heads/<branch>`.',
      },
      {
        id: 'q2',
        question: 'Thư mục nào bên trong `.git/` chịu trách nhiệm lưu trữ tất cả các đối tượng Blob, Tree, Commit và Tag?',
        options: [
          { text: '.git/objects/', correct: true },
          { text: '.git/refs/', correct: false },
          { text: '.git/hooks/', correct: false },
          { text: '.git/logs/', correct: false },
        ],
        explanation: 'Thư mục `objects/` là nơi cư ngụ của Object Database, lưu trữ mọi đối tượng nén bằng thuật toán zlib.',
      },
      {
        id: 'q3',
        question: 'Tệp `.git/index` đại diện cho thành phần kiến trúc nào mà người dùng hay thao tác?',
        options: [
          { text: 'Staging Area (vùng chuẩn bị commit)', correct: true },
          { text: 'Thư mục thùng rác Recycle Bin', correct: false },
          { text: 'Danh sách các mật khẩu đã lưu', correct: false },
          { text: 'Chỉ mục tìm kiếm của Google', correct: false },
        ],
        explanation: 'Tệp nhị phân `index` ghi lại danh sách toàn bộ các tệp tin trong Staging Area cùng mã băm SHA-1 và quyền hạn tệp.',
      },
      {
        id: 'q4',
        question: 'Điều gì sẽ xảy ra nếu một lập trình viên xóa bỏ hoàn toàn thư mục `.git/` khỏi dự án của họ?',
        options: [
          { text: 'Mã nguồn hiện tại vẫn còn trên đĩa, nhưng toàn bộ lịch sử commit, nhánh và cấu hình Git đều bị xóa sạch', correct: true },
          { text: 'Toàn bộ máy tính sẽ bị cài lại hệ điều hành', correct: false },
          { text: 'Các tệp tin mã nguồn tự động biến mất ngay lập tức', correct: false },
          { text: 'Không có gì thay đổi vì Git lưu dữ liệu ở đám mây', correct: false },
        ],
        explanation: 'Working Directory vẫn còn nguyên, nhưng dự án đã mất đi toàn bộ khả năng theo dõi lịch sử vì linh hồn `.git/` đã mất.',
      },
    ],
  },
  {
    id: '04-object-database',
    title: 'Cơ sở dữ liệu đối tượng Git (Object Database)',
    duration: 35,
    xp: 100,
    prerequisites: ['03-dot-git-directory'],
    keywords: ['object database', 'git objects', 'zlib compression', 'loose objects', 'packfiles'],
    objectives: [
      'Nắm vững bản chất của Git Object Database như một kho lưu trữ Key-Value Store đơn giản và thanh lịch.',
      'Hiểu rõ 4 loại đối tượng cơ bản trong Git: blob (nội dung), tree (thư mục), commit (lịch sử) và tag (chú thích).',
      'Khám phá cơ chế lưu trữ Loose Objects: cấu trúc phân chia thư mục 2 ký tự đầu và 38 ký tự sau (.git/objects/xx/yyyy).',
    ],
    commands: ['find .git/objects -type f', 'git count-objects -v'],
    definition:
      'Cơ sở dữ liệu đối tượng Git (Git Object Database) là một kho lưu trữ cặp Khóa - Giá trị (Key-Value Data Store) nằm tại thư mục .git/objects/. Trong hệ thống này, Giá trị (Value) là nội dung của một đối tượng bất kỳ được nén bằng thuật toán zlib, và Khóa (Key) là mã băm băm mật mã học SHA-1 (chuỗi 40 ký tự hexa) được tính toán từ chính nội dung của đối tượng đó kèm theo tiêu đề chuẩn.',
    why:
      'Hiểu được cách Git tổ chức cơ sở dữ liệu đối tượng giúp bạn giải mã được sự thần kỳ về tốc độ và tính toàn vẹn của Git. Mọi thứ trong Git — từ một dòng mã bạn viết, một thư mục con, một commit cho đến một nhãn phát hành — đều được quy về một trong bốn loại đối tượng cơ bản bất biến. Nếu dữ liệu bị hỏng dù chỉ 1 bit, mã băm SHA-1 sẽ thay đổi ngay lập tức và Git sẽ phát hiện sự can thiệp bất hợp pháp.',
    mentalModel:
      'Hãy hình dung một thư viện khổng lồ chứa hàng triệu cuốn sách. Thủ thư không xếp sách theo tên tác giả hay ngày xuất bản, mà sử dụng một chiếc máy quét quang học quét toàn bộ chữ trong cuốn sách để tạo ra một mã số định danh duy nhất (SHA-1 hash). Sau đó, thủ thư lấy 2 chữ số đầu của mã số làm số thứ tự của Dãy kệ sách (ví dụ: kệ số `4b`), và 38 chữ số còn lại làm số hiệu cuốn sách đặt trên kệ đó (`.git/objects/4b/825dc6e8`).',
    diagram:
      'Mô hình lưu trữ Loose Objects trong .git/objects/:\nSHA-1 Hash: e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\n            ││ └─────────────────────────────────────┘\n            ▼▼                  ▼\n    Tên thư mục con:     Tên tệp tin nén zlib:\n    .git/objects/e6/     9de29bb2d1d6434b8b29ae775ad8c2e48c5391\n\nNội dung bên trong tệp nén:\n[Header: "<type> <size>\\0"] + [Payload Content]',
    example:
      'Một kỹ sư muốn kiểm tra xem Git lưu trữ một chuỗi văn bản như thế nào. Kỹ sư tạo một tệp tin `hello.txt` chứa chữ "hello\\n" và chạy lệnh `git hash-object -w hello.txt`. Git trả về mã băm: `ce013625030ba8dba906f756967f9e9cf3944e52`. Kỹ sư mở thư mục `.git/objects/ce/` và thấy một tệp tin mới xuất hiện có tên `013625030ba8dba906f756967f9e9cf3944e52`. Khi kiểm tra tệp này bằng lệnh cat thông thường, màn hình chỉ hiển thị các ký tự nhị phân vô nghĩa vì dữ liệu đã được nén bằng zlib. Khi sử dụng lệnh chuyên dụng `git cat-file -p ce0136`, Git lập tức giải nén và in ra chữ "hello" nguyên bản.',
    commandSnippet: 'find .git/objects -type f\ngit count-objects -v',
    commandExplanation:
      'Lệnh find quét và hiển thị tất cả các tệp đối tượng rời rạc (loose objects) đang có trên đĩa, và git count-objects -v thống kê tổng số lượng đối tượng và dung lượng lưu trữ thực tế mà chúng chiếm dụng.',
    mistakes: [
      'Nhầm tưởng rằng tên tệp tin (ví dụ: `app.ts` hay `index.html`) được lưu bên trong đối tượng Blob: Blob chỉ lưu duy nhất nội dung, tên tệp được lưu trong đối tượng Tree.',
      'Sửa đổi nội dung của một tệp đối tượng trong `.git/objects/` bằng tay khiến Git báo lỗi "Corrupt loose object".',
      'Lo lắng khi thấy hàng trăm thư mục 2 ký tự sinh ra trong `.git/objects/`: Đây là thiết kế có chủ đích để tránh việc một thư mục chứa quá nhiều tệp làm giảm hiệu năng hệ điều hành.',
    ],
    labSteps: [
      'Chạy lệnh `git count-objects -v` để xem thống kê số lượng đối tượng trong repository hiện tại.',
      'Tạo một commit mới và chạy lại lệnh trên để quan sát số lượng đối tượng tăng lên.',
      'Sử dụng lệnh `find .git/objects -type f` để xem cấu trúc đường dẫn phân tách 2 ký tự đầu.',
    ],
    hint: 'Tại sao Git lại tách 2 ký tự đầu làm thư mục con? Vì nhiều hệ thống tệp tin cổ điển (như FAT32 hoặc ext3) sẽ bị chậm nghiêm trọng nếu một thư mục đơn lẻ chứa quá 10.000 tệp tin.',
    validation: 'Giải thích được quy tắc băm và phân rã đường dẫn thư mục `xx/yyyy` của các đối tượng Git.',
    quizIntro: 'Hãy kiểm tra mức độ thấu hiểu của bạn về cơ sở dữ liệu đối tượng Git qua các câu hỏi sau.',
    challenge:
      'Tại sao các đối tượng trong Git Object Database lại được gọi là Bất biến (Immutable)? Nếu bạn sửa một dấu phẩy trong tệp tin, chuyện gì sẽ xảy ra với đối tượng cũ?',
    summary: [
      'Git Object Database là một kho lưu trữ Key-Value dạng Content-Addressable nén bằng zlib.',
      'Bốn loại đối tượng cốt lõi gồm: `blob`, `tree`, `commit`, và `tag`.',
      'Đường dẫn đối tượng được phân rã thành thư mục 2 ký tự đầu và tệp 38 ký tự còn lại để tối ưu hóa hệ thống tệp.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Trong Git Object Database, Khóa (Key) dùng để định danh và tra cứu một đối tượng được tạo ra như thế nào?',
        options: [
          { text: 'Là mã băm mật mã học (SHA-1/SHA-256) được tính toán từ nội dung của đối tượng đó', correct: true },
          { text: 'Là số thứ tự tăng dần tự động (Auto-increment ID: 1, 2, 3)', correct: false },
          { text: 'Là tên của tệp tin do người dùng đặt', correct: false },
          { text: 'Là ngày giờ tạo ra tệp tin', correct: false },
        ],
        explanation: 'Git sử dụng mã băm nội dung (Content Hash) làm khóa định danh duy nhất, đảm bảo tính toàn vẹn và bất biến.',
      },
      {
        id: 'q2',
        question: 'Git sử dụng thuật toán nén dữ liệu nào cho các đối tượng lưu trữ dạng rời rạc (Loose Objects)?',
        options: [
          { text: 'zlib (Deflate)', correct: true },
          { text: 'mp3', correct: false },
          { text: 'jpeg', correct: false },
          { text: 'rar', correct: false },
        ],
        explanation: 'Git sử dụng thư viện nén zlib tiêu chuẩn để nén tiêu đề và nội dung của mọi đối tượng trước khi ghi xuống đĩa.',
      },
      {
        id: 'q3',
        question: 'Bốn loại đối tượng cơ bản duy nhất tồn tại trong cơ sở dữ liệu của Git là gì?',
        options: [
          { text: 'blob, tree, commit, và tag', correct: true },
          { text: 'file, folder, branch, và remote', correct: false },
          { text: 'text, image, audio, và video', correct: false },
          { text: 'user, pass, token, và key', correct: false },
        ],
        explanation: 'Mọi cấu trúc phức tạp của Git đều được quy tụ về đúng 4 khối hình học cơ bản: blob, tree, commit và tag.',
      },
      {
        id: 'q4',
        question: 'Tại sao Git lại chia mã băm 40 ký tự thành thư mục con 2 ký tự và tệp 38 ký tự (ví dụ: objects/4b/825de8)?',
        options: [
          { text: 'Để tránh việc có quá nhiều tệp tin nằm trong cùng một thư mục làm giảm tốc độ của hệ thống tệp tin hệ điều hành', correct: true },
          { text: 'Để mã hóa thông tin chống người khác đọc trộm', correct: false },
          { text: 'Để tiết kiệm dung lượng pin máy tính', correct: false },
          { text: 'Do quy định bắt buộc của ngôn ngữ C', correct: false },
        ],
        explanation: 'Việc chia thành 256 thư mục con (từ 00 đến ff) giúp phân tán số lượng tệp, tối ưu hóa tốc độ tìm kiếm và mở tệp của OS.',
      },
    ],
  },
  {
    id: '05-content-addressable-storage',
    title: 'Bộ nhớ định danh theo nội dung (Content-Addressable Storage)',
    duration: 30,
    xp: 95,
    prerequisites: ['04-object-database'],
    keywords: ['content addressable', 'cryptographic hashing', 'sha-1', 'deduplication', 'immutability'],
    objectives: [
      'Hiểu sâu nguyên lý của Bộ nhớ định danh theo nội dung (Content-Addressable Storage - CAS).',
      'Nắm bắt cơ chế tự động khử trùng lặp (Deduplication) tuyệt hảo: hai tệp có nội dung giống nhau chỉ tạo đúng một đối tượng.',
      'Làm chủ công thức tiêu đề chuẩn mực của một đối tượng Git: <type> <size>\\0<content>.',
    ],
    commands: ['echo -e "test content\\n" | git hash-object --stdin', 'sha1sum'],
    definition:
      'Content-Addressable Storage (CAS) là cơ chế lưu trữ dữ liệu trong đó thông tin được truy xuất và định danh dựa trên chính nội dung của nó, chứ không phải dựa trên vị trí đường dẫn hay tên gọi. Trong Git, mỗi khi bạn đưa dữ liệu vào hệ thống, Git sẽ băm toàn bộ nội dung cùng với một phần tiêu đề chuẩn mực thông qua thuật toán hàm băm SHA-1 để tạo ra mã định danh duy nhất (Content Hash). Nếu nội dung thay đổi dù chỉ một dấu cách, mã băm sẽ hoàn toàn khác; nếu nội dung giống hệt nhau, mã băm sẽ luôn luôn trùng khớp.',
    why:
      'Nguyên lý CAS mang lại hai siêu năng lực cốt lõi cho Git: Thứ nhất là Khử trùng lặp tự động (Automatic Deduplication) — nếu bạn có 100 tệp tin ở 100 thư mục khác nhau nhưng cùng chung nội dung, Git chỉ lưu đúng 1 đối tượng duy nhất trên đĩa, tiết kiệm dung lượng khổng lồ. Thứ hai là Tính toàn vẹn mật mã học (Cryptographic Integrity) — không ai có thể âm thầm sửa đổi mã nguồn trong quá khứ mà không làm thay đổi toàn bộ cây mã băm.',
    mentalModel:
      'Hãy so sánh việc tìm một người bằng số Căn cước công dân (Định danh theo nội dung) với việc tìm theo số phòng khách sạn (Định danh theo vị trí). Nếu tìm theo số phòng, người thuê phòng có thể thay đổi liên tục nhưng số phòng vẫn là 301. Nhưng nếu tìm theo số Căn cước công dân gắn liền với vân tay và võng mạc (nội dung sinh trắc học), dù người đó có di chuyển sang bất kỳ tỉnh thành nào trên thế giới thì danh tính của họ vẫn duy nhất và không bao giờ bị trùng lặp.',
    diagram:
      'Cơ chế tạo mã băm trong Content-Addressable Storage:\nNội dung văn bản: "hello\\n" (chiều dài: 6 bytes)\nLoại đối tượng:  blob\n\nChuỗi dữ liệu chuẩn hóa đưa vào hàm băm:\n"blob 6\\0hello\\n"\n        │\n        ▼ [Hàm băm mật mã học SHA-1]\n  ce013625030ba8dba906f756967f9e9cf3944e52\n\n(Bất kỳ ai trên thế giới băm chuỗi này đều ra đúng mã hash trên!)',
    example:
      'Một lập trình viên sao chép một tệp thư viện JavaScript có dung lượng 5 MB có tên `lodash.js` vào 10 thư mục module khác nhau trong dự án. Khi thực hiện `git add .`, lập trình viên lo lắng rằng thư mục `.git/` sẽ bị phình to thêm 50 MB (5 MB x 10). Tuy nhiên, khi kiểm tra dung lượng, thư mục `.git/objects/` chỉ tăng thêm đúng 5 MB. Lý do là vì cả 10 tệp tin đều có chung nội dung, Git áp dụng nguyên lý Content-Addressable Storage và tính toán ra cùng một mã băm SHA-1 duy nhất. Cả 10 đường dẫn khác nhau đều trỏ chung về một đối tượng Blob duy nhất trên đĩa.',
    commandSnippet: 'echo -e "test content\\n" | git hash-object --stdin\nsha1sum',
    commandExplanation:
      'Lệnh git hash-object --stdin nhận dữ liệu từ luồng đầu vào, tự động gắn tiêu đề chuẩn của đối tượng và tính toán mã băm SHA-1 tương ứng mà không cần phải tạo tệp tin vật lý trên đĩa.',
    mistakes: [
      'Cho rằng mã băm của tệp tin chỉ tính từ nội dung của tệp: Git bắt buộc phải ghép thêm phần tiêu đề `"<type> <size>\\0"` trước khi băm.',
      'Sợ rằng việc đổi tên tệp tin (rename file) sẽ làm tăng gấp đôi dung lượng repository: Vì nội dung không đổi, Blob cũ được tái sử dụng 100%.',
      'Nghĩ rằng mã băm SHA-1 có thể bị trùng lặp ngẫu nhiên trong một dự án thực tế: Xác suất va chạm SHA-1 là vô cùng nhỏ, tương đương xác suất bị sét đánh trúng trúng xổ số nhiều lần liên tiếp.',
    ],
    labSteps: [
      'Chạy lệnh `echo "hello world" | git hash-object --stdin` và ghi lại mã băm đầu ra.',
      'Tạo một tệp `a.txt` chứa dòng chữ "hello world" và chạy `git hash-object a.txt`.',
      'Tạo một tệp `b.txt` nằm trong thư mục con cũng chứa dòng chữ "hello world" và so sánh mã băm.',
    ],
    hint: 'Hai tệp tin ở hai vị trí khác nhau, mang hai tên gọi khác nhau, nhưng hễ có nội dung giống nhau thì sẽ có mã băm SHA-1 giống hệt nhau.',
    validation: 'Xác nhận mã băm của hai tệp tin có cùng nội dung là hoàn toàn trùng khớp 100%.',
    quizIntro: 'Cùng kiểm tra mức độ thấu hiểu nguyên lý Content-Addressable Storage qua các câu hỏi sau.',
    challenge:
      'Nếu bạn có một dự án mã nguồn gồm 10.000 tệp tin nhưng tất cả các tệp đều hoàn toàn trống rỗng (0 bytes), cơ sở dữ liệu đối tượng của Git sẽ tạo ra bao nhiêu đối tượng Blob?',
    summary: [
      'Content-Addressable Storage lưu trữ và truy xuất dữ liệu dựa trên mã băm nội dung của chính nó.',
      'Công thức tính băm chuẩn của Git luôn bao gồm tiêu đề: `"<type> <size>\\0<content>"`.',
      'Mang lại khả năng tự động khử trùng lặp dữ liệu tuyệt đối và bảo đảm tính toàn vẹn bất biến.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Công thức chuỗi dữ liệu đầu vào mà Git sử dụng để tính toán mã băm SHA-1 cho một đối tượng là gì?',
        options: [
          { text: '<type> <size>\\0<content>', correct: true },
          { text: '<filename> <content>', correct: false },
          { text: '<timestamp> <author> <content>', correct: false },
          { text: 'Chỉ riêng phần <content> thuần túy', correct: false },
        ],
        explanation: 'Git luôn gắn phần tiêu đề gồm loại đối tượng, dấu cách, kích thước byte, ký tự null byte (\\0) rồi mới đến nội dung.',
      },
      {
        id: 'q2',
        question: 'Nếu bạn có 5 tệp tin ở 5 thư mục khác nhau nhưng có nội dung hoàn toàn giống nhau từng ký tự, Git sẽ lưu bao nhiêu Blob trong .git/objects/?',
        options: [
          { text: 'Đúng 1 đối tượng Blob duy nhất (cơ chế khử trùng lặp)', correct: true },
          { text: '5 đối tượng Blob riêng biệt', correct: false },
          { text: 'Không lưu đối tượng nào cả', correct: false },
          { text: '10 đối tượng', correct: false },
        ],
        explanation: 'Vì nội dung giống nhau nên mã băm giống nhau, Git tái sử dụng ngay đối tượng đã có mà không ghi đè thêm bản sao.',
      },
      {
        id: 'q3',
        question: 'Đặc tính "Bất biến" (Immutability) trong hệ thống Content-Addressable Storage nghĩa là gì?',
        options: [
          { text: 'Nội dung của một đối tượng đã tạo ra không bao giờ có thể bị sửa đổi, sửa nội dung sẽ sinh ra đối tượng mới với mã băm mới', correct: true },
          { text: 'Không ai có quyền xóa kho lưu trữ Git', correct: false },
          { text: 'Tệp tin bị khóa quyền chỉ đọc trên hệ điều hành', correct: false },
          { text: 'Chỉ có tác giả mới có quyền commit', correct: false },
        ],
        explanation: 'Mỗi đối tượng gắn liền vĩnh viễn với mã băm của nó. Thay đổi dù 1 bit cũng biến nó thành một đối tượng hoàn toàn khác.',
      },
      {
        id: 'q4',
        question: 'Lệnh nào cho phép bạn tính toán mã băm của một chuỗi dữ liệu mà không cần phải ghi đối tượng vào thư mục .git/objects/?',
        options: [
          { text: 'git hash-object (không kèm cờ -w)', correct: true },
          { text: 'git hash-object -w', correct: false },
          { text: 'git write-tree', correct: false },
          { text: 'git cat-file -p', correct: false },
        ],
        explanation: 'Cờ `-w` viết tắt của write (ghi xuống đĩa). Nếu không có cờ `-w`, lệnh chỉ tính và in ra mã băm mà không ghi đối tượng.',
      },
    ],
  },
  {
    id: '06-blob-object',
    title: 'Đối tượng Blob: Lưu trữ nội dung nhị phân và tệp tin',
    duration: 30,
    xp: 90,
    prerequisites: ['05-content-addressable-storage'],
    keywords: ['blob', 'binary large object', 'file content', 'git objects', 'metadata exclusion'],
    objectives: [
      'Hiểu rõ bản chất của đối tượng Blob (Binary Large Object) trong Git.',
      'Nắm vững quy tắc quan trọng: Blob CHỈ lưu trữ nội dung dữ liệu thô, HOÀN TOÀN KHÔNG lưu tên tệp, ngày giờ hay quyền hạn.',
      'Sử dụng các lệnh plumbing để băm, ghi và giải mã một đối tượng Blob.',
    ],
    commands: ['git hash-object -w file.txt', 'git cat-file -t <hash>', 'git cat-file -p <hash>'],
    definition:
      'Blob (viết tắt của Binary Large Object - Đối tượng nhị phân lớn) là loại đối tượng đơn giản nhất và chiếm số lượng nhiều nhất trong cơ sở dữ liệu của Git. Nhiệm vụ duy nhất của Blob là lưu trữ toàn bộ nội dung dữ liệu thô của một tệp tin. Điều tối quan trọng cần ghi nhớ: một đối tượng Blob hoàn toàn không chứa tên tệp tin, không chứa quyền hạn thực thi (permissions), và không chứa ngày giờ tạo lập.',
    why:
      'Việc tách rời nội dung tệp tin (Blob) ra khỏi siêu dữ liệu và vị trí thư mục (Tree) là một phát minh thiết kế thiên tài và tinh tế của Git. Nhờ sự phân tách độc lập này, khi bạn đổi tên một tệp tin lớn từ `movie_old.mp4` thành `movie_new.mp4` hoặc di chuyển nó vào một thư mục khác, Git không cần phải nhân đôi hay nén lại đối tượng lưu trữ 1 GB đó, mà chỉ cần cập nhật một dòng chữ nhỏ trong đối tượng Tree trỏ tới cùng một Blob ID cũ. Điều này giúp tiết kiệm tối đa dung lượng đĩa và đẩy nhanh tốc độ thực thi.',
    mentalModel:
      'Hãy tưởng tượng nội dung cuốn tiểu thuyết của bạn là một bức thư tay dài (Blob). Bức thư này được nhét vào trong một chiếc phong bì thư. Trên mặt ngoài phong bì có ghi: "Tên người nhận: app.js", "Ngày gửi: 2026", "Quyền hạn: 100644" (Tree). Bạn có thể đổi chữ ghi ngoài phong bì thành bất kỳ tên gì bạn thích, nhưng bức thư tay nằm bên trong phong bì thì vẫn giữ nguyên từng con chữ không hề thay đổi.',
    diagram:
      'Cấu trúc của đối tượng Blob:\n┌────────────────────────────────────────────────────────┐\n│                     BLOB OBJECT                        │\n├────────────────────────────────────────────────────────┤\n│ Header:  "blob <content_length>\\0"                     │\n│ Payload: Toàn bộ nội dung dữ liệu thô của tệp tin      │\n│                                                        │\n│ ❌ KHÔNG CÓ: Tên tệp tin (filename)                    │\n│ ❌ KHÔNG CÓ: Đường dẫn thư mục (path)                  │\n│ ❌ KHÔNG CÓ: Quyền hạn tệp (mode/chmod)                │\n│ ❌ KHÔNG CÓ: Ngày giờ commit (timestamp)               │\n└────────────────────────────────────────────────────────┘',
    example:
      'Một kỹ sư phần mềm thực hiện thử nghiệm tạo một tệp tin mới có tên `sample.txt` với nội dung văn bản thuần túy "Xin chào Git Academy". Kỹ sư mở cửa sổ dòng lệnh và chạy lệnh plumbing cơ bản: `git hash-object -w sample.txt` và lập tức nhận được chuỗi mã băm SHA-1: `3b18e512db79e4c8300de074a1e281301f6181f0`. Sau đó, kỹ sư xóa hẳn tệp tin `sample.txt` khỏi thư mục làm việc và dọn sạch thùng rác. Bằng cách sử dụng lệnh `git cat-file -p 3b18e512db79e4c8300de074a1e281301f6181f0`, màn hình lập tức in ra dòng chữ "Xin chào Git Academy". Dù tệp tin trên ổ đĩa đã bị xóa hoàn toàn và tên gọi của tệp không còn lưu trong bảng tệp của hệ điều hành, nhưng nội dung dữ liệu của nó đã được bảo tồn an toàn trong đối tượng Blob của Git.',
    commandSnippet: 'git hash-object -w file.txt\ngit cat-file -t <hash>\ngit cat-file -p <hash>',
    commandExplanation:
      'Lệnh git hash-object -w ghi tệp vào object store, git cat-file -t in ra loại đối tượng (sẽ trả về chữ "blob"), và git cat-file -p in ra nội dung đã giải nén của đối tượng đó.',
    mistakes: [
      'Tìm kiếm tên tệp tin bên trong nội dung đối tượng Blob và nghĩ rằng Git bị lỗi khi không thấy tên tệp.',
      'Nhầm lẫn giữa đối tượng Blob và đối tượng Commit: Blob không có thông điệp commit, không có tên tác giả.',
      'Nghĩ rằng Blob chỉ dùng cho tệp nhị phân như ảnh hay video: Mọi tệp mã nguồn văn bản như `.ts`, `.java`, `.py` đều được lưu dưới dạng Blob.',
    ],
    labSteps: [
      'Tạo một tệp `demo.txt` chứa một đoạn văn bản ngắn.',
      'Sử dụng `git hash-object -w demo.txt` để tạo và ghi Blob vào cơ sở dữ liệu.',
      'Dùng lệnh `git cat-file -t <mã-băm>` để xác nhận loại đối tượng là `blob`.',
    ],
    hint: 'Sử dụng lệnh `git cat-file -s <hash>` nếu bạn muốn biết kích thước chính xác theo đơn vị byte của đối tượng Blob đó.',
    validation: 'Giải nén và xem được nội dung văn bản của Blob từ mã băm mà không cần mở tệp gốc.',
    quizIntro: 'Hãy kiểm tra kiến thức về đối tượng Blob trong cơ sở dữ liệu Git qua các câu hỏi sau.',
    challenge:
      'Nếu bạn đổi tên một tệp tin 100 MB trong dự án và thực hiện commit, dung lượng của kho chứa `.git/` sẽ tăng thêm bao nhiêu byte?',
    summary: [
      'Blob là đối tượng cơ bản nhất trong Git dùng để lưu trữ nội dung dữ liệu thô của tệp tin.',
      'Blob hoàn toàn không chứa tên tệp, quyền hạn tệp hay dấu thời gian.',
      'Sử dụng `git cat-file -p <hash>` để xem nội dung và `git cat-file -t <hash>` để kiểm tra loại đối tượng.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Đối tượng Blob trong Git chứa những thông tin nào sau đây?',
        options: [
          { text: 'Chỉ chứa nội dung dữ liệu thô của tệp tin', correct: true },
          { text: 'Chứa tên tệp tin, ngày tạo và nội dung', correct: false },
          { text: 'Chứa tên tác giả và thông điệp commit', correct: false },
          { text: 'Chứa danh sách các tệp tin trong thư mục', correct: false },
        ],
        explanation: 'Blob chỉ tập trung làm một việc duy nhất là lưu trữ nội dung thô (payload), mọi siêu dữ liệu khác do đối tượng Tree quản lý.',
      },
      {
        id: 'q2',
        question: 'Tên của tệp tin (ví dụ: `index.ts`) được lưu trữ ở đâu trong kiến trúc Git?',
        options: [
          { text: 'Được lưu trữ bên trong đối tượng Tree (cây thư mục)', correct: true },
          { text: 'Được lưu trữ bên trong đối tượng Blob', correct: false },
          { text: 'Được lưu trên máy chủ của GitHub', correct: false },
          { text: 'Git hoàn toàn không nhớ tên tệp tin', correct: false },
        ],
        explanation: 'Đối tượng Tree đóng vai trò như một thư mục, ánh xạ tên tệp tin với mã băm Blob tương ứng.',
      },
      {
        id: 'q3',
        question: 'Lệnh nào sau đây dùng để xem loại của một đối tượng Git từ mã băm SHA-1 của nó?',
        options: [
          { text: 'git cat-file -t <hash>', correct: true },
          { text: 'git cat-file -p <hash>', correct: false },
          { text: 'git type-of <hash>', correct: false },
          { text: 'git inspect <hash>', correct: false },
        ],
        explanation: 'Cờ `-t` viết tắt của type, yêu cầu Git in ra định danh loại đối tượng (blob, tree, commit hoặc tag).',
      },
      {
        id: 'q4',
        question: 'Chữ viết tắt Blob là đại diện cho cụm từ tiếng Anh nào?',
        options: [
          { text: 'Binary Large Object', correct: true },
          { text: 'Basic Line of Branch', correct: false },
          { text: 'Backup Log of Binary', correct: false },
          { text: 'Build Link of Base', correct: false },
        ],
        explanation: 'Blob là thuật ngữ khoa học máy tính kinh điển chỉ khối dữ liệu nhị phân lớn không có cấu trúc nội tại xác định.',
      },
    ],
  },
  {
    id: '07-tree-object',
    title: 'Đối tượng Tree: Lưu trữ cấu trúc thư mục và quyền tệp',
    duration: 35,
    xp: 95,
    prerequisites: ['06-blob-object'],
    keywords: ['tree object', 'directory structure', 'file mode', 'merkle tree', 'hierarchy'],
    objectives: [
      'Hiểu rõ bản chất của đối tượng Tree như người quản lý cấu trúc thư mục phân cấp trong Git.',
      'Nắm vững định dạng từng dòng mục (Tree Entry): chế độ quyền tệp (mode), loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.',
      'Khám phá kiến trúc cây Merkle Tree lồng nhau: một đối tượng Tree có thể chứa các đối tượng Tree con (thư mục con) và Blob (tệp con).',
    ],
    commands: ['git cat-file -p <tree-hash>', 'git ls-tree HEAD', 'git write-tree'],
    definition:
      'Đối tượng Tree (Cây thư mục) trong Git giải quyết bài toán biểu diễn cấu trúc hệ thống tệp tin phân cấp. Một đối tượng Tree đại diện cho một thư mục, bên trong chứa danh sách các bản ghi (entries). Mỗi bản ghi bao gồm 4 thông tin cốt lõi: chế độ quyền tệp (File Mode, ví dụ: 100644 cho tệp thường, 100755 cho tệp thực thi, 040000 cho thư mục con), loại đối tượng (blob hoặc tree), mã băm SHA-1 của đối tượng đó, và tên gọi của tệp hoặc thư mục.',
    why:
      'Nếu kiến trúc Git chỉ lưu trữ các đối tượng Blob, chúng ta sẽ chỉ sở hữu một kho dữ liệu nội dung thô rời rạc mà không thể biết tệp nào mang tên là gì, nằm trong đường dẫn thư mục nào, hoặc tệp nào được gán quyền thực thi kịch bản hệ điều hành. Đối tượng Tree chính là chất keo kết nối các Blob đơn lẻ lại thành một cây thư mục phân cấp hoàn chỉnh, mô phỏng chính xác 100% trạng thái không gian làm việc của dự án tại thời điểm chụp ảnh nhanh (snapshot), giúp tái tạo lại toàn bộ dự án nguyên vẹn.',
    mentalModel:
      'Hãy tưởng tượng đối tượng Tree như một cuốn sổ mục lục danh bạ thư mục. Mỗi trang sổ đại diện cho một ngăn tủ (Tree). Mở trang sổ ra, bạn thấy từng dòng ghi chú rõ ràng: "Ngăn nhỏ số 1 (040000 tree abc12): thư mục src", "Tài liệu số 2 (100644 blob def34): tệp README.md". Khi bạn muốn tìm tệp `src/app.ts`, bạn lần theo mục lục từ trang sổ gốc (Root Tree) đi vào trang sổ con (Sub-tree src) rồi mới chạm tới bức thư tay (Blob app.ts).',
    diagram:
      'Cấu trúc cây Merkle Tree phân tầng:\n[Root Tree: a1b2c3d4]\n├── 100644 blob e69de29b README.md\n└── 040000 tree f4a3b1c2 src/\n                          │\n                          ▼ [Sub-Tree src: f4a3b1c2]\n                          ├── 100644 blob 3b18e5f1 app.ts\n                          └── 100755 blob 9a8c7b6d build.sh (Executable)',
    example:
      'Một kỹ sư muốn khám phá cây thư mục của commit mới nhất trong dự án. Kỹ sư chạy lệnh `git cat-file -p HEAD` để lấy mã băm của đối tượng Tree gốc từ thông tin commit. Sau đó, kỹ sư chạy lệnh `git ls-tree <tree-hash>` và thấy hai dòng bản ghi: dòng thứ nhất hiển thị `100644 blob e69de29b package.json`, dòng thứ hai hiển thị `040000 tree a8b7c6df src`. Kỹ sư tiếp tục chạy `git ls-tree a8b7c6df` để xem nội dung thư mục con `src` và thấy danh sách các tệp mã nguồn bên trong gồm `app.ts` và `utils.ts`. Cấu trúc lồng nhau dạng Merkle Tree này chứng minh Git có thể quản lý cả cây thư mục sâu hàng chục tầng một cách ngăn nắp, tốc độ cao và cực kỳ nhẹ nhàng.',
    commandSnippet: 'git cat-file -p <tree-hash>\ngit ls-tree HEAD\ngit write-tree',
    commandExplanation:
      'Lệnh git ls-tree HEAD in ra danh sách cấu trúc cây thư mục của commit hiện tại, git cat-file -p hiển thị định dạng nội dung thô của đối tượng Tree, và git write-tree đóng gói Staging Area thành đối tượng Tree mới.',
    mistakes: [
      'Cho rằng thư mục trống (Empty Directory) sẽ tạo ra một đối tượng Tree: Git không thể theo dõi thư mục trống nếu bên trong không có ít nhất một tệp tin (đó là lý do người ta phải dùng `.gitkeep`).',
      'Nhầm lẫn giữa quyền hạn tệp đầy đủ của Linux với Git File Mode: Git chỉ hỗ trợ một số ít chế độ quyền chuẩn (100644, 100755, 120000 cho symlink, 040000 cho directory).',
      'Sắp xếp danh sách entry trong Tree sai thứ tự: Chuẩn Git bắt buộc các mục trong Tree phải được sắp xếp theo thứ tự mã byte ASCII của tên tệp.',
    ],
    labSteps: [
      'Tạo một dự án nhỏ gồm một tệp ở thư mục gốc và một tệp bên trong thư mục con `src/`.',
      'Đưa toàn bộ vào staging bằng lệnh `git add .`.',
      'Chạy lệnh plumbing `git write-tree` để tự sinh ra mã băm của đối tượng Root Tree.',
      'Sử dụng `git cat-file -p <tree-hash>` để quan sát cấu trúc bảng phân nhánh bên trong.',
    ],
    hint: 'Mã quyền `100755` biểu thị tệp tin có cờ thực thi (executable script), trong khi `100644` là tệp văn bản hoặc nhị phân thông thường.',
    validation: 'Nhận diện chính xác các dòng blob và tree con bên trong bảng in ra của lệnh ls-tree.',
    quizIntro: 'Hãy kiểm tra khả năng phân tích đối tượng Tree qua bài trắc nghiệm dưới đây.',
    challenge:
      'Tại sao Git từ chối theo dõi (track) một thư mục hoàn toàn trống rỗng nếu không có tệp tin nào bên trong?',
    summary: [
      'Đối tượng Tree đại diện cho một thư mục, liên kết các tên tệp với các đối tượng Blob và Tree con.',
      'Mỗi bản ghi trong Tree gồm: File Mode, loại đối tượng, mã băm SHA-1 và tên tệp/thư mục.',
      'Mô hình cây Merkle Tree giúp Git phát hiện sự thay đổi ở bất kỳ nhánh con nào một cách tức thì.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Đối tượng Tree trong cơ sở dữ liệu của Git đại diện cho thành phần nào trong hệ thống tệp tin?',
        options: [
          { text: 'Một thư mục (Directory)', correct: true },
          { text: 'Một tệp tin văn bản', correct: false },
          { text: 'Một con trỏ nhánh', correct: false },
          { text: 'Một bài kiểm thử tự động', correct: false },
        ],
        explanation: 'Đối tượng Tree ánh xạ trực tiếp tới một thư mục, chứa danh sách các tệp (blobs) và thư mục con (sub-trees).',
      },
      {
        id: 'q2',
        question: 'Mã chế độ quyền tệp tin (File Mode) `100755` trong đối tượng Tree biểu thị điều gì?',
        options: [
          { text: 'Tệp tin thông thường có quyền thực thi (Executable file / script)', correct: true },
          { text: 'Thư mục con', correct: false },
          { text: 'Tệp tin chỉ đọc', correct: false },
          { text: 'Tệp tin đã bị xóa', correct: false },
        ],
        explanation: 'Git theo dõi cờ thực thi qua mã mode `100755`, trong khi tệp thường không thực thi mang mã `100644`.',
      },
      {
        id: 'q3',
        question: 'Lệnh Git nào sau đây cho phép xem nội dung của một đối tượng Tree dưới dạng bảng danh sách tệp trực quan?',
        options: [
          { text: 'git ls-tree', correct: true },
          { text: 'git tree-view', correct: false },
          { text: 'git list-folder', correct: false },
          { text: 'git show-dir', correct: false },
        ],
        explanation: '`git ls-tree` là lệnh chuyên dụng để phân tích và in ra bảng danh mục của một đối tượng Tree.',
      },
      {
        id: 'q4',
        question: 'Tại sao Git không thể theo dõi một thư mục rỗng?',
        options: [
          { text: 'Vì Git theo dõi dữ liệu dựa trên nội dung tệp tin; một thư mục rỗng không có đối tượng Blob nào để tham chiếu', correct: true },
          { text: 'Vì Git bị lỗi phần mềm chưa khắc phục được', correct: false },
          { text: 'Vì hệ điều hành Linux cấm tạo thư mục rỗng', correct: false },
          { text: 'Vì thư mục rỗng làm hỏng thuật toán SHA-1', correct: false },
        ],
        explanation: 'Một đối tượng Tree chỉ được tạo ra khi có ít nhất một entry hợp lệ; thư mục rỗng không sinh ra blob nên không thể tạo tree.',
      },
    ],
  },
  {
    id: '08-commit-object',
    title: 'Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả',
    duration: 35,
    xp: 100,
    prerequisites: ['07-tree-object'],
    keywords: ['commit object', 'parent commit', 'author', 'committer', 'commit message', 'dag node'],
    objectives: [
      'Giải phẫu cấu trúc định dạng nội dung của một đối tượng Commit trong Git.',
      'Hiểu rõ 4 thành phần bắt buộc bên trong Commit: con trỏ tree, con trỏ commit cha (parent), thông tin tác giả/người commit, và commit message.',
      'Nắm bắt bản chất của lịch sử Git như một Đồ thị có hướng không chu trình (DAG) liên kết bởi các con trỏ parent.',
    ],
    commands: ['git cat-file -p HEAD', 'git cat-file -t HEAD', 'git log -1 --raw'],
    definition:
      'Đối tượng Commit là khối xây dựng trung tâm gắn kết toàn bộ lịch sử của Git. Một đối tượng Commit là một tệp văn bản nhỏ có cấu trúc cố định chứa một con trỏ trỏ tới đối tượng Tree gốc đại diện cho snapshot toàn diện của dự án tại thời điểm đó, một hoặc nhiều con trỏ trỏ tới các commit cha đi trước (parent), siêu dữ liệu về tác giả (Author: người viết mã) và người thực hiện commit (Committer: người đưa mã vào repo) kèm theo dấu thời gian UTC, và cuối cùng là thông điệp mô tả commit (Commit Message).',
    why:
      'Nếu không có đối tượng Commit, bạn chỉ có các ảnh chụp thư mục (Tree) rời rạc trong không gian mà không có khái niệm về thời gian, mối liên hệ nhân quả và lịch sử tiến hóa của dự án. Đối tượng Commit đóng vai trò như một bức ảnh chụp kỷ niệm kèm dòng nhật ký lịch sử: nó cho bạn biết ai là người viết mã, ai là người gộp vào kho lưu trữ, diễn ra vào ngày giờ nào, vì lý do gì, và bức ảnh trước đó trong album lịch sử là bức ảnh nào.',
    mentalModel:
      'Hãy tưởng tượng một chuỗi các toa tàu hỏa nối đuôi nhau trên đường ray. Mỗi toa tàu là một đối tượng Commit. Đầu toa tàu có một chiếc móc xích bằng thép nối ngược về toa tàu phía trước (`parent <hash>`). Bên trong toa tàu chứa một tấm bản đồ chỉ dẫn tới nhà kho chứa hàng (`tree <hash>`). Bạn có thể đi ngược từ toa tàu cuối cùng (HEAD) lần theo từng móc xích để đi về toa tàu đầu tiên của đoàn tàu lịch sử.',
    diagram:
      'Giải phẫu cấu trúc tệp nội dung đối tượng Commit:\n┌────────────────────────────────────────────────────────┐\n│                     COMMIT OBJECT                      │\n├────────────────────────────────────────────────────────┤\n│ tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904         │ <── Trỏ tới Root Tree\n│ parent 7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b        │ <── Trỏ tới Commit cha\n│ author Nguyen Van A <a@demo.com> 1769817600 +0700      │ <── Tác giả viết code\n│ committer Nguyen Van A <a@demo.com> 1769817600 +0700   │ <── Người commit\n│                                                        │\n│ feat: implement user authentication logic              │ <── Commit Message\n└────────────────────────────────────────────────────────┘',
    example:
      'Một kỹ sư muốn xem Git lưu trữ commit đầu tiên của dự án như thế nào. Kỹ sư chạy lệnh `git cat-file -p HEAD`. Màn hình hiển thị chính xác cấu trúc văn bản thuần túy gồm 5 dòng: dòng 1 bắt đầu bằng chữ `tree` kèm mã băm 40 ký tự; dòng 2 bắt đầu bằng chữ `parent` trỏ về commit trước; dòng 3 ghi rõ `author Le Hoang Nam <nam@company.com> 1727654400 +0700`; dòng 4 là committer; và sau một dòng trống là thông điệp: "feat: add user login endpoint". Kỹ sư nhận ra rằng commit không hề to lớn cồng kềnh, nó chỉ là một tệp văn bản nhỏ nặng chưa tới 300 bytes làm nhiệm vụ liên kết các con trỏ.',
    commandSnippet: 'git cat-file -p HEAD\ngit cat-file -t HEAD\ngit log -1 --raw',
    commandExplanation:
      'Lệnh git cat-file -p HEAD giải mã đối tượng commit hiện tại và hiển thị chi tiết các con trỏ tree, parent và metadata tác giả. Lệnh git cat-file -t HEAD xác nhận kiểu đối tượng là commit, và git log -1 --raw hiển thị thông tin commit mới nhất cùng mã băm của đối tượng Tree liên quan một cách trực quan.',
    mistakes: [
      'Cho rằng một commit lưu trữ sự khác biệt (diff) giữa hai phiên bản: Commit trỏ tới một cây Tree toàn diện của toàn bộ dự án tại thời điểm đó.',
      'Nhầm lẫn giữa Author (người tạo ra đoạn mã ban đầu) và Committer (người thực hiện lệnh đưa commit vào lịch sử, ví dụ khi cherry-pick hoặc rebase).',
      'Nghĩ rằng commit đầu tiên (Root commit) có con trỏ parent: Root commit là khởi nguồn của vũ trụ repo nên hoàn toàn không có dòng `parent`.',
    ],
    labSteps: [
      'Sử dụng lệnh `git cat-file -p HEAD` để xem nội dung thô của commit hiện tại.',
      'Xác định mã băm của đối tượng Tree và mã băm của Commit cha (parent).',
      'Chạy lệnh `git cat-file -p <parent-hash>` để lần ngược lại commit phía trước.',
    ],
    hint: 'Một Merge Commit thông thường sẽ có từ 2 dòng `parent` trở lên (ví dụ: `parent commit_1` và `parent commit_2`).',
    validation: 'Chỉ rõ được 4 thành phần cấu tạo nên đối tượng commit từ kết quả hiển thị của lệnh cat-file.',
    quizIntro: 'Hãy kiểm tra kiến thức về cấu trúc và vai trò của đối tượng Commit qua các câu hỏi sau.',
    challenge:
      'Tại sao khi hai lập trình viên khác nhau cùng commit một đoạn mã có nội dung y hệt nhau vào cùng một giây, mã băm commit của họ vẫn hoàn toàn khác biệt?',
    summary: [
      'Đối tượng Commit là trung tâm của lịch sử Git, liên kết snapshot thư mục với trục thời gian.',
      'Cấu trúc gồm: con trỏ `tree`, con trỏ `parent`, metadata `author`/`committer`, và `message`.',
      'Các con trỏ parent móc nối với nhau tạo thành Đồ thị có hướng không chu trình (DAG).',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Dòng đầu tiên bên trong nội dung thô của một đối tượng Commit luôn luôn là con trỏ nào?',
        options: [
          { text: 'tree <mã-băm-tree>', correct: true },
          { text: 'parent <mã-băm-commit>', correct: false },
          { text: 'author <tên-tác-giả>', correct: false },
          { text: 'message <nội-dung>', correct: false },
        ],
        explanation: 'Đối tượng Commit bắt buộc phải bắt đầu bằng dòng trỏ tới đối tượng Tree đại diện cho snapshot dự án.',
      },
      {
        id: 'q2',
        question: 'Sự khác biệt giữa thông tin `author` và `committer` trong đối tượng Commit là gì?',
        options: [
          { text: 'Author là người viết đoạn mã ban đầu, Committer là người áp dụng commit vào kho lưu trữ (ví dụ khi rebase/cherry-pick)', correct: true },
          { text: 'Author là giám đốc công ty, Committer là nhân viên thực tập', correct: false },
          { text: 'Author là máy tính, Committer là con người', correct: false },
          { text: 'Hai thông tin này hoàn toàn là một và không bao giờ khác nhau', correct: false },
        ],
        explanation: 'Khi một lập trình viên gửi bản vá và người bảo trì dùng lệnh rebase để gộp mã, thông tin author được giữ nguyên nhưng committer đổi thành người gộp.',
      },
      {
        id: 'q3',
        question: 'Một Commit phát sinh từ một thao tác hợp nhất nhánh (3-way Merge Commit) sẽ có bao nhiêu con trỏ `parent`?',
        options: [
          { text: 'Có ít nhất 2 con trỏ parent trở lên', correct: true },
          { text: 'Chỉ duy nhất 1 con trỏ parent', correct: false },
          { text: 'Hoàn toàn không có parent nào', correct: false },
          { text: 'Có đúng 10 con trỏ parent', correct: false },
        ],
        explanation: 'Merge commit nối hai nhánh lịch sử lại với nhau nên sở hữu tối thiểu 2 commit cha (parent 1 của nhánh hiện tại, parent 2 của nhánh được gộp).',
      },
      {
        id: 'q4',
        question: 'Commit đầu tiên trong một kho lưu trữ Git (Root Commit) có điểm gì đặc biệt về cấu trúc?',
        options: [
          { text: 'Hoàn toàn không có dòng `parent` nào', correct: true },
          { text: 'Không có dòng `tree`', correct: false },
          { text: 'Không có thông điệp commit', correct: false },
          { text: 'Không có mã băm SHA-1', correct: false },
        ],
        explanation: 'Vì là commit khởi thủy không có ai đi trước, Root commit không có bất kỳ con trỏ parent nào.',
      },
      {
        id: 'q5',
        question: 'Nếu hai người dùng khác nhau tạo ra hai commit có cùng đối tượng Tree, cùng commit cha và cùng commit message, tại sao mã băm commit của họ vẫn khác nhau?',
        options: [
          { text: 'Do dấu thời gian (timestamp) hoặc thông tin tác giả/người commit khác nhau', correct: true },
          { text: 'Do Git tự động gắn số ngẫu nhiên bí mật', correct: false },
          { text: 'Do địa chỉ IP mạng của hai máy tính khác nhau', correct: false },
          { text: 'Do thuật toán SHA-1 không hỗ trợ trùng lặp', correct: false },
        ],
        explanation: 'Mã băm commit được tính toán trên toàn bộ nội dung bao gồm thông tin author, committer và timestamp chính xác đến từng giây.',
      },
      {
        id: 'q6',
        question: 'Tại sao việc thay đổi một commit cũ trong lịch sử lại làm thay đổi mã băm của toàn bộ các commit nối tiếp phía sau nó?',
        options: [
          { text: 'Vì mỗi commit con đều lưu mã băm của commit cha bên trong nội dung con trỏ parent của mình', correct: true },
          { text: 'Vì Git tự động xóa và tạo lại toàn bộ repository', correct: false },
          { text: 'Vì hệ thống tệp tin bị phân mảnh', correct: false },
          { text: 'Vì máy chủ GitHub bắt buộc phải cấp phát ID mới', correct: false },
        ],
        explanation: 'Do tính chất mật mã học của DAG, việc đổi hash của commit cha làm thay đổi nội dung của commit con, kéo theo sự thay đổi chuỗi hash dây chuyền.',
      },
    ],
  },
  {
    id: '09-tag-object',
    title: 'Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)',
    duration: 30,
    xp: 90,
    prerequisites: ['08-commit-object'],
    keywords: ['tag object', 'annotated tag', 'lightweight tag', 'release milestone', 'gpg signature'],
    objectives: [
      'Phân biệt rõ ràng giữa Lightweight Tag (thẻ rút gọn) và Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng).',
      'Khám phá cấu trúc của đối tượng Tag trong cơ sở dữ liệu: object trỏ tới, type, tag name, tagger và message.',
      'Sử dụng các lệnh plumbing để kiểm tra tính toàn vẹn và chữ ký số GPG gắn trên đối tượng Tag.',
    ],
    commands: ['git tag -a v1.0.0 -m "Release version 1.0.0"', 'git cat-file -p refs/tags/v1.0.0', 'git cat-file -t v1.0.0'],
    definition:
      'Trong Git, có hai loại Tag: Lightweight Tag (chỉ là một con trỏ tham chiếu đơn giản ghi thẳng mã băm của commit vào một tệp văn bản trong `.git/refs/tags/`) và Annotated Tag (được lưu trữ như một Đối tượng Tag chính thức trong Object Database). Đối tượng Tag chứa một con trỏ trỏ tới đối tượng mục tiêu (thường là commit, nhưng có thể là tree hoặc blob), tên thẻ phiên bản, thông tin người gắn thẻ (Tagger), dấu thời gian và thông điệp chú thích phát hành.',
    why:
      'Khi đánh dấu một cột mốc phát hành phiên bản phần mềm quan trọng (như v1.0.0 hay v2.4.0), bạn cần lưu giữ vĩnh viễn ai là người phê duyệt phát hành phiên bản đó, vào thời gian nào, cùng với ghi chú phát hành (Release Notes) chi tiết và chữ ký số mã hóa chống giả mạo. Annotated Tag cung cấp đầy đủ các thuộc tính này như một đối tượng bất biến độc lập trong cơ sở dữ liệu, đảm bảo bằng chứng xác thực không thể bị chối bỏ.',
    mentalModel:
      'Hãy so sánh việc dán một mẩu giấy nhớ tạm thời màu vàng lên bìa cuốn sách (Lightweight Tag: chỉ ghi tên người đọc rồi dán tạm thời lên bìa) với việc đóng một con dấu sáp niêm phong hoàng gia chính thức có khắc chữ ký, gia huy và ngày tháng của đức vua lên văn kiện quốc gia (Annotated Tag: một thực thể trang trọng vĩnh viễn không thể làm giả, được lưu trữ thành một đối tượng độc lập có giá trị pháp lý trong lịch sử).',
    diagram:
      'So sánh Lightweight Tag vs Annotated Tag:\n1. Lightweight Tag: (Không tạo đối tượng trong objects/)\n   .git/refs/tags/v1.0-light ──► [Commit Object: 7a8b9c4d]\n\n2. Annotated Tag: (Tạo hẳn một Tag Object độc lập)\n   .git/refs/tags/v1.0.0 ──► [Tag Object: e1f2a3b4]\n                              │\n                              ├── object: 7a8b9c4d (Trỏ tới Commit)\n                              ├── type: commit\n                              ├── tag: v1.0.0\n                              ├── tagger: Tran Van B <b@dev.com>\n                              └── message: Release version 1.0.0',
    example:
      'Nhóm phát hành chuẩn bị tung ra phiên bản thương mại `v2.0.0`. Kỹ sư trưởng chạy lệnh: `git tag -a v2.0.0 -m "Official Production Release 2.0.0"`. Khi kiểm tra trong thư mục `.git/refs/tags/v2.0.0`, tệp tin này không trỏ thẳng vào commit, mà trỏ tới một mã băm đối tượng mới `9d8c7b6a`. Kỹ sư chạy `git cat-file -p 9d8c7b6a` và thấy một bảng dữ liệu trang trọng: dòng 1 trỏ tới commit phát hành; dòng 2 ghi type commit; dòng 3 ghi tag v2.0.0; dòng 4 ghi thông tin tagger kèm thời gian; và cuối cùng là thông điệp phát hành chính thức. Đây là bằng chứng không thể chối cãi về cột mốc lịch sử của sản phẩm.',
    commandSnippet: 'git tag -a v1.0.0 -m "Release version 1.0.0"\ngit cat-file -p refs/tags/v1.0.0\ngit cat-file -t v1.0.0',
    commandExplanation:
      'Lệnh git tag -a tạo một đối tượng Annotated Tag hoàn chỉnh kèm theo thông điệp ghi chú phát hành. Lệnh git cat-file -t in ra định danh loại đối tượng là tag, và git cat-file -p giải mã chi tiết toàn bộ nội dung của đối tượng Tag bao gồm commit mục tiêu, tagger và ngày giờ tạo lập.',
    mistakes: [
      'Sử dụng nhầm Lightweight Tag (`git tag v1.0.0`) khi muốn tạo bản phát hành chính thức (phải dùng cờ `-a` để tạo Annotated Tag).',
      'Nghĩ rằng Tag chỉ có thể trỏ tới Commit: Trong tầng sâu Git, một Tag Object có thể trỏ tới bất kỳ đối tượng nào, kể cả Blob hoặc Tree.',
      'Xóa thẻ tag cục bộ nhưng quên đẩy lệnh xóa lên remote server khiến tag bị đồng bộ ngược trở lại.',
    ],
    labSteps: [
      'Tạo một Lightweight Tag bằng lệnh `git tag v0.1-beta`.',
      'Tạo một Annotated Tag bằng lệnh `git tag -a v1.0.0 -m "Release 1.0"`.',
      'Sử dụng `git cat-file -t` trên cả hai thẻ để quan sát: một bên là `commit`, một bên là `tag`.',
    ],
    hint: 'Luôn luôn sử dụng cờ `-a` kèm theo thông điệp `-m` khi gắn thẻ phiên bản phát hành phần mềm.',
    validation: 'Phân biệt chính xác giữa một tham chiếu trỏ thẳng commit và một tham chiếu trỏ qua đối tượng Tag.',
    quizIntro: 'Cùng làm bài kiểm tra về bản chất của đối tượng Tag trong Git.',
    challenge:
      'Làm thế nào để gắn chữ ký số mật mã học GPG vào một Annotated Tag bằng lệnh git tag -s để chứng minh tính xác thực nguồn gốc?',
    summary: [
      'Lightweight Tag chỉ là một con trỏ văn bản đơn giản trỏ trực tiếp tới một commit.',
      'Annotated Tag tạo ra một đối tượng Tag độc lập trong Object Database với đầy đủ metadata và thông điệp.',
      'Annotated Tag là tiêu chuẩn bắt buộc cho các cột mốc phát hành phiên bản phần mềm chuyên nghiệp.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Lệnh nào sau đây dùng để tạo một Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng)?',
        options: [
          { text: 'git tag -a v1.0.0 -m "Release version 1.0.0"', correct: true },
          { text: 'git tag v1.0.0', correct: false },
          { text: 'git create-tag v1.0.0', correct: false },
          { text: 'git tag --fast v1.0.0', correct: false },
        ],
        explanation: 'Cờ `-a` (annotated) kết hợp với `-m` (message) báo cho Git tạo ra một đối tượng Tag chính thức trong Object Store.',
      },
      {
        id: 'q2',
        question: 'Khi bạn chạy lệnh `git cat-file -t` đối với một Lightweight Tag, Git sẽ trả về loại đối tượng nào?',
        options: [
          { text: 'commit', correct: true },
          { text: 'tag', correct: false },
          { text: 'blob', correct: false },
          { text: 'lightweight', correct: false },
        ],
        explanation: 'Vì Lightweight Tag không có đối tượng Tag riêng mà trỏ thẳng tới commit, nên loại đối tượng trả về là `commit`.',
      },
      {
        id: 'q3',
        question: 'Một đối tượng Tag hoàn chỉnh (Annotated Tag) chứa những thông tin cốt lõi nào?',
        options: [
          { text: 'Đối tượng được trỏ tới (object), loại đối tượng (type), tên thẻ (tag), người gắn thẻ (tagger), và thông điệp', correct: true },
          { text: 'Toàn bộ mã nguồn của dự án được nén lại', correct: false },
          { text: 'Mật khẩu tài khoản GitHub của người quản trị', correct: false },
          { text: 'Danh sách các bug còn tồn đọng', correct: false },
        ],
        explanation: 'Đối tượng Tag lưu trữ thông tin kiểm toán hoàn chỉnh về việc ai gắn thẻ, gắn vào đối tượng nào và vào thời điểm nào.',
      },
      {
        id: 'q4',
        question: 'Các con trỏ Tag được lưu trữ vật lý ở đường dẫn nào trong thư mục .git/?',
        options: [
          { text: '.git/refs/tags/', correct: true },
          { text: '.git/objects/tags/', correct: false },
          { text: '.git/tags_list/', correct: false },
          { text: '.git/branches/tags/', correct: false },
        ],
        explanation: 'Mọi con trỏ thẻ phiên bản đều nằm trong thư mục tham chiếu `.git/refs/tags/`.',
      },
    ],
  },
  {
    id: '10-git-hash-object',
    title: 'Tạo và băm đối tượng thủ công với git hash-object',
    duration: 35,
    xp: 100,
    prerequisites: ['09-tag-object'],
    keywords: ['git hash-object', 'plumbing command', 'sha-1 calculation', 'write object', 'hands-on lab'],
    objectives: [
      'Làm chủ lệnh plumbing quan trọng hàng đầu: git hash-object.',
      'Sử dụng các cờ cốt lõi: -w (write to database), --stdin (đọc từ luồng tiêu chuẩn), -t (chỉ định loại đối tượng).',
      'Tự tay tạo ra một đối tượng Blob hợp lệ trong thư mục .git/objects/ mà không cần dùng git add hay git commit.',
    ],
    commands: ['echo "Hello Internals" | git hash-object -w --stdin', 'git hash-object -w myfile.txt'],
    definition:
      'git hash-object là một lệnh Plumbing cơ bản nhận một tệp tin hoặc luồng dữ liệu đầu vào, tính toán mã băm mật mã học (SHA-1 hoặc SHA-256) của đối tượng đó theo đúng công thức tiêu đề của Git (`<type> <size>\\0<content>`), và in mã băm 40 ký tự ra màn hình. Khi kèm theo tùy chọn -w (write), lệnh này sẽ trực tiếp nén dữ liệu bằng zlib và ghi tệp đối tượng vào đúng vị trí trong thư mục .git/objects/.',
    why:
      'Lệnh git hash-object là viên gạch đầu tiên giúp bạn phá vỡ ảo tưởng rằng Git là một công cụ ma thuật thần bí khó hiểu. Bằng cách tự tay đưa một chuỗi văn bản vào cơ sở dữ liệu đối tượng mà không cần thông qua Staging Area hay tạo commit, bạn trực tiếp chứng kiến cách Git mã hóa và nén dữ liệu ở tầng vật lý, xây dựng nền tảng tư duy vững chắc để tự tay lắp ráp cây thư mục Merkle Tree và tạo commit thủ công hoàn toàn độc lập.',
    mentalModel:
      'Hãy tưởng tượng bạn đang cầm trên tay một chiếc máy dập mã vạch và đóng gói chân không công nghiệp trong một dây chuyền tự động. Bạn đưa một bức thư vào máy. Chiếc máy tự động đếm số lượng ký tự, dán một nhãn tiêu chuẩn lên đầu bức thư, hút chân không túi nhựa bảo quản (tương đương nén zlib), in ra một mã số băm SHA-1 40 ký tự độc nhất và cất chiếc túi vào đúng ngăn kệ lưu trữ trong kho hàng theo 2 ký tự đầu của mã số.',
    diagram:
      'Quy trình vận hành của lệnh git hash-object -w:\nChuỗi văn bản ──► [Gắn Header: "blob 15\\0"] ──► [Hàm băm SHA-1] ──► Mã băm 40 ký tự\n                                                          │\n                                                          ▼ [Nén zlib]\n                                                Ghi tệp đối tượng vào:\n                                                .git/objects/xx/yyyyzz',
    example:
      'Một kỹ sư muốn tạo đối tượng lưu trữ chuỗi văn bản "Hello World" trực tiếp từ dòng lệnh mà không cần tạo tệp trên đĩa cứng. Kỹ sư chạy câu lệnh terminal: `echo "Hello World" | git hash-object -w --stdin`. Git xử lý tức thì và trả về chuỗi mã băm: `557db03de997c86a4a028e1ebd3a1ceb225be238`. Ngay sau đó, kỹ sư kiểm tra thư mục nội tạng `.git/objects/55/` và phát hiện một tệp tin nhị phân mới tinh có tên `7db03de997c86a4a028e1ebd3a1ceb225be238` đã được ghi xuống đĩa thành công. Bằng một lệnh duy nhất, dữ liệu văn bản đã được đóng gói và bảo toàn vĩnh cửu trong cơ sở dữ liệu của Git mà không cần dùng đến lệnh git add.',
    commandSnippet: 'echo "Hello Internals" | git hash-object -w --stdin\ngit hash-object -w myfile.txt',
    commandExplanation:
      'Câu lệnh thứ nhất đọc trực tiếp từ luồng ký tự đầu vào với cờ --stdin và ghi xuống đĩa với cờ -w, trong khi câu lệnh thứ hai đọc nội dung từ một tệp tin vật lý có sẵn trên đĩa và tính toán mã băm SHA-1 tương ứng của tệp tin đó một cách chính xác.',
    mistakes: [
      'Quên truyền cờ `-w`: Git chỉ in mã băm ra màn hình mà hoàn toàn KHÔNG lưu đối tượng vào thư mục `.git/objects/`.',
      'Dùng lệnh echo trên Windows PowerShell vô tình gửi kèm ký tự xuống dòng `\\r\\n` làm sai lệch mã băm so với môi trường Linux `\\n`.',
      'Nghĩ rằng `git hash-object` sẽ tự động cập nhật tệp tin vào Staging Area (lệnh này chỉ ghi vào Object Store, không đụng chạm đến Index).',
    ],
    labSteps: [
      'Tạo một tệp tin mới `secret.txt` chứa nội dung "Top secret data".',
      'Chạy lệnh `git hash-object -w secret.txt` và sao chép lại mã băm 40 ký tự hiển thị trên màn hình.',
      'Mở thư mục `.git/objects/` và xác nhận sự tồn tại của thư mục con 2 ký tự đầu tương ứng.',
    ],
    hint: 'Ghi nhớ: cờ `-w` viết tắt của "write". Nếu không có cờ `-w`, lệnh hoạt động ở chế độ chỉ đọc mô phỏng.',
    validation: 'Tệp đối tượng nhị phân xuất hiện chính xác trong thư mục `.git/objects/xx/` sau khi thực thi lệnh.',
    quizIntro: 'Hãy kiểm tra kỹ năng sử dụng lệnh plumbing git hash-object qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để sử dụng tùy chọn `-t` của git hash-object để băm một tệp tin dưới dạng đối tượng Tree hoặc Commit thay vì mặc định là Blob?',
    summary: [
      '`git hash-object` tính toán mã băm SHA-1 theo chuẩn định dạng đối tượng của Git.',
      'Thêm cờ `-w` để ghi đối tượng nén zlib vào thư mục `.git/objects/`.',
      'Là viên gạch nền tảng để tạo Blob thủ công mà không cần qua lệnh Porcelain `git add`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Tùy chọn nào của lệnh `git hash-object` bắt buộc phải có để đối tượng thực sự được ghi xuống ổ đĩa trong .git/objects/?',
        options: [
          { text: '-w (write)', correct: true },
          { text: '-s (save)', correct: false },
          { text: '-f (force)', correct: false },
          { text: '-c (commit)', correct: false },
        ],
        explanation: 'Cờ `-w` yêu cầu Git ghi đối tượng vào Object Database; nếu không có cờ này, lệnh chỉ in mã băm ra màn hình.',
      },
      {
        id: 'q2',
        question: 'Tùy chọn `--stdin` trong lệnh `git hash-object` có tác dụng gì?',
        options: [
          { text: 'Đọc nội dung dữ liệu từ luồng đầu vào tiêu chuẩn (Standard Input) thay vì đọc từ tệp tin trên đĩa', correct: true },
          { text: 'Bắt buộc người dùng phải nhập mật khẩu', correct: false },
          { text: 'Chạy lệnh với quyền quản trị viên', correct: false },
          { text: 'Tự động sửa lỗi cú pháp', correct: false },
        ],
        explanation: '`--stdin` cho phép bạn truyền dữ liệu qua đường ống pipe (ví dụ: `echo "data" | git hash-object --stdin`).',
      },
      {
        id: 'q3',
        question: 'Mặc định nếu không chỉ định cờ `-t`, lệnh `git hash-object` sẽ tạo ra loại đối tượng nào?',
        options: [
          { text: 'blob', correct: true },
          { text: 'tree', correct: false },
          { text: 'commit', correct: false },
          { text: 'tag', correct: false },
        ],
        explanation: 'Loại đối tượng mặc định của `git hash-object` luôn luôn là `blob`.',
      },
      {
        id: 'q4',
        question: 'Sau khi chạy lệnh `git hash-object -w myfile.txt`, tệp `myfile.txt` đã được đưa vào Staging Area chưa?',
        options: [
          { text: 'Chưa, lệnh này chỉ ghi đối tượng vào Object Database, hoàn toàn không tác động đến tệp .git/index', correct: true },
          { text: 'Rồi, nó tương đương với git add', correct: false },
          { text: 'Tự động commit luôn', correct: false },
          { text: 'Tệp bị xóa khỏi thư mục làm việc', correct: false },
        ],
        explanation: 'Đây là sự khác biệt giữa Plumbing và Porcelain: `hash-object` chỉ thao tác với object store, không chạm vào staging area.',
      },
    ],
  },
];
