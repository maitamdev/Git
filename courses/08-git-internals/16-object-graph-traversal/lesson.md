# Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)

---

## 🎯 Mục tiêu bài học
- Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).
- Hiểu rõ khái niệm Reachability (Khả năng tiếp cận): đối tượng nào có thể chạm tới từ các References và đối tượng nào bị mồ côi (Dangling/Unreachable).
- Sử dụng lệnh plumbing git rev-list và git fsck để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối.

---

## 📖 Định nghĩa
> Trong khoa học máy tính, lịch sử và cơ sở dữ liệu đối tượng của Git được mô hình hóa chính xác dưới dạng một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG). Trong đồ thị này, các Đỉnh (Vertices/Nodes) là các đối tượng Commit, Tree, Blob, và các Cạnh có hướng (Directed Edges) là các con trỏ phụ thuộc trỏ ngược chiều thời gian (Commit trỏ về Commit cha, Commit trỏ về Root Tree, Tree trỏ về Blob). Tính chất "Không chu trình" (Acyclic) bảo đảm rằng không bao giờ có một commit nào có thể là tổ tiên của chính mình.

---

## 🤔 Tại sao cần?
Hiểu rõ cấu trúc Đồ thị có hướng không chu trình (DAG) là chìa khóa then chốt để giải mã khái niệm "Khả năng tiếp cận" (Reachability) trong Git. Một đối tượng chỉ thực sự tồn tại có ý nghĩa nếu có ít nhất một con trỏ tham chiếu (nhánh làm việc, thẻ tag, hoặc HEAD) có thể duyệt tới nó theo các cạnh của đồ thị. Khi bạn xóa một nhánh hay reset commit, Git không hề xóa tệp tin ngay lập tức; đối tượng đó chỉ tạm thời trở thành Đối tượng mồ côi (Dangling Object) nằm lơ lửng trong đồ thị cho đến khi tiến trình dọn rác thu hồi.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng một cây cổ thụ sum suê xanh tốt trong một khu rừng kỳ bí. Các cành lớn và cành nhỏ đâm chồi từ thân cây vững chắc chính là các References và Commits (chúng được kết nối kiên cố). Nếu một người cầm cưa cắt đứt một cành cây nhỏ (hành động xóa nhánh), chiếc cành cây bị rơi xuống thảm cỏ bên dưới gốc cây. Chiếc cành đó vẫn còn nguyên lá tươi xanh (Dangling Object) trong vài tuần tiếp theo, bất kỳ ai đi ngang qua nhặt lên vẫn có thể cắm nó trở lại thân cây trước khi người gác rừng tiến hành dọn dẹp quét lá rụng đi đốt.

---

## 🖼️ Sơ đồ minh họa
```text
Mô hình Đồ thị DAG và Đối tượng mồ côi (Dangling):
[Branch: main] ──► (Commit C3) ──► (Commit C2) ──► (Commit C1)  <── CÁC NODE REACHABLE
                         │
                         ▼
                    [Tree: T3] ──► [Blob: B1]

(Commit D2) ──► (Commit D1)  <── BỊ CẮT ĐỨT (DANGLING / UNREACHABLE OBJECTS)
     ▲
     │ (Không có nhánh hay thẻ nào trỏ tới, nhưng tệp vẫn nằm trong .git/objects!)
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư phần mềm thực hiện lệnh `git reset --hard HEAD~3` và hoảng hốt nhận ra mình vừa làm mất một tính năng chưa kịp đẩy lên remote. Kỹ sư bình tĩnh mở terminal và chạy lệnh plumbing kiểm tra tính toàn vẹn của đồ thị: `git fsck --lost-found`. Git lập tức quét toàn bộ đồ thị DAG và thông báo: `dangling commit 8a7b6c5d4e3f`. Kỹ sư sử dụng lệnh `git cat-file -p 8a7b6c` để kiểm tra nội dung và xác nhận đúng là commit tính năng bị mất. Bằng cách gõ `git merge 8a7b6c`, toàn bộ nhánh mồ côi được nối lại vào thân cây chính của đồ thị DAG một cách ngoạn mục.

---

## 💻 Command & Lệnh thao tác
```bash
git rev-list --all --count
git fsck --unreachable
git log --graph --oneline --all
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git rev-list đếm chính xác tổng số commit có thể tiếp cận trong toàn bộ đồ thị, git fsck --unreachable rà soát và phát hiện tất cả các đối tượng bị đứt kết nối mồ côi, và git log --graph trực quan hóa sinh động các cạnh liên kết của đồ thị DAG.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nghĩ rằng các mũi tên trong đồ thị commit trỏ từ quá khứ đến tương lai**:  Trong Git, các con trỏ parent luôn trỏ NGƯỢC từ tương lai về quá khứ.
2. **Sợ rằng các lệnh phân nhánh sẽ tạo ra đồ thị vô hạn**:  Thuật toán đồ thị của Git được tối ưu hóa cực đỉnh bằng kỹ thuật băm SHA-1.
3. **Không biết cách sử dụng `git fsck` để tìm lại những commit bị mất sau khi thực hiện reset hard hoặc rebase lỗi.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Xem đồ thị toàn diện của repository bằng lệnh `git log --graph --oneline --all`.
2. Tạo một commit thử nghiệm, sau đó chạy `git reset --hard HEAD~1` để biến commit đó thành mồ côi.
3. Chạy lệnh `git fsck --unreachable` để truy vết ra mã băm của commit vừa bị cắt đứt.

---

## 💡 Gợi ý thực hiện (Hint)
> Mọi commit vừa bị mất do reset hard đều có thể tìm lại được thông qua `git fsck` hoặc `git reflog`.

---

## ✅ Kiểm tra kết quả (Validation)
Định vị và khôi phục thành công một commit mồ côi (dangling commit) trở lại nhánh làm việc.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra khả năng tư duy đồ thị DAG của bạn qua bài trắc nghiệm sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao việc thiết kế con trỏ trỏ ngược về quá khứ (Commit trỏ về Parent) lại an toàn hơn rất nhiều so với việc con trỏ trỏ xuôi về tương lai trong hệ thống phân tán?

---

## 📚 Tổng kết kiến thức
- Lịch sử Git là một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).
- Các con trỏ parent luôn trỏ ngược chiều từ commit mới về commit tổ tiên.
- Đối tượng không có con trỏ tham chiếu nào chạm tới được gọi là Unreachable/Dangling Object và có thể cứu hộ bằng `git fsck`.
