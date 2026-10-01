# git reset --soft

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất hoạt động của cờ `--soft` trong câu lệnh `git reset`.
- Biết chính xác trạng thái của HEAD, Staging Area và Working Directory sau khi chạy `git reset --soft`.
- Ứng dụng `git reset --soft` để gộp nhiều commit nhỏ hoặc viết lại commit message một cách linh hoạt.
- Phân biệt sự khác nhau giữa reset soft và các chế độ mixed hay hard.

---

## 🧩 Từ khóa hôm nay

### git reset --soft
- **Nói dễ hiểu**: Lệnh rút lại commit gần nhất nhưng giữ nguyên toàn bộ thay đổi trong Staging Area để sẵn sàng commit lại ngay.
- **Ví dụ**: `git reset --soft HEAD~1` khi vừa commit xong thì nhớ ra quên sửa lỗi chính tả trong message.
- **Đừng nhầm**: Không làm mất bất kỳ dòng code nào; toàn bộ file vẫn nằm nguyên ở trạng thái staged màu xanh.

### HEAD~1
- **Nói dễ hiểu**: Ký hiệu trỏ đến commit cha đứng ngay liền trước commit hiện tại của nhánh.
- **Ví dụ**: Đang ở commit C3 thì `HEAD~1` chính là commit C2.
- **Đừng nhầm**: Không phải tên một nhánh; đây là cú pháp di chuyển tương đối lùi lại một bước trong cây lịch sử.

### staged preservation
- **Nói dễ hiểu**: Đặc điểm giữ nguyên vẹn nội dung của Staging Area trong quá trình di chuyển con trỏ nhánh.
- **Ví dụ**: Các file trong commit bị hủy không bị văng ra ngoài mà vẫn nằm sẵn trong Staging.
- **Đừng nhầm**: Khác với `--mixed` vốn xóa sạch Staging và đưa code về Working Directory chưa add.

---

## 📖 Định nghĩa
`git reset --soft <commit-target>` là chế độ hoàn tác nhẹ nhàng và bảo tồn dữ liệu tối đa nhất của lệnh reset trong Git. Khi thực thi, Git chỉ dịch chuyển con trỏ HEAD và nhánh hiện tại lùi về commit mục tiêu, đồng thời bảo toàn trọn vẹn Staging Area và Working Directory. Mọi thay đổi của các commit bị rút lại đều nằm sẵn trong Staging.

---

## 💡 Tại sao cần
Khi lập trình, bạn thường xuyên lỡ commit quá sớm khi thiếu file hoặc ghi sai thông điệp. Lệnh `git reset --soft HEAD~1` là giải pháp hoàn hảo: nó rút lại commit vừa tạo tức thì mà không làm mất dòng code nào, đưa toàn bộ mã nguồn trở lại Staging để bạn thoải mái bổ sung file hoặc viết lại message chuẩn xác.

---

## 🧠 Mental Model
Hãy hình dung bạn đóng gói một kiện hàng. Bạn đã xếp đồ vào thùng (Working Tree), dán nhãn niêm phong (Staging) và bưu tá đóng dấu gửi (Commit). Khi nhận ra quên bỏ thiệp mừng vào thùng, bạn yêu cầu bưu tá hủy dấu vừa đóng (`--soft`). Kiện hàng vẫn dán nhãn nguyên vẹn, bạn chỉ việc kẹp thêm thiệp rồi bảo bưu tá đóng dấu lại.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Lập trình viên Quang vừa gõ `git commit -m "feat: user profile"` thì nhận ra quên cập nhật README.md. Thay vì tạo commit vá víu làm rối lịch sử, Quang gõ `git reset --soft HEAD~1`. Nhánh lùi lại 1 commit, các file tính năng vẫn nằm trong Staging màu xanh. Quang sửa README, gõ `git add README.md` và commit lại một lần duy nhất hoàn chỉnh.

---

## 💻 Command & Cú pháp
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
- `git commit -m`: Tạo commit mới thay thế hoàn hảo với đầy đủ mã nguồn và thông điệp chuẩn.

---

## ⚠️ Sai lầm phổ biến
1. **Lo sợ reset --soft làm mất mã nguồn**: Chế độ soft bảo tồn 100% dữ liệu, không xóa bỏ bất kỳ dòng code nào.
2. **Chạy reset trên nhánh chung đã push lên server**: Viết lại lịch sử trên nhánh công khai sẽ gây lỗi từ chối và xung đột cho đồng nghiệp.
3. **Quên cờ --soft khiến Git chạy mặc định --mixed**: Làm toàn bộ file văng ra khỏi Staging Area và phải tốn công `git add` lại từ đầu.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác reset --soft và kiểm tra trạng thái staged trên terminal.
1. Tạo một commit thử nghiệm mới với thông điệp bất kỳ.
2. Chạy lệnh `git reset --soft HEAD~1` để hoàn tác commit vừa tạo.
3. Chạy `git status` và quan sát các tệp tin vẫn đang ở trạng thái staged màu xanh lá cây.
4. Thực hiện một commit mới hoàn thiện với thông điệp chuẩn mực.

---

## 💡 Hint & mẹo
> Sử dụng `git reset --soft HEAD~1` khi bạn muốn viết lại commit message hoặc bổ sung file vào commit vừa tạo mà không muốn dùng amend.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git status` hiển thị toàn bộ thay đổi của commit cũ trong mục "Changes to be committed".
- Nhánh hiện tại lùi lại đúng 1 commit mà không làm mất nội dung trong file.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --soft.

---

## 🚀 Thử thách nâng cao
Sử dụng `git reset --soft HEAD~3` để gom 3 commit nhỏ lẻ gần nhất thành đúng một commit duy nhất có thông điệp chuẩn mực.

---

## 📝 Tổng kết
- `git reset --soft` chỉ dịch chuyển HEAD, bảo toàn trọn vẹn Staging Area và Working Directory.
- Thay đổi từ commit bị rút lại sẽ nằm ở trạng thái staged sẵn sàng cho commit mới.
- Là công cụ tuyệt vời để sửa thông điệp commit hoặc bổ sung tệp còn thiếu mà không gây rác lịch sử.
