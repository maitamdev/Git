/**
 * Git Academy Vietnam — Pilot Accounts & Cohort Seeding Utility (Sprint 8)
 * Generates 1 Teacher, 10 Student Pilot Accounts with Bcrypt hashes, and 1 Pilot Classroom.
 * Usage: tsx scripts/seed-pilot.ts [--sql | --api <BASE_URL>]
 */

import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

export interface PilotUser {
  id: string;
  email: string;
  displayName: string;
  role: 'teacher' | 'student';
  plainPassword: string;
  passwordHash: string;
}

export function generatePilotDataset() {
  const teacher: PilotUser = {
    id: `teacher-pilot-${Date.now()}`,
    email: 'teacher.pilot@gitacademy.vn',
    displayName: 'Thầy Nguyễn Pilot (Giảng viên)',
    role: 'teacher',
    plainPassword: 'PilotTeacher2026!',
    passwordHash: bcrypt.hashSync('PilotTeacher2026!', 10),
  };

  const students: PilotUser[] = [];
  const vietnameseNames = [
    'Nguyễn Văn An',
    'Trần Thị Bình',
    'Lê Hoàng Cường',
    'Phạm Minh Đức',
    'Vũ Thị Hồng',
    'Đặng Quốc Hưng',
    'Bùi Thảo Linh',
    'Đỗ Hoàng Nam',
    'Hồ Ngọc Sơn',
    'Ngô Thị Thúy',
  ];

  for (let i = 1; i <= 10; i++) {
    const pad = i.toString().padStart(2, '0');
    const plain = 'PilotStudent2026!';
    students.push({
      id: `student-pilot-${pad}-${Date.now()}`,
      email: `student${pad}.pilot@gitacademy.vn`,
      displayName: `${vietnameseNames[i - 1]} (SV Thí điểm)`,
      role: 'student',
      plainPassword: plain,
      passwordHash: bcrypt.hashSync(plain, 10),
    });
  }

  const classroom = {
    id: `class-pilot-${Date.now()}`,
    name: 'Git & DevOps — Lớp Thí Điểm Pilot 2026',
    code: 'GIT-PILOT-2026',
    teacherId: teacher.id,
    courseId: 'git-foundations',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 90 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  };

  // Pre-enroll first 5 students, leave last 5 unenrolled to test class joining code
  const preEnrollments = students.slice(0, 5).map((s) => ({
    userId: s.id,
    classId: classroom.id,
    status: 'active',
    enrolledAt: new Date().toISOString(),
  }));

  return { teacher, students, classroom, preEnrollments };
}

function main() {
  const { teacher, students, classroom, preEnrollments } = generatePilotDataset();

  console.log('====================================================================');
  console.log('🎓 GIT ACADEMY VIETNAM — PILOT COHORT DATASET (SPRINT 8)');
  console.log('====================================================================\n');

  console.log('👩‍🏫 TÀI KHOẢN GIẢNG VIÊN THÍ ĐIỂM:');
  console.log(`   Email:        ${teacher.email}`);
  console.log(`   Mật khẩu:     ${teacher.plainPassword}`);
  console.log(`   Tên hiển thị: ${teacher.displayName}\n`);

  console.log('🏫 LỚP HỌC THÍ ĐIỂM (PILOT CLASS):');
  console.log(`   Tên lớp:      ${classroom.name}`);
  console.log(`   Mã tham gia:  ${classroom.code}`);
  console.log(`   Giảng viên:   ${teacher.displayName}\n`);

  console.log('🎓 DANH SÁCH 10 SINH VIÊN THÍ ĐIỂM:');
  console.log('STT | Email                       | Mật khẩu          | Trạng thái lớp ban đầu');
  console.log('----|-----------------------------|-------------------|-----------------------');
  students.forEach((s, idx) => {
    const isEnrolled = idx < 5;
    const status = isEnrolled ? 'Đã vào lớp sẵn' : 'Chưa vào (Test nhập mã GIT-PILOT-2026)';
    console.log(`${(idx + 1).toString().padStart(3, ' ')} | ${s.email.padEnd(27, ' ')} | ${s.plainPassword.padEnd(17, ' ')} | ${status}`);
  });

  console.log('\n--- SQL INSERT SCRIPT (Cho staging PostgreSQL) ---');
  console.log(`INSERT INTO users (id, email, display_name, role, password_hash) VALUES ('${teacher.id}', '${teacher.email}', '${teacher.displayName}', '${teacher.role}', '${teacher.passwordHash}') ON CONFLICT (email) DO NOTHING;`);

  students.forEach((s) => {
    console.log(`INSERT INTO users (id, email, display_name, role, password_hash) VALUES ('${s.id}', '${s.email}', '${s.displayName}', '${s.role}', '${s.passwordHash}') ON CONFLICT (email) DO NOTHING;`);
  });

  console.log(`INSERT INTO classes (id, name, code, teacher_id, course_id, start_date, end_date) VALUES ('${classroom.id}', '${classroom.name}', '${classroom.code}', '${classroom.teacherId}', '${classroom.courseId}', '${classroom.startDate}', '${classroom.endDate}') ON CONFLICT (code) DO NOTHING;`);

  preEnrollments.forEach((e) => {
    console.log(`INSERT INTO enrollments (user_id, class_id, status) VALUES ('${e.userId}', '${e.classId}', '${e.status}') ON CONFLICT (user_id, class_id) DO NOTHING;`);
  });

  console.log('\n✅ Dữ liệu thí điểm sẵn sàng.');
}

if (process.argv[1]?.endsWith('seed-pilot.ts')) {
  main();
}
