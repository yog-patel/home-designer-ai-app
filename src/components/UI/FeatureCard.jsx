import React from 'react';
import Button from './Button';

const FeatureCard = ({ title, subtitle, imageUrl, onAction, actionText = 'Try It!' }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* Image Section - Split view effect */}
      <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-50 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{subtitle}</p>
        <Button
          variant="primary"
          size="md"
          onClick={onAction}
          className="w-full"
        >
          {actionText}
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;
