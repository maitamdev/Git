import { LessonAuthorData } from './types';

export const LEVEL_3_LESSONS: LessonAuthorData[] = [
  {
    id: '01-branch-concept',
    moduleId: '03-branching',
    title: 'Khái niệm Branch trong Git',
    duration: 25,
    xp: 80,
    keywords: ['branch', 'nhanh git', 'con tro commit', 'dag', 'phan nhanh'],
    prerequisites: ['06-git-commit'],
    objectives: [
      'Hiểu rõ bản chất kỹ thuật nhẹ nhàng của Branch trong Git như một con trỏ di động 41 byte.',
      'So sánh sự vượt trội của Git Branching so với các hệ thống quản lý phiên bản truyền thống.',
      'Nắm bắt vòng đời của nhánh từ khi tạo mới, phân kỳ, tới khi hợp nhất vào nhánh chính.',
      'Giải thích được cấu trúc đồ thị luồng phát triển song song trong thực tế.',
    ],
    definition:
      'Branch (Nhánh) trong Git về bản chất kỹ thuật là một con trỏ có thể di chuyển (movable pointer), trỏ trực tiếp tới một commit snapshot cụ thể trong đồ thị Directed Acyclic Graph (DAG). Khác với các hệ thống VCS tập trung cũ vốn sao chép toàn bộ thư mục tệp tin rất nặng nề và chậm chạp, một nhánh trong Git chỉ là một tệp văn bản nhỏ gọn 41 byte chứa đúng chuỗi mã băm SHA-1 của commit đỉnh. Khi bạn tạo commit mới trên nhánh đó, con trỏ nhánh sẽ tự động tiến về phía trước để trỏ vào commit mới nhất.',
    why:
      'Trong quy trình phát triển phần mềm hiện đại, nhiều lập trình viên phải cùng nhau xây dựng các tính năng độc lập, sửa lỗi khẩn cấp hoặc thử nghiệm ý tưởng mới mà không được làm gián đoạn mã nguồn đang chạy trên môi trường production. Branch cung cấp không gian làm việc hoàn toàn cách ly: bạn có thể thoải mái sửa đổi, thử nghiệm và xóa bỏ mà không ảnh hưởng tới đồng nghiệp. Tạo nhánh trong Git chỉ mất vài phần nghìn giây, giúp bạn tự tin chia nhỏ dự án thành các luồng phát triển an toàn.',
    mentalModel:
      'Hãy hình dung lịch sử dự án như một thân cây cổ thụ vững chắc mọc thẳng lên trời. Mỗi khi bạn muốn phát triển một tính năng mới, bạn cho thân cây mọc ra một cành cây nhỏ rẽ sang một bên. Bạn có thể trèo lên cành cây đó để hái quả, tỉa lá hoặc trang trí đèn mà không làm lung lay thân cây chính. Nếu cành cây phát triển xanh tốt và đơm hoa kết trái ngọt ngào, bạn sẽ ghép cành đó trở lại thân cây chính. Còn nếu cành cây bị sâu bệnh hỏng hóc, bạn chỉ việc cắt bỏ cành đó đi mà thân cây vẫn sừng sững an toàn.',
    diagram: `Cơ chế con trỏ nhánh trong đồ thị commit:
Commit C1 ◄── Commit C2 ◄── Commit C3 (main)
                              ▲
                              └── Commit C4 (feature-login)`,
    example:
      'Một công ty phần mềm đang vận hành trang thương mại điện tử với nhánh main chứa phiên bản ổn định cho khách hàng mua sắm. Khi được giao nhiệm vụ tích hợp cổng thanh toán mới, lập trình viên Minh tạo ngay một nhánh riêng biệt mang tên feature-payment tách ra từ main. Suốt hai tuần làm việc, Minh tạo hàng chục commit thử nghiệm trên nhánh feature-payment. Trong thời gian đó, các đồng nghiệp khác vẫn sửa lỗi giao diện và cập nhật giá sản phẩm trên nhánh main mà hai bên hoàn toàn không hề giẫm chân lên nhau.',
    commands: [
      'git branch',
      'git branch <tên-nhánh>',
      'git branch -v',
      'git branch -d <tên-nhánh>',
    ],
    explanation:
      '- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ và đánh dấu nhánh hiện tại bằng dấu sao màu xanh.\n- `git branch <tên-nhánh>`: Tạo một con trỏ nhánh mới trỏ vào commit hiện tại mà không tự động chuyển sang nhánh đó.\n- `git branch -v`: Hiển thị danh sách các nhánh kèm mã hash commit và tiêu đề commit mới nhất của từng nhánh.\n- `git branch -d <tên-nhánh>`: Xóa nhánh đã được hợp nhất an toàn khỏi kho lưu trữ cục bộ.',
    mistakes: [
      'Nghĩ tạo nhánh là copy toàn bộ mã nguồn: Git chỉ tạo một con trỏ 41 byte, thao tác gần như tức thì và tốn cực ít dung lượng.',
      'Code trực tiếp mọi thứ trên nhánh main: Thói quen nguy hiểm làm mất tính ổn định của mã nguồn đưa lên production.',
      'Đặt tên nhánh mơ hồ: Đặt tên như test, abc khiến đồng nghiệp không thể biết mục đích của nhánh đó là gì.',
    ],
    labSteps: [
      'Chạy lệnh `git branch` để xem nhánh mặc định hiện tại.',
      'Tạo nhánh mới bằng lệnh `git branch feature-cart`.',
      'Chạy `git branch -v` để thấy cả hai nhánh cùng trỏ vào một commit hash.',
      'Quan sát dấu sao định vị nhánh làm việc hiện tại.',
    ],
    hint: 'Nhánh chỉ là một con trỏ nhẹ; hãy tạo nhánh tự do cho từng tính năng.',
    validation: 'Kiểm tra `git branch` liệt kê đầy đủ nhánh vừa tạo.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và bản chất của Branch.',
    challenge: 'Mở tệp `.git/refs/heads/main` bằng lệnh `cat` để tự mình nhìn thấy chuỗi hash 40 ký tự bên trong.',
    summary: [
      'Branch trong Git là con trỏ di động trỏ vào commit đỉnh của một luồng lịch sử.',
      'Tạo nhánh cực nhanh và tốn rất ít tài nguyên vì chỉ sinh ra một tệp 41 byte.',
      'Luôn chia nhỏ công việc thành các nhánh tính năng để bảo vệ sự ổn định của nhánh chính.',
    ],
    quiz: {
      id: 'quiz-03-01-branch-concept',
      title: 'Trắc nghiệm: Bản chất của Branch trong Git',
      questions: [
        {
          id: 'q1',
          question: 'Về mặt bản chất kỹ thuật lưu trữ bên trong Git, một Branch thực chất là gì?',
          type: 'single',
          options: [
            { text: 'Một con trỏ di động 41 byte trỏ trực tiếp vào một commit snapshot cụ thể', correct: true },
            { text: 'Một bản sao chép đầy đủ toàn bộ thư mục mã nguồn sang ổ đĩa khác', correct: false },
            { text: 'Một tệp tin nén zip chứa lịch sử của tháng trước', correct: false },
            { text: 'Một tài khoản người dùng độc lập trên máy chủ GitHub', correct: false },
          ],
          explanation:
            'Git Branch chỉ là một con trỏ lưu trong tệp văn bản 41 byte tại .git/refs/heads/<tên-nhánh>.',
        },
        {
          id: 'q2',
          question: 'Lệnh nào dưới đây chỉ tạo một nhánh mới mà KHÔNG chuyển sang nhánh đó ngay lập tức?',
          type: 'single',
          options: [
            { text: 'git branch <tên-nhánh>', correct: true },
            { text: 'git switch -c <tên-nhánh>', correct: false },
            { text: 'git checkout -b <tên-nhánh>', correct: false },
            { text: 'git jump <tên-nhánh>', correct: false },
          ],
          explanation:
            '`git branch <name>` tạo con trỏ nhánh mới; để vừa tạo vừa chuyển sang nhánh mới phải dùng `switch -c` hoặc `checkout -b`.',
        },
        {
          id: 'q3',
          question: 'Tại sao việc tạo nhánh trong Git lại nhanh hơn gấp nhiều lần so với các hệ thống VCS tập trung như SVN?',
          type: 'single',
          options: [
            { text: 'Vì Git chỉ ghi 40 ký tự hash vào một tệp nhỏ thay vì sao chép toàn bộ cây mã nguồn', correct: true },
            { text: 'Vì Git sử dụng trí tuệ nhân tạo để đoán trước tương lai của dự án', correct: false },
            { text: 'Vì Git bắt buộc máy tính phải có card đồ họa chuyên dụng cao cấp', correct: false },
            { text: 'Vì Git bỏ qua hoàn toàn các bài kiểm tra an toàn dữ liệu', correct: false },
          ],
          explanation:
            'Tạo branch trong Git chỉ mất thao tác ghi 41 byte vào đĩa, bất kể dự án nặng hàng gigabyte.',
        },
        {
          id: 'q4',
          question: 'Ký tự nào đứng trước tên nhánh trong kết quả lệnh `git branch` để chỉ ra nhánh hiện tại?',
          type: 'single',
          options: [
            { text: 'Dấu sao (*)', correct: true },
            { text: 'Dấu thăng (#)', correct: false },
            { text: 'Dấu chấm than (!)', correct: false },
            { text: 'Dấu ngã (~)', correct: false },
          ],
          explanation:
            'Dấu sao `*` màu xanh lục đánh dấu nhánh mà con trỏ HEAD đang gắn vào.',
        },
        {
          id: 'q5',
          question: 'Tên quy ước chuẩn quốc tế phổ biến cho nhánh chứa mã nguồn sẵn sàng đưa vào vận hành thực tế là gì?',
          type: 'single',
          options: [
            { text: 'main (hoặc master trong các dự án cũ)', correct: true },
            { text: 'draft-temp', correct: false },
            { text: 'scratchpad', correct: false },
            { text: 'junk-box', correct: false },
          ],
          explanation:
            '`main` là tên nhánh chính mặc định hiện đại theo chuẩn quốc tế của Git và GitHub.',
        },
        {
          id: 'q6',
          question: 'Khi bạn tạo một commit mới trên nhánh hiện tại, điều gì sẽ xảy ra với con trỏ của nhánh đó?',
          type: 'single',
          options: [
            { text: 'Con trỏ nhánh tự động di chuyển tiến lên chỉ vào commit snapshot mới vừa tạo', correct: true },
            { text: 'Con trỏ nhánh đứng yên ở vị trí commit ban đầu', correct: false },
            { text: 'Con trỏ nhánh bị xóa bỏ và bạn phải gõ lệnh tạo lại', correct: false },
            { text: 'Con trỏ nhánh sẽ nhảy lùi về commit đầu tiên của dự án', correct: false },
          ],
          explanation:
            'Mỗi khi commit sinh ra, con trỏ nhánh hiện tại tự động cập nhật mã hash của commit mới đó.',
        },
      ],
    },
  },
  {
    id: '02-head-pointer',
    moduleId: '03-branching',
    title: 'Con trỏ HEAD & Detached HEAD',
    duration: 25,
    xp: 80,
    keywords: ['head', 'detached head', 'con tro head', 'checkout commit', 'symbolic ref'],
    prerequisites: ['01-branch-concept'],
    objectives: [
      'Hiểu rõ cơ chế hoạt động của Symbolic Reference HEAD trong việc định vị không gian làm việc.',
      'Giải thích hiện tượng Detached HEAD state và nguyên nhân kích hoạt trạng thái này.',
      'Biết cách thoát khỏi Detached HEAD an toàn mà không làm thất lạc các commit thử nghiệm.',
      'Sử dụng lệnh git checkout hoặc git switch để điều hướng con trỏ HEAD chính xác.',
    ],
    definition:
      'HEAD trong Git là một con trỏ đặc biệt (symbolic reference) chỉ định vị trí làm việc hiện tại của Working Tree trong đồ thị lịch sử. Trong điều kiện bình thường, HEAD không trỏ trực tiếp vào commit mà trỏ gián tiếp thông qua một con trỏ nhánh (ví dụ: `HEAD -> refs/heads/main`). Tuy nhiên, khi bạn checkout trực tiếp tới một mã băm commit cụ thể thay vì một nhánh, Git sẽ rơi vào trạng thái Detached HEAD: lúc này HEAD trỏ thẳng vào commit đó mà không có bất kỳ con trỏ nhánh nào đi kèm.',
    why:
      'Trạng thái Detached HEAD là một trong những khái niệm khiến người mới học bối rối và hoảng loạn nhất khi terminal cảnh báo dữ liệu có thể bị mất. Hiểu rõ bản chất của HEAD giúp bạn tự tin quay ngược thời gian để kiểm tra lại một phiên bản cũ của ứng dụng, chạy thử nghiệm các đoạn code lịch sử, hoặc gỡ lỗi sự cố mà không sợ làm hỏng nhánh chính. Bạn cũng sẽ biết cách tạo nhánh mới để giữ lại các commit quý giá sinh ra trong trạng thái này.',
    mentalModel:
      'Hãy hình dung con trỏ HEAD giống như chiếc kim đọc đĩa trên một đầu phát đĩa than cổ điển, hoặc mắt đọc laser của đầu đĩa DVD. Đĩa than chứa nhiều rãnh nhạc khác nhau (các nhánh). Chiếc kim đọc đĩa (HEAD) đặt vào rãnh nhạc nào thì loa sẽ phát ra giai điệu của bài hát đó (Working Tree hiển thị code của nhánh đó). Khi bạn nhấc chiếc kim đọc đĩa ra và đặt tự do vào chính giữa đĩa ở một bài hát cũ (Detached HEAD), bạn vẫn nghe được nhạc, nhưng nếu bạn muốn ghi âm bài mới thì bạn cần cắm một chiếc cờ đánh dấu rãnh mới.',
    diagram: `HEAD bình thường vs Detached HEAD:
Trạng thái bình thường:        Trạng thái Detached HEAD:
HEAD ──► main ──► Commit C3    HEAD ──────────► Commit C2
                               main ──────────► Commit C3`,
    example:
      'Một kỹ sư phần mềm muốn kiểm tra xem lỗi mất kết nối cơ sở dữ liệu đã từng xuất hiện ở bản phát hành v1.2 cách đây ba tháng hay chưa. Kỹ sư gõ lệnh `git checkout a4f91b2` để đưa HEAD về đúng commit của bản phát hành đó. Terminal hiển thị cảnh báo You are in detached HEAD state. Kỹ sư chạy thử ứng dụng và phát hiện lỗi chưa có ở thời điểm này. Sau khi xác minh xong, kỹ sư chỉ việc gõ `git switch main` để đưa HEAD quay trở lại đỉnh nhánh chính một cách an toàn và nhẹ nhàng.',
    commands: [
      'git status',
      'git checkout <commit-hash>',
      'git switch <tên-nhánh>',
      'git switch -c <nhánh-mới>',
    ],
    explanation:
      '- `git status`: Hiển thị rõ ràng HEAD đang gắn với nhánh nào hoặc đang ở trạng thái Detached HEAD tại commit nào.\n- `git checkout <commit-hash>`: Di chuyển trực tiếp con trỏ HEAD tới một commit trong quá khứ, kích hoạt trạng thái Detached HEAD.\n- `git switch <tên-nhánh>`: Đưa con trỏ HEAD gắn trở lại vào một nhánh an toàn, thoát khỏi Detached HEAD.\n- `git switch -c <nhánh-mới>`: Tạo nhánh mới ngay tại vị trí commit hiện tại để giữ lại các commit thử nghiệm.',
    mistakes: [
      'Hoảng sợ khi thấy thông báo Detached HEAD: Đây là tính năng xem lại quá khứ hoàn toàn bình thường của Git chứ không phải lỗi hỏng kho chứa.',
      'Commit nhiều việc trên Detached HEAD rồi chuyển nhánh mà không tạo branch: Các commit đó sẽ trở thành commit mồ côi (dangling commits) và có thể bị dọn rác sau này.',
      'Dùng git checkout nhầm lẫn giữa tệp và nhánh: Nên dùng `git switch` để chuyển nhánh và `git restore` để phục hồi tệp.',
    ],
    labSteps: [
      'Xem mã hash của commit trước đó bằng `git log --oneline`.',
      'Thực hiện checkout về commit cũ đó để trải nghiệm trạng thái Detached HEAD.',
      'Chạy `git status` để quan sát thông điệp cảnh báo hữu ích của Git.',
      'Chạy lệnh `git switch main` để quay trở lại nhánh chính an toàn.',
    ],
    hint: 'Nhớ nguyên tắc: Nếu tạo commit trong Detached HEAD, hãy dùng `git switch -c <tên>` để giữ lại.',
    validation: 'Đưa HEAD quay trở lại an toàn trên nhánh chính và kiểm tra `git status`.',
    quizPrompt: 'Làm bài trắc nghiệm dưới đây về con trỏ HEAD và trạng thái Detached HEAD.',
    challenge: 'Mở tệp `.git/HEAD` bằng lệnh `cat` trong hai trường hợp: bình thường và detached HEAD để so sánh nội dung.',
    summary: [
      'HEAD là con trỏ chỉ vị trí làm việc hiện tại của Working Tree trong đồ thị Git.',
      'Detached HEAD xảy ra khi HEAD trỏ trực tiếp vào commit thay vì qua một nhánh.',
      'Thoát khỏi Detached HEAD bằng lệnh `git switch <nhánh>` hoặc tạo nhánh mới với `git switch -c`.',
    ],
    quiz: {
      id: 'quiz-03-02-head-pointer',
      title: 'Trắc nghiệm: Con trỏ HEAD và Detached HEAD',
      questions: [
        {
          id: 'q1',
          question: 'Trong trạng thái làm việc bình thường, tệp tin `.git/HEAD` chứa thông tin gì?',
          type: 'single',
          options: [
            { text: 'Đường dẫn tham chiếu tượng trưng tới nhánh hiện tại (ví dụ: ref: refs/heads/main)', correct: true },
            { text: 'Mật khẩu mã hóa của toàn bộ kho lưu trữ Git', correct: false },
            { text: 'Danh sách các lập trình viên bị cấm truy cập dự án', correct: false },
            { text: 'Toàn bộ mã nguồn của trang chủ website', correct: false },
          ],
          explanation:
            'Tệp .git/HEAD chứa dòng `ref: refs/heads/<nhánh>` chỉ định nhánh hiện tại đang được kích hoạt.',
        },
        {
          id: 'q2',
          question: 'Hiện tượng "Detached HEAD" xảy ra khi nào?',
          type: 'single',
          options: [
            { text: 'Khi con trỏ HEAD trỏ trực tiếp vào một mã băm commit cụ thể thay vì trỏ vào một nhánh', correct: true },
            { text: 'Khi máy tính bị mất kết nối mạng cáp quang quốc tế', correct: false },
            { text: 'Khi ổ cứng máy tính bị đầy dung lượng không thể ghi thêm', correct: false },
            { text: 'Khi bạn gõ sai mật khẩu đăng nhập vào máy tính', correct: false },
          ],
          explanation:
            'Detached HEAD xuất hiện khi bạn checkout trực tiếp tới một commit hoặc tag thay vì một branch.',
        },
        {
          id: 'q3',
          question: 'Nếu bạn lỡ tạo một số commit quan trọng trong trạng thái Detached HEAD, làm thế nào để lưu giữ chúng an toàn?',
          type: 'single',
          options: [
            { text: 'Chạy lệnh `git switch -c <tên-nhánh-mới>` để tạo ngay một nhánh mới giữ lấy commit đó', correct: true },
            { text: 'Tắt máy tính và khởi động lại ngay lập tức', correct: false },
            { text: 'Xóa toàn bộ thư mục dự án và tải lại từ đầu', correct: false },
            { text: 'Bấm tổ hợp phím Ctrl + Z trên bàn phím mười lần', correct: false },
          ],
          explanation:
            '`git switch -c <name>` gắn một con trỏ nhánh mới vào commit hiện tại, cứu commit không bị mồ côi.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào là cách hiện đại và an toàn nhất để đưa HEAD thoát khỏi Detached HEAD quay về nhánh main?',
          type: 'single',
          options: [
            { text: 'git switch main', correct: true },
            { text: 'git delete head', correct: false },
            { text: 'git reset --everything', correct: false },
            { text: 'git close-all', correct: false },
          ],
          explanation:
            '`git switch main` là câu lệnh hiện đại (từ Git 2.23) chuyên trách chuyển về nhánh chỉ định.',
        },
      ],
    },
  },
  {
    id: '03-git-branch',
    moduleId: '03-branching',
    title: 'Quản lý nhánh với git branch',
    duration: 25,
    xp: 80,
    keywords: ['git branch', 'quan ly nhanh', 'xoa nhanh', 'danh sach nhanh', 'branch list'],
    prerequisites: ['01-branch-concept'],
    objectives: [
      'Sử dụng thành thạo câu lệnh `git branch` cùng các cờ tùy chọn nâng cao: `-a`, `-r`, `-vv`, `--merged`.',
      'Xóa nhánh an toàn với cờ `-d` và xóa nhánh cưỡng chế với cờ `-D`.',
      'Đổi tên nhánh cục bộ nhanh chóng bằng cờ `-m`.',
      'Kiểm soát và dọn dẹp các nhánh đã hợp nhất để giữ kho lưu trữ luôn tinh gọn.',
    ],
    definition:
      '`git branch` là câu lệnh quản trị đa năng phục vụ việc tạo mới, liệt kê danh sách, đổi tên, kiểm tra trạng thái và xóa bỏ các nhánh trong kho lưu trữ Git cục bộ. Khi chạy không kèm đối số, lệnh hiển thị toàn bộ các nhánh cục bộ hiện hữu trên máy tính của bạn. Khi kết hợp với các cờ tùy chọn chuyên dụng, `git branch` trở thành công cụ đắc lực giúp bạn duy trì một cấu trúc kho chứa sạch sẽ và chuyên nghiệp.',
    why:
      'Trong các dự án quy mô lớn, mỗi tuần có thể có hàng chục nhánh tính năng và nhánh sửa lỗi được tạo ra. Nếu không biết cách quản lý và dọn dẹp thường xuyên, danh sách nhánh của bạn sẽ phình to thành hàng trăm mục rác, gây khó khăn cho việc định vị nhánh cần làm và tăng nguy cơ thao tác nhầm lẫn. Nắm vững lệnh `git branch` giúp bạn làm chủ quy trình kiểm soát phiên bản và tự tin phối hợp nhóm trơn tru.',
    mentalModel:
      'Hãy hình dung `git branch` giống như cuốn sổ danh bạ quản lý các đường dây điện thoại nội bộ trong một tòa nhà văn phòng hiện đại. Người quản trị mạng điện thoại có thể mở danh bạ ra xem phòng ban nào đang có máy nhánh (liệt kê), đăng ký thêm một số máy nội bộ mới cho nhân viên mới vào (tạo nhánh), đổi tên phòng ban khi tái cơ cấu (đổi tên nhánh), và cắt bỏ đường dây của các dự án đã kết thúc (xóa nhánh).',
    diagram: `Quản lý vòng đời nhánh với git branch:
Tạo nhánh:       git branch feature-auth
Xem danh sách:   git branch -vv
Đổi tên nhánh:   git branch -m old-name new-name
Xóa an toàn:     git branch -d feature-auth (chỉ xóa khi đã merge)
Xóa cưỡng chế:   git branch -D feature-auth (xóa bất kể chưa merge)`,
    example:
      'Sau khi tính năng giỏ hàng đã được gộp thành công vào nhánh main và đưa lên máy chủ kiểm thử, kỹ sư Nam muốn dọn dẹp máy tính cá nhân để chuẩn bị không gian làm việc cho sprint tiếp theo. Nam chạy lệnh `git branch --merged` để kiểm tra danh sách toàn bộ các nhánh đã được tích hợp trọn vẹn vào main. Thấy nhánh feature-cart xuất hiện trong danh sách an toàn, Nam tự tin gõ lệnh: `git branch -d feature-cart`. Git lập tức thông báo xóa thành công con trỏ nhánh, giúp danh sách nhánh cục bộ của Nam luôn gọn gàng, tinh tươm và không để lại bất kỳ dữ liệu rác thừa nào gây nhầm lẫn khi làm việc.',
    commands: [
      'git branch',
      'git branch -a',
      'git branch -vv',
      'git branch -m <tên-cũ> <tên-mới>',
      'git branch -d <tên-nhánh>',
      'git branch -D <tên-nhánh>',
    ],
    explanation:
      '- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ.\n- `git branch -a`: Liệt kê tất cả các nhánh bao gồm cả nhánh cục bộ và nhánh theo dõi từ xa (remote-tracking branches).\n- `git branch -vv`: Hiển thị chi tiết commit đỉnh, thông điệp commit và mối quan hệ đồng bộ với nhánh remote upstream.\n- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên nhánh chỉ định sang tên mới chuẩn mực.\n- `git branch -d <nhánh>`: Xóa nhánh có kiểm tra an toàn (từ chối xóa nếu nhánh chứa commit chưa được merge).\n- `git branch -D <nhánh>`: Xóa nhánh cưỡng chế (tương đương `--delete --force`), bỏ qua kiểm tra an toàn.',
    mistakes: [
      'Cố gắng xóa nhánh mà mình đang đứng trực tiếp: Git sẽ báo lỗi từ chối; bạn phải switch sang nhánh khác (như main) trước khi xóa.',
      'Dùng cờ -D bừa bãi: Vô tình xóa mất nhánh chứa các dòng code chưa kịp merge mà không hay biết.',
      'Quên dọn dẹp nhánh sau khi đã merge: Khiến danh sách nhánh tích tụ hàng trăm mục cũ gây rối mắt.',
    ],
    labSteps: [
      'Tạo một nhánh thử nghiệm bằng lệnh `git branch temp-test`.',
      'Đổi tên nhánh vừa tạo thành `experiment` bằng lệnh `git branch -m temp-test experiment`.',
      'Chạy `git branch` để xác nhận tên mới xuất hiện trong danh sách.',
      'Xóa nhánh đó an toàn bằng câu lệnh `git branch -d experiment`.',
    ],
    hint: 'Hãy đứng ở nhánh `main` khi bạn muốn xóa các nhánh tính năng phụ.',
    validation: 'Xác nhận nhánh thử nghiệm đã được dọn dẹp sạch sẽ khỏi kết quả `git branch`.',
    quizPrompt: 'Hãy hoàn thành bài trắc nghiệm dưới đây về các thao tác quản lý nhánh với git branch.',
    challenge: 'Tìm hiểu cách sử dụng lệnh `git branch --merged` và `git branch --no-merged` để tự động hóa dọn dẹp kho chứa.',
    summary: [
      '`git branch` là lệnh cốt lõi để tạo, xem, đổi tên và xóa các nhánh cục bộ.',
      'Dùng `-d` để xóa an toàn sau khi đã merge, dùng `-D` để xóa cưỡng chế khi muốn vứt bỏ code nháp.',
      'Không thể xóa nhánh mà bạn hiện đang đứng làm việc trực tiếp.',
    ],
    quiz: {
      id: 'quiz-03-03-git-branch',
      title: 'Trắc nghiệm: Quản lý nhánh với git branch',
      questions: [
        {
          id: 'q1',
          question: 'Điều gì sẽ xảy ra nếu bạn cố gắng chạy lệnh `git branch -d feature` khi bạn đang đứng trực tiếp trên nhánh `feature`?',
          type: 'single',
          options: [
            { text: 'Git sẽ báo lỗi từ chối xóa vì không thể xóa nhánh mà con trỏ HEAD đang đứng trực tiếp', correct: true },
            { text: 'Git sẽ tự động xóa nhánh và thoát khỏi terminal ngay lập tức', correct: false },
            { text: 'Git sẽ tự động chuyển bạn về nhánh main rồi mới xóa', correct: false },
            { text: 'Git sẽ xóa toàn bộ ổ cứng máy tính để làm sạch', correct: false },
          ],
          explanation:
            'Bạn không thể xóa nhánh hiện tại; bạn phải chuyển sang nhánh khác (ví dụ: git switch main) rồi mới xóa.',
        },
        {
          id: 'q2',
          question: 'Sự khác biệt cốt lõi giữa hai cờ xóa nhánh `git branch -d` và `git branch -D` là gì?',
          type: 'single',
          options: [
            { text: '`-d` có cơ chế bảo vệ an toàn (chỉ xóa khi đã merge), còn `-D` cưỡng chế xóa bất kể code chưa được merge', correct: true },
            { text: '`-d` dùng cho hệ điều hành Windows, `-D` dùng cho hệ điều hành macOS', correct: false },
            { text: '`-d` chỉ xóa trên máy tính cá nhân, `-D` xóa luôn cả máy chủ GitHub', correct: false },
            { text: 'Hai cờ này hoàn toàn giống nhau 100% không có khác biệt nào', correct: false },
          ],
          explanation:
            '`-D` là viết tắt của `--delete --force`, ép buộc xóa bỏ nhánh ngay cả khi có commit chưa hợp nhất.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây dùng để đổi tên nhánh hiện tại bạn đang đứng thành tên mới `feature-auth`?',
          type: 'single',
          options: [
            { text: 'git branch -m feature-auth', correct: true },
            { text: 'git branch --rename feature-auth', correct: false },
            { text: 'git name-change feature-auth', correct: false },
            { text: 'git update-title feature-auth', correct: false },
          ],
          explanation:
            'Cờ `-m` (viết tắt của move/rename) đổi tên nhánh; nếu không truyền tên cũ thì đổi tên nhánh hiện tại.',
        },
        {
          id: 'q4',
          question: 'Cờ tùy chọn nào của lệnh git branch giúp hiển thị tất cả các nhánh bao gồm cả nhánh từ xa trên GitHub?',
          type: 'single',
          options: [
            { text: '-a (hoặc --all)', correct: true },
            { text: '-r-only', correct: false },
            { text: '--global-branch', correct: false },
            { text: '-f (full)', correct: false },
          ],
          explanation:
            '`git branch -a` liệt kê toàn bộ nhánh cục bộ và nhánh theo dõi từ xa (dạng remotes/origin/main).',
        },
        {
          id: 'q5',
          question: 'Để lọc ra danh sách các nhánh tính năng đã được hợp nhất an toàn vào nhánh hiện tại, bạn dùng cờ nào?',
          type: 'single',
          options: [
            { text: '--merged', correct: true },
            { text: '--done', correct: false },
            { text: '--finished', correct: false },
            { text: '--safe-delete', correct: false },
          ],
          explanation:
            '`git branch --merged` chỉ liệt kê các nhánh mà toàn bộ commit đã nằm trong nhánh hiện tại.',
        },
        {
          id: 'q6',
          question: 'Khi bạn chạy lệnh `git branch -vv`, thông tin bổ sung quan trọng nào được hiển thị?',
          type: 'single',
          options: [
            { text: 'Mã commit đỉnh, thông điệp commit và trạng thái so sánh đi trước/sau với nhánh remote tracking', correct: true },
            { text: 'Địa chỉ nhà riêng và số tài khoản ngân hàng của tác giả', correct: false },
            { text: 'Dung lượng RAM đang tiêu tốn của hệ điều hành', correct: false },
            { text: 'Tốc độ quay của quạt tản nhiệt máy tính', correct: false },
          ],
          explanation:
            '`-vv` (very verbose) hiển thị chi tiết commit hash, subject và tracking branch kèm trạng thái ahead/behind.',
        },
      ],
    },
  },
  {
    id: '04-git-switch',
    moduleId: '03-branching',
    title: 'Chuyển nhánh với git switch',
    duration: 25,
    xp: 80,
    keywords: ['git switch', 'chuyen nhanh', 'switch branch', 'tao nhanh moi', 'working tree update'],
    prerequisites: ['03-git-branch'],
    objectives: [
      'Nắm vững câu lệnh chuyên trách hiện đại `git switch` được giới thiệu từ Git 2.23.',
      'Sử dụng thành thạo phím tắt vừa tạo vừa chuyển nhánh: `git switch -c <tên-nhánh>`.',
      'Hiểu cách Git cập nhật Working Directory khi bạn chuyển dịch qua lại giữa các nhánh.',
      'Xử lý tình huống không chuyển được nhánh do có thay đổi cục bộ chưa commit.',
    ],
    definition:
      '`git switch` là câu lệnh chuyên trách hiện đại được bổ sung vào bộ công cụ Git từ phiên bản 2.23, với mục tiêu duy nhất và rõ ràng là chuyển đổi không gian làm việc giữa các nhánh khác nhau trong kho lưu trữ. Khi bạn thực hiện lệnh switch, Git sẽ dịch chuyển con trỏ HEAD gắn vào nhánh đích và đồng thời cập nhật toàn bộ các tệp tin trong Working Directory sao cho khớp 100% với snapshot commit đỉnh của nhánh mới đó.',
    why:
      'Trước khi `git switch` ra đời, cộng đồng lập trình viên phải sử dụng câu lệnh `git checkout` cho quá nhiều mục đích khác nhau: vừa chuyển nhánh, vừa phục hồi tệp tin, vừa tạo nhánh mới, dẫn đến rất nhiều tai nạn mất code đáng tiếc do gõ nhầm cú pháp. Sử dụng `git switch` mang lại sự an toàn và tường minh tuyệt đối: bạn hoàn toàn yên tâm rằng lệnh này chỉ tác động đến con trỏ nhánh mà không bao giờ vô tình ghi đè làm mất các tệp tin bạn đang gõ dở.',
    mentalModel:
      'Hãy hình dung việc chuyển nhánh giống như thao tác chuyển đổi tài khoản người dùng trên màn hình khóa máy tính, hoặc đổi kênh truyền hình trên chiếc TV thông minh. Khi bạn bấm chuyển từ kênh phim hoạt hình sang kênh thời sự thể thao (git switch), toàn bộ màn hình trước mắt bạn (Working Directory) lập tức biến đổi nội dung tương ứng với kênh mới, trong khi kênh cũ vẫn tiếp tục phát sóng ngầm độc lập ở hậu trường mà không hề bị xáo trộn.',
    diagram: `Cơ chế chuyển nhánh của git switch:
Trước khi switch:
HEAD ──► main (Working Tree đang hiển thị code của main)
         feature-cart

Sau lệnh: git switch feature-cart
         main
HEAD ──► feature-cart (Working Tree tự động cập nhật khớp với feature-cart)`,
    example:
      'Kỹ sư Trang đang làm việc trên nhánh main thì nhận được yêu cầu khẩn cấp từ ban giám đốc phải nhanh chóng xây dựng giao diện giỏ hàng mới cho khách hàng. Trang mở cửa sổ terminal và gõ ngay câu lệnh: `git switch -c feature-cart`. Lệnh này lập tức tạo ra nhánh feature-cart tách từ commit hiện tại của main và chuyển con trỏ HEAD sang nhánh mới này trong chớp mắt. Trang mở trình soạn thảo VS Code và thấy toàn bộ tệp tin đã sẵn sàng để viết code cho tính năng giỏ hàng mà không làm ảnh hưởng tới nhánh main ban đầu. Sau khi hoàn thành xong một số chỉnh sửa, Trang dùng lệnh `git switch -` để quay ngược trở lại nhánh main kiểm tra tiến độ dự án chung.',
    commands: [
      'git switch <tên-nhánh>',
      'git switch -c <tên-nhánh-mới>',
      'git switch -',
      'git switch -d <commit-hash>',
    ],
    explanation:
      '- `git switch <tên-nhánh>`: Chuyển sang một nhánh cục bộ đã tồn tại từ trước.\n- `git switch -c <tên-nhánh-mới>`: Tạo mới một nhánh và chuyển sang nhánh đó ngay lập tức (thay thế cho `git checkout -b`).\n- `git switch -`: Phím tắt cực kỳ tiện lợi để quay trở lại nhánh bạn vừa đứng trước đó.\n- `git switch -d <commit-hash>`: Chuyển tới một commit cụ thể ở chế độ Detached HEAD có chủ đích rõ ràng.',
    mistakes: [
      'Chuyển nhánh khi có thay đổi chưa commit xung đột với nhánh đích: Git sẽ ngăn chặn thao tác để bảo vệ code của bạn; bạn cần commit hoặc stash thay đổi trước.',
      'Vẫn giữ thói quen dùng lệnh cũ dễ gây nhầm lẫn: Tiếp tục dùng `git checkout` thay vì cú pháp hiện đại an toàn `git switch`.',
      'Quên dấu -c khi muốn tạo nhánh mới: Gõ `git switch new-feature` khi nhánh chưa tồn tại sẽ bị Git báo lỗi không tìm thấy nhánh.',
    ],
    labSteps: [
      'Tạo và chuyển sang nhánh mới bằng lệnh `git switch -c feature-user`.',
      'Chạy `git status` để xác nhận thông báo `On branch feature-user`.',
      'Chuyển quay lại nhánh chính bằng câu lệnh `git switch main`.',
      'Sử dụng phím tắt `git switch -` để quay ngược lại nhánh `feature-user`.',
    ],
    hint: 'Sử dụng `git switch -` để nhảy qua lại giữa hai nhánh gần nhất cực kỳ tiện lợi.',
    validation: 'Kiểm tra `git branch` thấy dấu sao định vị đúng nhánh mong muốn.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về câu lệnh chuyển nhánh git switch.',
    challenge: 'Mô tả cơ chế bảo vệ của Git khi bạn cố gắng chuyển nhánh trong lúc Working Tree đang có tệp Modified.',
    summary: [
      '`git switch` là lệnh hiện đại chuyên trách chuyển nhánh an toàn từ Git 2.23.',
      'Cờ `-c` cho phép vừa tạo vừa chuyển sang nhánh mới một cách nhanh chóng.',
      'Cú pháp `git switch -` giúp nhảy nhanh về nhánh làm việc trước đó.',
    ],
    quiz: {
      id: 'quiz-03-04-git-switch',
      title: 'Trắc nghiệm: Chuyển nhánh với git switch',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh nào dưới đây vừa tạo một nhánh mới có tên `feature-login` vừa chuyển sang nhánh đó ngay lập tức?',
          type: 'single',
          options: [
            { text: 'git switch -c feature-login', correct: true },
            { text: 'git switch --make feature-login', correct: false },
            { text: 'git switch feature-login --new', correct: false },
            { text: 'git switch -a feature-login', correct: false },
          ],
          explanation:
            'Cờ `-c` (viết tắt của create) vừa tạo nhánh mới vừa chuyển HEAD sang nhánh đó ngay.',
        },
        {
          id: 'q2',
          question: 'Cú pháp phím tắt tiện lợi `git switch -` (dấu gạch nối ở cuối) thực hiện hành động gì?',
          type: 'single',
          options: [
            { text: 'Chuyển quay trở lại nhánh mà bạn vừa đứng ngay trước đó', correct: true },
            { text: 'Xóa nhánh hiện tại ngay lập tức', correct: false },
            { text: 'Tắt kết nối mạng của Git', correct: false },
            { text: 'Đảo ngược thứ tự các commit trong lịch sử', correct: false },
          ],
          explanation:
            'Dấu gạch nối `-` đại diện cho nhánh trước đó (tương tự `cd -` trong terminal shell Unix).',
        },
        {
          id: 'q3',
          question: 'Tại sao tổ chức phát triển Git lại giới thiệu lệnh `git switch` tách riêng khỏi lệnh cũ `git checkout`?',
          type: 'single',
          options: [
            { text: 'Để phân tách rõ ràng trách nhiệm chuyển nhánh ra khỏi phục hồi tệp tin, tránh tai nạn mất code do gõ nhầm', correct: true },
            { text: 'Vì lệnh git checkout bị công ty đối thủ mua lại bản quyền thương hiệu', correct: false },
            { text: 'Vì lệnh git switch giúp tăng tốc độ mạng Internet lên gấp mười lần', correct: false },
            { text: 'Vì lệnh git checkout không chạy được trên hệ điều hành Linux', correct: false },
          ],
          explanation:
            'Git 2.23 chia checkout thành `git switch` (cho branch) và `git restore` (cho file) để tránh nhầm lẫn.',
        },
        {
          id: 'q4',
          question: 'Khi bạn chuyển từ nhánh A sang nhánh B, các tệp tin trong Working Directory trên ổ đĩa sẽ như thế nào?',
          type: 'single',
          options: [
            { text: 'Git tự động cập nhật nội dung các tệp trên đĩa khớp hoàn toàn với commit đỉnh của nhánh B', correct: true },
            { text: 'Các tệp tin bị xóa sạch hoàn toàn và bạn phải gõ lại code từ đầu', correct: false },
            { text: 'Nội dung các tệp vẫn giữ nguyên 100% của nhánh A mà không có thay đổi nào', correct: false },
            { text: 'Git tự động sao lưu tất cả tệp ra ngoài màn hình Desktop', correct: false },
          ],
          explanation:
            'Git thay đổi trạng thái Working Directory để phản ánh chính xác snapshot của nhánh bạn vừa chuyển tới.',
        },
      ],
    },
  },
  {
    id: '05-git-checkout',
    moduleId: '03-branching',
    title: 'Lệnh git checkout và lịch sử',
    duration: 20,
    xp: 70,
    keywords: ['git checkout', 'lich su git', 'switch vs checkout', 'da nang', 'legacy command'],
    prerequisites: ['04-git-switch'],
    objectives: [
      'Hiểu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.',
      'Phân biệt rõ ràng các trường hợp sử dụng của `git checkout`: chuyển nhánh, xem commit cũ, và hoàn tác tệp.',
      'Nắm bắt lý do chuyển dịch sang bộ đôi lệnh hiện đại `git switch` và `git restore`.',
    ],
    definition:
      '`git checkout` là một trong những câu lệnh lâu đời, nổi tiếng và đa năng bậc nhất trong lịch sử phát triển của Git. Trước phiên bản 2.23, `git checkout` đảm nhận đồng thời hai nhiệm vụ hoàn toàn khác nhau: thao tác trên nhánh/commit (chuyển nhánh, tạo nhánh mới, vào Detached HEAD) và thao tác trên tệp tin (hoàn tác tệp đã sửa, phục hồi tệp từ một commit cụ thể). Dù hiện nay các lệnh chuyên trách đã ra đời, `git checkout` vẫn xuất hiện rất nhiều trong các tài liệu và dự án cũ.',
    why:
      'Khi tham gia vào các dự án phần mềm thực tế hoặc tìm kiếm câu trả lời trên Stack Overflow, bạn sẽ bắt gặp hàng ngàn ví dụ và hướng dẫn sử dụng lệnh `git checkout`. Hiểu rõ cú pháp và hành vi của lệnh này giúp bạn dễ dàng đọc hiểu các tài liệu kỹ thuật cũ, cấu hình các script CI/CD tự động hóa có sẵn, đồng thời trân trọng hơn sự ra đời của các lệnh hiện đại như `git switch` và `git restore`.',
    mentalModel:
      'Hãy hình dung `git checkout` giống như một chiếc dao đa năng Thụy Sĩ cổ điển tích hợp hàng chục lưỡi dao, tua-vít và kéo cắt trên cùng một thân dao nhỏ. Chiếc dao này làm được mọi việc nhưng khi bạn muốn cắt một mẩu giấy nhỏ, bạn rất dễ vô ý mở nhầm lưỡi cưa sắc nhọn và làm đứt tay. Bộ đôi lệnh mới `git switch` và `git restore` giống như hai dụng cụ chuyên dụng riêng biệt: một chiếc kéo cắt giấy chuyên nghiệp và một chiếc tua-vít chuẩn mực.',
    diagram: `Sự phân tách nhiệm vụ của git checkout:
                  ┌──► Thao tác trên Branch/Commit ──► [git switch]
[git checkout] ──┤
                  └──► Thao tác trên Tệp tin (File) ──► [git restore]`,
    example:
      'Một kỹ sư mới vào công ty đọc tài liệu hướng dẫn triển khai hệ thống viết từ năm 2018. Trong tài liệu có dòng lệnh: `git checkout -b release-v1.0`. Kỹ sư lập tức nhận ra đây chính là thao tác tạo và chuyển sang nhánh mới, hoàn toàn tương đương với lệnh hiện đại `git switch -c release-v1.0` mà mình đã được học trong các khóa đào tạo chuẩn hóa. Nhờ hiểu sâu sắc cả hai thế hệ câu lệnh, kỹ sư tự tin thực thi hướng dẫn mà không gặp bất kỳ trở ngại nào. Kỹ sư còn giải thích lại cho các bạn thực tập sinh khác trong nhóm hiểu lý do tại sao tài liệu cũ lại dùng checkout và khi nào thì nên chuyển đổi sang các lệnh chuyên biệt.',
    commands: [
      'git checkout <tên-nhánh>',
      'git checkout -b <tên-nhánh-mới>',
      'git checkout <commit-hash>',
      'git checkout -- <tên-tệp>',
    ],
    explanation:
      '- `git checkout <tên-nhánh>`: Chuyển sang một nhánh khác (tương đương `git switch <tên-nhánh>`).\n- `git checkout -b <tên-nhánh-mới>`: Vừa tạo vừa chuyển sang nhánh mới (tương đương `git switch -c <tên-nhánh-mới>`).\n- `git checkout <commit-hash>`: Đưa con trỏ HEAD về commit trong quá khứ ở trạng thái Detached HEAD.\n- `git checkout -- <tên-tệp>`: Hủy bỏ các thay đổi dở dang trên tệp trong Working Tree (tương đương `git restore <tên-tệp>`).',
    mistakes: [
      'Quên dấu hai gạch ngang `--` khi checkout file: Nếu có một nhánh trùng tên với tên tệp tin, Git sẽ ưu tiên chuyển nhánh thay vì phục hồi tệp.',
      'Sử dụng lệnh checkout cho người mới học: Dễ gây hoang mang và nhầm lẫn khái niệm giữa thao tác nhánh và thao tác tệp.',
      'Nhầm lẫn giữa việc hủy bỏ thay đổi tệp và chuyển nhánh: Có thể vô tình làm mất dữ liệu tệp tin khi gõ thiếu tham số.',
    ],
    labSteps: [
      'Chạy lệnh `git checkout -b legacy-demo` để tạo và chuyển nhánh theo cách truyền thống.',
      'Chạy `git checkout main` để quay trở về nhánh chính.',
      'Xóa nhánh thử nghiệm bằng `git branch -d legacy-demo`.',
    ],
    hint: 'Trong các dự án mới, hãy ưu tiên dùng `git switch` và `git restore`.',
    validation: 'Nắm vững sự tương đồng giữa các cú pháp cũ và mới.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về lệnh truyền thống git checkout.',
    challenge: 'Giải thích vì sao cú pháp `git checkout -- <file>` bắt buộc phải có dấu `--` khi tên tệp trùng với tên một nhánh.',
    summary: [
      '`git checkout` là lệnh truyền thống đa năng cho cả nhánh và tệp tin.',
      '`git checkout -b` tương đương với lệnh hiện đại `git switch -c`.',
      'Hiện nay khuyến nghị sử dụng `git switch` và `git restore` để tăng tính rõ nghĩa và an toàn.',
    ],
    quiz: {
      id: 'quiz-03-05-git-checkout',
      title: 'Trắc nghiệm: Lệnh truyền thống git checkout',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh truyền thống `git checkout -b feature` tương đương với lệnh hiện đại nào sau đây?',
          type: 'single',
          options: [
            { text: 'git switch -c feature', correct: true },
            { text: 'git restore --branch feature', correct: false },
            { text: 'git branch --create-jump feature', correct: false },
            { text: 'git commit -b feature', correct: false },
          ],
          explanation:
            'Lệnh truyền thống `git checkout -b <name>` thực hiện chính xác hành động vừa tạo nhánh mới vừa chuyển nhánh tương đương hoàn toàn với `git switch -c <name>` hiện đại.',
        },
        {
          id: 'q2',
          question: 'Lệnh `git checkout -- index.html` thực hiện thao tác gì trên dự án?',
          type: 'single',
          options: [
            { text: 'Hủy bỏ các sửa đổi chưa staged trong tệp index.html (tương đương git restore index.html)', correct: true },
            { text: 'Tạo một nhánh mới có tên là index.html', correct: false },
            { text: 'Đẩy tệp index.html lên máy chủ GitHub', correct: false },
            { text: 'Biên dịch tệp index.html thành ứng dụng di động', correct: false },
          ],
          explanation:
            '`git checkout -- <file>` là cú pháp cũ dùng để hủy bỏ sửa đổi trên tệp trong Working Tree.',
        },
        {
          id: 'q3',
          question: 'Dấu hai gạch ngang `--` trong lệnh `git checkout -- <file>` đóng vai trò gì?',
          type: 'single',
          options: [
            { text: 'Phân tách rõ ràng giữa danh sách tùy chọn/nhánh và danh sách đường dẫn tệp tin để tránh trùng lặp tên', correct: true },
            { text: 'Là cú pháp bắt buộc của ngôn ngữ lập trình C++', correct: false },
            { text: 'Tự động kích hoạt tính năng nén tệp tin tốc độ cao', correct: false },
            { text: 'Tự động kiểm tra lỗi chính tả trong mã nguồn', correct: false },
          ],
          explanation:
            'Dấu `--` báo cho Git biết mọi đối số phía sau chắc chắn là đường dẫn tệp tin, không phải tên nhánh.',
        },
        {
          id: 'q4',
          question: 'Lời khuyên tốt nhất dành cho các kỹ sư phần mềm khi viết mã nguồn và dự án mới hiện nay là gì?',
          type: 'single',
          options: [
            { text: 'Sử dụng git switch cho nhánh và git restore cho tệp tin để mã lệnh an toàn và rõ nghĩa', correct: true },
            { text: 'Chỉ được dùng git checkout và cấm dùng git switch', correct: false },
            { text: 'Không được tạo bất kỳ nhánh nào trong suốt vòng đời dự án', correct: false },
            { text: 'Chỉ commit code vào ngày cuối cùng của tháng', correct: false },
          ],
          explanation:
            'Các lệnh mới chuyên biệt giúp quy trình rõ ràng và loại bỏ hoàn toàn các lỗi thao tác nhầm lẫn.',
        },
      ],
    },
  },
  {
    id: '06-branch-isolation',
    moduleId: '03-branching',
    title: 'Nguyên lý cách ly không gian Branch Isolation',
    duration: 25,
    xp: 80,
    keywords: ['branch isolation', 'cach ly khong gian', 'song song', 'an toan nhanh', 'doc lap'],
    prerequisites: ['04-git-switch'],
    objectives: [
      'Hiểu rõ nguyên lý cách ly không gian (Branch Isolation) độc lập của các luồng phát triển trong Git.',
      'Nhận biết phạm vi tác động của commit trên từng nhánh riêng biệt.',
      'Tự tin phát triển các tính năng thử nghiệm mạo hiểm mà không sợ làm ảnh hưởng tới nhánh chính.',
      'Phân tích sự phân kỳ lịch sử (divergent history) khi hai nhánh cùng tiến về phía trước.',
    ],
    definition:
      'Nguyên lý cách ly không gian (Branch Isolation) là đặc tính kiến trúc cốt lõi của Git, bảo đảm rằng mọi thay đổi đã được commit trên một nhánh chỉ tồn tại và ảnh hưởng độc quyền trên luồng lịch sử của chính nhánh đó. Nhánh chính (`main`) và các nhánh tính năng khác hoàn toàn không hề hay biết hay chịu bất kỳ tác động nào từ những sửa đổi này cho đến khi bạn chủ động thực hiện hành động hợp nhất (Merge hoặc Rebase).',
    why:
      'Khả năng cách ly tuyệt đối giải phóng sự sáng tạo của lập trình viên khỏi nỗi sợ hãi làm hỏng mã nguồn đang vận hành. Bạn có thể thoải mái thử nghiệm viết lại toàn bộ kiến trúc ứng dụng, cài đặt các thư viện mới hoặc xóa bỏ các module cũ trên một nhánh riêng biệt. Nếu thử nghiệm thành công rực rỡ, bạn sẽ gộp vào dự án chung; nếu thất bại thảm hại, bạn chỉ việc xóa nhánh đó đi chỉ trong một giây mà kho lưu trữ chính vẫn hoàn toàn nguyên vẹn.',
    mentalModel:
      'Hãy hình dung nguyên lý cách ly nhánh giống như các phòng thí nghiệm an toàn sinh học cấp độ 4 độc lập trong cùng một viện nghiên cứu. Mỗi nhà khoa học được cấp một căn phòng kín với hệ thống lọc khí riêng biệt để nghiên cứu các mẫu thử nghiệm mới. Bất kể phòng thí nghiệm số 1 có xảy ra sự cố cháy nổ hay đổ vỡ ống nghiệm, căn phòng chính số 0 và các phòng thí nghiệm lân cận vẫn hoàn toàn sạch sẽ, an toàn tuyệt đối và hoạt động bình thường.',
    diagram: `Lịch sử phân kỳ độc lập giữa hai nhánh:
Nhánh main:            C1 ──► C2 ──► C3 ──► C5 (main)
                              │
Nhánh feature-login:          └──► C4 ──► C6 (feature-login)
(Commit C4 và C6 hoàn toàn không xuất hiện trên nhánh main)`,
    example:
      'Lập trình viên An tạo nhánh experiment-ai để thử nghiệm tích hợp một mô hình trí tuệ nhân tạo nhận diện giọng nói vào ứng dụng di động. Sau ba ngày thử nghiệm và tạo 8 commit, An nhận thấy mô hình này tiêu tốn quá nhiều pin và không phù hợp với điện thoại đời cũ. Nhờ nguyên lý cách ly nhánh, toàn bộ mã nguồn của nhóm trên nhánh main vẫn đang chạy ổn định 100%. An chỉ việc chuyển về main và gõ `git branch -D experiment-ai` để loại bỏ thử nghiệm mà không để lại bất kỳ tì vết nào trong lịch sử chính.',
    commands: [
      'git switch -c <nhánh-thử-nghiệm>',
      'git log --oneline --graph --all',
      'git diff main..<nhánh-thử-nghiệm>',
    ],
    explanation:
      '- `git switch -c <nhánh-thử-nghiệm>`: Tạo một không gian cách ly an toàn mới để bắt đầu phát triển tính năng.\n- `git log --oneline --graph --all`: Quan sát bức tranh phân kỳ lịch sử trực quan của tất cả các nhánh độc lập.\n- `git diff main..<nhánh>`: Xem tổng hợp tất cả sự khác biệt mà nhánh thử nghiệm đã tạo ra so với nhánh main.',
    mistakes: [
      'Nghĩ commit trên nhánh con sẽ tự động xuất hiện trên nhánh main: Bạn bắt buộc phải thực hiện merge thì code mới sang main.',
      'Sợ hãi không dám tạo nhánh thử nghiệm: Hãy nhớ tạo nhánh là hoàn toàn miễn phí và an toàn tuyệt đối.',
      'Để lại các tệp chưa commit khi chuyển nhánh: Thay đổi chưa commit có thể đi theo sang nhánh khác nếu không bị xung đột.',
    ],
    labSteps: [
      'Tạo nhánh cách ly `test-isolation` bằng `git switch -c test-isolation`.',
      'Tạo tệp mới `secret-test.txt` và commit vào nhánh này.',
      'Chuyển về nhánh chính bằng lệnh `git switch main`.',
      'Kiểm tra thư mục làm việc và thấy tệp `secret-test.txt` hoàn toàn không tồn tại trên main.',
    ],
    hint: 'Nhánh con cách ly hoàn toàn; khi về nhánh main, các tệp của nhánh con sẽ biến mất trên ổ đĩa.',
    validation: 'Xác nhận tệp tin mới tạo ở nhánh con không xuất hiện trên nhánh main.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về nguyên lý cách ly nhánh Branch Isolation.',
    challenge: 'Vẽ sơ đồ phân kỳ commit khi hai lập trình viên cùng tạo nhánh từ một commit cha và commit độc lập.',
    summary: [
      'Branch Isolation đảm bảo các thay đổi đã commit trên một nhánh không ảnh hưởng tới nhánh khác.',
      'Thoải mái thử nghiệm các ý tưởng mới trên nhánh riêng mà không sợ hỏng code của nhóm.',
      'Chỉ khi nào thực hiện Merge hoặc Rebase thì mã nguồn giữa các nhánh mới được tích hợp.',
    ],
    quiz: {
      id: 'quiz-03-06-branch-isolation',
      title: 'Trắc nghiệm: Nguyên lý cách ly không gian Branch Isolation',
      questions: [
        {
          id: 'q1',
          question: 'Nguyên lý Branch Isolation trong Git mang lại lợi ích lớn nhất nào sau đây?',
          type: 'single',
          options: [
            { text: 'Cho phép lập trình viên tự do thử nghiệm và thay đổi mã nguồn mà không sợ ảnh hưởng tới nhánh chính', correct: true },
            { text: 'Giúp mã nguồn tự động biên dịch thành file exe mà không cần trình biên dịch', correct: false },
            { text: 'Giúp tự động sửa các lỗi cú pháp ngữ pháp tiếng Anh trong mã nguồn', correct: false },
            { text: 'Tăng tốc độ truy cập mạng Internet của văn phòng công ty', correct: false },
          ],
          explanation:
            'Tính cách ly độc lập bảo vệ nhánh chính an toàn trước mọi thử nghiệm và lỗi phát sinh trên nhánh phụ.',
        },
        {
          id: 'q2',
          question: 'Nếu bạn commit một tệp mới trên nhánh `feature` rồi chuyển về nhánh `main`, tệp đó trên ổ đĩa sẽ ra sao?',
          type: 'single',
          options: [
            { text: 'Tệp đó sẽ tự động biến mất khỏi Working Directory trên main và chỉ xuất hiện lại khi quay về feature', correct: true },
            { text: 'Tệp đó sẽ tự động được gửi qua email cho sếp', correct: false },
            { text: 'Tệp đó sẽ bị xóa vĩnh viễn khỏi toàn bộ lịch sử Git', correct: false },
            { text: 'Tệp đó sẽ tự động được đưa vào nhánh main mà không cần merge', correct: false },
          ],
          explanation:
            'Git cập nhật Working Directory theo snapshot của nhánh hiện tại; tệp của nhánh con sẽ được cất đi an toàn.',
        },
        {
          id: 'q3',
          question: 'Khi hai lập trình viên tạo hai nhánh khác nhau từ cùng một commit trên main và cùng commit code mới, hình thái lịch sử sẽ như thế nào?',
          type: 'single',
          options: [
            { text: 'Lịch sử sẽ phân kỳ (divergent) thành hai nhánh rẽ độc lập hình chữ Y từ mốc commit chung ban đầu', correct: true },
            { text: 'Lịch sử sẽ bị khóa lại và không ai được commit tiếp', correct: false },
            { text: 'Một trong hai nhánh sẽ bị xóa ngẫu nhiên để tránh xung đột', correct: false },
            { text: 'Toàn bộ mã nguồn của cả hai người sẽ bị hòa tan thành một tệp duy nhất', correct: false },
          ],
          explanation:
            'Đồ thị commit DAG sẽ phân nhánh độc lập từ commit cha chung tạo thành hình thái phân kỳ.',
        },
        {
          id: 'q4',
          question: 'Để xem biểu đồ phân kỳ trực quan của tất cả các nhánh trong terminal, bạn dùng câu lệnh nào?',
          type: 'single',
          options: [
            { text: 'git log --graph --oneline --all', correct: true },
            { text: 'git show --branches-only', correct: false },
            { text: 'git view --diagram', correct: false },
            { text: 'git chart --divergent', correct: false },
          ],
          explanation:
            '`git log --graph --oneline --all` vẽ các nhánh phân kỳ bằng ký tự ASCII trực quan tuyệt đẹp.',
        },
        {
          id: 'q5',
          question: 'Một tính năng thử nghiệm trên nhánh phụ bị thất bại hoàn toàn, thao tác xử lý chuẩn mực là gì?',
          type: 'single',
          options: [
            { text: 'Chuyển về nhánh main và xóa bỏ nhánh thử nghiệm đó bằng lệnh git branch -D', correct: true },
            { text: 'Phải cài lại hệ điều hành Windows từ đầu', correct: false },
            { text: 'Gửi đơn xin nghỉ việc tại công ty', correct: false },
            { text: 'Xóa toàn bộ kho chứa của công ty trên GitHub', correct: false },
          ],
          explanation:
            'Nhờ tính cách ly, bạn chỉ việc xóa nhánh thất bại là dự án trở về trạng thái hoàn hảo ban đầu.',
        },
        {
          id: 'q6',
          question: 'Các commit trên một nhánh tính năng có thể đến được nhánh main thông qua cơ chế nào?',
          type: 'single',
          options: [
            { text: 'Thông qua thao tác hợp nhất có chủ đích (Merge hoặc Rebase)', correct: true },
            { text: 'Tự động hòa nhập sau 24 giờ đồng hồ nếu không có lỗi', correct: false },
            { text: 'Tự động hòa nhập khi bạn tắt máy tính đi ngủ', correct: false },
            { text: 'Thông qua việc cắm cáp USB nối giữa hai máy tính', correct: false },
          ],
          explanation:
            'Git chỉ hòa nhập mã nguồn khi có lệnh chỉ định rõ ràng của lập trình viên (Merge hoặc Rebase).',
        },
      ],
    },
  },
  {
    id: '07-fast-forward-merge',
    moduleId: '03-branching',
    title: 'Hợp nhất nhanh Fast-forward merge',
    duration: 30,
    xp: 90,
    keywords: ['fast-forward', 'ff merge', 'hop nhat nhanh', 'git merge', 'linear history'],
    prerequisites: ['06-branch-isolation'],
    objectives: [
      'Hiểu rõ điều kiện cần và đủ để Git kích hoạt cơ chế hợp nhất Fast-forward merge.',
      'Thực hiện câu lệnh `git merge <tên-nhánh>` trên nhánh đích một cách chuẩn xác.',
      'Giải thích vì sao Fast-forward không sinh ra commit hợp nhất mới (merge commit).',
      'Sử dụng cờ `--no-ff` để chủ động tạo merge commit khi muốn lưu vết lịch sử nhánh tính năng.',
    ],
    definition:
      'Fast-forward merge là hình thức hợp nhất đơn giản và mượt mà nhất trong Git, xảy ra khi nhánh đích (thường là `main`) không có bất kỳ commit mới nào kể từ thời điểm nhánh tính năng được tách ra. Trong tình huống này, lịch sử phát triển là hoàn toàn tuyến tính (linear): Git không cần phải thực hiện thuật toán so sánh ba chiều phức tạp và không tạo ra commit hợp nhất mới, mà chỉ đơn thuần dịch chuyển con trỏ nhánh đích tiến thẳng về phía trước để trỏ cùng vị trí với commit đỉnh của nhánh tính năng.',
    why:
      'Fast-forward merge tạo ra một lịch sử commit thẳng thớm, gọn gàng và cực kỳ dễ theo dõi vì không xuất hiện các nút giao rẽ nhánh chằng chịt trong cây lịch sử. Đối với các tác vụ sửa lỗi nhỏ hoặc các nhánh tính năng ngắn hạn mà nhánh main chưa hề bị ai chỉnh sửa, Fast-forward giúp tích hợp mã nguồn tức thì mà không làm phát sinh thêm các commit merge thừa thãi trong nhật ký dự án. Điều này giúp các lập trình viên dễ dàng đọc lại lịch sử mã nguồn, đơn giản hóa việc truy vết lỗi bằng git bisect và giữ cho đồ thị tổng quan luôn sáng rõ.',
    mentalModel:
      'Hãy hình dung hai người bạn Nam và Bình cùng nhau đi bộ trên một con đường mòn thẳng tắp. Khi đi đến cột mốc số 3, Bình xin phép Nam tạm dừng chân nghỉ ngơi, còn Nam tiếp tục đi thẳng về phía trước thêm 2 cột mốc nữa đến cột mốc số 5. Lát sau, khi Bình nghỉ ngơi xong, Bình chỉ việc đứng dậy bước nhanh về phía trước (Fast-forward) để đứng ngang hàng với Nam tại cột mốc số 5 mà không cần phải đi vòng vèo qua bất kỳ con đường tắt nào.',
    diagram: `Cơ chế Fast-forward merge:
Trước khi merge:
main:               C1 ──► C2 ──► C3 (HEAD -> main)
                                   \
feature:                            └──► C4 ──► C5 (feature)

Sau khi chạy lệnh: git merge feature
main & feature:     C1 ──► C2 ──► C3 ──► C4 ──► C5 (HEAD -> main, feature)`,
    example:
      'Lập trình viên Đức tạo nhánh fix-typo từ nhánh main tại commit C3 để sửa một lỗi chính tả trên thanh menu điều hướng của trang chủ. Đức tạo hai commit C4 và C5 trên nhánh này để hoàn thiện nội dung. Trong suốt thời gian đó, không có bất kỳ ai commit thêm gì vào nhánh main. Khi hoàn thành kiểm thử, Đức chuyển về nhánh main bằng lệnh `git switch main` rồi gõ lệnh `git merge fix-typo`. Màn hình hiển thị dòng chữ thông báo: "Fast-forward". Con trỏ nhánh main lập tức nhảy vọt lên commit C5, hoàn tất việc gộp code trong nháy mắt mà không cần sinh thêm commit trung gian nào.',
    commands: [
      'git switch main',
      'git merge <tên-nhánh>',
      'git merge --no-ff <tên-nhánh>',
      'git merge --ff-only <tên-nhánh>',
    ],
    explanation:
      '- `git switch main`: Bắt buộc phải chuyển về nhánh đích trước khi thực hiện hợp nhất nhánh khác vào.\n- `git merge <tên-nhánh>`: Hợp nhất nhánh chỉ định vào nhánh hiện tại (tự động dùng Fast-forward nếu thỏa mãn điều kiện).\n- `git merge --no-ff <nhánh>`: Ép buộc Git tạo một Merge Commit mới ngay cả khi đủ điều kiện Fast-forward để lưu vết mốc tích hợp tính năng.\n- `git merge --ff-only <nhánh>`: Chỉ cho phép hợp nhất nếu là Fast-forward, từ chối merge nếu phải giải quyết 3-way.',
    mistakes: [
      'Đứng ở nhánh tính năng rồi gõ git merge main: Thao tác ngược làm kéo code của main vào feature thay vì đưa feature vào main.',
      'Bối rối khi thấy không có commit merge mới: Đây là bản chất tự nhiên của Fast-forward vì con trỏ chỉ việc di chuyển tiến lên.',
      'Lẫn lộn giữa Fast-forward và 3-way merge: Không nắm được điều kiện khi nào Git được phép tua nhanh con trỏ.',
    ],
    labSteps: [
      'Tạo nhánh `ff-demo` và commit một tệp mới `feature.js`.',
      'Chuyển về nhánh `main` bằng `git switch main`.',
      'Chạy lệnh `git merge ff-demo` và quan sát thông báo `Fast-forward`.',
      'Chạy `git log --oneline` để thấy lịch sử thẳng tắp không có commit rẽ nhánh.',
    ],
    hint: 'Nhớ nguyên tắc: Luôn đứng ở nhánh nhận code (main) trước khi gõ lệnh `git merge`.',
    validation: 'Kiểm tra `git log` thấy con trỏ main và con trỏ nhánh con cùng trỏ vào một commit.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế Fast-forward merge.',
    challenge: 'Nêu lợi ích và nhược điểm của việc sử dụng cờ `--no-ff` trong quy trình làm việc Git Flow của doanh nghiệp.',
    summary: [
      'Fast-forward xảy ra khi nhánh đích không có commit mới kể từ mốc rẽ nhánh.',
      'Git chỉ dịch chuyển con trỏ nhánh đích tiến lên mà không tạo thêm commit mới.',
      'Sử dụng `--no-ff` khi bạn muốn ghi dấu rõ ràng một nhánh tính năng đã được hợp nhất.',
    ],
    quiz: {
      id: 'quiz-03-07-fast-forward-merge',
      title: 'Trắc nghiệm: Hợp nhất nhanh Fast-forward merge',
      questions: [
        {
          id: 'q1',
          question: 'Điều kiện tiên quyết để Git có thể thực hiện Fast-forward merge là gì?',
          type: 'single',
          options: [
            { text: 'Nhánh đích (ví dụ main) không có bất kỳ commit mới nào kể từ khi nhánh tính năng được tách ra', correct: true },
            { text: 'Dự án phải có dung lượng dưới 10 megabyte', correct: false },
            { text: 'Cả hai lập trình viên phải sử dụng cùng một phiên bản hệ điều hành', correct: false },
            { text: 'Lệnh phải được thực thi vào lúc 12 giờ đêm', correct: false },
          ],
          explanation:
            'Nếu nhánh đích không có commit mới, con đường lịch sử là hoàn toàn tuyến tính và Git có thể tua nhanh con trỏ.',
        },
        {
          id: 'q2',
          question: 'Trong quá trình thực hiện Fast-forward merge thành công, Git có sinh ra một commit mới hay không?',
          type: 'single',
          options: [
            { text: 'Không, Git chỉ đơn thuần dịch chuyển con trỏ của nhánh đích tiến lên chỉ vào commit đỉnh của nhánh tính năng', correct: true },
            { text: 'Có, Git luôn luôn bắt buộc tạo ra một commit có hai cha', correct: false },
            { text: 'Có, nhưng commit đó sẽ tự động bị ẩn đi sau 1 giờ', correct: false },
            { text: 'Git sẽ xóa toàn bộ các commit cũ và thay bằng một commit duy nhất', correct: false },
          ],
          explanation:
            'Fast-forward không tạo commit mới, chỉ di chuyển con trỏ tiến lên phía trước.',
        },
        {
          id: 'q3',
          question: 'Trước khi chạy lệnh `git merge feature-login` để gộp tính năng vào nhánh chính, bạn bắt buộc phải làm gì?',
          type: 'single',
          options: [
            { text: 'Chuyển về nhánh đích đón nhận code bằng lệnh `git switch main`', correct: true },
            { text: 'Xóa nhánh feature-login trước', correct: false },
            { text: 'Tắt kết nối mạng Internet', correct: false },
            { text: 'Đóng trình duyệt web', correct: false },
          ],
          explanation:
            'Bạn luôn phải đứng ở nhánh đích (nơi muốn nhận code) trước khi ra lệnh merge nhánh nguồn vào.',
        },
        {
          id: 'q4',
          question: 'Cờ tùy chọn nào ép buộc Git tạo một Merge Commit mới ngay cả khi đủ điều kiện thực hiện Fast-forward?',
          type: 'single',
          options: [
            { text: '--no-ff', correct: true },
            { text: '--force-merge', correct: false },
            { text: '--create-commit', correct: false },
            { text: '--always-new', correct: false },
          ],
          explanation:
            '`--no-ff` (no fast-forward) bắt buộc tạo một merge commit riêng biệt để lưu lại bằng chứng của nhánh tính năng.',
        },
        {
          id: 'q5',
          question: 'Cờ `--ff-only` trong lệnh git merge mang lại sự an toàn nào cho quy trình CI/CD?',
          type: 'single',
          options: [
            { text: 'Từ chối hợp nhất và báo lỗi nếu nhánh đích bị phân kỳ, bảo đảm lịch sử dự án luôn là một đường thẳng', correct: true },
            { text: 'Tự động chấp nhận tất cả các lỗi xung đột code mà không hỏi người dùng', correct: false },
            { text: 'Xóa bỏ tất cả các bài kiểm tra tự động', correct: false },
            { text: 'Tự động tăng số sao trên GitHub của dự án', correct: false },
          ],
          explanation:
            '`--ff-only` ngăn chặn việc vô tình sinh ra merge commit khi lịch sử đã bị phân kỳ.',
        },
        {
          id: 'q6',
          question: 'Khi quan sát `git log --graph --oneline` sau một Fast-forward merge, đồ thị nhánh sẽ có dạng gì?',
          type: 'single',
          options: [
            { text: 'Một đường thẳng tắp duy nhất không có bất kỳ nút giao rẽ nhánh nào', correct: true },
            { text: 'Một vòng tròn khép kín vô tận', correct: false },
            { text: 'Một hình sao năm cánh phức tạp', correct: false },
            { text: 'Đồ thị bị biến mất hoàn toàn không xem được', correct: false },
          ],
          explanation:
            'Do không có merge commit, các commit nối tiếp nhau trên một đường thẳng duy nhất.',
        },
      ],
    },
  },
  {
    id: '08-three-way-merge',
    moduleId: '03-branching',
    title: 'Hợp nhất rẽ nhánh 3-way merge',
    duration: 35,
    xp: 100,
    keywords: ['3-way merge', 'merge commit', 'common ancestor', 'hop nhat 3 chieu', 'phan ky'],
    prerequisites: ['07-fast-forward-merge'],
    objectives: [
      'Nắm vững thuật toán hợp nhất 3 chiều (Three-way merge) trong Git.',
      'Nhận diện 3 điểm cốt lõi của thuật toán: Tổ tiên chung (Common Ancestor), đỉnh nhánh hiện tại (HEAD), và đỉnh nhánh được gộp.',
      'Phân biệt rõ ràng giữa hợp nhất thành công tự động và tình huống phát sinh xung đột (Conflict).',
      'Đọc hiểu cấu trúc một Merge Commit đặc biệt có hai commit cha.',
    ],
    definition:
      'Three-way merge (Hợp nhất 3 chiều) là thuật toán hợp nhất tiêu chuẩn của Git được kích hoạt khi lịch sử của hai nhánh đã bị phân kỳ (cả nhánh chính và nhánh tính năng đều có những commit mới độc lập kể từ điểm rẽ nhánh chung). Để hợp nhất hai luồng thay đổi này lại với nhau, Git sử dụng đúng 3 ảnh chụp snapshot: Commit tổ tiên chung gần nhất (Common Ancestor hay Base), commit đỉnh của nhánh hiện tại (`OURS`), và commit đỉnh của nhánh cần gộp (`THEIRS`). Nếu các thay đổi nằm ở các tệp tin hoặc các dòng code khác nhau, Git sẽ tự động hợp nhất thành công và tạo ra một Merge Commit mới.',
    why:
      'Trong môi trường làm việc nhóm thực tế, gần như không bao giờ có chuyện nhánh main đứng yên chờ bạn hoàn thành tính năng suốt nhiều tuần. Các đồng nghiệp khác liên tục đưa các tính năng mới và các bản sửa lỗi vào nhánh main. Khi bạn hoàn thành công việc của mình, hai nhánh chắc chắn đã bị phân kỳ. Thuật toán 3-way merge chính là phép màu thuật toán giúp tích hợp công sức của nhiều kỹ sư làm việc song song một cách tự động và chính xác.',
    mentalModel:
      'Hãy tưởng tượng hai dịch giả cùng dịch tiếp một cuốn tiểu thuyết kinh điển từ chương 5 (commit tổ tiên chung). Dịch giả A nhận nhiệm vụ dịch các chương tiếp theo ở nửa đầu cuốn sách (nhánh main), còn Dịch giả B nhận nhiệm vụ dịch các phụ lục tra cứu ở cuối sách (nhánh feature). Khi đến ngày xuất bản, tổng biên tập (Git) cầm bản thảo gốc chương 5 ra đối chiếu cùng bản dịch của A và B. Thấy hai người dịch ở hai phần hoàn toàn tách biệt của cuốn sách, tổng biên tập chỉ việc gom hai phần đó lại và đóng thành một cuốn sách xuất bản hoàn chỉnh (Merge Commit).',
    diagram: `Cấu trúc 3 điểm trong thuật toán Three-way merge:
                 (Base - Tổ tiên chung)
                          Commit C2
                         /         \\
                        /           \\
           Commit C3 (Ours)       Commit C4 (Theirs)
                        \\           /
                         \\         /
                          Commit C5 (Merge Commit - có 2 cha C3 & C4)`,
    example:
      'Lập trình viên Huy tách nhánh feature-search từ commit C2 của nhánh main. Trong khi Huy viết chức năng tìm kiếm sản phẩm trong tệp search.js (sinh ra commit C4), thì ở nhánh main đồng nghiệp Mai sửa xong lỗi giao diện trong styles.css (sinh ra commit C3). Khi Huy merge feature-search vào main, Git tự động tìm thấy tổ tiên chung C2. Nhận thấy hai người sửa ở hai tệp tin hoàn toàn khác nhau, Git tự động kết hợp cả hai thay đổi và tạo ra một commit hợp nhất mới C5, đưa toàn bộ chức năng tìm kiếm và giao diện mới vào cùng một phiên bản.',
    commands: [
      'git switch main',
      'git merge <tên-nhánh-tính-năng>',
      'git log --oneline --graph',
    ],
    explanation:
      '- `git switch main`: Chuyển về nhánh đón nhận kết quả hợp nhất.\n- `git merge <tên-nhánh>`: Thực thi thuật toán Three-way merge tự động kết hợp thay đổi và mở trình soạn thảo để xác nhận thông điệp commit hợp nhất.\n- `git log --oneline --graph`: Vẽ đồ thị kiểm tra nhánh đã được gộp lại với nút giao commit có 2 đường liên kết trỏ về 2 cha.',
    mistakes: [
      'Bất ngờ khi trình soạn thảo văn bản tự động bật lên: Khi tạo merge commit, Git yêu cầu xác nhận thông điệp commit (mặc định dạng: Merge branch feature into main).',
      'Tưởng 3-way merge luôn luôn gây ra conflict: Nếu hai nhánh sửa ở các file khác nhau hoặc các dòng cách xa nhau, Git tự động merge 100% trơn tru.',
      'Không kiểm tra lại kết quả chạy thử ứng dụng sau khi merge: Dù Git merge tự động không báo lỗi cú pháp nhưng logic hai phần có thể chưa tương thích.',
    ],
    labSteps: [
      'Tạo nhánh `feature-contact` và sửa tệp `contact.html`.',
      'Chuyển về nhánh `main` và sửa tệp `about.html` để tạo ra sự phân kỳ lịch sử.',
      'Chạy lệnh `git merge feature-contact` từ nhánh `main`.',
      'Quan sát Git thực hiện 3-way merge tự động thành công và tạo merge commit mới.',
    ],
    hint: 'Nếu hai người sửa hai tệp khác nhau, Git sẽ tự động tạo Merge Commit mà không phát sinh conflict.',
    validation: 'Kiểm tra `git log --graph` thấy hình thái nút giao hợp nhất của hai nhánh.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về thuật toán Three-way merge.',
    challenge: 'Nêu cách Git xác định commit tổ tiên chung gần nhất (Merge Base) bằng lệnh `git merge-base`.',
    summary: [
      'Three-way merge sử dụng 3 snapshot: Tổ tiên chung, nhánh hiện tại và nhánh được gộp.',
      'Kích hoạt khi hai nhánh đã có sự phân kỳ lịch sử độc lập.',
      'Tự động tạo ra một Merge Commit mới có hai commit cha nếu không có xung đột dòng code.',
    ],
    quiz: {
      id: 'quiz-03-08-three-way-merge',
      title: 'Trắc nghiệm: Thuật toán Three-way merge',
      questions: [
        {
          id: 'q1',
          question: 'Thuật toán Three-way merge của Git sử dụng chính xác 3 mốc snapshot nào dưới đây để đối chiếu?',
          type: 'single',
          options: [
            { text: 'Commit tổ tiên chung gần nhất (Base), đỉnh nhánh hiện tại (Ours), và đỉnh nhánh được gộp (Theirs)', correct: true },
            { text: 'Ba commit đầu tiên khi dự án vừa được khởi tạo bằng git init', correct: false },
            { text: 'Ba commit ngẫu nhiên do máy tính tự động chọn từ kho lưu trữ', correct: false },
            { text: 'Ba nhánh khác nhau của ba lập trình viên khác nhau', correct: false },
          ],
          explanation:
            'Thuật toán 3 chiều đối chiếu Base, Ours và Theirs để nhận diện chính xác từng bên đã thay đổi những gì.',
        },
        {
          id: 'q2',
          question: 'Điểm đặc biệt quan trọng nhất của một Merge Commit sinh ra từ Three-way merge là gì?',
          type: 'single',
          options: [
            { text: 'Nó có hai (hoặc nhiều hơn) commit cha trỏ về đỉnh của các nhánh vừa được hợp nhất', correct: true },
            { text: 'Nó không có mã băm SHA nào cả', correct: false },
            { text: 'Nó tự động xóa bỏ toàn bộ mã nguồn của nhánh con', correct: false },
            { text: 'Nó không chứa bất kỳ dòng thông điệp mô tả nào', correct: false },
          ],
          explanation:
            'Merge Commit là một nút đặc biệt trong đồ thị DAG có 2 con trỏ cha (parent commits).',
        },
        {
          id: 'q3',
          question: 'Nếu nhánh A sửa tệp `user.js` và nhánh B sửa tệp `product.js` kể từ điểm rẽ nhánh chung, kết quả khi merge B vào A sẽ là gì?',
          type: 'single',
          options: [
            { text: 'Git tự động hợp nhất thành công hoàn toàn và tạo ra một Merge Commit mới mà không có xung đột', correct: true },
            { text: 'Git sẽ báo lỗi xung đột nghiêm trọng và hủy bỏ toàn bộ thay đổi', correct: false },
            { text: 'Git sẽ xóa tệp product.js và chỉ giữ lại user.js', correct: false },
            { text: 'Git bắt buộc lập trình viên phải chọn xóa một trong hai tệp', correct: false },
          ],
          explanation:
            'Thay đổi trên các tệp tin độc lập hoàn toàn không gây conflict; Git tự động kết hợp cả hai tệp vào snapshot mới.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào cho phép bạn tra cứu trực tiếp mã băm của commit tổ tiên chung giữa hai nhánh `main` và `feature`?',
          type: 'single',
          options: [
            { text: 'git merge-base main feature', correct: true },
            { text: 'git find-ancestor main feature', correct: false },
            { text: 'git common-root main feature', correct: false },
            { text: 'git parent-search main feature', correct: false },
          ],
          explanation:
            '`git merge-base <branch1> <branch2>` in ra mã SHA của commit tổ tiên chung gần nhất.',
        },
        {
          id: 'q5',
          question: 'Thông điệp commit mặc định mà Git tự động gợi ý khi tạo một Merge Commit có dạng như thế nào?',
          type: 'single',
          options: [
            { text: "Merge branch 'feature' into main (hoặc tương đương)", correct: true },
            { text: 'Oops! An error occurred', correct: false },
            { text: 'Auto backup daily report', correct: false },
            { text: 'Delete old files', correct: false },
          ],
          explanation:
            'Git tự động tạo message mặc định nêu rõ tên nhánh nguồn được gộp vào nhánh đích.',
        },
        {
          id: 'q6',
          question: 'Khi trình soạn thảo tự động mở ra yêu cầu xác nhận thông điệp của merge commit, bạn cần làm gì để hoàn tất quá trình merge?',
          type: 'single',
          options: [
            { text: 'Lưu tệp tin và đóng trình soạn thảo lại (ví dụ trong Nano bấm Ctrl+O rồi Ctrl+X, hoặc trong Vim gõ :wq)', correct: true },
            { text: 'Rút phích cắm điện máy tính ngay lập tức', correct: false },
            { text: 'Bấm phím Delete trên bàn phím liên tục', correct: false },
            { text: 'Gõ thêm mật khẩu ngân hàng của bạn vào tệp', correct: false },
          ],
          explanation:
            'Đóng trình soạn thảo sau khi lưu sẽ hoàn tất thao tác tạo Merge Commit trong Git.',
        },
      ],
    },
  },
  {
    id: '09-merge-commit',
    moduleId: '03-branching',
    title: 'Bản chất của Merge commit',
    duration: 25,
    xp: 80,
    keywords: ['merge commit', 'hai commit cha', 'parents', 'dag node', 'linear vs non-linear'],
    prerequisites: ['08-three-way-merge'],
    objectives: [
      'Hiểu rõ cấu trúc nội tại của một đối tượng Merge Commit trong cơ sở dữ liệu Git.',
      'Giải thích ý nghĩa của thuộc tính đa phụ huynh (multiple parents) trong đồ thị DAG.',
      'So sánh ưu và nhược điểm giữa chiến lược giữ Merge Commit và chiến lược làm phẳng lịch sử (Rebase/Squash).',
      'Sử dụng lệnh `git show` và `git log` để phân tích các commit cha của một merge commit.',
    ],
    definition:
      'Merge Commit là một đối tượng commit đặc biệt trong đồ thị có hướng không chu trình (DAG) của Git, sở hữu từ hai con trỏ commit cha trở lên (Parent 1 trỏ về đỉnh nhánh đích, Parent 2 trỏ về đỉnh nhánh nguồn được gộp). Trong khi các commit thông thường chỉ ghi nhận một commit cha duy nhất đứng trước nó, Merge Commit đóng vai trò như một cây cầu nối hợp nhất hai nhánh lịch sử độc lập lại với nhau, ghi nhận thời điểm và bối cảnh hai luồng công việc gặp nhau.',
    why:
      'Hiểu rõ bản chất của Merge Commit giúp bạn không còn bỡ ngỡ khi đọc các đồ thị nhánh phức tạp của các tập đoàn công nghệ lớn. Bạn sẽ hiểu được tại sao lệnh `git revert` trên một merge commit lại đòi hỏi phải truyền thêm cờ `-m` để chỉ định commit cha, cũng như biết cách đưa ra quyết định kiến trúc: khi nào nên giữ lại merge commit để bảo lưu dấu vết làm việc nhóm, và khi nào nên rebase làm phẳng lịch sử để nhật ký dự án tinh gọn.',
    mentalModel:
      'Hãy hình dung đồ thị lịch sử như hai dòng sông nhỏ bắt nguồn từ một ngọn núi cao (commit tổ tiên chung). Hai dòng sông chảy uốn lượn qua hai thung lũng khác nhau (hai nhánh độc lập). Đến một vùng đồng bằng trù phú, hai dòng sông hòa vào nhau tại một ngã ba sông lớn (Merge Commit). Kể từ ngã ba sông này, dòng chảy tiếp tục hòa thành một dòng sông lớn duy nhất mang theo phù sa của cả hai nhánh sông trước đó.',
    diagram: `Cấu trúc đối tượng Merge Commit trong Git:
┌──────────────────────────────────────────────┐
│ Commit: e4b2a19 (Merge Commit)               │
│ Tree: 819c4d2fe901                           │
│ Parent 1: c3f12a8 (nhánh main)               │
│ Parent 2: 9a7b4f1 (nhánh feature-payment)    │
│ Author: Nam Nguyen <nam@example.com>         │
│ Message: Merge branch 'feature-payment'      │
└──────────────────────────────────────────────┘`,
    example:
      'Trong một dự án xây dựng ứng dụng ngân hàng số, trưởng nhóm kỹ thuật rà soát lại lịch sử phát hành thông qua câu lệnh trực quan `git log --graph --oneline`. Tại commit mang mã hash e4b2a19, trưởng nhóm nhìn thấy dòng ghi chú chuẩn mực "Merge branch feature-auth into main". Nhờ tồn tại merge commit này với hai commit cha rõ ràng, cả nhóm có thể dễ dàng kiểm toán lại xem tính năng xác thực hai yếu tố đã được gộp vào mã nguồn chính xác vào ngày nào, do ai phê duyệt và toàn bộ các commit thành phần nhỏ bên trong nhánh đó là gì. Điều này mang lại sự minh bạch tuyệt đối cho quy trình phát triển sản phẩm của toàn thể công ty.',
    commands: [
      'git show <merge-commit-hash>',
      'git log --merges --oneline',
      'git log --no-merges --oneline',
    ],
    explanation:
      '- `git show <merge-commit-hash>`: Xem thông tin chi tiết của một merge commit bao gồm cả hai mã hash của commit cha.\n- `git log --merges --oneline`: Bộ lọc thông minh chỉ hiển thị các commit hợp nhất trong lịch sử dự án.\n- `git log --no-merges --oneline`: Bộ lọc loại bỏ toàn bộ các commit hợp nhất, chỉ hiển thị các commit công việc thông thường.',
    mistakes: [
      'Cố gắng revert merge commit mà không chỉ định cờ -m: Git sẽ từ chối vì không biết bạn muốn coi commit cha số 1 hay số 2 là mạch chính.',
      'Lạm dụng merge commit cho các sửa đổi quá nhỏ nhặt: Khiến lịch sử dự án bị ô nhiễm bởi hàng trăm commit merge rác.',
      'Nghĩ rằng merge commit sao chép toàn bộ tệp trùng lặp: Merge commit chỉ lưu trữ tree snapshot và trỏ tới hai commit cha trong DAG.',
    ],
    labSteps: [
      'Chạy lệnh `git log --merges --oneline` để tìm các commit hợp nhất trong dự án.',
      'Sử dụng lệnh `git show` trên một merge commit để quan sát dòng `Merge: hash1 hash2`.',
      'So sánh kết quả hiển thị giữa `git log --merges` và `git log --no-merges`.',
    ],
    hint: 'Dòng `Merge: a1b2c3d e4f5g6h` trong git show cho biết mã băm của hai commit cha.',
    validation: 'Nhận diện chính xác hai commit cha của một merge commit qua git show.',
    quizPrompt: 'Hãy hoàn thành bài trắc nghiệm dưới đây về bản chất của Merge commit.',
    challenge: 'Giải thích cú pháp `git revert -m 1 <merge-commit-hash>` và ý nghĩa của số 1 ở đây.',
    summary: [
      'Merge Commit là nút đặc biệt trong đồ thị Git sở hữu từ hai commit cha trở lên.',
      'Ghi nhận bằng chứng lịch sử rõ ràng về thời điểm và bối cảnh tích hợp tính năng.',
      'Có thể lọc danh sách commit hợp nhất bằng cờ `--merges` hoặc `--no-merges`.',
    ],
    quiz: {
      id: 'quiz-03-09-merge-commit',
      title: 'Trắc nghiệm: Bản chất của Merge commit',
      questions: [
        {
          id: 'q1',
          question: 'Thuộc tính kỹ thuật cơ bản nào phân biệt một Merge Commit với một commit thông thường trong Git?',
          type: 'single',
          options: [
            { text: 'Nó có từ hai con trỏ commit cha trở lên thay vì chỉ có duy nhất một commit cha', correct: true },
            { text: 'Nó không có mã băm định danh SHA', correct: false },
            { text: 'Nó không lưu trữ cây thư mục mã nguồn', correct: false },
            { text: 'Nó chỉ có thể được tạo bởi tài khoản quản trị viên', correct: false },
          ],
          explanation:
            'Mỗi commit thông thường chỉ có 1 parent; Merge Commit là nút giao có từ 2 parents trở lên.',
        },
        {
          id: 'q2',
          question: 'Lệnh nào sau đây chỉ lọc và hiển thị các commit hợp nhất (Merge Commits) trong lịch sử dự án?',
          type: 'single',
          options: [
            { text: 'git log --merges', correct: true },
            { text: 'git log --only-combine', correct: false },
            { text: 'git show --merge-list', correct: false },
            { text: 'git filter --merge-nodes', correct: false },
          ],
          explanation:
            '`--merges` là bộ lọc tích hợp sẵn của git log giúp chỉ liệt kê các commit có nhiều hơn 1 cha.',
        },
        {
          id: 'q3',
          question: 'Lợi ích lớn nhất của việc lưu giữ các Merge Commit trong lịch sử của một dự án lớn là gì?',
          type: 'single',
          options: [
            { text: 'Bảo lưu nguyên vẹn ngữ cảnh phát triển, ranh giới tính năng và thời điểm tích hợp của nhánh', correct: true },
            { text: 'Giúp ứng dụng di động chạy mượt mà hơn và ít tốn pin hơn', correct: false },
            { text: 'Tự động sao lưu mã nguồn sang một ổ đĩa USB phụ', correct: false },
            { text: 'Tránh việc máy tính bị quá nhiệt khi làm việc ban đêm', correct: false },
          ],
          explanation:
            'Merge Commit lưu vết ranh giới và thời điểm một luồng tính năng hoàn chỉnh được kết nạp vào sản phẩm.',
        },
        {
          id: 'q4',
          question: 'Khi bạn chạy lệnh `git show` trên một merge commit, dòng thông tin nào cho bạn biết mã hash của các commit cha?',
          type: 'single',
          options: [
            { text: 'Dòng chữ `Merge: <hash1> <hash2>` nằm ngay dưới dòng commit hash', correct: true },
            { text: 'Dòng chữ `Parents are secret`', correct: false },
            { text: 'Dòng chữ `Author: Unknown`', correct: false },
            { text: 'Dòng chữ `Error: Multiple parents`', correct: false },
          ],
          explanation:
            'Git in dòng `Merge: <sha1> <sha2>` biểu thị trực tiếp hai commit cha của commit này.',
        },
        {
          id: 'q5',
          question: 'Lệnh nào sau đây loại bỏ toàn bộ các commit hợp nhất, chỉ hiển thị commit công việc thông thường?',
          type: 'single',
          options: [
            { text: 'git log --no-merges', correct: true },
            { text: 'git log --without-parents', correct: false },
            { text: 'git log --simple-only', correct: false },
            { text: 'git log --hide-branches', correct: false },
          ],
          explanation:
            '`--no-merges` lọc bỏ các commit hợp nhất, giúp người đọc theo dõi các commit nội dung thuần túy.',
        },
        {
          id: 'q6',
          question: 'Khi bạn hoàn tác (revert) một merge commit bằng git revert, vì sao Git yêu cầu phải truyền cờ -m (mainline)?',
          type: 'single',
          options: [
            { text: 'Vì merge commit có nhiều hơn một cha nên Git cần biết nhánh nào được coi là luồng chính để hoàn tác', correct: true },
            { text: 'Vì merge commit bị khóa mật khẩu bảo mật', correct: false },
            { text: 'Vì Git không cho phép hoàn tác bất kỳ commit nào nếu không có cờ -m', correct: false },
            { text: 'Vì cờ -m dùng để ghi âm giọng nói của lập trình viên', correct: false },
          ],
          explanation:
            'Cờ `-m 1` hoặc `-m 2` chỉ định commit cha nào được giữ làm nhánh chính khi hoàn tác thay đổi của nhánh kia.',
        },
      ],
    },
  },
  {
    id: '10-merge-conflict',
    moduleId: '03-branching',
    title: 'Xung đột Merge Conflict là gì?',
    duration: 30,
    xp: 90,
    keywords: ['merge conflict', 'xung dot', 'conflict markers', 'ours theirs', 'mau thuan code'],
    prerequisites: ['08-three-way-merge'],
    objectives: [
      'Hiểu rõ nguyên nhân căn bản phát sinh xung đột Merge Conflict trong quá trình làm việc nhóm.',
      'Nhận diện và phân tích cấu trúc của các vạch đánh dấu xung đột (Conflict Markers): `<<<<<<<`, `=======`, `>>>>>>>`.',
      'Phân biệt rõ ràng giữa xung đột nội dung dòng code (Content conflict) và xung đột tệp tin (File rename/delete conflict).',
      'Giữ bình tĩnh và thực hiện quy trình chẩn đoán trạng thái conflict một cách bài bản.',
    ],
    definition:
      'Merge Conflict (Xung đột hợp nhất) là tình huống xảy ra khi thuật toán Three-way merge của Git phát hiện hai nhánh cùng sửa đổi các dòng code giống nhau trong cùng một tệp tin (hoặc một bên sửa nội dung trong khi bên kia xóa tệp tin) kể từ commit tổ tiên chung. Do Git là một hệ thống quản lý phiên bản trung lập không thể tự ý suy đoán ý đồ kinh doanh của lập trình viên, Git sẽ tạm dừng tiến trình merge, bảo vệ mã nguồn nguyên vẹn và chèn các vạch đánh dấu xung đột (Conflict Markers) trực tiếp vào tệp tin để con người tự quyết định.',
    why:
      'Xung đột mã nguồn là một phần tất yếu và không thể tránh khỏi trong bất kỳ dự án phần mềm chuyên nghiệp nào có nhiều người cùng tham gia đóng góp. Người mới học thường rất sợ hãi và coi conflict là một tai họa hỏng hóc nghiêm trọng. Tuy nhiên, các kỹ sư phần mềm kỳ cựu hiểu rằng conflict thực chất là một cơ chế an toàn tuyệt vời của Git để ngăn chặn việc một người vô tình ghi đè và làm biến mất công sức lập trình của người khác mà không có sự đồng thuận.',
    mentalModel:
      'Hãy hình dung hai kiến trúc sư cùng chỉnh sửa bản vẽ thiết kế mặt bằng của một căn biệt thự. Kiến trúc sư A quyết định đặt một lò sưởi ấm cúng bằng đá cẩm thạch tại góc phòng khách, trong khi Kiến trúc sư B lại quyết định đặt một bể cá cảnh biển nhiệt đới đúng ngay tại tọa độ góc phòng khách đó. Khi thợ xây (Git) cầm hai bản thiết kế lại gần nhau, thợ xây không thể tự ý quyết định nên xây lò sưởi hay đặt bể cá, nên sẽ gọi cả hai kiến trúc sư ra công trường ngồi lại với nhau để thống nhất giải pháp cuối cùng.',
    diagram: `Cấu trúc các vạch đánh dấu xung đột Conflict Markers:
<<<<<<< HEAD (Nhánh hiện tại bạn đang đứng - ví dụ: main)
const apiUrl = "https://api.production.vn/v1";
=======
const apiUrl = "https://api.staging.vn/v2";
>>>>>>> feature-api (Nhánh bạn đang gộp vào - ví dụ: feature-api)`,
    example:
      'Trong tệp cấu hình config.js của dự án backend, lập trình viên An sửa cổng máy chủ thành `port = 8080` trên nhánh main, trong khi lập trình viên Bình sửa thành `port = 9000` trên nhánh feature-server phục vụ môi trường kiểm thử. Khi An chạy câu lệnh `git merge feature-server` vào main, Git lập tức phát hiện cả hai người cùng sửa đổi đúng dòng số 12 của tệp config.js. Git dừng tiến trình merge và thông báo rõ ràng: "CONFLICT (content): Merge conflict in config.js. Automatic merge failed; fix conflicts and then commit the result." An bình tĩnh mở tệp ra và thấy Git đã chèn các vạch đánh dấu xung đột để chờ hai lập trình viên thảo luận giải pháp giữ cổng phù hợp.',
    commands: [
      'git status',
      'git diff',
      'git merge --abort',
    ],
    explanation:
      '- `git status`: Hiển thị rõ danh sách các tệp tin đang bị xung đột ở mục "Unmerged paths" bằng màu đỏ rực rỡ.\n- `git diff`: So sánh và in ra chi tiết các khối xung đột giữa hai bên ngay trên màn hình dòng lệnh.\n- `git merge --abort`: Chiếc phanh khẩn cấp giúp bạn hủy bỏ toàn bộ quá trình merge và quay về trạng thái sạch sẽ trước khi gõ lệnh merge.',
    mistakes: [
      'Hoảng sợ xóa toàn bộ thư mục dự án khi gặp conflict: Conflict là chuyện hết sức bình thường, chỉ cần mở tệp ra chọn code giữ lại.',
      'Commit tệp tin khi chưa xóa các vạch đánh dấu `<<<<<<<`, `=======`: Sẽ làm vỡ mã nguồn và khiến dự án bị lỗi biên dịch cú pháp nghiêm trọng.',
      'Tự ý xóa code của đồng nghiệp mà không trao đổi: Có thể làm hỏng tính năng mà đồng nghiệp đã tốn cả tuần để xây dựng.',
    ],
    labSteps: [
      'Tạo xung đột cố ý bằng cách sửa cùng một dòng trong `app.js` trên hai nhánh `main` và `conflict-branch`.',
      'Thực hiện `git merge conflict-branch` từ nhánh `main` để kích hoạt xung đột.',
      'Chạy `git status` và quan sát mục `Unmerged paths: both modified: app.js`.',
      'Mở tệp `app.js` để tận mắt nhìn thấy các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`.',
    ],
    hint: 'Phần giữa `<<<<<<< HEAD` và `=======` là code của bạn; phần giữa `=======` và `>>>>>>>` là code của nhánh kia.',
    validation: 'Nhận diện đúng khối conflict markers trong tệp tin bị xung đột.',
    quizPrompt: 'Hãy hoàn thành bài trắc nghiệm dưới đây về nguyên nhân và cấu trúc của Merge Conflict.',
    challenge: 'Giải thích sự khác nhau giữa Content Conflict và Binary Conflict (ví dụ xung đột trên tệp ảnh PNG).',
    summary: [
      'Merge Conflict xảy ra khi hai nhánh cùng sửa đổi cùng một dòng code kể từ điểm rẽ nhánh.',
      'Git chèn các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>` để con người tự quyết định.',
      'Conflict là cơ chế an toàn bảo vệ dữ liệu, không phải là lỗi hỏng hóc của hệ thống Git.',
    ],
    quiz: {
      id: 'quiz-03-10-merge-conflict',
      title: 'Trắc nghiệm: Bản chất Merge Conflict',
      questions: [
        {
          id: 'q1',
          question: 'Nguyên nhân cốt lõi dẫn đến việc phát sinh Merge Conflict trong Git là gì?',
          type: 'single',
          options: [
            { text: 'Hai nhánh cùng chỉnh sửa các dòng code giống nhau trong cùng một tệp kể từ commit tổ tiên chung', correct: true },
            { text: 'Do máy tính của lập trình viên bị nhiễm virus phần mềm độc hại', correct: false },
            { text: 'Do kho lưu trữ Git đã vượt quá giới hạn 100 commit', correct: false },
            { text: 'Do lập trình viên gõ sai tên tác giả trong lệnh git config', correct: false },
          ],
          explanation:
            'Xung đột xảy ra khi Git phát hiện hai thay đổi mâu thuẫn trên cùng một vị trí dòng code mà không thể tự giải quyết.',
        },
        {
          id: 'q2',
          question: 'Trong cấu trúc Conflict Markers, phần nội dung nằm giữa `<<<<<<< HEAD` và `=======` đại diện cho điều gì?',
          type: 'single',
          options: [
            { text: 'Nội dung code hiện tại của nhánh bạn đang đứng trực tiếp (OURS)', correct: true },
            { text: 'Nội dung code của nhánh mà bạn đang muốn gộp vào (THEIRS)', correct: false },
            { text: 'Nội dung code của bản phát hành đầu tiên cách đây mười năm', correct: false },
            { text: 'Mã nguồn do trí tuệ nhân tạo tự động viết thêm', correct: false },
          ],
          explanation:
            'Phần trên `=======` là HEAD (nhánh hiện tại bạn đang đứng); phần dưới là nhánh đang được merge vào.',
        },
        {
          id: 'q3',
          question: 'Ký hiệu `>>>>>>> <tên-nhánh>` trong tệp xung đột đánh dấu điều gì?',
          type: 'single',
          options: [
            { text: 'Điểm kết thúc của khối code đến từ nhánh đang được gộp vào', correct: true },
            { text: 'Điểm bắt đầu của một hàm lập trình mới', correct: false },
            { text: 'Vị trí tệp tin bị virus máy tính tấn công', correct: false },
            { text: 'Lệnh thoát khỏi cửa sổ terminal', correct: false },
          ],
          explanation:
            '`>>>>>>>` là vạch kết thúc của khối thay đổi đến từ nhánh nguồn (theirs).',
        },
        {
          id: 'q4',
          question: 'Khi xảy ra conflict, lệnh nào hiển thị danh sách các tệp tin đang bị xung đột cần xử lý?',
          type: 'single',
          options: [
            { text: 'git status', correct: true },
            { text: 'git crash-report', correct: false },
            { text: 'git clean-all', correct: false },
            { text: 'git emergency', correct: false },
          ],
          explanation:
            '`git status` liệt kê rõ ràng các tệp conflict dưới mục `Unmerged paths: both modified: <file>`.',
        },
        {
          id: 'q5',
          question: 'Tại sao lập trình viên không được phép để sót lại các ký tự `<<<<<<<` hoặc `=======` trong mã nguồn khi commit?',
          type: 'single',
          options: [
            { text: 'Vì đây là các ký tự đánh dấu của Git, để sót lại sẽ khiến trình biên dịch báo lỗi cú pháp và làm hỏng ứng dụng', correct: true },
            { text: 'Vì Git sẽ tự động xóa tài khoản GitHub của bạn nếu phát hiện', correct: false },
            { text: 'Vì các ký tự này làm máy tính bị quá tải bộ nhớ RAM', correct: false },
            { text: 'Vì tổ chức tiêu chuẩn W3C nghiêm cấm sử dụng các ký tự này', correct: false },
          ],
          explanation:
            'Conflict markers là văn bản thô; để lại trong code sẽ làm gãy cú pháp chương trình.',
        },
        {
          id: 'q6',
          question: 'Nếu cảm thấy chưa sẵn sàng giải quyết conflict và muốn quay về trạng thái sạch sẽ ban đầu, bạn dùng lệnh gì?',
          type: 'single',
          options: [
            { text: 'git merge --abort', correct: true },
            { text: 'git cancel now', correct: false },
            { text: 'git delete conflict', correct: false },
            { text: 'git undo everything', correct: false },
          ],
          explanation:
            '`git merge --abort` khôi phục trạng thái Working Tree và HEAD về chính xác trước khi ra lệnh merge.',
        },
      ],
    },
  },
  {
    id: '11-resolve-conflict',
    moduleId: '03-branching',
    title: 'Kỹ thuật Resolve Conflict từng bước',
    duration: 35,
    xp: 120,
    keywords: ['resolve conflict', 'giai quyet xung dot', 'accept current', 'accept incoming', 'git add resolve'],
    prerequisites: ['10-merge-conflict'],
    objectives: [
      'Nắm vững quy trình chuẩn 4 bước giải quyết xung đột Merge Conflict trong môi trường chuyên nghiệp.',
      'Sử dụng thành thạo các tùy chọn giải quyết: Accept Current Change, Accept Incoming Change, hoặc Accept Both.',
      'Hiểu rõ tầm quan trọng sống còn của thao tác `git add <file>` sau khi sửa xong conflict.',
      'Biết cách trao đổi với đồng nghiệp trước khi đưa ra quyết định giữ lại dòng code nào.',
    ],
    definition:
      'Resolve Conflict (Giải quyết xung đột) là quy trình thủ công mang tính quyết định của con người nhằm loại bỏ các điểm mâu thuẫn trong mã nguồn khi merge. Quy trình này bao gồm: mở tệp tin bị xung đột, đọc hiểu cả hai khối thay đổi, lựa chọn giữ lại code của nhánh hiện tại (Current / Ours), giữ lại code của nhánh được gộp (Incoming / Theirs), hoặc kết hợp cả hai, xóa sạch các vạch đánh dấu `<<<<<<<`, `=======`, `>>>>>>>`, lưu tệp lại, chạy lệnh `git add` để thông báo cho Git biết tệp đã được giải quyết, và cuối cùng hoàn tất bằng `git commit`.',
    why:
      'Kỹ năng giải quyết xung đột một cách chuẩn mực và tự tin là ranh giới phân biệt giữa một lập trình viên nghiệp dư và một kỹ sư phần mềm thực thụ. Giải quyết conflict ẩu tả hoặc xóa nhầm code của đồng nghiệp là nguyên nhân hàng đầu làm phát sinh các lỗi ngầm nghiêm trọng trên môi trường production. Làm chủ kỹ thuật 4 bước này giúp bạn biến một tình huống căng thẳng thành một cơ hội phối hợp nhóm ăn ý và nâng cao chất lượng mã nguồn.',
    mentalModel:
      'Hãy hình dung việc giải quyết conflict giống như việc hai luật sư cùng ngồi lại để thống nhất một điều khoản hợp đồng kinh tế bị mâu thuẫn. Luật sư bên mua đưa ra đề xuất thanh toán trong 30 ngày (Current), luật sư bên bán đề xuất thanh toán ngay trong 7 ngày (Incoming). Hai người ngồi lại đàm phán và thống nhất phương án hòa giải: thanh toán 50% trong 7 ngày và 50% còn lại trong 30 ngày (Accept Both & Edit). Sau khi xóa bỏ các ghi chú tranh cãi trên bản thảo, cả hai bên cùng ký tên đóng dấu (git add và git commit).',
    diagram: `Quy trình 4 bước chuẩn Resolve Conflict:
[Bước 1: Chẩn đoán]  ──► git status (Xác định danh sách tệp Unmerged)
                               │
                               ▼
[Bước 2: Sửa thủ công] ──► Mở file, chọn code giữ lại, xóa sạch <<<< ==== >>>>
                               │
                               ▼
[Bước 3: Đánh dấu xong] ──► git add <file> (Báo cho Git tệp đã Resolved)
                               │
                               ▼
[Bước 4: Hoàn tất]    ──► git commit (Đóng gói tạo Merge Commit hoàn chỉnh)`,
    example:
      'Trong tệp thanh toán payment.js của sàn thương mại điện tử, nhánh main có hàm tính thuế VAT 8% cho đơn hàng, trong khi nhánh feature-discount lại có hàm áp dụng mã giảm giá 20% cho thành viên mới. Khi lập trình viên thực hiện merge hai nhánh, Git báo conflict tại khối hàm tính tiền thanh toán. Lập trình viên mở trình soạn thảo, xem xét cả hai đoạn mã và nhận thấy cả hai logic đều vô cùng cần thiết: khách hàng vừa được hưởng giảm giá 20% vừa phải nộp thuế VAT 8% theo luật định. Lập trình viên kết hợp cả hai khối logic vào một hàm tính toán hoàn chỉnh, xóa sạch các dòng đánh dấu xung đột, lưu tệp lại rồi chạy: `git add payment.js` và `git commit -m "merge: integrate discount and tax calculation"`. Toàn bộ hệ thống thanh toán sau đó vượt qua các bài kiểm thử tự động một cách hoàn hảo.',
    commands: [
      'git status',
      'git add <tên-tệp-đã-sửa>',
      'git commit',
      'git commit -m "merge: resolved conflict in <tên-tệp>"',
    ],
    explanation:
      '- `git status`: Kiểm tra tình trạng giải quyết; các tệp đã sửa và `git add` sẽ chuyển sang màu xanh lá trong Staging Area.\n- `git add <file>`: Cực kỳ quan trọng! Lệnh này đánh dấu cho Git biết tệp tin đã được giải quyết xung đột thành công (Mark as resolved).\n- `git commit`: Hoàn tất quá trình tạo Merge Commit sau khi tất cả các tệp unmerged đã được git add.\n- `git commit -m "<thông-điệp>"`: Tạo merge commit với thông điệp tùy chỉnh mô tả rõ cách thức bạn đã giải quyết mâu thuẫn.',
    mistakes: [
      'Quên chạy git add sau khi đã sửa xong tệp: Git sẽ không biết bạn đã sửa xong và lệnh git commit sẽ báo lỗi từ chối.',
      'Tự ý giải quyết code logic của người khác mà không hỏi: Dẫn đến việc xóa nhầm các đoạn xử lý ngoại lệ quan trọng của đồng nghiệp.',
      'Sử dụng git add . mù quáng: Có thể stage nhầm các tệp nháp sinh ra trong quá trình gỡ lỗi xung đột.',
    ],
    labSteps: [
      'Mở tệp `app.js` đang bị xung đột từ bài học trước trong trình soạn thảo.',
      'Xóa các vạch `<<<<<<< HEAD`, `=======`, `>>>>>>> feature` và giữ lại dòng code chuẩn xác nhất.',
      'Lưu tệp tin và chạy lệnh `git add app.js` để đánh dấu đã giải quyết.',
      'Chạy lệnh `git commit` để hoàn tất việc tạo Merge Commit.',
    ],
    hint: 'Nhớ quy tắc vàng: Sửa file -> Xóa vạch markers -> Lưu -> `git add` -> `git commit`.',
    validation: 'Kiểm tra `git status` báo `working tree clean` và đồ thị commit đã được hợp nhất.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về các bước giải quyết xung đột chuyên nghiệp.',
    challenge: 'Mô tả vai trò của công cụ đồ họa 3-way merge tool như VS Code Merge Editor trong việc trực quan hóa conflict.',
    summary: [
      'Quy trình chuẩn: Mở file -> Chọn code đúng -> Xóa markers -> Lưu file -> git add -> git commit.',
      '`git add <file>` là bước bắt buộc để báo cho Git biết xung đột đã được giải quyết xong.',
      'Luôn trao đổi với đồng nghiệp nếu không chắc chắn về logic nghiệp vụ của đoạn code bị mâu thuẫn.',
    ],
    quiz: {
      id: 'quiz-03-11-resolve-conflict',
      title: 'Trắc nghiệm: Kỹ thuật Resolve Conflict từng bước',
      questions: [
        {
          id: 'q1',
          question: 'Sau khi bạn đã mở tệp bị xung đột, chỉnh sửa xong nội dung và xóa sạch các vạch conflict markers, bước tiếp theo BẮT BUỘC phải làm là gì?',
          type: 'single',
          options: [
            { text: 'Chạy lệnh `git add <tên-tệp>` để đánh dấu cho Git biết tệp đó đã được giải quyết xong (Resolved)', correct: true },
            { text: 'Chạy lệnh `git push` ngay lập tức lên GitHub', correct: false },
            { text: 'Xóa tệp tin đó khỏi ổ cứng máy tính', correct: false },
            { text: 'Khởi động lại máy tính cá nhân', correct: false },
          ],
          explanation:
            '`git add <file>` là thao tác kỹ thuật bắt buộc để đưa tệp từ trạng thái Unmerged sang Staged (Resolved).',
        },
        {
          id: 'q2',
          question: 'Trong trình soạn thảo VS Code, nút tùy chọn "Accept Current Change" có tác dụng gì?',
          type: 'single',
          options: [
            { text: 'Chỉ giữ lại đoạn code của nhánh hiện tại bạn đang đứng (HEAD) và xóa bỏ đoạn code của nhánh kia', correct: true },
            { text: 'Chỉ giữ lại đoạn code của nhánh đang được gộp vào', correct: false },
            { text: 'Giữ lại cả hai đoạn code của cả hai nhánh', correct: false },
            { text: 'Xóa sạch toàn bộ tệp tin khỏi dự án', correct: false },
          ],
          explanation:
            'Current Change là code của nhánh hiện tại (HEAD/Ours); chọn nút này sẽ giữ code hiện tại và bỏ code incoming.',
        },
        {
          id: 'q3',
          question: 'Điều gì sẽ xảy ra nếu bạn cố gắng chạy lệnh `git commit` khi vẫn còn tệp tin nằm trong mục "Unmerged paths"?',
          type: 'single',
          options: [
            { text: 'Git sẽ từ chối commit và thông báo bạn cần giải quyết xung đột và git add trước', correct: true },
            { text: 'Git sẽ tự động xóa tất cả các tệp bị xung đột', correct: false },
            { text: 'Git sẽ tự động chọn ngẫu nhiên một nhánh để giữ lại', correct: false },
            { text: 'Git sẽ khóa vĩnh viễn kho lưu trữ của bạn', correct: false },
          ],
          explanation:
            'Git bảo vệ an toàn dữ liệu tuyệt đối: chừng nào còn tệp unmerged, Git kiên quyết từ chối cho phép commit.',
        },
        {
          id: 'q4',
          question: 'Nếu logic của cả hai nhánh đều đúng và cần thiết cho hệ thống, giải pháp xử lý conflict chuẩn xác nhất là gì?',
          type: 'single',
          options: [
            { text: 'Chọn "Accept Both" hoặc tự tay kết hợp cả hai logic vào cùng một khối code hoàn chỉnh', correct: true },
            { text: 'Xóa bỏ cả hai đoạn code để không ai được dùng', correct: false },
            { text: 'Tạo hai tệp tin mới với hai tên khác nhau', correct: false },
            { text: 'Bỏ qua không thèm sửa và đẩy lỗi lên cho khách hàng', correct: false },
          ],
          explanation:
            'Nhiều tình huống đòi hỏi kết hợp cả hai chức năng (Accept Both) và chỉnh sửa lại để logic ăn khớp.',
        },
        {
          id: 'q5',
          question: 'Thói quen xấu nào nguy hiểm nhất khi giải quyết conflict trong một đội ngũ đông người?',
          type: 'single',
          options: [
            { text: 'Tự ý xóa sạch code của đồng nghiệp mà không hề trao đổi hay hiểu rõ mục đích của đoạn code đó', correct: true },
            { text: 'Hỏi ý kiến đồng nghiệp trước khi đưa ra quyết định', correct: false },
            { text: 'Chạy kiểm thử tự động sau khi giải quyết xong xung đột', correct: false },
            { text: 'Đọc kỹ thông báo git status trước khi gõ lệnh', correct: false },
          ],
          explanation:
            'Giao tiếp là chìa khóa: không bao giờ tự ý xóa code của người khác nếu chưa hiểu rõ chức năng.',
        },
        {
          id: 'q6',
          question: 'Sau khi hoàn tất lệnh `git commit` kết thúc quá trình merge conflict, trạng thái của kho lưu trữ sẽ như thế nào?',
          type: 'single',
          options: [
            { text: 'Trở về trạng thái sạch sẽ `nothing to commit, working tree clean` và đồ thị xuất hiện Merge Commit mới', correct: true },
            { text: 'Vẫn bị kẹt trong trạng thái conflict mãi mãi', correct: false },
            { text: 'Tất cả các nhánh cũ bị xóa sạch', correct: false },
            { text: 'Mã nguồn bị chuyển sang chế độ chỉ đọc', correct: false },
          ],
          explanation:
            'Commit thành công sẽ đóng tiến trình merge, đưa Working Tree về trạng thái clean và hoàn tất đồ thị DAG.',
        },
      ],
    },
  },
  {
    id: '12-merge-abort',
    moduleId: '03-branching',
    title: 'Hủy bỏ quá trình merge với git merge --abort',
    duration: 25,
    xp: 80,
    keywords: ['git merge --abort', 'huy bo merge', 'rollback merge', 'safety brake', 'abort conflict'],
    prerequisites: ['11-resolve-conflict'],
    objectives: [
      'Hiểu rõ cơ chế hoạt động của lệnh cứu hộ khẩn cấp `git merge --abort`.',
      'Nhận biết các tình huống thực tế nên chủ động hủy bỏ quá trình merge.',
      'Khôi phục Working Tree và con trỏ HEAD về chính xác trạng thái sạch sẽ trước khi merge.',
      'Tự tin xử lý tình huống merge nhầm nhánh mà không làm hỏng dữ liệu.',
    ],
    definition:
      '`git merge --abort` là câu lệnh cứu hộ chuyên dụng được thiết kế như một chiếc phanh khẩn cấp trong Git, cho phép bạn ngay lập tức hủy bỏ toàn bộ quá trình hợp nhất đang diễn ra dở dang (khi gặp conflict hoặc khi nhận ra mình đã merge nhầm nhánh). Lệnh này sẽ tự động dọn dẹp sạch sẽ tất cả các vạch đánh dấu xung đột, loại bỏ các tệp tin tạm thời và khôi phục toàn bộ trạng thái của Working Tree, Staging Area và con trỏ HEAD trở về chính xác mốc an toàn trước khi bạn gõ lệnh `git merge`.',
    why:
      'Trong thực tế, không ít lần bạn gõ nhầm lệnh merge một nhánh không liên quan, hoặc khi mở các tệp xung đột ra thì phát hiện có hàng trăm khối conflict phức tạp vượt quá khả năng xử lý tức thời của bạn. Thay vì hoảng loạn chỉnh sửa lung tung làm hỏng thêm mã nguồn, bạn chỉ cần gõ một câu lệnh `git merge --abort` duy nhất để đưa mọi thứ quay trở lại vạch xuất phát an toàn 100% trong một phần nghìn giây.',
    mentalModel:
      'Hãy hình dung lệnh `git merge --abort` giống như nút bấm "Hủy giao dịch" (Cancel Transaction) trên cây rút tiền tự động ATM, hoặc phím Escape (Esc) khẩn cấp trên bàn phím. Khi bạn đưa thẻ vào máy và lỡ bấm nhầm ngôn ngữ hoặc bấm nhầm số tiền rút quá lớn, bạn không cần phải rút phích cắm điện của cây ATM, mà chỉ việc bấm nút Hủy giao dịch để chiếc máy nhả thẻ ra nguyên vẹn và kết thúc phiên làm việc an toàn.',
    diagram: `Cơ chế quay lui của git merge --abort:
Trạng thái A (Sạch sẽ) ──(git merge)──► Trạng thái Conflict (Dở dang)
        ▲                                          │
        └─────────── git merge --abort ────────────┘
         (Phục hồi nguyên vẹn trạng thái A ban đầu)`,
    example:
      'Kỹ sư Tuấn đang đứng ở nhánh main định merge nhánh bugfix-login, nhưng do sơ suất gõ nhầm tên nhánh nên đã gõ nhầm thành lệnh: `git merge feature-huge-refactor`. Màn hình console lập tức tràn ngập thông báo conflict ở hơn 40 tệp tin khác nhau với hàng ngàn dòng code mâu thuẫn phức tạp. Nhận thấy mình đã merge nhầm một nhánh thử nghiệm dở dang của đồng nghiệp vào nhánh ổn định, Tuấn không hề hoảng sợ mà bình tĩnh mở terminal gõ ngay: `git merge --abort`. Ngay lập tức trong một tích tắc, toàn bộ 40 tệp tin bị conflict biến mất hoàn toàn, nhánh main quay trở lại trạng thái sạch sẽ tinh tươm ban đầu, sẵn sàng để Tuấn gõ lại câu lệnh merge chính xác.',
    commands: [
      'git merge --abort',
      'git status',
      'git merge --quit',
    ],
    explanation:
      '- `git merge --abort`: Hủy bỏ hoàn toàn tiến trình merge đang dở dang và phục hồi trạng thái trước khi merge.\n- `git status`: Kiểm tra lại để xác nhận trạng thái kho lưu trữ đã trở về `working tree clean` sạch sẽ.\n- `git merge --quit`: Hủy bỏ tiến trình merge nhưng giữ lại các thay đổi hiện tại trong Working Directory (ít dùng hơn abort).',
    mistakes: [
      'Chạy git merge --abort khi không có tiến trình merge nào đang diễn ra: Git sẽ báo lỗi `fatal: There is no merge to abort`.',
      'Sử dụng git reset --hard thay vì git merge --abort: Dù cùng khôi phục trạng thái nhưng `git merge --abort` chuyên trách và an toàn hơn nhiều.',
      'Cố chấp giải quyết hàng chục conflict khi merge nhầm nhánh: Thay vì tốn hàng giờ sửa nhầm, hãy abort ngay lập tức để quay lại ban đầu.',
    ],
    labSteps: [
      'Tạo một xung đột merge có chủ đích giữa hai nhánh.',
      'Quan sát thông báo conflict và kiểm tra trạng thái bằng `git status`.',
      'Chạy câu lệnh cứu hộ `git merge --abort`.',
      'Chạy lại `git status` và xác nhận mọi thứ đã trở về trạng thái sạch sẽ hoàn toàn.',
    ],
    hint: 'Bất cứ khi nào bạn cảm thấy quá tải trước xung đột, hãy nhớ tới `git merge --abort`.',
    validation: 'Khôi phục thành công dự án về trạng thái sạch sẽ trước khi merge.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về lệnh hủy bỏ merge git merge --abort.',
    challenge: 'Nêu sự khác biệt giữa `git merge --abort` và `git merge --quit` trong Git.',
    summary: [
      '`git merge --abort` là phanh khẩn cấp để hủy bỏ quá trình merge đang gặp xung đột.',
      'Khôi phục hoàn toàn Working Tree và HEAD về mốc an toàn trước khi gõ lệnh merge.',
      'Giúp bạn tự tin thử nghiệm merge mà không sợ làm hỏng kho lưu trữ.',
    ],
    quiz: {
      id: 'quiz-03-12-merge-abort',
      title: 'Trắc nghiệm: Hủy bỏ quá trình merge',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh `git merge --abort` được sử dụng trong trường hợp nào là phù hợp nhất?',
          type: 'single',
          options: [
            { text: 'Khi quá trình merge đang gặp xung đột (conflict) hoặc khi bạn lỡ merge nhầm nhánh và muốn quay lại ban đầu', correct: true },
            { text: 'Khi bạn muốn xóa vĩnh viễn toàn bộ kho chứa Git', correct: false },
            { text: 'Khi bạn muốn đẩy code lên máy chủ GitHub', correct: false },
            { text: 'Khi bạn muốn tạo một commit mới', correct: false },
          ],
          explanation:
            '`--abort` là chiếc phanh an toàn giúp hủy bỏ tiến trình merge dở dang và quay về trạng thái sạch ban đầu.',
        },
        {
          id: 'q2',
          question: 'Sau khi chạy lệnh `git merge --abort`, các tệp tin trong Working Directory sẽ như thế nào?',
          type: 'single',
          options: [
            { text: 'Được phục hồi nguyên vẹn 100% về trạng thái trước khi bạn thực hiện câu lệnh git merge', correct: true },
            { text: 'Bị xóa sạch toàn bộ khỏi ổ cứng', correct: false },
            { text: 'Vẫn giữ nguyên các vạch đánh dấu xung đột conflict markers', correct: false },
            { text: 'Tự động được tải lên trang web của công ty', correct: false },
          ],
          explanation:
            'Git dọn dẹp sạch sẽ các conflict markers và trả lại trạng thái trước khi ra lệnh merge.',
        },
        {
          id: 'q3',
          question: 'Điều gì sẽ xảy ra nếu bạn chạy `git merge --abort` khi kho lưu trữ đang ở trạng thái bình thường (không có merge dở dang)?',
          type: 'single',
          options: [
            { text: 'Git sẽ in thông báo lỗi: `fatal: There is no merge to abort`', correct: true },
            { text: 'Git sẽ tự động tạo một merge commit ngẫu nhiên', correct: false },
            { text: 'Máy tính sẽ tự động tắt nguồn', correct: false },
            { text: 'Toàn bộ lịch sử commit bị xóa sạch', correct: false },
          ],
          explanation:
            'Lệnh abort chỉ có hiệu lực khi đang tồn tại một tiến trình merge dở dang (có tệp .git/MERGE_HEAD).',
        },
        {
          id: 'q4',
          question: 'Tại sao `git merge --abort` lại được khuyến nghị sử dụng hơn là `git reset --hard` khi muốn thoát merge conflict?',
          type: 'single',
          options: [
            { text: 'Vì nó là lệnh chuyên trách rõ nghĩa, an toàn và bảo vệ các thay đổi chưa commit từ trước tốt hơn', correct: true },
            { text: 'Vì git reset --hard chỉ chạy được trên máy tính chạy hệ điều hành macOS', correct: false },
            { text: 'Vì git reset --hard bắt buộc phải có kết nối mạng Internet', correct: false },
            { text: 'Vì git merge --abort tự động giải quyết xung đột bằng trí tuệ nhân tạo', correct: false },
          ],
          explanation:
            '`--abort` được thiết kế chuyên biệt cho ngữ cảnh merge, tránh các rủi ro xóa nhầm dữ liệu của reset hard.',
        },
        {
          id: 'q5',
          question: 'Dấu hiệu nào trong thư mục `.git` cho biết hệ thống đang ở giữa một tiến trình merge dở dang?',
          type: 'single',
          options: [
            { text: 'Sự tồn tại của tệp `.git/MERGE_HEAD` chứa mã băm của commit đang được gộp', correct: true },
            { text: 'Tệp tin `.git/PASSWORDS` bị rò rỉ', correct: false },
            { text: 'Thư mục `.git` bị biến mất hoàn toàn', correct: false },
            { text: 'Đèn bàn phím máy tính nhấp nháy liên tục', correct: false },
          ],
          explanation:
            'Git tạo tệp tin `.git/MERGE_HEAD` để ghi nhận commit đang merge; khi abort hoặc commit xong, tệp này bị xóa đi.',
        },
        {
          id: 'q6',
          question: 'Lệnh `git merge --quit` khác với `git merge --abort` ở điểm cơ bản nào?',
          type: 'single',
          options: [
            { text: '`--quit` hủy bỏ trạng thái merge nhưng vẫn giữ nguyên các thay đổi hiện tại trong thư mục làm việc', correct: true },
            { text: '`--quit` tự động tắt màn hình máy tính', correct: false },
            { text: '`--quit` xóa sạch tất cả các commit cũ', correct: false },
            { text: 'Hai cờ này hoàn toàn giống nhau không có khác biệt nào', correct: false },
          ],
          explanation:
            '`--abort` hoàn tác cả Working Tree và Staging Area về ban đầu, trong khi `--quit` chỉ dọn trạng thái merge mà để lại file dở dang.',
        },
      ],
    },
  },
  {
    id: '13-delete-rename-branch',
    moduleId: '03-branching',
    title: 'Xóa và đổi tên nhánh an toàn',
    duration: 25,
    xp: 80,
    keywords: ['delete branch', 'rename branch', 'git branch -d', 'git branch -m', 'don dep nhanh'],
    prerequisites: ['03-git-branch'],
    objectives: [
      'Nắm vững kỹ thuật dọn dẹp và bảo trì hệ thống nhánh sau khi hoàn tất tính năng.',
      'Sử dụng thành thạo cú pháp đổi tên nhánh hiện tại và đổi tên nhánh bất kỳ từ xa.',
      'Phân biệt rõ ràng giữa cờ an toàn `-d` và cờ cưỡng chế `-D` khi xóa nhánh.',
      'Hiểu cách xóa nhánh trên máy chủ từ xa thông qua lệnh `git push origin --delete <nhánh>`.',
    ],
    definition:
      'Xóa và đổi tên nhánh là các thao tác bảo trì thiết yếu trong vòng đời phát triển phần mềm, giúp giữ cho kho lưu trữ Git luôn tinh gọn, dễ quản lý và tuân thủ các quy chuẩn đặt tên của đội ngũ kỹ thuật. Thao tác xóa nhánh trong Git chỉ đơn thuần là xóa bỏ một tệp con trỏ nhỏ 41 byte trong thư mục `.git/refs/heads/`, trong khi các commit object bên dưới vẫn tồn tại an toàn trong cơ sở dữ liệu cho đến khi trình thu gom rác (Garbage Collector) hoạt động.',
    why:
      'Trong quá trình phát triển dự án, việc đặt tên nhánh sai chính tả, đặt tên không đúng quy ước (ví dụ: thiếu tiền tố `feature/` hoặc `bugfix/`) xảy ra thường xuyên. Khả năng đổi tên nhánh nhanh chóng giúp bạn chuẩn hóa quy trình trước khi tạo Pull Request. Ngoài ra, việc chủ động xóa các nhánh đã hoàn thành và đã được merge giúp đồng nghiệp không bị bối rối trước một danh sách hàng chục nhánh cũ đã lỗi thời.',
    mentalModel:
      'Hãy hình dung các con trỏ nhánh giống như những chiếc thẻ đánh dấu trang sách (Bookmark) kẹp vào các trang của một cuốn bách khoa toàn thư. Khi bạn đọc xong một chương sách và ghi nhớ trọn vẹn kiến thức (đã merge), bạn rút chiếc thẻ đánh dấu trang đó ra cất đi (xóa nhánh) để cuốn sách gọn gàng. Các trang sách và nội dung chữ bên trong cuốn sách (các commit) hoàn toàn không hề bị rách hay biến mất, chúng vẫn nằm nguyên vẹn trong gáy cuốn sách.',
    diagram: `Cơ chế rút thẻ đánh dấu trang (Xóa nhánh):
Trước khi xóa:
main ──────────► Commit C3
feature-cart ──► Commit C3 (Trỏ cùng commit C3)

Sau khi chạy: git branch -d feature-cart
main ──────────► Commit C3
(Chỉ có con trỏ feature-cart bị gỡ bỏ, Commit C3 vẫn an toàn 100%)`,
    example:
      'Lập trình viên Long vừa hoàn tất và merge thành công nhánh tính năng feature-auth vào nhánh main của dự án công ty. Khi kiểm tra lại danh sách các nhánh trên máy tính cá nhân, Long thấy nhánh cũ vẫn còn tồn tại và hiển thị trong terminal. Long nhanh chóng chuyển về nhánh main bằng câu lệnh `git switch main` rồi tự tin thực thi lệnh: `git branch -d feature-auth`. Git kiểm tra thấy toàn bộ commit đã được tích hợp an toàn và in ra thông báo: "Deleted branch feature-auth (was 7a9c1e2)." Danh sách nhánh của Long giờ đây chỉ còn lại nhánh main sạch sẽ, tinh tươm, giúp Long tập trung cao độ và sẵn sàng nhận nhiệm vụ tiếp theo từ đội ngũ mà không sợ nhầm lẫn.',
    commands: [
      'git branch -m <tên-mới>',
      'git branch -m <tên-cũ> <tên-mới>',
      'git branch -d <tên-nhánh>',
      'git branch -D <tên-nhánh>',
      'git push origin --delete <tên-nhánh>',
    ],
    explanation:
      '- `git branch -m <tên-mới>`: Đổi tên nhánh hiện tại bạn đang đứng sang tên mới.\n- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên một nhánh bất kỳ mà không cần phải chuyển sang nhánh đó.\n- `git branch -d <tên-nhánh>`: Xóa nhánh an toàn (chỉ cho phép xóa nếu nhánh đã được merge vào HEAD).\n- `git branch -D <tên-nhánh>`: Ép buộc xóa nhánh ngay lập tức, hữu ích khi muốn vứt bỏ nhánh code thử nghiệm thất bại.\n- `git push origin --delete <nhánh>`: Xóa con trỏ nhánh tương ứng trên máy chủ từ xa GitHub.',
    mistakes: [
      'Cố gắng xóa nhánh hiện tại: Phải switch sang nhánh khác trước khi xóa.',
      'Sợ mất code khi xóa nhánh đã merge: Nhánh đã merge thì toàn bộ commit đã nằm trong main, xóa con trỏ nhánh con không làm mất một dòng code nào.',
      'Đổi tên nhánh cục bộ nhưng quên cập nhật trên GitHub: Khiến nhánh trên máy và nhánh trên remote bị lệch tên nhau.',
    ],
    labSteps: [
      'Tạo nhánh tạm `temp-name` bằng `git branch temp-name`.',
      'Đổi tên nhánh thành `proper-feature` bằng `git branch -m temp-name proper-feature`.',
      'Kiểm tra lại bằng `git branch` để thấy tên mới.',
      'Xóa nhánh đó bằng `git branch -d proper-feature`.',
    ],
    hint: 'Nhớ quy tắc: `-d` là xóa an toàn (delete), `-m` là đổi tên (move).',
    validation: 'Thực hiện đổi tên và xóa nhánh thành công, xác nhận qua `git branch`.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng đổi tên và xóa nhánh an toàn.',
    challenge: 'Nêu cách phục hồi một nhánh vô tình bị xóa bằng cờ `-D` thông qua câu lệnh `git reflog`.',
    summary: [
      'Xóa nhánh chỉ là xóa con trỏ 41 byte, commit đã merge luôn nằm an toàn trong main.',
      'Đổi tên nhánh nhanh chóng bằng cờ `-m`, xóa nhánh an toàn bằng cờ `-d`.',
      'Dọn dẹp nhánh thường xuyên là thói quen chuyên nghiệp của kỹ sư phần mềm.',
    ],
    quiz: {
      id: 'quiz-03-13-delete-rename-branch',
      title: 'Trắc nghiệm: Xóa và đổi tên nhánh an toàn',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh nào sau đây dùng để đổi tên nhánh bạn đang đứng trực tiếp thành `feat/payment`?',
          type: 'single',
          options: [
            { text: 'git branch -m feat/payment', correct: true },
            { text: 'git branch --new-id feat/payment', correct: false },
            { text: 'git rename feat/payment', correct: false },
            { text: 'git switch --rename feat/payment', correct: false },
          ],
          explanation:
            '`git branch -m <new-name>` đổi tên nhánh hiện tại sang tên mới.',
        },
        {
          id: 'q2',
          question: 'Khi bạn chạy lệnh `git branch -d feature` trên một nhánh đã được merge vào main, điều gì thực sự bị xóa?',
          type: 'single',
          options: [
            { text: 'Chỉ có tệp con trỏ tham chiếu 41 byte chứa tên nhánh bị xóa, toàn bộ commit vẫn nằm an toàn trong nhánh main', correct: true },
            { text: 'Toàn bộ các dòng code bạn đã viết trong nhánh feature sẽ bị xóa sạch khỏi ổ cứng', correct: false },
            { text: 'Nhánh main sẽ bị xóa theo', correct: false },
            { text: 'Tài khoản GitHub của bạn sẽ bị đóng băng', correct: false },
          ],
          explanation:
            'Branch chỉ là con trỏ; khi đã merge thì commit đã thuộc về main, xóa branch chỉ gỡ con trỏ phụ.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào dùng để xóa một nhánh có tên là `old-feature` trên máy chủ từ xa GitHub?',
          type: 'single',
          options: [
            { text: 'git push origin --delete old-feature', correct: true },
            { text: 'git remote delete old-feature', correct: false },
            { text: 'git delete-server old-feature', correct: false },
            { text: 'git drop remote old-feature', correct: false },
          ],
          explanation:
            '`git push origin --delete <branch>` gửi chỉ thị xóa con trỏ nhánh trên máy chủ remote.',
        },
        {
          id: 'q4',
          question: 'Trong trường hợp nào Git sẽ kiên quyết từ chối lệnh xóa nhánh an toàn `git branch -d`?',
          type: 'single',
          options: [
            { text: 'Khi nhánh đó chứa các commit mới chưa từng được hợp nhất (merge) vào bất kỳ nhánh nào khác', correct: true },
            { text: 'Khi máy tính bị mất kết nối mạng cáp quang', correct: false },
            { text: 'Khi tên nhánh có chứa dấu gạch nối', correct: false },
            { text: 'Khi nhánh đó có dung lượng nhỏ hơn 1 kilobyte', correct: false },
          ],
          explanation:
            '`-d` có cơ chế bảo vệ ngăn chặn việc vô tình xóa mất commit chưa được hợp nhất.',
        },
        {
          id: 'q5',
          question: 'Để đổi tên một nhánh khác (ví dụ: đổi nhánh `dev` thành `develop`) mà không cần switch sang nhánh đó, bạn dùng cú pháp nào?',
          type: 'single',
          options: [
            { text: 'git branch -m dev develop', correct: true },
            { text: 'git rename-remote dev develop', correct: false },
            { text: 'git switch --move dev develop', correct: false },
            { text: 'git checkout dev --rename develop', correct: false },
          ],
          explanation:
            '`git branch -m <tên-cũ> <tên-mới>` cho phép đổi tên nhánh bất kỳ ngay cả khi không đứng trên nhánh đó.',
        },
        {
          id: 'q6',
          question: 'Nếu bạn vô tình xóa nhầm một nhánh chưa merge bằng lệnh `git branch -D`, công cụ nào giúp bạn tìm lại mã SHA của commit để khôi phục?',
          type: 'single',
          options: [
            { text: 'git reflog', correct: true },
            { text: 'Thùng rác Recycle Bin của hệ điều hành', correct: false },
            { text: 'Trình duyệt Google Chrome', correct: false },
            { text: 'Lệnh ping mạng Internet', correct: false },
          ],
          explanation:
            '`git reflog` ghi lại mọi chuyển dịch của HEAD; bạn có thể tra cứu mã commit đỉnh của nhánh bị xóa để tái tạo lại.',
        },
      ],
    },
  },
  {
    id: '14-branching-challenge',
    moduleId: '03-branching',
    title: 'Thử thách tổng hợp Branching Master',
    duration: 40,
    xp: 150,
    keywords: ['challenge', 'branching master', 'tong hop', 'conflict resolution', 'workflow'],
    prerequisites: ['11-resolve-conflict'],
    objectives: [
      'Áp dụng tổng hợp toàn bộ kỹ năng Level 3 vào một kịch bản phát triển phần mềm đa nhánh thực chiến.',
      'Thực hiện tạo nhánh tính năng, chuyển nhánh, tạo commit độc lập, và phát hiện xung đột.',
      'Giải quyết thành công xung đột Merge Conflict và tạo Merge Commit chuẩn hóa.',
      'Dọn dẹp hệ thống nhánh sạch sẽ sau khi hoàn thành nhiệm vụ.',
    ],
    definition:
      'Thử thách tổng hợp Branching Master là bài kiểm tra năng lực toàn diện của Level 3, mô phỏng một kịch bản làm việc thực tế trong một nhóm phát triển phần mềm: bạn sẽ đóng vai trò một kỹ sư phụ trách tích hợp hai tính năng rẽ nhánh song song, chủ động đối mặt với tình huống xung đột code gay cấn, vận dụng thành thạo các công cụ chẩn đoán và hoàn tất quy trình hợp nhất mã nguồn sạch sẽ.',
    why:
      'Học lý thuyết về Branching và Merging chỉ là bước khởi đầu. Khả năng bình tĩnh xử lý các tình huống phân kỳ lịch sử, đọc hiểu các khối conflict markers phức tạp và tự tin đưa ra quyết định hợp nhất trong thực tế mới là thước đo năng lực thật sự của một kỹ sư Git chuyên nghiệp. Vượt qua thử thách này khẳng định bạn đã hoàn toàn làm chủ kỹ năng rẽ nhánh và hợp nhất.',
    mentalModel:
      'Hãy hình dung thử thách này giống như một bài thi sát hạch lái xe sa hình thực tế trên đường trường. Bạn đã học kỹ lý thuyết về chân phanh, chân ga và gương chiếu hậu (branch, switch, merge). Giờ là lúc bạn trực tiếp ngồi sau vô lăng, lái xe vượt qua những khúc cua ngoạn mục (phân kỳ lịch sử) và xử lý chướng ngại vật bất ngờ (xung đột conflict) để đưa chiếc xe về đích an toàn tuyệt đối.',
    diagram: `Kịch bản thử thách Branching Master:
               Commit C2 ──► Commit C3 (feature-a)
              /                                    \\
Commit C1 ───                                       ──► Commit C5 (Resolved Merge)
              \\                                    /
               Commit C4 (main - both modified) ──┘`,
    example:
      'Trong kịch bản thử thách thực chiến, bạn nhận được nhiệm vụ phát triển ứng dụng bán vé xem phim trực tuyến cho một chuỗi rạp chiếu lớn. Nhánh main vừa cập nhật chính sách giá vé cuối tuần trong tệp ticket.js, trong khi nhánh feature-discount đang sửa logic giảm giá cho học sinh và sinh viên cũng trong đúng tệp ticket.js đó. Bạn tiến hành merge nhánh tính năng vào main, bình tĩnh đối mặt khi Git thông báo xung đột, sử dụng thành thạo kỹ thuật 4 bước để kết hợp cả hai chính sách giá vé vào hàm tính toán chung, chạy kiểm thử thành công, commit hoàn tất và xóa nhánh tính năng an toàn. Kết quả toàn bộ quy trình hợp nhất diễn ra trơn tru mà không làm gián đoạn hệ thống bán vé.',
    commands: [
      'git switch -c feature-challenge',
      'git merge main',
      'git status',
      'git add <resolved-file>',
      'git commit',
      'git branch -d feature-challenge',
    ],
    explanation:
      '- `git switch -c <nhánh>`: Tạo nhánh giải quyết thử thách.\n- `git merge main`: Bắt đầu quá trình hợp nhất kích hoạt kịch bản thử thách.\n- `git status`: Chẩn đoán trạng thái các tệp unmerged.\n- `git add <resolved-file>`: Đánh dấu hoàn tất việc gỡ xung đột.\n- `git commit`: Đóng gói Merge Commit ghi dấu chiến thắng thử thách.\n- `git branch -d <nhánh>`: Dọn dẹp nhánh sau khi hoàn thành xuất sắc.',
    mistakes: [
      'Vội vã commit khi chưa xóa hết các vạch markers: Khiến bài kiểm tra tự động đánh giá thất bại.',
      'Sử dụng git merge --abort giữa chừng: Sẽ làm hủy bỏ toàn bộ bài thi và bạn phải làm lại từ đầu.',
      'Quên xóa nhánh sau khi hoàn thành: Không đạt điểm tối đa ở phần dọn dẹp vệ sinh kho chứa.',
    ],
    labSteps: [
      'Khởi động kịch bản thử thách tổng hợp multi-branch-challenge trong terminal.',
      'Kiểm tra đồ thị nhánh hiện tại bằng `git log --graph --oneline --all`.',
      'Thực hiện hợp nhất nhánh tính năng vào nhánh chính.',
      'Mở tệp xung đột, phân tích và giải quyết mâu thuẫn theo yêu cầu nghiệp vụ.',
      'Đánh dấu hoàn tất bằng `git add` và kết thúc bằng `git commit`.',
      'Xóa nhánh tính năng để hoàn tất 100% thử thách.',
    ],
    hint: 'Bình tĩnh đọc kỹ yêu cầu nghiệp vụ trong đề bài để giữ lại cả hai logic giảm giá và phụ thu.',
    validation: 'Hệ thống chấm điểm tự động xác nhận kho chứa có đồ thị hợp nhất chuẩn và không còn conflict.',
    quizPrompt: 'Làm bài trắc nghiệm tổng kết để củng cố toàn bộ kiến thức của Level 3: Branching & Merging.',
    challenge: 'Mô phỏng lại toàn bộ kịch bản này trên máy tính cá nhân của bạn và giải quyết không cần xem tài liệu.',
    summary: [
      'Nắm vững toàn diện: tạo nhánh, chuyển nhánh, 3-way merge và resolve conflict.',
      'Bình tĩnh phân tích conflict markers và trao đổi logic trước khi đưa ra quyết định.',
      'Luôn dọn dẹp các nhánh đã hoàn thành để duy trì kho lưu trữ chuyên nghiệp.',
    ],
    quiz: {
      id: 'quiz-03-14-branching-challenge',
      title: 'Trắc nghiệm tổng kết: Master Branching & Merging',
      questions: [
        {
          id: 'q1',
          question: 'Quy trình chuẩn mực nhất để phát triển một tính năng mới trong nhóm là gì?',
          type: 'single',
          options: [
            { text: 'Tạo nhánh riêng từ main -> Code và commit -> Kiểm thử -> Merge vào main -> Xóa nhánh tính năng', correct: true },
            { text: 'Code trực tiếp mọi thứ trên nhánh main của công ty', correct: false },
            { text: 'Tạo nhánh mới rồi không bao giờ merge vào main', correct: false },
            { text: 'Gửi code qua Zalo cho đồng nghiệp copy vào máy', correct: false },
          ],
          explanation:
            'Feature Branch Workflow: tách nhánh, phát triển độc lập, kiểm thử, merge và dọn dẹp là chuẩn quốc tế.',
        },
        {
          id: 'q2',
          question: 'Khi gặp Merge Conflict, hành động nào sau đây là SAI LẦM và nghiệp dư nhất?',
          type: 'single',
          options: [
            { text: 'Tự ý xóa code của đồng nghiệp mà không hiểu chức năng rồi commit bừa', correct: true },
            { text: 'Chạy git status để kiểm tra danh sách tệp bị ảnh hưởng', correct: false },
            { text: 'Mở tệp ra xem xét kỹ lưỡng cả hai khối code', correct: false },
            { text: 'Trao đổi với tác giả của nhánh kia để thống nhất giải pháp', correct: false },
          ],
          explanation:
            'Xóa bừa code của người khác thể hiện sự thiếu chuyên nghiệp và gây ra các lỗi ngầm nghiêm trọng.',
        },
        {
          id: 'q3',
          question: 'Thao tác nào sau đây biến một tệp tin từ trạng thái Unmerged sang Staged trong quá trình giải quyết conflict?',
          type: 'single',
          options: [
            { text: 'git add <tên-tệp>', correct: true },
            { text: 'git status', correct: false },
            { text: 'git diff', correct: false },
            { text: 'git branch', correct: false },
          ],
          explanation:
            '`git add` là lệnh báo cho Git biết tệp đó đã được con người giải quyết mâu thuẫn xong.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào giúp bạn kiểm tra toàn diện đồ thị phân nhánh của tất cả các nhánh trong dự án?',
          type: 'single',
          options: [
            { text: 'git log --graph --oneline --all', correct: true },
            { text: 'git branch --list-only', correct: false },
            { text: 'git show --branches', correct: false },
            { text: 'git tree --full', correct: false },
          ],
          explanation:
            '`git log --graph --oneline --all` là câu lệnh vàng để quan sát toàn bộ đồ thị DAG của Git.',
        },
        {
          id: 'q5',
          question: 'Khi giải quyết xung đột, nếu hai phần logic của cả hai nhánh đều cần thiết thì lựa chọn phù hợp nhất là gì?',
          type: 'single',
          options: [
            { text: 'Kết hợp cả hai logic, kiểm thử kỹ lưỡng rồi mới hoàn tất merge commit', correct: true },
            { text: 'Chỉ chọn code của bản thân và xóa hết code người khác', correct: false },
            { text: 'Xóa toàn bộ tệp tin để không ai có lỗi', correct: false },
            { text: 'Bỏ qua và không chạy kiểm thử tự động', correct: false },
          ],
          explanation:
            'Nhiều trường hợp đòi hỏi tích hợp hài hòa cả hai nghiệp vụ để đảm bảo ứng dụng chạy đúng toàn diện.',
        },
        {
          id: 'q6',
          question: 'Tại sao việc dọn dẹp các nhánh đã hoàn thành và đã merge lại là một thực hành tốt trong kỹ thuật phần mềm?',
          type: 'single',
          options: [
            { text: 'Giúp kho lưu trữ luôn tinh gọn, giảm nguy cơ thao tác nhầm trên nhánh cũ và giúp đồng nghiệp dễ theo dõi', correct: true },
            { text: 'Để giải phóng hàng trăm gigabyte dung lượng ổ cứng', correct: false },
            { text: 'Để tránh việc GitHub tính thêm tiền phí lưu trữ nhánh', correct: false },
            { text: 'Vì Git tự động khóa kho chứa nếu có quá mười nhánh', correct: false },
          ],
          explanation:
            'Dọn dẹp các nhánh cũ đã merge là thói quen vệ sinh mã nguồn chuyên nghiệp của mọi kỹ sư Git.',
        },
      ],
    },
  },
];
