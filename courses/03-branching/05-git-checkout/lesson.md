# Lệnh git checkout và lịch sử

---

## 🎯 Mục tiêu
- Hiểu bối cảnh lịch sử và tính đa năng của lệnh truyền thống `git checkout`.
- Phân biệt rõ ràng các trường hợp sử dụng của `git checkout`: chuyển nhánh, xem commit cũ, và hoàn tác tệp.
- Nắm bắt lý do chuyển dịch sang bộ đôi lệnh hiện đại `git switch` và `git restore`.

---

## 📖 Định nghĩa
> `git checkout` là một trong những câu lệnh lâu đời, nổi tiếng và đa năng bậc nhất trong lịch sử phát triển của Git. Trước phiên bản 2.23, `git checkout` đảm nhận đồng thời hai nhiệm vụ hoàn toàn khác nhau: thao tác trên nhánh/commit (chuyển nhánh, tạo nhánh mới, vào Detached HEAD) và thao tác trên tệp tin (hoàn tác tệp đã sửa, phục hồi tệp từ một commit cụ thể). Dù hiện nay các lệnh chuyên trách đã ra đời, `git checkout` vẫn xuất hiện rất nhiều trong các tài liệu và dự án cũ.

---

## 🤔 Tại sao cần?
Khi tham gia vào các dự án phần mềm thực tế hoặc tìm kiếm câu trả lời trên Stack Overflow, bạn sẽ bắt gặp hàng ngàn ví dụ và hướng dẫn sử dụng lệnh `git checkout`. Hiểu rõ cú pháp và hành vi của lệnh này giúp bạn dễ dàng đọc hiểu các tài liệu kỹ thuật cũ, cấu hình các script CI/CD tự động hóa có sẵn, đồng thời trân trọng hơn sự ra đời của các lệnh hiện đại như `git switch` và `git restore`.

---

## 🧠 Mental Model (Mô hình tư duy)
Hãy hình dung `git checkout` giống như một chiếc dao đa năng Thụy Sĩ cổ điển tích hợp hàng chục lưỡi dao, tua-vít và kéo cắt trên cùng một thân dao nhỏ. Chiếc dao này làm được mọi việc nhưng khi bạn muốn cắt một mẩu giấy nhỏ, bạn rất dễ vô ý mở nhầm lưỡi cưa sắc nhọn và làm đứt tay. Bộ đôi lệnh mới `git switch` và `git restore` giống như hai dụng cụ chuyên dụng riêng biệt: một chiếc kéo cắt giấy chuyên nghiệp và một chiếc tua-vít chuẩn mực.

---

## 🖼 Sơ đồ
```text
Sự phân tách nhiệm vụ của git checkout:
                  ┌──► Thao tác trên Branch/Commit ──► [git switch]
[git checkout] ──┤
                  └──► Thao tác trên Tệp tin (File) ──► [git restore]
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư mới vào công ty đọc tài liệu hướng dẫn triển khai hệ thống viết từ năm 2018. Trong tài liệu có dòng lệnh: `git checkout -b release-v1.0`. Kỹ sư lập tức nhận ra đây chính là thao tác tạo và chuyển sang nhánh mới, hoàn toàn tương đương với lệnh hiện đại `git switch -c release-v1.0` mà mình đã được học trong các khóa đào tạo chuẩn hóa. Nhờ hiểu sâu sắc cả hai thế hệ câu lệnh, kỹ sư tự tin thực thi hướng dẫn mà không gặp bất kỳ trở ngại nào. Kỹ sư còn giải thích lại cho các bạn thực tập sinh khác trong nhóm hiểu lý do tại sao tài liệu cũ lại dùng checkout và khi nào thì nên chuyển đổi sang các lệnh chuyên biệt.

---

## 💻 Command
```bash
git checkout <tên-nhánh>
git checkout -b <tên-nhánh-mới>
git checkout <commit-hash>
git checkout -- <tên-tệp>
```

---

## 🔍 Giải thích command
- `git checkout <tên-nhánh>`: Chuyển sang một nhánh khác (tương đương `git switch <tên-nhánh>`).
- `git checkout -b <tên-nhánh-mới>`: Vừa tạo vừa chuyển sang nhánh mới (tương đương `git switch -c <tên-nhánh-mới>`).
- `git checkout <commit-hash>`: Đưa con trỏ HEAD về commit trong quá khứ ở trạng thái Detached HEAD.
- `git checkout -- <tên-tệp>`: Hủy bỏ các thay đổi dở dang trên tệp trong Working Tree (tương đương `git restore <tên-tệp>`).

---

## ⚠️ Sai lầm phổ biến
1. **Quên dấu hai gạch ngang `--` khi checkout file**:  Nếu có một nhánh trùng tên với tên tệp tin, Git sẽ ưu tiên chuyển nhánh thay vì phục hồi tệp.
2. **Sử dụng lệnh checkout cho người mới học**:  Dễ gây hoang mang và nhầm lẫn khái niệm giữa thao tác nhánh và thao tác tệp.
3. **Nhầm lẫn giữa việc hủy bỏ thay đổi tệp và chuyển nhánh**:  Có thể vô tình làm mất dữ liệu tệp tin khi gõ thiếu tham số.

---

## 🧪 Lab
1. Chạy lệnh `git checkout -b legacy-demo` để tạo và chuyển nhánh theo cách truyền thống.
2. Chạy `git checkout main` để quay trở về nhánh chính.
3. Xóa nhánh thử nghiệm bằng `git branch -d legacy-demo`.

---

## 💡 Hint
> Trong các dự án mới, hãy ưu tiên dùng `git switch` và `git restore`.

---

## ✅ Validation
- Nắm vững sự tương đồng giữa các cú pháp cũ và mới.

---

## ❓ Quiz
Hãy làm bài trắc nghiệm dưới đây về lệnh truyền thống git checkout.

---

## 🔥 Challenge
Giải thích vì sao cú pháp `git checkout -- <file>` bắt buộc phải có dấu `--` khi tên tệp trùng với tên một nhánh.

---

## 📚 Tổng kết
- `git checkout` là lệnh truyền thống đa năng cho cả nhánh và tệp tin.
- `git checkout -b` tương đương với lệnh hiện đại `git switch -c`.
- Hiện nay khuyến nghị sử dụng `git switch` và `git restore` để tăng tính rõ nghĩa và an toàn.
