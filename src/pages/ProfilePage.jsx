import React from 'react';
import { LogOut, Settings, HelpCircle } from 'lucide-react';
import Button from '../components/UI/Button';

const ProfilePage = () => {
  return (
    <div className="pb-24 bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-black text-gray-900 max-w-3xl mx-auto">Profile</h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-primary to-red-700 rounded-3xl p-6 text-white mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome Guest</h2>
              <p className="text-white/80 text-sm">Sign in to save your designs</p>
            </div>
          </div>
          <Button variant="secondary" size="md" className="w-full">
            Sign In
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-primary">0</p>
            <p className="text-xs text-gray-600 mt-1">Designs</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-primary">0</p>
            <p className="text-xs text-gray-600 mt-1">Saved</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-primary">0</p>
            <p className="text-xs text-gray-600 mt-1">Shared</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <Settings size={24} className="text-primary" />
            <span className="font-semibold text-gray-900">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <HelpCircle size={24} className="text-primary" />
            <span className="font-semibold text-gray-900">Help & Support</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-red-100 transition-colors">
            <LogOut size={24} className="text-red-600" />
            <span className="font-semibold text-red-600">Sign Out</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>Version 1.0.0</p>
          <p className="mt-2">© 2024 Home AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
