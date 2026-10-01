# git reflog

---

## 🎯 Mục tiêu
- Hiểu reflog là nhật ký ghi lại các lần cập nhật `HEAD`, nhánh và một số tham chiếu cục bộ khác.
- Phân biệt sự khác nhau căn bản giữa nhật ký commit (`git log`) và nhật ký tham chiếu (`git reflog`).
- Đọc hiểu cú pháp định danh vị trí thời gian của reflog: `HEAD@{0}`, `HEAD@{1}`, `HEAD@{2 days ago}`.
- Biết giới hạn của reflog: hữu ích để tìm commit đã từng được tham chiếu, nhưng không lưu nội dung sửa đổi chưa commit.

---

## 🧩 Từ khóa hôm nay

### git reflog
- **Nói dễ hiểu**: Nhật ký các lần Git cập nhật `HEAD` hoặc một tham chiếu cục bộ như nhánh.
- **Ví dụ**: Gõ `git reflog` để tìm lại mã hash của một commit vừa lỡ tay xóa bằng `git reset --hard`.
- **Đừng nhầm**: Reflog không được gửi lên remote qua `git push`; mỗi bản clone có nhật ký cục bộ riêng.

### HEAD@{n}
- **Nói dễ hiểu**: Ký hiệu tra một entry cũ trong reflog của `HEAD`.
- **Ví dụ**: `HEAD@{1}` là entry đứng trước entry mới nhất trong reflog của `HEAD`.
- **Đừng nhầm**: Không phải số thứ tự commit hoặc lệnh terminal; reflog chỉ ghi các lần ref được cập nhật.

### Reflog entry
- **Nói dễ hiểu**: Một dòng ghi nhận ref cũ và mới khi Git cập nhật tham chiếu.
- **Ví dụ**: Sau `git reset`, entry có thể giúp bạn tìm hash mà `HEAD` vừa rời khỏi.
- **Đừng nhầm**: Entry giúp tìm commit; nó không chứa bản sao các chỉnh sửa file chưa commit.

---

## 📖 Định nghĩa
`git reflog` (Reference Logs - nhật ký tham chiếu) hiển thị các lần cập nhật tham chiếu trong kho cục bộ. `git log` xem các commit đi theo lịch sử của một nhánh; reflog còn có thể giúp tìm commit mà nhánh đã rời khỏi. Reflog không ghi mọi lệnh Git và không lưu file chưa commit.

---

## 💡 Tại sao cần
Nếu lỡ tay reset hoặc xóa nhánh, reflog có thể giúp tìm commit đã từng được tham chiếu. Khả năng khôi phục phụ thuộc vào việc entry còn tồn tại và commit object chưa bị dọn. Reflog không lưu các thay đổi chưa commit.

---

## 🧠 Mental Model
Hãy hình dung `git log` như danh sách commit có thể đi tới từ nhánh hiện tại. Reflog giống sổ ghi những lần các tham chiếu cục bộ được cập nhật. Đây là nhật ký giới hạn thời gian, không ghi mọi lệnh và không bảo đảm mọi commit vẫn còn.

---

## 📊 Sơ đồ minh họa
```text
Sự khác biệt giữa git log và git reflog:
git log:    Chỉ nhìn thấy các commit còn kết nối trong nhánh hiện tại.
            C1 ──► C2 (mất dấu C3 vì đã lỡ reset --hard về C2)

git reflog: Ví dụ các entry cập nhật HEAD:
            HEAD@{0}: reset: moving to HEAD~1
            HEAD@{1}: commit: feat: awesome feature (vị trí trước đó)
            HEAD@{2}: commit: fix: minor bug (C2)
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Huy lỡ tay chạy `git reset --hard HEAD~5`, khiến các commit gần đây không còn trên nhánh hiện tại. Huy dừng lại, kiểm tra `git status` và `git reflog`, rồi chép hash của commit cần giữ. Sau khi xác minh hash, Huy tạo nhánh cứu hộ bằng `git branch rescue-payment <hash>`. Cách này giữ commit mà không di chuyển nhánh hiện tại; thay đổi chưa commit đã bị reset thì reflog không khôi phục được.

---

## 💻 Command & Cú pháp
```bash
git reflog
```

Git thật còn hỗ trợ `git reflog show <nhánh>` và `git reflog --date=relative`; simulator chỉ hiển thị reflog cơ bản của `HEAD`.

---

## 🔍 Giải thích command
- `git reflog`: Hiển thị các entry của HEAD; khi đọc entry, đối chiếu hash với `git show` hoặc `git log`.

---

## ⚠️ Sai lầm phổ biến
1. **Nghĩ rằng reflog tồn tại vĩnh viễn**: mặc định Git thường đặt thời hạn 90 ngày cho entry còn reachable và 30 ngày cho entry unreachable; cấu hình và garbage collection có thể làm thời hạn khác đi.
2. **Tìm reflog trên GitHub sau khi push**: `git push` cập nhật ref từ xa, không đồng bộ reflog của máy bạn.
3. **Nghĩ rằng file chưa commit có thể cứu bằng reflog**: Chỉ những gì đã từng commit thành snapshot mới có dấu vết trong reflog.

---

## 🧪 Lab thực hành
Bài học này là bài tự kiểm tra: bạn thao tác tra cứu nhật ký reflog trên terminal.
1. Tạo 2 commit mới liên tiếp trong kho chứa bài tập.
2. Chạy lệnh `git reflog` và quan sát các dòng ghi nhận sự kiện commit kèm thông điệp.
3. Thử chuyển sang một nhánh khác rồi quay lại, sau đó chạy lại `git reflog`.
4. Quan sát các sự kiện chuyển đổi nhánh checkout được ghi lại chi tiết.

---

## 💡 Hint & mẹo
> Khi nghi mất commit, trước tiên dừng các thao tác ghi, kiểm tra trạng thái repo, rồi đọc `git reflog` để tìm hash cần giữ.

---

## ✅ Validation & Kết quả mong đợi
- Lệnh `git reflog` hiển thị các lần cập nhật ref gần đây cùng mã commit.
- Xác định được commit cũ khi entry còn trong reflog và object vẫn còn trong kho.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về công cụ cứu hộ git reflog.

---

## 🚀 Thử thách nâng cao
Tìm hiểu cơ chế dọn rác tự động của Git thông qua lệnh `git gc` và cách Git quản lý thời gian hết hạn của các bản ghi reflog.

---

## 📝 Tổng kết
- `git reflog` ghi lại một số lần cập nhật ref cục bộ như `HEAD` và nhánh; nó không ghi mọi lệnh.
- Dữ liệu reflog mang tính cục bộ riêng tư trên máy cá nhân, không chia sẻ qua remote.
- Là nền tảng cốt lõi để khôi phục các commit bị mất do reset, checkout hoặc xóa nhánh.
