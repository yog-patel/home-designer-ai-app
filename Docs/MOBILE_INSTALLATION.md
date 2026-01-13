# Installing Home AI on Your Phone

There are two ways to install and use Home AI on your phone:

## Option 1: Progressive Web App (PWA) - Recommended for Testing

This is the easiest way to get started. Your web app can be installed directly from your browser.

### iOS (iPhone/iPad)

1. **Open Safari** and go to your app URL (e.g., `https://yourdomain.com` or `http://localhost:3001`)
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Enter a name (default: "Home AI") and tap **Add**
5. The app will appear on your home screen as an icon
6. Tap it to launch the app in fullscreen

### Android

1. **Open Chrome** (or your preferred browser) and go to your app URL
2. Tap the **menu** (three dots) in the top right
3. Tap **Install app** or **Add to Home screen**
4. Confirm by tapping **Install**
5. The app will appear on your home screen
6. Tap it to launch the app

### Desktop (Chrome/Edge)

1. Go to your app URL in Chrome or Edge
2. Click the **install** icon in the address bar (or menu → Install app)
3. Follow the prompts
4. The app will appear in your applications

---

## Option 2: Native App with Capacitor - For Production

If you want to distribute your app on iOS App Store or Google Play Store:

### Prerequisites

- **macOS** (for building iOS apps) OR **Windows/Mac/Linux** (for Android)
- **Xcode** (for iOS) - installed from Mac App Store
- **Android Studio** (for Android) - download from [developer.android.com](https://developer.android.com/studio)
- **Node.js** - already installed

### Build Steps

#### 1. **Build your web app first**
```bash
npm run build
```

#### 2. **Sync Capacitor with your build**
```bash
npx cap sync
```

#### 3. **For iOS (macOS only)**
```bash
npx cap open ios
```
This opens Xcode. Then:
- Select your development team
- Connect your iPhone
- Click the Play button to build and run on device
- Or archive for App Store submission

#### 4. **For Android**
```bash
npx cap open android
```
This opens Android Studio. Then:
- Wait for Gradle sync to complete
- Click the Play button to build and run on device
- Or build APK/AAB for Play Store submission

---

## Updating the App

### PWA Method
- Just deploy a new version to your web server
- The browser will automatically check for updates
- Users may need to refresh or clear cache to see latest version

### Native App Method (iOS/Android)
- Update your code and increment version in `package.json`
- Follow the build steps above
- Submit new build to App Store/Play Store
- Users will get update notification from their app store

---

## Current Status

Your app already has:
- ✅ `manifest.json` - PWA configuration
- ✅ Service Worker (`sw.js`) - Offline support & caching
- ✅ `capacitor.config.json` - Native app configuration
- ✅ PWA meta tags in `index.html`

### What you still need:

1. **App Icons** (for home screen)
   - Create 192x192 and 512x512 PNG icons
   - Save to `public/` folder as:
     - `icon-192x192.png`
     - `icon-512x512.png`
     - `icon-maskable-192x192.png` (for adaptive icons)
     - `icon-maskable-512x512.png`

2. **Deploy to a real domain** (for PWA)
   - PWA only works on HTTPS (not localhost)
   - Use services like Vercel, Netlify, or a VPS

3. **Sign app** (for App Store/Play Store)
   - iOS: Apple Developer account + certificates
   - Android: Create signing keystore

---

## Quick Start Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Test PWA locally (requires HTTPS)
npm install -g http-server
http-server -c-1 -p 8080 dist

# Sync Capacitor
npx cap sync

# Open iOS development
npx cap open ios

# Open Android development
npx cap open android
```

---

## Troubleshooting

### PWA not installing?
- Make sure you're on HTTPS (not localhost)
- Verify `manifest.json` is in `public/` folder
- Check browser console for errors

### App icons not showing?
- Place PNG files in `public/` folder
- Names must match exactly in `manifest.json`
- Try clearing app cache

### Capacitor sync fails?
- Run `npm install` first
- Make sure `capacitor.config.json` exists
- Try `npx cap sync --force`

---

## Recommended Next Steps

1. **For testing**: Use PWA on your phone today
2. **For production**: 
   - Get developer accounts (iOS/Android)
   - Create proper app icons
   - Deploy to HTTPS domain
   - Build and submit to stores

Questions? Check Capacitor docs: https://capacitorjs.com/docs
