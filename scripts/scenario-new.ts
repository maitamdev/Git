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

export async function createNewScenario() {
  console.log('🧪 [Git Academy] Scenario Authoring CLI');
  console.log('Tạo scenario mới cho Git Simulator\n');

  const args = process.argv.slice(2);
  const scenarioId = args[0] || (await prompt('Scenario ID (e.g. resolve-conflict, clone-remote)', 'my-scenario'));
  const title = args[1] || (await prompt('Title (Tiêu đề thử thách)', 'Tiêu đề Scenario'));
  const description = args[2] || (await prompt('Description (Mô tả ngắn)', 'Mô tả mục tiêu kịch bản'));
  const xp = parseInt(args[3] || (await prompt('XP', '100')), 10);

  const scenarioContent = [
    `id: ${scenarioId}`,
    `title: "${title}"`,
    `description: "${description}"`,
    ``,
    `initialState:`,
    `  repositoryInitialized: true`,
    `  branch: main`,
    `  files:`,
    `    - path: index.js`,
    `      content: "// Khởi tạo kịch bản\\nconsole.log('Ready');"`,
    `      status: unmodified`,
    ``,
    `goal:`,
    `  commits:`,
    `    minCount: 1`,
    `  stagingArea:`,
    `    clean: true`,
    ``,
    `allowedCommands:`,
    `  - git status`,
    `  - git add`,
    `  - git commit`,
    `  - git branch`,
    `  - git switch`,
    `  - git log`,
    ``,
    `hints:`,
    `  - "Kiểm tra trạng thái với git status"`,
    `  - "Thực hiện thao tác và hoàn thành mục tiêu"`,
    ``,
    `success:`,
    `  message: "🎉 Chúc mừng! Bạn đã hoàn thành xuất sắc kịch bản ${title}!"`,
    `  xp: ${xp}`,
    ``,
  ].join('\n');

  const targetPath = path.resolve(process.cwd(), 'courses', '_template', `${scenarioId}.yml`);
  fs.writeFileSync(targetPath, scenarioContent, 'utf-8');

  console.log(`\n✅ Đã tạo thành công template scenario tại:`);
  console.log(`   ${targetPath}`);
}

if (process.argv[1] && process.argv[1].endsWith('scenario-new.ts')) {
  createNewScenario().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
