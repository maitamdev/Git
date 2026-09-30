import { LessonAuthorData } from './types';

export const LEVEL_5B_LESSONS: LessonAuthorData[] = [
  {
    id: '12-git-rebase',
    moduleId: '05-advanced-git',
    title: 'git rebase',
    duration: 35,
    xp: 110,
    keywords: ['git rebase', 'rebase branch', 'rebase upstream', 'quy tac vang rebase', 'golden rule rebase'],
    prerequisites: ['11-rebase-concept'],
    objectives: [
      'Thực thi thành thạo câu lệnh `git rebase <upstream>` để đồng bộ nhánh tính năng với nhánh chính.',
      'Khắc cốt ghi tâm "Quy tắc vàng của Rebase" (The Golden Rule of Rebasing): Không bao giờ rebase trên nhánh công khai.',
      'Hiểu rõ quy trình xử lý khi cần cập nhật nhánh sau khi đã rebase bằng `git push --force-with-lease`.',
      'Định hình thói quen giữ lịch sử dự án luôn tinh gọn trước khi tạo Pull Request.',
    ],
    definition:
      '`git rebase <base-branch>` là câu lệnh thực thi tái cơ sở nhánh trong Git. Khi bạn đang đứng trên nhánh tính năng và chạy lệnh này, Git sẽ tìm commit tổ tiên chung gần nhất (Common Ancestor), tạm thời lưu các commit riêng của nhánh tính năng vào bộ nhớ đệm, sau đó tua con trỏ nhánh tính năng về mốc commit mới nhất của nhánh cơ sở (ví dụ `main`), rồi lần lượt áp dụng từng commit được lưu tạm lên đỉnh mới. Kết quả mang lại một chuỗi commit nối tiếp tuyến tính mượt mà.',
    why:
      'Trong văn hóa phát triển phần mềm chuẩn mực, việc nhánh tính năng của bạn bị tụt hậu so với nhánh chính diễn ra liên tục hàng giờ. Nếu bạn liên tục merge main vào nhánh tính năng, lịch sử của bạn sẽ bị rác bởi hàng loạt commit "Merge branch main into feature". Câu lệnh `git rebase` giúp bạn cập nhật toàn bộ những tiến bộ mới nhất của nhánh chính vào nhánh làm việc của mình một cách thanh lịch, giúp việc giải quyết xung đột diễn ra sớm và tạo điều kiện cho một Pull Request cực kỳ sạch đẹp.',
    mentalModel:
      'Hãy hình dung bạn đang đứng xếp hàng tại quầy thanh toán của một siêu thị. Bạn đã chọn được 3 món hàng trong giỏ (3 commit của feature branch). Bỗng nhiên nhân viên thu ngân mở một lối đi ưu tiên mới rộng rãi hơn và mời bạn chuyển sang đó (nhánh main mới cập nhật). Bạn không đứng giằng co giữa hai lối đi, mà nhấc giỏ hàng của mình sang đứng tiếp nối vào cuối dòng người của lối đi mới (`git rebase`). Quá trình thanh toán diễn ra trơn tru mà không làm gián đoạn bất kỳ ai.',
    diagram: `Quy trình 3 bước của git rebase main:
Bước 1: Tìm tổ tiên chung C và lưu tạm F1, F2 ra bộ đệm.
Bước 2: Dịch chuyển con trỏ feature tới vị trí M2 của main.
Bước 3: Lần lượt áp dụng F1 tạo thành F1', áp dụng F2 tạo thành F2'.

C ──► M1 ──► M2 (main)
                └──► F1' ──► F2' (feature sau khi rebase)`,
    example:
      'Lập trình viên Thành đang phát triển nhánh `feat/dark-mode` trên máy tính cá nhân. Trong thời gian Thành làm việc, nhánh `main` trên kho chứa đã có thêm 4 commit mới từ các đồng nghiệp khác. Thành muốn cập nhật các commit mới này vào nhánh của mình trước khi mở PR. Thành mở console và gõ: `git fetch origin`, sau đó chạy: `git rebase origin/main`. Git tự động tua nhánh của Thành đến commit mới nhất của main rồi cấy lần lượt các commit giao diện tối lên đỉnh. Thành kiểm tra lại toàn bộ ứng dụng và thấy mọi tính năng mới đều hoạt động hòa hợp hoàn hảo.',
    commands: [
      'git fetch origin',
      'git rebase origin/main',
      'git push --force-with-lease origin <tên-nhánh>',
      'git rebase --abort',
    ],
    explanation:
      '- `git fetch origin`: Tải các commit mới nhất trên máy chủ về kho lưu trữ cục bộ.\n- `git rebase origin/main`: Dời gốc nhánh hiện tại lên đỉnh của nhánh origin/main.\n- `git push --force-with-lease`: Cập nhật nhánh lên server an toàn sau khi rebase (chỉ ghi đè nếu không có ai khác push chen ngang).\n- `git rebase --abort`: Hủy bỏ hoàn toàn phiên rebase nếu gặp sự cố phức tạp và trở về trạng thái ban đầu.',
    mistakes: [
      'Vi phạm Quy tắc vàng của Rebase: Chạy rebase trên nhánh dùng chung như main hoặc develop khiến lịch sử của cả nhóm bị phá vỡ.',
      'Sử dụng git push --force bừa bãi thay vì --force-with-lease: Có nguy cơ vô tình xóa đè commit mới của đồng nghiệp trên cùng nhánh.',
      'Hoảng loạn khi thấy Git tạm ngưng rebase: Thực chất Git chỉ đang chờ bạn xử lý xung đột nếu có mâu thuẫn dòng code.',
    ],
    labSteps: [
      'Tạo nhánh `feat-rebase-demo` từ main và tạo 2 commit.',
      'Chuyển về `main`, tạo 1 commit mới để làm phân kỳ lịch sử.',
      'Chuyển lại sang nhánh `feat-rebase-demo`.',
      'Chạy lệnh `git rebase main` và kiểm tra lịch sử bằng `git log --oneline --graph`.',
    ],
    hint: 'Nhớ câu thần chú: Chỉ rebase trên nhánh cục bộ cá nhân, không bao giờ rebase trên nhánh công khai dùng chung.',
    validation: 'Thực hiện rebase thành công nhánh tính năng lên đỉnh nhánh main mà không làm mất mát mã nguồn.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git rebase và quy tắc vàng.',
    challenge: 'Tại sao cờ `--force-with-lease` lại an toàn hơn rất nhiều so với cờ `--force` truyền thống khi push nhánh sau khi rebase?',
    summary: [
      '`git rebase` đưa các commit của nhánh tính năng lên đỉnh mới nhất của nhánh cơ sở.',
      'Quy tắc vàng: Tuyệt đối không bao giờ rebase trên các nhánh công khai dùng chung.',
      'Luôn ưu tiên sử dụng `git push --force-with-lease` sau khi rebase nhánh cá nhân lên remote.',
    ],
    quiz: {
      id: 'quiz-05-12-git-rebase',
      title: 'Trắc nghiệm: git rebase và Quy tắc vàng',
      questions: [
        {
          id: 'q1',
          question: '"Quy tắc vàng của Rebase" (The Golden Rule of Rebasing) trong Git quy định điều gì?',
          type: 'single',
          options: [
            { text: 'Tuyệt đối không bao giờ được phép rebase trên một nhánh công khai đang có nhiều người cùng làm việc chung', correct: true },
            { text: 'Mọi commit đều phải được tạo bằng chữ in hoa', correct: false },
            { text: 'Chỉ được rebase khi có sự cho phép của giám đốc công ty', correct: false },
            { text: 'Không được phép rebase quá 3 lần trong một ngày', correct: false },
          ],
          explanation:
            'Rebase viết lại lịch sử; nếu làm trên nhánh chung, các đồng nghiệp kéo code về sẽ bị xung đột nặng nề.',
        },
        {
          id: 'q2',
          question: 'Vì sao sau khi thực hiện rebase ở nhánh cá nhân cục bộ, lệnh `git push` thông thường sẽ bị máy chủ từ chối?',
          type: 'single',
          options: [
            { text: 'Vì các commit đã được viết lại với mã hash SHA-1 mới, khiến lịch sử cục bộ và server không còn khớp nhau', correct: true },
            { text: 'Vì máy chủ GitHub bị quá tải bộ nhớ đệm', correct: false },
            { text: 'Vì đường truyền mạng Internet bị ngắt kết nối', correct: false },
            { text: 'Vì tên nhánh của bạn bị đổi thành tên khác', correct: false },
          ],
          explanation:
            'Commit hash mới tạo ra phân kỳ lịch sử, bắt buộc phải dùng `--force-with-lease` để cập nhật con trỏ nhánh trên remote.',
        },
        {
          id: 'q3',
          question: 'Tại sao cờ `--force-with-lease` lại được các chuyên gia khuyến nghị thay thế hoàn toàn cho cờ `-f` (`--force`)?',
          type: 'single',
          options: [
            { text: 'Nó sẽ kiểm tra xem có ai khác vừa đẩy commit mới lên nhánh đó chưa; nếu có, nó từ chối push để bảo vệ code của đồng nghiệp', correct: true },
            { text: 'Nó tăng tốc độ tải dữ liệu lên đám mây gấp đôi', correct: false },
            { text: 'Nó tự động mã hóa mật khẩu kho chứa', correct: false },
            { text: 'Nó giúp giảm chi phí thuê máy chủ', correct: false },
          ],
          explanation:
            '`--force-with-lease` hoạt động như một khóa an toàn (lease), chỉ cho phép ghi đè nếu remote chưa bị thay đổi bởi người khác.',
        },
        {
          id: 'q4',
          question: 'Nếu trong quá trình rebase bạn cảm thấy quá phức tạp và muốn hủy bỏ ngay lập tức để quay về trạng thái an toàn trước đó, bạn dùng lệnh nào?',
          type: 'single',
          options: [
            { text: 'git rebase --abort', correct: true },
            { text: 'git rebase --cancel', correct: false },
            { text: 'git undo rebase', correct: false },
            { text: 'git reset --quit', correct: false },
          ],
          explanation:
            '`git rebase --abort` dừng toàn bộ tiến trình rebase và đưa nhánh của bạn quay về trạng thái y hệt lúc trước khi gõ lệnh.',
        },
      ],
    },
  },
  {
    id: '13-interactive-rebase',
    moduleId: '05-advanced-git',
    title: 'Interactive Rebase',
    duration: 35,
    xp: 120,
    keywords: ['interactive rebase', 'git rebase -i', 'rebase tuong tac', 'chinh sua lich su', 'bien tap commit', 'todo list git'],
    prerequisites: ['12-git-rebase'],
    objectives: [
      'Hiểu rõ sức mạnh vượt trội của Interactive Rebase (`git rebase -i`) như một công cụ biên tập lịch sử tối thượng.',
      'Đọc hiểu và sử dụng thành thạo danh sách lệnh Todo của Interactive Rebase: pick, reword, edit, squash, fixup, drop.',
      'Sắp xếp lại thứ tự xuất hiện của các commit trong chuỗi lịch sử cục bộ.',
      'Chuẩn bị một chuỗi commit chuyên nghiệp, sắc nét trước khi mở Pull Request.',
    ],
    definition:
      'Interactive Rebase (Rebase tương tác, kích hoạt bằng cờ `-i` trong `git rebase -i <commit-base>`) là một trong những tính năng mạnh mẽ và ấn tượng nhất của Git. Khi thực thi, Git sẽ mở một trình soạn thảo văn bản chứa danh sách toàn bộ các commit cần xử lý (gọi là Git Todo List), cho phép lập trình viên toàn quyền chỉ huy số phận của từng commit: đổi tên thông điệp, gộp nhiều commit thành một, chỉnh sửa nội dung bên trong, thay đổi thứ tự thời gian hoặc xóa bỏ hoàn toàn commit thừa.',
    why:
      'Trong quá trình phát triển tính năng, không ai có thể commit hoàn hảo ngay từ đầu. Bạn thường tạo ra hàng loạt commit vụn vặt như "fix bug", "sửa lỗi chính tả", "thử lại lần nữa", "tạm thời lưu". Việc để nguyên đống commit nham nhở này gửi lên Pull Request thể hiện sự thiếu chuyên nghiệp nghiêm trọng. Interactive Rebase trao cho bạn cây đũa phép của người biên tập viên: bạn gọt giũa, dọn dẹp và đóng gói lại các commit vụn đó thành những khối thay đổi mạch lạc, sáng sủa trước khi trình diện cho đồng nghiệp.',
    mentalModel:
      'Hãy hình dung bạn là một đạo diễn phim đang ngồi trong phòng dựng phim với hàng chục cuộn băng quay thô tại phim trường. Có những cảnh quay hỏng (commit rác), có những cảnh quay trùng lặp cần ghép lại (squash/fixup), có những phân cảnh cần đổi tên (reword) hoặc đổi thứ tự trước sau (reorder). Interactive Rebase chính là chiếc bàn dựng phim chuyên nghiệp giúp bạn cắt ghép, biên tập toàn bộ các cảnh quay thô thành một bộ phim điện ảnh bom tấn liền mạch và cuốn hút người xem từ đầu đến cuối.',
    diagram: `Quy trình Interactive Rebase (git rebase -i HEAD~3):
Trình soạn thảo mở ra bảng Todo List:
pick a1b2c3d feat: add shopping cart UI
pick e4f5a6b fix typo in cart
pick 7c8d9e0 add unit tests for cart

Đạo diễn biên tập lại:
pick a1b2c3d feat: add shopping cart UI
fixup e4f5a6b fix typo in cart          (Gộp vào commit trên, bỏ message thừa)
pick 7c8d9e0 test: add unit tests for cart (Đổi pick -> pick nhưng chuẩn hóa)`,
    example:
      'Kỹ sư Tuấn vừa hoàn thành nhánh `feat/payment-gateway` với 4 commit: commit 1 thêm giao diện, commit 2 sửa CSS nút bấm, commit 3 thêm API, commit 4 sửa lỗi logic API. Trước khi mở Pull Request, Tuấn gõ lệnh: `git rebase -i HEAD~4`. Một tệp todo list mở ra trong VS Code. Tuấn giữ nguyên commit 1 và 3 bằng lệnh `pick`, đổi commit 2 và 4 thành `fixup` để gộp vào các commit tương ứng. Tuấn lưu tệp và đóng lại. Git tự động chạy lại lịch sử, biến 4 commit lộn xộn thành đúng 2 commit hoàn chỉnh: một cho giao diện và một cho API. Đồng nghiệp review PR vô cùng hài lòng.',
    commands: [
      'git rebase -i HEAD~<số-lượng-commit>',
      'git rebase -i <commit-hash-gốc>',
      'git rebase --continue',
      'git rebase --abort',
    ],
    explanation:
      '- `git rebase -i HEAD~n`: Mở trình tương tác để biên tập lại n commit gần đây nhất tính từ đỉnh HEAD.\n- `git rebase -i <hash>`: Biên tập lại toàn bộ các commit nằm giữa hash chỉ định và HEAD.\n- `git rebase --continue`: Tiếp tục tiến trình sau khi đã hoàn thành một chỉ thị sửa đổi (ví dụ sau khi edit).\n- `git rebase --abort`: Hủy bỏ hoàn toàn phiên biên tập và khôi phục trạng thái ban đầu.',
    mistakes: [
      'Xóa dòng trong file Todo List: Trong interactive rebase, xóa một dòng commit đồng nghĩa với việc Git sẽ XÓA BỎ VĨNH VIỄN (drop) commit đó.',
      'Sử dụng interactive rebase trên nhánh chung đã push lên GitHub.',
      'Hoảng sợ khi editor mở ra: Bình tĩnh đọc kỹ phần hướng dẫn (comments) ở nửa dưới của tệp todo list.',
    ],
    labSteps: [
      'Tạo liên tiếp 3 commit thử nghiệm nhỏ trong kho chứa bài tập.',
      'Chạy lệnh `git rebase -i HEAD~3` để mở trình soạn thảo Todo List.',
      'Đổi từ `pick` ở dòng thứ 2 thành `reword` để đổi tên thông điệp.',
      'Lưu và đóng file lại, sau đó nhập thông điệp mới theo yêu cầu của Git.',
      'Kiểm tra lại `git log --oneline` để chiêm ngưỡng kết quả.',
    ],
    hint: 'Nếu lỡ tay làm hỏng Todo List trong khi soạn thảo, chỉ cần xóa sạch nội dung file hoặc đóng lại mà không lưu rồi gõ `git rebase --abort`.',
    validation: 'Làm chủ giao diện Todo List của Interactive Rebase và thực hiện thành thạo các chỉ thị biên tập cơ bản.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ Interactive Rebase.',
    challenge: 'Nêu sự khác biệt trong thứ tự hiển thị commit giữa `git log` (từ mới đến cũ) và Todo List của `git rebase -i` (từ cũ đến mới).',
    summary: [
      '`git rebase -i` mở ra Todo List cho phép toàn quyền biên tập chuỗi commit cục bộ.',
      'Cung cấp các lệnh quyền năng: pick, reword, edit, squash, fixup, drop.',
      'Là bước chuẩn bị quan trọng bậc nhất để xây dựng văn hóa commit chuyên nghiệp trước khi mở PR.',
    ],
    quiz: {
      id: 'quiz-05-13-interactive-rebase',
      title: 'Trắc nghiệm: Interactive Rebase',
      questions: [
        {
          id: 'q1',
          question: 'Thứ tự sắp xếp các commit trong tệp Todo List khi bạn chạy `git rebase -i HEAD~3` là như thế nào?',
          type: 'single',
          options: [
            { text: 'Theo thứ tự thời gian từ cũ nhất ở trên đỉnh xuống mới nhất ở dưới đáy (ngược lại với git log)', correct: true },
            { text: 'Commit mới nhất luôn ở trên đỉnh', correct: false },
            { text: 'Sắp xếp ngẫu nhiên không có thứ tự', correct: false },
            { text: 'Sắp xếp theo thứ tự bảng chữ cái của thông điệp', correct: false },
          ],
          explanation:
            'Todo list hiển thị từ quá khứ đến hiện tại để Git có thể phát lại (replay) từng commit từ trên xuống dưới.',
        },
        {
          id: 'q2',
          question: 'Nếu bạn vô tình xóa hẳn một dòng commit trong tệp Todo List rồi lưu lại và đóng trình soạn thảo, Git sẽ làm gì?',
          type: 'single',
          options: [
            { text: 'Git hiểu rằng bạn muốn loại bỏ (drop) commit đó và sẽ xóa hoàn toàn commit đó khỏi nhánh', correct: true },
            { text: 'Git sẽ báo lỗi cú pháp và bắt bạn nhập lại', correct: false },
            { text: 'Git tự động nhân đôi commit đó lên', correct: false },
            { text: 'Không có chuyện gì xảy ra cả', correct: false },
          ],
          explanation:
            'Xóa dòng trong todo list tương đương với chỉ thị `drop`: Git sẽ bỏ qua commit đó khi tái tạo lịch sử.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây dùng để mở phiên Interactive Rebase biên tập lại 5 commit gần nhất?',
          type: 'single',
          options: [
            { text: 'git rebase -i HEAD~5', correct: true },
            { text: 'git rebase --interactive 5', correct: false },
            { text: 'git edit-history HEAD~5', correct: false },
            { text: 'git interactive 5', correct: false },
          ],
          explanation:
            '`git rebase -i HEAD~5` là cú pháp chuẩn mực để biên tập 5 commit gần nhất.',
        },
        {
          id: 'q4',
          question: 'Làm thế nào để thay đổi thứ tự xuất hiện của hai commit bằng Interactive Rebase?',
          type: 'single',
          options: [
            { text: 'Chỉ cần hoán đổi vị trí của hai dòng tương ứng trong tệp Todo List rồi lưu lại', correct: true },
            { text: 'Gõ lệnh git swap-commits', correct: false },
            { text: 'Thay đổi ngày giờ của hệ điều hành máy tính', correct: false },
            { text: 'Đổi tên nhánh rồi đổi ngược lại', correct: false },
          ],
          explanation:
            'Git áp dụng commit theo thứ tự từ trên xuống dưới trong Todo list; đổi vị trí dòng là đổi thứ tự commit.',
        },
      ],
    },
  },
  {
    id: '14-squash-commit',
    moduleId: '05-advanced-git',
    title: 'Squash Commit',
    duration: 30,
    xp: 95,
    keywords: ['squash commit', 'git squash', 'gop commit', 'interactive rebase squash', 'ket hop commit', 'clean history'],
    prerequisites: ['13-interactive-rebase'],
    objectives: [
      'Nắm vững khái niệm và kỹ thuật gộp commit (Squash Commit) trong Git.',
      'Sử dụng chỉ thị `squash` (hoặc `s`) trong Interactive Rebase để gộp nhiều commit vụn vặt thành một khối.',
      'Biên tập lại thông điệp commit kết hợp (Combined Commit Message) sao cho súc tích và mạch lạc.',
      'Phân biệt sự khác biệt giữa chỉ thị `squash` (giữ lại message để chỉnh sửa) và `fixup` (bỏ qua message).',
    ],
    definition:
      'Squash Commit (Gộp commit) là kỹ thuật nén và hợp nhất hai hoặc nhiều commit liên tiếp thành một commit duy nhất trong lịch sử Git. Khi sử dụng chỉ thị `squash` (hoặc viết tắt là `s`) trong Interactive Rebase, Git sẽ lấy toàn bộ các thay đổi mã nguồn của commit được đánh dấu squash gộp vào commit nằm ngay phía trước nó, sau đó mở cửa sổ soạn thảo tổng hợp chứa toàn bộ thông điệp của các commit thành phần để lập trình viên tự do viết lại một thông điệp cô đọng nhất.',
    why:
      'Trong lúc lập trình, tư duy của bạn thường diễn ra theo từng bước nhỏ: thử nghiệm giải pháp, sửa lỗi cú pháp, bổ sung trường dữ liệu, tinh chỉnh giao diện. Điều này sinh ra một chuỗi 5-10 commit vụn vặt không có giá trị độc lập. Nếu đưa toàn bộ đống vụn này vào nhánh chính, lịch sử dự án sẽ bị rác và rất khó tra cứu sau này. Kỹ thuật Squash Commit giúp bạn nén toàn bộ chuỗi vụn vặt đó thành một commit duy nhất hoàn chỉnh mang thông điệp chuẩn mực trước khi hợp nhất vào dòng chảy chính.',
    mentalModel:
      'Hãy hình dung bạn đang nhào bột nặn bánh mì. Bạn cho một nắm bột nhỏ vào âu, thêm một chút nước, rắc một chút men nở, rồi thêm một nhúm muối (từng commit vụn vặt). Khi chuẩn bị đem vào lò nướng, bạn không nướng riêng từng hạt muối hay giọt nước rời rạc. Bạn dùng tay nhào nặn tất cả các thành phần đó lại với nhau thành một khối bột bánh mì dẻo dai, tròn trịa duy nhất (`squash commit`). Chiếc bánh mì nướng ra lò là một sản phẩm hoàn chỉnh và thơm ngon.',
    diagram: `Cơ chế gộp commit bằng squash:
Trước khi squash (3 commit vụn):
C1 ──► C2 ("wip cart") ──► C3 ("fix cart css") ──► C4 ("cart ready")

Trong Todo List:
pick C2 wip cart
squash C3 fix cart css
squash C4 cart ready

Sau khi hoàn tất:
C1 ──► C_new ("feat: complete shopping cart module") (Một commit duy nhất!)`,
    example:
      'Kỹ sư Nam tạo 3 commit trên nhánh cá nhân: commit 1 có nội dung tạo form đăng ký, commit 2 thêm kiểm tra email hợp lệ, commit 3 sửa màu sắc nút submit. Chuẩn bị gửi Pull Request, Nam chạy lệnh: `git rebase -i HEAD~3`. Trong tệp todo list, Nam giữ dòng đầu tiên là `pick`, đổi hai dòng sau thành `squash` (hoặc `s`). Khi lưu lại, Git hiển thị màn hình tổng hợp chứa cả 3 thông điệp cũ. Nam xóa sạch các dòng rác và viết lại tiêu đề duy nhất: "feat: add user registration form with validation and styling". Commit mới ra đời tinh gọn tuyệt đối.',
    commands: [
      'git rebase -i HEAD~<n>',
      's <commit-hash> <message>',
      'squash <commit-hash> <message>',
      'git log --oneline -n 5',
    ],
    explanation:
      '- `squash <hash>`: Gộp commit này vào commit liền trước nó và giữ lại thông điệp trong trình soạn thảo tổng hợp.\n- `s <hash>`: Ký tự viết tắt tiện lợi của lệnh `squash` trong danh sách Todo List.\n- `git rebase -i`: Lệnh khởi động môi trường tương tác để thiết lập các chỉ thị squash.\n- `git log --oneline`: Kiểm tra lại kết quả gộp commit trên cây lịch sử.',
    mistakes: [
      'Đặt chỉ thị `squash` ngay ở dòng đầu tiên của Todo List: Sẽ gây lỗi vì dòng đầu tiên không có commit nào nằm phía trước để gộp vào.',
      'Quên xóa các dòng thông điệp commit rác trong cửa sổ tổng hợp: Khiến thông điệp cuối cùng chứa đầy những câu vụn vặt như "fix typo", "temp".',
      'Squash nhầm các commit thuộc hai tính năng hoàn toàn khác nhau vào làm một commit khổng lồ.',
    ],
    labSteps: [
      'Tạo liên tiếp 3 commit nhỏ bổ sung từng dòng chữ vào tệp `notes.txt`.',
      'Chạy lệnh `git rebase -i HEAD~3`.',
      'Giữ dòng 1 là `pick`, đổi dòng 2 và 3 thành `s` hoặc `squash`.',
      'Lưu và đóng file. Trong màn hình tiếp theo, chỉnh sửa lại thông điệp commit thành một câu hoàn chỉnh.',
      'Dùng `git log --oneline` để xác nhận 3 commit cũ đã gộp thành 1 commit duy nhất.',
    ],
    hint: 'Nhớ nguyên tắc: Dòng đầu tiên trong Todo List luôn luôn phải là `pick` (hoặc reword/edit), không thể là `squash`.',
    validation: 'Gộp thành công nhiều commit thành một commit duy nhất và biên tập lại thông điệp chuẩn xác.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ thuật Squash Commit.',
    challenge: 'Nêu sự khác biệt giữa việc tự tay squash bằng `git rebase -i` ở local và việc bấm nút "Squash and merge" trên giao diện GitHub.',
    summary: [
      'Squash Commit kết hợp nhiều commit nhỏ thành một khối commit duy nhất hoàn chỉnh.',
      'Chỉ thị `squash` (hoặc `s`) gộp mã nguồn vào commit phía trước và cho phép biên tập thông điệp tổng hợp.',
      'Giúp lịch sử dự án cô đọng, dễ kiểm soát và không bị rác bởi các commit dở dang.',
    ],
    quiz: {
      id: 'quiz-05-14-squash-commit',
      title: 'Trắc nghiệm: Kỹ thuật Squash Commit',
      questions: [
        {
          id: 'q1',
          question: 'Điều gì sẽ xảy ra nếu bạn đặt chỉ thị `squash` ngay tại dòng đầu tiên trong tệp Todo List của Interactive Rebase?',
          type: 'single',
          options: [
            { text: 'Git sẽ báo lỗi ngay lập tức vì dòng đầu tiên không có commit nào nằm phía trước để gộp vào', correct: true },
            { text: 'Git tự động gộp vào commit đầu tiên của toàn bộ lịch sử dự án', correct: false },
            { text: 'Git tự động bỏ qua commit đó', correct: false },
            { text: 'Máy tính sẽ tự động tắt ứng dụng Git', correct: false },
          ],
          explanation:
            '`squash` yêu cầu phải có một commit làm đích ở phía trước nó; dòng đầu tiên bắt buộc phải là một commit độc lập.',
        },
        {
          id: 'q2',
          question: 'Sau khi lưu tệp Todo List có chứa chỉ thị `squash`, bước tiếp theo Git sẽ yêu cầu bạn làm gì?',
          type: 'single',
          options: [
            { text: 'Mở cửa sổ soạn thảo chứa thông điệp của tất cả các commit thành phần để bạn biên tập lại thông điệp chung', correct: true },
            { text: 'Yêu cầu bạn nhập mật khẩu tài khoản GitHub', correct: false },
            { text: 'Yêu cầu bạn khởi động lại máy tính', correct: false },
            { text: 'Tự động đóng lại và không hỏi gì thêm', correct: false },
          ],
          explanation:
            'Chỉ thị `squash` mở editor tổng hợp để bạn gọt giũa thông điệp commit kết hợp.',
        },
        {
          id: 'q3',
          question: 'Ký tự viết tắt tương đương với từ khóa `squash` trong tệp Todo List là gì?',
          type: 'single',
          options: [
            { text: 's', correct: true },
            { text: 'q', correct: false },
            { text: 'c', correct: false },
            { text: 'm', correct: false },
          ],
          explanation:
            'Bạn có thể gõ ngắn gọn chữ `s` thay vì phải gõ đầy đủ từ `squash`.',
        },
        {
          id: 'q4',
          question: 'Lợi ích chính của việc gộp (squash) các commit thử nghiệm trước khi mở Pull Request là gì?',
          type: 'single',
          options: [
            { text: 'Loại bỏ các commit rác vô nghĩa, giúp người review dễ đọc hiểu và lịch sử dự án luôn trong sạch', correct: true },
            { text: 'Làm tăng dung lượng mã nguồn của dự án', correct: false },
            { text: 'Giúp mã nguồn chạy nhanh hơn trên trình duyệt web', correct: false },
            { text: 'Tự động kiểm tra lỗi chính tả trong mã nguồn', correct: false },
          ],
          explanation:
            'Squash tạo ra các khối commit nguyên tử (Atomic Commits) có ý nghĩa trọn vẹn, nâng cao chất lượng code review.',
        },
        {
          id: 'q5',
          question: 'Nếu bạn có 4 commit vụn và muốn gộp cả 4 commit đó lại thành một commit duy nhất, Todo List cần cấu hình như thế nào?',
          type: 'single',
          options: [
            { text: 'Dòng 1 để `pick`, 3 dòng tiếp theo để `squash` (hoặc `s`)', correct: true },
            { text: 'Cả 4 dòng đều để `squash`', correct: false },
            { text: 'Cả 4 dòng đều để `pick`', correct: false },
            { text: 'Dòng 1 để `drop`, 3 dòng sau để `pick`', correct: false },
          ],
          explanation:
            'Dòng 1 là commit nền tảng nhận kết quả (`pick`), 3 dòng sau nén dồn vào dòng 1 (`squash`).',
        },
        {
          id: 'q6',
          question: 'Điểm khác biệt cốt lõi giữa `squash` và `fixup` trong Interactive Rebase là gì?',
          type: 'single',
          options: [
            { text: 'squash giữ lại thông điệp cũ để bạn biên tập, còn fixup tự động vứt bỏ thông điệp cũ mà không cần mở editor', correct: true },
            { text: 'squash xóa tệp, fixup giữ tệp', correct: false },
            { text: 'fixup chỉ dùng cho nhánh main, squash dùng cho mọi nhánh', correct: false },
            { text: 'Hai chỉ thị này hoàn toàn giống hệt nhau không có gì khác', correct: false },
          ],
          explanation:
            '`fixup` tương tự như `squash` về mặt mã nguồn, nhưng tự động loại bỏ thông điệp thừa để quy trình diễn ra nhanh chóng.',
        },
      ],
    },
  },
  {
    id: '15-fixup-autosquash',
    moduleId: '05-advanced-git',
    title: 'Fixup & Autosquash',
    duration: 30,
    xp: 95,
    keywords: ['fixup', 'autosquash', 'git commit --fixup', 'git rebase --autosquash', 'tu dong gop commit', 'fast editing'],
    prerequisites: ['14-squash-commit'],
    objectives: [
      'Hiểu rõ sự tiện lợi vượt trội của chỉ thị `fixup` so với `squash` khi không cần giữ lại thông điệp thừa.',
      'Sử dụng câu lệnh `git commit --fixup <commit-hash>` để tự động tạo commit sửa lỗi gắn nhãn.',
      'Kích hoạt tính năng kỳ diệu `git rebase -i --autosquash` để Git tự động sắp xếp và gộp commit tự động.',
      'Cấu hình Git tự động bật autosquash vĩnh viễn trong tệp `.gitconfig`.',
    ],
    definition:
      '`fixup` và `autosquash` là cặp đôi tính năng tự động hóa đỉnh cao trong Git giúp tối ưu hóa quy trình chỉnh sửa lịch sử. Chỉ thị `fixup` (hoặc `f`) gộp các thay đổi của commit hiện tại vào commit phía trước nhưng tự động vứt bỏ thông điệp của nó mà không làm gián đoạn bạn với cửa sổ soạn thảo. Khi kết hợp với cờ `git commit --fixup <target-hash>` và `git rebase -i --autosquash`, Git sẽ tự động tìm đúng commit cần sửa, di chuyển commit vá lỗi đến đúng vị trí và gộp hoàn toàn tự động chỉ với một cú nhấn Enter.',
    why:
      'Hãy tưởng tượng bạn đang có một chuỗi 10 commit và bạn phát hiện ra một lỗi nhỏ trong commit số 3 (cách đây 7 commit). Thay vì phải chạy `rebase -i`, đếm số lượng commit, cẩn thận kéo dòng vá lỗi lên đúng vị trí của commit số 3 và đổi từ pick thành fixup bằng tay một cách vất vả, cặp đôi `--fixup` và `--autosquash` làm toàn bộ các thao tác thủ công đó cho bạn chỉ trong 2 giây với độ chính xác 100%.',
    mentalModel:
      'Hãy hình dung một nhân viên văn thư đang quản lý một tủ hồ sơ chứa 10 tập tài liệu đánh số từ 1 đến 10. Khi phát hiện một tờ biên lai bổ sung thuộc về hồ sơ số 3, nhân viên không cần lục tung cả tủ hồ sơ. Nhân viên chỉ cần dán một tờ giấy ghi chú màu vàng lên tờ biên lai: "Gửi kèm hồ sơ số 3" (`git commit --fixup <hồ-sơ-3>`). Khi nhấn nút dọn dẹp tủ tự động (`--autosquash`), cánh tay robot tự động tìm đến ngăn số 3, nhét tờ biên lai vào bên trong hồ sơ số 3 và dán kín lại ngăn nắp.',
    diagram: `Quy trình tự động hóa với Autosquash:
1. Sửa code lỗi của commit C2 (hash 7a8b9c)
2. Gõ lệnh: git commit --fixup 7a8b9c
   Git sinh ra commit mới có tiêu đề: "fixup! feat: user authentication"

3. Gõ lệnh: git rebase -i --autosquash HEAD~5
   Git tự động sắp xếp lại Todo List không cần bạn động tay:
   pick 7a8b9c feat: user authentication
   fixup 1e2f3a fixup! feat: user authentication  <-- TỰ ĐỘNG ĐƯỢC CHÈN VÀO ĐÂY!
   pick 4b5c6d feat: payment gateway`,
    example:
      'Kỹ sư Linh đang kiểm thử nhánh tính năng và phát hiện một lỗi chính tả nghiêm trọng trong hàm tính thuế đã được commit ở mã hash `d3e4f5a`. Linh nhanh chóng sửa lại hàm cho đúng quy chuẩn kỹ thuật, gõ `git add tax.js`, rồi thực thi câu lệnh: `git commit --fixup d3e4f5a`. Git tự động tạo commit phụ trợ đặc biệt với nhãn ghi rõ mục tiêu cần sửa. Tiếp theo, Linh gõ: `git rebase -i --autosquash d3e4f5a~1`. Trình soạn thảo mở ra và Linh hoàn toàn ngạc nhiên thích thú khi thấy Git đã tự động di chuyển commit sửa lỗi lên ngay sau commit tính thuế và đổi sẵn chỉ thị thành `fixup`. Linh chỉ việc bấm lưu tệp và toàn bộ lịch sử được dọn dẹp hoàn hảo trong chớp mắt.',
    commands: [
      'git commit --fixup <commit-hash>',
      'git rebase -i --autosquash <base-hash>',
      'git config --global rebase.autoSquash true',
    ],
    explanation:
      '- `git commit --fixup <hash>`: Tạo commit với tiền tố đặc biệt `fixup! <thông-điệp-cũ>` trỏ thẳng tới commit cần sửa.\n- `git rebase -i --autosquash <base>`: Kích hoạt rebase tự động nhận diện các commit fixup và sắp xếp vị trí tương ứng.\n- `git config --global rebase.autoSquash true`: Cấu hình Git luôn tự động bật tính năng autosquash mỗi khi chạy interactive rebase.',
    mistakes: [
      'Quên cờ `--autosquash` khi chạy rebase: Khiến commit fixup nằm nguyên ở đuôi danh sách như commit thông thường.',
      'Truyền nhầm mã hash của commit khác vào lệnh `git commit --fixup`.',
      'Chạy autosquash trên commit đã được push lên server chung.',
    ],
    labSteps: [
      'Tạo commit A, commit B, commit C liên tiếp.',
      'Sửa đổi tệp tin liên quan đến commit A.',
      'Chạy `git commit --fixup <hash-của-commit-A>`.',
      'Chạy `git rebase -i --autosquash HEAD~4`. Quan sát Git tự động sắp xếp vị trí.',
      'Lưu file và dùng `git log --oneline` để xác nhận commit A đã được vá tự động.',
    ],
    hint: 'Chạy `git config --global rebase.autoSquash true` một lần để không bao giờ phải gõ cờ `--autosquash` dài dòng nữa.',
    validation: 'Vận hành thành thạo bộ đôi git commit --fixup và git rebase --autosquash để sửa nhanh commit cũ.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng Fixup và Autosquash.',
    challenge: 'Nêu sự khác biệt giữa `git commit --fixup` và `git commit --squash` trong cơ chế autosquash.',
    summary: [
      '`fixup` gộp mã nguồn vào commit trước và tự động loại bỏ thông điệp thừa.',
      '`git commit --fixup <hash>` đánh dấu mục tiêu cần sửa chữa một cách tự động.',
      '`git rebase -i --autosquash` tự động tổ chức lại Todo List mà không cần can thiệp thủ công.',
    ],
    quiz: {
      id: 'quiz-05-15-fixup-autosquash',
      title: 'Trắc nghiệm: Fixup & Autosquash',
      questions: [
        {
          id: 'q1',
          question: 'Thông điệp mặc định của một commit được tạo ra bằng lệnh `git commit --fixup <commit-hash>` có định dạng như thế nào?',
          type: 'single',
          options: [
            { text: 'fixup! <tiêu đề của commit mục tiêu>', correct: true },
            { text: 'squash! <tiêu đề của commit mục tiêu>', correct: false },
            { text: 'auto: sửa đổi commit cũ', correct: false },
            { text: 'Một chuỗi ngẫu nhiên không có quy luật', correct: false },
          ],
          explanation:
            'Tiền tố `fixup! ` giúp cờ `--autosquash` nhận biết chính xác commit này cần được gộp vào đâu.',
        },
        {
          id: 'q2',
          question: 'Khi bạn chạy `git rebase -i --autosquash`, Git sẽ tự động làm thao tác nào trong Todo List?',
          type: 'single',
          options: [
            { text: 'Tự động di chuyển commit fixup lên ngay dưới commit mục tiêu và đổi chỉ thị thành fixup', correct: true },
            { text: 'Tự động xóa sạch toàn bộ các commit trong danh sách', correct: false },
            { text: 'Tự động gửi email thông báo cho đồng nghiệp', correct: false },
            { text: 'Tự động đẩy code lên máy chủ GitHub', correct: false },
          ],
          explanation:
            'Autosquash tự động quét các tiền tố `fixup!` và `squash!` để tái cấu trúc Todo list thông minh.',
        },
        {
          id: 'q3',
          question: 'Lệnh cấu hình nào giúp bạn luôn luôn kích hoạt tính năng autosquash mà không cần phải gõ cờ `--autosquash` mỗi lần rebase?',
          type: 'single',
          options: [
            { text: 'git config --global rebase.autoSquash true', correct: true },
            { text: 'git config --global git.alwaysFixup true', correct: false },
            { text: 'git set autosquash on', correct: false },
            { text: 'git enable auto-rebase', correct: false },
          ],
          explanation:
            'Cấu hình `rebase.autoSquash true` trong config toàn cục biến hành vi autosquash thành mặc định.',
        },
        {
          id: 'q4',
          question: 'Trường hợp sử dụng lý tưởng nhất của `git commit --fixup` trong thực tế là gì?',
          type: 'single',
          options: [
            { text: 'Khi phát hiện một lỗi nhỏ trong một commit cũ sâu trong lịch sử mà muốn sửa ngay mà không làm xáo trộn công việc', correct: true },
            { text: 'Khi muốn xóa toàn bộ lịch sử của dự án', correct: false },
            { text: 'Khi muốn tạo một nhánh hoàn toàn mới', correct: false },
            { text: 'Khi chuẩn bị tắt máy tính đi về nhà', correct: false },
          ],
          explanation:
            'Fixup + Autosquash là cặp đôi sửa lỗi hồi tố (retroactive fix) nhanh nhất trong lịch sử Git.',
        },
      ],
    },
  },
  {
    id: '16-reword-edit-drop',
    moduleId: '05-advanced-git',
    title: 'Reword / Edit / Drop Commit',
    duration: 30,
    xp: 95,
    keywords: ['reword commit', 'edit commit', 'drop commit', 'sua thong diep', 'sua noi dung commit', 'xoa commit'],
    prerequisites: ['13-interactive-rebase'],
    objectives: [
      'Làm chủ 3 chỉ thị quyền năng còn lại của Interactive Rebase: `reword` (sửa thông điệp), `edit` (sửa nội dung) và `drop` (xóa commit).',
      'Sử dụng `reword` (hoặc `r`) để chuẩn hóa các commit message cũ sâu trong quá khứ.',
      'Sử dụng `edit` (hoặc `e`) để tạm dừng tiến trình rebase, bổ sung thêm file hoặc chia nhỏ commit đó.',
      'Sử dụng `drop` (hoặc `d`) để loại bỏ hoàn toàn các commit thử nghiệm không còn giá trị.',
    ],
    definition:
      '`reword`, `edit` và `drop` là bộ ba công cụ can thiệp chuyên sâu vào từng lát cắt lịch sử trong Interactive Rebase của Git. Chỉ thị `reword` (hoặc `r`) cho phép sửa đổi thông điệp của một commit bất kỳ trong quá khứ mà giữ nguyên mã nguồn. Chỉ thị `edit` (hoặc `e`) tạm dừng cỗ máy thời gian ngay tại thời điểm commit đó được sinh ra để bạn tự do sửa đổi tệp tin hoặc chia nhỏ commit. Còn chỉ thị `drop` (hoặc `d`) xóa bỏ vĩnh viễn commit đó khỏi chuỗi lịch sử.',
    why:
      'Trong thực tế, bạn không chỉ muốn gộp commit mà còn cần gọt giũa chi tiết: một commit cách đây 5 bước bị viết sai mã vé Jira, một commit khác lỡ tay thêm tệp log nặng hàng chục megabyte cần phải xóa bỏ, hay một commit làm quá nhiều việc cần được dừng lại để bóc tách thành hai. Bộ ba reword, edit và drop trao cho bạn khả năng kiểm soát phẫu thuật chính xác đến từng nguyên tử đối với bất kỳ điểm nào trong dòng thời gian Git.',
    mentalModel:
      'Hãy hình dung bạn sở hữu cỗ máy thời gian quay về quá khứ của một cuốn phim tài liệu. Lệnh `reword` giống như việc bạn chỉ cần thu âm lại lời bình của thuyết minh viên cho một đoạn phim mà không đổi cảnh quay. Lệnh `edit` giống như việc bạn bước hẳn vào trường quay của ngày hôm đó, bảo các diễn viên dừng hình, bạn thêm một đạo cụ vào tay diễn viên rồi mới cho máy quay chạy tiếp (`git rebase --continue`). Còn lệnh `drop` giống như việc bạn dùng kéo cắt đứt đoạn phim đó vứt vào sọt rác.',
    diagram: `3 hành động phẫu thuật commit:
[pick C1]  ──► Giữ nguyên không đổi
[reword C2]──► Dừng lại để mở editor sửa commit message của C2
[edit C3]  ──► Dừng cỗ máy thời gian tại C3! (Cho phép git add/commit thêm)
[drop C4]  ──► Xóa sổ hoàn toàn C4!
[pick C5]  ──► Áp dụng tiếp bình thường`,
    example:
      'Kỹ sư Đức kiểm tra nhánh trước khi bàn giao và phát hiện 3 vấn đề: commit 1 ghi nhầm số issue #101 thành #102, commit 2 vô tình commit nhầm file mật khẩu `secret.env`, commit 3 thiếu tệp test. Đức chạy lệnh `git rebase -i HEAD~3`. Trong Todo List, Đức đánh dấu: dòng 1 là `reword`, dòng 2 là `drop`, dòng 3 là `edit`. Khi lưu lại, Git dừng ở commit 1 để Đức sửa lại thành #101. Tiếp theo Git xóa phăng commit 2 chứa file mật khẩu. Cuối cùng Git dừng lại ở commit 3, Đức thêm file test, gõ `git add` và `git rebase --continue`. Toàn bộ nhánh được dọn dẹp sạch bong và tuyệt đối an toàn.',
    commands: [
      'r <commit-hash> (hoặc reword)',
      'e <commit-hash> (hoặc edit)',
      'd <commit-hash> (hoặc drop)',
      'git rebase --continue',
      'git reset HEAD~1 (trong lúc edit)',
    ],
    explanation:
      '- `reword <hash>`: Giữ nguyên mã nguồn của commit nhưng mở editor để sửa đổi tiêu đề và mô tả commit.\n- `edit <hash>`: Tạm dừng tiến trình rebase tại commit này, cho phép bạn chỉnh sửa tệp tin, commit amend hoặc chia tách commit.\n- `drop <hash>`: Xóa bỏ hoàn toàn commit này (tương đương với việc xóa dòng đó khỏi Todo List).\n- `git rebase --continue`: Báo cho Git biết bạn đã hoàn tất chỉnh sửa ở bước edit và tiếp tục tiến trình.',
    mistakes: [
      'Quên gõ `git rebase --continue` sau khi edit: Khiến Git bị treo mãi ở trạng thái rebase dở dang.',
      'Sử dụng `drop` nhầm commit quan trọng chứa mã nguồn cần giữ lại.',
      'Lúng túng khi đang ở trạng thái edit: Chỉ cần nhớ bạn đang đứng tại đúng thời điểm của commit đó, sửa xong thì `git add` và `git commit --amend` rồi `--continue`.',
    ],
    labSteps: [
      'Tạo 3 commit liên tiếp, trong đó commit 2 có thông điệp `sai thong diep`.',
      'Chạy `git rebase -i HEAD~3`.',
      'Đổi từ khóa dòng 2 từ `pick` thành `reword`.',
      'Lưu và đóng editor; nhập thông điệp mới `thong diep chuan` khi Git yêu cầu.',
      'Kiểm tra lại `git log --oneline` để xác nhận thông điệp đã được sửa thành công.',
    ],
    hint: 'Khi ở trạng thái `edit`, bạn có thể chạy `git reset HEAD~1` để bóc tách một commit lớn thành nhiều commit nhỏ.',
    validation: 'Sử dụng thành thạo reword để đổi thông điệp, edit để sửa code và drop để loại bỏ commit.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về các chỉ thị reword, edit và drop.',
    challenge: 'Mô tả quy trình từng bước sử dụng chỉ thị `edit` để chia một commit lớn thành 2 commit nhỏ riêng biệt.',
    summary: [
      '`reword` (r) sửa đổi thông điệp của commit trong quá khứ mà giữ nguyên mã nguồn.',
      '`edit` (e) tạm dừng tiến trình để bổ sung thay đổi hoặc chia nhỏ commit.',
      '`drop` (d) loại bỏ vĩnh viễn commit thừa ra khỏi chuỗi lịch sử.',
    ],
    quiz: {
      id: 'quiz-05-16-reword-edit-drop',
      title: 'Trắc nghiệm: Reword, Edit và Drop Commit',
      questions: [
        {
          id: 'q1',
          question: 'Chỉ thị nào trong Interactive Rebase cho phép bạn sửa đổi thông điệp của một commit cũ mà KHÔNG làm thay đổi mã nguồn của nó?',
          type: 'single',
          options: [
            { text: 'reword (hoặc r)', correct: true },
            { text: 'edit (hoặc e)', correct: false },
            { text: 'drop (hoặc d)', correct: false },
            { text: 'pick (hoặc p)', correct: false },
          ],
          explanation:
            '`reword` chỉ dừng lại để mở editor sửa đổi commit message, mã nguồn được bảo toàn nguyên vẹn.',
        },
        {
          id: 'q2',
          question: 'Khi bạn đặt chỉ thị `edit` cho một commit trong Todo List, Git sẽ cư xử như thế nào khi chạy đến commit đó?',
          type: 'single',
          options: [
            { text: 'Tạm dừng toàn bộ tiến trình rebase tại commit đó và trả quyền điều khiển về terminal để bạn chỉnh sửa code', correct: true },
            { text: 'Tự động mở trình duyệt web tìm kiếm tài liệu', correct: false },
            { text: 'Xóa commit đó đi và làm tiếp commit sau', correct: false },
            { text: 'Tắt cửa sổ terminal của bạn', correct: false },
          ],
          explanation:
            '`edit` đưa bạn về đúng snapshot của commit đó để bạn sửa code, bổ sung file hoặc chạy commit amend.',
        },
        {
          id: 'q3',
          question: 'Sau khi đã chỉnh sửa xong mã nguồn ở trạng thái tạm dừng của lệnh `edit`, câu lệnh nào dùng để tiếp tục tiến trình rebase?',
          type: 'single',
          options: [
            { text: 'git rebase --continue', correct: true },
            { text: 'git rebase --next', correct: false },
            { text: 'git resume', correct: false },
            { text: 'git proceed', correct: false },
          ],
          explanation:
            '`git rebase --continue` là chỉ thị thông báo cho Git tiếp tục phát lại các commit còn lại trong danh sách.',
        },
        {
          id: 'q4',
          question: 'Hành động nào sau đây có tác dụng tương đương hoàn toàn với chỉ thị `drop` trong Todo List?',
          type: 'single',
          options: [
            { text: 'Xóa hoàn toàn dòng chứa commit đó ra khỏi tệp Todo List', correct: true },
            { text: 'Đổi từ pick thành squash', correct: false },
            { text: 'Chuyển dòng đó xuống dưới cùng của tệp', correct: false },
            { text: 'Đổi tên thông điệp commit thành chữ "deleted"', correct: false },
          ],
          explanation:
            'Xóa dòng trong Todo List và đặt từ khóa `drop` đều chỉ thị cho Git loại bỏ hoàn toàn commit đó khỏi lịch sử.',
        },
      ],
    },
  },
  {
    id: '17-rebase-conflict',
    moduleId: '05-advanced-git',
    title: 'Rebase Conflict',
    duration: 35,
    xp: 120,
    keywords: ['rebase conflict', 'xung dot rebase', 'rebase continue', 'rebase skip', 'rebase abort', 'conflict resolution'],
    prerequisites: ['12-git-rebase'],
    objectives: [
      'Hiểu rõ nguyên nhân và bản chất phát sinh xung đột (Conflict) trong tiến trình Git Rebase.',
      'Nắm vững máy trạng thái tạm dừng (Paused State Machine) của Rebase khi xảy ra xung đột.',
      'Vận hành chuẩn xác chuỗi 3 bước xử lý: Mở tệp giải quyết xung đột -> `git add` -> `git rebase --continue`.',
      'Phân biệt rõ ràng chức năng và mức độ an toàn của `--continue`, `--abort`, và `--skip`.',
    ],
    definition:
      'Rebase Conflict (Xung đột trong quá trình Rebase) là trạng thái Git tạm dừng tiến trình tái cơ sở khi một commit trong danh sách rebase cố gắng áp dụng thay đổi lên một vùng mã nguồn đã bị sửa đổi trái ngược trên nhánh đích. Khác với Merge Conflict chỉ xuất hiện duy nhất một lần ở cuối quá trình, Rebase Conflict có thể xuất hiện nhiều lần liên tiếp ứng với từng commit được áp dụng, đòi hỏi lập trình viên phải giải quyết dứt điểm từng bước một.',
    why:
      'Rất nhiều lập trình viên cảm thấy sợ hãi Git Rebase chỉ vì từng gặp phải xung đột và không biết cách thoát ra hoặc giải quyết. Hiểu rõ cơ chế tạm dừng của Rebase sẽ biến nỗi sợ hãi thành sự tự tin làm chủ: bạn biết chính xác commit nào đang gặp mâu thuẫn, sửa chữa xung đột một cách chuẩn xác, và nắm trong tay câu lệnh cứu cánh `git rebase --abort` để quay về điểm an toàn bất cứ lúc nào bạn muốn.',
    mentalModel:
      'Hãy hình dung bạn đang phát lại một cuốn băng ghi hình từng hành động sửa chữa ngôi nhà. Ở hành động số 1 (commit 1), bạn muốn sơn bức tường màu vàng, nhưng trên nhánh main người khác đã đập bỏ bức tường đó xây thành cửa sổ. Cuốn băng tạm dừng lại (Rebase paused). Bạn phải bước vào phòng, quyết định xem nên giữ cửa sổ hay sơn lại tường (Resolve Conflict), đánh dấu đã quyết định xong (`git add`), rồi bấm nút Play cho cuốn băng chạy tiếp hành động số 2 (`git rebase --continue`).',
    diagram: `Máy trạng thái xử lý Rebase Conflict:
[Chạy git rebase main] ──► Phát hiện Conflict tại commit C_i
                                    │
                                    ▼ (Git tạm dừng tiến trình)
       ┌────────────────────────────┴────────────────────────────┐
       ▼                                                         ▼
[git rebase --abort]                                [Mở tệp sửa conflict]
(Hủy bỏ, về trạng thái ban đầu)                                  │
                                                                 ▼
                                                            [git add <file>]
                                                                 │
                                                                 ▼
                                                    [git rebase --continue]
                                                    (Chạy tiếp commit tiếp theo!)`,
    example:
      'Kỹ sư Khoa đang rebase nhánh `feat/api-v2` lên nhánh chính `main` thì terminal dừng lại đột ngột và in ra thông báo cảnh báo: "CONFLICT (content): Merge conflict in server.js. error: could not apply [4a5b6c] feat: change port. Resolve all conflicts manually". Khoa rất bình tĩnh mở tệp `server.js` trong VS Code, quan sát các điểm mốc đánh dấu xung đột và nhận thấy cổng kết nối đang bị mâu thuẫn trực tiếp giữa 3000 và 8080. Khoa thảo luận nhanh với nhóm và quyết định chọn cổng 8080, xóa các dòng phân cách rồi lưu tệp lại. Khoa gõ `git add server.js` rồi thực thi câu lệnh: `git rebase --continue`. Git lập tức áp dụng xong commit đó và tiếp tục chạy mượt mà đến commit cuối cùng mà không gặp thêm bất kỳ trở ngại nào.',
    commands: [
      'git status',
      'git add <tên-tệp-đã-sửa>',
      'git rebase --continue',
      'git rebase --abort',
      'git rebase --skip',
    ],
    explanation:
      '- `git status`: Hiển thị danh sách các tệp tin đang bị xung đột cần giải quyết trong phiên rebase.\n- `git add <tệp>`: Đánh dấu tệp tin đã được giải quyết xung đột thành công (không được gõ git commit!).\n- `git rebase --continue`: Tiếp tục áp dụng các commit còn lại sau khi đã add tệp resolved.\n- `git rebase --abort`: Hủy bỏ hoàn toàn tiến trình rebase và đưa nhánh quay về trạng thái ban đầu trước khi gõ lệnh.\n- `git rebase --skip`: Bỏ qua hoàn toàn commit hiện tại (vứt bỏ thay đổi của commit này và làm tiếp commit sau).',
    mistakes: [
      'Gõ lệnh `git commit` sau khi sửa conflict trong rebase: Đây là sai lầm phổ biến nhất! Trong rebase bạn BẮT BUỘC phải dùng `git rebase --continue` chứ không dùng git commit.',
      'Lạm dụng lệnh `git rebase --skip`: Có thể vô tình xóa bỏ toàn bộ công sức của commit đang bị xung đột.',
      'Hoảng loạn xóa thư mục dự án khi gặp conflict thay vì chỉ cần gõ nhẹ nhàng `git rebase --abort`.',
    ],
    labSteps: [
      'Tạo nhánh `conflict-demo` từ main, sửa dòng 1 của tệp `app.js` và commit.',
      'Chuyển về `main`, sửa cùng dòng 1 của tệp `app.js` với nội dung khác và commit.',
      'Chuyển lại sang `conflict-demo` và chạy `git rebase main` để chủ động tạo conflict.',
      'Mở `app.js`, chọn nội dung phù hợp, xóa các vạch ngăn cách conflict và lưu lại.',
      'Chạy `git add app.js` rồi gõ `git rebase --continue` để hoàn tất rebase thành công.',
    ],
    hint: 'Sau khi giải quyết xong conflict và `git add`, câu lệnh tiếp theo LUÔN LUÔN là `git rebase --continue`.',
    validation: 'Giải quyết thành thạo xung đột trong quá trình rebase bằng git add và git rebase --continue.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về xử lý xung đột trong Git Rebase.',
    challenge: 'Tại sao trong quá trình rebase một nhánh gồm 5 commit, bạn có thể phải giải quyết conflict tới 5 lần riêng biệt?',
    summary: [
      'Rebase Conflict xảy ra khi một commit trong danh sách rebase xung đột với các commit trước đó.',
      'Quy trình chuẩn: Mở tệp sửa code -> `git add` -> `git rebase --continue`.',
      'Tuyệt đối không gõ `git commit` khi rebase đang tạm dừng; dùng `--abort` nếu muốn quay về an toàn.',
    ],
    quiz: {
      id: 'quiz-05-17-rebase-conflict',
      title: 'Trắc nghiệm: Xử lý Rebase Conflict',
      questions: [
        {
          id: 'q1',
          question: 'Sau khi mở tệp tin bị xung đột, chỉnh sửa xong xuôi và chạy lệnh `git add <tệp>`, câu lệnh ĐÚNG tiếp theo bạn phải chạy là gì?',
          type: 'single',
          options: [
            { text: 'git rebase --continue', correct: true },
            { text: 'git commit -m "fixed conflict"', correct: false },
            { text: 'git push origin main', correct: false },
            { text: 'git merge --continue', correct: false },
          ],
          explanation:
            'Trong quy trình rebase, sau khi add tệp resolved bạn BẮT BUỘC dùng `git rebase --continue` để Git tự động tạo commit tiếp.',
        },
        {
          id: 'q2',
          question: 'Điều gì sẽ xảy ra nếu bạn chạy câu lệnh `git rebase --skip` khi đang ở trạng thái xung đột commit?',
          type: 'single',
          options: [
            { text: 'Git sẽ bỏ qua hoàn toàn commit đang bị xung đột (vứt bỏ các thay đổi của nó) và nhảy sang commit tiếp theo', correct: true },
            { text: 'Git sẽ tự động sửa hết lỗi xung đột cho bạn', correct: false },
            { text: 'Git sẽ hủy bỏ phiên rebase và quay về ban đầu', correct: false },
            { text: 'Git sẽ xóa toàn bộ nhánh main', correct: false },
          ],
          explanation:
            '`--skip` bỏ qua commit hiện tại, chỉ dùng khi bạn thực sự muốn vứt bỏ toàn bộ thay đổi của commit đó.',
        },
        {
          id: 'q3',
          question: 'Nếu gặp phải một xung đột quá nan giải trong rebase và bạn muốn hủy bỏ toàn bộ để quay về trạng thái an toàn ban đầu, bạn dùng lệnh nào?',
          type: 'single',
          options: [
            { text: 'git rebase --abort', correct: true },
            { text: 'git rebase --cancel', correct: false },
            { text: 'git undo --all', correct: false },
            { text: 'git reset --force', correct: false },
          ],
          explanation:
            '`git rebase --abort` hủy phiên rebase và hoàn nguyên trạng thái nhánh về y hệt lúc trước khi gõ lệnh.',
        },
        {
          id: 'q4',
          question: 'Tại sao Rebase Conflict có thể phải giải quyết nhiều lần liên tiếp, trong khi Merge Conflict thông thường chỉ giải quyết 1 lần?',
          type: 'single',
          options: [
            { text: 'Vì Rebase áp dụng lần lượt từng commit đơn lẻ, mỗi commit đều có khả năng gây xung đột độc lập', correct: true },
            { text: 'Vì Git bị lỗi vòng lặp vô tận', correct: false },
            { text: 'Do máy chủ GitHub gửi yêu cầu kiểm tra lại nhiều lần', correct: false },
            { text: 'Vì rebase làm tăng kích thước tệp tin', correct: false },
          ],
          explanation:
            'Rebase là chuỗi các thao tác cherry-pick liên tiếp; mỗi commit được replay đều có thể chạm vào vùng code xung đột.',
        },
        {
          id: 'q5',
          question: 'Lệnh nào giúp bạn kiểm tra danh sách chính xác các tệp tin đang bị xung đột khi Git đang ở trạng thái tạm dừng rebase?',
          type: 'single',
          options: [
            { text: 'git status', correct: true },
            { text: 'git show-conflicts', correct: false },
            { text: 'git list-broken', correct: false },
            { text: 'git check-files', correct: false },
          ],
          explanation:
            '`git status` hiển thị chi tiết trạng thái rebase đang tạm dừng tại commit nào và liệt kê các tệp "both modified".',
        },
        {
          id: 'q6',
          question: 'Sai lầm tai hại nhất mà lập trình viên mới học hay mắc phải khi giải quyết conflict trong rebase là gì?',
          type: 'single',
          options: [
            { text: 'Gõ lệnh `git commit` thay vì gõ `git rebase --continue`', correct: true },
            { text: 'Mở tệp tin bằng trình soạn thảo mã nguồn', correct: false },
            { text: 'Trao đổi với đồng nghiệp viết đoạn code xung đột', correct: false },
            { text: 'Kiểm tra trạng thái bằng git status', correct: false },
          ],
          explanation:
            'Gõ `git commit` thủ công sẽ phá vỡ tiến trình máy trạng thái của rebase và tạo ra commit thừa không mong muốn.',
        },
      ],
    },
  },
  {
    id: '18-git-tag',
    moduleId: '05-advanced-git',
    title: 'git tag',
    duration: 25,
    xp: 80,
    keywords: ['git tag', 'lightweight tag', 'gan the phien ban', 'danh dau moc', 'release marker', 'tag git'],
    prerequisites: ['08-commit-amend'],
    objectives: [
      'Hiểu rõ khái niệm và vai trò của Tag trong Git như các mốc đánh dấu phiên bản bất biến.',
      'Phân biệt rõ ràng giữa con trỏ nhánh (Branch - di chuyển liên tục) và con trỏ thẻ (Tag - đứng yên vĩnh viễn).',
      'Tạo và quản lý các thẻ Lightweight Tag (Thẻ nhẹ) nhanh chóng.',
      'Đẩy thẻ lên máy chủ từ xa và xóa thẻ khi không còn sử dụng.',
    ],
    definition:
      '`git tag` là câu lệnh quản lý thẻ phiên bản trong Git, được sử dụng để đánh dấu và ghim cố định một mốc thời gian quan trọng cụ thể trong lịch sử của kho lưu trữ (thường là các phiên bản phát hành sản phẩm như `v1.0.0`, `v2.1.0-beta`). Trong khi con trỏ nhánh liên tục tiến về phía trước mỗi khi có commit mới, con trỏ Tag là một mốc tham chiếu tĩnh bất biến vĩnh cửu gắn chặt vào một commit duy nhất.',
    why:
      'Trong quản lý dự án phần mềm chuyên nghiệp, khách hàng và bộ phận vận hành chỉ quan tâm đến các phiên bản phát hành cụ thể chứ không thể nhớ các chuỗi mã băm commit hash phức tạp. `git tag` cung cấp các mốc định danh rõ ràng, dễ nhớ, giúp đội ngũ có thể dễ dàng kiểm tra lại chính xác trạng thái mã nguồn của phiên bản đã bán cho khách hàng cách đây 6 tháng để tái hiện lỗi hoặc phát hành bản vá bảo mật khẩn cấp.',
    mentalModel:
      'Hãy hình dung cuốn album ảnh kỷ niệm của gia đình. Các trang ảnh cứ nối tiếp nhau tăng dần theo thời gian (chuỗi commit trên nhánh). `git tag` giống như một chiếc kẹp sách bằng đồng đẹp mắt bạn kẹp vào đúng trang ảnh "Ngày cưới của bố mẹ" hoặc "Lễ tốt nghiệp đại học". Dù cuốn album có thêm hàng trăm bức ảnh mới trong tương lai, mỗi khi cần tìm lại khoảnh khắc trọng đại đó, bạn chỉ cần mở đúng chiếc kẹp sách là thấy ngay.',
    diagram: `Sự khác biệt giữa Branch và Tag:
Nhánh main: Di chuyển liên tục khi có commit mới!
C1 ──► C2 ──► C3 ──► C4 (HEAD -> main)
        ▲
        └── [Tag: v1.0.0] (Đứng yên mãi mãi tại C2!)`,
    example:
      'Sau 3 tháng miệt mài lập trình, đội ngũ kỹ thuật quyết định đóng gói phát hành phiên bản đầu tiên của ứng dụng di động. Trưởng nhóm kiểm tra toàn bộ các bài test trên nhánh main đều chuyển màu xanh lá. Trưởng nhóm mở terminal và gõ câu lệnh: `git tag v1.0.0`. Một thẻ đánh dấu phiên bản được gắn ngay tại commit hiện tại. Trưởng nhóm đẩy thẻ lên máy chủ GitHub bằng lệnh `git push origin v1.0.0`. Trên giao diện GitHub, một mục Release mới xuất hiện với mã nguồn của phiên bản v1.0.0 sẵn sàng cho người dùng tải về.',
    commands: [
      'git tag',
      'git tag <tên-thẻ>',
      'git tag <tên-thẻ> <commit-hash>',
      'git push origin <tên-thẻ>',
      'git push origin --tags',
      'git tag -d <tên-thẻ>',
    ],
    explanation:
      '- `git tag`: Liệt kê danh sách toàn bộ các tag đang có trong kho lưu trữ theo thứ tự bảng chữ cái.\n- `git tag <tên>`: Tạo một thẻ nhẹ (Lightweight tag) tại commit HEAD hiện tại.\n- `git tag <tên> <hash>`: Đánh dấu thẻ cho một commit cụ thể trong quá khứ.\n- `git push origin <tên>`: Đẩy thẻ chỉ định lên máy chủ từ xa GitHub (mặc định git push không đẩy tag).\n- `git push origin --tags`: Đẩy đồng loạt toàn bộ các tag cục bộ lên máy chủ.\n- `git tag -d <tên>`: Xóa một thẻ trên máy tính cá nhân.',
    mistakes: [
      'Nghĩ rằng git push thông thường sẽ tự động đẩy tag: Git cố tình không đẩy tag khi gõ `git push`, bạn phải đẩy tường minh bằng tên tag hoặc cờ `--tags`.',
      'Nhầm lẫn giữa tag và branch: Cố gắng chuyển sang tag và commit tiếp (sẽ rơi vào trạng thái Detached HEAD).',
      'Đặt tên tag lộn xộn không tuân theo quy chuẩn Semantic Versioning (ví dụ đặt tag: `ban-moi`, `chuan-roi`).',
    ],
    labSteps: [
      'Liệt kê các tag hiện có bằng `git tag`.',
      'Tạo một thẻ phiên bản `v0.1.0` tại commit hiện tại bằng `git tag v0.1.0`.',
      'Kiểm tra lại danh sách tag để thấy `v0.1.0` xuất hiện.',
      'Thử xóa thẻ bằng lệnh `git tag -d v0.1.0` và kiểm tra lại.',
    ],
    hint: 'Nhớ rằng lệnh `git push` thông thường sẽ KHÔNG tự động đẩy tag lên server, bạn phải dùng `git push origin <tên-tag>`.',
    validation: 'Tạo, kiểm tra và quản lý thành công các thẻ phiên bản bằng git tag.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh đánh dấu mốc git tag.',
    challenge: 'Tại sao việc gõ `git checkout v1.0.0` lại đưa con trỏ của bạn vào trạng thái "Detached HEAD"?',
    summary: [
      '`git tag` đánh dấu các cột mốc phiên bản quan trọng trong lịch sử dự án.',
      'Tag là con trỏ tĩnh bất biến gắn chặt vào commit, không di chuyển như branch.',
      'Cần dùng `git push origin <tag-name>` hoặc `git push origin --tags` để xuất bản thẻ lên remote.',
    ],
    quiz: {
      id: 'quiz-05-18-git-tag',
      title: 'Trắc nghiệm: git tag cơ bản',
      questions: [
        {
          id: 'q1',
          question: 'Điểm khác biệt căn bản nhất giữa một con trỏ nhánh (Branch) và một con trỏ thẻ (Tag) là gì?',
          type: 'single',
          options: [
            { text: 'Nhánh tự động di chuyển tiến lên khi có commit mới, còn Tag đứng yên vĩnh viễn tại commit được gắn', correct: true },
            { text: 'Tag chỉ dùng được trên máy chủ GitHub, còn nhánh chỉ dùng trên máy cá nhân', correct: false },
            { text: 'Tag tự động xóa sau 30 ngày, còn nhánh tồn tại mãi mãi', correct: false },
            { text: 'Hai khái niệm này hoàn toàn giống hệt nhau không khác gì', correct: false },
          ],
          explanation:
            'Branch là con trỏ động di chuyển theo commit mới; Tag là con trỏ tĩnh cố định đóng vai trò mốc tham chiếu.',
        },
        {
          id: 'q2',
          question: 'Khi bạn chạy câu lệnh `git push origin main`, các thẻ Tag mới tạo ở máy cục bộ có được tự động đẩy lên GitHub không?',
          type: 'single',
          options: [
            { text: 'Không, theo mặc định Git không tự động đẩy tag lên server khi push nhánh', correct: true },
            { text: 'Có, toàn bộ tag luôn được đẩy lên cùng lúc', correct: false },
            { text: 'Chỉ đẩy lên nếu tag có chứa chữ "release"', correct: false },
            { text: 'Chỉ đẩy lên vào ngày cuối tuần', correct: false },
          ],
          explanation:
            'Git bảo vệ tag; bạn phải chỉ định rõ `git push origin <tag>` hoặc `git push origin --tags` để đẩy lên server.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây dùng để đẩy đồng loạt TẤT CẢ các thẻ tag cục bộ lên máy chủ từ xa?',
          type: 'single',
          options: [
            { text: 'git push origin --tags', correct: true },
            { text: 'git push --all-tags-force', correct: false },
            { text: 'git tag --push-all', correct: false },
            { text: 'git upload tags', correct: false },
          ],
          explanation:
            '`git push origin --tags` đẩy toàn bộ các thẻ tag chưa có trên server lên kho lưu trữ từ xa.',
        },
        {
          id: 'q4',
          question: 'Lệnh nào dùng để xóa một thẻ tag có tên `v1.0.0` ngay trên máy tính cá nhân của bạn?',
          type: 'single',
          options: [
            { text: 'git tag -d v1.0.0', correct: true },
            { text: 'git tag --remove v1.0.0', correct: false },
            { text: 'git drop tag v1.0.0', correct: false },
            { text: 'git delete v1.0.0', correct: false },
          ],
          explanation:
            '`git tag -d <tên-thẻ>` (hoặc `--delete`) xóa con trỏ thẻ chỉ định trên máy cục bộ.',
        },
      ],
    },
  },
  {
    id: '19-annotated-tag',
    moduleId: '05-advanced-git',
    title: 'Annotated Tag',
    duration: 25,
    xp: 80,
    keywords: ['annotated tag', 'the chu giai', 'git tag -a', 'gpg sign tag', 'semantic release tag', 'full tag object'],
    prerequisites: ['18-git-tag'],
    objectives: [
      'Phân biệt rõ ràng giữa Lightweight Tag (thẻ nhẹ) và Annotated Tag (thẻ chú giải đầy đủ).',
      'Tạo thẻ Annotated Tag chứa đầy đủ tên tác giả, email, ngày giờ và thông điệp phát hành bằng cờ `-a`.',
      'Kiểm tra thông tin chi tiết của một thẻ chú giải bằng câu lệnh `git show`.',
      'Hiểu rõ vì sao các bản phát hành sản phẩm chính thức (Production Releases) luôn bắt buộc dùng Annotated Tag.',
    ],
    definition:
      'Annotated Tag (Thẻ chú giải) là một đối tượng hoàn chỉnh độc lập trong cơ sở dữ liệu của Git (bên cạnh blob, tree và commit). Không giống như Lightweight Tag chỉ đơn thuần là một con trỏ bí danh lưu mã commit hash, Annotated Tag được lưu trữ với đầy đủ siêu dữ liệu (metadata): tên người gắn thẻ, email, thời gian tạo thẻ, thông điệp phát hành (Release Note) chi tiết và có thể được ký số bảo mật bằng khóa GPG (GNU Privacy Guard).',
    why:
      'Khi phát hành một phiên bản phần mềm ra thị trường thương mại, tính minh bạch và khả năng xác thực nguồn gốc là yêu cầu pháp lý và an ninh tối quan trọng. Annotated Tag cung cấp chữ ký chứng nhận không thể chối cãi: ai là người đã phê duyệt phát hành phiên bản này, vào thời khắc nào và bản phát hành đó bao gồm những tính năng gì. Mọi công cụ CI/CD hiện đại như GitHub Releases đều sử dụng Annotated Tag để tự động tạo trang phát hành chuyên nghiệp.',
    mentalModel:
      'Nếu Lightweight Tag giống như một chiếc mẩu giấy ghi chú Post-it nhỏ bạn dán tạm lên bìa tài liệu với dòng chữ "v1.0", thì Annotated Tag giống như một tấm Bằng chứng nhận có công chứng của Nhà nước. Trên tấm bằng đó có in tên người có thẩm quyền ký duyệt, con dấu đỏ pháp lý, ngày tháng cấp bằng và một bản tuyên cáo long trọng ghi rõ nội dung của chứng chỉ. Không ai có thể nghi ngờ tính hợp pháp của tấm bằng đó.',
    diagram: `Cấu trúc đối tượng của Annotated Tag trong Git:
┌────────────────────────────────────────────────────────┐
│ Tag Object (Mã băm SHA-1 riêng biệt)                   │
│ Tagger: Nguyen Van A <a@company.com>                   │
│ Date:   Wed Sep 30 14:00:00 2026                       │
│ Message: Release version 2.0.0 with AI chatbot engine  │
│ GPG Signature: (Chữ ký số chống giả mạo nếu có)        │
│ Object trỏ tới: Commit C10 (hash 8f9e0a)              │
└────────────────────────────────────────────────────────┘`,
    example:
      'Trước thời điểm đưa cổng thanh toán quốc tế lên hoạt động chính thức trên môi trường production, kỹ sư trưởng An tạo một thẻ chú giải long trọng bằng lệnh: `git tag -a v2.0.0 -m "Release v2.0.0: Full integration with Stripe and PayPal with PCI-DSS compliance"`. Khi một kỹ sư bảo mật khác trong nhóm muốn kiểm tra thẩm định thông tin của bản phát hành quan trọng này, kỹ sư đó gõ câu lệnh: `git show v2.0.0`. Toàn bộ thông tin định danh tác giả An, địa chỉ email, ngày giờ ký duyệt chính xác đến từng giây và bản thông cáo phát hành tính năng hiển thị rõ ràng, tạo niềm tin và sự bảo đảm tuyệt đối cho toàn bộ ban giám đốc dự án.',
    commands: [
      'git tag -a <tên-thẻ> -m "<thông-điệp-phát-hành>"',
      'git tag -s <tên-thẻ> -m "<thông-điệp>"',
      'git show <tên-thẻ>',
    ],
    explanation:
      '- `git tag -a <tên> -m "<msg>"`: Tạo thẻ chú giải với thông điệp phát hành trực tiếp trên dòng lệnh.\n- `git tag -s <tên> -m "<msg>"`: Tạo thẻ chú giải có ký số bảo mật bằng khóa GPG bí mật của lập trình viên.\n- `git show <tên-thẻ>`: Hiển thị toàn bộ siêu dữ liệu của thẻ cùng với diff của commit mà thẻ đang trỏ tới.',
    mistakes: [
      'Dùng thẻ nhẹ Lightweight tag cho các bản phát hành chính thức: Khiến thiếu thông tin tác giả và mô tả release.',
      'Quên cờ `-m` khi gõ `git tag -a`: Khiến Git tự động bật trình soạn thảo văn bản mặc định (Vim/Nano).',
      'Nghĩ rằng Annotated tag làm chậm dự án: Tag chỉ là một đối tượng nhỏ vài trăm bytes trong thư mục `.git`.',
    ],
    labSteps: [
      'Tạo một Annotated tag với thông điệp đầy đủ bằng `git tag -a v1.0.0 -m "Bản phát hành chính thức v1.0.0"`.',
      'Chạy lệnh `git show v1.0.0` và quan sát thông tin Tagger, Date và Message.',
      'So sánh kết quả hiển thị của `git show` giữa thẻ nhẹ và thẻ chú giải.',
      'Đẩy thẻ lên GitHub bằng `git push origin v1.0.0`.',
    ],
    hint: 'Luôn luôn sử dụng cờ `-a` (Annotated) cho các mốc phát hành chính thức trong môi trường doanh nghiệp.',
    validation: 'Tạo thành công Annotated tag có đầy đủ metadata và kiểm tra chi tiết bằng git show.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về thẻ chú giải Annotated Tag.',
    challenge: 'Nêu sự khác biệt sâu bên trong thư mục `.git/refs/tags/` và `.git/objects/` giữa một Lightweight tag và một Annotated tag.',
    summary: [
      'Annotated Tag là một đối tượng Git thực thụ chứa đầy đủ metadata và thông điệp.',
      'Cung cấp thông tin tác giả, thời gian tạo và hỗ trợ chữ ký số mã hóa GPG.',
      'Là chuẩn mực bắt buộc cho mọi bản phát hành phần mềm chính thức trong doanh nghiệp.',
    ],
    quiz: {
      id: 'quiz-05-19-annotated-tag',
      title: 'Trắc nghiệm: Annotated Tag',
      questions: [
        {
          id: 'q1',
          question: 'Cờ tùy chọn nào trong lệnh `git tag` được sử dụng để tạo một thẻ chú giải Annotated Tag?',
          type: 'single',
          options: [
            { text: '-a (viết tắt của --annotate)', correct: true },
            { text: '-l (viết tắt của --lightweight)', correct: false },
            { text: '-m (chỉ có duy nhất -m là đủ)', correct: false },
            { text: '-f (viết tắt của --full)', correct: false },
          ],
          explanation:
            'Cờ `-a` chỉ thị cho Git tạo một đối tượng tag đầy đủ (Annotated tag) trong cơ sở dữ liệu.',
        },
        {
          id: 'q2',
          question: 'Thông tin nào sau đây ĐƯỢC LƯU TRỮ bên trong một Annotated Tag mà Lightweight Tag KHÔNG CÓ?',
          type: 'single',
          options: [
            { text: 'Tên người tạo thẻ, email, thời gian tạo thẻ, thông điệp phát hành và chữ ký số GPG', correct: true },
            { text: 'Mã commit hash mà thẻ trỏ tới', correct: false },
            { text: 'Tên của thẻ tag', correct: false },
            { text: 'Không có thông tin nào khác biệt', correct: false },
          ],
          explanation:
            'Lightweight tag chỉ là một con trỏ lưu mã hash; Annotated tag là đối tượng lưu đầy đủ metadata tác giả và thông điệp.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây dùng để xem chi tiết toàn bộ siêu dữ liệu (metadata) và thông điệp của một Annotated Tag?',
          type: 'single',
          options: [
            { text: 'git show <tên-thẻ>', correct: true },
            { text: 'git tag --info <tên-thẻ>', correct: false },
            { text: 'git view <tên-thẻ>', correct: false },
            { text: 'git inspect-tag <tên-thẻ>', correct: false },
          ],
          explanation:
            '`git show <tag-name>` in ra thông tin chi tiết về Tagger, Date, Message và diff của commit được gắn thẻ.',
        },
        {
          id: 'q4',
          question: 'Tại sao trong các dự án thương mại, lập trình viên được yêu cầu PHẢI sử dụng Annotated Tag cho các bản phát hành Production?',
          type: 'single',
          options: [
            { text: 'Để đảm bảo tính xác thực, lưu vết kiểm toán rõ ràng về người phê duyệt và thời điểm phát hành', correct: true },
            { text: 'Vì Lightweight tag sẽ tự động bị xóa sau 24 giờ', correct: false },
            { text: 'Vì nếu không dùng cờ -a thì mã nguồn sẽ bị lỗi biên dịch', correct: false },
            { text: 'Vì GitHub không cho phép hiển thị Lightweight tag', correct: false },
          ],
          explanation:
            'Tính toàn vẹn và trách nhiệm giải trình của bản phát hành được đảm bảo nhờ siêu dữ liệu của Annotated tag.',
        },
      ],
    },
  },
  {
    id: '20-git-bisect',
    moduleId: '05-advanced-git',
    title: 'git bisect',
    duration: 35,
    xp: 120,
    keywords: ['git bisect', 'binary search git', 'tim loi nhi phan', 'debug commit', 'truy tim bug', 'bisect automation'],
    prerequisites: ['18-git-tag'],
    objectives: [
      'Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.',
      'Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.',
      'Hiểu rõ hiệu quả toán học: Tìm ra commit lỗi trong 1000 commit chỉ với khoảng 10 lần kiểm tra (O(log N)).',
      'Tự động hóa hoàn toàn quá trình tìm lỗi bằng câu lệnh `git bisect run <script-test>`.',
    ],
    definition:
      '`git bisect` là công cụ thám tử điều tra lỗi tự động đỉnh cao trong Git, hoạt động dựa trên thuật toán tìm kiếm nhị phân (Binary Search). Khi bạn biết mã nguồn hiện tại đang bị lỗi (bad) nhưng chắc chắn một phiên bản trong quá khứ từng chạy tốt (good), `git bisect` sẽ tự động chia đôi lịch sử, nhảy tới commit ở chính giữa để bạn kiểm tra, rồi tiếp tục thu hẹp phạm vi tìm kiếm theo cấp số nhân cho đến khi chỉ mặt điểm tên chính xác commit đầu tiên đã đưa lỗi vào hệ thống.',
    why:
      'Trong các dự án phát triển lâu năm với hàng ngàn commit, một ngày đẹp trời người dùng báo một chức năng bị lỗi mà không ai biết lỗi xuất hiện từ khi nào. Nếu bạn phải kiểm tra thủ công từng commit một (Linear Search), bạn sẽ mất nhiều ngày làm việc mệt mỏi. Với `git bisect`, dù dự án có 1.024 commit, thuật toán nhị phân giúp bạn tìm ra chính xác commit gây lỗi chỉ sau đúng 10 lần chạy thử (vì $2^{10} = 1024$), tiết kiệm 99% thời gian điều tra.',
    mentalModel:
      'Hãy hình dung trò chơi đoán số từ 1 đến 100. Người quản trò nghĩ ra một số bí mật (commit gây lỗi). Bạn không đoán lần lượt 1, 2, 3, 4 vì quá lâu. Bạn đoán ngay số 50. Người quản trò nói: "Lỗi xuất hiện sau số 50". Bạn lập tức loại bỏ 50 số đầu và đoán tiếp số 75. Người quản trò nói: "Lỗi xuất hiện trước số 75". Bạn thu hẹp phạm vi xuống còn giữa 50 và 75. Chỉ sau vài câu hỏi chia đôi khoảng cách, bạn chỉ ra chính xác con số bí mật.',
    diagram: `Quy trình tìm kiếm nhị phân của git bisect:
Mốc Good: C1 (Chạy tốt)                  Mốc Bad: C8 (Bị lỗi!)
Phạm vi ban đầu: C1 ──► C2 ──► C3 ──► C4 ──► C5 ──► C6 ──► C7 ──► C8

Bước 1: Git nhảy tới C4 ở giữa -> Bạn test thấy Good!
Phạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6 ──► C7 ──► C8(Bad)

Bước 2: Git nhảy tới C6 ở giữa -> Bạn test thấy Bad!
Phạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6(Bad)

Bước 3: Git nhảy tới C5 -> Test thấy Bad!
KẾT LUẬN: C5 chính là commit đầu tiên gây ra lỗi!`,
    example:
      'Chức năng xuất hóa đơn PDF bị hỏng trên môi trường production. Kỹ sư Bách biết rằng ở phiên bản phát hành `v1.2.0` cách đây 500 commit thì chức năng này vẫn chạy bình thường. Bách khởi động chế độ thám tử: gõ `git bisect start`, gõ `git bisect bad` (commit hiện tại lỗi), và `git bisect good v1.2.0`. Git lập tức thông báo: "Bisecting: 250 revisions left to test after this (roughly 8 steps)". Git checkout ra commit ở giữa. Bách chạy thử lệnh in PDF, nếu hỏng gõ `git bisect bad`, nếu chạy được gõ `git bisect good`. Đúng 8 bước sau, Git in ra màn hình: "commit 8a9b0c is the first bad commit" kèm tên tác giả và diff dòng code gây lỗi.',
    commands: [
      'git bisect start',
      'git bisect bad',
      'git bisect good <commit-hoặc-tag>',
      'git bisect reset',
      'git bisect run <file-chay-kiem-thu>',
    ],
    explanation:
      '- `git bisect start`: Khởi động phiên làm việc tìm kiếm nhị phân của bisect.\n- `git bisect bad`: Đánh dấu commit hiện tại là commit bị lỗi.\n- `git bisect good <hash/tag>`: Đánh dấu commit trong quá khứ là mốc hoạt động bình thường không có lỗi.\n- `git bisect reset`: Kết thúc phiên điều tra và đưa bạn quay trở về nhánh ban đầu.\n- `git bisect run <script>`: Tự động hóa 100%: Git sẽ tự động chạy file script kiểm thử và tự đánh dấu good/bad.',
    mistakes: [
      'Quên gõ `git bisect reset` sau khi tìm thấy lỗi: Khiến bạn bị mắc kẹt ở trạng thái Detached HEAD trên commit lỗi.',
      'Đánh dấu nhầm commit good thành bad hoặc ngược lại: Làm sai lệch thuật toán tìm kiếm nhị phân dẫn đến kết luận sai.',
      'Kiểm tra mã nguồn mà chưa build hoặc chưa cài đặt dependencies khiến bài test báo lỗi giả.',
    ],
    labSteps: [
      'Khởi động chế độ bisect bằng `git bisect start`.',
      'Đánh dấu commit hiện tại là lỗi bằng `git bisect bad`.',
      'Đánh dấu commit đầu tiên trong bài tập là tốt bằng `git bisect good HEAD~6`.',
      'Quan sát Git tự động checkout về commit ở giữa.',
      'Chạy thử nghiệm, gõ `git bisect good` hoặc `git bisect bad` tương ứng cho đến khi Git thông báo thủ phạm.',
      'Gõ `git bisect reset` để hoàn tất bài tập.',
    ],
    hint: 'Luôn nhớ chạy `git bisect reset` ngay sau khi đã xác định được commit gây lỗi để trở về nhánh làm việc.',
    validation: 'Sử dụng thành thạo quy trình git bisect để tìm ra chính xác commit gây lỗi trong chuỗi lịch sử.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ thám tử git bisect.',
    challenge: 'Làm thế nào để viết một script kiểm thử tự động trả về mã thoát exit code 0 (good) hoặc exit code khác 0 (bad) để chạy với `git bisect run`?',
    summary: [
      '`git bisect` sử dụng thuật toán tìm kiếm nhị phân để truy tìm commit gây lỗi với độ phức tạp O(log N).',
      'Quy trình gồm: `start` -> khai báo `bad` & `good` -> kiểm thử -> lặp lại -> `reset`.',
      'Có thể tự động hóa 100% bằng câu lệnh `git bisect run <script>`.',
    ],
    quiz: {
      id: 'quiz-05-20-git-bisect',
      title: 'Trắc nghiệm: git bisect',
      questions: [
        {
          id: 'q1',
          question: 'Thuật toán tìm kiếm mà câu lệnh `git bisect` áp dụng để truy tìm commit gây lỗi là thuật toán nào?',
          type: 'single',
          options: [
            { text: 'Tìm kiếm nhị phân (Binary Search) chia đôi phạm vi sau mỗi bước kiểm tra', correct: true },
            { text: 'Tìm kiếm tuyến tính tuần tự từ đầu đến cuối', correct: false },
            { text: 'Tìm kiếm ngẫu nhiên theo xác suất', correct: false },
            { text: 'Tìm kiếm theo độ dài của thông điệp commit', correct: false },
          ],
          explanation:
            '`git bisect` chia đôi lịch sử theo thuật toán Binary Search, mang lại hiệu quả cực cao với độ phức tạp O(log N).',
        },
        {
          id: 'q2',
          question: 'Giả sử khoảng cách giữa commit tốt (good) và commit lỗi (bad) là 1.000 commit, bạn cần tối đa khoảng bao nhiêu lần kiểm tra để tìm ra thủ phạm?',
          type: 'single',
          options: [
            { text: 'Khoảng 10 lần kiểm tra (vì 2^10 = 1024)', correct: true },
            { text: 'Khoảng 500 lần kiểm tra', correct: false },
            { text: 'Khoảng 1.000 lần kiểm tra', correct: false },
            { text: 'Chỉ cần đúng 1 lần duy nhất', correct: false },
          ],
          explanation:
            'Nhờ tính chất lũy thừa cơ số 2 của thuật toán nhị phân, 1.000 commit chỉ cần tối đa khoảng 10 bước kiểm thử.',
        },
        {
          id: 'q3',
          question: 'Sau khi đã tìm ra chính xác commit gây lỗi bằng `git bisect`, câu lệnh BẮT BUỘC bạn phải chạy để quay về nhánh làm việc ban đầu là gì?',
          type: 'single',
          options: [
            { text: 'git bisect reset', correct: true },
            { text: 'git bisect stop', correct: false },
            { text: 'git bisect finish', correct: false },
            { text: 'git checkout main --force', correct: false },
          ],
          explanation:
            '`git bisect reset` dọn dẹp các con trỏ bisect tạm thời và đưa HEAD quay trở về nhánh ban đầu của bạn.',
        },
        {
          id: 'q4',
          question: 'Tính năng tự động hóa tối thượng `git bisect run <script>` xác định commit là Good hay Bad dựa trên tiêu chí nào của script?',
          type: 'single',
          options: [
            { text: 'Mã thoát (Exit code) của script: mã 0 là Good, mã khác 0 (từ 1 đến 127) là Bad', correct: true },
            { text: 'Dung lượng của tệp script tính bằng kilobyte', correct: false },
            { text: 'Thời gian chạy script tính bằng mili-giây', correct: false },
            { text: 'Màu sắc hiển thị trên màn hình terminal', correct: false },
          ],
          explanation:
            'Theo chuẩn POSIX, exit code 0 biểu thị thành công (Good), các mã lỗi khác 0 biểu thị thất bại (Bad).',
        },
      ],
    },
  },
  {
    id: '21-git-worktree',
    moduleId: '05-advanced-git',
    title: 'git worktree',
    duration: 30,
    xp: 90,
    keywords: ['git worktree', 'multiple working trees', 'da thu muc lam viec', 'chuyen nhanh khong stash', 'parallel branches'],
    prerequisites: ['18-git-tag'],
    objectives: [
      'Hiểu rõ sự đột phá của tính năng `git worktree`: làm việc đồng thời trên nhiều nhánh ở nhiều thư mục khác nhau.',
      'Khắc phục triệt để hạn chế của quy trình truyền thống: không cần phải stash hay commit dở để chuyển nhánh.',
      'Sử dụng `git worktree add` để mở một không gian làm việc song song chỉ trong vài giây.',
      'Quản lý danh sách và dọn dẹp an toàn các worktree bằng `git worktree list` và `git worktree remove`.',
    ],
    definition:
      '`git worktree` là tính năng quản lý đa thư mục làm việc mạnh mẽ trong Git, cho phép một kho lưu trữ duy nhất (cùng chia sẻ chung một thư mục `.git`) có thể liên kết và mở đồng thời nhiều thư mục làm việc (Working Trees) độc lập tại các đường dẫn khác nhau trên ổ đĩa. Mỗi thư mục worktree được gắn với một nhánh riêng biệt, cho phép bạn mở nhiều cửa sổ lập trình song song mà không cần clone lại dự án.',
    why:
      'Quy trình làm việc truyền thống rất bất tiện: bạn đang chạy dev server trên nhánh A với hàng trăm file đang sửa dở, có việc gấp cần sang nhánh B bạn phải tắt server, gõ `git stash`, chuyển nhánh, cài lại dependencies. Với `git worktree`, bạn chỉ cần mở thêm một thư mục bên cạnh: nhánh B chạy độc lập ở thư mục B, nhánh A vẫn chạy ở thư mục A với dev server đang chạy mượt mà. Không cần stash, không sợ mất code, tăng năng suất làm việc lên gấp bội.',
    mentalModel:
      'Hãy hình dung bạn là một kiến trúc sư đang thiết kế một tòa nhà. Thay vì chỉ có một chiếc bàn vẽ duy nhất mà mỗi lần đổi bản vẽ bạn phải cuộn bản vẽ cũ cất đi rồi trải bản vẽ mới ra bàn, bạn sở hữu một căn phòng rộng thênh thang với nhiều chiếc bàn vẽ đặt cạnh nhau (`git worktree`). Bàn số 1 bạn đang vẽ mặt tiền tòa nhà (nhánh feature), bàn số 2 bạn đang mở bản vẽ hệ thống cấp thoát nước (nhánh hotfix). Bạn có thể bước qua bước lại giữa hai chiếc bàn bất cứ lúc nào.',
    diagram: `Kiến trúc chia sẻ một kho chứa .git của Worktree:
                   ┌──► Thư mục chính: /project (nhánh: main)
Kho chứa gốc:     │
/project/.git ─────┼──► Thư mục phụ 1: /project-hotfix (nhánh: hotfix-login)
(Chung dữ liệu!)   │
                   └──► Thư mục phụ 2: /project-feature (nhánh: feat-ai)`,
    example:
      'Lập trình viên Cường đang lập trình tính năng thanh toán trên nhánh `feat/checkout` ở thư mục `my-app`. Ứng dụng đang biên dịch dở dang thì đồng nghiệp nhờ Cường review gấp nhánh `review-pr-45`. Thay vì stash làm gián đoạn tiến trình biên dịch, Cường gõ câu lệnh: `git worktree add ../my-app-pr review-pr-45`. Ngay lập tức, thư mục `my-app-pr` xuất hiện bên cạnh với đầy đủ mã nguồn của nhánh đó. Cường mở cửa sổ VS Code thứ hai tại thư mục mới, chạy thử và review xong cho bạn, rồi xóa thư mục đó bằng `git worktree remove ../my-app-pr`. Không gian làm việc chính của Cường hoàn toàn không bị ảnh hưởng.',
    commands: [
      'git worktree add <đường-dẫn-thư-mục> <tên-nhánh>',
      'git worktree add -b <nhánh-mới> <đường-dẫn>',
      'git worktree list',
      'git worktree remove <đường-dẫn-thư-mục>',
      'git worktree prune',
    ],
    explanation:
      '- `git worktree add <path> <branch>`: Mở một thư mục làm việc mới tại đường dẫn chỉ định liên kết với một nhánh có sẵn.\n- `git worktree add -b <new-branch> <path>`: Tạo luôn một nhánh mới và mở worktree tại thư mục chỉ định.\n- `git worktree list`: Liệt kê danh sách tất cả các thư mục worktree đang hoạt động kèm tên nhánh tương ứng.\n- `git worktree remove <path>`: Dọn dẹp và xóa bỏ an toàn một thư mục worktree sau khi sử dụng xong.\n- `git worktree prune`: Dọn dẹp thông tin rác của các worktree đã bị xóa thủ công trên đĩa.',
    mistakes: [
      'Cố gắng mở hai worktree trên cùng một nhánh: Git sẽ chặn lại ngay lập tức để ngăn ngừa xung đột dữ liệu.',
      'Tự ý dùng lệnh xóa thư mục của hệ điều hành (rmdir / rm -rf) thay vì dùng `git worktree remove`: Dẫn đến dữ liệu quản trị trong `.git/worktrees` bị thừa thãi (cần chạy `git worktree prune` để dọn).',
      'Nhầm lẫn giữa worktree và clone mới: Worktree dùng chung cơ sở dữ liệu `.git`, tiết kiệm dung lượng ổ cứng gấp nhiều lần.',
    ],
    labSteps: [
      'Liệt kê danh sách worktree hiện tại bằng `git worktree list`.',
      'Tạo một worktree mới cho nhánh `demo-worktree` bằng lệnh `git worktree add ../temp-worktree -b demo-worktree`.',
      'Chạy `git worktree list` và quan sát hai đường dẫn thư mục cùng tồn tại.',
      'Dọn dẹp bằng lệnh `git worktree remove ../temp-worktree`.',
    ],
    hint: 'Mỗi nhánh chỉ được phép gắn với duy nhất một thư mục worktree tại một thời điểm.',
    validation: 'Tạo, quản lý và dọn dẹp thành công các không gian làm việc song song bằng git worktree.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng đa thư mục git worktree.',
    challenge: 'So sánh chi tiết về dung lượng ổ đĩa và tốc độ tạo lập giữa việc dùng `git worktree add` và `git clone` lại dự án sang thư mục mới.',
    summary: [
      '`git worktree` cho phép mở nhiều thư mục làm việc đồng thời trên nhiều nhánh khác nhau.',
      'Dùng chung một cơ sở dữ liệu `.git`, cực kỳ nhẹ và không tốn dung lượng ổ đĩa.',
      'Giải quyết dứt điểm nhu cầu chuyển nhánh khẩn cấp mà không cần stash hay ngắt dev server.',
    ],
    quiz: {
      id: 'quiz-05-21-git-worktree',
      title: 'Trắc nghiệm: git worktree',
      questions: [
        {
          id: 'q1',
          question: 'Lợi ích đột phá lớn nhất của `git worktree` so with việc chuyển nhánh (`git switch`) thông thường là gì?',
          type: 'single',
          options: [
            { text: 'Cho phép bạn mở và chỉnh sửa song song hai hay nhiều nhánh ở các thư mục riêng biệt mà không cần phải stash hay tắt server', correct: true },
            { text: 'Tự động tăng gấp đôi tốc độ mạng Internet khi push code', correct: false },
            { text: 'Không cần cài đặt Git trên máy tính vẫn dùng được', correct: false },
            { text: 'Tự động chuyển đổi mã nguồn sang ngôn ngữ máy tính khác', correct: false },
          ],
          explanation:
            'Worktree cho phép đa nhiệm thực sự: mỗi nhánh có một thư mục riêng biệt trên đĩa cứng cùng chia sẻ chung một kho `.git`.',
        },
        {
          id: 'q2',
          question: 'Điều gì sẽ xảy ra nếu bạn cố gắng dùng `git worktree add` để mở một nhánh đang được mở ở một worktree khác?',
          type: 'single',
          options: [
            { text: 'Git sẽ từ chối và báo lỗi vì một nhánh không được phép checkout đồng thời ở hai nơi để tránh xung đột', correct: true },
            { text: 'Git tự động xóa thư mục làm việc cũ', correct: false },
            { text: 'Git tự động gộp hai thư mục làm một', correct: false },
            { text: 'Máy tính sẽ bị khóa tài khoản', correct: false },
          ],
          explanation:
            'Git ngăn chặn hai worktree cùng trỏ vào một nhánh để bảo vệ tính toàn vẹn của con trỏ nhánh và reflog.',
        },
        {
          id: 'q3',
          question: 'Lệnh nào sau đây dùng để xem danh sách tất cả các thư mục worktree đang hoạt động trong dự án?',
          type: 'single',
          options: [
            { text: 'git worktree list', correct: true },
            { text: 'git worktree status', correct: false },
            { text: 'git worktree show-all', correct: false },
            { text: 'git list --worktrees', correct: false },
          ],
          explanation:
            '`git worktree list` liệt kê đường dẫn tuyệt đối của từng worktree kèm commit hash và nhánh đang gắn.',
        },
        {
          id: 'q4',
          question: 'Lệnh chuẩn mực để dọn dẹp và xóa bỏ một thư mục worktree sau khi hoàn thành nhiệm vụ là gì?',
          type: 'single',
          options: [
            { text: 'git worktree remove <đường-dẫn-thư-mục>', correct: true },
            { text: 'git worktree drop <tên-nhánh>', correct: false },
            { text: 'git worktree clean --all', correct: false },
            { text: 'git destroy worktree <đường-dẫn>', correct: false },
          ],
          explanation:
            '`git worktree remove <path>` xóa tệp trên đĩa và dọn dẹp siêu dữ liệu quản trị trong thư mục `.git/worktrees`.',
        },
      ],
    },
  },
  {
    id: '22-advanced-git-challenge',
    moduleId: '05-advanced-git',
    title: 'Advanced Git Challenge',
    duration: 45,
    xp: 200,
    keywords: ['advanced challenge', 'git master', 'tong hop level 5', 'reflog rebase bisect', 'thu thach chuyen gia'],
    prerequisites: ['17-rebase-conflict', '20-git-bisect'],
    objectives: [
      'Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.',
      'Cứu hộ thành công một commit bị mất bằng reflog sau một thao tác phá hủy mô phỏng.',
      'Biên tập dọn dẹp chuỗi commit bằng Interactive Rebase (squash, fixup, reword).',
      'Sử dụng bisect để truy tìm một commit gây lỗi ngầm và gắn thẻ Annotated Tag đánh dấu phiên bản hoàn thiện.',
    ],
    definition:
      'Advanced Git Challenge (Thử thách Git nâng cao) là bài kiểm tra sát hạch toàn diện kết thúc Level 5: Advanced Git. Bạn sẽ được đặt vào vai trò một kỹ sư cứu hộ mã nguồn cao cấp (Git Rescue Specialist) trong một dự án gặp sự cố nghiêm trọng: lịch sử bị rối loạn, một commit quan trọng bị xóa nhầm, một lỗi tiềm ẩn đang ẩn nấp trong hàng chục commit và mã nguồn cần được gọt giũa đóng gói chuẩn mực trước giờ phát hành.',
    why:
      'Vượt qua các bài học lý thuyết là bước đầu tiên, nhưng khả năng kết hợp nhịp nhàng giữa reflog, rebase, bisect và worktree dưới áp lực tình huống thực tế mới là thước đo chính xác năng lực của một chuyên gia Git thực thụ. Hoàn thành thử thách này khẳng định bạn đã bước vào hàng ngũ top 5% kỹ sư hiểu sâu và làm chủ hoàn toàn các cơ chế vận hành phức tạp nhất của Git.',
    mentalModel:
      'Hãy hình dung bạn là một bác sĩ phẫu thuật trưởng trong phòng cấp cứu đặc biệt của bệnh viện. Bệnh nhân (kho lưu trữ mã nguồn) đang ở trong tình trạng nguy kịch: một chi bị đứt rời cần nối lại (cứu commit bằng reflog), các vết thương đang bị viêm nhiễm cần phẫu thuật cắt lọc (rebase squash/drop), một độc tố ngầm đang phát tác cần xét nghiệm truy tìm nguồn gốc (git bisect) và sau khi chữa lành phải cấp giấy xuất viện chứng nhận sức khỏe hoàn hảo (Annotated Tag).',
    diagram: `Kịch bản 4 chặng của Advanced Git Challenge:
[Chặng 1: Reflog Rescue]      ──► Hồi sinh commit bị mất do reset hard
               │
               ▼
[Chặng 2: Interactive Rebase] ──► Dọn dẹp, squash và reword chuỗi commit
               │
               ▼
[Chặng 3: Git Bisect Hunt]    ──► Truy tìm commit bí mật đưa lỗi vào hệ thống
               │
               ▼
[Chặng 4: Annotated Tag]      ──► Đóng gói mốc phát hành an toàn v2.0.0!`,
    example:
      'Trong kịch bản thử thách chuyên gia, học viên nhận được thông báo khẩn cấp: nhánh tính năng `feature-ai` bị ai đó vô tình reset hard làm mất toàn bộ mã nguồn quan trọng. Học viên bình tĩnh mở `git reflog`, tìm thấy mã hash gốc và hồi sinh nhánh an toàn bằng lệnh `git branch`. Tiếp theo, học viên thực hiện `git rebase -i` gộp 6 commit vụn vặt thành 2 commit chuẩn mực theo chuẩn conventional. Tiếp đó, khi hệ thống kích hoạt kịch bản lỗi ngầm, học viên vận hành thành thạo `git bisect` qua 4 bước phân đoạn nhị phân để chỉ mặt điểm tên commit gây lỗi. Cuối cùng, học viên gắn thẻ `v2.0.0` với thông điệp chú giải đầy đủ và hoàn thành bài thi xuất sắc với điểm số tuyệt đối.',
    commands: [
      'git reflog',
      'git branch rescue-branch <commit-hash>',
      'git rebase -i HEAD~<n>',
      'git bisect start && git bisect bad && git bisect good <hash>',
      'git tag -a v2.0.0 -m "<thông-điệp-phát-hành>"',
    ],
    explanation:
      '- `git reflog & git branch`: Bộ đôi cứu hộ tái sinh commit bị mất vào nhánh mới an toàn.\n- `git rebase -i`: Tinh chỉnh, nén commit và viết lại thông điệp chuẩn mực.\n- `git bisect`: Chia đôi lịch sử để truy vết commit phát sinh lỗi.\n- `git tag -a`: Đóng dấu niêm phong cột mốc sản phẩm hoàn thiện.',
    mistakes: [
      'Mất bình tĩnh khi đối mặt với nhiều lỗi cùng lúc: Hãy giải quyết tuần tự từng chặng theo đúng quy trình.',
      'Quên chạy `git bisect reset` sau khi đã tìm ra commit gây lỗi.',
      'Dùng cờ `--force` mà không có lease gây mất dữ liệu mô phỏng của hệ thống.',
    ],
    labSteps: [
      'Khởi động kịch bản `advanced-git-master-challenge` trong phòng lab.',
      'Sử dụng `git reflog` để tìm và khôi phục commit bị mất.',
      'Chạy `git rebase -i` để sắp xếp lại các commit theo đúng yêu cầu đề bài.',
      'Thực hiện `git bisect` để tìm commit gây lỗi và ghi nhận mã hash.',
      'Tạo thẻ Annotated Tag `v2.0.0` và nộp bài kiểm tra.',
    ],
    hint: 'Bình tĩnh kiểm tra reflog trước tiên, mọi dữ liệu trong Git đều có thể cứu được nếu đã từng commit.',
    validation: 'Vượt qua 100% các tiêu chí sát hạch của bài thi thử thách Advanced Git Challenge.',
    quizPrompt: 'Hãy làm bài kiểm tra trắc nghiệm tổng kết toàn diện Level 5: Advanced Git.',
    challenge: 'Tự thiết lập một kịch bản mô phỏng tương tự trên máy tính cá nhân để thử thách bạn bè cùng học.',
    summary: [
      'Làm chủ trọn vẹn bộ công cụ chuyên gia: Reflog, Rebase, Bisect, Worktree và Tag.',
      'Khả năng cứu hộ và biên tập lịch sử là kỹ năng cốt lõi phân biệt kỹ sư cao cấp.',
      'Tự tin giải quyết mọi tình huống sự cố phức tạp nhất trong các dự án phần mềm quy mô lớn.',
    ],
    quiz: {
      id: 'quiz-05-22-advanced-git-challenge',
      title: 'Trắc nghiệm tổng kết: Master Advanced Git',
      questions: [
        {
          id: 'q1',
          question: 'Bộ công cụ nào sau đây đại diện cho sức mạnh cứu hộ và kiểm soát lịch sử tối cao của Git?',
          type: 'single',
          options: [
            { text: 'Reflog (cứu hộ), Interactive Rebase (biên tập), Bisect (tìm lỗi nhị phân), Worktree (đa nhiệm)', correct: true },
            { text: 'Chỉ cần duy nhất lệnh git commit là đủ', correct: false },
            { text: 'Các công cụ nén file như WinRAR và 7-Zip', correct: false },
            { text: 'Các phần mềm diệt virus trên máy tính', correct: false },
          ],
          explanation:
            'Bộ tứ Reflog, Interactive Rebase, Bisect và Worktree là đỉnh cao làm chủ Git của mọi kỹ sư chuyên nghiệp.',
        },
        {
          id: 'q2',
          question: 'Khi bạn cần hoàn tác một commit trên nhánh `main` chung mà không muốn làm hỏng lịch sử của đồng nghiệp, lệnh nào là lựa chọn duy nhất đúng?',
          type: 'single',
          options: [
            { text: 'git revert <commit-hash>', correct: true },
            { text: 'git reset --hard HEAD~1', correct: false },
            { text: 'git rebase -i HEAD~2', correct: false },
            { text: 'git push --force', correct: false },
          ],
          explanation:
            '`git revert` tạo commit đối nghịch mới mà không viết lại lịch sử, an toàn tuyệt đối cho nhánh dùng chung.',
        },
        {
          id: 'q3',
          question: 'Kỹ thuật nào giúp bạn tự động chèn bản sửa lỗi vào đúng một commit cũ sâu trong lịch sử mà không cần kéo thả thủ công?',
          type: 'single',
          options: [
            { text: 'git commit --fixup <hash> kết hợp với git rebase -i --autosquash', correct: true },
            { text: 'git merge --fast-forward', correct: false },
            { text: 'git cherry-pick --all', correct: false },
            { text: 'git reset --mixed', correct: false },
          ],
          explanation:
            'Cặp đôi `--fixup` và `--autosquash` tự động hóa hoàn toàn việc vá lỗi hồi tố vào commit cũ.',
        },
        {
          id: 'q4',
          question: 'Sau khi hoàn thành xuất sắc toàn bộ 22 bài học của Level 5, năng lực thực chiến của bạn được nâng lên tầm cao nào?',
          type: 'single',
          options: [
            { text: 'Làm chủ toàn bộ cỗ máy thời gian của Git, tự tin cứu hộ dữ liệu, tối ưu lịch sử và giải quyết xung đột cấp cao', correct: true },
            { text: 'Biết cách sửa chữa phần cứng màn hình máy tính', correct: false },
            { text: 'Trở thành chuyên viên thiết kế đồ họa 3D', correct: false },
            { text: 'Có thể tự động viết code mà không cần động vào bàn phím', correct: false },
          ],
          explanation:
            'Level 5 trang bị toàn bộ kỹ năng chuyên sâu giúp bạn trở thành chuyên gia Git cao cấp trong mọi đội ngũ kỹ thuật.',
        },
      ],
    },
  },
];
