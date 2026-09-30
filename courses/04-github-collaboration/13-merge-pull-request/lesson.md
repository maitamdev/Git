# Quy trình Merge Pull Request

---

## 🎯 Mục tiêu
- Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính trên GitHub.
- Phân biệt rõ ràng 3 chiến lược merge được GitHub cung cấp: Create a merge commit, Squash and merge, và Rebase and merge.
- Hiểu rõ ưu và nhược điểm của từng chiến lược đối với đồ thị lịch sử của dự án.
- Thực hiện thao tác dọn dẹp xóa nhánh tính năng sau khi PR đã được merge thành công.

---

## 📖 Định nghĩa
> Merge Pull Request là thao tác kết thúc vòng đời của một tính năng thành công trên GitHub, chính thức kết nạp các commit từ nhánh tính năng vào nhánh chính (thường là `main`). GitHub cung cấp cho bạn 3 tùy chọn chiến lược hợp nhất: (1) `Create a merge commit` (giữ nguyên tất cả commit và tạo merge commit 2 cha), (2) `Squash and merge` (nén toàn bộ các commit nhỏ thành một commit duy nhất), và (3) `Rebase and merge` (áp dụng từng commit lên đỉnh nhánh chính thành một đường thẳng).

---

## 🤔 Tại sao cần?
Lựa chọn chiến lược merge đúng đắn quyết định diện mạo và chất lượng của lịch sử kho chứa trong suốt nhiều năm vận hành. Nếu chọn sai, lịch sử dự án của bạn có thể biến thành một "rừng cây" chằng chịt các commit rác như "fix typo", "fix bug again", "commit test". Hiểu rõ 3 chiến lược này giúp bạn và đội ngũ giữ cho nhật ký commit luôn sạch đẹp, dễ tra cứu và hỗ trợ tối đa việc truy vết lỗi hoặc rollback khi cần.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đi siêu thị mua sắm nhiều món đồ lặt vặt: chai nước mắm, gói mì tôm, cây bút bi (các commit nhỏ). Khi thanh toán tại quầy: Chiến lược Merge thông thường giống như thu ngân đưa cho bạn từng tờ hóa đơn rời cho mỗi món đồ kèm một tờ kẹp tổng hợp. Chiến lược Squash giống như thu ngân gom tất cả các món đồ đó lại và in ra đúng một tờ hóa đơn thanh toán duy nhất sạch sẽ mang tên "Chi phí sinh hoạt tuần 1". Chiến lược Rebase giống như dán nối tiếp từng tờ hóa đơn nhỏ vào đuôi cuốn sổ kế toán.

---

## 🖼 Sơ đồ
```text
3 phương thức Merge Pull Request trên GitHub:
1. Create a merge commit:
   main:    C1 ──► C2 ──────────► C5 (Merge Commit có 2 cha)
                               /
   feature:          └── C3 ── C4

2. Squash and merge:
   main:    C1 ──► C2 ──► C3+4' (Gom C3 và C4 thành 1 commit duy nhất)

3. Rebase and merge:
   main:    C1 ──► C2 ──► C3' ──► C4' (Lịch sử thẳng tắp, không có nút giao)
```

---

## 🌎 Ví dụ thực tế
Trong quá trình phát triển tính năng giỏ hàng, lập trình viên tạo ra 8 commit nhỏ với các thông điệp nháp như "wip", "fix css", "testing". Sau khi Pull Request vượt qua toàn bộ các bài kiểm tra tự động và được 2 kỹ sư senior phê duyệt, trưởng nhóm quyết định bấm chọn tùy chọn: "Squash and merge". Toàn bộ 8 commit nháp được nén gọn thành một commit chất lượng cao duy nhất: "feat(cart): implement shopping cart and checkout flow (#42)". Sau khi merge, trưởng nhóm nhấn nút màu tím "Delete branch" để dọn dẹp sạch sẽ nhánh tính năng.

---

## 💻 Command
```bash
git switch main
git pull origin main
git branch -d feat/my-feature
```

---

## 🔍 Giải thích command
- `git switch main`: Chuyển về nhánh main trên máy tính cá nhân sau khi PR đã được merge trên web.
- `git pull origin main`: Kéo commit vừa được merge trên GitHub về cập nhật máy cá nhân.
- `git branch -d <nhánh>`: Xóa an toàn nhánh tính năng cục bộ sau khi nó đã nằm trọn vẹn trong main.

---

## ⚠️ Sai lầm phổ biến
1. **Quên xóa nhánh tính năng sau khi đã merge**:  Khiến danh sách nhánh trên GitHub bị tồn đọng hàng trăm nhánh cũ rác rưởi.
2. **Dùng Create a merge commit cho các PR chứa nhiều commit nháp vô nghĩa**:  Khiến lịch sử nhánh main bị ô nhiễm bởi các commit rác.
3. **Tiếp tục code thêm trên nhánh tính năng đã bị squash and merge**:  Sẽ gặp khó khăn khi đồng bộ vì lịch sử commit đã bị viết lại.

---

## 🧪 Lab
1. Quan sát nút xanh `Merge pull request` xuất hiện khi PR đã được Approve và pass CI.
2. Nhấn vào mũi tên cạnh nút để so sánh 3 tùy chọn: Merge, Squash, và Rebase.
3. Chọn `Squash and merge` và chỉnh sửa lại tiêu đề commit cho thật chuẩn mực.
4. Nhấn xác nhận merge và bấm nút `Delete branch` màu tím để xóa nhánh.

---

## 💡 Hint
> Squash and merge là lựa chọn phổ biến hàng đầu trong các dự án web hiện đại để giữ lịch sử main tinh gọn.

---

## ✅ Validation
- Merge thành công Pull Request vào nhánh chính và dọn dẹp nhánh tính năng sạch sẽ.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về các chiến lược Merge Pull Request.

---

## 🔥 Challenge
Nêu trường hợp nào nên ưu tiên chọn "Create a merge commit" thay vì "Squash and merge".

---

## 📚 Tổng kết
- Merge PR chính thức kết nạp mã nguồn tính năng vào nhánh chính của sản phẩm.
- 3 chiến lược: Merge commit (giữ vết), Squash (nén thành 1), Rebase (làm phẳng).
- Luôn xóa nhánh tính năng sau khi merge để giữ kho lưu trữ luôn sạch đẹp.
