# git commit --amend

---

## 🎯 Mục tiêu
- Hiểu rõ cơ chế hoạt động của cờ `--amend` trong câu lệnh `git commit`.
- Sử dụng `--amend` để sửa đổi thông điệp của commit gần nhất một cách nhanh chóng.
- Bổ sung các tệp tin hoặc dòng code bị bỏ quên vào commit gần nhất mà không sinh ra commit mới.
- Nhận thức rõ bản chất: `--amend` tạo ra một commit hash mới thay thế commit cũ (viết lại lịch sử).

---

## 📖 Định nghĩa
> `git commit --amend` là câu lệnh tiện ích chuyên dụng trong Git cho phép bạn chỉnh sửa và cập nhật trực tiếp vào commit snapshot gần đây nhất trên nhánh hiện tại. Khi thực thi câu lệnh này, Git sẽ kết hợp toàn bộ các thay đổi đang nằm trong Staging Area với nội dung của commit trước đó, mở trình soạn thảo để bạn cập nhật lại thông điệp commit (nếu muốn) và tạo ra một commit mới hoàn toàn thay thế cho commit cũ.

---

## 🤔 Tại sao cần?
Trong thực tế, tình huống bạn vừa ấn commit xong thì mới sực nhớ ra mình quên chưa lưu một tệp định dạng, hoặc phát hiện tiêu đề commit bị gõ sai chính tả xảy ra gần như hàng ngày. Nếu tạo thêm một commit con chỉ để sửa lỗi chính tả hay thêm một dòng code, cây lịch sử của bạn sẽ trở nên nhếch nhác và nghiệp dư. `git commit --amend` giúp bạn giữ cho lịch sử dự án luôn sạch sẽ, sắc nét và chuyên nghiệp nhất.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn vừa chụp một bức ảnh kỷ yếu tập thể và in ra một bức ảnh mẫu (commit). Khi nhìn kỹ bức ảnh, bạn phát hiện một bạn ở góc áo bị lệch vạt. Thay vì dán thêm một bức ảnh nhỏ xíu chụp riêng vạt áo đè lên trên cuốn album, bạn mời bạn đó chỉnh lại áo ngay ngắn và chụp đè lại một bức ảnh hoàn hảo khác thay thế tấm ảnh lỗi vào đúng trang album đó (`git commit --amend`). Người xem album chỉ thấy duy nhất một bức ảnh hoàn mỹ.

---

## 🖼 Sơ đồ
```text
Bản chất của git commit --amend:
Trước khi amend:
C1 ──► C2 (Commit có thông điệp sai hoặc thiếu tệp) [HEAD]

Sau khi sửa tệp, git add và git commit --amend:
C1 ──► C3 (Commit mới hoàn hảo, thay thế hoàn toàn C2) [HEAD]
(C2 bị tách rời và sẽ được dọn rác)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Trung vừa thực hiện commit tính năng đăng nhập với thông điệp: "feat: logn system" (bị gõ sai chính tả chữ login) và quên chưa thêm tệp icon `favicon.ico` vào dự án. Trung không hề bối rối tạo commit mới gây rác lịch sử. Trung đưa tệp icon vào staging bằng lệnh `git add favicon.ico`, sau đó gõ câu lệnh: `git commit --amend -m "feat: login system"`. Git lập tức gom tệp icon vào cùng với các tệp trước đó, sửa lại tiêu đề commit cho chuẩn xác và thay thế commit cũ bằng một commit mới tinh gọn, giữ cho cây lịch sử của nhánh luôn ở trạng thái sạch sẽ và chuyên nghiệp nhất.

---

## 💻 Command
```bash
git commit --amend
git commit --amend -m "<thông-điệp-mới>"
git commit --amend --no-edit
```

---

## 🔍 Giải thích command
- `git commit --amend`: Mở trình soạn thảo văn bản để bạn cập nhật thông điệp hoặc gộp các tệp đã staged vào commit gần nhất.
- `git commit --amend -m "<msg>"`: Sửa trực tiếp thông điệp commit ngay trên dòng lệnh mà không cần mở editor.
- `git commit --amend --no-edit`: Thêm các tệp đã staged vào commit gần nhất mà giữ nguyên thông điệp cũ không thay đổi.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy commit amend sau khi đã push commit đó lên GitHub**:  Khiến commit trên máy và commit trên server có mã hash khác nhau, dẫn đến bị từ chối push.
2. **Tưởng rằng amend sửa trực tiếp trên commit cũ**:  Thực chất Git tạo ra commit mới với mã SHA-1 mới hoàn toàn.
3. **Quên git add tệp cần bổ sung trước khi chạy `git commit --amend --no-edit`.**: Quên git add tệp cần bổ sung trước khi chạy `git commit --amend --no-edit`.

---

## 🧪 Lab
1. Tạo một commit với thông điệp sai chính tả `initail commit`.
2. Chạy lệnh `git commit --amend -m "initial commit"` để sửa lỗi chính tả.
3. Tạo một tệp mới `extra.txt`, chạy `git add extra.txt`.
4. Chạy `git commit --amend --no-edit` để gộp tệp vào commit đó mà không đổi thông điệp.
5. Dùng `git log -n 1 --stat` để kiểm tra kết quả hoàn hảo.

---

## 💡 Hint
> Dùng cờ `--no-edit` khi bạn chỉ muốn bổ sung tệp vào commit gần nhất mà không muốn đổi thông điệp.

---

## ✅ Validation
- Sửa đổi thành công thông điệp và bổ sung tệp vào commit gần nhất bằng cờ --amend.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh tiện ích git commit --amend.

---

## 🔥 Challenge
Tại sao mã hash của commit luôn luôn bị thay đổi sau khi bạn chạy lệnh `git commit --amend`?

---

## 📚 Tổng kết
- `git commit --amend` cập nhật commit gần nhất bằng cách gộp các tệp đã staged hoặc sửa message.
- Cờ `--no-edit` giúp bổ sung tệp mà không làm thay đổi thông điệp commit sẵn có.
- Chỉ nên sử dụng amend cho các commit cục bộ cá nhân chưa từng push lên nhánh dùng chung.
