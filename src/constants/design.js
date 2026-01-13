import React from 'react';

export const DESIGN_TYPES = [
  { id: 'interior', name: 'Interior Design', icon: '🏠' },
  { id: 'exterior', name: 'Exterior Design', icon: '🏡' },
  { id: 'garden', name: 'Garden Design', icon: '🌿' },
  { id: 'paint', name: 'Paint Change', icon: '🎨' },
];

export const DESIGN_TYPE_OPTIONS = {
  interior: [
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'living', name: 'Living Room', icon: '🛋️' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'office', name: 'Office', icon: '💼' },
    { id: 'dining', name: 'Dining Room', icon: '🍽️' },
    { id: 'study', name: 'Study Room', icon: '📚' },
    { id: 'gym', name: 'Gym', icon: '🏋️' },
    { id: 'playroom', name: 'Playroom', icon: '🎮' },
  ],
  exterior: [
    { id: 'house', name: 'House', icon: '🏠' },
    { id: 'apartment', name: 'Apartment', icon: '🏢' },
    { id: 'garage', name: 'Garage', icon: '🚗' },
    { id: 'patio', name: 'Patio', icon: '☀️' },
    { id: 'porch', name: 'Porch', icon: '🪜' },
    { id: 'deck', name: 'Deck', icon: '🪑' },
    { id: 'fence', name: 'Fence', icon: '🚧' },
  ],
  garden: [
    { id: 'front', name: 'Front Garden', icon: '🌸' },
    { id: 'backyard', name: 'Backyard', icon: '🌳' },
    { id: 'vegetable', name: 'Vegetable Garden', icon: '🥕' },
    { id: 'flower', name: 'Flower Garden', icon: '🌺' },
    { id: 'zen', name: 'Zen Garden', icon: '🪨' },
    { id: 'landscape', name: 'Landscape', icon: '⛰️' },
  ],
  paint: [
    { id: 'wall', name: 'Wall Paint', icon: '🧱' },
    { id: 'trim', name: 'Trim & Molding', icon: '🪵' },
    { id: 'exterior', name: 'Exterior Paint', icon: '🏠' },
    { id: 'accent', name: 'Accent Wall', icon: '🎨' },
    { id: 'full', name: 'Full Interior', icon: '✨' },
  ],
};

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

export const EXTERIOR_STYLES = [
  {
    id: 'custom',
    name: 'Custom',
    icon: '✏️',
    description: 'Create your own',
  },
  {
    id: 'modern',
    name: 'Modern',
    icon: '⬛',
    description: 'Contemporary & sleek',
    prompt: 'modern contemporary house exterior design, clean lines, minimalist, glass and steel elements, flat rooflines',
  },
  {
    id: 'farmhouse',
    name: 'Farmhouse',
    icon: '🚜',
    description: 'Rustic charm',
    prompt: 'farmhouse architectural style exterior, rustic wood siding, metal roof, white trim, front porch, charming details',
  },
  {
    id: 'gothic',
    name: 'Gothic',
    icon: '��',
    description: 'Dark & dramatic',
    prompt: 'gothic architectural style exterior, pointed arches, ornate details, dark stone, dramatic towers, Victorian influence',
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    icon: '☀️',
    description: 'Warm & sunny',
    prompt: 'mediterranean architectural style exterior, terracotta roof, stucco walls, arched openings, lush landscaping, warm colors',
  },
  {
    id: 'colonial',
    name: 'Colonial',
    icon: '🏛️',
    description: 'Classic elegance',
    prompt: 'colonial architectural style exterior, symmetrical design, shuttered windows, brick or wood siding, pitched roof, timeless elegance',
  },
  {
    id: 'ancient_chinese',
    name: 'Ancient Chinese',
    icon: '🏯',
    description: 'Oriental tradition',
    prompt: 'ancient Chinese architectural style exterior, upturned eaves, intricate details, red and gold colors, traditional craftsmanship, serene garden',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    icon: '⛩️',
    description: 'Zen aesthetics',
    prompt: 'traditional Japanese architectural style exterior, minimalist design, natural materials, wooden beams, sliding panels, manicured garden',
  },
  {
    id: 'victorian',
    name: 'Victorian',
    icon: '👑',
    description: 'Ornate & grand',
    prompt: 'Victorian architectural style exterior, intricate details, gabled roofs, ornamental woodwork, bay windows, sophisticated grandeur',
  },
  {
    id: 'craftsman',
    name: 'Craftsman',
    icon: '🔨',
    description: 'Handcrafted details',
    prompt: 'craftsman architectural style exterior, natural materials, exposed beams, stone or wood accents, deep overhangs, warm inviting design',
  },
  {
    id: 'mid_century',
    name: 'Mid-Century',
    icon: '🎯',
    description: 'Retro modern',
    prompt: 'mid-century modern architectural style exterior, clean lines, large windows, horizontal emphasis, natural integration with landscape, atomic age influence',
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

export const PAINT_COLORS = [
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'cream', name: 'Cream', hex: '#FFFDD0' },
  { id: 'light_gray', name: 'Light Gray', hex: '#D3D3D3' },
  { id: 'gray', name: 'Gray', hex: '#808080' },
  { id: 'charcoal', name: 'Charcoal', hex: '#36454F' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'navy', name: 'Navy', hex: '#000080' },
  { id: 'light_blue', name: 'Light Blue', hex: '#ADD8E6' },
  { id: 'blue', name: 'Blue', hex: '#0000FF' },
  { id: 'teal', name: 'Teal', hex: '#008080' },
  { id: 'light_green', name: 'Light Green', hex: '#90EE90' },
  { id: 'green', name: 'Green', hex: '#008000' },
  { id: 'sage', name: 'Sage', hex: '#9DC183' },
  { id: 'beige', name: 'Beige', hex: '#F5F5DC' },
  { id: 'tan', name: 'Tan', hex: '#D2B48C' },
  { id: 'brown', name: 'Brown', hex: '#8B4513' },
  { id: 'light_pink', name: 'Light Pink', hex: '#FFB6C1' },
  { id: 'pink', name: 'Pink', hex: '#FFC0CB' },
  { id: 'rose', name: 'Rose', hex: '#FF007F' },
  { id: 'coral', name: 'Coral', hex: '#FF7F50' },
  { id: 'orange', name: 'Orange', hex: '#FFA500' },
  { id: 'gold', name: 'Gold', hex: '#FFD700' },
  { id: 'yellow', name: 'Yellow', hex: '#FFFF00' },
  { id: 'purple', name: 'Purple', hex: '#800080' },
  { id: 'lavender', name: 'Lavender', hex: '#E6E6FA' },
];

