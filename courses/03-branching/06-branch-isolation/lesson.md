# Nguyên lý cách ly không gian Branch Isolation

---

## 🎯 Mục tiêu
- Hiểu rõ nguyên lý cách ly không gian (Branch Isolation) độc lập của các luồng phát triển trong Git.
- Nhận biết phạm vi tác động của commit trên từng nhánh riêng biệt.
- Tự tin phát triển các tính năng thử nghiệm mạo hiểm mà không sợ làm ảnh hưởng tới nhánh chính.
- Phân tích sự phân kỳ lịch sử (divergent history) khi hai nhánh cùng tiến về phía trước.

---

## 📖 Định nghĩa
> Nguyên lý cách ly không gian (Branch Isolation) là đặc tính kiến trúc cốt lõi của Git, bảo đảm rằng mọi thay đổi đã được commit trên một nhánh chỉ tồn tại và ảnh hưởng độc quyền trên luồng lịch sử của chính nhánh đó. Nhánh chính (`main`) và các nhánh tính năng khác hoàn toàn không hề hay biết hay chịu bất kỳ tác động nào từ những sửa đổi này cho đến khi bạn chủ động thực hiện hành động hợp nhất (Merge hoặc Rebase).

---

## 🤔 Tại sao cần?
Khả năng cách ly tuyệt đối giải phóng sự sáng tạo của lập trình viên khỏi nỗi sợ hãi làm hỏng mã nguồn đang vận hành. Bạn có thể thoải mái thử nghiệm viết lại toàn bộ kiến trúc ứng dụng, cài đặt các thư viện mới hoặc xóa bỏ các module cũ trên một nhánh riêng biệt. Nếu thử nghiệm thành công rực rỡ, bạn sẽ gộp vào dự án chung; nếu thất bại thảm hại, bạn chỉ việc xóa nhánh đó đi chỉ trong một giây mà kho lưu trữ chính vẫn hoàn toàn nguyên vẹn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung nguyên lý cách ly nhánh giống như các phòng thí nghiệm an toàn sinh học cấp độ 4 độc lập trong cùng một viện nghiên cứu. Mỗi nhà khoa học được cấp một căn phòng kín với hệ thống lọc khí riêng biệt để nghiên cứu các mẫu thử nghiệm mới. Bất kể phòng thí nghiệm số 1 có xảy ra sự cố cháy nổ hay đổ vỡ ống nghiệm, căn phòng chính số 0 và các phòng thí nghiệm lân cận vẫn hoàn toàn sạch sẽ, an toàn tuyệt đối và hoạt động bình thường.

---

## 🖼 Sơ đồ
```text
Lịch sử phân kỳ độc lập giữa hai nhánh:
Nhánh main:            C1 ──► C2 ──► C3 ──► C5 (main)
                              │
Nhánh feature-login:          └──► C4 ──► C6 (feature-login)
(Commit C4 và C6 hoàn toàn không xuất hiện trên nhánh main)
```

---

## 🌎 Ví dụ thực tế
Lập trình viên An tạo nhánh experiment-ai để thử nghiệm tích hợp một mô hình trí tuệ nhân tạo nhận diện giọng nói vào ứng dụng di động. Sau ba ngày thử nghiệm và tạo 8 commit, An nhận thấy mô hình này tiêu tốn quá nhiều pin và không phù hợp với điện thoại đời cũ. Nhờ nguyên lý cách ly nhánh, toàn bộ mã nguồn của nhóm trên nhánh main vẫn đang chạy ổn định 100%. An chỉ việc chuyển về main và gõ `git branch -D experiment-ai` để loại bỏ thử nghiệm mà không để lại bất kỳ tì vết nào trong lịch sử chính.

---

## 💻 Command
```bash
git switch -c <nhánh-thử-nghiệm>
git log --oneline --graph --all
git diff main..<nhánh-thử-nghiệm>
```

---

## 🔍 Giải thích command
- `git switch -c <nhánh-thử-nghiệm>`: Tạo một không gian cách ly an toàn mới để bắt đầu phát triển tính năng.
- `git log --oneline --graph --all`: Quan sát bức tranh phân kỳ lịch sử trực quan của tất cả các nhánh độc lập.
- `git diff main..<nhánh>`: Xem tổng hợp tất cả sự khác biệt mà nhánh thử nghiệm đã tạo ra so với nhánh main.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ commit trên nhánh con sẽ tự động xuất hiện trên nhánh main**:  Bạn bắt buộc phải thực hiện merge thì code mới sang main.
2. **Sợ hãi không dám tạo nhánh thử nghiệm**:  Hãy nhớ tạo nhánh là hoàn toàn miễn phí và an toàn tuyệt đối.
3. **Để lại các tệp chưa commit khi chuyển nhánh**:  Thay đổi chưa commit có thể đi theo sang nhánh khác nếu không bị xung đột.

---

## 🧪 Lab
1. Tạo nhánh cách ly `test-isolation` bằng `git switch -c test-isolation`.
2. Tạo tệp mới `secret-test.txt` và commit vào nhánh này.
3. Chuyển về nhánh chính bằng lệnh `git switch main`.
4. Kiểm tra thư mục làm việc và thấy tệp `secret-test.txt` hoàn toàn không tồn tại trên main.

---

## 💡 Hint
> Nhánh con cách ly hoàn toàn; khi về nhánh main, các tệp của nhánh con sẽ biến mất trên ổ đĩa.

---

## ✅ Validation
- Xác nhận tệp tin mới tạo ở nhánh con không xuất hiện trên nhánh main.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về nguyên lý cách ly nhánh Branch Isolation.

---

## 🔥 Challenge
Vẽ sơ đồ phân kỳ commit khi hai lập trình viên cùng tạo nhánh từ một commit cha và commit độc lập.

---

## 📚 Tổng kết
- Branch Isolation đảm bảo các thay đổi đã commit trên một nhánh không ảnh hưởng tới nhánh khác.
- Thoải mái thử nghiệm các ý tưởng mới trên nhánh riêng mà không sợ hỏng code của nhóm.
- Chỉ khi nào thực hiện Merge hoặc Rebase thì mã nguồn giữa các nhánh mới được tích hợp.
