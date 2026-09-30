# Phân biệt Porcelain Commands vs Plumbing Commands

---

## 🎯 Mục tiêu bài học
- Phân biệt rõ ràng giữa hai tầng câu lệnh trong Git: Porcelain (gốm sứ cao cấp) và Plumbing (ống nước ngầm).
- Hiểu cách các lệnh Porcelain thân thiện (git add, git commit) phối hợp nhiều lệnh Plumbing bên dưới.
- Làm quen với các lệnh Plumbing cơ bản: git hash-object, git cat-file, git update-index, git write-tree, git commit-tree.

---

## 📖 Định nghĩa
> Trong thuật ngữ của Git, Porcelain (nghĩa đen là đồ sứ tráng men cao cấp) là nhóm các lệnh giao diện bậc cao, thân thiện và công thái học dành cho người dùng hàng ngày như git commit, git checkout, git pull. Ngược lại, Plumbing (nghĩa đen là hệ thống đường ống nước ngầm) là nhóm các lệnh bậc thấp được thiết kế để thực hiện các thao tác nguyên tử trực tiếp với cơ sở dữ liệu đối tượng của Git (như git hash-object, git cat-file, git write-tree).

---

## 🤔 Tại sao cần?
Các lệnh Porcelain được thiết kế để thuận tiện cho con người, nhưng chúng ẩn giấu toàn bộ các bước xử lý nội bộ tinh vi. Khi bạn cần xây dựng các công cụ tự động hóa tùy biến, viết script tích hợp sâu, hoặc thực hiện các ca cứu hộ mã nguồn phức tạp mà lệnh bề mặt từ chối thực hiện, các lệnh Plumbing cung cấp cho bạn quyền kiểm soát phẫu thuật chính xác tới từng byte dữ liệu.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng hệ thống cấp thoát nước trong một căn biệt thự sang trọng. Các thiết bị vệ sinh bằng sứ trắng muốt cao cấp như bồn rửa tay, vòi hoa sen tự động và bồn tắm massage chính là Porcelain: người sử dụng chỉ cần nhấn nút nhẹ nhàng để xả nước. Nhưng bên dưới sàn nhà là mạng lưới chằng chịt các đường ống dẫn nước bằng đồng, van áp suất và bơm thủy lực (Plumbing): chỉ có những người thợ sửa ống nước lành nghề mới can thiệp vào đây khi cần khắc phục rò rỉ.

---

## 🖼️ Sơ đồ minh họa
```text
Hai tầng câu lệnh trong Git:
┌────────────────────────────────────────────────────────┐
│ PORCELAIN (Giao diện bậc cao - Thân thiện người dùng)  │
│ git add | git commit | git branch | git merge | git log │
└───────────────────────────┬────────────────────────────┘
                            │ Phối hợp bên dưới
                            ▼
┌────────────────────────────────────────────────────────┐
│ PLUMBING (Giao diện bậc thấp - Thao tác trực tiếp đĩa) │
│ git hash-object | git cat-file | git update-index      │
│ git write-tree  | git commit-tree | git rev-parse      │
└───────────────────────────┬────────────────────────────┘
                            │ Ghi trực tiếp
                            ▼
             [.git/objects/ và .git/refs/]
```

---

## 🌎 Ví dụ thực tế
Khi một lập trình viên gõ lệnh Porcelain quen thuộc: `git commit -m "feat: login"`, Git không thực hiện một hành động đơn nhất. Dưới nắp ca-pô, Git âm thầm kích hoạt một chuỗi các lệnh Plumbing: trước hết gọi `git write-tree` để quét toàn bộ Staging Area và đóng gói thành một đối tượng Tree; sau đó gọi `git commit-tree <tree-hash> -p <parent-hash> -m "feat: login"` để tạo ra đối tượng Commit; và cuối cùng gọi `git update-ref refs/heads/main <commit-hash>` để di chuyển con trỏ nhánh chính tới commit mới. Hiểu được chuỗi phối hợp này giúp kỹ sư có thể tự tay tạo ra commit mà không cần dùng đến git add hay git commit.

---

## 💻 Command & Lệnh thao tác
```bash
git commit -m "msg"
git write-tree
git commit-tree
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh git commit là đại diện tiêu biểu của tầng Porcelain, trong khi git write-tree và git commit-tree là các lệnh Plumbing nguyên tử thao tác trực tiếp với dữ liệu nhị phân của Git.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Cố gắng sử dụng các lệnh Plumbing cho công việc lập trình thường nhật**:  Các lệnh này rất khó gõ và không có cơ chế bảo vệ an toàn như Porcelain.
2. **Nghĩ rằng các lệnh Plumbing là công cụ bên ngoài không thuộc về Git**:  Chúng được cài đặt sẵn bên trong mã nguồn chính thức của Git từ ngày đầu tiên.
3. **Quên truyền mã băm của commit cha (-p) khi gọi lệnh plumbing git commit-tree khiến lịch sử bị đứt gãy.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Chạy lệnh `git --help -a` và cuộn trang xuống phần "Low-level Commands (Plumbing)".
2. Quan sát danh sách phong phú các lệnh thao tác đối tượng, chỉ mục và tham chiếu.
3. Đối chiếu các lệnh Porcelain thường dùng hàng ngày với các lệnh Plumbing tương ứng bên dưới.

---

## 💡 Gợi ý thực hiện (Hint)
> Bất kỳ thao tác nào bạn thực hiện bằng lệnh Porcelain đều có thể được tái hiện chính xác bằng cách xâu chuỗi các lệnh Plumbing.

---

## ✅ Kiểm tra kết quả (Validation)
Phân loại chính xác một lệnh Git bất kỳ thuộc nhóm Porcelain hay Plumbing.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng làm bài kiểm tra về sự khác biệt giữa hai tầng câu lệnh Porcelain và Plumbing.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao Linus Torvalds lại thiết kế tầng Plumbing trước khi xây dựng tầng Porcelain trong những ngày đầu phát triển Git năm 2005?

---

## 📚 Tổng kết kiến thức
- Porcelain là tầng lệnh bậc cao phục vụ trải nghiệm người dùng (`git add`, `git commit`, `git checkout`).
- Plumbing là tầng lệnh bậc thấp thao tác nguyên tử với dữ liệu (`git hash-object`, `git write-tree`, `git cat-file`).
- Mọi lệnh Porcelain thực chất là kịch bản phối hợp nhiều lệnh Plumbing bên dưới.
