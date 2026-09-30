import { LessonAuthorData } from './types';

export const LEVEL_5A_LESSONS: LessonAuthorData[] = [
  {
    id: '01-undo-restore-reset-revert',
    moduleId: '05-advanced-git',
    title: 'Undo trong Git: restore/reset/revert khác nhau',
    duration: 25,
    xp: 80,
    keywords: ['undo git', 'git restore', 'git reset', 'git revert', 'hoan tac', 'so sanh undo'],
    prerequisites: ['16-team-project-challenge'],
    objectives: [
      'Phân biệt rõ ràng mục đích, phạm vi tác động và ngữ cảnh sử dụng của 3 cơ chế hoàn tác: restore, reset và revert.',
      'Hiểu rõ sự khác biệt giữa hoàn tác tệp tin trong Working Tree/Staging và hoàn tác commit trong lịch sử.',
      'Nhận thức tính an toàn của git revert khi làm việc trên các nhánh cộng tác dùng chung so với git reset.',
      'Lựa chọn chính xác câu lệnh hoàn tác phù hợp nhất cho từng tình huống phát sinh lỗi thực tế.',
    ],
    definition:
      'Trong hệ thống quản lý phiên bản Git, nhu cầu hoàn tác (Undo) có thể xảy ra ở nhiều tầng kiến trúc khác nhau, từ việc hủy bỏ những chỉnh sửa chưa lưu trong thư mục làm việc cho đến việc thu hồi toàn bộ một commit đã xuất bản lên máy chủ. Để đáp ứng các kịch bản đó một cách chính xác, Git cung cấp bộ 3 công cụ hoàn tác chuyên biệt: `git restore` chuyên trách xử lý tệp tin ở Working Tree và Staging Area, `git reset` dịch chuyển con trỏ nhánh để viết lại lịch sử cục bộ, và `git revert` tạo commit đảo ngược an toàn cho các nhánh dùng chung.',
    why:
      'Sai lầm phổ biến nhất của các lập trình viên mới học Git là dùng sai công cụ hoàn tác, dẫn đến việc vô tình xóa sạch công sức lập trình cả ngày mà không thể lấy lại. Nắm vững ranh giới giữa restore, reset và revert giúp bạn làm chủ hoàn toàn các cỗ máy thời gian của Git: bạn biết chính xác khi nào chỉ cần hủy chỉnh sửa cục bộ, khi nào nên xóa bỏ commit thử nghiệm trên máy riêng, và khi nào bắt buộc phải dùng revert để bảo vệ an toàn cho đồng nghiệp đang cùng làm việc trên nhánh chung.',
    mentalModel:
      'Hãy hình dung việc soạn thảo một bức thư tay quan trọng gửi khách hàng. `git restore` giống như việc bạn dùng cục tẩy để xóa một từ vừa viết sai trên giấy nháp trước khi cho vào phong bì. `git reset` giống như việc bạn xé bỏ bức thư vừa viết xong ném vào sọt rác và lùi lại thời điểm trước khi đặt bút viết. Còn `git revert` giống như việc bạn đã trót gửi bức thư đi qua bưu điện, bạn không thể đến nhà khách hàng để lấy lại thư, nên bạn viết tiếp một bức thư đính chính thứ hai gửi đến để hủy bỏ hiệu lực của bức thư thứ nhất.',
    diagram: `Bản đồ 3 cơ chế Undo trong Git:
Working Tree / Staging:  git restore <file> (Hủy sửa đổi tệp tin)
Local Branch History:    git reset (Dịch chuyển HEAD & nhánh lùi về quá khứ)
Public / Shared Branch:  git revert (Tạo commit mới phủ định commit cũ)`,
    example:
      'Kỹ sư Nam trong một buổi chiều làm việc đã gặp phải 3 tình huống cần hoàn tác khác nhau. Đầu tiên, Nam vô tình sửa hỏng tệp cấu hình database.js nhưng chưa lưu vào staging, Nam chạy `git restore database.js` để trả lại trạng thái nguyên bản. Tiếp đó, Nam tạo thử 2 commit thử nghiệm tính năng trên nhánh cá nhân và không ưng ý, Nam chạy `git reset --hard HEAD~2` để xóa bỏ hoàn toàn 2 commit đó. Cuối cùng, Nam phát hiện một commit đã push lên nhánh main gây lỗi thanh toán, Nam lập tức chạy `git revert HEAD` để sinh ra một commit mới đảo ngược logic hỏng mà không làm xáo trộn lịch sử của cả đội ngũ.',
    commands: [
      'git restore <tên-tệp>',
      'git restore --staged <tên-tệp>',
      'git reset --mixed HEAD~1',
      'git revert <commit-hash>',
    ],
    explanation:
      '- `git restore <tệp>`: Khôi phục nội dung tệp tin trong Working Directory về trạng thái của commit gần nhất.\n- `git restore --staged <tệp>`: Đưa tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung chỉnh sửa.\n- `git reset`: Dịch chuyển con trỏ nhánh về commit chỉ định và điều chỉnh lại Staging hoặc Working Tree.\n- `git revert <hash>`: Tạo ra một commit hoàn toàn mới mang nội dung đảo ngược lại commit được chỉ định.',
    mistakes: [
      'Sử dụng git reset --hard trên nhánh dùng chung đã push lên GitHub: Làm sai lệch lịch sử của tất cả các đồng nghiệp khác.',
      'Nhầm lẫn giữa git restore và git reset: Dùng reset khi chỉ muốn hủy thay đổi của một tệp đơn lẻ.',
      'Sợ hãi không dám dùng revert vì nghĩ revert sẽ xóa mất commit cũ: Revert chỉ tạo thêm commit mới chứ không xóa lịch sử.',
    ],
    labSteps: [
      'Tạo một chỉnh sửa nhỏ trong tệp `test.txt` và hủy bỏ bằng lệnh `git restore test.txt`.',
      'Thêm tệp vào staging bằng `git add` rồi rút ra bằng `git restore --staged test.txt`.',
      'Tạo một commit thử nghiệm và thực hiện `git revert HEAD` để quan sát commit đảo ngược.',
      'Kiểm tra lại lịch sử bằng `git log --oneline` để xác nhận commit mới được tạo ra an toàn.',
    ],
    hint: 'Nhớ nguyên tắc vàng: Nhánh cá nhân dùng reset, nhánh cộng tác dùng chung luôn luôn dùng revert.',
    validation: 'Phân biệt chính xác và thực hành thành thạo 3 cơ chế hoàn tác restore, reset và revert.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về các cơ chế hoàn tác trong Git.',
    challenge: 'Tại sao lệnh `git checkout` trước phiên bản Git 2.23 bị coi là quá tải (overloaded) và cần tách thành switch và restore?',
    summary: [
      '`git restore` chuyên dùng để khôi phục trạng thái tệp tin trong Working Directory hoặc Staging Area.',
      '`git reset` dịch chuyển con trỏ nhánh lùi về quá khứ, phù hợp cho việc viết lại lịch sử cục bộ.',
      '`git revert` tạo commit mới đảo ngược commit cũ, là phương pháp an toàn duy nhất trên nhánh dùng chung.',
    ],
    quiz: {
      id: 'quiz-05-01-undo-restore-reset-revert',
      title: 'Trắc nghiệm: Phân biệt restore, reset và revert',
      questions: [
        {
          id: 'q1',
          question: 'Công cụ nào sau đây an toàn nhất để hoàn tác một commit đã được push lên nhánh `main` dùng chung của nhóm?',
          type: 'single',
          options: [
            { text: 'git revert <commit-hash>', correct: true },
            { text: 'git reset --hard HEAD~1', correct: false },
            { text: 'git restore --all', correct: false },
            { text: 'Xóa thư mục .git trên máy chủ', correct: false },
          ],
          explanation:
            '`git revert` tạo ra một commit mới đảo ngược thay đổi mà không viết lại lịch sử, an toàn tuyệt đối cho nhánh dùng chung.',
        },
        {
          id: 'q2',
          question: 'Lệnh nào sau đây dùng để hủy bỏ các thay đổi chưa commit của một tệp tin trong Working Directory kể từ Git 2.23?',
          type: 'single',
          options: [
            { text: 'git restore <tên-tệp>', correct: true },
            { text: 'git reset <tên-tệp>', correct: false },
            { text: 'git revert <tên-tệp>', correct: false },
            { text: 'git clean -f', correct: false },
          ],
          explanation:
            '`git restore <tệp>` khôi phục nội dung tệp trong Working Tree về trạng thái đã lưu gần nhất.',
        },
        {
          id: 'q3',
          question: 'Hậu quả nghiêm trọng nhất khi bạn chạy `git reset --hard` trên một nhánh đang có nhiều người cùng làm việc là gì?',
          type: 'single',
          options: [
            { text: 'Lịch sử bị viết lại, gây xung đột và từ chối push khi đồng nghiệp cố gắng đồng bộ mã nguồn', correct: true },
            { text: 'Máy chủ GitHub sẽ tự động xóa tài khoản của bạn', correct: false },
            { text: 'Tất cả các máy tính của nhóm sẽ bị tắt nguồn đột ngột', correct: false },
            { text: 'Dự án sẽ tự động chuyển đổi sang ngôn ngữ lập trình khác', correct: false },
          ],
          explanation:
            'Viết lại lịch sử bằng reset trên nhánh chung phá vỡ mối quan hệ commit của toàn bộ đội ngũ, tạo ra hỗn loạn.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào dùng để đưa một tệp tin đã lỡ `git add` ra khỏi Staging Area mà không làm mất nội dung chỉnh sửa?',
          type: 'single',
          options: [
            { text: 'git restore --staged <tên-tệp>', correct: true },
            { text: 'git restore --discard <tên-tệp>', correct: false },
            { text: 'git reset --delete <tên-tệp>', correct: false },
            { text: 'git remove --force <tên-tệp>', correct: false },
          ],
          explanation:
            '`git restore --staged <tệp>` bỏ đánh dấu chuẩn bị commit, giữ nguyên trạng thái tệp trong Working Tree.',
        },
      ],
    },
  },
  {
    id: '02-git-reset-soft',
    moduleId: '05-advanced-git',
    title: 'git reset --soft',
    duration: 25,
    xp: 80,
    keywords: ['git reset --soft', 'reset soft', 'hoan tac commit giu staging', 'amend commit alternative', 'undo commit'],
    prerequisites: ['01-undo-restore-reset-revert'],
    objectives: [
      'Hiểu rõ bản chất hoạt động của cờ `--soft` trong câu lệnh `git reset`.',
      'Biết chính xác trạng thái của HEAD, Staging Area và Working Directory sau khi chạy `git reset --soft`.',
      'Ứng dụng `git reset --soft` để gộp nhiều commit nhỏ hoặc viết lại commit message một cách linh hoạt.',
      'Phân biệt sự khác nhau giữa reset soft và các chế độ mixed hay hard.',
    ],
    definition:
      '`git reset --soft <commit-target>` là chế độ hoàn tác nhẹ nhàng và bảo tồn dữ liệu tối đa nhất của lệnh reset trong Git. Khi thực thi câu lệnh này, Git chỉ dịch chuyển duy nhất con trỏ HEAD và con trỏ nhánh hiện tại lùi về commit mục tiêu được chỉ định, trong khi hoàn toàn giữ nguyên vẹn 100% nội dung của cả Staging Area (Index) và Working Directory. Tất cả những thay đổi thuộc các commit bị lùi lại sẽ ngay lập tức xuất hiện ở trạng thái đã được staged sẵn sàng.',
    why:
      'Trong quá trình lập trình, rất nhiều khi bạn lỡ tạo một commit với thông điệp chưa chuẩn, hoặc bạn trót ấn commit quá sớm trong khi còn thiếu một số tệp tin quan trọng. `git reset --soft HEAD~1` là chiếc phao cứu sinh hoàn hảo: nó rút lại commit vừa tạo ngay tức khắc mà không làm mất một dòng code nào, đưa toàn bộ mã nguồn trở lại Staging Area để bạn có thể tự do thêm bớt tệp tin hoặc viết lại thông điệp commit một cách hoàn chỉnh nhất.',
    mentalModel:
      'Hãy hình dung bạn chuẩn bị gửi một gói bưu phẩm qua bưu điện. Bạn đã đóng thùng các món hàng (Working Tree), dán băng dính niêm phong và dán phiếu gửi hàng (Staging Area), đồng thời bưu tá đã đóng dấu xác nhận gửi đi (Commit). Khi bạn phát hiện ra quên bỏ chiếc thiệp chúc mừng vào trong hộp, bạn yêu cầu bưu tá hủy dấu xác nhận vừa đóng (`git reset --soft`). Chiếc hộp vẫn còn nguyên ở đó với đầy đủ hàng hóa đã niêm phong sẵn, bạn chỉ việc dán thêm thiệp rồi bảo bưu tá đóng dấu lại.',
    diagram: `Cơ chế hoạt động của git reset --soft HEAD~1:
Trước khi reset:
Commit History:   C1 ──► C2 ──► C3 (HEAD -> main)
Staging Area:     Trống sạch sẽ
Working Tree:     Trống sạch sẽ

Sau khi git reset --soft HEAD~1:
Commit History:   C1 ──► C2 (HEAD -> main)
Staging Area:     Chứa toàn bộ thay đổi của C3 (Staged!)
Working Tree:     Không đổi`,
    example:
      'Lập trình viên Quang vừa gõ câu lệnh `git commit -m "feat: user profile"` sau khi hoàn thành giao diện người dùng nhưng chợt nhận ra mình quên chưa cập nhật tệp tài liệu README.md và commit message bị sai chính tả ngớ ngẩn. Thay vì tạo thêm một commit vá víu rác rưởi làm xấu cây lịch sử dự án, Quang gõ ngay câu lệnh cứu cánh: `git reset --soft HEAD~1`. Con trỏ nhánh lập tức lùi lại 1 commit, toàn bộ các tệp tin của tính năng user profile vẫn nằm nguyên vẹn trong Staging Area dưới dạng màu xanh lá cây khi kiểm tra `git status`. Quang sửa tệp README.md, gõ `git add README.md` và thực hiện một commit duy nhất hoàn hảo trọn vẹn mọi yêu cầu.',
    commands: [
      'git reset --soft HEAD~1',
      'git reset --soft <commit-hash>',
      'git status',
      'git commit -m "<thông-điệp-mới>"',
    ],
    explanation:
      '- `git reset --soft HEAD~1`: Rút lại commit gần nhất, toàn bộ thay đổi chuyển về trạng thái staged sẵn sàng commit lại.\n- `git reset --soft <hash>`: Lùi nhánh về commit chỉ định trong quá khứ, toàn bộ thay đổi trung gian được gộp vào Staging.\n- `git status`: Kiểm tra lại danh sách các tệp tin đang nằm trong Staging Area sau khi reset.\n- `git commit -m`: Tạo commit mới thay thế hoàn hảo với đầy đủ mã nguồn.',
    mistakes: [
      'Nghĩ rằng reset --soft làm mất mã nguồn: Chế độ soft bảo tồn toàn bộ mã nguồn 100%, không mất dữ liệu.',
      'Chạy reset --soft trên nhánh chung đã push lên server từ xa mà không có kế hoạch xử lý xung đột.',
      'Quên gõ cờ --soft dẫn đến Git mặc định chạy chế độ --mixed làm văng code ra khỏi Staging Area.',
    ],
    labSteps: [
      'Tạo một commit thử nghiệm mới với thông điệp bất kỳ.',
      'Chạy lệnh `git reset --soft HEAD~1` để hoàn tác commit vừa tạo.',
      'Chạy `git status` và quan sát các tệp tin vẫn đang ở trạng thái staged màu xanh lá.',
      'Thực hiện một commit mới hoàn thiện với thông điệp chuẩn mực.',
    ],
    hint: 'Dùng `git reset --soft HEAD~1` khi bạn muốn viết lại commit message hoặc gộp commit vừa tạo.',
    validation: 'Rút lại commit thành công và bảo toàn 100% tệp tin trong Staging Area với cờ --soft.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --soft.',
    challenge: 'Làm thế nào để sử dụng `git reset --soft` gộp 5 commit vụn vặt gần nhất thành một commit duy nhất?',
    summary: [
      '`git reset --soft` chỉ dịch chuyển HEAD, bảo toàn trọn vẹn Staging Area và Working Directory.',
      'Thay đổi từ commit bị rút lại sẽ nằm ở trạng thái staged sẵn sàng cho commit mới.',
      'Là công cụ tuyệt vời để sửa thông điệp commit hoặc bổ sung tệp còn thiếu mà không gây rác lịch sử.',
    ],
    quiz: {
      id: 'quiz-05-02-git-reset-soft',
      title: 'Trắc nghiệm: git reset --soft',
      questions: [
        {
          id: 'q1',
          question: 'Sau khi chạy lệnh `git reset --soft HEAD~1`, các thay đổi của commit vừa bị rút lại sẽ nằm ở đâu?',
          type: 'single',
          options: [
            { text: 'Nằm trong Staging Area (Index) ở trạng thái đã được staged sẵn sàng commit', correct: true },
            { text: 'Bị xóa vĩnh viễn khỏi ổ đĩa cứng không thể phục hồi', correct: false },
            { text: 'Bị đẩy ra Working Directory ở trạng thái chưa staged', correct: false },
            { text: 'Tự động gửi lên hòm thư điện tử của bạn', correct: false },
          ],
          explanation:
            'Cờ `--soft` chỉ dịch chuyển HEAD, giữ nguyên Staging và Working Tree, nên code nằm sẵn trong Staging.',
        },
        {
          id: 'q2',
          question: 'Mục đích sử dụng phổ biến và hữu ích nhất của `git reset --soft HEAD~1` trong thực tế là gì?',
          type: 'single',
          options: [
            { text: 'Rút lại commit gần nhất để chỉnh sửa lại thông điệp commit hoặc bổ sung thêm tệp tin còn thiếu', correct: true },
            { text: 'Xóa toàn bộ dự án để làm lại từ đầu', correct: false },
            { text: 'Tăng gấp đôi tốc độ tải mạng', correct: false },
            { text: 'Chuyển đổi dự án sang nhánh khác', correct: false },
          ],
          explanation:
            'Reset soft hoàn tác commit nhưng giữ nguyên staged, cho phép bạn commit lại ngay với thông điệp hoặc tệp bổ sung.',
        },
        {
          id: 'q3',
          question: 'Điều gì xảy ra với các tệp tin trong Working Directory khi bạn chạy `git reset --soft`?',
          type: 'single',
          options: [
            { text: 'Hoàn toàn không bị ảnh hưởng, giữ nguyên 100% nội dung hiện tại', correct: true },
            { text: 'Bị xóa sạch sẽ không còn dấu vết', correct: false },
            { text: 'Bị khóa quyền đọc và ghi', correct: false },
            { text: 'Tự động chuyển thành file nén ZIP', correct: false },
          ],
          explanation:
            'Reset soft hoàn toàn không chạm vào Working Directory của lập trình viên.',
        },
        {
          id: 'q4',
          question: 'Nếu muốn gộp 3 commit gần nhất thành 1 commit duy nhất bằng reset soft, bạn sử dụng lệnh nào?',
          type: 'single',
          options: [
            { text: 'git reset --soft HEAD~3', correct: true },
            { text: 'git reset --soft HEAD+3', correct: false },
            { text: 'git squash 3 --soft', correct: false },
            { text: 'git merge --soft HEAD~3', correct: false },
          ],
          explanation:
            '`git reset --soft HEAD~3` lùi con trỏ nhánh 3 bước và đưa toàn bộ nội dung của 3 commit đó vào Staging để commit 1 lần.',
        },
      ],
    },
  },
  {
    id: '03-git-reset-mixed',
    moduleId: '05-advanced-git',
    title: 'git reset --mixed',
    duration: 25,
    xp: 80,
    keywords: ['git reset --mixed', 'reset mixed', 'default reset', 'unstaging changes', 'hoan tac staging'],
    prerequisites: ['02-git-reset-soft'],
    objectives: [
      'Nắm vững cơ chế hoạt động của chế độ mặc định `git reset --mixed` (hoặc `git reset` không truyền cờ).',
      'Hiểu rõ trạng thái của HEAD, Staging Area và Working Directory sau khi chạy reset mixed.',
      'Sử dụng `git reset` để hủy staged toàn bộ hoặc chọn lọc các tệp tin một cách linh hoạt.',
      'So sánh chi tiết sự khác nhau về hành vi giữa reset mixed và reset soft.',
    ],
    definition:
      '`git reset --mixed <commit-target>` (hoặc cú pháp ngắn gọn `git reset <commit-target>`) là chế độ hoạt động mặc định của câu lệnh reset trong Git. Khi được gọi, Git sẽ đồng thời thực hiện hai thao tác: dịch chuyển con trỏ HEAD và con trỏ nhánh hiện tại lùi về commit mục tiêu được chỉ định, đồng thời cập nhật lại Staging Area (Index) sao cho khớp hoàn toàn với snapshot của commit đó. Tuy nhiên, nội dung trong thư mục làm việc Working Directory vẫn được bảo toàn nguyên vẹn.',
    why:
      'Trong công việc hàng ngày, rất thường xuyên bạn gõ lệnh `git add .` theo thói quen và vô tình đưa hàng chục tệp tin không liên quan vào Staging Area, hoặc bạn commit một loạt thay đổi nhưng sau đó muốn phân chia chúng thành các commit nhỏ gọn gàng hơn. `git reset --mixed` chính là công cụ phân tách tuyệt vời: nó tháo dỡ toàn bộ các thay đổi ra khỏi Staging Area về lại Working Tree dưới dạng unstaged, trao cho bạn quyền chọn lọc lại từng dòng code để chuẩn bị commit.',
    mentalModel:
      'Tiếp tục với hình ảnh gửi kiện hàng qua bưu điện. Trong trường hợp này, bạn đã đóng gói hàng và dán băng dính niêm phong hộp cẩn thận (Staging Area). Khi bạn nhận ra mình đã đóng nhầm cả tài liệu bí mật của công ty vào trong thùng hàng, bạn quyết định rạch băng dính và dỡ toàn bộ đồ vật trong thùng ra đặt lại trên bàn làm việc của bạn (`git reset --mixed`). Mọi món đồ vẫn còn nguyên vẹn trên bàn, bạn có thể thong thả phân loại lại món nào cần gửi và món nào giữ lại.',
    diagram: `Cơ chế hoạt động của git reset --mixed HEAD~1:
Trước khi reset:
Commit History:   C1 ──► C2 ──► C3 (HEAD -> main)
Staging Area:     Trống
Working Tree:     Trống

Sau khi git reset --mixed HEAD~1:
Commit History:   C1 ──► C2 (HEAD -> main)
Staging Area:     Trống (Unstaged!)
Working Tree:     Chứa toàn bộ thay đổi của C3 (Chưa staged - màu đỏ)`,
    example:
      'Kỹ sư Lan thực hiện chỉnh sửa trên 5 tệp tin khác nhau và tiện tay tạo ngay một commit với thông điệp chung chung: "update various files". Nhận thấy commit này quá lộn xộn, thiếu tính nguyên tử và vi phạm quy chuẩn chia nhỏ commit của công ty, Lan chạy lệnh: `git reset HEAD~1` (chính là chế độ mặc định mixed). Con trỏ nhánh lùi lại 1 commit, và khi Lan gõ `git status`, cả 5 tệp tin đều xuất hiện dưới màu đỏ trong mục "Changes not staged for commit". Từ đây, Lan lần lượt dùng `git add file1` và commit riêng, sau đó `git add file2 file3` và commit riêng rẽ từng phần một cách vô cùng ngăn nắp và rõ ràng.',
    commands: [
      'git reset HEAD~1',
      'git reset --mixed HEAD~1',
      'git reset <tên-tệp>',
      'git status',
    ],
    explanation:
      '- `git reset HEAD~1`: Cú pháp mặc định tương đương với `--mixed`, đưa thay đổi của commit gần nhất về Working Directory.\n- `git reset --mixed <hash>`: Lùi lịch sử về commit chỉ định và đồng bộ lại Staging Area.\n- `git reset <tệp>`: Bỏ staged một tệp tin cụ thể (chức năng tương đương `git restore --staged`).\n- `git status`: Quan sát các tệp tin xuất hiện ở trạng thái màu đỏ chưa staged.',
    mistakes: [
      'Hoảng hốt khi thấy git status đổi từ màu xanh sang màu đỏ: Tưởng rằng code bị mất, thực tế code vẫn nằm an toàn trong Working Directory.',
      'Không nhận biết rằng git reset không cờ chính là git reset --mixed.',
      'Lạm dụng reset mixed trên các commit đã chia sẻ cho đồng nghiệp trên nhánh chung.',
    ],
    labSteps: [
      'Tạo 2 tệp mới `a.txt` và `b.txt`, đưa vào staging bằng `git add .` và commit.',
      'Chạy lệnh `git reset HEAD~1` để hoàn tác commit ở chế độ mặc định mixed.',
      'Gõ `git status` và quan sát 2 tệp xuất hiện ở trạng thái Untracked/Modified màu đỏ.',
      'Lần lượt `git add a.txt` và commit riêng, sau đó làm tương tự với `b.txt`.',
    ],
    hint: 'Gõ `git reset` không kèm cờ thì Git sẽ luôn luôn mặc định sử dụng chế độ `--mixed`.',
    validation: 'Thực hiện thành công reset mixed để tháo dỡ commit và tổ chức lại các thay đổi.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --mixed.',
    challenge: 'So sánh sự khác biệt cốt lõi giữa `git reset --soft HEAD~1` và `git reset --mixed HEAD~1`.',
    summary: [
      '`git reset --mixed` là chế độ mặc định, dịch chuyển HEAD và reset Staging Area.',
      'Bảo tồn toàn vẹn Working Directory, đưa các thay đổi về trạng thái unstaged.',
      'Rất hữu hiệu để bóc tách một commit lớn thành nhiều commit nhỏ có ý nghĩa.',
    ],
    quiz: {
      id: 'quiz-05-03-git-reset-mixed',
      title: 'Trắc nghiệm: git reset --mixed',
      questions: [
        {
          id: 'q1',
          question: 'Khi bạn chạy câu lệnh `git reset HEAD~1` mà không truyền bất kỳ cờ tùy chọn nào, Git sẽ chạy ở chế độ nào?',
          type: 'single',
          options: [
            { text: 'Chế độ --mixed mặc định', correct: true },
            { text: 'Chế độ --soft', correct: false },
            { text: 'Chế độ --hard', correct: false },
            { text: 'Chế độ --keep', correct: false },
          ],
          explanation:
            '`--mixed` là hành vi mặc định của lệnh `git reset` nếu không chỉ định cờ.',
        },
        {
          id: 'q2',
          question: 'Trạng thái của mã nguồn sau khi thực thi `git reset --mixed HEAD~1` sẽ hiển thị như thế nào trong `git status`?',
          type: 'single',
          options: [
            { text: 'Mã nguồn nằm trong Working Directory dưới dạng tệp sửa đổi chưa staged (màu đỏ)', correct: true },
            { text: 'Mã nguồn nằm trong Staging Area sẵn sàng commit (màu xanh)', correct: false },
            { text: 'Mã nguồn bị xóa hoàn toàn khỏi đĩa cứng', correct: false },
            { text: 'Mã nguồn tự động biến thành tệp ẩn', correct: false },
          ],
          explanation:
            'Reset mixed xóa Staging Area nhưng giữ Working Tree, đưa thay đổi về trạng thái unstaged màu đỏ.',
        },
        {
          id: 'q3',
          question: 'Trường hợp nào sau đây là ứng dụng xuất sắc nhất của `git reset --mixed`?',
          type: 'single',
          options: [
            { text: 'Khi muốn dỡ bỏ một commit gom quá nhiều việc để chia nhỏ thành các commit riêng lẻ gàng', correct: true },
            { text: 'Khi muốn xóa vĩnh viễn toàn bộ các tệp tin trong dự án', correct: false },
            { text: 'Khi muốn xuất bản code lên GitHub', correct: false },
            { text: 'Khi muốn tải dự án từ máy chủ từ xa về', correct: false },
          ],
          explanation:
            'Đưa code về Working Tree giúp bạn dễ dàng chọn lọc từng phần để commit thành nhiều mốc lịch sử logic.',
        },
        {
          id: 'q4',
          question: 'Sự khác biệt lớn nhất giữa `git reset --soft` và `git reset --mixed` nằm ở thành phần nào?',
          type: 'single',
          options: [
            { text: 'Staging Area: soft giữ nguyên staged (xanh), còn mixed hủy staged (đỏ)', correct: true },
            { text: 'Working Directory: soft xóa file, mixed giữ file', correct: false },
            { text: 'Commit history: soft dịch chuyển HEAD, mixed không dịch chuyển HEAD', correct: false },
            { text: 'Hai lệnh này hoàn toàn giống nhau 100%', correct: false },
          ],
          explanation:
            'Cả hai đều giữ Working Tree, nhưng `--soft` giữ Staging còn `--mixed` reset luôn cả Staging.',
        },
      ],
    },
  },
  {
    id: '04-git-reset-hard',
    moduleId: '05-advanced-git',
    title: 'git reset --hard',
    duration: 30,
    xp: 90,
    keywords: ['git reset --hard', 'reset hard', 'xoa commit', 'nguy hiem git', 'huy bo thay doi', 'destructive command'],
    prerequisites: ['03-git-reset-mixed'],
    objectives: [
      'Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.',
      'Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.',
      'Nhận thức rõ nguy cơ mất vĩnh viễn dữ liệu chưa commit trong Working Directory khi chạy lệnh này.',
      'Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard.',
    ],
    definition:
      '`git reset --hard <commit-target>` là tùy chọn mạnh mẽ và triệt để nhất của câu lệnh reset trong Git. Khi được thực thi, Git sẽ đồng loạt dịch chuyển con trỏ HEAD và con trỏ nhánh hiện tại về commit mục tiêu, đồng thời ghi đè và làm sạch hoàn toàn cả Staging Area lẫn thư mục làm việc Working Directory sao cho khớp 100% với trạng thái của commit đích. Mọi chỉnh sửa chưa commit trong Working Tree sẽ bị xóa sổ hoàn toàn không để lại dấu vết.',
    why:
      'Trong quá trình nghiên cứu và phát triển phần mềm, sẽ có những lúc bạn thử nghiệm một thuật toán hoặc một kiến trúc mới nhưng hoàn toàn thất bại, mã nguồn bị sửa đổi tan hoang và bạn muốn vứt bỏ toàn bộ những thử nghiệm tồi tệ đó để quay về trạng thái sạch sẽ hoàn hảo của một commit trước đó. `git reset --hard` chính là chiếc nút "Khởi động lại từ đầu" giúp bạn quét sạch mọi rác rưởi thử nghiệm chỉ trong một phần nghìn giây.',
    mentalModel:
      'Hãy hình dung bạn đang thử nghiệm chế tạo một cỗ máy trong phòng thí nghiệm. Thử nghiệm thất bại thảm hại, các mảnh vỡ và dầu mỡ văng tung tóe khắp sàn nhà và bàn làm việc. Bạn nhấn nút "Dọn sạch phòng thí nghiệm tự động" (`git reset --hard`). Ngay lập tức, một luồng nước áp lực cao quét sạch mọi mảnh vỡ và vết bẩn trên sàn (Working Tree), dọn sạch bàn đóng gói (Staging) và đưa phòng thí nghiệm trở về trạng thái tinh tươm đúng như lúc bạn chụp bức ảnh kỷ niệm trước khi bắt đầu thử nghiệm.',
    diagram: `Cơ chế hủy diệt của git reset --hard HEAD~1:
Trước khi reset:
Commit History:   C1 ──► C2 ──► C3 (HEAD -> main)
Working Tree:     Có tệp sửa đổi dở dang X

Sau khi git reset --hard HEAD~1:
Commit History:   C1 ──► C2 (HEAD -> main)
Staging Area:     Khớp hoàn toàn với C2!
Working Tree:     Khớp hoàn toàn với C2! (Tệp sửa đổi X bị XÓA VĨNH VIỄN!)`,
    example:
      'Kỹ sư Hùng dành cả buổi sáng để thử nghiệm chuyển đổi cơ sở dữ liệu sang MongoDB trên nhánh `feat/db-migration`. Sau 3 commit và nhiều chỉnh sửa dở dang, Hùng nhận thấy giải pháp này không khả thi và muốn quay về mốc ban đầu của nhánh. Hùng kiểm tra lịch sử, xác định mã hash của commit ban đầu là `a1b2c3d` và chạy lệnh: `git reset --hard a1b2c3d`. Ngay lập tức, console thông báo "HEAD is now at a1b2c3d initial commit". Toàn bộ mã nguồn trên máy Hùng quay về sạch sẽ như chưa từng có cuộc thử nghiệm nào diễn ra.',
    commands: [
      'git reset --hard HEAD',
      'git reset --hard HEAD~1',
      'git reset --hard <commit-hash>',
      'git status',
    ],
    explanation:
      '- `git reset --hard HEAD`: Hủy bỏ sạch sẽ toàn bộ các thay đổi chưa commit trong cả Staging và Working Tree, đưa máy về commit hiện tại.\n- `git reset --hard HEAD~1`: Xóa bỏ commit gần nhất và xóa sạch mọi thay đổi của nó trên đĩa cứng.\n- `git reset --hard <hash>`: Đưa toàn bộ dự án quay trở về mốc commit chỉ định trong quá khứ.\n- `git status`: Xác nhận trạng thái "working tree clean" sau khi đã quét sạch sẽ.',
    mistakes: [
      'Chạy git reset --hard khi đang có công việc dở dang chưa commit: Các thay đổi chưa commit sẽ biến mất vĩnh viễn không thể khôi phục bằng reflog.',
      'Sử dụng reset hard trên nhánh dùng chung gây mất dữ liệu của đồng nghiệp.',
      'Gõ nhầm số lượng commit cần lùi (ví dụ gõ HEAD~5 thay vì HEAD~1) làm mất nhiều công sức lập trình.',
    ],
    labSteps: [
      'Tạo một tệp tin rác `temp.txt` và sửa lung tung nội dung một vài tệp có sẵn.',
      'Chạy `git status` để thấy dự án đang bừa bộn.',
      'Chạy lệnh `git reset --hard HEAD` và quan sát kết quả.',
      'Chạy lại `git status` để xác nhận thông báo "nothing to commit, working tree clean".',
    ],
    hint: 'Nếu không chắc chắn, hãy gõ `git stash` để cất mã nguồn dự phòng trước khi chạy `git reset --hard`.',
    validation: 'Hiểu rõ rủi ro và thực thi thành thạo lệnh git reset --hard để dọn sạch môi trường làm việc.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --hard.',
    challenge: 'Nếu bạn lỡ tay chạy `git reset --hard HEAD~1` và làm mất một commit quan trọng, công cụ nào trong Git có thể giúp bạn cứu lại?',
    summary: [
      '`git reset --hard` đồng bộ hóa cả 3 cây HEAD, Staging và Working Tree về commit đích.',
      'Xóa sạch mọi thay đổi chưa commit trong Working Directory không để lại dấu vết.',
      'Cực kỳ hữu ích để dọn dẹp các thử nghiệm thất bại nhưng đòi hỏi sự cẩn trọng cao độ.',
    ],
    quiz: {
      id: 'quiz-05-04-git-reset-hard',
      title: 'Trắc nghiệm: git reset --hard',
      questions: [
        {
          id: 'q1',
          question: 'Điều gì sẽ xảy ra với các tệp tin đang sửa đổi dở dang chưa từng commit khi bạn chạy `git reset --hard`?',
          type: 'single',
          options: [
            { text: 'Chúng bị ghi đè và xóa sổ vĩnh viễn, hoàn toàn không thể khôi phục lại', correct: true },
            { text: 'Chúng được tự động lưu vào thùng rác Recycle Bin của hệ điều hành', correct: false },
            { text: 'Chúng được chuyển thành file nén ZIP trong thư mục gốc', correct: false },
            { text: 'Chúng tự động được gửi lên máy chủ GitHub', correct: false },
          ],
          explanation:
            'Git chỉ bảo vệ các dữ liệu đã từng được commit; những thay đổi chưa commit sẽ bị reset hard ghi đè vĩnh viễn.',
        },
        {
          id: 'q2',
          question: 'Lệnh nào sau đây giúp bạn hủy bỏ toàn bộ chỉnh sửa chưa commit và đưa Working Tree về trạng thái sạch sẽ của HEAD?',
          type: 'single',
          options: [
            { text: 'git reset --hard HEAD', correct: true },
            { text: 'git reset --soft HEAD', correct: false },
            { text: 'git clean --soft', correct: false },
            { text: 'git revert HEAD', correct: false },
          ],
          explanation:
            '`git reset --hard HEAD` khôi phục cả Staging và Working Tree về trạng thái y hệt như snapshot của commit HEAD hiện tại.',
        },
        {
          id: 'q3',
          question: 'Trước khi chạy một lệnh nguy hiểm như `git reset --hard`, hành động an toàn nhất được khuyến nghị là gì?',
          type: 'single',
          options: [
            { text: 'Tạo một nhánh dự phòng tạm thời hoặc lưu thay đổi vào `git stash` để đề phòng', correct: true },
            { text: 'Tắt phần mềm diệt virus trên máy tính', correct: false },
            { text: 'Khởi động lại hệ điều hành', correct: false },
            { text: 'Rút dây mạng Internet ra khỏi máy', correct: false },
          ],
          explanation:
            'Luôn tạo điểm tựa an toàn bằng `git stash` hoặc nhánh tạm thời trước khi thực hiện các thao tác mang tính hủy diệt.',
        },
        {
          id: 'q4',
          question: 'So sánh mức độ ảnh hưởng của 3 cờ trong `git reset`: soft, mixed, và hard đối với Working Directory:',
          type: 'single',
          options: [
            { text: 'soft và mixed giữ nguyên Working Directory, còn hard ghi đè và xóa sạch Working Directory', correct: true },
            { text: 'Cả 3 cờ đều xóa sạch Working Directory như nhau', correct: false },
            { text: 'soft xóa sạch, còn mixed và hard giữ nguyên', correct: false },
            { text: 'Không có cờ nào chạm vào Working Directory', correct: false },
          ],
          explanation:
            'Chỉ có `--hard` là ghi đè lên Working Directory, hai chế độ `--soft` và `--mixed` hoàn toàn bảo tồn Working Tree.',
        },
      ],
    },
  },
  {
    id: '05-git-revert',
    moduleId: '05-advanced-git',
    title: 'git revert',
    duration: 25,
    xp: 85,
    keywords: ['git revert', 'revert commit', 'dao nguoc commit', 'hoan tac an toan', 'public undo', 'non-destructive'],
    prerequisites: ['04-git-reset-hard'],
    objectives: [
      'Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).',
      'Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).',
      'Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.',
      'Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit.',
    ],
    definition:
      '`git revert <commit-target>` là câu lệnh hoàn tác an toàn nhất trong Git, hoạt động theo nguyên lý tạo ra một commit snapshot hoàn toàn mới mang nội dung đối nghịch (nghịch đảo) chính xác với những gì mà commit mục tiêu đã thực hiện. Thay vì xóa bỏ hoặc sửa đổi các commit cũ trong quá khứ như lệnh reset, `git revert` bảo tồn nguyên vẹn toàn bộ chuỗi lịch sử và bổ sung thêm một nút commit mới để vô hiệu hóa lỗi.',
    why:
      'Trong môi trường sản xuất thực tế tại các doanh nghiệp lớn, việc viết lại lịch sử trên nhánh `main` hoặc `production` là hành vi bị nghiêm cấm hoàn toàn vì nó làm hỏng đồng bộ của hàng chục kỹ sư và phá vỡ quy trình kiểm toán mã nguồn. `git revert` là giải pháp tiêu chuẩn vàng duy nhất: nó giúp bạn khắc phục lỗi tức thì mà vẫn lưu lại minh chứng rõ ràng trong nhật ký lịch sử về việc mã nguồn đã được sửa đổi và thu hồi như thế nào.',
    mentalModel:
      'Hãy hình dung sổ cái kế toán tài chính của một ngân hàng thương mại. Khi kế toán viên phát hiện mình lỡ ghi nhầm một khoản chuyển tiền 10 triệu đồng cho khách hàng vào ngày hôm qua, kế toán viên không được phép dùng bút xóa hay xé rách trang sổ cái đó đi (viết lại lịch sử). Thay vào đó, kế toán viên bắt buộc phải ghi thêm một dòng nghiệp vụ mới vào ngày hôm nay: "Thu hồi khoản chi nhầm 10 triệu đồng" (`git revert`). Số dư trở về đúng, và cuốn sổ cái vẫn minh bạch 100%.',
    diagram: `Cơ chế hoàn tác tiến lên của git revert:
Lịch sử ban đầu:
C1 ──► C2 (Gây lỗi thanh toán!) ──► C3 (HEAD -> main)

Sau khi chạy git revert C2:
C1 ──► C2 ──► C3 ──► C4 [Revert "C2"] (HEAD -> main)
(C2 vẫn tồn tại trong lịch sử, nhưng C4 đã đảo ngược toàn bộ thay đổi của C2!)`,
    example:
      'Hệ thống thương mại điện tử vừa triển khai bản cập nhật mới lên production thì bộ phận chăm sóc khách hàng báo sự cố: khách hàng không thể áp dụng mã giảm giá do một commit có mã hash `e7f8a9b` gây lỗi logic. Đội ngũ trực chiến không hề hoảng loạn dùng reset, kỹ sư trưởng lập tức chạy lệnh: `git revert e7f8a9b`. Git tự động tính toán các dòng code đối nghịch, mở trình soạn thảo commit message với tiêu đề mặc định `Revert "feat: coupon engine"`. Kỹ sư lưu lại, push lên server và hệ thống CI/CD tự động triển khai bản vá. Toàn bộ sự cố được giải quyết triệt để chỉ trong 2 phút.',
    commands: [
      'git revert <commit-hash>',
      'git revert HEAD',
      'git revert HEAD~2..HEAD',
      'git revert --no-commit <commit-hash>',
    ],
    explanation:
      '- `git revert <hash>`: Tạo commit mới đảo ngược các thay đổi do commit chỉ định tạo ra.\n- `git revert HEAD`: Hoàn tác commit gần đây nhất trên nhánh hiện tại.\n- `git revert HEAD~2..HEAD`: Hoàn tác liên tiếp một dải các commit gần nhất.\n- `git revert --no-commit <hash>`: Đảo ngược thay đổi đưa vào Staging nhưng chưa tự động tạo commit mới.',
    mistakes: [
      'Nhầm tưởng revert sẽ xóa mất commit cũ khỏi lịch sử git log: Revert tạo thêm commit mới, commit cũ vẫn nằm nguyên vẹn.',
      'Hoảng hốt khi gặp xung đột trong lúc revert: Xung đột xảy ra khi các commit sau đó đã sửa đổi cùng dòng code; chỉ cần resolve conflict và chạy `git revert --continue`.',
      'Lạm dụng reset thay vì revert trên nhánh main của công ty dẫn đến bị từ chối push.',
    ],
    labSteps: [
      'Tạo một tệp `feature.txt` có nội dung "phần mềm lỗi" và tạo commit.',
      'Chạy lệnh `git revert HEAD` để hoàn tác commit vừa tạo.',
      'Quan sát Git mở cửa sổ soạn thảo thông điệp commit revert tự động.',
      'Lưu lại và kiểm tra `git log --oneline` để thấy commit revert xuất hiện trên đỉnh.',
    ],
    hint: 'Luôn dùng `git revert` khi cần sửa lỗi trên các nhánh dùng chung hoặc nhánh production.',
    validation: 'Hoàn tác thành công một commit bằng git revert và bảo toàn nguyên vẹn lịch sử dự án.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh an toàn git revert.',
    challenge: 'Điều gì xảy ra khi bạn revert một commit merge (Merge Commit)? Cờ `-m` trong `git revert -m 1 <merge-commit>` có ý nghĩa gì?',
    summary: [
      '`git revert` tạo ra một commit mới để đảo ngược lại các thay đổi của commit cũ.',
      'Là phương thức hoàn tác an toàn tuyệt đối trên các nhánh dùng chung và production.',
      'Bảo tồn nguyên vẹn 100% lịch sử và tính toàn vẹn của chuỗi commit.',
    ],
    quiz: {
      id: 'quiz-05-05-git-revert',
      title: 'Trắc nghiệm: git revert',
      questions: [
        {
          id: 'q1',
          question: 'Bản chất cốt lõi của câu lệnh `git revert <commit-hash>` là gì?',
          type: 'single',
          options: [
            { text: 'Tạo một commit mới đảo ngược lại toàn bộ các thay đổi mà commit chỉ định đã thực hiện', correct: true },
            { text: 'Xóa bỏ hoàn toàn commit chỉ định khỏi lịch sử vĩnh viễn', correct: false },
            { text: 'Chuyển đổi commit đó sang một kho lưu trữ khác', correct: false },
            { text: 'Đổi tên tác giả của commit đó', correct: false },
          ],
          explanation:
            '`git revert` tiến lên phía trước bằng cách sinh ra commit nghịch đảo chứ không hề xóa bỏ commit trong quá khứ.',
        },
        {
          id: 'q2',
          question: 'Tại sao `git revert` lại là phương pháp hoàn tác bắt buộc trên nhánh `main` của các dự án chuyên nghiệp?',
          type: 'single',
          options: [
            { text: 'Vì nó không viết lại lịch sử, tránh gây xung đột cho các thành viên khác và phục vụ tốt việc kiểm toán mã nguồn', correct: true },
            { text: 'Vì lệnh này chạy nhanh hơn tất cả các lệnh khác 100 lần', correct: false },
            { text: 'Vì GitHub không hỗ trợ bất kỳ câu lệnh nào khác', correct: false },
            { text: 'Vì nó tự động sửa lỗi logic của lập trình viên', correct: false },
          ],
          explanation:
            'Tính bảo tồn lịch sử giúp mọi thành viên kéo code về mà không bị lỗi phân kỳ lịch sử do viết lại cây commit.',
        },
        {
          id: 'q3',
          question: 'Nếu commit bạn muốn revert đang bị mâu thuẫn dòng code với các commit mới hơn, Git sẽ xử lý thế nào?',
          type: 'single',
          options: [
            { text: 'Git dừng lại và kích hoạt trạng thái xung đột (conflict) để bạn giải quyết thủ công rồi mới tiếp tục', correct: true },
            { text: 'Git tự động xóa toàn bộ các commit mới hơn để ưu tiên revert', correct: false },
            { text: 'Git hủy bỏ toàn bộ kho lưu trữ trên máy tính', correct: false },
            { text: 'Git tự động chọn ngẫu nhiên một phương án', correct: false },
          ],
          explanation:
            'Revert thực chất là một phép áp dụng diff nghịch đảo, nếu có xung đột bạn phải xử lý conflict tương tự như khi merge.',
        },
        {
          id: 'q4',
          question: 'Cờ `--no-commit` (hoặc `-n`) trong lệnh `git revert -n <hash>` có tác dụng gì?',
          type: 'single',
          options: [
            { text: 'Áp dụng các thay đổi đảo ngược vào Working Tree và Staging nhưng không tự động tạo commit mới ngay lập tức', correct: true },
            { text: 'Cấm không bao giờ cho phép commit lại tệp đó nữa', correct: false },
            { text: 'Xóa commit đó khỏi bộ nhớ cache của CPU', correct: false },
            { text: 'Ngăn không cho Git ghi log lịch sử', correct: false },
          ],
          explanation:
            '`--no-commit` cho phép bạn đảo ngược nhiều commit liên tiếp vào Staging rồi mới tự tay gom thành một commit hoàn chỉnh.',
        },
      ],
    },
  },
  {
    id: '06-git-reflog',
    moduleId: '05-advanced-git',
    title: 'git reflog',
    duration: 25,
    xp: 85,
    keywords: ['git reflog', 'reference logs', 'nhat ky tham chieu', 'cuu ho git', 'head history', 'safety net'],
    prerequisites: ['04-git-reset-hard'],
    objectives: [
      'Hiểu rõ bản chất của Reference Logs (`reflog`) như nhật ký ghi lại mọi chuyển động của con trỏ HEAD.',
      'Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).',
      'Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.',
      'Nhận thức tầm quan trọng của reflog như chiếc lưới an toàn tối hậu giúp khôi phục mọi sai lầm trong Git.',
    ],
    definition:
      '`git reflog` (viết tắt của Reference Logs - Nhật ký tham chiếu) là một cơ chế ghi chép nội bộ cực kỳ mạnh mẽ của Git trên máy tính cá nhân của bạn. Trong khi `git log` chỉ hiển thị cây gia phả commit của nhánh hiện tại, `git reflog` hoạt động như một cuốn "hộp đen máy bay" ghi lại không sót một hành động nào làm dịch chuyển các con trỏ tham chiếu (HEAD, branches), bao gồm commit, chuyển nhánh (checkout/switch), reset, rebase, merge và cherry-pick.',
    why:
      'Hầu như mọi lập trình viên đều có ít nhất một lần hoảng loạn tột độ khi lỡ tay gõ `git reset --hard` nhầm hoặc xóa nhầm một nhánh tính năng quan trọng và nghĩ rằng toàn bộ công sức của mình đã tan thành mây khói. `git reflog` chính là phép màu cứu rỗi: trong Git, dữ liệu hiếm khi bị xóa ngay lập tức. Miễn là bạn đã từng commit, mã hash của commit đó chắc chắn vẫn được lưu lại trong reflog, sẵn sàng để bạn hồi sinh.',
    mentalModel:
      'Hãy hình dung cuốn nhật ký hành trình của một nhà thám hiểm. `git log` giống như cuốn sách lịch sử chính thức chỉ in lại những cột mốc vinh quang lớn (các commit còn nằm trên nhánh). Còn `git reflog` giống như thiết bị định vị GPS cá nhân gắn trên người nhà thám hiểm: nó ghi lại từng bước chân lùi, bước chân tiến, bước rẽ trái, rẽ phải, thậm chí cả lúc nhà thám hiểm lỡ bước chân xuống hố rồi trèo lên. Bất kể bạn đã đi đâu, GPS đều lưu lại tọa độ chính xác.',
    diagram: `Sự khác biệt giữa git log và git reflog:
git log:    Chỉ nhìn thấy các commit còn kết nối trong nhánh hiện tại.
            C1 ──► C2 (mất dấu C3 vì đã lỡ reset --hard về C2)

git reflog: Ghi nhận mọi sự kiện di chuyển của HEAD:
            HEAD@{0}: reset: moving to HEAD~1
            HEAD@{1}: commit: feat: awesome feature (C3 - Tọa độ còn nguyên!)
            HEAD@{2}: commit: fix: minor bug (C2)`,
    example:
      'Lập trình viên Huy sau một đêm thức trắng đã lỡ tay gõ câu lệnh tai họa: `git reset --hard HEAD~5` khiến 5 commit quan trọng vừa làm suốt cả buổi tối biến mất hoàn toàn khỏi màn hình hiển thị của lệnh `git log`. Huy toát mồ hôi lạnh nhưng nhanh chóng nhớ đến chiếc hộp đen vạn năng của Git. Huy mở terminal và gõ: `git reflog`. Dòng thứ hai của kết quả in rõ ràng: `7a8b9c0 HEAD@{1}: commit: feat: payment integration`. Huy reo lên vui sướng vì tọa độ commit đỉnh vẫn còn nguyên vẹn trong cơ sở dữ liệu ngầm. Huy chỉ việc gõ `git reset --hard HEAD@{1}` và toàn bộ 5 commit cùng mã nguồn lập tức sống dậy trọn vẹn như chưa từng có sự cố.',
    commands: [
      'git reflog',
      'git reflog show HEAD',
      'git reflog show <tên-nhánh>',
      'git reflog --date=relative',
    ],
    explanation:
      '- `git reflog`: Hiển thị danh sách các lần dịch chuyển gần nhất của con trỏ HEAD kèm theo chỉ số index.\n- `git reflog show HEAD`: Cú pháp tường minh tương đương với lệnh reflog cơ bản.\n- `git reflog show <nhánh>`: Xem lịch sử dịch chuyển con trỏ của một nhánh cụ thể thay vì HEAD.\n- `git reflog --date=relative`: Hiển thị mốc thời gian tương đối như mười phút trước hoặc hai giờ trước.',
    mistakes: [
      'Nghĩ rằng reflog tồn tại vĩnh viễn: Reflog có hạn sử dụng (mặc định 90 ngày cho commit tiếp cận được và 30 ngày cho commit mồ côi) trước khi bị dọn dẹp bởi git gc.',
      'Tìm kiếm reflog trên GitHub: Reflog là dữ liệu cục bộ riêng tư trên máy của bạn, không bao giờ được push lên server.',
      'Không biết rằng tệp chưa commit thì không thể cứu bằng reflog: Chỉ những gì đã từng commit mới có dấu vết trong reflog.',
    ],
    labSteps: [
      'Tạo 2 commit mới liên tiếp trong kho chứa bài tập.',
      'Chạy lệnh `git reflog` và quan sát các dòng ghi nhận sự kiện commit kèm thông điệp.',
      'Thử chuyển sang một nhánh khác rồi quay lại, sau đó chạy lại `git reflog`.',
      'Quan sát các sự kiện chuyển đổi nhánh checkout moving from branch to branch được ghi lại chi tiết.',
    ],
    hint: 'Mỗi khi làm mất commit, câu lệnh đầu tiên bạn phải nghĩ đến luôn luôn là `git reflog`.',
    validation: 'Đọc hiểu tường tận các thông số trong bảng reflog và xác định đúng mã hash commit cần tìm.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ cứu hộ git reflog.',
    challenge: 'Cơ chế Garbage Collection (`git gc`) dọn dẹp các commit mồ côi (dangling commits) trong reflog sau thời gian bao lâu?',
    summary: [
      '`git reflog` là hộp đen ghi lại mọi sự kiện dịch chuyển của HEAD và các nhánh.',
      'Dữ liệu reflog mang tính cục bộ riêng tư trên máy cá nhân, không chia sẻ qua remote.',
      'Là nền tảng cốt lõi để khôi phục các commit bị mất do reset, checkout hoặc xóa nhánh.',
    ],
    quiz: {
      id: 'quiz-05-06-git-reflog',
      title: 'Trắc nghiệm: git reflog',
      questions: [
        {
          id: 'q1',
          question: 'Điểm khác biệt căn bản nhất giữa `git log` và `git reflog` là gì?',
          type: 'single',
          options: [
            { text: 'git log hiển thị lịch sử commit của nhánh, còn reflog ghi lại mọi hành động di chuyển của con trỏ HEAD trên máy cục bộ', correct: true },
            { text: 'git log dùng cho máy Mac, còn reflog dùng cho máy Windows', correct: false },
            { text: 'reflog tự động đồng bộ lên GitHub, còn log chỉ lưu trên máy cá nhân', correct: false },
            { text: 'git log chỉ xem được tệp ảnh, reflog xem được tệp văn bản', correct: false },
          ],
          explanation:
            '`reflog` ghi nhận mọi thao tác cục bộ làm đổi vị trí HEAD (commit, checkout, reset...), kể cả các commit đã bị tách rời khỏi nhánh.',
        },
        {
          id: 'q2',
          question: 'Cú pháp `HEAD@{1}` trong kết quả xuất ra của `git reflog` có ý nghĩa là gì?',
          type: 'single',
          options: [
            { text: 'Vị trí của con trỏ HEAD ở trạng thái ngay trước thao tác dịch chuyển gần đây nhất', correct: true },
            { text: 'Nhánh số 1 trên máy chủ GitHub', correct: false },
            { text: 'Commit đầu tiên trong lịch sử dự án', correct: false },
            { text: 'Một lỗi cú pháp của Git', correct: false },
          ],
          explanation:
            '`HEAD@{n}` đại diện cho vị trí của con trỏ HEAD cách đây `n` bước di chuyển.',
        },
        {
          id: 'q3',
          question: 'Nhật ký `reflog` có được đẩy lên máy chủ từ xa khi bạn chạy `git push` hay không?',
          type: 'single',
          options: [
            { text: 'Hoàn toàn không, reflog chỉ là dữ liệu nội bộ riêng tư tồn tại duy nhất trên máy tính cá nhân của bạn', correct: true },
            { text: 'Có, reflog được công khai cho tất cả mọi người trên mạng', correct: false },
            { text: 'Chỉ đẩy lên nếu bạn có tài khoản GitHub trả phí', correct: false },
            { text: 'Chỉ đẩy lên khi sử dụng cờ --force', correct: false },
          ],
          explanation:
            'Reflog là nhật ký nội bộ của client Git cá nhân, không thuộc cấu trúc chia sẻ của giao thức remote.',
        },
        {
          id: 'q4',
          question: 'Trường hợp nào sau đây KHÔNG THỂ cứu lại được bằng `git reflog`?',
          type: 'single',
          options: [
            { text: 'Các thay đổi trong tệp tin mới tạo chưa từng được gõ lệnh `git commit` bao giờ', correct: true },
            { text: 'Một commit bị mất do lỡ tay gõ `git reset --hard`', correct: false },
            { text: 'Một nhánh đã bị xóa bằng `git branch -D`', correct: false },
            { text: 'Một commit bị ghi đè do rebase thất bại', correct: false },
          ],
          explanation:
            'Git chỉ có thể bảo vệ và ghi vết những gì đã từng được đóng dấu commit; tệp chưa commit không nằm trong cơ sở dữ liệu Git.',
        },
      ],
    },
  },
  {
    id: '07-reflog-recovery',
    moduleId: '05-advanced-git',
    title: 'Khôi phục commit bị mất bằng reflog',
    duration: 35,
    xp: 110,
    keywords: ['reflog recovery', 'khoi phuc commit', 'cuu commit mat', 'dangling commit', 'reviving branch', 'git rescue'],
    prerequisites: ['06-git-reflog'],
    objectives: [
      'Thành thạo quy trình 4 bước cứu hộ commit bị mất: Kiểm tra reflog -> Xác định tọa độ -> Tạo nhánh cứu hộ -> Hợp nhất.',
      'Khôi phục thành công một commit vừa bị xóa do câu lệnh `git reset --hard`.',
      'Hồi sinh nguyên vẹn một nhánh tính năng vừa bị lỡ tay xóa cưỡng chế bằng `git branch -D`.',
      'Xây dựng tâm lý bình tĩnh, tự tin xử lý mọi sự cố mất mát mã nguồn trong dự án.',
    ],
    definition:
      'Khôi phục commit bằng reflog (Reflog Recovery) là kỹ thuật cứu hộ cấp cao trong Git, cho phép lập trình viên tái kết nối và hồi sinh các commit bị cô lập (Dangling / Orphan Commits) trở lại cây lịch sử làm việc chính thống. Trong kiến trúc hướng đối tượng của Git, các commit bị xóa hoặc bị tách rời không hề biến mất ngay lập tức mà vẫn tồn tại trong cơ sở dữ liệu ngầm cho đến khi bị thu dọn rác; reflog cung cấp tọa độ chính xác để bạn gắn lại nhãn nhánh vào các commit đó.',
    why:
      'Trong đời làm nghề kỹ sư phần mềm, không có cảm giác nào tồi tệ bằng việc nhìn thấy hàng tuần công sức lập trình biến mất vì một câu lệnh sai lầm. Kỹ năng cứu hộ bằng reflog chính là tấm khiên bảo vệ sự nghiệp của bạn. Một kỹ sư làm chủ reflog recovery không bao giờ biết sợ hãi trước những câu lệnh phức tạp, luôn giữ được sự điềm tĩnh phi thường khi xảy ra sự cố và trở thành người hùng cứu cánh cho cả đội ngũ trong những thời khắc khủng hoảng nhất.',
    mentalModel:
      'Hãy hình dung một chiếc khinh khí cầu đang bay trên bầu trời, được neo giữ vào mặt đất bằng một sợi dây thừng (nhánh main). Khi bạn lỡ tay lấy kéo cắt đứt sợi dây thừng đó (reset hard hoặc xóa nhánh), khinh khí cầu không hề nổ tung biến mất, nó chỉ đang trôi lơ lửng tự do giữa tầng mây (Dangling Commit). `git reflog` chính là chiếc ống nhòm giúp bạn nhìn thấy tọa độ khinh khí cầu đang trôi, và bạn chỉ việc phóng một sợi dây neo mới (`git branch rescue-branch <hash>`) để kéo nó trở lại mặt đất an toàn.',
    diagram: `Quy trình hồi sinh commit mồ côi:
Trạng thái mồ côi:
C1 ──► C2 (main)
        └──► C3 (Trôi nổi cô lập vì bị reset hard lùi về C2!)

Hồi sinh bằng nhánh mới:
git branch rescue C3
C1 ──► C2 (main)
        └──► C3 (rescue - Đã được kết nối trở lại an toàn!)`,
    example:
      'Kỹ sư Mai vừa vô tình chạy câu lệnh nguy hiểm `git branch -D feat-ai-chat` xóa mất nhánh tính năng AI chứa hơn 15 commit giá trị mà chưa kịp đẩy lên kho lưu trữ đám mây GitHub. Không hề bối rối hay hoảng loạn, Mai mở ngay terminal và gõ lệnh `git reflog` để truy tìm dấu vết của con trỏ. Mai nhanh chóng tìm thấy dòng sự kiện cuối cùng trước khi chuyển nhánh: `a9c8b7d HEAD@{3}: commit: feat: complete streaming response`. Mai lập tức gõ câu lệnh hồi sinh an toàn: `git branch feat-ai-chat a9c8b7d`. Ngay tức thì, nhánh `feat-ai-chat` được tái tạo nguyên vẹn với đầy đủ toàn bộ 15 commit và không hề mất một ký tự code nào trong sự thán phục của đồng nghiệp.',
    commands: [
      'git reflog',
      'git branch <tên-nhánh-cứu-hộ> <commit-hash>',
      'git reset --hard HEAD@{n}',
      'git checkout -b <nhánh-mới> HEAD@{n}',
    ],
    explanation:
      '- `git reflog`: Bước 1 tra cứu tọa độ hash của commit trước khi tai nạn xảy ra.\n- `git branch <nhánh-mới> <hash>`: Cách an toàn nhất: tạo một nhánh mới cắm chốt ngay tại commit vừa tìm thấy.\n- `git reset --hard HEAD@{n}`: Cách dịch chuyển trực tiếp con trỏ nhánh hiện tại quay về vị trí reflog chỉ định.\n- `git checkout -b <nhánh> HEAD@{n}`: Tạo nhánh mới và chuyển ngay sang mốc commit cần cứu hộ.',
    mistakes: [
      'Hoảng loạn chạy loạn xạ các lệnh reset khác khiến bảng reflog bị tràn và khó tìm lại tọa độ cũ.',
      'Cố tình tắt máy tính hoặc xóa thư mục dự án khi vừa lỡ tay gõ lệnh sai.',
      'Dùng reset hard để cứu hộ thay vì tạo nhánh mới: Tạo nhánh mới luôn luôn là phương án an toàn nhất vì không làm xáo trộn nhánh hiện tại.',
    ],
    labSteps: [
      'Tạo commit bí mật có thông điệp `secret-data` trong tệp `secret.txt`.',
      'Cố tình phá hủy bằng lệnh `git reset --hard HEAD~1`. Kiểm tra thấy commit đã biến mất khỏi `git log`.',
      'Mở `git reflog` để tìm mã hash của commit chứa thông điệp `secret-data`.',
      'Tạo nhánh cứu hộ bằng lệnh `git branch rescue <hash-tìm-thấy>`.',
      'Chuyển sang nhánh `rescue` và xác nhận tệp `secret.txt` đã trở lại nguyên vẹn.',
    ],
    hint: 'Phương pháp an toàn nhất để cứu commit mồ côi luôn là dùng `git branch <tên-nhánh-mới> <commit-hash>`.',
    validation: 'Cứu hộ thành công commit bị mất sau khi bị reset hard hoặc xóa nhánh bằng reflog.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng cứu hộ dữ liệu với reflog.',
    challenge: 'Nêu sự khác biệt giữa việc cứu một commit bị reset hard và việc cứu một nhánh vừa bị xóa bằng `git branch -D`.',
    summary: [
      'Commit bị mất trong Git thực chất chỉ bị ngắt kết nối con trỏ chứ chưa bị xóa vật lý.',
      'Sử dụng `git reflog` để định vị chính xác mã hash của commit trước thời điểm tai nạn.',
      'Hồi sinh dữ liệu an toàn tuyệt đối bằng câu lệnh `git branch <tên-nhánh> <commit-hash>`.',
    ],
    quiz: {
      id: 'quiz-05-07-reflog-recovery',
      title: 'Trắc nghiệm: Cứu hộ commit với reflog',
      questions: [
        {
          id: 'q1',
          question: 'Sau khi xác định được mã hash `c4d5e6f` của commit bị mất trong reflog, câu lệnh an toàn và chuyên nghiệp nhất để hồi sinh commit đó là gì?',
          type: 'single',
          options: [
            { text: 'git branch restored-branch c4d5e6f', correct: true },
            { text: 'git delete c4d5e6f', correct: false },
            { text: 'git init --restore c4d5e6f', correct: false },
            { text: 'git push --force c4d5e6f', correct: false },
          ],
          explanation:
            '`git branch <tên-nhánh> <hash>` tạo một con trỏ nhánh mới neo giữ commit đó, đưa nó trở lại cây lịch sử hoàn toàn an toàn.',
        },
        {
          id: 'q2',
          question: 'Nếu bạn vừa lỡ tay gõ `git branch -D feature-x` xóa mất nhánh khi chưa merge, bạn có thể cứu lại được không?',
          type: 'single',
          options: [
            { text: 'Hoàn toàn cứu được, chỉ cần tìm mã hash của đỉnh nhánh feature-x trong reflog rồi tạo lại nhánh', correct: true },
            { text: 'Không thể cứu được vì cờ -D là xóa vĩnh viễn', correct: false },
            { text: 'Chỉ cứu được nếu có lưu file ra USB bên ngoài', correct: false },
            { text: 'Phải liên hệ với bộ phận hỗ trợ khách hàng của GitHub', correct: false },
          ],
          explanation:
            'Xóa nhánh chỉ là xóa con trỏ tên nhánh; các commit vẫn nằm nguyên vẹn trong kho và có thể tái tạo lại nhánh dễ dàng qua reflog.',
        },
        {
          id: 'q3',
          question: 'Trong tình huống bạn lỡ tay chạy `git reset --hard HEAD~1`, câu lệnh một dòng nào đưa bạn quay trở lại ngay lập tức trạng thái trước khi reset?',
          type: 'single',
          options: [
            { text: 'git reset --hard HEAD@{1}', correct: true },
            { text: 'git undo reset', correct: false },
            { text: 'git revert HEAD', correct: false },
            { text: 'git restore --previous', correct: false },
          ],
          explanation:
            'Trước khi reset con trỏ ở vị trí `HEAD@{1}`, lệnh `git reset --hard HEAD@{1}` lập tức đưa bạn trở lại vị trí đó.',
        },
        {
          id: 'q4',
          question: 'Tại sao việc giữ bình tĩnh và không gõ bừa bãi các lệnh khác khi phát hiện mất commit lại cực kỳ quan trọng?',
          type: 'single',
          options: [
            { text: 'Để tránh việc sinh ra quá nhiều bản ghi mới làm trôi mất vị trí cần tìm trong danh sách reflog', correct: true },
            { text: 'Để máy tính không bị quá tải bộ nhớ RAM', correct: false },
            { text: 'Để hệ điều hành không tự động khóa bàn phím', correct: false },
            { text: 'Vì nếu gõ quá nhanh Git sẽ tự động thoát', correct: false },
          ],
          explanation:
            'Gõ nhiều lệnh dịch chuyển HEAD sẽ tạo thêm nhiều dòng `HEAD@{n}`, làm phức tạp và đẩy xa vị trí commit cần cứu.',
        },
      ],
    },
  },
  {
    id: '08-commit-amend',
    moduleId: '05-advanced-git',
    title: 'git commit --amend',
    duration: 25,
    xp: 80,
    keywords: ['commit amend', 'amend commit', 'sua commit gan nhat', 'bo sung commit', 'sua message', 'replace commit'],
    prerequisites: ['01-undo-restore-reset-revert'],
    objectives: [
      'Hiểu rõ cơ chế hoạt động của cờ `--amend` trong câu lệnh `git commit`.',
      'Sử dụng `--amend` để sửa đổi thông điệp của commit gần nhất một cách nhanh chóng.',
      'Bổ sung các tệp tin hoặc dòng code bị bỏ quên vào commit gần nhất mà không sinh ra commit mới.',
      'Nhận thức rõ bản chất: `--amend` tạo ra một commit hash mới thay thế commit cũ (viết lại lịch sử).',
    ],
    definition:
      '`git commit --amend` là câu lệnh tiện ích chuyên dụng trong Git cho phép bạn chỉnh sửa và cập nhật trực tiếp vào commit snapshot gần đây nhất trên nhánh hiện tại. Khi thực thi câu lệnh này, Git sẽ kết hợp toàn bộ các thay đổi đang nằm trong Staging Area với nội dung của commit trước đó, mở trình soạn thảo để bạn cập nhật lại thông điệp commit (nếu muốn) và tạo ra một commit mới hoàn toàn thay thế cho commit cũ.',
    why:
      'Trong thực tế, tình huống bạn vừa ấn commit xong thì mới sực nhớ ra mình quên chưa lưu một tệp định dạng, hoặc phát hiện tiêu đề commit bị gõ sai chính tả xảy ra gần như hàng ngày. Nếu tạo thêm một commit con chỉ để sửa lỗi chính tả hay thêm một dòng code, cây lịch sử của bạn sẽ trở nên nhếch nhác và nghiệp dư. `git commit --amend` giúp bạn giữ cho lịch sử dự án luôn sạch sẽ, sắc nét và chuyên nghiệp nhất.',
    mentalModel:
      'Hãy hình dung bạn vừa chụp một bức ảnh kỷ yếu tập thể và in ra một bức ảnh mẫu (commit). Khi nhìn kỹ bức ảnh, bạn phát hiện một bạn ở góc áo bị lệch vạt. Thay vì dán thêm một bức ảnh nhỏ xíu chụp riêng vạt áo đè lên trên cuốn album, bạn mời bạn đó chỉnh lại áo ngay ngắn và chụp đè lại một bức ảnh hoàn hảo khác thay thế tấm ảnh lỗi vào đúng trang album đó (`git commit --amend`). Người xem album chỉ thấy duy nhất một bức ảnh hoàn mỹ.',
    diagram: `Bản chất của git commit --amend:
Trước khi amend:
C1 ──► C2 (Commit có thông điệp sai hoặc thiếu tệp) [HEAD]

Sau khi sửa tệp, git add và git commit --amend:
C1 ──► C3 (Commit mới hoàn hảo, thay thế hoàn toàn C2) [HEAD]
(C2 bị tách rời và sẽ được dọn rác)`,
    example:
      'Lập trình viên Trung vừa thực hiện commit tính năng đăng nhập với thông điệp: "feat: logn system" (bị gõ sai chính tả chữ login) và quên chưa thêm tệp icon `favicon.ico` vào dự án. Trung không hề bối rối tạo commit mới gây rác lịch sử. Trung đưa tệp icon vào staging bằng lệnh `git add favicon.ico`, sau đó gõ câu lệnh: `git commit --amend -m "feat: login system"`. Git lập tức gom tệp icon vào cùng với các tệp trước đó, sửa lại tiêu đề commit cho chuẩn xác và thay thế commit cũ bằng một commit mới tinh gọn, giữ cho cây lịch sử của nhánh luôn ở trạng thái sạch sẽ và chuyên nghiệp nhất.',
    commands: [
      'git commit --amend',
      'git commit --amend -m "<thông-điệp-mới>"',
      'git commit --amend --no-edit',
    ],
    explanation:
      '- `git commit --amend`: Mở trình soạn thảo văn bản để bạn cập nhật thông điệp hoặc gộp các tệp đã staged vào commit gần nhất.\n- `git commit --amend -m "<msg>"`: Sửa trực tiếp thông điệp commit ngay trên dòng lệnh mà không cần mở editor.\n- `git commit --amend --no-edit`: Thêm các tệp đã staged vào commit gần nhất mà giữ nguyên thông điệp cũ không thay đổi.',
    mistakes: [
      'Chạy commit amend sau khi đã push commit đó lên GitHub: Khiến commit trên máy và commit trên server có mã hash khác nhau, dẫn đến bị từ chối push.',
      'Tưởng rằng amend sửa trực tiếp trên commit cũ: Thực chất Git tạo ra commit mới với mã SHA-1 mới hoàn toàn.',
      'Quên git add tệp cần bổ sung trước khi chạy `git commit --amend --no-edit`.',
    ],
    labSteps: [
      'Tạo một commit với thông điệp sai chính tả `initail commit`.',
      'Chạy lệnh `git commit --amend -m "initial commit"` để sửa lỗi chính tả.',
      'Tạo một tệp mới `extra.txt`, chạy `git add extra.txt`.',
      'Chạy `git commit --amend --no-edit` để gộp tệp vào commit đó mà không đổi thông điệp.',
      'Dùng `git log -n 1 --stat` để kiểm tra kết quả hoàn hảo.',
    ],
    hint: 'Dùng cờ `--no-edit` khi bạn chỉ muốn bổ sung tệp vào commit gần nhất mà không muốn đổi thông điệp.',
    validation: 'Sửa đổi thành công thông điệp và bổ sung tệp vào commit gần nhất bằng cờ --amend.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh tiện ích git commit --amend.',
    challenge: 'Tại sao mã hash của commit luôn luôn bị thay đổi sau khi bạn chạy lệnh `git commit --amend`?',
    summary: [
      '`git commit --amend` cập nhật commit gần nhất bằng cách gộp các tệp đã staged hoặc sửa message.',
      'Cờ `--no-edit` giúp bổ sung tệp mà không làm thay đổi thông điệp commit sẵn có.',
      'Chỉ nên sử dụng amend cho các commit cục bộ cá nhân chưa từng push lên nhánh dùng chung.',
    ],
    quiz: {
      id: 'quiz-05-08-commit-amend',
      title: 'Trắc nghiệm: git commit --amend',
      questions: [
        {
          id: 'q1',
          question: 'Mục đích chính của câu lệnh `git commit --amend` là gì?',
          type: 'single',
          options: [
            { text: 'Chỉnh sửa thông điệp hoặc bổ sung tệp tin vào commit gần đây nhất trên nhánh hiện tại', correct: true },
            { text: 'Xóa toàn bộ các commit trong dự án', correct: false },
            { text: 'Tạo một nhánh mới từ commit đầu tiên', correct: false },
            { text: 'Đẩy code trực tiếp lên máy chủ mà không cần mạng', correct: false },
          ],
          explanation:
            '`git commit --amend` cho phép cập nhật commit snapshot gần nhất một cách nhanh chóng.',
        },
        {
          id: 'q2',
          question: 'Cờ `--no-edit` trong lệnh `git commit --amend --no-edit` có ý nghĩa gì?',
          type: 'single',
          options: [
            { text: 'Gộp các thay đổi đã staged vào commit gần nhất mà giữ nguyên thông điệp commit cũ, không mở trình soạn thảo', correct: true },
            { text: 'Cấm không cho phép chỉnh sửa mã nguồn của dự án nữa', correct: false },
            { text: 'Xóa toàn bộ thông điệp commit trở thành chuỗi rỗng', correct: false },
            { text: 'Khóa tệp tin ở chế độ chỉ đọc', correct: false },
          ],
          explanation:
            '`--no-edit` giúp bạn thêm nhanh các tệp bị sót vào commit trước mà không cần nhập lại message.',
        },
        {
          id: 'q3',
          question: 'Điều gì xảy ra với mã băm nhận dạng SHA-1 của commit sau khi bạn thực hiện `git commit --amend`?',
          type: 'single',
          options: [
            { text: 'Mã băm SHA-1 luôn luôn bị thay đổi vì nội dung hoặc thông tin commit đã thay đổi (sinh ra commit mới)', correct: true },
            { text: 'Mã băm SHA-1 được giữ nguyên hoàn toàn 100%', correct: false },
            { text: 'Mã băm biến thành một chuỗi số 0', correct: false },
            { text: 'Git không còn sử dụng mã băm nữa', correct: false },
          ],
          explanation:
            'Vì mã SHA-1 được tính toán từ nội dung và metadata, bất kỳ thay đổi nào cũng tạo ra một mã hash mới.',
        },
        {
          id: 'q4',
          question: 'Quy tắc an toàn quan trọng nhất khi sử dụng `git commit --amend` là gì?',
          type: 'single',
          options: [
            { text: 'Chỉ nên dùng cho các commit cục bộ chưa push lên nhánh công khai dùng chung của nhóm', correct: true },
            { text: 'Chỉ được dùng vào các ngày chẵn trong tuần', correct: false },
            { text: 'Bắt buộc phải tắt máy tính sau khi chạy lệnh', correct: false },
            { text: 'Không được phép dùng khi dự án có hơn 10 dòng code', correct: false },
          ],
          explanation:
            'Amend thay đổi mã hash của commit; nếu đã push lên server thì việc amend sẽ dẫn đến xung đột khi push lại.',
        },
        {
          id: 'q5',
          question: 'Để bổ sung một tệp tin `style.css` vừa sửa vào commit gần nhất bằng amend, quy trình chuẩn gồm những bước nào?',
          type: 'single',
          options: [
            { text: 'git add style.css -> git commit --amend --no-edit', correct: true },
            { text: 'git commit --amend style.css -> git push', correct: false },
            { text: 'git reset style.css -> git commit', correct: false },
            { text: 'git restore style.css -> git commit --amend', correct: false },
          ],
          explanation:
            'Bạn phải đưa tệp vào Staging Area trước (`git add`), sau đó mới gọi commit amend để gộp vào.',
        },
        {
          id: 'q6',
          question: 'Nếu bạn đã lỡ push một commit lên remote branch và sau đó chạy `git commit --amend` ở local, điều gì sẽ xảy ra ở lần push tiếp theo?',
          type: 'single',
          options: [
            { text: 'Lệnh push bị từ chối [rejected] vì lịch sử đã bị phân kỳ do mã hash thay đổi', correct: true },
            { text: 'Máy chủ tự động gộp commit cũ và mới một cách êm đẹp', correct: false },
            { text: 'Toàn bộ máy chủ GitHub sẽ bị xóa trắng', correct: false },
            { text: 'Tài khoản của bạn tự động được nâng cấp lên VIP', correct: false },
          ],
          explanation:
            'Commit hash thay đổi khiến nhánh local và remote bị lệch nhau, Git sẽ từ chối push non-fast-forward.',
        },
      ],
    },
  },
  {
    id: '09-git-stash-advanced',
    moduleId: '05-advanced-git',
    title: 'git stash nâng cao',
    duration: 30,
    xp: 90,
    keywords: ['git stash', 'stash pop', 'stash apply', 'stash branch', 'stash untracked', 'ngan ke tam thoi'],
    prerequisites: ['08-commit-amend'],
    objectives: [
      'Làm chủ toàn diện hệ thống ngăn kéo tạm thời với các câu lệnh nâng cao của `git stash`.',
      'Phân biệt rõ ràng sự khác nhau giữa `git stash pop` (áp dụng và xóa) và `git stash apply` (áp dụng giữ lại).',
      'Sử dụng các cờ quan trọng: `-u` (`--include-untracked`) và `-a` (`--all`) để lưu cả tệp mới và tệp bị bỏ qua.',
      'Đặt tên mô tả tường minh cho từng mẩu stash và tạo nhánh mới trực tiếp từ một mẩu stash.',
    ],
    definition:
      '`git stash` nâng cao là bộ công cụ quản lý ngăn kéo lưu trữ tạm thời chuyên sâu trong Git, cho phép lập trình viên dọn dẹp Working Directory sạch sẽ ngay lập tức bằng cách cất giữ toàn bộ trạng thái dở dang (cả tệp đã staged, tệp chưa staged và tệp chưa được theo dõi untracked) vào một ngăn xếp (Stash Stack) có tổ chức, để bạn có thể tự do chuyển nhánh làm việc khẩn cấp mà không cần phải tạo commit rác.',
    why:
      'Tình huống kinh điển của nghề lập trình: bạn đang viết dở một tính năng phức tạp với hàng tá dòng code dở dang chưa thể chạy được, thì sếp gọi điện thông báo có một lỗi nghiêm trọng trên production cần bạn sửa gấp trong 15 phút. Bạn không thể commit code dở vì sẽ làm hỏng lịch sử, cũng không thể chuyển nhánh vì Git sẽ chặn do xung đột tệp. `git stash` nâng cao là giải pháp cứu tinh: cất toàn bộ code dở vào ngăn kéo trong 1 giây, sang sửa bug, rồi quay lại lấy ra tiếp tục lập trình như chưa hề có cuộc chia ly.',
    mentalModel:
      'Hãy hình dung bàn làm việc của bạn đang bày bừa đủ loại cọ vẽ, bảng màu và bức tranh đang vẽ dở (Working Tree bừa bộn). Bỗng nhiên có vị khách quý bước vào phòng cần bạn ký gấp một bản hợp đồng. Bạn không vứt bức tranh vào sọt rác, mà nhẹ nhàng bê toàn bộ tranh, cọ và bảng màu cất vào một chiếc ngăn kéo có khóa dưới bàn (`git stash push -u -m "bức tranh hoàng hôn"`). Mặt bàn sạch bong, bạn ký hợp đồng xong xuôi, tiễn khách rồi mở ngăn kéo bê lại mọi thứ ra bàn tiếp tục vẽ (`git stash pop`).',
    diagram: `Cơ cấu hoạt động của ngăn xếp Stash (LIFO - Last In, First Out):
stash@{0}: "WIP: refactor auth module" (Mới nhất)
stash@{1}: "WIP: improve cart css"
stash@{2}: "WIP: experiment with graphql" (Cũ nhất)

Thao tác pop:   Lấy stash@{0} ra áp dụng vào Working Tree và XÓA khỏi danh sách.
Thao tác apply: Lấy stash@{0} ra áp dụng nhưng VẪN GIỮ lại trong danh sách.`,
    example:
      'Kỹ sư Trang đang thêm 3 tệp mới và sửa đổi 2 tệp cho tính năng thanh toán QR code của ứng dụng bán hàng. Bất ngờ có yêu cầu khẩn cấp chuyển sang kiểm tra nhánh `hotfix-login`. Thay vì gõ lệnh stash thông thường có thể bỏ quên tệp mới, Trang gõ câu lệnh nâng cao: `git stash push -u -m "WIP: QR payment integration"`. Cờ `-u` đảm bảo cả 3 tệp mới chưa tracked cũng được cất gọn gàng vào ngăn kéo. Trang chuyển sang nhánh hotfix xử lý xong xuôi, quay về nhánh cũ và gõ `git stash list` để thấy rõ mẩu stash có tên mô tả rõ ràng. Trang gõ `git stash pop` và toàn bộ không gian làm việc sống động trở lại nguyên vẹn không thiếu một dòng code.',
    commands: [
      'git stash push -u -m "<ghi-chú-mô-tả>"',
      'git stash list',
      'git stash apply stash@{n}',
      'git stash pop',
      'git stash drop stash@{n}',
      'git stash branch <nhánh-mới> stash@{n}',
    ],
    explanation:
      '- `git stash push -u -m "<msg>"`: Lưu tạm kèm thông điệp mô tả và bao gồm cả các tệp untracked.\n- `git stash list`: Liệt kê toàn bộ các mẩu stash đang được lưu trữ trong ngăn xếp.\n- `git stash pop`: Áp dụng mẩu stash gần nhất vào thư mục làm việc và tự động xóa nó khỏi ngăn kéo.\n- `git stash apply stash@{n}`: Áp dụng mẩu stash chỉ định nhưng vẫn bảo lưu nó trong ngăn kéo.\n- `git stash branch <tên>`: Tạo một nhánh mới tinh xuất phát từ mốc commit ban đầu và áp dụng stash vào đó.',
    mistakes: [
      'Quên cờ -u (`--include-untracked`): Khiến các tệp mới tạo chưa từng commit bị bỏ sót lại trên Working Tree và gây lỗi khi chuyển nhánh.',
      'Lạm dụng stash mà không đặt tên mô tả: Dẫn đến danh sách stash chứa hàng chục mục vô danh không biết mục nào chứa code gì.',
      'Quên dọn dẹp các stash cũ không còn sử dụng bằng lệnh `git stash drop` hoặc `git stash clear`.',
    ],
    labSteps: [
      'Tạo một tệp mới `new-feature.txt` và chỉnh sửa một tệp có sẵn.',
      'Chạy lệnh `git stash push -u -m "demo stash untracked"` để cất toàn bộ.',
      'Gõ `git status` xác nhận Working Tree sạch sẽ.',
      'Chạy `git stash list` để xem thông điệp mô tả trong danh sách.',
      'Chạy `git stash pop` để hồi phục lại đầy đủ cả tệp mới và tệp sửa đổi.',
    ],
    hint: 'Luôn thêm cờ `-u` khi stash để không bỏ sót các tệp tin mới tạo chưa được Git theo dõi.',
    validation: 'Sử dụng thành thạo các kỹ thuật stash nâng cao có thông điệp mô tả và xử lý tệp untracked.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ git stash nâng cao.',
    challenge: 'Khi nào bạn nên sử dụng `git stash branch <tên-nhánh>` thay vì `git stash pop` thông thường?',
    summary: [
      '`git stash push -u -m` giúp lưu trữ cả tệp untracked kèm thông điệp mô tả rõ ràng.',
      'Phân biệt `pop` (áp dụng và xóa) với `apply` (áp dụng và giữ lại dự phòng).',
      '`git stash branch` giải quyết xung đột bằng cách tạo nhánh mới an toàn từ mốc stash ban đầu.',
    ],
    quiz: {
      id: 'quiz-05-09-git-stash-advanced',
      title: 'Trắc nghiệm: git stash nâng cao',
      questions: [
        {
          id: 'q1',
          question: 'Tại sao câu lệnh `git stash` cơ bản có thể bỏ quên các tệp tin mới tạo của bạn?',
          type: 'single',
          options: [
            { text: 'Vì theo mặc định git stash chỉ lưu các tệp đã được theo dõi (tracked), cần thêm cờ `-u` để bao gồm cả tệp untracked', correct: true },
            { text: 'Vì các tệp mới tạo có dung lượng quá lớn', correct: false },
            { text: 'Vì tệp mới tạo chưa được đặt tên bằng tiếng Anh', correct: false },
            { text: 'Vì Git không cho phép lưu quá 3 tệp cùng lúc', correct: false },
          ],
          explanation:
            'Mặc định Git stash bỏ qua untracked files; cờ `-u` (`--include-untracked`) bắt buộc Git phải lưu cả tệp mới.',
        },
        {
          id: 'q2',
          question: 'Sự khác biệt cốt lõi giữa `git stash pop` và `git stash apply` là gì?',
          type: 'single',
          options: [
            { text: 'pop khôi phục xong sẽ tự động xóa mẩu stash đó khỏi danh sách, còn apply giữ nguyên mẩu stash trong danh sách', correct: true },
            { text: 'pop chỉ dùng cho nhánh main, còn apply dùng cho mọi nhánh', correct: false },
            { text: 'apply xóa toàn bộ kho chứa, còn pop giữ lại', correct: false },
            { text: 'Hai câu lệnh này hoàn toàn đồng nghĩa không khác gì nhau', correct: false },
          ],
          explanation:
            '`pop` = `apply` + `drop`. Dùng apply nếu bạn muốn thử nghiệm trên nhiều nhánh mà không làm mất stash.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây dùng để tạo một nhánh mới và áp dụng ngay mẩu stash vào nhánh đó, tránh xung đột với nhánh hiện tại?',
          type: 'single',
          options: [
            { text: 'git stash branch <tên-nhánh-mới>', correct: true },
            { text: 'git branch --stash <tên-nhánh>', correct: false },
            { text: 'git checkout stash -b <tên-nhánh>', correct: false },
            { text: 'git pop --branch <tên-nhánh>', correct: false },
          ],
          explanation:
            '`git stash branch <nhánh>` tạo nhánh từ commit gốc nơi stash được tạo ra và áp dụng thay đổi, ngăn ngừa xung đột hoàn hảo.',
        },
        {
          id: 'q4',
          question: 'Để xóa vĩnh viễn toàn bộ các mẩu stash đang lưu trữ trong ngăn kéo mà không khôi phục, bạn dùng lệnh nào?',
          type: 'single',
          options: [
            { text: 'git stash clear', correct: true },
            { text: 'git stash drop --all-force', correct: false },
            { text: 'git reset --stash', correct: false },
            { text: 'git remove --stashes', correct: false },
          ],
          explanation:
            '`git stash clear` dọn sạch 100% tất cả các mẩu stash đang có trong kho lưu trữ cục bộ.',
        },
      ],
    },
  },
  {
    id: '10-git-cherry-pick',
    moduleId: '05-advanced-git',
    title: 'git cherry-pick',
    duration: 30,
    xp: 95,
    keywords: ['cherry pick', 'git cherry-pick', 'nhat commit', 'boc commit', 'hotfix porting', 'selective commit'],
    prerequisites: ['07-reflog-recovery'],
    objectives: [
      'Hiểu rõ bản chất hoạt động của `git cherry-pick`: sao chép một commit cụ thể từ nhánh này sang nhánh khác.',
      'Sử dụng cherry-pick để đưa các bản vá lỗi cấp bách (hotfix) từ nhánh thử nghiệm sang nhánh production.',
      'Phân biệt rõ ràng giữa việc merge toàn bộ nhánh và việc chọn lọc từng commit đơn lẻ.',
      'Xử lý mâu thuẫn xung đột (conflict) phát sinh trong quá trình cherry-pick commit.',
    ],
    definition:
      '`git cherry-pick <commit-hash>` là câu lệnh trích xuất và sao chép chọn lọc vô cùng linh hoạt trong Git, cho phép bạn lựa chọn duy nhất một (hoặc một dải) commit cụ thể từ một nhánh bất kỳ trong lịch sử và sao chép chính xác những thay đổi của commit đó để áp dụng thành một commit mới trên đỉnh của nhánh hiện tại bạn đang đứng. Đây là phương thức phẫu thuật mã nguồn tinh vi mà không cần phải gộp (merge) toàn bộ cả nhánh dở dang.',
    why:
      'Hãy tưởng tượng bạn đang phát triển một nhánh tính năng lớn gồm 20 commit dở dang và chưa sẵn sàng phát hành. Đột nhiên bạn phát hiện ra trong 20 commit đó có commit số 5 chứa một bản sửa lỗi bảo mật cực kỳ xuất sắc mà môi trường production đang rất cần ngay lập tức. Bạn không thể merge cả nhánh vì sẽ kéo theo 19 commit lỗi chưa hoàn thiện. `git cherry-pick` chính là chiếc gắp y tế: bạn chỉ việc gắp đúng commit số 5 đó đưa sang nhánh main để phát hành ngay.',
    mentalModel:
      'Hãy hình dung một chiếc bánh gato lớn phủ đầy những quả cherry ngọt ngào và các lớp kem đang làm dở. Bạn không muốn ăn cả chiếc bánh chưa nướng chín. Bạn chỉ dùng chiếc nĩa cẩn thận gắp đúng một quả cherry ngon lành nhất trên mặt bánh đưa sang chiếc đĩa ăn tráng miệng của bạn (`git cherry-pick`). Chiếc đĩa của bạn có thêm một quả cherry tuyệt ngon, trong khi chiếc bánh lớn vẫn ở nguyên vị trí của nó.',
    diagram: `Cơ chế gắp commit của git cherry-pick:
Nhánh feature:   C1 ──► C2 ──► C3 (Bản vá quan trọng!) ──► C4
Nhánh main:      M1 ──► M2

Đứng tại main và chạy: git cherry-pick C3
Nhánh main:      M1 ──► M2 ──► C3' (Commit mới chứa nội dung của C3)`,
    example:
      'Kỹ sư Long đang làm việc trên nhánh `experimental-auth` và tạo commit `b4c5d6e` sửa lỗi rò rỉ bộ nhớ nghiêm trọng của máy chủ. Trong khi đó, nhánh chính `main` đang chuẩn bị đóng gói phát hành phiên bản mới cho khách hàng. Long chuyển sang nhánh main bằng câu lệnh `git switch main`, sau đó thực thi lệnh: `git cherry-pick b4c5d6e`. Git lập tức đọc diff của commit đó, áp dụng vào mã nguồn của nhánh main và tự động tạo commit mới mang cùng thông điệp. Đội ngũ kiểm thử xác nhận lỗi bộ nhớ được khắc phục hoàn toàn trên main mà không hề bị kéo theo bất kỳ đoạn mã thử nghiệm chưa hoàn thiện nào.',
    commands: [
      'git cherry-pick <commit-hash>',
      'git cherry-pick <hash-1> <hash-2>',
      'git cherry-pick <hash-start>..<hash-end>',
      'git cherry-pick -n <commit-hash>',
      'git cherry-pick --continue',
      'git cherry-pick --abort',
    ],
    explanation:
      '- `git cherry-pick <hash>`: Sao chép commit chỉ định và tạo commit mới trên nhánh hiện tại.\n- `git cherry-pick <h1..h2>`: Sao chép một dải các commit liên tiếp sang nhánh hiện tại.\n- `git cherry-pick -n <hash>`: Gắp thay đổi vào Staging/Working Tree mà chưa tự động commit (`--no-commit`).\n- `git cherry-pick --continue`: Tiếp tục quá trình gắp commit sau khi đã giải quyết xong xung đột.\n- `git cherry-pick --abort`: Hủy bỏ hoàn toàn thao tác gắp commit và đưa nhánh về trạng thái ban đầu.',
    mistakes: [
      'Cherry-pick bừa bãi quá nhiều commit: Dẫn đến tình trạng trùng lặp commit (duplicate commits) gây rắc rối khi merge nhánh sau này.',
      'Quên rằng cherry-pick tạo ra mã SHA-1 mới: Dù nội dung giống nhau nhưng commit mới trên nhánh hiện tại có mã hash khác với commit gốc.',
      'Bối rối khi gặp conflict: Tương tự như merge, cần mở file giải quyết xung đột, `git add` và gõ `git cherry-pick --continue`.',
    ],
    labSteps: [
      'Tạo nhánh `feature-patch` và commit một bản sửa lỗi nhỏ.',
      'Chuyển về nhánh `main` và lấy mã hash của commit vừa tạo.',
      'Thực hiện `git cherry-pick <commit-hash>` trên nhánh `main`.',
      'Kiểm tra `git log --oneline` trên main để xác nhận commit đã được sao chép thành công.',
    ],
    hint: 'Nếu gặp xung đột khi cherry-pick, giải quyết xong thì dùng `git cherry-pick --continue` chứ không dùng git commit.',
    validation: 'Sao chép thành công một commit chỉ định sang nhánh khác bằng câu lệnh git cherry-pick.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh chọn lọc git cherry-pick.',
    challenge: 'Nêu những hệ quả tiêu cực tiềm ẩn đối với lịch sử Git nếu một nhóm lập trình viên lạm dụng cherry-pick thay vì merge.',
    summary: [
      '`git cherry-pick` sao chép một commit cụ thể từ nhánh khác và áp dụng lên nhánh hiện tại.',
      'Tạo ra commit mới có nội dung tương tự nhưng mã băm SHA-1 khác biệt.',
      'Cực kỳ hữu ích để đưa các bản vá khẩn cấp (hotfix) sang nhánh release hoặc main.',
    ],
    quiz: {
      id: 'quiz-05-10-git-cherry-pick',
      title: 'Trắc nghiệm: git cherry-pick',
      questions: [
        {
          id: 'q1',
          question: 'Chức năng cốt lõi của câu lệnh `git cherry-pick <commit-hash>` là gì?',
          type: 'single',
          options: [
            { text: 'Sao chép duy nhất thay đổi của commit chỉ định từ một nhánh khác để tạo commit mới trên nhánh hiện tại', correct: true },
            { text: 'Gộp toàn bộ tất cả các commit của nhánh đó vào nhánh hiện tại', correct: false },
            { text: 'Xóa vĩnh viễn commit đó khỏi lịch sử kho chứa', correct: false },
            { text: 'Đổi tên tác giả của commit đó thành tên của bạn', correct: false },
          ],
          explanation:
            '`git cherry-pick` cho phép nhặt chọn lọc một commit đơn lẻ mà không cần merge toàn bộ nhánh.',
        },
        {
          id: 'q2',
          question: 'Sau khi cherry-pick thành công, commit mới trên nhánh hiện tại có mối quan hệ thế nào với commit gốc?',
          type: 'single',
          options: [
            { text: 'Có nội dung và thông điệp giống nhau nhưng mang mã băm SHA-1 mới hoàn toàn', correct: true },
            { text: 'Có mã băm SHA-1 giống hệt 100% không đổi', correct: false },
            { text: 'Commit gốc sẽ tự động bị xóa sổ biến mất', correct: false },
            { text: 'Hai commit tự động kết nối thành một commit duy nhất', correct: false },
          ],
          explanation:
            'Vì commit mới có commit cha (parent) khác và thời gian tạo khác nên mã SHA-1 được tính toán lại mới hoàn toàn.',
        },
        {
          id: 'q3',
          question: 'Nếu trong quá trình cherry-pick phát sinh xung đột (conflict) dòng mã, lệnh nào dùng để tiếp tục sau khi đã sửa xong và add?',
          type: 'single',
          options: [
            { text: 'git cherry-pick --continue', correct: true },
            { text: 'git cherry-pick --proceed', correct: false },
            { text: 'git merge --continue', correct: false },
            { text: 'git commit --amend', correct: false },
          ],
          explanation:
            '`git cherry-pick --continue` hoàn tất quá trình áp dụng commit sau khi bạn đã đánh dấu resolved bằng `git add`.',
        },
        {
          id: 'q4',
          question: 'Tùy chọn `-n` (hoặc `--no-commit`) trong câu lệnh `git cherry-pick -n <hash>` có tác dụng gì?',
          type: 'single',
          options: [
            { text: 'Áp dụng các thay đổi của commit vào thư mục làm việc và Staging Area nhưng không tự động tạo commit mới', correct: true },
            { text: 'Không kiểm tra quyền truy cập mạng Internet', correct: false },
            { text: 'Không cho phép người khác nhìn thấy mã nguồn', correct: false },
            { text: 'Bỏ qua toàn bộ các kiểm thử tự động', correct: false },
          ],
          explanation:
            '`--no-commit` cho phép bạn nhặt nhiều thay đổi về Staging Area để kiểm tra hoặc gộp chung trước khi commit.',
        },
      ],
    },
  },
  {
    id: '11-rebase-concept',
    moduleId: '05-advanced-git',
    title: 'Rebase là gì?',
    duration: 25,
    xp: 85,
    keywords: ['rebase concept', 'rebase la gi', 'rebase vs merge', 'tuyen tinh hoa lich su', 'viet lai lich su', 'base commit'],
    prerequisites: ['10-git-cherry-pick'],
    objectives: [
      'Nắm vững khái niệm và triết lý thiết kế cốt lõi của Rebase trong Git.',
      'Hiểu rõ thuật ngữ "Re-base" (thay đổi điểm tựa gốc rễ của nhánh tính năng).',
      'So sánh chi tiết sự khác nhau về triết lý và cấu trúc cây lịch sử giữa Merge và Rebase.',
      'Hiểu rõ khái niệm lịch sử tuyến tính (Linear History) và lợi ích của nó đối với các dự án lớn.',
    ],
    definition:
      '`git rebase` (Đổi gốc nhánh) là một trong hai cơ chế hợp nhất mã nguồn quan trọng bậc nhất của Git (bên cạnh `git merge`). Về bản chất, Rebase là quá trình ngắt kết nối các commit của nhánh hiện tại khỏi điểm xuất phát ban đầu, sau đó "di dời" và áp dụng lần lượt từng commit đó lên trên đỉnh một commit cơ sở mới (Base Commit). Kết quả là cây lịch sử của bạn được tái cấu trúc thành một đường thẳng tuyến tính hoàn hảo không có vết rẽ nhánh.',
    why:
      'Trong các dự án phần mềm có quy mô lớn với hàng chục lập trình viên, nếu ai cũng dùng `git merge` thông thường thì lịch sử Git sẽ nhanh chóng biến thành một "bát mì spaghetti" chằng chịt các nút giao cắt nhau và hàng trăm commit merge rác không mang lại giá trị nội dung. Nắm vững tư duy Rebase giúp bạn giữ cho lịch sử phát triển luôn thẳng tắp, dễ đọc, dễ tra cứu bằng `git bisect` và thể hiện đẳng cấp chuyên nghiệp của một kỹ sư Git cao cấp.',
    mentalModel:
      'Hãy hình dung bạn đang xếp các khối gỗ đồ chơi màu đỏ lên một chiếc bàn gỗ cũ (nhánh main cũ). Trong khi bạn đang xếp dở các khối gỗ đỏ, đồng nghiệp mang đến một chiếc bàn kính mới tinh và đặt các khối gỗ màu xanh lên đó (main mới cập nhật). Thay vì dùng dây buộc nối chiếc bàn cũ vào chiếc bàn mới (Merge Commit), bạn nhẹ nhàng nhấc toàn bộ chồng khối gỗ đỏ của mình sang đặt tiếp nối ngay ngắn lên trên đỉnh của các khối gỗ xanh trên chiếc bàn mới (`git rebase`). Bạn có một tòa tháp thẳng đứng tuyệt đẹp.',
    diagram: `So sánh trực quan giữa Merge và Rebase:
Lịch sử phân kỳ ban đầu:
Base ──► M1 ──► M2 (main)
  └──► F1 ──► F2 (feature)

Kết quả khi MERGE: (Sinh ra nút hợp nhất M3 hình thoi)
Base ──► M1 ──► M2 ──────► M3 (main)
  └──► F1 ──► F2 ────────┘

Kết quả khi REBASE feature lên main: (Đường thẳng tắp tuyến tính!)
Base ──► M1 ──► M2 (main) ──► F1' ──► F2' (feature)`,
    example:
      'Nhóm phát triển hệ thống lõi ngân hàng quy định mọi nhánh tính năng trước khi gửi Pull Request đều phải rebase lên nhánh `main` mới nhất. Kỹ sư Hoàng sau 3 ngày phát triển nhánh `feat/biometric` nhận thấy nhánh main đã tiến thêm 10 commit mới do các nhóm khác hoàn thành. Thay vì gõ merge làm sinh ra commit thừa "Merge branch main into feat/biometric", Hoàng thực hiện rebase. Nhánh của Hoàng được nâng bổng lên, đặt tiếp nối mượt mà vào đuôi commit thứ 10 của main. Cây lịch sử dự án hoàn toàn thẳng tắp và rõ ràng như một cuốn tiểu thuyết liền mạch.',
    commands: [
      'git switch <nhánh-tính-năng>',
      'git fetch origin',
      'git rebase origin/main',
      'git log --oneline --graph',
    ],
    explanation:
      '- `git switch <feature>`: Chuyển về nhánh tính năng bạn muốn di chuyển điểm tựa.\n- `git fetch origin`: Cập nhật các commit mới nhất từ máy chủ từ xa về máy cá nhân.\n- `git rebase origin/main`: Dời các commit của nhánh tính năng lên trên đỉnh mới nhất của nhánh origin/main.\n- `git log --graph`: Chiêm ngưỡng cây lịch sử thẳng tắp không có các nút giao rác.',
    mistakes: [
      'Nghĩ rằng Rebase làm mất mã nguồn: Rebase áp dụng lại toàn bộ commit, mã nguồn được tích hợp đầy đủ.',
      'Nhầm lẫn giữa Rebase nhánh tính năng lên main và Rebase main vào tính năng.',
      'Áp dụng Rebase trên các nhánh dùng chung đã xuất bản công khai (Vi phạm Quy tắc vàng của Rebase).',
    ],
    labSteps: [
      'Tạo một nhánh mới `demo-rebase` từ main và tạo 2 commit.',
      'Chuyển về `main` và tạo 1 commit độc lập để tạo ra sự phân kỳ chữ Y.',
      'Chuyển lại sang `demo-rebase` và quan sát sơ đồ bằng `git log --graph --oneline --all`.',
      'Chạy lệnh `git rebase main` và quan sát cây lịch sử biến thành một đường thẳng.',
    ],
    hint: 'Rebase làm sạch lịch sử bằng cách viết lại các commit thành đường thẳng tuyến tính.',
    validation: 'Hiểu rõ triết lý đổi gốc nhánh và phân biệt chuẩn xác sự khác nhau giữa Merge và Rebase.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và triết lý của Git Rebase.',
    challenge: 'Nêu sự khác biệt cốt lõi về bản chất giữa việc "lưu giữ lịch sử như nó đã diễn ra" (Merge) và "kể lại câu chuyện lịch sử một cách hoàn hảo" (Rebase).',
    summary: [
      'Rebase thay đổi điểm tựa gốc (Base Commit) của nhánh hiện tại lên đỉnh nhánh đích.',
      'Loại bỏ hoàn toàn các commit merge không cần thiết, tạo lịch sử tuyến tính thẳng tắp.',
      'Giúp dự án dễ đọc, dễ bảo trì và thuận tiện cho việc truy vết lỗi tự động.',
    ],
    quiz: {
      id: 'quiz-05-11-rebase-concept',
      title: 'Trắc nghiệm: Khái niệm Git Rebase',
      questions: [
        {
          id: 'q1',
          question: 'Thuật ngữ "Re-base" trong Git phản ánh hành động cốt lõi nào của câu lệnh?',
          type: 'single',
          options: [
            { text: 'Thay đổi điểm tựa gốc ban đầu (base commit) của nhánh tính năng sang một commit đỉnh mới', correct: true },
            { text: 'Xóa toàn bộ cơ sở dữ liệu database của dự án', correct: false },
            { text: 'Đổi tên kho lưu trữ trên máy chủ GitHub', correct: false },
            { text: 'Cài đặt lại Git từ đầu', correct: false },
          ],
          explanation:
            'Re-base có nghĩa là đặt lại gốc (base) của nhánh tính năng lên đỉnh mới nhất của nhánh đích.',
        },
        {
          id: 'q2',
          question: 'Lợi ích thẩm mỹ và kỹ thuật lớn nhất mà Git Rebase mang lại so với Git Merge là gì?',
          type: 'single',
          options: [
            { text: 'Tạo ra lịch sử tuyến tính thẳng tắp (Linear History), loại bỏ hoàn toàn các commit merge rác không cần thiết', correct: true },
            { text: 'Giúp mã nguồn chạy nhanh hơn gấp 10 lần trong môi trường runtime', correct: false },
            { text: 'Tự động sửa lỗi cú pháp lập trình JavaScript', correct: false },
            { text: 'Giảm 50% dung lượng tệp tin video trong kho chứa', correct: false },
          ],
          explanation:
            'Lịch sử dạng đường thẳng tuyến tính giúp việc đọc hiểu dòng thời gian và tìm lỗi bằng bisect thuận tiện hơn rất nhiều.',
        },
        {
          id: 'q3',
          question: 'Khi bạn rebase nhánh `feature` lên nhánh `main`, các commit trên nhánh `feature` sẽ như thế nào?',
          type: 'single',
          options: [
            { text: 'Chúng được tính toán lại diff và tạo thành các commit hoàn toàn mới (mã SHA-1 mới) trên đỉnh của main', correct: true },
            { text: 'Chúng giữ nguyên mã SHA-1 cũ 100%', correct: false },
            { text: 'Chúng bị xóa sạch và chỉ giữ lại commit của main', correct: false },
            { text: 'Chúng tự động chuyển thành tệp ZIP', correct: false },
          ],
          explanation:
            'Vì parent commit thay đổi nên Git tái tạo các commit mới với mã hash mới tương ứng.',
        },
        {
          id: 'q4',
          question: 'Triết lý cốt lõi của những người ủng hộ trường phái Rebase coi lịch sử Git là gì?',
          type: 'single',
          options: [
            { text: 'Lịch sử là một câu chuyện được biên tập chỉn chu và có trật tự để người khác đọc hiểu', correct: true },
            { text: 'Lịch sử là cuốn nhật ký thô sơ ghi lại mọi hành động dù lộn xộn đến đâu', correct: false },
            { text: 'Lịch sử không có giá trị gì sau khi xuất bản', correct: false },
            { text: 'Lịch sử do phần mềm diệt virus kiểm soát', correct: false },
          ],
          explanation:
            'Trường phái Rebase coi lịch sử như một tác phẩm hoàn chỉnh cần được biên tập gọn gàng trước khi xuất bản.',
        },
      ],
    },
  },
];
