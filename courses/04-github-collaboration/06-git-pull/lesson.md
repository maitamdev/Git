# Đồng bộ và gộp code với git pull

---

## 🎯 Mục tiêu
- Thấu suốt bản chất toán học của `git pull`: phép kết hợp giữa `git fetch` và thao tác tích hợp (`git merge`).
- Vận dụng chuẩn xác lệnh `git pull` để đồng bộ các commit mới nhất từ máy chủ GitHub về thư mục làm việc.
- Phân biệt các kịch bản hợp nhất phổ biến: Fast-Forward, tạo Merge Commit tự động và xử lý xung đột (Merge Conflict).
- Nắm vững các lưu ý an toàn trước khi thực thi lệnh pull để tránh làm xáo trộn các tệp đang sửa đổi dở dang.

---

## 🧩 Từ khóa hôm nay

### git pull
- **Nói dễ hiểu:** Câu lệnh kéo toàn bộ các commit mới nhất từ GitHub về máy và tự động gộp thẳng vào nhánh bạn đang mở.
- **Ví dụ:** Lệnh `git pull origin main` giúp đưa toàn bộ thay đổi mới của đồng đội vào mã nguồn trên máy bạn.
- **Đừng nhầm:** `git pull` không phải thao tác một bước đơn lẻ; nó luôn chạy `fetch` trước rồi mới tiến hành `merge`.

### fetch + merge — công thức hai pha
- **Nói dễ hiểu:** Bản chất cơ chế vận hành ngầm của `git pull`: bước một tải dữ liệu về kho, bước hai hợp nhất vào nhánh hiện tại.
- **Ví dụ:** Chạy `git pull` tương đương việc bạn gõ tuần tự hai lệnh `git fetch origin` rồi `git merge origin/main`.
- **Đừng nhầm:** Vì có pha merge nên `git pull` hoàn toàn có thể gây ra xung đột (conflict) nếu code trên máy trùng dòng sửa với server.

### fast-forward pull
- **Nói dễ hiểu:** Trường hợp kéo code thuận lợi nhất khi nhánh cục bộ của bạn chưa có commit mới nào so với máy chủ.
- **Ví dụ:** Máy chủ có thêm 3 commit trong khi máy bạn đứng yên, Git chỉ việc dịch chuyển con trỏ nhánh bạn tiến về trước 3 bước.
- **Đừng nhầm:** Tình huống này diễn ra êm đẹp không sinh ra commit gộp thừa; nếu cả hai bên đều có commit mới, Git bắt buộc phải tạo merge commit hoặc rebase.

---

## 📖 Định nghĩa
`git pull` là câu lệnh đồng bộ hai pha trong Git, tự động thực hiện tải dữ liệu mới từ máy chủ từ xa về máy tính (`fetch`) và ngay lập tức tích hợp (thông thường bằng `merge` hoặc `rebase`) vào nhánh cục bộ bạn đang làm việc, giúp mã nguồn tại thư mục làm việc bắt kịp phiên bản mới nhất.

---

## 🤔 Tại sao cần?
Khi phát triển phần mềm trong một nhóm nhiều người, mã nguồn trên GitHub liên tục được cập nhật từ các đồng nghiệp. Nếu bạn không thường xuyên kéo code mới về, bạn sẽ bị tụt hậu và đối mặt với những xung đột mã nguồn khổng lồ khi bàn giao tính năng. Lệnh `git pull` giữ cho dòng chảy phát triển của bạn luôn nhịp nhàng và ăn khớp với tiến độ chung của toàn đội ngũ.

---

## 🧠 Mental Model (Mô hình tư duy)
Nếu `git fetch` giống như người giao hàng đặt thùng bưu kiện mới vào hòm thư ngoài cổng, thì `git pull` chính là việc bạn chủ động ra mở hòm thư, ôm thùng hàng vào phòng làm việc và lập tức sắp xếp bày biện lên bàn. Nếu có món đồ trùng vị trí trên bàn, bạn sẽ cần sắp đặt lại cho gọn gàng.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ HAI PHA NẰM SAU CÂU LỆNH GIT PULL:

┌────────────────────────────────────────────────────────┐
│                        git pull                        │
│   ┌────────────────────────┐    ┌──────────────────┐   │
│   │ Pha 1: git fetch       │ ──►│ Pha 2: git merge │   │
│   │ (Tải commit từ server) │    │ (Gộp vào nhánh)  │   │
│   └────────────────────────┘    └──────────────────┘   │
└────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Đầu giờ sáng thứ Hai, bạn mở máy tính để tiếp tục làm việc trên nhánh `main`. Trong dịp cuối tuần, hai đồng đội đã hoàn thành chức năng thanh toán và gộp vào nhánh chính trên GitHub. Bạn chỉ cần gõ nhẹ lệnh `git pull origin main`. Git tải 4 commit mới về và tự động di chuyển con trỏ nhánh `main` trên máy bạn bắt kịp đồng đội trong 3 giây.

---

## 💻 Command
```bash
git pull
git pull origin main
git pull --ff-only
```

---

## 🔍 Giải thích command
- `git pull`: Kéo và tự động hợp nhất các commit mới từ remote và nhánh upstream tương ứng đã cấu hình.
- `git pull origin main`: Chỉ định đích danh máy chủ remote là `origin` và nhánh nguồn cần kéo về là `main`.
- `git pull --ff-only`: Chỉ cho phép pull nếu nhánh có thể tiến nhanh (fast-forward); từ chối tạo commit gộp nếu có phân kỳ lịch sử.

---

## ⚠️ Sai lầm phổ biến
1. **Pull khi thư mục làm việc đang có file sửa dở chưa commit**: Git sẽ từ chối gộp đè lên tệp chưa lưu; bạn cần commit hoặc cất vào `git stash` trước khi pull.
2. **Kéo nhầm nhánh trên remote vào nhánh cục bộ khác**: Đang đứng ở nhánh `feature` lại gõ `git pull origin main` khiến mã nguồn bị hòa lẫn không mong muốn.
3. **Hoảng loạn khi gặp xung đột (Merge Conflict) lúc pull**: Nghĩ rằng code bị hỏng; thực chất bạn chỉ cần mở tệp xung đột lên, chọn giữ lại đoạn code đúng và tạo commit hoàn tất.

---

## 🧪 Lab
1. Chạy `git status` để bảo đảm thư mục làm việc hoàn toàn sạch sẽ, không có tệp nào sửa dở chưa commit.
2. Kiểm tra thông tin các remote đang kết nối bằng lệnh: `git remote -v`.
3. Chạy lệnh đồng bộ: `git pull origin main` để kéo những cập nhật mới nhất từ máy chủ GitHub về máy.
4. Xem lại lịch sử các commit vừa được gộp vào dự án bằng lệnh: `git log --oneline -n 5`.

---

## 💡 Hint
> Một thói quen vàng của các kỹ sư cấp cao: luôn chạy `git status` trước khi `git pull`. Đảm bảo không gian làm việc của bạn gọn gàng sẽ giúp quá trình hợp nhất mã nguồn diễn ra thuận lợi 100% mà không bị lỗi tệp xung đột dở dang cản trở.

---

## ✅ Validation
- Nhận thức thấu đáo công thức hai pha: `git pull = fetch + merge`.
- Thực hiện thành công thao tác kéo và cập nhật mã nguồn bằng `git pull` trên nhánh làm việc.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về cách thức vận hành và xử lý tình huống khi dùng lệnh `git pull`.

---

## 🔥 Challenge
Tìm hiểu về tùy chọn `git pull --rebase`. Trong hoàn cảnh nào thì các nhóm phát triển phần mềm doanh nghiệp ưu tiên sử dụng `git pull --rebase` thay vì lệnh `git pull` mặc định sử dụng cơ chế merge commit?

---

## 📚 Tổng kết
- `git pull` là câu lệnh tiện lợi kết hợp giữa tải dữ liệu (`fetch`) và hợp nhất (`merge`).
- Giúp thư mục làm việc của bạn lập tức đồng bộ hóa với tiến độ phát triển của nhóm trên GitHub.
- Luôn giữ không gian làm việc sạch sẽ trước khi thực hiện pull để giảm thiểu nguy cơ lỗi xung đột.
