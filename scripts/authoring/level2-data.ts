import { LessonAuthorData } from './types';

export const LEVEL_2_LESSONS: LessonAuthorData[] = [
  {
    id: '01-working-directory',
    moduleId: '02-git-basics',
    title: 'Working Directory (Thư mục làm việc)',
    duration: 20,
    xp: 60,
    keywords: ['working directory', 'working tree', 'thu muc lam viec', 'untracked', 'khu vuc git'],
    prerequisites: ['09-git-init'],
    objectives: [
      'Hiểu rõ khái niệm và vai trò của Working Directory trong kiến trúc 3 khu vực của Git.',
      'Phân biệt giữa tệp tin được Git theo dõi (Tracked) và tệp tin chưa được theo dõi (Untracked).',
      'Nắm bắt cách các thao tác chỉnh sửa tệp tin bên ngoài terminal ảnh hưởng trực tiếp tới Working Directory.',
    ],
    definition:
      'Working Directory (hay còn gọi là Working Tree - Thư mục làm việc) là một thư mục vật lý thực tế trên hệ thống tệp tin ổ đĩa máy tính của bạn, nơi chứa toàn bộ mã nguồn, tài nguyên hình ảnh và các tệp cấu hình của dự án mà bạn có thể trực tiếp nhìn thấy, mở bằng trình soạn thảo mã nguồn như VS Code và chỉnh sửa hàng ngày. Khi một kho lưu trữ Git được khởi tạo, mọi tệp tin mới tạo ra trong thư mục này ban đầu đều ở trạng thái chưa được theo dõi (Untracked) cho đến khi bạn chủ động đưa chúng vào khu vực chuẩn bị.',
    why:
      'Nắm vững bản chất của Working Directory là bước đầu tiên để làm chủ luồng làm việc 3 khu vực nổi tiếng của Git. Nếu không hiểu rõ sự độc lập giữa Working Directory và cơ sở dữ liệu Git, bạn sẽ rất dễ rơi vào bẫy tâm lý lầm tưởng rằng chỉ cần bấm phím lưu tệp trong VS Code là Git đã tự động ghi nhớ phiên bản. Bạn cần hiểu rằng Working Directory chỉ là không gian nháp làm việc tạm thời, mọi thay đổi trong đó chưa hề được bảo vệ an toàn cho đến khi đi qua Staging Area và vào Commit.',
    mentalModel:
      'Hãy hình dung Working Directory giống như chiếc bàn làm việc bằng gỗ trong phòng vẽ tranh của một họa sĩ. Trên chiếc bàn này, các hộp màu, cọ vẽ, bút chì và những tờ giấy nháp đang nằm ngổn ngang để bạn thao tác. Chiếc bàn làm việc cho phép bạn tự do tẩy xóa, vẽ thêm nét mực mới hay thậm chí vò nát một bản nháp mà không ảnh hưởng gì tới các tác phẩm hoàn thiện đã được đóng khung treo trang trọng trong phòng trưng bày Repository.',
    diagram: `Kiến trúc 3 khu vực của Git:
┌──────────────────────┐     git add      ┌──────────────────────┐    git commit    ┌──────────────────────┐
│  Working Directory   │ ───────────────► │     Staging Area     │ ───────────────► │      Repository      │
│ (Thư mục làm việc)   │                  │   (Vùng chuẩn bị)    │                  │  (Kho lưu trữ HEAD)  │
│  - Chỉnh sửa code    │                  │  - Chọn lọc commit   │                  │  - Lưu snapshot vĩnh │
└──────────────────────┘                  └──────────────────────┘                  └──────────────────────┘`,
    example:
      'Một kỹ sư phần mềm mở dự án website bán hàng và tạo thêm một tệp tin mới mang tên payment-gateway.js để lập trình tính năng thanh toán. Khi mở cửa sổ terminal và gõ lệnh git status, Git sẽ liệt kê tệp payment-gateway.js dưới mục màu đỏ mang tên Untracked files. Điều này có nghĩa là tệp tin này đã tồn tại thực tế trên ổ cứng trong Working Directory, nhưng cơ sở dữ liệu của Git hoàn toàn chưa hề để mắt tới nó. Chỉ khi kỹ sư thực hiện lệnh thêm tệp, Git mới bắt đầu theo dõi vòng đời của nó vào dự án.',
    commands: ['git status', 'ls -la'],
    explanation:
      '- `git status`: Lệnh kiểm tra trạng thái toàn diện, hiển thị chi tiết các tệp tin trong Working Directory đang bị sửa đổi hoặc chưa được đưa vào diện theo dõi.\n- `ls -la`: Liệt kê tất cả các tệp tin và thư mục thực tế đang có mặt trong thư mục làm việc bao gồm cả các tệp ẩn.',
    mistakes: [
      'Nghĩ lưu tệp là Git đã ghi nhớ: Lưu tệp trong trình soạn thảo chỉ cập nhật dữ liệu trên ổ cứng tại Working Directory, hoàn toàn chưa tạo snapshot trong Git.',
      'Sợ rằng sửa file trong Working Directory làm hỏng commit cũ: Commit cũ được bảo vệ vĩnh viễn trong cơ sở dữ liệu, việc sửa code trên bàn làm việc không làm thay đổi lịch sử đã qua.',
      'Nhầm lẫn Working Directory với Staging Area: Không phân biệt được tệp đang sửa với tệp đã sẵn sàng để commit.',
    ],
    labSteps: [
      'Mở terminal tại thư mục dự án và tạo một tệp tin mới bằng lệnh `echo "console.log(1);" > script.js`.',
      'Chạy lệnh `git status` để quan sát tệp `script.js` xuất hiện trong mục Untracked files màu đỏ.',
      'Nhận biết rằng tệp tin này đang nằm trong Working Directory nhưng chưa hề được đưa vào Staging Area.',
    ],
    hint: 'Mọi tệp tin bạn nhìn thấy và sửa đổi trong VS Code đều nằm trong Working Directory.',
    validation: 'Tạo tệp thành công và `git status` nhận diện tệp là untracked trong working tree.',
    quizPrompt: 'Hãy hoàn thành bài kiểm tra trắc nghiệm dưới đây về Working Directory trong Git.',
    challenge: 'Mô tả điều gì sẽ xảy ra với các tệp trong Working Directory nếu bạn chuyển sang một nhánh hoàn toàn khác.',
    summary: [
      'Working Directory (Working Tree) là thư mục vật lý nơi bạn trực tiếp xem và chỉnh sửa tệp tin.',
      'Là khu vực đầu tiên trong kiến trúc 3 khu vực của Git: Working Tree -> Staging Area -> Repository.',
      'Mọi thay đổi trong Working Directory chỉ mang tính tạm thời cho đến khi được stage và commit.',
    ],
    quiz: {
      id: 'quiz-02-01-working-directory',
      title: 'Trắc nghiệm: Working Directory trong Git',
      questions: [
        {
          id: 'q1',
          question: 'Working Directory (hay Working Tree) trong Git là gì?',
          type: 'single',
          options: [
            { text: 'Thư mục vật lý trên ổ cứng chứa các tệp mã nguồn mà bạn trực tiếp mở và chỉnh sửa', correct: true },
            { text: 'Máy chủ đám mây của GitHub lưu trữ bản sao lưu dự án', correct: false },
            { text: 'Bộ nhớ RAM tạm thời của vi xử lý máy tính', correct: false },
            { text: 'Khu vực lưu trữ các commit đã được đóng gói hoàn thiện', correct: false },
          ],
          explanation:
            'Working Directory là nơi làm việc thực tế ngoài đời của lập trình viên trên hệ thống tệp tin. Đáp án B sai vì đó là Remote Server; C sai vì Git lưu trên ổ cứng; D sai vì đó là Repository.',
        },
        {
          id: 'q2',
          question: 'Một tệp mới vừa được tạo trong Working Directory ban đầu sẽ có trạng thái nào đối với Git?',
          type: 'single',
          options: [
            { text: 'Untracked (Chưa được theo dõi)', correct: true },
            { text: 'Staged (Đã nằm trong vùng chuẩn bị)', correct: false },
            { text: 'Committed (Đã lưu vào lịch sử vĩnh viễn)', correct: false },
            { text: 'Ignored (Bị bỏ qua tự động)', correct: false },
          ],
          explanation:
            'Tệp mới tạo chưa từng được git add sẽ luôn ở trạng thái Untracked. Đáp án B sai vì cần chạy git add; C sai vì cần commit; D sai vì chỉ ignored nếu có trong .gitignore.',
        },
        {
          id: 'q3',
          question: 'Khi bạn chỉnh sửa một dòng code trong tệp đã được theo dõi và bấm phím lưu, thay đổi đó nằm ở đâu?',
          type: 'single',
          options: [
            { text: 'Nằm trong Working Directory ở trạng thái Modified', correct: true },
            { text: 'Tự động tạo ra một commit mới trong Repository', correct: false },
            { text: 'Tự động đẩy thẳng lên máy chủ từ xa GitHub', correct: false },
            { text: 'Biến mất ngay lập tức khi tắt terminal', correct: false },
          ],
          explanation:
            'Lưu tệp chỉ cập nhật nội dung trên Working Directory và chuyển trạng thái tệp thành Modified. Các đáp án khác sai vì Git không tự động commit hay push ngầm.',
        },
        {
          id: 'q4',
          question: 'Khu vực nào tiếp nhận dữ liệu ngay sau khi tệp tin rời khỏi Working Directory qua lệnh git add?',
          type: 'single',
          options: [
            { text: 'Staging Area (Vùng chuẩn bị)', correct: true },
            { text: 'Remote Repository trên GitHub', correct: false },
            { text: 'Thùng rác hệ điều hành Recycle Bin', correct: false },
            { text: 'Thư mục cấu hình toàn cục Global Config', correct: false },
          ],
          explanation:
            'Lệnh `git add` chuyển tệp từ Working Directory sang Staging Area (Index). Đáp án B sai vì cần git push; C và D hoàn toàn sai lệch bản chất.',
        },
      ],
    },
  },
  {
    id: '02-staging-area',
    moduleId: '02-git-basics',
    title: 'Staging Area (Vùng chuẩn bị)',
    duration: 25,
    xp: 70,
    keywords: ['staging area', 'index', 'cache', 'vung chuan bi', 'git add'],
    prerequisites: ['01-working-directory'],
    objectives: [
      'Nắm vững bản chất kỹ thuật của Staging Area (Index) như một vùng đệm chọn lọc commit.',
      'Hiểu vì sao Git thiết kế Staging Area thay vì commit trực tiếp từ Working Directory như SVN.',
      'Sử dụng git add để đưa các thay đổi mong muốn vào vùng chuẩn bị.',
    ],
    definition:
      'Staging Area (hay còn được gọi trong nội bộ mã nguồn Git là Index hoặc Cache) là một vùng trung gian lưu trữ siêu dữ liệu và ảnh chụp chuẩn bị trước cho lần commit kế tiếp. Về mặt kỹ thuật, Staging Area là một tệp nhị phân đơn lẻ mang tên `.git/index` chứa danh sách các tệp tin kèm mã băm SHA tương ứng đại diện chính xác cho trạng thái mà bạn mong muốn đóng gói vào snapshot lịch sử. Staging Area mang lại cho lập trình viên toàn quyền kiểm soát những gì sẽ được ghi nhận vào lịch sử.',
    why:
      'Sự tồn tại của Staging Area chính là một trong những ưu thế kiến trúc đột phá nhất của Git so với các hệ thống quản lý phiên bản cổ điển. Trong các hệ thống cũ, mọi sửa đổi trong thư mục làm việc đều bị ép buộc phải commit cùng một lúc. Với Staging Area, bạn có thể chỉnh sửa 10 tệp tin khác nhau nhưng chỉ chọn lọc 2 tệp liên quan đến tính năng đăng nhập để đưa vào Staging Area và tạo một commit gọn gàng, trong khi 8 tệp còn lại vẫn giữ nguyên để tiếp tục hoàn thiện sau.',
    mentalModel:
      'Hãy hình dung Staging Area giống như chiếc bàn đóng gói kiện hàng trước khi gửi bưu điện. Trong kho hàng của bạn (Working Directory) có hàng trăm món đồ khác nhau. Bạn không ném bừa tất cả vào một chiếc thùng lớn. Thay vào đó, bạn lấy ra một chiếc hộp các-tông (Staging Area), cẩn thận chọn ra đúng chiếc áo và chiếc quần mà khách hàng đặt mua, xếp ngay ngắn vào hộp rồi dán băng dính niêm phong lại trước khi đóng dấu giao hàng (commit).',
    diagram: `Quy trình đóng gói có chọn lọc:
[Working Directory]                [Staging Area]                 [Commit History]
├── auth.js (đã sửa) ──git add──►  auth.js (staged)  ──git commit──► Commit #1: feat: auth
├── api.js  (đã sửa) ───────────►  (chưa add)
└── temp.txt (nháp)  ───────────►  (chưa add)`,
    example:
      'Một lập trình viên đang tiến hành sửa lỗi bảo mật khẩn cấp tại tệp user-controller.js. Trong lúc đọc code, lập trình viên thấy một đoạn code khác bị sai định dạng thụt đầu dòng nên tiện tay format lại tệp style.css và tệp helper.js. Khi chuẩn bị commit, nhờ có Staging Area, lập trình viên chỉ gõ lệnh git add user-controller.js để commit riêng một bản vá lỗi bảo mật sạch sẽ gửi lên cho trưởng nhóm duyệt, tránh làm loãng lịch sử bởi những thay đổi định dạng không liên quan. Điều này giúp đồng nghiệp khi thực hiện code review có thể tập trung 100% vào logic bảo mật mà không bị phân tâm bởi hàng chục dòng thay đổi khoảng trắng vô nghĩa.',
    commands: ['git status', 'git add <file>', 'git restore --staged <file>'],
    explanation:
      '- `git status`: Kiểm tra danh sách các tệp đã nằm trong Staging Area (màu xanh) và tệp chưa được staged (màu đỏ).\n- `git add <file>`: Đưa nội dung hiện tại của tệp tin từ Working Directory vào Staging Area.\n- `git restore --staged <file>`: Rút tệp tin ra khỏi Staging Area trở lại Working Directory mà không làm mất nội dung code.',
    mistakes: [
      'Nghĩ Staging Area lưu một bản copy vật lý đầy đủ: Git Index chỉ lưu siêu dữ liệu và trỏ tới các blob đối tượng trong cơ sở dữ liệu Git.',
      'Sửa tiếp file sau khi đã git add rồi vội vã commit: Git chỉ commit phiên bản của tệp tại thời điểm bạn chạy lệnh git add, phần sửa sau đó sẽ bị bỏ lại.',
      'Commit một đống thay đổi hỗn độn: Bỏ qua lợi ích chọn lọc của Staging Area và luôn commit toàn bộ mọi thứ bừa bãi.',
    ],
    labSteps: [
      'Tạo tệp `app.js` và thêm vào nội dung `console.log("Staging lab");`.',
      'Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.',
      'Chạy `git status` và quan sát tệp `app.js` nằm dưới tiêu đề Changes to be committed màu xanh lá.',
    ],
    hint: 'Chỉ những thay đổi nằm trong Staging Area mới được ghi vào commit tiếp theo.',
    validation: 'Kiểm tra `git status` hiển thị tệp tin trong Changes to be committed.',
    quizPrompt: 'Làm bài trắc nghiệm dưới đây để đánh giá sự am hiểu về Staging Area.',
    challenge: 'Giải thích điều gì xảy ra nếu bạn sửa tiếp tệp app.js sau khi đã chạy lệnh git add app.js.',
    summary: [
      'Staging Area (Index) là vùng đệm lưu trữ ảnh chụp chuẩn bị cho commit kế tiếp.',
      'Cho phép chọn lọc chính xác từng tệp tin cần ghi nhận vào lịch sử phiên bản.',
      'Tệp tin trong Staging Area được hiển thị trong mục Changes to be committed khi gõ git status.',
    ],
    quiz: {
      id: 'quiz-02-02-staging-area',
      title: 'Trắc nghiệm: Staging Area trong Git',
      questions: [
        {
          id: 'q1',
          question: 'Staging Area trong Git đóng vai trò kỹ thuật gì?',
          type: 'single',
          options: [
            { text: 'Là vùng đệm trung gian cho phép chọn lọc các thay đổi trước khi ghi vào commit', correct: true },
            { text: 'Là nơi sao lưu dự phòng toàn bộ ổ cứng máy tính', correct: false },
            { text: 'Là máy chủ lưu trữ từ xa trên mạng Internet', correct: false },
            { text: 'Là thùng rác chứa các tệp đã xóa vĩnh viễn', correct: false },
          ],
          explanation:
            'Staging Area là khu vực chuẩn bị giúp lập trình viên tạo các commit sạch và có tổ chức. Các đáp án B, C, D đều hiểu sai kiến trúc Git.',
        },
        {
          id: 'q2',
          question: 'Tệp tin vật lý nào trong thư mục .git đại diện cho Staging Area?',
          type: 'single',
          options: [
            { text: '.git/index', correct: true },
            { text: '.git/HEAD', correct: false },
            { text: '.git/config', correct: false },
            { text: '.git/COMMIT_EDITMSG', correct: false },
          ],
          explanation:
            'Tệp `.git/index` là tệp nhị phân lưu trữ trạng thái của Staging Area. `.git/HEAD` là con trỏ nhánh; `.git/config` là tệp cấu hình.',
        },
        {
          id: 'q3',
          question: 'Nếu bạn đã chạy `git add file.txt`, sau đó mở file.txt sửa thêm 3 dòng nhưng chưa add lại, khi commit Git sẽ lưu nội dung nào?',
          type: 'single',
          options: [
            { text: 'Nội dung của file.txt tại thời điểm bạn chạy lệnh git add trước đó', correct: true },
            { text: 'Nội dung mới nhất bao gồm cả 3 dòng vừa sửa thêm', correct: false },
            { text: 'Git sẽ báo lỗi cú pháp và hủy bỏ toàn bộ commit', correct: false },
            { text: 'Tệp file.txt sẽ tự động bị xóa khỏi dự án', correct: false },
          ],
          explanation:
            'Git lưu snapshot của tệp tại chính thời điểm chạy `git add`. Mọi sửa đổi sau đó cần được `git add` lại để cập nhật vào Index.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào dùng để loại bỏ một tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung trong Working Directory?',
          type: 'single',
          options: [
            { text: 'git restore --staged <file>', correct: true },
            { text: 'git rm -f <file>', correct: false },
            { text: 'git delete --all', correct: false },
            { text: 'git push --force', correct: false },
          ],
          explanation:
            '`git restore --staged <file>` unstage tệp mà không làm mất nội dung code. `git rm -f` xóa hẳn file khỏi ổ đĩa.',
        },
      ],
    },
  },
  {
    id: '03-head-snapshot',
    moduleId: '02-git-basics',
    title: 'Repository & HEAD Snapshot',
    duration: 25,
    xp: 70,
    keywords: ['repository', 'head', 'snapshot', 'commit graph', 'kho luu tru'],
    prerequisites: ['02-staging-area'],
    objectives: [
      'Hiểu rõ khu vực thứ ba trong kiến trúc Git: Repository và cơ sở dữ liệu đối tượng.',
      'Nắm bắt khái niệm con trỏ HEAD và cách nó trỏ tới commit hiện tại của nhánh làm việc.',
      'Phân biệt snapshot bất biến trong Repository với các tệp tin khả biến trong Working Tree.',
    ],
    definition:
      'Repository (Kho lưu trữ cục bộ) là khu vực lưu trữ vĩnh viễn và bất biến của Git, nơi chứa toàn bộ cơ sở dữ liệu đối tượng commit, cây thư mục và nội dung tệp tin lịch sử dưới mã băm mật mã học. Trong Repository, con trỏ đặc biệt mang tên `HEAD` đóng vai trò là một chiếc kim đọc đĩa hát chỉ định vị trí commit hiện tại mà thư mục làm việc của bạn đang dựa vào. Khi bạn thực hiện một commit mới, Git ghi nhận một snapshot vĩnh cửu và tự động di chuyển con trỏ `HEAD` tiến lên nút mới đó.',
    why:
      'Hiểu sâu về HEAD và cơ chế lưu trữ snapshot trong Repository là chìa khóa then chốt để bạn làm chủ toàn bộ các thao tác nâng cao như di chuyển lịch sử, checkout, reset và hoàn tác. Rất nhiều người dùng Git thường xuyên sợ hãi việc mất code khi gặp lỗi, nhưng khi đã hiểu rằng dữ liệu một khi đã đi vào Repository sẽ trở thành bất biến và được bảo vệ nghiêm ngặt bằng mã băm SHA, bạn sẽ hoàn toàn yên tâm thực nghiệm và tự tin kiểm soát dự án.',
    mentalModel:
      'Hãy tưởng tượng Repository giống như kho lưu trữ bảo tàng lịch sử quốc gia với các phòng triển lãm tranh được khóa kính chống đạn. Mỗi bức tranh sơn dầu trong phòng triển lãm chính là một commit snapshot đại diện trọn vẹn cho một thời kỳ đã qua. Con trỏ `HEAD` giống như một ngọn đèn rọi di động từ trên trần nhà. Bạn di chuyển ngọn đèn rọi chiếu vào bức tranh nào thì mắt bạn (Working Tree) sẽ nhìn thấy rõ toàn cảnh thời kỳ đó.',
    diagram: `Mô hình con trỏ HEAD trong Repository:
[Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [main]
                                                ▲
                                                │
                                              [HEAD] (Đang trỏ vào nhánh main tại Commit C)`,
    example:
      'Trong một dự án xây dựng ứng dụng di động, nhóm phát triển đã tạo được 20 commit mốc tính năng. Khi một lập trình viên muốn xem lại ứng dụng hoạt động ra sao tại mốc phát hành phiên bản 1.0 (ở commit số 10), lập trình viên có thể chuyển con trỏ HEAD về vị trí commit đó. Ngay lập tức, toàn bộ các tệp tin trong Working Directory trên máy tính sẽ được hoán đổi trở về đúng trạng thái lịch sử của commit số 10 mà không hề làm mất đi các commit mới hơn ở phía trước.',
    commands: ['git log --oneline', 'git show HEAD', 'cat .git/HEAD'],
    explanation:
      '- `git log --oneline`: Hiển thị danh sách các commit trong Repository kèm vị trí hiện tại của con trỏ HEAD.\n- `git show HEAD`: Xem chi tiết thông tin tác giả, ngày giờ và nội dung thay đổi của commit mà HEAD đang trỏ vào.\n- `cat .git/HEAD`: In ra nội dung tham chiếu thực tế của tệp HEAD trong thư mục ẩn .git.',
    mistakes: [
      'Nghĩ HEAD là một nhánh độc lập: HEAD chỉ là một con trỏ tham chiếu, thông thường nó trỏ vào tên một nhánh như `refs/heads/main`.',
      'Lo lắng commit cũ sẽ bị sửa đè khi tạo commit mới: Mỗi commit mới chỉ trỏ ngược về commit cha, commit cũ hoàn toàn bất biến trong lịch sử.',
      'Sợ rằng việc di chuyển HEAD sẽ làm mất dữ liệu: Dữ liệu đã commit luôn nằm an toàn trong cơ sở dữ liệu đối tượng của kho lưu trữ.',
    ],
    labSteps: [
      'Chạy lệnh `git log --oneline` để quan sát vị trí xuất hiện của nhãn `HEAD -> main`.',
      'Chạy lệnh `git show HEAD` để xem chi tiết snapshot commit mới nhất.',
      'Nhận biết rằng HEAD luôn chỉ định trạng thái phiên bản mà bạn đang nhìn thấy.',
    ],
    hint: 'HEAD là con trỏ chỉ vị trí làm việc hiện tại của bạn trong đồ thị commit.',
    validation: 'Xác định được commit mà HEAD đang trỏ tới thông qua git log.',
    quizPrompt: 'Làm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD.',
    challenge: 'Nêu sự khác nhau giữa con trỏ nhánh bình thường và con trỏ HEAD trong Git.',
    summary: [
      'Repository là khu vực lưu trữ bất biến chứa toàn bộ snapshot lịch sử của dự án.',
      'HEAD là con trỏ đặc biệt chỉ định commit hoặc nhánh bạn đang đứng tại thời điểm hiện tại.',
      'Mỗi commit mới sẽ bổ sung một nút vào đồ thị DAG và kéo con trỏ HEAD tiến về phía trước.',
    ],
    quiz: {
      id: 'quiz-02-03-head-snapshot',
      title: 'Trắc nghiệm: Repository & HEAD Snapshot',
      questions: [
        {
          id: 'q1',
          question: 'Con trỏ HEAD trong Git đóng vai trò chính là gì?',
          type: 'single',
          options: [
            { text: 'Chỉ định vị trí commit hoặc nhánh mà bạn đang làm việc trực tiếp hiện tại', correct: true },
            { text: 'Lưu trữ mật khẩu đăng nhập vào máy chủ GitHub', correct: false },
            { text: 'Là commit đầu tiên khi khởi tạo dự án', correct: false },
            { text: 'Tự động biên dịch mã nguồn thành file chạy', correct: false },
          ],
          explanation:
            'HEAD luôn là con trỏ trỏ tới vị trí làm việc hiện tại của Working Tree trong đồ thị lịch sử commit.',
        },
        {
          id: 'q2',
          question: 'Khi bạn tạo một commit mới trong trạng thái bình thường, điều gì sẽ xảy ra với HEAD?',
          type: 'single',
          options: [
            { text: 'Nhánh hiện tại và HEAD sẽ tự động di chuyển tiến lên chỉ vào commit mới vừa tạo', correct: true },
            { text: 'HEAD sẽ bị xóa bỏ và bạn phải khởi động lại máy tính', correct: false },
            { text: 'HEAD vẫn đứng yên ở commit đầu tiên của dự án', correct: false },
            { text: 'HEAD sẽ nhảy sang kho lưu trữ của người khác', correct: false },
          ],
          explanation:
            'Khi commit mới sinh ra, nhánh hiện tại nhận commit đó làm đỉnh mới và HEAD tự động di chuyển theo.',
        },
        {
          id: 'q3',
          question: 'Snapshot trong Repository của Git có đặc tính cốt lõi nào dưới đây?',
          type: 'single',
          options: [
            { text: 'Tính bất biến (Immutable), không thể bị thay đổi âm thầm nhờ mã băm bảo mật SHA', correct: true },
            { text: 'Tự động biến mất sau 30 ngày nếu không có kết nối mạng', correct: false },
            { text: 'Có thể chỉnh sửa trực tiếp nội dung bằng phần mềm Word', correct: false },
            { text: 'Chỉ lưu lại các tệp tin có dung lượng dưới 1 kilobyte', correct: false },
          ],
          explanation:
            'Cơ sở dữ liệu commit của Git là bất biến; bất kỳ thay đổi nào cũng sẽ sinh ra một mã hash hoàn toàn mới.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào cho phép bạn xem nội dung chi tiết của commit mà HEAD đang trỏ vào?',
          type: 'single',
          options: [
            { text: 'git show HEAD', correct: true },
            { text: 'git delete HEAD', correct: false },
            { text: 'git clear HEAD', correct: false },
            { text: 'git push HEAD --now', correct: false },
          ],
          explanation:
            '`git show HEAD` in ra toàn bộ siêu dữ liệu và diff chi tiết của commit hiện tại.',
        },
      ],
    },
  },
  {
    id: '04-git-status',
    moduleId: '02-git-basics',
    title: 'Kiểm tra trạng thái với git status',
    duration: 25,
    xp: 80,
    keywords: ['git status', 'trang thai', 'kiem tra', 'short format', 'porcelain'],
    prerequisites: ['03-head-snapshot'],
    objectives: [
      'Đọc và phân tích thành thạo toàn bộ các phần thông tin hiển thị bởi lệnh `git status`.',
      'Phân biệt rõ ràng giữa Changes to be committed, Changes not staged for commit, và Untracked files.',
      'Sử dụng định dạng ngắn gọn `git status -s` để quan sát trạng thái nhanh chóng.',
    ],
    definition:
      '`git status` là câu lệnh được sử dụng với tần suất cao nhất trong Git, có nhiệm vụ hiển thị bức tranh toàn cảnh về sự khác biệt giữa ba khu vực: Working Tree, Staging Area và con trỏ HEAD của Repository. Lệnh này phân loại rõ ràng các tệp tin theo từng nhóm trạng thái màu sắc trực quan: tệp đã được đưa vào Staging Area sẵn sàng commit, tệp đã theo dõi nhưng bị chỉnh sửa mà chưa stage, và các tệp mới hoàn toàn chưa từng được Git quản lý.',
    why:
      'Việc chạy `git status` trước và sau mỗi thao tác Git là thói quen sống còn của mọi kỹ sư phần mềm chuyên nghiệp. Nó giúp bạn tránh được những tai nạn ngớ ngẩn như commit nhầm file rác, quên chưa stage các thay đổi quan trọng, hoặc vô tình đang đứng sai nhánh mà không hay biết. Có thể nói, `git status` giống như bảng đồng hồ tốc độ và cảm biến an toàn trên chiếc xe ô tô mà bạn lái mỗi ngày.',
    mentalModel:
      'Hãy hình dung `git status` giống như một người bác sĩ chụp X-quang toàn thân cho dự án phần mềm của bạn. Mỗi khi bạn bước vào phòng khám (mở terminal), người bác sĩ sẽ quét một lượt từ đầu đến chân và đưa ra một bản chẩn đoán rõ ràng: bộ phận nào đang khỏe mạnh ổn định (Unmodified), bộ phận nào đang có biểu hiện viêm nhiễm cần xử lý (Modified), và có dị vật nào mới xuất hiện trong cơ thể hay không (Untracked).',
    diagram: `Bản chẩn đoán trạng thái git status:
┌─────────────────────────────────────────────────────────────┐
│ On branch main                                              │
│                                                             │
│ Changes to be committed:          <── (Màu xanh lá - Staged)│
│   (use "git restore --staged <file>" to unstage)            │
│         new file:   index.html                              │
│                                                             │
│ Changes not staged for commit:    <── (Màu đỏ - Modified)   │
│   (use "git add <file>" to update what will be committed)   │
│         modified:   styles.css                              │
│                                                             │
│ Untracked files:                  <── (Màu đỏ - Untracked)  │
│         notes.txt                                           │
└─────────────────────────────────────────────────────────────┘`,
    example:
      'Một kỹ sư mở máy tính vào sáng thứ Hai sau kỳ nghỉ cuối tuần. Không nhớ rõ thứ Sáu tuần trước mình đã làm dở những gì, kỹ sư mở terminal tại dự án và gõ ngay lệnh git status. Màn hình thông báo nhánh hiện tại là feature-login, có hai tệp auth.js và login.html đã nằm trong Staging Area, cùng một tệp test.log đang ở mục Untracked. Nhờ thông tin rõ ràng đó, kỹ sư lập tức nắm bắt lại ngữ cảnh làm việc và tiếp tục công việc một cách tự tin, đồng thời chủ động loại bỏ tệp log rác trước khi tiến hành đóng gói commit hoàn thiện.',
    commands: ['git status', 'git status -s', 'git status --short'],
    explanation:
      '- `git status`: Hiển thị báo cáo trạng thái chi tiết kèm theo các chỉ dẫn và câu lệnh gợi ý hoàn tác hữu ích.\n- `git status -s` (hoặc `--short`): Hiển thị trạng thái dưới định dạng hai ký tự ngắn gọn gọn gàng và dễ nhìn hơn.',
    mistakes: [
      'Gõ lệnh mù quáng mà không kiểm tra git status trước: Dẫn đến việc add hoặc commit nhầm các file không mong muốn.',
      'Bỏ qua thông báo tệp Untracked: Tưởng rằng code đã được lưu an toàn nhưng thực tế file mới tạo chưa hề được đưa vào Git.',
      'Hiểu sai định dạng git status -s: Nhầm lẫn giữa cột ký tự bên trái (Staging Area) và cột bên phải (Working Tree).',
    ],
    labSteps: [
      'Chạy lệnh `git status` trong kho lưu trữ để làm quen với giao diện kết quả mặc định.',
      'Tạo một tệp mới và chạy `git status` để quan sát nhóm Untracked files.',
      'Thử nghiệm cờ rút gọn bằng câu lệnh `git status -s`.',
    ],
    hint: 'Hãy tạo phản xạ gõ `git status` trước bất kỳ lệnh add, commit hay chuyển nhánh nào.',
    validation: 'Thực thi thành công `git status` và nhận diện đúng các khu vực trạng thái.',
    quizPrompt: 'Làm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu lệnh git status.',
    challenge: 'Giải thích ý nghĩa của hai ký tự `M ` (M ở cột 1) và ` M` (M ở cột 2) trong `git status -s`.',
    summary: [
      '`git status` là công cụ chẩn đoán quan trọng nhất để xem tình trạng 3 khu vực của Git.',
      'Phân tách rõ ràng: Changes to be committed (xanh), Not staged (đỏ), và Untracked (đỏ).',
      'Nên sử dụng thường xuyên để kiểm soát tuyệt đối các tệp tin trước khi đóng gói commit.',
    ],
    quiz: {
      id: 'quiz-02-04-git-status',
      title: 'Trắc nghiệm: Kiểm tra trạng thái với git status',
      questions: [
        {
          id: 'q1',
          question: 'Mục "Changes to be committed" trong kết quả lệnh git status cho biết điều gì?',
          type: 'single',
          options: [
            { text: 'Danh sách các thay đổi đã nằm trong Staging Area và sẽ được đưa vào commit kế tiếp', correct: true },
            { text: 'Các commit đã được đẩy thành công lên máy chủ GitHub', correct: false },
            { text: 'Các tệp tin bị lỗi chính tả cần sửa lại ngay', correct: false },
            { text: 'Các tệp tin bị xóa vĩnh viễn khỏi ổ đĩa máy tính', correct: false },
          ],
          explanation:
            '`Changes to be committed` đại diện cho các thay đổi đã được staged bằng lệnh git add và sẵn sàng commit.',
        },
        {
          id: 'q2',
          question: 'Trong định dạng ngắn gọn `git status -s`, ký hiệu `??` biểu thị trạng thái nào?',
          type: 'single',
          options: [
            { text: 'Tệp tin Untracked (chưa từng được Git theo dõi trong lịch sử)', correct: true },
            { text: 'Tệp tin bị xung đột merge nghiêm trọng không thể sửa', correct: false },
            { text: 'Git đang bị mất kết nối mạng Internet', correct: false },
            { text: 'Tệp tin có virus bị hệ điều hành cách ly', correct: false },
          ],
          explanation:
            'Ký hiệu `??` là quy ước quốc tế trong định dạng short của git status để chỉ các tệp Untracked.',
        },
        {
          id: 'q3',
          question: 'Mục "Changes not staged for commit" có ý nghĩa gì?',
          type: 'single',
          options: [
            { text: 'Các tệp tin đã được Git theo dõi từ trước, hiện đang có sửa đổi mới trong Working Tree nhưng chưa chạy git add', correct: true },
            { text: 'Các tệp tin bị hỏng dữ liệu không thể mở được bằng VS Code', correct: false },
            { text: 'Các tệp tin đã được đưa vào Staging Area thành công', correct: false },
            { text: 'Các commit cũ đã được xóa bỏ khỏi kho chứa', correct: false },
          ],
          explanation:
            'Đây là những thay đổi trên tệp Tracked đang nằm ở Working Directory mà bạn chưa đưa vào Staging Area.',
        },
        {
          id: 'q4',
          question: 'Lợi ích lớn nhất của việc chạy git status thường xuyên là gì?',
          type: 'single',
          options: [
            { text: 'Giúp lập trình viên nắm rõ ngữ cảnh, tránh commit nhầm file rác và phát hiện tệp chưa được lưu vết', correct: true },
            { text: 'Tự động tăng tốc độ xử lý của card màn hình máy tính', correct: false },
            { text: 'Tự động viết mã nguồn hoàn chỉnh cho tính năng', correct: false },
            { text: 'Thay thế hoàn toàn sự cần thiết của việc viết kiểm thử', correct: false },
          ],
          explanation:
            'Kiểm tra trạng thái liên tục giúp bạn kiểm soát tuyệt đối mã nguồn trước khi ghi lại vào lịch sử.',
        },
      ],
    },
  },
  {
    id: '05-git-add',
    moduleId: '02-git-basics',
    title: 'Đưa tệp vào staging với git add',
    duration: 25,
    xp: 80,
    keywords: ['git add', 'staging', 'stage changes', 'chon loc thay doi', 'patch mode'],
    prerequisites: ['04-git-status'],
    objectives: [
      'Sử dụng thành thạo câu lệnh `git add` với các cú pháp: tệp chỉ định, thư mục, và `git add .`.',
      'Hiểu rõ sự khác biệt và rủi ro tiềm ẩn giữa `git add <file>` có chọn lọc và `git add .`.',
      'Làm quen với kỹ thuật stage từng khối dòng code bằng cờ `-p` (patch mode).',
    ],
    definition:
      '`git add` là câu lệnh thiết yếu dùng để chuyển các thay đổi trên tệp tin từ Working Directory vào Staging Area (vùng chuẩn bị). Lệnh này thông báo cho Git biết rằng bạn muốn đưa trạng thái hiện tại của tệp tin được chỉ định vào ảnh chụp snapshot sắp tới. Bạn có thể thêm từng tệp đơn lẻ (`git add file.txt`), thêm toàn bộ một thư mục (`git add src/`), hoặc thêm tất cả các thay đổi có trong thư mục hiện tại (`git add .`). Đối với tệp tin mới tạo, `git add` bắt đầu đưa tệp vào diện theo dõi (Tracked).',
    why:
      'Làm chủ lệnh `git add` chính là kỹ năng làm chủ nghệ thuật đóng gói commit sạch sẽ trong quy trình phát triển phần mềm chuyên nghiệp. Rất nhiều lập trình viên mới có thói quen lười biếng luôn gõ `git add .` trong mọi tình huống, dẫn đến việc vô tình đưa cả tệp cấu hình chứa mật khẩu database, file binary nặng hàng trăm megabyte hoặc code thử nghiệm dở dang lên kho chứa chung. Sử dụng `git add` có chọn lọc là thước đo tính kỷ luật của một kỹ sư phần mềm.',
    mentalModel:
      'Hãy hình dung việc chạy lệnh `git add` giống như hành động bạn cầm một món hàng từ trên kệ siêu thị (Working Directory) và đặt nó vào giỏ hàng của bạn (Staging Area). Khi bạn đi dạo quanh siêu thị, bạn có thể xem xét và chạm vào hàng chục món đồ khác nhau. Nhưng chỉ những món đồ nào bạn quyết định đặt vào giỏ hàng thì lát nữa khi ra quầy thu ngân thanh toán (git commit), nhân viên mới tính tiền và in hóa đơn ghi nhận quyền sở hữu cho bạn.',
    diagram: `Thao tác đưa tệp vào giỏ hàng:
[Working Directory]                                      [Staging Area]
  ├── index.html ──(git add index.html)────────────────► index.html (đã staged)
  ├── styles.css ──(git add styles.css)────────────────► styles.css (đã staged)
  └── temp.log   ──(không add)─────────────────────────► (vẫn ở Working Tree)`,
    example:
      'Kỹ sư đang phát triển tính năng xác thực hai yếu tố cho hệ thống ngân hàng trực tuyến. Kỹ sư sửa đổi mã nguồn trong src/auth.js, viết tệp kiểm thử tests/auth.test.js, và ghi chép một số ghi chú nháp vào notes.txt. Khi chuẩn bị commit, kỹ sư chạy lệnh git add src/auth.js tests/auth.test.js. Tệp notes.txt không được thêm và vẫn nằm an toàn trên máy cá nhân mà không bị commit nhầm vào lịch sử chung của cả nhóm dự án, bảo đảm tính bảo mật tối đa cho toàn bộ mã nguồn của ngân hàng. Sau đó, kỹ sư cẩn thận kiểm tra lại trạng thái bằng git status để đảm bảo chỉ đúng hai tệp trên đã chuyển sang màu xanh trong vùng Staging Area, hoàn toàn an tâm trước khi thực hiện bước đóng gói snapshot tiếp theo.',
    commands: ['git add <file>', 'git add .', 'git add -A', 'git add -p'],
    explanation:
      '- `git add <file>`: Đưa một tệp tin cụ thể vào Staging Area có chọn lọc an toàn tuyệt đối.\n- `git add .`: Đưa toàn bộ các thay đổi trong thư mục hiện tại trở xuống vào Staging Area.\n- `git add -A`: Đưa tất cả thay đổi trên toàn bộ kho lưu trữ vào Staging Area bất kể thư mục hiện tại.\n- `git add -p`: Chế độ tương tác từng khối thay đổi (patch) cho phép bạn duyệt từng dòng code.',
    mistakes: [
      'Luôn luôn gõ git add . mà không kiểm tra git status trước: Dẫn đến việc commit nhầm các file bí mật như `.env`, khóa API hoặc file rác hệ thống.',
      'Nghĩ git add là đã lưu vào lịch sử vĩnh viễn: `git add` mới chỉ đưa vào phòng chuẩn bị, nếu máy tính bị sập nguồn hoặc xóa thư mục trước khi `git commit`, dữ liệu vẫn có thể bị thất lạc.',
      'Không đọc kỹ thông báo khi git add gặp file quá lớn: Cố gắng add các file video hoặc zip nặng khiến Git chạy chậm chạp.',
    ],
    labSteps: [
      'Tạo tệp `app.js` với nội dung `console.log("Git Add Lab");`.',
      'Chạy `git status` để thấy tệp đang ở danh sách Untracked màu đỏ.',
      'Chạy lệnh `git add app.js` để đưa tệp vào Staging Area.',
      'Chạy lại `git status` để xác nhận tệp đã chuyển sang màu xanh lá cây.',
    ],
    hint: 'Gõ `git add <tên-tệp>` để thêm chính xác tệp tin bạn mong muốn.',
    validation: 'Kiểm tra `git status` hiển thị tệp `app.js` trong mục Changes to be committed.',
    quizPrompt: 'Hãy trả lời các câu hỏi dưới đây để củng cố kỹ năng sử dụng lệnh git add.',
    challenge: 'Tìm hiểu cờ `git add -p` (patch) và giải thích lợi ích của việc stage từng khối dòng code (hunk).',
    summary: [
      '`git add` đưa các thay đổi từ Working Directory vào Staging Area sẵn sàng để commit.',
      'Bắt đầu theo dõi các tệp tin mới (chuyển trạng thái từ Untracked thành Tracked/Staged).',
      'Nên ưu tiên add có chọn lọc từng tệp thay vì lạm dụng `git add .` để tránh commit nhầm tệp rác.',
    ],
    quiz: {
      id: 'quiz-02-05-git-add',
      title: 'Trắc nghiệm: Sử dụng lệnh git add',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh nào dưới đây đưa một tệp tin cụ thể mang tên `main.js` vào Staging Area?',
          type: 'single',
          options: [
            { text: 'git add main.js', correct: true },
            { text: 'git stage-create main.js', correct: false },
            { text: 'git push main.js', correct: false },
            { text: 'git commit main.js', correct: false },
          ],
          explanation:
            '`git add <tên-tệp>` là cú pháp chuẩn xác để đưa tệp vào Staging Area.',
        },
        {
          id: 'q2',
          question: 'Lệnh `git add .` thực hiện hành động gì?',
          type: 'single',
          options: [
            { text: 'Thêm tất cả các tệp tin bị thay đổi hoặc tạo mới trong thư mục hiện tại vào Staging Area', correct: true },
            { text: 'Xóa sạch tất cả các tệp tin trong thư mục hiện tại', correct: false },
            { text: 'Tải toàn bộ mã nguồn trên GitHub về thư mục hiện tại', correct: false },
            { text: 'Đóng cửa sổ dòng lệnh terminal ngay lập tức', correct: false },
          ],
          explanation:
            'Dấu chấm `.` đại diện cho thư mục hiện tại, `git add .` thêm toàn bộ thay đổi từ thư mục đó trở xuống.',
        },
        {
          id: 'q3',
          question: 'Cờ tùy chọn nào của git add cho phép bạn xem và chọn lọc từng khối dòng code (hunk) để stage?',
          type: 'single',
          options: [
            { text: '-p (viết tắt của --patch)', correct: true },
            { text: '-f (force)', correct: false },
            { text: '-d (delete)', correct: false },
            { text: '-m (message)', correct: false },
          ],
          explanation:
            '`git add -p` mở chế độ tương tác patch mode cho phép duyệt và stage từng khối dòng code riêng lẻ.',
        },
        {
          id: 'q4',
          question: 'Tại sao các kỹ sư phần mềm khuyến cáo không nên lạm dụng lệnh git add .?',
          type: 'single',
          options: [
            { text: 'Dễ vô tình đưa các tệp tin bí mật như mật khẩu, file log và tài nguyên rác vào commit', correct: true },
            { text: 'Vì lệnh này làm hỏng ổ cứng máy tính ngay lập tức', correct: false },
            { text: 'Vì lệnh này chỉ chạy được duy nhất một lần trong đời dự án', correct: false },
            { text: 'Vì lệnh này bị cấm bởi tổ chức tiêu chuẩn quốc tế ISO', correct: false },
          ],
          explanation:
            '`git add .` gom bừa toàn bộ mọi thứ, rất dễ làm rò rỉ tệp chứa khóa bí mật hoặc làm loãng lịch sử.',
        },
      ],
    },
  },
  {
    id: '06-git-commit',
    moduleId: '02-git-basics',
    title: 'Lưu snapshot với git commit',
    duration: 30,
    xp: 100,
    keywords: ['git commit', 'snapshot', 'commit message', 'checkpoint', 'save point', 'sha-1'],
    prerequisites: ['05-git-add'],
    objectives: [
      'Nắm vững bản chất kỹ thuật của Commit trong Git như một snapshot toàn vẹn của cây thư mục.',
      'Sử dụng thành thạo các câu lệnh `git commit -m "<thông-điệp>"` và `git commit -am "<thông-điệp>`.',
      'Hiểu cách Git liên kết các commit qua cấu trúc Directed Acyclic Graph (DAG) và mã băm SHA.',
      'Tuân thủ quy ước viết thông điệp commit rõ ràng và súc tích.',
    ],
    definition:
      '`git commit` là câu lệnh cốt lõi dùng để ghi lại một điểm kiểm tra (checkpoint / snapshot) vĩnh viễn trong lịch sử của kho mã nguồn (Repository). Mỗi commit bao gồm một ảnh chụp cây thư mục hoàn chỉnh tại thời điểm đó, thông tin định danh tác giả (author name và email), mốc thời gian (timestamp), thông điệp mô tả thay đổi (commit message), và con trỏ trỏ tới một hoặc nhiều commit cha (parent commits). Khác với các hệ thống VCS cũ lưu sự khác biệt dòng code (deltas), Git lưu toàn bộ cây thư mục dưới dạng Snapshot tối ưu.',
    why:
      'Commit chính là đơn vị tiền tệ cơ bản của hệ thống Git. Nếu không có commit, toàn bộ công sức bạn viết code suốt nhiều tuần có thể biến mất bất kỳ lúc nào nếu máy tính gặp sự cố phần cứng. Tạo commit thường xuyên với kích thước vừa phải và thông điệp chuẩn mực giúp bạn sở hữu một cỗ máy thời gian hoàn hảo: bạn có thể tự do thử nghiệm các giải pháp táo bạo, và khi gặp ngõ cụt thì chỉ mất một giây để quay lui về mốc an toàn gần nhất.',
    mentalModel:
      'Hãy hình dung việc chạy lệnh `git commit` giống như thao tác bấm nút Lưu game (Save Point) trong một tựa game nhập vai phiêu lưu mạo hiểm. Trước khi bước vào căn phòng đánh trùm nguy hiểm, bạn luôn tìm điểm save game để ghi lại toàn bộ chỉ số máu, trang bị và vị trí của nhân vật. Nếu bạn bị hạ gục trong trận chiến, bạn chỉ việc tải lại điểm save game đó để thử lại chiến thuật mới mà không phải chơi lại từ đầu màn một.',
    diagram: `Cấu trúc liên kết Commit trong đồ thị DAG:
Commit #1 (Initial)          Commit #2 (Feature)          Commit #3 (Bugfix - HEAD)
┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│ Tree: 8a4c10         │ ◄── │ Tree: 9f2e30         │ ◄── │ Tree: 7c1b50         │
│ Author: Nam Nguyen   │     │ Author: Nam Nguyen   │     │ Author: Nam Nguyen   │
│ Parent: (none)       │     │ Parent: Commit #1    │     │ Parent: Commit #2    │
│ Msg: init project    │     │ Msg: add login page  │     │ Msg: fix login button│
└──────────────────────┘     └──────────────────────┘     └──────────────────────┘`,
    example:
      'Một kỹ sư phần mềm hoàn thành xong chức năng đặt lại mật khẩu qua email cho người dùng. Kỹ sư chạy lệnh git add để đưa các tệp liên quan vào Staging Area, sau đó thực hiện lệnh: `git commit -m "feat(auth): implement password reset via email token"`. Ngay lập tức, Git tạo ra một commit object mới mang mã băm c9a4f21 trỏ về commit trước đó, ghi nhận thời gian chính xác và dịch chuyển con trỏ HEAD của nhánh main tiến lên mốc mới này. Toàn bộ ảnh chụp trạng thái code lúc này đã được lưu vĩnh viễn trong cơ sở dữ liệu của dự án, sẵn sàng để đồng nghiệp tải về kiểm thử bất cứ lúc nào.',
    commands: [
      'git commit -m "feat: your commit message"',
      'git commit -am "fix: quick fix"',
      'git commit --amend',
    ],
    explanation:
      '- `git commit -m "<thông-điệp>"`: Tạo một commit mới từ các tệp tin đã nằm trong Staging Area kèm thông điệp mô tả tóm tắt ngắn gọn.\n- `git commit -am "<thông-điệp>"`: Phím tắt tự động stage tất cả các tệp Modified và tạo commit mà không cần chạy git add trước (không áp dụng cho tệp Untracked).\n- `git commit --amend`: Chỉnh sửa commit gần nhất trên đỉnh HEAD (thêm tệp sót hoặc viết lại thông điệp commit).',
    mistakes: [
      'Thông điệp commit vô nghĩa: Viết những câu như "fix", "update", "asdfgh" khiến đồng nghiệp và chính bạn sau này không thể hiểu commit đó làm gì.',
      'Commit quá lớn (Mega-commit): Gom công việc của cả tuần với hàng trăm thay đổi không liên quan vào một commit duy nhất khiến việc review và tìm lỗi bất khả thi.',
      'Nghĩ commit là đã đẩy lên mạng: Commit chỉ lưu trên kho chứa máy tính cá nhân cục bộ, phải chạy lệnh git push thì code mới lên GitHub.',
    ],
    labSteps: [
      'Tạo hoặc chỉnh sửa tệp `main.js` với nội dung mới.',
      'Đưa tệp vào Staging Area bằng lệnh `git add main.js`.',
      'Tạo commit đầu tiên bằng câu lệnh `git commit -m "feat: initialize main app"`.',
      'Kiểm tra lại bằng `git log --oneline` để thấy commit mới sinh ra.',
    ],
    hint: 'Một commit tốt nên tập trung vào một nhiệm vụ duy nhất và có thông điệp rõ ràng.',
    validation: 'Kiểm tra `git log` có xuất hiện commit với đúng thông điệp đã nhập.',
    quizPrompt: 'Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết sâu sắc về câu lệnh git commit.',
    challenge: 'Nêu sự khác nhau giữa commit trong Git và commit trong cơ sở dữ liệu quan hệ SQL.',
    summary: [
      'Git Commit là mốc snapshot vĩnh viễn ghi nhận toàn bộ trạng thái dự án tại một thời điểm.',
      'Mỗi commit gồm cây thư mục, tác giả, ngày giờ, thông điệp và liên kết trỏ về commit cha.',
      'Sử dụng quy ước Conventional Commits giúp lịch sử dự án chuyên nghiệp và dễ bảo trì.',
    ],
    quiz: {
      id: 'quiz-02-06-git-commit',
      title: 'Trắc nghiệm chuyên sâu: Bản chất lệnh git commit',
      questions: [
        {
          id: 'q1',
          question: 'Bản chất kỹ thuật của một commit trong Git là gì?',
          type: 'single',
          options: [
            { text: 'Một ảnh chụp toàn diện (Snapshot) của toàn bộ cây thư mục tại một thời điểm cụ thể', correct: true },
            { text: 'Một bản ghi chứa các dòng code bị xóa khỏi ổ cứng', correct: false },
            { text: 'Một lệnh gửi email tự động tới ban giám đốc công ty', correct: false },
            { text: 'Một tệp sao lưu nén định dạng zip đặt ngoài màn hình Desktop', correct: false },
          ],
          explanation:
            'Git lưu trữ commit dưới dạng một snapshot toàn vẹn của cây thư mục, tái sử dụng các tệp không đổi qua con trỏ.',
        },
        {
          id: 'q2',
          question: 'Lệnh nào dưới đây tạo commit mới với thông điệp ngắn gọn mà không cần mở trình soạn thảo văn bản?',
          type: 'single',
          options: [
            { text: 'git commit -m "thông điệp"', correct: true },
            { text: 'git commit --text "thông điệp"', correct: false },
            { text: 'git commit -s "thông điệp"', correct: false },
            { text: 'git save "thông điệp"', correct: false },
          ],
          explanation:
            'Cờ `-m` viết tắt của `--message` cho phép truyền thông điệp commit trực tiếp trên dòng lệnh.',
        },
        {
          id: 'q3',
          question: 'Lệnh `git commit -am "fix bug"` có hạn chế quan trọng nào mà lập trình viên cần lưu ý?',
          type: 'single',
          options: [
            { text: 'Không tự động stage được các tệp tin mới tạo ở trạng thái Untracked', correct: true },
            { text: 'Lệnh này chỉ chạy được trên hệ điều hành macOS', correct: false },
            { text: 'Lệnh này xóa sạch toàn bộ lịch sử commit trước đó', correct: false },
            { text: 'Lệnh này bắt buộc phải có kết nối Internet mới chạy được', correct: false },
          ],
          explanation:
            'Cờ `-a` chỉ tự động stage các tệp Modified đã được theo dõi, hoàn toàn bỏ qua các tệp Untracked.',
        },
        {
          id: 'q4',
          question: 'Sau khi chạy lệnh git commit trên máy cá nhân, mã nguồn của bạn đã nằm ở đâu?',
          type: 'single',
          options: [
            { text: 'Nằm an toàn trong kho lưu trữ Git cục bộ trên ổ cứng máy bạn', correct: true },
            { text: 'Đã tự động xuất hiện trên trang web GitHub của cả nhóm', correct: false },
            { text: 'Đã được gửi tới kho lưu trữ trung tâm của Google', correct: false },
            { text: 'Đã bị mã hóa và gửi vào hòm thư điện tử', correct: false },
          ],
          explanation:
            'Git commit chỉ ghi nhận dữ liệu vào cơ sở dữ liệu cục bộ; cần dùng lệnh `git push` để đẩy lên máy chủ GitHub.',
        },
        {
          id: 'q5',
          question: 'Mỗi đối tượng commit trong Git bắt buộc phải chứa thông tin nào sau đây?',
          type: 'single',
          options: [
            { text: 'Con trỏ tới cây thư mục (Tree), thông tin tác giả, mốc thời gian và thông điệp commit', correct: true },
            { text: 'Số chứng minh nhân dân hoặc căn cước của lập trình viên', correct: false },
            { text: 'Mật khẩu thẻ tín dụng dùng để thanh toán phí bản quyền', correct: false },
            { text: 'Địa chỉ nhà riêng và số điện thoại của tác giả', correct: false },
          ],
          explanation:
            'Một commit object chuẩn của Git gồm mã hash cây thư mục, commit cha, tác giả (author/committer), timestamp và message.',
        },
        {
          id: 'q6',
          question: 'Lệnh `git commit --amend` thường được sử dụng trong trường hợp nào?',
          type: 'single',
          options: [
            { text: 'Bổ sung tệp tin bị bỏ sót hoặc sửa lại thông điệp của commit gần nhất', correct: true },
            { text: 'Xóa toàn bộ kho lưu trữ Git để làm lại từ đầu', correct: false },
            { text: 'Tạo một nhánh mới có tên là amend', correct: false },
            { text: 'Khóa kho chứa để không ai được phép commit nữa', correct: false },
          ],
          explanation:
            '`--amend` cho phép sửa đổi snapshot hoặc message của commit ngay trên đỉnh HEAD mà không tạo thêm commit rác.',
        },
      ],
    },
  },
  {
    id: '07-commit-message',
    moduleId: '02-git-basics',
    title: 'Chuẩn quy ước Commit Message',
    duration: 20,
    xp: 60,
    keywords: ['commit message', 'conventional commits', 'feat', 'fix', 'quy uoc'],
    prerequisites: ['06-git-commit'],
    objectives: [
      'Nắm vững cấu trúc chuẩn của quy ước Conventional Commits quốc tế.',
      'Sử dụng thành thạo các tiền tố tiêu chuẩn: feat, fix, docs, style, refactor, test, chore.',
      'Hiểu tầm quan trọng của việc viết thông điệp commit rõ ràng phục vụ việc sinh tự động Changelog.',
    ],
    definition:
      'Quy ước Commit Message (tiêu biểu nhất là chuẩn Conventional Commits) là một tập hợp các nguyên tắc định dạng thông điệp commit có cấu trúc rõ ràng và chặt chẽ, giúp con người và các công cụ tự động hóa dễ dàng đọc hiểu bản chất thay đổi trong lịch sử phát triển dự án. Cấu trúc chuẩn bao gồm: tiền tố loại thay đổi (`type`), phạm vi module tùy chọn (`scope`), dấu hai chấm và mô tả ngắn gọn súc tích (`description`). Ví dụ tiêu biểu: `feat(auth): add google oauth2 login`. Quy ước này loại bỏ sự tùy tiện và nâng cao tính chuyên nghiệp của toàn đội ngũ.',
    why:
      'Một dự án phần mềm chuyên nghiệp có thể kéo dài nhiều năm với sự tham gia của hàng trăm kỹ sư. Nếu mọi người đều viết commit vô tội vạ như "fix bug", "done", "test", lịch sử dự án sẽ trở thành một mớ bòng bong không thể kiểm toán. Áp dụng chuẩn Conventional Commits giúp toàn bộ đội ngũ nắm bắt được tiến độ tính năng mới (feat) hay sửa lỗi (fix), đồng thời cho phép các công cụ CI/CD tự động tính toán số phiên bản Semantic Versioning và xuất file nhật ký thay đổi CHANGELOG.md tức thì.',
    mentalModel:
      'Hãy hình dung commit message giống như tiêu đề của một bài báo tin tức trên trang nhất nhật báo buổi sáng. Người biên tập báo không bao giờ giật tít mơ hồ là "Hôm nay có việc xảy ra". Thay vào đó, tít báo luôn có chuyên mục và hành động rõ ràng: "[Kinh tế] Giá vàng lập đỉnh mới sáng nay" hoặc "[Giao thông] Khởi công tuyến đường vành đai 4". Nhờ đó, độc giả chỉ cần lướt qua mục lục là nắm trọn vẹn tình hình trong ngày.',
    diagram: `Cấu trúc chuẩn Conventional Commits:
┌───────────────┬───────────┬───────────────────────────────────────────┐
│ Type (Loại)   │ Scope     │ Description (Mô tả súc tích)              │
├───────────────┼───────────┼───────────────────────────────────────────┤
│ feat          │ (auth)    │ add jwt token refresh mechanism           │
│ fix           │ (payment) │ handle stripe webhook timeout exception   │
│ docs          │ (readme)  │ update installation commands for windows  │
│ refactor      │ (api)     │ simplify user profile data serializer     │
└───────────────┴───────────┴───────────────────────────────────────────┘`,
    example:
      'Khi phát triển tính năng lọc sản phẩm theo mức giá trên trang thương mại điện tử, kỹ sư viết commit: `feat(product): add price range filter component`. Khi sửa một lỗi hiển thị tiền tệ bị lệch số 0 trên hóa đơn, kỹ sư viết: `fix(billing): format currency display for vietnam dong`. Khi đọc lại lịch sử qua git log, bất kỳ ai trong nhóm cũng biết chính xác chức năng nào được thêm mới và lỗi nào vừa được khắc phục. Hệ thống CI/CD cũng nhờ đó mà tự động nhận diện bản phát hành tiếp theo là bản cập nhật tính năng hay chỉ là bản vá lỗi nhỏ.',
    commands: [
      'git commit -m "feat(scope): short description"',
      'git commit -m "fix: resolve memory leak in worker"',
    ],
    explanation:
      '- `git commit -m "feat: <mô-tả>"`: Tạo commit thêm mới một tính năng người dùng trong hệ thống phần mềm, kích hoạt nâng số phiên bản MINOR trong Semantic Versioning.\n- `git commit -m "fix: <mô-tả>"`: Tạo commit sửa chữa một lỗi phần mềm đã được phát hiện trong mã nguồn, kích hoạt nâng số phiên bản PATCH.',
    mistakes: [
      'Viết thông điệp quá dài dòng ở dòng tiêu đề đầu tiên: Dòng đầu tiên chỉ nên gói gọn dưới 50 đến 72 ký tự.',
      'Sử dụng thì quá khứ thay vì thể mệnh lệnh hiện tại: Nên viết "add feature" thay vì "added feature".',
      'Lẫn lộn giữa feat và fix: Dùng nhãn fix cho một tính năng hoàn toàn mới hoặc ngược lại.',
    ],
    labSteps: [
      'Tạo một tệp `auth.js` và đưa vào Staging Area.',
      'Thực hiện commit với tiền tố chuẩn: `git commit -m "feat(auth): create basic login structure"`.',
      'Quan sát commit hiển thị trong `git log --oneline`.',
    ],
    hint: 'Sử dụng các tiền tố: feat, fix, docs, refactor, test, chore.',
    validation: 'Kiểm tra commit message tuân thủ định dạng Conventional Commits.',
    quizPrompt: 'Hãy trả lời các câu hỏi sau về quy ước viết commit message chuyên nghiệp.',
    challenge: 'Nêu ý nghĩa của dấu chấm than `feat!:` trong quy ước Conventional Commits.',
    summary: [
      'Conventional Commits cung cấp định dạng chuẩn: type(scope): description.',
      'Các loại type phổ biến nhất gồm: feat (tính năng mới), fix (sửa lỗi), docs (tài liệu), chore (bảo trì).',
      'Giúp tự động hóa việc tính toán phiên bản SemVer và sinh CHANGELOG.',
    ],
    quiz: {
      id: 'quiz-02-07-commit-message',
      title: 'Trắc nghiệm: Chuẩn quy ước Commit Message',
      questions: [
        {
          id: 'q1',
          question: 'Trong quy ước Conventional Commits, tiền tố `feat:` được dùng khi nào?',
          type: 'single',
          options: [
            { text: 'Khi bổ sung một tính năng mới cho người dùng hoặc hệ thống', correct: true },
            { text: 'Khi sửa một lỗi phần mềm phát sinh', correct: false },
            { text: 'Khi cập nhật tài liệu hướng dẫn sử dụng README', correct: false },
            { text: 'Khi nâng cấp phiên bản thư viện trong package.json', correct: false },
          ],
          explanation:
            '`feat:` (viết tắt của feature) biểu thị việc thêm tính năng mới. `fix:` dùng cho sửa lỗi; `docs:` cho tài liệu; `chore:` cho việc bảo trì.',
        },
        {
          id: 'q2',
          question: 'Tiền tố nào phù hợp nhất khi bạn chỉ sửa đổi tài liệu hướng dẫn trong tệp README.md?',
          type: 'single',
          options: [
            { text: 'docs', correct: true },
            { text: 'fix', correct: false },
            { text: 'feat', correct: false },
            { text: 'perf', correct: false },
          ],
          explanation:
            '`docs:` là loại commit chuyên biệt cho các thay đổi trên tài liệu văn bản mà không tác động tới mã logic.',
        },
        {
          id: 'q3',
          question: 'Độ dài khuyến nghị tối đa cho dòng tiêu đề đầu tiên của một commit message là bao nhiêu?',
          type: 'single',
          options: [
            { text: 'Khoảng 50 đến 72 ký tự', correct: true },
            { text: 'Tối thiểu 500 từ', correct: false },
            { text: 'Không giới hạn, càng dài càng tốt', correct: false },
            { text: 'Chính xác 10 ký tự', correct: false },
          ],
          explanation:
            'Tiêu đề commit nên ngắn gọn súc tích dưới 50-72 ký tự để hiển thị trọn vẹn trên terminal và giao diện GitHub.',
        },
        {
          id: 'q4',
          question: 'Lợi ích chính của việc cả nhóm cùng tuân thủ Conventional Commits là gì?',
          type: 'single',
          options: [
            { text: 'Lịch sử rõ ràng, dễ tìm kiếm, tự động sinh nhật ký thay đổi và nâng version phần mềm', correct: true },
            { text: 'Giúp mã nguồn chạy nhanh hơn gấp đôi mà không cần tối ưu thuật toán', correct: false },
            { text: 'Giúp dung lượng ổ cứng máy tính tăng thêm dung lượng trống', correct: false },
            { text: 'Tránh phải trả tiền bản quyền hàng năm cho Microsoft', correct: false },
          ],
          explanation:
            'Quy ước commit chuẩn hóa là nền tảng của tự động hóa DevOps, tạo CHANGELOG tự động và nâng version chuẩn.',
        },
        {
          id: 'q5',
          question: 'Phạm vi tùy chọn (scope) trong Conventional Commits như `feat(auth):` có mục đích gì?',
          type: 'single',
          options: [
            { text: 'Chỉ định phân hệ, module hoặc thành phần cụ thể trong dự án chịu tác động của commit', correct: true },
            { text: 'Chỉ định địa chỉ IP máy chủ của lập trình viên', correct: false },
            { text: 'Giới hạn số dòng code được phép thay đổi trong commit', correct: false },
            { text: 'Đặt mật khẩu khóa commit không cho người khác xem', correct: false },
          ],
          explanation:
            'Scope giúp phân loại chính xác module chịu ảnh hưởng, ví dụ: auth, billing, ui, database.',
        },
        {
          id: 'q6',
          question: 'Theo chuẩn Conventional Commits, ký hiệu nào biểu thị một Breaking Change (thay đổi làm hỏng tương thích ngược)?',
          type: 'single',
          options: [
            { text: 'Dấu chấm than ngay sau type hoặc scope (ví dụ feat!: hoặc feat(api)!:)', correct: true },
            { text: 'Dấu hỏi chấm ở cuối thông điệp commit', correct: false },
            { text: 'Viết hoa toàn bộ thông điệp commit bằng chữ in hoa', correct: false },
            { text: 'Thêm từ khóa DANGER vào đầu dòng tiêu đề', correct: false },
          ],
          explanation:
            'Dấu chấm than `!` ngay trước dấu hai chấm biểu thị Breaking Change, kích hoạt nâng MAJOR version trong SemVer.',
        },
      ],
    },
  },
  {
    id: '08-git-log',
    moduleId: '02-git-basics',
    title: 'Tra cứu lịch sử với git log',
    duration: 25,
    xp: 80,
    keywords: ['git log', 'lich su', 'oneline', 'graph', 'tra cuu commit'],
    prerequisites: ['06-git-commit'],
    objectives: [
      'Sử dụng thành thạo câu lệnh `git log` để tra cứu lịch sử commit của kho lưu trữ.',
      'Tùy biến hiển thị lịch sử với các cờ mạnh mẽ: `--oneline`, `--graph`, `-n <số-lượng>`, `--author`.',
      'Đọc hiểu mã băm commit, tác giả, ngày giờ và mối liên kết phân nhánh trực quan.',
    ],
    definition:
      '`git log` là công cụ tra cứu lịch sử cốt lõi của Git, cho phép bạn duyệt lại toàn bộ các commit snapshot đã được ghi nhận trong kho lưu trữ từ quá khứ cho tới hiện tại. Mỗi mục nhật ký commit hiển thị đầy đủ mã băm SHA-1 (hoặc SHA-256) gồm 40 ký tự định danh duy nhất, tên tác giả, địa chỉ email, mốc thời gian commit và toàn bộ thông điệp mô tả thay đổi. Git cung cấp hàng chục tùy chọn bộ lọc và định dạng để bạn tìm kiếm chính xác những gì mình cần.',
    why:
      'Khả năng tra cứu lịch sử một cách nhanh chóng và chính xác là một trong những sức mạnh lớn nhất của hệ thống quản lý phiên bản. Khi một lỗi nghiêm trọng phát sinh trên môi trường production, bạn cần biết chính xác commit nào đã đưa đoạn code lỗi đó vào hệ thống, ai là người tạo commit và lý do thực hiện thay đổi là gì. Sử dụng thành thạo các bộ lọc của `git log` giúp bạn làm chủ thời gian và giải quyết sự cố thần tốc.',
    mentalModel:
      'Hãy hình dung `git log` giống như cuốn nhật ký hành trình của một con tàu thám hiểm đại dương. Mỗi khi con tàu đi qua một hòn đảo hoặc gặp một cơn bão lớn, thuyền trưởng sẽ mở nhật ký hàng hải ra ghi lại tọa độ kinh độ vĩ độ (mã hash commit), thời gian gió bão (timestamp) và ghi chú nhật ký hành trình (commit message). Khi hậu thế muốn nghiên cứu lại hải trình của chuyến đi, họ chỉ cần lật từng trang nhật ký đó ra để đối chiếu.',
    diagram: `Tùy biến hiển thị git log --graph --oneline:
* f7d02a1 (HEAD -> main) feat(payment): add momo e-wallet support
* 9e1c3d4 feat(cart): calculate discount coupon code
* 4a2f8b9 fix(auth): prevent sql injection in login query
* 1b8e4f2 feat: initialize project repository`,
    example:
      'Một kỹ sư bảo mật cần điều tra một lỗ hổng an ninh vừa được cảnh báo trên thư viện mã nguồn của hệ thống thương mại điện tử. Kỹ sư chạy lệnh `git log --author="Alice" --since="2 weeks ago" --oneline` để lọc ra toàn bộ các commit do lập trình viên Alice thực hiện trong vòng hai tuần vừa qua. Nhờ kết quả hiển thị cô đọng trên từng dòng với mã hash ngắn và thông điệp súc tích, kỹ sư nhanh chóng khoanh vùng được commit cụ thể đã chỉnh sửa tệp cấu hình bảo mật. Kỹ sư mở tiếp chi tiết commit đó bằng lệnh `git show` để đọc từng dòng code sửa đổi và tiến hành phát hành bản vá khẩn cấp ngay trong buổi sáng cùng ngày.',
    commands: [
      'git log',
      'git log --oneline',
      'git log --graph --oneline --all',
      'git log -n 5',
    ],
    explanation:
      '- `git log`: Hiển thị lịch sử commit đầy đủ chi tiết theo thứ tự thời gian đảo ngược.\n- `git log --oneline`: Rút gọn mỗi commit thành một dòng duy nhất gồm mã hash ngắn 7 ký tự và thông điệp commit.\n- `git log --graph --oneline --all`: Vẽ đồ thị nhánh ASCII trực quan biểu diễn tất cả các nhánh và mốc rẽ nhánh.\n- `git log -n 5`: Giới hạn kết quả chỉ hiển thị 5 commit gần đây nhất.',
    mistakes: [
      'Bị kẹt trong giao diện phân trang pager (Less): Khi danh sách log dài, terminal mở công cụ less và người dùng không biết bấm phím `q` để thoát ra.',
      'Chỉ dùng git log mặc định dài dòng: Không biết sử dụng `--oneline` khiến màn hình bị tràn ngập thông tin khó theo dõi.',
      'Không biết cách lọc theo thời gian hoặc tác giả: Phải cuộn chuột thủ công qua hàng ngàn commit thay vì dùng cờ `--author` hoặc `--since`.',
    ],
    labSteps: [
      'Chạy lệnh `git log` trong dự án để xem định dạng hiển thị đầy đủ mặc định.',
      'Nhấn phím `q` trên bàn phím để thoát khỏi màn hình xem log nếu danh sách dài.',
      'Chạy lệnh `git log --oneline` để quan sát định dạng tóm tắt thanh lịch.',
      'Thử nghiệm lệnh `git log -n 2` để chỉ hiển thị đúng 2 commit gần nhất.',
    ],
    hint: 'Nhấn phím `q` bất cứ khi nào bạn muốn thoát khỏi giao diện xem git log.',
    validation: 'Thực thi thành công `git log --oneline` và đọc được các mã băm commit.',
    quizPrompt: 'Làm bài trắc nghiệm dưới đây về các kỹ năng tra cứu lịch sử với git log.',
    challenge: 'Tìm hiểu cách sử dụng lệnh `git log -S "tên_hàm"` để truy vết commit đã thêm hoặc xóa một đoạn code cụ thể.',
    summary: [
      '`git log` hiển thị toàn bộ lịch sử commit theo thứ tự từ mới nhất đến cũ nhất.',
      'Cờ `--oneline` giúp rút gọn mỗi commit thành một dòng trực quan dễ theo dõi.',
      'Nhấn phím `q` trên bàn phím để thoát khỏi chế độ xem phân trang của git log.',
    ],
    quiz: {
      id: 'quiz-02-08-git-log',
      title: 'Trắc nghiệm: Tra cứu lịch sử với git log',
      questions: [
        {
          id: 'q1',
          question: 'Phím nào trên bàn phím dùng để thoát khỏi màn hình hiển thị danh sách git log dài?',
          type: 'single',
          options: [
            { text: 'Phím q (quit)', correct: true },
            { text: 'Phím Esc', correct: false },
            { text: 'Phím Ctrl + C', correct: false },
            { text: 'Phím Enter', correct: false },
          ],
          explanation:
            'Git log sử dụng trình xem văn bản `less` của Unix, nhấn phím `q` để thoát ra dòng lệnh.',
        },
        {
          id: 'q2',
          question: 'Cờ tùy chọn `--oneline` trong lệnh git log mang lại tác dụng gì?',
          type: 'single',
          options: [
            { text: 'Rút gọn mỗi commit thành một dòng duy nhất gồm mã hash ngắn và thông điệp commit', correct: true },
            { text: 'Chỉ hiển thị dòng code đầu tiên của tệp tin index.html', correct: false },
            { text: 'Xóa toàn bộ các commit chỉ giữ lại một commit duy nhất', correct: false },
            { text: 'Kết nối mạng Internet để kiểm tra trạng thái online', correct: false },
          ],
          explanation:
            '`--oneline` là tùy chọn cực kỳ phổ biến giúp hiển thị lịch sử cô đọng, dễ đọc lướt nhanh.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây chỉ hiển thị đúng 3 commit gần đây nhất trong lịch sử?',
          type: 'single',
          options: [
            { text: 'git log -n 3 hoặc git log -3', correct: true },
            { text: 'git log --limit-top-3', correct: false },
            { text: 'git log --first 3', correct: false },
            { text: 'git show -3 commits', correct: false },
          ],
          explanation:
            'Cú pháp `-n <số>` hoặc `-<số>` giới hạn số lượng commit được hiển thị trong kết quả log.',
        },
        {
          id: 'q4',
          question: 'Để xem đồ thị phân nhánh trực quan bằng các ký tự ASCII trong terminal, bạn dùng cờ nào?',
          type: 'single',
          options: [
            { text: '--graph', correct: true },
            { text: '--tree-view', correct: false },
            { text: '--draw-diagram', correct: false },
            { text: '--ascii-art', correct: false },
          ],
          explanation:
            '`--graph` vẽ các đường nhánh và mốc hợp nhất commit bằng đồ thị ký tự trực quan ngay trong terminal.',
        },
      ],
    },
  },
  {
    id: '09-git-diff',
    moduleId: '02-git-basics',
    title: 'So sánh khác biệt với git diff',
    duration: 30,
    xp: 90,
    keywords: ['git diff', 'so sanh', 'khac biet', 'patch', 'staged diff'],
    prerequisites: ['08-git-log'],
    objectives: [
      'Đọc hiểu cú pháp hiển thị khác biệt theo từng dòng code của `git diff`.',
      'Phân biệt rõ ràng giữa so sánh Working Tree (`git diff`) và so sánh Staging Area (`git diff --staged`).',
      'So sánh sự khác biệt giữa hai commit hoặc hai nhánh bất kỳ.',
    ],
    definition:
      '`git diff` là câu lệnh chuyên dụng để tính toán và hiển thị trực quan sự khác biệt chi tiết theo từng dòng code giữa các vùng làm việc của Git. Định dạng hiển thị của diff tuân theo chuẩn Unified Diff: các dòng bị xóa bắt đầu bằng dấu trừ màu đỏ (`-`), các dòng được thêm mới bắt đầu bằng dấu cộng màu xanh lá (`+`), và các dòng giữ nguyên không đổi xung quanh đóng vai trò ngữ cảnh định vị vị trí sửa đổi trong tệp.',
    why:
      'Trước khi đưa code vào Staging Area hoặc tạo commit, việc rà soát kỹ lưỡng từng dòng code bạn vừa thay đổi là thói quen sống còn để loại bỏ các lỗi sơ đẳng như in log rác, biến thử nghiệm chưa xóa, hoặc vô tình sửa nhầm dòng code của tính năng khác. `git diff` chính là chiếc gương soi giúp bạn tự kiểm duyệt (Self-review) chất lượng sản phẩm của chính mình trước khi công khai nó cho đồng nghiệp xem.',
    mentalModel:
      'Hãy tưởng tượng git diff giống như tính năng So sánh văn bản (Track Changes) trong Microsoft Word hoặc tính năng so màu ảnh cũ và ảnh mới của một bức danh họa sau khi hoàn tất công đoạn trùng tu tỉ mỉ. Hai bức tranh được xếp chồng lên nhau dưới ánh sáng laser đặc biệt: những nét vẽ cũ đã bị cạo đi hoặc thay thế sẽ phát sáng màu đỏ rực rỡ, còn những nét vẽ mới vừa được người phục chế thêm vào sẽ phát sáng màu xanh lá cây tươi sáng. Nhờ đó, người thẩm định có thể nhìn thấy từng nét cọ sai lệch mà không bỏ sót bất kỳ chi tiết nhỏ nào.',
    diagram: `Cấu trúc hiển thị Unified Diff:
diff --git a/app.js b/app.js
--- a/app.js  (Phiên bản cũ trước khi sửa)
+++ b/app.js  (Phiên bản mới đang sửa)
@@ -1,3 +1,4 @@
 function calculateTotal(price) {
-    return price * 0.1;       <── Dòng cũ bị xóa bỏ (màu đỏ)
+    const tax = 0.08;         <── Dòng mới được thêm vào (màu xanh lá)
+    return price * (1 + tax); <── Dòng mới được thêm vào (màu xanh lá)
 }`,
    example:
      'Kỹ sư đang sửa lỗi tính sai thuế giá trị gia tăng trong tệp thanh toán invoice.js của cổng thanh toán trực tuyến. Sau khi gõ code xong trong trình soạn thảo VS Code, kỹ sư mở cửa sổ dòng lệnh terminal và gõ ngay lệnh `git diff` để tự kiểm tra lại. Màn hình hiển thị rõ ràng dòng tính thuế cũ mười phần trăm bị gạch đỏ có dấu trừ ở đầu, và dòng tính thuế mới tám phần trăm có dấu cộng màu xanh lá. Sau khi đối chiếu cẩn thận và chắc chắn không có bất kỳ dòng log thử nghiệm nào bị bỏ quên, kỹ sư mới an tâm thực hiện lệnh `git add invoice.js` để đóng gói commit an toàn.',
    commands: [
      'git diff',
      'git diff --staged',
      'git diff HEAD',
      'git diff <commit1> <commit2>',
    ],
    explanation:
      '- `git diff`: So sánh sự khác biệt giữa Working Directory và Staging Area (những thay đổi chưa được add).\n- `git diff --staged` (hoặc `--cached`): So sánh sự khác biệt giữa Staging Area và commit gần nhất tại HEAD (những thay đổi chuẩn bị commit).\n- `git diff HEAD`: So sánh toàn bộ thay đổi trong thư mục làm việc so với commit gần nhất tại HEAD.\n- `git diff <commit1> <commit2>`: So sánh sự khác biệt tổng thể giữa hai mốc commit bất kỳ trong lịch sử.',
    mistakes: [
      'Chạy git diff sau khi đã git add và tưởng code bị mất: Khi đã add vào Staging Area, bạn phải dùng `git diff --staged` mới xem được khác biệt.',
      'Sợ hãi các ký hiệu @@ trong kết quả diff: Không hiểu rằng `@@ -a,b +c,d @@` chỉ là tọa độ số dòng code trong tệp tin.',
      'Không đọc diff trước khi commit: Thói quen xấu dẫn đến việc commit cả mật khẩu hoặc các câu lệnh console.log thử nghiệm.',
    ],
    labSteps: [
      'Chỉnh sửa một dòng code trong tệp `app.js` và lưu lại.',
      'Chạy lệnh `git diff` để quan sát dòng code cũ màu đỏ và dòng code mới màu xanh.',
      'Chạy `git add app.js`, sau đó chạy lại `git diff` (kết quả sẽ rỗng).',
      'Chạy `git diff --staged` để thấy lại các dòng thay đổi đang nằm trong vùng chuẩn bị.',
    ],
    hint: 'Nhớ quy tắc: `git diff` xem tệp chưa add; `git diff --staged` xem tệp đã add.',
    validation: 'Đọc hiểu chính xác các dòng cộng trừ trong kết quả hiển thị của git diff.',
    quizPrompt: 'Hãy làm bài trắc nghiệm sau về cách sử dụng câu lệnh so sánh git diff.',
    challenge: 'Giải thích ý nghĩa của dòng tọa độ hunk header `@@ -15,7 +15,9 @@` trong kết quả diff.',
    summary: [
      '`git diff` so sánh Working Directory với Staging Area (code chưa staged).',
      '`git diff --staged` so sánh Staging Area với HEAD (code chuẩn bị commit).',
      'Dấu trừ màu đỏ thể hiện dòng bị xóa; dấu cộng màu xanh thể hiện dòng được thêm mới.',
    ],
    quiz: {
      id: 'quiz-02-09-git-diff',
      title: 'Trắc nghiệm: So sánh khác biệt với git diff',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh `git diff` không có tham số so sánh sự khác nhau giữa hai khu vực nào?',
          type: 'single',
          options: [
            { text: 'Working Directory và Staging Area (những sửa đổi chưa được git add)', correct: true },
            { text: 'Staging Area và commit gần nhất tại HEAD', correct: false },
            { text: 'Nhánh main cục bộ và nhánh main trên GitHub', correct: false },
            { text: 'Hai máy tính khác nhau trong cùng mạng LAN', correct: false },
          ],
          explanation:
            '`git diff` mặc định hiển thị những thay đổi đang nằm dở dang ở Working Directory mà chưa được đưa vào Staging Area.',
        },
        {
          id: 'q2',
          question: 'Sau khi bạn đã chạy `git add .`, lệnh nào sẽ giúp bạn xem lại chi tiết nội dung những thay đổi đã được staged?',
          type: 'single',
          options: [
            { text: 'git diff --staged (hoặc git diff --cached)', correct: true },
            { text: 'git diff', correct: false },
            { text: 'git log --diff-only', correct: false },
            { text: 'git status --show-lines', correct: false },
          ],
          explanation:
            '`git diff --staged` (đồng nghĩa với `--cached`) so sánh nội dung trong Staging Area với snapshot HEAD gần nhất.',
        },
        {
          id: 'q3',
          question: 'Trong kết quả hiển thị của git diff, một dòng bắt đầu bằng dấu cộng `+` màu xanh lá có ý nghĩa gì?',
          type: 'single',
          options: [
            { text: 'Dòng code đó vừa mới được bổ sung thêm vào tệp tin', correct: true },
            { text: 'Dòng code đó đã bị xóa bỏ khỏi dự án', correct: false },
            { text: 'Dòng code đó bị lỗi cú pháp lập trình', correct: false },
            { text: 'Dòng code đó được tải về từ kho lưu trữ của đối thủ', correct: false },
          ],
          explanation:
            'Quy ước Unified Diff sử dụng dấu cộng `+` để biểu diễn dòng văn bản mới được thêm vào.',
        },
        {
          id: 'q4',
          question: 'Tại sao lập trình viên nên chạy git diff trước khi commit code?',
          type: 'single',
          options: [
            { text: 'Để tự kiểm tra lại từng dòng code thay đổi, loại bỏ dòng nháp thừa và tránh commit nhầm', correct: true },
            { text: 'Để Git tự động chỉnh sửa lỗi ngữ pháp tiếng Anh trong mã nguồn', correct: false },
            { text: 'Để giải phóng dung lượng bộ nhớ RAM máy tính', correct: false },
            { text: 'Để kích hoạt bản quyền dùng thử miễn phí của phần mềm', correct: false },
          ],
          explanation:
            'Tự duyệt diff là bước tự kiểm tra (Self-review) quan trọng hàng đầu của một kỹ sư phần mềm cẩn trọng.',
        },
      ],
    },
  },
  {
    id: '10-gitignore',
    moduleId: '02-git-basics',
    title: 'Bỏ qua tệp tin với .gitignore',
    duration: 25,
    xp: 80,
    keywords: ['gitignore', 'ignore files', 'bo qua tep tin', 'pattern', 'node_modules'],
    prerequisites: ['05-git-add'],
    objectives: [
      'Hiểu rõ mục đích và tầm quan trọng của tệp tin cấu hình `.gitignore`.',
      'Nắm bắt các quy tắc mẫu (glob patterns) phổ biến: đuôi tệp, thư mục, ngoại lệ phủ định.',
      'Biết cách xử lý tình huống tệp tin đã vô tình bị theo dõi trước khi thêm vào .gitignore.',
    ],
    definition:
      '`.gitignore` là một tệp văn bản thuần túy đặt tại thư mục gốc (hoặc các thư mục con) của kho lưu trữ, chứa danh sách các mẫu quy tắc khớp đường dẫn (glob patterns) chỉ định cho Git biết những tệp tin hoặc thư mục nào cần phải bỏ qua hoàn toàn, không hiển thị trong mục Untracked files và không bao giờ được đưa vào commit. Các tệp này thường bao gồm các tệp biên dịch trung gian, thư viện phụ thuộc (`node_modules`), tệp môi trường chứa mật khẩu bí mật (`.env`), và tệp tạm thời của hệ điều hành.',
    why:
      'Không sử dụng `.gitignore` hoặc cấu hình sơ sài là nguyên nhân hàng đầu gây ra các thảm họa bảo mật và phình to kho chứa trong thực tế. Đã có vô số trường hợp lập trình viên vô tình commit tệp `.env` chứa mật khẩu cơ sở dữ liệu và khóa bí mật AWS lên GitHub công khai, dẫn đến việc bị tin tặc chiếm quyền điều khiển tài nguyên đám mây và gây thiệt hại hàng chục ngàn đô-la chỉ sau vài phút. Ngoài ra, việc commit hàng trăm nghìn tệp trong `node_modules` sẽ làm đơ nghẽn mạng và lãng phí dung lượng vô ích.',
    mentalModel:
      'Hãy hình dung tệp `.gitignore` giống như một danh sách đen (Blacklist) được trao cho người bảo vệ an ninh đứng gác tại cổng ra vào tòa nhà kho lưu trữ. Người bảo vệ có nhiệm vụ chặn đứng tất cả những ai hoặc những món hàng nào nằm trong danh sách đen này: không cho phép rác thải công nghiệp (build artifacts), người lạ không có thẻ (tệp nháp tạm thời) hay đồ vật nguy hiểm cháy nổ (khóa bí mật mật khẩu) được bước chân vào kho hàng.',
    diagram: `Hoạt động của màng lọc .gitignore:
Working Directory:                   Màng lọc .gitignore:             Staging Area:
├── app.js            ─────────────► [Cho qua]          ────────────► [app.js]
├── package.json      ─────────────► [Cho qua]          ────────────► [package.json]
├── .env              ─────────────► [CHẶN: .env]       ────────────► (Bị bỏ qua)
└── node_modules/     ─────────────► [CHẶN: node_modules/] ─────────► (Bị bỏ qua)`,
    example:
      'Một nhóm lập trình viên phát triển ứng dụng web Node.js và React chuyên nghiệp cho khách hàng doanh nghiệp. Trong cấu trúc dự án, thư mục node_modules chứa hơn bốn mươi lăm nghìn tệp tin thư viện với dung lượng lên đến nửa gigabyte, và tệp .env chứa toàn bộ chuỗi kết nối cơ sở dữ liệu MongoDB kèm mật khẩu bí mật của môi trường phát triển. Trưởng nhóm tạo ngay một tệp .gitignore tại thư mục gốc dự án và khai báo các dòng quy tắc loại trừ bao gồm node_modules/, *.log, và .env. Kể từ giây phút đó, Git hoàn toàn bỏ qua các mục này trong mọi báo cáo trạng thái, bảo vệ kho mã nguồn luôn nhẹ nhàng và an toàn.',
    commands: [
      'echo "node_modules/" >> .gitignore',
      'echo ".env" >> .gitignore',
      'git check-ignore -v <file>',
    ],
    explanation:
      '- `echo "pattern" >> .gitignore`: Ghi thêm một quy tắc mẫu đường dẫn loại trừ vào cuối tệp tin cấu hình .gitignore một cách nhanh chóng ngay trên terminal.\n- `git check-ignore -v <file>`: Lệnh chẩn đoán chuyên sâu giúp bạn kiểm tra chi tiết xem một tệp tin cụ thể đang bị quy tắc nào, ở dòng số mấy trong .gitignore chặn lại, vô cùng hữu ích khi gỡ lỗi.',
    mistakes: [
      'Thêm tệp vào .gitignore sau khi đã commit: .gitignore chỉ có tác dụng với tệp Untracked; nếu tệp đã được commit trước đó, bạn phải dùng `git rm --cached` để gỡ bỏ theo dõi.',
      'Viết sai đường dẫn hoặc thiếu dấu gạch chéo: Gõ `build` thay vì `build/` có thể vô tình chặn cả tệp mã nguồn mang tên build.js.',
      'Quên không commit chính tệp .gitignore: Khiến đồng nghiệp trong nhóm không nhận được danh sách bỏ qua và tiếp tục commit nhầm file rác.',
    ],
    labSteps: [
      'Tạo một tệp tạm thời mang tên `secret.env` và quan sát nó xuất hiện trong `git status` màu đỏ.',
      'Tạo tệp `.gitignore` và thêm dòng `*.env` vào bên trong.',
      'Chạy lại lệnh `git status` và xác nhận tệp `secret.env` đã hoàn toàn biến mất khỏi danh sách theo dõi.',
    ],
    hint: 'Tệp .gitignore cũng cần phải được `git add` và `git commit` để chia sẻ cho cả nhóm.',
    validation: 'Kiểm tra `git status` không còn liệt kê các tệp đã được khai báo trong .gitignore.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về cách sử dụng tệp .gitignore.',
    challenge: 'Nêu cú pháp dùng dấu chấm than `!` trong .gitignore để tạo quy tắc ngoại lệ bỏ qua.',
    summary: [
      '`.gitignore` ngăn chặn Git theo dõi các tệp tin rác, tệp biên dịch và thông tin bí mật.',
      'Chỉ áp dụng tự động cho các tệp Untracked; tệp đã tracked cần chạy `git rm --cached`.',
      'Bắt buộc phải commit `.gitignore` vào kho chứa để đồng bộ quy tắc cho toàn bộ thành viên nhóm.',
    ],
    quiz: {
      id: 'quiz-02-10-gitignore',
      title: 'Trắc nghiệm: Bỏ qua tệp tin với .gitignore',
      questions: [
        {
          id: 'q1',
          question: 'Mục đích cốt lõi của tệp .gitignore trong một dự án Git là gì?',
          type: 'single',
          options: [
            { text: 'Chỉ định danh sách các tệp tin và thư mục mà Git cần bỏ qua không theo dõi và không commit', correct: true },
            { text: 'Tự động xóa vĩnh viễn các tệp mã nguồn bị lỗi cú pháp', correct: false },
            { text: 'Lưu trữ mật khẩu bảo mật của tài khoản GitHub', correct: false },
            { text: 'Chặn quyền truy cập mạng Internet của các thành viên trong nhóm', correct: false },
          ],
          explanation:
            '`.gitignore` khai báo các mẫu tệp rác hoặc tệp nhạy cảm mà Git không bao giờ được đưa vào commit.',
        },
        {
          id: 'q2',
          question: 'Quy tắc nào trong .gitignore sẽ bỏ qua toàn bộ các tệp tin có phần mở rộng là `.log`?',
          type: 'single',
          options: [
            { text: '*.log', correct: true },
            { text: 'delete.log', correct: false },
            { text: '/log-all', correct: false },
            { text: 'ignore(.log)', correct: false },
          ],
          explanation:
            'Dấu sao `*` là ký tự đại diện (wildcard) khớp với mọi chuỗi ký tự, `*.log` bỏ qua mọi tệp đuôi .log.',
        },
        {
          id: 'q3',
          question: 'Nếu một tệp tin bí mật đã lỡ bị commit vào lịch sử Git từ trước, việc chỉ thêm tên tệp đó vào .gitignore có giúp loại bỏ nó khỏi lịch sử không?',
          type: 'single',
          options: [
            { text: 'Không, .gitignore chỉ có tác dụng với tệp Untracked; bạn phải dùng git rm --cached để gỡ bỏ', correct: true },
            { text: 'Có, Git sẽ tự động xóa sạch tệp đó khỏi toàn bộ các commit trong quá khứ', correct: false },
            { text: 'Có, tệp đó sẽ tự động được mã hóa bằng mật khẩu quản trị', correct: false },
            { text: 'Git sẽ lập tức báo lỗi và từ chối khởi động', correct: false },
          ],
          explanation:
            'Tệp đã được track thì .gitignore không có tác dụng; bạn phải chạy `git rm --cached <file>` để ngừng theo dõi tệp.',
        },
        {
          id: 'q4',
          question: 'Quy tắc thư mục nào dưới đây bỏ qua trọn vẹn thư mục `node_modules` ở bất kỳ cấp độ nào?',
          type: 'single',
          options: [
            { text: 'node_modules/', correct: true },
            { text: '<node_modules>', correct: false },
            { text: 'file:node_modules', correct: false },
            { text: 'skip node_modules', correct: false },
          ],
          explanation:
            'Dấu gạch chéo ở cuối `node_modules/` chỉ định bỏ qua toàn bộ thư mục và mọi nội dung con bên trong nó.',
        },
      ],
    },
  },
  {
    id: '11-file-lifecycle',
    moduleId: '02-git-basics',
    title: 'Vòng đời tệp tin trong Git',
    duration: 25,
    xp: 70,
    keywords: ['file lifecycle', 'vong doi tep tin', 'tracked', 'untracked', 'modified', 'staged'],
    prerequisites: ['10-gitignore'],
    objectives: [
      'Nắm vững toàn diện 4 trạng thái vòng đời của một tệp tin trong Git: Untracked, Unmodified, Modified, Staged.',
      'Vẽ và phân tích được cỗ máy trạng thái (State Machine) chuyển dịch giữa các khu vực.',
      'Dự đoán chính xác trạng thái của tệp tin sau mỗi câu lệnh Git thực thi.',
    ],
    definition:
      'Vòng đời của tệp tin trong Git là mô hình trạng thái mô tả hành trình biến đổi của một tệp mã nguồn xuyên suốt quá trình phát triển dự án. Tất cả các tệp trong thư mục làm việc của bạn đều thuộc một trong hai nhóm chính: Tracked (được theo dõi trong lịch sử) hoặc Untracked (chưa từng được theo dõi). Một tệp Tracked sẽ luân chuyển liên tục qua ba trạng thái con: Unmodified (nguyên vẹn trùng khớp với commit), Modified (đã bị chỉnh sửa nội dung nhưng chưa stage), và Staged (đã được đánh dấu chuẩn bị đưa vào commit kế tiếp).',
    why:
      'Hiểu rõ cỗ máy trạng thái vòng đời tệp tin giúp bạn giải mã được mọi thông điệp đầu ra của Git một cách dễ dàng. Bạn sẽ không bao giờ còn thắc mắc tại sao một tệp lại vừa xuất hiện ở mục màu xanh vừa xuất hiện ở mục màu đỏ trong `git status`, hoặc tại sao lệnh chuyển nhánh lại từ chối thực thi vì tệp đang ở trạng thái Modified dở dang. Làm chủ vòng đời trạng thái là bước nhảy vọt từ một người học việc thành một lập trình viên làm chủ công cụ.',
    mentalModel:
      'Hãy hình dung vòng đời của tệp tin giống như vòng đời của một vị khách bước vào một sân bay quốc tế. Ban đầu, hành khách đứng ở sảnh chờ ngoài đường (Untracked). Khi bước vào cửa an ninh xuất trình vé (git add), hành khách được ghi danh vào hệ thống máy tính và bước vào phòng chờ lên máy bay (Staged). Khi máy bay cất cánh (git commit), hành khách đã chính thức nằm trong chuyến bay lịch sử (Unmodified). Nếu trong chuyến bay hành khách đổi ghế ngồi, trạng thái sẽ thành Modified.',
    diagram: `Cỗ máy trạng thái vòng đời tệp tin trong Git:
          ┌──────────────────────────────────────────────────────────┐
          │                                                          │
          ▼                                                          │
┌──────────────────┐   git add    ┌──────────────────┐  git commit   │
│    Untracked     │ ───────────► │      Staged      │ ──────────────┘
│ (Chưa theo dõi)  │              │ (Vùng chuẩn bị)  │ (Trở thành Unmodified)
└──────────────────┘              └──────────────────┘
                                           ▲
                                           │ git add
                                  ┌──────────────────┐
                                  │     Modified     │ ◄── Chỉnh sửa file
                                  │ (Đã bị sửa đổi)  │
                                  └──────────────────┘`,
    example:
      'Kỹ sư tạo một tệp mã nguồn mới mang tên user.js trong thư mục dự án, lúc này tệp đang ở trạng thái Untracked hoàn toàn xa lạ với Git. Ngay sau khi kỹ sư chạy lệnh git add user.js, tệp lập tức chuyển dịch trạng thái sang Staged sẵn sàng trong vùng chuẩn bị. Kế tiếp, kỹ sư chạy lệnh git commit với thông điệp chuẩn mực, tệp được ghi vào lịch sử và trở về trạng thái Unmodified ổn định tuyệt đối. Đến buổi chiều, khi kỹ sư mở lại tệp user.js để bổ sung logic mã hóa mật khẩu người dùng, tệp chuyển sang trạng thái Modified, sẵn sàng cho một vòng tuần hoàn đóng gói commit tiếp theo.',
    commands: ['git status -s', 'git add <file>', 'git commit'],
    explanation:
      '- `git status -s`: Hiển thị mã trạng thái hai cột phản ánh chính xác vị trí của tệp trong cỗ máy trạng thái.\n- `git add <file>`: Kích hoạt sự chuyển dịch trạng thái từ Untracked hoặc Modified sang Staged.\n- `git commit`: Đưa tất cả các tệp Staged trở về trạng thái Unmodified trong snapshot mới.',
    mistakes: [
      'Không hiểu tại sao một tệp có thể vừa Staged vừa Modified: Khi bạn add tệp rồi lại sửa tiếp mà chưa add lần hai, tệp sẽ tồn tại đồng thời ở cả hai trạng thái.',
      'Tưởng tệp Untracked sẽ được commit tự động: Git không bao giờ tự ý commit tệp chưa được add vào hệ thống theo dõi.',
      'Nhầm lẫn giữa tệp bị xóa (Deleted) và tệp Untracked: Tệp đã từng commit khi bị xóa sẽ ở trạng thái Tracked/Deleted chứ không phải Untracked.',
    ],
    labSteps: [
      'Tạo tệp mới `status-test.txt` và kiểm tra trạng thái Untracked bằng `git status -s`.',
      'Chạy `git add status-test.txt` và quan sát ký tự `A ` (Added/Staged) màu xanh.',
      'Commit tệp và chạy `git status -s` để thấy kết quả rỗng (tất cả đều Unmodified).',
      'Mở tệp sửa một dòng để quan sát ký tự ` M` (Modified) xuất hiện ở cột thứ hai.',
    ],
    hint: 'Theo dõi sự thay đổi vị trí ký tự cột trái (Index) và cột phải (Working Tree).',
    validation: 'Giải thích được sự biến đổi trạng thái qua các bước tạo, add, commit và sửa tệp.',
    quizPrompt: 'Làm bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt cỗ máy trạng thái Git.',
    challenge: 'Mô tả tình huống làm xuất hiện ký tự `MM` trong kết quả của lệnh git status -s.',
    summary: [
      'Tệp tin trong Git gồm hai nhóm lớn: Tracked (được theo dõi) và Untracked (chưa theo dõi).',
      'Tệp Tracked luân chuyển qua 3 trạng thái con: Unmodified -> Modified -> Staged.',
      'Hiểu rõ vòng đời giúp bạn làm chủ hoàn toàn các câu lệnh Git và phản hồi từ git status.',
    ],
    quiz: {
      id: 'quiz-02-11-file-lifecycle',
      title: 'Trắc nghiệm: Vòng đời trạng thái của File',
      questions: [
        {
          id: 'q1',
          question: 'Một tệp tin đã từng được commit vào lịch sử, nếu bạn mở ra sửa thêm một dòng code, tệp đó sẽ ở trạng thái nào?',
          type: 'single',
          options: [
            { text: 'Modified (Đã bị sửa đổi)', correct: true },
            { text: 'Untracked (Chưa được theo dõi)', correct: false },
            { text: 'Staged (Đã nằm trong vùng chuẩn bị)', correct: false },
            { text: 'Deleted (Đã bị xóa)', correct: false },
          ],
          explanation:
            'Tệp tin đã có trong commit trước đó khi bị thay đổi nội dung trong Working Tree sẽ chuyển sang trạng thái Modified.',
        },
        {
          id: 'q2',
          question: 'Trạng thái Unmodified của một tệp tin có ý nghĩa kỹ thuật gì?',
          type: 'single',
          options: [
            { text: 'Nội dung tệp trong Working Tree đang trùng khớp hoàn toàn 100% với snapshot gần nhất trong commit', correct: true },
            { text: 'Tệp tin đó đã bị khóa và không ai được phép sửa đổi nữa', correct: false },
            { text: 'Tệp tin đó bị Git từ chối không theo dõi', correct: false },
            { text: 'Tệp tin bị lỗi cú pháp chưa biên dịch được', correct: false },
          ],
          explanation:
            'Unmodified nghĩa là nội dung trong Working Tree hoàn toàn giống với commit gần nhất, không có thay đổi nào dở dang.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào đưa một tệp tin từ trạng thái Modified sang trạng thái Staged?',
          type: 'single',
          options: [
            { text: 'git add <tên-tệp>', correct: true },
            { text: 'git commit', correct: false },
            { text: 'git switch', correct: false },
            { text: 'git branch', correct: false },
          ],
          explanation:
            '`git add` lấy nội dung tệp Modified và đưa snapshot vào Staging Area, chuyển tệp thành Staged.',
        },
        {
          id: 'q4',
          question: 'Trong lệnh `git status -s`, ký hiệu `MM` ở đầu một dòng hiển thị điều gì?',
          type: 'single',
          options: [
            { text: 'Tệp đã được đưa vào Staging Area nhưng sau đó lại bị sửa tiếp trong Working Directory', correct: true },
            { text: 'Tệp tin có dung lượng lớn gấp đôi bình thường', correct: false },
            { text: 'Tệp tin được viết bằng ngôn ngữ Markdown', correct: false },
            { text: 'Tệp tin bị mất cả hai mã băm mật mã học', correct: false },
          ],
          explanation:
            'Ký tự M thứ nhất là Staged, ký tự M thứ hai là Modified trong Working Tree; nghĩa là tệp đã add nhưng sau đó lại bị sửa tiếp.',
        },
      ],
    },
  },
  {
    id: '12-undo-working-tree',
    moduleId: '02-git-basics',
    title: 'Hoàn tác thay đổi Working Tree',
    duration: 30,
    xp: 90,
    keywords: ['git restore', 'hoan tac', 'undo', 'working tree', 'discard changes'],
    prerequisites: ['11-file-lifecycle'],
    objectives: [
      'Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.',
      'Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.',
      'Hiểu rõ sự nguy hiểm và tính không thể khôi phục khi hủy bỏ thay đổi chưa commit.',
    ],
    definition:
      'Hoàn tác thay đổi trong Working Tree là thao tác khôi phục nội dung của một hoặc nhiều tệp tin đang bị sửa đổi (Modified) trở về trạng thái nguyên bản sạch sẽ của chúng trong snapshot commit gần nhất hoặc trong Staging Area. Kể từ phiên bản Git 2.23, câu lệnh chuyên trách tiêu chuẩn được sử dụng cho mục đích này là `git restore`. Lệnh này giúp tách biệt rõ ràng tác vụ khôi phục tệp ra khỏi câu lệnh đa năng nhưng dễ gây nhầm lẫn trước đây là `git checkout`.',
    why:
      'Trong quá trình lập trình, không hiếm những lúc bạn thử nghiệm một ý tưởng thuật toán mới hoặc tái cấu trúc một hàm phức tạp nhưng thất bại thảm hại, khiến code bị lỗi tùm lum và không thể chạy được. Thay vì phải bấm Ctrl+Z hàng trăm lần trong vô vọng và lo sợ bỏ sót lỗi, bạn chỉ cần thực thi một câu lệnh `git restore` duy nhất để đưa toàn bộ tệp tin trở về trạng thái hoạt động hoàn hảo 100% như lúc ban đầu chỉ trong một phần nghìn giây.',
    mentalModel:
      'Hãy hình dung thao tác `git restore` giống như việc bạn bấm nút "Phục hồi cài đặt gốc" (Factory Reset) trên chiếc điện thoại thông minh của mình, hoặc bấm nút hoàn tác trên bảng vẽ kỹ thuật số. Mọi nét vẽ nháp nguệch ngoạc và thử nghiệm vụng về mà bạn vừa vẽ lên tấm toan trong buổi chiều hôm nay sẽ lập tức bị xóa sạch, trả lại bức tranh nguyên mẫu hoàn hảo đã được lưu trong bộ nhớ máy ảnh từ sáng sớm.',
    diagram: `Cơ chế hoạt động của git restore:
[Repository / HEAD] ────────── Phục hồi đè nội dung ─────────► [Working Directory]
  (Bản mẫu an toàn)                                             (Xóa bỏ code nháp)
         ▲                                                              ▲
         │                                                              │
         └───────────── git restore --staged ───► [Staging Area] ───────┘`,
    example:
      'Một kỹ sư thử nghiệm viết lại toàn bộ module thanh toán phức tạp trong tệp payment.js nhằm hỗ trợ thêm ví điện tử mới. Tuy nhiên sau ba giờ thử nghiệm căng thẳng, giải pháp mới liên tục phát sinh ngoại lệ không mong muốn và làm vỡ toàn bộ luồng thanh toán hiện tại của khách hàng. Nhận thấy không thể tiếp tục cứu vãn đoạn code thử nghiệm dang dở này, kỹ sư mở cửa sổ terminal và thực thi ngay câu lệnh `git restore payment.js`. Ngay lập tức, tệp payment.js trên ổ đĩa được phục hồi hoàn toàn về trạng thái hoạt động trơn tru của commit gần nhất, giúp kỹ sư giải tỏa áp lực và an tâm bắt đầu lại với một hướng tiếp cận khác an toàn hơn.',
    commands: [
      'git restore <file>',
      'git restore .',
      'git restore --staged <file>',
    ],
    explanation:
      '- `git restore <file>`: Hủy bỏ toàn bộ các thay đổi chưa staged trong tệp tin, khôi phục nội dung về trạng thái Staging Area hoặc HEAD.\n- `git restore .`: Hủy bỏ toàn bộ thay đổi chưa staged trên tất cả các tệp trong thư mục làm việc hiện tại.\n- `git restore --staged <file>`: Rút tệp tin ra khỏi Staging Area (unstage) nhưng giữ nguyên nội dung bạn đã sửa trong Working Directory.',
    mistakes: [
      'Không nhận thức được tính nguy hiểm không thể đảo ngược của git restore: Các thay đổi chưa từng được commit một khi đã bị git restore sẽ biến mất vĩnh viễn và không thể cứu lại.',
      'Nhầm lẫn giữa `git restore <file>` và `git restore --staged <file>`: Một đằng hủy bỏ nội dung trên ổ đĩa, một đằng chỉ rút khỏi khu vực chuẩn bị.',
      'Sử dụng các lệnh cũ dễ gây nhầm lẫn: Cố dùng `git checkout -- <file>` thay vì cú pháp hiện đại rõ nghĩa `git restore`.',
    ],
    labSteps: [
      'Mở tệp `app.js` và thêm vào một dòng code lỗi cố ý.',
      'Kiểm tra `git status` để thấy tệp ở trạng thái Modified màu đỏ.',
      'Chạy lệnh `git restore app.js` để hủy bỏ thay đổi.',
      'Kiểm tra lại nội dung tệp để xác nhận dòng lỗi đã biến mất hoàn toàn.',
    ],
    hint: 'Hãy cẩn trọng: `git restore <file>` sẽ ghi đè vĩnh viễn nội dung chưa commit!',
    validation: 'Tệp tin được hoàn tác thành công về trạng thái sạch sẽ của HEAD.',
    quizPrompt: 'Hãy làm bài trắc nghiệm dưới đây về các thao tác hoàn tác với git restore.',
    challenge: 'Nêu sự khác biệt căn bản giữa `git restore` và `git reset` trong Git hiện đại.',
    summary: [
      '`git restore <file>` hủy bỏ các thay đổi dở dang trong Working Tree, đưa tệp về trạng thái sạch.',
      '`git restore --staged <file>` rút tệp ra khỏi Staging Area mà không làm mất nội dung sửa đổi.',
      'Thao tác hủy bỏ thay đổi chưa commit là vĩnh viễn, không thể phục hồi qua Git.',
    ],
    quiz: {
      id: 'quiz-02-12-undo-working-tree',
      title: 'Trắc nghiệm: Hoàn tác thay đổi Working Tree',
      questions: [
        {
          id: 'q1',
          question: 'Lệnh Git hiện đại nào được khuyến nghị sử dụng để hủy bỏ các sửa đổi chưa staged trong Working Tree?',
          type: 'single',
          options: [
            { text: 'git restore <tên-tệp>', correct: true },
            { text: 'git delete <tên-tệp>', correct: false },
            { text: 'git cancel-all', correct: false },
            { text: 'git remove --unstage', correct: false },
          ],
          explanation:
            '`git restore <tên-tệp>` là lệnh chuyên trách từ Git 2.23 để hoàn tác thay đổi trong thư mục làm việc.',
        },
        {
          id: 'q2',
          question: 'Điều gì sẽ xảy ra với các dòng code bạn vừa viết thêm trong tệp nếu bạn chạy lệnh `git restore <file>` khi chưa từng commit chúng?',
          type: 'single',
          options: [
            { text: 'Các dòng code đó sẽ bị xóa vĩnh viễn và không thể khôi phục lại bằng Git', correct: true },
            { text: 'Git sẽ tự động lưu các dòng đó vào hòm thư điện tử cá nhân', correct: false },
            { text: 'Git sẽ chuyển các dòng code đó lên máy chủ GitHub', correct: false },
            { text: 'Các dòng đó sẽ được cất vào thùng rác máy tính để phục hồi sau', correct: false },
          ],
          explanation:
            'Git chỉ có thể phục hồi những gì đã từng được lưu vào cơ sở dữ liệu commit; thay đổi chưa commit sẽ mất vĩnh viễn.',
        },
        {
          id: 'q3',
          question: 'Lệnh `git restore --staged index.html` thực hiện hành động gì?',
          type: 'single',
          options: [
            { text: 'Rút tệp index.html ra khỏi Staging Area nhưng vẫn giữ nguyên toàn bộ code đã sửa trong Working Directory', correct: true },
            { text: 'Xóa sạch tệp index.html khỏi ổ cứng máy tính', correct: false },
            { text: 'Tạo một commit mới có tên là staged', correct: false },
            { text: 'Đẩy tệp index.html lên nhánh chính của máy chủ từ xa', correct: false },
          ],
          explanation:
            'Cờ `--staged` chỉ hủy bỏ việc stage trong Index, không làm mất bất kỳ dòng code nào bạn đã gõ trong Working Tree.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào sau đây hủy bỏ tất cả các thay đổi chưa staged trên toàn bộ các tệp tin trong thư mục hiện tại?',
          type: 'single',
          options: [
            { text: 'git restore .', correct: true },
            { text: 'git restore --everything-delete', correct: false },
            { text: 'git undo -all', correct: false },
            { text: 'git clear-tree', correct: false },
          ],
          explanation:
            '`git restore .` áp dụng hoàn tác cho toàn bộ thư mục hiện tại trở xuống.',
        },
      ],
    },
  },
];
