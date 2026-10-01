# Git Flow

---

## 🎯 Mục tiêu
- Nắm bắt toàn diện kiến trúc 5 loại nhánh trong mô hình kinh điển Git Flow do Vincent Driessen đề xuất.
- Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).
- Vận hành chuẩn xác vòng đời của nhánh release và nhánh hotfix từ khi rẽ nhánh đến khi hợp nhất kép (dual-merge).
- Đánh giá được ưu nhược điểm và nhận diện các dự án phù hợp với Git Flow: ứng dụng mobile, phần mềm đóng gói, enterprise.

---

## 🧩 Từ khóa hôm nay

### Git Flow
- **Nói dễ hiểu**: Mô hình phân nhánh kinh điển với hai nhánh vĩnh cửu (`main`, `develop`) cùng các nhánh phụ (`feature`, `release`, `hotfix`).
- **Ví dụ**: Dùng cho app ngân hàng di động phát hành bản cập nhật định kỳ mỗi tháng một lần lên App Store.
- **Đừng nhầm**: Git Flow không tối ưu cho web app cần deploy liên tục hàng ngày; nó phù hợp cho sản phẩm đóng gói có lịch release cố định.

### Dual-Merge (Hợp nhất kép)
- **Nói dễ hiểu**: Thao tác merge một nhánh (như release hoặc hotfix) vào cả hai nhánh vĩnh cửu `main` và `develop`.
- **Ví dụ**: Sau khi vá lỗi trên `release/v2.5.0`, merge vào `main` để xuất bản và merge ngược vào `develop` để không mất bản vá.
- **Đừng nhầm**: Nếu quên merge ngược về `develop`, các lỗi đã sửa trên production sẽ tái xuất hiện ở phiên bản kế tiếp.

### Feature Freeze (Đóng băng tính năng)
- **Nói dễ hiểu**: Giai đoạn dừng nhận thêm tính năng mới trên nhánh release để đội ngũ QA tập trung kiểm thử hồi quy và vá lỗi.
- **Ví dụ**: Nhánh `release/v1.2.0` chỉ nhận commit sửa bug từ QA, tuyệt đối không thêm tính năng mới của sprint sau.
- **Đừng nhầm**: Các tính năng mới của sprint sau vẫn được commit bình thường trên nhánh `develop`, không bị dừng lại.

---

## 📖 Định nghĩa
Git Flow là mô hình phân nhánh chặt chẽ có hai nhánh vĩnh cửu: `main` (lưu trữ phiên bản phát hành chính thức) và `develop` (nhánh tích hợp tính năng mới), cùng 3 loại nhánh ngắn hạn hỗ trợ: `feature/*`, `release/*` và `hotfix/*`.

---

## 💡 Tại sao cần
Với các sản phẩm như ứng dụng di động hoặc phần mềm doanh nghiệp, bạn không thể deploy liên tục mà cần giai đoạn đóng băng kiểm thử hồi quy và xét duyệt. Git Flow cung cấp cấu trúc rõ ràng và kiểm soát chặt chẽ cho toàn bộ quy trình phát hành phức tạp này.

---

## 🧠 Mental Model
Hãy hình dung xưởng đóng tàu quân sự. Nhánh main là hạm đội tàu chiến đang hoạt động trên biển. Nhánh develop là xưởng ngầm lắp ráp linh kiện mới. Khi hoàn thiện phần thô, tàu được đưa ra ụ thử nghiệm riêng (release) để sơn và chống thấm. Khi tàu ngoài biển thủng vỏ, đội cứu hộ (hotfix) xuất phát từ main để xử lý khẩn cấp.

---

## 📊 Sơ đồ minh họa
```text
Cấu trúc 5 loại nhánh trong mô hình Git Flow kinh điển:
main:        v1.0 ────────────────────────────────────────── v1.1 (Production)
               ▲                                              ▲
               │                     ┌── release/1.1 ─────────┤ (Dual-merge!)
               │                     │                        ▼
develop:     ──┴─► C1 ──► C2 ──► C3 ─┴─────────────────────── C4 ──► (Next sprint)
                    │      ▲
                    └─feat─┘
```

---

## 🏢 Ví dụ thực tế
Ứng dụng ngân hàng di động áp dụng Git Flow. Đến ngày 20 hàng tháng, nhóm tạo nhánh `release/v2.5.0` từ `develop` để đóng băng tính năng cho QA kiểm thử. Sau khi vượt qua kiểm định an ninh, nhánh release được merge vào `main`, gắn tag `v2.5.0`, đồng thời merge ngược về `develop` để bảo toàn các bản vá lỗi.

---

## 💻 Command & Cú pháp
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
1. **Quên merge ngược về develop**: Khiến các bản vá lỗi trên nhánh release hoặc hotfix bị thất lạc ở phiên bản tiếp theo.
2. **Thêm tính năng vào nhánh release**: Phá vỡ nguyên tắc đóng băng tính năng (Feature Freeze) để ổn định mã nguồn.
3. **Lạm dụng cho dự án web đơn giản**: Áp dụng mô hình nhiều nhánh cồng kềnh cho sản phẩm cần deploy liên tục sẽ gây lãng phí nguồn lực.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Khởi tạo hai nhánh dài hạn `main` và `develop` trong kho lưu trữ thử nghiệm.
2. Tạo nhánh tính năng `feature/demo` từ `develop` và gộp lại vào `develop`.
3. Mô phỏng quy trình tạo một nhánh `release/v1.0.0` từ `develop`, sửa một lỗi nhỏ và gộp vào cả `main` lẫn `develop`.
4. Gắn thẻ Annotated Tag `v1.0.0` trên nhánh `main`.

---

## 💡 Hint & mẹo
> Nhánh release và hotfix luôn luôn phải được merge vào cả hai nhánh vĩnh cửu: main và develop để bảo toàn lịch sử.

---

## ✅ Validation & Kết quả mong đợi
- Hiểu rõ tại sao Git Flow cần quy trình hợp nhất kép (dual-merge) cho release và hotfix.
- Phân biệt rõ ràng mục đích sử dụng giữa 2 nhánh dài hạn và 3 nhánh ngắn hạn.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây về mô hình đa nhánh Git Flow.

---

## 🚀 Thử thách nâng cao
Mô tả chi tiết quy trình xử lý một sự cố khẩn cấp (Hotfix) trong Git Flow từ lúc nhận báo cáo lỗi đến khi deploy xong.

---

## 📝 Tổng kết
- Git Flow là mô hình phân nhánh chặt chẽ lý tưởng cho các sản phẩm có chu kỳ phát hành cố định.
- Duy trì 2 nhánh vĩnh cửu: `main` (Production) và `develop` (Integration).
- Áp dụng hợp nhất kép (Dual-Merge) cho các nhánh `release` và `hotfix`.
