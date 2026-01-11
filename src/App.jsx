import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ResultsPage from './pages/ResultsPage';
import ToolsPage from './pages/ToolsPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/Navigation/BottomNav';
import './index.css';

function App() {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const generatedImage = useSelector((state) => state.design.generatedImage);

  const renderPage = () => {
    if (generatedImage && activeTab !== 'create') {
      return <ResultsPage />;
    }

    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'create':
        return <CreatePage />;
      case 'tools':
        return <ToolsPage />;
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
