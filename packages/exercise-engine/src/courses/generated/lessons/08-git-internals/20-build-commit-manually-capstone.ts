import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "20-build-commit-manually-capstone",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "20-build-commit-manually-capstone",
    "title": "Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands",
    "level": "advanced",
    "duration": 50,
    "xp": 250,
    "prerequisites": [
      "19-reflog-internals"
    ],
    "objectives": [
      "Trong repository thử nghiệm mới, tạo một root commit bằng các lệnh plumbing.",
      "Thực hiện và kiểm tra luồng Blob -> Index -> Tree -> Commit -> Ref."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "git internals capstone",
      "build commit manually",
      "plumbing only",
      "mastery challenge",
      "no porcelain"
    ],
    "commands": [
      "git hash-object -w <file>",
      "git update-index --add --cacheinfo 100644 <hash> <path>",
      "git write-tree",
      "git commit-tree <tree-hash> -m \"Manual commit\"",
      "git update-ref refs/heads/capstone <commit-hash>"
    ]
  },
  "content": "# Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands\n\n---\n\n## 🎯 Mục tiêu\n- Trong một repository thử nghiệm mới, tạo một root commit bằng các lệnh plumbing mà không dùng `git add` hay `git commit`.\n- Làm theo chuỗi Blob -> Index -> Tree -> Commit -> Ref và kiểm tra kết quả ở từng bước.\n- Giải thích vai trò riêng của mỗi object và ref trong commit vừa tạo.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Plumbing pipeline\n- **Nói dễ hiểu**: Một chuỗi lệnh cấp thấp cho phép quan sát object và ref mà lệnh `git commit` thường phối hợp giúp bạn.\n- **Ví dụ**: `hash-object` tạo blob; `write-tree` tạo tree từ index; `commit-tree` tạo commit; `update-ref` neo commit vào ref.\n- **Đừng nhầm**: Đây là bài học để hiểu mô hình dữ liệu; khi làm việc thường ngày, dùng `git add` và `git commit` an toàn, dễ kiểm tra hơn.\n\n### git update-index --cacheinfo\n- **Nói dễ hiểu**: Lệnh plumbing cho phép đăng ký trực tiếp một mã băm Blob đã có trong database vào Staging Area mà không cần đọc từ file hệ thống.\n- **Ví dụ**: `git update-index --add --cacheinfo 100644 <blob-sha> sample.txt`.\n- **Đừng nhầm**: Cần object blob hợp lệ có sẵn. Lệnh cập nhật index không tự đọc nội dung đường dẫn để tạo blob.\n\n### git commit-tree Command\n- **Nói dễ hiểu**: Lệnh plumbing nhận mã băm của một đối tượng Tree và danh sách các commit cha để đúc ra một đối tượng Commit hoàn chỉnh.\n- **Ví dụ**: `git commit-tree <tree-id> -m \"feat: init\"` in object ID của commit mới.\n- **Đừng nhầm**: Lệnh này chỉ tạo đối tượng commit trong `.git/objects/`, chưa di chuyển nhánh hay cập nhật con trỏ HEAD.\n\n---\n\n## 📖 Định nghĩa\nCapstone này dùng một repository mới chỉ để thực hành. Bạn tạo blob từ một tệp, đăng ký blob vào index, tạo tree từ index, tạo commit trỏ tới tree, rồi cập nhật một ref riêng tên `capstone`. Không chạy các lệnh cập nhật ref của bài trong repository dự án: `git update-ref` thay đổi ref được chỉ định. Bài tạo root commit nên không truyền parent; commit tiếp theo mới cần `-p <parent-id>`.\n\n---\n\n## 💡 Tại sao cần\nLàm capstone giúp bạn nối các khái niệm đã học: nội dung tệp trở thành blob, index chọn blob và đường dẫn, tree ghi cấu trúc thư mục, commit ghi tree cùng thông tin lịch sử, ref giữ commit để Git có thể tìm tới. Bạn không cần dùng plumbing trong công việc hằng ngày để hiểu luồng đó.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng bạn là một nghệ nhân chế tác đồng hồ Thụy Sĩ cổ điển. Người bình thường chỉ mua chiếc đồng hồ đã đóng vỏ hoàn chỉnh về đeo lên tay và xem giờ (Porcelain). Nhưng bạn tự tay gắp từng chiếc bánh răng bánh lắc siêu nhỏ (Blob), tra dầu vào trục quay (Index), lắp ráp thành bộ máy cơ khí tinh vi (Tree), đóng vào khung vỏ thép không gỉ khắc số seri (Commit), và gắn kim đồng hồ chỉ đúng giờ hiện tại (Branch Ref).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình 5 bước tạo Commit hoàn chỉnh bằng Plumbing Commands:\n┌────────────────────────────────────────────────────────────────────────┐\n│ Bước 1: Tạo Blob từ tệp tin                                           │\n│ BLOB_ID=$(git hash-object -w manual.txt)                               │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 2: Đưa vào Staging Area (Cập nhật tệp .git/index)                 │\n│ git update-index --add --cacheinfo 100644 $BLOB_ID manual.txt         │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 3: Đóng gói cây thư mục thành đối tượng Tree                     │\n│ TREE_ID=$(git write-tree)                                              │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 4: Đúc đối tượng Commit từ Tree                                  │\n│ COMMIT_ID=$(git commit-tree $TREE_ID -m \"feat: manual plumbing\")       │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 5: Cập nhật con trỏ nhánh                                         │\n│ git update-ref refs/heads/capstone $COMMIT_ID                          │\n└────────────────────────────────────────────────────────────────────────┘\n──► KẾT QUẢ: HEAD trỏ tới `capstone`; `git log -1` hiển thị commit vừa tạo.\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nTrong repo capstone mới, người học ghi một blob, đưa object ID của nó vào index, lấy tree ID bằng `git write-tree`, rồi tạo root commit bằng `git commit-tree <tree-id> -m \"manual plumbing\"`. Cuối cùng họ tạo ref `refs/heads/capstone` cho commit và kiểm tra bằng `git log -1`. Vì đây là repo tạm, không có nhánh dự án nào bị ghi đè.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Tạo một repository mới dành riêng cho bài capstone\nmkdir git-capstone-lab\ncd git-capstone-lab\ngit init\ngit config user.name \"Git Learner\"\ngit config user.email \"learner@example.com\"\ngit symbolic-ref HEAD refs/heads/capstone\n\n# Tạo tệp thử nghiệm rồi ghi Blob vào object database\nprintf \"Thuc hanh plumbing\\n\" > manual.txt\nBLOB_ID=$(git hash-object -w manual.txt)\n\n# Đăng ký blob vào index (không dùng git add)\ngit update-index --add --cacheinfo 100644 \"$BLOB_ID\" manual.txt\n\n# Tạo Tree từ index\nTREE_ID=$(git write-tree)\n\n# Tạo root commit: repository thử nghiệm chưa có commit cha\nCOMMIT_ID=$(git commit-tree \"$TREE_ID\" -m \"feat: manual plumbing capstone\")\n\n# Neo commit vào ref capstone; HEAD đã được trỏ tới ref này ở trên\ngit update-ref refs/heads/capstone \"$COMMIT_ID\"\ngit log -1 --oneline\n```\n\n---\n\n## 🔍 Giải thích command\n- `git hash-object -w`: Đóng gói dữ liệu tệp thành đối tượng nhị phân Blob trong `.git/objects/`.\n- `git update-index --add --cacheinfo`: Ghi bản ghi gồm file mode, hash và đường dẫn vào tệp `.git/index`.\n- `git write-tree`: Quét toàn bộ bảng index và ghi ra đối tượng Tree phân cấp.\n- `git commit-tree`: Tạo commit với thông điệp và thông tin tác giả; `-p` thêm parent nếu commit không phải root.\n- `git update-ref`: Cập nhật ref được chỉ định. Lệnh này không tự tạo nhánh an toàn mới nếu tên ref đã tồn tại; trong lab, repo tạm bảo đảm ref `capstone` chưa có.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ `--add` hoặc `--cacheinfo` trong `git update-index`**: Khiến tệp không được thêm vào index như dự định.\n2. **Không lưu lại object ID trả về giữa các bước**: Mỗi bước sau cần ID của object từ bước trước.\n3. **Bỏ qua `-p` khi cần nối tiếp lịch sử**: Lab này cố ý tạo root commit trong repo rỗng nên không có parent; khi tạo commit sau, truyền `-p <parent-id>`.\n4. **Chạy `git update-ref refs/heads/main <object-id-moi>` trong repo dự án**: Lệnh có thể di chuyển nhánh main và làm thay đổi lịch sử đang làm việc. Chỉ chạy trong repository dùng riêng cho lab.\n\n---\n\n## 🧪 Lab thực hành\nLàm toàn bộ lab trong repository mới, không phải repository chứa khóa học hoặc dự án cá nhân. Khối lệnh phía trên tạo một root commit trên ref `capstone`.\n\n1. **Bước 1**: Chạy các lệnh tạo thư mục, `git init`, cấu hình danh tính local và trỏ HEAD tới `refs/heads/capstone` như khối lệnh trên.\n2. **Bước 2**: Tạo `manual.txt`, chạy `git hash-object -w manual.txt` và lưu object ID.\n3. **Bước 3**: Dùng `git update-index --add --cacheinfo 100644 <blob-id> manual.txt`; kiểm tra mục bằng `git ls-files --stage`.\n4. **Bước 4**: Chạy `git write-tree`; kiểm tra tree bằng `git cat-file -p <tree-id>`.\n5. **Bước 5**: Chạy `git commit-tree <tree-id> -m \"feat: manual capstone commit\"` để tạo root commit.\n6. **Bước 6**: Cập nhật ref mới bằng `git update-ref refs/heads/capstone <commit-id>`, rồi kiểm tra `git log -1` và `git status --short`.\n\n---\n\n## 💡 Hint & mẹo\n> Luồng ở bài này là Blob -> Index -> Tree -> Commit -> Ref. HEAD là symbolic ref trỏ tới nhánh đang chọn; nó không phải bước tạo object.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- `git log -1` hiển thị root commit mới trên nhánh `capstone`.\n- `git cat-file -p HEAD` cho thấy commit trỏ tới tree; `git status --short` không báo nội dung `manual.txt` là chưa stage.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài kiểm tra danh dự tổng kết đỉnh cao của Level 8 Git Internals trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nRepo lab hiện chỉ có một root commit. Tạo commit thứ hai trên cùng tree hoặc tree mới bằng `git commit-tree <tree-id> -p <parent-id>`, rồi cập nhật ref bằng old-value guard để bảo đảm ref chưa bị người khác di chuyển: `git update-ref refs/heads/capstone <new-id> <old-id>`. Quan sát parent mới bằng `git cat-file -p <new-id>`.\n\n---\n\n## 📝 Tổng kết\n- Có thể giải thích Blob, Index, Tree, Commit và Ref trong quy trình tạo commit.\n- Có thể kiểm tra object bằng `git cat-file` và xác nhận ref bằng `git log`.\n- Bài lab dùng root commit trong repo tạm; tạo commit nối lịch sử cần khai báo parent.\n",
  "quiz": {
    "id": "quiz-08-git-internals-20-build-commit-manually-capstone",
    "title": "Trắc nghiệm: Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands",
    "questions": [
      {
        "id": "q1",
        "question": "Lệnh Plumbing nào dùng để đưa một đối tượng Blob vào Staging Area (tệp .git/index) mà không dùng `git add`?",
        "type": "single",
        "options": [
          {
            "text": "git update-index --add --cacheinfo 100644 <hash> <path>",
            "correct": true
          },
          {
            "text": "git stage-blob <hash>",
            "correct": false
          },
          {
            "text": "git put-index <hash>",
            "correct": false
          },
          {
            "text": "git insert-cache <hash>",
            "correct": false
          }
        ],
        "explanation": "`git update-index --add --cacheinfo` cho phép bạn đăng ký trực tiếp một Blob đã băm vào Staging Area mà không cần đọc lại từ Working Directory."
      },
      {
        "id": "q2",
        "question": "Sau khi đã đưa các tệp vào Index, lệnh Plumbing nào dùng để đóng gói cấu trúc thư mục thành đối tượng Tree?",
        "type": "single",
        "options": [
          {
            "text": "git write-tree",
            "correct": true
          },
          {
            "text": "git build-tree",
            "correct": false
          },
          {
            "text": "git make-tree",
            "correct": false
          },
          {
            "text": "git save-tree",
            "correct": false
          }
        ],
        "explanation": "`git write-tree` đọc nội dung hiện tại của tệp `.git/index` và ghi ra đối tượng Tree tương ứng trong Object Store."
      },
      {
        "id": "q3",
        "question": "Lệnh Plumbing nào nhận vào mã băm của đối tượng Tree và tạo ra đối tượng Commit?",
        "type": "single",
        "options": [
          {
            "text": "git commit-tree",
            "correct": true
          },
          {
            "text": "git create-commit",
            "correct": false
          },
          {
            "text": "git make-commit",
            "correct": false
          },
          {
            "text": "git hash-commit",
            "correct": false
          }
        ],
        "explanation": "`git commit-tree` là lệnh bậc thấp tạo ra đối tượng Commit từ một Tree và danh sách các commit cha."
      },
      {
        "id": "q4",
        "question": "Bước cuối cùng để một commit mới hiển thị trên nhánh `main` khi dùng lệnh plumbing là gì?",
        "type": "single",
        "options": [
          {
            "text": "Cập nhật con trỏ nhánh bằng lệnh `git update-ref refs/heads/capstone <commit-hash>`",
            "correct": true
          },
          {
            "text": "Khởi động lại máy tính",
            "correct": false
          },
          {
            "text": "Xóa tệp .git/index",
            "correct": false
          },
          {
            "text": "Chạy lệnh git pull",
            "correct": false
          }
        ],
        "explanation": "Nếu không cập nhật con trỏ nhánh bằng `git update-ref`, commit mới sẽ là commit mồ côi không có nhánh nào trỏ tới."
      },
      {
        "id": "q5",
        "question": "Trong `git update-index --cacheinfo 100644 <object-id> <path>`, điều gì biểu thị `100644`?",
        "type": "single",
        "options": [
          {
            "text": "Git file mode cho một tệp thường không thực thi",
            "correct": true
          },
          {
            "text": "Mã băm SHA-1 rút gọn của tệp",
            "correct": false
          },
          {
            "text": "Kích thước tối đa của tệp tính bằng byte",
            "correct": false
          },
          {
            "text": "Số dòng tối đa được phép lưu trong index",
            "correct": false
          }
        ],
        "explanation": "Trong Git index, mode `100644` biểu thị tệp thường không thực thi; `100755` là tệp thường có quyền thực thi."
      },
      {
        "id": "q6",
        "question": "Khi tạo commit thứ hai bằng `git commit-tree`, tùy chọn nào là bắt buộc để nối commit mới với commit trước đó trong đồ thị DAG?",
        "type": "single",
        "options": [
          {
            "text": "-p <parent-commit-hash>",
            "correct": true
          },
          {
            "text": "--link-to <hash>",
            "correct": false
          },
          {
            "text": "--after <hash>",
            "correct": false
          },
          {
            "text": "-c <previous-hash>",
            "correct": false
          }
        ],
        "explanation": "Cờ `-p` (viết tắt của parent) chỉ định commit cha mà commit mới sẽ trỏ về, đảm bảo tính liên tục của chuỗi lịch sử."
      }
    ]
  }
};
export default lesson;
