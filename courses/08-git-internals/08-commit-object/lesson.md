# Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả

---

## 🎯 Mục tiêu bài học
- Giải phẫu cấu trúc định dạng nội dung của một đối tượng Commit trong Git.
- Hiểu rõ 4 thành phần bắt buộc bên trong Commit: con trỏ tree, con trỏ commit cha (parent), thông tin tác giả/người commit, và commit message.
- Nắm bắt bản chất của lịch sử Git như một Đồ thị có hướng không chu trình (DAG) liên kết bởi các con trỏ parent.

---

## 📖 Định nghĩa
> Đối tượng Commit là khối xây dựng trung tâm gắn kết toàn bộ lịch sử của Git. Một đối tượng Commit là một tệp văn bản nhỏ có cấu trúc cố định chứa một con trỏ trỏ tới đối tượng Tree gốc đại diện cho snapshot toàn diện của dự án tại thời điểm đó, một hoặc nhiều con trỏ trỏ tới các commit cha đi trước (parent), siêu dữ liệu về tác giả (Author: người viết mã) và người thực hiện commit (Committer: người đưa mã vào repo) kèm theo dấu thời gian UTC, và cuối cùng là thông điệp mô tả commit (Commit Message).

---

## 🤔 Tại sao cần?
Nếu không có đối tượng Commit, bạn chỉ có các ảnh chụp thư mục (Tree) rời rạc trong không gian mà không có khái niệm về thời gian, mối liên hệ nhân quả và lịch sử tiến hóa của dự án. Đối tượng Commit đóng vai trò như một bức ảnh chụp kỷ niệm kèm dòng nhật ký lịch sử: nó cho bạn biết ai là người viết mã, ai là người gộp vào kho lưu trữ, diễn ra vào ngày giờ nào, vì lý do gì, và bức ảnh trước đó trong album lịch sử là bức ảnh nào.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng một chuỗi các toa tàu hỏa nối đuôi nhau trên đường ray. Mỗi toa tàu là một đối tượng Commit. Đầu toa tàu có một chiếc móc xích bằng thép nối ngược về toa tàu phía trước (`parent <hash>`). Bên trong toa tàu chứa một tấm bản đồ chỉ dẫn tới nhà kho chứa hàng (`tree <hash>`). Bạn có thể đi ngược từ toa tàu cuối cùng (HEAD) lần theo từng móc xích để đi về toa tàu đầu tiên của đoàn tàu lịch sử.

---

## 🖼️ Sơ đồ minh họa
```text
Giải phẫu cấu trúc tệp nội dung đối tượng Commit:
┌────────────────────────────────────────────────────────┐
│                     COMMIT OBJECT                      │
├────────────────────────────────────────────────────────┤
│ tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904         │ <── Trỏ tới Root Tree
│ parent 7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b        │ <── Trỏ tới Commit cha
│ author Nguyen Van A <a@demo.com> 1769817600 +0700      │ <── Tác giả viết code
│ committer Nguyen Van A <a@demo.com> 1769817600 +0700   │ <── Người commit
│                                                        │
│ feat: implement user authentication logic              │ <── Commit Message
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư muốn xem Git lưu trữ commit đầu tiên của dự án như thế nào. Kỹ sư chạy lệnh `git cat-file -p HEAD`. Màn hình hiển thị chính xác cấu trúc văn bản thuần túy gồm 5 dòng: dòng 1 bắt đầu bằng chữ `tree` kèm mã băm 40 ký tự; dòng 2 bắt đầu bằng chữ `parent` trỏ về commit trước; dòng 3 ghi rõ `author Le Hoang Nam <nam@company.com> 1727654400 +0700`; dòng 4 là committer; và sau một dòng trống là thông điệp: "feat: add user login endpoint". Kỹ sư nhận ra rằng commit không hề to lớn cồng kềnh, nó chỉ là một tệp văn bản nhỏ nặng chưa tới 300 bytes làm nhiệm vụ liên kết các con trỏ.

---

## 💻 Command & Lệnh thao tác
```bash
git cat-file -p HEAD
git cat-file -t HEAD
git log -1 --raw
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git cat-file -p HEAD giải mã đối tượng commit hiện tại và hiển thị chi tiết các con trỏ tree, parent và metadata tác giả. Lệnh git cat-file -t HEAD xác nhận kiểu đối tượng là commit, và git log -1 --raw hiển thị thông tin commit mới nhất cùng mã băm của đối tượng Tree liên quan một cách trực quan.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cho rằng một commit lưu trữ sự khác biệt (diff) giữa hai phiên bản**:  Commit trỏ tới một cây Tree toàn diện của toàn bộ dự án tại thời điểm đó.
2. **Nhầm lẫn giữa Author (người tạo ra đoạn mã ban đầu) và Committer (người thực hiện lệnh đưa commit vào lịch sử, ví dụ khi cherry-pick hoặc rebase).**: 
3. **Nghĩ rằng commit đầu tiên (Root commit) có con trỏ parent**:  Root commit là khởi nguồn của vũ trụ repo nên hoàn toàn không có dòng `parent`.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Sử dụng lệnh `git cat-file -p HEAD` để xem nội dung thô của commit hiện tại.
2. Xác định mã băm của đối tượng Tree và mã băm của Commit cha (parent).
3. Chạy lệnh `git cat-file -p <parent-hash>` để lần ngược lại commit phía trước.

---

## 💡 Gợi ý thực hiện (Hint)
> Một Merge Commit thông thường sẽ có từ 2 dòng `parent` trở lên (ví dụ: `parent commit_1` và `parent commit_2`).

---

## ✅ Kiểm tra kết quả (Validation)
Chỉ rõ được 4 thành phần cấu tạo nên đối tượng commit từ kết quả hiển thị của lệnh cat-file.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra kiến thức về cấu trúc và vai trò của đối tượng Commit qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao khi hai lập trình viên khác nhau cùng commit một đoạn mã có nội dung y hệt nhau vào cùng một giây, mã băm commit của họ vẫn hoàn toàn khác biệt?

---

## 📚 Tổng kết kiến thức
- Đối tượng Commit là trung tâm của lịch sử Git, liên kết snapshot thư mục với trục thời gian.
- Cấu trúc gồm: con trỏ `tree`, con trỏ `parent`, metadata `author`/`committer`, và `message`.
- Các con trỏ parent móc nối với nhau tạo thành Đồ thị có hướng không chu trình (DAG).
