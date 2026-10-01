# Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả

---

## 🎯 Mục tiêu
- Giải phẫu cấu trúc định dạng nội dung của một đối tượng Commit trong Git.
- Hiểu rõ 4 thành phần bắt buộc bên trong Commit: con trỏ tree, con trỏ commit cha (parent), thông tin tác giả/người commit, và commit message.
- Nắm bắt bản chất của lịch sử Git như một Đồ thị có hướng không chu trình (DAG) liên kết bởi các con trỏ parent.
- Phân biệt sự khác nhau giữa Author (tác giả sáng tác mã) và Committer (người áp dụng commit vào kho).

---

## 🧩 Từ khóa hôm nay

### Commit Object Structure
- **Nói dễ hiểu**: Tệp văn bản thuần túy nhỏ gọn (thường dưới 300 byte) liên kết một cây thư mục `tree` với lịch sử trước đó qua các con trỏ `parent`.
- **Ví dụ**: Nội dung commit gồm các dòng `tree <hash>`, `parent <hash>`, `author`, `committer` và dòng thông điệp mô tả.
- **Đừng nhầm**: Commit không lưu trữ danh sách các dòng thay đổi (diff/patch); nó trỏ thẳng tới một Root Tree hoàn chỉnh của toàn bộ dự án.

### Author vs Committer Metadata
- **Nói dễ hiểu**: Author là người đầu tiên sáng tác ra đoạn mã nguồn, còn Committer là người trực tiếp ghi commit đó vào nhánh hiện tại.
- **Ví dụ**: Bạn viết code vào tuần trước (Author), trưởng nhóm hôm nay dùng `git rebase` hoặc `cherry-pick` để gộp vào main (Committer).
- **Đừng nhầm**: Khi commit bình thường thì Author và Committer trùng nhau; chỉ khi rebase, cherry-pick hoặc nhận patch qua email thì hai thông tin này mới tách biệt.

### Directed Acyclic Graph (DAG) in Git
- **Nói dễ hiểu**: Cấu trúc đồ thị một chiều không khép kín, trong đó mỗi commit trỏ ngược về một hoặc nhiều commit cha đi trước.
- **Ví dụ**: Commit thường có 1 cha, merge commit có 2 cha, root commit có 0 cha, và không bao giờ có đường đi vòng tròn quay lại chính nó.
- **Đừng nhầm**: Không phải là danh sách liên kết đơn (Linked List) tuyến tính đơn giản; Git có thể rẽ nhánh và hợp nhất đa chiều.

---

## 📖 Định nghĩa
Đối tượng Commit là khối xây dựng trung tâm gắn kết toàn bộ lịch sử của Git. Một đối tượng Commit là một tệp văn bản nhỏ có cấu trúc cố định chứa một con trỏ trỏ tới đối tượng Tree gốc đại diện cho snapshot toàn diện của dự án tại thời điểm đó, một hoặc nhiều con trỏ trỏ tới các commit cha đi trước (parent), siêu dữ liệu về tác giả (Author: người viết mã) và người thực hiện commit (Committer: người đưa mã vào repo) kèm theo dấu thời gian UTC, và cuối cùng là thông điệp mô tả commit (Commit Message).

---

## 💡 Tại sao cần
Nếu không có đối tượng Commit, bạn chỉ có các ảnh chụp thư mục (Tree) rời rạc trong không gian mà không có khái niệm về thời gian, mối liên hệ nhân quả và lịch sử tiến hóa của dự án. Đối tượng Commit đóng vai trò như một bức ảnh chụp kỷ niệm kèm dòng nhật ký lịch sử: nó cho bạn biết ai là người viết mã, ai là người gộp vào kho lưu trữ, diễn ra vào ngày giờ nào, vì lý do gì, và bức ảnh trước đó trong album lịch sử là bức ảnh nào.

---

## 🧠 Mental Model
Hãy tưởng tượng một chuỗi các toa tàu hỏa nối đuôi nhau trên đường ray. Mỗi toa tàu là một đối tượng Commit. Đầu toa tàu có một chiếc móc xích bằng thép nối ngược về toa tàu phía trước (`parent <hash>`). Bên trong toa tàu chứa một tấm bản đồ chỉ dẫn tới nhà kho chứa hàng (`tree <hash>`). Bạn có thể đi ngược từ toa tàu cuối cùng (HEAD) lần theo từng móc xích để đi về toa tàu đầu tiên của đoàn tàu lịch sử.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Một kỹ sư muốn xem Git lưu trữ commit đầu tiên của dự án như thế nào. Kỹ sư chạy lệnh `git cat-file -p HEAD`. Màn hình hiển thị chính xác cấu trúc văn bản thuần túy gồm 5 dòng: dòng 1 bắt đầu bằng chữ `tree` kèm mã băm 40 ký tự; dòng 2 bắt đầu bằng chữ `parent` trỏ về commit trước; dòng 3 ghi rõ `author Le Hoang Nam <nam@company.com> 1727654400 +0700`; dòng 4 là committer; và sau một dòng trống là thông điệp: "feat: add user login endpoint". Kỹ sư nhận ra rằng commit không hề to lớn cồng kềnh, nó chỉ là một tệp văn bản nhỏ nặng chưa tới 300 bytes làm nhiệm vụ liên kết các con trỏ.

---

## 💻 Command & Cú pháp
```bash
# Xem nội dung cấu trúc của commit hiện tại
git cat-file -p HEAD

# Kiểm tra kiểu đối tượng (kết quả trả về: commit)
git cat-file -t HEAD

# Xem thông tin commit cùng mã băm của Tree gốc
git log -1 --pretty=raw
```

---

## 🔍 Giải thích command
- `git cat-file -p HEAD`: Đọc và giải mã trực tiếp đối tượng commit mà con trỏ HEAD đang trỏ tới.
- `git cat-file -t HEAD`: Trả về kiểu của đối tượng (chữ `commit`).
- `git log -1 --pretty=raw`: In ra toàn bộ nội dung thô bao gồm cả timestamp dạng Unix epoch và thông tin timezone của author và committer.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng commit lưu vết vi phân (diff)**: Commit lưu con trỏ trỏ tới Root Tree chứa snapshot hoàn chỉnh của toàn bộ cây mã nguồn tại thời điểm đó.
2. **Nhầm lẫn giữa Author và Committer**: Cần phân biệt rõ khi audit lịch sử để biết ai là người sáng tác mã và ai là người thực hiện đưa mã vào repo chính thức.
3. **Nghĩ rằng Root commit có con trỏ parent**: Commit đầu tiên của kho khởi tạo không có commit cha nào phía trước nên hoàn toàn không có dòng `parent`.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Sử dụng lệnh `git cat-file -p HEAD` để xem nội dung thô của commit hiện tại trong kho làm việc.
2. **Bước 2**: Xác định mã băm của đối tượng `tree` ở dòng 1 và mã băm của `parent` ở dòng 2.
3. **Bước 3**: Chạy lệnh `git cat-file -p <parent_hash>` để lần theo móc xích đi ngược về commit phía trước trong lịch sử.
4. **Bước 4**: Tiếp tục lặp lại cho đến khi gặp commit đầu tiên (Root commit) và quan sát dòng `parent` hoàn toàn biến mất.

---

## 💡 Hint & mẹo
> Một Merge Commit phát sinh từ thao tác gộp nhánh 3-way sẽ có từ 2 dòng `parent` trở lên (ví dụ: `parent <hash_1>` và `parent <hash_2>`), đại diện cho hai nhánh lịch sử hợp nhất lại với nhau.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git cat-file -p HEAD` hiển thị đầy đủ 4 phần: `tree`, `parent` (nếu không phải root commit), `author`/`committer`, và thông điệp commit.
- Truy vấn ngược theo mã `parent` dẫn về đúng lịch sử commit trước đó được hiển thị trong `git log`.

---

## ❓ Quiz nhanh
Hãy kiểm tra kiến thức về cấu trúc và vai trò của đối tượng Commit qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Tại sao khi hai lập trình viên khác nhau cùng commit một đoạn mã có nội dung y hệt nhau vào cùng một giây, mã băm commit của họ vẫn hoàn toàn khác biệt? Các yếu tố nào trong metadata quyết định tính duy nhất của mã băm commit?

---

## 📝 Tổng kết
- Đối tượng Commit là trung tâm của lịch sử Git, liên kết snapshot thư mục với trục thời gian.
- Cấu trúc gồm: con trỏ `tree`, con trỏ `parent`, metadata `author`/`committer`, và `message`.
- Các con trỏ parent móc nối với nhau tạo thành Đồ thị có hướng không chu trình (DAG).
- Phân biệt rõ Author và Committer giúp kiểm soát xuất xứ và lịch sử chỉnh sửa mã nguồn minh bạch.
