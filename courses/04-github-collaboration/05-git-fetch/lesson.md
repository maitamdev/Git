# Cập nhật dữ liệu từ xa với git fetch

---

## 🎯 Mục tiêu
- Hiểu rõ cơ chế hoạt động an toàn tuyệt đối của câu lệnh `git fetch`.
- Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).
- Nắm bắt lý do vì sao `git fetch` không bao giờ làm thay đổi hay ghi đè lên Working Directory của bạn.
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
- **Nói dễ hiểu**: Trạng thái nhánh cục bộ của bạn đang bị thiếu các commit mà trên máy chủ đã có.
- **Ví dụ**: `Your branch is behind 'origin/main' by 2 commits` nghĩa là server đang có 2 commit mới hơn máy bạn.
- **Đừng nhầm**: Không có nghĩa là code của bạn bị lỗi; chỉ cần gộp (merge/pull) để đưa 2 commit đó vào nhánh cá nhân.

---

## 📖 Định nghĩa
`git fetch` là câu lệnh đồng bộ an toàn của Git, có nhiệm vụ liên hệ với kho từ xa và tải về toàn bộ các commit, nhánh mới mà máy cục bộ chưa có. Điểm then chốt: `git fetch` chỉ cập nhật các con trỏ nhánh theo dõi từ xa (như `origin/main`) mà không bao giờ tự ý sửa đổi file trong Working Directory.

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
git fetch --all
git log HEAD..origin/main --oneline
git diff HEAD..origin/main
```

---

## 🔍 Giải thích command
- `git fetch`: Tải về các thay đổi mới từ remote mặc định gắn với nhánh hiện tại.
- `git fetch origin`: Chỉ định rõ ràng tải về từ máy chủ remote mang tên origin.
- `git fetch --all`: Tải về dữ liệu mới từ tất cả các remote đang được cấu hình trong dự án.
- `git log HEAD..origin/main`: Liệt kê các commit mới trên server mà máy cục bộ của bạn chưa có.
- `git diff HEAD..origin/main`: So sánh chi tiết từng dòng code khác biệt giữa mã nguồn của bạn và mã nguồn trên server.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ chạy git fetch xong là file trong editor tự đổi**: Fetch chỉ tải dữ liệu về kho ngầm `.git`, cần gộp vào nhánh mới thấy thay đổi trong editor.
2. **Lo sợ git fetch làm mất code đang sửa**: Fetch không bao giờ ghi đè lên Working Directory, hoàn toàn an toàn khi đang code dở.
3. **Bỏ qua bước so sánh diff trước khi gộp**: Không kiểm tra `git diff HEAD..origin/main` khiến bạn bị bất ngờ khi xảy ra xung đột mã nguồn.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tải dữ liệu từ remote và đối chiếu con trỏ theo dõi từ xa.
1. Chạy lệnh `git fetch origin` để đồng bộ dữ liệu mới nhất từ remote.
2. Quan sát thông báo cập nhật các nhánh `origin/*`.
3. Dùng lệnh `git log origin/main --oneline -n 5` để xem các commit mới nhất trên server.
4. Chạy `git status` để xem thông tin nhánh của bạn đang behind bao nhiêu commit so với remote.

---

## 💡 Hint & mẹo
> Ghi nhớ quy tắc: `git fetch` = Tải dữ liệu về kho nhưng chưa gộp; an toàn tuyệt đối 100%.

---

## ✅ Validation & Kết quả mong đợi
- Nhánh `origin/main` trỏ tới commit mới nhất trên remote.
- Toàn bộ file và thay đổi chưa commit trong Working Directory được giữ nguyên vẹn.

---

## ❓ Quiz nhanh
Hãy hoàn thành các câu hỏi trắc nghiệm dưới đây để củng cố hiểu biết về cơ chế hoạt động của git fetch.

---

## 🚀 Thử thách nâng cao
Sử dụng câu lệnh `git diff HEAD..origin/main` để xem chi tiết từng dòng code sắp được tích hợp vào dự án của bạn.

---

## 📝 Tổng kết
- `git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ.
- Chỉ cập nhật nhánh theo dõi từ xa `origin/main`, không chạm vào Working Directory.
- Là thao tác an toàn tuyệt đối để xem trước thay đổi trước khi quyết định tích hợp.
