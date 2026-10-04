# Undo trong Git: restore/reset/revert khác nhau

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng mục đích, phạm vi tác động và ngữ cảnh sử dụng của 3 cơ chế hoàn tác: restore, reset và revert.
- Hiểu rõ sự khác biệt giữa hoàn tác tệp tin trong Working Tree/Staging và hoàn tác commit trong lịch sử.
- Nhận thức tính an toàn của git revert khi làm việc trên các nhánh cộng tác dùng chung so với git reset.
- Lựa chọn chính xác câu lệnh hoàn tác phù hợp nhất cho từng tình huống phát sinh lỗi thực tế.

---

## 🧩 Từ khóa hôm nay

### git restore
- **Nói dễ hiểu**: Lệnh đưa file trong thư mục làm việc về bản đang được stage; với `--staged`, đưa bản stage về trạng thái của `HEAD`.
- **Ví dụ**: `git restore index.html` hủy phần sửa chưa stage; `git restore --staged index.html` bỏ stage nhưng giữ phần sửa trong file.
- **Đừng nhầm**: Khôi phục có thể xóa phần sửa bạn chưa lưu vào commit. Hãy xem `git diff` trước khi chạy.

### git reset
- **Nói dễ hiểu**: Ở dạng `git reset <commit>`, lệnh chuyển nhánh hiện tại về commit khác; `--soft`, `--mixed`, `--hard` quyết định Git xử lý Staging và file ra sao.
- **Ví dụ**: `git reset --soft HEAD~1` để mở lại commit vừa tạo nhằm bổ sung thêm file.
- **Đừng nhầm**: `git reset <file>` chỉ bỏ stage file, không di chuyển nhánh. Reset commit đã chia sẻ cần phối hợp với nhóm.

### git revert
- **Nói dễ hiểu**: Lệnh tạo commit mới để áp dụng phần thay đổi ngược với commit cũ.
- **Ví dụ**: `git revert 4a8b2c` để vô hiệu hóa một bản vá bị lỗi mà không làm mất lịch sử cũ.
- **Đừng nhầm**: Git có thể dừng vì xung đột; nếu sau đó file đã đổi, kết quả không nhất thiết là bản sao y nguyên trước commit cũ.

---

## 📖 Định nghĩa
Trong Git, việc hoàn tác có thể nhắm vào file hoặc commit. `git restore` khôi phục nội dung file; `git reset <commit>` di chuyển nhánh hiện tại và tùy chế độ sẽ cập nhật Staging hoặc Working Tree; `git revert` tạo commit mới áp dụng thay đổi ngược. Với commit đã chia sẻ, `revert` thường dễ phối hợp hơn vì giữ nguyên commit cũ trong lịch sử.

---

## 🤔 Tại sao cần?
Ba lệnh giải quyết ba việc khác nhau: `restore` đưa nội dung file về trạng thái đã lưu, `reset` di chuyển ref và có thể bỏ thay đổi, còn `revert` tạo commit mới để đảo một thay đổi. Với commit đã chia sẻ, nhóm thường chọn `revert` để tránh viết lại lịch sử mà đồng nghiệp đã lấy về.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang soạn thảo một bức thư tay. `git restore` như dùng cục tẩy xóa một từ vừa viết sai trên giấy nháp. `git reset` như vò bức thư vừa viết ném vào sọt rác để lùi lại lúc chưa đặt bút. Còn `git revert` như bạn đã trót gửi thư qua bưu điện, bạn viết thêm bức thư đính chính thứ hai gửi tiếp để hủy bỏ hiệu lực thư trước.

---

## 🖼 Sơ đồ
```text
Bản đồ 3 cơ chế Undo trong Git:
Working Tree / Staging:  git restore <file> (Hủy sửa đổi tệp tin)
Local Branch History:    git reset (Dịch chuyển HEAD & nhánh lùi về quá khứ)
Public / Shared Branch:  git revert (Tạo commit mới phủ định commit cũ)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Nam trong một buổi chiều gặp 3 tình huống hoàn tác: Đầu tiên, Nam sửa hỏng file cấu hình chưa add, chạy `git restore config.json` để lấy lại bản cũ. Tiếp đó, Nam tạo 2 commit thử nghiệm riêng không ưng ý, chạy `git reset --hard HEAD~2` để xóa sạch. Cuối cùng, một commit đã push lên main gây lỗi, Nam lập tức chạy `git revert HEAD` để sinh commit đảo ngược an toàn cho cả nhóm.

---

## 💻 Command
```bash
git restore <tên-tệp>
git restore --staged <tên-tệp>
git reset --mixed HEAD~1
git revert <commit-hash>
```

---

## 🔍 Giải thích command
- `git restore <tệp>`: Mặc định khôi phục file trong Working Tree từ Staging Area; phần sửa chưa stage có thể bị mất.
- `git restore --staged <tệp>`: Khôi phục bản stage từ `HEAD`, thường dùng để bỏ stage mà vẫn giữ nội dung file.
- `git reset`: Dịch chuyển con trỏ nhánh về commit chỉ định và điều chỉnh lại Staging hoặc Working Tree.
- `git revert <hash>`: Tạo commit mới áp dụng thay đổi ngược với commit được chỉ định. Có thể cần xử lý conflict.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng git reset trên nhánh dùng chung đã push lên GitHub**: Viết lại lịch sử làm sai lệch và gây lỗi đồng bộ nghiêm trọng cho đồng nghiệp.
2. **Nhầm lẫn giữa git restore và git reset**: Dùng reset khi chỉ muốn hủy thay đổi chưa lưu của một file đơn lẻ.
3. **Lo sợ dùng git revert vì nghĩ nó xóa mất code cũ**: Revert chỉ tạo thêm commit mới tiến về phía trước chứ không xóa lịch sử quá khứ.

---

## 🧪 Lab
Hãy cùng tôi bắt tay vào thực hành từng bước dưới đây để thấy rõ sự khác biệt giữa 3 câu lệnh hoàn tác:
1. Làm trong kho thử nghiệm riêng. Tạo `test.txt` với nội dung `v1`, rồi chạy `git add test.txt` và `git commit -m "base"`.
2. Đổi nội dung thành `v2`, chạy `git restore test.txt`, rồi mở file để xác nhận nội dung trở lại `v1`.
3. Đổi nội dung thành `v2` lần nữa, chạy `git add test.txt`, rồi `git restore --staged test.txt`. Chạy `git status`: file còn sửa nhưng đã bỏ stage.
4. Stage và commit thay đổi `v2` bằng `git add test.txt` và `git commit -m "change test file"`.
5. Chạy `git revert HEAD`, xác nhận file trở lại `v1`, rồi dùng `git log --oneline -3` để thấy commit gốc và commit revert cùng còn trong lịch sử.

---

## 💡 Hint
> Trước khi hoàn tác, xác định thay đổi đang ở file, Staging hay trong commit. Với commit đã chia sẻ, hãy kiểm tra quy trình của nhóm; `revert` thường giữ lịch sử dễ phối hợp hơn.

---

## ✅ Validation
- Mô tả được `restore` tác động lên file, `reset` có thể di chuyển nhánh ở dạng commit, và `revert` tạo commit mới.
- Nhận ra file sửa chưa commit có thể bị mất khi dùng `restore` hoặc `reset --hard`.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về các cơ chế hoàn tác trong Git.

---

## 🔥 Challenge
Tìm hiểu vì sao trước phiên bản Git 2.23 lệnh `git checkout` phải đảm nhiệm cả việc chuyển nhánh và khôi phục file, dẫn đến việc tách ra thành `git switch` và `git restore`.

---

## 📚 Tổng kết
- `git restore` chuyên dùng để khôi phục trạng thái tệp tin trong Working Directory hoặc Staging Area.
- `git reset` dịch chuyển con trỏ nhánh lùi về quá khứ, phù hợp cho việc viết lại lịch sử cục bộ.
- `git revert` tạo commit mới áp dụng thay đổi ngược; hãy kiểm tra kết quả, nhất là khi các commit sau đó sửa cùng file.
