# git reset --hard

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.
- Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.
- Nhận thức rõ nguy cơ mất vĩnh viễn dữ liệu chưa commit trong Working Directory khi chạy lệnh này.
- Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard.

---

## 📖 Định nghĩa
> `git reset --hard <commit-target>` là tùy chọn mạnh mẽ và triệt để nhất của câu lệnh reset trong Git. Khi được thực thi, Git sẽ đồng loạt dịch chuyển con trỏ HEAD và con trỏ nhánh hiện tại về commit mục tiêu, đồng thời ghi đè và làm sạch hoàn toàn cả Staging Area lẫn thư mục làm việc Working Directory sao cho khớp 100% với trạng thái của commit đích. Mọi chỉnh sửa chưa commit trong Working Tree sẽ bị xóa sổ hoàn toàn không để lại dấu vết.

---

## 🤔 Tại sao cần?
Trong quá trình nghiên cứu và phát triển phần mềm, sẽ có những lúc bạn thử nghiệm một thuật toán hoặc một kiến trúc mới nhưng hoàn toàn thất bại, mã nguồn bị sửa đổi tan hoang và bạn muốn vứt bỏ toàn bộ những thử nghiệm tồi tệ đó để quay về trạng thái sạch sẽ hoàn hảo của một commit trước đó. `git reset --hard` chính là chiếc nút "Khởi động lại từ đầu" giúp bạn quét sạch mọi rác rưởi thử nghiệm chỉ trong một phần nghìn giây.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang thử nghiệm chế tạo một cỗ máy trong phòng thí nghiệm. Thử nghiệm thất bại thảm hại, các mảnh vỡ và dầu mỡ văng tung tóe khắp sàn nhà và bàn làm việc. Bạn nhấn nút "Dọn sạch phòng thí nghiệm tự động" (`git reset --hard`). Ngay lập tức, một luồng nước áp lực cao quét sạch mọi mảnh vỡ và vết bẩn trên sàn (Working Tree), dọn sạch bàn đóng gói (Staging) và đưa phòng thí nghiệm trở về trạng thái tinh tươm đúng như lúc bạn chụp bức ảnh kỷ niệm trước khi bắt đầu thử nghiệm.

---

## 🖼 Sơ đồ
```text
Cơ chế hủy diệt của git reset --hard HEAD~1:
Trước khi reset:
Commit History:   C1 ──► C2 ──► C3 (HEAD -> main)
Working Tree:     Có tệp sửa đổi dở dang X

Sau khi git reset --hard HEAD~1:
Commit History:   C1 ──► C2 (HEAD -> main)
Staging Area:     Khớp hoàn toàn với C2!
Working Tree:     Khớp hoàn toàn với C2! (Tệp sửa đổi X bị XÓA VĨNH VIỄN!)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Hùng dành cả buổi sáng để thử nghiệm chuyển đổi cơ sở dữ liệu sang MongoDB trên nhánh `feat/db-migration`. Sau 3 commit và nhiều chỉnh sửa dở dang, Hùng nhận thấy giải pháp này không khả thi và muốn quay về mốc ban đầu của nhánh. Hùng kiểm tra lịch sử, xác định mã hash của commit ban đầu là `a1b2c3d` và chạy lệnh: `git reset --hard a1b2c3d`. Ngay lập tức, console thông báo "HEAD is now at a1b2c3d initial commit". Toàn bộ mã nguồn trên máy Hùng quay về sạch sẽ như chưa từng có cuộc thử nghiệm nào diễn ra.

---

## 💻 Command
```bash
git reset --hard HEAD
git reset --hard HEAD~1
git reset --hard <commit-hash>
git status
```

---

## 🔍 Giải thích command
- `git reset --hard HEAD`: Hủy bỏ sạch sẽ toàn bộ các thay đổi chưa commit trong cả Staging và Working Tree, đưa máy về commit hiện tại.
- `git reset --hard HEAD~1`: Xóa bỏ commit gần nhất và xóa sạch mọi thay đổi của nó trên đĩa cứng.
- `git reset --hard <hash>`: Đưa toàn bộ dự án quay trở về mốc commit chỉ định trong quá khứ.
- `git status`: Xác nhận trạng thái "working tree clean" sau khi đã quét sạch sẽ.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy git reset --hard khi đang có công việc dở dang chưa commit**:  Các thay đổi chưa commit sẽ biến mất vĩnh viễn không thể khôi phục bằng reflog.
2. **Sử dụng reset hard trên nhánh dùng chung gây mất dữ liệu của đồng nghiệp.**: Sử dụng reset hard trên nhánh dùng chung gây mất dữ liệu của đồng nghiệp.
3. **Gõ nhầm số lượng commit cần lùi (ví dụ gõ HEAD~5 thay vì HEAD~1) làm mất nhiều công sức lập trình.**: Gõ nhầm số lượng commit cần lùi (ví dụ gõ HEAD~5 thay vì HEAD~1) làm mất nhiều công sức lập trình.

---

## 🧪 Lab
1. Tạo một tệp tin rác `temp.txt` và sửa lung tung nội dung một vài tệp có sẵn.
2. Chạy `git status` để thấy dự án đang bừa bộn.
3. Chạy lệnh `git reset --hard HEAD` và quan sát kết quả.
4. Chạy lại `git status` để xác nhận thông báo "nothing to commit, working tree clean".

---

## 💡 Hint
> Nếu không chắc chắn, hãy gõ `git stash` để cất mã nguồn dự phòng trước khi chạy `git reset --hard`.

---

## ✅ Validation
- Hiểu rõ rủi ro và thực thi thành thạo lệnh git reset --hard để dọn sạch môi trường làm việc.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --hard.

---

## 🔥 Challenge
Nếu bạn lỡ tay chạy `git reset --hard HEAD~1` và làm mất một commit quan trọng, công cụ nào trong Git có thể giúp bạn cứu lại?

---

## 📚 Tổng kết
- `git reset --hard` đồng bộ hóa cả 3 cây HEAD, Staging và Working Tree về commit đích.
- Xóa sạch mọi thay đổi chưa commit trong Working Directory không để lại dấu vết.
- Cực kỳ hữu ích để dọn dẹp các thử nghiệm thất bại nhưng đòi hỏi sự cẩn trọng cao độ.
