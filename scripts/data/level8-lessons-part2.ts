export const LEVEL8_PART2 = [
  {
    id: '11-git-cat-file',
    title: 'Giải mã và kiểm tra chi tiết đối tượng với git cat-file',
    duration: 30,
    xp: 95,
    prerequisites: ['10-git-hash-object'],
    keywords: ['git cat-file', 'inspect object', 'pretty print', 'object type', 'object size'],
    objectives: [
      'Làm chủ lệnh plumbing cứu hộ đa năng: git cat-file.',
      'Sử dụng thành thạo 3 cờ quan sát cốt lõi: -p (pretty-print nội dung), -t (kiểm tra loại đối tượng), và -s (xem kích thước byte).',
      'Có khả năng kiểm tra bất kỳ đối tượng nhị phân nào trong .git/objects/ chỉ bằng tiền tố mã băm (hash prefix).',
    ],
    commands: ['git cat-file -p <hash>', 'git cat-file -t <hash>', 'git cat-file -s <hash>'],
    definition:
      'git cat-file là con dao pha của các chuyên gia Git Internals. Vì mọi đối tượng trong thư mục .git/objects/ đều bị nén bằng thuật toán zlib, bạn không thể sử dụng các lệnh đọc văn bản thông thường như cat hay notepad để xem nội dung của chúng. Lệnh git cat-file nhận mã băm SHA-1 của một đối tượng, tự động giải nén, phân tích cú pháp tiêu đề và hiển thị thông tin chi tiết ra màn hình tùy theo các cờ tùy chọn được cung cấp.',
    why:
      'Khi hệ thống Git gặp sự cố hỏng tệp hoặc khi bạn cần điều tra lịch sử ở mức độ pháp y kỹ thuật số (digital forensics), git cat-file là công cụ duy nhất cho phép bạn "chụp X-quang" bên trong cơ sở dữ liệu đối tượng. Bạn có thể xem chính xác một Commit trỏ tới Tree nào, một Tree chứa những tệp gì, hoặc một Blob chứa nội dung thô ra sao mà không làm thay đổi trạng thái của Working Directory.',
    mentalModel:
      'Hãy tưởng tượng các đối tượng trong .git/objects/ như những viên thuốc con nhộng được niêm phong kín. git cat-file chính là chiếc máy quét y tế: cờ `-t` giống như máy quét nhiệt cho biết đây là viên thuốc loại gì (blob, tree hay commit); cờ `-s` là chiếc cân điện tử siêu nhỏ đo khối lượng viên thuốc; và cờ `-p` là chiếc máy soi laser mở nắp con nhộng để bạn nhìn thấy toàn bộ các hạt vi chất bên trong.',
    diagram:
      'Ba chế độ kiểm tra của git cat-file:\nĐối tượng: .git/objects/4b/825dc642cb6eb9a060e54bf8d69288fbee4904\n               │\n               ├─ git cat-file -t 4b825d ──► "tree"     (Loại đối tượng)\n               ├─ git cat-file -s 4b825d ──► "182"      (Kích thước byte)\n               └─ git cat-file -p 4b825d ──► Hiển thị nội dung định dạng đẹp\n                                             100644 blob e69de2 README.md\n                                             040000 tree 8a7b6c src',
    example:
      'Một kỹ sư nhận được thông báo lỗi từ đồng nghiệp rằng commit mới nhất bị mất một tệp tin cấu hình quan trọng. Thay vì chuyển nhánh hay reset lung tung làm xáo trộn code, kỹ sư mở terminal và chạy lệnh `git cat-file -p HEAD`. Nhìn vào dòng đầu tiên, kỹ sư thấy mã băm Tree là `e2a4b6`. Kỹ sư tiếp tục chạy `git cat-file -p e2a4b6` để kiểm tra danh mục cây thư mục gốc. Kết quả cho thấy tệp tin cấu hình `config.json` hoàn toàn không có mặt trong danh sách bản ghi của Tree. Kỹ sư kết luận ngay lập tức rằng đồng nghiệp đã quên gõ lệnh git add trước khi commit. Việc chẩn đoán diễn ra trong 10 giây mà không cần mở bất kỳ tệp nào trên đĩa.',
    commandSnippet: 'git cat-file -p <hash>\ngit cat-file -t <hash>\ngit cat-file -s <hash>',
    commandExplanation:
      'Cờ -p hiển thị nội dung đối tượng theo định dạng thân thiện (pretty-print), cờ -t hiển thị loại đối tượng (type như blob, tree, commit), và cờ -s hiển thị kích thước byte thực tế (size) của đối tượng trước khi nén, hỗ trợ kiểm tra toàn diện cấu trúc nội tại.',
    mistakes: [
      'Cố gắng mở tệp trong `.git/objects/` bằng lệnh `cat` thông thường của Linux dẫn đến việc màn hình tràn ngập các ký tự rác nhị phân.',
      'Truyền nhầm đường dẫn tệp tin thay vì truyền mã băm đối tượng cho lệnh git cat-file.',
      'Không biết rằng có thể chỉ truyền 4 đến 7 ký tự đầu tiên của mã băm (Prefix Hash) miễn là nó là duy nhất.',
    ],
    labSteps: [
      'Lấy mã băm của commit gần nhất bằng lệnh `git rev-parse HEAD`.',
      'Chạy lệnh `git cat-file -t HEAD` để xác nhận loại đối tượng.',
      'Chạy lệnh `git cat-file -p HEAD` và chọn một mã băm Blob bất kỳ trong danh mục để tiếp tục giải mã.',
    ],
    hint: 'Bạn có thể truyền trực tiếp con trỏ `HEAD` hoặc tên nhánh vào lệnh git cat-file thay vì phải gõ mã băm đầy đủ (ví dụ: `git cat-file -p HEAD`).',
    validation: 'Giải mã thành công nội dung của cả ba loại đối tượng: commit, tree và blob bằng lệnh cat-file.',
    quizIntro: 'Hãy kiểm tra khả năng giải mã đối tượng bằng git cat-file qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để sử dụng git cat-file kết hợp với vòng lặp bash script để tìm ra tệp tin có dung lượng lớn nhất từng tồn tại trong toàn bộ lịch sử repository?',
    summary: [
      '`git cat-file` là công cụ giải nén và kiểm tra nội tạng của các đối tượng trong Git Object Store.',
      'Cờ `-p` in nội dung định dạng đẹp, `-t` in loại đối tượng, `-s` in kích thước byte.',
      'Hỗ trợ truyền mã băm rút gọn (prefix hash) hoặc các con trỏ tham chiếu như `HEAD`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Tùy chọn `-p` trong lệnh `git cat-file` có ý nghĩa là gì?',
        options: [
          { text: 'Pretty-print (tự động phát hiện loại và hiển thị nội dung định dạng thân thiện với con người)', correct: true },
          { text: 'Password (yêu cầu mật khẩu giải mã)', correct: false },
          { text: 'Parent (in ra commit cha)', correct: false },
          { text: 'Push (đẩy đối tượng lên server)', correct: false },
        ],
        explanation: 'Cờ `-p` (pretty-print) sẽ tự động kiểm tra loại đối tượng và định dạng nội dung tương ứng (tree thành danh sách, commit thành header, blob thành text).',
      },
      {
        id: 'q2',
        question: 'Tùy chọn nào của `git cat-file` được sử dụng để kiểm tra kích thước tính theo byte của đối tượng?',
        options: [
          { text: '-s (size)', correct: true },
          { text: '-b (bytes)', correct: false },
          { text: '-k (kilobytes)', correct: false },
          { text: '-l (length)', correct: false },
        ],
        explanation: 'Cờ `-s` viết tắt của size, trả về kích thước chính xác của payload nội dung đối tượng trước khi nén.',
      },
      {
        id: 'q3',
        question: 'Nếu bạn chạy `git cat-file -p` trỏ tới một đối tượng Blob chứa ảnh PNG, điều gì sẽ xảy ra?',
        options: [
          { text: 'Nội dung dữ liệu nhị phân thô của tệp ảnh sẽ được in trực tiếp ra terminal', correct: true },
          { text: 'Một cửa sổ xem ảnh tự động bật lên', correct: false },
          { text: 'Git tự động chuyển ảnh thành một bức vẽ ASCII Art', correct: false },
          { text: 'Lệnh bị báo lỗi từ chối hiển thị', correct: false },
        ],
        explanation: 'Vì Blob chỉ lưu dữ liệu thô, git cat-file sẽ giải nén và in thẳng dữ liệu nhị phân của ảnh ra dòng lệnh.',
      },
      {
        id: 'q4',
        question: 'Bạn có thể cung cấp bao nhiêu ký tự tối thiểu của mã băm cho lệnh `git cat-file`?',
        options: [
          { text: 'Tối thiểu từ 4 ký tự trở lên, miễn là chuỗi đó không bị trùng lặp với đối tượng khác', correct: true },
          { text: 'Bắt buộc phải đủ 40 ký tự', correct: false },
          { text: 'Chỉ cần đúng 1 ký tự đầu tiên', correct: false },
          { text: 'Chính xác 8 ký tự, không được thừa hay thiếu', correct: false },
        ],
        explanation: 'Git hỗ trợ cơ chế Short Hash: bạn chỉ cần cung cấp đủ số ký tự đầu để phân biệt duy nhất đối tượng trong kho lưu trữ.',
      },
    ],
  },
  {
    id: '12-references-and-heads',
    title: 'Cơ chế References (Refs): heads, tags và remotes',
    duration: 30,
    xp: 90,
    prerequisites: ['11-git-cat-file'],
    keywords: ['references', 'refs', 'heads', 'branches', 'tags', 'remotes', 'pointers'],
    objectives: [
      'Hiểu rõ bản chất của một Nhánh (Branch) trong Git: thực chất chỉ là một tệp văn bản nhỏ 41 bytes chứa mã băm SHA-1.',
      'Khám phá cấu trúc thư mục .git/refs/ bao gồm: refs/heads/ (nhánh cục bộ), refs/tags/ (thẻ), và refs/remotes/ (nhánh từ xa).',
      'Sử dụng lệnh plumbing git update-ref để tạo và điều khiển con trỏ nhánh trực tiếp.',
    ],
    commands: ['cat .git/refs/heads/main', 'git show-ref', 'git update-ref refs/heads/test HEAD'],
    definition:
      'References (thường gọi tắt là Refs) là các con trỏ thân thiện với con người trỏ tới các đối tượng commit trong Git. Thay vì bắt người dùng phải ghi nhớ dãy mã băm 40 ký tự khó nhớ như 7a8b9c4d, Git lưu trữ các tên gọi gợi nhớ (như main, feature/login, v1.0.0) dưới dạng các tệp văn bản tĩnh nằm trong thư mục .git/refs/. Bên trong mỗi tệp tệp văn bản này chỉ chứa duy nhất một dòng văn bản gồm 40 ký tự hexa của commit mục tiêu kèm một ký tự xuống dòng (đúng 41 bytes).',
    why:
      'Nhiều hệ thống quản lý phiên bản khác (như SVN) xem một nhánh là một bản sao chép vật lý toàn bộ cây thư mục, khiến việc tạo nhánh mất nhiều thời gian và tốn hàng trăm megabyte. Trong Git, một nhánh chỉ là một con trỏ văn bản nặng 41 byte. Việc tạo nhánh, chuyển nhánh hay xóa nhánh diễn ra với tốc độ ánh sáng (dưới 1 phần nghìn giây) vì Git thực chất chỉ tạo hoặc xóa một tệp văn bản nhỏ xíu.',
    mentalModel:
      'Hãy tưởng tượng bạn đang đọc một cuốn sách dày 1000 trang (lịch sử commit). Bạn không thể nhớ cuốn sách đang mở đến trang thứ 872 (mã SHA-1). Bạn lấy một chiếc kẹp sách bằng nhựa nhỏ có dán nhãn chữ "main" kẹp vào trang 872 (Refs). Khi bạn đọc thêm một trang mới 873 (commit mới), bạn chỉ việc rút chiếc kẹp sách "main" ra và kẹp nó vào trang 873. Chiếc kẹp sách siêu nhẹ và việc di chuyển nó hoàn toàn không tốn chút sức lực nào.',
    diagram:
      'Bản chất cấu trúc của References trong .git/refs/:\n.git/refs/\n├── heads/                 <── Nhánh cục bộ\n│   ├── main               <── Tệp văn bản chứa: "7a8b9c4d3e2f\\n" (41 bytes)\n│   └── feature            <── Tệp văn bản chứa: "1f2e3d4c5b6a\\n"\n├── tags/                  <── Thẻ phiên bản\n│   └── v1.0.0             <── Tệp văn bản chứa mã băm của Commit hoặc Tag\n└── remotes/               <── Nhánh theo dõi từ xa\n    └── origin/\n        └── main           <── Tệp văn bản ghi vết trạng thái trên server',
    example:
      'Một kỹ sư muốn kiểm chứng xem tạo nhánh trong Git có thực sự chỉ là tạo tệp văn bản hay không. Kỹ sư mở terminal và chạy lệnh: `cat .git/refs/heads/main`. Màn hình in ra chuỗi mã băm: `c5d4e3f2a1b09876543210fedcba9876543210fe`. Sau đó, thay vì gõ lệnh thông thường git branch new-feature, kỹ sư sử dụng lệnh echo để tạo tệp thủ công: `echo "c5d4e3f2a1b09876543210fedcba9876543210fe" > .git/refs/heads/new-feature`. Ngay lập tức, kỹ sư gõ `git branch` để kiểm tra: danh sách nhánh hiện ra ngay lập tức nhánh `new-feature` mới tinh trỏ đúng vào commit của main. Thao tác hoàn toàn thành công mà không cần qua bất kỳ công cụ phức tạp nào.',
    commandSnippet: 'cat .git/refs/heads/main\ngit show-ref\ngit update-ref refs/heads/test HEAD',
    commandExplanation:
      'Lệnh cat xem nội dung mã băm bên trong tệp nhánh, git show-ref liệt kê toàn bộ các tham chiếu trong kho lưu trữ, và git update-ref cập nhật con trỏ tham chiếu an toàn theo chuẩn plumbing.',
    mistakes: [
      'Nghĩ rằng xóa một nhánh là xóa toàn bộ các commit trên nhánh đó: Xóa nhánh thực chất chỉ là xóa tệp văn bản 41 bytes chứa con trỏ, các commit vẫn nằm nguyên vẹn trong Object Store.',
      'Tự ý sửa đổi nội dung tệp trong `.git/refs/` bằng tay mà vô tình xóa mất ký tự khiến mã băm không đủ 40 ký tự.',
      'Nhầm lẫn giữa `refs/heads/` (nhánh cục bộ bạn có thể commit vào) và `refs/remotes/` (nhánh chỉ đọc phản ánh trạng thái máy chủ từ xa).',
    ],
    labSteps: [
      'Xem nội dung của tệp nhánh hiện tại bằng lệnh `cat .git/refs/heads/<tên-nhánh>`.',
      'Sử dụng lệnh plumbing `git update-ref refs/heads/manual-branch HEAD` để tạo nhánh mới.',
      'Chạy lệnh `git branch` để kiểm chứng xem nhánh `manual-branch` đã xuất hiện hay chưa.',
    ],
    hint: 'Lệnh `git update-ref` là phương pháp chuẩn an toàn để thao tác với refs vì nó có cơ chế kiểm tra khóa tệp tin tránh xung đột tiến trình.',
    validation: 'Nhánh mới tạo bằng lệnh plumbing update-ref hiển thị chính xác trong danh sách git branch.',
    quizIntro: 'Hãy kiểm tra kiến thức về cơ chế con trỏ References trong Git qua các câu hỏi sau.',
    challenge:
      'Làm thế nào mà lệnh git packed-refs giúp tối ưu hóa hiệu năng khi kho lưu trữ có tới hàng chục nghìn nhánh và thẻ tag?',
    summary: [
      'Một nhánh trong Git thực chất chỉ là một tệp văn bản 41 bytes chứa mã băm SHA-1 của commit mới nhất.',
      'Tất cả tham chiếu được tổ chức ngăn nắp trong `.git/refs/` (`heads/`, `tags/`, `remotes/`).',
      'Việc tạo, chuyển và xóa nhánh trong Git có chi phí tài nguyên gần như bằng 0.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Về mặt vật lý trên ổ đĩa, một nhánh Git (Branch) được lưu trữ dưới hình thức nào?',
        options: [
          { text: 'Một tệp văn bản nhỏ 41 bytes chứa duy nhất mã băm SHA-1 của commit đầu nhánh', correct: true },
          { text: 'Một bản sao chép toàn bộ thư mục dự án sang một thư mục mới', correct: false },
          { text: 'Một tệp nén zip chứa toàn bộ mã nguồn', correct: false },
          { text: 'Một bản ghi trong Registry hệ điều hành', correct: false },
        ],
        explanation: 'Một nhánh chỉ là một con trỏ văn bản tĩnh trỏ tới một commit; nó cực kỳ nhẹ và không tốn dung lượng ổ đĩa.',
      },
      {
        id: 'q2',
        question: 'Các nhánh cục bộ (local branches) được lưu trữ trong thư mục nào dưới đây?',
        options: [
          { text: '.git/refs/heads/', correct: true },
          { text: '.git/refs/remotes/', correct: false },
          { text: '.git/refs/tags/', correct: false },
          { text: '.git/branches_dir/', correct: false },
        ],
        explanation: 'Thư mục `refs/heads/` là nơi chứa tất cả các tệp con trỏ nhánh cục bộ của kho lưu trữ.',
      },
      {
        id: 'q3',
        question: 'Lệnh Plumbing chuẩn mực nào được sử dụng để cập nhật con trỏ của một tham chiếu an toàn?',
        options: [
          { text: 'git update-ref', correct: true },
          { text: 'git set-branch', correct: false },
          { text: 'git point-to', correct: false },
          { text: 'git move-pointer', correct: false },
        ],
        explanation: '`git update-ref <ref> <newvalue>` là lệnh plumbing chuyên dụng để sửa đổi giá trị tham chiếu một cách an toàn.',
      },
      {
        id: 'q4',
        question: 'Khi bạn chạy lệnh xóa nhánh `git branch -d feature`, điều gì thực sự diễn ra trên ổ cứng?',
        options: [
          { text: 'Git chỉ đơn giản là xóa tệp văn bản `.git/refs/heads/feature` khỏi đĩa', correct: true },
          { text: 'Git quét và xóa vĩnh viễn tất cả các commit mà nhánh đó từng tạo ra', correct: false },
          { text: 'Git gửi yêu cầu đóng tài khoản GitHub của bạn', correct: false },
          { text: 'Hệ điều hành format lại phân vùng ổ đĩa', correct: false },
        ],
        explanation: 'Xóa nhánh chỉ là xóa con trỏ; các đối tượng commit thực sự vẫn nằm an toàn trong cơ sở dữ liệu cho đến khi bị dọn rác (GC).',
      },
    ],
  },
  {
    id: '13-symbolic-refs-head',
    title: 'Con trỏ HEAD & Symbolic References trong .git/HEAD',
    duration: 30,
    xp: 90,
    prerequisites: ['12-references-and-heads'],
    keywords: ['HEAD pointer', 'symbolic ref', 'detached head', 'git symbolic-ref', 'active branch'],
    objectives: [
      'Nắm vững bản chất của con trỏ HEAD như chiếc la bàn chỉ định vị trí làm việc hiện tại của bạn trong Git.',
      'Hiểu rõ khái niệm Tham chiếu biểu tượng (Symbolic Reference): HEAD trỏ tới một nhánh chứ không trỏ thẳng vào commit.',
      'Giải mã tường tận hiện tượng Detached HEAD dưới góc nhìn nhị phân: khi HEAD trỏ trực tiếp vào commit SHA-1.',
    ],
    commands: ['cat .git/HEAD', 'git symbolic-ref HEAD', 'git checkout --detach HEAD'],
    definition:
      'HEAD là một con trỏ đặc biệt xác định vị trí hiện tại của không gian làm việc của bạn trong lịch sử Git. Trong trạng thái bình thường, HEAD là một Tham chiếu biểu tượng (Symbolic Reference) — nghĩa là nó không trỏ trực tiếp vào một mã băm commit, mà trỏ vào một con trỏ tham chiếu khác (thường là một nhánh, ví dụ: ref: refs/heads/main). Khi bạn thực hiện một commit mới, Git sẽ kiểm tra HEAD đang trỏ vào nhánh nào, và tự động cập nhật con trỏ nhánh đó tiến lên commit mới.',
    why:
      'Nhiều lập trình viên cảm thấy sợ hãi hiện tượng Detached HEAD (HEAD bị tách rời) vì không hiểu bản chất cấu trúc dữ liệu của nó. Dưới góc độ Git Internals, Detached HEAD đơn giản là khi tệp văn bản .git/HEAD chứa trực tiếp một chuỗi mã băm SHA-1 40 ký tự thay vì chứa dòng chữ `ref: refs/heads/branch_name`. Khi hiểu rõ điều này, bạn hoàn toàn có thể tự tin du hành thời gian và khám phá bất kỳ commit nào trong quá khứ mà không lo sợ làm hỏng kho lưu trữ của dự án.',
    mentalModel:
      'Hãy tưởng tượng con trỏ HEAD như chiếc biển tên "BẠN ĐANG Ở ĐÂY" (You are here) trên bản đồ trung tâm thương mại. Bình thường, chiếc biển tên này được móc vào một chiếc xe buýt đang di chuyển (nhánh main): xe buýt chạy đến đâu (commit mới), biển tên tự động đi theo đến đó. Nhưng khi bạn nhảy xuống xe buýt và đứng một mình giữa ngã tư đường (Detached HEAD), bạn vẫn đứng vững tại tọa độ đó, chỉ có điều chiếc xe buýt đã chạy đi mất và không ai tự động chở bạn đi tiếp.',
    diagram:
      'Hai trạng thái của con trỏ HEAD:\n1. Trạng thái bình thường (Symbolic Reference):\n   .git/HEAD ──► "ref: refs/heads/main" ──► .git/refs/heads/main ──► [Commit C3]\n   (Khi commit, nhánh main tự động tiến lên C4, HEAD tự động đi theo)\n\n2. Trạng thái Detached HEAD:\n   .git/HEAD ──► "7a8b9c4d3e2f" (Chứa trực tiếp Commit Hash C2)\n   (Không gắn vào nhánh nào, commit mới sẽ trở thành commit mồ côi nếu đổi nhánh)',
    example:
      'Một kỹ sư muốn kiểm tra một phiên bản cũ của ứng dụng để tìm nguyên nhân phát sinh lỗi. Kỹ sư chạy lệnh: `git checkout 9f8a7b6`. Terminal hiển thị một thông báo dài cảnh báo: "You are in \'detached HEAD\' state". Tò mò mở tệp `.git/HEAD` ra xem bằng lệnh cat, kỹ sư thấy nội dung tệp bây giờ chỉ là một dòng chữ duy nhất: `9f8a7b6c5d4e3f2a1b09876543210fedcba98765`. Kỹ sư nhận ra rằng từ "detached" ở đây có nghĩa là HEAD đã bị "tháo chốt" khỏi tệp tham chiếu nhánh trong thư mục refs/heads/. Khi kỹ sư gõ `git switch main`, tệp `.git/HEAD` lập tức đổi lại thành `ref: refs/heads/main` và mọi thứ trở lại trạng thái gắn kết bình thường.',
    commandSnippet: 'cat .git/HEAD\ngit symbolic-ref HEAD\ngit checkout --detach HEAD',
    commandExplanation:
      'Lệnh cat .git/HEAD in ra nội dung con trỏ hiện tại, git symbolic-ref HEAD trả về đường dẫn tham chiếu đầy đủ nếu HEAD đang gắn vào nhánh, và cờ --detach chủ động đưa HEAD về trạng thái tách rời để thực nghiệm.',
    mistakes: [
      'Thực hiện các commit quan trọng khi đang ở trạng thái Detached HEAD rồi chuyển nhánh khác: Các commit mới sẽ không có nhánh nào trỏ tới và dễ bị coi là commit mồ côi.',
      'Sử dụng trình soạn thảo sửa tệp .git/HEAD thành một đường dẫn nhánh không tồn tại khiến mọi lệnh Git bị tê liệt.',
      'Nghĩ rằng Detached HEAD là một lỗi phần mềm nghiêm trọng của Git (thực chất đó là tính năng có chủ đích để kiểm tra mã nguồn cũ).',
    ],
    labSteps: [
      'Xem nội dung tệp `.git/HEAD` khi đang ở trên nhánh chính.',
      'Sử dụng lệnh `git checkout --detach HEAD` để chủ động đưa repository vào trạng thái Detached HEAD.',
      'Xem lại nội dung `.git/HEAD` để xác nhận nó đã chuyển từ đường dẫn ref sang mã băm trực tiếp.',
      'Chuyển lại về nhánh chính bằng `git switch -` và quan sát tệp HEAD được phục hồi.',
    ],
    hint: 'Lệnh plumbing `git symbolic-ref HEAD` sẽ trả về lỗi exit code khác 0 nếu bạn đang ở trong trạng thái Detached HEAD.',
    validation: 'Giải thích được sự biến đổi nội dung của tệp `.git/HEAD` giữa hai trạng thái gắn nhánh và tách rời.',
    quizIntro: 'Cùng kiểm tra sự thấu hiểu của bạn về con trỏ HEAD và Symbolic References.',
    challenge:
      'Làm thế nào để tạo một con trỏ nhánh mới cứu hộ các commit vừa tạo trong trạng thái Detached HEAD trước khi bạn chuyển về nhánh main?',
    summary: [
      'HEAD là con trỏ chỉ định vị trí không gian làm việc hiện tại của bạn trong Git.',
      'Trạng thái bình thường: HEAD là Symbolic Ref trỏ tới một nhánh (`ref: refs/heads/main`).',
      'Trạng thái Detached HEAD: HEAD chứa trực tiếp mã băm 40 ký tự của một commit cụ thể.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Bản chất của tệp tin `.git/HEAD` trong trạng thái hoạt động bình thường là gì?',
        options: [
          { text: 'Một tham chiếu biểu tượng (Symbolic Reference) trỏ tới một tệp nhánh, ví dụ `ref: refs/heads/main`', correct: true },
          { text: 'Một tệp ảnh chụp toàn bộ khuôn mặt người dùng', correct: false },
          { text: 'Một chương trình thực thi nhị phân', correct: false },
          { text: 'Một cơ sở dữ liệu chứa toàn bộ commit', correct: false },
        ],
        explanation: 'HEAD đóng vai trò là con trỏ gián tiếp (Symbolic Ref), trỏ tới con trỏ nhánh đang hoạt động.',
      },
      {
        id: 'q2',
        question: 'Dưới góc nhìn Git Internals, trạng thái "Detached HEAD" thể hiện qua nội dung tệp .git/HEAD như thế nào?',
        options: [
          { text: 'Tệp .git/HEAD chứa trực tiếp chuỗi băm SHA-1 (40 ký tự) thay vì tiền tố ref: refs/heads/...', correct: true },
          { text: 'Tệp .git/HEAD hoàn toàn trống rỗng không có byte nào', correct: false },
          { text: 'Tệp .git/HEAD bị xóa khỏi ổ đĩa', correct: false },
          { text: 'Tệp .git/HEAD chứa đường dẫn URL tới GitHub', correct: false },
        ],
        explanation: 'Khi detached, Git ghi trực tiếp mã SHA-1 của commit vào .git/HEAD thay vì lưu dạng symbolic reference trỏ tới một nhánh.',
      },
      {
        id: 'q3',
        question: 'Lệnh Plumbing nào sau đây cho phép kiểm tra hoặc thiết lập an toàn một Symbolic Reference?',
        options: [
          { text: 'git symbolic-ref', correct: true },
          { text: 'git check-head', correct: false },
          { text: 'git ref-pointer', correct: false },
          { text: 'git link-branch', correct: false },
        ],
        explanation: '`git symbolic-ref` là lệnh plumbing chuẩn để đọc hoặc ghi các tham chiếu biểu tượng như HEAD.',
      },
      {
        id: 'q4',
        question: 'Nếu bạn vô tình tạo 3 commit mới khi đang ở trạng thái Detached HEAD, làm sao để giữ lại chúng an toàn?',
        options: [
          { text: 'Chạy lệnh `git branch <tên-nhánh-mới>` ngay tại vị trí hiện tại trước khi chuyển đi nơi khác', correct: true },
          { text: 'Khởi động lại máy tính', correct: false },
          { text: 'Xóa toàn bộ thư mục .git', correct: false },
          { text: 'Không thể cứu vãn được, chúng sẽ bị xóa ngay lập tức', correct: false },
        ],
        explanation: 'Tạo một nhánh mới trỏ vào commit hiện tại sẽ gắn một con trỏ tham chiếu vĩnh viễn vào chuỗi commit đó.',
      },
    ],
  },
  {
    id: '14-git-index-internals',
    title: 'Cấu trúc tệp nhị phân .git/index (Staging Area Internals)',
    duration: 35,
    xp: 95,
    prerequisites: ['13-symbolic-refs-head'],
    keywords: ['git index', 'staging area', 'binary index format', 'dircache', 'stat cache'],
    objectives: [
      'Giải phẫu cấu trúc nhị phân của tệp .git/index (DIRC - Directory Cache).',
      'Hiểu rõ các trường dữ liệu được lưu cho mỗi tệp: ctime, mtime, file size, permissions, SHA-1, và đường dẫn tệp.',
      'Sử dụng lệnh plumbing git ls-files --stage để xem bảng thông tin Staging Area nội bộ.',
    ],
    commands: ['git ls-files --stage', 'git status --porcelain=v2', 'git update-index'],
    definition:
      'Tệp .git/index là một tệp nhị phân phức tạp và có hiệu năng cao bậc nhất trong Git, đại diện cho Staging Area (hay còn gọi là Cache hoặc Dircache). Nó đóng vai trò là bản nháp trung gian chuẩn bị cho commit tiếp theo. Cấu trúc nhị phân của tệp index bắt đầu bằng 4 byte chữ ký "DIRC", phiên bản, số lượng mục (entries), và danh sách các tệp được theo dõi. Mỗi mục lưu giữ đầy đủ thông số tem thời gian của hệ điều hành (stat cache), quyền hạn tệp, mã băm SHA-1 của Blob tương ứng, số thứ tự phân đoạn (stage number dùng cho xử lý merge conflict), và đường dẫn tệp.',
    why:
      'Tại sao lệnh `git status` có thể quét hàng trăm nghìn tệp tin trong dự án lớn chỉ trong tích tắc nửa giây? Bí quyết nằm ở tệp `.git/index`. Bằng cách lưu lại thông số `mtime` (thời điểm chỉnh sửa tệp) và kích thước tệp trực tiếp từ hệ điều hành, Git chỉ cần gọi hàm hệ thống nhanh `stat()` để so sánh tem thời gian. Nếu tem thời gian không đổi, Git biết chắc 100% nội dung tệp chưa hề bị sửa mà không cần tốn công đọc nội dung tệp từ đĩa.',
    mentalModel:
      'Hãy tưởng tượng tệp `.git/index` như danh sách kiểm kê hàng hóa xuất kho của một nhân viên bưu điện. Trong danh sách có ghi rõ: Tên gói hàng (`path`), Trọng lượng và giờ niêm phong (`stat cache`), Mã vạch nhận diện kiện hàng (`blob hash`), và Cột đánh dấu kiểm định (`stage`). Nhân viên bưu điện chỉ cần nhìn lướt qua danh sách đối chiếu với các gói hàng trên bàn để biết gói nào đã bị bóc tem sửa đổi mà không cần mở từng hộp ra kiểm tra.',
    diagram:
      'Cấu trúc nhị phân của tệp .git/index:\n┌────────────────────────────────────────────────────────┐\n│ HEADER: "DIRC" (4 bytes) | Version (4B) | Entries (4B) │\n├────────────────────────────────────────────────────────┤\n│ ENTRY 1:                                               │\n│ • ctime / mtime (Tem thời gian hệ điều hành)          │\n│ • file size (Kích thước byte trên đĩa)                │\n│ • mode: 100644 (Quyền tệp tin)                         │\n│ • sha1: e69de29bb2d1 (Mã băm trỏ tới Blob)            │\n│ • stage: 0 (Normal) | 1 (Base) | 2 (Ours) | 3 (Theirs) │\n│ • path: "src/app.ts" (Đường dẫn tệp)                   │\n├────────────────────────────────────────────────────────┤\n│ ENTRY 2: [mode, sha1, path]                            │\n└────────────────────────────────────────────────────────┘',
    example:
      'Một kỹ sư muốn xem những gì thực sự đang nằm trong Staging Area sau khi gõ `git add`. Kỹ sư chạy lệnh plumbing: `git ls-files --stage`. Màn hình hiển thị danh sách chi tiết: `100644 e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 0 README.md` và `100644 3b18e512db79e4c8300de074a1e281301f6181f0 0 src/index.ts`. Kỹ sư nhận thấy số `0` ở giữa chính là stage number (biểu thị tệp ở trạng thái bình thường, không xung đột). Khi xảy ra xung đột merge conflict, lệnh này sẽ hiển thị 3 dòng cho cùng một tệp ứng với stage 1 (base), stage 2 (ours), và stage 3 (theirs). Hiểu được tệp index giúp kỹ sư giải quyết xung đột ở tầng bản chất nhất.',
    commandSnippet: 'git ls-files --stage\ngit status --porcelain=v2\ngit update-index',
    commandExplanation:
      'Lệnh git ls-files --stage in ra danh sách toàn bộ các mục trong index kèm theo mode, sha-1, stage number và path; git status --porcelain=v2 hiển thị trạng thái máy đọc; và git update-index cho phép thao tác trực tiếp với index.',
    mistakes: [
      'Nghĩ rằng Staging Area là một thư mục ảo chứa các bản sao tệp tin: Nó thực chất chỉ là một tệp nhị phân duy nhất `.git/index` chứa các con trỏ trỏ tới Blob.',
      'Không hiểu ý nghĩa của Stage Number (0, 1, 2, 3) dẫn đến lúng túng khi xử lý xung đột hợp nhất ở mức độ sâu.',
      'Sử dụng lệnh `git add` mà không nhận ra rằng nó đã âm thầm tạo Blob mới trong `.git/objects/` ngay tại thời điểm add.',
    ],
    labSteps: [
      'Thêm một tệp mới vào Staging Area bằng lệnh `git add`.',
      'Sử dụng lệnh plumbing `git ls-files --stage` để kiểm tra bảng dữ liệu nội bộ của Index.',
      'Quan sát 4 cột dữ liệu: File Mode, Blob SHA-1, Stage Number, và Đường dẫn tệp.',
    ],
    hint: 'Số `0` trong đầu ra của `git ls-files --stage` biểu thị tệp tin không có xung đột; trong khi các số 1, 2, 3 xuất hiện khi đang giải quyết merge conflict.',
    validation: 'Liệt kê và giải thích được ý nghĩa của 4 trường dữ liệu trong đầu ra của git ls-files --stage.',
    quizIntro: 'Cùng làm bài trắc nghiệm về kiến trúc nhị phân và hoạt động của tệp .git/index.',
    challenge:
      'Làm thế nào mà thông số stat cache bên trong tệp .git/index giúp Git tối ưu hóa tốc độ của lệnh git status khi làm việc với các kho mã nguồn khổng lồ như Linux Kernel?',
    summary: [
      'Tệp `.git/index` là tệp nhị phân Directory Cache đại diện cho Staging Area.',
      'Lưu trữ stat cache (mtime, size), quyền hạn tệp, mã băm Blob và stage number.',
      'Sử dụng `git ls-files --stage` để xem chi tiết các mục đang nằm trong Index.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Tệp tin nào trên ổ đĩa đại diện trực tiếp cho Staging Area trong kho lưu trữ Git?',
        options: [
          { text: '.git/index', correct: true },
          { text: '.git/staging/', correct: false },
          { text: '.git/cache/', correct: false },
          { text: '.git/stage.txt', correct: false },
        ],
        explanation: 'Staging Area không phải là một thư mục, mà là một tệp nhị phân duy nhất có tên `.git/index`.',
      },
      {
        id: 'q2',
        question: 'Lệnh Plumbing nào dùng để xem danh sách các tệp tin trong Index kèm mã mode, mã băm Blob và stage number?',
        options: [
          { text: 'git ls-files --stage', correct: true },
          { text: 'git show-index', correct: false },
          { text: 'git list-stage', correct: false },
          { text: 'git inspect-cache', correct: false },
        ],
        explanation: '`git ls-files --stage` (hoặc `-s`) hiển thị bảng chi tiết các bản ghi đang được lập chỉ mục trong Staging Area.',
      },
      {
        id: 'q3',
        question: 'Khi xảy ra xung đột merge conflict trên một tệp tin, stage number `2` trong index đại diện cho phiên bản nào?',
        options: [
          { text: 'Phiên bản của nhánh hiện tại của bạn (ours)', correct: true },
          { text: 'Phiên bản tổ tiên chung (base)', correct: false },
          { text: 'Phiên bản của nhánh đang được gộp vào (theirs)', correct: false },
          { text: 'Phiên bản đã giải quyết xong', correct: false },
        ],
        explanation: 'Trong quy ước 3-way merge của Git: stage 1 là base (tổ tiên chung), stage 2 là ours (nhánh ta), stage 3 là theirs (nhánh bạn).',
      },
      {
        id: 'q4',
        question: 'Bốn byte ký tự đầu tiên trong tiêu đề của tệp nhị phân `.git/index` là gì?',
        options: [
          { text: 'DIRC (Directory Cache)', correct: true },
          { text: 'GITI (Git Index)', correct: false },
          { text: 'BLOB', correct: false },
          { text: 'PACK', correct: false },
        ],
        explanation: 'Chữ ký nhị phân (magic signature) của tệp index trong mã nguồn Git là 4 ký tự ASCII "DIRC".',
      },
    ],
  },
  {
    id: '15-revision-syntax',
    title: 'Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2',
    duration: 35,
    xp: 95,
    prerequisites: ['14-git-index-internals'],
    keywords: ['revision syntax', 'tilde operator', 'caret operator', 'git rev-parse', 'dag navigation'],
    objectives: [
      'Phân biệt tuyệt đối và chính xác giữa hai toán tử điều hướng commit: dấu ngã (~) và dấu mũ (^).',
      'Hiểu quy tắc: HEAD~n là đi lùi n thế hệ tổ tiên theo nhánh chính; HEAD^n là chọn commit cha thứ n trong Merge Commit.',
      'Sử dụng lệnh plumbing git rev-parse để phân giải mọi cú pháp revision phức tạp thành mã băm SHA-1 duy nhất.',
    ],
    commands: ['git rev-parse HEAD~1', 'git rev-parse HEAD^2', 'git rev-parse main@{yesterday}'],
    definition:
      'Cú pháp Revision (Revision Syntax) là hệ thống ký hiệu điều hướng cho phép bạn tham chiếu tới bất kỳ commit nào trong lịch sử đồ thị DAG của Git mà không cần phải sao chép mã băm SHA-1. Hai toán tử then chốt và dễ gây nhầm lẫn nhất là Dấu ngã (Tilde ~) và Dấu mũ (Caret ^). Toán tử `HEAD~n` điều hướng lùi về n thế hệ theo tuyến tính tổ tiên cha đầu tiên; trong khi toán tử `HEAD^n` dùng để chọn người cha thứ n của một Merge Commit có nhiều nhánh hợp nhất.',
    why:
      'Nhầm lẫn giữa cú pháp `HEAD~2` và `HEAD^2` là một trong những sai lầm phổ biến và nguy hiểm nhất của các kỹ sư Git. Khi bạn muốn hoàn tác hai commit gần nhất bằng lệnh reset hay xem sự khác biệt bằng lệnh diff, nếu gõ nhầm toán tử trên một Merge Commit, bạn có thể vô tình nhảy sang một nhánh phụ hoàn toàn xa lạ thay vì đi ngược dòng lịch sử của nhánh chính, dẫn đến việc xóa nhầm dữ liệu hoặc hiểu sai biến động mã nguồn.',
    mentalModel:
      'Hãy tưởng tượng sơ đồ gia phả gia đình qua các thế hệ nối tiếp nhau: Dấu ngã (~) giống như việc đi ngược dòng thời gian về các đời trước trên nhánh phả hệ chính: `Tôi~1` là Bố tôi, `Tôi~2` là Ông nội tôi, `Tôi~3` là Cụ nội tôi (đi thẳng một mạch theo trục dọc thế hệ). Còn dấu mũ (^) xuất hiện khi một người có cả Bố và Mẹ hợp nhất (Merge Commit): `Tôi^1` là Bố tôi (người cha thứ nhất), và `Tôi^2` là Mẹ tôi (người cha thứ hai ở nhánh phụ).',
    diagram:
      'Sự khác biệt trực quan giữa ~ và ^ trên đồ thị Merge:\n          (Commit C1) ──► (Commit C2) ──┐ [Nhánh phụ được merge]\n                                         ▼\n(Commit A1) ──► (Commit A2) ──────────► [Commit M (Merge Commit)] ◄── HEAD\n\nTừ vị trí HEAD (Commit M):\n• HEAD~1 = A2   (Đi lùi 1 thế hệ theo nhánh chính)\n• HEAD~2 = A1   (Đi lùi 2 thế hệ theo nhánh chính)\n• HEAD^1 = A2   (Chọn cha thứ nhất: nhánh chính)\n• HEAD^2 = C2   (Chọn cha thứ hai: nhánh phụ vừa được merge vào!)\n• HEAD^2~1 = C1 (Đi sang cha thứ hai rồi lùi thêm 1 thế hệ!)',
    example:
      'Một kỹ sư muốn kiểm tra sự khác biệt giữa phiên bản hiện tại sau khi merge và mã nguồn của nhánh tính năng trước khi được gộp vào. Nếu kỹ sư gõ `git diff HEAD~1`, Git sẽ so sánh với commit cha trên nhánh main. Để so sánh chính xác với commit cuối cùng của nhánh tính năng được gộp vào, kỹ sư sử dụng toán tử dấu mũ: `git diff HEAD^2`. Lệnh git rev-parse HEAD^2 trả về chính xác mã băm của commit tính năng trên nhánh phụ. Sự hiểu biết chính xác về cú pháp revision giúp kỹ sư kiểm tra mã nguồn đa nhánh một cách chuẩn xác 100%.',
    commandSnippet: 'git rev-parse HEAD~1\ngit rev-parse HEAD^2\ngit rev-parse main@{yesterday}',
    commandExplanation:
      'Lệnh git rev-parse là công cụ nền tảng tiếp nhận bất kỳ chuỗi cú pháp revision nào (như HEAD~1, HEAD^2, hoặc nhãn thời gian reflog) và giải mã chính xác thành mã băm 40 ký tự SHA-1 duy nhất, hỗ trợ định vị các nút trên đồ thị commit một cách chuẩn xác.',
    mistakes: [
      'Nghĩ rằng `HEAD~2` và `HEAD^2` luôn luôn giống nhau: Chúng chỉ vô tình giống nhau khi commit đó là commit đơn tuyến tính không có merge commit.',
      'Gõ `HEAD^2` trên một commit thông thường chỉ có một commit cha duy nhất: Git sẽ báo lỗi "fatal: ambiguous argument: unknown revision" vì không tồn tại người cha thứ hai.',
      'Không biết cách kết hợp chuỗi toán tử như `HEAD~2^2` để định hướng sâu vào các đồ thị phức tạp.',
    ],
    labSteps: [
      'Tạo một lịch sử có rẽ nhánh và thực hiện merge để tạo ra một Merge Commit.',
      'Sử dụng `git rev-parse HEAD~1` và ghi lại mã băm trả về.',
      'Sử dụng `git rev-parse HEAD^2` và quan sát mã băm thuộc về nhánh phụ vừa được hợp nhất.',
      'Đối chiếu kết quả với sơ đồ đồ thị của `git log --graph --oneline`.',
    ],
    hint: 'Ghi nhớ câu thần chú: "Dấu ngã (~) là leo cây gia phả thế hệ lùi dần; Dấu mũ (^) là chọn nhánh rẽ của ngã ba hợp nhất".',
    validation: 'Phân giải chính xác mã băm của commit cha thứ nhất và commit cha thứ hai của một merge commit.',
    quizIntro: 'Hãy kiểm tra khả năng định vị đồ thị commit qua bài trắc nghiệm về cú pháp revision.',
    challenge:
      'Biểu thức revision `HEAD~3^2~1` có nghĩa là gì trên sơ đồ cây commit của Git?',
    summary: [
      'Toán tử `~n` (Tilde) đi lùi n thế hệ theo tuyến tính tổ tiên đầu tiên (nhánh chính).',
      'Toán tử `^n` (Caret) dùng để chọn người cha thứ n của một Merge Commit.',
      '`git rev-parse` là lệnh plumbing chuyển đổi mọi cú pháp biểu thức revision thành mã băm SHA-1.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Biểu thức `HEAD~3` tương đương với cách viết nào sau đây?',
        options: [
          { text: 'HEAD~~~ (đi lùi 3 thế hệ cha liên tiếp)', correct: true },
          { text: 'HEAD^^^3', correct: false },
          { text: 'HEAD trỏ vào nhánh số 3', correct: false },
          { text: 'HEAD nhân với 3', correct: false },
        ],
        explanation: 'Toán tử ngã `~3` là cách viết tắt của việc lặp lại 3 lần toán tử ngã đơn `~~~`, tương đương đi lùi 3 đời commit.',
      },
      {
        id: 'q2',
        question: 'Khi đứng tại một Merge Commit, biểu thức `HEAD^2` sẽ trỏ tới commit nào?',
        options: [
          { text: 'Commit cha thứ hai (commit đầu nhánh phụ được gộp vào)', correct: true },
          { text: 'Commit đi lùi 2 bước trên nhánh chính', correct: false },
          { text: 'Commit của 2 ngày trước', correct: false },
          { text: 'Commit của người review thứ 2', correct: false },
        ],
        explanation: 'Số đứng sau dấu mũ `^` chỉ định số thứ tự của commit cha trong danh sách parent của commit hiện tại.',
      },
      {
        id: 'q3',
        question: 'Lệnh Plumbing nào sau đây nhận vào một biểu thức revision và in ra mã băm SHA-1 tương ứng?',
        options: [
          { text: 'git rev-parse', correct: true },
          { text: 'git hash-parse', correct: false },
          { text: 'git eval-rev', correct: false },
          { text: 'git resolve-commit', correct: false },
        ],
        explanation: '`git rev-parse` là lệnh phân giải cú pháp tham chiếu cốt lõi được sử dụng rộng rãi trong các kịch bản tự động của Git.',
      },
      {
        id: 'q4',
        question: 'Nếu một commit là commit đơn bình thường (không phải merge commit), điều gì xảy ra nếu bạn gõ `git rev-parse HEAD^2`?',
        options: [
          { text: 'Báo lỗi vì commit đơn chỉ có duy nhất 1 cha (không có parent 2)', correct: true },
          { text: 'Tự động trỏ về Root commit', correct: false },
          { text: 'Tự động tạo ra một nhánh mới', correct: false },
          { text: 'In ra mã băm của chính nó', correct: false },
        ],
        explanation: 'Vì commit không phải là điểm hợp nhất nên chỉ sở hữu parent 1, yêu cầu truy cập parent 2 sẽ bị báo lỗi không tồn tại.',
      },
    ],
  },
];
