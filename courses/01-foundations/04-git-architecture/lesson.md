# Git hoạt động như thế nào? Snapshot và Diff

---

## 🎯 Mục tiêu
- Khám phá mô hình dữ liệu cốt lõi giúp Git đạt tốc độ vượt trội: Dòng chảy các Snapshot (Stream of Snapshots).
- Phân biệt bản chất giữa Snapshot (ảnh chụp trạng thái toàn diện) và Diff (sai biệt được tính toán giữa hai mốc).
- Giải mã cơ chế tái sử dụng dữ liệu thông minh giúp Git lưu trữ hàng triệu phiên bản mà không tốn dung lượng ổ đĩa.

---

## 🧩 Từ khóa hôm nay

### Snapshot — Ảnh chụp trạng thái toàn cảnh
- **Nói dễ hiểu:** Bản ghi lại trọn vẹn diện mạo và nội dung của toàn bộ dự án tại thời khắc bạn bấm nút tạo commit.
- **Ví dụ:** Sau khi hoàn thiện chức năng thanh toán, commit của bạn lưu giữ một Snapshot phản ánh chính xác trạng thái chạy mượt của toàn bộ mã nguồn.
- **Đừng nhầm:** Git không hề nhân bản mù quáng cả thư mục ra một chỗ khác; tệp nào không đổi sẽ được Git trỏ link tới dữ liệu cũ để tối ưu bộ nhớ.

### Diff (Delta) — Sai biệt giữa hai phiên bản
- **Nói dễ hiểu:** Bản báo cáo so sánh chỉ ra chính xác từng dòng code nào được thêm mới, bị xóa bỏ hay chỉnh sửa giữa hai mốc Snapshot.
- **Ví dụ:** Git chỉ ra bạn vừa thêm dòng mã giảm giá mới và xóa đi hàm tính thuế lỗi thời.
- **Đừng nhầm:** Git không lưu trữ dự án dưới dạng cộng dồn các mẩu Diff rời rạc như các hệ thống cổ điển; Diff là phép tính so sánh động được tạo ra khi bạn yêu cầu.

### Commit — Mốc lịch sử đóng băng
- **Nói dễ hiểu:** Điểm nút lịch sử chứa con trỏ dẫn tới Snapshot của dự án cùng thông tin về tác giả, thời gian và lý do sửa đổi.
- **Ví dụ:** Commit "Fix lỗi tràn bộ nhớ khi tải ảnh" đóng băng mã nguồn sau khi đã vá lỗi xong.
- **Đừng nhầm:** Việc bạn tiếp tục gõ code trên máy sau khi commit hoàn toàn không làm suy suyển hay thay đổi Snapshot đã được đóng băng trước đó.

---

## 🤔 Tại sao cần?
Các hệ thống VCS cổ xưa lưu trữ mã nguồn dưới dạng danh sách thay đổi (Delta). Muốn tái hiện phiên bản thứ năm mươi, hệ thống phải cộng dồn năm mươi mẩu thay đổi lại với nhau, cực kỳ chậm chạp và dễ lỗi. Linus Torvalds đã đảo ngược hoàn toàn tư duy này: Git coi dữ liệu như một chuỗi các Snapshot nhỏ gọn. Nhờ vậy, thao tác chuyển đổi qua lại giữa các phiên bản diễn ra tức thì trong chớp mắt. Hiểu được cơ chế Snapshot giúp bạn tự tin làm chủ các thao tác phân nhánh và gộp code phức tạp sau này.

---

## 📖 Định nghĩa
Snapshot là bức ảnh chụp toàn vẹn trạng thái của toàn bộ hệ thống tệp tin trong dự án tại thời điểm tạo commit. Diff là phần chênh lệch (thêm, sửa, xóa) được tính toán khi đặt hai Snapshot cạnh nhau. Git lưu trữ theo mô hình Snapshot kèm con trỏ thông minh giúp tối ưu hóa dung lượng ổ đĩa.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng bạn chụp hai bức ảnh kỷ yếu tập thể: một tấm chụp vào ngày khai giảng và một tấm chụp ngày bế giảng. Mỗi bức ảnh chính là một Snapshot toàn vẹn. Khi đặt hai bức ảnh cạnh nhau để tìm xem bạn nào đổi kiểu tóc hay bạn nào chuyển trường, cái nhìn so sánh đó chính là Diff!

---

## 🖼 Sơ đồ
```text
Snapshot A (Commit 1): File App.js có dòng "Version 1.0"
Snapshot B (Commit 2): File App.js có dòng "Version 2.0"

Diff tính toán động:  - Version 1.0
                      + Version 2.0
```

---

## 🌎 Ví dụ thực tế
Trong một dự án thực tế, bạn sửa một dòng code trong file cấu hình `config.json` giữa hàng ngàn file mã nguồn khác. Git ghi nhận một Snapshot mới cho toàn dự án: file cấu hình được lưu nội dung mới, còn hàng ngàn file không thay đổi sẽ được Git tạo liên kết trỏ thẳng về dữ liệu cũ. Kết quả là Snapshot được tạo trong một phần nghìn giây và chỉ tốn vài chục byte dung lượng.

---

## 💻 Command
Bài học nền tảng này giúp bạn thấu hiểu tư duy thiết kế hệ thống bên dưới của Git; các lệnh so sánh sai biệt trực quan sẽ được hướng dẫn ở bài kế tiếp.

---

## 🔍 Giải thích command
Trong các bài học tới, bạn sẽ được học lệnh `git diff` để tận mắt soi từng dòng code sai biệt trên màn hình đen terminal. Trước tiên, hãy chắc chắn bạn đã thấm nhuần sự khác nhau giữa trạng thái được chụp và phép toán so sánh.

---

## ⚠️ Sai lầm phổ biến
1. **Đánh đồng Diff với cách lưu trữ của Git:** Git không lưu dồn từng mẩu Diff như SVN mà quản lý các Snapshot toàn cảnh để đạt tốc độ tối đa.
2. **Lo sợ Git sẽ làm đầy ổ cứng khi dự án có hàng nghìn commit:** Nhờ cơ chế trỏ liên kết các tệp tin không đổi, dung lượng một repo Git thường nhỏ hơn rất nhiều so với bạn tưởng tượng.
3. **Tưởng rằng sửa file là commit tự cập nhật:** Snapshot của một commit là bất biến vĩnh viễn; mọi chỉnh sửa mới chỉ nằm trong không gian làm việc của bạn cho đến khi tạo commit tiếp theo.

---

## 🧪 Lab
Giảng viên đưa cho bạn hai đoạn mã cấu hình máy chủ:

**Mốc 1 (Snapshot 1):**
```text
PORT=3000
DATABASE_URL=localhost:5432
DEBUG=true
```

**Mốc 2 (Snapshot 2):**
```text
PORT=8080
DATABASE_URL=localhost:5432
DEBUG=false
```

1. Hãy chỉ ra những dòng cấu hình giữ nguyên vẹn giữa hai Snapshot.
2. Trình bày phần Diff (sai biệt) cụ thể giữa Mốc 1 và Mốc 2.
3. Giả sử bạn gõ thêm dòng `SECRET_KEY=123` nhưng chưa tạo commit, Snapshot 2 có bị ảnh hưởng gì không? Vì sao?

---

## 💡 Hint
Hãy nhớ nguyên tắc vàng: "Snapshot là trạng thái tĩnh đã đóng băng, còn Diff là phép trừ giữa hai trạng thái."

---

## ✅ Validation
- Trình bày được sự khác biệt mấu chốt giữa mô hình Delta-based truyền thống và Snapshot-based của Git.
- Phân tích được cách Git tối ưu dung lượng thông qua việc chia sẻ con trỏ dữ liệu giữa các Snapshot.
- Chỉ ra chính xác phần Diff từ hai phiên bản tệp tin mẫu trong bài thực hành.

---

## ❓ Quiz
Tham gia bài trắc nghiệm dưới đây để đánh giá độ thấu hiểu về kiến trúc Snapshot và Diff. Đọc kỹ phần giải thích sư phạm để nắm trọn vẹn bản chất.

---

## 🔥 Challenge
Hãy giải thích cho đồng đội trong nhóm vì sao Git có thể chuyển đổi giữa các nhánh mã nguồn cực nhanh chỉ trong vài phần nghìn giây dựa trên cơ chế con trỏ Snapshot.

---

## 📚 Tổng kết
- Git quản lý mã nguồn theo mô hình chuỗi các Snapshot độc lập, mang lại tốc độ truy xuất và chuyển đổi phiên bản siêu phàm.
- Diff là kết quả so sánh động giữa hai mốc Snapshot, giúp lập trình viên kiểm soát chính xác từng thay đổi nhỏ nhất.
- Dữ liệu không đổi giữa các commit được tái sử dụng bằng cơ chế con trỏ liên kết, giúp kho Git luôn nhỏ gọn và tối ưu.

