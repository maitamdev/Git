# Vòng đời tệp tin trong Git

---

## 🎯 Mục tiêu
- Nắm vững mô hình cỗ máy trạng thái 4 pha của tệp tin: Untracked, Unmodified, Modified và Staged.
- Dự đoán chuẩn xác sự biến chuyển trạng thái tệp tin sau mỗi lệnh `git add` và `git commit`.
- Giải mã hiện tượng trạng thái kép `MM` khi chỉnh sửa tệp sau khi đã đưa vào vùng đệm.

---

## 🧩 Từ khóa hôm nay

### Untracked — chưa được theo dõi
- **Nói dễ hiểu:** Tệp mới sinh ra trên đĩa cứng mà Git chưa từng được lệnh theo dõi hay lưu vào bất kỳ commit nào.
- **Ví dụ:** Vừa tạo tệp `script.sh`, `git status` báo tệp này là Untracked với dấu hỏi đỏ `??`.
- **Đừng nhầm:** Tệp untracked hoàn toàn độc lập với Git; nếu bạn xóa nó bằng lệnh hệ điều hành, Git sẽ không thể giúp bạn khôi phục lại.

### Unmodified — chưa có thay đổi mới
- **Nói dễ hiểu:** Tệp đã được Git theo dõi và nội dung hiện tại trên ổ đĩa hoàn toàn trùng khớp 100% với commit gần nhất ở `HEAD`.
- **Ví dụ:** Ngay sau khi bạn chạy `git commit`, toàn bộ các tệp vừa commit đều trở về trạng thái Unmodified bình yên.
- **Đừng nhầm:** Unmodified không có nghĩa là file không bao giờ bị sửa; nó chỉ biểu thị rằng không có sai biệt nào so với commit gần nhất.

### Modified — đã sửa nhưng chưa staged
- **Nói dễ hiểu:** Tệp đã thuộc diện theo dõi nhưng nội dung trên thư mục làm việc vừa bị thay đổi và bạn chưa chạy `git add`.
- **Ví dụ:** Mở file `index.html` đã commit tuần trước ra gõ thêm một thẻ `<div>`, `git status` đánh dấu tệp là Modified.
- **Đừng nhầm:** Trạng thái này chỉ tồn tại ở Working Tree; các thay đổi mới này sẽ không bao giờ được đưa vào commit nếu bạn không add.

### Staged — đã chuẩn bị cho commit
- **Nói dễ hiểu:** Bản chụp snapshot cụ thể của tệp đã được đưa vào Staging Area, sẵn sàng niêm phong vào commit tiếp theo.
- **Ví dụ:** Chạy `git add README.md` đưa toàn bộ phần sửa đổi vừa rồi vào khay chờ commit.
- **Đừng nhầm:** Nếu bạn sửa file thêm một lần nữa sau khi đã add, Git sẽ tách thành hai bản: bản đã Staged và phần mới Modified.

---

## 📖 Định nghĩa
Vòng đời tệp tin trong Git là một cỗ máy trạng thái tuần hoàn (State Machine) quản lý sự biến chuyển của tệp. Một tệp trải qua bốn pha chuyển động chính: Untracked (tệp mới chưa giám sát), Unmodified (tệp đã theo dõi và đồng nhất với commit gần nhất), Modified (tệp đã có sửa đổi cục bộ) và Staged (phiên bản snapshot đã được nạp vào khay chuẩn bị commit).

---

## 🤔 Tại sao cần?
Nắm vững vòng đời tệp tin là điều kiện tiên quyết để bạn làm chủ toàn bộ hành vi của Git mà không bao giờ bị bất ngờ. Khi hiểu rõ cỗ máy trạng thái, bạn sẽ giải mã được ngay tại sao cùng một file lại có thể xuất hiện ký hiệu lưỡng tính kỳ lạ `MM` trong `git status -s`, biết chính xác lúc nào cần gõ `git add` và kiểm soát 100% phiên bản mã nguồn sẽ đi vào lịch sử.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem vòng đời tệp tin như các chặng bay của một hành khách: Đầu tiên bạn là khách vãng lai chưa làm thủ tục (Untracked). Sau khi mua vé và làm thủ tục check-in (Staged), bạn bước lên máy bay hạ cánh an toàn tại điểm đến (Unmodified). Khi bạn tháo dây an toàn đứng dậy đi lại (Modified), bạn cần làm thủ tục kiểm soát an ninh lần nữa trước khi lên chuyến bay kế tiếp.

---

## 🖼 Sơ đồ
```text
CỖ MÁY TRẠNG THÁI VÒNG ĐỜI TỆP TIN TRONG GIT:

               ┌─────────────── git add <tệp> ───────────────┐
               │                                             │
               ▼                                             │
      ┌─────────────────┐                     ┌─────────────────┐
      │     STAGED      │─── git commit ─────►│   UNMODIFIED    │
      └─────────────────┘                     └─────────────────┘
               ▲                                       │
               │ git add                               │ Chỉnh sửa tệp
               │                                       ▼
      ┌─────────────────┐                     ┌─────────────────┐
      │   MODIFIED      │◄─── (Sửa tiếp) ─────│   (Đang sửa)    │
      └─────────────────┘                     └─────────────────┘
               ▲
               │ git add
      ┌─────────────────┐
      │    UNTRACKED    │ (Tệp mới tạo ngoài ổ đĩa)
      └─────────────────┘
```

---

## 🌎 Ví dụ thực tế
Bạn tạo tệp `profile.js` (Untracked). Chạy `git add profile.js` đưa tệp vào hàng chờ (Staged). Bạn bấm `git commit` lưu lại, tệp trở nên phẳng lặng (Unmodified). Một tiếng sau, bạn mở file sửa thêm trường avatar: Git lập tức đánh dấu tệp là Modified. Nếu bạn add phần avatar rồi sửa tiếp trường bio, Git ghi nhận trạng thái kép `MM` độc đáo.

---

## 💻 Command
```bash
git status -s
git add <tên-tệp>
git commit -m "feat: complete file state transition"
```

---

## 🔍 Giải thích command
- `git status -s`: Chiếc la bàn hiển thị trạng thái rút gọn hai cột: ký tự cột 1 đại diện cho Index/Staged, ký tự cột 2 đại diện cho Working Tree/Modified.
- `git add <tên-tệp>`: Lệnh thúc đẩy sự chuyển dịch trạng thái từ Untracked hoặc Modified tiến thẳng vào Staged.
- `git commit -m "<thông-điệp>"`: Niêm phong toàn bộ tệp Staged vào snapshot mới và đưa trạng thái các tệp đó về Unmodified sạch sẽ.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng tệp chỉ có thể ở một trạng thái duy nhất**: Hiện tượng `MM` xảy ra khi tệp đã được stage một phần nhưng sau đó lại tiếp tục bị sửa ở Working Tree, sinh ra hai phiên bản song song.
2. **Nghĩ rằng tệp Untracked sẽ được Git sao lưu**: Nếu tệp chưa từng được add và commit, bất kỳ sự cố mất điện hay xóa nhầm nào cũng làm mất tệp vĩnh viễn không thể cứu bằng Git.
3. **Nhầm lẫn giữa tệp bị xóa (Deleted) và Untracked**: Xóa một tệp đã Tracked sẽ đưa tệp vào trạng thái `D` (Deleted), hoàn toàn khác với một tệp mới tinh `??` (Untracked).

---

## 🧪 Lab
1. Tạo tệp mới `status-test.txt` và chạy `git status -s` để thấy ký hiệu `?? status-test.txt` (Untracked).
2. Chạy `git add status-test.txt` và quan sát ký tự chuyển thành `A  status-test.txt` (Staged).
3. Chạy `git commit -m "test: add status example"`; kiểm tra `git status -s` thấy danh sách hoàn toàn trống sạch (Unmodified).
4. Mở tệp `status-test.txt` sửa một dòng chữ; chạy `git status -s` để thấy ký tự ` M status-test.txt` (Modified).

---

## 💡 Hint
> Trong `git status -s`: Cột bên trái đại diện cho vùng Staging Area, cột bên phải đại diện cho thư mục làm việc Working Tree!

---

## ✅ Validation
- Giải thích chính xác chuỗi biến chuyển trạng thái từ Untracked -> Staged -> Unmodified -> Modified.
- Đọc hiểu thành thạo ký hiệu rút gọn của các trạng thái trong terminal.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra mức độ thấu suốt về cỗ máy trạng thái vòng đời tệp tin trong Git.

---

## 🔥 Challenge
Hãy chủ động tạo ra một tệp có trạng thái `MM` trong `git status -s` trên máy của bạn. Trình bày chi tiết từng bước thao tác và giải thích nội dung nào sẽ đi vào commit nếu bạn gõ `git commit` ngay tại thời điểm đó?

---

## 📚 Tổng kết
- Vòng đời tệp tin trong Git là cỗ máy trạng thái gồm 4 pha: Untracked, Unmodified, Modified và Staged.
- Sau khi commit thành công, các tệp vừa commit tự động chuyển về trạng thái tĩnh Unmodified.
- Sửa tiếp tệp sau khi add sẽ tạo ra trạng thái kép `MM`, đòi hỏi bạn phải add lại nếu muốn đưa nội dung mới nhất vào commit.
