# Kiến trúc Cơ sở Dữ liệu & Migrations — Git Academy Vietnam (Sprint 6)

## 1. Tổng quan Kiến trúc

Trong Sprint 6, Git Academy Vietnam chuyển đổi toàn diện từ lưu trữ cục bộ phía client sang hệ quản trị cơ sở dữ liệu quan hệ **PostgreSQL 16**.

### Nguyên tắc Bất biến (Canonical Source Rule):
1. **Nội dung Khóa học (Curriculum)**: Tệp Markdown và metadata trong thư mục `courses/` vẫn là nguồn chân lý duy nhất (Single Source of Truth).
2. **Cơ sở Dữ liệu (Database)**: Chỉ lưu trữ danh tính người dùng (`users`), lớp học (`classes`), ghi danh (`enrollments`), bản ghi trạng thái hoàn thành tiến độ (`progress`), bảng điểm tổng hợp (`grades`), bài tập (`assignments`), bài nộp (`submissions`), và nhật ký kiểm toán (`audit_logs`).

---

## 2. Lược đồ Bảng (Relational Schema)

### 2.1. `users`
Lưu trữ thông tin tài khoản người dùng và vai trò phân quyền.
- `id` (VARCHAR(64), PK): Định danh duy nhất (UUID hoặc slug chuẩn).
- `email` (VARCHAR(255), UNIQUE, NOT NULL): Email định danh.
- `display_name` (VARCHAR(255), NOT NULL): Họ và tên hiển thị.
- `role` (VARCHAR(32), NOT NULL): `'student'`, `'teacher'`, hoặc `'admin'`.
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).
- `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

### 2.2. `classes`
Lưu trữ thông tin lớp học do giảng viên tạo.
- `id` (VARCHAR(64), PK): Mã định danh lớp học.
- `name` (VARCHAR(255), NOT NULL): Tên lớp học (VD: "Git & GitHub — CNTT K48").
- `code` (VARCHAR(32), UNIQUE, NOT NULL): Mã tham gia lớp (VD: "GIT-K48-A").
- `teacher_id` (VARCHAR(64), FK -> `users.id` ON DELETE CASCADE).
- `course_id` (VARCHAR(64), NOT NULL): Khóa học áp dụng (mặc định `'git-foundations'`).
- `start_date` (TIMESTAMP WITH TIME ZONE).
- `end_date` (TIMESTAMP WITH TIME ZONE).
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

### 2.3. `enrollments`
Liên kết sinh viên tham gia lớp học.
- `id` (VARCHAR(64), PK).
- `user_id` (VARCHAR(64), FK -> `users.id` ON DELETE CASCADE).
- `class_id` (VARCHAR(64), FK -> `classes.id` ON DELETE CASCADE).
- `status` (VARCHAR(32), DEFAULT `'active'`): `'active'`, `'completed'`, `'removed'`.
- `enrolled_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).
- *Ràng buộc duy nhất*: `UNIQUE(user_id, class_id)`.

### 2.4. `progress`
Lưu trữ trạng thái hoàn thành từng bài học của sinh viên.
- `id` (VARCHAR(64), PK).
- `user_id` (VARCHAR(64), FK -> `users.id` ON DELETE CASCADE).
- `course_id` (VARCHAR(64), NOT NULL).
- `lesson_id` (VARCHAR(128), NOT NULL): Mã bài học (VD: `01-version-control`).
- `completed` (BOOLEAN, DEFAULT FALSE).
- `quiz_score` (INTEGER, DEFAULT 0): Điểm quiz cao nhất (0–100).
- `xp_earned` (INTEGER, DEFAULT 0).
- `attempts` (INTEGER, DEFAULT 1).
- `completed_at` (TIMESTAMP WITH TIME ZONE).
- `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).
- *Ràng buộc duy nhất*: `UNIQUE(user_id, course_id, lesson_id)`.

### 2.5. `grade_policies`
Chính sách tính điểm trọng số cho từng lớp học.
- `id` (VARCHAR(64), PK).
- `class_id` (VARCHAR(64), UNIQUE, FK -> `classes.id` ON DELETE CASCADE).
- `quiz_weight` (DECIMAL(4,2), DEFAULT 0.25): Trọng số Quiz (25%).
- `labs_weight` (DECIMAL(4,2), DEFAULT 0.30): Trọng số Thực hành Lab (30%).
- `challenges_weight` (DECIMAL(4,2), DEFAULT 0.20): Trọng số Thử thách (20%).
- `assignments_weight` (DECIMAL(4,2), DEFAULT 0.25): Trọng số Bài tập lớn (25%).
- `pass_threshold` (INTEGER, DEFAULT 60): Điểm tối thiểu để đạt.

### 2.6. `assignments` & `submissions`
Hệ thống bài tập lớn theo lớp và bài nộp của sinh viên.
- `assignments`: `id`, `class_id`, `title`, `description`, `due_date`, `max_score`.
- `submissions`: `id`, `assignment_id`, `student_id`, `submission_url`, `content`, `score`, `feedback`, `status`, `submitted_at`, `graded_at`.

### 2.7. `audit_logs`
Bảo mật & giám sát hoạt động hệ thống.
- `id` (VARCHAR(64), PK).
- `user_id` (VARCHAR(64)).
- `action` (VARCHAR(64), NOT NULL): `CLASS_CREATED`, `STUDENT_ENROLLED`, `GRADE_OVERRIDDEN`, `PROGRESS_SYNCED`, v.v.
- `target_type` (VARCHAR(64)): `classroom`, `user`, `submission`, `grade`.
- `target_id` (VARCHAR(64)).
- `details` (JSONB): Chi tiết payload thao tác.
- `timestamp` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

---

## 3. Chiến lược Chỉ mục (Indexing Strategy)

Để tối ưu hóa truy vấn hiệu năng cao với độ trễ dưới 20ms:
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_classes_code ON classes(code);
CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_enrollments_student_class ON enrollments(user_id, class_id);
CREATE INDEX idx_progress_user_course ON progress(user_id, course_id);
CREATE INDEX idx_assignments_class ON assignments(class_id);
CREATE INDEX idx_submissions_asg_student ON submissions(assignment_id, student_id);
CREATE INDEX idx_audit_logs_user_timestamp ON audit_logs(user_id, timestamp DESC);
```

---

## 4. Quản lý Di chuyển (Migration Management)

File di chuyển ban đầu nằm tại:
`migrations/001_initial_lms_schema.sql`

Khi khởi động container PostgreSQL qua `docker-compose.yml`, thư mục `migrations/` được gắn vào `/docker-entrypoint-initdb.d/`, giúp schema được tự động khởi tạo ngay khi database rỗng mà không cần can thiệp thủ công.
