-- Git Academy Vietnam - Sprint 6 Production LMS Schema
-- Migration: 001_initial_lms_schema.sql
-- Up Migration

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    password_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. Classrooms Table
CREATE TABLE IF NOT EXISTS classes (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(64) NOT NULL UNIQUE,
    teacher_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(64) NOT NULL DEFAULT 'git-mastery',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_classes_code ON classes(code);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id);

-- 3. Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    class_id VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'removed')),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, class_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_class ON enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);

-- 4. Lesson Progress Table (Course Versioning Protected)
CREATE TABLE IF NOT EXISTS lesson_progress (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(128) NOT NULL,
    course_version VARCHAR(32) NOT NULL DEFAULT '2.0.0',
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    theory_viewed BOOLEAN DEFAULT FALSE NOT NULL,
    quiz_score INTEGER DEFAULT 0 NOT NULL,
    quiz_attempts INTEGER DEFAULT 0 NOT NULL,
    labs_completed TEXT DEFAULT '[]' NOT NULL, -- JSON array of lab ids
    xp INTEGER DEFAULT 0 NOT NULL,
    last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT uq_user_lesson_version UNIQUE (user_id, lesson_id, course_version)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson ON lesson_progress(lesson_id);

-- 5. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id VARCHAR(128) NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, achievement_id)
);

-- 6. Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
    id VARCHAR(64) PRIMARY KEY,
    class_id VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    due_at TIMESTAMP WITH TIME ZONE NOT NULL,
    points INTEGER DEFAULT 100 NOT NULL,
    required_lessons TEXT DEFAULT '[]' NOT NULL, -- JSON array
    required_labs TEXT DEFAULT '[]' NOT NULL,    -- JSON array
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_assignments_class ON assignments(class_id);

-- 7. Assignment Submissions Table
CREATE TABLE IF NOT EXISTS assignment_submissions (
    id VARCHAR(64) PRIMARY KEY,
    assignment_id VARCHAR(64) NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    url VARCHAR(512),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    score INTEGER CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
    feedback TEXT,
    graded_at TIMESTAMP WITH TIME ZONE,
    graded_by VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT uq_assignment_student UNIQUE (assignment_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON assignment_submissions(student_id);

-- 8. Grades Summary Table
CREATE TABLE IF NOT EXISTS grades (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    class_id VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    overall_score INTEGER NOT NULL DEFAULT 0,
    letter_grade VARCHAR(4) NOT NULL DEFAULT 'F',
    quiz_score INTEGER NOT NULL DEFAULT 0,
    labs_score INTEGER NOT NULL DEFAULT 0,
    challenges_score INTEGER NOT NULL DEFAULT 0,
    assignments_score INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT uq_student_class_grade UNIQUE (student_id, class_id)
);

-- 9. Activity Events Log (Append-Only)
CREATE TABLE IF NOT EXISTS activity_events (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    class_id VARCHAR(64) REFERENCES classes(id) ON DELETE SET NULL,
    event_type VARCHAR(64) NOT NULL,
    data_json TEXT NOT NULL DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_user ON activity_events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON activity_events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_time ON activity_events(timestamp);

-- 10. Audit Logs Table (Admin Governance)
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    actor_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(128) NOT NULL,
    target_type VARCHAR(64) NOT NULL,
    target_id VARCHAR(64) NOT NULL,
    details_json TEXT NOT NULL DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_time ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id);
