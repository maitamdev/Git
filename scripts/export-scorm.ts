import fs from 'fs';
import path from 'path';

function generateScormManifest(courseId: string, courseTitle: string): string {
  return `<?xml version="1.0" standalone="no" ?>
<manifest identifier="GitAcademy_${courseId}" version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="GitAcademy_Org">
    <organization identifier="GitAcademy_Org">
      <title>${courseTitle}</title>
      <item identifier="item_1" identifierref="resource_1">
        <title>${courseTitle}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="resource_1" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>`;
}

function exportScorm(): void {
  console.log('📦 [Git Academy] Bắt đầu đóng gói SCORM 1.2 cho Moodle LMS...\n');
  const distDir = path.resolve(process.cwd(), 'dist-scorm');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const manifestXml = generateScormManifest('git-commit', 'Git Academy - Bài 05: Git Commit');
  fs.writeFileSync(path.join(distDir, 'imsmanifest.xml'), manifestXml, 'utf-8');

  console.log(`✓ Đã tạo imsmanifest.xml chuẩn SCORM 1.2 tại ${distDir}`);
  console.log('✅ Sẵn sàng tích hợp Moodle qua SCORM Package Activity!');
}

exportScorm();
