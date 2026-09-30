# Vòng đời tệp tin trong Git

---

## 🎯 Mục tiêu
- Nắm vững toàn diện 4 trạng thái vòng đời của một tệp tin trong Git: Untracked, Unmodified, Modified, Staged.
- Vẽ và phân tích được cỗ máy trạng thái (State Machine) chuyển dịch giữa các khu vực.
- Dự đoán chính xác trạng thái của tệp tin sau mỗi câu lệnh Git thực thi.

---

## 📖 Định nghĩa
> Vòng đời của tệp tin trong Git là mô hình trạng thái mô tả hành trình biến đổi của một tệp mã nguồn xuyên suốt quá trình phát triển dự án. Tất cả các tệp trong thư mục làm việc của bạn đều thuộc một trong hai nhóm chính: Tracked (được theo dõi trong lịch sử) hoặc Untracked (chưa từng được theo dõi). Một tệp Tracked sẽ luân chuyển liên tục qua ba trạng thái con: Unmodified (nguyên vẹn trùng khớp với commit), Modified (đã bị chỉnh sửa nội dung nhưng chưa stage), và Staged (đã được đánh dấu chuẩn bị đưa vào commit kế tiếp).

---

## 🤔 Tại sao cần?
Hiểu rõ cỗ máy trạng thái vòng đời tệp tin giúp bạn giải mã được mọi thông điệp đầu ra của Git một cách dễ dàng. Bạn sẽ không bao giờ còn thắc mắc tại sao một tệp lại vừa xuất hiện ở mục màu xanh vừa xuất hiện ở mục màu đỏ trong `git status`, hoặc tại sao lệnh chuyển nhánh lại từ chối thực thi vì tệp đang ở trạng thái Modified dở dang. Làm chủ vòng đời trạng thái là bước nhảy vọt từ một người học việc thành một lập trình viên làm chủ công cụ.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung vòng đời của tệp tin giống như vòng đời của một vị khách bước vào một sân bay quốc tế. Ban đầu, hành khách đứng ở sảnh chờ ngoài đường (Untracked). Khi bước vào cửa an ninh xuất trình vé (git add), hành khách được ghi danh vào hệ thống máy tính và bước vào phòng chờ lên máy bay (Staged). Khi máy bay cất cánh (git commit), hành khách đã chính thức nằm trong chuyến bay lịch sử (Unmodified). Nếu trong chuyến bay hành khách đổi ghế ngồi, trạng thái sẽ thành Modified.

---

## 🖼 Sơ đồ
```text
Cỗ máy trạng thái vòng đời tệp tin trong Git:
          ┌──────────────────────────────────────────────────────────┐
          │                                                          │
          ▼                                                          │
┌──────────────────┐   git add    ┌──────────────────┐  git commit   │
│    Untracked     │ ───────────► │      Staged      │ ──────────────┘
│ (Chưa theo dõi)  │              │ (Vùng chuẩn bị)  │ (Trở thành Unmodified)
└──────────────────┘              └──────────────────┘
                                           ▲
                                           │ git add
                                  ┌──────────────────┐
                                  │     Modified     │ ◄── Chỉnh sửa file
                                  │ (Đã bị sửa đổi)  │
                                  └──────────────────┘
```

---

## 🌎 Ví dụ thực tế
Kỹ sư tạo một tệp mã nguồn mới mang tên user.js trong thư mục dự án, lúc này tệp đang ở trạng thái Untracked hoàn toàn xa lạ với Git. Ngay sau khi kỹ sư chạy lệnh git add user.js, tệp lập tức chuyển dịch trạng thái sang Staged sẵn sàng trong vùng chuẩn bị. Kế tiếp, kỹ sư chạy lệnh git commit với thông điệp chuẩn mực, tệp được ghi vào lịch sử và trở về trạng thái Unmodified ổn định tuyệt đối. Đến buổi chiều, khi kỹ sư mở lại tệp user.js để bổ sung logic mã hóa mật khẩu người dùng, tệp chuyển sang trạng thái Modified, sẵn sàng cho một vòng tuần hoàn đóng gói commit tiếp theo.

---

## 💻 Command
```bash
git status -s
git add <file>
git commit
```

---

## 🔍 Giải thích command
- `git status -s`: Hiển thị mã trạng thái hai cột phản ánh chính xác vị trí của tệp trong cỗ máy trạng thái.
- `git add <file>`: Kích hoạt sự chuyển dịch trạng thái từ Untracked hoặc Modified sang Staged.
- `git commit`: Đưa tất cả các tệp Staged trở về trạng thái Unmodified trong snapshot mới.

---

## ⚠️ Sai lầm phổ biến
1. **Không hiểu tại sao một tệp có thể vừa Staged vừa Modified**:  Khi bạn add tệp rồi lại sửa tiếp mà chưa add lần hai, tệp sẽ tồn tại đồng thời ở cả hai trạng thái.
2. **Tưởng tệp Untracked sẽ được commit tự động**:  Git không bao giờ tự ý commit tệp chưa được add vào hệ thống theo dõi.
3. **Nhầm lẫn giữa tệp bị xóa (Deleted) và tệp Untracked**:  Tệp đã từng commit khi bị xóa sẽ ở trạng thái Tracked/Deleted chứ không phải Untracked.

---

## 🧪 Lab
1. Tạo tệp mới `status-test.txt` và kiểm tra trạng thái Untracked bằng `git status -s`.
2. Chạy `git add status-test.txt` và quan sát ký tự `A ` (Added/Staged) màu xanh.
3. Commit tệp và chạy `git status -s` để thấy kết quả rỗng (tất cả đều Unmodified).
4. Mở tệp sửa một dòng để quan sát ký tự ` M` (Modified) xuất hiện ở cột thứ hai.

---

## 💡 Hint
> Theo dõi sự thay đổi vị trí ký tự cột trái (Index) và cột phải (Working Tree).

---

## ✅ Validation
- Giải thích được sự biến đổi trạng thái qua các bước tạo, add, commit và sửa tệp.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra mức độ nắm bắt cỗ máy trạng thái Git.

---

## 🔥 Challenge
Mô tả tình huống làm xuất hiện ký tự `MM` trong kết quả của lệnh git status -s.

---

## 📚 Tổng kết
- Tệp tin trong Git gồm hai nhóm lớn: Tracked (được theo dõi) và Untracked (chưa theo dõi).
- Tệp Tracked luân chuyển qua 3 trạng thái con: Unmodified -> Modified -> Staged.
- Hiểu rõ vòng đời giúp bạn làm chủ hoàn toàn các câu lệnh Git và phản hồi từ git status.
