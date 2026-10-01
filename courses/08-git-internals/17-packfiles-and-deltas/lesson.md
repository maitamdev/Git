# Đóng gói Packfiles và nén sai biệt Delta Compression

---

## 🎯 Mục tiêu
- Hiểu rõ sự khác biệt giữa Loose Objects (đối tượng rời rạc) và Packed Objects (đối tượng đóng gói trong Packfile).
- Làm chủ cơ chế nén sai biệt Delta Compression: lưu một phiên bản gốc (base) và các bản vi phân chênh lệch nhỏ.
- Hiểu vai trò của cặp tệp `.pack` (dữ liệu nén) và `.idx` (bảng chỉ mục tìm kiếm nhanh).
- Kiểm tra pack/index bằng `git verify-pack` và xem thống kê bằng `git count-objects`.

---

## 🧩 Từ khóa hôm nay

### Packfile (.pack) và index (.idx)
- **Nói dễ hiểu**: Packfile chứa nhiều object đã đóng gói; file `.idx` giúp Git tìm object trong pack.
- **Ví dụ**: Repository vừa clone có thể chứa object trong một hoặc nhiều pack thay vì hàng loạt tệp loose.
- **Đừng nhầm**: Đóng gói không đổi object ID; độ dài ID phụ thuộc hash format của repository.

### Delta compression
- **Nói dễ hiểu**: Một object trong pack có thể được lưu dưới dạng chỉ dẫn tái tạo dựa trên một object khác, thay vì lặp lại toàn bộ dữ liệu.
- **Ví dụ**: Hai phiên bản gần giống nhau có thể nén tốt hơn nếu một phiên bản được biểu diễn bằng phần khác biệt.
- **Đừng nhầm**: Git không đảm bảo một thay đổi nhỏ luôn tạo delta nhỏ; object nào làm base cũng không cố định theo thứ tự mới nhất/cũ nhất.

### Base object và delta object
- **Nói dễ hiểu**: Base được lưu đủ dữ liệu; delta lưu cách tái tạo object từ một base hoặc delta khác trong pack.
- **Ví dụ**: `git verify-pack -v <pack>.idx` có thể hiện độ sâu delta và ID của base object.
- **Đừng nhầm**: Cách Git chọn base là chi tiết tối ưu hóa; đừng suy ra nó luôn chọn phiên bản mới nhất.

---

## 📖 Định nghĩa
Git có thể lưu object dưới dạng loose object hoặc gộp chúng vào packfile. Một pack thường đi kèm file `.idx`, giúp định vị object trong pack. Pack entry có thể chứa object đầy đủ hoặc delta dựa trên object khác; Git chọn cách đóng gói để cân bằng dung lượng và tốc độ. Cấu trúc pack không buộc base phải là phiên bản mới nhất, và không phải mọi object trong pack đều được lưu bằng delta.

---

## 💡 Tại sao cần
Packfile giảm chi phí lưu trữ nhiều object và giúp Git truyền dữ liệu theo lô. Mức tiết kiệm tùy nội dung và lịch sử; có repository tạo nhiều pack, và dữ liệu không nhất thiết vừa một pack duy nhất. Object ID vẫn xác định nội dung logic sau khi giải nén.

---

## 🧠 Mental Model
Hãy tưởng tượng mỗi object là một bản tài liệu. Packfile gom nhiều object vào một gói; một số object có thể lưu đầy đủ, còn một số được ghi như chỉ dẫn tái tạo dựa trên object khác. Cách chọn base và mức tiết kiệm tùy dữ liệu, nên không có bảo đảm rằng bản mới nhất luôn là base hay mọi object đều được delta.

---

## 📊 Sơ đồ minh họa
```text
Chuyển đổi từ Loose Objects sang Packfile với Delta Compression:
Trước khi đóng gói (Loose Objects):
[Blob v1: 10 MB]   [Blob v2: 10 MB]   [Blob v3: 10 MB] ──► Tổng: 30 MB đĩa

Sau khi đóng gói (Packfile + Delta Compression):
┌────────────────────────────────────────────────────────┐
│ PACKFILE (.git/objects/pack/pack-xxx.pack)              │
│ - Một object có thể lưu đủ dữ liệu (base)               │
│ - Object gần giống có thể lưu thành delta               │
│ - Delta có thể phụ thuộc base hoặc delta khác           │
└────────────────────────────────────────────────────────┘
──► Mức giảm phụ thuộc nội dung, lựa chọn base và cách Git đóng gói.
```

---

## 🏢 Ví dụ thực tế
Trong một repository thử nghiệm, người học tìm cặp `.pack` / `.idx` dưới đường dẫn objects/pack, rồi chạy `git verify-pack -v <path-to-pack.idx>`. Lệnh nhận file `.idx`; kết quả verbose liệt kê object trong pack, kích thước và thông tin delta nếu có. Nếu chưa có pack, không có gì để verify — đừng tạo dữ liệu nhân tạo trong repository dự án.

---

## 💻 Command & Cú pháp
```bash
# Thống kê số lượng loose objects và packed objects
git count-objects -v

# Kiểm tra một pack bằng tệp index đi kèm
git verify-pack -v <path-to-pack.idx>

# Chỉ chạy trong repository thử nghiệm; git gc thay đổi dữ liệu nội bộ
git gc
```

---

## 🔍 Giải thích command
- `git count-objects -v`: Báo cáo số object loose (`count`), object packed (`in-pack`), dung lượng pack và object có thể được đóng gói.
- `git gc`: Chạy bảo trì như đóng gói, dọn reflog và thu hồi object hết hạn; có thể thay đổi dữ liệu nội bộ nên không dùng để thử trên repo quan trọng.
- `git verify-pack -v <path-to-pack.idx>`: Kiểm tra file index và pack tương ứng, đồng thời liệt kê thông tin object.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng base luôn là phiên bản mới nhất**: Git có thể chọn nhiều cách đóng gói; hãy đọc dữ liệu của pack cụ thể thay vì ghi nhớ một quy tắc không được bảo đảm.
2. **Tự ý xóa `.idx` hoặc `.pack`**: Hai tệp làm việc cùng nhau; xóa thủ công có thể khiến object trong pack không đọc được.
3. **Cho rằng object ID đổi khi pack**: ID xác định object logic, không phụ thuộc việc object được lưu loose hay packed.

---

## 🧪 Lab thực hành
Chạy trong Bash/Git Bash và tạo repository tạm. `git gc` có thể dọn object unreachable và reflog hết hạn; không chạy phần này trong repo dự án.

```bash
mkdir git-pack-lab
cd git-pack-lab
git init
git config user.name "Git Learner"
git config user.email "learner@example.com"
echo "version one" > note.txt
git add note.txt
git commit -m "version one"
echo "version two" >> note.txt
git add note.txt
git commit -m "version two"
echo "version three" >> note.txt
git add note.txt
git commit -m "version three"

git count-objects -v
git gc
git count-objects -v
git verify-pack -v "$(git rev-parse --git-path objects/pack)"/pack-*.idx
```

1. **Bước 1**: So sánh `count`, `in-pack` và `size-pack` trước/sau `git gc`; số liệu có thể khác nhau giữa phiên bản Git.
2. **Bước 2**: Đọc các dòng `git verify-pack -v`; chúng có thể cho biết object đầy đủ hoặc delta. Pack nhỏ có thể không có delta.
3. **Bước 3**: Nếu wildcard không tìm thấy `.idx`, xem đường dẫn in từ `git rev-parse --git-path objects/pack` và chọn file `.idx` trong đó.

---

## 💡 Hint & mẹo
> `git gc` là bảo trì repository, không phải lệnh xem thử vô hại. Học trên repo tạm và so sánh kết quả `git count-objects -v` trước/sau.

---

## ✅ Validation & Kết quả mong đợi
- `git count-objects -v` cho biết số object loose và pack; số lượng thay đổi tùy repository và phiên bản Git.
- `git verify-pack -v <path-to-pack.idx>` xác nhận pack/index hợp lệ nếu repository có pack.

---

## ❓ Quiz nhanh
Hãy kiểm tra kiến thức về cơ chế Packfile và nén sai biệt Delta qua bài trắc nghiệm trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Trong output của `git verify-pack -v`, hãy tìm một object được lưu bằng delta. Object đó phụ thuộc base nào? Tại sao không nên kết luận Git luôn chọn phiên bản mới nhất làm base chỉ từ một ví dụ?

---

## 📝 Tổng kết
- Loose objects lưu từng object riêng; repository có thể có một hoặc nhiều packfile chứa nhiều object.
- Một pack entry có thể là object đầy đủ hoặc delta; Git chọn cách lưu để cân bằng dung lượng và tốc độ.
- Tệp `.idx` đóng vai trò là bảng mục lục tra cứu nhanh vị trí byte của từng đối tượng trong tệp `.pack`.
- Packfiles cho phép Git truyền và lưu nhiều object theo lô; hiệu quả phụ thuộc nội dung và repository.
