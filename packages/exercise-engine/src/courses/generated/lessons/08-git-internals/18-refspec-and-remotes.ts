import { CourseLesson } from '@git-academy/shared';

export const lesson: CourseLesson = {
  "id": "18-refspec-and-remotes",
  "moduleId": "08-git-internals",
  "metadata": {
    "id": "18-refspec-and-remotes",
    "title": "Cấu trúc Refspec và đồng bộ Remote References",
    "level": "advanced",
    "duration": 30,
    "xp": 90,
    "prerequisites": [
      "17-packfiles-and-deltas"
    ],
    "objectives": [
      "Đọc refspec dạng `[+]<source>:<destination>` và giải thích chiều fetch/push.",
      "Hiểu rõ cơ chế ánh xạ không gian tên (Namespace Mapping) giữa nhánh máy chủ và nhánh theo dõi cục bộ.",
      "Thực hành fetch, push và xóa ref bằng một remote sandbox local."
    ],
    "completion": {
      "theoryViewed": true,
      "quiz": {
        "minimumScore": 75
      }
    },
    "keywords": [
      "refspec",
      "remote references",
      "fetch refspec",
      "push refspec",
      "git config"
    ],
    "commands": [
      "git config --get remote.origin.fetch",
      "git fetch origin",
      "git fetch origin +refs/heads/main:refs/remotes/origin/main"
    ]
  },
  "content": "# Cấu trúc Refspec và đồng bộ Remote References\n\n---\n\n## 🎯 Mục tiêu\n- Giải mã cú pháp Refspec bí ẩn trong tệp cấu hình `.git/config`: `+refs/heads/*:refs/remotes/origin/*`.\n- Hiểu ánh xạ giữa nhánh trên remote và remote-tracking ref trong repository cục bộ.\n- Đọc refspec cho `fetch` và `push`, nhận biết tác động của dấu `+`.\n- Thực hành tạo và xóa ref trên remote giả lập cục bộ, không cần tài khoản GitHub.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Refspec\n- **Nói dễ hiểu**: Quy tắc chỉ Git biết lấy ref nào làm nguồn và cập nhật ref nào làm đích.\n- **Ví dụ**: `+refs/heads/*:refs/remotes/origin/*` ánh xạ các nhánh trên remote vào refs theo dõi ở local khi fetch.\n- **Đừng nhầm**: Ý nghĩa nguồn/đích phụ thuộc chiều truyền dữ liệu; Pull Request refs là quy ước riêng của máy chủ như GitHub.\n\n### Remote-tracking ref\n- **Nói dễ hiểu**: Ref local ghi nhận vị trí nhánh remote lần gần nhất Git đồng bộ.\n- **Ví dụ**: `origin/main` thường đại diện cho remote-tracking ref `refs/remotes/origin/main`.\n- **Đừng nhầm**: Đây là namespace của ref, không bảo đảm luôn có một file vật lý riêng; thường bạn dùng nó để xem trạng thái remote, còn commit trên nhánh local của mình.\n\n### Dấu `+` trong refspec\n- **Nói dễ hiểu**: Cho phép ref đích được cập nhật dù giá trị mới không phải fast-forward so với giá trị cũ.\n- **Ví dụ**: Trong fetch mapping, dấu `+` cho phép remote-tracking ref local theo kịp khi nhánh remote bị viết lại.\n- **Đừng nhầm**: Với push, dấu `+` cho phép yêu cầu non-fast-forward nhưng máy chủ vẫn có thể từ chối theo chính sách; với fetch, đích là ref local.\n\n---\n\n## 📖 Định nghĩa\nRefspec có dạng tổng quát `[+]<source>:<destination>`. Source là ref Git đọc hoặc gửi; destination là ref được cập nhật ở phía nhận. Với `fetch`, dữ liệu đi từ remote về local; với `push`, dữ liệu đi từ local tới remote. Dấu `+` cho phép cập nhật destination dù thay đổi không phải fast-forward, nhưng chính sách phía nhận vẫn có thể từ chối push. Một số refspec chỉ định source mà bỏ destination, tùy lệnh chúng dùng để tải hoặc chọn ref.\n\n---\n\n## 🤔 Tại sao cần?\nRefspec giải thích vì sao `fetch` có thể lưu nhánh remote vào namespace `refs/remotes/`, hoặc vì sao một lệnh push có thể gửi `HEAD` dưới tên nhánh khác. Cấu hình của remote thường lưu fetch refspec; push còn chịu ảnh hưởng bởi lệnh cụ thể và cấu hình push. Đọc refspec giúp dự đoán ref nào sẽ đổi trước khi thực hiện thao tác.\n\n---\n\n## 🧠 Mental Model (Mô hình tư duy)\nHãy xem refspec như địa chỉ chuyển tiếp: phần trước dấu `:` là ref nguồn, phần sau là ref đích. Khi fetch, nhãn chỉ đường từ server về local; khi push, chiều truyền đổi lại. Trước khi chạy lệnh, hãy xác định rõ repository nào là nguồn và ref nào có thể bị cập nhật.\n\n---\n\n## 🖼 Sơ đồ\n```text\nGiải phẫu cấu trúc Refspec trong .git/config:\n+refs/heads/* : refs/remotes/origin/*\n│ └─────────┘   └───────────────────┘\n│      │                  │\n│   <Nguồn>            <Đích>\n│ (Nhánh trên remote) (Ref theo dõi ở local)\n│\n└─ Dấu \"+\": Cho phép cập nhật non-fast-forward khi fetch\n\nKhi bạn chạy `git fetch origin`:\nServer: refs/heads/feature ──► Ánh xạ thành ──► Cục bộ: refs/remotes/origin/feature\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nTrong một bản clone thông thường, fetch refspec thường ánh xạ `refs/heads/*` trên remote sang `refs/remotes/origin/*` ở local. Repo dùng `--single-branch`, mirror hoặc cấu hình riêng có thể khác. Người học có thể xem cấu hình của mình bằng `git config --get remote.origin.fetch`; không nên sửa `.git/config` chỉ để thử khi chưa hiểu ref đích sẽ đổi.\n\n---\n\n## 💻 Command\n```bash\n# Kiểm tra quy tắc refspec mặc định của remote origin\ngit config --get remote.origin.fetch\n\n# Yêu cầu fetch một nhánh và cập nhật remote-tracking ref local tương ứng\ngit fetch origin +refs/heads/feature-xyz:refs/remotes/origin/feature-xyz\n\n# Ví dụ cú pháp push nhánh local sang tên nhánh remote khác\ngit push origin HEAD:refs/heads/custom-branch\n\n# Ví dụ cú pháp xóa ref remote (chỉ thử trên remote sandbox)\ngit push origin :refs/heads/old-feature-branch\n```\n\n---\n\n## 🔍 Giải thích command\n- `git config --get remote.origin.fetch`: Đọc fetch refspec đã cấu hình cho `origin`; có thể không có kết quả nếu repo chưa cấu hình remote.\n- `HEAD:refs/heads/custom-branch`: Gửi commit mà `HEAD` chỉ tới vào ref tên `custom-branch` trên remote.\n- `:refs/heads/old-feature-branch`: Để trống source để yêu cầu xóa ref đích; hãy chỉ dùng với remote thử nghiệm.\n- `git fetch origin <source>:<dest>`: Yêu cầu fetch source ref và cập nhật đích local đã chỉ định.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên dấu hai chấm khi viết refspec**: Khiến Git hiểu nhầm tham chiếu nguồn và đích, gây ra thao tác ngoài ý muốn.\n2. **Vô tình xóa nhánh khi để trống phần nguồn**: `git push origin :refs/heads/branch` yêu cầu xóa ref ở remote; đích cần được kiểm tra cẩn thận.\n3. **Sửa sai cú pháp trong `.git/config`**: Dẫn tới việc lệnh `git fetch` báo lỗi cú pháp và không thể kết nối đồng bộ được nữa.\n\n---\n\n## 🧪 Lab\nKhông cần GitHub hay đăng nhập: dùng một bare repository local làm remote giả lập. Chạy lệnh theo thứ tự trong Bash hoặc Git Bash; chúng tạo và xóa ref chỉ trong thư mục thử nghiệm này.\n\n```bash\nmkdir git-refspec-lab\ncd git-refspec-lab\ngit init --bare remote.git\n\nmkdir learner\ncd learner\ngit init\ngit config user.name \"Git Learner\"\ngit config user.email \"learner@example.com\"\necho \"refspec lab\" > README.md\ngit add README.md\ngit commit -m \"initial commit\"\n\ngit remote add origin ../remote.git\ngit push origin HEAD:refs/heads/main\ngit fetch origin +refs/heads/main:refs/remotes/origin/main\ngit show-ref refs/remotes/origin/main\n\ngit push origin HEAD:refs/heads/test-refspec\ngit ls-remote origin refs/heads/test-refspec\ngit push origin :refs/heads/test-refspec\ngit ls-remote origin refs/heads/test-refspec\n```\n\n1. **Bước 1**: Tạo remote local và repository `learner` theo lệnh trên.\n2. **Bước 2**: Quan sát ref mà fetch cập nhật bằng `git show-ref refs/remotes/origin/main`.\n3. **Bước 3**: Đối chiếu ref test qua `git ls-remote` trước và sau lệnh xóa. Sau khi xóa, lệnh cuối không in ref đó.\n\nChỉ làm lệnh xóa với remote local vừa tạo trong bài này.\n\n---\n\n## 💡 Hint\n> Dấu `:` không có source là cú pháp xóa ref khi push. Kiểm tra tên remote và ref đích trước khi chạy.\n\n---\n\n## ✅ Validation\n- `git show-ref refs/remotes/origin/main` hiển thị remote-tracking ref sau fetch.\n- `git ls-remote` cho thấy ref test xuất hiện sau push và biến mất sau khi xóa trên remote local.\n\n---\n\n## ❓ Quiz\nHãy kiểm tra mức độ am hiểu về cơ chế Refspec qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🔥 Challenge\nLàm thế nào để cấu hình Refspec trong `.git/config` nhằm tự động tải về toàn bộ các Pull Request từ GitHub về máy cục bộ để kiểm tra (ví dụ: `refs/pull/*/head:refs/remotes/origin/pr/*`)?\n\n---\n\n## 📚 Tổng kết\n- Refspec quy định quy tắc ánh xạ tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa.\n- Cú pháp chuẩn: `[+]<source-ref>:<destination-ref>`.\n- Được lưu trữ trong `.git/config` dưới mục `[remote \"origin\"]` và điều khiển hành vi của `fetch` và `push`.\n- Hãy xác định source, destination, chiều đồng bộ và tác động của `+` trước khi chạy refspec.\n",
  "quiz": {
    "id": "quiz-08-git-internals-18-refspec-and-remotes",
    "title": "Trắc nghiệm: Cấu trúc Refspec và đồng bộ Remote References",
    "questions": [
      {
        "id": "q1",
        "question": "Dấu cộng `+` ở đầu chuỗi Refspec (ví dụ: `+refs/heads/*:refs/remotes/origin/*`) có ý nghĩa gì?",
        "type": "single",
        "options": [
          {
            "text": "Cho phép cập nhật tham chiếu đích kể cả khi thao tác không phải là fast-forward (force update)",
            "correct": true
          },
          {
            "text": "Chỉ định kho lưu trữ có tính phí",
            "correct": false
          },
          {
            "text": "Yêu cầu mã hóa tệp tin bằng mật khẩu",
            "correct": false
          },
          {
            "text": "Cộng thêm 1 commit vào lịch sử",
            "correct": false
          }
        ],
        "explanation": "Dấu `+` cho phép ref đích cập nhật non-fast-forward; với push, máy chủ vẫn có thể từ chối theo chính sách của họ."
      },
      {
        "id": "q2",
        "question": "Cú pháp lệnh `git push origin :old-branch` (để trống phần nguồn trước dấu hai chấm) có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Yêu cầu xóa ref `old-branch` trên remote",
            "correct": true
          },
          {
            "text": "Đổi tên nhánh thành rỗng",
            "correct": false
          },
          {
            "text": "Tạo một nhánh mới không có commit",
            "correct": false
          },
          {
            "text": "Báo lỗi cú pháp",
            "correct": false
          }
        ],
        "explanation": "Refspec push có source rỗng yêu cầu remote xóa ref đích; hãy xác nhận remote và tên ref trước khi chạy vì thao tác này có thể làm mất nhánh chia sẻ."
      },
      {
        "id": "q3",
        "question": "Refspec fetch thường gặp trong một bản clone thông thường là gì?",
        "type": "single",
        "options": [
          {
            "text": "+refs/heads/*:refs/remotes/origin/*",
            "correct": true
          },
          {
            "text": "refs/all:refs/all",
            "correct": false
          },
          {
            "text": "master:main",
            "correct": false
          },
          {
            "text": "remote:local",
            "correct": false
          }
        ],
        "explanation": "Cấu hình thường ánh xạ các nhánh `refs/heads/*` của remote sang `refs/remotes/origin/*` ở local; clone một nhánh hoặc cấu hình riêng có thể khác."
      },
      {
        "id": "q4",
        "question": "Tại sao các nhánh từ xa (như `origin/main`) lại được đặt trong không gian tên `refs/remotes/` thay vì `refs/heads/`?",
        "type": "single",
        "options": [
          {
            "text": "Để tách ref theo dõi vị trí remote khỏi nhánh local mà bạn trực tiếp làm việc",
            "correct": true
          },
          {
            "text": "Do hạn chế về dung lượng ổ đĩa",
            "correct": false
          },
          {
            "text": "Để người khác không xem được mã nguồn của bạn",
            "correct": false
          },
          {
            "text": "Để máy tính tự động dịch sang tiếng Anh",
            "correct": false
          }
        ],
        "explanation": "Namespace riêng giúp phân biệt nhánh local `refs/heads/main` với ref theo dõi `refs/remotes/origin/main`; fetch cập nhật ref theo dõi."
      },
      {
        "id": "q5",
        "question": "Trong lệnh `git push origin main`, source ref và destination ref thường tương ứng với cặp nào?",
        "type": "single",
        "options": [
          {
            "text": "refs/heads/main:refs/heads/main",
            "correct": true
          },
          {
            "text": "refs/heads/main:refs/remotes/origin/main",
            "correct": false
          },
          {
            "text": "HEAD:refs/tags/main",
            "correct": false
          },
          {
            "text": "+refs/remotes/*:refs/heads/*",
            "correct": false
          }
        ],
        "explanation": "Với lệnh explicit `main`, Git gửi nhánh local `refs/heads/main` tới ref cùng tên trên remote, trừ khi cấu hình hoặc refspec khác thay đổi đích."
      },
      {
        "id": "q6",
        "question": "Làm thế nào để chỉ fetch duy nhất một nhánh `feature-login` mà không muốn kéo về tất cả các nhánh khác từ origin?",
        "type": "single",
        "options": [
          {
            "text": "git fetch origin +refs/heads/feature-login:refs/remotes/origin/feature-login",
            "correct": true
          },
          {
            "text": "git fetch origin --all --single",
            "correct": false
          },
          {
            "text": "git clone origin/feature-login",
            "correct": false
          },
          {
            "text": "git pull --only-one",
            "correct": false
          }
        ],
        "explanation": "Refspec nêu rõ source ref từ remote và đích local; dấu `+` cho phép đích cập nhật non-fast-forward nếu nhánh remote đã bị viết lại."
      }
    ]
  }
};
export default lesson;
