# Hoàn tác thay đổi Working Tree

---

## 🎯 Mục tiêu
- Sử dụng lệnh hiện đại `git restore <file>` để hủy bỏ các sửa đổi dở dang trong Working Tree.
- Sử dụng `git restore --staged <file>` để unstage tệp tin an toàn.
- Hiểu rõ sự nguy hiểm và tính không thể khôi phục khi hủy bỏ thay đổi chưa commit.

---

## 📖 Định nghĩa
> Hoàn tác thay đổi trong Working Tree là thao tác khôi phục nội dung của một hoặc nhiều tệp tin đang bị sửa đổi (Modified) trở về trạng thái nguyên bản sạch sẽ của chúng trong snapshot commit gần nhất hoặc trong Staging Area. Kể từ phiên bản Git 2.23, câu lệnh chuyên trách tiêu chuẩn được sử dụng cho mục đích này là `git restore`. Lệnh này giúp tách biệt rõ ràng tác vụ khôi phục tệp ra khỏi câu lệnh đa năng nhưng dễ gây nhầm lẫn trước đây là `git checkout`.

---

## 🤔 Tại sao cần?
Trong quá trình lập trình, không hiếm những lúc bạn thử nghiệm một ý tưởng thuật toán mới hoặc tái cấu trúc một hàm phức tạp nhưng thất bại thảm hại, khiến code bị lỗi tùm lum và không thể chạy được. Thay vì phải bấm Ctrl+Z hàng trăm lần trong vô vọng và lo sợ bỏ sót lỗi, bạn chỉ cần thực thi một câu lệnh `git restore` duy nhất để đưa toàn bộ tệp tin trở về trạng thái hoạt động hoàn hảo 100% như lúc ban đầu chỉ trong một phần nghìn giây.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung thao tác `git restore` giống như việc bạn bấm nút "Phục hồi cài đặt gốc" (Factory Reset) trên chiếc điện thoại thông minh của mình, hoặc bấm nút hoàn tác trên bảng vẽ kỹ thuật số. Mọi nét vẽ nháp nguệch ngoạc và thử nghiệm vụng về mà bạn vừa vẽ lên tấm toan trong buổi chiều hôm nay sẽ lập tức bị xóa sạch, trả lại bức tranh nguyên mẫu hoàn hảo đã được lưu trong bộ nhớ máy ảnh từ sáng sớm.

---

## 🖼 Sơ đồ
```text
Cơ chế hoạt động của git restore:
[Repository / HEAD] ────────── Phục hồi đè nội dung ─────────► [Working Directory]
  (Bản mẫu an toàn)                                             (Xóa bỏ code nháp)
         ▲                                                              ▲
         │                                                              │
         └───────────── git restore --staged ───► [Staging Area] ───────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư thử nghiệm viết lại toàn bộ module thanh toán phức tạp trong tệp payment.js nhằm hỗ trợ thêm ví điện tử mới. Tuy nhiên sau ba giờ thử nghiệm căng thẳng, giải pháp mới liên tục phát sinh ngoại lệ không mong muốn và làm vỡ toàn bộ luồng thanh toán hiện tại của khách hàng. Nhận thấy không thể tiếp tục cứu vãn đoạn code thử nghiệm dang dở này, kỹ sư mở cửa sổ terminal và thực thi ngay câu lệnh `git restore payment.js`. Ngay lập tức, tệp payment.js trên ổ đĩa được phục hồi hoàn toàn về trạng thái hoạt động trơn tru của commit gần nhất, giúp kỹ sư giải tỏa áp lực và an tâm bắt đầu lại với một hướng tiếp cận khác an toàn hơn.

---

## 💻 Command
```bash
git restore <file>
git restore .
git restore --staged <file>
```

---

## 🔍 Giải thích command
- `git restore <file>`: Hủy bỏ toàn bộ các thay đổi chưa staged trong tệp tin, khôi phục nội dung về trạng thái Staging Area hoặc HEAD.
- `git restore .`: Hủy bỏ toàn bộ thay đổi chưa staged trên tất cả các tệp trong thư mục làm việc hiện tại.
- `git restore --staged <file>`: Rút tệp tin ra khỏi Staging Area (unstage) nhưng giữ nguyên nội dung bạn đã sửa trong Working Directory.

---

## ⚠️ Sai lầm phổ biến
1. **Không nhận thức được tính nguy hiểm không thể đảo ngược của git restore**:  Các thay đổi chưa từng được commit một khi đã bị git restore sẽ biến mất vĩnh viễn và không thể cứu lại.
2. **Nhầm lẫn giữa `git restore <file>` và `git restore --staged <file>`**:  Một đằng hủy bỏ nội dung trên ổ đĩa, một đằng chỉ rút khỏi khu vực chuẩn bị.
3. **Sử dụng các lệnh cũ dễ gây nhầm lẫn**:  Cố dùng `git checkout -- <file>` thay vì cú pháp hiện đại rõ nghĩa `git restore`.

---

## 🧪 Lab
1. Mở tệp `app.js` và thêm vào một dòng code lỗi cố ý.
2. Kiểm tra `git status` để thấy tệp ở trạng thái Modified màu đỏ.
3. Chạy lệnh `git restore app.js` để hủy bỏ thay đổi.
4. Kiểm tra lại nội dung tệp để xác nhận dòng lỗi đã biến mất hoàn toàn.

---

## 💡 Hint
> Hãy cẩn trọng: `git restore <file>` sẽ ghi đè vĩnh viễn nội dung chưa commit!

---

## ✅ Validation
- Tệp tin được hoàn tác thành công về trạng thái sạch sẽ của HEAD.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về các thao tác hoàn tác với git restore.

---

## 🔥 Challenge
Nêu sự khác biệt căn bản giữa `git restore` và `git reset` trong Git hiện đại.

---

## 📚 Tổng kết
- `git restore <file>` hủy bỏ các thay đổi dở dang trong Working Tree, đưa tệp về trạng thái sạch.
- `git restore --staged <file>` rút tệp ra khỏi Staging Area mà không làm mất nội dung sửa đổi.
- Thao tác hủy bỏ thay đổi chưa commit là vĩnh viễn, không thể phục hồi qua Git.
