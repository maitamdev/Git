# git reset --mixed

---

## 🎯 Mục tiêu
- Nắm vững cơ chế hoạt động của chế độ mặc định `git reset --mixed` (hoặc `git reset` không truyền cờ).
- Hiểu rõ trạng thái của HEAD, Staging Area và Working Directory sau khi chạy reset mixed.
- Sử dụng `git reset` để hủy staged toàn bộ hoặc chọn lọc các tệp tin một cách linh hoạt.
- So sánh chi tiết sự khác nhau về hành vi giữa reset mixed và reset soft.

---

## 🧩 Từ khóa hôm nay

### git reset --mixed
- **Nói dễ hiểu**: Lệnh rút lại commit đồng thời xóa sạch Staging Area, đưa toàn bộ thay đổi về trạng thái chưa add trong thư mục làm việc.
- **Ví dụ**: `git reset --mixed HEAD~1` khi muốn dỡ commit ra để chia nhỏ thành nhiều commit riêng.
- **Đừng nhầm**: Không xóa file hay mất code; các thay đổi vẫn nằm nguyên trong Working Directory dưới dạng màu đỏ.

### default reset mode
- **Nói dễ hiểu**: Hành vi ngầm định của Git mỗi khi bạn gõ lệnh `git reset` mà không cung cấp cờ `--soft` hay `--hard`.
- **Ví dụ**: Gõ `git reset HEAD~1` thì Git sẽ tự động hiểu và chạy như `git reset --mixed HEAD~1`.
- **Đừng nhầm**: Không tương đương với `--soft`; nếu không gõ cờ, Staging Area sẽ bị làm sạch thay vì giữ nguyên staged.

### unstaged changes
- **Nói dễ hiểu**: Trạng thái các file có chỉnh sửa trong thư mục làm việc nhưng chưa được đưa vào hàng đợi chuẩn bị commit.
- **Ví dụ**: Trong `git status`, file hiển thị màu đỏ dưới mục "Changes not staged for commit".
- **Đừng nhầm**: Không phải file mới chưa theo dõi (untracked); đây là file đã có trong Git nhưng đang có sửa đổi mới chưa add.

---

## 📖 Định nghĩa
`git reset --mixed <commit-target>` (cũng là mặc định khi bỏ cờ chế độ) di chuyển nhánh hiện tại về commit mục tiêu, cập nhật Staging Area theo commit đó và không chủ động sửa nội dung file trong Working Tree. Vì vậy, file đã có ở commit cũ nhưng không có ở mục tiêu thường trở thành untracked; file đã được theo dõi và thay đổi sẽ hiện là modified.

---

## 🤔 Tại sao cần?
Khi gõ `git add .` theo thói quen, bạn dễ đưa nhiều file không liên quan vào Staging Area, hoặc bạn commit một loạt thay đổi lớn nhưng sau đó muốn chia nhỏ. Lệnh `git reset --mixed` tháo dỡ các thay đổi ra khỏi Staging về lại Working Tree dưới dạng unstaged để bạn tự do chọn lọc commit từng phần.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đóng gói đồ đạc vào thùng và dán băng dính niêm phong (Staging Area). Khi nhận ra đã bỏ nhầm tài liệu cơ quan vào thùng, bạn rạch băng dính và dỡ toàn bộ đồ vật trong thùng ra đặt lại trên bàn làm việc (`--mixed`). Đồ vật vẫn còn nguyên trên bàn, bạn thong thả lựa chọn món nào cần gửi và món nào giữ lại.

---

## 🖼 Sơ đồ
```text
Cơ chế hoạt động của git reset --mixed HEAD~1:
Trước khi reset:
Commit History:   C1 ──► C2 ──► C3 (HEAD -> main)
Staging Area:     Trống
Working Tree:     Trống

Sau khi git reset --mixed HEAD~1:
Commit History:   C1 ──► C2 (HEAD -> main)
Staging Area:     Trống (Unstaged!)
Working Tree:     Chứa toàn bộ thay đổi của C3 (Chưa staged - màu đỏ)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Lan sửa 5 file khác nhau rồi commit chung với thông điệp: "update various files". Thấy commit quá cồng kềnh, Lan chạy `git reset HEAD~1` (chế độ mixed mặc định). Nhánh lùi lại 1 commit, cả 5 file xuất hiện màu đỏ unstaged trong `git status`. Lan lần lượt `git add` và commit riêng từng file theo từng logic rõ ràng, giúp lịch sử dự án trở nên cực kỳ chuyên nghiệp.

---

## 💻 Command
```bash
git reset HEAD~1
git reset --mixed HEAD~1
git reset <tên-tệp>
git status
```

---

## 🔍 Giải thích command
- `git reset HEAD~1`: Cú pháp mặc định tương đương `--mixed`, đưa thay đổi của commit gần nhất về Working Directory.
- `git reset --mixed <hash>`: Lùi lịch sử về commit chỉ định và đồng bộ lại Staging Area theo commit đó.
- `git reset -- <tệp>`: Bỏ stage một tệp cụ thể mà không di chuyển `HEAD` (tương đương `git restore --staged <tệp>`).
- `git status`: Quan sát các tệp tin xuất hiện ở trạng thái màu đỏ chưa staged.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng hốt khi thấy git status đổi từ màu xanh sang màu đỏ**: Tưởng code bị mất, thực tế code vẫn an toàn trong Working Directory.
2. **Quên rằng git reset không cờ chính là chế độ --mixed**: Dẫn đến bối rối vì sao các file vừa add bị chuyển sang unstaged.
3. **Chạy reset trên các commit đã push lên nhánh dùng chung**: Làm sai lệch lịch sử của đồng nghiệp và gây xung đột khi đồng bộ.

---

## 🧪 Lab
Hãy cùng tôi thực hành tháo dỡ commit với cờ --mixed mặc định để phân loại lại các tệp tin:
1. Trong kho thử nghiệm riêng, tạo và commit `notes.txt` với nội dung `ban dau` để có commit nền.
2. Sửa `notes.txt`, tạo thêm `a.txt` và `b.txt`, rồi stage cả ba file và commit bằng thông điệp `thu nghiem`.
3. Chạy `git reset --mixed HEAD~1`, rồi `git status`. `notes.txt` hiện modified; `a.txt` và `b.txt` hiện untracked vì commit nền chưa từng chứa chúng.
4. Stage riêng `notes.txt` và `a.txt`, kiểm tra bằng `git status`, rồi commit. Stage `b.txt` và commit riêng.

---

## 💡 Hint
> Với cú pháp reset nhắm vào commit, nếu không chọn `--soft` hay `--hard`, Git dùng `--mixed`. Dùng dấu `--` trước tên file để chỉ nhắm vào file và không di chuyển nhánh.

---

## ✅ Validation
- Phần thay đổi so với commit mục tiêu không còn staged; file có thể hiện modified hoặc untracked tùy file đó đã có trong commit mục tiêu chưa.
- Nội dung đang có trong Working Tree vẫn còn sau thao tác mixed reset.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --mixed.

---

## 🔥 Challenge
Sử dụng `git reset <tên-file>` để chỉ rút duy nhất một file nhạy cảm ra khỏi Staging Area mà vẫn giữ lại các file khác đang chuẩn bị commit.

---

## 📚 Tổng kết
- `git reset --mixed` là chế độ mặc định, dịch chuyển HEAD và reset Staging Area.
- Bảo tồn toàn vẹn Working Directory, đưa các thay đổi về trạng thái unstaged.
- Rất hữu hiệu để bóc tách một commit lớn thành nhiều commit nhỏ có ý nghĩa.
