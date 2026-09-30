# Advanced Git Challenge

---

## 🎯 Mục tiêu
- Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.
- Cứu hộ thành công một commit bị mất bằng reflog sau một thao tác phá hủy mô phỏng.
- Biên tập dọn dẹp chuỗi commit bằng Interactive Rebase (squash, fixup, reword).
- Sử dụng bisect để truy tìm một commit gây lỗi ngầm và gắn thẻ Annotated Tag đánh dấu phiên bản hoàn thiện.

---

## 📖 Định nghĩa
> Advanced Git Challenge (Thử thách Git nâng cao) là bài kiểm tra sát hạch toàn diện kết thúc Level 5: Advanced Git. Bạn sẽ được đặt vào vai trò một kỹ sư cứu hộ mã nguồn cao cấp (Git Rescue Specialist) trong một dự án gặp sự cố nghiêm trọng: lịch sử bị rối loạn, một commit quan trọng bị xóa nhầm, một lỗi tiềm ẩn đang ẩn nấp trong hàng chục commit và mã nguồn cần được gọt giũa đóng gói chuẩn mực trước giờ phát hành.

---

## 🤔 Tại sao cần?
Vượt qua các bài học lý thuyết là bước đầu tiên, nhưng khả năng kết hợp nhịp nhàng giữa reflog, rebase, bisect và worktree dưới áp lực tình huống thực tế mới là thước đo chính xác năng lực của một chuyên gia Git thực thụ. Hoàn thành thử thách này khẳng định bạn đã bước vào hàng ngũ top 5% kỹ sư hiểu sâu và làm chủ hoàn toàn các cơ chế vận hành phức tạp nhất của Git.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn là một bác sĩ phẫu thuật trưởng trong phòng cấp cứu đặc biệt của bệnh viện. Bệnh nhân (kho lưu trữ mã nguồn) đang ở trong tình trạng nguy kịch: một chi bị đứt rời cần nối lại (cứu commit bằng reflog), các vết thương đang bị viêm nhiễm cần phẫu thuật cắt lọc (rebase squash/drop), một độc tố ngầm đang phát tác cần xét nghiệm truy tìm nguồn gốc (git bisect) và sau khi chữa lành phải cấp giấy xuất viện chứng nhận sức khỏe hoàn hảo (Annotated Tag).

---

## 🖼 Sơ đồ
```text
Kịch bản 4 chặng của Advanced Git Challenge:
[Chặng 1: Reflog Rescue]      ──► Hồi sinh commit bị mất do reset hard
               │
               ▼
[Chặng 2: Interactive Rebase] ──► Dọn dẹp, squash và reword chuỗi commit
               │
               ▼
[Chặng 3: Git Bisect Hunt]    ──► Truy tìm commit bí mật đưa lỗi vào hệ thống
               │
               ▼
[Chặng 4: Annotated Tag]      ──► Đóng gói mốc phát hành an toàn v2.0.0!
```

---

## 🌎 Ví dụ thực tế
Trong kịch bản thử thách chuyên gia, học viên nhận được thông báo khẩn cấp: nhánh tính năng `feature-ai` bị ai đó vô tình reset hard làm mất toàn bộ mã nguồn quan trọng. Học viên bình tĩnh mở `git reflog`, tìm thấy mã hash gốc và hồi sinh nhánh an toàn bằng lệnh `git branch`. Tiếp theo, học viên thực hiện `git rebase -i` gộp 6 commit vụn vặt thành 2 commit chuẩn mực theo chuẩn conventional. Tiếp đó, khi hệ thống kích hoạt kịch bản lỗi ngầm, học viên vận hành thành thạo `git bisect` qua 4 bước phân đoạn nhị phân để chỉ mặt điểm tên commit gây lỗi. Cuối cùng, học viên gắn thẻ `v2.0.0` với thông điệp chú giải đầy đủ và hoàn thành bài thi xuất sắc với điểm số tuyệt đối.

---

## 💻 Command
```bash
git reflog
git branch rescue-branch <commit-hash>
git rebase -i HEAD~<n>
git bisect start && git bisect bad && git bisect good <hash>
git tag -a v2.0.0 -m "<thông-điệp-phát-hành>"
```

---

## 🔍 Giải thích command
- `git reflog & git branch`: Bộ đôi cứu hộ tái sinh commit bị mất vào nhánh mới an toàn.
- `git rebase -i`: Tinh chỉnh, nén commit và viết lại thông điệp chuẩn mực.
- `git bisect`: Chia đôi lịch sử để truy vết commit phát sinh lỗi.
- `git tag -a`: Đóng dấu niêm phong cột mốc sản phẩm hoàn thiện.

---

## ⚠️ Sai lầm phổ biến
1. **Mất bình tĩnh khi đối mặt với nhiều lỗi cùng lúc**:  Hãy giải quyết tuần tự từng chặng theo đúng quy trình.
2. **Quên chạy `git bisect reset` sau khi đã tìm ra commit gây lỗi.**: Quên chạy `git bisect reset` sau khi đã tìm ra commit gây lỗi.
3. **Dùng cờ `--force` mà không có lease gây mất dữ liệu mô phỏng của hệ thống.**: Dùng cờ `--force` mà không có lease gây mất dữ liệu mô phỏng của hệ thống.

---

## 🧪 Lab
1. Khởi động kịch bản `advanced-git-master-challenge` trong phòng lab.
2. Sử dụng `git reflog` để tìm và khôi phục commit bị mất.
3. Chạy `git rebase -i` để sắp xếp lại các commit theo đúng yêu cầu đề bài.
4. Thực hiện `git bisect` để tìm commit gây lỗi và ghi nhận mã hash.
5. Tạo thẻ Annotated Tag `v2.0.0` và nộp bài kiểm tra.

---

## 💡 Hint
> Bình tĩnh kiểm tra reflog trước tiên, mọi dữ liệu trong Git đều có thể cứu được nếu đã từng commit.

---

## ✅ Validation
- Vượt qua 100% các tiêu chí sát hạch của bài thi thử thách Advanced Git Challenge.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm tổng kết toàn diện Level 5: Advanced Git.

---

## 🔥 Challenge
Tự thiết lập một kịch bản mô phỏng tương tự trên máy tính cá nhân để thử thách bạn bè cùng học.

---

## 📚 Tổng kết
- Làm chủ trọn vẹn bộ công cụ chuyên gia: Reflog, Rebase, Bisect, Worktree và Tag.
- Khả năng cứu hộ và biên tập lịch sử là kỹ năng cốt lõi phân biệt kỹ sư cao cấp.
- Tự tin giải quyết mọi tình huống sự cố phức tạp nhất trong các dự án phần mềm quy mô lớn.
