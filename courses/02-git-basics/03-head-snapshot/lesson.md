# Repository & HEAD Snapshot

---

## 🎯 Mục tiêu
- Nhận biết `HEAD` là vị trí hiện tại trong lịch sử Git.
- Phân biệt tệp đang sửa với trạng thái đã lưu trong commit.
- Dùng `git show HEAD` để xem commit hiện tại.

---

## 🧩 Từ khóa hôm nay

### HEAD — vị trí Git đang đứng
- **Nói dễ hiểu:** Tên giúp Git biết commit hoặc nhánh hiện đang được chọn.
- **Ví dụ:** Khi đang làm trên `main`, HEAD thường theo nhánh `main`.
- **Đừng nhầm:** HEAD không phải tên của tệp hoặc commit message.

### Commit snapshot — trạng thái đã lưu
- **Nói dễ hiểu:** Một commit ghi nhận trạng thái dự án tại một mốc.
- **Ví dụ:** Commit “Tạo trang chủ” là một mốc có thể xem lại.
- **Đừng nhầm:** Snapshot không tự đổi khi bạn sửa tệp về sau.

### Branch — nhánh lịch sử
- **Nói dễ hiểu:** Tên dễ nhớ cho commit hiện tại của một dòng phát triển.
- **Ví dụ:** `main` thường là tên nhánh ban đầu của dự án.
- **Đừng nhầm:** Nhánh không phải bản sao đầy đủ riêng của mọi tệp.

---

## 📖 Định nghĩa
Repository là nơi Git giữ các commit đã tạo. `HEAD` cho Git biết bạn đang ở nhánh hoặc commit nào. Khi tạo commit mới trên một nhánh, nhánh đó sẽ trỏ tới commit mới.

---

## 🤔 Tại sao cần?
Biết `HEAD` đang chỉ vào đâu giúp bạn đọc `git status`, `git log` và hiểu commit mới được tạo ở vị trí nào. Hôm nay chỉ cần nhận diện vị trí hiện tại; các cách di chuyển lịch sử sẽ học sau.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem HEAD như nhãn “đang ở đây”: nó chỉ nhánh hoặc commit đang được chọn.

---

## 🖼 Sơ đồ
```text
Mô hình con trỏ HEAD trong Repository:
[Commit A] ◄── [Commit B] ◄── [Commit C] ◄── [main]
                                                ▲
                                                │
                                              [HEAD] (Đang trỏ vào nhánh main tại Commit C)
```

---

## 🌎 Ví dụ thực tế
Sau khi tạo commit, chạy `git show HEAD` để xem mốc mới nhất mà nhánh hiện tại đang trỏ tới.

---

## 💻 Command
```bash
git log --oneline
git show HEAD
```

---

## 🔍 Giải thích command
- `git log --oneline`: Hiển thị lịch sử commit; `HEAD` đánh dấu vị trí hiện tại.
- `git show HEAD`: Hiển thị thông tin và thay đổi của commit hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Nhầm HEAD với tên nhánh**:  `main` là tên nhánh; HEAD chỉ vị trí đang được chọn.
2. **Nghĩ `git show HEAD` sẽ sửa dự án**:  Lệnh này chỉ hiển thị thông tin.
3. **Tự chuyển HEAD về commit cũ khi chưa học cách quay lại**:  Hãy chỉ xem commit cũ trong bài này.

---

## 🧪 Lab
1. Chạy lệnh `git log --oneline` để quan sát vị trí xuất hiện của nhãn `HEAD -> main`.
2. Chạy lệnh `git show HEAD` để xem chi tiết snapshot commit mới nhất.
3. Xác định HEAD đang theo nhánh hiện tại trong kết quả.

---

## 💡 Hint
> HEAD là con trỏ chỉ vị trí làm việc hiện tại của bạn trong đồ thị commit.

---

## ✅ Validation
- Xác định được commit mà HEAD đang trỏ tới thông qua git log.

---

## ❓ Quiz
Làm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD.

---

## 🔥 Challenge
Nêu sự khác nhau giữa con trỏ nhánh bình thường và con trỏ HEAD trong Git.

---

## 📚 Tổng kết
- HEAD cho biết nhánh hoặc commit đang được chọn.
- `git show HEAD` xem commit hiện tại mà không sửa tệp.
- Commit mới trên nhánh làm nhánh đó chuyển sang commit mới.
