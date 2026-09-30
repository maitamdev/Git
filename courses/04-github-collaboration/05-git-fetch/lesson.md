# Cập nhật dữ liệu từ xa với git fetch

---

## 🎯 Mục tiêu
- Hiểu rõ cơ chế hoạt động an toàn tuyệt đối của câu lệnh `git fetch`.
- Phân biệt rõ ràng giữa nhánh theo dõi từ xa (Remote-tracking branch `origin/main`) và nhánh cục bộ (`main`).
- Nắm bắt lý do vì sao `git fetch` không bao giờ làm thay đổi hay ghi đè lên Working Directory của bạn.
- Sử dụng `git log` và `git diff` để kiểm tra mã nguồn mới tải về trước khi quyết định hợp nhất.

---

## 📖 Định nghĩa
> `git fetch` là câu lệnh đồng bộ an toàn của Git, có nhiệm vụ liên hệ với kho lưu trữ từ xa trên mạng, kiểm tra xem có những commit, nhánh hoặc thẻ tag mới nào mà máy cục bộ chưa có hay không, rồi tải toàn bộ dữ liệu mới đó về lưu trữ trong cơ sở dữ liệu của bạn. Điểm đặc biệt quan trọng nhất: `git fetch` chỉ cập nhật các con trỏ nhánh theo dõi từ xa (Remote-tracking branches như `origin/main`) mà KHÔNG BAO GIỜ tự ý gộp code hay chạm vào các tệp tin trong Working Directory của bạn.

---

## 🤔 Tại sao cần?
Trong môi trường làm việc nhóm chuyên nghiệp, bạn không bao giờ nên mù quáng gộp code của người khác vào không gian làm việc của mình khi chưa biết họ đã thay đổi những gì. `git fetch` cho phép bạn xem trước những gì đồng nghiệp vừa đưa lên máy chủ: bạn có thể đọc diff, xem log và đánh giá nguy cơ xung đột một cách hoàn toàn an toàn và chủ động trước khi đưa ra quyết định hợp nhất.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git fetch` giống như nhân viên bưu tá giao các kiện hàng mới của đồng nghiệp gửi về để vào chiếc hộp thư trước cửa nhà bạn (cập nhật Remote-tracking branches). Bưu tá chỉ đặt kiện hàng vào hộp thư an toàn chứ không tự ý mở cửa bước vào phòng khách của bạn và không tự ý xáo trộn đồ đạc trên bàn làm việc của bạn (Working Directory giữ nguyên 100%). Bạn có thể ra mở hộp thư ngắm nghía kiện hàng trước khi quyết định mang vào nhà.

---

## 🖼 Sơ đồ
```text
Cơ chế an toàn của git fetch:
Kho trên GitHub:              Máy tính của bạn (Local):
Commit C4 mới trên main ──► Tải về lưu vào: origin/main (C4)
                             Nhánh cục bộ:   main (vẫn ở C3)
                             Working Tree:   Hoàn toàn giữ nguyên!
```

---

## 🌎 Ví dụ thực tế
Lập trình viên Lan đang viết dở tính năng đặt hàng trên nhánh main tại commit C3. Lan muốn biết đồng nghiệp Hùng có đưa bản sửa lỗi thanh toán nào lên server hay chưa. Lan chạy câu lệnh: `git fetch origin`. Git thông báo đã tải về các đối tượng mới và cập nhật con trỏ `origin/main` lên commit C4. Lan chạy lệnh `git log main..origin/main --oneline` để đọc qua thông điệp commit của Hùng. Thấy Hùng sửa ở một module hoàn toàn khác, Lan yên tâm tiếp tục công việc của mình mà không sợ bị xung đột hay mất mát dữ liệu đang soạn thảo.

---

## 💻 Command
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
1. **Tưởng chạy git fetch xong là code trong editor sẽ tự cập nhật**:  Fetch chỉ tải về cơ sở dữ liệu ngầm, bạn phải merge thì code mới vào Working Tree.
2. **Sợ hãi git fetch sẽ làm mất code đang gõ dở**:  Fetch là lệnh an toàn nhất trong Git, không bao giờ ghi đè lên file đang sửa.
3. **Quên kiểm tra diff trước khi merge**:  Bỏ lỡ cơ hội đánh giá xung đột tiềm ẩn.

---

## 🧪 Lab
1. Chạy lệnh `git fetch origin` để đồng bộ dữ liệu mới nhất từ remote.
2. Quan sát thông báo cập nhật các nhánh `origin/*`.
3. Sử dụng lệnh `git log origin/main --oneline -n 5` để xem các commit mới trên remote.
4. Chạy `git status` để kiểm tra thông báo nhánh của bạn đang bị tụt lại (behind) bao nhiêu commit.

---

## 💡 Hint
> Nhớ nguyên tắc: `git fetch` = Tải dữ liệu về nhưng chưa gộp; an toàn tuyệt đối 100%.

---

## ✅ Validation
- Cập nhật thành công nhánh remote-tracking mà không làm thay đổi Working Directory.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về cơ chế an toàn của git fetch.

---

## 🔥 Challenge
Nêu sự khác biệt giữa hai con trỏ `main` và `origin/main` sau khi chạy lệnh `git fetch`.

---

## 📚 Tổng kết
- `git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ.
- Chỉ cập nhật nhánh theo dõi từ xa `origin/main`, không chạm vào Working Directory.
- Là thao tác an toàn tuyệt đối để xem trước thay đổi trước khi quyết định tích hợp.
