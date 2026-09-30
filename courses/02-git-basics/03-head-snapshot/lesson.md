# Repository & HEAD Snapshot

---

## 🎯 Mục tiêu
- Hiểu rõ khu vực thứ ba trong kiến trúc Git: Repository và cơ sở dữ liệu đối tượng.
- Nắm bắt khái niệm con trỏ HEAD và cách nó trỏ tới commit hiện tại của nhánh làm việc.
- Phân biệt snapshot bất biến trong Repository với các tệp tin khả biến trong Working Tree.

---

## 📖 Định nghĩa
> Repository (Kho lưu trữ cục bộ) là khu vực lưu trữ vĩnh viễn và bất biến của Git, nơi chứa toàn bộ cơ sở dữ liệu đối tượng commit, cây thư mục và nội dung tệp tin lịch sử dưới mã băm mật mã học. Trong Repository, con trỏ đặc biệt mang tên `HEAD` đóng vai trò là một chiếc kim đọc đĩa hát chỉ định vị trí commit hiện tại mà thư mục làm việc của bạn đang dựa vào. Khi bạn thực hiện một commit mới, Git ghi nhận một snapshot vĩnh cửu và tự động di chuyển con trỏ `HEAD` tiến lên nút mới đó.

---

## 🤔 Tại sao cần?
Hiểu sâu về HEAD và cơ chế lưu trữ snapshot trong Repository là chìa khóa then chốt để bạn làm chủ toàn bộ các thao tác nâng cao như di chuyển lịch sử, checkout, reset và hoàn tác. Rất nhiều người dùng Git thường xuyên sợ hãi việc mất code khi gặp lỗi, nhưng khi đã hiểu rằng dữ liệu một khi đã đi vào Repository sẽ trở thành bất biến và được bảo vệ nghiêm ngặt bằng mã băm SHA, bạn sẽ hoàn toàn yên tâm thực nghiệm và tự tin kiểm soát dự án.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng Repository giống như kho lưu trữ bảo tàng lịch sử quốc gia với các phòng triển lãm tranh được khóa kính chống đạn. Mỗi bức tranh sơn dầu trong phòng triển lãm chính là một commit snapshot đại diện trọn vẹn cho một thời kỳ đã qua. Con trỏ `HEAD` giống như một ngọn đèn rọi di động từ trên trần nhà. Bạn di chuyển ngọn đèn rọi chiếu vào bức tranh nào thì mắt bạn (Working Tree) sẽ nhìn thấy rõ toàn cảnh thời kỳ đó.

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
Trong một dự án xây dựng ứng dụng di động, nhóm phát triển đã tạo được 20 commit mốc tính năng. Khi một lập trình viên muốn xem lại ứng dụng hoạt động ra sao tại mốc phát hành phiên bản 1.0 (ở commit số 10), lập trình viên có thể chuyển con trỏ HEAD về vị trí commit đó. Ngay lập tức, toàn bộ các tệp tin trong Working Directory trên máy tính sẽ được hoán đổi trở về đúng trạng thái lịch sử của commit số 10 mà không hề làm mất đi các commit mới hơn ở phía trước.

---

## 💻 Command
```bash
git log --oneline
git show HEAD
cat .git/HEAD
```

---

## 🔍 Giải thích command
- `git log --oneline`: Hiển thị danh sách các commit trong Repository kèm vị trí hiện tại của con trỏ HEAD.
- `git show HEAD`: Xem chi tiết thông tin tác giả, ngày giờ và nội dung thay đổi của commit mà HEAD đang trỏ vào.
- `cat .git/HEAD`: In ra nội dung tham chiếu thực tế của tệp HEAD trong thư mục ẩn .git.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ HEAD là một nhánh độc lập**:  HEAD chỉ là một con trỏ tham chiếu, thông thường nó trỏ vào tên một nhánh như `refs/heads/main`.
2. **Lo lắng commit cũ sẽ bị sửa đè khi tạo commit mới**:  Mỗi commit mới chỉ trỏ ngược về commit cha, commit cũ hoàn toàn bất biến trong lịch sử.
3. **Sợ rằng việc di chuyển HEAD sẽ làm mất dữ liệu**:  Dữ liệu đã commit luôn nằm an toàn trong cơ sở dữ liệu đối tượng của kho lưu trữ.

---

## 🧪 Lab
1. Chạy lệnh `git log --oneline` để quan sát vị trí xuất hiện của nhãn `HEAD -> main`.
2. Chạy lệnh `git show HEAD` để xem chi tiết snapshot commit mới nhất.
3. Nhận biết rằng HEAD luôn chỉ định trạng thái phiên bản mà bạn đang nhìn thấy.

---

## 💡 Hint
> HEAD là con trỏ chỉ vị trí làm việc hiện tại của bạn trong đồ thị commit.

---

## ✅ Validation
- Xác định được commit mà HEAD đang trỏ tới thông qua git log.

---

## ❓ Quiz
Làm bài kiểm tra trắc nghiệm dưới đây về Repository và con trỏ HEAD.

---

## 🔥 Challenge
Nêu sự khác nhau giữa con trỏ nhánh bình thường và con trỏ HEAD trong Git.

---

## 📚 Tổng kết
- Repository là khu vực lưu trữ bất biến chứa toàn bộ snapshot lịch sử của dự án.
- HEAD là con trỏ đặc biệt chỉ định commit hoặc nhánh bạn đang đứng tại thời điểm hiện tại.
- Mỗi commit mới sẽ bổ sung một nút vào đồ thị DAG và kéo con trỏ HEAD tiến về phía trước.
