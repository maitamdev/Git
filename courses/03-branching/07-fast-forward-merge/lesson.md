# Hợp nhất tua nhanh (fast-forward merge)

---

## 🎯 Mục tiêu
- Nhận ra khi nhánh hiện tại có thể tiến thẳng tới commit của nhánh cần gộp.
- Chạy `git merge <nhánh>` khi đang đứng trên nhánh nhận thay đổi.
- Giải thích vì sao fast-forward không tạo merge commit.

---

## 🧩 Từ khóa hôm nay

### Fast-forward — tua nhanh con trỏ
- **Nói dễ hiểu:** Nhánh nhận thay đổi chưa có commit riêng kể từ lúc nhánh kia tách ra.
- **Ví dụ:** `main` đứng yên trong lúc `feature` có thêm hai commit.
- **Đừng nhầm:** Git chỉ dịch chuyển con trỏ `main` tới commit mới; không tạo merge commit.

### Nhánh đích — nơi nhận thay đổi
- **Nói dễ hiểu:** Nhánh bạn đang đứng khi chạy `git merge`.
- **Ví dụ:** Muốn đưa `feature-cart` vào `main`, chuyển sang `main` trước.
- **Đừng nhầm:** Đứng trên `feature-cart` rồi merge `main` sẽ đưa thay đổi theo hướng ngược lại.

### `--no-ff` — giữ mốc hợp nhất
- **Nói dễ hiểu:** Buộc Git tạo commit hợp nhất dù có thể tua nhanh.
- **Ví dụ:** `git merge --no-ff feature-cart` ghi lại riêng lần tích hợp.
- **Đừng nhầm:** Cờ này không tua nhanh; nó tạo commit có hai cha.

---

## 📖 Định nghĩa
Fast-forward xảy ra khi commit hiện tại của nhánh đích là tổ tiên của nhánh được gộp. Git có thể đưa con trỏ nhánh đích tới commit mới hơn mà không tạo commit hợp nhất. Nếu hai nhánh đã có commit riêng, điều kiện này không còn đúng; đó là tình huống học ở bài 3-way merge.

---

## 🤔 Tại sao cần?
Khi nhánh đích chưa có thay đổi riêng, tua nhanh giữ lịch sử thẳng và dễ đọc. Nếu nhóm muốn lưu dấu một lần tích hợp dù lịch sử có thể đi thẳng, `--no-ff` yêu cầu Git tạo merge commit riêng.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng `main` đang đứng ở cột mốc C3, còn `feature` đã đi tiếp tới C5. Nếu không có con đường khác tiến lên từ C3, `main` chỉ cần chuyển tới C5. Nếu nhóm muốn ghi rõ “ở đây đã tích hợp feature”, dùng `--no-ff` để tạo thêm một mốc hợp nhất.

---

## 🖼 Sơ đồ
```text
Trước:
C1 ── C2 ── C3 (main) ── C4 ── C5 (feature)

Sau `git switch main` rồi `git merge feature`:
C1 ── C2 ── C3 ── C4 ── C5 (main, feature)
```

---

## 🌎 Ví dụ thực tế
Đức tạo `fix-typo` từ `main`, sửa lỗi chính tả rồi tạo hai commit. Trong lúc đó không có commit mới trên `main`. Đức chuyển về `main`, chạy `git merge fix-typo`; Git có thể đưa `main` tới commit mới nhất của nhánh sửa lỗi mà không tạo commit hợp nhất mới.

---

## 💻 Command
```bash
git switch main
git merge <tên-nhánh>
git merge --no-ff <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git switch main`: Chọn nhánh sẽ nhận thay đổi.
- `git merge <tên-nhánh>`: Gộp lịch sử của nhánh được nêu vào nhánh hiện tại; Git dùng fast-forward nếu có thể.
- `git merge --no-ff <tên-nhánh>`: Yêu cầu tạo một merge commit thay vì tua nhanh.

---

## ⚠️ Sai lầm phổ biến
1. **Đứng trên nhánh nguồn:** Merge sẽ cập nhật nhánh hiện tại, nên kiểm tra `git status` trước.
2. **Chờ merge commit sau fast-forward:** Fast-forward chỉ di chuyển con trỏ; không sinh commit mới.
3. **Cho rằng mọi lần merge đều tua nhanh:** Nếu nhánh đích cũng có commit riêng, Git cần cách hợp nhất khác.

---

## 🧪 Lab
1. Chạy `git switch -c ff-demo`.
2. Tạo `feature.js`, ghi một dòng, rồi chạy `git add feature.js` và `git commit -m "feat: add feature file"`.
3. Chạy `git switch main`.
4. Chạy `git merge ff-demo`; xác nhận terminal báo `Fast-forward`.
5. Chạy `git log --oneline`; xác nhận commit tính năng nằm trong lịch sử `main`.

---

## 💡 Hint
> Đứng trên nhánh nhận thay đổi rồi gọi tên nhánh nguồn trong `git merge`.

---

## ✅ Validation
- Lệnh merge hoàn tất và báo `Fast-forward`.
- `git log --oneline` trên `main` có commit `feat: add feature file`.

---

## ❓ Quiz
Trả lời các câu hỏi để kiểm tra điều kiện và kết quả của fast-forward.

---

## 🔥 Challenge
Tạo nhánh tính năng mới từ `main`, commit một tệp, rồi merge bằng `--no-ff`. Dùng `git log --oneline` để tìm commit merge và so sánh với fast-forward ở lab.

---

## 📚 Tổng kết
- Fast-forward chỉ xảy ra khi nhánh đích là tổ tiên của nhánh nguồn.
- Chuyển sang nhánh đích trước khi chạy merge.
- `--no-ff` tạo merge commit để lưu dấu lần tích hợp.
