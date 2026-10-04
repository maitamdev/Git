# Quy trình Merge Pull Request

---

## 🎯 Mục tiêu
- Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính thức trên GitHub.
- Phân biệt sâu sắc 3 chiến lược hợp nhất: Create a merge commit, Squash and merge, và Rebase and merge.
- Đánh giá ưu nhược điểm của từng phương thức đối với việc quản trị đồ thị lịch sử Git dài hạn.
- Thực hiện chuẩn xác quy trình dọn dẹp và xóa bỏ nhánh tính năng sau khi đã merge thành công.

---

## 🧩 Từ khóa hôm nay

### merge commit PR — gộp tạo commit kết nối
- **Nói dễ hiểu:** Chiến lược giữ nguyên vẹn từng commit con của nhánh tính năng và sinh ra một commit gộp đặc biệt có 2 cha trên nhánh chính.
- **Ví dụ:** Giữ lại toàn bộ 8 commit chi tiết của nhánh `feat/auth` cùng một commit kết nối đưa vào nhánh `main`.
- **Đừng nhầm:** Phương thức này lưu trữ toàn bộ lịch sử chi tiết nhưng dễ làm rối đồ thị Git nếu nhánh chứa nhiều commit sửa lỗi lặt vặt.

### squash and merge — nén và gộp
- **Nói dễ hiểu:** Gom toàn bộ các commit nhỏ trong nhánh tính năng lại thành đúng một commit duy nhất có chất lượng cao đưa vào nhánh chính.
- **Ví dụ:** Nén 10 commit nháp thử nghiệm thành một commit sạch đẹp duy nhất mang thông điệp `feat(auth): integrate OAuth2 login`.
- **Đừng nhầm:** Các commit riêng lẻ ban đầu sẽ không còn xuất hiện trên nhánh chính; toàn bộ nội dung mã nguồn được nén vào commit mới.

### rebase and merge — tái lập và gộp
- **Nói dễ hiểu:** Áp dụng lần lượt từng commit của nhánh tính năng nối tiếp vào đỉnh nhánh chính mà không sinh ra commit gộp kết nối.
- **Ví dụ:** Đưa 3 commit tính năng xếp hàng thẳng tắp ngay sau commit mới nhất của nhánh `main`.
- **Đừng nhầm:** Mã băm SHA của các commit sẽ được tính toán lại hoàn toàn mới vì gốc xuất phát điểm của chúng đã bị thay đổi.

---

## 📖 Định nghĩa
Merge Pull Request là thao tác kết nạp chính thức các commit từ nhánh tính năng vào nhánh chính thức trên nền tảng GitHub sau khi đã vượt qua các bài kiểm thử và vòng kiểm duyệt mã nguồn, hỗ trợ 3 chiến lược cốt lõi: tạo commit gộp (merge commit), nén các commit lại thành một (squash and merge), hoặc tái lập các commit nối tiếp thẳng tắp (rebase and merge).

---

## 🤔 Tại sao cần?
Mỗi chiến lược hợp nhất PR mang lại một cấu trúc đồ thị lịch sử commit hoàn toàn khác nhau cho sản phẩm. Hiểu rõ bản chất của từng phương thức giúp đội ngũ kỹ thuật duy trì một cây lịch sử Git ngăn nắp, dễ dàng tra cứu, phục vụ hiệu quả cho việc truy vết lỗi hồi quy (regression testing) và hỗ trợ tự động hóa phát hành phiên bản mượt mà.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đi siêu thị mua sắm nhiều món đồ lặt vặt. Chiến lược Merge Commit giống như việc giữ lại từng mẩu hóa đơn lẻ rồi kẹp chung vào bìa hồ sơ lưu trữ. Chiến lược Squash giống như thu ngân gom tất cả lại và xuất đúng một hóa đơn tổng thanh toán duy nhất. Còn chiến lược Rebase giống như dán nối tiếp từng cuống vé vào cuối sổ nhật ký chi tiêu.

---

## 🖼 Sơ đồ
```text
BA CHIẾN LƯỢC HỢP NHẤT PULL REQUEST TRÊN GITHUB:

1. Create a merge commit:
   main:    C1 ──► C2 ──────────► C5 (Merge Commit có 2 cha)
                                /
   feature:          └── C3 ── C4

2. Squash and merge:
   main:    C1 ──► C2 ──► C3+4' (Gom toàn bộ thành 1 commit duy nhất)

3. Rebase and merge:
   main:    C1 ──► C2 ──► C3' ──► C4' (Lịch sử thẳng tắp không rẽ nhánh)
```

---

## 🌎 Ví dụ thực tế
Trong quá trình xây dựng tính năng giỏ hàng, lập trình viên tạo ra 7 commit nhỏ sửa lỗi chính tả và chỉnh màu CSS. Khi PR được chấp thuận, Tech Lead chọn "Squash and merge" để nén toàn bộ 7 commit nháp thành đúng một commit duy nhất có thông điệp chuẩn mực: `feat(cart): implement checkout drawer (#42)`. Lịch sử nhánh chính vẫn sạch sẽ, tinh tươm và không bị rác.

---

## 💻 Command
```bash
git switch main
git pull origin main
git branch -d feat/my-feature
git remote prune origin
```

---

## 🔍 Giải thích command
- `git switch main`: Quay trở lại nhánh chính trên máy tính sau khi PR đã được merge thành công trên giao diện web.
- `git pull origin main`: Kéo commit vừa được merge trên GitHub về để cập nhật thư mục làm việc cục bộ.
- `git branch -d feat/my-feature`: Xóa an toàn nhánh tính năng cục bộ khi các thay đổi đã nằm trọn vẹn trong nhánh main.
- `git remote prune origin`: Dọn dẹp các con trỏ nhánh theo dõi từ xa đã bị xóa bỏ trên máy chủ GitHub.

---

## ⚠️ Sai lầm phổ biến
1. **Quên xóa nhánh tính năng sau khi đã merge**: Để tồn đọng hàng trăm nhánh cũ mốc meo trên kho lưu trữ đám mây.
2. **Chọn sai chiến lược gộp gây ô nhiễm lịch sử**: Dùng merge commit cho những nhánh chứa đầy commit rác như "fix typo" hay "test again".
3. **Tiếp tục commit lên nhánh đã bị squash-merge**: Gây ra xung đột mã nguồn phức tạp ở các lần PR tiếp theo vì lịch sử cũ đã bị nén.

---

## 🧪 Lab
1. Trên giao diện một PR đã nhận đủ lượt Approve và vượt qua CI, quan sát nút Merge màu xanh lá cây.
2. Nhấp vào mũi tên bên cạnh nút Merge để khám phá 3 tùy chọn chiến lược hợp nhất.
3. Chọn chiến lược theo quy chuẩn dự án (ví dụ "Squash and merge"), viết thông điệp tóm tắt và xác nhận hoàn tất.
4. Nhấp nút tím "Delete branch" để xóa ngay nhánh tính năng trên máy chủ GitHub.
5. Mở terminal máy tính, chạy `git switch main`, `git pull origin main` và xóa nhánh cục bộ bằng `git branch -d`.

---

## 💡 Hint
> Trong đại đa số các nhóm phát triển tính năng web và mobile hiện đại, "Squash and merge" là chiến lược được các Tech Lead ưa chuộng nhất vì nó biến mỗi PR thành đúng một mốc lịch sử logic nguyên tử, cực kỳ dễ revert khi có sự cố phát sinh!

---

## ✅ Validation
- Phân biệt chuẩn xác sự khác nhau về mặt đồ thị commit giữa 3 phương thức merge.
- Nắm vững quy trình dọn dẹp nhánh tính năng cả trên GitHub lẫn trên máy tính cá nhân.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về các chiến lược Merge Pull Request và quy trình dọn dẹp dự án.

---

## 🔥 Challenge
Hãy tìm hiểu tùy chọn thiết lập "Automatically delete head branches" trong mục Settings của repository trên GitHub. Cơ chế này tự động giải phóng tài nguyên và bảo vệ kho lưu trữ khỏi tình trạng rác nhánh như thế nào?

---

## 📚 Tổng kết
- Merge PR đưa mã nguồn hoàn thiện từ nhánh tính năng vào nhánh chính của sản phẩm.
- Nắm vững 3 chiến lược: Merge commit, Squash and merge, và Rebase and merge.
- Luôn dọn dẹp xóa bỏ nhánh tính năng sau khi merge để giữ kho dự án luôn tinh gọn.
