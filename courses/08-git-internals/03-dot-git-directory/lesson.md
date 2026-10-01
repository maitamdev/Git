# Khám phá cấu trúc bên trong thư mục .git

---

## 🎯 Mục tiêu
- Giải mã toàn bộ các tệp tin và thư mục cốt lõi bên trong thư mục quản trị `.git/`.
- Hiểu rõ chức năng của từng thành phần: `HEAD`, `config`, `description`, `index`, `objects/`, `refs/`, `hooks/`, `info/`.
- Nhận thức được rằng một kho lưu trữ Git hoàn chỉnh chỉ là một thư mục bình thường chứa thư mục con `.git/`.
- Tự tin kiểm tra và điều chỉnh các thiết lập cục bộ trực tiếp trong tệp cấu hình.

---

## 🧩 Từ khóa hôm nay

### HEAD Reference File
- **Nói dễ hiểu**: Tệp văn bản thuần ASCII nằm tại `.git/HEAD` ghi lại con trỏ hiện tại đang kiểm xuất (checkout) nhánh nào hoặc commit nào.
- **Ví dụ**: Khi ở trên nhánh `main`, mở tệp sẽ thấy đúng một dòng: `ref: refs/heads/main`.
- **Đừng nhầm**: Không phải file nhị phân; bạn hoàn toàn có thể dùng lệnh `cat` hoặc text editor để xem nội dung bên trong.

### Local Repository Config (.git/config)
- **Nói dễ hiểu**: Tệp cấu hình dạng INI lưu trữ toàn bộ thiết lập cụ thể cho riêng repository hiện tại (như URL remote, tracking branch).
- **Ví dụ**: Khối `[remote "origin"] url = git@github.com:user/repo.git` chỉ định địa chỉ đẩy mã nguồn.
- **Đừng nhầm**: Không ghi đè vĩnh viễn cấu hình toàn cục `~/.gitconfig`; cấu hình cục bộ chỉ có hiệu lực trong phạm vi repo này và có độ ưu tiên cao hơn.

### Binary Staging Index (.git/index)
- **Nói dễ hiểu**: Tệp nhị phân lưu trữ trạng thái hiện thời của Staging Area (danh sách tệp tin đã `git add`, mã băm SHA-1 và thời gian sửa đổi).
- **Ví dụ**: Khi gõ `git add file.txt`, Git ghi lại đường dẫn `file.txt` và mã blob tương ứng vào tệp `.git/index`.
- **Đừng nhầm**: Không phải tệp văn bản đọc được bằng `cat`; cần dùng lệnh plumbing `git ls-files --stage` để kiểm tra.

---

## 📖 Định nghĩa
Thư mục `.git/` là trái tim và linh hồn của mọi kho lưu trữ Git. Đây là một thư mục ẩn nằm ở vị trí cao nhất của cây thư mục làm việc, chứa toàn bộ siêu dữ liệu, lịch sử commit, các đối tượng nhị phân, cấu hình người dùng và con trỏ nhánh. Nếu bạn xóa thư mục `.git/`, toàn bộ lịch sử quản lý phiên bản sẽ biến mất và dự án của bạn trở thành một thư mục tệp tin thông thường không có Version Control.

---

## 💡 Tại sao cần
Hầu hết các kỹ sư xem thư mục `.git/` như một chiếc hộp đen ma thuật cấm kỵ và không bao giờ dám mở ra xem. Tuy nhiên, khi bạn thấu hiểu tường tận từng tệp tin và thư mục bên trong chiếc hộp đen đó: bạn biết cách sửa tệp `.git/config` để đổi URL remote mà không cần gõ lệnh dài dòng, biết đọc tệp `.git/HEAD` để biết chính xác con trỏ đang ở đâu, và biết cách sao lưu toàn vẹn toàn bộ dự án bằng cách nén duy nhất thư mục `.git/`. Nhờ đó, bạn hoàn toàn làm chủ hệ thống lưu trữ và tự tin ứng phó với mọi tình huống khẩn cấp.

---

## 🧠 Mental Model
Hãy hình dung thư mục dự án của bạn như một văn phòng làm việc. Toàn bộ các bàn ghế, máy tính và tài liệu trên bàn là Working Directory (nơi bạn làm việc hàng ngày). Còn thư mục `.git/` chính là căn phòng lưu trữ hồ sơ tài liệu mật nằm ở góc phòng: có tủ đựng hồ sơ lịch sử (`objects/`), bảng danh bạ nhân viên (`config`), chiếc bảng ghim vị trí công việc hiện tại (`HEAD`), và ngăn kéo chứa các bản thảo chờ đóng dấu (`index`).

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Một kỹ sư clone một dự án mã nguồn mở có dung lượng mã nguồn là 10 MB nhưng nhận thấy thư mục `.git/` nặng tới 200 MB. Tò mò mở khám phá cấu trúc bên trong, kỹ sư kiểm tra thư mục `.git/objects/pack/` và phát hiện một tệp `.pack` khổng lồ. Sử dụng các công cụ kiểm tra, kỹ sư phát hiện ra rằng trong quá khứ, một lập trình viên cũ đã vô tình commit một tệp video demo nặng 150 MB rồi sau đó xóa đi bằng lệnh `git rm`. Vì Git không bao giờ tự động xóa lịch sử, tệp video đó vẫn nằm nguyên vẹn trong thư mục `.git/objects/`. Kỹ sư đã tiến hành dọn dẹp và giảm 90% dung lượng kho lưu trữ.

---

## 💻 Command & Cú pháp
```bash
# Kiểm tra danh sách tệp tin trong thư mục .git
ls -la .git

# Đọc cấu hình cục bộ của kho lưu trữ
cat .git/config

# Đọc con trỏ nhánh hiện tại
cat .git/HEAD

# Liệt kê các nhánh cục bộ được lưu trong thư mục refs
ls -la .git/refs/heads
```

---

## 🔍 Giải thích command
- `ls -la .git`: Liệt kê danh sách toàn bộ cấu trúc nội tạng của kho lưu trữ, bao gồm cả các tệp ẩn.
- `cat .git/config`: Đọc nội dung tệp cấu hình INI, cho biết các nhánh tracking và URL remote đang kết nối.
- `cat .git/HEAD`: In ra đường dẫn tham chiếu của nhánh đang được kiểm xuất (ví dụ: `ref: refs/heads/main`).
- `ls -la .git/refs/heads`: Liệt kê các tệp đại diện cho các nhánh cục bộ có trong kho.

---

## ⚠️ Sai lầm phổ biến
1. **Xóa nhầm thư mục `.git/` khi muốn dọn dẹp**: Làm mất vĩnh viễn toàn bộ lịch sử commit và các nhánh cục bộ chưa đẩy lên remote.
2. **Commit nhầm thư mục `.git/` của repo con vào repo cha**: Gây ra tình trạng repo lồng nhau bị lỗi (corrupted submodule indicator).
3. **Chỉnh sửa tệp nhị phân `.git/index` bằng text editor**: Định dạng nhị phân sẽ bị hỏng khiến lệnh `git status` báo lỗi index corrupted.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Mở terminal trong một kho lưu trữ Git và chạy lệnh `ls -la .git` để quan sát toàn bộ các tệp tin và thư mục con.
2. **Bước 2**: Chạy lệnh `cat .git/HEAD` để xem nội dung văn bản bên trong con trỏ HEAD.
3. **Bước 3**: Chạy lệnh `cat .git/config` để xem cách Git lưu trữ thông tin user, repository format và các nhánh.
4. **Bước 4**: Tạo nhánh mới `git branch feature-test`, sau đó chạy `cat .git/refs/heads/feature-test` để thấy mã SHA-1 của commit đầu nhánh.

---

## 💡 Hint & mẹo
> Bạn có thể xem tệp `.git/HEAD` hoàn toàn bằng lệnh đọc văn bản thông thường như `cat` vì nó là tệp văn bản ASCII thuần túy chỉ chứa một dòng ngắn gọn.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `cat .git/HEAD` trả về chuỗi có định dạng `ref: refs/heads/<tên_nhánh>`.
- Tệp `.git/refs/heads/feature-test` hiển thị đúng mã SHA-1 40 ký tự trùng khớp với commit mới nhất trên `git log -1`.

---

## ❓ Quiz nhanh
Hãy kiểm tra mức độ nắm bắt của bạn về giải phẫu thư mục .git qua bài trắc nghiệm trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Nếu bạn sao chép duy nhất thư mục `.git/` sang một máy tính hoàn toàn mới (thư mục rỗng) và chạy lệnh `git checkout -f main` hoặc `git restore .`, điều kỳ diệu gì sẽ xảy ra? Hãy giải thích cơ chế phục hồi toàn bộ code từ cơ sở dữ liệu đối tượng.

---

## 📝 Tổng kết
- Thư mục `.git/` chứa toàn bộ lịch sử, đối tượng và siêu dữ liệu của kho lưu trữ.
- Các tệp quan trọng gồm: `HEAD` (con trỏ hiện tại), `config` (cấu hình), `index` (staging area).
- Các thư mục quan trọng gồm: `objects/` (database), `refs/` (nhánh và tag), `hooks/` (kịch bản tự động).
- Hiểu cấu trúc `.git/` giúp bạn tự tin sao lưu, di chuyển và sửa lỗi kho lưu trữ khi gặp sự cố.
