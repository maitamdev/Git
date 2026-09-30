# Thực thi có điều kiện với if: always(), success(), failure()

---

## 🎯 Mục tiêu bài học
- Nắm vững cách sử dụng từ khóa if ở cả cấp độ Job và cấp độ Step để kiểm soát luồng chạy.
- Làm chủ 4 hàm kiểm tra trạng thái cốt lõi: success(), failure(), always(), và cancelled().
- Hiểu rõ cơ chế mặc định ngầm định: nếu không khai báo hàm trạng thái, GitHub Actions luôn tự động áp dụng success().

---

## 📖 Định nghĩa
> Thuộc tính if cho phép bạn ngăn chặn một Job hoặc một Step thực thi trừ khi một điều kiện logic cụ thể được thỏa mãn. Bạn có thể sử dụng bất kỳ biểu thức ngữ cảnh nào kết hợp với các hàm kiểm tra trạng thái đặc biệt của GitHub Actions: `success()` (trả về true khi các bước trước thành công), `failure()` (trả về true khi có ít nhất một bước trước bị lỗi), `always()` (luôn luôn trả về true bất kể kết quả), và `cancelled()` (trả về true khi người dùng bấm hủy workflow).

---

## 🤔 Tại sao cần?
Trong tự động hóa thực tế, bạn thường xuyên cần thực hiện các hành động dọn dẹp hoặc cứu hộ khi có sự cố xảy ra: ví dụ như gửi tin nhắn thông báo khẩn cấp lên kênh Telegram/Discord khi bài kiểm thử bị hỏng (cần `if: failure()`), hoặc dọn dẹp các thùng chứa tạm thời kể cả khi chương trình bị crash (cần `if: always()`). Thiếu mệnh đề điều kiện, bạn không thể xây dựng các quy trình linh hoạt và có khả năng tự phục hồi.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy hình dung hệ thống túi khí an toàn và hệ thống loa thông báo trên xe cứu hỏa. Hệ thống phun nước dập lửa chỉ hoạt động khi đến hiện trường (`if: success()`). Nhưng hệ thống còi báo động khẩn cấp và túi khí chỉ bung ra khi xe gặp sự cố va chạm mạnh (`if: failure()`). Và hệ thống ghi dữ liệu hộp đen hành trình thì luôn luôn ghi âm liên tục trong mọi hoàn cảnh kể cả khi xe nổ lốp (`if: always()`).

---

## 🖼️ Sơ đồ minh họa
```text
Quyết định thực thi của Step dựa trên Status Check Functions:
Step 1: Test ──────────► [Bị lỗi ✗]
                          │
                          ├─ Step 2: Gửi thông báo lỗi (if: failure())     ──► [Được chạy ✓]
                          ├─ Step 3: Đóng gói sản phẩm (if: success())     ──► [Bị bỏ qua 🚫]
                          └─ Step 4: Dọn dẹp máy ảo     (if: always())      ──► [Được chạy ✓]
```

---

## 🌎 Ví dụ thực tế
Một kỹ sư thiết lập đường ống kiểm thử tự động cho hệ thống ngân hàng trực tuyến. Khi Job kiểm thử chạy, có 3 bước xử lý kết quả: Step thứ nhất xuất bản gói ứng dụng chỉ khi toàn bộ bài test vượt qua (`if: success()`). Step thứ hai tự động chụp ảnh màn hình lỗi, thu thập tệp nhật ký debug và tải lên kênh hỗ trợ chỉ khi có bài test bị thất bại (`if: failure()`). Step thứ ba gửi yêu cầu tắt máy chủ cơ sở dữ liệu tạm thời để tránh tốn tiền đám mây (`if: always()`). Nhờ các hàm điều kiện chính xác, hệ thống vừa tiết kiệm chi phí vừa cung cấp đầy đủ dữ liệu gỡ lỗi cho lập trình viên.

---

## 💻 Command & Lệnh thao tác
```bash
echo "Chạy khi có lỗi"
echo "Chạy bất kể kết quả"
```

---

## 🔍 Giải thích chi tiết lệnh
Các câu lệnh trên mô phỏng những khối lệnh đặc thù được bảo vệ bởi mệnh đề điều kiện if, chỉ xuất hiện trong log khi điều kiện trạng thái của phiên chạy thỏa mãn.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Nghĩ rằng `if**:  failure()` sẽ chạy ngay cả khi workflow bị người dùng chủ động bấm Cancel (trường hợp này phải dùng `always()` hoặc `cancelled()`).
2. **Quên rằng mặc định mọi Step đều có ngầm định `if**:  success()` nên viết lặp lại thừa thãi.
3. **Sử dụng biến môi trường không tồn tại trong mệnh đề điều kiện dẫn đến việc biểu thức luôn bị đánh giá là false.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo một bước cố tình gây lỗi bằng lệnh `exit 1`.
2. Tạo một bước tiếp theo gắn điều kiện `if: failure()` để in ra dòng thông báo cứu hộ.
3. Tạo bước cuối cùng gắn điều kiện `if: always()` để chứng minh bước này vẫn luôn thực thi.

---

## 💡 Gợi ý thực hiện (Hint)
> Khi viết `if: always()`, bước đó sẽ kiên cường thực thi bất kể các bước trước đó thành công, thất bại hay bị hủy bỏ.

---

## ✅ Kiểm tra kết quả (Validation)
Bước gắn `failure()` và bước gắn `always()` đều được thực thi sau khi bước đầu tiên bị lỗi.

---

## ❓ Câu hỏi ôn tập (Quiz)
Cùng làm bài kiểm tra về các hàm điều kiện trạng thái và từ khóa if trong GitHub Actions.

---

## 🔥 Thử thách nâng cao (Challenge)
Tại sao việc kết hợp `if: always()` với các bước gửi thông báo lại cần cẩn thận để không vô tình gửi báo cáo thành công giả mạo khi pipeline thực chất đã bị hỏng?

---

## 📚 Tổng kết kiến thức
- Từ khóa `if` dùng để quyết định xem một Job hoặc Step có được phép chạy hay không.
- Các hàm trạng thái cốt lõi gồm: `success()`, `failure()`, `always()`, và `cancelled()`.
- Mặc định nếu không chỉ định, GitHub Actions luôn áp dụng điều kiện ngầm định là `success()`.
