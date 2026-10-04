# Hợp nhất tua nhanh (fast-forward merge)

---

## 🎯 Mục tiêu
- Nắm vững điều kiện hình thành và bản chất cơ chế của Fast-Forward Merge.
- Thành thạo thao tác gộp nhánh: đứng đúng vị trí nhánh đích và gọi tên nhánh nguồn.
- Hiểu rõ sự khác biệt giữa tua nhanh mặc định và kỹ thuật ép tạo mốc với cờ `--no-ff`.

---

## 🧩 Từ khóa hôm nay

### Fast-forward — tua nhanh con trỏ
- **Nói dễ hiểu:** Hành động Git dịch chuyển tịnh tiến con trỏ nhánh đích tiến thẳng tới commit mới nhất của nhánh nguồn khi lịch sử là một đường thẳng.
- **Ví dụ:** Nhánh `main` đứng yên ở commit C2 trong khi `feature` tiến tới C4; khi merge, con trỏ `main` trượt thẳng tới C4.
- **Đừng nhầm:** Fast-forward chỉ di chuyển con trỏ, hoàn toàn không sinh ra thêm bất kỳ commit mới nào trong lịch sử.

### Nhánh đích — nơi nhận thay đổi
- **Nói dễ hiểu:** Nhánh mà bạn đang đứng chân vào tại khoảnh khắc bạn gõ lệnh `git merge`.
- **Ví dụ:** Muốn tích hợp code của `feature-cart` vào `main`, bạn phải chuyển sang đứng ở `main` trước rồi mới gọi lệnh merge.
- **Đừng nhầm:** Nếu bạn đứng ở nhánh `feature-cart` rồi merge `main`, bạn đang làm ngược lại: kéo code của main vào nhánh tính năng!

### `--no-ff` — giữ mốc hợp nhất
- **Nói dễ hiểu:** Cờ tùy chọn yêu cầu Git từ chối tua nhanh, ép buộc tạo ra một commit gộp (merge commit) có 2 cha để lưu dấu lịch sử.
- **Ví dụ:** `git merge --no-ff feature-cart` tạo một mốc ghi nhận rõ ràng: "Tính năng giỏ hàng đã được tích hợp tại đây".
- **Đừng nhầm:** Cờ này làm đồ thị lịch sử rẽ nhánh rồi nhập lại, phù hợp với quản lý phát hành phiên bản lớn.

---

## 📖 Định nghĩa
Fast-Forward Merge (hợp nhất tua nhanh) là cơ chế gộp nhánh đơn giản và thanh lịch nhất của Git. Hiện tượng này xảy ra khi nhánh đích (nhánh nhận thay đổi) không hề có bất kỳ commit mới nào kể từ thời điểm nhánh tính năng được tách ra. Khi đó, Git chỉ việc 'tua nhanh' con trỏ của nhánh đích tiến thẳng tới vị trí commit mới nhất của nhánh tính năng mà không cần tạo thêm commit gộp nào.

---

## 🤔 Tại sao cần?
Fast-forward giúp giữ cho đồ thị lịch sử của dự án hoàn toàn thẳng tắp, sạch sẽ và cực kỳ dễ đọc. Bạn không phải đau đầu xử lý các commit gộp rác (merge commits) không cần thiết cho những thay đổi tuần tự. Tuy nhiên, khi làm việc trong các quy trình lớn như Git Flow, kỹ sư đôi khi cố ý dùng cờ `--no-ff` để ép Git tạo một commit gộp nhằm lưu dấu thời khắc hoàn thành một tính năng quan trọng.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng bạn và một người bạn cùng đọc chung một cuốn sách. Bạn dừng lại đánh dấu ở trang 50. Người bạn mượn sách đọc tiếp một mạch tới trang 80. Khi người bạn trả lại sách, cuốn sách không có gì bị xé hay viết đè; bạn chỉ việc nhấc chiếc thẻ đánh dấu trang của mình từ trang 50 đặt sang trang 80. Đó chính xác là cách Fast-Forward hoạt động!

---

## 🖼 Sơ đồ
```text
CƠ CHẾ TUA NHANH FAST-FORWARD:

Trước khi merge:
  (C1) ── (C2: main) ── (C3) ── (C4: feature)

Đứng ở main, chạy: `git merge feature`

Sau khi merge:
  (C1) ── (C2) ────── (C3) ── (C4: main, feature)
  (Con trỏ `main` trượt thẳng tới C4. Lịch sử hoàn toàn thẳng hàng!)
```

---

## 🌎 Ví dụ thực tế
Bạn tạo nhánh `fix-typo` từ `main` để sửa vài lỗi chính tả trên trang giới thiệu và tạo 2 commit. Trong lúc bạn làm, không có đồng đội nào commit lên `main`. Khi chuyển về `main` và gõ `git merge fix-typo`, terminal thông báo 'Fast-forward' và con trỏ `main` lập tức nhảy lên đón nhận 2 commit của bạn mà không tốn thêm một byte nào để tạo commit gộp.

---

## 💻 Command
```bash
git switch main
git merge feature-branch
git merge --no-ff feature-branch
git log --oneline --graph
```

---

## 🔍 Giải thích command
- `git switch main`: Quy tắc bất di bất dịch: muốn kéo code vào đâu, phải đứng chân ở đó trước!
- `git merge feature-branch`: Yêu cầu Git tích hợp nhánh tính năng vào nhánh hiện tại; Git tự động dùng Fast-forward nếu thỏa mãn điều kiện đường thẳng.
- `git merge --no-ff feature-branch`: Ép buộc Git tạo một commit merge độc lập bất chấp có thể tua nhanh.

---

## ⚠️ Sai lầm phổ biến
1. **Đứng nhầm nhánh khi merge**: Đang đứng ở nhánh con lại gõ `git merge main`, vô tình đưa code dở dang vào tình huống lộn xộn.
2. **Ngơ ngác tìm kiếm commit gộp sau Fast-forward**: Tưởng merge bị lỗi vì không thấy commit mới sinh ra; Fast-forward chỉ trượt con trỏ chứ không tạo commit mới.
3. **Nghĩ rằng mọi lần merge đều là Fast-forward**: Chỉ cần nhánh chính có một commit mới bất kỳ do người khác đẩy lên, Fast-forward sẽ không thể diễn ra.

---

## 🧪 Lab
1. Chạy `git switch -c ff-demo` để tạo và bước sang nhánh thử nghiệm.
2. Tạo file `feature.js` với một dòng code bất kỳ, chạy `git add feature.js` và `git commit -m "feat: add feature file"`.
3. Chạy `git switch main` để trở về nhánh chính.
4. Chạy `git merge ff-demo`; quan sát terminal xuất hiện dòng chữ `Fast-forward`.
5. Chạy `git log --oneline` và xác nhận commit của nhánh tính năng đã nằm ngay ngắn trong lịch sử của `main`.

---

## 💡 Hint
> Ghi nhớ nguyên tắc: "Muốn rót nước vào cốc nào, phải cầm cốc đó trên tay!" — Muốn gộp code vào `main`, phải `git switch main` trước!

---

## ✅ Validation
- Lệnh merge thành công rực rỡ và báo cáo chế độ `Fast-forward`.
- Lịch sử `git log --oneline` trên `main` chứa trọn vẹn commit mới mà không sinh thêm commit rác.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để kiểm tra mức độ am hiểu về điều kiện và hành vi của Fast-forward merge.

---

## 🔥 Challenge
Hãy tạo một nhánh tính năng mới, commit một file rồi thực hiện merge bằng cờ `git merge --no-ff`. So sánh đồ thị hiển thị trong `git log --oneline --graph` giữa cách merge này với cách Fast-forward thông thường. Khi nào đội ngũ của bạn nên chọn `--no-ff`?

---

## 📚 Tổng kết
- Fast-forward là cơ chế trượt con trỏ nhẹ nhàng khi lịch sử hai nhánh là một đường thẳng đơn nhất.
- Luôn chuyển sang nhánh đích trước khi chạy lệnh `git merge`.
- Sử dụng `--no-ff` khi bạn muốn tạo dấu mốc tích hợp chính thức có cấu trúc 2 commit cha.
