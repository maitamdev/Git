# Lệnh git checkout và lịch sử

---

## 🎯 Mục tiêu
- Hiểu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.
- Phân biệt các trường hợp dùng `git checkout` để đọc hiểu các tài liệu và dự án cũ.
- Đối chiếu các cú pháp cũ của checkout với bộ đôi lệnh hiện đại `git switch` và `git restore`.

---

## 🧩 Từ khóa hôm nay

### git checkout — lệnh truyền thống đa năng
- **Nói dễ hiểu:** Câu lệnh cũ trong Git từng đảm nhận cả việc đổi nhánh lẫn khôi phục nội dung tệp.
- **Ví dụ:** Gặp `git checkout main` trong các bài viết blog hoặc hướng dẫn viết từ nhiều năm trước.
- **Đừng nhầm:** Lệnh vẫn hoạt động bình thường, nhưng ngày nay Git khuyến khích dùng các lệnh chuyên biệt.

### git checkout -b — tiền thân của git switch -c
- **Nói dễ hiểu:** Cú pháp quen thuộc trong tài liệu cũ dùng để vừa tạo nhánh mới vừa chuyển sang nhánh đó.
- **Ví dụ:** Lệnh `git checkout -b feature-cart` tương đương hoàn toàn với `git switch -c feature-cart`.
- **Đừng nhầm:** Hai lệnh này cho ra kết quả giống nhau; lệnh `switch -c` ra đời sau để cú pháp rõ nghĩa hơn.

### git checkout -- file — tiền thân của git restore
- **Nói dễ hiểu:** Cú pháp cũ dùng để hủy bỏ các thay đổi dở dang trên một tệp trong thư mục làm việc.
- **Ví dụ:** Lệnh `git checkout -- index.html` tương đương với `git restore index.html`.
- **Đừng nhầm:** Dấu `--` là cần thiết để Git không nhầm đường dẫn tệp với tên một nhánh có thể trùng.

---

## 📖 Định nghĩa
`git checkout` là câu lệnh truyền thống nổi tiếng của Git. Trước phiên bản 2.23, lệnh này vừa dùng cho thao tác nhánh (chuyển nhánh, tạo nhánh mới) vừa dùng cho thao tác tệp (hủy sửa đổi trên tệp). Ngày nay, hai nhiệm vụ này đã được chia cho `git switch` và `git restore`.

---

## 🤔 Tại sao cần?
Khi tìm kiếm lời giải trên mạng hoặc đọc mã nguồn của các dự án lâu năm, bạn sẽ thấy `git checkout` xuất hiện ở khắp mọi nơi. Hiểu rõ lệnh này giúp bạn tự tin đọc hiểu tài liệu cũ, vận hành các tập lệnh tự động hóa và biết cách quy đổi sang các lệnh hiện đại.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git checkout` giống như chiếc dao đa năng Thụy Sĩ tích hợp cả kéo, dao và tua-vít. Chiếc dao này làm được nhiều việc nhưng dễ bật nhầm lưỡi dao khi chỉ muốn dùng kéo. Bộ đôi mới `git switch` và `git restore` giống như việc tách ra thành một chiếc kéo và một chiếc tua-vít riêng biệt để thao tác chính xác và an toàn.

---

## 🖼 Sơ đồ
```text
Sự phân tách nhiệm vụ của git checkout:
                  ┌───> Thao tác trên Nhánh ────> git switch
[git checkout] ──┤
                  └───> Thao tác trên Tệp ──────> git restore
```

---

## 🌎 Ví dụ thực tế
Bạn tham gia vào một dự án mở và đọc tệp hướng dẫn có dòng: `git checkout -b dev-setup`. Bạn nhận ra ngay đây là lệnh tạo và chuyển sang nhánh `dev-setup`. Bạn có thể gõ nguyên lệnh đó hoặc dùng lệnh mới `git switch -c dev-setup` với kết quả hoàn toàn giống nhau.

---

## 💻 Command
```bash
git checkout <tên-nhánh>
git checkout -b <tên-nhánh-mới>
git checkout -- <tên-tệp>
```

---

## 🔍 Giải thích command
- `git checkout <tên-nhánh>`: Chuyển sang nhánh chỉ định (tương đương `git switch <tên-nhánh>`).
- `git checkout -b <tên-nhánh-mới>`: Vừa tạo vừa chuyển sang nhánh mới (tương đương `git switch -c <tên-nhánh-mới>`).
- `git checkout -- <tên-tệp>`: Hủy bỏ sửa đổi chưa lưu trên tệp (tương đương `git restore <tên-tệp>`).

---

## ⚠️ Sai lầm phổ biến
1. **Quên dấu `--` khi khôi phục tệp:** Nếu tên tệp trùng với tên một nhánh trong dự án, Git sẽ chuyển nhánh thay vì khôi phục tệp.
2. **Bối rối khi thấy tài liệu dùng checkout:** Không cần lo lắng vì đây chỉ là cú pháp quen thuộc trước đây của `git switch`.
3. **Dùng checkout cho người mới học:** Dễ gây nhầm lẫn giữa việc đổi nhánh và việc xóa sửa đổi của tệp.

---

## 🧪 Lab
Bài học này là bài tự kiểm tra cú pháp trên máy của bạn:
1. Chạy lệnh `git checkout -b legacy-demo` để tạo và chuyển nhánh theo phong cách truyền thống.
2. Chạy `git status` để xác nhận bạn đang ở trên nhánh `legacy-demo`.
3. Chạy `git checkout main` để quay trở về nhánh chính.
4. Xóa nhánh vừa thử nghiệm bằng lệnh `git branch -d legacy-demo`.

---

## 💡 Hint
Trong các dự án mới của bản thân, hãy ưu tiên dùng `git switch` cho nhánh và `git restore` cho tệp.

---

## ✅ Validation
- Nhánh `legacy-demo` được tạo và sau đó xóa sạch sẽ.
- Bạn giải thích được sự tương đương giữa `checkout -b` và `switch -c`.

---

## ❓ Quiz
Trả lời các câu hỏi sau để nắm vững sự chuyển dịch từ `git checkout` sang các lệnh hiện đại.

---

## 🔥 Challenge
Giải thích cho một bạn cùng nhóm vì sao tách lệnh thành `git switch` và `git restore` lại giúp giảm rủi ro mất code hơn so với việc dùng chung một lệnh `git checkout`.

---

## 📚 Tổng kết
- `git checkout` là lệnh truyền thống làm được cả thao tác nhánh và thao tác tệp.
- Cú pháp `git checkout -b` tương đương hoàn toàn với `git switch -c`.
- Dùng `git switch` và `git restore` là chuẩn mực hiện đại giúp câu lệnh rõ nghĩa và an toàn.
