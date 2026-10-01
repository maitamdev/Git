# Kiểm kê khả năng dạy thuật ngữ — 2026-10-01

Đây là kiểm kê cấu trúc, không phải xác nhận nội dung của cả khóa học đã đúng hoặc dễ hiểu. Một bài được tính là có thẻ thuật ngữ khi có 2–5 thẻ; mỗi thẻ giải thích theo cách dễ hiểu, có ví dụ và chỉ ra điều dễ nhầm.

| Level | Số bài | Bài có thẻ thuật ngữ |
| --- | ---: | ---: |
| 1 · Git Foundations | 9 | 9 |
| 2 · Git Basics | 12 | 12 |
| 3 · Branching & Merging | 14 | 14 |
| 4 · GitHub Collaboration | 16 | 16 |
| 5 · Advanced Git | 22 | 22 |
| 6 · Team Workflows | 15 | 15 |
| 7 · GitHub Actions & CI/CD | 20 | 20 |
| 8 · Git Internals | 20 | 20 |
| **Tổng** | **128** | **128** |

## Đã thay đổi

- Bỏ đăng nhập khỏi lối vào học viên; khóa học mở thẳng. Tiến độ chỉ lưu trong trình duyệt đang dùng, không đồng bộ giữa thiết bị.
- Cả 9 bài Level 1 có thẻ từ khóa riêng; các bài 4–9 đã được sửa phần giải thích và quiz để tránh yêu cầu kiến thức chưa dạy.
- Cả 12 bài Level 2 có 3–5 thẻ từ khóa, phần thực hành hoặc thao tác tự kiểm tra, và ít nhất 5 câu quiz có giải thích đáp án. Đã sửa các quiz YAML khiến câu hỏi bị bỏ khi sinh dữ liệu.
- Rút gọn những đoạn dài ở các bài Working Directory, Staging Area, HEAD, Commit Message, `git log` và vòng đời tệp; bỏ lệnh nâng cao khỏi bài `git log` và `git diff` trước khi chúng được dạy.
- Phần đọc Level 1 được rút gọn theo thứ tự: tình huống → thẻ từ khóa → giải thích → ví dụ → bài tự thử và đối chiếu → quiz.
- Level 2 tiếp tục cùng trình tự và nhấn vào làm thử từng lệnh, kiểm tra bằng `git status`/`git diff`, rồi làm quiz.
- Nội dung `Lab` bằng văn bản được chuyển thành màn thử làm nếu bài chưa có lab mô phỏng. Màn này yêu cầu người học nhập câu trả lời rồi tự so với tiêu chí; nó không thay thế một lab Git có kiểm tra tự động.
- Cổng kiểm tra cũ đòi mỗi đoạn định nghĩa 80–100 từ đã được thay bằng kiểm tra cấu trúc thẻ từ khóa. Độ dài văn bản chỉ còn là thông tin tham khảo, không còn được xem là bằng chứng chất lượng.
- Course Health hiển thị số bài có bộ thẻ từ khóa; không còn tuyên bố toàn khóa “100% đạt” dựa trên số từ.

## Còn phải làm trước khi gọi khóa học hoàn chỉnh

1. Biên tập 107 bài còn lại theo Level 3–8. Level 1–2 đã qua rà cấu trúc và sửa các điểm nội dung thấy được trong lần đọc này; độ dễ hiểu với sinh viên vẫn cần thử nghiệm người học thật.
2. Soát tính đúng của định nghĩa, ví dụ, lệnh và quiz bằng nguồn Git đáng tin; đặc biệt kiểm tra lời giải có dạy lý do thay vì chỉ báo đáp án.
3. Gắn mỗi mục tiêu học với một nhiệm vụ làm được. Bài chưa có lab mô phỏng hiện chỉ có câu trả lời tự đối chiếu, chưa được thực thi và chấm trong Git simulator.
4. Sau khi sửa nội dung, chạy lại kiểm tra từng level và thử luồng học trên trình duyệt từ đầu đến cuối.
