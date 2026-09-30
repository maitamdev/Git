# Định Dạng Kịch Bản Thực Hành (Scenario Format)

## 1. Cấu trúc file Scenario YAML

```yaml
id: first-commit
title: Tạo commit đầu tiên
description: Mô tả chi tiết mục tiêu của bài lab

initialState:
  repositoryInitialized: false
  branch: main
  files:
    - path: login.js
      content: "console.log('login');"
      status: untracked

goal:
  commits:
    minCount: 1
  latestCommit:
    messagePattern: "feat: .*"
  stagingArea:
    clean: true
  workingTree:
    requiredFiles:
      - path: login.js

allowedCommands:
  - git init
  - git status
  - git add
  - git commit
  - git log

hints:
  - Hãy kiểm tra git status trước.
  - Dùng git add để đưa file vào staging area.

success:
  message: Hoàn thành commit đầu tiên!
  xp: 100
```

## 2. Các thuộc tính trong `goal`

- `commits.count`: Số lượng commit chính xác.
- `commits.minCount`: Số lượng commit tối thiểu.
- `latestCommit.message`: So khớp chính xác nội dung commit message gần nhất.
- `latestCommit.messagePattern`: Biểu thức chính quy (Regex) kiểm tra commit message.
- `stagingArea.clean`: Yêu cầu staging area sạch sẽ sau commit (`true`).
- `stagingArea.stagedFiles`: Mảng đường dẫn file bắt buộc phải đang được staged.
- `workingTree.clean`: Yêu cầu thư mục làm việc không còn file sửa đổi chưa lưu.
- `branches.current`: Nhánh hiện tại sinh viên phải đang đứng (ví dụ: `main` hoặc `feature-auth`).
- `branches.exists`: Danh sách các nhánh bắt buộc phải tồn tại trong kho lưu trữ.
