# git cherry-pick

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất hoạt động của `git cherry-pick`: sao chép một commit cụ thể từ nhánh này sang nhánh khác.
- Sử dụng cherry-pick để đưa các bản vá lỗi cấp bách (hotfix) từ nhánh thử nghiệm sang nhánh production.
- Phân biệt rõ ràng giữa việc merge toàn bộ nhánh và việc chọn lọc từng commit đơn lẻ.
- Xử lý mâu thuẫn xung đột (conflict) phát sinh trong quá trình cherry-pick commit.

---

## 🧩 Từ khóa hôm nay

### git cherry-pick
- **Nói dễ hiểu**: Lệnh nhặt riêng một commit từ nhánh khác để dán thành một commit mới trên nhánh hiện tại.
- **Ví dụ**: Đang ở nhánh `main`, chạy `git cherry-pick a1b2c3d` để lấy bản vá lỗi từ nhánh thử nghiệm sang.
- **Đừng nhầm**: Không gộp toàn bộ nhánh; lệnh chỉ lấy đúng những thay đổi trong commit được chỉ định.

### selective integration
- **Nói dễ hiểu**: Chiến lược tích hợp có chọn lọc từng tính năng hoặc bản sửa lỗi mà không kéo theo code thừa dở dang.
- **Ví dụ**: Nhánh tính năng có 10 commit nhưng chỉ có 1 commit hotfix cần đưa vào bản phát hành gấp.
- **Đừng nhầm**: Không nên lạm dụng để thay thế merge; lạm dụng cherry-pick sẽ sinh ra nhiều commit trùng lặp.

### --abort vs --continue
- **Nói dễ hiểu**: Cặp cờ điều khiển khi gặp xung đột: `--abort` hủy bỏ quay về đầu, `--continue` tiếp tục sau khi sửa xong conflict.
- **Ví dụ**: Sửa xung đột xong, gõ `git add .` rồi chạy `git cherry-pick --continue`.
- **Đừng nhầm**: Không gõ `git commit` thủ công sau khi sửa conflict; phải dùng `--continue` để Git hoàn tất quy trình.

---

## 📖 Định nghĩa
`git cherry-pick <commit-hash>` là câu lệnh trích xuất và sao chép chọn lọc trong Git, cho phép bạn chọn duy nhất một commit cụ thể từ nhánh bất kỳ trong lịch sử và sao chép những thay đổi của commit đó thành một commit mới trên đỉnh nhánh hiện tại mà không cần merge toàn bộ nhánh dở dang.

---

## 💡 Tại sao cần
Nếu một nhánh tính năng có nhiều thay đổi nhưng bạn chỉ muốn đưa một commit sửa lỗi sang nhánh khác, `git cherry-pick <hash>` tạo một commit mới từ thay đổi đó. Trước khi dùng, hãy xác nhận commit không phụ thuộc vào các commit khác; cherry-pick không tự mang theo phần phụ thuộc.

---

## 🧠 Mental Model
Hãy hình dung một chiếc bánh ngọt lớn trang trí nhiều quả cherry và các lớp kem đang làm dở. Bạn không muốn ăn cả chiếc bánh chưa nướng chín. Bạn chỉ dùng chiếc nĩa cẩn thận gắp đúng một quả cherry chín mọng trên mặt bánh đặt sang đĩa ăn tráng miệng của mình (`cherry-pick`). Đĩa của bạn có món ngon, còn chiếc bánh lớn vẫn ở nguyên chỗ cũ.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế gắp commit của git cherry-pick:
Nhánh feature:   C1 ──► C2 ──► C3 (Bản vá quan trọng!) ──► C4
Nhánh main:      M1 ──► M2

Đứng tại main và chạy: git cherry-pick C3
Nhánh main:      M1 ──► M2 ──► C3' (Commit mới chứa nội dung của C3)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Long đang làm nhánh `experimental-auth` và tạo commit `b4c5d6e` sửa lỗi rò rỉ bộ nhớ nghiêm trọng. Nhánh chính `main` đang cần đóng gói phát hành gấp. Long chuyển về main bằng `git switch main` rồi chạy `git cherry-pick b4c5d6e`. Git tự động áp dụng diff vào main và tạo commit mới, giải quyết triệt để lỗi mà không kéo theo code thử nghiệm dở dang.

---

## 💻 Command & Cú pháp
```bash
git cherry-pick <commit-hash>
git cherry-pick <hash-1> <hash-2>
git cherry-pick <hash-start>..<hash-end>
git cherry-pick -n <commit-hash>
git cherry-pick --continue
git cherry-pick --abort
```

---

## 🔍 Giải thích command
- `git cherry-pick <hash>`: Sao chép commit chỉ định và tạo commit mới trên nhánh hiện tại.
- `git cherry-pick <A>..<B>`: Trong Git thật, chọn các commit sau `A` đến hết `B`; simulator hiện chỉ hỗ trợ chọn một commit mỗi lần.
- `git cherry-pick -n <hash>`: Gắp thay đổi vào Staging/Working Tree mà chưa tự động commit (`--no-commit`).
- `git cherry-pick --continue` / `--abort`: Dùng trong Git thật để tiếp tục hoặc hủy thao tác đang dừng vì conflict; simulator hiện chưa mô phỏng trạng thái này.

---

## ⚠️ Sai lầm phổ biến
1. **Lạm dụng cherry-pick thay cho merge**: Tạo ra nhiều commit trùng lặp nội dung với mã hash khác nhau gây rắc rối khi gộp nhánh sau này.
2. **Quên rằng cherry-pick tạo ra mã hash mới**: Dù nội dung tương tự nhưng commit mới trên nhánh đích có mã SHA khác với commit gốc.
3. **Cho rằng mọi conflict có thể tiếp tục như nhau**: Trong Git thật, xem `git status`, giải quyết file, stage rồi dùng `git cherry-pick --continue`; kiểm tra thay đổi trước khi hoàn tất.

---

## 🧪 Lab thực hành
Trong simulator, làm lab với một commit không xung đột. Nếu học bằng Git thật, làm trong kho thử nghiệm riêng.
1. Tạo commit nền trên `main`, sau đó chạy `git switch -c feature-patch`.
2. Tạo `hotfix.txt`, stage và commit bằng thông điệp `fix: correct validation`; ghi lại mã commit.
3. Chạy `git switch main`, rồi `git cherry-pick <hash-vừa-ghi>`.
4. Chạy `git log --oneline -3` và `git status`. Nội dung file đã được áp dụng trên `main`, nhưng hash commit mới khác hash ở `feature-patch`.

---

## 💡 Hint
> Nếu gặp xung đột khi cherry-pick, giải quyết xong thì dùng `git cherry-pick --continue` chứ không dùng git commit.

---

## ✅ Validation & Kết quả mong đợi
- Commit mới xuất hiện trên nhánh hiện tại với nội dung thay đổi tương đương commit gốc.
- Commit mới có cha là commit trước đó của nhánh hiện tại; nội dung thay đổi được chọn đã được áp dụng.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh chọn lọc git cherry-pick.

---

## 🚀 Thử thách nâng cao
Sử dụng cú pháp dải commit `git cherry-pick A..B` để gắp một chuỗi 3 commit liên tiếp từ nhánh tính năng sang nhánh release.

---

## 📝 Tổng kết
- `git cherry-pick` sao chép một commit cụ thể từ nhánh khác và áp dụng lên nhánh hiện tại.
- Tạo ra commit mới có nội dung tương tự nhưng mã băm SHA-1 khác biệt.
- Cực kỳ hữu ích để đưa các bản vá khẩn cấp (hotfix) sang nhánh release hoặc main.
