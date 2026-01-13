# No-Auth Architecture Setup Guide

## What Changed

✅ **Removed**: Authentication system (login/signup)
✅ **Added**: Anonymous user ID generation + usage tracking
✅ **Result**: Users can start designing instantly with 3 free designs

---

## Architecture Overview

```
User installs app
    ↓
Generate random UUID → save to localStorage
    ↓
User creates design (Step 1-4)
    ↓
Call Supabase `check-usage` Edge Function
    ├─ Is premium? → Allow unlimited
    ├─ Has < 3 designs? → Allow, increment counter
    └─ Has >= 3 designs? → Show paywall modal
    ↓
Generate design via `generate-design` Edge Function
    ↓
Save design to localStorage (client-side only)
    ↓
Show "X designs remaining" on results page
```

---

## Setup Steps

### Step 1: Create Usage Table in Supabase

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS usage (
  user_id TEXT PRIMARY KEY,
  designs_generated INT DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  premium_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usage_user_id ON usage(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_premium ON usage(is_premium);

ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_read_own_usage" ON usage
  FOR SELECT USING (true);

CREATE POLICY "users_can_update_own_usage" ON usage
  FOR UPDATE USING (user_id = current_user_id());

CREATE POLICY "users_can_insert_own_usage" ON usage
  FOR INSERT WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_usage_updated_at ON usage;
CREATE TRIGGER update_usage_updated_at BEFORE UPDATE ON usage
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 2: Create Edge Functions

**Function 1: check-usage**
- File: `supabase/functions/check-usage/index.ts` (already created)
- Deploy to Supabase Edge Functions
- This checks and increments the usage counter

**Function 2: generate-design** (from earlier guide)
- File: Create in Supabase Edge Functions
- Calls Replicate API securely
- Returns generated image URL

### Step 3: Add Supabase Credentials to .env

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Step 4: Test the Flow

1. Open app at http://localhost:3000
2. **Should see HomePage directly** (no login required)
3. Click "Create Design"
4. Upload photo → Select room → Pick style → Choose colors
5. Click "Generate Design"
6. **First time**: Should call Replicate and generate image
7. **After 3 designs**: Should show paywall modal

---

## Files Created/Modified

### New Files
- `src/lib/userStorage.js` - LocalStorage utilities for userId and usage
- `src/components/UI/PaywallModal.jsx` - Paywall after 3 free designs
- `supabase/functions/check-usage/index.ts` - Edge Function for usage checking

### Modified Files
- `src/App.jsx` - Remove auth, add userId generation
- `src/pages/CreatePage.jsx` - Add usage checking before generation
- `src/pages/ResultsPage.jsx` - Show remaining designs counter

### Deleted (No longer needed)
- `src/pages/LoginPage.jsx` - Not used
- `src/pages/SignUpPage.jsx` - Not used
- `src/store/slices/authSlice.js` - Not used

---

## Key Features

### Free Tier (3 designs)
- Users can generate 3 designs
- Counter shows "2 designs left" after each generation
- After 3rd design → Paywall modal appears

### Premium (After Payment)
- Unlimited designs
- is_premium flag set in usage table
- premium_expires_at tracks subscription end date

### User Tracking (No Auth Required)
- Random UUID generated once per device
- Stored in localStorage
- Used for usage tracking in Supabase

### No Server-Side User Data
- ✅ Only `usage` table (userId, counter, premium status)
- ❌ No user_profiles table
- ❌ No designs table (stored locally only)
- ✅ Designs stored in browser's localStorage

---

## Testing Checklist

- [ ] App loads at http://localhost:3000 showing HomePage
- [ ] No login page shown
- [ ] Click "Create Design" opens 4-step wizard
- [ ] Can upload photo, select options
- [ ] First 3 designs generate successfully
- [ ] After 3rd design, "Upgrade to Unlimited" modal shows
- [ ] Paywall has "Get Unlimited Designs" button (Stripe integration pending)
- [ ] ResultsPage shows "2 designs left" counter
- [ ] User ID visible in localStorage (DevTools → Application → localStorage)

---

## Next Steps

1. **Deploy Edge Functions** to Supabase
2. **Create Stripe integration** for "Upgrade" button
3. **Optional**: Add design export to local files
4. **Optional**: Add offline support (designs sync when online)
5. **Optional**: Build design history (localStorage-backed)
6. **Deploy to iOS/Android** via Capacitor

---

## Environment Variables

No additional environment variables needed beyond:
```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

For Replicate integration (generate-design function):
```env
REPLICATE_API_KEY (stored in Supabase Secrets, not in .env)
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **App shows blank page** | Clear localStorage and reload: `localStorage.clear()` |
| **"User ID undefined"** | Check userStorage.js is imported correctly |
| **Usage not incrementing** | Verify check-usage Edge Function is deployed |
| **Paywall not showing** | Check PaywallModal import in CreatePage |
| **Generate button does nothing** | Check Supabase Edge Functions are working |

---

**Architecture is now ready for growth with Stripe payment integration!** 🚀
