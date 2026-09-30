# git reset --mixed

---

## 🎯 Mục tiêu
- Nắm vững cơ chế hoạt động của chế độ mặc định `git reset --mixed` (hoặc `git reset` không truyền cờ).
- Hiểu rõ trạng thái của HEAD, Staging Area và Working Directory sau khi chạy reset mixed.
- Sử dụng `git reset` để hủy staged toàn bộ hoặc chọn lọc các tệp tin một cách linh hoạt.
- So sánh chi tiết sự khác nhau về hành vi giữa reset mixed và reset soft.

---

## 📖 Định nghĩa
> `git reset --mixed <commit-target>` (hoặc cú pháp ngắn gọn `git reset <commit-target>`) là chế độ hoạt động mặc định của câu lệnh reset trong Git. Khi được gọi, Git sẽ đồng thời thực hiện hai thao tác: dịch chuyển con trỏ HEAD và con trỏ nhánh hiện tại lùi về commit mục tiêu được chỉ định, đồng thời cập nhật lại Staging Area (Index) sao cho khớp hoàn toàn với snapshot của commit đó. Tuy nhiên, nội dung trong thư mục làm việc Working Directory vẫn được bảo toàn nguyên vẹn.

---

## 🤔 Tại sao cần?
Trong công việc hàng ngày, rất thường xuyên bạn gõ lệnh `git add .` theo thói quen và vô tình đưa hàng chục tệp tin không liên quan vào Staging Area, hoặc bạn commit một loạt thay đổi nhưng sau đó muốn phân chia chúng thành các commit nhỏ gọn gàng hơn. `git reset --mixed` chính là công cụ phân tách tuyệt vời: nó tháo dỡ toàn bộ các thay đổi ra khỏi Staging Area về lại Working Tree dưới dạng unstaged, trao cho bạn quyền chọn lọc lại từng dòng code để chuẩn bị commit.

---

## 🧠 Mental Model (Mô hình tư duy)
Tiếp tục với hình ảnh gửi kiện hàng qua bưu điện. Trong trường hợp này, bạn đã đóng gói hàng và dán băng dính niêm phong hộp cẩn thận (Staging Area). Khi bạn nhận ra mình đã đóng nhầm cả tài liệu bí mật của công ty vào trong thùng hàng, bạn quyết định rạch băng dính và dỡ toàn bộ đồ vật trong thùng ra đặt lại trên bàn làm việc của bạn (`git reset --mixed`). Mọi món đồ vẫn còn nguyên vẹn trên bàn, bạn có thể thong thả phân loại lại món nào cần gửi và món nào giữ lại.

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
Kỹ sư Lan thực hiện chỉnh sửa trên 5 tệp tin khác nhau và tiện tay tạo ngay một commit với thông điệp chung chung: "update various files". Nhận thấy commit này quá lộn xộn, thiếu tính nguyên tử và vi phạm quy chuẩn chia nhỏ commit của công ty, Lan chạy lệnh: `git reset HEAD~1` (chính là chế độ mặc định mixed). Con trỏ nhánh lùi lại 1 commit, và khi Lan gõ `git status`, cả 5 tệp tin đều xuất hiện dưới màu đỏ trong mục "Changes not staged for commit". Từ đây, Lan lần lượt dùng `git add file1` và commit riêng, sau đó `git add file2 file3` và commit riêng rẽ từng phần một cách vô cùng ngăn nắp và rõ ràng.

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
- `git reset HEAD~1`: Cú pháp mặc định tương đương với `--mixed`, đưa thay đổi của commit gần nhất về Working Directory.
- `git reset --mixed <hash>`: Lùi lịch sử về commit chỉ định và đồng bộ lại Staging Area.
- `git reset <tệp>`: Bỏ staged một tệp tin cụ thể (chức năng tương đương `git restore --staged`).
- `git status`: Quan sát các tệp tin xuất hiện ở trạng thái màu đỏ chưa staged.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng hốt khi thấy git status đổi từ màu xanh sang màu đỏ**:  Tưởng rằng code bị mất, thực tế code vẫn nằm an toàn trong Working Directory.
2. **Không nhận biết rằng git reset không cờ chính là git reset --mixed.**: Không nhận biết rằng git reset không cờ chính là git reset --mixed.
3. **Lạm dụng reset mixed trên các commit đã chia sẻ cho đồng nghiệp trên nhánh chung.**: Lạm dụng reset mixed trên các commit đã chia sẻ cho đồng nghiệp trên nhánh chung.

---

## 🧪 Lab
1. Tạo 2 tệp mới `a.txt` và `b.txt`, đưa vào staging bằng `git add .` và commit.
2. Chạy lệnh `git reset HEAD~1` để hoàn tác commit ở chế độ mặc định mixed.
3. Gõ `git status` và quan sát 2 tệp xuất hiện ở trạng thái Untracked/Modified màu đỏ.
4. Lần lượt `git add a.txt` và commit riêng, sau đó làm tương tự với `b.txt`.

---

## 💡 Hint
> Gõ `git reset` không kèm cờ thì Git sẽ luôn luôn mặc định sử dụng chế độ `--mixed`.

---

## ✅ Validation
- Thực hiện thành công reset mixed để tháo dỡ commit và tổ chức lại các thay đổi.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh git reset --mixed.

---

## 🔥 Challenge
So sánh sự khác biệt cốt lõi giữa `git reset --soft HEAD~1` và `git reset --mixed HEAD~1`.

---

## 📚 Tổng kết
- `git reset --mixed` là chế độ mặc định, dịch chuyển HEAD và reset Staging Area.
- Bảo tồn toàn vẹn Working Directory, đưa các thay đổi về trạng thái unstaged.
- Rất hữu hiệu để bóc tách một commit lớn thành nhiều commit nhỏ có ý nghĩa.
