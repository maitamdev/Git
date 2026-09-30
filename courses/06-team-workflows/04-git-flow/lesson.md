# Git Flow

---

## 🎯 Mục tiêu
- Nắm bắt toàn diện kiến trúc 5 loại nhánh trong mô hình kinh điển Git Flow do Vincent Driessen đề xuất.
- Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).
- Vận hành chuẩn xác vòng đời của nhánh release và nhánh hotfix từ khi rẽ nhánh đến khi hợp nhất kép (dual-merge).
- Đánh giá được ưu nhược điểm và nhận diện các dự án phù hợp với Git Flow: ứng dụng mobile, phần mềm đóng gói, enterprise.

---

## 📖 Định nghĩa
> Git Flow là mô hình phân nhánh Git kinh điển và có cấu trúc chặt chẽ nhất, được kỹ sư Vincent Driessen giới thiệu vào năm 2010. Mô hình này thiết lập một quy trình làm việc nghiêm ngặt xoay quanh việc phát hành các phiên bản phần mềm có kế hoạch định kỳ (Scheduled Releases). Git Flow phân định mã nguồn thành hai nhánh trường tồn vĩnh viễn: `main` (lưu trữ lịch sử các bản phát hành chính thức cho khách hàng) và `develop` (nhánh tích hợp trung tâm của các tính năng mới), cùng với 3 nhóm nhánh ngắn hạn hỗ trợ: `feature/*`, `release/*` và `hotfix/*`.

---

## 🤔 Tại sao cần?
Đối với các sản phẩm như ứng dụng di động trên App Store/Google Play, phần mềm nhúng hoặc các giải pháp phần mềm doanh nghiệp (Enterprise), bạn không thể tùy tiện triển khai code mới lên người dùng nhiều lần mỗi ngày. Bạn cần một giai đoạn đóng băng tính năng (Feature Freeze) để đội QA kiểm thử hồi quy toàn diện, chuẩn bị tài liệu hướng dẫn và làm thủ tục phê duyệt ứng dụng. Git Flow cung cấp một cấu trúc vững chắc và dự đoán trước được cho toàn bộ các khâu phức tạp đó.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một xưởng đóng tàu thủy quân sự. Nhánh `main` là hạm đội tàu chiến đã được bàn giao và đang thực hiện nhiệm vụ trên biển khơi. Nhánh `develop` là xưởng đóng tàu ngầm khổng lồ nơi các đội công nhân đang lắp ráp các bộ phận mới. Khi một con tàu mới hoàn thiện phần thô, nó được đưa ra ụ thử nghiệm riêng (`release branch`) để kiểm tra chống thấm nước và sơn tĩnh điện mà không làm cản trở công nhân đóng các con tàu tiếp theo trong xưởng. Nếu một tàu chiến ngoài biển bị thủng vỏ bất ngờ, một đội cứu hộ khẩn cấp (`hotfix branch`) xuất phát ngay từ `main` để sửa chữa rồi báo cáo kết quả cho cả hai nơi.

---

## 🖼 Sơ đồ
```text
Cấu trúc 5 loại nhánh trong mô hình Git Flow kinh điển:
main:        v1.0 ────────────────────────────────────────── v1.1 (Production)
               ▲                                              ▲
               │                     ┌── release/1.1 ─────────┤
               │                     │                        ▼
develop:     ──┴─► C1 ──► C2 ──► C3 ─┴─────────────────────── C4 ──► (Next sprint)
                    │      ▲
                    └─feat─┘
```

---

## 🌎 Ví dụ thực tế
Một công ty phát triển ứng dụng ngân hàng di động trên iOS và Android áp dụng mô hình Git Flow. Nhánh `develop` là nơi 15 lập trình viên tích hợp các tính năng chuyển tiền và quét mã QR. Đến ngày 20 hàng tháng theo kế hoạch sprint, đội trưởng kỹ thuật tạo nhánh `release/v2.5.0` từ `develop`. Trong 5 ngày tiếp theo, nhánh này bị đóng băng tính năng, nhóm QA chỉ tập trung tìm lỗi và các lập trình viên chỉ commit sửa lỗi trực tiếp trên nhánh release này. Khi bản build vượt qua mọi bài kiểm thử an ninh, nhánh release được gộp vào `main`, gắn thẻ tag `v2.5.0`, đồng thời được gộp ngược lại vào `develop` để bảo đảm các bản sửa lỗi không bị thất lạc.

---

## 💻 Command
```bash
git switch -c release/v1.2.0 develop
git switch main && git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git switch develop && git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0
```

---

## 🔍 Giải thích command
- `git switch -c release/v1.2.0 develop`: Tạo nhánh phát hành xuất phát từ nhánh tích hợp develop.
- `git merge --no-ff`: Hợp nhất có tạo merge commit để bảo toàn dấu vết lịch sử của nhánh release.
- `git tag -a`: Đánh dấu mốc phiên bản phát hành chính thức trên nhánh main.
- Hợp nhất ngược về `develop`: Bước bắt buộc để mang các lỗi đã sửa trên release quay về nhánh phát triển.

---

## ⚠️ Sai lầm phổ biến
1. **Quên hợp nhất ngược nhánh release hoặc hotfix về develop**:  Dẫn đến việc các lỗi nghiêm trọng đã sửa trên production lại tái xuất hiện ở phiên bản sau.
2. **Tiếp tục code tính năng mới trên nhánh release đang đóng băng**:  Phá vỡ mục tiêu ổn định hóa của giai đoạn chuẩn bị phát hành.
3. **Áp dụng Git Flow cho các website đơn giản cần deploy 10 lần một ngày**:  Gây lãng phí công sức và làm chậm tiến độ dự án nghiêm trọng.

---

## 🧪 Lab
1. Khởi tạo hai nhánh dài hạn `main` và `develop` trong kho lưu trữ thử nghiệm.
2. Mô phỏng quy trình tạo một nhánh `release/v1.0.0` từ `develop`, sửa một lỗi nhỏ và gộp vào cả `main` lẫn `develop`.

---

## 💡 Hint
> Nhánh release và hotfix luôn luôn phải được merge vào cả hai nhánh vĩnh cửu: main và develop.

---

## ✅ Validation
- Hiểu rõ tại sao Git Flow cần quy trình hợp nhất kép (dual-merge) cho release và hotfix.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về mô hình đa nhánh Git Flow.

---

## 🔥 Challenge
Mô tả chi tiết quy trình xử lý một sự cố khẩn cấp (Hotfix) trong Git Flow từ lúc nhận báo cáo lỗi đến khi deploy xong.

---

## 📚 Tổng kết
- Git Flow là mô hình phân nhánh chặt chẽ lý tưởng cho các sản phẩm có chu kỳ phát hành cố định.
- Sở hữu 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).
- Quy trình đóng băng tính năng trên release branch bảo đảm chất lượng và sự ổn định cao nhất trước khi xuất bản.
