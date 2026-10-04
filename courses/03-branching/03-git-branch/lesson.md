# Xem và tạo nhánh bằng `git branch`

---

## 🎯 Mục tiêu
- Sử dụng thành thạo `git branch` để kiểm tra danh mục toàn bộ các nhánh cục bộ.
- Khởi tạo nhánh tính năng mới một cách chuẩn mực bằng `git branch <tên-nhánh>`.
- Đọc vị chính xác ý nghĩa của dấu hoa thị `*` biểu thị nhánh đang được kích hoạt.

---

## 🧩 Từ khóa hôm nay

### Danh sách nhánh
- **Nói dễ hiểu:** Bản thống kê tất cả các luồng làm việc độc lập đang tồn tại trong kho mã nguồn trên máy của bạn.
- **Ví dụ:** Chạy `git branch` hiển thị danh sách gồm `main`, `develop` và `feature-cart`.
- **Đừng nhầm:** Lệnh mặc định này chỉ liệt kê các nhánh nội bộ trên máy cá nhân, không tự động tải hay hiển thị các nhánh mới của đồng đội trên GitHub.

### Dấu `*` — nhánh hiện tại
- **Nói dễ hiểu:** Dấu chỉ điểm trực quan (thường có màu xanh lá) gắn trước tên nhánh mà con trỏ HEAD đang bám vào.
- **Ví dụ:** Nhìn thấy `* main` nghĩa là mọi commit mới bạn tạo ra sẽ thuộc về nhánh `main`.
- **Đừng nhầm:** Tạo nhánh mới sẽ không làm dịch chuyển dấu `*`; bạn vẫn đứng nguyên tại chỗ cho tới khi dùng lệnh chuyển nhánh.

### `git branch <tên>` — tạo nhánh
- **Nói dễ hiểu:** Thao tác cắm thêm một chiếc cờ định danh mới trỏ vào mốc snapshot hiện tại của bạn.
- **Ví dụ:** `git branch feature-payment` tạo nhánh riêng biệt cho tính năng thanh toán.
- **Đừng nhầm:** Lệnh chỉ làm nhiệm vụ khai sinh nhánh mới, hoàn toàn chưa chuyển thư mục làm việc hay HEAD sang nhánh đó.

---

## 📖 Định nghĩa
`git branch` là trung tâm điều phối và quản lý toàn bộ các nhánh trong kho mã nguồn cục bộ của bạn. Khi chạy không kèm tham số, lệnh sẽ xuất ra bản danh sách đầy đủ các luồng phát triển hiện hữu. Khi truyền thêm một tên nhánh phía sau, Git sẽ tạo ra một con trỏ nhánh mới trỏ thẳng vào commit hiện tại của bạn mà không hề làm suy chuyển vị trí làm việc.

---

## 🤔 Tại sao cần?
Trước khi bắt tay vào code bất kỳ dòng nào, câu hỏi đầu tiên của một kỹ sư chuyên nghiệp luôn là: 'Tôi đang đứng ở đâu và nhánh này có an toàn để làm việc không?'. Lệnh `git branch` giúp bạn định vị chính xác nhánh hiện tại thông qua dấu hoa thị `*`, rà soát các nhánh rác cần dọn dẹp và chủ động khởi tạo các nhánh tính năng mới theo quy chuẩn phát triển phần mềm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem `git branch` như danh bạ các kênh đàm thoại nội bộ trong một tòa nhà. Khi bạn mở danh bạ (chạy lệnh), đèn tín hiệu xanh (dấu `*`) sẽ sáng lên ở kênh bạn đang kết nối đàm thoại. Khi bạn thêm một tên kênh mới vào danh bạ, kênh mới sẵn sàng hoạt động nhưng bạn vẫn đang tiếp tục nghe nói ở kênh cũ cho đến khi bạn bấm nút chuyển kênh.

---

## 🖼 Sơ đồ
```text
QUY TRÌNH TẠO NHÁNH BẰNG GIT BRANCH:

Bước 1: Ban đầu đang ở nhánh main
  * main ────────► [Commit C2]

Bước 2: Chạy lệnh `git branch feature-cart`
  * main ────────┐
    feature-cart ┴──► [Commit C2]
  (Cả 2 nhánh cùng trỏ vào C2, nhưng dấu * vẫn ở main!)
```

---

## 🌎 Ví dụ thực tế
Sáng nay bạn được phân công làm giao diện giỏ hàng mới. Bạn gõ `git branch` để kiểm tra thấy mình đang ở `* main`. Bạn gõ `git branch feature/shopping-cart` để đăng ký luồng việc mới. Kiểm tra lại bằng `git branch`, nhánh mới đã nằm sẵn sàng trong danh bạ nhưng bạn vẫn an tọa tại `* main`, hoàn toàn chủ động trước khi quyết định chuyển sang.

---

## 💻 Command
```bash
git branch
git branch feature-cart
git branch -v
git branch -a
```

---

## 🔍 Giải thích command
- `git branch`: Hiển thị danh sách các nhánh nội bộ; nhánh hiện tại có tiền tố `*` và màu nổi bật.
- `git branch <tên-nhánh>`: Tạo nhánh mới tại commit hiện tại mà HEAD đang trỏ vào.
- `git branch -v`: Liệt kê chi tiết kèm theo mã commit hash rút gọn và commit message gần nhất của từng nhánh.
- `git branch -a`: Hiển thị toàn bộ cả nhánh cục bộ (local) lẫn các nhánh theo dõi từ xa (remote-tracking).

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng đã nhảy sang nhánh mới sau khi tạo**: Gõ `git branch feature-x` xong tưởng đã ở nhánh đó và hăng say gõ code, đến khi commit mới tá hỏa phát hiện đã commit nhầm vào `main`!
2. **Đặt tên nhánh vô tội vạ**: Đặt tên nhánh kiểu `test`, `abc`, `fix` gây hỗn loạn dự án; hãy tuân thủ tiền tố như `feature/`, `bugfix/`, `hotfix/`.
3. **Nghĩ rằng `git branch` hiển thị ngay nhánh mới trên GitHub**: Bạn cần chạy `git fetch` trước thì Git mới cập nhật các nhánh từ xa về máy.

---

## 🧪 Lab
1. Chạy `git branch` để kiểm tra danh sách hiện tại và xác định xem nhánh nào đang có dấu `*`.
2. Tạo nhánh thử nghiệm mới bằng lệnh `git branch experiment`.
3. Chạy lại `git branch` để quan sát sự thay đổi của danh sách.
4. Xác minh rằng nhánh `experiment` đã xuất hiện nhưng dấu `*` vẫn nằm nguyên ở nhánh ban đầu.

---

## 💡 Hint
> Luôn nhìn kỹ dấu `*` trước tên nhánh trong kết quả của `git branch` để chắc chắn bạn không commit nhầm nhánh!

---

## ✅ Validation
- Nhánh `experiment` có mặt trong danh sách trả về của `git branch`.
- Dấu hoa thị `*` vẫn đứng trước nhánh làm việc ban đầu.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra kiến thức về các tùy chọn xem và tạo nhánh với lệnh git branch.

---

## 🔥 Challenge
Chạy lệnh `git branch -v` và giải thích chi tiết: 3 cột thông tin hiển thị trên mỗi dòng biểu thị điều gì và nó giúp ích thế nào khi bạn cần rà soát nhanh tiến độ của từng nhánh?

---

## 📚 Tổng kết
- `git branch` cung cấp bức tranh toàn cảnh về các luồng phát triển trong repository.
- Dấu `*` là chỉ dấu định vị sống còn cho biết bạn đang thực sự đứng ở nhánh nào.
- `git branch <tên>` chỉ tạo nhánh, bạn cần lệnh chuyên dụng để bước sang nhánh đó.
