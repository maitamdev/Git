# Cấu trúc khóa học sau khi triển khai

## Đường đi của người học

Đăng nhập với vai trò học viên → bản đồ 8 level → level hiện tại → bài đầu tiên chưa hoàn thành → từng màn nội dung → lab mô phỏng khi bài có lab → từng câu hỏi → kết quả → bài tiếp theo. Bài sau chỉ mở khi các bài tiên quyết trong manifest đã hoàn thành. Người học có thể xem trước danh sách bài ở level chưa mở.

| Level | Chủ đề | Số bài | Kết quả hướng tới |
| --- | --- | ---: | --- |
| 1 | Nền tảng | 9 | Hiểu Git dùng để làm gì, tự tạo repository |
| 2 | Lưu thay đổi | 12 | Xem trạng thái, chọn tệp, tạo commit |
| 3 | Nhánh | 14 | Làm việc và hợp nhất trên nhánh riêng |
| 4 | GitHub | 16 | Đồng bộ remote và cộng tác qua Pull Request |
| 5 | Sửa sai | 22 | Hoàn tác và cứu thay đổi đúng cách |
| 6 | Làm nhóm | 15 | Review, bảo vệ nhánh và phát hành |
| 7 | CI/CD | 20 | Tạo workflow kiểm tra tự động |
| 8 | Bên trong Git | 20 | Hiểu object, index, ref và commit |

Tổng cộng: **128 bài**, **588 câu hỏi**, **76 bài có lab mô phỏng**. Nội dung gốc và prerequisite lấy từ `courses/`; giao diện không duy trì một danh sách bài thứ hai. Bài mở đầu đổi nhãn hiển thị thành “Vì sao cần lưu phiên bản?” để đi từ vấn đề cụ thể. Các bài còn lại dùng tên trong manifest.

## Cấu trúc một bài

1. Mở bằng mục tiêu hoặc tình huống.
2. Tách các phần Markdown thành màn ngắn: vấn đề, khái niệm, mô hình, ví dụ, sơ đồ, lệnh mẫu, lỗi thường gặp, tóm tắt. Chữ dài đặt sau nút “Xem giải thích đầy đủ”.
3. Với bài có lab, mở file và terminal mô phỏng ngay tại màn thực hành. Checklist được tính từ trạng thái simulator. Lab được khai báo bắt buộc phải đạt mới đi tiếp; lab của bài cuối mỗi level cũng là yêu cầu để mở level kế tiếp. Bài Git internals dùng bộ chạy plumbing để các lệnh `hash-object`, `update-index`, `write-tree`, `commit-tree` và `update-ref` chạy được trong capstone.
4. Mỗi câu hỏi ở một màn, người học chọn trước rồi mới nhận giải thích. Đạt ngưỡng điểm trong metadata mới hoàn thành.
5. Màn kết quả cho phép xem lại hoặc sang bài kế tiếp.

Tiến độ được lưu theo `user.id` trong trình duyệt. Khi mở lại bài, màn đọc được khôi phục; nếu phiên câu hỏi bị gián đoạn thì bắt đầu lại từ câu đầu để tránh chấm điểm thiếu câu. XP chỉ cộng khi bài chuyển sang trạng thái hoàn thành. Tài khoản cũ có thể nhận tiến độ cũ nếu `userId` khớp chính xác.

## Kiểm tra và giới hạn

`validate:courses` xác minh manifest và DAG của 128 bài. Bài kiểm thử `guided-learning.test.ts` tải mọi bài, dựng màn, kiểm tra câu hỏi, lab bắt buộc và chuỗi lệnh plumbing của capstone. Một số scenario cũ đã thỏa goal ngay từ trạng thái ban đầu; luồng học mới yêu cầu học viên chạy thành công lệnh liên quan trước khi tính lab đó. Các goal của scenario vẫn dựa trên simulator hiện có, nên bài tập remote, PR và Git internals là mô phỏng để học thao tác, không tác động đến GitHub hoặc repository thật.

## Vị trí mã

- `apps/playground/src/App.tsx`: cổng đăng nhập và chuyển học viên vào khóa học.
- `apps/playground/src/components/GuidedCourse.tsx`: bản đồ, level, bài học, lab, quiz, kết quả.
- `apps/playground/src/components/guided-course.css`: giao diện theo bộ ảnh demo.
- `apps/playground/src/learning/lesson-flow.ts`: chuyển nội dung bài thành các màn.
- `apps/playground/src/learning/lab-validation.ts`: yêu cầu bằng chứng thực hành cho lab.
- `apps/playground/src/learning/plumbing-session.ts`: chạy các lệnh plumbing và nối trạng thái capstone Git internals vào validator.
- `packages/exercise-engine/src/courses/course-repository.ts`: ghép scenario đúng với từng bài.
