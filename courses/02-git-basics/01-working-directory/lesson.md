# Working Directory (Thư mục làm việc)

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và vai trò của Working Directory trong kiến trúc 3 khu vực của Git.
- Phân biệt giữa tệp tin được Git theo dõi (Tracked) và tệp tin chưa được theo dõi (Untracked).
- Nắm bắt cách các thao tác chỉnh sửa tệp tin bên ngoài terminal ảnh hưởng trực tiếp tới Working Directory.

---

## 📖 Định nghĩa
> Working Directory (hay còn gọi là Working Tree - Thư mục làm việc) là một thư mục vật lý thực tế trên hệ thống tệp tin ổ đĩa máy tính của bạn, nơi chứa toàn bộ mã nguồn, tài nguyên hình ảnh và các tệp cấu hình của dự án mà bạn có thể trực tiếp nhìn thấy, mở bằng trình soạn thảo mã nguồn như VS Code và chỉnh sửa hàng ngày. Khi một kho lưu trữ Git được khởi tạo, mọi tệp tin mới tạo ra trong thư mục này ban đầu đều ở trạng thái chưa được theo dõi (Untracked) cho đến khi bạn chủ động đưa chúng vào khu vực chuẩn bị.

---

## 🤔 Tại sao cần?
Nắm vững bản chất của Working Directory là bước đầu tiên để làm chủ luồng làm việc 3 khu vực nổi tiếng của Git. Nếu không hiểu rõ sự độc lập giữa Working Directory và cơ sở dữ liệu Git, bạn sẽ rất dễ rơi vào bẫy tâm lý lầm tưởng rằng chỉ cần bấm phím lưu tệp trong VS Code là Git đã tự động ghi nhớ phiên bản. Bạn cần hiểu rằng Working Directory chỉ là không gian nháp làm việc tạm thời, mọi thay đổi trong đó chưa hề được bảo vệ an toàn cho đến khi đi qua Staging Area và vào Commit.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung Working Directory giống như chiếc bàn làm việc bằng gỗ trong phòng vẽ tranh của một họa sĩ. Trên chiếc bàn này, các hộp màu, cọ vẽ, bút chì và những tờ giấy nháp đang nằm ngổn ngang để bạn thao tác. Chiếc bàn làm việc cho phép bạn tự do tẩy xóa, vẽ thêm nét mực mới hay thậm chí vò nát một bản nháp mà không ảnh hưởng gì tới các tác phẩm hoàn thiện đã được đóng khung treo trang trọng trong phòng trưng bày Repository.

---

## 🖼 Sơ đồ
```text
Kiến trúc 3 khu vực của Git:
┌──────────────────────┐     git add      ┌──────────────────────┐    git commit    ┌──────────────────────┐
│  Working Directory   │ ───────────────► │     Staging Area     │ ───────────────► │      Repository      │
│ (Thư mục làm việc)   │                  │   (Vùng chuẩn bị)    │                  │  (Kho lưu trữ HEAD)  │
│  - Chỉnh sửa code    │                  │  - Chọn lọc commit   │                  │  - Lưu snapshot vĩnh │
└──────────────────────┘                  └──────────────────────┘                  └──────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư phần mềm mở dự án website bán hàng và tạo thêm một tệp tin mới mang tên payment-gateway.js để lập trình tính năng thanh toán. Khi mở cửa sổ terminal và gõ lệnh git status, Git sẽ liệt kê tệp payment-gateway.js dưới mục màu đỏ mang tên Untracked files. Điều này có nghĩa là tệp tin này đã tồn tại thực tế trên ổ cứng trong Working Directory, nhưng cơ sở dữ liệu của Git hoàn toàn chưa hề để mắt tới nó. Chỉ khi kỹ sư thực hiện lệnh thêm tệp, Git mới bắt đầu theo dõi vòng đời của nó vào dự án.

---

## 💻 Command
```bash
git status
ls -la
```

---

## 🔍 Giải thích command
- `git status`: Lệnh kiểm tra trạng thái toàn diện, hiển thị chi tiết các tệp tin trong Working Directory đang bị sửa đổi hoặc chưa được đưa vào diện theo dõi.
- `ls -la`: Liệt kê tất cả các tệp tin và thư mục thực tế đang có mặt trong thư mục làm việc bao gồm cả các tệp ẩn.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ lưu tệp là Git đã ghi nhớ**:  Lưu tệp trong trình soạn thảo chỉ cập nhật dữ liệu trên ổ cứng tại Working Directory, hoàn toàn chưa tạo snapshot trong Git.
2. **Sợ rằng sửa file trong Working Directory làm hỏng commit cũ**:  Commit cũ được bảo vệ vĩnh viễn trong cơ sở dữ liệu, việc sửa code trên bàn làm việc không làm thay đổi lịch sử đã qua.
3. **Nhầm lẫn Working Directory với Staging Area**:  Không phân biệt được tệp đang sửa với tệp đã sẵn sàng để commit.

---

## 🧪 Lab
1. Mở terminal tại thư mục dự án và tạo một tệp tin mới bằng lệnh `echo "console.log(1);" > script.js`.
2. Chạy lệnh `git status` để quan sát tệp `script.js` xuất hiện trong mục Untracked files màu đỏ.
3. Nhận biết rằng tệp tin này đang nằm trong Working Directory nhưng chưa hề được đưa vào Staging Area.

---

## 💡 Hint
> Mọi tệp tin bạn nhìn thấy và sửa đổi trong VS Code đều nằm trong Working Directory.

---

## ✅ Validation
- Tạo tệp thành công và `git status` nhận diện tệp là untracked trong working tree.

---

## ❓ Quiz
Hãy hoàn thành bài kiểm tra trắc nghiệm dưới đây về Working Directory trong Git.

---

## 🔥 Challenge
Mô tả điều gì sẽ xảy ra với các tệp trong Working Directory nếu bạn chuyển sang một nhánh hoàn toàn khác.

---

## 📚 Tổng kết
- Working Directory (Working Tree) là thư mục vật lý nơi bạn trực tiếp xem và chỉnh sửa tệp tin.
- Là khu vực đầu tiên trong kiến trúc 3 khu vực của Git: Working Tree -> Staging Area -> Repository.
- Mọi thay đổi trong Working Directory chỉ mang tính tạm thời cho đến khi được stage và commit.
