# git revert

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý hoạt động của `git revert` như một thao tác hoàn tác tiến lên phía trước (Forward-moving undo).
- Hiểu rõ sự khác biệt bản chất giữa việc xóa lịch sử (reset) và việc ghi nhận lịch sử đảo ngược (revert).
- Sử dụng `git revert` để hủy bỏ an toàn các commit lỗi trên môi trường production và nhánh dùng chung.
- Xử lý tình huống giải quyết xung đột có thể phát sinh trong quá trình revert commit.

---

## 📖 Định nghĩa
> `git revert <commit-target>` là câu lệnh hoàn tác an toàn nhất trong Git, hoạt động theo nguyên lý tạo ra một commit snapshot hoàn toàn mới mang nội dung đối nghịch (nghịch đảo) chính xác với những gì mà commit mục tiêu đã thực hiện. Thay vì xóa bỏ hoặc sửa đổi các commit cũ trong quá khứ như lệnh reset, `git revert` bảo tồn nguyên vẹn toàn bộ chuỗi lịch sử và bổ sung thêm một nút commit mới để vô hiệu hóa lỗi.

---

## 🤔 Tại sao cần?
Trong môi trường sản xuất thực tế tại các doanh nghiệp lớn, việc viết lại lịch sử trên nhánh `main` hoặc `production` là hành vi bị nghiêm cấm hoàn toàn vì nó làm hỏng đồng bộ của hàng chục kỹ sư và phá vỡ quy trình kiểm toán mã nguồn. `git revert` là giải pháp tiêu chuẩn vàng duy nhất: nó giúp bạn khắc phục lỗi tức thì mà vẫn lưu lại minh chứng rõ ràng trong nhật ký lịch sử về việc mã nguồn đã được sửa đổi và thu hồi như thế nào.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung sổ cái kế toán tài chính của một ngân hàng thương mại. Khi kế toán viên phát hiện mình lỡ ghi nhầm một khoản chuyển tiền 10 triệu đồng cho khách hàng vào ngày hôm qua, kế toán viên không được phép dùng bút xóa hay xé rách trang sổ cái đó đi (viết lại lịch sử). Thay vào đó, kế toán viên bắt buộc phải ghi thêm một dòng nghiệp vụ mới vào ngày hôm nay: "Thu hồi khoản chi nhầm 10 triệu đồng" (`git revert`). Số dư trở về đúng, và cuốn sổ cái vẫn minh bạch 100%.

---

## 🖼 Sơ đồ
```text
Cơ chế hoàn tác tiến lên của git revert:
Lịch sử ban đầu:
C1 ──► C2 (Gây lỗi thanh toán!) ──► C3 (HEAD -> main)

Sau khi chạy git revert C2:
C1 ──► C2 ──► C3 ──► C4 [Revert "C2"] (HEAD -> main)
(C2 vẫn tồn tại trong lịch sử, nhưng C4 đã đảo ngược toàn bộ thay đổi của C2!)
```

---

## 🌎 Ví dụ thực tế
Hệ thống thương mại điện tử vừa triển khai bản cập nhật mới lên production thì bộ phận chăm sóc khách hàng báo sự cố: khách hàng không thể áp dụng mã giảm giá do một commit có mã hash `e7f8a9b` gây lỗi logic. Đội ngũ trực chiến không hề hoảng loạn dùng reset, kỹ sư trưởng lập tức chạy lệnh: `git revert e7f8a9b`. Git tự động tính toán các dòng code đối nghịch, mở trình soạn thảo commit message với tiêu đề mặc định `Revert "feat: coupon engine"`. Kỹ sư lưu lại, push lên server và hệ thống CI/CD tự động triển khai bản vá. Toàn bộ sự cố được giải quyết triệt để chỉ trong 2 phút.

---

## 💻 Command
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
1. **Nhầm tưởng revert sẽ xóa mất commit cũ khỏi lịch sử git log**:  Revert tạo thêm commit mới, commit cũ vẫn nằm nguyên vẹn.
2. **Hoảng hốt khi gặp xung đột trong lúc revert**:  Xung đột xảy ra khi các commit sau đó đã sửa đổi cùng dòng code; chỉ cần resolve conflict và chạy `git revert --continue`.
3. **Lạm dụng reset thay vì revert trên nhánh main của công ty dẫn đến bị từ chối push.**: Lạm dụng reset thay vì revert trên nhánh main của công ty dẫn đến bị từ chối push.

---

## 🧪 Lab
1. Tạo một tệp `feature.txt` có nội dung "phần mềm lỗi" và tạo commit.
2. Chạy lệnh `git revert HEAD` để hoàn tác commit vừa tạo.
3. Quan sát Git mở cửa sổ soạn thảo thông điệp commit revert tự động.
4. Lưu lại và kiểm tra `git log --oneline` để thấy commit revert xuất hiện trên đỉnh.

---

## 💡 Hint
> Luôn dùng `git revert` khi cần sửa lỗi trên các nhánh dùng chung hoặc nhánh production.

---

## ✅ Validation
- Hoàn tác thành công một commit bằng git revert và bảo toàn nguyên vẹn lịch sử dự án.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh an toàn git revert.

---

## 🔥 Challenge
Điều gì xảy ra khi bạn revert một commit merge (Merge Commit)? Cờ `-m` trong `git revert -m 1 <merge-commit>` có ý nghĩa gì?

---

## 📚 Tổng kết
- `git revert` tạo ra một commit mới để đảo ngược lại các thay đổi của commit cũ.
- Là phương thức hoàn tác an toàn tuyệt đối trên các nhánh dùng chung và production.
- Bảo tồn nguyên vẹn 100% lịch sử và tính toàn vẹn của chuỗi commit.
