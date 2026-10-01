# HEAD và trạng thái detached HEAD

---

## 🎯 Mục tiêu
- Nhận biết HEAD thường theo nhánh đang chọn.
- Nhận ra trạng thái detached HEAD khi chuyển thẳng tới một commit.
- Quay về nhánh an toàn hoặc tạo nhánh để giữ commit thử nghiệm.

---

## 🧩 Từ khóa hôm nay

### HEAD — vị trí làm việc hiện tại
- **Nói dễ hiểu:** Con trỏ cho biết Git đang ở nhánh hoặc commit nào.
- **Ví dụ:** Khi ở `main`, HEAD thường theo nhánh `main`.
- **Đừng nhầm:** HEAD không phải tên tệp hay lời nhắn commit.

### Detached HEAD — HEAD không theo tên nhánh
- **Nói dễ hiểu:** HEAD trỏ thẳng tới commit thay vì theo một nhánh.
- **Ví dụ:** Dùng `git switch --detach <mã-commit>` để xem snapshot cũ.
- **Đừng nhầm:** Đây là trạng thái hợp lệ để kiểm tra; nó không báo repository bị hỏng.

### `git switch -c` — tạo nhánh tại vị trí hiện tại
- **Nói dễ hiểu:** Tạo nhánh mới và chuyển sang đó từ commit bạn đang xem.
- **Ví dụ:** `git switch -c keep-experiment` khi đang detached.
- **Đừng nhầm:** Nếu muốn giữ commit thử nghiệm, tạo nhánh trước khi chuyển đi.

---

## 📖 Định nghĩa
Trong trạng thái thông thường, HEAD trỏ tới một nhánh; nhánh đó trỏ tới commit hiện tại. Khi bạn chuyển thẳng tới một commit bằng `git switch --detach`, HEAD trỏ trực tiếp vào commit và không theo tên nhánh. Nếu tạo commit mới ở trạng thái này, hãy tạo nhánh cho nó trước khi rời đi để có một tên dễ tìm lại.

---

## 🤔 Tại sao cần?
Đôi khi bạn cần kiểm tra một phiên bản cũ để tìm thời điểm lỗi bắt đầu. Detached HEAD cho phép xem commit cũ mà không di chuyển nhánh `main`. Nếu muốn giữ một thử nghiệm, hãy tạo nhánh tại commit đó. Đừng dựa vào việc một commit không có tên nhánh sẽ luôn dễ tìm lại.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung HEAD như dấu “bạn đang xem mốc nào” trên dòng lịch sử. Khi HEAD theo `main`, commit mới sẽ nối vào nhánh đó. Khi detached, bạn đang đứng ở một mốc cụ thể nhưng không có tên nhánh di chuyển theo mình.

---

## 🖼 Sơ đồ
```text
Bình thường:
HEAD ──► main ──► Commit C3

Detached:
HEAD ──────────► Commit C1
main ──────────► Commit C3 (không bị di chuyển)
```

---

## 🌎 Ví dụ thực tế
Một lỗi xuất hiện sau lần cập nhật mới. Bạn chọn một commit cũ để kiểm tra xem ứng dụng lúc đó hoạt động ra sao. Khi chuyển thẳng tới commit đó, HEAD ở trạng thái detached còn `main` vẫn trỏ tới mốc mới nhất. Nếu sửa thử và muốn giữ commit, tạo nhánh như `keep-experiment` trước khi quay về `main`.

---

## 💻 Command
```bash
git log --oneline
git switch --detach <mã-commit>
git status
git switch main
git switch -c <tên-nhánh-mới>
```

---

## 🔍 Giải thích command
- `git log --oneline`: Xem các commit; chọn một commit cũ hơn commit đầu danh sách.
- `git switch --detach <mã-commit>`: Mở commit đó mà không chuyển con trỏ nhánh.
- `git status`: Kiểm tra Git báo HEAD detached tại commit nào.
- `git switch main`: Quay lại nhánh `main` nếu bạn không cần giữ commit thử.
- `git switch -c <tên-nhánh-mới>`: Tạo nhánh tại vị trí hiện tại để giữ commit thử nghiệm.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng loạn khi thấy detached HEAD:** Đây là trạng thái hợp lệ khi xem commit trực tiếp.
2. **Tạo commit rồi rời đi mà không tạo nhánh:** Commit không được nhánh nào giữ lại; hãy tạo nhánh trước khi chuyển đi.
3. **Chọn commit mới nhất rồi mong thấy khác biệt:** Muốn xem phiên bản cũ, chọn một commit nằm dưới commit mới nhất trong `git log`.

---

## 🧪 Lab
1. Chạy `git log --oneline`. Cần có ít nhất hai commit để so sánh. Nếu chỉ có một, tạo tệp `detached-practice.txt`, thêm một dòng nội dung, rồi chạy `git add detached-practice.txt` và `git commit -m "test: add detached practice"`.
2. Chạy `git log --oneline` lần nữa; dùng mã ở dòng thứ hai (commit cũ hơn).
3. Chạy `git switch --detach <mã-commit-cũ>` rồi dùng `git status` để xác nhận HEAD detached.
4. Chạy `git switch main` để quay lại nhánh.

---

## 💡 Hint
> Muốn giữ commit thử nghiệm khi detached? Chạy `git switch -c keep-experiment` trước khi rời commit đó.

---

## ✅ Validation
- `git status` báo HEAD detached tại mã commit cũ ở bước 3.
- Sau `git switch main`, `git status` báo đang ở nhánh `main`.

---

## ❓ Quiz
Trả lời các câu hỏi để kiểm tra cách nhận biết và xử lý detached HEAD.

---

## 🔥 Challenge
Khi đang detached, hãy vẽ hai cách tiếp tục: quay về `main` mà bỏ thử nghiệm, hoặc tạo `keep-experiment` để giữ commit mới. Nêu lệnh mở đầu cho cách thứ hai.

---

## 📚 Tổng kết
- Bình thường HEAD theo một nhánh; detached HEAD trỏ thẳng vào commit.
- Xem commit cũ không tự di chuyển nhánh `main`.
- Tạo nhánh tại commit detached nếu muốn giữ lại thử nghiệm.
