# Khôi phục commit bị mất bằng reflog

---

## 🎯 Mục tiêu
- Thành thạo quy trình 4 bước cứu hộ commit bị mất: Kiểm tra reflog -> Xác định tọa độ -> Tạo nhánh cứu hộ -> Hợp nhất.
- Khôi phục thành công một commit vừa bị xóa do câu lệnh `git reset --hard`.
- Hồi sinh nguyên vẹn một nhánh tính năng vừa bị lỡ tay xóa cưỡng chế bằng `git branch -D`.
- Xây dựng tâm lý bình tĩnh, tự tin xử lý mọi sự cố mất mát mã nguồn trong dự án.

---

## 📖 Định nghĩa
> Khôi phục commit bằng reflog (Reflog Recovery) là kỹ thuật cứu hộ cấp cao trong Git, cho phép lập trình viên tái kết nối và hồi sinh các commit bị cô lập (Dangling / Orphan Commits) trở lại cây lịch sử làm việc chính thống. Trong kiến trúc hướng đối tượng của Git, các commit bị xóa hoặc bị tách rời không hề biến mất ngay lập tức mà vẫn tồn tại trong cơ sở dữ liệu ngầm cho đến khi bị thu dọn rác; reflog cung cấp tọa độ chính xác để bạn gắn lại nhãn nhánh vào các commit đó.

---

## 🤔 Tại sao cần?
Trong đời làm nghề kỹ sư phần mềm, không có cảm giác nào tồi tệ bằng việc nhìn thấy hàng tuần công sức lập trình biến mất vì một câu lệnh sai lầm. Kỹ năng cứu hộ bằng reflog chính là tấm khiên bảo vệ sự nghiệp của bạn. Một kỹ sư làm chủ reflog recovery không bao giờ biết sợ hãi trước những câu lệnh phức tạp, luôn giữ được sự điềm tĩnh phi thường khi xảy ra sự cố và trở thành người hùng cứu cánh cho cả đội ngũ trong những thời khắc khủng hoảng nhất.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một chiếc khinh khí cầu đang bay trên bầu trời, được neo giữ vào mặt đất bằng một sợi dây thừng (nhánh main). Khi bạn lỡ tay lấy kéo cắt đứt sợi dây thừng đó (reset hard hoặc xóa nhánh), khinh khí cầu không hề nổ tung biến mất, nó chỉ đang trôi lơ lửng tự do giữa tầng mây (Dangling Commit). `git reflog` chính là chiếc ống nhòm giúp bạn nhìn thấy tọa độ khinh khí cầu đang trôi, và bạn chỉ việc phóng một sợi dây neo mới (`git branch rescue-branch <hash>`) để kéo nó trở lại mặt đất an toàn.

---

## 🖼 Sơ đồ
```text
Quy trình hồi sinh commit mồ côi:
Trạng thái mồ côi:
C1 ──► C2 (main)
        └──► C3 (Trôi nổi cô lập vì bị reset hard lùi về C2!)

Hồi sinh bằng nhánh mới:
git branch rescue C3
C1 ──► C2 (main)
        └──► C3 (rescue - Đã được kết nối trở lại an toàn!)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Mai vừa vô tình chạy câu lệnh nguy hiểm `git branch -D feat-ai-chat` xóa mất nhánh tính năng AI chứa hơn 15 commit giá trị mà chưa kịp đẩy lên kho lưu trữ đám mây GitHub. Không hề bối rối hay hoảng loạn, Mai mở ngay terminal và gõ lệnh `git reflog` để truy tìm dấu vết của con trỏ. Mai nhanh chóng tìm thấy dòng sự kiện cuối cùng trước khi chuyển nhánh: `a9c8b7d HEAD@{3}: commit: feat: complete streaming response`. Mai lập tức gõ câu lệnh hồi sinh an toàn: `git branch feat-ai-chat a9c8b7d`. Ngay tức thì, nhánh `feat-ai-chat` được tái tạo nguyên vẹn với đầy đủ toàn bộ 15 commit và không hề mất một ký tự code nào trong sự thán phục của đồng nghiệp.

---

## 💻 Command
```bash
git reflog
git branch <tên-nhánh-cứu-hộ> <commit-hash>
git reset --hard HEAD@{n}
git checkout -b <nhánh-mới> HEAD@{n}
```

---

## 🔍 Giải thích command
- `git reflog`: Bước 1 tra cứu tọa độ hash của commit trước khi tai nạn xảy ra.
- `git branch <nhánh-mới> <hash>`: Cách an toàn nhất: tạo một nhánh mới cắm chốt ngay tại commit vừa tìm thấy.
- `git reset --hard HEAD@{n}`: Cách dịch chuyển trực tiếp con trỏ nhánh hiện tại quay về vị trí reflog chỉ định.
- `git checkout -b <nhánh> HEAD@{n}`: Tạo nhánh mới và chuyển ngay sang mốc commit cần cứu hộ.

---

## ⚠️ Sai lầm phổ biến
1. **Hoảng loạn chạy loạn xạ các lệnh reset khác khiến bảng reflog bị tràn và khó tìm lại tọa độ cũ.**: Hoảng loạn chạy loạn xạ các lệnh reset khác khiến bảng reflog bị tràn và khó tìm lại tọa độ cũ.
2. **Cố tình tắt máy tính hoặc xóa thư mục dự án khi vừa lỡ tay gõ lệnh sai.**: Cố tình tắt máy tính hoặc xóa thư mục dự án khi vừa lỡ tay gõ lệnh sai.
3. **Dùng reset hard để cứu hộ thay vì tạo nhánh mới**:  Tạo nhánh mới luôn luôn là phương án an toàn nhất vì không làm xáo trộn nhánh hiện tại.

---

## 🧪 Lab
1. Tạo commit bí mật có thông điệp `secret-data` trong tệp `secret.txt`.
2. Cố tình phá hủy bằng lệnh `git reset --hard HEAD~1`. Kiểm tra thấy commit đã biến mất khỏi `git log`.
3. Mở `git reflog` để tìm mã hash của commit chứa thông điệp `secret-data`.
4. Tạo nhánh cứu hộ bằng lệnh `git branch rescue <hash-tìm-thấy>`.
5. Chuyển sang nhánh `rescue` và xác nhận tệp `secret.txt` đã trở lại nguyên vẹn.

---

## 💡 Hint
> Phương pháp an toàn nhất để cứu commit mồ côi luôn là dùng `git branch <tên-nhánh-mới> <commit-hash>`.

---

## ✅ Validation
- Cứu hộ thành công commit bị mất sau khi bị reset hard hoặc xóa nhánh bằng reflog.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng cứu hộ dữ liệu với reflog.

---

## 🔥 Challenge
Nêu sự khác biệt giữa việc cứu một commit bị reset hard và việc cứu một nhánh vừa bị xóa bằng `git branch -D`.

---

## 📚 Tổng kết
- Commit bị mất trong Git thực chất chỉ bị ngắt kết nối con trỏ chứ chưa bị xóa vật lý.
- Sử dụng `git reflog` để định vị chính xác mã hash của commit trước thời điểm tai nạn.
- Hồi sinh dữ liệu an toàn tuyệt đối bằng câu lệnh `git branch <tên-nhánh> <commit-hash>`.
