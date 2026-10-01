# Protected Branch

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.
- Nhận diện các mối nguy hiểm bị loại bỏ hoàn toàn bởi Protected Branch: xóa nhầm nhánh, force push đè lịch sử, push trực tiếp code lỗi.
- Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.
- Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub.

---

## 🧩 Từ khóa hôm nay

### Protected Branch (Nhánh được bảo vệ)
- **Nói dễ hiểu**: Thiết lập an ninh trên server (GitHub/GitLab) nhằm chặn đứng push trực tiếp, force push và xóa nhánh quan trọng.
- **Ví dụ**: Bảo vệ nhánh `main` để không ai có thể vô tình xóa hoặc ghi đè lịch sử của dự án.
- **Đừng nhầm**: Đây là tính năng do máy chủ từ xa quản lý, không phải là câu lệnh chạy ở máy Git cục bộ.

### Direct Push Prevention
- **Nói dễ hiểu**: Cơ chế từ chối mọi lệnh `git push` trực tiếp lên nhánh, bắt buộc mã nguồn phải đi qua Pull Request.
- **Ví dụ**: Lập trình viên gõ `git push origin main` thì terminal báo lỗi từ chối ngay lập tức vì nhánh đã được bảo vệ.
- **Đừng nhầm**: Không có nghĩa là nhánh bị khóa chết; bạn vẫn có thể merge code vào thông qua Pull Request được duyệt.

### Force Push Protection
- **Nói dễ hiểu**: Rào chắn cấm vĩnh viễn việc dùng cờ `--force` để ghi đè lịch sử commit trên các nhánh dùng chung.
- **Ví dụ**: Ngăn chặn việc ai đó lỡ tay chạy `git push --force` làm mất các commit quan trọng của toàn bộ đồng nghiệp.
- **Đừng nhầm**: Ngay cả khi bạn có quyền admin, việc cho phép bypass force push cũng tiềm ẩn nguy cơ phá hủy dữ liệu.

---

## 📖 Định nghĩa
Protected Branch (Nhánh được bảo vệ) là cơ chế kiểm soát an ninh do các nền tảng Git từ xa cung cấp nhằm áp đặt các ràng buộc chặt chẽ lên các nhánh trọng yếu: cấm push trực tiếp, cấm xóa nhánh và vô hiệu hóa hoàn toàn thao tác force-push.

---

## 💡 Tại sao cần
Chỉ một sơ suất gõ nhầm `git push --force origin main` hoặc vô tình xóa nhánh chính, công sức cả đội ngũ có thể bị phá hủy. Protected Branch là lá chắn thép bảo vệ tài sản số khỏi sai sót con người và bảo đảm mã nguồn luôn được kiểm duyệt trước khi vào main.

---

## 🧠 Mental Model
Hãy hình dung cửa kho tiền trung tâm ngân hàng. Cửa kho không bao giờ để mở toang cho nhân viên tự do ném tiền vào hay rút tiền ra. Cửa luôn khóa kiên cố. Muốn gửi hay rút tiền đều phải làm thủ tục qua quầy giao dịch, có biên lai và kiểm soát viên duyệt mới được chuyển vào.

---

## 📊 Sơ đồ minh họa
```text
Cơ chế phòng thủ của Protected Branch trên GitHub:
Dev cố tình gõ: git push origin main
                │
                ▼
        ┌───────────────────────────────┐
        │  GitHub Branch Protection     │
        │  [X] Direct push disabled!    │ ──► TỪ CHỐI (Remote rejected!)
        │  [X] Force push disabled!     │
        └───────────────────────────────┘
                ▲
                │ Chỉ cho phép đi qua con đường duy nhất:
        [Pull Request ──► Code Review ──► CI Pass ──► Merge]
```

---

## 🏢 Ví dụ thực tế
Kỹ sư mới gia nhập lỡ tay gõ `git push --force origin main` sau một thao tác rebase nhầm. Nhờ nhánh main đã được bảo vệ, GitHub từ chối lệnh ngay lập tức và in lỗi: "Protected branch update failed. Cannot force-push". Lịch sử của cả công ty được giữ an toàn tuyệt đối.

---

## 💻 Command & Cú pháp
```bash
git push origin main
git push origin --delete main
git push --force origin main
```

---

## 🔍 Giải thích command
- `git push origin main`: Thao tác bị chặn đứng bởi Protected Branch nếu chưa qua Pull Request.
- `git push origin --delete`: Bị từ chối tuyệt đối nhằm ngăn chặn rủi ro vô tình xóa mất nhánh chính.
- `git push --force`: Bị vô hiệu hóa hoàn toàn để bảo vệ tính toàn vẹn của lịch sử commit.

---

## ⚠️ Sai lầm phổ biến
1. **Quên kích hoạt bảo vệ**: Không bật Protected Branch ngay khi vừa tạo repo khiến nhánh chính dễ bị ghi đè.
2. **Cấp quyền miễn trừ (Bypass) tùy tiện**: Cho phép quá nhiều tài khoản được bypass làm mất đi tác dụng bảo vệ an ninh.
3. **Bỏ quên các nhánh dài hạn khác**: Chỉ bảo vệ mỗi `main` mà bỏ qua các nhánh quan trọng như `develop` hay `staging`.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Truy cập vào mục Settings -> Branches trên một repository GitHub thử nghiệm.
2. Kích hoạt quy tắc bảo vệ nhánh cho nhánh `main`.
3. Thử thực hiện lệnh `git push origin main` trực tiếp từ terminal máy cá nhân.
4. Quan sát thông báo từ chối từ GitHub và kiểm tra các điều kiện mở khóa.

---

## 💡 Hint & mẹo
> Bảo vệ nhánh là việc đầu tiên kỹ sư trưởng phải làm ngay sau khi gõ git init và push commit đầu tiên lên kho lưu trữ từ xa.

---

## ✅ Validation & Kết quả mong đợi
- Không ai có thể xóa hoặc force push vào nhánh chính đã được bảo vệ.
- Mọi thay đổi vào nhánh bảo vệ đều phải đi qua cổng kiểm duyệt Pull Request.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây về tính năng Protected Branch.

---

## 🚀 Thử thách nâng cao
Phân tích các nguy cơ tiềm ẩn nếu một dự án cho phép các tài khoản Administrator tự do bypass các quy tắc bảo vệ nhánh.

---

## 📝 Tổng kết
- Protected Branch là tấm khiên an ninh bảo vệ nhánh chính khỏi phá hủy và ghi đè lịch sử.
- Chặn push trực tiếp, cấm force-push và cấm xóa nhánh.
- Bắt buộc mọi thay đổi mã nguồn phải thông qua quy trình Pull Request chuẩn mực.
