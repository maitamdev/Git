# Đổi tên và xóa nhánh an toàn

---

## 🎯 Mục tiêu
- Sử dụng thành thạo `git branch -m` để đổi tên nhánh chuẩn chỉ theo quy ước kỹ thuật.
- Hiểu rõ cơ chế bảo vệ của lệnh xóa nhánh an toàn `git branch -d`.
- Phân biệt sự khác biệt sinh tử giữa xóa an toàn `-d` và xóa cưỡng chế `-D`.

---

## 🧩 Từ khóa hôm nay

### `git branch -m` — đổi tên nhánh
- **Nói dễ hiểu:** Thao tác đổi tên con trỏ định danh của nhánh mà không làm suy chuyển hay biến đổi bất kỳ commit nào trong lịch sử.
- **Ví dụ:** `git branch -m feature-cart feature-shopping-cart` đổi tên nhánh cũ thành tên mới chuẩn chỉ hơn.
- **Đừng nhầm:** Lệnh chỉ đổi tên nhánh cục bộ trên máy bạn; không tự động đổi tên nhánh trên remote GitHub.

### `git branch -d` — xóa nhánh có kiểm tra
- **Nói dễ hiểu:** Lệnh xóa nhánh thông minh có kiểm tra an toàn: Git chỉ đồng ý xóa khi toàn bộ commit của nhánh đó đã được gộp vào nhánh khác.
- **Ví dụ:** Sau khi tính năng thanh toán đã merge vào `main`, bạn gõ `git branch -d feature-payment` để dọn dẹp.
- **Đừng nhầm:** Nếu nhánh vẫn còn commit mồ côi chưa được merge, Git sẽ lập tức từ chối xóa để bảo vệ công sức của bạn.

### `git branch -D` — xóa cưỡng chế
- **Nói dễ hiểu:** Lệnh xóa đao phủ (tương đương với `--delete --force`) ép buộc xóa nhánh ngay lập tức bất chấp code đã merge hay chưa.
- **Ví dụ:** Bạn thử nghiệm một ý tưởng tồi và muốn vứt bỏ hoàn toàn nhánh đó mà không cần gộp vào đâu.
- **Đừng nhầm:** Cực kỳ nguy hiểm! Chỉ sử dụng khi bạn chắc chắn 100% muốn khai tử nhánh đó và không còn cần đến bất kỳ dòng code nào trên đó.

---

## 📖 Định nghĩa
Quản lý vòng đời nhánh bao gồm hai thao tác sống còn: đổi tên nhánh bằng `git branch -m` để phản ánh đúng mục tiêu phát triển, và xóa dọn dẹp các nhánh đã hoàn thành sứ mệnh. Lệnh `git branch -d` thực hiện xóa nhánh an toàn có kiểm tra nghiêm ngặt (chỉ cho phép xóa khi code đã được merge), trong khi cờ viết hoa `-D` là lệnh xóa cưỡng chế dứt khoát không kiểm tra.

---

## 🤔 Tại sao cần?
Sau mỗi chu kỳ phát triển tính năng (Sprint), hàng chục nhánh tạm bợ sẽ mọc lên như nấm trong kho mã nguồn của bạn. Nếu không dọn dẹp thường xuyên, danh sách nhánh sẽ phình to gây hoa mắt, nhầm lẫn và tiềm ẩn rủi ro checkout nhầm code cũ. Đồng thời, cơ chế khóa an toàn của `-d` bảo vệ bạn khỏi thảm họa lỡ tay xóa mất những nhánh chứa công sức nhiều ngày chưa kịp gộp.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung mỗi nhánh như một chiếc nhãn dán Post-it dán trên bìa hồ sơ. Đổi tên (`-m`) là bạn bóc nhãn cũ viết tên mới dán đè lên. Khi hồ sơ đã được số hóa lưu trữ vào kho chung (đã merge), bạn bóc nhãn Post-it vứt vào sọt rác (`-d`) để bàn làm việc gọn gàng. Nhưng nếu hồ sơ chưa lưu, sọt rác sẽ bật khóa báo động ngăn bạn vứt đi!

---

## 🖼 Sơ đồ
```text
CƠ CHẾ BẢO VỆ CỦA LỆNH XÓA NHÁNH GIT BRANCH -D:

Tình huống 1: Nhánh CHƯA merge vào main
  (C1) ──► (C2: main)
             \
              ──► (C3: feature)
  Chạy `git branch -d feature` ──► ❌ TỪ CHỐI! Báo lỗi: The branch is not fully merged!

Tình huống 2: Nhánh ĐÃ merge vào main
  (C1) ──► (C2) ──► (C3: main, feature)
  Chạy `git branch -d feature` ──► ✅ THÀNH CÔNG! Đã gỡ nhãn an toàn, commit C3 vẫn còn!
```

---

## 🌎 Ví dụ thực tế
Bạn khởi tạo nhánh tạm là `temp-fix`, sau khi xác định rõ nguyên nhân bạn đổi tên chuẩn mực thành `bugfix/login-oauth`. Sau khi nhánh này được Tech Lead merge vào `main`, bạn chuyển về `main` và gõ `git branch -d bugfix/login-oauth`. Nhánh phụ được dọn sạch sẽ, giữ cho danh bạ repo của bạn luôn tinh gọn.

---

## 💻 Command
```bash
git branch -m <tên-cũ> <tên-mới>
git branch -d <tên-nhánh>
git branch -D <tên-nhánh>
git branch
```

---

## 🔍 Giải thích command
- `git branch -m <tên-mới>`: Nếu chỉ truyền một tham số, Git sẽ đổi tên của chính nhánh hiện tại mà bạn đang đứng.
- `git branch -m <cũ> <mới>`: Đổi tên nhánh bất kỳ trong kho lưu trữ từ xa mà không cần phải chuyển sang nhánh đó.
- `git branch -d <tên-nhánh>`: Xóa an toàn nhánh đã được hợp nhất thành công.
- Lưu ý sống còn: Bạn không thể tự xóa nhánh mà bạn đang đứng chân lên; hãy switch sang nhánh khác trước khi xóa!

---

## ⚠️ Sai lầm phổ biến
1. **Đứng ở chính nhánh đó để gõ lệnh xóa**: Git sẽ lập tức chặn lại và báo lỗi "Cannot delete branch currently checked out".
2. **Thấy `-d` từ chối là vội vàng gõ ngay `-D`**: Thói quen tai hại này xóa sổ vĩnh viễn nhiều ngày công sức code của bạn khi chưa kịp merge.
3. **Nghĩ xóa nhánh là xóa mất commit**: Khi nhánh đã merge vào `main`, việc xóa nhánh chỉ là gỡ đi con trỏ nhãn; toàn bộ commit vẫn nằm an toàn trong lịch sử của `main`.

---

## 🧪 Lab
1. Chạy `git branch temp-feature` để cắm một con trỏ nhánh mới.
2. Đổi tên nhánh: `git branch -m temp-feature feature-profile`, kiểm tra bằng `git branch`.
3. Chuyển sang nhánh đó: `git switch feature-profile`, tạo file `feature-profile.txt`, add và commit.
4. Quay về `git switch main`. Thử xóa: `git branch -d feature-profile` và quan sát cảnh báo từ chối của Git.
5. Tiến hành gộp nhánh: `git merge feature-profile`.
6. Giờ đây gõ lại: `git branch -d feature-profile` và chứng kiến nhánh được xóa thành công rực rỡ!

---

## 💡 Hint
> Luôn đứng ở nhánh `main` trước khi tiến hành dọn dẹp xóa các nhánh tính năng đã hoàn thành!

---

## ✅ Validation
- Nhánh đổi tên thành công từ `temp-feature` sang `feature-profile`.
- Lệnh xóa trước khi merge bị Git từ chối chuẩn xác theo cơ chế an toàn.
- Lệnh xóa sau khi merge diễn ra suôn sẻ và file mã nguồn vẫn nằm nguyên vẹn trên `main`.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để nắm vững quy tắc đổi tên và các cấp độ bảo vệ khi xóa nhánh trong Git.

---

## 🔥 Challenge
Giả sử bạn lỡ tay dùng `git branch -D` xóa mất một nhánh chứa tính năng quan trọng chưa kịp merge. Làm thế nào để giải cứu các commit của nhánh đó quay trở lại cõi sống? (Gợi ý: Tìm lại dấu vết trong `git reflog`).

---

## 📚 Tổng kết
- `git branch -m` đổi tên nhánh linh hoạt mà không làm ảnh hưởng tới lịch sử snapshot.
- `git branch -d` là tấm khiên an toàn bảo vệ công sức lập trình viên khỏi việc xóa nhầm.
- Duy trì thói quen xóa các nhánh tính năng đã merge để giữ kho mã nguồn luôn ngăn nắp, tinh tươm.
