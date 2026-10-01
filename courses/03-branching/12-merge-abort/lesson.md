# Hủy merge đang dở bằng `git merge --abort`

---

## 🎯 Mục tiêu
- Nhận biết khi repository đang dừng ở giữa một merge.
- Dùng `git merge --abort` để hủy merge đang có conflict.
- Kiểm tra lại nhánh và tệp sau khi hủy.

---

## 🧩 Từ khóa hôm nay

### `git merge --abort` — hủy merge
- **Nói dễ hiểu:** Dừng lần merge đang diễn ra và thử đưa working tree về trạng thái trước lúc merge.
- **Ví dụ:** Bạn merge nhầm nhánh và Git báo conflict; sau khi xem `git status`, chạy `git merge --abort`.
- **Đừng nhầm:** Lệnh chỉ dùng khi merge còn đang dở; nó không xóa commit đã tạo trước đó.

### Merge in progress — merge đang diễn ra
- **Nói dễ hiểu:** Git đã bắt đầu nối nhánh nhưng chưa hoàn tất commit hợp nhất.
- **Ví dụ:** `git status` báo tệp trong `Unmerged paths`.
- **Đừng nhầm:** Sửa tệp conflict chưa kết thúc merge; cần giải quyết và commit, hoặc hủy bằng abort.

### Pre-merge changes — thay đổi có trước merge
- **Nói dễ hiểu:** Những sửa đổi chưa commit đã có trong working tree trước khi bắt đầu merge.
- **Ví dụ:** Bạn sửa `notes.txt` nhưng chưa commit rồi mới chạy lệnh merge.
- **Đừng nhầm:** Git có thể không khôi phục đầy đủ các thay đổi này khi abort; hãy commit hoặc stash công việc trước khi merge.

---

## 📖 Định nghĩa
`git merge --abort` hủy quá trình merge còn dở và cố gắng khôi phục working tree về trạng thái trước khi merge. Git không bảo đảm khôi phục trọn vẹn nếu đã có thay đổi chưa commit trước merge, vì vậy hãy bắt đầu merge từ working tree sạch.

---

## 🤔 Tại sao cần?
Khi chọn nhầm nhánh hoặc chưa hiểu cách kết hợp nội dung, abort giúp bạn dừng lại để kiểm tra trước khi hoàn tất. Sau đó bạn có thể làm lại với nhánh đúng hoặc nhờ đồng đội xác nhận logic.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy coi merge như một thao tác đang được chuẩn bị. `git merge --abort` yêu cầu Git hủy thao tác dở đó và quay lại mốc làm việc trước merge, miễn là bạn không mang theo sửa đổi chưa lưu mà Git phải cố bảo toàn.

---

## 🖼 Sơ đồ
```text
Working tree sạch
       │ git merge
       ▼
Merge đang dở, có conflict
       │ git merge --abort
       ▼
Trạng thái trước khi merge (Git cố gắng khôi phục)
```

---

## 🌎 Ví dụ thực tế
Bạn định gộp `feature-search` nhưng lại gõ nhầm một nhánh thử nghiệm. Git báo conflict. Bạn xác nhận đúng là chọn nhầm, hủy merge, kiểm tra lại `main`, rồi mới quyết định bước tiếp theo. Các commit của nhánh nguồn vẫn còn; abort chỉ hủy lần hợp nhất đang dở.

---

## 💻 Command
```bash
git status
git merge --abort
git status
```

---

## 🔍 Giải thích command
- `git status`: Trước khi abort, xác nhận đang có tệp chưa giải quyết.
- `git merge --abort`: Hủy tiến trình merge hiện tại.
- `git status`: Sau khi abort, xác nhận không còn merge dở và working tree trở về trạng thái trước đó.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng abort luôn phục hồi mọi sửa đổi chưa commit:** Git cảnh báo rằng thay đổi có trước merge có thể khó khôi phục chính xác.
2. **Dùng abort khi không có merge dở:** Git báo không có merge để hủy.
3. **Nghĩ abort xóa nhánh hoặc commit của nhánh nguồn:** Lệnh dừng lần merge; lịch sử hai nhánh vẫn còn.

---

## 🧪 Lab
Yêu cầu: bắt đầu từ `main`, repository có commit và working tree sạch. Dùng một tên nhánh mới nếu `feature-abort` đã tồn tại.
1. Tạo `abort-demo.txt` trên `main` với dòng `Trạng thái: ban đầu`; add và commit.
2. Chạy `git switch -c feature-abort`. Đổi dòng đó thành `Trạng thái: tính năng`; add và commit.
3. Chạy `git switch main`. Đổi cùng dòng thành `Trạng thái: bản chính`; add và commit.
4. Chạy `git merge feature-abort`. Khi Git báo conflict, xem `git status` và nội dung tệp.
5. Chạy `git merge --abort`, rồi chạy lại `git status` và mở `abort-demo.txt`.
6. Xác nhận tệp trở lại nội dung `Trạng thái: bản chính`, `main` không có merge dở. Chạy `git branch` để thấy `feature-abort` vẫn còn.

---

## 💡 Hint
Nếu kết quả khác dự kiến, đừng chạy thêm lệnh xóa hoặc reset. Xem `git status` và nhờ người hướng dẫn kiểm tra trạng thái trước.

---

## ✅ Validation
- `git status` sau abort không còn mục `Unmerged paths` hoặc thông báo merge đang diễn ra.
- `abort-demo.txt` trở về phiên bản đã commit trên `main` trước merge.
- Nhánh `feature-abort` và commit của nó vẫn còn trong repository.

---

## ❓ Quiz
Trả lời câu hỏi để kiểm tra khi nào nên hủy merge và những gì lệnh này khôi phục.

---

## 🔥 Challenge
Trước khi merge, thử để working tree có một thay đổi chưa commit và giải thích vì sao đây là cách chuẩn bị không an toàn. Sau đó hoàn tác thay đổi trong lab hoặc làm lại trên repository thực hành riêng.

---

## 📚 Tổng kết
- `git merge --abort` hủy một merge chưa hoàn tất và thử phục hồi trạng thái trước merge.
- Commit hoặc stash công việc trước khi merge để giảm nguy cơ mất sửa đổi.
- Abort không xóa nhánh hoặc commit nguồn.
