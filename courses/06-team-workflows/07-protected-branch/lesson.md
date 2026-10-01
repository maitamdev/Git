# Protected Branch

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.
- Biết những thao tác có thể bị chặn khi quy tắc bảo vệ tương ứng được bật.
- Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.
- Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub.

---

## 🧩 Từ khóa hôm nay

### Protected Branch (Nhánh được bảo vệ)
- **Nói dễ hiểu**: Các quy tắc trên máy chủ Git có thể giới hạn ai được cập nhật nhánh, yêu cầu Pull Request hoặc chặn force push và xóa nhánh.
- **Ví dụ**: Bảo vệ nhánh `main` để không ai có thể vô tình xóa hoặc ghi đè lịch sử của dự án.
- **Đừng nhầm**: Tạo một quy tắc bảo vệ không đồng nghĩa mọi thao tác đều bị chặn; kết quả phụ thuộc các lựa chọn trong quy tắc và quyền bypass.

### Direct Push Prevention
- **Nói dễ hiểu**: Cơ chế từ chối cập nhật trực tiếp khi quy tắc yêu cầu Pull Request hoặc giới hạn người được push.
- **Ví dụ**: Lập trình viên gõ `git push origin main` thì terminal báo lỗi từ chối ngay lập tức vì nhánh đã được bảo vệ.
- **Đừng nhầm**: Nếu không bật điều kiện yêu cầu Pull Request hay giới hạn push, một lần push thường vẫn có thể được chấp nhận.

### Force Push Protection
- **Nói dễ hiểu**: GitHub chặn force push lên nhánh được bảo vệ theo mặc định; người có quyền bypass hoặc cấu hình ngoại lệ có thể thay đổi kết quả.
- **Ví dụ**: Ngăn chặn việc ai đó lỡ tay chạy `git push --force` làm mất các commit quan trọng của toàn bộ đồng nghiệp.
- **Đừng nhầm**: Ngay cả khi bạn có quyền admin, việc cho phép bypass force push cũng tiềm ẩn nguy cơ phá hủy dữ liệu.

---

## 📖 Định nghĩa
Protected Branch là nhánh trên máy chủ được áp dụng một hoặc nhiều quy tắc bảo vệ. Tùy cấu hình, quy tắc có thể yêu cầu Pull Request, lượt duyệt hoặc status check, đồng thời chặn force push hay xóa nhánh. Quy tắc không tự quyết định ai được bypass; điều đó còn phụ thuộc quyền và cấu hình của repository.

---

## 💡 Tại sao cần
Quy tắc bảo vệ giúp nhóm giảm rủi ro cập nhật nhầm nhánh hoặc bỏ qua bước review đã thống nhất. Nó không thay thế backup, kiểm thử hay phân quyền phù hợp; cấu hình quá rộng hoặc quyền bypass vẫn có thể cho phép thay đổi không mong muốn.

---

## 🧠 Mental Model
Hãy hình dung một cổng có nhiều chốt: nhóm chọn chốt nào cần dùng, chẳng hạn yêu cầu phiếu duyệt hoặc chặn ghi đè lịch sử. Một số chốt có mặc định riêng, nhưng quyền quản trị và cấu hình ngoại lệ vẫn ảnh hưởng kết quả.

---

## 📊 Sơ đồ minh họa
```text
Ví dụ khi cấu hình yêu cầu Pull Request và không cấp ngoại lệ:
Dev gõ: git push origin main
                │
                ▼
        ┌───────────────────────────────┐
        │  GitHub Branch Protection     │
        │  [X] Yêu cầu Pull Request     │ ──► TỪ CHỐI (nếu người push không được bypass)
        │  [X] Chặn force push (mặc định)│
        └───────────────────────────────┘
                ▲
                │ Nếu rule yêu cầu PR:
        [Pull Request ──► Review/checks đã cấu hình ──► Merge]
```

---

## 🏢 Ví dụ thực tế
Ví dụ giả định: repository bật quy tắc yêu cầu Pull Request và chặn force push, đồng thời tài khoản của kỹ sư không nằm trong danh sách bypass. Khi kỹ sư thử cập nhật trực tiếp `main`, máy chủ từ chối; thông báo cụ thể phụ thuộc nền tảng và cấu hình.

---

## 💻 Command & Cú pháp
```bash
git push origin main
# Hai lệnh sau có thể bị từ chối bởi quy tắc tương ứng; không chạy trên repo thật
git push origin --delete main
git push --force origin main
```

---

## 🔍 Giải thích command
- `git push origin main`: Bị từ chối nếu quy tắc yêu cầu Pull Request/giới hạn push và bạn không được bypass; cấu hình khác có thể vẫn cho phép.
- `git push origin --delete main`: Bị từ chối khi nhánh được bảo vệ và chính sách không cho phép xóa.
- `git push --force origin main`: Bị chặn mặc định trên nhánh được bảo vệ; có thể được bật lại cho người có quyền theo cấu hình.

---

## ⚠️ Sai lầm phổ biến
1. **Cho rằng có bảo vệ là không ai push được**: Quy tắc mặc định chặn force push/xóa nhánh, còn push thường phụ thuộc PR requirement và hạn chế quyền.
2. **Cấp quyền miễn trừ (Bypass) tùy tiện**: Cho phép quá nhiều tài khoản được bypass làm mất đi tác dụng bảo vệ an ninh.
3. **Bỏ quên các nhánh dài hạn khác**: Chỉ bảo vệ mỗi `main` mà bỏ qua các nhánh quan trọng như `develop` hay `staging`.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Dùng repository thử nghiệm mà bạn quản lý; không thử lệnh xóa hoặc force push trên dự án thật.
2. Mở **Settings → Branches**, tạo quy tắc cho `main` và bật **Require a pull request before merging**.
3. Nếu có tài khoản cộng tác viên thử nghiệm, thử push một commit lên `main`; nếu không, chỉ xem cấu hình và mô phỏng kết quả.
4. Mở PR thử nghiệm, ghi lại điều kiện còn thiếu và cách quy tắc cho phép merge.

---

## 💡 Hint & mẹo
> Trước khi bật quy tắc cho repo đang dùng, kiểm tra xem ai có quyền bypass và các điều kiện bắt buộc có phù hợp với quy trình của nhóm không.

---

## ✅ Validation & Kết quả mong đợi
- Chỉ ra được từng quy tắc đang bật và ai có thể bypass.
- Với cấu hình yêu cầu PR, giải thích được vì sao push trực tiếp bị từ chối và điều kiện nào mở khóa việc merge.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây về tính năng Protected Branch.

---

## 🚀 Thử thách nâng cao
Phân tích các nguy cơ tiềm ẩn nếu một dự án cho phép các tài khoản Administrator tự do bypass các quy tắc bảo vệ nhánh.

---

## 📝 Tổng kết
- Protected Branch là tên gọi cho nhánh có một hoặc nhiều quy tắc bảo vệ.
- Push trực tiếp, force push, xóa nhánh, review và status check được điều khiển bởi các quy tắc riêng.
- Quyền bypass và cấu hình repository ảnh hưởng đến kết quả thực tế.
