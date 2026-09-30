# Tài liệu Tích hợp Moodle & LTI 1.3 Advantage

## 1. Giới thiệu kiến trúc
Git Academy Vietnam được thiết kế theo kiến trúc ranh giới mở (boundary separation):
- Git Academy hoạt động độc lập như một Interactive Learning Platform.
- Khi cần tích hợp với hệ thống Quản lý Học tập của trường đại học (như Moodle, Canvas, Blackboard), hệ thống giao tiếp thông qua abstraction `LMSAdapter`.
- Không can thiệp hoặc sửa đổi core code của Moodle.

## 2. LMS Adapter Interface
Định nghĩa tại `platform/moodle/lms-adapter.ts`:
```typescript
export interface LMSAdapter {
  getUser(): Promise<LmsUser>;
  reportScore(lessonId: string, score: number, maxScore?: number): Promise<void>;
  reportCompletion(lessonId: string, status: 'completed' | 'incomplete'): Promise<void>;
  getLaunchContext(): Promise<LmsContext>;
}
```

## 3. Hỗ trợ SCORM 1.2 / 2004
- Export package: `pnpm export:scorm` tạo zip file tuân thủ chuẩn SCORM.
- Gói SCORM đóng gói file HTML/JS của Git Academy cùng wrapper SCORM API.
- Runtime Bridge tự động dò tìm `window.API` hoặc `window.API_1484_11` tại window cha và đẩy:
  - `cmi.core.score.raw`
  - `cmi.core.lesson_status` (`passed` / `incomplete`)

## 4. Kế hoạch Tích hợp LTI 1.3 (Learning Tools Interoperability)
Chuẩn LTI 1.3 (Advantage) sử dụng giao thức OAuth2 và JSON Web Token (JWT / asymmetric RSA signatures):

### Flow 1: OIDC Launch Flow
1. Giảng viên thêm Git Academy làm External Tool trên Moodle.
2. Sinh viên click vào link: Moodle gửi OIDC Login Initiation request tới `/api/lti/login_initiations`.
3. Git Academy chuyển hướng sinh viên về Moodle Authorization Endpoint kèm `state` và `nonce`.
4. Moodle chuyển hướng trở lại `/api/lti/launch` với `id_token` đã ký bởi Private Key của Moodle.
5. Git Academy xác thực `id_token` bằng JWKS Endpoint của Moodle (`/mod/lti/certs.php`).

### Flow 2: Assignment and Grade Services (AGS)
- Moodle cấp endpoint LineItem cho từng bài tập.
- Khi sinh viên hoàn thành Quiz hoặc Lab, Git Academy ký JWT client_credentials lấy access_token từ OAuth2 Token Endpoint của Moodle.
- Gửi điểm trực tiếp tới Moodle Gradebook:
  ```http
  POST {lineitem_url}/scores
  Authorization: Bearer {access_token}
  Content-Type: application/vnd.ims.lis.v1.score+json

  {
    "userId": "moodle_user_123",
    "scoreGiven": 95,
    "scoreMaximum": 100,
    "activityProgress": "Completed",
    "gradingProgress": "FullyGraded"
  }
  ```

### Flow 3: Names and Role Provisioning Services (NRPS)
- Tự động đồng bộ danh sách lớp (roster) từ Moodle vào `Classroom` của Git Academy mà không cần sinh viên nhập mã lớp thủ công.
