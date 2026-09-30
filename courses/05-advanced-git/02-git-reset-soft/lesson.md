# git reset --soft

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất hoạt động của cờ `--soft` trong câu lệnh `git reset`.
- Biết chính xác trạng thái của HEAD, Staging Area và Working Directory sau khi chạy `git reset --soft`.
- Ứng dụng `git reset --soft` để gộp nhiều commit nhỏ hoặc viết lại commit message một cách linh hoạt.
- Phân biệt sự khác nhau giữa reset soft và các chế độ mixed hay hard.

---

## 📖 Định nghĩa
> `git reset --soft <commit-target>` là chế độ hoàn tác nhẹ nhàng và bảo tồn dữ liệu tối đa nhất của lệnh reset trong Git. Khi thực thi câu lệnh này, Git chỉ dịch chuyển duy nhất con trỏ HEAD và con trỏ nhánh hiện tại lùi về commit mục tiêu được chỉ định, trong khi hoàn toàn giữ nguyên vẹn 100% nội dung của cả Staging Area (Index) và Working Directory. Tất cả những thay đổi thuộc các commit bị lùi lại sẽ ngay lập tức xuất hiện ở trạng thái đã được staged sẵn sàng.

---

## 🤔 Tại sao cần?
Trong quá trình lập trình, rất nhiều khi bạn lỡ tạo một commit với thông điệp chưa chuẩn, hoặc bạn trót ấn commit quá sớm trong khi còn thiếu một số tệp tin quan trọng. `git reset --soft HEAD~1` là chiếc phao cứu sinh hoàn hảo: nó rút lại commit vừa tạo ngay tức khắc mà không làm mất một dòng code nào, đưa toàn bộ mã nguồn trở lại Staging Area để bạn có thể tự do thêm bớt tệp tin hoặc viết lại thông điệp commit một cách hoàn chỉnh nhất.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn chuẩn bị gửi một gói bưu phẩm qua bưu điện. Bạn đã đóng thùng các món hàng (Working Tree), dán băng dính niêm phong và dán phiếu gửi hàng (Staging Area), đồng thời bưu tá đã đóng dấu xác nhận gửi đi (Commit). Khi bạn phát hiện ra quên bỏ chiếc thiệp chúc mừng vào trong hộp, bạn yêu cầu bưu tá hủy dấu xác nhận vừa đóng (`git reset --soft`). Chiếc hộp vẫn còn nguyên ở đó với đầy đủ hàng hóa đã niêm phong sẵn, bạn chỉ việc dán thêm thiệp rồi bảo bưu tá đóng dấu lại.

---

## 🖼 Sơ đồ
```text
Cơ chế hoạt động của git reset --soft HEAD~1:
Trước khi reset:
Commit History:   C1 ──► C2 ──► C3 (HEAD -> main)
Staging Area:     Trống sạch sẽ
Working Tree:     Trống sạch sẽ

Sau khi git reset --soft HEAD~1:
Commit History:   C1 ──► C2 (HEAD -> main)
Staging Area:     Chứa toàn bộ thay đổi của C3 (Staged!)
Working Tree:     Không đổi
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Quang vừa gõ câu lệnh `git commit -m "feat: user profile"` sau khi hoàn thành giao diện người dùng nhưng chợt nhận ra mình quên chưa cập nhật tệp tài liệu README.md và commit message bị sai chính tả ngớ ngẩn. Thay vì tạo thêm một commit vá víu rác rưởi làm xấu cây lịch sử dự án, Quang gõ ngay câu lệnh cứu cánh: `git reset --soft HEAD~1`. Con trỏ nhánh lập tức lùi lại 1 commit, toàn bộ các tệp tin của tính năng user profile vẫn nằm nguyên vẹn trong Staging Area dưới dạng màu xanh lá cây khi kiểm tra `git status`. Quang sửa tệp README.md, gõ `git add README.md` và thực hiện một commit duy nhất hoàn hảo trọn vẹn mọi yêu cầu.

---

## 💻 Command
```bash
git reset --soft HEAD~1
git reset --soft <commit-hash>
git status
git commit -m "<thông-điệp-mới>"
```

---

## 🔍 Giải thích command
- `git reset --soft HEAD~1`: Rút lại commit gần nhất, toàn bộ thay đổi chuyển về trạng thái staged sẵn sàng commit lại.
- `git reset --soft <hash>`: Lùi nhánh về commit chỉ định trong quá khứ, toàn bộ thay đổi trung gian được gộp vào Staging.
- `git status`: Kiểm tra lại danh sách các tệp tin đang nằm trong Staging Area sau khi reset.
- `git commit -m`: Tạo commit mới thay thế hoàn hảo với đầy đủ mã nguồn.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng reset --soft làm mất mã nguồn**:  Chế độ soft bảo tồn toàn bộ mã nguồn 100%, không mất dữ liệu.
2. **Chạy reset --soft trên nhánh chung đã push lên server từ xa mà không có kế hoạch xử lý xung đột.**: Chạy reset --soft trên nhánh chung đã push lên server từ xa mà không có kế hoạch xử lý xung đột.
3. **Quên gõ cờ --soft dẫn đến Git mặc định chạy chế độ --mixed làm văng code ra khỏi Staging Area.**: Quên gõ cờ --soft dẫn đến Git mặc định chạy chế độ --mixed làm văng code ra khỏi Staging Area.

---

## 🧪 Lab
1. Tạo một commit thử nghiệm mới với thông điệp bất kỳ.
2. Chạy lệnh `git reset --soft HEAD~1` để hoàn tác commit vừa tạo.
3. Chạy `git status` và quan sát các tệp tin vẫn đang ở trạng thái staged màu xanh lá.
4. Thực hiện một commit mới hoàn thiện với thông điệp chuẩn mực.

---

## 💡 Hint
> Dùng `git reset --soft HEAD~1` khi bạn muốn viết lại commit message hoặc gộp commit vừa tạo.

---

## ✅ Validation
- Rút lại commit thành công và bảo toàn 100% tệp tin trong Staging Area với cờ --soft.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --soft.

---

## 🔥 Challenge
Làm thế nào để sử dụng `git reset --soft` gộp 5 commit vụn vặt gần nhất thành một commit duy nhất?

---

## 📚 Tổng kết
- `git reset --soft` chỉ dịch chuyển HEAD, bảo toàn trọn vẹn Staging Area và Working Directory.
- Thay đổi từ commit bị rút lại sẽ nằm ở trạng thái staged sẵn sàng cho commit mới.
- Là công cụ tuyệt vời để sửa thông điệp commit hoặc bổ sung tệp còn thiếu mà không gây rác lịch sử.
