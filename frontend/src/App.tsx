import { useAppSelector } from './store/hooks';
import { Navbar } from './featues/Navbar/Navbar';
import { FloatMenu } from './featues/FloatMenu/FloatMenu';
import { FixedMenu } from './featues/FixedMenu/FixedMenu';
import { UsePath } from './hooks/UsePath';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RadioPage } from './pages/RadioPage';
import { HistoryPage } from './pages/HistoryPage';
import { SavedPage } from './pages/SavedPage';
import { Player } from './featues/Player/Player';
import { UsePadding } from './hooks/UsePadding';

import './App.css';

function App() {
  UsePath();
  const { bottomRef, padding } = UsePadding();

  const { darkMode } = useAppSelector((state) => state.app);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <div className="fixed overflow-hidden dark:text-gray-50 w-screen h-screen  object-cover bg-white dark:bg-gray-900">
        <div
          className="flex w-full h-full"
          style={{ paddingBottom: `${padding}px` }}
        >
          <FixedMenu />
          <div className="w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stream" element={<RadioPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/saved" element={<SavedPage />} />
            </Routes>
          </div>
        </div>
        <Player elementRef={bottomRef} />
        <FloatMenu />
      </div>
    </div>
  );
}

export default App;
