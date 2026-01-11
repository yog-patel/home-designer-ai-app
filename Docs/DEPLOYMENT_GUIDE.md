# Deploying to iOS & Android with Capacitor

This guide walks you through packaging the Home.AI app for iOS and Android app stores.

---

## Prerequisites

### For iOS Development
- macOS (Monterey or later)
- Xcode 14+
- CocoaPods: `sudo gem install cocoapods`
- Apple Developer Account ($99/year)

### For Android Development
- Android Studio (latest)
- JDK 11 or higher
- Android SDK (API Level 30+)
- Google Play Developer Account ($25 one-time)

---

## Step 1: Build the Web App

```bash
# Navigate to project root
cd ~/Desktop/Projects/HomeDesignerApp

# Build for production
npm run build

# Output will be in the 'dist' folder
```

---

## Step 2: Initialize Capacitor

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor project
npx cap init

# When prompted:
# - App name: Home.AI
# - App ID: com.homeai.app
# - Directory: dist (where the build output is)
```

---

## Step 3: Add Platforms

### Add iOS
```bash
npx cap add ios
```

### Add Android
```bash
npx cap add android
```

---

## Step 4: Configure App Icon & Splash

Update `capacitor.config.json`:

```json
{
  "appId": "com.homeai.app",
  "appName": "home.ai",
  "webDir": "dist",
  "plugins": {
    "Camera": {
      "permissions": ["camera", "photos"]
    },
    "Geolocation": {
      "permissions": ["location"]
    }
  }
}
```

### Generate Icons & Splash Screens
Use tools like:
- [AppIcon Generator](https://appicon.co/)
- [Capacitor Icon Generator](https://capacitorjs.com/docs/guides/splash-screens-and-icons)

Place them in:
- iOS: `ios/App/App/Assets.xcassets`
- Android: `android/app/src/main/res/`

---

## Step 5: Deploy to iOS

### Sync & Build
```bash
npx cap sync ios
npx cap open ios

# Xcode will open automatically
```

### In Xcode
1. Select "App" target
2. Go to Signing & Capabilities
3. Select your Team (Apple Developer Account)
4. Change Bundle ID to: `com.homeai.app`
5. Build for "Generic iOS Device" or iPhone Simulator
6. Product → Archive → Distribute App → App Store Connect

### Submit to App Store
- Use Xcode or Apple Transporter
- Fill in required metadata (description, screenshots, etc.)
- Wait for Apple review (typically 24-48 hours)

---

## Step 6: Deploy to Android

### Sync & Build
```bash
npx cap sync android
npx cap open android

# Android Studio will open automatically
```

### In Android Studio
1. Build → Generate Signed Bundle/APK
2. Create a keystore (keep safe!):
   ```
   Keystore path: ~/.android/homeai-key.jks
   Password: [secure password]
   Alias: homeai-key-alias
   ```
3. Select "Android App Bundle" (for Play Store)
4. Choose Release build type
5. Build the bundle

### Submit to Google Play
1. Open [Google Play Console](https://play.google.com/console)
2. Create new app
3. Upload the `.aab` (Android App Bundle)
4. Fill in metadata (screenshots, description, etc.)
5. Set pricing (free or paid)
6. Submit for review (typically 2-3 hours)

---

## Important: Permissions

Add required permissions to the platform-specific files:

### iOS (`ios/App/App/Info.plist`)
```xml
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos of your room</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photos to redesign your rooms</string>

<key>NSPhotoLibraryAddOnlyUsageDescription</key>
<string>We need to save your designed room photos</string>
```

### Android (`android/app/src/main/AndroidManifest.xml`)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

---

## Step 7: Update App for Each Release

When you make code changes:

```bash
# 1. Build the web app
npm run build

# 2. Sync changes to native platforms
npx cap sync

# 3. Update version in capacitor.config.json
# 4. Re-build and submit to stores
```

---

## Store Metadata Required

### App Store (iOS)
- **App Name:** Home.AI
- **Subtitle:** AI Interior Design
- **Description:** ~4000 characters describing features
- **Keywords:** interior, design, ai, home, decorator
- **Screenshots:** 5 iPhone + 5 iPad (minimum)
- **Preview Video:** Optional but recommended
- **Support URL:** https://homeai.com/support
- **Privacy Policy:** https://homeai.com/privacy
- **Rating:** Set content rating (age 4+)

### Google Play (Android)
- **App Name:** Home.AI
- **Short Description:** 80 characters
- **Full Description:** 4000 characters
- **Screenshots:** 2-8 phone screenshots
- **Feature Graphic:** 1024×500 px
- **Privacy Policy URL**
- **Support Email**
- **Content Rating Questionnaire**
- **Target Audience:** Mature/Adults

---

## Testing Before Submission

### iOS Testing
```bash
# Run on simulator
npx cap run ios

# Run on physical device (requires development provisioning)
```

### Android Testing
```bash
# Run on emulator
npx cap run android

# Run on physical device
npx cap run android --target device-id
```

---

## Troubleshooting

### iOS Issues
- **Pod dependency errors:** `cd ios/App && pod deintegrate && pod install`
- **Build failures:** Clean Xcode: Cmd+Shift+K
- **Signing errors:** Check Team ID and Bundle ID match

### Android Issues
- **Gradle sync fails:** File → Sync Now (or `./gradlew sync`)
- **Signing key issues:** Ensure keystore path is correct
- **Build failures:** Check Java/Android SDK versions

---

## App Store Optimization (ASO)

1. **Keyword Research:** Use tools like Mobile Action, App Annie
2. **A/B Test:** Different screenshots/descriptions
3. **Reviews:** Respond to user reviews promptly
4. **Updates:** Push regular updates to maintain visibility
5. **Ratings:** Encourage high ratings (5+ stars)

---

## Monitoring Post-Launch

- Track installs, crashes, and ratings in console
- Monitor user feedback and reviews
- Use analytics (Firebase, Mixpanel) for usage insights
- Push updates monthly with new features

---

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Google Play Developer Help](https://support.google.com/googleplay/android-developer)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

## Timeline

**iOS:**
- Development: 2-3 weeks
- Testing: 1 week
- Submission: 24-48 hours for review
- Total: ~4 weeks to live

**Android:**
- Development: 2-3 weeks
- Testing: 1 week
- Submission: 2-3 hours for review
- Total: ~3.5 weeks to live

---

## Cost Summary

| Item | Cost | Frequency |
|------|------|-----------|
| Apple Developer Account | $99 | Yearly |
| Google Play Developer Account | $25 | One-time |
| App Hosting (Firebase, AWS, etc.) | $0-20 | Monthly |
| **Total First Year** | **~$125** | - |
| **Subsequent Years** | **~$99** | Yearly |

---

Good luck launching! 🚀
