# Phân biệt run (shell command) vs uses (prebuilt action)

---

## 🎯 Mục tiêu bài học
- Phân biệt rõ ràng mục đích sử dụng giữa lệnh shell tự do (run) và hành động đóng gói sẵn (uses).
- Hiểu cú pháp tham chiếu action với phiên bản: owner/repo@version (ví dụ: actions/checkout@v4).
- Biết cách truyền tham số cấu hình cho Action thông qua từ khóa with.

---

## 📖 Định nghĩa
> Trong định nghĩa của một Step, bạn có hai phương thức chính để thực thi công việc: run và uses. Từ khóa run được sử dụng để chạy trực tiếp các câu lệnh shell (bash, sh, powershell, cmd) trên hệ điều hành của Runner. Trong khi đó, từ khóa uses được sử dụng để gọi và thực thi một Hành động (Action) đã được đóng gói sẵn từ GitHub Marketplace hoặc từ nội bộ dự án, tuân theo định dạng chuẩn owner/repo@ref với đầy đủ tham số cấu hình đầu vào.

---

## 🤔 Tại sao cần?
Nếu không có các Action đóng gói sẵn (uses), bạn sẽ phải tự viết hàng chục dòng lệnh shell phức tạp để thiết lập môi trường: tự tải mã nguồn qua git clone có xác thực token, tự cài đặt và giải nén Node.js, tự cấu hình biến môi trường và xử lý lỗi đa nền tảng. Sử dụng uses giúp kịch bản workflow ngắn gọn, đạt chuẩn thực hành tốt nhất của ngành, nâng cao tính bảo mật và giúp mã nguồn dễ bảo trì, dễ dàng nâng cấp trong suốt vòng đời dự án phần mềm lâu dài.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy so sánh việc tự tay làm một chiếc bánh pizza thơm ngon tại nhà (run) với việc mua một hộp pizza cao cấp được chế biến sẵn từ siêu thị (uses). Với phương thức run, bạn tự nhào bột, tự nêm nếm gia vị và nướng bằng chiếc lò của mình (bạn có toàn quyền kiểm soát từng chi tiết nhỏ nhưng rất tốn công sức). Với phương thức uses, bạn chỉ việc bóc hộp cho vào lò theo đúng hướng dẫn chuẩn xác in trên bao bì (khối with) của các chuyên gia đầu bếp quốc tế chuyên nghiệp.

---

## 🖼️ Sơ đồ minh họa
```text
Step Execution Method:
┌──────────────────────────────────────────┬──────────────────────────────────────────┐
│ run: Shell Commands                      │ uses: Prebuilt Actions                   │
├──────────────────────────────────────────┼──────────────────────────────────────────┤
│ - name: Chạy kiểm thử                    │ - name: Cài đặt Node.js                  │
│   run: |                                 │   uses: actions/setup-node@v4            │
│     npm install                          │   with:                                  │
│     npm test                             │     node-version: 20                     │
│ • Tự viết lệnh dòng lệnh cụ thể          │ • Tái sử dụng thư viện đóng gói sẵn      │
│ • Linh hoạt, trực tiếp                   │ • Đơn giản, an toàn, chuẩn hóa           │
└──────────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư xây dựng kịch bản kiểm thử cho dự án TypeScript. Bước đầu tiên, kỹ sư sử dụng uses: actions/checkout@v4 để tải mã nguồn kho lưu trữ về máy ảo. Bước thứ hai, kỹ sư sử dụng uses: actions/setup-node@v4 kèm theo tham số with: { node-version: 18, cache: 'npm' } để vừa cài đặt Node.js vừa tự động lưu bộ đệm các thư viện. Đến bước thứ ba, khi cần chạy bài kiểm thử nội bộ đặc thù của dự án, kỹ sư chuyển sang dùng run: npm test. Sự kết hợp nhịp nhàng giữa uses (chuẩn bị hạ tầng) và run (thực thi nghiệp vụ riêng) tạo nên một pipeline mẫu mực.

---

## 💻 Command & Lệnh thao tác
```bash
git clone
node --version
npm test
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh trên phản ánh những tác vụ thực tế: sao chép mã nguồn, kiểm tra phiên bản runtime môi trường và chạy bộ kiểm thử dự án nhằm đảm bảo hệ thống phần mềm hoạt động chính xác trước khi chuyển sang giai đoạn phát hành.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Quên ghim phiên bản cụ thể (@v4) cho action trong uses, khiến workflow dễ bị lỗi khi tác giả cập nhật phiên bản mới làm hỏng tính tương thích.**: 
2. **Sử dụng run để tự viết lại những tác vụ phức tạp đã có sẵn action chuẩn mực như checkout hay upload-artifact.**: 
3. **Đặt nhầm các tham số cấu hình của Action ngang hàng với uses thay vì đặt bên trong khối `with**: `.

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một Step sử dụng action đóng gói sẵn `actions/checkout@v4`.
2. Tạo một Step sử dụng `actions/setup-node@v4` và cấu hình phiên bản Node 20 bằng khóa `with:`.
3. Tạo một Step sử dụng `run:` để in ra phiên bản `node -v` và `npm -v`.

---

## 💡 Gợi ý thực hiện (Hint)
> Luôn luôn sử dụng `actions/checkout@v4` làm bước đầu tiên trong hầu hết các Job cần thao tác với mã nguồn dự án.

---

## ✅ Kiểm tra kết quả (Validation)
Mã nguồn được tải về chính xác và phiên bản Node.js hiển thị đúng như đã cấu hình.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng phân biệt và ứng dụng chính xác giữa run và uses qua bài kiểm tra dưới đây.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao các chuyên gia bảo mật khuyến nghị nên ghim action bằng mã băm commit SHA đầy đủ thay vì dùng thẻ tag phiên bản (@v4) trong các dự án quan trọng?

---

## 📚 Tổng kết kiến thức
- `run` dùng để thực thi trực tiếp các câu lệnh shell trên hệ điều hành của Runner.
- `uses` dùng để gọi các Action đóng gói sẵn từ Marketplace theo cú pháp `owner/repo@version`.
- Sử dụng khối `with:` để truyền các tham số cấu hình đầu vào (inputs) cho Action.
