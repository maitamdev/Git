# Bản chất của Merge commit

---

## 🎯 Mục tiêu
- Hiểu rõ cấu trúc nội tại của một đối tượng Merge Commit trong cơ sở dữ liệu Git.
- Giải thích ý nghĩa của thuộc tính đa phụ huynh (multiple parents) trong đồ thị DAG.
- So sánh ưu và nhược điểm giữa chiến lược giữ Merge Commit và chiến lược làm phẳng lịch sử (Rebase/Squash).
- Sử dụng lệnh `git show` và `git log` để phân tích các commit cha của một merge commit.

---

## 📖 Định nghĩa
> Merge Commit là một đối tượng commit đặc biệt trong đồ thị có hướng không chu trình (DAG) của Git, sở hữu từ hai con trỏ commit cha trở lên (Parent 1 trỏ về đỉnh nhánh đích, Parent 2 trỏ về đỉnh nhánh nguồn được gộp). Trong khi các commit thông thường chỉ ghi nhận một commit cha duy nhất đứng trước nó, Merge Commit đóng vai trò như một cây cầu nối hợp nhất hai nhánh lịch sử độc lập lại với nhau, ghi nhận thời điểm và bối cảnh hai luồng công việc gặp nhau.

---

## 🤔 Tại sao cần?
Hiểu rõ bản chất của Merge Commit giúp bạn không còn bỡ ngỡ khi đọc các đồ thị nhánh phức tạp của các tập đoàn công nghệ lớn. Bạn sẽ hiểu được tại sao lệnh `git revert` trên một merge commit lại đòi hỏi phải truyền thêm cờ `-m` để chỉ định commit cha, cũng như biết cách đưa ra quyết định kiến trúc: khi nào nên giữ lại merge commit để bảo lưu dấu vết làm việc nhóm, và khi nào nên rebase làm phẳng lịch sử để nhật ký dự án tinh gọn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung đồ thị lịch sử như hai dòng sông nhỏ bắt nguồn từ một ngọn núi cao (commit tổ tiên chung). Hai dòng sông chảy uốn lượn qua hai thung lũng khác nhau (hai nhánh độc lập). Đến một vùng đồng bằng trù phú, hai dòng sông hòa vào nhau tại một ngã ba sông lớn (Merge Commit). Kể từ ngã ba sông này, dòng chảy tiếp tục hòa thành một dòng sông lớn duy nhất mang theo phù sa của cả hai nhánh sông trước đó.

---

## 🖼 Sơ đồ
```text
Cấu trúc đối tượng Merge Commit trong Git:
┌──────────────────────────────────────────────┐
│ Commit: e4b2a19 (Merge Commit)               │
│ Tree: 819c4d2fe901                           │
│ Parent 1: c3f12a8 (nhánh main)               │
│ Parent 2: 9a7b4f1 (nhánh feature-payment)    │
│ Author: Nam Nguyen <nam@example.com>         │
│ Message: Merge branch 'feature-payment'      │
└──────────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Trong một dự án xây dựng ứng dụng ngân hàng số, trưởng nhóm kỹ thuật rà soát lại lịch sử phát hành thông qua câu lệnh trực quan `git log --graph --oneline`. Tại commit mang mã hash e4b2a19, trưởng nhóm nhìn thấy dòng ghi chú chuẩn mực "Merge branch feature-auth into main". Nhờ tồn tại merge commit này với hai commit cha rõ ràng, cả nhóm có thể dễ dàng kiểm toán lại xem tính năng xác thực hai yếu tố đã được gộp vào mã nguồn chính xác vào ngày nào, do ai phê duyệt và toàn bộ các commit thành phần nhỏ bên trong nhánh đó là gì. Điều này mang lại sự minh bạch tuyệt đối cho quy trình phát triển sản phẩm của toàn thể công ty.

---

## 💻 Command
```bash
git show <merge-commit-hash>
git log --merges --oneline
git log --no-merges --oneline
```

---

## 🔍 Giải thích command
- `git show <merge-commit-hash>`: Xem thông tin chi tiết của một merge commit bao gồm cả hai mã hash của commit cha.
- `git log --merges --oneline`: Bộ lọc thông minh chỉ hiển thị các commit hợp nhất trong lịch sử dự án.
- `git log --no-merges --oneline`: Bộ lọc loại bỏ toàn bộ các commit hợp nhất, chỉ hiển thị các commit công việc thông thường.

---

## ⚠️ Sai lầm phổ biến
1. **Cố gắng revert merge commit mà không chỉ định cờ -m**:  Git sẽ từ chối vì không biết bạn muốn coi commit cha số 1 hay số 2 là mạch chính.
2. **Lạm dụng merge commit cho các sửa đổi quá nhỏ nhặt**:  Khiến lịch sử dự án bị ô nhiễm bởi hàng trăm commit merge rác.
3. **Nghĩ rằng merge commit sao chép toàn bộ tệp trùng lặp**:  Merge commit chỉ lưu trữ tree snapshot và trỏ tới hai commit cha trong DAG.

---

## 🧪 Lab
1. Chạy lệnh `git log --merges --oneline` để tìm các commit hợp nhất trong dự án.
2. Sử dụng lệnh `git show` trên một merge commit để quan sát dòng `Merge: hash1 hash2`.
3. So sánh kết quả hiển thị giữa `git log --merges` và `git log --no-merges`.

---

## 💡 Hint
> Dòng `Merge: a1b2c3d e4f5g6h` trong git show cho biết mã băm của hai commit cha.

---

## ✅ Validation
- Nhận diện chính xác hai commit cha của một merge commit qua git show.

---

## ❓ Quiz
Hãy hoàn thành bài trắc nghiệm dưới đây về bản chất của Merge commit.

---

## 🔥 Challenge
Giải thích cú pháp `git revert -m 1 <merge-commit-hash>` và ý nghĩa của số 1 ở đây.

---

## 📚 Tổng kết
- Merge Commit là nút đặc biệt trong đồ thị Git sở hữu từ hai commit cha trở lên.
- Ghi nhận bằng chứng lịch sử rõ ràng về thời điểm và bối cảnh tích hợp tính năng.
- Có thể lọc danh sách commit hợp nhất bằng cờ `--merges` hoặc `--no-merges`.
