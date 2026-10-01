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
- **Nói dễ hiểu**: Lệnh khôi phục hoặc xóa bỏ các sửa đổi ở cấp độ file trong Working Tree hoặc Staging Area.
- **Ví dụ**: `git restore index.html` để hủy các dòng vừa gõ nhầm và lấy lại bản lưu trước đó.
- **Đừng nhầm**: Không xóa commit trong lịch sử; lệnh này chỉ tác động lên file hiện tại trên máy bạn.

### git reset
- **Nói dễ hiểu**: Lệnh di chuyển con trỏ nhánh lùi về commit cũ trong quá khứ để viết lại lịch sử cục bộ.
- **Ví dụ**: `git reset --soft HEAD~1` để mở lại commit vừa tạo nhằm bổ sung thêm file.
- **Đừng nhầm**: Viết lại lịch sử; tuyệt đối không dùng trên các nhánh đã push lên GitHub dùng chung với đồng nghiệp.

### git revert
- **Nói dễ hiểu**: Lệnh tạo một commit mới tinh có nội dung đảo ngược hoàn toàn tác động của một commit cũ gây lỗi.
- **Ví dụ**: `git revert 4a8b2c` để vô hiệu hóa một bản vá bị lỗi mà không làm mất lịch sử cũ.
- **Đừng nhầm**: Không xóa bỏ commit cũ; cả commit lỗi và commit đảo ngược đều tồn tại rõ ràng trong nhật ký.

---

## 📖 Định nghĩa
Trong Git, nhu cầu hoàn tác (Undo) có thể xảy ra ở nhiều tầng kiến trúc khác nhau, từ việc hủy bỏ chỉnh sửa file chưa lưu cho đến thu hồi commit đã đẩy lên mạng. Git cung cấp bộ 3 công cụ: `git restore` xử lý tệp ở Working Tree và Staging, `git reset` dịch con trỏ nhánh viết lại lịch sử cục bộ, và `git revert` tạo commit đảo ngược an toàn trên nhánh dùng chung.

---

## 💡 Tại sao cần
Sai lầm phổ biến của lập trình viên là dùng sai lệnh hoàn tác, dẫn đến việc vô tình làm mất công sức lập trình cả ngày. Nắm vững ranh giới giữa restore, reset và revert giúp bạn biết khi nào chỉ cần hủy chỉnh sửa file, khi nào nên xóa commit thử nghiệm trên máy riêng và khi nào bắt buộc phải dùng revert để bảo vệ đồng nghiệp.

---

## 🧠 Mental Model
Hãy hình dung bạn đang soạn thảo một bức thư tay. `git restore` như dùng cục tẩy xóa một từ vừa viết sai trên giấy nháp. `git reset` như vò bức thư vừa viết ném vào sọt rác để lùi lại lúc chưa đặt bút. Còn `git revert` như bạn đã trót gửi thư qua bưu điện, bạn viết thêm bức thư đính chính thứ hai gửi tiếp để hủy bỏ hiệu lực thư trước.

---

## 📊 Sơ đồ minh họa
```text
Bản đồ 3 cơ chế Undo trong Git:
Working Tree / Staging:  git restore <file> (Hủy sửa đổi tệp tin)
Local Branch History:    git reset (Dịch chuyển HEAD & nhánh lùi về quá khứ)
Public / Shared Branch:  git revert (Tạo commit mới phủ định commit cũ)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Nam trong một buổi chiều gặp 3 tình huống hoàn tác: Đầu tiên, Nam sửa hỏng file cấu hình chưa add, chạy `git restore config.json` để lấy lại bản cũ. Tiếp đó, Nam tạo 2 commit thử nghiệm riêng không ưng ý, chạy `git reset --hard HEAD~2` để xóa sạch. Cuối cùng, một commit đã push lên main gây lỗi, Nam lập tức chạy `git revert HEAD` để sinh commit đảo ngược an toàn cho cả nhóm.

---

## 💻 Command & Cú pháp
```bash
git restore <tên-tệp>
git restore --staged <tên-tệp>
git reset --mixed HEAD~1
git revert <commit-hash>
```

---

## 🔍 Giải thích command
- `git restore <tệp>`: Khôi phục nội dung tệp tin trong Working Directory về trạng thái của commit gần nhất.
- `git restore --staged <tệp>`: Đưa tệp tin ra khỏi Staging Area mà vẫn giữ nguyên nội dung chỉnh sửa.
- `git reset`: Dịch chuyển con trỏ nhánh về commit chỉ định và điều chỉnh lại Staging hoặc Working Tree.
- `git revert <hash>`: Tạo ra một commit hoàn toàn mới mang nội dung đảo ngược lại commit được chỉ định.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng git reset trên nhánh dùng chung đã push lên GitHub**: Viết lại lịch sử làm sai lệch và gây lỗi đồng bộ nghiêm trọng cho đồng nghiệp.
2. **Nhầm lẫn giữa git restore và git reset**: Dùng reset khi chỉ muốn hủy thay đổi chưa lưu của một file đơn lẻ.
3. **Lo sợ dùng git revert vì nghĩ nó xóa mất code cũ**: Revert chỉ tạo thêm commit mới tiến về phía trước chứ không xóa lịch sử quá khứ.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành phân biệt 3 thao tác restore, reset và revert trên terminal.
1. Tạo một chỉnh sửa nhỏ trong tệp `test.txt` và hủy bỏ bằng lệnh `git restore test.txt`.
2. Thêm tệp vào staging bằng `git add` rồi rút ra bằng `git restore --staged test.txt`.
3. Tạo một commit thử nghiệm và thực hiện `git revert HEAD` để quan sát commit đảo ngược.
4. Kiểm tra lại lịch sử bằng `git log --oneline` để xác nhận commit mới được tạo ra an toàn.

---

## 💡 Hint & mẹo
> Ghi nhớ nguyên tắc vàng: Nhánh cá nhân chưa push có thể dùng reset, nhưng nhánh cộng tác dùng chung luôn luôn dùng revert.

---

## ✅ Validation & Kết quả mong đợi
- Phân biệt chính xác phạm vi tác động của restore (file), reset (nhánh cục bộ) và revert (commit công khai).
- Không làm mất lịch sử commit ngoài ý muốn trên nhánh chính.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về các cơ chế hoàn tác trong Git.

---

## 🚀 Thử thách nâng cao
Tìm hiểu vì sao trước phiên bản Git 2.23 lệnh `git checkout` phải đảm nhiệm cả việc chuyển nhánh và khôi phục file, dẫn đến việc tách ra thành `git switch` và `git restore`.

---

## 📝 Tổng kết
- `git restore` chuyên dùng để khôi phục trạng thái tệp tin trong Working Directory hoặc Staging Area.
- `git reset` dịch chuyển con trỏ nhánh lùi về quá khứ, phù hợp cho việc viết lại lịch sử cục bộ.
- `git revert` tạo commit mới đảo ngược commit cũ, là phương pháp an toàn duy nhất trên nhánh dùng chung.
