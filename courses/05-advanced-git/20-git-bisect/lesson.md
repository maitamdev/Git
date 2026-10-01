# git bisect

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.
- Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.
- Hiểu vì sao khoảng 1.000 commit có thể cần gần 10 lần kiểm tra khi lỗi nằm trong một khoảng liên tục và mỗi lần kiểm tra cho kết quả tin cậy.
- Biết `git bisect run <script-test>` có thể tự động đánh dấu kết quả nếu script trả mã thoát đúng; lệnh này cần Git thật và không được mô phỏng trong khóa học.

---

## 🧩 Từ khóa hôm nay

### Git Bisect
- **Nói dễ hiểu**: Công cụ giúp thu hẹp commit đầu tiên gây lỗi bằng cách chia đôi lịch sử và kiểm tra từng phiên bản.
- **Ví dụ**: Dùng `git bisect start`, đánh dấu `git bisect bad` và `git bisect good v1.0` để Git tự nhảy đến commit ở giữa.
- **Đừng nhầm**: Bisect không tự sửa lỗi. Kết quả đáng tin khi mốc good/bad đúng và lỗi xuất hiện một lần theo thứ tự lịch sử trong khoảng đã chọn.

### Good / Bad Commit
- **Nói dễ hiểu**: Hai mốc đánh dấu trạng thái của mã nguồn: `good` là phiên bản còn chạy chuẩn, `bad` là phiên bản đã phát sinh lỗi.
- **Ví dụ**: Đánh dấu `git bisect good` khi thấy tính năng in hóa đơn ở commit hiện tại vẫn hoạt động tốt.
- **Đừng nhầm**: Nhớ gắn nhãn chính xác; nếu bạn đánh dấu nhầm good/bad thì Git sẽ bị điều hướng sang khoảng tìm kiếm sai.

### Bisect Reset (git bisect reset)
- **Nói dễ hiểu**: Lệnh kết thúc phiên điều tra bisect và đưa con trỏ HEAD quay trở về nhánh làm việc ban đầu.
- **Ví dụ**: Gõ `git bisect reset` ngay sau khi Git in ra thông báo commit thủ phạm gây lỗi.
- **Đừng nhầm**: Trong lúc bisect, Git thường checkout các commit đang kiểm tra. `git bisect reset` kết thúc phiên và đưa HEAD về vị trí trước đó.

---

## 📖 Định nghĩa
`git bisect` tìm commit đầu tiên làm xuất hiện một lỗi bằng cách chọn commit ở giữa khoảng thời gian từ mốc tốt đến mốc hỏng. Bạn kiểm tra phiên bản đó rồi đánh dấu `good` hoặc `bad`; quá trình hiệu quả khi tình trạng lỗi có thể kiểm tra nhất quán và chuyển từ tốt sang hỏng một lần trong khoảng đã chọn.

---

## 💡 Tại sao cần
Trong kho mã nguồn có hàng ngàn commit, kiểm tra tuần tự từng commit mất nhiều ngày. Với `git bisect`, 1.000 commit chỉ cần tối đa khoảng 10 lần chạy thử ($2^{10} = 1024$), giúp bạn tiết kiệm đến 99% thời gian điều tra lỗi phát sinh.

---

## 🧠 Mental Model
Hãy hình dung trò đoán số từ 1 đến 100. Thay vì đoán từng số 1, 2, 3, bạn đoán ngay số 50. Người quản trò nói lỗi ở sau 50, bạn lập tức bỏ 50 số đầu và đoán tiếp 75. Chỉ sau vài bước chia đôi, bạn tìm ra chính xác số bí mật.

---

## 📊 Sơ đồ minh họa
```text
Quy trình tìm kiếm nhị phân của git bisect:
Mốc Good: C1 (Chạy tốt)                  Mốc Bad: C8 (Bị lỗi!)
Phạm vi ban đầu: C1 ──► C2 ──► C3 ──► C4 ──► C5 ──► C6 ──► C7 ──► C8

Bước 1: Git nhảy tới C4 ở giữa -> Test thấy Good!
Phạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6 ──► C7 ──► C8(Bad)

Bước 2: Git nhảy tới C6 ở giữa -> Test thấy Bad!
Phạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6(Bad)

Bước 3: Git nhảy tới C5 -> Test thấy Bad!
KẾT LUẬN: C5 chính là commit đầu tiên gây ra lỗi!
```

---

## 🏢 Ví dụ thực tế
Hệ thống xuất hóa đơn bị lỗi trên production. Kỹ sư Bách biết tag `v1.2.0` vẫn tốt còn `HEAD` bị lỗi. Bách dùng `git bisect start`, đánh dấu hai mốc, rồi kiểm tra từng commit Git chọn. Với khoảng 500 commit, trong trường hợp lý tưởng cần khoảng 9 lượt kiểm tra; sau cùng Bách xác nhận hash và diff của commit đầu tiên bị lỗi.

---

## 💻 Command & Cú pháp
```bash
git bisect start
git bisect bad
git bisect good <commit-hoặc-tag>
git bisect reset
git bisect run <file-chay-kiem-thu>
```

---

## 🔍 Giải thích command
- `git bisect start`: Khởi động phiên làm việc tìm kiếm nhị phân của bisect.
- `git bisect bad`: Đánh dấu commit hiện tại là commit bị lỗi.
- `git bisect good <hash/tag>`: Đánh dấu commit trong quá khứ là mốc hoạt động bình thường không có lỗi.
- `git bisect reset`: Kết thúc phiên điều tra và đưa bạn quay trở về nhánh ban đầu.
- `git bisect run <script>`: Trong Git thật, chạy script ở từng commit và đọc mã thoát để đánh dấu good/bad; dùng test ổn định và bảo đảm script chạy được ở các phiên bản cũ.

---

## ⚠️ Sai lầm phổ biến
1. **Quên kết thúc phiên bisect**: Sau khi tìm được commit, chạy `git bisect reset` để quay về vị trí trước phiên điều tra.
2. **Đánh dấu nhầm good thành bad**: Làm sai lệch thuật toán nhị phân khiến Git nhảy sang phân vùng tìm kiếm hoàn toàn sai.
3. **Chưa build dependencies**: Quên cài thư viện hoặc build code khiến bài test báo lỗi giả mạo không phải do commit gây ra.

---

## 🧪 Lab thực hành
Làm trong kho thử nghiệm riêng có ít nhất một commit nền và sáu commit sau đó. Trong ví dụ này lỗi bắt đầu ở commit thứ ba sau nền.
1. Tạo commit nền có `probe.txt` chứa `GOOD`.
2. Tạo commit 1 và 2 bằng cách thêm `note1.txt`, `note2.txt`; commit 3 đổi `probe.txt` thành `BAD`; tạo commit 4, 5, 6 bằng cách thêm `note3.txt`, `note4.txt`, `note5.txt`.
3. Chạy `git bisect start`, rồi `git bisect bad` để đánh dấu tip hiện tại là lỗi.
4. Chạy `git bisect good HEAD~6` để đánh dấu commit nền tốt. Mở `probe.txt` tại từng commit Git checkout và đánh dấu `git bisect good` hoặc `git bisect bad` theo nội dung.
5. Lặp lại cho đến khi Git in `is the first bad commit`; xác nhận commit đó chính là commit đổi `probe.txt` thành `BAD`.
6. Chạy `git bisect reset` và xác nhận `git status` cùng nhánh hiện tại trở về trước phiên tìm kiếm.

---

## 💡 Hint & mẹo
> Khi kết thúc điều tra, chạy `git bisect reset` để rời commit đang kiểm tra và trở về vị trí trước phiên bisect.

---

## ✅ Validation & Kết quả mong đợi
- Tìm được commit đầu tiên có nội dung `BAD` trong ví dụ và xác nhận bằng thông điệp commit.
- Kết thúc phiên bằng `git bisect reset`; chỉ thử `git bisect run` trong Git thật với script trả kết quả tin cậy.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ thám tử git bisect.

---

## 🚀 Thử thách nâng cao
Viết một đoạn script bash ngắn kiểm tra mã thoát (exit code) để chạy tự động với `git bisect run ./test.sh`.

---

## 📝 Tổng kết
- `git bisect` dùng tìm kiếm nhị phân, cần khoảng $O(\log N)$ lần kiểm tra trong trường hợp đơn giản và có mốc good/bad đáng tin.
- Quy trình: `git bisect start` -> `bad` / `good` -> kiểm tra lặp lại -> `git bisect reset`.
- Git thật có thể chạy kiểm thử tự động bằng `git bisect run <script>`; script phải trả đúng mã thoát.
