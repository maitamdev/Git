# Git Internals là gì? Bí mật dưới nắp ca-pô của Git

---

## 🎯 Mục tiêu
- Hiểu rõ lý do tại sao một kỹ sư Git cấp cao cần nắm vững cơ chế bên dưới nắp ca-pô (Under the hood) của Git.
- Nắm bắt bức tranh tổng quan: Git thực chất là một hệ thống tệp tin định danh theo nội dung đơn giản kèm theo giao diện VCS phía trên.
- Làm quen với 4 trụ cột cốt lõi: Object Database, References (Refs), Con trỏ HEAD, và Index (Staging Area).
- Xây dựng phản xạ tự tin khi gỡ lỗi, cứu dữ liệu và phân tích các trạng thái phức tạp trong Git.

---

## 🧩 Từ khóa hôm nay

### Content-Addressable Storage
- **Nói dễ hiểu**: Git định danh object bằng mã băm được tính từ loại, kích thước và nội dung; với blob, tên đường dẫn không nằm trong dữ liệu được băm.
- **Ví dụ**: Trong repository SHA-1, nội dung blob gồm đúng byte `hello world\n` tạo object ID `95d09f2b10159347eece71399a7e2e907ea3df4f`.
- **Đừng nhầm**: Tên tệp không nằm trong blob. Cùng loại và byte nội dung trong cùng định dạng hash thường cho cùng object; cách lưu có thể loose hoặc packed.

### Git Object Database
- **Nói dễ hiểu**: Object database lưu các object như blob, tree, commit và tag; tùy cấu hình repo, object có thể nằm dạng loose hoặc trong packfile.
- **Ví dụ**: Một commit thường tham chiếu tree và các commit cha; tree tham chiếu blob hoặc tree con.
- **Đừng nhầm**: Không phải cơ sở dữ liệu quan hệ SQL; đây là một kho lưu trữ Key-Value cực kỳ đơn giản và nhanh chóng.

### Git References (Refs)
- **Nói dễ hiểu**: Ref là tên có thể tra ra object ID; branch thường trỏ tới commit, còn tag có thể trỏ tới object khác.
- **Ví dụ**: `refs/heads/main` là tên ref của nhánh `main`; Git có thể lưu ref dạng file riêng hoặc gộp trong `packed-refs`.
- **Đừng nhầm**: Không phải ref nào cũng là file riêng trong `.git/refs/`, và độ dài object ID phụ thuộc định dạng hash của repo.

---

## 📖 Định nghĩa
Git Internals là các cấu trúc dữ liệu và quy tắc lưu trữ đứng sau các lệnh Git. Có thể hiểu Git như một kho object định danh theo nội dung, cùng các refs và index để quản lý lịch sử, nhánh và trạng thái chuẩn bị commit. Git thường dùng SHA-1; các bản Git hiện đại cũng hỗ trợ tạo repo SHA-256, nhưng hai định dạng repo chưa thể trao đổi trực tiếp với nhau trong mọi trường hợp.

---

## 🤔 Tại sao cần?
Khi hiểu quan hệ giữa commit, tree, blob, refs và index, bạn sẽ biết nên kiểm tra phần nào khi nhánh di chuyển sai hoặc commit không còn trên nhánh. Object không còn được tham chiếu có thể vẫn còn một thời gian và có thể tìm qua reflog hoặc `git fsck`, nhưng Git có thể dọn chúng sau này; vì vậy đây không phải bản sao lưu và không nên hứa rằng dữ liệu luôn còn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc lái một chiếc xe đua Công thức 1. Một tài xế bình thường chỉ biết đạp ga, phanh và xoay vô lăng. Nhưng một tay đua vô địch thế giới và đội ngũ kỹ thuật am hiểu từng vòng tua máy, hệ thống phun xăng điện tử và vi sai cầu sau dưới nắp ca-pô. Khi xe gặp sự cố trơn trượt trên đường mưa, người hiểu động cơ sẽ biết chính xác nguyên nhân và cách xử lý an toàn thay vì hoảng loạn đạp phanh.

---

## 🖼 Sơ đồ
```text
Kiến trúc 4 trụ cột của Git Internals:
┌──────────────────────────────────────────────────────────┐
│                     GIT ARCHITECTURE                     │
├─────────────────────────────┬────────────────────────────┤
│ 1. OBJECT DATABASE          │ 2. REFERENCES (REFS)       │
│    .git/objects/            │    .git/refs/heads/        │
│    (Blob, Tree, Commit, Tag)│    (Tên ref → object ID)   │
├─────────────────────────────┼────────────────────────────┤
│ 3. HEAD POINTER             │ 4. STAGING AREA (INDEX)    │
│    .git/HEAD                │    .git/index              │
│    (Trỏ tới branch hiện tại)│    (Cầu nối nhị phân)      │
└─────────────────────────────┴────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Ví dụ: sau khi một nhánh bị reset, kỹ sư kiểm tra `git reflog` để tìm commit cũ còn được ghi nhận, rồi xác minh commit bằng `git show <sha>`. Nếu không thấy trong reflog, có thể tìm object chưa được thu gom bằng `git fsck --unreachable`; kết quả không được đảm bảo nếu object đã bị dọn. Trước mọi thao tác phục hồi, nên tạo ref hoặc bản sao an toàn để giữ commit tìm được.

---

## 💻 Command
```bash
# Kiểm tra đường dẫn Git thực sự dùng làm thư mục quản trị (có thể khác vị trí worktree)
git rev-parse --git-dir

# Hỏi Git đường dẫn tới object database
git rev-parse --git-path objects

# Thống kê loose objects và packfiles
git count-objects -v
```

---

## 🔍 Giải thích command
- `git rev-parse --git-dir`: In vị trí Git directory. Trong linked worktree hoặc submodule, `.git` ở thư mục dự án có thể là một file trỏ đến nơi lưu metadata.
- `git rev-parse --git-path objects`: In đường dẫn object database mà Git đang dùng, kể cả khi vị trí được cấu hình riêng.
- `git count-objects -v`: Thống kê object dạng loose và thông tin packfile; không phải phép đếm mọi file nằm dưới `.git/objects`.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng các commit chỉ lưu phần diff**: Về mặt logic, mỗi commit trỏ tới snapshot của cây thư mục; Git có thể nén và lưu các object theo delta trong packfile để tiết kiệm chỗ.
2. **Sợ hãi khi nhìn vào thư mục `.git`**: Nghĩ rằng thư mục này là ma thuật đen không thể chạm vào, trong khi nó chỉ là tập hợp các tệp tin và thư mục thông thường.
3. **Mở tệp đối tượng bằng trình soạn thảo văn bản thông thường**: Các tệp trong `.git/objects` được nén bằng thuật toán zlib, cần dùng lệnh chuyên dụng của Git như `git cat-file` để giải nén và đọc.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Chạy `git rev-parse --git-dir` và `git rev-parse --git-path objects` để xem Git đang lưu metadata và objects ở đâu.
2. Chạy `git symbolic-ref -q HEAD` để xem tên nhánh nếu HEAD đang gắn với nhánh. Lệnh không in tên nhánh khi HEAD detached; khi đó dùng `git rev-parse HEAD` để xem commit hiện tại.
3. Tạo một file nhỏ, `git add` rồi `git commit`; so sánh `git count-objects -v` trước và sau. Kết quả có thể khác nếu object đã tồn tại hoặc Git vừa pack dữ liệu.

---

## 💡 Hint
> Đừng giả định `.git` luôn là thư mục hoặc chứa mọi thứ độc lập: linked worktree, bare repo, submodule và cấu hình object ngoài có cách bố trí khác. Hãy dùng lệnh Git để tra đường dẫn và dùng bản sao lưu repo đã kiểm tra được thay vì chép tay metadata.

---

## ✅ Validation
- `git symbolic-ref -q HEAD` in tên ref nếu HEAD đang ở trên một nhánh; `git rev-parse HEAD` in object ID của commit hiện tại.
- `git count-objects -v` cho biết số loose objects và thông tin pack, nhưng số đếm không nhất thiết tăng sau mỗi commit.

---

## ❓ Quiz
Hãy kiểm tra nhận thức tổng quan của bạn về kiến trúc nội tại Git qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Hãy giải thích cách blob, tree, commit và ref phối hợp để biểu diễn một phiên bản dự án. Trong câu trả lời, phân biệt snapshot logic với cách Git nén object trên đĩa.

---

## 📚 Tổng kết
- Git Internals nghiên cứu cấu trúc dữ liệu, thuật toán băm và cơ chế lưu trữ thực tế bên dưới của Git.
- Hiểu Git Internals giúp bạn chọn lệnh kiểm tra và phục hồi phù hợp; object không còn được tham chiếu có thể bị garbage collection dọn.
- Bốn trụ cột chính bao gồm: Object Database, References, HEAD pointer và Index binary file.
- Commit trỏ tới snapshot logic; Git có thể dùng packfile và delta compression để lưu trữ tiết kiệm.
