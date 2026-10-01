# Repository, commit và vị trí HEAD

---

## 🎯 Mục tiêu
- Nhận biết `HEAD` là vị trí hiện tại trong lịch sử Git.
- Phân biệt tệp đang sửa với trạng thái đã lưu trong commit.

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
Biết `HEAD` giúp bạn hiểu Git đang làm việc trên nhánh nào và commit mới sẽ nối vào đâu. Nếu repository chưa có commit đầu tiên, lịch sử vẫn rỗng và chưa có commit để HEAD trỏ tới; bạn sẽ tạo mốc đầu tiên ở bài 6.

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
Giả sử dự án đã có ba commit. Nhánh `main` trỏ tới commit mới nhất; khi bạn đang làm trên nhánh này, HEAD theo `main`. Nếu đây là dự án mới chưa có commit, chưa có snapshot nào để xem — đó là trạng thái bình thường.

---

## 💻 Command
Bài này chỉ xây mô hình bằng sơ đồ, chưa cần chạy lệnh. Sau khi tạo commit đầu tiên ở bài 6, bạn sẽ dùng `git log` và `git show` để quan sát lịch sử thật.

---

## 🔍 Giải thích command
Chưa có lệnh thực hành ở bài này. Không chạy `git log` hoặc `git show HEAD` trong repository chưa có commit: Git chưa có lịch sử để hiển thị.

---

## ⚠️ Sai lầm phổ biến
1. **Nhầm HEAD với tên nhánh**:  `main` là tên nhánh; HEAD chỉ vị trí đang được chọn.
2. **Tưởng repository mới đã có commit để xem**:  Lịch sử chỉ bắt đầu sau khi tạo commit đầu tiên.
3. **Tự chuyển HEAD về commit cũ khi chưa học cách quay lại**:  Hãy chỉ xem commit cũ trong bài này.

---

## 🧪 Lab
Đọc sơ đồ ở trên và trả lời:
1. Commit nào là mốc mới nhất trong ví dụ?
2. Nhánh `main` đang trỏ tới commit nào?
3. HEAD đang theo nhánh hay trỏ thẳng vào commit?
4. Nếu repository chưa có commit nào, bạn có thể xem `git show HEAD` chưa? Vì sao?

---

## 💡 Hint
> HEAD là con trỏ chỉ vị trí làm việc hiện tại của bạn trong đồ thị commit.

---

## ✅ Validation
- Bạn xác định được HEAD theo `main` và nhánh `main` trỏ tới Commit C trong ví dụ.
- Bạn giải thích được repository mới chưa có commit để hiển thị bằng `git show HEAD`.

---

## ❓ Quiz
Làm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD.

---

## 🔥 Challenge
Nêu sự khác nhau giữa con trỏ nhánh bình thường và con trỏ HEAD trong Git.

---

## 📚 Tổng kết
- HEAD cho biết nhánh hoặc commit đang được chọn.
- Repository chưa có commit thì chưa có snapshot nào để xem.
- Commit mới trên nhánh làm nhánh đó chuyển sang commit mới.
