# Đối tượng Tag: Đánh dấu phiên bản có chú thích (Annotated Tag)

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng giữa Lightweight Tag (thẻ rút gọn) và Annotated Tag (thẻ có chú thích lưu thành đối tượng riêng).
- Khám phá cấu trúc của đối tượng Tag trong cơ sở dữ liệu: object trỏ tới, type, tag name, tagger và message.
- Kiểm tra object của annotated tag và hiểu rằng chữ ký chỉ có khi tag được ký.
- Hiểu `refs/tags/` là namespace logic; Git có thể lưu refs ở dạng file rời hoặc trong kho refs khác.

---

## 🧩 Từ khóa hôm nay

### Annotated Tag Object
- **Nói dễ hiểu**: Object riêng chứa object đích, tagger (nếu có), thông điệp và có thể có chữ ký nếu tag được ký.
- **Ví dụ**: Tạo bằng lệnh `git tag -a v1.0.0 -m "Release v1.0.0"` sinh ra mã băm đối tượng riêng trong database.
- **Đừng nhầm**: `git tag -a` không tự ký tag. Thông tin tagger không tự chứng minh người đó được tổ chức ủy quyền.

### Lightweight Tag Reference
- **Nói dễ hiểu**: Lightweight tag là ref trỏ thẳng tới object đích, không tạo tag object riêng.
- **Ví dụ**: Tạo bằng lệnh `git tag v1.0.0-draft` chỉ đóng vai trò như một nhãn bookmark tạm thời.
- **Đừng nhầm**: `git cat-file -t` trả loại của object đích; với tag được tạo mặc định trên commit, kết quả là `commit`.

### Tagger Metadata
- **Nói dễ hiểu**: Trường dữ liệu ghi lại danh tính người tạo thẻ và dấu thời gian thực hiện gắn thẻ phiên bản.
- **Ví dụ**: Dòng `tagger Le Hoang Nam <nam@company.com> 1769817600 +0700` bên trong đối tượng Tag.
- **Đừng nhầm**: Có thể khác với author của commit; một commit cũ nhiều tháng trước có thể được một release manager gắn tag phát hành vào ngày hôm nay.

---

## 📖 Định nghĩa
Lightweight tag là ref trỏ trực tiếp tới object; annotated tag tạo thêm tag object chứa object đích, tagger, thời gian và thông điệp. Có thể ký annotated tag bằng `-s` nếu đã cấu hình khóa ký; chữ ký cần được xác minh và khóa tin cậy riêng. Namespace `refs/tags/` là cách gọi logic; refs không nhất thiết nằm thành file riêng trong `.git/refs/tags/`.

---

## 🤔 Tại sao cần?
Annotated tag phù hợp khi cần lưu thông điệp và thông tin tagger cho một mốc phát hành; có thể ký tag để người nhận kiểm tra chữ ký. Tag object không tự đảm bảo tag ref sẽ không bị đổi/xóa, và chữ ký chỉ có ý nghĩa khi người xác minh tin cậy đúng khóa ký.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy so sánh lightweight tag với một nhãn đánh dấu đơn giản, còn annotated tag như một thẻ phát hành có mô tả người tạo và thông điệp. Nếu ký annotated tag, chữ ký cho phép kiểm tra object đã ký và khóa ký; tag vẫn có thể bị xóa hoặc di chuyển nếu người dùng có quyền thay đổi refs.

---

## 🖼 Sơ đồ
```text
So sánh Lightweight Tag vs Annotated Tag:
1. Lightweight Tag: (Không tạo đối tượng trong objects/)
   refs/tags/v1.0-light ──► [Commit Object]

2. Annotated Tag: (Tạo hẳn một Tag Object độc lập)
   refs/tags/v1.0.0 ──► [Tag Object]
                              │
                              ├── object: 7a8b9c4d (Trỏ tới Commit)
                              ├── type: commit
                              ├── tag: v1.0.0
                              ├── tagger: Tran Van B <b@dev.com>
                              └── message: Release version 1.0.0
```

---

## 🌎 Ví dụ thực tế
Nhóm phát hành tạo tag bằng `git tag -a v2.0.0 -m "Release v2.0.0"`. `git cat-file -t v2.0.0` cho biết ref trỏ tới object loại `tag`; `git cat-file -p v2.0.0` hiển thị object đích, tagger và message. Nếu cần xác minh chữ ký, tag phải được ký trước đó và kiểm tra bằng `git tag -v v2.0.0`.

---

## 💻 Command
```bash
# Tạo Annotated Tag có message (chưa ký)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tạo Lightweight Tag tạm thời
git tag v1.0.0-temp

# Kiểm tra loại đối tượng của cả hai thẻ
git cat-file -t v1.0.0       # Trả về: tag
git cat-file -t v1.0.0-temp  # Trả về: commit

# Xem nội dung chi tiết của đối tượng Annotated Tag
git cat-file -p v1.0.0
```

---

## 🔍 Giải thích command
- `git tag -a <name> -m <msg>`: Tạo tag object và ref trong namespace `refs/tags/`; vị trí lưu vật lý phụ thuộc backend refs.
- `git cat-file -t v1.0.0`: Trả về chữ `tag` vì đây là đối tượng độc lập.
- `git cat-file -t v1.0.0-temp`: Trả về chữ `commit` vì lightweight tag trỏ thẳng vào commit mà không qua đối tượng trung gian.
- `git cat-file -p v1.0.0`: Hiển thị trường `object`, `type`, `tag`, `tagger` và thông điệp phát hành.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng Lightweight Tag cho bản phát hành chính thức**: Làm mất thông tin người phát hành và thông điệp ghi chú release.
2. **Nghĩ rằng Tag chỉ có thể trỏ vào Commit**: Về mặt cấu trúc Git internals, một đối tượng Tag có thể trỏ tới bất kỳ đối tượng nào (kể cả Blob hay Tree).
3. **Cho rằng xóa tag local sẽ xóa tag trên remote**: Mỗi repository có refs riêng; thao tác remote cần lệnh riêng và quyền phù hợp.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Trong repository thực hành, tạo lightweight tag `internals-demo-light` trỏ tới HEAD.
2. Tạo annotated tag `internals-demo-annotated` bằng `git tag -a internals-demo-annotated -m "Demo tag object" HEAD`.
3. So sánh `git cat-file -t internals-demo-light` và `git cat-file -t internals-demo-annotated`, rồi đọc nội dung annotated object bằng `git cat-file -p internals-demo-annotated`.
4. Dọn hai tag thử bằng `git tag -d internals-demo-light internals-demo-annotated`. Không push tag thử lên remote.

---

## 💡 Hint
> Annotated tag thường phù hợp cho mốc phát hành cần message/tagger. Dùng `-s` nếu cần ký và đã cấu hình khóa cùng backend ký; sau đó xác minh bằng `git tag -v`.

---

## ✅ Validation
- Lệnh `git cat-file -t v1.0.0` hiển thị chính xác chữ `tag`.
- `git cat-file -p internals-demo-annotated` hiển thị object đích, tagger và message; lệnh `git tag -v` chỉ có ý nghĩa với tag đã ký.

---

## ❓ Quiz
Cùng làm bài kiểm tra về bản chất của đối tượng Tag trong Git trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Tạo và kiểm tra một signed annotated tag bằng `git tag -s` và `git tag -v`. Nêu điều kiện cần để người nhận tin cậy chữ ký.

---

## 📚 Tổng kết
- Lightweight Tag chỉ là một con trỏ văn bản đơn giản trỏ trực tiếp tới một commit.
- Annotated Tag tạo ra một đối tượng Tag độc lập trong Object Database với đầy đủ metadata và thông điệp.
- Annotated tag thường hữu ích cho release; ký tag là lựa chọn riêng cần khóa tin cậy.
- `refs/tags/` là namespace logic; refs có thể được lưu riêng, packed hoặc bằng backend khác.
