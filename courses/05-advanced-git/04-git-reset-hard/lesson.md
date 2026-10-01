# git reset --hard

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.
- Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.
- Nhận thức rõ nguy cơ mất vĩnh viễn dữ liệu chưa commit trong Working Directory khi chạy lệnh này.
- Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard.

---

## 🧩 Từ khóa hôm nay

### git reset --hard
- **Nói dễ hiểu**: Chế độ reset triệt để nhất, dịch chuyển con trỏ nhánh và xóa sạch mọi thay đổi trong cả Staging lẫn thư mục làm việc.
- **Ví dụ**: `git reset --hard HEAD` để xóa sạch toàn bộ các thử nghiệm lỗi và đưa code về y nguyên commit gần nhất.
- **Đừng nhầm**: Mang tính hủy diệt; các file sửa dở dang chưa từng commit sẽ bị xóa vĩnh viễn không cứu lại được.

### destructive command
- **Nói dễ hiểu**: Lệnh có khả năng ghi đè hoặc xóa bỏ dữ liệu thực tế trên đĩa cứng mà không thể hoàn tác thông thường.
- **Ví dụ**: `git reset --hard` hay `git clean -fd` là các lệnh nguy hiểm cần cân nhắc kỹ trước khi gõ.
- **Đừng nhầm**: Khác với `--soft` hay `--mixed` vốn bảo toàn 100% mã nguồn trong thư mục làm việc.

### working tree wipe
- **Nói dễ hiểu**: Thao tác làm sạch toàn bộ Working Directory sao cho khớp chính xác với snapshot của commit mục tiêu.
- **Ví dụ**: Các file bị chỉnh sửa lung tung sẽ tự động quay về bản lưu sạch sẽ của commit trước.
- **Đừng nhầm**: Git chỉ khôi phục được file đã từng commit; file mới tạo chưa add có thể bị bỏ qua hoặc mất nếu kết hợp tùy chọn xóa.

---

## 📖 Định nghĩa
`git reset --hard <commit-target>` là tùy chọn mạnh mẽ và triệt để nhất của lệnh reset trong Git. Khi thực thi, Git dịch chuyển con trỏ HEAD và nhánh hiện tại về commit đích, đồng thời ghi đè và làm sạch cả Staging Area lẫn Working Directory khớp 100% với commit đó. Mọi thay đổi chưa commit sẽ bị xóa sạch hoàn toàn.

---

## 💡 Tại sao cần
Khi thử nghiệm một thuật toán hay kiến trúc mới thất bại thảm hại, mã nguồn bị sửa đổi tan hoang và bạn muốn vứt bỏ toàn bộ để quay về trạng thái sạch sẽ trước đó. `git reset --hard` chính là chiếc nút khởi động lại từ đầu, giúp bạn dọn sạch mọi rác rưởi thử nghiệm chỉ trong tích tắc.

---

## 🧠 Mental Model
Hãy hình dung bạn thử nghiệm chế tạo cỗ máy trong phòng thí nghiệm. Thử nghiệm thất bại, dầu mỡ và mảnh vỡ văng tung tóe khắp sàn. Bạn nhấn nút xả nước tự động (`--hard`). Luồng nước áp lực cao quét sạch mọi vết bẩn trên sàn (Working Tree), dọn sạch bàn đóng gói (Staging) và đưa phòng trở về trạng thái tinh tươm như bức ảnh chụp lúc đầu.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Kỹ sư Hùng dành cả buổi sáng thử nghiệm đổi cơ sở dữ liệu sang MongoDB trên nhánh `feat/db-migration`. Sau 3 commit và nhiều sửa đổi dở dang, Hùng thấy giải pháp không khả thi và muốn bỏ hết để quay lại mốc ban đầu có hash `a1b2c3d`. Hùng gõ `git reset --hard a1b2c3d`. Toàn bộ mã nguồn trên máy quay về sạch sẽ như chưa từng có cuộc thử nghiệm nào diễn ra.

---

## 💻 Command & Cú pháp
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
1. **Chạy reset hard khi đang có code dở dang chưa commit**: Dẫn đến việc mất vĩnh viễn các dòng code vừa viết mà không thể tìm lại qua reflog.
2. **Dùng reset hard trên nhánh dùng chung**: Làm biến mất lịch sử chung và khiến các thành viên khác trong nhóm gặp lỗi đồng bộ nghiêm trọng.
3. **Gõ nhầm số lượng commit cần lùi**: Ví dụ muốn lùi 1 commit nhưng gõ nhầm `HEAD~5` làm mất nhiều công sức lập trình.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác reset --hard để làm sạch môi trường trên terminal.
1. Tạo một tệp tin nháp `temp.txt` và sửa nội dung một vài tệp có sẵn.
2. Chạy `git status` để thấy dự án đang có các thay đổi chưa lưu.
3. Chạy lệnh `git reset --hard HEAD` và quan sát console thông báo.
4. Chạy lại `git status` để xác nhận thông báo "nothing to commit, working tree clean".

---

## 💡 Hint & mẹo
> Nếu chưa chắc chắn muốn vứt bỏ code, hãy chạy `git stash` để cất giữ một bản sao dự phòng trước khi gõ `git reset --hard`.

---

## ✅ Validation & Kết quả mong đợi
- Trạng thái kho lưu trữ trở về sạch sẽ hoàn toàn khớp với commit mục tiêu.
- Lệnh `git status` báo `working tree clean`.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --hard.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách sử dụng `git reflog` kết hợp với `git reset --hard <hash>` để phục hồi lại một commit vừa bị lùi nhầm.

---

## 📝 Tổng kết
- `git reset --hard` đồng bộ hóa cả 3 cây HEAD, Staging và Working Tree về commit đích.
- Xóa sạch mọi thay đổi chưa commit trong Working Directory không để lại dấu vết.
- Cực kỳ hữu ích để dọn dẹp các thử nghiệm thất bại nhưng đòi hỏi sự cẩn trọng cao độ.
