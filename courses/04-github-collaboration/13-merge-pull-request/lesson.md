# Quy trình Merge Pull Request

---

## 🎯 Mục tiêu
- Nắm vững quy trình hợp nhất (Merge) một Pull Request hoàn chỉnh vào nhánh chính trên GitHub.
- Phân biệt ba cách tích hợp PR mà GitHub có thể bật: merge commit, squash merge và rebase merge.
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
- **Đừng nhầm**: Nội dung thay đổi được giữ trong commit squash; các commit gốc không còn xuất hiện riêng trên lịch sử nhánh đích.

### rebase and merge
- **Nói dễ hiểu**: Áp dụng lần lượt từng commit của nhánh tính năng lên đỉnh của nhánh chính mà không tạo merge commit.
- **Ví dụ**: Đưa 3 commit tính năng nối tiếp vào sau commit mới nhất của `main` thành một đường thẳng.
- **Đừng nhầm**: SHA hash của các commit sẽ bị thay đổi vì chúng được tính toán lại trên đỉnh nhánh mới.

---

## 📖 Định nghĩa
Merge Pull Request tích hợp các thay đổi từ nhánh nguồn vào nhánh đích. GitHub có thể bật một hoặc nhiều phương thức: merge commit, squash merge, rebase merge. Chủ repository cấu hình phương thức nào dùng được; PR có thể còn cần review, CI hoặc quyền phù hợp.

---

## 💡 Tại sao cần
Phương thức tích hợp ảnh hưởng cách lịch sử nhánh đích thể hiện các thay đổi. Chọn theo quy ước của dự án: merge commit giữ mốc tích hợp, squash tạo một commit trên nhánh đích, rebase merge xếp các commit thành tuyến tính với SHA mới.

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
1. Trên PR thử nghiệm bạn có quyền xem, đọc diff, trạng thái review và các kiểm tra. Nếu nút merge chưa sẵn sàng, đọc lý do hiển thị; không tìm cách vượt quy tắc. Nếu chưa có tài khoản GitHub, dùng các sơ đồ trong bài để so sánh ba kiểu lịch sử.
2. Xem phương thức merge mà repository cho phép. Có thể chỉ có một lựa chọn.
3. Chọn phương thức theo quy ước nhóm; nếu chỉ đang học hoặc không có quyền, dừng ở bước quan sát thay vì merge một PR thật.
4. Sau khi merge PR thử nghiệm, xóa nhánh chỉ khi không còn cần thiết. Trên máy local, chuyển khỏi nhánh đó rồi xóa bằng `git branch -d <tên-nhánh>` nếu Git xác nhận đã tích hợp.
5. Cập nhật nhánh đích cục bộ bằng `git switch <nhánh-đích>` rồi `git pull <remote> <nhánh-đích>`.

---

## 💡 Hint & mẹo
> Không có phương thức merge tốt nhất cho mọi dự án. Xem cài đặt repository và hỏi theo quy ước của nhóm.

---

## ✅ Validation & Kết quả mong đợi
- Pull Request chuyển sang trạng thái màu tím `Merged`.
- PR hiển thị trạng thái Merged sau khi được tích hợp. Nhánh local cập nhật sau khi pull đúng nhánh đích.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về các chiến lược Merge Pull Request.

---

## 🚀 Thử thách nâng cao
Thiết lập tùy chọn repository trên GitHub để chỉ cho phép "Squash merging" và tự động xóa các nhánh đã merge thành công (Automatically delete head branches).

---

## 📝 Tổng kết
- Merge PR chính thức kết nạp mã nguồn tính năng vào nhánh chính của sản phẩm.
- Repository có thể cho phép một hoặc nhiều phương thức: merge commit, squash, rebase.
- Chọn theo quy ước dự án; chỉ xóa nhánh khi không còn cần dùng.
