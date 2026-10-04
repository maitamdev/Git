# Trunk-Based Development

---

## 🎯 Mục tiêu
- Hiểu mục tiêu của Trunk-Based Development: tích hợp thay đổi nhỏ vào nhánh chính thường xuyên.
- Phân biệt tích hợp trực tiếp với nhánh ngắn hạn; thời lượng nhánh là hướng dẫn, không phải giới hạn cứng.
- Hiểu Feature Flag là một cách kiểm soát tính năng có thể dùng khi triển khai dần.
- Nêu được vì sao kiểm thử nhanh và phối hợp nhóm quan trọng trong mô hình này.

---

## 🧩 Từ khóa hôm nay

### Trunk
- **Nói dễ hiểu**: Nhánh chính trung tâm (thường là `main`) nơi nhóm tích hợp thay đổi nhỏ thường xuyên.
- **Ví dụ**: Nhóm tích hợp thay đổi nhỏ vào nhánh chính nhiều lần trong ngày hoặc theo nhịp làm việc của mình.
- **Đừng nhầm**: Trunk thường là nhánh chính như `main`, nhưng tên nhánh tùy repo.

### Short-Lived Branches (Nhánh ngắn hạn)
- **Nói dễ hiểu**: Nhánh tạm để làm một thay đổi nhỏ rồi tích hợp sớm vào nhánh chính.
- **Ví dụ**: Nhóm tạo nhánh sửa một lỗi nhỏ, mở PR và cố gắng review trong thời gian ngắn.
- **Đừng nhầm**: Không có số giờ/ngày cố định áp dụng cho mọi nhóm; mục tiêu là giữ thay đổi nhỏ và tích hợp thường xuyên.

### Feature Flags (Cờ tính năng)
- **Nói dễ hiểu**: Cấu hình hoặc điều kiện trong ứng dụng quyết định người dùng nào được thấy một tính năng.
- **Ví dụ**: `if (features.enableNewRanking)` có thể bật giao diện mới cho một nhóm thử nghiệm trước.
- **Đừng nhầm**: Feature flag là logic điều khiển trong mã nguồn hoặc cấu hình, không phải là một nhánh của Git.

---

## 📖 Định nghĩa
Trunk-Based Development là cách làm trong đó nhóm tích hợp thay đổi nhỏ vào một nhánh chính thường xuyên. Nhóm có thể đẩy trực tiếp hoặc dùng nhánh ngắn hạn; CI nhanh giúp phát hiện lỗi sớm. Feature Flag là một kỹ thuật hỗ trợ khi cần triển khai code trước khi bật tính năng.

---

## 🤔 Tại sao cần?
Tích hợp thay đổi nhỏ thường xuyên giúp giảm thời gian sống riêng của code và khiến vấn đề tích hợp được phát hiện sớm hơn. Mô hình này không loại bỏ conflict hoặc lỗi; nhóm cần có cách test, review và sửa nhanh khi nhánh chính gặp sự cố.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung nhánh chính như dòng công việc chung. Thay vì giữ một mảng code riêng lâu ngày, nhóm chia thay đổi thành phần nhỏ và ghép vào dòng chung thường xuyên. Dòng chung vẫn có thể lỗi nên cần theo dõi và sửa nhanh.

---

## 🖼 Sơ đồ
```text
Mô hình Trunk-Based Development:
Trunk (main): ──●────●────●────●────●────●────●────●────● (tích hợp thường xuyên)
                │   ▲    │   ▲    │   ▲
                └───┘    └───┘    └───┘
              (Có thể dùng nhánh ngắn; thời lượng tùy nhóm)
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Dũng làm thuật toán xếp hạng dự kiến mất vài tuần. Nhóm chia công việc thành các phần có thể tích hợp sớm, dùng Feature Flag để giới hạn người dùng được bật tính năng nếu cần. Họ vẫn chạy test và theo dõi ứng dụng sau khi triển khai.

---

## 💻 Command
```bash
git switch main
git pull --rebase origin main
git switch -c short-feat/add-rating-model
git push origin short-feat/add-rating-model
```

Đây là ví dụ dùng remote trong Git thật. Một số nhóm tích hợp trực tiếp lên nhánh chính, số khác dùng PR ngắn hạn; hãy làm theo chính sách repo.

---

## 🔍 Giải thích command
- `git pull --rebase origin main`: Cập nhật `main` từ remote và phát lại commit cục bộ nếu có; chỉ dùng khi hiểu trạng thái nhánh.
- `git switch -c short-feat/<tên-nhánh>`: Tạo nhánh tạm từ nhánh đang checkout.
- Tích hợp liên tục: Gộp các thay đổi nhỏ thường xuyên; thời gian review phụ thuộc vào nhóm.

---

## ⚠️ Sai lầm phổ biến
1. **Để thay đổi sống riêng quá lâu**: Nhánh lệch lâu có thể tăng công sức tích hợp.
2. **Dùng Feature Flag thiếu kiểm soát**: Cờ sai có thể bật tính năng chưa sẵn sàng; cần test cả trạng thái bật/tắt và dọn cờ cũ.
3. **Không có phản hồi nhanh khi tích hợp**: CI là một cách phổ biến để phát hiện lỗi sớm; nhóm vẫn cần quy trình khác nếu không dùng CI.

---

## 🧪 Lab
Hãy cùng tôi mở terminal và thực hiện các bước thực hành trực quan sau:
1. Chia nhỏ một bài toán lớn thành 3 đầu việc nhỏ có thể hoàn thành trong 1 ngày làm việc.
2. Chia một thay đổi giả định thành hai commit nhỏ và ghi rõ thứ tự tích hợp.
3. Viết vài dòng pseudocode cho Feature Flag và nêu cách kiểm tra cả trạng thái bật lẫn tắt.
4. Nếu có repo thử nghiệm, tạo nhánh ngắn, commit từng phần rồi tích hợp theo quy ước của repo.

---

## 💡 Hint
> Kiểm tra tự động nhanh và review theo quy mô thay đổi giúp nhóm tích hợp thường xuyên mà phát hiện lỗi sớm.

---

## ✅ Validation
- Hiểu rõ sự khác biệt giữa thời điểm đưa mã nguồn lên máy chủ (Deployment) và thời điểm mở tính năng cho người dùng (Release).
- Nêu được cách chia nhỏ một thay đổi và một kiểm tra cần có trước/sau khi tích hợp.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về mô hình Trunk-Based Development.

---

## 🔥 Challenge
Phân tích cơ chế hoạt động của Feature Flags trong việc giảm thiểu rủi ro khi triển khai code liên tục vào Trunk.

---

## 📚 Tổng kết
- Trunk-Based Development tập trung hợp nhất các thay đổi nhỏ vào một nhánh chính duy nhất thường xuyên.
- Thay đổi nhỏ và tích hợp thường xuyên là mục tiêu; không có giới hạn thời gian cứng cho nhánh.
- Feature Flags có thể tách thời điểm triển khai code khỏi thời điểm bật tính năng cho người dùng.
