const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const crypto = require('crypto');

const mockModulesDir = path.join(__dirname, 'mock-modules');
const outputDir = path.join(__dirname, 'test-modules');

// Ensure directories exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Mock module structure
const modules = [
    {
        name: 'lms-module',
        version: '2.1.0',
        files: {
            'pages/lms/index.vue': `<template>
  <div>
    <h1>LMS Module - Learning Management System</h1>
    <p>Version 2.1.0</p>
  </div>
</template>`,
            'components/CourseCard.vue': `<template>
  <VCard>
    <VCardTitle>Course Card</VCardTitle>
    <VCardText>Sample course component</VCardText>
  </VCard>
</template>`,
            'README.md': '# LMS Module\n\nLearning Management System module for the application.',
        }
    },
    {
        name: 'nhms-module',
        version: '1.5.2',
        files: {
            'pages/nhms/index.vue': `<template>
  <div>
    <h1>NHMS Module - Hospital Management System</h1>
    <p>Version 1.5.2</p>
  </div>
</template>`,
            'components/PatientCard.vue': `<template>
  <VCard>
    <VCardTitle>Patient Card</VCardTitle>
    <VCardText>Sample patient component</VCardText>
  </VCard>
</template>`,
            'README.md': '# NHMS Module\n\nHospital Management System module.',
        }
    },
    {
        name: 'pms-module',
        version: '3.0.1',
        files: {
            'pages/pms/index.vue': `<template>
  <div>
    <h1>PMS Module - Project Management System</h1>
    <p>Version 3.0.1</p>
  </div>
</template>`,
            'components/ProjectCard.vue': `<template>
  <VCard>
    <VCardTitle>Project Card</VCardTitle>
    <VCardText>Sample project component</VCardText>
  </VCard>
</template>`,
            'README.md': '# PMS Module\n\nProject Management System module.',
        }
    },
    {
        name: 'base-ui-module',
        version: '1.2.0',
        files: {
            'pages/base-ui/extra.vue': `<template>
  <div>
    <h1>Extra Base UI Components</h1>
    <p>Version 1.2.0</p>
  </div>
</template>`,
            'components/ExtraButton.vue': `<template>
  <VBtn>Extra Button Component</VBtn>
</template>`,
            'README.md': '# Base UI Module\n\nAdditional UI components.',
        }
    }
];

console.log('Creating mock modules...\n');

const manifest = {
    version: '1.0.0',
    modules: {}
};

modules.forEach(module => {
    const moduleTempDir = path.join(mockModulesDir, module.name);
    const zipPath = path.join(outputDir, `${module.name}-${module.version}.zip`);

    // Create temp directory structure
    Object.keys(module.files).forEach(filePath => {
        const fullPath = path.join(moduleTempDir, filePath);
        const dir = path.dirname(fullPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(fullPath, module.files[filePath]);
    });

    // Create ZIP
    const zip = new AdmZip();
    zip.addLocalFolder(moduleTempDir);
    zip.writeZip(zipPath);

    // Calculate checksum
    const fileBuffer = fs.readFileSync(zipPath);
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    const checksum = hash.digest('hex');

    // Get file size
    const stats = fs.statSync(zipPath);

    console.log(`✓ Created ${module.name}-${module.version}.zip`);
    console.log(`  Size: ${stats.size} bytes`);
    console.log(`  Checksum: ${checksum.substring(0, 16)}...`);
    console.log();

    // Add to manifest
    manifest.modules[module.name] = {
        version: module.version,
        url: `file://${zipPath}`,
        size: stats.size,
        checksum: checksum
    };

    // Cleanup temp directory
    fs.rmSync(moduleTempDir, { recursive: true, force: true });
});

// Write manifest
const manifestPath = path.join(__dirname, 'test-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('✓ Created test-manifest.json\n');
console.log('Mock modules created successfully!');
console.log(`Output directory: ${outputDir}`);
console.log('\nYou can now test the progressive download feature.');
