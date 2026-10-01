# Bản chất của Merge commit

---

## 🎯 Mục tiêu
- Hiểu rõ cấu trúc của một Merge Commit có từ hai commit cha trở lên trong Git.
- Giải thích ý nghĩa của việc lưu giữ mốc gộp nhánh để theo dõi lịch sử làm việc nhóm.
- Sử dụng các cờ `--merges` và `--no-merges` để lọc nhật ký commit theo nhu cầu.

---

## 🧩 Từ khóa hôm nay

### Merge Commit — commit hợp nhất
- **Nói dễ hiểu:** Mốc lưu đặc biệt ghi lại thời điểm hai nhánh độc lập được kết nối và gộp lại với nhau.
- **Ví dụ:** Commit có thông điệp `Merge branch 'feature-pay' into main` với hai commit cha nối vào.
- **Đừng nhầm:** Commit thông thường chỉ có đúng 1 cha đứng trước; Merge Commit có từ 2 commit cha trở lên.

### Parent Commit — commit cha
- **Nói dễ hiểu:** Commit đứng ngay phía trước mà commit hiện tại kế thừa trực tiếp toàn bộ dữ liệu.
- **Ví dụ:** Trong một merge commit, Parent 1 là đỉnh của nhánh đích (`main`), Parent 2 là đỉnh của nhánh tính năng.
- **Đừng nhầm:** Git không xóa commit cha sau khi gộp; toàn bộ lịch sử của cả hai nhánh vẫn nằm nguyên vẹn.

### --no-merges — lọc bỏ commit gộp
- **Nói dễ hiểu:** Tùy chọn của `git log` chỉ hiển thị các commit viết code thực tế, bỏ qua các mốc gộp nhánh.
- **Ví dụ:** Chạy `git log --no-merges --oneline` để duyệt các thay đổi nội dung mà không bị rối mắt.
- **Đừng nhầm:** Cờ này chỉ ẩn bớt khi xem danh sách; nó không xóa hay thay đổi bất kỳ dữ liệu nào trong kho chứa.

---

## 📖 Định nghĩa
Merge Commit là một đối tượng commit đặc biệt trong đồ thị Git sở hữu từ hai commit cha trở lên. Trong khi commit thông thường chỉ nối vào một commit duy nhất phía trước, Merge Commit đóng vai trò như chiếc cầu nối hai luồng lịch sử độc lập, đánh dấu thời điểm hai tính năng hòa vào làm một.

---

## 🤔 Tại sao cần?
Khi dự án có nhiều người cùng phát triển, các nhánh tính năng sẽ rẽ ra và gộp vào liên tục. Nhờ có Merge Commit, bạn có thể kiểm tra lại xem một tính năng lớn đã được đưa vào sản phẩm vào ngày nào, do ai phê duyệt và bao gồm những công việc nhỏ nào bên trong.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung đồ thị lịch sử như hai dòng sông bắt nguồn từ cùng một ngọn núi (tổ tiên chung). Hai dòng sông chảy qua hai thung lũng khác nhau (hai nhánh riêng biệt). Đến vùng đồng bằng, hai dòng sông gặp nhau tại một ngã ba sông (Merge Commit) rồi hòa thành một dòng chảy lớn duy nhất.

---

## 🖼 Sơ đồ
```text
Cấu trúc đối tượng Merge Commit:
┌──────────────────────────────────────────────┐
│ Commit: e4b2a19 (Merge Commit)               │
│ Parent 1: c3f12a8 (nhánh main)               │
│ Parent 2: 9a7b4f1 (nhánh feature-payment)    │
│ Author: Nam Nguyen <nam@example.com>         │
│ Message: Merge branch 'feature-payment'      │
└──────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Trong dự án web thương mại, nhóm kỹ thuật muốn kiểm tra lại xem chức năng thanh toán qua thẻ ngân hàng được đưa vào mã nguồn khi nào. Trưởng nhóm gõ `git log --merges --oneline` và thấy ngay commit `e4b2a19: Merge branch feature-payment into main`. Nhờ có commit này, nhóm dễ dàng truy ngược lại toàn bộ quá trình phát triển tính năng mà không bị nhầm với các đợt sửa lỗi khác.

---

## 💻 Command
```bash
git show <merge-commit-hash>
git log --merges --oneline
git log --no-merges --oneline
```

---

## 🔍 Giải thích command
- `git show <merge-commit-hash>`: Xem chi tiết một commit hợp nhất, hiển thị rõ dòng mã của hai commit cha.
- `git log --merges --oneline`: Chỉ lọc và hiển thị danh sách các commit hợp nhất trong lịch sử.
- `git log --no-merges --oneline`: Lọc bỏ toàn bộ commit gộp, chỉ xem các commit công việc thông thường.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ merge commit nhân đôi tệp tin:** Merge commit chỉ ghi nhận ảnh chụp trạng thái và liên kết tới 2 commit cha, không tốn thêm dung lượng sao chép.
2. **Lạm dụng merge commit cho thay đổi quá nhỏ:** Những sửa đổi một vài chữ nên dùng Fast-forward để tránh làm rối lịch sử.
3. **Quên rằng merge commit có hai cha khi hoàn tác:** Khi chạy `git revert` trên một merge commit, Git sẽ yêu cầu chỉ định rõ cờ `-m` để biết luồng nào là luồng chính.

---

## 🧪 Lab
Bài học này là bài tự kiểm tra và quan sát lịch sử trên máy của bạn:
1. Chạy lệnh `git log --merges --oneline` để tìm các commit gộp đã có trong kho lưu trữ.
2. Dùng lệnh `git show <mã-commit-gộp>` để quan sát dòng `Merge: <sha1> <sha2>`.
3. Chạy `git log --no-merges --oneline` và so sánh danh sách commit hiển thị so với khi không dùng cờ.

---

## 💡 Hint
Dòng `Merge: hash1 hash2` trong kết quả của lệnh `git show` chính là hai commit cha của commit hợp nhất đó.

---

## ✅ Validation
- Nhận biết được dòng thông tin `Merge:` hiển thị hai commit cha khi chạy `git show`.
- Phân biệt được sự khác nhau giữa kết quả của `git log --merges` và `git log --no-merges`.

---

## ❓ Quiz
Trả lời các câu hỏi sau để nắm vững bản chất và cấu trúc của Merge Commit trong Git.

---

## 🔥 Challenge
Chạy lệnh `git log --graph --oneline` và quan sát các nét gạch chéo thể hiện nhánh con đi vào nút giao Merge Commit.

---

## 📚 Tổng kết
- Merge Commit là nút giao đặc biệt trong đồ thị Git có từ hai commit cha trở lên.
- Giúp bảo lưu mốc lịch sử rõ ràng về thời điểm tích hợp các nhánh tính năng.
- Sử dụng `--merges` hoặc `--no-merges` để tùy biến góc nhìn khi đọc nhật ký commit.
