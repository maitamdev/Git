# Cập nhật dữ liệu từ xa với git fetch

---

## 🎯 Mục tiêu
- Hiểu `git fetch` tải dữ liệu và cập nhật nhánh theo dõi từ xa mà không tích hợp vào nhánh hiện tại.
- Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).
- Phân biệt dữ liệu đã fetch với các file trong Working Directory và nhánh hiện tại.
- Sử dụng `git log` và `git diff` để kiểm tra mã nguồn mới tải về trước khi quyết định hợp nhất.

---

## 🧩 Từ khóa hôm nay

### git fetch
- **Nói dễ hiểu**: Lệnh tải về các commit và nhánh mới từ máy chủ về kho ngầm mà không làm thay đổi file đang soạn thảo.
- **Ví dụ**: `git fetch origin` để kiểm tra xem đồng nghiệp đã đẩy commit mới nào lên chưa.
- **Đừng nhầm**: Không gộp code vào nhánh bạn đang đứng; lệnh chỉ cập nhật nhánh theo dõi từ xa như `origin/main`.

### remote-tracking branch
- **Nói dễ hiểu**: Con trỏ nhánh cục bộ phản chiếu trạng thái gần nhất của nhánh tương ứng trên máy chủ từ xa.
- **Ví dụ**: `origin/main` là con trỏ cho biết nhánh `main` trên máy chủ `origin` đang đứng ở commit nào.
- **Đừng nhầm**: Bạn không thể trực tiếp gõ lệnh chuyển vào nhánh này để commit; Git tự động quản lý nó.

### behind commit
- **Nói dễ hiểu**: Theo thông tin Git đã fetch, nhánh local chưa có một số commit đang có trên nhánh được theo dõi.
- **Ví dụ**: `Your branch is behind 'origin/main' by 2 commits` nghĩa là ref `origin/main` ở lần fetch gần nhất đi trước local 2 commit.
- **Đừng nhầm**: Không có nghĩa là code của bạn bị lỗi; chỉ cần gộp (merge/pull) để đưa 2 commit đó vào nhánh cá nhân.

---

## 📖 Định nghĩa
`git fetch` liên hệ với remote và tải các object/ref cần thiết theo cấu hình fetch. Nó cập nhật remote-tracking refs như `origin/main`, nhưng không tích hợp các commit đó vào nhánh đang checkout.

---

## 💡 Tại sao cần
Trong làm việc nhóm, bạn không nên gộp ngay code của người khác vào không gian làm việc của mình khi chưa biết họ thay đổi gì. `git fetch` giúp bạn xem trước các thay đổi mới, đọc commit log và phân tích xung đột một cách an toàn trước khi tích hợp.

---

## 🧠 Mental Model
Hãy hình dung `git fetch` như nhân viên bưu tá đặt kiện hàng mới vào hòm thư trước cửa nhà bạn. Người giao hàng không tự mở cửa bước vào phòng khách hay xáo trộn bàn làm việc của bạn. Bạn có thể thong thả kiểm tra bưu kiện trong hòm thư rồi mới mang vào nhà.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế an toàn của git fetch:
Kho trên GitHub:              Máy tính của bạn (Local):
Commit C4 mới trên main ──► Tải về lưu vào: origin/main (C4)
                             Nhánh cục bộ:   main (vẫn ở C3)
                             Working Tree:   Hoàn toàn giữ nguyên!
```

---

## 🏢 Ví dụ thực tế
Lập trình viên Lan đang viết dở tính năng đặt hàng trên nhánh main tại commit C3. Lan chạy `git fetch origin` để kiểm tra cập nhật. Git tải về các commit mới và cập nhật con trỏ `origin/main` lên C4. Lan kiểm tra bằng `git log main..origin/main --oneline`, thấy đồng nghiệp chỉ sửa file cấu hình khác nên an tâm tiếp tục công việc mà không sợ xung đột.

---

## 💻 Command & Cú pháp
```bash
git fetch
git fetch origin
git log HEAD..origin/main --oneline
git diff HEAD..origin/main
```

---

## 🔍 Giải thích command
- `git fetch`: Tải về các thay đổi mới từ remote mặc định gắn với nhánh hiện tại.
- `git fetch origin`: Chỉ định rõ ràng tải về từ máy chủ remote mang tên origin.
- `git log HEAD..origin/main`: Liệt kê các commit mới trên server mà máy cục bộ của bạn chưa có.
- `git diff HEAD..origin/main`: So sánh chi tiết từng dòng code khác biệt giữa mã nguồn của bạn và mã nguồn trên server.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ chạy git fetch xong là file trong editor tự đổi**: Fetch chỉ tải dữ liệu về kho ngầm `.git`, cần gộp vào nhánh mới thấy thay đổi trong editor.
2. **Nhầm fetch với pull**: Fetch thông thường không cập nhật file đang checkout; nó vẫn có thể cập nhật dữ liệu Git và các remote-tracking refs.
3. **Bỏ qua bước so sánh diff trước khi gộp**: Không kiểm tra `git diff HEAD..origin/main` khiến bạn bị bất ngờ khi xảy ra xung đột mã nguồn.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tải dữ liệu từ remote và đối chiếu con trỏ theo dõi từ xa.
1. Đảm bảo kho có remote tên `origin` và nhánh theo dõi đã được thiết lập. Nếu đang dùng GitHub thật, remote phải trỏ tới kho bạn có quyền đọc; simulator dùng remote giả lập.
2. Chạy `git fetch origin`. Nếu remote chưa có commit hoặc chưa thay đổi, không có nhánh nào mới là kết quả bình thường.
3. Nếu `origin/main` tồn tại, chạy `git log origin/main --oneline -n 5` để xem lịch sử mà lần fetch vừa ghi nhận.
4. Chạy `git status`. ahead/behind được tính so với remote-tracking ref gần nhất, không phải trạng thái trực tiếp của máy chủ.

---

## 💡 Hint & mẹo
> Ghi nhớ: `git fetch` tải dữ liệu và cập nhật remote-tracking refs; bạn vẫn tự chọn thời điểm tích hợp.

---

## ✅ Validation & Kết quả mong đợi
- Các remote-tracking refs được cập nhật theo phản hồi lần fetch này.
- Fetch không tích hợp commit vào nhánh đang checkout; sau đó bạn có thể xem diff trước khi merge.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố hiểu biết về cơ chế hoạt động của git fetch.

---

## 🚀 Thử thách nâng cao
Nếu `origin/main` tồn tại, dùng `git diff HEAD..origin/main` để xem khác biệt so với nhánh hiện tại. Lệnh chỉ xem; chưa merge các thay đổi.

---

## 📝 Tổng kết
- `git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ.
- Chỉ cập nhật nhánh theo dõi từ xa `origin/main`, không chạm vào Working Directory.
- Là bước tải về hữu ích trước khi xem lịch sử hoặc diff rồi chọn cách tích hợp.
