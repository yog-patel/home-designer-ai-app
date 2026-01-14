# 🚀 Quick Start Guide

## Get Your App Running in 5 Minutes

### Step 1: Add Supabase Credentials (1 min)

In `app/.env`:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

Get these from: Supabase Dashboard → Settings → API

### Step 2: Create Storage Buckets (2 min)

In Supabase Dashboard → Storage:

1. **Create `original-images` bucket**
   - Private bucket
   - 50MB file size limit

2. **Create `generated-images` bucket**
   - Public bucket (for CDN)
   - 50MB file size limit

### Step 3: Verify Edge Functions (1 min)

Check that these exist in `../supabase/functions/`:
- ✅ `check-usage/index.ts`
- ✅ `generate-design/index.ts`

Add Replicate API key to edge function env vars:
```
REPLICATE_API_KEY=r8_...
```

### Step 4: Start the App (1 min)

```bash
cd app
npm start
```

Then:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Or scan QR code with Expo Go

### Step 5: Test Complete Flow

1. Home screen → "Try It!"
2. Take/upload photo
3. Select room, style, palette
4. Watch AI generate design
5. Save to gallery
6. Check Gallery tab
7. View Settings tab

---

## 🎯 What Each Screen Does

| Screen | Action | Next |
|--------|--------|------|
| **Home** | View features, see free tries | Try It! |
| **Upload** | Take/select photo | Room Type |
| **Room** | Pick room type | Style |
| **Style** | Pick style or custom prompt | Palette |
| **Palette** | Pick colors | Generate |
| **Generate** | AI creates design | Save/Share |
| **Gallery** | View all designs | (View details) |
| **Settings** | Account & usage info | - |

---

## 📱 Test Without Real AI (Dev Mode)

To test without calling Replicate API:

In `config/api.ts`, replace `generateDesign()` with mock:

```typescript
export const generateDesign = async (...) => {
  // Mock response for testing
  return {
    generated_image: 'https://via.placeholder.com/400',
    design_id: 'mock-id-123'
  };
}
```

---

## 🔧 Common Issues & Fixes

### "Supabase URL not configured"
- Check `.env` file exists
- Verify URL format: `https://xxx.supabase.co`
- Restart: `npm start`

### "Failed to upload image"
- Verify buckets exist in Supabase
- Check bucket names match exactly
- Ensure API key has upload permission

### "Camera permission denied"
- Grant permission in device settings
- Restart app
- Try gallery instead

### "Design generation timeout"
- Check Replicate API key is set
- Check image URL is accessible
- Check Replicate quota hasn't been exceeded

---

## 📲 Deploy to Devices

### iOS Simulator
```bash
npm start
Press: i
```

### Android Emulator
```bash
npm start
Press: a
```

### Physical Device
```bash
npm start
# Scan QR code with Expo Go app
```

### Production Build
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

---

## 📊 Test User Data

After first run:
- **User ID:** Stored in AsyncStorage
- **Free Tries:** Starts at 3
- **Designs:** Saved to `designs` table
- **Usage:** Tracked in `usage` table

To reset:
- Settings → "Reset User Data"
- Or delete app and reinstall

---

## 🎨 Customization Tips

### Change Primary Color
Search `#E31C1C` in all screen files:
```typescript
// Change to your brand color
backgroundColor: '#Your-Color'
borderColor: '#Your-Color'
```

### Add More Styles
Edit `config/constants.ts`:
```typescript
{ id: 'your-style', name: 'Your Style', icon: '🎨' }
```

### Add More Palettes
Edit `config/constants.ts`:
```typescript
{
  id: 'your-palette',
  name: 'Your Palette',
  colors: ['#Color1', '#Color2', ...]
}
```

---

## 📚 Documentation Files

Read these in order:
1. `APP_ARCHITECTURE.md` - Complete architecture
2. `FILES_CREATED.md` - All files created
3. `MOBILE_APP_SETUP.md` - Detailed setup
4. `app/README.md` - App-specific docs

---

## ✅ Verification Checklist

Before launching:

- [ ] `.env` file has Supabase credentials
- [ ] Storage buckets created in Supabase
- [ ] Edge functions deployed
- [ ] Replicate API key set in edge functions
- [ ] App starts without errors
- [ ] Can take/upload photos
- [ ] Can select room, style, palette
- [ ] Design generation works
- [ ] Design saves to database
- [ ] Gallery shows designs
- [ ] Can reset user data
- [ ] Free tries counter works

---

## 🆘 Need Help?

**Check logs:**
```bash
npm start
# Look at terminal output for errors
```

**Check Supabase:**
- Supabase Dashboard → SQL Editor
- Verify tables: `usage`, `designs`
- Check storage buckets exist

**Check Edge Functions:**
- Supabase Dashboard → Functions
- View logs for errors
- Verify API keys are set

**Reset Everything:**
```bash
# Clear node_modules
rm -r node_modules package-lock.json

# Reinstall
npm install

# Clear Expo cache
npm start -c
```

---

## 🎉 You're Done!

Your complete mobile app is ready. Just add Supabase credentials and start testing!

**Happy building!** 🚀
