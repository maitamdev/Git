import { describe, it, expect } from 'vitest';
import { countWords, extractSection, PLACEHOLDERS } from '../../scripts/validate-content';
import { getShingles, jaccardSimilarity } from '../../scripts/audit-content';

describe('Content Quality Gate & Auditor Tests (Parts 1.1 - 1.4)', () => {
  describe('Word Count Functionality', () => {
    it('accurately counts words ignoring markdown formatting', () => {
      const md = `
# Tiêu đề bài học
Đây là đoạn văn **in đậm** và *in nghiêng* cùng với \`git commit\`.
\`\`\`bash
git status
git add .
\`\`\`
Kết thúc đoạn văn.
      `;
      const count = countWords(md);
      // Words: "Tiêu", "đề", "bài", "học", "Đây", "là", "đoạn", "văn", "in", "đậm", "và", "in", "nghiêng", "cùng", "với", "Kết", "thúc", "đoạn", "văn."
      expect(count).toBeGreaterThan(10);
      expect(count).toBeLessThan(30);
    });

    it('returns 0 for empty or whitespace text', () => {
      expect(countWords('')).toBe(0);
      expect(countWords('   \n\t  ')).toBe(0);
    });
  });

  describe('Section Extraction', () => {
    it('extracts section contents by heading regex', () => {
      const content = `
## 🎯 Mục tiêu
Học Git căn bản.

## 📖 Định nghĩa
Git là hệ thống quản lý phiên bản phân tán.

## 📚 Tổng kết
Bài học kết thúc tại đây.
      `;
      const def = extractSection(content, /định nghĩa/i);
      expect(def).toContain('Git là hệ thống quản lý phiên bản phân tán.');
      expect(def).not.toContain('Học Git căn bản.');
    });
  });

  describe('Placeholder Detector', () => {
    it('defines forbidden placeholders', () => {
      expect(PLACEHOLDERS).toContain('TODO');
      expect(PLACEHOLDERS).toContain('TBD');
      expect(PLACEHOLDERS).toContain('Coming soon');
      expect(PLACEHOLDERS).toContain('Lorem ipsum');
      expect(PLACEHOLDERS).toContain('Nội dung đang cập nhật');
    });
  });

  describe('Jaccard Shingle Duplicate Detector', () => {
    it('returns 1.0 for identical texts', () => {
      const text = 'Git là hệ thống quản lý phiên bản phân tán hiện đại và phổ biến nhất hiện nay trên thế giới.';
      const s1 = getShingles(text);
      const s2 = getShingles(text);
      expect(jaccardSimilarity(s1, s2)).toBe(1.0);
    });

    it('returns low similarity for distinct texts', () => {
      const textA = 'Git commit tạo ảnh chụp tức thời của thư mục làm việc và đưa vào kho lưu trữ cục bộ.';
      const textB = 'GitHub Actions cho phép tự động hóa quy trình kiểm thử và triển khai ứng dụng lên đám mây.';
      const sA = getShingles(textA);
      const sB = getShingles(textB);
      const sim = jaccardSimilarity(sA, sB);
      expect(sim).toBeLessThan(0.3);
    });

    it('detects high similarity when command is just swapped in template text', () => {
      const textA = 'Lệnh git fetch tải dữ liệu từ máy chủ từ xa về máy tính cá nhân nhưng không tự động gộp vào nhánh hiện tại.';
      const textB = 'Lệnh git fetch tải dữ liệu từ máy chủ từ xa về máy tính cá nhân nhưng không tự động gộp vào nhánh làm việc.';
      const sA = getShingles(textA);
      const sB = getShingles(textB);
      const sim = jaccardSimilarity(sA, sB);
      expect(sim).toBeGreaterThan(0.6);
    });
  });
});
