# HEAD và trạng thái detached HEAD

---

## 🎯 Mục tiêu
- Hiểu sâu cơ chế trỏ gián tiếp của con trỏ HEAD tới nhánh và commit.
- Nhận thức đúng đắn và tự tin làm việc với trạng thái Detached HEAD mà không hoảng sợ.
- Nắm vững thao tác quay về nhánh an toàn hoặc dùng `git switch -c` để bảo tồn các commit thử nghiệm.

---

## 🧩 Từ khóa hôm nay

### HEAD — vị trí làm việc hiện tại
- **Nói dễ hiểu:** Chiếc la bàn định vị cho biết bạn đang đứng ở nhánh nào hoặc commit nào trong kho mã nguồn.
- **Ví dụ:** Khi bạn đang làm việc ở nhánh `main`, file `.git/HEAD` chứa nội dung `ref: refs/heads/main`.
- **Đừng nhầm:** HEAD không phải là tên một commit cố định; vị trí của nó thay đổi liên tục theo mỗi bước chân bạn di chuyển trong Git.

### Detached HEAD — HEAD không theo tên nhánh
- **Nói dễ hiểu:** Trạng thái khi con trỏ HEAD tách rời khỏi tên nhánh và trỏ trực diện vào một mã commit độc lập.
- **Ví dụ:** Khi bạn switch thẳng tới một mã băm commit cụ thể, Git sẽ thông báo bạn đang ở trạng thái Detached HEAD.
- **Đừng nhầm:** Đây là tính năng hoàn toàn bình thường để soi mã nguồn cũ, tuyệt đối không phải là lỗi hỏng kho mã nguồn.

### `git switch -c` — tạo nhánh tại vị trí hiện tại
- **Nói dễ hiểu:** Chiếc phao cứu sinh giúp bạn tạo ngay một nhánh mới để gắn chặt các commit thử nghiệm vừa tạo khi đang ở trạng thái detached.
- **Ví dụ:** Gõ `git switch -c experiment-fix` để giữ lại vĩnh viễn các commit vừa gõ mà không bị trình dọn rác (GC) xóa mất.
- **Đừng nhầm:** Nếu bạn chuyển về `main` mà không tạo nhánh mới, các commit tạo ra trong lúc detached sẽ bị mồ côi và rất khó tìm lại.

---

## 📖 Định nghĩa
HEAD là con trỏ tối cao trong Git, định vị chính xác vị trí mà thư mục làm việc của bạn đang gắn kết. Ở trạng thái thông thường, HEAD trỏ gián tiếp tới một nhánh (như `main`), rồi nhánh đó mới trỏ tới commit. Khi bạn nhảy thẳng tới một mã băm commit cụ thể, Git rơi vào trạng thái 'Detached HEAD': con trỏ HEAD tách rời khỏi nhánh và bám trực tiếp vào commit đó.

---

## 🤔 Tại sao cần?
Hiểu về HEAD và Detached HEAD là ranh giới giữa một lập trình viên biết dùng Git và một người làm chủ hoàn toàn Git. Bạn cần nhảy về các commit trong quá khứ để chạy thử nghiệm, tái hiện lỗi người dùng báo hoặc điều tra mã độc mà không sợ làm xáo trộn nhánh chính. Nắm vững cơ chế này giúp bạn tự tin khám phá quá khứ và biết cách cứu lại các commit thử nghiệm trước khi rời đi.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung HEAD như chiếc đầu đọc của máy hát đĩa than cổ điển hoặc mắt đọc laser của ổ đĩa CD. Khi đầu đọc hạ xuống rãnh đĩa mang tên 'Bài 3' (nhánh), nó sẽ phát bài hát đó. Nếu bạn dùng tay nhấc bổng đầu đọc đặt thẳng vào một giây bất kỳ giữa bài hát mà không qua menu (Detached), đầu đọc vẫn phát nhạc bình thường, nhưng nó không còn bị ràng buộc bởi tên bài hát nữa.

---

## 🖼 Sơ đồ
```text
TRẠNG THÁI BÌNH THƯỜNG (ATTACHED):
  HEAD ──────► [main] ──────► Commit (C3)
  (Khi commit mới C4 xuất hiện: HEAD và main cùng tiến lên C4)

TRẠNG THÁI TÁCH RỜI (DETACHED HEAD):
  HEAD ──────────────────────► Commit (C1)  <── Đang đứng xem trực tiếp
  [main] ────────────────────► Commit (C3)  <── Nhánh chính vẫn nằm yên
  (Nếu commit ở đây mà không tạo nhánh mới, commit sẽ bị mồ côi khi bạn rời đi!)
```

---

## 🌎 Ví dụ thực tế
Khách hàng báo lỗi ứng dụng bị sập ở phiên bản phát hành 3 ngày trước với mã commit `e4f5a6b`. Bạn lập tức gõ `git switch --detach e4f5a6b` để đưa toàn bộ mã nguồn trên máy trở về đúng khoảnh khắc đó để chạy thử. Sau khi xác định được nguyên nhân, bạn chỉ cần gõ `git switch main` để trở về hiện tại mà không làm hỏng bất kỳ nhánh nào.

---

## 💻 Command
```bash
git log --oneline
git switch --detach <mã-commit>
git status
git switch -c <tên-nhánh-mới>
git switch main
```

---

## 🔍 Giải thích command
- `git switch --detach <mã-commit>`: Nhảy thẳng tới một snapshot trong quá khứ mà không di chuyển bất kỳ con trỏ nhánh nào.
- `git status`: Hiển thị cảnh báo màu vàng giải thích bạn đang ở trạng thái Detached HEAD tại commit nào.
- `git switch -c <tên-nhánh>`: Tạo nhánh mới ngay tại commit đang đứng để bảo tồn toàn bộ công sức thử nghiệm.
- `git switch main`: Lệnh an toàn đưa bạn trở lại nhánh chính để tiếp tục công việc bình thường.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng loạn tắt máy khi thấy thông báo Detached HEAD**: Nghĩ rằng repository bị hỏng; thực chất Git chỉ đang giải thích trạng thái bình thường.
2. **Commit thử nghiệm chán chê rồi gõ `git switch main` ngay**: Khiến các commit vừa tạo bị rơi vào trạng thái "mồ côi" (unreachable commit) và sẽ bị Git Garbage Collector dọn dẹp sau này.
3. **Quên mất mình đang ở detached HEAD**: Cứ thế viết thêm nhiều tính năng lớn mà không gắn nhánh, gây khó khăn cho việc quản lý sau này.

---

## 🧪 Lab
1. Chạy `git log --oneline` để chọn ra mã băm của commit cũ thứ hai trong danh sách.
2. Chạy lệnh: `git switch --detach <mã-commit-cũ>`.
3. Chạy `git status` và quan sát thông báo "HEAD detached at <mã-commit>".
4. Thử nghiệm xong, chạy lệnh `git switch main` để trở về nhánh chính an toàn.
5. Chạy lại `git status` để xác nhận bạn đã trở lại "On branch main".

---

## 💡 Hint
> Nếu bạn vừa viết code hay và muốn giữ lại khi đang ở trạng thái detached, gõ ngay `git switch -c ten-nhanh-moi` trước khi chuyển đi nơi khác!

---

## ✅ Validation
- Nhận diện chính xác thông báo HEAD detached khi chuyển tới một commit cụ thể.
- Quay về nhánh `main` thành công và khôi phục trạng thái làm việc bình thường.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để nắm vững bản chất của HEAD và cách xử trị trạng thái Detached HEAD chuyên nghiệp.

---

## 🔥 Challenge
Giả sử bạn đang ở trạng thái detached HEAD và vừa commit 2 mốc quan trọng. Đột nhiên bạn gõ nhầm `git switch main`. Làm thế nào để tìm lại 2 commit đó và gắn một nhánh mới cho chúng? (Gợi ý: công cụ gì ghi lại mọi di chuyển của HEAD?).

---

## 📚 Tổng kết
- HEAD là con trỏ đại diện cho vị trí làm việc hiện thời của bạn trong Git.
- Detached HEAD xuất hiện khi bạn soi trực tiếp vào commit thay vì bám vào tên nhánh.
- Luôn tạo nhánh mới bằng `git switch -c` nếu bạn muốn giữ lại các commit sinh ra trong lúc detached.
