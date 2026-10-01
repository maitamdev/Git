# Khái niệm Branch trong Git

---

## 🎯 Mục tiêu
- Giải thích được Branch là một con trỏ có tên, trỏ tới một commit cụ thể.
- Nhận ra lợi ích của việc tạo nhánh riêng để thử nghiệm thay vì sửa trực tiếp trên `main`.
- Dùng lệnh `git branch` để xem danh sách nhánh và nhận biết nhánh đang làm việc.

---

## 🧩 Từ khóa hôm nay

### Branch — nhánh làm việc
- **Nói dễ hiểu:** Một con trỏ có tên trỏ trực tiếp tới một commit cụ thể trong lịch sử dự án.
- **Ví dụ:** Tạo nhánh `feature-cart` để viết trang giỏ hàng mà không ảnh hưởng mã nguồn đang chạy.
- **Đừng nhầm:** Nhánh trong Git không phải là một bản sao chép toàn bộ thư mục dự án sang chỗ khác.

### main — nhánh chính mặc định
- **Nói dễ hiểu:** Nhánh chứa mã nguồn ổn định nhất của dự án, dùng làm mốc chuẩn cho cả nhóm.
- **Ví dụ:** Sản phẩm đang chạy cho khách hàng sử dụng được lấy từ commit trên nhánh `main`.
- **Đừng nhầm:** `main` không có đặc quyền kỹ thuật khác biệt; đây là quy ước chuẩn để mọi người cùng thống nhất.

### Pointer — con trỏ di động
- **Nói dễ hiểu:** Một nhãn lưu vị trí commit; khi có commit mới trên nhánh đó, nhãn tự trượt lên commit mới.
- **Ví dụ:** Khi bạn commit thêm ảnh đại diện, nhánh `feature-avatar` tự trỏ vào commit ảnh vừa tạo.
- **Đừng nhầm:** Bạn không cần đổi vị trí nhánh thủ công sau mỗi lần commit; Git tự động cập nhật.

---

## 📖 Định nghĩa
Branch (nhánh) trong Git là một con trỏ có thể di chuyển, trỏ vào một commit snapshot cụ thể. Khi bạn tạo commit mới trên nhánh, con trỏ đó tự động tiến lên phía trước để luôn giữ vị trí commit mới nhất.

---

## 🤔 Tại sao cần?
Khi làm việc nhóm hoặc thử nghiệm ý tưởng mới, bạn không nên sửa trực tiếp trên mã nguồn đang chạy ổn định. Nhánh cho phép bạn tạo một không gian riêng: bạn thoải mái sửa, commit thử và xóa bỏ nếu không đạt, mà không làm hỏng công việc của đồng đội trên nhánh chính.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung lịch sử dự án như một thân cây. Nhánh `main` là thân chính vững chắc. Khi muốn làm tính năng mới, bạn tạo một nhánh con rẽ ra. Bạn làm việc trên nhánh con đó. Nếu tính năng chạy tốt, bạn ghép nhánh vào thân chính. Nếu tính năng thử nghiệm thất bại, bạn cắt bỏ nhánh con mà thân cây vẫn an toàn.

---

## 🖼 Sơ đồ
```text
Commit C1 ───> Commit C2 ───> Commit C3 (main)
                                ▲
                                └─── Commit C4 (feature-login)
```
Nhánh `feature-login` tách ra từ commit C3 để phát triển riêng, trong khi nhánh `main` vẫn giữ nguyên mốc ổn định.

---

## 🌎 Ví dụ thực tế
Một nhóm sinh viên đang làm web trường. Nhánh `main` chứa bản nộp bài giữa kỳ đang chạy. Bạn An được giao làm tính năng chat trực tuyến; An tạo nhánh `feature-chat` từ `main`. Trong khi An viết code chat suốt 3 ngày, bạn Bình vẫn có thể sửa lỗi chính tả trên `main` mà không bị lẫn code chat chưa hoàn thiện của An.

---

## 💻 Command
```bash
git branch
git branch <tên-nhánh>
git branch -v
```

---

## 🔍 Giải thích command
- `git branch`: Liệt kê tất cả các nhánh trong kho lưu trữ của bạn. Nhánh bạn đang đứng được đánh dấu bằng dấu sao `*`.
- `git branch <tên-nhánh>`: Tạo một con trỏ nhánh mới trỏ vào commit hiện tại nhưng chưa chuyển sang nhánh đó.
- `git branch -v`: Liệt kê danh sách nhánh kèm mã commit ngắn và thông điệp commit mới nhất của từng nhánh.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ tạo nhánh là nhân đôi toàn bộ thư mục:** Git chỉ tạo một con trỏ nhẹ, diễn ra gần như tức thì và tốn rất ít dung lượng.
2. **Sửa mọi thứ trực tiếp trên main:** Thói quen này dễ khiến mã nguồn chính bị lỗi khi bạn đang code dở.
3. **Đặt tên nhánh chung chung như `test` hoặc `fix`:** Tên nhánh nên thể hiện rõ nội dung công việc như `feature-cart` hoặc `fix-login-button`.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Chạy lệnh `git branch` để kiểm tra danh sách nhánh hiện có và xác định nhánh đang đứng (có dấu `*`).
2. Tạo nhánh mới cho tính năng giỏ hàng bằng lệnh `git branch feature-cart`.
3. Chạy `git branch` lần nữa để xác nhận nhánh `feature-cart` đã xuất hiện trong danh sách.

---

## 💡 Hint
Lệnh `git branch <tên-nhánh>` chỉ tạo con trỏ nhánh mới chứ chưa tự động chuyển bạn sang nhánh đó.

---

## ✅ Validation
- Danh sách `git branch` hiển thị cả `main` và nhánh mới `feature-cart`.
- Nhánh `main` vẫn có dấu `*` ở phía trước.

---

## ❓ Quiz
Trả lời các câu hỏi sau để kiểm tra mức độ hiểu về bản chất con trỏ nhánh trong Git.

---

## 🔥 Challenge
Chạy lệnh `git branch -v` để so sánh mã commit của nhánh vừa tạo với nhánh `main`. Nhận xét xem hai nhánh có đang trỏ vào cùng một commit hay không.

---

## 📚 Tổng kết
- Branch là một con trỏ có tên, trỏ vào commit đỉnh của một luồng công việc.
- Tạo nhánh giúp tách biệt công việc thử nghiệm khỏi mã nguồn ổn định trên nhánh chính.
- Lệnh `git branch` dùng để xem danh sách nhánh và tạo nhánh mới an toàn.
