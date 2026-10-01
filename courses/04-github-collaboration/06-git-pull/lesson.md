# Đồng bộ và gộp code với git pull

---

## 🎯 Mục tiêu
- Hiểu rõ công thức toán học bản chất của `git pull`: `git fetch` kết hợp với `git merge`.
- Sử dụng thành thạo câu lệnh `git pull` để kéo và tích hợp mã nguồn mới nhất từ GitHub.
- Hiểu sự khác biệt giữa hai chiến lược tích hợp: `git pull --ff-only` và `git pull --rebase`.
- Bình tĩnh xử lý khi gặp xung đột Merge Conflict phát sinh trong quá trình pull.

---

## 🧩 Từ khóa hôm nay

### git pull
- **Nói dễ hiểu**: Lệnh tải thay đổi từ remote và tích hợp chúng vào nhánh hiện tại. Cách tích hợp có thể tùy cấu hình Git.
- **Ví dụ**: `git pull origin main` để lấy toàn bộ commit mới của đồng nghiệp trên GitHub về máy.
- **Đừng nhầm**: Pull gồm bước fetch rồi bước tích hợp. Mặc định thường dùng merge, nhưng cấu hình có thể chọn rebase.

### fetch — lấy thông tin mới từ remote
- **Nói dễ hiểu**: Tải commit và cập nhật tham chiếu theo dõi từ remote mà chưa tích hợp vào nhánh hiện tại.
- **Ví dụ**: `git fetch origin` cập nhật dữ liệu từ `origin`; bạn có thể xem commit mới trước khi quyết định merge hoặc rebase.
- **Đừng nhầm**: Fetch đứng riêng không thay đổi nội dung nhánh hiện tại; `git pull` thực hiện fetch rồi thêm bước tích hợp.

### pull conflict
- **Nói dễ hiểu**: Xung đột xảy ra khi bạn và đồng nghiệp cùng sửa trên cùng một dòng code trong cùng một file.
- **Ví dụ**: Đồng nghiệp sửa hàm login trên server, bạn cũng sửa hàm login ở máy và chạy git pull.
- **Đừng nhầm**: Không phải lỗi làm hỏng dự án; Git chỉ dừng lại yêu cầu bạn xác nhận giữ phiên bản nào.

---

## 📖 Định nghĩa
`git pull <remote> <nhánh>` lấy thay đổi từ nhánh đã chỉ định rồi tích hợp vào nhánh hiện tại. Git fetch trước; kiểu tích hợp phụ thuộc tùy chọn và cấu hình. Với cấu hình merge thông thường, pull dùng merge; nếu cấu hình rebase thì hành vi khác. Nếu lịch sử phân kỳ, có thể phát sinh merge commit hoặc conflict.

---

## 💡 Tại sao cần
Khi làm việc nhóm, các thành viên liên tục đẩy code mới lên máy chủ chung. Lệnh `git pull` giúp bạn cập nhật tiến độ dự án mỗi ngày, đảm bảo bạn đang phát triển tính năng mới dựa trên phiên bản mới nhất và giảm thiểu nguy cơ xung đột lớn về sau.

---

## 🧠 Mental Model
Nếu `git fetch` là nhân viên bưu tá đặt kiện hàng vào hòm thư trước cổng, thì `git pull` là bạn tự ra mở hòm thư, mang gói hàng vào phòng khách và bày lên bàn làm việc. Nếu trong gói hàng có món đồ trùng vị trí trên bàn, bạn sẽ dừng lại sắp xếp cho ngăn nắp.

---

## 📊 Sơ đồ minh họa
```text
Luồng thường gặp khi cấu hình dùng merge:
┌────────────────────────────────────────────────────────┐
│                      git pull                          │
│  ┌───────────────────────┐   ┌───────────────────────┐  │
│  │ 1. fetch dữ liệu       │ + │ 2. tích hợp thay đổi   │  │
│  └───────────────────────┘   └───────────────────────┘  │
└────────────────────────────────────────────────────────┘
Kiểu tích hợp phụ thuộc tùy chọn và cấu hình Git.
```

---

## 🏢 Ví dụ thực tế
Nhánh local `main` đang ở C2, remote có thêm C3. Khi nhánh local chưa có commit riêng và cấu hình cho phép fast-forward, `git pull origin main` tải C3 rồi đưa `main` lên C3. Nếu hai bên cùng có commit mới, cần tích hợp lịch sử và có thể phải xử lý conflict.

---

## 💻 Command & Cú pháp
```bash
git pull
git pull origin <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git pull`: Kéo và gộp dữ liệu từ nhánh theo dõi mặc định trên remote vào nhánh hiện tại.
- `git pull origin <nhánh>`: Chỉ định cụ thể tên remote và tên nhánh cần kéo về gộp.

---

## ⚠️ Sai lầm phổ biến
1. **Pull khi Working Directory còn thay đổi dở dang**: Git có thể từ chối gộp đè lên file chưa commit; nên commit hoặc cất vào stash trước khi pull.
2. **Quên rằng pull là fetch cộng merge**: Dẫn đến bối rối khi thấy xuất hiện merge commit ngoài ý muốn hoặc gặp conflict.
3. **Kéo nhầm nhánh khác vào nhánh đang đứng**: Gõ `git pull origin develop` khi đang đứng ở `main` sẽ làm gộp mã nguồn develop vào main.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác kéo cập nhật từ remote và kiểm tra lịch sử commit.
1. Dùng một kho thử nghiệm có remote và nhánh `main`; chạy `git status` để kiểm tra nhánh hiện tại và thay đổi chưa commit.
2. Chạy `git fetch origin` để cập nhật thông tin remote trước. Nếu bạn không có remote thử nghiệm, hãy dừng ở bước này thay vì chạy lệnh lên kho công việc thật.
3. Chạy `git pull origin main`. Nếu remote không có commit mới, Git báo đã cập nhật; nếu có commit mới thì xem thông báo tích hợp.
4. Chạy `git log --oneline -n 5` và `git status` để kiểm tra kết quả.

---

## 💡 Hint & mẹo
> Trước khi pull, xem `git status` và xác nhận bạn đang ở đúng nhánh. Hãy theo cấu hình và quy trình của nhóm.

---

## ✅ Validation & Kết quả mong đợi
- Lịch sử commit trên nhánh cục bộ bắt kịp commit mới nhất trên remote.
- Nếu remote không có commit mới, nhánh không đổi. Nếu có thay đổi, lịch sử hoặc file phản ánh cách Git đã tích hợp chúng.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để kiểm tra hiểu biết về bản chất hai pha của git pull.

---

## 🚀 Thử thách nâng cao
Đọc `git help pull` để tìm các chế độ merge/rebase và tùy chọn fast-forward. Không đổi cấu hình `--global` trên máy dùng chung hoặc trước khi hiểu tác động tới mọi kho của bạn.

---

## 📝 Tổng kết
- `git pull` fetch thay đổi rồi tích hợp vào nhánh hiện tại.
- Cách tích hợp phụ thuộc tùy chọn và cấu hình; có thể phát sinh conflict.
- Kiểm tra nhánh và trạng thái trước khi pull; làm theo quy ước của nhóm.
