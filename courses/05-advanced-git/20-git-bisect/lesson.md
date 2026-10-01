# git bisect

---

## 🎯 Mục tiêu
- Nắm vững nguyên lý tìm kiếm nhị phân (Binary Search) được áp dụng trong câu lệnh `git bisect`.
- Vận hành quy trình 4 bước truy tìm thủ phạm gây lỗi: `start` -> đánh dấu `bad`/`good` -> thử nghiệm -> `reset`.
- Hiểu rõ hiệu quả toán học: Tìm ra commit lỗi trong 1000 commit chỉ với khoảng 10 lần kiểm tra (O(log N)).
- Tự động hóa hoàn toàn quá trình tìm lỗi bằng câu lệnh `git bisect run <script-test>`.

---

## 🧩 Từ khóa hôm nay

### Git Bisect
- **Nói dễ hiểu**: Công cụ điều tra tự động giúp tìm ra commit đầu tiên gây lỗi bằng thuật toán tìm kiếm nhị phân chia đôi lịch sử.
- **Ví dụ**: Dùng `git bisect start`, đánh dấu `git bisect bad` và `git bisect good v1.0` để Git tự nhảy đến commit ở giữa.
- **Đừng nhầm**: Git bisect không tự sửa lỗi code, nó chỉ tìm ra chính xác commit nào là nguyên nhân gây ra lỗi.

### Good / Bad Commit
- **Nói dễ hiểu**: Hai mốc đánh dấu trạng thái của mã nguồn: `good` là phiên bản còn chạy chuẩn, `bad` là phiên bản đã phát sinh lỗi.
- **Ví dụ**: Đánh dấu `git bisect good` khi thấy tính năng in hóa đơn ở commit hiện tại vẫn hoạt động tốt.
- **Đừng nhầm**: Nhớ gắn nhãn chính xác; nếu bạn đánh dấu nhầm good/bad thì Git sẽ bị điều hướng sang khoảng tìm kiếm sai.

### Bisect Reset (git bisect reset)
- **Nói dễ hiểu**: Lệnh kết thúc phiên điều tra bisect và đưa con trỏ HEAD quay trở về nhánh làm việc ban đầu.
- **Ví dụ**: Gõ `git bisect reset` ngay sau khi Git in ra thông báo commit thủ phạm gây lỗi.
- **Đừng nhầm**: Nếu quên reset, bạn sẽ tiếp tục bị mắc kẹt ở trạng thái Detached HEAD trên commit lỗi.

---

## 📖 Định nghĩa
`git bisect` là công cụ điều tra lỗi trong Git hoạt động theo thuật toán tìm kiếm nhị phân (Binary Search). Bằng cách đánh dấu mốc tốt và mốc hỏng, Git liên tục chia đôi khoảng cách commit để tìm ra chính xác commit đầu tiên đưa lỗi vào hệ thống.

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
Hệ thống xuất hóa đơn bị lỗi trên production. Kỹ sư Bách biết ở tag `v1.2.0` cách đây 500 commit code vẫn chạy tốt. Bách dùng `git bisect start`, gõ `bad` cho HEAD và `good v1.2.0`. Đúng 8 lần kiểm tra nhị phân, Git chỉ mặt điểm tên commit gây lỗi kèm tên tác giả và diff code.

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
- `git bisect run <script>`: Tự động hóa 100%: Git sẽ tự động chạy file script kiểm thử và tự đánh dấu good/bad.

---

## ⚠️ Sai lầm phổ biến
1. **Quên gõ `git bisect reset`**: Khiến bạn bị mắc kẹt ở trạng thái Detached HEAD trên commit lỗi sau khi điều tra xong.
2. **Đánh dấu nhầm good thành bad**: Làm sai lệch thuật toán nhị phân khiến Git nhảy sang phân vùng tìm kiếm hoàn toàn sai.
3. **Chưa build dependencies**: Quên cài thư viện hoặc build code khiến bài test báo lỗi giả mạo không phải do commit gây ra.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Khởi động chế độ bisect bằng `git bisect start`.
2. Đánh dấu commit hiện tại là lỗi bằng `git bisect bad`.
3. Đánh dấu commit tốt trong quá khứ bằng `git bisect good HEAD~6`.
4. Quan sát Git tự động checkout về commit ở giữa.
5. Chạy thử nghiệm, gõ `git bisect good` hoặc `git bisect bad` tương ứng cho đến khi Git thông báo thủ phạm.
6. Gõ `git bisect reset` để hoàn tất bài tập và quay về nhánh chính.

---

## 💡 Hint & mẹo
> Luôn nhớ chạy `git bisect reset` ngay sau khi đã xác định được commit gây lỗi để đưa con trỏ HEAD trở về nhánh làm việc an toàn.

---

## ✅ Validation & Kết quả mong đợi
- Sử dụng thành thạo quy trình `git bisect` để tìm ra chính xác commit gây lỗi trong chuỗi lịch sử.
- Nắm vững cách kết hợp với test script bằng `git bisect run` để tự động hóa toàn bộ quá trình.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ thám tử git bisect.

---

## 🚀 Thử thách nâng cao
Viết một đoạn script bash ngắn kiểm tra mã thoát (exit code) để chạy tự động với `git bisect run ./test.sh`.

---

## 📝 Tổng kết
- `git bisect` áp dụng tìm kiếm nhị phân $O(\log N)$ để truy tìm lỗi cực nhanh.
- Quy trình: `git bisect start` -> `bad` / `good` -> kiểm tra lặp lại -> `git bisect reset`.
- Có thể tự động hóa hoàn toàn với `git bisect run <script>`.
