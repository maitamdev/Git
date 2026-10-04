# Nhánh theo dõi Tracking Branch

---

## 🎯 Mục tiêu
- Thấu suốt khái niệm và cơ chế vận hành ngầm của Tracking Branch (nhánh theo dõi) trong Git.
- Phân biệt rõ ràng giữa 3 thực thể nhánh: nhánh cục bộ, nhánh theo dõi từ xa (`origin/main`) và nhánh vật lý trên máy chủ.
- Đọc hiểu tường tận các chỉ số so sánh độ lệch trạng thái: `ahead`, `behind` và phân kỳ (`diverged`).
- Thành thạo các thao tác thiết lập, kiểm tra bằng `git branch -vv` và hủy liên kết upstream tracking khi cần thiết.

---

## 🧩 Từ khóa hôm nay

### tracking branch — nhánh theo dõi
- **Nói dễ hiểu:** Mối liên kết trực tiếp giữa một nhánh trên máy tính cá nhân của bạn với nhánh tương ứng trên máy chủ GitHub.
- **Ví dụ:** Nhánh `main` cục bộ được thiết lập để theo dõi sát sao nhánh `origin/main` trên máy chủ từ xa.
- **Đừng nhầm:** Tracking branch không phải là một nhánh mới; nó là mối quan hệ cấu hình định tuyến giữa hai nhánh đã có.

### upstream — nhánh thượng nguồn
- **Nói dễ hiểu:** Nhánh đích trên máy chủ từ xa được nhánh cục bộ chọn làm chuẩn mực để so sánh và đồng bộ dữ liệu.
- **Ví dụ:** Trong cặp liên kết `main -> origin/main`, thì `origin/main` chính là upstream của nhánh `main` cục bộ.
- **Đừng nhầm:** Khái niệm upstream vừa dùng để chỉ nhánh theo dõi từ xa, vừa dùng để chỉ remote nguồn gốc trong mô hình Forking.

### ahead / behind — độ lệch commit
- **Nói dễ hiểu:** Thước đo so sánh số lượng commit chênh lệch giữa nhánh trên máy của bạn và nhánh trên máy chủ.
- **Ví dụ:** `ahead 1` nghĩa là máy bạn có 1 commit chưa đẩy lên; `behind 2` nghĩa là máy chủ có 2 commit mới bạn chưa kéo về.
- **Đừng nhầm:** Các chỉ số này được tính toán dựa trên lần chạy `git fetch` gần nhất; Git không tự động kết nối mạng khi bạn gõ `git status`.

---

## 📖 Định nghĩa
Tracking Branch (nhánh theo dõi) là cơ chế liên kết định tuyến trong Git giữa một nhánh cục bộ trên máy tính của bạn với một nhánh theo dõi từ xa (thường là `origin/<tên-nhánh>`), cho phép Git tự động tính toán độ lệch commit (ahead và behind) và định hướng luồng dữ liệu cho các câu lệnh rút gọn như `git status`, `git push` và `git pull`.

---

## 🤔 Tại sao cần?
Nếu không có cơ chế Tracking Branch, mỗi lần muốn kéo hay đẩy code bạn đều phải gõ tường minh đầy đủ tên remote và tên nhánh một cách rườm rà. Quan trọng hơn, tracking branch đóng vai trò như chiếc la bàn định vị: chỉ cần gõ `git status`, bạn sẽ lập tức biết mình đang đi trước server bao nhiêu bước hoặc bị tụt lại phía sau bao nhiêu commit để chủ động điều phối.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung bạn và một người bạn đang cùng chạy bộ trên hai làn đường đua song song. Bạn đeo một chiếc đồng hồ định vị GPS thông minh liên tục hiển thị: "Bạn đang chạy trước bạn mình 2 bước" (ahead 2) hoặc "Bạn đang chạy sau 3 bước" (behind 3). Chiếc đồng hồ GPS đo khoảng cách thời gian thực đó chính là cơ chế Tracking Branch trong Git.

---

## 🖼 Sơ đồ
```text
CÁC TRẠNG THÁI SO SÁNH TRÊN TRACKING BRANCH:

1. Trạng thái Up to date (Đồng bộ tuyệt đối):
Local:   C1 ──► C2 ──► C3 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

2. Trạng thái Ahead 1 (Bạn đi trước 1 commit - cần push):
Local:   C1 ──► C2 ──► C3 ──► C4 (main)
Remote:  C1 ──► C2 ──► C3 (origin/main)

3. Trạng thái Behind 1 (Máy chủ có commit mới - cần pull):
Local:   C1 ──► C2 ──► C3 (main)
Remote:  C1 ──► C2 ──► C3 ──► C5 (origin/main)
```

---

## 🌎 Ví dụ thực tế
Sau một buổi chiều lập trình tập trung, bạn tạo được 2 commit hoàn thiện chức năng thanh toán trên nhánh `feature-checkout`. Khi gõ lệnh kiểm tra `git status`, Git lập tức thông báo: "Your branch is ahead of origin/feature-checkout by 2 commits". Nhờ mối quan hệ tracking đã cấu hình sẵn, bạn chỉ cần gõ `git push` ngắn gọn mà không cần suy nghĩ về tên remote hay nhánh đích.

---

## 💻 Command
```bash
git branch -vv
git status
git branch -u origin/main
git branch --unset-upstream
```

---

## 🔍 Giải thích command
- `git branch -vv`: Bảng thanh tra toàn diện, liệt kê mọi nhánh cục bộ kèm tên nhánh upstream và độ lệch ahead/behind chi tiết.
- `git status`: Hiển thị tình trạng đồng bộ hóa hiện tại của nhánh đang làm việc so với nhánh upstream tương ứng.
- `git branch -u origin/main`: Thiết lập hoặc gắn lại liên kết upstream cho nhánh hiện tại trỏ tới `origin/main`.
- `git branch --unset-upstream`: Gỡ bỏ hoàn toàn mối quan hệ theo dõi upstream của nhánh hiện tại.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng `git status` luôn nói sự thật mới nhất trên GitHub**: Lệnh chỉ so sánh với dữ liệu cache đã nạp; bạn phải chạy `git fetch` trước thì chỉ số ahead/behind mới phản ánh thời gian thực.
2. **Hoang mang khi rơi vào trạng thái phân kỳ (diverged)**: Cả bạn và máy chủ đều có commit riêng rẽ (`ahead 1, behind 2`); giải pháp là bình tĩnh chạy `git pull` để xử lý gộp mã.
3. **Quên cấu hình tracking cho nhánh mới**: Dẫn đến việc gõ `git push` hay `git pull` bị Git nhắc nhở phải gõ kèm `--set-upstream`.

---

## 🧪 Lab
1. Chạy lệnh: `git branch -vv` để soi chiếu toàn bộ danh sách các nhánh và cấu hình upstream hiện tại.
2. Tạo một commit mới trên nhánh của bạn bằng lệnh: `git commit --allow-empty -m "docs: test ahead status"`.
3. Chạy lệnh: `git status` để trực tiếp quan sát thông báo `ahead by 1 commit`.
4. Khám phá cấu hình ngầm bằng cách đọc tệp `.git/config` để thấy các trường `remote` và `merge` được Git lưu trữ.

---

## 💡 Hint
> Lệnh `git branch -vv` (hai chữ v viết liền) là câu lệnh thần thánh của mọi Tech Lead khi cần chẩn đoán nhanh tình trạng lệch nhánh của các thành viên trong nhóm. Hãy chạy nó thường xuyên để kiểm soát cục diện!

---

## ✅ Validation
- Đọc hiểu chuẩn xác bảng thông tin do lệnh `git branch -vv` cung cấp.
- Giải thích thành thạo ý nghĩa bản chất của các trạng thái `ahead`, `behind` và `up to date`.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để củng cố và nâng cao trình độ phân tích trạng thái Tracking Branch trong Git.

---

## 🔥 Challenge
Hãy phân tích cơ chế phân kỳ (diverged) xảy ra khi nào trong quá trình phát triển nhóm? Trong tình huống nhánh vừa ahead vừa behind, việc chọn giữa `git pull --rebase` và `git pull --no-rebase` sẽ tạo ra đồ thị lịch sử commit khác nhau như thế nào?

---

## 📚 Tổng kết
- Tracking Branch tạo sợi dây liên kết giữa nhánh máy tính và nhánh máy chủ.
- Giúp theo dõi chính xác độ lệch commit qua các chỉ báo `ahead` và `behind`.
- Hỗ trợ rút gọn các thao tác `git push` và `git pull` thành lệnh 1 từ duy nhất.
