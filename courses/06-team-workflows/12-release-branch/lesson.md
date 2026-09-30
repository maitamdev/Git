# Release Branch

---

## 🎯 Mục tiêu
- Nắm vững mục đích và vòng đời chuẩn của nhánh phát hành (Release Branch) trong các quy trình phần mềm chuyên nghiệp.
- Áp dụng quy tắc Đóng băng tính năng (Feature Freeze): nghiêm cấm code tính năng mới, chỉ chấp nhận commit sửa lỗi và tài liệu.
- Thực hiện quy trình hợp nhất kép (Dual-merge): hợp nhất vào main để phát hành và hợp nhất ngược về develop để đồng bộ.
- Sử dụng Git Tag để niêm phong cột mốc phát hành chính thức sau khi nhánh release hoàn thành sứ mệnh.

---

## 📖 Định nghĩa
> Release Branch (Nhánh phát hành) là một nhánh tạm thời được tách ra từ nhánh tích hợp chính (như `develop`) nhằm mục đích chuẩn bị và ổn định hóa một bản phát hành sản phẩm chính thức. Khi một Release Branch được khởi tạo, dự án bước vào giai đoạn Đóng băng tính năng (Feature Freeze): toàn bộ việc phát triển chức năng mới cho bản phát hành này bị dừng lại, và đội ngũ kỹ sư cùng đội QA chỉ tập trung vào việc tìm lỗi, sửa lỗi hồi quy, tinh chỉnh hiệu năng và hoàn thiện tài liệu phát hành trước khi đưa ra thị trường.

---

## 🤔 Tại sao cần?
Trong các dự án quy mô lớn, nếu không có Release Branch, các lập trình viên sẽ liên tục đẩy mã nguồn mới vào nhánh chung. Đội ngũ kiểm thử (QA) sẽ không bao giờ có được một trạng thái mã nguồn tĩnh để kiểm thử toàn diện, bởi vì mỗi giờ lại có người sửa đổi logic. Release Branch tạo ra một không gian độc lập tĩnh lặng để đánh bóng chất lượng sản phẩm, trong khi phần còn lại của công ty vẫn có thể tiếp tục phát triển các tính năng cho phiên bản tiếp theo trên nhánh `develop` mà không làm phiền nhau.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc xuất bản một cuốn sách giáo khoa dày 500 trang. Nhánh `develop` là xưởng viết của tập thể các tác giả. Khi bản thảo hoàn thành, họ in một bản thử nghiệm gửi sang phòng Chế bản và Hiệu đính (`Release Branch`). Tại phòng này, các biên tập viên chỉ soi lỗi chính tả, căn chỉnh lề và sửa các câu chữ in sai mà không được phép viết thêm các chương sách mới toanh. Trong khi phòng hiệu đính đang làm việc, các tác giả ở xưởng vẫn có thể thoải mái viết các chương cho cuốn sách tập hai tiếp theo.

---

## 🖼 Sơ đồ
```text
Vòng đời của một Release Branch chuẩn mực:
develop: ──●───●───● (Tách release) ───────────────────────────● (Nhận dual-merge)
                   │                                           ▲
release/v2.1:      └───● (Fix bug) ───● (Cập nhật docs) ───────┤
                                                               │
main:    ──────────────────────────────────────────────────────┴──● (Gắn tag v2.1.0)
                                                                    (Deploy Prod)
```

---

## 🌎 Ví dụ thực tế
Trước đợt phát hành phiên bản 3.0 của ứng dụng học tập, đội trưởng kỹ thuật tạo nhánh `release/v3.0.0` từ nhánh `develop`. Trong 4 ngày sau đó, cả đội tuân thủ nghiêm ngặt chính sách Feature Freeze. Khi chuyên viên QA phát hiện lỗi video không tự động phát trên trình duyệt Firefox, kỹ sư Huy thực hiện commit sửa lỗi trực tiếp trên nhánh `release/v3.0.0`. Khi tất cả 150 kịch bản kiểm thử đều đạt yêu cầu, nhánh release được hợp nhất vào `main` với cờ `--no-ff`, được gắn thẻ tag `v3.0.0` để kích hoạt dây chuyền đóng gói đưa lên máy chủ sản xuất, đồng thời được hợp nhất ngược lại vào `develop` để giữ lại bản sửa lỗi video Firefox.

---

## 💻 Command
```bash
git switch -c release/v1.2.0 develop
git commit -m "fix(video): resolve autoplay bug on firefox"
git switch main && git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0 official"
git switch develop && git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0
```

---

## 🔍 Giải thích command
- `git switch -c release/v1.2.0 develop`: Rẽ nhánh phát hành từ điểm tích hợp develop.
- `git merge --no-ff`: Hợp nhất tạo merge commit bảo toàn nhánh vào main và develop.
- `git tag -a`: Đánh dấu phiên bản phát hành chính thức.
- `git branch -d`: Xóa nhánh release sau khi hoàn thành quy trình hợp nhất kép an toàn.

---

## ⚠️ Sai lầm phổ biến
1. **Cho phép thành viên viết thêm tính năng mới toanh vào nhánh release đang trong giai đoạn đóng băng.**: Cho phép thành viên viết thêm tính năng mới toanh vào nhánh release đang trong giai đoạn đóng băng.
2. **Quên hợp nhất ngược nhánh release về develop**:  Khiến các lỗi đã sửa công phu bị biến mất ở phiên bản tiếp theo.
3. **Xóa nhánh release trước khi bảo đảm toàn bộ mã nguồn đã được hợp nhất đủ vào cả main và develop.**: Xóa nhánh release trước khi bảo đảm toàn bộ mã nguồn đã được hợp nhất đủ vào cả main và develop.

---

## 🧪 Lab
1. Tạo nhánh `release/v1.0.0` từ nhánh `develop` trong kho lưu trữ mô phỏng.
2. Thực hiện một commit sửa lỗi tài liệu trên nhánh release, sau đó thực hiện hợp nhất kép vào cả `main` và `develop`.

---

## 💡 Hint
> Chỉ các commit sửa lỗi quan trọng (Bug fixes) và cập nhật số phiên bản mới được phép xuất hiện trên Release Branch.

---

## ✅ Validation
- Cả hai nhánh main và develop đều sở hữu đầy đủ các commit sửa lỗi được thực hiện trên release branch.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về quy trình vận hành Release Branch.

---

## 🔥 Challenge
Mô tả cách xử lý nếu trong quá trình hợp nhất ngược nhánh release về develop phát sinh xung đột mã nguồn lớn.

---

## 📚 Tổng kết
- Release Branch tạo ra vùng cách ly để ổn định hóa và kiểm thử hồi quy trước giờ phát hành.
- Chính sách Feature Freeze nghiêm cấm thêm tính năng mới, chỉ ưu tiên sửa lỗi và hoàn thiện bản build.
- Bắt buộc thực hiện quy trình hợp nhất kép vào cả main và develop để bảo toàn lịch sử sửa lỗi.
