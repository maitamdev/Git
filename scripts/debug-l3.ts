import { LEVEL_3_LESSONS } from './authoring/level3-data';

for (const l of LEVEL_3_LESSONS) {
  for (const [k, v] of Object.entries(l)) {
    const s = JSON.stringify(v);
    if (s.includes('...')) {
      console.log(`[${l.id}] ${k} contains '...'`);
    }
  }
}
