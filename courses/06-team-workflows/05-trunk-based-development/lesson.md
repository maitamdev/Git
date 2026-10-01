# Trunk-Based Development

---

## 🎯 Mục tiêu
- Nắm vững triết lý và thực tiễn của mô hình Trunk-Based Development được các gã khổng lồ công nghệ áp dụng.
- Hiểu rõ khái niệm nhánh cực ngắn hạn (Short-lived branches) với tuổi thọ dưới 1 hoặc 2 ngày.
- Làm chủ kỹ thuật Cờ tính năng (Feature Flags) để tách biệt giữa việc đưa mã nguồn lên main (Deploy) và kích hoạt tính năng (Release).
- Nhận biết các điều kiện tiên quyết để vận hành Trunk-Based Development thành công: kiểm thử tự động toàn diện và văn hóa review thần tốc.

---

## 🧩 Từ khóa hôm nay

### Trunk
- **Nói dễ hiểu**: Nhánh chính trung tâm (thường là main), nơi toàn bộ kỹ sư tích hợp các mẩu code nhỏ mỗi ngày.
- **Ví dụ**: Thay vì để code trên nhánh phụ suốt 2 tuần, kỹ sư merge các phần nhỏ vào Trunk mỗi vài tiếng.
- **Đừng nhầm**: Trunk chính là nhánh main; thuật ngữ bắt nguồn từ hình tượng thân cây trong các hệ thống VCS trước đây.

### Short-Lived Branches (< 1-2 Days)
- **Nói dễ hiểu**: Các nhánh rẽ có tuổi thọ siêu ngắn chỉ kéo dài vài giờ đến tối đa 1-2 ngày rồi hợp nhất ngay.
- **Ví dụ**: Tạo nhánh nhỏ chỉ chứa 50 dòng code để sửa một hàm, mở PR review xong merge vào Trunk trong ngày.
- **Đừng nhầm**: Khác với nhánh feature truyền thống kéo dài hàng tuần hoặc suốt cả kỳ sprint.

### Feature Flags (Cờ tính năng)
- **Nói dễ hiểu**: Công tắc logic trong code cho phép đưa code lên production nhưng ẩn đi, chỉ bật cho người dùng khi đã sẵn sàng.
- **Ví dụ**: Đặt điều kiện `if (features.enableNewRanking)` để code mới chạy ngầm an toàn mà không ảnh hưởng giao diện cũ.
- **Đừng nhầm**: Feature flag là logic điều khiển trong mã nguồn hoặc cấu hình, không phải là một nhánh của Git.

---

## 📖 Định nghĩa
Trunk-Based Development là chiến lược phân nhánh trong đó toàn bộ kỹ sư liên tục hợp nhất các thay đổi nhỏ trực tiếp vào một nhánh chính duy nhất gọi là "Trunk" (main). Các nhánh rẽ có tuổi thọ cực ngắn, kết hợp chặt chẽ với kiểm thử tự động CI và cờ tính năng Feature Flags.

---

## 💡 Tại sao cần
Các công ty công nghệ hàng đầu như Google và Meta ưa chuộng mô hình này vì nó triệt tiêu hoàn toàn "Địa ngục hợp nhất" (Merge Hell). Tích hợp mã nguồn nhiều lần trong ngày giúp phát hiện xung đột sớm và thúc đẩy văn hóa phản hồi tức thì.

---

## 🧠 Mental Model
Hãy hình dung con sông lớn là Trunk. Thay vì đào những con kênh dài chạy song song suốt nhiều tháng rồi đục thông gây ngập lụt kinh hoàng, các kỹ sư chỉ đào những rãnh nước rất ngắn, xả nước vào dòng sông từng gáo nhỏ mỗi giờ. Dòng sông luôn cuộn chảy ổn định, không bao giờ ngập lụt.

---

## 📊 Sơ đồ minh họa
```text
Mô hình Trunk-Based Development với các nhánh cực ngắn:
Trunk (main): ──●────●────●────●────●────●────●────●────● (Tích hợp liên tục nhiều lần/ngày)
                │   ▲    │   ▲    │   ▲
                └───┘    └───┘    └───┘
              (Nhánh siêu ngắn < 1-2 ngày, commit nhỏ gọn)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Dũng làm thuật toán xếp hạng mới dự kiến 3 tuần. Thay vì giữ nhánh 3 tuần, Dũng dùng Feature Flag ẩn code mới. Mỗi ngày Dũng mở PR nhỏ 50 dòng gộp thẳng vào Trunk. Code lên production liên tục nhưng vẫn an toàn tuyệt đối, không lo lệch nhánh với đồng nghiệp.

---

## 💻 Command & Cú pháp
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
1. **Giữ nhánh quá lâu**: Giữ nhánh nhiều tuần biến mô hình thành Feature Branch truyền thống và tích tụ conflict lớn.
2. **Không dùng Feature Flag**: Đưa code dở dang lên Trunk mà không che chắn khiến người dùng gặp lỗi logic.
3. **Thiếu hệ thống CI tự động**: Không có bộ kiểm thử tự động nhanh và chuẩn sẽ dễ khiến nhánh Trunk bị vỡ.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác trực tiếp trên terminal của máy tính để làm quen với công cụ.
1. Chia nhỏ một bài toán lớn thành 3 đầu việc nhỏ có thể hoàn thành trong 1 ngày làm việc.
2. Tạo nhánh siêu ngắn hạn `short-feat/demo-flag` từ main.
3. Viết mã nguồn kết hợp điều kiện if-else mô phỏng cơ chế Feature Flag bảo vệ tính năng mới.
4. Mở PR nhỏ gọn và kiểm tra việc tích hợp nhanh chóng vào nhánh chính.

---

## 💡 Hint & mẹo
> Trunk-Based Development chỉ thực sự phát huy sức mạnh khi đi đôi với bộ kiểm thử tự động vững chắc và văn hóa review code nhanh.

---

## ✅ Validation & Kết quả mong đợi
- Hiểu rõ sự khác biệt giữa thời điểm đưa mã nguồn lên máy chủ (Deployment) và thời điểm mở tính năng cho người dùng (Release).
- Nắm vững cách chia nhỏ công việc thành các nhánh siêu ngắn dưới 2 ngày.

---

## ❓ Quiz nhanh
Hãy làm bài trắc nghiệm dưới đây về mô hình Trunk-Based Development.

---

## 🚀 Thử thách nâng cao
Phân tích cơ chế hoạt động của Feature Flags trong việc giảm thiểu rủi ro khi triển khai code liên tục vào Trunk.

---

## 📝 Tổng kết
- Trunk-Based Development tập trung hợp nhất các thay đổi nhỏ vào một nhánh chính duy nhất thường xuyên.
- Tuổi thọ của các nhánh tính năng cực ngắn, thường không vượt quá một đến hai ngày làm việc.
- Kết hợp với Feature Flags để tách biệt việc đưa code lên hệ thống và kích hoạt tính năng cho người dùng.
