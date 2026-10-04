# Rebase Conflict

---

## 🎯 Mục tiêu
- Hiểu rõ nguyên nhân và bản chất phát sinh xung đột (Conflict) trong tiến trình Git Rebase.
- Nắm vững máy trạng thái tạm dừng (Paused State Machine) của Rebase khi xảy ra xung đột.
- Vận hành chuẩn xác chuỗi 3 bước xử lý: Mở tệp giải quyết xung đột -> `git add` -> `git rebase --continue`.
- Phân biệt rõ ràng chức năng và mức độ an toàn của `--continue`, `--abort`, và `--skip`.

---

## 🧩 Từ khóa hôm nay

### Rebase Conflict
- **Nói dễ hiểu**: Trạng thái Git tạm dừng rebase khi một commit đang được áp dụng gặp mâu thuẫn code với nhánh đích.
- **Ví dụ**: Đang rebase nhánh tính năng lên main thì Git báo xung đột ở file `server.js` vì cả hai nhánh cùng sửa một hàm.
- **Đừng nhầm**: Rebase conflict có thể xảy ra nhiều lần tương ứng với từng commit được replay, khác với merge conflict chỉ giải quyết một lần duy nhất.

### Rebase State Machine
- **Nói dễ hiểu**: Chu trình chuyển đổi trạng thái tạm dừng của Git khi rebase: dừng khi gặp lỗi, đợi sửa xong file, rồi chạy tiếp hoặc hủy bỏ.
- **Ví dụ**: Dùng `git status` khi đang dừng rebase để xem danh sách file conflict, sau đó chọn giải quyết hoặc abort.
- **Đừng nhầm**: Không gõ `git commit` khi giải quyết xung đột rebase; bạn chỉ cần `git add` và gọi `git rebase --continue`.

### Rebase Abort vs Skip
- **Nói dễ hiểu**: Hai phương án xử lý sự cố trong rebase: `--abort` hủy toàn bộ quay về an toàn, còn `--skip` vứt bỏ riêng commit đang lỗi để đi tiếp.
- **Ví dụ**: Gõ `git rebase --abort` nếu conflict quá phức tạp và bạn muốn bình tĩnh bàn bạc lại với đồng nghiệp.
- **Đừng nhầm**: `--skip` bỏ việc phát lại commit hiện tại trong lần rebase này; commit gốc có thể còn trong reflog. Chỉ dùng nếu xác nhận muốn bỏ phần thay đổi đó.

---

## 📖 Định nghĩa
Rebase Conflict là tình trạng Git tạm dừng áp dụng commit khi phát hiện các dòng mã nguồn bị chỉnh sửa mâu thuẫn giữa commit đang phát lại và nhánh đích, yêu cầu người dùng giải quyết từng commit một.

---

## 🤔 Tại sao cần?
Hiểu rõ cơ chế tạm dừng của Rebase giúp bạn tự tin xử lý xung đột mà không hoảng sợ. Bạn biết cách sửa lỗi dứt điểm từng bước, và luôn có chiếc phao cứu sinh `git rebase --abort` để quay về điểm an toàn bất cứ khi nào.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng bạn đang tua lại cuốn băng sửa chữa căn nhà. Đến phân cảnh sơn tường, bạn thấy người khác đã đập tường xây thành cửa sổ. Băng tạm dừng lại. Bạn bước vào chọn giữ cửa sổ hay sơn lại, dán nhãn đã xong (`git add`), rồi bấm Play tiếp tục (`git rebase --continue`).

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
                                                    (Chạy tiếp commit kế tiếp!)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Khoa rebase nhánh `feat/api` lên `main` và gặp conflict ở file `server.js` do khác cổng kết nối. Khoa mở file, chọn cổng 8080, xóa ký hiệu conflict rồi lưu lại. Sau đó Khoa gõ `git add server.js` và `git rebase --continue`. Git tiếp tục chạy mượt mà đến commit cuối cùng.

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
1. **Quên tiếp tục rebase sau khi sửa conflict**: Theo quy trình thông thường, sau khi sửa file và stage phần đã giải quyết, chạy `git rebase --continue`; làm theo hướng dẫn Git nếu có tình huống đặc biệt.
2. **Dùng `git rebase --skip` để né conflict mà chưa xem diff**: Git sẽ không phát lại thay đổi của commit hiện tại vào nhánh mới.
3. **Bắt đầu rebase khi còn thay đổi dở**: Nên commit hoặc cất riêng công việc và kiểm tra `git status` trước để dễ hiểu trạng thái nếu cần abort.

---

## 🧪 Lab
Làm trong kho thử nghiệm riêng, và bắt đầu từ Working Tree sạch.
1. Trên `main`, tạo `app.js` có dòng `mode=base`, stage và commit.
2. Chạy `git switch -c conflict-demo`, đổi dòng thành `mode=feature`, rồi commit.
3. Chạy `git switch main`, đổi cùng dòng thành `mode=main`, rồi commit.
4. Chạy `git switch conflict-demo` và `git rebase main`. Khi conflict xuất hiện, chạy `git status`, mở `app.js`, chọn nội dung hợp nhất rồi xóa các dấu conflict.
5. Chạy `git add app.js`, `git rebase --continue`, rồi `git status` và `git log --oneline --graph` để xác nhận rebase hoàn tất.

---

## 💡 Hint
> Trong quy trình rebase thông thường, sau khi sửa và stage conflict, chạy `git rebase --continue` để Git tiếp tục phát lại commit.

---

## ✅ Validation
- Sau khi sửa conflict và stage file, `git rebase --continue` hoàn tất việc phát lại commit.
- `git rebase --abort` hủy phiên đang chạy và đưa nhánh về điểm bắt đầu; kiểm tra lại `git status` sau đó.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về xử lý xung đột trong Git Rebase.

---

## 🔥 Challenge
Giải thích tại sao tính năng Git `rerere` (Reuse Recorded Resolution) lại đặc biệt hữu ích khi làm việc với các chuỗi rebase dài thường xuyên bị xung đột lặp lại.

---

## 📚 Tổng kết
- Rebase áp dụng từng commit một, nên conflict có thể xuất hiện nhiều lần liên tiếp.
- Quy trình chuẩn: Sửa conflict -> `git add <file>` -> `git rebase --continue`.
- `git rebase --abort` là phao cứu sinh đáng tin cậy để đưa mọi thứ về trạng thái an toàn.
