import { LessonAuthorData } from './types';

export const LEVEL_6A_LESSONS: LessonAuthorData[] = [
  {
    id: '01-why-team-workflow',
    moduleId: '06-team-workflows',
    title: 'Vì sao team cần workflow?',
    duration: 20,
    xp: 70,
    keywords: ['team workflow', 'quy trinh nhom', 'quy uoc git', 'git branch strategy', 'hop tac phat trien', 'chat luong ma nguon'],
    prerequisites: ['22-advanced-git-challenge'],
    objectives: [
      'Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.',
      'Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.',
      'Nắm bắt các lợi ích cốt lõi của một Git Workflow chuẩn: giảm xung đột, bảo đảm chất lượng, tự động hóa phát hành.',
      'Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại.',
    ],
    definition:
      'Team Workflow (Quy trình làm việc nhóm trong Git) là một tập hợp các quy tắc, thỏa thuận và quy ước có cấu trúc rõ ràng về cách các thành viên trong một dự án tương tác với kho lưu trữ mã nguồn chung. Nó định nghĩa cụ thể chiến lược phân nhánh (Branching Strategy), quy chuẩn đặt tên commit, quy trình kiểm duyệt mã nguồn (Code Review), tiêu chí hợp nhất (Merge Criteria) và cách thức phát hành sản phẩm. Thiếu đi workflow, Git chỉ là một công cụ lưu trữ dữ liệu hỗn loạn; có workflow chuẩn mực, Git trở thành xương sống vận hành nhịp nhàng của cả tổ chức công nghệ.',
    why:
      'Khi bạn làm việc một mình, bạn có toàn quyền commit thẳng vào nhánh main, sửa lỗi bất cứ lúc nào và tự quyết định khi nào sản phẩm sẵn sàng. Nhưng khi quy mô dự án tăng lên từ 5, 10 đến hàng trăm kỹ sư cùng đồng thời phát triển trên một codebase, sự tự do không kiểm soát sẽ nhanh chóng biến thành cơn ác mộng: mã nguồn bị ghi đè lẫn nhau, các tính năng chưa hoàn thiện bị đưa nhầm lên production, xung đột code xuất hiện liên tục và không ai chịu trách nhiệm khi hệ thống gặp sự cố.',
    mentalModel:
      'Hãy hình dung hệ thống giao thông trong một thành phố hiện đại. Nếu trên đường chỉ có duy nhất một chiếc xe của bạn chạy giữa đêm khuya, bạn có thể rẽ trái, rẽ phải hoặc dừng lại tùy ý mà không gây tai nạn. Nhưng khi có hàng ngàn chiếc xe cùng lưu thông vào giờ cao điểm, xã hội bắt buộc phải có đèn tín hiệu giao thông, làn đường riêng, biển báo giới hạn tốc độ và quy tắc nhường đường. Git Workflow chính là luật giao thông giúp dòng chảy mã nguồn của hàng chục kỹ sư lưu thông trơn tru mà không xảy ra va chạm hay tắc nghẽn thảm khốc.',
    diagram: `Sự khác biệt giữa phát triển tự do và có Git Workflow chuẩn mực:
TỰ DO (CHAOS):
Dev A ──push direct──► [main branch] ◄──push direct── Dev B (Ghi đè, xung đột, vỡ app)
                               ▲
Dev C ──────push code lỗi──────┘

CÓ WORKFLOW (ORDER):
Dev A ──► [feat/login] ──► PR Review ──┐
Dev B ──► [feat/cart]  ──► PR Review ──┼──► [Automated CI Test] ──► [main branch (Protected)]
Dev C ──► [fix/typo]   ──► PR Review ──┘`,
    example:
      'Tại một công ty khởi nghiệp công nghệ, ban đầu ba kỹ sư cùng commit trực tiếp vào nhánh `main` mà không theo bất kỳ quy chuẩn nào. Vào một buổi chiều trước đợt khuyến mãi lớn, kỹ sư Hoàng đẩy một đoạn code đang dở dang lên nhánh chính khiến tính năng đăng nhập bị tê liệt toàn bộ. Đồng thời, kỹ sư Mai vô tình force push làm mất sạch phần mã nguồn thanh toán vừa viết xong của kỹ sư Tuấn. Cả nhóm mất trọn một đêm trắng trong hoảng loạn để tìm lại code và giải quyết xung đột. Sau sự cố nhớ đời đó, nhóm đã ngồi lại cùng nhau thiết lập một quy trình làm việc chuẩn mực: cấm push trực tiếp vào main, mọi tính năng đều phải tạo nhánh riêng và bắt buộc phải qua bước kiểm duyệt mã nguồn cẩn thận.',
    commands: [
      'git status',
      'git branch -a',
      'git log --oneline --graph',
    ],
    explanation:
      '- `git status`: Kiểm tra tình trạng nhánh làm việc và các tệp tin trước khi bắt đầu quy trình.\n- `git branch -a`: Liệt kê toàn bộ các nhánh cục bộ và nhánh trên máy chủ từ xa để nắm bắt bức tranh tổng quan.\n- `git log --oneline --graph`: Hiển thị sơ đồ trực quan các nhánh và commit giúp theo dõi tiến độ tích hợp.',
    mistakes: [
      'Cho phép thành viên commit và push trực tiếp vào nhánh sản phẩm chính main hoặc production.',
      'Thiết lập quy trình quá rườm rà, cứng nhắc không phù hợp với quy mô thực tế và tốc độ của dự án.',
      'Không tổ chức hướng dẫn, phổ biến và giám sát việc tuân thủ quy ước nhóm một cách đồng bộ.',
    ],
    labSteps: [
      'Thảo luận và liệt kê 3 rủi ro lớn nhất nếu một nhóm 10 lập trình viên cùng push thẳng vào main.',
      'Sử dụng lệnh `git branch -a` và `git log --graph` để quan sát cấu trúc nhánh trong một kho lưu trữ mẫu.',
    ],
    hint: 'Một workflow tốt là workflow cân bằng giữa tính an toàn bảo vệ mã nguồn và tốc độ phát triển của nhóm.',
    validation: 'Hiểu rõ tại sao các tổ chức công nghệ chuyên nghiệp luôn cấm commit trực tiếp lên main.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về tầm quan trọng của Git Workflow.',
    challenge: 'Phân tích các tổn thất về chi phí tài chính và uy tín khi một đoạn mã lỗi bị đưa nhầm lên production do thiếu quy trình review.',
    summary: [
      'Team Workflow là nền tảng sống còn bảo đảm sự phối hợp nhịp nhàng giữa nhiều kỹ sư trên một codebase.',
      'Quy trình chuẩn giúp loại bỏ rủi ro ghi đè code, phát hiện lỗi sớm qua kiểm duyệt và bảo vệ nhánh chính.',
      'Mọi dự án chuyên nghiệp đều phân tách rõ ràng giữa nhánh phát triển tính năng và nhánh phát hành ổn định.',
    ],
    quiz: {
      id: 'quiz-06-01-why-team-workflow',
      title: 'Trắc nghiệm: Vì sao team cần workflow?',
      questions: [
        {
          id: 'q1',
          question: 'Lợi ích cốt lõi quan trọng nhất của việc áp dụng Git Workflow trong một đội ngũ phần mềm là gì?',
          type: 'single',
          options: [
            { text: 'Giảm thiểu xung đột, ngăn ngừa ghi đè mã nguồn và bảo đảm chất lượng phần mềm trước khi phát hành', correct: true },
            { text: 'Làm tăng dung lượng lưu trữ của máy chủ đám mây', correct: false },
            { text: 'Giúp lập trình viên không cần viết mã nguồn kiểm thử nữa', correct: false },
            { text: 'Tự động sửa toàn bộ các lỗi thuật toán logic trong chương trình', correct: false },
          ],
          explanation:
            'Quy trình làm việc nhóm giúp chuẩn hóa việc tích hợp mã nguồn, ngăn ngừa rủi ro hỏng hóc hệ thống và giữ nhánh chính luôn ổn định.',
        },
        {
          id: 'q2',
          question: 'Hành động nào sau đây bị xem là thiếu chuyên nghiệp và tiềm ẩn nguy cơ cao nhất trong làm việc nhóm?',
          type: 'single',
          options: [
            { text: 'Mọi thành viên đều commit và push trực tiếp các đoạn code chưa kiểm thử vào nhánh main', correct: true },
            { text: 'Tạo nhánh riêng cho từng tính năng mới cần phát triển', correct: false },
            { text: 'Yêu cầu đồng nghiệp kiểm duyệt mã nguồn thông qua Pull Request', correct: false },
            { text: 'Chạy kiểm thử tự động trước khi hợp nhất mã nguồn vào nhánh chính', correct: false },
          ],
          explanation:
            'Commit thẳng lên nhánh main dễ khiến code lỗi chưa qua kiểm thử phá hỏng phiên bản chạy thực tế của khách hàng.',
        },
        {
          id: 'q3',
          question: 'Yếu tố nào sau đây KHÔNG phải là một thành phần bắt buộc của một Git Workflow tiêu chuẩn?',
          type: 'single',
          options: [
            { text: 'Quy định mọi kỹ sư phải sử dụng cùng một loại bàn phím máy tính giống hệt nhau', correct: true },
            { text: 'Chiến lược đặt tên và phân tách các nhánh chức năng', correct: false },
            { text: 'Quy chuẩn viết nội dung thông điệp commit rõ ràng', correct: false },
            { text: 'Quy trình kiểm duyệt và điều kiện phê duyệt Pull Request', correct: false },
          ],
          explanation:
            'Git Workflow tập trung vào quy ước quản lý mã nguồn và nhánh, không can thiệp vào trang thiết bị phần cứng của lập trình viên.',
        },
        {
          id: 'q4',
          question: 'Khi một lập trình viên mới gia nhập đội ngũ dự án, tài liệu đầu tiên họ cần đọc và tuân thủ là gì?',
          type: 'single',
          options: [
            { text: 'Tài liệu hướng dẫn quy ước làm việc nhóm và chiến lược phân nhánh Git Workflow của dự án', correct: true },
            { text: 'Toàn bộ hợp đồng lao động của tất cả các nhân viên trong công ty', correct: false },
            { text: 'Bảng sao kê chi tiết tài chính quý trước của doanh nghiệp', correct: false },
            { text: 'Lịch sử tin nhắn cá nhân của người quản lý dự án', correct: false },
          ],
          explanation:
            'Nắm vững Git Workflow giúp thành viên mới nhanh chóng hòa nhập, đóng góp mã nguồn an toàn mà không phá vỡ cấu trúc kho lưu trữ.',
        },
      ],
    },
  },
  {
    id: '02-feature-branch-workflow',
    moduleId: '06-team-workflows',
    title: 'Feature Branch Workflow',
    duration: 25,
    xp: 85,
    keywords: ['feature branch workflow', 'nhanh tinh nang', 'feat branch', 'quy trinh feature', 'cach ly ma nguon', 'pull request flow'],
    prerequisites: ['01-why-team-workflow'],
    objectives: [
      'Nắm vững nguyên lý cốt lõi của mô hình Feature Branch Workflow: cô lập hoàn toàn từng tính năng trên một nhánh riêng.',
      'Thực hiện chuẩn xác quy trình 5 bước: tạo nhánh -> phát triển -> push remote -> mở Pull Request -> hợp nhất.',
      'Áp dụng quy ước đặt tên nhánh tính năng chuyên nghiệp (feat/user-auth, fix/cart-total).',
      'Giải thích được vì sao mô hình này là nền tảng cơ sở của tất cả các mô hình workflow phức tạp khác.',
    ],
    definition:
      'Feature Branch Workflow (Quy trình làm việc với nhánh tính năng) là mô hình cộng tác Git cơ bản và phổ biến nhất trong ngành công nghệ hiện đại. Quy tắc vàng bất di bất dịch của mô hình này là: nhánh chính (`main` hoặc `master`) chỉ chứa mã nguồn ổn định sẵn sàng hoạt động, và toàn bộ công việc phát triển tính năng mới hoặc sửa lỗi đều phải được thực hiện trên một nhánh rẽ độc lập chuyên biệt (Feature Branch). Nhánh này chỉ được hợp nhất quay trở lại nhánh chính sau khi đã vượt qua các bài kiểm thử tự động và được đồng nghiệp phê duyệt qua Pull Request.',
    why:
      'Nếu không sử dụng nhánh tính năng, nhiều lập trình viên cùng làm việc trên một nhánh sẽ liên tục giẫm chân lên nhau: mã nguồn dở dang của người này làm hỏng môi trường biên dịch của người khác, và không thể phát hành tính năng A đã xong nếu tính năng B đang bị lỗi kẹt lại. Feature Branch Workflow mang lại khả năng cô lập tuyệt đối: từng tính năng được phát triển, kiểm thử, thảo luận và hoàn thiện một cách độc lập hoàn toàn mà không làm ảnh hưởng đến nhánh chính cũng như các đồng nghiệp khác.',
    mentalModel:
      'Hãy hình dung một nhà máy lắp ráp ô tô cao cấp. Dây chuyền trung tâm (`main`) liên tục lăn bánh những chiếc xe hoàn chỉnh, không tì vết. Mỗi khi cần thiết kế một hệ thống mới như phanh tự động hay định vị vệ tinh, đội kỹ sư sẽ mở một xưởng nghiên cứu phụ bên cạnh (`feat/brake-system`). Họ thỏa sức thử nghiệm, hàn gắn, tháo lắp mà không hề làm nghẽn dây chuyền chính. Chỉ khi hệ thống phanh hoạt động hoàn hảo và vượt qua kiểm định an toàn nghiêm ngặt, xưởng phụ mới chuyển giao cụm linh kiện đó để tích hợp vào dây chuyền lớn.',
    diagram: `Quy trình Feature Branch Workflow khép kín:
main:        C1 ────────────────────────────── C4 (Merge Commit / Fast-Forward)
              │                                ▲
              └─► [Tạo nhánh feat/auth]        │ (Sau khi Review & Pass CI)
                        │                      │
feat/auth:              C2 ───────► C3 ────────┘`,
    example:
      'Kỹ sư Trang được giao nhiệm vụ xây dựng chức năng đăng nhập bằng tài khoản Google. Đầu tiên, Trang chuyển về nhánh chính mới nhất bằng lệnh `git switch main` rồi cập nhật code qua `git pull origin main`. Sau đó, Trang tạo một nhánh mới theo quy ước: `git switch -c feat/google-auth`. Trong hai ngày tiếp theo, Trang thực hiện 4 commit hoàn thiện tính năng trên nhánh này. Sau khi kiểm thử cục bộ thành công, Trang đẩy nhánh lên máy chủ bằng `git push -u origin feat/google-auth` và tạo một Pull Request trên GitHub. Sau khi đồng nghiệp duyệt mã nguồn và hệ thống kiểm tra tự động báo xanh, nhánh được gộp an toàn vào nhánh `main`.',
    commands: [
      'git switch -c feat/<ten-tinh-nang>',
      'git push -u origin feat/<ten-tinh-nang>',
      'git switch main && git pull origin main',
      'git branch -d feat/<ten-tinh-nang>',
    ],
    explanation:
      '- `git switch -c feat/<name>`: Vừa tạo vừa chuyển sang nhánh tính năng mới bắt đầu từ vị trí hiện tại.\n- `git push -u origin <name>`: Đẩy nhánh lên máy chủ và thiết lập liên kết theo dõi (upstream tracking).\n- `git switch main && git pull`: Quay về nhánh chính và đồng bộ mã nguồn mới nhất từ remote server.\n- `git branch -d feat/<name>`: Xóa nhánh tính năng cục bộ một cách an toàn sau khi đã hợp nhất thành công.',
    mistakes: [
      'Quên cập nhật nhánh main trước khi rẽ nhánh mới: Khiến nhánh tính năng bắt đầu từ nền tảng mã nguồn đã lỗi thời.',
      'Đặt tên nhánh chung chung, tối nghĩa như `my-branch`, `test`, `temp` khiến đồng nghiệp không hiểu mục đích.',
      'Gộp quá nhiều tính năng không liên quan vào cùng một nhánh: Khiến Pull Request trở nên khổng lồ và khó review.',
    ],
    labSteps: [
      'Đảm bảo nhánh main được cập nhật mới nhất bằng lệnh `git switch main && git pull origin main`.',
      'Tạo một nhánh tính năng mới theo quy ước chuẩn: `git switch -c feat/user-profile`.',
      'Thực hiện một commit mẫu, sau đó đẩy nhánh lên GitHub bằng `git push -u origin feat/user-profile`.',
    ],
    hint: 'Mỗi nhánh tính năng chỉ nên phục vụ một mục đích duy nhất và có vòng đời ngắn từ vài giờ đến vài ngày.',
    validation: 'Nhánh main luôn giữ được trạng thái có thể build và chạy thành công ở mọi thời điểm.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về mô hình Feature Branch Workflow tiêu chuẩn.',
    challenge: 'Trình bày cách xử lý nếu nhánh tính năng của bạn bị tụt hậu nhiều commit so với main trong thời gian bạn phát triển.',
    summary: [
      'Feature Branch Workflow cô lập toàn bộ công việc mới trên các nhánh rẽ riêng biệt.',
      'Nhánh main luôn được bảo vệ nghiêm ngặt và chỉ chứa mã nguồn đã kiểm thử ổn định.',
      'Pull Request là cầu nối trung tâm để thảo luận, duyệt code và tích hợp nhánh tính năng vào main.',
    ],
    quiz: {
      id: 'quiz-06-02-feature-branch-workflow',
      title: 'Trắc nghiệm: Feature Branch Workflow',
      questions: [
        {
          id: 'q1',
          question: 'Quy tắc vàng quan trọng nhất trong mô hình Feature Branch Workflow là gì?',
          type: 'single',
          options: [
            { text: 'Mọi tính năng mới đều phải được phát triển trên một nhánh riêng và nhánh main chỉ chứa code ổn định', correct: true },
            { text: 'Tất cả lập trình viên chỉ được làm việc trên nhánh main duy nhất', correct: false },
            { text: 'Không được phép xóa bất kỳ nhánh nào dù đã merge xong', correct: false },
            { text: 'Chỉ được phép tạo nhánh mới vào ngày đầu tuần', correct: false },
          ],
          explanation:
            'Tách biệt nhánh tính năng giúp bảo vệ tính toàn vẹn của nhánh chính và hỗ trợ nhiều người cùng làm việc song song mà không giẫm chân lên nhau.',
        },
        {
          id: 'q2',
          question: 'Quy ước đặt tên nhánh nào sau đây thể hiện rõ ràng và chuyên nghiệp nhất cho tính năng giỏ hàng?',
          type: 'single',
          options: [
            { text: 'feat/shopping-cart', correct: true },
            { text: 'code_moi_nhat_2026', correct: false },
            { text: 'test1234', correct: false },
            { text: 'dung-xoa-nhe', correct: false },
          ],
          explanation:
            'Tiền tố `feat/` kết hợp với mô tả ngắn gọn bằng tiếng Anh theo dạng kebab-case là chuẩn mực phổ biến nhất trong các dự án công nghệ.',
        },
        {
          id: 'q3',
          question: 'Sau khi một nhánh tính năng đã được hợp nhất thành công vào nhánh main trên GitHub, bước tiếp theo nên làm gì?',
          type: 'single',
          options: [
            { text: 'Xóa nhánh tính năng đó trên cả GitHub và máy cục bộ để giữ kho lưu trữ gọn gàng', correct: true },
            { text: 'Tiếp tục dùng nhánh đó để phát triển một tính năng hoàn toàn khác', correct: false },
            { text: 'Xóa toàn bộ kho lưu trữ trên máy và clone lại từ đầu', correct: false },
            { text: 'Tắt máy tính và không bao giờ đồng bộ mã nguồn nữa', correct: false },
          ],
          explanation:
            'Xóa nhánh tính năng đã hoàn thành giúp cây thư mục gọn gàng, tránh nhầm lẫn và giảm tải chi phí quản lý nhánh.',
        },
        {
          id: 'q4',
          question: 'Tại sao việc gộp nhiều tính năng độc lập vào một nhánh tính năng duy nhất lại bị xem là phản mẫu (anti-pattern)?',
          type: 'single',
          options: [
            { text: 'Vì Pull Request sẽ quá lớn, khó kiểm duyệt chi tiết và khó cô lập khi phát sinh lỗi cần hoàn tác', correct: true },
            { text: 'Vì Git không cho phép một nhánh chứa quá 3 commit', correct: false },
            { text: 'Vì máy chủ GitHub sẽ từ chối nhận các nhánh có tên dài', correct: false },
            { text: 'Vì việc đó vi phạm bản quyền phần mềm mã nguồn mở', correct: false },
          ],
          explanation:
            'Nhánh tính năng quá lớn khiến người review bị quá tải, tăng nguy cơ sót lỗi ngầm và rất khó revert nếu một trong các tính năng gặp sự cố.',
        },
        {
          id: 'q5',
          question: 'Lệnh nào sau đây vừa tạo nhánh mới vừa kích hoạt con trỏ HEAD làm việc trên nhánh đó ngay lập tức?',
          type: 'single',
          options: [
            { text: 'git switch -c feat/dark-mode', correct: true },
            { text: 'git branch feat/dark-mode', correct: false },
            { text: 'git checkout feat/dark-mode', correct: false },
            { text: 'git commit -b feat/dark-mode', correct: false },
          ],
          explanation:
            'Cờ `-c` trong lệnh hiện đại `git switch` thực hiện hành động tạo nhánh mới và chuyển sang nhánh đó trong một bước duy nhất.',
        },
        {
          id: 'q6',
          question: 'Trước khi bắt đầu rẽ nhánh tính năng mới từ nhánh main, bạn luôn luôn nên thực hiện thao tác gì?',
          type: 'single',
          options: [
            { text: 'Chuyển về nhánh main và chạy git pull để bảo đảm đang rẽ nhánh từ phiên bản mã nguồn mới nhất', correct: true },
            { text: 'Xóa sạch toàn bộ lịch sử commit trong thư mục .git', correct: false },
            { text: 'Chạy lệnh git reset --hard để đưa máy về trạng thái xuất xưởng', correct: false },
            { text: 'Đổi tên tài khoản GitHub của bạn sang tên khác', correct: false },
          ],
          explanation:
            'Luôn cập nhật nhánh main mới nhất trước khi rẽ nhánh giúp giảm thiểu tối đa nguy cơ gặp xung đột mã nguồn sau này khi mở Pull Request.',
        },
      ],
    },
  },
  {
    id: '03-github-flow',
    moduleId: '06-team-workflows',
    title: 'GitHub Flow',
    duration: 25,
    xp: 85,
    keywords: ['github flow', 'continuous delivery', 'simple git workflow', 'deploy to production', 'pull request workflow', 'lightweight process'],
    prerequisites: ['02-feature-branch-workflow'],
    objectives: [
      'Nắm vững triết lý đơn giản, tinh gọn và hướng tới chuyển giao liên tục (Continuous Delivery) của GitHub Flow.',
      'Hiểu rõ 6 bước tuần tự của GitHub Flow từ rẽ nhánh đến triển khai tự động lên môi trường Production.',
      'Xác định được các dự án phù hợp lý tưởng với GitHub Flow: ứng dụng web, microservices và SaaS.',
      'Phân biệt điểm khác biệt giữa GitHub Flow và các mô hình đa nhánh phức tạp như Git Flow.',
    ],
    definition:
      'GitHub Flow là một quy trình làm việc phân nhánh cực kỳ tinh gọn và linh hoạt, được thiết kế bởi chính đội ngũ kỹ thuật của GitHub vào năm 2011 để phục vụ cho các ứng dụng web triển khai thường xuyên. Trọng tâm của GitHub Flow dựa trên một nguyên tắc cốt lõi: bất kỳ thứ gì nằm trên nhánh `main` đều có thể triển khai trực tiếp lên môi trường Production (Deployable). Không có các nhánh trung gian như develop hay release; toàn bộ quy trình chỉ xoay quanh nhánh `main` và các nhánh nhánh mô tả ngắn hạn được hợp nhất qua Pull Request.',
    why:
      'Trong thời đại điện toán đám mây và phần mềm dạng dịch vụ (SaaS), các công ty công nghệ có thể phát hành phiên bản mới hàng chục lần mỗi ngày. Những mô hình quản lý nhánh cổ điển với nhiều nhánh trung gian cồng kềnh trở nên quá chậm chạp và quan liêu. GitHub Flow loại bỏ hoàn toàn các rào cản phức tạp, giúp các nhóm kỹ sư đẩy nhanh tốc độ đưa tính năng ra thị trường, kiểm thử thực tế tức thì và nhận phản hồi nhanh chóng từ người dùng cuối.',
    mentalModel:
      'Hãy hình dung một tòa soạn báo điện tử trực tuyến cập nhật tin tức 24/7. Trang chủ của tờ báo điện tử chính là nhánh `main`. Mỗi khi có một phóng viên viết bài điều tra mới, phóng viên tạo một bản thảo riêng (`feature branch`). Khi bài viết hoàn thành, biên tập viên sẽ đọc duyệt và bình luận sửa lỗi (`Pull Request`). Ngay khi bài viết được bấm duyệt, bài báo lập tức xuất hiện trên trang chủ cho hàng triệu độc giả đọc ngay tức khắc mà không cần chờ đến đợt in ấn định kỳ hàng tháng.',
    diagram: `Vòng tuần hoàn 6 bước chuẩn mực của GitHub Flow:
1. Tạo nhánh từ main (Create branch)
       │
       ▼
2. Thêm các commit rõ nghĩa (Add commits)
       │
       ▼
3. Mở Pull Request thảo luận (Open PR)
       │
       ▼
4. Thảo luận & Review code (Discuss & Review)
       │
       ▼
5. Triển khai thử nghiệm (Deploy & Test)
       │
       ▼
6. Hợp nhất vào main (Merge to main & Deploy Prod)`,
    example:
      'Tại một công ty công nghệ phát triển nền tảng thương mại điện tử SaaS, toàn bộ nhóm 20 kỹ sư vận hành theo chuẩn GitHub Flow. Khi kỹ sư Nam cần nâng cấp giao diện nút thanh toán, Nam tạo nhánh `ui/apple-pay` từ `main`. Sau khi hoàn thiện mã nguồn, Nam mở Pull Request. Hệ thống CI/CD tự động dựng một môi trường xem trước (Preview Environment). Trưởng nhóm và chuyên viên sản phẩm cùng vào trải nghiệm thử trực tiếp trên môi trường này và bấm phê duyệt (Approve). Nam bấm nút Merge trên GitHub, hệ thống tự động gộp code vào `main` và kích hoạt triển khai tính năng mới lên máy chủ thực tế chỉ sau đúng 3 phút.',
    commands: [
      'git switch -c ui/apple-pay',
      'git commit -m "feat(checkout): add Apple Pay button"',
      'git push -u origin ui/apple-pay',
      'gh pr create --title "feat: add Apple Pay" --body "Tested on Safari"',
    ],
    explanation:
      '- `git switch -c <name>`: Tạo nhánh tính năng mới tinh gọn bắt đầu từ nhánh main.\n- `git commit -m <msg>`: Ghi lại từng bước tiến hóa của tính năng với thông điệp rõ nghĩa.\n- `git push -u origin <name>`: Xuất bản nhánh lên GitHub để bắt đầu quy trình thảo luận nhóm.\n- `gh pr create`: Lệnh GitHub CLI tiện lợi để mở Pull Request trực tiếp từ dòng lệnh mà không cần mở trình duyệt.',
    mistakes: [
      'Để nhánh main ở trạng thái không thể chạy hoặc đang dở dang: Vi phạm nguyên tắc thiêng liêng "main is always deployable".',
      'Duy trì các nhánh tính năng quá dài ngày (vài tuần đến vài tháng): Gây khó khăn lớn cho việc merge và review.',
      'Bỏ qua bước thảo luận và thử nghiệm trên môi trường staging trước khi bấm merge vào main.',
    ],
    labSteps: [
      'Tạo một nhánh mới từ main mô tả một tính năng cụ thể.',
      'Mở Pull Request trên giao diện GitHub và thêm nhãn (label) mô tả trạng thái.',
      'Quan sát quy trình kiểm tra tự động trước khi bấm nút Merge vào nhánh chính.',
    ],
    hint: 'Chìa khóa thành công của GitHub Flow là các nhánh tính năng phải cực kỳ ngắn hạn và hệ thống CI/CD phải tự động hóa cao.',
    validation: 'Nhánh main có thể triển khai lên môi trường thực tế bất cứ lúc nào trong ngày mà không gặp sự cố.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về quy trình tinh gọn GitHub Flow.',
    challenge: 'Giải thích tại sao một hệ thống kiểm thử tự động (CI/CD) mạnh mẽ là điều kiện tiên quyết bắt buộc để áp dụng thành công GitHub Flow.',
    summary: [
      'GitHub Flow là mô hình tinh gọn tập trung xung quanh nhánh main luôn luôn sẵn sàng deploy.',
      'Mọi thay đổi đều được đóng gói trong nhánh ngắn hạn và trao đổi qua Pull Request.',
      'Cực kỳ tối ưu cho các sản phẩm web, microservices và các nhóm triển khai liên tục nhiều lần mỗi ngày.',
    ],
    quiz: {
      id: 'quiz-06-03-github-flow',
      title: 'Trắc nghiệm: GitHub Flow',
      questions: [
        {
          id: 'q1',
          question: 'Nguyên tắc bất di bất dịch cốt lõi của mô hình GitHub Flow là gì?',
          type: 'single',
          options: [
            { text: 'Mã nguồn trên nhánh main luôn luôn ở trạng thái sẵn sàng triển khai lên Production', correct: true },
            { text: 'Bắt buộc phải có ít nhất 5 nhánh phụ trước khi merge vào main', correct: false },
            { text: 'Chỉ được phép deploy sản phẩm vào lúc 12 giờ đêm', correct: false },
            { text: 'Không được phép sử dụng lệnh git push lên máy chủ', correct: false },
          ],
          explanation:
            'Nguyên lý trung tâm của GitHub Flow là tính sẵn sàng triển khai liên tục của nhánh main ở bất kỳ thời điểm nào trong ngày.',
        },
        {
          id: 'q2',
          question: 'Mô hình GitHub Flow phù hợp lý tưởng nhất với loại hình dự án phần mềm nào?',
          type: 'single',
          options: [
            { text: 'Ứng dụng web, kiến trúc microservices và phần mềm dạng dịch vụ SaaS có chu kỳ phát hành nhanh', correct: true },
            { text: 'Hệ điều hành nhúng trên vệ tinh không gian chỉ cập nhật 5 năm một lần', correct: false },
            { text: 'Các phần mềm đóng gói trên đĩa CD-ROM bán ngoài cửa hàng', correct: false },
            { text: 'Các bài tập cá nhân không có nhu cầu chia sẻ mã nguồn', correct: false },
          ],
          explanation:
            'GitHub Flow sinh ra để phục vụ việc phát hành phần mềm liên tục và tức thì trên nền tảng đám mây và web hiện đại.',
        },
        {
          id: 'q3',
          question: 'Trong GitHub Flow, bước nào sau đây diễn ra TRƯỚC KHI nhánh tính năng được hợp nhất vào nhánh main?',
          type: 'single',
          options: [
            { text: 'Mở Pull Request, thảo luận, kiểm duyệt code và thử nghiệm tính năng trên môi trường kiểm thử', correct: true },
            { text: 'Xóa toàn bộ kho lưu trữ trên máy chủ GitHub', correct: false },
            { text: 'Bắt buộc đổi mật khẩu tài khoản của toàn bộ lập trình viên', correct: false },
            { text: 'Chạy lệnh git reset --hard trên nhánh main', correct: false },
          ],
          explanation:
            'Thảo luận, review và xác nhận hoạt động ổn định trên môi trường thử nghiệm là điều kiện bắt buộc trước khi merge code vào main trong GitHub Flow.',
        },
        {
          id: 'q4',
          question: 'So với Git Flow cổ điển, GitHub Flow đã lược bỏ những loại nhánh nào để trở nên tinh gọn?',
          type: 'single',
          options: [
            { text: 'Lược bỏ nhánh develop dài hạn và các nhánh trung gian cồng kềnh như release branches', correct: true },
            { text: 'Lược bỏ hoàn toàn nhánh main', correct: false },
            { text: 'Cấm tạo nhánh tính năng feature branch', correct: false },
            { text: 'Loại bỏ hoàn toàn hệ thống kiểm tra Pull Request', correct: false },
          ],
          explanation:
            'GitHub Flow đơn giản hóa cấu trúc bằng cách chỉ giữ lại một nhánh dài hạn duy nhất là main, bỏ qua nhánh develop và release.',
        },
      ],
    },
  },
  {
    id: '04-git-flow',
    moduleId: '06-team-workflows',
    title: 'Git Flow',
    duration: 30,
    xp: 95,
    keywords: ['git flow', 'vincent driessen', 'develop branch', 'release branch', 'hotfix branch', 'scheduled release', 'chu ky phat hanh'],
    prerequisites: ['02-feature-branch-workflow'],
    objectives: [
      'Nắm bắt toàn diện kiến trúc 5 loại nhánh trong mô hình kinh điển Git Flow do Vincent Driessen đề xuất.',
      'Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).',
      'Vận hành chuẩn xác vòng đời của nhánh release và nhánh hotfix từ khi rẽ nhánh đến khi hợp nhất kép (dual-merge).',
      'Đánh giá được ưu nhược điểm và nhận diện các dự án phù hợp với Git Flow: ứng dụng mobile, phần mềm đóng gói, enterprise.',
    ],
    definition:
      'Git Flow là mô hình phân nhánh Git kinh điển và có cấu trúc chặt chẽ nhất, được kỹ sư Vincent Driessen giới thiệu vào năm 2010. Mô hình này thiết lập một quy trình làm việc nghiêm ngặt xoay quanh việc phát hành các phiên bản phần mềm có kế hoạch định kỳ (Scheduled Releases). Git Flow phân định mã nguồn thành hai nhánh trường tồn vĩnh viễn: `main` (lưu trữ lịch sử các bản phát hành chính thức cho khách hàng) và `develop` (nhánh tích hợp trung tâm của các tính năng mới), cùng với 3 nhóm nhánh ngắn hạn hỗ trợ: `feature/*`, `release/*` và `hotfix/*`.',
    why:
      'Đối với các sản phẩm như ứng dụng di động trên App Store/Google Play, phần mềm nhúng hoặc các giải pháp phần mềm doanh nghiệp (Enterprise), bạn không thể tùy tiện triển khai code mới lên người dùng nhiều lần mỗi ngày. Bạn cần một giai đoạn đóng băng tính năng (Feature Freeze) để đội QA kiểm thử hồi quy toàn diện, chuẩn bị tài liệu hướng dẫn và làm thủ tục phê duyệt ứng dụng. Git Flow cung cấp một cấu trúc vững chắc và dự đoán trước được cho toàn bộ các khâu phức tạp đó.',
    mentalModel:
      'Hãy hình dung một xưởng đóng tàu thủy quân sự. Nhánh `main` là hạm đội tàu chiến đã được bàn giao và đang thực hiện nhiệm vụ trên biển khơi. Nhánh `develop` là xưởng đóng tàu ngầm khổng lồ nơi các đội công nhân đang lắp ráp các bộ phận mới. Khi một con tàu mới hoàn thiện phần thô, nó được đưa ra ụ thử nghiệm riêng (`release branch`) để kiểm tra chống thấm nước và sơn tĩnh điện mà không làm cản trở công nhân đóng các con tàu tiếp theo trong xưởng. Nếu một tàu chiến ngoài biển bị thủng vỏ bất ngờ, một đội cứu hộ khẩn cấp (`hotfix branch`) xuất phát ngay từ `main` để sửa chữa rồi báo cáo kết quả cho cả hai nơi.',
    diagram: `Cấu trúc 5 loại nhánh trong mô hình Git Flow kinh điển:
main:        v1.0 ────────────────────────────────────────── v1.1 (Production)
               ▲                                              ▲
               │                     ┌── release/1.1 ─────────┤
               │                     │                        ▼
develop:     ──┴─► C1 ──► C2 ──► C3 ─┴─────────────────────── C4 ──► (Next sprint)
                    │      ▲
                    └─feat─┘`,
    example:
      'Một công ty phát triển ứng dụng ngân hàng di động trên iOS và Android áp dụng mô hình Git Flow. Nhánh `develop` là nơi 15 lập trình viên tích hợp các tính năng chuyển tiền và quét mã QR. Đến ngày 20 hàng tháng theo kế hoạch sprint, đội trưởng kỹ thuật tạo nhánh `release/v2.5.0` từ `develop`. Trong 5 ngày tiếp theo, nhánh này bị đóng băng tính năng, nhóm QA chỉ tập trung tìm lỗi và các lập trình viên chỉ commit sửa lỗi trực tiếp trên nhánh release này. Khi bản build vượt qua mọi bài kiểm thử an ninh, nhánh release được gộp vào `main`, gắn thẻ tag `v2.5.0`, đồng thời được gộp ngược lại vào `develop` để bảo đảm các bản sửa lỗi không bị thất lạc.',
    commands: [
      'git switch -c release/v1.2.0 develop',
      'git switch main && git merge --no-ff release/v1.2.0',
      'git tag -a v1.2.0 -m "Release v1.2.0"',
      'git switch develop && git merge --no-ff release/v1.2.0',
      'git branch -d release/v1.2.0',
    ],
    explanation:
      '- `git switch -c release/v1.2.0 develop`: Tạo nhánh phát hành xuất phát từ nhánh tích hợp develop.\n- `git merge --no-ff`: Hợp nhất có tạo merge commit để bảo toàn dấu vết lịch sử của nhánh release.\n- `git tag -a`: Đánh dấu mốc phiên bản phát hành chính thức trên nhánh main.\n- Hợp nhất ngược về `develop`: Bước bắt buộc để mang các lỗi đã sửa trên release quay về nhánh phát triển.',
    mistakes: [
      'Quên hợp nhất ngược nhánh release hoặc hotfix về develop: Dẫn đến việc các lỗi nghiêm trọng đã sửa trên production lại tái xuất hiện ở phiên bản sau.',
      'Tiếp tục code tính năng mới trên nhánh release đang đóng băng: Phá vỡ mục tiêu ổn định hóa của giai đoạn chuẩn bị phát hành.',
      'Áp dụng Git Flow cho các website đơn giản cần deploy 10 lần một ngày: Gây lãng phí công sức và làm chậm tiến độ dự án nghiêm trọng.',
    ],
    labSteps: [
      'Khởi tạo hai nhánh dài hạn `main` và `develop` trong kho lưu trữ thử nghiệm.',
      'Mô phỏng quy trình tạo một nhánh `release/v1.0.0` từ `develop`, sửa một lỗi nhỏ và gộp vào cả `main` lẫn `develop`.',
    ],
    hint: 'Nhánh release và hotfix luôn luôn phải được merge vào cả hai nhánh vĩnh cửu: main và develop.',
    validation: 'Hiểu rõ tại sao Git Flow cần quy trình hợp nhất kép (dual-merge) cho release và hotfix.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về mô hình đa nhánh Git Flow.',
    challenge: 'Mô tả chi tiết quy trình xử lý một sự cố khẩn cấp (Hotfix) trong Git Flow từ lúc nhận báo cáo lỗi đến khi deploy xong.',
    summary: [
      'Git Flow là mô hình phân nhánh chặt chẽ lý tưởng cho các sản phẩm có chu kỳ phát hành cố định.',
      'Sở hữu 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).',
      'Quy trình đóng băng tính năng trên release branch bảo đảm chất lượng và sự ổn định cao nhất trước khi xuất bản.',
    ],
    quiz: {
      id: 'quiz-06-04-git-flow',
      title: 'Trắc nghiệm: Git Flow',
      questions: [
        {
          id: 'q1',
          question: 'Hai nhánh vĩnh cửu (long-lived branches) song hành xuyên suốt vòng đời dự án trong Git Flow là gì?',
          type: 'single',
          options: [
            { text: 'main và develop', correct: true },
            { text: 'feature và bugfix', correct: false },
            { text: 'release và hotfix', correct: false },
            { text: 'test và production', correct: false },
          ],
          explanation:
            'Trong kiến trúc Git Flow chuẩn, `main` và `develop` là hai nhánh tồn tại vĩnh viễn, trong khi các nhánh khác đều bị xóa sau khi hoàn thành nhiệm vụ.',
        },
        {
          id: 'q2',
          question: 'Khi một nhánh `release/*` hoàn tất quá trình kiểm thử và sẵn sàng xuất bản, nó bắt buộc phải được merge vào những nhánh nào?',
          type: 'single',
          options: [
            { text: 'Merge vào cả nhánh main và nhánh develop (hợp nhất kép)', correct: true },
            { text: 'Chỉ merge duy nhất vào nhánh main rồi xóa bỏ', correct: false },
            { text: 'Chỉ merge duy nhất vào nhánh develop', correct: false },
            { text: 'Không được merge vào đâu mà giữ nguyên làm kho lưu trữ', correct: false },
          ],
          explanation:
            'Bắt buộc phải merge vào `main` để phát hành và merge ngược vào `develop` để bảo đảm các bugfix trong giai đoạn release không bị mất ở phiên bản tiếp theo.',
        },
        {
          id: 'q3',
          question: 'Nhánh `hotfix/*` trong Git Flow được rẽ nhánh trực tiếp từ đâu để giải quyết sự cố sản xuất?',
          type: 'single',
          options: [
            { text: 'Rẽ nhánh trực tiếp từ nhánh main nơi phiên bản lỗi đang chạy thực tế', correct: true },
            { text: 'Rẽ nhánh từ nhánh develop', correct: false },
            { text: 'Rẽ nhánh từ một nhánh feature bất kỳ', correct: false },
            { text: 'Rẽ nhánh từ máy tính cá nhân của lập trình viên thực tập', correct: false },
          ],
          explanation:
            'Hotfix phải xuất phát trực tiếp từ commit bị lỗi trên `main` để tránh đưa nhầm các tính năng chưa hoàn thiện trên `develop` ra môi trường sản xuất.',
        },
        {
          id: 'q4',
          question: 'Nhược điểm lớn nhất khiến nhiều nhóm phần mềm hiện đại chuyển dịch từ Git Flow sang các mô hình tinh gọn hơn là gì?',
          type: 'single',
          options: [
            { text: 'Quy trình nhiều nhánh phức tạp, cồng kềnh và làm chậm chu kỳ triển khai liên tục (CI/CD)', correct: true },
            { text: 'Git Flow không hỗ trợ ngôn ngữ lập trình JavaScript', correct: false },
            { text: 'Git Flow bắt buộc phải trả phí bản quyền hàng tháng cho tác giả', correct: false },
            { text: 'Git Flow làm mất toàn bộ các commit cũ sau 30 ngày', correct: false },
          ],
          explanation:
            'Độ trễ do việc duy trì nhiều nhánh trung gian khiến Git Flow không phù hợp với các đội ngũ cần phát hành phiên bản mới liên tục hàng ngày.',
        },
      ],
    },
  },
  {
    id: '05-trunk-based-development',
    moduleId: '06-team-workflows',
    title: 'Trunk-Based Development',
    duration: 25,
    xp: 90,
    keywords: ['trunk-based development', 'trunk based dev', 'short-lived branches', 'feature flags', 'ci cd pipeline', 'continuous integration', 'fast iteration'],
    prerequisites: ['02-feature-branch-workflow'],
    objectives: [
      'Nắm vững triết lý và thực tiễn của mô hình Trunk-Based Development được các gã khổng lồ công nghệ áp dụng.',
      'Hiểu rõ khái niệm nhánh cực ngắn hạn (Short-lived branches) với tuổi thọ dưới 1 hoặc 2 ngày.',
      'Làm chủ kỹ thuật Cờ tính năng (Feature Flags) để tách biệt giữa việc đưa mã nguồn lên main (Deploy) và kích hoạt tính năng (Release).',
      'Nhận biết các điều kiện tiên quyết để vận hành Trunk-Based Development thành công: kiểm thử tự động toàn diện và văn hóa review thần tốc.',
    ],
    definition:
      'Trunk-Based Development là một chiến lược phân nhánh mã nguồn hiện đại, trong đó tất cả các kỹ sư cùng hợp nhất những thay đổi nhỏ, thường xuyên trực tiếp vào một nhánh duy nhất gọi là "Trunk" (thường là nhánh `main`). Thay vì duy trì các nhánh tính năng kéo dài hàng tuần gây ra xung đột hợp nhất thảm khốc, các nhà phát triển trong mô hình Trunk-Based chỉ tạo các nhánh cực ngắn hạn (vài giờ đến tối đa 1 hoặc 2 ngày) hoặc thậm chí commit trực tiếp vào Trunk với sự hỗ trợ của các bộ kiểm thử tự động hóa cao và kỹ thuật Feature Flags.',
    why:
      'Các tập đoàn công nghệ hàng đầu thế giới như Google, Meta, Netflix và Amazon đều áp dụng Trunk-Based Development bởi vì mô hình này tối đa hóa tốc độ phát triển và triệt tiêu hoàn toàn "Địa ngục hợp nhất" (Merge Hell). Bằng cách tích hợp mã nguồn nhiều lần trong ngày, mọi xung đột đều được phát hiện ngay khi còn rất nhỏ và dễ giải quyết, ngăn ngừa tình trạng tách biệt mã nguồn và thúc đẩy văn hóa phản hồi tức thì giữa các thành viên.',
    mentalModel:
      'Hãy hình dung một con sông lớn đại diện cho Trunk (`main`). Trong các mô hình cũ, từng nhóm kỹ sư đào những con kênh rất dài chạy song song suốt nhiều tháng, đến khi đục thông đê để hợp nhất nước vào sông chính thì lưu lượng quá lớn gây ngập lụt kinh hoàng (Merge Hell). Trong Trunk-Based Development, các kỹ sư chỉ đào những rãnh nước rất ngắn, xả nước vào dòng sông chính từng gáo nhỏ mỗi giờ. Nước sông luôn cuộn chảy ổn định, không bao giờ xảy ra lũ lụt bất ngờ.',
    diagram: `Mô hình Trunk-Based Development với các nhánh cực ngắn:
Trunk (main): ──●────●────●────●────●────●────●────●────● (Tích hợp liên tục nhiều lần/ngày)
                │   ▲    │   ▲    │   ▲
                └───┘    └───┘    └───┘
              (Nhánh siêu ngắn < 1 ngày, nén commit nhỏ)`,
    example:
      'Tại một nhóm kỹ thuật phát triển công cụ tìm kiếm, kỹ sư Dũng cần phát triển một thuật toán xếp hạng mới dự kiến mất 3 tuần. Thay vì giữ một nhánh riêng suốt 3 tuần, Dũng sử dụng Trunk-Based Development kết hợp Feature Flag: `if (features.useNewRankingAlgo)`. Mỗi ngày, Dũng viết xong một hàm nhỏ, kiểm thử đơn vị xanh và mở Pull Request nhỏ chỉ khoảng 50 dòng code để gộp thẳng vào Trunk. Đoạn mã mới được đẩy lên production ngay nhưng bị ẩn đi sau Feature Flag. Nhờ vậy, Dũng không bao giờ bị lệch code so với đồng nghiệp và hệ thống vẫn chạy ổn định 100%.',
    commands: [
      'git switch main && git pull --rebase origin main',
      'git switch -c short-feat/add-rating-model',
      'git push origin short-feat/add-rating-model',
    ],
    explanation:
      '- `git pull --rebase`: Đồng bộ nhánh Trunk mới nhất giữ lịch sử thẳng hàng.\n- `git switch -c short-feat/<tên-nhánh>`: Tạo nhánh cực ngắn hạn chỉ giải quyết một phần việc nhỏ trong ngày.\n- Tích hợp liên tục: Đẩy code và mở PR nhỏ gọn giúp đồng nghiệp review xong chỉ trong 15 phút.',
    mistakes: [
      'Giữ nhánh quá lâu nhiều ngày mà không tích hợp vào Trunk: Biến mô hình Trunk-Based thành Feature Branch Workflow thông thường.',
      'Đưa code dở dang lên Trunk mà không che chắn bằng Feature Flag: Khiến giao diện hoặc logic hỏng hiển thị ra người dùng cuối.',
      'Thiếu hệ thống CI tự động kiểm tra nghiêm ngặt: Khiến Trunk dễ bị vỡ và chặn đứng công việc của cả công ty.',
    ],
    labSteps: [
      'Chia nhỏ một bài toán lớn thành 3 đầu việc nhỏ có thể hoàn thành trong 1 ngày.',
      'Viết mã nguồn kết hợp điều kiện if-else mô phỏng cơ chế Feature Flag bảo vệ tính năng mới.',
    ],
    hint: 'Trunk-Based Development chỉ thực sự phát huy sức mạnh khi đi đôi với bộ kiểm thử tự động vững chắc và văn hóa review code nhanh.',
    validation: 'Hiểu rõ sự khác biệt giữa thời điểm đưa mã nguồn lên máy chủ (Deployment) và thời điểm mở tính năng cho người dùng (Release).',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về mô hình Trunk-Based Development.',
    challenge: 'Phân tích cơ chế hoạt động của Feature Flags trong việc giảm thiểu rủi ro khi triển khai code liên tục vào Trunk.',
    summary: [
      'Trunk-Based Development tập trung hợp nhất các thay đổi nhỏ vào một nhánh chính duy nhất thường xuyên.',
      'Tuổi thọ của các nhánh tính năng cực ngắn, thường không vượt quá một đến hai ngày làm việc.',
      'Kết hợp với Feature Flags để tách biệt việc đưa code lên hệ thống và kích hoạt tính năng cho người dùng.',
    ],
    quiz: {
      id: 'quiz-06-05-trunk-based-development',
      title: 'Trắc nghiệm: Trunk-Based Development',
      questions: [
        {
          id: 'q1',
          question: 'Đặc điểm nhận diện nổi bật nhất của các nhánh làm việc trong mô hình Trunk-Based Development là gì?',
          type: 'single',
          options: [
            { text: 'Tuổi thọ cực kỳ ngắn hạn, thường chỉ kéo dài vài giờ đến tối đa một hoặc hai ngày', correct: true },
            { text: 'Tồn tại ít nhất 6 tháng để kiểm thử thật kỹ lưỡng', correct: false },
            { text: 'Chỉ được phép merge vào ngày cuối cùng của quý', correct: false },
            { text: 'Không bao giờ được phép merge vào nhánh main', correct: false },
          ],
          explanation:
            'Nhánh siêu ngắn hạn giúp các lập trình viên tích hợp mã nguồn liên tục, loại bỏ hoàn toàn nguy cơ xung đột lớn khi sáp nhập.',
        },
        {
          id: 'q2',
          question: 'Kỹ thuật nào là "bạn đồng hành" không thể thiếu giúp Trunk-Based Development an toàn khi code chưa hoàn thiện 100%?',
          type: 'single',
          options: [
            { text: 'Feature Flags (Cờ tính năng) cho phép ẩn đoạn mã mới khỏi người dùng trên môi trường thực tế', correct: true },
            { text: 'Tắt hoàn toàn máy chủ cơ sở dữ liệu khi có người commit', correct: false },
            { text: 'Khóa tài khoản của tất cả những ai mở Pull Request', correct: false },
            { text: 'Chỉ cho phép giám đốc điều hành được quyền gõ bàn phím', correct: false },
          ],
          explanation:
            'Feature Flags cho phép đưa code lên production an toàn và chỉ kích hoạt khi tính năng đã hoàn thiện và sẵn sàng phục vụ khách hàng.',
        },
        {
          id: 'q3',
          question: 'Tại sao các tập đoàn công nghệ khổng lồ như Google và Meta lại ưa chuộng Trunk-Based Development?',
          type: 'single',
          options: [
            { text: 'Vì nó loại bỏ "Địa ngục hợp nhất" (Merge Hell) và thúc đẩy tốc độ tích hợp liên tục ở quy mô hàng ngàn kỹ sư', correct: true },
            { text: 'Vì Trunk-Based Development không yêu cầu viết kiểm thử tự động', correct: false },
            { text: 'Vì mô hình này tự động tăng gấp đôi lương cho lập trình viên', correct: false },
            { text: 'Vì nó giúp máy tính của kỹ sư chạy mát hơn mà không cần quạt tản nhiệt', correct: false },
          ],
          explanation:
            'Ở quy mô lớn, việc duy trì các nhánh dài hạn là bất khả thi; mô hình Trunk-Based giữ cho codebase chung luôn tươi mới và được kiểm định liên tục từng phút.',
        },
        {
          id: 'q4',
          question: 'Yêu cầu kỹ thuật bắt buộc phải có để một tổ chức có thể áp dụng thành công Trunk-Based Development là gì?',
          type: 'single',
          options: [
            { text: 'Hệ thống CI tự động chạy kiểm thử nhanh chóng và toàn diện để bảo vệ chất lượng nhánh Trunk', correct: true },
            { text: 'Một phòng họp thật lớn để tất cả mọi người cùng ngồi làm việc chung', correct: false },
            { text: 'Quy định cấm lập trình viên làm việc từ xa', correct: false },
            { text: 'Cài đặt ít nhất 10 hệ điều hành khác nhau trên máy tính', correct: false },
          ],
          explanation:
            'Nếu không có CI kiểm tra tự động vững chắc, các commit liên tục vào Trunk có thể dễ dàng làm vỡ bản build và gây tê liệt cả nhóm.',
        },
      ],
    },
  },
  {
    id: '06-workflow-comparison',
    moduleId: '06-team-workflows',
    title: 'So sánh GitHub Flow / Git Flow / Trunk-Based',
    duration: 30,
    xp: 100,
    keywords: ['so sanh workflow', 'git flow vs github flow', 'trunk based vs git flow', 'chon workflow phu hop', 'ma tran quy trinh', 'branching tradeoffs'],
    prerequisites: ['03-github-flow', '04-git-flow', '05-trunk-based-development'],
    objectives: [
      'Lập bảng ma trận so sánh chi tiết ưu nhược điểm, độ phức tạp và trường hợp sử dụng của 3 mô hình workflow hàng đầu.',
      'Hiểu rõ sự đánh đổi (Trade-offs) giữa tính linh hoạt tốc độ cao và mức độ kiểm soát an toàn nghiêm ngặt.',
      'Phân tích được các tiêu chí cốt lõi để lựa chọn workflow phù hợp: loại sản phẩm, quy mô đội ngũ, chu kỳ phát hành, độ chín CI/CD.',
      'Tự tin tư vấn và thiết lập quy trình phân nhánh tối ưu cho một dự án thực tế.',
    ],
    definition:
      'Việc lựa chọn chiến lược phân nhánh mã nguồn không có câu trả lời "đúng tuyệt đối cho mọi dự án", mà là một bài toán cân nhắc sự đánh đổi (Trade-off Analysis) kỹ lưỡng. Ba mô hình phổ biến nhất hiện nay đại diện cho ba triết lý khác nhau: **Git Flow** ưu tiên sự kiểm soát tối đa và an toàn tuyệt đối cho các chu kỳ phát hành dài hạn; **GitHub Flow** ưu tiên sự đơn giản và tinh gọn cho các ứng dụng web triển khai liên tục; và **Trunk-Based Development** tối ưu hóa tốc độ tích hợp cao nhất cho các tổ chức sở hữu hạ tầng CI/CD tự động hóa vượt trội.',
    why:
      'Áp dụng sai workflow là nguyên nhân hàng đầu gây lãng phí năng suất kỹ thuật: bắt một startup web 3 người dùng mô hình Git Flow cồng kềnh với 5 loại nhánh sẽ khiến tiến độ bị đình trệ vì thủ tục hành chính; ngược lại, ép một nhóm phát triển firmware thiết bị y tế dùng Trunk-Based khi chưa có kiểm thử tự động sẽ tiềm ẩn nguy cơ thảm họa an toàn nghiêm trọng. Hiểu sâu bản chất giúp bạn chọn đúng công cụ cho đúng bài toán.',
    mentalModel:
      'Hãy so sánh ba mô hình với các phương tiện giao thông. **Git Flow** giống như một đoàn tàu hỏa chở hàng siêu trường: chạy theo lịch trình biểu giờ cố định nghiêm ngặt, có nhiều toa kiểm soát an toàn, cực kỳ khó trật bánh nhưng không thể đổi hướng tức thì. **GitHub Flow** giống như một chiếc xe ô tô cá nhân: linh hoạt, gọn gàng, có thể xuất phát bất cứ lúc nào bạn muốn, chỉ cần tuân thủ làn đường chính. Còn **Trunk-Based Development** giống như một đoàn xe đua F1 tốc độ cao: cực nhanh, yêu cầu kỹ năng lái điêu luyện và đội ngũ kỹ thuật pit-stop (hệ thống CI) hỗ trợ tức thì từng giây.',
    diagram: `Bảng ma trận so sánh 3 mô hình Workflow hàng đầu:
┌─────────────────┬──────────────┬──────────────┬────────────────────────┐
│ Tiêu chí        │ Git Flow     │ GitHub Flow  │ Trunk-Based Dev        │
├─────────────────┼──────────────┼──────────────┼────────────────────────┤
│ Độ phức tạp     │ Cao (5 nhánh)│ Thấp (1 chính)│ Rất thấp (1 Trunk)     │
│ Chu kỳ Release  │ Tuần / Tháng │ Vài lần/ngày │ Liên tục từng giờ      │
│ Tuổi thọ nhánh  │ Dài hạn      │ Vài ngày     │ Rất ngắn (< 1-2 ngày)  │
│ Hạ tầng CI/CD   │ Cơ bản       │ Khá          │ Rất cao (Bắt buộc)     │
│ Dự án phù hợp   │ Mobile/Enter │ Web/SaaS     │ Microservices/BigTech  │
└─────────────────┴──────────────┴──────────────┴────────────────────────┘`,
    example:
      'Một công ty phần mềm đa quốc gia quản lý hai dòng sản phẩm khác nhau. Với sản phẩm ứng dụng ngân hàng di động trên iOS/Android chịu sự kiểm duyệt khắt khe của kho ứng dụng và quy định tài chính, công ty áp dụng mô hình **Git Flow** để có giai đoạn release freeze kiểm thử an ninh toàn diện. Trong khi đó, với dịch vụ backend microservices chạy trên nền tảng đám mây AWS với hơn 1.000 ca kiểm thử tự động, đội ngũ kỹ sư áp dụng triệt để **Trunk-Based Development**, cho phép 50 lập trình viên đẩy hàng chục bản cập nhật lên production mỗi ngày mà không gặp bất kỳ sự cố nào.',
    commands: [
      'git log --oneline --graph --all',
      'git branch --list',
    ],
    explanation:
      '- `git log --graph --all`: Trực quan hóa toàn bộ biểu đồ lịch sử các nhánh để xác định chính xác nhóm bạn đang vận hành theo mô hình phân nhánh nào.\n- `git branch --list`: Liệt kê toàn bộ các nhánh đang tồn tại trong dự án để đánh giá độ phức tạp, số lượng và tuổi thọ thực tế của các nhánh.',
    mistakes: [
      'Áp dụng Git Flow máy móc cho các dự án web quy mô nhỏ cần phát triển nhanh chóng.',
      'Áp dụng Trunk-Based Development khi nhóm chưa hề có hạ tầng kiểm thử tự động (Unit Test / CI).',
      'Thay đổi workflow liên tục khiến các thành viên trong nhóm bị hoang mang và mất phương hướng.',
    ],
    labSteps: [
      'Phân tích dự án hiện tại của bạn dựa trên 4 tiêu chí: loại sản phẩm, tốc độ release, độ chín của CI và quy mô nhóm.',
      'Lựa chọn mô hình workflow tối ưu nhất và viết bản giải trình ngắn gọn lý do lựa chọn.',
    ],
    hint: 'Không có quy trình nào là hoàn hảo tuyệt đối; quy trình tốt nhất là quy trình giải quyết đúng nút thắt của đội ngũ.',
    validation: 'Giải thích được các rủi ro cụ thể nếu chọn sai workflow cho một kịch bản dự án phần mềm.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây để đối chiếu và so sánh các mô hình workflow.',
    challenge: 'Đề xuất phương án chuyển dịch từng bước từ mô hình Git Flow sang Trunk-Based Development cho một dự án đang phát triển.',
    summary: [
      'Git Flow phù hợp với các sản phẩm có lịch phát hành cố định và yêu cầu kiểm soát nhiều tầng.',
      'GitHub Flow tối ưu cho các sản phẩm web triển khai liên tục và quy mô nhóm vừa phải.',
      'Trunk-Based Development mang lại tốc độ cao nhất nhưng đòi hỏi hệ thống kiểm thử tự động cực kỳ hoàn hảo.',
    ],
    quiz: {
      id: 'quiz-06-06-workflow-comparison',
      title: 'Trắc nghiệm: So sánh các mô hình Workflow',
      questions: [
        {
          id: 'q1',
          question: 'Một công ty khởi nghiệp gồm 4 lập trình viên đang xây dựng một ứng dụng web SaaS cần deploy nhiều lần mỗi ngày thì nên chọn mô hình nào?',
          type: 'single',
          options: [
            { text: 'GitHub Flow vì tính tinh gọn, đơn giản và hỗ trợ triển khai liên tục hoàn hảo', correct: true },
            { text: 'Git Flow vì nó có đủ 5 loại nhánh phức tạp', correct: false },
            { text: 'Không dùng Git mà gửi code qua email cá nhân', correct: false },
            { text: 'Mô hình thác nước cổ điển Waterfall không phân nhánh', correct: false },
          ],
          explanation:
            'GitHub Flow là lựa chọn lý tưởng nhất cho các nhóm web nhỏ cần sự linh hoạt, tránh các tầng thủ tục rườm rà không cần thiết.',
        },
        {
          id: 'q2',
          question: 'Mô hình nào sau đây đòi hỏi hệ thống kiểm thử tự động (Automated Testing / CI) ở mức độ hoàn thiện cao nhất để hoạt động an toàn?',
          type: 'single',
          options: [
            { text: 'Trunk-Based Development', correct: true },
            { text: 'Git Flow', correct: false },
            { text: 'GitHub Flow', correct: false },
            { text: 'Lập trình một mình không chia sẻ', correct: false },
          ],
          explanation:
            'Trunk-Based Development hợp nhất code liên tục vào Trunk, do đó nếu không có CI cực mạnh để phát hiện lỗi ngay lập tức thì nhánh chính sẽ liên tục bị gãy.',
        },
        {
          id: 'q3',
          question: 'Dự án nào sau đây phù hợp nhất với mô hình Git Flow truyền thống?',
          type: 'single',
          options: [
            { text: 'Ứng dụng ngân hàng di động trên iOS/Android phát hành định kỳ mỗi tháng một lần và cần kiểm định an ninh nghiêm ngặt', correct: true },
            { text: 'Một trang blog cá nhân cập nhật bài viết mỗi giờ', correct: false },
            { text: 'Một landing page quảng cáo sự kiện tồn tại trong 3 ngày', correct: false },
            { text: 'Một kịch bản tự động hóa sao lưu dữ liệu đơn giản', correct: false },
          ],
          explanation:
            'Git Flow rất mạnh ở khâu đóng băng phiên bản (Release Freeze) để QA kiểm thử hồi quy và hỗ trợ bảo trì nhiều phiên bản cũ.',
        },
        {
          id: 'q4',
          question: 'Điểm chung quan trọng nhất giữa cả 3 mô hình GitHub Flow, Git Flow và Trunk-Based Development là gì?',
          type: 'single',
          options: [
            { text: 'Đều hướng tới việc giữ cho nhánh chính (main/trunk) luôn ổn định và sử dụng quy trình kiểm duyệt trước khi hợp nhất', correct: true },
            { text: 'Đều bắt buộc phải có nhánh develop', correct: false },
            { text: 'Đều bắt buộc các nhánh phải tồn tại ít nhất 30 ngày', correct: false },
            { text: 'Đều cấm sử dụng câu lệnh git merge', correct: false },
          ],
          explanation:
            'Dù cách thức phân nhánh khác nhau, mục tiêu tối thượng của mọi workflow chuyên nghiệp đều là bảo vệ chất lượng mã nguồn trên nhánh chính.',
        },
      ],
    },
  },
  {
    id: '07-protected-branch',
    moduleId: '06-team-workflows',
    title: 'Protected Branch',
    duration: 25,
    xp: 85,
    keywords: ['protected branch', 'bao ve nhanh', 'khoa nhanh main', 'force push prevention', 'chan push direct', 'security policy'],
    prerequisites: ['06-workflow-comparison'],
    objectives: [
      'Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.',
      'Nhận diện các mối nguy hiểm bị loại bỏ hoàn toàn bởi Protected Branch: xóa nhầm nhánh, force push đè lịch sử, push trực tiếp code lỗi.',
      'Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.',
      'Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub.',
    ],
    definition:
      'Protected Branch (Nhánh được bảo vệ) là một cơ chế kiểm soát an ninh và phân quyền do các nền tảng lưu trữ Git đám mây (như GitHub, GitLab, Bitbucket) cung cấp nhằm áp đặt các ràng buộc nghiêm ngặt lên một hoặc nhiều nhánh quan trọng (thường là `main`, `master`, hoặc `production`). Khi một nhánh được thiết lập trạng thái Protected, không một ai — kể cả lập trình viên có quyền ghi mã nguồn — có thể tùy tiện đẩy code trực tiếp, xóa nhánh hoặc thực hiện thao tác force push làm biến đổi lịch sử nếu chưa thỏa mãn các điều kiện quy định.',
    why:
      'Chỉ cần một lập trình viên gõ nhầm câu lệnh `git push origin main --force` hoặc vô tình ấn xóa nhánh chính trên giao diện đồ họa, toàn bộ công sức của cả công ty có thể biến mất trong chớp mắt, gây gián đoạn dây chuyền triển khai và làm gián đoạn dịch vụ của khách hàng. Protected Branch là lá chắn thép bảo vệ tài sản số của doanh nghiệp khỏi cả những sơ suất vô ý của con người lẫn các hành vi can thiệp trái phép, bảo đảm quy trình phát triển luôn tuân thủ đúng chuẩn.',
    mentalModel:
      'Hãy hình dung kho tiền trung tâm của một ngân hàng quốc gia. Cửa kho tiền không thể để mở toang cho bất kỳ nhân viên nào tự do ra vào ném tiền vào hay mang tiền ra tùy ý (`direct push`). Thay vào đó, cửa kho tiền luôn được khóa kiên cố (`Protected Branch`). Mọi khoản tiền gửi hay rút đều phải qua quầy giao dịch làm thủ tục, có biên lai rõ ràng (`Pull Request`) và phải có chữ ký phê duyệt của kiểm soát viên trưởng mới được phép chuyển vào bên trong.',
    diagram: `Cơ chế phòng thủ của Protected Branch trên GitHub:
Dev cố tình gõ: git push origin main
                │
                ▼
        ┌───────────────────────────────┐
        │  GitHub Branch Protection     │
        │  [X] Direct push disabled!    │ ──► TỪ CHỐI (Remote rejected!)
        │  [X] Force push disabled!     │
        └───────────────────────────────┘
                ▲
                │ Chỉ cho phép đi qua con đường duy nhất:
        [Pull Request ──► Code Review ──► CI Pass ──► Merge]`,
    example:
      'Một kỹ sư mới gia nhập dự án trong lúc bối rối đã gõ nhầm câu lệnh `git push --force origin main` từ máy cá nhân sau một thao tác rebase lỗi. Nếu là kho lưu trữ thông thường, lịch sử commit của cả dự án sẽ bị ghi đè hoàn toàn. Nhưng nhờ nhánh `main` đã được cấu hình Protected Branch từ trước, terminal của kỹ sư lập tức bật ra thông báo lỗi từ chối dứt khoát: "remote: error: GH006: Protected branch update failed for refs/heads/main. Cannot force-push to a protected branch". Kỹ sư thở phào nhẹ nhõm vì hệ thống phòng thủ đã cứu kho lưu trữ khỏi một thảm họa kỹ thuật nghiêm trọng.',
    commands: [
      'git push origin main',
      'git push origin --delete main',
      'git push --force origin main',
    ],
    explanation:
      '- `git push origin main`: Thao tác bị chặn đứng bởi Protected Branch nếu chưa qua Pull Request.\n- `git push origin --delete`: Bị từ chối tuyệt đối nhằm ngăn chặn rủi ro vô tình xóa mất nhánh chính.\n- `git push --force`: Bị vô hiệu hóa hoàn toàn để bảo vệ tính toàn vẹn của lịch sử commit.',
    mistakes: [
      'Quên kích hoạt Protected Branch cho các nhánh quan trọng khi vừa khởi tạo kho lưu trữ mới.',
      'Cấp quyền miễn trừ (Bypass) bừa bãi cho quá nhiều tài khoản khiến cơ chế bảo vệ bị vô hiệu hóa trên thực tế.',
      'Chỉ bảo vệ nhánh main mà bỏ quên các nhánh dài hạn khác như develop hay staging.',
    ],
    labSteps: [
      'Truy cập vào mục Settings -> Branches trên một repository GitHub thử nghiệm.',
      'Thử thực hiện lệnh `git push origin main` trực tiếp từ máy cá nhân và quan sát thông báo từ chối từ GitHub.',
    ],
    hint: 'Bảo vệ nhánh là việc đầu tiên kỹ sư trưởng phải làm ngay sau khi gõ git init và push commit đầu tiên.',
    validation: 'Không ai có thể xóa hoặc force push vào nhánh chính đã được bảo vệ.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về tính năng Protected Branch.',
    challenge: 'Phân tích các nguy cơ tiềm ẩn nếu một dự án cho phép các tài khoản Administrator tự do bypass các quy tắc bảo vệ nhánh.',
    summary: [
      'Protected Branch áp đặt các rào cản an ninh nghiêm ngặt bảo vệ các nhánh cốt lõi.',
      'Ngăn chặn triệt để thao tác push trực tiếp, xóa nhánh và force push phá hủy lịch sử.',
      'Bắt buộc mọi sự thay đổi mã nguồn phải đi qua con đường kiểm duyệt Pull Request.',
    ],
    quiz: {
      id: 'quiz-06-07-protected-branch',
      title: 'Trắc nghiệm: Protected Branch',
      questions: [
        {
          id: 'q1',
          question: 'Mục đích chính quan trọng nhất của việc kích hoạt Protected Branch là gì?',
          type: 'single',
          options: [
            { text: 'Ngăn chặn việc commit/push trực tiếp, cấm force-push và cấm xóa các nhánh trọng yếu của dự án', correct: true },
            { text: 'Tự động tăng tốc độ mạng Internet khi tải mã nguồn', correct: false },
            { text: 'Mã hóa toàn bộ mã nguồn để không ai đọc được nữa', correct: false },
            { text: 'Xóa toàn bộ các tệp tin không phải là code JavaScript', correct: false },
          ],
          explanation:
            'Protected Branch là lá chắn bảo vệ an ninh mã nguồn, ngăn chặn các thao tác phá hủy vô ý hoặc cố ý lên các nhánh quan trọng.',
        },
        {
          id: 'q2',
          question: 'Điều gì sẽ xảy ra khi một lập trình viên cố tình thực hiện `git push --force origin main` lên nhánh đã được bảo vệ?',
          type: 'single',
          options: [
            { text: 'Máy chủ Git từ xa sẽ từ chối lệnh và thông báo lỗi Protected branch update failed', correct: true },
            { text: 'Lệnh sẽ thành công và ghi đè lịch sử bình thường', correct: false },
            { text: 'Máy tính của lập trình viên sẽ tự động khởi động lại', correct: false },
            { text: 'GitHub sẽ xóa tài khoản cá nhân của lập trình viên đó ngay lập tức', correct: false },
          ],
          explanation:
            'Protected Branch mặc định cấm hoàn toàn thao tác force-push nhằm bảo vệ lịch sử commit không bị viết lại.',
        },
        {
          id: 'q3',
          question: 'Con đường hợp lệ DUY NHẤT để đưa mã nguồn mới vào một nhánh đã được cấu hình Protected Branch là gì?',
          type: 'single',
          options: [
            { text: 'Tạo nhánh tính năng, đẩy lên remote và mở Pull Request để kiểm duyệt trước khi hợp nhất', correct: true },
            { text: 'Commit trực tiếp vào nhánh đó bằng cờ --admin', correct: false },
            { text: 'Gửi email chứa tệp zip cho nhân viên hỗ trợ của GitHub', correct: false },
            { text: 'Tải code lên Google Drive rồi dẫn link vào README', correct: false },
          ],
          explanation:
            'Pull Request là cổng kiểm soát duy nhất cho phép mã nguồn được xem xét, kiểm thử và hợp nhất an toàn vào nhánh bảo vệ.',
        },
        {
          id: 'q4',
          question: 'Ai là người có quyền cấu hình bật/tắt hoặc chỉnh sửa các quy tắc Protected Branch trên GitHub Repository?',
          type: 'single',
          options: [
            { text: 'Chủ sở hữu kho lưu trữ (Owner) hoặc người dùng có quyền Quản trị viên (Admin)', correct: true },
            { text: 'Bất kỳ người dùng nào có quyền xem (Read access)', correct: false },
            { text: 'Tất cả mọi người dùng trên Internet', correct: false },
            { text: 'Chỉ có kỹ sư của công ty Microsoft', correct: false },
          ],
          explanation:
            'Chỉ có cấp quyền Admin hoặc Repository Owner mới có thẩm quyền thiết lập các chính sách an ninh chi phối toàn bộ dự án.',
        },
        {
          id: 'q5',
          question: 'Lựa chọn "Do not allow bypassing the above settings" trong cài đặt Protected Branch có ý nghĩa gì?',
          type: 'single',
          options: [
            { text: 'Áp dụng các quy tắc bảo vệ bình đẳng lên tất cả mọi người, kể cả Quản trị viên (Administrators)', correct: true },
            { text: 'Cho phép bất kỳ ai cũng có thể ghi đè quy tắc', correct: false },
            { text: 'Tắt toàn bộ hệ thống kiểm tra an ninh', correct: false },
            { text: 'Tự động cấp quyền quản trị cho tất cả các commit mới', correct: false },
          ],
          explanation:
            'Tùy chọn này bảo đảm nguyên tắc công bằng: không một cá nhân nào kể cả sếp hay admin được quyền phá vỡ quy trình an toàn chung.',
        },
        {
          id: 'q6',
          question: 'Ngoài nhánh `main`, những nhánh nào sau đây cũng thường xuyên được thiết lập là Protected Branch?',
          type: 'single',
          options: [
            { text: 'Các nhánh vĩnh cửu như develop, staging và các nhánh phát hành production', correct: true },
            { text: 'Các nhánh thử nghiệm ngắn hạn do lập trình viên thực tập tạo ra', correct: false },
            { text: 'Tất cả các nhánh feature ngắn hạn trong dự án', correct: false },
            { text: 'Các nhánh đã bị xóa trong thùng rác', correct: false },
          ],
          explanation:
            'Mọi nhánh đại diện cho môi trường vận hành thực tế hoặc môi trường tích hợp chung đều cần được bảo vệ cẩn mật.',
        },
      ],
    },
  },
  {
    id: '08-branch-protection-rules',
    moduleId: '06-team-workflows',
    title: 'Branch Protection Rules',
    duration: 30,
    xp: 95,
    keywords: ['branch protection rules', 'quy tac bao ve nhanh', 'require pull request reviews', 'status checks', 'require linear history', 'ci gate'],
    prerequisites: ['07-protected-branch'],
    objectives: [
      'Làm chủ toàn diện các tùy chọn chi tiết trong bộ quy tắc Branch Protection Rules trên GitHub.',
      'Thiết lập yêu cầu bắt buộc kiểm duyệt mã nguồn: số lượng người phê duyệt tối thiểu (Require approvals) và tự động vô hiệu hóa duyệt khi có commit mới.',
      'Cấu hình cổng kiểm tra trạng thái bắt buộc (Require status checks to pass) tích hợp chặt chẽ với CI/CD.',
      'Áp dụng quy tắc lịch sử tuyến tính (Require linear history) và chữ ký bảo mật (Require signed commits).',
    ],
    definition:
      'Branch Protection Rules (Các quy tắc bảo vệ nhánh chuyên sâu) là bộ công cụ thiết lập chính sách chi tiết trên các nền tảng Git hiện đại, cho phép người quản trị định nghĩa chính xác những điều kiện tiên quyết bắt buộc phải được thỏa mãn trước khi một Pull Request được phép hợp nhất vào nhánh được bảo vệ. Các điều kiện này bao gồm: số lượng kỹ sư bắt buộc phải bấm Approve, các bài kiểm thử tự động (CI Status Checks) phải báo xanh, toàn bộ các luồng thảo luận phản hồi phải được giải quyết xong, và các commit phải có chữ ký số GPG hợp lệ.',
    why:
      'Chỉ nói "hãy review code nhé" dựa trên sự tự giác là chưa đủ trong các môi trường doanh nghiệp quy mô lớn. Con người có thể quên, vội vã hoặc chủ quan bấm merge khi đoạn mã còn lỗi nghiêm trọng. Branch Protection Rules đóng vai trò như một người gác cổng cơ học tự động hóa 100%: nếu thiếu dù chỉ một chữ ký duyệt hoặc có một ca kiểm thử thất bại, nút Merge sẽ bị khóa chặt với màu xám, bảo đảm không một đoạn code kém chất lượng nào có thể lọt vào nhánh chính.',
    mentalModel:
      'Hãy hình dung quy trình cất cánh của một máy bay chở khách thương mại. Trước khi máy bay được phép rời mặt đất, cơ trưởng phải hoàn thành một Danh sách kiểm tra an toàn (Safety Checklist) bắt buộc. Kỹ sư động cơ phải ký xác nhận động cơ hoàn hảo (`Status Checks pass`), cơ phó phải đối soát lộ trình bay (`Require 1 approval`), tiếp viên trưởng xác nhận cửa đã đóng kín (`Conversations resolved`). Nếu thiếu bất kỳ một dấu tích kiểm tra nào trên bảng điện tử, trạm kiểm soát không lưu sẽ khóa quyền cất cánh.',
    diagram: `Cổng kiểm soát đa tầng của Branch Protection Rules:
Pull Request ──► [Layer 1: Phải có >= 1 Approval từ đồng nghiệp] ──► ❌ (Thiếu chữ ký -> Khóa)
                 │
                 ▼ (Đạt)
                 [Layer 2: CI Test & Linting phải PASS 100%]     ──► ❌ (Test đỏ -> Khóa)
                 │
                 ▼ (Đạt)
                 [Layer 3: Mọi bình luận phải được Resolve]      ──► ❌ (Chưa xong thảo luận -> Khóa)
                 │
                 ▼ (Đạt)
                 [Nút Merge bật xanh - Cho phép tích hợp!]`,
    example:
      'Nhóm phát triển cổng thanh toán trực tuyến cấu hình một quy tắc bảo vệ nhánh nghiêm ngặt cho `main`: yêu cầu tối thiểu 2 lượt phê duyệt từ các kỹ sư cao cấp, bắt buộc luồng CI `build-and-test` phải hoàn thành thành công trong vòng 5 phút, và yêu cầu xóa nhánh sau khi gộp. Khi lập trình viên Bình mở Pull Request thêm phương thức thanh toán ví điện tử, dù đã có một đồng nghiệp bấm Approve nhưng nút Merge trên GitHub vẫn hiển thị trạng thái "Merging is blocked". Bình kiên nhẫn chờ bài test CI tự động chạy xong và nhận thêm một lượt Approve từ kỹ sư trưởng bảo mật. Khi tất cả các biểu tượng chuyển sang dấu tích xanh lá cây, hệ thống mới mở khóa cho phép Bình nhấn nút hợp nhất an toàn.',
    commands: [
      'gh pr checks',
      'gh pr status',
      'git log --oneline --show-signature',
    ],
    explanation:
      '- `gh pr checks`: Kiểm tra danh sách các bài test tự động bắt buộc và trạng thái Pass/Fail của chúng.\n- `gh pr status`: Xem tổng quan trạng thái phê duyệt của Pull Request hiện tại trực tiếp từ dòng lệnh.\n- `git log --show-signature`: Kiểm tra tính hợp lệ của chữ ký số GPG gắn trên từng commit.',
    mistakes: [
      'Đặt số lượng reviewer bắt buộc quá cao (ví dụ >= 4) trong nhóm nhỏ: Gây tắc nghẽn công việc nghiêm trọng.',
      'Không tích chọn "Dismiss stale pull request approvals when new commits are pushed": Khiến code mới sửa sau review bị lọt mà không được xem lại.',
      'Thiết lập status checks với những bài test không ổn định (flaky tests): Khiến PR bị chặn oan uổng do lỗi môi trường mạng.',
    ],
    labSteps: [
      'Cấu hình quy tắc yêu cầu ít nhất 1 lượt review approval cho nhánh `main` trong repository thử nghiệm.',
      'Thử mở một PR và quan sát trạng thái khóa của nút Merge cho đến khi có tài khoản khác bấm Approve.',
    ],
    hint: 'Luôn bật tùy chọn tự động hủy phê duyệt cũ khi có commit mới được đẩy thêm vào Pull Request.',
    validation: 'Nút Merge trên GitHub chỉ có thể bấm được khi tất cả các bài kiểm tra đều đạt và đủ lượt phê duyệt.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về các quy tắc Branch Protection Rules chuyên sâu.',
    challenge: 'Giải thích tác động của quy tắc "Require linear history" đối với lịch sử commit của nhánh chính.',
    summary: [
      'Branch Protection Rules cung cấp các cổng kiểm soát kỹ thuật tự động hóa trước khi hợp nhất.',
      'Kết hợp chặt chẽ giữa sự thẩm định của con người (Code Review) và sự chính xác của máy móc (CI Checks).',
      'Là tiêu chuẩn bảo mật và kiểm soát chất lượng bắt buộc trong mọi dự án công nghệ chuyên nghiệp.',
    ],
    quiz: {
      id: 'quiz-06-08-branch-protection-rules',
      title: 'Trắc nghiệm: Branch Protection Rules',
      questions: [
        {
          id: 'q1',
          question: 'Tùy chọn "Require a pull request before merging" kết hợp "Require approvals" mang lại lợi ích gì?',
          type: 'single',
          options: [
            { text: 'Bắt buộc mã nguồn phải được ít nhất một số lượng đồng nghiệp chỉ định xem xét và phê duyệt trước khi được phép merge', correct: true },
            { text: 'Tự động gửi tin nhắn SMS thông báo cho toàn bộ công ty', correct: false },
            { text: 'Cho phép bất kỳ ai trên mạng cũng có quyền merge code', correct: false },
            { text: 'Tự động xóa tài khoản của người gửi Pull Request', correct: false },
          ],
          explanation:
            'Quy tắc này bảo đảm không ai có thể tự biên tự diễn đưa code lên nhánh chính mà không có sự kiểm tra chéo từ đồng nghiệp.',
        },
        {
          id: 'q2',
          question: 'Tính năng "Dismiss stale pull request approvals when new commits are pushed" hoạt động như thế nào?',
          type: 'single',
          options: [
            { text: 'Nếu tác giả đẩy thêm commit mới sau khi đã được duyệt, các lượt phê duyệt trước đó sẽ tự động bị hủy và phải duyệt lại', correct: true },
            { text: 'Tự động xóa luôn các commit mới vừa đẩy lên', correct: false },
            { text: 'Chặn không cho phép tác giả sửa lỗi nữa', correct: false },
            { text: 'Tự động chấp nhận ngay lập tức mà không cần kiểm tra', correct: false },
          ],
          explanation:
            'Tùy chọn này ngăn chặn việc tác giả vô tình hoặc cố ý thêm mã nguồn lỗi hoặc mã độc vào PR sau khi đồng nghiệp đã bấm duyệt.',
        },
        {
          id: 'q3',
          question: 'Quy tắc "Require status checks to pass before merging" có vai trò gì trong đường ống CI/CD?',
          type: 'single',
          options: [
            { text: 'Chỉ cho phép merge khi tất cả các bài kiểm tra tự động như Unit Test, Linting và Build đều vượt qua thành công', correct: true },
            { text: 'Kiểm tra xem số dư tài khoản ngân hàng của lập trình viên có đủ không', correct: false },
            { text: 'Kiểm tra tốc độ gõ bàn phím của người viết mã nguồn', correct: false },
            { text: 'Tự động bỏ qua toàn bộ các ca kiểm thử bị lỗi đỏ', correct: false },
          ],
          explanation:
            'Status checks biến hệ thống kiểm thử tự động thành cổng gác kiên cố, ngăn chặn mã nguồn vỡ build phá hỏng nhánh chính.',
        },
        {
          id: 'q4',
          question: 'Quy tắc "Require conversation resolution before merging" bảo đảm điều gì trong quá trình review?',
          type: 'single',
          options: [
            { text: 'Tất cả các bình luận góp ý và thảo luận của đồng nghiệp trên từng dòng code đều phải được phản hồi hoặc đánh dấu giải quyết xong', correct: true },
            { text: 'Bắt buộc lập trình viên phải gọi video call cho người review', correct: false },
            { text: 'Tự động xóa tất cả các bình luận có từ ngữ phê bình tiêu cực', correct: false },
            { text: 'Chỉ cho phép bình luận bằng hình ảnh động GIF', correct: false },
          ],
          explanation:
            'Bảo đảm mọi thắc mắc, phản biện và yêu cầu chỉnh sửa từ reviewer đều đã được tác giả xử lý thấu đáo trước khi hợp nhất.',
        },
        {
          id: 'q5',
          question: 'Khi quy tắc "Require linear history" được bật, điều gì sẽ bị cấm trên nhánh được bảo vệ?',
          type: 'single',
          options: [
            { text: 'Cấm các merge commit rẽ nhánh thông thường, chỉ chấp nhận hợp nhất qua Fast-Forward, Squash hoặc Rebase', correct: true },
            { text: 'Cấm tạo commit vào các ngày thứ bảy và chủ nhật', correct: false },
            { text: 'Cấm viết commit message có độ dài vượt quá 10 ký tự', correct: false },
            { text: 'Cấm sử dụng hình đại diện trên GitHub', correct: false },
          ],
          explanation:
            'Lịch sử tuyến tính (Linear history) giữ cho cây commit luôn thẳng tắp một hàng dọc, giúp việc tra cứu lịch sử và bisect cực kỳ dễ dàng.',
        },
        {
          id: 'q6',
          question: 'Quy tắc "Require signed commits" yêu cầu lập trình viên phải làm gì khi thực hiện commit mã nguồn?',
          type: 'single',
          options: [
            { text: 'Phải ký số điện tử mã hóa bằng khóa bảo mật GPG hoặc SSH để xác thực danh tính chống giả mạo tác giả', correct: true },
            { text: 'Phải in thông điệp commit ra giấy rồi ký tay bằng bút mực', correct: false },
            { text: 'Phải nộp ảnh chụp căn cước công dân vào thư mục gốc của dự án', correct: false },
            { text: 'Phải nhờ người quản lý dự án ký tên trực tiếp lên màn hình máy tính', correct: false },
          ],
          explanation:
            'Chữ ký số GPG chứng thực người commit chính là chủ nhân thực sự của khóa bảo mật, ngăn chặn hành vi giả mạo email người khác trong Git.',
        },
      ],
    },
  },
];
