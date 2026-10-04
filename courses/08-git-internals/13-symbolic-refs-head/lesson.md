# Con trỏ HEAD & Symbolic References trong .git/HEAD

---

## 🎯 Mục tiêu
- Nắm vững bản chất của con trỏ HEAD như chiếc la bàn chỉ định vị trí làm việc hiện tại của bạn trong Git.
- Hiểu rõ khái niệm Tham chiếu biểu tượng (Symbolic Reference): HEAD trỏ tới một nhánh chứ không trỏ thẳng vào commit.
- Giải thích Detached HEAD: HEAD trỏ trực tiếp tới object ID của commit thay vì tên branch.
- Biết cách dùng lệnh `git symbolic-ref` để thao tác và kiểm tra trạng thái của con trỏ HEAD.

---

## 🧩 Từ khóa hôm nay

### Symbolic reference
- **Nói dễ hiểu**: Ref gián tiếp chứa tên một ref khác thay vì trực tiếp chứa object ID.
- **Ví dụ**: HEAD thường chỉ tới `refs/heads/main` khi bạn đang làm việc trên nhánh `main`.
- **Đừng nhầm**: Git cập nhật ref nhánh đang được HEAD trỏ tới; vị trí vật lý của các ref không nhất thiết là những tệp riêng trong `.git/refs/`.

### Detached HEAD State
- **Nói dễ hiểu**: Trạng thái con trỏ HEAD bị tháo rời khỏi nhánh và trỏ trực tiếp vào một mã băm commit cụ thể.
- **Ví dụ**: Khi checkout một commit, `git rev-parse HEAD` in object ID; HEAD không còn trỏ tới branch.
- **Đừng nhầm**: Không phải là lỗi phần mềm hay hỏng repo; đây là tính năng hữu ích cho phép bạn xem lại hoặc thử nghiệm code tại bất kỳ commit nào trong quá khứ.

### git symbolic-ref Command
- **Nói dễ hiểu**: Lệnh plumbing chuyên dụng dùng để đọc hoặc thiết lập đường dẫn cho các tham chiếu biểu tượng.
- **Ví dụ**: Chạy `git symbolic-ref HEAD` sẽ in ra đường dẫn `refs/heads/main`.
- **Đừng nhầm**: Nếu bạn đang ở trạng thái Detached HEAD, lệnh này sẽ trả về lỗi exit code khác 0 vì HEAD không trỏ vào ref nào.

---

## 📖 Định nghĩa
HEAD xác định commit hiện được checkout. Thông thường, HEAD là symbolic ref tới branch, chẳng hạn `refs/heads/main`; commit mới sẽ cập nhật branch đó. Ở trạng thái detached, HEAD trỏ trực tiếp tới commit object. Trong linked worktree, Git directory của HEAD có thể khác đường dẫn `.git` bạn nhìn thấy ở gốc worktree; dùng lệnh Git để tra cứu.

---

## 🤔 Tại sao cần?
Detached HEAD là trạng thái hợp lệ để xem hoặc thử nghiệm một commit cũ. Nếu tạo commit mới khi detached rồi checkout sang nơi khác, commit đó có thể không còn được giữ bởi branch; hãy tạo branch cứu hộ nếu muốn giữ nó. Object ID có độ dài phụ thuộc hash format.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng con trỏ HEAD như chiếc biển tên "BẠN ĐANG Ở ĐÂY" (You are here) trên bản đồ trung tâm thương mại. Bình thường, chiếc biển tên này được móc vào một chiếc xe buýt đang di chuyển (nhánh main): xe buýt chạy đến đâu (commit mới), biển tên tự động đi theo đến đó. Nhưng khi bạn nhảy xuống xe buýt và đứng một mình giữa ngã tư đường (Detached HEAD), bạn vẫn đứng vững tại tọa độ đó, chỉ có điều chiếc xe buýt đã chạy đi mất và không ai tự động chở bạn đi tiếp.

---

## 🖼 Sơ đồ
```text
Hai trạng thái của con trỏ HEAD (tên hiển thị là logic, đường dẫn vật lý có thể khác):
1. Trạng thái bình thường (Symbolic Reference):
   HEAD ──► refs/heads/main ──► [Commit C3]
   (Khi commit, ref main tiến lên C4; HEAD vẫn trỏ tới ref main)

2. Trạng thái Detached HEAD:
   HEAD ──► <commit-object-id> (Trỏ trực tiếp tới commit C2)
   (Không gắn vào branch; tạo branch cứu hộ nếu cần giữ commit mới)
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư muốn kiểm tra phiên bản cũ chạy `git switch --detach <commit>` rồi `git symbolic-ref -q HEAD` (lệnh không in branch ở trạng thái detached) và `git rev-parse HEAD` để xem object ID hiện tại. Chuyển lại bằng `git switch main` nếu `main` là branch cần dùng. Nếu đã tạo commit mới ở detached state và cần giữ nó, trước khi chuyển đi hãy chạy `git branch rescue-detached-work`.

---

## 💻 Command
```bash
# Xem Git directory đang dùng cho HEAD (hữu ích với linked worktree)
git rev-parse --git-path HEAD

# Đọc symbolic reference an toàn qua lệnh plumbing
git symbolic-ref -q HEAD

# In object ID của commit hiện tại, kể cả khi HEAD detached
git rev-parse HEAD

# Chủ động chuyển sang trạng thái Detached HEAD để kiểm tra commit hiện tại
git switch --detach HEAD

# Đưa HEAD trở lại gắn kết với nhánh chính
git switch main
```

---

## 🔍 Giải thích command
- `git rev-parse --git-path HEAD`: Hỏi Git đường dẫn thực tế của HEAD cho worktree hiện tại.
- `git symbolic-ref -q HEAD`: In tên symbolic ref nếu HEAD đang gắn với branch; ở trạng thái detached lệnh trả mã lỗi.
- `git rev-parse HEAD`: In object ID của commit hiện tại dù HEAD đang gắn branch hay detached.
- `git switch --detach HEAD`: Chuyển sang detached HEAD tại commit hiện tại mà không di chuyển ref nhánh.
- `git switch main`: Gắn lại HEAD vào nhánh local `main` nếu nhánh đó tồn tại.

---

## ⚠️ Sai lầm phổ biến
1. **Tạo commit quan trọng khi đang Detached HEAD rồi chuyển nhánh**: Commit có thể không còn được branch nào giữ; tạo branch cứu hộ trước khi chuyển đi.
2. **Sửa tệp `.git/HEAD` thành đường dẫn nhánh không tồn tại**: Khiến cho Git không thể khởi động bất kỳ thao tác nào vì mất dấu con trỏ hiện tại.
3. **Coi Detached HEAD là lỗi hỏng Git**: Đây là trạng thái hợp lệ để xem commit; nếu tạo commit muốn giữ lại, hãy tạo branch trước khi rời commit đó.

---

## 🧪 Lab
Hãy mở terminal và cùng tôi thực hành từng bước dưới đây để làm chủ kỹ năng:

1. Ghi lại branch hiện tại bằng `git branch --show-current`.
2. Chạy `git switch --detach HEAD` để vào detached state.
3. Xác nhận `git symbolic-ref -q HEAD` không in branch, còn `git rev-parse HEAD` vẫn in object ID.
4. Chạy `git switch <tên-branch-đã-ghi>` để quay lại. Không tạo commit thử nếu chưa tạo branch cứu hộ.

---

## 💡 Hint
> `git symbolic-ref -q HEAD` trả exit code khác 0 nếu HEAD detached. Kết hợp với `git rev-parse HEAD` để xem commit hiện tại.

---

## ✅ Validation
- `git symbolic-ref -q HEAD` in tên branch khi đang gắn branch và không in tên khi detached.
- `git rev-parse HEAD` in object ID ở cả hai trạng thái; độ dài ID tùy hash format.

---

## ❓ Quiz
Cùng kiểm tra sự thấu hiểu của bạn về con trỏ HEAD và Symbolic References trong phần trắc nghiệm bên dưới.

---

## 🔥 Challenge
Làm thế nào để tạo một con trỏ nhánh mới cứu hộ các commit vừa tạo trong trạng thái Detached HEAD trước khi bạn chuyển về nhánh main? (Gợi ý: `git branch <ten-nhanh-cuu-ho>`).

---

## 📚 Tổng kết
- HEAD là con trỏ chỉ định vị trí không gian làm việc hiện tại của bạn trong Git.
- Trạng thái bình thường: HEAD là Symbolic Ref trỏ tới một nhánh (`ref: refs/heads/main`).
- Trạng thái Detached HEAD: HEAD trỏ trực tiếp tới object ID của một commit.
- Nếu muốn giữ commit tạo ra khi detached, hãy neo nó bằng branch trước khi chuyển đi.
