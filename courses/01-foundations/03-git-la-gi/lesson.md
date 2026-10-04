# Git là gì? VCS phân tán trên máy bạn

---

## 🎯 Mục tiêu
- Khám phá nguồn gốc và sức mạnh cốt lõi của Git — hệ thống quản lý phiên bản phân tán thống trị ngành công nghệ.
- Hiểu rõ cơ chế lưu trữ của kho chứa (Repository) nằm gọn gàng ngay trên ổ cứng máy bạn.
- Sử dụng thành thạo `git status` như chiếc la bàn định vị trạng thái dự án trước mọi thao tác.

---

## 🧩 Từ khóa hôm nay

### Git — Hệ thống quản lý phiên bản phân tán
- **Nói dễ hiểu:** Công cụ dòng lệnh cực nhanh do Linus Torvalds tạo ra, giúp ghi lại và bảo vệ từng mốc lịch sử mã nguồn dự án ngay trên máy bạn.
- **Ví dụ:** Bạn dùng Git để theo dõi quá trình phát triển một website thương mại điện tử suốt nhiều tháng trời.
- **Đừng nhầm:** Git là phần mềm chạy độc lập trên máy tính cá nhân; Git không phải là trang web GitHub hay GitLab.

### DVCS — Quản lý phiên bản phân tán
- **Nói dễ hiểu:** Kiến trúc trao toàn quyền cho lập trình viên, biến mỗi chiếc máy tính thành một trung tâm dữ liệu độc lập sở hữu trọn vẹn lịch sử.
- **Ví dụ:** Bạn ngồi trên xe đò mất sóng hoàn toàn nhưng vẫn xem lại được lịch sử commit của cả nhóm từ hai năm trước.
- **Đừng nhầm:** Máy bạn có đầy đủ lịch sử không đồng nghĩa với việc đồng đội tự thấy code của bạn; việc chia sẻ vẫn cần sự chủ động.

### Repository (Repo) — Kho lưu trữ dự án
- **Nói dễ hiểu:** Thư mục đặc biệt chứa toàn bộ mã nguồn dự án kèm cơ sở dữ liệu lịch sử ngầm do Git quản lý.
- **Ví dụ:** Khi bạn khởi tạo một dự án mới, Git tạo ra kho lưu trữ ngay tại thư mục đó để bắt đầu theo dõi.
- **Đừng nhầm:** Kho chứa Git không bắt buộc phải tải lên đám mây; một thư mục trên máy bạn đã là một repo hoàn chỉnh.

---

## 🤔 Tại sao cần?
Năm 2005, cha đẻ hệ điều hành Linux — Linus Torvalds — đã tạo ra Git chỉ trong vài tuần với triết lý: tốc độ bàn thờ, thiết kế phân tán và bảo toàn dữ liệu tuyệt đối. Trong môi trường doanh nghiệp, khả năng làm việc độc lập của Git là chìa khóa năng suất. Khi sở hữu một repo Git đầy đủ trên máy, bạn không bao giờ lo mạng chập chờn hay máy chủ bị nghẽn; mọi thao tác từ truy vết lịch sử đến ghi nhận mốc mới đều diễn ra tức thì với tốc độ ổ cứng.

---

## 📖 Định nghĩa
Git là hệ thống quản lý phiên bản phân tán (DVCS) mã nguồn mở. Git biến mỗi thư mục dự án thành một kho lưu trữ (repository) độc lập, chứa toàn bộ lịch sử commit và metadata ngay trên máy tính cục bộ mà không đòi hỏi kết nối máy chủ thường trực.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem Git như người quản kho mẫn cán và trung thành nhất của bạn. Kho hàng (Repository) nằm ngay dưới chân bạn. Bạn yêu cầu người quản kho chụp ảnh kiện hàng nào thì người đó ghi vào sổ cái. Lệnh `git status` giống như việc bạn vỗ vai hỏi: "Này quản kho, hiện tại kho đang có gì mới hay có kiện hàng nào bị thay đổi không?"

---

## 🖼 Sơ đồ
```text
Máy tính của bạn (Môi trường độc lập)
┌─────────────────────────────────────────────────────┐
│ Thư mục dự án (Working Directory)                   │
│  ├── index.html, style.css                          │
│  └── Kho dữ liệu Git cục bộ (.git)                  │
│       ├── Toàn bộ biên niên sử các Commit           │
│       └── Cơ chế kiểm soát toàn vẹn dữ liệu         │
└─────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Bạn đang code một ứng dụng di động tại quán cà phê thì đột ngột mất điện và rớt mạng. Thay vì phải dọn đồ đi về như thời dùng hệ thống tập trung cũ, bạn vẫn thong thả viết code, kiểm tra `git status` để xem các file vừa sửa và tạo các mốc lưu trữ an toàn. Toàn bộ tiến trình làm việc của bạn không bị gián đoạn dù chỉ một giây.

---

## 💻 Command
```bash
git status
```

---

## 🔍 Giải thích command
`git status` là chiếc la bàn định vị tối quan trọng trong Git. Lệnh này kiểm tra và liệt kê chi tiết trạng thái của các file: file nào vừa được tạo mới, file nào bị chỉnh sửa và file nào đã sẵn sàng để đóng gói thành commit. Lệnh này chỉ đọc dữ liệu cục bộ, hoàn toàn an toàn và không làm thay đổi bất kỳ file nào của bạn.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng Git bắt buộc phải kết nối Internet mới hoạt động:** Git sinh ra để phục vụ mô hình phân tán; hầu hết sức mạnh của nó nằm trọn vẹn ngay trên chiếc máy tính của bạn.
2. **Gõ lệnh trong trạng thái mù đường (không chạy `git status`):** Lập trình viên mới thường vội vã commit mà quên kiểm tra `git status`, dẫn đến việc lưu nhầm các file rác hoặc bỏ sót file quan trọng.
3. **Tưởng rằng `git status` sẽ tự động lưu thay đổi:** Lệnh này chỉ mang tính chất thông báo và quan sát tình trạng; nó hoàn toàn không tạo ra commit nào cho bạn.

---

## 🧪 Lab
1. Mở cửa sổ dòng lệnh và gõ `git status` để quan sát phản hồi từ hệ thống.
2. Đọc kỹ từng dòng kết quả và cho biết Git đang nhận diện những tệp tin nào trong kho.
3. Giải thích tại sao một kỹ sư phần mềm chuyên nghiệp luôn hình thành phản xạ gõ `git status` trước và sau mỗi hành động trong dự án.

---

## 💡 Hint
Hãy ghi nhớ câu thần chú của giảng viên: "`git status` là chiếc la bàn." Trước khi chuẩn bị đi đâu hay làm gì với mã nguồn, việc đầu tiên là rút la bàn ra để biết mình đang đứng ở đâu.

---

## ✅ Validation
- Định nghĩa chuẩn xác Git là một hệ thống DVCS và kho chứa có thể tồn tại hoàn toàn offline trên máy cá nhân.
- Giải thích được vai trò và cơ chế an toàn (chỉ đọc) của lệnh `git status`.
- Hình thành thói quen kiểm tra trạng thái repo thường xuyên trong quy trình lập trình.

---

## ❓ Quiz
Làm bài trắc nghiệm bên dưới để củng cố nền tảng về Git và câu lệnh `git status`. Chú ý đọc kỹ phần phân tích của giảng viên.

---

## 🔥 Challenge
Hãy tưởng tượng bạn phải thuyết trình trong một phút trước nhà tuyển dụng: Nêu bật sự khác biệt mang tính cách mạng giữa Git và các công cụ quản lý phiên bản thế hệ cũ.

---

## 📚 Tổng kết
- Git là hệ thống quản lý phiên bản phân tán (DVCS) cực nhanh, cho phép bạn sở hữu toàn bộ kho lưu trữ và lịch sử ngay trên máy cá nhân.
- `git status` là lệnh an toàn dùng để soi chiếu trạng thái tệp tin và định hướng bước đi tiếp theo trong dự án.
- Hãy biến việc gõ `git status` thành phản xạ tự nhiên của một kỹ sư phần mềm chuyên nghiệp trước khi thực hiện bất kỳ thao tác nào.

