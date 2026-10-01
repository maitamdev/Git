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
- **Đừng nhầm**: Không di chuyển nhánh lùi như reset. Trên nhánh dùng chung, revert thường ít gây gián đoạn hơn, nhưng vẫn phải xem kết quả.

### revert commit
- **Nói dễ hiểu**: Một snapshot commit mới được Git tự động sinh ra chứa các dòng diff đảo ngược.
- **Ví dụ**: Commit cũ thêm một hàm thì commit revert sẽ xóa đúng hàm đó ra khỏi mã nguồn.
- **Đừng nhầm**: Nếu có các commit sau đó sửa đè lên cùng file, bạn sẽ phải xử lý conflict tương tự như khi merge.

---

## 📖 Định nghĩa
`git revert <commit-target>` tạo commit mới áp dụng phần thay đổi ngược với commit mục tiêu, nên commit cũ vẫn nằm trong lịch sử. Đây thường là cách phù hợp để hoàn tác commit đã chia sẻ. Nếu các commit sau đã sửa cùng vùng, Git có thể báo conflict hoặc kết quả cần được kiểm tra; revert merge commit còn cần chọn mainline bằng `-m`.

---

## 💡 Tại sao cần
Trên nhánh đã chia sẻ, reset một commit đã push có thể làm lịch sử của đồng đội lệch nhau. `git revert` thường hợp hơn vì giữ commit cũ và thêm commit đảo thay đổi. Hãy làm theo chính sách của nhóm, xem diff sau khi revert và xử lý conflict nếu Git báo.

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
Hệ thống thương mại điện tử phát hiện commit `e7f8a9b` làm lỗi mã giảm giá. Sau khi xác nhận phạm vi thay đổi, kỹ sư chạy `git revert e7f8a9b`, xem diff đảo ngược, xử lý conflict nếu có, rồi chạy kiểm thử. Nếu nhóm dùng CI/CD, pipeline sẽ chạy theo cấu hình sau khi thay đổi được push.

---

## 💻 Command & Cú pháp
```bash
git revert <commit-hash>
git revert HEAD
```

`git revert <dải-commit>` và `git revert --no-commit` là cú pháp Git thật; simulator hiện chỉ hỗ trợ revert một commit mỗi lần.

---

## 🔍 Giải thích command
- `git revert <hash>`: Tạo commit mới đảo ngược các thay đổi do commit chỉ định tạo ra.
- `git revert HEAD`: Hoàn tác commit gần đây nhất trên nhánh hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng revert xóa commit cũ khỏi `git log`**: Lệnh này giữ commit cũ và thêm commit mới.
2. **Cho rằng revert luôn tự chạy trơn tru**: Thay đổi về sau có thể gây conflict; giải quyết theo thông báo Git rồi kiểm tra diff trước khi tiếp tục.
3. **Revert merge commit như commit thường**: Cần chọn mainline (`-m`) trong Git thật; quy trình nhóm cũng cần xác định tác động của việc đảo ngược merge.

---

## 🧪 Lab thực hành
Bài này cần có commit cha, vì không thể dùng lệnh revert thông thường để đảo ngược commit gốc duy nhất.
1. Trong kho thử nghiệm riêng, tạo `base.txt`, stage và commit bằng thông điệp `base`.
2. Tạo `feature.txt`, stage và commit bằng thông điệp `add feature`.
3. Chạy `git revert HEAD`. Git thật thường mở editor để xác nhận thông điệp; simulator của khóa học tự tạo thông điệp mặc định.
4. Chạy `git status`, mở `feature.txt`, rồi chạy `git log --oneline -3`. File đã được gỡ khỏi snapshot mới và log vẫn có cả commit thêm file lẫn commit revert.

---

## 💡 Hint & mẹo
> Với commit đã chia sẻ, thường ưu tiên cách hoàn tác giữ lịch sử như `git revert`; làm theo quy ước của nhóm và kiểm tra diff trước khi push.

---

## ✅ Validation & Kết quả mong đợi
- Commit mới mang thông điệp `Revert "<tên-commit>"` xuất hiện trên đỉnh nhật ký `git log`.
- Trong ví dụ không có thay đổi về sau, `feature.txt` không còn trong snapshot mới; với file đã đổi tiếp, hãy review diff và xử lý conflict nếu Git yêu cầu.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh an toàn git revert.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách sử dụng cờ `-m 1` khi revert một Merge Commit (`git revert -m 1 <merge-commit-hash>`) để chỉ định nhánh chính được giữ lại.

---

## 📝 Tổng kết
- `git revert` tạo ra một commit mới để đảo ngược lại các thay đổi của commit cũ.
- Thường phù hợp để hoàn tác commit đã chia sẻ vì không xóa commit cũ khỏi lịch sử.
- Kết quả vẫn cần được review và kiểm thử; Git có thể báo conflict.
