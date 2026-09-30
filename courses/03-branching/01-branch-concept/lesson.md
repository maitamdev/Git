# Khái niệm Branch trong Git

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất kỹ thuật nhẹ nhàng của Branch trong Git như một con trỏ di động 41 byte.
- So sánh sự vượt trội của Git Branching so với các hệ thống quản lý phiên bản truyền thống.
- Nắm bắt vòng đời của nhánh từ khi tạo mới, phân kỳ, tới khi hợp nhất vào nhánh chính.
- Giải thích được cấu trúc đồ thị luồng phát triển song song trong thực tế.

---

## 📖 Định nghĩa
> Branch (Nhánh) trong Git về bản chất kỹ thuật là một con trỏ có thể di chuyển (movable pointer), trỏ trực tiếp tới một commit snapshot cụ thể trong đồ thị Directed Acyclic Graph (DAG). Khác với các hệ thống VCS tập trung cũ vốn sao chép toàn bộ thư mục tệp tin rất nặng nề và chậm chạp, một nhánh trong Git chỉ là một tệp văn bản nhỏ gọn 41 byte chứa đúng chuỗi mã băm SHA-1 của commit đỉnh. Khi bạn tạo commit mới trên nhánh đó, con trỏ nhánh sẽ tự động tiến về phía trước để trỏ vào commit mới nhất.

---

## 🤔 Tại sao cần?
Trong quy trình phát triển phần mềm hiện đại, nhiều lập trình viên phải cùng nhau xây dựng các tính năng độc lập, sửa lỗi khẩn cấp hoặc thử nghiệm ý tưởng mới mà không được làm gián đoạn mã nguồn đang chạy trên môi trường production. Branch cung cấp không gian làm việc hoàn toàn cách ly: bạn có thể thoải mái sửa đổi, thử nghiệm và xóa bỏ mà không ảnh hưởng tới đồng nghiệp. Tạo nhánh trong Git chỉ mất vài phần nghìn giây, giúp bạn tự tin chia nhỏ dự án thành các luồng phát triển an toàn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung lịch sử dự án như một thân cây cổ thụ vững chắc mọc thẳng lên trời. Mỗi khi bạn muốn phát triển một tính năng mới, bạn cho thân cây mọc ra một cành cây nhỏ rẽ sang một bên. Bạn có thể trèo lên cành cây đó để hái quả, tỉa lá hoặc trang trí đèn mà không làm lung lay thân cây chính. Nếu cành cây phát triển xanh tốt và đơm hoa kết trái ngọt ngào, bạn sẽ ghép cành đó trở lại thân cây chính. Còn nếu cành cây bị sâu bệnh hỏng hóc, bạn chỉ việc cắt bỏ cành đó đi mà thân cây vẫn sừng sững an toàn.

---

## 🖼 Sơ đồ
```text
Cơ chế con trỏ nhánh trong đồ thị commit:
Commit C1 ◄── Commit C2 ◄── Commit C3 (main)
                              ▲
                              └── Commit C4 (feature-login)
```

---

## 🌎 Ví dụ thực tế
Một công ty phần mềm đang vận hành trang thương mại điện tử với nhánh main chứa phiên bản ổn định cho khách hàng mua sắm. Khi được giao nhiệm vụ tích hợp cổng thanh toán mới, lập trình viên Minh tạo ngay một nhánh riêng biệt mang tên feature-payment tách ra từ main. Suốt hai tuần làm việc, Minh tạo hàng chục commit thử nghiệm trên nhánh feature-payment. Trong thời gian đó, các đồng nghiệp khác vẫn sửa lỗi giao diện và cập nhật giá sản phẩm trên nhánh main mà hai bên hoàn toàn không hề giẫm chân lên nhau.

---

## 💻 Command
```bash
git branch
git branch <tên-nhánh>
git branch -v
git branch -d <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git branch`: Liệt kê tất cả các nhánh cục bộ hiện có trong kho lưu trữ và đánh dấu nhánh hiện tại bằng dấu sao màu xanh.
- `git branch <tên-nhánh>`: Tạo một con trỏ nhánh mới trỏ vào commit hiện tại mà không tự động chuyển sang nhánh đó.
- `git branch -v`: Hiển thị danh sách các nhánh kèm mã hash commit và tiêu đề commit mới nhất của từng nhánh.
- `git branch -d <tên-nhánh>`: Xóa nhánh đã được hợp nhất an toàn khỏi kho lưu trữ cục bộ.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ tạo nhánh là copy toàn bộ mã nguồn**:  Git chỉ tạo một con trỏ 41 byte, thao tác gần như tức thì và tốn cực ít dung lượng.
2. **Code trực tiếp mọi thứ trên nhánh main**:  Thói quen nguy hiểm làm mất tính ổn định của mã nguồn đưa lên production.
3. **Đặt tên nhánh mơ hồ**:  Đặt tên như test, abc khiến đồng nghiệp không thể biết mục đích của nhánh đó là gì.

---

## 🧪 Lab
1. Chạy lệnh `git branch` để xem nhánh mặc định hiện tại.
2. Tạo nhánh mới bằng lệnh `git branch feature-cart`.
3. Chạy `git branch -v` để thấy cả hai nhánh cùng trỏ vào một commit hash.
4. Quan sát dấu sao định vị nhánh làm việc hiện tại.

---

## 💡 Hint
> Nhánh chỉ là một con trỏ nhẹ; hãy tạo nhánh tự do cho từng tính năng.

---

## ✅ Validation
- Kiểm tra `git branch` liệt kê đầy đủ nhánh vừa tạo.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về khái niệm và bản chất của Branch.

---

## 🔥 Challenge
Mở tệp `.git/refs/heads/main` bằng lệnh `cat` để tự mình nhìn thấy chuỗi hash 40 ký tự bên trong.

---

## 📚 Tổng kết
- Branch trong Git là con trỏ di động trỏ vào commit đỉnh của một luồng lịch sử.
- Tạo nhánh cực nhanh và tốn rất ít tài nguyên vì chỉ sinh ra một tệp 41 byte.
- Luôn chia nhỏ công việc thành các nhánh tính năng để bảo vệ sự ổn định của nhánh chính.
