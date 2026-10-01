# Rebase là gì?

---

## 🎯 Mục tiêu
- Nắm vững khái niệm và triết lý thiết kế cốt lõi của Rebase trong Git.
- Hiểu rõ thuật ngữ "Re-base" (thay đổi điểm tựa gốc rễ của nhánh tính năng).
- So sánh chi tiết sự khác nhau về triết lý và cấu trúc cây lịch sử giữa Merge và Rebase.
- Hiểu rõ khái niệm lịch sử tuyến tính (Linear History) và lợi ích của nó đối với các dự án lớn.

---

## 🧩 Từ khóa hôm nay

### git rebase
- **Nói dễ hiểu**: Lệnh đổi điểm xuất phát của nhánh tính năng sang đỉnh mới nhất của nhánh chính để tạo thành một đường thẳng.
- **Ví dụ**: Đang ở nhánh `feat/cart`, chạy `git rebase main` để nâng các commit của mình đặt lên đuôi của `main`.
- **Đừng nhầm**: Không tạo merge commit hình thoi; Git tính toán lại diff và tái tạo các commit mới trên đỉnh nhánh đích.

### linear history
- **Nói dễ hiểu**: Lịch sử commit dạng đường thẳng một chiều, không có các nhánh rẽ ngang dọc hay các commit gộp rác.
- **Ví dụ**: Dùng `git log --graph --oneline` chỉ thấy một cột thẳng tắp từ commit đầu đến commit cuối.
- **Đừng nhầm**: Không làm mất code; toàn bộ nội dung thay đổi vẫn được bảo toàn nguyên vẹn nhưng sắp xếp theo thứ tự thời gian hợp lý.

### base commit
- **Nói dễ hiểu**: Điểm tựa gốc rễ nơi nhánh tính năng được tách ra ban đầu từ nhánh cha.
- **Ví dụ**: Khi rebase, base commit cũ được thay thế bằng commit mới nhất của nhánh đích.
- **Đừng nhầm**: SHA hash của các commit tính năng sẽ thay đổi vì commit cha của chúng đã bị thay đổi thành base mới.

---

## 📖 Định nghĩa
`git rebase` (Đổi gốc nhánh) là cơ chế hợp nhất mã nguồn quan trọng trong Git bên cạnh `git merge`. Về bản chất, Rebase là quá trình ngắt kết nối các commit của nhánh hiện tại khỏi điểm xuất phát ban đầu, sau đó áp dụng lần lượt từng commit đó lên trên đỉnh một commit cơ sở mới (Base Commit) để tạo ra cây lịch sử thẳng tắp.

---

## 💡 Tại sao cần
Trong các dự án lớn với nhiều lập trình viên, nếu ai cũng dùng `git merge` thông thường thì lịch sử sẽ biến thành "bát mì spaghetti" chằng chịt các nút giao cắt và hàng trăm commit merge rác. Rebase giúp giữ lịch sử thẳng tắp, dễ đọc hiểu trình tự thời gian và thuận tiện truy vết lỗi bằng `git bisect`.

---

## 🧠 Mental Model
Hãy hình dung bạn đang xếp chồng các khối gỗ đỏ lên một chiếc bàn cũ (nhánh main cũ). Đồng nghiệp mang đến chiếc bàn mới tinh đặt các khối gỗ xanh lên đó (main mới cập nhật). Thay vì dùng dây buộc nối chiếc bàn cũ vào bàn mới (Merge Commit), bạn nhẹ nhàng nhấc toàn bộ chồng khối gỗ đỏ sang đặt tiếp nối lên đỉnh các khối gỗ xanh trên bàn mới (`git rebase`).

---

## 📊 Sơ đồ minh họa
```text
So sánh trực quan giữa Merge và Rebase:
Lịch sử phân kỳ ban đầu:
Base ──► M1 ──► M2 (main)
  └──► F1 ──► F2 (feature)

Kết quả khi MERGE: (Sinh ra nút hợp nhất M3 hình thoi)
Base ──► M1 ──► M2 ──────► M3 (main)
  └──► F1 ──► F2 ────────┘

Kết quả khi REBASE feature lên main: (Đường thẳng tắp tuyến tính!)
Base ──► M1 ──► M2 (main) ──► F1' ──► F2' (feature)
```

---

## 🏢 Ví dụ thực tế
Nhóm phát triển quy định mọi nhánh tính năng trước khi mở PR đều phải rebase lên `main` mới nhất. Sau 3 ngày code nhánh `feat/biometric`, Hoàng thấy main đã tiến thêm 10 commit. Thay vì gõ merge làm sinh commit rác "Merge branch main into feat/biometric", Hoàng chạy `git rebase main`. Nhánh của Hoàng được đặt tiếp nối gọn gàng vào đuôi commit thứ 10 của main.

---

## 💻 Command & Cú pháp
```bash
git switch <nhánh-tính-năng>
git fetch origin
git rebase origin/main
git log --oneline --graph
```

---

## 🔍 Giải thích command
- `git switch <feature>`: Chuyển về nhánh tính năng bạn muốn di chuyển điểm tựa.
- `git fetch origin`: Cập nhật các commit mới nhất từ máy chủ từ xa về máy cá nhân.
- `git rebase origin/main`: Dời các commit của nhánh tính năng lên trên đỉnh mới nhất của nhánh origin/main.
- `git log --graph`: Chiêm ngưỡng cây lịch sử thẳng tắp không có các nút giao rác.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Rebase làm mất mã nguồn**: Rebase áp dụng lại toàn bộ commit, mã nguồn được tích hợp đầy đủ.
2. **Nhầm lẫn chiều rebase**: Rebase nhánh tính năng lên main chứ không phải rebase main vào nhánh tính năng.
3. **Rebase trên nhánh dùng chung đã push lên server**: Vi phạm Quy tắc vàng của Rebase, gây xáo trộn lịch sử và xung đột nghiêm trọng cho đồng nghiệp.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn tạo phân kỳ và thao tác rebase trên terminal.
1. Tạo một nhánh mới `demo-rebase` từ main và tạo 2 commit.
2. Chuyển về `main` và tạo 1 commit độc lập để tạo ra sự phân kỳ chữ Y.
3. Chuyển lại sang `demo-rebase` và quan sát sơ đồ bằng `git log --graph --oneline --all`.
4. Chạy lệnh `git rebase main` và quan sát cây lịch sử biến thành một đường thẳng.

---

## 💡 Hint & mẹo
> Rebase làm sạch lịch sử bằng cách viết lại các commit thành đường thẳng tuyến tính.

---

## ✅ Validation & Kết quả mong đợi
- Lịch sử phân kỳ chữ Y biến thành một chuỗi commit thẳng hàng khi xem bằng `git log --graph`.
- Tất cả commit của nhánh tính năng xuất hiện sau commit mới nhất của nhánh main.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và triết lý của Git Rebase.

---

## 🚀 Thử thách nâng cao
So sánh ưu nhược điểm giữa hai trường phái bảo thủ (True History qua Merge) và trường phái thẩm mỹ (Linear History qua Rebase) trong văn hóa phát triển phần mềm.

---

## 📝 Tổng kết
- Rebase thay đổi điểm tựa gốc (Base Commit) của nhánh hiện tại lên đỉnh nhánh đích.
- Loại bỏ hoàn toàn các commit merge không cần thiết, tạo lịch sử tuyến tính thẳng tắp.
- Giúp dự án dễ đọc, dễ bảo trì và thuận tiện cho việc truy vết lỗi tự động.
