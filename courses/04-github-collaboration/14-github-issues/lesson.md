# Quản lý công việc và lỗi với GitHub Issues

---

## 🎯 Mục tiêu
- Thấu suốt vai trò trung tâm của GitHub Issues trong việc theo dõi lỗi (Bug Tracking) và lập kế hoạch phát triển (Feature Planning).
- Nắm vững cấu trúc một bản báo cáo lỗi chuẩn mực (Bug Report) với các bước tái hiện lỗi chi tiết.
- Sử dụng thành thạo hệ thống nhãn (Labels), mốc thời gian (Milestones) và người phụ trách (Assignees) để phân luồng công việc.
- Vận dụng các từ khóa đóng tự động (Closing Keywords) như `Fixes #12`, `Closes #45` trong mô tả Pull Request.

---

## 🧩 Từ khóa hôm nay

### github issues — theo dõi công việc và lỗi
- **Nói dễ hiểu:** Tấm thẻ quản lý công việc trên GitHub đại diện cho một lỗi cần sửa, một tính năng cần làm hoặc một câu hỏi kỹ thuật.
- **Ví dụ:** Tạo Issue `#15: Nút đặt hàng không phản hồi trên trình duyệt Safari mobile`.
- **Đừng nhầm:** Issues không chỉ dùng khi có sự cố hỏng hóc; nó còn dùng để lập kế hoạch phát triển tính năng và kiến trúc hệ thống.

### labels and assignees — nhãn và người phụ trách
- **Nói dễ hiểu:** Công cụ phân loại bằng màu sắc (Labels) và người chịu trách nhiệm chính (Assignees) được giao giải quyết công việc.
- **Ví dụ:** Gắn nhãn màu đỏ `bug`, màu cam `p1-urgent` và gán tên kỹ sư Tuấn vào mục Assignees.
- **Đừng nhầm:** Nhãn không tự động sửa lỗi; đây là công cụ hỗ trợ lọc, tìm kiếm và phân cấp mức độ ưu tiên công việc khoa học.

### closing keywords — từ khóa đóng issue tự động
- **Nói dễ hiểu:** Các từ khóa đặc biệt như `Fixes #15` giúp GitHub tự động chuyển Issue sang trạng thái hoàn thành khi PR được gộp.
- **Ví dụ:** Trong phần mô tả PR bạn ghi `Resolves #42`, khi PR merge vào main thì Issue #42 sẽ tự động đóng ngay lập tức.
- **Đừng nhầm:** Từ khóa đóng chỉ phát huy tác dụng tự động khi Pull Request được merge thẳng vào nhánh mặc định của dự án.

---

## 📖 Định nghĩa
GitHub Issues là hệ thống quản trị đầu việc và theo dõi lỗi tích hợp sẵn bên trong kho lưu trữ GitHub, cung cấp không gian tập trung để đội ngũ ghi nhận các lỗi phần mềm (bugs), thảo luận các đề xuất tính năng mới (features) và phân công trách nhiệm rõ ràng cho từng thành viên trong suốt vòng đời dự án.

---

## 🤔 Tại sao cần?
Một dự án phần mềm không thể thành công nếu chỉ có mã nguồn mà thiếu đi quy trình quản lý yêu cầu bài bản. Nếu không có hệ thống theo dõi lỗi chuyên nghiệp, phản hồi của người dùng sẽ bị thất lạc trong các nhóm chat, lỗi bảo mật nghiêm trọng bị bỏ quên và nhóm sẽ rơi vào tình trạng mất phương hướng, không nắm được ai đang chịu trách nhiệm cho hạng mục nào.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung GitHub Issues như một chiếc bảng thông minh Kanban đặt ở vị trí trung tâm của phòng làm việc đội ngũ. Mỗi tấm thẻ ghi chú (Issue) được dán màu sắc phân loại riêng (Labels), chỉ định rõ người thực hiện (Assignees), thời hạn hoàn thành (Milestones) và mô tả chi tiết vấn đề để toàn bộ các thành viên đều có thể theo dõi tiến độ một cách minh bạch.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ LIÊN KẾT TỰ ĐỘNG GIỮA PULL REQUEST VÀ GITHUB ISSUES:

[Issue #42: Bug tính sai tiền giỏ hàng] ◄───────────────────────┐
                                                                │ (Khi PR được merge)
[Pull Request: "feat: Fixes #42 - recalculate total price"] ────┴──► [Tự động ĐÓNG Issue #42!]
```

---

## 🌎 Ví dụ thực tế
Khi người dùng báo lỗi cổng thanh toán bị treo, lập trình viên tạo ngay Issue `#104: Bug cổng thanh toán trả về mã lỗi 504 khi tải cao`, đính kèm ảnh chụp màn hình và gắn nhãn `bug`, `high-priority`. Kỹ sư phụ trách nhận Issue, tạo nhánh sửa lỗi và mở PR có ghi dòng `Fixes #104`. Ngay khi PR được duyệt và merge vào main, GitHub tự động chuyển Issue #104 sang trạng thái Closed.

---

## 💻 Command
```bash
gh issue list
gh issue create --title "Bug: navbar broken on mobile" --label "bug"
gh issue view 42
gh issue close 42
```

---

## 🔍 Giải thích command
- `gh issue list`: Hiển thị danh sách các issue đang mở của dự án trực tiếp ngay trong cửa sổ terminal.
- `gh issue create`: Tạo nhanh một issue mới kèm tiêu đề và gắn nhãn mà không cần mở trình duyệt web.
- `gh issue view 42`: Đọc toàn bộ nội dung mô tả và các bình luận phản hồi của issue số 42.
- `gh issue close 42`: Đóng issue số 42 trực tiếp từ giao diện dòng lệnh khi công việc đã hoàn tất.

---

## ⚠️ Sai lầm phổ biến
1. **Viết tiêu đề và mô tả lỗi chung chung**: Viết mỗi câu "Hệ thống bị lỗi" mà không cung cấp các bước tái hiện, khiến đồng nghiệp không thể sửa.
2. **Quên dùng từ khóa đóng Issue trong PR**: PR đã merge xong nhưng Issue vẫn nằm mở, gây sai lệch báo cáo tiến độ dự án.
3. **Biến Issue thành nơi tranh cãi tán gẫu**: Làm loãng không gian trao đổi kỹ thuật và khiến thông tin nghiệp vụ bị phân tán.

---

## 🧪 Lab
1. Truy cập tab "Issues" trên kho lưu trữ GitHub của bạn và nhấp nút "New issue".
2. Điền tiêu đề rõ ràng, mô tả chi tiết các bước tái hiện lỗi và kết quả kỳ vọng.
3. Gán nhãn phù hợp (ví dụ `bug` hoặc `documentation`) và gán người phụ trách.
4. Ghi lại số thứ tự của Issue (ví dụ `#1`).
5. Tạo một PR sửa đổi có chứa từ khóa `Closes #1` trong phần mô tả để kiểm chứng tính năng tự động đóng.

---

## 💡 Hint
> Một báo cáo lỗi xuất sắc luôn tuân thủ công thức 3 phần: 1. Bước tái hiện lỗi (Steps to reproduce), 2. Kết quả thực tế xảy ra (Actual behavior), 3. Kết quả mong đợi (Expected behavior). Làm chuẩn điều này sẽ tiết kiệm 80% thời gian cho cả đội ngũ!

---

## ✅ Validation
- Tạo được một Issue đạt chuẩn với đầy đủ mô tả, nhãn và người chịu trách nhiệm.
- Nắm vững danh sách các từ khóa đóng tự động được GitHub hỗ trợ: `Fixes`, `Closes`, `Resolves`.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về kỹ năng quản lý công việc và báo cáo lỗi với GitHub Issues.

---

## 🔥 Challenge
Tìm hiểu cách kết hợp GitHub Issues với GitHub Projects (bảng Kanban tự động). Làm thế nào để khi một Issue mới được tạo, nó tự động rơi vào cột "Todo", và khi có PR liên kết thì tự động nhảy sang cột "In Progress"?

---

## 📚 Tổng kết
- GitHub Issues là trung tâm điều phối công việc và quản lý lỗi của dự án.
- Tận dụng Labels, Milestones và Assignees để tổ chức quy trình làm việc khoa học.
- Sử dụng Closing Keywords (`Fixes #ID`) để liên kết và đóng Issue tự động khi merge PR.
