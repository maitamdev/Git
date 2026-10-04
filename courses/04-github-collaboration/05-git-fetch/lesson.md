# Cập nhật dữ liệu từ xa với git fetch

---

## 🎯 Mục tiêu
- Thấu hiểu bản chất an toàn của `git fetch`: tải dữ liệu máy chủ về kho ngầm mà không làm biến động thư mục làm việc.
- Phân biệt rạch ròi giữa nhánh cục bộ (`main`) và nhánh theo dõi từ xa (`origin/main`).
- Thành thạo kỹ năng soi chiếu lịch sử commit và diff dữ liệu mới tải về bằng `git log` và `git diff`.
- Nhận thức chuẩn xác trạng thái lệch commit (`behind`) được tính toán dựa trên lần fetch gần nhất.

---

## 🧩 Từ khóa hôm nay

### git fetch
- **Nói dễ hiểu:** Lệnh tải các commit và thông tin nhánh mới nhất từ máy chủ GitHub về máy nhưng không tự ý gộp vào file đang viết.
- **Ví dụ:** Bạn chạy `git fetch origin` để kiểm tra xem cả ngày hôm nay đồng đội đã đẩy những tính năng mới nào lên máy chủ.
- **Đừng nhầm:** Khác với `pull`, `fetch` không bao giờ chạm vào thư mục làm việc hay làm biến đổi các tệp mã nguồn bạn đang mở.

### remote-tracking branch — nhánh theo dõi từ xa
- **Nói dễ hiểu:** Con trỏ nhánh cục bộ đặc biệt (như `origin/main`) đóng vai trò như một tấm gương phản chiếu vị trí commit trên máy chủ.
- **Ví dụ:** Con trỏ `origin/main` trên máy bạn cho biết nhánh `main` trên GitHub đang dừng lại ở mốc commit nào trong lần đồng bộ gần nhất.
- **Đừng nhầm:** Bạn không thể trực tiếp chuyển vào (checkout) để commit lên nhánh này; Git tự động quản lý và cập nhật nó sau mỗi lần fetch.

### behind — trạng thái đi sau remote
- **Nói dễ hiểu:** Tình trạng nhánh cục bộ trên máy tính của bạn bị thiếu một số commit mới mà trên máy chủ từ xa đã có.
- **Ví dụ:** Thông báo `Your branch is behind 'origin/main' by 2 commits` cho biết bạn đang chậm hơn máy chủ 2 mốc snapshot.
- **Đừng nhầm:** Đây là trạng thái bình thường trong làm việc nhóm; không phải lỗi hệ thống và chỉ cần thực hiện gộp mã nguồn để cập nhật.

---

## 📖 Định nghĩa
`git fetch` là lệnh giao tiếp mạng an toàn của Git, có nhiệm vụ tải toàn bộ các commit, nhánh mới và dữ liệu đối tượng từ máy chủ từ xa về kho cục bộ, đồng thời cập nhật các nhánh theo dõi từ xa (như `origin/main`) mà tuyệt đối không can thiệp hay làm thay đổi mã nguồn trong thư mục làm việc hiện tại của bạn.

---

## 🤔 Tại sao cần?
Trong môi trường làm việc nhóm chuyên nghiệp, việc gộp ngay mã nguồn của đồng nghiệp vào máy mà chưa rõ nội dung thay đổi là một rủi ro lớn. Lệnh `git fetch` đóng vai trò như một trinh sát tiền trạm: giúp bạn kiểm tra mã mới, đọc lịch sử commit và rà soát nguy cơ xung đột tiềm ẩn trước khi quyết định hợp nhất an toàn vào nhánh của mình.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git fetch` giống như nhân viên bưu tá đặt các kiện hàng mới vào hòm thư trước cổng nhà bạn. Người giao hàng không tự ý mở cửa xông vào phòng khách hay xáo trộn bàn làm việc của bạn. Bạn hoàn toàn chủ động ra kiểm tra hòm thư, xem xét nhãn mác kiện hàng rồi mới quyết định thời điểm thích hợp mang vào nhà sử dụng.

---

## 🖼 Sơ đồ
```text
CƠ CHẾ HOẠT ĐỘNG AN TOÀN TUYỆT ĐỐI CỦA GIT FETCH:

Máy chủ GitHub:              Máy tính của bạn (Local):
[Commit C4 mới trên main] ──► Tải về cập nhật: origin/main (C4)
                             Nhánh cục bộ:    main (vẫn ở C3)
                             Working Tree:    Hoàn toàn giữ nguyên!
```

---

## 🌎 Ví dụ thực tế
Bạn đang tập trung viết logic đăng nhập trên nhánh `main` ở commit C3. Trước khi chuẩn bị kết thúc ngày làm việc, bạn chạy `git fetch origin`. Git âm thầm tải 2 commit mới của đồng nghiệp về và cập nhật con trỏ `origin/main` lên C5. Thư mục làm việc của bạn vẫn giữ nguyên ở C3, giúp bạn dễ dàng chạy lệnh kiểm tra khác biệt mà không lo dở dang công việc.

---

## 💻 Command
```bash
git fetch
git fetch origin
git log HEAD..origin/main --oneline
git diff HEAD..origin/main
```

---

## 🔍 Giải thích command
- `git fetch`: Tải về các thay đổi mới nhất từ remote mặc định gắn với nhánh đang làm việc.
- `git fetch origin`: Chỉ định rõ ràng máy chủ remote cần truy vấn thông tin là `origin`.
- `git log HEAD..origin/main --oneline`: Xem danh sách tiêu đề các commit mới có trên server mà máy bạn chưa tích hợp.
- `git diff HEAD..origin/main`: So sánh chi tiết từng dòng code sai khác giữa phiên bản hiện tại của bạn và phiên bản trên server.

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng chạy `git fetch` xong là file trong VS Code tự thay đổi**: Fetch chỉ nạp dữ liệu vào cơ sở dữ liệu ngầm `.git`; bạn phải chủ động tích hợp mới thấy code mới.
2. **Nhầm lẫn tai hại giữa `fetch` và `pull`**: Dùng `pull` khi đang có việc dở dang khiến code bị gộp đột ngột và sinh ra xung đột khó gỡ.
3. **Bỏ qua bước xem trước bằng `git diff`**: Không soi chiếu các thay đổi sau khi fetch khiến bạn bị động khi hợp nhất mã nguồn vào dự án.

---

## 🧪 Lab
1. Chạy lệnh: `git fetch origin` để liên lạc với remote và tải về toàn bộ các nhánh theo dõi từ xa mới nhất.
2. Kiểm tra các commit mới trên server chưa có ở nhánh hiện tại bằng lệnh: `git log HEAD..origin/main --oneline`.
3. So sánh trực quan sự khác biệt mã nguồn bằng: `git diff HEAD..origin/main`.
4. Chạy `git status` để quan sát thông báo độ lệch commit giữa nhánh cá nhân và `origin/main`.

---

## 💡 Hint
> Hãy biến thao tác `git fetch` thành phản xạ đầu ngày mỗi khi bạn ngồi vào bàn làm việc. Chỉ mất 2 giây chạy lệnh, bạn sẽ nắm trọn bức tranh toàn cảnh về tiến độ của cả đội ngũ mà không làm xáo trộn bất kỳ dòng code nào trên máy!

---

## ✅ Validation
- Nhận thức chuẩn xác rằng `git fetch` không làm thay đổi Working Directory.
- Sử dụng thành thạo cú pháp `git log` và `git diff` kết hợp với `origin/main` để kiểm tra mã nguồn từ xa.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để đánh giá độ thấu hiểu của bạn về cơ chế vận hành của lệnh `git fetch`.

---

## 🔥 Challenge
Điều gì sẽ xảy ra nếu một thành viên trong nhóm xóa một nhánh trên GitHub, nhưng khi bạn gõ `git fetch` thì nhánh theo dõi đó vẫn tồn tại trên máy bạn? Hãy tìm hiểu công dụng của tùy chọn `git fetch --prune` để giải quyết vấn đề này.

---

## 📚 Tổng kết
- `git fetch` tải các commit mới từ remote về cơ sở dữ liệu cục bộ an toàn.
- Cập nhật nhánh theo dõi từ xa `origin/main`, giữ nguyên thư mục làm việc.
- Là bước kiểm tra trinh sát tối quan trọng trước khi quyết định gộp mã nguồn.
