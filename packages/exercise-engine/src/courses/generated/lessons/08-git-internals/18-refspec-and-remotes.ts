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
  "content": "# Cấu trúc Refspec và đồng bộ Remote References\n\n---\n\n## 🎯 Mục tiêu bài học\n- Giải mã cú pháp Refspec bí ẩn trong tệp cấu hình .git/config: `+refs/heads/*:refs/remotes/origin/*`.\n- Hiểu rõ cơ chế ánh xạ không gian tên (Namespace Mapping) giữa nhánh máy chủ và nhánh theo dõi cục bộ.\n- Làm chủ quy tắc đồng bộ khi thực hiện git fetch và git push thông qua đặc tả Refspec tùy biến.\n\n---\n\n## 📖 Định nghĩa\n> Refspec (viết tắt của Reference Specification - Đặc tả tham chiếu) là một chuỗi quy tắc định dạng quy chuẩn quy định cách thức Git ánh xạ và đồng bộ các tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa. Cú pháp chuẩn của một Refspec gồm bốn thành phần: [+]<nguồn>:<đích>, trong đó dấu cộng + tùy chọn biểu thị quyền ép buộc cập nhật không cần kiểm tra tính chất fast-forward, <nguồn> là mẫu tham chiếu trên kho gửi, và <đích> là vị trí tham chiếu đích trên kho nhận.\n\n---\n\n## 🤔 Tại sao cần?\nNhiều lập trình viên nghĩ rằng lệnh git fetch origin hay git push origin main hoạt động theo một quy ước ma thuật ngầm định nào đó. Thực chất, toàn bộ hành vi đó được điều khiển chính xác 100% bởi các dòng cấu hình Refspec được lưu trữ bên trong tệp .git/config. Thấu hiểu bản chất của Refspec cho phép bạn thực hiện những thao tác nâng cao ngoạn mục: tải về duy nhất một nhánh cụ thể mà không tải toàn bộ repo, hoặc đẩy một commit lên máy chủ dưới một tên nhánh hoàn toàn khác.\n\n---\n\n## 🧠 Mental Model & Mô hình tư duy\nHãy tưởng tượng hệ thống chuyển phát bưu phẩm quốc tế xuyên quốc gia. Bạn chuẩn bị gửi một kiện hàng tài liệu quan trọng từ Hà Nội sang Tokyo. Refspec đóng vai trò chính là tờ nhãn dán quy chuẩn hướng dẫn hải quan dán trên kiện hàng: \"Từ ngăn thư: refs/heads/* tại chi nhánh Hà Nội -> Chuyển vào ngăn lưu trữ theo dõi: refs/remotes/origin/* tại bưu cục Tokyo\". Nhờ quy tắc địa chỉ tường minh này, nhân viên bưu tá biết chính xác phải lấy thư từ ngăn nào của người gửi và cất vào đúng ngăn tương ứng của người nhận mà không bao giờ bị nhầm lẫn hay thất lạc dữ liệu.\n\n---\n\n## 🖼️ Sơ đồ minh họa\n```text\nGiải phẫu cấu trúc Refspec trong .git/config:\n+refs/heads/* : refs/remotes/origin/*\n│ └─────────┘   └───────────────────┘\n│      │                  │\n│   <Nguồn>            <Đích>\n│ (Nhánh trên máy chủ) (Nhánh theo dõi trên máy bạn)\n│\n└─ Dấu \"+\": Cho phép cập nhật non-fast-forward khi fetch\n\nKhi bạn chạy `git fetch origin`:\nServer: refs/heads/feature ──► Ánh xạ thành ──► Cục bộ: refs/remotes/origin/feature\n```\n\n---\n\n## 🌎 Ví dụ thực tế\nMột kỹ sư làm việc với một kho lưu trữ khổng lồ của công ty có hơn 10.000 nhánh từ xa. Mỗi khi gõ `git fetch`, máy tính của kỹ sư phải mất 5 phút để đồng bộ toàn bộ danh sách nhánh rác. Mở tệp `.git/config`, kỹ sư thấy dòng cấu hình mặc định: `fetch = +refs/heads/*:refs/remotes/origin/*`. Kỹ sư sửa lại dòng đó thành: `fetch = +refs/heads/main:refs/remotes/origin/main` và thêm một dòng `fetch = +refs/heads/dev/*:refs/remotes/origin/dev/*`. Kể từ đó, mỗi lần gõ `git fetch`, Git chỉ đồng bộ duy nhất nhánh main và các nhánh phát triển dev, thời gian đồng bộ giảm từ 5 phút xuống còn đúng 2 giây.\n\n---\n\n## 💻 Command & Lệnh thao tác\n```bash\ngit config --get remote.origin.fetch\ngit fetch origin\ngit push origin main:refs/heads/custom\n```\n\n---\n\n## 🔍 Giải thích chi tiết lệnh\nLệnh git config kiểm tra quy tắc refspec mặc định đang áp dụng cho remote origin, trong khi lệnh git push minh họa sinh động việc sử dụng cú pháp refspec tường minh để đẩy nhánh main cục bộ lên một nhánh custom hoàn toàn mới trên máy chủ từ xa.\n\n---\n\n## ⚠️ Sai lầm phổ biến & Cách phòng tránh\n1. **Quên dấu hai chấm `**: ` khi viết refspec khiến Git hiểu nhầm tham chiếu nguồn và đích.\n2. **Sử dụng refspec trống ở vế nguồn (ví dụ**:  `git push origin :dead-branch`) mà không biết rằng đây là cú pháp để XÓA một nhánh trên remote.\n3. **Tự ý sửa đổi quy tắc refspec trong `.git/config` mà viết sai cú pháp khiến lệnh fetch bị tê liệt hoàn toàn.**: \n\n---\n\n## 🧪 Bài thực hành Lab (Hands-on)\n1. Xem nội dung quy tắc refspec của remote origin bằng lệnh `git config --get remote.origin.fetch`.\n2. Thực hiện lệnh đẩy nhánh với cú pháp refspec tường minh: `git push origin HEAD:refs/heads/test-refspec`.\n3. Kiểm tra danh sách nhánh trên remote để xác nhận nhánh mới đã xuất hiện đúng như ánh xạ.\n\n---\n\n## 💡 Gợi ý thực hiện (Hint)\n> Cú pháp xóa nhánh từ xa kinh điển bằng lệnh `git push origin :branch-name` thực chất là gửi một tham chiếu rỗng (empty source) vào tham chiếu đích trên máy chủ.\n\n---\n\n## ✅ Kiểm tra kết quả (Validation)\nGiải thích được cấu trúc 4 thành phần của một chuỗi Refspec tiêu chuẩn trong tệp cấu hình.\n\n---\n\n## ❓ Câu hỏi ôn tập (Quiz)\nHãy kiểm tra mức độ am hiểu về cơ chế Refspec qua các câu hỏi sau.\n\n---\n\n## 🔥 Thử thách nâng cao (Challenge)\nLàm thế nào để sử dụng Refspec nhằm tải về các Pull Request từ GitHub về máy cục bộ để kiểm tra (ví dụ: refs/pull/123/head)?\n\n---\n\n## 📚 Tổng kết kiến thức\n- Refspec quy định quy tắc ánh xạ tham chiếu giữa kho lưu trữ cục bộ và kho lưu trữ từ xa.\n- Cú pháp chuẩn: `[+]<source-ref>:<destination-ref>`.\n- Được lưu trữ trong `.git/config` dưới mục `[remote \"origin\"]` và điều khiển hành vi của `fetch` và `push`.\n",
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
