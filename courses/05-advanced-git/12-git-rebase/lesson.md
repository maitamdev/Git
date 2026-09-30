# git rebase

---

## 🎯 Mục tiêu
- Thực thi thành thạo câu lệnh `git rebase <upstream>` để đồng bộ nhánh tính năng với nhánh chính.
- Khắc cốt ghi tâm "Quy tắc vàng của Rebase" (The Golden Rule of Rebasing): Không bao giờ rebase trên nhánh công khai.
- Hiểu rõ quy trình xử lý khi cần cập nhật nhánh sau khi đã rebase bằng `git push --force-with-lease`.
- Định hình thói quen giữ lịch sử dự án luôn tinh gọn trước khi tạo Pull Request.

---

## 📖 Định nghĩa
> `git rebase <base-branch>` là câu lệnh thực thi tái cơ sở nhánh trong Git. Khi bạn đang đứng trên nhánh tính năng và chạy lệnh này, Git sẽ tìm commit tổ tiên chung gần nhất (Common Ancestor), tạm thời lưu các commit riêng của nhánh tính năng vào bộ nhớ đệm, sau đó tua con trỏ nhánh tính năng về mốc commit mới nhất của nhánh cơ sở (ví dụ `main`), rồi lần lượt áp dụng từng commit được lưu tạm lên đỉnh mới. Kết quả mang lại một chuỗi commit nối tiếp tuyến tính mượt mà.

---

## 🤔 Tại sao cần?
Trong văn hóa phát triển phần mềm chuẩn mực, việc nhánh tính năng của bạn bị tụt hậu so với nhánh chính diễn ra liên tục hàng giờ. Nếu bạn liên tục merge main vào nhánh tính năng, lịch sử của bạn sẽ bị rác bởi hàng loạt commit "Merge branch main into feature". Câu lệnh `git rebase` giúp bạn cập nhật toàn bộ những tiến bộ mới nhất của nhánh chính vào nhánh làm việc của mình một cách thanh lịch, giúp việc giải quyết xung đột diễn ra sớm và tạo điều kiện cho một Pull Request cực kỳ sạch đẹp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang đứng xếp hàng tại quầy thanh toán của một siêu thị. Bạn đã chọn được 3 món hàng trong giỏ (3 commit của feature branch). Bỗng nhiên nhân viên thu ngân mở một lối đi ưu tiên mới rộng rãi hơn và mời bạn chuyển sang đó (nhánh main mới cập nhật). Bạn không đứng giằng co giữa hai lối đi, mà nhấc giỏ hàng của mình sang đứng tiếp nối vào cuối dòng người của lối đi mới (`git rebase`). Quá trình thanh toán diễn ra trơn tru mà không làm gián đoạn bất kỳ ai.

---

## 🖼 Sơ đồ
```text
Quy trình 3 bước của git rebase main:
Bước 1: Tìm tổ tiên chung C và lưu tạm F1, F2 ra bộ đệm.
Bước 2: Dịch chuyển con trỏ feature tới vị trí M2 của main.
Bước 3: Lần lượt áp dụng F1 tạo thành F1', áp dụng F2 tạo thành F2'.

C ──► M1 ──► M2 (main)
                └──► F1' ──► F2' (feature sau khi rebase)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Thành đang phát triển nhánh `feat/dark-mode` trên máy tính cá nhân. Trong thời gian Thành làm việc, nhánh `main` trên kho chứa đã có thêm 4 commit mới từ các đồng nghiệp khác. Thành muốn cập nhật các commit mới này vào nhánh của mình trước khi mở PR. Thành mở console và gõ: `git fetch origin`, sau đó chạy: `git rebase origin/main`. Git tự động tua nhánh của Thành đến commit mới nhất của main rồi cấy lần lượt các commit giao diện tối lên đỉnh. Thành kiểm tra lại toàn bộ ứng dụng và thấy mọi tính năng mới đều hoạt động hòa hợp hoàn hảo.

---

## 💻 Command
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease origin <tên-nhánh>
git rebase --abort
```

---

## 🔍 Giải thích command
- `git fetch origin`: Tải các commit mới nhất trên máy chủ về kho lưu trữ cục bộ.
- `git rebase origin/main`: Dời gốc nhánh hiện tại lên đỉnh của nhánh origin/main.
- `git push --force-with-lease`: Cập nhật nhánh lên server an toàn sau khi rebase (chỉ ghi đè nếu không có ai khác push chen ngang).
- `git rebase --abort`: Hủy bỏ hoàn toàn phiên rebase nếu gặp sự cố phức tạp và trở về trạng thái ban đầu.

---

## ⚠️ Sai lầm phổ biến
1. **Vi phạm Quy tắc vàng của Rebase**:  Chạy rebase trên nhánh dùng chung như main hoặc develop khiến lịch sử của cả nhóm bị phá vỡ.
2. **Sử dụng git push --force bừa bãi thay vì --force-with-lease**:  Có nguy cơ vô tình xóa đè commit mới của đồng nghiệp trên cùng nhánh.
3. **Hoảng loạn khi thấy Git tạm ngưng rebase**:  Thực chất Git chỉ đang chờ bạn xử lý xung đột nếu có mâu thuẫn dòng code.

---

## 🧪 Lab
1. Tạo nhánh `feat-rebase-demo` từ main và tạo 2 commit.
2. Chuyển về `main`, tạo 1 commit mới để làm phân kỳ lịch sử.
3. Chuyển lại sang nhánh `feat-rebase-demo`.
4. Chạy lệnh `git rebase main` và kiểm tra lịch sử bằng `git log --oneline --graph`.

---

## 💡 Hint
> Nhớ câu thần chú: Chỉ rebase trên nhánh cục bộ cá nhân, không bao giờ rebase trên nhánh công khai dùng chung.

---

## ✅ Validation
- Thực hiện rebase thành công nhánh tính năng lên đỉnh nhánh main mà không làm mất mát mã nguồn.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git rebase và quy tắc vàng.

---

## 🔥 Challenge
Tại sao cờ `--force-with-lease` lại an toàn hơn rất nhiều so với cờ `--force` truyền thống khi push nhánh sau khi rebase?

---

## 📚 Tổng kết
- `git rebase` đưa các commit của nhánh tính năng lên đỉnh mới nhất của nhánh cơ sở.
- Quy tắc vàng: Tuyệt đối không bao giờ rebase trên các nhánh công khai dùng chung.
- Luôn ưu tiên sử dụng `git push --force-with-lease` sau khi rebase nhánh cá nhân lên remote.
