import React from 'react';
import { Home, Layers, User, Settings } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../store/slices/uiSlice';

const BottomNav = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.ui.activeTab);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'create', label: 'Create', icon: Layers },
    { id: 'tools', label: 'Tools', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl safe-area-inset-bottom z-40">
      <div className="flex justify-around max-w-3xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`flex-1 flex flex-col items-center justify-center py-3 transition-all duration-200 ${
                isActive
                  ? 'text-red-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs mt-1 font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
