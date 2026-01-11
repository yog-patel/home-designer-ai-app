import React from 'react';
import clsx from 'clsx';

const PaletteCard = ({ palette, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 border-2',
        isSelected
          ? 'border-red-500 scale-105 shadow-lg'
          : 'border-gray-200 hover:border-gray-300'
      )}
    >
      {/* Color Palette Preview */}
      <div className="flex gap-1.5">
        {palette.colors.map((color, idx) => (
          <div
            key={idx}
            className="w-6 h-6 rounded-full shadow-sm"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="text-center">
        <p className="font-bold text-sm text-gray-900">{palette.name}</p>
      </div>
    </button>
  );
};

export default PaletteCard;
