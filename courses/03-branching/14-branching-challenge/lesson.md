# Thử thách cuối Level 3: tạo nhánh, xử lý conflict và merge

---

## 🎯 Mục tiêu
- Tự tay thực hiện trọn vẹn chu trình làm việc với nhánh chuẩn kỹ sư: từ tách nhánh, gây phân kỳ, hợp nhất đến xử lý xung đột.
- Làm chủ kỹ thuật Resolve Conflict và tạo Merge Commit hoàn chỉnh nối liền hai luồng lịch sử.
- Dọn dẹp kho lưu trữ an toàn bằng việc xóa nhánh tính năng sau khi đã sáp nhập thành công.

---

## 🧩 Từ khóa hôm nay

### Feature branch — nhánh tính năng
- **Nói dễ hiểu:** Luồng làm việc độc lập được tách ra từ nhánh chính để phát triển riêng một tính năng mà không làm xáo trộn mã nguồn chung.
- **Ví dụ:** Tạo nhánh `feature-challenge` để thử nghiệm tính năng thông báo mới.
- **Đừng nhầm:** Nhánh tính năng chỉ có ý nghĩa tạm thời trong suốt vòng đời phát triển; sau khi gộp vào nhánh chính, nhánh này nên được dọn dẹp sạch sẽ.

### Resolve conflict — giải quyết xung đột
- **Nói dễ hiểu:** Nghệ thuật dung hòa và chắt lọc mã nguồn khi hai nhánh cùng can thiệp vào một vùng nội dung mâu thuẫn.
- **Ví dụ:** Kết hợp hài hòa cả thông điệp bảo trì của nhánh chính lẫn thông điệp ưu đãi của nhánh tính năng thành một câu trọn vẹn.
- **Đừng nhầm:** Không chọn bừa Current hay Incoming một cách máy móc; phải hiểu rõ yêu cầu nghiệp vụ của sản phẩm trước khi quyết định.

### Merge commit — commit hợp nhất
- **Nói dễ hiểu:** Mốc son snapshot lịch sử sở hữu 2 commit cha, ghi nhận thời điểm hoàn thành việc sáp nhập nhánh tính năng vào nhánh chính.
- **Ví dụ:** Commit sinh ra với thông điệp `merge: combine challenge changes` nối liền hai luồng phân kỳ.
- **Đừng nhầm:** Luôn đứng tại nhánh nhận (`main`) trước khi thực hiện merge để đảm bảo dòng chảy mã nguồn đi đúng hướng.

---

## 📖 Định nghĩa
Thử thách tổng kết Level 3 là bài kiểm tra thực chiến toàn diện mô phỏng 100% quy trình làm việc chuyên nghiệp tại các tập đoàn công nghệ: Khởi tạo commit gốc, tách nhánh tính năng (Feature branch), phát triển commit độc lập gây phân kỳ lịch sử, gộp nhánh, làm chủ và gỡ xung đột (Resolve conflict), niêm phong Merge commit và dọn dẹp nhánh an toàn.

---

## 🤔 Tại sao cần?
Học lý thuyết suông sẽ không bao giờ biến bạn thành một kỹ sư Git tự tin. Chỉ khi tự tay tạo ra xung đột, đối mặt với các vạch đánh dấu, dung hòa logic nghiệp vụ và hoàn tất chu trình gộp code từ đầu đến cuối, bạn mới thực sự xóa bỏ nỗi sợ hãi về Git Branching và sẵn sàng bước chân vào các dự án phần mềm thực chiến quy mô lớn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy xem thử thách này như bài thi sát hạch lái xe sa hình tổng hợp: Bạn xuất phát từ vạch xuất phát (`main`), rẽ vào làn đường tính năng riêng, đối mặt với chướng ngại vật ngã tư xung đột, bình tĩnh đánh lái xử lý chướng ngại vật an toàn, nhập làn trở lại đường cao tốc chính và cất chìa khóa vào gara ngăn nắp.

---

## 🖼 Sơ đồ
```text
TOÀN BỘ TIẾN TRÌNH THỰC THI THỬ THÁCH SA HÌNH LEVEL 3:

                          (F1: thông báo có ưu đãi) ◄── [feature-challenge]
                         /                               \
(Base: thông báo đầu) ──                                  ──► [M1: Merge Commit] ◄── [main]
                         \                               /
                          (M0: thông báo bảo trì trên main)
```

---

## 🌎 Ví dụ thực tế
Trên nhánh `main`, cửa hàng thông báo đang bảo trì hệ thống. Trên nhánh `feature-challenge`, bạn cập nhật chương trình khuyến mãi giảm giá 50%. Khi gộp nhánh, bạn khéo léo kết hợp cả hai: 'Hệ thống đang bảo trì; chương trình khuyến mãi 50% sẽ tự động kích hoạt ngay khi mở cửa trở lại'. Một pha xử lý nghiệp vụ mẫu mực của Senior Developer!

---

## 💻 Command
```bash
git switch -c feature-challenge
git switch main
git merge feature-challenge
git status
git add challenge.txt
git commit -m "merge: combine challenge changes"
git show HEAD
git branch -d feature-challenge
```

---

## 🔍 Giải thích command
- `git switch -c feature-challenge`: Tách nhánh tính năng và chuyển sang đó làm việc.
- `git switch main` rồi `git merge`: Đứng đúng vị trí nhánh đích trước khi kéo nhánh tính năng vào.
- `git add` & `git commit`: Đánh dấu hoàn tất việc gỡ xung đột và tạo Merge Commit có 2 cha.
- `git branch -d`: Dọn sạch nhánh sau khi mọi công sức đã được bảo toàn trong `main`.

---

## ⚠️ Sai lầm phổ biến
1. **Merge khi đang đứng trên nhánh tính năng**: Làm đảo lộn hướng di chuyển của mã nguồn.
2. **Quên tạo commit riêng trên cả hai nhánh**: Không có sự phân kỳ lịch sử thì không thể tạo ra tình huống thử thách thực tế.
3. **Cố xóa nhánh khi chưa switch về nhánh chính**: Git sẽ từ chối xóa nhánh bạn đang đứng.

---

## 🧪 Lab
1. Trên nhánh `main`, tạo file `challenge.txt` với dòng: `Thông báo: phiên bản đầu`, rồi add và commit với thông điệp `docs: add challenge note`.
2. Tạo nhánh tính năng: `git switch -c feature-challenge`, sửa dòng đó thành: `Thông báo: có ưu đãi`, rồi add và commit với `feat: announce offer`.
3. Quay về `git switch main`, sửa cùng dòng thành: `Thông báo: cửa hàng đang bảo trì`, rồi add và commit với `docs: announce maintenance`.
4. Chạy `git merge feature-challenge` để kích hoạt xung đột sa hình.
5. Mở file `challenge.txt`, dung hòa nội dung thành câu hoàn chỉnh: `Thông báo: cửa hàng đang bảo trì; ưu đãi áp dụng khi mở cửa trở lại.`, xóa sạch 3 vạch markers rồi lưu file.
6. Chạy `git add challenge.txt`, rồi `git commit -m "merge: combine challenge changes"`.
7. Chạy `git show HEAD` để xác nhận commit có 2 cha, sau đó chạy `git branch -d feature-challenge` để hoàn tất dọn dẹp.

---

## 💡 Hint
> Hãy bình tĩnh đọc cả hai thông điệp và kết hợp chúng thành một câu văn có nghĩa nghiệp vụ rõ ràng nhất!

---

## ✅ Validation
- Quá trình gộp nhánh kích hoạt xung đột và được giải quyết sạch sẽ 100%.
- Merge Commit được tạo ra hợp lệ với 2 commit cha.
- Nhánh `feature-challenge` được xóa an toàn khỏi danh sách `git branch`.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để tổng kết và kiểm tra toàn diện năng lực làm chủ nhánh và hợp nhất mã nguồn của bạn.

---

## 🔥 Challenge
Hãy mô tả lại cảm giác và bài học lớn nhất bạn rút ra được sau khi vượt qua thử thách gỡ xung đột Level 3. Tại sao một lập trình viên biết gỡ xung đột bình tĩnh lại luôn được các công ty săn đón?

---

## 📚 Tổng kết
- Làm chủ toàn bộ chu trình: Tách nhánh ──► Phân kỳ ──► Hợp nhất ──► Gỡ xung đột ──► Dọn dẹp.
- Luôn đứng trên nhánh nhận trước khi thực hiện hợp nhất.
- Chúc mừng bạn đã hoàn thành xuất sắc và chính thức Master toàn bộ kiến thức Level 3: Branching & Merging!
