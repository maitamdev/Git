import { LessonAuthorData } from './types';

export const LEVEL_4B_LESSONS: LessonAuthorData[] = [
  {
    id: '09-fork',
    moduleId: '04-github-collaboration',
    title: 'Cơ chế Fork trên GitHub',
    duration: 25,
    xp: 80,
    keywords: ['fork', 'github fork', 'sao chep kho', 'dong gop ma nguon mo', 'upstream', 'open source'],
    prerequisites: ['04-git-clone'],
    objectives: [
      'Hiểu rõ bản chất cơ chế Fork trên máy chủ GitHub như một bản sao phía server.',
      'Phân biệt rõ ràng giữa thao tác Fork (trên GitHub) và thao tác Clone (về máy cá nhân).',
      'Nắm bắt quy trình đóng góp mã nguồn mở kinh điển thông qua mô hình Fork & Pull Request.',
      'Quản lý và đồng bộ kho fork cá nhân với kho gốc của dự án.',
    ],
    definition:
      'Fork trong hệ sinh thái GitHub là một thao tác đặc biệt ở tầng máy chủ (server-side clone), cho phép bạn tạo ra một bản sao độc lập hoàn chỉnh của một kho lưu trữ thuộc về người khác hoặc tổ chức khác vào chính tài khoản GitHub cá nhân của bạn. Bản sao này trao cho bạn 100% quyền quản trị (Read/Write) để bạn tự do thử nghiệm, phát triển tính năng hoặc sửa lỗi mà không làm ảnh hưởng tới dự án gốc, đồng thời giữ mối liên kết mạng để có thể gửi yêu cầu gộp code ngược lại dự án gốc.',
    why:
      'Trong thế giới phần mềm mã nguồn mở (Open Source) hoặc trong các tập đoàn lớn, bạn thường không được cấp quyền ghi (Push permission) trực tiếp vào kho mã nguồn chính vì lý do bảo mật và kiểm soát chất lượng. Cơ chế Fork chính là cánh cổng dân chủ mở ra cơ hội đóng góp cho hàng triệu lập trình viên toàn cầu: bất kỳ ai cũng có thể fork dự án về tài khoản mình, cải tiến mã nguồn và gửi tặng lại thành quả cho tác giả ban đầu thông qua Pull Request.',
    mentalModel:
      'Hãy hình dung một công thức nấu món phở gia truyền nổi tiếng được niêm yết trong tủ kính của một nhà hàng lớn (dự án gốc). Bạn không có quyền mở tủ kính để lấy bút viết thêm gia vị vào tờ công thức gốc đó. Tuy nhiên, nhà hàng cho phép bạn lấy máy chụp ảnh chụp lại toàn bộ công thức đem về gian bếp nhà riêng của bạn (Fork). Tại bếp nhà mình, bạn tự do thêm hoa hồi, bớt muối và nấu thử. Nếu món phở nấu theo công thức mới quá ngon, bạn gửi một lá thư mời đầu bếp trưởng nhà hàng nếm thử và áp dụng (Pull Request).',
    diagram: `Quy trình Fork trên GitHub:
[Kho gốc: upstream] (facebook/react)
        │
        ▼ (Thao tác Fork trên GitHub web)
[Kho cá nhân: origin] (your-account/react)
        │
        ▼ (git clone về máy cá nhân)
[Máy tính của bạn: Local] (lập trình, commit & push lên your-account/react)`,
    example:
      'Lập trình viên Bình phát hiện một lỗi chính tả nghiêm trọng trong tài liệu hướng dẫn của một thư viện mã nguồn mở nổi tiếng có hơn 50.000 lượt yêu thích trên GitHub. Vì không có quyền commit trực tiếp vào kho chứa của tác giả, Bình bấm nút "Fork" ở góc trên bên phải giao diện trang web GitHub. Ngay lập tức, máy chủ GitHub tạo ra một bản sao hoàn chỉnh tại địa chỉ `github.com/binh-dev/famous-lib`. Bình sao chép đường dẫn clone kho này về máy tính cá nhân, sửa lỗi chính tả cẩn thận, tạo commit và đẩy lên tài khoản cá nhân của mình, hoàn toàn sẵn sàng cho việc mở Pull Request gửi về cho ban quản trị thư viện xem xét phê duyệt.',
    commands: [
      'git clone <url-kho-fork-cua-ban>',
      'git remote -v',
      'git remote add upstream <url-kho-goc>',
    ],
    explanation:
      '- `git clone <url-kho-fork>`: Tải bản sao từ tài khoản cá nhân của bạn về máy tính để lập trình.\n- `git remote -v`: Kiểm tra liên kết remote origin trỏ về kho fork cá nhân.\n- `git remote add upstream <url-kho-goc>`: Thiết lập thêm liên kết tới kho gốc của tác giả để đồng bộ các cập nhật mới sau này.',
    mistakes: [
      'Nghĩ rằng Fork là một câu lệnh terminal của Git: Fork là tính năng độc quyền của nền tảng lưu trữ như GitHub/GitLab, không phải lệnh CLI.',
      'Clone trực tiếp kho gốc của tác giả rồi thắc mắc vì sao bị lỗi Permission Denied khi push: Bạn phải fork về tài khoản mình rồi mới clone và push.',
      'Để kho fork bị lỗi thời sau nhiều tháng: Quên đồng bộ với kho gốc khiến việc tạo Pull Request sau này bị xung đột nặng nề.',
    ],
    labSteps: [
      'Mở trang web GitHub của dự án mẫu và nhấn nút `Fork`.',
      'Sao chép URL của kho fork trên tài khoản cá nhân của bạn.',
      'Mở terminal và thực thi `git clone` kho fork về máy tính.',
      'Chạy `git remote -v` để xác nhận origin trỏ đúng vào tài khoản của bạn.',
    ],
    hint: 'Nhớ nguyên tắc: Fork trên web GitHub -> Clone về máy tính -> Code -> Push lên fork -> Tạo PR.',
    validation: 'Tạo thành công bản sao kho lưu trữ trên tài khoản GitHub cá nhân và clone về máy.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế Fork trên GitHub.',
    challenge: 'Nêu sự khác biệt giữa tính năng Fork và việc tải tệp ZIP về rồi tự tạo repository mới trên GitHub.',
    summary: [
      'Fork tạo bản sao kho từ xa trên GitHub về tài khoản cá nhân của bạn.',
      'Cung cấp toàn quyền chỉnh sửa và thử nghiệm mà không ảnh hưởng tới kho gốc.',
      'Là nền tảng cốt lõi của quy trình đóng góp mã nguồn mở trên toàn cầu.',
    ],
    quiz: {
      id: 'quiz-04-09-fork',
      title: 'Trắc nghiệm: Cơ chế Fork trên GitHub',
      questions: [
        {
          id: 'q1',
          question: 'Thao tác "Fork" trong hệ sinh thái GitHub thực chất là gì?',
          type: 'single',
          options: [
            { text: 'Tạo một bản sao độc lập của kho lưu trữ người khác vào tài khoản GitHub của chính bạn ở phía máy chủ', correct: true },
            { text: 'Một câu lệnh gõ trong terminal shell của máy tính cá nhân', correct: false },
            { text: 'Xóa bỏ vĩnh viễn dự án của tác giả ban đầu', correct: false },
            { text: 'Tải toàn bộ mã nguồn về ổ đĩa cứng dưới dạng file Word', correct: false },
          ],
          explanation:
            'Fork là thao tác server-side clone do GitHub cung cấp, tạo bản sao kho trên máy chủ thuộc quyền sở hữu của bạn.',
        },
        {
          id: 'q2',
          question: 'Tại sao các dự án mã nguồn mở lại yêu cầu cộng đồng lập trình viên phải Fork dự án trước khi đóng góp?',
          type: 'single',
          options: [
            { text: 'Để bảo vệ an ninh dự án, chỉ những người bảo trì chính mới có quyền ghi trực tiếp vào kho nguồn gốc', correct: true },
            { text: 'Vì GitHub giới hạn mỗi dự án chỉ được có tối đa 3 lập trình viên', correct: false },
            { text: 'Vì nếu không fork thì mã nguồn sẽ tự động bị mã hóa biến mất', correct: false },
            { text: 'Vì fork giúp máy tính của tác giả chạy nhanh hơn', correct: false },
          ],
          explanation:
            'Fork cho phép bất kỳ ai cũng đóng góp được mà không cần cấp quyền push trực tiếp vào kho mã nguồn nhạy cảm.',
        },
        {
          id: 'q3',
          question: 'Sau khi đã Fork một dự án trên giao diện web của GitHub, bước tiếp theo bạn cần làm để bắt đầu viết code là gì?',
          type: 'single',
          options: [
            { text: 'Clone kho fork từ tài khoản cá nhân của bạn về máy tính bằng lệnh `git clone`', correct: true },
            { text: 'Chạy lệnh git push ngay lập tức khi chưa có code', correct: false },
            { text: 'Xóa tài khoản GitHub vừa tạo', correct: false },
            { text: 'Tắt màn hình máy tính và chờ đợi tác giả gửi mã nguồn qua email', correct: false },
          ],
          explanation:
            'Bạn clone kho fork của mình về máy tính, khi đó remote origin sẽ trỏ vào kho bạn có quyền push.',
        },
        {
          id: 'q4',
          question: 'Mối quan hệ giữa kho gốc (upstream) và kho bạn vừa Fork về tài khoản cá nhân là như thế nào?',
          type: 'single',
          options: [
            { text: 'Hai kho hoàn toàn độc lập, mọi sửa đổi trên kho fork không làm ảnh hưởng gì tới kho gốc trừ khi tác giả chấp nhận Pull Request', correct: true },
            { text: 'Bất kỳ dòng code nào bạn gõ trên máy cá nhân sẽ tự động xuất hiện trên kho gốc ngay lập tức', correct: false },
            { text: 'Kho gốc sẽ tự động bị biến mất sau 30 ngày', correct: false },
            { text: 'Hai kho bị khóa quyền truy cập của tất cả mọi người', correct: false },
          ],
          explanation:
            'Kho fork là không gian an toàn biệt lập 100%; tác giả kho gốc chỉ nhận code khi duyệt Pull Request.',
        },
      ],
    },
  },
  {
    id: '10-upstream',
    moduleId: '04-github-collaboration',
    title: 'Cấu hình Upstream cho dự án mã nguồn mở',
    duration: 25,
    xp: 85,
    keywords: ['upstream', 'sync fork', 'remote upstream', 'dong bo kho goc', 'open source workflow'],
    prerequisites: ['09-fork'],
    objectives: [
      'Hiểu rõ khái niệm và quy ước đặt tên remote `upstream` trong quy trình làm việc với kho fork.',
      'Cấu hình thêm remote `upstream` trỏ về kho gốc của tác giả bằng câu lệnh `git remote add`.',
      'Đồng bộ hóa mã nguồn mới nhất từ kho gốc về máy cá nhân và cập nhật lên kho fork.',
      'Ngăn ngừa tình trạng kho fork bị phân kỳ quá xa so với tiến độ phát triển của dự án chính.',
    ],
    definition:
      '`upstream` trong ngữ cảnh làm việc với các kho fork là tên bí danh quy ước chuẩn quốc tế được dùng để định danh cho kho lưu trữ từ xa gốc (Original Repository) của tác giả hoặc tổ chức sáng lập dự án. Trong khi `origin` trỏ về bản sao fork trên tài khoản cá nhân của bạn, thì `upstream` trỏ thẳng về nguồn cội ban đầu của mã nguồn, cho phép bạn liên tục theo dõi và kéo các cải tiến mới nhất từ dự án gốc về máy.',
    why:
      'Trong các dự án mã nguồn mở năng động, mỗi ngày có thể có hàng chục commit và bản vá lỗi mới được các chuyên gia đưa vào kho gốc. Nếu kho fork của bạn không được cấu hình `upstream` để cập nhật thường xuyên, mã nguồn của bạn sẽ nhanh chóng bị lạc hậu sau vài tuần. Khi bạn muốn đóng góp tính năng mới, Pull Request của bạn sẽ bị xung đột nặng nề và bị từ chối duyệt. Cấu hình upstream là kỹ năng sống còn của mọi kỹ sư mã nguồn mở.',
    mentalModel:
      'Hãy hình dung kho gốc của dự án giống như dòng sông Mẹ thượng nguồn (Upstream) liên tục cuộn trào dòng nước mát lành và phù sa màu mỡ. Kho fork cá nhân của bạn giống như một con kênh nhỏ bạn đào rẽ nhánh từ bờ sông về cánh đồng nhà mình (Origin). Để con kênh không bị khô cạn và ứ đọng rác bẩn, bạn phải mở một cửa cống đón nước (cấu hình remote upstream) để định kỳ dẫn dòng nước mới nhất từ sông Mẹ vào kênh của mình.',
    diagram: `Mô hình 2 remote: origin và upstream:
[Kho gốc của tác giả] ◄──────────────────┐ (Định kỳ fetch cập nhật)
(upstream)                                │
                                          │
[Kho fork của bạn] ◄────┐ (git push)      │ (git fetch upstream)
(origin)                │                 │
                        │                 │
[Máy tính của bạn] ─────┴─────────────────┘
(Local Repository)`,
    example:
      'Sau một tháng miệt mài phát triển tính năng mới trên kho fork cá nhân, kỹ sư An chuẩn bị gửi đóng góp mã nguồn cho dự án Vue.js gốc của cộng đồng quốc tế. Để đảm bảo đoạn mã của mình hoàn toàn tương thích và không bị xung đột với phiên bản mới nhất, An cấu hình thêm remote gốc bằng câu lệnh: `git remote add upstream https://github.com/vuejs/core.git`. Sau đó An chạy tiếp `git fetch upstream` và `git merge upstream/main`. Toàn bộ các cải tiến và bản vá lỗi mới nhất của hàng trăm kỹ sư hàng đầu thế giới được tích hợp mượt mà vào máy tính của An. An tự tin đẩy code lên origin và tạo một Pull Request hoàn hảo gửi tới ban quản trị.',
    commands: [
      'git remote add upstream <url-kho-goc>',
      'git remote -v',
      'git fetch upstream',
      'git merge upstream/main',
      'git push origin main',
    ],
    explanation:
      '- `git remote add upstream <url>`: Thiết lập liên kết remote upstream trỏ trực tiếp tới kho gốc của dự án.\n- `git remote -v`: Xác nhận cấu hình có đủ 2 remote: origin (kho của bạn) và upstream (kho gốc).\n- `git fetch upstream`: Tải về toàn bộ commit và nhánh mới nhất từ kho gốc.\n- `git merge upstream/main`: Gộp các cập nhật mới nhất của kho gốc vào nhánh main cục bộ trên máy bạn.\n- `git push origin main`: Đẩy các cập nhật vừa gộp lên kho fork cá nhân trên GitHub để đồng bộ.',
    mistakes: [
      'Nhầm lẫn giữa origin và upstream: Push nhầm vào upstream (sẽ bị lỗi từ chối vì bạn không có quyền ghi vào kho gốc).',
      'Quên cập nhật upstream trước khi tạo nhánh mới: Bắt đầu viết tính năng trên nền tảng code cũ kỹ đã bị lỗi thời.',
      'Cố tình sửa đổi nhánh main cục bộ: Tốt nhất nên giữ main luôn sạch sẽ để chỉ đồng bộ với upstream/main, mọi tính năng đều viết trên branch riêng.',
    ],
    labSteps: [
      'Thêm remote upstream trỏ tới kho mẫu bằng `git remote add upstream https://github.com/git-academy/original-project.git`.',
      'Kiểm tra danh sách bằng `git remote -v` và xác nhận có cả origin và upstream.',
      'Chạy `git fetch upstream` để tải các commit mới nhất từ kho gốc.',
      'Gộp cập nhật vào nhánh main bằng `git merge upstream/main`.',
    ],
    hint: 'Nhớ nguyên tắc: Luôn kéo từ `upstream` về, và chỉ đẩy lên `origin` của chính bạn.',
    validation: 'Cấu hình thành công 2 remote origin và upstream và đồng bộ trơn tru.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về cấu hình remote upstream.',
    challenge: 'Nêu sự khác biệt giữa việc bấm nút "Sync fork" trên giao diện GitHub web và việc gõ lệnh đồng bộ qua remote upstream trong terminal.',
    summary: [
      '`upstream` là tên quy ước trỏ về kho lưu trữ gốc của tác giả ban đầu.',
      'Dùng để định kỳ kéo các bản cập nhật mới nhất về máy tính cá nhân.',
      'Giúp kho fork cá nhân luôn bắt kịp tiến độ và tránh xung đột khi tạo PR.',
    ],
    quiz: {
      id: 'quiz-04-10-upstream',
      title: 'Trắc nghiệm: Cấu hình Upstream trong Open Source',
      questions: [
        {
          id: 'q1',
          question: 'Trong quy trình đóng góp mã nguồn mở, bí danh remote `upstream` đại diện cho địa chỉ nào?',
          type: 'single',
          options: [
            { text: 'Kho lưu trữ gốc ban đầu của tác giả hoặc tổ chức sáng lập dự án', correct: true },
            { text: 'Kho fork trên tài khoản cá nhân của bạn', correct: false },
            { text: 'Một trang web sao lưu đám mây bí mật', correct: false },
            { text: 'Máy chủ kiểm thử nội bộ trong nhà riêng của bạn', correct: false },
          ],
          explanation:
            '`upstream` là quy ước đặt tên cho remote trỏ về kho nguồn cội ban đầu (Original Repo).',
        },
        {
          id: 'q2',
          question: 'Lệnh nào sau đây dùng để thiết lập liên kết remote `upstream` trỏ tới kho gốc của dự án?',
          type: 'single',
          options: [
            { text: 'git remote add upstream https://github.com/original-author/repo.git', correct: true },
            { text: 'git link upstream https://github.com/original-author/repo.git', correct: false },
            { text: 'git remote set-parent https://github.com/original-author/repo.git', correct: false },
            { text: 'git upstream connect https://github.com/original-author/repo.git', correct: false },
          ],
          explanation:
            '`git remote add <tên> <url>` là cú pháp chuẩn để gắn thêm liên kết remote mới.',
        },
        {
          id: 'q3',
          question: 'Quy trình chuẩn 3 bước để đồng bộ mã nguồn mới nhất từ kho gốc về kho fork cá nhân trên GitHub là gì?',
          type: 'single',
          options: [
            { text: 'git fetch upstream -> git merge upstream/main -> git push origin main', correct: true },
            { text: 'git push upstream main -> git pull origin main -> git status', correct: false },
            { text: 'git delete fork -> git clone -> git commit', correct: false },
            { text: 'git reset --hard -> git remote remove -> git clone', correct: false },
          ],
          explanation:
            'Tải từ gốc (fetch upstream) -> gộp vào máy (merge) -> đẩy lên fork cá nhân (push origin).',
        },
        {
          id: 'q4',
          question: 'Điều gì sẽ xảy ra nếu bạn cố gắng chạy lệnh `git push upstream main` trên một dự án mã nguồn mở lớn?',
          type: 'single',
          options: [
            { text: 'Lệnh sẽ bị từ chối với lỗi Permission denied vì bạn không có quyền ghi trực tiếp vào kho của tác giả', correct: true },
            { text: 'Mã nguồn của bạn sẽ tự động ghi đè lên toàn bộ hệ thống của tác giả', correct: false },
            { text: 'GitHub sẽ tự động sa thải tác giả dự án', correct: false },
            { text: 'Máy tính của bạn sẽ bị mất bản quyền Git', correct: false },
          ],
          explanation:
            'Bạn chỉ có quyền đọc (clone/fetch) kho gốc; quyền ghi chỉ dành cho maintainers của dự án.',
        },
      ],
    },
  },
  {
    id: '11-pull-request',
    moduleId: '04-github-collaboration',
    title: 'Khái niệm và quy trình tạo Pull Request (PR)',
    duration: 30,
    xp: 100,
    keywords: ['pull request', 'pr', 'yeu cau gop code', 'code contribution', 'feature branch', 'github pr'],
    prerequisites: ['09-fork'],
    objectives: [
      'Nắm vững khái niệm và ý nghĩa cốt lõi của Pull Request (PR) trong phát triển phần mềm hiện đại.',
      'Hiểu rõ thuật ngữ: Vì sao lại gọi là "Pull Request" (yêu cầu người khác kéo code của mình về gộp).',
      'Thực hiện quy trình tạo một Pull Request hoàn chỉnh trên giao diện web của GitHub.',
      'Viết mô tả PR (PR Description) rõ ràng, súc tích tuân thủ theo biểu mẫu chuẩn (PR Template).',
    ],
    definition:
      'Pull Request (thường viết tắt là PR, trong hệ sinh thái GitLab gọi là Merge Request) là một cơ chế cộng tác trung tâm trên GitHub, cho phép một lập trình viên chính thức gửi thông báo và yêu cầu đội ngũ bảo trì hoặc trưởng nhóm kiểm tra, thảo luận và gộp (pull & merge) các commit từ một nhánh tính năng vào nhánh chính của dự án. PR cung cấp không gian tương tác trực quan với giao diện so sánh diff từng dòng, khu vực bình luận và hệ thống kiểm thử tự động CI tích hợp.',
    why:
      'Thời kỳ các lập trình viên tùy tiện đẩy code trực tiếp lên nhánh chính mà không qua ai kiểm duyệt đã lùi vào dĩ vãng. Pull Request là trái tim của văn hóa kỹ thuật hiện đại: nó ngăn ngừa các lỗi tiềm ẩn xâm nhập vào sản phẩm, tạo cơ hội chia sẻ kiến thức chuyên môn giữa các thành viên, lưu lại tài liệu giải trình kỹ thuật cho từng quyết định kiến trúc và xây dựng tinh thần trách nhiệm tập thể đối với chất lượng mã nguồn.',
    mentalModel:
      'Hãy hình dung bạn là một kiến trúc sư nội thất được thuê trang trí phòng khách của một căn nhà sang trọng. Bạn không tự ý mở cửa nhà khách rồi tự tiện sơn tường hay đập phá vách ngăn khi chưa ai cho phép. Thay vào đó, bạn dựng một bản vẽ thiết kế 3D hoàn chỉnh kèm theo báo giá chi tiết, gửi hồ sơ đó tới gia chủ và lịch sự nói: "Tôi đã hoàn thành thiết kế mới cho phòng khách, xin mời anh chị xem xét và chấp thuận để tôi thi công" (Pull Request).',
    diagram: `Vòng đời của một Pull Request:
[Tạo nhánh feature] ──► [Commit & Push] ──► [Mở Pull Request trên GitHub]
                                                    │
                                                    ▼
[Chấp thuận & Merge vào main] ◄── [Thảo luận & Code Review & Chạy CI]`,
    example:
      'Kỹ sư Phương vừa hoàn thành xong tính năng lọc sản phẩm theo mức giá trên nhánh `feat/price-filter` và đã đẩy toàn bộ mã nguồn lên GitHub. Phương truy cập trang web của dự án trên GitHub và bấm nút xanh "Compare & pull request". Phương đặt tiêu đề chuẩn Conventional Commits: "feat: add price range filter component", điền chi tiết bản mô tả về cách thức hoạt động của component, đính kèm ảnh chụp màn hình giao diện đã chạy thử nghiệm thành công trên trình duyệt, đồng thời chỉ định hai đồng nghiệp senior trong nhóm vào danh sách Reviewers để cùng tham gia thẩm định chất lượng mã nguồn trước khi xuất bản.',
    commands: [
      'git switch -c feat/my-feature',
      'git push -u origin feat/my-feature',
    ],
    explanation:
      '- `git switch -c <tên-nhánh>`: Luôn luôn tạo một nhánh riêng biệt cô lập cho từng tính năng hoặc bản sửa lỗi trước khi bắt đầu viết mã nguồn.\n- `git push -u origin <nhánh>`: Đẩy nhánh tính năng lên GitHub và thiết lập tracking để sẵn sàng tạo Pull Request trên giao diện web.',
    mistakes: [
      'Tạo Pull Request trực tiếp từ nhánh main cá nhân: Dễ gây xung đột và khó quản lý nhiều PR cùng lúc; luôn luôn tạo feature branch.',
      'Viết tiêu đề và mô tả PR cẩu thả hoặc để trống: Khiến đồng nghiệp không hiểu mục đích thay đổi và từ chối xem xét.',
      'Gộp quá nhiều tính năng không liên quan vào cùng một PR khổng lồ (Mega PR): Gây quá tải cho người review và rất khó phát hiện lỗi.',
    ],
    labSteps: [
      'Tạo nhánh tính năng mới `feat-login-button` và commit một chỉnh sửa nhỏ.',
      'Đẩy nhánh tính năng lên GitHub bằng `git push -u origin feat-login-button`.',
      'Truy cập giao diện web của GitHub và nhấn nút `Compare & pull request`.',
      'Điền tiêu đề, mô tả giải thích lý do thay đổi và bấm `Create pull request`.',
    ],
    hint: 'Một Pull Request lý tưởng nên nhỏ gọn, tập trung giải quyết duy nhất một vấn đề cụ thể.',
    validation: 'Tạo thành công Pull Request trên GitHub với đầy đủ thông tin mô tả chi tiết.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và quy trình tạo Pull Request.',
    challenge: 'Giải thích cơ chế hoạt động của tệp `.github/pull_request_template.md` trong việc chuẩn hóa nội dung PR.',
    summary: [
      'Pull Request là yêu cầu chính thức đề nghị gộp code từ nhánh tính năng vào nhánh chính.',
      'Cung cấp môi trường thảo luận, xem diff, bình luận code và chạy kiểm thử tự động CI.',
      'Luôn tạo nhánh riêng biệt và viết mô tả rõ ràng cho từng Pull Request.',
    ],
    quiz: {
      id: 'quiz-04-11-pull-request',
      title: 'Trắc nghiệm: Quy trình tạo Pull Request (PR)',
      questions: [
        {
          id: 'q1',
          question: 'Vì sao cơ chế này lại được đặt tên là "Pull Request" mà không phải là "Push Request"?',
          type: 'single',
          options: [
            { text: 'Vì bạn đang lịch sự gửi yêu cầu đề nghị người bảo trì kho đích hãy kéo (PULL) mã nguồn từ nhánh của bạn về gộp vào kho của họ', correct: true },
            { text: 'Vì từ "Pull" gõ trên bàn phím nhanh hơn từ "Push"', correct: false },
            { text: 'Vì người sáng lập Git thích tập môn thể thao kéo xà đơn (Pull-up)', correct: false },
            { text: 'Vì đây là lỗi đánh máy từ những năm 2008 của lập trình viên GitHub', correct: false },
          ],
          explanation:
            'Bạn đề nghị người quản trị: "Xin hãy PULL các commit của tôi vào nhánh chính của bạn".',
        },
        {
          id: 'q2',
          question: 'Thực hành nào sau đây được coi là chuẩn mực vàng khi tạo Pull Request trong các công ty chuyên nghiệp?',
          type: 'single',
          options: [
            { text: 'Mỗi PR chỉ giải quyết duy nhất một vấn đề cụ thể, có dung lượng vừa phải kèm mô tả rõ ràng và ảnh minh họa', correct: true },
            { text: 'Gộp toàn bộ công việc của cả tháng vào một PR khổng lồ chứa hơn 10.000 dòng code', correct: false },
            { text: 'Không cần viết bất kỳ dòng mô tả nào để đồng nghiệp tự đoán ý đồ', correct: false },
            { text: 'Luôn luôn tạo PR trực tiếp từ nhánh main của máy cá nhân', correct: false },
          ],
          explanation:
            'PR nhỏ gọn (Small PRs) giúp việc review diễn ra nhanh chóng, kỹ lưỡng và giảm thiểu rủi ro lỗi ngầm.',
        },
        {
          id: 'q3',
          question: 'Thao tác tạo Pull Request được thực hiện chủ yếu ở đâu?',
          type: 'single',
          options: [
            { text: 'Trên giao diện web của các nền tảng lưu trữ như GitHub, GitLab hoặc qua công cụ GitHub CLI (`gh pr create`)', correct: true },
            { text: 'Gõ lệnh `git pull-request` trong terminal Git cơ bản', correct: false },
            { text: 'Gửi tin nhắn thoại qua ứng dụng Zalo', correct: false },
            { text: 'Gửi bản in giấy mã nguồn qua bưu điện', correct: false },
          ],
          explanation:
            'Pull Request là tính năng của nền tảng cộng tác (GitHub/GitLab/Bitbucket), không phải lệnh có sẵn của core Git.',
        },
        {
          id: 'q4',
          question: 'Trong giao diện tạo Pull Request trên GitHub, hai thuật ngữ "base branch" và "compare branch" có ý nghĩa gì?',
          type: 'single',
          options: [
            { text: 'Base là nhánh đích muốn gộp vào (ví dụ main), Compare là nhánh nguồn chứa tính năng mới của bạn', correct: true },
            { text: 'Base là nhánh của máy tính người review, Compare là nhánh của sếp', correct: false },
            { text: 'Base là nhánh chứa virus, Compare là nhánh an toàn', correct: false },
            { text: 'Hai khái niệm này hoàn toàn đảo ngược nhau', correct: false },
          ],
          explanation:
            'Cú pháp: `base: main` ◄── `compare: feature-branch`. Mã nguồn sẽ đi từ compare vào base.',
        },
        {
          id: 'q5',
          question: 'Khi bạn tiếp tục commit và push thêm code lên nhánh tính năng sau khi đã mở Pull Request, điều gì sẽ xảy ra?',
          type: 'single',
          options: [
            { text: 'Các commit mới sẽ tự động được bổ sung vào Pull Request đang mở mà không cần bạn phải tạo lại PR mới', correct: true },
            { text: 'Pull Request hiện tại sẽ bị tự động hủy bỏ ngay lập tức', correct: false },
            { text: 'Bạn phải đóng PR cũ và tạo một PR hoàn toàn mới từ đầu', correct: false },
            { text: 'GitHub sẽ gửi thông báo cảnh báo vi phạm bản quyền', correct: false },
          ],
          explanation:
            'PR theo dõi con trỏ nhánh; mọi commit mới push lên nhánh đó đều tự động xuất hiện trong danh sách commit của PR.',
        },
        {
          id: 'q6',
          question: 'Hệ thống CI/CD (Continuous Integration) thường làm nhiệm vụ tự động gì khi một Pull Request được mở ra?',
          type: 'single',
          options: [
            { text: 'Tự động chạy bộ kiểm thử đơn vị (Unit Tests), kiểm tra quy chuẩn mã nguồn (Linter) và biên dịch thử dự án', correct: true },
            { text: 'Tự động chuyển tiền lương vào tài khoản ngân hàng của tác giả PR', correct: false },
            { text: 'Tự động tắt nguồn máy chủ của công ty', correct: false },
            { text: 'Tự động duyệt và merge PR mà không cần con người xem xét', correct: false },
          ],
          explanation:
            'CI đóng vai trò người gác cổng tự động bảo đảm mã nguồn mới đáp ứng các tiêu chuẩn kỹ thuật trước khi merge.',
        },
      ],
    },
  },
  {
    id: '12-code-review',
    moduleId: '04-github-collaboration',
    title: 'Văn hóa và kỹ năng Code Review trên GitHub',
    duration: 25,
    xp: 85,
    keywords: ['code review', 'review code', 'phe duyet', 'comment diff', 'van hoa ky thuat', 'chat luong ma'],
    prerequisites: ['11-pull-request'],
    objectives: [
      'Hiểu rõ mục đích và tầm quan trọng sống còn của hoạt động Code Review đối với sự phát triển của đội ngũ.',
      'Sử dụng thành thạo các công cụ review trên GitHub: bình luận từng dòng (line comments), tạo đề xuất sửa code (Suggested Changes), và phê duyệt (Approve).',
      'Xây dựng văn hóa nhận xét mang tính xây dựng, tôn trọng và đồng cảm (Empathy in Code Review).',
      'Phân biệt rõ ràng giữa 3 trạng thái phản hồi: Comment, Approve, và Request Changes.',
    ],
    definition:
      'Code Review (Đánh giá mã nguồn) là một quy trình kỹ thuật bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp, nơi các thành viên trong đội ngũ cùng nhau đọc, phân tích và phản biện mã nguồn trong một Pull Request trước khi nó được phép hợp nhất vào nhánh chính. Code Review giúp phát hiện sớm các lỗ hổng bảo mật, lỗi logic ngầm, vấn đề hiệu năng và bảo đảm phong cách lập trình tuân thủ đúng các quy chuẩn kiến trúc của dự án.',
    why:
      'Không một cá nhân nào có thể viết code hoàn hảo 100% mọi lúc. Hoạt động Code Review biến việc đảm bảo chất lượng từ trách nhiệm cá nhân đơn độc thành sức mạnh tập thể. Đây cũng là kênh đào tạo nội bộ hiệu quả nhất: các kỹ sư trẻ học hỏi được tư duy kiến trúc sắc bén từ các chuyên gia tiền bối, trong khi các chuyên gia senior liên tục nắm bắt được những thay đổi chi tiết đang diễn ra trên toàn bộ hệ thống.',
    mentalModel:
      'Hãy hình dung Code Review giống như quy trình phản biện bài báo khoa học (Peer Review) của các nhà nghiên cứu, hoặc người biên tập viên đọc bản thảo của tác giả trước khi đem in sách. Người biên tập không nhằm mục đích chỉ trích hay hạ thấp danh dự tác giả, mà cùng tác giả soi từng lỗi chính tả, câu chữ lủng củng và các tình tiết vô lý để khi cuốn sách ra đời, nó là một tác phẩm hoàn hảo nhất có thể phục vụ độc giả.',
    diagram: `3 mức độ phản hồi khi kết thúc Code Review trên GitHub:
┌────────────────────────────────────────────────────────┐
│  [Comment]         ──► Chỉ để lại câu hỏi hoặc góp ý nhẹ│
│  [Approve]         ──► Đồng ý hoàn toàn, sẵn sàng merge │
│  [Request Changes] ──► Bắt buộc phải sửa lỗi trước      │
└────────────────────────────────────────────────────────┘`,
    example:
      'Kỹ sư Senior Tuấn nhận được yêu cầu review Pull Request của bạn thực tập sinh Nam về chức năng đăng ký tài khoản. Đọc qua tệp auth.js, Tuấn nhận thấy mật khẩu người dùng đang được lưu dưới dạng văn bản thuần túy chưa mã hóa. Tuấn không hề chê bai mà nhẹ nhàng bấm vào dòng code đó trên GitHub diff, viết bình luận giải thích rủi ro bảo mật theo tiêu chuẩn OWASP và sử dụng tính năng "Insert suggestion" để gợi ý đoạn mã băm mật khẩu bằng thư viện bcrypt. Nam cảm ơn Tuấn, bấm nút chấp nhận gợi ý và cập nhật PR ngay lập tức.',
    commands: [
      'gh pr checkout <pr-number>',
      'git log -p',
    ],
    explanation:
      '- `gh pr checkout <number>`: Lệnh của GitHub CLI cho phép tải nhanh toàn bộ nhánh của PR về máy tính cá nhân để chạy thử nghiệm và kiểm tra thực tế.\n- `git log -p`: Xem chi tiết từng dòng diff thay đổi của các commit trong PR ngay trong terminal.',
    mistakes: [
      'Công kích cá nhân thay vì tập trung vào đoạn code: Dùng lời lẽ gay gắt làm tổn thương đồng nghiệp.',
      'Duyệt code mù quáng (LGTM - Looks Good To Me mà không thèm đọc): Đẩy rủi ro lỗi nghiêm trọng lên môi trường production.',
      'Tranh cãi gay gắt về sở thích cá nhân: Ví dụ tranh cãi về dấu cách hay tab thay vì để công cụ tự động (Prettier/ESLint) xử lý.',
    ],
    labSteps: [
      'Mở tab `Files changed` trong một Pull Request trên GitHub.',
      'Rê chuột vào một dòng code và nhấn vào biểu tượng dấu cộng màu xanh để để lại bình luận.',
      'Sử dụng cú pháp gợi ý sửa code `\`\`\`suggestion` để đề xuất đoạn code mới.',
      'Nhấn `Review changes` và chọn trạng thái `Approve` hoặc `Request changes`.',
    ],
    hint: 'Hãy luôn bình luận về mã nguồn, không bao giờ bình luận về con người lập trình viên.',
    validation: 'Để lại nhận xét mang tính xây dựng và sử dụng thành thạo các tính năng review trên GitHub.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về văn hóa và kỹ năng Code Review.',
    challenge: 'Nêu lợi ích của việc cấu hình Branch Protection Rule yêu cầu tối thiểu 2 approvals trước khi merge.',
    summary: [
      'Code Review là hoạt động tập thể nhằm nâng cao chất lượng mã nguồn và chia sẻ kiến thức.',
      'Sử dụng tính năng Suggested Changes để đồng nghiệp có thể áp dụng sửa đổi chỉ với một cú click.',
      'Luôn giữ thái độ tôn trọng, tích cực và tập trung vào giải pháp kỹ thuật.',
    ],
    quiz: {
      id: 'quiz-04-12-code-review',
      title: 'Trắc nghiệm: Văn hóa và kỹ năng Code Review',
      questions: [
        {
          id: 'q1',
          question: 'Mục tiêu quan trọng và cao cả nhất của hoạt động Code Review trong một nhóm phần mềm là gì?',
          type: 'single',
          options: [
            { text: 'Nâng cao chất lượng mã nguồn, phát hiện lỗi sớm và chia sẻ kiến thức chuyên môn giữa các thành viên', correct: true },
            { text: 'Tìm lỗi để trừ lương hoặc hạ bậc khen thưởng của đồng nghiệp', correct: false },
            { text: 'Thể hiện quyền lực và chứng tỏ bản thân giỏi hơn người khác', correct: false },
            { text: 'Làm kéo dài thời gian phát triển dự án để không phải làm việc mới', correct: false },
          ],
          explanation:
            'Code Review là cơ hội học hỏi và nâng cao chất lượng tập thể, hoàn toàn không phải công cụ đánh giá kỷ luật cá nhân.',
        },
        {
          id: 'q2',
          question: 'Tính năng "Suggested Changes" (Gợi ý thay đổi) trên giao diện GitHub diff cho phép người review làm điều gì tuyệt vời?',
          type: 'single',
          options: [
            { text: 'Viết sẵn đoạn code thay thế chính xác để tác giả PR có thể chấp nhận và tự động commit chỉ với một cú nhấp chuột', correct: true },
            { text: 'Tự động xóa tài khoản của người viết code sai', correct: false },
            { text: 'Tự động gửi tin nhắn trừ điểm rèn luyện của sinh viên', correct: false },
            { text: 'Tắt màn hình máy tính của tác giả PR từ xa', correct: false },
          ],
          explanation:
            'Suggested Changes giúp đề xuất giải pháp trực quan và cho phép áp dụng ngay thành commit mới mà không cần gõ lại.',
        },
        {
          id: 'q3',
          question: 'Lựa chọn phản hồi "Request changes" trên GitHub nên được sử dụng trong trường hợp nào sau đây?',
          type: 'single',
          options: [
            { text: 'Khi phát hiện lỗi logic nghiêm trọng, lỗ hổng bảo mật hoặc vi phạm kiến trúc bắt buộc phải sửa trước khi merge', correct: true },
            { text: 'Khi bạn không thích màu hình đại diện đại diện của tác giả PR', correct: false },
            { text: 'Khi tác giả PR từ chối mời bạn đi uống trà sữa', correct: false },
            { text: 'Bất cứ khi nào bạn muốn trêu đùa đồng nghiệp cho vui', correct: false },
          ],
          explanation:
            '`Request changes` là rào chắn chặn không cho phép merge cho đến khi tác giả sửa xong các vấn đề cốt lõi.',
        },
        {
          id: 'q4',
          question: 'Thói quen xấu nào sau đây thể hiện sự thiếu trách nhiệm và nguy hại nhất trong văn hóa Code Review?',
          type: 'single',
          options: [
            { text: 'Phê duyệt hời hợt (LGTM) mà không hề đọc hay kiểm tra kỹ lưỡng các dòng code thay đổi', correct: true },
            { text: 'Khen ngợi một đoạn thuật toán sáng tạo của đồng nghiệp', correct: false },
            { text: 'Đặt câu hỏi để hiểu rõ hơn lý do lựa chọn giải pháp của tác giả', correct: false },
            { text: 'Chạy thử nghiệm tính năng trên máy cá nhân trước khi duyệt', correct: false },
          ],
          explanation:
            'Review hời hợt tạo ra ảo tưởng về sự an toàn và là con đường ngắn nhất để lọt các lỗi chết người vào production.',
        },
      ],
    },
  },
  {
    id: '13-merge-pull-request',
    moduleId: '04-github-collaboration',
    title: 'Quy trình Merge Pull Request',
    duration: 30,
    xp: 100,
    keywords: ['merge pr', 'merge commit', 'squash and merge', 'rebase and merge', 'dong pr', 'delete branch'],
    prerequisites: ['12-code-review'],
    objectives: [
      'Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính trên GitHub.',
      'Phân biệt rõ ràng 3 chiến lược merge được GitHub cung cấp: Create a merge commit, Squash and merge, và Rebase and merge.',
      'Hiểu rõ ưu và nhược điểm của từng chiến lược đối với đồ thị lịch sử của dự án.',
      'Thực hiện thao tác dọn dẹp xóa nhánh tính năng sau khi PR đã được merge thành công.',
    ],
    definition:
      'Merge Pull Request là thao tác kết thúc vòng đời của một tính năng thành công trên GitHub, chính thức kết nạp các commit từ nhánh tính năng vào nhánh chính (thường là `main`). GitHub cung cấp cho bạn 3 tùy chọn chiến lược hợp nhất: (1) `Create a merge commit` (giữ nguyên tất cả commit và tạo merge commit 2 cha), (2) `Squash and merge` (nén toàn bộ các commit nhỏ thành một commit duy nhất), và (3) `Rebase and merge` (áp dụng từng commit lên đỉnh nhánh chính thành một đường thẳng).',
    why:
      'Lựa chọn chiến lược merge đúng đắn quyết định diện mạo và chất lượng của lịch sử kho chứa trong suốt nhiều năm vận hành. Nếu chọn sai, lịch sử dự án của bạn có thể biến thành một "rừng cây" chằng chịt các commit rác như "fix typo", "fix bug again", "commit test". Hiểu rõ 3 chiến lược này giúp bạn và đội ngũ giữ cho nhật ký commit luôn sạch đẹp, dễ tra cứu và hỗ trợ tối đa việc truy vết lỗi hoặc rollback khi cần.',
    mentalModel:
      'Hãy hình dung bạn đi siêu thị mua sắm nhiều món đồ lặt vặt: chai nước mắm, gói mì tôm, cây bút bi (các commit nhỏ). Khi thanh toán tại quầy: Chiến lược Merge thông thường giống như thu ngân đưa cho bạn từng tờ hóa đơn rời cho mỗi món đồ kèm một tờ kẹp tổng hợp. Chiến lược Squash giống như thu ngân gom tất cả các món đồ đó lại và in ra đúng một tờ hóa đơn thanh toán duy nhất sạch sẽ mang tên "Chi phí sinh hoạt tuần 1". Chiến lược Rebase giống như dán nối tiếp từng tờ hóa đơn nhỏ vào đuôi cuốn sổ kế toán.',
    diagram: `3 phương thức Merge Pull Request trên GitHub:
1. Create a merge commit:
   main:    C1 ──► C2 ──────────► C5 (Merge Commit có 2 cha)
                    \           /
   feature:          └── C3 ── C4

2. Squash and merge:
   main:    C1 ──► C2 ──► C3+4' (Gom C3 và C4 thành 1 commit duy nhất)

3. Rebase and merge:
   main:    C1 ──► C2 ──► C3' ──► C4' (Lịch sử thẳng tắp, không có nút giao)`,
    example:
      'Trong quá trình phát triển tính năng giỏ hàng, lập trình viên tạo ra 8 commit nhỏ với các thông điệp nháp như "wip", "fix css", "testing". Sau khi Pull Request vượt qua toàn bộ các bài kiểm tra tự động và được 2 kỹ sư senior phê duyệt, trưởng nhóm quyết định bấm chọn tùy chọn: "Squash and merge". Toàn bộ 8 commit nháp được nén gọn thành một commit chất lượng cao duy nhất: "feat(cart): implement shopping cart and checkout flow (#42)". Sau khi merge, trưởng nhóm nhấn nút màu tím "Delete branch" để dọn dẹp sạch sẽ nhánh tính năng.',
    commands: [
      'git switch main',
      'git pull origin main',
      'git branch -d feat/my-feature',
    ],
    explanation:
      '- `git switch main`: Chuyển về nhánh main trên máy tính cá nhân sau khi PR đã được merge trên web.\n- `git pull origin main`: Kéo commit vừa được merge trên GitHub về cập nhật máy cá nhân.\n- `git branch -d <nhánh>`: Xóa an toàn nhánh tính năng cục bộ sau khi nó đã nằm trọn vẹn trong main.',
    mistakes: [
      'Quên xóa nhánh tính năng sau khi đã merge: Khiến danh sách nhánh trên GitHub bị tồn đọng hàng trăm nhánh cũ rác rưởi.',
      'Dùng Create a merge commit cho các PR chứa nhiều commit nháp vô nghĩa: Khiến lịch sử nhánh main bị ô nhiễm bởi các commit rác.',
      'Tiếp tục code thêm trên nhánh tính năng đã bị squash and merge: Sẽ gặp khó khăn khi đồng bộ vì lịch sử commit đã bị viết lại.',
    ],
    labSteps: [
      'Quan sát nút xanh `Merge pull request` xuất hiện khi PR đã được Approve và pass CI.',
      'Nhấn vào mũi tên cạnh nút để so sánh 3 tùy chọn: Merge, Squash, và Rebase.',
      'Chọn `Squash and merge` và chỉnh sửa lại tiêu đề commit cho thật chuẩn mực.',
      'Nhấn xác nhận merge và bấm nút `Delete branch` màu tím để xóa nhánh.',
    ],
    hint: 'Squash and merge là lựa chọn phổ biến hàng đầu trong các dự án web hiện đại để giữ lịch sử main tinh gọn.',
    validation: 'Merge thành công Pull Request vào nhánh chính và dọn dẹp nhánh tính năng sạch sẽ.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về các chiến lược Merge Pull Request.',
    challenge: 'Nêu trường hợp nào nên ưu tiên chọn "Create a merge commit" thay vì "Squash and merge".',
    summary: [
      'Merge PR chính thức kết nạp mã nguồn tính năng vào nhánh chính của sản phẩm.',
      '3 chiến lược: Merge commit (giữ vết), Squash (nén thành 1), Rebase (làm phẳng).',
      'Luôn xóa nhánh tính năng sau khi merge để giữ kho lưu trữ luôn sạch đẹp.',
    ],
    quiz: {
      id: 'quiz-04-13-merge-pull-request',
      title: 'Trắc nghiệm: Quy trình Merge Pull Request',
      questions: [
        {
          id: 'q1',
          question: 'Chiến lược "Squash and merge" trên GitHub thực hiện hành vi kỹ thuật nào đối với các commit của PR?',
          type: 'single',
          options: [
            { text: 'Nén toàn bộ các commit nhỏ trong nhánh tính năng thành một commit hoàn chỉnh duy nhất trên nhánh chính', correct: true },
            { text: 'Xóa sạch toàn bộ mã nguồn của PR và từ chối gộp', correct: false },
            { text: 'Nhân đôi số lượng commit lên gấp hai lần để lưu trữ dự phòng', correct: false },
            { text: 'Chuyển toàn bộ commit thành các tệp văn bản PDF', correct: false },
          ],
          explanation:
            'Squash gom tất cả các thay đổi thành 1 commit duy nhất, giúp lịch sử nhánh chính cực kỳ tinh gọn.',
        },
        {
          id: 'q2',
          question: 'Ưu điểm vượt trội nhất của chiến lược "Rebase and merge" là gì?',
          type: 'single',
          options: [
            { text: 'Tạo ra một lịch sử commit hoàn toàn tuyến tính (thẳng tắp) mà không sinh ra bất kỳ merge commit nào', correct: true },
            { text: 'Tự động kiểm tra lỗi chính tả tiếng Việt trong mã nguồn', correct: false },
            { text: 'Không cần kết nối mạng Internet vẫn merge được', correct: false },
            { text: 'Cho phép merge ngay cả khi code đang bị lỗi cú pháp nghiêm trọng', correct: false },
          ],
          explanation:
            'Rebase and merge áp dụng từng commit lên đầu nhánh chính tạo ra một chuỗi lịch sử thẳng đều.',
        },
        {
          id: 'q3',
          question: 'Sau khi một Pull Request đã được merge thành công vào nhánh main trên GitHub, hành động vệ sinh kho chứa chuẩn mực là gì?',
          type: 'single',
          options: [
            { text: 'Bấm nút "Delete branch" để xóa bỏ con trỏ nhánh tính năng đã hoàn thành trên GitHub', correct: true },
            { text: 'Xóa toàn bộ kho lưu trữ của công ty', correct: false },
            { text: 'Khóa tài khoản của tất cả các lập trình viên vừa tham gia review', correct: false },
            { text: 'Tạo ngay một nhánh mới có cùng tên để ghi đè', correct: false },
          ],
          explanation:
            'Nhánh đã merge thì toàn bộ code đã nằm an toàn trong main; xóa nhánh giúp danh sách nhánh luôn gọn gàng.',
        },
        {
          id: 'q4',
          question: 'Sau khi PR được merge trên GitHub, lập trình viên cần làm gì trên máy tính cá nhân để cập nhật nhánh main của mình?',
          type: 'single',
          options: [
            { text: 'Chuyển về nhánh main bằng `git switch main` rồi chạy `git pull origin main`', correct: true },
            { text: 'Không cần làm gì cả vì máy tính sẽ tự động biết qua sóng tâm linh', correct: false },
            { text: 'Xóa toàn bộ thư mục dự án và clone lại từ đầu', correct: false },
            { text: 'Cài lại hệ điều hành Windows', correct: false },
          ],
          explanation:
            'Bạn cần chuyển về nhánh main và pull để đồng bộ commit merge từ GitHub về không gian làm việc cục bộ.',
        },
        {
          id: 'q5',
          question: 'Khi nào việc sử dụng chiến lược truyền thống "Create a merge commit" là phù hợp và có lợi nhất?',
          type: 'single',
          options: [
            { text: 'Khi dự án áp dụng quy trình Git Flow và muốn bảo lưu nguyên vẹn từng ranh giới nhánh và lịch sử tích hợp tính năng lớn', correct: true },
            { text: 'Khi nhánh tính năng chỉ có đúng một dòng sửa lỗi chính tả nhỏ', correct: false },
            { text: 'Khi máy tính bị mất kết nối mạng Internet', correct: false },
            { text: 'Khi muốn làm chậm tốc độ build của hệ thống', correct: false },
          ],
          explanation:
            'Merge Commit lưu vết ranh giới phát triển và bối cảnh tích hợp, hữu ích cho các dự án dài hạn cần kiểm toán chặt chẽ.',
        },
        {
          id: 'q6',
          question: 'Nếu một Pull Request bị xung đột (Merge Conflict) với nhánh main, nút Merge trên GitHub sẽ như thế nào?',
          type: 'single',
          options: [
            { text: 'Nút Merge sẽ bị vô hiệu hóa (bị xám) và GitHub yêu cầu bạn phải giải quyết xung đột trước khi được merge', correct: true },
            { text: 'GitHub sẽ tự động chọn nhánh của người có cấp bậc cao hơn để merge', correct: false },
            { text: 'GitHub sẽ tự động xóa đoạn code bị xung đột để merge tiếp', correct: false },
            { text: 'Nút Merge vẫn bấm được bình thường và bỏ qua lỗi', correct: false },
          ],
          explanation:
            'Git kiên quyết bảo vệ tính toàn vẹn: có xung đột thì nút Merge bị khóa cho đến khi conflict được giải quyết.',
        },
      ],
    },
  },
  {
    id: '14-github-issues',
    moduleId: '04-github-collaboration',
    title: 'Quản lý công việc và lỗi với GitHub Issues',
    duration: 25,
    xp: 80,
    keywords: ['github issues', 'issue tracking', 'quan ly loi', 'bug report', 'feature request', 'closing keywords'],
    prerequisites: ['01-local-vs-remote'],
    objectives: [
      'Hiểu rõ vai trò của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).',
      'Biết cách viết một báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện chi tiết.',
      'Sử dụng các nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để quản trị công việc.',
      'Nắm vững các từ khóa liên kết tự động đóng Issue khi merge PR: `Fixes #12`, `Closes #45`.',
    ],
    definition:
      'GitHub Issues là hệ thống quản lý công việc và theo dõi lỗi (Issue Tracking System) tích hợp sẵn ngay bên trong mỗi kho lưu trữ GitHub. Issues hoạt động như một danh sách việc cần làm (To-Do List) mạnh mẽ, nơi người dùng và các kỹ sư có thể báo cáo sự cố (Bug Reports), đề xuất tính năng mới (Feature Requests), thảo luận về các vấn đề kỹ thuật và phân công trách nhiệm cho từng thành viên trong nhóm.',
    why:
      'Một dự án phần mềm không thể thành công nếu chỉ có mã nguồn mà không có sự quản lý công việc bài bản. Nếu không có hệ thống theo dõi lỗi, các yêu cầu của khách hàng sẽ bị trôi mất trong tin nhắn chat, các lỗi nghiêm trọng sẽ bị bỏ quên và đội ngũ sẽ rơi vào tình trạng hỗn loạn không biết ai đang làm gì. Sử dụng thành thạo GitHub Issues giúp dự án vận hành khoa học, minh bạch và chuyên nghiệp.',
    mentalModel:
      'Hãy hình dung GitHub Issues giống như một chiếc bảng Kanban điện tử thông minh được đặt trang trọng ngay giữa phòng làm việc của nhóm kỹ thuật, nơi dán các tấm thẻ ghi chú nhiệm vụ với nhiều màu sắc phân loại khác nhau. Mỗi tấm thẻ (Issue) ghi rõ nội dung sự cố: "Nút Đăng nhập trên điện thoại bị lệch giao diện" (Lỗi), do ai chịu trách nhiệm sửa (Assignee), độ ưu tiên cao hay thấp (Label: bug, priority:high), và cần phải hoàn thành trước ngày nào (Milestone: Sprint 4). Nhờ chiếc bảng này, toàn đội luôn nắm bắt tiến độ công việc minh bạch.',
    diagram: `Quy trình liên kết tự động Issue và Pull Request:
[Issue #42: Bug giỏ hàng] ◄────────────────────────────────┐
                                                           │ (Khi PR được merge)
[Pull Request: "Fixes #42 - Fix cart calculation"] ────────┴──► [Tự động ĐÓNG Issue #42!]`,
    example:
      'Một khách hàng liên hệ báo cáo lỗi không thể thanh toán đơn hàng bằng thẻ tín dụng quốc tế. Kỹ sư Linh nhanh chóng tạo một Issue trên GitHub với tiêu đề chuẩn mực: "[Bug] Payment gateway timeout on checkout". Linh dán mã lỗi chi tiết từ hệ thống ghi log, đính kèm ảnh chụp màn hình và gắn nhãn `bug`, `critical`. Kỹ sư Huy nhận phân công phụ trách xử lý issue này. Sau khi sửa xong trên nhánh tính năng, Huy mở Pull Request với phần mô tả ghi rõ: "Fixes #104 - increase payment gateway timeout to 30s". Khi PR được duyệt và merge vào main, GitHub tự động chuyển trạng thái của Issue #104 sang Closed một cách hoàn toàn tự động.',
    commands: [
      'gh issue list',
      'gh issue create',
      'gh issue view <issue-number>',
    ],
    explanation:
      '- `gh issue list`: Liệt kê danh sách các issue đang mở của dự án trực tiếp trong terminal bằng GitHub CLI.\n- `gh issue create`: Tạo một issue mới nhanh chóng ngay từ dòng lệnh.\n- `gh issue view <number>`: Xem chi tiết nội dung và các bình luận của một issue chỉ định.',
    mistakes: [
      'Báo cáo lỗi quá mơ hồ như "Trang web bị lỗi không chạy": Không có bước tái hiện, không có ảnh chụp màn hình khiến người khác không thể sửa được.',
      'Quên sử dụng từ khóa đóng issue trong PR: Khiến PR đã merge nhưng issue vẫn mở, làm sai lệch báo cáo tiến độ dự án.',
      'Sử dụng Issue để trò chuyện tán gẫu không liên quan đến kỹ thuật.',
    ],
    labSteps: [
      'Truy cập tab `Issues` trên kho lưu trữ GitHub và bấm nút `New issue`.',
      'Điền tiêu đề rõ ràng và nội dung mô tả lỗi theo mẫu hướng dẫn.',
      'Gán nhãn `bug` và chỉ định bản thân vào mục `Assignees`.',
      'Tạo một commit có thông điệp `Fixes #1` để trải nghiệm tính năng tự động liên kết đóng issue.',
    ],
    hint: 'Sử dụng các từ khóa `Fixes #ID`, `Closes #ID`, hoặc `Resolves #ID` trong PR để tự động đóng Issue.',
    validation: 'Tạo thành công Issue trên GitHub và liên kết tự động đóng thông qua Pull Request.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về quản lý công việc với GitHub Issues.',
    challenge: 'Nêu danh sách toàn bộ các từ khóa liên kết tự động đóng issue (Closing keywords) được GitHub hỗ trợ.',
    summary: [
      'GitHub Issues là công cụ theo dõi lỗi và quản lý đầu việc tích hợp sẵn trong repo.',
      'Sử dụng Labels, Milestones và Assignees để tổ chức công việc khoa học.',
      'Từ khóa `Fixes #ID` trong PR giúp tự động đóng Issue khi code được merge vào main.',
    ],
    quiz: {
      id: 'quiz-04-14-github-issues',
      title: 'Trắc nghiệm: Quản lý công việc với GitHub Issues',
      questions: [
        {
          id: 'q1',
          question: 'GitHub Issues được thiết kế nhằm phục vụ mục đích cốt lõi nào trong dự án?',
          type: 'single',
          options: [
            { text: 'Theo dõi lỗi phần mềm (bug tracking), quản lý yêu cầu tính năng mới và tổ chức công việc của nhóm', correct: true },
            { text: 'Lưu trữ tệp video dung lượng lớn của công ty', correct: false },
            { text: 'Tự động biên dịch mã nguồn thành file thực thi', correct: false },
            { text: 'Quản lý tài khoản ngân hàng của lập trình viên', correct: false },
          ],
          explanation:
            'GitHub Issues đóng vai trò hệ thống quản lý công việc, theo dõi lỗi và thảo luận kỹ thuật tập trung.',
        },
        {
          id: 'q2',
          question: 'Khi bạn viết câu cú pháp `Fixes #25` trong phần mô tả của một Pull Request, điều kỳ diệu gì sẽ xảy ra?',
          type: 'single',
          options: [
            { text: 'Khi Pull Request đó được merge thành công vào nhánh main, Issue số 25 sẽ tự động được chuyển sang trạng thái Closed', correct: true },
            { text: 'Issue số 25 sẽ bị xóa vĩnh viễn khỏi lịch sử', correct: false },
            { text: 'Toàn bộ mã nguồn của commit 25 sẽ bị quay ngược lại', correct: false },
            { text: 'Người tạo Issue 25 sẽ bị khóa tài khoản', correct: false },
          ],
          explanation:
            'Closing keywords như `Fixes #ID`, `Closes #ID` tự động đóng Issue liên kết ngay khi PR được merge.',
        },
        {
          id: 'q3',
          question: 'Tính năng "Labels" trong GitHub Issues mang lại lợi ích gì cho việc quản trị dự án?',
          type: 'single',
          options: [
            { text: 'Phân loại công việc theo màu sắc và danh mục (như bug, enhancement, documentation) để lọc tìm kiếm dễ dàng', correct: true },
            { text: 'Tự động tính tiền thưởng cho từng nhiệm vụ', correct: false },
            { text: 'Tăng tốc độ kết nối mạng của máy tính', correct: false },
            { text: 'Bảo vệ kho chứa khỏi các cuộc tấn công mạng', correct: false },
          ],
          explanation:
            'Labels giúp phân loại, sắp xếp độ ưu tiên và lọc các tác vụ theo chủ đề một cách nhanh chóng.',
        },
        {
          id: 'q4',
          question: 'Một bản báo cáo lỗi (Bug Report) chất lượng cao và chuyên nghiệp bắt buộc phải có thông tin nào?',
          type: 'single',
          options: [
            { text: 'Các bước cụ thể để tái hiện lỗi (Steps to reproduce), kết quả thực tế gặp phải, kết quả kỳ vọng và ảnh chụp/mã lỗi', correct: true },
            { text: 'Chỉ cần một câu ngắn gọn như "Web bị hỏng rồi"', correct: false },
            { text: 'Số điện thoại cá nhân của người tìm ra lỗi', correct: false },
            { text: 'Mật khẩu đăng nhập tài khoản máy tính của người báo cáo', correct: false },
          ],
          explanation:
            'Các bước tái hiện rõ ràng là yếu tố tiên quyết để kỹ sư khác có thể kiểm tra và sửa lỗi triệt để.',
        },
      ],
    },
  },
  {
    id: '15-collaboration-workflow',
    moduleId: '04-github-collaboration',
    title: 'Quy trình cộng tác nhóm tiêu chuẩn (Feature Branch Workflow)',
    duration: 35,
    xp: 110,
    keywords: ['collaboration workflow', 'feature branch workflow', 'quy trinh nhom', 'teamwork git', 'github flow'],
    prerequisites: ['13-merge-pull-request'],
    objectives: [
      'Nắm vững toàn bộ bức tranh quy trình cộng tác nhóm chuẩn mực quốc tế: Feature Branch Workflow.',
      'Tuân thủ nghiêm ngặt quy tắc vàng: Tuyệt đối không bao giờ commit hay push trực tiếp vào nhánh `main`.',
      'Vận hành trơn tru chuỗi 7 bước từ nhận nhiệm vụ, tạo nhánh, lập trình, tạo PR, review cho đến khi xuất bản tính năng.',
      'Tự tin tham gia vào các dự án phần mềm chuyên nghiệp quy mô vừa và lớn.',
    ],
    definition:
      'Feature Branch Workflow là quy trình cộng tác phát triển phần mềm chuẩn mực và phổ biến bậc nhất trong ngành công nghệ thông tin toàn cầu. Quy tắc cốt lõi của quy trình này là: Nhánh chính (`main` hoặc `master`) được coi là thánh đường ổn định (Production-ready) và luôn trong trạng thái có thể triển khai; mọi tính năng mới, bản sửa lỗi hay thử nghiệm đều BẮT BUỘC phải được phát triển trên một nhánh riêng biệt (Feature Branch), trải qua quá trình Pull Request và Code Review kỹ lưỡng trước khi được phép hòa nhập vào nhánh chính.',
    why:
      'Khi làm việc một mình, bạn có thể commit tùy hứng. Nhưng khi bước vào môi trường doanh nghiệp với hàng chục kỹ sư cùng làm việc trên một sản phẩm, việc thiếu một quy trình chuẩn hóa sẽ dẫn đến thảm họa: code bị ghi đè, hệ thống liên tục sập, và xung đột triền miên không hồi kết. Feature Branch Workflow mang lại sự an toàn tuyệt đối, phân định trách nhiệm minh bạch và giúp nhóm phát hành tính năng liên tục với chất lượng cao nhất.',
    mentalModel:
      'Hãy hình dung một dàn nhạc giao hưởng lớn đang biểu diễn trước hàng ngàn khán giả (nhánh main trên sân khấu). Không một nhạc công nào được phép tự ý mang một giai điệu mới toanh vừa nghĩ ra trong đầu lên sân khấu chơi thử ngay trước mặt khán giả. Từng nghệ sĩ phải vào phòng tập riêng cách âm (Feature Branch), luyện tập thành thục giai điệu đó, trình diễn cho nhạc trưởng duyệt (Code Review & PR). Khi nhạc trưởng gật đầu hài lòng, giai điệu mới được hòa vào bản giao hưởng chính.',
    diagram: `Chuỗi 7 bước chuẩn mực của Feature Branch Workflow:
[1. Nhận Issue] ──► [2. git pull main] ──► [3. git switch -c feat/xyz]
                                                         │
                                                         ▼
[6. Review & Merge PR] ◄── [5. Push & Mở PR] ◄── [4. Code & Commit]
         │
         ▼
[7. Xóa nhánh & Cập nhật local main]`,
    example:
      'Đội ngũ kỹ thuật gồm 10 thành viên của một ứng dụng ngân hàng vận hành nghiêm ngặt theo đúng Feature Branch Workflow tiêu chuẩn. Mỗi buổi sáng, từng lập trình viên chọn một Issue từ bảng Kanban, cập nhật mã nguồn mới nhất bằng `git pull origin main`, tạo nhánh riêng biệt mang tên `feat/biometric-login`, viết code và thực hiện kiểm thử tự động cục bộ. Khi hoàn thành, lập trình viên đẩy nhánh lên GitHub, mở PR kèm bản danh sách checklist kiểm tra an ninh bảo mật. Hai kỹ sư senior vào xem xét, phản biện và phê duyệt. PR được squash-merge vào nhánh main và hệ thống tự động triển khai mã nguồn mới lên môi trường kiểm thử mà không phát sinh bất kỳ sự cố gián đoạn nào.',
    commands: [
      'git switch main',
      'git pull origin main',
      'git switch -c feat/<tên-tính-năng>',
      'git push -u origin feat/<tên-tính-năng>',
      'git branch -d feat/<tên-tính-năng>',
    ],
    explanation:
      '- `git switch main && git pull origin main`: Luôn xuất phát từ mốc mới nhất và ổn định nhất của nhánh main.\n- `git switch -c feat/<tên>`: Tách nhánh làm việc hoàn toàn cách ly cho tính năng mới.\n- `git push -u origin feat/<tên>`: Đưa nhánh lên GitHub để kích hoạt môi trường làm việc nhóm và PR.\n- `git branch -d feat/<tên>`: Dọn dẹp vệ sinh kho chứa sau khi tính năng đã được tích hợp thành công.',
    mistakes: [
      'Tiện tay commit thẳng lên nhánh main: Vi phạm quy tắc an toàn cơ bản nhất của phát triển phần mềm.',
      'Tạo nhánh từ một nhánh tính năng dở dang khác thay vì tách từ main: Làm dây chuyền các lỗi chưa kiểm chứng sang tính năng mới.',
      'Giữ nhánh tính năng quá lâu suốt nhiều tháng không merge: Dẫn đến "Merge Hell" với hàng trăm xung đột không thể giải quyết.',
    ],
    labSteps: [
      'Chuyển về nhánh `main` và kéo code mới nhất bằng `git pull origin main`.',
      'Tạo nhánh tính năng chuẩn quy ước `feat/user-profile` bằng `git switch -c feat/user-profile`.',
      'Thực hiện một số commit có thông điệp chuẩn mực trên nhánh này.',
      'Đẩy lên GitHub, tạo PR, giả lập quá trình review và merge thành công.',
    ],
    hint: 'Nhớ câu thần chú: Nhánh main luôn luôn sạch sẽ, ổn định và có thể release bất cứ lúc nào.',
    validation: 'Vận hành thành thạo toàn bộ chu kỳ 7 bước của Feature Branch Workflow.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về quy trình Feature Branch Workflow.',
    challenge: 'Nêu sự khác biệt giữa Feature Branch Workflow và quy trình Git Flow phức tạp có thêm nhánh develop và release.',
    summary: [
      'Feature Branch Workflow là tiêu chuẩn vàng của cộng tác nhóm hiện đại.',
      'Nhánh main luôn bất biến và ổn định; mọi tính năng đều nằm trên nhánh riêng.',
      'Quy trình 7 bước: Nhận việc -> Tách nhánh -> Code -> Push -> PR -> Review -> Merge.',
    ],
    quiz: {
      id: 'quiz-04-15-collaboration-workflow',
      title: 'Trắc nghiệm: Feature Branch Workflow',
      questions: [
        {
          id: 'q1',
          question: 'Quy tắc vàng số 1 bất di bất dịch trong quy trình Feature Branch Workflow là gì?',
          type: 'single',
          options: [
            { text: 'Tuyệt đối không bao giờ được phép commit hoặc push trực tiếp mã nguồn lên nhánh main', correct: true },
            { text: 'Mọi lập trình viên đều phải dùng chung một máy tính', correct: false },
            { text: 'Không được phép tạo quá 2 nhánh trong suốt vòng đời dự án', correct: false },
            { text: 'Chỉ được phép merge code vào ban đêm', correct: false },
          ],
          explanation:
            'Nhánh main là linh hồn của sản phẩm, chỉ được phép cập nhật thông qua Pull Request đã qua kiểm duyệt.',
        },
        {
          id: 'q2',
          question: 'Trước khi gõ lệnh `git switch -c feat/new-feature` để bắt đầu làm tính năng mới, thao tác BẮT BUỘC bạn phải làm là gì?',
          type: 'single',
          options: [
            { text: 'Chuyển về nhánh main và chạy lệnh `git pull origin main` để bảo đảm nhánh mới được tách từ mốc code mới nhất', correct: true },
            { text: 'Khởi tạo lại toàn bộ kho chứa bằng git init', correct: false },
            { text: 'Xóa toàn bộ các tệp tin trong thư mục dự án', correct: false },
            { text: 'Tắt kết nối mạng Internet', correct: false },
          ],
          explanation:
            'Luôn cập nhật main mới nhất trước khi tách nhánh để tránh code trên nền tảng lỗi thời dẫn đến xung đột.',
        },
        {
          id: 'q3',
          question: 'Tiền tố quy ước nào thường được sử dụng khi đặt tên nhánh cho các tác vụ sửa lỗi khẩn cấp?',
          type: 'single',
          options: [
            { text: 'fix/ hoặc bugfix/ (ví dụ: fix/login-error)', correct: true },
            { text: 'temp/ hoặc nhap/', correct: false },
            { text: 'delete/ hoặc remove/', correct: false },
            { text: 'admin/ hoặc root/', correct: false },
          ],
          explanation:
            'Quy ước đặt tên chuẩn: `feat/` cho tính năng mới, `fix/` cho sửa lỗi, `docs/` cho tài liệu, `refactor/` cho tái cấu trúc.',
        },
        {
          id: 'q4',
          question: 'Hiện tượng "Merge Hell" (Địa ngục hợp nhất) thường xảy ra do nguyên nhân nào trong quy trình làm việc nhóm?',
          type: 'single',
          options: [
            { text: 'Do một nhánh tính năng bị cô lập và kéo dài quá nhiều tuần/tháng mà không thường xuyên đồng bộ code mới từ main về', correct: true },
            { text: 'Do dung lượng ổ cứng máy tính bị đầy', correct: false },
            { text: 'Do sử dụng trình soạn thảo VS Code thay vì Notepad', correct: false },
            { text: 'Do đặt tên nhánh bằng tiếng Anh', correct: false },
          ],
          explanation:
            'Nhánh sống quá lâu (Long-lived branches) sẽ bị phân kỳ quá xa so với main, tích tụ hàng trăm xung đột nan giải.',
        },
        {
          id: 'q5',
          question: 'Sau khi Pull Request được merge thành công vào nhánh main trên GitHub, bước dọn dẹp vệ sinh kho chứa là gì?',
          type: 'single',
          options: [
            { text: 'Xóa nhánh tính năng trên GitHub và chạy `git branch -d` xóa nhánh đó trên máy tính cá nhân', correct: true },
            { text: 'Xóa nhánh main để làm lại từ đầu', correct: false },
            { text: 'Đổi tên tài khoản GitHub của bạn', correct: false },
            { text: 'Khóa toàn bộ dự án lại không cho ai truy cập', correct: false },
          ],
          explanation:
            'Dọn dẹp các nhánh đã hoàn thành giúp cây lịch sử luôn tinh gọn và tránh nhầm lẫn trong tương lai.',
        },
        {
          id: 'q6',
          question: 'Lợi ích lớn nhất mà Feature Branch Workflow mang lại cho các doanh nghiệp phần mềm là gì?',
          type: 'single',
          options: [
            { text: 'Bảo vệ nhánh main luôn trong trạng thái sẵn sàng xuất bản (Production-ready) và kiểm soát chất lượng chặt chẽ', correct: true },
            { text: 'Giúp lập trình viên không bao giờ cần phải viết kiểm thử tự động', correct: false },
            { text: 'Tự động tăng gấp đôi tốc độ xử lý của chip CPU', correct: false },
            { text: 'Miễn phí toàn bộ chi phí thuê máy chủ', correct: false },
          ],
          explanation:
            'Nhánh main luôn ổn định 100% giúp doanh nghiệp có thể triển khai sản phẩm bất cứ lúc nào khách hàng yêu cầu.',
        },
      ],
    },
  },
  {
    id: '16-team-project-challenge',
    moduleId: '04-github-collaboration',
    title: 'Thử thách dự án nhóm Team Project Challenge',
    duration: 45,
    xp: 200,
    keywords: ['team challenge', 'du an nhom', 'tong hop level 4', 'collaboration master', 'full workflow'],
    prerequisites: ['15-collaboration-workflow'],
    objectives: [
      'Áp dụng tổng hợp toàn bộ kỹ năng Level 4 vào một kịch bản dự án cộng tác nhóm hoàn chỉnh.',
      'Đóng vai trò một kỹ sư thực chiến giải quyết Issue, phát triển nhánh tính năng, push và mở PR.',
      'Tham gia đóng vai trò Reviewer để đánh giá mã nguồn, đưa ra phản biện và phê duyệt PR của đồng nghiệp.',
      'Xử lý tình huống xung đột khi merge PR và hoàn tất quy trình phát hành tính năng lên sản phẩm.',
    ],
    definition:
      'Thử thách dự án nhóm Team Project Challenge là bài thi sát hạch toàn diện của Level 4: GitHub Collaboration. Bạn sẽ được hòa mình vào một môi trường mô phỏng dự án nhóm thực tế với đầy đủ các vai trò: Quản trị viên (Maintainer), Lập trình viên (Developer) và Người đánh giá (Reviewer). Bạn sẽ phải giải quyết một bài toán nghiệp vụ trọn vẹn từ khâu tiếp nhận Issue trên bảng điều khiển, thực thi chuỗi lệnh Git chuẩn mực và hoàn tất đóng gói sản phẩm.',
    why:
      'Lập trình trong thế giới hiện đại là môn thể thao đồng đội. Dù bạn có kỹ năng viết thuật toán siêu hạng nhưng nếu bạn không biết cách phối hợp nhịp nhàng trên GitHub, bạn sẽ không thể hòa nhập vào bất kỳ công ty công nghệ chuyên nghiệp nào. Vượt qua thử thách này là minh chứng đanh thép khẳng định bạn đã hoàn toàn sẵn sàng làm việc trong các đội ngũ kỹ thuật đẳng cấp quốc tế.',
    mentalModel:
      'Hãy hình dung thử thách này giống như một trận thi đấu bóng đá tập dượt nội bộ trước thềm giải vô địch quốc gia. Bạn không còn tập sút bóng một mình vào khung thành trống nữa. Bạn phải phối hợp chuyền bóng ăn ý với tiền vệ (pull code), nhận đường chuyền thuận lợi (nhánh tính năng), vượt qua hàng phòng ngự đối phương (giải quyết xung đột), phối hợp với thủ môn (code review) và sút tung lưới đối phương ghi bàn thắng quyết định (Merge PR).',
    diagram: `Kịch bản mô phỏng thử thách Team Project:
[Issue: Thêm tính năng Coupon giảm giá]
                  │
                  ▼
[Kỹ sư tạo nhánh feat/coupon ──► Push ──► Tạo PR]
                  │
                  ▼
[Reviewer đánh giá: Yêu cầu sửa lỗi tính tiền]
                  │
                  ▼
[Kỹ sư cập nhật commit mới ──► Reviewer Approve ──► Squash & Merge!]`,
    example:
      'Trong kịch bản thử thách thực chiến, học viên tiếp nhận Issue #201 yêu cầu xây dựng tính năng mã giảm giá cho ứng dụng mua sắm trực tuyến. Học viên chủ động kéo mã nguồn mới nhất từ main, tạo nhánh làm việc độc lập mang tên `feat/coupon-system`, hoàn thành chức năng và tạo commit theo đúng quy ước Conventional Commits. Học viên mở PR, nhận được phản hồi yêu cầu kiểm tra trường hợp mã giảm giá hết hạn từ hệ thống giả lập Reviewer. Học viên khéo léo bổ sung commit xử lý ngoại lệ, vượt qua toàn bộ các bài kiểm tra tự động, được Approve và hòa nhập thành công vào nhánh main trong sự hoan nghênh của toàn đội.',
    commands: [
      'git switch main',
      'git pull origin main',
      'git switch -c feat/coupon-system',
      'git push -u origin feat/coupon-system',
      'git branch -d feat/coupon-system',
    ],
    explanation:
      '- `git switch main && git pull origin main`: Khởi đầu từ nền tảng code mới nhất của dự án nhóm.\n- `git switch -c <nhánh>`: Tách nhánh cô lập phát triển tính năng thử thách.\n- `git push -u origin <nhánh>`: Đẩy nhánh lên máy chủ GitHub mô phỏng.\n- `git branch -d <nhánh>`: Dọn dẹp vệ sinh kho chứa sau khi kết thúc thử thách xuất sắc.',
    mistakes: [
      'Tự ý merge PR khi chưa được Reviewer phê duyệt (bỏ qua quy trình kiểm duyệt chất lượng).',
      'Không đọc kỹ các yêu cầu nghiệp vụ trong Issue dẫn đến việc viết sai tính năng cần giao nộp.',
      'Quên cập nhật lại nhánh main cục bộ sau khi PR đã merge thành công trên hệ thống.',
    ],
    labSteps: [
      'Khởi động kịch bản mô phỏng `team-project-simulation` trong giao diện bài tập.',
      'Xem xét yêu cầu trong Issue được giao và tạo nhánh tính năng tương ứng.',
      'Viết code giải quyết bài toán và tạo commit chuẩn quy ước.',
      'Mở Pull Request, đọc nhận xét của Reviewer và thực hiện chỉnh sửa bổ sung.',
      'Hoàn tất merge PR và xác nhận Issue được đóng tự động.',
    ],
    hint: 'Bình tĩnh đọc kỹ phản hồi của Reviewer để hoàn thiện mã nguồn theo đúng tiêu chuẩn dự án.',
    validation: 'Hoàn thành 100% các tiêu chí kiểm thử của kịch bản mô phỏng dự án nhóm.',
    quizPrompt: 'Làm bài trắc nghiệm tổng kết để hoàn tất toàn bộ Level 4: GitHub Collaboration.',
    challenge: 'Mô phỏng lại toàn bộ quy trình này với một người bạn học cùng bằng cách tạo repository thật trên GitHub.',
    summary: [
      'Làm chủ toàn diện kỹ năng cộng tác: Clone, Fetch, Pull, Push, Fork, PR và Code Review.',
      'Feature Branch Workflow là kim chỉ nam cho mọi hoạt động phát triển phần mềm nhóm.',
      'Giao tiếp văn minh, viết mô tả rõ ràng và tôn trọng quy trình là chìa khóa của sự thành công.',
    ],
    quiz: {
      id: 'quiz-04-16-team-project-challenge',
      title: 'Trắc nghiệm tổng kết: Master GitHub Collaboration',
      questions: [
        {
          id: 'q1',
          question: 'Quy trình chuẩn mực nhất để một kỹ sư phần mềm hoàn thành một nhiệm vụ trong dự án nhóm là gì?',
          type: 'single',
          options: [
            { text: 'Đọc Issue -> Pull main mới nhất -> Tạo feature branch -> Code & Commit -> Push -> Mở PR -> Nhận review & sửa đổi -> Merge & Dọn nhánh', correct: true },
            { text: 'Commit trực tiếp vào nhánh main của công ty rồi gửi tin nhắn bảo đồng nghiệp tự kiểm tra', correct: false },
            { text: 'Tải mã nguồn về máy rồi gửi file nén ZIP qua email cho sếp', correct: false },
            { text: 'Xóa toàn bộ dự án cũ và tự viết lại một ứng dụng hoàn toàn mới', correct: false },
          ],
          explanation:
            'Chu trình 7 bước khép kín từ Issue đến Merge là chuẩn mực quốc tế của phát triển phần mềm chuyên nghiệp.',
        },
        {
          id: 'q2',
          question: 'Khi đồng nghiệp để lại nhận xét "Request changes" trên PR của bạn, thái độ và hành động chuẩn mực nhất là gì?',
          type: 'single',
          options: [
            { text: 'Đọc kỹ lý do kỹ thuật, trao đổi văn minh để làm rõ nếu chưa hiểu, thực hiện chỉnh sửa bổ sung và push commit mới lên PR', correct: true },
            { text: 'Nổi giận và tìm cách công kích cá nhân đồng nghiệp trên mạng xã hội', correct: false },
            { text: 'Đóng PR và xóa toàn bộ tài khoản GitHub của mình', correct: false },
            { text: 'Bỏ qua nhận xét và cố tình cưỡng chế merge code vào main', correct: false },
          ],
          explanation:
            'Code Review là cơ hội hoàn thiện mã nguồn; đón nhận phản biện với tinh thần cầu thị và chuyên nghiệp.',
        },
        {
          id: 'q3',
          question: 'Sự khác biệt căn bản giữa hai nhánh `main` và `origin/main` trên máy tính cá nhân của bạn là gì?',
          type: 'single',
          options: [
            { text: '`main` là con trỏ nhánh cục bộ bạn có thể commit sửa đổi, còn `origin/main` là con trỏ chỉ đọc phản ánh trạng thái trên server', correct: true },
            { text: 'Hai con trỏ này hoàn toàn giống nhau 100% không có gì khác biệt', correct: false },
            { text: '`origin/main` là nhánh của tổng thống Mỹ, `main` là của người dùng', correct: false },
            { text: '`main` chỉ lưu tệp ảnh, `origin/main` chỉ lưu mã nguồn', correct: false },
          ],
          explanation:
            '`origin/main` là Remote-tracking branch do Git tự cập nhật khi fetch; bạn không thể commit trực tiếp lên nó.',
        },
        {
          id: 'q4',
          question: 'Tại sao việc viết Commit Message và mô tả Pull Request rõ ràng lại cực kỳ quan trọng đối với dự án dài hạn?',
          type: 'single',
          options: [
            { text: 'Giúp lưu trữ tài liệu kỹ thuật, giải thích lý do đưa ra quyết định kiến trúc và hỗ trợ việc bảo trì sau này', correct: true },
            { text: 'Để đáp ứng yêu cầu tính số lượng từ ngữ của quản trị viên', correct: false },
            { text: 'Để làm đẹp mắt giao diện web của GitHub', correct: false },
            { text: 'Vì nếu không viết thì máy tính sẽ tự động tắt nguồn', correct: false },
          ],
          explanation:
            'Tài liệu commit và PR là di sản quý giá giúp các thế hệ kỹ sư sau hiểu được bối cảnh tại sao code lại được viết như vậy.',
        },
        {
          id: 'q5',
          question: 'Để kiểm tra xem nhánh cục bộ của bạn đang đi trước hay tụt sau nhánh remote bao nhiêu commit, lệnh nào hiển thị trực quan nhất?',
          type: 'single',
          options: [
            { text: 'git status hoặc git branch -vv', correct: true },
            { text: 'git show --cloud', correct: false },
            { text: 'git remote ping', correct: false },
            { text: 'git network-check', correct: false },
          ],
          explanation:
            '`git status` và `git branch -vv` in rõ trạng thái `ahead N` và `behind M` của tracking branch.',
        },
        {
          id: 'q6',
          question: 'Sau khi hoàn thành xuất sắc toàn bộ 16 bài học của Level 4, bạn đã đạt được năng lực nào sau đây?',
          type: 'single',
          options: [
            { text: 'Tự tin cộng tác nhóm, làm chủ toàn bộ chu trình GitHub, xử lý xung đột mạng và tham gia vào các dự án chuyên nghiệp', correct: true },
            { text: 'Trở thành chuyên gia phần cứng sửa chữa vi mạch máy tính', correct: false },
            { text: 'Biết cách hack mật khẩu tài khoản ngân hàng của người khác', correct: false },
            { text: 'Có thể lập trình mà không cần dùng đến bàn phím máy tính', correct: false },
          ],
          explanation:
            'Level 4 trang bị toàn bộ kỹ năng cộng tác nhóm và văn hóa Git chuyên nghiệp trên GitHub.',
        },
      ],
    },
  },
];
