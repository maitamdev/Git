# Hướng Dẫn Soạn Thảo Bài Học (Course Authoring Guide)

## 1. Cấu trúc một bài học
Mỗi bài học trong thư mục `courses/` bắt buộc phải tuân theo cấu trúc:

```text
courses/<level-folder>/<lesson-folder>/
├── lesson.md          # Nội dung bài học (bắt buộc đủ 15 mục)
├── metadata.yml       # Thông tin bài học, cấp độ, thời lượng, XP, mục tiêu
├── quiz.yml           # Bộ câu hỏi trắc nghiệm kiểm tra hiểu biết
├── labs/
│   ├── lab-01.yml     # Bài lab thực hành trên terminal simulator
│   └── challenge.yml  # Thử thách nâng cao
└── assets/            # Hình ảnh, sơ đồ minh họa
```

## 2. Quy chuẩn 15 mục bắt buộc trong `lesson.md`

1. 🎯 **Mục tiêu**: Liệt kê 3-5 gạch đầu dòng rõ ràng.
2. 📖 **Định nghĩa**: Khái niệm súc tích, chính xác về mặt kỹ thuật.
3. 🤔 **Tại sao cần?**: Lý do thực tiễn sinh viên cần học.
4. 🧠 **Mental Model**: Ẩn dụ thực tế giúp ghi nhớ trực giác.
5. 🖼 **Sơ đồ**: Sơ đồ ASCII hoặc Mermaid minh họa luồng.
6. 🌎 **Ví dụ thực tế**: Tình huống dự án doanh nghiệp.
7. 💻 **Command**: Các lệnh trọng tâm cần nắm.
8. 🔍 **Giải thích command**: Ý nghĩa từng flag và tham số.
9. ⚠️ **Sai lầm phổ biến**: Các lỗi sinh viên hay gặp.
10. 🧪 **Lab**: Hướng dẫn thao tác theo từng bước.
11. 💡 **Hint**: Gợi ý khi bí.
12. ✅ **Validation**: Tiêu chí đánh giá hoàn thành.
13. ❓ **Quiz**: Câu hỏi trắc nghiệm.
14. 🔥 **Challenge**: Thử thách mở rộng.
15. 📚 **Tổng kết**: 3 điểm then chốt cần nhớ.

## 3. Kiểm thử bài học tự động
Sau khi tạo hoặc sửa bài học, chạy lệnh:

```bash
pnpm validate:courses
```

Script sẽ tự động quét và kiểm tra xem bài học có đáp ứng đủ 15 mục tiêu chuẩn hay không.
