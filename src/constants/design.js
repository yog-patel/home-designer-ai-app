import React from 'react';

export const PREDEFINED_STYLES = [
  {
    id: 'custom',
    name: 'Custom',
    icon: '✏️',
    description: 'Create your own design',
  },
  {
    id: 'modern',
    name: 'Modern',
    icon: '⬛',
    description: 'Contemporary minimalist',
    prompt: 'modern minimalist interior design, clean lines, neutral colors, sleek furniture',
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    icon: '🧊',
    description: 'Light and airy',
    prompt: 'scandinavian interior design, light wood, white walls, cozy furniture, natural light',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: '✨',
    description: 'Premium contemporary',
    prompt: 'luxury contemporary interior design, high-end finishes, elegant furniture, ambient lighting',
  },
  {
    id: 'cozy',
    name: 'Cozy',
    icon: '🔥',
    description: 'Warm and inviting',
    prompt: 'cozy warm interior design, soft lighting, textured fabrics, comfortable furniture',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    icon: '⚙️',
    description: 'Raw and edgy',
    prompt: 'industrial interior design, exposed brick, metal accents, concrete, vintage elements',
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    icon: '🌿',
    description: 'Eclectic and artistic',
    prompt: 'bohemian interior design, colorful patterns, plants, layered textiles, artistic decor',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    icon: '⚪',
    description: 'Less is more',
    prompt: 'minimalist interior design, monochrome colors, clean spaces, essential furniture only',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    icon: '🕰️',
    description: 'Nostalgic charm',
    prompt: 'vintage interior design, antique furniture, warm wood tones, classic decor',
  },
  {
    id: 'tropical',
    name: 'Tropical',
    icon: '🌺',
    description: 'Vibrant and lush',
    prompt: 'tropical interior design, bright colors, plants, natural materials, relaxed atmosphere',
  },
];

export const ROOM_TYPES = [
  { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
  { id: 'living', name: 'Living Room', icon: '🛋️' },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
  { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
  { id: 'office', name: 'Office', icon: '💼' },
  { id: 'dining', name: 'Dining Room', icon: '🍽️' },
  { id: 'garage', name: 'Garage', icon: '🚗' },
  { id: 'study', name: 'Study Room', icon: '📚' },
  { id: 'gym', name: 'Gym', icon: '🏋️' },
  { id: 'playroom', name: 'Playroom', icon: '🎮' },
];

export const COLOR_PALETTES = [
  {
    id: 'vibrant',
    name: 'Vibrant',
    colors: ['#FF6B6B', '#FFA500', '#FFD700', '#98FF98', '#6BCB77'],
  },
  {
    id: 'neutral',
    name: 'Neutral Gray',
    colors: ['#F5F5F5', '#D3D3D3', '#A9A9A9', '#696969', '#2F4F4F'],
  },
  {
    id: 'warm',
    name: 'Warm Earth',
    colors: ['#D2B48C', '#CD853F', '#8B4513', '#A0522D', '#654321'],
  },
  {
    id: 'cool',
    name: 'Cool Blue',
    colors: ['#ADD8E6', '#87CEEB', '#4682B4', '#00008B', '#191970'],
  },
  {
    id: 'pastel',
    name: 'Pastel',
    colors: ['#FFB6C1', '#FFC0CB', '#E6E6FA', '#B0E0E6', '#F0E68C'],
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#FF7F50', '#FF6347', '#FF4500', '#DC143C', '#8B0000'],
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: ['#228B22', '#32CD32', '#90EE90', '#006400', '#2F4F4F'],
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    colors: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
  },
];
