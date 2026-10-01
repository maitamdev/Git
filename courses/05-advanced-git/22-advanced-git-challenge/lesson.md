# Advanced Git Challenge

---

## 🎯 Mục tiêu
- Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.
- Cứu hộ thành công một commit bị mất bằng reflog sau một thao tác phá hủy mô phỏng.
- Biên tập dọn dẹp chuỗi commit bằng Interactive Rebase (squash, fixup, reword).
- Sử dụng bisect để truy tìm một commit gây lỗi ngầm và gắn thẻ Annotated Tag đánh dấu phiên bản hoàn thiện.

---

## 🧩 Từ khóa hôm nay

### Git Rescue Specialist
- **Nói dễ hiểu**: Kỹ sư thành thạo các kỹ thuật cứu hộ dữ liệu Git (reflog, revert, rebase) để giải cứu kho mã nguồn khi gặp sự cố nghiêm trọng.
- **Ví dụ**: Dùng `git reflog` và `git branch` để cứu lại commit bị xóa nhầm do reset hard chỉ trong 1 phút.
- **Đừng nhầm**: Cứu hộ không phải là đoán mò; mọi thao tác đều dựa trên nhật ký di chuyển reflog chính xác của Git.

### History Rewriting Mastery
- **Nói dễ hiểu**: Khả năng làm chủ việc chỉnh sửa và tái cấu trúc lịch sử commit (rebase -i, squash, fixup, autosquash) trước khi chia sẻ ra cộng đồng.
- **Ví dụ**: Gộp 10 commit nháp thành 2 commit chuẩn conventional với mô tả sắc nét trước khi mở Pull Request.
- **Đừng nhầm**: Chỉ viết lại lịch sử trên nhánh cá nhân ở máy cục bộ, không bao giờ viết lại lịch sử trên nhánh chung đã push.

### Binary Bug Hunting (git bisect)
- **Nói dễ hiểu**: Phương pháp truy tìm commit phát sinh lỗi tự động với thuật toán chia đôi nhị phân đạt tốc độ $O(\log N)$.
- **Ví dụ**: Tìm ra commit làm hỏng chức năng thanh toán giữa 1.000 commit chỉ với 10 lần kiểm thử.
- **Đừng nhầm**: Nhớ chạy `git bisect reset` sau khi xác định xong thủ phạm để đưa HEAD về nhánh làm việc an toàn.

---

## 📖 Định nghĩa
Advanced Git Challenge là bài sát hạch toàn diện kết thúc Level 5, yêu cầu phối hợp nhịp nhàng các kỹ thuật chuyên sâu: cứu hộ commit bằng reflog, biên tập lịch sử với interactive rebase, truy tìm lỗi bằng bisect và đóng gói mốc phát hành bằng annotated tag.

---

## 💡 Tại sao cần
Học lý thuyết từng lệnh là chưa đủ. Khả năng kết hợp linh hoạt reflog, rebase, bisect và worktree dưới áp lực tình huống thực chiến giúp bạn trở thành chuyên gia Git thực thụ, tự tin xử lý mọi sự cố phức tạp trong các dự án quy mô lớn.

---

## 🧠 Mental Model
Hãy hình dung bạn là bác sĩ phẫu thuật trưởng trong phòng cấp cứu. Kho mã nguồn gặp sự cố: một chi đứt rời cần nối lại (cứu commit bằng reflog), vết thương cần cắt lọc gọt giũa (rebase squash), chất độc cần xét nghiệm tìm nguồn (bisect) và cấp giấy xuất viện hoàn hảo (Annotated Tag).

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Kỹ sư nhận ca sự cố: nhánh `feature` bị reset hard mất code. Kỹ sư mở `git reflog` hồi sinh nhánh, dùng `git rebase -i` gộp commit nháp thành 2 commit chuẩn mực, chạy `git bisect` qua 4 bước nhị phân tìm ra commit lỗi ngầm, rồi gắn tag `v2.0.0` xuất sắc hoàn thành thử thách.

---

## 💻 Command & Cú pháp
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
1. **Mất bình tĩnh khi đối mặt với sự cố**: Bình tĩnh giải quyết tuần tự từng bước theo quy trình đã học; Git gần như không bao giờ làm mất commit đã tạo.
2. **Quên chạy `git bisect reset`**: Để sót trạng thái bisect dở dang khiến HEAD bị tách rời khỏi nhánh làm việc.
3. **Lạm dụng force push bừa bãi**: Luôn dùng `--force-with-lease` thay vì `--force` khi cần cập nhật nhánh cá nhân sau khi rebase.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Khởi động kịch bản thử thách nâng cao trên kho bài tập cá nhân.
2. Sử dụng `git reflog` để tìm và khôi phục commit bị mất do thao tác reset mô phỏng.
3. Chạy `git rebase -i` để sắp xếp và gộp lại các commit cho gọn gàng.
4. Thực hiện `git bisect` để tìm commit gây lỗi và ghi nhận mã hash.
5. Tạo thẻ Annotated Tag `v2.0.0` và kiểm tra lại lịch sử toàn diện.

---

## 💡 Hint & mẹo
> Bình tĩnh kiểm tra reflog trước tiên, mọi dữ liệu trong Git đều có thể cứu được nếu đã từng commit.

---

## ✅ Validation & Kết quả mong đợi
- Vượt qua 100% các tiêu chí sát hạch của bài thi thử thách Advanced Git Challenge.
- Tự tin làm chủ hoàn toàn các công cụ cấp cao của Git trong môi trường dự án thực tế.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm tổng kết toàn diện Level 5: Advanced Git.

---

## 🚀 Thử thách nâng cao
Kết hợp Git Hooks và Worktree để tự động chạy kiểm thử đơn vị trong một worktree ngầm mỗi khi bạn chuẩn bị commit mã nguồn.

---

## 📝 Tổng kết
- Level 5 trang bị toàn bộ kỹ năng cứu hộ và biên tập lịch sử tối cao của Git.
- Reflog, Rebase, Bisect và Worktree là bộ tứ vũ khí của mọi Git Master.
- Tự tin bước tiếp sang Level 6: Team Workflows & Collaboration.
