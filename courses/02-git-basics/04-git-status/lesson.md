# Kiểm tra trạng thái với git status

---

## 🎯 Mục tiêu
- Thành thạo sử dụng `git status` để kiểm soát mọi thay đổi trong kho mã nguồn.
- Phân biệt rõ rệt ba trạng thái tệp: Untracked (chưa theo dõi), Staged (đã chuẩn bị) và Unstaged (chưa chuẩn bị).
- Đọc hiểu thành thạo định dạng rút gọn `git status -s` với cơ chế hai cột trạng thái Index và Working Tree.

---

## 🧩 Từ khóa hôm nay

### `git status` — xem tình trạng tệp
- **Nói dễ hiểu:** Mắt thần giám sát, báo cáo chi tiết mọi sự biến động giữa thư mục làm việc, vùng đệm và commit gần nhất.
- **Ví dụ:** Gõ `git status` trước khi add để rà soát chính xác những file nào vừa được bạn hoặc công cụ chỉnh sửa.
- **Đừng nhầm:** Lệnh chỉ đóng vai trò quan sát báo cáo, hoàn toàn không sửa đổi hay xóa bất kỳ dòng code nào.

### Untracked — chưa được theo dõi
- **Nói dễ hiểu:** Tệp tin mới tinh xuất hiện trong thư mục làm việc mà Git chưa từng lưu dấu vào lịch sử phiên bản.
- **Ví dụ:** Bạn vừa tạo tệp `secret.env`, Git lập tức liệt kê tệp này trong danh sách Untracked files.
- **Đừng nhầm:** Untracked không có nghĩa file bị lỗi, mà là Git đang chờ lệnh xem bạn có muốn quản lý nó hay không.

### Staged — đã chuẩn bị cho commit
- **Nói dễ hiểu:** Những thay đổi đã được bạn tuyển chọn vào Staging Area, sẵn sàng đóng gói vào commit tiếp theo.
- **Ví dụ:** Sau khi chạy `git add index.html`, tệp này nằm trang trọng trong mục Changes to be committed.
- **Đừng nhầm:** Staged chỉ mới là hàng xếp vào thùng carton, chưa dán băng keo niêm phong thành commit chính thức.

### Unstaged — chưa chuẩn bị cho commit
- **Nói dễ hiểu:** Tệp đã được Git theo dõi từ trước và vừa có sửa đổi mới, nhưng bạn chưa đưa phần mới đó vào vùng đệm.
- **Ví dụ:** Bạn sửa tiếp logic trong `app.js` sau khi đã add; phần chỉnh sửa sau đó sẽ nằm ở mục Changes not staged.
- **Đừng nhầm:** Tệp vẫn an toàn trên ổ đĩa; chỉ là phần code mới gõ thêm chưa được nạp vào khay chuẩn bị commit.

---

## 📖 Định nghĩa
`git status` là lệnh thanh tra toàn diện tình trạng hiện tại của kho mã nguồn. Lệnh đối chiếu sự khác biệt giữa ba vùng: Working Tree (nơi bạn gõ code), Staging Area (vùng đệm chuẩn bị) và HEAD commit gần nhất. Nhờ đó, bạn lập tức nắm rõ tệp nào mới tạo, tệp nào vừa chỉnh sửa và tệp nào đã sẵn sàng để niêm phong snapshot.

---

## 🤔 Tại sao cần?
Nếu lập trình mà không gõ `git status`, bạn chẳng khác nào lái xe tốc độ cao trong sương mù dày đặc. Lệnh này giúp bạn kiểm soát hoàn toàn những gì sắp đi vào lịch sử dự án: phát hiện kịp thời các tệp rác, ngăn chặn việc commit nhầm khóa bảo mật hay tệp cấu hình mật, và đảm bảo mọi thay đổi quan trọng đều được chọn lọc cẩn thận trước khi tạo mốc lưu trữ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem `git status` như chiếc bảng đồng hồ điều khiển trên xe ô tô hiển thị tức thời kim xăng, nhiệt độ và cảnh báo áp suất lốp. Trước khi nhấn ga commit hay chuyển nhánh, bạn nhìn vào bảng đồng hồ để kiểm tra: hành lý nào đã xếp vào cốp (Staged), đồ đạc nào còn vương vãi trên ghế sau (Unstaged), và gói bưu kiện lạ nào vừa mang lên xe (Untracked).

---

## 🖼 Sơ đồ
```text
┌─────────────────────────────────────────────────────────────┐
│ BẢNG ĐIỀU KHIỂN GIT STATUS (FULL REPORT)                    │
│                                                             │
│ Changes to be committed: (STAGED - Sẵn sàng đóng gói)       │
│         new file:   index.html                              │
│                                                             │
│ Changes not staged for commit: (UNSTAGED - Đã sửa chưa add) │
│         modified:   style.css                               │
│                                                             │
│ Untracked files: (UNTRACKED - File mới tinh Git chưa biết)  │
│         notes.txt                                           │
└─────────────────────────────────────────────────────────────┘
  Cú pháp rút gọn: git status -s
  XY  Path
  │└── Y: Trạng thái Working Tree (Unstaged)
  └─── X: Trạng thái Staging Area (Staged)
  Ví dụ: " M style.css" (chưa add), "M  style.css" (đã add), "?? notes.txt"
```

---

## 🌎 Ví dụ thực tế
Bạn vừa hoàn thành tính năng đăng nhập bằng cách cập nhật file `auth.js` và tạo file nháp `test-account.txt`. Gõ `git status`, terminal lập tức tách bạch: `auth.js` nằm trong danh sách sửa đổi cần cân nhắc, còn `test-account.txt` ở mục untracked cảnh báo bạn không được vội vàng đưa dữ liệu nháp vào kho mã nguồn chung của cả đội ngũ.

---

## 💻 Command
```bash
git status
git status -s
git status -uno
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị báo cáo chi tiết nhất kèm theo các chỉ dẫn thao tác ngữ cảnh (như lệnh gợi ý unstage hoặc discard).
- `git status -s` (hoặc `--short`): Định dạng hiển thị hai cột siêu gọn dành cho lập trình viên chuyên nghiệp: Cột 1 là trạng thái Staging Area, Cột 2 là trạng thái Working Tree.
- `git status -uno`: Bỏ qua việc quét các tệp Untracked, rất hữu ích khi làm việc trong dự án khổng lồ giúp tăng tốc độ phản hồi terminal.

---

## ⚠️ Sai lầm phổ biến
1. **Commit mù quáng không kiểm tra status**: Tạo commit mà không gõ `git status` dẫn tới việc lọt file nháp, file rác build hoặc lộ secret API keys vào lịch sử Git vĩnh viễn.
2. **Bỏ qua phần Untracked files**: Nghĩ rằng tệp mới tạo tự động vào commit, đến khi đồng nghiệp pull code về mới phát hiện dự án sập vì thiếu file quan trọng.
3. **Hiểu nhầm hai cột của `git status -s`**: Nhầm lẫn giữa cột bên trái X (Staging Area) và cột bên phải Y (Working Tree), dẫn đến phán đoán sai việc thay đổi đã được add hay chưa.

---

## 🧪 Lab
1. Chạy `git status` trong kho lưu trữ để quan sát trạng thái sạch ban đầu.
2. Tạo hai tệp mới: `index.html` và `notes.txt`.
3. Chạy `git status` để thấy cả hai tệp đều đang nằm trong nhóm Untracked files.
4. Chạy `git add index.html`, sau đó chạy lại `git status` để thấy `index.html` chuyển sang mục "Changes to be committed".
5. Chạy `git status -s` và đối chiếu kết quả: nhận ra `A  index.html` (đã stage) và `?? notes.txt` (chưa theo dõi).

---

## 💡 Hint
> Hãy biến việc gõ `git status` thành phản xạ vô điều kiện trước và sau bất kỳ lệnh `git add`, `git commit` hay chuyển đổi branch nào.

---

## ✅ Validation
- Chạy `git status` hiển thị chính xác các khu vực trạng thái Staged, Unstaged và Untracked.
- Đọc hiểu chính xác ký hiệu hai cột của lệnh `git status -s`.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu và phân tích báo cáo trạng thái Git trong các tình huống thực tế.

---

## 🔥 Challenge
Tạo file `app.js`, chạy `git add app.js`. Sau đó mở file `app.js` ra sửa thêm một dòng mới mà KHÔNG gõ add lại. Chạy `git status -s`, quan sát ký hiệu `MM app.js` và giải thích tại sao cùng một file lại có thể vừa Staged vừa Unstaged cùng lúc!

---

## 📚 Tổng kết
- `git status` là bảng điều khiển trung tâm giúp bạn giám sát và làm chủ mọi thay đổi trong repository.
- Ba trạng thái sống còn của tệp: Untracked (chưa quản lý), Staged (đã lên khay chờ commit) và Unstaged (đã sửa nhưng chưa nạp vào khay).
- Sử dụng `git status -s` để đọc nhanh hai cột trạng thái chuẩn kỹ sư thực chiến.
