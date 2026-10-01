# Con trỏ HEAD & Detached HEAD

---

## 🎯 Mục tiêu
- Hiểu được con trỏ HEAD dùng để định vị nhánh và commit bạn đang làm việc.
- Nhận biết trạng thái Detached HEAD khi quay lại xem một commit cũ trong lịch sử.
- Biết cách dùng `git switch` để quay lại nhánh an toàn mà không làm mất commit thử nghiệm.

---

## 🧩 Từ khóa hôm nay

### HEAD — con trỏ vị trí hiện tại
- **Nói dễ hiểu:** Mắt đọc cho biết bạn đang đứng ở nhánh hoặc commit nào trong kho lưu trữ.
- **Ví dụ:** Khi chạy `git status`, dòng đầu tiên báo `On branch main` vì HEAD đang gắn vào nhánh `main`.
- **Đừng nhầm:** HEAD không phải là một commit độc lập; nó là nhãn chỉ vào nhánh hoặc commit bạn đang mở.

### Detached HEAD — trạng thái rời nhánh
- **Nói dễ hiểu:** Tình trạng HEAD trỏ thẳng vào một commit cụ thể thay vì trỏ thông qua một tên nhánh.
- **Ví dụ:** Chạy `git checkout a1b2c3d` để xem lại mã nguồn của tuần trước sẽ đưa bạn vào Detached HEAD.
- **Đừng nhầm:** Detached HEAD không phải lỗi hỏng kho lưu trữ; đây là chế độ xem lại lịch sử hoàn toàn bình thường.

### git switch — lệnh chuyển nhánh an toàn
- **Nói dễ hiểu:** Câu lệnh chuyên trách để chuyển đổi giữa các nhánh hoặc thoát khỏi Detached HEAD.
- **Ví dụ:** Chạy `git switch main` để đưa không gian làm việc quay trở về đỉnh nhánh chính.
- **Đừng nhầm:** `git switch` chỉ chuyển nhánh; để khôi phục tệp bị sửa đổi bạn dùng `git restore`.

---

## 📖 Định nghĩa
HEAD là con trỏ đặc biệt trong Git cho biết vị trí làm việc hiện tại của bạn. Bình thường, HEAD trỏ vào một nhánh (như `main`). Khi bạn chuyển thẳng tới một commit cũ bằng mã hash, HEAD sẽ rời khỏi nhánh và rơi vào trạng thái Detached HEAD.

---

## 🤔 Tại sao cần?
Khi dự án gặp lỗi mà không rõ nguyên nhân, bạn thường cần quay lại các phiên bản cũ trong quá khứ để chạy thử và kiểm tra. Hiểu cách HEAD hoạt động giúp bạn tự tin xem lại lịch sử mà không sợ làm mất dữ liệu hay làm xáo trộn nhánh chính.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung HEAD giống như chiếc kim đọc đĩa than. Khi kim đặt vào rãnh `main`, loa phát bài hát của nhánh `main`. Khi bạn nhấc kim đặt tự do vào một đoạn cũ giữa đĩa than (Detached HEAD), bạn vẫn nghe được đoạn nhạc cũ đó. Khi muốn nghe lại bài hát chính, bạn chỉ cần gạt kim về lại rãnh `main`.

---

## 🖼 Sơ đồ
```text
Trạng thái bình thường:
HEAD ───> main ───> Commit C3

Trạng thái Detached HEAD:
HEAD ─────────────> Commit C1 (đang xem lại bản cũ)
main ─────────────> Commit C3 (vẫn ở đỉnh)
```

---

## 🌎 Ví dụ thực tế
Bạn đang làm web bán hàng và khách báo rằng chức năng thanh toán vừa bị lỗi sáng nay. Bạn xem mã commit của ngày hôm qua là `e8a1b2c`. Bạn checkout về commit đó để kiểm tra thử. Sau khi xác nhận hôm qua vẫn thanh toán tốt, bạn dùng lệnh `git switch main` để quay về code mới nhất mà không ảnh hưởng gì đến dự án.

---

## 💻 Command
```bash
git status
git checkout <commit-hash>
git switch main
git switch -c <tên-nhánh-mới>
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị bạn đang đứng ở nhánh nào hoặc đang ở trạng thái Detached HEAD tại commit nào.
- `git checkout <commit-hash>`: Đưa HEAD về một commit cụ thể trong quá khứ.
- `git switch main`: Chuyển HEAD quay trở lại gắn vào nhánh `main`.
- `git switch -c <tên-nhánh-mới>`: Tạo nhánh mới ngay tại vị trí commit hiện tại để giữ lại các thử nghiệm.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng loạn khi thấy chữ Detached HEAD:** Đây là thông báo trạng thái bình thường của Git khi bạn xem lại commit cũ.
2. **Commit thử nghiệm khi rời nhánh rồi chuyển đi mà không tạo nhánh:** Các commit này sẽ bị mồ côi vì không có tên nhánh nào trỏ vào.
3. **Dùng nhầm `git checkout` với tệp:** Nên dùng `git switch` cho nhánh và `git restore` cho tệp để tránh nhầm lẫn.

---

## 🧪 Lab
Bài học này là bài tự kiểm tra hiểu biết trên terminal của bạn:
1. Chạy `git log --oneline` để lấy mã hash của một commit trước đó.
2. Chạy `git checkout <mã-hash>` để quan sát thông báo Detached HEAD từ Git.
3. Chạy `git status` để đọc lời nhắc của Git về vị trí con trỏ hiện tại.
4. Chạy `git switch main` để đưa HEAD trở lại nhánh `main`.

---

## 💡 Hint
Khi ở Detached HEAD, nếu bạn tạo commit muốn giữ lại, hãy gõ `git switch -c <nhánh-mới>` trước khi chuyển đi nơi khác.

---

## ✅ Validation
- Sau khi chạy `git switch main`, lệnh `git status` báo rõ `On branch main`.
- Thư mục làm việc trở về trạng thái của commit mới nhất trên nhánh chính.

---

## ❓ Quiz
Trả lời các câu hỏi sau để kiểm tra kiến thức về con trỏ HEAD và trạng thái Detached HEAD.

---

## 🔥 Challenge
Mở tệp `.git/HEAD` bằng trình đọc tệp khi đang ở nhánh `main` và khi đang ở Detached HEAD để so sánh nội dung bên trong.

---

## 📚 Tổng kết
- HEAD chỉ định vị trí commit mà thư mục làm việc của bạn đang hiển thị.
- Detached HEAD xuất hiện khi bạn đưa HEAD trỏ thẳng vào commit thay vì qua tên nhánh.
- Dùng `git switch main` để quay về an toàn, hoặc `git switch -c` nếu muốn giữ lại commit thử nghiệm.
