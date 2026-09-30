export const LEVEL7_PART1 = [
  {
    id: '01-ci-cd-concept',
    title: 'CI/CD là gì? Tự động hóa tích hợp & chuyển giao liên tục',
    duration: 25,
    xp: 80,
    prerequisites: ['15-professional-team-project'],
    keywords: ['ci cd', 'continuous integration', 'continuous delivery', 'automation', 'pipeline'],
    objectives: [
      'Nắm vững bản chất cốt lõi của Continuous Integration (CI) và Continuous Delivery/Deployment (CD).',
      'Hiểu rõ sự khác biệt giữa quy trình kiểm thử thủ công rủi ro và đường ống tự động hóa.',
      'Nhận thức các lợi ích then chốt: giảm thiểu lỗi hồi quy, phát hành phiên bản nhanh và phản hồi sớm.',
    ],
    commands: ['npm test', 'npm run build', 'git push origin main'],
    definition:
      'CI/CD viết tắt của Continuous Integration (Tích hợp liên tục) và Continuous Delivery/Deployment (Chuyển giao hoặc Triển khai liên tục). Đây là phương pháp luận kỹ thuật phần mềm hiện đại và văn hóa DevOps cốt lõi nhằm tự động hóa hoàn toàn các giai đoạn từ khi lập trình viên hoàn thành một đoạn mã nguồn mới, đẩy lên kho lưu trữ Git trung tâm, cho đến khi mã nguồn đó được kiểm tra phân tích cú pháp, biên dịch thành công, vượt qua toàn bộ các bài kiểm thử tự động đa tầng và sẵn sàng chuyển giao lên các môi trường thử nghiệm hoặc máy chủ sản xuất thực tế phục vụ người dùng cuối.',
    why:
      'Trong mô hình phát triển phần mềm truyền thống, các nhóm kỹ sư thường làm việc trên các nhánh riêng biệt trong nhiều tuần và chỉ tích hợp mã nguồn vào giai đoạn cuối kỳ phát hành. Hậu quả trực tiếp là hiện tượng ác mộng tích hợp (Integration Hell) bùng nổ với hàng trăm xung đột mã nguồn và lỗi logic tiềm ẩn không thể kiểm soát. CI/CD giải quyết triệt để vấn đề này bằng cách ép buộc mọi thay đổi nhỏ phải được tích hợp liên tục vào nhánh chung, sau đó kích hoạt ngay lập tức chu trình kiểm thử tự động, giúp kỹ sư phát hiện và khắc phục sự cố chỉ trong vài phút sau khi viết mã.',
    mentalModel:
      'Hãy hình dung dây chuyền sản xuất lắp ráp ô tô tự động hóa hiện đại bậc nhất. Thay vì để một chiếc xe hoàn thiện toàn bộ khung vỏ động cơ rồi mới bắt đầu kiểm tra phanh và hệ thống lái, mỗi chi tiết linh kiện khi vừa được cánh tay robot lắp ráp vào khung gầm đều lập tức đi qua các cảm biến quang học quét kiểm tra chất lượng tự động ngay tại chỗ. Nếu phát hiện một con ốc chưa đủ độ siết hoặc có vết nứt nhỏ, dây chuyền lập tức dừng lại và phát đèn đỏ cảnh báo, đảm bảo không có bất kỳ sản phẩm lỗi nào được đi tiếp tới công đoạn bàn giao khách hàng.',
    diagram:
      'Developer push code ──► [Continuous Integration] ──► [Continuous Delivery] ──► [Production Deploy]\n                             │                               │\n                             ├─ Chạy Linter                   ├─ Đóng gói Docker Image\n                             ├─ Biên dịch TypeScript         ├─ Đẩy lên Staging Server\n                             └─ Chạy Unit/E2E Tests          └─ Chờ phê duyệt tự động',
    example:
      'Một công ty thương mại điện tử phục vụ hàng triệu người mua sắm trực tuyến áp dụng đường ống CI/CD chuẩn mực. Mỗi khi một kỹ sư tạo Pull Request bổ sung chức năng mã giảm giá mới, hệ thống tự động khởi tạo máy ảo, kéo toàn bộ mã nguồn về, cài đặt các thư viện phụ thuộc và chạy hơn một nghìn bài kiểm thử đơn vị. Nếu có một hàm tính toán tiền tệ bị sai lệch một chữ số thập phân, bài test lập tức báo đỏ và khóa chức năng merge. Nhờ vậy, nhóm phát triển có thể tự tin phát hành hơn hai mươi bản cập nhật phần mềm mỗi ngày mà hệ thống máy chủ thanh toán vẫn hoạt động ổn định tuyệt đối và không phát sinh sự cố ngừng trệ.',
    commandSnippet: 'npm test\nnpm run build\ngit push origin main',
    commandExplanation:
      'Các câu lệnh trên mô phỏng ba bước nền tảng của quy trình tích hợp: chạy kiểm thử cục bộ với npm test để phát hiện lỗi logic, biên dịch mã nguồn với npm run build để kiểm tra lỗi kiểu dữ liệu và cú pháp, cuối cùng là đẩy mã nguồn lên GitHub để kích hoạt đường ống CI trên đám mây hoạt động hoàn toàn tự động.',
    mistakes: [
      'Coi CI/CD chỉ là việc cài đặt công cụ: Công cụ chỉ phát huy hiệu quả khi văn hóa kiểm thử tự động trong nhóm đã được xây dựng vững vàng.',
      'Viết bài kiểm thử quá chậm kéo dài hàng giờ: Khiến vòng phản hồi bị đình trệ và lập trình viên có xu hướng né tránh chạy kiểm thử.',
      'Bỏ qua cảnh báo kiểm thử không ổn định (flaky test): Dẫn đến việc các thành viên mất niềm tin vào kết quả báo cáo của đường ống CI.',
    ],
    labSteps: [
      'Xem xét dự án mẫu chứa các bài kiểm thử Jest và cấu hình script trong tệp package.json.',
      'Chạy thử nghiệm lệnh npm test cục bộ và quan sát kết quả kiểm thử đạt chuẩn.',
      'Thử cố tình sửa sai một giá trị kỳ vọng trong bài test để quan sát mã lỗi trả về.',
    ],
    hint: 'Bản chất của CI là phản hồi cực nhanh, hãy giữ cho các bài kiểm thử cơ bản chạy dưới 5 phút.',
    validation: 'Toàn bộ các bài kiểm thử tự động báo trạng thái Passed và mã nguồn biên dịch không lỗi.',
    quizIntro: 'Hãy kiểm tra mức độ thấu hiểu của bạn về khái niệm và triết lý CI/CD qua các câu hỏi sau.',
    challenge:
      'Phân tích sự khác biệt cốt lõi giữa Continuous Delivery (chuyển giao liên tục) và Continuous Deployment (triển khai liên tục) đối với cổng phê duyệt thủ công của con người.',
    summary: [
      'CI là thực hành tự động tích hợp, biên dịch và kiểm thử mã nguồn liên tục mỗi khi có thay đổi mới.',
      'CD mở rộng CI bằng cách tự động hóa quá trình đóng gói và triển khai sản phẩm lên các môi trường thử nghiệm hoặc sản xuất.',
      'Đường ống CI/CD mang lại vòng phản hồi ngắn, giảm rủi ro phát hành và nâng cao chất lượng phần mềm.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Chữ cái CI trong cụm từ CI/CD là viết tắt của thuật ngữ nào?',
        options: [
          { text: 'Continuous Integration', correct: true },
          { text: 'Code Inspection', correct: false },
          { text: 'Centralized Information', correct: false },
          { text: 'Cloud Infrastructure', correct: false },
        ],
        explanation: 'CI là viết tắt của Continuous Integration, nghĩa là quá trình tích hợp liên tục mã nguồn của các lập trình viên vào kho lưu trữ chung.',
      },
      {
        id: 'q2',
        question: 'Lợi ích lớn nhất mà Continuous Integration mang lại cho nhóm phát triển là gì?',
        options: [
          { text: 'Phát hiện sớm lỗi hồi quy và xung đột tích hợp ngay khi mã nguồn vừa được đẩy lên', correct: true },
          { text: 'Giúp máy tính của lập trình viên chạy nhanh hơn gấp đôi', correct: false },
          { text: 'Tự động viết toàn bộ mã nguồn thay cho con người', correct: false },
          { text: 'Xóa bỏ hoàn toàn nhu cầu về hệ thống kiểm soát phiên bản', correct: false },
        ],
        explanation: 'Nhờ tự động kiểm thử và biên dịch mỗi khi có commit mới, CI giúp nhóm phát hiện lỗi ngay từ trứng nước thay vì đợi đến ngày phát hành.',
      },
      {
        id: 'q3',
        question: 'Điểm khác nhau cốt lõi giữa Continuous Delivery và Continuous Deployment là gì?',
        options: [
          { text: 'Continuous Delivery yêu cầu sự phê duyệt thủ công trước khi đẩy lên production, trong khi Continuous Deployment tự động hóa 100%', correct: true },
          { text: 'Continuous Delivery chỉ áp dụng cho ngôn ngữ Python, còn Deployment cho JavaScript', correct: false },
          { text: 'Continuous Delivery không bao gồm công đoạn kiểm thử tự động', correct: false },
          { text: 'Hai khái niệm này hoàn toàn đồng nghĩa và không có bất kỳ khác biệt nào', correct: false },
        ],
        explanation: 'Continuous Delivery tạo ra sản phẩm sẵn sàng triển khai nhưng cần một nút bấm xác nhận từ con người, còn Continuous Deployment tự động triển khai thẳng lên production nếu qua hết test.',
      },
      {
        id: 'q4',
        question: 'Hiện tượng Integration Hell trong phát triển phần mềm thường bắt nguồn từ nguyên nhân nào?',
        options: [
          { text: 'Các nhánh làm việc riêng lẻ quá lâu mà không tích hợp thường xuyên vào nhánh chính', correct: true },
          { text: 'Do máy chủ GitHub bị mất kết nối mạng Internet', correct: false },
          { text: 'Do cài đặt quá nhiều tiện ích mở rộng trên trình soạn thảo code', correct: false },
          { text: 'Do sử dụng bàn phím cơ thay vì bàn phím thông thường', correct: false },
        ],
        explanation: 'Khi các nhánh phát triển độc lập trong nhiều tuần hoặc tháng, các thay đổi tích tụ sẽ gây ra vô số xung đột phức tạp khi gộp lại.',
      },
    ],
  },
  {
    id: '02-github-actions-intro',
    title: 'GitHub Actions là gì? Nền tảng tự động hóa của GitHub',
    duration: 25,
    xp: 80,
    prerequisites: ['01-ci-cd-concept'],
    keywords: ['github actions', 'automation', 'marketplace', 'workflow engine', 'saas ci'],
    objectives: [
      'Hiểu rõ GitHub Actions là gì và vị thế của nó trong hệ sinh thái GitHub.',
      'Nắm bắt các tính năng chính: tích hợp sâu với Git events, kho ứng dụng Actions Marketplace phong phú.',
      'Phân biệt mô hình SaaS tích hợp sẵn so với việc tự dựng và vận hành máy chủ Jenkins truyền thống.',
    ],
    commands: ['gh workflow list', 'gh run list', 'gh auth status'],
    definition:
      'GitHub Actions là một nền tảng tự động hóa quy trình làm việc (Workflow Automation) và dịch vụ CI/CD được tích hợp trực tiếp, nguyên bản vào GitHub. Nền tảng này cho phép các kỹ sư phần mềm tạo ra các kịch bản tự động hóa mạnh mẽ phản hồi lại bất kỳ sự kiện nào xảy ra trong kho lưu trữ, từ việc đẩy mã nguồn, mở Pull Request, phát hành phiên bản mới, cho đến khi có một bình luận hoặc Issue được tạo ra một cách liền mạch.',
    why:
      'Trước khi GitHub Actions ra đời, các nhóm phát triển phải thiết lập và duy trì các máy chủ CI riêng biệt như Jenkins, Travis CI hoặc CircleCI. Việc này đòi hỏi kỹ năng vận hành hạ tầng phức tạp, quản lý chứng chỉ xác thực, phân quyền token và cấu hình webhook liên lạc liên tục. GitHub Actions xóa bỏ hoàn toàn rào cản này bằng cách đưa toàn bộ kịch bản tự động hóa vào ngay bên trong thư mục dự án dưới dạng mã nguồn mở, không cần cài đặt thêm phần mềm máy chủ ngoài.',
    mentalModel:
      'Hãy tưởng tượng GitHub như một tòa cao ốc văn phòng thông minh. GitHub Actions chính là hệ thống cảm biến và các trợ lý tự động hóa được cài sẵn khắp mọi ngóc ngách của tòa nhà. Mỗi khi có người quẹt thẻ vào cửa (sự kiện Git push), trợ lý thông minh lập tức kích hoạt chuỗi hành động: bật đèn chiếu sáng, kiểm tra nhiệt độ phòng và in danh sách công việc trong ngày mà không cần bạn phải gọi điện điều phối nhân công từ bên ngoài.',
    diagram:
      'GitHub Repository Events ──► [GitHub Actions Engine] ──► [Virtual Runners]\n       │                                │                         │\n       ├─ Push / Pull Request           ├─ Phân tích YAML          ├─ Ubuntu VM\n       ├─ Issue opened / Comment        ├─ Quản lý quyền Token     ├─ Windows VM\n       └─ Release published             └─ Ghi log thời gian thực   └─ macOS VM',
    example:
      'Nhóm phát triển thư viện mã nguồn mở React UI nổi tiếng nhận được hàng chục Pull Request đóng góp mỗi ngày từ cộng đồng toàn cầu. Nhờ GitHub Actions, mỗi khi một lập trình viên lạ mặt gửi PR, hệ thống tự động khởi chạy máy ảo Ubuntu sạch, tải bản mã nguồn đề xuất, kiểm tra xem tác giả đã ký thỏa thuận bản quyền CLA hay chưa, chạy linter kiểm tra chuẩn mã hóa và render bản xem trước giao diện trên máy chủ thử nghiệm. Toàn bộ thông tin này hiển thị ngay trên giao diện trao đổi của PR mà bảo trì viên không cần rời khỏi GitHub.',
    commandSnippet: 'gh workflow list\ngh run list\ngh auth status',
    commandExplanation:
      'Các câu lệnh thông qua GitHub CLI (gh) cho phép kiểm tra trạng thái xác thực tài khoản với gh auth status, liệt kê danh sách toàn bộ các workflow tự động đã đăng ký với gh workflow list, và xem lịch sử các lần thực thi đường ống CI gần nhất với gh run list một cách trực quan.',
    mistakes: [
      'Nghĩ rằng GitHub Actions chỉ dùng để chạy CI/CD: Nó còn có thể tự động đóng Issue cũ, gắn nhãn PR, gửi thông báo Slack và tự động đồng bộ tài liệu.',
      'Sử dụng các Action của bên thứ ba từ Marketplace mà không kiểm tra độ tin cậy và nguồn gốc mã nguồn.',
      'Để lộ token bảo mật trong kịch bản thay vì sử dụng cơ chế GitHub Secrets được mã hóa.',
    ],
    labSteps: [
      'Kiểm tra xem kho lưu trữ hiện tại đã có cấu hình workflow nào chưa bằng lệnh gh workflow list.',
      'Quan sát thư mục gốc của dự án để chuẩn bị tạo cấu hình tự động hóa đầu tiên.',
      'Khám phá giao diện thẻ Actions trên trang web GitHub để làm quen với bảng điều khiển trực quan.',
    ],
    hint: 'GitHub Actions được cấu hình hoàn toàn bằng các tệp khai báo tĩnh định dạng YAML đặt trong thư mục đặc biệt.',
    validation: 'Lệnh gh workflow list phản hồi thành công và kết nối thông suốt với tài khoản cá nhân.',
    quizIntro: 'Cùng củng cố kiến thức về nền tảng GitHub Actions qua các câu hỏi trắc nghiệm dưới đây.',
    challenge:
      'Tại sao việc lưu trữ kịch bản CI/CD dưới dạng tệp mã nguồn bên trong Git (Configuration as Code) lại vượt trội hơn cấu hình giao diện web thủ công?',
    summary: [
      'GitHub Actions là nền tảng CI/CD và tự động hóa native tích hợp sẵn bên trong GitHub.',
      'Hỗ trợ phản hồi mọi sự kiện diễn ra trên kho lưu trữ chứ không chỉ riêng việc push mã nguồn.',
      'Cung cấp hệ sinh thái Actions Marketplace với hàng nghìn khối xây dựng sẵn từ cộng đồng.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'GitHub Actions được lưu trữ và quản lý dưới dạng nào trong dự án?',
        options: [
          { text: 'Các tệp cấu hình YAML nằm trực tiếp trong kho lưu trữ mã nguồn', correct: true },
          { text: 'Các bảng dữ liệu SQL lưu trữ trên máy chủ nội bộ công ty', correct: false },
          { text: 'Các biểu mẫu cấu hình bằng tay trên một trang web thứ ba', correct: false },
          { text: 'Các tệp hình ảnh nhị phân được mã hóa đặc biệt', correct: false },
        ],
        explanation: 'GitHub Actions tuân thủ nguyên lý Configuration as Code, lưu trữ các kịch bản tự động dưới dạng tệp văn bản YAML cùng với mã nguồn.',
      },
      {
        id: 'q2',
        question: 'GitHub Actions có thể được kích hoạt bởi những sự kiện nào?',
        options: [
          { text: 'Rất đa dạng: từ push, pull_request, tạo issue, gắn nhãn cho đến lịch định kỳ cron', correct: true },
          { text: 'Chỉ duy nhất khi người quản trị bấm nút bằng tay', correct: false },
          { text: 'Chỉ khi máy tính của người dùng bị khởi động lại', correct: false },
          { text: 'Chỉ vào đúng lúc 0 giờ đêm mỗi ngày', correct: false },
        ],
        explanation: 'GitHub Actions hỗ trợ hơn ba mươi loại sự kiện Webhook khác nhau trong vòng đời của một kho lưu trữ GitHub.',
      },
      {
        id: 'q3',
        question: 'Kho ứng dụng GitHub Marketplace mang lại lợi ích gì cho việc xây dựng workflow?',
        options: [
          { text: 'Cho phép tái sử dụng hàng nghìn action được đóng gói sẵn từ các nhà phát triển uy tín', correct: true },
          { text: 'Nơi mua bán các đoạn mã nguồn bí mật của công ty', correct: false },
          { text: 'Trang thương mại điện tử bán các thiết bị phần cứng máy chủ', correct: false },
          { text: 'Nơi đăng ký mua tên miền website cá nhân', correct: false },
        ],
        explanation: 'Marketplace giúp bạn không phải tự viết lại mọi logic từ đầu, ví dụ như setup-node, checkout, upload-artifact đều đã có sẵn.',
      },
      {
        id: 'q4',
        question: 'So với máy chủ CI tự quản lý như Jenkins, ưu điểm nổi bật của GitHub Actions là gì?',
        options: [
          { text: 'Không tốn công bảo trì hạ tầng, tích hợp sẵn với tài khoản GitHub và bảo mật mặc định', correct: true },
          { text: 'Hoàn toàn không cần viết bất kỳ dòng mã nào', correct: false },
          { text: 'Có thể chạy khi máy chủ không có nguồn điện', correct: false },
          { text: 'Không giới hạn dung lượng lưu trữ tệp video dung lượng terabyte', correct: false },
        ],
        explanation: 'GitHub Actions là dịch vụ SaaS do chính GitHub vận hành và cấp phát máy ảo tự động, giúp kỹ sư tập trung hoàn toàn vào logic nghiệp vụ.',
      },
    ],
  },
  {
    id: '03-workflow-architecture',
    title: 'Kiến trúc Workflow: Events, Jobs, Steps và Runners',
    duration: 30,
    xp: 90,
    prerequisites: ['02-github-actions-intro'],
    keywords: ['workflow architecture', 'event', 'job', 'step', 'runner', 'dag'],
    objectives: [
      'Nắm rõ cấu trúc phân tầng 4 cấp bậc của một Workflow: Event -> Jobs -> Steps -> Actions/Commands.',
      'Hiểu bản chất chạy song song (Parallel) mặc định của các Job và chạy tuần tự (Sequential) của các Step.',
      'Nắm vững vai trò của Runner như một môi trường máy ảo cách ly độc lập chứa toàn bộ phiên làm việc.',
    ],
    commands: ['cat .github/workflows/ci.yml', 'tree .github'],
    definition:
      'Kiến trúc nền tảng của hệ thống GitHub Actions được xây dựng dựa trên bốn thành phần cơ bản có tính tổ chức chặt chẽ và nhất quán: Sự kiện (Event) kích hoạt Luồng công việc (Workflow); mỗi Workflow bao gồm một hoặc nhiều Tác vụ (Job); mỗi Job được thực thi hoàn toàn độc lập trên một Máy chạy (Runner) ảo hóa riêng biệt; và bên trong mỗi Job chứa một danh sách các Bước (Step) thực thi tuần tự lần lượt từ trên xuống dưới.',
    why:
      'Hiểu sai kiến trúc phân tầng sẽ dẫn đến những lỗi nghiêm trọng như: cố gắng chia sẻ biến nhớ hoặc tệp tin cục bộ giữa hai Job độc lập mà không dùng Artifact, hoặc kỳ vọng các Step chạy song song để tiết kiệm thời gian. Nắm vững ranh giới giữa Job (chạy song song trên các máy ảo khác nhau) và Step (chạy tuần tự trên cùng một máy ảo) là chìa khóa để thiết kế các pipeline tối ưu và chuẩn xác.',
    mentalModel:
      'Hãy tưởng tượng một nhà hàng phục vụ tiệc cưới. Event là tiếng chuông báo có đoàn khách mới đến. Workflow là toàn bộ thực đơn tiệc cưới được kích hoạt. Các Job là các quầy bếp độc lập: Quầy bếp khai vị, Quầy bếp món chính và Quầy làm bánh tráng miệng (chúng hoạt động song song ở các khu vực tách biệt). Mỗi quầy bếp có một đầu bếp chính (Runner). Bên trong mỗi quầy bếp, đầu bếp làm từng thao tác tuần tự (Steps): rửa rau, thái thịt, nấu sốt.',
    diagram:
      '[Event: push]\n      │\n      ▼\n[Workflow: CI Pipeline]\n      ├───────────────┬───────────────┐\n      ▼               ▼               ▼\n[Job 1: Lint]   [Job 2: Test]   [Job 3: Build]  <── Chạy SONG SONG trên 3 Runners riêng biệt\n(Runner Ubuntu) (Runner Ubuntu) (Runner Ubuntu)\n      │               │\n      ├─ Step 1       ├─ Step 1 (Checkout)\n      ├─ Step 2       ├─ Step 2 (Setup Node)\n      └─ Step 3       └─ Step 3 (Run test)     <── Các Step chạy TUẦN TỰ trên cùng 1 Runner',
    example:
      'Trong một dự án xây dựng ứng dụng di động Flutter, nhóm phát triển cấu hình một Workflow CI. Khi sự kiện tạo Pull Request diễn ra, Workflow khởi chạy hai Job cùng lúc: Job thứ nhất chạy trên Runner Linux để kiểm tra định dạng mã nguồn và phân tích tĩnh linter; Job thứ hai chạy trên Runner macOS để biên dịch gói ứng dụng iOS. Mỗi Job tự khởi động máy ảo sạch của riêng mình, chạy lần lượt các Step cài đặt Flutter SDK, tải dependencies và tiến hành biên dịch. Hai Job không hề giẫm chân lên nhau, giúp nhóm tận dụng tối đa sức mạnh tính toán song song.',
    commandSnippet: 'cat .github/workflows/ci.yml\ntree .github',
    commandExplanation:
      'Lệnh tree .github hiển thị cây thư mục nơi chứa các tệp workflow, và cat in ra nội dung khai báo các khối kiến trúc name, on, jobs, steps để kiểm tra tính toàn vẹn của kịch bản một cách rõ ràng và chuẩn xác.',
    mistakes: [
      'Cho rằng tệp tin tạo ra ở Job 1 sẽ tự động có mặt ở Job 2: Mỗi Job chạy trên máy ảo khác nhau, muốn chia sẻ dữ liệu bắt buộc phải dùng upload/download artifact.',
      'Tạo quá nhiều Job nhỏ chỉ chứa một câu lệnh đơn giản: Gây lãng phí thời gian khởi động máy ảo và tải image của Runner.',
      'Nhầm lẫn thứ tự thực thi của các Step bên trong một Job: Các Step luôn luôn chạy tuần tự theo thứ tự khai báo từ trên xuống dưới.',
    ],
    labSteps: [
      'Xem xét sơ đồ phân cấp giữa Event, Job, Step và Runner trên bảng vẽ tư duy.',
      'Xác định xem hai tác vụ Lint và Unit Test nên đặt trong cùng một Job hay chia làm hai Job song song.',
      'Kiểm tra cấu trúc thư mục quy chuẩn `.github/workflows/` trong dự án thực hành.',
    ],
    hint: 'Ghi nhớ quy tắc vàng: Các Step trong một Job dùng chung hệ thống tệp tin, các Job khác nhau hoàn toàn cách ly.',
    validation: 'Phân biệt chính xác phạm vi chia sẻ dữ liệu giữa cấp độ Job và cấp độ Step.',
    quizIntro: 'Hãy kiểm tra khả năng phân tích kiến trúc phân tầng của bạn qua các câu hỏi sau.',
    challenge:
      'Nếu bạn có 100 bài kiểm thử mất 20 phút để chạy trên một máy, bạn sẽ tái cấu trúc các Job như thế nào để giảm thời gian hoàn thành xuống còn 5 phút?',
    summary: [
      'Workflow được kích hoạt bởi Event và chứa một tập hợp các Jobs.',
      'Jobs mặc định thực thi song song trên các máy ảo Runner hoàn toàn độc lập.',
      'Steps bên trong một Job luôn thực thi tuần tự và chia sẻ chung hệ thống tệp tin của Runner đó.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Mặc định, các Job trong cùng một Workflow của GitHub Actions sẽ thực thi như thế nào?',
        options: [
          { text: 'Thực thi song song (Parallel) cùng lúc trên các Runner riêng biệt', correct: true },
          { text: 'Thực thi tuần tự từng Job một theo thứ tự từ trên xuống dưới', correct: false },
          { text: 'Chỉ thực thi ngẫu nhiên một Job duy nhất rồi dừng lại', correct: false },
          { text: 'Chờ người quản trị bấm kích hoạt từng Job một cách thủ công', correct: false },
        ],
        explanation: 'GitHub Actions tối ưu hóa thời gian thực thi bằng cách khởi chạy tất cả các Job độc lập song song với nhau.',
      },
      {
        id: 'q2',
        question: 'Các Step bên trong cùng một Job có đặc điểm thực thi như thế nào?',
        options: [
          { text: 'Thực thi tuần tự lần lượt từ trên xuống dưới trên cùng một máy ảo Runner', correct: true },
          { text: 'Mỗi Step được cấp một máy ảo riêng biệt và chạy song song', correct: false },
          { text: 'Thực thi đảo ngược từ dưới lên trên', correct: false },
          { text: 'Chỉ Step nào có từ khóa async mới được thực thi', correct: false },
        ],
        explanation: 'Các Step trong một Job chạy tuần tự và có thể đọc, ghi chung các tệp tin trong thư mục làm việc của Runner đó.',
      },
      {
        id: 'q3',
        question: 'Nếu Job A tạo ra một tệp tin build/app.js, Job B có thể truy cập trực tiếp tệp tin đó từ ổ đĩa không?',
        options: [
          { text: 'Không, vì mỗi Job chạy trên một máy ảo hoàn toàn cách ly, cần dùng Artifact để truyền dữ liệu', correct: true },
          { text: 'Có, toàn bộ các Job luôn dùng chung một ổ đĩa cứng vật lý', correct: false },
          { text: 'Có, chỉ cần ghi đúng đường dẫn tương đối', correct: false },
          { text: 'Có, nếu hai Job cùng chạy hệ điều hành Ubuntu', correct: false },
        ],
        explanation: 'Mỗi Job chạy trên một Runner độc lập, bộ nhớ và ổ đĩa của chúng bị cô lập hoàn toàn với nhau.',
      },
      {
        id: 'q4',
        question: 'Thành phần nào sau đây đóng vai trò là môi trường máy ảo thực tế thực hiện công việc?',
        options: [
          { text: 'Runner', correct: true },
          { text: 'Event', correct: false },
          { text: 'Workflow', correct: false },
          { text: 'Context', correct: false },
        ],
        explanation: 'Runner là máy chủ (máy ảo Ubuntu, Windows, macOS) do GitHub quản lý hoặc tự host để chạy các lệnh trong Job.',
      },
    ],
  },
  {
    id: '04-workflow-yaml-syntax',
    title: '.github/workflows và cú pháp YAML chuẩn',
    duration: 30,
    xp: 90,
    prerequisites: ['03-workflow-architecture'],
    keywords: ['yaml syntax', 'workflow file', 'indentation', 'github workflows directory'],
    objectives: [
      'Nắm vững vị trí bắt buộc của tệp workflow: thư mục .github/workflows/ với phần mở rộng .yml hoặc .yaml.',
      'Làm chủ các quy tắc định dạng YAML: thụt lề bằng 2 dấu cách, danh sách gạch đầu dòng, cặp key-value.',
      'Nhận biết và khắc phục các lỗi cú pháp thụt lề YAML phổ biến làm workflow bị từ chối biên dịch.',
    ],
    commands: ['mkdir -p .github/workflows', 'touch .github/workflows/ci.yml', 'yamllint .github/workflows/ci.yml'],
    definition:
      'Trong GitHub Actions, toàn bộ định nghĩa luồng công việc phải được lưu trữ dưới dạng các tệp văn bản định dạng YAML nằm chính xác tại thư mục .github/workflows/ trong nhánh gốc của kho lưu trữ. Cú pháp YAML (YAML Ain\'t Markup Language) là định dạng dữ liệu có cấu trúc dựa trên thụt lề khoảng trắng (indentation) nghiêm ngặt để biểu diễn quan hệ cha con giữa các khối dữ liệu, danh sách và ánh xạ từ khóa một cách mạch lạc và chuẩn mực.',
    why:
      'Hơn 80% sự cố ban đầu của các kỹ sư mới làm quen với CI/CD bắt nguồn từ việc vi phạm quy tắc thụt dòng trong tệp YAML, chẳng hạn như dùng phím Tab thay vì dấu cách Space, thụt dòng sai cấp độ giữa steps và jobs, hoặc đặt sai vị trí thư mục khiến GitHub hoàn toàn không nhận diện được workflow. Việc thành thạo cấu trúc YAML chuẩn giúp bạn viết kịch bản sạch sẽ, dễ đọc và loại bỏ hoàn toàn các lỗi cú pháp ngớ ngẩn gây gián đoạn đường ống.',
    mentalModel:
      'Hãy hình dung tệp YAML như một bản vẽ sơ đồ tổ chức phòng ban trong một tập đoàn. Mỗi cấp bậc quản lý được biểu diễn bằng một khoảng thụt lề thụt vào trong 2 bước chân (2 spaces). Nếu một nhân viên thực thi (step) đứng ngang hàng với giám đốc bộ phận (job), toàn bộ cấu trúc quyền lực sẽ bị xáo trộn và máy quét kiểm duyệt tự động sẽ từ chối phê duyệt văn bản ngay lập tức.',
    diagram:
      'Thư mục kho lưu trữ (Repo Root)\n└── .github/\n    └── workflows/\n        ├── ci.yml          <── Tệp cấu hình chuẩn (.yml hoặc .yaml)\n        └── release.yml\n\nQuy tắc 2 Spaces Indentation:\nname: CI Pipeline           # Cấp 0 (Không thụt lề)\non: push                    # Cấp 0\njobs:                       # Cấp 0\n  test:                     # Cấp 1 (Thụt vào 2 spaces: Tên Job)\n    runs-on: ubuntu-latest  # Cấp 2 (Thụt vào 4 spaces: Thuộc tính Job)\n    steps:                  # Cấp 2\n      - name: Checkout      # Cấp 3 (Thụt vào 6 spaces: Danh sách Step)',
    example:
      'Một kỹ sư phần mềm tạo tệp cấu hình .github/workflows/ci.yml cho dự án Node.js. Ban đầu, kỹ sư này vô tình dùng phím Tab trên bàn phím để thụt dòng mục steps. Khi đẩy lên GitHub, tab Actions hiển thị thông báo lỗi màu đỏ đậm: "Invalid workflow file: mapping values are not allowed in this context". Kỹ sư mở trình soạn thảo, kích hoạt chế độ hiển thị ký tự ẩn (Show Invisibles), thay thế toàn bộ ký tự Tab bằng 2 dấu cách Space và đẩy lại commit. GitHub lập tức nhận diện thành công và huy hiệu build chuyển sang màu vàng đang chạy.',
    commandSnippet: 'mkdir -p .github/workflows\ntouch .github/workflows/ci.yml\nyamllint .github/workflows/ci.yml',
    commandExplanation:
      'Lệnh mkdir -p tạo cây thư mục chuẩn .github/workflows, touch tạo tệp cấu hình mới, và yamllint kiểm tra tính hợp lệ về thụt lề và cú pháp của tệp YAML trước khi đưa vào hệ thống kiểm soát phiên bản để ngăn chặn lỗi sớm.',
    mistakes: [
      'Sử dụng phím Tab thay vì dấu cách Space: YAML tiêu chuẩn nghiêm cấm tuyệt đối ký tự Tab để thụt dòng.',
      'Đặt tệp sai đường dẫn như `.github/workflow/` (thiếu chữ s) khiến GitHub hoàn toàn bỏ qua tệp.',
      'Viết sai phần mở rộng tệp thành `.json` hoặc `.txt` thay vì `.yml` hoặc `.yaml`.',
    ],
    labSteps: [
      'Tạo cấu trúc thư mục `.github/workflows/` trong kho lưu trữ thử nghiệm.',
      'Khởi tạo tệp tin `ci.yml` và nhập cấu hình mẫu tối thiểu gồm name, on, jobs.',
      'Kiểm tra định dạng và đảm bảo toàn bộ tệp chỉ sử dụng 2 dấu cách cho mỗi cấp độ thụt lề.',
    ],
    hint: 'Hãy cấu hình trình soạn thảo VS Code với thuộc tính `"editor.tabSize": 2` và `"editor.insertSpaces": true`.',
    validation: 'Tệp YAML được phân tích cú pháp hợp lệ mà không có bất kỳ lỗi linter nào.',
    quizIntro: 'Kiểm tra kiến thức về quy tắc định dạng YAML và cấu trúc tệp workflow qua các câu hỏi sau.',
    challenge:
      'Giải thích tại sao định dạng YAML lại được chọn cho GitHub Actions thay vì JSON hay XML, và ưu thế của nó về khả năng đọc hiểu của con người là gì?',
    summary: [
      'Tệp Workflow bắt buộc phải nằm trong thư mục `.github/workflows/` với đuôi `.yml` hoặc `.yaml`.',
      'YAML sử dụng thụt dòng bằng 2 dấu cách Space để phân cấp dữ liệu, cấm dùng phím Tab.',
      'Cấu trúc tối thiểu của một workflow luôn cần có các khóa: `name`, `on`, và `jobs`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Tệp workflow của GitHub Actions bắt buộc phải được đặt ở đường dẫn nào trong kho lưu trữ?',
        options: [
          { text: '.github/workflows/', correct: true },
          { text: '.github/actions/', correct: false },
          { text: 'workflows/github/', correct: false },
          { text: '.ci/workflows/', correct: false },
        ],
        explanation: 'GitHub Actions chỉ quét và kích hoạt các workflow nằm chính xác trong thư mục `.github/workflows/` ở nhánh mặc định hoặc nhánh đang xét.',
      },
      {
        id: 'q2',
        question: 'Ký tự nào sau đây bị cấm dùng để thụt lề trong tệp cấu hình YAML chuẩn?',
        options: [
          { text: 'Ký tự Tab (\t)', correct: true },
          { text: 'Dấu cách Space', correct: false },
          { text: 'Dấu hai chấm (:)', correct: false },
          { text: 'Dấu gạch ngang (-)', correct: false },
        ],
        explanation: 'Quy chuẩn YAML cấm tuyệt đối việc sử dụng phím Tab để thụt dòng vì độ rộng của Tab có thể khác nhau giữa các hệ điều hành.',
      },
      {
        id: 'q3',
        question: 'Quy ước số lượng dấu cách (Spaces) tiêu chuẩn cho mỗi cấp độ thụt lề trong YAML là bao nhiêu?',
        options: [
          { text: '2 dấu cách (2 spaces)', correct: true },
          { text: '1 dấu cách', correct: false },
          { text: '5 dấu cách', correct: false },
          { text: '8 dấu cách', correct: false },
        ],
        explanation: 'Quy ước chuẩn của GitHub Actions và cộng đồng phát triển phần mềm là sử dụng đúng 2 dấu cách cho mỗi tầng thụt lề.',
      },
      {
        id: 'q4',
        question: 'Phần mở rộng nào sau đây là hợp lệ cho một tệp workflow GitHub Actions?',
        options: [
          { text: '.yml hoặc .yaml', correct: true },
          { text: '.json hoặc .xml', correct: false },
          { text: '.config hoặc .ini', correct: false },
          { text: '.sh hoặc .bash', correct: false },
        ],
        explanation: 'GitHub Actions chấp nhận cả hai định dạng phần mở rộng là `.yml` và `.yaml`.',
      },
    ],
  },
  {
    id: '05-events-and-triggers',
    title: 'Sự kiện kích hoạt (Events & Triggers: push, pull_request, workflow_dispatch)',
    duration: 30,
    xp: 90,
    prerequisites: ['04-workflow-yaml-syntax'],
    keywords: ['events', 'triggers', 'push', 'pull request', 'workflow dispatch', 'cron schedule'],
    objectives: [
      'Làm chủ thuộc tính on trong workflow để cấu hình các sự kiện kích hoạt tự động.',
      'Sử dụng bộ lọc nhánh (branches) và bộ lọc đường dẫn tệp tin (paths) để tối ưu thời điểm kích hoạt.',
      'Thành thạo sự kiện kích hoạt thủ công workflow_dispatch và lập lịch tự động schedule cron.',
    ],
    commands: ['gh workflow run ci.yml', 'git push origin main', 'git push origin feature/login'],
    definition:
      'Sự kiện (Event) là một hoạt động cụ thể xảy ra trong kho lưu trữ của bạn kích hoạt GitHub Actions chạy một luồng công việc. Thuộc tính on trong tệp YAML định nghĩa danh sách các sự kiện này. Các sự kiện phổ biến nhất bao gồm: push (đẩy mã nguồn), pull_request (tạo, cập nhật hoặc đóng PR), workflow_dispatch (kích hoạt thủ công từ giao diện hoặc API), và schedule (kích hoạt định kỳ theo thời gian biểu cron) phục vụ các tác vụ bảo trì tự động.',
    why:
      'Nếu không cấu hình sự kiện chính xác, workflow sẽ chạy một cách vô tội vạ, gây lãng phí tài nguyên và làm nghẽn hàng đợi CI. Ví dụ: bạn không muốn một workflow triển khai lên máy chủ sản xuất lại bị kích hoạt khi ai đó chỉ đẩy commit lên một nhánh tính năng cá nhân, hoặc không muốn chạy lại bài test nặng nề khi người ta chỉ chỉnh sửa một tệp tài liệu README.md không ảnh hưởng gì tới mã nguồn thực thi.',
    mentalModel:
      'Hãy hình dung một chiếc chuông cửa điện tử thông minh trong ngôi nhà hiện đại. Bạn có thể cài đặt chuông reo khi có khách nhấn nút trực tiếp (sự kiện workflow_dispatch), hoặc khi cảm biến chuyển động phát hiện có người đứng trước cửa (sự kiện push vào nhánh main). Bạn cũng có thể dễ dàng cài đặt bộ lọc thông minh: nếu đó chỉ là một chú mèo hàng xóm đi ngang qua (sửa đổi tệp trong thư mục docs/), chiếc chuông sẽ tự động bỏ qua và không reo để tránh làm phiền gia chủ.',
    diagram:
      'Event: push ────────────────► [Lọc Branch: main?] ──► Có ──► Kích hoạt Workflow\n                                    │\n                                    └── Không (feature) ──► Bỏ qua (Ignored)\n\nEvent: pull_request ──────────► [Lọc Path: src/**?] ──► Có ──► Chạy Test\n                                    │\n                                    └── Không (docs/**) ──► Tiết kiệm tài nguyên',
    example:
      'Trong dự án xây dựng cổng thông tin ngân hàng, kỹ sư cấu hình tệp workflow ci.yml với sự kiện push nhưng chỉ lắng nghe trên nhánh main và nhánh staging. Đồng thời, kỹ sư bổ sung thuộc tính paths-ignore để bỏ qua mọi commit chỉ thay đổi các tệp markdown trong thư mục docs. Khi một cộng tác viên đẩy bản sửa lỗi chính tả trong tài liệu, hệ thống không chạy CI, tiết kiệm hàng trăm phút tính toán máy ảo cho công ty. Khi trưởng nhóm gộp mã nguồn vào nhánh main, hệ thống lập tức kích hoạt toàn bộ bài test bảo mật nghiêm ngặt.',
    commandSnippet: 'gh workflow run ci.yml\ngit push origin main\ngit push origin feature/login',
    commandExplanation:
      'Câu lệnh gh workflow run cho phép kích hoạt một workflow có hỗ trợ sự kiện workflow_dispatch trực tiếp từ terminal, trong khi git push đẩy commit lên các nhánh tương ứng để kiểm tra bộ lọc branches xem đường ống có phản hồi chính xác hay không.',
    mistakes: [
      'Quên lọc nhánh khiến các commit trên nhánh tạm thời của lập trình viên kích hoạt luôn kịch bản deploy.',
      'Sử dụng sai cú pháp biểu thức cron giờ UTC trong sự kiện schedule dẫn đến việc kịch bản chạy sai thời điểm mong muốn.',
      'Không khai báo workflow_dispatch khiến việc kiểm thử thủ công workflow gặp nhiều khó khăn.',
    ],
    labSteps: [
      'Khai báo sự kiện on với hai trigger: push trên nhánh main và pull_request.',
      'Thêm cấu hình workflow_dispatch để có thể bấm chạy thử nghiệm từ giao diện.',
      'Thêm bộ lọc paths-ignore đối với các tệp tin tài liệu đuôi `.md`.',
    ],
    hint: 'Múi giờ của lịch schedule cron trong GitHub Actions luôn tính theo giờ quốc tế UTC, hãy nhớ quy đổi giờ Việt Nam (UTC+7).',
    validation: 'Workflow chỉ chạy khi đẩy code vào nhánh chỉ định hoặc kích hoạt thủ công, không chạy khi sửa file markdown.',
    quizIntro: 'Cùng làm bài trắc nghiệm về các sự kiện và bộ lọc kích hoạt trong GitHub Actions.',
    challenge:
      'Làm thế nào để cấu hình một workflow chỉ chạy vào lúc 2 giờ sáng hàng ngày từ thứ Hai đến thứ Sáu bằng cú pháp cron?',
    summary: [
      'Thuộc tính `on` định nghĩa các sự kiện kích hoạt workflow như `push`, `pull_request`, `workflow_dispatch`.',
      'Có thể dùng `branches`, `branches-ignore`, `paths`, `paths-ignore` để lọc phạm vi kích hoạt.',
      '`workflow_dispatch` cho phép kích hoạt workflow thủ công và truyền tham số đầu vào khi cần.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Khóa nào trong tệp YAML được sử dụng để định nghĩa sự kiện kích hoạt workflow?',
        options: [
          { text: 'on', correct: true },
          { text: 'trigger', correct: false },
          { text: 'when', correct: false },
          { text: 'event', correct: false },
        ],
        explanation: 'Trong cú pháp của GitHub Actions, từ khóa `on` là bắt buộc để định nghĩa các sự kiện kích hoạt.',
      },
      {
        id: 'q2',
        question: 'Sự kiện nào sau đây cho phép lập trình viên bấm nút chạy workflow thủ công trên giao diện web GitHub?',
        options: [
          { text: 'workflow_dispatch', correct: true },
          { text: 'manual_run', correct: false },
          { text: 'button_click', correct: false },
          { text: 'user_trigger', correct: false },
        ],
        explanation: '`workflow_dispatch` là sự kiện đặc biệt kích hoạt thủ công qua giao diện GitHub web hoặc GitHub CLI/API.',
      },
      {
        id: 'q3',
        question: 'Để workflow không bị kích hoạt khi người dùng chỉ chỉnh sửa tệp README.md, ta sử dụng thuộc tính nào?',
        options: [
          { text: 'paths-ignore: [\'README.md\']', correct: true },
          { text: 'file-exclude: [\'README.md\']', correct: false },
          { text: 'skip-file: [\'README.md\']', correct: false },
          { text: 'no-check: [\'README.md\']', correct: false },
        ],
        explanation: '`paths-ignore` liệt kê danh sách các mẫu đường dẫn tệp tin mà khi thay đổi chỉ nằm trong đó, workflow sẽ bỏ qua không chạy.',
      },
      {
        id: 'q4',
        question: 'Lịch chạy định kỳ `schedule` trong GitHub Actions sử dụng cú pháp biểu thức nào?',
        options: [
          { text: 'Biểu thức Cron chuẩn 5 trường (POSIX cron syntax)', correct: true },
          { text: 'Câu lệnh SQL SELECT', correct: false },
          { text: 'Ngôn ngữ tự nhiên tiếng Anh', correct: false },
          { text: 'Biểu thức chính quy Regex', correct: false },
        ],
        explanation: 'GitHub Actions sử dụng cú pháp POSIX cron tiêu chuẩn gồm 5 trường: phút, giờ, ngày trong tháng, tháng, ngày trong tuần.',
      },
    ],
  },
  {
    id: '06-jobs-configuration',
    title: 'Cấu hình Jobs: runs-on, phân tách độc lập và môi trường',
    duration: 30,
    xp: 95,
    prerequisites: ['05-events-and-triggers'],
    keywords: ['job configuration', 'runs on', 'ubuntu latest', 'isolation', 'concurrency'],
    objectives: [
      'Nắm vững cú pháp khai báo Job và thuộc tính bắt buộc runs-on để chỉ định môi trường điều hành.',
      'Hiểu rõ nguyên lý cô lập hoàn toàn giữa các Job về hệ thống tệp tin, biến môi trường và tiến trình.',
      'Biết cách đặt tên định danh cho Job (job id) và hiển thị tên thân thiện (name) trên giao diện.',
    ],
    commands: ['cat .github/workflows/multi-job.yml', 'gh run view'],
    definition:
      'Một Job là một tập hợp các bước (steps) được thực thi trên cùng một máy ảo hoặc bộ chứa (container) cụ thể. Thuộc tính bắt buộc hàng đầu của mỗi Job là runs-on, chỉ định hệ điều hành của máy ảo Runner mà GitHub sẽ cấp phát (ví dụ: ubuntu-latest, windows-latest, macos-latest). Mỗi Job trong một workflow có mã định danh duy nhất (job_id), chạy độc lập và không chia sẻ bộ nhớ hay tệp tin với các Job khác trong cùng một phiên chạy.',
    why:
      'Phân tách các công việc thành các Job riêng biệt giúp khai thác triệt để khả năng xử lý song song, rút ngắn thời gian phản hồi của pipeline từ vài chục phút xuống chỉ còn vài phút. Hơn nữa, việc này cho phép bạn chỉ định các môi trường chạy phù hợp cho từng loại tác vụ, ví dụ: kiểm tra linter nhanh trên Ubuntu giá rẻ, nhưng biên dịch ứng dụng iOS bắt buộc phải chạy trên Runner macOS đắt tiền hơn.',
    mentalModel:
      'Hãy hình dung bạn đang điều phối một cuộc thi nấu ăn quốc tế. Bạn có 3 phòng bếp riêng biệt: một phòng cho đầu bếp làm bánh (Job 1 trên Runner Ubuntu), một phòng cho đầu bếp làm món nướng (Job 2 trên Runner Windows), và một phòng cho chuyên gia pha chế (Job 3 trên Runner macOS). Mỗi người có một căn phòng sạch sẽ với đầy đủ dụng cụ riêng biệt, họ làm việc cùng lúc mà không lo người này làm đổ bột mì sang chảo dầu của người kia.',
    diagram:
      'Workflow Execution:\n┌─────────────────────────────────────────────────────────────┐\n│ jobs:                                                       │\n│   lint:                     test:                 build:    │\n│     runs-on: ubuntu-latest    runs-on: ubuntu-22    runs-on: │\n│     [Clean Virtual VM]        [Clean Virtual VM]    macos   │\n│     steps:                    steps:                steps:  │\n│       - step 1                  - step 1              - step│\n└─────────────────────────────────────────────────────────────┘',
    example:
      'Một nhóm phát triển phần mềm kế toán thiết kế workflow chứa 3 Jobs: Job 1 kiểm tra phong cách lập trình linter (runs-on: ubuntu-latest, hoàn thành trong 30 giây); Job 2 thực thi các bài kiểm thử cơ sở dữ liệu (runs-on: ubuntu-latest, hoàn thành trong 3 phút); Job 3 kiểm tra tương thích giao diện trên trình duyệt Safari (runs-on: macos-latest, hoàn thành trong 5 phút). Vì ba Job được cấp phát 3 máy ảo riêng và chạy đồng thời, tổng thời gian toàn bộ pipeline hoàn thành chỉ là 5 phút thay vì phải chờ 8 phút 30 giây nếu chạy tuần tự.',
    commandSnippet: 'cat .github/workflows/multi-job.yml\ngh run view',
    commandExplanation:
      'Lệnh cat xem cấu hình đa Job trong tệp YAML và gh run view cho phép xem tiến độ thực thi thực tế của từng Job đang chạy song song trên các Runner để đánh giá thời lượng và hiệu suất hoàn thành.',
    mistakes: [
      'Quên khai báo thuộc tính bắt buộc runs-on khiến hệ thống báo lỗi cú pháp YAML và từ chối chạy Job.',
      'Sử dụng Runner macOS hoặc Windows cho các tác vụ đơn giản chỉ cần Linux, làm tiêu tốn gấp 2 đến 10 lần thời lượng hạn ngạch miễn phí.',
      'Đặt tên job_id chứa ký tự đặc biệt hoặc dấu cách không hợp lệ.',
    ],
    labSteps: [
      'Khai báo khối `jobs` với 2 Job riêng biệt: `code-quality` và `unit-testing`.',
      'Chỉ định `runs-on: ubuntu-latest` cho cả hai tác vụ.',
      'Đặt thuộc tính `name` trực quan bằng tiếng Việt cho từng Job để hiển thị đẹp mắt trên giao diện.',
    ],
    hint: 'Luôn ưu tiên chọn `ubuntu-latest` trừ khi dự án của bạn bắt buộc phải có môi trường Windows hoặc macOS.',
    validation: 'Hai Job được khởi chạy đồng thời trên hai máy ảo Runner độc lập.',
    quizIntro: 'Cùng kiểm tra kiến thức về cấu hình Job và thuộc tính runs-on qua các câu hỏi sau.',
    challenge:
      'Tại sao GitHub tính phí phút chạy máy ảo macOS đắt gấp 10 lần so với máy ảo Linux Ubuntu, và kỹ sư nên tối ưu hóa điều này như thế nào?',
    summary: [
      'Mỗi Job đại diện cho một tác vụ độc lập chạy trên một máy ảo Runner được cấp phát riêng.',
      'Thuộc tính `runs-on` là bắt buộc để chỉ định hệ điều hành (`ubuntu-latest`, `windows-latest`, `macos-latest`).',
      'Các Job mặc định chạy song song hoàn toàn, giúp tối ưu hóa tối đa thời gian thực thi của đường ống.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Thuộc tính nào là bắt buộc phải có trong mỗi định nghĩa Job của GitHub Actions?',
        options: [
          { text: 'runs-on', correct: true },
          { text: 'timeout', correct: false },
          { text: 'machine-type', correct: false },
          { text: 'os-system', correct: false },
        ],
        explanation: 'GitHub Actions bắt buộc phải biết máy ảo loại nào được dùng để thực thi Job thông qua từ khóa `runs-on`.',
      },
      {
        id: 'q2',
        question: 'Giá trị nào sau đây thường được sử dụng phổ biến và tiết kiệm nhất cho thuộc tính runs-on?',
        options: [
          { text: 'ubuntu-latest', correct: true },
          { text: 'macos-latest', correct: false },
          { text: 'windows-latest', correct: false },
          { text: 'solaris-latest', correct: false },
        ],
        explanation: '`ubuntu-latest` là môi trường Linux phổ biến nhất, tốc độ khởi động cực nhanh và có chi phí tài nguyên thấp nhất.',
      },
      {
        id: 'q3',
        question: 'Điều gì xảy ra với hệ thống tệp tin sau khi một Job kết thúc phiên chạy của mình?',
        options: [
          { text: 'Máy ảo Runner bị hủy hoàn toàn cùng toàn bộ dữ liệu tạm thời trên ổ đĩa', correct: true },
          { text: 'Hệ thống tự động lưu toàn bộ ổ cứng vào tài khoản Google Drive của bạn', correct: false },
          { text: 'Tệp tin được giữ nguyên vĩnh viễn cho lần chạy tiếp theo', correct: false },
          { text: 'Dữ liệu tự động chuyển sang máy tính cá nhân của lập trình viên', correct: false },
        ],
        explanation: 'Các Runner do GitHub lưu trữ (GitHub-hosted) hoạt động theo mô hình phi trạng thái (ephemeral), máy ảo bị xóa sạch ngay sau khi Job kết thúc.',
      },
      {
        id: 'q4',
        question: 'Mục đích của việc đặt trường `name:` bên trong cấu hình Job là gì?',
        options: [
          { text: 'Hiển thị tên mô tả thân thiện, dễ đọc trên giao diện web của GitHub Actions', correct: true },
          { text: 'Đặt tên tài khoản đăng nhập vào máy ảo', correct: false },
          { text: 'Đặt mật khẩu mã hóa cho tệp cấu hình', correct: false },
          { text: 'Quy định tên của thư mục chứa mã nguồn', correct: false },
        ],
        explanation: 'Trường `name:` giúp người quản trị dễ dàng nhận diện tác vụ trên giao diện trực quan thay vì chỉ nhìn thấy mã định danh `job_id`.',
      },
    ],
  },
  {
    id: '07-steps-execution',
    title: 'Các bước thực thi (Steps): name, id và thứ tự tuần tự',
    duration: 30,
    xp: 90,
    prerequisites: ['06-jobs-configuration'],
    keywords: ['steps execution', 'step id', 'sequential', 'step name', 'working directory'],
    objectives: [
      'Nắm vững cấu trúc danh sách steps trong Job và tính chất thực thi tuần tự nghiêm ngặt.',
      'Hiểu rõ công dụng của thuộc tính name (mô tả trực quan) và thuộc tính id (định danh để tham chiếu output).',
      'Nắm được cơ chế dừng khẩn cấp khi một Step thất bại và cách tiếp tục với continue-on-error.',
    ],
    commands: ['echo "Hello Step"', 'gh run view --log'],
    definition:
      'Steps (Các bước) là một mảng tuần tự các tác vụ cụ thể cần thực hiện bên trong một Job. Một Step có thể là một câu lệnh shell đơn giản (dùng từ khóa run) hoặc một hành động được đóng gói sẵn (dùng từ khóa uses). Các Step trong cùng một Job luôn luôn thực thi tuần tự từ trên xuống dưới trên cùng một máy ảo Runner, dùng chung hệ thống tệp tin và các biến môi trường được thiết lập trước đó trong suốt phiên làm việc.',
    why:
      'Hiểu rõ cơ chế của Step giúp bạn kiểm soát hoàn toàn quy trình xử lý mã nguồn: từ việc tải mã nguồn về đĩa, cài đặt đúng phiên bản ngôn ngữ, chạy kiểm thử cho đến khi dọn dẹp môi trường. Nếu một Step bị lỗi (mã thoát khác 0), mặc định toàn bộ các Step phía sau sẽ bị hủy bỏ ngay lập tức, ngăn ngừa việc tiếp tục xây dựng hoặc phát hành một sản phẩm hỏng.',
    mentalModel:
      'Hãy tưởng tượng các Step như một công thức làm bánh ngọt từng bước trong sách nấu ăn: Bước 1: Đập trứng vào bát; Bước 2: Đánh tan trứng; Bước 3: Cho đường và sữa; Bước 4: Nướng bánh trong lò. Bạn không thể nướng bánh trước khi đập trứng (tính tuần tự). Và nếu ở Bước 1 quả trứng bị ung thối (Step 1 Failed), bạn phải dừng lại ngay lập tức chứ không được phép tiếp tục đổ sữa và nướng.',
    diagram:
      'Job Runner Container\n┌────────────────────────────────────────────────────────┐\n│ Step 1: actions/checkout@v4       ──► [Thành công ✓]   │\n│       │ (Dữ liệu repo ghi vào ổ đĩa workspace)          │\n│       ▼                                                │\n│ Step 2: npm install               ──► [Thành công ✓]   │\n│       │ (Thư mục node_modules sẵn sàng)                │\n│       ▼                                                │\n│ Step 3: npm test                  ──► [Thất bại ✗]     │\n│       │ (Phát hiện lỗi kiểm thử)                       │\n│       ▼                                                │\n│ Step 4: npm run build             ──► [Bị hủy bỏ 🚫]   │\n└────────────────────────────────────────────────────────┘',
    example:
      'Một kỹ sư cấu hình Job chạy kiểm thử cho ứng dụng Python: Step 1 tải mã nguồn về; Step 2 cài đặt thư viện kiểm thử pytest; Step 3 chạy lệnh pytest tests/ với định danh id: test_run; Step 4 in ra thông báo chúc mừng. Trong lần chạy thử nghiệm, Step 3 phát hiện một lỗi chia cho số 0 và thoát với mã lỗi 1. Toàn bộ Job lập tức chuyển sang trạng thái thất bại màu đỏ và Step 4 hoàn toàn không được gọi. Nhờ cơ chế an toàn này, hệ thống không bao giờ lãng phí thời gian chạy tiếp các bước sau khi lỗi đã xuất hiện.',
    commandSnippet: 'echo "Hello Step"\ngh run view --log',
    commandExplanation:
      'Lệnh echo minh họa một lệnh shell cơ bản bên trong thuộc tính run của step, và gh run view --log hiển thị chi tiết dòng log xuất ra của từng Step trong phiên chạy để kỹ sư theo dõi diễn biến từng dòng lệnh được thực thi.',
    mistakes: [
      'Cho rằng mỗi Step chạy trong một thư mục khác nhau: Toàn bộ các Step trong một Job đều chạy trong thư mục mặc định github.workspace.',
      'Thiếu thuộc tính name khiến log hiển thị các dòng lệnh run dài ngoằng rất khó quan sát và chẩn đoán lỗi.',
      'Không đặt thuộc tính id khi cần lấy dữ liệu đầu ra (outputs) của Step đó để sử dụng ở các Step tiếp theo.',
    ],
    labSteps: [
      'Khai báo danh sách `steps` gồm ít nhất 3 bước với tên mô tả `name` rõ ràng bằng tiếng Việt.',
      'Gán thuộc tính `id: step_one` cho bước đầu tiên để làm quen với việc định danh.',
      'Chạy thử nghiệm một lệnh thoát lỗi `exit 1` ở bước 2 để quan sát bước 3 tự động bị bỏ qua.',
    ],
    hint: 'Luôn đặt tên `name` mô tả hành động (ví dụ: "Cài đặt dependencies", "Biên dịch mã nguồn") thay vì để trống.',
    validation: 'Các Step thực thi đúng theo thứ tự khai báo và ghi lại log riêng biệt cho từng bước.',
    quizIntro: 'Cùng kiểm tra hiểu biết của bạn về cơ chế thực thi của các Step qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để cấu hình một Step vẫn luôn luôn được thực thi (ví dụ: gửi thông báo báo cáo lỗi) kể cả khi các Step trước đó bị thất bại?',
    summary: [
      'Các Step trong Job luôn thực thi tuần tự từ trên xuống dưới trên cùng một Runner.',
      'Nếu một Step gặp lỗi (exit code khác 0), mặc định các Step tiếp theo sẽ bị hủy bỏ ngay lập tức.',
      'Mỗi Step có thể gán `name` để hiển thị trực quan và `id` để tham chiếu dữ liệu đầu ra.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Thứ tự thực thi của các Step bên trong một Job được quyết định như thế nào?',
        options: [
          { text: 'Tuần tự lần lượt từ trên xuống dưới theo thứ tự khai báo trong tệp YAML', correct: true },
          { text: 'Chạy song song cùng lúc', correct: false },
          { text: 'Theo thứ tự bảng chữ cái của tên Step', correct: false },
          { text: 'Ngẫu nhiên tùy theo tải của máy chủ', correct: false },
        ],
        explanation: 'Các Step trong một Job luôn tuân thủ nguyên tắc thực thi tuần tự từ trên xuống dưới.',
      },
      {
        id: 'q2',
        question: 'Điều gì xảy ra với các Step phía sau nếu một Step bị lỗi (exit code khác 0)?',
        options: [
          { text: 'Mặc định toàn bộ các Step phía sau sẽ bị hủy bỏ (skipped) và Job báo thất bại', correct: true },
          { text: 'Hệ thống tự động khởi động lại máy tính của lập trình viên', correct: false },
          { text: 'Các Step phía sau vẫn chạy bình thường như không có gì xảy ra', correct: false },
          { text: 'Toàn bộ kho lưu trữ GitHub bị khóa tạm thời', correct: false },
        ],
        explanation: 'GitHub Actions có cơ chế Fail-fast: khi một bước bị lỗi, các bước sau sẽ không được chạy để tránh hậu quả sai lệch.',
      },
      {
        id: 'q3',
        question: 'Thuộc tính nào giúp một Step vẫn tiếp tục chạy mà không làm dừng Job kể cả khi lệnh bên trong bị lỗi?',
        options: [
          { text: 'continue-on-error: true', correct: true },
          { text: 'ignore-failure: true', correct: false },
          { text: 'allow-crash: true', correct: false },
          { text: 'force-run: true', correct: false },
        ],
        explanation: '`continue-on-error: true` cho phép Job tiếp tục chạy các bước sau dù bước hiện tại trả về mã lỗi thất bại.',
      },
      {
        id: 'q4',
        question: 'Mục đích chính của thuộc tính `id` trong một Step là gì?',
        options: [
          { text: 'Đặt tên định danh để các Step sau có thể truy cập biến đầu ra (outputs) của Step này', correct: true },
          { text: 'Để GitHub trừ tiền vào tài khoản người dùng', correct: false },
          { text: 'Để mã hóa tệp tin chứa mã nguồn', correct: false },
          { text: 'Bắt buộc phải có thì Step mới chạy được', correct: false },
        ],
        explanation: 'Gán `id` cho Step giúp bạn có thể tham chiếu các giá trị output qua cú pháp `${{ steps.my_id.outputs.my_var }}`.',
      },
    ],
  },
  {
    id: '08-runners-environment',
    title: 'Môi trường thực thi Runners: GitHub-hosted vs Self-hosted',
    duration: 30,
    xp: 95,
    prerequisites: ['07-steps-execution'],
    keywords: ['runners', 'github hosted', 'self hosted', 'virtual machines', 'security isolation'],
    objectives: [
      'Phân biệt rõ ràng giữa hai mô hình: GitHub-hosted Runners và Self-hosted Runners.',
      'Nắm được các ưu điểm và hạn chế về tài nguyên, chi phí, tốc độ và tính bảo mật của từng loại.',
      'Hiểu rõ các rủi ro bảo mật nghiêm trọng khi sử dụng Self-hosted Runners trên các kho lưu trữ công khai.',
    ],
    commands: ['uname -a', 'cat /etc/os-release', 'free -m'],
    definition:
      'Runner là ứng dụng dịch vụ chạy trên một máy chủ thực thi các Job trong workflow của bạn. GitHub cung cấp hai loại Runner chính: GitHub-hosted Runners (máy ảo sạch được GitHub tự động cấp phát, quản lý, cài đặt sẵn phần mềm và hủy ngay sau mỗi phiên chạy) và Self-hosted Runners (máy chủ vật lý, máy ảo hoặc container do chính bạn hoặc tổ chức của bạn tự cài đặt, vận hành và quản lý ứng dụng Runner) với sự kiểm soát hạ tầng và môi trường mạng một cách toàn diện.',
    why:
      'Lựa chọn đúng loại Runner là bài toán chiến lược về chi phí và hiệu năng. GitHub-hosted tiện lợi tuyệt đối, không tốn công bảo trì nhưng bị giới hạn về cấu hình phần cứng và có chi phí theo phút. Self-hosted Runners cho phép tận dụng phần cứng chuyên biệt cực mạnh (ví dụ: máy chủ có card đồ họa GPU để huấn luyện AI, dung lượng RAM hàng trăm GB) và truy cập trực tiếp vào mạng nội bộ của doanh nghiệp mà không cần mở cổng Internet.',
    mentalModel:
      'Hãy so sánh việc thuê xe taxi công nghệ (GitHub-hosted) với việc sở hữu một chiếc xe tải riêng (Self-hosted). Với taxi, bạn chỉ cần mở ứng dụng bấm gọi xe khi cần di chuyển; xe luôn sạch sẽ, bảo dưỡng sẵn, đi xong bạn xuống xe và không cần bận tâm về việc rửa xe hay thay dầu. Còn xe tải riêng đòi hỏi bạn phải tự bỏ tiền mua xe, tự đổ xăng và sửa chữa, nhưng bạn có thể độ thùng xe siêu trường siêu trọng để chở hàng hóa quá khổ mà không một hãng taxi nào đáp ứng được.',
    diagram:
      'So sánh mô hình Runner:\n┌───────────────────────────────────┬───────────────────────────────────┐\n│ GitHub-hosted Runner              │ Self-hosted Runner                │\n├───────────────────────────────────┼───────────────────────────────────┤\n│ • Quản lý bởi: GitHub             │ • Quản lý bởi: Chính bạn / Công ty │\n│ • Máy ảo sạch: Tạo mới & Xóa ngay │ • Máy tồn tại liên tục (Stateful) │\n│ • Hạn ngạch: Tính theo phút dùng   │ • Chi phí: Trả tiền máy chủ riêng │\n│ • Bảo mật: Cách ly hoàn hảo       │ • Cảnh báo: Rủi ro mã độc trên PR │\n│ • runs-on: ubuntu-latest          │ • runs-on: [self-hosted, linux]   │\n└───────────────────────────────────┴───────────────────────────────────┘',
    example:
      'Một công ty khởi nghiệp phát triển mô hình trí tuệ nhân tạo nhận thấy các GitHub-hosted Runners thông thường chỉ có 2 đến 4 CPU ảo, khiến quá trình kiểm thử mô hình học sâu mất hơn hai tiếng đồng hồ. Nhóm quyết định lắp đặt một máy chủ Self-hosted có 64 nhân CPU và 2 card GPU NVIDIA đặt tại văn phòng, sau đó cài đặt ứng dụng GitHub Actions Runner. Kể từ đó, thời gian kiểm thử mô hình giảm xuống chỉ còn 6 phút. Tuy nhiên, họ chỉ cho phép chạy Self-hosted Runner trên kho lưu trữ nội bộ (Private Repo) để ngăn chặn kẻ xấu lợi dụng máy chủ đào tiền ảo.',
    commandSnippet: 'uname -a\ncat /etc/os-release\nfree -m',
    commandExplanation:
      'Các lệnh trên cho phép kiểm tra thông số kiến trúc hạt nhân Linux với uname -a, phiên bản hệ điều hành với cat /etc/os-release và dung lượng bộ nhớ RAM khả dụng với free -m ngay bên trong môi trường Runner nhằm kiểm tra tài nguyên hệ thống thực tế.',
    mistakes: [
      'Gắn Self-hosted Runner vào một kho lưu trữ công khai (Public Repo): Kẻ xấu có thể mở Pull Request chứa mã độc để chiếm quyền điều khiển máy chủ của bạn.',
      'Không dọn dẹp các tệp tin tạm thời trên Self-hosted Runner khiến ổ cứng bị đầy sau một thời gian hoạt động.',
      'Kỳ vọng GitHub-hosted Runner lưu lại tệp tin đã tải về giữa hai lần kích hoạt workflow khác nhau.',
    ],
    labSteps: [
      'Thêm một bước in ra thông tin cấu hình máy chủ của Runner bằng lệnh `uname -a`.',
      'Kiểm tra dung lượng bộ nhớ RAM và ổ đĩa có sẵn trên Runner của GitHub.',
      'Tìm hiểu mục cấu hình Runners trong phần Settings của kho lưu trữ trên GitHub.',
    ],
    hint: 'Mặc định trên GitHub-hosted Linux, bạn có quyền thực thi lệnh với quyền quản trị viên `sudo` mà không cần nhập mật khẩu.',
    validation: 'Log hiển thị chính xác thông số môi trường Linux Ubuntu được cấp phát tự động.',
    quizIntro: 'Hãy kiểm tra kiến thức về sự khác biệt giữa hai mô hình Runner qua các câu hỏi sau.',
    challenge:
      'Tại sao GitHub đưa ra cảnh báo cực kỳ nghiêm trọng về việc không bao giờ được sử dụng Self-hosted Runner cho các kho lưu trữ mã nguồn mở công khai?',
    summary: [
      'GitHub-hosted Runners là máy ảo do GitHub quản lý, đảm bảo môi trường sạch sẽ và cách ly tuyệt đối.',
      'Self-hosted Runners do bạn tự vận hành, phù hợp cho phần cứng chuyên biệt (GPU) và truy cập mạng nội bộ.',
      'Tuyệt đối không dùng Self-hosted Runners trên Public Repositories để phòng tránh rủi ro thực thi mã độc.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Đặc điểm nào sau đây là của GitHub-hosted Runner?',
        options: [
          { text: 'Mỗi Job được chạy trên một máy ảo sạch và máy ảo bị hủy ngay sau khi Job kết thúc', correct: true },
          { text: 'Bạn phải tự mua phần cứng máy chủ và cắm dây mạng', correct: false },
          { text: 'Toàn bộ dữ liệu của lần chạy trước được giữ nguyên trên ổ đĩa', correct: false },
          { text: 'Không hỗ trợ hệ điều hành Linux', correct: false },
        ],
        explanation: 'GitHub-hosted Runners được sinh ra tức thời theo yêu cầu và bị hủy ngay lập tức để đảm bảo tính an toàn và sạch sẽ.',
      },
      {
        id: 'q2',
        question: 'Trường hợp nào sau đây là lý do chính đáng nhất để đầu tư Self-hosted Runner?',
        options: [
          { text: 'Cần phần cứng đặc biệt như card đồ họa GPU hoặc cần truy cập trực tiếp mạng nội bộ công ty', correct: true },
          { text: 'Chỉ để in ra dòng chữ "Hello World"', correct: false },
          { text: 'Để không bao giờ phải viết tệp YAML nữa', correct: false },
          { text: 'Để tránh việc phải kết nối Internet', correct: false },
        ],
        explanation: 'Self-hosted Runners phù hợp khi cần tài nguyên phần cứng lớn, thời lượng chạy dài hoặc cần kết nối cơ sở dữ liệu nội bộ.',
      },
      {
        id: 'q3',
        question: 'Tại sao việc dùng Self-hosted Runner cho kho lưu trữ Public lại cực kỳ nguy hiểm?',
        options: [
          { text: 'Bất kỳ ai trên Internet mở PR cũng có thể chạy lệnh tùy ý trên máy chủ của bạn để đánh cắp dữ liệu hoặc đào tiền ảo', correct: true },
          { text: 'Làm máy chủ bị tiêu tốn quá nhiều giấy in', correct: false },
          { text: 'Khiến màn hình máy chủ bị đổi màu nền', correct: false },
          { text: 'GitHub sẽ tự động xóa tài khoản cá nhân của bạn ngay lập tức', correct: false },
        ],
        explanation: 'Mọi mã nguồn trong PR từ cộng đồng đều có thể thực thi với quyền hạn của máy chủ nội bộ, tiềm ẩn nguy cơ bảo mật nghiêm trọng.',
      },
      {
        id: 'q4',
        question: 'Để chỉ định Job chạy trên một Self-hosted Runner do bạn tự cấu hình, cú pháp runs-on sẽ là gì?',
        options: [
          { text: 'runs-on: self-hosted', correct: true },
          { text: 'runs-on: my-home-pc', correct: false },
          { text: 'runs-on: private-server', correct: false },
          { text: 'runs-on: local-machine', correct: false },
        ],
        explanation: 'Nhãn `self-hosted` là nhãn mặc định bắt buộc được gán cho mọi Runner tự quản lý.',
      },
    ],
  },
  {
    id: '09-run-vs-uses',
    title: 'Phân biệt run (shell command) vs uses (prebuilt action)',
    duration: 30,
    xp: 90,
    prerequisites: ['08-runners-environment'],
    keywords: ['run', 'uses', 'action', 'shell command', 'marketplace'],
    objectives: [
      'Phân biệt rõ ràng mục đích sử dụng giữa lệnh shell tự do (run) và hành động đóng gói sẵn (uses).',
      'Hiểu cú pháp tham chiếu action với phiên bản: owner/repo@version (ví dụ: actions/checkout@v4).',
      'Biết cách truyền tham số cấu hình cho Action thông qua từ khóa with.',
    ],
    commands: ['git clone', 'node --version', 'npm test'],
    definition:
      'Trong định nghĩa của một Step, bạn có hai phương thức chính để thực thi công việc: run và uses. Từ khóa run được sử dụng để chạy trực tiếp các câu lệnh shell (bash, sh, powershell, cmd) trên hệ điều hành của Runner. Trong khi đó, từ khóa uses được sử dụng để gọi và thực thi một Hành động (Action) đã được đóng gói sẵn từ GitHub Marketplace hoặc từ nội bộ dự án, tuân theo định dạng chuẩn owner/repo@ref với đầy đủ tham số cấu hình đầu vào.',
    why:
      'Nếu không có các Action đóng gói sẵn (uses), bạn sẽ phải tự viết hàng chục dòng lệnh shell phức tạp để thiết lập môi trường: tự tải mã nguồn qua git clone có xác thực token, tự cài đặt và giải nén Node.js, tự cấu hình biến môi trường và xử lý lỗi đa nền tảng. Sử dụng uses giúp kịch bản workflow ngắn gọn, đạt chuẩn thực hành tốt nhất của ngành, nâng cao tính bảo mật và giúp mã nguồn dễ bảo trì, dễ dàng nâng cấp trong suốt vòng đời dự án phần mềm lâu dài.',
    mentalModel:
      'Hãy so sánh việc tự tay làm một chiếc bánh pizza thơm ngon tại nhà (run) với việc mua một hộp pizza cao cấp được chế biến sẵn từ siêu thị (uses). Với phương thức run, bạn tự nhào bột, tự nêm nếm gia vị và nướng bằng chiếc lò của mình (bạn có toàn quyền kiểm soát từng chi tiết nhỏ nhưng rất tốn công sức). Với phương thức uses, bạn chỉ việc bóc hộp cho vào lò theo đúng hướng dẫn chuẩn xác in trên bao bì (khối with) của các chuyên gia đầu bếp quốc tế chuyên nghiệp.',
    diagram:
      'Step Execution Method:\n┌──────────────────────────────────────────┬──────────────────────────────────────────┐\n│ run: Shell Commands                      │ uses: Prebuilt Actions                   │\n├──────────────────────────────────────────┼──────────────────────────────────────────┤\n│ - name: Chạy kiểm thử                    │ - name: Cài đặt Node.js                  │\n│   run: |                                 │   uses: actions/setup-node@v4            │\n│     npm install                          │   with:                                  │\n│     npm test                             │     node-version: 20                     │\n│ • Tự viết lệnh dòng lệnh cụ thể          │ • Tái sử dụng thư viện đóng gói sẵn      │\n│ • Linh hoạt, trực tiếp                   │ • Đơn giản, an toàn, chuẩn hóa           │\n└──────────────────────────────────────────┴──────────────────────────────────────────┘',
    example:
      'Một kỹ sư xây dựng kịch bản kiểm thử cho dự án TypeScript. Bước đầu tiên, kỹ sư sử dụng uses: actions/checkout@v4 để tải mã nguồn kho lưu trữ về máy ảo. Bước thứ hai, kỹ sư sử dụng uses: actions/setup-node@v4 kèm theo tham số with: { node-version: 18, cache: \'npm\' } để vừa cài đặt Node.js vừa tự động lưu bộ đệm các thư viện. Đến bước thứ ba, khi cần chạy bài kiểm thử nội bộ đặc thù của dự án, kỹ sư chuyển sang dùng run: npm test. Sự kết hợp nhịp nhàng giữa uses (chuẩn bị hạ tầng) và run (thực thi nghiệp vụ riêng) tạo nên một pipeline mẫu mực.',
    commandSnippet: 'git clone\nnode --version\nnpm test',
    commandExplanation:
      'Các câu lệnh trên phản ánh những tác vụ thực tế: sao chép mã nguồn, kiểm tra phiên bản runtime môi trường và chạy bộ kiểm thử dự án nhằm đảm bảo hệ thống phần mềm hoạt động chính xác trước khi chuyển sang giai đoạn phát hành.',
    mistakes: [
      'Quên ghim phiên bản cụ thể (@v4) cho action trong uses, khiến workflow dễ bị lỗi khi tác giả cập nhật phiên bản mới làm hỏng tính tương thích.',
      'Sử dụng run để tự viết lại những tác vụ phức tạp đã có sẵn action chuẩn mực như checkout hay upload-artifact.',
      'Đặt nhầm các tham số cấu hình của Action ngang hàng với uses thay vì đặt bên trong khối `with:`.',
    ],
    labSteps: [
      'Tạo một Step sử dụng action đóng gói sẵn `actions/checkout@v4`.',
      'Tạo một Step sử dụng `actions/setup-node@v4` và cấu hình phiên bản Node 20 bằng khóa `with:`.',
      'Tạo một Step sử dụng `run:` để in ra phiên bản `node -v` và `npm -v`.',
    ],
    hint: 'Luôn luôn sử dụng `actions/checkout@v4` làm bước đầu tiên trong hầu hết các Job cần thao tác với mã nguồn dự án.',
    validation: 'Mã nguồn được tải về chính xác và phiên bản Node.js hiển thị đúng như đã cấu hình.',
    quizIntro: 'Cùng phân biệt và ứng dụng chính xác giữa run và uses qua bài kiểm tra dưới đây.',
    challenge:
      'Tại sao các chuyên gia bảo mật khuyến nghị nên ghim action bằng mã băm commit SHA đầy đủ thay vì dùng thẻ tag phiên bản (@v4) trong các dự án quan trọng?',
    summary: [
      '`run` dùng để thực thi trực tiếp các câu lệnh shell trên hệ điều hành của Runner.',
      '`uses` dùng để gọi các Action đóng gói sẵn từ Marketplace theo cú pháp `owner/repo@version`.',
      'Sử dụng khối `with:` để truyền các tham số cấu hình đầu vào (inputs) cho Action.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Từ khóa nào được sử dụng để thực thi một câu lệnh dòng lệnh shell trực tiếp trong Step?',
        options: [
          { text: 'run', correct: true },
          { text: 'uses', correct: false },
          { text: 'exec', correct: false },
          { text: 'shell', correct: false },
        ],
        explanation: 'Từ khóa `run:` cho phép bạn nhập các câu lệnh shell trực tiếp như `npm install` hay `echo "hello"`.',
      },
      {
        id: 'q2',
        question: 'Cú pháp chuẩn để gọi một Action từ GitHub Marketplace là gì?',
        options: [
          { text: 'owner/repo@ref (ví dụ: actions/checkout@v4)', correct: true },
          { text: 'https://github.com/action.zip', correct: false },
          { text: 'import action from marketplace', correct: false },
          { text: 'npm install @actions/checkout', correct: false },
        ],
        explanation: 'GitHub Actions định danh các action bằng đường dẫn kho lưu trữ kèm thẻ phiên bản hoặc commit hash: `owner/repo@ref`.',
      },
      {
        id: 'q3',
        question: 'Từ khóa nào được sử dụng để truyền các tham số đầu vào cho một Action gọi bằng uses?',
        options: [
          { text: 'with', correct: true },
          { text: 'args', correct: false },
          { text: 'params', correct: false },
          { text: 'inputs', correct: false },
        ],
        explanation: 'Khối `with:` chứa danh sách các cặp key-value đóng vai trò là tham số đầu vào (inputs) cung cấp cho Action.',
      },
      {
        id: 'q4',
        question: 'Nếu trong một Job bạn không sử dụng `actions/checkout`, điều gì sẽ xảy ra trong thư mục làm việc của Runner?',
        options: [
          { text: 'Thư mục làm việc sẽ hoàn toàn trống rỗng, không có mã nguồn của dự án', correct: true },
          { text: 'Toàn bộ mã nguồn tự động xuất hiện sẵn', correct: false },
          { text: 'Máy ảo Runner sẽ tự động tải mã nguồn từ Google Drive', correct: false },
          { text: 'Job sẽ tự động bị từ chối chạy', correct: false },
        ],
        explanation: 'Máy ảo Runner khi mới khởi động hoàn toàn sạch sẽ, bạn bắt buộc phải gọi action checkout để kéo mã nguồn về ổ đĩa.',
      },
    ],
  },
  {
    id: '10-env-variables',
    title: 'Biến môi trường (Environment Variables) cấp workflow, job và step',
    duration: 30,
    xp: 90,
    prerequisites: ['09-run-vs-uses'],
    keywords: ['env variables', 'environment variables', 'scope', 'default env vars', 'dotenv'],
    objectives: [
      'Làm chủ từ khóa env và cơ chế kế thừa phạm vi (scope): cấp Workflow, cấp Job và cấp Step.',
      'Sử dụng các biến môi trường mặc định có sẵn của GitHub: GITHUB_SHA, GITHUB_REF, GITHUB_REPOSITORY.',
      'Biết cách đọc biến môi trường trong câu lệnh shell ($ENV_VAR) và truyền biến giữa các bước.',
    ],
    commands: ['echo $GITHUB_SHA', 'echo $NODE_ENV', 'printenv'],
    definition:
      'Biến môi trường (Environment Variables) trong GitHub Actions cho phép bạn lưu trữ và truyền các thông tin cấu hình tĩnh hoặc động vào các tiến trình thực thi của Runner. Bạn có thể định nghĩa biến môi trường bằng từ khóa env ở ba cấp độ phạm vi khác nhau: toàn bộ Workflow (áp dụng rộng rãi cho mọi Job), một Job cụ thể (áp dụng kế thừa cho mọi Step trong Job đó), hoặc chỉ riêng một Step cá lẻ với sự phân tầng và kế thừa quyền hạn rõ ràng, có tính cục bộ cao.',
    why:
      'Sử dụng biến môi trường giúp tách biệt hoàn toàn giữa mã nguồn logic và các giá trị cấu hình thay đổi theo môi trường (như NODE_ENV, PORT, API_ENDPOINT). Điều này tuân thủ nguyên tắc 12-Factor App, giúp kịch bản CI/CD linh hoạt, dễ dàng chuyển đổi giữa các môi trường phát triển, kiểm thử và sản xuất mà không cần sửa đổi mã nguồn. Nhờ đó, việc bảo mật các tham số hệ thống và tái cấu hình hạ tầng trở nên vô cùng đơn giản, an toàn, chuẩn hóa và ngăn ngừa triệt để các lỗi cấu hình cứng.',
    mentalModel:
      'Hãy tưởng tượng các tầng không khí trong một tòa nhà chung cư: Biến môi trường cấp Workflow giống như hệ thống điều hòa tổng của toàn tòa nhà (tất cả các căn hộ đều hưởng chung mức nhiệt độ này). Biến cấp Job giống như chiếc điều hòa riêng trong phòng khách của căn hộ (chỉ những người trong căn hộ đó mới thấy). Và biến cấp Step giống như chiếc quạt máy mini cầm tay chỉ thổi mát riêng cho một cá nhân trong tích tắc.',
    diagram:
      'Phạm vi kế thừa của biến môi trường (Scope Inheritance):\n┌─────────────────────────────────────────────────────────────┐\n│ env: [APP_NAME: "ShopApp"]       <── Áp dụng TOÀN WORKFLOW  │\n│                                                             │\n│ jobs:                                                       │\n│   build:                                                    │\n│     env: [STAGE: "staging"]      <── Áp dụng TOÀN BỘ JOB    │\n│     steps:                                                  │\n│       - name: Run Task                                      │\n│         env: [PORT: "8080"]      <── Áp dụng RIÊNG STEP NÀY │\n│         run: echo "$APP_NAME on $STAGE at port $PORT"       │\n└─────────────────────────────────────────────────────────────┘',
    example:
      'Một kỹ sư cấu hình đường ống phát hành cho ứng dụng web đa ngôn ngữ. Ở cấp cao nhất của workflow, kỹ sư khai báo env: { APP_ENV: \'test\', REGION: \'ap-southeast-1\' }. Khi Job chạy, mọi câu lệnh shell trong các Step đều có thể truy cập hai biến này. Ở một Step chạy bài kiểm thử tích hợp đặc thù, kỹ sư bổ sung thêm biến cục bộ env: { DEBUG: \'true\', RETRIES: \'3\' }. Nhờ phân tầng phạm vi thông minh, các bài kiểm thử nhận đúng cấu hình debug chi tiết mà không làm ảnh hưởng đến các tác vụ đóng gói khác.',
    commandSnippet: 'echo $GITHUB_SHA\necho $NODE_ENV\nprintenv',
    commandExplanation:
      'Lệnh printenv in ra toàn bộ bảng biến môi trường hiện hành trên máy ảo Runner, giúp lập trình viên kiểm tra danh sách các biến mặc định do GitHub cung cấp cũng như các biến tùy biến do mình thiết lập trong phiên làm việc.',
    mistakes: [
      'Ghi đè nhầm tên biến ở cấp Step khiến các giá trị quan trọng ở cấp Job bị mất hiệu lực.',
      'Sử dụng biến môi trường để lưu trữ mật khẩu, khóa bí mật hoặc token dưới dạng văn bản rõ.',
      'Nhầm lẫn cú pháp truy cập biến môi trường trong shell (`$MY_VAR`) với cú pháp ngữ cảnh GitHub Actions (`${{ env.MY_VAR }}`).',
    ],
    labSteps: [
      'Khai báo một biến môi trường `COURSE_NAME: "Git Academy"` ở cấp cao nhất của Workflow.',
      'Khai báo biến `NODE_ENV: "production"` ở cấp Job.',
      'Tạo một Step in ra giá trị của hai biến trên cùng với biến mặc định `$GITHUB_REF`.',
    ],
    hint: 'Biến khai báo ở cấp con (Step) sẽ ghi đè lên biến cùng tên được khai báo ở cấp cha (Job hoặc Workflow).',
    validation: 'Log in ra đầy đủ và chính xác giá trị của các biến môi trường từ cả ba cấp độ.',
    quizIntro: 'Hãy kiểm tra mức độ am hiểu của bạn về phạm vi và cách dùng biến môi trường qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để xuất một biến môi trường mới từ bên trong câu lệnh của một Step để các Step phía sau có thể đọc được bằng tệp $GITHUB_ENV?',
    summary: [
      'Từ khóa `env` cho phép khai báo biến môi trường ở 3 cấp độ: Workflow, Job và Step.',
      'Cấp con tự động kế thừa các biến từ cấp cha và có quyền ghi đè giá trị nếu cần.',
      'GitHub cung cấp sẵn nhiều biến môi trường mặc định hữu ích như `GITHUB_SHA`, `GITHUB_REF`, `GITHUB_REPOSITORY`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Biến môi trường được khai báo ngay dưới khóa `jobs:<job_id>:env` sẽ có phạm vi hiệu lực ở đâu?',
        options: [
          { text: 'Chỉ có hiệu lực đối với tất cả các Step bên trong Job đó', correct: true },
          { text: 'Có hiệu lực với toàn bộ các Job trong workflow', correct: false },
          { text: 'Có hiệu lực với mọi kho lưu trữ trên toàn thế giới', correct: false },
          { text: 'Chỉ có hiệu lực trong đúng 1 giây đầu tiên', correct: false },
        ],
        explanation: 'Biến môi trường khai báo ở cấp Job sẽ được kế thừa bởi tất cả các Step thuộc Job đó, nhưng không lan sang các Job khác.',
      },
      {
        id: 'q2',
        question: 'Nếu cùng một biến tên là `PORT` được khai báo ở cả cấp Workflow (giá trị 3000) và cấp Step (giá trị 8080), thì bên trong Step đó PORT có giá trị bao nhiêu?',
        options: [
          { text: '8080 (cấp con ghi đè cấp cha)', correct: true },
          { text: '3000 (cấp cha luôn thắng)', correct: false },
          { text: '11080 (cộng dồn cả hai)', correct: false },
          { text: 'Báo lỗi xung đột biến', correct: false },
        ],
        explanation: 'Quy tắc phạm vi biến tuân thủ nguyên lý ghi đè cục bộ: khai báo ở phạm vi hẹp hơn (Step) sẽ ghi đè phạm vi rộng hơn (Workflow).',
      },
      {
        id: 'q3',
        question: 'Biến môi trường mặc định nào sau đây chứa mã băm commit SHA đầy đủ đã kích hoạt workflow?',
        options: [
          { text: 'GITHUB_SHA', correct: true },
          { text: 'COMMIT_ID', correct: false },
          { text: 'GIT_HASH', correct: false },
          { text: 'ACTION_SHA', correct: false },
        ],
        explanation: '`GITHUB_SHA` là biến môi trường tiêu chuẩn do GitHub tự động tiêm vào mọi Runner, chứa mã commit 40 ký tự.',
      },
      {
        id: 'q4',
        question: 'Để lưu một biến môi trường động cho các Step sau sử dụng, lệnh shell nào sau đây là chuẩn mực?',
        options: [
          { text: 'echo "MY_VAR=value" >> $GITHUB_ENV', correct: true },
          { text: 'export MY_VAR=value', correct: false },
          { text: 'set MY_VAR=value', correct: false },
          { text: 'save MY_VAR=value', correct: false },
        ],
        explanation: 'Lệnh `export` chỉ có tác dụng trong phiên shell hiện tại. Để truyền sang các step sau, bạn phải ghi vào tệp `$GITHUB_ENV`.',
      },
    ],
  },
];
