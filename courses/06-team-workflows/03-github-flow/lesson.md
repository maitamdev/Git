# GitHub Flow

---

## 🎯 Mục tiêu
- Hiểu luồng thường dùng: tạo nhánh, commit, mở PR, review, triển khai/kiểm tra khi phù hợp, rồi merge.
- Phân biệt quy ước GitHub Flow với các thao tác tự động mà nhóm có thể tự cấu hình.
- Nhận biết các bối cảnh nhóm có thể chọn luồng PR ngắn hạn.
- Phân biệt điểm khác biệt giữa GitHub Flow và các mô hình đa nhánh phức tạp như Git Flow.

---

## 🧩 Từ khóa hôm nay

### GitHub Flow
- **Nói dễ hiểu**: Cách làm xoay quanh nhánh chính và nhánh ngắn hạn; thay đổi thường được thảo luận qua PR trước khi merge.
- **Ví dụ**: Tạo `feat/apple-pay`, mở PR, chạy các kiểm tra đã cấu hình, rồi merge khi nhóm chấp thuận.
- **Đừng nhầm**: Khác với Git Flow, GitHub Flow không sử dụng nhánh develop hay release trung gian.

### Always Deployable Main
- **Nói dễ hiểu**: Mục tiêu vận hành là giữ nhánh chính ở trạng thái có thể phát hành theo quy trình của nhóm.
- **Ví dụ**: Nhóm có thể yêu cầu CI và review trước khi merge vào `main`.
- **Đừng nhầm**: GitHub Flow không tự bật branch protection, CI, PR bắt buộc hay deploy; các bước đó cần cấu hình riêng.

### Continuous Delivery (Chuyển giao liên tục)
- **Nói dễ hiểu**: Thực hành giữ phần mềm ở trạng thái có thể phát hành; nó không đồng nghĩa với việc tự động đưa mọi thay đổi lên production.
- **Ví dụ**: Sau khi merge vào `main`, pipeline có thể build và test; nhóm có thể phê duyệt hoặc lên lịch triển khai riêng.
- **Đừng nhầm**: Continuous Deployment tự động triển khai thay đổi đủ điều kiện; Continuous Delivery chuẩn bị thay đổi để có thể phát hành.

---

## 📖 Định nghĩa
GitHub Flow là workflow nhẹ dùng nhánh ngắn hạn và PR để thảo luận, review rồi tích hợp thay đổi. Nhóm thường cố giữ nhánh chính có thể phát hành, nhưng CI, bảo vệ nhánh và deployment cần được cấu hình phù hợp với dự án.

---

## 💡 Tại sao cần
Luồng PR ngắn giúp nhóm thảo luận thay đổi tại một nơi và giảm nhu cầu duy trì nhiều nhánh dài hạn. Tốc độ phát hành vẫn phụ thuộc kiểm thử, phê duyệt, vận hành và chính sách của sản phẩm.

---

## 🧠 Mental Model
Hãy hình dung tòa soạn: phóng viên viết bản thảo, biên tập viên trao đổi trên PR, rồi nhóm chọn thời điểm đăng. Việc duyệt PR không tự đăng bài; tương tự, merge không tự deploy nếu repository chưa cấu hình quy trình phát hành.

---

## 📊 Sơ đồ minh họa
```text
Một vòng làm việc thường gặp (review, test và deploy tùy cấu hình):
1. Tạo nhánh từ main (Create branch)
       │
       ▼
2. Thêm các commit rõ nghĩa (Add commits)
       │
       ▼
3. Mở Pull Request thảo luận (Open PR)
       │
       ▼
4. Thảo luận & Review code (Discuss & Review)
       │
       ▼
5. Chạy kiểm tra/preview nếu dự án có
       │
       ▼
6. Merge khi đủ điều kiện; phát hành theo chính sách của nhóm
```

---

## 🏢 Ví dụ thực tế
Ví dụ: kỹ sư Nam tạo nhánh `ui/apple-pay` từ `main`, mở PR để nhóm review và chạy CI. Nếu dự án có môi trường preview hoặc deploy sau merge, Nam kiểm tra kết quả theo quy trình đó trước khi phát hành.

---

## 💻 Command & Cú pháp
```bash
git switch main
git status
git switch -c ui/apple-pay
# Sau khi sửa file: git add <tệp>
git commit -m "feat(checkout): add Apple Pay button"
git push -u origin ui/apple-pay
gh pr create --title "feat: add Apple Pay" --body "Tested on Safari"
```

`git push` cần remote/quyền ghi; `gh pr create` cần cài GitHub CLI, đăng nhập và quyền tạo PR. Simulator không kết nối GitHub hay mở PR thật.

---

## 🔍 Giải thích command
- `git switch -c <name>`: Tạo nhánh từ nhánh đang checkout; trước đó hãy chuyển sang nhánh đích.
- `git commit -m <msg>`: Ghi lại từng bước tiến hóa của tính năng với thông điệp rõ nghĩa.
- `git push -u origin <name>`: Xuất bản nhánh lên GitHub để bắt đầu quy trình thảo luận nhóm.
- `gh pr create`: Tạo PR trên GitHub khi CLI đã cài và xác thực; có thể mở PR trên web thay thế.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng `main` tự luôn có thể phát hành**: GitHub Flow đặt đó làm mục tiêu; nhóm cần test và cách phục hồi phù hợp.
2. **Để nhánh làm việc lệch lâu khỏi nhánh đích**: Chênh lệch lớn có thể làm việc tích hợp khó hơn.
3. **Giả định luôn có staging/deploy tự động**: Xem lại các bước và điều kiện thực tế của repository.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Trong repo thử nghiệm, chuyển sang nhánh chính và tạo một nhánh mô tả thay đổi.
2. Tạo commit, xem lại bằng `git status` và `git log --oneline`.
3. Nếu có repo GitHub với quyền push, đẩy nhánh và mở PR; nếu không, mô tả các bước PR/review bằng giấy.
4. Trên PR thử nghiệm, xem các CI checks đã cấu hình. Không giả định repo nào cũng tự deploy.

---

## 💡 Hint & mẹo
> Giữ thay đổi đủ nhỏ để review và tích hợp được; chọn CI, môi trường preview và deploy theo khả năng vận hành của nhóm.

---

## ✅ Validation & Kết quả mong đợi
- Mô tả được nhánh, commit và PR trong luồng GitHub Flow.
- Phân biệt được bước Git hỗ trợ với CI, review và deployment do nhóm cấu hình.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây về quy trình tinh gọn GitHub Flow.

---

## 🚀 Thử thách nâng cao
Thiết lập một GitHub Actions workflow đơn giản để tự động triển khai bản thử nghiệm mỗi khi có Pull Request được mở.

---

## 📝 Tổng kết
- Mô hình cơ bản xoay quanh `main` và nhánh làm việc ngắn hạn; dự án có thể thêm nhánh nếu cần.
- Nhóm dùng nhánh ngắn hạn và PR để review rồi tích hợp thay đổi.
- Bảo vệ nhánh, CI và triển khai tự động là cấu hình riêng, không tự xuất hiện khi chọn workflow này.
