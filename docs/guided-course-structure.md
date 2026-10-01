# Cấu trúc khóa học có hướng dẫn

## Đường đi của người học

Mở trang → bản đồ 8 level → level hiện tại → bài tiếp theo đủ điều kiện → các màn giải thích ngắn → lab mô phỏng nếu bài có lab (nếu không thì tự làm và tự đối chiếu) → từng câu quiz → kết quả → bài tiếp theo. Không cần đăng nhập để vào khóa. Người học có thể xem danh sách bài của level chưa mở, nhưng phải hoàn thành điều kiện tiên quyết để bắt đầu bài bị khóa.

| Level | Chủ đề | Số bài | Kết quả hướng tới |
| --- | --- | ---: | --- |
| 1 | Nền tảng | 9 | Hiểu Git dùng để làm gì và khởi tạo repository |
| 2 | Lưu thay đổi | 12 | Xem trạng thái, chọn tệp và tạo commit |
| 3 | Nhánh | 14 | Làm việc và hợp nhất trên nhánh riêng |
| 4 | GitHub | 16 | Đồng bộ remote và cộng tác qua Pull Request |
| 5 | Sửa sai | 22 | Hoàn tác và cứu thay đổi đúng cách |
| 6 | Làm nhóm | 15 | Review, bảo vệ nhánh và phát hành |
| 7 | CI/CD | 20 | Tạo workflow kiểm tra tự động |
| 8 | Bên trong Git | 20 | Hiểu object, index, ref và commit |

Tổng cộng: **128 bài**, **76 bài có lab mô phỏng**, **77 scenario đăng ký**. Quiz và nội dung lấy từ `courses/`; giao diện không giữ danh sách bài thứ hai. Tiến độ lưu trong trình duyệt hiện tại, không đồng bộ sang thiết bị hoặc trình duyệt khác.

## Cấu trúc một bài

1. Mở bằng mục tiêu hoặc tình huống gần với công việc của người học.
2. Chia nội dung thành màn ngắn: thuật ngữ, giải thích, ví dụ, sơ đồ, câu cần nhớ và lỗi thường gặp. Phần giải thích dài có thể xem khi cần.
3. Bài có simulator đưa người học vào lab ngay trong giao diện. Bài chưa có simulator đưa hướng dẫn tự làm cùng tiêu chí để tự đối chiếu; tiêu chí này không được simulator tự chấm.
4. Quiz hiển thị từng câu, cho chọn đáp án rồi mới đưa lời giải. Ngưỡng đạt theo metadata của bài.
5. Màn kết quả cho biết điều kiện đã đạt và cho xem lại hoặc đi tới bài tiếp theo.

Hệ thống tiến độ gắn với người học cục bộ `local_learner`. Bài chỉ được ghi hoàn thành khi đã xem hết phần nội dung bắt buộc, đạt ngưỡng quiz và hoàn thành các lab được khai báo bắt buộc. Tiến độ được giữ lại sau khi tải lại trang trên cùng browser profile. Nếu đổi máy/trình duyệt hoặc xóa dữ liệu site, tiến độ không đi theo.

## Kiểm tra và giới hạn

- `pnpm validate:courses` xác minh manifest, thư mục bài học, phần bắt buộc và prerequisite graph của 128 bài.
- `pnpm test` bao gồm kiểm tra luồng bài, quiz, lab bắt buộc, các lệnh simulator và plumbing của capstone.
- `pnpm validate:scenarios` xác minh 77 định nghĩa và tham chiếu. Cổng này không thay cho việc tự thao tác từng scenario qua UI.
- GitHub, Pull Request và Actions được mô phỏng; lab không tạo hoặc thay đổi repository/tài khoản GitHub thật.
- Kiểm tra thủ công trên trình duyệt hiện bao phủ bài 1: vào học ẩn danh, đạt 5/5, nhận trạng thái hoàn tất, mở bài 2 và giữ tiến độ sau khi reload.

## Vị trí mã

- `apps/playground/src/App.tsx`: khởi tạo học viên cục bộ và chuyển vào khóa học.
- `apps/playground/src/components/GuidedCourse.tsx`: bản đồ, level, bài học, lab, quiz, kết quả và lưu tiến độ.
- `apps/playground/src/components/guided-course.css`: giao diện khóa học.
- `apps/playground/src/learning/lesson-flow.ts`: chuyển nội dung thành các màn.
- `apps/playground/src/learning/lab-validation.ts`: yêu cầu bằng chứng thực hành.
- `apps/playground/src/learning/plumbing-session.ts`: chạy lệnh plumbing cho bài Git internals.
- `packages/exercise-engine/src/courses/course-repository.ts`: ghép scenario với từng bài.
