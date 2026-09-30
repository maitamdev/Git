# Đẩy commit lên server với git push

---

## 🎯 Mục tiêu
- Sử dụng câu lệnh `git push` để đẩy các commit cục bộ lên máy chủ từ xa GitHub.
- Hiểu rõ ý nghĩa của cờ `-u` (`--set-upstream`) trong lần push đầu tiên của một nhánh mới.
- Chẩn đoán và xử lý tình huống bị máy chủ từ chối đẩy code (`[rejected - non-fast-forward]`).
- Nhận thức rõ mức độ nguy hiểm và quy tắc cấm kỵ đối với cờ cưỡng chế `--force` trên các nhánh dùng chung.

---

## 📖 Định nghĩa
> `git push` là câu lệnh xuất bản mã nguồn trong Git, có nhiệm vụ truyền tải các commit snapshot từ kho lưu trữ cục bộ trên máy tính của bạn lên kho lưu trữ từ xa trên máy chủ GitHub và cập nhật con trỏ nhánh trên máy chủ tiến về phía trước tương ứng. Đây là phương thức duy nhất để biến những thành quả lập trình cá nhân của bạn thành dữ liệu chung cho toàn bộ đội ngũ kỹ thuật cùng tiếp cận.

---

## 🤔 Tại sao cần?
Viết mã nguồn xuất sắc đến đâu nhưng nếu chỉ giữ trên máy tính cá nhân thì đồng nghiệp và hệ thống tự động hóa kiểm thử vẫn không thể kiểm tra hay đưa vào sản phẩm. `git push` là bước cuối cùng hoàn tất chu trình phát triển tính năng. Nắm vững lệnh push giúp bạn tự tin chia sẻ mã nguồn, biết cách xử lý khi bị server từ chối vì có người khác push trước, và tránh gây ra các tai họa làm mất code của cả nhóm.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung việc bạn viết code và commit trên máy tính cá nhân giống như một nhà văn ngồi sáng tác một chương tiểu thuyết mới trong phòng làm việc riêng. `git push` giống như hành động nhà văn đem bản thảo chương mới đó gửi lên tòa soạn báo để in ấn và phát hành ra toàn quốc. Nếu tòa soạn báo nhận thấy trước đó đã có một chương truyện khác vừa được xuất bản mà nhà văn chưa đọc (rejected), nhà văn phải cập nhật phiên bản mới nhất về đọc trước rồi mới được gửi tiếp.

---

## 🖼 Sơ đồ
```text
Cơ chế hoạt động của git push:
Máy tính cá nhân (Local):       Máy chủ GitHub (Remote origin):
Nhánh main: C1 ──► C2 ──► C3    Nhánh main: C1 ──► C2
            │                               │
            └──────── git push origin main ─┘
            (Đẩy C3 lên, cập nhật con trỏ remote main lên C3)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Tuấn vừa hoàn thành chức năng tìm kiếm sản phẩm nâng cao trên nhánh feature-search với 3 commit mới được kiểm thử kỹ lưỡng. Tuấn mở cửa sổ console và gõ lệnh: `git push -u origin feature-search`. Git kết nối bảo mật tới GitHub, tạo ra một nhánh mới có tên feature-search trên máy chủ từ xa, đẩy toàn bộ các commit lên đám mây và thiết lập mối quan hệ theo dõi upstream giữa hai nhánh. Màn hình console hiển thị đường dẫn trực tiếp mời Tuấn bấm vào để tạo Pull Request trên giao diện web của GitHub để các đồng nghiệp cùng tham gia review mã nguồn. Toàn bộ tiến trình diễn ra nhanh chóng chỉ trong vài giây.

---

## 💻 Command
```bash
git push
git push origin <tên-nhánh>
git push -u origin <tên-nhánh>
git push origin --all
git push origin --delete <tên-nhánh>
```

---

## 🔍 Giải thích command
- `git push`: Đẩy commit lên remote và nhánh mặc định đã được thiết lập tracking.
- `git push origin <tên-nhánh>`: Đẩy nhánh chỉ định lên remote mang tên origin.
- `git push -u origin <nhánh>`: Đẩy lên và ghi nhớ mối quan hệ upstream tracking (lần sau chỉ cần gõ `git push`).
- `git push origin --all`: Đẩy toàn bộ các nhánh cục bộ hiện có lên máy chủ cùng một lúc.
- `git push origin --delete <nhánh>`: Xóa bỏ một con trỏ nhánh trên máy chủ từ xa GitHub.

---

## ⚠️ Sai lầm phổ biến
1. **Bị từ chối [rejected - non-fast-forward] nhưng vội vàng push force**:  Sẽ ghi đè và làm biến mất vĩnh viễn các commit mà đồng nghiệp đã đẩy lên trước đó.
2. **Quên cờ -u trong lần push đầu tiên của nhánh mới**:  Khiến lần sau gõ git push ngắn gọn bị Git nhắc nhở chưa có upstream tracking.
3. **Push nhầm nhánh thử nghiệm chứa mật khẩu hoặc mã bí mật lên GitHub công khai.**: Push nhầm nhánh thử nghiệm chứa mật khẩu hoặc mã bí mật lên GitHub công khai.

---

## 🧪 Lab
1. Tạo một nhánh mới `demo-push` và tạo một commit mới trên nhánh này.
2. Chạy lệnh `git push -u origin demo-push` để đưa nhánh lên remote.
3. Quan sát thông điệp phản hồi từ máy chủ GitHub xác nhận nhánh đã được tạo.
4. Xóa nhánh trên remote để dọn dẹp bằng `git push origin --delete demo-push`.

---

## 💡 Hint
> Nếu bị lỗi rejected non-fast-forward, hãy chạy `git pull` trước để tích hợp code mới rồi mới push lại.

---

## ✅ Validation
- Đẩy thành công commit lên remote GitHub và thiết lập đúng upstream tracking.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về câu lệnh xuất bản git push.

---

## 🔥 Challenge
Tại sao trong các doanh nghiệp lớn, việc gõ cờ `--force` lên nhánh `main` luôn bị chặn bởi quyền hạn của hệ thống?

---

## 📚 Tổng kết
- `git push` đưa các commit từ kho cục bộ lên máy chủ từ xa GitHub.
- Dùng cờ `-u` ở lần push đầu tiên để thiết lập liên kết theo dõi upstream.
- Tuyệt đối không dùng cờ `--force` bừa bãi trên các nhánh dùng chung.
