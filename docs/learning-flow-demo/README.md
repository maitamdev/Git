# Đề xuất: học Git từng bước, làm được rồi mới đi tiếp

Đây là **bản nghiên cứu và ảnh demo** dùng làm hướng triển khai. Giao diện học từng level và từng màn đã được lập trình; xem [cấu trúc triển khai](../guided-course-structure.md). Mười ảnh bên dưới mô tả bản đồ toàn khóa, trang trong một level và các trạng thái chính của bài học. Các ảnh tình huống/khái niệm minh họa bài đầu; các ảnh có terminal minh họa bài tạo commit ở phần sau. Nội dung chữ trong ảnh AI chỉ là minh họa; giao diện thật dùng nội dung khóa học và trạng thái simulator.

## Vấn đề quan sát được

- Ảnh giao diện hiện tại dành 380 px cho toàn bộ lý thuyết, khiến một đoạn định nghĩa dài chiếm hết vùng đọc trong khi editor, graph và terminal trống phần lớn màn hình.
- `LessonPanel.tsx` gọi `onTheoryViewed()` ngay khi mở tab lý thuyết; hành động đó chưa chứng minh người học hiểu hoặc làm được.
- Bài `01-version-control` chứa định nghĩa, lý do, ẩn dụ, sơ đồ, ví dụ, lệnh, lab, quiz và challenge trong một luồng cuộn dài. Người học phải tự đoán thứ tự và lúc nào nên thực hành.
- Sidebar mở sẵn cả 8 level; tổng 128 bài tạo cảm giác khối lượng lớn ngay lúc bắt đầu.

## Nguyên tắc thiết kế bài học

1. Mỗi màn có **một ý mới, một hành động rõ ràng, một điều kiện đi tiếp**. Đây là quyết định thiết kế để giảm nhiễu trên giao diện hiện tại, không phải một con số cố định do nghiên cứu quy định.
2. Đi từ **tình huống → ví dụ làm mẫu → làm có hướng dẫn → tự làm trong tình huống mới**. Gợi ý lùi dần theo năng lực; không đưa lệnh mẫu sẵn ở bài kiểm tra tự làm.
3. Mọi thao tác có phản hồi nói rõ **đang thiếu gì, vì sao, bước tiếp theo là gì**. Sai thì thử lại, không mất quyền học.
4. Hoàn thành bài bằng **bằng chứng hành động**: trạng thái simulator đúng, giải thích ngắn hoặc chọn quyết định đúng trong tình huống mới. Không tính hoàn thành chỉ vì đã mở tab hay cuộn hết trang.
5. Terminal, graph, file tree chỉ hiện khi cần để giải quyết nhiệm vụ hiện tại. Đầu bài chỉ hiện câu chuyện và câu hỏi; vào lab mới mở công cụ.
6. Luôn có nút **Xem lại**, **Cần gợi ý?** và **Tiếp tục**. Trên một màn chỉ có một nút chính.

Các nguyên tắc 2–4 dựa trên hướng dẫn về [worked examples và giảm dần hỗ trợ](https://educationendowmentfoundation.org.uk/news/supporting-pupils-with-worked-examples), [phản hồi cụ thể để cải thiện nhiệm vụ](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback), [lập kế hoạch, theo dõi và tự đánh giá](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation). Cách chia đơn vị với mục tiêu rõ và làm lại sau hỗ trợ phù hợp [mastery learning](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/mastery-learning); mức chắc chắn của bằng chứng cho phương pháp này còn hạn chế, nên cần kiểm tra bằng dữ liệu học thực tế. Thứ tự khái niệm và lệnh Git đối chiếu với [Pro Git: Getting Started](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) và [Git Basics](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository).

## Cấu trúc 8 level

| Level | Người học **làm được** sau level | Bài kết thúc để chứng minh |
| --- | --- | --- |
| 1. Nền tảng | Giải thích vì sao cần lưu phiên bản, phân biệt Git/GitHub, cài đặt và `git init` | Tạo repo nhỏ và chỉ ra thư mục nào đang được Git quản lý |
| 2. Lưu thay đổi | Dùng `status`, `add`, `commit`, `log`, `diff`; biết tệp nào sẽ vào commit | Sửa README, chỉ stage đúng tệp, commit và kiểm tra lịch sử |
| 3. Nhánh | Tạo nhánh, chuyển nhánh, merge và giải quyết xung đột đơn giản | Hoàn thành một tính năng riêng rồi đưa vào `main` |
| 4. GitHub | Kết nối remote, push/pull, mở PR, đọc nhận xét | Đưa thay đổi lên repo nhóm và xử lý một vòng review |
| 5. Sửa sai | Chọn đúng `restore`, `reset`, `revert`, `reflog` trong từng tình huống | Cứu một thay đổi bị xóa/commit sai mà không làm mất việc khác |
| 6. Làm nhóm | Chọn workflow, bảo vệ nhánh, phân chia review và release | Hoàn thành nhiệm vụ nhóm với luật review mô phỏng |
| 7. CI/CD | Viết và sửa workflow GitHub Actions cơ bản | Làm pipeline kiểm tra tự động chạy xanh |
| 8. Bên trong Git | Giải thích object, ref, index và đường đi của commit | Tạo/đọc commit từ các thành phần Git ở bài capstone |

Level 1 chỉ giới thiệu thao tác `git init`; bài tự tạo commit đầy đủ thuộc Level 2. Ảnh trang chủ dùng câu “Tạo mốc lưu đầu tiên” như lời hứa về hành trình, không nên hiểu là yêu cầu bắt buộc của bài đầu. Khi làm giao diện thật cần sửa dòng mục tiêu “Hôm nay” thành “Nhận ra khi nào cần một mốc lưu”.

Ảnh trang trong Level 1 là **thứ tự bài đề xuất**. Manifest hiện tại đặt “Local / Centralized / Distributed VCS” ở bài 2 và “Git là gì?” ở bài 3; nên chuyển phần phân loại VCS thành đọc thêm hoặc đặt sau khi người học đã có trải nghiệm tạo repository. Cần rà lại prerequisite và tiến độ khi đổi thứ tự thật.

## Bài đầu: “Vì sao cần lưu phiên bản?” — 6 màn cụ thể

| Màn | Người học thấy | Người học làm | Điều kiện đi tiếp |
| --- | --- | --- | --- |
| 1. Tình huống | `project-final`, `project-final-v2` và câu hỏi “Nếu sửa hỏng, quay lại bản nào?” | Chọn một đáp án | Chọn xong mới mở giải thích; đáp án “Không chắc” dẫn vào nhu cầu lưu lịch sử |
| 2. Một khái niệm | Ba mốc trên cùng một timeline, mỗi mốc có thay đổi cụ thể | Chỉ ra mốc “Thêm giao diện” | Nêu đúng mốc và thay đổi |
| 3. Xem mẫu | Mẫu so sánh trước/sau của một tệp, người hướng dẫn nghĩ thành tiếng | Dự đoán kết quả trước khi xem mẫu hoàn chỉnh | Trả lời dự đoán |
| 4. Làm có hướng dẫn | Ba phiên bản của cùng tệp và một lỗi mới phát sinh | Chọn mốc an toàn để xem lại | Simulator xác nhận mốc phù hợp; sai thì giải thích cụ thể |
| 5. Tự làm | Tình huống khác, không có lời giải mẫu | Chọn mốc và giải thích ngắn vì sao | Quyết định đúng và lý do chấp nhận được |
| 6. Tổng kết | Timeline do người học vừa thao tác | Nói lại một câu “Git giúp tôi…” | Ghi tiến độ, gợi bài tiếp theo |

Màn 3–6 trong bộ ảnh là **mẫu cho một bài thao tác ở Level 2**: xem `git add`, tự gõ trong terminal, nhận phản hồi khi quên staging, tự làm một tình huống mới, rồi xem bằng chứng hoàn thành. Vì vậy ảnh 1–8 là bộ trạng thái thiết kế, không phải 8 ảnh liên tiếp của cùng một bài.

## Quy tắc triển khai cho mỗi bài sau này

- Bài khái niệm: tình huống → một hình/ý chính → dự đoán → quyết định trong tình huống → giải thích → tổng kết.
- Bài lệnh: vấn đề → xem mẫu ngắn → làm từng bước trong simulator → phản hồi theo trạng thái thật → bài tương tự không gợi ý → tổng kết.
- Bài capstone: chỉ nêu mục tiêu và tiêu chí; học viên tự chọn lệnh. Khi vướng, gợi ý theo tầng: hỏi định hướng → chỉ vùng lỗi → mới cho cú pháp.
- Dùng lại bài cũ ở level sau bằng một câu hỏi ngắn trong ngữ cảnh mới, thay vì chỉ thêm trắc nghiệm nhớ định nghĩa.
- Trang tiến độ hiển thị **bài hiện tại và bài kế tiếp**; toàn khóa vẫn có thể xem trong bản đồ level nhưng không mở toàn bộ sidebar mặc định.

## Ảnh demo

1. [Bản đồ 8 level](01-level-map.png)
2. [Bên trong Level 1: chọn bài kế tiếp](09-level-overview.png)
3. [Mở bài bằng tình huống](02-hook-question.png)
4. [Một khái niệm qua hình](03-one-concept.png)
5. [Bài tập khái niệm của bài đầu](10-concept-practice.png)
6. [Xem mẫu một thao tác ở bài Git cơ bản](04-guided-example.png)
7. [Tự thao tác có hướng dẫn](05-hands-on-lab.png)
8. [Phản hồi khi làm sai](06-corrective-feedback.png)
9. [Bài tự làm không có mẫu](07-independent-challenge.png)
10. [Hoàn thành và sang bài tiếp](08-lesson-complete.png)

Lưu ý khi lập trình: ảnh phản hồi đang hiển thị luôn câu lệnh sửa dù có nút “Xem gợi ý”; bản thật nên chỉ hiện nguyên nhân trước, rồi mở gợi ý theo yêu cầu. Ảnh hoàn thành thuộc bài tạo commit ở Level 2. Chữ và logic trong UI thật phải lấy từ nội dung bài/validator, không lấy trực tiếp từ ảnh tạo bởi AI.
