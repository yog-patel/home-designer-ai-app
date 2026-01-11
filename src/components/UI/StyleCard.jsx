import React from 'react';
import clsx from 'clsx';

const StyleCard = ({ style, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200',
        isSelected
          ? 'bg-primary text-white scale-105'
          : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
      )}
    >
      <span className="text-4xl">{style.icon}</span>
      <div className="text-center">
        <p className="font-bold text-sm">{style.name}</p>
        <p className="text-xs opacity-75">{style.description}</p>
      </div>
    </button>
  );
};

export default StyleCard;
