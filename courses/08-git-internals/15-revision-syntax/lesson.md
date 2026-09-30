# Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2

---

## 🎯 Mục tiêu bài học
- Phân biệt tuyệt đối và chính xác giữa hai toán tử điều hướng commit: dấu ngã (~) và dấu mũ (^).
- Hiểu quy tắc: HEAD~n là đi lùi n thế hệ tổ tiên theo nhánh chính; HEAD^n là chọn commit cha thứ n trong Merge Commit.
- Sử dụng lệnh plumbing git rev-parse để phân giải mọi cú pháp revision phức tạp thành mã băm SHA-1 duy nhất.

---

## 📖 Định nghĩa
> Cú pháp Revision (Revision Syntax) là hệ thống ký hiệu điều hướng cho phép bạn tham chiếu tới bất kỳ commit nào trong lịch sử đồ thị DAG của Git mà không cần phải sao chép mã băm SHA-1. Hai toán tử then chốt và dễ gây nhầm lẫn nhất là Dấu ngã (Tilde ~) và Dấu mũ (Caret ^). Toán tử `HEAD~n` điều hướng lùi về n thế hệ theo tuyến tính tổ tiên cha đầu tiên; trong khi toán tử `HEAD^n` dùng để chọn người cha thứ n của một Merge Commit có nhiều nhánh hợp nhất.

---

## 🤔 Tại sao cần?
Nhầm lẫn giữa cú pháp `HEAD~2` và `HEAD^2` là một trong những sai lầm phổ biến và nguy hiểm nhất của các kỹ sư Git. Khi bạn muốn hoàn tác hai commit gần nhất bằng lệnh reset hay xem sự khác biệt bằng lệnh diff, nếu gõ nhầm toán tử trên một Merge Commit, bạn có thể vô tình nhảy sang một nhánh phụ hoàn toàn xa lạ thay vì đi ngược dòng lịch sử của nhánh chính, dẫn đến việc xóa nhầm dữ liệu hoặc hiểu sai biến động mã nguồn.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng sơ đồ gia phả gia đình qua các thế hệ nối tiếp nhau: Dấu ngã (~) giống như việc đi ngược dòng thời gian về các đời trước trên nhánh phả hệ chính: `Tôi~1` là Bố tôi, `Tôi~2` là Ông nội tôi, `Tôi~3` là Cụ nội tôi (đi thẳng một mạch theo trục dọc thế hệ). Còn dấu mũ (^) xuất hiện khi một người có cả Bố và Mẹ hợp nhất (Merge Commit): `Tôi^1` là Bố tôi (người cha thứ nhất), và `Tôi^2` là Mẹ tôi (người cha thứ hai ở nhánh phụ).

---

## 🖼️ Sơ đồ minh họa
```text
Sự khác biệt trực quan giữa ~ và ^ trên đồ thị Merge:
          (Commit C1) ──► (Commit C2) ──┐ [Nhánh phụ được merge]
                                         ▼
(Commit A1) ──► (Commit A2) ──────────► [Commit M (Merge Commit)] ◄── HEAD

Từ vị trí HEAD (Commit M):
• HEAD~1 = A2   (Đi lùi 1 thế hệ theo nhánh chính)
• HEAD~2 = A1   (Đi lùi 2 thế hệ theo nhánh chính)
• HEAD^1 = A2   (Chọn cha thứ nhất: nhánh chính)
• HEAD^2 = C2   (Chọn cha thứ hai: nhánh phụ vừa được merge vào!)
• HEAD^2~1 = C1 (Đi sang cha thứ hai rồi lùi thêm 1 thế hệ!)
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư muốn kiểm tra sự khác biệt giữa phiên bản hiện tại sau khi merge và mã nguồn của nhánh tính năng trước khi được gộp vào. Nếu kỹ sư gõ `git diff HEAD~1`, Git sẽ so sánh với commit cha trên nhánh main. Để so sánh chính xác với commit cuối cùng của nhánh tính năng được gộp vào, kỹ sư sử dụng toán tử dấu mũ: `git diff HEAD^2`. Lệnh git rev-parse HEAD^2 trả về chính xác mã băm của commit tính năng trên nhánh phụ. Sự hiểu biết chính xác về cú pháp revision giúp kỹ sư kiểm tra mã nguồn đa nhánh một cách chuẩn xác 100%.

---

## 💻 Command & Lệnh thao tác
```bash
git rev-parse HEAD~1
git rev-parse HEAD^2
git rev-parse main@{yesterday}
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git rev-parse là công cụ nền tảng tiếp nhận bất kỳ chuỗi cú pháp revision nào (như HEAD~1, HEAD^2, hoặc nhãn thời gian reflog) và giải mã chính xác thành mã băm 40 ký tự SHA-1 duy nhất, hỗ trợ định vị các nút trên đồ thị commit một cách chuẩn xác.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nghĩ rằng `HEAD~2` và `HEAD^2` luôn luôn giống nhau**:  Chúng chỉ vô tình giống nhau khi commit đó là commit đơn tuyến tính không có merge commit.
2. **Gõ `HEAD^2` trên một commit thông thường chỉ có một commit cha duy nhất**:  Git sẽ báo lỗi "fatal: ambiguous argument: unknown revision" vì không tồn tại người cha thứ hai.
3. **Không biết cách kết hợp chuỗi toán tử như `HEAD~2^2` để định hướng sâu vào các đồ thị phức tạp.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một lịch sử có rẽ nhánh và thực hiện merge để tạo ra một Merge Commit.
2. Sử dụng `git rev-parse HEAD~1` và ghi lại mã băm trả về.
3. Sử dụng `git rev-parse HEAD^2` và quan sát mã băm thuộc về nhánh phụ vừa được hợp nhất.
4. Đối chiếu kết quả với sơ đồ đồ thị của `git log --graph --oneline`.

---

## 💡 Gợi ý thực hiện (Hint)
> Ghi nhớ câu thần chú: "Dấu ngã (~) là leo cây gia phả thế hệ lùi dần; Dấu mũ (^) là chọn nhánh rẽ của ngã ba hợp nhất".

---

## ✅ Kiểm tra kết quả (Validation)
Phân giải chính xác mã băm của commit cha thứ nhất và commit cha thứ hai của một merge commit.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra khả năng định vị đồ thị commit qua bài trắc nghiệm về cú pháp revision.

---

## 🔥 Thử thách nâng cao (Challenge)
Biểu thức revision `HEAD~3^2~1` có nghĩa là gì trên sơ đồ cây commit của Git?

---

## 📚 Tổng kết kiến thức
- Toán tử `~n` (Tilde) đi lùi n thế hệ theo tuyến tính tổ tiên đầu tiên (nhánh chính).
- Toán tử `^n` (Caret) dùng để chọn người cha thứ n của một Merge Commit.
- `git rev-parse` là lệnh plumbing chuyển đổi mọi cú pháp biểu thức revision thành mã băm SHA-1.
