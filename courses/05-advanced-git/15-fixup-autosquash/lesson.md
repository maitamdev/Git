# Fixup & Autosquash

---

## 🎯 Mục tiêu
- Hiểu rõ sự tiện lợi vượt trội của chỉ thị `fixup` so với `squash` khi không cần giữ lại thông điệp thừa.
- Sử dụng câu lệnh `git commit --fixup <commit-hash>` để tự động tạo commit sửa lỗi gắn nhãn.
- Kích hoạt tính năng kỳ diệu `git rebase -i --autosquash` để Git tự động sắp xếp và gộp commit tự động.
- Có thể bật autosquash cho kho hiện tại bằng cấu hình cục bộ nếu muốn dùng mặc định.

---

## 🧩 Từ khóa hôm nay

### Fixup Commit (git commit --fixup)
- **Nói dễ hiểu**: Commit chuyên dụng để vá lỗi cho một commit cũ trong quá khứ, tự động gắn nhãn tiền tố `fixup!`.
- **Ví dụ**: Dùng `git commit --fixup a1b2c3d` để đánh dấu bản sửa lỗi này sẽ được nạp vào commit `a1b2c3d`.
- **Đừng nhầm**: Tạo commit fixup mới chỉ là bước đánh dấu, bạn vẫn cần chạy rebase để Git thực sự gộp nó vào commit đích.

### Autosquash (--autosquash)
- **Nói dễ hiểu**: Tính năng tự động quét các commit có nhãn fixup hoặc squash và xếp chúng về đúng vị trí trong Todo List.
- **Ví dụ**: Chạy `git rebase -i --autosquash HEAD~5` để Git tự đổi chỉ thị thành fixup và đặt dưới commit gốc tương ứng.
- **Đừng nhầm**: Nếu không thêm cờ `--autosquash` (hoặc cấu hình mặc định), commit fixup sẽ chỉ đứng nguyên vị trí như commit thường.

### Auto-Squash Config (rebase.autoSquash)
- **Nói dễ hiểu**: Thiết lập trong Git config giúp tính năng autosquash luôn tự động chạy mỗi khi bạn dùng `git rebase -i`.
- **Ví dụ**: Gõ `git config --global rebase.autoSquash true` một lần duy nhất để không phải gõ cờ thủ công nữa.
- **Đừng nhầm**: Cấu hình này chỉ áp dụng cho interactive rebase (`-i`), không ảnh hưởng đến các lệnh merge thông thường.

---

## 📖 Định nghĩa
`git commit --fixup <commit>` tạo commit vá có thông điệp bắt đầu bằng `fixup!` và tiêu đề của commit mục tiêu, ví dụ `fixup! feat: add validation`. `git rebase -i --autosquash <base>` sắp xếp commit đó cạnh commit đích và đổi hành động trong todo list thành `fixup`; bạn vẫn xem lại và lưu todo list trước khi Git viết lại lịch sử.

---

## 💡 Tại sao cần
Khi phát hiện lỗi trong commit cũ, `git commit --fixup <hash>` tạo commit có thông điệp liên kết tới commit mục tiêu. Khi chạy `git rebase -i --autosquash <base>`, Git sắp xếp lại todo list; bạn vẫn cần xem lại danh sách trước khi lưu và hoàn tất rebase.

---

## 🧠 Mental Model
Hãy hình dung người thư ký dán một mảnh giấy ghi chú màu vàng "Kèm hồ sơ số 3" lên tờ biên lai mới. Khi bấm nút sắp xếp tự động, cánh tay robot tự động tìm ngăn số 3, nhét tờ biên lai vào và kẹp kín lại ngăn nắp mà không cần xới tung cả tủ hồ sơ.

---

## 📊 Sơ đồ minh họa
```text
Quy trình tự động hóa với Autosquash:
1. Sửa code lỗi của commit C2 (hash 7a8b9c)
2. Gõ lệnh: git commit --fixup 7a8b9c
   Git sinh commit mới: "fixup! feat: user authentication"

3. Gõ lệnh: git rebase -i --autosquash HEAD~5
   Git tự động xếp lại Todo List không cần kéo thả thủ công:
   pick 7a8b9c feat: user authentication
   fixup 1e2f3a fixup! feat: user authentication  <-- Tự động chèn và đổi lệnh!
   pick 4b5c6d feat: payment gateway
```

---

## 🏢 Ví dụ thực tế
Kỹ sư Linh tìm thấy lỗi trong commit `d3e4f5a`. Linh tạo commit vá bằng `git commit --fixup d3e4f5a`, rồi chạy `git rebase -i --autosquash d3e4f5a~1`. Git đặt commit vá cạnh commit đích và đánh dấu `fixup`; Linh kiểm tra todo list rồi mới lưu để chạy rebase.

---

## 💻 Command & Cú pháp
```bash
git commit --fixup <commit-hash>
git rebase -i --autosquash <base-hash>
git config rebase.autoSquash true
```

---

## 🔍 Giải thích command
- `git commit --fixup <hash>`: Tạo commit với tiền tố đặc biệt `fixup! <thông-điệp-cũ>` trỏ thẳng tới commit cần sửa.
- `git rebase -i --autosquash <base>`: Sắp xếp commit fixup cạnh commit đích và đổi hành động trong todo list.
- `git config rebase.autoSquash true`: Bật mặc định cho kho hiện tại; bỏ `--global` để không đổi cấu hình mọi dự án trên máy.

---

## ⚠️ Sai lầm phổ biến
1. **Quên `--autosquash` khi chưa bật config**: Commit fixup có thể không được đưa cạnh commit đích trong todo list.
2. **Truyền nhầm commit hash**: Chỉ định sai hash khiến bản vá bị gộp nhầm vào một tính năng không liên quan.
3. **Rebase trên commit đã push**: Tránh viết lại lịch sử commit đã được chia sẻ công khai lên nhánh chính của cả đội.

---

## 🧪 Lab thực hành
Bài thực hành này cần Git thật vì simulator chưa hỗ trợ interactive rebase/autosquash. Dùng repo thử nghiệm riêng và không dùng nhánh đã chia sẻ.
1. Tạo commit A, commit B, commit C liên tiếp trên kho chứa thử nghiệm.
2. Sửa đổi nội dung tệp tin liên quan đến commit A.
3. Chạy `git commit --fixup <hash-của-commit-A>`.
4. Chạy `git rebase -i --autosquash HEAD~4`. Kiểm tra todo list xem commit vá đã được xếp cạnh commit đích với hành động `fixup` chưa.
5. Lưu file và dùng `git log --oneline` để xác nhận commit A đã được vá tự động.

---

## 💡 Hint & mẹo
> Muốn đặt mặc định, chạy `git config rebase.autoSquash true` trong kho thử nghiệm. Kiểm tra todo list trước khi lưu vì autosquash vẫn cần rebase chạy.

---

## ✅ Validation & Kết quả mong đợi
- Tạo commit vá bằng `git commit --fixup` và nhận biết vị trí/action do `--autosquash` gợi ý.
- Kiểm tra todo list trước khi lưu; xử lý conflict nếu Git dừng trong lúc phát lại commit.

---

## ❓ Quiz nhanh
Hãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng Fixup và Autosquash.

---

## 🚀 Thử thách nâng cao
Nêu sự khác biệt giữa `git commit --fixup` và `git commit --squash` trong cơ chế autosquash.

---

## 📝 Tổng kết
- `fixup` gộp thay đổi vào commit trước và tự động loại bỏ thông điệp dư thừa.
- `git commit --fixup` gắn nhãn đích đến để `--autosquash` tự động xử lý.
- Bật `rebase.autoSquash true` giúp tăng tốc tối đa quy trình dọn dẹp lịch sử Git cá nhân.
