# Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)

---

## 🎯 Mục tiêu
- Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).
- Hiểu rõ khái niệm Reachability (Khả năng tiếp cận): đối tượng nào có thể chạm tới từ các References và đối tượng nào bị mồ côi (Dangling/Unreachable).
- Sử dụng lệnh plumbing `git rev-list` và `git fsck` để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối.
- Hiểu lý do tại sao các con trỏ trong Git luôn trỏ ngược từ tương lai về quá khứ.

---

## 🧩 Từ khóa hôm nay

### Directed Acyclic Graph (DAG)
- **Nói dễ hiểu**: Mô hình cấu trúc dữ liệu đồ thị có hướng và không bao giờ tạo thành một vòng lặp tròn lặp lại chính nó.
- **Ví dụ**: Mỗi commit mới tạo ra sẽ trỏ về commit cha cũ, bạn có thể đi lùi mãi về commit đầu tiên nhưng không bao giờ quay lại tương lai.
- **Đừng nhầm**: Không phải cây đơn nhánh; Git hỗ trợ rẽ nhánh song song và hợp nhất nhiều nhánh lại với nhau (Merge).

### Dangling Object / Unreachable Commit
- **Nói dễ hiểu**: Đối tượng commit hoặc blob vẫn còn nằm trong `.git/objects/` nhưng không còn bất kỳ nhánh hay thẻ nào trỏ tới để tiếp cận.
- **Ví dụ**: Khi bạn lỡ tay chạy `git reset --hard HEAD~1`, commit vừa bị bỏ rơi biến thành dangling commit.
- **Đừng nhầm**: Chưa bị xóa khỏi ổ đĩa ngay; nó vẫn nằm đó trong 30 đến 90 ngày cho đến khi bộ dọn rác `git gc` dọn dẹp.

### git fsck Command
- **Nói dễ hiểu**: Lệnh plumbing kiểm tra tính toàn vẹn của hệ thống tệp tin và quét tìm tất cả các đối tượng mồ côi bị đứt kết nối.
- **Ví dụ**: Chạy `git fsck --lost-found` để tìm lại mã SHA-1 của commit tưởng như đã mất sau khi reset nhầm.
- **Đừng nhầm**: Không làm hỏng mã nguồn; đây là lệnh chỉ đọc an toàn dùng để kiểm tra sức khỏe và cứu hộ dữ liệu.

---

## 📖 Định nghĩa
Trong khoa học máy tính, lịch sử và cơ sở dữ liệu đối tượng của Git được mô hình hóa chính xác dưới dạng một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG). Trong đồ thị này, các Đỉnh (Vertices/Nodes) là các đối tượng Commit, Tree, Blob, và các Cạnh có hướng (Directed Edges) là các con trỏ phụ thuộc trỏ ngược chiều thời gian (Commit trỏ về Commit cha, Commit trỏ về Root Tree, Tree trỏ về Blob). Tính chất "Không chu trình" (Acyclic) bảo đảm rằng không bao giờ có một commit nào có thể là tổ tiên của chính mình.

---

## 💡 Tại sao cần
Hiểu rõ cấu trúc Đồ thị có hướng không chu trình (DAG) là chìa khóa then chốt để giải mã khái niệm "Khả năng tiếp cận" (Reachability) trong Git. Một đối tượng chỉ thực sự tồn tại có ý nghĩa nếu có ít nhất một con trỏ tham chiếu (nhánh làm việc, thẻ tag, hoặc HEAD) có thể duyệt tới nó theo các cạnh của đồ thị. Khi bạn xóa một nhánh hay reset commit, Git không hề xóa tệp tin ngay lập tức; đối tượng đó chỉ tạm thời trở thành Đối tượng mồ côi (Dangling Object) nằm lơ lửng trong đồ thị cho đến khi tiến trình dọn rác thu hồi.

---

## 🧠 Mental Model
Hãy tưởng tượng một cây cổ thụ sum suê xanh tốt trong một khu rừng kỳ bí. Các cành lớn và cành nhỏ đâm chồi từ thân cây vững chắc chính là các References và Commits (chúng được kết nối kiên cố). Nếu một người cầm cưa cắt đứt một cành cây nhỏ (hành động xóa nhánh), chiếc cành cây bị rơi xuống thảm cỏ bên dưới gốc cây. Chiếc cành đó vẫn còn nguyên lá tươi xanh (Dangling Object) trong vài tuần tiếp theo, bất kỳ ai đi ngang qua nhặt lên vẫn có thể cắm nó trở lại thân cây trước khi người gác rừng tiến hành dọn dẹp quét lá rụng đi đốt.

---

## 📊 Sơ đồ minh họa
```text
Mô hình Đồ thị DAG và Đối tượng mồ côi (Dangling):
[Branch: main] ──► (Commit C3) ──► (Commit C2) ──► (Commit C1)  <── CÁC NODE REACHABLE
                         │
                         ▼
                    [Tree: T3] ──► [Blob: B1]

(Commit D2) ──► (Commit D1)  <── BỊ CẮT ĐỨT (DANGLING / UNREACHABLE OBJECTS)
     ▲
     │ (Không có nhánh hay thẻ nào trỏ tới, nhưng tệp vẫn nằm trong .git/objects)
```

---

## 🏢 Ví dụ thực tế
Một kỹ sư phần mềm thực hiện lệnh `git reset --hard HEAD~3` và hoảng hốt nhận ra mình vừa làm mất một tính năng chưa kịp đẩy lên remote. Kỹ sư bình tĩnh mở terminal và chạy lệnh plumbing kiểm tra tính toàn vẹn của đồ thị: `git fsck --lost-found`. Git lập tức quét toàn bộ đồ thị DAG và thông báo: `dangling commit 8a7b6c5d4e3f`. Kỹ sư sử dụng lệnh `git cat-file -p 8a7b6c` để kiểm tra nội dung và xác nhận đúng là commit tính năng bị mất. Bằng cách gõ `git merge 8a7b6c` hoặc `git branch rescue-feature 8a7b6c`, toàn bộ nhánh mồ côi được nối lại vào thân cây chính của đồ thị DAG một cách ngoạn mục.

---

## 💻 Command & Cú pháp
```bash
# Đếm số lượng commit có thể tiếp cận trong toàn bộ đồ thị
git rev-list --all --count

# Quét và tìm tất cả các đối tượng bị mất liên kết (dangling)
git fsck --unreachable

# Vẽ trực quan sơ đồ các nhánh của đồ thị DAG
git log --graph --oneline --all

# Duyệt danh sách các commit từ mới đến cũ theo thứ tự đồ thị
git rev-list HEAD
```

---

## 🔍 Giải thích command
- `git rev-list --all --count`: Duyệt qua toàn bộ các con trỏ ref và đếm số lượng node commit tiếp cận được.
- `git fsck --unreachable`: Rà soát toàn bộ tệp trong `.git/objects/` và in ra các mã băm không có đường đi từ bất kỳ ref nào.
- `git log --graph --oneline --all`: Vẽ sơ đồ ASCII trực quan biểu diễn các cạnh hợp nhất và phân nhánh của đồ thị.
- `git rev-list HEAD`: In ra danh sách toàn bộ các commit SHA-1 từ commit hiện tại ngược về root commit.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng mũi tên trong Git trỏ từ quá khứ đến tương lai**: Con trỏ `parent` trong đối tượng commit luôn trỏ NGƯỢC từ commit con về commit cha (ngược chiều thời gian).
2. **Lo sợ dữ liệu bị xóa mất ngay khi reset hard**: Các đối tượng commit vẫn nằm nguyên vẹn trong thư mục `.git/objects/` dưới dạng dangling objects và hoàn toàn có thể cứu hộ.
3. **Không biết dùng `git fsck` khi gặp sự cố**: Vội vàng clone lại repo hoặc viết lại code từ đầu thay vì chỉ cần 1 lệnh để tìm lại commit bị mất.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.

1. **Bước 1**: Xem đồ thị toàn diện của repository bằng lệnh `git log --graph --oneline --all`.
2. **Bước 2**: Tạo một commit thử nghiệm, sau đó chạy `git reset --hard HEAD~1` để tách rời commit đó khỏi nhánh chính.
3. **Bước 3**: Chạy lệnh `git fsck --unreachable` và tìm dòng `unreachable commit <mã_sha>`.
4. **Bước 4**: Chạy `git branch rescue <mã_sha>` để nối lại commit mồ côi vào một nhánh mới và kiểm tra lại bằng `git log`.

---

## 💡 Hint & mẹo
> Mọi commit vừa bị mất do reset hard hay xóa nhầm nhánh đều có thể tìm lại được tức thì thông qua `git fsck` hoặc `git reflog` trước khi tiến trình `git gc` được kích hoạt.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git fsck` phát hiện chính xác mã băm của commit vừa bị reset.
- Nhánh `rescue` được tạo ra khôi phục hoàn chỉnh 100% mã nguồn và lịch sử của commit tưởng như đã mất.

---

## ❓ Quiz nhanh
Hãy kiểm tra khả năng tư duy đồ thị DAG của bạn qua bài trắc nghiệm trong phần bên dưới.

---

## 🚀 Thử thách nâng cao
Tại sao việc thiết kế con trỏ trỏ ngược về quá khứ (Commit trỏ về Parent) lại an toàn hơn rất nhiều so với việc con trỏ trỏ xuôi về tương lai trong hệ thống phân tán?

---

## 📝 Tổng kết
- Lịch sử Git là một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).
- Các con trỏ parent luôn trỏ ngược chiều từ commit mới về commit tổ tiên.
- Đối tượng không có con trỏ tham chiếu nào chạm tới được gọi là Unreachable/Dangling Object và có thể cứu hộ bằng `git fsck`.
- Khái niệm Reachability giải thích cơ chế an toàn dữ liệu và quy trình thu gom rác tự động của Git.
