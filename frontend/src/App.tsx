import { FixedMenu } from './featues/FixedMenu/FixedMenu';
import { UsePath } from './hooks/UsePath';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { RadioPage } from './pages/RadioPage/RadioPage';
import { SavedPage } from './pages/SavedPage/SavedPage';
import { Player } from './featues/Player/Player';
import { UsePadding } from './hooks/UsePadding';

import './App.css';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { Navbar } from './featues/Navbar/Navbar';
import { FullScreen } from './components/FullScreen/FullScreen';
import { Settings } from './featues/Settings/Settings';

function App() {
  UsePath();
  const { bottomRef, upRef, padding, bottomPadding } = UsePadding();

  return (
    <div className="dark">
      <div className="fixed overflow-hidden  text-gray-50 w-screen h-screen  object-cover bg-background">
        <Navbar upRef={upRef} />
        <div
          className="flex w-full h-full"
          style={{ paddingBottom: `${padding}px` }}
        >
          <FixedMenu />
          <div className="w-full p-2 overflow-y-scroll overflow-x-hidden">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/radio" element={<RadioPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/saved" element={<SavedPage />} />
            </Routes>
          </div>
        </div>
        <div>
          <FullScreen bottomPadding={bottomPadding} />
          <Player elementRef={bottomRef} />
        </div>
        <Settings />
      </div>
    </div>
  );
}

export default App;
