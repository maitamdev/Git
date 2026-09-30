import { LessonAuthorData } from './types';

export const LEVEL_1_LESSONS: LessonAuthorData[] = [
  {
    id: '01-version-control',
    moduleId: '01-foundations',
    title: 'Version Control là gì?',
    duration: 20,
    xp: 50,
    keywords: ['vcs', 'version control', 'quan ly phien ban', 'lich su', 'source code'],
    prerequisites: [],
    objectives: [
      'Hiểu rõ bản chất và lý do ra đời của hệ thống quản lý phiên bản (Version Control System - VCS).',
      'Phân tích được các rủi ro nghiêm trọng khi phát triển phần mềm mà không có công cụ theo dõi lịch sử.',
      'Nắm bắt bức tranh tổng quan về cách các kỹ sư phần mềm chuyên nghiệp lưu vết mã nguồn.',
    ],
    definition:
      'Hệ thống quản lý phiên bản (Version Control System - viết tắt là VCS) là một tập hợp các công cụ phần mềm chuyên dụng được thiết kế nhằm mục đích ghi nhận, theo dõi và quản lý mọi sự thay đổi trên các tệp tin mã nguồn theo dòng thời gian. Khi sử dụng VCS, lập trình viên có khả năng tra cứu lại toàn bộ lịch sử phát triển của dự án, xem ai đã chỉnh sửa những dòng code nào vào thời điểm nào, đối chiếu các bản sửa đổi với nhau và khôi phục lại trạng thái hoạt động ổn định trước đó bất cứ khi nào phát sinh lỗi bất ngờ.',
    why:
      'Trong thực tế phát triển phần mềm, việc lập trình viên chỉnh sửa code dẫn đến lỗi ngoài ý muốn là điều diễn ra hàng ngày. Nếu không sử dụng Version Control, lập trình viên thường phải đối mặt với nguy cơ mất trắng dữ liệu hoặc phải duy trì hàng loạt thư mục đặt tên thủ công như project_final, project_final_v2, project_that_su_final. Cách làm này vừa tốn dung lượng ổ đĩa, vừa gây nhầm lẫn trầm trọng khi làm việc nhóm, không thể biết tệp tin nào chứa code mới nhất và hoàn toàn bất lực khi cần truy cứu trách nhiệm hoặc tái hiện lại lỗi.',
    mentalModel:
      'Hãy hình dung hệ thống Version Control giống như một cỗ máy thời gian kết hợp cùng chiếc camera an ninh ghi hình liên tục trong một xưởng chế tác nghệ thuật. Mỗi khi người nghệ nhân hoàn thành một công đoạn ưng ý, cỗ máy sẽ chụp lại một tấm ảnh lưu niệm với độ phân giải siêu nét và đánh dấu số thứ tự vào sổ nhật ký lưu trữ. Nếu công đoạn điêu khắc tiếp theo gặp sự cố làm nứt vỡ tác phẩm, người nghệ nhân chỉ cần bấm nút quay ngược thời gian để đưa khối gỗ trở về nguyên trạng thời điểm tấm ảnh đẹp nhất được ghi nhận.',
    diagram: `Thời gian ─────────────────────────────────────────────────────────►
[Bản thảo sơ khai] ──> [Bổ sung giao diện] ──> [Sửa lỗi đăng nhập]
     (Ảnh chụp 1)           (Ảnh chụp 2)            (Ảnh chụp 3 - HEAD)
          │                                              │
          └─────────── Có thể du hành quay lại ──────────┘`,
    example:
      'Hãy tưởng tượng một công ty công nghệ tài chính FinTech gồm năm kỹ sư lập trình cùng phát triển một ứng dụng ngân hàng số trực tuyến. Một kỹ sư phụ trách module xác thực vân tay, một người khác xây dựng tính năng chuyển tiền nhanh qua mã QR. Nếu cả hai người cùng mở một tệp xử lý giao dịch chung và sửa đổi mà không có hệ thống quản lý phiên bản điều phối, mã nguồn của người này sẽ ghi đè lên công sức của người kia khi lưu tệp. Nhờ có Version Control, mọi thay đổi của từng kỹ sư đều được ghi nhận riêng biệt thành các mốc rõ ràng, cho phép tích hợp an toàn mà không làm gián đoạn hệ thống thanh toán cốt lõi của ngân hàng.',
    commands: ['git --version', 'git help'],
    explanation:
      '- `git --version`: Lệnh dùng để kiểm tra phiên bản Git hiện đang được cài đặt trong hệ điều hành máy tính của bạn.\n- `git help`: Lệnh hiển thị tài liệu hướng dẫn tra cứu chi tiết danh mục các câu lệnh cơ bản của Git.',
    mistakes: [
      'Sao chép thư mục thủ công: Nhiều người mới bắt đầu học lập trình có thói quen copy-paste cả thư mục dự án ra Desktop rồi đổi tên theo ngày tháng, dẫn đến việc rối loạn phiên bản và làm đầy bộ nhớ máy tính.',
      'Sợ hãi khi gặp lỗi: Không lưu vết thường xuyên vì sợ code chưa hoàn hảo, khiến cho đến cuối ngày khi phần mềm bị crash thì không còn bất kỳ điểm phục hồi nào để quay lui an toàn.',
      'Chia sẻ mã nguồn qua tin nhắn: Gửi các tệp code rời rạc qua Zalo, Messenger hoặc Email thay vì đẩy lên kho lưu trữ tập trung, khiến các thành viên khác trong nhóm tích hợp sai lệch phiên bản.',
    ],
    labSteps: [
      'Mở terminal và gõ lệnh `git --version` để xác nhận Git đã sẵn sàng hoạt động trên hệ thống.',
      'Chạy lệnh `git help` để làm quen với danh sách các câu lệnh trợ giúp mặc định.',
      'Quan sát các thông điệp phản hồi từ giao diện dòng lệnh.',
    ],
    hint: 'Luôn kiểm tra kỹ câu lệnh trước khi bấm Enter để tránh gõ sai chính tả.',
    validation: 'Hệ thống hiển thị đúng thông tin phiên bản Git và thoát mã 0.',
    quizPrompt: 'Hãy hoàn thành bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt khái niệm Version Control.',
    challenge: 'Giải thích cho một người bạn chưa biết lập trình hiểu vì sao lập trình viên không nên lưu file theo kiểu copy-paste thủ công.',
    summary: [
      'Version Control System (VCS) là nền tảng sống còn giúp ghi nhận toàn bộ lịch sử chỉnh sửa mã nguồn của dự án.',
      'VCS loại bỏ hoàn toàn phương pháp quản lý file thủ công nguy hiểm như sao chép thư mục và gửi tệp qua chat.',
      'Cung cấp khả năng du hành thời gian, giúp lập trình viên tự tin thử nghiệm các giải pháp kiến trúc mới mà không sợ phá hỏng code cũ.',
    ],
    quiz: {
      id: 'quiz-01-version-control',
      title: 'Trắc nghiệm: Version Control là gì?',
      questions: [
        {
          id: 'q1',
          question: 'Mục đích cốt lõi nhất của một hệ thống quản lý phiên bản (VCS) là gì?',
          type: 'single',
          options: [
            { text: 'Theo dõi, ghi nhận và quản lý mọi sự thay đổi của mã nguồn theo thời gian', correct: true },
            { text: 'Biên dịch mã nguồn JavaScript sang mã máy để tăng tốc độ chạy ứng dụng', correct: false },
            { text: 'Tự động sửa lỗi cú pháp trong các tệp tin HTML và CSS', correct: false },
            { text: 'Chạy quét virus và tường lửa ngăn chặn hacker tấn công máy tính', correct: false },
          ],
          explanation:
            'VCS được thiết kế chuyên biệt để theo dõi lịch sử thay đổi của tệp tin. Việc biên dịch hay bảo mật mạng thuộc về trình biên dịch và phần mềm an ninh.',
        },
        {
          id: 'q2',
          question: 'Điều gì xảy ra khi bạn gặp lỗi nghiêm trọng trong dự án có áp dụng Version Control đúng cách?',
          type: 'single',
          options: [
            { text: 'Bạn phải xóa bỏ toàn bộ dự án và viết lại mã nguồn từ đầu', correct: false },
            { text: 'Bạn có thể khôi phục lại mã nguồn về điểm checkpoint ổn định gần nhất', correct: true },
            { text: 'Máy tính sẽ tự động định dạng lại ổ cứng để xóa sạch các lỗi phát sinh', correct: false },
            { text: 'Bạn phải liên hệ với quản trị viên mạng để mở khóa tệp tin', correct: false },
          ],
          explanation:
            'Ưu điểm lớn nhất của VCS là khả năng khôi phục (rollback) lại trạng thái snapshot ổn định trước đó trong lịch sử dự án.',
        },
        {
          id: 'q3',
          question: 'Vì sao việc đặt tên thư mục kiểu "project_v1", "project_final" lại bị coi là sai lầm trong kỹ nghệ phần mềm?',
          type: 'single',
          options: [
            { text: 'Vì hệ điều hành không cho phép đặt tên thư mục có dấu gạch dưới', correct: false },
            { text: 'Vì gây lãng phí dung lượng, dễ nhầm lẫn và không hỗ trợ làm việc nhóm an toàn', correct: true },
            { text: 'Vì Git sẽ từ chối quản lý các thư mục có từ "final"', correct: false },
            { text: 'Vì tệp tin sẽ tự động bị mã hóa và không thể mở lại được', correct: false },
          ],
          explanation:
            'Quản lý phiên bản thủ công bằng cách copy thư mục gây tốn dung lượng ổ đĩa, dễ nhầm lẫn tệp tin mới/cũ và không thể so sánh chi tiết từng dòng code thay đổi.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào cho phép xem phiên bản phần mềm Git đang chạy trên máy tính?',
          type: 'single',
          options: [
            { text: 'git --version', correct: true },
            { text: 'git check-system', correct: false },
            { text: 'git show-update', correct: false },
            { text: 'git status --all', correct: false },
          ],
          explanation:
            '`git --version` là câu lệnh chuẩn trong giao diện dòng lệnh để in ra phiên bản cài đặt của công cụ Git.',
        },
      ],
    },
  },
  {
    id: '02-vcs-types',
    moduleId: '01-foundations',
    title: 'Local / Centralized / Distributed VCS',
    duration: 25,
    xp: 60,
    keywords: ['cvcs', 'dvcs', 'local vcs', 'centralized', 'distributed', 'kien truc'],
    prerequisites: ['01-version-control'],
    objectives: [
      'Phân biệt rõ 3 thế hệ kiến trúc VCS: Cục bộ (Local), Tập trung (Centralized), và Phân tán (Distributed).',
      'Đánh giá được ưu nhược điểm cốt lõi của SVN so với Git.',
      'Hiểu vì sao mô hình phân tán (DVCS) trở thành tiêu chuẩn thống trị ngành công nghiệp phần mềm hiện đại.',
    ],
    definition:
      'Hệ thống quản lý phiên bản trải qua ba thế hệ tiến hóa kiến trúc then chốt: Local VCS (quản lý lịch sử cục bộ trên cùng một máy đơn lẻ), Centralized VCS - CVCS (lưu trữ toàn bộ lịch sử trên một máy chủ trung tâm duy nhất, ví dụ SVN, CVS), và Distributed VCS - DVCS (mọi máy tính thành viên đều sao chép toàn bộ cơ sở dữ liệu lịch sử dự án về máy cục bộ, ví dụ Git, Mercurial). Trong DVCS, mỗi lập trình viên đều sở hữu một bản sao hoàn chỉnh của kho lưu trữ, cho phép làm việc độc lập hoàn toàn mà không phụ thuộc vào kết nối mạng liên tục.',
    why:
      'Hiểu rõ sự khác biệt giữa Centralized VCS và Distributed VCS giúp bạn nắm được lý do tại sao Git lại có tốc độ xử lý vượt trội và độ an toàn dữ liệu cao đến vậy. Với CVCS truyền thống, nếu máy chủ trung tâm bị mất mạng hoặc hỏng ổ cứng, toàn bộ đội ngũ lập trình viên sẽ bị ngưng trệ công việc, không thể commit hay xem lại lịch sử. Ngược lại, DVCS loại bỏ hoàn toàn điểm nghẽn đơn độc (Single Point of Failure), bảo đảm an toàn dữ liệu tuyệt đối.',
    mentalModel:
      'Hãy so sánh CVCS giống như một cuốn sổ cái duy nhất đặt tại thư viện thành phố, ai muốn ghi chép hay tra cứu đều phải đến tận nơi xếp hàng. Nếu tòa nhà thư viện bị cháy hoặc mất điện đóng cửa, không ai có thể làm việc được nữa. Trong khi đó, DVCS giống như việc mỗi thành viên trong hội nghiên cứu đều sở hữu một máy in 3D công nghệ cao, tự động đồng bộ và in ra một cuốn sổ cái hoàn chỉnh ngay tại phòng làm việc riêng của mình.',
    diagram: `Mô hình CVCS (SVN):                 Mô hình DVCS (Git):
   [Máy chủ trung tâm]                  [Server chia sẻ]
       ▲        ▲                           ▲        ▲
       │        │                           ▼        ▼
[Máy Client A] [Máy Client B]       [Repo Client A] [Repo Client B]
(Chỉ có Working Copy)               (Có đủ 100% lịch sử và commit)`,
    example:
      'Một công ty phần mềm đa quốc gia với các chi nhánh tại Hà Nội, Tokyo và San Francisco cùng phát triển một nền tảng thương mại điện tử. Nếu sử dụng hệ thống SVN kiểu cũ, mỗi khi kỹ sư tại Hà Nội muốn tạo commit hoặc xem lịch sử code, lệnh phải gửi qua đường truyền Internet xuyên đại dương đến máy chủ đặt tại Mỹ, gây ra độ trễ hàng chục giây. Khi chuyển đổi sang Git, toàn bộ thao tác commit, tạo nhánh hay xem lịch sử diễn ra ngay tức thì trên ổ cứng máy tính tại Hà Nội, chỉ mất vài mili-giây mà không hề cần kết nối Internet.',
    commands: ['git log', 'git status'],
    explanation:
      '- `git log`: Hiển thị danh sách lịch sử toàn bộ các commit đã được ghi nhận trong kho lưu trữ cục bộ của bạn, bao gồm mã băm SHA tác giả ngày giờ và thông điệp mô tả thay đổi chi tiết.\n- `git status`: Lệnh kiểm tra tình trạng hiện tại của các tệp tin trong thư mục làm việc so với kho chứa, giúp phát hiện tệp nào đang sửa hoặc chưa đưa vào diện theo dõi.',
    mistakes: [
      'Nghĩ rằng Git cần kết nối Internet để commit: Nhiều bạn lầm tưởng không có Wi-Fi thì không dùng được Git, thực chất Git hoạt động hoàn toàn offline trên máy tính của bạn.',
      'Nhầm lẫn giữa Git và SVN: Áp đặt tư duy khóa tệp (file locking) của SVN vào mô hình phân tán của Git.',
      'Không sao lưu kho chứa lên máy chủ từ xa: Ỷ lại vào máy cá nhân mà không đẩy dữ liệu lên GitHub để dự phòng rủi ro phần cứng hỏng hóc.',
    ],
    labSteps: [
      'Kiểm tra khả năng hoạt động offline của Git bằng cách ngắt kết nối mạng hoặc thử chạy lệnh trong terminal cục bộ.',
      'Sử dụng lệnh `git status` để xem phản hồi trạng thái từ cơ sở dữ liệu nội bộ.',
      'Nhận biết rằng Git đọc dữ liệu trực tiếp từ ổ đĩa cục bộ chứ không gửi truy vấn HTTP nào ra ngoài.',
    ],
    hint: 'Mọi thao tác commit và tạo nhánh trong Git đều diễn ra tức thì trên máy của bạn.',
    validation: 'Hiểu bản chất phân tán của Git và phân biệt được với hệ thống tập trung.',
    quizPrompt: 'Kiểm tra kiến thức về các mô hình kiến trúc quản lý phiên bản qua các câu hỏi sau.',
    challenge: 'Phân tích tình huống rủi ro khi máy chủ lưu trữ chính bị hỏng trong mô hình SVN so với mô hình Git.',
    summary: [
      'Local VCS chỉ lưu trên một máy đơn lẻ; CVCS lưu tập trung trên một server trung tâm.',
      'Distributed VCS (Git) lưu đầy đủ toàn bộ cơ sở dữ liệu lịch sử trên mọi máy tính thành viên.',
      'Mô hình phân tán mang lại tốc độ cực nhanh, khả năng làm việc offline hoàn hảo và độ an toàn dữ liệu cao nhất.',
    ],
    quiz: {
      id: 'quiz-02-vcs-types',
      title: 'Trắc nghiệm: Phân loại kiến trúc VCS',
      questions: [
        {
          id: 'q1',
          question: 'Điểm khác biệt căn bản nhất giữa Distributed VCS (như Git) và Centralized VCS (như SVN) là gì?',
          type: 'single',
          options: [
            { text: 'Mỗi máy trạm trong DVCS đều có một bản sao đầy đủ của toàn bộ kho lưu trữ và lịch sử dự án', correct: true },
            { text: 'DVCS chỉ hoạt động trên hệ điều hành Linux còn CVCS chỉ chạy trên Windows', correct: false },
            { text: 'CVCS lưu code trên đám mây còn DVCS lưu code trên thẻ nhớ rời', correct: false },
            { text: 'DVCS yêu cầu phải trả phí bản quyền hàng tháng còn CVCS hoàn toàn miễn phí', correct: false },
          ],
          explanation:
            'Trong DVCS, mỗi client clone về một kho chứa đầy đủ 100% lịch sử và đối tượng dữ liệu, không phụ thuộc vào server để thực hiện các thao tác thường ngày.',
        },
        {
          id: 'q2',
          question: 'Nếu máy chủ trung tâm bị mất kết nối mạng Internet, lập trình viên sử dụng Git có thể làm những gì?',
          type: 'single',
          options: [
            { text: 'Vẫn có thể commit, tạo nhánh, kiểm tra diff và xem lịch sử bình thường trên máy cục bộ', correct: true },
            { text: 'Không thể làm bất cứ thao tác gì vì Git sẽ bị khóa hoàn toàn', correct: false },
            { text: 'Mọi dữ liệu trên máy tính sẽ tự động bị xóa sạch', correct: false },
            { text: 'Chỉ có thể đọc code chứ không được phép chỉnh sửa tệp tin', correct: false },
          ],
          explanation:
            'Vì sở hữu trọn vẹn bản sao kho lưu trữ cục bộ, lập trình viên có thể thực hiện mọi tác vụ quản lý phiên bản hoàn toàn offline.',
        },
        {
          id: 'q3',
          question: 'Khái niệm "Single Point of Failure" (Điểm nghẽn đơn độc) phản ánh nhược điểm nguy hiểm của mô hình nào?',
          type: 'single',
          options: [
            { text: 'Centralized VCS (Hệ thống quản lý phiên bản tập trung)', correct: true },
            { text: 'Distributed VCS (Hệ thống quản lý phiên bản phân tán)', correct: false },
            { text: 'Cả hai mô hình đều không bị ảnh hưởng', correct: false },
            { text: 'Mô hình điện toán đám mây hiện đại', correct: false },
          ],
          explanation:
            'Trong CVCS, nếu server trung tâm bị hỏng thì toàn bộ dự án và lịch sử bị tê liệt hoặc biến mất nếu không có backup.',
        },
        {
          id: 'q4',
          question: 'Đại diện tiêu biểu nhất của hệ thống quản lý phiên bản phân tán hiện nay là phần mềm nào?',
          type: 'single',
          options: [
            { text: 'Git', correct: true },
            { text: 'Subversion (SVN)', correct: false },
            { text: 'CVS', correct: false },
            { text: 'Microsoft Word Track Changes', correct: false },
          ],
          explanation:
            'Git do Linus Torvalds sáng lập năm 2005 là đại diện tiêu biểu và phổ biến nhất của kiến trúc DVCS.',
        },
      ],
    },
  },
  {
    id: '03-git-la-gi',
    moduleId: '01-foundations',
    title: 'Git là gì? Kiến trúc phân tán',
    duration: 25,
    xp: 60,
    keywords: ['git la gi', 'linus torvalds', 'dvcs', 'lich su git', 'dac diem'],
    prerequisites: ['02-vcs-types'],
    objectives: [
      'Nắm bắt nguồn gốc ra đời của Git do Linus Torvalds khởi xướng vào năm 2005.',
      'Hiểu rõ các triết lý thiết kế cơ bản: tốc độ, an toàn dữ liệu, hỗ trợ phân nhánh phi tuyến tính.',
      'Xác định được vai trò trung tâm của Git trong quy trình CI/CD và văn hóa DevOps hiện đại.',
    ],
    definition:
      'Git là một hệ thống quản lý phiên bản phân tán mã nguồn mở, được Linus Torvalds tạo ra vào năm 2005 nhằm phục vụ quá trình phát triển nhân hệ điều hành Linux. Git được thiết kế với mục tiêu tối thượng là tốc độ xử lý vượt bậc, cấu trúc dữ liệu đơn giản nhưng toàn vẹn, khả năng xử lý các dự án có quy mô khổng lồ và hỗ trợ mạnh mẽ quy trình làm việc phi tuyến tính với hàng ngàn nhánh làm việc song song. Mọi dữ liệu trong Git đều được đảm bảo tính toàn vẹn bằng thuật toán băm mật mã học.',
    why:
      'Hơn 95% các kỹ sư phần mềm trên toàn cầu hiện nay sử dụng Git làm công cụ quản lý mã nguồn mặc định trong công việc hàng ngày. Nắm vững Git không chỉ là một kỹ năng phụ trợ mà là yêu cầu bắt buộc tối thiểu đối với bất kỳ ai theo đuổi sự nghiệp kỹ nghệ phần mềm. Thiếu kỹ năng Git, bạn sẽ không thể tham gia vào bất kỳ dự án thực tế nào tại doanh nghiệp, không thể đóng góp vào cộng đồng mã nguồn mở và gặp vô vàn rào cản khi ứng tuyển công việc.',
    mentalModel:
      'Hãy tưởng tượng Git giống như một cuốn hộ chiếu điện tử được tích hợp chip sinh trắc học bảo mật tối cao. Mỗi trang visa được đóng dấu thị thực trong cuốn hộ chiếu đó tương ứng với một mốc commit trong lịch sử. Dấu mộc không chỉ ghi ngày giờ và địa điểm mà còn được mã hóa bằng một chuỗi chữ số mật mã học duy nhất. Bất kỳ sự tẩy xóa hay thay đổi dù chỉ một nét mực nhỏ nhất trên trang giấy cũng sẽ lập tức làm sai lệch chữ ký số và bị hệ thống từ chối.',
    diagram: `Dòng thời gian Git (Directed Acyclic Graph):
Commit A (Hash: 4a2f8b)
    │
    ▼
Commit B (Hash: 9e1c3d) ──► Nhánh tính năng [feature]
    │
    ▼
Commit C (Hash: f7d02a) ──► Nhánh chính [main] (HEAD)`,
    example:
      'Khi hàng chục ngàn kỹ sư phần mềm tại các tập đoàn công nghệ hàng đầu như Google, Microsoft, Meta hay các dự án mã nguồn mở như nhân Linux, thư viện React và Vue cùng làm việc trên hàng triệu dòng code mỗi ngày, Git chính là sợi dây liên kết bảo đảm rằng code của mọi người được tích hợp trơn tru, không xảy ra thất thoát và có thể kiểm toán minh bạch từng dòng thay đổi. Nhờ có kiến trúc phân tán phi tập trung, mỗi kỹ sư có thể tự do thử nghiệm các tính năng mới trên các nhánh riêng mà không sợ làm gián đoạn nhánh chính, sau đó dễ dàng gộp lại khi đã kiểm thử kỹ lưỡng.',
    commands: ['git --help', 'git --version'],
    explanation:
      '- `git --help`: Mở trang tra cứu hướng dẫn nhanh danh sách các lệnh Git phổ biến nhất cùng mô tả chức năng chi tiết cho từng nhóm tác vụ hàng ngày.\n- `git --version`: In ra phiên bản hiện tại của phần mềm Git trên máy tính giúp xác định các tính năng mới đã được hỗ trợ hay chưa.',
    mistakes: [
      'Nghĩ Git chỉ dành cho lập trình viên kỳ cựu: Git là kỹ năng nền tảng cơ bản mà sinh viên CNTT cần học ngay từ năm nhất.',
      'Sử dụng Git mà không hiểu bản chất con trỏ: Cố gắng học vẹt các câu lệnh mà không hiểu đồ thị liên kết commit ngầm bên dưới.',
      'Gõ lệnh một cách mù quáng: Gõ các lệnh copy từ mạng mà không đọc kỹ hướng dẫn cảnh báo an toàn dữ liệu.',
    ],
    labSteps: [
      'Mở terminal và gõ `git --help` để xem bảng tổng hợp các nhóm lệnh chính.',
      'Tìm kiếm các nhóm lệnh: start a working area, work on the current change, examine the history.',
      'Nhận biết giao diện trợ giúp chuyên nghiệp được tích hợp sẵn trong Git.',
    ],
    hint: 'Gõ `git <command> --help` bất cứ khi nào bạn muốn xem cẩm nang hướng dẫn của một lệnh cụ thể.',
    validation: 'Thực thi thành công lệnh trợ giúp và giải thích được triết lý thiết kế của Git.',
    quizPrompt: 'Trả lời các câu hỏi sau để củng cố sự hiểu biết về bản chất phần mềm Git.',
    challenge: 'Nêu 3 lý do vì sao Git lại chiếm lĩnh hoàn toàn thị phần của SVN trong vòng một thập kỷ qua.',
    summary: [
      'Git được Linus Torvalds sáng tạo năm 2005 để quản lý mã nguồn nhân Linux.',
      'Git chú trọng tối đa vào tốc độ, sự an toàn dữ liệu và mô hình phân nhánh linh hoạt.',
      'Hơn 95% ngành công nghiệp phần mềm toàn cầu hiện nay sử dụng Git làm tiêu chuẩn bắt buộc.',
    ],
    quiz: {
      id: 'quiz-03-git-la-gi',
      title: 'Trắc nghiệm: Nguồn gốc và bản chất của Git',
      questions: [
        {
          id: 'q1',
          question: 'Ai là người đã sáng tạo ra hệ thống quản lý phiên bản Git vào năm 2005?',
          type: 'single',
          options: [
            { text: 'Linus Torvalds (tác giả nhân Linux)', correct: true },
            { text: 'Bill Gates (người sáng lập Microsoft)', correct: false },
            { text: 'Mark Zuckerberg (người sáng lập Facebook)', correct: false },
            { text: 'Guido van Rossum (tác giả ngôn ngữ Python)', correct: false },
          ],
          explanation:
            'Linus Torvalds đã viết nên Git vào năm 2005 để phục vụ việc quản lý mã nguồn dự án nhân hệ điều hành Linux.',
        },
        {
          id: 'q2',
          question: 'Cơ chế nào giúp Git đảm bảo rằng nội dung tệp tin trong lịch sử không bao giờ bị can thiệp âm thầm?',
          type: 'single',
          options: [
            { text: 'Sử dụng mã băm mật mã học (Cryptographic Hash) để định danh mọi đối tượng dữ liệu', correct: true },
            { text: 'Khóa tệp tin bằng mật khẩu quản trị viên hệ điều hành', correct: false },
            { text: 'Gửi mã nguồn lên máy chủ cảnh sát mạng để xác thực định kỳ', correct: false },
            { text: 'In mã nguồn ra giấy và cất vào két sắt công ty', correct: false },
          ],
          explanation:
            'Mọi đối tượng commit, tree và blob trong Git đều được băm bằng thuật toán SHA để bảo vệ tính toàn vẹn dữ liệu.',
        },
        {
          id: 'q3',
          question: 'Đặc điểm nào dưới đây KHÔNG PHẢI là mục tiêu thiết kế ban đầu của Git?',
          type: 'single',
          options: [
            { text: 'Phụ thuộc chặt chẽ vào một máy chủ trung tâm duy nhất để hoạt động', correct: true },
            { text: 'Tốc độ xử lý cực nhanh ngay cả với dự án khổng lồ', correct: false },
            { text: 'Hỗ trợ mô hình phân nhánh song song phi tuyến tính', correct: false },
            { text: 'Khả năng vận hành offline trơn tru không cần kết nối mạng liên tục', correct: false },
          ],
          explanation:
            'Git được thiết kế để phân tán phi tập trung, xóa bỏ sự phụ thuộc vào máy chủ trung tâm duy nhất.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào hiển thị tài liệu hướng dẫn tra cứu chi tiết của lệnh `git commit`?',
          type: 'single',
          options: [
            { text: 'git commit --help', correct: true },
            { text: 'git commit --manual-search', correct: false },
            { text: 'git find commit documentation', correct: false },
            { text: 'git help-me commit', correct: false },
          ],
          explanation:
            'Cú pháp `git <command> --help` mở trang hướng dẫn tra cứu chi tiết (man page) của lệnh đó.',
        },
      ],
    },
  },
  {
    id: '04-git-architecture',
    moduleId: '01-foundations',
    title: 'Git hoạt động như thế nào?',
    duration: 25,
    xp: 70,
    keywords: ['kien truc git', 'snapshot', 'delta', 'dag', 'blob', 'tree', 'commit'],
    prerequisites: ['03-git-la-gi'],
    objectives: [
      'Phân biệt rõ ràng sự khác biệt giữa mô hình lưu trữ Delta (sự khác biệt) và Snapshot (ảnh chụp tức thời).',
      'Hiểu khái niệm Directed Acyclic Graph (DAG) và cách Git liên kết các commit bằng mã băm SHA.',
      'Nắm bắt sơ bộ cấu trúc các đối tượng cốt lõi trong Git: Blob, Tree, Commit.',
    ],
    definition:
      'Về mặt kiến trúc, Git không lưu trữ dữ liệu dưới dạng danh sách các thay đổi dòng code (Delta-based) như các hệ thống VCS truyền thống, mà lưu trữ dữ liệu dưới dạng một chuỗi các ảnh chụp tức thời hoàn chỉnh (Snapshots) của toàn bộ hệ thống tệp tin theo thời gian. Nếu một tệp không có sự thay đổi giữa các phiên bản, Git sẽ thông minh không nhân bản dữ liệu mà chỉ tạo một con trỏ liên kết trỏ lại tệp cũ đã lưu. Lịch sử của Git được tổ chức dưới dạng một đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).',
    why:
      'Nắm bắt được kiến trúc Snapshot và mô hình đồ thị DAG giúp bạn hiểu được gốc rễ mọi hành vi của Git. Khi bạn hiểu rằng nhánh (branch) thực chất chỉ là một con trỏ nhẹ có thể di chuyển trỏ đến một đỉnh trong đồ thị DAG, bạn sẽ không còn cảm thấy hoang mang khi chuyển nhánh, gộp nhánh hay giải quyết xung đột mã nguồn. Điều này biến việc học Git từ học vẹt thành tư duy trực quan sắc bén.',
    mentalModel:
      'Hãy tưởng tượng kiến trúc của Git giống như một cuốn sổ chụp ảnh gia đình qua nhiều thế hệ. Thay vì ghi chép lại rằng "năm nay bố mọc thêm một sợi râu bạc, con cao thêm hai xăng-ti-mét", người thợ ảnh chụp lại toàn bộ cả gia đình đứng trong phòng khách. Tuy nhiên, nếu chiếc bàn trà hay bộ ghế sofa không hề thay đổi sau mười năm, người thợ ảnh chỉ cần dán một mảnh giấy ghi chú mượn lại hình ảnh chiếc bàn từ album cũ, giúp cuốn sổ vừa trực quan vừa nhẹ nhàng.',
    diagram: `Hệ thống cũ (Delta):                Git (Snapshots):
File A: [V1] ──> [Δ1] ──> [Δ2]      Snapshot 1: [File A v1] [File B v1]
File B: [V1] ───────────> [Δ1]      Snapshot 2: [File A v2] [File B (trỏ v1)]
(Phải tính toán lại từ đầu)         Snapshot 3: [File A v3] [File B v2]`,
    example:
      'Khi bạn chỉnh sửa một dòng comment trong tệp `index.html` của dự án chứa hơn 500 hình ảnh và 100 tệp CSS, Git sẽ không lưu lại 500 hình ảnh đó một lần nữa. Git tạo ra một snapshot mới, trong đó tệp `index.html` được ghi nhận nội dung mới, còn 600 tệp tin còn lại chỉ được lưu dưới dạng tham chiếu trỏ về đối tượng cũ trong thư mục `.git/objects`. Nhờ vậy, kích thước kho lưu trữ của bạn cực kỳ nhỏ gọn dù trải qua hàng ngàn lần commit, đồng thời tốc độ tạo commit hay chuyển đổi giữa các nhánh diễn ra gần như tức thì mà không phải tính toán cộng dồn sự khác biệt phức tạp.',
    commands: ['git status', 'git log --oneline'],
    explanation:
      '- `git status`: Hiển thị trạng thái hiện tại của Working Tree và Staging Area so với snapshot gần nhất, giúp bạn nhìn thấy rõ các tệp tin mới tạo hoặc bị sửa đổi trước khi ghi lại phiên bản.\n- `git log --oneline`: Hiển thị danh sách các commit trong lịch sử rút gọn trên một dòng với mã băm ngắn và thông điệp, tương ứng trực quan với các nút trên đồ thị DAG.',
    mistakes: [
      'Nghĩ rằng Git lưu từng dòng code khác biệt: Git thực chất lưu trọn vẹn snapshot nội dung tệp tin và trỏ tái sử dụng tệp không đổi.',
      'Sợ rằng dự án lớn sẽ làm Git bị phình to dung lượng: Nhờ cơ chế lưu trữ snapshot thông minh và nén packfile, Git quản lý dung lượng vô cùng tối ưu.',
      'Nghĩ commit là một bản vá độc lập: Commit trong Git luôn chứa liên kết tham chiếu đến commit cha của nó trong đồ thị DAG.',
    ],
    labSteps: [
      'Thực hiện kiểm tra trạng thái ban đầu của kho lưu trữ bằng lệnh `git status`.',
      'Quan sát cách Git theo dõi sự khác biệt giữa thư mục làm việc và snapshot gần nhất.',
      'Sử dụng `git log --oneline` để hình dung các đỉnh của đồ thị lịch sử.',
    ],
    hint: 'Mỗi commit đại diện cho một ảnh chụp Snapshot toàn diện của dự án tại một thời điểm.',
    validation: 'Phân biệt chính xác giữa mô hình Delta và Snapshot trong Git.',
    quizPrompt: 'Hoàn thành các câu hỏi dưới đây để kiểm tra kiến thức về kiến trúc Snapshot của Git.',
    challenge: 'Vẽ sơ đồ biểu diễn 3 commit liên tiếp trong Git và giải thích cách các commit cha-con liên kết với nhau.',
    summary: [
      'Git lưu trữ lịch sử dưới dạng chuỗi các ảnh chụp tức thời (Snapshots) thay vì sự khác biệt tệp (Deltas).',
      'Nếu một tệp không thay đổi, Git chỉ trỏ lại blob dữ liệu cũ mà không hề sao chép lãng phí dung lượng.',
      'Lịch sử commit trong Git tạo thành một đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).',
    ],
    quiz: {
      id: 'quiz-04-git-architecture',
      title: 'Trắc nghiệm: Kiến trúc lưu trữ của Git',
      questions: [
        {
          id: 'q1',
          question: 'Git lưu trữ dữ liệu của các mốc lịch sử theo mô hình nào dưới đây?',
          type: 'single',
          options: [
            { text: 'Các ảnh chụp tức thời hoàn chỉnh (Snapshots)', correct: true },
            { text: 'Danh sách các dòng code thay đổi khác biệt (Deltas)', correct: false },
            { text: 'Các tệp tin nén zip chứa toàn bộ hệ điều hành', correct: false },
            { text: 'Bảng dữ liệu quan hệ SQL theo từng cột dòng', correct: false },
          ],
          explanation:
            'Git coi dữ liệu như một chuỗi các snapshot của hệ thống tệp tin tại từng thời điểm commit.',
        },
        {
          id: 'q2',
          question: 'Điều gì xảy ra khi bạn tạo một commit mới nhưng có rất nhiều tệp tin không hề bị chỉnh sửa?',
          type: 'single',
          options: [
            { text: 'Git chỉ lưu một con trỏ tham chiếu trỏ lại tệp tin cũ đã có trong cơ sở dữ liệu', correct: true },
            { text: 'Git nhân bản toàn bộ các tệp tin đó sang thư mục mới gây tốn dung lượng', correct: false },
            { text: 'Git tự động xóa bỏ các tệp tin không bị chỉnh sửa khỏi dự án', correct: false },
            { text: 'Git báo lỗi từ chối commit vì tệp tin không có sự thay đổi', correct: false },
          ],
          explanation:
            'Để tối ưu tốc độ và dung lượng, Git tái sử dụng con trỏ tới các blob tệp tin cũ không có thay đổi.',
        },
        {
          id: 'q3',
          question: 'Cấu trúc dữ liệu nào được Git sử dụng để tổ chức mối liên kết lịch sử giữa các commit?',
          type: 'single',
          options: [
            { text: 'Directed Acyclic Graph - DAG (Đồ thị có hướng không chu trình)', correct: true },
            { text: 'Mảng một chiều tuyến tính cố định kích thước', correct: false },
            { text: 'Ngăn xếp theo nguyên lý vào trước ra trước (FIFO Queue)', correct: false },
            { text: 'Bảng băm đơn cấp không có con trỏ cha con', correct: false },
          ],
          explanation:
            'Lịch sử Git là một DAG (Directed Acyclic Graph), trong đó mỗi commit trỏ về một hoặc nhiều commit cha của nó.',
        },
        {
          id: 'q4',
          question: 'Mã băm SHA của một commit trong Git được sinh ra dựa trên những yếu tố nào?',
          type: 'single',
          options: [
            { text: 'Nội dung cây thư mục, thông điệp commit, tác giả, thời gian và mã hash của commit cha', correct: true },
            { text: 'Chỉ dựa trên số thứ tự commit do người dùng tự nhập', correct: false },
            { text: 'Tên của máy tính và địa chỉ IP kết nối mạng của bạn', correct: false },
            { text: 'Số lượng dòng code có trong tệp tin lớn nhất của dự án', correct: false },
          ],
          explanation:
            'Mã băm SHA là hàm mật mã học tính toán từ toàn bộ dữ liệu nội dung, siêu dữ liệu tác giả, ngày giờ và cha của commit.',
        },
      ],
    },
  },
  {
    id: '05-git-vs-github',
    moduleId: '01-foundations',
    title: 'Phân biệt Git vs GitHub',
    duration: 20,
    xp: 50,
    keywords: ['git vs github', 'phan biet', 'cloud', 'hosting', 'collaboration'],
    prerequisites: ['04-git-architecture'],
    objectives: [
      'Phân biệt rạch ròi giữa công cụ dòng lệnh Git và dịch vụ nền tảng lưu trữ đám mây GitHub.',
      'Kể tên các dịch vụ tương đương với GitHub như GitLab, Bitbucket.',
      'Hiểu cách Git và GitHub phối hợp để tạo nên quy trình làm việc nhóm chuyên nghiệp.',
    ],
    definition:
      'Git và GitHub là hai khái niệm hoàn toàn khác biệt nhưng bổ trợ chặt chẽ cho nhau. Git là phần mềm quản lý phiên bản mã nguồn mở chạy trực tiếp trên máy tính cá nhân cục bộ của bạn, chịu trách nhiệm lưu vết và kiểm soát lịch sử code. Trong khi đó, GitHub là một dịch vụ nền tảng đám mây trực tuyến thuộc sở hữu của tập đoàn Microsoft, cung cấp máy chủ lưu trữ từ xa cho các kho mã nguồn Git, bổ sung giao diện đồ họa trực quan và các tính năng cộng tác nhóm cao cấp như Pull Request, Code Review, Issue Tracking và GitHub Actions.',
    why:
      'Rất nhiều bạn sinh viên mới tiếp xúc với ngành công nghệ thông tin thường đánh đồng Git và GitHub là một. Sự ngộ nhận này dẫn đến việc không hiểu rõ tại sao máy tính không có mạng vẫn dùng được Git, hoặc lúng túng khi doanh nghiệp sử dụng GitLab hoặc Bitbucket thay vì GitHub. Phân biệt rõ hai khái niệm này giúp bạn có cái nhìn chuẩn xác về kiến trúc hạ tầng và tự tin làm việc trong bất kỳ môi trường công nghệ nào.',
    mentalModel:
      'Hãy tưởng tượng mối quan hệ giữa Git và GitHub giống như mối quan hệ giữa động cơ xe hơi và bãi đỗ xe thông minh. Git chính là cỗ động cơ mạnh mẽ được lắp đặt ngay bên trong chiếc xe của bạn, cho phép bạn khởi động, lái xe, chuyển số và phanh dừng bất cứ lúc nào. Còn GitHub chính là một tòa nhà bãi đỗ xe trung tâm hiện đại, nơi bạn có thể gửi chiếc xe của mình lên đó để chia sẻ cho bạn bè cùng mượn, cùng chiêm ngưỡng và bảo trì.',
    diagram: `Máy tính cá nhân (Local):            Đám mây (Remote Cloud):
┌───────────────────────────┐         ┌───────────────────────────┐
│ Git Engine (Dòng lệnh)    │ ──push─►│ GitHub / GitLab           │
│ - Lưu snapshot cục bộ     │ ◄─pull──│ - Lưu trữ kho mã nguồn    │
│ - Hoạt động hoàn toàn     │         │ - Pull Request, Review    │
│   offline trên ổ đĩa      │         │ - Issue Tracking, Actions │
└───────────────────────────┘         └───────────────────────────┘`,
    example:
      'Bạn ngồi trên một chuyến tàu hỏa vùng cao hoàn toàn không có sóng điện thoại hay Wi-Fi. Bạn vẫn có thể mở máy tính xách tay, sử dụng Git để tạo các nhánh tính năng, viết code và thực hiện hàng chục commit liên tiếp. Khi chuyến tàu về đến ga trung tâm và máy tính bắt sóng Wi-Fi trở lại, bạn chỉ cần gõ lệnh `git push` để đẩy toàn bộ các commit bạn đã làm trên tàu lên kho chứa của công ty trên GitHub để đồng nghiệp tại văn phòng có thể review. Điều này chứng minh sức mạnh độc lập tuyệt đối của công cụ Git cục bộ mà không hề bị phụ thuộc thời gian thực vào các dịch vụ lưu trữ đám mây như GitHub.',
    commands: ['git remote -v', 'git push', 'git pull'],
    explanation:
      '- `git remote -v`: Liệt kê danh sách các đường dẫn URL của kho lưu trữ từ xa đang liên kết với máy bạn kèm quyền đọc ghi fetch và push.\n- `git push`: Đẩy các commit snapshot từ máy tính cục bộ lên nhánh tương ứng trên máy chủ đám mây GitHub.\n- `git pull`: Tải về và tự động gộp các thay đổi mới nhất từ kho chứa GitHub về thư mục làm việc trên máy tính cục bộ.',
    mistakes: [
      'Nghĩ Git và GitHub là cùng một sản phẩm: Git là công cụ phần mềm cục bộ, GitHub là website dịch vụ đám mây.',
      'Nghĩ không có GitHub thì không học được Git: Bạn hoàn toàn có thể thực hành thành thạo mọi câu lệnh Git căn bản mà không cần tạo tài khoản GitHub.',
      'Bối rối khi công ty dùng GitLab: Bản chất câu lệnh Git ở máy bạn vẫn giống nhau 100%, chỉ khác địa chỉ máy chủ lưu trữ từ xa.',
    ],
    labSteps: [
      'Chạy lệnh `git remote -v` trong terminal để kiểm tra xem repository hiện tại đã kết nối với máy chủ từ xa nào chưa.',
      'Quan sát rằng nếu chưa cấu hình remote, lệnh sẽ không in ra địa chỉ URL nào.',
      'Xác nhận rằng kho chứa Git cục bộ hoàn toàn độc lập với dịch vụ GitHub.',
    ],
    hint: 'Git chạy trên máy bạn; GitHub chạy trên máy chủ đám mây của Microsoft.',
    validation: 'Phân biệt chính xác vai trò của Git cục bộ và nền tảng đám mây GitHub.',
    quizPrompt: 'Làm bài trắc nghiệm sau để xác thực sự phân biệt giữa Git và GitHub.',
    challenge: 'Kể tên 3 nền tảng lưu trữ mã nguồn đám mây phổ biến trên thế giới ngoài GitHub.',
    summary: [
      'Git là công cụ quản lý phiên bản dòng lệnh chạy cục bộ trên máy tính cá nhân.',
      'GitHub là dịch vụ web lưu trữ kho mã nguồn Git trên đám mây kèm công cụ cộng tác nhóm.',
      'Ngoài GitHub còn có nhiều giải pháp lưu trữ Git uy tín khác như GitLab, Bitbucket, Gitea.',
    ],
    quiz: {
      id: 'quiz-05-git-vs-github',
      title: 'Trắc nghiệm: Phân biệt Git và GitHub',
      questions: [
        {
          id: 'q1',
          question: 'Phát biểu nào sau đây miêu tả chính xác nhất bản chất của Git?',
          type: 'single',
          options: [
            { text: 'Là công cụ phần mềm quản lý phiên bản phân tán chạy trực tiếp trên máy tính cá nhân', correct: true },
            { text: 'Là một mạng xã hội dành cho các lập trình viên đăng ảnh bài viết', correct: false },
            { text: 'Là một ngôn ngữ lập trình mới dùng để thay thế JavaScript', correct: false },
            { text: 'Là một trang web tuyển dụng việc làm công nghệ thông tin', correct: false },
          ],
          explanation:
            'Git là phần mềm mã nguồn mở chạy cục bộ để quản lý phiên bản mã nguồn.',
        },
        {
          id: 'q2',
          question: 'GitHub đóng vai trò gì trong hệ sinh thái phát triển phần mềm?',
          type: 'single',
          options: [
            { text: 'Là dịch vụ đám mây lưu trữ các kho Git từ xa và hỗ trợ cộng tác nhóm chuyên nghiệp', correct: true },
            { text: 'Là hệ điều hành dùng để cài đặt lên máy chủ thay thế Linux', correct: false },
            { text: 'Là trình duyệt web tốc độ cao cạnh tranh với Google Chrome', correct: false },
            { text: 'Là phần mềm diệt virus bảo vệ mã nguồn máy tính', correct: false },
          ],
          explanation:
            'GitHub là nền tảng máy chủ đám mây lưu trữ repo Git và bổ sung tính năng cộng tác nhóm.',
        },
        {
          id: 'q3',
          question: 'Nếu bạn làm việc tại một công ty bảo mật không cho phép đưa code lên mạng Internet, bạn sẽ làm gì?',
          type: 'single',
          options: [
            { text: 'Vẫn sử dụng Git bình thường và có thể lưu trữ trên máy chủ nội bộ GitLab riêng của công ty', correct: true },
            { text: 'Bắt buộc phải bỏ dùng Git và quay về cách copy paste thủ công', correct: false },
            { text: 'Không thể lập trình được vì Git bắt buộc phải kết nối Internet', correct: false },
            { text: 'Phải xin phép ban quản trị GitHub để mở kênh bí mật', correct: false },
          ],
          explanation:
            'Git hoạt động độc lập và hoàn toàn có thể tự dựng máy chủ nội bộ (on-premises) bằng GitLab hoặc Gitea.',
        },
        {
          id: 'q4',
          question: 'Dịch vụ nào dưới đây có tính năng tương đương với GitHub?',
          type: 'single',
          options: [
            { text: 'GitLab và Bitbucket', correct: true },
            { text: 'Photoshop và Illustrator', correct: false },
            { text: 'VLC Media Player', correct: false },
            { text: 'Microsoft Excel', correct: false },
          ],
          explanation:
            'GitLab và Bitbucket là hai nền tảng lưu trữ và cộng tác mã nguồn Git tương đương với GitHub.',
        },
      ],
    },
  },
  {
    id: '06-git-installation',
    moduleId: '01-foundations',
    title: 'Cài đặt & Môi trường Git',
    duration: 20,
    xp: 50,
    keywords: ['cai dat git', 'git bash', 'terminal', 'cli', 'moi truong'],
    prerequisites: ['05-git-vs-github'],
    objectives: [
      'Nắm bắt các phương thức cài đặt Git trên các hệ điều hành phổ biến: Windows, macOS, Linux.',
      'Hiểu vai trò của Git Bash trên môi trường Windows.',
      'Làm quen với các tùy chọn cấu hình dòng kết thúc tệp tin (crlf vs lf) khi cài đặt.',
    ],
    definition:
      'Cài đặt Git là quy trình thiết lập bộ công cụ dòng lệnh Git (Git CLI) lên hệ điều hành máy tính cá nhân. Trên hệ điều hành Windows, gói cài đặt Git for Windows cung cấp công cụ Git Bash - một môi trường giả lập shell Unix cho phép lập trình viên thực thi các lệnh bash quen thuộc. Quá trình cài đặt bao gồm việc thiết lập biến môi trường PATH để câu lệnh `git` có thể được gọi từ bất kỳ cửa sổ dòng lệnh nào trên hệ thống.',
    why:
      'Một môi trường Git được cài đặt chuẩn xác là nền móng bảo đảm các công cụ soạn thảo như Visual Studio Code, JetBrains IDE hay terminal có thể nhận diện và thao tác trơn tru với kho lưu trữ. Nếu cài đặt sai tùy chọn kết thúc dòng (Line Ending) giữa Windows (CRLF) và Linux/macOS (LF), dự án của bạn sẽ liên tục gặp cảnh báo giả mạo rằng toàn bộ file bị sửa đổi dù bạn chưa hề gõ một chữ nào.',
    mentalModel:
      'Hãy hình dung việc cài đặt Git giống như việc lắp đặt một bộ đồ nghề cơ khí đa năng vào cốp xe của bạn. Bộ đồ nghề này bao gồm đủ các loại cờ-lê, mỏ-lết và tuốc-nơ-vít tiêu chuẩn quốc tế. Dù chiếc xe của bạn mang thương hiệu gì (Windows, macOS hay Linux), chỉ cần có bộ đồ nghề này bên mình, bạn đều có thể xử lý và bảo trì chiếc xe theo cùng một tiêu chuẩn kỹ thuật thống nhất.',
    diagram: `Hệ điều hành:
┌───────────────────────────────────────────────┐
│ Windows / macOS / Linux                       │
│   ┌─────────────────────────────────────────┐ │
│   │ Biến môi trường PATH                    │ │
│   │   └─► /usr/bin/git  hoặc  git.exe        │ │
│   └─────────────────────────────────────────┘ │
│                     ▲                         │
│                     │ (gọi lệnh)              │
│       [Terminal / VS Code / Git Bash]         │
└───────────────────────────────────────────────┘`,
    example:
      'Một lập trình viên sử dụng máy tính Windows tham gia vào dự án phát triển backend chạy trên máy chủ Ubuntu Linux. Khi cài đặt Git, lập trình viên chọn tùy chọn `core.autocrlf = true`. Khi tải code từ Linux về Windows, Git tự động chuyển đổi ký tự xuống dòng sang CRLF để hiển thị đúng trong Notepad, và khi commit đẩy lên server, Git tự động chuyển đổi ngược lại thành LF. Nhờ đó, các kỹ sư dùng máy tính khác nhau không bao giờ bị xung đột định dạng dòng vô cớ, giúp quy trình tích hợp liên tục CI/CD diễn ra hoàn toàn êm đẹp mà không bị gián đoạn kiểm thử.',
    commands: ['git --version', 'git config --system --list'],
    explanation:
      '- `git --version`: Xác nhận công cụ Git đã được cài đặt thành công và đường dẫn thực thi đã được tích hợp chuẩn xác vào biến môi trường PATH của hệ điều hành.\n- `git config --system --list`: Hiển thị toàn bộ các thiết lập cấu hình ở cấp độ toàn hệ thống máy tính, áp dụng chung cho mọi tài khoản người dùng đăng nhập.',
    mistakes: [
      'Không tích hợp Git vào biến môi trường PATH: Khiến cho terminal thông báo lỗi `command not found: git`.',
      'Chọn sai cấu hình xuống dòng: Dẫn đến việc Git báo toàn bộ dòng code bị thay đổi định dạng ký tự trắng ẩn.',
      'Sợ hãi giao diện dòng lệnh (CLI): Cố gắng tìm phần mềm đồ họa ngay từ đầu thay vì rèn luyện bản chất câu lệnh.',
    ],
    labSteps: [
      'Mở terminal và gõ lệnh `git --version` để kiểm tra môi trường.',
      'Xác nhận thông điệp trả về có dạng `git version 2.x.x`.',
      'Thử nghiệm gọi lệnh `git` không có đối số để xem gợi ý sử dụng cơ bản.',
    ],
    hint: 'Giao diện dòng lệnh (CLI) là cách nhanh nhất và chính xác nhất để điều khiển Git.',
    validation: 'Lệnh `git --version` thực thi thành công trả về mã thoát 0.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về cài đặt môi trường Git.',
    challenge: 'Giải thích sự khác nhau giữa ký tự xuống dòng CRLF trên Windows và LF trên Unix/Linux.',
    summary: [
      'Cài đặt Git CLI là bước đầu tiên để sử dụng Git trên bất kỳ hệ điều hành nào.',
      'Git for Windows cung cấp môi trường Git Bash mô phỏng chuẩn dòng lệnh Unix.',
      'Cần chú ý thiết lập chuẩn xuống dòng để tránh xung đột định dạng khi làm việc nhóm đa nền tảng.',
    ],
    quiz: {
      id: 'quiz-06-git-installation',
      title: 'Trắc nghiệm: Cài đặt và môi trường Git',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh nào dùng để kiểm tra xem Git đã được cài đặt thành công trên máy tính hay chưa?',
          type: 'single',
          options: [
            { text: 'git --version', correct: true },
            { text: 'git --verify-install', correct: false },
            { text: 'git ping', correct: false },
            { text: 'git test-connection', correct: false },
          ],
          explanation:
            '`git --version` kiểm tra sự tồn tại của file thực thi git trong PATH và in ra số hiệu phiên bản.',
        },
        {
          id: 'q2',
          question: 'Git Bash trên hệ điều hành Windows cung cấp môi trường gì cho người dùng?',
          type: 'single',
          options: [
            { text: 'Môi trường giả lập shell Unix cho phép chạy các lệnh bash tiêu chuẩn', correct: true },
            { text: 'Trình chỉnh sửa ảnh đồ họa chuyên nghiệp cho tệp tin README', correct: false },
            { text: 'Trình biên dịch mã nguồn Java sang mã máy', correct: false },
            { text: 'Phần mềm phát video trực tuyến từ YouTube', correct: false },
          ],
          explanation:
            'Git Bash mang toàn bộ các tiện ích dòng lệnh quen thuộc của Unix (ls, rm, cat, echo) lên Windows.',
        },
        {
          id: 'q3',
          question: 'Lỗi "git: command not found" thường xuất phát từ nguyên nhân nào?',
          type: 'single',
          options: [
            { text: 'Git chưa được cài đặt hoặc đường dẫn chưa được thêm vào biến môi trường PATH', correct: true },
            { text: 'Máy tính của bạn chưa cắm dây mạng Internet', correct: false },
            { text: 'Màn hình máy tính bị thiếu độ phân giải cao', correct: false },
            { text: 'Bạn chưa tạo tài khoản người dùng trên GitHub', correct: false },
          ],
          explanation:
            'Lỗi `command not found` xuất hiện khi shell không tìm thấy tệp thực thi git trong các thư mục của biến PATH.',
        },
        {
          id: 'q4',
          question: 'Ký tự kết thúc dòng (Line Ending) mặc định trên Windows và Linux lần lượt là gì?',
          type: 'single',
          options: [
            { text: 'Windows dùng CRLF, Linux dùng LF', correct: true },
            { text: 'Windows dùng LF, Linux dùng CRLF', correct: false },
            { text: 'Cả hai hệ điều hành đều dùng chung một chuẩn không phân biệt', correct: false },
            { text: 'Windows dùng XML, Linux dùng JSON', correct: false },
          ],
          explanation:
            'Windows sử dụng cặp ký tự Carriage Return + Line Feed (CRLF: \\r\\n), trong khi Unix/Linux/macOS dùng Line Feed (LF: \\n).',
        },
      ],
    },
  },
  {
    id: '07-git-config',
    moduleId: '01-foundations',
    title: 'Cấu hình danh tính Git Config',
    duration: 25,
    xp: 70,
    keywords: ['git config', 'user.name', 'user.email', 'danh tinh', 'author'],
    prerequisites: ['06-git-installation'],
    objectives: [
      'Sử dụng thành thạo lệnh `git config` để thiết lập danh tính lập trình viên: user.name và user.email.',
      'Phân biệt rõ 3 cấp độ cấu hình: --system, --global, và --local.',
      'Hiểu tầm quan trọng của việc dùng đúng email đồng bộ với tài khoản GitHub để hiển thị đóng góp (contribution).',
    ],
    definition:
      '`git config` là câu lệnh thiết lập và truy vấn các biến cấu hình điều khiển giao diện và hành vi hoạt động của Git. Hai tham số quan trọng nhất bắt buộc phải cấu hình đầu tiên trên mọi máy tính mới là `user.name` (họ tên lập trình viên) và `user.email` (địa chỉ thư điện tử). Các thông tin này sẽ được gắn cố định vào mọi commit mà bạn tạo ra để xác định danh tính tác giả (author). Git hỗ trợ ba cấp độ cấu hình có độ ưu tiên tăng dần: system (toàn máy), global (toàn tài khoản người dùng), và local (riêng cho từng kho chứa cụ thể).',
    why:
      'Nếu không cấu hình `user.name` và `user.email`, Git sẽ từ chối không cho phép bạn tạo commit, hoặc sẽ tự động lấy tên tài khoản đăng nhập máy tính kèm địa chỉ hostname cục bộ kỳ quặc. Nghiêm trọng hơn, nếu bạn dùng email không khớp với tài khoản GitHub, toàn bộ commit bạn dày công đóng góp cho dự án sẽ không được ghi nhận biểu đồ đóng góp (xanh ô contribution graph) trên trang cá nhân GitHub của bạn.',
    mentalModel:
      'Hãy hình dung việc thiết lập `git config` giống như việc bạn khắc một con dấu mộc chữ ký cá nhân bằng đồng. Mỗi khi bạn ký kết một hợp đồng kinh tế (tạo một commit), bạn sẽ đóng con dấu mộc có tên và email của mình lên góc dưới văn bản. Mọi đối tác và thành viên trong dự án khi nhìn vào văn bản đó đều biết chính xác ai là người chịu trách nhiệm cho các điều khoản và thay đổi vừa thực hiện.',
    diagram: `Các cấp độ cấu hình Git (Ưu tiên từ dưới lên trên):
┌───────────────────────────────────────────────┐
│ --system: Cấu hình cho mọi người dùng trên PC │
└───────────────────────────────────────────────┘
                       ▲
┌───────────────────────────────────────────────┐
│ --global: Cấu hình cho tài khoản người dùng   │
└───────────────────────────────────────────────┘
                       ▲
┌───────────────────────────────────────────────┐
│ --local: Cấu hình riêng cho 1 repository này  │ (Độ ưu tiên cao nhất)
└───────────────────────────────────────────────┘`,
    example:
      'Kỹ sư Nguyễn Văn A sử dụng máy tính xách tay cá nhân để vừa làm việc cho công ty vừa tham gia dự án mã nguồn mở ngoài giờ. Ở cấp độ toàn cục (`--global`), kỹ sư thiết lập email cá nhân `anguyen@gmail.com`. Nhưng khi làm việc trong thư mục dự án của công ty, kỹ sư mở terminal tại kho chứa đó và cấu hình cục bộ (`--local`): `git config user.email "a.nguyen@company.vn"`. Khi đó, các commit trong dự án công ty sẽ mang danh tính email doanh nghiệp được xác thực, còn các dự án cá nhân khác trên cùng máy tính vẫn dùng email riêng tư mà không hề bị xung đột hay rò rỉ thông tin.',
    commands: [
      'git config --global user.name "Nguyen Van A"',
      'git config --global user.email "vana@example.com"',
      'git config --list',
    ],
    explanation:
      '- `git config --global user.name "Tên Tác Giả"`: Thiết lập họ tên hiển thị của bạn cho toàn bộ các repository trên máy tính cá nhân.\n- `git config --global user.email "email@domain.com"`: Thiết lập địa chỉ thư điện tử gắn chặt vào siêu dữ liệu của từng commit.\n- `git config --list`: Liệt kê toàn bộ danh sách các thông số cấu hình Git đang có hiệu lực trên hệ thống.',
    mistakes: [
      'Gõ sai địa chỉ email: Dùng email phụ hoặc sai chính tả khiến GitHub không nhận diện được tác giả và không tích điểm xanh trên trang cá nhân.',
      'Nghĩ git config là mật khẩu đăng nhập: `user.name` và `user.email` chỉ là chữ ký nhãn thông tin, không phải thông tin bảo mật hay mật khẩu tài khoản.',
      'Quên kiểm tra lại sau khi cấu hình: Không chạy `git config --list` để xác nhận lại thông tin đã lưu chính xác hay chưa.',
    ],
    labSteps: [
      'Chạy lệnh `git config user.name "Student Name"` để cấu hình danh tính của bạn.',
      'Chạy lệnh `git config user.email "student@git.academy"` để thiết lập địa chỉ thư điện tử.',
      'Sử dụng `git config --list` để kiểm tra danh sách cấu hình và xác nhận kết quả.',
    ],
    hint: 'Sử dụng cờ `--global` khi muốn áp dụng cấu hình cho mọi dự án trên máy.',
    validation: 'Kiểm tra `git config user.name` và `user.email` trả về đúng chuỗi đã thiết lập.',
    quizPrompt: 'Hãy thực hiện bài trắc nghiệm sau về cách sử dụng lệnh git config.',
    challenge: 'Nêu thứ tự ưu tiên ghi đè giữa 3 cấp độ: --system, --global và --local.',
    summary: [
      '`git config` là câu lệnh thiết lập danh tính tác giả và hành vi của Git.',
      '`user.name` và `user.email` được nhúng vĩnh viễn vào siêu dữ liệu của mỗi commit.',
      'Thứ tự ưu tiên cấu hình tăng dần: System -> Global -> Local (Local ghi đè Global).',
    ],
    quiz: {
      id: 'quiz-07-git-config',
      title: 'Trắc nghiệm: Cấu hình danh tính với git config',
      questions: [
        {
          id: 'q1',
          question: 'Hai thông số cấu hình tối thiểu bắt buộc phải thiết lập trước khi tạo commit đầu tiên là gì?',
          type: 'single',
          options: [
            { text: 'user.name và user.email', correct: true },
            { text: 'user.password và user.token', correct: false },
            { text: 'system.port và network.ip', correct: false },
            { text: 'github.username và github.apikey', correct: false },
          ],
          explanation:
            'Git yêu cầu tên tác giả (user.name) và email (user.email) để nhúng vào thông tin commit.',
        },
        {
          id: 'q2',
          question: 'Cấp độ cấu hình nào có độ ưu tiên cao nhất trong Git?',
          type: 'single',
          options: [
            { text: '--local (Cấu hình riêng trong repository hiện tại)', correct: true },
            { text: '--global (Cấu hình cho toàn bộ tài khoản người dùng)', correct: false },
            { text: '--system (Cấu hình cho toàn bộ máy tính)', correct: false },
            { text: 'Tất cả các cấp độ đều có độ ưu tiên ngang nhau', correct: false },
          ],
          explanation:
            'Cấu hình `--local` ghi trong `.git/config` có độ ưu tiên cao nhất, đè lên `--global` và `--system`.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây dùng để xem tất cả các thiết lập cấu hình Git đang có hiệu lực?',
          type: 'single',
          options: [
            { text: 'git config --list', correct: true },
            { text: 'git show-config-all', correct: false },
            { text: 'git config --print-screen', correct: false },
            { text: 'git status --config', correct: false },
          ],
          explanation:
            '`git config --list` hoặc `git config -l` in ra toàn bộ các cặp key=value đang có hiệu lực.',
        },
        {
          id: 'q4',
          question: 'Thông tin `user.email` trong git config có vai trò gì trên GitHub?',
          type: 'single',
          options: [
            { text: 'Dùng để ánh xạ commit vào tài khoản GitHub tương ứng và tính điểm đóng góp', correct: true },
            { text: 'Dùng làm mật khẩu để đăng nhập vào trang web GitHub', correct: false },
            { text: 'Dùng để gửi email thông báo mã nguồn bị lỗi cú pháp', correct: false },
            { text: 'Dùng để thanh toán hóa đơn lưu trữ đám mây hàng tháng', correct: false },
          ],
          explanation:
            'GitHub đối chiếu email trong tác giả commit với email trong tài khoản để hiển thị avatar và biểu đồ đóng góp.',
        },
      ],
    },
  },
  {
    id: '08-repository',
    moduleId: '01-foundations',
    title: 'Repository là gì? Cấu trúc .git',
    duration: 20,
    xp: 60,
    keywords: ['repository', 'kho luu tru', 'thu muc .git', 'objects', 'refs', 'head'],
    prerequisites: ['07-git-config'],
    objectives: [
      'Hiểu rõ bản chất kỹ thuật của Repository (Kho lưu trữ) trong Git.',
      'Khám phá cấu trúc bên trong của thư mục ẩn `.git` (objects, refs, HEAD, config, index).',
      'Nắm được nguyên tắc không chỉnh sửa thủ công các tệp tin bên trong thư mục `.git`.',
    ],
    definition:
      'Repository (thường gọi tắt là Repo hoặc Kho lưu trữ) là một cấu trúc dữ liệu lưu trữ toàn bộ các tệp tin, thư mục cùng toàn bộ lịch sử thay đổi của dự án phần mềm. Trái tim của mọi Git repository chính là thư mục ẩn mang tên `.git` nằm ở gốc của dự án. Thư mục này chứa cơ sở dữ liệu đối tượng (`objects/`), các con trỏ nhánh và tag (`refs/`), con trỏ vị trí hiện tại (`HEAD`), tệp cấu hình riêng (`config`), và tệp chỉ mục vùng chuẩn bị (`index`). Toàn bộ điều kỳ diệu của Git đều diễn ra bên trong thư mục ẩn này.',
    why:
      'Hiểu được vai trò của thư mục `.git` giúp bạn không còn cảm thấy Git là một "hộp đen" huyền bí. Bạn sẽ hiểu rằng việc xóa thư mục `.git` sẽ biến dự án của bạn trở lại thành một thư mục file thông thường không còn lịch sử, và ngược lại chỉ cần sao chép thư mục `.git` sang máy khác là bạn đã mang trọn vẹn 100% lịch sử dự án đi theo. Kiến thức này cũng giúp bạn tránh sai lầm chết người là can thiệp sửa file thủ công làm hỏng cấu trúc dữ liệu của Git.',
    mentalModel:
      'Hãy hình dung thư mục dự án của bạn giống như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu giấy tờ bạn nhìn thấy trước mắt chính là Working Tree. Còn thư mục ẩn `.git` giống như một căn phòng kho bảo mật được khóa kín ở góc văn phòng. Trong căn phòng kho đó có một chiếc máy photocopy công nghiệp siêu tốc, một kho lưu trữ hồ sơ bằng sắt chống cháy và một cuốn sổ cái ghi chép chi tiết từng ngày từng giờ ai đã mang tài liệu nào ra vào văn phòng.',
    diagram: `Thư mục dự án:
my-project/
├── .git/                      <── Trái tim của Repository!
│   ├── HEAD                   (Con trỏ vị trí nhánh đang đứng)
│   ├── config                 (Cấu hình riêng của repo này)
│   ├── index                  (Vùng chuẩn bị Staging Area)
│   ├── objects/               (Cơ sở dữ liệu Blob, Tree, Commit)
│   └── refs/                  (Con trỏ nhánh: refs/heads/main)
├── index.html                 (Working Tree - Tệp bạn đang sửa)
└── app.js                     (Working Tree - Tệp bạn đang sửa)`,
    example:
      'Một sinh viên vô tình chọn hiển thị tệp ẩn trên Windows và thấy thư mục `.git` nặng vài chục megabyte trong dự án môn học. Sinh viên này nghĩ rằng đây là rác hệ thống nên bấm nút Shift+Delete xóa vĩnh viễn thư mục `.git`. Ngay lập tức, khi mở lại VS Code, toàn bộ lịch sử 50 commit suốt hai tháng làm việc biến mất hoàn toàn, VS Code không còn nhận diện đây là một Git repository nữa. May mắn thay, nếu bạn đã từng đẩy code lên GitHub trước đó, bạn chỉ cần clone lại là khôi phục được toàn bộ thư mục `.git`.',
    commands: ['ls -la', 'git status'],
    explanation:
      '- `ls -la`: Liệt kê tất cả các tệp tin và thư mục bao gồm cả các thư mục ẩn bắt đầu bằng dấu chấm như `.git`.\n- `git status`: Kiểm tra sự tồn tại và tính toàn vẹn của kho chứa Git trong thư mục hiện tại.',
    mistakes: [
      'Chỉnh sửa hoặc xóa thủ công tệp bên trong `.git`: Hành động này có thể phá hủy cơ sở dữ liệu đối tượng và làm hỏng toàn bộ repository.',
      'Khởi tạo repository lồng nhau vô ý: Chạy `git init` bên trong một thư mục con của một repository khác mà không dùng submodule.',
      'Commit nhầm thư mục `.git` của dự án khác: Gây ra lỗi submodule rỗng không thể tải trên GitHub.',
    ],
    labSteps: [
      'Chạy lệnh `ls -la` hoặc `dir /a` để kiểm tra sự tồn tại của thư mục ẩn `.git`.',
      'Quan sát các thành phần con cốt lõi của `.git`: HEAD, config, objects, refs.',
      'Nhận biết rằng khi `.git` tồn tại, các câu lệnh Git mới có thể hoạt động.',
    ],
    hint: 'Tuyệt đối không chỉnh sửa thủ công các tệp trong `.git` trừ khi bạn là chuyên gia.',
    validation: 'Hiểu cấu trúc và vai trò của thư mục `.git` trong một kho lưu trữ Git.',
    quizPrompt: 'Hãy làm bài trắc nghiệm sau về bản chất của Repository và thư mục .git.',
    challenge: 'Nêu vai trò của 3 thành phần con bên trong thư mục .git: HEAD, objects/ và refs/.',
    summary: [
      'Repository là cơ sở dữ liệu lưu toàn bộ mã nguồn và lịch sử phiên bản của dự án.',
      'Mọi dữ liệu lịch sử của Git được gói gọn hoàn toàn trong thư mục ẩn `.git`.',
      'Xóa thư mục `.git` đồng nghĩa với việc xóa bỏ vĩnh viễn toàn bộ lịch sử commit cục bộ.',
    ],
    quiz: {
      id: 'quiz-08-repository',
      title: 'Trắc nghiệm: Repository và cấu trúc .git',
      questions: [
        {
          id: 'q1',
          question: 'Thành phần nào là trái tim lưu trữ toàn bộ lịch sử và đối tượng của một Git Repository?',
          type: 'single',
          options: [
            { text: 'Thư mục ẩn mang tên `.git` nằm ở gốc dự án', correct: true },
            { text: 'Tệp tin `node_modules` chứa các thư viện JavaScript', correct: false },
            { text: 'Thư mục `C:\\Windows\\System32`', correct: false },
            { text: 'Tệp tin `package.json` nằm ở ngoài cùng', correct: false },
          ],
          explanation:
            'Thư mục ẩn `.git` chứa toàn bộ cơ sở dữ liệu đối tượng, cấu hình, refs và lịch sử của Git.',
        },
        {
          id: 'q2',
          question: 'Điều gì sẽ xảy ra nếu bạn xóa bỏ hoàn toàn thư mục `.git` trong một dự án?',
          type: 'single',
          options: [
            { text: 'Dự án trở thành thư mục tệp tin bình thường, toàn bộ lịch sử commit cục bộ bị mất vĩnh viễn', correct: true },
            { text: 'Toàn bộ code trong dự án sẽ tự động bị biên dịch sang ngôn ngữ C++', correct: false },
            { text: 'Git sẽ tự động tải lại thư mục đó từ Google Drive về máy', correct: false },
            { text: 'Máy tính sẽ bị khóa màn hình và yêu cầu khởi động lại', correct: false },
          ],
          explanation:
            'Xóa `.git` làm mất hoàn toàn lịch sử phiên bản cục bộ, chỉ giữ lại các tệp hiện tại trong Working Tree.',
        },
        {
          id: 'q3',
          question: 'Thư mục con `objects/` bên trong `.git` dùng để làm gì?',
          type: 'single',
          options: [
            { text: 'Lưu trữ cơ sở dữ liệu toàn bộ các đối tượng Blob (tệp tin), Tree (thư mục) và Commit', correct: true },
            { text: 'Lưu ảnh đại diện của các thành viên trong nhóm dự án', correct: false },
            { text: 'Lưu trữ tài liệu thiết kế Figma của lập trình viên giao diện', correct: false },
            { text: 'Chứa các tệp tạm thời tự động xóa sau 5 phút', correct: false },
          ],
          explanation:
            '`.git/objects/` là kho lưu trữ cơ sở dữ liệu bất biến (Object Database) theo mã hash SHA của Git.',
        },
        {
          id: 'q4',
          question: 'Tệp `HEAD` bên trong thư mục `.git` đóng vai trò gì?',
          type: 'single',
          options: [
            { text: 'Chỉ định con trỏ trỏ tới nhánh hoặc commit mà bạn đang làm việc trực tiếp tại thời điểm hiện tại', correct: true },
            { text: 'Lưu tiêu đề trang web HTML của dự án', correct: false },
            { text: 'Chứa ảnh đại diện của người sáng lập dự án', correct: false },
            { text: 'Lưu mật khẩu mã hóa của kho chứa', correct: false },
          ],
          explanation:
            'Tệp `HEAD` là một con trỏ tham chiếu (symref) trỏ đến nhánh hiện tại (ví dụ `ref: refs/heads/main`).',
        },
      ],
    },
  },
  {
    id: '09-git-init',
    moduleId: '01-foundations',
    title: 'Khởi tạo kho chứa với git init',
    duration: 25,
    xp: 75,
    keywords: ['git init', 'khoi tao', 'new repo', 'initialize', 'first repository'],
    prerequisites: ['08-repository'],
    objectives: [
      'Sử dụng thành thạo câu lệnh `git init` để biến một thư mục thông thường thành một Git repository.',
      'Hiểu các hành vi ngầm của Git khi khởi tạo: tạo thư mục `.git`, thiết lập nhánh mặc định.',
      'Biết cách khởi tạo kho chứa với tên nhánh mặc định tùy chỉnh như `main`.',
    ],
    definition:
      '`git init` là câu lệnh nền tảng đầu tiên được sử dụng để khởi tạo một Git repository mới hoàn toàn trống, hoặc chuyển đổi một thư mục mã nguồn hiện có thành một kho lưu trữ được Git quản lý. Khi thực thi lệnh này, Git sẽ tự động tạo ra thư mục ẩn `.git` tại vị trí thư mục hiện tại cùng đầy đủ cấu trúc tệp tin nội bộ và đặt con trỏ `HEAD` trỏ vào nhánh mặc định (thường là `main` hoặc `master`). Lệnh này an toàn tuyệt đối và không làm thay đổi hay xóa bỏ bất kỳ tệp tin có sẵn nào của bạn.',
    why:
      'Mọi dự án phần mềm sử dụng Git đều phải bắt đầu từ hành động khởi tạo với `git init` (hoặc nhân bản từ xa về bằng `git clone`). Nắm vững lệnh này giúp bạn tự tin biến bất kỳ thư mục bài tập, dự án cá nhân hay sản phẩm khởi nghiệp nào thành một không gian làm việc an toàn, nơi mọi dòng code bạn viết ra từ giây phút đó trở đi đều có thể được bảo vệ và theo dõi lịch sử chặt chẽ.',
    mentalModel:
      'Hãy hình dung việc chạy lệnh `git init` giống như lễ bấm chuông khai trương chính thức mở một cửa hiệu kinh doanh. Ngôi nhà và các kệ hàng trước đó vốn chỉ là một căn phòng trống không có quy củ. Nhưng ngay khi tiếng chuông khai trương vang lên (chạy `git init`), một nhân viên kế toán tận tụy bước vào phòng, mở cuốn sổ nhật ký thu chi trang trọng và tuyên bố: "Kể từ thời khắc này, mọi tài sản và giao dịch ra vào cửa tiệm đều được ghi chép sổ sách minh bạch!".',
    diagram: `Trước khi chạy git init:                Sau khi chạy git init:
my-project/                              my-project/
├── app.js                               ├── .git/  <── (Vừa được tạo ra!)
└── style.css                            ├── app.js
(Thư mục tệp tin thường)                 └── style.css
                                         (Kho lưu trữ Git chính thức)`,
    example:
      'Bạn vừa tạo một thư mục mới trên máy tính có tên `ecommerce-website` để làm đồ án tốt nghiệp cuối khóa. Bạn mở terminal tại thư mục đó và gõ `git init`. Terminal lập tức thông báo: `Initialized empty Git repository in /workspace/ecommerce-website/.git/`. Kể từ thời điểm này, bạn có thể tự do tạo các tệp HTML, CSS, JavaScript và sử dụng toàn bộ sức mạnh của Git để ghi nhớ từng bước tiến độ thực hiện đồ án của mình. Bất cứ khi nào bạn thử nghiệm một tính năng thanh toán mới hay thay đổi giao diện trang chủ mà gặp lỗi, bạn đều có thể an tâm quay ngược thời gian về mốc an toàn trước đó mà không sợ mất mát dữ liệu.',
    commands: ['git init', 'git init -b main', 'git status'],
    explanation:
      '- `git init`: Khởi tạo một kho lưu trữ Git rỗng mới hoàn toàn trong thư mục hiện tại của bạn.\n- `git init -b main`: Khởi tạo kho Git và chỉ định rõ tên nhánh ban đầu là `main` theo đúng tiêu chuẩn hiện đại.\n- `git status`: Xác nhận rằng kho chứa đã được khởi tạo thành công và đang ở trạng thái sẵn sàng đón nhận commit.',
    mistakes: [
      'Chạy git init ở thư mục gốc người dùng: Khởi tạo Git nhầm ở `C:\\Users\\TenBan` hoặc thư mục `Desktop`, khiến Git cố gắng theo dõi hàng trăm ngàn file cá nhân trong máy tính.',
      'Chạy git init nhiều lần trong các thư mục con: Gây ra xung đột repository lồng nhau không mong muốn.',
      'Lo lắng git init sẽ xóa code: Lệnh này hoàn toàn an toàn, chỉ tạo thêm thư mục `.git` chứ không tác động đến code hiện có.',
    ],
    labSteps: [
      'Kiểm tra trạng thái ban đầu bằng lệnh `git status` (nếu chưa init sẽ báo lỗi fatal).',
      'Chạy lệnh `git init` để khởi tạo kho lưu trữ Git mới.',
      'Chạy lại lệnh `git status` để xác nhận thông báo: `On branch main / No commits yet`.',
    ],
    hint: 'Chỉ cần gõ `git init` một lần duy nhất cho mỗi dự án mới.',
    validation: 'Hệ thống tạo thành công thư mục `.git` và `git status` trả về mã 0.',
    quizPrompt: 'Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết về lệnh git init.',
    challenge: 'Tự tạo một thư mục mới trong máy tính, khởi tạo Git và kiểm tra cấu trúc thư mục .git vừa sinh ra.',
    summary: [
      '`git init` tạo ra một kho chứa Git mới bằng cách sinh ra thư mục ẩn `.git`.',
      'Là câu lệnh bắt buộc đầu tiên để bắt đầu quản lý phiên bản cho một dự án mới.',
      'An toàn tuyệt đối, không làm mất mát hay sửa đổi nội dung các tệp tin sẵn có trong thư mục.',
    ],
    quiz: {
      id: 'quiz-09-git-init',
      title: 'Trắc nghiệm: Khởi tạo kho chứa với git init',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh nào dùng để khởi tạo một Git repository mới trong thư mục hiện tại?',
          type: 'single',
          options: [
            { text: 'git init', correct: true },
            { text: 'git start', correct: false },
            { text: 'git create-repo', correct: false },
            { text: 'git new', correct: false },
          ],
          explanation:
            '`git init` là câu lệnh chuẩn của Git để khởi tạo kho lưu trữ mới.',
        },
        {
          id: 'q2',
          question: 'Sau khi chạy lệnh `git init` thành công, thư mục ẩn nào sẽ xuất hiện trong dự án?',
          type: 'single',
          options: [
            { text: '.git', correct: true },
            { text: '.github', correct: false },
            { text: '.svn', correct: false },
            { text: '.repository', correct: false },
          ],
          explanation:
            'Lệnh `git init` tạo ra thư mục ẩn `.git` chứa toàn bộ cơ sở dữ liệu của kho lưu trữ.',
        },
        {
          id: 'q3',
          question: 'Điều gì sẽ xảy ra nếu bạn chạy `git init` trong một thư mục đã có sẵn các tệp mã nguồn HTML và CSS?',
          type: 'single',
          options: [
            { text: 'Git an toàn tạo thư mục `.git` và giữ nguyên toàn bộ các tệp HTML/CSS hiện có', correct: true },
            { text: 'Toàn bộ các tệp HTML/CSS sẽ bị xóa sạch để làm mới', correct: false },
            { text: 'Git sẽ mã hóa các tệp tin và bắt buộc nhập mật khẩu để mở', correct: false },
            { text: 'Lệnh sẽ báo lỗi và từ chối chạy trên thư mục không rỗng', correct: false },
          ],
          explanation:
            '`git init` hoàn toàn an toàn, chỉ khởi tạo hạ tầng quản lý phiên bản mà không xâm phạm tệp tin sẵn có.',
        },
        {
          id: 'q4',
          question: 'Cờ tùy chọn nào cho phép bạn chỉ định tên nhánh khởi tạo ban đầu (ví dụ `main`) khi chạy `git init`?',
          type: 'single',
          options: [
            { text: '-b <tên-nhánh> hoặc --initial-branch=<tên-nhánh>', correct: true },
            { text: '--name=<tên-nhánh>', correct: false },
            { text: '--set-branch-first', correct: false },
            { text: '-m <tên-nhánh>', correct: false },
          ],
          explanation:
            'Cú pháp `git init -b main` hoặc `git init --initial-branch=main` thiết lập tên nhánh mặc định ngay khi khởi tạo.',
        },
      ],
    },
  },
];
