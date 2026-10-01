# Đối tượng Commit: Ghi lại snapshot lịch sử và metadata tác giả

---

## 🎯 Mục tiêu
- Giải phẫu cấu trúc định dạng nội dung của một đối tượng Commit trong Git.
- Hiểu các trường cốt lõi của Commit: tree, author, committer, thông điệp và parent tùy lịch sử.
- Nắm bắt bản chất của lịch sử Git như một Đồ thị có hướng không chu trình (DAG) liên kết bởi các con trỏ parent.
- Phân biệt sự khác nhau giữa Author (tác giả sáng tác mã) và Committer (người áp dụng commit vào kho).

---

## 🧩 Từ khóa hôm nay

### Commit Object Structure
- **Nói dễ hiểu**: Object mô tả một snapshot bằng `tree` và ghi metadata tác giả/người commit; có thể trỏ tới commit cha.
- **Ví dụ**: Nội dung có dòng `tree`, thường có `author` và `committer`, có 0, 1 hoặc nhiều dòng `parent`, rồi đến thông điệp sau một dòng trống.
- **Đừng nhầm**: Commit không lưu trữ danh sách các dòng thay đổi (diff/patch); nó trỏ thẳng tới một Root Tree hoàn chỉnh của toàn bộ dự án.

### Author vs Committer Metadata
- **Nói dễ hiểu**: Author là người đầu tiên sáng tác ra đoạn mã nguồn, còn Committer là người trực tiếp ghi commit đó vào nhánh hiện tại.
- **Ví dụ**: Bạn viết code vào tuần trước (Author), trưởng nhóm hôm nay dùng `git rebase` hoặc `cherry-pick` để gộp vào main (Committer).
- **Đừng nhầm**: Khi commit thông thường hai trường thường trùng nhau; có thể khác trong nhiều quy trình, ví dụ rebase, cherry-pick, áp dụng patch hoặc đặt author riêng.

### Directed Acyclic Graph (DAG) in Git
- **Nói dễ hiểu**: Cấu trúc đồ thị một chiều không khép kín, trong đó mỗi commit trỏ ngược về một hoặc nhiều commit cha đi trước.
- **Ví dụ**: Commit thường có 1 cha, merge commit có 2 cha, root commit có 0 cha, và không bao giờ có đường đi vòng tròn quay lại chính nó.
- **Đừng nhầm**: Không phải là danh sách liên kết đơn (Linked List) tuyến tính đơn giản; Git có thể rẽ nhánh và hợp nhất đa chiều.

---

## 📖 Định nghĩa
Commit object chứa con trỏ tới root tree, thông tin author và committer (tên, email, Unix timestamp cùng độ lệch múi giờ), các dòng parent nếu có, và thông điệp sau một dòng trống. Root commit không có parent; commit thường có một parent; merge commit có từ hai parent trở lên. Có thể có thêm header tùy chọn như chữ ký. Nội dung thực tế không có giới hạn kích thước cố định.

---

## 💡 Tại sao cần
Nếu không có đối tượng Commit, bạn chỉ có các ảnh chụp thư mục (Tree) rời rạc trong không gian mà không có khái niệm về thời gian, mối liên hệ nhân quả và lịch sử tiến hóa của dự án. Đối tượng Commit đóng vai trò như một bức ảnh chụp kỷ niệm kèm dòng nhật ký lịch sử: nó cho bạn biết ai là người viết mã, ai là người gộp vào kho lưu trữ, diễn ra vào ngày giờ nào, vì lý do gì, và bức ảnh trước đó trong album lịch sử là bức ảnh nào.

---

## 🧠 Mental Model
Hãy tưởng tượng mỗi commit là một trang nhật ký chỉ tới snapshot của dự án (`tree`) và ghi lại trang trước đó qua `parent`. Trang đầu không có trang trước; khi hai dòng lịch sử được hợp nhất, trang mới có thể tham chiếu nhiều trang cha. Nhờ vậy, lịch sử là đồ thị chứ không chỉ là một chuỗi.

---

## 📊 Sơ đồ minh họa
```text
Giải phẫu cấu trúc tệp nội dung đối tượng Commit:
┌────────────────────────────────────────────────────────┐
│                     COMMIT OBJECT                      │
├────────────────────────────────────────────────────────┤
│ tree <tree-object-id>                                  │ <── Trỏ tới Root Tree
│ parent <parent-object-id> (nếu có)                     │ <── Có thể có nhiều parent
│ author Nguyen Van A <a@demo.com> <epoch> +0700          │ <── Tác giả thay đổi
│ committer Nguyen Van A <a@demo.com> <epoch> +0700       │ <── Người tạo commit object
│                                                        │
│ feat: implement user authentication logic              │ <── Commit Message
└────────────────────────────────────────────────────────┘
```

---

## 🏢 Ví dụ thực tế
Chạy `git cat-file -p HEAD` để xem commit hiện tại. Header bắt đầu bằng `tree`; nếu HEAD là root commit thì không có dòng `parent`, còn merge commit có thể có nhiều dòng `parent`. Các trường author/committer ghi timestamp dạng Unix và độ lệch múi giờ; một dòng trống phân cách header với thông điệp.

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
- `git log -1 --pretty=raw`: Hiển thị các header chính, parent và timestamp; `git cat-file -p` hữu ích để xem payload commit trực tiếp.

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
- Lệnh `git cat-file -p HEAD` hiển thị `tree`, author/committer, thông điệp và 0/1/nhiều parent tùy loại commit.
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
- Cấu trúc gồm `tree`, metadata `author`/`committer`, message và các parent tùy lịch sử (root không có parent).
- Các con trỏ parent móc nối với nhau tạo thành Đồ thị có hướng không chu trình (DAG).
- Phân biệt rõ Author và Committer giúp kiểm soát xuất xứ và lịch sử chỉnh sửa mã nguồn minh bạch.
