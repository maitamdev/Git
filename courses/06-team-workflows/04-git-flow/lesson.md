# Git Flow

---

## 🎯 Mục tiêu
- Hiểu vai trò của `main`, `develop`, `feature`, `release` và `hotfix` trong mô hình Git Flow.
- Phân biệt rõ ràng vai trò của 2 nhánh vĩnh cửu (main, develop) và 3 nhánh tạm thời (feature, release, hotfix).
- Mô tả cách release/hotfix quay về các nhánh dài hạn trong quy trình Git Flow.
- Nhận biết lợi ích và chi phí của quy trình nhiều nhánh; lựa chọn theo chu kỳ release của nhóm.

---

## 🧩 Từ khóa hôm nay

### Git Flow
- **Nói dễ hiểu**: Mô hình phân nhánh kinh điển với hai nhánh vĩnh cửu (`main`, `develop`) cùng các nhánh phụ (`feature`, `release`, `hotfix`).
- **Ví dụ**: Dùng cho app ngân hàng di động phát hành bản cập nhật định kỳ mỗi tháng một lần lên App Store.
- **Đừng nhầm**: Git Flow là một lựa chọn, không phải quy trình bắt buộc cho mobile hay enterprise. Nhóm có thể chọn workflow khác tùy cách release.

### Dual-Merge (Hợp nhất kép)
- **Nói dễ hiểu**: Thao tác merge một nhánh (như release hoặc hotfix) vào cả hai nhánh vĩnh cửu `main` và `develop`.
- **Ví dụ**: Sau khi vá lỗi trên `release/v2.5.0`, merge vào `main` để xuất bản và merge ngược vào `develop` để không mất bản vá.
- **Đừng nhầm**: Nếu nhóm duy trì `develop`, họ thường tích hợp lại các bản vá cần thiết vào đó; Git Flow không tự làm bước này.

### Feature Freeze (Đóng băng tính năng)
- **Nói dễ hiểu**: Giai đoạn dừng nhận thêm tính năng mới trên nhánh release để đội ngũ QA tập trung kiểm thử hồi quy và vá lỗi.
- **Ví dụ**: Trong một quy trình Git Flow điển hình, nhánh `release/v1.2.0` chỉ nhận chỉnh sửa để ổn định bản phát hành; tính năng kế tiếp tiếp tục ở `develop`.
- **Đừng nhầm**: Các tính năng mới của sprint sau vẫn được commit bình thường trên nhánh `develop`, không bị dừng lại.

---

## 📖 Định nghĩa
Git Flow là mô hình phân nhánh nhiều tầng gồm hai nhánh dài hạn `main` và `develop`, cùng các nhánh ngắn hạn `feature`, `release`, `hotfix`. Mô hình này tách công việc đang phát triển khỏi giai đoạn ổn định một bản phát hành.

---

## 💡 Tại sao cần
Mô hình này tạo các nhánh riêng cho phát triển, ổn định release và sửa lỗi khẩn cấp. Đổi lại, nhóm phải quản lý thêm nhánh và nhớ đồng bộ các bản vá giữa chúng.

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
Ví dụ: nhóm có lịch phát hành định kỳ tạo `release/v2.5.0` từ `develop`, chỉ nhận bản sửa phục vụ ổn định release, rồi hợp nhất vào `main` và gắn tag. Nếu vẫn duy trì `develop`, nhóm tích hợp lại các bản sửa phù hợp vào đó.

---

## 💻 Command & Cú pháp
```bash
git switch -c release/v1.2.0 develop
git switch main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git switch develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0
```

Đây là Git thật trong repo thử nghiệm đã có `main` và `develop`; Git Flow không tự tạo các nhánh hoặc quy tắc bảo vệ.

---

## 🔍 Giải thích command
- `git switch -c release/v1.2.0 develop`: Tạo nhánh phát hành xuất phát từ nhánh tích hợp develop.
- `git merge --no-ff`: Hợp nhất có tạo merge commit để bảo toàn dấu vết lịch sử của nhánh release.
- `git tag -a`: Đánh dấu mốc phiên bản phát hành chính thức trên nhánh main.
- Hợp nhất ngược về `develop`: Trong Git Flow, tích hợp các bản sửa release cần giữ cho nhánh phát triển tiếp theo.

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
> Trong Git Flow, kiểm tra sau mỗi release/hotfix rằng các thay đổi cần giữ đã có trên cả nhánh phát hành và nhánh phát triển.

---

## ✅ Validation & Kết quả mong đợi
- Mô tả được mục đích của việc đưa release/hotfix vào `main` và tích hợp lại thay đổi cần thiết vào `develop`.
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
- Với Git Flow, tích hợp các bản sửa release/hotfix cần thiết về nhánh phát triển.
