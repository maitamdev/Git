# Local vs Remote Repository

---

## 🎯 Mục tiêu
- Phân biệt rõ rệt bản chất kiến trúc giữa Local Repository (kho cục bộ) và Remote Repository (kho từ xa).
- Nắm vững vai trò trung tâm của máy chủ GitHub trong quy trình cộng tác nhóm và lưu trữ dự phòng.
- Phân định rạch ròi giữa các thao tác ngoại tuyến độc lập (commit) với các thao tác mạng (push, pull).

---

## 🧩 Từ khóa hôm nay

### Local Repository — kho lưu trữ trên máy
- **Nói dễ hiểu:** Toàn bộ kho dữ liệu Git hoàn chỉnh nằm gọn trong thư mục ẩn `.git` trên ổ cứng máy tính cá nhân của bạn.
- **Ví dụ:** Bạn có thể ngắt kết nối mạng hoàn toàn mà vẫn commit, tạo nhánh và xem lịch sử cục bộ bình thường.
- **Đừng nhầm:** Commit trên máy chỉ mới nằm ở ổ cứng cá nhân; đồng đội sẽ không thể nhìn thấy nếu bạn chưa đẩy lên mạng.

### Remote Repository — kho lưu trữ từ xa
- **Nói dễ hiểu:** Kho lưu trữ Git được đặt trên một máy chủ đám mây trực tuyến được kết nối qua mạng Internet (như GitHub, GitLab).
- **Ví dụ:** Đường dẫn `https://github.com/company/project.git` là một Remote Repository dùng chung cho cả công ty.
- **Đừng nhầm:** Kho trên máy và kho trên đám mây hoạt động hoàn toàn độc lập; chúng không tự động đồng bộ theo thời gian thực như Google Drive.

### Push & Pull — đẩy lên và kéo về
- **Nói dễ hiểu:** Cặp thao tác đồng bộ mạng cốt lõi: `push` đẩy commit từ máy lên máy chủ, còn `pull` tải commit từ máy chủ về máy mình.
- **Ví dụ:** Bạn gõ `git push` để nộp code tính năng mới, đồng đội gõ `git pull` để lấy mã nguồn mới nhất về chạy thử.
- **Đừng nhầm:** Hai lệnh này bắt buộc phải có kết nối Internet và quyền truy cập xác thực tài khoản thì mới thực thi được.

---

## 📖 Định nghĩa
Kiến trúc phân tán của Git phân định rạch ròi hai không gian lưu trữ: Local Repository (kho mã nguồn cục bộ hoàn chỉnh nằm trong thư mục `.git` trên ổ cứng máy bạn) và Remote Repository (kho lưu trữ máy chủ đặt trên đám mây như GitHub, GitLab). Hai kho này hoàn toàn độc lập, chỉ trao đổi dữ liệu thông qua các lệnh mạng có chủ đích.

---

## 🤔 Tại sao cần?
Nếu không có Remote Repository, bạn không thể cộng tác nhóm: dự án của bạn sẽ bị cô lập trên một chiếc máy tính cá nhân duy nhất, đối mặt với nguy cơ mất trắng toàn bộ dữ liệu nếu máy hỏng hoặc ổ cứng cháy. Remote Repository trên GitHub vừa là nơi tập hợp thành quả của cả đội ngũ, vừa đóng vai trò như một kho sao lưu dự phòng đám mây vĩnh viễn cho sản phẩm của bạn.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung Local Repository như cuốn sổ nhật ký cá nhân nằm trong ngăn kéo bàn làm việc của bạn: bạn có thể ghi chép, vẽ nháp, xé bỏ tùy thích mà không cần mạng Internet. Còn Remote Repository trên GitHub giống như bảng thông cáo chung ở sảnh tòa nhà: chỉ khi bạn chọn lọc những bài viết xuất sắc nhất đem ra dán lên bảng tin (`push`), đồng đội mới có thể đọc và sao chép về (`pull`).

---

## 🖼 Sơ đồ
```text
KIẾN TRÚC ĐỘC LẬP GIỮA LOCAL VÀ REMOTE REPOSITORY:

Máy tính cá nhân của bạn (Local):           Máy chủ đám mây (GitHub Remote):
┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│ Thư mục làm việc (Working Tree) │         │                                 │
│ Vùng đệm (Staging Area)         │         │   Remote Repository (origin)    │
│ Kho cục bộ (.git database)      │◄───────►│   (Lưu trữ tập trung đám mây)   │
│ [Commit ngoại tuyến tự do]      │         │   [Nơi cả đội ngũ hội quân]     │
└─────────────────────────────────┘         └─────────────────────────────────┘
                ▲                                            ▲
                └────────────── push / fetch / pull ─────────┘
```

---

## 🌎 Ví dụ thực tế
Bạn ngồi trên chuyến bay 12 tiếng không có Wi-Fi vẫn có thể tạo 15 commit trên Local Repository để hoàn thiện tính năng giỏ hàng. Ngay khi máy bay hạ cánh và điện thoại kết nối mạng, bạn gõ một lệnh `git push` duy nhất: toàn bộ 15 mốc snapshot tức thì bay lên GitHub để các thành viên khác kéo về tiếp tục tích hợp.

---

## 💻 Command
```bash
git remote -v
git status
git branch -a
```

---

## 🔍 Giải thích command
- `git remote -v`: Xem danh sách chi tiết các máy chủ từ xa đang kết nối kèm URL nạp (`fetch`) và đẩy (`push`).
- `git status`: Hiển thị tình trạng so lệch giữa nhánh cục bộ và nhánh từ xa tương ứng (ahead hoặc behind).
- `git branch -a`: Liệt kê tất cả các nhánh: nhánh cục bộ màu xanh và các nhánh trên remote màu đỏ (dạng `remotes/origin/<tên-nhánh>`).

---

## ⚠️ Sai lầm phổ biến
1. **Lầm tưởng `git commit` là code đã lên GitHub**: Commit chỉ lưu vào kho máy tính cá nhân; bắt buộc phải chạy `git push` thì code mới xuất hiện trên web.
2. **Lo sợ mất mạng thì không lập trình với Git được**: Git hoạt động ngoại tuyến 100%; bạn chỉ cần Internet khi muốn trao đổi mã nguồn với đồng đội.
3. **Đánh đồng Git và GitHub là một**: Git là phần mềm mã nguồn mở quản lý phiên bản; GitHub là nền tảng dịch vụ web thương mại lưu trữ các kho Git.

---

## 🧪 Lab
1. Chạy lệnh: `git remote -v` để thanh tra xem kho hiện tại đã có liên kết remote nào hay chưa.
2. Chạy `git branch -a` để quan sát toàn bộ các nhánh cục bộ lẫn nhánh từ xa được Git ghi nhận.
3. Chạy `git status` để kiểm tra trạng thái đồng bộ giữa nhánh cục bộ hiện tại và nhánh theo dõi từ xa.

---

## 💡 Hint
> Ghi nhớ quy tắc vàng: "Commit là của riêng bạn trên máy tính, Push mới là công khai cho toàn thế giới!"

---

## ✅ Validation
- Nhận thức và phân biệt chính xác dữ liệu nằm ở Local Repository và Remote Repository.
- Thực thi thành công lệnh `git remote -v` để đọc hiểu cấu hình máy chủ.

---

## ❓ Quiz
Làm bài trắc nghiệm dưới đây để kiểm tra hiểu biết của bạn về mô hình phân tán Local vs Remote Repository trong Git.

---

## 🔥 Challenge
Hãy phân tích lý do tại sao kiến trúc phân tán của Git lại vượt trội hơn hoàn toàn so với mô hình tập trung cũ của SVN (Subversion) khi máy chủ trung tâm bị mất kết nối Internet trong 24 giờ liên tục?

---

## 📚 Tổng kết
- Local Repository lưu trữ trọn vẹn lịch sử trên máy tính cá nhân, hỗ trợ làm việc ngoại tuyến 100%.
- Remote Repository trên GitHub là bến đỗ chung giúp kết nối cả đội ngũ lập trình viên.
- Thao tác `push` đẩy dữ liệu lên mây, `fetch` và `pull` kéo dữ liệu mới về máy.
