# Cú pháp tra cứu Revision chuyên sâu: HEAD~, HEAD^, HEAD^2

---

## 🎯 Mục tiêu
- Phân biệt hai toán tử điều hướng commit: dấu ngã (~) và dấu mũ (^).
- Hiểu quy tắc: `HEAD~n` là đi lùi n thế hệ theo cha thứ nhất; `HEAD^n` là chọn cha thứ n của commit.
- Sử dụng `git rev-parse` để phân giải revision thành object ID của repository.
- Kết hợp linh hoạt các chuỗi toán tử để định vị bất kỳ nút nào trên đồ thị DAG.

---

## 🧩 Từ khóa hôm nay

### Tilde Operator (HEAD~n)
- **Nói dễ hiểu**: Dấu ngã đi lùi n lần theo chuỗi cha thứ nhất.
- **Ví dụ**: Biểu thức `HEAD~3` tương đương với `HEAD~~~`, đi lùi 3 commit trên nhánh hiện tại.
- **Đừng nhầm**: Đây là chuỗi cha thứ nhất, không đồng nghĩa với nhánh `main`; nó phụ thuộc commit mà `HEAD` đang trỏ tới.

### Caret Operator (HEAD^n)
- **Nói dễ hiểu**: Dấu mũ chọn cha thứ n của commit. Merge commit thường có từ hai cha trở lên.
- **Ví dụ**: Với merge commit có hai cha, `HEAD^1` là cha thứ nhất và `HEAD^2` là cha thứ hai.
- **Đừng nhầm**: `HEAD^2` chỉ dùng được khi commit có ít nhất hai cha; thứ tự cha không tự nói tên nhánh.

### git rev-parse Command
- **Nói dễ hiểu**: Lệnh phân giải revision thành object ID mà Git nhận diện được.
- **Ví dụ**: Chạy `git rev-parse HEAD~1` in ra mã băm của commit trước đó.
- **Đừng nhầm**: Không làm thay đổi vị trí con trỏ hay working directory; đây chỉ là công cụ tính toán và phân giải địa chỉ.

---

## 📖 Định nghĩa
Cú pháp revision giúp gọi tên commit bằng các biểu thức như `HEAD~2` thay vì chép object ID. `~n` lặp n lần việc đi theo cha thứ nhất. `^n` chọn cha thứ n của commit hiện tại; ví dụ `^2` cần commit có cha thứ hai. Hai biểu thức cùng được tính từ revision đứng trước chúng.

---

## 💡 Tại sao cần
Hiểu các toán tử này giúp bạn so sánh đúng hai nhánh của merge và đọc lịch sử. Trước khi dùng revision với lệnh thay đổi như `reset`, hãy kiểm tra nó bằng `git rev-parse`; lỗi chọn revision có thể đưa lệnh tới commit khác với dự định.

---

## 🧠 Mental Model
Hãy xem merge commit như một nút có hai cạnh đi ngược về hai commit cha. `M^1` chọn cạnh cha thứ nhất; `M^2` chọn cạnh cha thứ hai. `M~2` đi hai bước liên tiếp theo cạnh cha thứ nhất. Các cạnh là quan hệ trong commit, không phải tên nhánh.

---

## 📊 Sơ đồ minh họa
```text
Sự khác biệt trực quan giữa ~ và ^ trên đồ thị Merge:
          (Commit C1) ◄── (Commit C2) ◄──┐
                                         \
(Commit A1) ◄── (Commit A2) ◄────────── [Commit M] ◄── HEAD

Từ vị trí HEAD (Commit M):
• HEAD~1 = A2   (Đi lùi 1 thế hệ theo cha thứ nhất)
• HEAD~2 = A1   (Đi lùi 2 thế hệ theo cha thứ nhất)
• HEAD^1 = A2   (Chọn cha thứ nhất)
• HEAD^2 = C2   (Chọn cha thứ hai)
• HEAD^2~1 = C1 (Đi sang cha thứ hai rồi lùi thêm 1 thế hệ)
```

---

## 🏢 Ví dụ thực tế
Muốn so sánh merge commit với cha thứ hai, dùng `git diff HEAD^2 HEAD`. Lệnh một revision như `git diff HEAD^2` so sánh cây của cha thứ hai với working tree, nên không biểu đạt cùng phép so sánh. Trước tiên có thể xem cha thứ hai bằng `git rev-parse HEAD^2`.

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
- `git rev-parse HEAD~1`: In object ID của commit cha thứ nhất (tương đương `HEAD^`).
- `git rev-parse HEAD^2`: In object ID của cha thứ hai nếu commit có cha thứ hai.
- `HEAD^2~1`: Điều hướng sang commit cha thứ hai của merge commit, sau đó lùi tiếp một thế hệ trên nhánh đó.
- `git diff HEAD^2 HEAD`: So sánh tree của merge commit với tree của cha thứ hai; kết quả là khác biệt giữa hai tree đó.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng `HEAD~2` và `HEAD^2` giống nhau**: Trên merge commit, `HEAD^2` chọn cha thứ hai còn `HEAD~2` đi hai bước liên tiếp theo cha thứ nhất.
2. **Gọi `HEAD^2` trên commit đơn**: Không có cha thứ hai nên Git không thể phân giải biểu thức này.
3. **Quên thứ tự ưu tiên khi ghép chuỗi**: `HEAD~2^2` khác với `HEAD^2~2`; cần đọc tuần tự từ trái sang phải để theo dõi đúng đường đi trên đồ thị.

---

## 🧪 Lab thực hành
Tạo merge commit trong repository tạm để so sánh parent. Chạy trong Bash/Git Bash:

```bash
mkdir git-revision-lab
cd git-revision-lab
git init -b main
git config user.name "Git Learner"
git config user.email "learner@example.com"
echo "base" > README.md
git add README.md
git commit -m "base"
git switch -c feature
echo "feature" > feature.txt
git add feature.txt
git commit -m "feature change"
git switch main
echo "main" > main.txt
git add main.txt
git commit -m "main change"
git merge --no-ff feature -m "merge feature"
```

1. **Bước 1**: Kiểm tra sơ đồ bằng `git log --graph --oneline --all`.
2. **Bước 2**: Chạy `git rev-parse HEAD~1` để xem cha thứ nhất và `git rev-parse HEAD^2` để xem cha thứ hai.
3. **Bước 3**: Dùng `git diff HEAD^2 HEAD` để so sánh tree của merge với tree cha thứ hai.
4. **Bước 4**: So sánh object ID với `git log -1 --format=%P HEAD`, nơi Git in các parent theo thứ tự.

---

## 💡 Hint & mẹo
> Ghi nhớ: `~n` lặp theo cha thứ nhất; `^n` chọn cha thứ n của commit hiện tại.

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
- Toán tử `~n` đi lùi n thế hệ theo cha thứ nhất, không nhất thiết là nhánh `main`.
- Toán tử `^n` chọn cha thứ n của commit; cha thứ hai thường xuất hiện ở merge commit.
- `git rev-parse` phân giải revision thành object ID theo định dạng của repository.
- Nắm vững cú pháp revision giúp bạn thao tác git rebase, reset và diff trên các đồ thị phức tạp với độ chính xác tuyệt đối.
