# Xóa và đổi tên nhánh an toàn

---

## 🎯 Mục tiêu
- Nắm vững kỹ thuật dọn dẹp và bảo trì hệ thống nhánh sau khi hoàn tất tính năng.
- Sử dụng thành thạo cú pháp đổi tên nhánh bằng cờ `-m`.
- Phân biệt rõ ràng giữa xóa an toàn với cờ `-d` và xóa cưỡng chế với cờ `-D`.

---

## 🧩 Từ khóa hôm nay

### git branch -m — đổi tên nhánh
- **Nói dễ hiểu:** Lệnh thay đổi tên nhánh sang tên mới rõ nghĩa và đúng quy ước của nhóm hơn.
- **Ví dụ:** Chạy `git branch -m feat-cart feature-cart` để chuẩn hóa tên nhánh trước khi nộp bài.
- **Đừng nhầm:** Đổi tên nhánh chỉ đổi nhãn con trỏ; toàn bộ commit và lịch sử bên trong nhánh vẫn giữ nguyên vẹn.

### git branch -d vs -D — xóa an toàn và cưỡng chế
- **Nói dễ hiểu:** Cờ `-d` chỉ cho phép xóa khi nhánh đã được gộp; cờ `-D` ép xóa ngay cả khi code chưa gộp.
- **Ví dụ:** Dùng `-d` để dọn nhánh đã merge vào `main`; dùng `-D` để vứt bỏ hoàn toàn nhánh thử nghiệm hỏng.
- **Đừng nhầm:** Xóa một nhánh đã gộp bằng `-d` không làm mất code; toàn bộ commit đã nằm chắc chắn trong nhánh chính.

### git push origin --delete — xóa nhánh trên máy chủ
- **Nói dễ hiểu:** Lệnh gửi yêu cầu lên GitHub để xóa con trỏ nhánh tương ứng trên kho chứa từ xa.
- **Ví dụ:** Sau khi tính năng được merge trên GitHub, chạy `git push origin --delete feature-cart` để dọn dẹp.
- **Đừng nhầm:** Xóa nhánh ở máy tính cá nhân không tự làm mất nhánh trên GitHub; bạn phải chạy thêm lệnh này.

---

## 📖 Định nghĩa
Xóa và đổi tên nhánh là các thao tác bảo trì cần thiết để giữ kho lưu trữ Git luôn gọn gàng và dễ theo dõi. Thao tác xóa nhánh trong Git chỉ đơn thuần là gỡ bỏ một nhãn con trỏ có tên, trong khi các commit đã được gộp vẫn nằm an toàn trong lịch sử nhánh chính.

---

## 🤔 Tại sao cần?
Khi làm việc lâu dài, việc đặt nhầm tên nhánh hoặc gõ sai chính tả rất thường xảy ra. Đổi tên nhánh giúp chuẩn hóa tên trước khi gửi cho đồng đội. Đồng thời, chủ động xóa các nhánh đã hoàn thành giúp danh sách nhánh luôn ngắn gọn, tránh việc chọn nhầm các nhánh cũ đã lỗi thời.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung các con trỏ nhánh giống như những chiếc thẻ đánh dấu trang kẹp vào cuốn sách. Khi bạn đọc xong một chương và đã hiểu hết nội dung (đã merge), bạn rút chiếc thẻ đánh dấu đó ra cất đi (xóa nhánh) để cuốn sách không bị vướng víu. Các trang sách và nội dung chữ (các commit) vẫn nằm nguyên vẹn trong gáy cuốn sách.

---

## 🖼 Sơ đồ
```text
Cơ chế gỡ bỏ nhãn con trỏ (Xóa nhánh):
Trước khi xóa:
main ───────────> Commit C3
feature-cart ───> Commit C3 (Trỏ cùng commit C3)

Sau khi chạy: git branch -d feature-cart
main ───────────> Commit C3
(Chỉ có con trỏ feature-cart bị gỡ bỏ, Commit C3 vẫn an toàn 100%)
```

---

## 🌎 Ví dụ thực tế
Bạn Long hoàn tất việc gộp nhánh `feature-auth` vào nhánh `main` của dự án công ty. Khi gõ `git branch`, Long thấy nhánh cũ vẫn còn hiển thị. Long chuyển về `main` bằng `git switch main` rồi chạy `git branch -d feature-auth`. Git kiểm tra thấy toàn bộ commit đã nằm trong `main` nên báo xóa thành công. Danh sách nhánh của Long giờ chỉ còn lại `main` sạch sẽ.

---

## 💻 Command
```bash
git branch -m <tên-mới>
git branch -m <tên-cũ> <tên-mới>
git branch -d <tên-nhánh>
git branch -D <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git branch -m <tên-mới>`: Đổi tên nhánh hiện tại bạn đang đứng sang tên mới.
- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên một nhánh bất kỳ mà không cần phải chuyển sang nhánh đó.
- `git branch -d <tên-nhánh>`: Xóa nhánh có kiểm tra an toàn (chỉ xóa nếu nhánh đã được merge).
- `git branch -D <tên-nhánh>`: Ép buộc xóa nhánh ngay lập tức, bỏ qua kiểm tra an toàn.

---

## ⚠️ Sai lầm phổ biến
1. **Cố xóa nhánh mình đang đứng:** Git sẽ từ chối; bạn phải chuyển sang nhánh khác như `main` rồi mới xóa được.
2. **Sợ mất code khi xóa nhánh đã merge:** Toàn bộ commit đã nằm trong nhánh chính, việc xóa nhánh con không làm mất dòng code nào.
3. **Đổi tên ở máy cá nhân nhưng quên cập nhật trên GitHub:** Dễ khiến nhánh trên máy và nhánh trên máy chủ bị lệch tên nhau.

---

## 🧪 Lab
Bài học này là bài tự kiểm tra thao tác đổi tên và xóa nhánh trên máy của bạn:
1. Tạo một nhánh tạm bằng lệnh `git branch temp-name`.
2. Đổi tên nhánh thành `proper-feature` bằng `git branch -m temp-name proper-feature`.
3. Kiểm tra lại bằng `git branch` để thấy tên mới xuất hiện.
4. Xóa nhánh đó bằng lệnh `git branch -d proper-feature`.

---

## 💡 Hint
Nhớ quy tắc chữ cái: `-d` là xóa an toàn (delete), `-m` là đổi tên (move/rename).

---

## ✅ Validation
- Nhánh tạm được đổi tên và sau đó xóa thành công.
- Lệnh `git branch` xác nhận nhánh phụ đã được dọn sạch khỏi danh sách.

---

## ❓ Quiz
Trả lời các câu hỏi sau để nắm vững các kỹ thuật đổi tên và xóa nhánh an toàn trong Git.

---

## 🔥 Challenge
Tìm hiểu cách khôi phục lại một commit bị xóa nhầm bằng cờ `-D` thông qua việc tra cứu lịch sử đầu đọc bằng lệnh `git reflog`.

---

## 📚 Tổng kết
- Xóa nhánh chỉ là gỡ bỏ nhãn con trỏ; các commit đã merge luôn nằm an toàn trong nhánh chính.
- Dùng cờ `-m` để đổi tên nhánh và cờ `-d` để xóa nhánh an toàn sau khi hoàn tất công việc.
- Thường xuyên dọn dẹp các nhánh cũ giúp kho lưu trữ luôn sạch sẽ và chuyên nghiệp.
