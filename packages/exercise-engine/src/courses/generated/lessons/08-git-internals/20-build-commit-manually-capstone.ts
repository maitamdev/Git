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
      "Chinh phục thử thách tối thượng của Level 8: Tự tay tạo ra một Commit hợp lệ mà TUYỆT ĐỐI KHÔNG dùng git add hay git commit.",
      "Thực hiện quy trình 5 bước phẫu thuật: Băm Blob -> Cập nhật Index nhị phân -> Đóng gói Tree -> Tạo Commit object -> Cập nhật con trỏ nhánh.",
      "Quan sát Git Graph và git log hiển thị commit do chính bạn lắp ráp thủ công từ các linh kiện cơ bản."
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
      "git update-ref refs/heads/main <commit-hash>"
    ]
  },
  "content": "# Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands\n\n---\n\n## 🎯 Mục tiêu\n- Chinh phục thử thách tối thượng của Level 8: Tự tay tạo ra một Commit hợp lệ mà TUYỆT ĐỐI KHÔNG dùng `git add` hay `git commit`.\n- Thực hiện quy trình 5 bước phẫu thuật: Băm Blob -> Cập nhật Index nhị phân -> Đóng gói Tree -> Tạo Commit object -> Cập nhật con trỏ nhánh.\n- Quan sát Git Graph và `git log` hiển thị commit do chính bạn lắp ráp thủ công từ các linh kiện cơ bản.\n- Hoàn thiện toàn diện bức tranh hiểu biết về Git Internals từ gốc rễ.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Plumbing Assembly Pipeline\n- **Nói dễ hiểu**: Chuỗi phối hợp 5 bước nguyên tử bên dưới lớp vỏ bọc Porcelain: Blob -> Index -> Tree -> Commit -> Reference.\n- **Ví dụ**: Dùng `git hash-object`, `git update-index`, `git write-tree`, `git commit-tree`, `git update-ref` để tạo commit.\n- **Đừng nhầm**: Không chỉ là bài tập lý thuyết; đây là cách các công cụ phát triển phần mềm như libgit2 hay IDE tự động tương tác với Git.\n\n### git update-index --cacheinfo\n- **Nói dễ hiểu**: Lệnh plumbing cho phép đăng ký trực tiếp một mã băm Blob đã có trong database vào Staging Area mà không cần đọc từ file hệ thống.\n- **Ví dụ**: `git update-index --add --cacheinfo 100644 <blob-sha> sample.txt`.\n- **Đừng nhầm**: Không cần file `sample.txt` phải tồn tại trong working directory; Git chỉ ghi ánh xạ vào `.git/index`.\n\n### git commit-tree Command\n- **Nói dễ hiểu**: Lệnh plumbing nhận mã băm của một đối tượng Tree và danh sách các commit cha để đúc ra một đối tượng Commit hoàn chỉnh.\n- **Ví dụ**: `echo \"feat: init\" | git commit-tree <tree-sha>` in ra mã băm của commit mới.\n- **Đừng nhầm**: Lệnh này chỉ tạo đối tượng commit trong `.git/objects/`, chưa di chuyển nhánh hay cập nhật con trỏ HEAD.\n\n---\n\n## 📖 Định nghĩa\nBài học Capstone này là đỉnh cao danh vọng chứng minh bạn đã hoàn toàn làm chủ bản chất nội tại của Git. Trong thử thách này, các lệnh Porcelain bậc cao (`git add`, `git commit`) bị cấm sử dụng hoàn toàn. Bạn sẽ đóng vai trò như chính bộ máy hạt nhân của Git: tự tay băm dữ liệu thô thành đối tượng Blob, tự tay ghi bản ghi vào tệp nhị phân Staging Area (`.git/index`), tự tay xuất cây thư mục Tree, tự tay kết nối thông tin tác giả để đúc nên đối tượng Commit, và cuối cùng cập nhật con trỏ tham chiếu nhánh.\n\n---\n\n## 💡 Tại sao cần\nMọi lập trình viên trên thế giới đều biết gõ `git add` rồi `git commit` theo thói quen hàng ngày. Nhưng chỉ có top 1% các kỹ sư tinh hoa mới có thể giải thích cặn kẽ và tự tay thực hiện toàn bộ quy trình đó bằng các lệnh nguyên tử bên dưới. Khi bạn tự tay tạo thành công một commit bằng các công cụ plumbing, bạn không còn nhìn Git như một người sử dụng công cụ thụ động nữa; bạn hiểu Git như chính Linus Torvalds khi ông viết nên những dòng mã đầu tiên.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng bạn là một nghệ nhân chế tác đồng hồ Thụy Sĩ cổ điển. Người bình thường chỉ mua chiếc đồng hồ đã đóng vỏ hoàn chỉnh về đeo lên tay và xem giờ (Porcelain). Nhưng bạn tự tay gắp từng chiếc bánh răng bánh lắc siêu nhỏ (Blob), tra dầu vào trục quay (Index), lắp ráp thành bộ máy cơ khí tinh vi (Tree), đóng vào khung vỏ thép không gỉ khắc số seri (Commit), và gắn kim đồng hồ chỉ đúng giờ hiện tại (Branch Ref).\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nQuy trình 5 bước tạo Commit hoàn chỉnh bằng Plumbing Commands:\n┌────────────────────────────────────────────────────────────────────────┐\n│ Bước 1: Tạo Blob từ tệp tin                                           │\n│ echo \"Hello\" > app.txt                                                 │\n│ BLOB_ID=$(git hash-object -w app.txt)                                  │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 2: Đưa vào Staging Area (Cập nhật tệp .git/index)                 │\n│ git update-index --add --cacheinfo 100644 $BLOB_ID app.txt            │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 3: Đóng gói cây thư mục thành đối tượng Tree                     │\n│ TREE_ID=$(git write-tree)                                              │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 4: Đúc đối tượng Commit từ Tree                                  │\n│ COMMIT_ID=$(echo \"feat: manual plumbing\" | git commit-tree $TREE_ID)   │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 5: Cập nhật con trỏ nhánh                                         │\n│ git update-ref refs/heads/main $COMMIT_ID                              │\n└────────────────────────────────────────────────────────────────────────┘\n──► KẾT QUẢ: `git log` và Git Graph hiển thị commit mới mượt mà 100%!\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư trong kỳ thi tuyển chọn Kiến trúc sư trưởng tại một công ty công nghệ đa quốc gia nhận được đề bài: \"Tạo một commit hợp lệ trong Git mà không được sử dụng lệnh git add và git commit\". Không một giây chần chừ, kỹ sư tạo tệp `README.md`, băm tệp lấy mã Blob bằng `git hash-object -w README.md`. Tiếp đó, kỹ sư gọi `git update-index --add --cacheinfo 100644 <blob-hash> README.md` để lập chỉ mục. Kỹ sư chạy `git write-tree` thu được mã Tree, rồi chuyển tiếp qua `git commit-tree <tree-hash> -m \"feat: built with plumbing\"`. Cuối cùng, kỹ sư cập nhật con trỏ nhánh bằng `git update-ref refs/heads/main <commit-hash>`. Khi gõ lệnh `git log -1`, toàn bộ hội đồng giám khảo đứng dậy vỗ tay khi thấy commit mới hiển thị hoàn hảo trên đồ thị. Kỹ sư chính thức được tuyển dụng.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Bước 1: Ghi Blob vào database\nBLOB_SHA=$(git hash-object -w file.txt)\n\n# Bước 2: Thêm entry vào Staging Index\ngit update-index --add --cacheinfo 100644 $BLOB_SHA file.txt\n\n# Bước 3: Xuất Tree object từ Index\nTREE_SHA=$(git write-tree)\n\n# Bước 4: Tạo Commit object trỏ tới Tree và parent\nCOMMIT_SHA=$(echo \"feat: built manually with plumbing\" | git commit-tree $TREE_SHA -p HEAD)\n\n# Bước 5: Di chuyển con trỏ nhánh tới commit mới\ngit update-ref refs/heads/main $COMMIT_SHA\n```\n\n---\n\n## 🔍 Giải thích command\n- `git hash-object -w`: Đóng gói dữ liệu tệp thành đối tượng nhị phân Blob trong `.git/objects/`.\n- `git update-index --add --cacheinfo`: Ghi bản ghi gồm file mode, hash và đường dẫn vào tệp `.git/index`.\n- `git write-tree`: Quét toàn bộ bảng index và ghi ra đối tượng Tree phân cấp.\n- `git commit-tree`: Tạo commit với thông điệp, timestamp và liên kết với commit cha qua cờ `-p`.\n- `git update-ref`: Ghi mã băm commit mới vào tệp `.git/refs/heads/main` một cách an toàn.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên cờ `--add` hoặc `--cacheinfo` trong `git update-index`**: Khiến tệp không được nạp vào index đúng chuẩn POSIX.\n2. **Không lưu lại mã băm trả về giữa các bước**: Mỗi bước sau đều cần mã SHA-1 của bước trước làm tham số đầu vào.\n3. **Quên truyền `-p HEAD` ở bước commit-tree**: Sẽ vô tình tạo ra một root commit mồ côi không có lịch sử nối tiếp với các commit trước.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Tạo một tệp tin `manual.txt` chứa nội dung \"Thực hành Plumbing Capstone\".\n2. **Bước 2**: Chạy lệnh `git hash-object -w manual.txt` để lấy mã băm Blob.\n3. **Bước 3**: Chạy `git update-index --add --cacheinfo 100644 <blob-hash> manual.txt`.\n4. **Bước 4**: Chạy `git write-tree` để sinh mã băm Tree.\n5. **Bước 5**: Chạy `git commit-tree <tree-hash> -p HEAD -m \"feat: manual capstone commit\"` để tạo commit.\n6. **Bước 6**: Chạy `git update-ref refs/heads/main <commit-hash>` và chiêm ngưỡng kết quả với `git log -1`.\n\n---\n\n## 💡 Hint & mẹo\n> Hãy ghi nhớ công thức dây chuyền chuẩn mực: Blob -> Index -> Tree -> Commit -> Ref -> HEAD. Đây là toàn bộ nguyên lý vận hành cốt lõi của mọi thao tác lưu vết trong Git.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git log -1` hiển thị commit mới nhất mang thông điệp \"feat: manual capstone commit\".\n- Lệnh `git status` báo working tree clean, không còn thay đổi tồn đọng nào.\n\n---\n\n## ❓ Quiz nhanh\nHãy hoàn thành bài kiểm tra danh dự tổng kết đỉnh cao của Level 8 Git Internals trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để tạo một Merge Commit thủ công hoàn toàn bằng lệnh plumbing `git commit-tree` kết hợp truyền hai cờ `-p parent1 -p parent2`?\n\n---\n\n## 📝 Tổng kết\n- Chinh phục trọn vẹn quy trình 5 bước xây dựng Commit thủ công từ các hạt nguyên tử cơ bản của Git.\n- Thấu hiểu bản chất cơ học thực sự bên dưới các lệnh bề mặt `git add` và `git commit`.\n- Làm chủ hoàn toàn 4 loại đối tượng (`blob`, `tree`, `commit`, `tag`) và cấu trúc con trỏ của Git.\n- Chính thức tốt nghiệp toàn diện chương trình đào tạo Git Academy từ Zero đến Git Internals Master!\n",
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
            "text": "Cập nhật con trỏ nhánh bằng lệnh `git update-ref refs/heads/main <commit-hash>`",
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
        "question": "Đối số `--cacheinfo 100644` trong lệnh `git update-index` đại diện cho điều gì?",
        "type": "single",
        "options": [
          {
            "text": "Chế độ quyền tệp tin (File Mode) chuẩn cho tệp văn bản thông thường không thực thi",
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
        "explanation": "100644 là file mode bát phân theo chuẩn POSIX đại diện cho regular non-executable file trong Git index."
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
