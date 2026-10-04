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
`git rebase` lấy các commit riêng của nhánh hiện tại rồi áp dụng lại chúng trên một commit cơ sở mới. Git tạo các commit mới nên mã hash thay đổi. Rebase thường tạo lịch sử tuyến tính trong ví dụ đơn giản; lịch sử có merge commit hoặc patch đã có sẵn cần được xem xét riêng.

---

## 🤔 Tại sao cần?
Trong các dự án lớn với nhiều lập trình viên, nếu ai cũng dùng `git merge` thông thường thì lịch sử sẽ biến thành "bát mì spaghetti" chằng chịt các nút giao cắt và hàng trăm commit merge rác. Rebase giúp giữ lịch sử thẳng tắp, dễ đọc hiểu trình tự thời gian và thuận tiện truy vết lỗi bằng `git bisect`.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang xếp chồng các khối gỗ đỏ lên một chiếc bàn cũ (nhánh main cũ). Đồng nghiệp mang đến chiếc bàn mới tinh đặt các khối gỗ xanh lên đó (main mới cập nhật). Thay vì dùng dây buộc nối chiếc bàn cũ vào bàn mới (Merge Commit), bạn nhẹ nhàng nhấc toàn bộ chồng khối gỗ đỏ sang đặt tiếp nối lên đỉnh các khối gỗ xanh trên bàn mới (`git rebase`).

---

## 🖼 Sơ đồ
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

## 🌎 Ví dụ thực tế
Nhóm quy định nhánh tính năng cần cập nhật trước khi mở PR. Hoàng đang làm trên `feat/biometric` và `main` có commit mới. Theo quy trình nhóm, Hoàng có thể rebase nhánh tính năng lên `origin/main` để phát lại commit riêng của mình; nếu nhóm muốn giữ lại điểm hợp nhất, có thể chọn merge.

---

## 💻 Command
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
- `git log --graph`: Quan sát cấu trúc lịch sử sau khi chọn rebase.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Rebase chỉ đổi nhãn commit**: Git phát lại thay đổi và tạo commit hash mới; conflict hoặc patch đã có sẵn có thể làm kết quả khác dự kiến.
2. **Nhầm lẫn chiều rebase**: Rebase nhánh tính năng lên main chứ không phải rebase main vào nhánh tính năng.
3. **Rebase nhánh mà đồng đội đang dựa vào**: Commit hash đổi; hãy theo chính sách nhóm và báo cho người cùng làm trước khi cập nhật nhánh đã chia sẻ.

---

## 🧪 Lab
Cùng tôi tạo một phân kỳ lịch sử nhỏ và trải nghiệm cảm giác duỗi thẳng commit bằng git rebase:
1. Tạo một nhánh mới `demo-rebase` từ main và tạo 2 commit.
2. Chuyển về `main` và tạo 1 commit độc lập để tạo ra sự phân kỳ chữ Y.
3. Chuyển lại sang `demo-rebase` và quan sát sơ đồ bằng `git log --graph --oneline --all`.
4. Chạy lệnh `git rebase main` và quan sát cây lịch sử biến thành một đường thẳng.

---

## 💡 Hint
> Rebase phát lại commit trên một base mới. Trước khi làm, xác định ai đang dùng nhánh đó và liệu nhóm muốn rebase hay merge.

---

## ✅ Validation
- Trong bài lab không có conflict, commit tính năng có cha mới là tip `main`.
- Hash commit tính năng thay đổi sau khi rebase; so sánh bằng `git log --graph --oneline`.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và triết lý của Git Rebase.

---

## 🔥 Challenge
So sánh ưu nhược điểm giữa hai trường phái bảo thủ (True History qua Merge) và trường phái thẩm mỹ (Linear History qua Rebase) trong văn hóa phát triển phần mềm.

---

## 📚 Tổng kết
- Rebase thay đổi điểm tựa gốc (Base Commit) của nhánh hiện tại lên đỉnh nhánh đích.
- Loại bỏ hoàn toàn các commit merge không cần thiết, tạo lịch sử tuyến tính thẳng tắp.
- Giúp dự án dễ đọc, dễ bảo trì và thuận tiện cho việc truy vết lỗi tự động.
