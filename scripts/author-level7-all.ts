import { authorLessonsForModule } from './authoring-helper';

const plans = [
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
      'CI/CD viết tắt của Continuous Integration (Tích hợp liên tục) và Continuous Delivery/Deployment (Chuyển giao hoặc Triển khai liên tục). Đây là phương pháp luận và triết lý kỹ thuật phần mềm hiện đại nhằm tự động hóa toàn bộ các giai đoạn từ khi lập trình viên đẩy mã nguồn mới lên hệ thống quản lý phiên bản cho đến khi mã nguồn đó được kiểm tra cú pháp, biên dịch, chạy các bộ bài kiểm thử tự động và sẵn sàng bàn giao cho người dùng cuối trên các máy chủ môi trường sản xuất thực tế.',
    why:
      'Trong mô hình phát triển phần mềm truyền thống, các nhóm thường tích hợp mã nguồn định kỳ hàng tuần hoặc hàng tháng. Hậu quả là xuất hiện hiện tượng ác mộng tích hợp (Integration Hell), khi hàng trăm xung đột mã nguồn và lỗi tiềm ẩn bùng nổ cùng lúc. CI/CD giải quyết triệt để vấn đề này bằng cách ép buộc mọi thay đổi nhỏ phải được tích hợp liên tục vào nhánh chung, sau đó kích hoạt ngay lập tức chu trình kiểm thử tự động, giúp kỹ sư phát hiện và khắc phục sự cố chỉ trong vài phút sau khi viết mã.',
    mentalModel:
      'Hãy hình dung dây chuyền sản xuất lắp ráp ô tô tự động hóa hiện đại. Thay vì để một chiếc xe hoàn thiện toàn bộ rồi mới bắt đầu kiểm tra phanh và động cơ, mỗi chi tiết linh kiện khi vừa được lắp ráp vào khung xe đều đi qua các cánh tay robot cảm biến quang học quét kiểm tra chất lượng ngay tại chỗ. Nếu phát hiện một con ốc lỏng, dây chuyền lập tức dừng lại và phát đèn đỏ cảnh báo, đảm bảo không có bất kỳ sản phẩm lỗi nào được đi tiếp tới công đoạn bàn giao khách hàng.',
    diagram:
      'Developer push code ──► [Continuous Integration] ──► [Continuous Delivery] ──► [Production Deploy]\n                             │                               │\n                             ├─ Chạy Linter                   ├─ Đóng gói Docker Image\n                             ├─ Biên dịch TypeScript         ├─ Đẩy lên Staging Server\n                             └─ Chạy Unit/E2E Tests          └─ Chờ phê duyệt tự động',
    example:
      'Một công ty thương mại điện tử phục vụ hàng triệu người mua sắm trực tuyến áp dụng đường ống CI/CD chuẩn mực. Mỗi khi một kỹ sư tạo Pull Request bổ sung chức năng mã giảm giá mới, hệ thống tự động khởi tạo máy ảo, kéo toàn bộ mã nguồn về, cài đặt các thư viện phụ thuộc và chạy hơn một nghìn bài kiểm thử đơn vị. Nếu có một hàm tính toán tiền tệ bị sai lệch một chữ số thập phân, bài test lập tức báo đỏ và khóa chức năng merge. Nhờ vậy, nhóm phát triển có thể tự tin phát hành hơn hai mươi bản cập nhật phần mềm mỗi ngày mà hệ thống máy chủ thanh toán vẫn hoạt động ổn định tuyệt đối.',
    commandSnippet: 'npm test\nnpm run build\ngit push origin main',
    commandExplanation:
      'Các câu lệnh trên mô phỏng ba bước nền tảng của quy trình tích hợp: chạy kiểm thử cục bộ với npm test để phát hiện lỗi logic, biên dịch mã nguồn với npm run build để kiểm tra lỗi kiểu dữ liệu và cú pháp, cuối cùng là đẩy mã nguồn lên GitHub để kích hoạt đường ống CI trên đám mây.',
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
      'GitHub Actions là một nền tảng tự động hóa quy trình làm việc (Workflow Automation) và dịch vụ CI/CD được tích hợp trực tiếp, nguyên bản vào GitHub. Nền tảng này cho phép các kỹ sư phần mềm tạo ra các kịch bản tự động hóa mạnh mẽ phản hồi lại bất kỳ sự kiện nào xảy ra trong kho lưu trữ, từ việc đẩy mã nguồn, mở Pull Request, phát hành phiên bản mới, cho đến khi có một bình luận hoặc Issue được tạo ra.',
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
      'Các câu lệnh thông qua GitHub CLI (gh) cho phép kiểm tra trạng thái xác thực tài khoản với gh auth status, liệt kê danh sách toàn bộ các workflow tự động đã đăng ký với gh workflow list, và xem lịch sử các lần thực thi đường ống CI gần nhất với gh run list.',
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
      'Kiến trúc của GitHub Actions được xây dựng dựa trên bốn thành phần cơ bản có tính tổ chức chặt chẽ: Sự kiện (Event) kích hoạt Luồng công việc (Workflow); mỗi Workflow bao gồm một hoặc nhiều Tác vụ (Job); mỗi Job được thực thi độc lập trên một Máy chạy (Runner) riêng biệt; và bên trong mỗi Job chứa một danh sách các Bước (Step) thực thi tuần tự lần lượt từ trên xuống dưới.',
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
      'Lệnh tree .github hiển thị cây thư mục nơi chứa các tệp workflow, và cat in ra nội dung khai báo các khối kiến trúc name, on, jobs, steps để kiểm tra tính toàn vẹn của kịch bản.',
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
];

console.log('Writing first batch...');
authorLessonsForModule('07-github-actions', plans);
