# API Integration Guide - Replicate SDXL-ControlNet

This document explains how to integrate the Replicate API for AI image generation.

---

## Overview

The app uses **Replicate's SDXL-ControlNet** model to:
1. Take a room photo (control image)
2. Apply a design style via text prompt
3. Generate a realistically redesigned room image

---

## Setup

### 1. Create Replicate Account
- Go to [replicate.com](https://replicate.com)
- Sign up (free tier available)
- Create API token in account settings

### 2. Install Dependencies
```bash
npm install replicate dotenv
```

### 3. Create Environment File
Create `.env` file in project root:

```env
VITE_REPLICATE_API_KEY=r8_xxxxxxxxxxxxxxxx

# Optional: For hosted backend
VITE_API_ENDPOINT=https://api.example.com/generate
```

**Note:** For security, API calls should be made from a **backend server**, not the client-side browser.

---

## Recommended Architecture

### Option A: Backend API (Recommended)
```
Client (React)
    ↓
Backend Server (Node.js/Python)
    ↓
Replicate API
    ↓
Backend returns generated image
    ↓
Client displays result
```

**Advantages:**
- Secure API key (not exposed in browser)
- Can queue/limit requests
- Add authentication & billing
- Faster image processing with webhooks

### Option B: Client-Side (Simple but Less Secure)
```
Client (React)
    ↓
Replicate API
    ↓
Client displays result
```

**Advantages:**
- No backend needed
- Faster to implement for MVP

**Disadvantages:**
- API key visible in client code
- No rate limiting
- No user authentication

---

## Implementation: Backend Approach (Recommended)

### Backend Setup (Node.js Example)

Create `backend/routes/generate.js`:

```javascript
import Replicate from "replicate";
import express from "express";

const router = express.Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

router.post("/generate-design", async (req, res) => {
  try {
    const {
      imageUrl,    // Base64 or URL of room photo
      prompt,      // Design description
      negativePrompt = "blurry, distorted, ugly",
    } = req.body;

    // Call Replicate API
    const output = await replicate.run(
      "fofr/sdxl-controlnet:3f0db12e8b60365e2eebdbf8e0b1e2ba:sha256:cb2f3f2e8b60365e2eebdbf8e0b1e2ba",
      {
        input: {
          image: imageUrl,
          prompt: prompt,
          negative_prompt: negativePrompt,
          num_outputs: 1,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: "DPMSolverMultistep",
          seed: Math.floor(Math.random() * 1000000),
        },
      }
    );

    // output[0] contains the generated image URL
    res.json({
      success: true,
      imageUrl: output[0],
    });
  } catch (error) {
    console.error("Replicate API error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
```

### Frontend API Call

Update `CreatePage.jsx` `handleGenerate()` function:

```javascript
const handleGenerate = async () => {
  dispatch(setIsLoading(true));
  
  try {
    // 1. Convert image to base64 if needed
    const imageData = originalImage; // Already base64 from upload

    // 2. Build prompt from style + palette info
    let finalPrompt = customPrompt;
    if (selectedStyle !== 'custom') {
      const style = PREDEFINED_STYLES.find(s => s.id === selectedStyle);
      finalPrompt = style.prompt;
    }

    // Add palette info to prompt
    const palette = COLOR_PALETTES.find(p => p.id === selectedPalette);
    finalPrompt += ` with color palette: ${palette.name}`;

    // 3. Call backend API
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/api/generate-design`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${/* auth token if needed */}`,
        },
        body: JSON.stringify({
          imageUrl: imageData,
          prompt: finalPrompt,
          negativePrompt: "blurry, distorted, ugly, low quality",
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate design');
    }

    const data = await response.json();
    
    if (data.success) {
      dispatch(setGeneratedImage(data.imageUrl));
      dispatch(setActiveTab('results')); // Auto-navigate to results
    } else {
      dispatch(setError(data.error));
    }
  } catch (error) {
    console.error('Generation error:', error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setIsLoading(false));
  }
};
```

---

## Implementation: Client-Side Approach (Simpler)

If you choose to use client-side directly:

```javascript
import Replicate from "replicate";

const handleGenerate = async () => {
  dispatch(setIsLoading(true));
  
  try {
    const replicate = new Replicate({
      auth: import.meta.env.VITE_REPLICATE_API_KEY,
    });

    // Build final prompt
    let finalPrompt = customPrompt;
    if (selectedStyle !== 'custom') {
      const style = PREDEFINED_STYLES.find(s => s.id === selectedStyle);
      finalPrompt = style.prompt;
    }

    // Add palette to prompt
    const palette = COLOR_PALETTES.find(p => p.id === selectedPalette);
    finalPrompt += ` with ${palette.name} color scheme`;

    const output = await replicate.run(
      "fofr/sdxl-controlnet:3f0db12e8b60365e2eebdbf8e0b1e2ba",
      {
        input: {
          image: originalImage,
          prompt: finalPrompt,
          negative_prompt: "blurry, distorted, ugly",
          num_outputs: 1,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: "DPMSolverMultistep",
        },
      }
    );

    dispatch(setGeneratedImage(output[0]));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIsLoading(false));
  }
};
```

---

## Replicate Model Info

### SDXL-ControlNet Model
**Model:** `fofr/sdxl-controlnet`
**Version:** Check latest at [replicate.com/fofr/sdxl-controlnet](https://replicate.com/fofr/sdxl-controlnet)

### Input Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `image` | string | required | Base64 or URL of room photo |
| `prompt` | string | required | Design description (e.g., "modern minimalist living room with warm tones") |
| `negative_prompt` | string | "blurry, distorted" | What to avoid in generation |
| `num_outputs` | int | 1 | Number of images to generate (1-4) |
| `num_inference_steps` | int | 30 | Quality vs speed (20-50) |
| `guidance_scale` | float | 7.5 | How strongly to follow prompt (1-20) |
| `scheduler` | string | "DPMSolverMultistep" | Sampling algorithm |
| `seed` | int | random | For reproducibility |

---

## Prompt Engineering Tips

### Good Prompts
```
"Modern minimalist living room with warm wood tones, large windows, 
natural light, white walls, Scandinavian furniture, potted plants, 
professional interior photography"
```

```
"Luxury contemporary bedroom with velvet headboard, gold accents, 
marble nightstands, ambient lighting, warm color palette, 
high-end interior design"
```

### Bad Prompts
```
"nice room"  // Too vague
"make it better"  // Unclear
"ugly colors"  // Use negative prompts instead
```

### Prompt Structure Template
```
[Room Type] [Style] [Key Features] [Lighting] [Color Palette] [Photography Style]
```

---

## Error Handling

```javascript
// Handle different error types
try {
  const output = await replicate.run(...);
} catch (error) {
  if (error.message.includes('rate limit')) {
    dispatch(setError('Too many requests. Please wait a moment.'));
  } else if (error.message.includes('invalid input')) {
    dispatch(setError('Please upload a valid image.'));
  } else if (error.message.includes('NSFW')) {
    dispatch(setError('Image contains NSFW content. Please use a different photo.'));
  } else {
    dispatch(setError('Generation failed. Please try again.'));
  }
}
```

---

## Pricing

**Replicate Pricing:**
- Free tier: 5 minutes of compute per month
- Pay-as-you-go: ~$0.02-0.05 per image generated
- Plans start at $50/month

**Estimate:**
- 10 designs/day = $0.20/day = $6/month
- 100 designs/day = $2/day = $60/month

---

## Advanced Features

### 1. Image Upscaling
After generation, upscale with:
```javascript
const upscaled = await replicate.run(
  "nightmareai/real-esrgan:42fed498d75331b8ef91424baccd4b1f3e3c9e00fefd7da60d4c9871c071e54a",
  { input: { image: generatedImage, scale: 4 } }
);
```

### 2. Multiple Designs
Generate 4 variations:
```javascript
input: {
  ...config,
  num_outputs: 4,  // Generate 4 images
}
```

### 3. Webhooks (Async Processing)
For faster response, use webhooks instead of polling:
```javascript
const prediction = await replicate.predictions.create({
  version: "...",
  input: {...},
  webhook: "https://yourapi.com/webhook",
});
```

---

## Testing

### Test Data
Room image: 
```
https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=512&h=512
```

### Mock Response (for development)
```javascript
if (process.env.VITE_MOCK_API === 'true') {
  // Return mock image for testing UI without API
  dispatch(setGeneratedImage('https://via.placeholder.com/512'));
}
```

---

## Monitoring & Analytics

Track:
- API response times
- Error rates
- Cost per generation
- Popular prompts/styles
- User feedback on quality

```javascript
// Log generation metrics
console.log({
  timestamp: new Date(),
  room: selectedRoom,
  style: selectedStyle,
  processingTime: endTime - startTime,
  success: !!output,
  costEstimate: 0.03,
});
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Unauthorized` | Check API key in .env |
| `Invalid image` | Ensure image is proper format (JPG/PNG) |
| `Rate limited` | Add exponential backoff retry logic |
| `NSFW flagged` | Remove flagged content, try different image |
| `Timeout` | Use longer timeout or webhooks |
| `Out of quota` | Upgrade Replicate plan or add billing |

---

## Next Steps

1. Create backend API endpoint
2. Add API key to environment variables
3. Implement error handling
4. Add loading states
5. Test with sample images
6. Deploy backend
7. Launch!

---

## Resources

- [Replicate Documentation](https://replicate.com/docs)
- [SDXL-ControlNet Model](https://replicate.com/fofr/sdxl-controlnet)
- [API Reference](https://replicate.com/docs/api)
- [JavaScript Client](https://github.com/replicate/replicate-js)

---

Good luck with the integration! 🚀
