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
  "content": "# Capstone: Tự tay tạo Commit hoàn chỉnh chỉ bằng Plumbing Commands\n\n---\n\n## 🎯 Mục tiêu bài học\n- Chinh phục thử thách tối thượng của Level 8: Tự tay tạo ra một Commit hợp lệ mà TUYỆT ĐỐI KHÔNG dùng git add hay git commit.\n- Thực hiện quy trình 5 bước phẫu thuật: Băm Blob -> Cập nhật Index nhị phân -> Đóng gói Tree -> Tạo Commit object -> Cập nhật con trỏ nhánh.\n- Quan sát Git Graph và git log hiển thị commit do chính bạn lắp ráp thủ công từ các linh kiện cơ bản.\n\n---\n\n## 📖 Định nghĩa\n> Bài học Capstone này là đỉnh cao danh vọng chứng minh bạn đã hoàn toàn làm chủ bản chất nội tại của Git. Trong thử thách này, các lệnh Porcelain bậc cao (git add, git commit) bị cấm sử dụng hoàn toàn. Bạn sẽ đóng vai trò như chính bộ máy hạt nhân của Git: tự tay băm dữ liệu thô thành đối tượng Blob, tự tay ghi bản ghi vào tệp nhị phân Staging Area (.git/index), tự tay xuất cây thư mục Tree, tự tay kết nối thông tin tác giả để đúc nên đối tượng Commit, và cuối cùng cập nhật con trỏ tham chiếu nhánh.\n\n---\n\n## 🤔 Tại sao cần?\nMọi lập trình viên trên thế giới đều biết gõ git add rồi git commit theo thói quen hàng ngày. Nhưng chỉ có top 1% các kỹ sư tinh hoa mới có thể giải thích cặn kẽ và tự tay thực hiện toàn bộ quy trình đó bằng các lệnh nguyên tử bên dưới. Khi bạn tự tay tạo thành công một commit bằng các công cụ plumbing, bạn không còn nhìn Git như một người sử dụng công cụ thụ động nữa; bạn hiểu Git như chính Linus Torvalds khi ông viết nên những dòng mã đầu tiên.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng bạn là một nghệ nhân chế tác đồng hồ Thụy Sĩ cổ điển. Người bình thường chỉ mua chiếc đồng hồ đã đóng vỏ hoàn chỉnh về đeo lên tay và xem giờ (Porcelain). Nhưng bạn tự tay gắp từng chiếc bánh răng bánh lắc siêu nhỏ (Blob), tra dầu vào trục quay (Index), lắp ráp thành bộ máy cơ khí tinh vi (Tree), đóng vào khung vỏ thép không gỉ khắc số seri (Commit), và gắn kim đồng hồ chỉ đúng giờ hiện tại (Branch Ref).\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nQuy trình 5 bước tạo Commit hoàn chỉnh bằng Plumbing Commands:\n┌────────────────────────────────────────────────────────────────────────┐\n│ Bước 1: Tạo Blob từ tệp tin                                           │\n│ echo \"Hello\" > app.txt                                                 │\n│ BLOB_ID=$(git hash-object -w app.txt)                                  │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 2: Đưa vào Staging Area (Cập nhật tệp .git/index)                 │\n│ git update-index --add --cacheinfo 100644 $BLOB_ID app.txt            │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 3: Đóng gói cây thư mục thành đối tượng Tree                     │\n│ TREE_ID=$(git write-tree)                                              │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 4: Đúc đối tượng Commit từ Tree                                  │\n│ COMMIT_ID=$(echo \"feat: manual plumbing\" | git commit-tree $TREE_ID)   │\n├────────────────────────────────────────────────────────────────────────┤\n│ Bước 5: Cập nhật con trỏ nhánh                                         │\n│ git update-ref refs/heads/main $COMMIT_ID                              │\n└────────────────────────────────────────────────────────────────────────┘\n──► KẾT QUẢ: `git log` và Git Graph hiển thị commit mới mượt mà 100%!\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư trong kỳ thi tuyển chọn Kiến trúc sư trưởng tại một công ty công nghệ đa quốc gia nhận được đề bài: \"Tạo một commit hợp lệ trong Git mà không được sử dụng lệnh git add và git commit\". Không một giây chần chừ, kỹ sư tạo tệp `README.md`, băm tệp lấy mã Blob bằng `git hash-object -w README.md`. Tiếp đó, kỹ sư gọi `git update-index --add --cacheinfo 100644 <blob-hash> README.md` để lập chỉ mục. Kỹ sư chạy `git write-tree` thu được mã Tree, rồi chuyển tiếp qua `git commit-tree <tree-hash> -m \"feat: built with plumbing\"`. Cuối cùng, kỹ sư cập nhật con trỏ nhánh bằng `git update-ref refs/heads/main <commit-hash>`. Khi gõ lệnh `git log -1`, toàn bộ hội đồng giám khảo đứng dậy vỗ tay khi thấy commit mới hiển thị hoàn hảo trên đồ thị. Kỹ sư chính thức được tuyển dụng.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit hash-object -w <file>\ngit update-index --add --cacheinfo 100644 <hash> <path>\ngit write-tree\ngit commit-tree <tree-hash> -m \"Manual commit\"\ngit update-ref refs/heads/main <commit-hash>\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nNăm câu lệnh nguyên tử trên tạo thành một chuỗi lắp ráp hoàn chỉnh: hash-object tạo blob, update-index stage tệp vào index, write-tree tạo tree object, commit-tree tạo commit object, và update-ref di chuyển con trỏ nhánh tới commit mới một cách an toàn.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Quên cờ `--add` hoặc `--cacheinfo` trong lệnh `git update-index` khiến tệp không được nạp vào index đúng chuẩn.**: \n2. **Không lưu lại mã băm trả về của từng bước để truyền vào bước tiếp theo (Tree cần Blob, Commit cần Tree, Ref cần Commit).**: \n3. **Quên truyền commit cha `-p HEAD` nếu đây không phải là commit đầu tiên của dự án, làm lịch sử bị đứt gãy thành nhiều root.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Tạo một tệp tin `manual.txt` chứa nội dung \"Thực hành Plumbing Capstone\".\n2. Chạy lệnh `git hash-object -w manual.txt` để lấy mã băm Blob.\n3. Chạy `git update-index --add --cacheinfo 100644 <blob-hash> manual.txt`.\n4. Chạy `git write-tree` để sinh mã băm Tree.\n5. Chạy `git commit-tree <tree-hash> -m \"feat: manual capstone commit\"` để tạo commit.\n6. Chạy `git update-ref refs/heads/main <commit-hash>` và chiêm ngưỡng kết quả với `git log`.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Hãy ghi nhớ công thức dây chuyền: Blob -> Index -> Tree -> Commit -> Ref -> HEAD.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nLệnh git log hiển thị commit mới với đầy đủ tác giả, cây thư mục và thông điệp mà không dùng bất kỳ lệnh porcelain nào.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy hoàn thành bài kiểm tra danh dự tổng kết đỉnh cao của Level 8 Git Internals.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để tạo một Merge Commit thủ công hoàn toàn bằng lệnh plumbing git commit-tree kết hợp truyền hai cờ `-p parent1 -p parent2`?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Chinh phục trọn vẹn quy trình 5 bước xây dựng Commit thủ công từ các hạt nguyên tử cơ bản của Git.\n- Thấu hiểu bản chất cơ học thực sự bên dưới các lệnh bề mặt `git add` và `git commit`.\n- Chính thức tốt nghiệp toàn diện chương trình đào tạo Git Academy từ Zero đến Git Internals Master!\n",
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
