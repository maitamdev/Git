# Khôi phục commit bị mất bằng reflog

---

## 🎯 Mục tiêu
- Thực hành tìm commit bằng reflog rồi tạo nhánh mới để giữ một tham chiếu tới commit đó.
- Tạo nhánh cứu hộ trỏ tới commit đã tìm thấy sau một lần `git reset --hard`.
- Hiểu cách áp dụng cùng quy trình khi xóa nhánh, nếu tìm được commit và object còn tồn tại.
- Nhận biết reflog không khôi phục được file chưa commit và entry có thể hết hạn.

---

## 🧩 Từ khóa hôm nay

### reflog recovery
- **Nói dễ hiểu**: Kỹ thuật tìm lại mã hash từ nhật ký reflog để gắn nhánh mới và cứu lại các commit bị mất.
- **Ví dụ**: Tra reflog thấy commit `a9c8b7d` và chạy `git branch rescue a9c8b7d` để hồi sinh code.
- **Đừng nhầm**: Không tạo ra commit mới; kỹ thuật này chỉ nối lại con trỏ nhánh vào commit cũ đang trôi nổi.

### dangling commit
- **Nói dễ hiểu**: Commit không còn nằm trên lịch sử các nhánh hiện tại; hash của nó có thể vẫn còn trong reflog một thời gian.
- **Ví dụ**: Sau khi chạy `git reset --hard HEAD~1`, commit đỉnh cũ trở thành dangling commit.
- **Đừng nhầm**: Không được bảo đảm còn mãi. Reflog hết hạn và garbage collection có thể dọn object không còn được tham chiếu.

### rescue branch
- **Nói dễ hiểu**: Nhánh mới được tạo ra cắm chốt ngay tại vị trí commit mồ côi để đưa nó trở lại cây lịch sử.
- **Ví dụ**: `git branch rescue-feature <commit-hash>` giúp bạn xem lại và merge code an toàn.
- **Đừng nhầm**: Là phương án an toàn nhất; không làm thay đổi hay ghi đè lên nhánh bạn đang đứng.

---

## 📖 Định nghĩa
Khôi phục commit bằng reflog là cách tìm một commit từng được tham chiếu rồi tạo ref mới, chẳng hạn nhánh, trỏ đến commit đó. Cách này hữu ích sau reset hoặc xóa nhánh khi reflog và object commit còn tồn tại; không khôi phục thay đổi chưa commit.

---

## 💡 Tại sao cần
Reflog hữu ích khi cần tìm lại commit sau thao tác nhầm. Trước tiên dừng các lệnh ghi, kiểm tra trạng thái repo, tìm hash phù hợp, rồi tạo nhánh cứu hộ để giữ commit đó.

---

## 🧠 Mental Model
Hãy hình dung nhánh là nhãn chỉ tới commit. Khi nhãn bị di chuyển hoặc xóa, reflog có thể còn ghi hash trước đó. Tạo nhánh cứu hộ (`git branch rescue <hash>`) sẽ thêm một nhãn mới trỏ tới commit đó.

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
Kỹ sư Mai xóa nhánh `feat-ai-chat` chưa push. Mai kiểm tra `git reflog`, tìm hash của commit cuối nhánh và xác minh đó đúng là commit cần giữ. Nếu hash và object còn tồn tại, Mai tạo lại nhánh bằng `git branch feat-ai-chat <hash>`. Reflog không khôi phục được thay đổi chưa commit.

---

## 💻 Command & Cú pháp
```bash
git reflog
git branch <tên-nhánh-cứu-hộ> <commit-hash>
```

Trong Git thật có thể reset tới một entry reflog hoặc tạo nhánh trực tiếp từ entry đó. Các lệnh này có thể ghi đè file chưa commit; bài thực hành dùng cách ít rủi ro hơn là tạo nhánh theo hash đã kiểm tra.

---

## 🔍 Giải thích command
- `git reflog`: Bước 1 tra cứu tọa độ hash của commit trước khi tai nạn xảy ra.
- `git branch <nhánh-mới> <hash>`: Cách an toàn nhất: tạo một nhánh mới cắm chốt ngay tại commit vừa tìm thấy.

---

## ⚠️ Sai lầm phổ biến
1. **Chạy thêm reset trước khi kiểm tra**: Có thể làm khó việc đọc lịch sử gần nhất; dừng và xem `git reflog` trước khi thay đổi ref thêm.
2. **Cho rằng mọi commit sẽ luôn còn trong kho**: Reflog có thể hết hạn và object unreachable có thể bị dọn dẹp; sao lưu hoặc hỏi quản trị viên nếu dữ liệu quan trọng.
3. **Cố tình dùng reset hard để cứu hộ thay vì tạo nhánh mới**: Tạo nhánh mới luôn an toàn nhất vì không làm xáo trộn nhánh hiện tại.

---

## 🧪 Lab thực hành
Bài này thao tác reset trên kho thử nghiệm riêng; không dùng file chứa mật khẩu hoặc dữ liệu thật.
1. Tạo commit nền có `README.md`, sau đó tạo commit `demo-note` thêm `demo-note.txt`.
2. Ghi lại mã commit `demo-note` bằng `git log --oneline -2`.
3. Chạy `git reset --hard HEAD~1`. File demo biến khỏi Working Tree và commit không còn trên nhánh hiện tại.
4. Chạy `git reflog`, tìm mã commit `demo-note`, rồi chạy `git branch rescue <hash>`.
5. Chạy `git switch rescue` và xác nhận `demo-note.txt` xuất hiện. Nếu chưa thấy commit trong reflog, dừng; đừng đoán hash.

---

## 💡 Hint & mẹo
> Khi đã xác minh hash, tạo nhánh cứu hộ thường ít rủi ro hơn việc di chuyển nhánh hiện tại bằng `reset --hard`.

---

## ✅ Validation & Kết quả mong đợi
- Nhánh `rescue` trỏ đúng commit `demo-note` và file đã commit xuất hiện trên nhánh đó.
- Không suy ra từ kết quả này rằng reflog có thể cứu file chưa commit hoặc mọi commit vô thời hạn.

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
- Tạo nhánh trỏ tới commit tìm được bằng `git branch <tên-nhánh> <commit-hash>`; xác minh hash trước khi chạy.
