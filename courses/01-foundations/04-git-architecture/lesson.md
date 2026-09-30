# Git hoạt động như thế nào?

---

## 🎯 Mục tiêu
- Phân biệt rõ ràng sự khác biệt giữa mô hình lưu trữ Delta (sự khác biệt) và Snapshot (ảnh chụp tức thời).
- Hiểu khái niệm Directed Acyclic Graph (DAG) và cách Git liên kết các commit bằng mã băm SHA.
- Nắm bắt sơ bộ cấu trúc các đối tượng cốt lõi trong Git: Blob, Tree, Commit.

---

## 📖 Định nghĩa
> Về mặt kiến trúc, Git không lưu trữ dữ liệu dưới dạng danh sách các thay đổi dòng code (Delta-based) như các hệ thống VCS truyền thống, mà lưu trữ dữ liệu dưới dạng một chuỗi các ảnh chụp tức thời hoàn chỉnh (Snapshots) của toàn bộ hệ thống tệp tin theo thời gian. Nếu một tệp không có sự thay đổi giữa các phiên bản, Git sẽ thông minh không nhân bản dữ liệu mà chỉ tạo một con trỏ liên kết trỏ lại tệp cũ đã lưu. Lịch sử của Git được tổ chức dưới dạng một đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).

---

## 🤔 Tại sao cần?
Nắm bắt được kiến trúc Snapshot và mô hình đồ thị DAG giúp bạn hiểu được gốc rễ mọi hành vi của Git. Khi bạn hiểu rằng nhánh (branch) thực chất chỉ là một con trỏ nhẹ có thể di chuyển trỏ đến một đỉnh trong đồ thị DAG, bạn sẽ không còn cảm thấy hoang mang khi chuyển nhánh, gộp nhánh hay giải quyết xung đột mã nguồn. Điều này biến việc học Git từ học vẹt thành tư duy trực quan sắc bén.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy tưởng tượng kiến trúc của Git giống như một cuốn sổ chụp ảnh gia đình qua nhiều thế hệ. Thay vì ghi chép lại rằng "năm nay bố mọc thêm một sợi râu bạc, con cao thêm hai xăng-ti-mét", người thợ ảnh chụp lại toàn bộ cả gia đình đứng trong phòng khách. Tuy nhiên, nếu chiếc bàn trà hay bộ ghế sofa không hề thay đổi sau mười năm, người thợ ảnh chỉ cần dán một mảnh giấy ghi chú mượn lại hình ảnh chiếc bàn từ album cũ, giúp cuốn sổ vừa trực quan vừa nhẹ nhàng.

---

## 🖼 Sơ đồ
```text
Hệ thống cũ (Delta):                Git (Snapshots):
File A: [V1] ──> [Δ1] ──> [Δ2]      Snapshot 1: [File A v1] [File B v1]
File B: [V1] ───────────> [Δ1]      Snapshot 2: [File A v2] [File B (trỏ v1)]
(Phải tính toán lại từ đầu)         Snapshot 3: [File A v3] [File B v2]
```

---

## 🌎 Ví dụ thực tế
Khi bạn chỉnh sửa một dòng comment trong tệp `index.html` của dự án chứa hơn 500 hình ảnh và 100 tệp CSS, Git sẽ không lưu lại 500 hình ảnh đó một lần nữa. Git tạo ra một snapshot mới, trong đó tệp `index.html` được ghi nhận nội dung mới, còn 600 tệp tin còn lại chỉ được lưu dưới dạng tham chiếu trỏ về đối tượng cũ trong thư mục `.git/objects`. Nhờ vậy, kích thước kho lưu trữ của bạn cực kỳ nhỏ gọn dù trải qua hàng ngàn lần commit, đồng thời tốc độ tạo commit hay chuyển đổi giữa các nhánh diễn ra gần như tức thì mà không phải tính toán cộng dồn sự khác biệt phức tạp.

---

## 💻 Command
```bash
git status
git log --oneline
```

---

## 🔍 Giải thích command
- `git status`: Hiển thị trạng thái hiện tại của Working Tree và Staging Area so với snapshot gần nhất, giúp bạn nhìn thấy rõ các tệp tin mới tạo hoặc bị sửa đổi trước khi ghi lại phiên bản.
- `git log --oneline`: Hiển thị danh sách các commit trong lịch sử rút gọn trên một dòng với mã băm ngắn và thông điệp, tương ứng trực quan với các nút trên đồ thị DAG.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng Git lưu từng dòng code khác biệt**:  Git thực chất lưu trọn vẹn snapshot nội dung tệp tin và trỏ tái sử dụng tệp không đổi.
2. **Sợ rằng dự án lớn sẽ làm Git bị phình to dung lượng**:  Nhờ cơ chế lưu trữ snapshot thông minh và nén packfile, Git quản lý dung lượng vô cùng tối ưu.
3. **Nghĩ commit là một bản vá độc lập**:  Commit trong Git luôn chứa liên kết tham chiếu đến commit cha của nó trong đồ thị DAG.

---

## 🧪 Lab
1. Thực hiện kiểm tra trạng thái ban đầu của kho lưu trữ bằng lệnh `git status`.
2. Quan sát cách Git theo dõi sự khác biệt giữa thư mục làm việc và snapshot gần nhất.
3. Sử dụng `git log --oneline` để hình dung các đỉnh của đồ thị lịch sử.

---

## 💡 Hint
> Mỗi commit đại diện cho một ảnh chụp Snapshot toàn diện của dự án tại một thời điểm.

---

## ✅ Validation
- Phân biệt chính xác giữa mô hình Delta và Snapshot trong Git.

---

## ❓ Quiz
Hoàn thành các câu hỏi dưới đây để kiểm tra kiến thức về kiến trúc Snapshot của Git.

---

## 🔥 Challenge
Vẽ sơ đồ biểu diễn 3 commit liên tiếp trong Git và giải thích cách các commit cha-con liên kết với nhau.

---

## 📚 Tổng kết
- Git lưu trữ lịch sử dưới dạng chuỗi các ảnh chụp tức thời (Snapshots) thay vì sự khác biệt tệp (Deltas).
- Nếu một tệp không thay đổi, Git chỉ trỏ lại blob dữ liệu cũ mà không hề sao chép lãng phí dung lượng.
- Lịch sử commit trong Git tạo thành một đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG).
