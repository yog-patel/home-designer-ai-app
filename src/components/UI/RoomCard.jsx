import React from 'react';
import clsx from 'clsx';

const RoomCard = ({ room, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-3 px-5 py-3 rounded-full font-semibold transition-all duration-200 border-2',
        isSelected
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-gray-900 border-gray-200 hover:border-primary'
      )}
    >
      <span className="text-2xl">{room.icon}</span>
      <span>{room.name}</span>
    </button>
  );
};

export default RoomCard;
