# Vì sao team cần workflow?

---

## 🎯 Mục tiêu
- Hiểu rõ sự khác biệt bản chất giữa lập trình cá nhân và phát triển phần mềm theo đội ngũ chuyên nghiệp.
- Nhận diện các rủi ro thảm họa khi đội ngũ không có quy trình phân nhánh và tích hợp mã nguồn rõ ràng.
- Nắm bắt các lợi ích cốt lõi của một Git Workflow chuẩn: giảm xung đột, bảo đảm chất lượng, tự động hóa phát hành.
- Sẵn sàng tiếp cận các mô hình workflow chuẩn mực trong ngành công nghiệp phần mềm hiện đại.

---

## 🧩 Từ khóa hôm nay

### Git Workflow
- **Nói dễ hiểu**: Bộ quy tắc và quy ước thống nhất trong nhóm về cách tạo nhánh, đặt tên commit, review code và phát hành sản phẩm.
- **Ví dụ**: Quy định mọi tính năng mới phải làm trên nhánh riêng dạng `feat/<tên-tính-năng>` và mở Pull Request để review.
- **Đừng nhầm**: Workflow không phải là một lệnh Git cụ thể; đó là thỏa thuận làm việc giữa các thành viên trong dự án.

### Branching Strategy (Chiến lược phân nhánh)
- **Nói dễ hiểu**: Cách thức tổ chức và phân chia vòng đời của các nhánh (main, feature, release, hotfix) trong kho lưu trữ.
- **Ví dụ**: Chọn GitHub Flow với nhánh main và các nhánh feature ngắn hạn cho dự án phát hành liên tục.
- **Đừng nhầm**: Không có một chiến lược nào phù hợp cho mọi dự án; cần chọn chiến lược tùy thuộc vào quy mô và chu kỳ phát hành.

### Production-ready Branch
- **Nói dễ hiểu**: Nhánh chính (thường là main) luôn được bảo vệ ở trạng thái hoạt động hoàn hảo, sẵn sàng triển khai cho người dùng bất kỳ lúc nào.
- **Ví dụ**: Chỉ hợp nhất code vào nhánh main sau khi đã vượt qua toàn bộ bài kiểm tra tự động và có phê duyệt từ ít nhất một đồng nghiệp.
- **Đừng nhầm**: Tuyệt đối không commit hoặc push code thử nghiệm chưa hoàn thiện trực tiếp lên nhánh production-ready.

---

## 📖 Định nghĩa
Team Workflow là tập hợp các quy tắc và thỏa thuận có cấu trúc rõ ràng về cách các thành viên trong đội ngũ tương tác với kho lưu trữ Git: cách phân nhánh, viết commit, kiểm duyệt mã nguồn và phát hành sản phẩm an toàn.

---

## 💡 Tại sao cần
Khi làm việc cá nhân, bạn có thể commit tùy ý. Nhưng khi nhiều kỹ sư cùng làm việc trên một codebase, thiếu quy trình sẽ dẫn đến ghi đè code, phát sinh xung đột liên tục và đưa nhầm lỗi lên môi trường thực tế của khách hàng.

---

## 🧠 Mental Model
Hãy hình dung hệ thống giao thông thành phố. Khi chỉ có một xe chạy đêm, bạn rẽ tùy ý. Nhưng giờ cao điểm với hàng ngàn xe, bắt buộc phải có đèn tín hiệu, làn đường và luật nhường đường. Git Workflow chính là luật giao thông giúp dòng chảy mã nguồn lưu thông an toàn mà không va chạm.

---

## 📊 Sơ đồ minh họa
```text
Sự khác biệt giữa phát triển tự do và có Git Workflow chuẩn mực:
TỰ DO (CHAOS):
Dev A ──push direct──► [main branch] ◄──push direct── Dev B (Ghi đè, xung đột, vỡ app)
                                ▲
Dev C ──────push code lỗi──────┘

CÓ WORKFLOW (ORDER):
Dev A ──► [feat/login] ──► PR Review ──┐
Dev B ──► [feat/cart]  ──► PR Review ──┼──► [Automated CI Test] ──► [main (Protected)]
Dev C ──► [fix/typo]   ──► PR Review ──┘
```

---

## 🏢 Ví dụ thực tế
Tại một công ty công nghệ, ba kỹ sư cùng push trực tiếp vào nhánh main khiến ứng dụng tê liệt trước giờ khuyến mãi. Sau sự cố nhớ đời, nhóm thiết lập quy trình chuẩn: cấm push trực tiếp vào main, mọi tính năng đều tách nhánh riêng và bắt buộc qua bước review cẩn thận.

---

## 💻 Command & Cú pháp
```bash
git status
git branch -a
git log --oneline --graph
```

---

## 🔍 Giải thích command
- `git status`: Kiểm tra tình trạng nhánh làm việc và các tệp tin trước khi bắt đầu quy trình.
- `git branch -a`: Liệt kê toàn bộ các nhánh cục bộ và nhánh trên máy chủ từ xa để nắm bắt bức tranh tổng quan.
- `git log --oneline --graph`: Hiển thị sơ đồ trực quan các nhánh và commit giúp theo dõi tiến độ tích hợp.

---

## ⚠️ Sai lầm phổ biến
1. **Push trực tiếp vào main**: Để các thành viên commit tự do vào nhánh chính sẽ gây xung đột mã nguồn và rò rỉ lỗi lên production.
2. **Quy trình quá cứng nhắc**: Thiết lập quy trình quá rườm rà không phù hợp với quy mô thực tế sẽ làm chậm tiến độ bàn giao sản phẩm.
3. **Thiếu tài liệu hướng dẫn**: Không phổ biến và ghi chép rõ ràng khiến các thành viên mới làm sai lệch quy chuẩn chung của nhóm.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Thảo luận và liệt kê 3 rủi ro lớn nhất nếu một nhóm 10 lập trình viên cùng push thẳng vào main.
2. Sử dụng lệnh `git branch -a` và `git log --graph` để quan sát cấu trúc nhánh trong một kho lưu trữ thực tế.
3. Kiểm tra các nhánh đang hoạt động và đối chiếu xem nhánh chính có được bảo vệ hay không.

---

## 💡 Hint & mẹo
> Một workflow tốt là workflow cân bằng hoàn hảo giữa tính an toàn bảo vệ mã nguồn và tốc độ phát triển linh hoạt của toàn đội ngũ.

---

## ✅ Validation & Kết quả mong đợi
- Hiểu rõ tại sao các tổ chức công nghệ chuyên nghiệp luôn cấm commit trực tiếp lên main.
- Nắm vững vai trò cốt lõi của chiến lược phân nhánh và văn hóa kiểm duyệt mã nguồn qua Pull Request.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về tầm quan trọng của Git Workflow.

---

## 🚀 Thử thách nâng cao
Phân tích các tổn thất về chi phí tài chính và uy tín khi một đoạn mã lỗi bị đưa nhầm lên production do thiếu quy trình review.

---

## 📝 Tổng kết
- Team Workflow là nền tảng sống còn bảo đảm sự phối hợp nhịp nhàng giữa nhiều kỹ sư trên một codebase.
- Quy trình chuẩn giúp loại bỏ rủi ro ghi đè code, phát hiện lỗi sớm qua kiểm duyệt và bảo vệ nhánh chính.
- Mở đường cho các mô hình phân nhánh chuẩn mực tiếp theo: Feature Branch, GitHub Flow, Git Flow.
