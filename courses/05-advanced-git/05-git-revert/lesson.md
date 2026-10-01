# git revert

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).
- Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).
- Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.
- Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit.

---

## 🧩 Từ khóa hôm nay

### git revert
- **Nói dễ hiểu**: Lệnh hoàn tác an toàn bằng cách tạo thêm một commit mới có nội dung đảo ngược lại commit lỗi.
- **Ví dụ**: `git revert HEAD` để hủy bỏ tác động của commit gần nhất mà không xóa lịch sử.
- **Đừng nhầm**: Không xóa commit cũ khỏi git log; cả commit lỗi ban đầu và commit revert đều tồn tại minh bạch.

### forward-moving undo
- **Nói dễ hiểu**: Cơ chế hoàn tác tiến về phía trước trong tương lai thay vì lùi về quá khứ để viết lại lịch sử.
- **Ví dụ**: Lịch sử có commit C1, C2 (lỗi), C3 thì revert sẽ tạo thêm commit C4 để đảo ngược C2.
- **Đừng nhầm**: Khác với reset lùi con trỏ về quá khứ; phương pháp này an toàn tuyệt đối cho các nhánh dùng chung.

### revert commit
- **Nói dễ hiểu**: Một snapshot commit mới được Git tự động sinh ra chứa các dòng diff đảo ngược.
- **Ví dụ**: Commit cũ thêm một hàm thì commit revert sẽ xóa đúng hàm đó ra khỏi mã nguồn.
- **Đừng nhầm**: Nếu có các commit sau đó sửa đè lên cùng file, bạn sẽ phải xử lý conflict tương tự như khi merge.

---

## 📖 Định nghĩa
`git revert <commit-target>` là câu lệnh hoàn tác an toàn nhất trong Git, hoạt động theo nguyên lý tạo ra một commit snapshot mới mang nội dung đối nghịch chính xác với những gì commit mục tiêu đã thực hiện. Thay vì xóa bỏ commit cũ, `git revert` bảo tồn trọn vẹn chuỗi lịch sử và bổ sung commit mới để vô hiệu hóa lỗi.

---

## 💡 Tại sao cần
Trên nhánh `main` hoặc `production`, việc viết lại lịch sử bằng reset bị cấm hoàn toàn vì sẽ phá vỡ đồng bộ của các thành viên và vi phạm quy chuẩn kiểm toán phần mềm. `git revert` là giải pháp tiêu chuẩn vàng giúp khắc phục lỗi tức thì mà vẫn giữ lại lịch sử minh bạch để cả nhóm cùng đối chiếu.

---

## 🧠 Mental Model
Hãy hình dung sổ cái kế toán ngân hàng. Khi phát hiện lỡ ghi nhầm một khoản chuyển tiền hôm qua, kế toán viên không được dùng bút xóa hay xé trang sổ đi (reset). Kế toán viên phải ghi thêm một dòng mới vào hôm nay: "Thu hồi khoản chi nhầm hôm qua" (revert). Số dư chuẩn xác và sổ sách vẫn hoàn toàn minh bạch.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế hoàn tác tiến lên của git revert:
Lịch sử ban đầu:
C1 ──► C2 (Gây lỗi thanh toán!) ──► C3 (HEAD -> main)

Sau khi chạy git revert C2:
C1 ──► C2 ──► C3 ──► C4 [Revert "C2"] (HEAD -> main)
(C2 vẫn tồn tại trong lịch sử, nhưng C4 đã đảo ngược toàn bộ thay đổi của C2!)
```

---

## 🏢 Ví dụ thực tế
Hệ thống thương mại điện tử triển khai lên production thì phát hiện commit `e7f8a9b` làm lỗi mã giảm giá. Không hoảng loạn dùng reset, kỹ sư trưởng gõ `git revert e7f8a9b`. Git tự động tính toán diff đối nghịch và mở trình soạn thảo commit message. Kỹ sư lưu lại, đẩy lên server và hệ thống CI/CD tự động cập nhật bản vá. Lỗi được giải quyết triệt để chỉ sau 2 phút.

---

## 💻 Command & Cú pháp
```bash
git revert <commit-hash>
git revert HEAD
git revert HEAD~2..HEAD
git revert --no-commit <commit-hash>
```

---

## 🔍 Giải thích command
- `git revert <hash>`: Tạo commit mới đảo ngược các thay đổi do commit chỉ định tạo ra.
- `git revert HEAD`: Hoàn tác commit gần đây nhất trên nhánh hiện tại.
- `git revert HEAD~2..HEAD`: Hoàn tác liên tiếp một dải các commit gần nhất.
- `git revert --no-commit <hash>`: Đảo ngược thay đổi đưa vào Staging nhưng chưa tự động tạo commit mới.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng revert sẽ xóa commit cũ khỏi git log**: Revert bảo tồn toàn bộ lịch sử và chỉ tạo thêm commit mới trên đỉnh nhánh.
2. **Bối rối khi gặp xung đột conflict lúc revert**: Xung đột xảy ra khi các commit sau đó cùng sửa đổi dòng code; chỉ cần resolve conflict và chạy `git revert --continue`.
3. **Lạm dụng reset thay vì revert trên nhánh chung**: Khiến máy chủ từ chối push và phá vỡ quy trình làm việc của toàn bộ đồng nghiệp.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tạo commit revert và đối chiếu lịch sử commit trên terminal.
1. Tạo một tệp `feature.txt` có nội dung thử nghiệm và thực hiện commit.
2. Chạy lệnh `git revert HEAD` để hoàn tác commit vừa tạo.
3. Quan sát Git mở cửa sổ soạn thảo thông điệp commit revert tự động.
4. Lưu lại và kiểm tra `git log --oneline` để thấy commit revert mới xuất hiện trên đỉnh.

---

## 💡 Hint & mẹo
> Luôn sử dụng `git revert` khi cần thu hồi tính năng hoặc sửa lỗi trên các nhánh dùng chung và nhánh production.

---

## ✅ Validation & Kết quả mong đợi
- Commit mới mang thông điệp `Revert "<tên-commit>"` xuất hiện trên đỉnh nhật ký `git log`.
- Nội dung file bị đảo ngược chính xác về trạng thái trước khi commit lỗi diễn ra.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh an toàn git revert.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách sử dụng cờ `-m 1` khi revert một Merge Commit (`git revert -m 1 <merge-commit-hash>`) để chỉ định nhánh chính được giữ lại.

---

## 📝 Tổng kết
- `git revert` tạo ra một commit mới để đảo ngược lại các thay đổi của commit cũ.
- Là phương thức hoàn tác an toàn tuyệt đối trên các nhánh dùng chung và production.
- Bảo tồn nguyên vẹn 100% lịch sử và tính toàn vẹn của chuỗi commit.
