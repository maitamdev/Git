# Fixup & Autosquash

---

## 🎯 Mục tiêu
- Hiểu rõ sự tiện lợi vượt trội của chỉ thị `fixup` so với `squash` khi không cần giữ lại thông điệp thừa.
- Sử dụng câu lệnh `git commit --fixup <commit-hash>` để tự động tạo commit sửa lỗi gắn nhãn.
- Kích hoạt tính năng kỳ diệu `git rebase -i --autosquash` để Git tự động sắp xếp và gộp commit tự động.
- Cấu hình Git tự động bật autosquash vĩnh viễn trong tệp `.gitconfig`.

---

## 📖 Định nghĩa
> `fixup` và `autosquash` là cặp đôi tính năng tự động hóa đỉnh cao trong Git giúp tối ưu hóa quy trình chỉnh sửa lịch sử. Chỉ thị `fixup` (hoặc `f`) gộp các thay đổi của commit hiện tại vào commit phía trước nhưng tự động vứt bỏ thông điệp của nó mà không làm gián đoạn bạn với cửa sổ soạn thảo. Khi kết hợp với cờ `git commit --fixup <target-hash>` và `git rebase -i --autosquash`, Git sẽ tự động tìm đúng commit cần sửa, di chuyển commit vá lỗi đến đúng vị trí và gộp hoàn toàn tự động chỉ với một cú nhấn Enter.

---

## 🤔 Tại sao cần?
Hãy tưởng tượng bạn đang có một chuỗi 10 commit và bạn phát hiện ra một lỗi nhỏ trong commit số 3 (cách đây 7 commit). Thay vì phải chạy `rebase -i`, đếm số lượng commit, cẩn thận kéo dòng vá lỗi lên đúng vị trí của commit số 3 và đổi từ pick thành fixup bằng tay một cách vất vả, cặp đôi `--fixup` và `--autosquash` làm toàn bộ các thao tác thủ công đó cho bạn chỉ trong 2 giây với độ chính xác 100%.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung một nhân viên văn thư đang quản lý một tủ hồ sơ chứa 10 tập tài liệu đánh số từ 1 đến 10. Khi phát hiện một tờ biên lai bổ sung thuộc về hồ sơ số 3, nhân viên không cần lục tung cả tủ hồ sơ. Nhân viên chỉ cần dán một tờ giấy ghi chú màu vàng lên tờ biên lai: "Gửi kèm hồ sơ số 3" (`git commit --fixup <hồ-sơ-3>`). Khi nhấn nút dọn dẹp tủ tự động (`--autosquash`), cánh tay robot tự động tìm đến ngăn số 3, nhét tờ biên lai vào bên trong hồ sơ số 3 và dán kín lại ngăn nắp.

---

## 🖼 Sơ đồ
```text
Quy trình tự động hóa với Autosquash:
1. Sửa code lỗi của commit C2 (hash 7a8b9c)
2. Gõ lệnh: git commit --fixup 7a8b9c
   Git sinh ra commit mới có tiêu đề: "fixup! feat: user authentication"

3. Gõ lệnh: git rebase -i --autosquash HEAD~5
   Git tự động sắp xếp lại Todo List không cần bạn động tay:
   pick 7a8b9c feat: user authentication
   fixup 1e2f3a fixup! feat: user authentication  <-- TỰ ĐỘNG ĐƯỢC CHÈN VÀO ĐÂY!
   pick 4b5c6d feat: payment gateway
```

---

## 🌎 Ví dụ thực tế
Kỹ sư Linh đang kiểm thử nhánh tính năng và phát hiện một lỗi chính tả nghiêm trọng trong hàm tính thuế đã được commit ở mã hash `d3e4f5a`. Linh nhanh chóng sửa lại hàm cho đúng quy chuẩn kỹ thuật, gõ `git add tax.js`, rồi thực thi câu lệnh: `git commit --fixup d3e4f5a`. Git tự động tạo commit phụ trợ đặc biệt với nhãn ghi rõ mục tiêu cần sửa. Tiếp theo, Linh gõ: `git rebase -i --autosquash d3e4f5a~1`. Trình soạn thảo mở ra và Linh hoàn toàn ngạc nhiên thích thú khi thấy Git đã tự động di chuyển commit sửa lỗi lên ngay sau commit tính thuế và đổi sẵn chỉ thị thành `fixup`. Linh chỉ việc bấm lưu tệp và toàn bộ lịch sử được dọn dẹp hoàn hảo trong chớp mắt.

---

## 💻 Command
```bash
git commit --fixup <commit-hash>
git rebase -i --autosquash <base-hash>
git config --global rebase.autoSquash true
```

---

## 🔍 Giải thích command
- `git commit --fixup <hash>`: Tạo commit với tiền tố đặc biệt `fixup! <thông-điệp-cũ>` trỏ thẳng tới commit cần sửa.
- `git rebase -i --autosquash <base>`: Kích hoạt rebase tự động nhận diện các commit fixup và sắp xếp vị trí tương ứng.
- `git config --global rebase.autoSquash true`: Cấu hình Git luôn tự động bật tính năng autosquash mỗi khi chạy interactive rebase.

---

## ⚠️ Sai lầm phổ biến
1. **Quên cờ `--autosquash` khi chạy rebase**:  Khiến commit fixup nằm nguyên ở đuôi danh sách như commit thông thường.
2. **Truyền nhầm mã hash của commit khác vào lệnh `git commit --fixup`.**: Truyền nhầm mã hash của commit khác vào lệnh `git commit --fixup`.
3. **Chạy autosquash trên commit đã được push lên server chung.**: Chạy autosquash trên commit đã được push lên server chung.

---

## 🧪 Lab
1. Tạo commit A, commit B, commit C liên tiếp.
2. Sửa đổi tệp tin liên quan đến commit A.
3. Chạy `git commit --fixup <hash-của-commit-A>`.
4. Chạy `git rebase -i --autosquash HEAD~4`. Quan sát Git tự động sắp xếp vị trí.
5. Lưu file và dùng `git log --oneline` để xác nhận commit A đã được vá tự động.

---

## 💡 Hint
> Chạy `git config --global rebase.autoSquash true` một lần để không bao giờ phải gõ cờ `--autosquash` dài dòng nữa.

---

## ✅ Validation
- Vận hành thành thạo bộ đôi git commit --fixup và git rebase --autosquash để sửa nhanh commit cũ.

---

## ❓ Quiz
Hãy làm bài kiểm tra trắc nghiệm dưới đây về tính năng Fixup và Autosquash.

---

## 🔥 Challenge
Nêu sự khác biệt giữa `git commit --fixup` và `git commit --squash` trong cơ chế autosquash.

---

## 📚 Tổng kết
- `fixup` gộp mã nguồn vào commit trước và tự động loại bỏ thông điệp thừa.
- `git commit --fixup <hash>` đánh dấu mục tiêu cần sửa chữa một cách tự động.
- `git rebase -i --autosquash` tự động tổ chức lại Todo List mà không cần can thiệp thủ công.
