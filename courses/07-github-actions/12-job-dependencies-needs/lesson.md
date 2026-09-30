# Quan hệ phụ thuộc giữa các Job với thuộc tính needs

---

## 🎯 Mục tiêu bài học
- Làm chủ thuộc tính needs để thiết lập mối quan hệ phụ thuộc có thứ tự giữa các Job.
- Hiểu cách GitHub Actions xây dựng Đồ thị có hướng không chu trình (DAG) từ các khai báo needs.
- Biết cách truyền và sử dụng kết quả (needs.<job_id>.result) hoặc dữ liệu đầu ra (outputs) giữa các Job.

---

## 📖 Định nghĩa
> Mặc định, các Job độc lập trong cùng một workflow của GitHub Actions sẽ chạy hoàn toàn song song nhằm tiết kiệm thời gian tổng thể. Tuy nhiên, thuộc tính needs cho phép bạn định nghĩa các mối quan hệ phụ thuộc có hướng giữa các Job, biến các tác vụ rời rạc thành một chuỗi đường ống (Pipeline) có trật tự và kiểm soát chặt chẽ. Một Job có khai báo needs: [job_a, job_b] sẽ chỉ được phép bắt đầu thực thi sau khi cả hai Job A và Job B đã hoàn thành thành công rực rỡ mà không gặp sự cố gián đoạn nào.

---

## 🤔 Tại sao cần?
Trong môi trường phát triển phần mềm chuyên nghiệp, bạn không bao giờ muốn triển khai phiên bản mới lên máy chủ sản xuất (Deploy Job) khi mà các bài kiểm tra chất lượng mã nguồn (Lint Job) hoặc bài kiểm tra chức năng (Test Job) vẫn chưa chạy hoặc đã bị thất bại. Sử dụng thuộc tính needs giúp bạn xây dựng cổng kiểm soát đa tầng an toàn: chỉ khi nền móng kiểm thử tầng dưới vững chắc thì tầng đóng gói và phát hành phía trên mới được phép kích hoạt, giúp giảm thiểu tối đa rủi ro gián đoạn dịch vụ người dùng.

---

## 🧠 Mental Model & Mô hình tư duy
Hãy tưởng tượng quá trình xây dựng một ngôi nhà nhiều tầng. Job 1 là đổ móng nhà; Job 2 là dựng cột bê tông; Job 3 là lợp mái; Job 4 là sơn tường. Bạn không thể lợp mái khi chưa dựng cột (lợp mái needs dựng cột), và không thể dựng cột khi chưa đổ móng (dựng cột needs đổ móng). Sự phụ thuộc này tạo nên một chuỗi tiến độ vững chắc theo quy luật trọng lực.

---

## 🖼️ Sơ đồ minh họa
```text
Mô hình đồ thị phụ thuộc (DAG Workflow):
       [Job: Lint] ─────────┐
                            ├──► [Job: Build] ──► [Job: Deploy Production]
       [Job: Unit Test] ────┘

Khai báo YAML:
jobs:
  lint: npm run lint
  test: npm test
  build:
    needs: [lint, test]       <── Chờ cả Lint và Test xong
  deploy:
    needs: [build]            <── Chờ Build xong
```

---

## 🌎 Ví dụ thực tế
Một công ty tài chính công nghệ cao thiết lập pipeline phát hành cổng thanh toán gồm 4 Jobs độc lập: security-scan (quét lỗ hổng bảo mật mã nguồn), unit-test (kiểm tra hàm tính lãi suất giao dịch), build-container (đóng gói ảnh Docker ứng dụng), và deploy-cloud (triển khai lên cụm máy chủ). Job build-container được cấu hình chặt chẽ với needs: [security-scan, unit-test]. Nếu quá trình quét mã nguồn phát hiện một thư viện phụ thuộc có nguy cơ rò rỉ dữ liệu nghiêm trọng dẫn đến security-scan bị thất bại, hệ thống lập tức hủy bỏ Job đóng gói và Job triển khai. Nhờ cơ chế kiểm soát này, mã nguồn lỗi không bao giờ có cơ hội tiếp cận máy chủ thực tế.

---

## 💻 Command & Lệnh thao tác
```bash
gh run view --graph
cat .github/workflows/pipeline.yml
```

---

## 🔍 Giải thích chi tiết lệnh
Lệnh gh run view --graph hiển thị đồ thị phụ thuộc DAG trực quan của phiên chạy ngay trong dòng lệnh terminal, giúp bạn thấy rõ nhánh nào đã hoàn thành và nhánh nào đang xếp hàng chờ.

---

## ⚠️ Sai lầm phổ biến & Cách phòng tránh
1. **Tạo ra vòng lặp phụ thuộc (Circular Dependency)**:  Ví dụ Job A needs Job B và Job B lại needs Job A khiến workflow bị khóa vĩnh viễn và báo lỗi xác thực.
2. **Khai báo sai tên định danh `job_id` trong mảng `needs` khiến hệ thống không tìm thấy Job tiên quyết.**: 
3. **Kỳ vọng Job phụ thuộc vẫn chạy khi Job trước bị lỗi mà không sử dụng hàm trạng thái `always()`.**: 

---

## 🧪 Bài thực hành Lab (Hands-on)
1. Tạo 3 Job: `setup`, `test`, và `deploy`.
2. Cấu hình để `test` phụ thuộc vào `setup` bằng từ khóa `needs: setup`.
3. Cấu hình để `deploy` phụ thuộc vào `test` bằng từ khóa `needs: test`.

---

## 💡 Gợi ý thực hiện (Hint)
> Nếu một Job phụ thuộc vào nhiều Job khác, hãy truyền một danh sách mảng: `needs: [job1, job2]`.

---

## ✅ Kiểm tra kết quả (Validation)
Trên giao diện đồ thị, các Job được nối với nhau bằng các đường mũi tên chỉ hướng chính xác.

---

## ❓ Câu hỏi ôn tập (Quiz)
Hãy kiểm tra khả năng thiết kế luồng phụ thuộc Job của bạn qua các câu hỏi sau.

---

## 🔥 Thử thách nâng cao (Challenge)
Làm thế nào để cấu hình một Job dọn dẹp tài nguyên (cleanup) luôn luôn chạy ở cuối cùng, bất kể các Job tiên quyết trước đó thành công hay thất bại?

---

## 📚 Tổng kết kiến thức
- Thuộc tính `needs` dùng để xác định các Job tiên quyết phải chạy xong trước khi Job hiện tại bắt đầu.
- Có thể truyền một Job đơn lẻ hoặc một mảng nhiều Jobs: `needs: [job_a, job_b]`.
- GitHub Actions tự động chuyển các khai báo `needs` thành một đồ thị có hướng không chu trình (DAG).
