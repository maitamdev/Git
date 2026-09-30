# Team Conflict Scenario

---

## 🎯 Mục tiêu
- Phân tích nguyên nhân gốc rễ gây ra xung đột hợp nhất (Merge Conflict) trong môi trường làm việc nhóm thực tế.
- Làm chủ quy trình xử lý xung đột an toàn tại máy cục bộ (Local Resolution) trước khi cập nhật lại Pull Request.
- Sử dụng kỹ thuật `git fetch` và `git rebase origin/main` để đưa nhánh tính năng lên đầu lịch sử mới nhất.
- Giao tiếp hiệu quả và phối hợp nhịp nhàng với đồng nghiệp khi gặp xung đột logic kinh doanh phức tạp.

---

## 📖 Định nghĩa
> Team Conflict Scenario (Kịch bản giải quyết xung đột nhóm) là tình huống thực chiến kinh điển xảy ra khi hai hoặc nhiều lập trình viên cùng chỉnh sửa trên các vùng mã nguồn trùng lặp hoặc phụ thuộc lẫn nhau trên các nhánh riêng biệt, và một người đã hợp nhất thành công vào nhánh chính trước. Khi người thứ hai cố gắng mở hoặc hợp nhất Pull Request, hệ thống Git sẽ từ chối tự động gộp và thông báo xung đột, đòi hỏi người lập trình viên phải chủ động kéo mã nguồn mới nhất về máy cá nhân để đối soát và giải quyết mâu thuẫn.

---

## 🤔 Tại sao cần?
Xung đột mã nguồn không phải là lỗi của hệ thống, mà là hệ quả tất yếu và hoàn toàn bình thường trong quá trình cộng tác phát triển phần mềm hiện đại. Một kỹ sư chuyên nghiệp không bao giờ hoảng sợ hay đổ lỗi cho đồng nghiệp khi gặp conflict; thay vào đó, họ nắm vững quy trình xử lý xung đột bài bản: giữ bình tĩnh, trao đổi trực tiếp với tác giả đoạn code liên quan để hiểu rõ ngữ cảnh, và giải quyết xung đột một cách minh bạch, an toàn trên máy cục bộ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai kiến trúc sư cùng thiết kế nội thất cho một căn phòng khách. Kiến trúc sư A muốn đặt một chiếc đàn piano ở góc phòng và bản thiết kế của anh ta đã được chủ nhà duyệt trước (`merged into main`). Kiến trúc sư B không biết điều đó và vừa gửi bản vẽ đề xuất đặt một giá sách lớn đúng vào góc phòng đó (`Pull Request conflict`). Kiến trúc sư B không thể tự ý ném chiếc đàn piano đi. Anh ta phải mang bản vẽ mới nhất về bàn làm việc, gọi điện trao đổi với kiến trúc sư A để thống nhất dời giá sách sang góc khác hoặc kết hợp hài hòa cả hai món đồ.

---

## 🖼 Sơ đồ
```text
Kịch bản xung đột nhóm và cách giải quyết cục bộ:
main:      C1 ──────── C2 (Tính năng của Dev A được merge trước!)
            │           ▲
            │           │ (Git từ chối merge do xung đột!)
feat/devB:  └── C3 ─────┘

Các bước giải cứu chuẩn mực của Dev B:
1. git fetch origin
2. git rebase origin/main (hoặc git merge origin/main)
3. Mở VS Code giải quyết Conflict ──► git add <files>
4. git rebase --continue
5. git push --force-with-lease origin feat/devB ──► PR hết xung đột!
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Tuấn đang làm nhánh `feat/cart-discount` thì nhận thấy nút Merge trên Pull Request của mình bị chuyển sang màu xám với dòng chữ "This branch has conflicts that must be resolved". Tuấn kiểm tra lịch sử và thấy kỹ sư Lan vừa merge một nhánh sửa đổi cách tính thuế trong tệp `pricing.ts`. Tuấn không bấm sửa trực tiếp trên giao diện web GitHub vì rất dễ sót lỗi. Thay vào đó, trên terminal máy mình, Tuấn chạy `git fetch origin` rồi `git rebase origin/main`. Terminal tạm dừng và báo conflict tại hàm `calculateTotal`. Tuấn mở VS Code, sang bàn làm việc của Lan để trao đổi nhanh trong 2 phút về thứ tự áp dụng giảm giá trước hay tính thuế trước. Sau khi thống nhất logic, Tuấn lưu code, chạy `git add pricing.ts` và `git rebase --continue`. Cuối cùng Tuấn gõ `git push --force-with-lease` và Pull Request của Tuấn xanh trở lại.

---

## 💻 Command
```bash
git fetch origin
git rebase origin/main
git status
git add <tệp-đã-sửa>
git rebase --continue
git push --force-with-lease origin <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git fetch origin`: Tải toàn bộ các commit mới nhất từ máy chủ về máy mà không làm xáo trộn working tree.
- `git rebase origin/main`: Đặt lại nền tảng nhánh của bạn lên trên commit mới nhất của nhánh chính.
- `git push --force-with-lease`: Cập nhật nhánh remote an toàn tuyệt đối, chỉ cho phép force push nếu không có ai khác đẩy code mới lên nhánh đó.

---

## ⚠️ Sai lầm phổ biến
1. **Tự ý xóa code của đồng nghiệp khi giải quyết xung đột mà không hề trao đổi hay hiểu rõ mục đích của đoạn code đó.**: Tự ý xóa code của đồng nghiệp khi giải quyết xung đột mà không hề trao đổi hay hiểu rõ mục đích của đoạn code đó.
2. **Giải quyết các xung đột lớn phức tạp trực tiếp trên trình soạn thảo web của GitHub**:  Dễ gây lỗi cú pháp và không thể chạy kiểm thử.
3. **Sử dụng `git push --force` thông thường thay vì `--force-with-lease`**:  Tiềm ẩn nguy cơ vô tình ghi đè commit của đồng nghiệp cùng làm chung nhánh.

---

## 🧪 Lab
1. Tạo kịch bản xung đột giữa hai nhánh cùng sửa một dòng trong tệp `index.html`.
2. Thực hiện lệnh `git fetch` và `git rebase origin/main` để giải quyết mâu thuẫn trên VS Code.

---

## 💡 Hint
> Giao tiếp giữa con người với con người luôn là công cụ giải quyết xung đột mã nguồn hiệu quả nhất.

---

## ✅ Validation
- Pull Request trên GitHub tự động chuyển sang trạng thái sẵn sàng hợp nhất mà không còn bất kỳ xung đột nào.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về kỹ năng giải quyết xung đột nhóm trong Git.

---

## 🔥 Challenge
So sánh ưu nhược điểm giữa việc dùng `git merge main` và `git rebase origin/main` khi giải quyết xung đột cho một nhánh tính năng.

---

## 📚 Tổng kết
- Xung đột mã nguồn trong làm việc nhóm là điều hoàn toàn tự nhiên và bình thường.
- Luôn ưu tiên kéo mã nguồn mới về máy cá nhân và giải quyết xung đột cục bộ kèm chạy kiểm thử.
- Sử dụng `git push --force-with-lease` để cập nhật lại nhánh tính năng sau khi rebase giải quyết xung đột an toàn.
