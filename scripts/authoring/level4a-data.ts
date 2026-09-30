import { LessonAuthorData } from './types';

export const LEVEL_4A_LESSONS: LessonAuthorData[] = [
  {
    id: '01-local-vs-remote',
    moduleId: '04-github-collaboration',
    title: 'Local vs Remote Repository',
    duration: 25,
    xp: 75,
    keywords: ['local repo', 'remote repo', 'kho cuc bo', 'kho tu xa', 'github cloud', 'phan tan'],
    prerequisites: ['06-git-commit'],
    objectives: [
      'Hiểu rõ sự khác biệt bản chất giữa kho lưu trữ cục bộ (Local Repository) và kho từ xa (Remote Repository).',
      'Nắm bắt vai trò của máy chủ trung tâm (như GitHub, GitLab) trong mô hình kiểm soát phiên bản phân tán.',
      'Giải thích cơ chế đồng bộ hóa dữ liệu hai chiều thông qua các giao thức mạng bảo mật.',
      'Nhận biết lý do vì sao Git vẫn hoạt động 100% công năng ngay cả khi hoàn toàn mất kết nối Internet.',
    ],
    definition:
      'Trong kiến trúc phân tán của Git, Local Repository (kho lưu trữ cục bộ) là toàn bộ cơ sở dữ liệu lịch sử hoàn chỉnh được lưu trữ ngay trên ổ đĩa cứng máy tính cá nhân của lập trình viên (trong thư mục ẩn `.git`). Ngược lại, Remote Repository (kho lưu trữ từ xa) là một phiên bản kho chứa được lưu trữ trên một máy chủ chuyên dụng đặt trên mạng nội bộ hoặc trên nền tảng đám mây (tiêu biểu như GitHub, GitLab, Bitbucket). Hai kho chứa này tồn tại hoàn toàn độc lập với nhau và chỉ trao đổi dữ liệu khi bạn chủ động thực hiện các lệnh đồng bộ hóa mạng.',
    why:
      'Lập trình viên làm việc độc lập trên máy cá nhân có thể commit mã nguồn hàng trăm lần mà không cần kết nối mạng. Tuy nhiên, để làm việc nhóm, chia sẻ mã nguồn với đồng nghiệp, lưu trữ bản sao dự phòng an toàn và kích hoạt các quy trình kiểm thử tự động CI/CD, bạn bắt buộc phải kết nối kho cục bộ với một kho từ xa trên GitHub. Hiểu đúng mối quan hệ độc lập nhưng liên kết này giúp bạn tránh tâm lý sợ hãi làm hỏng server từ xa khi mới làm quen với Git.',
    mentalModel:
      'Hãy hình dung Local Repository giống như cuốn sổ tay nhật ký cá nhân mà bạn để trong ngăn kéo bàn làm việc tại nhà riêng. Bạn có thể thoải mái viết nháp, tẩy xóa và vẽ biểu đồ vào sổ bất cứ lúc nào mà không ai nhìn thấy. Remote Repository trên GitHub giống như chiếc bảng tin công cộng đặt tại sảnh trung tâm của công ty. Thỉnh thoảng, khi đã viết xong một bài phân tích hoàn chỉnh trong sổ tay, bạn đem photo một bản sạch đẹp rồi dán lên bảng tin công ty để tất cả đồng nghiệp cùng đọc và góp ý.',
    diagram: `Mô hình Local vs Remote Repository:
Máy tính cá nhân (Local):       Máy chủ GitHub (Remote):
┌─────────────────────────┐     ┌─────────────────────────┐
│ Working Directory       │     │                         │
│ Staging Area            │     │  Remote Repository      │
│ Local Repo (.git)       │◄───►│  (origin/main)          │
│ (commit offline)        │     │  (đám mây lưu trữ)      │
└─────────────────────────┘     └─────────────────────────┘
        ▲                                    ▲
        └──────── push / fetch / pull ───────┘`,
    example:
      'Một kỹ sư phần mềm đang ngồi trên chuyến bay đường dài từ Hà Nội vào Thành phố Hồ Chí Minh và hoàn toàn không có sóng Wi-Fi Internet. Kỹ sư vẫn mở máy tính xách tay, khởi động dự án và tạo 6 commit mới trên Local Repository để hoàn thiện chức năng xuất hóa đơn điện tử. Khi máy bay hạ cánh và điện thoại bắt sóng 4G, kỹ sư kết nối mạng và thực thi một lệnh duy nhất để đẩy toàn bộ 6 commit này lên Remote Repository trên GitHub cho đồng nghiệp kiểm duyệt một cách thuận lợi và an toàn.',
    commands: [
      'git remote -v',
      'git status',
      'git branch -a',
    ],
    explanation:
      '- `git remote -v`: Liệt kê tất cả các liên kết kho lưu trữ từ xa kèm URL chi tiết phục vụ việc fetch và push.\n- `git status`: Hiển thị vị trí tương đối giữa nhánh cục bộ và nhánh theo dõi từ xa (ahead / behind).\n- `git branch -a`: Liệt kê tất cả các nhánh bao gồm cả nhánh cục bộ và các nhánh remote-tracking màu đỏ.',
    mistakes: [
      'Nghĩ rằng commit trên máy tính cá nhân sẽ tự động bay lên GitHub: Bạn bắt buộc phải chạy lệnh git push thì dữ liệu mới lên máy chủ.',
      'Sợ rằng mất mạng Internet sẽ không làm việc được với Git: Git hoàn toàn offline; bạn chỉ cần mạng khi gửi hoặc nhận dữ liệu.',
      'Nhầm lẫn giữa Git (phần mềm quản lý phiên bản) và GitHub (dịch vụ máy chủ lưu trữ đám mây).',
    ],
    labSteps: [
      'Kiểm tra cấu hình liên kết từ xa hiện tại bằng lệnh `git remote -v`.',
      'Quan sát danh sách toàn bộ các nhánh cục bộ và nhánh từ xa bằng `git branch -a`.',
      'Chạy `git status` để xem nhánh hiện tại có đang theo dõi nhánh từ xa nào không.',
    ],
    hint: 'Nhớ nguyên tắc: Commit là cục bộ (Local), Push mới là đưa lên máy chủ từ xa (Remote).',
    validation: 'Hiểu rõ vị trí lưu trữ của Local Repository và Remote Repository trên GitHub.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về mô hình Local vs Remote Repository.',
    challenge: 'Nêu ưu điểm vượt trội của mô hình phân tán Git so với mô hình tập trung SVN khi xảy ra sự cố sập máy chủ.',
    summary: [
      'Local Repo nằm hoàn chỉnh trên máy tính cá nhân, cho phép làm việc offline 100%.',
      'Remote Repo nằm trên máy chủ (GitHub) dùng để chia sẻ, sao lưu và cộng tác nhóm.',
      'Hai kho độc lập hoàn toàn, chỉ trao đổi dữ liệu khi chạy push, fetch, hoặc pull.',
    ],
    quiz: {
      id: 'quiz-04-01-local-vs-remote',
      title: 'Trắc nghiệm: Local vs Remote Repository',
      questions: [
        {
          id: 'q1',
          question: 'Khi bạn chạy lệnh `git commit -m "feat: add payment"` trên máy tính cá nhân, snapshot commit mới được lưu ở đâu?',
          type: 'single',
          options: [
            { text: 'Chỉ lưu trong Local Repository nằm trong thư mục .git trên ổ cứng máy tính cá nhân của bạn', correct: true },
            { text: 'Tự động gửi ngay lập tức lên máy chủ GitHub qua đường truyền Internet', correct: false },
            { text: 'Tự động tải lên trang chủ của tổ chức Git quốc tế', correct: false },
            { text: 'Lưu vào bộ nhớ đám mây Google Drive của bạn', correct: false },
          ],
          explanation:
            'Git là hệ thống phân tán: commit chỉ lưu cục bộ vào thư mục .git trên máy cá nhân cho đến khi bạn push.',
        },
        {
          id: 'q2',
          question: 'Khi máy tính của bạn hoàn toàn bị mất kết nối mạng Internet, bạn CÓ THỂ làm được thao tác nào sau đây với Git?',
          type: 'single',
          options: [
            { text: 'Tạo nhánh mới, chuyển nhánh, xem lịch sử git log, tạo commit và giải quyết conflict trên máy cục bộ', correct: true },
            { text: 'Đẩy code lên GitHub bằng git push', correct: false },
            { text: 'Kéo code mới nhất của đồng nghiệp về máy bằng git pull', correct: false },
            { text: 'Tạo Pull Request trên giao diện web của GitHub', correct: false },
          ],
          explanation:
            'Mọi tính năng quản lý lịch sử (branch, commit, log, merge) đều hoạt động offline 100% trên Local Repo.',
        },
        {
          id: 'q3',
          question: 'Vai trò cốt lõi của Remote Repository đặt trên GitHub trong một dự án phần mềm là gì?',
          type: 'single',
          options: [
            { text: 'Đóng vai trò điểm tập kết trung tâm để các thành viên chia sẻ mã nguồn, sao lưu và kích hoạt CI/CD', correct: true },
            { text: 'Tự động sửa lỗi cú pháp trong mã nguồn của lập trình viên', correct: false },
            { text: 'Cung cấp kết nối mạng Internet tốc độ cao miễn phí cho máy tính', correct: false },
            { text: 'Thay thế hoàn toàn hệ điều hành trên máy tính của bạn', correct: false },
          ],
          explanation:
            'Remote Repo là cầu nối trung gian giúp các lập trình viên đồng bộ công việc và tự động hóa quy trình.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào cho phép bạn kiểm tra danh sách các máy chủ từ xa đang được cấu hình liên kết với kho cục bộ?',
          type: 'single',
          options: [
            { text: 'git remote -v', correct: true },
            { text: 'git check-network', correct: false },
            { text: 'git view-cloud', correct: false },
            { text: 'git server-list', correct: false },
          ],
          explanation:
            '`git remote -v` hiển thị tên định danh remote (như origin) kèm theo URL fetch và push cụ thể.',
        },
        {
          id: 'q5',
          question: 'Điều gì xảy ra nếu máy chủ từ xa trên GitHub bị mất điện hoặc ngừng hoạt động tạm thời?',
          type: 'single',
          options: [
            { text: 'Bạn vẫn tiếp tục lập trình, tạo nhánh và commit bình thường trên máy cá nhân không hề bị gián đoạn', correct: true },
            { text: 'Toàn bộ mã nguồn trên máy tính của bạn sẽ bị tự động khóa lại', correct: false },
            { text: 'Bạn phải cài đặt lại hệ điều hành từ đầu', correct: false },
            { text: 'Mọi commit trước đó trên máy cá nhân sẽ bị xóa sạch', correct: false },
          ],
          explanation:
            'Nhờ kiến trúc phân tán, mỗi máy cá nhân là một bản sao trọn vẹn, không phụ thuộc vào tình trạng máy chủ.',
        },
        {
          id: 'q6',
          question: 'Thao tác nào bắt buộc phải có kết nối mạng Internet để thực hiện thành công?',
          type: 'single',
          options: [
            { text: 'Đồng bộ hóa dữ liệu với máy chủ từ xa thông qua lệnh `git push` hoặc `git pull`', correct: true },
            { text: 'Xem lại nhật ký các commit bằng lệnh `git log`', correct: false },
            { text: 'Tạo một nhánh mới bằng lệnh `git branch`', correct: false },
            { text: 'Kiểm tra trạng thái tệp tin bằng lệnh `git status`', correct: false },
          ],
          explanation:
            'Chỉ các lệnh trao đổi qua giao thức mạng (push, fetch, pull, clone) mới cần kết nối Internet.',
        },
      ],
    },
  },
  {
    id: '02-git-remote',
    moduleId: '04-github-collaboration',
    title: 'Quản lý remote với git remote',
    duration: 25,
    xp: 80,
    keywords: ['git remote', 'remote add', 'remote remove', 'remote set-url', 'origin', 'lien ket kho'],
    prerequisites: ['01-local-vs-remote'],
    objectives: [
      'Sử dụng thành thạo câu lệnh `git remote` để quản trị danh sách các kho lưu trữ từ xa.',
      'Biết cách liên kết một kho cục bộ vừa tạo với kho từ xa trên GitHub bằng `git remote add`.',
      'Đổi tên và thay đổi đường dẫn URL của remote an toàn khi dự án đổi tên miền hoặc tổ chức.',
      'Xóa bỏ các liên kết remote không còn sử dụng bằng lệnh `git remote remove`.',
    ],
    definition:
      '`git remote` là câu lệnh quản trị chuyên trách dùng để xem, thiết lập, chỉnh sửa và quản lý các kết nối tham chiếu giữa kho lưu trữ cục bộ trên máy tính của bạn với các kho lưu trữ từ xa trên mạng. Thay vì phải gõ toàn bộ chuỗi URL mạng dài dòng và phức tạp (như `https://github.com/company/project.git`) mỗi khi gửi nhận code, Git cho phép bạn đặt một tên định danh ngắn gọn tiện lợi (bí danh - alias) cho URL đó, tiêu biểu nhất là tên quy ước `origin`.',
    why:
      'Khi bạn khởi tạo một dự án mới hoàn toàn trên máy tính cá nhân bằng `git init`, kho chứa của bạn hoàn toàn cô lập và chưa hề biết máy chủ GitHub nằm ở đâu. Lệnh `git remote` chính là nhịp cầu đầu tiên giúp bạn khai báo địa chỉ của GitHub cho Git hiểu. Nắm vững lệnh này cũng giúp bạn dễ dàng chuyển đổi giữa các giao thức HTTPS và SSH, hoặc liên kết cùng lúc với nhiều remote khác nhau (như upstream của cộng đồng mã nguồn mở).',
    mentalModel:
      'Hãy hình dung `git remote` giống như ứng dụng Danh bạ điện thoại trên chiếc smartphone của bạn. Bạn không thể nhớ nổi dãy số điện thoại quốc tế dài dằng dặc của từng người bạn (chuỗi URL repo). Vì vậy, bạn lưu số đó lại và đặt một cái tên danh bạ ngắn gọn, dễ nhớ như "origin" hay "upstream". Mỗi khi bạn muốn gọi điện hay gửi tin nhắn (push/pull), bạn chỉ cần chọn tên "origin" là điện thoại tự động kết nối chính xác tới địa chỉ đích.',
    diagram: `Cơ chế đặt bí danh của git remote:
Bí danh (Alias):         URL thực tế trên máy chủ:
origin       ──► https://github.com/my-org/my-app.git
upstream     ──► https://github.com/original-author/my-app.git`,
    example:
      'Lập trình viên Thành vừa khởi tạo một dự án mới trên máy tính và muốn tải mã nguồn lên kho chứa mới tạo trên GitHub. Thành mở terminal và thực hiện lệnh: `git remote add origin https://github.com/thanh-dev/ecommerce-api.git`. Sau đó, Thành gõ `git remote -v` để kiểm tra lại cấu hình mạng. Màn hình console in ra hai dòng xác nhận origin đã trỏ tới URL GitHub cho cả hai chiều fetch và push. Từ thời điểm này, Thành có thể thoải mái đẩy code lên mạng bằng câu lệnh ngắn gọn `git push -u origin main` mà không cần phải gõ lại chuỗi URL phức tạp mỗi ngày. Việc này giúp Thành tiết kiệm thời gian và hoàn toàn tránh khỏi nguy cơ gõ sai đường dẫn dự án.',
    commands: [
      'git remote',
      'git remote -v',
      'git remote add <tên-bí-danh> <url>',
      'git remote rename <tên-cũ> <tên-mới>',
      'git remote set-url <tên-bí-danh> <url-mới>',
      'git remote remove <tên-bí-danh>',
    ],
    explanation:
      '- `git remote`: Liệt kê các tên bí danh của remote hiện có (ví dụ: origin).\n- `git remote -v`: Hiển thị tên bí danh kèm theo địa chỉ URL chi tiết cho hai thao tác fetch và push.\n- `git remote add <tên> <url>`: Tạo một liên kết remote mới trỏ tới địa chỉ kho trên server.\n- `git remote rename <cũ> <mới>`: Đổi tên định danh remote trong cấu hình dự án.\n- `git remote set-url <tên> <url-mới>`: Cập nhật địa chỉ URL mới khi dự án thay đổi đường dẫn hoặc đổi từ HTTPS sang SSH.\n- `git remote remove <tên>`: Xóa bỏ liên kết remote khỏi kho lưu trữ cục bộ.',
    mistakes: [
      'Gõ sai chính tả URL kho chứa: Khiến lệnh push hoặc fetch sau đó bị lỗi 404 Not Found hoặc Authentication Failed.',
      'Thêm remote trùng tên origin hai lần: Git sẽ báo lỗi `fatal: remote origin already exists`; bạn cần dùng `set-url` nếu muốn đổi link.',
      'Nghĩ rằng git remote remove sẽ xóa kho chứa trên GitHub: Lệnh này chỉ xóa liên kết cấu hình trên máy tính cá nhân của bạn.',
    ],
    labSteps: [
      'Xem danh sách remote hiện hữu bằng `git remote -v`.',
      'Thêm một liên kết remote thử nghiệm có tên `backup` bằng `git remote add backup https://github.com/user/backup.git`.',
      'Kiểm tra lại bằng `git remote -v` để thấy cả hai liên kết.',
      'Xóa liên kết thử nghiệm vừa tạo bằng `git remote remove backup`.',
    ],
    hint: 'Nếu muốn đổi địa chỉ URL của origin, hãy dùng `git remote set-url origin <url-mới>`.',
    validation: 'Cấu hình và kiểm tra thành công danh sách remote với `git remote -v`.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh quản lý git remote.',
    challenge: 'Giải thích sự khác biệt giữa URL giao thức HTTPS và URL giao thức SSH khi cấu hình git remote.',
    summary: [
      '`git remote` quản lý các bí danh liên kết tới kho lưu trữ từ xa trên mạng.',
      'Sử dụng `git remote add origin <url>` để kết nối kho cá nhân với GitHub.',
      'Dùng `set-url` để sửa địa chỉ và `remove` để gỡ bỏ liên kết an toàn.',
    ],
    quiz: {
      id: 'quiz-04-02-git-remote',
      title: 'Trắc nghiệm: Quản lý remote với git remote',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh nào sau đây dùng để liên kết kho lưu trữ cục bộ với một kho trên GitHub có tên bí danh là `origin`?',
          type: 'single',
          options: [
            { text: 'git remote add origin https://github.com/user/repo.git', correct: true },
            { text: 'git connect github https://github.com/user/repo.git', correct: false },
            { text: 'git link cloud origin https://github.com/user/repo.git', correct: false },
            { text: 'git push --set-remote https://github.com/user/repo.git', correct: false },
          ],
          explanation:
            '`git remote add <tên> <url>` là cú pháp chuẩn để thiết lập liên kết với kho từ xa.',
        },
        {
          id: 'q2',
          question: 'Cờ tùy chọn `-v` trong câu lệnh `git remote -v` có ý nghĩa là gì?',
          type: 'single',
          options: [
            { text: 'Verbose: Hiển thị chi tiết địa chỉ URL đầy đủ cho cả hai chiều fetch và push', correct: true },
            { text: 'Verify: Tự động kiểm tra mật khẩu tài khoản người dùng', correct: false },
            { text: 'Version: Hiển thị phiên bản phần mềm Git đang cài trên máy tính', correct: false },
            { text: 'Virtual: Tạo một kho lưu trữ ảo trong bộ nhớ RAM', correct: false },
          ],
          explanation:
            '`-v` (verbose) yêu cầu Git in ra đầy đủ chi tiết đường dẫn URL của từng remote.',
        },
        {
          id: 'q3',
          question: 'Nếu công ty của bạn chuyển đổi tên miền máy chủ và bạn cần cập nhật URL mới cho `origin`, bạn dùng lệnh nào?',
          type: 'single',
          options: [
            { text: 'git remote set-url origin <url-mới>', correct: true },
            { text: 'git remote update-domain origin <url-mới>', correct: false },
            { text: 'git change origin <url-mới>', correct: false },
            { text: 'git url reset origin <url-mới>', correct: false },
          ],
          explanation:
            '`git remote set-url <tên> <url-mới>` thay đổi trực tiếp URL đích mà không cần xóa đi tạo lại.',
        },
        {
          id: 'q4',
          question: 'Điều gì thực sự xảy ra khi bạn chạy lệnh `git remote remove origin` trên máy tính cá nhân?',
          type: 'single',
          options: [
            { text: 'Chỉ có dòng cấu hình liên kết origin bị xóa khỏi tệp .git/config cục bộ, kho trên GitHub vẫn an toàn 100%', correct: true },
            { text: 'Toàn bộ kho chứa của công ty trên GitHub sẽ bị xóa vĩnh viễn', correct: false },
            { text: 'Mã nguồn trong Working Directory bị biến mất hoàn toàn', correct: false },
            { text: 'Tài khoản GitHub của bạn bị khóa vĩnh viễn', correct: false },
          ],
          explanation:
            'Lệnh này chỉ gỡ bỏ cấu hình định danh cục bộ, hoàn toàn không tác động đến dữ liệu trên máy chủ remote.',
        },
        {
          id: 'q5',
          question: 'Thông tin cấu hình của các remote được Git lưu trữ nội bộ tại tệp tin nào trong dự án?',
          type: 'single',
          options: [
            { text: '.git/config', correct: true },
            { text: '.git/remotes.json', correct: false },
            { text: 'package.json', correct: false },
            { text: 'README.md', correct: false },
          ],
          explanation:
            'Các khối cấu hình `[remote "origin"]` được ghi trực tiếp vào tệp văn bản cấu hình `.git/config`.',
        },
        {
          id: 'q6',
          question: 'Một kho lưu trữ Git cục bộ có thể liên kết tới bao nhiêu kho từ xa (remotes) cùng lúc?',
          type: 'single',
          options: [
            { text: 'Không giới hạn, bạn có thể thêm nhiều remote khác nhau như origin, upstream, backup', correct: true },
            { text: 'Duy nhất chỉ một remote mà thôi', correct: false },
            { text: 'Tối đa hai remote cho hai lập trình viên', correct: false },
            { text: 'Tối đa mười remote', correct: false },
          ],
          explanation:
            'Git hỗ trợ liên kết với bao nhiêu remote tùy ý, cực kỳ phổ biến trong mô hình fork/upstream.',
        },
      ],
    },
  },
  {
    id: '03-origin-concept',
    moduleId: '04-github-collaboration',
    title: 'origin trong Git là gì?',
    duration: 20,
    xp: 70,
    keywords: ['origin', 'default remote', 'ten mac dinh', 'quy uoc git', 'remote name'],
    prerequisites: ['02-git-remote'],
    objectives: [
      'Giải thích bản chất tên gọi `origin` trong Git như một quy ước đặt tên mặc định.',
      'Hiểu vì sao khi clone một dự án, Git tự động đặt tên remote chính là `origin`.',
      'Biết rằng `origin` hoàn toàn có thể đổi thành bất kỳ tên nào khác tùy thích.',
      'Phân biệt rõ ràng giữa tên gọi `origin` và các từ khóa kỹ thuật bắt buộc của hệ thống.',
    ],
    definition:
      '`origin` trong Git hoàn toàn không phải là một từ khóa kỹ thuật kỳ diệu hay một câu lệnh bắt buộc, mà đơn thuần là một cái tên quy ước mặc định (default convention alias) mà Git tự động gán cho kho lưu trữ từ xa mà bạn đã nhân bản (clone) dự án về. Nếu bạn tự khởi tạo kho bằng `git init`, bạn hoàn toàn có thể đặt tên remote là `github`, `server`, `cong-ty` hoặc bất kỳ cái tên nào bạn thích, nhưng cộng đồng toàn cầu đều thống nhất dùng `origin` để việc hợp tác trở nên dễ hiểu.',
    why:
      'Rất nhiều người mới học Git lầm tưởng `origin` là một câu lệnh huyền bí của Git và không hiểu vì sao mình luôn phải gõ `git push origin main`. Nhận thức được `origin` chỉ là một cái tên quy ước giúp bạn gạt bỏ sự mơ hồ, hiểu rõ cấu trúc của lệnh Git và tự tin làm việc với các hệ thống phức tạp có nhiều remote cùng lúc như quy trình đóng góp mã nguồn mở Open Source. Bạn cũng sẽ dễ dàng cấu hình các đường ống CI/CD tự động mà không gặp phải các lỗi khó hiểu.',
    mentalModel:
      'Hãy hình dung bạn cài đặt một số gọi nhanh (Speed Dial số 1) trên điện thoại và đặt tên danh bạ cho số đó là "Nhà" (Home). Bạn hoàn toàn có thể đổi tên danh bạ đó thành "Gia đình" hay "Tổ ấm" tùy ý, điện thoại vẫn bấm đúng số đó. Nhưng hầu hết mọi người trên thế giới đều quen cài nút số 1 là "Nhà". Tương tự như vậy, `origin` chính là nút gọi nhanh số 1 kết nối thẳng tới kho máy chủ chính của dự án.',
    diagram: `Bản chất quy ước của tên gọi origin:
Lệnh gõ: git push origin main
                  │
                  ▼
         (Bí danh quy ước)
         [origin] ──► https://github.com/acme/project.git
         (Có thể đổi thành 'my-cloud' mà hệ thống vẫn chạy chuẩn)`,
    example:
      'Một lập trình viên tò mò muốn kiểm tra xem origin có phải từ khóa bất biến hay không. Lập trình viên chạy lệnh: `git remote rename origin central-hub`. Kể từ thời điểm đó, mỗi khi muốn đẩy code lên nhánh main của máy chủ, lập trình viên gõ: `git push central-hub main`. Mọi chức năng vẫn hoạt động hoàn hảo 100%. Tuy nhiên, để các đồng nghiệp mới vào nhóm không bị bỡ ngỡ khi đọc tài liệu hướng dẫn và để đảm bảo tính đồng bộ lâu dài, lập trình viên quyết định đổi tên lại thành `origin` cho đúng chuẩn mực quốc tế chung mà toàn thể giới công nghệ đang áp dụng.',
    commands: [
      'git remote -v',
      'git remote rename origin my-server',
      'git remote rename my-server origin',
    ],
    explanation:
      '- `git remote -v`: Quan sát tên bí danh hiện tại đang liên kết với URL nào của dự án.\n- `git remote rename origin <tên-mới>`: Đổi tên quy ước mặc định origin sang một tên bất kỳ tùy thích theo nhu cầu dự án.\n- `git remote rename <tên-mới> origin`: Đưa tên bí danh trở lại chuẩn mực chung của cộng đồng lập trình viên toàn cầu.',
    mistakes: [
      'Nghĩ origin là một lệnh đặc biệt: Lầm tưởng origin có chức năng riêng chứ không biết nó chỉ là tên gọi đại diện cho URL.',
      'Đặt tên remote tùy tiện trong dự án nhóm: Gây khó khăn cho các script tự động hóa CI/CD vốn mặc định tìm tên origin.',
      'Hoang mang khi tài liệu hướng dẫn dùng tên khác: Ví dụ upstream trong các dự án fork mã nguồn mở.',
    ],
    labSteps: [
      'Chạy lệnh `git remote` và xác nhận kết quả in ra là `origin`.',
      'Thử đổi tên `origin` thành `github-main` bằng `git remote rename origin github-main`.',
      'Chạy `git remote -v` để thấy bí danh mới hoạt động bình thường.',
      'Đổi lại thành `origin` bằng lệnh `git remote rename github-main origin`.',
    ],
    hint: 'Mặc dù có thể đổi tên, bạn luôn nên giữ tên `origin` để tuân thủ quy ước chuẩn quốc tế.',
    validation: 'Hiểu rõ nguồn gốc và bản chất quy ước của tên gọi `origin`.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm origin trong Git.',
    challenge: 'Tại sao các công cụ CI/CD tự động như GitHub Actions luôn mặc định cấu hình tên remote là origin?',
    summary: [
      '`origin` là tên quy ước mặc định do Git tự động đặt khi clone dự án.',
      'Nó không phải từ khóa ma thuật, mà chỉ là bí danh trỏ tới URL của server.',
      'Nên luôn giữ tên `origin` để tương thích tốt nhất với đồng nghiệp và hệ thống tự động.',
    ],
    quiz: {
      id: 'quiz-04-03-origin-concept',
      title: 'Trắc nghiệm: Bản chất origin trong Git',
      questions: [
        {
          id: 'q1',
          question: 'Từ ngữ `origin` trong câu lệnh `git push origin main` có bản chất thực sự là gì?',
          type: 'single',
          options: [
            { text: 'Là tên định danh (bí danh alias) quy ước đại diện cho địa chỉ URL của kho lưu trữ từ xa', correct: true },
            { text: 'Là một câu lệnh bắt buộc của nhân hệ điều hành Linux', correct: false },
            { text: 'Là tên tài khoản người sáng lập ra hệ thống Git', correct: false },
            { text: 'Là giao thức truyền file bí mật qua Internet', correct: false },
          ],
          explanation:
            '`origin` chỉ là bí danh đặt tên cho URL của server từ xa, hoàn toàn có thể đổi sang tên khác nếu muốn.',
        },
        {
          id: 'q2',
          question: 'Khi bạn chạy lệnh `git clone <url>`, tên remote mặc định mà Git tự động tạo cho kho vừa tải về là gì?',
          type: 'single',
          options: [
            { text: 'origin', correct: true },
            { text: 'master', correct: false },
            { text: 'github', correct: false },
            { text: 'remote-server', correct: false },
          ],
          explanation:
            'Git clone tự động đặt tên cho remote kết nối tới nguồn gốc là `origin`.',
        },
        {
          id: 'q3',
          question: 'Bạn có thể đổi tên `origin` thành một tên khác như `my-github` được hay không?',
          type: 'single',
          options: [
            { text: 'Hoàn toàn được, bằng câu lệnh `git remote rename origin my-github`', correct: true },
            { text: 'Không bao giờ được, Git sẽ báo lỗi hỏng kho chứa ngay', correct: false },
            { text: 'Chỉ được đổi khi trả phí bản quyền cho GitHub', correct: false },
            { text: 'Chỉ được đổi trên máy tính chạy macOS', correct: false },
          ],
          explanation:
            'Bạn có toàn quyền đổi tên remote bằng lệnh `git remote rename`.',
        },
        {
          id: 'q4',
          question: 'Tại sao các kỹ sư phần mềm trên thế giới hầu như đều giữ nguyên tên `origin` thay vì đổi tên khác?',
          type: 'single',
          options: [
            { text: 'Để tuân thủ chuẩn mực quy ước toàn cầu, giúp tài liệu, đồng nghiệp và công cụ CI/CD hoạt động thống nhất', correct: true },
            { text: 'Vì nếu đổi tên thì dung lượng dự án sẽ tăng gấp mười lần', correct: false },
            { text: 'Vì luật pháp quốc tế bắt buộc phải dùng chữ origin', correct: false },
            { text: 'Vì bàn phím máy tính không gõ được chữ khác', correct: false },
          ],
          explanation:
            'Quy ước chung giúp tiết kiệm thời gian giải thích và tránh lỗi cấu hình trong các quy trình tự động.',
        },
      ],
    },
  },
  {
    id: '04-git-clone',
    moduleId: '04-github-collaboration',
    title: 'Tải dự án về máy với git clone',
    duration: 25,
    xp: 80,
    keywords: ['git clone', 'tai du an', 'nhan ban kho', 'clone repo', 'bat dau du an'],
    prerequisites: ['03-origin-concept'],
    objectives: [
      'Sử dụng câu lệnh `git clone` để tải toàn bộ một dự án từ GitHub về máy tính cá nhân.',
      'Hiểu rõ các hành động ngầm mà Git tự động thực hiện trong quá trình clone: khởi tạo, liên kết remote, fetch dữ liệu và checkout nhánh mặc định.',
      'Tùy chỉnh tên thư mục đích khi clone dự án về ổ đĩa.',
      'Sử dụng cờ `--depth 1` (shallow clone) để tải nhanh các dự án có kích thước khổng lồ.',
    ],
    definition:
      '`git clone` là câu lệnh mạnh mẽ bậc nhất giúp bạn tạo ra một bản sao cục bộ hoàn chỉnh (exact local copy) của một kho lưu trữ từ xa trên máy tính của bạn. Quá trình clone không chỉ tải về các tệp tin mã nguồn hiện tại, mà còn sao chép toàn bộ cơ sở dữ liệu lịch sử commit, tất cả các nhánh, các thẻ tag và cấu hình của dự án, đồng thời tự động thiết lập liên kết remote `origin` trỏ về kho máy chủ ban đầu.',
    why:
      'Khi bạn gia nhập một công ty mới, tham gia vào một dự án mã nguồn mở hoặc chuyển sang làm việc trên một chiếc máy tính cá nhân mới, `git clone` luôn là câu lệnh đầu tiên bạn phải gõ. Nắm vững cơ chế hoạt động của clone giúp bạn bắt đầu công việc nhanh chóng, tự tin tải các dự án mẫu về học tập và biết cách tối ưu thời gian tải dữ liệu đối với những kho chứa có dung lượng lớn.',
    mentalModel:
      'Hãy hình dung việc clone một kho lưu trữ giống như bạn bước vào một thư viện quốc gia lớn, tìm thấy một cuốn bách khoa toàn thư quý hiếm dày 1000 trang, và đưa toàn bộ cuốn sách qua một chiếc máy photocopy 3D siêu tốc. Bạn mang về nhà một cuốn sách mới tinh giống hệt 100% bản gốc từ trang bìa, nội dung đến từng trang nhật ký chỉnh sửa của tác giả, kèm theo một sợi dây liên lạc trực tiếp tới thư viện.',
    diagram: `Quy trình tự động bên trong lệnh git clone:
git clone https://github.com/user/project.git
                      │
   ┌──────────────────┼──────────────────┐
   ▼                  ▼                  ▼
[1. git init]  [2. remote add origin] [3. git fetch]
   │
   ▼
[4. git checkout main (tạo Working Tree hoàn chỉnh)]`,
    example:
      'Ngày đầu tiên đi làm tại công ty công nghệ, kỹ sư Minh nhận được đường dẫn kho mã nguồn của dự án ứng dụng di động: `https://github.com/company/mobile-app.git`. Minh mở terminal trên máy tính mới và gõ lệnh: `git clone https://github.com/company/mobile-app.git`. Git tự động tạo thư mục mobile-app, tải về toàn bộ lịch sử 500 commit từ trước tới nay, liên kết sẵn remote origin và đưa mã nguồn ra màn hình. Minh chỉ việc mở thư mục bằng VS Code và bắt đầu làm việc ngay lập tức mà không cần bất kỳ thao tác cấu hình thủ công phức tạp nào khác.',
    commands: [
      'git clone <url-kho-chứa>',
      'git clone <url-kho-chứa> <tên-thư-mục-mới>',
      'git clone --depth 1 <url-kho-chứa>',
      'git clone --branch <tên-nhánh> <url-kho-chứa>',
    ],
    explanation:
      '- `git clone <url>`: Sao chép toàn bộ kho từ xa về thư mục mang tên mặc định của dự án.\n- `git clone <url> <tên-thư-mục>`: Tải dự án về và đặt tên thư mục theo ý muốn cá nhân.\n- `git clone --depth 1 <url>`: Shallow clone: Chỉ tải commit mới nhất, giảm tối đa dung lượng tải về khi chỉ muốn đọc code.\n- `git clone --branch <nhánh> <url>`: Tải về và tự động checkout sẵn ngay vào nhánh chỉ định thay vì nhánh mặc định.',
    mistakes: [
      'Clone một kho chứa Git vào bên trong một kho chứa Git khác đang tồn tại: Tạo ra cấu trúc lồng nhau lỗi (nested repository).',
      'Quên kiểm tra quyền truy cập: Clone kho riêng tư (private repo) mà chưa đăng nhập tài khoản có quyền đọc sẽ bị báo lỗi Permission denied.',
      'Tải về dạng file ZIP từ GitHub thay vì dùng git clone: Bạn sẽ bị mất hoàn toàn toàn bộ lịch sử commit và không thể git push được.',
    ],
    labSteps: [
      'Thực hiện clone một kho lưu trữ mẫu bằng `git clone https://github.com/git-academy/sample-demo.git`.',
      'Di chuyển vào thư mục vừa clone bằng `cd sample-demo`.',
      'Kiểm tra cấu hình remote tự sinh bằng `git remote -v`.',
      'Kiểm tra lịch sử commit đã tải về trọn vẹn bằng `git log --oneline`.',
    ],
    hint: 'Tuyệt đối không chạy lệnh `git clone` khi bạn đang đứng bên trong một thư mục đã có file `.git`.',
    validation: 'Kho lưu trữ được clone hoàn chỉnh về máy tính với remote origin trỏ đúng URL.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git clone.',
    challenge: 'So sánh sự khác nhau về thời gian và dung lượng đĩa giữa full clone và shallow clone (`--depth 1`).',
    summary: [
      '`git clone` sao chép toàn bộ mã nguồn, lịch sử commit và các nhánh về máy tính.',
      'Tự động thiết lập sẵn remote `origin` trỏ về kho máy chủ ban đầu.',
      'Sử dụng `--depth 1` khi muốn tải nhanh mã nguồn mà không cần tải toàn bộ lịch sử quá khứ.',
    ],
    quiz: {
      id: 'quiz-04-04-git-clone',
      title: 'Trắc nghiệm: Tải dự án với git clone',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh `git clone` khác biệt căn bản so với việc tải tệp nén "Download ZIP" từ GitHub ở điểm nào?',
          type: 'single',
          options: [
            { text: 'Clone tải về toàn bộ kho lưu trữ bao gồm thư mục .git, đầy đủ lịch sử commit và liên kết remote origin', correct: true },
            { text: 'Clone chỉ tải về đúng một tệp tin duy nhất', correct: false },
            { text: 'Download ZIP giữ lại được toàn bộ các nhánh còn clone thì không', correct: false },
            { text: 'Download ZIP tự động tạo commit mới trên máy tính', correct: false },
          ],
          explanation:
            'Download ZIP chỉ chứa mã nguồn phẳng tại thời điểm hiện tại, hoàn toàn không có lịch sử Git hay liên kết remote.',
        },
        {
          id: 'q2',
          question: 'Lệnh nào sau đây cho phép bạn clone dự án về nhưng đặt tên thư mục trên máy tính là `my-custom-app`?',
          type: 'single',
          options: [
            { text: 'git clone https://github.com/org/app.git my-custom-app', correct: true },
            { text: 'git clone https://github.com/org/app.git --rename-to my-custom-app', correct: false },
            { text: 'git clone --name my-custom-app https://github.com/org/app.git', correct: false },
            { text: 'git clone -dir my-custom-app https://github.com/org/app.git', correct: false },
          ],
          explanation:
            'Đối số thứ hai phía sau URL trong lệnh `git clone <url> <dir>` chính là tên thư mục đích.',
        },
        {
          id: 'q3',
          question: 'Tùy chọn `--depth 1` trong câu lệnh `git clone` mang lại lợi ích lớn nhất nào sau đây?',
          type: 'single',
          options: [
            { text: 'Chỉ tải về duy nhất một snapshot commit mới nhất, giúp tốc độ tải cực nhanh và tiết kiệm dung lượng ổ cứng', correct: true },
            { text: 'Tự động kiểm tra lỗi bảo mật của toàn bộ mã nguồn', correct: false },
            { text: 'Tự động nâng cấp phiên bản ngôn ngữ lập trình của dự án', correct: false },
            { text: 'Xóa bỏ tất cả các bài kiểm tra tự động trong kho', correct: false },
          ],
          explanation:
            'Shallow clone với `--depth 1` chỉ lấy commit đỉnh, cực kỳ hữu dụng trong CI/CD pipeline để tăng tốc build.',
        },
        {
          id: 'q4',
          question: 'Sau khi chạy lệnh `git clone` thành công, thao tác đầu tiên bạn cần làm trong terminal để bắt đầu làm việc là gì?',
          type: 'single',
          options: [
            { text: 'Chuyển thư mục dòng lệnh vào bên trong thư mục dự án vừa được tạo ra bằng lệnh `cd <tên-thư-mục>`', correct: true },
            { text: 'Khởi tạo lại bằng lệnh git init một lần nữa', correct: false },
            { text: 'Chạy lệnh git delete để làm sạch màn hình', correct: false },
            { text: 'Rút dây mạng Internet ra khỏi máy tính', correct: false },
          ],
          explanation:
            'Git clone tạo ra một thư mục con; bạn phải dùng lệnh `cd` đi vào bên trong thư mục đó mới dùng được các lệnh Git.',
        },
      ],
    },
  },
  {
    id: '05-git-fetch',
    moduleId: '04-github-collaboration',
    title: 'Cập nhật dữ liệu từ xa với git fetch',
    duration: 25,
    xp: 85,
    keywords: ['git fetch', 'remote-tracking branch', 'origin/main', 'cap nhat du lieu', 'an toan'],
    prerequisites: ['04-git-clone'],
    objectives: [
      'Hiểu rõ cơ chế hoạt động an toàn tuyệt đối của câu lệnh `git fetch`.',
      'Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).',
      'Nắm bắt lý do vì sao `git fetch` không bao giờ làm thay đổi hay ghi đè lên Working Directory của bạn.',
      'Sử dụng `git log` và `git diff` để kiểm tra mã nguồn mới tải về trước khi quyết định hợp nhất.',
    ],
    definition:
      '`git fetch` là câu lệnh đồng bộ an toàn của Git, có nhiệm vụ liên hệ với kho lưu trữ từ xa trên mạng, kiểm tra xem có những commit, nhánh hoặc thẻ tag mới nào mà máy cục bộ chưa có hay không, rồi tải toàn bộ dữ liệu mới đó về lưu trữ trong cơ sở dữ liệu của bạn. Điểm đặc biệt quan trọng nhất: `git fetch` chỉ cập nhật các con trỏ nhánh theo dõi từ xa (Remote-tracking branches như `origin/main`) mà KHÔNG BAO GIỜ tự ý gộp code hay chạm vào các tệp tin trong Working Directory của bạn.',
    why:
      'Trong môi trường làm việc nhóm chuyên nghiệp, bạn không bao giờ nên mù quáng gộp code của người khác vào không gian làm việc của mình khi chưa biết họ đã thay đổi những gì. `git fetch` cho phép bạn xem trước những gì đồng nghiệp vừa đưa lên máy chủ: bạn có thể đọc diff, xem log và đánh giá nguy cơ xung đột một cách hoàn toàn an toàn và chủ động trước khi đưa ra quyết định hợp nhất.',
    mentalModel:
      'Hãy hình dung `git fetch` giống như nhân viên bưu tá giao các kiện hàng mới của đồng nghiệp gửi về để vào chiếc hộp thư trước cửa nhà bạn (cập nhật Remote-tracking branches). Bưu tá chỉ đặt kiện hàng vào hộp thư an toàn chứ không tự ý mở cửa bước vào phòng khách của bạn và không tự ý xáo trộn đồ đạc trên bàn làm việc của bạn (Working Directory giữ nguyên 100%). Bạn có thể ra mở hộp thư ngắm nghía kiện hàng trước khi quyết định mang vào nhà.',
    diagram: `Cơ chế an toàn của git fetch:
Kho trên GitHub:              Máy tính của bạn (Local):
Commit C4 mới trên main ──► Tải về lưu vào: origin/main (C4)
                             Nhánh cục bộ:   main (vẫn ở C3)
                             Working Tree:   Hoàn toàn giữ nguyên!`,
    example:
      'Lập trình viên Lan đang viết dở tính năng đặt hàng trên nhánh main tại commit C3. Lan muốn biết đồng nghiệp Hùng có đưa bản sửa lỗi thanh toán nào lên server hay chưa. Lan chạy câu lệnh: `git fetch origin`. Git thông báo đã tải về các đối tượng mới và cập nhật con trỏ `origin/main` lên commit C4. Lan chạy lệnh `git log main..origin/main --oneline` để đọc qua thông điệp commit của Hùng. Thấy Hùng sửa ở một module hoàn toàn khác, Lan yên tâm tiếp tục công việc của mình mà không sợ bị xung đột hay mất mát dữ liệu đang soạn thảo.',
    commands: [
      'git fetch',
      'git fetch origin',
      'git fetch --all',
      'git log HEAD..origin/main --oneline',
      'git diff HEAD..origin/main',
    ],
    explanation:
      '- `git fetch`: Tải về các thay đổi mới từ remote mặc định gắn với nhánh hiện tại.\n- `git fetch origin`: Chỉ định rõ ràng tải về từ máy chủ remote mang tên origin.\n- `git fetch --all`: Tải về dữ liệu mới từ tất cả các remote đang được cấu hình trong dự án.\n- `git log HEAD..origin/main`: Liệt kê các commit mới trên server mà máy cục bộ của bạn chưa có.\n- `git diff HEAD..origin/main`: So sánh chi tiết từng dòng code khác biệt giữa mã nguồn của bạn và mã nguồn trên server.',
    mistakes: [
      'Tưởng chạy git fetch xong là code trong editor sẽ tự cập nhật: Fetch chỉ tải về cơ sở dữ liệu ngầm, bạn phải merge thì code mới vào Working Tree.',
      'Sợ hãi git fetch sẽ làm mất code đang gõ dở: Fetch là lệnh an toàn nhất trong Git, không bao giờ ghi đè lên file đang sửa.',
      'Quên kiểm tra diff trước khi merge: Bỏ lỡ cơ hội đánh giá xung đột tiềm ẩn.',
    ],
    labSteps: [
      'Chạy lệnh `git fetch origin` để đồng bộ dữ liệu mới nhất từ remote.',
      'Quan sát thông báo cập nhật các nhánh `origin/*`.',
      'Sử dụng lệnh `git log origin/main --oneline -n 5` để xem các commit mới trên remote.',
      'Chạy `git status` để kiểm tra thông báo nhánh của bạn đang bị tụt lại (behind) bao nhiêu commit.',
    ],
    hint: 'Nhớ nguyên tắc: `git fetch` = Tải dữ liệu về nhưng chưa gộp; an toàn tuyệt đối 100%.',
    validation: 'Cập nhật thành công nhánh remote-tracking mà không làm thay đổi Working Directory.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế an toàn của git fetch.',
    challenge: 'Nêu sự khác biệt giữa hai con trỏ `main` và `origin/main` sau khi chạy lệnh `git fetch`.',
    summary: [
      '`git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ.',
      'Chỉ cập nhật nhánh theo dõi từ xa `origin/main`, không chạm vào Working Directory.',
      'Là thao tác an toàn tuyệt đối để xem trước thay đổi trước khi quyết định tích hợp.',
    ],
    quiz: {
      id: 'quiz-04-05-git-fetch',
      title: 'Trắc nghiệm: Cập nhật dữ liệu với git fetch',
      questions: [
        {
          id: 'q1',
          question: 'Điều gì xảy ra với các tệp tin trong Working Directory của bạn khi bạn chạy lệnh `git fetch origin`?',
          type: 'single',
          options: [
            { text: 'Hoàn toàn không có bất kỳ tệp tin nào bị thay đổi hay ghi đè, Working Directory được giữ nguyên vẹn 100%', correct: true },
            { text: 'Các tệp tin tự động được cập nhật theo phiên bản mới nhất trên GitHub', correct: false },
            { text: 'Toàn bộ các tệp tin chưa commit sẽ bị xóa sạch', correct: false },
            { text: 'Các tệp tin bị khóa lại và chuyển sang chế độ chỉ đọc', correct: false },
          ],
          explanation:
            '`git fetch` chỉ tải dữ liệu về kho ngầm và cập nhật con trỏ `origin/*`, tuyệt đối không tác động lên Working Tree.',
        },
        {
          id: 'q2',
          question: 'Con trỏ tham chiếu `origin/main` trong Git đại diện cho điều gì?',
          type: 'single',
          options: [
            { text: 'Nhánh theo dõi từ xa (Remote-tracking branch) phản ánh vị trí commit đỉnh của nhánh main trên server ở lần fetch gần nhất', correct: true },
            { text: 'Nhánh làm việc chính của riêng máy tính cá nhân bạn', correct: false },
            { text: 'Một tệp tin văn bản chứa mật khẩu của GitHub', correct: false },
            { text: 'Một nhánh thử nghiệm do AI tự động tạo ra', correct: false },
          ],
          explanation:
            '`origin/main` là con trỏ chỉ đọc (read-only) ghi nhận trạng thái của nhánh main trên máy chủ remote.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào cho phép bạn xem danh sách các commit mà đồng nghiệp đã đẩy lên `origin/main` nhưng máy bạn chưa có?',
          type: 'single',
          options: [
            { text: 'git log HEAD..origin/main --oneline', correct: true },
            { text: 'git show --cloud-commits', correct: false },
            { text: 'git view server-log', correct: false },
            { text: 'git diff --names-only', correct: false },
          ],
          explanation:
            '`HEAD..origin/main` lọc ra toàn bộ các commit có trên remote tracking branch nhưng chưa nằm trong nhánh hiện tại.',
        },
        {
          id: 'q4',
          question: 'Sau khi chạy lệnh `git fetch`, để đưa các thay đổi từ `origin/main` vào nhánh `main` hiện tại của bạn, bạn cần chạy tiếp lệnh gì?',
          type: 'single',
          options: [
            { text: 'git merge origin/main', correct: true },
            { text: 'git finish fetch', correct: false },
            { text: 'git update local', correct: false },
            { text: 'git copy origin/main', correct: false },
          ],
          explanation:
            'Sau khi fetch, bạn dùng lệnh merge để tích hợp con trỏ remote-tracking vào nhánh cục bộ.',
        },
        {
          id: 'q5',
          question: 'Lợi ích lớn nhất của việc chạy `git fetch` trước khi thực hiện merge là gì?',
          type: 'single',
          options: [
            { text: 'Cho phép bạn kiểm tra mã nguồn, đọc diff và đánh giá nguy cơ xung đột một cách hoàn toàn chủ động và an toàn', correct: true },
            { text: 'Giúp máy tính tiết kiệm 50% điện năng tiêu thụ', correct: false },
            { text: 'Tự động sửa các lỗi chính tả trong thông điệp commit', correct: false },
            { text: 'Tự động gửi email thông báo cho toàn công ty', correct: false },
          ],
          explanation:
            'Fetch cho phép kiểm toán và đánh giá an toàn trước khi thay đổi trạng thái không gian làm việc.',
        },
        {
          id: 'q6',
          question: 'Lệnh `git fetch --all` thực hiện hành vi nào sau đây?',
          type: 'single',
          options: [
            { text: 'Liên hệ và tải toàn bộ dữ liệu mới từ tất cả các remote đang được cấu hình trong dự án (ví dụ origin, upstream)', correct: true },
            { text: 'Tải toàn bộ Internet về ổ cứng máy tính', correct: false },
            { text: 'Xóa toàn bộ các nhánh cục bộ cũ', correct: false },
            { text: 'Đẩy tất cả các nhánh lên máy chủ', correct: false },
          ],
          explanation:
            '`--all` yêu cầu Git duyệt qua tất cả các remote đã khai báo và fetch dữ liệu mới từ từng remote đó.',
        },
      ],
    },
  },
  {
    id: '06-git-pull',
    moduleId: '04-github-collaboration',
    title: 'Đồng bộ và gộp code với git pull',
    duration: 30,
    xp: 90,
    keywords: ['git pull', 'fetch and merge', 'dong bo code', 'pull rebase', 'cap nhat local'],
    prerequisites: ['05-git-fetch'],
    objectives: [
      'Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.',
      'Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.',
      'Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.',
      'Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull.',
    ],
    definition:
      '`git pull` là câu lệnh tiện ích tổng hợp trong Git, kết hợp hai thao tác liên tiếp vào trong một bước duy nhất: đầu tiên nó thực thi `git fetch` để tải về toàn bộ các commit mới nhất từ máy chủ từ xa, sau đó ngay lập tức thực thi `git merge` để tự động gộp các commit mới đó vào nhánh cục bộ mà bạn đang đứng làm việc. Nếu hai bên cùng sửa các dòng code mâu thuẫn, quá trình pull sẽ dừng lại và yêu cầu giải quyết conflict.',
    why:
      'Trong quy trình làm việc hàng ngày, `git pull` là câu lệnh đầu tiên bạn gõ mỗi sáng khi mở máy tính bắt đầu ngày làm việc mới, nhằm bảo đảm mã nguồn trên máy cá nhân luôn bắt kịp tiến độ mới nhất của toàn đội ngũ. Nắm vững bản chất hai pha (fetch + merge) của lệnh pull giúp bạn tự tin xử lý mọi xung đột phát sinh và biết cách cấu hình pull rebase để giữ lịch sử dự án luôn thẳng thớm.',
    mentalModel:
      'Hãy hình dung nếu `git fetch` là việc nhân viên bưu tá đem gói bưu phẩm đặt vào chiếc hộp thư trước cửa nhà bạn, thì `git pull` là việc bạn tự động cầm chìa khóa ra mở hộp thư, bưng gói bưu phẩm vào phòng khách và mở toang bưu phẩm ra trộn chung vào bàn làm việc của bạn. Hành động này rất tiện lợi và nhanh chóng, nhưng nếu trong bưu phẩm có đồ vật trùng lặp với thứ bạn đang cầm trên tay, bạn sẽ phải dừng lại sắp xếp.',
    diagram: `Bản chất hai pha của câu lệnh git pull:
┌────────────────────────────────────────────────────────┐
│                      git pull                          │
│  ┌───────────────────────┐   ┌───────────────────────┐  │
│  │ 1. git fetch origin   │ + │ 2. git merge FETCH_HEAD│  │
│  └───────────────────────┘   └───────────────────────┘  │
└────────────────────────────────────────────────────────┘`,
    example:
      'Đầu giờ sáng thứ Hai, kỹ sư Hoàng mở dự án phần mềm trên máy tính cá nhân. Nhánh main của Hoàng đang ở commit C2. Trong hai ngày cuối tuần, các đồng nghiệp đã hoàn thành tính năng thông báo và đẩy các commit C3, C4 lên GitHub. Hoàng gõ lệnh: `git pull origin main`. Git lập tức tải hai commit C3, C4 về và tự động thực hiện Fast-forward merge đưa con trỏ nhánh main của Hoàng lên mốc C4. Toàn bộ mã nguồn mới nhất xuất hiện ngay trong VS Code của Hoàng chỉ sau 2 giây mà không phát sinh thêm bất kỳ thao tác thủ công nào.',
    commands: [
      'git pull',
      'git pull origin <tên-nhánh>',
      'git pull --rebase',
      'git pull --ff-only',
    ],
    explanation:
      '- `git pull`: Kéo và gộp dữ liệu từ nhánh upstream tương ứng được cấu hình mặc định.\n- `git pull origin <nhánh>`: Chỉ định rõ ràng remote và tên nhánh cần kéo về gộp vào nhánh hiện tại.\n- `git pull --rebase`: Thay vì tạo Merge Commit, Git sẽ rebase các commit cục bộ của bạn lên trên đỉnh của commit mới kéo về, giữ lịch sử tuyến tính.\n- `git pull --ff-only`: Chỉ cho phép pull nếu có thể tua nhanh (Fast-forward), từ chối pull nếu phát sinh phân kỳ lịch sử.',
    mistakes: [
      'Chạy git pull khi Working Directory đang có nhiều thay đổi dở dang chưa commit: Có thể bị Git từ chối hoặc gây xung đột phức tạp; nên commit hoặc stash trước.',
      'Mù quáng dùng git pull mà không hiểu nó là fetch + merge: Gây bối rối khi bỗng nhiên thấy xuất hiện một Merge Commit lạ hoặc bị dính conflict.',
      'Kéo nhầm nhánh khác vào nhánh hiện tại: Gõ `git pull origin develop` khi đang đứng ở `main` sẽ làm gộp develop vào main.',
    ],
    labSteps: [
      'Đứng tại nhánh `main` và kiểm tra trạng thái bằng `git status`.',
      'Thực hiện câu lệnh `git pull origin main` để cập nhật mã nguồn mới nhất.',
      'Quan sát Git thực hiện tự động fetch và merge.',
      'Kiểm tra lại nhật ký lịch sử bằng `git log --oneline -n 3` để xác nhận commit mới đã tích hợp.',
    ],
    hint: 'Luôn giữ thói quen `git pull` đầu ngày làm việc trước khi bắt tay vào viết dòng code mới.',
    validation: 'Nhánh cục bộ đồng bộ thành công với nhánh remote và Working Tree cập nhật sạch sẽ.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git pull.',
    challenge: 'Nêu ưu điểm của cấu hình `git config --global pull.rebase true` đối với việc giữ lịch sử dự án tinh gọn.',
    summary: [
      '`git pull` = `git fetch` (tải về) + `git merge` (gộp vào).',
      'Đồng bộ mã nguồn từ GitHub vào thẳng Working Directory của bạn.',
      'Sử dụng `--rebase` để giữ lịch sử là một đường thẳng đẹp mắt.',
    ],
    quiz: {
      id: 'quiz-04-06-git-pull',
      title: 'Trắc nghiệm: Đồng bộ code với git pull',
      questions: [
        {
          id: 'q1',
          question: 'Về mặt bản chất kỹ thuật, câu lệnh `git pull` tương đương hoàn toàn với sự kết hợp tuần tự của hai câu lệnh nào?',
          type: 'single',
          options: [
            { text: 'git fetch kết hợp với git merge', correct: true },
            { text: 'git add kết hợp với git commit', correct: false },
            { text: 'git checkout kết hợp với git push', correct: false },
            { text: 'git branch kết hợp với git status', correct: false },
          ],
          explanation:
            '`git pull` là câu lệnh tắt: đầu tiên tải dữ liệu bằng `fetch`, sau đó gộp vào bằng `merge`.',
        },
        {
          id: 'q2',
          question: 'Điều gì sẽ xảy ra nếu cả bạn và đồng nghiệp cùng chỉnh sửa một dòng code trong cùng một tệp tin khi bạn thực hiện `git pull`?',
          type: 'single',
          options: [
            { text: 'Git sẽ phát hiện Merge Conflict, tạm dừng quá trình gộp và chèn các vạch đánh dấu xung đột vào tệp để bạn xử lý', correct: true },
            { text: 'Git sẽ tự động xóa code của bạn và lấy code của đồng nghiệp', correct: false },
            { text: 'Git sẽ xóa toàn bộ kho lưu trữ trên máy tính của bạn', correct: false },
            { text: 'Máy chủ GitHub sẽ tự động tắt nguồn', correct: false },
          ],
          explanation:
            'Vì pull có chứa pha merge nên nếu có mâu thuẫn dòng code, Git sẽ kích hoạt quy trình giải quyết conflict.',
        },
        {
          id: 'q3',
          question: 'Lợi ích của việc sử dụng câu lệnh `git pull --rebase` thay vì `git pull` thông thường là gì?',
          type: 'single',
          options: [
            { text: 'Tránh việc sinh ra các commit merge rác không cần thiết, giúp lịch sử dự án luôn là một đường thẳng tuyến tính', correct: true },
            { text: 'Tăng gấp đôi tốc độ tải mạng Internet', correct: false },
            { text: 'Tự động kiểm tra lỗi logic lập trình trong mã nguồn', correct: false },
            { text: 'Bảo vệ máy tính khỏi các cuộc tấn công mạng', correct: false },
          ],
          explanation:
            '`--rebase` đặt các commit của bạn lên trên đỉnh của các commit mới kéo về, loại bỏ commit merge thừa.',
        },
        {
          id: 'q4',
          question: 'Thời điểm vàng được các chuyên gia khuyến nghị luôn luôn nên thực hiện câu lệnh `git pull` là khi nào?',
          type: 'single',
          options: [
            { text: 'Đầu mỗi buổi sáng khi bắt đầu làm việc hoặc trước khi chuẩn bị tạo một nhánh tính năng mới', correct: true },
            { text: 'Chỉ thực hiện một lần duy nhất khi dự án kết thúc bàn giao', correct: false },
            { text: 'Chỉ thực hiện vào các ngày cuối tuần', correct: false },
            { text: 'Khi máy tính sắp hết pin', correct: false },
          ],
          explanation:
            'Luôn kéo code mới nhất về trước khi code giúp bạn làm việc trên nền tảng mới nhất và giảm thiểu nguy cơ xung đột.',
        },
        {
          id: 'q5',
          question: 'Cờ `--ff-only` trong lệnh `git pull --ff-only` có tác dụng bảo vệ nào?',
          type: 'single',
          options: [
            { text: 'Chỉ cho phép kéo code về nếu có thể tua nhanh Fast-forward, từ chối pull nếu phát sinh nút giao rẽ nhánh', correct: true },
            { text: 'Ép buộc máy tính phải khởi động lại sau khi pull', correct: false },
            { text: 'Tự động xóa tất cả các nhánh con đã hoàn thành', correct: false },
            { text: 'Chỉ tải về các tệp tin có dung lượng dưới 1 kilobyte', correct: false },
          ],
          explanation:
            '`--ff-only` ngăn chặn việc vô tình sinh ra commit merge khi lịch sử của bạn và server đã bị phân kỳ.',
        },
        {
          id: 'q6',
          question: 'Nếu trong Working Directory của bạn đang có tệp sửa đổi dở dang chưa commit mà bị conflict khi pull, hành động an toàn nên làm trước là gì?',
          type: 'single',
          options: [
            { text: 'Lưu tạm thay đổi vào bộ nhớ đệm bằng lệnh `git stash` hoặc commit tạm thời trước khi pull', correct: true },
            { text: 'Xóa vĩnh viễn tệp tin đó đi', correct: false },
            { text: 'Tắt phần mềm diệt virus trên máy tính', correct: false },
            { text: 'Đổi tên tài khoản người dùng máy tính', correct: false },
          ],
          explanation:
            '`git stash` giúp cất gọn gàng các thay đổi chưa xong, đưa Working Tree về trạng thái sạch sẽ an toàn để pull.',
        },
      ],
    },
  },
  {
    id: '07-git-push',
    moduleId: '04-github-collaboration',
    title: 'Đẩy commit lên server với git push',
    duration: 30,
    xp: 95,
    keywords: ['git push', 'day code', 'push origin', 'upstream tracking', '-u flag', 'rejected'],
    prerequisites: ['04-git-clone'],
    objectives: [
      'Sử dụng câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub.',
      'Hiểu rõ ý nghĩa của cờ `-u` (`--set-upstream`) trong lần push đầu tiên của một nhánh mới.',
      'Chẩn đoán và xử lý tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).',
      'Nhận thức rõ mức độ nguy hiểm và quy tắc cấm kỵ đối với cờ cưỡng chế `--force` trên các nhánh dùng chung.',
    ],
    definition:
      '`git push` là câu lệnh xuất bản mã nguồn trong Git, có nhiệm vụ truyền tải các commit snapshot từ kho lưu trữ cục bộ trên máy tính của bạn lên kho lưu trữ từ xa trên máy chủ GitHub và cập nhật con trỏ nhánh trên máy chủ tiến về phía trước tương ứng. Đây là phương thức duy nhất để biến những thành quả lập trình cá nhân của bạn thành dữ liệu chung cho toàn bộ đội ngũ kỹ thuật cùng tiếp cận.',
    why:
      'Viết mã nguồn xuất sắc đến đâu nhưng nếu chỉ giữ trên máy tính cá nhân thì đồng nghiệp và hệ thống tự động hóa kiểm thử vẫn không thể kiểm tra hay đưa vào sản phẩm. `git push` là bước cuối cùng hoàn tất chu trình phát triển tính năng. Nắm vững lệnh push giúp bạn tự tin chia sẻ mã nguồn, biết cách xử lý khi bị server từ chối vì có người khác push trước, và tránh gây ra các tai họa làm mất code của cả nhóm.',
    mentalModel:
      'Hãy hình dung việc bạn viết code và commit trên máy tính cá nhân giống như một nhà văn ngồi sáng tác một chương tiểu thuyết mới trong phòng làm việc riêng. `git push` giống như hành động nhà văn đem bản thảo chương mới đó gửi lên tòa soạn báo để in ấn và phát hành ra toàn quốc. Nếu tòa soạn báo nhận thấy trước đó đã có một chương truyện khác vừa được xuất bản mà nhà văn chưa đọc (rejected), nhà văn phải cập nhật phiên bản mới nhất về đọc trước rồi mới được gửi tiếp.',
    diagram: `Cơ chế hoạt động của git push:
Máy tính cá nhân (Local):       Máy chủ GitHub (Remote origin):
Nhánh main: C1 ──► C2 ──► C3    Nhánh main: C1 ──► C2
            │                               │
            └──────── git push origin main ─┘
            (Đẩy C3 lên, cập nhật con trỏ remote main lên C3)`,
    example:
      'Kỹ sư Tuấn vừa hoàn thành chức năng tìm kiếm sản phẩm nâng cao trên nhánh feature-search với 3 commit mới được kiểm thử kỹ lưỡng. Tuấn mở cửa sổ console và gõ lệnh: `git push -u origin feature-search`. Git kết nối bảo mật tới GitHub, tạo ra một nhánh mới có tên feature-search trên máy chủ từ xa, đẩy toàn bộ các commit lên đám mây và thiết lập mối quan hệ theo dõi upstream giữa hai nhánh. Màn hình console hiển thị đường dẫn trực tiếp mời Tuấn bấm vào để tạo Pull Request trên giao diện web của GitHub để các đồng nghiệp cùng tham gia review mã nguồn. Toàn bộ tiến trình diễn ra nhanh chóng chỉ trong vài giây.',
    commands: [
      'git push',
      'git push origin <tên-nhánh>',
      'git push -u origin <tên-nhánh>',
      'git push origin --all',
      'git push origin --delete <tên-nhánh>',
    ],
    explanation:
      '- `git push`: Đẩy commit lên remote và nhánh mặc định đã được thiết lập tracking.\n- `git push origin <tên-nhánh>`: Đẩy nhánh chỉ định lên remote mang tên origin.\n- `git push -u origin <nhánh>`: Đẩy lên và ghi nhớ mối quan hệ upstream tracking (lần sau chỉ cần gõ `git push`).\n- `git push origin --all`: Đẩy toàn bộ các nhánh cục bộ hiện có lên máy chủ cùng một lúc.\n- `git push origin --delete <nhánh>`: Xóa bỏ một con trỏ nhánh trên máy chủ từ xa GitHub.',
    mistakes: [
      'Bị từ chối [rejected - non-fast-forward] nhưng vội vàng push force: Sẽ ghi đè và làm biến mất vĩnh viễn các commit mà đồng nghiệp đã đẩy lên trước đó.',
      'Quên cờ -u trong lần push đầu tiên của nhánh mới: Khiến lần sau gõ git push ngắn gọn bị Git nhắc nhở chưa có upstream tracking.',
      'Push nhầm nhánh thử nghiệm chứa mật khẩu hoặc mã bí mật lên GitHub công khai.',
    ],
    labSteps: [
      'Tạo một nhánh mới `demo-push` và tạo một commit mới trên nhánh này.',
      'Chạy lệnh `git push -u origin demo-push` để đưa nhánh lên remote.',
      'Quan sát thông điệp phản hồi từ máy chủ GitHub xác nhận nhánh đã được tạo.',
      'Xóa nhánh trên remote để dọn dẹp bằng `git push origin --delete demo-push`.',
    ],
    hint: 'Nếu bị lỗi rejected non-fast-forward, hãy chạy `git pull` trước để tích hợp code mới rồi mới push lại.',
    validation: 'Đẩy thành công commit lên remote GitHub và thiết lập đúng upstream tracking.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh xuất bản git push.',
    challenge: 'Tại sao trong các doanh nghiệp lớn, việc gõ cờ `--force` lên nhánh `main` luôn bị chặn bởi quyền hạn của hệ thống?',
    summary: [
      '`git push` đưa các commit từ kho cục bộ lên máy chủ từ xa GitHub.',
      'Dùng cờ `-u` ở lần push đầu tiên để thiết lập liên kết theo dõi upstream.',
      'Tuyệt đối không dùng cờ `--force` bừa bãi trên các nhánh dùng chung.',
    ],
    quiz: {
      id: 'quiz-04-07-git-push',
      title: 'Trắc nghiệm: Đẩy commit với git push',
      questions: [
        {
          id: 'q1',
          question: 'Mục đích cốt lõi của cờ `-u` (hoặc `--set-upstream`) trong câu lệnh `git push -u origin feature` là gì?',
          type: 'single',
          options: [
            { text: 'Thiết lập mối quan hệ theo dõi mặc định (tracking) giữa nhánh cục bộ và nhánh từ xa, giúp các lần sau chỉ cần gõ `git push` ngắn gọn', correct: true },
            { text: 'Nâng cấp tài khoản GitHub của bạn lên gói trả phí doanh nghiệp', correct: false },
            { text: 'Tự động mở khóa các tính năng ẩn của trình duyệt web', correct: false },
            { text: 'Ép buộc xóa toàn bộ lịch sử cũ trên máy chủ', correct: false },
          ],
          explanation:
            '`-u` cấu hình upstream tracking branch, liên kết nhánh cục bộ với nhánh từ xa tương ứng.',
        },
        {
          id: 'q2',
          question: 'Khi bạn chạy lệnh `git push` và nhận được thông báo lỗi `[rejected - non-fast-forward]`, nguyên nhân chính xác là gì?',
          type: 'single',
          options: [
            { text: 'Trên máy chủ từ xa đã có những commit mới do người khác đẩy lên mà máy cục bộ của bạn chưa có', correct: true },
            { text: 'Do máy tính của bạn bị mất bản quyền hệ điều hành', correct: false },
            { text: 'Do tên nhánh của bạn quá dài vượt quá 8 ký tự', correct: false },
            { text: 'Do bạn chưa thanh toán tiền điện thoại di động', correct: false },
          ],
          explanation:
            'Lỗi rejected xảy ra khi nhánh remote đã tiến xa hơn nhánh local; Git từ chối để tránh ghi đè làm mất commit của người khác.',
        },
        {
          id: 'q3',
          question: 'Giải pháp an toàn và chuẩn mực nhất khi gặp thông báo lỗi `[rejected - non-fast-forward]` là gì?',
          type: 'single',
          options: [
            { text: 'Chạy lệnh `git pull` để lấy commit mới về máy, giải quyết xung đột nếu có, rồi mới thực hiện `git push` lại', correct: true },
            { text: 'Gõ lệnh `git push --force` ngay lập tức để đè bẹp code trên server', correct: false },
            { text: 'Xóa toàn bộ dự án và bỏ cuộc', correct: false },
            { text: 'Tạo tài khoản GitHub mới', correct: false },
          ],
          explanation:
            'Quy trình chuẩn mực: Pull về -> Merge/Rebase -> Test -> Push lại an toàn.',
        },
        {
          id: 'q4',
          question: 'Tại sao cờ tùy chọn `--force` (hoặc `-f`) trong lệnh git push lại được coi là cực kỳ nguy hiểm trong làm việc nhóm?',
          type: 'single',
          options: [
            { text: 'Vì nó cưỡng chế ghi đè lịch sử trên máy chủ, có thể làm biến mất vĩnh viễn các commit mà đồng nghiệp đã đẩy lên trước đó', correct: true },
            { text: 'Vì nó làm tiêu hao toàn bộ bộ nhớ RAM của máy chủ', correct: false },
            { text: 'Vì nó làm thay đổi giao diện đồ họa của hệ điều hành', correct: false },
            { text: 'Vì nó làm tăng gấp đôi kích thước tệp tin mã nguồn', correct: false },
          ],
          explanation:
            'Push force ép server xóa bỏ lịch sử hiện tại để thay thế bằng lịch sử máy bạn, cực kỳ nguy hiểm trên nhánh chung.',
        },
        {
          id: 'q5',
          question: 'Lệnh nào sau đây dùng để xóa một nhánh có tên `old-feature` trực tiếp trên máy chủ từ xa GitHub?',
          type: 'single',
          options: [
            { text: 'git push origin --delete old-feature', correct: true },
            { text: 'git remove remote old-feature', correct: false },
            { text: 'git drop origin old-feature', correct: false },
            { text: 'git erase cloud old-feature', correct: false },
          ],
          explanation:
            '`git push origin --delete <nhánh>` gửi chỉ thị xóa con trỏ nhánh trên máy chủ từ xa.',
        },
        {
          id: 'q6',
          question: 'Nếu bạn đã cấu hình upstream tracking cho nhánh hiện tại bằng cờ `-u`, lệnh rút gọn nào dùng để đẩy commit lên server?',
          type: 'single',
          options: [
            { text: 'git push', correct: true },
            { text: 'git send', correct: false },
            { text: 'git upload', correct: false },
            { text: 'git sync-up', correct: false },
          ],
          explanation:
            'Khi đã có upstream, bạn chỉ cần gõ `git push` mà không cần truyền tên remote hay tên branch.',
        },
      ],
    },
  },
  {
    id: '08-tracking-branch',
    moduleId: '04-github-collaboration',
    title: 'Nhánh theo dõi Tracking Branch',
    duration: 25,
    xp: 80,
    keywords: ['tracking branch', 'upstream branch', 'ahead behind', 'remote tracking', 'dong bo nhanh'],
    prerequisites: ['07-git-push'],
    objectives: [
      'Hiểu rõ khái niệm và cơ chế hoạt động của Tracking Branch (Nhánh theo dõi) trong Git.',
      'Phân biệt rõ ràng giữa 3 loại nhánh: Nhánh cục bộ, Nhánh theo dõi từ xa (`origin/main`), và Nhánh thực tế trên server.',
      'Đọc hiểu và giải thích ý nghĩa các trạng thái so sánh: `ahead`, `behind`, và `diverged`.',
      'Thiết lập hoặc thay đổi quan hệ upstream tracking cho một nhánh cục bộ bất kỳ.',
    ],
    definition:
      'Tracking Branch (Nhánh theo dõi cục bộ, còn gọi là Upstream Branch) là một nhánh cục bộ có mối liên kết trực tiếp một-một với một nhánh theo dõi từ xa (Remote-tracking branch, ví dụ `origin/main`). Khi một nhánh cục bộ được cấu hình tracking, Git sẽ liên tục theo dõi vị trí tương đối giữa hai nhánh và tự động thông báo cho bạn biết bạn đang đi trước máy chủ bao nhiêu commit (ahead) hoặc đang bị tụt lại phía sau bao nhiêu commit (behind).',
    why:
      'Nếu không có tính năng Tracking Branch, mỗi lần bạn gõ câu lệnh `git status`, bạn sẽ hoàn toàn rơi vào trạng thái mù mịt thông tin vì không biết mã nguồn trên máy tính của mình đã được xuất bản đồng bộ lên GitHub hay chưa, hoặc có đồng nghiệp nào vừa đẩy thêm các commit mới lên hay không. Tính năng tracking mang lại sự tiện lợi và tự động hóa tuyệt vời: bạn chỉ cần gõ `git push` hoặc `git pull` ngắn gọn mà không phải gõ kèm tên remote và tên branch dài dòng, đồng thời hạn chế tối đa nguy cơ vô tình đẩy nhầm nhánh vào sai địa chỉ đích.',
    mentalModel:
      'Hãy hình dung hai vận động viên điền kinh Nam (nhánh cục bộ) và Bình (nhánh trên server) cùng thi đấu trên hai làn chạy song song. Trên cổ tay của Nam có đeo một chiếc đồng hồ thông minh kết nối GPS (Tracking Branch). Chiếc đồng hồ liên tục hiển thị: "Bạn đang chạy trước Bình 2 bước" (ahead 2), hoặc "Bạn đang chạy sau Bình 3 bước" (behind 3), hoặc "Hai bạn đang chạy ngang nhau" (up to date). Nhờ chiếc đồng hồ đó, Nam luôn biết mình cần tăng tốc hay giữ nhịp.',
    diagram: `Các trạng thái so sánh Tracking Branch:
Trạng thái Up to date:
Local:   C1 ──► C2 ──► C3 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

Trạng thái Ahead 1 (Bạn đi trước 1 commit):
Local:   C1 ──► C2 ──► C3 ──► C4 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

Trạng thái Behind 1 (Server đi trước 1 commit):
Local:   C1 ──► C2 ──► C3 ──► C5 (origin/main)`,
    example:
      'Lập trình viên Hà tạo một commit mới trên nhánh main của máy tính cá nhân sau khi sửa xong giao diện đăng nhập. Khi Hà gõ lệnh `git status`, màn hình console lập tức in ra thông báo màu xanh lá vô cùng rõ ràng: "Your branch is ahead of \'origin/main\' by 1 commit. (use \'git push\' to publish your local commits)". Nhờ có mối quan hệ tracking branch được thiết lập từ trước, Hà biết chính xác mình đang có một commit chưa được đẩy lên đám mây và chỉ việc gõ câu lệnh `git push` ngắn gọn để đồng bộ hóa mã nguồn tức thì lên GitHub cho toàn bộ đội ngũ kỹ thuật cùng tiếp cận, giúp dự án luôn ở trạng thái cập nhật nhất mà không gặp phải bất kỳ sai sót nào.',
    commands: [
      'git status',
      'git branch -vv',
      'git branch -u origin/<tên-nhánh>',
      'git branch --unset-upstream',
    ],
    explanation:
      '- `git status`: Hiển thị trạng thái so sánh chi tiết giữa nhánh hiện tại và nhánh upstream (ahead/behind).\n- `git branch -vv`: Liệt kê tất cả các nhánh cục bộ kèm theo tên nhánh upstream và trạng thái ahead/behind của từng nhánh.\n- `git branch -u origin/<nhánh>`: Thiết lập hoặc đổi liên kết upstream cho nhánh hiện tại.\n- `git branch --unset-upstream`: Gỡ bỏ mối quan hệ theo dõi upstream của nhánh hiện tại.',
    mistakes: [
      'Bối rối khi thấy thông báo "Your branch is behind": Cần chạy `git pull` để kéo commit mới về máy.',
      'Nhánh bị phân kỳ "Your branch and origin/main have diverged": Cả bạn và server đều có commit mới độc lập; cần pull về giải quyết merge/rebase.',
      'Nghĩ rằng git status tự động kết nối mạng: Thông báo ahead/behind dựa trên dữ liệu fetch lần cuối, hãy chạy `git fetch` trước để thông tin chuẩn xác nhất.',
    ],
    labSteps: [
      'Chạy lệnh `git branch -vv` và quan sát cột hiển thị upstream trong ngoặc vuông `[origin/main]`.',
      'Tạo một commit mới và chạy `git status` để quan sát thông báo `ahead by 1 commit`.',
      'Đẩy commit lên server bằng lệnh ngắn gọn `git push`.',
      'Chạy lại `git status` để xác nhận thông báo `Your branch is up to date with origin/main`.',
    ],
    hint: 'Nhớ chạy `git fetch` trước khi xem `git status` để trạng thái ahead/behind phản ánh đúng thực tế trên server.',
    validation: 'Đọc hiểu chính xác trạng thái ahead và behind thông qua `git status` và `git branch -vv`.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về nhánh theo dõi Tracking Branch.',
    challenge: 'Mô tả cấu trúc tệp `.git/config` khi một nhánh được cấu hình upstream tracking.',
    summary: [
      'Tracking Branch liên kết nhánh cục bộ với nhánh remote-tracking tương ứng.',
      'Cung cấp thông tin so sánh quý giá: `ahead` (cần push) và `behind` (cần pull).',
      'Cho phép sử dụng các cú pháp rút gọn `git push` và `git pull` tiện lợi.',
    ],
    quiz: {
      id: 'quiz-04-08-tracking-branch',
      title: 'Trắc nghiệm: Nhánh theo dõi Tracking Branch',
      questions: [
        {
          id: 'q1',
          question: 'Khi `git status` thông báo dòng chữ: "Your branch is ahead of \'origin/main\' by 2 commits", điều đó có nghĩa là gì?',
          type: 'single',
          options: [
            { text: 'Bạn đã tạo 2 commit mới trên máy cá nhân mà chưa đẩy (push) lên máy chủ GitHub', correct: true },
            { text: 'Trên GitHub đang có 2 commit mới mà bạn chưa kéo (pull) về máy', correct: false },
            { text: 'Máy tính của bạn đang bị virus tấn công 2 lần', correct: false },
            { text: 'Kho chứa của bạn bị lỗi thừa 2 nhánh', correct: false },
          ],
          explanation:
            '`ahead by N` nghĩa là nhánh local của bạn đang đi trước nhánh remote N commit; cần chạy `git push` để đẩy lên.',
        },
        {
          id: 'q2',
          question: 'Khi `git status` thông báo: "Your branch is behind \'origin/main\' by 3 commits", hành động bạn nên làm là gì?',
          type: 'single',
          options: [
            { text: 'Chạy lệnh `git pull` để kéo 3 commit mới đó từ GitHub về cập nhật vào máy cá nhân', correct: true },
            { text: 'Chạy lệnh `git push --force` để xóa 3 commit đó trên GitHub', correct: false },
            { text: 'Xóa toàn bộ thư mục dự án và tải lại từ đầu', correct: false },
            { text: 'Tắt máy tính đi ngủ', correct: false },
          ],
          explanation:
            '`behind by N` nghĩa là server đang có N commit mới mà máy bạn chưa có; cần chạy `git pull` để đồng bộ.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào giúp bạn kiểm tra nhanh mối quan hệ upstream tracking và trạng thái ahead/behind của TẤT CẢ các nhánh cục bộ?',
          type: 'single',
          options: [
            { text: 'git branch -vv', correct: true },
            { text: 'git show-all-tracking', correct: false },
            { text: 'git track --list', correct: false },
            { text: 'git status --all-branches', correct: false },
          ],
          explanation:
            '`git branch -vv` hiển thị chi tiết tên từng nhánh, commit hash, commit message và upstream tracking branch kèm ahead/behind.',
        },
        {
          id: 'q4',
          question: 'Để thiết lập nhánh `origin/develop` làm upstream cho nhánh cục bộ hiện tại, bạn dùng lệnh nào?',
          type: 'single',
          options: [
            { text: 'git branch -u origin/develop', correct: true },
            { text: 'git track set origin/develop', correct: false },
            { text: 'git link-branch origin/develop', correct: false },
            { text: 'git make-upstream origin/develop', correct: false },
          ],
          explanation:
            '`git branch -u <remote/branch>` (hoặc `--set-upstream-to`) thiết lập quan hệ tracking cho nhánh hiện tại.',
        },
        {
          id: 'q5',
          question: 'Trạng thái "diverged" (phân kỳ) xảy ra khi nào giữa nhánh cục bộ và nhánh upstream?',
          type: 'single',
          options: [
            { text: 'Khi cả bạn và máy chủ đều có những commit mới độc lập kể từ điểm commit chung gần nhất', correct: true },
            { text: 'Khi kho lưu trữ bị mất kết nối mạng cáp quang', correct: false },
            { text: 'Khi hai lập trình viên dùng hai hệ điều hành khác nhau', correct: false },
            { text: 'Khi nhánh bị xóa trên máy tính', correct: false },
          ],
          explanation:
            'Diverged nghĩa là vừa ahead vừa behind; hai luồng commit đã rẽ thành hình chữ Y và cần merge hoặc rebase để hợp nhất.',
        },
        {
          id: 'q6',
          question: 'Tại sao thông tin ahead/behind trong lệnh `git status` có thể không phản ánh đúng nếu bạn chưa chạy `git fetch`?',
          type: 'single',
          options: [
            { text: 'Vì Git status chỉ so sánh nhánh local với con trỏ origin/* lưu trên đĩa chứ không tự động kết nối mạng lên server', correct: true },
            { text: 'Vì Git status luôn tự động xóa bộ nhớ đệm', correct: false },
            { text: 'Vì GitHub không cho phép lệnh status truy cập', correct: false },
            { text: 'Vì lệnh git status chỉ dùng cho các tệp ảnh', correct: false },
          ],
          explanation:
            '`git status` hoạt động offline; nó so sánh với bản lưu `origin/*` của lần fetch cuối cùng, nên cần fetch để cập nhật mới nhất.',
        },
      ],
    },
  },
];
