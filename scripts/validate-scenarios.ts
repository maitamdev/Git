import fs from 'fs';
import path from 'path';
import { BUILTIN_SCENARIOS } from '../packages/git-scenarios/src/index';

function validateScenarios(): void {
  console.log('🔍 [Git Academy] Bắt đầu kiểm tra cú pháp và logic của Scenarios...\n');

  let hasErrors = false;
  const scenarioIds = Object.keys(BUILTIN_SCENARIOS);
  console.log(`📋 Tổng số scenarios đã đăng ký: ${scenarioIds.length}`);

  for (const [id, scenario] of Object.entries(BUILTIN_SCENARIOS)) {
    if (!scenario.id || !scenario.title || !scenario.goal) {
      console.error(`❌ Scenario "${id}" thiếu id, title hoặc goal!`);
      hasErrors = true;
    }
    if (scenario.id !== id) {
      console.error(`❌ Scenario ID mismatch: key "${id}" vs scenario.id "${scenario.id}"`);
      hasErrors = true;
    }
  }

  // Check manifest references
  const manifestPath = path.resolve(process.cwd(), 'courses/courses-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    for (const mod of manifest.curriculum) {
      if (mod.status === 'coming_soon') continue;
      for (const lesson of mod.lessons || []) {
        for (const labId of lesson.labIds || []) {
          if (!BUILTIN_SCENARIOS[labId as keyof typeof BUILTIN_SCENARIOS]) {
            console.error(`❌ Lesson "${mod.id}/${lesson.id}" tham chiếu labId "${labId}" không tồn tại trong BUILTIN_SCENARIOS!`);
            hasErrors = true;
          }
        }
      }
    }
  }

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log(`\n✅ Toàn bộ ${scenarioIds.length} Scenarios và các tham chiếu labId đều hợp lệ 100%!`);
  }
}

validateScenarios();

