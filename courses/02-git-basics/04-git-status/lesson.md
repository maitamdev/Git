# Kiểm tra trạng thái với git status

---

## 🎯 Mục tiêu
- Chạy `git status` để biết tệp nào mới, đã sửa hoặc đã staged.
- Phân biệt ba nhóm: staged, chưa staged và untracked.
- Đọc hai cột trạng thái cơ bản trong `git status -s`.

---

## 🧩 Từ khóa hôm nay

### `git status` — xem tình trạng tệp
- **Nói dễ hiểu:** Lệnh cho biết tệp nào mới, đã sửa hoặc đã chọn để commit.
- **Ví dụ:** Chạy `git status` sau khi tạo `note.txt`.
- **Đừng nhầm:** Lệnh chỉ báo trạng thái, không tự sửa tệp.

### Untracked — chưa được theo dõi
- **Nói dễ hiểu:** Tệp mới mà Git chưa được yêu cầu đưa vào lịch sử.
- **Ví dụ:** `note.txt` mới thường hiện ở mục “Untracked files”.
- **Đừng nhầm:** Untracked không có nghĩa Git đã xóa tệp.

### Staged — đã chuẩn bị cho commit
- **Nói dễ hiểu:** Thay đổi đã được chọn vào mốc commit kế tiếp.
- **Ví dụ:** `git status` liệt kê tệp dưới “Changes to be committed”.
- **Đừng nhầm:** Staged không có nghĩa commit đã được tạo.

### Unstaged — chưa chuẩn bị cho commit
- **Nói dễ hiểu:** Tệp đã sửa nhưng thay đổi mới chưa được chọn vào commit.
- **Ví dụ:** Sửa tệp sau khi đã chạy `git add`.
- **Đừng nhầm:** Tệp vẫn nằm trên máy; thay đổi này chỉ chưa staged.

---

## 📖 Định nghĩa
`git status` là lệnh báo cáo tình trạng hiện tại của kho Git. Hãy đọc tên nhóm thay đổi; màu chữ có thể khác nhau theo terminal.

---

## 🤔 Tại sao cần?
Chạy `git status` trước khi commit giúp bạn biết chính xác thay đổi nào sẽ được lưu, thay đổi nào còn ở ngoài. Đây là cách đơn giản để phát hiện tệp chưa được chọn hoặc đang sửa dở.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem `git status` như bảng kiểm: phần nào đã chọn cho commit, phần nào còn sửa, và tệp nào Git chưa theo dõi.

---

## 🖼 Sơ đồ
```text
Ví dụ báo cáo từ git status:
┌─────────────────────────────────────────────────────────────┐
│ On branch main                                              │
│                                                             │
│ Changes to be committed:          <── Đã staged             │
│   (use "git restore --staged <file>" to unstage)            │
│         new file:   index.html                              │
│                                                             │
│ Changes not staged for commit:    <── Chưa staged           │
│   (use "git add <file>" to update what will be committed)   │
│         modified:   styles.css                              │
│                                                             │
│ Untracked files:                  <── Chưa được theo dõi    │
│         notes.txt                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Bạn tạo `notes.txt` rồi sửa `styles.css`. Chạy `git status` để xem `notes.txt` trong nhóm Untracked và `styles.css` trong nhóm chưa staged.

---

## 💻 Command
```bash
git status
git status -s
git status --short
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị báo cáo trạng thái chi tiết kèm theo các chỉ dẫn và câu lệnh gợi ý hoàn tác hữu ích.
- `git status -s` (hoặc `--short`): Hiển thị trạng thái gọn; cột trái nói về Staging Area, cột phải nói về Working Tree.

---

## ⚠️ Sai lầm phổ biến
1. **Không kiểm tra trạng thái trước khi commit**:  Có thể bỏ sót hoặc đưa nhầm tệp vào commit.
2. **Bỏ qua tệp Untracked**:  Tệp mới chưa được Git theo dõi và chưa nằm trong commit.
3. **Hiểu sai định dạng git status -s**:  Nhầm lẫn giữa cột ký tự bên trái (Staging Area) và cột bên phải (Working Tree).

---

## 🧪 Lab
1. Chạy lệnh `git status` trong kho lưu trữ để làm quen với giao diện kết quả mặc định.
2. Tạo một tệp mới và chạy `git status` để quan sát nhóm Untracked files.
3. Thử nghiệm cờ rút gọn bằng câu lệnh `git status -s`.

---

## 💡 Hint
> Hãy tạo phản xạ gõ `git status` trước bất kỳ lệnh add, commit hay chuyển nhánh nào.

---

## ✅ Validation
- Thực thi thành công `git status` và nhận diện đúng các khu vực trạng thái.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra khả năng đọc hiểu lệnh git status.

---

## 🔥 Challenge
Tạo một tệp mới, chạy `git status -s`, rồi giải thích vì sao tệp hiện ký hiệu `??`.

---

## 📚 Tổng kết
- `git status` báo cáo những thay đổi staged, chưa staged và untracked.
- Màu sắc chỉ để trang trí; đọc tên nhóm hoặc ký hiệu trạng thái.
- Dùng lệnh này trước commit để biết mình sắp lưu những gì.
