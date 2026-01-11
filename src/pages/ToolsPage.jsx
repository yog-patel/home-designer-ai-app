import React from 'react';
import { Wand2, Palette, Zap } from 'lucide-react';
import Button from '../components/UI/Button';

const ToolsPage = () => {
  const tools = [
    {
      icon: Wand2,
      title: 'AI Magic',
      description: 'Let AI suggest the best design for your space',
      comingSoon: false,
    },
    {
      icon: Palette,
      title: 'Color Inspector',
      description: 'Extract colors from reference images',
      comingSoon: true,
    },
    {
      icon: Zap,
      title: 'Quick Enhance',
      description: 'Improve your photos with one tap',
      comingSoon: true,
    },
  ];

  return (
    <div className="pb-24 bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-black text-gray-900 max-w-3xl mx-auto">Tools</h1>
      </div>

      {/* Tools Grid */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="space-y-4">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-2xl">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{tool.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
                  </div>
                </div>
                <Button
                  variant={tool.comingSoon ? 'secondary' : 'primary'}
                  size="sm"
                  className="mt-4 w-full"
                  disabled={tool.comingSoon}
                >
                  {tool.comingSoon ? 'Coming Soon' : 'Try Now'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
