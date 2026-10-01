# git reset --hard

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất mang tính hủy diệt (Destructive) của câu lệnh `git reset --hard`.
- Biết chính xác cơ chế đồng bộ hóa cả 3 cây: HEAD, Staging Area và Working Directory về commit mục tiêu.
- Biết Git không lưu thay đổi chưa commit khi lệnh ghi đè chúng; không dựa vào reflog để khôi phục phần đó.
- Sử dụng lệnh một cách an toàn và biết cách sao lưu tạm thời trước khi reset hard.

---

## 🧩 Từ khóa hôm nay

### git reset --hard
- **Nói dễ hiểu**: Chế độ reset cập nhật nhánh, Staging và các tệp được theo dõi về commit đích; chỉnh sửa chưa commit trên các tệp đó sẽ bị bỏ.
- **Ví dụ**: `git reset --hard HEAD` để xóa sạch toàn bộ các thử nghiệm lỗi và đưa code về y nguyên commit gần nhất.
- **Đừng nhầm**: Git không lưu bản sao chỉnh sửa bị ghi đè. File untracked không liên quan thường vẫn còn; file đó có thể bị ghi đè nếu cản trở việc cập nhật.

### Lệnh có thể làm mất chỉnh sửa chưa commit
- **Nói dễ hiểu**: Lệnh có thể ghi đè hoặc xóa dữ liệu được theo dõi trên đĩa. Git không có bản sao của chỉnh sửa chưa commit bị bỏ.
- **Ví dụ**: `git reset --hard` hay `git clean -fd` là các lệnh nguy hiểm cần cân nhắc kỹ trước khi gõ.
- **Đừng nhầm**: `--soft` và `--mixed` không cập nhật Working Tree; `--hard` cập nhật các file được theo dõi về snapshot đích.

### Khôi phục file được theo dõi
- **Nói dễ hiểu**: Thao tác đưa các file được theo dõi về snapshot của commit mục tiêu.
- **Ví dụ**: Các file bị chỉnh sửa lung tung sẽ tự động quay về bản lưu sạch sẽ của commit trước.
- **Đừng nhầm**: Lệnh không dọn mọi file untracked. File untracked thường còn, nhưng có thể bị ghi đè hoặc xóa nếu cản đường file trong snapshot đích.

---

## 📖 Định nghĩa
`git reset --hard <commit-target>` di chuyển nhánh hiện tại về commit mục tiêu, cập nhật Staging Area và đưa các file được Git theo dõi về nội dung của commit đó. Thay đổi staged và unstaged trên các file ấy sẽ bị bỏ. File untracked không liên quan thường vẫn còn; file untracked chắn đường cho một file được khôi phục có thể bị ghi đè hoặc xóa. Reflog có thể giúp tìm lại commit cũ, nhưng không phải bản sao lưu cho sửa đổi chưa commit.

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
Working Tree:     Các file được theo dõi trở về snapshot C2; chỉnh sửa X bị bỏ
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
1. **Chạy reset hard khi còn code dở chưa lưu**: Thay đổi tracked có thể mất; `reflog` không ghi nội dung sửa chưa commit.
2. **Dùng reset hard để cập nhật nhánh đã chia sẻ mà chưa phối hợp**: Việc di chuyển nhánh có thể làm lịch sử cục bộ lệch khỏi lịch sử nhóm.
3. **Gõ nhầm số lượng commit cần lùi**: Ví dụ muốn lùi 1 commit nhưng gõ nhầm `HEAD~5`. Hãy đọc lại mục tiêu và xác nhận `git status` trước khi chạy.

---

## 🧪 Lab thực hành
Bài này xóa thay đổi trên file tracked; hãy dùng kho thử nghiệm riêng, không dùng kho dự án đang học.
1. Tạo `tracked.txt` với nội dung `ban dau`, rồi chạy `git add tracked.txt` và `git commit -m "base"`.
2. Sửa `tracked.txt` thành `ban sua chua commit`; tạo thêm `scratch.txt` nhưng không chạy `git add`.
3. Chạy `git status` để thấy một file modified và một file untracked.
4. Chạy `git reset --hard HEAD`, rồi mở hai file: `tracked.txt` trở về `ban dau`, còn `scratch.txt` vẫn còn vì nó không chắn file tracked nào.
5. Chạy `git status`: chỉ còn `scratch.txt` trong nhóm untracked. Xóa nó thủ công nếu muốn dọn kho thử nghiệm.

---

## 💡 Hint & mẹo
> Nếu chưa chắc chắn muốn vứt bỏ code, hãy chạy `git stash` để cất giữ một bản sao dự phòng trước khi gõ `git reset --hard`.

---

## ✅ Validation & Kết quả mong đợi
- File tracked khớp với commit mục tiêu và các thay đổi staged của chúng bị bỏ.
- File untracked không liên quan còn nguyên; do đó `git status` vẫn liệt kê `scratch.txt`.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --hard.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cách sử dụng `git reflog` kết hợp với `git reset --hard <hash>` để phục hồi lại một commit vừa bị lùi nhầm.

---

## 📝 Tổng kết
- `git reset --hard` đồng bộ hóa cả 3 cây HEAD, Staging và Working Tree về commit đích.
- Bỏ thay đổi staged và unstaged trên các file được theo dõi; file untracked không liên quan thường còn nguyên.
- Cực kỳ hữu ích để dọn dẹp các thử nghiệm thất bại nhưng đòi hỏi sự cẩn trọng cao độ.
