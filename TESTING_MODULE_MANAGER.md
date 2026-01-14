# Testing Module Manager

## Đã implement xong các tính năng:

### 1. **Module Manager UI** ✅

- Component: `vibe-app/src/components/ModuleManager.vue`
- Page: `vibe-app/src/pages/module-manager.vue`
- Hiển thị danh sách modules
- Progress bar khi download
- Status badges (Installed/Not Installed)

### 2. **Navigation** ✅

- Thêm link "Module Manager" vào sidebar navigation
- Badge "!" để thu hút attention

### 3. **Auto Notification** ✅

- Component: `vibe-app/src/components/ModuleNotification.vue`
- Floating Action Button (FAB) góc dưới phải
- Snackbar notification khi có module cần tải
- Badge counter hiển thị số lượng modules

### 4. **Backend Logic** ✅

- ModuleManager class: `src/modules/ModuleManager.ts`
- IPC handlers cho download, check updates
- SHA-256 checksum verification
- ZIP extraction với adm-zip

## Cách test:

### Bước 1: Chạy Vue dev server

```bash
cd vibe-app
npm run dev
```

### Bước 2: Chạy Electron (terminal mới)

```bash
npm run electron:dev
# hoặc
npm run dev:electron
```

### Bước 3: Xem UI

Khi app mở, bạn sẽ thấy:

1. **Notification tự động** (sau 2 giây):

   - Snackbar ở top màn hình
   - Thông báo: "4 modules ready to download"
   - Nút "Download Now" và "Later"

2. **Floating Action Button** (góc dưới phải):

   - Icon package với badge số "4"
   - Click vào để mở Module Manager

3. **Sidebar Navigation**:

   - Link "Module Manager" ở đầu menu
   - Badge màu đỏ "!"

4. **Module Manager Page** (`/module-manager`):
   - Danh sách 4 modules:
     - LMS Module (v2.1.0)
     - NHMS Module (v1.5.2)
     - PMS Module (v3.0.1)
     - Base UI Module (v1.2.0)
   - Mỗi module có:
     - Status chip (Not Installed)
     - Version number
     - Download button
     - Progress bar (khi đang tải)

## Test Download (sẽ fail vì chưa có server):

Khi click "Download" trên một module, sẽ thấy:

- Button chuyển thành "Downloading... 0%"
- Progress bar xuất hiện
- Error trong console (vì URL test không tồn tại)

## Production Setup:

Để production hoạt động, bạn cần:

1. **Setup CDN/Server** để host:

   - `manifest.json`
   - Các file `.zip` modules

2. **Update URL** trong `ModuleManager.ts`:

   ```typescript
   const manifestUrl = "https://your-server.com/api/modules/manifest.json";
   ```

3. **Package modules** thành ZIP với structure:

   ```
   lms-module-2.1.0.zip
   ├── pages/
   ├── views/
   ├── components/
   └── assets/
   ```

4. **Generate checksum**:
   ```bash
   shasum -a 256 lms-module-2.1.0.zip
   ```

## Screenshots bạn sẽ thấy:

### 1. Auto Notification

```
┌─────────────────────────────────────────┐
│ ℹ️ Additional Modules Available         │
│ 4 modules ready to download             │
│                        [Later] [Download]│
└─────────────────────────────────────────┘
```

### 2. Floating Button

```
                                    ┌────┐
                                    │ 📦4│
                                    └────┘
```

### 3. Module Manager Page

```
╔══════════════════════════════════════════╗
║          📦 Module Manager               ║
╠══════════════════════════════════════════╣
║                                          ║
║  ┌─────────────────┬─────────────────┐  ║
║  │ Lms Module      │ Nhms Module     │  ║
║  │ Version: 2.1.0  │ Version: 1.5.2  │  ║
║  │ ⚠️ Not Installed│ ⚠️ Not Installed│  ║
║  │ [Download]      │ [Download]      │  ║
║  └─────────────────┴─────────────────┘  ║
║  ┌─────────────────┬─────────────────┐  ║
║  │ Pms Module      │ Base Ui Module  │  ║
║  │ Version: 3.0.1  │ Version: 1.2.0  │  ║
║  │ ⚠️ Not Installed│ ⚠️ Not Installed│  ║
║  │ [Download]      │ [Download]      │  ║
║  └─────────────────┴─────────────────┘  ║
╚══════════════════════════════════════════╝
```

## Troubleshooting:

### Nếu không thấy notification:

- Check console DevTools
- Verify `window.electronAPI` exists
- Check `test-manifest.json` tồn tại

### Nếu lỗi TypeScript:

```bash
npx tsc
```

### Nếu không có data:

- Đảm bảo `test-manifest.json` trong root folder
- Check path trong `ModuleManager.ts`

## Next Steps:

1. ✅ Test UI và UX
2. 🔲 Setup real CDN/server
3. 🔲 Create real module packages
4. 🔲 Test download flow end-to-end
5. 🔲 Implement resume download
6. 🔲 Add retry logic
7. 🔲 Add module uninstall feature

token: glpat-j018yUoQmXhSM1BMpMC6z286MQp1OmptbXo0Cw.01.121kj9onw
