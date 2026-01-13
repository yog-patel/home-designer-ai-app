import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserId } from './lib/userStorage';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import DesignHistoryPage from './pages/DesignHistoryPage';
import BottomNav from './components/Navigation/BottomNav';
import './index.css';

function App() {
  const activeTab = useSelector((state) => state.ui.activeTab);

  console.log('App rendered, activeTab:', activeTab);

  // Generate unique user ID on first load (stored in localStorage)
  useEffect(() => {
    console.log('App useEffect: Getting user ID...');
    try {
      const userId = getUserId();
      console.log('User ID:', userId);
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  }, []);

  const renderPage = () => {
    console.log('Rendering page for tab:', activeTab);
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'create':
        return <CreatePage />;
      case 'history':
        return <DesignHistoryPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto">
        {renderPage()}
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
