# Khái niệm nhánh (branch) trong Git

---

## 🎯 Mục tiêu
- Hiểu thấu bản chất công nghệ: Branch chỉ là con trỏ siêu nhẹ trỏ tới commit, không phải bản sao thư mục.
- Giải mã vai trò của nhánh `main` và hiểu rõ quy ước tổ chức nhánh trong môi trường dự án thực tế.
- Sử dụng thành thạo `git branch` để thanh tra danh sách các luồng phát triển và vị trí nhánh đang đứng.

---

## 🧩 Từ khóa hôm nay

### Branch — nhánh
- **Nói dễ hiểu:** Một con trỏ định danh siêu nhẹ trỏ tới commit mới nhất của một luồng công việc độc lập.
- **Ví dụ:** Tạo nhánh `feature-cart` để lập trình tính năng giỏ hàng mà không làm xáo trộn nhánh chính.
- **Đừng nhầm:** Nhánh trong Git chỉ là một file văn bản chứa 40 ký tự mã băm commit, hoàn toàn không phải một bản sao chép thư mục nặng nề như các VCS đời cũ.

### Commit — mốc trong lịch sử
- **Nói dễ hiểu:** Một viên gạch nền tảng snapshot bất biến lưu lại toàn bộ trạng thái dự án tại một khoảnh khắc cụ thể.
- **Ví dụ:** Sau khi hoàn thành logic xác thực mật khẩu, bạn tạo commit để ghi nhận cột mốc vững chắc.
- **Đừng nhầm:** Commit là một điểm cố định bất biến trong quá khứ; còn nhánh là một con trỏ di động trỏ tới commit đó.

### `main` — tên nhánh thường dùng
- **Nói dễ hiểu:** Tên nhánh mặc định đóng vai trò là dòng chảy tích hợp trung tâm của hầu hết các dự án phần mềm hiện đại.
- **Ví dụ:** Khi bạn vừa khởi tạo kho mã nguồn hoặc clone về máy, nhánh làm việc mặc định thường là `main`.
- **Đừng nhầm:** Cái tên `main` chỉ là một quy ước đặt tên phổ biến; Git không cấp cho nó bất kỳ phép màu hay đặc quyền công nghệ nào khác biệt so với các nhánh khác.

---

## 📖 Định nghĩa
Branch (nhánh) trong Git thực chất là một con trỏ siêu nhẹ (chỉ nặng đúng 41 bytes chứa mã băm commit) trỏ tới đỉnh mốc lịch sử của một luồng phát triển độc lập. Mỗi khi bạn tạo commit mới, con trỏ nhánh tự động dịch chuyển về phía trước để neo vào snapshot mới nhất mà hoàn toàn không nhân bản hay tốn thêm dung lượng thư mục dự án.

---

## 🤔 Tại sao cần?
Hãy tưởng tượng nếu cả đội ngũ 10 kỹ sư cùng code thẳng vào một nhánh duy nhất: người đang sửa dở chức năng thanh toán sẽ làm gãy bản build của người đang viết giao diện đăng nhập. Phân nhánh tạo ra những vũ trụ song song an toàn, cho phép bạn tự do thử nghiệm, sáng tạo và hoàn thiện từng tính năng độc lập trước khi gộp trở lại vào dòng chảy chính của dự án.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung các commit như những bậc thang đá dựng đứng dẫn lên đỉnh núi, còn Branch giống như những dải ruy-băng đánh dấu màu sắc khác nhau buộc vào các bậc đá. Khi bạn leo thêm một bậc thang mới trên lộ trình của mình, dải ruy-băng nhánh của bạn sẽ được buộc nhấc lên bậc thang cao nhất đó, trong khi các dải ruy-băng của đồng đội vẫn nằm yên tại bậc đá của họ.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ CON TRỎ NHÁNH SIÊU NHẸ CỦA GIT:

  Lịch sử commit:  (C1) ◄── (C2) ◄── (C3)
                             ▲         ▲
                             │         └── [main] (Con trỏ nhánh chính)
                             └──────────── [feature-cart] (Con trỏ nhánh tính năng)

  Tạo nhánh mới = Chỉ tạo thêm 1 file 41 bytes trong .git/refs/heads/
  Chưa hề sao chép bất kỳ file code nào trên ổ cứng!
```

---

## 🌎 Ví dụ thực tế
Trong một dự án ví điện tử, nhánh `main` lưu trữ mã nguồn chuẩn đang chạy cho hàng triệu người dùng. Khi bạn được giao tích hợp cổng thanh toán Apple Pay, bạn lập tức tạo nhánh `feature/apple-pay`. Mọi thử nghiệm sai sót, sửa chữa của bạn đều nằm gọn trong nhánh này, đảm bảo `main` của khách hàng luôn chạy mượt mà và an toàn tuyệt đối.

---

## 💻 Command
```bash
git branch
git branch feature-cart
git branch --list
```

---

## 🔍 Giải thích command
- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong repository của bạn; dấu hoa thị `*` biểu thị nhánh bạn đang đứng.
- `git branch <tên-nhánh>`: Tạo ra một nhánh mới ngay tại vị trí commit hiện tại của HEAD, nhưng chưa chuyển chỗ làm việc sang đó.
- `git branch --list`: Tùy chọn tường minh tương đương với lệnh liệt kê cơ bản.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng tạo nhánh là nhân đôi toàn bộ thư mục**: Nhiều bạn sợ tạo nhánh vì nghĩ ổ cứng sẽ bị tốn dung lượng; thực tế nhánh trong Git chỉ tốn vài chục bytes bộ nhớ.
2. **Nghĩ rằng gõ `git branch <tên>` sẽ tự nhảy sang nhánh mới**: Lệnh này chỉ đơn thuần cắm thêm một chiếc cờ mang tên mới; bạn vẫn đang đứng yên ở nhánh cũ!
3. **Thần thánh hóa nhánh `main`**: Tưởng rằng `main` tự động chống lỗi; `main` chỉ là một cái tên thông thường do cộng đồng quy ước.

---

## 🧪 Lab
1. Mở terminal gõ `git branch` để kiểm tra danh sách nhánh hiện tại và nhận diện dấu `*`.
2. Tạo nhánh tính năng mới bằng lệnh `git branch feature-cart`.
3. Chạy lại `git branch` để kiểm tra kết quả danh sách.
4. Xác nhận nhánh `feature-cart` đã xuất hiện nhưng dấu hoa thị `*` vẫn kiên định nằm ở nhánh ban đầu của bạn.

---

## 💡 Hint
> Tạo nhánh mới chỉ là cắm một chiếc cờ mới vào commit hiện tại; để bước chân sang đó bạn cần dùng lệnh chuyển nhánh!

---

## ✅ Validation
- Danh sách nhánh xuất hiện tên nhánh mới `feature-cart`.
- Dấu `*` vẫn hiển thị chính xác trước nhánh ban đầu, chứng minh bạn chưa bị chuyển dịch vị trí làm việc ngoài ý muốn.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để kiểm tra mức độ thấu hiểu của bạn về bản chất con trỏ nhánh trong Git.

---

## 🔥 Challenge
Hãy mở thư mục ngầm `.git/refs/heads/` trên máy và xem nội dung file mang tên nhánh vừa tạo. Bạn thấy gì bên trong file đó? Hãy giải thích tại sao Git lại có thể tạo và xóa nhánh trong thời gian chỉ vài mili-giây!

---

## 📚 Tổng kết
- Branch trong Git là con trỏ nhẹ trỏ tới commit, hoàn toàn không nhân bản mã nguồn.
- Lệnh `git branch <tên>` chỉ tạo mốc con trỏ mới chứ không tự động chuyển nhánh.
- Phân nhánh độc lập là nền tảng cốt lõi của mọi quy trình làm việc nhóm chuyên nghiệp.
