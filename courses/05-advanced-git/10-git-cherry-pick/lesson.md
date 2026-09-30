# git cherry-pick

---

## 🎯 Mục tiêu
- Hiểu rõ bản chất hoạt động của `git cherry-pick`: sao chép một commit cụ thể từ nhánh này sang nhánh khác.
- Sử dụng cherry-pick để đưa các bản vá lỗi cấp bách (hotfix) từ nhánh thử nghiệm sang nhánh production.
- Phân biệt rõ ràng giữa việc merge toàn bộ nhánh và việc chọn lọc từng commit đơn lẻ.
- Xử lý mâu thuẫn xung đột (conflict) phát sinh trong quá trình cherry-pick commit.

---

## 📖 Định nghĩa
> `git cherry-pick <commit-hash>` là câu lệnh trích xuất và sao chép chọn lọc vô cùng linh hoạt trong Git, cho phép bạn lựa chọn duy nhất một (hoặc một dải) commit cụ thể từ một nhánh bất kỳ trong lịch sử và sao chép chính xác những thay đổi của commit đó để áp dụng thành một commit mới trên đỉnh của nhánh hiện tại bạn đang đứng. Đây là phương thức phẫu thuật mã nguồn tinh vi mà không cần phải gộp (merge) toàn bộ cả nhánh dở dang.

---

## 🤔 Tại sao cần?
Hãy tưởng tượng bạn đang phát triển một nhánh tính năng lớn gồm 20 commit dở dang và chưa sẵn sàng phát hành. Đột nhiên bạn phát hiện ra trong 20 commit đó có commit số 5 chứa một bản sửa lỗi bảo mật cực kỳ xuất sắc mà môi trường production đang rất cần ngay lập tức. Bạn không thể merge cả nhánh vì sẽ kéo theo 19 commit lỗi chưa hoàn thiện. `git cherry-pick` chính là chiếc gắp y tế: bạn chỉ việc gắp đúng commit số 5 đó đưa sang nhánh main để phát hành ngay.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một chiếc bánh gato lớn phủ đầy những quả cherry ngọt ngào và các lớp kem đang làm dở. Bạn không muốn ăn cả chiếc bánh chưa nướng chín. Bạn chỉ dùng chiếc nĩa cẩn thận gắp đúng một quả cherry ngon lành nhất trên mặt bánh đưa sang chiếc đĩa ăn tráng miệng của bạn (`git cherry-pick`). Chiếc đĩa của bạn có thêm một quả cherry tuyệt ngon, trong khi chiếc bánh lớn vẫn ở nguyên vị trí của nó.

---

## 🖼 Sơ đồ
```text
Cơ chế gắp commit của git cherry-pick:
Nhánh feature:   C1 ──► C2 ──► C3 (Bản vá quan trọng!) ──► C4
Nhánh main:      M1 ──► M2

Đứng tại main và chạy: git cherry-pick C3
Nhánh main:      M1 ──► M2 ──► C3' (Commit mới chứa nội dung của C3)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Long đang làm việc trên nhánh `experimental-auth` và tạo commit `b4c5d6e` sửa lỗi rò rỉ bộ nhớ nghiêm trọng của máy chủ. Trong khi đó, nhánh chính `main` đang chuẩn bị đóng gói phát hành phiên bản mới cho khách hàng. Long chuyển sang nhánh main bằng câu lệnh `git switch main`, sau đó thực thi lệnh: `git cherry-pick b4c5d6e`. Git lập tức đọc diff của commit đó, áp dụng vào mã nguồn của nhánh main và tự động tạo commit mới mang cùng thông điệp. Đội ngũ kiểm thử xác nhận lỗi bộ nhớ được khắc phục hoàn toàn trên main mà không hề bị kéo theo bất kỳ đoạn mã thử nghiệm chưa hoàn thiện nào.

---

## 💻 Command
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
- `git cherry-pick <h1..h2>`: Sao chép một dải các commit liên tiếp sang nhánh hiện tại.
- `git cherry-pick -n <hash>`: Gắp thay đổi vào Staging/Working Tree mà chưa tự động commit (`--no-commit`).
- `git cherry-pick --continue`: Tiếp tục quá trình gắp commit sau khi đã giải quyết xong xung đột.
- `git cherry-pick --abort`: Hủy bỏ hoàn toàn thao tác gắp commit và đưa nhánh về trạng thái ban đầu.

---

## ⚠️ Sai lầm phổ biến
1. **Cherry-pick bừa bãi quá nhiều commit**:  Dẫn đến tình trạng trùng lặp commit (duplicate commits) gây rắc rối khi merge nhánh sau này.
2. **Quên rằng cherry-pick tạo ra mã SHA-1 mới**:  Dù nội dung giống nhau nhưng commit mới trên nhánh hiện tại có mã hash khác với commit gốc.
3. **Bối rối khi gặp conflict**:  Tương tự như merge, cần mở file giải quyết xung đột, `git add` và gõ `git cherry-pick --continue`.

---

## 🧪 Lab
1. Tạo nhánh `feature-patch` và commit một bản sửa lỗi nhỏ.
2. Chuyển về nhánh `main` và lấy mã hash của commit vừa tạo.
3. Thực hiện `git cherry-pick <commit-hash>` trên nhánh `main`.
4. Kiểm tra `git log --oneline` trên main để xác nhận commit đã được sao chép thành công.

---

## 💡 Hint
> Nếu gặp xung đột khi cherry-pick, giải quyết xong thì dùng `git cherry-pick --continue` chứ không dùng git commit.

---

## ✅ Validation
- Sao chép thành công một commit chỉ định sang nhánh khác bằng câu lệnh git cherry-pick.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh chọn lọc git cherry-pick.

---

## 🔥 Challenge
Nêu những hệ quả tiêu cực tiềm ẩn đối với lịch sử Git nếu một nhóm lập trình viên lạm dụng cherry-pick thay vì merge.

---

## 📚 Tổng kết
- `git cherry-pick` sao chép một commit cụ thể từ nhánh khác và áp dụng lên nhánh hiện tại.
- Tạo ra commit mới có nội dung tương tự nhưng mã băm SHA-1 khác biệt.
- Cực kỳ hữu ích để đưa các bản vá khẩn cấp (hotfix) sang nhánh release hoặc main.
