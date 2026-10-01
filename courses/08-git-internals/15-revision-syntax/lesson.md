# Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2

---

## 🎯 Mục tiêu
- Phân biệt tuyệt đối và chính xác giữa hai toán tử điều hướng commit: dấu ngã (~) và dấu mũ (^).
- Hiểu quy tắc: `HEAD~n` là đi lùi n thế hệ tổ tiên theo nhánh chính; `HEAD^n` là chọn commit cha thứ n trong Merge Commit.
- Sử dụng lệnh plumbing `git rev-parse` để phân giải mọi cú pháp revision phức tạp thành mã băm SHA-1 duy nhất.
- Kết hợp linh hoạt các chuỗi toán tử để định vị bất kỳ nút nào trên đồ thị DAG.

---

## 🧩 Từ khóa hôm nay

### Tilde Operator (HEAD~n)
- **Nói dễ hiểu**: Toán tử dấu ngã dùng để đi lùi tuyến tính n thế hệ theo chuỗi cha đầu tiên (cha, ông nội, cụ kỵ).
- **Ví dụ**: Biểu thức `HEAD~3` tương đương với `HEAD~~~`, đi lùi 3 commit trên nhánh hiện tại.
- **Đừng nhầm**: Không nhảy sang nhánh phụ khi gặp merge commit; nó luôn bám theo commit cha thứ nhất (first parent).

### Caret Operator (HEAD^n)
- **Nói dễ hiểu**: Toán tử dấu mũ dùng để chọn người cha thứ n của một Merge Commit có nhiều nhánh hợp nhất lại.
- **Ví dụ**: Tại một điểm merge, `HEAD^1` là cha trên nhánh chính và `HEAD^2` là commit cuối của nhánh phụ được merge vào.
- **Đừng nhầm**: Nếu commit chỉ có 1 cha duy nhất (commit bình thường), gọi `HEAD^2` sẽ bị báo lỗi vì không tồn tại người cha thứ hai.

### git rev-parse Command
- **Nói dễ hiểu**: Lệnh plumbing tiếp nhận bất kỳ chuỗi biểu thức revision nào và tính toán ra chuỗi mã băm SHA-1 40 ký tự chính xác.
- **Ví dụ**: Chạy `git rev-parse HEAD~1` in ra mã băm của commit trước đó.
- **Đừng nhầm**: Không làm thay đổi vị trí con trỏ hay working directory; đây chỉ là công cụ tính toán và phân giải địa chỉ.

---

## 📖 Định nghĩa
Cú pháp Revision (Revision Syntax) là hệ thống ký hiệu điều hướng cho phép bạn tham chiếu tới bất kỳ commit nào trong lịch sử đồ thị DAG của Git mà không cần phải sao chép mã băm SHA-1. Hai toán tử then chốt và dễ gây nhầm lẫn nhất là Dấu ngã (Tilde ~) và Dấu mũ (Caret ^). Toán tử `HEAD~n` điều hướng lùi về n thế hệ theo tuyến tính tổ tiên cha đầu tiên; trong khi toán tử `HEAD^n` dùng để chọn người cha thứ n của một Merge Commit có nhiều nhánh hợp nhất.

---

## 💡 Tại sao cần
Nhầm lẫn giữa cú pháp `HEAD~2` và `HEAD^2` là một trong những sai lầm phổ biến và nguy hiểm nhất của các kỹ sư Git. Khi bạn muốn hoàn tác hai commit gần nhất bằng lệnh reset hay xem sự khác biệt bằng lệnh diff, nếu gõ nhầm toán tử trên một Merge Commit, bạn có thể vô tình nhảy sang một nhánh phụ hoàn toàn xa lạ thay vì đi ngược dòng lịch sử của nhánh chính, dẫn đến việc xóa nhầm dữ liệu hoặc hiểu sai biến động mã nguồn.

---

## 🧠 Mental Model
Hãy tưởng tượng sơ đồ gia phả gia đình qua các thế hệ nối tiếp nhau: Dấu ngã (~) giống như việc đi ngược dòng thời gian về các đời trước trên nhánh phả hệ chính: `Tôi~1` là Bố tôi, `Tôi~2` là Ông nội tôi, `Tôi~3` là Cụ nội tôi (đi thẳng một mạch theo trục dọc thế hệ). Còn dấu mũ (^) xuất hiện khi một người có cả Bố và Mẹ hợp nhất (Merge Commit): `Tôi^1` là Bố tôi (người cha thứ nhất), và `Tôi^2` là Mẹ tôi (người cha thứ hai ở nhánh phụ).

---

## 📊 Sơ đồ minh họa
```text
Sự khác biệt trực quan giữa ~ và ^ trên đồ thị Merge:
          (Commit C1) ──► (Commit C2) ──┐ [Nhánh phụ được merge]
                                         ▼
(Commit A1) ──► (Commit A2) ──────────► [Commit M (Merge Commit)] ◄── HEAD

Từ vị trí HEAD (Commit M):
• HEAD~1 = A2   (Đi lùi 1 thế hệ theo nhánh chính)
• HEAD~2 = A1   (Đi lùi 2 thế hệ theo nhánh chính)
• HEAD^1 = A2   (Chọn cha thứ nhất: nhánh chính)
• HEAD^2 = C2   (Chọn cha thứ hai: nhánh phụ vừa được merge vào)
• HEAD^2~1 = C1 (Đi sang cha thứ hai rồi lùi thêm 1 thế hệ)
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư muốn kiểm tra sự khác biệt giữa phiên bản hiện tại sau khi merge và mã nguồn của nhánh tính năng trước khi được gộp vào. Nếu kỹ sư gõ `git diff HEAD~1`, Git sẽ so sánh với commit cha trên nhánh main. Để so sánh chính xác với commit cuối cùng của nhánh tính năng được gộp vào, kỹ sư sử dụng toán tử dấu mũ: `git diff HEAD^2`. Lệnh `git rev-parse HEAD^2` trả về chính xác mã băm của commit tính năng trên nhánh phụ. Sự hiểu biết chính xác về cú pháp revision giúp kỹ sư kiểm tra mã nguồn đa nhánh một cách chuẩn xác 100%.

---

## 💻 Command & Cú pháp
```bash
# Phân giải commit trước đó một thế hệ
git rev-parse HEAD~1

# Phân giải commit cha thứ hai của một merge commit
git rev-parse HEAD^2

# Kết hợp: đi tới cha thứ hai rồi lùi lại một thế hệ
git rev-parse HEAD^2~1

# So sánh diff giữa commit hiện tại và commit của nhánh phụ đã merge
git diff HEAD^2 HEAD
```

---

## 🔍 Giải thích command
- `git rev-parse HEAD~1`: In ra mã SHA-1 của commit cha đầu tiên (tương đương `HEAD^`).
- `git rev-parse HEAD^2`: In ra mã SHA-1 của commit cha thứ hai trên một merge commit.
- `HEAD^2~1`: Điều hướng sang commit cha thứ hai của merge commit, sau đó lùi tiếp một thế hệ trên nhánh đó.
- `git diff HEAD^2 HEAD`: Xem toàn bộ các thay đổi mà nhánh chính mang lại so với nhánh tính năng vừa được merge.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng `HEAD~2` và `HEAD^2` giống nhau**: Chỉ tình cờ giống nhau trên lịch sử đơn tuyến tính; trên điểm merge, `HEAD^2` nhảy sang nhánh phụ còn `HEAD~2` đi lùi 2 bước trên nhánh chính.
2. **Gọi `HEAD^2` trên commit đơn**: Git sẽ báo lỗi ambiguous argument vì commit đơn chỉ có 1 cha duy nhất.
3. **Quên thứ tự ưu tiên khi ghép chuỗi**: `HEAD~2^2` khác với `HEAD^2~2`; cần đọc tuần tự từ trái sang phải để theo dõi đúng đường đi trên đồ thị.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Tạo một lịch sử có rẽ nhánh và thực hiện merge để tạo ra một Merge Commit thực tế.
2. **Bước 2**: Sử dụng `git rev-parse HEAD~1` và ghi lại mã băm của nhánh chính.
3. **Bước 3**: Sử dụng `git rev-parse HEAD^2` và quan sát mã băm thuộc về nhánh phụ vừa được gộp vào.
4. **Bước 4**: Chạy `git log --graph --oneline` để đối chiếu trực quan vị trí của cả hai commit trên đồ thị.

---

## 💡 Hint & mẹo
> Ghi nhớ câu thần chú: "Dấu ngã (~) là leo cây gia phả thế hệ lùi dần; Dấu mũ (^) là chọn nhánh rẽ của ngã ba hợp nhất".

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git rev-parse HEAD~1` trả về đúng commit cha trên nhánh chính.
- Lệnh `git rev-parse HEAD^2` trả về đúng commit cuối cùng của nhánh tính năng đã được gộp.

---

## ❓ Quiz nhanh
Hãy kiểm tra khả năng định vị đồ thị commit qua bài trắc nghiệm về cú pháp revision trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Biểu thức revision `HEAD~3^2~1` có nghĩa là gì trên sơ đồ cây commit của Git? Hãy vẽ sơ đồ minh họa từng bước nhảy con trỏ.

---

## 📝 Tổng kết
- Toán tử `~n` (Tilde) đi lùi n thế hệ theo tuyến tính tổ tiên đầu tiên (nhánh chính).
- Toán tử `^n` (Caret) dùng để chọn người cha thứ n của một Merge Commit.
- `git rev-parse` là lệnh plumbing chuyển đổi mọi cú pháp biểu thức revision thành mã băm SHA-1.
- Nắm vững cú pháp revision giúp bạn thao tác git rebase, reset và diff trên các đồ thị phức tạp với độ chính xác tuyệt đối.
