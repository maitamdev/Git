# Rebase là gì?

---

## 🎯 Mục tiêu
- Nắm vững khái niệm và triết lý thiết kế cốt lõi của Rebase trong Git.
- Hiểu rõ thuật ngữ "Re-base" (thay đổi điểm tựa gốc rễ của nhánh tính năng).
- So sánh chi tiết sự khác nhau về triết lý và cấu trúc cây lịch sử giữa Merge và Rebase.
- Hiểu rõ khái niệm lịch sử tuyến tính (Linear History) và lợi ích của nó đối với các dự án lớn.

---

## 📖 Định nghĩa
> `git rebase` (Đổi gốc nhánh) là một trong hai cơ chế hợp nhất mã nguồn quan trọng bậc nhất của Git (bên cạnh `git merge`). Về bản chất, Rebase là quá trình ngắt kết nối các commit của nhánh hiện tại khỏi điểm xuất phát ban đầu, sau đó "di dời" và áp dụng lần lượt từng commit đó lên trên đỉnh một commit cơ sở mới (Base Commit). Kết quả là cây lịch sử của bạn được tái cấu trúc thành một đường thẳng tuyến tính hoàn hảo không có vết rẽ nhánh.

---

## 🤔 Tại sao cần?
Trong các dự án phần mềm có quy mô lớn với hàng chục lập trình viên, nếu ai cũng dùng `git merge` thông thường thì lịch sử Git sẽ nhanh chóng biến thành một "bát mì spaghetti" chằng chịt các nút giao cắt nhau và hàng trăm commit merge rác không mang lại giá trị nội dung. Nắm vững tư duy Rebase giúp bạn giữ cho lịch sử phát triển luôn thẳng tắp, dễ đọc, dễ tra cứu bằng `git bisect` và thể hiện đẳng cấp chuyên nghiệp của một kỹ sư Git cao cấp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang xếp các khối gỗ đồ chơi màu đỏ lên một chiếc bàn gỗ cũ (nhánh main cũ). Trong khi bạn đang xếp dở các khối gỗ đỏ, đồng nghiệp mang đến một chiếc bàn kính mới tinh và đặt các khối gỗ màu xanh lên đó (main mới cập nhật). Thay vì dùng dây buộc nối chiếc bàn cũ vào chiếc bàn mới (Merge Commit), bạn nhẹ nhàng nhấc toàn bộ chồng khối gỗ đỏ của mình sang đặt tiếp nối ngay ngắn lên trên đỉnh của các khối gỗ xanh trên chiếc bàn mới (`git rebase`). Bạn có một tòa tháp thẳng đứng tuyệt đẹp.

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
Nhóm phát triển hệ thống lõi ngân hàng quy định mọi nhánh tính năng trước khi gửi Pull Request đều phải rebase lên nhánh `main` mới nhất. Kỹ sư Hoàng sau 3 ngày phát triển nhánh `feat/biometric` nhận thấy nhánh main đã tiến thêm 10 commit mới do các nhóm khác hoàn thành. Thay vì gõ merge làm sinh ra commit thừa "Merge branch main into feat/biometric", Hoàng thực hiện rebase. Nhánh của Hoàng được nâng bổng lên, đặt tiếp nối mượt mà vào đuôi commit thứ 10 của main. Cây lịch sử dự án hoàn toàn thẳng tắp và rõ ràng như một cuốn tiểu thuyết liền mạch.

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
- `git log --graph`: Chiêm ngưỡng cây lịch sử thẳng tắp không có các nút giao rác.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Rebase làm mất mã nguồn**:  Rebase áp dụng lại toàn bộ commit, mã nguồn được tích hợp đầy đủ.
2. **Nhầm lẫn giữa Rebase nhánh tính năng lên main và Rebase main vào tính năng.**: Nhầm lẫn giữa Rebase nhánh tính năng lên main và Rebase main vào tính năng.
3. **Áp dụng Rebase trên các nhánh dùng chung đã xuất bản công khai (Vi phạm Quy tắc vàng của Rebase).**: Áp dụng Rebase trên các nhánh dùng chung đã xuất bản công khai (Vi phạm Quy tắc vàng của Rebase).

---

## 🧪 Lab
1. Tạo một nhánh mới `demo-rebase` từ main và tạo 2 commit.
2. Chuyển về `main` và tạo 1 commit độc lập để tạo ra sự phân kỳ chữ Y.
3. Chuyển lại sang `demo-rebase` và quan sát sơ đồ bằng `git log --graph --oneline --all`.
4. Chạy lệnh `git rebase main` và quan sát cây lịch sử biến thành một đường thẳng.

---

## 💡 Hint
> Rebase làm sạch lịch sử bằng cách viết lại các commit thành đường thẳng tuyến tính.

---

## ✅ Validation
- Hiểu rõ triết lý đổi gốc nhánh và phân biệt chuẩn xác sự khác nhau giữa Merge và Rebase.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và triết lý của Git Rebase.

---

## 🔥 Challenge
Nêu sự khác biệt cốt lõi về bản chất giữa việc "lưu giữ lịch sử như nó đã diễn ra" (Merge) và "kể lại câu chuyện lịch sử một cách hoàn hảo" (Rebase).

---

## 📚 Tổng kết
- Rebase thay đổi điểm tựa gốc (Base Commit) của nhánh hiện tại lên đỉnh nhánh đích.
- Loại bỏ hoàn toàn các commit merge không cần thiết, tạo lịch sử tuyến tính thẳng tắp.
- Giúp dự án dễ đọc, dễ bảo trì và thuận tiện cho việc truy vết lỗi tự động.
