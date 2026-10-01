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
      "Giải mã cú pháp Refspec bí ẩn trong tệp cấu hình .git/config: `+refs/heads/*:refs/remotes/origin/*`.",
      "Hiểu rõ cơ chế ánh xạ không gian tên (Namespace Mapping) giữa nhánh máy chủ và nhánh theo dõi cục bộ.",
      "Làm chủ quy tắc đồng bộ khi thực hiện git fetch và git push thông qua đặc tả Refspec tùy biến."
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
      "git push origin main:refs/heads/custom"
    ]
  },
  "content": "# Cấu trúc Refspec và đồng bộ Remote References\n\n---\n\n## 🎯 Mục tiêu\n- Giải mã cú pháp Refspec bí ẩn trong tệp cấu hình `.git/config`: `+refs/heads/*:refs/remotes/origin/*`.\n- Hiểu rõ cơ chế ánh xạ không gian tên (Namespace Mapping) giữa nhánh máy chủ và nhánh theo dõi cục bộ.\n- Làm chủ quy tắc đồng bộ khi thực hiện `git fetch` và `git push` thông qua đặc tả Refspec tùy biến.\n- Nắm vững cú pháp xóa nhánh và tải về Pull Request bằng Refspec.\n\n---\n\n## 🧩 Từ khóa hôm nay\n\n### Refspec Specification\n- **Nói dễ hiểu**: Chuỗi quy tắc định dạng quy chuẩn quy định cách thức Git ánh xạ và đồng bộ các tham chiếu giữa kho cục bộ và máy chủ từ xa.\n- **Ví dụ**: Dòng `+refs/heads/*:refs/remotes/origin/*` bên dưới mục `[remote \"origin\"]` trong file `.git/config`.\n- **Đừng nhầm**: Không chỉ áp dụng cho nhánh; refspec có thể dùng cho cả tag (`refs/tags/*`) và pull requests (`refs/pull/*`).\n\n### Remote Tracking Namespace (refs/remotes/)\n- **Nói dễ hiểu**: Thư mục cách ly dành riêng cho các nhánh theo dõi từ xa, giúp phân biệt rạch ròi với nhánh làm việc cục bộ `refs/heads/`.\n- **Ví dụ**: Nhánh `origin/main` được lưu vật lý tại `.git/refs/remotes/origin/main`.\n- **Đừng nhầm**: Bạn không thể commit trực tiếp lên nhánh trong `refs/remotes/`; chúng là nhánh chỉ đọc được cập nhật tự động khi fetch.\n\n### Force Push Flag in Refspec (+)\n- **Nói dễ hiểu**: Dấu cộng đứng ở đầu chuỗi Refspec biểu thị quyền cập nhật cưỡng chế mà không cần kiểm tra tính chất fast-forward.\n- **Ví dụ**: Chuỗi `+refs/heads/main:refs/heads/main` tương đương với cờ `--force` khi push.\n- **Đừng nhầm**: Nếu không có dấu `+`, Git sẽ từ chối cập nhật nếu commit trên remote không phải là tổ tiên trực tiếp của commit được gửi.\n\n---\n\n## 📖 Định nghĩa\nRefspec (viết tắt của Reference Specification - Đặc tả tham chiếu) là một chuỗi quy tắc định dạng quy chuẩn quy định cách thức Git ánh xạ và đồng bộ các tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa. Cú pháp chuẩn của một Refspec gồm bốn thành phần: `[+]<nguồn>:<đích>`, trong đó dấu cộng `+` tùy chọn biểu thị quyền ép buộc cập nhật không cần kiểm tra tính chất fast-forward, `<nguồn>` là mẫu tham chiếu trên kho gửi, và `<đích>` là vị trí tham chiếu đích trên kho nhận.\n\n---\n\n## 💡 Tại sao cần\nNhiều lập trình viên nghĩ rằng lệnh `git fetch origin` hay `git push origin main` hoạt động theo một quy ước ma thuật ngầm định nào đó. Thực chất, toàn bộ hành vi đó được điều khiển chính xác 100% bởi các dòng cấu hình Refspec được lưu trữ bên trong tệp `.git/config`. Thấu hiểu bản chất của Refspec cho phép bạn thực hiện những thao tác nâng cao ngoạn mục: tải về duy nhất một nhánh cụ thể mà không tải toàn bộ repo, hoặc đẩy một commit lên máy chủ dưới một tên nhánh hoàn toàn khác.\n\n---\n\n## 🧠 Mental Model\nHãy tưởng tượng hệ thống chuyển phát bưu phẩm quốc tế xuyên quốc gia. Bạn chuẩn bị gửi một kiện hàng tài liệu quan trọng từ Hà Nội sang Tokyo. Refspec đóng vai trò chính là tờ nhãn dán quy chuẩn hướng dẫn hải quan dán trên kiện hàng: \"Từ ngăn thư: `refs/heads/*` tại chi nhánh Hà Nội -> Chuyển vào ngăn lưu trữ theo dõi: `refs/remotes/origin/*` tại bưu cục Tokyo\". Nhờ quy tắc địa chỉ tường minh này, nhân viên bưu tá biết chính xác phải lấy thư từ ngăn nào của người gửi và cất vào đúng ngăn tương ứng của người nhận mà không bao giờ bị nhầm lẫn hay thất lạc dữ liệu.\n\n---\n\n## 📊 Sơ đồ minh họa\n```text\nGiải phẫu cấu trúc Refspec trong .git/config:\n+refs/heads/* : refs/remotes/origin/*\n│ └─────────┘   └───────────────────┘\n│      │                  │\n│   <Nguồn>            <Đích>\n│ (Nhánh trên máy chủ) (Nhánh theo dõi trên máy bạn)\n│\n└─ Dấu \"+\": Cho phép cập nhật non-fast-forward khi fetch\n\nKhi bạn chạy `git fetch origin`:\nServer: refs/heads/feature ──► Ánh xạ thành ──► Cục bộ: refs/remotes/origin/feature\n```\n\n---\n\n## 🏢 Ví dụ thực tế\nMột kỹ sư làm việc với một kho lưu trữ khổng lồ của công ty có hơn 10.000 nhánh từ xa. Mỗi khi gõ `git fetch`, máy tính của kỹ sư phải mất 5 phút để đồng bộ toàn bộ danh sách nhánh rác. Mở tệp `.git/config`, kỹ sư thấy dòng cấu hình mặc định: `fetch = +refs/heads/*:refs/remotes/origin/*`. Kỹ sư sửa lại dòng đó thành: `fetch = +refs/heads/main:refs/remotes/origin/main` và thêm một dòng `fetch = +refs/heads/dev/*:refs/remotes/origin/dev/*`. Kể từ đó, mỗi lần gõ `git fetch`, Git chỉ đồng bộ duy nhất nhánh main và các nhánh phát triển dev, thời gian đồng bộ giảm từ 5 phút xuống còn đúng 2 giây.\n\n---\n\n## 💻 Command & Cú pháp\n```bash\n# Kiểm tra quy tắc refspec mặc định của remote origin\ngit config --get remote.origin.fetch\n\n# Đẩy nhánh cục bộ lên remote với tên nhánh tùy biến\ngit push origin main:refs/heads/custom-branch\n\n# Xóa một nhánh trên remote bằng refspec nguồn rỗng\ngit push origin :old-feature-branch\n\n# Tải về duy nhất một nhánh cụ thể\ngit fetch origin feature-xyz:refs/remotes/origin/feature-xyz\n```\n\n---\n\n## 🔍 Giải thích command\n- `git config --get remote.origin.fetch`: Đọc chuỗi refspec dùng khi tải dữ liệu từ origin.\n- `main:refs/heads/custom-branch`: Chỉ định rõ nhánh nguồn là `main` và nhánh đích trên remote là `custom-branch`.\n- `:old-feature-branch`: Để trống phần nguồn trước dấu `:` để yêu cầu xóa tham chiếu trên remote.\n- `git fetch origin <source>:<dest>`: Chỉ fetch đúng một nhánh duy nhất mà không kéo về toàn bộ các nhánh khác.\n\n---\n\n## ⚠️ Sai lầm phổ biến\n1. **Quên dấu hai chấm khi viết refspec**: Khiến Git hiểu nhầm tham chiếu nguồn và đích, gây ra thao tác ngoài ý muốn.\n2. **Vô tình xóa nhánh khi để trống phần nguồn**: Cú pháp `git push origin :branch` sẽ xóa vĩnh viễn nhánh trên máy chủ.\n3. **Sửa sai cú pháp trong `.git/config`**: Dẫn tới việc lệnh `git fetch` báo lỗi cú pháp và không thể kết nối đồng bộ được nữa.\n\n---\n\n## 🧪 Lab thực hành\nBài học này là bài tự kiểm tra: bạn thao tác cấu hình theo hướng dẫn và đối chiếu theo các bước bên dưới.\n\n1. **Bước 1**: Mở terminal và xem nội dung quy tắc refspec của remote origin bằng lệnh `git config --get remote.origin.fetch`.\n2. **Bước 2**: Thực hiện lệnh đẩy nhánh với cú pháp refspec tường minh: `git push origin HEAD:refs/heads/test-refspec`.\n3. **Bước 3**: Kiểm tra danh sách nhánh trên remote để xác nhận nhánh mới đã xuất hiện đúng như ánh xạ.\n4. **Bước 4**: Xóa nhánh thử nghiệm đó bằng cú pháp refspec nguồn rỗng: `git push origin :test-refspec`.\n\n---\n\n## 💡 Hint & mẹo\n> Cú pháp xóa nhánh từ xa kinh điển bằng lệnh `git push origin :branch-name` thực chất là gửi một tham chiếu rỗng (empty source) vào tham chiếu đích trên máy chủ.\n\n---\n\n## ✅ Validation & Kết quả mong đợi\n- Lệnh `git config` hiển thị dòng `+refs/heads/*:refs/remotes/origin/*`.\n- Thao tác push với cú pháp refspec tường minh tạo thành công nhánh mới trên máy chủ từ xa.\n\n---\n\n## ❓ Quiz nhanh\nHãy kiểm tra mức độ am hiểu về cơ chế Refspec qua các câu hỏi trong phần trắc nghiệm bên dưới.\n\n---\n\n## 🚀 Thử thách nâng cao\nLàm thế nào để cấu hình Refspec trong `.git/config` nhằm tự động tải về toàn bộ các Pull Request từ GitHub về máy cục bộ để kiểm tra (ví dụ: `refs/pull/*/head:refs/remotes/origin/pr/*`)?\n\n---\n\n## 📝 Tổng kết\n- Refspec quy định quy tắc ánh xạ tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa.\n- Cú pháp chuẩn: `[+]<source-ref>:<destination-ref>`.\n- Được lưu trữ trong `.git/config` dưới mục `[remote \"origin\"]` và điều khiển hành vi của `fetch` và `push`.\n- Nắm vững Refspec giúp tối ưu hóa băng thông tải mạng và thực hiện các thao tác quản trị nhánh máy chủ linh hoạt.\n",
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
        "explanation": "Dấu `+` tùy chọn ở đầu refspec thông báo cho Git bỏ qua kiểm tra an toàn fast-forward khi cập nhật con trỏ tham chiếu."
      },
      {
        "id": "q2",
        "question": "Cú pháp lệnh `git push origin :old-branch` (để trống phần nguồn trước dấu hai chấm) có tác dụng gì?",
        "type": "single",
        "options": [
          {
            "text": "Xóa nhánh `old-branch` trên máy chủ từ xa",
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
        "explanation": "Đẩy một tham chiếu rỗng vào nhánh đích tương đương với hành động xóa bỏ hoàn toàn tham chiếu đó trên máy chủ từ xa."
      },
      {
        "id": "q3",
        "question": "Quy tắc Refspec mặc định khi bạn clone một repository từ GitHub về máy là gì?",
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
        "explanation": "Quy tắc mặc định ánh xạ toàn bộ các nhánh `refs/heads/*` trên server thành các nhánh tracking `refs/remotes/origin/*` trên máy cục bộ."
      },
      {
        "id": "q4",
        "question": "Tại sao các nhánh từ xa (như `origin/main`) lại được đặt trong không gian tên `refs/remotes/` thay vì `refs/heads/`?",
        "type": "single",
        "options": [
          {
            "text": "Để cách ly không gian tên, ngăn chặn việc các nhánh theo dõi từ xa ghi đè trực tiếp lên các nhánh làm việc cục bộ của bạn",
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
        "explanation": "Phân tách namespace giúp bạn có thể tự do chỉnh sửa nhánh `main` cục bộ mà không sợ bị xung đột trực tiếp với con trỏ theo dõi `origin/main`."
      },
      {
        "id": "q5",
        "question": "Khi thực hiện lệnh `git push origin main`, thực chất Git thực thi cú pháp Refspec ngầm định nào?",
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
        "explanation": "Lệnh push ngầm định đẩy nhánh cục bộ refs/heads/main lên nhánh cùng tên refs/heads/main trên server từ xa."
      },
      {
        "id": "q6",
        "question": "Làm thế nào để chỉ fetch duy nhất một nhánh `feature-login` mà không muốn kéo về tất cả các nhánh khác từ origin?",
        "type": "single",
        "options": [
          {
            "text": "git fetch origin feature-login:refs/remotes/origin/feature-login",
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
        "explanation": "Bằng cách chỉ định rõ ràng cặp refspec nguồn và đích cho nhánh cụ thể, Git sẽ chỉ đồng bộ duy nhất nhánh đó."
      }
    ]
  }
};
export default lesson;
