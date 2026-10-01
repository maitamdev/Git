# Quản lý nhánh với git branch

---

## 🎯 Mục tiêu
- Sử dụng lệnh `git branch` để xem danh sách nhánh và kiểm tra nhánh đang làm việc.
- Đổi tên nhánh bằng cờ `-m` khi cần sửa tên cho đúng quy ước nhóm.
- Xóa nhánh an toàn với cờ `-d` và phân biệt với xóa cưỡng chế bằng cờ `-D`.

---

## 🧩 Từ khóa hôm nay

### git branch -d — xóa nhánh an toàn
- **Nói dễ hiểu:** Lệnh xóa một nhánh chỉ khi nhánh đó đã được gộp đầy đủ vào nhánh chính.
- **Ví dụ:** Sau khi tính năng `feature-cart` đã merge vào `main`, chạy `git branch -d feature-cart` để dọn dẹp.
- **Đừng nhầm:** Git sẽ từ chối xóa bằng cờ `-d` nếu nhánh đó còn commit chưa được gộp, giúp bạn tránh mất dữ liệu.

### git branch -D — xóa nhánh dứt khoát
- **Nói dễ hiểu:** Lệnh ép buộc xóa một nhánh ngay cả khi các commit trên nhánh đó chưa hề được gộp.
- **Ví dụ:** Bạn làm thử một tính năng nhưng quyết định hủy bỏ hoàn toàn nhánh `test-prototype`.
- **Đừng nhầm:** Xóa bằng cờ `-D` sẽ bỏ qua lớp bảo vệ an toàn; chỉ dùng khi bạn chắc chắn không cần mã nguồn đó nữa.

### git branch -m — đổi tên nhánh
- **Nói dễ hiểu:** Đổi tên một nhánh cũ sang tên mới chuẩn mực và rõ nghĩa hơn.
- **Ví dụ:** Chạy `git branch -m feat-log feature-login` để sửa tên nhánh theo đúng quy ước của nhóm.
- **Đừng nhầm:** Đổi tên nhánh chỉ đổi nhãn con trỏ; toàn bộ commit và lịch sử bên trong nhánh vẫn giữ nguyên vẹn.

---

## 📖 Định nghĩa
`git branch` là câu lệnh trung tâm để liệt kê, tạo mới, đổi tên và xóa bỏ các nhánh trong kho lưu trữ Git cục bộ. Khi chạy một mình, lệnh cho biết tất cả các nhánh hiện có và đánh dấu nhánh bạn đang đứng.

---

## 🤔 Tại sao cần?
Khi dự án phát triển lâu dài, mỗi tính năng hoặc lần sửa lỗi đều tạo ra một nhánh mới. Nếu không kiểm tra và dọn dẹp các nhánh đã hoàn thành, danh sách nhánh sẽ phình to, gây khó khăn cho việc tìm kiếm và dễ khiến bạn gõ nhầm tên nhánh.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git branch` như danh bạ các đường dây liên lạc trong văn phòng. Bạn có thể mở danh bạ để xem đang có những đường dây nào (liệt kê), đăng ký thêm dây cho dự án mới (tạo nhánh), đổi lại tên phòng ban (đổi tên nhánh) hoặc cắt bỏ dây của dự án đã kết thúc (xóa nhánh).

---

## 🖼 Sơ đồ
```text
Liệt kê nhánh:   git branch
Đổi tên nhánh:   git branch -m old-name new-name
Xóa an toàn:     git branch -d feature-cart   (chỉ xóa khi đã merge)
Xóa cưỡng chế:   git branch -D test-draft     (xóa bỏ code thử nghiệm)
```

---

## 🌎 Ví dụ thực tế
Bạn Nam hoàn thành việc viết trang thông tin liên hệ trên nhánh `feature-contact` và đã gộp thành công vào nhánh `main`. Để máy tính cá nhân gọn gàng, Nam chuyển về `main` rồi chạy `git branch -d feature-contact`. Git xóa con trỏ nhánh an toàn vì biết toàn bộ commit của Nam đã nằm chắc chắn trong nhánh `main`.

---

## 💻 Command
```bash
git branch
git branch -m <tên-cũ> <tên-mới>
git branch -d <tên-nhánh>
git branch -D <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ của bạn.
- `git branch -m <tên-cũ> <tên-mới>`: Đổi tên nhánh chỉ định sang tên mới.
- `git branch -d <tên-nhánh>`: Xóa nhánh đã được hợp nhất an toàn.
- `git branch -D <tên-nhánh>`: Ép buộc xóa nhánh, bỏ qua bước kiểm tra đã hợp nhất hay chưa.

---

## ⚠️ Sai lầm phổ biến
1. **Đứng ngay trên nhánh đó rồi đòi xóa:** Git sẽ từ chối xóa nhánh mà bạn đang đứng; bạn phải chuyển sang nhánh khác như `main` rồi mới xóa được.
2. **Dùng `-D` thành thói quen:** Dễ vô tình xóa mất những commit quan trọng mà bạn quên chưa gộp vào nhánh chính.
3. **Quên dọn dẹp nhánh sau khi đã gộp xong:** Để lại hàng chục nhánh cũ không còn dùng đến khiến danh sách bị rối.

---

## 🧪 Lab
Bài tập này được thực hành trên môi trường Git mô phỏng của hệ thống:
1. Chạy `git branch` để kiểm tra danh sách nhánh hiện tại.
2. Tạo nhánh thử nghiệm bằng lệnh `git branch temp-test`.
3. Đổi tên nhánh thành `experiment` bằng lệnh `git branch -m temp-test experiment`.
4. Xóa nhánh đó an toàn bằng lệnh `git branch -d experiment`.

---

## 💡 Hint
Hãy nhớ chuyển về nhánh `main` trước khi chạy lệnh xóa các nhánh tính năng phụ.

---

## ✅ Validation
- Nhánh `experiment` được tạo, đổi tên và xóa thành công.
- Lệnh `git branch` cuối cùng chỉ còn hiển thị nhánh `main`.

---

## ❓ Quiz
Trả lời các câu hỏi sau để nắm vững các thao tác tạo, đổi tên và xóa nhánh với `git branch`.

---

## 🔥 Challenge
Chạy lệnh `git branch --merged` để xem Git lọc ra những nhánh nào đã được hợp nhất an toàn vào nhánh hiện tại.

---

## 📚 Tổng kết
- `git branch` giúp quản lý toàn bộ vòng đời của các nhánh cục bộ trong dự án.
- Dùng cờ `-m` để đổi tên nhánh và cờ `-d` để xóa nhánh an toàn sau khi hoàn thành.
- Luôn chuyển sang nhánh khác trước khi thực hiện thao tác xóa nhánh.
