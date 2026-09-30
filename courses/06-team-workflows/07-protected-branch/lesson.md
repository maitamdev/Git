# Protected Branch

---

## 🎯 Mục tiêu
- Hiểu rõ khái niệm và tầm quan trọng sống còn của Protected Branch (Nhánh được bảo vệ) trên các nền tảng Git từ xa.
- Nhận diện các mối nguy hiểm bị loại bỏ hoàn toàn bởi Protected Branch: xóa nhầm nhánh, force push đè lịch sử, push trực tiếp code lỗi.
- Nắm bắt các chính sách bảo vệ cơ bản: bắt buộc mở Pull Request, cấm ghi đè lịch sử, yêu cầu quyền quản trị.
- Cấu hình kích hoạt tính năng bảo vệ nhánh trên giao diện cài đặt của GitHub.

---

## 📖 Định nghĩa
> Protected Branch (Nhánh được bảo vệ) là một cơ chế kiểm soát an ninh và phân quyền do các nền tảng lưu trữ Git đám mây (như GitHub, GitLab, Bitbucket) cung cấp nhằm áp đặt các ràng buộc nghiêm ngặt lên một hoặc nhiều nhánh quan trọng (thường là `main`, `master`, hoặc `production`). Khi một nhánh được thiết lập trạng thái Protected, không một ai — kể cả lập trình viên có quyền ghi mã nguồn — có thể tùy tiện đẩy code trực tiếp, xóa nhánh hoặc thực hiện thao tác force push làm biến đổi lịch sử nếu chưa thỏa mãn các điều kiện quy định.

---

## 🤔 Tại sao cần?
Chỉ cần một lập trình viên gõ nhầm câu lệnh `git push origin main --force` hoặc vô tình ấn xóa nhánh chính trên giao diện đồ họa, toàn bộ công sức của cả công ty có thể biến mất trong chớp mắt, gây gián đoạn dây chuyền triển khai và làm gián đoạn dịch vụ của khách hàng. Protected Branch là lá chắn thép bảo vệ tài sản số của doanh nghiệp khỏi cả những sơ suất vô ý của con người lẫn các hành vi can thiệp trái phép, bảo đảm quy trình phát triển luôn tuân thủ đúng chuẩn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung kho tiền trung tâm của một ngân hàng quốc gia. Cửa kho tiền không thể để mở toang cho bất kỳ nhân viên nào tự do ra vào ném tiền vào hay mang tiền ra tùy ý (`direct push`). Thay vào đó, cửa kho tiền luôn được khóa kiên cố (`Protected Branch`). Mọi khoản tiền gửi hay rút đều phải qua quầy giao dịch làm thủ tục, có biên lai rõ ràng (`Pull Request`) và phải có chữ ký phê duyệt của kiểm soát viên trưởng mới được phép chuyển vào bên trong.

---

## 🖼 Sơ đồ
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

## 🌎 Ví dụ thực tế
Một kỹ sư mới gia nhập dự án trong lúc bối rối đã gõ nhầm câu lệnh `git push --force origin main` từ máy cá nhân sau một thao tác rebase lỗi. Nếu là kho lưu trữ thông thường, lịch sử commit của cả dự án sẽ bị ghi đè hoàn toàn. Nhưng nhờ nhánh `main` đã được cấu hình Protected Branch từ trước, terminal của kỹ sư lập tức bật ra thông báo lỗi từ chối dứt khoát: "remote: error: GH006: Protected branch update failed for refs/heads/main. Cannot force-push to a protected branch". Kỹ sư thở phào nhẹ nhõm vì hệ thống phòng thủ đã cứu kho lưu trữ khỏi một thảm họa kỹ thuật nghiêm trọng.

---

## 💻 Command
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
1. **Quên kích hoạt Protected Branch cho các nhánh quan trọng khi vừa khởi tạo kho lưu trữ mới.**: Quên kích hoạt Protected Branch cho các nhánh quan trọng khi vừa khởi tạo kho lưu trữ mới.
2. **Cấp quyền miễn trừ (Bypass) bừa bãi cho quá nhiều tài khoản khiến cơ chế bảo vệ bị vô hiệu hóa trên thực tế.**: Cấp quyền miễn trừ (Bypass) bừa bãi cho quá nhiều tài khoản khiến cơ chế bảo vệ bị vô hiệu hóa trên thực tế.
3. **Chỉ bảo vệ nhánh main mà bỏ quên các nhánh dài hạn khác như develop hay staging.**: Chỉ bảo vệ nhánh main mà bỏ quên các nhánh dài hạn khác như develop hay staging.

---

## 🧪 Lab
1. Truy cập vào mục Settings -> Branches trên một repository GitHub thử nghiệm.
2. Thử thực hiện lệnh `git push origin main` trực tiếp từ máy cá nhân và quan sát thông báo từ chối từ GitHub.

---

## 💡 Hint
> Bảo vệ nhánh là việc đầu tiên kỹ sư trưởng phải làm ngay sau khi gõ git init và push commit đầu tiên.

---

## ✅ Validation
- Không ai có thể xóa hoặc force push vào nhánh chính đã được bảo vệ.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về tính năng Protected Branch.

---

## 🔥 Challenge
Phân tích các nguy cơ tiềm ẩn nếu một dự án cho phép các tài khoản Administrator tự do bypass các quy tắc bảo vệ nhánh.

---

## 📚 Tổng kết
- Protected Branch áp đặt các rào cản an ninh nghiêm ngặt bảo vệ các nhánh cốt lõi.
- Ngăn chặn triệt để thao tác push trực tiếp, xóa nhánh và force push phá hủy lịch sử.
- Bắt buộc mọi sự thay đổi mã nguồn phải đi qua con đường kiểm duyệt Pull Request.
