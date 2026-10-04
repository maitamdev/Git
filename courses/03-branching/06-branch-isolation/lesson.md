# Thay đổi đã commit được giữ riêng theo nhánh

---

## 🎯 Mục tiêu
- Thấu suốt cơ chế cô lập tuyệt đối của các commit trên từng nhánh riêng biệt.
- Thực hành tạo commit trên nhánh thử nghiệm và kiểm chứng sự vô hình của nó đối với nhánh `main`.
- Phân biệt rõ rệt giữa thay đổi đã commit (được cách ly) và sửa đổi dở dang chưa commit (có thể rò rỉ khi đổi nhánh).

---

## 🧩 Từ khóa hôm nay

### Cách ly thay đổi đã commit
- **Nói dễ hiểu:** Quy tắc các commit mới tạo sẽ được gắn chặt vào nhánh đang chọn; các nhánh khác không tự động cập nhật theo.
- **Ví dụ:** Nhánh `feature-chat` có commit thêm `chat.js`, nhưng khi bạn chuyển về `main` thì file `chat.js` hoàn toàn không xuất hiện.
- **Đừng nhầm:** Quy tắc cách ly này chỉ áp dụng cho code đã commit; các chỉnh sửa dở dang chưa commit có thể sẽ đi theo bạn khi đổi nhánh.

### Lịch sử phân kỳ
- **Nói dễ hiểu:** Hiện tượng hai nhánh cùng phát triển độc lập và tự tạo ra các commit riêng biệt sau một mốc commit chung trong quá khứ.
- **Ví dụ:** Nhánh `main` có thêm commit sửa lỗi bảo mật, trong khi nhánh `feature` có thêm commit giao diện mới.
- **Đừng nhầm:** Phân kỳ là trạng thái hoàn toàn lành mạnh và bình thường của mọi dự án thực tế trước khi tiến hành bước gộp code.

### Hợp nhất (merge)
- **Nói dễ hiểu:** Thao tác kết hợp lịch sử và nội dung từ một nhánh tính năng đưa trở lại vào nhánh chính của dự án.
- **Ví dụ:** Sau khi tính năng chat chạy ổn định, Tech Lead thực hiện merge nhánh `feature-chat` vào nhánh `main`.
- **Đừng nhầm:** Mã nguồn không bao giờ tự động gộp vào nhau; việc hợp nhất luôn đòi hỏi một quyết định thao tác có chủ đích của con người.

---

## 📖 Định nghĩa
Tính cô lập của nhánh (Branch Isolation) là nguyên lý cốt lõi của Git, bảo đảm rằng mọi commit tạo ra trên một nhánh chỉ thuộc về riêng nhánh đó và hoàn toàn vô hình đối với các nhánh khác. Các nhánh chỉ chia sẻ chung lịch sử cho tới điểm rẽ nhánh (tổ tiên chung); từ đó trở đi, mỗi nhánh phát triển trong thế giới riêng cho tới khi có lệnh hợp nhất chủ đích.

---

## 🤔 Tại sao cần?
Nếu không có tính năng cách ly tuyệt đối này, bạn sẽ không bao giờ dám thử nghiệm các giải pháp kiến trúc mạo hiểm vì sợ làm hỏng mã nguồn đang chạy của công ty. Tính cô lập cho phép nhiều lập trình viên cùng làm việc trên cùng một tệp tin ở các nhánh khác nhau mà không hề can thiệp hay làm gián đoạn công việc của nhau, mở ra khả năng cộng tác quy mô lớn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng mỗi nhánh là một vũ trụ song song trong truyện khoa học viễn tưởng. Khi bạn bước sang nhánh `feature-chat` và xây một tòa nhà (commit), tòa nhà đó chỉ tồn tại trong vũ trụ của bạn. Khi bạn bước ngược về vũ trụ `main`, bãi đất đó vẫn trống trải như ngày bạn rời đi. Hai vũ trụ chỉ giao nhau khi bạn chủ động kích hoạt cổng hợp nhất (merge).

---

## 🖼 Sơ đồ
```text
CƠ CHẾ CÔ LẬP CỦA CÁC NHÁNH ĐỘC LẬP:

                   ┌─── (Commit C4: thêm chat.js) ◄── [feature-chat]
(C1) ── (C2) ── (C3)
                   └─── (Commit C5: sửa header)   ◄── [main]

- Đứng ở `feature-chat`: Thấy C1, C2, C3, C4. (Có chat.js)
- Đứng ở `main`:         Thấy C1, C2, C3, C5. (KHÔNG có chat.js!)
```

---

## 🌎 Ví dụ thực tế
Bạn nhận nhiệm vụ thử nghiệm chuyển đổi toàn bộ giao diện sang Dark Mode trên nhánh `feature/dark-mode`. Bạn thêm 5 commit đổi màu CSS và cấu hình giao diện. Khi chuyển về `main`, giao diện ứng dụng vẫn sáng trưng bình thường như chưa hề có cuộc thử nghiệm. Trưởng nhóm có thể xem xét bản thử nghiệm của bạn mà khách hàng dùng `main` không hề bị ảnh hưởng.

---

## 💻 Command
```bash
git switch -c test-isolation
git add secret-test.txt
git commit -m "test: add isolated file"
git switch main
git status
```

---

## 🔍 Giải thích command
- `git switch -c test-isolation`: Tạo không gian làm việc độc lập mới.
- `git add` và `git commit`: Đóng gói file vào snapshot của riêng nhánh `test-isolation`.
- `git switch main`: Quay về nhánh chính; Git lập tức cập nhật lại thư mục làm việc, ẩn file vừa tạo trên nhánh kia đi.
- `git status`: Xác nhận nhánh `main` hoàn toàn sạch sẽ và không hề chứa file của nhánh thử nghiệm.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng file biến mất là bị mất code**: Khi switch về `main` thấy file vừa tạo biến mất, nhiều bạn hoảng sợ; chỉ cần gõ switch trở lại nhánh thử nghiệm là file sẽ hiện ra nguyên vẹn!
2. **Nghĩ commit nhánh con tự chạy sang `main`**: Nhiều bạn mới tự hỏi sao commit trên nhánh con rồi mà xem ở `main` không thấy; bạn bắt buộc phải thực hiện thao tác merge!
3. **Quên commit trước khi chuyển nhánh**: Thay đổi chưa commit có thể bị Git mang theo sang nhánh mới, làm lẫn lộn code giữa hai nhánh.

---

## 🧪 Lab
1. Chạy `git switch -c test-isolation` để bước vào nhánh thử nghiệm.
2. Tạo file `secret-test.txt` với nội dung `Dữ liệu bí mật của nhánh thử nghiệm`.
3. Chạy `git add secret-test.txt` rồi `git commit -m "test: add isolated file"`.
4. Chạy `git switch main`; mở thư mục kiểm tra và xác nhận `secret-test.txt` hoàn toàn không có mặt trên `main`.
5. Chạy `git switch test-isolation` và chứng kiến tệp tin lập tức xuất hiện trở lại.

---

## 💡 Hint
> Chuyển nhánh thực chất là yêu cầu Git thay đổi ống kính nhìn vào snapshot khác nhau; không có dữ liệu đã commit nào bị xóa!

---

## ✅ Validation
- File `secret-test.txt` hiện diện trên nhánh `test-isolation` nhưng vắng mặt trên nhánh `main`.
- Lệnh `git status` sạch sẽ trên cả hai nhánh.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để củng cố nguyên lý cách ly nhánh và sự khác biệt giữa commit nhánh riêng với mã nguồn chung.

---

## 🔥 Challenge
Tạo tiếp một commit mới trên nhánh `main`. Sau đó dùng lệnh `git log --oneline --graph --all` để chiêm ngưỡng đồ thị phân kỳ rực rỡ thể hiện hai con đường riêng biệt của hai nhánh!

---

## 📚 Tổng kết
- Mọi commit mới luôn được neo chặt vào nhánh hiện hành mà bạn đang đứng.
- Chuyển nhánh không bao giờ làm mất các commit ở nhánh khác.
- Tính cô lập giúp bạn thoải mái sáng tạo thử nghiệm mà không sợ làm sập hệ thống chính.
