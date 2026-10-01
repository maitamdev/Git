# Phân biệt Git với GitHub

---

## 🎯 Mục tiêu
- Nói được Git là công cụ cục bộ, còn GitHub là dịch vụ trực tuyến.
- Phân biệt commit trên máy với commit đã chia sẻ lên GitHub.
- Nêu được khi nào `push` và `pull` cần mạng.

---

## 🧩 Từ khóa hôm nay

### Git — công cụ quản lý phiên bản
- **Nói dễ hiểu:** Phần mềm trên máy giúp bạn quản lý và xem lịch sử dự án.
- **Ví dụ:** Bạn tạo commit bằng Git trong repository trên laptop.
- **Đừng nhầm:** Git không phải tài khoản hay trang web.

### GitHub — dịch vụ cộng tác trực tuyến
- **Nói dễ hiểu:** Dịch vụ trên Internet để lưu repository Git và giúp mọi người chia sẻ, xem xét công việc.
- **Ví dụ:** Nhóm đưa repository lên GitHub để các thành viên cùng xem và góp ý.
- **Đừng nhầm:** GitHub là một dịch vụ dùng Git; GitLab và các dịch vụ khác cũng có thể lưu repository Git.

### Remote — tên kết nối tới kho Git khác
- **Nói dễ hiểu:** Một tên trong repository cục bộ trỏ tới kho Git ở nơi khác để Git biết nơi gửi hoặc lấy dữ liệu.
- **Ví dụ:** `origin` thường là tên remote trỏ tới repository nhóm trên GitHub.
- **Đừng nhầm:** Có remote không làm Git tự đồng bộ; bạn vẫn phải yêu cầu gửi hoặc lấy dữ liệu.

### Push — gửi commit lên kho khác
- **Nói dễ hiểu:** Gửi các commit đã lưu trong repository trên máy tới remote.
- **Ví dụ:** Push commit lên GitHub để thành viên khác có thể lấy về.
- **Đừng nhầm:** Push cần có remote, mạng và quyền truy cập phù hợp; lệnh không tạo commit thay bạn.

### Pull — lấy và tích hợp thay đổi
- **Nói dễ hiểu:** Lấy thay đổi từ remote về rồi tích hợp chúng vào nhánh bạn đang làm.
- **Ví dụ:** Pull thay đổi mới mà nhóm đã gửi lên GitHub trước khi bạn tiếp tục làm.
- **Đừng nhầm:** Pull có thể cần xử lý xung đột; nó không đơn giản chỉ tải một tệp ZIP.

---

## 🤔 Tại sao cần?
Git lưu lịch sử trong repository trên máy; GitHub là một nơi trực tuyến để chia sẻ repository với nhóm. Bạn có thể làm nhiều việc cục bộ khi offline. Muốn đồng nghiệp nhận commit của bạn hoặc muốn lấy commit họ đã chia sẻ, bạn cần kết nối và dùng push hoặc pull.

---

## 📖 Định nghĩa
Git là công cụ quản lý phiên bản chạy trên máy bạn. GitHub là một dịch vụ trực tuyến để lưu repository Git và hỗ trợ cộng tác. Một commit mới tạo trong repository cục bộ chưa tự có trên GitHub; push gửi commit đi, còn pull lấy và tích hợp thay đổi từ kho đã kết nối.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy nghĩ repository trên laptop là cuốn sổ lịch sử của bạn. GitHub là một cuốn sổ khác mà nhóm cùng truy cập. Push gửi mốc từ sổ của bạn sang sổ nhóm; pull lấy mốc từ sổ nhóm về để tiếp tục làm.

---

## 🖼 Sơ đồ
```text
Repository trên máy bạn                 Repository trên GitHub
       [commit cục bộ] ─── push ───► [commit nhóm có thể nhận]
       [các tệp hiện tại] ◄── pull ─ [thay đổi nhóm đã chia sẻ]

Commit được tạo trên máy chưa tự xuất hiện ở phía GitHub.
```

---

## 🌎 Ví dụ thực tế
Bạn đang đi học và mất mạng. Bạn vẫn mở dự án và tạo commit trong repository trên laptop. Khi mạng có lại, bạn push commit lên GitHub để nhóm nhận. Nếu một thành viên đã gửi thay đổi trước đó, bạn pull chúng về trước khi tiếp tục. Push/pull chỉ chạy được khi remote đã cấu hình và bạn có quyền truy cập.

---

## 💻 Command
```bash
git remote -v
```

---

## 🔍 Giải thích command
`git remote -v` liệt kê tên và địa chỉ các remote đã cấu hình. `git push origin main` gửi commit lên remote tên `origin`; `git pull origin main` lấy và tích hợp thay đổi từ đó. Hai lệnh sau chỉ chạy khi remote, nhánh và quyền truy cập đã sẵn sàng.

---

## ⚠️ Sai lầm phổ biến
1. **Gọi GitHub là Git:** Git quản lý lịch sử; GitHub là dịch vụ trực tuyến dùng để chia sẻ repository.
2. **Tưởng commit tự xuất hiện trên GitHub:** Cần push commit lên remote để người khác nhận được.
3. **Pull nghĩa là chỉ tải tệp:** Pull còn tích hợp thay đổi vào nhánh hiện tại và đôi khi cần xử lý xung đột.

---

## 🧪 Lab
1. Chạy `git remote -v` trong terminal mô phỏng.
2. Nếu chưa có kết quả, ghi “repository này chưa cấu hình nơi chia sẻ”; đừng chạy push hoặc pull.
3. Phân loại bốn việc: tạo commit, xem tệp trên máy, push commit, pull thay đổi.
4. Giải thích vì sao một commit vừa tạo trên máy chưa chắc đã hiện trên GitHub.

---

## 💡 Hint
Commit được lưu cục bộ trước. Push gửi commit đi; pull nhận thay đổi về. Nếu `git remote -v` trống, máy chưa biết nơi trao đổi dữ liệu.

---

## ✅ Validation
- Phân biệt đúng Git, GitHub và remote.
- Nói được push gửi commit, pull lấy và tích hợp thay đổi.
- Nhận ra commit cục bộ chưa tự xuất hiện trên GitHub.

---

## ❓ Quiz
Trả lời các câu hỏi sau. Khi sai, đọc giải thích rồi thử lại.

---

## 🔥 Challenge
Giải thích tình huống: “Tôi đã tạo commit nhưng bạn cùng nhóm chưa thấy trên GitHub.” Nêu bước còn thiếu và điều kiện để bước đó chạy được.

---

## 📚 Tổng kết
- Git lưu lịch sử trong repository trên máy; GitHub là dịch vụ để chia sẻ repository.
- Remote lưu tên kết nối tới một kho Git khác.
- Push gửi commit đi; pull lấy và tích hợp thay đổi về.
