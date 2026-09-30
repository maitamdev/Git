# Rebase Conflict

---

## 🎯 Mục tiêu
- Hiểu rõ nguyên nhân và bản chất phát sinh xung đột (Conflict) trong tiến trình Git Rebase.
- Nắm vững máy trạng thái tạm dừng (Paused State Machine) của Rebase khi xảy ra xung đột.
- Vận hành chuẩn xác chuỗi 3 bước xử lý: Mở tệp giải quyết xung đột -> `git add` -> `git rebase --continue`.
- Phân biệt rõ ràng chức năng và mức độ an toàn của `--continue`, `--abort`, và `--skip`.

---

## 📖 Định nghĩa
> Rebase Conflict (Xung đột trong quá trình Rebase) là trạng thái Git tạm dừng tiến trình tái cơ sở khi một commit trong danh sách rebase cố gắng áp dụng thay đổi lên một vùng mã nguồn đã bị sửa đổi trái ngược trên nhánh đích. Khác với Merge Conflict chỉ xuất hiện duy nhất một lần ở cuối quá trình, Rebase Conflict có thể xuất hiện nhiều lần liên tiếp ứng với từng commit được áp dụng, đòi hỏi lập trình viên phải giải quyết dứt điểm từng bước một.

---

## 🤔 Tại sao cần?
Rất nhiều lập trình viên cảm thấy sợ hãi Git Rebase chỉ vì từng gặp phải xung đột và không biết cách thoát ra hoặc giải quyết. Hiểu rõ cơ chế tạm dừng của Rebase sẽ biến nỗi sợ hãi thành sự tự tin làm chủ: bạn biết chính xác commit nào đang gặp mâu thuẫn, sửa chữa xung đột một cách chuẩn xác, và nắm trong tay câu lệnh cứu cánh `git rebase --abort` để quay về điểm an toàn bất cứ lúc nào bạn muốn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn đang phát lại một cuốn băng ghi hình từng hành động sửa chữa ngôi nhà. Ở hành động số 1 (commit 1), bạn muốn sơn bức tường màu vàng, nhưng trên nhánh main người khác đã đập bỏ bức tường đó xây thành cửa sổ. Cuốn băng tạm dừng lại (Rebase paused). Bạn phải bước vào phòng, quyết định xem nên giữ cửa sổ hay sơn lại tường (Resolve Conflict), đánh dấu đã quyết định xong (`git add`), rồi bấm nút Play cho cuốn băng chạy tiếp hành động số 2 (`git rebase --continue`).

---

## 🖼 Sơ đồ
```text
Máy trạng thái xử lý Rebase Conflict:
[Chạy git rebase main] ──► Phát hiện Conflict tại commit C_i
                                    │
                                    ▼ (Git tạm dừng tiến trình)
       ┌────────────────────────────┴────────────────────────────┐
       ▼                                                         ▼
[git rebase --abort]                                [Mở tệp sửa conflict]
(Hủy bỏ, về trạng thái ban đầu)                                  │
                                                                 ▼
                                                            [git add <file>]
                                                                 │
                                                                 ▼
                                                    [git rebase --continue]
                                                    (Chạy tiếp commit tiếp theo!)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Khoa đang rebase nhánh `feat/api-v2` lên nhánh chính `main` thì terminal dừng lại đột ngột và in ra thông báo cảnh báo: "CONFLICT (content): Merge conflict in server.js. error: could not apply [4a5b6c] feat: change port. Resolve all conflicts manually". Khoa rất bình tĩnh mở tệp `server.js` trong VS Code, quan sát các điểm mốc đánh dấu xung đột và nhận thấy cổng kết nối đang bị mâu thuẫn trực tiếp giữa 3000 và 8080. Khoa thảo luận nhanh với nhóm và quyết định chọn cổng 8080, xóa các dòng phân cách rồi lưu tệp lại. Khoa gõ `git add server.js` rồi thực thi câu lệnh: `git rebase --continue`. Git lập tức áp dụng xong commit đó và tiếp tục chạy mượt mà đến commit cuối cùng mà không gặp thêm bất kỳ trở ngại nào.

---

## 💻 Command
```bash
git status
git add <tên-tệp-đã-sửa>
git rebase --continue
git rebase --abort
git rebase --skip
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị danh sách các tệp tin đang bị xung đột cần giải quyết trong phiên rebase.
- `git add <tệp>`: Đánh dấu tệp tin đã được giải quyết xung đột thành công (không được gõ git commit!).
- `git rebase --continue`: Tiếp tục áp dụng các commit còn lại sau khi đã add tệp resolved.
- `git rebase --abort`: Hủy bỏ hoàn toàn tiến trình rebase và đưa nhánh quay về trạng thái ban đầu trước khi gõ lệnh.
- `git rebase --skip`: Bỏ qua hoàn toàn commit hiện tại (vứt bỏ thay đổi của commit này và làm tiếp commit sau).

---

## ⚠️ Sai lầm phổ biến
1. **Gõ lệnh `git commit` sau khi sửa conflict trong rebase**:  Đây là sai lầm phổ biến nhất! Trong rebase bạn BẮT BUỘC phải dùng `git rebase --continue` chứ không dùng git commit.
2. **Lạm dụng lệnh `git rebase --skip`**:  Có thể vô tình xóa bỏ toàn bộ công sức của commit đang bị xung đột.
3. **Hoảng loạn xóa thư mục dự án khi gặp conflict thay vì chỉ cần gõ nhẹ nhàng `git rebase --abort`.**: Hoảng loạn xóa thư mục dự án khi gặp conflict thay vì chỉ cần gõ nhẹ nhàng `git rebase --abort`.

---

## 🧪 Lab
1. Tạo nhánh `conflict-demo` từ main, sửa dòng 1 của tệp `app.js` và commit.
2. Chuyển về `main`, sửa cùng dòng 1 của tệp `app.js` với nội dung khác và commit.
3. Chuyển lại sang `conflict-demo` và chạy `git rebase main` để chủ động tạo conflict.
4. Mở `app.js`, chọn nội dung phù hợp, xóa các vạch ngăn cách conflict và lưu lại.
5. Chạy `git add app.js` rồi gõ `git rebase --continue` để hoàn tất rebase thành công.

---

## 💡 Hint
> Sau khi giải quyết xong conflict và `git add`, câu lệnh tiếp theo LUÔN LUÔN là `git rebase --continue`.

---

## ✅ Validation
- Giải quyết thành thạo xung đột trong quá trình rebase bằng git add và git rebase --continue.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về xử lý xung đột trong Git Rebase.

---

## 🔥 Challenge
Tại sao trong quá trình rebase một nhánh gồm 5 commit, bạn có thể phải giải quyết conflict tới 5 lần riêng biệt?

---

## 📚 Tổng kết
- Rebase Conflict xảy ra khi một commit trong danh sách rebase xung đột với các commit trước đó.
- Quy trình chuẩn: Mở tệp sửa code -> `git add` -> `git rebase --continue`.
- Tuyệt đối không gõ `git commit` khi rebase đang tạm dừng; dùng `--abort` nếu muốn quay về an toàn.
