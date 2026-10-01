# Cấu trúc Refspec và đồng bộ Remote References

---

## 🎯 Mục tiêu
- Giải mã cú pháp Refspec bí ẩn trong tệp cấu hình `.git/config`: `+refs/heads/*:refs/remotes/origin/*`.
- Hiểu ánh xạ giữa nhánh trên remote và remote-tracking ref trong repository cục bộ.
- Đọc refspec cho `fetch` và `push`, nhận biết tác động của dấu `+`.
- Thực hành tạo và xóa ref trên remote giả lập cục bộ, không cần tài khoản GitHub.

---

## 🧩 Từ khóa hôm nay

### Refspec
- **Nói dễ hiểu**: Quy tắc chỉ Git biết lấy ref nào làm nguồn và cập nhật ref nào làm đích.
- **Ví dụ**: `+refs/heads/*:refs/remotes/origin/*` ánh xạ các nhánh trên remote vào refs theo dõi ở local khi fetch.
- **Đừng nhầm**: Ý nghĩa nguồn/đích phụ thuộc chiều truyền dữ liệu; Pull Request refs là quy ước riêng của máy chủ như GitHub.

### Remote-tracking ref
- **Nói dễ hiểu**: Ref local ghi nhận vị trí nhánh remote lần gần nhất Git đồng bộ.
- **Ví dụ**: `origin/main` thường đại diện cho remote-tracking ref `refs/remotes/origin/main`.
- **Đừng nhầm**: Đây là namespace của ref, không bảo đảm luôn có một file vật lý riêng; thường bạn dùng nó để xem trạng thái remote, còn commit trên nhánh local của mình.

### Dấu `+` trong refspec
- **Nói dễ hiểu**: Cho phép ref đích được cập nhật dù giá trị mới không phải fast-forward so với giá trị cũ.
- **Ví dụ**: Trong fetch mapping, dấu `+` cho phép remote-tracking ref local theo kịp khi nhánh remote bị viết lại.
- **Đừng nhầm**: Với push, dấu `+` cho phép yêu cầu non-fast-forward nhưng máy chủ vẫn có thể từ chối theo chính sách; với fetch, đích là ref local.

---

## 📖 Định nghĩa
Refspec có dạng tổng quát `[+]<source>:<destination>`. Source là ref Git đọc hoặc gửi; destination là ref được cập nhật ở phía nhận. Với `fetch`, dữ liệu đi từ remote về local; với `push`, dữ liệu đi từ local tới remote. Dấu `+` cho phép cập nhật destination dù thay đổi không phải fast-forward, nhưng chính sách phía nhận vẫn có thể từ chối push. Một số refspec chỉ định source mà bỏ destination, tùy lệnh chúng dùng để tải hoặc chọn ref.

---

## 💡 Tại sao cần
Refspec giải thích vì sao `fetch` có thể lưu nhánh remote vào namespace `refs/remotes/`, hoặc vì sao một lệnh push có thể gửi `HEAD` dưới tên nhánh khác. Cấu hình của remote thường lưu fetch refspec; push còn chịu ảnh hưởng bởi lệnh cụ thể và cấu hình push. Đọc refspec giúp dự đoán ref nào sẽ đổi trước khi thực hiện thao tác.

---

## 🧠 Mental Model
Hãy xem refspec như địa chỉ chuyển tiếp: phần trước dấu `:` là ref nguồn, phần sau là ref đích. Khi fetch, nhãn chỉ đường từ server về local; khi push, chiều truyền đổi lại. Trước khi chạy lệnh, hãy xác định rõ repository nào là nguồn và ref nào có thể bị cập nhật.

---

## 📊 Sơ đồ minh họa
```text
Giải phẫu cấu trúc Refspec trong .git/config:
+refs/heads/* : refs/remotes/origin/*
│ └─────────┘   └───────────────────┘
│      │                  │
│   <Nguồn>            <Đích>
│ (Nhánh trên remote) (Ref theo dõi ở local)
│
└─ Dấu "+": Cho phép cập nhật non-fast-forward khi fetch

Khi bạn chạy `git fetch origin`:
Server: refs/heads/feature ──► Ánh xạ thành ──► Cục bộ: refs/remotes/origin/feature
```

---

## 🏢 Ví dụ thực tế
Trong một bản clone thông thường, fetch refspec thường ánh xạ `refs/heads/*` trên remote sang `refs/remotes/origin/*` ở local. Repo dùng `--single-branch`, mirror hoặc cấu hình riêng có thể khác. Người học có thể xem cấu hình của mình bằng `git config --get remote.origin.fetch`; không nên sửa `.git/config` chỉ để thử khi chưa hiểu ref đích sẽ đổi.

---

## 💻 Command & Cú pháp
```bash
# Kiểm tra quy tắc refspec mặc định của remote origin
git config --get remote.origin.fetch

# Yêu cầu fetch một nhánh và cập nhật remote-tracking ref local tương ứng
git fetch origin +refs/heads/feature-xyz:refs/remotes/origin/feature-xyz

# Ví dụ cú pháp push nhánh local sang tên nhánh remote khác
git push origin HEAD:refs/heads/custom-branch

# Ví dụ cú pháp xóa ref remote (chỉ thử trên remote sandbox)
git push origin :refs/heads/old-feature-branch
```

---

## 🔍 Giải thích command
- `git config --get remote.origin.fetch`: Đọc fetch refspec đã cấu hình cho `origin`; có thể không có kết quả nếu repo chưa cấu hình remote.
- `HEAD:refs/heads/custom-branch`: Gửi commit mà `HEAD` chỉ tới vào ref tên `custom-branch` trên remote.
- `:refs/heads/old-feature-branch`: Để trống source để yêu cầu xóa ref đích; hãy chỉ dùng với remote thử nghiệm.
- `git fetch origin <source>:<dest>`: Yêu cầu fetch source ref và cập nhật đích local đã chỉ định.

---

## ⚠️ Sai lầm phổ biến
1. **Quên dấu hai chấm khi viết refspec**: Khiến Git hiểu nhầm tham chiếu nguồn và đích, gây ra thao tác ngoài ý muốn.
2. **Vô tình xóa nhánh khi để trống phần nguồn**: `git push origin :refs/heads/branch` yêu cầu xóa ref ở remote; đích cần được kiểm tra cẩn thận.
3. **Sửa sai cú pháp trong `.git/config`**: Dẫn tới việc lệnh `git fetch` báo lỗi cú pháp và không thể kết nối đồng bộ được nữa.

---

## 🧪 Lab thực hành
Không cần GitHub hay đăng nhập: dùng một bare repository local làm remote giả lập. Chạy lệnh theo thứ tự trong Bash hoặc Git Bash; chúng tạo và xóa ref chỉ trong thư mục thử nghiệm này.

```bash
mkdir git-refspec-lab
cd git-refspec-lab
git init --bare remote.git

mkdir learner
cd learner
git init
git config user.name "Git Learner"
git config user.email "learner@example.com"
echo "refspec lab" > README.md
git add README.md
git commit -m "initial commit"

git remote add origin ../remote.git
git push origin HEAD:refs/heads/main
git fetch origin +refs/heads/main:refs/remotes/origin/main
git show-ref refs/remotes/origin/main

git push origin HEAD:refs/heads/test-refspec
git ls-remote origin refs/heads/test-refspec
git push origin :refs/heads/test-refspec
git ls-remote origin refs/heads/test-refspec
```

1. **Bước 1**: Tạo remote local và repository `learner` theo lệnh trên.
2. **Bước 2**: Quan sát ref mà fetch cập nhật bằng `git show-ref refs/remotes/origin/main`.
3. **Bước 3**: Đối chiếu ref test qua `git ls-remote` trước và sau lệnh xóa. Sau khi xóa, lệnh cuối không in ref đó.

Chỉ làm lệnh xóa với remote local vừa tạo trong bài này.

---

## 💡 Hint & mẹo
> Dấu `:` không có source là cú pháp xóa ref khi push. Kiểm tra tên remote và ref đích trước khi chạy.

---

## ✅ Validation & Kết quả mong đợi
- `git show-ref refs/remotes/origin/main` hiển thị remote-tracking ref sau fetch.
- `git ls-remote` cho thấy ref test xuất hiện sau push và biến mất sau khi xóa trên remote local.

---

## ❓ Quiz nhanh
Hãy kiểm tra mức độ am hiểu về cơ chế Refspec qua các câu hỏi trong phần trắc nghiệm bên dưới.

---

## 🚀 Thử thách nâng cao
Làm thế nào để cấu hình Refspec trong `.git/config` nhằm tự động tải về toàn bộ các Pull Request từ GitHub về máy cục bộ để kiểm tra (ví dụ: `refs/pull/*/head:refs/remotes/origin/pr/*`)?

---

## 📝 Tổng kết
- Refspec quy định quy tắc ánh xạ tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa.
- Cú pháp chuẩn: `[+]<source-ref>:<destination-ref>`.
- Được lưu trữ trong `.git/config` dưới mục `[remote "origin"]` và điều khiển hành vi của `fetch` và `push`.
- Hãy xác định source, destination, chiều đồng bộ và tác động của `+` trước khi chạy refspec.
