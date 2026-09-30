# Trunk-Based Development

---

## 🎯 Mục tiêu
- Nắm vững triết lý và thực tiễn của mô hình Trunk-Based Development được các gã khổng lồ công nghệ áp dụng.
- Hiểu rõ khái niệm nhánh cực ngắn hạn (Short-lived branches) với tuổi thọ dưới 1 hoặc 2 ngày.
- Làm chủ kỹ thuật Cờ tính năng (Feature Flags) để tách biệt giữa việc đưa mã nguồn lên main (Deploy) và kích hoạt tính năng (Release).
- Nhận biết các điều kiện tiên quyết để vận hành Trunk-Based Development thành công: kiểm thử tự động toàn diện và văn hóa review thần tốc.

---

## 📖 Định nghĩa
> Trunk-Based Development là một chiến lược phân nhánh mã nguồn hiện đại, trong đó tất cả các kỹ sư cùng hợp nhất những thay đổi nhỏ, thường xuyên trực tiếp vào một nhánh duy nhất gọi là "Trunk" (thường là nhánh `main`). Thay vì duy trì các nhánh tính năng kéo dài hàng tuần gây ra xung đột hợp nhất thảm khốc, các nhà phát triển trong mô hình Trunk-Based chỉ tạo các nhánh cực ngắn hạn (vài giờ đến tối đa 1 hoặc 2 ngày) hoặc thậm chí commit trực tiếp vào Trunk với sự hỗ trợ của các bộ kiểm thử tự động hóa cao và kỹ thuật Feature Flags.

---

## 🤔 Tại sao cần?
Các tập đoàn công nghệ hàng đầu thế giới như Google, Meta, Netflix và Amazon đều áp dụng Trunk-Based Development bởi vì mô hình này tối đa hóa tốc độ phát triển và triệt tiêu hoàn toàn "Địa ngục hợp nhất" (Merge Hell). Bằng cách tích hợp mã nguồn nhiều lần trong ngày, mọi xung đột đều được phát hiện ngay khi còn rất nhỏ và dễ giải quyết, ngăn ngừa tình trạng tách biệt mã nguồn và thúc đẩy văn hóa phản hồi tức thì giữa các thành viên.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một con sông lớn đại diện cho Trunk (`main`). Trong các mô hình cũ, từng nhóm kỹ sư đào những con kênh rất dài chạy song song suốt nhiều tháng, đến khi đục thông đê để hợp nhất nước vào sông chính thì lưu lượng quá lớn gây ngập lụt kinh hoàng (Merge Hell). Trong Trunk-Based Development, các kỹ sư chỉ đào những rãnh nước rất ngắn, xả nước vào dòng sông chính từng gáo nhỏ mỗi giờ. Nước sông luôn cuộn chảy ổn định, không bao giờ xảy ra lũ lụt bất ngờ.

---

## 🖼 Sơ đồ
```text
Mô hình Trunk-Based Development với các nhánh cực ngắn:
Trunk (main): ──●────●────●────●────●────●────●────●────● (Tích hợp liên tục nhiều lần/ngày)
                │   ▲    │   ▲    │   ▲
                └───┘    └───┘    └───┘
              (Nhánh siêu ngắn < 1 ngày, nén commit nhỏ)
```

---

## 🌎 Ví dụ thực tế
Tại một nhóm kỹ thuật phát triển công cụ tìm kiếm, kỹ sư Dũng cần phát triển một thuật toán xếp hạng mới dự kiến mất 3 tuần. Thay vì giữ một nhánh riêng suốt 3 tuần, Dũng sử dụng Trunk-Based Development kết hợp Feature Flag: `if (features.useNewRankingAlgo)`. Mỗi ngày, Dũng viết xong một hàm nhỏ, kiểm thử đơn vị xanh và mở Pull Request nhỏ chỉ khoảng 50 dòng code để gộp thẳng vào Trunk. Đoạn mã mới được đẩy lên production ngay nhưng bị ẩn đi sau Feature Flag. Nhờ vậy, Dũng không bao giờ bị lệch code so với đồng nghiệp và hệ thống vẫn chạy ổn định 100%.

---

## 💻 Command
```bash
git switch main && git pull --rebase origin main
git switch -c short-feat/add-rating-model
git push origin short-feat/add-rating-model
```

---

## 🔍 Giải thích command
- `git pull --rebase`: Đồng bộ nhánh Trunk mới nhất giữ lịch sử thẳng hàng.
- `git switch -c short-feat/<tên-nhánh>`: Tạo nhánh cực ngắn hạn chỉ giải quyết một phần việc nhỏ trong ngày.
- Tích hợp liên tục: Đẩy code và mở PR nhỏ gọn giúp đồng nghiệp review xong chỉ trong 15 phút.

---

## ⚠️ Sai lầm phổ biến
1. **Giữ nhánh quá lâu nhiều ngày mà không tích hợp vào Trunk**:  Biến mô hình Trunk-Based thành Feature Branch Workflow thông thường.
2. **Đưa code dở dang lên Trunk mà không che chắn bằng Feature Flag**:  Khiến giao diện hoặc logic hỏng hiển thị ra người dùng cuối.
3. **Thiếu hệ thống CI tự động kiểm tra nghiêm ngặt**:  Khiến Trunk dễ bị vỡ và chặn đứng công việc của cả công ty.

---

## 🧪 Lab
1. Chia nhỏ một bài toán lớn thành 3 đầu việc nhỏ có thể hoàn thành trong 1 ngày.
2. Viết mã nguồn kết hợp điều kiện if-else mô phỏng cơ chế Feature Flag bảo vệ tính năng mới.

---

## 💡 Hint
> Trunk-Based Development chỉ thực sự phát huy sức mạnh khi đi đôi với bộ kiểm thử tự động vững chắc và văn hóa review code nhanh.

---

## ✅ Validation
- Hiểu rõ sự khác biệt giữa thời điểm đưa mã nguồn lên máy chủ (Deployment) và thời điểm mở tính năng cho người dùng (Release).

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về mô hình Trunk-Based Development.

---

## 🔥 Challenge
Phân tích cơ chế hoạt động của Feature Flags trong việc giảm thiểu rủi ro khi triển khai code liên tục vào Trunk.

---

## 📚 Tổng kết
- Trunk-Based Development tập trung hợp nhất các thay đổi nhỏ vào một nhánh chính duy nhất thường xuyên.
- Tuổi thọ của các nhánh tính năng cực ngắn, thường không vượt quá một đến hai ngày làm việc.
- Kết hợp với Feature Flags để tách biệt việc đưa code lên hệ thống và kích hoạt tính năng cho người dùng.
