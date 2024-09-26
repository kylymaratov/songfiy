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
import { Authorization } from './featues/Authorization/Authorization';
import { UseAuth } from './hooks/UseAuth';
import { PlaylistPage } from './pages/PlaylistPage/PlaylistPage';
import { TopSongsPage } from './pages/TopSongsPage/TopSongsPage';
import { UseContent } from './hooks/useContent';
import { MostPlayedSongsPage } from './pages/MostPlayedSongsPage/MostPlayedSongsPage';

function App() {
  UseAuth();
  UsePath();
  UseContent();

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
              <Route path="/playlists" element={<PlaylistPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/top-songs" element={<TopSongsPage />} />
              <Route path="/most-played" element={<MostPlayedSongsPage />} />
            </Routes>
          </div>
        </div>
        <div>
          <FullScreen bottomPadding={bottomPadding} />
          <Player elementRef={bottomRef} />
        </div>
        <Settings />
        <Authorization />
      </div>
    </div>
  );
}

export default App;
