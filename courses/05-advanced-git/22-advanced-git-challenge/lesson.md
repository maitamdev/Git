# Advanced Git Challenge

---

## 🎯 Mục tiêu
- Tổng hợp toàn bộ các kỹ thuật Git nâng cao đã học vào một kịch bản thử thách thực chiến phức tạp.
- Tạo ref mới trỏ tới commit bị tách khỏi nhánh và xác nhận file đã commit còn đó.
- Chọn một thao tác Interactive Rebase đã học và kiểm tra nội dung cùng lịch sử sau khi viết lại.
- Tìm commit gây lỗi trong lịch sử thử nghiệm, kết thúc phiên bisect, rồi gắn tag có chú giải cho commit đã kiểm tra.

---

## 🧩 Từ khóa hôm nay

### Git Rescue Specialist
- **Nói dễ hiểu**: Kỹ sư thành thạo các kỹ thuật cứu hộ dữ liệu Git (reflog, revert, rebase) để giải cứu kho mã nguồn khi gặp sự cố nghiêm trọng.
- **Ví dụ**: Dùng `git reflog` và `git branch` để cứu lại commit bị xóa nhầm do reset hard chỉ trong 1 phút.
- **Đừng nhầm**: Reflog có thể hết hạn và chỉ giúp tìm commit đã từng được tham chiếu; nó không lưu file chưa commit.

### History Rewriting Mastery
- **Nói dễ hiểu**: Khả năng làm chủ việc chỉnh sửa và tái cấu trúc lịch sử commit (rebase -i, squash, fixup, autosquash) trước khi chia sẻ ra cộng đồng.
- **Ví dụ**: Gộp 10 commit nháp thành 2 commit chuẩn conventional với mô tả sắc nét trước khi mở Pull Request.
- **Đừng nhầm**: Rebase thay đổi commit hash; trước khi cập nhật nhánh đã chia sẻ, cần làm theo quy trình của nhóm.

### Binary Bug Hunting (git bisect)
- **Nói dễ hiểu**: Phương pháp truy tìm commit phát sinh lỗi tự động với thuật toán chia đôi nhị phân đạt tốc độ $O(\log N)$.
- **Ví dụ**: Với 1.000 commit và một mốc tốt, một mốc hỏng rõ ràng, bisect cần khoảng 10 lượt kiểm tra trong trường hợp lý tưởng.
- **Đừng nhầm**: Sau khi tìm thấy thủ phạm, chạy `git bisect reset` để kết thúc phiên và quay lại vị trí ban đầu.

---

## 📖 Định nghĩa
Đây là bài ôn tập cuối Level 5 gồm bốn phần ngắn: reflog recovery, interactive rebase, bisect và annotated tag. Hãy làm trong repository thử nghiệm riêng; interactive rebase và bisect có bước kiểm tra cần Git thật, không phải terminal mô phỏng.

---

## 💡 Tại sao cần
Bạn sẽ thực hành từng kỹ năng trên một repo có thể bỏ đi, xem Git thay đổi ref và file ra sao, rồi đối chiếu kết quả bằng `git status`, `git log` và `git show`.

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
git bisect start
git bisect bad
git bisect good <commit-tot>
git bisect reset
git tag -a v2.0.0 -m "<thông-điệp-phát-hành>"
```

---

## 🔍 Giải thích command
- `git reflog` và `git branch`: Tìm một commit còn tham chiếu được rồi tạo nhánh mới trỏ tới nó.
- `git rebase -i`: Tinh chỉnh, nén commit và viết lại thông điệp chuẩn mực.
- `git bisect`: Chia đôi lịch sử để truy vết commit phát sinh lỗi.
- `git tag -a`: Tạo tag có metadata; chỉ gắn sau khi xác nhận commit đúng.

---

## ⚠️ Sai lầm phổ biến
1. **Dùng repo đang làm việc để thử reset/rebase**: Dùng repo riêng, xác nhận `git status` sạch và sao lưu nội dung cần giữ.
2. **Cho rằng reflog giữ commit vô thời hạn hoặc cứu file chưa commit**: Reflog có thể hết hạn; commit hóa hoặc sao lưu công việc trước.
3. **Xem `--force-with-lease` là không có rủi ro**: Cờ này giảm khả năng ghi đè cập nhật mới, nhưng vẫn cần quyền và phối hợp với người dùng nhánh.

---

## 🧪 Lab thực hành
Chạy bốn phần theo thứ tự trong một repo thử nghiệm mới bằng Git thật. Không dùng repo dự án đang làm.

**A. Cứu commit**
1. Tạo commit nền có `README.md`, sau đó commit `recovery.txt` với nội dung `keep this`.
2. Ghi lại hash, chạy `git reset --hard HEAD~1`, rồi dùng `git reflog` tìm commit vừa rời khỏi nhánh.
3. Chạy `git branch rescue <hash>`, rồi `git switch rescue`; xác nhận `recovery.txt` còn nội dung `keep this`.

**B. Sửa lịch sử riêng**
4. Trên một nhánh thử nghiệm chưa chia sẻ, tạo ba commit có thông điệp dễ nhận biết.
5. Chạy `git rebase -i HEAD~3`; đổi một message bằng `reword` hoặc gộp hai commit liên quan bằng `squash`/`fixup`. Lưu todo list.
6. Chạy `git log --oneline -4` và `git status`; xác nhận nội dung cần giữ vẫn còn và hash đã thay đổi.

**C. Tìm commit lỗi**
7. Dùng repo bisect riêng theo setup ở bài 20: mốc tốt, mốc hỏng và một file kiểm tra rõ kết quả.
8. Ghi lại hash commit đầu tiên bị lỗi, sau đó chạy `git bisect reset`.

**D. Gắn tag**
9. Chỉ sau khi kiểm tra commit mục tiêu, chạy `git tag -a practice-v0.1 -m "Practice release"` và `git show practice-v0.1`.
10. Xóa tag thử nghiệm bằng `git tag -d practice-v0.1` nếu đây không phải tag cần giữ.

---

## 💡 Hint & mẹo
> Trước khi thử: chạy `git status`, dùng repo riêng, ghi lại hash trước thao tác viết lại lịch sử và kiểm tra lại file sau mỗi chặng.

---

## ✅ Validation & Kết quả mong đợi
- Tạo được nhánh `rescue` trỏ đúng commit đã reset và mở lại file đã commit.
- Hoàn thành một thao tác interactive rebase, tìm được commit lỗi bằng bisect và tạo/xem được annotated tag.
- Sau mỗi phần, nêu được thay đổi nào có thể khôi phục và điều kiện nào có thể làm thao tác thất bại.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm tổng kết toàn diện Level 5: Advanced Git.

---

## 🚀 Thử thách nâng cao
Kết hợp Git Hooks và Worktree để tự động chạy kiểm thử đơn vị trong một worktree ngầm mỗi khi bạn chuẩn bị commit mã nguồn.

---

## 📝 Tổng kết
- Reflog giúp tìm commit còn được ghi nhận; nó không thay thế sao lưu.
- Rebase viết lại commit; bisect tìm mốc lỗi; annotated tag lưu nhãn cùng metadata.
- Tự tin bước tiếp sang Level 6: Team Workflows & Collaboration.
