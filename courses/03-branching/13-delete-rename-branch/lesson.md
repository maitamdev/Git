# Xóa và đổi tên nhánh an toàn

---

## 🎯 Mục tiêu
- Nắm vững kỹ thuật dọn dẹp và bảo trì hệ thống nhánh sau khi hoàn tất tính năng.
- Sử dụng thành thạo cú pháp đổi tên nhánh hiện tại và đổi tên nhánh bất kỳ từ xa.
- Phân biệt rõ ràng giữa cờ an toàn `-d` và cờ cưỡng chế `-D` khi xóa nhánh.
- Hiểu cách xóa nhánh trên máy chủ từ xa thông qua lệnh `git push origin --delete <nhánh>`.

---

## 📖 Định nghĩa
> Xóa và đổi tên nhánh là các thao tác bảo trì thiết yếu trong vòng đời phát triển phần mềm, giúp giữ cho kho lưu trữ Git luôn tinh gọn, dễ quản lý và tuân thủ các quy chuẩn đặt tên của đội ngũ kỹ thuật. Thao tác xóa nhánh trong Git chỉ đơn thuần là xóa bỏ một tệp con trỏ nhỏ 41 byte trong thư mục `.git/refs/heads/`, trong khi các commit object bên dưới vẫn tồn tại an toàn trong cơ sở dữ liệu cho đến khi trình thu gom rác (Garbage Collector) hoạt động.

---

## 🤔 Tại sao cần?
Trong quá trình phát triển dự án, việc đặt tên nhánh sai chính tả, đặt tên không đúng quy ước (ví dụ: thiếu tiền tố `feature/` hoặc `bugfix/`) xảy ra thường xuyên. Khả năng đổi tên nhánh nhanh chóng giúp bạn chuẩn hóa quy trình trước khi tạo Pull Request. Ngoài ra, việc chủ động xóa các nhánh đã hoàn thành và đã được merge giúp đồng nghiệp không bị bối rối trước một danh sách hàng chục nhánh cũ đã lỗi thời.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung các con trỏ nhánh giống như những chiếc thẻ đánh dấu trang sách (Bookmark) kẹp vào các trang của một cuốn bách khoa toàn thư. Khi bạn đọc xong một chương sách và ghi nhớ trọn vẹn kiến thức (đã merge), bạn rút chiếc thẻ đánh dấu trang đó ra cất đi (xóa nhánh) để cuốn sách gọn gàng. Các trang sách và nội dung chữ bên trong cuốn sách (các commit) hoàn toàn không hề bị rách hay biến mất, chúng vẫn nằm nguyên vẹn trong gáy cuốn sách.

---

## 🖼 Sơ đồ
```text
Cơ chế rút thẻ đánh dấu trang (Xóa nhánh):
Trước khi xóa:
main ──────────► Commit C3
feature-cart ──► Commit C3 (Trỏ cùng commit C3)

Sau khi chạy: git branch -d feature-cart
main ──────────► Commit C3
(Chỉ có con trỏ feature-cart bị gỡ bỏ, Commit C3 vẫn an toàn 100%)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Long vừa hoàn tất và merge thành công nhánh tính năng feature-auth vào nhánh main của dự án công ty. Khi kiểm tra lại danh sách các nhánh trên máy tính cá nhân, Long thấy nhánh cũ vẫn còn tồn tại và hiển thị trong terminal. Long nhanh chóng chuyển về nhánh main bằng câu lệnh `git switch main` rồi tự tin thực thi lệnh: `git branch -d feature-auth`. Git kiểm tra thấy toàn bộ commit đã được tích hợp an toàn và in ra thông báo: "Deleted branch feature-auth (was 7a9c1e2)." Danh sách nhánh của Long giờ đây chỉ còn lại nhánh main sạch sẽ, tinh tươm, giúp Long tập trung cao độ và sẵn sàng nhận nhiệm vụ tiếp theo từ đội ngũ mà không sợ nhầm lẫn.

---

## 💻 Command
```bash
git branch -m <tên-mới>
git branch -m <tên-cũ> <tên-mới>
git branch -d <tên-nhánh>
git branch -D <tên-nhánh>
git push origin --delete <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git branch -m <tên-mới>`: Đổi tên nhánh hiện tại bạn đang đứng sang tên mới.
- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên một nhánh bất kỳ mà không cần phải chuyển sang nhánh đó.
- `git branch -d <tên-nhánh>`: Xóa nhánh an toàn (chỉ cho phép xóa nếu nhánh đã được merge vào HEAD).
- `git branch -D <tên-nhánh>`: Ép buộc xóa nhánh ngay lập tức, hữu ích khi muốn vứt bỏ nhánh code thử nghiệm thất bại.
- `git push origin --delete <nhánh>`: Xóa con trỏ nhánh tương ứng trên máy chủ từ xa GitHub.

---

## ⚠️ Sai lầm phổ biến
1. **Cố gắng xóa nhánh hiện tại**:  Phải switch sang nhánh khác trước khi xóa.
2. **Sợ mất code khi xóa nhánh đã merge**:  Nhánh đã merge thì toàn bộ commit đã nằm trong main, xóa con trỏ nhánh con không làm mất một dòng code nào.
3. **Đổi tên nhánh cục bộ nhưng quên cập nhật trên GitHub**:  Khiến nhánh trên máy và nhánh trên remote bị lệch tên nhau.

---

## 🧪 Lab
1. Tạo nhánh tạm `temp-name` bằng `git branch temp-name`.
2. Đổi tên nhánh thành `proper-feature` bằng `git branch -m temp-name proper-feature`.
3. Kiểm tra lại bằng `git branch` để thấy tên mới.
4. Xóa nhánh đó bằng `git branch -d proper-feature`.

---

## 💡 Hint
> Nhớ quy tắc: `-d` là xóa an toàn (delete), `-m` là đổi tên (move).

---

## ✅ Validation
- Thực hiện đổi tên và xóa nhánh thành công, xác nhận qua `git branch`.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng đổi tên và xóa nhánh an toàn.

---

## 🔥 Challenge
Nêu cách phục hồi một nhánh vô tình bị xóa bằng cờ `-D` thông qua câu lệnh `git reflog`.

---

## 📚 Tổng kết
- Xóa nhánh chỉ là xóa con trỏ 41 byte, commit đã merge luôn nằm an toàn trong main.
- Đổi tên nhánh nhanh chóng bằng cờ `-m`, xóa nhánh an toàn bằng cờ `-d`.
- Dọn dẹp nhánh thường xuyên là thói quen chuyên nghiệp của kỹ sư phần mềm.
