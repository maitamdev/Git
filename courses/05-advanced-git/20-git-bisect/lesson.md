# git bisect

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.
- Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.
- Hiểu rõ hiệu quả toán học: Tìm ra commit lỗi trong 1000 commit chỉ với khoảng 10 lần kiểm tra (O(log N)).
- Tự động hóa hoàn toàn quá trình tìm lỗi bằng câu lệnh `git bisect run <script-test>`.

---

## 📖 Định nghĩa
> `git bisect` là công cụ thám tử điều tra lỗi tự động đỉnh cao trong Git, hoạt động dựa trên thuật toán tìm kiếm nhị phân (Binary Search). Khi bạn biết mã nguồn hiện tại đang bị lỗi (bad) nhưng chắc chắn một phiên bản trong quá khứ từng chạy tốt (good), `git bisect` sẽ tự động chia đôi lịch sử, nhảy tới commit ở chính giữa để bạn kiểm tra, rồi tiếp tục thu hẹp phạm vi tìm kiếm theo cấp số nhân cho đến khi chỉ mặt điểm tên chính xác commit đầu tiên đã đưa lỗi vào hệ thống.

---

## 🤔 Tại sao cần?
Trong các dự án phát triển lâu năm với hàng ngàn commit, một ngày đẹp trời người dùng báo một chức năng bị lỗi mà không ai biết lỗi xuất hiện từ khi nào. Nếu bạn phải kiểm tra thủ công từng commit một (Linear Search), bạn sẽ mất nhiều ngày làm việc mệt mỏi. Với `git bisect`, dù dự án có 1.024 commit, thuật toán nhị phân giúp bạn tìm ra chính xác commit gây lỗi chỉ sau đúng 10 lần chạy thử (vì $2^{10} = 1024$), tiết kiệm 99% thời gian điều tra.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung trò chơi đoán số từ 1 đến 100. Người quản trò nghĩ ra một số bí mật (commit gây lỗi). Bạn không đoán lần lượt 1, 2, 3, 4 vì quá lâu. Bạn đoán ngay số 50. Người quản trò nói: "Lỗi xuất hiện sau số 50". Bạn lập tức loại bỏ 50 số đầu và đoán tiếp số 75. Người quản trò nói: "Lỗi xuất hiện trước số 75". Bạn thu hẹp phạm vi xuống còn giữa 50 và 75. Chỉ sau vài câu hỏi chia đôi khoảng cách, bạn chỉ ra chính xác con số bí mật.

---

## 🖼 Sơ đồ
```text
Quy trình tìm kiếm nhị phân của git bisect:
Mốc Good: C1 (Chạy tốt)                  Mốc Bad: C8 (Bị lỗi!)
Phạm vi ban đầu: C1 ──► C2 ──► C3 ──► C4 ──► C5 ──► C6 ──► C7 ──► C8

Bước 1: Git nhảy tới C4 ở giữa -> Bạn test thấy Good!
Phạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6 ──► C7 ──► C8(Bad)

Bước 2: Git nhảy tới C6 ở giữa -> Bạn test thấy Bad!
Phạm vi thu hẹp:                      C4(Good) ──► C5 ──► C6(Bad)

Bước 3: Git nhảy tới C5 -> Test thấy Bad!
KẾT LUẬN: C5 chính là commit đầu tiên gây ra lỗi!
```

---

## 🌎 Ví dụ thực tế
Chức năng xuất hóa đơn PDF bị hỏng trên môi trường production. Kỹ sư Bách biết rằng ở phiên bản phát hành `v1.2.0` cách đây 500 commit thì chức năng này vẫn chạy bình thường. Bách khởi động chế độ thám tử: gõ `git bisect start`, gõ `git bisect bad` (commit hiện tại lỗi), và `git bisect good v1.2.0`. Git lập tức thông báo: "Bisecting: 250 revisions left to test after this (roughly 8 steps)". Git checkout ra commit ở giữa. Bách chạy thử lệnh in PDF, nếu hỏng gõ `git bisect bad`, nếu chạy được gõ `git bisect good`. Đúng 8 bước sau, Git in ra màn hình: "commit 8a9b0c is the first bad commit" kèm tên tác giả và diff dòng code gây lỗi.

---

## 💻 Command
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
- `git bisect run <script>`: Tự động hóa 100%: Git sẽ tự động chạy file script kiểm thử và tự đánh dấu good/bad.

---

## ⚠️ Sai lầm phổ biến
1. **Quên gõ `git bisect reset` sau khi tìm thấy lỗi**:  Khiến bạn bị mắc kẹt ở trạng thái Detached HEAD trên commit lỗi.
2. **Đánh dấu nhầm commit good thành bad hoặc ngược lại**:  Làm sai lệch thuật toán tìm kiếm nhị phân dẫn đến kết luận sai.
3. **Kiểm tra mã nguồn mà chưa build hoặc chưa cài đặt dependencies khiến bài test báo lỗi giả.**: Kiểm tra mã nguồn mà chưa build hoặc chưa cài đặt dependencies khiến bài test báo lỗi giả.

---

## 🧪 Lab
1. Khởi động chế độ bisect bằng `git bisect start`.
2. Đánh dấu commit hiện tại là lỗi bằng `git bisect bad`.
3. Đánh dấu commit đầu tiên trong bài tập là tốt bằng `git bisect good HEAD~6`.
4. Quan sát Git tự động checkout về commit ở giữa.
5. Chạy thử nghiệm, gõ `git bisect good` hoặc `git bisect bad` tương ứng cho đến khi Git thông báo thủ phạm.
6. Gõ `git bisect reset` để hoàn tất bài tập.

---

## 💡 Hint
> Luôn nhớ chạy `git bisect reset` ngay sau khi đã xác định được commit gây lỗi để trở về nhánh làm việc.

---

## ✅ Validation
- Sử dụng thành thạo quy trình git bisect để tìm ra chính xác commit gây lỗi trong chuỗi lịch sử.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ thám tử git bisect.

---

## 🔥 Challenge
Làm thế nào để viết một script kiểm thử tự động trả về mã thoát exit code 0 (good) hoặc exit code khác 0 (bad) để chạy với `git bisect run`?

---

## 📚 Tổng kết
- `git bisect` sử dụng thuật toán tìm kiếm nhị phân để truy tìm commit gây lỗi với độ phức tạp O(log N).
- Quy trình gồm: `start` -> khai báo `bad` & `good` -> kiểm thử -> lặp lại -> `reset`.
- Có thể tự động hóa 100% bằng câu lệnh `git bisect run <script>`.
