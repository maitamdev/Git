# Merge commit là gì?

---

## 🎯 Mục tiêu
- Phân biệt bản chất giữa commit đơn thông thường và Merge Commit qua số lượng commit cha (parents).
- Hiểu rõ giá trị lịch sử và ý nghĩa ngữ cảnh mà Merge Commit mang lại cho dự án.
- Sử dụng thành thạo `git show` và bộ lọc `git log --merges` để thanh tra các mốc hợp nhất.

---

## 🧩 Từ khóa hôm nay

### Merge commit — commit hợp nhất
- **Nói dễ hiểu:** Cột mốc snapshot đặc biệt ghi lại kết quả của việc kết hợp hai nhánh độc lập có lịch sử phân kỳ.
- **Ví dụ:** Git tự sinh commit có thông điệp `Merge branch 'feature-cart' into main` sau khi gộp nhánh.
- **Đừng nhầm:** Merge commit chỉ sinh ra khi có sự phân kỳ lịch sử hoặc khi dùng cờ `--no-ff`; các lần gộp dạng Fast-forward không tạo commit này.

### Parent commit — commit cha
- **Nói dễ hiểu:** Mốc commit đứng ngay liền trước commit hiện tại trong cây phả hệ lịch sử của Git.
- **Ví dụ:** Commit thông thường chỉ có đúng 1 cha; riêng merge commit sở hữu từ 2 cha trở lên đại diện cho các nhánh được gộp.
- **Đừng nhầm:** Commit khởi tạo đầu tiên của kho mã nguồn là commit duy nhất không có bất kỳ commit cha nào.

### `git log --merges` — lọc merge commit
- **Nói dễ hiểu:** Cờ tùy chọn giúp bộ lọc của Git chỉ hiển thị các commit hợp nhất, loại bỏ toàn bộ các commit nhỏ lẻ.
- **Ví dụ:** Chạy `git log --merges --oneline` để duyệt nhanh danh sách các đợt sáp nhập tính năng lớn vào dự án.
- **Đừng nhầm:** Cờ `--no-merges` làm điều ngược lại: ẩn các commit hợp nhất để bạn chỉ đọc các commit code tính năng chi tiết.

---

## 📖 Định nghĩa
Merge Commit là một commit cấu trúc đặc biệt sở hữu từ hai commit cha (parents) trở lên. Snapshot này đánh dấu điểm nút giao thoa lịch sử, tích hợp toàn bộ các thay đổi từ một nhánh nguồn vào nhánh đích. Bản thân merge commit đại diện cho thời khắc đồng bộ mã nguồn, giúp bảo toàn nguyên vẹn ngữ cảnh phát triển độc lập của cả hai nhánh.

---

## 🤔 Tại sao cần?
Khi dự án phát triển với hàng chục kỹ sư, việc đọc lịch sử sẽ trở nên hỗn loạn nếu không có các mốc ghi nhận. Merge Commit giúp bạn nhận biết chính xác khi nào một tính năng lớn được sáp nhập vào nhánh chính, ai là người thực hiện tích hợp và nguồn gốc của từng dòng code. Nếu phát sinh lỗi nghiêm trọng trên production, bạn có thể dễ dàng hoàn tác (revert) toàn bộ cả tính năng chỉ qua mã định danh của merge commit này.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung hai con sông chảy song song bắt nguồn từ một ngọn núi. Khi hai dòng chảy hợp lưu tạo thành một con sông lớn hơn tại một ngã ba sông, điểm ngã ba đó chính là Merge Commit. Nhìn vào ngã ba sông, người đi thuyền biết rõ nước từ nhánh Tây và nhánh Đông đã hòa quyện vào nhau để tiếp tục hành trình ra biển lớn.

---

## 🖼 Sơ đồ
```text
CẤU TRÚC PHẢ HỆ CỦA MERGE COMMIT:

               (F1) ── (F2) ◄── [feature-cart]
              /            \
(C1) ── (M1) ─              ──► [M2: Merge Commit] ◄── [main]
        (main)
  
  M2 có 2 commit cha trực tiếp: M1 (trên main) và F2 (trên feature-cart).
  Chạy `git show M2`: dòng đầu tiên ghi rõ `Merge: M1_hash F2_hash`.
```

---

## 🌎 Ví dụ thực tế
Bạn phát triển trang giỏ hàng trên nhánh `feature-cart` với 5 commit. Trong lúc đó, Tech Lead cập nhật cấu hình bảo mật trên `main` với 2 commit. Khi merge `feature-cart` vào `main`, Git tạo ra commit hợp nhất mang mã `m1a2b3c`. Nhìn vào đồ thị `git log`, bất kỳ ai cũng thấy rõ nhánh giỏ hàng đã hoàn thành và hòa vào dòng chảy chính.

---

## 💻 Command
```bash
git log --merges --oneline
git show HEAD
git log --no-merges --oneline
git log --graph --oneline
```

---

## 🔍 Giải thích command
- `git log --merges --oneline`: Chỉ lọc và in ra các commit hợp nhất; mỗi commit hiển thị trên một dòng ngắn.
- `git show HEAD`: Soi chi tiết commit hiện tại; nếu là merge commit, bạn sẽ thấy dòng `Merge: <cha-1> <cha-2>`.
- `git log --no-merges --oneline`: Bỏ qua các commit gộp, chỉ xem các commit nghiệp vụ đơn thuần do lập trình viên gõ code.
- `git log --graph --oneline`: Hiển thị đồ thị cây nhánh trực quan bằng các đường nối ký tự ASCII.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng merge commit chứng minh code đã hết lỗi**: Merge commit chỉ xác nhận hai luồng lịch sử đã gộp vào nhau; chất lượng code vẫn phụ thuộc vào bộ unit test và code review.
2. **Nghĩ rằng mọi lần merge đều sinh ra merge commit**: Như đã học ở bài trước, Fast-forward merge chỉ trượt con trỏ chứ không sinh ra merge commit.
3. **Cố gắng xóa merge commit thủ công**: Xóa nhầm merge commit có thể làm đứt gãy phả hệ lịch sử của cả nhánh tính năng.

---

## 🧪 Lab
1. Trên nhánh `main`, tạo file `history-main.txt`, gõ một dòng nội dung rồi chạy `git add` và `git commit -m "docs: add main note"`.
2. Tạo nhánh mới `git switch -c feature-history`, tạo file `history-feature.txt`, gõ nội dung rồi add và commit.
3. Quay về nhánh chính `git switch main`, sau đó chạy lệnh: `git merge feature-history`.
4. Chạy `git show HEAD` và quan sát dòng `Merge:` để đếm đủ hai mã commit cha.
5. Chạy `git log --merges --oneline` để thấy merge commit vừa tạo xuất hiện trong danh sách lọc.

---

## 💡 Hint
> Dòng `Merge: <hash1> <hash2>` trong `git show` chính là bằng chứng xác thực nhất khẳng định commit hiện tại là một Merge Commit!

---

## ✅ Validation
- Lệnh `git log --merges --oneline` lọc ra chính xác commit hợp nhất vừa tạo.
- Lệnh `git show HEAD` hiển thị hai mã cha ở phần thông tin tiêu đề.
- `git log --no-merges --oneline` loại trừ merge commit này khỏi danh sách.

---

## ❓ Quiz
Trả lời bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về đặc tính hai cha của Merge Commit và cách tra cứu lịch sử.

---

## 🔥 Challenge
Hãy so sánh sự khác nhau về mặt đồ thị và khả năng truy vết giữa việc giữ lại merge commit (Merge commit workflow) và việc là phẳng lịch sử không có merge commit (Rebase workflow). Đội ngũ của bạn nên ưu tiên phong cách nào trong tình huống nào?

---

## 📚 Tổng kết
- Merge commit là mốc snapshot đặc biệt sở hữu từ hai commit cha trở lên.
- Đóng vai trò là cầu nối liên kết lịch sử của hai nhánh đã từng rẽ nhánh độc lập.
- Sử dụng `git log --merges` và `git log --no-merges` để linh hoạt điều chỉnh góc nhìn lịch sử dự án.
