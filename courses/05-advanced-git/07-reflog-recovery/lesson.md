# Khôi phục commit bị mất bằng reflog

---

## 🎯 Mục tiêu
- Thành thạo quy trình 4 bước cứu hộ commit bị mất: Kiểm tra reflog -> Xác định tọa độ -> Tạo nhánh cứu hộ -> Hợp nhất.
- Khôi phục thành công một commit vừa bị xóa do câu lệnh `git reset --hard`.
- Hồi sinh nguyên vẹn một nhánh tính năng vừa bị lỡ tay xóa cưỡng chế bằng `git branch -D`.
- Xây dựng tâm lý bình tĩnh, tự tin xử lý mọi sự cố mất mát mã nguồn trong dự án.

---

## 🧩 Từ khóa hôm nay

### reflog recovery
- **Nói dễ hiểu**: Kỹ thuật tìm lại mã hash từ nhật ký reflog để gắn nhánh mới và cứu lại các commit bị mất.
- **Ví dụ**: Tra reflog thấy commit `a9c8b7d` và chạy `git branch rescue a9c8b7d` để hồi sinh code.
- **Đừng nhầm**: Không tạo ra commit mới; kỹ thuật này chỉ nối lại con trỏ nhánh vào commit cũ đang trôi nổi.

### dangling commit
- **Nói dễ hiểu**: Commit mồ côi trôi nổi tự do trong cơ sở dữ liệu ngầm mà không có con trỏ nhánh nào trỏ tới.
- **Ví dụ**: Sau khi chạy `git reset --hard HEAD~1`, commit đỉnh cũ trở thành dangling commit.
- **Đừng nhầm**: Không hề bị xóa ngay lập tức; Git bảo tồn các commit này trong kho ngầm ít nhất 30 ngày.

### rescue branch
- **Nói dễ hiểu**: Nhánh mới được tạo ra cắm chốt ngay tại vị trí commit mồ côi để đưa nó trở lại cây lịch sử.
- **Ví dụ**: `git branch rescue-feature <commit-hash>` giúp bạn xem lại và merge code an toàn.
- **Đừng nhầm**: Là phương án an toàn nhất; không làm thay đổi hay ghi đè lên nhánh bạn đang đứng.

---

## 📖 Định nghĩa
Khôi phục commit bằng reflog (Reflog Recovery) là kỹ thuật cứu hộ cấp cao trong Git, cho phép tái kết nối và hồi sinh các commit bị cô lập (Dangling Commits) trở lại cây lịch sử làm việc. Trong Git, commit bị xóa khỏi nhánh không biến mất ngay mà vẫn nằm trong cơ sở dữ liệu ngầm; reflog cung cấp mã hash chính xác để gắn lại nhánh mới.

---

## 💡 Tại sao cần
Không gì tồi tệ hơn việc nhìn thấy công sức lập trình biến mất vì một lệnh gõ sai. Kỹ năng cứu hộ bằng reflog là tấm khiên bảo vệ bạn trong mọi tình huống. Nắm vững reflog recovery giúp bạn luôn giữ sự điềm tĩnh phi thường khi xảy ra sự cố và tự tin xử lý những ca mất code phức tạp nhất.

---

## 🧠 Mental Model
Hãy hình dung khinh khí cầu đang bay trên trời được neo vào đất bằng một sợi dây thừng (nhánh main). Khi bạn lỡ tay cắt đứt sợi dây (reset hard hoặc xóa nhánh), khinh khí cầu không hề nổ tung mà chỉ trôi lơ lửng giữa tầng mây (Dangling Commit). `git reflog` là ống nhòm định vị tọa độ, và bạn phóng một sợi dây neo mới (`git branch rescue <hash>`) để kéo nó về đất an toàn.

---

## 📊 Sơ đồ minh họa
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

## 🏢 Ví dụ thực tế
Kỹ sư Mai lỡ tay gõ `git branch -D feat-ai-chat` xóa mất nhánh chứa 15 commit chưa push lên GitHub. Không hoảng loạn, Mai mở terminal gõ `git reflog` và thấy dòng sự kiện trước đó: `a9c8b7d HEAD@{3}: commit: feat: complete streaming`. Mai lập tức gõ lệnh hồi sinh `git branch feat-ai-chat a9c8b7d`. Toàn bộ 15 commit sống lại nguyên vẹn không thiếu một dòng code nào trong sự thán phục của đồng đội.

---

## 💻 Command & Cú pháp
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
1. **Hoảng loạn gõ thêm nhiều lệnh reset lung tung**: Làm bảng reflog bị tràn các sự kiện mới và đẩy vị trí commit cần cứu đi xa.
2. **Tắt máy tính hoặc xóa thư mục dự án khi vừa lỡ gõ sai**: Khiến các tiến trình Git bị ngắt quãng không cần thiết; dữ liệu vẫn nằm an toàn trong thư mục `.git`.
3. **Cố tình dùng reset hard để cứu hộ thay vì tạo nhánh mới**: Tạo nhánh mới luôn an toàn nhất vì không làm xáo trộn nhánh hiện tại.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thực hành cứu hộ commit mồ côi trên terminal.
1. Tạo commit thử nghiệm có nội dung `secret-data` trong tệp `secret.txt`.
2. Chạy `git reset --hard HEAD~1` và kiểm tra thấy commit biến mất khỏi `git log`.
3. Mở `git reflog` để tìm mã hash của commit vừa bị tách rời.
4. Tạo nhánh cứu hộ bằng lệnh `git branch rescue <hash-tìm-thấy>`.
5. Chuyển sang nhánh `rescue` và xác nhận tệp `secret.txt` đã trở lại nguyên vẹn.

---

## 💡 Hint & mẹo
> Phương pháp an toàn nhất để cứu commit mồ côi luôn là dùng `git branch <tên-nhánh-mới> <commit-hash>`.

---

## ✅ Validation & Kết quả mong đợi
- Nhánh cứu hộ mới được tạo trỏ đúng vào commit bị mất trước đó.
- Lịch sử `git log` trên nhánh mới hiển thị đầy đủ các commit tưởng chừng đã bị xóa sổ.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về kỹ năng cứu hộ dữ liệu với reflog.

---

## 🚀 Thử thách nâng cao
Khám phá lệnh `git fsck --lost-found` để quét toàn bộ cơ sở dữ liệu và tìm ra tất cả các blob và commit mồ côi (dangling objects) trong kho lưu trữ.

---

## 📝 Tổng kết
- Commit bị mất trong Git thực chất chỉ bị ngắt kết nối con trỏ chứ chưa bị xóa vật lý.
- Sử dụng `git reflog` để định vị chính xác mã hash của commit trước thời điểm tai nạn.
- Hồi sinh dữ liệu an toàn tuyệt đối bằng câu lệnh `git branch <tên-nhánh> <commit-hash>`.
