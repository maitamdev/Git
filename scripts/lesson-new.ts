import fs from 'fs';
import path from 'path';
import readline from 'readline';

async function prompt(question: string, defaultVal: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} [${defaultVal}]: `, (ans) => {
      rl.close();
      resolve(ans.trim() || defaultVal);
    });
  });
}

export async function createNewLesson() {
  console.log('📝 [Git Academy] Lesson Authoring CLI');
  console.log('Tạo bài học mới theo chuẩn 15 mục\n');

  // Parse argv or prompt interactively
  const args = process.argv.slice(2);
  const moduleId = args[0] || (await prompt('Module ID (e.g. 01-foundations, 02-git-basics)', '01-foundations'));
  const lessonId = args[1] || (await prompt('Lesson ID (e.g. 01-version-control)', 'new-lesson'));
  const title = args[2] || (await prompt('Title (Tiêu đề bài học)', 'Tiêu đề bài học mới'));
  const level = args[3] || (await prompt('Level (beginner/intermediate/advanced)', 'beginner'));
  const duration = parseInt(args[4] || (await prompt('Duration (phút)', '25')), 10);
  const xp = parseInt(args[5] || (await prompt('XP', '75')), 10);
  const prereqStr = args[6] || (await prompt('Prerequisites (phân cách bằng dấu phẩy)', ''));
  const prerequisites = prereqStr ? prereqStr.split(',').map((s) => s.trim()) : [];

  const targetDir = path.resolve(process.cwd(), 'courses', moduleId, lessonId);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ Thư mục ${targetDir} đã tồn tại!`);
    process.exit(1);
  }

  fs.mkdirSync(path.join(targetDir, 'labs'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'assets'), { recursive: true });

  // 1. metadata.yml
  const metaContent = [
    `id: ${lessonId}`,
    `title: "${title}"`,
    `level: ${level}`,
    `duration: ${duration}`,
    `xp: ${xp}`,
    `prerequisites: [${prerequisites.map((p) => `"${p}"`).join(', ')}]`,
    `objectives:`,
    `  - "Nắm vững lý thuyết và mental model của ${title}"`,
    `  - "Thực hành thành thạo các câu lệnh liên quan"`,
    `  - "Giải quyết các lỗi thường gặp trong môi trường thực tế"`,
    ``,
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'metadata.yml'), metaContent, 'utf-8');

  // 2. lesson.md with all 15 sections
  const lessonMdContent = [
    `# ${title}`,
    ``,
    `---`,
    ``,
    `## 🎯 Mục tiêu`,
    `- Hiểu rõ khái niệm và nguyên lý hoạt động của ${title}.`,
    `- Nắm chắc thao tác lệnh và cờ tham số phổ biến.`,
    `- Tránh các lỗi sai thường gặp khi làm việc nhóm.`,
    ``,
    `---`,
    ``,
    `## 📖 Định nghĩa`,
    `> **${title}** là một khái niệm then chốt trong hệ sinh thái Git, giúp lập trình viên quản lý mã nguồn một cách có cấu trúc và đáng tin cậy.`,
    ``,
    `---`,
    ``,
    `## 🤔 Tại sao cần?`,
    `Khi làm việc với các dự án thực tế, nếu không áp dụng kỹ thuật này, bạn sẽ gặp rất nhiều khó khăn trong việc theo dõi lịch sử, cộng tác nhóm và cứu hộ code khi có sự cố.`,
    ``,
    `---`,
    ``,
    `## 🧠 Mental Model (Mô hình tư duy)`,
    `Hãy hình dung Git như một chuỗi các thước phim (snapshots) lưu giữ trạng thái toàn bộ dự án tại từng khoảnh khắc thời gian, cho phép tua lại hoặc rẽ nhánh bất cứ lúc nào.`,
    ``,
    `---`,
    ``,
    `## 🖼 Sơ đồ`,
    `\`\`\`text`,
    `Working Tree  ──(git add)──>  Staging Area  ──(git commit)──>  Repository (HEAD)`,
    `\`\`\``,
    ``,
    `---`,
    ``,
    `## 🌎 Ví dụ thực tế`,
    `Một nhóm phát triển website gồm 4 thành viên cùng phát triển các chức năng Đăng nhập, Giỏ hàng và Thanh toán mà không làm ghi đè mã nguồn của nhau.`,
    ``,
    `---`,
    ``,
    `## 💻 Command`,
    `\`\`\`bash`,
    `git status`,
    `git add .`,
    `git commit -m "feat: implement ${lessonId}"`,
    `\`\`\``,
    ``,
    `---`,
    ``,
    `## 🔍 Giải thích command`,
    `- \`git status\`: Kiểm tra trạng thái hiện tại của Working Tree và Staging Area.`,
    `- \`git add .\`: Đưa toàn bộ thay đổi vào Staging Area để chuẩn bị commit.`,
    `- \`git commit -m\`: Lưu snapshot với thông điệp mô tả thay đổi.`,
    ``,
    `---`,
    ``,
    `## ⚠️ Sai lầm phổ biến`,
    `1. Quên add file trước khi commit dẫn đến commit rỗng hoặc thiếu file.`,
    `2. Viết commit message không rõ ràng khiến đồng đội không hiểu mục đích thay đổi.`,
    ``,
    `---`,
    ``,
    `## 🧪 Lab`,
    `1. Mở terminal và kiểm tra trạng thái thư mục.`,
    `2. Thực hiện thay đổi cần thiết và đưa vào staging area.`,
    `3. Chạy lệnh commit và kiểm tra lại lịch sử log.`,
    ``,
    `---`,
    ``,
    `## 💡 Hint`,
    `- Sử dụng \`git status\` thường xuyên để nắm chắc trạng thái hiện tại trước mỗi thao tác.`,
    ``,
    `---`,
    ``,
    `## ✅ Validation`,
    `- Staging area sạch sẽ.`,
    `- Tối thiểu 1 commit mới được tạo với thông điệp chuẩn xác.`,
    ``,
    `---`,
    ``,
    `## ❓ Quiz`,
    `Kiểm tra mức độ hiểu bài thông qua bài trắc nghiệm nhanh 4 câu hỏi.`,
    ``,
    `---`,
    ``,
    `## 🔥 Challenge`,
    `Tự tạo thêm một nhánh phụ và thử nghiệm tái hiện thao tác tương tự mà không cần nhìn tài liệu gợi ý!`,
    ``,
    `---`,
    ``,
    `## 📚 Tổng kết`,
    `Bạn đã hoàn thành bài học về **${title}**. Hãy tiếp tục áp dụng vào các bài học tiếp theo để xây dựng thói quen chuyên nghiệp!`,
    ``,
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'lesson.md'), lessonMdContent, 'utf-8');

  // 3. quiz.yml
  const quizContent = [
    `id: quiz-${lessonId}`,
    `title: "Trắc nghiệm: ${title}"`,
    `questions:`,
    `  - id: q1`,
    `    question: "Ý nghĩa chính của ${title} là gì?"`,
    `    type: single`,
    `    options:`,
    `      - text: "Lưu trữ và quản lý phiên bản mã nguồn chính xác"`,
    `        correct: true`,
    `      - text: "Xóa toàn bộ lịch sử code cũ"`,
    `        correct: false`,
    `      - text: "Tắt tính năng theo dõi file"`,
    `        correct: false`,
    `    explanation: "Định nghĩa chuẩn xác đã được nêu rõ trong phần lý thuyết của bài học."`,
    ``,
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'quiz.yml'), quizContent, 'utf-8');

  // 4. labs/lab-01.yml
  const labContent = [
    `id: lab-${lessonId}`,
    `title: "Thực hành: ${title}"`,
    `description: "Thao tác trên terminal giả lập để hoàn thành mục tiêu bài học"`,
    `initialState:`,
    `  repositoryInitialized: true`,
    `  branch: main`,
    `  files:`,
    `    - path: index.js`,
    `      content: "// Khởi tạo dự án\\nconsole.log('Git Academy');"`,
    `      status: modified`,
    `goal:`,
    `  commits:`,
    `    minCount: 1`,
    `  stagingArea:`,
    `    clean: true`,
    `hints:`,
    `  - "Chạy git status để kiểm tra file index.js"`,
    `  - "Dùng git add index.js để đưa vào staging"`,
    `  - "Dùng git commit -m 'feat: update index.js' để hoàn tất"`,
    `success:`,
    `  message: "🎉 Xuất sắc! Bạn đã hoàn thành bài thực hành!"`,
    `  xp: ${xp}`,
    ``,
  ].join('\n');
  fs.writeFileSync(path.join(targetDir, 'labs', 'lab-01.yml'), labContent, 'utf-8');

  console.log(`\n✅ Đã tạo thành công bài học mới tại:`);
  console.log(`   ${targetDir}`);
  console.log(`   - metadata.yml`);
  console.log(`   - lesson.md (15/15 mục tiêu chuẩn)`);
  console.log(`   - quiz.yml`);
  console.log(`   - labs/lab-01.yml`);
  console.log(`   - assets/`);
}

if (process.argv[1] && process.argv[1].endsWith('lesson-new.ts')) {
  createNewLesson().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
