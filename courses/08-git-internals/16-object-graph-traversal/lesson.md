# Duyệt đồ thị đối tượng có hướng (Directed Acyclic Graph)

---

## 🎯 Mục tiêu
- Nắm vững bản chất toán học của Git như một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).
- Hiểu reachability: object nào Git có thể lần tới từ các tham chiếu, index và reflog.
- Sử dụng lệnh plumbing `git rev-list` và `git fsck` để duyệt toàn bộ đồ thị và phát hiện đối tượng mất kết nối.
- Hiểu lý do tại sao các con trỏ trong Git luôn trỏ ngược từ tương lai về quá khứ.

---

## 🧩 Từ khóa hôm nay

### Directed Acyclic Graph (DAG)
- **Nói dễ hiểu**: Mô hình cấu trúc dữ liệu đồ thị có hướng và không bao giờ tạo thành một vòng lặp tròn lặp lại chính nó.
- **Ví dụ**: Mỗi commit mới tạo ra sẽ trỏ về commit cha cũ, bạn có thể đi lùi mãi về commit đầu tiên nhưng không bao giờ quay lại tương lai.
- **Đừng nhầm**: Không phải cây đơn nhánh; Git hỗ trợ rẽ nhánh song song và hợp nhất nhiều nhánh lại với nhau (Merge).

### Unreachable object
- **Nói dễ hiểu**: Object tồn tại trong object database nhưng Git không lần tới được từ các điểm bắt đầu đang xét.
- **Ví dụ**: Commit bị bỏ khỏi đầu nhánh có thể vẫn còn trong reflog; dùng `git fsck --no-reflogs --unreachable` để tìm object không còn được reflog giữ lại.
- **Đừng nhầm**: `dangling` là một trường hợp cụ thể của unreachable object. Thời gian object được giữ lại phụ thuộc cấu hình và thao tác bảo trì.

### git fsck
- **Nói dễ hiểu**: Lệnh kiểm tra tính toàn vẹn và kết nối giữa các object trong repository.
- **Ví dụ**: `git fsck --no-reflogs --unreachable` bỏ qua reflog khi tính reachability để tìm object chỉ còn được reflog giữ.
- **Đừng nhầm**: `--lost-found` ghi dữ liệu tham khảo vào `.git/lost-found`, nên không phải chế độ chỉ đọc thuần túy. Hãy tạo nhánh cứu hộ sau khi kiểm tra đúng commit.

---

## 📖 Định nghĩa
Lịch sử commit của Git là đồ thị có hướng không chu trình (DAG). Một commit trỏ tới tree của nó và các commit cha; tree trỏ tới các entry con như tree hoặc blob. Khi tạo commit thông thường, các cạnh parent đi từ commit mới về commit đã có. Điều này cho phép Git biểu diễn nhánh rẽ và merge mà không tạo vòng lặp.

---

## 🤔 Tại sao cần?
Reachability giải thích vì sao một commit không xuất hiện trong `git log --all` vẫn có thể còn trong repository. Git xác định điểm bắt đầu từ refs và index, và mặc định cũng xét reflog khi chạy `git fsck`. Vì vậy một commit vừa bị reset có thể chưa được báo unreachable. Object unreachable vẫn có thể được giữ lại một thời gian, nhưng không nên xem đó là bản sao lưu: garbage collection và cấu hình repository có thể làm object hết hạn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng một cây cổ thụ sum suê xanh tốt trong một khu rừng kỳ bí. Các cành lớn và cành nhỏ đâm chồi từ thân cây vững chắc chính là các References và Commits (chúng được kết nối kiên cố). Nếu một người cầm cưa cắt đứt một cành cây nhỏ (hành động xóa nhánh), chiếc cành cây bị rơi xuống thảm cỏ bên dưới gốc cây. Chiếc cành đó vẫn còn nguyên lá tươi xanh (Dangling Object) trong vài tuần tiếp theo, bất kỳ ai đi ngang qua nhặt lên vẫn có thể cắm nó trở lại thân cây trước khi người gác rừng tiến hành dọn dẹp quét lá rụng đi đốt.

---

## 🖼 Sơ đồ
```text
Mô hình Đồ thị DAG và Đối tượng mồ côi (Dangling):
[Branch: main] ──► (Commit C3) ──► (Commit C2) ──► (Commit C1)  <── REACHABLE
                         │
                         ▼
                    [Tree: T3] ──► [Blob: B1]

(Commit D2) ──► (Commit D1)  <── UNREACHABLE NẾU KHÔNG CÒN ĐIỂM BẮT ĐẦU NÀO TRỎ TỚI
     (Có thể còn trong object database; thời gian giữ lại không được bảo đảm)
```

---

## 🌎 Ví dụ thực tế
Trong repository thử nghiệm, người học di chuyển đầu nhánh khỏi một commit rồi dùng `git fsck --no-reflogs --unreachable` để xem object không còn được reflog giữ lại. Họ kiểm tra một commit bằng `git show <object-id>` và chỉ khi xác nhận đúng mới neo nó bằng `git branch rescue-feature <object-id>`. Trong repository thật, bắt đầu bằng `git reflog` và tạo nhánh cứu hộ trước khi chạy lệnh dọn dẹp; việc khôi phục không được bảo đảm nếu object đã bị xóa.

---

## 💻 Command
```bash
# Đếm số lượng commit có thể tiếp cận trong toàn bộ đồ thị
git rev-list --all --count

# Tìm object không thể tiếp cận, kể cả commit còn trong reflog
git fsck --no-reflogs --unreachable

# Vẽ trực quan sơ đồ các nhánh của đồ thị DAG
git log --graph --oneline --all

# Duyệt danh sách các commit từ mới đến cũ theo thứ tự đồ thị
git rev-list HEAD
```

---

## 🔍 Giải thích command
- `git rev-list --all --count`: Duyệt qua toàn bộ các con trỏ ref và đếm số lượng node commit tiếp cận được.
- `git fsck --no-reflogs --unreachable`: Tính reachability mà không dùng reflog làm điểm bắt đầu, rồi liệt kê object tồn tại nhưng không reachable.
- `git log --graph --oneline --all`: Vẽ sơ đồ ASCII trực quan biểu diễn các cạnh hợp nhất và phân nhánh của đồ thị.
- `git rev-list HEAD`: In các object ID commit từ commit hiện tại ngược về các tổ tiên của nó.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng mũi tên trong Git trỏ từ quá khứ đến tương lai**: Con trỏ `parent` trong đối tượng commit luôn trỏ NGƯỢC từ commit con về commit cha (ngược chiều thời gian).
2. **Cho rằng reset luôn xóa commit ngay, hoặc luôn giữ commit đủ lâu**: Reset thường di chuyển ref; object có thể còn lại, nhưng thời hạn và khả năng cứu không được bảo đảm.
3. **Chạy lệnh phá hủy để thử trên repo thật**: Tạo repository tạm riêng trước khi thực hành `reset --hard` hoặc tìm object unreachable.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

Chỉ làm các bước reset trong repository thử nghiệm mới, không làm trong repository dự án của bạn. Lệnh dưới đây dùng Bash/Git Bash:

```bash
mkdir git-fsck-lab
cd git-fsck-lab
git init
git config user.name "Git Learner"
git config user.email "learner@example.com"
printf "first version\n" > note.txt
git add note.txt
git commit -m "first test commit"
printf "second version\n" >> note.txt
git add note.txt
git commit -m "second test commit"

# Chỉ làm trong repository thử nghiệm vừa tạo
git reset --hard HEAD~1
git fsck --no-reflogs --unreachable
git show <object-id-of-unreachable-commit>
git branch rescue <object-id-of-unreachable-commit>
git log rescue -1
```

1. **Bước 1**: Tạo hai commit thử nghiệm bằng các lệnh trên.
2. **Bước 2**: Sau lệnh reset, lấy ID của dòng `unreachable commit` do `git fsck` in ra.
3. **Bước 3**: Thay `<object-id-of-unreachable-commit>` bằng ID đó để xem nội dung và tạo nhánh cứu hộ.
4. **Bước 4**: Xác nhận commit đã được neo bằng `git log rescue -1`.

---

## 💡 Hint
> Nếu lỡ di chuyển nhánh, hãy xem `git reflog` và neo commit đúng bằng một nhánh cứu hộ càng sớm càng tốt. Reflog và object chưa được bảo đảm tồn tại mãi.

---

## ✅ Validation
- Trong repo thử nghiệm, `git fsck --no-reflogs --unreachable` liệt kê commit vừa bỏ khỏi nhánh.
- `git show` xác nhận nội dung; `git branch rescue <object-id>` làm commit reachable qua nhánh cứu hộ.

---

## ❓ Quiz
Hãy kiểm tra khả năng tư duy đồ thị DAG của bạn qua bài trắc nghiệm trong phần bên dưới.

---

## 🔥 Challenge
Tại sao việc thiết kế con trỏ trỏ ngược về quá khứ (Commit trỏ về Parent) lại an toàn hơn rất nhiều so với việc con trỏ trỏ xuôi về tương lai trong hệ thống phân tán?

---

## 📚 Tổng kết
- Lịch sử Git là một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).
- Các con trỏ parent luôn trỏ ngược chiều từ commit mới về commit tổ tiên.
- Unreachable object còn trong object database nhưng không reachable từ các điểm bắt đầu; dangling là một trường hợp cụ thể.
- `git fsck` giúp kiểm tra và tìm object, nhưng không thay thế backup và không bảo đảm phục hồi sau khi object đã bị thu hồi.
