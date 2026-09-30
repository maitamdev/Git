import { LessonAuthorData } from './types';

export const LEVEL_6B_LESSONS: LessonAuthorData[] = [
  {
    id: '09-codeowners',
    moduleId: '06-team-workflows',
    title: 'CODEOWNERS',
    duration: 25,
    xp: 85,
    keywords: ['codeowners', 'chu so huu ma nguon', 'tu dong gan review', 'phan quyen thu muc', 'github codeowners', 'team ownership'],
    prerequisites: ['08-branch-protection-rules'],
    objectives: [
      'Hiểu rõ khái niệm và lợi ích của tệp tin đặc biệt CODEOWNERS trong việc xác định quyền sở hữu từng module mã nguồn.',
      'Nắm vững cú pháp khai báo đường dẫn tệp tin và chỉ định người phụ trách cá nhân (@username) hoặc nhóm (@org/team-name).',
      'Kích hoạt tính năng bắt buộc chủ sở hữu mã nguồn phê duyệt (Require review from Code Owners) trong Branch Protection.',
      'Tổ chức cấu trúc tệp CODEOWNERS theo thứ tự ưu tiên từ trên xuống dưới một cách chuẩn xác.',
    ],
    definition:
      'CODEOWNERS là một tệp tin cấu hình đặc biệt được lưu trữ trong thư mục `.github/`, thư mục gốc của kho lưu trữ hoặc thư mục `docs/`. Tệp tin này sử dụng một cú pháp đơn giản tương tự như `.gitignore` để định nghĩa cá nhân hoặc đội ngũ kỹ thuật nào chịu trách nhiệm sở hữu và bảo trì các tệp tin hoặc thư mục cụ thể trong kho mã nguồn. Khi một lập trình viên mở một Pull Request có chỉnh sửa vào các tệp tin đó, nền tảng GitHub sẽ tự động yêu cầu đánh giá (Auto-assign Reviewers) từ các chủ sở hữu tương ứng, bảo đảm mọi thay đổi quan trọng đều được người có chuyên môn sâu nhất thẩm định.',
    why:
      'Trong các kho lưu trữ lớn với hàng trăm nghìn dòng code và hàng chục đội ngũ cùng phát triển (Monorepo hoặc Microservices repository), không một ai có thể hiểu sâu toàn bộ codebase. Nếu không có CODEOWNERS, người mở Pull Request thường không biết phải gán ai review, hoặc chỉ tiện tay nhờ một người bạn thân duyệt qua loa. Điều này dẫn đến nguy cơ các đoạn mã nhạy cảm như logic bảo mật, thuật toán tính tiền hoặc cấu hình hạ tầng bị thay đổi mà các chuyên gia phụ trách module đó không hề hay biết.',
    mentalModel:
      'Hãy hình dung một bệnh viện đa khoa quy mô lớn. Không một bác sĩ nào có thể phẫu thuật cho tất cả các loại bệnh. Khi một bệnh nhân nhập viện cần mổ tim, bệnh viện tự động chuyển bệnh án đến khoa Phẫu thuật Tim mạch; khi có ca gãy xương, bệnh án được chuyển ngay tới khoa Chấn thương Chỉnh hình. Tệp tin CODEOWNERS đóng vai trò như bảng phân loại chuyên khoa của bệnh viện: tệp nào thuộc module thanh toán thì tự động chuyển đến đội ngũ Kỹ sư Thanh toán, tệp nào thuộc cấu hình bảo mật thì tự động chuyển đến đội ngũ An ninh Mạng.',
    diagram: `Quy trình tự động hóa phân quyền với tệp CODEOWNERS:
Cấu trúc file .github/CODEOWNERS:
*                   @tech-leads
/src/auth/          @security-team
/src/billing/       @fintech-team
/docs/              @tech-writers

Kịch bản Pull Request:
Dev sửa file: /src/billing/stripe.ts
               │
               ▼ (GitHub tự động đối soát)
      Tự động gán Reviewer: @fintech-team!
      Khóa nút Merge cho đến khi đại diện @fintech-team Approve!`,
    example:
      'Trong kho lưu trữ của một ứng dụng du lịch trực tuyến, tệp `.github/CODEOWNERS` được cấu hình chi tiết: toàn bộ dự án do `@lead-architect` bao quát, nhưng các tệp trong thư mục `/src/payment/` thuộc quyền sở hữu riêng của nhóm `@finance-devs`, còn thư mục `/deploy/` thuộc về nhóm `@devops-engineers`. Khi lập trình viên Thảo mở một Pull Request để tích hợp ví MoMo vào thư mục thanh toán, hệ thống GitHub lập tức tự động gắn thẻ yêu cầu đánh giá gửi tới hai chuyên gia thuộc nhóm `@finance-devs`. Mặc dù đồng nghiệp ngồi cạnh Thảo đã xem và bấm Approve, nhưng nút Merge vẫn hiển thị thông báo cần chữ ký phê duyệt từ đại diện chính thức của nhóm CODEOWNERS sở hữu module thanh toán trước khi có thể tích hợp an toàn.',
    commands: [
      'cat .github/CODEOWNERS',
      'git add .github/CODEOWNERS',
      'git commit -m "chore: setup CODEOWNERS file for security and billing"',
    ],
    explanation:
      '- `cat .github/CODEOWNERS`: Đọc và kiểm tra nội dung phân quyền chủ sở hữu mã nguồn.\n- `git add .github/CODEOWNERS`: Thêm tệp cấu hình phân quyền vào danh sách chuẩn bị lưu trữ.\n- `git commit -m`: Ghi lại thay đổi thiết lập quyền sở hữu mã nguồn với thông điệp rõ ràng theo chuẩn.',
    mistakes: [
      'Đặt tệp CODEOWNERS sai vị trí: Phải đặt trong `.github/`, thư mục gốc hoặc thư mục `docs/`.',
      'Nhầm lẫn thứ tự ưu tiên: Git áp dụng quy tắc từ trên xuống dưới, dòng bên dưới sẽ ghi đè dòng bên trên.',
      'Gán tên tài khoản người dùng chưa được cấp quyền truy cập vào kho lưu trữ (Missing repository access).',
    ],
    labSteps: [
      'Tạo tệp `.github/CODEOWNERS` trong kho lưu trữ của bạn với quy tắc mặc định `* @your-username`.',
      'Thêm một quy tắc cụ thể cho thư mục `docs/` và quan sát hành vi tự động gán reviewer khi mở PR.',
    ],
    hint: 'Dòng khai báo bên dưới luôn có độ ưu tiên cao hơn dòng khai báo bên trên trong tệp CODEOWNERS.',
    validation: 'Khi mở một PR thay đổi tệp tin, GitHub tự động gắn đúng reviewer được định nghĩa trong CODEOWNERS.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về cơ chế phân quyền mã nguồn với tệp CODEOWNERS.',
    challenge: 'Thiết kế cấu trúc tệp CODEOWNERS cho một hệ thống Monorepo gồm 3 dịch vụ: frontend (React), backend (Go) và infrastructure (Terraform).',
    summary: [
      'CODEOWNERS tự động hóa việc gán người có trách nhiệm cao nhất vào đánh giá mã nguồn.',
      'Ngăn chặn nguy cơ các thay đổi nhạy cảm bị duyệt qua loa bởi những người không có chuyên môn sâu.',
      'Tích hợp hoàn hảo với Branch Protection Rules để tạo nên hàng rào bảo mật kỹ thuật vững chắc.',
    ],
    quiz: {
      id: 'quiz-06-09-codeowners',
      title: 'Trắc nghiệm: CODEOWNERS',
      questions: [
        {
          id: 'q1',
          question: 'Tệp tin CODEOWNERS phải được lưu trữ ở những vị trí hợp lệ nào sau đây để GitHub có thể nhận diện?',
          type: 'single',
          options: [
            { text: 'Thư mục .github/, thư mục gốc của repository, hoặc thư mục docs/', correct: true },
            { text: 'Thư mục .git/ bí mật của máy tính cá nhân', correct: false },
            { text: 'Bất kỳ thư mục nào trên ổ cứng C của máy tính', correct: false },
            { text: 'Thư mục node_modules/', correct: false },
          ],
          explanation:
            'GitHub chỉ tìm kiếm tệp CODEOWNERS tại 3 vị trí quy định: `.github/CODEOWNERS`, `/CODEOWNERS`, hoặc `docs/CODEOWNERS`.',
        },
        {
          id: 'q2',
          question: 'Điều gì xảy ra một cách tự động khi bạn mở một Pull Request chỉnh sửa tệp tin đã được khai báo trong CODEOWNERS?',
          type: 'single',
          options: [
            { text: 'GitHub tự động gửi yêu cầu đánh giá mã nguồn (Review request) tới các chủ sở hữu đã khai báo', correct: true },
            { text: 'GitHub tự động từ chối và đóng ngay Pull Request đó', correct: false },
            { text: 'GitHub tự động xóa các dòng code vừa được sửa đổi', correct: false },
            { text: 'Toàn bộ máy chủ của công ty sẽ bị ngắt kết nối Internet', correct: false },
          ],
          explanation:
            'Hệ thống tự động kích hoạt yêu cầu xem xét mã nguồn gửi trực tiếp tới các cá nhân hoặc nhóm kỹ sư phụ trách module đó.',
        },
        {
          id: 'q3',
          question: 'Trong tệp CODEOWNERS, nếu có nhiều quy tắc trùng lặp với cùng một tệp tin thì quy tắc nào sẽ được ưu tiên áp dụng?',
          type: 'single',
          options: [
            { text: 'Quy tắc xuất hiện sau cùng (ở dòng thấp hơn phía dưới của tệp tin)', correct: true },
            { text: 'Quy tắc xuất hiện đầu tiên ở dòng số 1', correct: false },
            { text: 'Quy tắc có tên người dùng dài nhất', correct: false },
            { text: 'GitHub sẽ tung đồng xu ngẫu nhiên để chọn', correct: false },
          ],
          explanation:
            'Tương tự như cú pháp của `.gitignore`, quy tắc khớp cuối cùng nằm ở phía dưới của tệp tin sẽ ghi đè các quy tắc chung bên trên.',
        },
        {
          id: 'q4',
          question: 'Khi kết hợp CODEOWNERS với tùy chọn "Require review from Code Owners" trong Branch Protection, điều kiện để merge là gì?',
          type: 'single',
          options: [
            { text: 'Bắt buộc phải có ít nhất một phê duyệt chính thức từ đúng chủ sở hữu được khai báo trong CODEOWNERS', correct: true },
            { text: 'Chỉ cần một đồng nghiệp bất kỳ bấm duyệt là có thể merge được ngay', correct: false },
            { text: 'Chỉ cần bài kiểm thử tự động pass là không cần con người phê duyệt', correct: false },
            { text: 'Chủ sở hữu phải trực tiếp gõ lệnh merge từ terminal của máy họ', correct: false },
          ],
          explanation:
            'Ràng buộc này bảo đảm việc duyệt code không thể bị bỏ qua bởi những người ngoài chuyên môn của module liên quan.',
        },
      ],
    },
  },
  {
    id: '10-conventional-commits',
    moduleId: '06-team-workflows',
    title: 'Conventional Commits',
    duration: 25,
    xp: 85,
    keywords: ['conventional commits', 'quy uoc commit', 'feat fix chore', 'semantic commit messages', 'changelog automation', 'breaking changes'],
    prerequisites: ['06-workflow-comparison'],
    objectives: [
      'Hiểu rõ đặc tả chuẩn Conventional Commits phiên bản 1.0.0 và giá trị to lớn của nó đối với tự động hóa phần mềm.',
      'Làm chủ cấu trúc chuẩn: `<type>[optional scope]: <description>` cùng các phần tùy chọn tử tế Body và Footer.',
      'Sử dụng chính xác các tiền tố định danh phổ biến: feat, fix, docs, style, refactor, perf, test, build, ci, chore.',
      'Biểu diễn các thay đổi phá vỡ tính tương thích ngược (BREAKING CHANGE) bằng dấu chấm than `!` hoặc footer chuyên dụng.',
    ],
    definition:
      'Conventional Commits là một quy ước định dạng thông điệp commit có cấu trúc chuẩn mực cao và dễ đọc cho cả con người lẫn máy tính. Đặc tả này thiết lập một bộ quy tắc nhẹ nhàng nhưng nhất quán, yêu cầu mọi commit phải bắt đầu bằng một định danh thể loại rõ ràng (như `feat`, `fix`, `chore`, `refactor`), đi kèm với phạm vi tác động tùy chọn, mô tả súc tích và phần nội dung mở rộng. Nhờ có cấu trúc máy tính có thể phân tích cú pháp (parseable) này, hệ thống CI/CD có thể tự động tính toán số phiên bản Semantic Versioning và tự động sinh nhật ký thay đổi (Changelog) hoàn hảo.',
    why:
      'Lịch sử commit với những câu từ mơ hồ, vô nghĩa như "fix bug", "update", "done task", hay "asdasd" là một cơn ác mộng khi cần truy tìm nguyên nhân phát sinh lỗi hoặc tổng hợp tài liệu phát hành cho khách hàng. Conventional Commits biến lịch sử dự án thành một câu chuyện tường minh, có tính tổ chức cao: nhìn vào danh sách commit, bất kỳ ai cũng biết ngay có bao nhiêu tính năng mới được thêm vào, bao nhiêu lỗi đã sửa và có thay đổi nào gây hỏng tương thích với phiên bản cũ hay không.',
    mentalModel:
      'Hãy hình dung bạn đang phân loại hồ sơ bệnh án hoặc kiện hàng bưu chính. Thay vì dán một mảnh giấy viết tay nghuệch ngoạc "kiện hàng", bưu điện yêu cầu dán nhãn chuẩn hóa có mã vạch: loại dịch vụ Hỏa tốc (`feat`), Sửa chữa bảo hành (`fix`), Bảo trì bảo dưỡng (`chore`), cùng điểm đến cụ thể `(checkout)`. Nhờ nhãn chuẩn này, hệ thống băng chuyền tự động có thể quét mã vạch và phân loại hàng ngàn kiện hàng vào đúng toa tàu mà không cần con người phải bóc từng kiện ra đọc nội dung.',
    diagram: `Cấu trúc giải phẫu của một Conventional Commit chuẩn mực:
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

Ví dụ thực tế:
feat(auth)!: add OAuth2 login with Google and GitHub

BREAKING CHANGE: The legacy basic auth endpoint /api/v1/login is removed.
Refs: #452`,
    example:
      'Một kỹ sư phần mềm thực hiện một loạt các thay đổi trong ngày làm việc. Thay vì viết thông điệp lộn xộn, kỹ sư tuân thủ nghiêm ngặt chuẩn Conventional Commits. Khi thêm cổng thanh toán PayPal, kỹ sư commit: `feat(payment): add PayPal smart button integration`. Khi sửa lỗi làm tròn số tiền tệ ở giỏ hàng, kỹ sư commit: `fix(cart): correct currency rounding for Japanese Yen`. Khi tái cấu trúc lại thư mục tiện ích mà không thay đổi tính năng, kỹ sư viết: `refactor(utils): split date helpers into separate modular files`. Đến cuối tuần khi chuẩn bị phát hành, công cụ tự động quét qua 50 commit này và tạo ra một tệp CHANGELOG.md đẹp mắt cùng số phiên bản mới mà kỹ sư không cần tốn một giây gõ tay nào.',
    commands: [
      'git commit -m "feat(api): add endpoint for user registration"',
      'git commit -m "fix(auth): prevent session timeout during checkout"',
      'git commit -m "feat(core)!: drop support for Node 16"',
    ],
    explanation:
      '- `feat(scope)`: Khai báo tính năng mới cung cấp giá trị trực tiếp cho người sử dụng phần mềm.\n- `fix(scope)`: Khai báo việc vá một lỗi phát sinh trong mã nguồn hiện tại.\n- `!` sau scope: Đánh dấu có thay đổi phá vỡ tương thích ngược (Breaking Change) cần tăng Major version.',
    mistakes: [
      'Viết chữ in hoa cho type hoặc viết sai chính tả, ví dụ gõ `Feat:`, `FEATURE:`, `fixed:`.',
      'Đặt dấu chấm ở cuối dòng tiêu đề description đầu tiên: Quy chuẩn khuyến nghị không dùng dấu chấm cuối tiêu đề.',
      'Sử dụng `feat` cho các công việc nội bộ như nâng cấp thư viện phụ thuộc (phải dùng `chore` hoặc `build`).',
    ],
    labSteps: [
      'Viết 3 commit mẫu tuân thủ đúng chuẩn Conventional Commits cho các hành động: thêm trang, sửa lỗi nút bấm và viết tài liệu hướng dẫn.',
      'Sử dụng dấu chấm than `!` để đánh dấu một thay đổi làm thay đổi định dạng dữ liệu API trả về.',
    ],
    hint: 'Dòng tiêu đề đầu tiên luôn viết ở thể mệnh lệnh hiện tại ngắn gọn dưới 72 ký tự.',
    validation: 'Các công cụ tự động hóa như standard-version hoặc semantic-release có thể đọc và phân tích cú pháp toàn bộ commit.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về chuẩn thông điệp Conventional Commits.',
    challenge: 'Thiết lập công cụ commitlint bằng husky trong dự án để tự động từ chối bất kỳ commit nào không tuân thủ Conventional Commits.',
    summary: [
      'Conventional Commits chuẩn hóa thông điệp commit theo cấu trúc mà máy tính có thể phân tích cú pháp được.',
      'Phân loại rõ ràng mục đích thay đổi qua các tiền tố: feat, fix, chore, refactor, docs, test.',
      'Là nền tảng tự động hóa việc tính toán số phiên bản Semantic Versioning và sinh Changelog tự động.',
    ],
    quiz: {
      id: 'quiz-06-10-conventional-commits',
      title: 'Trắc nghiệm: Conventional Commits',
      questions: [
        {
          id: 'q1',
          question: 'Tiền tố type nào sau đây trong Conventional Commits đại diện cho một tính năng mới được thêm vào hệ thống?',
          type: 'single',
          options: [
            { text: 'feat', correct: true },
            { text: 'fix', correct: false },
            { text: 'chore', correct: false },
            { text: 'docs', correct: false },
          ],
          explanation:
            '`feat` (viết tắt của feature) là định danh chuẩn dùng khi bổ sung một tính năng mới mang lại giá trị cho người dùng.',
        },
        {
          id: 'q2',
          question: 'Khi bạn chỉ sửa đổi tài liệu hướng dẫn sử dụng trong tệp README.md thì nên sử dụng tiền tố nào?',
          type: 'single',
          options: [
            { text: 'docs', correct: true },
            { text: 'feat', correct: false },
            { text: 'style', correct: false },
            { text: 'perf', correct: false },
          ],
          explanation:
            '`docs` là tiền tố dành riêng cho các thay đổi liên quan đến tài liệu, hướng dẫn hoặc tài liệu API.',
        },
        {
          id: 'q3',
          question: 'Cách thức chuẩn mực nào sau đây được dùng để báo hiệu một thay đổi phá vỡ tính tương thích ngược (Breaking Change)?',
          type: 'single',
          options: [
            { text: 'Thêm dấu chấm than `!` ngay sau type/scope hoặc có đoạn `BREAKING CHANGE:` ở phần footer', correct: true },
            { text: 'Gõ toàn bộ commit message bằng chữ in hoa kèm 10 dấu chấm than ở cuối', correct: false },
            { text: 'Xóa toàn bộ các tệp tin cũ trong kho lưu trữ', correct: false },
            { text: 'Gửi tin nhắn cảnh báo qua Zalo cho tất cả khách hàng', correct: false },
          ],
          explanation:
            'Dấu `!` (ví dụ `feat(api)!:`) hoặc phần footer `BREAKING CHANGE:` là cú pháp chuẩn được đặc tả quy định cho máy tính nhận diện.',
        },
        {
          id: 'q4',
          question: 'Tiền tố `refactor` được sử dụng chính xác trong tình huống nào sau đây?',
          type: 'single',
          options: [
            { text: 'Cải tiến và tổ chức lại cấu trúc mã nguồn bên trong mà không làm thay đổi tính năng hay sửa lỗi người dùng', correct: true },
            { text: 'Sửa một lỗi crash hệ thống vừa phát sinh', correct: false },
            { text: 'Viết thêm các bài kiểm thử unit test mới', correct: false },
            { text: 'Cập nhật phiên bản thư viện trong package.json', correct: false },
          ],
          explanation:
            '`refactor` chỉ tái cấu trúc mã nguồn để tăng tính dễ đọc và bảo trì mà giữ nguyên vẹn hành vi bên ngoài của phần mềm.',
        },
        {
          id: 'q5',
          question: 'Theo quy chuẩn thực hành tốt nhất của Conventional Commits, dòng tiêu đề đầu tiên nên được viết như thế nào?',
          type: 'single',
          options: [
            { text: 'Viết ngắn gọn súc tích ở thể mệnh lệnh, chữ thường và không kết thúc bằng dấu chấm', correct: true },
            { text: 'Viết một đoạn văn dài ít nhất 200 chữ có nhiều dấu chấm cảm', correct: false },
            { text: 'Chỉ cần ghi đúng một con số mã băm hash', correct: false },
            { text: 'Viết bằng bất kỳ biểu tượng cảm xúc emoji nào tùy thích', correct: false },
          ],
          explanation:
            'Tiêu đề súc tích không có dấu chấm ở cuối giúp hiển thị sạch sẽ trên giao diện GitHub và các công cụ dòng lệnh.',
        },
        {
          id: 'q6',
          question: 'Lợi ích tự động hóa lớn nhất mà Conventional Commits mang lại cho quy trình CI/CD hiện đại là gì?',
          type: 'single',
          options: [
            { text: 'Tự động tính toán số phiên bản phát hành mới (SemVer) và tự động tạo tệp CHANGELOG.md chuyên nghiệp', correct: true },
            { text: 'Tự động viết toàn bộ mã nguồn của dự án mà không cần lập trình viên', correct: false },
            { text: 'Tự động thanh toán tiền lương vào tài khoản của tác giả', correct: false },
            { text: 'Tự động phát hiện lỗi chính tả tiếng Việt trong bình luận', correct: false },
          ],
          explanation:
            'Công cụ tự động có thể quét các commit `feat` để tăng MINOR, commit `fix` để tăng PATCH, và `BREAKING CHANGE` để tăng MAJOR.',
        },
      ],
    },
  },
  {
    id: '11-semantic-versioning',
    moduleId: '06-team-workflows',
    title: 'Semantic Versioning',
    duration: 25,
    xp: 85,
    keywords: ['semantic versioning', 'semver', 'major minor patch', 'phien ban phan mem', 'dinh danh phien ban', 'tuong thich nguoc'],
    prerequisites: ['10-conventional-commits'],
    objectives: [
      'Nắm vững đặc tả Semantic Versioning 2.0.0 (SemVer) với định dạng chuẩn 3 con số: MAJOR.MINOR.PATCH.',
      'Áp dụng chính xác quy tắc tăng số: khi nào tăng PATCH (sửa lỗi), khi nào tăng MINOR (tính năng), khi nào tăng MAJOR (phá vỡ tương thích).',
      'Hiểu rõ ý nghĩa của các hậu tố tiền phát hành (Pre-release) như `-alpha`, `-beta`, `-rc.1` và thông tin bản dựng (Build metadata).',
      'Tích hợp tư duy SemVer vào quy trình quản lý thẻ Git Tag và phát hành thư viện phần mềm chuyên nghiệp.',
    ],
    definition:
      'Semantic Versioning (định danh phiên bản theo ngữ nghĩa, viết tắt là SemVer) là một đặc tả kỹ thuật phổ quát định nghĩa quy tắc đánh số phiên bản phần mềm một cách minh bạch và nhất quán. Phiên bản SemVer được biểu diễn dưới dạng ba cụm số nguyên dương phân cách bởi dấu chấm: `MAJOR.MINOR.PATCH` (ví dụ `2.4.1`). Mỗi con số mang một thông điệp kỹ thuật rõ ràng gửi tới cộng đồng người sử dụng về mức độ thay đổi và tính tương thích của mã nguồn bên trong bản phát hành đó.',
    why:
      'Nếu không có SemVer, người phát triển ứng dụng rơi vào "Địa ngục phụ thuộc" (Dependency Hell): khi nâng cấp một thư viện từ phiên bản 2.0 lên 2.1, bạn không thể biết liệu hệ thống của mình có bị gãy đổ hay không. Với SemVer, bạn hoàn toàn yên tâm: nếu chỉ tăng PATCH hoặc MINOR, bạn chắc chắn rằng mã nguồn của bạn vẫn chạy tương thích 100%; chỉ khi con số MAJOR thay đổi, bạn mới cần đọc kỹ tài liệu nâng cấp để điều chỉnh lại các đoạn mã bị phá vỡ tương thích.',
    mentalModel:
      'Hãy hình dung bạn đang nâng cấp ổ cắm điện trong nhà. Bản sửa lỗi nhỏ (`PATCH`, từ 1.0.0 lên 1.0.1) giống như việc người thợ vặn chặt lại ốc vít của ổ cắm: hoàn toàn giữ nguyên hình dạng và phích cắm của bạn vẫn cắm vừa vặn. Bản tính năng mới (`MINOR`, từ 1.0.0 lên 1.1.0) giống như việc người thợ gắn thêm một cổng sạc USB bên cạnh: bạn có thêm cổng sạc mới tiện lợi trong khi phích cắm cũ vẫn sử dụng bình thường. Còn bản phá vỡ tương thích (`MAJOR`, từ 1.0.0 lên 2.0.0) giống như việc đổi toàn bộ ổ cắm tròn sang ổ cắm ba chấu dẹt vuông: tất cả phích cắm cũ của bạn đều không thể cắm vừa nữa và bắt buộc phải mua đầu chuyển đổi mới.',
    diagram: `Quy tắc tăng số trong Semantic Versioning (MAJOR.MINOR.PATCH):
  v 2 . 4 . 1
    │   │   │
    │   │   └───► PATCH: Sửa lỗi (Bug fixes) - Tương thích ngược 100%
    │   │
    │   └───────► MINOR: Thêm tính năng mới (New features) - Tương thích ngược 100%
    │
    └───────────► MAJOR: Thay đổi phá vỡ tương thích (Breaking Changes) - Không tương thích ngược!`,
    example:
      'Nhóm phát triển một thư viện giao diện người dùng mã nguồn mở áp dụng chặt chẽ SemVer. Ban đầu, thư viện phát hành phiên bản `1.0.0`. Khi một kỹ sư sửa lỗi hiển thị nút bấm bị lệch trên trình duyệt Safari, nhóm tăng số và phát hành thẻ tag `v1.0.1` (tăng PATCH). Một tháng sau, nhóm bổ sung thêm một linh kiện Lịch chọn ngày mới mà không làm ảnh hưởng đến các linh kiện cũ, nhóm phát hành `v1.1.0` (tăng MINOR và reset PATCH về 0). Sau một năm, nhóm quyết định loại bỏ hỗ trợ các trình duyệt Internet Explorer cũ và đổi hoàn toàn định dạng thuộc tính props, nhóm phát hành `v2.0.0` (tăng MAJOR và reset MINOR, PATCH về 0) kèm theo tài liệu cảnh báo người dùng cần chuyển đổi mã nguồn.',
    commands: [
      'git tag -a v1.0.0 -m "Release v1.0.0 initial stable release"',
      'git tag -a v1.0.1 -m "Release v1.0.1: fix button safari bug"',
      'git tag -a v1.1.0 -m "Release v1.1.0: add datepicker component"',
      'git tag -a v2.0.0 -m "Release v2.0.0: breaking change drop legacy browsers"',
    ],
    explanation:
      '- `git tag -a v1.0.1`: Đánh dấu bản vá lỗi nhỏ tăng PATCH an toàn tuyệt đối cho người dùng.\n- `git tag -a v1.1.0`: Đánh dấu bản phát hành tính năng mới tăng MINOR tương thích ngược.\n- `git tag -a v2.0.0`: Đánh dấu phiên bản lớn tăng MAJOR có chứa thay đổi phá vỡ tương thích.',
    mistakes: [
      'Tăng số MAJOR cho những thay đổi nhỏ chỉ vì thấy phiên bản nghe oai hơn hoặc muốn làm tiếp thị.',
      'Đưa thay đổi gây phá vỡ tương thích ngược vào một bản phát hành chỉ tăng PATCH hoặc MINOR.',
      'Quên reset các con số phía sau về 0 khi tăng con số phía trước (ví dụ từ 1.2.5 lên 2.0.0 chứ không phải 2.2.5).',
    ],
    labSteps: [
      'Xác định loại phiên bản cần phát hành khi: sửa 2 lỗi bảo mật và thêm 1 API mới tương thích ngược.',
      'Gắn thẻ Annotated Tag tương ứng theo chuẩn SemVer trong kho lưu trữ Git của bạn.',
    ],
    hint: 'Nếu phân vân giữa MINOR và MAJOR, câu hỏi quyết định là: code của người dùng hiện tại có bị lỗi khi nâng cấp lên không?',
    validation: 'Hiểu rõ tại sao phiên bản 0.y.z được xem là giai đoạn thử nghiệm ban đầu nơi API có thể thay đổi bất cứ lúc nào.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về chuẩn định danh phiên bản Semantic Versioning.',
    challenge: 'Phân tích cách các ký tự mũ `^` (caret) và ngã `~` (tilde) trong package.json hoạt động dựa trên các nguyên tắc của SemVer.',
    summary: [
      'SemVer chuẩn hóa định dạng phiên bản theo cấu trúc MAJOR.MINOR.PATCH.',
      'PATCH tăng khi sửa lỗi, MINOR tăng khi thêm tính năng, MAJOR tăng khi phá vỡ tương thích.',
      'Cung cấp sự an tâm và khả năng tương thích dự đoán trước được cho toàn bộ hệ sinh thái phần mềm.',
    ],
    quiz: {
      id: 'quiz-06-11-semantic-versioning',
      title: 'Trắc nghiệm: Semantic Versioning',
      questions: [
        {
          id: 'q1',
          question: 'Khi bạn chỉ thực hiện sửa lỗi mã nguồn mà không thêm tính năng mới và không làm hỏng tương thích ngược thì con số nào tăng lên?',
          type: 'single',
          options: [
            { text: 'PATCH (ví dụ từ 1.0.0 lên 1.0.1)', correct: true },
            { text: 'MINOR (ví dụ từ 1.0.0 lên 1.1.0)', correct: false },
            { text: 'MAJOR (ví dụ từ 1.0.0 lên 2.0.0)', correct: false },
            { text: 'Không được tăng số nào cả', correct: false },
          ],
          explanation:
            'Chỉ số PATCH dành riêng cho các bản vá lỗi (bug fixes) bảo đảm an toàn và tương thích tuyệt đối cho người dùng.',
        },
        {
          id: 'q2',
          question: 'Khi một thư viện xóa bỏ hoàn toàn một hàm công khai mà khách hàng đang sử dụng, thư viện đó BẮT BUỘC phải tăng con số nào?',
          type: 'single',
          options: [
            { text: 'MAJOR vì đây là thay đổi phá vỡ tính tương thích ngược (Breaking Change)', correct: true },
            { text: 'Chỉ cần tăng PATCH để người dùng không chú ý', correct: false },
            { text: 'Tăng MINOR vì đã xóa bớt code cho nhẹ', correct: false },
            { text: 'Giữ nguyên phiên bản cũ', correct: false },
          ],
          explanation:
            'Bất kỳ thay đổi nào khiến mã nguồn của người dùng hiện tại bị lỗi khi nâng cấp đều bắt buộc phải tăng MAJOR theo chuẩn SemVer.',
        },
        {
          id: 'q3',
          question: 'Sau khi tăng chỉ số MINOR từ phiên bản `1.4.3`, số phiên bản mới chính xác sẽ là gì?',
          type: 'single',
          options: [
            { text: '1.5.0 (chỉ số PATCH được reset về 0)', correct: true },
            { text: '1.5.3 (giữ nguyên chỉ số PATCH cũ)', correct: false },
            { text: '2.0.0', correct: false },
            { text: '1.4.4', correct: false },
          ],
          explanation:
            'Theo đặc tả SemVer, khi một con số ở bậc cao hơn tăng lên, tất cả các con số ở bậc thấp hơn phía sau nó bắt buộc phải được reset về số 0.',
        },
        {
          id: 'q4',
          question: 'Các phiên bản có số MAJOR bằng 0 (ví dụ `0.3.2`) mang ý nghĩa quy ước gì trong SemVer?',
          type: 'single',
          options: [
            { text: 'Giai đoạn phát triển thử nghiệm ban đầu (Initial Development), API chưa ổn định và có thể thay đổi bất cứ lúc nào', correct: true },
            { text: 'Phiên bản hoàn hảo không bao giờ có lỗi', correct: false },
            { text: 'Phiên bản đã bị tác giả khai tử và không được dùng nữa', correct: false },
            { text: 'Phần mềm chỉ chạy được trên hệ điều hành 32-bit', correct: false },
          ],
          explanation:
            'Giai đoạn `0.x.x` dành cho các sản phẩm sơ khai đang hoàn thiện kiến trúc, không ràng buộc bởi quy tắc tương thích nghiêm ngặt của phiên bản ổn định 1.0.0.',
        },
      ],
    },
  },
  {
    id: '12-release-branch',
    moduleId: '06-team-workflows',
    title: 'Release Branch',
    duration: 30,
    xp: 95,
    keywords: ['release branch', 'nhanh phat hanh', 'feature freeze', 'dong bang tinh nang', 'kiem thu hoi quy', 'hardening sprint'],
    prerequisites: ['11-semantic-versioning'],
    objectives: [
      'Nắm vững mục đích và vòng đời chuẩn của nhánh phát hành (Release Branch) trong các quy trình phần mềm chuyên nghiệp.',
      'Áp dụng quy tắc Đóng băng tính năng (Feature Freeze): nghiêm cấm code tính năng mới, chỉ chấp nhận commit sửa lỗi và tài liệu.',
      'Thực hiện quy trình hợp nhất kép (Dual-merge): hợp nhất vào main để phát hành và hợp nhất ngược về develop để đồng bộ.',
      'Sử dụng Git Tag để niêm phong cột mốc phát hành chính thức sau khi nhánh release hoàn thành sứ mệnh.',
    ],
    definition:
      'Release Branch (Nhánh phát hành) là một nhánh tạm thời được tách ra từ nhánh tích hợp chính (như `develop`) nhằm mục đích chuẩn bị và ổn định hóa một bản phát hành sản phẩm chính thức. Khi một Release Branch được khởi tạo, dự án bước vào giai đoạn Đóng băng tính năng (Feature Freeze): toàn bộ việc phát triển chức năng mới cho bản phát hành này bị dừng lại, và đội ngũ kỹ sư cùng đội QA chỉ tập trung vào việc tìm lỗi, sửa lỗi hồi quy, tinh chỉnh hiệu năng và hoàn thiện tài liệu phát hành trước khi đưa ra thị trường.',
    why:
      'Trong các dự án quy mô lớn, nếu không có Release Branch, các lập trình viên sẽ liên tục đẩy mã nguồn mới vào nhánh chung. Đội ngũ kiểm thử (QA) sẽ không bao giờ có được một trạng thái mã nguồn tĩnh để kiểm thử toàn diện, bởi vì mỗi giờ lại có người sửa đổi logic. Release Branch tạo ra một không gian độc lập tĩnh lặng để đánh bóng chất lượng sản phẩm, trong khi phần còn lại của công ty vẫn có thể tiếp tục phát triển các tính năng cho phiên bản tiếp theo trên nhánh `develop` mà không làm phiền nhau.',
    mentalModel:
      'Hãy hình dung việc xuất bản một cuốn sách giáo khoa dày 500 trang. Nhánh `develop` là xưởng viết của tập thể các tác giả. Khi bản thảo hoàn thành, họ in một bản thử nghiệm gửi sang phòng Chế bản và Hiệu đính (`Release Branch`). Tại phòng này, các biên tập viên chỉ soi lỗi chính tả, căn chỉnh lề và sửa các câu chữ in sai mà không được phép viết thêm các chương sách mới toanh. Trong khi phòng hiệu đính đang làm việc, các tác giả ở xưởng vẫn có thể thoải mái viết các chương cho cuốn sách tập hai tiếp theo.',
    diagram: `Vòng đời của một Release Branch chuẩn mực:
develop: ──●───●───● (Tách release) ───────────────────────────● (Nhận dual-merge)
                   │                                           ▲
release/v2.1:      └───● (Fix bug) ───● (Cập nhật docs) ───────┤
                                                               │
main:    ──────────────────────────────────────────────────────┴──● (Gắn tag v2.1.0)
                                                                    (Deploy Prod)`,
    example:
      'Trước đợt phát hành phiên bản 3.0 của ứng dụng học tập, đội trưởng kỹ thuật tạo nhánh `release/v3.0.0` từ nhánh `develop`. Trong 4 ngày sau đó, cả đội tuân thủ nghiêm ngặt chính sách Feature Freeze. Khi chuyên viên QA phát hiện lỗi video không tự động phát trên trình duyệt Firefox, kỹ sư Huy thực hiện commit sửa lỗi trực tiếp trên nhánh `release/v3.0.0`. Khi tất cả 150 kịch bản kiểm thử đều đạt yêu cầu, nhánh release được hợp nhất vào `main` với cờ `--no-ff`, được gắn thẻ tag `v3.0.0` để kích hoạt dây chuyền đóng gói đưa lên máy chủ sản xuất, đồng thời được hợp nhất ngược lại vào `develop` để giữ lại bản sửa lỗi video Firefox.',
    commands: [
      'git switch -c release/v1.2.0 develop',
      'git commit -m "fix(video): resolve autoplay bug on firefox"',
      'git switch main && git merge --no-ff release/v1.2.0',
      'git tag -a v1.2.0 -m "Release v1.2.0 official"',
      'git switch develop && git merge --no-ff release/v1.2.0',
      'git branch -d release/v1.2.0',
    ],
    explanation:
      '- `git switch -c release/v1.2.0 develop`: Rẽ nhánh phát hành từ điểm tích hợp develop.\n- `git merge --no-ff`: Hợp nhất tạo merge commit bảo toàn nhánh vào main và develop.\n- `git tag -a`: Đánh dấu phiên bản phát hành chính thức.\n- `git branch -d`: Xóa nhánh release sau khi hoàn thành quy trình hợp nhất kép an toàn.',
    mistakes: [
      'Cho phép thành viên viết thêm tính năng mới toanh vào nhánh release đang trong giai đoạn đóng băng.',
      'Quên hợp nhất ngược nhánh release về develop: Khiến các lỗi đã sửa công phu bị biến mất ở phiên bản tiếp theo.',
      'Xóa nhánh release trước khi bảo đảm toàn bộ mã nguồn đã được hợp nhất đủ vào cả main và develop.',
    ],
    labSteps: [
      'Tạo nhánh `release/v1.0.0` từ nhánh `develop` trong kho lưu trữ mô phỏng.',
      'Thực hiện một commit sửa lỗi tài liệu trên nhánh release, sau đó thực hiện hợp nhất kép vào cả `main` và `develop`.',
    ],
    hint: 'Chỉ các commit sửa lỗi quan trọng (Bug fixes) và cập nhật số phiên bản mới được phép xuất hiện trên Release Branch.',
    validation: 'Cả hai nhánh main và develop đều sở hữu đầy đủ các commit sửa lỗi được thực hiện trên release branch.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về quy trình vận hành Release Branch.',
    challenge: 'Mô tả cách xử lý nếu trong quá trình hợp nhất ngược nhánh release về develop phát sinh xung đột mã nguồn lớn.',
    summary: [
      'Release Branch tạo ra vùng cách ly để ổn định hóa và kiểm thử hồi quy trước giờ phát hành.',
      'Chính sách Feature Freeze nghiêm cấm thêm tính năng mới, chỉ ưu tiên sửa lỗi và hoàn thiện bản build.',
      'Bắt buộc thực hiện quy trình hợp nhất kép vào cả main và develop để bảo toàn lịch sử sửa lỗi.',
    ],
    quiz: {
      id: 'quiz-06-12-release-branch',
      title: 'Trắc nghiệm: Release Branch',
      questions: [
        {
          id: 'q1',
          question: 'Mục đích chính cốt lõi của việc tạo ra nhánh Release Branch là gì?',
          type: 'single',
          options: [
            { text: 'Cô lập mã nguồn để đóng băng tính năng, kiểm thử toàn diện và sửa lỗi ổn định hóa trước khi xuất bản', correct: true },
            { text: 'Để các lập trình viên bắt đầu viết các tính năng thử nghiệm hoàn toàn mới', correct: false },
            { text: 'Để xóa toàn bộ cơ sở dữ liệu cũ của khách hàng', correct: false },
            { text: 'Để giảm bớt dung lượng của thư mục .git', correct: false },
          ],
          explanation:
            'Release Branch giúp tạo một môi trường tĩnh lặng cho QA kiểm thử hồi quy mà không bị xáo trộn bởi code mới từ các tính năng khác.',
        },
        {
          id: 'q2',
          question: 'Quy tắc "Feature Freeze" (Đóng băng tính năng) trên Release Branch quy định điều gì?',
          type: 'single',
          options: [
            { text: 'Nghiêm cấm thêm bất kỳ tính năng mới nào, chỉ chấp nhận các commit sửa lỗi và tinh chỉnh tài liệu', correct: true },
            { text: 'Tắt máy chủ không cho bất kỳ ai truy cập mã nguồn trong 1 tuần', correct: false },
            { text: 'Đóng băng tài khoản ngân hàng của công ty phần mềm', correct: false },
            { text: 'Chỉ cho phép lập trình viên làm việc trong phòng có máy lạnh thật lạnh', correct: false },
          ],
          explanation:
            'Đóng băng tính năng ngăn chặn nguy cơ đưa thêm các lỗi mới vào hệ thống ngay sát giờ phát hành sản phẩm.',
        },
        {
          id: 'q3',
          question: 'Sau khi một nhánh Release Branch hoàn tất kiểm thử, nó bắt buộc phải được hợp nhất vào những nhánh nào?',
          type: 'single',
          options: [
            { text: 'Hợp nhất vào nhánh main để phát hành và hợp nhất ngược về develop để đồng bộ bản sửa lỗi', correct: true },
            { text: 'Chỉ hợp nhất vào nhánh main rồi xóa ngay lập tức', correct: false },
            { text: 'Chỉ hợp nhất vào nhánh develop', correct: false },
            { text: 'Không được hợp nhất vào đâu cả', correct: false },
          ],
          explanation:
            'Hợp nhất kép (Dual-merge) bảo đảm rằng các bugfix quý giá phát hiện trong giai đoạn release sẽ không bị mất trong các sprint tương lai.',
        },
        {
          id: 'q4',
          question: 'Tại sao việc dùng cờ `--no-ff` (No Fast-Forward) lại được khuyến nghị mạnh mẽ khi merge Release Branch?',
          type: 'single',
          options: [
            { text: 'Để tạo một Merge Commit rõ ràng ghi nhận đầy đủ dấu vết lịch sử của đợt phát hành trên biểu đồ Git', correct: true },
            { text: 'Để ép Git phải xóa nhánh đó sau 10 giây', correct: false },
            { text: 'Để tăng tốc độ biên dịch mã nguồn của ngôn ngữ C++', correct: false },
            { text: 'Vì lệnh git không cho phép merge nếu thiếu cờ đó', correct: false },
          ],
          explanation:
            'Cờ `--no-ff` bảo toàn hình hài của nhánh release trong biểu đồ lịch sử, giúp việc tra cứu các mốc phát hành sau này cực kỳ trực quan.',
        },
        {
          id: 'q5',
          question: 'Ai là người nên có quyền quyết định cuối cùng phê duyệt cho phép một nhánh release được merge vào main?',
          type: 'single',
          options: [
            { text: 'Trưởng nhóm kỹ thuật (Tech Lead) hoặc người quản lý phát hành (Release Manager) sau khi có xác nhận từ QA', correct: true },
            { text: 'Bất kỳ thực tập sinh nào rảnh rỗi', correct: false },
            { text: 'Nhân viên bảo vệ tòa nhà văn phòng', correct: false },
            { text: 'Một thuật toán ngẫu nhiên trên mạng', correct: false },
          ],
          explanation:
            'Phát hành sản phẩm ra người dùng là quyết định quan trọng đòi hỏi sự thẩm định của người chịu trách nhiệm kỹ thuật cao nhất.',
        },
        {
          id: 'q6',
          question: 'Sau khi hợp nhất thành công Release Branch vào nhánh main, thao tác chuẩn tiếp theo không thể thiếu là gì?',
          type: 'single',
          options: [
            { text: 'Gắn thẻ Annotated Tag (ví dụ v1.2.0) có chữ ký hoặc thông điệp rõ ràng để đánh dấu cột mốc phiên bản', correct: true },
            { text: 'Xóa toàn bộ các tệp tin trong thư mục gốc của dự án', correct: false },
            { text: 'Reset máy tính cá nhân về cài đặt gốc', correct: false },
            { text: 'Tạo thêm 10 nhánh release rỗng để dự phòng', correct: false },
          ],
          explanation:
            'Git Tag đánh dấu vĩnh viễn trạng thái chính xác của commit phát hành, làm căn cứ truy cứu và kích hoạt pipeline triển khai sản phẩm.',
        },
      ],
    },
  },
  {
    id: '13-hotfix-workflow',
    moduleId: '06-team-workflows',
    title: 'Hotfix Workflow',
    duration: 30,
    xp: 95,
    keywords: ['hotfix workflow', 'va loi khan cap', 'production bug', 'emergency fix', 'hotfix dual merge', 'hotfix branch'],
    prerequisites: ['12-release-branch'],
    objectives: [
      'Hiểu rõ bản chất khẩn cấp và các tiêu chí phân loại một sự cố sản xuất (Production Incident) cần kích hoạt Hotfix.',
      'Nắm vững quy trình tách nhánh Hotfix trực tiếp từ commit bị lỗi trên nhánh sản phẩm (`main`).',
      'Thực hiện quy trình hợp nhất kép (Dual-merge) chuẩn xác cho Hotfix vào cả `main` và `develop` để tránh tái phát lỗi.',
      'Áp dụng quy tắc gắn thẻ phiên bản tăng PATCH (ví dụ v1.0.1) và cập nhật tài liệu khắc phục sự cố (Post-mortem).',
    ],
    definition:
      'Hotfix Workflow (Quy trình vá lỗi khẩn cấp) là cơ chế xử lý sự cố kỹ thuật đặc biệt trong Git nhằm phản ứng nhanh với các lỗi nghiêm trọng (Critical Bugs) phát sinh đột ngột trên môi trường sản xuất (Production) mà không thể chờ đến chu kỳ phát hành theo kế hoạch tiếp theo. Điểm khác biệt cốt tử của Hotfix là nó được rẽ nhánh trực tiếp từ phiên bản đang chạy lỗi trên nhánh `main`, thực hiện bản vá tối thiểu cần thiết, kiểm thử thần tốc và hợp nhất ngay lập tức vào `main` để deploy giải cứu hệ thống, sau đó được hợp nhất ngược về `develop`.',
    why:
      'Khi một lỗi nghiêm trọng xảy ra trên production (ví dụ khách hàng không thể bấm nút thanh toán, hoặc rò rỉ dữ liệu người dùng), mỗi phút trôi qua đều gây thiệt hại hàng triệu đồng và đánh mất uy tín doanh nghiệp. Bạn không thể lấy nhánh `develop` để sửa lỗi vì trên đó đang chứa hàng chục tính năng dang dở chưa kiểm thử. Nhánh Hotfix cho phép bạn phẫu thuật nội soi trực tiếp trên đúng commit đang chạy thực tế, chữa lành sự cố trong thời gian ngắn nhất mà không kéo theo bất kỳ đoạn code rủi ro nào khác.',
    mentalModel:
      'Hãy hình dung một con tàu ngầm đang làm nhiệm vụ dưới đáy đại dương (`main`). Đột nhiên một đường ống nước biển bị nứt và nước bắt đầu rò rỉ vào khoang máy. Thuyền trưởng không thể kéo con tàu về lại xưởng đóng tàu trên đất liền (`develop`) để chờ đợt đại tu vào tháng sau. Một đội thợ lặn cấp cứu mang theo bộ hàn đặc biệt (`hotfix branch`) tiến thẳng vào khoang máy, hàn kín vết nứt ngay tại chỗ để tàu tiếp tục hoạt động an toàn. Sau đó, họ gửi bản vẽ mối hàn về xưởng đóng tàu để các con tàu đang đóng không mắc lại lỗi tương tự.',
    diagram: `Quy trình phản ứng nhanh của Hotfix Workflow:
main:     v1.0.0 ────────────────────────────────────── v1.0.1 (Deploy Hotfix!)
             │                                            ▲
             └─► hotfix/fix-payment-leak ─► [Fix & Test] ─┤ (Dual-merge)
                                                          ▼
develop:  ──────●────────●────────●───────────────────────● (Nhận bản vá lỗi)`,
    example:
      'Vào lúc 2 giờ sáng, hệ thống cảnh báo tự động gửi tin nhắn khẩn: khách hàng tại Nhật Bản không thể hoàn tất thanh toán do lỗi múi giờ. Kỹ sư trực ca lập tức chuyển sang nhánh `main` mới nhất và tạo nhánh: `git switch -c hotfix/fix-japan-timezone main`. Kỹ sư sửa đúng 3 dòng mã bị lỗi chuyển đổi giờ UTC trong tệp `payment.js`, kiểm thử vượt qua bài test thanh toán. Kỹ sư đẩy code lên và mở PR khẩn cấp. Trưởng nhóm duyệt ngay, gộp code vào `main`, gắn thẻ tag `v1.0.1` và hệ thống CI tự động deploy bản vá chỉ sau 15 phút từ khi phát hiện. Cuối cùng, kỹ sư chuyển sang `develop` và gộp bản vá vào để bảo đảm phiên bản v1.1.0 sau này không bị lỗi lại.',
    commands: [
      'git switch -c hotfix/<ten-loi> main',
      'git commit -m "fix(security): patch sql injection vulnerability"',
      'git switch main && git merge --no-ff hotfix/<ten-loi>',
      'git tag -a v1.0.1 -m "Hotfix v1.0.1: security patch"',
      'git switch develop && git merge --no-ff hotfix/<ten-loi>',
      'git branch -d hotfix/<ten-loi>',
    ],
    explanation:
      '- `git switch -c hotfix/<tên-lỗi> main`: Bắt buộc rẽ nhánh trực tiếp từ nhánh sản xuất main.\n- `git tag -a v1.0.1`: Tăng chỉ số PATCH đánh dấu bản vá lỗi khẩn cấp.\n- Hợp nhất kép vào `main` và `develop`: Bảo đảm bản vá được triển khai ngay và không bị mất ở bản phát hành sau.',
    mistakes: [
      'Rẽ nhánh hotfix từ develop thay vì main: Đưa nhầm toàn bộ các tính năng dở dang chưa kiểm thử lên production.',
      'Tiện tay thêm các tính năng không liên quan vào nhánh hotfix: Vi phạm nguyên tắc bản vá tối thiểu, tăng rủi ro lỗi mới.',
      'Quên merge ngược hotfix về develop: Nguyên nhân phổ biến khiến lỗi cũ vừa sửa xong lại tái phát ở sprint sau.',
    ],
    labSteps: [
      'Mô phỏng sự cố khẩn cấp bằng cách tạo nhánh `hotfix/v1.0.1` xuất phát trực tiếp từ `main`.',
      'Thực hiện commit sửa lỗi, hợp nhất kép vào cả `main` và `develop`, sau đó gắn thẻ tag `v1.0.1`.',
    ],
    hint: 'Bản vá Hotfix phải là bản vá nhỏ nhất, an toàn nhất có thể để giải quyết triệt để sự cố mà không tạo tác dụng phụ.',
    validation: 'Phiên bản production được khôi phục trạng thái hoạt động bình thường trong thời gian tối thiểu.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về quy trình xử lý lỗi khẩn cấp Hotfix Workflow.',
    challenge: 'Trình bày cách xử lý nếu nhánh hotfix khi merge ngược vào develop gặp xung đột mã nguồn lớn do code develop đã bị cấu trúc lại.',
    summary: [
      'Hotfix Workflow là quy trình phản ứng nhanh xử lý sự cố nghiêm trọng trên môi trường sản xuất.',
      'Luôn luôn rẽ nhánh trực tiếp từ commit đang chạy thực tế trên nhánh main.',
      'Bắt buộc thực hiện hợp nhất kép vào cả main và develop để ngăn ngừa lỗi tái xuất hiện.',
    ],
    quiz: {
      id: 'quiz-06-13-hotfix-workflow',
      title: 'Trắc nghiệm: Hotfix Workflow',
      questions: [
        {
          id: 'q1',
          question: 'Nhánh Hotfix bắt buộc phải được rẽ nhánh xuất phát trực tiếp từ đâu để giải quyết sự cố sản xuất?',
          type: 'single',
          options: [
            { text: 'Trực tiếp từ nhánh main nơi phiên bản lỗi đang chạy thực tế trên production', correct: true },
            { text: 'Từ nhánh develop nơi chứa các tính năng mới nhất của sprint hiện tại', correct: false },
            { text: 'Từ một nhánh tính năng cá nhân của lập trình viên', correct: false },
            { text: 'Từ nhánh master của một kho lưu trữ mã nguồn mở khác', correct: false },
          ],
          explanation:
            'Tách từ `main` giúp bản vá độc lập hoàn toàn với các tính năng dở dang chưa qua kiểm duyệt đang nằm trên `develop`.',
        },
        {
          id: 'q2',
          question: 'Nguyên tắc vàng về phạm vi chỉnh sửa mã nguồn bên trong một nhánh Hotfix là gì?',
          type: 'single',
          options: [
            { text: 'Chỉ thực hiện thay đổi tối thiểu cần thiết để sửa dứt điểm lỗi nghiêm trọng, tuyệt đối không thêm tính năng mới', correct: true },
            { text: 'Nhân tiện viết lại toàn bộ kiến trúc dự án sang ngôn ngữ lập trình khác', correct: false },
            { text: 'Thêm thật nhiều tính năng mới để khách hàng cảm thấy vui vẻ hơn', correct: false },
            { text: 'Xóa toàn bộ các tệp tin cấu hình bảo mật', correct: false },
          ],
          explanation:
            'Bản vá càng nhỏ gọn thì rủi ro phát sinh lỗi phụ càng thấp, giúp việc kiểm thử và triển khai diễn ra nhanh nhất có thể.',
        },
        {
          id: 'q3',
          question: 'Điều gì sẽ xảy ra nếu một đội ngũ kỹ thuật quên không hợp nhất ngược nhánh Hotfix về nhánh develop?',
          type: 'single',
          options: [
            { text: 'Lỗi sản xuất vừa sửa thành công sẽ bị tái phát trở lại ở đợt phát hành sản phẩm tiếp theo', correct: true },
            { text: 'Máy chủ GitHub sẽ tự động khóa vĩnh viễn kho lưu trữ', correct: false },
            { text: 'Không có vấn đề gì xảy ra cả', correct: false },
            { text: 'Tất cả các commit trên nhánh develop sẽ bị xóa sạch', correct: false },
          ],
          explanation:
            'Nếu không merge về `develop`, nhánh `develop` vẫn giữ đoạn mã lỗi cũ và khi release phiên bản mới sẽ đè lại lỗi đó lên production.',
        },
        {
          id: 'q4',
          question: 'Theo chuẩn Semantic Versioning, bản phát hành sau khi áp dụng Hotfix thành công sẽ tăng chỉ số nào?',
          type: 'single',
          options: [
            { text: 'Chỉ số PATCH (ví dụ từ v2.3.1 lên v2.3.2)', correct: true },
            { text: 'Chỉ số MAJOR (ví dụ từ v2.3.1 lên v3.0.0)', correct: false },
            { text: 'Chỉ số MINOR (ví dụ từ v2.3.1 lên v2.4.0)', correct: false },
            { text: 'Không được phép thay đổi số phiên bản', correct: false },
          ],
          explanation:
            'Hotfix là bản sửa lỗi bảo đảm tính tương thích tuyệt đối nên chỉ số PATCH sẽ được tăng thêm một đơn vị.',
        },
      ],
    },
  },
  {
    id: '14-team-conflict-scenario',
    moduleId: '06-team-workflows',
    title: 'Team Conflict Scenario',
    duration: 35,
    xp: 110,
    keywords: ['team conflict scenario', 'kich ban xung dot nhom', 'giai quyet xung dot pull request', 'rebase onto main', 'conflict resolution strategy', 'team collaboration'],
    prerequisites: ['08-branch-protection-rules'],
    objectives: [
      'Phân tích nguyên nhân gốc rễ gây ra xung đột hợp nhất (Merge Conflict) trong môi trường làm việc nhóm thực tế.',
      'Làm chủ quy trình xử lý xung đột an toàn tại máy cục bộ (Local Resolution) trước khi cập nhật lại Pull Request.',
      'Sử dụng kỹ thuật `git fetch` và `git rebase origin/main` để đưa nhánh tính năng lên đầu lịch sử mới nhất.',
      'Giao tiếp hiệu quả và phối hợp nhịp nhàng với đồng nghiệp khi gặp xung đột logic kinh doanh phức tạp.',
    ],
    definition:
      'Team Conflict Scenario (Kịch bản giải quyết xung đột nhóm) là tình huống thực chiến kinh điển xảy ra khi hai hoặc nhiều lập trình viên cùng chỉnh sửa trên các vùng mã nguồn trùng lặp hoặc phụ thuộc lẫn nhau trên các nhánh riêng biệt, và một người đã hợp nhất thành công vào nhánh chính trước. Khi người thứ hai cố gắng mở hoặc hợp nhất Pull Request, hệ thống Git sẽ từ chối tự động gộp và thông báo xung đột, đòi hỏi người lập trình viên phải chủ động kéo mã nguồn mới nhất về máy cá nhân để đối soát và giải quyết mâu thuẫn.',
    why:
      'Xung đột mã nguồn không phải là lỗi của hệ thống, mà là hệ quả tất yếu và hoàn toàn bình thường trong quá trình cộng tác phát triển phần mềm hiện đại. Một kỹ sư chuyên nghiệp không bao giờ hoảng sợ hay đổ lỗi cho đồng nghiệp khi gặp conflict; thay vào đó, họ nắm vững quy trình xử lý xung đột bài bản: giữ bình tĩnh, trao đổi trực tiếp với tác giả đoạn code liên quan để hiểu rõ ngữ cảnh, và giải quyết xung đột một cách minh bạch, an toàn trên máy cục bộ.',
    mentalModel:
      'Hãy hình dung hai kiến trúc sư cùng thiết kế nội thất cho một căn phòng khách. Kiến trúc sư A muốn đặt một chiếc đàn piano ở góc phòng và bản thiết kế của anh ta đã được chủ nhà duyệt trước (`merged into main`). Kiến trúc sư B không biết điều đó và vừa gửi bản vẽ đề xuất đặt một giá sách lớn đúng vào góc phòng đó (`Pull Request conflict`). Kiến trúc sư B không thể tự ý ném chiếc đàn piano đi. Anh ta phải mang bản vẽ mới nhất về bàn làm việc, gọi điện trao đổi với kiến trúc sư A để thống nhất dời giá sách sang góc khác hoặc kết hợp hài hòa cả hai món đồ.',
    diagram: `Kịch bản xung đột nhóm và cách giải quyết cục bộ:
main:      C1 ──────── C2 (Tính năng của Dev A được merge trước!)
            │           ▲
            │           │ (Git từ chối merge do xung đột!)
feat/devB:  └── C3 ─────┘

Các bước giải cứu chuẩn mực của Dev B:
1. git fetch origin
2. git rebase origin/main (hoặc git merge origin/main)
3. Mở VS Code giải quyết Conflict ──► git add <files>
4. git rebase --continue
5. git push --force-with-lease origin feat/devB ──► PR hết xung đột!`,
    example:
      'Kỹ sư Tuấn đang làm nhánh `feat/cart-discount` thì nhận thấy nút Merge trên Pull Request của mình bị chuyển sang màu xám với dòng chữ "This branch has conflicts that must be resolved". Tuấn kiểm tra lịch sử và thấy kỹ sư Lan vừa merge một nhánh sửa đổi cách tính thuế trong tệp `pricing.ts`. Tuấn không bấm sửa trực tiếp trên giao diện web GitHub vì rất dễ sót lỗi. Thay vào đó, trên terminal máy mình, Tuấn chạy `git fetch origin` rồi `git rebase origin/main`. Terminal tạm dừng và báo conflict tại hàm `calculateTotal`. Tuấn mở VS Code, sang bàn làm việc của Lan để trao đổi nhanh trong 2 phút về thứ tự áp dụng giảm giá trước hay tính thuế trước. Sau khi thống nhất logic, Tuấn lưu code, chạy `git add pricing.ts` và `git rebase --continue`. Cuối cùng Tuấn gõ `git push --force-with-lease` và Pull Request của Tuấn xanh trở lại.',
    commands: [
      'git fetch origin',
      'git rebase origin/main',
      'git status',
      'git add <tệp-đã-sửa>',
      'git rebase --continue',
      'git push --force-with-lease origin <tên-nhánh>',
    ],
    explanation:
      '- `git fetch origin`: Tải toàn bộ các commit mới nhất từ máy chủ về máy mà không làm xáo trộn working tree.\n- `git rebase origin/main`: Đặt lại nền tảng nhánh của bạn lên trên commit mới nhất của nhánh chính.\n- `git push --force-with-lease`: Cập nhật nhánh remote an toàn tuyệt đối, chỉ cho phép force push nếu không có ai khác đẩy code mới lên nhánh đó.',
    mistakes: [
      'Tự ý xóa code của đồng nghiệp khi giải quyết xung đột mà không hề trao đổi hay hiểu rõ mục đích của đoạn code đó.',
      'Giải quyết các xung đột lớn phức tạp trực tiếp trên trình soạn thảo web của GitHub: Dễ gây lỗi cú pháp và không thể chạy kiểm thử.',
      'Sử dụng `git push --force` thông thường thay vì `--force-with-lease`: Tiềm ẩn nguy cơ vô tình ghi đè commit của đồng nghiệp cùng làm chung nhánh.',
    ],
    labSteps: [
      'Tạo kịch bản xung đột giữa hai nhánh cùng sửa một dòng trong tệp `index.html`.',
      'Thực hiện lệnh `git fetch` và `git rebase origin/main` để giải quyết mâu thuẫn trên VS Code.',
    ],
    hint: 'Giao tiếp giữa con người với con người luôn là công cụ giải quyết xung đột mã nguồn hiệu quả nhất.',
    validation: 'Pull Request trên GitHub tự động chuyển sang trạng thái sẵn sàng hợp nhất mà không còn bất kỳ xung đột nào.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về kỹ năng giải quyết xung đột nhóm trong Git.',
    challenge: 'So sánh ưu nhược điểm giữa việc dùng `git merge main` và `git rebase origin/main` khi giải quyết xung đột cho một nhánh tính năng.',
    summary: [
      'Xung đột mã nguồn trong làm việc nhóm là điều hoàn toàn tự nhiên và bình thường.',
      'Luôn ưu tiên kéo mã nguồn mới về máy cá nhân và giải quyết xung đột cục bộ kèm chạy kiểm thử.',
      'Sử dụng `git push --force-with-lease` để cập nhật lại nhánh tính năng sau khi rebase giải quyết xung đột an toàn.',
    ],
    quiz: {
      id: 'quiz-06-14-team-conflict-scenario',
      title: 'Trắc nghiệm: Kịch bản xung đột nhóm',
      questions: [
        {
          id: 'q1',
          question: 'Nguyên nhân trực tiếp dẫn đến việc một Pull Request bị báo lỗi "Merge conflict" trên GitHub là gì?',
          type: 'single',
          options: [
            { text: 'Nhánh chính đã được cập nhật thêm các commit mới sửa đổi cùng vùng mã nguồn với nhánh của bạn', correct: true },
            { text: 'Tài khoản GitHub của bạn đã hết hạn sử dụng', correct: false },
            { text: 'Máy tính của bạn bị mất kết nối mạng Internet', correct: false },
            { text: 'Tên nhánh của bạn có chứa quá nhiều ký tự chữ cái', correct: false },
          ],
          explanation:
            'Xung đột phát sinh khi Git không thể tự động quyết định xem nên giữ lại đoạn mã nào giữa nhánh của bạn và nhánh chính vừa được cập nhật.',
        },
        {
          id: 'q2',
          question: 'Hành động đầu tiên và chuẩn mực nhất bạn nên làm khi gặp xung đột logic nghiệp vụ phức tạp với code của đồng nghiệp là gì?',
          type: 'single',
          options: [
            { text: 'Chủ động trao đổi trực tiếp với đồng nghiệp đã viết đoạn code đó để cùng thống nhất giải pháp kết hợp chuẩn xác', correct: true },
            { text: 'Tự ý xóa sạch toàn bộ đoạn mã của đồng nghiệp để code của mình chạy được', correct: false },
            { text: 'Đóng máy tính đi về và hy vọng sáng mai xung đột sẽ tự biến mất', correct: false },
            { text: 'Tạo tài khoản GitHub mới và nộp đơn xin nghỉ việc', correct: false },
          ],
          explanation:
            'Giao tiếp trực tiếp giúp làm sáng tỏ ngữ cảnh kinh doanh và bảo đảm việc ghép nối logic không làm hỏng tính năng của cả hai bên.',
        },
        {
          id: 'q3',
          question: 'Tại sao việc giải quyết các xung đột lớn trực tiếp trên giao diện web của GitHub lại bị xem là tiềm ẩn nhiều rủi ro?',
          type: 'single',
          options: [
            { text: 'Vì bạn không thể chạy các bài kiểm thử tự động (Unit Test / Build) trên máy tính để xác thực mã nguồn có hoạt động đúng hay không', correct: true },
            { text: 'Vì GitHub sẽ tính thêm phí dịch vụ mỗi lần bấm sửa trên web', correct: false },
            { text: 'Vì giao diện web của GitHub không hỗ trợ màn hình màu', correct: false },
            { text: 'Vì việc đó vi phạm luật pháp quốc tế', correct: false },
          ],
          explanation:
            'Giải quyết xung đột trên máy cá nhân cho phép bạn biên dịch, chạy thử ứng dụng và kiểm tra kỹ lưỡng trước khi đưa lên máy chủ.',
        },
        {
          id: 'q4',
          question: 'Cờ `--force-with-lease` trong lệnh git push an toàn vượt trội hơn cờ `--force` truyền thống ở điểm nào?',
          type: 'single',
          options: [
            { text: 'Nó sẽ từ chối ghi đè nếu phát hiện có người khác vừa đẩy thêm commit mới lên nhánh từ xa trong lúc bạn đang rebase', correct: true },
            { text: 'Nó tự động mã hóa dữ liệu gửi qua mạng bằng thuật toán quân sự', correct: false },
            { text: 'Nó giúp lệnh push chạy nhanh hơn gấp 10 lần', correct: false },
            { text: 'Nó không yêu cầu bạn phải nhập mật khẩu tài khoản', correct: false },
          ],
          explanation:
            'Cờ `--force-with-lease` kiểm tra xem nhánh remote có đúng ở trạng thái bạn đã biết hay không, ngăn chặn việc vô tình xóa mất commit của đồng nghiệp.',
        },
        {
          id: 'q5',
          question: 'Sau khi giải quyết xong các điểm mốc xung đột trong tệp tin, câu lệnh nào được dùng để xác nhận đã xử lý xong tệp đó trong quá trình rebase?',
          type: 'single',
          options: [
            { text: 'git add <tên-tệp>', correct: true },
            { text: 'git commit -m "done"', correct: false },
            { text: 'git push origin main', correct: false },
            { text: 'git checkout --force', correct: false },
          ],
          explanation:
            'Lệnh `git add` đưa tệp đã xử lý xung đột vào Staging Area để chuẩn bị cho bước `git rebase --continue`.',
        },
        {
          id: 'q6',
          question: 'Lệnh nào sau đây cho phép bạn hủy bỏ toàn bộ quá trình rebase giải quyết xung đột và quay về trạng thái an toàn ban đầu?',
          type: 'single',
          options: [
            { text: 'git rebase --abort', correct: true },
            { text: 'git rebase --skip', correct: false },
            { text: 'git rebase --undo', correct: false },
            { text: 'git reset --delete', correct: false },
          ],
          explanation:
            'Cờ `--abort` là chiếc phao cứu sinh đưa nhánh quay trở về chính xác trạng thái trước khi bạn bắt đầu câu lệnh rebase.',
        },
      ],
    },
  },
  {
    id: '15-professional-team-project',
    moduleId: '06-team-workflows',
    title: 'Professional Team Project',
    duration: 50,
    xp: 250,
    keywords: ['professional team project', 'du an nhom chuyen nghiep', 'capstone level 6', 'branch protection simulation', 'codeowners review', 'tong hop level 6'],
    prerequisites: ['13-hotfix-workflow', '14-team-conflict-scenario'],
    objectives: [
      'Tổng hợp toàn bộ các kỹ năng và kiến thức đã học trong Level 6 vào một dự án mô phỏng thực chiến quy mô doanh nghiệp.',
      'Thiết lập hoàn chỉnh cấu trúc dự án chuẩn mực: Protected Branch, Branch Protection Rules, tệp CODEOWNERS và mẫu PR Template.',
      'Vận hành trơn tru quy trình Feature Branch kết hợp Conventional Commits và Semantic Versioning.',
      'Xử lý thành công tình huống khẩn cấp Hotfix trên môi trường sản xuất song song với việc phát triển tính năng mới.',
    ],
    definition:
      'Professional Team Project (Dự án nhóm chuyên nghiệp) là bài tập tổng hợp thực chiến đỉnh cao khép lại Level 6: Team Workflows. Trong thử thách này, bạn sẽ đóng vai trò Kỹ sư trưởng kiêm Trưởng nhóm kỹ thuật (Lead Engineer) của một nền tảng thương mại điện tử hiện đại. Nhiệm vụ của bạn là kiến thiết toàn bộ hạ tầng quy trình cộng tác từ con số không: ban hành quy ước phân nhánh, thiết lập hàng rào bảo vệ nhánh, cấu hình phân quyền tệp CODEOWNERS, chỉ đạo giải quyết xung đột mã nguồn và điều phối phát hành các phiên bản phần mềm theo chuẩn SemVer.',
    why:
      'Lý thuyết về các quy trình sẽ mãi chỉ là lý thuyết nếu bạn chưa từng tự tay trải nghiệm cảm giác điều phối một luồng công việc đa tầng phức tạp dưới áp lực thời gian thực tế. Bài tập lớn này được thiết kế để rèn luyện bản lĩnh nghề nghiệp, giúp bạn tự tin bước vào bất kỳ tập đoàn công nghệ lớn nào trên thế giới và hòa nhập ngay lập tức vào guồng quay phát triển phần mềm chuẩn mực quốc tế.',
    mentalModel:
      'Hãy hình dung bạn là một vị tổng công trình sư đang điều hành việc xây dựng một tòa nhà chọc trời 80 tầng. Bạn không thể chỉ tự mình cầm bay đi xây từng viên gạch. Bạn phải thiết kế bản vẽ quy hoạch phân khu (`Branching Strategy`), lắp đặt giàn giáo an toàn và lưới bảo vệ chống rơi vãi (`Branch Protection`), chỉ định rõ ràng kỹ sư chịu trách nhiệm từng tầng lầu (`CODEOWNERS`), ban hành quy chuẩn nghiệm thu vật liệu (`Conventional Commits`) và sẵn sàng phương án kích hoạt còi báo động cứu hỏa xử lý sự cố bất ngờ (`Hotfix Workflow`).',
    diagram: `Kiến trúc quy trình tổng hợp của Professional Team Project:
Repository Settings:
├── Protected Branch: main (Require 1 Approval, Require CI Pass, Require Linear History)
├── .github/CODEOWNERS (Phân quyền @frontend, @backend, @devops)
└── .github/PULL_REQUEST_TEMPLATE.md (Chuẩn hóa nội dung review)

Vòng lặp vận hành liên hoàn:
Feature Request ──► feat/* ──► Conventional Commits ──► PR ──► CODEOWNERS Review ──► CI Pass ──► Squash & Merge
                                                                                                        │
Incident Alert  ──► hotfix/* ──► Fast Patch ─────────► Dual Merge (main & develop) ────────────────────┘`,
    example:
      'Trong bài tập lớn mô phỏng, học viên khởi tạo kho lưu trữ `ecommerce-platform`. Đầu tiên, học viên thiết lập tệp `.github/CODEOWNERS` phân chia quyền sở hữu cho các thư mục `api/` và `web/`. Tiếp theo, học viên cấu hình chính sách bảo vệ nhánh `main`: cấm push trực tiếp, bắt buộc có ít nhất 1 lượt review và bài kiểm tra CI phải báo xanh. Sau đó, học viên tạo nhánh `feat/cart-checkout`, viết các commit theo đúng chuẩn `feat(cart): add payment gateway`, mở PR và đóng vai reviewer để kiểm duyệt. Tiếp đó, hệ thống kích hoạt kịch bản lỗi khẩn cấp trên production, học viên bình tĩnh tạo nhánh `hotfix/v1.0.1`, vá lỗi, thực hiện quy trình hợp nhất kép vào cả `main` lẫn `develop` và gắn thẻ tag `v1.0.1`. Cuối cùng, học viên kích hoạt công cụ tự động sinh tệp `CHANGELOG.md` hoàn chỉnh và kết thúc bài thi với điểm số tuyệt đối.',
    commands: [
      'git tag -a v1.0.0 -m "Release v1.0.0 initial baseline"',
      'git switch -c feat/order-service',
      'git commit -m "feat(order): implement order placement logic"',
      'git switch -c hotfix/v1.0.1 main',
      'git commit -m "fix(order): prevent duplicate checkout charges"',
    ],
    explanation:
      '- `git tag -a v1.0.0`: Tạo cột mốc phiên bản gốc ổn định cho hệ thống thương mại điện tử.\n- `feat(order): <mô-tả>`: Commit tính năng mới chuẩn mực theo cú pháp Conventional Commits.\n- `hotfix/v1.0.1`: Rẽ nhánh giải cứu sản xuất trực tiếp từ main và vá lỗi khẩn cấp.',
    mistakes: [
      'Bỏ qua bước cấu hình CODEOWNERS và Branch Protection trước khi cho thành viên vào phát triển.',
      'Viết các commit message không tuân thủ chuẩn Conventional Commits làm hỏng quy trình sinh changelog.',
      'Quên đồng bộ bản vá hotfix về nhánh phát triển khiến nhánh develop bị lạc hậu mã nguồn.',
    ],
    labSteps: [
      'Khởi tạo dự án mẫu hoàn chỉnh với tệp `.github/CODEOWNERS` và quy tắc Branch Protection.',
      'Thực hiện toàn bộ chuỗi quy trình từ tạo tính năng mới, mở PR, xử lý một sự cố hotfix giả lập và gắn thẻ phát hành SemVer.',
    ],
    hint: 'Hãy tưởng tượng bạn đang điều hành một đội ngũ 50 kỹ sư: sự rõ ràng và kỷ luật trong quy trình là chìa khóa duy nhất để dự án không rơi vào hỗn loạn.',
    validation: 'Toàn bộ lịch sử commit, các thẻ tag SemVer và cây phân nhánh đều sạch đẹp, không có commit rác hay xung đột tồn đọng.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây để tổng kết toàn diện kiến thức của Level 6.',
    challenge: 'Xây dựng một tệp Pull Request Template chuẩn hóa (.github/pull_request_template.md) có danh sách kiểm tra an toàn cho toàn bộ dự án.',
    summary: [
      'Level 6 trang bị toàn diện các tư duy, kỹ năng và quy chuẩn cộng tác nhóm chuyên nghiệp đỉnh cao.',
      'Sự kết hợp giữa Protected Branch, CODEOWNERS, Conventional Commits và SemVer tạo nên bộ khung kỹ thuật bất khả chiến bại.',
      'Bạn đã sẵn sàng tự tin đảm nhận vai trò kỹ sư phần mềm chuyên nghiệp trong bất kỳ môi trường công nghệ hiện đại nào.',
    ],
    quiz: {
      id: 'quiz-06-15-professional-team-project',
      title: 'Trắc nghiệm: Dự án nhóm chuyên nghiệp',
      questions: [
        {
          id: 'q1',
          question: 'Bộ 3 trụ cột kỹ thuật nào sau đây kết hợp với nhau tạo nên nền tảng quản trị mã nguồn vững chắc nhất cho một dự án chuyên nghiệp?',
          type: 'single',
          options: [
            { text: 'Protected Branch Rules, tệp phân quyền CODEOWNERS và chuẩn thông điệp Conventional Commits', correct: true },
            { text: 'Tắt kết nối Internet, cấm commit mã nguồn và xóa thư mục .git', correct: false },
            { text: 'Chỉ sử dụng duy nhất một nhánh main và không bao giờ mở Pull Request', correct: false },
            { text: 'Gửi mã nguồn qua Zalo và lưu trữ dự án trên USB', correct: false },
          ],
          explanation:
            'Ba công cụ này bảo vệ an toàn cho nhánh chính, tự động hóa người kiểm duyệt và chuẩn hóa lịch sử phát triển của toàn đội ngũ.',
        },
        {
          id: 'q2',
          question: 'Khi một dự án áp dụng song song cả Feature Branch và Hotfix Workflow, điều gì bảo đảm không bị mất mã nguồn sửa lỗi?',
          type: 'single',
          options: [
            { text: 'Quy trình hợp nhất kép (Dual-merge) đưa bản vá của nhánh hotfix vào cả nhánh main và nhánh develop', correct: true },
            { text: 'Tự động sao lưu mã nguồn ra đĩa mềm 1.44MB', correct: false },
            { text: 'Yêu cầu lập trình viên học thuộc lòng toàn bộ các dòng mã vừa viết', correct: false },
            { text: 'Không bao giờ được phép tắt máy tính tại văn phòng', correct: false },
          ],
          explanation:
            'Hợp nhất kép là cơ chế then chốt bảo đảm các bản sửa lỗi khẩn cấp trên production luôn có mặt trong các phiên bản tương lai trên develop.',
        },
        {
          id: 'q3',
          question: 'Vai trò lớn nhất của việc thiết lập tệp mẫu Pull Request Template (`.github/pull_request_template.md`) là gì?',
          type: 'single',
          options: [
            { text: 'Nhắc nhở tác giả cung cấp đầy đủ thông tin mô tả, bằng chứng kiểm thử và danh sách kiểm tra an toàn trước khi nhờ đồng nghiệp review', correct: true },
            { text: 'Tự động gửi hóa đơn thu tiền người xem Pull Request', correct: false },
            { text: 'Chặn không cho phép bất kỳ ai gửi bình luận phản hồi', correct: false },
            { text: 'Tự động dịch mã nguồn sang ngôn ngữ tiếng Pháp', correct: false },
          ],
          explanation:
            'Mẫu PR chuẩn hóa giúp nâng cao chất lượng mô tả công việc, giúp người review nắm bắt ngữ cảnh nhanh chóng và không bỏ sót các bước kiểm tra quan trọng.',
        },
        {
          id: 'q4',
          question: 'Chúc mừng bạn đã hoàn thành xuất sắc Level 6: Team Workflows! Năng lực cốt lõi lớn nhất bạn đã đạt được là gì?',
          type: 'single',
          options: [
            { text: 'Làm chủ toàn diện các mô hình quy trình phân nhánh, kiểm soát an ninh mã nguồn và tự tin cộng tác trong các đội ngũ công nghệ quy mô lớn', correct: true },
            { text: 'Chỉ biết gõ duy nhất một câu lệnh git status', correct: false },
            { text: 'Không còn muốn làm việc với bất kỳ lập trình viên nào khác', correct: false },
            { text: 'Chỉ thích lập trình một mình không theo quy chuẩn nào', correct: false },
          ],
          explanation:
            'Bạn đã hoàn thiện đầy đủ tư duy và kỹ năng của một kỹ sư Git chuyên nghiệp, sẵn sàng đóng góp xuất sắc vào các dự án phần mềm thực tế!',
        },
        {
          id: 'q5',
          question: 'Trong quy trình CI/CD chuyên nghiệp, công cụ nào sau đây thường được dùng để tự động chặn các commit không tuân thủ Conventional Commits ngay tại máy cá nhân?',
          type: 'single',
          options: [
            { text: 'Git Hook (như Husky kết hợp commitlint) chạy kiểm tra định dạng thông điệp trước khi commit được tạo', correct: true },
            { text: 'Chương trình diệt virus Windows Defender', correct: false },
            { text: 'Trình duyệt web Google Chrome', correct: false },
            { text: 'Phần mềm nghe nhạc Spotify', correct: false },
          ],
          explanation:
            'Husky và commitlint kiểm tra cú pháp commit ngay ở bước commit-msg hook, ngăn chặn thông điệp sai chuẩn trước khi được đẩy lên remote.',
        },
        {
          id: 'q6',
          question: 'Khi vận hành dự án nhóm với hàng chục lập trình viên, chiến lược squash merge khi gộp Pull Request mang lại lợi ích gì cho nhánh main?',
          type: 'single',
          options: [
            { text: 'Nén toàn bộ các commit nhỏ thử nghiệm trên nhánh tính năng thành duy nhất 1 commit sạch đẹp trên nhánh main', correct: true },
            { text: 'Tự động xóa toàn bộ mã nguồn của dự án', correct: false },
            { text: 'Nhân đôi số lượng commit trên nhánh chính lên gấp mười lần', correct: false },
            { text: 'Làm chậm tốc độ tải trang web của dự án', correct: false },
          ],
          explanation:
            'Squash merge giúp nhánh chính có lịch sử thẳng tắp, mỗi commit đại diện cho một tính năng hoàn chỉnh, cực kỳ dễ tra cứu và revert khi cần thiết.',
        },
      ],
    },
  },
];
