export const LEVEL7_PART2 = [
  {
    id: '11-contexts-and-expressions',
    title: 'Contexts & Expressions: ${{ github.ref }}, matrix và toán tử',
    duration: 30,
    xp: 95,
    prerequisites: ['10-env-variables'],
    keywords: ['contexts', 'expressions', 'github context', 'operators', 'template syntax'],
    objectives: [
      'Hiểu rõ khái niệm Contexts trong GitHub Actions: github, env, vars, secrets, matrix, steps, runner.',
      'Sử dụng cú pháp biểu thức ${{ <expression> }} để tính toán và truy xuất dữ liệu động trong YAML.',
      'Làm chủ các toán tử so sánh (==, !=), logic (&&, ||, !) và hàm chuỗi: contains, startsWith, endsWith.',
    ],
    commands: ['echo "${{ github.repository }}"', 'echo "${{ github.actor }}"', 'echo "${{ github.event_name }}"'],
    definition:
      'Contexts (Ngữ cảnh) là tập hợp các đối tượng dữ liệu có cấu trúc chứa thông tin chi tiết về lần chạy workflow hiện tại, môi trường runner, các biến bí mật, và sự kiện kích hoạt. Bạn có thể truy cập các thông tin này ở bất kỳ đâu trong tệp YAML bằng cách đặt chúng bên trong biểu thức (Expressions) có cú pháp dấu ngoặc kép ${{ <expression> }}. Công cụ biểu thức của GitHub Actions hỗ trợ đầy đủ các phép toán số học, so sánh bằng, toán tử logic và các hàm kiểm tra chuỗi tích hợp.',
    why:
      'Tệp định dạng YAML thông thường chỉ là tập dữ liệu văn bản tĩnh không có trí thông minh hay khả năng tự thích ứng. Cú pháp Expressions và Contexts biến tệp cấu hình tĩnh thành một kịch bản động mạnh mẽ và linh hoạt: bạn có thể kiểm tra xem commit hiện tại có phải là nhánh phát hành chính thức không (${{ github.ref == \'refs/heads/main\' }}), gắn thẻ tên lập trình viên đã tạo PR (${{ github.actor }}), hoặc chỉ định tên artifact theo mã băm commit độc nhất trong dự án.',
    mentalModel:
      'Hãy hình dung tệp YAML như một bức thư mẫu hợp đồng được in sẵn với các chỗ trống cần điền thông tin (template). Biểu thức ${{ expression }} chính là những chiếc thẻ giữ chỗ thông minh: khi hệ thống đưa hợp đồng vào máy in, máy in tự động tra cứu cơ sở dữ liệu ngữ cảnh (Context) để điền tên khách hàng, ngày ký và số tiền thanh toán vào đúng vị trí một cách hoàn toàn tự động.',
    diagram:
      'Context Data Sources:\n┌────────────────────────────────────────────────────────┐\n│ github:  [actor: "octocat", ref: "refs/heads/main"]   │\n│ runner:  [os: "Linux", arch: "X64"]                    │\n│ env:     [CUSTOM_KEY: "custom_value"]                 │\n│ secrets: [DEPLOY_TOKEN: "***"]                         │\n└───────────────────────────┬────────────────────────────┘\n                            │\n                            ▼ Cú pháp nội suy\n        run: echo "Actor is \${{ github.actor }}"\n        if: \${{ github.ref == \'refs/heads/main\' && success() }}',
    example:
      'Một nhóm phát triển quản lý kho lưu trữ đa ngôn ngữ thiết lập bước gửi thông báo tự động. Họ sử dụng biểu thức nội suy: run: echo "Kỹ sư ${{ github.actor }} vừa kích hoạt sự kiện ${{ github.event_name }} trên nhánh ${{ github.ref_name }}". Khi một lập trình viên tên Tuấn đẩy mã nguồn lên nhánh phát triển, hệ thống tự động thay thế biểu thức và in ra: "Kỹ sư tuan-dev vừa kích hoạt sự kiện push trên nhánh dev". Đồng thời, một bước thông báo chúc mừng chỉ chạy nếu điều kiện if: ${{ startsWith(github.ref, \'refs/tags/v\') }} được thỏa mãn khi phát hành phiên bản mới.',
    commandSnippet: 'echo "${{ github.repository }}"\necho "${{ github.actor }}"\necho "${{ github.event_name }}"',
    commandExplanation:
      'Các câu lệnh mẫu minh họa cách đọc dữ liệu từ ngữ cảnh github trực tiếp bên trong khối run của step: tên kho lưu trữ hiện tại, tên tài khoản thực hiện thao tác và tên loại sự kiện kích hoạt.',
    mistakes: [
      'Sử dụng cú pháp biểu thức bên trong mệnh đề `if:` không cần thiết (GitHub Actions tự động hiểu nội dung của `if:` là biểu thức mà không bắt buộc phải có `${{ }}`).',
      'So sánh phân biệt hoa thường sai lệch trong các chuỗi định danh nhánh Git.',
      'Sử dụng hàm không được hỗ trợ hoặc cố gắng viết mã JavaScript phức tạp bên trong biểu thức YAML.',
    ],
    labSteps: [
      'Tạo một Step in ra thông tin người thực hiện `${{ github.actor }}` và nhánh hiện tại.',
      'Sử dụng hàm `contains()` để kiểm tra xem thông điệp commit có chứa từ khóa "skip-ci" hay không.',
      'Thực hành kết hợp toán tử logic `&&` để tạo một điều kiện kép kiểm tra môi trường.',
    ],
    hint: 'Trong thuộc tính `if:`, bạn có thể viết trực tiếp `if: github.ref == \'refs/heads/main\'` mà không cần bao bọc bởi dấu `${{ }}`.',
    validation: 'Log in ra chính xác các giá trị ngữ cảnh động tương ứng với tài khoản và nhánh thực tế.',
    quizIntro: 'Kiểm tra mức độ thành thạo về cú pháp ngữ cảnh và biểu thức qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để sử dụng hàm format() hoặc phép nối chuỗi trong biểu thức GitHub Actions để tạo ra một tên tệp báo cáo duy nhất kết hợp giữa tên nhánh và ngày tháng?',
    summary: [
      'Contexts cung cấp thông tin toàn diện về phiên chạy (`github`, `runner`, `env`, `secrets`).',
      'Cú pháp `${{ <expression> }}` dùng để tính toán và nội suy giá trị động vào tệp cấu hình YAML.',
      'Hỗ trợ các hàm chuỗi hữu ích như `contains()`, `startsWith()`, `endsWith()` và hàm trạng thái `success()`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Ngữ cảnh nào sau đây chứa thông tin về tác giả đã thực hiện hành động kích hoạt workflow?',
        options: [
          { text: 'github.actor', correct: true },
          { text: 'runner.user', correct: false },
          { text: 'env.AUTHOR', correct: false },
          { text: 'steps.author.name', correct: false },
        ],
        explanation: '`github.actor` luôn chứa tên đăng nhập (username) của người dùng đã thực hiện push commit hoặc mở Pull Request.',
      },
      {
        id: 'q2',
        question: 'Biểu thức nào sau đây kiểm tra xem tên nhánh có bắt đầu bằng tiền tố "release/" hay không?',
        options: [
          { text: 'startsWith(github.ref_name, \'release/\')', correct: true },
          { text: 'github.ref_name.has(\'release/\')', correct: false },
          { text: 'like(github.ref_name, \'release/*\')', correct: false },
          { text: 'matches(github.ref_name, \'^release\')', correct: false },
        ],
        explanation: 'Hàm `startsWith(string, searchString)` là hàm chuỗi tích hợp sẵn trong bộ xử lý biểu thức của GitHub Actions.',
      },
      {
        id: 'q3',
        question: 'Khi sử dụng biểu thức bên trong mệnh đề điều kiện `if:`, điều nào sau đây là đúng?',
        options: [
          { text: 'Bạn có thể lược bỏ cặp dấu ${{ }} mà biểu thức vẫn được phân tích hợp lệ', correct: true },
          { text: 'Bắt buộc phải có dấu ngoặc nhọn nếu không sẽ bị báo lỗi cú pháp', correct: false },
          { text: 'Chỉ được phép so sánh các số nguyên, không so sánh được chuỗi', correct: false },
          { text: 'Phải viết bằng cú pháp ngôn ngữ C++', correct: false },
        ],
        explanation: 'GitHub Actions tự động coi toàn bộ giá trị trong thuộc tính `if:` là một biểu thức logic, do đó việc bọc `${{ }}` là tùy chọn.',
      },
      {
        id: 'q4',
        question: 'Hàm `contains(\'hello world\', \'world\')` sẽ trả về kết quả nào?',
        options: [
          { text: 'true', correct: true },
          { text: 'false', correct: false },
          { text: 'undefined', correct: false },
          { text: 'Lỗi biên dịch', correct: false },
        ],
        explanation: 'Hàm `contains()` kiểm tra xem chuỗi con có nằm trong chuỗi mẹ hay không và trả về giá trị boolean `true` hoặc `false`.',
      },
      {
        id: 'q5',
        question: 'Biểu thức nào sau đây kiểm tra xem commit hiện tại có thuộc nhánh main VÀ bước trước đó đã thành công hay không?',
        options: [
          { text: 'github.ref == \'refs/heads/main\' && success()', correct: true },
          { text: 'github.ref == \'refs/heads/main\' || failure()', correct: false },
          { text: 'github.branch == \'main\' & pass()', correct: false },
          { text: 'ref === \'main\' and ok()', correct: false },
        ],
        explanation: 'Toán tử logic `&&` kết hợp cùng hàm điều kiện `success()` đảm bảo bước này chỉ chạy khi ở nhánh main và không có lỗi nào trước đó.',
      },
      {
        id: 'q6',
        question: 'Đối tượng ngữ cảnh nào sau đây cho phép truy cập danh sách bí mật mã hóa đã cấu hình trong kho lưu trữ?',
        options: [
          { text: 'secrets', correct: true },
          { text: 'credentials', correct: false },
          { text: 'env.SECRETS', correct: false },
          { text: 'runner.passwords', correct: false },
        ],
        explanation: 'Ngữ cảnh `secrets` chứa các khóa bí mật được mã hóa an toàn như `secrets.DEPLOY_TOKEN` hoặc `secrets.GITHUB_TOKEN`.',
      },
    ],
  },
  {
    id: '12-job-dependencies-needs',
    title: 'Quan hệ phụ thuộc giữa các Job với thuộc tính needs',
    duration: 30,
    xp: 95,
    prerequisites: ['11-contexts-and-expressions'],
    keywords: ['job dependencies', 'needs', 'dag scheduler', 'sequential jobs', 'pipeline flow'],
    objectives: [
      'Làm chủ thuộc tính needs để thiết lập mối quan hệ phụ thuộc có thứ tự giữa các Job.',
      'Hiểu cách GitHub Actions xây dựng Đồ thị có hướng không chu trình (DAG) từ các khai báo needs.',
      'Biết cách truyền và sử dụng kết quả (needs.<job_id>.result) hoặc dữ liệu đầu ra (outputs) giữa các Job.',
    ],
    commands: ['gh run view --graph', 'cat .github/workflows/pipeline.yml'],
    definition:
      'Mặc định, các Job độc lập trong cùng một workflow của GitHub Actions sẽ chạy hoàn toàn song song nhằm tiết kiệm thời gian tổng thể. Tuy nhiên, thuộc tính needs cho phép bạn định nghĩa các mối quan hệ phụ thuộc có hướng giữa các Job, biến các tác vụ rời rạc thành một chuỗi đường ống (Pipeline) có trật tự và kiểm soát chặt chẽ. Một Job có khai báo needs: [job_a, job_b] sẽ chỉ được phép bắt đầu thực thi sau khi cả hai Job A và Job B đã hoàn thành thành công rực rỡ mà không gặp sự cố gián đoạn nào.',
    why:
      'Trong môi trường phát triển phần mềm chuyên nghiệp, bạn không bao giờ muốn triển khai phiên bản mới lên máy chủ sản xuất (Deploy Job) khi mà các bài kiểm tra chất lượng mã nguồn (Lint Job) hoặc bài kiểm tra chức năng (Test Job) vẫn chưa chạy hoặc đã bị thất bại. Sử dụng thuộc tính needs giúp bạn xây dựng cổng kiểm soát đa tầng an toàn: chỉ khi nền móng kiểm thử tầng dưới vững chắc thì tầng đóng gói và phát hành phía trên mới được phép kích hoạt, giúp giảm thiểu tối đa rủi ro gián đoạn dịch vụ người dùng.',
    mentalModel:
      'Hãy tưởng tượng quá trình xây dựng một ngôi nhà nhiều tầng. Job 1 là đổ móng nhà; Job 2 là dựng cột bê tông; Job 3 là lợp mái; Job 4 là sơn tường. Bạn không thể lợp mái khi chưa dựng cột (lợp mái needs dựng cột), và không thể dựng cột khi chưa đổ móng (dựng cột needs đổ móng). Sự phụ thuộc này tạo nên một chuỗi tiến độ vững chắc theo quy luật trọng lực.',
    diagram:
      'Mô hình đồ thị phụ thuộc (DAG Workflow):\n       [Job: Lint] ─────────┐\n                            ├──► [Job: Build] ──► [Job: Deploy Production]\n       [Job: Unit Test] ────┘\n\nKhai báo YAML:\njobs:\n  lint: npm run lint\n  test: npm test\n  build:\n    needs: [lint, test]       <── Chờ cả Lint và Test xong\n  deploy:\n    needs: [build]            <── Chờ Build xong',
    example:
      'Một công ty tài chính công nghệ cao thiết lập pipeline phát hành cổng thanh toán gồm 4 Jobs độc lập: security-scan (quét lỗ hổng bảo mật mã nguồn), unit-test (kiểm tra hàm tính lãi suất giao dịch), build-container (đóng gói ảnh Docker ứng dụng), và deploy-cloud (triển khai lên cụm máy chủ). Job build-container được cấu hình chặt chẽ với needs: [security-scan, unit-test]. Nếu quá trình quét mã nguồn phát hiện một thư viện phụ thuộc có nguy cơ rò rỉ dữ liệu nghiêm trọng dẫn đến security-scan bị thất bại, hệ thống lập tức hủy bỏ Job đóng gói và Job triển khai. Nhờ cơ chế kiểm soát này, mã nguồn lỗi không bao giờ có cơ hội tiếp cận máy chủ thực tế.',
    commandSnippet: 'gh run view --graph\ncat .github/workflows/pipeline.yml',
    commandExplanation:
      'Lệnh gh run view --graph hiển thị đồ thị phụ thuộc DAG trực quan của phiên chạy ngay trong dòng lệnh terminal, giúp bạn thấy rõ nhánh nào đã hoàn thành và nhánh nào đang xếp hàng chờ.',
    mistakes: [
      'Tạo ra vòng lặp phụ thuộc (Circular Dependency): Ví dụ Job A needs Job B và Job B lại needs Job A khiến workflow bị khóa vĩnh viễn và báo lỗi xác thực.',
      'Khai báo sai tên định danh `job_id` trong mảng `needs` khiến hệ thống không tìm thấy Job tiên quyết.',
      'Kỳ vọng Job phụ thuộc vẫn chạy khi Job trước bị lỗi mà không sử dụng hàm trạng thái `always()`.',
    ],
    labSteps: [
      'Tạo 3 Job: `setup`, `test`, và `deploy`.',
      'Cấu hình để `test` phụ thuộc vào `setup` bằng từ khóa `needs: setup`.',
      'Cấu hình để `deploy` phụ thuộc vào `test` bằng từ khóa `needs: test`.',
    ],
    hint: 'Nếu một Job phụ thuộc vào nhiều Job khác, hãy truyền một danh sách mảng: `needs: [job1, job2]`.',
    validation: 'Trên giao diện đồ thị, các Job được nối với nhau bằng các đường mũi tên chỉ hướng chính xác.',
    quizIntro: 'Hãy kiểm tra khả năng thiết kế luồng phụ thuộc Job của bạn qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để cấu hình một Job dọn dẹp tài nguyên (cleanup) luôn luôn chạy ở cuối cùng, bất kể các Job tiên quyết trước đó thành công hay thất bại?',
    summary: [
      'Thuộc tính `needs` dùng để xác định các Job tiên quyết phải chạy xong trước khi Job hiện tại bắt đầu.',
      'Có thể truyền một Job đơn lẻ hoặc một mảng nhiều Jobs: `needs: [job_a, job_b]`.',
      'GitHub Actions tự động chuyển các khai báo `needs` thành một đồ thị có hướng không chu trình (DAG).',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Thuộc tính nào được sử dụng để bắt buộc một Job phải chờ một Job khác hoàn thành trước?',
        options: [
          { text: 'needs', correct: true },
          { text: 'depends_on', correct: false },
          { text: 'after', correct: false },
          { text: 'wait_for', correct: false },
        ],
        explanation: 'Trong GitHub Actions, từ khóa `needs:` là thuộc tính tiêu chuẩn để khai báo mối quan hệ phụ thuộc giữa các Job.',
      },
      {
        id: 'q2',
        question: 'Điều gì xảy ra nếu Job A bị thất bại (failed) và Job B có khai báo `needs: A`?',
        options: [
          { text: 'Job B sẽ tự động bị bỏ qua (skipped) và không được thực thi', correct: true },
          { text: 'Job B vẫn chạy bình thường', correct: false },
          { text: 'Hệ thống tự động chạy lại Job A lần thứ hai', correct: false },
          { text: 'Toàn bộ workflow bị xóa khỏi kho lưu trữ', correct: false },
        ],
        explanation: 'Mặc định, nếu bất kỳ Job tiên quyết nào trong danh sách `needs` bị thất bại, các Job phụ thuộc phía sau sẽ bị hủy bỏ.',
      },
      {
        id: 'q3',
        question: 'Hiện tượng Circular Dependency (Vòng lặp phụ thuộc) ví dụ A cần B và B cần A sẽ dẫn đến kết quả gì?',
        options: [
          { text: 'Workflow bị lỗi xác thực cú pháp và hoàn toàn không thể khởi chạy', correct: true },
          { text: 'Cả hai Job cùng chạy vĩnh viễn không bao giờ dừng', correct: false },
          { text: 'GitHub Actions tự động xóa Job B để giải quyết', correct: false },
          { text: 'Không có vấn đề gì, hệ thống tự động xử lý được', correct: false },
        ],
        explanation: 'GitHub Actions yêu cầu đồ thị DAG không được có chu trình (Acyclic). Nếu phát hiện vòng lặp, workflow sẽ bị từ chối ngay lập tức.',
      },
      {
        id: 'q4',
        question: 'Để kiểm tra kết quả thực thi của Job tiên quyết có tên là `build`, ta dùng cú pháp ngữ cảnh nào?',
        options: [
          { text: 'needs.build.result', correct: true },
          { text: 'jobs.build.status', correct: false },
          { text: 'steps.build.outcome', correct: false },
          { text: 'env.BUILD_RESULT', correct: false },
        ],
        explanation: 'Ngữ cảnh `needs.<job_id>.result` trả về trạng thái hoàn thành của Job đó (ví dụ: `success`, `failure`, `cancelled`, hoặc `skipped`).',
      },
    ],
  },
  {
    id: '13-conditional-execution-if',
    title: 'Thực thi có điều kiện với if: always(), success(), failure()',
    duration: 30,
    xp: 90,
    prerequisites: ['12-job-dependencies-needs'],
    keywords: ['conditional execution', 'if statement', 'status check functions', 'always', 'failure'],
    objectives: [
      'Nắm vững cách sử dụng từ khóa if ở cả cấp độ Job và cấp độ Step để kiểm soát luồng chạy.',
      'Làm chủ 4 hàm kiểm tra trạng thái cốt lõi: success(), failure(), always(), và cancelled().',
      'Hiểu rõ cơ chế mặc định ngầm định: nếu không khai báo hàm trạng thái, GitHub Actions luôn tự động áp dụng success().',
    ],
    commands: ['echo "Chạy khi có lỗi"', 'echo "Chạy bất kể kết quả"'],
    definition:
      'Thuộc tính if cho phép bạn ngăn chặn một Job hoặc một Step thực thi trừ khi một điều kiện logic cụ thể được thỏa mãn. Bạn có thể sử dụng bất kỳ biểu thức ngữ cảnh nào kết hợp với các hàm kiểm tra trạng thái đặc biệt của GitHub Actions: `success()` (trả về true khi các bước trước thành công), `failure()` (trả về true khi có ít nhất một bước trước bị lỗi), `always()` (luôn luôn trả về true bất kể kết quả), và `cancelled()` (trả về true khi người dùng bấm hủy workflow).',
    why:
      'Trong tự động hóa thực tế, bạn thường xuyên cần thực hiện các hành động dọn dẹp hoặc cứu hộ khi có sự cố xảy ra: ví dụ như gửi tin nhắn thông báo khẩn cấp lên kênh Telegram/Discord khi bài kiểm thử bị hỏng (cần `if: failure()`), hoặc dọn dẹp các thùng chứa tạm thời kể cả khi chương trình bị crash (cần `if: always()`). Thiếu mệnh đề điều kiện, bạn không thể xây dựng các quy trình linh hoạt và có khả năng tự phục hồi.',
    mentalModel:
      'Hãy hình dung hệ thống túi khí an toàn và hệ thống loa thông báo trên xe cứu hỏa. Hệ thống phun nước dập lửa chỉ hoạt động khi đến hiện trường (`if: success()`). Nhưng hệ thống còi báo động khẩn cấp và túi khí chỉ bung ra khi xe gặp sự cố va chạm mạnh (`if: failure()`). Và hệ thống ghi dữ liệu hộp đen hành trình thì luôn luôn ghi âm liên tục trong mọi hoàn cảnh kể cả khi xe nổ lốp (`if: always()`).',
    diagram:
      'Quyết định thực thi của Step dựa trên Status Check Functions:\nStep 1: Test ──────────► [Bị lỗi ✗]\n                          │\n                          ├─ Step 2: Gửi thông báo lỗi (if: failure())     ──► [Được chạy ✓]\n                          ├─ Step 3: Đóng gói sản phẩm (if: success())     ──► [Bị bỏ qua 🚫]\n                          └─ Step 4: Dọn dẹp máy ảo     (if: always())      ──► [Được chạy ✓]',
    example:
      'Một kỹ sư thiết lập đường ống kiểm thử tự động cho hệ thống ngân hàng trực tuyến. Khi Job kiểm thử chạy, có 3 bước xử lý kết quả: Step thứ nhất xuất bản gói ứng dụng chỉ khi toàn bộ bài test vượt qua (`if: success()`). Step thứ hai tự động chụp ảnh màn hình lỗi, thu thập tệp nhật ký debug và tải lên kênh hỗ trợ chỉ khi có bài test bị thất bại (`if: failure()`). Step thứ ba gửi yêu cầu tắt máy chủ cơ sở dữ liệu tạm thời để tránh tốn tiền đám mây (`if: always()`). Nhờ các hàm điều kiện chính xác, hệ thống vừa tiết kiệm chi phí vừa cung cấp đầy đủ dữ liệu gỡ lỗi cho lập trình viên.',
    commandSnippet: 'echo "Chạy khi có lỗi"\necho "Chạy bất kể kết quả"',
    commandExplanation:
      'Các câu lệnh trên mô phỏng những khối lệnh đặc thù được bảo vệ bởi mệnh đề điều kiện if, chỉ xuất hiện trong log khi điều kiện trạng thái của phiên chạy thỏa mãn.',
    mistakes: [
      'Nghĩ rằng `if: failure()` sẽ chạy ngay cả khi workflow bị người dùng chủ động bấm Cancel (trường hợp này phải dùng `always()` hoặc `cancelled()`).',
      'Quên rằng mặc định mọi Step đều có ngầm định `if: success()` nên viết lặp lại thừa thãi.',
      'Sử dụng biến môi trường không tồn tại trong mệnh đề điều kiện dẫn đến việc biểu thức luôn bị đánh giá là false.',
    ],
    labSteps: [
      'Tạo một bước cố tình gây lỗi bằng lệnh `exit 1`.',
      'Tạo một bước tiếp theo gắn điều kiện `if: failure()` để in ra dòng thông báo cứu hộ.',
      'Tạo bước cuối cùng gắn điều kiện `if: always()` để chứng minh bước này vẫn luôn thực thi.',
    ],
    hint: 'Khi viết `if: always()`, bước đó sẽ kiên cường thực thi bất kể các bước trước đó thành công, thất bại hay bị hủy bỏ.',
    validation: 'Bước gắn `failure()` và bước gắn `always()` đều được thực thi sau khi bước đầu tiên bị lỗi.',
    quizIntro: 'Cùng làm bài kiểm tra về các hàm điều kiện trạng thái và từ khóa if trong GitHub Actions.',
    challenge:
      'Tại sao việc kết hợp `if: always()` với các bước gửi thông báo lại cần cẩn thận để không vô tình gửi báo cáo thành công giả mạo khi pipeline thực chất đã bị hỏng?',
    summary: [
      'Từ khóa `if` dùng để quyết định xem một Job hoặc Step có được phép chạy hay không.',
      'Các hàm trạng thái cốt lõi gồm: `success()`, `failure()`, `always()`, và `cancelled()`.',
      'Mặc định nếu không chỉ định, GitHub Actions luôn áp dụng điều kiện ngầm định là `success()`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Hàm trạng thái nào giúp một Step chỉ chạy khi có ít nhất một bước trước đó trong Job bị thất bại?',
        options: [
          { text: 'failure()', correct: true },
          { text: 'error()', correct: false },
          { text: 'failed()', correct: false },
          { text: 'on_error()', correct: false },
        ],
        explanation: 'Hàm `failure()` trả về giá trị `true` khi bất kỳ bước tiên quyết nào trong Job trước đó gặp sự cố thất bại.',
      },
      {
        id: 'q2',
        question: 'Điều kiện mặc định cho một Step nếu bạn không khai báo thuộc tính `if:` là gì?',
        options: [
          { text: 'success()', correct: true },
          { text: 'always()', correct: false },
          { text: 'failure()', correct: false },
          { text: 'cancelled()', correct: false },
        ],
        explanation: 'Mặc định, GitHub Actions luôn tự động áp dụng `success()`, nghĩa là chỉ chạy khi tất cả các bước trước đó đều thành công.',
      },
      {
        id: 'q3',
        question: 'Để một bước dọn dẹp luôn luôn được chạy dù các bước trước thành công, thất bại hay bị hủy, ta dùng hàm nào?',
        options: [
          { text: 'always()', correct: true },
          { text: 'forever()', correct: false },
          { text: 'force()', correct: false },
          { text: 'run_anyway()', correct: false },
        ],
        explanation: 'Hàm `always()` ép buộc bước thực thi trong mọi tình huống, rất lý tưởng cho các tác vụ giải phóng tài nguyên và dọn dẹp.',
      },
      {
        id: 'q4',
        question: 'Biểu thức `if: github.event_name == \'push\' && success()` có ý nghĩa gì?',
        options: [
          { text: 'Chỉ chạy khi sự kiện kích hoạt là push và các bước trước đó đều thành công', correct: true },
          { text: 'Chạy mỗi khi có người mở Pull Request', correct: false },
          { text: 'Chạy bất kể sự kiện nào nhưng chỉ khi có lỗi', correct: false },
          { text: 'Từ chối mọi sự kiện push', correct: false },
        ],
        explanation: 'Biểu thức kết hợp điều kiện loại sự kiện (`push`) và trạng thái thành công của các bước đi trước bằng toán tử logic `&&`.',
      },
    ],
  },
  {
    id: '14-matrix-strategy',
    title: 'Chiến lược ma trận kiểm thử đa môi trường (Matrix Strategy)',
    duration: 35,
    xp: 100,
    prerequisites: ['13-conditional-execution-if'],
    keywords: ['matrix strategy', 'test matrix', 'multi environment', 'cross platform', 'combinatorial build'],
    objectives: [
      'Hiểu rõ khái niệm và sức mạnh của Matrix Strategy trong việc mở rộng kiểm thử đa cấu hình tự động.',
      'Biết cách khai báo ma trận đa chiều: kết hợp nhiều phiên bản ngôn ngữ và nhiều hệ điều hành.',
      'Sử dụng các thuộc tính nâng cao: include (bổ sung trường hợp đặc biệt), exclude (loại trừ tổ hợp không mong muốn) và max-parallel.',
    ],
    commands: ['npm test', 'node -v'],
    definition:
      'Chiến lược ma trận (Matrix Strategy) là cơ chế cao cấp trong GitHub Actions cho phép bạn sử dụng các biến cấu hình để tự động tạo ra một tập hợp nhiều Job con chạy song song từ một định nghĩa Job duy nhất. Bằng cách khai báo khối từ khóa `strategy: matrix:`, GitHub Actions sẽ tự động tính toán tích Đề-các (Cartesian product) của tất cả các mảng giá trị đầu vào để sinh ra toàn bộ các tổ hợp môi trường cần kiểm thử một cách nhanh chóng và tối ưu.',
    why:
      'Khi phát triển một thư viện hoặc phần mềm đa nền tảng, việc chỉ kiểm thử trên một phiên bản Node.js hay một hệ điều hành duy nhất là cực kỳ mạo hiểm. Có những tính năng hoạt động hoàn hảo trên Node 20 trên Linux nhưng lại bị lỗi trên Node 18 hoặc trên Windows do khác biệt về đường dẫn tệp tin. Nếu không có Matrix, bạn sẽ phải sao chép tệp YAML ra hàng chục Job giống hệt nhau, gây ác mộng khi cần bảo trì.',
    mentalModel:
      'Hãy hình dung một xưởng sản xuất quần áo may thử nghiệm một mẫu áo sơ mi mới. Thay vì may thủ công từng cái một, người quản lý lập một bảng ma trận gồm 3 Kích cỡ (S, M, L) và 3 Màu sắc (Đỏ, Xanh, Trắng). Bằng một lệnh duy nhất, hệ thống tự động sinh ra 9 tổ hợp sản phẩm khác nhau (3 x 3 = 9) và giao cho 9 thợ may thực hiện cùng một lúc để kiểm tra độ vừa vặn của từng màu trên từng kích cỡ.',
    diagram:
      'Tích Đề-các của Matrix Strategy:\nstrategy:\n  matrix:\n    os: [ubuntu-latest, windows-latest]     (2 giá trị)\n    node: [18, 20]                          (2 giá trị)\n\nSinh ra 4 Jobs chạy SONG SONG:\n┌────────────────────────────────────────┐\n│ • test (os: ubuntu-latest, node: 18)   │\n│ • test (os: ubuntu-latest, node: 20)   │\n│ • test (os: windows-latest, node: 18)  │\n│ • test (os: windows-latest, node: 20)  │\n└────────────────────────────────────────┘',
    example:
      'Nhóm phát triển một thư viện công cụ dòng lệnh mã nguồn mở thiết lập ma trận kiểm thử: hệ điều hành gồm [ubuntu-latest, windows-latest, macos-latest] và phiên bản Node gồm [18, 20, 22]. Khi một lập trình viên gửi Pull Request, GitHub Actions tự động phân rã thành 9 Jobs chạy đồng thời trên 9 máy ảo độc lập. Kết quả cho thấy 8 Jobs đều báo xanh, nhưng Job chạy trên Windows với Node 18 bị đỏ do hàm xử lý dấu gạch chéo đường dẫn `\\` của Windows. Lập trình viên lập tức phát hiện và sửa lỗi ngay trước khi người dùng thực tế tải thư viện về.',
    commandSnippet: 'npm test\nnode -v',
    commandExplanation:
      'Các câu lệnh bên trong Step của Job ma trận sử dụng biến ngữ cảnh `${{ matrix.node }}` và `${{ matrix.os }}` để cài đặt chính xác phiên bản môi trường cho từng máy ảo cụ thể.',
    mistakes: [
      'Tạo ma trận quá lớn (ví dụ: 5 OS x 5 Browser x 5 Node = 125 Jobs) làm cạn kiệt toàn bộ hạn ngạch tính toán miễn phí của tài khoản.',
      'Không sử dụng thuộc tính `fail-fast: false` khi muốn xem toàn bộ kết quả của mọi tổ hợp kể cả khi một tổ hợp bị lỗi sớm.',
      'Sử dụng sai cú pháp của `include` hoặc `exclude` dẫn đến việc các tổ hợp không được loại trừ như mong đợi.',
    ],
    labSteps: [
      'Khai báo khối `strategy: matrix:` cho Job `test` với biến `node: [18, 20]`.',
      'Sử dụng `${{ matrix.node }}` trong step `actions/setup-node@v4` để cài đặt phiên bản tương ứng.',
      'Quan sát trên giao diện xem hệ thống có tự động sinh ra 2 Job con chạy song song hay không.',
    ],
    hint: 'Đặt `fail-fast: false` bên trong `strategy:` nếu bạn muốn các phiên bản khác vẫn tiếp tục chạy khi có một phiên bản bị lỗi.',
    validation: 'Hệ thống tự động mở rộng và hiển thị đầy đủ danh sách các Job con tương ứng với ma trận cấu hình.',
    quizIntro: 'Hãy kiểm tra khả năng tư duy và thiết lập ma trận kiểm thử qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để sử dụng thuộc tính exclude trong ma trận gồm 3 hệ điều hành và 3 phiên bản Node để loại trừ duy nhất trường hợp Windows kết hợp với Node 16?',
    summary: [
      '`strategy: matrix:` tự động tạo ra nhiều Job con bằng tích Đề-các của các danh sách giá trị.',
      'Giúp kiểm thử tương thích đa môi trường (hệ điều hành, phiên bản runtime, cơ sở dữ liệu) chỉ với một định nghĩa duy nhất.',
      'Hỗ trợ `include` để thêm biến phụ và `exclude` để loại bỏ các tổ hợp không hợp lệ.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Nếu ma trận khai báo `os: [ubuntu, windows]` và `node: [18, 20, 22]`, có tổng cộng bao nhiêu Job con sẽ được sinh ra?',
        options: [
          { text: '6 Jobs (2 x 3 = 6)', correct: true },
          { text: '5 Jobs (2 + 3 = 5)', correct: false },
          { text: '2 Jobs', correct: false },
          { text: '3 Jobs', correct: false },
        ],
        explanation: 'Số lượng Job con được tính bằng tích Đề-các giữa số phần tử của các chiều trong ma trận: 2 nhân 3 bằng 6.',
      },
      {
        id: 'q2',
        question: 'Thuộc tính `fail-fast: true` (mặc định) trong strategy có hành vi như thế nào?',
        options: [
          { text: 'Ngay khi một Job con trong ma trận bị lỗi, GitHub Actions lập tức hủy bỏ tất cả các Job con còn lại đang chạy', correct: true },
          { text: 'Tự động sửa lỗi cho các bài kiểm thử', correct: false },
          { text: 'Ép các Job con phải chạy thật nhanh gấp đôi', correct: false },
          { text: 'Bỏ qua hoàn toàn bài test bị lỗi mà không thông báo', correct: false },
        ],
        explanation: '`fail-fast: true` giúp tiết kiệm chi phí bằng cách dừng ngay toàn bộ ma trận khi đã phát hiện có ít nhất một môi trường bị lỗi.',
      },
      {
        id: 'q3',
        question: 'Cú pháp nào sau đây dùng để truy cập giá trị của biến `version` đang xét trong Step của ma trận?',
        options: [
          { text: '${{ matrix.version }}', correct: true },
          { text: '${{ env.version }}', correct: false },
          { text: '${{ job.version }}', correct: false },
          { text: '$MATRIX_VERSION', correct: false },
        ],
        explanation: 'Ngữ cảnh `matrix` chứa giá trị hiện tại của các biến ma trận được gán riêng cho từng Job con cụ thể.',
      },
      {
        id: 'q4',
        question: 'Thuộc tính nào cho phép bạn loại bỏ một tổ hợp cụ thể không mong muốn khỏi ma trận?',
        options: [
          { text: 'exclude', correct: true },
          { text: 'remove', correct: false },
          { text: 'ignore', correct: false },
          { text: 'skip', correct: false },
        ],
        explanation: 'Từ khóa `exclude:` trong cấu hình ma trận dùng để định nghĩa các cặp giá trị cần loại trừ khỏi danh sách thực thi.',
      },
    ],
  },
  {
    id: '15-artifacts-sharing',
    title: 'Lưu trữ và chia sẻ sản phẩm build với Artifacts',
    duration: 30,
    xp: 95,
    prerequisites: ['14-matrix-strategy'],
    keywords: ['artifacts', 'upload artifact', 'download artifact', 'build output', 'data sharing'],
    objectives: [
      'Hiểu rõ khái niệm Artifact như cầu nối lưu trữ và truyền tải dữ liệu giữa các Job độc lập.',
      'Sử dụng thành thạo action actions/upload-artifact@v4 để lưu trữ gói tệp tin sau khi build.',
      'Sử dụng thành thạo action actions/download-artifact@v4 để kéo sản phẩm về máy ảo của Job triển khai.',
    ],
    commands: ['ls -la dist/', 'tar -czf app.tar.gz dist/'],
    definition:
      'Artifacts (Tạo phẩm) là các tệp tin hoặc tập hợp tệp tin được sinh ra trong quá trình thực thi một workflow (ví dụ: các tệp biên dịch mã nguồn JavaScript trong thư mục dist/, tệp gói nhị phân APK, hoặc báo cáo kiểm thử độ bao phủ coverage report) được tải lên và lưu trữ tạm thời trên hệ thống lưu trữ đám mây của GitHub, cho phép các Job khác tải về hoặc người dùng tải xuống thủ công.',
    why:
      'Vì mỗi Job chạy trên một máy ảo độc lập và máy ảo đó sẽ bị hủy hoàn toàn ngay khi Job kết thúc, mọi tệp tin bạn vừa tốn công biên dịch (npm run build) sẽ biến mất vĩnh viễn nếu không được lưu lại. Artifacts chính là giải pháp chính thống duy nhất để truyền kết quả từ Job này (ví dụ: Job đóng gói Build) sang một Job khác (ví dụ: Job Triển khai Deploy hoặc Job Quét bảo mật).',
    mentalModel:
      'Hãy tưởng tượng hai bưu cục bưu điện độc lập ở hai thành phố hoàn toàn khác nhau (tượng trưng cho hai Job chạy trên hai máy ảo cách ly). Bưu cục A tiến hành đóng gói một kiện hàng quý giá, niêm phong cẩn thận và gửi vào kho hàng lưu ký đám mây trung tâm của tổng công ty vận chuyển (sự kiện upload-artifact). Sau đó, Bưu cục B nhận được mã vận đơn, đến kho hàng trung tâm lấy đúng kiện hàng nguyên vẹn đó về để giao tận tay người nhận (sự kiện download-artifact) mà không bị mất mát.',
    diagram:
      'Quy trình truyền dữ liệu giữa các Job qua Artifacts Storage:\n┌──────────────────────┐                ┌────────────────────────┐\n│ Job 1: Build (Ubuntu)│                │ GitHub Cloud Artifacts │\n│   npm run build      │                │ ┌────────────────────┐ │\n│   upload-artifact@v4 ├───────────────►│ │ production-dist    │ │\n└──────────────────────┘                │ └─────────┬──────────┘ │\n                                        └───────────┼────────────┘\n┌──────────────────────┐                            │\n│ Job 2: Deploy (Ubuntu)                            │\n│   download-artifact  │◄───────────────────────────┘\n│   deploy to server   │ (Nhận đúng thư mục dist/ đã build)\n└──────────────────────┘',
    example:
      'Một nhóm phát triển ứng dụng web React xây dựng đường ống CI/CD gồm 2 Jobs. Job thứ nhất có tên `build-app`: kéo mã nguồn về, cài đặt thư viện và chạy `npm run build` tạo ra thư mục `build/`. Ở bước cuối, Job này gọi `actions/upload-artifact@v4` với tên gọi `webapp-bundle` và đường dẫn `build/`. Job thứ hai có tên `deploy-prod` khai báo `needs: build-app`. Ngay khi bắt đầu, Job này gọi `actions/download-artifact@v4` để kéo gói `webapp-bundle` về thư mục làm việc, sau đó tải toàn bộ mã nguồn lên máy chủ AWS S3. Nhờ Artifacts, Job thứ hai hoàn toàn không cần phải tốn công cài đặt lại Node.js hay biên dịch lại mã nguồn từ đầu.',
    commandSnippet: 'ls -la dist/\ntar -czf app.tar.gz dist/',
    commandExplanation:
      'Các câu lệnh trên minh họa việc kiểm tra thư mục sản phẩm dist/ trước khi đóng gói và tải lên kho lưu trữ Artifacts của GitHub.',
    mistakes: [
      'Cố gắng tải lên thư mục khổng lồ chứa `node_modules/`: Làm lãng phí băng thông và dung lượng lưu trữ một cách vô ích.',
      'Đặt tên tệp artifact giữa lệnh upload và download không khớp nhau khiến Job sau báo lỗi không tìm thấy tệp.',
      'Sử dụng phiên bản upload-artifact v3 kết hợp với download-artifact v4 gây ra lỗi không tương thích phiên bản giao thức lưu trữ.',
    ],
    labSteps: [
      'Trong Job 1, tạo một tệp tin `build/bundle.txt` chứa dòng chữ "Production Build 1.0".',
      'Sử dụng `actions/upload-artifact@v4` để tải thư mục `build` lên với tên `my-artifact`.',
      'Trong Job 2 (có `needs: job1`), sử dụng `actions/download-artifact@v4` để kéo tệp về và in nội dung ra log.',
    ],
    hint: 'Thời gian lưu trữ mặc định của Artifacts trên GitHub là 90 ngày, nhưng bạn có thể cấu hình ngắn lại bằng `retention-days: 7` để tiết kiệm dung lượng.',
    validation: 'Job 2 đọc thành công nội dung của tệp tin được sinh ra từ Job 1 thông qua Artifact.',
    quizIntro: 'Hãy kiểm tra kiến thức về cơ chế chia sẻ tệp tin Artifacts qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để sử dụng Artifacts nhằm lưu trữ các ảnh chụp màn hình bị lỗi (error screenshots) từ các bài kiểm thử Cypress/Playwright để kỹ sư tải về điều tra?',
    summary: [
      'Artifacts là cơ chế chính thống để lưu trữ và truyền tải tệp tin giữa các Job độc lập.',
      'Sử dụng `actions/upload-artifact@v4` để đẩy tệp lên máy chủ lưu trữ của GitHub.',
      'Sử dụng `actions/download-artifact@v4` để tải tệp về không gian làm việc của Job phụ thuộc.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Tại sao cần phải sử dụng Artifacts để truyền tệp tin giữa hai Job khác nhau trong cùng một workflow?',
        options: [
          { text: 'Vì mỗi Job chạy trên một máy ảo riêng biệt và ổ đĩa của chúng hoàn toàn cách ly với nhau', correct: true },
          { text: 'Vì GitHub bắt buộc phải thu phí dịch vụ lưu trữ', correct: false },
          { text: 'Vì các Job không được phép dùng chung ngôn ngữ lập trình', correct: false },
          { text: 'Vì các tệp tin trong Git tự động bị xóa sau 1 phút', correct: false },
        ],
        explanation: 'Do tính chất cô lập của máy ảo Runner, các tệp tin cục bộ ở Job 1 sẽ không thể nhìn thấy ở Job 2 nếu không qua cơ chế trung gian Artifacts.',
      },
      {
        id: 'q2',
        question: 'Action nào sau đây được cộng đồng sử dụng phổ biến nhất để tải tệp tin lên hệ thống lưu trữ Artifact?',
        options: [
          { text: 'actions/upload-artifact', correct: true },
          { text: 'actions/save-file', correct: false },
          { text: 'actions/push-disk', correct: false },
          { text: 'actions/cloud-storage', correct: false },
        ],
        explanation: '`actions/upload-artifact` là action chính thức của GitHub để đóng gói và đưa tệp tin lên hệ thống lưu trữ Artifacts.',
      },
      {
        id: 'q3',
        question: 'Tham số `retention-days` trong cấu hình upload-artifact có ý nghĩa gì?',
        options: [
          { text: 'Số ngày tệp artifact sẽ được lưu trữ trên GitHub trước khi tự động bị xóa bỏ', correct: true },
          { text: 'Số ngày cần để tải tệp lên máy chủ', correct: false },
          { text: 'Thời gian bảo hành của phần cứng máy chủ', correct: false },
          { text: 'Số ngày tối đa một lập trình viên được nghỉ phép', correct: false },
        ],
        explanation: '`retention-days` quy định vòng đời lưu trữ của tệp tin, giúp dọn dẹp dung lượng tự động sau một khoảng thời gian quy định.',
      },
      {
        id: 'q4',
        question: 'Thư mục nào sau đây KHÔNG NÊN đưa vào artifact tải lên?',
        options: [
          { text: 'node_modules/ (chứa hàng chục nghìn tệp phụ thuộc dung lượng lớn)', correct: true },
          { text: 'dist/ (sản phẩm biên dịch cuối cùng)', correct: false },
          { text: 'coverage/ (báo cáo kiểm thử chất lượng)', correct: false },
          { text: 'release.zip (gói phần mềm đã đóng gói)', correct: false },
        ],
        explanation: '`node_modules` chứa các thư viện có thể tải lại dễ dàng bằng package manager, việc nén và tải lên hàng nghìn tệp nhỏ gây chậm trễ nghiêm trọng.',
      },
    ],
  },
  {
    id: '16-secrets-and-variables',
    title: 'Bảo mật thông tin nhạy cảm với Secrets và Secret Masking',
    duration: 30,
    xp: 95,
    prerequisites: ['15-artifacts-sharing'],
    keywords: ['secrets', 'security', 'masking', 'encrypted secrets', 'credential safety'],
    objectives: [
      'Phân biệt rõ ràng giữa Configuration Variables (thông tin cấu hình mở) và Encrypted Secrets (thông tin bí mật nhạy cảm).',
      'Biết cách cấu hình và gọi Secrets trong tệp YAML qua ngữ cảnh ${{ secrets.SECRET_NAME }}.',
      'Hiểu sâu cơ chế che giấu bí mật (Secret Masking): tự động thay thế bằng *** trong log thực thi.',
    ],
    commands: ['echo "Deploying with token: ***"', 'gh secret set API_KEY'],
    definition:
      'GitHub Secrets là các biến nhạy cảm được mã hóa (chẳng hạn như mật khẩu cơ sở dữ liệu, mã khóa API token, khóa riêng tư SSH) được tạo trong phần cài đặt của kho lưu trữ hoặc tổ chức. GitHub sử dụng mã hóa bất đối xứng libsodium để bảo vệ các bí mật này trước khi lưu vào cơ sở dữ liệu. Trong quá trình chạy workflow, hệ thống sẽ giải mã dữ liệu vào bộ nhớ của Runner và tự động áp dụng cơ chế Secret Masking (thay thế toàn bộ chuỗi ký tự bí mật thành ba dấu sao *** trong mọi dòng nhật ký hiển thị).',
    why:
      'Lộ khóa bí mật (Credential Leak) là một trong những thảm họa an ninh mạng phổ biến và tồi tệ nhất. Nếu một lập trình viên vô tình viết cứng mã khóa AWS Token vào tệp YAML và đẩy lên kho lưu trữ công khai, các bot quét tự động trên Internet sẽ chiếm quyền tài khoản chỉ trong vòng vài giây, gây thiệt hại hàng trăm triệu đồng. GitHub Secrets đảm bảo mã nguồn của bạn hoàn toàn sạch sẽ và an toàn tuyệt đối.',
    mentalModel:
      'Hãy tưởng tượng chiếc két sắt bảo mật kiên cố của ngân hàng. Bạn đặt những thỏi vàng và mật mã két sắt vào bên trong (GitHub Secrets). Khi nhân viên giao dịch (Runner) cần thực hiện một lệnh thanh toán, họ được hệ thống cấp quyền sử dụng chìa khóa trong phòng kín không có cửa sổ. Mọi camera giám sát công cộng (hệ thống Logs) đều tự động làm mờ khuôn mặt và bàn tay bấm mật mã thành dải màu đen (***) để không ai đứng ngoài có thể nhìn trộm được.',
    diagram:
      'Cơ chế che giấu bí mật (Secret Masking):\nRepository Settings (Mã hóa Libsodium)\n└── Secrets: [PROD_API_KEY = "super_secret_token_12345"]\n      │\n      ▼ Được tiêm vào Runner an toàn\nWorkflow YAML:\n  env:\n    API_TOKEN: \${{ secrets.PROD_API_KEY }}\n  run: echo "Connecting with token $API_TOKEN"\n\nLog hiển thị cho người dùng:\nConnecting with token ***   <── Tự động thay thế chuỗi nhạy cảm bằng ***',
    example:
      'Một kỹ sư tích hợp chức năng gửi tin nhắn thông báo Telegram tự động mỗi khi có bản phát hành mới. Thay vì viết mã bot token trực tiếp vào mã nguồn, kỹ sư truy cập mục Settings -> Secrets and variables -> Actions trên GitHub và tạo một Secret mới có tên TELEGRAM_BOT_TOKEN. Trong tệp workflow, kỹ sư truyền biến qua môi trường: env: { BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }} }. Dù trong câu lệnh curl có in biến ra màn hình, hệ thống kiểm duyệt log của GitHub Actions lập tức can thiệp và hiển thị dòng chữ: BOT_TOKEN=***. Mã khóa bí mật được giữ kín tuyệt đối.',
    commandSnippet: 'echo "Deploying with token: ***"\ngh secret set API_KEY',
    commandExplanation:
      'Lệnh gh secret set cho phép lập trình viên lưu trữ an toàn một biến bí mật mới lên GitHub trực tiếp từ dòng lệnh mà giá trị không bao giờ bị lưu trong lịch sử shell.',
    mistakes: [
      'Cố tình giải mã hoặc in chuỗi bí mật dưới dạng băm Base64 để vượt mặt bộ lọc Masking của GitHub.',
      'Sử dụng Secrets trong các Pull Request xuất phát từ các nhánh phân nhánh (forks) của cộng đồng bên ngoài mà không kiểm duyệt.',
      'Đặt tên Secret trùng với các từ khóa quá ngắn hoặc thông dụng (ví dụ: "true" hoặc "123") khiến log hiển thị dấu sao *** ở khắp mọi nơi.',
    ],
    labSteps: [
      'Vào phần thiết lập mô phỏng và tạo một biến bí mật giả định `MOCK_API_KEY = "my_super_secret_xyz"`.',
      'Đọc biến bí mật này vào Step thông qua cú pháp `${{ secrets.MOCK_API_KEY }}`.',
      'In biến này ra log bằng lệnh echo và quan sát chuỗi ký tự hiển thị bị che thành `***`.',
    ],
    hint: 'Không bao giờ được đặt giá trị của Secret là các chuỗi quá phổ biến như "admin" hay "test" vì nó sẽ làm hỏng khả năng đọc log của hệ thống.',
    validation: 'Toàn bộ giá trị nhạy cảm hiển thị trên log đều được chuyển thành dấu *** một cách an toàn.',
    quizIntro: 'Kiểm tra nhận thức về an toàn thông tin và quản lý Secrets qua các câu hỏi sau.',
    challenge:
      'Tại sao GitHub Actions mặc định không chia sẻ Secrets cho các sự kiện pull_request bắt nguồn từ các kho lưu trữ Fork của người lạ?',
    summary: [
      'GitHub Secrets được mã hóa an toàn bằng thuật toán Libsodium trước khi lưu trữ.',
      'Truy cập biến bí mật thông qua ngữ cảnh `${{ secrets.TEN_BIEN }}`.',
      'Cơ chế Secret Masking tự động che giấu giá trị nhạy cảm thành `***` trong toàn bộ nhật ký thực thi.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Khi một câu lệnh vô tình in giá trị của một GitHub Secret ra màn hình, hệ thống log sẽ hiển thị nội dung gì?',
        options: [
          { text: 'Chuỗi ba dấu sao (***)', correct: true },
          { text: 'Nguyên văn giá trị bí mật', correct: false },
          { text: 'Dòng chữ "PASSWORD DETECTED"', correct: false },
          { text: 'Màn hình bị đen toàn bộ', correct: false },
        ],
        explanation: 'GitHub Actions tích hợp sẵn bộ lọc Secret Masking tự động nhận diện và thay thế mọi chuỗi ký tự khớp với secret thành `***`.',
      },
      {
        id: 'q2',
        question: 'Sự khác biệt chính giữa GitHub Variables và GitHub Secrets là gì?',
        options: [
          { text: 'Variables là thông tin cấu hình không mã hóa (hiển thị rõ), còn Secrets được mã hóa an toàn và bị che trong log', correct: true },
          { text: 'Variables chỉ dùng được trên hệ điều hành Windows', correct: false },
          { text: 'Secrets chỉ tồn tại trong đúng 24 giờ', correct: false },
          { text: 'Không có bất kỳ sự khác biệt nào', correct: false },
        ],
        explanation: 'Variables dùng cho các cấu hình mở như PORT, DOMAIN; Secrets dùng cho dữ liệu nhạy cảm như khóa API, mật khẩu.',
      },
      {
        id: 'q3',
        question: 'Cú pháp nào sau đây là chuẩn mực để truyền một bí mật vào biến môi trường của Step?',
        options: [
          { text: 'env: { API_KEY: ${{ secrets.MY_API_KEY }} }', correct: true },
          { text: 'env: { API_KEY: $MY_API_KEY }', correct: false },
          { text: 'import secret MY_API_KEY', correct: false },
          { text: 'read_secret("MY_API_KEY")', correct: false },
        ],
        explanation: 'Bạn sử dụng ngữ cảnh `secrets` kết hợp với cú pháp biểu thức `${{ secrets.<NAME> }}` để gán giá trị vào biến môi trường.',
      },
      {
        id: 'q4',
        question: 'Tại sao các workflow chạy trên Pull Request từ một kho Fork bên ngoài mặc định không được truy cập Secrets?',
        options: [
          { text: 'Để ngăn chặn kẻ tấn công gửi PR chứa mã độc nhằm in hoặc đánh cắp bí mật của dự án gốc', correct: true },
          { text: 'Do máy chủ GitHub bị quá tải', correct: false },
          { text: 'Vì người dùng Fork không có tài khoản ngân hàng', correct: false },
          { text: 'Vì GitHub không hỗ trợ tính năng Fork', correct: false },
        ],
        explanation: 'Đây là chốt chặn an ninh tối quan trọng nhằm bảo vệ các dự án mã nguồn mở khỏi các cuộc tấn công khai thác bí mật.',
      },
    ],
  },
  {
    id: '17-pull-request-ci',
    title: 'Thiết lập CI Pipeline tự động kiểm thử trên Pull Request',
    duration: 35,
    xp: 100,
    prerequisites: ['16-secrets-and-variables'],
    keywords: ['pull request ci', 'pr automation', 'status checks', 'branch protection', 'code quality gate'],
    objectives: [
      'Thiết lập hoàn chỉnh một pipeline CI tự động kích hoạt mỗi khi có Pull Request được mở hoặc cập nhật.',
      'Liên kết chặt chẽ kết quả của GitHub Actions với tính năng Branch Protection Rules (Required Status Checks).',
      'Trải nghiệm quy trình kiểm soát chất lượng: Khóa nút Merge khi bài test đỏ và Mở khóa khi bài test xanh.',
    ],
    commands: ['gh pr create --title "feat: new login"', 'gh pr checks', 'gh pr merge --auto'],
    definition:
      'Pull Request CI là mô hình kiểm chuẩn tự động bắt buộc trong quy trình phát triển phần mềm chuyên nghiệp. Khi một lập trình viên tạo hoặc đẩy thêm mã nguồn vào một Pull Request, GitHub Actions tự động tạo ra một nhánh ảo hợp nhất thử nghiệm (merge commit tạm thời) và thực thi toàn bộ chuỗi kiểm tra (Linter, Unit Test, Type Check). Kết quả thành công hay thất bại được gắn trực tiếp vào báo cáo trạng thái (Status Check) của PR.',
    why:
      'Nếu không có CI gác cổng trên Pull Request, nhánh chính (main) sẽ liên tục bị vỡ hoặc suy giảm hiệu năng do những lỗi bất cẩn, xung đột thư viện của lập trình viên. Đợi đến khi code đã được merge vào main mới phát hiện lỗi thì đã quá muộn và tốn rất nhiều công sức để tìm kiếm commit lỗi và phục hồi hệ thống. PR CI đóng vai trò như một bộ lọc sạch tự động: mọi đoạn mã kém chất lượng đều bị chặn đứng ngay trước cửa ngõ của nhánh chính, bảo vệ sự ổn định tối cao của sản phẩm.',
    mentalModel:
      'Hãy hình dung trạm kiểm dịch hải quan tại sân bay quốc tế. Hành khách (các commit trong PR) muốn nhập cảnh vào quốc gia (nhánh main) bắt buộc phải đi qua máy quét an ninh và cổng soi chiếu sinh học (CI Pipeline). Nếu hành lý chứa chất cấm hoặc có triệu chứng nhiễm virus nguy hiểm (bài test bị lỗi hoặc linter phát hiện sai chuẩn), cánh cửa hải quan sẽ khóa chặt và hành khách bị chặn lại để xử lý trước khi có thể đặt chân vào nội địa.',
    diagram:
      'Tích hợp bảo vệ nhánh với PR CI Status Checks:\nDeveloper tạo PR ──► [Kích hoạt CI Workflow]\n                          │\n                          ▼\n                     [Chạy Tests]\n                          │\n           ┌──────────────┴──────────────┐\n           ▼                             ▼\n      [Tests PASS ✓]               [Tests FAIL ✗]\n           │                             │\n           ▼                             ▼\nStatus Check: Xanh (Success)   Status Check: Đỏ (Failure)\n           │                             │\n           ▼                             ▼\n[NÚT MERGE ĐƯỢC MỞ KHÓA]      [NÚT MERGE BỊ KHÓA CHẶT 🚫]',
    example:
      'Trong một dự án tài chính, nhánh `main` được bảo vệ bởi quy tắc Branch Protection Rules với yêu cầu bắt buộc: bài kiểm tra `ci/test` phải đạt trạng thái thành công. Khi lập trình viên Nam mở một PR thêm tính năng chuyển tiền nhanh, Nam vô tình sửa đổi một hàm mà quên cập nhật bài kiểm thử tương ứng. Đường ống Actions chạy trong 2 phút và báo lỗi đỏ ở bài test đơn vị. Trên giao diện PR của Nam, nút "Merge pull request" bị vô hiệu hóa với thông báo màu đỏ: "Required statuses must pass before merging". Nam kiểm tra log, sửa lại đoạn mã, commit và push lên nhánh của mình. CI tự động chạy lại, báo tích xanh và nút Merge lập tức sáng lên cho phép trưởng nhóm phê duyệt.',
    commandSnippet: 'gh pr create --title "feat: new login"\ngh pr checks\ngh pr merge --auto',
    commandExplanation:
      'Các lệnh GitHub CLI trên cho phép tạo PR từ dòng lệnh, kiểm tra trạng thái của các bài kiểm tra tự động với gh pr checks, và bật chế độ tự động hợp nhất ngay khi các bài test chuyển sang màu xanh.',
    mistakes: [
      'Kích hoạt cả hai sự kiện `push` và `pull_request` trên cùng một nhánh khiến workflow bị chạy lặp lại 2 lần một cách lãng phí.',
      'Cấu hình tên Job kiểm tra trong Branch Protection Rule không khớp chính xác từng chữ cái với tên Job trong tệp YAML.',
      'Bỏ qua việc kiểm tra các commit được đẩy bổ sung vào PR sau khi người review đã phê duyệt ban đầu.',
    ],
    labSteps: [
      'Tạo một tệp workflow cấu hình kích hoạt trên sự kiện `on: pull_request: branches: [main]`.',
      'Định nghĩa Job kiểm tra `test` chạy các lệnh kiểm thử và kiểm tra cú pháp.',
      'Mở một Pull Request thử nghiệm và quan sát biểu tượng đồng hồ cát đang chạy, sau đó chuyển sang dấu tích xanh.',
    ],
    hint: 'Sự kiện `pull_request` theo mặc định lắng nghe các loại hoạt động: `opened`, `synchronize` (khi push code mới), và `reopened`.',
    validation: 'Pull Request hiển thị trạng thái Status Check tích hợp chính xác và ngăn cản việc merge khi bài test bị lỗi.',
    quizIntro: 'Hãy kiểm tra kiến thức về thiết lập đường ống CI cho Pull Request qua các câu hỏi sau.',
    challenge:
      'Tại sao khi chạy CI trên sự kiện pull_request, GitHub Actions lại kiểm thử trên một commit hợp nhất ảo (refs/pull/:id/merge) thay vì commit trên nhánh của tác giả?',
    summary: [
      'PR CI tự động kiểm tra chất lượng mã nguồn mỗi khi có yêu cầu hợp nhất mới hoặc có commit đẩy thêm.',
      'Kết hợp với Branch Protection Rules tạo thành cổng kiểm soát chất lượng tuyệt đối (Quality Gate).',
      'Ngăn chặn 100% nguy cơ mã nguồn vỡ build hoặc lỗi logic lọt vào nhánh chính.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Sự kiện nào trong GitHub Actions được kích hoạt khi một nhà phát triển tạo hoặc đẩy thêm mã vào một Pull Request?',
        options: [
          { text: 'pull_request', correct: true },
          { text: 'merge_request', correct: false },
          { text: 'code_review', correct: false },
          { text: 'pr_create', correct: false },
        ],
        explanation: 'Sự kiện `pull_request` lắng nghe mọi biến động liên quan đến vòng đời của Pull Request trong kho lưu trữ.',
      },
      {
        id: 'q2',
        question: 'Khi tính năng "Require status checks to pass before merging" được bật, điều gì sẽ xảy ra nếu bài test CI bị thất bại?',
        options: [
          { text: 'Nút Merge bị khóa chặt và không ai có thể hợp nhất mã nguồn bị lỗi vào nhánh chính', correct: true },
          { text: 'Nhánh chính tự động bị xóa', correct: false },
          { text: 'Mã nguồn tự động được hợp nhất nhưng có cảnh báo màu vàng', correct: false },
          { text: 'Lập trình viên bị trừ tiền lương tự động', correct: false },
        ],
        explanation: 'Quy tắc bảo vệ nhánh sẽ cưỡng chế việc chặn nút Merge cho đến khi tất cả các bài kiểm thử bắt buộc đều đạt kết quả xanh.',
      },
      {
        id: 'q3',
        question: 'Tại sao không nên cấu hình workflow chạy đồng thời trên `on: [push, pull_request]` cho cùng một nhánh nội bộ?',
        options: [
          { text: 'Vì khi lập trình viên đẩy commit lên nhánh của PR, workflow sẽ bị kích hoạt trùng lặp 2 lần cùng lúc', correct: true },
          { text: 'Vì làm máy chủ của GitHub bị nổ tung', correct: false },
          { text: 'Vì GitHub cấm khai báo nhiều sự kiện', correct: false },
          { text: 'Vì kết quả của hai lần chạy sẽ triệt tiêu lẫn nhau', correct: false },
        ],
        explanation: 'Việc kích hoạt cả hai sự kiện trên cùng một nhánh khiến GitHub Actions chạy hai phiên làm việc giống hệt nhau, làm tăng gấp đôi chi phí thời gian.',
      },
      {
        id: 'q4',
        question: 'Lệnh GitHub CLI nào cho phép lập trình viên theo dõi tiến độ các bài kiểm tra Status Checks của PR hiện tại?',
        options: [
          { text: 'gh pr checks', correct: true },
          { text: 'gh test status', correct: false },
          { text: 'gh ci view', correct: false },
          { text: 'gh run inspect', correct: false },
        ],
        explanation: '`gh pr checks` liệt kê chi tiết từng bài kiểm tra trạng thái đang chờ, thành công hoặc thất bại gắn liền với PR hiện tại.',
      },
      {
        id: 'q5',
        question: 'Tham chiếu Git nào được GitHub Actions tự động kiểm thử khi sự kiện pull_request được kích hoạt?',
        options: [
          { text: 'refs/pull/:number/merge', correct: true },
          { text: 'refs/heads/:feature_branch', correct: false },
          { text: 'refs/tags/:release_tag', correct: false },
          { text: 'refs/remotes/upstream/head', correct: false },
        ],
        explanation: 'GitHub Actions tự động tạo một merge commit thử nghiệm tại `refs/pull/:number/merge` để kiểm tra xung đột và tính toàn vẹn của mã sau khi hợp nhất.',
      },
      {
        id: 'q6',
        question: 'Trong quy trình CI Pull Request, trạng thái nào sau đây của Status Check biểu thị rằng bài kiểm tra đang được chạy?',
        options: [
          { text: 'pending', correct: true },
          { text: 'success', correct: false },
          { text: 'failure', correct: false },
          { text: 'cancelled', correct: false },
        ],
        explanation: 'Trạng thái `pending` cho biết workflow hoặc job kiểm thử đang trong quá trình thực thi trên runner và chưa có kết luận cuối cùng.',
      },
    ],
  },
  {
    id: '18-environments-and-deployment',
    title: 'Môi trường triển khai (Environments) & Cổng phê duyệt Protection Rules',
    duration: 35,
    xp: 110,
    prerequisites: ['17-pull-request-ci'],
    keywords: ['environments', 'deployment', 'protection rules', 'required reviewers', 'cd pipeline'],
    objectives: [
      'Nắm vững khái niệm Deployment Environments trong GitHub (Production, Staging, Development).',
      'Cấu hình cổng phê duyệt của con người (Required Reviewers) trước khi Job triển khai được phép chạy.',
      'Sử dụng các biến và bí mật riêng biệt theo từng môi trường cụ thể.',
    ],
    commands: ['gh deployment list', 'echo "Deploying to production server"'],
    definition:
      'Deployment Environments (Môi trường triển khai) là tính năng của GitHub cho phép bạn mô hình hóa các mục tiêu triển khai thực tế như Production, Staging hay Development. Mỗi môi trường có thể được thiết lập các quy tắc bảo vệ riêng biệt (Environment Protection Rules) bao gồm: bắt buộc có sự phê duyệt thủ công từ những người chỉ định (Required Reviewers), thời gian chờ (Wait Timer), giới hạn nhánh được phép triển khai, và sở hữu kho lưu trữ Secrets/Variables riêng biệt.',
    why:
      'Tự động hóa hoàn toàn là tuyệt vời, nhưng triển khai lên máy chủ sản xuất phục vụ người dùng thực tế tiềm ẩn rủi ro tài chính to lớn. Bạn không bao giờ muốn một commit vô tình được đẩy vào lúc nửa đêm tự động ghi đè lên cơ sở dữ liệu khách hàng. Cổng phê duyệt môi trường tạo ra điểm dừng kiểm soát an toàn tối thượng: pipeline tạm dừng, gửi email thông báo cho trưởng nhóm kỹ thuật, và chỉ khi họ bấm nút "Approve and deploy" thì Job mới tiếp tục chạy.',
    mentalModel:
      'Hãy hình dung chiếc chìa khóa đôi để phóng tên lửa vũ trụ trong các trung tâm chỉ huy quân sự cấp cao. Kỹ sư tự động hóa đã chuẩn bị xong toàn bộ bệ phóng, kiểm tra máy tính và nạp đầy đủ nhiên liệu cần thiết (tương đương với các bài kiểm thử unit test đã vượt qua). Nhưng để tên lửa thực sự rời bệ phóng lao lên không gian (triển khai lên production thực tế), bắt buộc phải có hai vị chỉ huy trưởng (Required Reviewers) cùng tra chiếc chìa khóa định danh, xem xét kỹ lưỡng và vặn nút phê duyệt đồng ý trên bảng điều khiển trung tâm.',
    diagram:
      'Quy trình dừng chờ phê duyệt môi trường (Environment Gate):\n[Job: Build & Test] ──► [Thành công ✓]\n                           │\n                           ▼\n[Job: Deploy Production] (environment: production)\n                           │\n                           ▼\n        ┌──────────────────────────────────────┐\n        │ TRẠNG THÁI: WAITING APPROVAL ⏸️       │\n        │ Gửi thông báo tới: Lead Engineer      │\n        └──────────────────┬───────────────────┘\n                           │\n               ┌───────────┴───────────┐\n               ▼                       ▼\n        [Bấm APPROVE ✓]         [Bấm REJECT ✗]\n               │                       │\n               ▼                       ▼\n     [Thực thi Deploy]         [Hủy bỏ phiên chạy]',
    example:
      'Một công ty fintech quản lý môi trường triển khai có tên `production`. Trong phần thiết lập môi trường, họ chỉ định 2 kỹ sư trưởng làm Required Reviewers và chỉ cho phép triển khai từ nhánh `main`. Khi một bản vá lỗi được gộp vào nhánh chính, Job biên dịch chạy hoàn tất trong 3 phút, sau đó Job triển khai chuyển sang trạng thái màu vàng: "Waiting for review". Trưởng nhóm nhận được thông báo trên điện thoại, xem xét danh sách các thay đổi và bấm nút "Approve and deploy". Ngay lập tức, máy ảo Runner được cấp phát và mã nguồn được đẩy lên hệ thống máy chủ ngân hàng an toàn.',
    commandSnippet: 'gh deployment list\necho "Deploying to production server"',
    commandExplanation:
      'Lệnh gh deployment list hiển thị lịch sử các lần triển khai lên các môi trường, giúp theo dõi phiên bản nào đang hoạt động trên máy chủ nào.',
    mistakes: [
      'Không cấu hình Environment Protection Rules khiến bất kỳ ai có quyền commit lên nhánh cũng có thể kích hoạt triển khai lên production.',
      'Sử dụng chung một mã khóa API cho cả môi trường kiểm thử (staging) và sản xuất (production).',
      'Bỏ qua việc giới hạn nhánh khiến các nhánh thử nghiệm cá nhân cũng có thể kích hoạt môi trường production.',
    ],
    labSteps: [
      'Khai báo thuộc tính `environment: production` bên trong định nghĩa của Job `deploy`.',
      'Cấu hình biến môi trường riêng biệt theo môi trường để kiểm tra tính năng cách ly.',
      'Quan sát trạng thái Job tạm dừng và yêu cầu xác nhận phê duyệt trước khi hoàn thành.',
    ],
    hint: 'Tính năng Environment Protection Rules yêu cầu kho lưu trữ Public hoặc tài khoản GitHub Enterprise/Team.',
    validation: 'Job triển khai dừng lại ở trạng thái chờ phê duyệt và chỉ hoàn thành khi có sự chấp thuận.',
    quizIntro: 'Hãy kiểm tra mức độ hiểu biết của bạn về Môi trường và Cổng phê duyệt trong CD qua các câu hỏi sau.',
    challenge:
      'Làm thế nào để kết hợp tính năng Wait Timer (thời gian chờ trì hoãn) với Required Reviewers để ngăn ngừa việc triển khai nóng vội?',
    summary: [
      '`environment` mô hình hóa các môi trường triển khai thực tế như `production`, `staging`.',
      'Cung cấp cổng bảo vệ kiểm duyệt với cơ chế phê duyệt thủ công (Required Reviewers).',
      'Cho phép định nghĩa các Secrets và Variables độc quyền chỉ có hiệu lực trong môi trường đó.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Thuộc tính nào trong Job của GitHub Actions được sử dụng để liên kết với một môi trường triển khai?',
        options: [
          { text: 'environment', correct: true },
          { text: 'deploy_to', correct: false },
          { text: 'target_stage', correct: false },
          { text: 'server_env', correct: false },
        ],
        explanation: 'Từ khóa `environment:` chỉ định môi trường triển khai và kích hoạt các quy tắc bảo vệ tương ứng của môi trường đó.',
      },
      {
        id: 'q2',
        question: 'Khi một Job liên kết với môi trường có quy tắc "Required reviewers", Job sẽ chuyển sang trạng thái nào?',
        options: [
          { text: 'Waiting for review (tạm dừng chờ người được chỉ định phê duyệt)', correct: true },
          { text: 'Thất bại ngay lập tức', correct: false },
          { text: 'Tự động chạy qua mà không cần đợi', correct: false },
          { text: 'Tự động hủy toàn bộ kho lưu trữ', correct: false },
        ],
        explanation: 'Job sẽ kiên nhẫn chờ đợi tín hiệu Approve từ một trong những người kiểm duyệt được chỉ định trước khi bắt đầu chạy các Step.',
      },
      {
        id: 'q3',
        question: 'Lợi ích của việc lưu trữ Secret ở cấp độ Environment thay vì cấp độ Repository là gì?',
        options: [
          { text: 'Chỉ các Job được cấp quyền chạy trên môi trường đó mới có thể giải mã và đọc được Secret này', correct: true },
          { text: 'Làm cho Secret có thể xem được bởi tất cả mọi người trên mạng', correct: false },
          { text: 'Secret sẽ tự động đổi mật khẩu mỗi ngày', correct: false },
          { text: 'Không có lợi ích gì khác biệt', correct: false },
        ],
        explanation: 'Environment Secrets giúp cách ly tuyệt đối thông tin nhạy cảm: ví dụ token production không bao giờ bị lộ cho các Job chạy trên môi trường staging.',
      },
      {
        id: 'q4',
        question: 'Ai có quyền bấm nút phê duyệt (Approve) cho một Job đang chờ kiểm duyệt môi trường?',
        options: [
          { text: 'Các cá nhân hoặc nhóm người dùng được chỉ định cụ thể trong danh sách Required Reviewers của môi trường đó', correct: true },
          { text: 'Bất kỳ người dùng nào ghé thăm trang web GitHub', correct: false },
          { text: 'Chỉ duy nhất người đã viết dòng code đó', correct: false },
          { text: 'Robot tự động của GitHub', correct: false },
        ],
        explanation: 'Người quản trị có toàn quyền chỉ định danh sách các kỹ sư đáng tin cậy chịu trách nhiệm ký duyệt cho từng môi trường.',
      },
    ],
  },
  {
    id: '19-reusable-workflows',
    title: 'Tái sử dụng luồng công việc với Reusable Workflows (workflow_call)',
    duration: 35,
    xp: 110,
    prerequisites: ['18-environments-and-deployment'],
    keywords: ['reusable workflows', 'workflow call', 'modular ci', 'dry principle', 'enterprise standard'],
    objectives: [
      'Hiểu rõ sự kiện workflow_call để biến một workflow bình thường thành một mô-đun tái sử dụng.',
      'Áp dụng nguyên lý DRY (Don\'t Repeat Yourself) để chuẩn hóa quy trình CI/CD trên quy mô toàn doanh nghiệp.',
      'Biết cách định nghĩa và truyền inputs, secrets giữa Caller Workflow và Called Workflow.',
    ],
    commands: ['cat .github/workflows/reusable-build.yml', 'cat .github/workflows/caller.yml'],
    definition:
      'Reusable Workflows (Luồng công việc tái sử dụng) là tính năng mạnh mẽ cho phép bạn đóng gói một workflow hoàn chỉnh để nhiều workflow khác (hoặc thậm chí nhiều kho lưu trữ khác trong tổ chức) có thể gọi lại mà không cần phải sao chép mã nguồn. Một workflow trở thành có thể tái sử dụng khi sự kiện kích hoạt của nó được khai báo là on: workflow_call. Workflow thực hiện cuộc gọi được gọi là Caller Workflow, và workflow được gọi là Called Workflow.',
    why:
      'Trong các công ty có hàng chục vi dịch vụ (Microservices), nếu mỗi kho lưu trữ đều tự viết một tệp YAML kiểm thử và đóng gói Docker riêng biệt, thì khi cần nâng cấp phiên bản bảo mật hoặc thay đổi địa chỉ máy chủ, kỹ sư sẽ phải sửa đổi thủ công hàng chục tệp YAML giống hệt nhau. Reusable Workflows giúp tập trung hóa toàn bộ logic vào một nơi duy nhất: sửa một nơi, toàn bộ công ty được cập nhật tự động.',
    mentalModel:
      'Hãy so sánh việc lập trình không có cấu trúc hàm con (phải sao chép cùng một đoạn mã dài lặp đi lặp lại khắp nơi trong dự án) với việc định nghĩa một Hàm dùng chung (Function/Method) mẫu mực. Reusable Workflow chính là một Hàm tiêu chuẩn ở cấp độ hạ tầng DevOps: nó có tên định danh hàm (đường dẫn tệp YAML), các tham số đầu vào (inputs), các dữ liệu trả về (outputs), và có thể được triệu gọi từ bất kỳ đâu chỉ bằng một dòng lệnh uses đơn giản.',
    diagram:
      'Mô hình gọi Reusable Workflow:\n[Caller Workflow: main-app/.github/workflows/ci.yml]\njobs:\n  call-build:\n    uses: company-templates/.github/workflows/standard-build.yml@main\n    with:\n      node-version: 20\n    secrets: inherit\n                     │\n                     ▼ Kích hoạt\n[Called Reusable Workflow: standard-build.yml]\non:\n  workflow_call:\n    inputs: [node-version]\njobs:\n  compile-and-test: [run-build]',
    example:
      'Một ngân hàng số duy trì hơn 50 dự án vi dịch vụ viết bằng ngôn ngữ Java Spring Boot. Đội ngũ kỹ sư nền tảng (Platform Team) tạo một kho lưu trữ trung tâm chứa tệp reusable workflow `.github/workflows/maven-enterprise-build.yml` đã được cấu hình sẵn các bước quét bảo mật SonarQube, kiểm tra bản quyền mã nguồn và đóng gói JAR chuẩn chỉ. Tất cả 50 nhóm phát triển ứng dụng chỉ cần viết một tệp caller workflow ngắn gọn gồm 6 dòng gọi đến tệp mẫu dùng chung. Khi ngân hàng ban hành chính sách bảo mật mới, Platform Team chỉ cần chỉnh sửa một dòng trong tệp reusable duy nhất, toàn bộ 50 dự án lập tức áp dụng tiêu chuẩn mới mà không cần chạm vào mã nguồn của từng nhóm.',
    commandSnippet: 'cat .github/workflows/reusable-build.yml\ncat .github/workflows/caller.yml',
    commandExplanation:
      'Các câu lệnh trên dùng để xem và đối chiếu cấu trúc giữa tệp định nghĩa tái sử dụng (chứa workflow_call) và tệp gọi thực thi (chứa khóa uses trỏ tới tệp đó).',
    mistakes: [
      'Cố gắng gọi một Reusable Workflow lồng nhau quá 4 cấp độ (GitHub giới hạn tối đa 4 tầng workflow lồng nhau).',
      'Quên khai báo từ khóa `secrets: inherit` khiến Called Workflow không thể truy cập các biến bí mật cần thiết của kho lưu trữ.',
      'Sử dụng sai cú pháp đường dẫn tệp tin tương đối hoặc quên ghim phiên bản nhánh/tag `@main`.',
    ],
    labSteps: [
      'Tạo một tệp `.github/workflows/reusable-test.yml` có sự kiện kích hoạt `on: workflow_call`.',
      'Khai báo một tham số đầu vào `inputs: os-type:` có kiểu dữ liệu chuỗi.',
      'Tạo tệp `caller.yml` gọi tới tệp trên bằng cú pháp `uses: ./.github/workflows/reusable-test.yml`.',
    ],
    hint: 'Sử dụng `secrets: inherit` trong Job gọi để tự động truyền toàn bộ Secrets của Caller sang Called Workflow một cách tiện lợi.',
    validation: 'Called Workflow được nạp và thực thi trơn tru như một Job bình thường trong giao diện của Caller.',
    quizIntro: 'Kiểm tra kiến thức về thiết kế và sử dụng Reusable Workflows qua bài trắc nghiệm sau.',
    challenge:
      'Phân tích sự khác biệt cơ bản về phạm vi và năng lực giữa một Custom Composite Action (tái sử dụng các Step) và một Reusable Workflow (tái sử dụng toàn bộ các Job)?',
    summary: [
      '`workflow_call` biến một workflow thành mô-đun có thể tái sử dụng từ các workflow khác.',
      'Tuân thủ triệt để nguyên lý DRY, giúp chuẩn hóa và bảo trì quy trình CI/CD tập trung cho nhiều dự án.',
      'Hỗ trợ định nghĩa rõ ràng các tham số đầu vào `inputs`, đầu ra `outputs` và chia sẻ `secrets`.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Sự kiện kích hoạt nào bắt buộc phải có để một workflow có thể được gọi lại từ một workflow khác?',
        options: [
          { text: 'workflow_call', correct: true },
          { text: 'workflow_dispatch', correct: false },
          { text: 'repository_dispatch', correct: false },
          { text: 'external_call', correct: false },
        ],
        explanation: '`workflow_call` là sự kiện đặc thù được GitHub thiết kế riêng để biến workflow thành Reusable Workflow.',
      },
      {
        id: 'q2',
        question: 'Để gọi một Reusable Workflow nằm trong cùng kho lưu trữ, cú pháp `uses:` nào sau đây là chính xác?',
        options: [
          { text: 'uses: ./.github/workflows/my-reusable.yml', correct: true },
          { text: 'uses: local/my-reusable', correct: false },
          { text: 'import: my-reusable.yml', correct: false },
          { text: 'include: ./.github/workflows/my-reusable.yml', correct: false },
        ],
        explanation: 'Với các workflow tái sử dụng trong cùng một kho lưu trữ, bạn sử dụng đường dẫn tương đối bắt đầu bằng `./.github/workflows/`.',
      },
      {
        id: 'q3',
        question: 'Tùy chọn nào giúp tự động chuyển toàn bộ các biến bí mật (Secrets) từ Caller Workflow sang Reusable Workflow?',
        options: [
          { text: 'secrets: inherit', correct: true },
          { text: 'secrets: all', correct: false },
          { text: 'pass_secrets: true', correct: false },
          { text: 'share_all_secrets: true', correct: false },
        ],
        explanation: 'Từ khóa `secrets: inherit` giúp kế thừa toàn bộ Secrets có sẵn mà không cần phải ánh xạ thủ công từng biến một.',
      },
      {
        id: 'q4',
        question: 'Số cấp độ lồng nhau tối đa (nesting depth) mà GitHub Actions cho phép đối với Reusable Workflows là bao nhiêu?',
        options: [
          { text: 'Tối đa 4 cấp độ (workflow A gọi B, B gọi C, C gọi D)', correct: true },
          { text: 'Không giới hạn số cấp độ', correct: false },
          { text: 'Chỉ duy nhất 1 cấp độ', correct: false },
          { text: 'Tối đa 100 cấp độ', correct: false },
        ],
        explanation: 'GitHub Actions giới hạn tối đa 4 tầng lồng nhau để ngăn chặn nguy cơ vòng lặp vô hạn và làm phức tạp hóa pipeline.',
      },
    ],
  },
  {
    id: '20-ci-cd-capstone',
    title: 'Capstone Project: Xây dựng hoàn chỉnh CI/CD Pipeline cho Web Application',
    duration: 50,
    xp: 250,
    prerequisites: ['19-reusable-workflows'],
    keywords: ['ci cd capstone', 'enterprise pipeline', 'end to end devops', 'production deployment', 'mastery challenge'],
    objectives: [
      'Tổng hợp toàn bộ kiến thức Level 7 để thiết kế một đường ống CI/CD chuẩn doanh nghiệp hoàn chỉnh từ A đến Z.',
      'Xây dựng quy trình tự động hóa đa tầng: Linting, Unit Testing, Matrix Build, Đóng gói Artifacts và Triển khai có phê duyệt.',
      'Tích hợp bảo vệ nhánh Branch Protection Rules, quản lý Secrets an toàn và xử lý phục hồi lỗi linh hoạt.',
    ],
    commands: ['gh pr create', 'gh pr checks', 'gh run watch', 'git push origin main'],
    definition:
      'Bài học Capstone là thử thách thực chiến tổng hợp đỉnh cao của Level 7. Trong bài thực hành này, bạn sẽ vào vai một Kỹ sư DevOps trưởng (Lead DevOps Engineer) chịu trách nhiệm thiết kế, cấu hình và vận hành toàn bộ hạ tầng tự động hóa CI/CD cho một ứng dụng web thương mại điện tử hiện đại. Đường ống phải đáp ứng đầy đủ các tiêu chuẩn khắt khe nhất của ngành: kiểm tra an ninh, kiểm thử đa nền tảng, quản lý tạo phẩm và cổng triển khai sản xuất có kiểm duyệt.',
    why:
      'Biết từng mảnh ghép lý thuyết riêng lẻ (events, jobs, steps, matrix, secrets) là chưa đủ để vận hành một hệ thống thực tế. Giá trị thực sự của một kỹ sư phần mềm chuyên nghiệp thể hiện ở khả năng kết nối tất cả các thành phần đó lại với nhau thành một cỗ máy hoạt động trơn tru, tin cậy, bảo vệ sự ổn định của hệ thống kinh doanh 24/7 trước hàng trăm thay đổi mã nguồn mỗi tuần.',
    mentalModel:
      'Hãy tưởng tượng bạn là tổng công trình sư thiết kế một nhà máy lọc dầu tự động hóa hoàn toàn. Dầu thô (mã nguồn mới) được đưa vào ống dẫn; hệ thống tự động lọc tạp chất và kiểm tra độ tinh khiết (CI lint & test); sau đó được phân tách thành các sản phẩm xăng dầu chuyên biệt theo ma trận tiêu chuẩn (matrix build); các sản phẩm đạt chuẩn được bơm vào kho bảo quản an toàn (artifacts); và cuối cùng, chỉ khi có chữ ký điện tử của giám đốc an toàn (environment approval), van dẫn mới được mở để cung cấp nhiên liệu ra thị trường (production deployment).',
    diagram:
      'Kiến trúc Pipeline Capstone chuẩn Doanh nghiệp:\n[Event: PR to main]\n       │\n       ├─────────────────────────┐\n       ▼                         ▼\n[Job 1: Code Lint & Format]  [Job 2: Security & Secret Scan]\n       │                         │\n       └────────────┬────────────┘\n                    ▼\n[Job 3: Matrix Unit Test (Node 18, 20 on Ubuntu & Windows)]\n                    │\n                    ▼ (needs: [lint, security, test])\n[Job 4: Build Web Application & Upload Artifact]\n                    │\n                    ▼ (needs: build)\n[Job 5: Deploy to Staging Environment]\n                    │\n                    ▼ (needs: staging, on: push main)\n[Job 6: Deploy to Production (WAITING APPROVAL Gate)]',
    example:
      'Một công ty khởi nghiệp chuẩn bị ra mắt nền tảng thanh toán trực tuyến. Lập trình viên hoàn thành bài tập Capstone bằng việc tạo hai tệp workflow: `ci.yml` kiểm soát chất lượng mã nguồn trên mọi Pull Request và `deploy.yml` tự động hóa việc đưa sản phẩm lên các máy chủ đám mây. Khi một thành viên trong nhóm mở PR thêm chức năng giỏ hàng, đường ống lập tức khởi động 4 Jobs kiểm tra song song: lint mã nguồn, quét mã độc, chạy ma trận 4 bài kiểm thử trên cả Linux và Windows. Khi PR được duyệt và gộp vào nhánh chính, đường ống triển khai tự động kích hoạt, tạo gói nén artifact, đẩy lên môi trường Staging và gửi yêu cầu phê duyệt cho giám đốc kỹ thuật trước khi đưa lên Production. Toàn bộ quy trình diễn ra tự động 100%, không một sai sót.',
    commandSnippet: 'gh pr create\ngh pr checks\ngh run watch\ngit push origin main',
    commandExplanation:
      'Các câu lệnh trên đại diện cho chu trình làm việc trọn vẹn của một kỹ sư: mở Pull Request đề xuất tính năng mới, theo dõi trạng thái các bài kiểm tra tự động và giám sát tiến độ thực thi của toàn bộ pipeline.',
    mistakes: [
      'Để lọt các câu lệnh chạy thật trên máy chủ host thay vì mô phỏng trong môi trường an toàn.',
      'Cấu hình sai thứ tự phụ thuộc `needs` khiến Job triển khai chạy trước khi bài kiểm thử kết thúc.',
      'Làm lộ thông tin khóa bí mật trong log của Job đóng gói sản phẩm.',
    ],
    labSteps: [
      'Xây dựng hoàn chỉnh tệp `.github/workflows/ci-cd-pipeline.yml` kết hợp đầy đủ các tính năng đã học.',
      'Thiết lập ma trận kiểm thử cho ít nhất 2 phiên bản môi trường.',
      'Cấu hình cổng phê duyệt an toàn cho Job triển khai sản xuất cuối cùng.',
    ],
    hint: 'Hãy vẽ sơ đồ các Job và thứ tự phụ thuộc ra giấy trước khi bắt đầu viết những dòng YAML đầu tiên.',
    validation: 'Toàn bộ đồ thị đường ống hoàn thành với tất cả các cổng kiểm soát hoạt động chuẩn mực tuyệt đối.',
    quizIntro: 'Hãy hoàn thành bài kiểm tra tổng hợp kiến thức toàn diện của Level 7 CI/CD Capstone.',
    challenge:
      'Thiết kế giải pháp tự động hoàn tác (Rollback Pipeline) khi hệ thống giám sát sau triển khai phát hiện lỗi nghiêm trọng trên máy chủ sản xuất?',
    summary: [
      'Hoàn thành xuất sắc toàn bộ các khối kiến thức cốt lõi của GitHub Actions và đường ống CI/CD hiện đại.',
      'Làm chủ từ cú pháp YAML, quản lý sự kiện, ma trận kiểm thử cho đến bảo mật bí mật và phê duyệt môi trường.',
      'Sẵn sàng tự tin áp dụng tự động hóa chuyên nghiệp vào bất kỳ dự án phần mềm thực tế nào trong doanh nghiệp.',
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Trong một đường ống CI/CD hoàn chỉnh, thứ tự thực thi chuẩn mực nhất của các giai đoạn là gì?',
        options: [
          { text: 'Lint & Test -> Build & Package -> Deploy Staging -> Phê duyệt -> Deploy Production', correct: true },
          { text: 'Deploy Production -> Build -> Test -> Lint', correct: false },
          { text: 'Deploy Staging -> Lint -> Deploy Production -> Test', correct: false },
          { text: 'Chỉ cần Deploy Production, không cần kiểm thử', correct: false },
        ],
        explanation: 'Quy trình chuẩn luôn đi từ kiểm tra chất lượng mã nguồn sớm nhất, sau đó mới đóng gói, thử nghiệm trên staging và cuối cùng mới lên production.',
      },
      {
        id: 'q2',
        question: 'Thành phần nào đóng vai trò như chốt chặn an ninh ngăn không cho mã nguồn lỗi lọt vào nhánh chính?',
        options: [
          { text: 'Branch Protection Rules kết hợp với Required Status Checks của CI', correct: true },
          { text: 'Tệp tin .gitignore', correct: false },
          { text: 'Lời nhắc nhở bằng miệng giữa các đồng nghiệp', correct: false },
          { text: 'Phần mềm diệt virus trên máy tính cá nhân', correct: false },
        ],
        explanation: 'Quy tắc bảo vệ nhánh kết hợp với CI Status Check là giải pháp cơ học tự động hóa không thể bị qua mặt bằng sự bất cẩn của con người.',
      },
      {
        id: 'q3',
        question: 'Khi triển khai lên môi trường Production, thực hành nào sau đây là quan trọng nhất để đảm bảo an toàn?',
        options: [
          { text: 'Áp dụng Environment Protection Rules với Required Reviewers và sử dụng Secrets riêng biệt', correct: true },
          { text: 'Triển khai vào lúc nửa đêm để không ai biết', correct: false },
          { text: 'Tắt toàn bộ hệ thống tường lửa trước khi deploy', correct: false },
          { text: 'Xóa toàn bộ các bản sao lưu cũ để giải phóng dung lượng', correct: false },
        ],
        explanation: 'Sự phê duyệt của con người kết hợp với sự phân tách bí mật theo môi trường là chốt chặn bảo vệ tối hậu cho hệ thống sản xuất.',
      },
      {
        id: 'q4',
        question: 'Lợi ích lớn nhất mà một kỹ sư phần mềm đạt được sau khi làm chủ GitHub Actions là gì?',
        options: [
          { text: 'Tự động hóa toàn diện quy trình phát triển, giảm thiểu lỗi thủ công và nâng cao tốc độ chuyển giao phần mềm chất lượng cao', correct: true },
          { text: 'Không bao giờ phải viết mã nguồn cho ứng dụng nữa', correct: false },
          { text: 'Máy tính không bao giờ bị hỏng phần cứng', correct: false },
          { text: 'Tự động nhận được chứng chỉ tốt nghiệp mà không cần học', correct: false },
        ],
        explanation: 'Làm chủ CI/CD giúp bạn nâng tầm từ một người chỉ biết viết code thành một kỹ sư phần mềm toàn diện có tư duy tự động hóa hiện đại.',
      },
    ],
  },
];
