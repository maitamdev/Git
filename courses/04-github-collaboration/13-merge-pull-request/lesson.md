# Quy trình Merge Pull Request

---

## 🎯 Mục tiêu
- Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính trên GitHub.
- Phân biệt rõ ràng 3 chiến lược merge được GitHub cung cấp: Create a merge commit, Squash and merge, và Rebase and merge.
- Hiểu rõ ưu và nhược điểm của từng chiến lược đối với đồ thị lịch sử của dự án.
- Thực hiện thao tác dọn dẹp xóa nhánh tính năng sau khi PR đã được merge thành công.

---

## 🧩 Từ khóa hôm nay

### merge commit
- **Nói dễ hiểu**: Chiến lược gộp giữ nguyên toàn bộ commit con của nhánh tính năng và tạo một commit gộp đặc biệt có 2 cha.
- **Ví dụ**: Giữ lại toàn bộ lịch sử 10 commit của tính năng kèm commit kết nối đưa vào `main`.
- **Đừng nhầm**: Giữ lại nhiều chi tiết nhưng có thể làm rối đồ thị nếu nhánh chứa nhiều commit rác.

### squash and merge
- **Nói dễ hiểu**: Gom toàn bộ các commit nhỏ trong nhánh tính năng lại thành đúng một commit duy nhất đưa vào main.
- **Ví dụ**: Nén 6 commit nháp sửa lỗi CSS và chính tả thành một commit sạch duy nhất `feat(auth): add login form`.
- **Đừng nhầm**: Không làm mất code; toàn bộ thay đổi vẫn giữ nguyên nhưng lịch sử nhánh chính gọn gàng hơn nhiều.

### rebase and merge
- **Nói dễ hiểu**: Áp dụng lần lượt từng commit của nhánh tính năng lên đỉnh của nhánh chính mà không tạo merge commit.
- **Ví dụ**: Đưa 3 commit tính năng nối tiếp vào sau commit mới nhất của `main` thành một đường thẳng.
- **Đừng nhầm**: SHA hash của các commit sẽ bị thay đổi vì chúng được tính toán lại trên đỉnh nhánh mới.

---

## 📖 Định nghĩa
Merge Pull Request là thao tác hoàn tất của một tính năng trên GitHub, chính thức đưa các commit từ nhánh tính năng vào nhánh chính (thường là `main`). GitHub hỗ trợ 3 chiến lược: Create a merge commit (giữ vết nhánh), Squash and merge (nén thành một commit), và Rebase and merge (xếp thẳng hàng).

---

## 💡 Tại sao cần
Chiến lược merge quyết định chất lượng lịch sử dự án trong nhiều năm vận hành. Nếu chọn sai, lịch sử nhánh chính sẽ ngập tràn các commit nháp vô nghĩa như "fix typo", "test again". Hiểu rõ các chiến lược giúp giữ nhật ký commit sạch đẹp, dễ tra cứu và thuận tiện truy vết lỗi hoặc rollback.

---

## 🧠 Mental Model
Hãy hình dung bạn đi chợ mua nhiều món lặt vặt. Chiến lược Merge Commit giống như thu ngân đưa từng biên lai lẻ kẹp vào bìa hồ sơ. Chiến lược Squash giống như thu ngân gom tất cả lại và in đúng một hóa đơn tổng duy nhất mang tên "Mua sắm tuần 1". Chiến lược Rebase giống như dán nối tiếp từng cuống vé vào cuối sổ chi tiêu.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Lập trình viên tạo 8 commit nhỏ nháp trong quá trình làm tính năng giỏ hàng. Sau khi PR được 2 senior duyệt và qua bài kiểm thử tự động, trưởng nhóm chọn "Squash and merge". Cả 8 commit nháp được nén gọn thành một commit chất lượng: `feat(cart): implement checkout flow (#42)`. Trưởng nhóm bấm tiếp nút tím "Delete branch" để dọn sạch nhánh cũ trên remote.

---

## 💻 Command & Cú pháp
```bash
git switch main
git pull origin main
git branch -d feat/my-feature
```

---

## 🔍 Giải thích command
- `git switch main`: Chuyển về nhánh main trên máy tính cá nhân sau khi PR đã được merge trên web.
- `git pull origin main`: Kéo commit vừa được merge trên GitHub về cập nhật không gian làm việc cục bộ.
- `git branch -d <nhánh>`: Xóa an toàn nhánh tính năng cục bộ sau khi mã nguồn đã nằm trọn vẹn trong main.

---

## ⚠️ Sai lầm phổ biến
1. **Quên xóa nhánh tính năng sau khi merge**: Khiến kho lưu trữ trên GitHub tồn đọng hàng trăm nhánh cũ rác rưởi.
2. **Dùng merge commit cho PR chứa nhiều commit nháp vô nghĩa**: Làm ô nhiễm lịch sử nhánh chính bởi các commit nửa vời.
3. **Tiếp tục viết code trên nhánh đã bị squash and merge**: Gặp xung đột khó hiểu khi đồng bộ vì lịch sử commit cũ đã bị nén lại.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác hợp nhất PR trên giao diện GitHub và đồng bộ về máy cá nhân.
1. Quan sát nút xanh `Merge pull request` xuất hiện khi PR đã được Approve và pass CI.
2. Nhấn vào mũi tên cạnh nút để so sánh 3 tùy chọn: Merge, Squash, và Rebase.
3. Chọn `Squash and merge` và chỉnh sửa lại tiêu đề commit cho thật chuẩn mực.
4. Nhấn xác nhận merge và bấm nút `Delete branch` màu tím để xóa nhánh.

---

## 💡 Hint & mẹo
> Squash and merge là lựa chọn phổ biến hàng đầu trong các dự án hiện đại để giữ lịch sử nhánh main luôn tinh gọn.

---

## ✅ Validation & Kết quả mong đợi
- Pull Request chuyển sang trạng thái màu tím `Merged`.
- Nhánh main cục bộ cập nhật đầy đủ mã nguồn tính năng mới sau khi kéo bằng `git pull`.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về các chiến lược Merge Pull Request.

---

## 🚀 Thử thách nâng cao
Thiết lập tùy chọn repository trên GitHub để chỉ cho phép "Squash merging" và tự động xóa các nhánh đã merge thành công (Automatically delete head branches).

---

## 📝 Tổng kết
- Merge PR chính thức kết nạp mã nguồn tính năng vào nhánh chính của sản phẩm.
- 3 chiến lược: Merge commit (giữ vết), Squash (nén thành 1), Rebase (làm phẳng).
- Luôn xóa nhánh tính năng sau khi merge để giữ kho lưu trữ luôn sạch đẹp.
