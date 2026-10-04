# Khám phá cấu trúc bên trong thư mục .git

---

## 🎯 Mục tiêu
- Giải mã toàn bộ các tệp tin và thư mục cốt lõi bên trong thư mục quản trị `.git/`.
- Hiểu rõ chức năng của từng thành phần: `HEAD`, `config`, `description`, `index`, `objects/`, `refs/`, `hooks/`, `info/`.
- Nhận thức rằng Git directory có thể là thư mục riêng hoặc được trỏ tới bởi file `.git`, tùy kiểu repo/worktree.
- Biết dùng lệnh Git để xem metadata; tránh sửa trực tiếp file nội bộ khi chưa hiểu ảnh hưởng.

---

## 🧩 Từ khóa hôm nay

### HEAD Reference File
- **Nói dễ hiểu**: Tệp văn bản thuần ASCII nằm tại `.git/HEAD` ghi lại con trỏ hiện tại đang kiểm xuất (checkout) nhánh nào hoặc commit nào.
- **Ví dụ**: Khi HEAD đang gắn với nhánh `main`, `git symbolic-ref HEAD` in `refs/heads/main`.
- **Đừng nhầm**: Không phải file nhị phân; bạn hoàn toàn có thể dùng lệnh `cat` hoặc text editor để xem nội dung bên trong.

### Local Repository Config (.git/config)
- **Nói dễ hiểu**: Tệp cấu hình dạng INI lưu trữ toàn bộ thiết lập cụ thể cho riêng repository hiện tại (như URL remote, tracking branch).
- **Ví dụ**: Khối `[remote "origin"] url = https://github.com/owner/repo.git` khai báo URL remote; phương thức xác thực được cấu hình riêng.
- **Đừng nhầm**: Không ghi đè vĩnh viễn cấu hình toàn cục `~/.gitconfig`; cấu hình cục bộ chỉ có hiệu lực trong phạm vi repo này và có độ ưu tiên cao hơn.

### Binary Staging Index (.git/index)
- **Nói dễ hiểu**: Index là cấu trúc dữ liệu nhị phân lưu trạng thái đã stage cùng metadata cần thiết; vị trí của nó được Git xác định cho worktree hiện tại.
- **Ví dụ**: Khi gõ `git add file.txt`, Git cập nhật entry cho `file.txt` trong index với object ID của nội dung đã stage.
- **Đừng nhầm**: Không phải tệp văn bản đọc được bằng `cat`; cần dùng lệnh plumbing `git ls-files --stage` để kiểm tra.

---

## 📖 Định nghĩa
Git directory chứa metadata của repository như HEAD, refs, index và object database. Trong linked worktree hoặc submodule, mục `.git` ở gốc worktree có thể là file chỉ đường tới Git directory; bare repository không có worktree. Nếu xóa nhầm Git directory thật, bạn có thể mất metadata/lịch sử cục bộ, nên không sửa/xóa thủ công khi chưa có bản sao an toàn.

---

## 🤔 Tại sao cần?
Hiểu các thành phần nội bộ giúp bạn đọc trạng thái repo và chẩn đoán vấn đề. Dùng lệnh như `git remote -v`, `git symbolic-ref HEAD` và `git ls-files --stage` thay vì sửa tay config, HEAD hoặc index. Cách bố trí thay đổi theo bare repo, submodule và linked worktree nên hãy hỏi Git đường dẫn thực tế.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung thư mục dự án của bạn như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu trên bàn là Working Directory (nơi bạn làm việc hàng ngày). Còn thư mục `.git/` chính là căn phòng lưu trữ hồ sơ tài liệu mật nằm ở góc phòng: có tủ đựng hồ sơ lịch sử (`objects/`), bảng danh bạ nhân viên (`config`), chiếc bảng ghim vị trí công việc hiện tại (`HEAD`), và ngăn kéo chứa các bản thảo chờ đóng dấu (`index`).

---

## 🖼 Sơ đồ
```text
Cấu trúc giải phẫu thư mục .git/:
.git/
├── HEAD              <── Tệp văn bản trỏ tới branch hiện hành (ref: refs/heads/main)
├── config            <── Tệp cấu hình cục bộ của kho lưu trữ (remotes, user)
├── description       <── Tệp mô tả dự án dùng cho GitWeb
├── index             <── Tệp nhị phân Staging Area (lưu cache của cây thư mục)
├── objects/          <── Cơ sở dữ liệu đối tượng (Object Store: xx/yyyyzz)
│   ├── info/
│   └── pack/         <── Chứa các tệp nén packfiles và chỉ mục index
├── refs/             <── Danh mục các con trỏ tham chiếu
│   ├── heads/        <── Nhánh cục bộ (main, feature)
│   ├── tags/         <── Thẻ phiên bản (v1.0.0)
│   └── remotes/      <── Nhánh theo dõi từ xa (origin/main)
└── hooks/            <── Kịch bản tự động kích hoạt trước/sau sự kiện
```

---

## 🌎 Ví dụ thực tế
Một clone có thư mục mã nguồn nhỏ nhưng Git directory lớn. `git count-objects -v` cho thấy dữ liệu đã nằm trong packfile; một file lớn từng được commit vẫn chiếm chỗ nếu commit còn trong lịch sử, dù file đã bị xóa ở commit mới hơn. Giảm dung lượng thường cần viết lại lịch sử bằng công cụ chuyên dụng, phối hợp với nhóm và dọn object sau đó; không có mức giảm cố định và việc viết lại làm đổi commit ID.

---

## 💻 Command
```bash
# Xem Git directory thực tế
git rev-parse --git-dir

# Hỏi Git đường dẫn các thành phần quản trị
git rev-parse --git-path config
git rev-parse --git-path HEAD
git rev-parse --git-path index
git rev-parse --git-path objects

# Dùng lệnh chuyên biệt để đọc thông tin, không sửa file nội bộ trực tiếp
git remote -v
git symbolic-ref -q HEAD
git ls-files --stage
```

---

## 🔍 Giải thích command
- `git rev-parse --git-dir`: In Git directory; có thể khác thư mục `.git` nhìn thấy ở gốc worktree.
- `git rev-parse --git-path <path>`: Hỏi Git vị trí hiệu lực của từng tệp/thư mục metadata.
- `git remote -v`: Đọc danh sách remote và URL bằng lệnh Porcelain.
- `git symbolic-ref -q HEAD`: In ref mà HEAD trỏ tới khi đang ở branch; detached HEAD không có symbolic branch.
- `git ls-files --stage`: Xem entry của index, gồm mode, object ID và stage.

---

## ⚠️ Sai lầm phổ biến
1. **Xóa nhầm Git directory khi muốn dọn dẹp**: Có thể làm mất metadata, lịch sử và nhánh chưa đẩy; trước khi thao tác phải xác định đúng đường dẫn và có bản sao lưu.
2. **Commit nhầm thư mục `.git/` của repo con vào repo cha**: Gây ra tình trạng repo lồng nhau bị lỗi (corrupted submodule indicator).
3. **Chỉnh sửa tệp nhị phân `.git/index` bằng text editor**: Định dạng nhị phân sẽ bị hỏng khiến lệnh `git status` báo lỗi index corrupted.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Chạy `git rev-parse --git-dir` và ghi lại Git directory.
2. Chạy `git symbolic-ref -q HEAD`; nếu lệnh không in kết quả, chạy `git rev-parse HEAD` để nhận diện detached HEAD.
3. Chạy `git remote -v` và `git ls-files --stage` để xem remote và trạng thái index bằng các lệnh hỗ trợ.
4. Tạo nhánh thử `git branch feature-test`, xác minh bằng `git show-ref --verify refs/heads/feature-test`, rồi xóa nhánh thử bằng `git branch -d feature-test` nếu đã tạo thành công.

---

## 💡 Hint
> `.git/HEAD` thường là symbolic ref dạng văn bản khi đang trên branch, nhưng linked worktree có Git directory riêng. Dùng `git symbolic-ref` và `git rev-parse` để tránh phụ thuộc vào vị trí file.

---

## ✅ Validation
- `git symbolic-ref -q HEAD` trả tên ref khi HEAD đang gắn với branch; `git rev-parse HEAD` trả object ID của commit hiện tại.
- `git show-ref --verify refs/heads/feature-test` xác minh nhánh thử tồn tại; không cần dựa vào file ref riêng vì refs có thể được pack.

---

## ❓ Quiz
Hãy kiểm tra mức độ nắm bắt của bạn về giải phẫu thư mục .git qua bài trắc nghiệm trong phần bên dưới.

---

## 🔥 Challenge
Vì sao không nên sao chép thủ công riêng `.git/` để làm bản sao lưu? Nêu một lựa chọn an toàn hơn và giải thích khác biệt giữa Git directory với worktree.

---

## 📚 Tổng kết
- Thư mục `.git/` chứa toàn bộ lịch sử, đối tượng và siêu dữ liệu của kho lưu trữ.
- Các tệp quan trọng gồm: `HEAD` (con trỏ hiện tại), `config` (cấu hình), `index` (staging area).
- Các thư mục quan trọng gồm: `objects/` (database), `refs/` (nhánh và tag), `hooks/` (kịch bản tự động).
- Hiểu cấu trúc `.git/` giúp bạn tự tin sao lưu, di chuyển và sửa lỗi kho lưu trữ khi gặp sự cố.
