# Kiểm toán khả năng dạy — Git Academy

Cập nhật: 2026-10-01. Tài liệu này ghi lại tình trạng nội dung và bằng chứng đã kiểm tra; các cổng tự động là kiểm tra cấu trúc, không thay thế đánh giá của giảng viên hoặc thử nghiệm với sinh viên.

## Phạm vi khóa học

| Level | Chủ đề | Bài học | Bài có Git simulator |
| --- | --- | ---: | ---: |
| 1 | Nền tảng Git | 9 | 3 |
| 2 | Git căn bản | 12 | 8 |
| 3 | Nhánh và hợp nhất | 14 | 10 |
| 4 | Cộng tác trên GitHub | 16 | 9 |
| 5 | Git nâng cao | 22 | 16 |
| 6 | Quy trình làm việc nhóm | 15 | 7 |
| 7 | GitHub Actions và CI/CD | 20 | 14 |
| 8 | Bên trong Git | 20 | 9 |
| **Tổng** | **Toàn khóa** | **128** | **76** |

52 bài còn lại có hướng dẫn tự làm và tiêu chí tự đối chiếu; đó không phải là bài thực hành được simulator tự chấm. Khóa cũng có 77 scenario đăng ký; cổng scenario xác nhận cấu trúc và liên kết, còn các bài test engine kiểm tra hành vi simulator.

## Cách nội dung được tổ chức

- Bài học dùng các màn ngắn theo thứ tự: tình huống hoặc mục tiêu → giải thích từng khái niệm → ví dụ → tự làm hoặc lab → phản hồi/tiêu chí kiểm tra → quiz và tổng kết.
- 128/128 bài có mục từ khóa. Thẻ thuật ngữ giải nghĩa bằng lời đơn giản, đưa ví dụ và nêu điểm dễ nhầm.
- 128/128 bài có quiz và thử thách. Câu hỏi có phản hồi giải thích để người học hiểu vì sao đáp án đúng.
- Những điểm nội dung đã được chỉnh trong đợt rà soát gồm thuật ngữ, thứ tự dạy trước/sau, ví dụ và lệnh Git, quiz YAML, nội dung Git internals và GitHub Actions, cùng các kịch bản simulator.
- Không đăng nhập để vào học. Tiến độ lưu trong trình duyệt hiện tại; không đồng bộ qua thiết bị hoặc trình duyệt khác.

## Bằng chứng kiểm tra hiện tại

- `pnpm generate:courses`: sinh thành công dữ liệu cho 128 bài.
- `pnpm validate:content`: 128/128 bài qua các kiểm tra nội dung tự động.
- `pnpm validate:courses`: 128/128 bài vật lý, manifest và dependency graph hợp lệ.
- `pnpm validate:scenarios`: 77/77 scenario và tham chiếu lab hợp lệ.
- `pnpm audit:content`: 128/128 quiz và thử thách; 76/128 bài có Git simulator.
- `pnpm audit:curriculum`: số bài trong manifest, filesystem, dữ liệu sinh, DAG, search index, quiz và thử thách đồng nhất.
- `pnpm test`: 63 file test, 1.035 test đều qua; các test hướng dẫn kiểm tra nội dung của cả 8 level.
- `pnpm --filter playground... build` chạy từ `apps/playground`: build thành công theo dependency workspace mà Vercel cần.
- Kiểm tra giao diện local: vào thẳng khóa học không cần tài khoản; hoàn thành quiz bài 1 với 5/5 câu; màn kết quả ghi nhận bài hoàn tất; bài 2 được mở; tiến độ 1/128 còn sau khi tải lại trang. Bản build production local cũng mở được bản đồ và tải bài 1.

## Giới hạn còn phải biết trước khi mở public

- Chưa có buổi thử nghiệm quan sát sinh viên mới học độc lập. Vì vậy chưa có bằng chứng thực nghiệm rằng mọi thuật ngữ, nhịp bài và thời lượng đều phù hợp với mọi nhóm người học.
- Chưa chạy thủ công toàn bộ 77 scenario như một học viên. Kết quả cổng scenario không khẳng định từng hướng dẫn ngoài simulator, tài khoản GitHub thật hoặc dịch vụ ngoài hoạt động.
- Tiến độ được lưu ở localStorage. Xóa dữ liệu trang hoặc đổi thiết bị/trình duyệt sẽ không mang theo tiến độ.
- Build local và các bài test không chứng minh Vercel đã được kết nối hoặc deployment production đã hoàn tất. Cần xác nhận trạng thái deployment trên Vercel sau khi push.

Kết luận phù hợp: đủ bằng chứng kỹ thuật để phát hành bản public đầu tiên cho người học tự học và thu phản hồi; không nên quảng bá đây là giáo trình đã được kiểm chứng thực nghiệm với sinh viên.
