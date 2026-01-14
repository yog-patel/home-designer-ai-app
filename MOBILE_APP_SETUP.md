# 🏠 Home AI Mobile App - Setup Guide

## ✅ What's Been Created

A complete Expo React Native mobile application with the following structure:

### **Screens (8 total)**
1. **HomeScreen** - Landing page with features and usage tracking
2. **UploadPhotoScreen** - Photo selection (camera/gallery)
3. **RoomTypeScreen** - Choose room type
4. **SelectStyleScreen** - Choose design style or custom prompt
5. **SelectPaletteScreen** - Choose color palette
6. **GenerateDesignScreen** - AI generation and results display
7. **GalleryScreen** - View all saved designs
8. **SettingsScreen** - Account settings and app preferences

### **Navigation**
- Bottom tab navigation (Home, Gallery, Settings)
- Stack navigation for 4-step design flow
- Smooth transitions between screens

### **Features Implemented**
✅ Random device-based user ID generation  
✅ Image upload (camera & gallery)  
✅ 12 design styles + custom prompts  
✅ 9 color palettes  
✅ 12 room types  
✅ Free tier (3 tries) + premium status tracking  
✅ Design gallery with history  
✅ AsyncStorage for local data  
✅ Supabase integration  
✅ Progress indicators for 4-step flow  

## 🚀 Setup Instructions

### 1. **Install Dependencies** (Already Done)
```bash
cd app
npm install
```

### 2. **Set Up Environment Variables**
Create `.env` file in the `app` folder:
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. **Prepare Supabase Storage**

Create two storage buckets in Supabase:

**Bucket 1: `original-images`**
- For user-uploaded room photos
- Public access: No
- File size limit: 50MB

**Bucket 2: `generated-images`**
- For AI-generated redesigns
- Public access: Yes (for CDN serving)
- File size limit: 50MB

### 4. **Configure Edge Functions**

The app calls two edge functions. Make sure they're deployed:

- `check-usage` - Check remaining free tries
- `generate-design` - Generate design via Replicate

Both functions are in `../supabase/functions/`

### 5. **Add Replicate API Key**

In Supabase Edge Functions environment variables, add:
```
REPLICATE_API_KEY=r8_your_key_here
```

### 6. **Run the App**
```bash
npm start
```

Options:
- Press `i` → iOS simulator
- Press `a` → Android emulator  
- Press `w` → Web preview
- Scan QR → Expo Go on your phone

## 📱 Testing the App

### Test Flow:
1. **Home Screen** - See features, check "3 free tries"
2. **Tap "Try It!"** - Go to upload
3. **Upload Photo** - Take/select a room photo
4. **Select Room** - Pick "Living Room" (or any)
5. **Select Style** - Pick "Modern" (or custom)
6. **Select Palette** - Pick any palette
7. **Generate** - Will call your Replicate API
8. **View Results** - See generated design
9. **Gallery** - See saved designs
10. **Settings** - View account & usage

## 🔑 Key Files to Know

### Configuration
- `config/supabase.ts` - Supabase client
- `config/storage.ts` - LocalStorage utilities
- `config/api.ts` - API calls to edge functions
- `config/constants.ts` - Design styles, palettes, rooms

### Navigation
- `navigation/RootNavigator.tsx` - Navigation setup
- `App.tsx` - Entry point

### Screens
- `screens/HomeScreen.tsx` - Home with features
- `screens/UploadPhotoScreen.tsx` - Photo upload
- `screens/RoomTypeScreen.tsx` - Room selection
- `screens/SelectStyleScreen.tsx` - Style selection
- `screens/SelectPaletteScreen.tsx` - Palette selection
- `screens/GenerateDesignScreen.tsx` - Results
- `screens/GalleryScreen.tsx` - Design history
- `screens/SettingsScreen.tsx` - Settings

## ⚙️ Customization

### Add a New Design Style:
Edit `config/constants.ts`:
```typescript
export const DESIGN_STYLES = [
  // ... existing styles
  { id: 'my-style', name: 'My Style', icon: '🎨' },
];
```

### Add a New Room Type:
Edit `config/constants.ts`:
```typescript
export const ROOM_TYPES = [
  // ... existing rooms
  { id: 'my-room', name: 'My Room', icon: '🏠' },
];
```

### Add a New Color Palette:
Edit `config/constants.ts`:
```typescript
export const COLOR_PALETTES = [
  // ... existing palettes
  {
    id: 'my-palette',
    name: 'My Palette',
    colors: ['#FF0000', '#00FF00', '#0000FF'],
  },
];
```

### Change App Colors:
Primary accent color is `#E31C1C` (red). Search and replace:
```bash
# Find all uses of the red color
grep -r "E31C1C" app/screens/
```

## 🔧 Troubleshooting

### "Module not found" errors:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### App won't start:
1. Check `.env` file exists with valid Supabase URL
2. Clear Expo cache: `expo start -c`
3. Check phone has camera/photo permissions granted

### Design generation fails:
1. Verify Replicate API key in edge function
2. Check image URL is accessible
3. Check Replicate quota hasn't been exceeded

### Images not uploading:
1. Verify Supabase buckets exist and are named correctly
2. Check storage policies allow public uploads
3. Ensure file size is under 50MB

## 📦 What's Ready to Deploy

✅ **Frontend**: Complete Expo app (iOS/Android/Web)  
✅ **Backend**: Supabase functions (already created)  
✅ **Database**: Usage & designs tables (already created)  
✅ **Storage**: Image buckets (need to be created)  

## 🎯 Next Steps

1. **Create Supabase storage buckets** ← DO THIS FIRST
2. Set up Replicate API key in edge functions
3. Test the complete flow with a real room photo
4. Implement payment system (Stripe/RevenueCat) for premium
5. Add image download functionality
6. Deploy with EAS for production builds

## 📞 Need Help?

The app has detailed console logs. Check terminal output:
```bash
npm start
# Look for errors like "Failed to upload image" etc.
```

---

**Your app is ready to test! Just add Supabase credentials and go!** 🎉
